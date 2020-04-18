import { getSliderStyle } from 'glissando';
export { GlissandoModel } from 'glissando';
import m from 'mithril';

const GlissandoSlider = initialVnode => {
  const { model } = initialVnode.attrs;
  const { getState, finalize, setCount, setDirection, getViewIndices } = model;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onTransitionEnd = evt => {
    finalize(getState().targetIndex);
  };
  // Subscribe to changes
  getState.map(m.redraw);
  return {
    onupdate: ({ dom, children }) => {
      // Children count
      const count = children.length;
      if (count > getState().count) {
        setCount(count);
      }
      // RTL
      const { direction } = getComputedStyle(dom);
      if (direction !== getState().direction) {
        setDirection(direction);
      }
    },
    view: ({ children }) => {
      if (!children) {
        return null;
      }
      const state = getState();
      const { className, style } = getSliderStyle(state);
      return m(
        '.glissando',
        m(
          '.glissando-slider',
          {
            oncreate: vnode => {
              vnode.dom.addEventListener('transitionend', onTransitionEnd);
            },
            onremove: vnode => {
              vnode.dom.removeEventListener('transitionend', onTransitionEnd);
            },
            className,
            style,
          },
          getViewIndices().map(viewIndex =>
            m('.glissando-page', children[viewIndex]),
          ),
        ),
      );
    },
  };
};

export { GlissandoSlider };
