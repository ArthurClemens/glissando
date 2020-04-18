# glissando

A simple content slider for anything that needs to move.

Currently for Mithril. React: in progress.

## Features

- Efficient rendering: only 3 elements are rendered at a single time (previous, current and next page).
- This results in a minimal memory footprint, so safe for mobile.
- Can be controlled with next/previous actions, jump to page action, with or without animation.
- Can be queried for state, and subscribed to changes.
- The list of elements can be changed on the fly.
- Right-to-left language support, using mirrored transitions.
- Written in TypeScript.

## Demo

* [CodeSandbox example for Mithril](https://codesandbox.io/s/glissando-for-mithril-mbhli)

## Example

```js
import { GlissandoSlider, GlissandoModel } from 'glissando-mithril'
import 'glissando-mithril/dist/glissando.min.css'
import { Page1, Page2, Page3 } from './pages'

const Slider = () => {
  const model = GlissandoModel();
  const { getState, previous, next, hasPrevious, hasNext, isAnimating } = model;

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

## Usage

A glissando slider is created with 2 parts:

1. A model to control the slider
2. A slider component


Import the component and model factory and slider CSS:

```js
import { GlissandoSlider, GlissandoModel } from 'glissando-mithril'
import 'glissando-mithril/dist/glissando.min.css'
```

Create a new model instance:

```js
const model = GlissandoModel()
```

Use the rendering component. Pass the model as a prop and the pages as children:

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
    const { getState, previous, next, hasPrevious, hasNext, isAnimating, onChange } = model

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

## RTL support

Glissando automatically detects the reading direction. Set one of the parent's HTML attribute `direction` to `"rtl"`.


## Supported browsers

Glissando is tested on major browsers, Edge and Internet Explorer 11. 


## Shout out

Glissando uses the [Meiosis state pattern](http://meiosis.js.org/) for state management.


## License

MIT
