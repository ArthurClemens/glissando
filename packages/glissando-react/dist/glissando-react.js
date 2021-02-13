!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(
        exports,
        require('glissando'),
        require('react'),
        require('use-stream'),
        require('@huse/effect-ref'),
      )
    : 'function' == typeof define && define.amd
    ? define([
        'exports',
        'glissando',
        'react',
        'use-stream',
        '@huse/effect-ref',
      ], t)
    : t(
        ((e =
          'undefined' != typeof globalThis
            ? globalThis
            : e || self).glissandoReact = {}),
        e.glissando,
        e.React,
        e.useStream,
        e.effectRef,
      );
})(this, function (e, y, p, n, S) {
  'use strict';
  function t(e) {
    return e && 'object' == typeof e && 'default' in e ? e : { default: e };
  }
  var E = t(p);
  (e.GlissandoSlider = function (e) {
    var t = e.model,
      n = e.children,
      i = e.locations,
      s = e.location,
      o = p.useState(),
      r = o[0],
      a = o[1],
      u = t.getState,
      f = t.finalize,
      l = t.setCount,
      c = t.setDirection,
      d = t.getViewIndices,
      g = t.setLocations,
      m = t.goTo;
    p.useEffect(
      function () {
        var e = (n || []).length;
        e !== u().count && l(e);
      },
      [n, u, l],
    ),
      p.useEffect(
        function () {
          i && JSON.stringify(i) !== JSON.stringify(u().locations) && g(i);
        },
        [i],
      ),
      p.useEffect(
        function () {
          s && s !== u().location && m({ location: s });
        },
        [s],
      );
    var v = p.useCallback(function (e) {
      if (null === e) return null;
      a(e);
      function t(e) {
        f(u().targetIndex);
      }
      return (
        e.addEventListener('transitionend', t),
        function () {
          e.removeEventListener('transitionend', t);
        }
      );
    }, []);
    p.useEffect(
      function () {
        var e;
        !r || ((e = getComputedStyle(r).direction) !== u().direction && c(e));
      },
      [e],
    );
    o = S.useEffectRef(function (e) {
      return v(e);
    });
    if (!n) return null;
    (t = y.getSliderStyle(u())), (e = t.className), (t = t.style);
    return E.default.createElement(
      'div',
      { className: 'glissando' },
      E.default.createElement(
        'div',
        { className: 'glissando-slider ' + e, style: t, ref: o },
        d().map(function (e) {
          return E.default.createElement(
            'div',
            { key: e, className: 'glissando-page' },
            n[e],
          );
        }),
      ),
    );
  }),
    (e.useGlissandoModel = function (e) {
      var t = p.useState(y.GlissandoModel(e))[0];
      return (
        n.useStream({
          model: function () {
            return { _: t.getState };
          },
          defer: !0,
        }),
        t
      );
    }),
    Object.defineProperty(e, '__esModule', { value: !0 });
});
