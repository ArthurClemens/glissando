import { GlissandoModel } from 'glissando';
// eslint-disable-next-line import/no-unresolved
import m from 'mithril';

export const useGlissandoModel = () => {
  const model = GlissandoModel();

  // Subscribe to changes
  model.getState.map(m.redraw);

  return model;
};
