import { Glissando } from '../index';

export const getSliderStyle = (state: Glissando.State) => {
  const slotCount = 2 * state.sideViews + 1;
  const slotWidth = 100 / slotCount;
  const direction = state.direction === 'rtl' ? 1 : -1;
  let sliderTransformX: number = direction * slotWidth * (state.sideViews + 0);
  if (state.targetIndex > state.index) {
    sliderTransformX = direction * slotWidth * (state.sideViews + 1);
  } else if (state.targetIndex < state.index) {
    sliderTransformX = direction * slotWidth * (state.sideViews - 1);
  }

  const style = {
    width: `${slotCount * 100}%`,
    transform: `translate3d(${sliderTransformX}%, 0, 0)`,
    ...(!state.isAnimating
      ? {
          transitionDuration: '0ms',
        }
      : undefined),
  };
  const className = state.isAnimating ? 'glissando-animating' : '';
  return { style, className };
};
