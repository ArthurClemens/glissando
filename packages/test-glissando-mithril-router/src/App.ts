import {
  Glissando,
  GlissandoSlider,
  useGlissandoModel,
} from 'glissando-mithril';
import m from 'mithril';

import { Header } from './Header';
import { Page } from './Page';

const pageCount = 10;
const pages = [...Array(pageCount)].map((_, i) => (i + 1).toString());

type TProps = {
  model: Glissando.Model;
};

const Slider: m.Component<TProps> = {
  view: ({ attrs }) => {
    const { model } = attrs;
    const currentPage = m.route.param('page');

    return m(
      GlissandoSlider,
      {
        model,
        locations: pages,
        location: currentPage,
      },
      pages.map(id =>
        m(Page, {
          key: id,
          location: id,
        }),
      ),
    );
  },
};

export const App = () => {
  const model = useGlissandoModel();

  return {
    view: () => [m(Header, { model }), m(Slider, { model })],
  };
};
