# Glissando

A simple content slider for anything that needs to slide.

For React and Mithril.

- [Features](#features)
- [Usage, demos and examples](#usage-demos-and-examples)
- [API](#api)
  - [Introduction](#introduction)
    - [Standalone use](#standalone-use)
    - [Directed use](#directed-use)
  - [Slider model](#slider-model)
    - [Initial state](#initial-state)
      - [Standalone use](#standalone-use-1)
      - [Directed use](#directed-use-1)
  - [Slider component](#slider-component)
    - [Options](#options)
    - [With React](#with-react)
      - [Standalone use](#standalone-use-2)
      - [Directed use](#directed-use-2)
      - [CSS](#css)
    - [With Mithril](#with-mithril)
      - [Standalone use](#standalone-use-3)
      - [Directed use](#directed-use-3)
      - [CSS](#css-1)
  - [Model methods](#model-methods)
    - [next](#next)
    - [previous](#previous)
    - [goTo](#goto)
    - [hasNext](#hasnext)
    - [hasPrevious](#hasprevious)
    - [isAnimating](#isanimating)
    - [getState](#getstate)
    - [getLocation](#getlocation)
    - [getPreviousLocation](#getpreviouslocation)
    - [getNextLocation](#getnextlocation)
    - [getChanges](#getchanges)
- [Helper functions](#helper-functions)
  - [createLocationsFromPath](#createlocationsfrompath)
    - [With React](#with-react-1)
    - [With Mithril](#with-mithril-1)
- [RTL support](#rtl-support)
- [Supported browsers](#supported-browsers)
- [License](#license)
- [Shout out](#shout-out)



## Features

- Efficient rendering: by default only 3 elements are rendered at a single time (the previous, current and next element) (this can be changed).
- This results in a minimal memory footprint, so safe for mobile.
- Can be controlled with next/previous actions, jump to page action, with or without animation.
- Use with a router: use the router location to control the slider. Or use other app state.
- Query for state, subscribe to changes.
- The list of elements can be changed on the fly.
- Right-to-left language support, using mirrored transitions.
- Written in TypeScript.



## Usage, demos and examples

* [Glissando for React](https://github.com/ArthurClemens/glissando/blob/master/packages/glissando-react/README.md)
* [Glissando for Mithril](https://github.com/ArthurClemens/glissando/blob/master/packages/glissando-mithril/README.md)



## API

### Introduction

A glissando slider is created with 2 parts:

1. A **model** that maintains internal state and provides methods to control the slider.
2. A **slider component** that takes child elements as views. The component informs the model to update, for instance when the children have been changed.

The slider component can be used standalone or directed.

#### Standalone use

This is the simplest setup. Use control methods: `next()`, `goTo({ index: 1 })`, etcetera to update the model state.
 

#### Directed use

Application state is used to control the slider. An example of application state is a router with a unique page URL for each slide.

Pass:
* A list of location ids (for example: possible route paths)
* The current location id (for example: the current route path)

When application state changes the current location id, the slider model will subsequently be updated.

For example:
1. The Next button invokes a new URL
2. The new router path is used to set the location id
3. With the updated slider state, the slider component will slide to the corresponding element


Examples for both uses are shown in the [React](https://github.com/ArthurClemens/glissando/blob/master/packages/glissando-react/README.md) and [Mithril](https://github.com/ArthurClemens/glissando/blob/master/packages/glissando-mithril/README.md) documentation sections.


### Slider model


```typescript
const model: Glissando.Model = useGlissandoModel();
```

#### Initial state

##### Standalone use

```typescript
const initalState: Glissando.InitialState = {
  // default values:
  index: 0,
  sideViews: 1,
};
const model: Glissando.Model = useGlissandoModel(initalState);
```

| **Parameter** | **Required** | **Type** | **Description**                                                                                                                 |
| ------------- | ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **sideViews** | optional     | `number` | Defines how many items are rendered. For value 1: the current, previous and next item. For value 2: one more item at each side. |
| **index**     | optional     | `number` | The initial location index.                                                                                                     |


##### Directed use

```typescript
const initalState: Glissando.InitialState = {
  locations: ['a', 'b', 'c'],
  location: 'a',
};
const model: Glissando.Model = useGlissandoModel(initalState);
```

| **Parameter** | **Required** | **Type**   | **Description**                                                                                                                 |
| ------------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **sideViews** | optional     | `number`   | Defines how many items are rendered. For value 1: the current, previous and next item. For value 2: one more item at each side. |
| **locations** | optional     | `string[]` | A list of location ids, for example: possible route paths.                                                                      |
| **location**  | optional     | `string`   | The current location id, for example: the current route path.                                                                   |





### Slider component

The GlissandoSlider component receives the model and child elements: the items to slide.

There is no limit to the number of children. By default only the current, previous and next items are rendered. This can be expanded with initial state attribute `sideViews`.

Children can be changed dynamically.

#### Options

| **Parameter** | **Required** | **Type**           | **Description**                                                             |
| ------------- | ------------ | ------------------ | --------------------------------------------------------------------------- |
| **model**     | required     | `GlissandoModel`   | The slider model                                                            |
| **children**  | required     | Component children | The elements to slide                                                       |
| **locations** | optional     | `string[]`         | (directed use) List of location ids, for example: possible route paths      |
| **location**  | optional     | `string`           | (directed use) The current location id, for example: the current route path |
| **className** | optional     | `string`           | Extra class name                                                            |


#### With React

##### Standalone use

```jsx
import { GlissandoSlider, useGlissandoModel } from 'glissando-react';

const model = useGlissandoModel();

<GlissandoSlider model={model}>
  <Page1 />
  <Page2 />
  <Page3 />
</GlissandoSlider>
```

##### Directed use

```tsx
const pages = ["page-1", "page-2", "page-3"];

const Slider = () => {
  const match = useRouteMatch();
  const currentPage = match.params.page;

  return (
    <GlissandoSlider model={model} locations={pages} location={currentPage}>
      {pages.map(id => {
        return <Page key={id} location={id} />;
      })}
    </GlissandoSlider>
  );
};
```

See also: [Glissando usage with React](https://github.com/ArthurClemens/glissando/blob/master/packages/glissando-react/README.md)

##### CSS

Import GlissandoSlider CSS in your project: 

```jsx
import 'glissando-react/dist/glissando.min.css'
```

Or when using PostCSS:

```jsx
import 'glissando-react/dist/glissando.global.min.css'
```


#### With Mithril

##### Standalone use

```javascript
import { GlissandoSlider, useGlissandoModel } from 'glissando-mithril';

const model = useGlissandoModel();

m(GlissandoSlider, { model }, [
  m(Page1),
  m(Page2),
  m(Page3),
]);
```

##### Directed use

```ts
const pages = ["page-1", "page-2", "page-3"];

const Slider = {
  view: ({ attrs }) => {
    const { model } = attrs;
    const currentPage = m.route.param('page');

    return m(
      GlissandoSlider,
      {
        model,
        locations: pages,
        location: currentPage,
      },
      pages.map(id =>
        m(Page, {
          key: id,
          location: id,
        }),
      ),
    );
  },
};
```

See also: [Glissando usage with Mithril](https://github.com/ArthurClemens/glissando/blob/master/packages/glissando-mithril/README.md)

##### CSS

Import GlissandoSlider CSS in your project: 

```js
import 'glissando-mithril/dist/glissando.min.css'
```

Or when using PostCSS:

```js
import 'glissando-mithril/dist/glissando.global.min.css'
```




### Model methods

```typescript
const model = useGlissandoModel();

const {
  // Control:
  next,
  previous,
  goTo,

  // State:
  hasNext,
  hasPrevious,
  isAnimating,
  getState,
  
  // State (directed use):
  getLocation,
  getPreviousLocation,
  getNextLocation,
  
  // Subscribe to changes:
  getChanges,
} = model;
```


#### next

_Control_

Moves the slider to the next item. It is not possible to go beyond the last item.

Regular use:

```typescript
model.next();
```

Disable animation:

```typescript
model.next({ animate: false });
```


#### previous

_Control_

Moves the slider to the previous item. It is not possible to go further back than the first item.

Regular use:

```typescript
model.previous();
```

Disable animation:

```typescript
model.previous({ animate: false });
```


#### goTo

_Control_

Moves the slider to the indicated index. It is not possible to go further back than the first item, or beyond the last item.

Regular use:

```typescript
model.goTo({
  index: 1
});
```

Disable animation:

```typescript
model.goTo({
  index: 1,
  animate: false
});
```


#### hasNext

_State_

Returns whether it is possible to move the slider to a next position.

```typescript
const hasNext: boolean = model.hasNext();
```


#### hasPrevious

_State_

Returns whether it is possible to move the slider to a previous position.

```typescript
const hasPrevious: boolean = model.hasPrevious();
```


#### isAnimating

_State_

Returns whether it the slider is currently animating.

```typescript
const isAnimating: boolean = model.isAnimating();
```


#### getState

_State_

**As selector**

Returns the state object.

```typescript
const state: Glissando.State = model.getState();
const index: number = model.getState().index;
```

**As stream**

Subscribe to the state stream. The map function is called when the model is updated. Note that this includes updates even when the state has not changed. To get notified on changes only, use `getChanges`.


```typescript
model.getState.map((s: Glissando.State) => {
  // ...
});
```


#### getLocation

_State (directed use)_

Returns the current location id. If no next location exist returns undefined.

```typescript
const location: string = getLocation();
```


#### getPreviousLocation

_State (directed use)_

Returns the previous location id. If no previous location exist returns undefined.

```typescript
const previousLocation: string = getPreviousLocation();
```


#### getNextLocation

_State (directed use)_

Returns the next location id. If no next location exist returns undefined.

```typescript
const nextLocation: string = getNextLocation();
```


#### getChanges

_Subscribe to changes_

Subscribe to the changed state stream. The map function is called when the model is updated and the new state differs from the previous state.

```typescript
model.getChanges
  .map((state: Glissando.State) => {
    // ...
  })
```

When calling `getChanges` in the component's render loop (in React's function component and in Mithril's view function, add `end(true)` to stop listening to the stream:

```typescript
model.getChanges
  .map((state: Glissando.State) => {
    // ...
  })
  .end(true); // prevent accumulation of stream subscriptions
```

When calling `getChanges` in Mithril's closure component (outside of `view`), do not end the stream.


## Helper functions

Helper functions are provided in separate package `glissando-helpers`.


### createLocationsFromPath

Helper function to create the list of locations (and the current location) from a path.
This is useful when traversing a hierarchical path, such as a master detail pattern (for example a list of posts each linked to a post page, and possibly deeper levels).

`createLocationsFromPath` creates a breadcrumb trail from a given path and returns a new list of locations based on the merge of the breadcrumb trail and the current model locations.

From path: `"/users/Ferdinand/details"`, the generated locations will be: `["/users", "/users/Ferdinand", "/users/Ferdinand/details"]`. When this list of locations is fed to the Glissando component, back and forward links will be set automatically. 
  
#### With React

```typescript
import {
  Glissando,
  GlissandoSlider,
  useGlissandoModel,
} from 'glissando-react';
import {
  createLocationsFromPath
} from 'glissando-helpers';
import { useRouteMatch } from 'react-router-dom';

// in component:
const model = useGlissandoModel();

const match = useRouteMatch();

const location = match.url;
const locations = createLocationsFromPath(
  location,
  model.getState().locations,
);

// Call GlissandoSlider component with locations and location
```
#### With Mithril

```typescript
import {
  Glissando,
  GlissandoSlider,
  useGlissandoModel,
} from 'glissando-mithril';
import {
  createLocationsFromPath
} from 'glissando-helpers';

// in component:
const model = useGlissandoModel();

const location = m.route.get();

const locations = createLocationsFromPath(
  location,
  model.getState().locations,
);

// Call GlissandoSlider component with locations and location
```

## RTL support

Glissando automatically detects the reading direction. Set one of the parent's HTML attribute `direction` to `"rtl"`.


## Supported browsers

Glissando is tested on major browsers, Edge and Internet Explorer 11. 



## License

MIT



## Shout out

Glissando uses the [Meiosis state pattern](http://meiosis.js.org/) for state management.

