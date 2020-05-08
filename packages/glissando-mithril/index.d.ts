import { Glissando } from 'glissando';
// eslint-disable-next-line import/no-unresolved
import { ClosureComponent } from 'mithril';

export interface Attrs {
  model: Glissando.Model;
  location?: string;
  locations?: string[];
}

type GlissandoSlider = ClosureComponent<Attrs>;
declare const GlissandoSlider: ClosureComponent<Attrs>;

export { GlissandoSlider };
export as namespace GlissandoSlider;

export const useGlissandoModel: (
  initialState?: Glissando.InitialState,
) => Glissando.Model;

// Re-export
export { getSliderStyle, GlissandoModel, Glissando } from 'glissando';
