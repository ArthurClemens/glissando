import { Glissando } from 'glissando';
// eslint-disable-next-line import/no-unresolved
import { ClosureComponent } from 'mithril';

export interface Attrs {
  model: Glissando.Model;
}

type GlissandoSlider = ClosureComponent<Attrs>;
declare const GlissandoSlider: ClosureComponent<Attrs>;

export { GlissandoSlider };
export as namespace GlissandoSlider;

export { getSliderStyle, GlissandoModel, Glissando } from 'glissando';
