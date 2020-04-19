# Glissando for React

A simple content slider for anything that needs to move.

[Main documentation](https://github.com/ArthurClemens/glissando)


## Demo

* [CodeSandbox example](https://codesandbox.io/s/glissando-for-react-2bgz4)


## Usage

A glissando slider is created with 2 parts:

1. A model to control the slider
2. A slider component


Import the component and model factory and slider CSS:

```js
import { GlissandoSlider, useGlissandoModel } from 'glissando-react'
import 'glissando-react/dist/glissando.min.css'
```

Create a new model instance:

```js
const model = useGlissandoModel();
```

Use the rendering component. Pass the model as a prop and the pages as children.

```jsx
<GlissandoSlider model={model}>
  <Page1 />
  <Page2 />
  <Page3 />
  {/* ... add as many as needed */}
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


## RTL support

Glissando automatically detects the reading direction. Set one of the parent's HTML attribute `direction` to `"rtl"`.


## Size

2.2 KB with all dependencies, minified and gzipped
