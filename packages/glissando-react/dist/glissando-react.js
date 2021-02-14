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
})(this, function (e, p, S, n, E) {
  'use strict';
  function t(e) {
    return e && 'object' == typeof e && 'default' in e ? e : { default: e };
  }
  var h = t(S);
  (e.GlissandoSlider = function (e) {
    var t = e.model,
      n = e.children,
      i = e.locations,
      s = e.location,
      o = e.className,
      r = S.useState(),
      a = r[0],
      u = r[1],
      f = t.getState,
      l = t.finalize,
      c = t.setCount,
      d = t.setDirection,
      g = t.getViewIndices,
      m = t.setLocations,
      v = t.goTo;
    S.useEffect(
      function () {
        var e = (n || []).length;
        e !== f().count && c(e);
      },
      [n, f, c],
    ),
      S.useEffect(
        function () {
          i && JSON.stringify(i) !== JSON.stringify(f().locations) && m(i);
        },
        [i],
      ),
      S.useEffect(
        function () {
          s && s !== f().location && v({ location: s });
        },
        [s],
      );
    var y = S.useCallback(function (e) {
      if (null === e) return null;
      u(e);
      function t(e) {
        l(f().targetIndex);
      }
      return (
        e.addEventListener('transitionend', t),
        function () {
          e.removeEventListener('transitionend', t);
        }
      );
    }, []);
    S.useEffect(
      function () {
        var e;
        !a || ((e = getComputedStyle(a).direction) !== f().direction && d(e));
      },
      [e],
    );
    r = E.useEffectRef(function (e) {
      return y(e);
    });
    if (!n) return null;
    (t = p.getSliderStyle(f())), (e = t.className), (t = t.style);
    return h.default.createElement(
      'div',
      { className: ['glissando', o].join(' ') },
      h.default.createElement(
        'div',
        { className: 'glissando-slider ' + e, style: t, ref: r },
        g().map(function (e) {
          return h.default.createElement(
            'div',
            { key: e, className: 'glissando-page' },
            n[e],
          );
        }),
      ),
    );
  }),
    (e.useGlissandoModel = function (e) {
      var t = S.useState(p.GlissandoModel(e))[0];
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
