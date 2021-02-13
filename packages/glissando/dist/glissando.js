!(function (n, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(exports, require('mithril/stream'))
    : 'function' == typeof define && define.amd
    ? define(['exports', 'mithril/stream'], t)
    : t(
        ((n =
          'undefined' != typeof globalThis
            ? globalThis
            : n || self).glissando = {}),
        n.Stream,
      );
})(this, function (n, t) {
  'use strict';
  function e(n) {
    return n && 'object' == typeof n && 'default' in n ? n : { default: n };
  }
  var a = e(t),
    u = function () {
      return (u =
        Object.assign ||
        function (n) {
          for (var t, e = 1, i = arguments.length; e < i; e++)
            for (var r in (t = arguments[e]))
              Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
          return n;
        }).apply(this, arguments);
    };
  function c(i) {
    return function (n) {
      var t = (function (n, t) {
          if (void 0 === t || Number.isNaN(t))
            return { newIndex: n.index, shouldUpdate: !1 };
          t = Math.min(t, n.count - 1);
          return {
            newIndex: t,
            shouldUpdate: 0 <= t && t < n.count && t !== n.index,
          };
        })(i, n.index),
        e = t.newIndex;
      return t.shouldUpdate
        ? u(u(u({}, i), n.animate ? void 0 : { index: e }), {
            targetIndex: e,
            isAnimating: !!n.animate,
          })
        : i;
    };
  }
  function d(e) {
    return function (n) {
      if (e.locations && e.location) {
        var t = e.locations.indexOf(e.location);
        if (-1 !== t) return e.locations[n(t)];
      }
    };
  }
  Object.defineProperty(n, 'Stream', {
    enumerable: !0,
    get: function () {
      return a.default;
    },
  }),
    (n.GlissandoModel = function (n) {
      var e = (n = void 0 === n ? {} : n).sideViews || 1,
        i = (function () {
          for (var n = 0, t = 0, e = arguments.length; t < e; t++)
            n += arguments[t].length;
          for (var i = Array(n), r = 0, t = 0; t < e; t++)
            for (var o = arguments[t], a = 0, u = o.length; a < u; a++, r++)
              i[r] = o[a];
          return i;
        })(Array(1 + 2 * e)).map(function (n, t) {
          return t - e;
        }),
        t = {
          initialState: {
            index: n.index || 0,
            targetIndex: n.index || 0,
            isAnimating: !1,
            count: 0,
            direction: 'ltr',
            slots: i,
            sideViews: e,
          },
          actions: function (i) {
            return {
              previous: function (n) {
                var t = (void 0 === n ? { animate: !0 } : n).animate;
                i(function (n) {
                  return c(n)({ index: n.index - 1, animate: !1 !== t });
                });
              },
              next: function (n) {
                var t = (void 0 === n ? { animate: !0 } : n).animate;
                i(function (n) {
                  return c(n)({ index: n.index + 1, animate: !1 !== t });
                });
              },
              goTo: function (n) {
                var t = n.index,
                  e = n.location,
                  r = n.animate;
                i(function (n) {
                  var i;
                  return e
                    ? ((i = n),
                      (function (n) {
                        if (!i.locations || 0 === i.locations.length) return i;
                        var t = n.location.toString(),
                          e = i.locations.indexOf(t);
                        -1 === e && ((e = 0), (t = i.locations[e]));
                        (n = void 0 !== i.location && !1 !== n.animate),
                          (t = u(u({}, i), { location: t }));
                        return c(t)({ index: e, animate: n });
                      })({ location: e, animate: r }))
                    : void 0 === t
                    ? n
                    : c(n)({ index: t, animate: r });
                });
              },
              finalize: function (t) {
                i(function (n) {
                  return c(n)({ index: t, animate: !1 });
                });
              },
              setCount: function (t) {
                i(function (n) {
                  return c(u(u({}, n), { count: t }))({ index: n.index });
                });
              },
              setDirection: function (t) {
                i(function (n) {
                  return u(u({}, n), { direction: t });
                });
              },
              setLocations: function (t) {
                i(function (n) {
                  return u(u({}, n), { locations: t });
                });
              },
            };
          },
          selectors: function (t) {
            return {
              hasNext: function () {
                var n = t();
                return n.index < n.count - 1;
              },
              hasPrevious: function () {
                return 0 < t().index;
              },
              isAnimating: function () {
                return t().isAnimating;
              },
              getViewIndices: function () {
                var e = t();
                return i.map(function (n) {
                  var t = n + e.index + 0;
                  return (
                    n < 0 && e.targetIndex < e.index
                      ? (t = n + e.targetIndex + 1)
                      : 0 < n &&
                        e.targetIndex > e.index &&
                        (t = n + e.targetIndex - 1),
                    t
                  );
                });
              },
              getLocation: function () {
                var n = t();
                return d(n)(function (n) {
                  return n;
                });
              },
              getNextLocation: function () {
                var n = t();
                return d(n)(function (n) {
                  return n + 1;
                });
              },
              getPreviousLocation: function () {
                var n = t();
                return d(n)(function (n) {
                  return n - 1;
                });
              },
            };
          },
        },
        r = a.default(),
        o = a.default.scan(
          function (n, t) {
            return t(n);
          },
          u({}, t.initialState),
          r,
        ),
        n = u({}, t.actions(r)),
        r = u({}, t.selectors(o)),
        t = a.default.scan(
          function (n, t) {
            return JSON.stringify(n, null, 2) === JSON.stringify(t, null, 2)
              ? a.default.SKIP
              : t;
          },
          a.default.SKIP,
          o,
        ),
        t = a.default.lift(function (n) {
          return n;
        }, t);
      return u(u({ getState: o, getChanges: t }, n), r);
    }),
    (n.getSliderStyle = function (n) {
      var t = 2 * n.sideViews + 1,
        e = 100 / t,
        i = 'rtl' === n.direction ? 1 : -1,
        r = i * e * (n.sideViews + 0);
      return (
        n.targetIndex > n.index
          ? (r = i * e * (n.sideViews + 1))
          : n.targetIndex < n.index && (r = i * e * (n.sideViews - 1)),
        {
          style: u(
            { width: 100 * t + '%', transform: 'translateX(' + r + '%)' },
            n.isAnimating ? void 0 : { transitionDuration: '0ms' },
          ),
          className: n.isAnimating ? 'glissando-animating' : '',
        }
      );
    }),
    Object.defineProperty(n, '__esModule', { value: !0 });
});
