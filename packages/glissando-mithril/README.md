# Glissando for Mithril

A simple content slider for anything that needs to move.

[Main documentation](https://github.com/ArthurClemens/glissando)


## Demo

* [CodeSandbox example](https://codesandbox.io/s/glissando-for-mithril-mbhli)


## Usage

A glissando slider is created with 2 parts:

1. A model to control the slider
2. A slider component


Import the component and model factory and slider CSS:

```js
import { GlissandoSlider, useGlissandoModel } from 'glissando-mithril'
import 'glissando-mithril/dist/glissando.min.css'
```

Create a new model instance:

```js
const model = useGlissandoModel();
```

Use the rendering component. Pass the model as a prop and the pages as children.

```js
m(GlissandoSlider, { model }, [
  m(Page1),
  m(Page2),
  m(Page3),
  // ... add as many as needed
])
```

The pages can be added and removed dynamically. Each time the GlissandoSlider's children change, the model is updated automatically.

Control the slider with methods and query its state using selectors:

```js
{
  view: () => {
    const { previous, next, hasPrevious, hasNext, isAnimating } = model

    return [
      m('button', {
        onclick: () => previous(),
        disabled: !hasPrevious() || isAnimating(),
      }, 'Previous'),
      m('button', {
        onclick: () => next(),
        disabled: !hasNext() || isAnimating(),
      }, 'Next'),
      m(GlissandoSlider, { model }, [
        m(Page1),
        m(Page2),
        m(Page3),
      ])
    ]
  }
}
```


## Example

```js
import { GlissandoSlider, useGlissandoModel } from 'glissando-mithril'
import 'glissando-mithril/dist/glissando.min.css'
import { Page1, Page2, Page3 } from './pages'

const Slider = () => {
  const model = useGlissandoModel();
  const { previous, next, hasPrevious, hasNext, isAnimating } = model;

  return {
    view: () => {
      return [
          m(
            'button',
            {
              onclick: () => previous(),
              disabled: !hasPrevious() || isAnimating(),
            },
            'Previous',
          ),
          m(
            'button',
            {
              onclick: () => next(),
              disabled: !hasNext() || isAnimating(),
            },
            'Next',
          ),
        ]),
        m(
          GlissandoSlider,                  
            { model },                     // pass the model as prop
            [
              m(Page1), m(Page2), m(Page3) // may contain as many pages as needed
            ],
        ),
      ]
    }
  }
}
```


## RTL support

Glissando automatically detects the reading direction. Set one of the parent's HTML attribute `direction` to `"rtl"`.


## Size

877 B with all dependencies, minified and gzipped
