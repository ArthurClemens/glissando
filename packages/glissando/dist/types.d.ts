import Stream from 'mithril/stream';

export declare namespace Glissando {
  type Location = string;
  type State = {
    /**
     * The current location index.
     */
    index: number;
    /**
     * The current location id.
     */
    location?: Location;
    /**
     * Locations ids.
     */
    locations?: Location[];
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
    /**
     * The number of side views; default: 1.
     */
    sideViews?: number;
  } & (
    | {
        /**
         * The current location id.
         */
        location?: Location;
        /**
         * Locations ids.
         * If no location is passed in the initial state, it is set to the first element of locations.
         */
        locations?: Location[];
        index?: never;
        count?: never;
      }
    | {
        /**
         * The current location index.
         */
        index?: number;
        /**
         * The number of pages / locations. Default 0.
         */
        count?: number;
        location?: never;
        locations?: never;
      }
  );
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
    location: Location;
    animate?: boolean;
  };
  type Actions = {
    /**
     * Go to the previous location.
     * @param animate Optionally animate the transition. Default `true`.
     */
    previous: (props?: { animate?: boolean }) => void;
    /**
     * Go to the next location.
     * @param animate Optionally animate the transition. Default `true`.
     */
    next: (props?: { animate?: boolean }) => void;
    /**
     * Go to a location.
     * @param index Location index.
     * @param location Location id.
     * @param animate Optionally animate the transition. Default `false`.
     */
    goTo: (change: IndexChange | LocationChange) => void;
    /**
     * Sets the number of locations (commonly the number of child elements of the slider).
     */
    setCount: (count: number) => void;
    /**
     * Sets the location ids.
     * Also updates the count with the number of ids.
     */
    setLocations: (locations: Location[]) => void;
    /**
     * Sets the index to the matching location id. If no matching id is found, defaults to 0.
     */
    setLocation: (change: LocationChange) => void;
    /**
     * Set to 'rtl to change the slider's reading/sliding direction to right-to-left.
     */
    setDirection: (direction: Direction) => void;
    /**
     * Finalizes animated transitions.
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
    getLocation: () => Location | undefined;
    /**
     * Returns the next location id. If no next location exist returns undefined.
     */
    getNextLocation: () => Location | undefined;
    /**
     * Returns the previous location id. If no previous location exist returns undefined.
     */
    getPreviousLocation: () => Location | undefined;
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
