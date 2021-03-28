import { useState } from 'react';
import { useStream } from 'use-stream';

import { AppModel, TAppModel, TAppState, TAppStates } from './AppModel';

export type { TAppState };

type TModel = {
  _: TAppStates;
};

export const useAppModel = (initialState: TAppState) => {
  const [appModel] = useState<TAppModel>(AppModel(initialState));

  // Subscribe to changes
  useStream<TModel>({
    model: () => ({
      _: appModel.getChanges,
    }),
    defer: true,
  });

  return appModel;
};
