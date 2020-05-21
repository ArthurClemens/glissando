!(function (e, t) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? t(
        exports,
        require('glissando'),
        require('react'),
        require('use-stream'),
        require('@huse/effect-ref'),
      )
    : typeof define === 'function' && define.amd
    ? define([
        'exports',
        'glissando',
        'react',
        'use-stream',
        '@huse/effect-ref',
      ], t)
    : t(
        ((e = e || self).glissandoReact = {}),
        e.glissando,
        e.React,
        e.useStream,
        e.effectRef,
      );
})(this, function (e, N, h, n, q) {
  const x = 'default' in h ? h.default : h;
  (e.GlissandoSlider = function (e) {
    const t = e.model;
    const n = e.children;
    const i = e.locations;
    const s = e.location;
    const r = h.useState();
    const o = r[0];
    const a = r[1];
    const u = t.getState;
    const f = t.finalize;
    const c = t.setCount;
    const l = t.setDirection;
    const d = t.getViewIndices;
    const g = t.setLocations;
    const m = t.goTo;
    h.useEffect(
      function () {
        const e = (n || []).length;
        e !== u().count && c(e);
      },
      [n, u, c],
    ),
      h.useEffect(
        function () {
          i && JSON.stringify(i) !== JSON.stringify(u().locations) && g(i);
        },
        [i],
      ),
      h.useEffect(
        function () {
          s && s !== u().location && m({ location: s });
        },
        [s],
      );
    const v = h.useCallback(function (e) {
      if (e === null) return null;
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
    h.useEffect(
      function () {
        let e;
        !o || ((e = getComputedStyle(o).direction) !== u().direction && l(e));
      },
      [e],
    );
    const S = q.useEffectRef(function (e) {
      return v(e);
    });
    if (!n) return null;
    const y = N.getSliderStyle(u());
    const p = y.className;
    const E = y.style;
    return x.createElement(
      'div',
      { className: 'glissando' },
      x.createElement(
        'div',
        { className: `glissando-slider ${p}`, style: E, ref: S },
        d().map(function (e) {
          return x.createElement(
            'div',
            { key: e, className: 'glissando-page' },
            n[e],
          );
        }),
      ),
    );
  }),
    (e.useGlissandoModel = function (e) {
      const t = h.useState(N.GlissandoModel(e))[0];
      return (
        n.useStream({
          model() {
            return { _: t.getState };
          },
          defer: !0,
        }),
        t
      );
    }),
    Object.defineProperty(e, '__esModule', { value: !0 });
});
