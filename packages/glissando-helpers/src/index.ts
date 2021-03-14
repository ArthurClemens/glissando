const pathToTrail = (path: string) => {
  const prefix = path.indexOf('/') === -1 ? '' : '/';
  if (prefix === '') {
    return [path];
  }
  return path
    .split(prefix)
    .filter(Boolean)
    .map(fragment => `${prefix}${fragment}`)
    .reduce((acc, fragment) => {
      const previousPath = acc[acc.length - 1];
      const combined = `${previousPath || ''}${fragment}`;
      return [...acc, combined];
    }, [] as string[]);
};

const consolidateTrails = (
  path: string = '',
  pathTrail: string[],
  modelTrail: string[] = [],
) => {
  const pathDepth = path.split('/').length;

  const longest = pathTrail.length > modelTrail.length ? pathTrail : modelTrail;

  type ProcessData = {
    pathTrailIndex: number;
    foundMatch: boolean;
    foundMatchDepth: number;
    invalidate: boolean;
    paths: string[];
  };
  const result = longest.reduce(
    (acc, p, i) => {
      const { pathTrailIndex, foundMatch, invalidate, foundMatchDepth } = acc;
      if (invalidate) {
        return acc;
      }
      const pathTrailPath = pathTrail[pathTrailIndex];
      const modelPath = modelTrail[i] || '';

      // Path trail matches model: foundMatch
      if (pathTrailPath === modelPath) {
        return {
          ...acc,
          foundMatch: true,
          pathTrailIndex: pathTrailIndex + 1,
          paths: [...acc.paths, pathTrailPath],
        };
      }

      // Path trail does not match model: override and invalidate
      // so that no other paths will be copied
      if (foundMatch && pathTrailPath && pathTrailPath !== modelPath) {
        return {
          ...acc,
          invalidate: true,
          pathTrailIndex: pathTrailIndex + 1,
          paths: [...acc.paths, pathTrailPath],
        };
      }

      const modelPathDepth = modelPath.split('/').length;

      // When a match was found, copy deeper levels from the model path
      // as long as the start of these pathss match the input path.
      if (
        foundMatch &&
        modelPathDepth >= foundMatchDepth &&
        new RegExp(`^${path}[\\/$]`).test(modelPath)
      ) {
        return {
          ...acc,
          paths: [...acc.paths, modelPath],
        };
      }
      // Copy model paths as long as they are not
      // deeper than the input path.
      if (!foundMatch && modelPathDepth <= foundMatchDepth) {
        return {
          ...acc,
          paths: [...acc.paths, modelPath],
        };
      }
      return acc;
    },
    {
      pathTrailIndex: 0,
      foundMatch: false,
      foundMatchDepth: pathDepth,
      invalidate: false,
      paths: [],
    } as ProcessData,
  );

  return result.paths.filter(Boolean);
};

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

export const createLocationsFromPath = (
  path: string = '',
  modelTrail: string[] = [],
) => {
  const pathTrail = pathToTrail(path);

  if (modelTrail.length === 0) {
    return pathTrail;
  }

  return consolidateTrails(path, pathTrail, modelTrail);
};
