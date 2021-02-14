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
})(this, function (e, p, v, n, E) {
  'use strict';
  function t(e) {
    return e && 'object' == typeof e && 'default' in e ? e : { default: e };
  }
  var b = t(v);
  Object.defineProperty(e, 'GlissandoModel', {
    enumerable: !0,
    get: function () {
      return p.GlissandoModel;
    },
  }),
    Object.defineProperty(e, 'getSliderStyle', {
      enumerable: !0,
      get: function () {
        return p.getSliderStyle;
      },
    }),
    (e.GlissandoSlider = function (e) {
      var t = e.model,
        n = e.children,
        i = e.locations,
        r = e.location,
        a = e.className,
        o = v.useState(),
        s = o[0],
        l = o[1],
        u = t.getState,
        f = t.finalize,
        c = t.setCount,
        d = t.setDirection,
        g = t.getViewIndices,
        m = t.setLocations,
        y = t.goTo;
      v.useEffect(
        function () {
          var e = (n || []).length;
          e !== u().count && c(e);
        },
        [n, u, c],
      ),
        v.useEffect(
          function () {
            i && JSON.stringify(i) !== JSON.stringify(u().locations) && m(i);
          },
          [i],
        ),
        v.useEffect(
          function () {
            r && r !== u().location && y({ location: r });
          },
          [r],
        );
      var S = v.useCallback(function (e) {
        if (null === e)
          return b.default.createElement(b.default.Fragment, null);
        l(e);
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
      v.useEffect(
        function () {
          var e;
          !s || ((e = getComputedStyle(s).direction) !== u().direction && d(e));
        },
        [e],
      );
      o = E.useEffectRef(function (e) {
        return S(e);
      });
      if (!n) return b.default.createElement(b.default.Fragment, null);
      (t = p.getSliderStyle(u())), (e = t.className), (t = t.style);
      return b.default.createElement(
        'div',
        { className: ['glissando', a].join(' ') },
        b.default.createElement(
          'div',
          { className: 'glissando-slider ' + e, style: t, ref: o },
          g().map(function (e) {
            return b.default.createElement(
              'div',
              { key: e, className: 'glissando-page' },
              n[e],
            );
          }),
        ),
      );
    }),
    (e.useGlissandoModel = function (e) {
      var t = v.useState(p.GlissandoModel(e))[0];
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
