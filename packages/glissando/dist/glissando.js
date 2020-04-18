import Stream from 'mithril/stream';

// eslint-disable-next-line import/no-unresolved
const setIndex = state => change => {
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
const GlissandoModel = (props = {}) => {
  const sideViews = props.sideViews || 1;
  const slots = [...Array(1 + sideViews * 2)].map((_, i) => i - sideViews);
  const initialState = {
    index: props.index || 0,
    targetIndex: props.index || 0,
    isAnimating: false,
    count: 0,
    slots,
    sideViews,
  };
  const glissandoState = {
    initialState,
    actions: update => {
      return {
        previous: ({ animate } = { animate: true }) => {
          update(state => {
            return setIndex(state)({
              index: state.index - 1,
              animate: animate !== false,
            });
          });
        },
        next: ({ animate } = { animate: true }) => {
          update(state => {
            return setIndex(state)({
              index: state.index + 1,
              animate: animate !== false,
            });
          });
        },
        goTo: change => {
          update(state => {
            return setIndex(state)(change);
          });
        },
        finalize: index => {
          update(state => {
            return setIndex(state)({
              index,
              animate: false,
            });
          });
        },
        setCount: count => {
          update(state => {
            return setIndex({
              ...state,
              count,
            })({ index: state.index });
          });
        },
      };
    },
    selectors: states => {
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
  const update = Stream();
  const states = Stream.scan(
    (state, patch) => patch(state),
    {
      ...glissandoState.initialState,
    },
    update,
  );
  const actions = {
    ...glissandoState.actions(update),
  };
  const selectors = {
    ...glissandoState.selectors(states),
  };
  // onChange listener to provide feedback when the index has changed (with or without animation)
  const createOnChange = modelState => {
    const pluck = value => {
      if (value === Stream.SKIP) {
        return Stream.SKIP;
      }
      return {
        index: value.index,
        count: value.count,
      };
    };
    const filter = predicate => (_acc, value) =>
      predicate(value) ? value : Stream.SKIP;
    const isDone = s => {
      return s === Stream.SKIP ? true : s.index === s.targetIndex;
    };
    const filtered = Stream.scan(filter(isDone), Stream.SKIP, modelState).map(
      pluck,
    );
    return filtered.map;
  };
  return {
    getState: states,
    ...actions,
    ...selectors,
    onChange: createOnChange(states),
  };
};

const getSliderStyle = state => {
  const slotCount = 2 * state.sideViews + 1;
  const slotWidth = 100 / slotCount;
  let sliderTransformX = -1 * slotWidth * (state.sideViews + 0);
  if (state.targetIndex > state.index) {
    sliderTransformX = -1 * slotWidth * (state.sideViews + 1);
  } else if (state.targetIndex < state.index) {
    sliderTransformX = -1 * slotWidth * (state.sideViews - 1);
  }
  const style = {
    width: `${slotCount * 100}%`,
    transform: `translate3d(${sliderTransformX}%, 0, 0)`,
    ...(!state.isAnimating
      ? {
          transitionDuration: '0ms',
        }
      : undefined),
  };
  const className = state.isAnimating ? 'glissando-animating' : '';
  return { style, className };
};

export { GlissandoModel, getSliderStyle };
