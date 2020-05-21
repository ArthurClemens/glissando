!(function (n, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(exports, require('mithril/stream'))
    : 'function' == typeof define && define.amd
    ? define(['exports', 'mithril/stream'], t)
    : t(((n = n || self).glissando = {}), n.Stream);
})(this, function (n, d) {
  'use strict';
  d = d && Object.prototype.hasOwnProperty.call(d, 'default') ? d.default : d;
  var f = function () {
    return (f =
      Object.assign ||
      function (n) {
        for (var t, i = 1, e = arguments.length; i < e; i++)
          for (var r in (t = arguments[i]))
            Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
        return n;
      }).apply(this, arguments);
  };
  function l(e) {
    return function (n) {
      var t = (function (n, t) {
          if (void 0 === t || Number.isNaN(t))
            return { newIndex: n.index, shouldUpdate: !1 };
          var i = Math.min(t, n.count - 1);
          return {
            newIndex: i,
            shouldUpdate: 0 <= i && i < n.count && i !== n.index,
          };
        })(e, n.index),
        i = t.newIndex;
      return t.shouldUpdate
        ? f(f(f({}, e), n.animate ? void 0 : { index: i }), {
            targetIndex: i,
            isAnimating: !!n.animate,
          })
        : e;
    };
  }
  function x(i) {
    return function (n) {
      if (i.locations && i.location) {
        var t = i.locations.indexOf(i.location);
        if (-1 !== t) return i.locations[n(t)];
      }
    };
  }
  (n.Stream = d),
    (n.GlissandoModel = function (n) {
      void 0 === n && (n = {});
      var i = n.sideViews || 1,
        e = (function () {
          for (var n = 0, t = 0, i = arguments.length; t < i; t++)
            n += arguments[t].length;
          for (var e = Array(n), r = 0, t = 0; t < i; t++)
            for (var o = arguments[t], a = 0, u = o.length; a < u; a++, r++)
              e[r] = o[a];
          return e;
        })(Array(1 + 2 * i)).map(function (n, t) {
          return t - i;
        }),
        t = {
          initialState: {
            index: n.index || 0,
            targetIndex: n.index || 0,
            isAnimating: !1,
            count: 0,
            direction: 'ltr',
            slots: e,
            sideViews: i,
          },
          actions: function (r) {
            return {
              previous: function (n) {
                var t = (void 0 === n ? { animate: !0 } : n).animate;
                r(function (n) {
                  return l(n)({ index: n.index - 1, animate: !1 !== t });
                });
              },
              next: function (n) {
                var t = (void 0 === n ? { animate: !0 } : n).animate;
                r(function (n) {
                  return l(n)({ index: n.index + 1, animate: !1 !== t });
                });
              },
              goTo: function (n) {
                var t = n.index,
                  i = n.location,
                  e = n.animate;
                r(function (n) {
                  var o;
                  return i
                    ? ((o = n),
                      (function (n) {
                        if (!o.locations || 0 === o.locations.length) return o;
                        var t = n.location.toString(),
                          i = o.locations.indexOf(t);
                        -1 === i && ((i = 0), (t = o.locations[i]));
                        var e = void 0 !== o.location && !1 !== n.animate,
                          r = f(f({}, o), { location: t });
                        return l(r)({ index: i, animate: e });
                      })({ location: i, animate: e }))
                    : void 0 === t
                    ? n
                    : l(n)({ index: t, animate: e });
                });
              },
              finalize: function (t) {
                r(function (n) {
                  return l(n)({ index: t, animate: !1 });
                });
              },
              setCount: function (t) {
                r(function (n) {
                  return l(f(f({}, n), { count: t }))({ index: n.index });
                });
              },
              setDirection: function (t) {
                r(function (n) {
                  return f(f({}, n), { direction: t });
                });
              },
              setLocations: function (t) {
                r(function (n) {
                  return f(f({}, n), { locations: t });
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
                var i = t();
                return e.map(function (n) {
                  var t = n + i.index + 0;
                  return (
                    n < 0 && i.targetIndex < i.index
                      ? (t = n + i.targetIndex + 1)
                      : 0 < n &&
                        i.targetIndex > i.index &&
                        (t = n + i.targetIndex - 1),
                    t
                  );
                });
              },
              getLocation: function () {
                var n = t();
                return x(n)(function (n) {
                  return n;
                });
              },
              getNextLocation: function () {
                var n = t();
                return x(n)(function (n) {
                  return n + 1;
                });
              },
              getPreviousLocation: function () {
                var n = t();
                return x(n)(function (n) {
                  return n - 1;
                });
              },
            };
          },
        },
        r = d(),
        o = d.scan(
          function (n, t) {
            return t(n);
          },
          f({}, t.initialState),
          r,
        ),
        a = f({}, t.actions(r)),
        u = f({}, t.selectors(o)),
        c = d.scan(
          function (n, t) {
            return JSON.stringify(n, null, 2) === JSON.stringify(t, null, 2)
              ? d.SKIP
              : t;
          },
          d.SKIP,
          o,
        ),
        s = d.lift(function (n) {
          return n;
        }, c);
      return f(f({ getState: o, getChanges: s }, a), u);
    }),
    (n.getSliderStyle = function (n) {
      var t = 2 * n.sideViews + 1,
        i = 100 / t,
        e = 'rtl' === n.direction ? 1 : -1,
        r = e * i * (n.sideViews + 0);
      return (
        n.targetIndex > n.index
          ? (r = e * i * (n.sideViews + 1))
          : n.targetIndex < n.index && (r = e * i * (n.sideViews - 1)),
        {
          style: f(
            { width: 100 * t + '%', transform: 'translateX(' + r + '%)' },
            n.isAnimating ? void 0 : { transitionDuration: '0ms' },
          ),
          className: n.isAnimating ? 'glissando-animating' : '',
        }
      );
    }),
    Object.defineProperty(n, '__esModule', { value: !0 });
});
