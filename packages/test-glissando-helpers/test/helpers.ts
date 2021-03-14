import test from 'ava';
import { GlissandoModel } from 'glissando';
import { createLocationsFromPath } from 'glissando-helpers';

test('createLocationsFromPath, model without locations, empty path', t => {
  const model = GlissandoModel();
  const path = '';
  const locations = createLocationsFromPath(path, model.getState().locations);
  const expectedLocations = [''];

  t.deepEqual(locations, expectedLocations);
});

test('createLocationsFromPath, model without locations', t => {
  const model = GlissandoModel();
  const path = '/users/Ferdinand/details';
  const locations = createLocationsFromPath(path, model.getState().locations);
  const expectedLocations = [
    '/users',
    '/users/Ferdinand',
    '/users/Ferdinand/details',
  ];

  t.deepEqual(locations, expectedLocations);
});

test('createLocationsFromPath, model with locations, first path', t => {
  const model = GlissandoModel({
    locations: ['/users', '/users/Ferdinand'],
  });
  const path = '/users';
  const locations = createLocationsFromPath(path, model.getState().locations);
  const expectedLocations = ['/users', '/users/Ferdinand'];

  t.deepEqual(locations, expectedLocations);
});

test('createLocationsFromPath, model with locations, deepest path', t => {
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

  t.deepEqual(locations, expectedLocations);
});

test('createLocationsFromPath, model with flat location ids, path at start', t => {
  const model = GlissandoModel({
    locations: ['/1', '/2', '/3', '/4', '/5', '/6', '/7', '/8', '/9', '/10'],
  });
  const path = '/1';
  const locations = createLocationsFromPath(path, model.getState().locations);
  const expectedLocations = ['/1'];

  t.deepEqual(locations, expectedLocations);
});

test('createLocationsFromPath, model with flat location ids, path in middle', t => {
  const model = GlissandoModel({
    locations: ['/1', '/2', '/3', '/4', '/5', '/6', '/7', '/8', '/9', '/10'],
  });
  const path = '/5';
  const locations = createLocationsFromPath(path, model.getState().locations);
  const expectedLocations = ['/1', '/2', '/3', '/4', '/5'];

  t.deepEqual(locations, expectedLocations);
});

test('createLocationsFromPath, model with some hierarchy, path in middle', t => {
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

  t.deepEqual(locations, expectedLocations);
});
