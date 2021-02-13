import { Glissando } from 'glissando';
// eslint-disable-next-line import/no-unresolved
import { ReactNode, FunctionComponent } from 'react';

export type GlissandoSliderProps = {
  model: Glissando.Model;
  children: ReactNode[];
  locations?: string[];
  location?: string;
};

export const GlissandoSlider: FunctionComponent<GlissandoSliderProps>;

export const useGlissandoModel: (
  initialState?: Glissando.InitialState,
) => Glissando.Model;

// Re-export
export { getSliderStyle, GlissandoModel, Glissando } from 'glissando';
