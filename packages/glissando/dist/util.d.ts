import { Glissando } from './types';

export declare const getSliderStyle: (
  state: Glissando.State,
) => {
  style: {
    transitionDuration?: string;
    width: string;
    transform: string;
  };
  className: string;
};
