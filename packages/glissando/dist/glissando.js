!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("mithril/stream")):"function"==typeof define&&define.amd?define(["exports","mithril/stream"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).glissando={},e.Stream)}(this,function(e,t){"use strict";function n(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var a=n(t);const o=i=>e=>{var{newIndex:t,shouldUpdate:n}=((e,t)=>{if(void 0===t||Number.isNaN(t))return{newIndex:e.index,shouldUpdate:!1};t=Math.min(t,e.count-1);return{newIndex:t,shouldUpdate:0<=t&&t<e.count&&t!==e.index}})(i,e.index);return n?Object.assign(Object.assign(Object.assign({},i),e.animate?void 0:{index:t}),{targetIndex:t,isAnimating:!!e.animate}):i},s=n=>e=>{if(n.locations&&n.location){var t=n.locations.indexOf(n.location);if(-1!==t)return n.locations[e(t)]}};e.GlissandoModel=(e={})=>{var t={initialState:(({index:e=0,count:t=0,sideViews:n=1,location:i,locations:a}={})=>{var s=[...Array(1+2*n)].map((e,t)=>t-n);const o=Object.assign(Object.assign(Object.assign({targetIndex:e,index:e,count:t},Array.isArray(a)?{locations:a,count:a?a.length:0,location:a[0]}:void 0),i?{location:i,index:Array.isArray(a)&&a.indexOf(i)||e}:void 0),{isAnimating:!1,direction:"ltr",slots:s,sideViews:n});return o.targetIndex=o.index,o})(e),actions:e=>({previous:({animate:t}={animate:!0})=>{e(e=>o(e)({index:e.index-1,animate:!1!==t}))},next:({animate:t}={animate:!0})=>{e(e=>o(e)({index:e.index+1,animate:!1!==t}))},goTo:({index:n,location:i,animate:s})=>{e(e=>{if(i){const t={location:i,animate:s};return a=e,(e=>{if(!a.locations||0===a.locations.length)return a;let t=e.location.toString(),n=a.locations.indexOf(t);-1===n&&(n=0,t=a.locations[n]);var i=void 0!==a.location&&!1!==e.animate,e=Object.assign(Object.assign({},a),{location:t}),i={index:n,animate:i};return o(e)(i)})(t)}var a;if(void 0===n)return e;const t={index:n,animate:s};return o(e)(t)})},finalize:t=>{e(e=>o(e)({index:t,animate:!1}))},setCount:t=>{e(e=>o(Object.assign(Object.assign({},e),{count:t}))({index:e.index}))},setDirection:t=>{e(e=>Object.assign(Object.assign({},e),{direction:t}))},setLocations:t=>{e(e=>Object.assign(Object.assign({},e),{locations:t,count:t.length}))}}),selectors:t=>({hasNext:()=>{var e=t();return e.index<e.count-1},hasPrevious:()=>{return 0<t().index},isAnimating:()=>{return t().isAnimating},getViewIndices:()=>{const n=t();return n.slots.map(e=>{let t=e+n.index+0;return e<0&&n.targetIndex<n.index?t=e+n.targetIndex+1:0<e&&n.targetIndex>n.index&&(t=e+n.targetIndex-1),t})},getLocation:()=>{var e=t();return s(e)(e=>e)},getNextLocation:()=>{var e=t();return s(e)(e=>e+1)},getPreviousLocation:()=>{var e=t();return s(e)(e=>e-1)}})},n=a.default(),i=a.default.scan((e,t)=>t(e),Object.assign({},t.initialState),n),e=Object.assign({},t.actions(n)),n=Object.assign({},t.selectors(i)),t=a.default.scan((e,t)=>JSON.stringify(e,null,2)===JSON.stringify(t,null,2)?a.default.SKIP:t,a.default.SKIP,i),t=a.default.lift(e=>e,t);return Object.assign(Object.assign({getState:i,getChanges:t},e),n)},e.getSliderStyle=e=>{var t=2*e.sideViews+1,n=100/t,i="rtl"===e.direction?1:-1;let a=i*n*(e.sideViews+0);return e.targetIndex>e.index?a=i*n*(e.sideViews+1):e.targetIndex<e.index&&(a=i*n*(e.sideViews-1)),{style:Object.assign({width:`calc(${t} * calc(100%))`,transform:`translateX(${a}%)`},e.isAnimating?void 0:{transitionDuration:"0ms"}),className:e.isAnimating?"glissando-animating":""}},Object.defineProperty(e,"__esModule",{value:!0})});
