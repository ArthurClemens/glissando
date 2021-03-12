# Glissando for React

A simple content slider for anything that needs to move.

- [API](#api)
- [Demos](#demos)
  - [Standalone use](#standalone-use)
  - [Directed use](#directed-use)
- [Usage](#usage)
  - [Standalone use](#standalone-use-1)
  - [Directed use](#directed-use-1)
- [Size](#size)


## API

See: [Main documentation](https://github.com/ArthurClemens/glissando)


## Demos

* [All examples](https://codesandbox.io/dashboard/all/Glissando/Glissando%20for%20React?workspace=214fe89f-3718-4af2-9611-3b2cb150dcc5)

### Standalone use

* [Simple example](https://codesandbox.io/s/glissando-for-react-2bgz4)
* [Kitchen sink](https://codesandbox.io/s/glissando-for-react-kitchensink-7hw9y)

### Directed use

* [With React Router and TypeScript](https://codesandbox.io/s/glissando-for-react-with-react-router-d0kno)
* [Nested routes with React Router and TypeScript](https://codesandbox.io/s/glissando-for-react-with-react-router-list-and-details-34552)


## Usage

### Standalone use

Import the component and model factory and slider CSS:

```js
import { GlissandoSlider, useGlissandoModel } from 'glissando-react'
import 'glissando-react/dist/glissando.global.min.css'
```

Create a new model instance:

```js
const model = useGlissandoModel();
```

Use the slider component. Pass the model as a prop and the pages as children.

```jsx
<GlissandoSlider model={model}>
  <Page1 />
  <Page2 />
  <Page3 />
  {/* ... add as many as needed - only 3 will be rendered */}
</GlissandoSlider>
```

The pages can be added and removed dynamically. Each time the GlissandoSlider's children change, the model is updated automatically.

Control the slider with methods and query its state using selectors:

```jsx
const Slider = () => {
  const { previous, next, hasPrevious, hasNext, isAnimating } = model

  return (
    <>
      <button
        type="button"
        onClick={() =>
          previous()
        }
        disabled={!hasPrevious() || isAnimating()}
      >
        Previous
      </button>
      <button
        type="button"
        onClick={() => next()}
        disabled={!hasNext() || isAnimating()}
      >
        Next
      </button>
      <GlissandoSlider model={model}>
        <Page1 />
        <Page2 />
        <Page2 />
      </GlissandoSlider>
   </>
  )
}
```

### Directed use

Use application state to tell the slider what to show:

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

The counterparts of component props `locations` and `location` are model selectors `getLocation`, `getNextLocation` and `getPreviousLocation`:

```jsx
const Header = ({ model }) => {
  const history = useHistory();

  const {
    isAnimating,
    getLocation,
    getNextLocation,
    getPreviousLocation,
  } = model;
  const location = getLocation();
  const previousLocation = getPreviousLocation();
  const nextLocation = getNextLocation();

  return (
    <>
      <button
        type="button"
        onClick={() => history.push(previousLocation)}
        disabled={!previousLocation || isAnimating()}
      >
        Previous
      </button>
      <button
        type="button"
        onClick={() => history.push(nextLocation)}
        disabled={!nextLocation || isAnimating()}
      >
        Next
      </button>
    </>
  );
};
```


## Size

2.93 KB with all dependencies, minified and gzipped
