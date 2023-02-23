import { deepStrictEqual } from 'assert';
import { GlissandoModel } from 'glissando';
import { createLocationsFromPath } from 'glissando-helpers';

it('createLocationsFromPath, model without locations, empty path', () => {
  const model = GlissandoModel();
  const path = '';
  const locations = createLocationsFromPath(path, model.getState().locations);
  const expectedLocations = [''];

  deepStrictEqual(locations, expectedLocations);
});

it('createLocationsFromPath, model without locations', () => {
  const model = GlissandoModel();
  const path = '/users/Ferdinand/details';
  const locations = createLocationsFromPath(path, model.getState().locations);
  const expectedLocations = [
    '/users',
    '/users/Ferdinand',
    '/users/Ferdinand/details',
  ];

  deepStrictEqual(locations, expectedLocations);
});

it('createLocationsFromPath, model with locations, first path', () => {
  const model = GlissandoModel({
    locations: ['/users', '/users/Ferdinand'],
  });
  const path = '/users';
  const locations = createLocationsFromPath(path, model.getState().locations);
  const expectedLocations = ['/users', '/users/Ferdinand'];

  deepStrictEqual(locations, expectedLocations);
});

it('createLocationsFromPath, model with locations, deepest path', () => {
  const model = GlissandoModel({
    locations: ['/users', '/users/Ferdinand'],
  });
  const path = '/users/Ferdinand/details';
  const locations = createLocationsFromPath(path, model.getState().locations);
  const expectedLocations = [
    '/users',
    '/users/Ferdinand',
    '/users/Ferdinand/details',
  ];

  deepStrictEqual(locations, expectedLocations);
});

it('createLocationsFromPath, model with flat location ids, path at start', () => {
  const model = GlissandoModel({
    locations: ['/1', '/2', '/3', '/4', '/5', '/6', '/7', '/8', '/9', '/10'],
  });
  const path = '/1';
  const locations = createLocationsFromPath(path, model.getState().locations);
  const expectedLocations = ['/1'];

  deepStrictEqual(locations, expectedLocations);
});

it('createLocationsFromPath, model with flat location ids, path in middle', () => {
  const model = GlissandoModel({
    locations: ['/1', '/2', '/3', '/4', '/5', '/6', '/7', '/8', '/9', '/10'],
  });
  const path = '/5';
  const locations = createLocationsFromPath(path, model.getState().locations);
  const expectedLocations = ['/1', '/2', '/3', '/4', '/5'];

  deepStrictEqual(locations, expectedLocations);
});

it('createLocationsFromPath, model with some hierarchy, path in middle', () => {
  const model = GlissandoModel({
    locations: [
      '/1',
      '/2',
      '/3',
      '/4',
      '/4/1',
      '/4/2',
      '/4/3',
      '/5',
      '/6',
      '/7',
      '/8',
      '/9',
      '/10',
    ],
  });
  const path = '/4/1';
  const locations = createLocationsFromPath(path, model.getState().locations);
  const expectedLocations = ['/1', '/2', '/3', '/4', '/4/1'] as string[];

  deepStrictEqual(locations, expectedLocations);
});
