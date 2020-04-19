# Glissando

A simple content slider for anything that needs to move.

For React and Mithril.


## Features

- Efficient rendering: only 3 elements are rendered at a single time (previous, current and next page).
- This results in a minimal memory footprint, so safe for mobile.
- Can be controlled with next/previous actions, jump to page action, with or without animation.
- Can be queried for state, and subscribed to changes.
- The list of elements can be changed on the fly.
- Right-to-left language support, using mirrored transitions.
- Written in TypeScript.


## Usage, demos and examples

* [Glissando for React](https://github.com/ArthurClemens/glissando/blob/master/packages/glissando-react/README.md)
* [Glissando for Mithril](https://github.com/ArthurClemens/glissando/blob/master/packages/glissando-mithril/README.md)


## Supported browsers

Glissando is tested on major browsers, Edge and Internet Explorer 11. 


## Shout out

Glissando uses the [Meiosis state pattern](http://meiosis.js.org/) for state management.


## License

MIT
