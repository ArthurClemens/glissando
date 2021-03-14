import { createLocationsFromPath } from 'glissando-helpers';
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

      const location = m.route.get();
      const locations = createLocationsFromPath(
        location,
        model.getState().locations,
      );

      return m(
        GlissandoSlider,
        {
          model,
          locations,
          location,
        },
        locations.map((_, index) => {
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
    view: () => [m(Header, { model }), m(Slider, { model })],
  };
};
