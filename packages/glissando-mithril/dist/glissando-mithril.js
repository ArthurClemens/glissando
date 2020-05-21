!(function (e, t) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? t(exports, require('glissando'), require('mithril'))
    : typeof define === 'function' && define.amd
    ? define(['exports', 'glissando', 'mithril'], t)
    : t(((e = e || self).glissandoMithril = {}), e.glissando, e.m);
})(this, function (e, a, g) {
  g = g && Object.prototype.hasOwnProperty.call(g, 'default') ? g.default : g;
  (e.GlissandoSlider = function (e) {
    function r(e) {
      n(l().targetIndex);
    }
    const t = e.attrs.model;
    var l = t.getState;
    var n = t.finalize;
    const d = t.setCount;
    const c = t.setDirection;
    const s = t.getViewIndices;
    const u = t.goTo;
    const f = t.setLocations;
    return {
      onupdate(e) {
        const t = e.dom;
        const n = e.children;
        const i = e.attrs;
        const o = i.locations;
        const r = i.location;
        const s = n.length;
        s !== l().count && d(s),
          o && JSON.stringify(o) !== JSON.stringify(l().locations) && f(o),
          r && r !== l().location && u({ location: r });
        const a = getComputedStyle(t).direction;
        a !== l().direction && c(a);
      },
      view(e) {
        const t = e.children;
        if (!t) return null;
        const n = a.getSliderStyle(l());
        const i = n.className;
        const o = n.style;
        return g(
          '.glissando',
          g(
            '.glissando-slider',
            {
              oncreate(e) {
                e.dom.addEventListener('transitionend', r);
              },
              onremove(e) {
                e.dom.removeEventListener('transitionend', r);
              },
              className: i,
              style: o,
            },
            s().map(function (e) {
              return g('.glissando-page', t[e]);
            }),
          ),
        );
      },
    };
  }),
    (e.useGlissandoModel = function () {
      const e = a.GlissandoModel();
      return e.getState.map(g.redraw), e;
    }),
    Object.defineProperty(e, '__esModule', { value: !0 });
});
