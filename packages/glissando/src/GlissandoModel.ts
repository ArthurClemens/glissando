// eslint-disable-next-line import/no-unresolved
import Stream from 'mithril/stream';

import { Glissando } from '../index';

type PatchFn = (state: Glissando.State) => Glissando.State;

type IndexChange = {
  index: number;
  animate?: boolean;
};

const setIndex = (state: Glissando.State) => (change: IndexChange) => {
  const newIndex = Math.min(change.index, state.count - 1);
  return newIndex < state.count
    ? {
        ...state,
        ...(change.animate ? undefined : { index: newIndex }),
        targetIndex: newIndex,
        isAnimating: !!change.animate,
      }
    : state;
};

export const GlissandoModel = (props: Partial<Glissando.Props> = {}) => {
  const sideViews = props.sideViews || 1;
  const slots = [...Array(1 + sideViews * 2)].map((_, i) => i - sideViews);

  const initialState: Glissando.State = {
    index: props.index || 0,
    targetIndex: props.index || 0,
    isAnimating: false,
    count: 0,
    direction: 'ltr', // set by libs glissando-mithril etc
    slots,
    sideViews,
  };

  const glissandoState = {
    initialState,
    actions: (update: Stream<PatchFn>) => {
      return {
        previous: ({ animate }: { animate?: boolean } = { animate: true }) => {
          update((state: Glissando.State) => {
            return setIndex(state)({
              index: state.index - 1,
              animate: animate !== false,
            });
          });
        },
        next: ({ animate }: { animate?: boolean } = { animate: true }) => {
          update((state: Glissando.State) => {
            return setIndex(state)({
              index: state.index + 1,
              animate: animate !== false,
            });
          });
        },
        goTo: (change: IndexChange) => {
          update((state: Glissando.State) => {
            return setIndex(state)(change);
          });
        },
        finalize: (index: number) => {
          update((state: Glissando.State) => {
            return setIndex(state)({
              index,
              animate: false,
            });
          });
        },
        setCount: (count: number) => {
          update((state: Glissando.State) => {
            return setIndex({
              ...state,
              count,
            })({ index: state.index });
          });
        },
        setDirection: (direction: Glissando.Direction) => {
          update((state: Glissando.State) => {
            return {
              ...state,
              direction,
            };
          });
        },
      };
    },

    selectors: (states: Stream<Glissando.State>) => {
      return {
        hasNext: () => {
          const state = states();
          return state.index < state.count - 1;
        },
        hasPrevious: () => {
          const state = states();
          return state.index > 0;
        },
        isAnimating: () => {
          const state = states();
          return state.isAnimating;
        },
        getViewIndices: () => {
          const state = states();
          return slots.map(slotIndex => {
            let index = slotIndex + state.index + 0;
            if (slotIndex < 0 && state.targetIndex < state.index) {
              index = slotIndex + state.targetIndex + 1;
            } else if (slotIndex > 0 && state.targetIndex > state.index) {
              index = slotIndex + state.targetIndex - 1;
            }
            return index;
          });
        },
      };
    },
  };

  const update: Stream<PatchFn> = Stream<PatchFn>();

  const states: Glissando.States = Stream.scan(
    (state: Glissando.State, patch: PatchFn) => patch(state),
    {
      ...glissandoState.initialState,
    },
    update,
  );

  const actions = {
    ...glissandoState.actions(update),
  };

  const selectors: Glissando.Selectors = {
    ...glissandoState.selectors(states),
  };

  return {
    getState: states,
    ...actions,
    ...selectors,
  } as Glissando.Model;
};
