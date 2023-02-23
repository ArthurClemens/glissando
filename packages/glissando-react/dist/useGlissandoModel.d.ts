import { Glissando } from 'glissando';
/**
 * Wrapper around GlissandoModel that subscribes to changes and causes React to redraw on each change.
 */
export declare const useGlissandoModel: (initialState?: Glissando.InitialState) => Glissando.Model;
