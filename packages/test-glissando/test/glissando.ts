import test from 'ava';
import { Glissando, GlissandoModel } from 'glissando';

const defaultState: Glissando.State = {
  count: 0,
  direction: 'ltr',
  index: 0,
  isAnimating: false,
  sideViews: 1,
  slots: [-1, 0, 1],
  targetIndex: 0,
};

test('Model state of a new model without an initial state', t => {
  const model = GlissandoModel();
  const expected = defaultState;
  return t.deepEqual(model.getState(), expected);
});

test('Model state of a new model with an initial state (index)', t => {
  const model = GlissandoModel({
    index: 1,
    sideViews: 3,
  });
  const expected = {
    ...defaultState,
    index: 1,
    sideViews: 3,
    slots: [-3, -2, -1, 0, 1, 2, 3],
    targetIndex: 1,
  };
  return t.deepEqual(model.getState(), expected);
});

test('Model state of a new model with an initial state (locations - location automatically set)', t => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
    sideViews: 3,
  });
  const expected = {
    ...defaultState,
    locations: ['a', 'b', 'c'],
    location: 'a',
    count: 3,
    sideViews: 3,
    slots: [-3, -2, -1, 0, 1, 2, 3],
  };
  return t.deepEqual(model.getState(), expected);
});

test('Model state of a new model with an initial state (location)', t => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
    location: 'b',
  });
  const expected = {
    ...defaultState,
    locations: ['a', 'b', 'c'],
    location: 'b',
    index: 1,
    targetIndex: 1,
    count: 3,
  };
  return t.deepEqual(model.getState(), expected);
});

test('setLocations', t => {
  const model = GlissandoModel();
  model.setLocations(['a', 'b', 'c']);
  const expected = {
    ...defaultState,
    locations: ['a', 'b', 'c'],
    count: 3,
  };
  return t.deepEqual(model.getState(), expected);
});

test('setLocations when location is set before', t => {
  const model = GlissandoModel({
    location: 'b',
  });
  model.setLocations(['a', 'b', 'c']);
  const expected = {
    ...defaultState,
    locations: ['a', 'b', 'c'],
    location: 'b',
    count: 3,
  };
  return t.deepEqual(model.getState(), expected);
});

test('setCount', t => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
  });
  model.setCount(2);
  const expected = {
    ...defaultState,
    locations: ['a', 'b', 'c'],
    location: 'a',
    count: 2,
  };
  return t.deepEqual(model.getState(), expected);
});

test('setDirection', t => {
  const model = GlissandoModel();
  model.setDirection('rtl');
  const expected = {
    ...defaultState,
    direction: 'rtl',
  };
  return t.deepEqual(model.getState(), expected);
});

test('goTo index with animate', t => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
  });
  model.goTo({ index: 1, animate: true });
  const expected = {
    ...defaultState,
    locations: ['a', 'b', 'c'],
    location: 'a',
    count: 3,
    targetIndex: 1, // <= set to the desired index
    index: 0, // <= still current index
    isAnimating: true,
  };
  return t.deepEqual(model.getState(), expected);
});

test('goTo index without animate (default)', t => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
  });
  model.goTo({ index: 1 });
  const expected = {
    ...defaultState,
    locations: ['a', 'b', 'c'],
    location: 'a',
    count: 3,
    index: 1,
    targetIndex: 1,
  };
  return t.deepEqual(model.getState(), expected);
});

test('goTo location with animate', t => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
  });
  model.goTo({ location: 'b', animate: true });
  const expected = {
    ...defaultState,
    locations: ['a', 'b', 'c'],
    location: 'b',
    count: 3,
    targetIndex: 1, // <= set to the desired index
    index: 0, // <= still current index
    isAnimating: true,
  };
  return t.deepEqual(model.getState(), expected);
});

test('goTo location without animate', t => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
  });
  model.goTo({ location: 'b', animate: false });
  const expected = {
    ...defaultState,
    locations: ['a', 'b', 'c'],
    location: 'b',
    count: 3,
    index: 1,
    targetIndex: 1,
  };
  return t.deepEqual(model.getState(), expected);
});

test('next with animate (default)', t => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
  });
  model.next();
  const expected = {
    ...defaultState,
    locations: ['a', 'b', 'c'],
    location: 'a',
    count: 3,
    targetIndex: 1, // <= set to the desired index
    index: 0, // <= still current index
    isAnimating: true,
  };
  return t.deepEqual(model.getState(), expected);
});

test('next without animate', t => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
  });
  model.next({ animate: false });
  const expected = {
    ...defaultState,
    locations: ['a', 'b', 'c'],
    location: 'a',
    count: 3,
    index: 1,
    targetIndex: 1,
  };
  return t.deepEqual(model.getState(), expected);
});

