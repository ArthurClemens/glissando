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
export const getSliderStyle = (state: Glissando.State) => {
  const slotCount = 2 * state.sideViews + 1;
  const slotWidth = 100 / slotCount;
  const direction = state.direction === 'rtl' ? 1 : -1;
  let sliderTranslateX: number = direction * slotWidth * (state.sideViews + 0);
  if (state.targetIndex > state.index) {
    sliderTranslateX = direction * slotWidth * (state.sideViews + 1);
  } else if (state.targetIndex < state.index) {
    sliderTranslateX = direction * slotWidth * (state.sideViews - 1);
  }

  const style = {
    width: `calc(${slotCount} * calc(100%))`,
    transform: `translateX(${sliderTranslateX}%)`,
    ...(!state.isAnimating
      ? {
          transitionDuration: '0ms',
        }
      : undefined),
  };
  const className = state.isAnimating ? 'glissando-animating' : '';
  return { style, className };
};
