import {
  Glissando,
  GlissandoSlider,
  useGlissandoModel,
} from 'glissando-mithril';
import m from 'mithril';

import { Header } from './Header';
import { Listing } from './Listing';
import { User } from './User';
import { UserDetails } from './UserDetails';
import users from './users';

// Store indices to facilitate merging
type TBreadCrumb = {
  [key: string]: string;
};

const trailToBreadCrumb = (trail: string[]) =>
  trail.reduce(
    (acc, path, index) => ({
      ...acc,
      [index.toString()]: path,
    }),
    {} as TBreadCrumb,
  );

const createBreadCrumb = (route: string) =>
  route
    .slice(1)
    .split('/')
    .map(fragment => `/${fragment}`)
    .reduce((acc, fragment) => {
      const previousPath = acc[acc.length - 1];
      const path = previousPath ? previousPath + fragment : fragment;

      return [...acc, path];
    }, [] as string[]);

type TSliderProps = {
  model: Glissando.Model;
};

const Slider: m.ClosureComponent<TSliderProps> = () => {
  // Store the user so that the page can be shown while sliding back to the overview
  const localState = {
    user: '',
  };
  return {
    view: ({ attrs }) => {
      const { model } = attrs;

      if (m.route.param('user')) {
        localState.user = m.route.param('user');
      }

      /*
      Support starting from a deeper route (a User or UserDetails page).
      When starting from there, we don't have any locations stored in the Glissando model yet.
      To know which pages come before we create a breadcrumb from the current route to know which pages should be shown.
      */
      const breadcrumb = createBreadCrumb(m.route.get());

      /*
      We use the stored locations to know which pages should be shown after
      (so that when sliding back the pages don't disappear).
      Then combine all collected data.
      */
      const storedLocations = model.getState().locations || [];
      const merged = {
        ...trailToBreadCrumb(storedLocations),
        ...trailToBreadCrumb(breadcrumb),
      };
      const pages = Object.keys(merged).map(key => merged[key]);
      const currentPage = pages[breadcrumb.length - 1];

      return m(
        GlissandoSlider,
        {
          model,
          locations: pages,
          location: currentPage,
        },
        pages.map((_, index) => {
          switch (index) {
            case 0:
              return m(Listing, { users });
            case 1:
              return m(User, {
                user: localState.user,
              });
            case 2:
              return m(UserDetails, {
                user: localState.user,
              });
            default:
              return null;
          }
        }),
      );
    },
  };
};

export const App = () => {
  const model = useGlissandoModel();

  return {
    view: () => {
      return [m(Header, { model }), m(Slider, { model })];
    },
  };
};