test('previous with animate (default)', t => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
  });
  model.goTo({ index: 1 });
  model.previous();
  const expected = {
    ...defaultState,
    locations: ['a', 'b', 'c'],
    location: 'a',
    count: 3,
    targetIndex: 0, // <= set to the desired index
    index: 1, // <= still current index
    isAnimating: true,
  };
  return t.deepEqual(model.getState(), expected);
});

test('previous without animate', t => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
  });
  model.goTo({ index: 1 });
  model.previous({ animate: false });
  const expected = {
    ...defaultState,
    locations: ['a', 'b', 'c'],
    location: 'a',
    count: 3,
    index: 0,
    targetIndex: 0,
  };
  return t.deepEqual(model.getState(), expected);
});

test('hasPrevious (defaults, no count or locations)', t => {
  const model = GlissandoModel();
  return t.deepEqual(model.hasPrevious(), false);
});

test('hasPrevious (locations, first location)', t => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
  });
  return t.deepEqual(model.hasPrevious(), false);
});

test('hasPrevious (locations, last location)', t => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
    location: 'c',
  });
  return t.deepEqual(model.hasPrevious(), true);
});

test('hasPrevious (count, first index)', t => {
  const model = GlissandoModel({
    count: 3,
  });
  return t.deepEqual(model.hasPrevious(), false);
});

test('hasPrevious (count, last index)', t => {
  const model = GlissandoModel({
    count: 3,
    index: 2,
  });
  return t.deepEqual(model.hasPrevious(), true);
});

test('hasNext (defaults, no count or locations)', t => {
  const model = GlissandoModel();
  return t.deepEqual(model.hasNext(), false);
});

test('hasNext (locations, first location)', t => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
  });
  return t.deepEqual(model.hasNext(), true);
});

test('hasNext (locations, last location)', t => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
    location: 'c',
  });
  return t.deepEqual(model.hasNext(), false);
});

test('hasNext (count, first index)', t => {
  const model = GlissandoModel({
    count: 3,
  });
  return t.deepEqual(model.hasNext(), true);
});

test('hasNext (count, last index)', t => {
  const model = GlissandoModel({
    count: 3,
    index: 2,
  });
  return t.deepEqual(model.hasNext(), false);
});

test('isAnimating (next - default animating)', t => {
  const model = GlissandoModel({
    count: 3,
  });
  model.next();
  return t.deepEqual(model.isAnimating(), true);
});

test('isAnimating (next - last index, default animating)', t => {
  const model = GlissandoModel({
    count: 3,
    index: 2,
  });
  model.next();
  return t.deepEqual(model.isAnimating(), false);
});

test('isAnimating (next - animate false)', t => {
  const model = GlissandoModel({
    count: 3,
  });
  model.next({ animate: false });
  return t.deepEqual(model.isAnimating(), false);
});

test('isAnimating (previous - default animating)', t => {
  const model = GlissandoModel({
    count: 3,
    index: 2,
  });
  model.previous();
  return t.deepEqual(model.isAnimating(), true);
});

test('isAnimating (previous - first index, default animating)', t => {
  const model = GlissandoModel({
    count: 3,
  });
  model.previous();
  return t.deepEqual(model.isAnimating(), false);
});

test('isAnimating (previous - animate false)', t => {
  const model = GlissandoModel({
    count: 3,
    index: 2,
  });
  model.previous({ animate: false });
  return t.deepEqual(model.isAnimating(), false);
});

test('isAnimating (finalize)', t => {
  const model = GlissandoModel({
    count: 3,
  });
  model.next();
  model.finalize(1);
  return t.deepEqual(model.isAnimating(), false);
});

test('getViewIndices', t => {
  const model = GlissandoModel({
    count: 3,
  });
  return t.deepEqual(model.getViewIndices(), [-1, 0, 1]);
});

test('getViewIndices (sideViews)', t => {
  const model = GlissandoModel({
    count: 3,
    sideViews: 3,
  });
  return t.deepEqual(model.getViewIndices(), [-3, -2, -1, 0, 1, 2, 3]);
});

test('getLocation', t => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
  });
  model.goTo({ location: 'b' });
  return t.deepEqual(model.getLocation(), 'b');
});

test('getLocation (animate)', t => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
  });
  model.goTo({ location: 'b', animate: true });
  return t.deepEqual(model.getLocation(), 'b');
});

test('getNextLocation', t => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
  });
  model.goTo({ location: 'b' });
  return t.deepEqual(model.getNextLocation(), 'c');
});

test('getNextLocation (last location)', t => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
    location: 'c',
  });
  return t.deepEqual(model.getNextLocation(), undefined);
});

test('getPreviousLocation', t => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
    location: 'c',
  });
  model.goTo({ location: 'b' });
  return t.deepEqual(model.getPreviousLocation(), 'a');
});

test('getPreviousLocation (first location)', t => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
  });
  return t.deepEqual(model.getPreviousLocation(), undefined);
});
