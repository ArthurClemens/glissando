import {
  Glissando,
  GlissandoSlider,
  useGlissandoModel,
} from 'glissando-mithril';
import m from 'mithril';

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
  } = model;

  const createSelectIndices = (count: number) =>
    [...Array(count)].map((_, i) => i);

  const localState = {
    show: true,
    animate: true,
    rtl: false,
    index: getState().index,
    count: 5,
    initialCount: 5,
    selectIndices: [] as number[],
  };

  getState.map((s: Glissando.State) => {
    if (s.index !== localState.index) {
      localState.index = s.index;
    }
    if (s.count !== localState.count) {
      localState.count = s.count;
      localState.selectIndices = createSelectIndices(s.count);
    }
    return null;
  });

  return {
    view: () => {
      const state = getState();
      // Create a list of pages
      const pageCount = localState.count || localState.initialCount;
      const pagesList = [...Array(pageCount)].map((_, i) => i);

      return m('.demo-container', [
        m('.demo-meta-controls', [
          m('input', {
            id: 'show',
            type: 'checkbox',
            value: '1',
            checked: localState.show,
            onclick: () => {
              localState.show = !localState.show;
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
            checked: localState.rtl,
            onclick: () => {
              localState.rtl = !localState.rtl;
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
            checked: localState.animate,
            onclick: () => {
              localState.animate = !localState.animate;
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
        localState.show &&
          m(
            'div',
            { dir: localState.rtl ? 'rtl' : '' },
            m('.demo-controls', [
              m(
                'button',
                {
                  onclick: () => previous({ animate: localState.animate }),
                  disabled: !hasPrevious() || isAnimating(),
                },
                'Previous',
              ),
              m(
                'button',
                {
                  onclick: () => next({ animate: localState.animate }),
                  disabled: !hasNext() || isAnimating(),
                },
                'Next',
              ),
              m(
                'select',
                {
                  disabled: state.isAnimating || state.count < 2,
                  onchange: (e: InputEvent) => {
                    const element = e.target as HTMLInputElement;
                    if (element) {
                      goTo({
                        index: parseInt(element.value, 10),
                        animate: localState.animate,
                      });
                    }
                  },
                },
                localState.selectIndices.map((_index, i) =>
                  m(
                    'option',
                    { key: i, value: i, selected: i === localState.index },
                    `Go to page ${i + 1}`,
                  ),
                ),
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

export const AppPage = () => {
  return {
    view: () => m(Slider),
  };
};
