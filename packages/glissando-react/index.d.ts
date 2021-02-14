import type { Glissando } from 'glissando';
import type { ReactNode, FunctionComponent } from 'react';

export interface GlissandoSliderProps {
  model: Glissando.Model;
  children: ReactNode[];
  locations?: string[];
  location?: string;
  className?: string;
}

export const GlissandoSlider: FunctionComponent<GlissandoSliderProps>;

export const useGlissandoModel: (
  initialState?: Glissando.InitialState,
) => Glissando.Model;

// Re-export
export { getSliderStyle, GlissandoModel } from 'glissando';
export type { Glissando } from 'glissando';
