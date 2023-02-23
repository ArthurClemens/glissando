/**
 * Helper function to create the list of locations (and the current location) from a path.
 * Creates a breadcrumb trail from the path and returns a new list of locations
 * based on the merge of the breadcrumb trail and the current model locations.
 * From path:
 *   "/users/Ferdinand/details"
 * The generated locations will be:
 *   ["/users", "/users/Ferdinand", "/users/Ferdinand/details"]
 *
 * Usage:
 *
 * const location = m.route.get();
 * const locations = createLocationsFromPath(
 *   location,
 *   model.getState().locations,
 * );
 */
export declare const createLocationsFromPath: (path?: string, modelTrail?: string[]) => string[];
