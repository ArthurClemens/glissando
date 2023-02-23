(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("mithril")) : typeof define === "function" && define.amd ? define(["exports", "mithril"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.glissandoMithril = {}, global.m));
})(this, function(exports2, m) {
  "use strict";
  function g(t) {
    return p(function() {
      return t.map(function(e) {
        return e();
      });
    }, t);
  }
  function h(t, e, u) {
    var n = u.map(function(c) {
      var f = t(e, c);
      return f !== i.SKIP && (e = f), f;
    });
    return n(e), n;
  }
  function l(t, e) {
    var u = t.map(function(c) {
      return c[0];
    }), n = p(function() {
      var c = arguments[arguments.length - 1];
      return u.forEach(function(f, r) {
        c.indexOf(f) > -1 && (e = t[r][1](e, f()));
      }), e;
    }, u);
    return n(e), n;
  }
  function _() {
    var t = arguments[0], e = Array.prototype.slice.call(arguments, 1);
    return g(e).map(function(u) {
      return t.apply(void 0, u);
    });
  }
  function s(t) {
    return t._state === "pending" || t._state === "active" || t._state === "changing";
  }
  var i = function(t) {
    var e = [], u = [];
    function n(r) {
      return arguments.length && r !== i.SKIP && (t = r, s(n) && (n._changing(), n._state = "active", e.slice().forEach(function(a, o) {
        s(a) && a(this[o](t));
      }, u.slice()))), t;
    }
    n.constructor = i, n._state = arguments.length && t !== i.SKIP ? "active" : "pending", n._parents = [], n._changing = function() {
      s(n) && (n._state = "changing"), e.forEach(function(r) {
        r._changing();
      });
    }, n._map = function(r, a) {
      var o = a ? i() : i(r(t));
      return o._parents.push(n), e.push(o), u.push(r), o;
    }, n.map = function(r) {
      return n._map(r, n._state !== "active");
    };
    var c;
    function f() {
      return c = i(), c.map(function(r) {
        return r === true && (n._parents.forEach(function(a) {
          a._unregisterChild(n);
        }), n._state = "ended", n._parents.length = e.length = u.length = 0), r;
      }), c;
    }
    return n.toJSON = function() {
      return t != null && typeof t.toJSON == "function" ? t.toJSON() : t;
    }, n["fantasy-land/map"] = n.map, n["fantasy-land/ap"] = function(r) {
      return p(
        function(a, o) {
          return a()(o());
        },
        [r, n]
      );
    }, n._unregisterChild = function(r) {
      var a = e.indexOf(r);
      a !== -1 && (e.splice(a, 1), u.splice(a, 1));
    }, Object.defineProperty(n, "end", {
      get: function() {
        return c || f();
      }
    }), n;
  };
  function p(t, e) {
    var u = e.every(function(a) {
      if (a.constructor !== i)
        throw new Error(
          "Ensure that each item passed to stream.combine/stream.merge/lift is a stream."
        );
      return a._state === "active";
    }), n = u ? i(t.apply(null, e.concat([e]))) : i(), c = [], f = e.map(function(a) {
      return a._map(function(o) {
        return c.push(a), (u || e.every(function(m2) {
          return m2._state !== "pending";
        })) && (u = true, n(t.apply(null, e.concat([c]))), c = []), o;
      }, true);
    }), r = n.end.map(function(a) {
      a === true && (f.forEach(function(o) {
        o.end(true);
      }), r.end(true));
    });
    return n;
  }
  i.SKIP = {};
  i.lift = _;
  i.scan = h;
  i.merge = g;
  i.combine = p;
  i.scanMerge = l;
  i["fantasy-land/of"] = i;
  var d = false;
  Object.defineProperty(i, "HALT", {
    get: function() {
      return d || console.log("HALT is deprecated and has been renamed to SKIP"), d = true, i.SKIP;
    }
  });
  const calculateNewIndex = (state, index) => {
    if (index === void 0 || Number.isNaN(index)) {
      return {
        newIndex: state.index,
        shouldUpdate: false
      };
    }
    const newIndex = Math.min(index, state.count - 1);
    const isValid = newIndex >= 0 && newIndex < state.count;
    const shouldUpdate = isValid && newIndex !== state.index;
    return {
      newIndex,
      shouldUpdate
    };
  };
  const setIndex = (state) => (change) => {
    const { newIndex, shouldUpdate } = calculateNewIndex(state, change.index);
    return shouldUpdate ? {
      ...state,
      ...change.animate ? void 0 : { index: newIndex },
      targetIndex: newIndex,
      isAnimating: !!change.animate
    } : state;
  };
  const setLocation = (state) => (change) => {
    if (!state.locations || state.locations.length === 0) {
      return state;
    }
    let locationStr = change.location.toString();
    let index = state.locations.indexOf(locationStr);
    if (index === -1) {
      index = 0;
      locationStr = state.locations[index];
    }
    const shouldAnimate = state.location === void 0 ? false : change.animate !== false;
    const newState = {
      ...state,
      location: locationStr
    };
    const indexChange = {
      index,
      animate: shouldAnimate
    };
    return setIndex(newState)(indexChange);
  };
  const lookupLocation = (state) => (changeFn) => {
    if (!state.locations || !state.location) {
      return void 0;
    }
    const index = state.locations.indexOf(state.location);
    if (index === -1) {
      return void 0;
    }
    return state.locations[changeFn(index)];
  };
  const getInitialState = ({
    index = 0,
    count = 0,
    sideViews = 1,
    location,
    locations
  } = {}) => {
    const slots = Array.from({ length: 1 + sideViews * 2 }, (_2, i2) => i2).map(
      (_2, i2) => i2 - sideViews
    );
    const initialState = {
      targetIndex: index,
      index,
      count,
      ...Array.isArray(locations) ? {
        locations,
        count: locations ? locations.length : 0,
        location: locations[0]
      } : void 0,
      ...location ? {
        location,
        index: Array.isArray(locations) ? locations.indexOf(location) || index : index
      } : void 0,
      isAnimating: false,
      direction: "ltr",
      // set by libs glissando-mithril etc
      slots,
      sideViews
    };
    initialState.targetIndex = initialState.index;
    return initialState;
  };
  const GlissandoModel = (props = {}) => {
    const initialState = getInitialState(props);
    const glissandoState = {
      initialState,
      actions: (update2) => ({
        previous: ({ animate } = { animate: true }) => {
          update2(
            (state) => setIndex(state)({
              index: state.index - 1,
              animate: animate !== false
            })
          );
        },
        next: ({ animate } = { animate: true }) => {
          update2(
            (state) => setIndex(state)({
              index: state.index + 1,
              animate: animate !== false
            })
          );
        },
        goTo: ({
          index,
          location,
          animate
        }) => {
          update2((state) => {
            if (location) {
              const change2 = {
                location,
                animate
              };
              return setLocation(state)(change2);
            }
            if (index === void 0) {
              return state;
            }
            const change = {
              index,
              animate
            };
            return setIndex(state)(change);
          });
        },
        finalize: (index) => {
          update2(
            (state) => setIndex(state)({
              index,
              animate: false
            })
          );
        },
        setCount: (count) => {
          update2(
            (state) => setIndex({
              ...state,
              count
            })({ index: state.index })
          );
        },
        setDirection: (direction) => {
          update2((state) => ({
            ...state,
            direction
          }));
        },
        setLocations: (locations) => {
          update2((state) => ({
            ...state,
            locations,
            count: locations.length
          }));
        }
      }),
      selectors: (states2) => ({
        hasNext: () => {
          const state = states2();
          return state.index < state.count - 1;
        },
        hasPrevious: () => {
          const state = states2();
          return state.index > 0;
        },
        isAnimating: () => {
          const state = states2();
          return state.isAnimating;
        },
        getViewIndices: () => {
          const state = states2();
          return state.slots.map((slotIndex) => {
            let index = slotIndex + state.index + 0;
            if (slotIndex < 0 && state.targetIndex < state.index) {
              index = slotIndex + state.targetIndex + 1;
            } else if (slotIndex > 0 && state.targetIndex > state.index) {
              index = slotIndex + state.targetIndex - 1;
            }
            return index;
          });
        },
        getLocation: () => {
          const state = states2();
          return lookupLocation(state)((index) => index);
        },
        getNextLocation: () => {
          const state = states2();
          return lookupLocation(state)((index) => index + 1);
        },
        getPreviousLocation: () => {
          const state = states2();
          return lookupLocation(state)((index) => index - 1);
        }
      })
    };
    const update = i();
    const states = i.scan(
      (state, patch) => patch(state),
      {
        ...glissandoState.initialState
      },
      update
    );
    const actions = {
      ...glissandoState.actions(update)
    };
    const selectors = {
      ...glissandoState.selectors(states)
    };
    const changedStates = i.scan(
      (state, value) => JSON.stringify(state, null, 2) === JSON.stringify(value, null, 2) ? i.SKIP : value,
      i.SKIP,
      states
    );
    const getChanges = i.lift(
      (value) => value,
      changedStates
    );
    return {
      getState: states,
      getChanges,
      ...actions,
      ...selectors
    };
  };
  const getSliderStyle = (state) => {
    const slotCount = 2 * state.sideViews + 1;
    const slotWidth = 100 / slotCount;
    const direction = state.direction === "rtl" ? 1 : -1;
    let sliderTranslateX = direction * slotWidth * (state.sideViews + 0);
    if (state.targetIndex > state.index) {
      sliderTranslateX = direction * slotWidth * (state.sideViews + 1);
    } else if (state.targetIndex < state.index) {
      sliderTranslateX = direction * slotWidth * (state.sideViews - 1);
    }
    const style = {
      width: `calc(${slotCount} * calc(100%))`,
      transform: `translateX(${sliderTranslateX}%)`,
      ...!state.isAnimating ? {
        transitionDuration: "0ms"
      } : void 0
    };
    const className = state.isAnimating ? "glissando-animating" : "";
    return { style, className };
  };
  const GlissandoSlider = (initialVnode) => {
    const { model } = initialVnode.attrs;
    const {
      getState,
      finalize,
      setCount,
      setDirection,
      getViewIndices,
      goTo,
      setLocations
    } = model;
    const onTransitionEnd = () => {
      finalize(getState().targetIndex);
    };
    return {
      onupdate: ({ dom, children, attrs }) => {
        const { locations, location } = attrs;
        const count = children.length;
        if (count !== getState().count) {
          setCount(count);
        }
        if (locations && JSON.stringify(locations) !== JSON.stringify(getState().locations)) {
          setLocations(locations);
        }
        if (location && location !== getState().location) {
          goTo({ location });
        }
        const { direction } = getComputedStyle(dom);
        if (direction !== getState().direction) {
          setDirection(direction);
        }
      },
      view: ({ children, attrs }) => {
        if (!children) {
          return null;
        }
        const { className: sliderClassName } = attrs;
        const { className, style } = getSliderStyle(getState());
        return m(
          "div",
          {
            className: ["glissando", sliderClassName].join(" ")
          },
          m(
            ".glissando-slider",
            {
              oncreate: (vnode) => {
                vnode.dom.addEventListener("transitionend", onTransitionEnd);
              },
              onremove: (vnode) => {
                vnode.dom.removeEventListener("transitionend", onTransitionEnd);
              },
              className,
              style
            },
            getViewIndices().map(
              (viewIndex) => m(".glissando-page", children[viewIndex])
            )
          )
        );
      }
    };
  };
  const useGlissandoModel = (initialState) => {
    const model = GlissandoModel(initialState);
    model.getState.map(m.redraw);
    return model;
  };
  exports2.GlissandoModel = GlissandoModel;
  exports2.GlissandoSlider = GlissandoSlider;
  exports2.getSliderStyle = getSliderStyle;
  exports2.useGlissandoModel = useGlissandoModel;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
//# sourceMappingURL=glissando-mithril.umd.js.map
