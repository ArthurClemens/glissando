!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("glissando"),require("mithril")):"function"==typeof define&&define.amd?define(["exports","glissando","mithril"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).glissandoMithril={},e.glissando,e.m)}(this,(function(e,t,n){"use strict";function i(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var o=i(n);Object.defineProperty(e,"GlissandoModel",{enumerable:!0,get:function(){return t.GlissandoModel}}),Object.defineProperty(e,"getSliderStyle",{enumerable:!0,get:function(){return t.getSliderStyle}}),e.GlissandoSlider=function(e){var n=e.attrs.model,i=n.getState,r=n.finalize,l=n.setCount,s=n.setDirection,a=n.getViewIndices,d=n.goTo,u=n.setLocations,c=function(e){r(i().targetIndex)};return{onupdate:function(e){var t=e.dom,n=e.children,o=e.attrs,r=o.locations,a=o.location,c=n.length;c!==i().count&&l(c),r&&JSON.stringify(r)!==JSON.stringify(i().locations)&&u(r),a&&a!==i().location&&d({location:a});var f=getComputedStyle(t).direction;f!==i().direction&&s(f)},view:function(e){var n=e.children,r=e.attrs;if(!n)return null;var l=r.className,s=t.getSliderStyle(i()),d=s.className,u=s.style;return o.default("div",{className:["glissando",l].join(" ")},o.default(".glissando-slider",{oncreate:function(e){e.dom.addEventListener("transitionend",c)},onremove:function(e){e.dom.removeEventListener("transitionend",c)},className:d,style:u},a().map((function(e){return o.default(".glissando-page",n[e])}))))}}},e.useGlissandoModel=function(e){var n=t.GlissandoModel(e);return n.getState.map(o.default.redraw),n},Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=glissando-mithril.js.map
