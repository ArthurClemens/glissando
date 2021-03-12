import { Glissando } from 'glissando';
import { ClosureComponent } from 'mithril';
interface Attrs {
    model: Glissando.Model;
    location?: string;
    locations?: string[];
    className?: string;
}
declare type TGlissandoSlider = ClosureComponent<Attrs>;
export declare const GlissandoSlider: TGlissandoSlider;
export {};
