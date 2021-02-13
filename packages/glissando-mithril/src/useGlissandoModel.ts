import { GlissandoModel } from 'glissando';
import m from 'mithril';

export const useGlissandoModel = () => {
  const model = GlissandoModel();

  // Subscribe to changes
  model.getState.map(m.redraw);

  return model;
};
