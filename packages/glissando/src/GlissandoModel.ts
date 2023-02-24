import Stream from 'mithril-stream-standalone';

import type { Glissando } from './types';

type PatchFn = (state: Glissando.State) => Glissando.State;

const calculateNewIndex = (
  state: Glissando.State,
  index: number | undefined,
) => {
  if (index === undefined || Number.isNaN(index)) {
    return {
      newIndex: state.index,
      shouldUpdate: false,
    };
  }
  const newIndex = Math.min(index, state.count - 1);
  const isValid = newIndex >= 0 && newIndex < state.count;
  const shouldUpdate = isValid && newIndex !== state.index;
  return {
    newIndex,
    shouldUpdate,
  };
};

const setIndex =
  (state: Glissando.State) => (change: Glissando.IndexChange) => {
    const { newIndex, shouldUpdate } = calculateNewIndex(state, change.index);
    return shouldUpdate
      ? {
          ...state,
          ...(change.animate ? undefined : { index: newIndex }),
          targetIndex: newIndex,
          isAnimating: !!change.animate,
        }
      : state;
  };

const setLocation =
  (state: Glissando.State) => (change: Glissando.LocationChange) => {
    if (!state.locations || state.locations.length === 0) {
      return state;
    }
    let locationStr = change.location.toString();
    let index = state.locations.indexOf(locationStr);
    if (index === -1) {
      // Location does not exist; default to first index
      index = 0;
      locationStr = state.locations[index];
    }
    const shouldAnimate =
      state.location === undefined
        ? false // don't animate if we are setting the first location
        : change.animate !== false;
    const newState = {
      ...state,
      location: locationStr,
    };
    const indexChange: Glissando.IndexChange = {
      index,
      animate: shouldAnimate,
    };
    return setIndex(newState)(indexChange);
  };

type IndexLocationChange = (index: number) => number;

const lookupLocation =
  (state: Glissando.State) => (changeFn: IndexLocationChange) => {
    if (!state.locations || !state.location) {
      return undefined;
    }
    const index = state.locations.indexOf(state.location);
    if (index === -1) {
      return undefined;
    }
    return state.locations[changeFn(index)];
  };

const getInitialState = (
  {
    index = 0,
    count = 0,
    sideViews = 1,
    location,
    locations,
  }: Glissando.InitialState = {} as Glissando.InitialState,
) => {
  const slots = Array.from({ length: 1 + sideViews * 2 }, (_, i) => i).map(
    (_, i) => i - sideViews,
  );
  const initialState: Glissando.State = {
    targetIndex: index,
    index,
    count,
    ...(Array.isArray(locations)
      ? {
          locations,
          count: locations ? locations.length : 0,
          location: locations[0],
        }
      : undefined),
    ...(location
      ? {
          location,
          index: Array.isArray(locations)
            ? locations.indexOf(location) || index
            : index,
        }
      : undefined),
    isAnimating: false,
    direction: 'ltr', // set by libs glissando-mithril etc
    slots,
    sideViews,
  };
  initialState.targetIndex = initialState.index;
  return initialState;
};

export const GlissandoModel = (
  props: Glissando.InitialState = {} as Glissando.InitialState,
) => {
  const initialState = getInitialState(props);

  const glissandoState = {
    initialState,
    actions: (update: Stream<PatchFn>) => ({
      previous: ({ animate }: { animate?: boolean } = { animate: true }) => {
        update((state: Glissando.State) =>
          setIndex(state)({
            index: state.index - 1,
            animate: animate !== false,
          }),
        );
      },
      next: ({ animate }: { animate?: boolean } = { animate: true }) => {
        update((state: Glissando.State) =>
          setIndex(state)({
            index: state.index + 1,
            animate: animate !== false,
          }),
        );
      },
      goTo: ({
        index,
        location,
        animate,
      }: {
        index?: number;
        location?: Glissando.Location;
        animate?: boolean;
      }) => {
        update((state: Glissando.State) => {
          if (location) {
            const change: Glissando.LocationChange = {
              location,
              animate,
            };
            return setLocation(state)(change);
          }
          if (index === undefined) {
            return state;
          }
          const change: Glissando.IndexChange = {
            index,
            animate,
          };
          return setIndex(state)(change);
        });
      },
      finalize: (index: number) => {
        update((state: Glissando.State) =>
          setIndex(state)({
            index,
            animate: false,
          }),
        );
      },
      setCount: (count: number) => {
        update((state: Glissando.State) =>
          setIndex({
            ...state,
            count,
          })({ index: state.index }),
        );
      },
      setDirection: (direction: Glissando.Direction) => {
        update((state: Glissando.State) => ({
          ...state,
          direction,
        }));
      },
      setLocations: (locations: Glissando.Location[]) => {
        update((state: Glissando.State) => ({
          ...state,
          locations,
          count: locations.length,
        }));
      },
    }),

    selectors: (states: Stream<Glissando.State>) => ({
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
        return state.slots.map(slotIndex => {
          let index = slotIndex + state.index + 0;
          if (slotIndex < 0 && state.targetIndex < state.index) {
            index = slotIndex + state.targetIndex + 1;
          } else if (slotIndex > 0 && state.targetIndex > state.index) {
            index = slotIndex + state.targetIndex - 1;
          }
          return index;
        });
      },
      getLocation: () => {
        const state = states();
        return lookupLocation(state)(index => index);
      },
      getNextLocation: () => {
        const state = states();
        return lookupLocation(state)(index => index + 1);
      },
      getPreviousLocation: () => {
        const state = states();
        return lookupLocation(state)(index => index - 1);
      },
    }),
  };

  const update: Stream<PatchFn> = Stream<PatchFn>();

  const states: Glissando.States = Stream.scan(
    (state: Glissando.State, patch: PatchFn) => patch(state),
    {
      ...glissandoState.initialState,
    },
    update,
  );

  // Debugging:
  // states.map(state => console.log(JSON.stringify(state, null, 2)));

  const actions = {
    ...glissandoState.actions(update),
  };

  const selectors: Glissando.Selectors = {
    ...glissandoState.selectors(states),
  };

  const changedStates: Glissando.ChangedStates = Stream.scan(
    (state: Glissando.ChangedState, value) =>
      JSON.stringify(state, null, 2) === JSON.stringify(value, null, 2)
        ? Stream.SKIP
        : value,
    Stream.SKIP,
    states,
  );

  const getChanges = Stream.lift(
    value => value as Glissando.State,
    changedStates,
  );

  return {
    getState: states,
    getChanges,
    ...actions,
    ...selectors,
  } as Glissando.Model;
};
