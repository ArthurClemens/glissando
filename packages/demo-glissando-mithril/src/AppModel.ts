// eslint-disable-next-line import/no-unresolved
import Stream from 'mithril/stream';

export type TAppState = {
  isAnimated: boolean;
  isRtl: boolean;
  count: number;
  selectIndices: number[];
};

type PatchFn = (state: TAppState) => TAppState;

export type TChangedAppState = TAppState | typeof Stream.SKIP;
export type TChangedAppStates = Stream<TChangedAppState>;

export type TAppStates = Stream<TAppState>;

export type TAppModel = {
  getState: TAppStates;
  getChanges: TAppStates;
  setIsAnimated: (value: boolean) => void;
  setIsRtl: (value: boolean) => void;
  setCount: (value: number) => void;
};

const createSelectIndices = (count: number) =>
  [...Array(count)].map((_, i) => i);

export const AppModel = (props: TAppState) => {
  const initialState: TAppState = {
    isAnimated: props.isAnimated,
    isRtl: props.isRtl,
    count: props.count,
    selectIndices: createSelectIndices(props.count),
  };

  const appState = {
    initialState,
    actions: (update: Stream<PatchFn>) => ({
      setIsAnimated: (isAnimated: boolean) => {
        update((state: TAppState) => ({
          ...state,
          isAnimated,
        }));
      },
      setIsRtl: (isRtl: boolean) => {
        update((state: TAppState) => ({
          ...state,
          isRtl,
        }));
      },
      setCount: (count: number) => {
        update((state: TAppState) => ({
          ...state,
          count,
          selectIndices: createSelectIndices(count),
        }));
      },
    }),
  };

  const update: Stream<PatchFn> = Stream<PatchFn>();

  const states: TAppStates = Stream.scan(
    (state: TAppState, patch: PatchFn) => patch(state),
    {
      ...appState.initialState,
    },
    update,
  );

  const actions = {
    ...appState.actions(update),
  };

  const changedStates: TChangedAppStates = Stream.scan(
    (state: TChangedAppState, value) =>
      JSON.stringify(state, null, 2) === JSON.stringify(value, null, 2)
        ? Stream.SKIP
        : value,
    {
      ...appState.initialState,
    },
    states,
  );

  const getChanges = Stream.lift(value => value as TAppState, changedStates);

  return {
    getState: states,
    getChanges,
    ...actions,
  };
};
