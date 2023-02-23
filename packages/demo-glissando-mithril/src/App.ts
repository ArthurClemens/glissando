import { GlissandoSlider, useGlissandoModel } from 'glissando-mithril';
import m from 'mithril';

import { AppModel, TAppState } from './AppModel';
import { Header } from './Header';
import { Page } from './Page';

const Slider = () => {
  const model = useGlissandoModel();

  const appModel = AppModel({
    isAnimated: true,
    isRtl: false,
    count: 5,
    selectIndices: [] as number[],
  });

  appModel.getChanges.map((state: TAppState) => {
    appModel.setCount(state.count);
    return null;
  });

  // Optionally listen for changes
  // model.getChanges.map((state: Glissando.State) => {
  //   return null;
  // });

  return {
    view: () => {
      // Create a list of pages
      const pageCount = appModel.getState().count;
      const pagesList = [...Array(pageCount)].map((_, i) => i);

      return m(
        '.demo-container',
        {
          dir: appModel.getState().isRtl ? 'rtl' : '',
        },
        [
          m(Header, { model, appModel }),

          m(
            GlissandoSlider,
            {
              model,
            },
            pagesList.map(index => m(Page, { key: index, index })),
          ),
        ],
      );
    },
  };
};

export const App = () => ({
  view: () => m(Slider),
});
