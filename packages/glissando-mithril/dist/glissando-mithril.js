!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(exports, require('glissando'), require('mithril'))
    : 'function' == typeof define && define.amd
    ? define(['exports', 'glissando', 'mithril'], t)
    : t(
        ((e =
          'undefined' != typeof globalThis
            ? globalThis
            : e || self).glissandoMithril = {}),
        e.glissando,
        e.m,
      );
})(this, function (e, f, t) {
  'use strict';
  function n(e) {
    return e && 'object' == typeof e && 'default' in e ? e : { default: e };
  }
  var c = n(t);
  (e.GlissandoSlider = function (e) {
    function o(e) {
      t(s().targetIndex);
    }
    var e = e.attrs.model,
      s = e.getState,
      t = e.finalize,
      a = e.setCount,
      r = e.setDirection,
      l = e.getViewIndices,
      d = e.goTo,
      u = e.setLocations;
    return {
      onupdate: function (e) {
        var t = e.dom,
          n = e.children,
          i = e.attrs,
          e = i.locations,
          i = i.location,
          n = n.length;
        n !== s().count && a(n),
          e && JSON.stringify(e) !== JSON.stringify(s().locations) && u(e),
          i && i !== s().location && d({ location: i });
        t = getComputedStyle(t).direction;
        t !== s().direction && r(t);
      },
      view: function (e) {
        var t = e.children,
          n = e.attrs;
        if (!t) return null;
        var i = n.className,
          e = f.getSliderStyle(s()),
          n = e.className,
          e = e.style;
        return c.default(
          '.glissando ' + i,
          c.default(
            '.glissando-slider',
            {
              oncreate: function (e) {
                e.dom.addEventListener('transitionend', o);
              },
              onremove: function (e) {
                e.dom.removeEventListener('transitionend', o);
              },
              className: n,
              style: e,
            },
            l().map(function (e) {
              return c.default('.glissando-page', t[e]);
            }),
          ),
        );
      },
    };
  }),
    (e.useGlissandoModel = function () {
      var e = f.GlissandoModel();
      return e.getState.map(c.default.redraw), e;
    }),
    Object.defineProperty(e, '__esModule', { value: !0 });
});
