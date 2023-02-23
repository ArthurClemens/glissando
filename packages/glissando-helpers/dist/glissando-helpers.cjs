"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const pathToTrail = (path) => {
  const prefix = path.indexOf("/") === -1 ? "" : "/";
  if (prefix === "") {
    return [path];
  }
  return path.split(prefix).filter(Boolean).map((fragment) => `${prefix}${fragment}`).reduce((acc, fragment) => {
    const previousPath = acc[acc.length - 1];
    const combined = `${previousPath || ""}${fragment}`;
    return [...acc, combined];
  }, []);
};
const consolidateTrails = (path = "", pathTrail, modelTrail = []) => {
  const pathDepth = path.split("/").length;
  const longest = pathTrail.length > modelTrail.length ? pathTrail : modelTrail;
  const result = longest.reduce(
    (acc, _p, i) => {
      const { pathTrailIndex, foundMatch, invalidate, foundMatchDepth } = acc;
      if (invalidate) {
        return acc;
      }
      const pathTrailPath = pathTrail[pathTrailIndex];
      const modelPath = modelTrail[i] || "";
      if (pathTrailPath === modelPath) {
        return {
          ...acc,
          foundMatch: true,
          pathTrailIndex: pathTrailIndex + 1,
          paths: [...acc.paths, pathTrailPath]
        };
      }
      if (foundMatch && pathTrailPath && pathTrailPath !== modelPath) {
        return {
          ...acc,
          invalidate: true,
          pathTrailIndex: pathTrailIndex + 1,
          paths: [...acc.paths, pathTrailPath]
        };
      }
      const modelPathDepth = modelPath.split("/").length;
      if (foundMatch && modelPathDepth >= foundMatchDepth && new RegExp(`^${path}[\\/$]`).test(modelPath)) {
        return {
          ...acc,
          paths: [...acc.paths, modelPath]
        };
      }
      if (!foundMatch && modelPathDepth <= foundMatchDepth) {
        return {
          ...acc,
          paths: [...acc.paths, modelPath]
        };
      }
      return acc;
    },
    {
      pathTrailIndex: 0,
      foundMatch: false,
      foundMatchDepth: pathDepth,
      invalidate: false,
      paths: []
    }
  );
  return result.paths.filter(Boolean);
};
const createLocationsFromPath = (path = "", modelTrail = []) => {
  const pathTrail = pathToTrail(path);
  if (modelTrail.length === 0) {
    return pathTrail;
  }
  return consolidateTrails(path, pathTrail, modelTrail);
};
exports.createLocationsFromPath = createLocationsFromPath;
//# sourceMappingURL=glissando-helpers.cjs.map
