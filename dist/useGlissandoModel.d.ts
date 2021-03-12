import { Glissando } from 'glissando';
/**
 * Wrapper around GlissandoModel that subscribes to changes and causes Mithril to redraw on each change.
 */
export declare const useGlissandoModel: (initialState?: Glissando.InitialState | undefined) => Glissando.Model;
