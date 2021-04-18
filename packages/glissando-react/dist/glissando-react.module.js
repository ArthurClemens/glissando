import { useEffectRef } from '@huse/effect-ref';
import { getSliderStyle, GlissandoModel } from 'glissando';
import { useCallback, useEffect, useState } from 'react';
import { Fragment, jsx } from 'react/jsx-runtime';
import { useStream } from 'use-stream';

export { getSliderStyle, GlissandoModel } from 'glissando';

const GlissandoSlider = props => {
  const {
    model,
    children,
    locations,
    location,
    className: sliderClassName,
  } = props;
  const [sliderNode, setSliderNode] = useState();
  const {
    getState,
    finalize,
    setCount,
    setDirection,
    getViewIndices,
    setLocations,
    goTo,
  } = model;
  /* SIDE EFFECTS */
  // Child count
  useEffect(() => {
    const count = (children || []).length;
    if (count !== getState().count) {
      setCount(count);
    }
  }, [children, getState, setCount]);
  // Locations
  useEffect(() => {
    if (
      locations &&
      JSON.stringify(locations) !== JSON.stringify(getState().locations)
    ) {
      setLocations(locations);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations]);
  // Location
  useEffect(() => {
    if (location && location !== getState().location) {
      goTo({ location });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  // Event listener: transitionend
  const observeTransitionEnd = useCallback(
    node => {
      if (node === null) {
        return jsx(Fragment, {}, void 0);
      }
      setSliderNode(node);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const onTransitionEnd = evt => {
        finalize(getState().targetIndex);
      };
      node.addEventListener('transitionend', onTransitionEnd);
      return () => {
        node.removeEventListener('transitionend', onTransitionEnd);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  // Reading direction
  useEffect(() => {
    if (!sliderNode) {
      return;
    }
    const { direction } = getComputedStyle(sliderNode);
    if (direction !== getState().direction) {
      setDirection(direction);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);
  const sliderRef = useEffectRef(node => observeTransitionEnd(node));
  /* END SIDE EFFECTS */
  if (!children) {
    return jsx(Fragment, {}, void 0);
  }
  const { className, style } = getSliderStyle(getState());
  return jsx(
    'div',
    {
      className: ['glissando', sliderClassName].join(' '),
      children: jsx(
        'div',
        {
          className: `glissando-slider ${className}`,
          style,
          ref: sliderRef,
          children: getViewIndices().map(viewIndex =>
            jsx(
              'div',
              {
                className: 'glissando-page',
                children: children[viewIndex],
              },
              viewIndex,
            ),
          ),
        },
        void 0,
      ),
    },
    void 0,
  );
};

/**
 * Wrapper around GlissandoModel that subscribes to changes and causes React to redraw on each change.
 */
const useGlissandoModel = initialState => {
  const [model] = useState(GlissandoModel(initialState));
  // Subscribe to changes
  useStream({
    model: () => ({
      _: model.getState,
    }),
    defer: true,
  });
  return model;
};

export { GlissandoSlider, useGlissandoModel };
