import { Glissando, GlissandoModel } from 'glissando';
import m from 'mithril';

export const useGlissandoModel = (initialState?: Glissando.InitialState) => {
  const model = GlissandoModel(initialState);

  // Subscribe to changes
  model.getState.map(m.redraw);

  return model;
};
