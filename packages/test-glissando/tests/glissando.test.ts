import { deepStrictEqual } from 'assert';
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

it('Model state of a new model without an initial state', () => {
  const model = GlissandoModel();
  const expected = defaultState;
  return deepStrictEqual(model.getState(), expected);
});

it('Model state of a new model with an initial state (index)', () => {
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
  return deepStrictEqual(model.getState(), expected);
});

it('Model state of a new model with an initial state (locations - location automatically set)', () => {
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
  return deepStrictEqual(model.getState(), expected);
});

it('Model state of a new model with an initial state (location)', () => {
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
  return deepStrictEqual(model.getState(), expected);
});

it('setLocations', () => {
  const model = GlissandoModel();
  model.setLocations(['a', 'b', 'c']);
  const expected = {
    ...defaultState,
    locations: ['a', 'b', 'c'],
    count: 3,
  };
  return deepStrictEqual(model.getState(), expected);
});

it('setLocations when location is set before', () => {
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
  return deepStrictEqual(model.getState(), expected);
});

it('setCount', () => {
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
  return deepStrictEqual(model.getState(), expected);
});

it('setDirection', () => {
  const model = GlissandoModel();
  model.setDirection('rtl');
  const expected = {
    ...defaultState,
    direction: 'rtl',
  };
  return deepStrictEqual(model.getState(), expected);
});

it('goTo index with animate', () => {
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
  return deepStrictEqual(model.getState(), expected);
});

it('goTo index without animate (default)', () => {
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
  return deepStrictEqual(model.getState(), expected);
});

it('goTo location with animate', () => {
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
  return deepStrictEqual(model.getState(), expected);
});

it('goTo location without animate', () => {
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
  return deepStrictEqual(model.getState(), expected);
});

it('next with animate (default)', () => {
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
  return deepStrictEqual(model.getState(), expected);
});

it('next without animate', () => {
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
  return deepStrictEqual(model.getState(), expected);
});

it('previous with animate (default)', () => {
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
  return deepStrictEqual(model.getState(), expected);
});

it('previous without animate', () => {
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
  return deepStrictEqual(model.getState(), expected);
});

it('hasPrevious (defaults, no count or locations)', () => {
  const model = GlissandoModel();
  return deepStrictEqual(model.hasPrevious(), false);
});

it('hasPrevious (locations, first location)', () => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
  });
  return deepStrictEqual(model.hasPrevious(), false);
});

it('hasPrevious (locations, last location)', () => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
    location: 'c',
  });
  return deepStrictEqual(model.hasPrevious(), true);
});

it('hasPrevious (count, first index)', () => {
  const model = GlissandoModel({
    count: 3,
  });
  return deepStrictEqual(model.hasPrevious(), false);
});

it('hasPrevious (count, last index)', () => {
  const model = GlissandoModel({
    count: 3,
    index: 2,
  });
  return deepStrictEqual(model.hasPrevious(), true);
});

it('hasNext (defaults, no count or locations)', () => {
  const model = GlissandoModel();
  return deepStrictEqual(model.hasNext(), false);
});

it('hasNext (locations, first location)', () => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
  });
  return deepStrictEqual(model.hasNext(), true);
});

it('hasNext (locations, last location)', () => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
    location: 'c',
  });
  return deepStrictEqual(model.hasNext(), false);
});

it('hasNext (count, first index)', () => {
  const model = GlissandoModel({
    count: 3,
  });
  return deepStrictEqual(model.hasNext(), true);
});

it('hasNext (count, last index)', () => {
  const model = GlissandoModel({
    count: 3,
    index: 2,
  });
  return deepStrictEqual(model.hasNext(), false);
});

it('isAnimating (next - default animating)', () => {
  const model = GlissandoModel({
    count: 3,
  });
  model.next();
  return deepStrictEqual(model.isAnimating(), true);
});

it('isAnimating (next - last index, default animating)', () => {
  const model = GlissandoModel({
    count: 3,
    index: 2,
  });
  model.next();
  return deepStrictEqual(model.isAnimating(), false);
});

it('isAnimating (next - animate false)', () => {
  const model = GlissandoModel({
    count: 3,
  });
  model.next({ animate: false });
  return deepStrictEqual(model.isAnimating(), false);
});

it('isAnimating (previous - default animating)', () => {
  const model = GlissandoModel({
    count: 3,
    index: 2,
  });
  model.previous();
  return deepStrictEqual(model.isAnimating(), true);
});

it('isAnimating (previous - first index, default animating)', () => {
  const model = GlissandoModel({
    count: 3,
  });
  model.previous();
  return deepStrictEqual(model.isAnimating(), false);
});

it('isAnimating (previous - animate false)', () => {
  const model = GlissandoModel({
    count: 3,
    index: 2,
  });
  model.previous({ animate: false });
  return deepStrictEqual(model.isAnimating(), false);
});

it('isAnimating (finalize)', () => {
  const model = GlissandoModel({
    count: 3,
  });
  model.next();
  model.finalize(1);
  return deepStrictEqual(model.isAnimating(), false);
});

it('getViewIndices', () => {
  const model = GlissandoModel({
    count: 3,
  });
  return deepStrictEqual(model.getViewIndices(), [-1, 0, 1]);
});

it('getViewIndices (sideViews)', () => {
  const model = GlissandoModel({
    count: 3,
    sideViews: 3,
  });
  return deepStrictEqual(model.getViewIndices(), [-3, -2, -1, 0, 1, 2, 3]);
});

it('getLocation', () => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
  });
  model.goTo({ location: 'b' });
  return deepStrictEqual(model.getLocation(), 'b');
});

it('getLocation (animate)', () => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
  });
  model.goTo({ location: 'b', animate: true });
  return deepStrictEqual(model.getLocation(), 'b');
});

it('getNextLocation', () => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
  });
  model.goTo({ location: 'b' });
  return deepStrictEqual(model.getNextLocation(), 'c');
});

it('getNextLocation (last location)', () => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
    location: 'c',
  });
  return deepStrictEqual(model.getNextLocation(), undefined);
});

it('getPreviousLocation', () => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
    location: 'c',
  });
  model.goTo({ location: 'b' });
  return deepStrictEqual(model.getPreviousLocation(), 'a');
});

it('getPreviousLocation (first location)', () => {
  const model = GlissandoModel({
    locations: ['a', 'b', 'c'],
  });
  return deepStrictEqual(model.getPreviousLocation(), undefined);
});
