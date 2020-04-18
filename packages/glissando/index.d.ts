// eslint-disable-next-line import/no-unresolved
import Stream from 'mithril/stream';

export const GlissandoModel: (
  props?: Partial<Glissando.Props>,
) => Glissando.Model;

export const getSliderStyle: (
  state: Glissando.State,
) => {
  style: {
    transitionDuration?: string;
    width: string;
    transform: string;
  };
  className: string;
};

export namespace Glissando {
  type State = {
    /**
     * The current location index.
     */
    index: number;

    /**
     * The target location index.
     */
    targetIndex: number;

    /**
     * The number of pages / locations.
     */
    count: number;

    /**
     * Whether transitions are animated.
     */
    isAnimating: boolean;

    /**
     * The number of side views; default: 1.
     */
    sideViews: number;

    /**
     * For insternal use: the view slot indices with relative numbers offset to the "current" view.
     */
    slots: number[];

    /**
     * For insternal use: the reading/sliding direction.
     */
    direction: Direction;
  };

  type Props = {
    index: number;
    sideViews: number;
  };

  type States = Stream<State>;

  type Direction = 'rtl' | 'ltr';

  type Actions = {
    /**
     * Go to the previous location.
     * @param animate Optionally animate the transition. Default `true`.
     */
    previous: ({ animate }?: { animate?: boolean }) => void;

    /**
     * Go to the next location.
     * @param animate Optionally animate the transition. Default `true`.
     */
    next: ({ animate }?: { animate?: boolean }) => void;

    /**
     * Go to a location.
     * @param index Location index.
     * @param animate Optionally animate the transition. Default `false`.
     */
    goTo: ({ index, animate }: { index: number; animate?: boolean }) => void;

    /**
     * For internal use. Sets the number of locations (commonly the number of child elements of the slider).
     */
    setCount: (count: number) => void;

    /**
     * For internal use. Set to 'rtl to change the slider's reading/sliding direction to right-to-left.
     */
    setDirection: (direction: Direction) => void;

    /**
     * For internal use. Finalizes animated transitions.
     */
    finalize: (index: number) => void;
  };

  type Selectors = {
    /**
     * Returns true if a previous location if available.
     */
    hasPrevious: () => boolean;

    /**
     * Returns true if a next location if available.
     */
    hasNext: () => boolean;

    /**
     * Returns true if the slider is animating.
     */
    isAnimating: () => boolean;

    /**
     * For internal use.
     */
    getViewIndices: () => number[];
  };

  type OnChangeState = {
    index: number;
    count: number;
  };

  type CompareState = State | typeof Stream.SKIP;

  type OnChange<U> = <U>(
    f: (current: Glissando.OnChangeState) => typeof Stream.SKIP | U,
  ) => Stream<U>;

  type Model = {
    /**
     * State stream.
     */
    getState: States;
    /**
     * State stream with elements `index` and `count`. Is only triggered when one of these elements are changed.
     */
    onChange: OnChange<OnChangeState>;
  } & Selectors &
    Actions;
}
