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

export { Stream };

export namespace Glissando {
  type State = {
    /**
     * The current location index.
     */
    index: number;

    /**
     * The current location id.
     */
    location?: string;

    /**
     * Locations ids.
     */
    locations?: string[];

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

  type InitialState = {
    index: number;
    sideViews: number;
  };

  type Props = {
    index: number;
    sideViews: number;
  };

  type States = Stream<State>;

  /**
   * Only returns a changed state.
   */
  type ChangedState = Glissando.State | typeof Stream.SKIP;

  /**
   * Accumulation of changed states only.
   */
  type ChangedStates = Stream<ChangedState>;

  type Direction = 'rtl' | 'ltr';

  type IndexChange = {
    index: number;
    animate?: boolean;
  };

  type LocationChange = {
    location: string;
    animate?: boolean;
  };

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
     * @param location Location id.
     * @param animate Optionally animate the transition. Default `false`.
     */
    goTo: (change: IndexChange | LocationChange) => void;

    /**
     * For internal use. Sets the number of locations (commonly the number of child elements of the slider).
     */
    setCount: (count: number) => void;

    /**
     * For internal use. Sets the location ids.
     */
    setLocations: (ids: string[]) => void;

    /**
     * For internal use. Sets the index to the matching location id. If no matching id is found, defaults to 0.
     */
    setLocation: (change: LocationChange) => void;

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
     * Returns the current location id. If no next location exist returns undefined.
     */
    getLocation: () => string | undefined;

    /**
     * Returns the next location id. If no next location exist returns undefined.
     */
    getNextLocation: () => string | undefined;

    /**
     * Returns the previous location id. If no previous location exist returns undefined.
     */
    getPreviousLocation: () => string | undefined;

    /**
     * For internal use.
     */
    getViewIndices: () => number[];
  };

  type Model = {
    /**
     * State stream.
     */
    getState: States;
    getChanges: States;
  } & Selectors &
    Actions;
}
