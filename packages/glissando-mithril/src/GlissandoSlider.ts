import { getSliderStyle, Glissando } from 'glissando';
import m, { ClosureComponent } from 'mithril';

interface Attrs {
  model: Glissando.Model;
  location?: string;
  locations?: string[];
  className?: string;
}

type TGlissandoSlider = ClosureComponent<Attrs>;

export const GlissandoSlider: TGlissandoSlider = initialVnode => {
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
  const onTransitionEnd = (evt: Event) => {
    finalize(getState().targetIndex);
  };

  return {
    onupdate: ({ dom, children, attrs }) => {
      const { locations, location } = attrs;

      // Children count
      const count = (children as m.ChildArray).length;
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
        setDirection(direction as Glissando.Direction);
      }
    },
    view: ({ children, attrs }) => {
      if (!children) {
        return null;
      }
      const { className: sliderClassName } = attrs;
      const { className, style } = getSliderStyle(getState());

      return m(
        'div',
        {
          className: ['glissando', sliderClassName].join(' '),
        },
        m(
          '.glissando-slider',
          {
            oncreate: (vnode: m.VnodeDOM) => {
              vnode.dom.addEventListener('transitionend', onTransitionEnd);
            },
            onremove: (vnode: m.VnodeDOM) => {
              vnode.dom.removeEventListener('transitionend', onTransitionEnd);
            },
            className,
            style,
          },
          getViewIndices().map(viewIndex =>
            m('.glissando-page', (children as m.ChildArray)[viewIndex]),
          ),
        ),
      );
    },
  };
};
