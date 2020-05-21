# Glissando for Mithril

A simple content slider for anything that needs to move.

- [API](#api)
- [Demos](#demos)
  - [Standalone use](#standalone-use)
  - [Directed use](#directed-use)
- [Usage](#usage)
  - [Standalone use](#standalone-use-1)
    - [Example](#example)
  - [Directed use](#directed-use-1)
- [Size](#size)

## API

See: [Main documentation](https://github.com/ArthurClemens/glissando)


## Demos

### Standalone use

* [Simple example](https://codesandbox.io/s/glissando-for-mithril-mbhli)
* [Kitchen sink](https://codesandbox.io/s/glissando-for-mithril-kitchensink-z3ddm)

### Directed use 

* [With Mithril router and TypeScript](https://codesandbox.io/s/glissando-for-mithril-router-woujo)
* [Nested routes with Mithril router and TypeScript](https://codesandbox.io/s/glissando-for-mithril-router-list-and-details-o5679)


## Usage

### Standalone use

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

#### Example

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

### Directed use

Use application state to tell the slider what to show:

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

The counterparts of component props `locations` and `location` are model selectors `getLocation`, `getNextLocation` and `getPreviousLocation`:

```ts
const Header: m.Component<TProps> = {
  view: ({ attrs }) => {
    const { model } = attrs;
    const {
      isAnimating,
      getLocation,
      getNextLocation,
      getPreviousLocation,
    } = model;
    
    const location = getLocation();
    const previousLocation = getPreviousLocation();
    const nextLocation = getNextLocation();

    const goPrevious = () => {
      if (previousLocation) {
        m.route.set(previousLocation);
      }
    };
    const goNext = () => {
      if (nextLocation) {
        m.route.set(nextLocation);
      }
    };

    return m(
      'header', [
        m(
          'button',
          {
            type: 'button',
            disabled: !previousLocation || isAnimating(),
            onclick: goPrevious,
          },
          'Previous'
        ),
        m(
          'button',
          {
            type: 'button',
            disabled: !nextLocation || isAnimating(),
            onclick: goNext,
          },
          'Next'
        ),
      ],
    );
  },
};
```

## Size

1.24 KB with all dependencies, minified and gzipped
