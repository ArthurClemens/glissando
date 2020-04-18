import { GlissandoModel, GlissandoSlider } from 'glissando-mithril';
import m from 'mithril';

import * as pages from './pages';

const Slider = () => {
  const model = GlissandoModel();
  const {
    getState,
    previous,
    next,
    goTo,
    hasPrevious,
    hasNext,
    isAnimating,
    onChange,
  } = model;

  const createSelectIndices = (count: number) =>
    [...Array(count)].map((_, i) => i);

  const localState = {
    animate: true,
    index: getState().index,
    selectIndices: createSelectIndices(getState().count),
  };

  onChange(s => {
    localState.index = s.index;
    localState.selectIndices = createSelectIndices(s.count);
  });

  return {
    view: (vnode: m.Vnode) => {
      const state = getState();

      return m('.demo-container', [
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
                `Go to index ${i}`,
              ),
            ),
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
        m(
          GlissandoSlider,
          {
            model,
          },
          vnode.children,
        ),
      ]);
    },
  };
};

// const DynamicPageSlider = () => {
//   const localState = {
//     count: 3,
//   };
//   const setCount = (count: number) => {
//     localState.count = count;
//   };

//   return {
//     view: () => {
//       const pagesList = Array.from({ length: localState.count }, (_, i) => i);
//       return m('div', [
//         m(
//           'button',
//           {
//             onclick: () => setCount(localState.count - 1),
//             disabled: localState.count === 1,
//           },
//           'Remove page',
//         ),
//         m(
//           'button',
//           {
//             onclick: () => setCount(localState.count + 1),
//             disabled: localState.count === 15,
//           },
//           'Add page',
//         ),
//         m('span', `Page count: ${localState.count}`),
//         m(
//           Slider,
//           pagesList.map(i => m(pages.Page(`Page ${i + 1}`))),
//         ),
//       ]);
//     },
//   };
// };

export const AppPage = () => {
  return {
    view: () => [
      m(Slider, [
        m(pages.Page1),
        m(pages.Page2),
        m(pages.Page3),
        m(pages.Page4),
        m(pages.Page5),
      ]),
      // m('div', { style: { marginTop: '40px' } }, m(DynamicPageSlider)),
    ],
  };
};
