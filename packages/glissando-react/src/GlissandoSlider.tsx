import { useEffectRef } from '@huse/effect-ref';
import { getSliderStyle, Glissando } from 'glissando';
import React, { RefCallback, useCallback, useEffect, useState } from 'react';

import { GlissandoSliderProps } from '../index';

export const GlissandoSlider = (props: GlissandoSliderProps) => {
  const { model, children, locations, location } = props;
  const [sliderNode, setSliderNode] = useState<HTMLDivElement>();
  const {
    getState,
    finalize,
    setCount,
    setDirection,
    getViewIndices,
    setLocations,
    goTo,
  } = model;

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
  const observeTransitionEnd: RefCallback<HTMLDivElement> = useCallback(
    (node: HTMLDivElement) => {
      if (node === null) {
        return null;
      }
      setSliderNode(node);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const onTransitionEnd = (evt: Event) => {
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
      setDirection(direction as Glissando.Direction);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const sliderRef = useEffectRef((node: HTMLDivElement) =>
    observeTransitionEnd(node),
  );

  if (!children) {
    return null;
  }

  const { className, style } = getSliderStyle(getState());

  return (
    <div className="glissando">
      <div
        className={`glissando-slider ${className}`}
        style={style}
        ref={sliderRef}
      >
        {getViewIndices().map(viewIndex => (
          <div key={viewIndex} className="glissando-page">
            {children[viewIndex]}
          </div>
        ))}
      </div>
    </div>
  );
};
