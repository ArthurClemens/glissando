import {
  // Glissando,
  GlissandoSlider,
  useGlissandoModel,
} from 'glissando-mithril';
import m from 'mithril';

import { AppModel, TAppState } from './AppModel';
import { Page } from './Page';

const Slider = () => {
  const model = useGlissandoModel();
  const {
    getState,
    previous,
    next,
    goTo,
    hasPrevious,
    hasNext,
    isAnimating,
    // getChanges,
  } = model;

  const appModel = AppModel({
    isVisible: true,
    isAnimated: true,
    isRtl: false,
    count: 5,
    selectIndices: [] as number[],
  });

  appModel.getChanges.map((state: TAppState) => {
    appModel.setCount(state.count);
    return null;
  });

  // getChanges.map((state: Glissando.State) => {
  //   console.log('model.getChanges', state);
  //   return null;
  // });

  return {
    view: () => {
      // Create a list of pages
      const pageCount = appModel.getState().count;
      const pagesList = [...Array(pageCount)].map((_, i) => i);

      return m('.demo-container', [
        m('.demo-meta-controls', [
          m('input', {
            id: 'show',
            type: 'checkbox',
            value: '1',
            checked: appModel.getState().isVisible,
            onclick: (e: Event) => {
              appModel.setIsVisible((e.target as HTMLInputElement).checked);
            },
          }),
          m(
            'label',
            {
              for: 'show',
            },
            'Show',
          ),
          m('input', {
            id: 'rtl',
            type: 'checkbox',
            value: '1',
            checked: appModel.getState().isRtl,
            onclick: (e: Event) => {
              appModel.setIsRtl((e.target as HTMLInputElement).checked);
            },
          }),
          m(
            'label',
            {
              for: 'rtl',
            },
            'Right to left',
          ),
          m('input', {
            id: 'animate',
            type: 'checkbox',
            value: '1',
            checked: appModel.getState().isAnimated,
            onclick: (e: Event) => {
              appModel.setIsAnimated((e.target as HTMLInputElement).checked);
            },
          }),
          m(
            'label',
            {
              for: 'animate',
            },
            'Animate',
          ),
        ]),
        appModel.getState().isVisible &&
          m(
            'div',
            { dir: appModel.getState().isRtl ? 'rtl' : '' },
            m('.demo-controls', [
              m(
                'button',
                {
                  onclick: () =>
                    previous({ animate: appModel.getState().isAnimated }),
                  disabled: !hasPrevious() || isAnimating(),
                },
                'Previous',
              ),
              m(
                'button',
                {
                  onclick: () =>
                    next({ animate: appModel.getState().isAnimated }),
                  disabled: !hasNext() || isAnimating(),
                },
                'Next',
              ),
              m(
                'select',
                {
                  disabled: getState().isAnimating || getState().count < 2,
                  value: getState().index,
                  onchange: (e: InputEvent) => {
                    const element = e.target as HTMLInputElement;
                    if (element) {
                      goTo({
                        index: parseInt(element.value, 10),
                        animate: appModel.getState().isAnimated,
                      });
                    }
                  },
                },
                appModel.getState().selectIndices.map((_index, i) =>
                  m(
                    'option',
                    {
                      key: i,
                      value: i,
                    },
                    `Go to page ${i + 1}`,
                  ),
                ),
              ),
              m(
                'button',
                {
                  onclick: () => {
                    appModel.setCount(appModel.getState().count - 1);
                  },
                  disabled: appModel.getState().count === 1 || isAnimating(),
                },
                'Remove page',
              ),
              m(
                'button',
                {
                  onclick: () => {
                    appModel.setCount(appModel.getState().count + 1);
                  },
                  disabled: appModel.getState().count === 10 || isAnimating(),
                },
                'Add page',
              ),
            ]),
            m(
              GlissandoSlider,
              {
                model,
              },
              pagesList.map(index => m(Page, { key: index, index })),
            ),
          ),
      ]);
    },
  };
};

export const App = () => {
  return {
    view: () => m(Slider),
  };
};
