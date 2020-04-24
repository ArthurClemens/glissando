# Glissando

A simple content slider for anything that needs to move.

For React and Mithril.

- [Features](#features)
- [Usage, demos and examples](#usage-demos-and-examples)
- [API](#api)
  - [Slider model](#slider-model)
    - [Initial state](#initial-state)
  - [Model methods](#model-methods)
    - [next](#next)
    - [previous](#previous)
    - [goTo](#goto)
    - [hasPrevious](#hasprevious)
    - [hasNext](#hasnext)
    - [isAnimating](#isanimating)
    - [getState](#getstate)
    - [getChanges](#getchanges)
  - [Slider component](#slider-component)
    - [Options](#options)
    - [With React](#with-react)
    - [With Mithril](#with-mithril)
- [RTL support](#rtl-support)
- [Supported browsers](#supported-browsers)
- [License](#license)
- [Shout out](#shout-out)



## Features

- Efficient rendering: only 3 elements are rendered at a single time (the previous, current and next element).
- This results in a minimal memory footprint, so safe for mobile.
- Can be controlled with next/previous actions, jump to page action, with or without animation.
- Can be queried for state, and subscribed to changes.
- The list of elements can be changed on the fly.
- Right-to-left language support, using mirrored transitions.
- Written in TypeScript.



## Usage, demos and examples

* [Glissando for React](https://github.com/ArthurClemens/glissando/blob/master/packages/glissando-react/README.md)
* [Glissando for Mithril](https://github.com/ArthurClemens/glissando/blob/master/packages/glissando-mithril/README.md)



## API

### Slider model


```typescript
const model: Glissando.Model = useGlissandoModel();
```

#### Initial state

```typescript
const initalState: Glissando.InitialState = {
  index: 0,
  sideViews: 1,
};
const model: Glissando.Model = useGlissandoModel(initalState);
```


`index` can be set to another value than 0. Its value will be changed automatically when the number of children of the slider component does not match the index.

`sideViews` defines how many items are rendered. For value 1: the current, previous and next item. For value 2: one more item at each side.


### Model methods

```typescript
const model = useGlissandoModel();

const {
  next,
  previous,
  goTo,
  hasPrevious,
  hasNext,
  isAnimating,
  getState,
  getChanges,
} = model;
```

#### next

Regular use:

```typescript
model.next();
```

Disable animation:

```typescript
model.next({ animate: false });
```

Moves the slider to the next item. It is not possible to go beyond the last item.


#### previous

Regular use:

```typescript
model.previous();
```

Disable animation:

```typescript
model.previous({ animate: false });
```

Moves the slider to the previous item. It is not possible to go further back than the first item.


#### goTo

Regular use:

```typescript
model.goTo({
  index: 1
});
```

Disable animation:

```typescript
model.previous({
  index: 1,
  animate: false
});
```

Moves the slider to the indicated index. It is not possible to go further back than the first item, or beyond the last item.


#### hasPrevious

```typescript
const hasPrevious: boolean = model.hasPrevious();
```

Returns whether it is possible to move the slider to a previous position.


#### hasNext

```typescript
const hasNext: boolean = model.hasNext();
```

Returns whether it is possible to move the slider to a next position.


#### isAnimating

```typescript
const isAnimating: boolean = model.isAnimating();
```

Returns whether it the slider is currently animating.


#### getState

**As selector**

```typescript
const state: Glissando.States = model.getState();
```

Returns the state object. For example:

```typescript
const index: number = model.getState().index;
```

**As stream**

```typescript
model.getState.map((s: Glissando.State) => {
  // ...
});
```

Subscribe to the state stream. The map function is called when the model is updated. Note that this includes updates even when the state has not changed. To get notified on changes only, use `getChanges`.


#### getChanges

```typescript
model.getChanges.map((s: Glissando.ChangedState) => {
  // ...
});
```

Subscribe to the changed state stream. The map function is called when the model is updated and the new state differs from the previous state.


### Slider component

The GlissandoSlider receives the model and child elements: the items to slide.

There is no limit to the number of children. By default only the current, previous and next items are rendered. This can be expanded with initial state attribute `sideViews`.

Children can be changed dynamically.


#### Options

| **Parameter** | **Required** | **Type**           | **Description**                           |
| ------------- | ------------ | ------------------ | ----------------------------------------- |
| **model**     | required     | `GlissandoModel`   | The slider model                          |
| **children**  | required     | Component children | Pass the items/pages to slide as children |


#### With React

```jsx
import { GlissandoSlider, useGlissandoModel } from 'glissando-react';

const model = useGlissandoModel();

<GlissandoSlider model={model}>
  <Page1 />
  <Page2 />
  <Page3 />
</GlissandoSlider>
```


#### With Mithril

```javascript
import { GlissandoSlider, useGlissandoModel } from 'glissando-mithril';

const model = useGlissandoModel();

m(GlissandoSlider, { model }, [
  m(Page1),
  m(Page2),
  m(Page3),
]);
```



## RTL support

Glissando automatically detects the reading direction. Set one of the parent's HTML attribute `direction` to `"rtl"`.



## Supported browsers

Glissando is tested on major browsers, Edge and Internet Explorer 11. 



## License

MIT



## Shout out

Glissando uses the [Meiosis state pattern](http://meiosis.js.org/) for state management.

