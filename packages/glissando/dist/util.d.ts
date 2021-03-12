import { Glissando } from './types';

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
