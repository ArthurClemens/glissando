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
})(this, function (e, u, t) {
  'use strict';
  function n(e) {
    return e && 'object' == typeof e && 'default' in e ? e : { default: e };
  }
  var f = n(t);
  (e.GlissandoSlider = function (e) {
    function i(e) {
      t(o().targetIndex);
    }
    var e = e.attrs.model,
      o = e.getState,
      t = e.finalize,
      r = e.setCount,
      s = e.setDirection,
      a = e.getViewIndices,
      l = e.goTo,
      d = e.setLocations;
    return {
      onupdate: function (e) {
        var t = e.dom,
          n = e.children,
          i = e.attrs,
          e = i.locations,
          i = i.location,
          n = n.length;
        n !== o().count && r(n),
          e && JSON.stringify(e) !== JSON.stringify(o().locations) && d(e),
          i && i !== o().location && l({ location: i });
        t = getComputedStyle(t).direction;
        t !== o().direction && s(t);
      },
      view: function (e) {
        var t = e.children;
        if (!t) return null;
        var n = u.getSliderStyle(o()),
          e = n.className,
          n = n.style;
        return f.default(
          '.glissando',
          f.default(
            '.glissando-slider',
            {
              oncreate: function (e) {
                e.dom.addEventListener('transitionend', i);
              },
              onremove: function (e) {
                e.dom.removeEventListener('transitionend', i);
              },
              className: e,
              style: n,
            },
            a().map(function (e) {
              return f.default('.glissando-page', t[e]);
            }),
          ),
        );
      },
    };
  }),
    (e.useGlissandoModel = function () {
      var e = u.GlissandoModel();
      return e.getState.map(f.default.redraw), e;
    }),
    Object.defineProperty(e, '__esModule', { value: !0 });
});
