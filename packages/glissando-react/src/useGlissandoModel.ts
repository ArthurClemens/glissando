import { Glissando, GlissandoModel, Stream } from 'glissando';
// eslint-disable-next-line import/no-unresolved
import { useState } from 'react';
import { useStream } from 'use-stream';

type TModel = {
  _: Stream<Glissando.State>;
};

export const useGlissandoModel = () => {
  const [model] = useState<Glissando.Model>(GlissandoModel());

  // Subscribe to changes
  useStream<TModel>({
    model: () => ({
      _: model.getState,
    }),
    defer: true,
  });

  return model;
};
