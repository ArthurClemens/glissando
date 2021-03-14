import type { Glissando } from './types';
/**
 * Returns the classname and style object for the current model state.
 * Usage:
 *
 * const { className, style } = getSliderStyle(getState());
 * ...
 * <div
 *   className={`glissando-slider ${className}`}
 *   style={style}
 * >
 */
export declare const getSliderStyle: (
  state: Glissando.State,
) => {
  style: {
    transitionDuration?: string | undefined;
    width: string;
    transform: string;
  };
  className: string;
};
