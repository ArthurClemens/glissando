import React, { useRef, useCallback, useState, useEffect } from "react";
var jsxRuntimeExports = {};
var jsxRuntime = {
  get exports() {
    return jsxRuntimeExports;
  },
  set exports(v) {
    jsxRuntimeExports = v;
  }
};
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_production_min;
function requireReactJsxRuntime_production_min() {
  if (hasRequiredReactJsxRuntime_production_min)
    return reactJsxRuntime_production_min;
  hasRequiredReactJsxRuntime_production_min = 1;
  var f = React, k = Symbol.for("react.element"), l2 = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p2 = { key: true, ref: true, __self: true, __source: true };
  function q(c, a, g2) {
    var b, d2 = {}, e = null, h2 = null;
    void 0 !== g2 && (e = "" + g2);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (h2 = a.ref);
    for (b in a)
      m.call(a, b) && !p2.hasOwnProperty(b) && (d2[b] = a[b]);
    if (c && c.defaultProps)
      for (b in a = c.defaultProps, a)
        void 0 === d2[b] && (d2[b] = a[b]);
    return { $$typeof: k, type: c, key: e, ref: h2, props: d2, _owner: n.current };
  }
  reactJsxRuntime_production_min.Fragment = l2;
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  return reactJsxRuntime_production_min;
}
var reactJsxRuntime_development = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_development;
function requireReactJsxRuntime_development() {
  if (hasRequiredReactJsxRuntime_development)
    return reactJsxRuntime_development;
  hasRequiredReactJsxRuntime_development = 1;
  if (process.env.NODE_ENV !== "production") {
    (function() {
      var React$1 = React;
      var REACT_ELEMENT_TYPE = Symbol.for("react.element");
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
      var REACT_CONTEXT_TYPE = Symbol.for("react.context");
      var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
      var REACT_MEMO_TYPE = Symbol.for("react.memo");
      var REACT_LAZY_TYPE = Symbol.for("react.lazy");
      var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable !== "object") {
          return null;
        }
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        if (typeof maybeIterator === "function") {
          return maybeIterator;
        }
        return null;
      }
      var ReactSharedInternals = React$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function error(format) {
        {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
      }
      function printWarning(level, format, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
          var stack = ReactDebugCurrentFrame2.getStackAddendum();
          if (stack !== "") {
            format += "%s";
            args = args.concat([stack]);
          }
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format);
          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var enableScopeAPI = false;
      var enableCacheElement = false;
      var enableTransitionTracing = false;
      var enableLegacyHidden = false;
      var enableDebugTracing = false;
      var REACT_MODULE_REFERENCE;
      {
        REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
      }
      function isValidElementType(type) {
        if (typeof type === "string" || typeof type === "function") {
          return true;
        }
        if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
          return true;
        }
        if (typeof type === "object" && type !== null) {
          if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
          // types supported by any Flight configuration anywhere since
          // we don't know which Flight build this will end up being used
          // with.
          type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
            return true;
          }
        }
        return false;
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;
        if (displayName) {
          return displayName;
        }
        var functionName = innerType.displayName || innerType.name || "";
        return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      function getComponentNameFromType(type) {
        if (type == null) {
          return null;
        }
        {
          if (typeof type.tag === "number") {
            error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
          }
        }
        if (typeof type === "function") {
          return type.displayName || type.name || null;
        }
        if (typeof type === "string") {
          return type;
        }
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              var outerName = type.displayName || null;
              if (outerName !== null) {
                return outerName;
              }
              return getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return getComponentNameFromType(init(payload));
              } catch (x) {
                return null;
              }
            }
          }
        }
        return null;
      }
      var assign = Object.assign;
      var disabledDepth = 0;
      var prevLog;
      var prevInfo;
      var prevWarn;
      var prevError;
      var prevGroup;
      var prevGroupCollapsed;
      var prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = true;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log;
            prevInfo = console.info;
            prevWarn = console.warn;
            prevError = console.error;
            prevGroup = console.group;
            prevGroupCollapsed = console.groupCollapsed;
            prevGroupEnd = console.groupEnd;
            var props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          disabledDepth--;
          if (disabledDepth === 0) {
            var props = {
              configurable: true,
              enumerable: true,
              writable: true
            };
            Object.defineProperties(console, {
              log: assign({}, props, {
                value: prevLog
              }),
              info: assign({}, props, {
                value: prevInfo
              }),
              warn: assign({}, props, {
                value: prevWarn
              }),
              error: assign({}, props, {
                value: prevError
              }),
              group: assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          if (disabledDepth < 0) {
            error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
          }
        }
      }
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
      var prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === void 0) {
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          }
          return "\n" + prefix + name;
        }
      }
      var reentry = false;
      var componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry) {
          return "";
        }
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== void 0) {
            return frame;
          }
        }
        var control;
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher;
        {
          previousDispatcher = ReactCurrentDispatcher.current;
          ReactCurrentDispatcher.current = null;
          disableLogs();
        }
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            });
            if (typeof Reflect === "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack === "string") {
            var sampleLines = sample.stack.split("\n");
            var controlLines = control.stack.split("\n");
            var s2 = sampleLines.length - 1;
            var c = controlLines.length - 1;
            while (s2 >= 1 && c >= 0 && sampleLines[s2] !== controlLines[c]) {
              c--;
            }
            for (; s2 >= 1 && c >= 0; s2--, c--) {
              if (sampleLines[s2] !== controlLines[c]) {
                if (s2 !== 1 || c !== 1) {
                  do {
                    s2--;
                    c--;
                    if (c < 0 || sampleLines[s2] !== controlLines[c]) {
                      var _frame = "\n" + sampleLines[s2].replace(" at new ", " at ");
                      if (fn.displayName && _frame.includes("<anonymous>")) {
                        _frame = _frame.replace("<anonymous>", fn.displayName);
                      }
                      {
                        if (typeof fn === "function") {
                          componentFrameCache.set(fn, _frame);
                        }
                      }
                      return _frame;
                    }
                  } while (s2 >= 1 && c >= 0);
                }
                break;
              }
            }
          }
        } finally {
          reentry = false;
          {
            ReactCurrentDispatcher.current = previousDispatcher;
            reenableLogs();
          }
          Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "";
        var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        {
          if (typeof fn === "function") {
            componentFrameCache.set(fn, syntheticFrame);
          }
        }
        return syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        {
          return describeNativeComponentFrame(fn, false);
        }
      }
      function shouldConstruct(Component) {
        var prototype = Component.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null) {
          return "";
        }
        if (typeof type === "function") {
          {
            return describeNativeComponentFrame(type, shouldConstruct(type));
          }
        }
        if (typeof type === "string") {
          return describeBuiltInComponentFrame(type);
        }
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
              } catch (x) {
              }
            }
          }
        }
        return "";
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var loggedTypeFailures = {};
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame.setExtraStackFrame(null);
          }
        }
      }
      function checkPropTypes(typeSpecs, values, location, componentName, element) {
        {
          var has = Function.call.bind(hasOwnProperty);
          for (var typeSpecName in typeSpecs) {
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0;
              try {
                if (typeof typeSpecs[typeSpecName] !== "function") {
                  var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  err.name = "Invariant Violation";
                  throw err;
                }
                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              if (error$1 && !(error$1 instanceof Error)) {
                setCurrentlyValidatingElement(element);
                error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                setCurrentlyValidatingElement(null);
              }
              if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                loggedTypeFailures[error$1.message] = true;
                setCurrentlyValidatingElement(element);
                error("Failed %s type: %s", location, error$1.message);
                setCurrentlyValidatingElement(null);
              }
            }
          }
        }
      }
      var isArrayImpl = Array.isArray;
      function isArray(a) {
        return isArrayImpl(a);
      }
      function typeName(value) {
        {
          var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
          var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          return type;
        }
      }
      function willCoercionThrow(value) {
        {
          try {
            testStringCoercion(value);
            return false;
          } catch (e) {
            return true;
          }
        }
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        {
          if (willCoercionThrow(value)) {
            error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
            return testStringCoercion(value);
          }
        }
      }
      var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
      var RESERVED_PROPS = {
        key: true,
        ref: true,
        __self: true,
        __source: true
      };
      var specialPropKeyWarningShown;
      var specialPropRefWarningShown;
      var didWarnAboutStringRefs;
      {
        didWarnAboutStringRefs = {};
      }
      function hasValidRef(config) {
        {
          if (hasOwnProperty.call(config, "ref")) {
            var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.ref !== void 0;
      }
      function hasValidKey(config) {
        {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.key !== void 0;
      }
      function warnIfStringRefCannotBeAutoConverted(config, self) {
        {
          if (typeof config.ref === "string" && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
            var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
            if (!didWarnAboutStringRefs[componentName]) {
              error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
              didWarnAboutStringRefs[componentName] = true;
            }
          }
        }
      }
      function defineKeyPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingKey = function() {
            if (!specialPropKeyWarningShown) {
              specialPropKeyWarningShown = true;
              error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
      }
      function defineRefPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingRef = function() {
            if (!specialPropRefWarningShown) {
              specialPropRefWarningShown = true;
              error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
            }
          };
          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }
      }
      var ReactElement = function(type, key, ref, self, source, owner, props) {
        var element = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: REACT_ELEMENT_TYPE,
          // Built-in properties that belong on the element
          type,
          key,
          ref,
          props,
          // Record the component responsible for creating this element.
          _owner: owner
        };
        {
          element._store = {};
          Object.defineProperty(element._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
          });
          Object.defineProperty(element, "_self", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: self
          });
          Object.defineProperty(element, "_source", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: source
          });
          if (Object.freeze) {
            Object.freeze(element.props);
            Object.freeze(element);
          }
        }
        return element;
      };
      function jsxDEV(type, config, maybeKey, source, self) {
        {
          var propName;
          var props = {};
          var key = null;
          var ref = null;
          if (maybeKey !== void 0) {
            {
              checkKeyStringCoercion(maybeKey);
            }
            key = "" + maybeKey;
          }
          if (hasValidKey(config)) {
            {
              checkKeyStringCoercion(config.key);
            }
            key = "" + config.key;
          }
          if (hasValidRef(config)) {
            ref = config.ref;
            warnIfStringRefCannotBeAutoConverted(config, self);
          }
          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
              props[propName] = config[propName];
            }
          }
          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps) {
              if (props[propName] === void 0) {
                props[propName] = defaultProps[propName];
              }
            }
          }
          if (key || ref) {
            var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
          return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
        }
      }
      var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
      var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement$1(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame$1.setExtraStackFrame(null);
          }
        }
      }
      var propTypesMisspellWarningShown;
      {
        propTypesMisspellWarningShown = false;
      }
      function isValidElement(object) {
        {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
      }
      function getDeclarationErrorAddendum() {
        {
          if (ReactCurrentOwner$1.current) {
            var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
            if (name) {
              return "\n\nCheck the render method of `" + name + "`.";
            }
          }
          return "";
        }
      }
      function getSourceInfoErrorAddendum(source) {
        {
          if (source !== void 0) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, "");
            var lineNumber = source.lineNumber;
            return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
          }
          return "";
        }
      }
      var ownerHasKeyUseWarning = {};
      function getCurrentComponentErrorInfo(parentType) {
        {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
            if (parentName) {
              info = "\n\nCheck the top-level render call using <" + parentName + ">.";
            }
          }
          return info;
        }
      }
      function validateExplicitKey(element, parentType) {
        {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
            childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
          }
          setCurrentlyValidatingElement$1(element);
          error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
          setCurrentlyValidatingElement$1(null);
        }
      }
      function validateChildKeys(node, parentType) {
        {
          if (typeof node !== "object") {
            return;
          }
          if (isArray(node)) {
            for (var i2 = 0; i2 < node.length; i2++) {
              var child = node[i2];
              if (isValidElement(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement(node)) {
            if (node._store) {
              node._store.validated = true;
            }
          } else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
      }
      function validatePropTypes(element) {
        {
          var type = element.type;
          if (type === null || type === void 0 || typeof type === "string") {
            return;
          }
          var propTypes;
          if (typeof type === "function") {
            propTypes = type.propTypes;
          } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          type.$$typeof === REACT_MEMO_TYPE)) {
            propTypes = type.propTypes;
          } else {
            return;
          }
          if (propTypes) {
            var name = getComponentNameFromType(type);
            checkPropTypes(propTypes, element.props, "prop", name, element);
          } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
            propTypesMisspellWarningShown = true;
            var _name = getComponentNameFromType(type);
            error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
          }
          if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
            error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
          }
        }
      }
      function validateFragmentProps(fragment) {
        {
          var keys = Object.keys(fragment.props);
          for (var i2 = 0; i2 < keys.length; i2++) {
            var key = keys[i2];
            if (key !== "children" && key !== "key") {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
              setCurrentlyValidatingElement$1(null);
              break;
            }
          }
          if (fragment.ref !== null) {
            setCurrentlyValidatingElement$1(fragment);
            error("Invalid attribute `ref` supplied to `React.Fragment`.");
            setCurrentlyValidatingElement$1(null);
          }
        }
      }
      function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
        {
          var validType = isValidElementType(type);
          if (!validType) {
            var info = "";
            if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
              info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
            var sourceInfo = getSourceInfoErrorAddendum(source);
            if (sourceInfo) {
              info += sourceInfo;
            } else {
              info += getDeclarationErrorAddendum();
            }
            var typeString;
            if (type === null) {
              typeString = "null";
            } else if (isArray(type)) {
              typeString = "array";
            } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
              info = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type;
            }
            error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
          }
          var element = jsxDEV(type, props, key, source, self);
          if (element == null) {
            return element;
          }
          if (validType) {
            var children = props.children;
            if (children !== void 0) {
              if (isStaticChildren) {
                if (isArray(children)) {
                  for (var i2 = 0; i2 < children.length; i2++) {
                    validateChildKeys(children[i2], type);
                  }
                  if (Object.freeze) {
                    Object.freeze(children);
                  }
                } else {
                  error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
                }
              } else {
                validateChildKeys(children, type);
              }
            }
          }
          if (type === REACT_FRAGMENT_TYPE) {
            validateFragmentProps(element);
          } else {
            validatePropTypes(element);
          }
          return element;
        }
      }
      function jsxWithValidationStatic(type, props, key) {
        {
          return jsxWithValidation(type, props, key, true);
        }
      }
      function jsxWithValidationDynamic(type, props, key) {
        {
          return jsxWithValidation(type, props, key, false);
        }
      }
      var jsx = jsxWithValidationDynamic;
      var jsxs = jsxWithValidationStatic;
      reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
      reactJsxRuntime_development.jsx = jsx;
      reactJsxRuntime_development.jsxs = jsxs;
    })();
  }
  return reactJsxRuntime_development;
}
(function(module) {
  if (process.env.NODE_ENV === "production") {
    module.exports = requireReactJsxRuntime_production_min();
  } else {
    module.exports = requireReactJsxRuntime_development();
  }
})(jsxRuntime);
const noop = () => {
};
function useEffectRef(callback) {
  const disposeRef = useRef(noop);
  const effect = useCallback((element) => {
    disposeRef.current();
    disposeRef.current = noop;
    if (element) {
      const dispose = callback(element);
      if (typeof dispose === "function") {
        disposeRef.current = dispose;
      } else if (dispose !== void 0) {
        console.warn("Effect ref callback must return undefined or a dispose function");
      }
    }
  }, [callback]);
  return effect;
}
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
      return c.push(a), (u || e.every(function(m) {
        return m._state !== "pending";
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
const GlissandoSlider = (props) => {
  const {
    model,
    children,
    locations,
    location,
    className: sliderClassName
  } = props;
  const [sliderNode, setSliderNode] = useState();
  const {
    getState,
    finalize,
    setCount,
    setDirection,
    getViewIndices,
    setLocations,
    goTo
  } = model;
  useEffect(() => {
    const count = (children || []).length;
    if (count !== getState().count) {
      setCount(count);
    }
  }, [children, getState, setCount]);
  useEffect(() => {
    if (locations && JSON.stringify(locations) !== JSON.stringify(getState().locations)) {
      setLocations(locations);
    }
  }, [locations]);
  useEffect(() => {
    if (location && location !== getState().location) {
      goTo({ location });
    }
  }, [location]);
  const observeTransitionEnd = useCallback(
    (node) => {
      if (node === null) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
      }
      setSliderNode(node);
      const onTransitionEnd = () => {
        finalize(getState().targetIndex);
      };
      node.addEventListener("transitionend", onTransitionEnd);
      return () => {
        node.removeEventListener("transitionend", onTransitionEnd);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useEffect(() => {
    if (!sliderNode) {
      return;
    }
    const { direction } = getComputedStyle(sliderNode);
    if (direction !== getState().direction) {
      setDirection(direction);
    }
  }, [props]);
  const sliderRef = useEffectRef(
    (node) => observeTransitionEnd(node)
  );
  if (!children) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
  }
  const { className, style } = getSliderStyle(getState());
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: ["glissando", sliderClassName].join(" "), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `glissando-slider ${className}`,
      style,
      ref: sliderRef,
      children: getViewIndices().map((viewIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glissando-page", children: children[viewIndex] }, viewIndex))
    }
  ) });
};
const useStream = ({ model, onMount, onDestroy, onUpdate, deps = [], defer, debug }) => {
  const [streamValues, setStreamValues] = React.useState({});
  const isInitedRef = React.useRef(false);
  const subsRef = React.useRef([]);
  const subscribe = (memo2) => {
    if (debug) {
      debug("Subscribe");
    }
    subsRef.current = Object.keys(memo2).map((key) => {
      const stream = memo2[key];
      if (stream.map && typeof stream.map === "function") {
        return stream.map((value) => {
          if (debug) {
            debug("Will update %s", key);
          }
          setStreamValues({
            ...streamValues,
            [key]: value
          });
          return null;
        });
      }
      return false;
    }).filter(Boolean);
  };
  const unsubscribe = () => {
    if (subsRef.current.length) {
      if (debug) {
        debug("Unsubscribe");
      }
      subsRef.current.forEach((s2) => s2.end(true));
      subsRef.current = [];
    }
  };
  const createMemo = () => {
    if (debug) {
      debug("createMemo");
    }
    unsubscribe();
    const modelFn = typeof model === "function" ? model : () => model;
    const memo2 = modelFn();
    subscribe(memo2);
    return memo2;
  };
  const [memo, setMemo] = React.useState(defer ? { ...model, isDeferred: true } : createMemo);
  React.useEffect(() => {
    if (!isInitedRef.current) {
      return;
    }
    if (debug) {
      debug("Updating");
    }
    if (onUpdate) {
      const localMemo = createMemo();
      setMemo(localMemo);
      onUpdate(localMemo);
    }
  }, deps);
  React.useEffect(() => {
    if (debug) {
      debug("Mounting");
    }
    let localMemo = memo;
    if (defer) {
      localMemo = createMemo();
      setMemo(localMemo);
    }
    if (onMount && localMemo) {
      onMount(localMemo);
    }
    isInitedRef.current = true;
    return () => {
      if (debug) {
        debug("Unmounting");
      }
      unsubscribe();
      if (onDestroy) {
        onDestroy(memo);
      }
    };
  }, []);
  return memo;
};
const useGlissandoModel = (initialState) => {
  const [model] = useState(GlissandoModel(initialState));
  useStream({
    model: () => ({
      _: model.getState
    }),
    defer: true
  });
  return model;
};
export {
  GlissandoModel,
  GlissandoSlider,
  getSliderStyle,
  useGlissandoModel
};
//# sourceMappingURL=glissando-react.module.js.map
