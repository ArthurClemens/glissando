import { Glissando, GlissandoModel } from 'glissando';
import { useState } from 'react';
import { useStream } from 'use-stream';

type TModel = {
  _: Glissando.States;
};

/**
 * Wrapper around GlissandoModel that subscribes to changes and causes React to redraw on each change.
 */
export const useGlissandoModel = (initialState?: Glissando.InitialState) => {
  const [model] = useState<Glissando.Model>(GlissandoModel(initialState));

  // Subscribe to changes
  useStream<TModel>({
    model: () => ({
      _: model.getState,
    }),
    defer: true,
  });

  return model;
};
