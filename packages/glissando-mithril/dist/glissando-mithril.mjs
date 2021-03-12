import { getSliderStyle, GlissandoModel } from 'glissando';
import m from 'mithril';

export { getSliderStyle, GlissandoModel } from 'glissando';

const GlissandoSlider = initialVnode => {
  const { model } = initialVnode.attrs;
  const {
    getState,
    finalize,
    setCount,
    setDirection,
    getViewIndices,
    goTo,
    setLocations,
  } = model;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onTransitionEnd = evt => {
    finalize(getState().targetIndex);
  };
  return {
    onupdate: ({ dom, children, attrs }) => {
      const { locations, location } = attrs;
      // Children count
      const count = children.length;
      if (count !== getState().count) {
        setCount(count);
      }
      // Locations
      if (
        locations &&
        JSON.stringify(locations) !== JSON.stringify(getState().locations)
      ) {
        setLocations(locations);
      }
      // Location
      if (location && location !== getState().location) {
        goTo({ location });
      }
      // Reading direction
      const { direction } = getComputedStyle(dom);
      if (direction !== getState().direction) {
        setDirection(direction);
      }
    },
    view: ({ children, attrs }) => {
      if (!children) {
        return null;
      }
      const { className: sliderClassName } = attrs;
      const { className, style } = getSliderStyle(getState());
      return m(
        `.glissando ${sliderClassName}`,
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

/**
 * Wrapper around GlissandoModel that subscribes to changes and causes Mithril to redraw on each change.
 */
const useGlissandoModel = initialState => {
  const model = GlissandoModel(initialState);
  // Subscribe to changes
  model.getState.map(m.redraw);
  return model;
};

export { GlissandoSlider, useGlissandoModel };
