/*! @preserve sweet-scroll v4.0.0 - tsuyoshiwada | MIT License */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.SweetScroll = factory());
}(this, function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    // @link https://github.com/JedWatson/exenv/blob/master/index.js
    var canUseDOM = !!(typeof window !== 'undefined' &&
        window.document &&
        window.document.createElement);
    var canUseHistory = !canUseDOM
        ? false
        : window.history && 'pushState' in window.history && window.location.protocol !== 'file:';
    var canUsePassiveOption = (function () {
        var support = false;
        if (!canUseDOM) {
            return support;
        }
        /* tslint:disable:no-empty */
        try {
            var win = window;
            var opts = Object.defineProperty({}, 'passive', {
                get: function () {
                    support = true;
                },
            });
            win.addEventListener('test', null, opts);
            win.removeEventListener('test', null, opts);
        }
        catch (e) { }
        /* tslint:enable */
        return support;
    })();

    var isString = function (obj) { return typeof obj === 'string'; };
    var isFunction = function (obj) { return typeof obj === 'function'; };
    var isArray = function (obj) { return Array.isArray(obj); };
    var isNumeric = function (obj) { return !isArray(obj) && obj - parseFloat(obj) + 1 >= 0; };
    var hasProp = function (obj, key) { return obj && obj.hasOwnProperty(key); };

    var raf = canUseDOM
        ? window.requestAnimationFrame.bind(window)
        : null;
    var caf = canUseDOM
        ? window.cancelAnimationFrame.bind(window)
        : null;

    /* tslint:disable:curly */
    /* tslint:disable:no-conditional-assignment */
    var cos = Math.cos, sin = Math.sin, pow = Math.pow, sqrt = Math.sqrt, PI = Math.PI;
    var easings = {
        linear: function (p) { return p; },
        easeInQuad: function (_, t, b, c, d) { return c * (t /= d) * t + b; },
        easeOutQuad: function (_, t, b, c, d) { return -c * (t /= d) * (t - 2) + b; },
        easeInOutQuad: function (_, t, b, c, d) {
            return (t /= d / 2) < 1 ? (c / 2) * t * t + b : (-c / 2) * (--t * (t - 2) - 1) + b;
        },
        easeInCubic: function (_, t, b, c, d) { return c * (t /= d) * t * t + b; },
        easeOutCubic: function (_, t, b, c, d) { return c * ((t = t / d - 1) * t * t + 1) + b; },
        easeInOutCubic: function (_, t, b, c, d) {
            return (t /= d / 2) < 1 ? (c / 2) * t * t * t + b : (c / 2) * ((t -= 2) * t * t + 2) + b;
        },
        easeInQuart: function (_, t, b, c, d) { return c * (t /= d) * t * t * t + b; },
        easeOutQuart: function (_, t, b, c, d) { return -c * ((t = t / d - 1) * t * t * t - 1) + b; },
        easeInOutQuart: function (_, t, b, c, d) {
            return (t /= d / 2) < 1 ? (c / 2) * t * t * t * t + b : (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
        },
        easeInQuint: function (_, t, b, c, d) { return c * (t /= d) * t * t * t * t + b; },
        easeOutQuint: function (_, t, b, c, d) { return c * ((t = t / d - 1) * t * t * t * t + 1) + b; },
        easeInOutQuint: function (_, t, b, c, d) {
            return (t /= d / 2) < 1
                ? (c / 2) * t * t * t * t * t + b
                : (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
        },
        easeInSine: function (_, t, b, c, d) { return -c * cos((t / d) * (PI / 2)) + c + b; },
        easeOutSine: function (_, t, b, c, d) { return c * sin((t / d) * (PI / 2)) + b; },
        easeInOutSine: function (_, t, b, c, d) { return (-c / 2) * (cos((PI * t) / d) - 1) + b; },
        easeInExpo: function (_, t, b, c, d) { return (t === 0 ? b : c * pow(2, 10 * (t / d - 1)) + b); },
        easeOutExpo: function (_, t, b, c, d) { return (t === d ? b + c : c * (-pow(2, (-10 * t) / d) + 1) + b); },
        easeInOutExpo: function (_, t, b, c, d) {
            if (t === 0)
                return b;
            if (t === d)
                return b + c;
            if ((t /= d / 2) < 1)
                return (c / 2) * pow(2, 10 * (t - 1)) + b;
            return (c / 2) * (-pow(2, -10 * --t) + 2) + b;
        },
        easeInCirc: function (_, t, b, c, d) { return -c * (sqrt(1 - (t /= d) * t) - 1) + b; },
        easeOutCirc: function (_, t, b, c, d) { return c * sqrt(1 - (t = t / d - 1) * t) + b; },
        easeInOutCirc: function (_, t, b, c, d) {
            return (t /= d / 2) < 1
                ? (-c / 2) * (sqrt(1 - t * t) - 1) + b
                : (c / 2) * (sqrt(1 - (t -= 2) * t) + 1) + b;
        },
    };

    var $$ = function (selector) {
        return Array.prototype.slice.call((!selector ? [] : document.querySelectorAll(selector)));
    };
    var $ = function (selector) { return $$(selector).shift() || null; };
    var isElement = function (obj) { return obj instanceof Element; };
    var isWindow = function ($el) { return $el === window; };
    var isRootContainer = function ($el) {
        return $el === document.documentElement || $el === document.body;
    };
    var matches = function ($el, selector) {
        if (isElement(selector)) {
            return $el === selector;
        }
        var results = $$(selector);
        var i = results.length;
        // tslint:disable-next-line no-empty
        while (--i >= 0 && results[i] !== $el) { }
        return i > -1;
    };

    var getHeight = function ($el) {
        return Math.max($el.scrollHeight, $el.clientHeight, $el.offsetHeight);
    };
    var getWidth = function ($el) {
        return Math.max($el.scrollWidth, $el.clientWidth, $el.offsetWidth);
    };
    var getSize = function ($el) { return ({
        width: getWidth($el),
        height: getHeight($el),
    }); };
    var getViewportAndElementSizes = function ($el) {
        var isRoot = isWindow($el) || isRootContainer($el);
        return {
            viewport: {
                width: isRoot
                    ? Math.min(window.innerWidth, document.documentElement.clientWidth)
                    : $el.clientWidth,
                height: isRoot ? window.innerHeight : $el.clientHeight,
            },
            size: isRoot
                ? {
                    width: Math.max(getWidth(document.body), getWidth(document.documentElement)),
                    height: Math.max(getHeight(document.body), getHeight(document.documentElement)),
                }
                : getSize($el),
        };
    };

    var directionMethodMap = {
        y: 'scrollTop',
        x: 'scrollLeft',
    };
    var directionPropMap = {
        y: 'pageYOffset',
        x: 'pageXOffset',
    };
    var getScroll = function ($el, direction) {
        return isWindow($el) ? $el[directionPropMap[direction]] : $el[directionMethodMap[direction]];
    };
    var setScroll = function ($el, offset, direction) {
        if (isWindow($el)) {
            var top_1 = direction === 'y';
            $el.scrollTo(!top_1 ? offset : $el.pageXOffset, top_1 ? offset : $el.pageYOffset);
        }
        else {
            $el[directionMethodMap[direction]] = offset;
        }
    };
    var getOffset = function ($el, $context) {
        var rect = $el.getBoundingClientRect();
        if (rect.width || rect.height) {
            var scroll_1 = { top: 0, left: 0 };
            var $ctx = void 0;
            if (isWindow($context) || isRootContainer($context)) {
                $ctx = document.documentElement;
                scroll_1.top = window[directionPropMap.y];
                scroll_1.left = window[directionPropMap.x];
            }
            else {
                $ctx = $context;
                var cRect = $ctx.getBoundingClientRect();
                scroll_1.top = cRect.top * -1 + $ctx[directionMethodMap.y];
                scroll_1.left = cRect.left * -1 + $ctx[directionMethodMap.x];
            }
            return {
                top: rect.top + scroll_1.top - $ctx.clientTop,
                left: rect.left + scroll_1.left - $ctx.clientLeft,
            };
        }
        return rect;
    };

    var wheelEventName = (function () {
        if (!canUseDOM) {
            return 'wheel';
        }
        return 'onwheel' in document ? 'wheel' : 'mousewheel';
    })();
    var eventName = function (name) { return (name === 'wheel' ? wheelEventName : name); };
    var apply = function ($el, method, event, listener, passive) {
        event.split(' ').forEach(function (name) {
            $el[method](eventName(name), listener, canUsePassiveOption ? { passive: passive } : false);
        });
    };
    var addEvent = function ($el, event, listener, passive) { return apply($el, 'addEventListener', event, listener, passive); };
    var removeEvent = function ($el, event, listener, passive) { return apply($el, 'removeEventListener', event, listener, passive); };

    var reRelativeToken = /^(\+|-)=(\d+(?:\.\d+)?)$/;
    var parseCoordinate = function (coordinate, enableVertical) {
        var res = { top: 0, left: 0, relative: false };
        // Object ({ top: {n}, left: {n} })
        if (hasProp(coordinate, 'top') || hasProp(coordinate, 'left')) {
            res = __assign({}, res, coordinate);
            // Array ([{n}, [{n}])
        }
        else if (isArray(coordinate)) {
            if (coordinate.length > 1) {
                res.top = coordinate[0];
                res.left = coordinate[1];
            }
            else if (coordinate.length === 1) {
                res.top = enableVertical ? coordinate[0] : 0;
                res.left = !enableVertical ? coordinate[0] : 0;
            }
            else {
                return null;
            }
            // Number
        }
        else if (isNumeric(coordinate)) {
            if (enableVertical) {
                res.top = coordinate;
            }
            else {
                res.left = coordinate;
            }
            // String ('+={n}', '-={n}')
        }
        else if (isString(coordinate)) {
            var m = coordinate.trim().match(reRelativeToken);
            if (!m) {
                return null;
            }
            var op = m[1];
            var val = parseInt(m[2], 10);
            if (op === '+') {
                res.top = enableVertical ? val : 0;
                res.left = !enableVertical ? val : 0;
            }
            else {
                res.top = enableVertical ? -val : 0;
                res.left = !enableVertical ? -val : 0;
            }
            res.relative = true;
        }
        else {
            return null;
        }
        return res;
    };

    var defaultOptions = {
        trigger: '[data-scroll]',
        header: '[data-scroll-header]',
        duration: 1000,
        easing: 'easeOutQuint',
        offset: 0,
        vertical: true,
        horizontal: false,
        cancellable: true,
        updateURL: false,
        preventDefault: true,
        stopPropagation: true,
        // Callbacks
        before: null,
        after: null,
        cancel: null,
        complete: null,
        step: null,
    };

    var CONTAINER_CLICK_EVENT = 'click';
    var CONTAINER_STOP_EVENT = 'wheel touchstart touchmove';
    var SweetScroll = /** @class */ (function () {
        /**
         * Constructor
         */
        function SweetScroll(options, container) {
            var _this = this;
            this.$el = null;
            this.ctx = {
                $trigger: null,
                opts: null,
                progress: false,
                pos: null,
                startPos: null,
                easing: null,
                start: 0,
                id: 0,
                cancel: false,
                hash: null,
            };
            /**
             * Handle each frame of the animation.
             */
            this.loop = function (time) {
                var _a = _this, $el = _a.$el, ctx = _a.ctx;
                if (!ctx.start) {
                    ctx.start = time;
                }
                if (!ctx.progress || !$el) {
                    _this.stop();
                    return;
                }
                var options = ctx.opts;
                var offset = ctx.pos;
                var start = ctx.start;
                var startOffset = ctx.startPos;
                var easing = ctx.easing;
                var duration = options.duration;
                var directionMap = { top: 'y', left: 'x' };
                var timeElapsed = time - start;
                var t = Math.min(1, Math.max(timeElapsed / duration, 0));
                Object.keys(offset).forEach(function (key) {
                    var value = offset[key];
                    var initial = startOffset[key];
                    var delta = value - initial;
                    if (delta !== 0) {
                        var val = easing(t, duration * t, 0, 1, duration);
                        setScroll($el, Math.round(initial + delta * val), directionMap[key]);
                    }
                });
                if (timeElapsed <= duration) {
                    _this.hook(options, 'step', t);
                    ctx.id = SweetScroll.raf(_this.loop);
                }
                else {
                    _this.stop(true);
                }
            };
            /**
             * Handling of container click event.
             */
            this.handleClick = function (e) {
                var opts = _this.opts;
                var $el = e.target;
                for (; $el && $el !== document; $el = $el.parentNode) {
                    if (!matches($el, opts.trigger)) {
                        continue;
                    }
                    var dataOptions = JSON.parse($el.getAttribute('data-scroll-options') || '{}');
                    var data = $el.getAttribute('data-scroll');
                    var to = data || $el.getAttribute('href');
                    var options = __assign({}, opts, dataOptions);
                    var preventDefault = options.preventDefault, stopPropagation = options.stopPropagation, vertical = options.vertical, horizontal = options.horizontal;
                    if (preventDefault) {
                        e.preventDefault();
                    }
                    if (stopPropagation) {
                        e.stopPropagation();
                    }
                    // Passes the trigger element to callback
                    _this.ctx.$trigger = $el;
                    if (horizontal && vertical) {
                        _this.to(to, options);
                    }
                    else if (vertical) {
                        _this.toTop(to, options);
                    }
                    else if (horizontal) {
                        _this.toLeft(to, options);
                    }
                    break;
                }
            };
            /**
             * Handling of container stop events.
             */
            this.handleStop = function (e) {
                var ctx = _this.ctx;
                var opts = ctx.opts;
                if (opts && opts.cancellable) {
                    ctx.cancel = true;
                    _this.stop();
                }
                else {
                    e.preventDefault();
                }
            };
            this.opts = __assign({}, defaultOptions, (options || {}));
            var $container = null;
            if (canUseDOM) {
                if (typeof container === 'string') {
                    $container = $(container);
                }
                else if (container != null) {
                    $container = container;
                }
                else {
                    $container = window;
                }
            }
            this.$el = $container;
            if ($container) {
                this.bind(true, false);
            }
        }
        /**
         * SweetScroll instance factory.
         */
        SweetScroll.create = function (options, container) {
            return new SweetScroll(options, container);
        };
        /**
         * Scroll animation to the specified position.
         */
        SweetScroll.prototype.to = function (distance, options) {
            if (!canUseDOM) {
                return;
            }
            var _a = this, $el = _a.$el, ctx = _a.ctx, currentOptions = _a.opts;
            var $trigger = ctx.$trigger;
            var opts = __assign({}, currentOptions, (options || {}));
            var optOffset = opts.offset, vertical = opts.vertical, horizontal = opts.horizontal;
            var $header = isElement(opts.header) ? opts.header : $(opts.header);
            var reg = /^#/;
            var hash = isString(distance) && reg.test(distance) ? distance : null;
            ctx.opts = opts; // Temporary options
            ctx.cancel = false; // Disable the call flag of `cancel`
            ctx.hash = hash;
            // Stop current animation
            this.stop();
            // Does not move if the container is not found
            if (!$el) {
                return;
            }
            // Get scroll offset
            var offset = parseCoordinate(optOffset, vertical);
            var coordinate = parseCoordinate(distance, vertical);
            var scroll = { top: 0, left: 0 };
            if (coordinate) {
                if (coordinate.relative) {
                    var current = getScroll($el, vertical ? 'y' : 'x');
                    scroll.top = vertical ? current + coordinate.top : coordinate.top;
                    scroll.left = !vertical ? current + coordinate.left : coordinate.left;
                }
                else {
                    scroll = coordinate;
                }
            }
            else if (isString(distance) && distance !== '#') {
                var $target = $(distance);
                if (!$target) {
                    return;
                }
                scroll = getOffset($target, $el);
            }
            if (offset) {
                scroll.top += offset.top;
                scroll.left += offset.left;
            }
            if ($header) {
                scroll.top = Math.max(0, scroll.top - getSize($header).height);
            }
            // Normalize scroll offset
            var _b = getViewportAndElementSizes($el), viewport = _b.viewport, size = _b.size;
            scroll.top = vertical
                ? Math.max(0, Math.min(size.height - viewport.height, scroll.top))
                : getScroll($el, 'y');
            scroll.left = horizontal
                ? Math.max(0, Math.min(size.width - viewport.width, scroll.left))
                : getScroll($el, 'x');
            // Call `before`
            // Stop scrolling when it returns false
            if (this.hook(opts, 'before', scroll, $trigger) === false) {
                ctx.opts = null;
                return;
            }
            // Set offset
            ctx.pos = scroll;
            // Run animation!!
            this.start(opts);
            // Bind stop events
            this.bind(false, true);
        };
        /**
         * Scroll animation to specified left position.
         */
        SweetScroll.prototype.toTop = function (distance, options) {
            this.to(distance, __assign({}, (options || {}), { vertical: true, horizontal: false }));
        };
        /**
         * Scroll animation to specified top position.
         */
        SweetScroll.prototype.toLeft = function (distance, options) {
            this.to(distance, __assign({}, (options || {}), { vertical: false, horizontal: true }));
        };
        /**
         * Scroll animation to specified element.
         */
        SweetScroll.prototype.toElement = function ($element, options) {
            var $el = this.$el;
            if (!canUseDOM || !$el) {
                return;
            }
            this.to(getOffset($element, $el), options || {});
        };
        /**
         * Stop the current scroll animation.
         */
        SweetScroll.prototype.stop = function (gotoEnd) {
            if (gotoEnd === void 0) { gotoEnd = false; }
            var _a = this, $el = _a.$el, ctx = _a.ctx;
            var pos = ctx.pos;
            if (!$el || !ctx.progress) {
                return;
            }
            SweetScroll.caf(ctx.id);
            ctx.progress = false;
            ctx.start = 0;
            ctx.id = 0;
            if (gotoEnd && pos) {
                setScroll($el, pos.left, 'x');
                setScroll($el, pos.top, 'y');
            }
            this.complete();
        };
        /**
         * Update options.
         */
        SweetScroll.prototype.update = function (options) {
            if (this.$el) {
                var opts = __assign({}, this.opts, options);
                this.stop();
                this.unbind(true, true);
                this.opts = opts;
                this.bind(true, false);
            }
        };
        /**
         * Destroy instance.
         */
        SweetScroll.prototype.destroy = function () {
            if (this.$el) {
                this.stop();
                this.unbind(true, true);
                this.$el = null;
            }
        };
        /**
         * Callback methods.
         */
        /* tslint:disable:no-empty */
        SweetScroll.prototype.onBefore = function (_, __) {
            return true;
        };
        SweetScroll.prototype.onStep = function (_) { };
        SweetScroll.prototype.onAfter = function (_, __) { };
        SweetScroll.prototype.onCancel = function () { };
        SweetScroll.prototype.onComplete = function (_) { };
        /* tslint:enable */
        /**
         * Start scrolling animation.
         */
        SweetScroll.prototype.start = function (opts) {
            var ctx = this.ctx;
            ctx.opts = opts;
            ctx.progress = true;
            ctx.easing = isFunction(opts.easing)
                ? opts.easing
                : easings[opts.easing];
            // Update start offset.
            var $container = this.$el;
            var start = {
                top: getScroll($container, 'y'),
                left: getScroll($container, 'x'),
            };
            ctx.startPos = start;
            // Loop
            ctx.id = SweetScroll.raf(this.loop);
        };
        /**
         * Handle the completion of scrolling animation.
         */
        SweetScroll.prototype.complete = function () {
            var _a = this, $el = _a.$el, ctx = _a.ctx;
            var hash = ctx.hash, cancel = ctx.cancel, opts = ctx.opts, pos = ctx.pos, $trigger = ctx.$trigger;
            if (!$el || !opts) {
                return;
            }
            if (hash != null && hash !== window.location.hash) {
                var updateURL = opts.updateURL;
                if (canUseDOM && canUseHistory && updateURL !== false) {
                    window.history[updateURL === 'replace' ? 'replaceState' : 'pushState'](null, '', hash);
                }
            }
            this.unbind(false, true);
            ctx.opts = null;
            ctx.$trigger = null;
            if (cancel) {
                this.hook(opts, 'cancel');
            }
            else {
                this.hook(opts, 'after', pos, $trigger);
            }
            this.hook(opts, 'complete', cancel);
        };
        /**
         * Callback function and method call.
         */
        SweetScroll.prototype.hook = function (options, type) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var _a;
            var callback = options[type];
            var callbackResult;
            var methodResult;
            // callback
            if (isFunction(callback)) {
                callbackResult = callback.apply(this, args.concat([this]));
            }
            // method
            methodResult = (_a = this)["on" + (type[0].toUpperCase() + type.slice(1))].apply(_a, args);
            return callbackResult !== undefined ? callbackResult : methodResult;
        };
        /**
         * Bind events of container element.
         */
        SweetScroll.prototype.bind = function (click, stop) {
            var _a = this, $el = _a.$el, opts = _a.ctx.opts;
            if ($el) {
                if (click) {
                    addEvent($el, CONTAINER_CLICK_EVENT, this.handleClick, false);
                }
                if (stop) {
                    addEvent($el, CONTAINER_STOP_EVENT, this.handleStop, opts ? opts.cancellable : true);
                }
            }
        };
        /**
         * Unbind events of container element.
         */
        SweetScroll.prototype.unbind = function (click, stop) {
            var _a = this, $el = _a.$el, opts = _a.ctx.opts;
            if ($el) {
                if (click) {
                    removeEvent($el, CONTAINER_CLICK_EVENT, this.handleClick, false);
                }
                if (stop) {
                    removeEvent($el, CONTAINER_STOP_EVENT, this.handleStop, opts ? opts.cancellable : true);
                }
            }
        };
        /**
         * You can set Polyfill (or Ponyfill) for browsers that do not support requestAnimationFrame.
         */
        SweetScroll.raf = raf;
        SweetScroll.caf = caf;
        return SweetScroll;
    }());

    return SweetScroll;

}));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzd2VldC1zY3JvbGwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohIEBwcmVzZXJ2ZSBzd2VldC1zY3JvbGwgdjQuMC4wIC0gdHN1eW9zaGl3YWRhIHwgTUlUIExpY2Vuc2UgKi9cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gICAgKGdsb2JhbCA9IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwuU3dlZXRTY3JvbGwgPSBmYWN0b3J5KCkpO1xufSh0aGlzLCBmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICAgIC8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICAgIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gICAgTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuICAgIFRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcbiAgICBLSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXG4gICAgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcbiAgICBNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxuXG4gICAgU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXG4gICAgYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cbiAgICB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcbiAgICAgICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgLy8gQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL0plZFdhdHNvbi9leGVudi9ibG9iL21hc3Rlci9pbmRleC5qc1xuICAgIHZhciBjYW5Vc2VET00gPSAhISh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB3aW5kb3cuZG9jdW1lbnQgJiZcbiAgICAgICAgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuICAgIHZhciBjYW5Vc2VIaXN0b3J5ID0gIWNhblVzZURPTVxuICAgICAgICA/IGZhbHNlXG4gICAgICAgIDogd2luZG93Lmhpc3RvcnkgJiYgJ3B1c2hTdGF0ZScgaW4gd2luZG93Lmhpc3RvcnkgJiYgd2luZG93LmxvY2F0aW9uLnByb3RvY29sICE9PSAnZmlsZTonO1xuICAgIHZhciBjYW5Vc2VQYXNzaXZlT3B0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN1cHBvcnQgPSBmYWxzZTtcbiAgICAgICAgaWYgKCFjYW5Vc2VET00pIHtcbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0O1xuICAgICAgICB9XG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlOm5vLWVtcHR5ICovXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgd2luID0gd2luZG93O1xuICAgICAgICAgICAgdmFyIG9wdHMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdwYXNzaXZlJywge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB3aW4uYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG51bGwsIG9wdHMpO1xuICAgICAgICAgICAgd2luLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCBvcHRzKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgIC8qIHRzbGludDplbmFibGUgKi9cbiAgICAgICAgcmV0dXJuIHN1cHBvcnQ7XG4gICAgfSkoKTtcblxuICAgIHZhciBpc1N0cmluZyA9IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdzdHJpbmcnOyB9O1xuICAgIHZhciBpc0Z1bmN0aW9uID0gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJzsgfTtcbiAgICB2YXIgaXNBcnJheSA9IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIEFycmF5LmlzQXJyYXkob2JqKTsgfTtcbiAgICB2YXIgaXNOdW1lcmljID0gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gIWlzQXJyYXkob2JqKSAmJiBvYmogLSBwYXJzZUZsb2F0KG9iaikgKyAxID49IDA7IH07XG4gICAgdmFyIGhhc1Byb3AgPSBmdW5jdGlvbiAob2JqLCBrZXkpIHsgcmV0dXJuIG9iaiAmJiBvYmouaGFzT3duUHJvcGVydHkoa2V5KTsgfTtcblxuICAgIHZhciByYWYgPSBjYW5Vc2VET01cbiAgICAgICAgPyB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lLmJpbmQod2luZG93KVxuICAgICAgICA6IG51bGw7XG4gICAgdmFyIGNhZiA9IGNhblVzZURPTVxuICAgICAgICA/IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZS5iaW5kKHdpbmRvdylcbiAgICAgICAgOiBudWxsO1xuXG4gICAgLyogdHNsaW50OmRpc2FibGU6Y3VybHkgKi9cbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby1jb25kaXRpb25hbC1hc3NpZ25tZW50ICovXG4gICAgdmFyIGNvcyA9IE1hdGguY29zLCBzaW4gPSBNYXRoLnNpbiwgcG93ID0gTWF0aC5wb3csIHNxcnQgPSBNYXRoLnNxcnQsIFBJID0gTWF0aC5QSTtcbiAgICB2YXIgZWFzaW5ncyA9IHtcbiAgICAgICAgbGluZWFyOiBmdW5jdGlvbiAocCkgeyByZXR1cm4gcDsgfSxcbiAgICAgICAgZWFzZUluUXVhZDogZnVuY3Rpb24gKF8sIHQsIGIsIGMsIGQpIHsgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKyBiOyB9LFxuICAgICAgICBlYXNlT3V0UXVhZDogZnVuY3Rpb24gKF8sIHQsIGIsIGMsIGQpIHsgcmV0dXJuIC1jICogKHQgLz0gZCkgKiAodCAtIDIpICsgYjsgfSxcbiAgICAgICAgZWFzZUluT3V0UXVhZDogZnVuY3Rpb24gKF8sIHQsIGIsIGMsIGQpIHtcbiAgICAgICAgICAgIHJldHVybiAodCAvPSBkIC8gMikgPCAxID8gKGMgLyAyKSAqIHQgKiB0ICsgYiA6ICgtYyAvIDIpICogKC0tdCAqICh0IC0gMikgLSAxKSArIGI7XG4gICAgICAgIH0sXG4gICAgICAgIGVhc2VJbkN1YmljOiBmdW5jdGlvbiAoXywgdCwgYiwgYywgZCkgeyByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKyBiOyB9LFxuICAgICAgICBlYXNlT3V0Q3ViaWM6IGZ1bmN0aW9uIChfLCB0LCBiLCBjLCBkKSB7IHJldHVybiBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiB0ICsgMSkgKyBiOyB9LFxuICAgICAgICBlYXNlSW5PdXRDdWJpYzogZnVuY3Rpb24gKF8sIHQsIGIsIGMsIGQpIHtcbiAgICAgICAgICAgIHJldHVybiAodCAvPSBkIC8gMikgPCAxID8gKGMgLyAyKSAqIHQgKiB0ICogdCArIGIgOiAoYyAvIDIpICogKCh0IC09IDIpICogdCAqIHQgKyAyKSArIGI7XG4gICAgICAgIH0sXG4gICAgICAgIGVhc2VJblF1YXJ0OiBmdW5jdGlvbiAoXywgdCwgYiwgYywgZCkgeyByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKiB0ICsgYjsgfSxcbiAgICAgICAgZWFzZU91dFF1YXJ0OiBmdW5jdGlvbiAoXywgdCwgYiwgYywgZCkgeyByZXR1cm4gLWMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKiB0IC0gMSkgKyBiOyB9LFxuICAgICAgICBlYXNlSW5PdXRRdWFydDogZnVuY3Rpb24gKF8sIHQsIGIsIGMsIGQpIHtcbiAgICAgICAgICAgIHJldHVybiAodCAvPSBkIC8gMikgPCAxID8gKGMgLyAyKSAqIHQgKiB0ICogdCAqIHQgKyBiIDogKC1jIC8gMikgKiAoKHQgLT0gMikgKiB0ICogdCAqIHQgLSAyKSArIGI7XG4gICAgICAgIH0sXG4gICAgICAgIGVhc2VJblF1aW50OiBmdW5jdGlvbiAoXywgdCwgYiwgYywgZCkgeyByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKiB0ICogdCArIGI7IH0sXG4gICAgICAgIGVhc2VPdXRRdWludDogZnVuY3Rpb24gKF8sIHQsIGIsIGMsIGQpIHsgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKiB0ICogdCArIDEpICsgYjsgfSxcbiAgICAgICAgZWFzZUluT3V0UXVpbnQ6IGZ1bmN0aW9uIChfLCB0LCBiLCBjLCBkKSB7XG4gICAgICAgICAgICByZXR1cm4gKHQgLz0gZCAvIDIpIDwgMVxuICAgICAgICAgICAgICAgID8gKGMgLyAyKSAqIHQgKiB0ICogdCAqIHQgKiB0ICsgYlxuICAgICAgICAgICAgICAgIDogKGMgLyAyKSAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAqIHQgKyAyKSArIGI7XG4gICAgICAgIH0sXG4gICAgICAgIGVhc2VJblNpbmU6IGZ1bmN0aW9uIChfLCB0LCBiLCBjLCBkKSB7IHJldHVybiAtYyAqIGNvcygodCAvIGQpICogKFBJIC8gMikpICsgYyArIGI7IH0sXG4gICAgICAgIGVhc2VPdXRTaW5lOiBmdW5jdGlvbiAoXywgdCwgYiwgYywgZCkgeyByZXR1cm4gYyAqIHNpbigodCAvIGQpICogKFBJIC8gMikpICsgYjsgfSxcbiAgICAgICAgZWFzZUluT3V0U2luZTogZnVuY3Rpb24gKF8sIHQsIGIsIGMsIGQpIHsgcmV0dXJuICgtYyAvIDIpICogKGNvcygoUEkgKiB0KSAvIGQpIC0gMSkgKyBiOyB9LFxuICAgICAgICBlYXNlSW5FeHBvOiBmdW5jdGlvbiAoXywgdCwgYiwgYywgZCkgeyByZXR1cm4gKHQgPT09IDAgPyBiIDogYyAqIHBvdygyLCAxMCAqICh0IC8gZCAtIDEpKSArIGIpOyB9LFxuICAgICAgICBlYXNlT3V0RXhwbzogZnVuY3Rpb24gKF8sIHQsIGIsIGMsIGQpIHsgcmV0dXJuICh0ID09PSBkID8gYiArIGMgOiBjICogKC1wb3coMiwgKC0xMCAqIHQpIC8gZCkgKyAxKSArIGIpOyB9LFxuICAgICAgICBlYXNlSW5PdXRFeHBvOiBmdW5jdGlvbiAoXywgdCwgYiwgYywgZCkge1xuICAgICAgICAgICAgaWYgKHQgPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIGI7XG4gICAgICAgICAgICBpZiAodCA9PT0gZClcbiAgICAgICAgICAgICAgICByZXR1cm4gYiArIGM7XG4gICAgICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gKGMgLyAyKSAqIHBvdygyLCAxMCAqICh0IC0gMSkpICsgYjtcbiAgICAgICAgICAgIHJldHVybiAoYyAvIDIpICogKC1wb3coMiwgLTEwICogLS10KSArIDIpICsgYjtcbiAgICAgICAgfSxcbiAgICAgICAgZWFzZUluQ2lyYzogZnVuY3Rpb24gKF8sIHQsIGIsIGMsIGQpIHsgcmV0dXJuIC1jICogKHNxcnQoMSAtICh0IC89IGQpICogdCkgLSAxKSArIGI7IH0sXG4gICAgICAgIGVhc2VPdXRDaXJjOiBmdW5jdGlvbiAoXywgdCwgYiwgYywgZCkgeyByZXR1cm4gYyAqIHNxcnQoMSAtICh0ID0gdCAvIGQgLSAxKSAqIHQpICsgYjsgfSxcbiAgICAgICAgZWFzZUluT3V0Q2lyYzogZnVuY3Rpb24gKF8sIHQsIGIsIGMsIGQpIHtcbiAgICAgICAgICAgIHJldHVybiAodCAvPSBkIC8gMikgPCAxXG4gICAgICAgICAgICAgICAgPyAoLWMgLyAyKSAqIChzcXJ0KDEgLSB0ICogdCkgLSAxKSArIGJcbiAgICAgICAgICAgICAgICA6IChjIC8gMikgKiAoc3FydCgxIC0gKHQgLT0gMikgKiB0KSArIDEpICsgYjtcbiAgICAgICAgfSxcbiAgICB9O1xuXG4gICAgdmFyICQkID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCgoIXNlbGVjdG9yID8gW10gOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSkpO1xuICAgIH07XG4gICAgdmFyICQgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHsgcmV0dXJuICQkKHNlbGVjdG9yKS5zaGlmdCgpIHx8IG51bGw7IH07XG4gICAgdmFyIGlzRWxlbWVudCA9IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEVsZW1lbnQ7IH07XG4gICAgdmFyIGlzV2luZG93ID0gZnVuY3Rpb24gKCRlbCkgeyByZXR1cm4gJGVsID09PSB3aW5kb3c7IH07XG4gICAgdmFyIGlzUm9vdENvbnRhaW5lciA9IGZ1bmN0aW9uICgkZWwpIHtcbiAgICAgICAgcmV0dXJuICRlbCA9PT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8ICRlbCA9PT0gZG9jdW1lbnQuYm9keTtcbiAgICB9O1xuICAgIHZhciBtYXRjaGVzID0gZnVuY3Rpb24gKCRlbCwgc2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKGlzRWxlbWVudChzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIHJldHVybiAkZWwgPT09IHNlbGVjdG9yO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHRzID0gJCQoc2VsZWN0b3IpO1xuICAgICAgICB2YXIgaSA9IHJlc3VsdHMubGVuZ3RoO1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgICAgICAgd2hpbGUgKC0taSA+PSAwICYmIHJlc3VsdHNbaV0gIT09ICRlbCkgeyB9XG4gICAgICAgIHJldHVybiBpID4gLTE7XG4gICAgfTtcblxuICAgIHZhciBnZXRIZWlnaHQgPSBmdW5jdGlvbiAoJGVsKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCgkZWwuc2Nyb2xsSGVpZ2h0LCAkZWwuY2xpZW50SGVpZ2h0LCAkZWwub2Zmc2V0SGVpZ2h0KTtcbiAgICB9O1xuICAgIHZhciBnZXRXaWR0aCA9IGZ1bmN0aW9uICgkZWwpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KCRlbC5zY3JvbGxXaWR0aCwgJGVsLmNsaWVudFdpZHRoLCAkZWwub2Zmc2V0V2lkdGgpO1xuICAgIH07XG4gICAgdmFyIGdldFNpemUgPSBmdW5jdGlvbiAoJGVsKSB7IHJldHVybiAoe1xuICAgICAgICB3aWR0aDogZ2V0V2lkdGgoJGVsKSxcbiAgICAgICAgaGVpZ2h0OiBnZXRIZWlnaHQoJGVsKSxcbiAgICB9KTsgfTtcbiAgICB2YXIgZ2V0Vmlld3BvcnRBbmRFbGVtZW50U2l6ZXMgPSBmdW5jdGlvbiAoJGVsKSB7XG4gICAgICAgIHZhciBpc1Jvb3QgPSBpc1dpbmRvdygkZWwpIHx8IGlzUm9vdENvbnRhaW5lcigkZWwpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmlld3BvcnQ6IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogaXNSb290XG4gICAgICAgICAgICAgICAgICAgID8gTWF0aC5taW4od2luZG93LmlubmVyV2lkdGgsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aClcbiAgICAgICAgICAgICAgICAgICAgOiAkZWwuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBpc1Jvb3QgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiAkZWwuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNpemU6IGlzUm9vdFxuICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogTWF0aC5tYXgoZ2V0V2lkdGgoZG9jdW1lbnQuYm9keSksIGdldFdpZHRoKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkpLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IE1hdGgubWF4KGdldEhlaWdodChkb2N1bWVudC5ib2R5KSwgZ2V0SGVpZ2h0KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkpLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA6IGdldFNpemUoJGVsKSxcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIGRpcmVjdGlvbk1ldGhvZE1hcCA9IHtcbiAgICAgICAgeTogJ3Njcm9sbFRvcCcsXG4gICAgICAgIHg6ICdzY3JvbGxMZWZ0JyxcbiAgICB9O1xuICAgIHZhciBkaXJlY3Rpb25Qcm9wTWFwID0ge1xuICAgICAgICB5OiAncGFnZVlPZmZzZXQnLFxuICAgICAgICB4OiAncGFnZVhPZmZzZXQnLFxuICAgIH07XG4gICAgdmFyIGdldFNjcm9sbCA9IGZ1bmN0aW9uICgkZWwsIGRpcmVjdGlvbikge1xuICAgICAgICByZXR1cm4gaXNXaW5kb3coJGVsKSA/ICRlbFtkaXJlY3Rpb25Qcm9wTWFwW2RpcmVjdGlvbl1dIDogJGVsW2RpcmVjdGlvbk1ldGhvZE1hcFtkaXJlY3Rpb25dXTtcbiAgICB9O1xuICAgIHZhciBzZXRTY3JvbGwgPSBmdW5jdGlvbiAoJGVsLCBvZmZzZXQsIGRpcmVjdGlvbikge1xuICAgICAgICBpZiAoaXNXaW5kb3coJGVsKSkge1xuICAgICAgICAgICAgdmFyIHRvcF8xID0gZGlyZWN0aW9uID09PSAneSc7XG4gICAgICAgICAgICAkZWwuc2Nyb2xsVG8oIXRvcF8xID8gb2Zmc2V0IDogJGVsLnBhZ2VYT2Zmc2V0LCB0b3BfMSA/IG9mZnNldCA6ICRlbC5wYWdlWU9mZnNldCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkZWxbZGlyZWN0aW9uTWV0aG9kTWFwW2RpcmVjdGlvbl1dID0gb2Zmc2V0O1xuICAgICAgICB9XG4gICAgfTtcbiAgICB2YXIgZ2V0T2Zmc2V0ID0gZnVuY3Rpb24gKCRlbCwgJGNvbnRleHQpIHtcbiAgICAgICAgdmFyIHJlY3QgPSAkZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGlmIChyZWN0LndpZHRoIHx8IHJlY3QuaGVpZ2h0KSB7XG4gICAgICAgICAgICB2YXIgc2Nyb2xsXzEgPSB7IHRvcDogMCwgbGVmdDogMCB9O1xuICAgICAgICAgICAgdmFyICRjdHggPSB2b2lkIDA7XG4gICAgICAgICAgICBpZiAoaXNXaW5kb3coJGNvbnRleHQpIHx8IGlzUm9vdENvbnRhaW5lcigkY29udGV4dCkpIHtcbiAgICAgICAgICAgICAgICAkY3R4ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgIHNjcm9sbF8xLnRvcCA9IHdpbmRvd1tkaXJlY3Rpb25Qcm9wTWFwLnldO1xuICAgICAgICAgICAgICAgIHNjcm9sbF8xLmxlZnQgPSB3aW5kb3dbZGlyZWN0aW9uUHJvcE1hcC54XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICRjdHggPSAkY29udGV4dDtcbiAgICAgICAgICAgICAgICB2YXIgY1JlY3QgPSAkY3R4LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgIHNjcm9sbF8xLnRvcCA9IGNSZWN0LnRvcCAqIC0xICsgJGN0eFtkaXJlY3Rpb25NZXRob2RNYXAueV07XG4gICAgICAgICAgICAgICAgc2Nyb2xsXzEubGVmdCA9IGNSZWN0LmxlZnQgKiAtMSArICRjdHhbZGlyZWN0aW9uTWV0aG9kTWFwLnhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0b3A6IHJlY3QudG9wICsgc2Nyb2xsXzEudG9wIC0gJGN0eC5jbGllbnRUb3AsXG4gICAgICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgc2Nyb2xsXzEubGVmdCAtICRjdHguY2xpZW50TGVmdCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlY3Q7XG4gICAgfTtcblxuICAgIHZhciB3aGVlbEV2ZW50TmFtZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghY2FuVXNlRE9NKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3doZWVsJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ29ud2hlZWwnIGluIGRvY3VtZW50ID8gJ3doZWVsJyA6ICdtb3VzZXdoZWVsJztcbiAgICB9KSgpO1xuICAgIHZhciBldmVudE5hbWUgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gKG5hbWUgPT09ICd3aGVlbCcgPyB3aGVlbEV2ZW50TmFtZSA6IG5hbWUpOyB9O1xuICAgIHZhciBhcHBseSA9IGZ1bmN0aW9uICgkZWwsIG1ldGhvZCwgZXZlbnQsIGxpc3RlbmVyLCBwYXNzaXZlKSB7XG4gICAgICAgIGV2ZW50LnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgJGVsW21ldGhvZF0oZXZlbnROYW1lKG5hbWUpLCBsaXN0ZW5lciwgY2FuVXNlUGFzc2l2ZU9wdGlvbiA/IHsgcGFzc2l2ZTogcGFzc2l2ZSB9IDogZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBhZGRFdmVudCA9IGZ1bmN0aW9uICgkZWwsIGV2ZW50LCBsaXN0ZW5lciwgcGFzc2l2ZSkgeyByZXR1cm4gYXBwbHkoJGVsLCAnYWRkRXZlbnRMaXN0ZW5lcicsIGV2ZW50LCBsaXN0ZW5lciwgcGFzc2l2ZSk7IH07XG4gICAgdmFyIHJlbW92ZUV2ZW50ID0gZnVuY3Rpb24gKCRlbCwgZXZlbnQsIGxpc3RlbmVyLCBwYXNzaXZlKSB7IHJldHVybiBhcHBseSgkZWwsICdyZW1vdmVFdmVudExpc3RlbmVyJywgZXZlbnQsIGxpc3RlbmVyLCBwYXNzaXZlKTsgfTtcblxuICAgIHZhciByZVJlbGF0aXZlVG9rZW4gPSAvXihcXCt8LSk9KFxcZCsoPzpcXC5cXGQrKT8pJC87XG4gICAgdmFyIHBhcnNlQ29vcmRpbmF0ZSA9IGZ1bmN0aW9uIChjb29yZGluYXRlLCBlbmFibGVWZXJ0aWNhbCkge1xuICAgICAgICB2YXIgcmVzID0geyB0b3A6IDAsIGxlZnQ6IDAsIHJlbGF0aXZlOiBmYWxzZSB9O1xuICAgICAgICAvLyBPYmplY3QgKHsgdG9wOiB7bn0sIGxlZnQ6IHtufSB9KVxuICAgICAgICBpZiAoaGFzUHJvcChjb29yZGluYXRlLCAndG9wJykgfHwgaGFzUHJvcChjb29yZGluYXRlLCAnbGVmdCcpKSB7XG4gICAgICAgICAgICByZXMgPSBfX2Fzc2lnbih7fSwgcmVzLCBjb29yZGluYXRlKTtcbiAgICAgICAgICAgIC8vIEFycmF5IChbe259LCBbe259XSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc0FycmF5KGNvb3JkaW5hdGUpKSB7XG4gICAgICAgICAgICBpZiAoY29vcmRpbmF0ZS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgcmVzLnRvcCA9IGNvb3JkaW5hdGVbMF07XG4gICAgICAgICAgICAgICAgcmVzLmxlZnQgPSBjb29yZGluYXRlWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY29vcmRpbmF0ZS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXMudG9wID0gZW5hYmxlVmVydGljYWwgPyBjb29yZGluYXRlWzBdIDogMDtcbiAgICAgICAgICAgICAgICByZXMubGVmdCA9ICFlbmFibGVWZXJ0aWNhbCA/IGNvb3JkaW5hdGVbMF0gOiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBOdW1iZXJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc051bWVyaWMoY29vcmRpbmF0ZSkpIHtcbiAgICAgICAgICAgIGlmIChlbmFibGVWZXJ0aWNhbCkge1xuICAgICAgICAgICAgICAgIHJlcy50b3AgPSBjb29yZGluYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzLmxlZnQgPSBjb29yZGluYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU3RyaW5nICgnKz17bn0nLCAnLT17bn0nKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzU3RyaW5nKGNvb3JkaW5hdGUpKSB7XG4gICAgICAgICAgICB2YXIgbSA9IGNvb3JkaW5hdGUudHJpbSgpLm1hdGNoKHJlUmVsYXRpdmVUb2tlbik7XG4gICAgICAgICAgICBpZiAoIW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBvcCA9IG1bMV07XG4gICAgICAgICAgICB2YXIgdmFsID0gcGFyc2VJbnQobVsyXSwgMTApO1xuICAgICAgICAgICAgaWYgKG9wID09PSAnKycpIHtcbiAgICAgICAgICAgICAgICByZXMudG9wID0gZW5hYmxlVmVydGljYWwgPyB2YWwgOiAwO1xuICAgICAgICAgICAgICAgIHJlcy5sZWZ0ID0gIWVuYWJsZVZlcnRpY2FsID8gdmFsIDogMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlcy50b3AgPSBlbmFibGVWZXJ0aWNhbCA/IC12YWwgOiAwO1xuICAgICAgICAgICAgICAgIHJlcy5sZWZ0ID0gIWVuYWJsZVZlcnRpY2FsID8gLXZhbCA6IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXMucmVsYXRpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9O1xuXG4gICAgdmFyIGRlZmF1bHRPcHRpb25zID0ge1xuICAgICAgICB0cmlnZ2VyOiAnW2RhdGEtc2Nyb2xsXScsXG4gICAgICAgIGhlYWRlcjogJ1tkYXRhLXNjcm9sbC1oZWFkZXJdJyxcbiAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgIGVhc2luZzogJ2Vhc2VPdXRRdWludCcsXG4gICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgdmVydGljYWw6IHRydWUsXG4gICAgICAgIGhvcml6b250YWw6IGZhbHNlLFxuICAgICAgICBjYW5jZWxsYWJsZTogdHJ1ZSxcbiAgICAgICAgdXBkYXRlVVJMOiBmYWxzZSxcbiAgICAgICAgcHJldmVudERlZmF1bHQ6IHRydWUsXG4gICAgICAgIHN0b3BQcm9wYWdhdGlvbjogdHJ1ZSxcbiAgICAgICAgLy8gQ2FsbGJhY2tzXG4gICAgICAgIGJlZm9yZTogbnVsbCxcbiAgICAgICAgYWZ0ZXI6IG51bGwsXG4gICAgICAgIGNhbmNlbDogbnVsbCxcbiAgICAgICAgY29tcGxldGU6IG51bGwsXG4gICAgICAgIHN0ZXA6IG51bGwsXG4gICAgfTtcblxuICAgIHZhciBDT05UQUlORVJfQ0xJQ0tfRVZFTlQgPSAnY2xpY2snO1xuICAgIHZhciBDT05UQUlORVJfU1RPUF9FVkVOVCA9ICd3aGVlbCB0b3VjaHN0YXJ0IHRvdWNobW92ZSc7XG4gICAgdmFyIFN3ZWV0U2Nyb2xsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29uc3RydWN0b3JcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIFN3ZWV0U2Nyb2xsKG9wdGlvbnMsIGNvbnRhaW5lcikge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuJGVsID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuY3R4ID0ge1xuICAgICAgICAgICAgICAgICR0cmlnZ2VyOiBudWxsLFxuICAgICAgICAgICAgICAgIG9wdHM6IG51bGwsXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHBvczogbnVsbCxcbiAgICAgICAgICAgICAgICBzdGFydFBvczogbnVsbCxcbiAgICAgICAgICAgICAgICBlYXNpbmc6IG51bGwsXG4gICAgICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgICAgICAgICAgaWQ6IDAsXG4gICAgICAgICAgICAgICAgY2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBoYXNoOiBudWxsLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSGFuZGxlIGVhY2ggZnJhbWUgb2YgdGhlIGFuaW1hdGlvbi5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5sb29wID0gZnVuY3Rpb24gKHRpbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2EgPSBfdGhpcywgJGVsID0gX2EuJGVsLCBjdHggPSBfYS5jdHg7XG4gICAgICAgICAgICAgICAgaWYgKCFjdHguc3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4LnN0YXJ0ID0gdGltZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFjdHgucHJvZ3Jlc3MgfHwgISRlbCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBjdHgub3B0cztcbiAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gY3R4LnBvcztcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQgPSBjdHguc3RhcnQ7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0T2Zmc2V0ID0gY3R4LnN0YXJ0UG9zO1xuICAgICAgICAgICAgICAgIHZhciBlYXNpbmcgPSBjdHguZWFzaW5nO1xuICAgICAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb247XG4gICAgICAgICAgICAgICAgdmFyIGRpcmVjdGlvbk1hcCA9IHsgdG9wOiAneScsIGxlZnQ6ICd4JyB9O1xuICAgICAgICAgICAgICAgIHZhciB0aW1lRWxhcHNlZCA9IHRpbWUgLSBzdGFydDtcbiAgICAgICAgICAgICAgICB2YXIgdCA9IE1hdGgubWluKDEsIE1hdGgubWF4KHRpbWVFbGFwc2VkIC8gZHVyYXRpb24sIDApKTtcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhvZmZzZXQpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBvZmZzZXRba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluaXRpYWwgPSBzdGFydE9mZnNldFtrZXldO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGVsdGEgPSB2YWx1ZSAtIGluaXRpYWw7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWx0YSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCA9IGVhc2luZyh0LCBkdXJhdGlvbiAqIHQsIDAsIDEsIGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFNjcm9sbCgkZWwsIE1hdGgucm91bmQoaW5pdGlhbCArIGRlbHRhICogdmFsKSwgZGlyZWN0aW9uTWFwW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHRpbWVFbGFwc2VkIDw9IGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmhvb2sob3B0aW9ucywgJ3N0ZXAnLCB0KTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmlkID0gU3dlZXRTY3JvbGwucmFmKF90aGlzLmxvb3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc3RvcCh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBIYW5kbGluZyBvZiBjb250YWluZXIgY2xpY2sgZXZlbnQuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciBvcHRzID0gX3RoaXMub3B0cztcbiAgICAgICAgICAgICAgICB2YXIgJGVsID0gZS50YXJnZXQ7XG4gICAgICAgICAgICAgICAgZm9yICg7ICRlbCAmJiAkZWwgIT09IGRvY3VtZW50OyAkZWwgPSAkZWwucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW1hdGNoZXMoJGVsLCBvcHRzLnRyaWdnZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YU9wdGlvbnMgPSBKU09OLnBhcnNlKCRlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2Nyb2xsLW9wdGlvbnMnKSB8fCAne30nKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSAkZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXNjcm9sbCcpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG8gPSBkYXRhIHx8ICRlbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBfX2Fzc2lnbih7fSwgb3B0cywgZGF0YU9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJldmVudERlZmF1bHQgPSBvcHRpb25zLnByZXZlbnREZWZhdWx0LCBzdG9wUHJvcGFnYXRpb24gPSBvcHRpb25zLnN0b3BQcm9wYWdhdGlvbiwgdmVydGljYWwgPSBvcHRpb25zLnZlcnRpY2FsLCBob3Jpem9udGFsID0gb3B0aW9ucy5ob3Jpem9udGFsO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RvcFByb3BhZ2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIFBhc3NlcyB0aGUgdHJpZ2dlciBlbGVtZW50IHRvIGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmN0eC4kdHJpZ2dlciA9ICRlbDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhvcml6b250YWwgJiYgdmVydGljYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnRvKHRvLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh2ZXJ0aWNhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudG9Ub3AodG8sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGhvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnRvTGVmdCh0bywgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSGFuZGxpbmcgb2YgY29udGFpbmVyIHN0b3AgZXZlbnRzLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVN0b3AgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciBjdHggPSBfdGhpcy5jdHg7XG4gICAgICAgICAgICAgICAgdmFyIG9wdHMgPSBjdHgub3B0cztcbiAgICAgICAgICAgICAgICBpZiAob3B0cyAmJiBvcHRzLmNhbmNlbGxhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5jYW5jZWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zdG9wKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMub3B0cyA9IF9fYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgKG9wdGlvbnMgfHwge30pKTtcbiAgICAgICAgICAgIHZhciAkY29udGFpbmVyID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChjYW5Vc2VET00pIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgJGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY29udGFpbmVyICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgJGNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRjb250YWluZXIgPSB3aW5kb3c7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kZWwgPSAkY29udGFpbmVyO1xuICAgICAgICAgICAgaWYgKCRjb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmQodHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTd2VldFNjcm9sbCBpbnN0YW5jZSBmYWN0b3J5LlxuICAgICAgICAgKi9cbiAgICAgICAgU3dlZXRTY3JvbGwuY3JlYXRlID0gZnVuY3Rpb24gKG9wdGlvbnMsIGNvbnRhaW5lcikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTd2VldFNjcm9sbChvcHRpb25zLCBjb250YWluZXIpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogU2Nyb2xsIGFuaW1hdGlvbiB0byB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgU3dlZXRTY3JvbGwucHJvdG90eXBlLnRvID0gZnVuY3Rpb24gKGRpc3RhbmNlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoIWNhblVzZURPTSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBfYSA9IHRoaXMsICRlbCA9IF9hLiRlbCwgY3R4ID0gX2EuY3R4LCBjdXJyZW50T3B0aW9ucyA9IF9hLm9wdHM7XG4gICAgICAgICAgICB2YXIgJHRyaWdnZXIgPSBjdHguJHRyaWdnZXI7XG4gICAgICAgICAgICB2YXIgb3B0cyA9IF9fYXNzaWduKHt9LCBjdXJyZW50T3B0aW9ucywgKG9wdGlvbnMgfHwge30pKTtcbiAgICAgICAgICAgIHZhciBvcHRPZmZzZXQgPSBvcHRzLm9mZnNldCwgdmVydGljYWwgPSBvcHRzLnZlcnRpY2FsLCBob3Jpem9udGFsID0gb3B0cy5ob3Jpem9udGFsO1xuICAgICAgICAgICAgdmFyICRoZWFkZXIgPSBpc0VsZW1lbnQob3B0cy5oZWFkZXIpID8gb3B0cy5oZWFkZXIgOiAkKG9wdHMuaGVhZGVyKTtcbiAgICAgICAgICAgIHZhciByZWcgPSAvXiMvO1xuICAgICAgICAgICAgdmFyIGhhc2ggPSBpc1N0cmluZyhkaXN0YW5jZSkgJiYgcmVnLnRlc3QoZGlzdGFuY2UpID8gZGlzdGFuY2UgOiBudWxsO1xuICAgICAgICAgICAgY3R4Lm9wdHMgPSBvcHRzOyAvLyBUZW1wb3Jhcnkgb3B0aW9uc1xuICAgICAgICAgICAgY3R4LmNhbmNlbCA9IGZhbHNlOyAvLyBEaXNhYmxlIHRoZSBjYWxsIGZsYWcgb2YgYGNhbmNlbGBcbiAgICAgICAgICAgIGN0eC5oYXNoID0gaGFzaDtcbiAgICAgICAgICAgIC8vIFN0b3AgY3VycmVudCBhbmltYXRpb25cbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgICAgLy8gRG9lcyBub3QgbW92ZSBpZiB0aGUgY29udGFpbmVyIGlzIG5vdCBmb3VuZFxuICAgICAgICAgICAgaWYgKCEkZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBHZXQgc2Nyb2xsIG9mZnNldFxuICAgICAgICAgICAgdmFyIG9mZnNldCA9IHBhcnNlQ29vcmRpbmF0ZShvcHRPZmZzZXQsIHZlcnRpY2FsKTtcbiAgICAgICAgICAgIHZhciBjb29yZGluYXRlID0gcGFyc2VDb29yZGluYXRlKGRpc3RhbmNlLCB2ZXJ0aWNhbCk7XG4gICAgICAgICAgICB2YXIgc2Nyb2xsID0geyB0b3A6IDAsIGxlZnQ6IDAgfTtcbiAgICAgICAgICAgIGlmIChjb29yZGluYXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvb3JkaW5hdGUucmVsYXRpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSBnZXRTY3JvbGwoJGVsLCB2ZXJ0aWNhbCA/ICd5JyA6ICd4Jyk7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbC50b3AgPSB2ZXJ0aWNhbCA/IGN1cnJlbnQgKyBjb29yZGluYXRlLnRvcCA6IGNvb3JkaW5hdGUudG9wO1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGwubGVmdCA9ICF2ZXJ0aWNhbCA/IGN1cnJlbnQgKyBjb29yZGluYXRlLmxlZnQgOiBjb29yZGluYXRlLmxlZnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPSBjb29yZGluYXRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzU3RyaW5nKGRpc3RhbmNlKSAmJiBkaXN0YW5jZSAhPT0gJyMnKSB7XG4gICAgICAgICAgICAgICAgdmFyICR0YXJnZXQgPSAkKGRpc3RhbmNlKTtcbiAgICAgICAgICAgICAgICBpZiAoISR0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzY3JvbGwgPSBnZXRPZmZzZXQoJHRhcmdldCwgJGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICBzY3JvbGwudG9wICs9IG9mZnNldC50b3A7XG4gICAgICAgICAgICAgICAgc2Nyb2xsLmxlZnQgKz0gb2Zmc2V0LmxlZnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoJGhlYWRlcikge1xuICAgICAgICAgICAgICAgIHNjcm9sbC50b3AgPSBNYXRoLm1heCgwLCBzY3JvbGwudG9wIC0gZ2V0U2l6ZSgkaGVhZGVyKS5oZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTm9ybWFsaXplIHNjcm9sbCBvZmZzZXRcbiAgICAgICAgICAgIHZhciBfYiA9IGdldFZpZXdwb3J0QW5kRWxlbWVudFNpemVzKCRlbCksIHZpZXdwb3J0ID0gX2Iudmlld3BvcnQsIHNpemUgPSBfYi5zaXplO1xuICAgICAgICAgICAgc2Nyb2xsLnRvcCA9IHZlcnRpY2FsXG4gICAgICAgICAgICAgICAgPyBNYXRoLm1heCgwLCBNYXRoLm1pbihzaXplLmhlaWdodCAtIHZpZXdwb3J0LmhlaWdodCwgc2Nyb2xsLnRvcCkpXG4gICAgICAgICAgICAgICAgOiBnZXRTY3JvbGwoJGVsLCAneScpO1xuICAgICAgICAgICAgc2Nyb2xsLmxlZnQgPSBob3Jpem9udGFsXG4gICAgICAgICAgICAgICAgPyBNYXRoLm1heCgwLCBNYXRoLm1pbihzaXplLndpZHRoIC0gdmlld3BvcnQud2lkdGgsIHNjcm9sbC5sZWZ0KSlcbiAgICAgICAgICAgICAgICA6IGdldFNjcm9sbCgkZWwsICd4Jyk7XG4gICAgICAgICAgICAvLyBDYWxsIGBiZWZvcmVgXG4gICAgICAgICAgICAvLyBTdG9wIHNjcm9sbGluZyB3aGVuIGl0IHJldHVybnMgZmFsc2VcbiAgICAgICAgICAgIGlmICh0aGlzLmhvb2sob3B0cywgJ2JlZm9yZScsIHNjcm9sbCwgJHRyaWdnZXIpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGN0eC5vcHRzID0gbnVsbDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTZXQgb2Zmc2V0XG4gICAgICAgICAgICBjdHgucG9zID0gc2Nyb2xsO1xuICAgICAgICAgICAgLy8gUnVuIGFuaW1hdGlvbiEhXG4gICAgICAgICAgICB0aGlzLnN0YXJ0KG9wdHMpO1xuICAgICAgICAgICAgLy8gQmluZCBzdG9wIGV2ZW50c1xuICAgICAgICAgICAgdGhpcy5iaW5kKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNjcm9sbCBhbmltYXRpb24gdG8gc3BlY2lmaWVkIGxlZnQgcG9zaXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICBTd2VldFNjcm9sbC5wcm90b3R5cGUudG9Ub3AgPSBmdW5jdGlvbiAoZGlzdGFuY2UsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMudG8oZGlzdGFuY2UsIF9fYXNzaWduKHt9LCAob3B0aW9ucyB8fCB7fSksIHsgdmVydGljYWw6IHRydWUsIGhvcml6b250YWw6IGZhbHNlIH0pKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNjcm9sbCBhbmltYXRpb24gdG8gc3BlY2lmaWVkIHRvcCBwb3NpdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIFN3ZWV0U2Nyb2xsLnByb3RvdHlwZS50b0xlZnQgPSBmdW5jdGlvbiAoZGlzdGFuY2UsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMudG8oZGlzdGFuY2UsIF9fYXNzaWduKHt9LCAob3B0aW9ucyB8fCB7fSksIHsgdmVydGljYWw6IGZhbHNlLCBob3Jpem9udGFsOiB0cnVlIH0pKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNjcm9sbCBhbmltYXRpb24gdG8gc3BlY2lmaWVkIGVsZW1lbnQuXG4gICAgICAgICAqL1xuICAgICAgICBTd2VldFNjcm9sbC5wcm90b3R5cGUudG9FbGVtZW50ID0gZnVuY3Rpb24gKCRlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgJGVsID0gdGhpcy4kZWw7XG4gICAgICAgICAgICBpZiAoIWNhblVzZURPTSB8fCAhJGVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy50byhnZXRPZmZzZXQoJGVsZW1lbnQsICRlbCksIG9wdGlvbnMgfHwge30pO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcCB0aGUgY3VycmVudCBzY3JvbGwgYW5pbWF0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgU3dlZXRTY3JvbGwucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoZ290b0VuZCkge1xuICAgICAgICAgICAgaWYgKGdvdG9FbmQgPT09IHZvaWQgMCkgeyBnb3RvRW5kID0gZmFsc2U7IH1cbiAgICAgICAgICAgIHZhciBfYSA9IHRoaXMsICRlbCA9IF9hLiRlbCwgY3R4ID0gX2EuY3R4O1xuICAgICAgICAgICAgdmFyIHBvcyA9IGN0eC5wb3M7XG4gICAgICAgICAgICBpZiAoISRlbCB8fCAhY3R4LnByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgU3dlZXRTY3JvbGwuY2FmKGN0eC5pZCk7XG4gICAgICAgICAgICBjdHgucHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgIGN0eC5zdGFydCA9IDA7XG4gICAgICAgICAgICBjdHguaWQgPSAwO1xuICAgICAgICAgICAgaWYgKGdvdG9FbmQgJiYgcG9zKSB7XG4gICAgICAgICAgICAgICAgc2V0U2Nyb2xsKCRlbCwgcG9zLmxlZnQsICd4Jyk7XG4gICAgICAgICAgICAgICAgc2V0U2Nyb2xsKCRlbCwgcG9zLnRvcCwgJ3knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29tcGxldGUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVwZGF0ZSBvcHRpb25zLlxuICAgICAgICAgKi9cbiAgICAgICAgU3dlZXRTY3JvbGwucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAodGhpcy4kZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3B0cyA9IF9fYXNzaWduKHt9LCB0aGlzLm9wdHMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kKHRydWUsIHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMub3B0cyA9IG9wdHM7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kKHRydWUsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlc3Ryb3kgaW5zdGFuY2UuXG4gICAgICAgICAqL1xuICAgICAgICBTd2VldFNjcm9sbC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLiRlbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kKHRydWUsIHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVsID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENhbGxiYWNrIG1ldGhvZHMuXG4gICAgICAgICAqL1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby1lbXB0eSAqL1xuICAgICAgICBTd2VldFNjcm9sbC5wcm90b3R5cGUub25CZWZvcmUgPSBmdW5jdGlvbiAoXywgX18pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBTd2VldFNjcm9sbC5wcm90b3R5cGUub25TdGVwID0gZnVuY3Rpb24gKF8pIHsgfTtcbiAgICAgICAgU3dlZXRTY3JvbGwucHJvdG90eXBlLm9uQWZ0ZXIgPSBmdW5jdGlvbiAoXywgX18pIHsgfTtcbiAgICAgICAgU3dlZXRTY3JvbGwucHJvdG90eXBlLm9uQ2FuY2VsID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgICAgICBTd2VldFNjcm9sbC5wcm90b3R5cGUub25Db21wbGV0ZSA9IGZ1bmN0aW9uIChfKSB7IH07XG4gICAgICAgIC8qIHRzbGludDplbmFibGUgKi9cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0YXJ0IHNjcm9sbGluZyBhbmltYXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICBTd2VldFNjcm9sbC5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAob3B0cykge1xuICAgICAgICAgICAgdmFyIGN0eCA9IHRoaXMuY3R4O1xuICAgICAgICAgICAgY3R4Lm9wdHMgPSBvcHRzO1xuICAgICAgICAgICAgY3R4LnByb2dyZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgIGN0eC5lYXNpbmcgPSBpc0Z1bmN0aW9uKG9wdHMuZWFzaW5nKVxuICAgICAgICAgICAgICAgID8gb3B0cy5lYXNpbmdcbiAgICAgICAgICAgICAgICA6IGVhc2luZ3Nbb3B0cy5lYXNpbmddO1xuICAgICAgICAgICAgLy8gVXBkYXRlIHN0YXJ0IG9mZnNldC5cbiAgICAgICAgICAgIHZhciAkY29udGFpbmVyID0gdGhpcy4kZWw7XG4gICAgICAgICAgICB2YXIgc3RhcnQgPSB7XG4gICAgICAgICAgICAgICAgdG9wOiBnZXRTY3JvbGwoJGNvbnRhaW5lciwgJ3knKSxcbiAgICAgICAgICAgICAgICBsZWZ0OiBnZXRTY3JvbGwoJGNvbnRhaW5lciwgJ3gnKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjdHguc3RhcnRQb3MgPSBzdGFydDtcbiAgICAgICAgICAgIC8vIExvb3BcbiAgICAgICAgICAgIGN0eC5pZCA9IFN3ZWV0U2Nyb2xsLnJhZih0aGlzLmxvb3ApO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogSGFuZGxlIHRoZSBjb21wbGV0aW9uIG9mIHNjcm9sbGluZyBhbmltYXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICBTd2VldFNjcm9sbC5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX2EgPSB0aGlzLCAkZWwgPSBfYS4kZWwsIGN0eCA9IF9hLmN0eDtcbiAgICAgICAgICAgIHZhciBoYXNoID0gY3R4Lmhhc2gsIGNhbmNlbCA9IGN0eC5jYW5jZWwsIG9wdHMgPSBjdHgub3B0cywgcG9zID0gY3R4LnBvcywgJHRyaWdnZXIgPSBjdHguJHRyaWdnZXI7XG4gICAgICAgICAgICBpZiAoISRlbCB8fCAhb3B0cykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChoYXNoICE9IG51bGwgJiYgaGFzaCAhPT0gd2luZG93LmxvY2F0aW9uLmhhc2gpIHtcbiAgICAgICAgICAgICAgICB2YXIgdXBkYXRlVVJMID0gb3B0cy51cGRhdGVVUkw7XG4gICAgICAgICAgICAgICAgaWYgKGNhblVzZURPTSAmJiBjYW5Vc2VIaXN0b3J5ICYmIHVwZGF0ZVVSTCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lmhpc3RvcnlbdXBkYXRlVVJMID09PSAncmVwbGFjZScgPyAncmVwbGFjZVN0YXRlJyA6ICdwdXNoU3RhdGUnXShudWxsLCAnJywgaGFzaCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51bmJpbmQoZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgY3R4Lm9wdHMgPSBudWxsO1xuICAgICAgICAgICAgY3R4LiR0cmlnZ2VyID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChjYW5jZWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhvb2sob3B0cywgJ2NhbmNlbCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ob29rKG9wdHMsICdhZnRlcicsIHBvcywgJHRyaWdnZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5ob29rKG9wdHMsICdjb21wbGV0ZScsIGNhbmNlbCk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYWxsYmFjayBmdW5jdGlvbiBhbmQgbWV0aG9kIGNhbGwuXG4gICAgICAgICAqL1xuICAgICAgICBTd2VldFNjcm9sbC5wcm90b3R5cGUuaG9vayA9IGZ1bmN0aW9uIChvcHRpb25zLCB0eXBlKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAyOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICBhcmdzW19pIC0gMl0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gb3B0aW9uc1t0eXBlXTtcbiAgICAgICAgICAgIHZhciBjYWxsYmFja1Jlc3VsdDtcbiAgICAgICAgICAgIHZhciBtZXRob2RSZXN1bHQ7XG4gICAgICAgICAgICAvLyBjYWxsYmFja1xuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tSZXN1bHQgPSBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmdzLmNvbmNhdChbdGhpc10pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIG1ldGhvZFxuICAgICAgICAgICAgbWV0aG9kUmVzdWx0ID0gKF9hID0gdGhpcylbXCJvblwiICsgKHR5cGVbMF0udG9VcHBlckNhc2UoKSArIHR5cGUuc2xpY2UoMSkpXS5hcHBseShfYSwgYXJncyk7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2tSZXN1bHQgIT09IHVuZGVmaW5lZCA/IGNhbGxiYWNrUmVzdWx0IDogbWV0aG9kUmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQmluZCBldmVudHMgb2YgY29udGFpbmVyIGVsZW1lbnQuXG4gICAgICAgICAqL1xuICAgICAgICBTd2VldFNjcm9sbC5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uIChjbGljaywgc3RvcCkge1xuICAgICAgICAgICAgdmFyIF9hID0gdGhpcywgJGVsID0gX2EuJGVsLCBvcHRzID0gX2EuY3R4Lm9wdHM7XG4gICAgICAgICAgICBpZiAoJGVsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZEV2ZW50KCRlbCwgQ09OVEFJTkVSX0NMSUNLX0VWRU5ULCB0aGlzLmhhbmRsZUNsaWNrLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdG9wKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZEV2ZW50KCRlbCwgQ09OVEFJTkVSX1NUT1BfRVZFTlQsIHRoaXMuaGFuZGxlU3RvcCwgb3B0cyA/IG9wdHMuY2FuY2VsbGFibGUgOiB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVbmJpbmQgZXZlbnRzIG9mIGNvbnRhaW5lciBlbGVtZW50LlxuICAgICAgICAgKi9cbiAgICAgICAgU3dlZXRTY3JvbGwucHJvdG90eXBlLnVuYmluZCA9IGZ1bmN0aW9uIChjbGljaywgc3RvcCkge1xuICAgICAgICAgICAgdmFyIF9hID0gdGhpcywgJGVsID0gX2EuJGVsLCBvcHRzID0gX2EuY3R4Lm9wdHM7XG4gICAgICAgICAgICBpZiAoJGVsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50KCRlbCwgQ09OVEFJTkVSX0NMSUNLX0VWRU5ULCB0aGlzLmhhbmRsZUNsaWNrLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdG9wKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50KCRlbCwgQ09OVEFJTkVSX1NUT1BfRVZFTlQsIHRoaXMuaGFuZGxlU3RvcCwgb3B0cyA/IG9wdHMuY2FuY2VsbGFibGUgOiB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBZb3UgY2FuIHNldCBQb2x5ZmlsbCAob3IgUG9ueWZpbGwpIGZvciBicm93c2VycyB0aGF0IGRvIG5vdCBzdXBwb3J0IHJlcXVlc3RBbmltYXRpb25GcmFtZS5cbiAgICAgICAgICovXG4gICAgICAgIFN3ZWV0U2Nyb2xsLnJhZiA9IHJhZjtcbiAgICAgICAgU3dlZXRTY3JvbGwuY2FmID0gY2FmO1xuICAgICAgICByZXR1cm4gU3dlZXRTY3JvbGw7XG4gICAgfSgpKTtcblxuICAgIHJldHVybiBTd2VldFNjcm9sbDtcblxufSkpOyJdLCJmaWxlIjoic3dlZXQtc2Nyb2xsLmpzIn0=
