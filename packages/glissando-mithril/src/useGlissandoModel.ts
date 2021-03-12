import { Glissando, GlissandoModel } from 'glissando';
import m from 'mithril';

/**
 * Wrapper around GlissandoModel that subscribes to changes and causes Mithril to redraw on each change.
 */
export const useGlissandoModel = (initialState?: Glissando.InitialState) => {
  const model = GlissandoModel(initialState);

  // Subscribe to changes
  model.getState.map(m.redraw);

  return model;
};
