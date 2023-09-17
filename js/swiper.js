/**
 * Swiper 8.2.4
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2022 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: June 13, 2022
 */


(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Swiper = factory());
})(this, (function () { 'use strict';

    /**
     * SSR Window 4.0.2
     * Better handling for window object in SSR environment
     * https://github.com/nolimits4web/ssr-window
     *
     * Copyright 2021, Vladimir Kharlampidi
     *
     * Licensed under MIT
     *
     * Released on: December 13, 2021
     */

    /* eslint-disable no-param-reassign */
    function isObject$1(obj) {
      return obj !== null && typeof obj === 'object' && 'constructor' in obj && obj.constructor === Object;
    }

    function extend$1(target, src) {
      if (target === void 0) {
        target = {};
      }

      if (src === void 0) {
        src = {};
      }

      Object.keys(src).forEach(key => {
        if (typeof target[key] === 'undefined') target[key] = src[key];else if (isObject$1(src[key]) && isObject$1(target[key]) && Object.keys(src[key]).length > 0) {
          extend$1(target[key], src[key]);
        }
      });
    }

    const ssrDocument = {
      body: {},

      addEventListener() {},

      removeEventListener() {},

      activeElement: {
        blur() {},

        nodeName: ''
      },

      querySelector() {
        return null;
      },

      querySelectorAll() {
        return [];
      },

      getElementById() {
        return null;
      },

      createEvent() {
        return {
          initEvent() {}

        };
      },

      createElement() {
        return {
          children: [],
          childNodes: [],
          style: {},

          setAttribute() {},

          getElementsByTagName() {
            return [];
          }

        };
      },

      createElementNS() {
        return {};
      },

      importNode() {
        return null;
      },

      location: {
        hash: '',
        host: '',
        hostname: '',
        href: '',
        origin: '',
        pathname: '',
        protocol: '',
        search: ''
      }
    };

    function getDocument() {
      const doc = typeof document !== 'undefined' ? document : {};
      extend$1(doc, ssrDocument);
      return doc;
    }

    const ssrWindow = {
      document: ssrDocument,
      navigator: {
        userAgent: ''
      },
      location: {
        hash: '',
        host: '',
        hostname: '',
        href: '',
        origin: '',
        pathname: '',
        protocol: '',
        search: ''
      },
      history: {
        replaceState() {},

        pushState() {},

        go() {},

        back() {}

      },
      CustomEvent: function CustomEvent() {
        return this;
      },

      addEventListener() {},

      removeEventListener() {},

      getComputedStyle() {
        return {
          getPropertyValue() {
            return '';
          }

        };
      },

      Image() {},

      Date() {},

      screen: {},

      setTimeout() {},

      clearTimeout() {},

      matchMedia() {
        return {};
      },

      requestAnimationFrame(callback) {
        if (typeof setTimeout === 'undefined') {
          callback();
          return null;
        }

        return setTimeout(callback, 0);
      },

      cancelAnimationFrame(id) {
        if (typeof setTimeout === 'undefined') {
          return;
        }

        clearTimeout(id);
      }

    };

    function getWindow() {
      const win = typeof window !== 'undefined' ? window : {};
      extend$1(win, ssrWindow);
      return win;
    }

    /**
     * Dom7 4.0.4
     * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
     * https://framework7.io/docs/dom7.html
     *
     * Copyright 2022, Vladimir Kharlampidi
     *
     * Licensed under MIT
     *
     * Released on: January 11, 2022
     */
    /* eslint-disable no-proto */

    function makeReactive(obj) {
      const proto = obj.__proto__;
      Object.defineProperty(obj, '__proto__', {
        get() {
          return proto;
        },

        set(value) {
          proto.__proto__ = value;
        }

      });
    }

    class Dom7 extends Array {
      constructor(items) {
        if (typeof items === 'number') {
          super(items);
        } else {
          super(...(items || []));
          makeReactive(this);
        }
      }

    }

    function arrayFlat(arr) {
      if (arr === void 0) {
        arr = [];
      }

      const res = [];
      arr.forEach(el => {
        if (Array.isArray(el)) {
          res.push(...arrayFlat(el));
        } else {
          res.push(el);
        }
      });
      return res;
    }

    function arrayFilter(arr, callback) {
      return Array.prototype.filter.call(arr, callback);
    }

    function arrayUnique(arr) {
      const uniqueArray = [];

      for (let i = 0; i < arr.length; i += 1) {
        if (uniqueArray.indexOf(arr[i]) === -1) uniqueArray.push(arr[i]);
      }

      return uniqueArray;
    }


    function qsa(selector, context) {
      if (typeof selector !== 'string') {
        return [selector];
      }

      const a = [];
      const res = context.querySelectorAll(selector);

      for (let i = 0; i < res.length; i += 1) {
        a.push(res[i]);
      }

      return a;
    }

    function $(selector, context) {
      const window = getWindow();
      const document = getDocument();
      let arr = [];

      if (!context && selector instanceof Dom7) {
        return selector;
      }

      if (!selector) {
        return new Dom7(arr);
      }

      if (typeof selector === 'string') {
        const html = selector.trim();

        if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
          let toCreate = 'div';
          if (html.indexOf('<li') === 0) toCreate = 'ul';
          if (html.indexOf('<tr') === 0) toCreate = 'tbody';
          if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
          if (html.indexOf('<tbody') === 0) toCreate = 'table';
          if (html.indexOf('<option') === 0) toCreate = 'select';
          const tempParent = document.createElement(toCreate);
          tempParent.innerHTML = html;

          for (let i = 0; i < tempParent.childNodes.length; i += 1) {
            arr.push(tempParent.childNodes[i]);
          }
        } else {
          arr = qsa(selector.trim(), context || document);
        } // arr = qsa(selector, document);

      } else if (selector.nodeType || selector === window || selector === document) {
        arr.push(selector);
      } else if (Array.isArray(selector)) {
        if (selector instanceof Dom7) return selector;
        arr = selector;
      }

      return new Dom7(arrayUnique(arr));
    }

    $.fn = Dom7.prototype; // eslint-disable-next-line

    function addClass() {
      for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
        classes[_key] = arguments[_key];
      }

      const classNames = arrayFlat(classes.map(c => c.split(' ')));
      this.forEach(el => {
        el.classList.add(...classNames);
      });
      return this;
    }

    function removeClass() {
      for (var _len2 = arguments.length, classes = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        classes[_key2] = arguments[_key2];
      }

      const classNames = arrayFlat(classes.map(c => c.split(' ')));
      this.forEach(el => {
        el.classList.remove(...classNames);
      });
      return this;
    }

    function toggleClass() {
      for (var _len3 = arguments.length, classes = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        classes[_key3] = arguments[_key3];
      }

      const classNames = arrayFlat(classes.map(c => c.split(' ')));
      this.forEach(el => {
        classNames.forEach(className => {
          el.classList.toggle(className);
        });
      });
    }

    function hasClass() {
      for (var _len4 = arguments.length, classes = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        classes[_key4] = arguments[_key4];
      }

      const classNames = arrayFlat(classes.map(c => c.split(' ')));
      return arrayFilter(this, el => {
        return classNames.filter(className => el.classList.contains(className)).length > 0;
      }).length > 0;
    }

    function attr(attrs, value) {
      if (arguments.length === 1 && typeof attrs === 'string') {
        // Get attr
        if (this[0]) return this[0].getAttribute(attrs);
        return undefined;
      } // Set attrs


      for (let i = 0; i < this.length; i += 1) {
        if (arguments.length === 2) {
          // String
          this[i].setAttribute(attrs, value);
        } else {
          // Object
          for (const attrName in attrs) {
            this[i][attrName] = attrs[attrName];
            this[i].setAttribute(attrName, attrs[attrName]);
          }
        }
      }

      return this;
    }

    function removeAttr(attr) {
      for (let i = 0; i < this.length; i += 1) {
        this[i].removeAttribute(attr);
      }

      return this;
    }

    function transform(transform) {
      for (let i = 0; i < this.length; i += 1) {
        this[i].style.transform = transform;
      }

      return this;
    }

    function transition$1(duration) {
      for (let i = 0; i < this.length; i += 1) {
        this[i].style.transitionDuration = typeof duration !== 'string' ? `${duration}ms` : duration;
      }

      return this;
    }

    function on() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      let [eventType, targetSelector, listener, capture] = args;

      if (typeof args[1] === 'function') {
        [eventType, listener, capture] = args;
        targetSelector = undefined;
      }

      if (!capture) capture = false;

      function handleLiveEvent(e) {
        const target = e.target;
        if (!target) return;
        const eventData = e.target.dom7EventData || [];

        if (eventData.indexOf(e) < 0) {
          eventData.unshift(e);
        }

        if ($(target).is(targetSelector)) listener.apply(target, eventData);else {
          const parents = $(target).parents(); // eslint-disable-line

          for (let k = 0; k < parents.length; k += 1) {
            if ($(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);
          }
        }
      }

      function handleEvent(e) {
        const eventData = e && e.target ? e.target.dom7EventData || [] : [];

        if (eventData.indexOf(e) < 0) {
          eventData.unshift(e);
        }

        listener.apply(this, eventData);
      }

      const events = eventType.split(' ');
      let j;

      for (let i = 0; i < this.length; i += 1) {
        const el = this[i];

        if (!targetSelector) {
          for (j = 0; j < events.length; j += 1) {
            const event = events[j];
            if (!el.dom7Listeners) el.dom7Listeners = {};
            if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
            el.dom7Listeners[event].push({
              listener,
              proxyListener: handleEvent
            });
            el.addEventListener(event, handleEvent, capture);
          }
        } else {
          // Live events
          for (j = 0; j < events.length; j += 1) {
            const event = events[j];
            if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
            if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];
            el.dom7LiveListeners[event].push({
              listener,
              proxyListener: handleLiveEvent
            });
            el.addEventListener(event, handleLiveEvent, capture);
          }
        }
      }

      return this;
    }

    function off() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      let [eventType, targetSelector, listener, capture] = args;

      if (typeof args[1] === 'function') {
        [eventType, listener, capture] = args;
        targetSelector = undefined;
      }

      if (!capture) capture = false;
      const events = eventType.split(' ');

      for (let i = 0; i < events.length; i += 1) {
        const event = events[i];

        for (let j = 0; j < this.length; j += 1) {
          const el = this[j];
          let handlers;

          if (!targetSelector && el.dom7Listeners) {
            handlers = el.dom7Listeners[event];
          } else if (targetSelector && el.dom7LiveListeners) {
            handlers = el.dom7LiveListeners[event];
          }

          if (handlers && handlers.length) {
            for (let k = handlers.length - 1; k >= 0; k -= 1) {
              const handler = handlers[k];

              if (listener && handler.listener === listener) {
                el.removeEventListener(event, handler.proxyListener, capture);
                handlers.splice(k, 1);
              } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
                el.removeEventListener(event, handler.proxyListener, capture);
                handlers.splice(k, 1);
              } else if (!listener) {
                el.removeEventListener(event, handler.proxyListener, capture);
                handlers.splice(k, 1);
              }
            }
          }
        }
      }

      return this;
    }

    function trigger() {
      const window = getWindow();

      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      const events = args[0].split(' ');
      const eventData = args[1];

      for (let i = 0; i < events.length; i += 1) {
        const event = events[i];

        for (let j = 0; j < this.length; j += 1) {
          const el = this[j];

          if (window.CustomEvent) {
            const evt = new window.CustomEvent(event, {
              detail: eventData,
              bubbles: true,
              cancelable: true
            });
            el.dom7EventData = args.filter((data, dataIndex) => dataIndex > 0);
            el.dispatchEvent(evt);
            el.dom7EventData = [];
            delete el.dom7EventData;
          }
        }
      }

      return this;
    }

    function transitionEnd$1(callback) {
      const dom = this;

      function fireCallBack(e) {
        if (e.target !== this) return;
        callback.call(this, e);
        dom.off('transitionend', fireCallBack);
      }

      if (callback) {
        dom.on('transitionend', fireCallBack);
      }

      return this;
    }

    function outerWidth(includeMargins) {
      if (this.length > 0) {
        if (includeMargins) {
          const styles = this.styles();
          return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
        }

        return this[0].offsetWidth;
      }

      return null;
    }

    function outerHeight(includeMargins) {
      if (this.length > 0) {
        if (includeMargins) {
          const styles = this.styles();
          return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
        }

        return this[0].offsetHeight;
      }

      return null;
    }

    function offset() {
      if (this.length > 0) {
        const window = getWindow();
        const document = getDocument();
        const el = this[0];
        const box = el.getBoundingClientRect();
        const body = document.body;
        const clientTop = el.clientTop || body.clientTop || 0;
        const clientLeft = el.clientLeft || body.clientLeft || 0;
        const scrollTop = el === window ? window.scrollY : el.scrollTop;
        const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
        return {
          top: box.top + scrollTop - clientTop,
          left: box.left + scrollLeft - clientLeft
        };
      }

      return null;
    }

    function styles() {
      const window = getWindow();
      if (this[0]) return window.getComputedStyle(this[0], null);
      return {};
    }

    function css(props, value) {
      const window = getWindow();
      let i;

      if (arguments.length === 1) {
        if (typeof props === 'string') {
          // .css('width')
          if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
        } else {
          // .css({ width: '100px' })
          for (i = 0; i < this.length; i += 1) {
            for (const prop in props) {
              this[i].style[prop] = props[prop];
            }
          }

          return this;
        }
      }

      if (arguments.length === 2 && typeof props === 'string') {
        // .css('width', '100px')
        for (i = 0; i < this.length; i += 1) {
          this[i].style[props] = value;
        }

        return this;
      }

      return this;
    }

    function each(callback) {
      if (!callback) return this;
      this.forEach((el, index) => {
        callback.apply(el, [el, index]);
      });
      return this;
    }

    function filter(callback) {
      const result = arrayFilter(this, callback);
      return $(result);
    }

    function html(html) {
      if (typeof html === 'undefined') {
        return this[0] ? this[0].innerHTML : null;
      }

      for (let i = 0; i < this.length; i += 1) {
        this[i].innerHTML = html;
      }

      return this;
    }

    function text(text) {
      if (typeof text === 'undefined') {
        return this[0] ? this[0].textContent.trim() : null;
      }

      for (let i = 0; i < this.length; i += 1) {
        this[i].textContent = text;
      }

      return this;
    }

    function is(selector) {
      const window = getWindow();
      const document = getDocument();
      const el = this[0];
      let compareWith;
      let i;
      if (!el || typeof selector === 'undefined') return false;

      if (typeof selector === 'string') {
        if (el.matches) return el.matches(selector);
        if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
        if (el.msMatchesSelector) return el.msMatchesSelector(selector);
        compareWith = $(selector);

        for (i = 0; i < compareWith.length; i += 1) {
          if (compareWith[i] === el) return true;
        }

        return false;
      }

      if (selector === document) {
        return el === document;
      }

      if (selector === window) {
        return el === window;
      }

      if (selector.nodeType || selector instanceof Dom7) {
        compareWith = selector.nodeType ? [selector] : selector;

        for (i = 0; i < compareWith.length; i += 1) {
          if (compareWith[i] === el) return true;
        }

        return false;
      }

      return false;
    }

    function index() {
      let child = this[0];
      let i;

      if (child) {
        i = 0; // eslint-disable-next-line

        while ((child = child.previousSibling) !== null) {
          if (child.nodeType === 1) i += 1;
        }

        return i;
      }

      return undefined;
    }

    function eq(index) {
      if (typeof index === 'undefined') return this;
      const length = this.length;

      if (index > length - 1) {
        return $([]);
      }

      if (index < 0) {
        const returnIndex = length + index;
        if (returnIndex < 0) return $([]);
        return $([this[returnIndex]]);
      }

      return $([this[index]]);
    }

    function append() {
      let newChild;
      const document = getDocument();

      for (let k = 0; k < arguments.length; k += 1) {
        newChild = k < 0 || arguments.length <= k ? undefined : arguments[k];

        for (let i = 0; i < this.length; i += 1) {
          if (typeof newChild === 'string') {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = newChild;

            while (tempDiv.firstChild) {
              this[i].appendChild(tempDiv.firstChild);
            }
          } else if (newChild instanceof Dom7) {
            for (let j = 0; j < newChild.length; j += 1) {
              this[i].appendChild(newChild[j]);
            }
          } else {
            this[i].appendChild(newChild);
          }
        }
      }

      return this;
    }

    function prepend(newChild) {
      const document = getDocument();
      let i;
      let j;

      for (i = 0; i < this.length; i += 1) {
        if (typeof newChild === 'string') {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = newChild;

          for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
          }
        } else if (newChild instanceof Dom7) {
          for (j = 0; j < newChild.length; j += 1) {
            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
          }
        } else {
          this[i].insertBefore(newChild, this[i].childNodes[0]);
        }
      }

      return this;
    }

    function next(selector) {
      if (this.length > 0) {
        if (selector) {
          if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
            return $([this[0].nextElementSibling]);
          }

          return $([]);
        }

        if (this[0].nextElementSibling) return $([this[0].nextElementSibling]);
        return $([]);
      }

      return $([]);
    }

    function nextAll(selector) {
      const nextEls = [];
      let el = this[0];
      if (!el) return $([]);

      while (el.nextElementSibling) {
        const next = el.nextElementSibling; // eslint-disable-line

        if (selector) {
          if ($(next).is(selector)) nextEls.push(next);
        } else nextEls.push(next);

        el = next;
      }

      return $(nextEls);
    }

    function prev(selector) {
      if (this.length > 0) {
        const el = this[0];

        if (selector) {
          if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
            return $([el.previousElementSibling]);
          }

          return $([]);
        }

        if (el.previousElementSibling) return $([el.previousElementSibling]);
        return $([]);
      }

      return $([]);
    }

    function prevAll(selector) {
      const prevEls = [];
      let el = this[0];
      if (!el) return $([]);

      while (el.previousElementSibling) {
        const prev = el.previousElementSibling; // eslint-disable-line

        if (selector) {
          if ($(prev).is(selector)) prevEls.push(prev);
        } else prevEls.push(prev);

        el = prev;
      }

      return $(prevEls);
    }

    function parent(selector) {
      const parents = []; // eslint-disable-line

      for (let i = 0; i < this.length; i += 1) {
        if (this[i].parentNode !== null) {
          if (selector) {
            if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
          } else {
            parents.push(this[i].parentNode);
          }
        }
      }

      return $(parents);
    }

    function parents(selector) {
      const parents = []; // eslint-disable-line

      for (let i = 0; i < this.length; i += 1) {
        let parent = this[i].parentNode; // eslint-disable-line

        while (parent) {
          if (selector) {
            if ($(parent).is(selector)) parents.push(parent);
          } else {
            parents.push(parent);
          }

          parent = parent.parentNode;
        }
      }

      return $(parents);
    }

    function closest(selector) {
      let closest = this; // eslint-disable-line

      if (typeof selector === 'undefined') {
        return $([]);
      }

      if (!closest.is(selector)) {
        closest = closest.parents(selector).eq(0);
      }

      return closest;
    }

    function find(selector) {
      const foundElements = [];

      for (let i = 0; i < this.length; i += 1) {
        const found = this[i].querySelectorAll(selector);

        for (let j = 0; j < found.length; j += 1) {
          foundElements.push(found[j]);
        }
      }

      return $(foundElements);
    }

    function children(selector) {
      const children = []; // eslint-disable-line

      for (let i = 0; i < this.length; i += 1) {
        const childNodes = this[i].children;

        for (let j = 0; j < childNodes.length; j += 1) {
          if (!selector || $(childNodes[j]).is(selector)) {
            children.push(childNodes[j]);
          }
        }
      }

      return $(children);
    }

    function remove() {
      for (let i = 0; i < this.length; i += 1) {
        if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
      }

      return this;
    }

    const Methods = {
      addClass,
      removeClass,
      hasClass,
      toggleClass,
      attr,
      removeAttr,
      transform,
      transition: transition$1,
      on,
      off,
      trigger,
      transitionEnd: transitionEnd$1,
      outerWidth,
      outerHeight,
      styles,
      offset,
      css,
      each,
      html,
      text,
      is,
      index,
      eq,
      append,
      prepend,
      next,
      nextAll,
      prev,
      prevAll,
      parent,
      parents,
      closest,
      find,
      children,
      filter,
      remove
    };
    Object.keys(Methods).forEach(methodName => {
      Object.defineProperty($.fn, methodName, {
        value: Methods[methodName],
        writable: true
      });
    });

    function deleteProps(obj) {
      const object = obj;
      Object.keys(object).forEach(key => {
        try {
          object[key] = null;
        } catch (e) {// no getter for object
        }

        try {
          delete object[key];
        } catch (e) {// something got wrong
        }
      });
    }

    function nextTick(callback, delay) {
      if (delay === void 0) {
        delay = 0;
      }

      return setTimeout(callback, delay);
    }

    function now() {
      return Date.now();
    }

    function getComputedStyle$1(el) {
      const window = getWindow();
      let style;

      if (window.getComputedStyle) {
        style = window.getComputedStyle(el, null);
      }

      if (!style && el.currentStyle) {
        style = el.currentStyle;
      }

      if (!style) {
        style = el.style;
      }

      return style;
    }

    function getTranslate(el, axis) {
      if (axis === void 0) {
        axis = 'x';
      }

      const window = getWindow();
      let matrix;
      let curTransform;
      let transformMatrix;
      const curStyle = getComputedStyle$1(el);

      if (window.WebKitCSSMatrix) {
        curTransform = curStyle.transform || curStyle.webkitTransform;

        if (curTransform.split(',').length > 6) {
          curTransform = curTransform.split(', ').map(a => a.replace(',', '.')).join(', ');
        } // Some old versions of Webkit choke when 'none' is passed; pass
        // empty string instead in this case


        transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
      } else {
        transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
        matrix = transformMatrix.toString().split(',');
      }

      if (axis === 'x') {
        // Latest Chrome and webkits Fix
        if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; // Crazy IE10 Matrix
        else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); // Normal Browsers
        else curTransform = parseFloat(matrix[4]);
      }

      if (axis === 'y') {
        // Latest Chrome and webkits Fix
        if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; // Crazy IE10 Matrix
        else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); // Normal Browsers
        else curTransform = parseFloat(matrix[5]);
      }

      return curTransform || 0;
    }

    function isObject(o) {
      return typeof o === 'object' && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === 'Object';
    }

    function isNode(node) {
      // eslint-disable-next-line
      if (typeof window !== 'undefined' && typeof window.HTMLElement !== 'undefined') {
        return node instanceof HTMLElement;
      }

      return node && (node.nodeType === 1 || node.nodeType === 11);
    }

    function extend() {
      const to = Object(arguments.length <= 0 ? undefined : arguments[0]);
      const noExtend = ['__proto__', 'constructor', 'prototype'];

      for (let i = 1; i < arguments.length; i += 1) {
        const nextSource = i < 0 || arguments.length <= i ? undefined : arguments[i];

        if (nextSource !== undefined && nextSource !== null && !isNode(nextSource)) {
          const keysArray = Object.keys(Object(nextSource)).filter(key => noExtend.indexOf(key) < 0);

          for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
            const nextKey = keysArray[nextIndex];
            const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

            if (desc !== undefined && desc.enumerable) {
              if (isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
                if (nextSource[nextKey].__swiper__) {
                  to[nextKey] = nextSource[nextKey];
                } else {
                  extend(to[nextKey], nextSource[nextKey]);
                }
              } else if (!isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
                to[nextKey] = {};

                if (nextSource[nextKey].__swiper__) {
                  to[nextKey] = nextSource[nextKey];
                } else {
                  extend(to[nextKey], nextSource[nextKey]);
                }
              } else {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
      }

      return to;
    }

    function setCSSProperty(el, varName, varValue) {
      el.style.setProperty(varName, varValue);
    }

    function animateCSSModeScroll(_ref) {
      let {
        swiper,
        targetPosition,
        side
      } = _ref;
      const window = getWindow();
      const startPosition = -swiper.translate;
      let startTime = null;
      let time;
      const duration = swiper.params.speed;
      swiper.wrapperEl.style.scrollSnapType = 'none';
      window.cancelAnimationFrame(swiper.cssModeFrameID);
      const dir = targetPosition > startPosition ? 'next' : 'prev';

      const isOutOfBound = (current, target) => {
        return dir === 'next' && current >= target || dir === 'prev' && current <= target;
      };

      const animate = () => {
        time = new Date().getTime();

        if (startTime === null) {
          startTime = time;
        }

        const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
        const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
        let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);

        if (isOutOfBound(currentPosition, targetPosition)) {
          currentPosition = targetPosition;
        }

        swiper.wrapperEl.scrollTo({
          [side]: currentPosition
        });

        if (isOutOfBound(currentPosition, targetPosition)) {
          swiper.wrapperEl.style.overflow = 'hidden';
          swiper.wrapperEl.style.scrollSnapType = '';
          setTimeout(() => {
            swiper.wrapperEl.style.overflow = '';
            swiper.wrapperEl.scrollTo({
              [side]: currentPosition
            });
          });
          window.cancelAnimationFrame(swiper.cssModeFrameID);
          return;
        }

        swiper.cssModeFrameID = window.requestAnimationFrame(animate);
      };

      animate();
    }

    let support;

    function calcSupport() {
      const window = getWindow();
      const document = getDocument();
      return {
        smoothScroll: document.documentElement && 'scrollBehavior' in document.documentElement.style,
        touch: !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch),
        passiveListener: function checkPassiveListener() {
          let supportsPassive = false;

          try {
            const opts = Object.defineProperty({}, 'passive', {
              // eslint-disable-next-line
              get() {
                supportsPassive = true;
              }

            });
            window.addEventListener('testPassiveListener', null, opts);
          } catch (e) {// No support
          }

          return supportsPassive;
        }(),
        gestures: function checkGestures() {
          return 'ongesturestart' in window;
        }()
      };
    }

    function getSupport() {
      if (!support) {
        support = calcSupport();
      }

      return support;
    }

    let deviceCached;

    function calcDevice(_temp) {
      let {
        userAgent
      } = _temp === void 0 ? {} : _temp;
      const support = getSupport();
      const window = getWindow();
      const platform = window.navigator.platform;
      const ua = userAgent || window.navigator.userAgent;
      const device = {
        ios: false,
        android: false
      };
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line

      let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
      const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
      const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
      const windows = platform === 'Win32';
      let macos = platform === 'MacIntel'; // iPadOs 13 fix

      const iPadScreens = ['1024x1366', '1366x1024', '834x1194', '1194x834', '834x1112', '1112x834', '768x1024', '1024x768', '820x1180', '1180x820', '810x1080', '1080x810'];

      if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
        ipad = ua.match(/(Version)\/([\d.]+)/);
        if (!ipad) ipad = [0, 1, '13_0_0'];
        macos = false;
      } // Android


      if (android && !windows) {
        device.os = 'android';
        device.android = true;
      }

      if (ipad || iphone || ipod) {
        device.os = 'ios';
        device.ios = true;
      } // Export object


      return device;
    }

    function getDevice(overrides) {
      if (overrides === void 0) {
        overrides = {};
      }

      if (!deviceCached) {
        deviceCached = calcDevice(overrides);
      }

      return deviceCached;
    }

    let browser;

    function calcBrowser() {
      const window = getWindow();

      function isSafari() {
        const ua = window.navigator.userAgent.toLowerCase();
        return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;
      }

      return {
        isSafari: isSafari(),
        isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
      };
    }

    function getBrowser() {
      if (!browser) {
        browser = calcBrowser();
      }

      return browser;
    }

    function Resize(_ref) {
      let {
        swiper,
        on,
        emit
      } = _ref;
      const window = getWindow();
      let observer = null;
      let animationFrame = null;

      const resizeHandler = () => {
        if (!swiper || swiper.destroyed || !swiper.initialized) return;
        emit('beforeResize');
        emit('resize');
      };

      const createObserver = () => {
        if (!swiper || swiper.destroyed || !swiper.initialized) return;
        observer = new ResizeObserver(entries => {
          animationFrame = window.requestAnimationFrame(() => {
            const {
              width,
              height
            } = swiper;
            let newWidth = width;
            let newHeight = height;
            entries.forEach(_ref2 => {
              let {
                contentBoxSize,
                contentRect,
                target
              } = _ref2;
              if (target && target !== swiper.el) return;
              newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
              newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
            });

            if (newWidth !== width || newHeight !== height) {
              resizeHandler();
            }
          });
        });
        observer.observe(swiper.el);
      };

      const removeObserver = () => {
        if (animationFrame) {
          window.cancelAnimationFrame(animationFrame);
        }

        if (observer && observer.unobserve && swiper.el) {
          observer.unobserve(swiper.el);
          observer = null;
        }
      };

      const orientationChangeHandler = () => {
        if (!swiper || swiper.destroyed || !swiper.initialized) return;
        emit('orientationchange');
      };

      on('init', () => {
        if (swiper.params.resizeObserver && typeof window.ResizeObserver !== 'undefined') {
          createObserver();
          return;
        }

        window.addEventListener('resize', resizeHandler);
        window.addEventListener('orientationchange', orientationChangeHandler);
      });
      on('destroy', () => {
        removeObserver();
        window.removeEventListener('resize', resizeHandler);
        window.removeEventListener('orientationchange', orientationChangeHandler);
      });
    }

    function Observer(_ref) {
      let {
        swiper,
        extendParams,
        on,
        emit
      } = _ref;
      const observers = [];
      const window = getWindow();

      const attach = function (target, options) {
        if (options === void 0) {
          options = {};
        }

        const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
        const observer = new ObserverFunc(mutations => {
          // The observerUpdate event should only be triggered
          // once despite the number of mutations.  Additional
          // triggers are redundant and are very costly
          if (mutations.length === 1) {
            emit('observerUpdate', mutations[0]);
            return;
          }

          const observerUpdate = function observerUpdate() {
            emit('observerUpdate', mutations[0]);
          };

          if (window.requestAnimationFrame) {
            window.requestAnimationFrame(observerUpdate);
          } else {
            window.setTimeout(observerUpdate, 0);
          }
        });
        observer.observe(target, {
          attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
          childList: typeof options.childList === 'undefined' ? true : options.childList,
          characterData: typeof options.characterData === 'undefined' ? true : options.characterData
        });
        observers.push(observer);
      };

      const init = () => {
        if (!swiper.params.observer) return;

        if (swiper.params.observeParents) {
          const containerParents = swiper.$el.parents();

          for (let i = 0; i < containerParents.length; i += 1) {
            attach(containerParents[i]);
          }
        } // Observe container


        attach(swiper.$el[0], {
          childList: swiper.params.observeSlideChildren
        }); // Observe wrapper

        attach(swiper.$wrapperEl[0], {
          attributes: false
        });
      };

      const destroy = () => {
        observers.forEach(observer => {
          observer.disconnect();
        });
        observers.splice(0, observers.length);
      };

      extendParams({
        observer: false,
        observeParents: false,
        observeSlideChildren: false
      });
      on('init', init);
      on('destroy', destroy);
    }

    /* eslint-disable no-underscore-dangle */
    var eventsEmitter = {
      on(events, handler, priority) {
        const self = this;
        if (!self.eventsListeners || self.destroyed) return self;
        if (typeof handler !== 'function') return self;
        const method = priority ? 'unshift' : 'push';
        events.split(' ').forEach(event => {
          if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
          self.eventsListeners[event][method](handler);
        });
        return self;
      },

      once(events, handler, priority) {
        const self = this;
        if (!self.eventsListeners || self.destroyed) return self;
        if (typeof handler !== 'function') return self;

        function onceHandler() {
          self.off(events, onceHandler);

          if (onceHandler.__emitterProxy) {
            delete onceHandler.__emitterProxy;
          }

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          handler.apply(self, args);
        }

        onceHandler.__emitterProxy = handler;
        return self.on(events, onceHandler, priority);
      },

      onAny(handler, priority) {
        const self = this;
        if (!self.eventsListeners || self.destroyed) return self;
        if (typeof handler !== 'function') return self;
        const method = priority ? 'unshift' : 'push';

        if (self.eventsAnyListeners.indexOf(handler) < 0) {
          self.eventsAnyListeners[method](handler);
        }

        return self;
      },

      offAny(handler) {
        const self = this;
        if (!self.eventsListeners || self.destroyed) return self;
        if (!self.eventsAnyListeners) return self;
        const index = self.eventsAnyListeners.indexOf(handler);

        if (index >= 0) {
          self.eventsAnyListeners.splice(index, 1);
        }

        return self;
      },

      off(events, handler) {
        const self = this;
        if (!self.eventsListeners || self.destroyed) return self;
        if (!self.eventsListeners) return self;
        events.split(' ').forEach(event => {
          if (typeof handler === 'undefined') {
            self.eventsListeners[event] = [];
          } else if (self.eventsListeners[event]) {
            self.eventsListeners[event].forEach((eventHandler, index) => {
              if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
                self.eventsListeners[event].splice(index, 1);
              }
            });
          }
        });
        return self;
      },

      emit() {
        const self = this;
        if (!self.eventsListeners || self.destroyed) return self;
        if (!self.eventsListeners) return self;
        let events;
        let data;
        let context;

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        if (typeof args[0] === 'string' || Array.isArray(args[0])) {
          events = args[0];
          data = args.slice(1, args.length);
          context = self;
        } else {
          events = args[0].events;
          data = args[0].data;
          context = args[0].context || self;
        }

        data.unshift(context);
        const eventsArray = Array.isArray(events) ? events : events.split(' ');
        eventsArray.forEach(event => {
          if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
            self.eventsAnyListeners.forEach(eventHandler => {
              eventHandler.apply(context, [event, ...data]);
            });
          }

          if (self.eventsListeners && self.eventsListeners[event]) {
            self.eventsListeners[event].forEach(eventHandler => {
              eventHandler.apply(context, data);
            });
          }
        });
        return self;
      }

    };

    function updateSize() {
      const swiper = this;
      let width;
      let height;
      const $el = swiper.$el;

      if (typeof swiper.params.width !== 'undefined' && swiper.params.width !== null) {
        width = swiper.params.width;
      } else {
        width = $el[0].clientWidth;
      }

      if (typeof swiper.params.height !== 'undefined' && swiper.params.height !== null) {
        height = swiper.params.height;
      } else {
        height = $el[0].clientHeight;
      }

      if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
        return;
      } // Subtract paddings


      width = width - parseInt($el.css('padding-left') || 0, 10) - parseInt($el.css('padding-right') || 0, 10);
      height = height - parseInt($el.css('padding-top') || 0, 10) - parseInt($el.css('padding-bottom') || 0, 10);
      if (Number.isNaN(width)) width = 0;
      if (Number.isNaN(height)) height = 0;
      Object.assign(swiper, {
        width,
        height,
        size: swiper.isHorizontal() ? width : height
      });
    }

    function updateSlides() {
      const swiper = this;

      function getDirectionLabel(property) {
        if (swiper.isHorizontal()) {
          return property;
        } // prettier-ignore


        return {
          'width': 'height',
          'margin-top': 'margin-left',
          'margin-bottom ': 'margin-right',
          'margin-left': 'margin-top',
          'margin-right': 'margin-bottom',
          'padding-left': 'padding-top',
          'padding-right': 'padding-bottom',
          'marginRight': 'marginBottom'
        }[property];
      }

      function getDirectionPropertyValue(node, label) {
        return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
      }

      const params = swiper.params;
      const {
        $wrapperEl,
        size: swiperSize,
        rtlTranslate: rtl,
        wrongRTL
      } = swiper;
      const isVirtual = swiper.virtual && params.virtual.enabled;
      const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
      const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);
      const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
      let snapGrid = [];
      const slidesGrid = [];
      const slidesSizesGrid = [];
      let offsetBefore = params.slidesOffsetBefore;

      if (typeof offsetBefore === 'function') {
        offsetBefore = params.slidesOffsetBefore.call(swiper);
      }

      let offsetAfter = params.slidesOffsetAfter;

      if (typeof offsetAfter === 'function') {
        offsetAfter = params.slidesOffsetAfter.call(swiper);
      }

      const previousSnapGridLength = swiper.snapGrid.length;
      const previousSlidesGridLength = swiper.slidesGrid.length;
      let spaceBetween = params.spaceBetween;
      let slidePosition = -offsetBefore;
      let prevSlideSize = 0;
      let index = 0;

      if (typeof swiperSize === 'undefined') {
        return;
      }

      if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
        spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiperSize;
      }

      swiper.virtualSize = -spaceBetween; // reset margins

      if (rtl) slides.css({
        marginLeft: '',
        marginBottom: '',
        marginTop: ''
      });else slides.css({
        marginRight: '',
        marginBottom: '',
        marginTop: ''
      }); // reset cssMode offsets

      if (params.centeredSlides && params.cssMode) {
        setCSSProperty(swiper.wrapperEl, '--swiper-centered-offset-before', '');
        setCSSProperty(swiper.wrapperEl, '--swiper-centered-offset-after', '');
      }

      const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;

      if (gridEnabled) {
        swiper.grid.initSlides(slidesLength);
      } // Calc slides


      let slideSize;
      const shouldResetSlideSize = params.slidesPerView === 'auto' && params.breakpoints && Object.keys(params.breakpoints).filter(key => {
        return typeof params.breakpoints[key].slidesPerView !== 'undefined';
      }).length > 0;

      for (let i = 0; i < slidesLength; i += 1) {
        slideSize = 0;
        const slide = slides.eq(i);

        if (gridEnabled) {
          swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
        }

        if (slide.css('display') === 'none') continue; // eslint-disable-line

        if (params.slidesPerView === 'auto') {
          if (shouldResetSlideSize) {
            slides[i].style[getDirectionLabel('width')] = ``;
          }

          const slideStyles = getComputedStyle(slide[0]);
          const currentTransform = slide[0].style.transform;
          const currentWebKitTransform = slide[0].style.webkitTransform;

          if (currentTransform) {
            slide[0].style.transform = 'none';
          }

          if (currentWebKitTransform) {
            slide[0].style.webkitTransform = 'none';
          }

          if (params.roundLengths) {
            slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
          } else {
            // eslint-disable-next-line
            const width = getDirectionPropertyValue(slideStyles, 'width');
            const paddingLeft = getDirectionPropertyValue(slideStyles, 'padding-left');
            const paddingRight = getDirectionPropertyValue(slideStyles, 'padding-right');
            const marginLeft = getDirectionPropertyValue(slideStyles, 'margin-left');
            const marginRight = getDirectionPropertyValue(slideStyles, 'margin-right');
            const boxSizing = slideStyles.getPropertyValue('box-sizing');

            if (boxSizing && boxSizing === 'border-box') {
              slideSize = width + marginLeft + marginRight;
            } else {
              const {
                clientWidth,
                offsetWidth
              } = slide[0];
              slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
            }
          }

          if (currentTransform) {
            slide[0].style.transform = currentTransform;
          }

          if (currentWebKitTransform) {
            slide[0].style.webkitTransform = currentWebKitTransform;
          }

          if (params.roundLengths) slideSize = Math.floor(slideSize);
        } else {
          slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
          if (params.roundLengths) slideSize = Math.floor(slideSize);

          if (slides[i]) {
            slides[i].style[getDirectionLabel('width')] = `${slideSize}px`;
          }
        }

        if (slides[i]) {
          slides[i].swiperSlideSize = slideSize;
        }

        slidesSizesGrid.push(slideSize);

        if (params.centeredSlides) {
          slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
          if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
          if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
          if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
          if (params.roundLengths) slidePosition = Math.floor(slidePosition);
          if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
          slidesGrid.push(slidePosition);
        } else {
          if (params.roundLengths) slidePosition = Math.floor(slidePosition);
          if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
          slidesGrid.push(slidePosition);
          slidePosition = slidePosition + slideSize + spaceBetween;
        }

        swiper.virtualSize += slideSize + spaceBetween;
        prevSlideSize = slideSize;
        index += 1;
      }

      swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;

      if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
        $wrapperEl.css({
          width: `${swiper.virtualSize + params.spaceBetween}px`
        });
      }

      if (params.setWrapperSize) {
        $wrapperEl.css({
          [getDirectionLabel('width')]: `${swiper.virtualSize + params.spaceBetween}px`
        });
      }

      if (gridEnabled) {
        swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
      } // Remove last grid elements depending on width


      if (!params.centeredSlides) {
        const newSlidesGrid = [];

        for (let i = 0; i < snapGrid.length; i += 1) {
          let slidesGridItem = snapGrid[i];
          if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);

          if (snapGrid[i] <= swiper.virtualSize - swiperSize) {
            newSlidesGrid.push(slidesGridItem);
          }
        }

        snapGrid = newSlidesGrid;

        if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
          snapGrid.push(swiper.virtualSize - swiperSize);
        }
      }

      if (snapGrid.length === 0) snapGrid = [0];

      if (params.spaceBetween !== 0) {
        const key = swiper.isHorizontal() && rtl ? 'marginLeft' : getDirectionLabel('marginRight');
        slides.filter((_, slideIndex) => {
          if (!params.cssMode) return true;

          if (slideIndex === slides.length - 1) {
            return false;
          }

          return true;
        }).css({
          [key]: `${spaceBetween}px`
        });
      }

      if (params.centeredSlides && params.centeredSlidesBounds) {
        let allSlidesSize = 0;
        slidesSizesGrid.forEach(slideSizeValue => {
          allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
        });
        allSlidesSize -= params.spaceBetween;
        const maxSnap = allSlidesSize - swiperSize;
        snapGrid = snapGrid.map(snap => {
          if (snap < 0) return -offsetBefore;
          if (snap > maxSnap) return maxSnap + offsetAfter;
          return snap;
        });
      }

      if (params.centerInsufficientSlides) {
        let allSlidesSize = 0;
        slidesSizesGrid.forEach(slideSizeValue => {
          allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
        });
        allSlidesSize -= params.spaceBetween;

        if (allSlidesSize < swiperSize) {
          const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
          snapGrid.forEach((snap, snapIndex) => {
            snapGrid[snapIndex] = snap - allSlidesOffset;
          });
          slidesGrid.forEach((snap, snapIndex) => {
            slidesGrid[snapIndex] = snap + allSlidesOffset;
          });
        }
      }

      Object.assign(swiper, {
        slides,
        snapGrid,
        slidesGrid,
        slidesSizesGrid
      });

      if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
        setCSSProperty(swiper.wrapperEl, '--swiper-centered-offset-before', `${-snapGrid[0]}px`);
        setCSSProperty(swiper.wrapperEl, '--swiper-centered-offset-after', `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
        const addToSnapGrid = -swiper.snapGrid[0];
        const addToSlidesGrid = -swiper.slidesGrid[0];
        swiper.snapGrid = swiper.snapGrid.map(v => v + addToSnapGrid);
        swiper.slidesGrid = swiper.slidesGrid.map(v => v + addToSlidesGrid);
      }

      if (slidesLength !== previousSlidesLength) {
        swiper.emit('slidesLengthChange');
      }

      if (snapGrid.length !== previousSnapGridLength) {
        if (swiper.params.watchOverflow) swiper.checkOverflow();
        swiper.emit('snapGridLengthChange');
      }

      if (slidesGrid.length !== previousSlidesGridLength) {
        swiper.emit('slidesGridLengthChange');
      }

      if (params.watchSlidesProgress) {
        swiper.updateSlidesOffset();
      }

      if (!isVirtual && !params.cssMode && (params.effect === 'slide' || params.effect === 'fade')) {
        const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
        const hasClassBackfaceClassAdded = swiper.$el.hasClass(backFaceHiddenClass);

        if (slidesLength <= params.maxBackfaceHiddenSlides) {
          if (!hasClassBackfaceClassAdded) swiper.$el.addClass(backFaceHiddenClass);
        } else if (hasClassBackfaceClassAdded) {
          swiper.$el.removeClass(backFaceHiddenClass);
        }
      }
    }

    function updateAutoHeight(speed) {
      const swiper = this;
      const activeSlides = [];
      const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      let newHeight = 0;
      let i;

      if (typeof speed === 'number') {
        swiper.setTransition(speed);
      } else if (speed === true) {
        swiper.setTransition(swiper.params.speed);
      }

      const getSlideByIndex = index => {
        if (isVirtual) {
          return swiper.slides.filter(el => parseInt(el.getAttribute('data-swiper-slide-index'), 10) === index)[0];
        }

        return swiper.slides.eq(index)[0];
      }; // Find slides currently in view


      if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
        if (swiper.params.centeredSlides) {
          (swiper.visibleSlides || $([])).each(slide => {
            activeSlides.push(slide);
          });
        } else {
          for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
            const index = swiper.activeIndex + i;
            if (index > swiper.slides.length && !isVirtual) break;
            activeSlides.push(getSlideByIndex(index));
          }
        }
      } else {
        activeSlides.push(getSlideByIndex(swiper.activeIndex));
      } // Find new height from highest slide in view


      for (i = 0; i < activeSlides.length; i += 1) {
        if (typeof activeSlides[i] !== 'undefined') {
          const height = activeSlides[i].offsetHeight;
          newHeight = height > newHeight ? height : newHeight;
        }
      } // Update Height


      if (newHeight || newHeight === 0) swiper.$wrapperEl.css('height', `${newHeight}px`);
    }

    function updateSlidesOffset() {
      const swiper = this;
      const slides = swiper.slides;

      for (let i = 0; i < slides.length; i += 1) {
        slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
      }
    }

    function updateSlidesProgress(translate) {
      if (translate === void 0) {
        translate = this && this.translate || 0;
      }

      const swiper = this;
      const params = swiper.params;
      const {
        slides,
        rtlTranslate: rtl,
        snapGrid
      } = swiper;
      if (slides.length === 0) return;
      if (typeof slides[0].swiperSlideOffset === 'undefined') swiper.updateSlidesOffset();
      let offsetCenter = -translate;
      if (rtl) offsetCenter = translate; // Visible Slides

      slides.removeClass(params.slideVisibleClass);
      swiper.visibleSlidesIndexes = [];
      swiper.visibleSlides = [];

      for (let i = 0; i < slides.length; i += 1) {
        const slide = slides[i];
        let slideOffset = slide.swiperSlideOffset;

        if (params.cssMode && params.centeredSlides) {
          slideOffset -= slides[0].swiperSlideOffset;
        }

        const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
        const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
        const slideBefore = -(offsetCenter - slideOffset);
        const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
        const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;

        if (isVisible) {
          swiper.visibleSlides.push(slide);
          swiper.visibleSlidesIndexes.push(i);
          slides.eq(i).addClass(params.slideVisibleClass);
        }

        slide.progress = rtl ? -slideProgress : slideProgress;
        slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
      }

      swiper.visibleSlides = $(swiper.visibleSlides);
    }

    function updateProgress(translate) {
      const swiper = this;

      if (typeof translate === 'undefined') {
        const multiplier = swiper.rtlTranslate ? -1 : 1; // eslint-disable-next-line

        translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
      }

      const params = swiper.params;
      const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
      let {
        progress,
        isBeginning,
        isEnd
      } = swiper;
      const wasBeginning = isBeginning;
      const wasEnd = isEnd;

      if (translatesDiff === 0) {
        progress = 0;
        isBeginning = true;
        isEnd = true;
      } else {
        progress = (translate - swiper.minTranslate()) / translatesDiff;
        isBeginning = progress <= 0;
        isEnd = progress >= 1;
      }

      Object.assign(swiper, {
        progress,
        isBeginning,
        isEnd
      });
      if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);

      if (isBeginning && !wasBeginning) {
        swiper.emit('reachBeginning toEdge');
      }

      if (isEnd && !wasEnd) {
        swiper.emit('reachEnd toEdge');
      }

      if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
        swiper.emit('fromEdge');
      }

      swiper.emit('progress', progress);
    }

    function updateSlidesClasses() {
      const swiper = this;
      const {
        slides,
        params,
        $wrapperEl,
        activeIndex,
        realIndex
      } = swiper;
      const isVirtual = swiper.virtual && params.virtual.enabled;
      slides.removeClass(`${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`);
      let activeSlide;

      if (isVirtual) {
        activeSlide = swiper.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`);
      } else {
        activeSlide = slides.eq(activeIndex);
      } // Active classes


      activeSlide.addClass(params.slideActiveClass);

      if (params.loop) {
        // Duplicate to all looped slides
        if (activeSlide.hasClass(params.slideDuplicateClass)) {
          $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
        } else {
          $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
        }
      } // Next Slide


      let nextSlide = activeSlide.nextAll(`.${params.slideClass}`).eq(0).addClass(params.slideNextClass);

      if (params.loop && nextSlide.length === 0) {
        nextSlide = slides.eq(0);
        nextSlide.addClass(params.slideNextClass);
      } // Prev Slide


      let prevSlide = activeSlide.prevAll(`.${params.slideClass}`).eq(0).addClass(params.slidePrevClass);

      if (params.loop && prevSlide.length === 0) {
        prevSlide = slides.eq(-1);
        prevSlide.addClass(params.slidePrevClass);
      }

      if (params.loop) {
        // Duplicate to all looped slides
        if (nextSlide.hasClass(params.slideDuplicateClass)) {
          $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${nextSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicateNextClass);
        } else {
          $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${nextSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicateNextClass);
        }

        if (prevSlide.hasClass(params.slideDuplicateClass)) {
          $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${prevSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicatePrevClass);
        } else {
          $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${prevSlide.attr('data-swiper-slide-index')}"]`).addClass(params.slideDuplicatePrevClass);
        }
      }

      swiper.emitSlidesClasses();
    }

    function updateActiveIndex(newActiveIndex) {
      const swiper = this;
      const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
      const {
        slidesGrid,
        snapGrid,
        params,
        activeIndex: previousIndex,
        realIndex: previousRealIndex,
        snapIndex: previousSnapIndex
      } = swiper;
      let activeIndex = newActiveIndex;
      let snapIndex;

      if (typeof activeIndex === 'undefined') {
        for (let i = 0; i < slidesGrid.length; i += 1) {
          if (typeof slidesGrid[i + 1] !== 'undefined') {
            if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
              activeIndex = i;
            } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
              activeIndex = i + 1;
            }
          } else if (translate >= slidesGrid[i]) {
            activeIndex = i;
          }
        } // Normalize slideIndex


        if (params.normalizeSlideIndex) {
          if (activeIndex < 0 || typeof activeIndex === 'undefined') activeIndex = 0;
        }
      }

      if (snapGrid.indexOf(translate) >= 0) {
        snapIndex = snapGrid.indexOf(translate);
      } else {
        const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
        snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
      }

      if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

      if (activeIndex === previousIndex) {
        if (snapIndex !== previousSnapIndex) {
          swiper.snapIndex = snapIndex;
          swiper.emit('snapIndexChange');
        }

        return;
      } // Get real index


      const realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);
      Object.assign(swiper, {
        snapIndex,
        realIndex,
        previousIndex,
        activeIndex
      });
      swiper.emit('activeIndexChange');
      swiper.emit('snapIndexChange');

      if (previousRealIndex !== realIndex) {
        swiper.emit('realIndexChange');
      }

      if (swiper.initialized || swiper.params.runCallbacksOnInit) {
        swiper.emit('slideChange');
      }
    }

    function updateClickedSlide(e) {
      const swiper = this;
      const params = swiper.params;
      const slide = $(e).closest(`.${params.slideClass}`)[0];
      let slideFound = false;
      let slideIndex;

      if (slide) {
        for (let i = 0; i < swiper.slides.length; i += 1) {
          if (swiper.slides[i] === slide) {
            slideFound = true;
            slideIndex = i;
            break;
          }
        }
      }

      if (slide && slideFound) {
        swiper.clickedSlide = slide;

        if (swiper.virtual && swiper.params.virtual.enabled) {
          swiper.clickedIndex = parseInt($(slide).attr('data-swiper-slide-index'), 10);
        } else {
          swiper.clickedIndex = slideIndex;
        }
      } else {
        swiper.clickedSlide = undefined;
        swiper.clickedIndex = undefined;
        return;
      }

      if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
        swiper.slideToClickedSlide();
      }
    }

    var update = {
      updateSize,
      updateSlides,
      updateAutoHeight,
      updateSlidesOffset,
      updateSlidesProgress,
      updateProgress,
      updateSlidesClasses,
      updateActiveIndex,
      updateClickedSlide
    };

    function getSwiperTranslate(axis) {
      if (axis === void 0) {
        axis = this.isHorizontal() ? 'x' : 'y';
      }

      const swiper = this;
      const {
        params,
        rtlTranslate: rtl,
        translate,
        $wrapperEl
      } = swiper;

      if (params.virtualTranslate) {
        return rtl ? -translate : translate;
      }

      if (params.cssMode) {
        return translate;
      }

      let currentTranslate = getTranslate($wrapperEl[0], axis);
      if (rtl) currentTranslate = -currentTranslate;
      return currentTranslate || 0;
    }

    function setTranslate(translate, byController) {
      const swiper = this;
      const {
        rtlTranslate: rtl,
        params,
        $wrapperEl,
        wrapperEl,
        progress
      } = swiper;
      let x = 0;
      let y = 0;
      const z = 0;

      if (swiper.isHorizontal()) {
        x = rtl ? -translate : translate;
      } else {
        y = translate;
      }

      if (params.roundLengths) {
        x = Math.floor(x);
        y = Math.floor(y);
      }

      if (params.cssMode) {
        wrapperEl[swiper.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = swiper.isHorizontal() ? -x : -y;
      } else if (!params.virtualTranslate) {
        $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
      }

      swiper.previousTranslate = swiper.translate;
      swiper.translate = swiper.isHorizontal() ? x : y; // Check if we need to update progress

      let newProgress;
      const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

      if (translatesDiff === 0) {
        newProgress = 0;
      } else {
        newProgress = (translate - swiper.minTranslate()) / translatesDiff;
      }

      if (newProgress !== progress) {
        swiper.updateProgress(translate);
      }

      swiper.emit('setTranslate', swiper.translate, byController);
    }

    function minTranslate() {
      return -this.snapGrid[0];
    }

    function maxTranslate() {
      return -this.snapGrid[this.snapGrid.length - 1];
    }

    function translateTo(translate, speed, runCallbacks, translateBounds, internal) {
      if (translate === void 0) {
        translate = 0;
      }

      if (speed === void 0) {
        speed = this.params.speed;
      }

      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      if (translateBounds === void 0) {
        translateBounds = true;
      }

      const swiper = this;
      const {
        params,
        wrapperEl
      } = swiper;

      if (swiper.animating && params.preventInteractionOnTransition) {
        return false;
      }

      const minTranslate = swiper.minTranslate();
      const maxTranslate = swiper.maxTranslate();
      let newTranslate;
      if (translateBounds && translate > minTranslate) newTranslate = minTranslate;else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate;else newTranslate = translate; // Update progress

      swiper.updateProgress(newTranslate);

      if (params.cssMode) {
        const isH = swiper.isHorizontal();

        if (speed === 0) {
          wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
        } else {
          if (!swiper.support.smoothScroll) {
            animateCSSModeScroll({
              swiper,
              targetPosition: -newTranslate,
              side: isH ? 'left' : 'top'
            });
            return true;
          }

          wrapperEl.scrollTo({
            [isH ? 'left' : 'top']: -newTranslate,
            behavior: 'smooth'
          });
        }

        return true;
      }

      if (speed === 0) {
        swiper.setTransition(0);
        swiper.setTranslate(newTranslate);

        if (runCallbacks) {
          swiper.emit('beforeTransitionStart', speed, internal);
          swiper.emit('transitionEnd');
        }
      } else {
        swiper.setTransition(speed);
        swiper.setTranslate(newTranslate);

        if (runCallbacks) {
          swiper.emit('beforeTransitionStart', speed, internal);
          swiper.emit('transitionStart');
        }

        if (!swiper.animating) {
          swiper.animating = true;

          if (!swiper.onTranslateToWrapperTransitionEnd) {
            swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
              if (!swiper || swiper.destroyed) return;
              if (e.target !== this) return;
              swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
              swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);
              swiper.onTranslateToWrapperTransitionEnd = null;
              delete swiper.onTranslateToWrapperTransitionEnd;

              if (runCallbacks) {
                swiper.emit('transitionEnd');
              }
            };
          }

          swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
          swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);
        }
      }

      return true;
    }

    var translate = {
      getTranslate: getSwiperTranslate,
      setTranslate,
      minTranslate,
      maxTranslate,
      translateTo
    };

    function setTransition(duration, byController) {
      const swiper = this;

      if (!swiper.params.cssMode) {
        swiper.$wrapperEl.transition(duration);
      }

      swiper.emit('setTransition', duration, byController);
    }

    function transitionEmit(_ref) {
      let {
        swiper,
        runCallbacks,
        direction,
        step
      } = _ref;
      const {
        activeIndex,
        previousIndex
      } = swiper;
      let dir = direction;

      if (!dir) {
        if (activeIndex > previousIndex) dir = 'next';else if (activeIndex < previousIndex) dir = 'prev';else dir = 'reset';
      }

      swiper.emit(`transition${step}`);

      if (runCallbacks && activeIndex !== previousIndex) {
        if (dir === 'reset') {
          swiper.emit(`slideResetTransition${step}`);
          return;
        }

        swiper.emit(`slideChangeTransition${step}`);

        if (dir === 'next') {
          swiper.emit(`slideNextTransition${step}`);
        } else {
          swiper.emit(`slidePrevTransition${step}`);
        }
      }
    }

    function transitionStart(runCallbacks, direction) {
      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      const swiper = this;
      const {
        params
      } = swiper;
      if (params.cssMode) return;

      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }

      transitionEmit({
        swiper,
        runCallbacks,
        direction,
        step: 'Start'
      });
    }

    function transitionEnd(runCallbacks, direction) {
      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      const swiper = this;
      const {
        params
      } = swiper;
      swiper.animating = false;
      if (params.cssMode) return;
      swiper.setTransition(0);
      transitionEmit({
        swiper,
        runCallbacks,
        direction,
        step: 'End'
      });
    }

    var transition = {
      setTransition,
      transitionStart,
      transitionEnd
    };

    function slideTo(index, speed, runCallbacks, internal, initial) {
      if (index === void 0) {
        index = 0;
      }

      if (speed === void 0) {
        speed = this.params.speed;
      }

      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      if (typeof index !== 'number' && typeof index !== 'string') {
        throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index}] given.`);
      }

      if (typeof index === 'string') {
        /**
         * The `index` argument converted from `string` to `number`.
         * @type {number}
         */
        const indexAsNumber = parseInt(index, 10);
        /**
         * Determines whether the `index` argument is a valid `number`
         * after being converted from the `string` type.
         * @type {boolean}
         */

        const isValidNumber = isFinite(indexAsNumber);

        if (!isValidNumber) {
          throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
        } // Knowing that the converted `index` is a valid number,
        // we can update the original argument's value.


        index = indexAsNumber;
      }

      const swiper = this;
      let slideIndex = index;
      if (slideIndex < 0) slideIndex = 0;
      const {
        params,
        snapGrid,
        slidesGrid,
        previousIndex,
        activeIndex,
        rtlTranslate: rtl,
        wrapperEl,
        enabled
      } = swiper;

      if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) {
        return false;
      }

      const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
      let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
      if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

      if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
        swiper.emit('beforeSlideChangeStart');
      }

      const translate = -snapGrid[snapIndex]; // Update progress

      swiper.updateProgress(translate); // Normalize slideIndex

      if (params.normalizeSlideIndex) {
        for (let i = 0; i < slidesGrid.length; i += 1) {
          const normalizedTranslate = -Math.floor(translate * 100);
          const normalizedGrid = Math.floor(slidesGrid[i] * 100);
          const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);

          if (typeof slidesGrid[i + 1] !== 'undefined') {
            if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
              slideIndex = i;
            } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
              slideIndex = i + 1;
            }
          } else if (normalizedTranslate >= normalizedGrid) {
            slideIndex = i;
          }
        }
      } // Directions locks


      if (swiper.initialized && slideIndex !== activeIndex) {
        if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
          return false;
        }

        if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
          if ((activeIndex || 0) !== slideIndex) return false;
        }
      }

      let direction;
      if (slideIndex > activeIndex) direction = 'next';else if (slideIndex < activeIndex) direction = 'prev';else direction = 'reset'; // Update Index

      if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
        swiper.updateActiveIndex(slideIndex); // Update Height

        if (params.autoHeight) {
          swiper.updateAutoHeight();
        }

        swiper.updateSlidesClasses();

        if (params.effect !== 'slide') {
          swiper.setTranslate(translate);
        }

        if (direction !== 'reset') {
          swiper.transitionStart(runCallbacks, direction);
          swiper.transitionEnd(runCallbacks, direction);
        }

        return false;
      }

      if (params.cssMode) {
        const isH = swiper.isHorizontal();
        const t = rtl ? translate : -translate;

        if (speed === 0) {
          const isVirtual = swiper.virtual && swiper.params.virtual.enabled;

          if (isVirtual) {
            swiper.wrapperEl.style.scrollSnapType = 'none';
            swiper._immediateVirtual = true;
          }

          wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;

          if (isVirtual) {
            requestAnimationFrame(() => {
              swiper.wrapperEl.style.scrollSnapType = '';
              swiper._swiperImmediateVirtual = false;
            });
          }
        } else {
          if (!swiper.support.smoothScroll) {
            animateCSSModeScroll({
              swiper,
              targetPosition: t,
              side: isH ? 'left' : 'top'
            });
            return true;
          }

          wrapperEl.scrollTo({
            [isH ? 'left' : 'top']: t,
            behavior: 'smooth'
          });
        }

        return true;
      }

      swiper.setTransition(speed);
      swiper.setTranslate(translate);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.transitionStart(runCallbacks, direction);

      if (speed === 0) {
        swiper.transitionEnd(runCallbacks, direction);
      } else if (!swiper.animating) {
        swiper.animating = true;

        if (!swiper.onSlideToWrapperTransitionEnd) {
          swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
            if (!swiper || swiper.destroyed) return;
            if (e.target !== this) return;
            swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
            swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
            swiper.onSlideToWrapperTransitionEnd = null;
            delete swiper.onSlideToWrapperTransitionEnd;
            swiper.transitionEnd(runCallbacks, direction);
          };
        }

        swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
        swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
      }

      return true;
    }

    function slideToLoop(index, speed, runCallbacks, internal) {
      if (index === void 0) {
        index = 0;
      }

      if (speed === void 0) {
        speed = this.params.speed;
      }

      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      if (typeof index === 'string') {
        /**
         * The `index` argument converted from `string` to `number`.
         * @type {number}
         */
        const indexAsNumber = parseInt(index, 10);
        /**
         * Determines whether the `index` argument is a valid `number`
         * after being converted from the `string` type.
         * @type {boolean}
         */

        const isValidNumber = isFinite(indexAsNumber);

        if (!isValidNumber) {
          throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
        } // Knowing that the converted `index` is a valid number,
        // we can update the original argument's value.


        index = indexAsNumber;
      }

      const swiper = this;
      let newIndex = index;

      if (swiper.params.loop) {
        newIndex += swiper.loopedSlides;
      }

      return swiper.slideTo(newIndex, speed, runCallbacks, internal);
    }

    /* eslint no-unused-vars: "off" */
    function slideNext(speed, runCallbacks, internal) {
      if (speed === void 0) {
        speed = this.params.speed;
      }

      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      const swiper = this;
      const {
        animating,
        enabled,
        params
      } = swiper;
      if (!enabled) return swiper;
      let perGroup = params.slidesPerGroup;

      if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
        perGroup = Math.max(swiper.slidesPerViewDynamic('current', true), 1);
      }

      const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;

      if (params.loop) {
        if (animating && params.loopPreventsSlide) return false;
        swiper.loopFix(); // eslint-disable-next-line

        swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
      }

      if (params.rewind && swiper.isEnd) {
        return swiper.slideTo(0, speed, runCallbacks, internal);
      }

      return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
    }

    /* eslint no-unused-vars: "off" */
    function slidePrev(speed, runCallbacks, internal) {
      if (speed === void 0) {
        speed = this.params.speed;
      }

      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      const swiper = this;
      const {
        params,
        animating,
        snapGrid,
        slidesGrid,
        rtlTranslate,
        enabled
      } = swiper;
      if (!enabled) return swiper;

      if (params.loop) {
        if (animating && params.loopPreventsSlide) return false;
        swiper.loopFix(); // eslint-disable-next-line

        swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
      }

      const translate = rtlTranslate ? swiper.translate : -swiper.translate;

      function normalize(val) {
        if (val < 0) return -Math.floor(Math.abs(val));
        return Math.floor(val);
      }

      const normalizedTranslate = normalize(translate);
      const normalizedSnapGrid = snapGrid.map(val => normalize(val));
      let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];

      if (typeof prevSnap === 'undefined' && params.cssMode) {
        let prevSnapIndex;
        snapGrid.forEach((snap, snapIndex) => {
          if (normalizedTranslate >= snap) {
            // prevSnap = snap;
            prevSnapIndex = snapIndex;
          }
        });

        if (typeof prevSnapIndex !== 'undefined') {
          prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
        }
      }

      let prevIndex = 0;

      if (typeof prevSnap !== 'undefined') {
        prevIndex = slidesGrid.indexOf(prevSnap);
        if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;

        if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
          prevIndex = prevIndex - swiper.slidesPerViewDynamic('previous', true) + 1;
          prevIndex = Math.max(prevIndex, 0);
        }
      }

      if (params.rewind && swiper.isBeginning) {
        const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
        return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
      }

      return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
    }

    /* eslint no-unused-vars: "off" */
    function slideReset(speed, runCallbacks, internal) {
      if (speed === void 0) {
        speed = this.params.speed;
      }

      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      const swiper = this;
      return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
    }

    /* eslint no-unused-vars: "off" */
    function slideToClosest(speed, runCallbacks, internal, threshold) {
      if (speed === void 0) {
        speed = this.params.speed;
      }

      if (runCallbacks === void 0) {
        runCallbacks = true;
      }

      if (threshold === void 0) {
        threshold = 0.5;
      }

      const swiper = this;
      let index = swiper.activeIndex;
      const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
      const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
      const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;

      if (translate >= swiper.snapGrid[snapIndex]) {
        // The current translate is on or after the current snap index, so the choice
        // is between the current index and the one after it.
        const currentSnap = swiper.snapGrid[snapIndex];
        const nextSnap = swiper.snapGrid[snapIndex + 1];

        if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {
          index += swiper.params.slidesPerGroup;
        }
      } else {
        // The current translate is before the current snap index, so the choice
        // is between the current index and the one before it.
        const prevSnap = swiper.snapGrid[snapIndex - 1];
        const currentSnap = swiper.snapGrid[snapIndex];

        if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) {
          index -= swiper.params.slidesPerGroup;
        }
      }

      index = Math.max(index, 0);
      index = Math.min(index, swiper.slidesGrid.length - 1);
      return swiper.slideTo(index, speed, runCallbacks, internal);
    }

    function slideToClickedSlide() {
      const swiper = this;
      const {
        params,
        $wrapperEl
      } = swiper;
      const slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
      let slideToIndex = swiper.clickedIndex;
      let realIndex;

      if (params.loop) {
        if (swiper.animating) return;
        realIndex = parseInt($(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);

        if (params.centeredSlides) {
          if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
            swiper.loopFix();
            slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
            nextTick(() => {
              swiper.slideTo(slideToIndex);
            });
          } else {
            swiper.slideTo(slideToIndex);
          }
        } else if (slideToIndex > swiper.slides.length - slidesPerView) {
          swiper.loopFix();
          slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
          nextTick(() => {
            swiper.slideTo(slideToIndex);
          });
        } else {
          swiper.slideTo(slideToIndex);
        }
      } else {
        swiper.slideTo(slideToIndex);
      }
    }

    var slide = {
      slideTo,
      slideToLoop,
      slideNext,
      slidePrev,
      slideReset,
      slideToClosest,
      slideToClickedSlide
    };

    function loopCreate() {
      const swiper = this;
      const document = getDocument();
      const {
        params,
        $wrapperEl
      } = swiper; // Remove duplicated slides

      const $selector = $wrapperEl.children().length > 0 ? $($wrapperEl.children()[0].parentNode) : $wrapperEl;
      $selector.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();
      let slides = $selector.children(`.${params.slideClass}`);

      if (params.loopFillGroupWithBlank) {
        const blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;

        if (blankSlidesNum !== params.slidesPerGroup) {
          for (let i = 0; i < blankSlidesNum; i += 1) {
            const blankNode = $(document.createElement('div')).addClass(`${params.slideClass} ${params.slideBlankClass}`);
            $selector.append(blankNode);
          }

          slides = $selector.children(`.${params.slideClass}`);
        }
      }

      if (params.slidesPerView === 'auto' && !params.loopedSlides) params.loopedSlides = slides.length;
      swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
      swiper.loopedSlides += params.loopAdditionalSlides;

      if (swiper.loopedSlides > slides.length) {
        swiper.loopedSlides = slides.length;
      }

      const prependSlides = [];
      const appendSlides = [];
      slides.each((el, index) => {
        const slide = $(el);

        if (index < swiper.loopedSlides) {
          appendSlides.push(el);
        }

        if (index < slides.length && index >= slides.length - swiper.loopedSlides) {
          prependSlides.push(el);
        }

        slide.attr('data-swiper-slide-index', index);
      });

      for (let i = 0; i < appendSlides.length; i += 1) {
        $selector.append($(appendSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
      }

      for (let i = prependSlides.length - 1; i >= 0; i -= 1) {
        $selector.prepend($(prependSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
      }
    }

    function loopFix() {
      const swiper = this;
      swiper.emit('beforeLoopFix');
      const {
        activeIndex,
        slides,
        loopedSlides,
        allowSlidePrev,
        allowSlideNext,
        snapGrid,
        rtlTranslate: rtl
      } = swiper;
      let newIndex;
      swiper.allowSlidePrev = true;
      swiper.allowSlideNext = true;
      const snapTranslate = -snapGrid[activeIndex];
      const diff = snapTranslate - swiper.getTranslate(); // Fix For Negative Oversliding

      if (activeIndex < loopedSlides) {
        newIndex = slides.length - loopedSlides * 3 + activeIndex;
        newIndex += loopedSlides;
        const slideChanged = swiper.slideTo(newIndex, 0, false, true);

        if (slideChanged && diff !== 0) {
          swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
        }
      } else if (activeIndex >= slides.length - loopedSlides) {
        // Fix For Positive Oversliding
        newIndex = -slides.length + activeIndex + loopedSlides;
        newIndex += loopedSlides;
        const slideChanged = swiper.slideTo(newIndex, 0, false, true);

        if (slideChanged && diff !== 0) {
          swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
        }
      }

      swiper.allowSlidePrev = allowSlidePrev;
      swiper.allowSlideNext = allowSlideNext;
      swiper.emit('loopFix');
    }

    function loopDestroy() {
      const swiper = this;
      const {
        $wrapperEl,
        params,
        slides
      } = swiper;
      $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`).remove();
      slides.removeAttr('data-swiper-slide-index');
    }

    var loop = {
      loopCreate,
      loopFix,
      loopDestroy
    };

    function setGrabCursor(moving) {
      const swiper = this;
      if (swiper.support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
      const el = swiper.params.touchEventsTarget === 'container' ? swiper.el : swiper.wrapperEl;
      el.style.cursor = 'move';
      el.style.cursor = moving ? 'grabbing' : 'grab';
    }

    function unsetGrabCursor() {
      const swiper = this;

      if (swiper.support.touch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
        return;
      }

      swiper[swiper.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'].style.cursor = '';
    }

    var grabCursor = {
      setGrabCursor,
      unsetGrabCursor
    };

    function closestElement(selector, base) {
      if (base === void 0) {
        base = this;
      }

      function __closestFrom(el) {
        if (!el || el === getDocument() || el === getWindow()) return null;
        if (el.assignedSlot) el = el.assignedSlot;
        const found = el.closest(selector);

        if (!found && !el.getRootNode) {
          return null;
        }

        return found || __closestFrom(el.getRootNode().host);
      }

      return __closestFrom(base);
    }

    function onTouchStart(event) {
      const swiper = this;
      const document = getDocument();
      const window = getWindow();
      const data = swiper.touchEventsData;
      const {
        params,
        touches,
        enabled
      } = swiper;
      if (!enabled) return;

      if (swiper.animating && params.preventInteractionOnTransition) {
        return;
      }

      if (!swiper.animating && params.cssMode && params.loop) {
        swiper.loopFix();
      }

      let e = event;
      if (e.originalEvent) e = e.originalEvent;
      let $targetEl = $(e.target);

      if (params.touchEventsTarget === 'wrapper') {
        if (!$targetEl.closest(swiper.wrapperEl).length) return;
      }

      data.isTouchEvent = e.type === 'touchstart';
      if (!data.isTouchEvent && 'which' in e && e.which === 3) return;
      if (!data.isTouchEvent && 'button' in e && e.button > 0) return;
      if (data.isTouched && data.isMoved) return; // change target el for shadow root component

      const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== '';

      if (swipingClassHasValue && e.target && e.target.shadowRoot && event.path && event.path[0]) {
        $targetEl = $(event.path[0]);
      }

      const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
      const isTargetShadow = !!(e.target && e.target.shadowRoot); // use closestElement for shadow root element to get the actual closest for nested shadow root element

      if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, $targetEl[0]) : $targetEl.closest(noSwipingSelector)[0])) {
        swiper.allowClick = true;
        return;
      }

      if (params.swipeHandler) {
        if (!$targetEl.closest(params.swipeHandler)[0]) return;
      }

      touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      const startX = touches.currentX;
      const startY = touches.currentY; // Do NOT start if iOS edge swipe is detected. Otherwise iOS app cannot swipe-to-go-back anymore

      const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
      const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;

      if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) {
        if (edgeSwipeDetection === 'prevent') {
          event.preventDefault();
        } else {
          return;
        }
      }

      Object.assign(data, {
        isTouched: true,
        isMoved: false,
        allowTouchCallbacks: true,
        isScrolling: undefined,
        startMoving: undefined
      });
      touches.startX = startX;
      touches.startY = startY;
      data.touchStartTime = now();
      swiper.allowClick = true;
      swiper.updateSize();
      swiper.swipeDirection = undefined;
      if (params.threshold > 0) data.allowThresholdMove = false;

      if (e.type !== 'touchstart') {
        let preventDefault = true;

        if ($targetEl.is(data.focusableElements)) {
          preventDefault = false;

          if ($targetEl[0].nodeName === 'SELECT') {
            data.isTouched = false;
          }
        }

        if (document.activeElement && $(document.activeElement).is(data.focusableElements) && document.activeElement !== $targetEl[0]) {
          document.activeElement.blur();
        }

        const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;

        if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !$targetEl[0].isContentEditable) {
          e.preventDefault();
        }
      }

      if (swiper.params.freeMode && swiper.params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
        swiper.freeMode.onTouchStart();
      }

      swiper.emit('touchStart', e);
    }

    function onTouchMove(event) {
      const document = getDocument();
      const swiper = this;
      const data = swiper.touchEventsData;
      const {
        params,
        touches,
        rtlTranslate: rtl,
        enabled
      } = swiper;
      if (!enabled) return;
      let e = event;
      if (e.originalEvent) e = e.originalEvent;

      if (!data.isTouched) {
        if (data.startMoving && data.isScrolling) {
          swiper.emit('touchMoveOpposite', e);
        }

        return;
      }

      if (data.isTouchEvent && e.type !== 'touchmove') return;
      const targetTouch = e.type === 'touchmove' && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
      const pageX = e.type === 'touchmove' ? targetTouch.pageX : e.pageX;
      const pageY = e.type === 'touchmove' ? targetTouch.pageY : e.pageY;

      if (e.preventedByNestedSwiper) {
        touches.startX = pageX;
        touches.startY = pageY;
        return;
      }

      if (!swiper.allowTouchMove) {
        if (!$(e.target).is(data.focusableElements)) {
          swiper.allowClick = false;
        }

        if (data.isTouched) {
          Object.assign(touches, {
            startX: pageX,
            startY: pageY,
            currentX: pageX,
            currentY: pageY
          });
          data.touchStartTime = now();
        }

        return;
      }

      if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
        if (swiper.isVertical()) {
          // Vertical
          if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
            data.isTouched = false;
            data.isMoved = false;
            return;
          }
        } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
          return;
        }
      }

      if (data.isTouchEvent && document.activeElement) {
        if (e.target === document.activeElement && $(e.target).is(data.focusableElements)) {
          data.isMoved = true;
          swiper.allowClick = false;
          return;
        }
      }

      if (data.allowTouchCallbacks) {
        swiper.emit('touchMove', e);
      }

      if (e.targetTouches && e.targetTouches.length > 1) return;
      touches.currentX = pageX;
      touches.currentY = pageY;
      const diffX = touches.currentX - touches.startX;
      const diffY = touches.currentY - touches.startY;
      if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;

      if (typeof data.isScrolling === 'undefined') {
        let touchAngle;

        if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
          data.isScrolling = false;
        } else {
          // eslint-disable-next-line
          if (diffX * diffX + diffY * diffY >= 25) {
            touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
            data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
          }
        }
      }

      if (data.isScrolling) {
        swiper.emit('touchMoveOpposite', e);
      }

      if (typeof data.startMoving === 'undefined') {
        if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
          data.startMoving = true;
        }
      }

      if (data.isScrolling) {
        data.isTouched = false;
        return;
      }

      if (!data.startMoving) {
        return;
      }

      swiper.allowClick = false;

      if (!params.cssMode && e.cancelable) {
        e.preventDefault();
      }

      if (params.touchMoveStopPropagation && !params.nested) {
        e.stopPropagation();
      }

      if (!data.isMoved) {
        if (params.loop && !params.cssMode) {
          swiper.loopFix();
        }

        data.startTranslate = swiper.getTranslate();
        swiper.setTransition(0);

        if (swiper.animating) {
          swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');
        }

        data.allowMomentumBounce = false; // Grab Cursor

        if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
          swiper.setGrabCursor(true);
        }

        swiper.emit('sliderFirstMove', e);
      }

      swiper.emit('sliderMove', e);
      data.isMoved = true;
      let diff = swiper.isHorizontal() ? diffX : diffY;
      touches.diff = diff;
      diff *= params.touchRatio;
      if (rtl) diff = -diff;
      swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
      data.currentTranslate = diff + data.startTranslate;
      let disableParentSwiper = true;
      let resistanceRatio = params.resistanceRatio;

      if (params.touchReleaseOnEdges) {
        resistanceRatio = 0;
      }

      if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
        disableParentSwiper = false;
        if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
      } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
        disableParentSwiper = false;
        if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
      }

      if (disableParentSwiper) {
        e.preventedByNestedSwiper = true;
      } // Directions locks


      if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
        data.currentTranslate = data.startTranslate;
      }

      if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
        data.currentTranslate = data.startTranslate;
      }

      if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
        data.currentTranslate = data.startTranslate;
      } // Threshold


      if (params.threshold > 0) {
        if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
          if (!data.allowThresholdMove) {
            data.allowThresholdMove = true;
            touches.startX = touches.currentX;
            touches.startY = touches.currentY;
            data.currentTranslate = data.startTranslate;
            touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
            return;
          }
        } else {
          data.currentTranslate = data.startTranslate;
          return;
        }
      }

      if (!params.followFinger || params.cssMode) return; // Update active index in free mode

      if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }

      if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) {
        swiper.freeMode.onTouchMove();
      } // Update progress


      swiper.updateProgress(data.currentTranslate); // Update translate

      swiper.setTranslate(data.currentTranslate);
    }

    function onTouchEnd(event) {
      const swiper = this;
      const data = swiper.touchEventsData;
      const {
        params,
        touches,
        rtlTranslate: rtl,
        slidesGrid,
        enabled
      } = swiper;
      if (!enabled) return;
      let e = event;
      if (e.originalEvent) e = e.originalEvent;

      if (data.allowTouchCallbacks) {
        swiper.emit('touchEnd', e);
      }

      data.allowTouchCallbacks = false;

      if (!data.isTouched) {
        if (data.isMoved && params.grabCursor) {
          swiper.setGrabCursor(false);
        }

        data.isMoved = false;
        data.startMoving = false;
        return;
      } // Return Grab Cursor


      if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
        swiper.setGrabCursor(false);
      } // Time diff


      const touchEndTime = now();
      const timeDiff = touchEndTime - data.touchStartTime; // Tap, doubleTap, Click

      if (swiper.allowClick) {
        const pathTree = e.path || e.composedPath && e.composedPath();
        swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
        swiper.emit('tap click', e);

        if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
          swiper.emit('doubleTap doubleClick', e);
        }
      }

      data.lastClickTime = now();
      nextTick(() => {
        if (!swiper.destroyed) swiper.allowClick = true;
      });

      if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
        data.isTouched = false;
        data.isMoved = false;
        data.startMoving = false;
        return;
      }

      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;
      let currentPos;

      if (params.followFinger) {
        currentPos = rtl ? swiper.translate : -swiper.translate;
      } else {
        currentPos = -data.currentTranslate;
      }

      if (params.cssMode) {
        return;
      }

      if (swiper.params.freeMode && params.freeMode.enabled) {
        swiper.freeMode.onTouchEnd({
          currentPos
        });
        return;
      } // Find current slide


      let stopIndex = 0;
      let groupSize = swiper.slidesSizesGrid[0];

      for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
        const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;

        if (typeof slidesGrid[i + increment] !== 'undefined') {
          if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
            stopIndex = i;
            groupSize = slidesGrid[i + increment] - slidesGrid[i];
          }
        } else if (currentPos >= slidesGrid[i]) {
          stopIndex = i;
          groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
        }
      }

      let rewindFirstIndex = null;
      let rewindLastIndex = null;

      if (params.rewind) {
        if (swiper.isBeginning) {
          rewindLastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
        } else if (swiper.isEnd) {
          rewindFirstIndex = 0;
        }
      } // Find current slide size


      const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
      const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;

      if (timeDiff > params.longSwipesMs) {
        // Long touches
        if (!params.longSwipes) {
          swiper.slideTo(swiper.activeIndex);
          return;
        }

        if (swiper.swipeDirection === 'next') {
          if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);else swiper.slideTo(stopIndex);
        }

        if (swiper.swipeDirection === 'prev') {
          if (ratio > 1 - params.longSwipesRatio) {
            swiper.slideTo(stopIndex + increment);
          } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
            swiper.slideTo(rewindLastIndex);
          } else {
            swiper.slideTo(stopIndex);
          }
        }
      } else {
        // Short swipes
        if (!params.shortSwipes) {
          swiper.slideTo(swiper.activeIndex);
          return;
        }

        const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);

        if (!isNavButtonTarget) {
          if (swiper.swipeDirection === 'next') {
            swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
          }

          if (swiper.swipeDirection === 'prev') {
            swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
          }
        } else if (e.target === swiper.navigation.nextEl) {
          swiper.slideTo(stopIndex + increment);
        } else {
          swiper.slideTo(stopIndex);
        }
      }
    }

    function onResize() {
      const swiper = this;
      const {
        params,
        el
      } = swiper;
      if (el && el.offsetWidth === 0) return; // Breakpoints

      if (params.breakpoints) {
        swiper.setBreakpoint();
      } // Save locks


      const {
        allowSlideNext,
        allowSlidePrev,
        snapGrid
      } = swiper; // Disable locks on resize

      swiper.allowSlideNext = true;
      swiper.allowSlidePrev = true;
      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateSlidesClasses();

      if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides) {
        swiper.slideTo(swiper.slides.length - 1, 0, false, true);
      } else {
        swiper.slideTo(swiper.activeIndex, 0, false, true);
      }

      if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
        swiper.autoplay.run();
      } // Return locks after resize


      swiper.allowSlidePrev = allowSlidePrev;
      swiper.allowSlideNext = allowSlideNext;

      if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
        swiper.checkOverflow();
      }
    }

    function onClick(e) {
      const swiper = this;
      if (!swiper.enabled) return;

      if (!swiper.allowClick) {
        if (swiper.params.preventClicks) e.preventDefault();

        if (swiper.params.preventClicksPropagation && swiper.animating) {
          e.stopPropagation();
          e.stopImmediatePropagation();
        }
      }
    }

    function onScroll() {
      const swiper = this;
      const {
        wrapperEl,
        rtlTranslate,
        enabled
      } = swiper;
      if (!enabled) return;
      swiper.previousTranslate = swiper.translate;

      if (swiper.isHorizontal()) {
        swiper.translate = -wrapperEl.scrollLeft;
      } else {
        swiper.translate = -wrapperEl.scrollTop;
      } // eslint-disable-next-line


      if (swiper.translate === 0) swiper.translate = 0;
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
      let newProgress;
      const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

      if (translatesDiff === 0) {
        newProgress = 0;
      } else {
        newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
      }

      if (newProgress !== swiper.progress) {
        swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
      }

      swiper.emit('setTranslate', swiper.translate, false);
    }

    let dummyEventAttached = false;

    function dummyEventListener() {}

    const events = (swiper, method) => {
      const document = getDocument();
      const {
        params,
        touchEvents,
        el,
        wrapperEl,
        device,
        support
      } = swiper;
      const capture = !!params.nested;
      const domMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
      const swiperMethod = method; // Touch Events

      if (!support.touch) {
        el[domMethod](touchEvents.start, swiper.onTouchStart, false);
        document[domMethod](touchEvents.move, swiper.onTouchMove, capture);
        document[domMethod](touchEvents.end, swiper.onTouchEnd, false);
      } else {
        const passiveListener = touchEvents.start === 'touchstart' && support.passiveListener && params.passiveListeners ? {
          passive: true,
          capture: false
        } : false;
        el[domMethod](touchEvents.start, swiper.onTouchStart, passiveListener);
        el[domMethod](touchEvents.move, swiper.onTouchMove, support.passiveListener ? {
          passive: false,
          capture
        } : capture);
        el[domMethod](touchEvents.end, swiper.onTouchEnd, passiveListener);

        if (touchEvents.cancel) {
          el[domMethod](touchEvents.cancel, swiper.onTouchEnd, passiveListener);
        }
      } // Prevent Links Clicks


      if (params.preventClicks || params.preventClicksPropagation) {
        el[domMethod]('click', swiper.onClick, true);
      }

      if (params.cssMode) {
        wrapperEl[domMethod]('scroll', swiper.onScroll);
      } // Resize handler


      if (params.updateOnWindowResize) {
        swiper[swiperMethod](device.ios || device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', onResize, true);
      } else {
        swiper[swiperMethod]('observerUpdate', onResize, true);
      }
    };

    function attachEvents() {
      const swiper = this;
      const document = getDocument();
      const {
        params,
        support
      } = swiper;
      swiper.onTouchStart = onTouchStart.bind(swiper);
      swiper.onTouchMove = onTouchMove.bind(swiper);
      swiper.onTouchEnd = onTouchEnd.bind(swiper);

      if (params.cssMode) {
        swiper.onScroll = onScroll.bind(swiper);
      }

      swiper.onClick = onClick.bind(swiper);

      if (support.touch && !dummyEventAttached) {
        document.addEventListener('touchstart', dummyEventListener);
        dummyEventAttached = true;
      }

      events(swiper, 'on');
    }

    function detachEvents() {
      const swiper = this;
      events(swiper, 'off');
    }

    var events$1 = {
      attachEvents,
      detachEvents
    };

    const isGridEnabled = (swiper, params) => {
      return swiper.grid && params.grid && params.grid.rows > 1;
    };

    function setBreakpoint() {
      const swiper = this;
      const {
        activeIndex,
        initialized,
        loopedSlides = 0,
        params,
        $el
      } = swiper;
      const breakpoints = params.breakpoints;
      if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return; // Get breakpoint for window width and update parameters

      const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
      if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
      const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;
      const breakpointParams = breakpointOnlyParams || swiper.originalParams;
      const wasMultiRow = isGridEnabled(swiper, params);
      const isMultiRow = isGridEnabled(swiper, breakpointParams);
      const wasEnabled = params.enabled;

      if (wasMultiRow && !isMultiRow) {
        $el.removeClass(`${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`);
        swiper.emitContainerClasses();
      } else if (!wasMultiRow && isMultiRow) {
        $el.addClass(`${params.containerModifierClass}grid`);

        if (breakpointParams.grid.fill && breakpointParams.grid.fill === 'column' || !breakpointParams.grid.fill && params.grid.fill === 'column') {
          $el.addClass(`${params.containerModifierClass}grid-column`);
        }

        swiper.emitContainerClasses();
      } // Toggle navigation, pagination, scrollbar


      ['navigation', 'pagination', 'scrollbar'].forEach(prop => {
        const wasModuleEnabled = params[prop] && params[prop].enabled;
        const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;

        if (wasModuleEnabled && !isModuleEnabled) {
          swiper[prop].disable();
        }

        if (!wasModuleEnabled && isModuleEnabled) {
          swiper[prop].enable();
        }
      });
      const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
      const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);

      if (directionChanged && initialized) {
        swiper.changeDirection();
      }

      extend(swiper.params, breakpointParams);
      const isEnabled = swiper.params.enabled;
      Object.assign(swiper, {
        allowTouchMove: swiper.params.allowTouchMove,
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev
      });

      if (wasEnabled && !isEnabled) {
        swiper.disable();
      } else if (!wasEnabled && isEnabled) {
        swiper.enable();
      }

      swiper.currentBreakpoint = breakpoint;
      swiper.emit('_beforeBreakpoint', breakpointParams);

      if (needsReLoop && initialized) {
        swiper.loopDestroy();
        swiper.loopCreate();
        swiper.updateSlides();
        swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
      }

      swiper.emit('breakpoint', breakpointParams);
    }

    function getBreakpoint(breakpoints, base, containerEl) {
      if (base === void 0) {
        base = 'window';
      }

      if (!breakpoints || base === 'container' && !containerEl) return undefined;
      let breakpoint = false;
      const window = getWindow();
      const currentHeight = base === 'window' ? window.innerHeight : containerEl.clientHeight;
      const points = Object.keys(breakpoints).map(point => {
        if (typeof point === 'string' && point.indexOf('@') === 0) {
          const minRatio = parseFloat(point.substr(1));
          const value = currentHeight * minRatio;
          return {
            value,
            point
          };
        }

        return {
          value: point,
          point
        };
      });
      points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));

      for (let i = 0; i < points.length; i += 1) {
        const {
          point,
          value
        } = points[i];

        if (base === 'window') {
          if (window.matchMedia(`(min-width: ${value}px)`).matches) {
            breakpoint = point;
          }
        } else if (value <= containerEl.clientWidth) {
          breakpoint = point;
        }
      }

      return breakpoint || 'max';
    }

    var breakpoints = {
      setBreakpoint,
      getBreakpoint
    };

    function prepareClasses(entries, prefix) {
      const resultClasses = [];
      entries.forEach(item => {
        if (typeof item === 'object') {
          Object.keys(item).forEach(classNames => {
            if (item[classNames]) {
              resultClasses.push(prefix + classNames);
            }
          });
        } else if (typeof item === 'string') {
          resultClasses.push(prefix + item);
        }
      });
      return resultClasses;
    }

    function addClasses() {
      const swiper = this;
      const {
        classNames,
        params,
        rtl,
        $el,
        device,
        support
      } = swiper; // prettier-ignore

      const suffixes = prepareClasses(['initialized', params.direction, {
        'pointer-events': !support.touch
      }, {
        'free-mode': swiper.params.freeMode && params.freeMode.enabled
      }, {
        'autoheight': params.autoHeight
      }, {
        'rtl': rtl
      }, {
        'grid': params.grid && params.grid.rows > 1
      }, {
        'grid-column': params.grid && params.grid.rows > 1 && params.grid.fill === 'column'
      }, {
        'android': device.android
      }, {
        'ios': device.ios
      }, {
        'css-mode': params.cssMode
      }, {
        'centered': params.cssMode && params.centeredSlides
      }, {
        'watch-progress': params.watchSlidesProgress
      }], params.containerModifierClass);
      classNames.push(...suffixes);
      $el.addClass([...classNames].join(' '));
      swiper.emitContainerClasses();
    }

    function removeClasses() {
      const swiper = this;
      const {
        $el,
        classNames
      } = swiper;
      $el.removeClass(classNames.join(' '));
      swiper.emitContainerClasses();
    }

    var classes = {
      addClasses,
      removeClasses
    };

    function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
      const window = getWindow();
      let image;

      function onReady() {
        if (callback) callback();
      }

      const isPicture = $(imageEl).parent('picture')[0];

      if (!isPicture && (!imageEl.complete || !checkForComplete)) {
        if (src) {
          image = new window.Image();
          image.onload = onReady;
          image.onerror = onReady;

          if (sizes) {
            image.sizes = sizes;
          }

          if (srcset) {
            image.srcset = srcset;
          }

          if (src) {
            image.src = src;
          }
        } else {
          onReady();
        }
      } else {
        // image already loaded...
        onReady();
      }
    }

    function preloadImages() {
      const swiper = this;
      swiper.imagesToLoad = swiper.$el.find('img');

      function onReady() {
        if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) return;
        if (swiper.imagesLoaded !== undefined) swiper.imagesLoaded += 1;

        if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
          if (swiper.params.updateOnImagesReady) swiper.update();
          swiper.emit('imagesReady');
        }
      }

      for (let i = 0; i < swiper.imagesToLoad.length; i += 1) {
        const imageEl = swiper.imagesToLoad[i];
        swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute('src'), imageEl.srcset || imageEl.getAttribute('srcset'), imageEl.sizes || imageEl.getAttribute('sizes'), true, onReady);
      }
    }

    var images = {
      loadImage,
      preloadImages
    };

    function checkOverflow() {
      const swiper = this;
      const {
        isLocked: wasLocked,
        params
      } = swiper;
      const {
        slidesOffsetBefore
      } = params;

      if (slidesOffsetBefore) {
        const lastSlideIndex = swiper.slides.length - 1;
        const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
        swiper.isLocked = swiper.size > lastSlideRightEdge;
      } else {
        swiper.isLocked = swiper.snapGrid.length === 1;
      }

      if (params.allowSlideNext === true) {
        swiper.allowSlideNext = !swiper.isLocked;
      }

      if (params.allowSlidePrev === true) {
        swiper.allowSlidePrev = !swiper.isLocked;
      }

      if (wasLocked && wasLocked !== swiper.isLocked) {
        swiper.isEnd = false;
      }

      if (wasLocked !== swiper.isLocked) {
        swiper.emit(swiper.isLocked ? 'lock' : 'unlock');
      }
    }

    var checkOverflow$1 = {
      checkOverflow
    };

    var defaults = {
      init: true,
      direction: 'horizontal',
      touchEventsTarget: 'wrapper',
      initialSlide: 0,
      speed: 300,
      cssMode: false,
      updateOnWindowResize: true,
      resizeObserver: true,
      nested: false,
      createElements: false,
      enabled: true,
      focusableElements: 'input, select, option, textarea, button, video, label',
      // Overrides
      width: null,
      height: null,
      //
      preventInteractionOnTransition: false,
      // ssr
      userAgent: null,
      url: null,
      // To support iOS's swipe-to-go-back gesture (when being used in-app).
      edgeSwipeDetection: false,
      edgeSwipeThreshold: 20,
      // Autoheight
      autoHeight: false,
      // Set wrapper width
      setWrapperSize: false,
      // Virtual Translate
      virtualTranslate: false,
      // Effects
      effect: 'slide',
      // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
      // Breakpoints
      breakpoints: undefined,
      breakpointsBase: 'window',
      // Slides grid
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      slidesPerGroupAuto: false,
      centeredSlides: false,
      centeredSlidesBounds: false,
      slidesOffsetBefore: 0,
      // in px
      slidesOffsetAfter: 0,
      // in px
      normalizeSlideIndex: true,
      centerInsufficientSlides: false,
      // Disable swiper and hide navigation when container not overflow
      watchOverflow: true,
      // Round length
      roundLengths: false,
      // Touches
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: true,
      shortSwipes: true,
      longSwipes: true,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: true,
      allowTouchMove: true,
      threshold: 0,
      touchMoveStopPropagation: false,
      touchStartPreventDefault: true,
      touchStartForcePreventDefault: false,
      touchReleaseOnEdges: false,
      // Unique Navigation Elements
      uniqueNavElements: true,
      // Resistance
      resistance: true,
      resistanceRatio: 0.85,
      // Progress
      watchSlidesProgress: false,
      // Cursor
      grabCursor: false,
      // Clicks
      preventClicks: true,
      preventClicksPropagation: true,
      slideToClickedSlide: false,
      // Images
      preloadImages: true,
      updateOnImagesReady: true,
      // loop
      loop: false,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      loopFillGroupWithBlank: false,
      loopPreventsSlide: true,
      // rewind
      rewind: false,
      // Swiping/no swiping
      allowSlidePrev: true,
      allowSlideNext: true,
      swipeHandler: null,
      // '.swipe-handler',
      noSwiping: true,
      noSwipingClass: 'swiper-no-swiping',
      noSwipingSelector: null,
      // Passive Listeners
      passiveListeners: true,
      maxBackfaceHiddenSlides: 10,
      // NS
      containerModifierClass: 'swiper-',
      // NEW
      slideClass: 'swiper-slide',
      slideBlankClass: 'swiper-slide-invisible-blank',
      slideActiveClass: 'swiper-slide-active',
      slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
      slideVisibleClass: 'swiper-slide-visible',
      slideDuplicateClass: 'swiper-slide-duplicate',
      slideNextClass: 'swiper-slide-next',
      slideDuplicateNextClass: 'swiper-slide-duplicate-next',
      slidePrevClass: 'swiper-slide-prev',
      slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
      wrapperClass: 'swiper-wrapper',
      // Callbacks
      runCallbacksOnInit: true,
      // Internals
      _emitClasses: false
    };

    function moduleExtendParams(params, allModulesParams) {
      return function extendParams(obj) {
        if (obj === void 0) {
          obj = {};
        }

        const moduleParamName = Object.keys(obj)[0];
        const moduleParams = obj[moduleParamName];

        if (typeof moduleParams !== 'object' || moduleParams === null) {
          extend(allModulesParams, obj);
          return;
        }

        if (['navigation', 'pagination', 'scrollbar'].indexOf(moduleParamName) >= 0 && params[moduleParamName] === true) {
          params[moduleParamName] = {
            auto: true
          };
        }

        if (!(moduleParamName in params && 'enabled' in moduleParams)) {
          extend(allModulesParams, obj);
          return;
        }

        if (params[moduleParamName] === true) {
          params[moduleParamName] = {
            enabled: true
          };
        }

        if (typeof params[moduleParamName] === 'object' && !('enabled' in params[moduleParamName])) {
          params[moduleParamName].enabled = true;
        }

        if (!params[moduleParamName]) params[moduleParamName] = {
          enabled: false
        };
        extend(allModulesParams, obj);
      };
    }

    /* eslint no-param-reassign: "off" */
    const prototypes = {
      eventsEmitter,
      update,
      translate,
      transition,
      slide,
      loop,
      grabCursor,
      events: events$1,
      breakpoints,
      checkOverflow: checkOverflow$1,
      classes,
      images
    };
    const extendedDefaults = {};

    class Swiper {
      constructor() {
        let el;
        let params;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object') {
          params = args[0];
        } else {
          [el, params] = args;
        }

        if (!params) params = {};
        params = extend({}, params);
        if (el && !params.el) params.el = el;

        if (params.el && $(params.el).length > 1) {
          const swipers = [];
          $(params.el).each(containerEl => {
            const newParams = extend({}, params, {
              el: containerEl
            });
            swipers.push(new Swiper(newParams));
          });
          return swipers;
        } // Swiper Instance


        const swiper = this;
        swiper.__swiper__ = true;
        swiper.support = getSupport();
        swiper.device = getDevice({
          userAgent: params.userAgent
        });
        swiper.browser = getBrowser();
        swiper.eventsListeners = {};
        swiper.eventsAnyListeners = [];
        swiper.modules = [...swiper.__modules__];

        if (params.modules && Array.isArray(params.modules)) {
          swiper.modules.push(...params.modules);
        }

        const allModulesParams = {};
        swiper.modules.forEach(mod => {
          mod({
            swiper,
            extendParams: moduleExtendParams(params, allModulesParams),
            on: swiper.on.bind(swiper),
            once: swiper.once.bind(swiper),
            off: swiper.off.bind(swiper),
            emit: swiper.emit.bind(swiper)
          });
        }); // Extend defaults with modules params

        const swiperParams = extend({}, defaults, allModulesParams); // Extend defaults with passed params

        swiper.params = extend({}, swiperParams, extendedDefaults, params);
        swiper.originalParams = extend({}, swiper.params);
        swiper.passedParams = extend({}, params); // add event listeners

        if (swiper.params && swiper.params.on) {
          Object.keys(swiper.params.on).forEach(eventName => {
            swiper.on(eventName, swiper.params.on[eventName]);
          });
        }

        if (swiper.params && swiper.params.onAny) {
          swiper.onAny(swiper.params.onAny);
        } // Save Dom lib


        swiper.$ = $; // Extend Swiper

        Object.assign(swiper, {
          enabled: swiper.params.enabled,
          el,
          // Classes
          classNames: [],
          // Slides
          slides: $(),
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],

          // isDirection
          isHorizontal() {
            return swiper.params.direction === 'horizontal';
          },

          isVertical() {
            return swiper.params.direction === 'vertical';
          },

          // Indexes
          activeIndex: 0,
          realIndex: 0,
          //
          isBeginning: true,
          isEnd: false,
          // Props
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: false,
          // Locks
          allowSlideNext: swiper.params.allowSlideNext,
          allowSlidePrev: swiper.params.allowSlidePrev,
          // Touch Events
          touchEvents: function touchEvents() {
            const touch = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
            const desktop = ['pointerdown', 'pointermove', 'pointerup'];
            swiper.touchEventsTouch = {
              start: touch[0],
              move: touch[1],
              end: touch[2],
              cancel: touch[3]
            };
            swiper.touchEventsDesktop = {
              start: desktop[0],
              move: desktop[1],
              end: desktop[2]
            };
            return swiper.support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
          }(),
          touchEventsData: {
            isTouched: undefined,
            isMoved: undefined,
            allowTouchCallbacks: undefined,
            touchStartTime: undefined,
            isScrolling: undefined,
            currentTranslate: undefined,
            startTranslate: undefined,
            allowThresholdMove: undefined,
            // Form elements to match
            focusableElements: swiper.params.focusableElements,
            // Last click time
            lastClickTime: now(),
            clickTimeout: undefined,
            // Velocities
            velocities: [],
            allowMomentumBounce: undefined,
            isTouchEvent: undefined,
            startMoving: undefined
          },
          // Clicks
          allowClick: true,
          // Touches
          allowTouchMove: swiper.params.allowTouchMove,
          touches: {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
          },
          // Images
          imagesToLoad: [],
          imagesLoaded: 0
        });
        swiper.emit('_swiper'); // Init

        if (swiper.params.init) {
          swiper.init();
        } // Return app instance


        return swiper;
      }

      enable() {
        const swiper = this;
        if (swiper.enabled) return;
        swiper.enabled = true;

        if (swiper.params.grabCursor) {
          swiper.setGrabCursor();
        }

        swiper.emit('enable');
      }

      disable() {
        const swiper = this;
        if (!swiper.enabled) return;
        swiper.enabled = false;

        if (swiper.params.grabCursor) {
          swiper.unsetGrabCursor();
        }

        swiper.emit('disable');
      }

      setProgress(progress, speed) {
        const swiper = this;
        progress = Math.min(Math.max(progress, 0), 1);
        const min = swiper.minTranslate();
        const max = swiper.maxTranslate();
        const current = (max - min) * progress + min;
        swiper.translateTo(current, typeof speed === 'undefined' ? 0 : speed);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }

      emitContainerClasses() {
        const swiper = this;
        if (!swiper.params._emitClasses || !swiper.el) return;
        const cls = swiper.el.className.split(' ').filter(className => {
          return className.indexOf('swiper') === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
        });
        swiper.emit('_containerClasses', cls.join(' '));
      }

      getSlideClasses(slideEl) {
        const swiper = this;
        if (swiper.destroyed) return '';
        return slideEl.className.split(' ').filter(className => {
          return className.indexOf('swiper-slide') === 0 || className.indexOf(swiper.params.slideClass) === 0;
        }).join(' ');
      }

      emitSlidesClasses() {
        const swiper = this;
        if (!swiper.params._emitClasses || !swiper.el) return;
        const updates = [];
        swiper.slides.each(slideEl => {
          const classNames = swiper.getSlideClasses(slideEl);
          updates.push({
            slideEl,
            classNames
          });
          swiper.emit('_slideClass', slideEl, classNames);
        });
        swiper.emit('_slideClasses', updates);
      }

      slidesPerViewDynamic(view, exact) {
        if (view === void 0) {
          view = 'current';
        }

        if (exact === void 0) {
          exact = false;
        }

        const swiper = this;
        const {
          params,
          slides,
          slidesGrid,
          slidesSizesGrid,
          size: swiperSize,
          activeIndex
        } = swiper;
        let spv = 1;

        if (params.centeredSlides) {
          let slideSize = slides[activeIndex].swiperSlideSize;
          let breakLoop;

          for (let i = activeIndex + 1; i < slides.length; i += 1) {
            if (slides[i] && !breakLoop) {
              slideSize += slides[i].swiperSlideSize;
              spv += 1;
              if (slideSize > swiperSize) breakLoop = true;
            }
          }

          for (let i = activeIndex - 1; i >= 0; i -= 1) {
            if (slides[i] && !breakLoop) {
              slideSize += slides[i].swiperSlideSize;
              spv += 1;
              if (slideSize > swiperSize) breakLoop = true;
            }
          }
        } else {
          // eslint-disable-next-line
          if (view === 'current') {
            for (let i = activeIndex + 1; i < slides.length; i += 1) {
              const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;

              if (slideInView) {
                spv += 1;
              }
            }
          } else {
            // previous
            for (let i = activeIndex - 1; i >= 0; i -= 1) {
              const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;

              if (slideInView) {
                spv += 1;
              }
            }
          }
        }

        return spv;
      }

      update() {
        const swiper = this;
        if (!swiper || swiper.destroyed) return;
        const {
          snapGrid,
          params
        } = swiper; // Breakpoints

        if (params.breakpoints) {
          swiper.setBreakpoint();
        }

        swiper.updateSize();
        swiper.updateSlides();
        swiper.updateProgress();
        swiper.updateSlidesClasses();

        function setTranslate() {
          const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
          const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
          swiper.setTranslate(newTranslate);
          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();
        }

        let translated;

        if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
          setTranslate();

          if (swiper.params.autoHeight) {
            swiper.updateAutoHeight();
          }
        } else {
          if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
            translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
          } else {
            translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
          }

          if (!translated) {
            setTranslate();
          }
        }

        if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
          swiper.checkOverflow();
        }

        swiper.emit('update');
      }

      changeDirection(newDirection, needUpdate) {
        if (needUpdate === void 0) {
          needUpdate = true;
        }

        const swiper = this;
        const currentDirection = swiper.params.direction;

        if (!newDirection) {
          // eslint-disable-next-line
          newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
        }

        if (newDirection === currentDirection || newDirection !== 'horizontal' && newDirection !== 'vertical') {
          return swiper;
        }

        swiper.$el.removeClass(`${swiper.params.containerModifierClass}${currentDirection}`).addClass(`${swiper.params.containerModifierClass}${newDirection}`);
        swiper.emitContainerClasses();
        swiper.params.direction = newDirection;
        swiper.slides.each(slideEl => {
          if (newDirection === 'vertical') {
            slideEl.style.width = '';
          } else {
            slideEl.style.height = '';
          }
        });
        swiper.emit('changeDirection');
        if (needUpdate) swiper.update();
        return swiper;
      }

      mount(el) {
        const swiper = this;
        if (swiper.mounted) return true; // Find el

        const $el = $(el || swiper.params.el);
        el = $el[0];

        if (!el) {
          return false;
        }

        el.swiper = swiper;

        const getWrapperSelector = () => {
          return `.${(swiper.params.wrapperClass || '').trim().split(' ').join('.')}`;
        };

        const getWrapper = () => {
          if (el && el.shadowRoot && el.shadowRoot.querySelector) {
            const res = $(el.shadowRoot.querySelector(getWrapperSelector())); // Children needs to return slot items

            res.children = options => $el.children(options);

            return res;
          }

          if (!$el.children) {
            return $($el).children(getWrapperSelector());
          }

          return $el.children(getWrapperSelector());
        }; // Find Wrapper


        let $wrapperEl = getWrapper();

        if ($wrapperEl.length === 0 && swiper.params.createElements) {
          const document = getDocument();
          const wrapper = document.createElement('div');
          $wrapperEl = $(wrapper);
          wrapper.className = swiper.params.wrapperClass;
          $el.append(wrapper);
          $el.children(`.${swiper.params.slideClass}`).each(slideEl => {
            $wrapperEl.append(slideEl);
          });
        }

        Object.assign(swiper, {
          $el,
          el,
          $wrapperEl,
          wrapperEl: $wrapperEl[0],
          mounted: true,
          // RTL
          rtl: el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl',
          rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
          wrongRTL: $wrapperEl.css('display') === '-webkit-box'
        });
        return true;
      }

      init(el) {
        const swiper = this;
        if (swiper.initialized) return swiper;
        const mounted = swiper.mount(el);
        if (mounted === false) return swiper;
        swiper.emit('beforeInit'); // Set breakpoint

        if (swiper.params.breakpoints) {
          swiper.setBreakpoint();
        } // Add Classes


        swiper.addClasses(); // Create loop

        if (swiper.params.loop) {
          swiper.loopCreate();
        } // Update size


        swiper.updateSize(); // Update slides

        swiper.updateSlides();

        if (swiper.params.watchOverflow) {
          swiper.checkOverflow();
        } // Set Grab Cursor


        if (swiper.params.grabCursor && swiper.enabled) {
          swiper.setGrabCursor();
        }

        if (swiper.params.preloadImages) {
          swiper.preloadImages();
        } // Slide To Initial Slide


        if (swiper.params.loop) {
          swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit, false, true);
        } else {
          swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
        } // Attach events


        swiper.attachEvents(); // Init Flag

        swiper.initialized = true; // Emit

        swiper.emit('init');
        swiper.emit('afterInit');
        return swiper;
      }

      destroy(deleteInstance, cleanStyles) {
        if (deleteInstance === void 0) {
          deleteInstance = true;
        }

        if (cleanStyles === void 0) {
          cleanStyles = true;
        }

        const swiper = this;
        const {
          params,
          $el,
          $wrapperEl,
          slides
        } = swiper;

        if (typeof swiper.params === 'undefined' || swiper.destroyed) {
          return null;
        }

        swiper.emit('beforeDestroy'); // Init Flag

        swiper.initialized = false; // Detach events

        swiper.detachEvents(); // Destroy loop

        if (params.loop) {
          swiper.loopDestroy();
        } // Cleanup styles


        if (cleanStyles) {
          swiper.removeClasses();
          $el.removeAttr('style');
          $wrapperEl.removeAttr('style');

          if (slides && slides.length) {
            slides.removeClass([params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-swiper-slide-index');
          }
        }

        swiper.emit('destroy'); // Detach emitter events

        Object.keys(swiper.eventsListeners).forEach(eventName => {
          swiper.off(eventName);
        });

        if (deleteInstance !== false) {
          swiper.$el[0].swiper = null;
          deleteProps(swiper);
        }

        swiper.destroyed = true;
        return null;
      }

      static extendDefaults(newDefaults) {
        extend(extendedDefaults, newDefaults);
      }

      static get extendedDefaults() {
        return extendedDefaults;
      }

      static get defaults() {
        return defaults;
      }

      static installModule(mod) {
        if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];
        const modules = Swiper.prototype.__modules__;

        if (typeof mod === 'function' && modules.indexOf(mod) < 0) {
          modules.push(mod);
        }
      }

      static use(module) {
        if (Array.isArray(module)) {
          module.forEach(m => Swiper.installModule(m));
          return Swiper;
        }

        Swiper.installModule(module);
        return Swiper;
      }

    }

    Object.keys(prototypes).forEach(prototypeGroup => {
      Object.keys(prototypes[prototypeGroup]).forEach(protoMethod => {
        Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
      });
    });
    Swiper.use([Resize, Observer]);

    function Virtual(_ref) {
      let {
        swiper,
        extendParams,
        on,
        emit
      } = _ref;
      extendParams({
        virtual: {
          enabled: false,
          slides: [],
          cache: true,
          renderSlide: null,
          renderExternal: null,
          renderExternalUpdate: true,
          addSlidesBefore: 0,
          addSlidesAfter: 0
        }
      });
      let cssModeTimeout;
      swiper.virtual = {
        cache: {},
        from: undefined,
        to: undefined,
        slides: [],
        offset: 0,
        slidesGrid: []
      };

      function renderSlide(slide, index) {
        const params = swiper.params.virtual;

        if (params.cache && swiper.virtual.cache[index]) {
          return swiper.virtual.cache[index];
        }

        const $slideEl = params.renderSlide ? $(params.renderSlide.call(swiper, slide, index)) : $(`<div class="${swiper.params.slideClass}" data-swiper-slide-index="${index}">${slide}</div>`);
        if (!$slideEl.attr('data-swiper-slide-index')) $slideEl.attr('data-swiper-slide-index', index);
        if (params.cache) swiper.virtual.cache[index] = $slideEl;
        return $slideEl;
      }

      function update(force) {
        const {
          slidesPerView,
          slidesPerGroup,
          centeredSlides
        } = swiper.params;
        const {
          addSlidesBefore,
          addSlidesAfter
        } = swiper.params.virtual;
        const {
          from: previousFrom,
          to: previousTo,
          slides,
          slidesGrid: previousSlidesGrid,
          offset: previousOffset
        } = swiper.virtual;

        if (!swiper.params.cssMode) {
          swiper.updateActiveIndex();
        }

        const activeIndex = swiper.activeIndex || 0;
        let offsetProp;
        if (swiper.rtlTranslate) offsetProp = 'right';else offsetProp = swiper.isHorizontal() ? 'left' : 'top';
        let slidesAfter;
        let slidesBefore;

        if (centeredSlides) {
          slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
          slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
        } else {
          slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesAfter;
          slidesBefore = slidesPerGroup + addSlidesBefore;
        }

        const from = Math.max((activeIndex || 0) - slidesBefore, 0);
        const to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
        const offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);
        Object.assign(swiper.virtual, {
          from,
          to,
          offset,
          slidesGrid: swiper.slidesGrid
        });

        function onRendered() {
          swiper.updateSlides();
          swiper.updateProgress();
          swiper.updateSlidesClasses();

          if (swiper.lazy && swiper.params.lazy.enabled) {
            swiper.lazy.load();
          }

          emit('virtualUpdate');
        }

        if (previousFrom === from && previousTo === to && !force) {
          if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
            swiper.slides.css(offsetProp, `${offset}px`);
          }

          swiper.updateProgress();
          emit('virtualUpdate');
          return;
        }

        if (swiper.params.virtual.renderExternal) {
          swiper.params.virtual.renderExternal.call(swiper, {
            offset,
            from,
            to,
            slides: function getSlides() {
              const slidesToRender = [];

              for (let i = from; i <= to; i += 1) {
                slidesToRender.push(slides[i]);
              }

              return slidesToRender;
            }()
          });

          if (swiper.params.virtual.renderExternalUpdate) {
            onRendered();
          } else {
            emit('virtualUpdate');
          }

          return;
        }

        const prependIndexes = [];
        const appendIndexes = [];

        if (force) {
          swiper.$wrapperEl.find(`.${swiper.params.slideClass}`).remove();
        } else {
          for (let i = previousFrom; i <= previousTo; i += 1) {
            if (i < from || i > to) {
              swiper.$wrapperEl.find(`.${swiper.params.slideClass}[data-swiper-slide-index="${i}"]`).remove();
            }
          }
        }

        for (let i = 0; i < slides.length; i += 1) {
          if (i >= from && i <= to) {
            if (typeof previousTo === 'undefined' || force) {
              appendIndexes.push(i);
            } else {
              if (i > previousTo) appendIndexes.push(i);
              if (i < previousFrom) prependIndexes.push(i);
            }
          }
        }

        appendIndexes.forEach(index => {
          swiper.$wrapperEl.append(renderSlide(slides[index], index));
        });
        prependIndexes.sort((a, b) => b - a).forEach(index => {
          swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
        });
        swiper.$wrapperEl.children('.swiper-slide').css(offsetProp, `${offset}px`);
        onRendered();
      }

      function appendSlide(slides) {
        if (typeof slides === 'object' && 'length' in slides) {
          for (let i = 0; i < slides.length; i += 1) {
            if (slides[i]) swiper.virtual.slides.push(slides[i]);
          }
        } else {
          swiper.virtual.slides.push(slides);
        }

        update(true);
      }

      function prependSlide(slides) {
        const activeIndex = swiper.activeIndex;
        let newActiveIndex = activeIndex + 1;
        let numberOfNewSlides = 1;

        if (Array.isArray(slides)) {
          for (let i = 0; i < slides.length; i += 1) {
            if (slides[i]) swiper.virtual.slides.unshift(slides[i]);
          }

          newActiveIndex = activeIndex + slides.length;
          numberOfNewSlides = slides.length;
        } else {
          swiper.virtual.slides.unshift(slides);
        }

        if (swiper.params.virtual.cache) {
          const cache = swiper.virtual.cache;
          const newCache = {};
          Object.keys(cache).forEach(cachedIndex => {
            const $cachedEl = cache[cachedIndex];
            const cachedElIndex = $cachedEl.attr('data-swiper-slide-index');

            if (cachedElIndex) {
              $cachedEl.attr('data-swiper-slide-index', parseInt(cachedElIndex, 10) + numberOfNewSlides);
            }

            newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = $cachedEl;
          });
          swiper.virtual.cache = newCache;
        }

        update(true);
        swiper.slideTo(newActiveIndex, 0);
      }

      function removeSlide(slidesIndexes) {
        if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) return;
        let activeIndex = swiper.activeIndex;

        if (Array.isArray(slidesIndexes)) {
          for (let i = slidesIndexes.length - 1; i >= 0; i -= 1) {
            swiper.virtual.slides.splice(slidesIndexes[i], 1);

            if (swiper.params.virtual.cache) {
              delete swiper.virtual.cache[slidesIndexes[i]];
            }

            if (slidesIndexes[i] < activeIndex) activeIndex -= 1;
            activeIndex = Math.max(activeIndex, 0);
          }
        } else {
          swiper.virtual.slides.splice(slidesIndexes, 1);

          if (swiper.params.virtual.cache) {
            delete swiper.virtual.cache[slidesIndexes];
          }

          if (slidesIndexes < activeIndex) activeIndex -= 1;
          activeIndex = Math.max(activeIndex, 0);
        }

        update(true);
        swiper.slideTo(activeIndex, 0);
      }

      function removeAllSlides() {
        swiper.virtual.slides = [];

        if (swiper.params.virtual.cache) {
          swiper.virtual.cache = {};
        }

        update(true);
        swiper.slideTo(0, 0);
      }

      on('beforeInit', () => {
        if (!swiper.params.virtual.enabled) return;
        swiper.virtual.slides = swiper.params.virtual.slides;
        swiper.classNames.push(`${swiper.params.containerModifierClass}virtual`);
        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;

        if (!swiper.params.initialSlide) {
          update();
        }
      });
      on('setTranslate', () => {
        if (!swiper.params.virtual.enabled) return;

        if (swiper.params.cssMode && !swiper._immediateVirtual) {
          clearTimeout(cssModeTimeout);
          cssModeTimeout = setTimeout(() => {
            update();
          }, 100);
        } else {
          update();
        }
      });
      on('init update resize', () => {
        if (!swiper.params.virtual.enabled) return;

        if (swiper.params.cssMode) {
          setCSSProperty(swiper.wrapperEl, '--swiper-virtual-size', `${swiper.virtualSize}px`);
        }
      });
      Object.assign(swiper.virtual, {
        appendSlide,
        prependSlide,
        removeSlide,
        removeAllSlides,
        update
      });
    }

    /* eslint-disable consistent-return */
    function Keyboard(_ref) {
      let {
        swiper,
        extendParams,
        on,
        emit
      } = _ref;
      const document = getDocument();
      const window = getWindow();
      swiper.keyboard = {
        enabled: false
      };
      extendParams({
        keyboard: {
          enabled: false,
          onlyInViewport: true,
          pageUpDown: true
        }
      });

      function handle(event) {
        if (!swiper.enabled) return;
        const {
          rtlTranslate: rtl
        } = swiper;
        let e = event;
        if (e.originalEvent) e = e.originalEvent; // jquery fix

        const kc = e.keyCode || e.charCode;
        const pageUpDown = swiper.params.keyboard.pageUpDown;
        const isPageUp = pageUpDown && kc === 33;
        const isPageDown = pageUpDown && kc === 34;
        const isArrowLeft = kc === 37;
        const isArrowRight = kc === 39;
        const isArrowUp = kc === 38;
        const isArrowDown = kc === 40; // Directions locks

        if (!swiper.allowSlideNext && (swiper.isHorizontal() && isArrowRight || swiper.isVertical() && isArrowDown || isPageDown)) {
          return false;
        }

        if (!swiper.allowSlidePrev && (swiper.isHorizontal() && isArrowLeft || swiper.isVertical() && isArrowUp || isPageUp)) {
          return false;
        }

        if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
          return undefined;
        }

        if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
          return undefined;
        }

        if (swiper.params.keyboard.onlyInViewport && (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)) {
          let inView = false; // Check that swiper should be inside of visible area of window

          if (swiper.$el.parents(`.${swiper.params.slideClass}`).length > 0 && swiper.$el.parents(`.${swiper.params.slideActiveClass}`).length === 0) {
            return undefined;
          }

          const $el = swiper.$el;
          const swiperWidth = $el[0].clientWidth;
          const swiperHeight = $el[0].clientHeight;
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
          const swiperOffset = swiper.$el.offset();
          if (rtl) swiperOffset.left -= swiper.$el[0].scrollLeft;
          const swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiperWidth, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiperHeight], [swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight]];

          for (let i = 0; i < swiperCoord.length; i += 1) {
            const point = swiperCoord[i];

            if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
              if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line

              inView = true;
            }
          }

          if (!inView) return undefined;
        }

        if (swiper.isHorizontal()) {
          if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
            if (e.preventDefault) e.preventDefault();else e.returnValue = false;
          }

          if ((isPageDown || isArrowRight) && !rtl || (isPageUp || isArrowLeft) && rtl) swiper.slideNext();
          if ((isPageUp || isArrowLeft) && !rtl || (isPageDown || isArrowRight) && rtl) swiper.slidePrev();
        } else {
          if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
            if (e.preventDefault) e.preventDefault();else e.returnValue = false;
          }

          if (isPageDown || isArrowDown) swiper.slideNext();
          if (isPageUp || isArrowUp) swiper.slidePrev();
        }

        emit('keyPress', kc);
        return undefined;
      }

      function enable() {
        if (swiper.keyboard.enabled) return;
        $(document).on('keydown', handle);
        swiper.keyboard.enabled = true;
      }

      function disable() {
        if (!swiper.keyboard.enabled) return;
        $(document).off('keydown', handle);
        swiper.keyboard.enabled = false;
      }

      on('init', () => {
        if (swiper.params.keyboard.enabled) {
          enable();
        }
      });
      on('destroy', () => {
        if (swiper.keyboard.enabled) {
          disable();
        }
      });
      Object.assign(swiper.keyboard, {
        enable,
        disable
      });
    }

    /* eslint-disable consistent-return */
    function Mousewheel(_ref) {
      let {
        swiper,
        extendParams,
        on,
        emit
      } = _ref;
      const window = getWindow();
      extendParams({
        mousewheel: {
          enabled: false,
          releaseOnEdges: false,
          invert: false,
          forceToAxis: false,
          sensitivity: 1,
          eventsTarget: 'container',
          thresholdDelta: null,
          thresholdTime: null
        }
      });
      swiper.mousewheel = {
        enabled: false
      };
      let timeout;
      let lastScrollTime = now();
      let lastEventBeforeSnap;
      const recentWheelEvents = [];

      function normalize(e) {
        // Reasonable defaults
        const PIXEL_STEP = 10;
        const LINE_HEIGHT = 40;
        const PAGE_HEIGHT = 800;
        let sX = 0;
        let sY = 0; // spinX, spinY

        let pX = 0;
        let pY = 0; // pixelX, pixelY
        // Legacy

        if ('detail' in e) {
          sY = e.detail;
        }

        if ('wheelDelta' in e) {
          sY = -e.wheelDelta / 120;
        }

        if ('wheelDeltaY' in e) {
          sY = -e.wheelDeltaY / 120;
        }

        if ('wheelDeltaX' in e) {
          sX = -e.wheelDeltaX / 120;
        } // side scrolling on FF with DOMMouseScroll


        if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
          sX = sY;
          sY = 0;
        }

        pX = sX * PIXEL_STEP;
        pY = sY * PIXEL_STEP;

        if ('deltaY' in e) {
          pY = e.deltaY;
        }

        if ('deltaX' in e) {
          pX = e.deltaX;
        }

        if (e.shiftKey && !pX) {
          // if user scrolls with shift he wants horizontal scroll
          pX = pY;
          pY = 0;
        }

        if ((pX || pY) && e.deltaMode) {
          if (e.deltaMode === 1) {
            // delta in LINE units
            pX *= LINE_HEIGHT;
            pY *= LINE_HEIGHT;
          } else {
            // delta in PAGE units
            pX *= PAGE_HEIGHT;
            pY *= PAGE_HEIGHT;
          }
        } // Fall-back if spin cannot be determined


        if (pX && !sX) {
          sX = pX < 1 ? -1 : 1;
        }

        if (pY && !sY) {
          sY = pY < 1 ? -1 : 1;
        }

        return {
          spinX: sX,
          spinY: sY,
          pixelX: pX,
          pixelY: pY
        };
      }

      function handleMouseEnter() {
        if (!swiper.enabled) return;
        swiper.mouseEntered = true;
      }

      function handleMouseLeave() {
        if (!swiper.enabled) return;
        swiper.mouseEntered = false;
      }

      function animateSlider(newEvent) {
        if (swiper.params.mousewheel.thresholdDelta && newEvent.delta < swiper.params.mousewheel.thresholdDelta) {
          // Prevent if delta of wheel scroll delta is below configured threshold
          return false;
        }

        if (swiper.params.mousewheel.thresholdTime && now() - lastScrollTime < swiper.params.mousewheel.thresholdTime) {
          // Prevent if time between scrolls is below configured threshold
          return false;
        } // If the movement is NOT big enough and
        // if the last time the user scrolled was too close to the current one (avoid continuously triggering the slider):
        //   Don't go any further (avoid insignificant scroll movement).


        if (newEvent.delta >= 6 && now() - lastScrollTime < 60) {
          // Return false as a default
          return true;
        } // If user is scrolling towards the end:
        //   If the slider hasn't hit the latest slide or
        //   if the slider is a loop and
        //   if the slider isn't moving right now:
        //     Go to next slide and
        //     emit a scroll event.
        // Else (the user is scrolling towards the beginning) and
        // if the slider hasn't hit the first slide or
        // if the slider is a loop and
        // if the slider isn't moving right now:
        //   Go to prev slide and
        //   emit a scroll event.


        if (newEvent.direction < 0) {
          if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
            swiper.slideNext();
            emit('scroll', newEvent.raw);
          }
        } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
          swiper.slidePrev();
          emit('scroll', newEvent.raw);
        } // If you got here is because an animation has been triggered so store the current time


        lastScrollTime = new window.Date().getTime(); // Return false as a default

        return false;
      }

      function releaseScroll(newEvent) {
        const params = swiper.params.mousewheel;

        if (newEvent.direction < 0) {
          if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {
            // Return true to animate scroll on edges
            return true;
          }
        } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) {
          // Return true to animate scroll on edges
          return true;
        }

        return false;
      }

      function handle(event) {
        let e = event;
        let disableParentSwiper = true;
        if (!swiper.enabled) return;
        const params = swiper.params.mousewheel;

        if (swiper.params.cssMode) {
          e.preventDefault();
        }

        let target = swiper.$el;

        if (swiper.params.mousewheel.eventsTarget !== 'container') {
          target = $(swiper.params.mousewheel.eventsTarget);
        }

        if (!swiper.mouseEntered && !target[0].contains(e.target) && !params.releaseOnEdges) return true;
        if (e.originalEvent) e = e.originalEvent; // jquery fix

        let delta = 0;
        const rtlFactor = swiper.rtlTranslate ? -1 : 1;
        const data = normalize(e);

        if (params.forceToAxis) {
          if (swiper.isHorizontal()) {
            if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = -data.pixelX * rtlFactor;else return true;
          } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = -data.pixelY;else return true;
        } else {
          delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
        }

        if (delta === 0) return true;
        if (params.invert) delta = -delta; // Get the scroll positions

        let positions = swiper.getTranslate() + delta * params.sensitivity;
        if (positions >= swiper.minTranslate()) positions = swiper.minTranslate();
        if (positions <= swiper.maxTranslate()) positions = swiper.maxTranslate(); // When loop is true:
        //     the disableParentSwiper will be true.
        // When loop is false:
        //     if the scroll positions is not on edge,
        //     then the disableParentSwiper will be true.
        //     if the scroll on edge positions,
        //     then the disableParentSwiper will be false.

        disableParentSwiper = swiper.params.loop ? true : !(positions === swiper.minTranslate() || positions === swiper.maxTranslate());
        if (disableParentSwiper && swiper.params.nested) e.stopPropagation();

        if (!swiper.params.freeMode || !swiper.params.freeMode.enabled) {
          // Register the new event in a variable which stores the relevant data
          const newEvent = {
            time: now(),
            delta: Math.abs(delta),
            direction: Math.sign(delta),
            raw: event
          }; // Keep the most recent events

          if (recentWheelEvents.length >= 2) {
            recentWheelEvents.shift(); // only store the last N events
          }

          const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
          recentWheelEvents.push(newEvent); // If there is at least one previous recorded event:
          //   If direction has changed or
          //   if the scroll is quicker than the previous one:
          //     Animate the slider.
          // Else (this is the first time the wheel is moved):
          //     Animate the slider.

          if (prevEvent) {
            if (newEvent.direction !== prevEvent.direction || newEvent.delta > prevEvent.delta || newEvent.time > prevEvent.time + 150) {
              animateSlider(newEvent);
            }
          } else {
            animateSlider(newEvent);
          } // If it's time to release the scroll:
          //   Return now so you don't hit the preventDefault.


          if (releaseScroll(newEvent)) {
            return true;
          }
        } else {
          // Freemode or scrollContainer:
          // If we recently snapped after a momentum scroll, then ignore wheel events
          // to give time for the deceleration to finish. Stop ignoring after 500 msecs
          // or if it's a new scroll (larger delta or inverse sign as last event before
          // an end-of-momentum snap).
          const newEvent = {
            time: now(),
            delta: Math.abs(delta),
            direction: Math.sign(delta)
          };
          const ignoreWheelEvents = lastEventBeforeSnap && newEvent.time < lastEventBeforeSnap.time + 500 && newEvent.delta <= lastEventBeforeSnap.delta && newEvent.direction === lastEventBeforeSnap.direction;

          if (!ignoreWheelEvents) {
            lastEventBeforeSnap = undefined;

            if (swiper.params.loop) {
              swiper.loopFix();
            }

            let position = swiper.getTranslate() + delta * params.sensitivity;
            const wasBeginning = swiper.isBeginning;
            const wasEnd = swiper.isEnd;
            if (position >= swiper.minTranslate()) position = swiper.minTranslate();
            if (position <= swiper.maxTranslate()) position = swiper.maxTranslate();
            swiper.setTransition(0);
            swiper.setTranslate(position);
            swiper.updateProgress();
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();

            if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) {
              swiper.updateSlidesClasses();
            }

            if (swiper.params.freeMode.sticky) {
              // When wheel scrolling starts with sticky (aka snap) enabled, then detect
              // the end of a momentum scroll by storing recent (N=15?) wheel events.
              // 1. do all N events have decreasing or same (absolute value) delta?
              // 2. did all N events arrive in the last M (M=500?) msecs?
              // 3. does the earliest event have an (absolute value) delta that's
              //    at least P (P=1?) larger than the most recent event's delta?
              // 4. does the latest event have a delta that's smaller than Q (Q=6?) pixels?
              // If 1-4 are "yes" then we're near the end of a momentum scroll deceleration.
              // Snap immediately and ignore remaining wheel events in this scroll.
              // See comment above for "remaining wheel events in this scroll" determination.
              // If 1-4 aren't satisfied, then wait to snap until 500ms after the last event.
              clearTimeout(timeout);
              timeout = undefined;

              if (recentWheelEvents.length >= 15) {
                recentWheelEvents.shift(); // only store the last N events
              }

              const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
              const firstEvent = recentWheelEvents[0];
              recentWheelEvents.push(newEvent);

              if (prevEvent && (newEvent.delta > prevEvent.delta || newEvent.direction !== prevEvent.direction)) {
                // Increasing or reverse-sign delta means the user started scrolling again. Clear the wheel event log.
                recentWheelEvents.splice(0);
              } else if (recentWheelEvents.length >= 15 && newEvent.time - firstEvent.time < 500 && firstEvent.delta - newEvent.delta >= 1 && newEvent.delta <= 6) {
                // We're at the end of the deceleration of a momentum scroll, so there's no need
                // to wait for more events. Snap ASAP on the next tick.
                // Also, because there's some remaining momentum we'll bias the snap in the
                // direction of the ongoing scroll because it's better UX for the scroll to snap
                // in the same direction as the scroll instead of reversing to snap.  Therefore,
                // if it's already scrolled more than 20% in the current direction, keep going.
                const snapToThreshold = delta > 0 ? 0.8 : 0.2;
                lastEventBeforeSnap = newEvent;
                recentWheelEvents.splice(0);
                timeout = nextTick(() => {
                  swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
                }, 0); // no delay; move on next tick
              }

              if (!timeout) {
                // if we get here, then we haven't detected the end of a momentum scroll, so
                // we'll consider a scroll "complete" when there haven't been any wheel events
                // for 500ms.
                timeout = nextTick(() => {
                  const snapToThreshold = 0.5;
                  lastEventBeforeSnap = newEvent;
                  recentWheelEvents.splice(0);
                  swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
                }, 500);
              }
            } // Emit event


            if (!ignoreWheelEvents) emit('scroll', e); // Stop autoplay

            if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) swiper.autoplay.stop(); // Return page scroll on edge positions

            if (position === swiper.minTranslate() || position === swiper.maxTranslate()) return true;
          }
        }

        if (e.preventDefault) e.preventDefault();else e.returnValue = false;
        return false;
      }

      function events(method) {
        let target = swiper.$el;

        if (swiper.params.mousewheel.eventsTarget !== 'container') {
          target = $(swiper.params.mousewheel.eventsTarget);
        }

        target[method]('mouseenter', handleMouseEnter);
        target[method]('mouseleave', handleMouseLeave);
        target[method]('wheel', handle);
      }

      function enable() {
        if (swiper.params.cssMode) {
          swiper.wrapperEl.removeEventListener('wheel', handle);
          return true;
        }

        if (swiper.mousewheel.enabled) return false;
        events('on');
        swiper.mousewheel.enabled = true;
        return true;
      }

      function disable() {
        if (swiper.params.cssMode) {
          swiper.wrapperEl.addEventListener(event, handle);
          return true;
        }

        if (!swiper.mousewheel.enabled) return false;
        events('off');
        swiper.mousewheel.enabled = false;
        return true;
      }

      on('init', () => {
        if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
          disable();
        }

        if (swiper.params.mousewheel.enabled) enable();
      });
      on('destroy', () => {
        if (swiper.params.cssMode) {
          enable();
        }

        if (swiper.mousewheel.enabled) disable();
      });
      Object.assign(swiper.mousewheel, {
        enable,
        disable
      });
    }

    function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
      const document = getDocument();

      if (swiper.params.createElements) {
        Object.keys(checkProps).forEach(key => {
          if (!params[key] && params.auto === true) {
            let element = swiper.$el.children(`.${checkProps[key]}`)[0];

            if (!element) {
              element = document.createElement('div');
              element.className = checkProps[key];
              swiper.$el.append(element);
            }

            params[key] = element;
            originalParams[key] = element;
          }
        });
      }

      return params;
    }

    function Navigation(_ref) {
      let {
        swiper,
        extendParams,
        on,
        emit
      } = _ref;
      extendParams({
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: false,
          disabledClass: 'swiper-button-disabled',
          hiddenClass: 'swiper-button-hidden',
          lockClass: 'swiper-button-lock',
          navigationDisabledClass: 'swiper-navigation-disabled'
        }
      });
      swiper.navigation = {
        nextEl: null,
        $nextEl: null,
        prevEl: null,
        $prevEl: null
      };

      function getEl(el) {
        let $el;

        if (el) {
          $el = $(el);

          if (swiper.params.uniqueNavElements && typeof el === 'string' && $el.length > 1 && swiper.$el.find(el).length === 1) {
            $el = swiper.$el.find(el);
          }
        }

        return $el;
      }

      function toggleEl($el, disabled) {
        const params = swiper.params.navigation;

        if ($el && $el.length > 0) {
          $el[disabled ? 'addClass' : 'removeClass'](params.disabledClass);
          if ($el[0] && $el[0].tagName === 'BUTTON') $el[0].disabled = disabled;

          if (swiper.params.watchOverflow && swiper.enabled) {
            $el[swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
          }
        }
      }

      function update() {
        // Update Navigation Buttons
        if (swiper.params.loop) return;
        const {
          $nextEl,
          $prevEl
        } = swiper.navigation;
        toggleEl($prevEl, swiper.isBeginning && !swiper.params.rewind);
        toggleEl($nextEl, swiper.isEnd && !swiper.params.rewind);
      }

      function onPrevClick(e) {
        e.preventDefault();
        if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
        swiper.slidePrev();
      }

      function onNextClick(e) {
        e.preventDefault();
        if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
        swiper.slideNext();
      }

      function init() {
        const params = swiper.params.navigation;
        swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
          nextEl: 'swiper-button-next',
          prevEl: 'swiper-button-prev'
        });
        if (!(params.nextEl || params.prevEl)) return;
        const $nextEl = getEl(params.nextEl);
        const $prevEl = getEl(params.prevEl);

        if ($nextEl && $nextEl.length > 0) {
          $nextEl.on('click', onNextClick);
        }

        if ($prevEl && $prevEl.length > 0) {
          $prevEl.on('click', onPrevClick);
        }

        Object.assign(swiper.navigation, {
          $nextEl,
          nextEl: $nextEl && $nextEl[0],
          $prevEl,
          prevEl: $prevEl && $prevEl[0]
        });

        if (!swiper.enabled) {
          if ($nextEl) $nextEl.addClass(params.lockClass);
          if ($prevEl) $prevEl.addClass(params.lockClass);
        }
      }

      function destroy() {
        const {
          $nextEl,
          $prevEl
        } = swiper.navigation;

        if ($nextEl && $nextEl.length) {
          $nextEl.off('click', onNextClick);
          $nextEl.removeClass(swiper.params.navigation.disabledClass);
        }

        if ($prevEl && $prevEl.length) {
          $prevEl.off('click', onPrevClick);
          $prevEl.removeClass(swiper.params.navigation.disabledClass);
        }
      }

      on('init', () => {
        if (swiper.params.navigation.enabled === false) {
          // eslint-disable-next-line
          disable();
        } else {
          init();
          update();
        }
      });
      on('toEdge fromEdge lock unlock', () => {
        update();
      });
      on('destroy', () => {
        destroy();
      });
      on('enable disable', () => {
        const {
          $nextEl,
          $prevEl
        } = swiper.navigation;

        if ($nextEl) {
          $nextEl[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.navigation.lockClass);
        }

        if ($prevEl) {
          $prevEl[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.navigation.lockClass);
        }
      });
      on('click', (_s, e) => {
        const {
          $nextEl,
          $prevEl
        } = swiper.navigation;
        const targetEl = e.target;

        if (swiper.params.navigation.hideOnClick && !$(targetEl).is($prevEl) && !$(targetEl).is($nextEl)) {
          if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
          let isHidden;

          if ($nextEl) {
            isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass);
          } else if ($prevEl) {
            isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
          }

          if (isHidden === true) {
            emit('navigationShow');
          } else {
            emit('navigationHide');
          }

          if ($nextEl) {
            $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
          }

          if ($prevEl) {
            $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
          }
        }
      });

      const enable = () => {
        swiper.$el.removeClass(swiper.params.navigation.navigationDisabledClass);
        init();
        update();
      };

      const disable = () => {
        swiper.$el.addClass(swiper.params.navigation.navigationDisabledClass);
        destroy();
      };

      Object.assign(swiper.navigation, {
        enable,
        disable,
        update,
        init,
        destroy
      });
    }

    function classesToSelector(classes) {
      if (classes === void 0) {
        classes = '';
      }

      return `.${classes.trim().replace(/([\.:!\/])/g, '\\$1') // eslint-disable-line
  .replace(/ /g, '.')}`;
    }

    function Pagination(_ref) {
      let {
        swiper,
        extendParams,
        on,
        emit
      } = _ref;
      const pfx = 'swiper-pagination';
      extendParams({
        pagination: {
          el: null,
          bulletElement: 'span',
          clickable: false,
          hideOnClick: false,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: false,
          type: 'bullets',
          // 'bullets' or 'progressbar' or 'fraction' or 'custom'
          dynamicBullets: false,
          dynamicMainBullets: 1,
          formatFractionCurrent: number => number,
          formatFractionTotal: number => number,
          bulletClass: `${pfx}-bullet`,
          bulletActiveClass: `${pfx}-bullet-active`,
          modifierClass: `${pfx}-`,
          currentClass: `${pfx}-current`,
          totalClass: `${pfx}-total`,
          hiddenClass: `${pfx}-hidden`,
          progressbarFillClass: `${pfx}-progressbar-fill`,
          progressbarOppositeClass: `${pfx}-progressbar-opposite`,
          clickableClass: `${pfx}-clickable`,
          lockClass: `${pfx}-lock`,
          horizontalClass: `${pfx}-horizontal`,
          verticalClass: `${pfx}-vertical`,
          paginationDisabledClass: `${pfx}-disabled`
        }
      });
      swiper.pagination = {
        el: null,
        $el: null,
        bullets: []
      };
      let bulletSize;
      let dynamicBulletIndex = 0;

      function isPaginationDisabled() {
        return !swiper.params.pagination.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0;
      }

      function setSideBullets($bulletEl, position) {
        const {
          bulletActiveClass
        } = swiper.params.pagination;
        $bulletEl[position]().addClass(`${bulletActiveClass}-${position}`)[position]().addClass(`${bulletActiveClass}-${position}-${position}`);
      }

      function update() {
        // Render || Update Pagination bullets/items
        const rtl = swiper.rtl;
        const params = swiper.params.pagination;
        if (isPaginationDisabled()) return;
        const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
        const $el = swiper.pagination.$el; // Current/Total

        let current;
        const total = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;

        if (swiper.params.loop) {
          current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);

          if (current > slidesLength - 1 - swiper.loopedSlides * 2) {
            current -= slidesLength - swiper.loopedSlides * 2;
          }

          if (current > total - 1) current -= total;
          if (current < 0 && swiper.params.paginationType !== 'bullets') current = total + current;
        } else if (typeof swiper.snapIndex !== 'undefined') {
          current = swiper.snapIndex;
        } else {
          current = swiper.activeIndex || 0;
        } // Types


        if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
          const bullets = swiper.pagination.bullets;
          let firstIndex;
          let lastIndex;
          let midIndex;

          if (params.dynamicBullets) {
            bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
            $el.css(swiper.isHorizontal() ? 'width' : 'height', `${bulletSize * (params.dynamicMainBullets + 4)}px`);

            if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
              dynamicBulletIndex += current - (swiper.previousIndex - swiper.loopedSlides || 0);

              if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
                dynamicBulletIndex = params.dynamicMainBullets - 1;
              } else if (dynamicBulletIndex < 0) {
                dynamicBulletIndex = 0;
              }
            }

            firstIndex = Math.max(current - dynamicBulletIndex, 0);
            lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
            midIndex = (lastIndex + firstIndex) / 2;
          }

          bullets.removeClass(['', '-next', '-next-next', '-prev', '-prev-prev', '-main'].map(suffix => `${params.bulletActiveClass}${suffix}`).join(' '));

          if ($el.length > 1) {
            bullets.each(bullet => {
              const $bullet = $(bullet);
              const bulletIndex = $bullet.index();

              if (bulletIndex === current) {
                $bullet.addClass(params.bulletActiveClass);
              }

              if (params.dynamicBullets) {
                if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                  $bullet.addClass(`${params.bulletActiveClass}-main`);
                }

                if (bulletIndex === firstIndex) {
                  setSideBullets($bullet, 'prev');
                }

                if (bulletIndex === lastIndex) {
                  setSideBullets($bullet, 'next');
                }
              }
            });
          } else {
            const $bullet = bullets.eq(current);
            const bulletIndex = $bullet.index();
            $bullet.addClass(params.bulletActiveClass);

            if (params.dynamicBullets) {
              const $firstDisplayedBullet = bullets.eq(firstIndex);
              const $lastDisplayedBullet = bullets.eq(lastIndex);

              for (let i = firstIndex; i <= lastIndex; i += 1) {
                bullets.eq(i).addClass(`${params.bulletActiveClass}-main`);
              }

              if (swiper.params.loop) {
                if (bulletIndex >= bullets.length) {
                  for (let i = params.dynamicMainBullets; i >= 0; i -= 1) {
                    bullets.eq(bullets.length - i).addClass(`${params.bulletActiveClass}-main`);
                  }

                  bullets.eq(bullets.length - params.dynamicMainBullets - 1).addClass(`${params.bulletActiveClass}-prev`);
                } else {
                  setSideBullets($firstDisplayedBullet, 'prev');
                  setSideBullets($lastDisplayedBullet, 'next');
                }
              } else {
                setSideBullets($firstDisplayedBullet, 'prev');
                setSideBullets($lastDisplayedBullet, 'next');
              }
            }
          }

          if (params.dynamicBullets) {
            const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
            const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
            const offsetProp = rtl ? 'right' : 'left';
            bullets.css(swiper.isHorizontal() ? offsetProp : 'top', `${bulletsOffset}px`);
          }
        }

        if (params.type === 'fraction') {
          $el.find(classesToSelector(params.currentClass)).text(params.formatFractionCurrent(current + 1));
          $el.find(classesToSelector(params.totalClass)).text(params.formatFractionTotal(total));
        }

        if (params.type === 'progressbar') {
          let progressbarDirection;

          if (params.progressbarOpposite) {
            progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
          } else {
            progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
          }

          const scale = (current + 1) / total;
          let scaleX = 1;
          let scaleY = 1;

          if (progressbarDirection === 'horizontal') {
            scaleX = scale;
          } else {
            scaleY = scale;
          }

          $el.find(classesToSelector(params.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`).transition(swiper.params.speed);
        }

        if (params.type === 'custom' && params.renderCustom) {
          $el.html(params.renderCustom(swiper, current + 1, total));
          emit('paginationRender', $el[0]);
        } else {
          emit('paginationUpdate', $el[0]);
        }

        if (swiper.params.watchOverflow && swiper.enabled) {
          $el[swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
        }
      }

      function render() {
        // Render Container
        const params = swiper.params.pagination;
        if (isPaginationDisabled()) return;
        const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
        const $el = swiper.pagination.$el;
        let paginationHTML = '';

        if (params.type === 'bullets') {
          let numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;

          if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.loop && numberOfBullets > slidesLength) {
            numberOfBullets = slidesLength;
          }

          for (let i = 0; i < numberOfBullets; i += 1) {
            if (params.renderBullet) {
              paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
            } else {
              paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
            }
          }

          $el.html(paginationHTML);
          swiper.pagination.bullets = $el.find(classesToSelector(params.bulletClass));
        }

        if (params.type === 'fraction') {
          if (params.renderFraction) {
            paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
          } else {
            paginationHTML = `<span class="${params.currentClass}"></span>` + ' / ' + `<span class="${params.totalClass}"></span>`;
          }

          $el.html(paginationHTML);
        }

        if (params.type === 'progressbar') {
          if (params.renderProgressbar) {
            paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
          } else {
            paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
          }

          $el.html(paginationHTML);
        }

        if (params.type !== 'custom') {
          emit('paginationRender', swiper.pagination.$el[0]);
        }
      }

      function init() {
        swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
          el: 'swiper-pagination'
        });
        const params = swiper.params.pagination;
        if (!params.el) return;
        let $el = $(params.el);
        if ($el.length === 0) return;

        if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1) {
          $el = swiper.$el.find(params.el); // check if it belongs to another nested Swiper

          if ($el.length > 1) {
            $el = $el.filter(el => {
              if ($(el).parents('.swiper')[0] !== swiper.el) return false;
              return true;
            });
          }
        }

        if (params.type === 'bullets' && params.clickable) {
          $el.addClass(params.clickableClass);
        }

        $el.addClass(params.modifierClass + params.type);
        $el.addClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);

        if (params.type === 'bullets' && params.dynamicBullets) {
          $el.addClass(`${params.modifierClass}${params.type}-dynamic`);
          dynamicBulletIndex = 0;

          if (params.dynamicMainBullets < 1) {
            params.dynamicMainBullets = 1;
          }
        }

        if (params.type === 'progressbar' && params.progressbarOpposite) {
          $el.addClass(params.progressbarOppositeClass);
        }

        if (params.clickable) {
          $el.on('click', classesToSelector(params.bulletClass), function onClick(e) {
            e.preventDefault();
            let index = $(this).index() * swiper.params.slidesPerGroup;
            if (swiper.params.loop) index += swiper.loopedSlides;
            swiper.slideTo(index);
          });
        }

        Object.assign(swiper.pagination, {
          $el,
          el: $el[0]
        });

        if (!swiper.enabled) {
          $el.addClass(params.lockClass);
        }
      }

      function destroy() {
        const params = swiper.params.pagination;
        if (isPaginationDisabled()) return;
        const $el = swiper.pagination.$el;
        $el.removeClass(params.hiddenClass);
        $el.removeClass(params.modifierClass + params.type);
        $el.removeClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
        if (swiper.pagination.bullets && swiper.pagination.bullets.removeClass) swiper.pagination.bullets.removeClass(params.bulletActiveClass);

        if (params.clickable) {
          $el.off('click', classesToSelector(params.bulletClass));
        }
      }

      on('init', () => {
        if (swiper.params.pagination.enabled === false) {
          // eslint-disable-next-line
          disable();
        } else {
          init();
          render();
          update();
        }
      });
      on('activeIndexChange', () => {
        if (swiper.params.loop) {
          update();
        } else if (typeof swiper.snapIndex === 'undefined') {
          update();
        }
      });
      on('snapIndexChange', () => {
        if (!swiper.params.loop) {
          update();
        }
      });
      on('slidesLengthChange', () => {
        if (swiper.params.loop) {
          render();
          update();
        }
      });
      on('snapGridLengthChange', () => {
        if (!swiper.params.loop) {
          render();
          update();
        }
      });
      on('destroy', () => {
        destroy();
      });
      on('enable disable', () => {
        const {
          $el
        } = swiper.pagination;

        if ($el) {
          $el[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.pagination.lockClass);
        }
      });
      on('lock unlock', () => {
        update();
      });
      on('click', (_s, e) => {
        const targetEl = e.target;
        const {
          $el
        } = swiper.pagination;

        if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && $el.length > 0 && !$(targetEl).hasClass(swiper.params.pagination.bulletClass)) {
          if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
          const isHidden = $el.hasClass(swiper.params.pagination.hiddenClass);

          if (isHidden === true) {
            emit('paginationShow');
          } else {
            emit('paginationHide');
          }

          $el.toggleClass(swiper.params.pagination.hiddenClass);
        }
      });

      const enable = () => {
        swiper.$el.removeClass(swiper.params.pagination.paginationDisabledClass);

        if (swiper.pagination.$el) {
          swiper.pagination.$el.removeClass(swiper.params.pagination.paginationDisabledClass);
        }

        init();
        render();
        update();
      };

      const disable = () => {
        swiper.$el.addClass(swiper.params.pagination.paginationDisabledClass);

        if (swiper.pagination.$el) {
          swiper.pagination.$el.addClass(swiper.params.pagination.paginationDisabledClass);
        }

        destroy();
      };

      Object.assign(swiper.pagination, {
        enable,
        disable,
        render,
        update,
        init,
        destroy
      });
    }

    function Scrollbar(_ref) {
      let {
        swiper,
        extendParams,
        on,
        emit
      } = _ref;
      const document = getDocument();
      let isTouched = false;
      let timeout = null;
      let dragTimeout = null;
      let dragStartPos;
      let dragSize;
      let trackSize;
      let divider;
      extendParams({
        scrollbar: {
          el: null,
          dragSize: 'auto',
          hide: false,
          draggable: false,
          snapOnRelease: true,
          lockClass: 'swiper-scrollbar-lock',
          dragClass: 'swiper-scrollbar-drag',
          scrollbarDisabledClass: 'swiper-scrollbar-disabled',
          horizontalClass: `swiper-scrollbar-horizontal`,
          verticalClass: `swiper-scrollbar-vertical`
        }
      });
      swiper.scrollbar = {
        el: null,
        dragEl: null,
        $el: null,
        $dragEl: null
      };

      function setTranslate() {
        if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
        const {
          scrollbar,
          rtlTranslate: rtl,
          progress
        } = swiper;
        const {
          $dragEl,
          $el
        } = scrollbar;
        const params = swiper.params.scrollbar;
        let newSize = dragSize;
        let newPos = (trackSize - dragSize) * progress;

        if (rtl) {
          newPos = -newPos;

          if (newPos > 0) {
            newSize = dragSize - newPos;
            newPos = 0;
          } else if (-newPos + dragSize > trackSize) {
            newSize = trackSize + newPos;
          }
        } else if (newPos < 0) {
          newSize = dragSize + newPos;
          newPos = 0;
        } else if (newPos + dragSize > trackSize) {
          newSize = trackSize - newPos;
        }

        if (swiper.isHorizontal()) {
          $dragEl.transform(`translate3d(${newPos}px, 0, 0)`);
          $dragEl[0].style.width = `${newSize}px`;
        } else {
          $dragEl.transform(`translate3d(0px, ${newPos}px, 0)`);
          $dragEl[0].style.height = `${newSize}px`;
        }

        if (params.hide) {
          clearTimeout(timeout);
          $el[0].style.opacity = 1;
          timeout = setTimeout(() => {
            $el[0].style.opacity = 0;
            $el.transition(400);
          }, 1000);
        }
      }

      function setTransition(duration) {
        if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
        swiper.scrollbar.$dragEl.transition(duration);
      }

      function updateSize() {
        if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
        const {
          scrollbar
        } = swiper;
        const {
          $dragEl,
          $el
        } = scrollbar;
        $dragEl[0].style.width = '';
        $dragEl[0].style.height = '';
        trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;
        divider = swiper.size / (swiper.virtualSize + swiper.params.slidesOffsetBefore - (swiper.params.centeredSlides ? swiper.snapGrid[0] : 0));

        if (swiper.params.scrollbar.dragSize === 'auto') {
          dragSize = trackSize * divider;
        } else {
          dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
        }

        if (swiper.isHorizontal()) {
          $dragEl[0].style.width = `${dragSize}px`;
        } else {
          $dragEl[0].style.height = `${dragSize}px`;
        }

        if (divider >= 1) {
          $el[0].style.display = 'none';
        } else {
          $el[0].style.display = '';
        }

        if (swiper.params.scrollbar.hide) {
          $el[0].style.opacity = 0;
        }

        if (swiper.params.watchOverflow && swiper.enabled) {
          scrollbar.$el[swiper.isLocked ? 'addClass' : 'removeClass'](swiper.params.scrollbar.lockClass);
        }
      }

      function getPointerPosition(e) {
        if (swiper.isHorizontal()) {
          return e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].clientX : e.clientX;
        }

        return e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].clientY : e.clientY;
      }

      function setDragPosition(e) {
        const {
          scrollbar,
          rtlTranslate: rtl
        } = swiper;
        const {
          $el
        } = scrollbar;
        let positionRatio;
        positionRatio = (getPointerPosition(e) - $el.offset()[swiper.isHorizontal() ? 'left' : 'top'] - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
        positionRatio = Math.max(Math.min(positionRatio, 1), 0);

        if (rtl) {
          positionRatio = 1 - positionRatio;
        }

        const position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
        swiper.updateProgress(position);
        swiper.setTranslate(position);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }

      function onDragStart(e) {
        const params = swiper.params.scrollbar;
        const {
          scrollbar,
          $wrapperEl
        } = swiper;
        const {
          $el,
          $dragEl
        } = scrollbar;
        isTouched = true;
        dragStartPos = e.target === $dragEl[0] || e.target === $dragEl ? getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? 'left' : 'top'] : null;
        e.preventDefault();
        e.stopPropagation();
        $wrapperEl.transition(100);
        $dragEl.transition(100);
        setDragPosition(e);
        clearTimeout(dragTimeout);
        $el.transition(0);

        if (params.hide) {
          $el.css('opacity', 1);
        }

        if (swiper.params.cssMode) {
          swiper.$wrapperEl.css('scroll-snap-type', 'none');
        }

        emit('scrollbarDragStart', e);
      }

      function onDragMove(e) {
        const {
          scrollbar,
          $wrapperEl
        } = swiper;
        const {
          $el,
          $dragEl
        } = scrollbar;
        if (!isTouched) return;
        if (e.preventDefault) e.preventDefault();else e.returnValue = false;
        setDragPosition(e);
        $wrapperEl.transition(0);
        $el.transition(0);
        $dragEl.transition(0);
        emit('scrollbarDragMove', e);
      }

      function onDragEnd(e) {
        const params = swiper.params.scrollbar;
        const {
          scrollbar,
          $wrapperEl
        } = swiper;
        const {
          $el
        } = scrollbar;
        if (!isTouched) return;
        isTouched = false;

        if (swiper.params.cssMode) {
          swiper.$wrapperEl.css('scroll-snap-type', '');
          $wrapperEl.transition('');
        }

        if (params.hide) {
          clearTimeout(dragTimeout);
          dragTimeout = nextTick(() => {
            $el.css('opacity', 0);
            $el.transition(400);
          }, 1000);
        }

        emit('scrollbarDragEnd', e);

        if (params.snapOnRelease) {
          swiper.slideToClosest();
        }
      }

      function events(method) {
        const {
          scrollbar,
          touchEventsTouch,
          touchEventsDesktop,
          params,
          support
        } = swiper;
        const $el = scrollbar.$el;
        if (!$el) return;
        const target = $el[0];
        const activeListener = support.passiveListener && params.passiveListeners ? {
          passive: false,
          capture: false
        } : false;
        const passiveListener = support.passiveListener && params.passiveListeners ? {
          passive: true,
          capture: false
        } : false;
        if (!target) return;
        const eventMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';

        if (!support.touch) {
          target[eventMethod](touchEventsDesktop.start, onDragStart, activeListener);
          document[eventMethod](touchEventsDesktop.move, onDragMove, activeListener);
          document[eventMethod](touchEventsDesktop.end, onDragEnd, passiveListener);
        } else {
          target[eventMethod](touchEventsTouch.start, onDragStart, activeListener);
          target[eventMethod](touchEventsTouch.move, onDragMove, activeListener);
          target[eventMethod](touchEventsTouch.end, onDragEnd, passiveListener);
        }
      }

      function enableDraggable() {
        if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
        events('on');
      }

      function disableDraggable() {
        if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
        events('off');
      }

      function init() {
        const {
          scrollbar,
          $el: $swiperEl
        } = swiper;
        swiper.params.scrollbar = createElementIfNotDefined(swiper, swiper.originalParams.scrollbar, swiper.params.scrollbar, {
          el: 'swiper-scrollbar'
        });
        const params = swiper.params.scrollbar;
        if (!params.el) return;
        let $el = $(params.el);

        if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && $swiperEl.find(params.el).length === 1) {
          $el = $swiperEl.find(params.el);
        }

        $el.addClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
        let $dragEl = $el.find(`.${swiper.params.scrollbar.dragClass}`);

        if ($dragEl.length === 0) {
          $dragEl = $(`<div class="${swiper.params.scrollbar.dragClass}"></div>`);
          $el.append($dragEl);
        }

        Object.assign(scrollbar, {
          $el,
          el: $el[0],
          $dragEl,
          dragEl: $dragEl[0]
        });

        if (params.draggable) {
          enableDraggable();
        }

        if ($el) {
          $el[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.scrollbar.lockClass);
        }
      }

      function destroy() {
        const params = swiper.params.scrollbar;
        const $el = swiper.scrollbar.$el;

        if ($el) {
          $el.removeClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
        }

        disableDraggable();
      }

      on('init', () => {
        if (swiper.params.scrollbar.enabled === false) {
          // eslint-disable-next-line
          disable();
        } else {
          init();
          updateSize();
          setTranslate();
        }
      });
      on('update resize observerUpdate lock unlock', () => {
        updateSize();
      });
      on('setTranslate', () => {
        setTranslate();
      });
      on('setTransition', (_s, duration) => {
        setTransition(duration);
      });
      on('enable disable', () => {
        const {
          $el
        } = swiper.scrollbar;

        if ($el) {
          $el[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.scrollbar.lockClass);
        }
      });
      on('destroy', () => {
        destroy();
      });

      const enable = () => {
        swiper.$el.removeClass(swiper.params.scrollbar.scrollbarDisabledClass);

        if (swiper.scrollbar.$el) {
          swiper.scrollbar.$el.removeClass(swiper.params.scrollbar.scrollbarDisabledClass);
        }

        init();
        updateSize();
        setTranslate();
      };

      const disable = () => {
        swiper.$el.addClass(swiper.params.scrollbar.scrollbarDisabledClass);

        if (swiper.scrollbar.$el) {
          swiper.scrollbar.$el.addClass(swiper.params.scrollbar.scrollbarDisabledClass);
        }

        destroy();
      };

      Object.assign(swiper.scrollbar, {
        enable,
        disable,
        updateSize,
        setTranslate,
        init,
        destroy
      });
    }

    function Parallax(_ref) {
      let {
        swiper,
        extendParams,
        on
      } = _ref;
      extendParams({
        parallax: {
          enabled: false
        }
      });

      const setTransform = (el, progress) => {
        const {
          rtl
        } = swiper;
        const $el = $(el);
        const rtlFactor = rtl ? -1 : 1;
        const p = $el.attr('data-swiper-parallax') || '0';
        let x = $el.attr('data-swiper-parallax-x');
        let y = $el.attr('data-swiper-parallax-y');
        const scale = $el.attr('data-swiper-parallax-scale');
        const opacity = $el.attr('data-swiper-parallax-opacity');

        if (x || y) {
          x = x || '0';
          y = y || '0';
        } else if (swiper.isHorizontal()) {
          x = p;
          y = '0';
        } else {
          y = p;
          x = '0';
        }

        if (x.indexOf('%') >= 0) {
          x = `${parseInt(x, 10) * progress * rtlFactor}%`;
        } else {
          x = `${x * progress * rtlFactor}px`;
        }

        if (y.indexOf('%') >= 0) {
          y = `${parseInt(y, 10) * progress}%`;
        } else {
          y = `${y * progress}px`;
        }

        if (typeof opacity !== 'undefined' && opacity !== null) {
          const currentOpacity = opacity - (opacity - 1) * (1 - Math.abs(progress));
          $el[0].style.opacity = currentOpacity;
        }

        if (typeof scale === 'undefined' || scale === null) {
          $el.transform(`translate3d(${x}, ${y}, 0px)`);
        } else {
          const currentScale = scale - (scale - 1) * (1 - Math.abs(progress));
          $el.transform(`translate3d(${x}, ${y}, 0px) scale(${currentScale})`);
        }
      };

      const setTranslate = () => {
        const {
          $el,
          slides,
          progress,
          snapGrid
        } = swiper;
        $el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').each(el => {
          setTransform(el, progress);
        });
        slides.each((slideEl, slideIndex) => {
          let slideProgress = slideEl.progress;

          if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
            slideProgress += Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);
          }

          slideProgress = Math.min(Math.max(slideProgress, -1), 1);
          $(slideEl).find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').each(el => {
            setTransform(el, slideProgress);
          });
        });
      };

      const setTransition = function (duration) {
        if (duration === void 0) {
          duration = swiper.params.speed;
        }

        const {
          $el
        } = swiper;
        $el.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').each(parallaxEl => {
          const $parallaxEl = $(parallaxEl);
          let parallaxDuration = parseInt($parallaxEl.attr('data-swiper-parallax-duration'), 10) || duration;
          if (duration === 0) parallaxDuration = 0;
          $parallaxEl.transition(parallaxDuration);
        });
      };

      on('beforeInit', () => {
        if (!swiper.params.parallax.enabled) return;
        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      });
      on('init', () => {
        if (!swiper.params.parallax.enabled) return;
        setTranslate();
      });
      on('setTranslate', () => {
        if (!swiper.params.parallax.enabled) return;
        setTranslate();
      });
      on('setTransition', (_swiper, duration) => {
        if (!swiper.params.parallax.enabled) return;
        setTransition(duration);
      });
    }

    function Zoom(_ref) {
      let {
        swiper,
        extendParams,
        on,
        emit
      } = _ref;
      const window = getWindow();
      extendParams({
        zoom: {
          enabled: false,
          maxRatio: 3,
          minRatio: 1,
          toggle: true,
          containerClass: 'swiper-zoom-container',
          zoomedSlideClass: 'swiper-slide-zoomed'
        }
      });
      swiper.zoom = {
        enabled: false
      };
      let currentScale = 1;
      let isScaling = false;
      let gesturesEnabled;
      let fakeGestureTouched;
      let fakeGestureMoved;
      const gesture = {
        $slideEl: undefined,
        slideWidth: undefined,
        slideHeight: undefined,
        $imageEl: undefined,
        $imageWrapEl: undefined,
        maxRatio: 3
      };
      const image = {
        isTouched: undefined,
        isMoved: undefined,
        currentX: undefined,
        currentY: undefined,
        minX: undefined,
        minY: undefined,
        maxX: undefined,
        maxY: undefined,
        width: undefined,
        height: undefined,
        startX: undefined,
        startY: undefined,
        touchesStart: {},
        touchesCurrent: {}
      };
      const velocity = {
        x: undefined,
        y: undefined,
        prevPositionX: undefined,
        prevPositionY: undefined,
        prevTime: undefined
      };
      let scale = 1;
      Object.defineProperty(swiper.zoom, 'scale', {
        get() {
          return scale;
        },

        set(value) {
          if (scale !== value) {
            const imageEl = gesture.$imageEl ? gesture.$imageEl[0] : undefined;
            const slideEl = gesture.$slideEl ? gesture.$slideEl[0] : undefined;
            emit('zoomChange', value, imageEl, slideEl);
          }

          scale = value;
        }

      });

      function getDistanceBetweenTouches(e) {
        if (e.targetTouches.length < 2) return 1;
        const x1 = e.targetTouches[0].pageX;
        const y1 = e.targetTouches[0].pageY;
        const x2 = e.targetTouches[1].pageX;
        const y2 = e.targetTouches[1].pageY;
        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        return distance;
      } // Events


      function onGestureStart(e) {
        const support = swiper.support;
        const params = swiper.params.zoom;
        fakeGestureTouched = false;
        fakeGestureMoved = false;

        if (!support.gestures) {
          if (e.type !== 'touchstart' || e.type === 'touchstart' && e.targetTouches.length < 2) {
            return;
          }

          fakeGestureTouched = true;
          gesture.scaleStart = getDistanceBetweenTouches(e);
        }

        if (!gesture.$slideEl || !gesture.$slideEl.length) {
          gesture.$slideEl = $(e.target).closest(`.${swiper.params.slideClass}`);
          if (gesture.$slideEl.length === 0) gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
          gesture.$imageEl = gesture.$slideEl.find(`.${params.containerClass}`).eq(0).find('picture, img, svg, canvas, .swiper-zoom-target').eq(0);
          gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);
          gesture.maxRatio = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;

          if (gesture.$imageWrapEl.length === 0) {
            gesture.$imageEl = undefined;
            return;
          }
        }

        if (gesture.$imageEl) {
          gesture.$imageEl.transition(0);
        }

        isScaling = true;
      }

      function onGestureChange(e) {
        const support = swiper.support;
        const params = swiper.params.zoom;
        const zoom = swiper.zoom;

        if (!support.gestures) {
          if (e.type !== 'touchmove' || e.type === 'touchmove' && e.targetTouches.length < 2) {
            return;
          }

          fakeGestureMoved = true;
          gesture.scaleMove = getDistanceBetweenTouches(e);
        }

        if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
          if (e.type === 'gesturechange') onGestureStart(e);
          return;
        }

        if (support.gestures) {
          zoom.scale = e.scale * currentScale;
        } else {
          zoom.scale = gesture.scaleMove / gesture.scaleStart * currentScale;
        }

        if (zoom.scale > gesture.maxRatio) {
          zoom.scale = gesture.maxRatio - 1 + (zoom.scale - gesture.maxRatio + 1) ** 0.5;
        }

        if (zoom.scale < params.minRatio) {
          zoom.scale = params.minRatio + 1 - (params.minRatio - zoom.scale + 1) ** 0.5;
        }

        gesture.$imageEl.transform(`translate3d(0,0,0) scale(${zoom.scale})`);
      }

      function onGestureEnd(e) {
        const device = swiper.device;
        const support = swiper.support;
        const params = swiper.params.zoom;
        const zoom = swiper.zoom;

        if (!support.gestures) {
          if (!fakeGestureTouched || !fakeGestureMoved) {
            return;
          }

          if (e.type !== 'touchend' || e.type === 'touchend' && e.changedTouches.length < 2 && !device.android) {
            return;
          }

          fakeGestureTouched = false;
          fakeGestureMoved = false;
        }

        if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
        zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
        gesture.$imageEl.transition(swiper.params.speed).transform(`translate3d(0,0,0) scale(${zoom.scale})`);
        currentScale = zoom.scale;
        isScaling = false;
        if (zoom.scale === 1) gesture.$slideEl = undefined;
      }

      function onTouchStart(e) {
        const device = swiper.device;
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
        if (image.isTouched) return;
        if (device.android && e.cancelable) e.preventDefault();
        image.isTouched = true;
        image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      }

      function onTouchMove(e) {
        const zoom = swiper.zoom;
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
        swiper.allowClick = false;
        if (!image.isTouched || !gesture.$slideEl) return;

        if (!image.isMoved) {
          image.width = gesture.$imageEl[0].offsetWidth;
          image.height = gesture.$imageEl[0].offsetHeight;
          image.startX = getTranslate(gesture.$imageWrapEl[0], 'x') || 0;
          image.startY = getTranslate(gesture.$imageWrapEl[0], 'y') || 0;
          gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
          gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
          gesture.$imageWrapEl.transition(0);
        } // Define if we need image drag


        const scaledWidth = image.width * zoom.scale;
        const scaledHeight = image.height * zoom.scale;
        if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) return;
        image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
        image.maxX = -image.minX;
        image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
        image.maxY = -image.minY;
        image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

        if (!image.isMoved && !isScaling) {
          if (swiper.isHorizontal() && (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x || Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)) {
            image.isTouched = false;
            return;
          }

          if (!swiper.isHorizontal() && (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y || Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)) {
            image.isTouched = false;
            return;
          }
        }

        if (e.cancelable) {
          e.preventDefault();
        }

        e.stopPropagation();
        image.isMoved = true;
        image.currentX = image.touchesCurrent.x - image.touchesStart.x + image.startX;
        image.currentY = image.touchesCurrent.y - image.touchesStart.y + image.startY;

        if (image.currentX < image.minX) {
          image.currentX = image.minX + 1 - (image.minX - image.currentX + 1) ** 0.8;
        }

        if (image.currentX > image.maxX) {
          image.currentX = image.maxX - 1 + (image.currentX - image.maxX + 1) ** 0.8;
        }

        if (image.currentY < image.minY) {
          image.currentY = image.minY + 1 - (image.minY - image.currentY + 1) ** 0.8;
        }

        if (image.currentY > image.maxY) {
          image.currentY = image.maxY - 1 + (image.currentY - image.maxY + 1) ** 0.8;
        } // Velocity


        if (!velocity.prevPositionX) velocity.prevPositionX = image.touchesCurrent.x;
        if (!velocity.prevPositionY) velocity.prevPositionY = image.touchesCurrent.y;
        if (!velocity.prevTime) velocity.prevTime = Date.now();
        velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
        velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
        if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) velocity.x = 0;
        if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) velocity.y = 0;
        velocity.prevPositionX = image.touchesCurrent.x;
        velocity.prevPositionY = image.touchesCurrent.y;
        velocity.prevTime = Date.now();
        gesture.$imageWrapEl.transform(`translate3d(${image.currentX}px, ${image.currentY}px,0)`);
      }

      function onTouchEnd() {
        const zoom = swiper.zoom;
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;

        if (!image.isTouched || !image.isMoved) {
          image.isTouched = false;
          image.isMoved = false;
          return;
        }

        image.isTouched = false;
        image.isMoved = false;
        let momentumDurationX = 300;
        let momentumDurationY = 300;
        const momentumDistanceX = velocity.x * momentumDurationX;
        const newPositionX = image.currentX + momentumDistanceX;
        const momentumDistanceY = velocity.y * momentumDurationY;
        const newPositionY = image.currentY + momentumDistanceY; // Fix duration

        if (velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x);
        if (velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y);
        const momentumDuration = Math.max(momentumDurationX, momentumDurationY);
        image.currentX = newPositionX;
        image.currentY = newPositionY; // Define if we need image drag

        const scaledWidth = image.width * zoom.scale;
        const scaledHeight = image.height * zoom.scale;
        image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
        image.maxX = -image.minX;
        image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
        image.maxY = -image.minY;
        image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
        image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);
        gesture.$imageWrapEl.transition(momentumDuration).transform(`translate3d(${image.currentX}px, ${image.currentY}px,0)`);
      }

      function onTransitionEnd() {
        const zoom = swiper.zoom;

        if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {
          if (gesture.$imageEl) {
            gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');
          }

          if (gesture.$imageWrapEl) {
            gesture.$imageWrapEl.transform('translate3d(0,0,0)');
          }

          zoom.scale = 1;
          currentScale = 1;
          gesture.$slideEl = undefined;
          gesture.$imageEl = undefined;
          gesture.$imageWrapEl = undefined;
        }
      }

      function zoomIn(e) {
        const zoom = swiper.zoom;
        const params = swiper.params.zoom;

        if (!gesture.$slideEl) {
          if (e && e.target) {
            gesture.$slideEl = $(e.target).closest(`.${swiper.params.slideClass}`);
          }

          if (!gesture.$slideEl) {
            if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
              gesture.$slideEl = swiper.$wrapperEl.children(`.${swiper.params.slideActiveClass}`);
            } else {
              gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
            }
          }

          gesture.$imageEl = gesture.$slideEl.find(`.${params.containerClass}`).eq(0).find('picture, img, svg, canvas, .swiper-zoom-target').eq(0);
          gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);
        }

        if (!gesture.$imageEl || gesture.$imageEl.length === 0 || !gesture.$imageWrapEl || gesture.$imageWrapEl.length === 0) return;

        if (swiper.params.cssMode) {
          swiper.wrapperEl.style.overflow = 'hidden';
          swiper.wrapperEl.style.touchAction = 'none';
        }

        gesture.$slideEl.addClass(`${params.zoomedSlideClass}`);
        let touchX;
        let touchY;
        let offsetX;
        let offsetY;
        let diffX;
        let diffY;
        let translateX;
        let translateY;
        let imageWidth;
        let imageHeight;
        let scaledWidth;
        let scaledHeight;
        let translateMinX;
        let translateMinY;
        let translateMaxX;
        let translateMaxY;
        let slideWidth;
        let slideHeight;

        if (typeof image.touchesStart.x === 'undefined' && e) {
          touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
          touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
        } else {
          touchX = image.touchesStart.x;
          touchY = image.touchesStart.y;
        }

        zoom.scale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
        currentScale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;

        if (e) {
          slideWidth = gesture.$slideEl[0].offsetWidth;
          slideHeight = gesture.$slideEl[0].offsetHeight;
          offsetX = gesture.$slideEl.offset().left + window.scrollX;
          offsetY = gesture.$slideEl.offset().top + window.scrollY;
          diffX = offsetX + slideWidth / 2 - touchX;
          diffY = offsetY + slideHeight / 2 - touchY;
          imageWidth = gesture.$imageEl[0].offsetWidth;
          imageHeight = gesture.$imageEl[0].offsetHeight;
          scaledWidth = imageWidth * zoom.scale;
          scaledHeight = imageHeight * zoom.scale;
          translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
          translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
          translateMaxX = -translateMinX;
          translateMaxY = -translateMinY;
          translateX = diffX * zoom.scale;
          translateY = diffY * zoom.scale;

          if (translateX < translateMinX) {
            translateX = translateMinX;
          }

          if (translateX > translateMaxX) {
            translateX = translateMaxX;
          }

          if (translateY < translateMinY) {
            translateY = translateMinY;
          }

          if (translateY > translateMaxY) {
            translateY = translateMaxY;
          }
        } else {
          translateX = 0;
          translateY = 0;
        }

        gesture.$imageWrapEl.transition(300).transform(`translate3d(${translateX}px, ${translateY}px,0)`);
        gesture.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${zoom.scale})`);
      }

      function zoomOut() {
        const zoom = swiper.zoom;
        const params = swiper.params.zoom;

        if (!gesture.$slideEl) {
          if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
            gesture.$slideEl = swiper.$wrapperEl.children(`.${swiper.params.slideActiveClass}`);
          } else {
            gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
          }

          gesture.$imageEl = gesture.$slideEl.find(`.${params.containerClass}`).eq(0).find('picture, img, svg, canvas, .swiper-zoom-target').eq(0);
          gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);
        }

        if (!gesture.$imageEl || gesture.$imageEl.length === 0 || !gesture.$imageWrapEl || gesture.$imageWrapEl.length === 0) return;

        if (swiper.params.cssMode) {
          swiper.wrapperEl.style.overflow = '';
          swiper.wrapperEl.style.touchAction = '';
        }

        zoom.scale = 1;
        currentScale = 1;
        gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');
        gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');
        gesture.$slideEl.removeClass(`${params.zoomedSlideClass}`);
        gesture.$slideEl = undefined;
      } // Toggle Zoom


      function zoomToggle(e) {
        const zoom = swiper.zoom;

        if (zoom.scale && zoom.scale !== 1) {
          // Zoom Out
          zoomOut();
        } else {
          // Zoom In
          zoomIn(e);
        }
      }

      function getListeners() {
        const support = swiper.support;
        const passiveListener = swiper.touchEvents.start === 'touchstart' && support.passiveListener && swiper.params.passiveListeners ? {
          passive: true,
          capture: false
        } : false;
        const activeListenerWithCapture = support.passiveListener ? {
          passive: false,
          capture: true
        } : true;
        return {
          passiveListener,
          activeListenerWithCapture
        };
      }

      function getSlideSelector() {
        return `.${swiper.params.slideClass}`;
      }

      function toggleGestures(method) {
        const {
          passiveListener
        } = getListeners();
        const slideSelector = getSlideSelector();
        swiper.$wrapperEl[method]('gesturestart', slideSelector, onGestureStart, passiveListener);
        swiper.$wrapperEl[method]('gesturechange', slideSelector, onGestureChange, passiveListener);
        swiper.$wrapperEl[method]('gestureend', slideSelector, onGestureEnd, passiveListener);
      }

      function enableGestures() {
        if (gesturesEnabled) return;
        gesturesEnabled = true;
        toggleGestures('on');
      }

      function disableGestures() {
        if (!gesturesEnabled) return;
        gesturesEnabled = false;
        toggleGestures('off');
      } // Attach/Detach Events


      function enable() {
        const zoom = swiper.zoom;
        if (zoom.enabled) return;
        zoom.enabled = true;
        const support = swiper.support;
        const {
          passiveListener,
          activeListenerWithCapture
        } = getListeners();
        const slideSelector = getSlideSelector(); // Scale image

        if (support.gestures) {
          swiper.$wrapperEl.on(swiper.touchEvents.start, enableGestures, passiveListener);
          swiper.$wrapperEl.on(swiper.touchEvents.end, disableGestures, passiveListener);
        } else if (swiper.touchEvents.start === 'touchstart') {
          swiper.$wrapperEl.on(swiper.touchEvents.start, slideSelector, onGestureStart, passiveListener);
          swiper.$wrapperEl.on(swiper.touchEvents.move, slideSelector, onGestureChange, activeListenerWithCapture);
          swiper.$wrapperEl.on(swiper.touchEvents.end, slideSelector, onGestureEnd, passiveListener);

          if (swiper.touchEvents.cancel) {
            swiper.$wrapperEl.on(swiper.touchEvents.cancel, slideSelector, onGestureEnd, passiveListener);
          }
        } // Move image


        swiper.$wrapperEl.on(swiper.touchEvents.move, `.${swiper.params.zoom.containerClass}`, onTouchMove, activeListenerWithCapture);
      }

      function disable() {
        const zoom = swiper.zoom;
        if (!zoom.enabled) return;
        const support = swiper.support;
        zoom.enabled = false;
        const {
          passiveListener,
          activeListenerWithCapture
        } = getListeners();
        const slideSelector = getSlideSelector(); // Scale image

        if (support.gestures) {
          swiper.$wrapperEl.off(swiper.touchEvents.start, enableGestures, passiveListener);
          swiper.$wrapperEl.off(swiper.touchEvents.end, disableGestures, passiveListener);
        } else if (swiper.touchEvents.start === 'touchstart') {
          swiper.$wrapperEl.off(swiper.touchEvents.start, slideSelector, onGestureStart, passiveListener);
          swiper.$wrapperEl.off(swiper.touchEvents.move, slideSelector, onGestureChange, activeListenerWithCapture);
          swiper.$wrapperEl.off(swiper.touchEvents.end, slideSelector, onGestureEnd, passiveListener);

          if (swiper.touchEvents.cancel) {
            swiper.$wrapperEl.off(swiper.touchEvents.cancel, slideSelector, onGestureEnd, passiveListener);
          }
        } // Move image


        swiper.$wrapperEl.off(swiper.touchEvents.move, `.${swiper.params.zoom.containerClass}`, onTouchMove, activeListenerWithCapture);
      }

      on('init', () => {
        if (swiper.params.zoom.enabled) {
          enable();
        }
      });
      on('destroy', () => {
        disable();
      });
      on('touchStart', (_s, e) => {
        if (!swiper.zoom.enabled) return;
        onTouchStart(e);
      });
      on('touchEnd', (_s, e) => {
        if (!swiper.zoom.enabled) return;
        onTouchEnd();
      });
      on('doubleTap', (_s, e) => {
        if (!swiper.animating && swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
          zoomToggle(e);
        }
      });
      on('transitionEnd', () => {
        if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
          onTransitionEnd();
        }
      });
      on('slideChange', () => {
        if (swiper.zoom.enabled && swiper.params.zoom.enabled && swiper.params.cssMode) {
          onTransitionEnd();
        }
      });
      Object.assign(swiper.zoom, {
        enable,
        disable,
        in: zoomIn,
        out: zoomOut,
        toggle: zoomToggle
      });
    }

    function Lazy(_ref) {
      let {
        swiper,
        extendParams,
        on,
        emit
      } = _ref;
      extendParams({
        lazy: {
          checkInView: false,
          enabled: false,
          loadPrevNext: false,
          loadPrevNextAmount: 1,
          loadOnTransitionStart: false,
          scrollingElement: '',
          elementClass: 'swiper-lazy',
          loadingClass: 'swiper-lazy-loading',
          loadedClass: 'swiper-lazy-loaded',
          preloaderClass: 'swiper-lazy-preloader'
        }
      });
      swiper.lazy = {};
      let scrollHandlerAttached = false;
      let initialImageLoaded = false;

      function loadInSlide(index, loadInDuplicate) {
        if (loadInDuplicate === void 0) {
          loadInDuplicate = true;
        }

        const params = swiper.params.lazy;
        if (typeof index === 'undefined') return;
        if (swiper.slides.length === 0) return;
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        const $slideEl = isVirtual ? swiper.$wrapperEl.children(`.${swiper.params.slideClass}[data-swiper-slide-index="${index}"]`) : swiper.slides.eq(index);
        const $images = $slideEl.find(`.${params.elementClass}:not(.${params.loadedClass}):not(.${params.loadingClass})`);

        if ($slideEl.hasClass(params.elementClass) && !$slideEl.hasClass(params.loadedClass) && !$slideEl.hasClass(params.loadingClass)) {
          $images.push($slideEl[0]);
        }

        if ($images.length === 0) return;
        $images.each(imageEl => {
          const $imageEl = $(imageEl);
          $imageEl.addClass(params.loadingClass);
          const background = $imageEl.attr('data-background');
          const src = $imageEl.attr('data-src');
          const srcset = $imageEl.attr('data-srcset');
          const sizes = $imageEl.attr('data-sizes');
          const $pictureEl = $imageEl.parent('picture');
          swiper.loadImage($imageEl[0], src || background, srcset, sizes, false, () => {
            if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper && !swiper.params || swiper.destroyed) return;

            if (background) {
              $imageEl.css('background-image', `url("${background}")`);
              $imageEl.removeAttr('data-background');
            } else {
              if (srcset) {
                $imageEl.attr('srcset', srcset);
                $imageEl.removeAttr('data-srcset');
              }

              if (sizes) {
                $imageEl.attr('sizes', sizes);
                $imageEl.removeAttr('data-sizes');
              }

              if ($pictureEl.length) {
                $pictureEl.children('source').each(sourceEl => {
                  const $source = $(sourceEl);

                  if ($source.attr('data-srcset')) {
                    $source.attr('srcset', $source.attr('data-srcset'));
                    $source.removeAttr('data-srcset');
                  }
                });
              }

              if (src) {
                $imageEl.attr('src', src);
                $imageEl.removeAttr('data-src');
              }
            }

            $imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);
            $slideEl.find(`.${params.preloaderClass}`).remove();

            if (swiper.params.loop && loadInDuplicate) {
              const slideOriginalIndex = $slideEl.attr('data-swiper-slide-index');

              if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
                const originalSlide = swiper.$wrapperEl.children(`[data-swiper-slide-index="${slideOriginalIndex}"]:not(.${swiper.params.slideDuplicateClass})`);
                loadInSlide(originalSlide.index(), false);
              } else {
                const duplicatedSlide = swiper.$wrapperEl.children(`.${swiper.params.slideDuplicateClass}[data-swiper-slide-index="${slideOriginalIndex}"]`);
                loadInSlide(duplicatedSlide.index(), false);
              }
            }

            emit('lazyImageReady', $slideEl[0], $imageEl[0]);

            if (swiper.params.autoHeight) {
              swiper.updateAutoHeight();
            }
          });
          emit('lazyImageLoad', $slideEl[0], $imageEl[0]);
        });
      }

      function load() {
        const {
          $wrapperEl,
          params: swiperParams,
          slides,
          activeIndex
        } = swiper;
        const isVirtual = swiper.virtual && swiperParams.virtual.enabled;
        const params = swiperParams.lazy;
        let slidesPerView = swiperParams.slidesPerView;

        if (slidesPerView === 'auto') {
          slidesPerView = 0;
        }

        function slideExist(index) {
          if (isVirtual) {
            if ($wrapperEl.children(`.${swiperParams.slideClass}[data-swiper-slide-index="${index}"]`).length) {
              return true;
            }
          } else if (slides[index]) return true;

          return false;
        }

        function slideIndex(slideEl) {
          if (isVirtual) {
            return $(slideEl).attr('data-swiper-slide-index');
          }

          return $(slideEl).index();
        }

        if (!initialImageLoaded) initialImageLoaded = true;

        if (swiper.params.watchSlidesProgress) {
          $wrapperEl.children(`.${swiperParams.slideVisibleClass}`).each(slideEl => {
            const index = isVirtual ? $(slideEl).attr('data-swiper-slide-index') : $(slideEl).index();
            loadInSlide(index);
          });
        } else if (slidesPerView > 1) {
          for (let i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
            if (slideExist(i)) loadInSlide(i);
          }
        } else {
          loadInSlide(activeIndex);
        }

        if (params.loadPrevNext) {
          if (slidesPerView > 1 || params.loadPrevNextAmount && params.loadPrevNextAmount > 1) {
            const amount = params.loadPrevNextAmount;
            const spv = Math.ceil(slidesPerView);
            const maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
            const minIndex = Math.max(activeIndex - Math.max(spv, amount), 0); // Next Slides

            for (let i = activeIndex + spv; i < maxIndex; i += 1) {
              if (slideExist(i)) loadInSlide(i);
            } // Prev Slides


            for (let i = minIndex; i < activeIndex; i += 1) {
              if (slideExist(i)) loadInSlide(i);
            }
          } else {
            const nextSlide = $wrapperEl.children(`.${swiperParams.slideNextClass}`);
            if (nextSlide.length > 0) loadInSlide(slideIndex(nextSlide));
            const prevSlide = $wrapperEl.children(`.${swiperParams.slidePrevClass}`);
            if (prevSlide.length > 0) loadInSlide(slideIndex(prevSlide));
          }
        }
      }

      function checkInViewOnLoad() {
        const window = getWindow();
        if (!swiper || swiper.destroyed) return;
        const $scrollElement = swiper.params.lazy.scrollingElement ? $(swiper.params.lazy.scrollingElement) : $(window);
        const isWindow = $scrollElement[0] === window;
        const scrollElementWidth = isWindow ? window.innerWidth : $scrollElement[0].offsetWidth;
        const scrollElementHeight = isWindow ? window.innerHeight : $scrollElement[0].offsetHeight;
        const swiperOffset = swiper.$el.offset();
        const {
          rtlTranslate: rtl
        } = swiper;
        let inView = false;
        if (rtl) swiperOffset.left -= swiper.$el[0].scrollLeft;
        const swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiper.width, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiper.height], [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height]];

        for (let i = 0; i < swiperCoord.length; i += 1) {
          const point = swiperCoord[i];

          if (point[0] >= 0 && point[0] <= scrollElementWidth && point[1] >= 0 && point[1] <= scrollElementHeight) {
            if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line

            inView = true;
          }
        }

        const passiveListener = swiper.touchEvents.start === 'touchstart' && swiper.support.passiveListener && swiper.params.passiveListeners ? {
          passive: true,
          capture: false
        } : false;

        if (inView) {
          load();
          $scrollElement.off('scroll', checkInViewOnLoad, passiveListener);
        } else if (!scrollHandlerAttached) {
          scrollHandlerAttached = true;
          $scrollElement.on('scroll', checkInViewOnLoad, passiveListener);
        }
      }

      on('beforeInit', () => {
        if (swiper.params.lazy.enabled && swiper.params.preloadImages) {
          swiper.params.preloadImages = false;
        }
      });
      on('init', () => {
        if (swiper.params.lazy.enabled) {
          if (swiper.params.lazy.checkInView) {
            checkInViewOnLoad();
          } else {
            load();
          }
        }
      });
      on('scroll', () => {
        if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.freeMode.sticky) {
          load();
        }
      });
      on('scrollbarDragMove resize _freeModeNoMomentumRelease', () => {
        if (swiper.params.lazy.enabled) {
          if (swiper.params.lazy.checkInView) {
            checkInViewOnLoad();
          } else {
            load();
          }
        }
      });
      on('transitionStart', () => {
        if (swiper.params.lazy.enabled) {
          if (swiper.params.lazy.loadOnTransitionStart || !swiper.params.lazy.loadOnTransitionStart && !initialImageLoaded) {
            if (swiper.params.lazy.checkInView) {
              checkInViewOnLoad();
            } else {
              load();
            }
          }
        }
      });
      on('transitionEnd', () => {
        if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {
          if (swiper.params.lazy.checkInView) {
            checkInViewOnLoad();
          } else {
            load();
          }
        }
      });
      on('slideChange', () => {
        const {
          lazy,
          cssMode,
          watchSlidesProgress,
          touchReleaseOnEdges,
          resistanceRatio
        } = swiper.params;

        if (lazy.enabled && (cssMode || watchSlidesProgress && (touchReleaseOnEdges || resistanceRatio === 0))) {
          load();
        }
      });
      on('destroy', () => {
        if (!swiper.$el) return;
        swiper.$el.find(`.${swiper.params.lazy.loadingClass}`).removeClass(swiper.params.lazy.loadingClass);
      });
      Object.assign(swiper.lazy, {
        load,
        loadInSlide
      });
    }

    /* eslint no-bitwise: ["error", { "allow": [">>"] }] */
    function Controller(_ref) {
      let {
        swiper,
        extendParams,
        on
      } = _ref;
      extendParams({
        controller: {
          control: undefined,
          inverse: false,
          by: 'slide' // or 'container'

        }
      });
      swiper.controller = {
        control: undefined
      };

      function LinearSpline(x, y) {
        const binarySearch = function search() {
          let maxIndex;
          let minIndex;
          let guess;
          return (array, val) => {
            minIndex = -1;
            maxIndex = array.length;

            while (maxIndex - minIndex > 1) {
              guess = maxIndex + minIndex >> 1;

              if (array[guess] <= val) {
                minIndex = guess;
              } else {
                maxIndex = guess;
              }
            }

            return maxIndex;
          };
        }();

        this.x = x;
        this.y = y;
        this.lastIndex = x.length - 1; // Given an x value (x2), return the expected y2 value:
        // (x1,y1) is the known point before given value,
        // (x3,y3) is the known point after given value.

        let i1;
        let i3;

        this.interpolate = function interpolate(x2) {
          if (!x2) return 0; // Get the indexes of x1 and x3 (the array indexes before and after given x2):

          i3 = binarySearch(this.x, x2);
          i1 = i3 - 1; // We have our indexes i1 & i3, so we can calculate already:
          // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1

          return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
        };

        return this;
      } // xxx: for now i will just save one spline function to to


      function getInterpolateFunction(c) {
        if (!swiper.controller.spline) {
          swiper.controller.spline = swiper.params.loop ? new LinearSpline(swiper.slidesGrid, c.slidesGrid) : new LinearSpline(swiper.snapGrid, c.snapGrid);
        }
      }

      function setTranslate(_t, byController) {
        const controlled = swiper.controller.control;
        let multiplier;
        let controlledTranslate;
        const Swiper = swiper.constructor;

        function setControlledTranslate(c) {
          // this will create an Interpolate function based on the snapGrids
          // x is the Grid of the scrolled scroller and y will be the controlled scroller
          // it makes sense to create this only once and recall it for the interpolation
          // the function does a lot of value caching for performance
          const translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;

          if (swiper.params.controller.by === 'slide') {
            getInterpolateFunction(c); // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
            // but it did not work out

            controlledTranslate = -swiper.controller.spline.interpolate(-translate);
          }

          if (!controlledTranslate || swiper.params.controller.by === 'container') {
            multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
            controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
          }

          if (swiper.params.controller.inverse) {
            controlledTranslate = c.maxTranslate() - controlledTranslate;
          }

          c.updateProgress(controlledTranslate);
          c.setTranslate(controlledTranslate, swiper);
          c.updateActiveIndex();
          c.updateSlidesClasses();
        }

        if (Array.isArray(controlled)) {
          for (let i = 0; i < controlled.length; i += 1) {
            if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
              setControlledTranslate(controlled[i]);
            }
          }
        } else if (controlled instanceof Swiper && byController !== controlled) {
          setControlledTranslate(controlled);
        }
      }

      function setTransition(duration, byController) {
        const Swiper = swiper.constructor;
        const controlled = swiper.controller.control;
        let i;

        function setControlledTransition(c) {
          c.setTransition(duration, swiper);

          if (duration !== 0) {
            c.transitionStart();

            if (c.params.autoHeight) {
              nextTick(() => {
                c.updateAutoHeight();
              });
            }

            c.$wrapperEl.transitionEnd(() => {
              if (!controlled) return;

              if (c.params.loop && swiper.params.controller.by === 'slide') {
                c.loopFix();
              }

              c.transitionEnd();
            });
          }
        }

        if (Array.isArray(controlled)) {
          for (i = 0; i < controlled.length; i += 1) {
            if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
              setControlledTransition(controlled[i]);
            }
          }
        } else if (controlled instanceof Swiper && byController !== controlled) {
          setControlledTransition(controlled);
        }
      }

      function removeSpline() {
        if (!swiper.controller.control) return;

        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      }

      on('beforeInit', () => {
        swiper.controller.control = swiper.params.controller.control;
      });
      on('update', () => {
        removeSpline();
      });
      on('resize', () => {
        removeSpline();
      });
      on('observerUpdate', () => {
        removeSpline();
      });
      on('setTranslate', (_s, translate, byController) => {
        if (!swiper.controller.control) return;
        swiper.controller.setTranslate(translate, byController);
      });
      on('setTransition', (_s, duration, byController) => {
        if (!swiper.controller.control) return;
        swiper.controller.setTransition(duration, byController);
      });
      Object.assign(swiper.controller, {
        setTranslate,
        setTransition
      });
    }

    function A11y(_ref) {
      let {
        swiper,
        extendParams,
        on
      } = _ref;
      extendParams({
        a11y: {
          enabled: true,
          notificationClass: 'swiper-notification',
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
          firstSlideMessage: 'This is the first slide',
          lastSlideMessage: 'This is the last slide',
          paginationBulletMessage: 'Go to slide {{index}}',
          slideLabelMessage: '{{index}} / {{slidesLength}}',
          containerMessage: null,
          containerRoleDescriptionMessage: null,
          itemRoleDescriptionMessage: null,
          slideRole: 'group',
          id: null
        }
      });
      let liveRegion = null;

      function notify(message) {
        const notification = liveRegion;
        if (notification.length === 0) return;
        notification.html('');
        notification.html(message);
      }

      function getRandomNumber(size) {
        if (size === void 0) {
          size = 16;
        }

        const randomChar = () => Math.round(16 * Math.random()).toString(16);

        return 'x'.repeat(size).replace(/x/g, randomChar);
      }

      function makeElFocusable($el) {
        $el.attr('tabIndex', '0');
      }

      function makeElNotFocusable($el) {
        $el.attr('tabIndex', '-1');
      }

      function addElRole($el, role) {
        $el.attr('role', role);
      }

      function addElRoleDescription($el, description) {
        $el.attr('aria-roledescription', description);
      }

      function addElControls($el, controls) {
        $el.attr('aria-controls', controls);
      }

      function addElLabel($el, label) {
        $el.attr('aria-label', label);
      }

      function addElId($el, id) {
        $el.attr('id', id);
      }

      function addElLive($el, live) {
        $el.attr('aria-live', live);
      }

      function disableEl($el) {
        $el.attr('aria-disabled', true);
      }

      function enableEl($el) {
        $el.attr('aria-disabled', false);
      }

      function onEnterOrSpaceKey(e) {
        if (e.keyCode !== 13 && e.keyCode !== 32) return;
        const params = swiper.params.a11y;
        const $targetEl = $(e.target);

        if (swiper.navigation && swiper.navigation.$nextEl && $targetEl.is(swiper.navigation.$nextEl)) {
          if (!(swiper.isEnd && !swiper.params.loop)) {
            swiper.slideNext();
          }

          if (swiper.isEnd) {
            notify(params.lastSlideMessage);
          } else {
            notify(params.nextSlideMessage);
          }
        }

        if (swiper.navigation && swiper.navigation.$prevEl && $targetEl.is(swiper.navigation.$prevEl)) {
          if (!(swiper.isBeginning && !swiper.params.loop)) {
            swiper.slidePrev();
          }

          if (swiper.isBeginning) {
            notify(params.firstSlideMessage);
          } else {
            notify(params.prevSlideMessage);
          }
        }

        if (swiper.pagination && $targetEl.is(classesToSelector(swiper.params.pagination.bulletClass))) {
          $targetEl[0].click();
        }
      }

      function updateNavigation() {
        if (swiper.params.loop || swiper.params.rewind || !swiper.navigation) return;
        const {
          $nextEl,
          $prevEl
        } = swiper.navigation;

        if ($prevEl && $prevEl.length > 0) {
          if (swiper.isBeginning) {
            disableEl($prevEl);
            makeElNotFocusable($prevEl);
          } else {
            enableEl($prevEl);
            makeElFocusable($prevEl);
          }
        }

        if ($nextEl && $nextEl.length > 0) {
          if (swiper.isEnd) {
            disableEl($nextEl);
            makeElNotFocusable($nextEl);
          } else {
            enableEl($nextEl);
            makeElFocusable($nextEl);
          }
        }
      }

      function hasPagination() {
        return swiper.pagination && swiper.pagination.bullets && swiper.pagination.bullets.length;
      }

      function hasClickablePagination() {
        return hasPagination() && swiper.params.pagination.clickable;
      }

      function updatePagination() {
        const params = swiper.params.a11y;
        if (!hasPagination()) return;
        swiper.pagination.bullets.each(bulletEl => {
          const $bulletEl = $(bulletEl);

          if (swiper.params.pagination.clickable) {
            makeElFocusable($bulletEl);

            if (!swiper.params.pagination.renderBullet) {
              addElRole($bulletEl, 'button');
              addElLabel($bulletEl, params.paginationBulletMessage.replace(/\{\{index\}\}/, $bulletEl.index() + 1));
            }
          }

          if ($bulletEl.is(`.${swiper.params.pagination.bulletActiveClass}`)) {
            $bulletEl.attr('aria-current', 'true');
          } else {
            $bulletEl.removeAttr('aria-current');
          }
        });
      }

      const initNavEl = ($el, wrapperId, message) => {
        makeElFocusable($el);

        if ($el[0].tagName !== 'BUTTON') {
          addElRole($el, 'button');
          $el.on('keydown', onEnterOrSpaceKey);
        }

        addElLabel($el, message);
        addElControls($el, wrapperId);
      };

      const handleFocus = e => {
        const slideEl = e.target.closest(`.${swiper.params.slideClass}`);
        if (!slideEl || !swiper.slides.includes(slideEl)) return;
        const isActive = swiper.slides.indexOf(slideEl) === swiper.activeIndex;
        const isVisible = swiper.params.watchSlidesProgress && swiper.visibleSlides && swiper.visibleSlides.includes(slideEl);
        if (isActive || isVisible) return;
        swiper.slideTo(swiper.slides.indexOf(slideEl), 0);
      };

      const initSlides = () => {
        const params = swiper.params.a11y;

        if (params.itemRoleDescriptionMessage) {
          addElRoleDescription($(swiper.slides), params.itemRoleDescriptionMessage);
        }

        addElRole($(swiper.slides), params.slideRole);
        const slidesLength = swiper.params.loop ? swiper.slides.filter(el => !el.classList.contains(swiper.params.slideDuplicateClass)).length : swiper.slides.length;

        if (params.slideLabelMessage) {
          swiper.slides.each((slideEl, index) => {
            const $slideEl = $(slideEl);
            const slideIndex = swiper.params.loop ? parseInt($slideEl.attr('data-swiper-slide-index'), 10) : index;
            const ariaLabelMessage = params.slideLabelMessage.replace(/\{\{index\}\}/, slideIndex + 1).replace(/\{\{slidesLength\}\}/, slidesLength);
            addElLabel($slideEl, ariaLabelMessage);
          });
        }
      };

      const init = () => {
        const params = swiper.params.a11y;
        swiper.$el.append(liveRegion); // Container

        const $containerEl = swiper.$el;

        if (params.containerRoleDescriptionMessage) {
          addElRoleDescription($containerEl, params.containerRoleDescriptionMessage);
        }

        if (params.containerMessage) {
          addElLabel($containerEl, params.containerMessage);
        } // Wrapper


        const $wrapperEl = swiper.$wrapperEl;
        const wrapperId = params.id || $wrapperEl.attr('id') || `swiper-wrapper-${getRandomNumber(16)}`;
        const live = swiper.params.autoplay && swiper.params.autoplay.enabled ? 'off' : 'polite';
        addElId($wrapperEl, wrapperId);
        addElLive($wrapperEl, live); // Slide

        initSlides(); // Navigation

        let $nextEl;
        let $prevEl;

        if (swiper.navigation && swiper.navigation.$nextEl) {
          $nextEl = swiper.navigation.$nextEl;
        }

        if (swiper.navigation && swiper.navigation.$prevEl) {
          $prevEl = swiper.navigation.$prevEl;
        }

        if ($nextEl && $nextEl.length) {
          initNavEl($nextEl, wrapperId, params.nextSlideMessage);
        }

        if ($prevEl && $prevEl.length) {
          initNavEl($prevEl, wrapperId, params.prevSlideMessage);
        } // Pagination


        if (hasClickablePagination()) {
          swiper.pagination.$el.on('keydown', classesToSelector(swiper.params.pagination.bulletClass), onEnterOrSpaceKey);
        } // Tab focus


        swiper.$el.on('focus', handleFocus, true);
      };

      function destroy() {
        if (liveRegion && liveRegion.length > 0) liveRegion.remove();
        let $nextEl;
        let $prevEl;

        if (swiper.navigation && swiper.navigation.$nextEl) {
          $nextEl = swiper.navigation.$nextEl;
        }

        if (swiper.navigation && swiper.navigation.$prevEl) {
          $prevEl = swiper.navigation.$prevEl;
        }

        if ($nextEl) {
          $nextEl.off('keydown', onEnterOrSpaceKey);
        }

        if ($prevEl) {
          $prevEl.off('keydown', onEnterOrSpaceKey);
        } // Pagination


        if (hasClickablePagination()) {
          swiper.pagination.$el.off('keydown', classesToSelector(swiper.params.pagination.bulletClass), onEnterOrSpaceKey);
        } // Tab focus


        swiper.$el.off('focus', handleFocus, true);
      }

      on('beforeInit', () => {
        liveRegion = $(`<span class="${swiper.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`);
      });
      on('afterInit', () => {
        if (!swiper.params.a11y.enabled) return;
        init();
      });
      on('slidesLengthChange snapGridLengthChange slidesGridLengthChange', () => {
        if (!swiper.params.a11y.enabled) return;
        initSlides();
      });
      on('fromEdge toEdge afterInit lock unlock', () => {
        if (!swiper.params.a11y.enabled) return;
        updateNavigation();
      });
      on('paginationUpdate', () => {
        if (!swiper.params.a11y.enabled) return;
        updatePagination();
      });
      on('destroy', () => {
        if (!swiper.params.a11y.enabled) return;
        destroy();
      });
    }

    function History(_ref) {
      let {
        swiper,
        extendParams,
        on
      } = _ref;
      extendParams({
        history: {
          enabled: false,
          root: '',
          replaceState: false,
          key: 'slides',
          keepQuery: false
        }
      });
      let initialized = false;
      let paths = {};

      const slugify = text => {
        return text.toString().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
      };

      const getPathValues = urlOverride => {
        const window = getWindow();
        let location;

        if (urlOverride) {
          location = new URL(urlOverride);
        } else {
          location = window.location;
        }

        const pathArray = location.pathname.slice(1).split('/').filter(part => part !== '');
        const total = pathArray.length;
        const key = pathArray[total - 2];
        const value = pathArray[total - 1];
        return {
          key,
          value
        };
      };

      const setHistory = (key, index) => {
        const window = getWindow();
        if (!initialized || !swiper.params.history.enabled) return;
        let location;

        if (swiper.params.url) {
          location = new URL(swiper.params.url);
        } else {
          location = window.location;
        }

        const slide = swiper.slides.eq(index);
        let value = slugify(slide.attr('data-history'));

        if (swiper.params.history.root.length > 0) {
          let root = swiper.params.history.root;
          if (root[root.length - 1] === '/') root = root.slice(0, root.length - 1);
          value = `${root}/${key}/${value}`;
        } else if (!location.pathname.includes(key)) {
          value = `${key}/${value}`;
        }

        if (swiper.params.history.keepQuery) {
          value += location.search;
        }

        const currentState = window.history.state;

        if (currentState && currentState.value === value) {
          return;
        }

        if (swiper.params.history.replaceState) {
          window.history.replaceState({
            value
          }, null, value);
        } else {
          window.history.pushState({
            value
          }, null, value);
        }
      };

      const scrollToSlide = (speed, value, runCallbacks) => {
        if (value) {
          for (let i = 0, length = swiper.slides.length; i < length; i += 1) {
            const slide = swiper.slides.eq(i);
            const slideHistory = slugify(slide.attr('data-history'));

            if (slideHistory === value && !slide.hasClass(swiper.params.slideDuplicateClass)) {
              const index = slide.index();
              swiper.slideTo(index, speed, runCallbacks);
            }
          }
        } else {
          swiper.slideTo(0, speed, runCallbacks);
        }
      };

      const setHistoryPopState = () => {
        paths = getPathValues(swiper.params.url);
        scrollToSlide(swiper.params.speed, paths.value, false);
      };

      const init = () => {
        const window = getWindow();
        if (!swiper.params.history) return;

        if (!window.history || !window.history.pushState) {
          swiper.params.history.enabled = false;
          swiper.params.hashNavigation.enabled = true;
          return;
        }

        initialized = true;
        paths = getPathValues(swiper.params.url);
        if (!paths.key && !paths.value) return;
        scrollToSlide(0, paths.value, swiper.params.runCallbacksOnInit);

        if (!swiper.params.history.replaceState) {
          window.addEventListener('popstate', setHistoryPopState);
        }
      };

      const destroy = () => {
        const window = getWindow();

        if (!swiper.params.history.replaceState) {
          window.removeEventListener('popstate', setHistoryPopState);
        }
      };

      on('init', () => {
        if (swiper.params.history.enabled) {
          init();
        }
      });
      on('destroy', () => {
        if (swiper.params.history.enabled) {
          destroy();
        }
      });
      on('transitionEnd _freeModeNoMomentumRelease', () => {
        if (initialized) {
          setHistory(swiper.params.history.key, swiper.activeIndex);
        }
      });
      on('slideChange', () => {
        if (initialized && swiper.params.cssMode) {
          setHistory(swiper.params.history.key, swiper.activeIndex);
        }
      });
    }

    function HashNavigation(_ref) {
      let {
        swiper,
        extendParams,
        emit,
        on
      } = _ref;
      let initialized = false;
      const document = getDocument();
      const window = getWindow();
      extendParams({
        hashNavigation: {
          enabled: false,
          replaceState: false,
          watchState: false
        }
      });

      const onHashChange = () => {
        emit('hashChange');
        const newHash = document.location.hash.replace('#', '');
        const activeSlideHash = swiper.slides.eq(swiper.activeIndex).attr('data-hash');

        if (newHash !== activeSlideHash) {
          const newIndex = swiper.$wrapperEl.children(`.${swiper.params.slideClass}[data-hash="${newHash}"]`).index();
          if (typeof newIndex === 'undefined') return;
          swiper.slideTo(newIndex);
        }
      };

      const setHash = () => {
        if (!initialized || !swiper.params.hashNavigation.enabled) return;

        if (swiper.params.hashNavigation.replaceState && window.history && window.history.replaceState) {
          window.history.replaceState(null, null, `#${swiper.slides.eq(swiper.activeIndex).attr('data-hash')}` || '');
          emit('hashSet');
        } else {
          const slide = swiper.slides.eq(swiper.activeIndex);
          const hash = slide.attr('data-hash') || slide.attr('data-history');
          document.location.hash = hash || '';
          emit('hashSet');
        }
      };

      const init = () => {
        if (!swiper.params.hashNavigation.enabled || swiper.params.history && swiper.params.history.enabled) return;
        initialized = true;
        const hash = document.location.hash.replace('#', '');

        if (hash) {
          const speed = 0;

          for (let i = 0, length = swiper.slides.length; i < length; i += 1) {
            const slide = swiper.slides.eq(i);
            const slideHash = slide.attr('data-hash') || slide.attr('data-history');

            if (slideHash === hash && !slide.hasClass(swiper.params.slideDuplicateClass)) {
              const index = slide.index();
              swiper.slideTo(index, speed, swiper.params.runCallbacksOnInit, true);
            }
          }
        }

        if (swiper.params.hashNavigation.watchState) {
          $(window).on('hashchange', onHashChange);
        }
      };

      const destroy = () => {
        if (swiper.params.hashNavigation.watchState) {
          $(window).off('hashchange', onHashChange);
        }
      };

      on('init', () => {
        if (swiper.params.hashNavigation.enabled) {
          init();
        }
      });
      on('destroy', () => {
        if (swiper.params.hashNavigation.enabled) {
          destroy();
        }
      });
      on('transitionEnd _freeModeNoMomentumRelease', () => {
        if (initialized) {
          setHash();
        }
      });
      on('slideChange', () => {
        if (initialized && swiper.params.cssMode) {
          setHash();
        }
      });
    }

    /* eslint no-underscore-dangle: "off" */
    function Autoplay(_ref) {
      let {
        swiper,
        extendParams,
        on,
        emit
      } = _ref;
      let timeout;
      swiper.autoplay = {
        running: false,
        paused: false
      };
      extendParams({
        autoplay: {
          enabled: false,
          delay: 3000,
          waitForTransition: true,
          disableOnInteraction: true,
          stopOnLastSlide: false,
          reverseDirection: false,
          pauseOnMouseEnter: false
        }
      });

      function run() {
        const $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
        let delay = swiper.params.autoplay.delay;

        if ($activeSlideEl.attr('data-swiper-autoplay')) {
          delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
        }

        clearTimeout(timeout);
        timeout = nextTick(() => {
          let autoplayResult;

          if (swiper.params.autoplay.reverseDirection) {
            if (swiper.params.loop) {
              swiper.loopFix();
              autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
              emit('autoplay');
            } else if (!swiper.isBeginning) {
              autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
              emit('autoplay');
            } else if (!swiper.params.autoplay.stopOnLastSlide) {
              autoplayResult = swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
              emit('autoplay');
            } else {
              stop();
            }
          } else if (swiper.params.loop) {
            swiper.loopFix();
            autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
            emit('autoplay');
          } else if (!swiper.isEnd) {
            autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
            emit('autoplay');
          } else if (!swiper.params.autoplay.stopOnLastSlide) {
            autoplayResult = swiper.slideTo(0, swiper.params.speed, true, true);
            emit('autoplay');
          } else {
            stop();
          }

          if (swiper.params.cssMode && swiper.autoplay.running) run();else if (autoplayResult === false) {
            run();
          }
        }, delay);
      }

      function start() {
        if (typeof timeout !== 'undefined') return false;
        if (swiper.autoplay.running) return false;
        swiper.autoplay.running = true;
        emit('autoplayStart');
        run();
        return true;
      }

      function stop() {
        if (!swiper.autoplay.running) return false;
        if (typeof timeout === 'undefined') return false;

        if (timeout) {
          clearTimeout(timeout);
          timeout = undefined;
        }

        swiper.autoplay.running = false;
        emit('autoplayStop');
        return true;
      }

      function pause(speed) {
        if (!swiper.autoplay.running) return;
        if (swiper.autoplay.paused) return;
        if (timeout) clearTimeout(timeout);
        swiper.autoplay.paused = true;

        if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
          swiper.autoplay.paused = false;
          run();
        } else {
          ['transitionend', 'webkitTransitionEnd'].forEach(event => {
            swiper.$wrapperEl[0].addEventListener(event, onTransitionEnd);
          });
        }
      }

      function onVisibilityChange() {
        const document = getDocument();

        if (document.visibilityState === 'hidden' && swiper.autoplay.running) {
          pause();
        }

        if (document.visibilityState === 'visible' && swiper.autoplay.paused) {
          run();
          swiper.autoplay.paused = false;
        }
      }

      function onTransitionEnd(e) {
        if (!swiper || swiper.destroyed || !swiper.$wrapperEl) return;
        if (e.target !== swiper.$wrapperEl[0]) return;
        ['transitionend', 'webkitTransitionEnd'].forEach(event => {
          swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
        });
        swiper.autoplay.paused = false;

        if (!swiper.autoplay.running) {
          stop();
        } else {
          run();
        }
      }

      function onMouseEnter() {
        if (swiper.params.autoplay.disableOnInteraction) {
          stop();
        } else {
          emit('autoplayPause');
          pause();
        }

        ['transitionend', 'webkitTransitionEnd'].forEach(event => {
          swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
        });
      }

      function onMouseLeave() {
        if (swiper.params.autoplay.disableOnInteraction) {
          return;
        }

        swiper.autoplay.paused = false;
        emit('autoplayResume');
        run();
      }

      function attachMouseEvents() {
        if (swiper.params.autoplay.pauseOnMouseEnter) {
          swiper.$el.on('mouseenter', onMouseEnter);
          swiper.$el.on('mouseleave', onMouseLeave);
        }
      }

      function detachMouseEvents() {
        swiper.$el.off('mouseenter', onMouseEnter);
        swiper.$el.off('mouseleave', onMouseLeave);
      }

      on('init', () => {
        if (swiper.params.autoplay.enabled) {
          start();
          const document = getDocument();
          document.addEventListener('visibilitychange', onVisibilityChange);
          attachMouseEvents();
        }
      });
      on('beforeTransitionStart', (_s, speed, internal) => {
        if (swiper.autoplay.running) {
          if (internal || !swiper.params.autoplay.disableOnInteraction) {
            swiper.autoplay.pause(speed);
          } else {
            stop();
          }
        }
      });
      on('sliderFirstMove', () => {
        if (swiper.autoplay.running) {
          if (swiper.params.autoplay.disableOnInteraction) {
            stop();
          } else {
            pause();
          }
        }
      });
      on('touchEnd', () => {
        if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) {
          run();
        }
      });
      on('destroy', () => {
        detachMouseEvents();

        if (swiper.autoplay.running) {
          stop();
        }

        const document = getDocument();
        document.removeEventListener('visibilitychange', onVisibilityChange);
      });
      Object.assign(swiper.autoplay, {
        pause,
        run,
        start,
        stop
      });
    }

    function Thumb(_ref) {
      let {
        swiper,
        extendParams,
        on
      } = _ref;
      extendParams({
        thumbs: {
          swiper: null,
          multipleActiveThumbs: true,
          autoScrollOffset: 0,
          slideThumbActiveClass: 'swiper-slide-thumb-active',
          thumbsContainerClass: 'swiper-thumbs'
        }
      });
      let initialized = false;
      let swiperCreated = false;
      swiper.thumbs = {
        swiper: null
      };

      function onThumbClick() {
        const thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper || thumbsSwiper.destroyed) return;
        const clickedIndex = thumbsSwiper.clickedIndex;
        const clickedSlide = thumbsSwiper.clickedSlide;
        if (clickedSlide && $(clickedSlide).hasClass(swiper.params.thumbs.slideThumbActiveClass)) return;
        if (typeof clickedIndex === 'undefined' || clickedIndex === null) return;
        let slideToIndex;

        if (thumbsSwiper.params.loop) {
          slideToIndex = parseInt($(thumbsSwiper.clickedSlide).attr('data-swiper-slide-index'), 10);
        } else {
          slideToIndex = clickedIndex;
        }

        if (swiper.params.loop) {
          let currentIndex = swiper.activeIndex;

          if (swiper.slides.eq(currentIndex).hasClass(swiper.params.slideDuplicateClass)) {
            swiper.loopFix(); // eslint-disable-next-line

            swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
            currentIndex = swiper.activeIndex;
          }

          const prevIndex = swiper.slides.eq(currentIndex).prevAll(`[data-swiper-slide-index="${slideToIndex}"]`).eq(0).index();
          const nextIndex = swiper.slides.eq(currentIndex).nextAll(`[data-swiper-slide-index="${slideToIndex}"]`).eq(0).index();
          if (typeof prevIndex === 'undefined') slideToIndex = nextIndex;else if (typeof nextIndex === 'undefined') slideToIndex = prevIndex;else if (nextIndex - currentIndex < currentIndex - prevIndex) slideToIndex = nextIndex;else slideToIndex = prevIndex;
        }

        swiper.slideTo(slideToIndex);
      }

      function init() {
        const {
          thumbs: thumbsParams
        } = swiper.params;
        if (initialized) return false;
        initialized = true;
        const SwiperClass = swiper.constructor;

        if (thumbsParams.swiper instanceof SwiperClass) {
          swiper.thumbs.swiper = thumbsParams.swiper;
          Object.assign(swiper.thumbs.swiper.originalParams, {
            watchSlidesProgress: true,
            slideToClickedSlide: false
          });
          Object.assign(swiper.thumbs.swiper.params, {
            watchSlidesProgress: true,
            slideToClickedSlide: false
          });
        } else if (isObject(thumbsParams.swiper)) {
          const thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
          Object.assign(thumbsSwiperParams, {
            watchSlidesProgress: true,
            slideToClickedSlide: false
          });
          swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
          swiperCreated = true;
        }

        swiper.thumbs.swiper.$el.addClass(swiper.params.thumbs.thumbsContainerClass);
        swiper.thumbs.swiper.on('tap', onThumbClick);
        return true;
      }

      function update(initial) {
        const thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper || thumbsSwiper.destroyed) return;
        const slidesPerView = thumbsSwiper.params.slidesPerView === 'auto' ? thumbsSwiper.slidesPerViewDynamic() : thumbsSwiper.params.slidesPerView;
        const autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
        const useOffset = autoScrollOffset && !thumbsSwiper.params.loop;

        if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
          let currentThumbsIndex = thumbsSwiper.activeIndex;
          let newThumbsIndex;
          let direction;

          if (thumbsSwiper.params.loop) {
            if (thumbsSwiper.slides.eq(currentThumbsIndex).hasClass(thumbsSwiper.params.slideDuplicateClass)) {
              thumbsSwiper.loopFix(); // eslint-disable-next-line

              thumbsSwiper._clientLeft = thumbsSwiper.$wrapperEl[0].clientLeft;
              currentThumbsIndex = thumbsSwiper.activeIndex;
            } // Find actual thumbs index to slide to


            const prevThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).prevAll(`[data-swiper-slide-index="${swiper.realIndex}"]`).eq(0).index();
            const nextThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).nextAll(`[data-swiper-slide-index="${swiper.realIndex}"]`).eq(0).index();

            if (typeof prevThumbsIndex === 'undefined') {
              newThumbsIndex = nextThumbsIndex;
            } else if (typeof nextThumbsIndex === 'undefined') {
              newThumbsIndex = prevThumbsIndex;
            } else if (nextThumbsIndex - currentThumbsIndex === currentThumbsIndex - prevThumbsIndex) {
              newThumbsIndex = thumbsSwiper.params.slidesPerGroup > 1 ? nextThumbsIndex : currentThumbsIndex;
            } else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) {
              newThumbsIndex = nextThumbsIndex;
            } else {
              newThumbsIndex = prevThumbsIndex;
            }

            direction = swiper.activeIndex > swiper.previousIndex ? 'next' : 'prev';
          } else {
            newThumbsIndex = swiper.realIndex;
            direction = newThumbsIndex > swiper.previousIndex ? 'next' : 'prev';
          }

          if (useOffset) {
            newThumbsIndex += direction === 'next' ? autoScrollOffset : -1 * autoScrollOffset;
          }

          if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
            if (thumbsSwiper.params.centeredSlides) {
              if (newThumbsIndex > currentThumbsIndex) {
                newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
              } else {
                newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
              }
            } else if (newThumbsIndex > currentThumbsIndex && thumbsSwiper.params.slidesPerGroup === 1) ;

            thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : undefined);
          }
        } // Activate thumbs


        let thumbsToActivate = 1;
        const thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;

        if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
          thumbsToActivate = swiper.params.slidesPerView;
        }

        if (!swiper.params.thumbs.multipleActiveThumbs) {
          thumbsToActivate = 1;
        }

        thumbsToActivate = Math.floor(thumbsToActivate);
        thumbsSwiper.slides.removeClass(thumbActiveClass);

        if (thumbsSwiper.params.loop || thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled) {
          for (let i = 0; i < thumbsToActivate; i += 1) {
            thumbsSwiper.$wrapperEl.children(`[data-swiper-slide-index="${swiper.realIndex + i}"]`).addClass(thumbActiveClass);
          }
        } else {
          for (let i = 0; i < thumbsToActivate; i += 1) {
            thumbsSwiper.slides.eq(swiper.realIndex + i).addClass(thumbActiveClass);
          }
        }
      }

      on('beforeInit', () => {
        const {
          thumbs
        } = swiper.params;
        if (!thumbs || !thumbs.swiper) return;
        init();
        update(true);
      });
      on('slideChange update resize observerUpdate', () => {
        update();
      });
      on('setTransition', (_s, duration) => {
        const thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper || thumbsSwiper.destroyed) return;
        thumbsSwiper.setTransition(duration);
      });
      on('beforeDestroy', () => {
        const thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper || thumbsSwiper.destroyed) return;

        if (swiperCreated) {
          thumbsSwiper.destroy();
        }
      });
      Object.assign(swiper.thumbs, {
        init,
        update
      });
    }

    function freeMode(_ref) {
      let {
        swiper,
        extendParams,
        emit,
        once
      } = _ref;
      extendParams({
        freeMode: {
          enabled: false,
          momentum: true,
          momentumRatio: 1,
          momentumBounce: true,
          momentumBounceRatio: 1,
          momentumVelocityRatio: 1,
          sticky: false,
          minimumVelocity: 0.02
        }
      });

      function onTouchStart() {
        const translate = swiper.getTranslate();
        swiper.setTranslate(translate);
        swiper.setTransition(0);
        swiper.touchEventsData.velocities.length = 0;
        swiper.freeMode.onTouchEnd({
          currentPos: swiper.rtl ? swiper.translate : -swiper.translate
        });
      }

      function onTouchMove() {
        const {
          touchEventsData: data,
          touches
        } = swiper; // Velocity

        if (data.velocities.length === 0) {
          data.velocities.push({
            position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
            time: data.touchStartTime
          });
        }

        data.velocities.push({
          position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
          time: now()
        });
      }

      function onTouchEnd(_ref2) {
        let {
          currentPos
        } = _ref2;
        const {
          params,
          $wrapperEl,
          rtlTranslate: rtl,
          snapGrid,
          touchEventsData: data
        } = swiper; // Time diff

        const touchEndTime = now();
        const timeDiff = touchEndTime - data.touchStartTime;

        if (currentPos < -swiper.minTranslate()) {
          swiper.slideTo(swiper.activeIndex);
          return;
        }

        if (currentPos > -swiper.maxTranslate()) {
          if (swiper.slides.length < snapGrid.length) {
            swiper.slideTo(snapGrid.length - 1);
          } else {
            swiper.slideTo(swiper.slides.length - 1);
          }

          return;
        }

        if (params.freeMode.momentum) {
          if (data.velocities.length > 1) {
            const lastMoveEvent = data.velocities.pop();
            const velocityEvent = data.velocities.pop();
            const distance = lastMoveEvent.position - velocityEvent.position;
            const time = lastMoveEvent.time - velocityEvent.time;
            swiper.velocity = distance / time;
            swiper.velocity /= 2;

            if (Math.abs(swiper.velocity) < params.freeMode.minimumVelocity) {
              swiper.velocity = 0;
            } // this implies that the user stopped moving a finger then released.
            // There would be no events with distance zero, so the last event is stale.


            if (time > 150 || now() - lastMoveEvent.time > 300) {
              swiper.velocity = 0;
            }
          } else {
            swiper.velocity = 0;
          }

          swiper.velocity *= params.freeMode.momentumVelocityRatio;
          data.velocities.length = 0;
          let momentumDuration = 1000 * params.freeMode.momentumRatio;
          const momentumDistance = swiper.velocity * momentumDuration;
          let newPosition = swiper.translate + momentumDistance;
          if (rtl) newPosition = -newPosition;
          let doBounce = false;
          let afterBouncePosition;
          const bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeMode.momentumBounceRatio;
          let needsLoopFix;

          if (newPosition < swiper.maxTranslate()) {
            if (params.freeMode.momentumBounce) {
              if (newPosition + swiper.maxTranslate() < -bounceAmount) {
                newPosition = swiper.maxTranslate() - bounceAmount;
              }

              afterBouncePosition = swiper.maxTranslate();
              doBounce = true;
              data.allowMomentumBounce = true;
            } else {
              newPosition = swiper.maxTranslate();
            }

            if (params.loop && params.centeredSlides) needsLoopFix = true;
          } else if (newPosition > swiper.minTranslate()) {
            if (params.freeMode.momentumBounce) {
              if (newPosition - swiper.minTranslate() > bounceAmount) {
                newPosition = swiper.minTranslate() + bounceAmount;
              }

              afterBouncePosition = swiper.minTranslate();
              doBounce = true;
              data.allowMomentumBounce = true;
            } else {
              newPosition = swiper.minTranslate();
            }

            if (params.loop && params.centeredSlides) needsLoopFix = true;
          } else if (params.freeMode.sticky) {
            let nextSlide;

            for (let j = 0; j < snapGrid.length; j += 1) {
              if (snapGrid[j] > -newPosition) {
                nextSlide = j;
                break;
              }
            }

            if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
              newPosition = snapGrid[nextSlide];
            } else {
              newPosition = snapGrid[nextSlide - 1];
            }

            newPosition = -newPosition;
          }

          if (needsLoopFix) {
            once('transitionEnd', () => {
              swiper.loopFix();
            });
          } // Fix duration


          if (swiper.velocity !== 0) {
            if (rtl) {
              momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
            } else {
              momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
            }

            if (params.freeMode.sticky) {
              // If freeMode.sticky is active and the user ends a swipe with a slow-velocity
              // event, then durations can be 20+ seconds to slide one (or zero!) slides.
              // It's easy to see this when simulating touch with mouse events. To fix this,
              // limit single-slide swipes to the default slide duration. This also has the
              // nice side effect of matching slide speed if the user stopped moving before
              // lifting finger or mouse vs. moving slowly before lifting the finger/mouse.
              // For faster swipes, also apply limits (albeit higher ones).
              const moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);
              const currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];

              if (moveDistance < currentSlideSize) {
                momentumDuration = params.speed;
              } else if (moveDistance < 2 * currentSlideSize) {
                momentumDuration = params.speed * 1.5;
              } else {
                momentumDuration = params.speed * 2.5;
              }
            }
          } else if (params.freeMode.sticky) {
            swiper.slideToClosest();
            return;
          }

          if (params.freeMode.momentumBounce && doBounce) {
            swiper.updateProgress(afterBouncePosition);
            swiper.setTransition(momentumDuration);
            swiper.setTranslate(newPosition);
            swiper.transitionStart(true, swiper.swipeDirection);
            swiper.animating = true;
            $wrapperEl.transitionEnd(() => {
              if (!swiper || swiper.destroyed || !data.allowMomentumBounce) return;
              emit('momentumBounce');
              swiper.setTransition(params.speed);
              setTimeout(() => {
                swiper.setTranslate(afterBouncePosition);
                $wrapperEl.transitionEnd(() => {
                  if (!swiper || swiper.destroyed) return;
                  swiper.transitionEnd();
                });
              }, 0);
            });
          } else if (swiper.velocity) {
            emit('_freeModeNoMomentumRelease');
            swiper.updateProgress(newPosition);
            swiper.setTransition(momentumDuration);
            swiper.setTranslate(newPosition);
            swiper.transitionStart(true, swiper.swipeDirection);

            if (!swiper.animating) {
              swiper.animating = true;
              $wrapperEl.transitionEnd(() => {
                if (!swiper || swiper.destroyed) return;
                swiper.transitionEnd();
              });
            }
          } else {
            swiper.updateProgress(newPosition);
          }

          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();
        } else if (params.freeMode.sticky) {
          swiper.slideToClosest();
          return;
        } else if (params.freeMode) {
          emit('_freeModeNoMomentumRelease');
        }

        if (!params.freeMode.momentum || timeDiff >= params.longSwipesMs) {
          swiper.updateProgress();
          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();
        }
      }

      Object.assign(swiper, {
        freeMode: {
          onTouchStart,
          onTouchMove,
          onTouchEnd
        }
      });
    }

    function Grid(_ref) {
      let {
        swiper,
        extendParams
      } = _ref;
      extendParams({
        grid: {
          rows: 1,
          fill: 'column'
        }
      });
      let slidesNumberEvenToRows;
      let slidesPerRow;
      let numFullColumns;

      const initSlides = slidesLength => {
        const {
          slidesPerView
        } = swiper.params;
        const {
          rows,
          fill
        } = swiper.params.grid;
        slidesPerRow = slidesNumberEvenToRows / rows;
        numFullColumns = Math.floor(slidesLength / rows);

        if (Math.floor(slidesLength / rows) === slidesLength / rows) {
          slidesNumberEvenToRows = slidesLength;
        } else {
          slidesNumberEvenToRows = Math.ceil(slidesLength / rows) * rows;
        }

        if (slidesPerView !== 'auto' && fill === 'row') {
          slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, slidesPerView * rows);
        }
      };

      const updateSlide = (i, slide, slidesLength, getDirectionLabel) => {
        const {
          slidesPerGroup,
          spaceBetween
        } = swiper.params;
        const {
          rows,
          fill
        } = swiper.params.grid; // Set slides order

        let newSlideOrderIndex;
        let column;
        let row;

        if (fill === 'row' && slidesPerGroup > 1) {
          const groupIndex = Math.floor(i / (slidesPerGroup * rows));
          const slideIndexInGroup = i - rows * slidesPerGroup * groupIndex;
          const columnsInGroup = groupIndex === 0 ? slidesPerGroup : Math.min(Math.ceil((slidesLength - groupIndex * rows * slidesPerGroup) / rows), slidesPerGroup);
          row = Math.floor(slideIndexInGroup / columnsInGroup);
          column = slideIndexInGroup - row * columnsInGroup + groupIndex * slidesPerGroup;
          newSlideOrderIndex = column + row * slidesNumberEvenToRows / rows;
          slide.css({
            '-webkit-order': newSlideOrderIndex,
            order: newSlideOrderIndex
          });
        } else if (fill === 'column') {
          column = Math.floor(i / rows);
          row = i - column * rows;

          if (column > numFullColumns || column === numFullColumns && row === rows - 1) {
            row += 1;

            if (row >= rows) {
              row = 0;
              column += 1;
            }
          }
        } else {
          row = Math.floor(i / slidesPerRow);
          column = i - row * slidesPerRow;
        }

        slide.css(getDirectionLabel('margin-top'), row !== 0 ? spaceBetween && `${spaceBetween}px` : '');
      };

      const updateWrapperSize = (slideSize, snapGrid, getDirectionLabel) => {
        const {
          spaceBetween,
          centeredSlides,
          roundLengths
        } = swiper.params;
        const {
          rows
        } = swiper.params.grid;
        swiper.virtualSize = (slideSize + spaceBetween) * slidesNumberEvenToRows;
        swiper.virtualSize = Math.ceil(swiper.virtualSize / rows) - spaceBetween;
        swiper.$wrapperEl.css({
          [getDirectionLabel('width')]: `${swiper.virtualSize + spaceBetween}px`
        });

        if (centeredSlides) {
          snapGrid.splice(0, snapGrid.length);
          const newSlidesGrid = [];

          for (let i = 0; i < snapGrid.length; i += 1) {
            let slidesGridItem = snapGrid[i];
            if (roundLengths) slidesGridItem = Math.floor(slidesGridItem);
            if (snapGrid[i] < swiper.virtualSize + snapGrid[0]) newSlidesGrid.push(slidesGridItem);
          }

          snapGrid.push(...newSlidesGrid);
        }
      };

      swiper.grid = {
        initSlides,
        updateSlide,
        updateWrapperSize
      };
    }

    function appendSlide(slides) {
      const swiper = this;
      const {
        $wrapperEl,
        params
      } = swiper;

      if (params.loop) {
        swiper.loopDestroy();
      }

      if (typeof slides === 'object' && 'length' in slides) {
        for (let i = 0; i < slides.length; i += 1) {
          if (slides[i]) $wrapperEl.append(slides[i]);
        }
      } else {
        $wrapperEl.append(slides);
      }

      if (params.loop) {
        swiper.loopCreate();
      }

      if (!params.observer) {
        swiper.update();
      }
    }

    function prependSlide(slides) {
      const swiper = this;
      const {
        params,
        $wrapperEl,
        activeIndex
      } = swiper;

      if (params.loop) {
        swiper.loopDestroy();
      }

      let newActiveIndex = activeIndex + 1;

      if (typeof slides === 'object' && 'length' in slides) {
        for (let i = 0; i < slides.length; i += 1) {
          if (slides[i]) $wrapperEl.prepend(slides[i]);
        }

        newActiveIndex = activeIndex + slides.length;
      } else {
        $wrapperEl.prepend(slides);
      }

      if (params.loop) {
        swiper.loopCreate();
      }

      if (!params.observer) {
        swiper.update();
      }

      swiper.slideTo(newActiveIndex, 0, false);
    }

    function addSlide(index, slides) {
      const swiper = this;
      const {
        $wrapperEl,
        params,
        activeIndex
      } = swiper;
      let activeIndexBuffer = activeIndex;

      if (params.loop) {
        activeIndexBuffer -= swiper.loopedSlides;
        swiper.loopDestroy();
        swiper.slides = $wrapperEl.children(`.${params.slideClass}`);
      }

      const baseLength = swiper.slides.length;

      if (index <= 0) {
        swiper.prependSlide(slides);
        return;
      }

      if (index >= baseLength) {
        swiper.appendSlide(slides);
        return;
      }

      let newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;
      const slidesBuffer = [];

      for (let i = baseLength - 1; i >= index; i -= 1) {
        const currentSlide = swiper.slides.eq(i);
        currentSlide.remove();
        slidesBuffer.unshift(currentSlide);
      }

      if (typeof slides === 'object' && 'length' in slides) {
        for (let i = 0; i < slides.length; i += 1) {
          if (slides[i]) $wrapperEl.append(slides[i]);
        }

        newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
      } else {
        $wrapperEl.append(slides);
      }

      for (let i = 0; i < slidesBuffer.length; i += 1) {
        $wrapperEl.append(slidesBuffer[i]);
      }

      if (params.loop) {
        swiper.loopCreate();
      }

      if (!params.observer) {
        swiper.update();
      }

      if (params.loop) {
        swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
      } else {
        swiper.slideTo(newActiveIndex, 0, false);
      }
    }

    function removeSlide(slidesIndexes) {
      const swiper = this;
      const {
        params,
        $wrapperEl,
        activeIndex
      } = swiper;
      let activeIndexBuffer = activeIndex;

      if (params.loop) {
        activeIndexBuffer -= swiper.loopedSlides;
        swiper.loopDestroy();
        swiper.slides = $wrapperEl.children(`.${params.slideClass}`);
      }

      let newActiveIndex = activeIndexBuffer;
      let indexToRemove;

      if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {
        for (let i = 0; i < slidesIndexes.length; i += 1) {
          indexToRemove = slidesIndexes[i];
          if (swiper.slides[indexToRemove]) swiper.slides.eq(indexToRemove).remove();
          if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
        }

        newActiveIndex = Math.max(newActiveIndex, 0);
      } else {
        indexToRemove = slidesIndexes;
        if (swiper.slides[indexToRemove]) swiper.slides.eq(indexToRemove).remove();
        if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
        newActiveIndex = Math.max(newActiveIndex, 0);
      }

      if (params.loop) {
        swiper.loopCreate();
      }

      if (!params.observer) {
        swiper.update();
      }

      if (params.loop) {
        swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
      } else {
        swiper.slideTo(newActiveIndex, 0, false);
      }
    }

    function removeAllSlides() {
      const swiper = this;
      const slidesIndexes = [];

      for (let i = 0; i < swiper.slides.length; i += 1) {
        slidesIndexes.push(i);
      }

      swiper.removeSlide(slidesIndexes);
    }

    function Manipulation(_ref) {
      let {
        swiper
      } = _ref;
      Object.assign(swiper, {
        appendSlide: appendSlide.bind(swiper),
        prependSlide: prependSlide.bind(swiper),
        addSlide: addSlide.bind(swiper),
        removeSlide: removeSlide.bind(swiper),
        removeAllSlides: removeAllSlides.bind(swiper)
      });
    }

    function effectInit(params) {
      const {
        effect,
        swiper,
        on,
        setTranslate,
        setTransition,
        overwriteParams,
        perspective,
        recreateShadows,
        getEffectParams
      } = params;
      on('beforeInit', () => {
        if (swiper.params.effect !== effect) return;
        swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);

        if (perspective && perspective()) {
          swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
        }

        const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
        Object.assign(swiper.params, overwriteParamsResult);
        Object.assign(swiper.originalParams, overwriteParamsResult);
      });
      on('setTranslate', () => {
        if (swiper.params.effect !== effect) return;
        setTranslate();
      });
      on('setTransition', (_s, duration) => {
        if (swiper.params.effect !== effect) return;
        setTransition(duration);
      });
      on('transitionEnd', () => {
        if (swiper.params.effect !== effect) return;

        if (recreateShadows) {
          if (!getEffectParams || !getEffectParams().slideShadows) return; // remove shadows

          swiper.slides.each(slideEl => {
            const $slideEl = swiper.$(slideEl);
            $slideEl.find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').remove();
          }); // create new one

          recreateShadows();
        }
      });
      let requireUpdateOnVirtual;
      on('virtualUpdate', () => {
        if (swiper.params.effect !== effect) return;

        if (!swiper.slides.length) {
          requireUpdateOnVirtual = true;
        }

        requestAnimationFrame(() => {
          if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
            setTranslate();
            requireUpdateOnVirtual = false;
          }
        });
      });
    }

    function effectTarget(effectParams, $slideEl) {
      if (effectParams.transformEl) {
        return $slideEl.find(effectParams.transformEl).css({
          'backface-visibility': 'hidden',
          '-webkit-backface-visibility': 'hidden'
        });
      }

      return $slideEl;
    }

    function effectVirtualTransitionEnd(_ref) {
      let {
        swiper,
        duration,
        transformEl,
        allSlides
      } = _ref;
      const {
        slides,
        activeIndex,
        $wrapperEl
      } = swiper;

      if (swiper.params.virtualTranslate && duration !== 0) {
        let eventTriggered = false;
        let $transitionEndTarget;

        if (allSlides) {
          $transitionEndTarget = transformEl ? slides.find(transformEl) : slides;
        } else {
          $transitionEndTarget = transformEl ? slides.eq(activeIndex).find(transformEl) : slides.eq(activeIndex);
        }

        $transitionEndTarget.transitionEnd(() => {
          if (eventTriggered) return;
          if (!swiper || swiper.destroyed) return;
          eventTriggered = true;
          swiper.animating = false;
          const triggerEvents = ['webkitTransitionEnd', 'transitionend'];

          for (let i = 0; i < triggerEvents.length; i += 1) {
            $wrapperEl.trigger(triggerEvents[i]);
          }
        });
      }
    }

    function EffectFade(_ref) {
      let {
        swiper,
        extendParams,
        on
      } = _ref;
      extendParams({
        fadeEffect: {
          crossFade: false,
          transformEl: null
        }
      });

      const setTranslate = () => {
        const {
          slides
        } = swiper;
        const params = swiper.params.fadeEffect;

        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = swiper.slides.eq(i);
          const offset = $slideEl[0].swiperSlideOffset;
          let tx = -offset;
          if (!swiper.params.virtualTranslate) tx -= swiper.translate;
          let ty = 0;

          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }

          const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs($slideEl[0].progress), 0) : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
          const $targetEl = effectTarget(params, $slideEl);
          $targetEl.css({
            opacity: slideOpacity
          }).transform(`translate3d(${tx}px, ${ty}px, 0px)`);
        }
      };

      const setTransition = duration => {
        const {
          transformEl
        } = swiper.params.fadeEffect;
        const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
        $transitionElements.transition(duration);
        effectVirtualTransitionEnd({
          swiper,
          duration,
          transformEl,
          allSlides: true
        });
      };

      effectInit({
        effect: 'fade',
        swiper,
        on,
        setTranslate,
        setTransition,
        overwriteParams: () => ({
          slidesPerView: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: !swiper.params.cssMode
        })
      });
    }

    function EffectCube(_ref) {
      let {
        swiper,
        extendParams,
        on
      } = _ref;
      extendParams({
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 20,
          shadowScale: 0.94
        }
      });

      const createSlideShadows = ($slideEl, progress, isHorizontal) => {
        let shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
        let shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');

        if (shadowBefore.length === 0) {
          shadowBefore = $(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
          $slideEl.append(shadowBefore);
        }

        if (shadowAfter.length === 0) {
          shadowAfter = $(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
          $slideEl.append(shadowAfter);
        }

        if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
        if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
      };

      const recreateShadows = () => {
        // create new ones
        const isHorizontal = swiper.isHorizontal();
        swiper.slides.each(slideEl => {
          const progress = Math.max(Math.min(slideEl.progress, 1), -1);
          createSlideShadows($(slideEl), progress, isHorizontal);
        });
      };

      const setTranslate = () => {
        const {
          $el,
          $wrapperEl,
          slides,
          width: swiperWidth,
          height: swiperHeight,
          rtlTranslate: rtl,
          size: swiperSize,
          browser
        } = swiper;
        const params = swiper.params.cubeEffect;
        const isHorizontal = swiper.isHorizontal();
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        let wrapperRotate = 0;
        let $cubeShadowEl;

        if (params.shadow) {
          if (isHorizontal) {
            $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');

            if ($cubeShadowEl.length === 0) {
              $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
              $wrapperEl.append($cubeShadowEl);
            }

            $cubeShadowEl.css({
              height: `${swiperWidth}px`
            });
          } else {
            $cubeShadowEl = $el.find('.swiper-cube-shadow');

            if ($cubeShadowEl.length === 0) {
              $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
              $el.append($cubeShadowEl);
            }
          }
        }

        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let slideIndex = i;

          if (isVirtual) {
            slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
          }

          let slideAngle = slideIndex * 90;
          let round = Math.floor(slideAngle / 360);

          if (rtl) {
            slideAngle = -slideAngle;
            round = Math.floor(-slideAngle / 360);
          }

          const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          let tx = 0;
          let ty = 0;
          let tz = 0;

          if (slideIndex % 4 === 0) {
            tx = -round * 4 * swiperSize;
            tz = 0;
          } else if ((slideIndex - 1) % 4 === 0) {
            tx = 0;
            tz = -round * 4 * swiperSize;
          } else if ((slideIndex - 2) % 4 === 0) {
            tx = swiperSize + round * 4 * swiperSize;
            tz = swiperSize;
          } else if ((slideIndex - 3) % 4 === 0) {
            tx = -swiperSize;
            tz = 3 * swiperSize + swiperSize * 4 * round;
          }

          if (rtl) {
            tx = -tx;
          }

          if (!isHorizontal) {
            ty = tx;
            tx = 0;
          }

          const transform = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${isHorizontal ? slideAngle : 0}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;

          if (progress <= 1 && progress > -1) {
            wrapperRotate = slideIndex * 90 + progress * 90;
            if (rtl) wrapperRotate = -slideIndex * 90 - progress * 90;
          }

          $slideEl.transform(transform);

          if (params.slideShadows) {
            createSlideShadows($slideEl, progress, isHorizontal);
          }
        }

        $wrapperEl.css({
          '-webkit-transform-origin': `50% 50% -${swiperSize / 2}px`,
          'transform-origin': `50% 50% -${swiperSize / 2}px`
        });

        if (params.shadow) {
          if (isHorizontal) {
            $cubeShadowEl.transform(`translate3d(0px, ${swiperWidth / 2 + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`);
          } else {
            const shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
            const multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
            const scale1 = params.shadowScale;
            const scale2 = params.shadowScale / multiplier;
            const offset = params.shadowOffset;
            $cubeShadowEl.transform(`scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${swiperHeight / 2 + offset}px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`);
          }
        }

        const zFactor = browser.isSafari || browser.isWebView ? -swiperSize / 2 : 0;
        $wrapperEl.transform(`translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`);
        $wrapperEl[0].style.setProperty('--swiper-cube-translate-z', `${zFactor}px`);
      };

      const setTransition = duration => {
        const {
          $el,
          slides
        } = swiper;
        slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);

        if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
          $el.find('.swiper-cube-shadow').transition(duration);
        }
      };

      effectInit({
        effect: 'cube',
        swiper,
        on,
        setTranslate,
        setTransition,
        recreateShadows,
        getEffectParams: () => swiper.params.cubeEffect,
        perspective: () => true,
        overwriteParams: () => ({
          slidesPerView: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          resistanceRatio: 0,
          spaceBetween: 0,
          centeredSlides: false,
          virtualTranslate: true
        })
      });
    }

    function createShadow(params, $slideEl, side) {
      const shadowClass = `swiper-slide-shadow${side ? `-${side}` : ''}`;
      const $shadowContainer = params.transformEl ? $slideEl.find(params.transformEl) : $slideEl;
      let $shadowEl = $shadowContainer.children(`.${shadowClass}`);

      if (!$shadowEl.length) {
        $shadowEl = $(`<div class="swiper-slide-shadow${side ? `-${side}` : ''}"></div>`);
        $shadowContainer.append($shadowEl);
      }

      return $shadowEl;
    }

    function EffectFlip(_ref) {
      let {
        swiper,
        extendParams,
        on
      } = _ref;
      extendParams({
        flipEffect: {
          slideShadows: true,
          limitRotation: true,
          transformEl: null
        }
      });

      const createSlideShadows = ($slideEl, progress, params) => {
        let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
        let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');

        if (shadowBefore.length === 0) {
          shadowBefore = createShadow(params, $slideEl, swiper.isHorizontal() ? 'left' : 'top');
        }

        if (shadowAfter.length === 0) {
          shadowAfter = createShadow(params, $slideEl, swiper.isHorizontal() ? 'right' : 'bottom');
        }

        if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
        if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
      };

      const recreateShadows = () => {
        // Set shadows
        const params = swiper.params.flipEffect;
        swiper.slides.each(slideEl => {
          const $slideEl = $(slideEl);
          let progress = $slideEl[0].progress;

          if (swiper.params.flipEffect.limitRotation) {
            progress = Math.max(Math.min(slideEl.progress, 1), -1);
          }

          createSlideShadows($slideEl, progress, params);
        });
      };

      const setTranslate = () => {
        const {
          slides,
          rtlTranslate: rtl
        } = swiper;
        const params = swiper.params.flipEffect;

        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let progress = $slideEl[0].progress;

          if (swiper.params.flipEffect.limitRotation) {
            progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          }

          const offset = $slideEl[0].swiperSlideOffset;
          const rotate = -180 * progress;
          let rotateY = rotate;
          let rotateX = 0;
          let tx = swiper.params.cssMode ? -offset - swiper.translate : -offset;
          let ty = 0;

          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
            rotateX = -rotateY;
            rotateY = 0;
          } else if (rtl) {
            rotateY = -rotateY;
          }

          $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

          if (params.slideShadows) {
            createSlideShadows($slideEl, progress, params);
          }

          const transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          const $targetEl = effectTarget(params, $slideEl);
          $targetEl.transform(transform);
        }
      };

      const setTransition = duration => {
        const {
          transformEl
        } = swiper.params.flipEffect;
        const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
        $transitionElements.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
        effectVirtualTransitionEnd({
          swiper,
          duration,
          transformEl
        });
      };

      effectInit({
        effect: 'flip',
        swiper,
        on,
        setTranslate,
        setTransition,
        recreateShadows,
        getEffectParams: () => swiper.params.flipEffect,
        perspective: () => true,
        overwriteParams: () => ({
          slidesPerView: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: !swiper.params.cssMode
        })
      });
    }

    function EffectCoverflow(_ref) {
      let {
        swiper,
        extendParams,
        on
      } = _ref;
      extendParams({
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          scale: 1,
          modifier: 1,
          slideShadows: true,
          transformEl: null
        }
      });

      const setTranslate = () => {
        const {
          width: swiperWidth,
          height: swiperHeight,
          slides,
          slidesSizesGrid
        } = swiper;
        const params = swiper.params.coverflowEffect;
        const isHorizontal = swiper.isHorizontal();
        const transform = swiper.translate;
        const center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
        const rotate = isHorizontal ? params.rotate : -params.rotate;
        const translate = params.depth; // Each slide offset from center

        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideSize = slidesSizesGrid[i];
          const slideOffset = $slideEl[0].swiperSlideOffset;
          const centerOffset = (center - slideOffset - slideSize / 2) / slideSize;
          const offsetMultiplier = typeof params.modifier === 'function' ? params.modifier(centerOffset) : centerOffset * params.modifier;
          let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier; // var rotateZ = 0

          let translateZ = -translate * Math.abs(offsetMultiplier);
          let stretch = params.stretch; // Allow percentage to make a relative stretch for responsive sliders

          if (typeof stretch === 'string' && stretch.indexOf('%') !== -1) {
            stretch = parseFloat(params.stretch) / 100 * slideSize;
          }

          let translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
          let translateX = isHorizontal ? stretch * offsetMultiplier : 0;
          let scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier); // Fix for ultra small values

          if (Math.abs(translateX) < 0.001) translateX = 0;
          if (Math.abs(translateY) < 0.001) translateY = 0;
          if (Math.abs(translateZ) < 0.001) translateZ = 0;
          if (Math.abs(rotateY) < 0.001) rotateY = 0;
          if (Math.abs(rotateX) < 0.001) rotateX = 0;
          if (Math.abs(scale) < 0.001) scale = 0;
          const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
          const $targetEl = effectTarget(params, $slideEl);
          $targetEl.transform(slideTransform);
          $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;

          if (params.slideShadows) {
            // Set shadows
            let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');

            if ($shadowBeforeEl.length === 0) {
              $shadowBeforeEl = createShadow(params, $slideEl, isHorizontal ? 'left' : 'top');
            }

            if ($shadowAfterEl.length === 0) {
              $shadowAfterEl = createShadow(params, $slideEl, isHorizontal ? 'right' : 'bottom');
            }

            if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
            if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
          }
        }
      };

      const setTransition = duration => {
        const {
          transformEl
        } = swiper.params.coverflowEffect;
        const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
        $transitionElements.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
      };

      effectInit({
        effect: 'coverflow',
        swiper,
        on,
        setTranslate,
        setTransition,
        perspective: () => true,
        overwriteParams: () => ({
          watchSlidesProgress: true
        })
      });
    }

    function EffectCreative(_ref) {
      let {
        swiper,
        extendParams,
        on
      } = _ref;
      extendParams({
        creativeEffect: {
          transformEl: null,
          limitProgress: 1,
          shadowPerProgress: false,
          progressMultiplier: 1,
          perspective: true,
          prev: {
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
            opacity: 1,
            scale: 1
          },
          next: {
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
            opacity: 1,
            scale: 1
          }
        }
      });

      const getTranslateValue = value => {
        if (typeof value === 'string') return value;
        return `${value}px`;
      };

      const setTranslate = () => {
        const {
          slides,
          $wrapperEl,
          slidesSizesGrid
        } = swiper;
        const params = swiper.params.creativeEffect;
        const {
          progressMultiplier: multiplier
        } = params;
        const isCenteredSlides = swiper.params.centeredSlides;

        if (isCenteredSlides) {
          const margin = slidesSizesGrid[0] / 2 - swiper.params.slidesOffsetBefore || 0;
          $wrapperEl.transform(`translateX(calc(50% - ${margin}px))`);
        }

        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideProgress = $slideEl[0].progress;
          const progress = Math.min(Math.max($slideEl[0].progress, -params.limitProgress), params.limitProgress);
          let originalProgress = progress;

          if (!isCenteredSlides) {
            originalProgress = Math.min(Math.max($slideEl[0].originalProgress, -params.limitProgress), params.limitProgress);
          }

          const offset = $slideEl[0].swiperSlideOffset;
          const t = [swiper.params.cssMode ? -offset - swiper.translate : -offset, 0, 0];
          const r = [0, 0, 0];
          let custom = false;

          if (!swiper.isHorizontal()) {
            t[1] = t[0];
            t[0] = 0;
          }

          let data = {
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
            scale: 1,
            opacity: 1
          };

          if (progress < 0) {
            data = params.next;
            custom = true;
          } else if (progress > 0) {
            data = params.prev;
            custom = true;
          } // set translate


          t.forEach((value, index) => {
            t[index] = `calc(${value}px + (${getTranslateValue(data.translate[index])} * ${Math.abs(progress * multiplier)}))`;
          }); // set rotates

          r.forEach((value, index) => {
            r[index] = data.rotate[index] * Math.abs(progress * multiplier);
          });
          $slideEl[0].style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
          const translateString = t.join(', ');
          const rotateString = `rotateX(${r[0]}deg) rotateY(${r[1]}deg) rotateZ(${r[2]}deg)`;
          const scaleString = originalProgress < 0 ? `scale(${1 + (1 - data.scale) * originalProgress * multiplier})` : `scale(${1 - (1 - data.scale) * originalProgress * multiplier})`;
          const opacityString = originalProgress < 0 ? 1 + (1 - data.opacity) * originalProgress * multiplier : 1 - (1 - data.opacity) * originalProgress * multiplier;
          const transform = `translate3d(${translateString}) ${rotateString} ${scaleString}`; // Set shadows

          if (custom && data.shadow || !custom) {
            let $shadowEl = $slideEl.children('.swiper-slide-shadow');

            if ($shadowEl.length === 0 && data.shadow) {
              $shadowEl = createShadow(params, $slideEl);
            }

            if ($shadowEl.length) {
              const shadowOpacity = params.shadowPerProgress ? progress * (1 / params.limitProgress) : progress;
              $shadowEl[0].style.opacity = Math.min(Math.max(Math.abs(shadowOpacity), 0), 1);
            }
          }

          const $targetEl = effectTarget(params, $slideEl);
          $targetEl.transform(transform).css({
            opacity: opacityString
          });

          if (data.origin) {
            $targetEl.css('transform-origin', data.origin);
          }
        }
      };

      const setTransition = duration => {
        const {
          transformEl
        } = swiper.params.creativeEffect;
        const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
        $transitionElements.transition(duration).find('.swiper-slide-shadow').transition(duration);
        effectVirtualTransitionEnd({
          swiper,
          duration,
          transformEl,
          allSlides: true
        });
      };

      effectInit({
        effect: 'creative',
        swiper,
        on,
        setTranslate,
        setTransition,
        perspective: () => swiper.params.creativeEffect.perspective,
        overwriteParams: () => ({
          watchSlidesProgress: true,
          virtualTranslate: !swiper.params.cssMode
        })
      });
    }

    function EffectCards(_ref) {
      let {
        swiper,
        extendParams,
        on
      } = _ref;
      extendParams({
        cardsEffect: {
          slideShadows: true,
          transformEl: null,
          rotate: true
        }
      });

      const setTranslate = () => {
        const {
          slides,
          activeIndex
        } = swiper;
        const params = swiper.params.cardsEffect;
        const {
          startTranslate,
          isTouched
        } = swiper.touchEventsData;
        const currentTranslate = swiper.translate;

        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideProgress = $slideEl[0].progress;
          const progress = Math.min(Math.max(slideProgress, -4), 4);
          let offset = $slideEl[0].swiperSlideOffset;

          if (swiper.params.centeredSlides && !swiper.params.cssMode) {
            swiper.$wrapperEl.transform(`translateX(${swiper.minTranslate()}px)`);
          }

          if (swiper.params.centeredSlides && swiper.params.cssMode) {
            offset -= slides[0].swiperSlideOffset;
          }

          let tX = swiper.params.cssMode ? -offset - swiper.translate : -offset;
          let tY = 0;
          const tZ = -100 * Math.abs(progress);
          let scale = 1;
          let rotate = -2 * progress;
          let tXAdd = 8 - Math.abs(progress) * 0.75;
          const slideIndex = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.from + i : i;
          const isSwipeToNext = (slideIndex === activeIndex || slideIndex === activeIndex - 1) && progress > 0 && progress < 1 && (isTouched || swiper.params.cssMode) && currentTranslate < startTranslate;
          const isSwipeToPrev = (slideIndex === activeIndex || slideIndex === activeIndex + 1) && progress < 0 && progress > -1 && (isTouched || swiper.params.cssMode) && currentTranslate > startTranslate;

          if (isSwipeToNext || isSwipeToPrev) {
            const subProgress = (1 - Math.abs((Math.abs(progress) - 0.5) / 0.5)) ** 0.5;
            rotate += -28 * progress * subProgress;
            scale += -0.5 * subProgress;
            tXAdd += 96 * subProgress;
            tY = `${-25 * subProgress * Math.abs(progress)}%`;
          }

          if (progress < 0) {
            // next
            tX = `calc(${tX}px + (${tXAdd * Math.abs(progress)}%))`;
          } else if (progress > 0) {
            // prev
            tX = `calc(${tX}px + (-${tXAdd * Math.abs(progress)}%))`;
          } else {
            tX = `${tX}px`;
          }

          if (!swiper.isHorizontal()) {
            const prevY = tY;
            tY = tX;
            tX = prevY;
          }

          const scaleString = progress < 0 ? `${1 + (1 - scale) * progress}` : `${1 - (1 - scale) * progress}`;
          const transform = `
        translate3d(${tX}, ${tY}, ${tZ}px)
        rotateZ(${params.rotate ? rotate : 0}deg)
        scale(${scaleString})
      `;

          if (params.slideShadows) {
            // Set shadows
            let $shadowEl = $slideEl.find('.swiper-slide-shadow');

            if ($shadowEl.length === 0) {
              $shadowEl = createShadow(params, $slideEl);
            }

            if ($shadowEl.length) $shadowEl[0].style.opacity = Math.min(Math.max((Math.abs(progress) - 0.5) / 0.5, 0), 1);
          }

          $slideEl[0].style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
          const $targetEl = effectTarget(params, $slideEl);
          $targetEl.transform(transform);
        }
      };

      const setTransition = duration => {
        const {
          transformEl
        } = swiper.params.cardsEffect;
        const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
        $transitionElements.transition(duration).find('.swiper-slide-shadow').transition(duration);
        effectVirtualTransitionEnd({
          swiper,
          duration,
          transformEl
        });
      };

      effectInit({
        effect: 'cards',
        swiper,
        on,
        setTranslate,
        setTransition,
        perspective: () => true,
        overwriteParams: () => ({
          watchSlidesProgress: true,
          virtualTranslate: !swiper.params.cssMode
        })
      });
    }

    // Swiper Class
    const modules = [Virtual, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar, Parallax, Zoom, Lazy, Controller, A11y, History, HashNavigation, Autoplay, Thumb, freeMode, Grid, Manipulation, EffectFade, EffectCube, EffectFlip, EffectCoverflow, EffectCreative, EffectCards];
    Swiper.use(modules);

    return Swiper;

}));
//# sourceMappingURL=swiper-bundle.js.map
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzd2lwZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTd2lwZXIgOC4yLjRcbiAqIE1vc3QgbW9kZXJuIG1vYmlsZSB0b3VjaCBzbGlkZXIgYW5kIGZyYW1ld29yayB3aXRoIGhhcmR3YXJlIGFjY2VsZXJhdGVkIHRyYW5zaXRpb25zXG4gKiBodHRwczovL3N3aXBlcmpzLmNvbVxuICpcbiAqIENvcHlyaWdodCAyMDE0LTIwMjIgVmxhZGltaXIgS2hhcmxhbXBpZGlcbiAqXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2VcbiAqXG4gKiBSZWxlYXNlZCBvbjogSnVuZSAxMywgMjAyMlxuICovXG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gICAgKGdsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOiBnbG9iYWwgfHwgc2VsZiwgZ2xvYmFsLlN3aXBlciA9IGZhY3RvcnkoKSk7XG59KSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbiAgICAvKipcbiAgICAgKiBTU1IgV2luZG93IDQuMC4yXG4gICAgICogQmV0dGVyIGhhbmRsaW5nIGZvciB3aW5kb3cgb2JqZWN0IGluIFNTUiBlbnZpcm9ubWVudFxuICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2xpbWl0czR3ZWIvc3NyLXdpbmRvd1xuICAgICAqXG4gICAgICogQ29weXJpZ2h0IDIwMjEsIFZsYWRpbWlyIEtoYXJsYW1waWRpXG4gICAgICpcbiAgICAgKiBMaWNlbnNlZCB1bmRlciBNSVRcbiAgICAgKlxuICAgICAqIFJlbGVhc2VkIG9uOiBEZWNlbWJlciAxMywgMjAyMVxuICAgICAqL1xuXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbiAgICBmdW5jdGlvbiBpc09iamVjdCQxKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAnY29uc3RydWN0b3InIGluIG9iaiAmJiBvYmouY29uc3RydWN0b3IgPT09IE9iamVjdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHRlbmQkMSh0YXJnZXQsIHNyYykge1xuICAgICAgaWYgKHRhcmdldCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHRhcmdldCA9IHt9O1xuICAgICAgfVxuXG4gICAgICBpZiAoc3JjID09PSB2b2lkIDApIHtcbiAgICAgICAgc3JjID0ge307XG4gICAgICB9XG5cbiAgICAgIE9iamVjdC5rZXlzKHNyYykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHRhcmdldFtrZXldID09PSAndW5kZWZpbmVkJykgdGFyZ2V0W2tleV0gPSBzcmNba2V5XTtlbHNlIGlmIChpc09iamVjdCQxKHNyY1trZXldKSAmJiBpc09iamVjdCQxKHRhcmdldFtrZXldKSAmJiBPYmplY3Qua2V5cyhzcmNba2V5XSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGV4dGVuZCQxKHRhcmdldFtrZXldLCBzcmNba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHNzckRvY3VtZW50ID0ge1xuICAgICAgYm9keToge30sXG5cbiAgICAgIGFkZEV2ZW50TGlzdGVuZXIoKSB7fSxcblxuICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcigpIHt9LFxuXG4gICAgICBhY3RpdmVFbGVtZW50OiB7XG4gICAgICAgIGJsdXIoKSB7fSxcblxuICAgICAgICBub2RlTmFtZTogJydcbiAgICAgIH0sXG5cbiAgICAgIHF1ZXJ5U2VsZWN0b3IoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSxcblxuICAgICAgcXVlcnlTZWxlY3RvckFsbCgpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfSxcblxuICAgICAgZ2V0RWxlbWVudEJ5SWQoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSxcblxuICAgICAgY3JlYXRlRXZlbnQoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaW5pdEV2ZW50KCkge31cblxuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgICAgY3JlYXRlRWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgICAgY2hpbGROb2RlczogW10sXG4gICAgICAgICAgc3R5bGU6IHt9LFxuXG4gICAgICAgICAgc2V0QXR0cmlidXRlKCkge30sXG5cbiAgICAgICAgICBnZXRFbGVtZW50c0J5VGFnTmFtZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfTtcbiAgICAgIH0sXG5cbiAgICAgIGNyZWF0ZUVsZW1lbnROUygpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfSxcblxuICAgICAgaW1wb3J0Tm9kZSgpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9LFxuXG4gICAgICBsb2NhdGlvbjoge1xuICAgICAgICBoYXNoOiAnJyxcbiAgICAgICAgaG9zdDogJycsXG4gICAgICAgIGhvc3RuYW1lOiAnJyxcbiAgICAgICAgaHJlZjogJycsXG4gICAgICAgIG9yaWdpbjogJycsXG4gICAgICAgIHBhdGhuYW1lOiAnJyxcbiAgICAgICAgcHJvdG9jb2w6ICcnLFxuICAgICAgICBzZWFyY2g6ICcnXG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldERvY3VtZW50KCkge1xuICAgICAgY29uc3QgZG9jID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IGRvY3VtZW50IDoge307XG4gICAgICBleHRlbmQkMShkb2MsIHNzckRvY3VtZW50KTtcbiAgICAgIHJldHVybiBkb2M7XG4gICAgfVxuXG4gICAgY29uc3Qgc3NyV2luZG93ID0ge1xuICAgICAgZG9jdW1lbnQ6IHNzckRvY3VtZW50LFxuICAgICAgbmF2aWdhdG9yOiB7XG4gICAgICAgIHVzZXJBZ2VudDogJydcbiAgICAgIH0sXG4gICAgICBsb2NhdGlvbjoge1xuICAgICAgICBoYXNoOiAnJyxcbiAgICAgICAgaG9zdDogJycsXG4gICAgICAgIGhvc3RuYW1lOiAnJyxcbiAgICAgICAgaHJlZjogJycsXG4gICAgICAgIG9yaWdpbjogJycsXG4gICAgICAgIHBhdGhuYW1lOiAnJyxcbiAgICAgICAgcHJvdG9jb2w6ICcnLFxuICAgICAgICBzZWFyY2g6ICcnXG4gICAgICB9LFxuICAgICAgaGlzdG9yeToge1xuICAgICAgICByZXBsYWNlU3RhdGUoKSB7fSxcblxuICAgICAgICBwdXNoU3RhdGUoKSB7fSxcblxuICAgICAgICBnbygpIHt9LFxuXG4gICAgICAgIGJhY2soKSB7fVxuXG4gICAgICB9LFxuICAgICAgQ3VzdG9tRXZlbnQ6IGZ1bmN0aW9uIEN1c3RvbUV2ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sXG5cbiAgICAgIGFkZEV2ZW50TGlzdGVuZXIoKSB7fSxcblxuICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcigpIHt9LFxuXG4gICAgICBnZXRDb21wdXRlZFN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGdldFByb3BlcnR5VmFsdWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgICBJbWFnZSgpIHt9LFxuXG4gICAgICBEYXRlKCkge30sXG5cbiAgICAgIHNjcmVlbjoge30sXG5cbiAgICAgIHNldFRpbWVvdXQoKSB7fSxcblxuICAgICAgY2xlYXJUaW1lb3V0KCkge30sXG5cbiAgICAgIG1hdGNoTWVkaWEoKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH0sXG5cbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShjYWxsYmFjaykge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGNhbGxiYWNrLCAwKTtcbiAgICAgIH0sXG5cbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGlkKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhclRpbWVvdXQoaWQpO1xuICAgICAgfVxuXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldFdpbmRvdygpIHtcbiAgICAgIGNvbnN0IHdpbiA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDoge307XG4gICAgICBleHRlbmQkMSh3aW4sIHNzcldpbmRvdyk7XG4gICAgICByZXR1cm4gd2luO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvbTcgNC4wLjRcbiAgICAgKiBNaW5pbWFsaXN0aWMgSmF2YVNjcmlwdCBsaWJyYXJ5IGZvciBET00gbWFuaXB1bGF0aW9uLCB3aXRoIGEgalF1ZXJ5LWNvbXBhdGlibGUgQVBJXG4gICAgICogaHR0cHM6Ly9mcmFtZXdvcms3LmlvL2RvY3MvZG9tNy5odG1sXG4gICAgICpcbiAgICAgKiBDb3B5cmlnaHQgMjAyMiwgVmxhZGltaXIgS2hhcmxhbXBpZGlcbiAgICAgKlxuICAgICAqIExpY2Vuc2VkIHVuZGVyIE1JVFxuICAgICAqXG4gICAgICogUmVsZWFzZWQgb246IEphbnVhcnkgMTEsIDIwMjJcbiAgICAgKi9cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xuXG4gICAgZnVuY3Rpb24gbWFrZVJlYWN0aXZlKG9iaikge1xuICAgICAgY29uc3QgcHJvdG8gPSBvYmouX19wcm90b19fO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ19fcHJvdG9fXycsIHtcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBwcm90bztcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICBwcm90by5fX3Byb3RvX18gPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGFzcyBEb203IGV4dGVuZHMgQXJyYXkge1xuICAgICAgY29uc3RydWN0b3IoaXRlbXMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtcyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBzdXBlcihpdGVtcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwZXIoLi4uKGl0ZW1zIHx8IFtdKSk7XG4gICAgICAgICAgbWFrZVJlYWN0aXZlKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcnJheUZsYXQoYXJyKSB7XG4gICAgICBpZiAoYXJyID09PSB2b2lkIDApIHtcbiAgICAgICAgYXJyID0gW107XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlcyA9IFtdO1xuICAgICAgYXJyLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShlbCkpIHtcbiAgICAgICAgICByZXMucHVzaCguLi5hcnJheUZsYXQoZWwpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMucHVzaChlbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcnJheUZpbHRlcihhcnIsIGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKGFyciwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFycmF5VW5pcXVlKGFycikge1xuICAgICAgY29uc3QgdW5pcXVlQXJyYXkgPSBbXTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKHVuaXF1ZUFycmF5LmluZGV4T2YoYXJyW2ldKSA9PT0gLTEpIHVuaXF1ZUFycmF5LnB1c2goYXJyW2ldKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVuaXF1ZUFycmF5O1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gcXNhKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgICBpZiAodHlwZW9mIHNlbGVjdG9yICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gW3NlbGVjdG9yXTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYSA9IFtdO1xuICAgICAgY29uc3QgcmVzID0gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgYS5wdXNoKHJlc1tpXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uICQoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICAgIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICAgICAgY29uc3QgZG9jdW1lbnQgPSBnZXREb2N1bWVudCgpO1xuICAgICAgbGV0IGFyciA9IFtdO1xuXG4gICAgICBpZiAoIWNvbnRleHQgJiYgc2VsZWN0b3IgaW5zdGFuY2VvZiBEb203KSB7XG4gICAgICAgIHJldHVybiBzZWxlY3RvcjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gbmV3IERvbTcoYXJyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgaHRtbCA9IHNlbGVjdG9yLnRyaW0oKTtcblxuICAgICAgICBpZiAoaHRtbC5pbmRleE9mKCc8JykgPj0gMCAmJiBodG1sLmluZGV4T2YoJz4nKSA+PSAwKSB7XG4gICAgICAgICAgbGV0IHRvQ3JlYXRlID0gJ2Rpdic7XG4gICAgICAgICAgaWYgKGh0bWwuaW5kZXhPZignPGxpJykgPT09IDApIHRvQ3JlYXRlID0gJ3VsJztcbiAgICAgICAgICBpZiAoaHRtbC5pbmRleE9mKCc8dHInKSA9PT0gMCkgdG9DcmVhdGUgPSAndGJvZHknO1xuICAgICAgICAgIGlmIChodG1sLmluZGV4T2YoJzx0ZCcpID09PSAwIHx8IGh0bWwuaW5kZXhPZignPHRoJykgPT09IDApIHRvQ3JlYXRlID0gJ3RyJztcbiAgICAgICAgICBpZiAoaHRtbC5pbmRleE9mKCc8dGJvZHknKSA9PT0gMCkgdG9DcmVhdGUgPSAndGFibGUnO1xuICAgICAgICAgIGlmIChodG1sLmluZGV4T2YoJzxvcHRpb24nKSA9PT0gMCkgdG9DcmVhdGUgPSAnc2VsZWN0JztcbiAgICAgICAgICBjb25zdCB0ZW1wUGFyZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0b0NyZWF0ZSk7XG4gICAgICAgICAgdGVtcFBhcmVudC5pbm5lckhUTUwgPSBodG1sO1xuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZW1wUGFyZW50LmNoaWxkTm9kZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKHRlbXBQYXJlbnQuY2hpbGROb2Rlc1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFyciA9IHFzYShzZWxlY3Rvci50cmltKCksIGNvbnRleHQgfHwgZG9jdW1lbnQpO1xuICAgICAgICB9IC8vIGFyciA9IHFzYShzZWxlY3RvciwgZG9jdW1lbnQpO1xuXG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdG9yLm5vZGVUeXBlIHx8IHNlbGVjdG9yID09PSB3aW5kb3cgfHwgc2VsZWN0b3IgPT09IGRvY3VtZW50KSB7XG4gICAgICAgIGFyci5wdXNoKHNlbGVjdG9yKTtcbiAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShzZWxlY3RvcikpIHtcbiAgICAgICAgaWYgKHNlbGVjdG9yIGluc3RhbmNlb2YgRG9tNykgcmV0dXJuIHNlbGVjdG9yO1xuICAgICAgICBhcnIgPSBzZWxlY3RvcjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBEb203KGFycmF5VW5pcXVlKGFycikpO1xuICAgIH1cblxuICAgICQuZm4gPSBEb203LnByb3RvdHlwZTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG5cbiAgICBmdW5jdGlvbiBhZGRDbGFzcygpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBjbGFzc2VzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBjbGFzc2VzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjbGFzc05hbWVzID0gYXJyYXlGbGF0KGNsYXNzZXMubWFwKGMgPT4gYy5zcGxpdCgnICcpKSk7XG4gICAgICB0aGlzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzTmFtZXMpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVDbGFzcygpIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgY2xhc3NlcyA9IG5ldyBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBjbGFzc2VzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBhcnJheUZsYXQoY2xhc3Nlcy5tYXAoYyA9PiBjLnNwbGl0KCcgJykpKTtcbiAgICAgIHRoaXMuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoLi4uY2xhc3NOYW1lcyk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZUNsYXNzKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBjbGFzc2VzID0gbmV3IEFycmF5KF9sZW4zKSwgX2tleTMgPSAwOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG4gICAgICAgIGNsYXNzZXNbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2xhc3NOYW1lcyA9IGFycmF5RmxhdChjbGFzc2VzLm1hcChjID0+IGMuc3BsaXQoJyAnKSkpO1xuICAgICAgdGhpcy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgY2xhc3NOYW1lcy5mb3JFYWNoKGNsYXNzTmFtZSA9PiB7XG4gICAgICAgICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShjbGFzc05hbWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhc0NsYXNzKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjQgPSBhcmd1bWVudHMubGVuZ3RoLCBjbGFzc2VzID0gbmV3IEFycmF5KF9sZW40KSwgX2tleTQgPSAwOyBfa2V5NCA8IF9sZW40OyBfa2V5NCsrKSB7XG4gICAgICAgIGNsYXNzZXNbX2tleTRdID0gYXJndW1lbnRzW19rZXk0XTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2xhc3NOYW1lcyA9IGFycmF5RmxhdChjbGFzc2VzLm1hcChjID0+IGMuc3BsaXQoJyAnKSkpO1xuICAgICAgcmV0dXJuIGFycmF5RmlsdGVyKHRoaXMsIGVsID0+IHtcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXMuZmlsdGVyKGNsYXNzTmFtZSA9PiBlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkubGVuZ3RoID4gMDtcbiAgICAgIH0pLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXR0cihhdHRycywgdmFsdWUpIHtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHR5cGVvZiBhdHRycyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgLy8gR2V0IGF0dHJcbiAgICAgICAgaWYgKHRoaXNbMF0pIHJldHVybiB0aGlzWzBdLmdldEF0dHJpYnV0ZShhdHRycyk7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9IC8vIFNldCBhdHRyc1xuXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgIC8vIFN0cmluZ1xuICAgICAgICAgIHRoaXNbaV0uc2V0QXR0cmlidXRlKGF0dHJzLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT2JqZWN0XG4gICAgICAgICAgZm9yIChjb25zdCBhdHRyTmFtZSBpbiBhdHRycykge1xuICAgICAgICAgICAgdGhpc1tpXVthdHRyTmFtZV0gPSBhdHRyc1thdHRyTmFtZV07XG4gICAgICAgICAgICB0aGlzW2ldLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0cnNbYXR0ck5hbWVdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlQXR0cihhdHRyKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdGhpc1tpXS5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zZm9ybSh0cmFuc2Zvcm0pIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICB0aGlzW2ldLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNpdGlvbiQxKGR1cmF0aW9uKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdGhpc1tpXS5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSB0eXBlb2YgZHVyYXRpb24gIT09ICdzdHJpbmcnID8gYCR7ZHVyYXRpb259bXNgIDogZHVyYXRpb247XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjUgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW41KSwgX2tleTUgPSAwOyBfa2V5NSA8IF9sZW41OyBfa2V5NSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleTVdID0gYXJndW1lbnRzW19rZXk1XTtcbiAgICAgIH1cblxuICAgICAgbGV0IFtldmVudFR5cGUsIHRhcmdldFNlbGVjdG9yLCBsaXN0ZW5lciwgY2FwdHVyZV0gPSBhcmdzO1xuXG4gICAgICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgW2V2ZW50VHlwZSwgbGlzdGVuZXIsIGNhcHR1cmVdID0gYXJncztcbiAgICAgICAgdGFyZ2V0U2VsZWN0b3IgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIGlmICghY2FwdHVyZSkgY2FwdHVyZSA9IGZhbHNlO1xuXG4gICAgICBmdW5jdGlvbiBoYW5kbGVMaXZlRXZlbnQoZSkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcbiAgICAgICAgY29uc3QgZXZlbnREYXRhID0gZS50YXJnZXQuZG9tN0V2ZW50RGF0YSB8fCBbXTtcblxuICAgICAgICBpZiAoZXZlbnREYXRhLmluZGV4T2YoZSkgPCAwKSB7XG4gICAgICAgICAgZXZlbnREYXRhLnVuc2hpZnQoZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJCh0YXJnZXQpLmlzKHRhcmdldFNlbGVjdG9yKSkgbGlzdGVuZXIuYXBwbHkodGFyZ2V0LCBldmVudERhdGEpO2Vsc2Uge1xuICAgICAgICAgIGNvbnN0IHBhcmVudHMgPSAkKHRhcmdldCkucGFyZW50cygpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHBhcmVudHMubGVuZ3RoOyBrICs9IDEpIHtcbiAgICAgICAgICAgIGlmICgkKHBhcmVudHNba10pLmlzKHRhcmdldFNlbGVjdG9yKSkgbGlzdGVuZXIuYXBwbHkocGFyZW50c1trXSwgZXZlbnREYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gaGFuZGxlRXZlbnQoZSkge1xuICAgICAgICBjb25zdCBldmVudERhdGEgPSBlICYmIGUudGFyZ2V0ID8gZS50YXJnZXQuZG9tN0V2ZW50RGF0YSB8fCBbXSA6IFtdO1xuXG4gICAgICAgIGlmIChldmVudERhdGEuaW5kZXhPZihlKSA8IDApIHtcbiAgICAgICAgICBldmVudERhdGEudW5zaGlmdChlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGV2ZW50RGF0YSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGV2ZW50cyA9IGV2ZW50VHlwZS5zcGxpdCgnICcpO1xuICAgICAgbGV0IGo7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBlbCA9IHRoaXNbaV07XG5cbiAgICAgICAgaWYgKCF0YXJnZXRTZWxlY3Rvcikge1xuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBldmVudHMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzW2pdO1xuICAgICAgICAgICAgaWYgKCFlbC5kb203TGlzdGVuZXJzKSBlbC5kb203TGlzdGVuZXJzID0ge307XG4gICAgICAgICAgICBpZiAoIWVsLmRvbTdMaXN0ZW5lcnNbZXZlbnRdKSBlbC5kb203TGlzdGVuZXJzW2V2ZW50XSA9IFtdO1xuICAgICAgICAgICAgZWwuZG9tN0xpc3RlbmVyc1tldmVudF0ucHVzaCh7XG4gICAgICAgICAgICAgIGxpc3RlbmVyLFxuICAgICAgICAgICAgICBwcm94eUxpc3RlbmVyOiBoYW5kbGVFdmVudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVFdmVudCwgY2FwdHVyZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIExpdmUgZXZlbnRzXG4gICAgICAgICAgZm9yIChqID0gMDsgaiA8IGV2ZW50cy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBldmVudHNbal07XG4gICAgICAgICAgICBpZiAoIWVsLmRvbTdMaXZlTGlzdGVuZXJzKSBlbC5kb203TGl2ZUxpc3RlbmVycyA9IHt9O1xuICAgICAgICAgICAgaWYgKCFlbC5kb203TGl2ZUxpc3RlbmVyc1tldmVudF0pIGVsLmRvbTdMaXZlTGlzdGVuZXJzW2V2ZW50XSA9IFtdO1xuICAgICAgICAgICAgZWwuZG9tN0xpdmVMaXN0ZW5lcnNbZXZlbnRdLnB1c2goe1xuICAgICAgICAgICAgICBsaXN0ZW5lcixcbiAgICAgICAgICAgICAgcHJveHlMaXN0ZW5lcjogaGFuZGxlTGl2ZUV2ZW50XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZUxpdmVFdmVudCwgY2FwdHVyZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9mZigpIHtcbiAgICAgIGZvciAodmFyIF9sZW42ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNiksIF9rZXk2ID0gMDsgX2tleTYgPCBfbGVuNjsgX2tleTYrKykge1xuICAgICAgICBhcmdzW19rZXk2XSA9IGFyZ3VtZW50c1tfa2V5Nl07XG4gICAgICB9XG5cbiAgICAgIGxldCBbZXZlbnRUeXBlLCB0YXJnZXRTZWxlY3RvciwgbGlzdGVuZXIsIGNhcHR1cmVdID0gYXJncztcblxuICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIFtldmVudFR5cGUsIGxpc3RlbmVyLCBjYXB0dXJlXSA9IGFyZ3M7XG4gICAgICAgIHRhcmdldFNlbGVjdG9yID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWNhcHR1cmUpIGNhcHR1cmUgPSBmYWxzZTtcbiAgICAgIGNvbnN0IGV2ZW50cyA9IGV2ZW50VHlwZS5zcGxpdCgnICcpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1tpXTtcblxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBlbCA9IHRoaXNbal07XG4gICAgICAgICAgbGV0IGhhbmRsZXJzO1xuXG4gICAgICAgICAgaWYgKCF0YXJnZXRTZWxlY3RvciAmJiBlbC5kb203TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBoYW5kbGVycyA9IGVsLmRvbTdMaXN0ZW5lcnNbZXZlbnRdO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0U2VsZWN0b3IgJiYgZWwuZG9tN0xpdmVMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGhhbmRsZXJzID0gZWwuZG9tN0xpdmVMaXN0ZW5lcnNbZXZlbnRdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChoYW5kbGVycyAmJiBoYW5kbGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGsgPSBoYW5kbGVycy5sZW5ndGggLSAxOyBrID49IDA7IGsgLT0gMSkge1xuICAgICAgICAgICAgICBjb25zdCBoYW5kbGVyID0gaGFuZGxlcnNba107XG5cbiAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyICYmIGhhbmRsZXIubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlci5wcm94eUxpc3RlbmVyLCBjYXB0dXJlKTtcbiAgICAgICAgICAgICAgICBoYW5kbGVycy5zcGxpY2UoaywgMSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXIgJiYgaGFuZGxlci5saXN0ZW5lciAmJiBoYW5kbGVyLmxpc3RlbmVyLmRvbTdwcm94eSAmJiBoYW5kbGVyLmxpc3RlbmVyLmRvbTdwcm94eSA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLnByb3h5TGlzdGVuZXIsIGNhcHR1cmUpO1xuICAgICAgICAgICAgICAgIGhhbmRsZXJzLnNwbGljZShrLCAxKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICghbGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLnByb3h5TGlzdGVuZXIsIGNhcHR1cmUpO1xuICAgICAgICAgICAgICAgIGhhbmRsZXJzLnNwbGljZShrLCAxKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmlnZ2VyKCkge1xuICAgICAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG5cbiAgICAgIGZvciAodmFyIF9sZW45ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuOSksIF9rZXk5ID0gMDsgX2tleTkgPCBfbGVuOTsgX2tleTkrKykge1xuICAgICAgICBhcmdzW19rZXk5XSA9IGFyZ3VtZW50c1tfa2V5OV07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGV2ZW50cyA9IGFyZ3NbMF0uc3BsaXQoJyAnKTtcbiAgICAgIGNvbnN0IGV2ZW50RGF0YSA9IGFyZ3NbMV07XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzW2ldO1xuXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgIGNvbnN0IGVsID0gdGhpc1tqXTtcblxuICAgICAgICAgIGlmICh3aW5kb3cuQ3VzdG9tRXZlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGV2dCA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoZXZlbnQsIHtcbiAgICAgICAgICAgICAgZGV0YWlsOiBldmVudERhdGEsXG4gICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWwuZG9tN0V2ZW50RGF0YSA9IGFyZ3MuZmlsdGVyKChkYXRhLCBkYXRhSW5kZXgpID0+IGRhdGFJbmRleCA+IDApO1xuICAgICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChldnQpO1xuICAgICAgICAgICAgZWwuZG9tN0V2ZW50RGF0YSA9IFtdO1xuICAgICAgICAgICAgZGVsZXRlIGVsLmRvbTdFdmVudERhdGE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zaXRpb25FbmQkMShjYWxsYmFjaykge1xuICAgICAgY29uc3QgZG9tID0gdGhpcztcblxuICAgICAgZnVuY3Rpb24gZmlyZUNhbGxCYWNrKGUpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSB0aGlzKSByZXR1cm47XG4gICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgZSk7XG4gICAgICAgIGRvbS5vZmYoJ3RyYW5zaXRpb25lbmQnLCBmaXJlQ2FsbEJhY2spO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgZG9tLm9uKCd0cmFuc2l0aW9uZW5kJywgZmlyZUNhbGxCYWNrKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb3V0ZXJXaWR0aChpbmNsdWRlTWFyZ2lucykge1xuICAgICAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAoaW5jbHVkZU1hcmdpbnMpIHtcbiAgICAgICAgICBjb25zdCBzdHlsZXMgPSB0aGlzLnN0eWxlcygpO1xuICAgICAgICAgIHJldHVybiB0aGlzWzBdLm9mZnNldFdpZHRoICsgcGFyc2VGbG9hdChzdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnbWFyZ2luLXJpZ2h0JykpICsgcGFyc2VGbG9hdChzdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnbWFyZ2luLWxlZnQnKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpc1swXS5vZmZzZXRXaWR0aDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb3V0ZXJIZWlnaHQoaW5jbHVkZU1hcmdpbnMpIHtcbiAgICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKGluY2x1ZGVNYXJnaW5zKSB7XG4gICAgICAgICAgY29uc3Qgc3R5bGVzID0gdGhpcy5zdHlsZXMoKTtcbiAgICAgICAgICByZXR1cm4gdGhpc1swXS5vZmZzZXRIZWlnaHQgKyBwYXJzZUZsb2F0KHN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCdtYXJnaW4tdG9wJykpICsgcGFyc2VGbG9hdChzdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnbWFyZ2luLWJvdHRvbScpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzWzBdLm9mZnNldEhlaWdodDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb2Zmc2V0KCkge1xuICAgICAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgICAgICAgY29uc3QgZG9jdW1lbnQgPSBnZXREb2N1bWVudCgpO1xuICAgICAgICBjb25zdCBlbCA9IHRoaXNbMF07XG4gICAgICAgIGNvbnN0IGJveCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICAgICAgY29uc3QgY2xpZW50VG9wID0gZWwuY2xpZW50VG9wIHx8IGJvZHkuY2xpZW50VG9wIHx8IDA7XG4gICAgICAgIGNvbnN0IGNsaWVudExlZnQgPSBlbC5jbGllbnRMZWZ0IHx8IGJvZHkuY2xpZW50TGVmdCB8fCAwO1xuICAgICAgICBjb25zdCBzY3JvbGxUb3AgPSBlbCA9PT0gd2luZG93ID8gd2luZG93LnNjcm9sbFkgOiBlbC5zY3JvbGxUb3A7XG4gICAgICAgIGNvbnN0IHNjcm9sbExlZnQgPSBlbCA9PT0gd2luZG93ID8gd2luZG93LnNjcm9sbFggOiBlbC5zY3JvbGxMZWZ0O1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRvcDogYm94LnRvcCArIHNjcm9sbFRvcCAtIGNsaWVudFRvcCxcbiAgICAgICAgICBsZWZ0OiBib3gubGVmdCArIHNjcm9sbExlZnQgLSBjbGllbnRMZWZ0XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0eWxlcygpIHtcbiAgICAgIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICAgICAgaWYgKHRoaXNbMF0pIHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzWzBdLCBudWxsKTtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjc3MocHJvcHMsIHZhbHVlKSB7XG4gICAgICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgICAgIGxldCBpO1xuXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBpZiAodHlwZW9mIHByb3BzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIC8vIC5jc3MoJ3dpZHRoJylcbiAgICAgICAgICBpZiAodGhpc1swXSkgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXNbMF0sIG51bGwpLmdldFByb3BlcnR5VmFsdWUocHJvcHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIC5jc3MoeyB3aWR0aDogJzEwMHB4JyB9KVxuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHByb3AgaW4gcHJvcHMpIHtcbiAgICAgICAgICAgICAgdGhpc1tpXS5zdHlsZVtwcm9wXSA9IHByb3BzW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIHR5cGVvZiBwcm9wcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgLy8gLmNzcygnd2lkdGgnLCAnMTAwcHgnKVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIHRoaXNbaV0uc3R5bGVbcHJvcHNdID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZWFjaChjYWxsYmFjaykge1xuICAgICAgaWYgKCFjYWxsYmFjaykgcmV0dXJuIHRoaXM7XG4gICAgICB0aGlzLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xuICAgICAgICBjYWxsYmFjay5hcHBseShlbCwgW2VsLCBpbmRleF0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaWx0ZXIoY2FsbGJhY2spIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGFycmF5RmlsdGVyKHRoaXMsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiAkKHJlc3VsdCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaHRtbChodG1sKSB7XG4gICAgICBpZiAodHlwZW9mIGh0bWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB0aGlzWzBdID8gdGhpc1swXS5pbm5lckhUTUwgOiBudWxsO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdGhpc1tpXS5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0ZXh0KHRleHQpIHtcbiAgICAgIGlmICh0eXBlb2YgdGV4dCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbMF0gPyB0aGlzWzBdLnRleHRDb250ZW50LnRyaW0oKSA6IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICB0aGlzW2ldLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXMoc2VsZWN0b3IpIHtcbiAgICAgIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICAgICAgY29uc3QgZG9jdW1lbnQgPSBnZXREb2N1bWVudCgpO1xuICAgICAgY29uc3QgZWwgPSB0aGlzWzBdO1xuICAgICAgbGV0IGNvbXBhcmVXaXRoO1xuICAgICAgbGV0IGk7XG4gICAgICBpZiAoIWVsIHx8IHR5cGVvZiBzZWxlY3RvciA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBmYWxzZTtcblxuICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKGVsLm1hdGNoZXMpIHJldHVybiBlbC5tYXRjaGVzKHNlbGVjdG9yKTtcbiAgICAgICAgaWYgKGVsLndlYmtpdE1hdGNoZXNTZWxlY3RvcikgcmV0dXJuIGVsLndlYmtpdE1hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIGlmIChlbC5tc01hdGNoZXNTZWxlY3RvcikgcmV0dXJuIGVsLm1zTWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgY29tcGFyZVdpdGggPSAkKHNlbGVjdG9yKTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY29tcGFyZVdpdGgubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBpZiAoY29tcGFyZVdpdGhbaV0gPT09IGVsKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNlbGVjdG9yID09PSBkb2N1bWVudCkge1xuICAgICAgICByZXR1cm4gZWwgPT09IGRvY3VtZW50O1xuICAgICAgfVxuXG4gICAgICBpZiAoc2VsZWN0b3IgPT09IHdpbmRvdykge1xuICAgICAgICByZXR1cm4gZWwgPT09IHdpbmRvdztcbiAgICAgIH1cblxuICAgICAgaWYgKHNlbGVjdG9yLm5vZGVUeXBlIHx8IHNlbGVjdG9yIGluc3RhbmNlb2YgRG9tNykge1xuICAgICAgICBjb21wYXJlV2l0aCA9IHNlbGVjdG9yLm5vZGVUeXBlID8gW3NlbGVjdG9yXSA6IHNlbGVjdG9yO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb21wYXJlV2l0aC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGlmIChjb21wYXJlV2l0aFtpXSA9PT0gZWwpIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5kZXgoKSB7XG4gICAgICBsZXQgY2hpbGQgPSB0aGlzWzBdO1xuICAgICAgbGV0IGk7XG5cbiAgICAgIGlmIChjaGlsZCkge1xuICAgICAgICBpID0gMDsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG5cbiAgICAgICAgd2hpbGUgKChjaGlsZCA9IGNoaWxkLnByZXZpb3VzU2libGluZykgIT09IG51bGwpIHtcbiAgICAgICAgICBpZiAoY2hpbGQubm9kZVR5cGUgPT09IDEpIGkgKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVxKGluZGV4KSB7XG4gICAgICBpZiAodHlwZW9mIGluZGV4ID09PSAndW5kZWZpbmVkJykgcmV0dXJuIHRoaXM7XG4gICAgICBjb25zdCBsZW5ndGggPSB0aGlzLmxlbmd0aDtcblxuICAgICAgaWYgKGluZGV4ID4gbGVuZ3RoIC0gMSkge1xuICAgICAgICByZXR1cm4gJChbXSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgY29uc3QgcmV0dXJuSW5kZXggPSBsZW5ndGggKyBpbmRleDtcbiAgICAgICAgaWYgKHJldHVybkluZGV4IDwgMCkgcmV0dXJuICQoW10pO1xuICAgICAgICByZXR1cm4gJChbdGhpc1tyZXR1cm5JbmRleF1dKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICQoW3RoaXNbaW5kZXhdXSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwZW5kKCkge1xuICAgICAgbGV0IG5ld0NoaWxkO1xuICAgICAgY29uc3QgZG9jdW1lbnQgPSBnZXREb2N1bWVudCgpO1xuXG4gICAgICBmb3IgKGxldCBrID0gMDsgayA8IGFyZ3VtZW50cy5sZW5ndGg7IGsgKz0gMSkge1xuICAgICAgICBuZXdDaGlsZCA9IGsgPCAwIHx8IGFyZ3VtZW50cy5sZW5ndGggPD0gayA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1trXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIG5ld0NoaWxkID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uc3QgdGVtcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGVtcERpdi5pbm5lckhUTUwgPSBuZXdDaGlsZDtcblxuICAgICAgICAgICAgd2hpbGUgKHRlbXBEaXYuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICB0aGlzW2ldLmFwcGVuZENoaWxkKHRlbXBEaXYuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChuZXdDaGlsZCBpbnN0YW5jZW9mIERvbTcpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbmV3Q2hpbGQubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICAgICAgdGhpc1tpXS5hcHBlbmRDaGlsZChuZXdDaGlsZFtqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXNbaV0uYXBwZW5kQ2hpbGQobmV3Q2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmVwZW5kKG5ld0NoaWxkKSB7XG4gICAgICBjb25zdCBkb2N1bWVudCA9IGdldERvY3VtZW50KCk7XG4gICAgICBsZXQgaTtcbiAgICAgIGxldCBqO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAodHlwZW9mIG5ld0NoaWxkID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnN0IHRlbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICB0ZW1wRGl2LmlubmVySFRNTCA9IG5ld0NoaWxkO1xuXG4gICAgICAgICAgZm9yIChqID0gdGVtcERpdi5jaGlsZE5vZGVzLmxlbmd0aCAtIDE7IGogPj0gMDsgaiAtPSAxKSB7XG4gICAgICAgICAgICB0aGlzW2ldLmluc2VydEJlZm9yZSh0ZW1wRGl2LmNoaWxkTm9kZXNbal0sIHRoaXNbaV0uY2hpbGROb2Rlc1swXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG5ld0NoaWxkIGluc3RhbmNlb2YgRG9tNykge1xuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBuZXdDaGlsZC5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgICAgdGhpc1tpXS5pbnNlcnRCZWZvcmUobmV3Q2hpbGRbal0sIHRoaXNbaV0uY2hpbGROb2Rlc1swXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXNbaV0uaW5zZXJ0QmVmb3JlKG5ld0NoaWxkLCB0aGlzW2ldLmNoaWxkTm9kZXNbMF0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5leHQoc2VsZWN0b3IpIHtcbiAgICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgaWYgKHRoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nICYmICQodGhpc1swXS5uZXh0RWxlbWVudFNpYmxpbmcpLmlzKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgcmV0dXJuICQoW3RoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nXSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuICQoW10pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nKSByZXR1cm4gJChbdGhpc1swXS5uZXh0RWxlbWVudFNpYmxpbmddKTtcbiAgICAgICAgcmV0dXJuICQoW10pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJChbXSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbmV4dEFsbChzZWxlY3Rvcikge1xuICAgICAgY29uc3QgbmV4dEVscyA9IFtdO1xuICAgICAgbGV0IGVsID0gdGhpc1swXTtcbiAgICAgIGlmICghZWwpIHJldHVybiAkKFtdKTtcblxuICAgICAgd2hpbGUgKGVsLm5leHRFbGVtZW50U2libGluZykge1xuICAgICAgICBjb25zdCBuZXh0ID0gZWwubmV4dEVsZW1lbnRTaWJsaW5nOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgaWYgKCQobmV4dCkuaXMoc2VsZWN0b3IpKSBuZXh0RWxzLnB1c2gobmV4dCk7XG4gICAgICAgIH0gZWxzZSBuZXh0RWxzLnB1c2gobmV4dCk7XG5cbiAgICAgICAgZWwgPSBuZXh0O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJChuZXh0RWxzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmV2KHNlbGVjdG9yKSB7XG4gICAgICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGVsID0gdGhpc1swXTtcblxuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICBpZiAoZWwucHJldmlvdXNFbGVtZW50U2libGluZyAmJiAkKGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpLmlzKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgcmV0dXJuICQoW2VsLnByZXZpb3VzRWxlbWVudFNpYmxpbmddKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gJChbXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWwucHJldmlvdXNFbGVtZW50U2libGluZykgcmV0dXJuICQoW2VsLnByZXZpb3VzRWxlbWVudFNpYmxpbmddKTtcbiAgICAgICAgcmV0dXJuICQoW10pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJChbXSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJldkFsbChzZWxlY3Rvcikge1xuICAgICAgY29uc3QgcHJldkVscyA9IFtdO1xuICAgICAgbGV0IGVsID0gdGhpc1swXTtcbiAgICAgIGlmICghZWwpIHJldHVybiAkKFtdKTtcblxuICAgICAgd2hpbGUgKGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHtcbiAgICAgICAgY29uc3QgcHJldiA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICBpZiAoJChwcmV2KS5pcyhzZWxlY3RvcikpIHByZXZFbHMucHVzaChwcmV2KTtcbiAgICAgICAgfSBlbHNlIHByZXZFbHMucHVzaChwcmV2KTtcblxuICAgICAgICBlbCA9IHByZXY7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAkKHByZXZFbHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcmVudChzZWxlY3Rvcikge1xuICAgICAgY29uc3QgcGFyZW50cyA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAodGhpc1tpXS5wYXJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzW2ldLnBhcmVudE5vZGUpLmlzKHNlbGVjdG9yKSkgcGFyZW50cy5wdXNoKHRoaXNbaV0ucGFyZW50Tm9kZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcmVudHMucHVzaCh0aGlzW2ldLnBhcmVudE5vZGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gJChwYXJlbnRzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJlbnRzKHNlbGVjdG9yKSB7XG4gICAgICBjb25zdCBwYXJlbnRzID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGxldCBwYXJlbnQgPSB0aGlzW2ldLnBhcmVudE5vZGU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgICAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICBpZiAoJChwYXJlbnQpLmlzKHNlbGVjdG9yKSkgcGFyZW50cy5wdXNoKHBhcmVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcmVudHMucHVzaChwYXJlbnQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAkKHBhcmVudHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3Nlc3Qoc2VsZWN0b3IpIHtcbiAgICAgIGxldCBjbG9zZXN0ID0gdGhpczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gJChbXSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghY2xvc2VzdC5pcyhzZWxlY3RvcikpIHtcbiAgICAgICAgY2xvc2VzdCA9IGNsb3Nlc3QucGFyZW50cyhzZWxlY3RvcikuZXEoMCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjbG9zZXN0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmQoc2VsZWN0b3IpIHtcbiAgICAgIGNvbnN0IGZvdW5kRWxlbWVudHMgPSBbXTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IGZvdW5kID0gdGhpc1tpXS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGZvdW5kLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgZm91bmRFbGVtZW50cy5wdXNoKGZvdW5kW2pdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gJChmb3VuZEVsZW1lbnRzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGlsZHJlbihzZWxlY3Rvcikge1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgY2hpbGROb2RlcyA9IHRoaXNbaV0uY2hpbGRyZW47XG5cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjaGlsZE5vZGVzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgaWYgKCFzZWxlY3RvciB8fCAkKGNoaWxkTm9kZXNbal0pLmlzKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZE5vZGVzW2pdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuICQoY2hpbGRyZW4pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAodGhpc1tpXS5wYXJlbnROb2RlKSB0aGlzW2ldLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpc1tpXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNvbnN0IE1ldGhvZHMgPSB7XG4gICAgICBhZGRDbGFzcyxcbiAgICAgIHJlbW92ZUNsYXNzLFxuICAgICAgaGFzQ2xhc3MsXG4gICAgICB0b2dnbGVDbGFzcyxcbiAgICAgIGF0dHIsXG4gICAgICByZW1vdmVBdHRyLFxuICAgICAgdHJhbnNmb3JtLFxuICAgICAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbiQxLFxuICAgICAgb24sXG4gICAgICBvZmYsXG4gICAgICB0cmlnZ2VyLFxuICAgICAgdHJhbnNpdGlvbkVuZDogdHJhbnNpdGlvbkVuZCQxLFxuICAgICAgb3V0ZXJXaWR0aCxcbiAgICAgIG91dGVySGVpZ2h0LFxuICAgICAgc3R5bGVzLFxuICAgICAgb2Zmc2V0LFxuICAgICAgY3NzLFxuICAgICAgZWFjaCxcbiAgICAgIGh0bWwsXG4gICAgICB0ZXh0LFxuICAgICAgaXMsXG4gICAgICBpbmRleCxcbiAgICAgIGVxLFxuICAgICAgYXBwZW5kLFxuICAgICAgcHJlcGVuZCxcbiAgICAgIG5leHQsXG4gICAgICBuZXh0QWxsLFxuICAgICAgcHJldixcbiAgICAgIHByZXZBbGwsXG4gICAgICBwYXJlbnQsXG4gICAgICBwYXJlbnRzLFxuICAgICAgY2xvc2VzdCxcbiAgICAgIGZpbmQsXG4gICAgICBjaGlsZHJlbixcbiAgICAgIGZpbHRlcixcbiAgICAgIHJlbW92ZVxuICAgIH07XG4gICAgT2JqZWN0LmtleXMoTWV0aG9kcykuZm9yRWFjaChtZXRob2ROYW1lID0+IHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSgkLmZuLCBtZXRob2ROYW1lLCB7XG4gICAgICAgIHZhbHVlOiBNZXRob2RzW21ldGhvZE5hbWVdLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBkZWxldGVQcm9wcyhvYmopIHtcbiAgICAgIGNvbnN0IG9iamVjdCA9IG9iajtcbiAgICAgIE9iamVjdC5rZXlzKG9iamVjdCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIG9iamVjdFtrZXldID0gbnVsbDtcbiAgICAgICAgfSBjYXRjaCAoZSkgey8vIG5vIGdldHRlciBmb3Igb2JqZWN0XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGRlbGV0ZSBvYmplY3Rba2V5XTtcbiAgICAgICAgfSBjYXRjaCAoZSkgey8vIHNvbWV0aGluZyBnb3Qgd3JvbmdcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbmV4dFRpY2soY2FsbGJhY2ssIGRlbGF5KSB7XG4gICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkge1xuICAgICAgICBkZWxheSA9IDA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZXRUaW1lb3V0KGNhbGxiYWNrLCBkZWxheSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbm93KCkge1xuICAgICAgcmV0dXJuIERhdGUubm93KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q29tcHV0ZWRTdHlsZSQxKGVsKSB7XG4gICAgICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgICAgIGxldCBzdHlsZTtcblxuICAgICAgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XG4gICAgICAgIHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXN0eWxlICYmIGVsLmN1cnJlbnRTdHlsZSkge1xuICAgICAgICBzdHlsZSA9IGVsLmN1cnJlbnRTdHlsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFzdHlsZSkge1xuICAgICAgICBzdHlsZSA9IGVsLnN0eWxlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3R5bGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VHJhbnNsYXRlKGVsLCBheGlzKSB7XG4gICAgICBpZiAoYXhpcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGF4aXMgPSAneCc7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICAgICAgbGV0IG1hdHJpeDtcbiAgICAgIGxldCBjdXJUcmFuc2Zvcm07XG4gICAgICBsZXQgdHJhbnNmb3JtTWF0cml4O1xuICAgICAgY29uc3QgY3VyU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlJDEoZWwpO1xuXG4gICAgICBpZiAod2luZG93LldlYktpdENTU01hdHJpeCkge1xuICAgICAgICBjdXJUcmFuc2Zvcm0gPSBjdXJTdHlsZS50cmFuc2Zvcm0gfHwgY3VyU3R5bGUud2Via2l0VHJhbnNmb3JtO1xuXG4gICAgICAgIGlmIChjdXJUcmFuc2Zvcm0uc3BsaXQoJywnKS5sZW5ndGggPiA2KSB7XG4gICAgICAgICAgY3VyVHJhbnNmb3JtID0gY3VyVHJhbnNmb3JtLnNwbGl0KCcsICcpLm1hcChhID0+IGEucmVwbGFjZSgnLCcsICcuJykpLmpvaW4oJywgJyk7XG4gICAgICAgIH0gLy8gU29tZSBvbGQgdmVyc2lvbnMgb2YgV2Via2l0IGNob2tlIHdoZW4gJ25vbmUnIGlzIHBhc3NlZDsgcGFzc1xuICAgICAgICAvLyBlbXB0eSBzdHJpbmcgaW5zdGVhZCBpbiB0aGlzIGNhc2VcblxuXG4gICAgICAgIHRyYW5zZm9ybU1hdHJpeCA9IG5ldyB3aW5kb3cuV2ViS2l0Q1NTTWF0cml4KGN1clRyYW5zZm9ybSA9PT0gJ25vbmUnID8gJycgOiBjdXJUcmFuc2Zvcm0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJhbnNmb3JtTWF0cml4ID0gY3VyU3R5bGUuTW96VHJhbnNmb3JtIHx8IGN1clN0eWxlLk9UcmFuc2Zvcm0gfHwgY3VyU3R5bGUuTXNUcmFuc2Zvcm0gfHwgY3VyU3R5bGUubXNUcmFuc2Zvcm0gfHwgY3VyU3R5bGUudHJhbnNmb3JtIHx8IGN1clN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3RyYW5zZm9ybScpLnJlcGxhY2UoJ3RyYW5zbGF0ZSgnLCAnbWF0cml4KDEsIDAsIDAsIDEsJyk7XG4gICAgICAgIG1hdHJpeCA9IHRyYW5zZm9ybU1hdHJpeC50b1N0cmluZygpLnNwbGl0KCcsJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChheGlzID09PSAneCcpIHtcbiAgICAgICAgLy8gTGF0ZXN0IENocm9tZSBhbmQgd2Via2l0cyBGaXhcbiAgICAgICAgaWYgKHdpbmRvdy5XZWJLaXRDU1NNYXRyaXgpIGN1clRyYW5zZm9ybSA9IHRyYW5zZm9ybU1hdHJpeC5tNDE7IC8vIENyYXp5IElFMTAgTWF0cml4XG4gICAgICAgIGVsc2UgaWYgKG1hdHJpeC5sZW5ndGggPT09IDE2KSBjdXJUcmFuc2Zvcm0gPSBwYXJzZUZsb2F0KG1hdHJpeFsxMl0pOyAvLyBOb3JtYWwgQnJvd3NlcnNcbiAgICAgICAgZWxzZSBjdXJUcmFuc2Zvcm0gPSBwYXJzZUZsb2F0KG1hdHJpeFs0XSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChheGlzID09PSAneScpIHtcbiAgICAgICAgLy8gTGF0ZXN0IENocm9tZSBhbmQgd2Via2l0cyBGaXhcbiAgICAgICAgaWYgKHdpbmRvdy5XZWJLaXRDU1NNYXRyaXgpIGN1clRyYW5zZm9ybSA9IHRyYW5zZm9ybU1hdHJpeC5tNDI7IC8vIENyYXp5IElFMTAgTWF0cml4XG4gICAgICAgIGVsc2UgaWYgKG1hdHJpeC5sZW5ndGggPT09IDE2KSBjdXJUcmFuc2Zvcm0gPSBwYXJzZUZsb2F0KG1hdHJpeFsxM10pOyAvLyBOb3JtYWwgQnJvd3NlcnNcbiAgICAgICAgZWxzZSBjdXJUcmFuc2Zvcm0gPSBwYXJzZUZsb2F0KG1hdHJpeFs1XSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjdXJUcmFuc2Zvcm0gfHwgMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc09iamVjdChvKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIG8gIT09IG51bGwgJiYgby5jb25zdHJ1Y3RvciAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpID09PSAnT2JqZWN0JztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc05vZGUobm9kZSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5IVE1MRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5vZGUgJiYgKG5vZGUubm9kZVR5cGUgPT09IDEgfHwgbm9kZS5ub2RlVHlwZSA9PT0gMTEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dGVuZCgpIHtcbiAgICAgIGNvbnN0IHRvID0gT2JqZWN0KGFyZ3VtZW50cy5sZW5ndGggPD0gMCA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1swXSk7XG4gICAgICBjb25zdCBub0V4dGVuZCA9IFsnX19wcm90b19fJywgJ2NvbnN0cnVjdG9yJywgJ3Byb3RvdHlwZSddO1xuXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBuZXh0U291cmNlID0gaSA8IDAgfHwgYXJndW1lbnRzLmxlbmd0aCA8PSBpID8gdW5kZWZpbmVkIDogYXJndW1lbnRzW2ldO1xuXG4gICAgICAgIGlmIChuZXh0U291cmNlICE9PSB1bmRlZmluZWQgJiYgbmV4dFNvdXJjZSAhPT0gbnVsbCAmJiAhaXNOb2RlKG5leHRTb3VyY2UpKSB7XG4gICAgICAgICAgY29uc3Qga2V5c0FycmF5ID0gT2JqZWN0LmtleXMoT2JqZWN0KG5leHRTb3VyY2UpKS5maWx0ZXIoa2V5ID0+IG5vRXh0ZW5kLmluZGV4T2Yoa2V5KSA8IDApO1xuXG4gICAgICAgICAgZm9yIChsZXQgbmV4dEluZGV4ID0gMCwgbGVuID0ga2V5c0FycmF5Lmxlbmd0aDsgbmV4dEluZGV4IDwgbGVuOyBuZXh0SW5kZXggKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgbmV4dEtleSA9IGtleXNBcnJheVtuZXh0SW5kZXhdO1xuICAgICAgICAgICAgY29uc3QgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobmV4dFNvdXJjZSwgbmV4dEtleSk7XG5cbiAgICAgICAgICAgIGlmIChkZXNjICE9PSB1bmRlZmluZWQgJiYgZGVzYy5lbnVtZXJhYmxlKSB7XG4gICAgICAgICAgICAgIGlmIChpc09iamVjdCh0b1tuZXh0S2V5XSkgJiYgaXNPYmplY3QobmV4dFNvdXJjZVtuZXh0S2V5XSkpIHtcbiAgICAgICAgICAgICAgICBpZiAobmV4dFNvdXJjZVtuZXh0S2V5XS5fX3N3aXBlcl9fKSB7XG4gICAgICAgICAgICAgICAgICB0b1tuZXh0S2V5XSA9IG5leHRTb3VyY2VbbmV4dEtleV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGV4dGVuZCh0b1tuZXh0S2V5XSwgbmV4dFNvdXJjZVtuZXh0S2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFpc09iamVjdCh0b1tuZXh0S2V5XSkgJiYgaXNPYmplY3QobmV4dFNvdXJjZVtuZXh0S2V5XSkpIHtcbiAgICAgICAgICAgICAgICB0b1tuZXh0S2V5XSA9IHt9O1xuXG4gICAgICAgICAgICAgICAgaWYgKG5leHRTb3VyY2VbbmV4dEtleV0uX19zd2lwZXJfXykge1xuICAgICAgICAgICAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBleHRlbmQodG9bbmV4dEtleV0sIG5leHRTb3VyY2VbbmV4dEtleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b1tuZXh0S2V5XSA9IG5leHRTb3VyY2VbbmV4dEtleV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRvO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldENTU1Byb3BlcnR5KGVsLCB2YXJOYW1lLCB2YXJWYWx1ZSkge1xuICAgICAgZWwuc3R5bGUuc2V0UHJvcGVydHkodmFyTmFtZSwgdmFyVmFsdWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFuaW1hdGVDU1NNb2RlU2Nyb2xsKF9yZWYpIHtcbiAgICAgIGxldCB7XG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgdGFyZ2V0UG9zaXRpb24sXG4gICAgICAgIHNpZGVcbiAgICAgIH0gPSBfcmVmO1xuICAgICAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG4gICAgICBjb25zdCBzdGFydFBvc2l0aW9uID0gLXN3aXBlci50cmFuc2xhdGU7XG4gICAgICBsZXQgc3RhcnRUaW1lID0gbnVsbDtcbiAgICAgIGxldCB0aW1lO1xuICAgICAgY29uc3QgZHVyYXRpb24gPSBzd2lwZXIucGFyYW1zLnNwZWVkO1xuICAgICAgc3dpcGVyLndyYXBwZXJFbC5zdHlsZS5zY3JvbGxTbmFwVHlwZSA9ICdub25lJztcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShzd2lwZXIuY3NzTW9kZUZyYW1lSUQpO1xuICAgICAgY29uc3QgZGlyID0gdGFyZ2V0UG9zaXRpb24gPiBzdGFydFBvc2l0aW9uID8gJ25leHQnIDogJ3ByZXYnO1xuXG4gICAgICBjb25zdCBpc091dE9mQm91bmQgPSAoY3VycmVudCwgdGFyZ2V0KSA9PiB7XG4gICAgICAgIHJldHVybiBkaXIgPT09ICduZXh0JyAmJiBjdXJyZW50ID49IHRhcmdldCB8fCBkaXIgPT09ICdwcmV2JyAmJiBjdXJyZW50IDw9IHRhcmdldDtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGFuaW1hdGUgPSAoKSA9PiB7XG4gICAgICAgIHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgICBpZiAoc3RhcnRUaW1lID09PSBudWxsKSB7XG4gICAgICAgICAgc3RhcnRUaW1lID0gdGltZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb2dyZXNzID0gTWF0aC5tYXgoTWF0aC5taW4oKHRpbWUgLSBzdGFydFRpbWUpIC8gZHVyYXRpb24sIDEpLCAwKTtcbiAgICAgICAgY29uc3QgZWFzZVByb2dyZXNzID0gMC41IC0gTWF0aC5jb3MocHJvZ3Jlc3MgKiBNYXRoLlBJKSAvIDI7XG4gICAgICAgIGxldCBjdXJyZW50UG9zaXRpb24gPSBzdGFydFBvc2l0aW9uICsgZWFzZVByb2dyZXNzICogKHRhcmdldFBvc2l0aW9uIC0gc3RhcnRQb3NpdGlvbik7XG5cbiAgICAgICAgaWYgKGlzT3V0T2ZCb3VuZChjdXJyZW50UG9zaXRpb24sIHRhcmdldFBvc2l0aW9uKSkge1xuICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbiA9IHRhcmdldFBvc2l0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpcGVyLndyYXBwZXJFbC5zY3JvbGxUbyh7XG4gICAgICAgICAgW3NpZGVdOiBjdXJyZW50UG9zaXRpb25cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGlzT3V0T2ZCb3VuZChjdXJyZW50UG9zaXRpb24sIHRhcmdldFBvc2l0aW9uKSkge1xuICAgICAgICAgIHN3aXBlci53cmFwcGVyRWwuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgICAgICBzd2lwZXIud3JhcHBlckVsLnN0eWxlLnNjcm9sbFNuYXBUeXBlID0gJyc7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBzd2lwZXIud3JhcHBlckVsLnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgICAgICBzd2lwZXIud3JhcHBlckVsLnNjcm9sbFRvKHtcbiAgICAgICAgICAgICAgW3NpZGVdOiBjdXJyZW50UG9zaXRpb25cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShzd2lwZXIuY3NzTW9kZUZyYW1lSUQpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXBlci5jc3NNb2RlRnJhbWVJRCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG4gICAgICB9O1xuXG4gICAgICBhbmltYXRlKCk7XG4gICAgfVxuXG4gICAgbGV0IHN1cHBvcnQ7XG5cbiAgICBmdW5jdGlvbiBjYWxjU3VwcG9ydCgpIHtcbiAgICAgIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICAgICAgY29uc3QgZG9jdW1lbnQgPSBnZXREb2N1bWVudCgpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc21vb3RoU2Nyb2xsOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgJ3Njcm9sbEJlaGF2aW9yJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUsXG4gICAgICAgIHRvdWNoOiAhISgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgfHwgd2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiB3aW5kb3cuRG9jdW1lbnRUb3VjaCksXG4gICAgICAgIHBhc3NpdmVMaXN0ZW5lcjogZnVuY3Rpb24gY2hlY2tQYXNzaXZlTGlzdGVuZXIoKSB7XG4gICAgICAgICAgbGV0IHN1cHBvcnRzUGFzc2l2ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG9wdHMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdwYXNzaXZlJywge1xuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHN1cHBvcnRzUGFzc2l2ZSA9IHRydWU7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndGVzdFBhc3NpdmVMaXN0ZW5lcicsIG51bGwsIG9wdHMpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHsvLyBObyBzdXBwb3J0XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHN1cHBvcnRzUGFzc2l2ZTtcbiAgICAgICAgfSgpLFxuICAgICAgICBnZXN0dXJlczogZnVuY3Rpb24gY2hlY2tHZXN0dXJlcygpIHtcbiAgICAgICAgICByZXR1cm4gJ29uZ2VzdHVyZXN0YXJ0JyBpbiB3aW5kb3c7XG4gICAgICAgIH0oKVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTdXBwb3J0KCkge1xuICAgICAgaWYgKCFzdXBwb3J0KSB7XG4gICAgICAgIHN1cHBvcnQgPSBjYWxjU3VwcG9ydCgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3VwcG9ydDtcbiAgICB9XG5cbiAgICBsZXQgZGV2aWNlQ2FjaGVkO1xuXG4gICAgZnVuY3Rpb24gY2FsY0RldmljZShfdGVtcCkge1xuICAgICAgbGV0IHtcbiAgICAgICAgdXNlckFnZW50XG4gICAgICB9ID0gX3RlbXAgPT09IHZvaWQgMCA/IHt9IDogX3RlbXA7XG4gICAgICBjb25zdCBzdXBwb3J0ID0gZ2V0U3VwcG9ydCgpO1xuICAgICAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG4gICAgICBjb25zdCBwbGF0Zm9ybSA9IHdpbmRvdy5uYXZpZ2F0b3IucGxhdGZvcm07XG4gICAgICBjb25zdCB1YSA9IHVzZXJBZ2VudCB8fCB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICAgIGNvbnN0IGRldmljZSA9IHtcbiAgICAgICAgaW9zOiBmYWxzZSxcbiAgICAgICAgYW5kcm9pZDogZmFsc2VcbiAgICAgIH07XG4gICAgICBjb25zdCBzY3JlZW5XaWR0aCA9IHdpbmRvdy5zY3JlZW4ud2lkdGg7XG4gICAgICBjb25zdCBzY3JlZW5IZWlnaHQgPSB3aW5kb3cuc2NyZWVuLmhlaWdodDtcbiAgICAgIGNvbnN0IGFuZHJvaWQgPSB1YS5tYXRjaCgvKEFuZHJvaWQpOz9bXFxzXFwvXSsoW1xcZC5dKyk/Lyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgICAgbGV0IGlwYWQgPSB1YS5tYXRjaCgvKGlQYWQpLipPU1xccyhbXFxkX10rKS8pO1xuICAgICAgY29uc3QgaXBvZCA9IHVhLm1hdGNoKC8oaVBvZCkoLipPU1xccyhbXFxkX10rKSk/Lyk7XG4gICAgICBjb25zdCBpcGhvbmUgPSAhaXBhZCAmJiB1YS5tYXRjaCgvKGlQaG9uZVxcc09TfGlPUylcXHMoW1xcZF9dKykvKTtcbiAgICAgIGNvbnN0IHdpbmRvd3MgPSBwbGF0Zm9ybSA9PT0gJ1dpbjMyJztcbiAgICAgIGxldCBtYWNvcyA9IHBsYXRmb3JtID09PSAnTWFjSW50ZWwnOyAvLyBpUGFkT3MgMTMgZml4XG5cbiAgICAgIGNvbnN0IGlQYWRTY3JlZW5zID0gWycxMDI0eDEzNjYnLCAnMTM2NngxMDI0JywgJzgzNHgxMTk0JywgJzExOTR4ODM0JywgJzgzNHgxMTEyJywgJzExMTJ4ODM0JywgJzc2OHgxMDI0JywgJzEwMjR4NzY4JywgJzgyMHgxMTgwJywgJzExODB4ODIwJywgJzgxMHgxMDgwJywgJzEwODB4ODEwJ107XG5cbiAgICAgIGlmICghaXBhZCAmJiBtYWNvcyAmJiBzdXBwb3J0LnRvdWNoICYmIGlQYWRTY3JlZW5zLmluZGV4T2YoYCR7c2NyZWVuV2lkdGh9eCR7c2NyZWVuSGVpZ2h0fWApID49IDApIHtcbiAgICAgICAgaXBhZCA9IHVhLm1hdGNoKC8oVmVyc2lvbilcXC8oW1xcZC5dKykvKTtcbiAgICAgICAgaWYgKCFpcGFkKSBpcGFkID0gWzAsIDEsICcxM18wXzAnXTtcbiAgICAgICAgbWFjb3MgPSBmYWxzZTtcbiAgICAgIH0gLy8gQW5kcm9pZFxuXG5cbiAgICAgIGlmIChhbmRyb2lkICYmICF3aW5kb3dzKSB7XG4gICAgICAgIGRldmljZS5vcyA9ICdhbmRyb2lkJztcbiAgICAgICAgZGV2aWNlLmFuZHJvaWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXBhZCB8fCBpcGhvbmUgfHwgaXBvZCkge1xuICAgICAgICBkZXZpY2Uub3MgPSAnaW9zJztcbiAgICAgICAgZGV2aWNlLmlvcyA9IHRydWU7XG4gICAgICB9IC8vIEV4cG9ydCBvYmplY3RcblxuXG4gICAgICByZXR1cm4gZGV2aWNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERldmljZShvdmVycmlkZXMpIHtcbiAgICAgIGlmIChvdmVycmlkZXMgPT09IHZvaWQgMCkge1xuICAgICAgICBvdmVycmlkZXMgPSB7fTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkZXZpY2VDYWNoZWQpIHtcbiAgICAgICAgZGV2aWNlQ2FjaGVkID0gY2FsY0RldmljZShvdmVycmlkZXMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGV2aWNlQ2FjaGVkO1xuICAgIH1cblxuICAgIGxldCBicm93c2VyO1xuXG4gICAgZnVuY3Rpb24gY2FsY0Jyb3dzZXIoKSB7XG4gICAgICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcblxuICAgICAgZnVuY3Rpb24gaXNTYWZhcmkoKSB7XG4gICAgICAgIGNvbnN0IHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIHVhLmluZGV4T2YoJ3NhZmFyaScpID49IDAgJiYgdWEuaW5kZXhPZignY2hyb21lJykgPCAwICYmIHVhLmluZGV4T2YoJ2FuZHJvaWQnKSA8IDA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzU2FmYXJpOiBpc1NhZmFyaSgpLFxuICAgICAgICBpc1dlYlZpZXc6IC8oaVBob25lfGlQb2R8aVBhZCkuKkFwcGxlV2ViS2l0KD8hLipTYWZhcmkpL2kudGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QnJvd3NlcigpIHtcbiAgICAgIGlmICghYnJvd3Nlcikge1xuICAgICAgICBicm93c2VyID0gY2FsY0Jyb3dzZXIoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJyb3dzZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gUmVzaXplKF9yZWYpIHtcbiAgICAgIGxldCB7XG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgb24sXG4gICAgICAgIGVtaXRcbiAgICAgIH0gPSBfcmVmO1xuICAgICAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG4gICAgICBsZXQgb2JzZXJ2ZXIgPSBudWxsO1xuICAgICAgbGV0IGFuaW1hdGlvbkZyYW1lID0gbnVsbDtcblxuICAgICAgY29uc3QgcmVzaXplSGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCB8fCAhc3dpcGVyLmluaXRpYWxpemVkKSByZXR1cm47XG4gICAgICAgIGVtaXQoJ2JlZm9yZVJlc2l6ZScpO1xuICAgICAgICBlbWl0KCdyZXNpemUnKTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGNyZWF0ZU9ic2VydmVyID0gKCkgPT4ge1xuICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIuaW5pdGlhbGl6ZWQpIHJldHVybjtcbiAgICAgICAgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoZW50cmllcyA9PiB7XG4gICAgICAgICAgYW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICAgIGhlaWdodFxuICAgICAgICAgICAgfSA9IHN3aXBlcjtcbiAgICAgICAgICAgIGxldCBuZXdXaWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgbGV0IG5ld0hlaWdodCA9IGhlaWdodDtcbiAgICAgICAgICAgIGVudHJpZXMuZm9yRWFjaChfcmVmMiA9PiB7XG4gICAgICAgICAgICAgIGxldCB7XG4gICAgICAgICAgICAgICAgY29udGVudEJveFNpemUsXG4gICAgICAgICAgICAgICAgY29udGVudFJlY3QsXG4gICAgICAgICAgICAgICAgdGFyZ2V0XG4gICAgICAgICAgICAgIH0gPSBfcmVmMjtcbiAgICAgICAgICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQgIT09IHN3aXBlci5lbCkgcmV0dXJuO1xuICAgICAgICAgICAgICBuZXdXaWR0aCA9IGNvbnRlbnRSZWN0ID8gY29udGVudFJlY3Qud2lkdGggOiAoY29udGVudEJveFNpemVbMF0gfHwgY29udGVudEJveFNpemUpLmlubGluZVNpemU7XG4gICAgICAgICAgICAgIG5ld0hlaWdodCA9IGNvbnRlbnRSZWN0ID8gY29udGVudFJlY3QuaGVpZ2h0IDogKGNvbnRlbnRCb3hTaXplWzBdIHx8IGNvbnRlbnRCb3hTaXplKS5ibG9ja1NpemU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKG5ld1dpZHRoICE9PSB3aWR0aCB8fCBuZXdIZWlnaHQgIT09IGhlaWdodCkge1xuICAgICAgICAgICAgICByZXNpemVIYW5kbGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHN3aXBlci5lbCk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCByZW1vdmVPYnNlcnZlciA9ICgpID0+IHtcbiAgICAgICAgaWYgKGFuaW1hdGlvbkZyYW1lKSB7XG4gICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbkZyYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvYnNlcnZlciAmJiBvYnNlcnZlci51bm9ic2VydmUgJiYgc3dpcGVyLmVsKSB7XG4gICAgICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKHN3aXBlci5lbCk7XG4gICAgICAgICAgb2JzZXJ2ZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBvcmllbnRhdGlvbkNoYW5nZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5pbml0aWFsaXplZCkgcmV0dXJuO1xuICAgICAgICBlbWl0KCdvcmllbnRhdGlvbmNoYW5nZScpO1xuICAgICAgfTtcblxuICAgICAgb24oJ2luaXQnLCAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLnJlc2l6ZU9ic2VydmVyICYmIHR5cGVvZiB3aW5kb3cuUmVzaXplT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgY3JlYXRlT2JzZXJ2ZXIoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplSGFuZGxlcik7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIG9yaWVudGF0aW9uQ2hhbmdlSGFuZGxlcik7XG4gICAgICB9KTtcbiAgICAgIG9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgICAgICByZW1vdmVPYnNlcnZlcigpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplSGFuZGxlcik7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIG9yaWVudGF0aW9uQ2hhbmdlSGFuZGxlcik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBPYnNlcnZlcihfcmVmKSB7XG4gICAgICBsZXQge1xuICAgICAgICBzd2lwZXIsXG4gICAgICAgIGV4dGVuZFBhcmFtcyxcbiAgICAgICAgb24sXG4gICAgICAgIGVtaXRcbiAgICAgIH0gPSBfcmVmO1xuICAgICAgY29uc3Qgb2JzZXJ2ZXJzID0gW107XG4gICAgICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcblxuICAgICAgY29uc3QgYXR0YWNoID0gZnVuY3Rpb24gKHRhcmdldCwgb3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgT2JzZXJ2ZXJGdW5jID0gd2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIgfHwgd2luZG93LldlYmtpdE11dGF0aW9uT2JzZXJ2ZXI7XG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE9ic2VydmVyRnVuYyhtdXRhdGlvbnMgPT4ge1xuICAgICAgICAgIC8vIFRoZSBvYnNlcnZlclVwZGF0ZSBldmVudCBzaG91bGQgb25seSBiZSB0cmlnZ2VyZWRcbiAgICAgICAgICAvLyBvbmNlIGRlc3BpdGUgdGhlIG51bWJlciBvZiBtdXRhdGlvbnMuICBBZGRpdGlvbmFsXG4gICAgICAgICAgLy8gdHJpZ2dlcnMgYXJlIHJlZHVuZGFudCBhbmQgYXJlIHZlcnkgY29zdGx5XG4gICAgICAgICAgaWYgKG11dGF0aW9ucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGVtaXQoJ29ic2VydmVyVXBkYXRlJywgbXV0YXRpb25zWzBdKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBvYnNlcnZlclVwZGF0ZSA9IGZ1bmN0aW9uIG9ic2VydmVyVXBkYXRlKCkge1xuICAgICAgICAgICAgZW1pdCgnb2JzZXJ2ZXJVcGRhdGUnLCBtdXRhdGlvbnNbMF0pO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAod2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShvYnNlcnZlclVwZGF0ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KG9ic2VydmVyVXBkYXRlLCAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldCwge1xuICAgICAgICAgIGF0dHJpYnV0ZXM6IHR5cGVvZiBvcHRpb25zLmF0dHJpYnV0ZXMgPT09ICd1bmRlZmluZWQnID8gdHJ1ZSA6IG9wdGlvbnMuYXR0cmlidXRlcyxcbiAgICAgICAgICBjaGlsZExpc3Q6IHR5cGVvZiBvcHRpb25zLmNoaWxkTGlzdCA9PT0gJ3VuZGVmaW5lZCcgPyB0cnVlIDogb3B0aW9ucy5jaGlsZExpc3QsXG4gICAgICAgICAgY2hhcmFjdGVyRGF0YTogdHlwZW9mIG9wdGlvbnMuY2hhcmFjdGVyRGF0YSA9PT0gJ3VuZGVmaW5lZCcgPyB0cnVlIDogb3B0aW9ucy5jaGFyYWN0ZXJEYXRhXG4gICAgICAgIH0pO1xuICAgICAgICBvYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMub2JzZXJ2ZXIpIHJldHVybjtcblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5vYnNlcnZlUGFyZW50cykge1xuICAgICAgICAgIGNvbnN0IGNvbnRhaW5lclBhcmVudHMgPSBzd2lwZXIuJGVsLnBhcmVudHMoKTtcblxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udGFpbmVyUGFyZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgYXR0YWNoKGNvbnRhaW5lclBhcmVudHNbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSAvLyBPYnNlcnZlIGNvbnRhaW5lclxuXG5cbiAgICAgICAgYXR0YWNoKHN3aXBlci4kZWxbMF0sIHtcbiAgICAgICAgICBjaGlsZExpc3Q6IHN3aXBlci5wYXJhbXMub2JzZXJ2ZVNsaWRlQ2hpbGRyZW5cbiAgICAgICAgfSk7IC8vIE9ic2VydmUgd3JhcHBlclxuXG4gICAgICAgIGF0dGFjaChzd2lwZXIuJHdyYXBwZXJFbFswXSwge1xuICAgICAgICAgIGF0dHJpYnV0ZXM6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgb2JzZXJ2ZXJzLmZvckVhY2gob2JzZXJ2ZXIgPT4ge1xuICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG9ic2VydmVycy5zcGxpY2UoMCwgb2JzZXJ2ZXJzLmxlbmd0aCk7XG4gICAgICB9O1xuXG4gICAgICBleHRlbmRQYXJhbXMoe1xuICAgICAgICBvYnNlcnZlcjogZmFsc2UsXG4gICAgICAgIG9ic2VydmVQYXJlbnRzOiBmYWxzZSxcbiAgICAgICAgb2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIG9uKCdpbml0JywgaW5pdCk7XG4gICAgICBvbignZGVzdHJveScsIGRlc3Ryb3kpO1xuICAgIH1cblxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG4gICAgdmFyIGV2ZW50c0VtaXR0ZXIgPSB7XG4gICAgICBvbihldmVudHMsIGhhbmRsZXIsIHByaW9yaXR5KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzIHx8IHNlbGYuZGVzdHJveWVkKSByZXR1cm4gc2VsZjtcbiAgICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyICE9PSAnZnVuY3Rpb24nKSByZXR1cm4gc2VsZjtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gcHJpb3JpdHkgPyAndW5zaGlmdCcgOiAncHVzaCc7XG4gICAgICAgIGV2ZW50cy5zcGxpdCgnICcpLmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgICAgIGlmICghc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdKSBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF0gPSBbXTtcbiAgICAgICAgICBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF1bbWV0aG9kXShoYW5kbGVyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfSxcblxuICAgICAgb25jZShldmVudHMsIGhhbmRsZXIsIHByaW9yaXR5KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzIHx8IHNlbGYuZGVzdHJveWVkKSByZXR1cm4gc2VsZjtcbiAgICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyICE9PSAnZnVuY3Rpb24nKSByZXR1cm4gc2VsZjtcblxuICAgICAgICBmdW5jdGlvbiBvbmNlSGFuZGxlcigpIHtcbiAgICAgICAgICBzZWxmLm9mZihldmVudHMsIG9uY2VIYW5kbGVyKTtcblxuICAgICAgICAgIGlmIChvbmNlSGFuZGxlci5fX2VtaXR0ZXJQcm94eSkge1xuICAgICAgICAgICAgZGVsZXRlIG9uY2VIYW5kbGVyLl9fZW1pdHRlclByb3h5O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBoYW5kbGVyLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgb25jZUhhbmRsZXIuX19lbWl0dGVyUHJveHkgPSBoYW5kbGVyO1xuICAgICAgICByZXR1cm4gc2VsZi5vbihldmVudHMsIG9uY2VIYW5kbGVyLCBwcmlvcml0eSk7XG4gICAgICB9LFxuXG4gICAgICBvbkFueShoYW5kbGVyLCBwcmlvcml0eSkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycyB8fCBzZWxmLmRlc3Ryb3llZCkgcmV0dXJuIHNlbGY7XG4gICAgICAgIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHNlbGY7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHByaW9yaXR5ID8gJ3Vuc2hpZnQnIDogJ3B1c2gnO1xuXG4gICAgICAgIGlmIChzZWxmLmV2ZW50c0FueUxpc3RlbmVycy5pbmRleE9mKGhhbmRsZXIpIDwgMCkge1xuICAgICAgICAgIHNlbGYuZXZlbnRzQW55TGlzdGVuZXJzW21ldGhvZF0oaGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH0sXG5cbiAgICAgIG9mZkFueShoYW5kbGVyKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzIHx8IHNlbGYuZGVzdHJveWVkKSByZXR1cm4gc2VsZjtcbiAgICAgICAgaWYgKCFzZWxmLmV2ZW50c0FueUxpc3RlbmVycykgcmV0dXJuIHNlbGY7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gc2VsZi5ldmVudHNBbnlMaXN0ZW5lcnMuaW5kZXhPZihoYW5kbGVyKTtcblxuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgIHNlbGYuZXZlbnRzQW55TGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH0sXG5cbiAgICAgIG9mZihldmVudHMsIGhhbmRsZXIpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICghc2VsZi5ldmVudHNMaXN0ZW5lcnMgfHwgc2VsZi5kZXN0cm95ZWQpIHJldHVybiBzZWxmO1xuICAgICAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzKSByZXR1cm4gc2VsZjtcbiAgICAgICAgZXZlbnRzLnNwbGl0KCcgJykuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdID0gW107XG4gICAgICAgICAgfSBlbHNlIGlmIChzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF0pIHtcbiAgICAgICAgICAgIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50XS5mb3JFYWNoKChldmVudEhhbmRsZXIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChldmVudEhhbmRsZXIgPT09IGhhbmRsZXIgfHwgZXZlbnRIYW5kbGVyLl9fZW1pdHRlclByb3h5ICYmIGV2ZW50SGFuZGxlci5fX2VtaXR0ZXJQcm94eSA9PT0gaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50XS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH0sXG5cbiAgICAgIGVtaXQoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzIHx8IHNlbGYuZGVzdHJveWVkKSByZXR1cm4gc2VsZjtcbiAgICAgICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycykgcmV0dXJuIHNlbGY7XG4gICAgICAgIGxldCBldmVudHM7XG4gICAgICAgIGxldCBkYXRhO1xuICAgICAgICBsZXQgY29udGV4dDtcblxuICAgICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdzdHJpbmcnIHx8IEFycmF5LmlzQXJyYXkoYXJnc1swXSkpIHtcbiAgICAgICAgICBldmVudHMgPSBhcmdzWzBdO1xuICAgICAgICAgIGRhdGEgPSBhcmdzLnNsaWNlKDEsIGFyZ3MubGVuZ3RoKTtcbiAgICAgICAgICBjb250ZXh0ID0gc2VsZjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBldmVudHMgPSBhcmdzWzBdLmV2ZW50cztcbiAgICAgICAgICBkYXRhID0gYXJnc1swXS5kYXRhO1xuICAgICAgICAgIGNvbnRleHQgPSBhcmdzWzBdLmNvbnRleHQgfHwgc2VsZjtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGEudW5zaGlmdChjb250ZXh0KTtcbiAgICAgICAgY29uc3QgZXZlbnRzQXJyYXkgPSBBcnJheS5pc0FycmF5KGV2ZW50cykgPyBldmVudHMgOiBldmVudHMuc3BsaXQoJyAnKTtcbiAgICAgICAgZXZlbnRzQXJyYXkuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgICAgaWYgKHNlbGYuZXZlbnRzQW55TGlzdGVuZXJzICYmIHNlbGYuZXZlbnRzQW55TGlzdGVuZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgc2VsZi5ldmVudHNBbnlMaXN0ZW5lcnMuZm9yRWFjaChldmVudEhhbmRsZXIgPT4ge1xuICAgICAgICAgICAgICBldmVudEhhbmRsZXIuYXBwbHkoY29udGV4dCwgW2V2ZW50LCAuLi5kYXRhXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VsZi5ldmVudHNMaXN0ZW5lcnMgJiYgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdKSB7XG4gICAgICAgICAgICBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF0uZm9yRWFjaChldmVudEhhbmRsZXIgPT4ge1xuICAgICAgICAgICAgICBldmVudEhhbmRsZXIuYXBwbHkoY29udGV4dCwgZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH1cblxuICAgIH07XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVTaXplKCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGxldCB3aWR0aDtcbiAgICAgIGxldCBoZWlnaHQ7XG4gICAgICBjb25zdCAkZWwgPSBzd2lwZXIuJGVsO1xuXG4gICAgICBpZiAodHlwZW9mIHN3aXBlci5wYXJhbXMud2lkdGggIT09ICd1bmRlZmluZWQnICYmIHN3aXBlci5wYXJhbXMud2lkdGggIT09IG51bGwpIHtcbiAgICAgICAgd2lkdGggPSBzd2lwZXIucGFyYW1zLndpZHRoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2lkdGggPSAkZWxbMF0uY2xpZW50V2lkdGg7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygc3dpcGVyLnBhcmFtcy5oZWlnaHQgIT09ICd1bmRlZmluZWQnICYmIHN3aXBlci5wYXJhbXMuaGVpZ2h0ICE9PSBudWxsKSB7XG4gICAgICAgIGhlaWdodCA9IHN3aXBlci5wYXJhbXMuaGVpZ2h0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGVpZ2h0ID0gJGVsWzBdLmNsaWVudEhlaWdodDtcbiAgICAgIH1cblxuICAgICAgaWYgKHdpZHRoID09PSAwICYmIHN3aXBlci5pc0hvcml6b250YWwoKSB8fCBoZWlnaHQgPT09IDAgJiYgc3dpcGVyLmlzVmVydGljYWwoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIFN1YnRyYWN0IHBhZGRpbmdzXG5cblxuICAgICAgd2lkdGggPSB3aWR0aCAtIHBhcnNlSW50KCRlbC5jc3MoJ3BhZGRpbmctbGVmdCcpIHx8IDAsIDEwKSAtIHBhcnNlSW50KCRlbC5jc3MoJ3BhZGRpbmctcmlnaHQnKSB8fCAwLCAxMCk7XG4gICAgICBoZWlnaHQgPSBoZWlnaHQgLSBwYXJzZUludCgkZWwuY3NzKCdwYWRkaW5nLXRvcCcpIHx8IDAsIDEwKSAtIHBhcnNlSW50KCRlbC5jc3MoJ3BhZGRpbmctYm90dG9tJykgfHwgMCwgMTApO1xuICAgICAgaWYgKE51bWJlci5pc05hTih3aWR0aCkpIHdpZHRoID0gMDtcbiAgICAgIGlmIChOdW1iZXIuaXNOYU4oaGVpZ2h0KSkgaGVpZ2h0ID0gMDtcbiAgICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLCB7XG4gICAgICAgIHdpZHRoLFxuICAgICAgICBoZWlnaHQsXG4gICAgICAgIHNpemU6IHN3aXBlci5pc0hvcml6b250YWwoKSA/IHdpZHRoIDogaGVpZ2h0XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVTbGlkZXMoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuXG4gICAgICBmdW5jdGlvbiBnZXREaXJlY3Rpb25MYWJlbChwcm9wZXJ0eSkge1xuICAgICAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BlcnR5O1xuICAgICAgICB9IC8vIHByZXR0aWVyLWlnbm9yZVxuXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAnd2lkdGgnOiAnaGVpZ2h0JyxcbiAgICAgICAgICAnbWFyZ2luLXRvcCc6ICdtYXJnaW4tbGVmdCcsXG4gICAgICAgICAgJ21hcmdpbi1ib3R0b20gJzogJ21hcmdpbi1yaWdodCcsXG4gICAgICAgICAgJ21hcmdpbi1sZWZ0JzogJ21hcmdpbi10b3AnLFxuICAgICAgICAgICdtYXJnaW4tcmlnaHQnOiAnbWFyZ2luLWJvdHRvbScsXG4gICAgICAgICAgJ3BhZGRpbmctbGVmdCc6ICdwYWRkaW5nLXRvcCcsXG4gICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiAncGFkZGluZy1ib3R0b20nLFxuICAgICAgICAgICdtYXJnaW5SaWdodCc6ICdtYXJnaW5Cb3R0b20nXG4gICAgICAgIH1bcHJvcGVydHldO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXREaXJlY3Rpb25Qcm9wZXJ0eVZhbHVlKG5vZGUsIGxhYmVsKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KG5vZGUuZ2V0UHJvcGVydHlWYWx1ZShnZXREaXJlY3Rpb25MYWJlbChsYWJlbCkpIHx8IDApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICAgICAgY29uc3Qge1xuICAgICAgICAkd3JhcHBlckVsLFxuICAgICAgICBzaXplOiBzd2lwZXJTaXplLFxuICAgICAgICBydGxUcmFuc2xhdGU6IHJ0bCxcbiAgICAgICAgd3JvbmdSVExcbiAgICAgIH0gPSBzd2lwZXI7XG4gICAgICBjb25zdCBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBwYXJhbXMudmlydHVhbC5lbmFibGVkO1xuICAgICAgY29uc3QgcHJldmlvdXNTbGlkZXNMZW5ndGggPSBpc1ZpcnR1YWwgPyBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoIDogc3dpcGVyLnNsaWRlcy5sZW5ndGg7XG4gICAgICBjb25zdCBzbGlkZXMgPSAkd3JhcHBlckVsLmNoaWxkcmVuKGAuJHtzd2lwZXIucGFyYW1zLnNsaWRlQ2xhc3N9YCk7XG4gICAgICBjb25zdCBzbGlkZXNMZW5ndGggPSBpc1ZpcnR1YWwgPyBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoIDogc2xpZGVzLmxlbmd0aDtcbiAgICAgIGxldCBzbmFwR3JpZCA9IFtdO1xuICAgICAgY29uc3Qgc2xpZGVzR3JpZCA9IFtdO1xuICAgICAgY29uc3Qgc2xpZGVzU2l6ZXNHcmlkID0gW107XG4gICAgICBsZXQgb2Zmc2V0QmVmb3JlID0gcGFyYW1zLnNsaWRlc09mZnNldEJlZm9yZTtcblxuICAgICAgaWYgKHR5cGVvZiBvZmZzZXRCZWZvcmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb2Zmc2V0QmVmb3JlID0gcGFyYW1zLnNsaWRlc09mZnNldEJlZm9yZS5jYWxsKHN3aXBlcik7XG4gICAgICB9XG5cbiAgICAgIGxldCBvZmZzZXRBZnRlciA9IHBhcmFtcy5zbGlkZXNPZmZzZXRBZnRlcjtcblxuICAgICAgaWYgKHR5cGVvZiBvZmZzZXRBZnRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvZmZzZXRBZnRlciA9IHBhcmFtcy5zbGlkZXNPZmZzZXRBZnRlci5jYWxsKHN3aXBlcik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByZXZpb3VzU25hcEdyaWRMZW5ndGggPSBzd2lwZXIuc25hcEdyaWQubGVuZ3RoO1xuICAgICAgY29uc3QgcHJldmlvdXNTbGlkZXNHcmlkTGVuZ3RoID0gc3dpcGVyLnNsaWRlc0dyaWQubGVuZ3RoO1xuICAgICAgbGV0IHNwYWNlQmV0d2VlbiA9IHBhcmFtcy5zcGFjZUJldHdlZW47XG4gICAgICBsZXQgc2xpZGVQb3NpdGlvbiA9IC1vZmZzZXRCZWZvcmU7XG4gICAgICBsZXQgcHJldlNsaWRlU2l6ZSA9IDA7XG4gICAgICBsZXQgaW5kZXggPSAwO1xuXG4gICAgICBpZiAodHlwZW9mIHN3aXBlclNpemUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBzcGFjZUJldHdlZW4gPT09ICdzdHJpbmcnICYmIHNwYWNlQmV0d2Vlbi5pbmRleE9mKCclJykgPj0gMCkge1xuICAgICAgICBzcGFjZUJldHdlZW4gPSBwYXJzZUZsb2F0KHNwYWNlQmV0d2Vlbi5yZXBsYWNlKCclJywgJycpKSAvIDEwMCAqIHN3aXBlclNpemU7XG4gICAgICB9XG5cbiAgICAgIHN3aXBlci52aXJ0dWFsU2l6ZSA9IC1zcGFjZUJldHdlZW47IC8vIHJlc2V0IG1hcmdpbnNcblxuICAgICAgaWYgKHJ0bCkgc2xpZGVzLmNzcyh7XG4gICAgICAgIG1hcmdpbkxlZnQ6ICcnLFxuICAgICAgICBtYXJnaW5Cb3R0b206ICcnLFxuICAgICAgICBtYXJnaW5Ub3A6ICcnXG4gICAgICB9KTtlbHNlIHNsaWRlcy5jc3Moe1xuICAgICAgICBtYXJnaW5SaWdodDogJycsXG4gICAgICAgIG1hcmdpbkJvdHRvbTogJycsXG4gICAgICAgIG1hcmdpblRvcDogJydcbiAgICAgIH0pOyAvLyByZXNldCBjc3NNb2RlIG9mZnNldHNcblxuICAgICAgaWYgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcyAmJiBwYXJhbXMuY3NzTW9kZSkge1xuICAgICAgICBzZXRDU1NQcm9wZXJ0eShzd2lwZXIud3JhcHBlckVsLCAnLS1zd2lwZXItY2VudGVyZWQtb2Zmc2V0LWJlZm9yZScsICcnKTtcbiAgICAgICAgc2V0Q1NTUHJvcGVydHkoc3dpcGVyLndyYXBwZXJFbCwgJy0tc3dpcGVyLWNlbnRlcmVkLW9mZnNldC1hZnRlcicsICcnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZ3JpZEVuYWJsZWQgPSBwYXJhbXMuZ3JpZCAmJiBwYXJhbXMuZ3JpZC5yb3dzID4gMSAmJiBzd2lwZXIuZ3JpZDtcblxuICAgICAgaWYgKGdyaWRFbmFibGVkKSB7XG4gICAgICAgIHN3aXBlci5ncmlkLmluaXRTbGlkZXMoc2xpZGVzTGVuZ3RoKTtcbiAgICAgIH0gLy8gQ2FsYyBzbGlkZXNcblxuXG4gICAgICBsZXQgc2xpZGVTaXplO1xuICAgICAgY29uc3Qgc2hvdWxkUmVzZXRTbGlkZVNpemUgPSBwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nICYmIHBhcmFtcy5icmVha3BvaW50cyAmJiBPYmplY3Qua2V5cyhwYXJhbXMuYnJlYWtwb2ludHMpLmZpbHRlcihrZXkgPT4ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHBhcmFtcy5icmVha3BvaW50c1trZXldLnNsaWRlc1BlclZpZXcgIT09ICd1bmRlZmluZWQnO1xuICAgICAgfSkubGVuZ3RoID4gMDtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXNMZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBzbGlkZVNpemUgPSAwO1xuICAgICAgICBjb25zdCBzbGlkZSA9IHNsaWRlcy5lcShpKTtcblxuICAgICAgICBpZiAoZ3JpZEVuYWJsZWQpIHtcbiAgICAgICAgICBzd2lwZXIuZ3JpZC51cGRhdGVTbGlkZShpLCBzbGlkZSwgc2xpZGVzTGVuZ3RoLCBnZXREaXJlY3Rpb25MYWJlbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2xpZGUuY3NzKCdkaXNwbGF5JykgPT09ICdub25lJykgY29udGludWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgICAgICBpZiAocGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJykge1xuICAgICAgICAgIGlmIChzaG91bGRSZXNldFNsaWRlU2l6ZSkge1xuICAgICAgICAgICAgc2xpZGVzW2ldLnN0eWxlW2dldERpcmVjdGlvbkxhYmVsKCd3aWR0aCcpXSA9IGBgO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHNsaWRlU3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShzbGlkZVswXSk7XG4gICAgICAgICAgY29uc3QgY3VycmVudFRyYW5zZm9ybSA9IHNsaWRlWzBdLnN0eWxlLnRyYW5zZm9ybTtcbiAgICAgICAgICBjb25zdCBjdXJyZW50V2ViS2l0VHJhbnNmb3JtID0gc2xpZGVbMF0uc3R5bGUud2Via2l0VHJhbnNmb3JtO1xuXG4gICAgICAgICAgaWYgKGN1cnJlbnRUcmFuc2Zvcm0pIHtcbiAgICAgICAgICAgIHNsaWRlWzBdLnN0eWxlLnRyYW5zZm9ybSA9ICdub25lJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY3VycmVudFdlYktpdFRyYW5zZm9ybSkge1xuICAgICAgICAgICAgc2xpZGVbMF0uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ25vbmUnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSB7XG4gICAgICAgICAgICBzbGlkZVNpemUgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBzbGlkZS5vdXRlcldpZHRoKHRydWUpIDogc2xpZGUub3V0ZXJIZWlnaHQodHJ1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBnZXREaXJlY3Rpb25Qcm9wZXJ0eVZhbHVlKHNsaWRlU3R5bGVzLCAnd2lkdGgnKTtcbiAgICAgICAgICAgIGNvbnN0IHBhZGRpbmdMZWZ0ID0gZ2V0RGlyZWN0aW9uUHJvcGVydHlWYWx1ZShzbGlkZVN0eWxlcywgJ3BhZGRpbmctbGVmdCcpO1xuICAgICAgICAgICAgY29uc3QgcGFkZGluZ1JpZ2h0ID0gZ2V0RGlyZWN0aW9uUHJvcGVydHlWYWx1ZShzbGlkZVN0eWxlcywgJ3BhZGRpbmctcmlnaHQnKTtcbiAgICAgICAgICAgIGNvbnN0IG1hcmdpbkxlZnQgPSBnZXREaXJlY3Rpb25Qcm9wZXJ0eVZhbHVlKHNsaWRlU3R5bGVzLCAnbWFyZ2luLWxlZnQnKTtcbiAgICAgICAgICAgIGNvbnN0IG1hcmdpblJpZ2h0ID0gZ2V0RGlyZWN0aW9uUHJvcGVydHlWYWx1ZShzbGlkZVN0eWxlcywgJ21hcmdpbi1yaWdodCcpO1xuICAgICAgICAgICAgY29uc3QgYm94U2l6aW5nID0gc2xpZGVTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnYm94LXNpemluZycpO1xuXG4gICAgICAgICAgICBpZiAoYm94U2l6aW5nICYmIGJveFNpemluZyA9PT0gJ2JvcmRlci1ib3gnKSB7XG4gICAgICAgICAgICAgIHNsaWRlU2l6ZSA9IHdpZHRoICsgbWFyZ2luTGVmdCArIG1hcmdpblJpZ2h0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgIGNsaWVudFdpZHRoLFxuICAgICAgICAgICAgICAgIG9mZnNldFdpZHRoXG4gICAgICAgICAgICAgIH0gPSBzbGlkZVswXTtcbiAgICAgICAgICAgICAgc2xpZGVTaXplID0gd2lkdGggKyBwYWRkaW5nTGVmdCArIHBhZGRpbmdSaWdodCArIG1hcmdpbkxlZnQgKyBtYXJnaW5SaWdodCArIChvZmZzZXRXaWR0aCAtIGNsaWVudFdpZHRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY3VycmVudFRyYW5zZm9ybSkge1xuICAgICAgICAgICAgc2xpZGVbMF0uc3R5bGUudHJhbnNmb3JtID0gY3VycmVudFRyYW5zZm9ybTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY3VycmVudFdlYktpdFRyYW5zZm9ybSkge1xuICAgICAgICAgICAgc2xpZGVbMF0uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gY3VycmVudFdlYktpdFRyYW5zZm9ybTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGFyYW1zLnJvdW5kTGVuZ3Rocykgc2xpZGVTaXplID0gTWF0aC5mbG9vcihzbGlkZVNpemUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNsaWRlU2l6ZSA9IChzd2lwZXJTaXplIC0gKHBhcmFtcy5zbGlkZXNQZXJWaWV3IC0gMSkgKiBzcGFjZUJldHdlZW4pIC8gcGFyYW1zLnNsaWRlc1BlclZpZXc7XG4gICAgICAgICAgaWYgKHBhcmFtcy5yb3VuZExlbmd0aHMpIHNsaWRlU2l6ZSA9IE1hdGguZmxvb3Ioc2xpZGVTaXplKTtcblxuICAgICAgICAgIGlmIChzbGlkZXNbaV0pIHtcbiAgICAgICAgICAgIHNsaWRlc1tpXS5zdHlsZVtnZXREaXJlY3Rpb25MYWJlbCgnd2lkdGgnKV0gPSBgJHtzbGlkZVNpemV9cHhgO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzbGlkZXNbaV0pIHtcbiAgICAgICAgICBzbGlkZXNbaV0uc3dpcGVyU2xpZGVTaXplID0gc2xpZGVTaXplO1xuICAgICAgICB9XG5cbiAgICAgICAgc2xpZGVzU2l6ZXNHcmlkLnB1c2goc2xpZGVTaXplKTtcblxuICAgICAgICBpZiAocGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAgICAgc2xpZGVQb3NpdGlvbiA9IHNsaWRlUG9zaXRpb24gKyBzbGlkZVNpemUgLyAyICsgcHJldlNsaWRlU2l6ZSAvIDIgKyBzcGFjZUJldHdlZW47XG4gICAgICAgICAgaWYgKHByZXZTbGlkZVNpemUgPT09IDAgJiYgaSAhPT0gMCkgc2xpZGVQb3NpdGlvbiA9IHNsaWRlUG9zaXRpb24gLSBzd2lwZXJTaXplIC8gMiAtIHNwYWNlQmV0d2VlbjtcbiAgICAgICAgICBpZiAoaSA9PT0gMCkgc2xpZGVQb3NpdGlvbiA9IHNsaWRlUG9zaXRpb24gLSBzd2lwZXJTaXplIC8gMiAtIHNwYWNlQmV0d2VlbjtcbiAgICAgICAgICBpZiAoTWF0aC5hYnMoc2xpZGVQb3NpdGlvbikgPCAxIC8gMTAwMCkgc2xpZGVQb3NpdGlvbiA9IDA7XG4gICAgICAgICAgaWYgKHBhcmFtcy5yb3VuZExlbmd0aHMpIHNsaWRlUG9zaXRpb24gPSBNYXRoLmZsb29yKHNsaWRlUG9zaXRpb24pO1xuICAgICAgICAgIGlmIChpbmRleCAlIHBhcmFtcy5zbGlkZXNQZXJHcm91cCA9PT0gMCkgc25hcEdyaWQucHVzaChzbGlkZVBvc2l0aW9uKTtcbiAgICAgICAgICBzbGlkZXNHcmlkLnB1c2goc2xpZGVQb3NpdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHBhcmFtcy5yb3VuZExlbmd0aHMpIHNsaWRlUG9zaXRpb24gPSBNYXRoLmZsb29yKHNsaWRlUG9zaXRpb24pO1xuICAgICAgICAgIGlmICgoaW5kZXggLSBNYXRoLm1pbihzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwU2tpcCwgaW5kZXgpKSAlIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXAgPT09IDApIHNuYXBHcmlkLnB1c2goc2xpZGVQb3NpdGlvbik7XG4gICAgICAgICAgc2xpZGVzR3JpZC5wdXNoKHNsaWRlUG9zaXRpb24pO1xuICAgICAgICAgIHNsaWRlUG9zaXRpb24gPSBzbGlkZVBvc2l0aW9uICsgc2xpZGVTaXplICsgc3BhY2VCZXR3ZWVuO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpcGVyLnZpcnR1YWxTaXplICs9IHNsaWRlU2l6ZSArIHNwYWNlQmV0d2VlbjtcbiAgICAgICAgcHJldlNsaWRlU2l6ZSA9IHNsaWRlU2l6ZTtcbiAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgIH1cblxuICAgICAgc3dpcGVyLnZpcnR1YWxTaXplID0gTWF0aC5tYXgoc3dpcGVyLnZpcnR1YWxTaXplLCBzd2lwZXJTaXplKSArIG9mZnNldEFmdGVyO1xuXG4gICAgICBpZiAocnRsICYmIHdyb25nUlRMICYmIChwYXJhbXMuZWZmZWN0ID09PSAnc2xpZGUnIHx8IHBhcmFtcy5lZmZlY3QgPT09ICdjb3ZlcmZsb3cnKSkge1xuICAgICAgICAkd3JhcHBlckVsLmNzcyh7XG4gICAgICAgICAgd2lkdGg6IGAke3N3aXBlci52aXJ0dWFsU2l6ZSArIHBhcmFtcy5zcGFjZUJldHdlZW59cHhgXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFyYW1zLnNldFdyYXBwZXJTaXplKSB7XG4gICAgICAgICR3cmFwcGVyRWwuY3NzKHtcbiAgICAgICAgICBbZ2V0RGlyZWN0aW9uTGFiZWwoJ3dpZHRoJyldOiBgJHtzd2lwZXIudmlydHVhbFNpemUgKyBwYXJhbXMuc3BhY2VCZXR3ZWVufXB4YFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGdyaWRFbmFibGVkKSB7XG4gICAgICAgIHN3aXBlci5ncmlkLnVwZGF0ZVdyYXBwZXJTaXplKHNsaWRlU2l6ZSwgc25hcEdyaWQsIGdldERpcmVjdGlvbkxhYmVsKTtcbiAgICAgIH0gLy8gUmVtb3ZlIGxhc3QgZ3JpZCBlbGVtZW50cyBkZXBlbmRpbmcgb24gd2lkdGhcblxuXG4gICAgICBpZiAoIXBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgICBjb25zdCBuZXdTbGlkZXNHcmlkID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbmFwR3JpZC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGxldCBzbGlkZXNHcmlkSXRlbSA9IHNuYXBHcmlkW2ldO1xuICAgICAgICAgIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSBzbGlkZXNHcmlkSXRlbSA9IE1hdGguZmxvb3Ioc2xpZGVzR3JpZEl0ZW0pO1xuXG4gICAgICAgICAgaWYgKHNuYXBHcmlkW2ldIDw9IHN3aXBlci52aXJ0dWFsU2l6ZSAtIHN3aXBlclNpemUpIHtcbiAgICAgICAgICAgIG5ld1NsaWRlc0dyaWQucHVzaChzbGlkZXNHcmlkSXRlbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc25hcEdyaWQgPSBuZXdTbGlkZXNHcmlkO1xuXG4gICAgICAgIGlmIChNYXRoLmZsb29yKHN3aXBlci52aXJ0dWFsU2l6ZSAtIHN3aXBlclNpemUpIC0gTWF0aC5mbG9vcihzbmFwR3JpZFtzbmFwR3JpZC5sZW5ndGggLSAxXSkgPiAxKSB7XG4gICAgICAgICAgc25hcEdyaWQucHVzaChzd2lwZXIudmlydHVhbFNpemUgLSBzd2lwZXJTaXplKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc25hcEdyaWQubGVuZ3RoID09PSAwKSBzbmFwR3JpZCA9IFswXTtcblxuICAgICAgaWYgKHBhcmFtcy5zcGFjZUJldHdlZW4gIT09IDApIHtcbiAgICAgICAgY29uc3Qga2V5ID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpICYmIHJ0bCA/ICdtYXJnaW5MZWZ0JyA6IGdldERpcmVjdGlvbkxhYmVsKCdtYXJnaW5SaWdodCcpO1xuICAgICAgICBzbGlkZXMuZmlsdGVyKChfLCBzbGlkZUluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKCFwYXJhbXMuY3NzTW9kZSkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgICBpZiAoc2xpZGVJbmRleCA9PT0gc2xpZGVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSkuY3NzKHtcbiAgICAgICAgICBba2V5XTogYCR7c3BhY2VCZXR3ZWVufXB4YFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcyAmJiBwYXJhbXMuY2VudGVyZWRTbGlkZXNCb3VuZHMpIHtcbiAgICAgICAgbGV0IGFsbFNsaWRlc1NpemUgPSAwO1xuICAgICAgICBzbGlkZXNTaXplc0dyaWQuZm9yRWFjaChzbGlkZVNpemVWYWx1ZSA9PiB7XG4gICAgICAgICAgYWxsU2xpZGVzU2l6ZSArPSBzbGlkZVNpemVWYWx1ZSArIChwYXJhbXMuc3BhY2VCZXR3ZWVuID8gcGFyYW1zLnNwYWNlQmV0d2VlbiA6IDApO1xuICAgICAgICB9KTtcbiAgICAgICAgYWxsU2xpZGVzU2l6ZSAtPSBwYXJhbXMuc3BhY2VCZXR3ZWVuO1xuICAgICAgICBjb25zdCBtYXhTbmFwID0gYWxsU2xpZGVzU2l6ZSAtIHN3aXBlclNpemU7XG4gICAgICAgIHNuYXBHcmlkID0gc25hcEdyaWQubWFwKHNuYXAgPT4ge1xuICAgICAgICAgIGlmIChzbmFwIDwgMCkgcmV0dXJuIC1vZmZzZXRCZWZvcmU7XG4gICAgICAgICAgaWYgKHNuYXAgPiBtYXhTbmFwKSByZXR1cm4gbWF4U25hcCArIG9mZnNldEFmdGVyO1xuICAgICAgICAgIHJldHVybiBzbmFwO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcmFtcy5jZW50ZXJJbnN1ZmZpY2llbnRTbGlkZXMpIHtcbiAgICAgICAgbGV0IGFsbFNsaWRlc1NpemUgPSAwO1xuICAgICAgICBzbGlkZXNTaXplc0dyaWQuZm9yRWFjaChzbGlkZVNpemVWYWx1ZSA9PiB7XG4gICAgICAgICAgYWxsU2xpZGVzU2l6ZSArPSBzbGlkZVNpemVWYWx1ZSArIChwYXJhbXMuc3BhY2VCZXR3ZWVuID8gcGFyYW1zLnNwYWNlQmV0d2VlbiA6IDApO1xuICAgICAgICB9KTtcbiAgICAgICAgYWxsU2xpZGVzU2l6ZSAtPSBwYXJhbXMuc3BhY2VCZXR3ZWVuO1xuXG4gICAgICAgIGlmIChhbGxTbGlkZXNTaXplIDwgc3dpcGVyU2l6ZSkge1xuICAgICAgICAgIGNvbnN0IGFsbFNsaWRlc09mZnNldCA9IChzd2lwZXJTaXplIC0gYWxsU2xpZGVzU2l6ZSkgLyAyO1xuICAgICAgICAgIHNuYXBHcmlkLmZvckVhY2goKHNuYXAsIHNuYXBJbmRleCkgPT4ge1xuICAgICAgICAgICAgc25hcEdyaWRbc25hcEluZGV4XSA9IHNuYXAgLSBhbGxTbGlkZXNPZmZzZXQ7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc2xpZGVzR3JpZC5mb3JFYWNoKChzbmFwLCBzbmFwSW5kZXgpID0+IHtcbiAgICAgICAgICAgIHNsaWRlc0dyaWRbc25hcEluZGV4XSA9IHNuYXAgKyBhbGxTbGlkZXNPZmZzZXQ7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgT2JqZWN0LmFzc2lnbihzd2lwZXIsIHtcbiAgICAgICAgc2xpZGVzLFxuICAgICAgICBzbmFwR3JpZCxcbiAgICAgICAgc2xpZGVzR3JpZCxcbiAgICAgICAgc2xpZGVzU2l6ZXNHcmlkXG4gICAgICB9KTtcblxuICAgICAgaWYgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcyAmJiBwYXJhbXMuY3NzTW9kZSAmJiAhcGFyYW1zLmNlbnRlcmVkU2xpZGVzQm91bmRzKSB7XG4gICAgICAgIHNldENTU1Byb3BlcnR5KHN3aXBlci53cmFwcGVyRWwsICctLXN3aXBlci1jZW50ZXJlZC1vZmZzZXQtYmVmb3JlJywgYCR7LXNuYXBHcmlkWzBdfXB4YCk7XG4gICAgICAgIHNldENTU1Byb3BlcnR5KHN3aXBlci53cmFwcGVyRWwsICctLXN3aXBlci1jZW50ZXJlZC1vZmZzZXQtYWZ0ZXInLCBgJHtzd2lwZXIuc2l6ZSAvIDIgLSBzbGlkZXNTaXplc0dyaWRbc2xpZGVzU2l6ZXNHcmlkLmxlbmd0aCAtIDFdIC8gMn1weGApO1xuICAgICAgICBjb25zdCBhZGRUb1NuYXBHcmlkID0gLXN3aXBlci5zbmFwR3JpZFswXTtcbiAgICAgICAgY29uc3QgYWRkVG9TbGlkZXNHcmlkID0gLXN3aXBlci5zbGlkZXNHcmlkWzBdO1xuICAgICAgICBzd2lwZXIuc25hcEdyaWQgPSBzd2lwZXIuc25hcEdyaWQubWFwKHYgPT4gdiArIGFkZFRvU25hcEdyaWQpO1xuICAgICAgICBzd2lwZXIuc2xpZGVzR3JpZCA9IHN3aXBlci5zbGlkZXNHcmlkLm1hcCh2ID0+IHYgKyBhZGRUb1NsaWRlc0dyaWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2xpZGVzTGVuZ3RoICE9PSBwcmV2aW91c1NsaWRlc0xlbmd0aCkge1xuICAgICAgICBzd2lwZXIuZW1pdCgnc2xpZGVzTGVuZ3RoQ2hhbmdlJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzbmFwR3JpZC5sZW5ndGggIT09IHByZXZpb3VzU25hcEdyaWRMZW5ndGgpIHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdykgc3dpcGVyLmNoZWNrT3ZlcmZsb3coKTtcbiAgICAgICAgc3dpcGVyLmVtaXQoJ3NuYXBHcmlkTGVuZ3RoQ2hhbmdlJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzbGlkZXNHcmlkLmxlbmd0aCAhPT0gcHJldmlvdXNTbGlkZXNHcmlkTGVuZ3RoKSB7XG4gICAgICAgIHN3aXBlci5lbWl0KCdzbGlkZXNHcmlkTGVuZ3RoQ2hhbmdlJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcykge1xuICAgICAgICBzd2lwZXIudXBkYXRlU2xpZGVzT2Zmc2V0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNWaXJ0dWFsICYmICFwYXJhbXMuY3NzTW9kZSAmJiAocGFyYW1zLmVmZmVjdCA9PT0gJ3NsaWRlJyB8fCBwYXJhbXMuZWZmZWN0ID09PSAnZmFkZScpKSB7XG4gICAgICAgIGNvbnN0IGJhY2tGYWNlSGlkZGVuQ2xhc3MgPSBgJHtwYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc31iYWNrZmFjZS1oaWRkZW5gO1xuICAgICAgICBjb25zdCBoYXNDbGFzc0JhY2tmYWNlQ2xhc3NBZGRlZCA9IHN3aXBlci4kZWwuaGFzQ2xhc3MoYmFja0ZhY2VIaWRkZW5DbGFzcyk7XG5cbiAgICAgICAgaWYgKHNsaWRlc0xlbmd0aCA8PSBwYXJhbXMubWF4QmFja2ZhY2VIaWRkZW5TbGlkZXMpIHtcbiAgICAgICAgICBpZiAoIWhhc0NsYXNzQmFja2ZhY2VDbGFzc0FkZGVkKSBzd2lwZXIuJGVsLmFkZENsYXNzKGJhY2tGYWNlSGlkZGVuQ2xhc3MpO1xuICAgICAgICB9IGVsc2UgaWYgKGhhc0NsYXNzQmFja2ZhY2VDbGFzc0FkZGVkKSB7XG4gICAgICAgICAgc3dpcGVyLiRlbC5yZW1vdmVDbGFzcyhiYWNrRmFjZUhpZGRlbkNsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUF1dG9IZWlnaHQoc3BlZWQpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBjb25zdCBhY3RpdmVTbGlkZXMgPSBbXTtcbiAgICAgIGNvbnN0IGlzVmlydHVhbCA9IHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkO1xuICAgICAgbGV0IG5ld0hlaWdodCA9IDA7XG4gICAgICBsZXQgaTtcblxuICAgICAgaWYgKHR5cGVvZiBzcGVlZCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgc3dpcGVyLnNldFRyYW5zaXRpb24oc3BlZWQpO1xuICAgICAgfSBlbHNlIGlmIChzcGVlZCA9PT0gdHJ1ZSkge1xuICAgICAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbihzd2lwZXIucGFyYW1zLnNwZWVkKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZ2V0U2xpZGVCeUluZGV4ID0gaW5kZXggPT4ge1xuICAgICAgICBpZiAoaXNWaXJ0dWFsKSB7XG4gICAgICAgICAgcmV0dXJuIHN3aXBlci5zbGlkZXMuZmlsdGVyKGVsID0+IHBhcnNlSW50KGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSwgMTApID09PSBpbmRleClbMF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3dpcGVyLnNsaWRlcy5lcShpbmRleClbMF07XG4gICAgICB9OyAvLyBGaW5kIHNsaWRlcyBjdXJyZW50bHkgaW4gdmlld1xuXG5cbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgIT09ICdhdXRvJyAmJiBzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgPiAxKSB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAgICAgKHN3aXBlci52aXNpYmxlU2xpZGVzIHx8ICQoW10pKS5lYWNoKHNsaWRlID0+IHtcbiAgICAgICAgICAgIGFjdGl2ZVNsaWRlcy5wdXNoKHNsaWRlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgTWF0aC5jZWlsKHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyk7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXggKyBpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID4gc3dpcGVyLnNsaWRlcy5sZW5ndGggJiYgIWlzVmlydHVhbCkgYnJlYWs7XG4gICAgICAgICAgICBhY3RpdmVTbGlkZXMucHVzaChnZXRTbGlkZUJ5SW5kZXgoaW5kZXgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjdGl2ZVNsaWRlcy5wdXNoKGdldFNsaWRlQnlJbmRleChzd2lwZXIuYWN0aXZlSW5kZXgpKTtcbiAgICAgIH0gLy8gRmluZCBuZXcgaGVpZ2h0IGZyb20gaGlnaGVzdCBzbGlkZSBpbiB2aWV3XG5cblxuICAgICAgZm9yIChpID0gMDsgaSA8IGFjdGl2ZVNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAodHlwZW9mIGFjdGl2ZVNsaWRlc1tpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBjb25zdCBoZWlnaHQgPSBhY3RpdmVTbGlkZXNbaV0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgIG5ld0hlaWdodCA9IGhlaWdodCA+IG5ld0hlaWdodCA/IGhlaWdodCA6IG5ld0hlaWdodDtcbiAgICAgICAgfVxuICAgICAgfSAvLyBVcGRhdGUgSGVpZ2h0XG5cblxuICAgICAgaWYgKG5ld0hlaWdodCB8fCBuZXdIZWlnaHQgPT09IDApIHN3aXBlci4kd3JhcHBlckVsLmNzcygnaGVpZ2h0JywgYCR7bmV3SGVpZ2h0fXB4YCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2xpZGVzT2Zmc2V0KCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGNvbnN0IHNsaWRlcyA9IHN3aXBlci5zbGlkZXM7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHNsaWRlc1tpXS5zd2lwZXJTbGlkZU9mZnNldCA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/IHNsaWRlc1tpXS5vZmZzZXRMZWZ0IDogc2xpZGVzW2ldLm9mZnNldFRvcDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVTbGlkZXNQcm9ncmVzcyh0cmFuc2xhdGUpIHtcbiAgICAgIGlmICh0cmFuc2xhdGUgPT09IHZvaWQgMCkge1xuICAgICAgICB0cmFuc2xhdGUgPSB0aGlzICYmIHRoaXMudHJhbnNsYXRlIHx8IDA7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICAgICAgY29uc3Qge1xuICAgICAgICBzbGlkZXMsXG4gICAgICAgIHJ0bFRyYW5zbGF0ZTogcnRsLFxuICAgICAgICBzbmFwR3JpZFxuICAgICAgfSA9IHN3aXBlcjtcbiAgICAgIGlmIChzbGlkZXMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICBpZiAodHlwZW9mIHNsaWRlc1swXS5zd2lwZXJTbGlkZU9mZnNldCA9PT0gJ3VuZGVmaW5lZCcpIHN3aXBlci51cGRhdGVTbGlkZXNPZmZzZXQoKTtcbiAgICAgIGxldCBvZmZzZXRDZW50ZXIgPSAtdHJhbnNsYXRlO1xuICAgICAgaWYgKHJ0bCkgb2Zmc2V0Q2VudGVyID0gdHJhbnNsYXRlOyAvLyBWaXNpYmxlIFNsaWRlc1xuXG4gICAgICBzbGlkZXMucmVtb3ZlQ2xhc3MocGFyYW1zLnNsaWRlVmlzaWJsZUNsYXNzKTtcbiAgICAgIHN3aXBlci52aXNpYmxlU2xpZGVzSW5kZXhlcyA9IFtdO1xuICAgICAgc3dpcGVyLnZpc2libGVTbGlkZXMgPSBbXTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3Qgc2xpZGUgPSBzbGlkZXNbaV07XG4gICAgICAgIGxldCBzbGlkZU9mZnNldCA9IHNsaWRlLnN3aXBlclNsaWRlT2Zmc2V0O1xuXG4gICAgICAgIGlmIChwYXJhbXMuY3NzTW9kZSAmJiBwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgICBzbGlkZU9mZnNldCAtPSBzbGlkZXNbMF0uc3dpcGVyU2xpZGVPZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzbGlkZVByb2dyZXNzID0gKG9mZnNldENlbnRlciArIChwYXJhbXMuY2VudGVyZWRTbGlkZXMgPyBzd2lwZXIubWluVHJhbnNsYXRlKCkgOiAwKSAtIHNsaWRlT2Zmc2V0KSAvIChzbGlkZS5zd2lwZXJTbGlkZVNpemUgKyBwYXJhbXMuc3BhY2VCZXR3ZWVuKTtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxTbGlkZVByb2dyZXNzID0gKG9mZnNldENlbnRlciAtIHNuYXBHcmlkWzBdICsgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcyA/IHN3aXBlci5taW5UcmFuc2xhdGUoKSA6IDApIC0gc2xpZGVPZmZzZXQpIC8gKHNsaWRlLnN3aXBlclNsaWRlU2l6ZSArIHBhcmFtcy5zcGFjZUJldHdlZW4pO1xuICAgICAgICBjb25zdCBzbGlkZUJlZm9yZSA9IC0ob2Zmc2V0Q2VudGVyIC0gc2xpZGVPZmZzZXQpO1xuICAgICAgICBjb25zdCBzbGlkZUFmdGVyID0gc2xpZGVCZWZvcmUgKyBzd2lwZXIuc2xpZGVzU2l6ZXNHcmlkW2ldO1xuICAgICAgICBjb25zdCBpc1Zpc2libGUgPSBzbGlkZUJlZm9yZSA+PSAwICYmIHNsaWRlQmVmb3JlIDwgc3dpcGVyLnNpemUgLSAxIHx8IHNsaWRlQWZ0ZXIgPiAxICYmIHNsaWRlQWZ0ZXIgPD0gc3dpcGVyLnNpemUgfHwgc2xpZGVCZWZvcmUgPD0gMCAmJiBzbGlkZUFmdGVyID49IHN3aXBlci5zaXplO1xuXG4gICAgICAgIGlmIChpc1Zpc2libGUpIHtcbiAgICAgICAgICBzd2lwZXIudmlzaWJsZVNsaWRlcy5wdXNoKHNsaWRlKTtcbiAgICAgICAgICBzd2lwZXIudmlzaWJsZVNsaWRlc0luZGV4ZXMucHVzaChpKTtcbiAgICAgICAgICBzbGlkZXMuZXEoaSkuYWRkQ2xhc3MocGFyYW1zLnNsaWRlVmlzaWJsZUNsYXNzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNsaWRlLnByb2dyZXNzID0gcnRsID8gLXNsaWRlUHJvZ3Jlc3MgOiBzbGlkZVByb2dyZXNzO1xuICAgICAgICBzbGlkZS5vcmlnaW5hbFByb2dyZXNzID0gcnRsID8gLW9yaWdpbmFsU2xpZGVQcm9ncmVzcyA6IG9yaWdpbmFsU2xpZGVQcm9ncmVzcztcbiAgICAgIH1cblxuICAgICAgc3dpcGVyLnZpc2libGVTbGlkZXMgPSAkKHN3aXBlci52aXNpYmxlU2xpZGVzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVQcm9ncmVzcyh0cmFuc2xhdGUpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG5cbiAgICAgIGlmICh0eXBlb2YgdHJhbnNsYXRlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zdCBtdWx0aXBsaWVyID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZSA/IC0xIDogMTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG5cbiAgICAgICAgdHJhbnNsYXRlID0gc3dpcGVyICYmIHN3aXBlci50cmFuc2xhdGUgJiYgc3dpcGVyLnRyYW5zbGF0ZSAqIG11bHRpcGxpZXIgfHwgMDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZXNEaWZmID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xuICAgICAgbGV0IHtcbiAgICAgICAgcHJvZ3Jlc3MsXG4gICAgICAgIGlzQmVnaW5uaW5nLFxuICAgICAgICBpc0VuZFxuICAgICAgfSA9IHN3aXBlcjtcbiAgICAgIGNvbnN0IHdhc0JlZ2lubmluZyA9IGlzQmVnaW5uaW5nO1xuICAgICAgY29uc3Qgd2FzRW5kID0gaXNFbmQ7XG5cbiAgICAgIGlmICh0cmFuc2xhdGVzRGlmZiA9PT0gMCkge1xuICAgICAgICBwcm9ncmVzcyA9IDA7XG4gICAgICAgIGlzQmVnaW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgaXNFbmQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvZ3Jlc3MgPSAodHJhbnNsYXRlIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSAvIHRyYW5zbGF0ZXNEaWZmO1xuICAgICAgICBpc0JlZ2lubmluZyA9IHByb2dyZXNzIDw9IDA7XG4gICAgICAgIGlzRW5kID0gcHJvZ3Jlc3MgPj0gMTtcbiAgICAgIH1cblxuICAgICAgT2JqZWN0LmFzc2lnbihzd2lwZXIsIHtcbiAgICAgICAgcHJvZ3Jlc3MsXG4gICAgICAgIGlzQmVnaW5uaW5nLFxuICAgICAgICBpc0VuZFxuICAgICAgfSk7XG4gICAgICBpZiAocGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MgfHwgcGFyYW1zLmNlbnRlcmVkU2xpZGVzICYmIHBhcmFtcy5hdXRvSGVpZ2h0KSBzd2lwZXIudXBkYXRlU2xpZGVzUHJvZ3Jlc3ModHJhbnNsYXRlKTtcblxuICAgICAgaWYgKGlzQmVnaW5uaW5nICYmICF3YXNCZWdpbm5pbmcpIHtcbiAgICAgICAgc3dpcGVyLmVtaXQoJ3JlYWNoQmVnaW5uaW5nIHRvRWRnZScpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNFbmQgJiYgIXdhc0VuZCkge1xuICAgICAgICBzd2lwZXIuZW1pdCgncmVhY2hFbmQgdG9FZGdlJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh3YXNCZWdpbm5pbmcgJiYgIWlzQmVnaW5uaW5nIHx8IHdhc0VuZCAmJiAhaXNFbmQpIHtcbiAgICAgICAgc3dpcGVyLmVtaXQoJ2Zyb21FZGdlJyk7XG4gICAgICB9XG5cbiAgICAgIHN3aXBlci5lbWl0KCdwcm9ncmVzcycsIHByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVTbGlkZXNDbGFzc2VzKCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgc2xpZGVzLFxuICAgICAgICBwYXJhbXMsXG4gICAgICAgICR3cmFwcGVyRWwsXG4gICAgICAgIGFjdGl2ZUluZGV4LFxuICAgICAgICByZWFsSW5kZXhcbiAgICAgIH0gPSBzd2lwZXI7XG4gICAgICBjb25zdCBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBwYXJhbXMudmlydHVhbC5lbmFibGVkO1xuICAgICAgc2xpZGVzLnJlbW92ZUNsYXNzKGAke3BhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzfSAke3BhcmFtcy5zbGlkZU5leHRDbGFzc30gJHtwYXJhbXMuc2xpZGVQcmV2Q2xhc3N9ICR7cGFyYW1zLnNsaWRlRHVwbGljYXRlQWN0aXZlQ2xhc3N9ICR7cGFyYW1zLnNsaWRlRHVwbGljYXRlTmV4dENsYXNzfSAke3BhcmFtcy5zbGlkZUR1cGxpY2F0ZVByZXZDbGFzc31gKTtcbiAgICAgIGxldCBhY3RpdmVTbGlkZTtcblxuICAgICAgaWYgKGlzVmlydHVhbCkge1xuICAgICAgICBhY3RpdmVTbGlkZSA9IHN3aXBlci4kd3JhcHBlckVsLmZpbmQoYC4ke3BhcmFtcy5zbGlkZUNsYXNzfVtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIiR7YWN0aXZlSW5kZXh9XCJdYCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhY3RpdmVTbGlkZSA9IHNsaWRlcy5lcShhY3RpdmVJbmRleCk7XG4gICAgICB9IC8vIEFjdGl2ZSBjbGFzc2VzXG5cblxuICAgICAgYWN0aXZlU2xpZGUuYWRkQ2xhc3MocGFyYW1zLnNsaWRlQWN0aXZlQ2xhc3MpO1xuXG4gICAgICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICAgICAgLy8gRHVwbGljYXRlIHRvIGFsbCBsb29wZWQgc2xpZGVzXG4gICAgICAgIGlmIChhY3RpdmVTbGlkZS5oYXNDbGFzcyhwYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpIHtcbiAgICAgICAgICAkd3JhcHBlckVsLmNoaWxkcmVuKGAuJHtwYXJhbXMuc2xpZGVDbGFzc306bm90KC4ke3BhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzfSlbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke3JlYWxJbmRleH1cIl1gKS5hZGRDbGFzcyhwYXJhbXMuc2xpZGVEdXBsaWNhdGVBY3RpdmVDbGFzcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHdyYXBwZXJFbC5jaGlsZHJlbihgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9LiR7cGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3N9W2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJHtyZWFsSW5kZXh9XCJdYCkuYWRkQ2xhc3MocGFyYW1zLnNsaWRlRHVwbGljYXRlQWN0aXZlQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9IC8vIE5leHQgU2xpZGVcblxuXG4gICAgICBsZXQgbmV4dFNsaWRlID0gYWN0aXZlU2xpZGUubmV4dEFsbChgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9YCkuZXEoMCkuYWRkQ2xhc3MocGFyYW1zLnNsaWRlTmV4dENsYXNzKTtcblxuICAgICAgaWYgKHBhcmFtcy5sb29wICYmIG5leHRTbGlkZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgbmV4dFNsaWRlID0gc2xpZGVzLmVxKDApO1xuICAgICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MocGFyYW1zLnNsaWRlTmV4dENsYXNzKTtcbiAgICAgIH0gLy8gUHJldiBTbGlkZVxuXG5cbiAgICAgIGxldCBwcmV2U2xpZGUgPSBhY3RpdmVTbGlkZS5wcmV2QWxsKGAuJHtwYXJhbXMuc2xpZGVDbGFzc31gKS5lcSgwKS5hZGRDbGFzcyhwYXJhbXMuc2xpZGVQcmV2Q2xhc3MpO1xuXG4gICAgICBpZiAocGFyYW1zLmxvb3AgJiYgcHJldlNsaWRlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBwcmV2U2xpZGUgPSBzbGlkZXMuZXEoLTEpO1xuICAgICAgICBwcmV2U2xpZGUuYWRkQ2xhc3MocGFyYW1zLnNsaWRlUHJldkNsYXNzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICAgIC8vIER1cGxpY2F0ZSB0byBhbGwgbG9vcGVkIHNsaWRlc1xuICAgICAgICBpZiAobmV4dFNsaWRlLmhhc0NsYXNzKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSkge1xuICAgICAgICAgICR3cmFwcGVyRWwuY2hpbGRyZW4oYC4ke3BhcmFtcy5zbGlkZUNsYXNzfTpub3QoLiR7cGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3N9KVtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIiR7bmV4dFNsaWRlLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4Jyl9XCJdYCkuYWRkQ2xhc3MocGFyYW1zLnNsaWRlRHVwbGljYXRlTmV4dENsYXNzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkd3JhcHBlckVsLmNoaWxkcmVuKGAuJHtwYXJhbXMuc2xpZGVDbGFzc30uJHtwYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzc31bZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke25leHRTbGlkZS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpfVwiXWApLmFkZENsYXNzKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZU5leHRDbGFzcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJldlNsaWRlLmhhc0NsYXNzKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSkge1xuICAgICAgICAgICR3cmFwcGVyRWwuY2hpbGRyZW4oYC4ke3BhcmFtcy5zbGlkZUNsYXNzfTpub3QoLiR7cGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3N9KVtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIiR7cHJldlNsaWRlLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4Jyl9XCJdYCkuYWRkQ2xhc3MocGFyYW1zLnNsaWRlRHVwbGljYXRlUHJldkNsYXNzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkd3JhcHBlckVsLmNoaWxkcmVuKGAuJHtwYXJhbXMuc2xpZGVDbGFzc30uJHtwYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzc31bZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke3ByZXZTbGlkZS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpfVwiXWApLmFkZENsYXNzKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZVByZXZDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc3dpcGVyLmVtaXRTbGlkZXNDbGFzc2VzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQWN0aXZlSW5kZXgobmV3QWN0aXZlSW5kZXgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBjb25zdCB0cmFuc2xhdGUgPSBzd2lwZXIucnRsVHJhbnNsYXRlID8gc3dpcGVyLnRyYW5zbGF0ZSA6IC1zd2lwZXIudHJhbnNsYXRlO1xuICAgICAgY29uc3Qge1xuICAgICAgICBzbGlkZXNHcmlkLFxuICAgICAgICBzbmFwR3JpZCxcbiAgICAgICAgcGFyYW1zLFxuICAgICAgICBhY3RpdmVJbmRleDogcHJldmlvdXNJbmRleCxcbiAgICAgICAgcmVhbEluZGV4OiBwcmV2aW91c1JlYWxJbmRleCxcbiAgICAgICAgc25hcEluZGV4OiBwcmV2aW91c1NuYXBJbmRleFxuICAgICAgfSA9IHN3aXBlcjtcbiAgICAgIGxldCBhY3RpdmVJbmRleCA9IG5ld0FjdGl2ZUluZGV4O1xuICAgICAgbGV0IHNuYXBJbmRleDtcblxuICAgICAgaWYgKHR5cGVvZiBhY3RpdmVJbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXNHcmlkLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBzbGlkZXNHcmlkW2kgKyAxXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmICh0cmFuc2xhdGUgPj0gc2xpZGVzR3JpZFtpXSAmJiB0cmFuc2xhdGUgPCBzbGlkZXNHcmlkW2kgKyAxXSAtIChzbGlkZXNHcmlkW2kgKyAxXSAtIHNsaWRlc0dyaWRbaV0pIC8gMikge1xuICAgICAgICAgICAgICBhY3RpdmVJbmRleCA9IGk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRyYW5zbGF0ZSA+PSBzbGlkZXNHcmlkW2ldICYmIHRyYW5zbGF0ZSA8IHNsaWRlc0dyaWRbaSArIDFdKSB7XG4gICAgICAgICAgICAgIGFjdGl2ZUluZGV4ID0gaSArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmICh0cmFuc2xhdGUgPj0gc2xpZGVzR3JpZFtpXSkge1xuICAgICAgICAgICAgYWN0aXZlSW5kZXggPSBpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSAvLyBOb3JtYWxpemUgc2xpZGVJbmRleFxuXG5cbiAgICAgICAgaWYgKHBhcmFtcy5ub3JtYWxpemVTbGlkZUluZGV4KSB7XG4gICAgICAgICAgaWYgKGFjdGl2ZUluZGV4IDwgMCB8fCB0eXBlb2YgYWN0aXZlSW5kZXggPT09ICd1bmRlZmluZWQnKSBhY3RpdmVJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHNuYXBHcmlkLmluZGV4T2YodHJhbnNsYXRlKSA+PSAwKSB7XG4gICAgICAgIHNuYXBJbmRleCA9IHNuYXBHcmlkLmluZGV4T2YodHJhbnNsYXRlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHNraXAgPSBNYXRoLm1pbihwYXJhbXMuc2xpZGVzUGVyR3JvdXBTa2lwLCBhY3RpdmVJbmRleCk7XG4gICAgICAgIHNuYXBJbmRleCA9IHNraXAgKyBNYXRoLmZsb29yKChhY3RpdmVJbmRleCAtIHNraXApIC8gcGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNuYXBJbmRleCA+PSBzbmFwR3JpZC5sZW5ndGgpIHNuYXBJbmRleCA9IHNuYXBHcmlkLmxlbmd0aCAtIDE7XG5cbiAgICAgIGlmIChhY3RpdmVJbmRleCA9PT0gcHJldmlvdXNJbmRleCkge1xuICAgICAgICBpZiAoc25hcEluZGV4ICE9PSBwcmV2aW91c1NuYXBJbmRleCkge1xuICAgICAgICAgIHN3aXBlci5zbmFwSW5kZXggPSBzbmFwSW5kZXg7XG4gICAgICAgICAgc3dpcGVyLmVtaXQoJ3NuYXBJbmRleENoYW5nZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBHZXQgcmVhbCBpbmRleFxuXG5cbiAgICAgIGNvbnN0IHJlYWxJbmRleCA9IHBhcnNlSW50KHN3aXBlci5zbGlkZXMuZXEoYWN0aXZlSW5kZXgpLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JykgfHwgYWN0aXZlSW5kZXgsIDEwKTtcbiAgICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLCB7XG4gICAgICAgIHNuYXBJbmRleCxcbiAgICAgICAgcmVhbEluZGV4LFxuICAgICAgICBwcmV2aW91c0luZGV4LFxuICAgICAgICBhY3RpdmVJbmRleFxuICAgICAgfSk7XG4gICAgICBzd2lwZXIuZW1pdCgnYWN0aXZlSW5kZXhDaGFuZ2UnKTtcbiAgICAgIHN3aXBlci5lbWl0KCdzbmFwSW5kZXhDaGFuZ2UnKTtcblxuICAgICAgaWYgKHByZXZpb3VzUmVhbEluZGV4ICE9PSByZWFsSW5kZXgpIHtcbiAgICAgICAgc3dpcGVyLmVtaXQoJ3JlYWxJbmRleENoYW5nZScpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3dpcGVyLmluaXRpYWxpemVkIHx8IHN3aXBlci5wYXJhbXMucnVuQ2FsbGJhY2tzT25Jbml0KSB7XG4gICAgICAgIHN3aXBlci5lbWl0KCdzbGlkZUNoYW5nZScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNsaWNrZWRTbGlkZShlKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgICAgIGNvbnN0IHNsaWRlID0gJChlKS5jbG9zZXN0KGAuJHtwYXJhbXMuc2xpZGVDbGFzc31gKVswXTtcbiAgICAgIGxldCBzbGlkZUZvdW5kID0gZmFsc2U7XG4gICAgICBsZXQgc2xpZGVJbmRleDtcblxuICAgICAgaWYgKHNsaWRlKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dpcGVyLnNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGlmIChzd2lwZXIuc2xpZGVzW2ldID09PSBzbGlkZSkge1xuICAgICAgICAgICAgc2xpZGVGb3VuZCA9IHRydWU7XG4gICAgICAgICAgICBzbGlkZUluZGV4ID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc2xpZGUgJiYgc2xpZGVGb3VuZCkge1xuICAgICAgICBzd2lwZXIuY2xpY2tlZFNsaWRlID0gc2xpZGU7XG5cbiAgICAgICAgaWYgKHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkKSB7XG4gICAgICAgICAgc3dpcGVyLmNsaWNrZWRJbmRleCA9IHBhcnNlSW50KCQoc2xpZGUpLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JyksIDEwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzd2lwZXIuY2xpY2tlZEluZGV4ID0gc2xpZGVJbmRleDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpcGVyLmNsaWNrZWRTbGlkZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgc3dpcGVyLmNsaWNrZWRJbmRleCA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFyYW1zLnNsaWRlVG9DbGlja2VkU2xpZGUgJiYgc3dpcGVyLmNsaWNrZWRJbmRleCAhPT0gdW5kZWZpbmVkICYmIHN3aXBlci5jbGlja2VkSW5kZXggIT09IHN3aXBlci5hY3RpdmVJbmRleCkge1xuICAgICAgICBzd2lwZXIuc2xpZGVUb0NsaWNrZWRTbGlkZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciB1cGRhdGUgPSB7XG4gICAgICB1cGRhdGVTaXplLFxuICAgICAgdXBkYXRlU2xpZGVzLFxuICAgICAgdXBkYXRlQXV0b0hlaWdodCxcbiAgICAgIHVwZGF0ZVNsaWRlc09mZnNldCxcbiAgICAgIHVwZGF0ZVNsaWRlc1Byb2dyZXNzLFxuICAgICAgdXBkYXRlUHJvZ3Jlc3MsXG4gICAgICB1cGRhdGVTbGlkZXNDbGFzc2VzLFxuICAgICAgdXBkYXRlQWN0aXZlSW5kZXgsXG4gICAgICB1cGRhdGVDbGlja2VkU2xpZGVcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0U3dpcGVyVHJhbnNsYXRlKGF4aXMpIHtcbiAgICAgIGlmIChheGlzID09PSB2b2lkIDApIHtcbiAgICAgICAgYXhpcyA9IHRoaXMuaXNIb3Jpem9udGFsKCkgPyAneCcgOiAneSc7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgcnRsVHJhbnNsYXRlOiBydGwsXG4gICAgICAgIHRyYW5zbGF0ZSxcbiAgICAgICAgJHdyYXBwZXJFbFxuICAgICAgfSA9IHN3aXBlcjtcblxuICAgICAgaWYgKHBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlKSB7XG4gICAgICAgIHJldHVybiBydGwgPyAtdHJhbnNsYXRlIDogdHJhbnNsYXRlO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IGN1cnJlbnRUcmFuc2xhdGUgPSBnZXRUcmFuc2xhdGUoJHdyYXBwZXJFbFswXSwgYXhpcyk7XG4gICAgICBpZiAocnRsKSBjdXJyZW50VHJhbnNsYXRlID0gLWN1cnJlbnRUcmFuc2xhdGU7XG4gICAgICByZXR1cm4gY3VycmVudFRyYW5zbGF0ZSB8fCAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFRyYW5zbGF0ZSh0cmFuc2xhdGUsIGJ5Q29udHJvbGxlcikge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgcnRsVHJhbnNsYXRlOiBydGwsXG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgJHdyYXBwZXJFbCxcbiAgICAgICAgd3JhcHBlckVsLFxuICAgICAgICBwcm9ncmVzc1xuICAgICAgfSA9IHN3aXBlcjtcbiAgICAgIGxldCB4ID0gMDtcbiAgICAgIGxldCB5ID0gMDtcbiAgICAgIGNvbnN0IHogPSAwO1xuXG4gICAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgIHggPSBydGwgPyAtdHJhbnNsYXRlIDogdHJhbnNsYXRlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeSA9IHRyYW5zbGF0ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcmFtcy5yb3VuZExlbmd0aHMpIHtcbiAgICAgICAgeCA9IE1hdGguZmxvb3IoeCk7XG4gICAgICAgIHkgPSBNYXRoLmZsb29yKHkpO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgd3JhcHBlckVsW3N3aXBlci5pc0hvcml6b250YWwoKSA/ICdzY3JvbGxMZWZ0JyA6ICdzY3JvbGxUb3AnXSA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/IC14IDogLXk7XG4gICAgICB9IGVsc2UgaWYgKCFwYXJhbXMudmlydHVhbFRyYW5zbGF0ZSkge1xuICAgICAgICAkd3JhcHBlckVsLnRyYW5zZm9ybShgdHJhbnNsYXRlM2QoJHt4fXB4LCAke3l9cHgsICR7en1weClgKTtcbiAgICAgIH1cblxuICAgICAgc3dpcGVyLnByZXZpb3VzVHJhbnNsYXRlID0gc3dpcGVyLnRyYW5zbGF0ZTtcbiAgICAgIHN3aXBlci50cmFuc2xhdGUgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyB4IDogeTsgLy8gQ2hlY2sgaWYgd2UgbmVlZCB0byB1cGRhdGUgcHJvZ3Jlc3NcblxuICAgICAgbGV0IG5ld1Byb2dyZXNzO1xuICAgICAgY29uc3QgdHJhbnNsYXRlc0RpZmYgPSBzd2lwZXIubWF4VHJhbnNsYXRlKCkgLSBzd2lwZXIubWluVHJhbnNsYXRlKCk7XG5cbiAgICAgIGlmICh0cmFuc2xhdGVzRGlmZiA9PT0gMCkge1xuICAgICAgICBuZXdQcm9ncmVzcyA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdQcm9ncmVzcyA9ICh0cmFuc2xhdGUgLSBzd2lwZXIubWluVHJhbnNsYXRlKCkpIC8gdHJhbnNsYXRlc0RpZmY7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdQcm9ncmVzcyAhPT0gcHJvZ3Jlc3MpIHtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKHRyYW5zbGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIHN3aXBlci5lbWl0KCdzZXRUcmFuc2xhdGUnLCBzd2lwZXIudHJhbnNsYXRlLCBieUNvbnRyb2xsZXIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1pblRyYW5zbGF0ZSgpIHtcbiAgICAgIHJldHVybiAtdGhpcy5zbmFwR3JpZFswXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXhUcmFuc2xhdGUoKSB7XG4gICAgICByZXR1cm4gLXRoaXMuc25hcEdyaWRbdGhpcy5zbmFwR3JpZC5sZW5ndGggLSAxXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVUbyh0cmFuc2xhdGUsIHNwZWVkLCBydW5DYWxsYmFja3MsIHRyYW5zbGF0ZUJvdW5kcywgaW50ZXJuYWwpIHtcbiAgICAgIGlmICh0cmFuc2xhdGUgPT09IHZvaWQgMCkge1xuICAgICAgICB0cmFuc2xhdGUgPSAwO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3BlZWQgPT09IHZvaWQgMCkge1xuICAgICAgICBzcGVlZCA9IHRoaXMucGFyYW1zLnNwZWVkO1xuICAgICAgfVxuXG4gICAgICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHtcbiAgICAgICAgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRyYW5zbGF0ZUJvdW5kcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHRyYW5zbGF0ZUJvdW5kcyA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgd3JhcHBlckVsXG4gICAgICB9ID0gc3dpcGVyO1xuXG4gICAgICBpZiAoc3dpcGVyLmFuaW1hdGluZyAmJiBwYXJhbXMucHJldmVudEludGVyYWN0aW9uT25UcmFuc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWluVHJhbnNsYXRlID0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xuICAgICAgY29uc3QgbWF4VHJhbnNsYXRlID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpO1xuICAgICAgbGV0IG5ld1RyYW5zbGF0ZTtcbiAgICAgIGlmICh0cmFuc2xhdGVCb3VuZHMgJiYgdHJhbnNsYXRlID4gbWluVHJhbnNsYXRlKSBuZXdUcmFuc2xhdGUgPSBtaW5UcmFuc2xhdGU7ZWxzZSBpZiAodHJhbnNsYXRlQm91bmRzICYmIHRyYW5zbGF0ZSA8IG1heFRyYW5zbGF0ZSkgbmV3VHJhbnNsYXRlID0gbWF4VHJhbnNsYXRlO2Vsc2UgbmV3VHJhbnNsYXRlID0gdHJhbnNsYXRlOyAvLyBVcGRhdGUgcHJvZ3Jlc3NcblxuICAgICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKG5ld1RyYW5zbGF0ZSk7XG5cbiAgICAgIGlmIChwYXJhbXMuY3NzTW9kZSkge1xuICAgICAgICBjb25zdCBpc0ggPSBzd2lwZXIuaXNIb3Jpem9udGFsKCk7XG5cbiAgICAgICAgaWYgKHNwZWVkID09PSAwKSB7XG4gICAgICAgICAgd3JhcHBlckVsW2lzSCA/ICdzY3JvbGxMZWZ0JyA6ICdzY3JvbGxUb3AnXSA9IC1uZXdUcmFuc2xhdGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCFzd2lwZXIuc3VwcG9ydC5zbW9vdGhTY3JvbGwpIHtcbiAgICAgICAgICAgIGFuaW1hdGVDU1NNb2RlU2Nyb2xsKHtcbiAgICAgICAgICAgICAgc3dpcGVyLFxuICAgICAgICAgICAgICB0YXJnZXRQb3NpdGlvbjogLW5ld1RyYW5zbGF0ZSxcbiAgICAgICAgICAgICAgc2lkZTogaXNIID8gJ2xlZnQnIDogJ3RvcCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgd3JhcHBlckVsLnNjcm9sbFRvKHtcbiAgICAgICAgICAgIFtpc0ggPyAnbGVmdCcgOiAndG9wJ106IC1uZXdUcmFuc2xhdGUsXG4gICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3BlZWQgPT09IDApIHtcbiAgICAgICAgc3dpcGVyLnNldFRyYW5zaXRpb24oMCk7XG4gICAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUobmV3VHJhbnNsYXRlKTtcblxuICAgICAgICBpZiAocnVuQ2FsbGJhY2tzKSB7XG4gICAgICAgICAgc3dpcGVyLmVtaXQoJ2JlZm9yZVRyYW5zaXRpb25TdGFydCcsIHNwZWVkLCBpbnRlcm5hbCk7XG4gICAgICAgICAgc3dpcGVyLmVtaXQoJ3RyYW5zaXRpb25FbmQnKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpcGVyLnNldFRyYW5zaXRpb24oc3BlZWQpO1xuICAgICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKG5ld1RyYW5zbGF0ZSk7XG5cbiAgICAgICAgaWYgKHJ1bkNhbGxiYWNrcykge1xuICAgICAgICAgIHN3aXBlci5lbWl0KCdiZWZvcmVUcmFuc2l0aW9uU3RhcnQnLCBzcGVlZCwgaW50ZXJuYWwpO1xuICAgICAgICAgIHN3aXBlci5lbWl0KCd0cmFuc2l0aW9uU3RhcnQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3dpcGVyLmFuaW1hdGluZykge1xuICAgICAgICAgIHN3aXBlci5hbmltYXRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgaWYgKCFzd2lwZXIub25UcmFuc2xhdGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKSB7XG4gICAgICAgICAgICBzd2lwZXIub25UcmFuc2xhdGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kID0gZnVuY3Rpb24gdHJhbnNpdGlvbkVuZChlKSB7XG4gICAgICAgICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSB0aGlzKSByZXR1cm47XG4gICAgICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsWzBdLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBzd2lwZXIub25UcmFuc2xhdGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKTtcbiAgICAgICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWxbMF0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIHN3aXBlci5vblRyYW5zbGF0ZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpO1xuICAgICAgICAgICAgICBzd2lwZXIub25UcmFuc2xhdGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kID0gbnVsbDtcbiAgICAgICAgICAgICAgZGVsZXRlIHN3aXBlci5vblRyYW5zbGF0ZVRvV3JhcHBlclRyYW5zaXRpb25FbmQ7XG5cbiAgICAgICAgICAgICAgaWYgKHJ1bkNhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgIHN3aXBlci5lbWl0KCd0cmFuc2l0aW9uRW5kJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWxbMF0uYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHN3aXBlci5vblRyYW5zbGF0ZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpO1xuICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBzd2lwZXIub25UcmFuc2xhdGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgdHJhbnNsYXRlID0ge1xuICAgICAgZ2V0VHJhbnNsYXRlOiBnZXRTd2lwZXJUcmFuc2xhdGUsXG4gICAgICBzZXRUcmFuc2xhdGUsXG4gICAgICBtaW5UcmFuc2xhdGUsXG4gICAgICBtYXhUcmFuc2xhdGUsXG4gICAgICB0cmFuc2xhdGVUb1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZXRUcmFuc2l0aW9uKGR1cmF0aW9uLCBieUNvbnRyb2xsZXIpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG5cbiAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICAgIHN3aXBlci4kd3JhcHBlckVsLnRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgICAgfVxuXG4gICAgICBzd2lwZXIuZW1pdCgnc2V0VHJhbnNpdGlvbicsIGR1cmF0aW9uLCBieUNvbnRyb2xsZXIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zaXRpb25FbWl0KF9yZWYpIHtcbiAgICAgIGxldCB7XG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgcnVuQ2FsbGJhY2tzLFxuICAgICAgICBkaXJlY3Rpb24sXG4gICAgICAgIHN0ZXBcbiAgICAgIH0gPSBfcmVmO1xuICAgICAgY29uc3Qge1xuICAgICAgICBhY3RpdmVJbmRleCxcbiAgICAgICAgcHJldmlvdXNJbmRleFxuICAgICAgfSA9IHN3aXBlcjtcbiAgICAgIGxldCBkaXIgPSBkaXJlY3Rpb247XG5cbiAgICAgIGlmICghZGlyKSB7XG4gICAgICAgIGlmIChhY3RpdmVJbmRleCA+IHByZXZpb3VzSW5kZXgpIGRpciA9ICduZXh0JztlbHNlIGlmIChhY3RpdmVJbmRleCA8IHByZXZpb3VzSW5kZXgpIGRpciA9ICdwcmV2JztlbHNlIGRpciA9ICdyZXNldCc7XG4gICAgICB9XG5cbiAgICAgIHN3aXBlci5lbWl0KGB0cmFuc2l0aW9uJHtzdGVwfWApO1xuXG4gICAgICBpZiAocnVuQ2FsbGJhY2tzICYmIGFjdGl2ZUluZGV4ICE9PSBwcmV2aW91c0luZGV4KSB7XG4gICAgICAgIGlmIChkaXIgPT09ICdyZXNldCcpIHtcbiAgICAgICAgICBzd2lwZXIuZW1pdChgc2xpZGVSZXNldFRyYW5zaXRpb24ke3N0ZXB9YCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpcGVyLmVtaXQoYHNsaWRlQ2hhbmdlVHJhbnNpdGlvbiR7c3RlcH1gKTtcblxuICAgICAgICBpZiAoZGlyID09PSAnbmV4dCcpIHtcbiAgICAgICAgICBzd2lwZXIuZW1pdChgc2xpZGVOZXh0VHJhbnNpdGlvbiR7c3RlcH1gKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzd2lwZXIuZW1pdChgc2xpZGVQcmV2VHJhbnNpdGlvbiR7c3RlcH1gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zaXRpb25TdGFydChydW5DYWxsYmFja3MsIGRpcmVjdGlvbikge1xuICAgICAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHBhcmFtc1xuICAgICAgfSA9IHN3aXBlcjtcbiAgICAgIGlmIChwYXJhbXMuY3NzTW9kZSkgcmV0dXJuO1xuXG4gICAgICBpZiAocGFyYW1zLmF1dG9IZWlnaHQpIHtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZUF1dG9IZWlnaHQoKTtcbiAgICAgIH1cblxuICAgICAgdHJhbnNpdGlvbkVtaXQoe1xuICAgICAgICBzd2lwZXIsXG4gICAgICAgIHJ1bkNhbGxiYWNrcyxcbiAgICAgICAgZGlyZWN0aW9uLFxuICAgICAgICBzdGVwOiAnU3RhcnQnXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2l0aW9uRW5kKHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKSB7XG4gICAgICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHtcbiAgICAgICAgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgcGFyYW1zXG4gICAgICB9ID0gc3dpcGVyO1xuICAgICAgc3dpcGVyLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgaWYgKHBhcmFtcy5jc3NNb2RlKSByZXR1cm47XG4gICAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbigwKTtcbiAgICAgIHRyYW5zaXRpb25FbWl0KHtcbiAgICAgICAgc3dpcGVyLFxuICAgICAgICBydW5DYWxsYmFja3MsXG4gICAgICAgIGRpcmVjdGlvbixcbiAgICAgICAgc3RlcDogJ0VuZCdcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciB0cmFuc2l0aW9uID0ge1xuICAgICAgc2V0VHJhbnNpdGlvbixcbiAgICAgIHRyYW5zaXRpb25TdGFydCxcbiAgICAgIHRyYW5zaXRpb25FbmRcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2xpZGVUbyhpbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwsIGluaXRpYWwpIHtcbiAgICAgIGlmIChpbmRleCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGluZGV4ID0gMDtcbiAgICAgIH1cblxuICAgICAgaWYgKHNwZWVkID09PSB2b2lkIDApIHtcbiAgICAgICAgc3BlZWQgPSB0aGlzLnBhcmFtcy5zcGVlZDtcbiAgICAgIH1cblxuICAgICAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInICYmIHR5cGVvZiBpbmRleCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJ2luZGV4JyBhcmd1bWVudCBjYW5ub3QgaGF2ZSB0eXBlIG90aGVyIHRoYW4gJ251bWJlcicgb3IgJ3N0cmluZycuIFske3R5cGVvZiBpbmRleH1dIGdpdmVuLmApO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGluZGV4ID09PSAnc3RyaW5nJykge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGBpbmRleGAgYXJndW1lbnQgY29udmVydGVkIGZyb20gYHN0cmluZ2AgdG8gYG51bWJlcmAuXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBpbmRleEFzTnVtYmVyID0gcGFyc2VJbnQoaW5kZXgsIDEwKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERldGVybWluZXMgd2hldGhlciB0aGUgYGluZGV4YCBhcmd1bWVudCBpcyBhIHZhbGlkIGBudW1iZXJgXG4gICAgICAgICAqIGFmdGVyIGJlaW5nIGNvbnZlcnRlZCBmcm9tIHRoZSBgc3RyaW5nYCB0eXBlLlxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG5cbiAgICAgICAgY29uc3QgaXNWYWxpZE51bWJlciA9IGlzRmluaXRlKGluZGV4QXNOdW1iZXIpO1xuXG4gICAgICAgIGlmICghaXNWYWxpZE51bWJlcikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHBhc3NlZC1pbiAnaW5kZXgnIChzdHJpbmcpIGNvdWxkbid0IGJlIGNvbnZlcnRlZCB0byAnbnVtYmVyJy4gWyR7aW5kZXh9XSBnaXZlbi5gKTtcbiAgICAgICAgfSAvLyBLbm93aW5nIHRoYXQgdGhlIGNvbnZlcnRlZCBgaW5kZXhgIGlzIGEgdmFsaWQgbnVtYmVyLFxuICAgICAgICAvLyB3ZSBjYW4gdXBkYXRlIHRoZSBvcmlnaW5hbCBhcmd1bWVudCdzIHZhbHVlLlxuXG5cbiAgICAgICAgaW5kZXggPSBpbmRleEFzTnVtYmVyO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgbGV0IHNsaWRlSW5kZXggPSBpbmRleDtcbiAgICAgIGlmIChzbGlkZUluZGV4IDwgMCkgc2xpZGVJbmRleCA9IDA7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgc25hcEdyaWQsXG4gICAgICAgIHNsaWRlc0dyaWQsXG4gICAgICAgIHByZXZpb3VzSW5kZXgsXG4gICAgICAgIGFjdGl2ZUluZGV4LFxuICAgICAgICBydGxUcmFuc2xhdGU6IHJ0bCxcbiAgICAgICAgd3JhcHBlckVsLFxuICAgICAgICBlbmFibGVkXG4gICAgICB9ID0gc3dpcGVyO1xuXG4gICAgICBpZiAoc3dpcGVyLmFuaW1hdGluZyAmJiBwYXJhbXMucHJldmVudEludGVyYWN0aW9uT25UcmFuc2l0aW9uIHx8ICFlbmFibGVkICYmICFpbnRlcm5hbCAmJiAhaW5pdGlhbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNraXAgPSBNYXRoLm1pbihzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwU2tpcCwgc2xpZGVJbmRleCk7XG4gICAgICBsZXQgc25hcEluZGV4ID0gc2tpcCArIE1hdGguZmxvb3IoKHNsaWRlSW5kZXggLSBza2lwKSAvIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXApO1xuICAgICAgaWYgKHNuYXBJbmRleCA+PSBzbmFwR3JpZC5sZW5ndGgpIHNuYXBJbmRleCA9IHNuYXBHcmlkLmxlbmd0aCAtIDE7XG5cbiAgICAgIGlmICgoYWN0aXZlSW5kZXggfHwgcGFyYW1zLmluaXRpYWxTbGlkZSB8fCAwKSA9PT0gKHByZXZpb3VzSW5kZXggfHwgMCkgJiYgcnVuQ2FsbGJhY2tzKSB7XG4gICAgICAgIHN3aXBlci5lbWl0KCdiZWZvcmVTbGlkZUNoYW5nZVN0YXJ0Jyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IC1zbmFwR3JpZFtzbmFwSW5kZXhdOyAvLyBVcGRhdGUgcHJvZ3Jlc3NcblxuICAgICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKHRyYW5zbGF0ZSk7IC8vIE5vcm1hbGl6ZSBzbGlkZUluZGV4XG5cbiAgICAgIGlmIChwYXJhbXMubm9ybWFsaXplU2xpZGVJbmRleCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlc0dyaWQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBub3JtYWxpemVkVHJhbnNsYXRlID0gLU1hdGguZmxvb3IodHJhbnNsYXRlICogMTAwKTtcbiAgICAgICAgICBjb25zdCBub3JtYWxpemVkR3JpZCA9IE1hdGguZmxvb3Ioc2xpZGVzR3JpZFtpXSAqIDEwMCk7XG4gICAgICAgICAgY29uc3Qgbm9ybWFsaXplZEdyaWROZXh0ID0gTWF0aC5mbG9vcihzbGlkZXNHcmlkW2kgKyAxXSAqIDEwMCk7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIHNsaWRlc0dyaWRbaSArIDFdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWRUcmFuc2xhdGUgPj0gbm9ybWFsaXplZEdyaWQgJiYgbm9ybWFsaXplZFRyYW5zbGF0ZSA8IG5vcm1hbGl6ZWRHcmlkTmV4dCAtIChub3JtYWxpemVkR3JpZE5leHQgLSBub3JtYWxpemVkR3JpZCkgLyAyKSB7XG4gICAgICAgICAgICAgIHNsaWRlSW5kZXggPSBpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChub3JtYWxpemVkVHJhbnNsYXRlID49IG5vcm1hbGl6ZWRHcmlkICYmIG5vcm1hbGl6ZWRUcmFuc2xhdGUgPCBub3JtYWxpemVkR3JpZE5leHQpIHtcbiAgICAgICAgICAgICAgc2xpZGVJbmRleCA9IGkgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAobm9ybWFsaXplZFRyYW5zbGF0ZSA+PSBub3JtYWxpemVkR3JpZCkge1xuICAgICAgICAgICAgc2xpZGVJbmRleCA9IGk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IC8vIERpcmVjdGlvbnMgbG9ja3NcblxuXG4gICAgICBpZiAoc3dpcGVyLmluaXRpYWxpemVkICYmIHNsaWRlSW5kZXggIT09IGFjdGl2ZUluZGV4KSB7XG4gICAgICAgIGlmICghc3dpcGVyLmFsbG93U2xpZGVOZXh0ICYmIHRyYW5zbGF0ZSA8IHN3aXBlci50cmFuc2xhdGUgJiYgdHJhbnNsYXRlIDwgc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZVByZXYgJiYgdHJhbnNsYXRlID4gc3dpcGVyLnRyYW5zbGF0ZSAmJiB0cmFuc2xhdGUgPiBzd2lwZXIubWF4VHJhbnNsYXRlKCkpIHtcbiAgICAgICAgICBpZiAoKGFjdGl2ZUluZGV4IHx8IDApICE9PSBzbGlkZUluZGV4KSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IGRpcmVjdGlvbjtcbiAgICAgIGlmIChzbGlkZUluZGV4ID4gYWN0aXZlSW5kZXgpIGRpcmVjdGlvbiA9ICduZXh0JztlbHNlIGlmIChzbGlkZUluZGV4IDwgYWN0aXZlSW5kZXgpIGRpcmVjdGlvbiA9ICdwcmV2JztlbHNlIGRpcmVjdGlvbiA9ICdyZXNldCc7IC8vIFVwZGF0ZSBJbmRleFxuXG4gICAgICBpZiAocnRsICYmIC10cmFuc2xhdGUgPT09IHN3aXBlci50cmFuc2xhdGUgfHwgIXJ0bCAmJiB0cmFuc2xhdGUgPT09IHN3aXBlci50cmFuc2xhdGUpIHtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KHNsaWRlSW5kZXgpOyAvLyBVcGRhdGUgSGVpZ2h0XG5cbiAgICAgICAgaWYgKHBhcmFtcy5hdXRvSGVpZ2h0KSB7XG4gICAgICAgICAgc3dpcGVyLnVwZGF0ZUF1dG9IZWlnaHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG5cbiAgICAgICAgaWYgKHBhcmFtcy5lZmZlY3QgIT09ICdzbGlkZScpIHtcbiAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKHRyYW5zbGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGlyZWN0aW9uICE9PSAncmVzZXQnKSB7XG4gICAgICAgICAgc3dpcGVyLnRyYW5zaXRpb25TdGFydChydW5DYWxsYmFja3MsIGRpcmVjdGlvbik7XG4gICAgICAgICAgc3dpcGVyLnRyYW5zaXRpb25FbmQocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgY29uc3QgaXNIID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpO1xuICAgICAgICBjb25zdCB0ID0gcnRsID8gdHJhbnNsYXRlIDogLXRyYW5zbGF0ZTtcblxuICAgICAgICBpZiAoc3BlZWQgPT09IDApIHtcbiAgICAgICAgICBjb25zdCBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZDtcblxuICAgICAgICAgIGlmIChpc1ZpcnR1YWwpIHtcbiAgICAgICAgICAgIHN3aXBlci53cmFwcGVyRWwuc3R5bGUuc2Nyb2xsU25hcFR5cGUgPSAnbm9uZSc7XG4gICAgICAgICAgICBzd2lwZXIuX2ltbWVkaWF0ZVZpcnR1YWwgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHdyYXBwZXJFbFtpc0ggPyAnc2Nyb2xsTGVmdCcgOiAnc2Nyb2xsVG9wJ10gPSB0O1xuXG4gICAgICAgICAgaWYgKGlzVmlydHVhbCkge1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgICAgc3dpcGVyLndyYXBwZXJFbC5zdHlsZS5zY3JvbGxTbmFwVHlwZSA9ICcnO1xuICAgICAgICAgICAgICBzd2lwZXIuX3N3aXBlckltbWVkaWF0ZVZpcnR1YWwgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIXN3aXBlci5zdXBwb3J0LnNtb290aFNjcm9sbCkge1xuICAgICAgICAgICAgYW5pbWF0ZUNTU01vZGVTY3JvbGwoe1xuICAgICAgICAgICAgICBzd2lwZXIsXG4gICAgICAgICAgICAgIHRhcmdldFBvc2l0aW9uOiB0LFxuICAgICAgICAgICAgICBzaWRlOiBpc0ggPyAnbGVmdCcgOiAndG9wJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB3cmFwcGVyRWwuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgW2lzSCA/ICdsZWZ0JyA6ICd0b3AnXTogdCxcbiAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKHNwZWVkKTtcbiAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUodHJhbnNsYXRlKTtcbiAgICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleChzbGlkZUluZGV4KTtcbiAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgICBzd2lwZXIuZW1pdCgnYmVmb3JlVHJhbnNpdGlvblN0YXJ0Jywgc3BlZWQsIGludGVybmFsKTtcbiAgICAgIHN3aXBlci50cmFuc2l0aW9uU3RhcnQocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pO1xuXG4gICAgICBpZiAoc3BlZWQgPT09IDApIHtcbiAgICAgICAgc3dpcGVyLnRyYW5zaXRpb25FbmQocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pO1xuICAgICAgfSBlbHNlIGlmICghc3dpcGVyLmFuaW1hdGluZykge1xuICAgICAgICBzd2lwZXIuYW5pbWF0aW5nID0gdHJ1ZTtcblxuICAgICAgICBpZiAoIXN3aXBlci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCkge1xuICAgICAgICAgIHN3aXBlci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uIHRyYW5zaXRpb25FbmQoZSkge1xuICAgICAgICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSB0aGlzKSByZXR1cm47XG4gICAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbFswXS5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgc3dpcGVyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKTtcbiAgICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsWzBdLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBzd2lwZXIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpO1xuICAgICAgICAgICAgc3dpcGVyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kID0gbnVsbDtcbiAgICAgICAgICAgIGRlbGV0ZSBzd2lwZXIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQ7XG4gICAgICAgICAgICBzd2lwZXIudHJhbnNpdGlvbkVuZChydW5DYWxsYmFja3MsIGRpcmVjdGlvbik7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXBlci4kd3JhcHBlckVsWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBzd2lwZXIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpO1xuICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbFswXS5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgc3dpcGVyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2xpZGVUb0xvb3AoaW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKSB7XG4gICAgICBpZiAoaW5kZXggPT09IHZvaWQgMCkge1xuICAgICAgICBpbmRleCA9IDA7XG4gICAgICB9XG5cbiAgICAgIGlmIChzcGVlZCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHNwZWVkID0gdGhpcy5wYXJhbXMuc3BlZWQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkge1xuICAgICAgICBydW5DYWxsYmFja3MgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGluZGV4ID09PSAnc3RyaW5nJykge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGBpbmRleGAgYXJndW1lbnQgY29udmVydGVkIGZyb20gYHN0cmluZ2AgdG8gYG51bWJlcmAuXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBpbmRleEFzTnVtYmVyID0gcGFyc2VJbnQoaW5kZXgsIDEwKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERldGVybWluZXMgd2hldGhlciB0aGUgYGluZGV4YCBhcmd1bWVudCBpcyBhIHZhbGlkIGBudW1iZXJgXG4gICAgICAgICAqIGFmdGVyIGJlaW5nIGNvbnZlcnRlZCBmcm9tIHRoZSBgc3RyaW5nYCB0eXBlLlxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG5cbiAgICAgICAgY29uc3QgaXNWYWxpZE51bWJlciA9IGlzRmluaXRlKGluZGV4QXNOdW1iZXIpO1xuXG4gICAgICAgIGlmICghaXNWYWxpZE51bWJlcikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHBhc3NlZC1pbiAnaW5kZXgnIChzdHJpbmcpIGNvdWxkbid0IGJlIGNvbnZlcnRlZCB0byAnbnVtYmVyJy4gWyR7aW5kZXh9XSBnaXZlbi5gKTtcbiAgICAgICAgfSAvLyBLbm93aW5nIHRoYXQgdGhlIGNvbnZlcnRlZCBgaW5kZXhgIGlzIGEgdmFsaWQgbnVtYmVyLFxuICAgICAgICAvLyB3ZSBjYW4gdXBkYXRlIHRoZSBvcmlnaW5hbCBhcmd1bWVudCdzIHZhbHVlLlxuXG5cbiAgICAgICAgaW5kZXggPSBpbmRleEFzTnVtYmVyO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgbGV0IG5ld0luZGV4ID0gaW5kZXg7XG5cbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgbmV3SW5kZXggKz0gc3dpcGVyLmxvb3BlZFNsaWRlcztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN3aXBlci5zbGlkZVRvKG5ld0luZGV4LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG4gICAgfVxuXG4gICAgLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBcIm9mZlwiICovXG4gICAgZnVuY3Rpb24gc2xpZGVOZXh0KHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKSB7XG4gICAgICBpZiAoc3BlZWQgPT09IHZvaWQgMCkge1xuICAgICAgICBzcGVlZCA9IHRoaXMucGFyYW1zLnNwZWVkO1xuICAgICAgfVxuXG4gICAgICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHtcbiAgICAgICAgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgYW5pbWF0aW5nLFxuICAgICAgICBlbmFibGVkLFxuICAgICAgICBwYXJhbXNcbiAgICAgIH0gPSBzd2lwZXI7XG4gICAgICBpZiAoIWVuYWJsZWQpIHJldHVybiBzd2lwZXI7XG4gICAgICBsZXQgcGVyR3JvdXAgPSBwYXJhbXMuc2xpZGVzUGVyR3JvdXA7XG5cbiAgICAgIGlmIChwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nICYmIHBhcmFtcy5zbGlkZXNQZXJHcm91cCA9PT0gMSAmJiBwYXJhbXMuc2xpZGVzUGVyR3JvdXBBdXRvKSB7XG4gICAgICAgIHBlckdyb3VwID0gTWF0aC5tYXgoc3dpcGVyLnNsaWRlc1BlclZpZXdEeW5hbWljKCdjdXJyZW50JywgdHJ1ZSksIDEpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpbmNyZW1lbnQgPSBzd2lwZXIuYWN0aXZlSW5kZXggPCBwYXJhbXMuc2xpZGVzUGVyR3JvdXBTa2lwID8gMSA6IHBlckdyb3VwO1xuXG4gICAgICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICAgICAgaWYgKGFuaW1hdGluZyAmJiBwYXJhbXMubG9vcFByZXZlbnRzU2xpZGUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgc3dpcGVyLmxvb3BGaXgoKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG5cbiAgICAgICAgc3dpcGVyLl9jbGllbnRMZWZ0ID0gc3dpcGVyLiR3cmFwcGVyRWxbMF0uY2xpZW50TGVmdDtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcmFtcy5yZXdpbmQgJiYgc3dpcGVyLmlzRW5kKSB7XG4gICAgICAgIHJldHVybiBzd2lwZXIuc2xpZGVUbygwLCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXggKyBpbmNyZW1lbnQsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgICB9XG5cbiAgICAvKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFwib2ZmXCIgKi9cbiAgICBmdW5jdGlvbiBzbGlkZVByZXYoc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpIHtcbiAgICAgIGlmIChzcGVlZCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHNwZWVkID0gdGhpcy5wYXJhbXMuc3BlZWQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkge1xuICAgICAgICBydW5DYWxsYmFja3MgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgY29uc3Qge1xuICAgICAgICBwYXJhbXMsXG4gICAgICAgIGFuaW1hdGluZyxcbiAgICAgICAgc25hcEdyaWQsXG4gICAgICAgIHNsaWRlc0dyaWQsXG4gICAgICAgIHJ0bFRyYW5zbGF0ZSxcbiAgICAgICAgZW5hYmxlZFxuICAgICAgfSA9IHN3aXBlcjtcbiAgICAgIGlmICghZW5hYmxlZCkgcmV0dXJuIHN3aXBlcjtcblxuICAgICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICAgIGlmIChhbmltYXRpbmcgJiYgcGFyYW1zLmxvb3BQcmV2ZW50c1NsaWRlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHN3aXBlci5sb29wRml4KCk7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuXG4gICAgICAgIHN3aXBlci5fY2xpZW50TGVmdCA9IHN3aXBlci4kd3JhcHBlckVsWzBdLmNsaWVudExlZnQ7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHJ0bFRyYW5zbGF0ZSA/IHN3aXBlci50cmFuc2xhdGUgOiAtc3dpcGVyLnRyYW5zbGF0ZTtcblxuICAgICAgZnVuY3Rpb24gbm9ybWFsaXplKHZhbCkge1xuICAgICAgICBpZiAodmFsIDwgMCkgcmV0dXJuIC1NYXRoLmZsb29yKE1hdGguYWJzKHZhbCkpO1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih2YWwpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBub3JtYWxpemVkVHJhbnNsYXRlID0gbm9ybWFsaXplKHRyYW5zbGF0ZSk7XG4gICAgICBjb25zdCBub3JtYWxpemVkU25hcEdyaWQgPSBzbmFwR3JpZC5tYXAodmFsID0+IG5vcm1hbGl6ZSh2YWwpKTtcbiAgICAgIGxldCBwcmV2U25hcCA9IHNuYXBHcmlkW25vcm1hbGl6ZWRTbmFwR3JpZC5pbmRleE9mKG5vcm1hbGl6ZWRUcmFuc2xhdGUpIC0gMV07XG5cbiAgICAgIGlmICh0eXBlb2YgcHJldlNuYXAgPT09ICd1bmRlZmluZWQnICYmIHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICAgIGxldCBwcmV2U25hcEluZGV4O1xuICAgICAgICBzbmFwR3JpZC5mb3JFYWNoKChzbmFwLCBzbmFwSW5kZXgpID0+IHtcbiAgICAgICAgICBpZiAobm9ybWFsaXplZFRyYW5zbGF0ZSA+PSBzbmFwKSB7XG4gICAgICAgICAgICAvLyBwcmV2U25hcCA9IHNuYXA7XG4gICAgICAgICAgICBwcmV2U25hcEluZGV4ID0gc25hcEluZGV4O1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBwcmV2U25hcEluZGV4ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHByZXZTbmFwID0gc25hcEdyaWRbcHJldlNuYXBJbmRleCA+IDAgPyBwcmV2U25hcEluZGV4IC0gMSA6IHByZXZTbmFwSW5kZXhdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCBwcmV2SW5kZXggPSAwO1xuXG4gICAgICBpZiAodHlwZW9mIHByZXZTbmFwICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBwcmV2SW5kZXggPSBzbGlkZXNHcmlkLmluZGV4T2YocHJldlNuYXApO1xuICAgICAgICBpZiAocHJldkluZGV4IDwgMCkgcHJldkluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4IC0gMTtcblxuICAgICAgICBpZiAocGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyAmJiBwYXJhbXMuc2xpZGVzUGVyR3JvdXAgPT09IDEgJiYgcGFyYW1zLnNsaWRlc1Blckdyb3VwQXV0bykge1xuICAgICAgICAgIHByZXZJbmRleCA9IHByZXZJbmRleCAtIHN3aXBlci5zbGlkZXNQZXJWaWV3RHluYW1pYygncHJldmlvdXMnLCB0cnVlKSArIDE7XG4gICAgICAgICAgcHJldkluZGV4ID0gTWF0aC5tYXgocHJldkluZGV4LCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocGFyYW1zLnJld2luZCAmJiBzd2lwZXIuaXNCZWdpbm5pbmcpIHtcbiAgICAgICAgY29uc3QgbGFzdEluZGV4ID0gc3dpcGVyLnBhcmFtcy52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkICYmIHN3aXBlci52aXJ0dWFsID8gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCAtIDEgOiBzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDE7XG4gICAgICAgIHJldHVybiBzd2lwZXIuc2xpZGVUbyhsYXN0SW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN3aXBlci5zbGlkZVRvKHByZXZJbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xuICAgIH1cblxuICAgIC8qIGVzbGludCBuby11bnVzZWQtdmFyczogXCJvZmZcIiAqL1xuICAgIGZ1bmN0aW9uIHNsaWRlUmVzZXQoc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpIHtcbiAgICAgIGlmIChzcGVlZCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHNwZWVkID0gdGhpcy5wYXJhbXMuc3BlZWQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkge1xuICAgICAgICBydW5DYWxsYmFja3MgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgcmV0dXJuIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xuICAgIH1cblxuICAgIC8qIGVzbGludCBuby11bnVzZWQtdmFyczogXCJvZmZcIiAqL1xuICAgIGZ1bmN0aW9uIHNsaWRlVG9DbG9zZXN0KHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsLCB0aHJlc2hvbGQpIHtcbiAgICAgIGlmIChzcGVlZCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHNwZWVkID0gdGhpcy5wYXJhbXMuc3BlZWQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkge1xuICAgICAgICBydW5DYWxsYmFja3MgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhyZXNob2xkID09PSB2b2lkIDApIHtcbiAgICAgICAgdGhyZXNob2xkID0gMC41O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgbGV0IGluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4O1xuICAgICAgY29uc3Qgc2tpcCA9IE1hdGgubWluKHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXBTa2lwLCBpbmRleCk7XG4gICAgICBjb25zdCBzbmFwSW5kZXggPSBza2lwICsgTWF0aC5mbG9vcigoaW5kZXggLSBza2lwKSAvIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXApO1xuICAgICAgY29uc3QgdHJhbnNsYXRlID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZSA/IHN3aXBlci50cmFuc2xhdGUgOiAtc3dpcGVyLnRyYW5zbGF0ZTtcblxuICAgICAgaWYgKHRyYW5zbGF0ZSA+PSBzd2lwZXIuc25hcEdyaWRbc25hcEluZGV4XSkge1xuICAgICAgICAvLyBUaGUgY3VycmVudCB0cmFuc2xhdGUgaXMgb24gb3IgYWZ0ZXIgdGhlIGN1cnJlbnQgc25hcCBpbmRleCwgc28gdGhlIGNob2ljZVxuICAgICAgICAvLyBpcyBiZXR3ZWVuIHRoZSBjdXJyZW50IGluZGV4IGFuZCB0aGUgb25lIGFmdGVyIGl0LlxuICAgICAgICBjb25zdCBjdXJyZW50U25hcCA9IHN3aXBlci5zbmFwR3JpZFtzbmFwSW5kZXhdO1xuICAgICAgICBjb25zdCBuZXh0U25hcCA9IHN3aXBlci5zbmFwR3JpZFtzbmFwSW5kZXggKyAxXTtcblxuICAgICAgICBpZiAodHJhbnNsYXRlIC0gY3VycmVudFNuYXAgPiAobmV4dFNuYXAgLSBjdXJyZW50U25hcCkgKiB0aHJlc2hvbGQpIHtcbiAgICAgICAgICBpbmRleCArPSBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUaGUgY3VycmVudCB0cmFuc2xhdGUgaXMgYmVmb3JlIHRoZSBjdXJyZW50IHNuYXAgaW5kZXgsIHNvIHRoZSBjaG9pY2VcbiAgICAgICAgLy8gaXMgYmV0d2VlbiB0aGUgY3VycmVudCBpbmRleCBhbmQgdGhlIG9uZSBiZWZvcmUgaXQuXG4gICAgICAgIGNvbnN0IHByZXZTbmFwID0gc3dpcGVyLnNuYXBHcmlkW3NuYXBJbmRleCAtIDFdO1xuICAgICAgICBjb25zdCBjdXJyZW50U25hcCA9IHN3aXBlci5zbmFwR3JpZFtzbmFwSW5kZXhdO1xuXG4gICAgICAgIGlmICh0cmFuc2xhdGUgLSBwcmV2U25hcCA8PSAoY3VycmVudFNuYXAgLSBwcmV2U25hcCkgKiB0aHJlc2hvbGQpIHtcbiAgICAgICAgICBpbmRleCAtPSBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGluZGV4ID0gTWF0aC5tYXgoaW5kZXgsIDApO1xuICAgICAgaW5kZXggPSBNYXRoLm1pbihpbmRleCwgc3dpcGVyLnNsaWRlc0dyaWQubGVuZ3RoIC0gMSk7XG4gICAgICByZXR1cm4gc3dpcGVyLnNsaWRlVG8oaW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzbGlkZVRvQ2xpY2tlZFNsaWRlKCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgcGFyYW1zLFxuICAgICAgICAkd3JhcHBlckVsXG4gICAgICB9ID0gc3dpcGVyO1xuICAgICAgY29uc3Qgc2xpZGVzUGVyVmlldyA9IHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycgPyBzd2lwZXIuc2xpZGVzUGVyVmlld0R5bmFtaWMoKSA6IHBhcmFtcy5zbGlkZXNQZXJWaWV3O1xuICAgICAgbGV0IHNsaWRlVG9JbmRleCA9IHN3aXBlci5jbGlja2VkSW5kZXg7XG4gICAgICBsZXQgcmVhbEluZGV4O1xuXG4gICAgICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICAgICAgaWYgKHN3aXBlci5hbmltYXRpbmcpIHJldHVybjtcbiAgICAgICAgcmVhbEluZGV4ID0gcGFyc2VJbnQoJChzd2lwZXIuY2xpY2tlZFNsaWRlKS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpLCAxMCk7XG5cbiAgICAgICAgaWYgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgICAgIGlmIChzbGlkZVRvSW5kZXggPCBzd2lwZXIubG9vcGVkU2xpZGVzIC0gc2xpZGVzUGVyVmlldyAvIDIgfHwgc2xpZGVUb0luZGV4ID4gc3dpcGVyLnNsaWRlcy5sZW5ndGggLSBzd2lwZXIubG9vcGVkU2xpZGVzICsgc2xpZGVzUGVyVmlldyAvIDIpIHtcbiAgICAgICAgICAgIHN3aXBlci5sb29wRml4KCk7XG4gICAgICAgICAgICBzbGlkZVRvSW5kZXggPSAkd3JhcHBlckVsLmNoaWxkcmVuKGAuJHtwYXJhbXMuc2xpZGVDbGFzc31bZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke3JlYWxJbmRleH1cIl06bm90KC4ke3BhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzfSlgKS5lcSgwKS5pbmRleCgpO1xuICAgICAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN3aXBlci5zbGlkZVRvKHNsaWRlVG9JbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHNsaWRlVG9JbmRleCA+IHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gc2xpZGVzUGVyVmlldykge1xuICAgICAgICAgIHN3aXBlci5sb29wRml4KCk7XG4gICAgICAgICAgc2xpZGVUb0luZGV4ID0gJHdyYXBwZXJFbC5jaGlsZHJlbihgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9W2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJHtyZWFsSW5kZXh9XCJdOm5vdCguJHtwYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzc30pYCkuZXEoMCkuaW5kZXgoKTtcbiAgICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvKHNsaWRlVG9JbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHNsaWRlVG9JbmRleCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHNsaWRlID0ge1xuICAgICAgc2xpZGVUbyxcbiAgICAgIHNsaWRlVG9Mb29wLFxuICAgICAgc2xpZGVOZXh0LFxuICAgICAgc2xpZGVQcmV2LFxuICAgICAgc2xpZGVSZXNldCxcbiAgICAgIHNsaWRlVG9DbG9zZXN0LFxuICAgICAgc2xpZGVUb0NsaWNrZWRTbGlkZVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBsb29wQ3JlYXRlKCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGNvbnN0IGRvY3VtZW50ID0gZ2V0RG9jdW1lbnQoKTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgcGFyYW1zLFxuICAgICAgICAkd3JhcHBlckVsXG4gICAgICB9ID0gc3dpcGVyOyAvLyBSZW1vdmUgZHVwbGljYXRlZCBzbGlkZXNcblxuICAgICAgY29uc3QgJHNlbGVjdG9yID0gJHdyYXBwZXJFbC5jaGlsZHJlbigpLmxlbmd0aCA+IDAgPyAkKCR3cmFwcGVyRWwuY2hpbGRyZW4oKVswXS5wYXJlbnROb2RlKSA6ICR3cmFwcGVyRWw7XG4gICAgICAkc2VsZWN0b3IuY2hpbGRyZW4oYC4ke3BhcmFtcy5zbGlkZUNsYXNzfS4ke3BhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzfWApLnJlbW92ZSgpO1xuICAgICAgbGV0IHNsaWRlcyA9ICRzZWxlY3Rvci5jaGlsZHJlbihgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9YCk7XG5cbiAgICAgIGlmIChwYXJhbXMubG9vcEZpbGxHcm91cFdpdGhCbGFuaykge1xuICAgICAgICBjb25zdCBibGFua1NsaWRlc051bSA9IHBhcmFtcy5zbGlkZXNQZXJHcm91cCAtIHNsaWRlcy5sZW5ndGggJSBwYXJhbXMuc2xpZGVzUGVyR3JvdXA7XG5cbiAgICAgICAgaWYgKGJsYW5rU2xpZGVzTnVtICE9PSBwYXJhbXMuc2xpZGVzUGVyR3JvdXApIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJsYW5rU2xpZGVzTnVtOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGJsYW5rTm9kZSA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpLmFkZENsYXNzKGAke3BhcmFtcy5zbGlkZUNsYXNzfSAke3BhcmFtcy5zbGlkZUJsYW5rQ2xhc3N9YCk7XG4gICAgICAgICAgICAkc2VsZWN0b3IuYXBwZW5kKGJsYW5rTm9kZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2xpZGVzID0gJHNlbGVjdG9yLmNoaWxkcmVuKGAuJHtwYXJhbXMuc2xpZGVDbGFzc31gKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyAmJiAhcGFyYW1zLmxvb3BlZFNsaWRlcykgcGFyYW1zLmxvb3BlZFNsaWRlcyA9IHNsaWRlcy5sZW5ndGg7XG4gICAgICBzd2lwZXIubG9vcGVkU2xpZGVzID0gTWF0aC5jZWlsKHBhcnNlRmxvYXQocGFyYW1zLmxvb3BlZFNsaWRlcyB8fCBwYXJhbXMuc2xpZGVzUGVyVmlldywgMTApKTtcbiAgICAgIHN3aXBlci5sb29wZWRTbGlkZXMgKz0gcGFyYW1zLmxvb3BBZGRpdGlvbmFsU2xpZGVzO1xuXG4gICAgICBpZiAoc3dpcGVyLmxvb3BlZFNsaWRlcyA+IHNsaWRlcy5sZW5ndGgpIHtcbiAgICAgICAgc3dpcGVyLmxvb3BlZFNsaWRlcyA9IHNsaWRlcy5sZW5ndGg7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByZXBlbmRTbGlkZXMgPSBbXTtcbiAgICAgIGNvbnN0IGFwcGVuZFNsaWRlcyA9IFtdO1xuICAgICAgc2xpZGVzLmVhY2goKGVsLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBzbGlkZSA9ICQoZWwpO1xuXG4gICAgICAgIGlmIChpbmRleCA8IHN3aXBlci5sb29wZWRTbGlkZXMpIHtcbiAgICAgICAgICBhcHBlbmRTbGlkZXMucHVzaChlbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5kZXggPCBzbGlkZXMubGVuZ3RoICYmIGluZGV4ID49IHNsaWRlcy5sZW5ndGggLSBzd2lwZXIubG9vcGVkU2xpZGVzKSB7XG4gICAgICAgICAgcHJlcGVuZFNsaWRlcy5wdXNoKGVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNsaWRlLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JywgaW5kZXgpO1xuICAgICAgfSk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXBwZW5kU2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICRzZWxlY3Rvci5hcHBlbmQoJChhcHBlbmRTbGlkZXNbaV0uY2xvbmVOb2RlKHRydWUpKS5hZGRDbGFzcyhwYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gcHJlcGVuZFNsaWRlcy5sZW5ndGggLSAxOyBpID49IDA7IGkgLT0gMSkge1xuICAgICAgICAkc2VsZWN0b3IucHJlcGVuZCgkKHByZXBlbmRTbGlkZXNbaV0uY2xvbmVOb2RlKHRydWUpKS5hZGRDbGFzcyhwYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvb3BGaXgoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgc3dpcGVyLmVtaXQoJ2JlZm9yZUxvb3BGaXgnKTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgYWN0aXZlSW5kZXgsXG4gICAgICAgIHNsaWRlcyxcbiAgICAgICAgbG9vcGVkU2xpZGVzLFxuICAgICAgICBhbGxvd1NsaWRlUHJldixcbiAgICAgICAgYWxsb3dTbGlkZU5leHQsXG4gICAgICAgIHNuYXBHcmlkLFxuICAgICAgICBydGxUcmFuc2xhdGU6IHJ0bFxuICAgICAgfSA9IHN3aXBlcjtcbiAgICAgIGxldCBuZXdJbmRleDtcbiAgICAgIHN3aXBlci5hbGxvd1NsaWRlUHJldiA9IHRydWU7XG4gICAgICBzd2lwZXIuYWxsb3dTbGlkZU5leHQgPSB0cnVlO1xuICAgICAgY29uc3Qgc25hcFRyYW5zbGF0ZSA9IC1zbmFwR3JpZFthY3RpdmVJbmRleF07XG4gICAgICBjb25zdCBkaWZmID0gc25hcFRyYW5zbGF0ZSAtIHN3aXBlci5nZXRUcmFuc2xhdGUoKTsgLy8gRml4IEZvciBOZWdhdGl2ZSBPdmVyc2xpZGluZ1xuXG4gICAgICBpZiAoYWN0aXZlSW5kZXggPCBsb29wZWRTbGlkZXMpIHtcbiAgICAgICAgbmV3SW5kZXggPSBzbGlkZXMubGVuZ3RoIC0gbG9vcGVkU2xpZGVzICogMyArIGFjdGl2ZUluZGV4O1xuICAgICAgICBuZXdJbmRleCArPSBsb29wZWRTbGlkZXM7XG4gICAgICAgIGNvbnN0IHNsaWRlQ2hhbmdlZCA9IHN3aXBlci5zbGlkZVRvKG5ld0luZGV4LCAwLCBmYWxzZSwgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKHNsaWRlQ2hhbmdlZCAmJiBkaWZmICE9PSAwKSB7XG4gICAgICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZSgocnRsID8gLXN3aXBlci50cmFuc2xhdGUgOiBzd2lwZXIudHJhbnNsYXRlKSAtIGRpZmYpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGFjdGl2ZUluZGV4ID49IHNsaWRlcy5sZW5ndGggLSBsb29wZWRTbGlkZXMpIHtcbiAgICAgICAgLy8gRml4IEZvciBQb3NpdGl2ZSBPdmVyc2xpZGluZ1xuICAgICAgICBuZXdJbmRleCA9IC1zbGlkZXMubGVuZ3RoICsgYWN0aXZlSW5kZXggKyBsb29wZWRTbGlkZXM7XG4gICAgICAgIG5ld0luZGV4ICs9IGxvb3BlZFNsaWRlcztcbiAgICAgICAgY29uc3Qgc2xpZGVDaGFuZ2VkID0gc3dpcGVyLnNsaWRlVG8obmV3SW5kZXgsIDAsIGZhbHNlLCB0cnVlKTtcblxuICAgICAgICBpZiAoc2xpZGVDaGFuZ2VkICYmIGRpZmYgIT09IDApIHtcbiAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKChydGwgPyAtc3dpcGVyLnRyYW5zbGF0ZSA6IHN3aXBlci50cmFuc2xhdGUpIC0gZGlmZik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID0gYWxsb3dTbGlkZVByZXY7XG4gICAgICBzd2lwZXIuYWxsb3dTbGlkZU5leHQgPSBhbGxvd1NsaWRlTmV4dDtcbiAgICAgIHN3aXBlci5lbWl0KCdsb29wRml4Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9vcERlc3Ryb3koKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgY29uc3Qge1xuICAgICAgICAkd3JhcHBlckVsLFxuICAgICAgICBwYXJhbXMsXG4gICAgICAgIHNsaWRlc1xuICAgICAgfSA9IHN3aXBlcjtcbiAgICAgICR3cmFwcGVyRWwuY2hpbGRyZW4oYC4ke3BhcmFtcy5zbGlkZUNsYXNzfS4ke3BhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzfSwuJHtwYXJhbXMuc2xpZGVDbGFzc30uJHtwYXJhbXMuc2xpZGVCbGFua0NsYXNzfWApLnJlbW92ZSgpO1xuICAgICAgc2xpZGVzLnJlbW92ZUF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4Jyk7XG4gICAgfVxuXG4gICAgdmFyIGxvb3AgPSB7XG4gICAgICBsb29wQ3JlYXRlLFxuICAgICAgbG9vcEZpeCxcbiAgICAgIGxvb3BEZXN0cm95XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldEdyYWJDdXJzb3IobW92aW5nKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5zdXBwb3J0LnRvdWNoIHx8ICFzd2lwZXIucGFyYW1zLnNpbXVsYXRlVG91Y2ggfHwgc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93ICYmIHN3aXBlci5pc0xvY2tlZCB8fCBzd2lwZXIucGFyYW1zLmNzc01vZGUpIHJldHVybjtcbiAgICAgIGNvbnN0IGVsID0gc3dpcGVyLnBhcmFtcy50b3VjaEV2ZW50c1RhcmdldCA9PT0gJ2NvbnRhaW5lcicgPyBzd2lwZXIuZWwgOiBzd2lwZXIud3JhcHBlckVsO1xuICAgICAgZWwuc3R5bGUuY3Vyc29yID0gJ21vdmUnO1xuICAgICAgZWwuc3R5bGUuY3Vyc29yID0gbW92aW5nID8gJ2dyYWJiaW5nJyA6ICdncmFiJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bnNldEdyYWJDdXJzb3IoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuXG4gICAgICBpZiAoc3dpcGVyLnN1cHBvcnQudG91Y2ggfHwgc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93ICYmIHN3aXBlci5pc0xvY2tlZCB8fCBzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzd2lwZXJbc3dpcGVyLnBhcmFtcy50b3VjaEV2ZW50c1RhcmdldCA9PT0gJ2NvbnRhaW5lcicgPyAnZWwnIDogJ3dyYXBwZXJFbCddLnN0eWxlLmN1cnNvciA9ICcnO1xuICAgIH1cblxuICAgIHZhciBncmFiQ3Vyc29yID0ge1xuICAgICAgc2V0R3JhYkN1cnNvcixcbiAgICAgIHVuc2V0R3JhYkN1cnNvclxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjbG9zZXN0RWxlbWVudChzZWxlY3RvciwgYmFzZSkge1xuICAgICAgaWYgKGJhc2UgPT09IHZvaWQgMCkge1xuICAgICAgICBiYXNlID0gdGhpcztcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gX19jbG9zZXN0RnJvbShlbCkge1xuICAgICAgICBpZiAoIWVsIHx8IGVsID09PSBnZXREb2N1bWVudCgpIHx8IGVsID09PSBnZXRXaW5kb3coKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmIChlbC5hc3NpZ25lZFNsb3QpIGVsID0gZWwuYXNzaWduZWRTbG90O1xuICAgICAgICBjb25zdCBmb3VuZCA9IGVsLmNsb3Nlc3Qoc2VsZWN0b3IpO1xuXG4gICAgICAgIGlmICghZm91bmQgJiYgIWVsLmdldFJvb3ROb2RlKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm91bmQgfHwgX19jbG9zZXN0RnJvbShlbC5nZXRSb290Tm9kZSgpLmhvc3QpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX19jbG9zZXN0RnJvbShiYXNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblRvdWNoU3RhcnQoZXZlbnQpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBjb25zdCBkb2N1bWVudCA9IGdldERvY3VtZW50KCk7XG4gICAgICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgICAgIGNvbnN0IGRhdGEgPSBzd2lwZXIudG91Y2hFdmVudHNEYXRhO1xuICAgICAgY29uc3Qge1xuICAgICAgICBwYXJhbXMsXG4gICAgICAgIHRvdWNoZXMsXG4gICAgICAgIGVuYWJsZWRcbiAgICAgIH0gPSBzd2lwZXI7XG4gICAgICBpZiAoIWVuYWJsZWQpIHJldHVybjtcblxuICAgICAgaWYgKHN3aXBlci5hbmltYXRpbmcgJiYgcGFyYW1zLnByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghc3dpcGVyLmFuaW1hdGluZyAmJiBwYXJhbXMuY3NzTW9kZSAmJiBwYXJhbXMubG9vcCkge1xuICAgICAgICBzd2lwZXIubG9vcEZpeCgpO1xuICAgICAgfVxuXG4gICAgICBsZXQgZSA9IGV2ZW50O1xuICAgICAgaWYgKGUub3JpZ2luYWxFdmVudCkgZSA9IGUub3JpZ2luYWxFdmVudDtcbiAgICAgIGxldCAkdGFyZ2V0RWwgPSAkKGUudGFyZ2V0KTtcblxuICAgICAgaWYgKHBhcmFtcy50b3VjaEV2ZW50c1RhcmdldCA9PT0gJ3dyYXBwZXInKSB7XG4gICAgICAgIGlmICghJHRhcmdldEVsLmNsb3Nlc3Qoc3dpcGVyLndyYXBwZXJFbCkubGVuZ3RoKSByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGRhdGEuaXNUb3VjaEV2ZW50ID0gZS50eXBlID09PSAndG91Y2hzdGFydCc7XG4gICAgICBpZiAoIWRhdGEuaXNUb3VjaEV2ZW50ICYmICd3aGljaCcgaW4gZSAmJiBlLndoaWNoID09PSAzKSByZXR1cm47XG4gICAgICBpZiAoIWRhdGEuaXNUb3VjaEV2ZW50ICYmICdidXR0b24nIGluIGUgJiYgZS5idXR0b24gPiAwKSByZXR1cm47XG4gICAgICBpZiAoZGF0YS5pc1RvdWNoZWQgJiYgZGF0YS5pc01vdmVkKSByZXR1cm47IC8vIGNoYW5nZSB0YXJnZXQgZWwgZm9yIHNoYWRvdyByb290IGNvbXBvbmVudFxuXG4gICAgICBjb25zdCBzd2lwaW5nQ2xhc3NIYXNWYWx1ZSA9ICEhcGFyYW1zLm5vU3dpcGluZ0NsYXNzICYmIHBhcmFtcy5ub1N3aXBpbmdDbGFzcyAhPT0gJyc7XG5cbiAgICAgIGlmIChzd2lwaW5nQ2xhc3NIYXNWYWx1ZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC5zaGFkb3dSb290ICYmIGV2ZW50LnBhdGggJiYgZXZlbnQucGF0aFswXSkge1xuICAgICAgICAkdGFyZ2V0RWwgPSAkKGV2ZW50LnBhdGhbMF0pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBub1N3aXBpbmdTZWxlY3RvciA9IHBhcmFtcy5ub1N3aXBpbmdTZWxlY3RvciA/IHBhcmFtcy5ub1N3aXBpbmdTZWxlY3RvciA6IGAuJHtwYXJhbXMubm9Td2lwaW5nQ2xhc3N9YDtcbiAgICAgIGNvbnN0IGlzVGFyZ2V0U2hhZG93ID0gISEoZS50YXJnZXQgJiYgZS50YXJnZXQuc2hhZG93Um9vdCk7IC8vIHVzZSBjbG9zZXN0RWxlbWVudCBmb3Igc2hhZG93IHJvb3QgZWxlbWVudCB0byBnZXQgdGhlIGFjdHVhbCBjbG9zZXN0IGZvciBuZXN0ZWQgc2hhZG93IHJvb3QgZWxlbWVudFxuXG4gICAgICBpZiAocGFyYW1zLm5vU3dpcGluZyAmJiAoaXNUYXJnZXRTaGFkb3cgPyBjbG9zZXN0RWxlbWVudChub1N3aXBpbmdTZWxlY3RvciwgJHRhcmdldEVsWzBdKSA6ICR0YXJnZXRFbC5jbG9zZXN0KG5vU3dpcGluZ1NlbGVjdG9yKVswXSkpIHtcbiAgICAgICAgc3dpcGVyLmFsbG93Q2xpY2sgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMuc3dpcGVIYW5kbGVyKSB7XG4gICAgICAgIGlmICghJHRhcmdldEVsLmNsb3Nlc3QocGFyYW1zLnN3aXBlSGFuZGxlcilbMF0pIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdG91Y2hlcy5jdXJyZW50WCA9IGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIDogZS5wYWdlWDtcbiAgICAgIHRvdWNoZXMuY3VycmVudFkgPSBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSA6IGUucGFnZVk7XG4gICAgICBjb25zdCBzdGFydFggPSB0b3VjaGVzLmN1cnJlbnRYO1xuICAgICAgY29uc3Qgc3RhcnRZID0gdG91Y2hlcy5jdXJyZW50WTsgLy8gRG8gTk9UIHN0YXJ0IGlmIGlPUyBlZGdlIHN3aXBlIGlzIGRldGVjdGVkLiBPdGhlcndpc2UgaU9TIGFwcCBjYW5ub3Qgc3dpcGUtdG8tZ28tYmFjayBhbnltb3JlXG5cbiAgICAgIGNvbnN0IGVkZ2VTd2lwZURldGVjdGlvbiA9IHBhcmFtcy5lZGdlU3dpcGVEZXRlY3Rpb24gfHwgcGFyYW1zLmlPU0VkZ2VTd2lwZURldGVjdGlvbjtcbiAgICAgIGNvbnN0IGVkZ2VTd2lwZVRocmVzaG9sZCA9IHBhcmFtcy5lZGdlU3dpcGVUaHJlc2hvbGQgfHwgcGFyYW1zLmlPU0VkZ2VTd2lwZVRocmVzaG9sZDtcblxuICAgICAgaWYgKGVkZ2VTd2lwZURldGVjdGlvbiAmJiAoc3RhcnRYIDw9IGVkZ2VTd2lwZVRocmVzaG9sZCB8fCBzdGFydFggPj0gd2luZG93LmlubmVyV2lkdGggLSBlZGdlU3dpcGVUaHJlc2hvbGQpKSB7XG4gICAgICAgIGlmIChlZGdlU3dpcGVEZXRlY3Rpb24gPT09ICdwcmV2ZW50Jykge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIE9iamVjdC5hc3NpZ24oZGF0YSwge1xuICAgICAgICBpc1RvdWNoZWQ6IHRydWUsXG4gICAgICAgIGlzTW92ZWQ6IGZhbHNlLFxuICAgICAgICBhbGxvd1RvdWNoQ2FsbGJhY2tzOiB0cnVlLFxuICAgICAgICBpc1Njcm9sbGluZzogdW5kZWZpbmVkLFxuICAgICAgICBzdGFydE1vdmluZzogdW5kZWZpbmVkXG4gICAgICB9KTtcbiAgICAgIHRvdWNoZXMuc3RhcnRYID0gc3RhcnRYO1xuICAgICAgdG91Y2hlcy5zdGFydFkgPSBzdGFydFk7XG4gICAgICBkYXRhLnRvdWNoU3RhcnRUaW1lID0gbm93KCk7XG4gICAgICBzd2lwZXIuYWxsb3dDbGljayA9IHRydWU7XG4gICAgICBzd2lwZXIudXBkYXRlU2l6ZSgpO1xuICAgICAgc3dpcGVyLnN3aXBlRGlyZWN0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKHBhcmFtcy50aHJlc2hvbGQgPiAwKSBkYXRhLmFsbG93VGhyZXNob2xkTW92ZSA9IGZhbHNlO1xuXG4gICAgICBpZiAoZS50eXBlICE9PSAndG91Y2hzdGFydCcpIHtcbiAgICAgICAgbGV0IHByZXZlbnREZWZhdWx0ID0gdHJ1ZTtcblxuICAgICAgICBpZiAoJHRhcmdldEVsLmlzKGRhdGEuZm9jdXNhYmxlRWxlbWVudHMpKSB7XG4gICAgICAgICAgcHJldmVudERlZmF1bHQgPSBmYWxzZTtcblxuICAgICAgICAgIGlmICgkdGFyZ2V0RWxbMF0ubm9kZU5hbWUgPT09ICdTRUxFQ1QnKSB7XG4gICAgICAgICAgICBkYXRhLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmICQoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkuaXMoZGF0YS5mb2N1c2FibGVFbGVtZW50cykgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gJHRhcmdldEVsWzBdKSB7XG4gICAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzaG91bGRQcmV2ZW50RGVmYXVsdCA9IHByZXZlbnREZWZhdWx0ICYmIHN3aXBlci5hbGxvd1RvdWNoTW92ZSAmJiBwYXJhbXMudG91Y2hTdGFydFByZXZlbnREZWZhdWx0O1xuXG4gICAgICAgIGlmICgocGFyYW1zLnRvdWNoU3RhcnRGb3JjZVByZXZlbnREZWZhdWx0IHx8IHNob3VsZFByZXZlbnREZWZhdWx0KSAmJiAhJHRhcmdldEVsWzBdLmlzQ29udGVudEVkaXRhYmxlKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmZyZWVNb2RlICYmIHN3aXBlci5wYXJhbXMuZnJlZU1vZGUuZW5hYmxlZCAmJiBzd2lwZXIuZnJlZU1vZGUgJiYgc3dpcGVyLmFuaW1hdGluZyAmJiAhcGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgc3dpcGVyLmZyZWVNb2RlLm9uVG91Y2hTdGFydCgpO1xuICAgICAgfVxuXG4gICAgICBzd2lwZXIuZW1pdCgndG91Y2hTdGFydCcsIGUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVG91Y2hNb3ZlKGV2ZW50KSB7XG4gICAgICBjb25zdCBkb2N1bWVudCA9IGdldERvY3VtZW50KCk7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgY29uc3QgZGF0YSA9IHN3aXBlci50b3VjaEV2ZW50c0RhdGE7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgdG91Y2hlcyxcbiAgICAgICAgcnRsVHJhbnNsYXRlOiBydGwsXG4gICAgICAgIGVuYWJsZWRcbiAgICAgIH0gPSBzd2lwZXI7XG4gICAgICBpZiAoIWVuYWJsZWQpIHJldHVybjtcbiAgICAgIGxldCBlID0gZXZlbnQ7XG4gICAgICBpZiAoZS5vcmlnaW5hbEV2ZW50KSBlID0gZS5vcmlnaW5hbEV2ZW50O1xuXG4gICAgICBpZiAoIWRhdGEuaXNUb3VjaGVkKSB7XG4gICAgICAgIGlmIChkYXRhLnN0YXJ0TW92aW5nICYmIGRhdGEuaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgICBzd2lwZXIuZW1pdCgndG91Y2hNb3ZlT3Bwb3NpdGUnLCBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGRhdGEuaXNUb3VjaEV2ZW50ICYmIGUudHlwZSAhPT0gJ3RvdWNobW92ZScpIHJldHVybjtcbiAgICAgIGNvbnN0IHRhcmdldFRvdWNoID0gZS50eXBlID09PSAndG91Y2htb3ZlJyAmJiBlLnRhcmdldFRvdWNoZXMgJiYgKGUudGFyZ2V0VG91Y2hlc1swXSB8fCBlLmNoYW5nZWRUb3VjaGVzWzBdKTtcbiAgICAgIGNvbnN0IHBhZ2VYID0gZS50eXBlID09PSAndG91Y2htb3ZlJyA/IHRhcmdldFRvdWNoLnBhZ2VYIDogZS5wYWdlWDtcbiAgICAgIGNvbnN0IHBhZ2VZID0gZS50eXBlID09PSAndG91Y2htb3ZlJyA/IHRhcmdldFRvdWNoLnBhZ2VZIDogZS5wYWdlWTtcblxuICAgICAgaWYgKGUucHJldmVudGVkQnlOZXN0ZWRTd2lwZXIpIHtcbiAgICAgICAgdG91Y2hlcy5zdGFydFggPSBwYWdlWDtcbiAgICAgICAgdG91Y2hlcy5zdGFydFkgPSBwYWdlWTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXN3aXBlci5hbGxvd1RvdWNoTW92ZSkge1xuICAgICAgICBpZiAoISQoZS50YXJnZXQpLmlzKGRhdGEuZm9jdXNhYmxlRWxlbWVudHMpKSB7XG4gICAgICAgICAgc3dpcGVyLmFsbG93Q2xpY2sgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRhLmlzVG91Y2hlZCkge1xuICAgICAgICAgIE9iamVjdC5hc3NpZ24odG91Y2hlcywge1xuICAgICAgICAgICAgc3RhcnRYOiBwYWdlWCxcbiAgICAgICAgICAgIHN0YXJ0WTogcGFnZVksXG4gICAgICAgICAgICBjdXJyZW50WDogcGFnZVgsXG4gICAgICAgICAgICBjdXJyZW50WTogcGFnZVlcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBkYXRhLnRvdWNoU3RhcnRUaW1lID0gbm93KCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChkYXRhLmlzVG91Y2hFdmVudCAmJiBwYXJhbXMudG91Y2hSZWxlYXNlT25FZGdlcyAmJiAhcGFyYW1zLmxvb3ApIHtcbiAgICAgICAgaWYgKHN3aXBlci5pc1ZlcnRpY2FsKCkpIHtcbiAgICAgICAgICAvLyBWZXJ0aWNhbFxuICAgICAgICAgIGlmIChwYWdlWSA8IHRvdWNoZXMuc3RhcnRZICYmIHN3aXBlci50cmFuc2xhdGUgPD0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpIHx8IHBhZ2VZID4gdG91Y2hlcy5zdGFydFkgJiYgc3dpcGVyLnRyYW5zbGF0ZSA+PSBzd2lwZXIubWluVHJhbnNsYXRlKCkpIHtcbiAgICAgICAgICAgIGRhdGEuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgICAgICAgICBkYXRhLmlzTW92ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocGFnZVggPCB0b3VjaGVzLnN0YXJ0WCAmJiBzd2lwZXIudHJhbnNsYXRlIDw9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSB8fCBwYWdlWCA+IHRvdWNoZXMuc3RhcnRYICYmIHN3aXBlci50cmFuc2xhdGUgPj0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChkYXRhLmlzVG91Y2hFdmVudCAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiAkKGUudGFyZ2V0KS5pcyhkYXRhLmZvY3VzYWJsZUVsZW1lbnRzKSkge1xuICAgICAgICAgIGRhdGEuaXNNb3ZlZCA9IHRydWU7XG4gICAgICAgICAgc3dpcGVyLmFsbG93Q2xpY2sgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGRhdGEuYWxsb3dUb3VjaENhbGxiYWNrcykge1xuICAgICAgICBzd2lwZXIuZW1pdCgndG91Y2hNb3ZlJywgZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldFRvdWNoZXMgJiYgZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA+IDEpIHJldHVybjtcbiAgICAgIHRvdWNoZXMuY3VycmVudFggPSBwYWdlWDtcbiAgICAgIHRvdWNoZXMuY3VycmVudFkgPSBwYWdlWTtcbiAgICAgIGNvbnN0IGRpZmZYID0gdG91Y2hlcy5jdXJyZW50WCAtIHRvdWNoZXMuc3RhcnRYO1xuICAgICAgY29uc3QgZGlmZlkgPSB0b3VjaGVzLmN1cnJlbnRZIC0gdG91Y2hlcy5zdGFydFk7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy50aHJlc2hvbGQgJiYgTWF0aC5zcXJ0KGRpZmZYICoqIDIgKyBkaWZmWSAqKiAyKSA8IHN3aXBlci5wYXJhbXMudGhyZXNob2xkKSByZXR1cm47XG5cbiAgICAgIGlmICh0eXBlb2YgZGF0YS5pc1Njcm9sbGluZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbGV0IHRvdWNoQW5nbGU7XG5cbiAgICAgICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSAmJiB0b3VjaGVzLmN1cnJlbnRZID09PSB0b3VjaGVzLnN0YXJ0WSB8fCBzd2lwZXIuaXNWZXJ0aWNhbCgpICYmIHRvdWNoZXMuY3VycmVudFggPT09IHRvdWNoZXMuc3RhcnRYKSB7XG4gICAgICAgICAgZGF0YS5pc1Njcm9sbGluZyA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgIGlmIChkaWZmWCAqIGRpZmZYICsgZGlmZlkgKiBkaWZmWSA+PSAyNSkge1xuICAgICAgICAgICAgdG91Y2hBbmdsZSA9IE1hdGguYXRhbjIoTWF0aC5hYnMoZGlmZlkpLCBNYXRoLmFicyhkaWZmWCkpICogMTgwIC8gTWF0aC5QSTtcbiAgICAgICAgICAgIGRhdGEuaXNTY3JvbGxpbmcgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyB0b3VjaEFuZ2xlID4gcGFyYW1zLnRvdWNoQW5nbGUgOiA5MCAtIHRvdWNoQW5nbGUgPiBwYXJhbXMudG91Y2hBbmdsZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGRhdGEuaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgc3dpcGVyLmVtaXQoJ3RvdWNoTW92ZU9wcG9zaXRlJywgZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgZGF0YS5zdGFydE1vdmluZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKHRvdWNoZXMuY3VycmVudFggIT09IHRvdWNoZXMuc3RhcnRYIHx8IHRvdWNoZXMuY3VycmVudFkgIT09IHRvdWNoZXMuc3RhcnRZKSB7XG4gICAgICAgICAgZGF0YS5zdGFydE1vdmluZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGRhdGEuaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgZGF0YS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWRhdGEuc3RhcnRNb3ZpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzd2lwZXIuYWxsb3dDbGljayA9IGZhbHNlO1xuXG4gICAgICBpZiAoIXBhcmFtcy5jc3NNb2RlICYmIGUuY2FuY2VsYWJsZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMudG91Y2hNb3ZlU3RvcFByb3BhZ2F0aW9uICYmICFwYXJhbXMubmVzdGVkKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICghZGF0YS5pc01vdmVkKSB7XG4gICAgICAgIGlmIChwYXJhbXMubG9vcCAmJiAhcGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgICBzd2lwZXIubG9vcEZpeCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0YS5zdGFydFRyYW5zbGF0ZSA9IHN3aXBlci5nZXRUcmFuc2xhdGUoKTtcbiAgICAgICAgc3dpcGVyLnNldFRyYW5zaXRpb24oMCk7XG5cbiAgICAgICAgaWYgKHN3aXBlci5hbmltYXRpbmcpIHtcbiAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC50cmlnZ2VyKCd3ZWJraXRUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGEuYWxsb3dNb21lbnR1bUJvdW5jZSA9IGZhbHNlOyAvLyBHcmFiIEN1cnNvclxuXG4gICAgICAgIGlmIChwYXJhbXMuZ3JhYkN1cnNvciAmJiAoc3dpcGVyLmFsbG93U2xpZGVOZXh0ID09PSB0cnVlIHx8IHN3aXBlci5hbGxvd1NsaWRlUHJldiA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICBzd2lwZXIuc2V0R3JhYkN1cnNvcih0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXBlci5lbWl0KCdzbGlkZXJGaXJzdE1vdmUnLCBlKTtcbiAgICAgIH1cblxuICAgICAgc3dpcGVyLmVtaXQoJ3NsaWRlck1vdmUnLCBlKTtcbiAgICAgIGRhdGEuaXNNb3ZlZCA9IHRydWU7XG4gICAgICBsZXQgZGlmZiA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/IGRpZmZYIDogZGlmZlk7XG4gICAgICB0b3VjaGVzLmRpZmYgPSBkaWZmO1xuICAgICAgZGlmZiAqPSBwYXJhbXMudG91Y2hSYXRpbztcbiAgICAgIGlmIChydGwpIGRpZmYgPSAtZGlmZjtcbiAgICAgIHN3aXBlci5zd2lwZURpcmVjdGlvbiA9IGRpZmYgPiAwID8gJ3ByZXYnIDogJ25leHQnO1xuICAgICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gZGlmZiArIGRhdGEuc3RhcnRUcmFuc2xhdGU7XG4gICAgICBsZXQgZGlzYWJsZVBhcmVudFN3aXBlciA9IHRydWU7XG4gICAgICBsZXQgcmVzaXN0YW5jZVJhdGlvID0gcGFyYW1zLnJlc2lzdGFuY2VSYXRpbztcblxuICAgICAgaWYgKHBhcmFtcy50b3VjaFJlbGVhc2VPbkVkZ2VzKSB7XG4gICAgICAgIHJlc2lzdGFuY2VSYXRpbyA9IDA7XG4gICAgICB9XG5cbiAgICAgIGlmIChkaWZmID4gMCAmJiBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPiBzd2lwZXIubWluVHJhbnNsYXRlKCkpIHtcbiAgICAgICAgZGlzYWJsZVBhcmVudFN3aXBlciA9IGZhbHNlO1xuICAgICAgICBpZiAocGFyYW1zLnJlc2lzdGFuY2UpIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IHN3aXBlci5taW5UcmFuc2xhdGUoKSAtIDEgKyAoLXN3aXBlci5taW5UcmFuc2xhdGUoKSArIGRhdGEuc3RhcnRUcmFuc2xhdGUgKyBkaWZmKSAqKiByZXNpc3RhbmNlUmF0aW87XG4gICAgICB9IGVsc2UgaWYgKGRpZmYgPCAwICYmIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA8IHN3aXBlci5tYXhUcmFuc2xhdGUoKSkge1xuICAgICAgICBkaXNhYmxlUGFyZW50U3dpcGVyID0gZmFsc2U7XG4gICAgICAgIGlmIChwYXJhbXMucmVzaXN0YW5jZSkgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpICsgMSAtIChzd2lwZXIubWF4VHJhbnNsYXRlKCkgLSBkYXRhLnN0YXJ0VHJhbnNsYXRlIC0gZGlmZikgKiogcmVzaXN0YW5jZVJhdGlvO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGlzYWJsZVBhcmVudFN3aXBlcikge1xuICAgICAgICBlLnByZXZlbnRlZEJ5TmVzdGVkU3dpcGVyID0gdHJ1ZTtcbiAgICAgIH0gLy8gRGlyZWN0aW9ucyBsb2Nrc1xuXG5cbiAgICAgIGlmICghc3dpcGVyLmFsbG93U2xpZGVOZXh0ICYmIHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gJ25leHQnICYmIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA8IGRhdGEuc3RhcnRUcmFuc2xhdGUpIHtcbiAgICAgICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gZGF0YS5zdGFydFRyYW5zbGF0ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZVByZXYgJiYgc3dpcGVyLnN3aXBlRGlyZWN0aW9uID09PSAncHJldicgJiYgZGF0YS5jdXJyZW50VHJhbnNsYXRlID4gZGF0YS5zdGFydFRyYW5zbGF0ZSkge1xuICAgICAgICBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBkYXRhLnN0YXJ0VHJhbnNsYXRlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXN3aXBlci5hbGxvd1NsaWRlUHJldiAmJiAhc3dpcGVyLmFsbG93U2xpZGVOZXh0KSB7XG4gICAgICAgIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IGRhdGEuc3RhcnRUcmFuc2xhdGU7XG4gICAgICB9IC8vIFRocmVzaG9sZFxuXG5cbiAgICAgIGlmIChwYXJhbXMudGhyZXNob2xkID4gMCkge1xuICAgICAgICBpZiAoTWF0aC5hYnMoZGlmZikgPiBwYXJhbXMudGhyZXNob2xkIHx8IGRhdGEuYWxsb3dUaHJlc2hvbGRNb3ZlKSB7XG4gICAgICAgICAgaWYgKCFkYXRhLmFsbG93VGhyZXNob2xkTW92ZSkge1xuICAgICAgICAgICAgZGF0YS5hbGxvd1RocmVzaG9sZE1vdmUgPSB0cnVlO1xuICAgICAgICAgICAgdG91Y2hlcy5zdGFydFggPSB0b3VjaGVzLmN1cnJlbnRYO1xuICAgICAgICAgICAgdG91Y2hlcy5zdGFydFkgPSB0b3VjaGVzLmN1cnJlbnRZO1xuICAgICAgICAgICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gZGF0YS5zdGFydFRyYW5zbGF0ZTtcbiAgICAgICAgICAgIHRvdWNoZXMuZGlmZiA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/IHRvdWNoZXMuY3VycmVudFggLSB0b3VjaGVzLnN0YXJ0WCA6IHRvdWNoZXMuY3VycmVudFkgLSB0b3VjaGVzLnN0YXJ0WTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gZGF0YS5zdGFydFRyYW5zbGF0ZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFwYXJhbXMuZm9sbG93RmluZ2VyIHx8IHBhcmFtcy5jc3NNb2RlKSByZXR1cm47IC8vIFVwZGF0ZSBhY3RpdmUgaW5kZXggaW4gZnJlZSBtb2RlXG5cbiAgICAgIGlmIChwYXJhbXMuZnJlZU1vZGUgJiYgcGFyYW1zLmZyZWVNb2RlLmVuYWJsZWQgJiYgc3dpcGVyLmZyZWVNb2RlIHx8IHBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzKSB7XG4gICAgICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgICAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5mcmVlTW9kZSAmJiBwYXJhbXMuZnJlZU1vZGUuZW5hYmxlZCAmJiBzd2lwZXIuZnJlZU1vZGUpIHtcbiAgICAgICAgc3dpcGVyLmZyZWVNb2RlLm9uVG91Y2hNb3ZlKCk7XG4gICAgICB9IC8vIFVwZGF0ZSBwcm9ncmVzc1xuXG5cbiAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcyhkYXRhLmN1cnJlbnRUcmFuc2xhdGUpOyAvLyBVcGRhdGUgdHJhbnNsYXRlXG5cbiAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUoZGF0YS5jdXJyZW50VHJhbnNsYXRlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblRvdWNoRW5kKGV2ZW50KSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgY29uc3QgZGF0YSA9IHN3aXBlci50b3VjaEV2ZW50c0RhdGE7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgdG91Y2hlcyxcbiAgICAgICAgcnRsVHJhbnNsYXRlOiBydGwsXG4gICAgICAgIHNsaWRlc0dyaWQsXG4gICAgICAgIGVuYWJsZWRcbiAgICAgIH0gPSBzd2lwZXI7XG4gICAgICBpZiAoIWVuYWJsZWQpIHJldHVybjtcbiAgICAgIGxldCBlID0gZXZlbnQ7XG4gICAgICBpZiAoZS5vcmlnaW5hbEV2ZW50KSBlID0gZS5vcmlnaW5hbEV2ZW50O1xuXG4gICAgICBpZiAoZGF0YS5hbGxvd1RvdWNoQ2FsbGJhY2tzKSB7XG4gICAgICAgIHN3aXBlci5lbWl0KCd0b3VjaEVuZCcsIGUpO1xuICAgICAgfVxuXG4gICAgICBkYXRhLmFsbG93VG91Y2hDYWxsYmFja3MgPSBmYWxzZTtcblxuICAgICAgaWYgKCFkYXRhLmlzVG91Y2hlZCkge1xuICAgICAgICBpZiAoZGF0YS5pc01vdmVkICYmIHBhcmFtcy5ncmFiQ3Vyc29yKSB7XG4gICAgICAgICAgc3dpcGVyLnNldEdyYWJDdXJzb3IoZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0YS5pc01vdmVkID0gZmFsc2U7XG4gICAgICAgIGRhdGEuc3RhcnRNb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBSZXR1cm4gR3JhYiBDdXJzb3JcblxuXG4gICAgICBpZiAocGFyYW1zLmdyYWJDdXJzb3IgJiYgZGF0YS5pc01vdmVkICYmIGRhdGEuaXNUb3VjaGVkICYmIChzd2lwZXIuYWxsb3dTbGlkZU5leHQgPT09IHRydWUgfHwgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID09PSB0cnVlKSkge1xuICAgICAgICBzd2lwZXIuc2V0R3JhYkN1cnNvcihmYWxzZSk7XG4gICAgICB9IC8vIFRpbWUgZGlmZlxuXG5cbiAgICAgIGNvbnN0IHRvdWNoRW5kVGltZSA9IG5vdygpO1xuICAgICAgY29uc3QgdGltZURpZmYgPSB0b3VjaEVuZFRpbWUgLSBkYXRhLnRvdWNoU3RhcnRUaW1lOyAvLyBUYXAsIGRvdWJsZVRhcCwgQ2xpY2tcblxuICAgICAgaWYgKHN3aXBlci5hbGxvd0NsaWNrKSB7XG4gICAgICAgIGNvbnN0IHBhdGhUcmVlID0gZS5wYXRoIHx8IGUuY29tcG9zZWRQYXRoICYmIGUuY29tcG9zZWRQYXRoKCk7XG4gICAgICAgIHN3aXBlci51cGRhdGVDbGlja2VkU2xpZGUocGF0aFRyZWUgJiYgcGF0aFRyZWVbMF0gfHwgZS50YXJnZXQpO1xuICAgICAgICBzd2lwZXIuZW1pdCgndGFwIGNsaWNrJywgZSk7XG5cbiAgICAgICAgaWYgKHRpbWVEaWZmIDwgMzAwICYmIHRvdWNoRW5kVGltZSAtIGRhdGEubGFzdENsaWNrVGltZSA8IDMwMCkge1xuICAgICAgICAgIHN3aXBlci5lbWl0KCdkb3VibGVUYXAgZG91YmxlQ2xpY2snLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkYXRhLmxhc3RDbGlja1RpbWUgPSBub3coKTtcbiAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgaWYgKCFzd2lwZXIuZGVzdHJveWVkKSBzd2lwZXIuYWxsb3dDbGljayA9IHRydWU7XG4gICAgICB9KTtcblxuICAgICAgaWYgKCFkYXRhLmlzVG91Y2hlZCB8fCAhZGF0YS5pc01vdmVkIHx8ICFzd2lwZXIuc3dpcGVEaXJlY3Rpb24gfHwgdG91Y2hlcy5kaWZmID09PSAwIHx8IGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9PT0gZGF0YS5zdGFydFRyYW5zbGF0ZSkge1xuICAgICAgICBkYXRhLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgICAgICBkYXRhLmlzTW92ZWQgPSBmYWxzZTtcbiAgICAgICAgZGF0YS5zdGFydE1vdmluZyA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGRhdGEuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgICBkYXRhLmlzTW92ZWQgPSBmYWxzZTtcbiAgICAgIGRhdGEuc3RhcnRNb3ZpbmcgPSBmYWxzZTtcbiAgICAgIGxldCBjdXJyZW50UG9zO1xuXG4gICAgICBpZiAocGFyYW1zLmZvbGxvd0Zpbmdlcikge1xuICAgICAgICBjdXJyZW50UG9zID0gcnRsID8gc3dpcGVyLnRyYW5zbGF0ZSA6IC1zd2lwZXIudHJhbnNsYXRlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3VycmVudFBvcyA9IC1kYXRhLmN1cnJlbnRUcmFuc2xhdGU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMuY3NzTW9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmZyZWVNb2RlICYmIHBhcmFtcy5mcmVlTW9kZS5lbmFibGVkKSB7XG4gICAgICAgIHN3aXBlci5mcmVlTW9kZS5vblRvdWNoRW5kKHtcbiAgICAgICAgICBjdXJyZW50UG9zXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIEZpbmQgY3VycmVudCBzbGlkZVxuXG5cbiAgICAgIGxldCBzdG9wSW5kZXggPSAwO1xuICAgICAgbGV0IGdyb3VwU2l6ZSA9IHN3aXBlci5zbGlkZXNTaXplc0dyaWRbMF07XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzR3JpZC5sZW5ndGg7IGkgKz0gaSA8IHBhcmFtcy5zbGlkZXNQZXJHcm91cFNraXAgPyAxIDogcGFyYW1zLnNsaWRlc1Blckdyb3VwKSB7XG4gICAgICAgIGNvbnN0IGluY3JlbWVudCA9IGkgPCBwYXJhbXMuc2xpZGVzUGVyR3JvdXBTa2lwIC0gMSA/IDEgOiBwYXJhbXMuc2xpZGVzUGVyR3JvdXA7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBzbGlkZXNHcmlkW2kgKyBpbmNyZW1lbnRdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlmIChjdXJyZW50UG9zID49IHNsaWRlc0dyaWRbaV0gJiYgY3VycmVudFBvcyA8IHNsaWRlc0dyaWRbaSArIGluY3JlbWVudF0pIHtcbiAgICAgICAgICAgIHN0b3BJbmRleCA9IGk7XG4gICAgICAgICAgICBncm91cFNpemUgPSBzbGlkZXNHcmlkW2kgKyBpbmNyZW1lbnRdIC0gc2xpZGVzR3JpZFtpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFBvcyA+PSBzbGlkZXNHcmlkW2ldKSB7XG4gICAgICAgICAgc3RvcEluZGV4ID0gaTtcbiAgICAgICAgICBncm91cFNpemUgPSBzbGlkZXNHcmlkW3NsaWRlc0dyaWQubGVuZ3RoIC0gMV0gLSBzbGlkZXNHcmlkW3NsaWRlc0dyaWQubGVuZ3RoIC0gMl07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IHJld2luZEZpcnN0SW5kZXggPSBudWxsO1xuICAgICAgbGV0IHJld2luZExhc3RJbmRleCA9IG51bGw7XG5cbiAgICAgIGlmIChwYXJhbXMucmV3aW5kKSB7XG4gICAgICAgIGlmIChzd2lwZXIuaXNCZWdpbm5pbmcpIHtcbiAgICAgICAgICByZXdpbmRMYXN0SW5kZXggPSBzd2lwZXIucGFyYW1zLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQgJiYgc3dpcGVyLnZpcnR1YWwgPyBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoIC0gMSA6IHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChzd2lwZXIuaXNFbmQpIHtcbiAgICAgICAgICByZXdpbmRGaXJzdEluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgfSAvLyBGaW5kIGN1cnJlbnQgc2xpZGUgc2l6ZVxuXG5cbiAgICAgIGNvbnN0IHJhdGlvID0gKGN1cnJlbnRQb3MgLSBzbGlkZXNHcmlkW3N0b3BJbmRleF0pIC8gZ3JvdXBTaXplO1xuICAgICAgY29uc3QgaW5jcmVtZW50ID0gc3RvcEluZGV4IDwgcGFyYW1zLnNsaWRlc1Blckdyb3VwU2tpcCAtIDEgPyAxIDogcGFyYW1zLnNsaWRlc1Blckdyb3VwO1xuXG4gICAgICBpZiAodGltZURpZmYgPiBwYXJhbXMubG9uZ1N3aXBlc01zKSB7XG4gICAgICAgIC8vIExvbmcgdG91Y2hlc1xuICAgICAgICBpZiAoIXBhcmFtcy5sb25nU3dpcGVzKSB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3dpcGVyLnN3aXBlRGlyZWN0aW9uID09PSAnbmV4dCcpIHtcbiAgICAgICAgICBpZiAocmF0aW8gPj0gcGFyYW1zLmxvbmdTd2lwZXNSYXRpbykgc3dpcGVyLnNsaWRlVG8ocGFyYW1zLnJld2luZCAmJiBzd2lwZXIuaXNFbmQgPyByZXdpbmRGaXJzdEluZGV4IDogc3RvcEluZGV4ICsgaW5jcmVtZW50KTtlbHNlIHN3aXBlci5zbGlkZVRvKHN0b3BJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3dpcGVyLnN3aXBlRGlyZWN0aW9uID09PSAncHJldicpIHtcbiAgICAgICAgICBpZiAocmF0aW8gPiAxIC0gcGFyYW1zLmxvbmdTd2lwZXNSYXRpbykge1xuICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3RvcEluZGV4ICsgaW5jcmVtZW50KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJld2luZExhc3RJbmRleCAhPT0gbnVsbCAmJiByYXRpbyA8IDAgJiYgTWF0aC5hYnMocmF0aW8pID4gcGFyYW1zLmxvbmdTd2lwZXNSYXRpbykge1xuICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG8ocmV3aW5kTGFzdEluZGV4KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3RvcEluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFNob3J0IHN3aXBlc1xuICAgICAgICBpZiAoIXBhcmFtcy5zaG9ydFN3aXBlcykge1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXNOYXZCdXR0b25UYXJnZXQgPSBzd2lwZXIubmF2aWdhdGlvbiAmJiAoZS50YXJnZXQgPT09IHN3aXBlci5uYXZpZ2F0aW9uLm5leHRFbCB8fCBlLnRhcmdldCA9PT0gc3dpcGVyLm5hdmlnYXRpb24ucHJldkVsKTtcblxuICAgICAgICBpZiAoIWlzTmF2QnV0dG9uVGFyZ2V0KSB7XG4gICAgICAgICAgaWYgKHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gJ25leHQnKSB7XG4gICAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhyZXdpbmRGaXJzdEluZGV4ICE9PSBudWxsID8gcmV3aW5kRmlyc3RJbmRleCA6IHN0b3BJbmRleCArIGluY3JlbWVudCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gJ3ByZXYnKSB7XG4gICAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhyZXdpbmRMYXN0SW5kZXggIT09IG51bGwgPyByZXdpbmRMYXN0SW5kZXggOiBzdG9wSW5kZXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldCA9PT0gc3dpcGVyLm5hdmlnYXRpb24ubmV4dEVsKSB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3RvcEluZGV4ICsgaW5jcmVtZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzdG9wSW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25SZXNpemUoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgY29uc3Qge1xuICAgICAgICBwYXJhbXMsXG4gICAgICAgIGVsXG4gICAgICB9ID0gc3dpcGVyO1xuICAgICAgaWYgKGVsICYmIGVsLm9mZnNldFdpZHRoID09PSAwKSByZXR1cm47IC8vIEJyZWFrcG9pbnRzXG5cbiAgICAgIGlmIChwYXJhbXMuYnJlYWtwb2ludHMpIHtcbiAgICAgICAgc3dpcGVyLnNldEJyZWFrcG9pbnQoKTtcbiAgICAgIH0gLy8gU2F2ZSBsb2Nrc1xuXG5cbiAgICAgIGNvbnN0IHtcbiAgICAgICAgYWxsb3dTbGlkZU5leHQsXG4gICAgICAgIGFsbG93U2xpZGVQcmV2LFxuICAgICAgICBzbmFwR3JpZFxuICAgICAgfSA9IHN3aXBlcjsgLy8gRGlzYWJsZSBsb2NrcyBvbiByZXNpemVcblxuICAgICAgc3dpcGVyLmFsbG93U2xpZGVOZXh0ID0gdHJ1ZTtcbiAgICAgIHN3aXBlci5hbGxvd1NsaWRlUHJldiA9IHRydWU7XG4gICAgICBzd2lwZXIudXBkYXRlU2l6ZSgpO1xuICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlcygpO1xuICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcblxuICAgICAgaWYgKChwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nIHx8IHBhcmFtcy5zbGlkZXNQZXJWaWV3ID4gMSkgJiYgc3dpcGVyLmlzRW5kICYmICFzd2lwZXIuaXNCZWdpbm5pbmcgJiYgIXN3aXBlci5wYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnNsaWRlcy5sZW5ndGggLSAxLCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXgsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN3aXBlci5hdXRvcGxheSAmJiBzd2lwZXIuYXV0b3BsYXkucnVubmluZyAmJiBzd2lwZXIuYXV0b3BsYXkucGF1c2VkKSB7XG4gICAgICAgIHN3aXBlci5hdXRvcGxheS5ydW4oKTtcbiAgICAgIH0gLy8gUmV0dXJuIGxvY2tzIGFmdGVyIHJlc2l6ZVxuXG5cbiAgICAgIHN3aXBlci5hbGxvd1NsaWRlUHJldiA9IGFsbG93U2xpZGVQcmV2O1xuICAgICAgc3dpcGVyLmFsbG93U2xpZGVOZXh0ID0gYWxsb3dTbGlkZU5leHQ7XG5cbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cgJiYgc25hcEdyaWQgIT09IHN3aXBlci5zbmFwR3JpZCkge1xuICAgICAgICBzd2lwZXIuY2hlY2tPdmVyZmxvdygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQ2xpY2soZSkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmICghc3dpcGVyLmVuYWJsZWQpIHJldHVybjtcblxuICAgICAgaWYgKCFzd2lwZXIuYWxsb3dDbGljaykge1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5wcmV2ZW50Q2xpY2tzKSBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMucHJldmVudENsaWNrc1Byb3BhZ2F0aW9uICYmIHN3aXBlci5hbmltYXRpbmcpIHtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblNjcm9sbCgpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHdyYXBwZXJFbCxcbiAgICAgICAgcnRsVHJhbnNsYXRlLFxuICAgICAgICBlbmFibGVkXG4gICAgICB9ID0gc3dpcGVyO1xuICAgICAgaWYgKCFlbmFibGVkKSByZXR1cm47XG4gICAgICBzd2lwZXIucHJldmlvdXNUcmFuc2xhdGUgPSBzd2lwZXIudHJhbnNsYXRlO1xuXG4gICAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgIHN3aXBlci50cmFuc2xhdGUgPSAtd3JhcHBlckVsLnNjcm9sbExlZnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2lwZXIudHJhbnNsYXRlID0gLXdyYXBwZXJFbC5zY3JvbGxUb3A7XG4gICAgICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuXG5cbiAgICAgIGlmIChzd2lwZXIudHJhbnNsYXRlID09PSAwKSBzd2lwZXIudHJhbnNsYXRlID0gMDtcbiAgICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICAgIGxldCBuZXdQcm9ncmVzcztcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZXNEaWZmID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xuXG4gICAgICBpZiAodHJhbnNsYXRlc0RpZmYgPT09IDApIHtcbiAgICAgICAgbmV3UHJvZ3Jlc3MgPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3UHJvZ3Jlc3MgPSAoc3dpcGVyLnRyYW5zbGF0ZSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKSkgLyB0cmFuc2xhdGVzRGlmZjtcbiAgICAgIH1cblxuICAgICAgaWYgKG5ld1Byb2dyZXNzICE9PSBzd2lwZXIucHJvZ3Jlc3MpIHtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKHJ0bFRyYW5zbGF0ZSA/IC1zd2lwZXIudHJhbnNsYXRlIDogc3dpcGVyLnRyYW5zbGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIHN3aXBlci5lbWl0KCdzZXRUcmFuc2xhdGUnLCBzd2lwZXIudHJhbnNsYXRlLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgbGV0IGR1bW15RXZlbnRBdHRhY2hlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gZHVtbXlFdmVudExpc3RlbmVyKCkge31cblxuICAgIGNvbnN0IGV2ZW50cyA9IChzd2lwZXIsIG1ldGhvZCkgPT4ge1xuICAgICAgY29uc3QgZG9jdW1lbnQgPSBnZXREb2N1bWVudCgpO1xuICAgICAgY29uc3Qge1xuICAgICAgICBwYXJhbXMsXG4gICAgICAgIHRvdWNoRXZlbnRzLFxuICAgICAgICBlbCxcbiAgICAgICAgd3JhcHBlckVsLFxuICAgICAgICBkZXZpY2UsXG4gICAgICAgIHN1cHBvcnRcbiAgICAgIH0gPSBzd2lwZXI7XG4gICAgICBjb25zdCBjYXB0dXJlID0gISFwYXJhbXMubmVzdGVkO1xuICAgICAgY29uc3QgZG9tTWV0aG9kID0gbWV0aG9kID09PSAnb24nID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ3JlbW92ZUV2ZW50TGlzdGVuZXInO1xuICAgICAgY29uc3Qgc3dpcGVyTWV0aG9kID0gbWV0aG9kOyAvLyBUb3VjaCBFdmVudHNcblxuICAgICAgaWYgKCFzdXBwb3J0LnRvdWNoKSB7XG4gICAgICAgIGVsW2RvbU1ldGhvZF0odG91Y2hFdmVudHMuc3RhcnQsIHN3aXBlci5vblRvdWNoU3RhcnQsIGZhbHNlKTtcbiAgICAgICAgZG9jdW1lbnRbZG9tTWV0aG9kXSh0b3VjaEV2ZW50cy5tb3ZlLCBzd2lwZXIub25Ub3VjaE1vdmUsIGNhcHR1cmUpO1xuICAgICAgICBkb2N1bWVudFtkb21NZXRob2RdKHRvdWNoRXZlbnRzLmVuZCwgc3dpcGVyLm9uVG91Y2hFbmQsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhc3NpdmVMaXN0ZW5lciA9IHRvdWNoRXZlbnRzLnN0YXJ0ID09PSAndG91Y2hzdGFydCcgJiYgc3VwcG9ydC5wYXNzaXZlTGlzdGVuZXIgJiYgcGFyYW1zLnBhc3NpdmVMaXN0ZW5lcnMgPyB7XG4gICAgICAgICAgcGFzc2l2ZTogdHJ1ZSxcbiAgICAgICAgICBjYXB0dXJlOiBmYWxzZVxuICAgICAgICB9IDogZmFsc2U7XG4gICAgICAgIGVsW2RvbU1ldGhvZF0odG91Y2hFdmVudHMuc3RhcnQsIHN3aXBlci5vblRvdWNoU3RhcnQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICAgIGVsW2RvbU1ldGhvZF0odG91Y2hFdmVudHMubW92ZSwgc3dpcGVyLm9uVG91Y2hNb3ZlLCBzdXBwb3J0LnBhc3NpdmVMaXN0ZW5lciA/IHtcbiAgICAgICAgICBwYXNzaXZlOiBmYWxzZSxcbiAgICAgICAgICBjYXB0dXJlXG4gICAgICAgIH0gOiBjYXB0dXJlKTtcbiAgICAgICAgZWxbZG9tTWV0aG9kXSh0b3VjaEV2ZW50cy5lbmQsIHN3aXBlci5vblRvdWNoRW5kLCBwYXNzaXZlTGlzdGVuZXIpO1xuXG4gICAgICAgIGlmICh0b3VjaEV2ZW50cy5jYW5jZWwpIHtcbiAgICAgICAgICBlbFtkb21NZXRob2RdKHRvdWNoRXZlbnRzLmNhbmNlbCwgc3dpcGVyLm9uVG91Y2hFbmQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gLy8gUHJldmVudCBMaW5rcyBDbGlja3NcblxuXG4gICAgICBpZiAocGFyYW1zLnByZXZlbnRDbGlja3MgfHwgcGFyYW1zLnByZXZlbnRDbGlja3NQcm9wYWdhdGlvbikge1xuICAgICAgICBlbFtkb21NZXRob2RdKCdjbGljaycsIHN3aXBlci5vbkNsaWNrLCB0cnVlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICAgIHdyYXBwZXJFbFtkb21NZXRob2RdKCdzY3JvbGwnLCBzd2lwZXIub25TY3JvbGwpO1xuICAgICAgfSAvLyBSZXNpemUgaGFuZGxlclxuXG5cbiAgICAgIGlmIChwYXJhbXMudXBkYXRlT25XaW5kb3dSZXNpemUpIHtcbiAgICAgICAgc3dpcGVyW3N3aXBlck1ldGhvZF0oZGV2aWNlLmlvcyB8fCBkZXZpY2UuYW5kcm9pZCA/ICdyZXNpemUgb3JpZW50YXRpb25jaGFuZ2Ugb2JzZXJ2ZXJVcGRhdGUnIDogJ3Jlc2l6ZSBvYnNlcnZlclVwZGF0ZScsIG9uUmVzaXplLCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXBlcltzd2lwZXJNZXRob2RdKCdvYnNlcnZlclVwZGF0ZScsIG9uUmVzaXplLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYXR0YWNoRXZlbnRzKCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIGNvbnN0IGRvY3VtZW50ID0gZ2V0RG9jdW1lbnQoKTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgcGFyYW1zLFxuICAgICAgICBzdXBwb3J0XG4gICAgICB9ID0gc3dpcGVyO1xuICAgICAgc3dpcGVyLm9uVG91Y2hTdGFydCA9IG9uVG91Y2hTdGFydC5iaW5kKHN3aXBlcik7XG4gICAgICBzd2lwZXIub25Ub3VjaE1vdmUgPSBvblRvdWNoTW92ZS5iaW5kKHN3aXBlcik7XG4gICAgICBzd2lwZXIub25Ub3VjaEVuZCA9IG9uVG91Y2hFbmQuYmluZChzd2lwZXIpO1xuXG4gICAgICBpZiAocGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgc3dpcGVyLm9uU2Nyb2xsID0gb25TY3JvbGwuYmluZChzd2lwZXIpO1xuICAgICAgfVxuXG4gICAgICBzd2lwZXIub25DbGljayA9IG9uQ2xpY2suYmluZChzd2lwZXIpO1xuXG4gICAgICBpZiAoc3VwcG9ydC50b3VjaCAmJiAhZHVtbXlFdmVudEF0dGFjaGVkKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBkdW1teUV2ZW50TGlzdGVuZXIpO1xuICAgICAgICBkdW1teUV2ZW50QXR0YWNoZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBldmVudHMoc3dpcGVyLCAnb24nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXRhY2hFdmVudHMoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgZXZlbnRzKHN3aXBlciwgJ29mZicpO1xuICAgIH1cblxuICAgIHZhciBldmVudHMkMSA9IHtcbiAgICAgIGF0dGFjaEV2ZW50cyxcbiAgICAgIGRldGFjaEV2ZW50c1xuICAgIH07XG5cbiAgICBjb25zdCBpc0dyaWRFbmFibGVkID0gKHN3aXBlciwgcGFyYW1zKSA9PiB7XG4gICAgICByZXR1cm4gc3dpcGVyLmdyaWQgJiYgcGFyYW1zLmdyaWQgJiYgcGFyYW1zLmdyaWQucm93cyA+IDE7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldEJyZWFrcG9pbnQoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgY29uc3Qge1xuICAgICAgICBhY3RpdmVJbmRleCxcbiAgICAgICAgaW5pdGlhbGl6ZWQsXG4gICAgICAgIGxvb3BlZFNsaWRlcyA9IDAsXG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgJGVsXG4gICAgICB9ID0gc3dpcGVyO1xuICAgICAgY29uc3QgYnJlYWtwb2ludHMgPSBwYXJhbXMuYnJlYWtwb2ludHM7XG4gICAgICBpZiAoIWJyZWFrcG9pbnRzIHx8IGJyZWFrcG9pbnRzICYmIE9iamVjdC5rZXlzKGJyZWFrcG9pbnRzKS5sZW5ndGggPT09IDApIHJldHVybjsgLy8gR2V0IGJyZWFrcG9pbnQgZm9yIHdpbmRvdyB3aWR0aCBhbmQgdXBkYXRlIHBhcmFtZXRlcnNcblxuICAgICAgY29uc3QgYnJlYWtwb2ludCA9IHN3aXBlci5nZXRCcmVha3BvaW50KGJyZWFrcG9pbnRzLCBzd2lwZXIucGFyYW1zLmJyZWFrcG9pbnRzQmFzZSwgc3dpcGVyLmVsKTtcbiAgICAgIGlmICghYnJlYWtwb2ludCB8fCBzd2lwZXIuY3VycmVudEJyZWFrcG9pbnQgPT09IGJyZWFrcG9pbnQpIHJldHVybjtcbiAgICAgIGNvbnN0IGJyZWFrcG9pbnRPbmx5UGFyYW1zID0gYnJlYWtwb2ludCBpbiBicmVha3BvaW50cyA/IGJyZWFrcG9pbnRzW2JyZWFrcG9pbnRdIDogdW5kZWZpbmVkO1xuICAgICAgY29uc3QgYnJlYWtwb2ludFBhcmFtcyA9IGJyZWFrcG9pbnRPbmx5UGFyYW1zIHx8IHN3aXBlci5vcmlnaW5hbFBhcmFtcztcbiAgICAgIGNvbnN0IHdhc011bHRpUm93ID0gaXNHcmlkRW5hYmxlZChzd2lwZXIsIHBhcmFtcyk7XG4gICAgICBjb25zdCBpc011bHRpUm93ID0gaXNHcmlkRW5hYmxlZChzd2lwZXIsIGJyZWFrcG9pbnRQYXJhbXMpO1xuICAgICAgY29uc3Qgd2FzRW5hYmxlZCA9IHBhcmFtcy5lbmFibGVkO1xuXG4gICAgICBpZiAod2FzTXVsdGlSb3cgJiYgIWlzTXVsdGlSb3cpIHtcbiAgICAgICAgJGVsLnJlbW92ZUNsYXNzKGAke3BhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfWdyaWQgJHtwYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc31ncmlkLWNvbHVtbmApO1xuICAgICAgICBzd2lwZXIuZW1pdENvbnRhaW5lckNsYXNzZXMoKTtcbiAgICAgIH0gZWxzZSBpZiAoIXdhc011bHRpUm93ICYmIGlzTXVsdGlSb3cpIHtcbiAgICAgICAgJGVsLmFkZENsYXNzKGAke3BhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfWdyaWRgKTtcblxuICAgICAgICBpZiAoYnJlYWtwb2ludFBhcmFtcy5ncmlkLmZpbGwgJiYgYnJlYWtwb2ludFBhcmFtcy5ncmlkLmZpbGwgPT09ICdjb2x1bW4nIHx8ICFicmVha3BvaW50UGFyYW1zLmdyaWQuZmlsbCAmJiBwYXJhbXMuZ3JpZC5maWxsID09PSAnY29sdW1uJykge1xuICAgICAgICAgICRlbC5hZGRDbGFzcyhgJHtwYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc31ncmlkLWNvbHVtbmApO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpcGVyLmVtaXRDb250YWluZXJDbGFzc2VzKCk7XG4gICAgICB9IC8vIFRvZ2dsZSBuYXZpZ2F0aW9uLCBwYWdpbmF0aW9uLCBzY3JvbGxiYXJcblxuXG4gICAgICBbJ25hdmlnYXRpb24nLCAncGFnaW5hdGlvbicsICdzY3JvbGxiYXInXS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICBjb25zdCB3YXNNb2R1bGVFbmFibGVkID0gcGFyYW1zW3Byb3BdICYmIHBhcmFtc1twcm9wXS5lbmFibGVkO1xuICAgICAgICBjb25zdCBpc01vZHVsZUVuYWJsZWQgPSBicmVha3BvaW50UGFyYW1zW3Byb3BdICYmIGJyZWFrcG9pbnRQYXJhbXNbcHJvcF0uZW5hYmxlZDtcblxuICAgICAgICBpZiAod2FzTW9kdWxlRW5hYmxlZCAmJiAhaXNNb2R1bGVFbmFibGVkKSB7XG4gICAgICAgICAgc3dpcGVyW3Byb3BdLmRpc2FibGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghd2FzTW9kdWxlRW5hYmxlZCAmJiBpc01vZHVsZUVuYWJsZWQpIHtcbiAgICAgICAgICBzd2lwZXJbcHJvcF0uZW5hYmxlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgY29uc3QgZGlyZWN0aW9uQ2hhbmdlZCA9IGJyZWFrcG9pbnRQYXJhbXMuZGlyZWN0aW9uICYmIGJyZWFrcG9pbnRQYXJhbXMuZGlyZWN0aW9uICE9PSBwYXJhbXMuZGlyZWN0aW9uO1xuICAgICAgY29uc3QgbmVlZHNSZUxvb3AgPSBwYXJhbXMubG9vcCAmJiAoYnJlYWtwb2ludFBhcmFtcy5zbGlkZXNQZXJWaWV3ICE9PSBwYXJhbXMuc2xpZGVzUGVyVmlldyB8fCBkaXJlY3Rpb25DaGFuZ2VkKTtcblxuICAgICAgaWYgKGRpcmVjdGlvbkNoYW5nZWQgJiYgaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgc3dpcGVyLmNoYW5nZURpcmVjdGlvbigpO1xuICAgICAgfVxuXG4gICAgICBleHRlbmQoc3dpcGVyLnBhcmFtcywgYnJlYWtwb2ludFBhcmFtcyk7XG4gICAgICBjb25zdCBpc0VuYWJsZWQgPSBzd2lwZXIucGFyYW1zLmVuYWJsZWQ7XG4gICAgICBPYmplY3QuYXNzaWduKHN3aXBlciwge1xuICAgICAgICBhbGxvd1RvdWNoTW92ZTogc3dpcGVyLnBhcmFtcy5hbGxvd1RvdWNoTW92ZSxcbiAgICAgICAgYWxsb3dTbGlkZU5leHQ6IHN3aXBlci5wYXJhbXMuYWxsb3dTbGlkZU5leHQsXG4gICAgICAgIGFsbG93U2xpZGVQcmV2OiBzd2lwZXIucGFyYW1zLmFsbG93U2xpZGVQcmV2XG4gICAgICB9KTtcblxuICAgICAgaWYgKHdhc0VuYWJsZWQgJiYgIWlzRW5hYmxlZCkge1xuICAgICAgICBzd2lwZXIuZGlzYWJsZSgpO1xuICAgICAgfSBlbHNlIGlmICghd2FzRW5hYmxlZCAmJiBpc0VuYWJsZWQpIHtcbiAgICAgICAgc3dpcGVyLmVuYWJsZSgpO1xuICAgICAgfVxuXG4gICAgICBzd2lwZXIuY3VycmVudEJyZWFrcG9pbnQgPSBicmVha3BvaW50O1xuICAgICAgc3dpcGVyLmVtaXQoJ19iZWZvcmVCcmVha3BvaW50JywgYnJlYWtwb2ludFBhcmFtcyk7XG5cbiAgICAgIGlmIChuZWVkc1JlTG9vcCAmJiBpbml0aWFsaXplZCkge1xuICAgICAgICBzd2lwZXIubG9vcERlc3Ryb3koKTtcbiAgICAgICAgc3dpcGVyLmxvb3BDcmVhdGUoKTtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlcygpO1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhhY3RpdmVJbmRleCAtIGxvb3BlZFNsaWRlcyArIHN3aXBlci5sb29wZWRTbGlkZXMsIDAsIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgc3dpcGVyLmVtaXQoJ2JyZWFrcG9pbnQnLCBicmVha3BvaW50UGFyYW1zKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRCcmVha3BvaW50KGJyZWFrcG9pbnRzLCBiYXNlLCBjb250YWluZXJFbCkge1xuICAgICAgaWYgKGJhc2UgPT09IHZvaWQgMCkge1xuICAgICAgICBiYXNlID0gJ3dpbmRvdyc7XG4gICAgICB9XG5cbiAgICAgIGlmICghYnJlYWtwb2ludHMgfHwgYmFzZSA9PT0gJ2NvbnRhaW5lcicgJiYgIWNvbnRhaW5lckVsKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgbGV0IGJyZWFrcG9pbnQgPSBmYWxzZTtcbiAgICAgIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICAgICAgY29uc3QgY3VycmVudEhlaWdodCA9IGJhc2UgPT09ICd3aW5kb3cnID8gd2luZG93LmlubmVySGVpZ2h0IDogY29udGFpbmVyRWwuY2xpZW50SGVpZ2h0O1xuICAgICAgY29uc3QgcG9pbnRzID0gT2JqZWN0LmtleXMoYnJlYWtwb2ludHMpLm1hcChwb2ludCA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgcG9pbnQgPT09ICdzdHJpbmcnICYmIHBvaW50LmluZGV4T2YoJ0AnKSA9PT0gMCkge1xuICAgICAgICAgIGNvbnN0IG1pblJhdGlvID0gcGFyc2VGbG9hdChwb2ludC5zdWJzdHIoMSkpO1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gY3VycmVudEhlaWdodCAqIG1pblJhdGlvO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIHBvaW50XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdmFsdWU6IHBvaW50LFxuICAgICAgICAgIHBvaW50XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICAgIHBvaW50cy5zb3J0KChhLCBiKSA9PiBwYXJzZUludChhLnZhbHVlLCAxMCkgLSBwYXJzZUludChiLnZhbHVlLCAxMCkpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgcG9pbnQsXG4gICAgICAgICAgdmFsdWVcbiAgICAgICAgfSA9IHBvaW50c1tpXTtcblxuICAgICAgICBpZiAoYmFzZSA9PT0gJ3dpbmRvdycpIHtcbiAgICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoYChtaW4td2lkdGg6ICR7dmFsdWV9cHgpYCkubWF0Y2hlcykge1xuICAgICAgICAgICAgYnJlYWtwb2ludCA9IHBvaW50O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA8PSBjb250YWluZXJFbC5jbGllbnRXaWR0aCkge1xuICAgICAgICAgIGJyZWFrcG9pbnQgPSBwb2ludDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYnJlYWtwb2ludCB8fCAnbWF4JztcbiAgICB9XG5cbiAgICB2YXIgYnJlYWtwb2ludHMgPSB7XG4gICAgICBzZXRCcmVha3BvaW50LFxuICAgICAgZ2V0QnJlYWtwb2ludFxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBwcmVwYXJlQ2xhc3NlcyhlbnRyaWVzLCBwcmVmaXgpIHtcbiAgICAgIGNvbnN0IHJlc3VsdENsYXNzZXMgPSBbXTtcbiAgICAgIGVudHJpZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIE9iamVjdC5rZXlzKGl0ZW0pLmZvckVhY2goY2xhc3NOYW1lcyA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbVtjbGFzc05hbWVzXSkge1xuICAgICAgICAgICAgICByZXN1bHRDbGFzc2VzLnB1c2gocHJlZml4ICsgY2xhc3NOYW1lcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgcmVzdWx0Q2xhc3Nlcy5wdXNoKHByZWZpeCArIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXN1bHRDbGFzc2VzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZENsYXNzZXMoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgY29uc3Qge1xuICAgICAgICBjbGFzc05hbWVzLFxuICAgICAgICBwYXJhbXMsXG4gICAgICAgIHJ0bCxcbiAgICAgICAgJGVsLFxuICAgICAgICBkZXZpY2UsXG4gICAgICAgIHN1cHBvcnRcbiAgICAgIH0gPSBzd2lwZXI7IC8vIHByZXR0aWVyLWlnbm9yZVxuXG4gICAgICBjb25zdCBzdWZmaXhlcyA9IHByZXBhcmVDbGFzc2VzKFsnaW5pdGlhbGl6ZWQnLCBwYXJhbXMuZGlyZWN0aW9uLCB7XG4gICAgICAgICdwb2ludGVyLWV2ZW50cyc6ICFzdXBwb3J0LnRvdWNoXG4gICAgICB9LCB7XG4gICAgICAgICdmcmVlLW1vZGUnOiBzd2lwZXIucGFyYW1zLmZyZWVNb2RlICYmIHBhcmFtcy5mcmVlTW9kZS5lbmFibGVkXG4gICAgICB9LCB7XG4gICAgICAgICdhdXRvaGVpZ2h0JzogcGFyYW1zLmF1dG9IZWlnaHRcbiAgICAgIH0sIHtcbiAgICAgICAgJ3J0bCc6IHJ0bFxuICAgICAgfSwge1xuICAgICAgICAnZ3JpZCc6IHBhcmFtcy5ncmlkICYmIHBhcmFtcy5ncmlkLnJvd3MgPiAxXG4gICAgICB9LCB7XG4gICAgICAgICdncmlkLWNvbHVtbic6IHBhcmFtcy5ncmlkICYmIHBhcmFtcy5ncmlkLnJvd3MgPiAxICYmIHBhcmFtcy5ncmlkLmZpbGwgPT09ICdjb2x1bW4nXG4gICAgICB9LCB7XG4gICAgICAgICdhbmRyb2lkJzogZGV2aWNlLmFuZHJvaWRcbiAgICAgIH0sIHtcbiAgICAgICAgJ2lvcyc6IGRldmljZS5pb3NcbiAgICAgIH0sIHtcbiAgICAgICAgJ2Nzcy1tb2RlJzogcGFyYW1zLmNzc01vZGVcbiAgICAgIH0sIHtcbiAgICAgICAgJ2NlbnRlcmVkJzogcGFyYW1zLmNzc01vZGUgJiYgcGFyYW1zLmNlbnRlcmVkU2xpZGVzXG4gICAgICB9LCB7XG4gICAgICAgICd3YXRjaC1wcm9ncmVzcyc6IHBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzXG4gICAgICB9XSwgcGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MpO1xuICAgICAgY2xhc3NOYW1lcy5wdXNoKC4uLnN1ZmZpeGVzKTtcbiAgICAgICRlbC5hZGRDbGFzcyhbLi4uY2xhc3NOYW1lc10uam9pbignICcpKTtcbiAgICAgIHN3aXBlci5lbWl0Q29udGFpbmVyQ2xhc3NlcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUNsYXNzZXMoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgY29uc3Qge1xuICAgICAgICAkZWwsXG4gICAgICAgIGNsYXNzTmFtZXNcbiAgICAgIH0gPSBzd2lwZXI7XG4gICAgICAkZWwucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lcy5qb2luKCcgJykpO1xuICAgICAgc3dpcGVyLmVtaXRDb250YWluZXJDbGFzc2VzKCk7XG4gICAgfVxuXG4gICAgdmFyIGNsYXNzZXMgPSB7XG4gICAgICBhZGRDbGFzc2VzLFxuICAgICAgcmVtb3ZlQ2xhc3Nlc1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBsb2FkSW1hZ2UoaW1hZ2VFbCwgc3JjLCBzcmNzZXQsIHNpemVzLCBjaGVja0ZvckNvbXBsZXRlLCBjYWxsYmFjaykge1xuICAgICAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG4gICAgICBsZXQgaW1hZ2U7XG5cbiAgICAgIGZ1bmN0aW9uIG9uUmVhZHkoKSB7XG4gICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNQaWN0dXJlID0gJChpbWFnZUVsKS5wYXJlbnQoJ3BpY3R1cmUnKVswXTtcblxuICAgICAgaWYgKCFpc1BpY3R1cmUgJiYgKCFpbWFnZUVsLmNvbXBsZXRlIHx8ICFjaGVja0ZvckNvbXBsZXRlKSkge1xuICAgICAgICBpZiAoc3JjKSB7XG4gICAgICAgICAgaW1hZ2UgPSBuZXcgd2luZG93LkltYWdlKCk7XG4gICAgICAgICAgaW1hZ2Uub25sb2FkID0gb25SZWFkeTtcbiAgICAgICAgICBpbWFnZS5vbmVycm9yID0gb25SZWFkeTtcblxuICAgICAgICAgIGlmIChzaXplcykge1xuICAgICAgICAgICAgaW1hZ2Uuc2l6ZXMgPSBzaXplcztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc3Jjc2V0KSB7XG4gICAgICAgICAgICBpbWFnZS5zcmNzZXQgPSBzcmNzZXQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNyYykge1xuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gc3JjO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvblJlYWR5KCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGltYWdlIGFscmVhZHkgbG9hZGVkLi4uXG4gICAgICAgIG9uUmVhZHkoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmVsb2FkSW1hZ2VzKCkge1xuICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgIHN3aXBlci5pbWFnZXNUb0xvYWQgPSBzd2lwZXIuJGVsLmZpbmQoJ2ltZycpO1xuXG4gICAgICBmdW5jdGlvbiBvblJlYWR5KCkge1xuICAgICAgICBpZiAodHlwZW9mIHN3aXBlciA9PT0gJ3VuZGVmaW5lZCcgfHwgc3dpcGVyID09PSBudWxsIHx8ICFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuO1xuICAgICAgICBpZiAoc3dpcGVyLmltYWdlc0xvYWRlZCAhPT0gdW5kZWZpbmVkKSBzd2lwZXIuaW1hZ2VzTG9hZGVkICs9IDE7XG5cbiAgICAgICAgaWYgKHN3aXBlci5pbWFnZXNMb2FkZWQgPT09IHN3aXBlci5pbWFnZXNUb0xvYWQubGVuZ3RoKSB7XG4gICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMudXBkYXRlT25JbWFnZXNSZWFkeSkgc3dpcGVyLnVwZGF0ZSgpO1xuICAgICAgICAgIHN3aXBlci5lbWl0KCdpbWFnZXNSZWFkeScpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dpcGVyLmltYWdlc1RvTG9hZC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBpbWFnZUVsID0gc3dpcGVyLmltYWdlc1RvTG9hZFtpXTtcbiAgICAgICAgc3dpcGVyLmxvYWRJbWFnZShpbWFnZUVsLCBpbWFnZUVsLmN1cnJlbnRTcmMgfHwgaW1hZ2VFbC5nZXRBdHRyaWJ1dGUoJ3NyYycpLCBpbWFnZUVsLnNyY3NldCB8fCBpbWFnZUVsLmdldEF0dHJpYnV0ZSgnc3Jjc2V0JyksIGltYWdlRWwuc2l6ZXMgfHwgaW1hZ2VFbC5nZXRBdHRyaWJ1dGUoJ3NpemVzJyksIHRydWUsIG9uUmVhZHkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBpbWFnZXMgPSB7XG4gICAgICBsb2FkSW1hZ2UsXG4gICAgICBwcmVsb2FkSW1hZ2VzXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNoZWNrT3ZlcmZsb3coKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgY29uc3Qge1xuICAgICAgICBpc0xvY2tlZDogd2FzTG9ja2VkLFxuICAgICAgICBwYXJhbXNcbiAgICAgIH0gPSBzd2lwZXI7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHNsaWRlc09mZnNldEJlZm9yZVxuICAgICAgfSA9IHBhcmFtcztcblxuICAgICAgaWYgKHNsaWRlc09mZnNldEJlZm9yZSkge1xuICAgICAgICBjb25zdCBsYXN0U2xpZGVJbmRleCA9IHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgY29uc3QgbGFzdFNsaWRlUmlnaHRFZGdlID0gc3dpcGVyLnNsaWRlc0dyaWRbbGFzdFNsaWRlSW5kZXhdICsgc3dpcGVyLnNsaWRlc1NpemVzR3JpZFtsYXN0U2xpZGVJbmRleF0gKyBzbGlkZXNPZmZzZXRCZWZvcmUgKiAyO1xuICAgICAgICBzd2lwZXIuaXNMb2NrZWQgPSBzd2lwZXIuc2l6ZSA+IGxhc3RTbGlkZVJpZ2h0RWRnZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXBlci5pc0xvY2tlZCA9IHN3aXBlci5zbmFwR3JpZC5sZW5ndGggPT09IDE7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMuYWxsb3dTbGlkZU5leHQgPT09IHRydWUpIHtcbiAgICAgICAgc3dpcGVyLmFsbG93U2xpZGVOZXh0ID0gIXN3aXBlci5pc0xvY2tlZDtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcmFtcy5hbGxvd1NsaWRlUHJldiA9PT0gdHJ1ZSkge1xuICAgICAgICBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPSAhc3dpcGVyLmlzTG9ja2VkO1xuICAgICAgfVxuXG4gICAgICBpZiAod2FzTG9ja2VkICYmIHdhc0xvY2tlZCAhPT0gc3dpcGVyLmlzTG9ja2VkKSB7XG4gICAgICAgIHN3aXBlci5pc0VuZCA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAod2FzTG9ja2VkICE9PSBzd2lwZXIuaXNMb2NrZWQpIHtcbiAgICAgICAgc3dpcGVyLmVtaXQoc3dpcGVyLmlzTG9ja2VkID8gJ2xvY2snIDogJ3VubG9jaycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjaGVja092ZXJmbG93JDEgPSB7XG4gICAgICBjaGVja092ZXJmbG93XG4gICAgfTtcblxuICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgIGluaXQ6IHRydWUsXG4gICAgICBkaXJlY3Rpb246ICdob3Jpem9udGFsJyxcbiAgICAgIHRvdWNoRXZlbnRzVGFyZ2V0OiAnd3JhcHBlcicsXG4gICAgICBpbml0aWFsU2xpZGU6IDAsXG4gICAgICBzcGVlZDogMzAwLFxuICAgICAgY3NzTW9kZTogZmFsc2UsXG4gICAgICB1cGRhdGVPbldpbmRvd1Jlc2l6ZTogdHJ1ZSxcbiAgICAgIHJlc2l6ZU9ic2VydmVyOiB0cnVlLFxuICAgICAgbmVzdGVkOiBmYWxzZSxcbiAgICAgIGNyZWF0ZUVsZW1lbnRzOiBmYWxzZSxcbiAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICBmb2N1c2FibGVFbGVtZW50czogJ2lucHV0LCBzZWxlY3QsIG9wdGlvbiwgdGV4dGFyZWEsIGJ1dHRvbiwgdmlkZW8sIGxhYmVsJyxcbiAgICAgIC8vIE92ZXJyaWRlc1xuICAgICAgd2lkdGg6IG51bGwsXG4gICAgICBoZWlnaHQ6IG51bGwsXG4gICAgICAvL1xuICAgICAgcHJldmVudEludGVyYWN0aW9uT25UcmFuc2l0aW9uOiBmYWxzZSxcbiAgICAgIC8vIHNzclxuICAgICAgdXNlckFnZW50OiBudWxsLFxuICAgICAgdXJsOiBudWxsLFxuICAgICAgLy8gVG8gc3VwcG9ydCBpT1MncyBzd2lwZS10by1nby1iYWNrIGdlc3R1cmUgKHdoZW4gYmVpbmcgdXNlZCBpbi1hcHApLlxuICAgICAgZWRnZVN3aXBlRGV0ZWN0aW9uOiBmYWxzZSxcbiAgICAgIGVkZ2VTd2lwZVRocmVzaG9sZDogMjAsXG4gICAgICAvLyBBdXRvaGVpZ2h0XG4gICAgICBhdXRvSGVpZ2h0OiBmYWxzZSxcbiAgICAgIC8vIFNldCB3cmFwcGVyIHdpZHRoXG4gICAgICBzZXRXcmFwcGVyU2l6ZTogZmFsc2UsXG4gICAgICAvLyBWaXJ0dWFsIFRyYW5zbGF0ZVxuICAgICAgdmlydHVhbFRyYW5zbGF0ZTogZmFsc2UsXG4gICAgICAvLyBFZmZlY3RzXG4gICAgICBlZmZlY3Q6ICdzbGlkZScsXG4gICAgICAvLyAnc2xpZGUnIG9yICdmYWRlJyBvciAnY3ViZScgb3IgJ2NvdmVyZmxvdycgb3IgJ2ZsaXAnXG4gICAgICAvLyBCcmVha3BvaW50c1xuICAgICAgYnJlYWtwb2ludHM6IHVuZGVmaW5lZCxcbiAgICAgIGJyZWFrcG9pbnRzQmFzZTogJ3dpbmRvdycsXG4gICAgICAvLyBTbGlkZXMgZ3JpZFxuICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIHNsaWRlc1Blckdyb3VwOiAxLFxuICAgICAgc2xpZGVzUGVyR3JvdXBTa2lwOiAwLFxuICAgICAgc2xpZGVzUGVyR3JvdXBBdXRvOiBmYWxzZSxcbiAgICAgIGNlbnRlcmVkU2xpZGVzOiBmYWxzZSxcbiAgICAgIGNlbnRlcmVkU2xpZGVzQm91bmRzOiBmYWxzZSxcbiAgICAgIHNsaWRlc09mZnNldEJlZm9yZTogMCxcbiAgICAgIC8vIGluIHB4XG4gICAgICBzbGlkZXNPZmZzZXRBZnRlcjogMCxcbiAgICAgIC8vIGluIHB4XG4gICAgICBub3JtYWxpemVTbGlkZUluZGV4OiB0cnVlLFxuICAgICAgY2VudGVySW5zdWZmaWNpZW50U2xpZGVzOiBmYWxzZSxcbiAgICAgIC8vIERpc2FibGUgc3dpcGVyIGFuZCBoaWRlIG5hdmlnYXRpb24gd2hlbiBjb250YWluZXIgbm90IG92ZXJmbG93XG4gICAgICB3YXRjaE92ZXJmbG93OiB0cnVlLFxuICAgICAgLy8gUm91bmQgbGVuZ3RoXG4gICAgICByb3VuZExlbmd0aHM6IGZhbHNlLFxuICAgICAgLy8gVG91Y2hlc1xuICAgICAgdG91Y2hSYXRpbzogMSxcbiAgICAgIHRvdWNoQW5nbGU6IDQ1LFxuICAgICAgc2ltdWxhdGVUb3VjaDogdHJ1ZSxcbiAgICAgIHNob3J0U3dpcGVzOiB0cnVlLFxuICAgICAgbG9uZ1N3aXBlczogdHJ1ZSxcbiAgICAgIGxvbmdTd2lwZXNSYXRpbzogMC41LFxuICAgICAgbG9uZ1N3aXBlc01zOiAzMDAsXG4gICAgICBmb2xsb3dGaW5nZXI6IHRydWUsXG4gICAgICBhbGxvd1RvdWNoTW92ZTogdHJ1ZSxcbiAgICAgIHRocmVzaG9sZDogMCxcbiAgICAgIHRvdWNoTW92ZVN0b3BQcm9wYWdhdGlvbjogZmFsc2UsXG4gICAgICB0b3VjaFN0YXJ0UHJldmVudERlZmF1bHQ6IHRydWUsXG4gICAgICB0b3VjaFN0YXJ0Rm9yY2VQcmV2ZW50RGVmYXVsdDogZmFsc2UsXG4gICAgICB0b3VjaFJlbGVhc2VPbkVkZ2VzOiBmYWxzZSxcbiAgICAgIC8vIFVuaXF1ZSBOYXZpZ2F0aW9uIEVsZW1lbnRzXG4gICAgICB1bmlxdWVOYXZFbGVtZW50czogdHJ1ZSxcbiAgICAgIC8vIFJlc2lzdGFuY2VcbiAgICAgIHJlc2lzdGFuY2U6IHRydWUsXG4gICAgICByZXNpc3RhbmNlUmF0aW86IDAuODUsXG4gICAgICAvLyBQcm9ncmVzc1xuICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogZmFsc2UsXG4gICAgICAvLyBDdXJzb3JcbiAgICAgIGdyYWJDdXJzb3I6IGZhbHNlLFxuICAgICAgLy8gQ2xpY2tzXG4gICAgICBwcmV2ZW50Q2xpY2tzOiB0cnVlLFxuICAgICAgcHJldmVudENsaWNrc1Byb3BhZ2F0aW9uOiB0cnVlLFxuICAgICAgc2xpZGVUb0NsaWNrZWRTbGlkZTogZmFsc2UsXG4gICAgICAvLyBJbWFnZXNcbiAgICAgIHByZWxvYWRJbWFnZXM6IHRydWUsXG4gICAgICB1cGRhdGVPbkltYWdlc1JlYWR5OiB0cnVlLFxuICAgICAgLy8gbG9vcFxuICAgICAgbG9vcDogZmFsc2UsXG4gICAgICBsb29wQWRkaXRpb25hbFNsaWRlczogMCxcbiAgICAgIGxvb3BlZFNsaWRlczogbnVsbCxcbiAgICAgIGxvb3BGaWxsR3JvdXBXaXRoQmxhbms6IGZhbHNlLFxuICAgICAgbG9vcFByZXZlbnRzU2xpZGU6IHRydWUsXG4gICAgICAvLyByZXdpbmRcbiAgICAgIHJld2luZDogZmFsc2UsXG4gICAgICAvLyBTd2lwaW5nL25vIHN3aXBpbmdcbiAgICAgIGFsbG93U2xpZGVQcmV2OiB0cnVlLFxuICAgICAgYWxsb3dTbGlkZU5leHQ6IHRydWUsXG4gICAgICBzd2lwZUhhbmRsZXI6IG51bGwsXG4gICAgICAvLyAnLnN3aXBlLWhhbmRsZXInLFxuICAgICAgbm9Td2lwaW5nOiB0cnVlLFxuICAgICAgbm9Td2lwaW5nQ2xhc3M6ICdzd2lwZXItbm8tc3dpcGluZycsXG4gICAgICBub1N3aXBpbmdTZWxlY3RvcjogbnVsbCxcbiAgICAgIC8vIFBhc3NpdmUgTGlzdGVuZXJzXG4gICAgICBwYXNzaXZlTGlzdGVuZXJzOiB0cnVlLFxuICAgICAgbWF4QmFja2ZhY2VIaWRkZW5TbGlkZXM6IDEwLFxuICAgICAgLy8gTlNcbiAgICAgIGNvbnRhaW5lck1vZGlmaWVyQ2xhc3M6ICdzd2lwZXItJyxcbiAgICAgIC8vIE5FV1xuICAgICAgc2xpZGVDbGFzczogJ3N3aXBlci1zbGlkZScsXG4gICAgICBzbGlkZUJsYW5rQ2xhc3M6ICdzd2lwZXItc2xpZGUtaW52aXNpYmxlLWJsYW5rJyxcbiAgICAgIHNsaWRlQWN0aXZlQ2xhc3M6ICdzd2lwZXItc2xpZGUtYWN0aXZlJyxcbiAgICAgIHNsaWRlRHVwbGljYXRlQWN0aXZlQ2xhc3M6ICdzd2lwZXItc2xpZGUtZHVwbGljYXRlLWFjdGl2ZScsXG4gICAgICBzbGlkZVZpc2libGVDbGFzczogJ3N3aXBlci1zbGlkZS12aXNpYmxlJyxcbiAgICAgIHNsaWRlRHVwbGljYXRlQ2xhc3M6ICdzd2lwZXItc2xpZGUtZHVwbGljYXRlJyxcbiAgICAgIHNsaWRlTmV4dENsYXNzOiAnc3dpcGVyLXNsaWRlLW5leHQnLFxuICAgICAgc2xpZGVEdXBsaWNhdGVOZXh0Q2xhc3M6ICdzd2lwZXItc2xpZGUtZHVwbGljYXRlLW5leHQnLFxuICAgICAgc2xpZGVQcmV2Q2xhc3M6ICdzd2lwZXItc2xpZGUtcHJldicsXG4gICAgICBzbGlkZUR1cGxpY2F0ZVByZXZDbGFzczogJ3N3aXBlci1zbGlkZS1kdXBsaWNhdGUtcHJldicsXG4gICAgICB3cmFwcGVyQ2xhc3M6ICdzd2lwZXItd3JhcHBlcicsXG4gICAgICAvLyBDYWxsYmFja3NcbiAgICAgIHJ1bkNhbGxiYWNrc09uSW5pdDogdHJ1ZSxcbiAgICAgIC8vIEludGVybmFsc1xuICAgICAgX2VtaXRDbGFzc2VzOiBmYWxzZVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBtb2R1bGVFeHRlbmRQYXJhbXMocGFyYW1zLCBhbGxNb2R1bGVzUGFyYW1zKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gZXh0ZW5kUGFyYW1zKG9iaikge1xuICAgICAgICBpZiAob2JqID09PSB2b2lkIDApIHtcbiAgICAgICAgICBvYmogPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1vZHVsZVBhcmFtTmFtZSA9IE9iamVjdC5rZXlzKG9iailbMF07XG4gICAgICAgIGNvbnN0IG1vZHVsZVBhcmFtcyA9IG9ialttb2R1bGVQYXJhbU5hbWVdO1xuXG4gICAgICAgIGlmICh0eXBlb2YgbW9kdWxlUGFyYW1zICE9PSAnb2JqZWN0JyB8fCBtb2R1bGVQYXJhbXMgPT09IG51bGwpIHtcbiAgICAgICAgICBleHRlbmQoYWxsTW9kdWxlc1BhcmFtcywgb2JqKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoWyduYXZpZ2F0aW9uJywgJ3BhZ2luYXRpb24nLCAnc2Nyb2xsYmFyJ10uaW5kZXhPZihtb2R1bGVQYXJhbU5hbWUpID49IDAgJiYgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0gPT09IHRydWUpIHtcbiAgICAgICAgICBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSA9IHtcbiAgICAgICAgICAgIGF1dG86IHRydWVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEobW9kdWxlUGFyYW1OYW1lIGluIHBhcmFtcyAmJiAnZW5hYmxlZCcgaW4gbW9kdWxlUGFyYW1zKSkge1xuICAgICAgICAgIGV4dGVuZChhbGxNb2R1bGVzUGFyYW1zLCBvYmopO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdID0ge1xuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdID09PSAnb2JqZWN0JyAmJiAhKCdlbmFibGVkJyBpbiBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSkpIHtcbiAgICAgICAgICBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXS5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0pIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdID0ge1xuICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICAgIGV4dGVuZChhbGxNb2R1bGVzUGFyYW1zLCBvYmopO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKiBlc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246IFwib2ZmXCIgKi9cbiAgICBjb25zdCBwcm90b3R5cGVzID0ge1xuICAgICAgZXZlbnRzRW1pdHRlcixcbiAgICAgIHVwZGF0ZSxcbiAgICAgIHRyYW5zbGF0ZSxcbiAgICAgIHRyYW5zaXRpb24sXG4gICAgICBzbGlkZSxcbiAgICAgIGxvb3AsXG4gICAgICBncmFiQ3Vyc29yLFxuICAgICAgZXZlbnRzOiBldmVudHMkMSxcbiAgICAgIGJyZWFrcG9pbnRzLFxuICAgICAgY2hlY2tPdmVyZmxvdzogY2hlY2tPdmVyZmxvdyQxLFxuICAgICAgY2xhc3NlcyxcbiAgICAgIGltYWdlc1xuICAgIH07XG4gICAgY29uc3QgZXh0ZW5kZWREZWZhdWx0cyA9IHt9O1xuXG4gICAgY2xhc3MgU3dpcGVyIHtcbiAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBsZXQgZWw7XG4gICAgICAgIGxldCBwYXJhbXM7XG5cbiAgICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSAmJiBhcmdzWzBdLmNvbnN0cnVjdG9yICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmdzWzBdKS5zbGljZSg4LCAtMSkgPT09ICdPYmplY3QnKSB7XG4gICAgICAgICAgcGFyYW1zID0gYXJnc1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBbZWwsIHBhcmFtc10gPSBhcmdzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFwYXJhbXMpIHBhcmFtcyA9IHt9O1xuICAgICAgICBwYXJhbXMgPSBleHRlbmQoe30sIHBhcmFtcyk7XG4gICAgICAgIGlmIChlbCAmJiAhcGFyYW1zLmVsKSBwYXJhbXMuZWwgPSBlbDtcblxuICAgICAgICBpZiAocGFyYW1zLmVsICYmICQocGFyYW1zLmVsKS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgY29uc3Qgc3dpcGVycyA9IFtdO1xuICAgICAgICAgICQocGFyYW1zLmVsKS5lYWNoKGNvbnRhaW5lckVsID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1BhcmFtcyA9IGV4dGVuZCh7fSwgcGFyYW1zLCB7XG4gICAgICAgICAgICAgIGVsOiBjb250YWluZXJFbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzd2lwZXJzLnB1c2gobmV3IFN3aXBlcihuZXdQYXJhbXMpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gc3dpcGVycztcbiAgICAgICAgfSAvLyBTd2lwZXIgSW5zdGFuY2VcblxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICAgIHN3aXBlci5fX3N3aXBlcl9fID0gdHJ1ZTtcbiAgICAgICAgc3dpcGVyLnN1cHBvcnQgPSBnZXRTdXBwb3J0KCk7XG4gICAgICAgIHN3aXBlci5kZXZpY2UgPSBnZXREZXZpY2Uoe1xuICAgICAgICAgIHVzZXJBZ2VudDogcGFyYW1zLnVzZXJBZ2VudFxuICAgICAgICB9KTtcbiAgICAgICAgc3dpcGVyLmJyb3dzZXIgPSBnZXRCcm93c2VyKCk7XG4gICAgICAgIHN3aXBlci5ldmVudHNMaXN0ZW5lcnMgPSB7fTtcbiAgICAgICAgc3dpcGVyLmV2ZW50c0FueUxpc3RlbmVycyA9IFtdO1xuICAgICAgICBzd2lwZXIubW9kdWxlcyA9IFsuLi5zd2lwZXIuX19tb2R1bGVzX19dO1xuXG4gICAgICAgIGlmIChwYXJhbXMubW9kdWxlcyAmJiBBcnJheS5pc0FycmF5KHBhcmFtcy5tb2R1bGVzKSkge1xuICAgICAgICAgIHN3aXBlci5tb2R1bGVzLnB1c2goLi4ucGFyYW1zLm1vZHVsZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYWxsTW9kdWxlc1BhcmFtcyA9IHt9O1xuICAgICAgICBzd2lwZXIubW9kdWxlcy5mb3JFYWNoKG1vZCA9PiB7XG4gICAgICAgICAgbW9kKHtcbiAgICAgICAgICAgIHN3aXBlcixcbiAgICAgICAgICAgIGV4dGVuZFBhcmFtczogbW9kdWxlRXh0ZW5kUGFyYW1zKHBhcmFtcywgYWxsTW9kdWxlc1BhcmFtcyksXG4gICAgICAgICAgICBvbjogc3dpcGVyLm9uLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgICAgIG9uY2U6IHN3aXBlci5vbmNlLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgICAgIG9mZjogc3dpcGVyLm9mZi5iaW5kKHN3aXBlciksXG4gICAgICAgICAgICBlbWl0OiBzd2lwZXIuZW1pdC5iaW5kKHN3aXBlcilcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7IC8vIEV4dGVuZCBkZWZhdWx0cyB3aXRoIG1vZHVsZXMgcGFyYW1zXG5cbiAgICAgICAgY29uc3Qgc3dpcGVyUGFyYW1zID0gZXh0ZW5kKHt9LCBkZWZhdWx0cywgYWxsTW9kdWxlc1BhcmFtcyk7IC8vIEV4dGVuZCBkZWZhdWx0cyB3aXRoIHBhc3NlZCBwYXJhbXNcblxuICAgICAgICBzd2lwZXIucGFyYW1zID0gZXh0ZW5kKHt9LCBzd2lwZXJQYXJhbXMsIGV4dGVuZGVkRGVmYXVsdHMsIHBhcmFtcyk7XG4gICAgICAgIHN3aXBlci5vcmlnaW5hbFBhcmFtcyA9IGV4dGVuZCh7fSwgc3dpcGVyLnBhcmFtcyk7XG4gICAgICAgIHN3aXBlci5wYXNzZWRQYXJhbXMgPSBleHRlbmQoe30sIHBhcmFtcyk7IC8vIGFkZCBldmVudCBsaXN0ZW5lcnNcblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcyAmJiBzd2lwZXIucGFyYW1zLm9uKSB7XG4gICAgICAgICAgT2JqZWN0LmtleXMoc3dpcGVyLnBhcmFtcy5vbikuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICAgICAgc3dpcGVyLm9uKGV2ZW50TmFtZSwgc3dpcGVyLnBhcmFtcy5vbltldmVudE5hbWVdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zICYmIHN3aXBlci5wYXJhbXMub25BbnkpIHtcbiAgICAgICAgICBzd2lwZXIub25Bbnkoc3dpcGVyLnBhcmFtcy5vbkFueSk7XG4gICAgICAgIH0gLy8gU2F2ZSBEb20gbGliXG5cblxuICAgICAgICBzd2lwZXIuJCA9ICQ7IC8vIEV4dGVuZCBTd2lwZXJcblxuICAgICAgICBPYmplY3QuYXNzaWduKHN3aXBlciwge1xuICAgICAgICAgIGVuYWJsZWQ6IHN3aXBlci5wYXJhbXMuZW5hYmxlZCxcbiAgICAgICAgICBlbCxcbiAgICAgICAgICAvLyBDbGFzc2VzXG4gICAgICAgICAgY2xhc3NOYW1lczogW10sXG4gICAgICAgICAgLy8gU2xpZGVzXG4gICAgICAgICAgc2xpZGVzOiAkKCksXG4gICAgICAgICAgc2xpZGVzR3JpZDogW10sXG4gICAgICAgICAgc25hcEdyaWQ6IFtdLFxuICAgICAgICAgIHNsaWRlc1NpemVzR3JpZDogW10sXG5cbiAgICAgICAgICAvLyBpc0RpcmVjdGlvblxuICAgICAgICAgIGlzSG9yaXpvbnRhbCgpIHtcbiAgICAgICAgICAgIHJldHVybiBzd2lwZXIucGFyYW1zLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBpc1ZlcnRpY2FsKCkge1xuICAgICAgICAgICAgcmV0dXJuIHN3aXBlci5wYXJhbXMuZGlyZWN0aW9uID09PSAndmVydGljYWwnO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICAvLyBJbmRleGVzXG4gICAgICAgICAgYWN0aXZlSW5kZXg6IDAsXG4gICAgICAgICAgcmVhbEluZGV4OiAwLFxuICAgICAgICAgIC8vXG4gICAgICAgICAgaXNCZWdpbm5pbmc6IHRydWUsXG4gICAgICAgICAgaXNFbmQ6IGZhbHNlLFxuICAgICAgICAgIC8vIFByb3BzXG4gICAgICAgICAgdHJhbnNsYXRlOiAwLFxuICAgICAgICAgIHByZXZpb3VzVHJhbnNsYXRlOiAwLFxuICAgICAgICAgIHByb2dyZXNzOiAwLFxuICAgICAgICAgIHZlbG9jaXR5OiAwLFxuICAgICAgICAgIGFuaW1hdGluZzogZmFsc2UsXG4gICAgICAgICAgLy8gTG9ja3NcbiAgICAgICAgICBhbGxvd1NsaWRlTmV4dDogc3dpcGVyLnBhcmFtcy5hbGxvd1NsaWRlTmV4dCxcbiAgICAgICAgICBhbGxvd1NsaWRlUHJldjogc3dpcGVyLnBhcmFtcy5hbGxvd1NsaWRlUHJldixcbiAgICAgICAgICAvLyBUb3VjaCBFdmVudHNcbiAgICAgICAgICB0b3VjaEV2ZW50czogZnVuY3Rpb24gdG91Y2hFdmVudHMoKSB7XG4gICAgICAgICAgICBjb25zdCB0b3VjaCA9IFsndG91Y2hzdGFydCcsICd0b3VjaG1vdmUnLCAndG91Y2hlbmQnLCAndG91Y2hjYW5jZWwnXTtcbiAgICAgICAgICAgIGNvbnN0IGRlc2t0b3AgPSBbJ3BvaW50ZXJkb3duJywgJ3BvaW50ZXJtb3ZlJywgJ3BvaW50ZXJ1cCddO1xuICAgICAgICAgICAgc3dpcGVyLnRvdWNoRXZlbnRzVG91Y2ggPSB7XG4gICAgICAgICAgICAgIHN0YXJ0OiB0b3VjaFswXSxcbiAgICAgICAgICAgICAgbW92ZTogdG91Y2hbMV0sXG4gICAgICAgICAgICAgIGVuZDogdG91Y2hbMl0sXG4gICAgICAgICAgICAgIGNhbmNlbDogdG91Y2hbM11cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzd2lwZXIudG91Y2hFdmVudHNEZXNrdG9wID0ge1xuICAgICAgICAgICAgICBzdGFydDogZGVza3RvcFswXSxcbiAgICAgICAgICAgICAgbW92ZTogZGVza3RvcFsxXSxcbiAgICAgICAgICAgICAgZW5kOiBkZXNrdG9wWzJdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIHN3aXBlci5zdXBwb3J0LnRvdWNoIHx8ICFzd2lwZXIucGFyYW1zLnNpbXVsYXRlVG91Y2ggPyBzd2lwZXIudG91Y2hFdmVudHNUb3VjaCA6IHN3aXBlci50b3VjaEV2ZW50c0Rlc2t0b3A7XG4gICAgICAgICAgfSgpLFxuICAgICAgICAgIHRvdWNoRXZlbnRzRGF0YToge1xuICAgICAgICAgICAgaXNUb3VjaGVkOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBpc01vdmVkOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBhbGxvd1RvdWNoQ2FsbGJhY2tzOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB0b3VjaFN0YXJ0VGltZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgaXNTY3JvbGxpbmc6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGN1cnJlbnRUcmFuc2xhdGU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHN0YXJ0VHJhbnNsYXRlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBhbGxvd1RocmVzaG9sZE1vdmU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIC8vIEZvcm0gZWxlbWVudHMgdG8gbWF0Y2hcbiAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzOiBzd2lwZXIucGFyYW1zLmZvY3VzYWJsZUVsZW1lbnRzLFxuICAgICAgICAgICAgLy8gTGFzdCBjbGljayB0aW1lXG4gICAgICAgICAgICBsYXN0Q2xpY2tUaW1lOiBub3coKSxcbiAgICAgICAgICAgIGNsaWNrVGltZW91dDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgLy8gVmVsb2NpdGllc1xuICAgICAgICAgICAgdmVsb2NpdGllczogW10sXG4gICAgICAgICAgICBhbGxvd01vbWVudHVtQm91bmNlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBpc1RvdWNoRXZlbnQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHN0YXJ0TW92aW5nOiB1bmRlZmluZWRcbiAgICAgICAgICB9LFxuICAgICAgICAgIC8vIENsaWNrc1xuICAgICAgICAgIGFsbG93Q2xpY2s6IHRydWUsXG4gICAgICAgICAgLy8gVG91Y2hlc1xuICAgICAgICAgIGFsbG93VG91Y2hNb3ZlOiBzd2lwZXIucGFyYW1zLmFsbG93VG91Y2hNb3ZlLFxuICAgICAgICAgIHRvdWNoZXM6IHtcbiAgICAgICAgICAgIHN0YXJ0WDogMCxcbiAgICAgICAgICAgIHN0YXJ0WTogMCxcbiAgICAgICAgICAgIGN1cnJlbnRYOiAwLFxuICAgICAgICAgICAgY3VycmVudFk6IDAsXG4gICAgICAgICAgICBkaWZmOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICAvLyBJbWFnZXNcbiAgICAgICAgICBpbWFnZXNUb0xvYWQ6IFtdLFxuICAgICAgICAgIGltYWdlc0xvYWRlZDogMFxuICAgICAgICB9KTtcbiAgICAgICAgc3dpcGVyLmVtaXQoJ19zd2lwZXInKTsgLy8gSW5pdFxuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmluaXQpIHtcbiAgICAgICAgICBzd2lwZXIuaW5pdCgpO1xuICAgICAgICB9IC8vIFJldHVybiBhcHAgaW5zdGFuY2VcblxuXG4gICAgICAgIHJldHVybiBzd2lwZXI7XG4gICAgICB9XG5cbiAgICAgIGVuYWJsZSgpIHtcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKHN3aXBlci5lbmFibGVkKSByZXR1cm47XG4gICAgICAgIHN3aXBlci5lbmFibGVkID0gdHJ1ZTtcblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5ncmFiQ3Vyc29yKSB7XG4gICAgICAgICAgc3dpcGVyLnNldEdyYWJDdXJzb3IoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXBlci5lbWl0KCdlbmFibGUnKTtcbiAgICAgIH1cblxuICAgICAgZGlzYWJsZSgpIHtcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKCFzd2lwZXIuZW5hYmxlZCkgcmV0dXJuO1xuICAgICAgICBzd2lwZXIuZW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmdyYWJDdXJzb3IpIHtcbiAgICAgICAgICBzd2lwZXIudW5zZXRHcmFiQ3Vyc29yKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzd2lwZXIuZW1pdCgnZGlzYWJsZScpO1xuICAgICAgfVxuXG4gICAgICBzZXRQcm9ncmVzcyhwcm9ncmVzcywgc3BlZWQpIHtcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgcHJvZ3Jlc3MgPSBNYXRoLm1pbihNYXRoLm1heChwcm9ncmVzcywgMCksIDEpO1xuICAgICAgICBjb25zdCBtaW4gPSBzd2lwZXIubWluVHJhbnNsYXRlKCk7XG4gICAgICAgIGNvbnN0IG1heCA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKTtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IChtYXggLSBtaW4pICogcHJvZ3Jlc3MgKyBtaW47XG4gICAgICAgIHN3aXBlci50cmFuc2xhdGVUbyhjdXJyZW50LCB0eXBlb2Ygc3BlZWQgPT09ICd1bmRlZmluZWQnID8gMCA6IHNwZWVkKTtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgICB9XG5cbiAgICAgIGVtaXRDb250YWluZXJDbGFzc2VzKCkge1xuICAgICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMuX2VtaXRDbGFzc2VzIHx8ICFzd2lwZXIuZWwpIHJldHVybjtcbiAgICAgICAgY29uc3QgY2xzID0gc3dpcGVyLmVsLmNsYXNzTmFtZS5zcGxpdCgnICcpLmZpbHRlcihjbGFzc05hbWUgPT4ge1xuICAgICAgICAgIHJldHVybiBjbGFzc05hbWUuaW5kZXhPZignc3dpcGVyJykgPT09IDAgfHwgY2xhc3NOYW1lLmluZGV4T2Yoc3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzKSA9PT0gMDtcbiAgICAgICAgfSk7XG4gICAgICAgIHN3aXBlci5lbWl0KCdfY29udGFpbmVyQ2xhc3NlcycsIGNscy5qb2luKCcgJykpO1xuICAgICAgfVxuXG4gICAgICBnZXRTbGlkZUNsYXNzZXMoc2xpZGVFbCkge1xuICAgICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuICcnO1xuICAgICAgICByZXR1cm4gc2xpZGVFbC5jbGFzc05hbWUuc3BsaXQoJyAnKS5maWx0ZXIoY2xhc3NOYW1lID0+IHtcbiAgICAgICAgICByZXR1cm4gY2xhc3NOYW1lLmluZGV4T2YoJ3N3aXBlci1zbGlkZScpID09PSAwIHx8IGNsYXNzTmFtZS5pbmRleE9mKHN3aXBlci5wYXJhbXMuc2xpZGVDbGFzcykgPT09IDA7XG4gICAgICAgIH0pLmpvaW4oJyAnKTtcbiAgICAgIH1cblxuICAgICAgZW1pdFNsaWRlc0NsYXNzZXMoKSB7XG4gICAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5fZW1pdENsYXNzZXMgfHwgIXN3aXBlci5lbCkgcmV0dXJuO1xuICAgICAgICBjb25zdCB1cGRhdGVzID0gW107XG4gICAgICAgIHN3aXBlci5zbGlkZXMuZWFjaChzbGlkZUVsID0+IHtcbiAgICAgICAgICBjb25zdCBjbGFzc05hbWVzID0gc3dpcGVyLmdldFNsaWRlQ2xhc3NlcyhzbGlkZUVsKTtcbiAgICAgICAgICB1cGRhdGVzLnB1c2goe1xuICAgICAgICAgICAgc2xpZGVFbCxcbiAgICAgICAgICAgIGNsYXNzTmFtZXNcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzd2lwZXIuZW1pdCgnX3NsaWRlQ2xhc3MnLCBzbGlkZUVsLCBjbGFzc05hbWVzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHN3aXBlci5lbWl0KCdfc2xpZGVDbGFzc2VzJywgdXBkYXRlcyk7XG4gICAgICB9XG5cbiAgICAgIHNsaWRlc1BlclZpZXdEeW5hbWljKHZpZXcsIGV4YWN0KSB7XG4gICAgICAgIGlmICh2aWV3ID09PSB2b2lkIDApIHtcbiAgICAgICAgICB2aWV3ID0gJ2N1cnJlbnQnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV4YWN0ID09PSB2b2lkIDApIHtcbiAgICAgICAgICBleGFjdCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHBhcmFtcyxcbiAgICAgICAgICBzbGlkZXMsXG4gICAgICAgICAgc2xpZGVzR3JpZCxcbiAgICAgICAgICBzbGlkZXNTaXplc0dyaWQsXG4gICAgICAgICAgc2l6ZTogc3dpcGVyU2l6ZSxcbiAgICAgICAgICBhY3RpdmVJbmRleFxuICAgICAgICB9ID0gc3dpcGVyO1xuICAgICAgICBsZXQgc3B2ID0gMTtcblxuICAgICAgICBpZiAocGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAgICAgbGV0IHNsaWRlU2l6ZSA9IHNsaWRlc1thY3RpdmVJbmRleF0uc3dpcGVyU2xpZGVTaXplO1xuICAgICAgICAgIGxldCBicmVha0xvb3A7XG5cbiAgICAgICAgICBmb3IgKGxldCBpID0gYWN0aXZlSW5kZXggKyAxOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBpZiAoc2xpZGVzW2ldICYmICFicmVha0xvb3ApIHtcbiAgICAgICAgICAgICAgc2xpZGVTaXplICs9IHNsaWRlc1tpXS5zd2lwZXJTbGlkZVNpemU7XG4gICAgICAgICAgICAgIHNwdiArPSAxO1xuICAgICAgICAgICAgICBpZiAoc2xpZGVTaXplID4gc3dpcGVyU2l6ZSkgYnJlYWtMb29wID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3IgKGxldCBpID0gYWN0aXZlSW5kZXggLSAxOyBpID49IDA7IGkgLT0gMSkge1xuICAgICAgICAgICAgaWYgKHNsaWRlc1tpXSAmJiAhYnJlYWtMb29wKSB7XG4gICAgICAgICAgICAgIHNsaWRlU2l6ZSArPSBzbGlkZXNbaV0uc3dpcGVyU2xpZGVTaXplO1xuICAgICAgICAgICAgICBzcHYgKz0gMTtcbiAgICAgICAgICAgICAgaWYgKHNsaWRlU2l6ZSA+IHN3aXBlclNpemUpIGJyZWFrTG9vcCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgIGlmICh2aWV3ID09PSAnY3VycmVudCcpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBhY3RpdmVJbmRleCArIDE7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgY29uc3Qgc2xpZGVJblZpZXcgPSBleGFjdCA/IHNsaWRlc0dyaWRbaV0gKyBzbGlkZXNTaXplc0dyaWRbaV0gLSBzbGlkZXNHcmlkW2FjdGl2ZUluZGV4XSA8IHN3aXBlclNpemUgOiBzbGlkZXNHcmlkW2ldIC0gc2xpZGVzR3JpZFthY3RpdmVJbmRleF0gPCBzd2lwZXJTaXplO1xuXG4gICAgICAgICAgICAgIGlmIChzbGlkZUluVmlldykge1xuICAgICAgICAgICAgICAgIHNwdiArPSAxO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHByZXZpb3VzXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gYWN0aXZlSW5kZXggLSAxOyBpID49IDA7IGkgLT0gMSkge1xuICAgICAgICAgICAgICBjb25zdCBzbGlkZUluVmlldyA9IHNsaWRlc0dyaWRbYWN0aXZlSW5kZXhdIC0gc2xpZGVzR3JpZFtpXSA8IHN3aXBlclNpemU7XG5cbiAgICAgICAgICAgICAgaWYgKHNsaWRlSW5WaWV3KSB7XG4gICAgICAgICAgICAgICAgc3B2ICs9IDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3B2O1xuICAgICAgfVxuXG4gICAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHNuYXBHcmlkLFxuICAgICAgICAgIHBhcmFtc1xuICAgICAgICB9ID0gc3dpcGVyOyAvLyBCcmVha3BvaW50c1xuXG4gICAgICAgIGlmIChwYXJhbXMuYnJlYWtwb2ludHMpIHtcbiAgICAgICAgICBzd2lwZXIuc2V0QnJlYWtwb2ludCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpcGVyLnVwZGF0ZVNpemUoKTtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlcygpO1xuICAgICAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MoKTtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcblxuICAgICAgICBmdW5jdGlvbiBzZXRUcmFuc2xhdGUoKSB7XG4gICAgICAgICAgY29uc3QgdHJhbnNsYXRlVmFsdWUgPSBzd2lwZXIucnRsVHJhbnNsYXRlID8gc3dpcGVyLnRyYW5zbGF0ZSAqIC0xIDogc3dpcGVyLnRyYW5zbGF0ZTtcbiAgICAgICAgICBjb25zdCBuZXdUcmFuc2xhdGUgPSBNYXRoLm1pbihNYXRoLm1heCh0cmFuc2xhdGVWYWx1ZSwgc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSwgc3dpcGVyLm1pblRyYW5zbGF0ZSgpKTtcbiAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKG5ld1RyYW5zbGF0ZSk7XG4gICAgICAgICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB0cmFuc2xhdGVkO1xuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmZyZWVNb2RlICYmIHN3aXBlci5wYXJhbXMuZnJlZU1vZGUuZW5hYmxlZCkge1xuICAgICAgICAgIHNldFRyYW5zbGF0ZSgpO1xuXG4gICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuYXV0b0hlaWdodCkge1xuICAgICAgICAgICAgc3dpcGVyLnVwZGF0ZUF1dG9IZWlnaHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKChzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyB8fCBzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgPiAxKSAmJiBzd2lwZXIuaXNFbmQgJiYgIXN3aXBlci5wYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZWQgPSBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDEsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJhbnNsYXRlZCA9IHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghdHJhbnNsYXRlZCkge1xuICAgICAgICAgICAgc2V0VHJhbnNsYXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmFtcy53YXRjaE92ZXJmbG93ICYmIHNuYXBHcmlkICE9PSBzd2lwZXIuc25hcEdyaWQpIHtcbiAgICAgICAgICBzd2lwZXIuY2hlY2tPdmVyZmxvdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpcGVyLmVtaXQoJ3VwZGF0ZScpO1xuICAgICAgfVxuXG4gICAgICBjaGFuZ2VEaXJlY3Rpb24obmV3RGlyZWN0aW9uLCBuZWVkVXBkYXRlKSB7XG4gICAgICAgIGlmIChuZWVkVXBkYXRlID09PSB2b2lkIDApIHtcbiAgICAgICAgICBuZWVkVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGN1cnJlbnREaXJlY3Rpb24gPSBzd2lwZXIucGFyYW1zLmRpcmVjdGlvbjtcblxuICAgICAgICBpZiAoIW5ld0RpcmVjdGlvbikge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgIG5ld0RpcmVjdGlvbiA9IGN1cnJlbnREaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV3RGlyZWN0aW9uID09PSBjdXJyZW50RGlyZWN0aW9uIHx8IG5ld0RpcmVjdGlvbiAhPT0gJ2hvcml6b250YWwnICYmIG5ld0RpcmVjdGlvbiAhPT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgIHJldHVybiBzd2lwZXI7XG4gICAgICAgIH1cblxuICAgICAgICBzd2lwZXIuJGVsLnJlbW92ZUNsYXNzKGAke3N3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc30ke2N1cnJlbnREaXJlY3Rpb259YCkuYWRkQ2xhc3MoYCR7c3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfSR7bmV3RGlyZWN0aW9ufWApO1xuICAgICAgICBzd2lwZXIuZW1pdENvbnRhaW5lckNsYXNzZXMoKTtcbiAgICAgICAgc3dpcGVyLnBhcmFtcy5kaXJlY3Rpb24gPSBuZXdEaXJlY3Rpb247XG4gICAgICAgIHN3aXBlci5zbGlkZXMuZWFjaChzbGlkZUVsID0+IHtcbiAgICAgICAgICBpZiAobmV3RGlyZWN0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgICBzbGlkZUVsLnN0eWxlLndpZHRoID0gJyc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlRWwuc3R5bGUuaGVpZ2h0ID0gJyc7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc3dpcGVyLmVtaXQoJ2NoYW5nZURpcmVjdGlvbicpO1xuICAgICAgICBpZiAobmVlZFVwZGF0ZSkgc3dpcGVyLnVwZGF0ZSgpO1xuICAgICAgICByZXR1cm4gc3dpcGVyO1xuICAgICAgfVxuXG4gICAgICBtb3VudChlbCkge1xuICAgICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoc3dpcGVyLm1vdW50ZWQpIHJldHVybiB0cnVlOyAvLyBGaW5kIGVsXG5cbiAgICAgICAgY29uc3QgJGVsID0gJChlbCB8fCBzd2lwZXIucGFyYW1zLmVsKTtcbiAgICAgICAgZWwgPSAkZWxbMF07XG5cbiAgICAgICAgaWYgKCFlbCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsLnN3aXBlciA9IHN3aXBlcjtcblxuICAgICAgICBjb25zdCBnZXRXcmFwcGVyU2VsZWN0b3IgPSAoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGAuJHsoc3dpcGVyLnBhcmFtcy53cmFwcGVyQ2xhc3MgfHwgJycpLnRyaW0oKS5zcGxpdCgnICcpLmpvaW4oJy4nKX1gO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGdldFdyYXBwZXIgPSAoKSA9PiB7XG4gICAgICAgICAgaWYgKGVsICYmIGVsLnNoYWRvd1Jvb3QgJiYgZWwuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKSB7XG4gICAgICAgICAgICBjb25zdCByZXMgPSAkKGVsLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihnZXRXcmFwcGVyU2VsZWN0b3IoKSkpOyAvLyBDaGlsZHJlbiBuZWVkcyB0byByZXR1cm4gc2xvdCBpdGVtc1xuXG4gICAgICAgICAgICByZXMuY2hpbGRyZW4gPSBvcHRpb25zID0+ICRlbC5jaGlsZHJlbihvcHRpb25zKTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoISRlbC5jaGlsZHJlbikge1xuICAgICAgICAgICAgcmV0dXJuICQoJGVsKS5jaGlsZHJlbihnZXRXcmFwcGVyU2VsZWN0b3IoKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuICRlbC5jaGlsZHJlbihnZXRXcmFwcGVyU2VsZWN0b3IoKSk7XG4gICAgICAgIH07IC8vIEZpbmQgV3JhcHBlclxuXG5cbiAgICAgICAgbGV0ICR3cmFwcGVyRWwgPSBnZXRXcmFwcGVyKCk7XG5cbiAgICAgICAgaWYgKCR3cmFwcGVyRWwubGVuZ3RoID09PSAwICYmIHN3aXBlci5wYXJhbXMuY3JlYXRlRWxlbWVudHMpIHtcbiAgICAgICAgICBjb25zdCBkb2N1bWVudCA9IGdldERvY3VtZW50KCk7XG4gICAgICAgICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICR3cmFwcGVyRWwgPSAkKHdyYXBwZXIpO1xuICAgICAgICAgIHdyYXBwZXIuY2xhc3NOYW1lID0gc3dpcGVyLnBhcmFtcy53cmFwcGVyQ2xhc3M7XG4gICAgICAgICAgJGVsLmFwcGVuZCh3cmFwcGVyKTtcbiAgICAgICAgICAkZWwuY2hpbGRyZW4oYC4ke3N3aXBlci5wYXJhbXMuc2xpZGVDbGFzc31gKS5lYWNoKHNsaWRlRWwgPT4ge1xuICAgICAgICAgICAgJHdyYXBwZXJFbC5hcHBlbmQoc2xpZGVFbCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3QuYXNzaWduKHN3aXBlciwge1xuICAgICAgICAgICRlbCxcbiAgICAgICAgICBlbCxcbiAgICAgICAgICAkd3JhcHBlckVsLFxuICAgICAgICAgIHdyYXBwZXJFbDogJHdyYXBwZXJFbFswXSxcbiAgICAgICAgICBtb3VudGVkOiB0cnVlLFxuICAgICAgICAgIC8vIFJUTFxuICAgICAgICAgIHJ0bDogZWwuZGlyLnRvTG93ZXJDYXNlKCkgPT09ICdydGwnIHx8ICRlbC5jc3MoJ2RpcmVjdGlvbicpID09PSAncnRsJyxcbiAgICAgICAgICBydGxUcmFuc2xhdGU6IHN3aXBlci5wYXJhbXMuZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgJiYgKGVsLmRpci50b0xvd2VyQ2FzZSgpID09PSAncnRsJyB8fCAkZWwuY3NzKCdkaXJlY3Rpb24nKSA9PT0gJ3J0bCcpLFxuICAgICAgICAgIHdyb25nUlRMOiAkd3JhcHBlckVsLmNzcygnZGlzcGxheScpID09PSAnLXdlYmtpdC1ib3gnXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaW5pdChlbCkge1xuICAgICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoc3dpcGVyLmluaXRpYWxpemVkKSByZXR1cm4gc3dpcGVyO1xuICAgICAgICBjb25zdCBtb3VudGVkID0gc3dpcGVyLm1vdW50KGVsKTtcbiAgICAgICAgaWYgKG1vdW50ZWQgPT09IGZhbHNlKSByZXR1cm4gc3dpcGVyO1xuICAgICAgICBzd2lwZXIuZW1pdCgnYmVmb3JlSW5pdCcpOyAvLyBTZXQgYnJlYWtwb2ludFxuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmJyZWFrcG9pbnRzKSB7XG4gICAgICAgICAgc3dpcGVyLnNldEJyZWFrcG9pbnQoKTtcbiAgICAgICAgfSAvLyBBZGQgQ2xhc3Nlc1xuXG5cbiAgICAgICAgc3dpcGVyLmFkZENsYXNzZXMoKTsgLy8gQ3JlYXRlIGxvb3BcblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgc3dpcGVyLmxvb3BDcmVhdGUoKTtcbiAgICAgICAgfSAvLyBVcGRhdGUgc2l6ZVxuXG5cbiAgICAgICAgc3dpcGVyLnVwZGF0ZVNpemUoKTsgLy8gVXBkYXRlIHNsaWRlc1xuXG4gICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93KSB7XG4gICAgICAgICAgc3dpcGVyLmNoZWNrT3ZlcmZsb3coKTtcbiAgICAgICAgfSAvLyBTZXQgR3JhYiBDdXJzb3JcblxuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmdyYWJDdXJzb3IgJiYgc3dpcGVyLmVuYWJsZWQpIHtcbiAgICAgICAgICBzd2lwZXIuc2V0R3JhYkN1cnNvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMucHJlbG9hZEltYWdlcykge1xuICAgICAgICAgIHN3aXBlci5wcmVsb2FkSW1hZ2VzKCk7XG4gICAgICAgIH0gLy8gU2xpZGUgVG8gSW5pdGlhbCBTbGlkZVxuXG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5wYXJhbXMuaW5pdGlhbFNsaWRlICsgc3dpcGVyLmxvb3BlZFNsaWRlcywgMCwgc3dpcGVyLnBhcmFtcy5ydW5DYWxsYmFja3NPbkluaXQsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIucGFyYW1zLmluaXRpYWxTbGlkZSwgMCwgc3dpcGVyLnBhcmFtcy5ydW5DYWxsYmFja3NPbkluaXQsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgfSAvLyBBdHRhY2ggZXZlbnRzXG5cblxuICAgICAgICBzd2lwZXIuYXR0YWNoRXZlbnRzKCk7IC8vIEluaXQgRmxhZ1xuXG4gICAgICAgIHN3aXBlci5pbml0aWFsaXplZCA9IHRydWU7IC8vIEVtaXRcblxuICAgICAgICBzd2lwZXIuZW1pdCgnaW5pdCcpO1xuICAgICAgICBzd2lwZXIuZW1pdCgnYWZ0ZXJJbml0Jyk7XG4gICAgICAgIHJldHVybiBzd2lwZXI7XG4gICAgICB9XG5cbiAgICAgIGRlc3Ryb3koZGVsZXRlSW5zdGFuY2UsIGNsZWFuU3R5bGVzKSB7XG4gICAgICAgIGlmIChkZWxldGVJbnN0YW5jZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgZGVsZXRlSW5zdGFuY2UgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNsZWFuU3R5bGVzID09PSB2b2lkIDApIHtcbiAgICAgICAgICBjbGVhblN0eWxlcyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgcGFyYW1zLFxuICAgICAgICAgICRlbCxcbiAgICAgICAgICAkd3JhcHBlckVsLFxuICAgICAgICAgIHNsaWRlc1xuICAgICAgICB9ID0gc3dpcGVyO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygc3dpcGVyLnBhcmFtcyA9PT0gJ3VuZGVmaW5lZCcgfHwgc3dpcGVyLmRlc3Ryb3llZCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpcGVyLmVtaXQoJ2JlZm9yZURlc3Ryb3knKTsgLy8gSW5pdCBGbGFnXG5cbiAgICAgICAgc3dpcGVyLmluaXRpYWxpemVkID0gZmFsc2U7IC8vIERldGFjaCBldmVudHNcblxuICAgICAgICBzd2lwZXIuZGV0YWNoRXZlbnRzKCk7IC8vIERlc3Ryb3kgbG9vcFxuXG4gICAgICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgICAgIHN3aXBlci5sb29wRGVzdHJveSgpO1xuICAgICAgICB9IC8vIENsZWFudXAgc3R5bGVzXG5cblxuICAgICAgICBpZiAoY2xlYW5TdHlsZXMpIHtcbiAgICAgICAgICBzd2lwZXIucmVtb3ZlQ2xhc3NlcygpO1xuICAgICAgICAgICRlbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICR3cmFwcGVyRWwucmVtb3ZlQXR0cignc3R5bGUnKTtcblxuICAgICAgICAgIGlmIChzbGlkZXMgJiYgc2xpZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgc2xpZGVzLnJlbW92ZUNsYXNzKFtwYXJhbXMuc2xpZGVWaXNpYmxlQ2xhc3MsIHBhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzLCBwYXJhbXMuc2xpZGVOZXh0Q2xhc3MsIHBhcmFtcy5zbGlkZVByZXZDbGFzc10uam9pbignICcpKS5yZW1vdmVBdHRyKCdzdHlsZScpLnJlbW92ZUF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3dpcGVyLmVtaXQoJ2Rlc3Ryb3knKTsgLy8gRGV0YWNoIGVtaXR0ZXIgZXZlbnRzXG5cbiAgICAgICAgT2JqZWN0LmtleXMoc3dpcGVyLmV2ZW50c0xpc3RlbmVycykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICAgIHN3aXBlci5vZmYoZXZlbnROYW1lKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGRlbGV0ZUluc3RhbmNlICE9PSBmYWxzZSkge1xuICAgICAgICAgIHN3aXBlci4kZWxbMF0uc3dpcGVyID0gbnVsbDtcbiAgICAgICAgICBkZWxldGVQcm9wcyhzd2lwZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpcGVyLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBzdGF0aWMgZXh0ZW5kRGVmYXVsdHMobmV3RGVmYXVsdHMpIHtcbiAgICAgICAgZXh0ZW5kKGV4dGVuZGVkRGVmYXVsdHMsIG5ld0RlZmF1bHRzKTtcbiAgICAgIH1cblxuICAgICAgc3RhdGljIGdldCBleHRlbmRlZERlZmF1bHRzKCkge1xuICAgICAgICByZXR1cm4gZXh0ZW5kZWREZWZhdWx0cztcbiAgICAgIH1cblxuICAgICAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRzO1xuICAgICAgfVxuXG4gICAgICBzdGF0aWMgaW5zdGFsbE1vZHVsZShtb2QpIHtcbiAgICAgICAgaWYgKCFTd2lwZXIucHJvdG90eXBlLl9fbW9kdWxlc19fKSBTd2lwZXIucHJvdG90eXBlLl9fbW9kdWxlc19fID0gW107XG4gICAgICAgIGNvbnN0IG1vZHVsZXMgPSBTd2lwZXIucHJvdG90eXBlLl9fbW9kdWxlc19fO1xuXG4gICAgICAgIGlmICh0eXBlb2YgbW9kID09PSAnZnVuY3Rpb24nICYmIG1vZHVsZXMuaW5kZXhPZihtb2QpIDwgMCkge1xuICAgICAgICAgIG1vZHVsZXMucHVzaChtb2QpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHN0YXRpYyB1c2UobW9kdWxlKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG1vZHVsZSkpIHtcbiAgICAgICAgICBtb2R1bGUuZm9yRWFjaChtID0+IFN3aXBlci5pbnN0YWxsTW9kdWxlKG0pKTtcbiAgICAgICAgICByZXR1cm4gU3dpcGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgU3dpcGVyLmluc3RhbGxNb2R1bGUobW9kdWxlKTtcbiAgICAgICAgcmV0dXJuIFN3aXBlcjtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKHByb3RvdHlwZXMpLmZvckVhY2gocHJvdG90eXBlR3JvdXAgPT4ge1xuICAgICAgT2JqZWN0LmtleXMocHJvdG90eXBlc1twcm90b3R5cGVHcm91cF0pLmZvckVhY2gocHJvdG9NZXRob2QgPT4ge1xuICAgICAgICBTd2lwZXIucHJvdG90eXBlW3Byb3RvTWV0aG9kXSA9IHByb3RvdHlwZXNbcHJvdG90eXBlR3JvdXBdW3Byb3RvTWV0aG9kXTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIFN3aXBlci51c2UoW1Jlc2l6ZSwgT2JzZXJ2ZXJdKTtcblxuICAgIGZ1bmN0aW9uIFZpcnR1YWwoX3JlZikge1xuICAgICAgbGV0IHtcbiAgICAgICAgc3dpcGVyLFxuICAgICAgICBleHRlbmRQYXJhbXMsXG4gICAgICAgIG9uLFxuICAgICAgICBlbWl0XG4gICAgICB9ID0gX3JlZjtcbiAgICAgIGV4dGVuZFBhcmFtcyh7XG4gICAgICAgIHZpcnR1YWw6IHtcbiAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICBzbGlkZXM6IFtdLFxuICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgIHJlbmRlclNsaWRlOiBudWxsLFxuICAgICAgICAgIHJlbmRlckV4dGVybmFsOiBudWxsLFxuICAgICAgICAgIHJlbmRlckV4dGVybmFsVXBkYXRlOiB0cnVlLFxuICAgICAgICAgIGFkZFNsaWRlc0JlZm9yZTogMCxcbiAgICAgICAgICBhZGRTbGlkZXNBZnRlcjogMFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGxldCBjc3NNb2RlVGltZW91dDtcbiAgICAgIHN3aXBlci52aXJ0dWFsID0ge1xuICAgICAgICBjYWNoZToge30sXG4gICAgICAgIGZyb206IHVuZGVmaW5lZCxcbiAgICAgICAgdG86IHVuZGVmaW5lZCxcbiAgICAgICAgc2xpZGVzOiBbXSxcbiAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICBzbGlkZXNHcmlkOiBbXVxuICAgICAgfTtcblxuICAgICAgZnVuY3Rpb24gcmVuZGVyU2xpZGUoc2xpZGUsIGluZGV4KSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMudmlydHVhbDtcblxuICAgICAgICBpZiAocGFyYW1zLmNhY2hlICYmIHN3aXBlci52aXJ0dWFsLmNhY2hlW2luZGV4XSkge1xuICAgICAgICAgIHJldHVybiBzd2lwZXIudmlydHVhbC5jYWNoZVtpbmRleF07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCAkc2xpZGVFbCA9IHBhcmFtcy5yZW5kZXJTbGlkZSA/ICQocGFyYW1zLnJlbmRlclNsaWRlLmNhbGwoc3dpcGVyLCBzbGlkZSwgaW5kZXgpKSA6ICQoYDxkaXYgY2xhc3M9XCIke3N3aXBlci5wYXJhbXMuc2xpZGVDbGFzc31cIiBkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIiR7aW5kZXh9XCI+JHtzbGlkZX08L2Rpdj5gKTtcbiAgICAgICAgaWYgKCEkc2xpZGVFbC5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpKSAkc2xpZGVFbC5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcsIGluZGV4KTtcbiAgICAgICAgaWYgKHBhcmFtcy5jYWNoZSkgc3dpcGVyLnZpcnR1YWwuY2FjaGVbaW5kZXhdID0gJHNsaWRlRWw7XG4gICAgICAgIHJldHVybiAkc2xpZGVFbDtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdXBkYXRlKGZvcmNlKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3LFxuICAgICAgICAgIHNsaWRlc1Blckdyb3VwLFxuICAgICAgICAgIGNlbnRlcmVkU2xpZGVzXG4gICAgICAgIH0gPSBzd2lwZXIucGFyYW1zO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgYWRkU2xpZGVzQmVmb3JlLFxuICAgICAgICAgIGFkZFNsaWRlc0FmdGVyXG4gICAgICAgIH0gPSBzd2lwZXIucGFyYW1zLnZpcnR1YWw7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBmcm9tOiBwcmV2aW91c0Zyb20sXG4gICAgICAgICAgdG86IHByZXZpb3VzVG8sXG4gICAgICAgICAgc2xpZGVzLFxuICAgICAgICAgIHNsaWRlc0dyaWQ6IHByZXZpb3VzU2xpZGVzR3JpZCxcbiAgICAgICAgICBvZmZzZXQ6IHByZXZpb3VzT2Zmc2V0XG4gICAgICAgIH0gPSBzd2lwZXIudmlydHVhbDtcblxuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgICAgICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYWN0aXZlSW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXggfHwgMDtcbiAgICAgICAgbGV0IG9mZnNldFByb3A7XG4gICAgICAgIGlmIChzd2lwZXIucnRsVHJhbnNsYXRlKSBvZmZzZXRQcm9wID0gJ3JpZ2h0JztlbHNlIG9mZnNldFByb3AgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAnbGVmdCcgOiAndG9wJztcbiAgICAgICAgbGV0IHNsaWRlc0FmdGVyO1xuICAgICAgICBsZXQgc2xpZGVzQmVmb3JlO1xuXG4gICAgICAgIGlmIChjZW50ZXJlZFNsaWRlcykge1xuICAgICAgICAgIHNsaWRlc0FmdGVyID0gTWF0aC5mbG9vcihzbGlkZXNQZXJWaWV3IC8gMikgKyBzbGlkZXNQZXJHcm91cCArIGFkZFNsaWRlc0FmdGVyO1xuICAgICAgICAgIHNsaWRlc0JlZm9yZSA9IE1hdGguZmxvb3Ioc2xpZGVzUGVyVmlldyAvIDIpICsgc2xpZGVzUGVyR3JvdXAgKyBhZGRTbGlkZXNCZWZvcmU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2xpZGVzQWZ0ZXIgPSBzbGlkZXNQZXJWaWV3ICsgKHNsaWRlc1Blckdyb3VwIC0gMSkgKyBhZGRTbGlkZXNBZnRlcjtcbiAgICAgICAgICBzbGlkZXNCZWZvcmUgPSBzbGlkZXNQZXJHcm91cCArIGFkZFNsaWRlc0JlZm9yZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZyb20gPSBNYXRoLm1heCgoYWN0aXZlSW5kZXggfHwgMCkgLSBzbGlkZXNCZWZvcmUsIDApO1xuICAgICAgICBjb25zdCB0byA9IE1hdGgubWluKChhY3RpdmVJbmRleCB8fCAwKSArIHNsaWRlc0FmdGVyLCBzbGlkZXMubGVuZ3RoIC0gMSk7XG4gICAgICAgIGNvbnN0IG9mZnNldCA9IChzd2lwZXIuc2xpZGVzR3JpZFtmcm9tXSB8fCAwKSAtIChzd2lwZXIuc2xpZGVzR3JpZFswXSB8fCAwKTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihzd2lwZXIudmlydHVhbCwge1xuICAgICAgICAgIGZyb20sXG4gICAgICAgICAgdG8sXG4gICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgIHNsaWRlc0dyaWQ6IHN3aXBlci5zbGlkZXNHcmlkXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIG9uUmVuZGVyZWQoKSB7XG4gICAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlcygpO1xuICAgICAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcygpO1xuICAgICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG5cbiAgICAgICAgICBpZiAoc3dpcGVyLmxhenkgJiYgc3dpcGVyLnBhcmFtcy5sYXp5LmVuYWJsZWQpIHtcbiAgICAgICAgICAgIHN3aXBlci5sYXp5LmxvYWQoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBlbWl0KCd2aXJ0dWFsVXBkYXRlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJldmlvdXNGcm9tID09PSBmcm9tICYmIHByZXZpb3VzVG8gPT09IHRvICYmICFmb3JjZSkge1xuICAgICAgICAgIGlmIChzd2lwZXIuc2xpZGVzR3JpZCAhPT0gcHJldmlvdXNTbGlkZXNHcmlkICYmIG9mZnNldCAhPT0gcHJldmlvdXNPZmZzZXQpIHtcbiAgICAgICAgICAgIHN3aXBlci5zbGlkZXMuY3NzKG9mZnNldFByb3AsIGAke29mZnNldH1weGApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcygpO1xuICAgICAgICAgIGVtaXQoJ3ZpcnR1YWxVcGRhdGUnKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy52aXJ0dWFsLnJlbmRlckV4dGVybmFsKSB7XG4gICAgICAgICAgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLnJlbmRlckV4dGVybmFsLmNhbGwoc3dpcGVyLCB7XG4gICAgICAgICAgICBvZmZzZXQsXG4gICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgdG8sXG4gICAgICAgICAgICBzbGlkZXM6IGZ1bmN0aW9uIGdldFNsaWRlcygpIHtcbiAgICAgICAgICAgICAgY29uc3Qgc2xpZGVzVG9SZW5kZXIgPSBbXTtcblxuICAgICAgICAgICAgICBmb3IgKGxldCBpID0gZnJvbTsgaSA8PSB0bzsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgc2xpZGVzVG9SZW5kZXIucHVzaChzbGlkZXNbaV0pO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHNsaWRlc1RvUmVuZGVyO1xuICAgICAgICAgICAgfSgpXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy52aXJ0dWFsLnJlbmRlckV4dGVybmFsVXBkYXRlKSB7XG4gICAgICAgICAgICBvblJlbmRlcmVkKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVtaXQoJ3ZpcnR1YWxVcGRhdGUnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcmVwZW5kSW5kZXhlcyA9IFtdO1xuICAgICAgICBjb25zdCBhcHBlbmRJbmRleGVzID0gW107XG5cbiAgICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwuZmluZChgLiR7c3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzfWApLnJlbW92ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvciAobGV0IGkgPSBwcmV2aW91c0Zyb207IGkgPD0gcHJldmlvdXNUbzsgaSArPSAxKSB7XG4gICAgICAgICAgICBpZiAoaSA8IGZyb20gfHwgaSA+IHRvKSB7XG4gICAgICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsLmZpbmQoYC4ke3N3aXBlci5wYXJhbXMuc2xpZGVDbGFzc31bZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke2l9XCJdYCkucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBpZiAoaSA+PSBmcm9tICYmIGkgPD0gdG8pIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJldmlvdXNUbyA9PT0gJ3VuZGVmaW5lZCcgfHwgZm9yY2UpIHtcbiAgICAgICAgICAgICAgYXBwZW5kSW5kZXhlcy5wdXNoKGkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGkgPiBwcmV2aW91c1RvKSBhcHBlbmRJbmRleGVzLnB1c2goaSk7XG4gICAgICAgICAgICAgIGlmIChpIDwgcHJldmlvdXNGcm9tKSBwcmVwZW5kSW5kZXhlcy5wdXNoKGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGVuZEluZGV4ZXMuZm9yRWFjaChpbmRleCA9PiB7XG4gICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwuYXBwZW5kKHJlbmRlclNsaWRlKHNsaWRlc1tpbmRleF0sIGluZGV4KSk7XG4gICAgICAgIH0pO1xuICAgICAgICBwcmVwZW5kSW5kZXhlcy5zb3J0KChhLCBiKSA9PiBiIC0gYSkuZm9yRWFjaChpbmRleCA9PiB7XG4gICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwucHJlcGVuZChyZW5kZXJTbGlkZShzbGlkZXNbaW5kZXhdLCBpbmRleCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwuY2hpbGRyZW4oJy5zd2lwZXItc2xpZGUnKS5jc3Mob2Zmc2V0UHJvcCwgYCR7b2Zmc2V0fXB4YCk7XG4gICAgICAgIG9uUmVuZGVyZWQoKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYXBwZW5kU2xpZGUoc2xpZGVzKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2xpZGVzID09PSAnb2JqZWN0JyAmJiAnbGVuZ3RoJyBpbiBzbGlkZXMpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaWYgKHNsaWRlc1tpXSkgc3dpcGVyLnZpcnR1YWwuc2xpZGVzLnB1c2goc2xpZGVzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3dpcGVyLnZpcnR1YWwuc2xpZGVzLnB1c2goc2xpZGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZSh0cnVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gcHJlcGVuZFNsaWRlKHNsaWRlcykge1xuICAgICAgICBjb25zdCBhY3RpdmVJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcbiAgICAgICAgbGV0IG5ld0FjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXggKyAxO1xuICAgICAgICBsZXQgbnVtYmVyT2ZOZXdTbGlkZXMgPSAxO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNsaWRlcykpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaWYgKHNsaWRlc1tpXSkgc3dpcGVyLnZpcnR1YWwuc2xpZGVzLnVuc2hpZnQoc2xpZGVzW2ldKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXdBY3RpdmVJbmRleCA9IGFjdGl2ZUluZGV4ICsgc2xpZGVzLmxlbmd0aDtcbiAgICAgICAgICBudW1iZXJPZk5ld1NsaWRlcyA9IHNsaWRlcy5sZW5ndGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3dpcGVyLnZpcnR1YWwuc2xpZGVzLnVuc2hpZnQoc2xpZGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLnZpcnR1YWwuY2FjaGUpIHtcbiAgICAgICAgICBjb25zdCBjYWNoZSA9IHN3aXBlci52aXJ0dWFsLmNhY2hlO1xuICAgICAgICAgIGNvbnN0IG5ld0NhY2hlID0ge307XG4gICAgICAgICAgT2JqZWN0LmtleXMoY2FjaGUpLmZvckVhY2goY2FjaGVkSW5kZXggPT4ge1xuICAgICAgICAgICAgY29uc3QgJGNhY2hlZEVsID0gY2FjaGVbY2FjaGVkSW5kZXhdO1xuICAgICAgICAgICAgY29uc3QgY2FjaGVkRWxJbmRleCA9ICRjYWNoZWRFbC5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpO1xuXG4gICAgICAgICAgICBpZiAoY2FjaGVkRWxJbmRleCkge1xuICAgICAgICAgICAgICAkY2FjaGVkRWwuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnLCBwYXJzZUludChjYWNoZWRFbEluZGV4LCAxMCkgKyBudW1iZXJPZk5ld1NsaWRlcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5ld0NhY2hlW3BhcnNlSW50KGNhY2hlZEluZGV4LCAxMCkgKyBudW1iZXJPZk5ld1NsaWRlc10gPSAkY2FjaGVkRWw7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc3dpcGVyLnZpcnR1YWwuY2FjaGUgPSBuZXdDYWNoZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZSh0cnVlKTtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8obmV3QWN0aXZlSW5kZXgsIDApO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiByZW1vdmVTbGlkZShzbGlkZXNJbmRleGVzKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2xpZGVzSW5kZXhlcyA9PT0gJ3VuZGVmaW5lZCcgfHwgc2xpZGVzSW5kZXhlcyA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICBsZXQgYWN0aXZlSW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXg7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2xpZGVzSW5kZXhlcykpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gc2xpZGVzSW5kZXhlcy5sZW5ndGggLSAxOyBpID49IDA7IGkgLT0gMSkge1xuICAgICAgICAgICAgc3dpcGVyLnZpcnR1YWwuc2xpZGVzLnNwbGljZShzbGlkZXNJbmRleGVzW2ldLCAxKTtcblxuICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMudmlydHVhbC5jYWNoZSkge1xuICAgICAgICAgICAgICBkZWxldGUgc3dpcGVyLnZpcnR1YWwuY2FjaGVbc2xpZGVzSW5kZXhlc1tpXV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzbGlkZXNJbmRleGVzW2ldIDwgYWN0aXZlSW5kZXgpIGFjdGl2ZUluZGV4IC09IDE7XG4gICAgICAgICAgICBhY3RpdmVJbmRleCA9IE1hdGgubWF4KGFjdGl2ZUluZGV4LCAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3dpcGVyLnZpcnR1YWwuc2xpZGVzLnNwbGljZShzbGlkZXNJbmRleGVzLCAxKTtcblxuICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLnZpcnR1YWwuY2FjaGUpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBzd2lwZXIudmlydHVhbC5jYWNoZVtzbGlkZXNJbmRleGVzXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2xpZGVzSW5kZXhlcyA8IGFjdGl2ZUluZGV4KSBhY3RpdmVJbmRleCAtPSAxO1xuICAgICAgICAgIGFjdGl2ZUluZGV4ID0gTWF0aC5tYXgoYWN0aXZlSW5kZXgsIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlKHRydWUpO1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhhY3RpdmVJbmRleCwgMCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHJlbW92ZUFsbFNsaWRlcygpIHtcbiAgICAgICAgc3dpcGVyLnZpcnR1YWwuc2xpZGVzID0gW107XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMudmlydHVhbC5jYWNoZSkge1xuICAgICAgICAgIHN3aXBlci52aXJ0dWFsLmNhY2hlID0ge307XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGUodHJ1ZSk7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKDAsIDApO1xuICAgICAgfVxuXG4gICAgICBvbignYmVmb3JlSW5pdCcsICgpID0+IHtcbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkgcmV0dXJuO1xuICAgICAgICBzd2lwZXIudmlydHVhbC5zbGlkZXMgPSBzd2lwZXIucGFyYW1zLnZpcnR1YWwuc2xpZGVzO1xuICAgICAgICBzd2lwZXIuY2xhc3NOYW1lcy5wdXNoKGAke3N3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc312aXJ0dWFsYCk7XG4gICAgICAgIHN3aXBlci5wYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcyA9IHRydWU7XG4gICAgICAgIHN3aXBlci5vcmlnaW5hbFBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzID0gdHJ1ZTtcblxuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMuaW5pdGlhbFNsaWRlKSB7XG4gICAgICAgICAgdXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ3NldFRyYW5zbGF0ZScsICgpID0+IHtcbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmNzc01vZGUgJiYgIXN3aXBlci5faW1tZWRpYXRlVmlydHVhbCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dChjc3NNb2RlVGltZW91dCk7XG4gICAgICAgICAgY3NzTW9kZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZSgpO1xuICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ2luaXQgdXBkYXRlIHJlc2l6ZScsICgpID0+IHtcbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgICBzZXRDU1NQcm9wZXJ0eShzd2lwZXIud3JhcHBlckVsLCAnLS1zd2lwZXItdmlydHVhbC1zaXplJywgYCR7c3dpcGVyLnZpcnR1YWxTaXplfXB4YCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgT2JqZWN0LmFzc2lnbihzd2lwZXIudmlydHVhbCwge1xuICAgICAgICBhcHBlbmRTbGlkZSxcbiAgICAgICAgcHJlcGVuZFNsaWRlLFxuICAgICAgICByZW1vdmVTbGlkZSxcbiAgICAgICAgcmVtb3ZlQWxsU2xpZGVzLFxuICAgICAgICB1cGRhdGVcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qIGVzbGludC1kaXNhYmxlIGNvbnNpc3RlbnQtcmV0dXJuICovXG4gICAgZnVuY3Rpb24gS2V5Ym9hcmQoX3JlZikge1xuICAgICAgbGV0IHtcbiAgICAgICAgc3dpcGVyLFxuICAgICAgICBleHRlbmRQYXJhbXMsXG4gICAgICAgIG9uLFxuICAgICAgICBlbWl0XG4gICAgICB9ID0gX3JlZjtcbiAgICAgIGNvbnN0IGRvY3VtZW50ID0gZ2V0RG9jdW1lbnQoKTtcbiAgICAgIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICAgICAgc3dpcGVyLmtleWJvYXJkID0ge1xuICAgICAgICBlbmFibGVkOiBmYWxzZVxuICAgICAgfTtcbiAgICAgIGV4dGVuZFBhcmFtcyh7XG4gICAgICAgIGtleWJvYXJkOiB7XG4gICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgb25seUluVmlld3BvcnQ6IHRydWUsXG4gICAgICAgICAgcGFnZVVwRG93bjogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgZnVuY3Rpb24gaGFuZGxlKGV2ZW50KSB7XG4gICAgICAgIGlmICghc3dpcGVyLmVuYWJsZWQpIHJldHVybjtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHJ0bFRyYW5zbGF0ZTogcnRsXG4gICAgICAgIH0gPSBzd2lwZXI7XG4gICAgICAgIGxldCBlID0gZXZlbnQ7XG4gICAgICAgIGlmIChlLm9yaWdpbmFsRXZlbnQpIGUgPSBlLm9yaWdpbmFsRXZlbnQ7IC8vIGpxdWVyeSBmaXhcblxuICAgICAgICBjb25zdCBrYyA9IGUua2V5Q29kZSB8fCBlLmNoYXJDb2RlO1xuICAgICAgICBjb25zdCBwYWdlVXBEb3duID0gc3dpcGVyLnBhcmFtcy5rZXlib2FyZC5wYWdlVXBEb3duO1xuICAgICAgICBjb25zdCBpc1BhZ2VVcCA9IHBhZ2VVcERvd24gJiYga2MgPT09IDMzO1xuICAgICAgICBjb25zdCBpc1BhZ2VEb3duID0gcGFnZVVwRG93biAmJiBrYyA9PT0gMzQ7XG4gICAgICAgIGNvbnN0IGlzQXJyb3dMZWZ0ID0ga2MgPT09IDM3O1xuICAgICAgICBjb25zdCBpc0Fycm93UmlnaHQgPSBrYyA9PT0gMzk7XG4gICAgICAgIGNvbnN0IGlzQXJyb3dVcCA9IGtjID09PSAzODtcbiAgICAgICAgY29uc3QgaXNBcnJvd0Rvd24gPSBrYyA9PT0gNDA7IC8vIERpcmVjdGlvbnMgbG9ja3NcblxuICAgICAgICBpZiAoIXN3aXBlci5hbGxvd1NsaWRlTmV4dCAmJiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpICYmIGlzQXJyb3dSaWdodCB8fCBzd2lwZXIuaXNWZXJ0aWNhbCgpICYmIGlzQXJyb3dEb3duIHx8IGlzUGFnZURvd24pKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZVByZXYgJiYgKHN3aXBlci5pc0hvcml6b250YWwoKSAmJiBpc0Fycm93TGVmdCB8fCBzd2lwZXIuaXNWZXJ0aWNhbCgpICYmIGlzQXJyb3dVcCB8fCBpc1BhZ2VVcCkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZS5zaGlmdEtleSB8fCBlLmFsdEtleSB8fCBlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSB7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQubm9kZU5hbWUgJiYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2lucHV0JyB8fCBkb2N1bWVudC5hY3RpdmVFbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd0ZXh0YXJlYScpKSB7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmtleWJvYXJkLm9ubHlJblZpZXdwb3J0ICYmIChpc1BhZ2VVcCB8fCBpc1BhZ2VEb3duIHx8IGlzQXJyb3dMZWZ0IHx8IGlzQXJyb3dSaWdodCB8fCBpc0Fycm93VXAgfHwgaXNBcnJvd0Rvd24pKSB7XG4gICAgICAgICAgbGV0IGluVmlldyA9IGZhbHNlOyAvLyBDaGVjayB0aGF0IHN3aXBlciBzaG91bGQgYmUgaW5zaWRlIG9mIHZpc2libGUgYXJlYSBvZiB3aW5kb3dcblxuICAgICAgICAgIGlmIChzd2lwZXIuJGVsLnBhcmVudHMoYC4ke3N3aXBlci5wYXJhbXMuc2xpZGVDbGFzc31gKS5sZW5ndGggPiAwICYmIHN3aXBlci4kZWwucGFyZW50cyhgLiR7c3dpcGVyLnBhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzfWApLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCAkZWwgPSBzd2lwZXIuJGVsO1xuICAgICAgICAgIGNvbnN0IHN3aXBlcldpZHRoID0gJGVsWzBdLmNsaWVudFdpZHRoO1xuICAgICAgICAgIGNvbnN0IHN3aXBlckhlaWdodCA9ICRlbFswXS5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgY29uc3Qgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgICAgY29uc3Qgc3dpcGVyT2Zmc2V0ID0gc3dpcGVyLiRlbC5vZmZzZXQoKTtcbiAgICAgICAgICBpZiAocnRsKSBzd2lwZXJPZmZzZXQubGVmdCAtPSBzd2lwZXIuJGVsWzBdLnNjcm9sbExlZnQ7XG4gICAgICAgICAgY29uc3Qgc3dpcGVyQ29vcmQgPSBbW3N3aXBlck9mZnNldC5sZWZ0LCBzd2lwZXJPZmZzZXQudG9wXSwgW3N3aXBlck9mZnNldC5sZWZ0ICsgc3dpcGVyV2lkdGgsIHN3aXBlck9mZnNldC50b3BdLCBbc3dpcGVyT2Zmc2V0LmxlZnQsIHN3aXBlck9mZnNldC50b3AgKyBzd2lwZXJIZWlnaHRdLCBbc3dpcGVyT2Zmc2V0LmxlZnQgKyBzd2lwZXJXaWR0aCwgc3dpcGVyT2Zmc2V0LnRvcCArIHN3aXBlckhlaWdodF1dO1xuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2lwZXJDb29yZC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgcG9pbnQgPSBzd2lwZXJDb29yZFtpXTtcblxuICAgICAgICAgICAgaWYgKHBvaW50WzBdID49IDAgJiYgcG9pbnRbMF0gPD0gd2luZG93V2lkdGggJiYgcG9pbnRbMV0gPj0gMCAmJiBwb2ludFsxXSA8PSB3aW5kb3dIZWlnaHQpIHtcbiAgICAgICAgICAgICAgaWYgKHBvaW50WzBdID09PSAwICYmIHBvaW50WzFdID09PSAwKSBjb250aW51ZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgICAgICAgICAgIGluVmlldyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFpblZpZXcpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgaWYgKGlzUGFnZVVwIHx8IGlzUGFnZURvd24gfHwgaXNBcnJvd0xlZnQgfHwgaXNBcnJvd1JpZ2h0KSB7XG4gICAgICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpO2Vsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICgoaXNQYWdlRG93biB8fCBpc0Fycm93UmlnaHQpICYmICFydGwgfHwgKGlzUGFnZVVwIHx8IGlzQXJyb3dMZWZ0KSAmJiBydGwpIHN3aXBlci5zbGlkZU5leHQoKTtcbiAgICAgICAgICBpZiAoKGlzUGFnZVVwIHx8IGlzQXJyb3dMZWZ0KSAmJiAhcnRsIHx8IChpc1BhZ2VEb3duIHx8IGlzQXJyb3dSaWdodCkgJiYgcnRsKSBzd2lwZXIuc2xpZGVQcmV2KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGlzUGFnZVVwIHx8IGlzUGFnZURvd24gfHwgaXNBcnJvd1VwIHx8IGlzQXJyb3dEb3duKSB7XG4gICAgICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpO2Vsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChpc1BhZ2VEb3duIHx8IGlzQXJyb3dEb3duKSBzd2lwZXIuc2xpZGVOZXh0KCk7XG4gICAgICAgICAgaWYgKGlzUGFnZVVwIHx8IGlzQXJyb3dVcCkgc3dpcGVyLnNsaWRlUHJldigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZW1pdCgna2V5UHJlc3MnLCBrYyk7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICAgICAgaWYgKHN3aXBlci5rZXlib2FyZC5lbmFibGVkKSByZXR1cm47XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdrZXlkb3duJywgaGFuZGxlKTtcbiAgICAgICAgc3dpcGVyLmtleWJvYXJkLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgICAgICBpZiAoIXN3aXBlci5rZXlib2FyZC5lbmFibGVkKSByZXR1cm47XG4gICAgICAgICQoZG9jdW1lbnQpLm9mZigna2V5ZG93bicsIGhhbmRsZSk7XG4gICAgICAgIHN3aXBlci5rZXlib2FyZC5lbmFibGVkID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIG9uKCdpbml0JywgKCkgPT4ge1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5rZXlib2FyZC5lbmFibGVkKSB7XG4gICAgICAgICAgZW5hYmxlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIua2V5Ym9hcmQuZW5hYmxlZCkge1xuICAgICAgICAgIGRpc2FibGUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBPYmplY3QuYXNzaWduKHN3aXBlci5rZXlib2FyZCwge1xuICAgICAgICBlbmFibGUsXG4gICAgICAgIGRpc2FibGVcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qIGVzbGludC1kaXNhYmxlIGNvbnNpc3RlbnQtcmV0dXJuICovXG4gICAgZnVuY3Rpb24gTW91c2V3aGVlbChfcmVmKSB7XG4gICAgICBsZXQge1xuICAgICAgICBzd2lwZXIsXG4gICAgICAgIGV4dGVuZFBhcmFtcyxcbiAgICAgICAgb24sXG4gICAgICAgIGVtaXRcbiAgICAgIH0gPSBfcmVmO1xuICAgICAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG4gICAgICBleHRlbmRQYXJhbXMoe1xuICAgICAgICBtb3VzZXdoZWVsOiB7XG4gICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgcmVsZWFzZU9uRWRnZXM6IGZhbHNlLFxuICAgICAgICAgIGludmVydDogZmFsc2UsXG4gICAgICAgICAgZm9yY2VUb0F4aXM6IGZhbHNlLFxuICAgICAgICAgIHNlbnNpdGl2aXR5OiAxLFxuICAgICAgICAgIGV2ZW50c1RhcmdldDogJ2NvbnRhaW5lcicsXG4gICAgICAgICAgdGhyZXNob2xkRGVsdGE6IG51bGwsXG4gICAgICAgICAgdGhyZXNob2xkVGltZTogbnVsbFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHN3aXBlci5tb3VzZXdoZWVsID0ge1xuICAgICAgICBlbmFibGVkOiBmYWxzZVxuICAgICAgfTtcbiAgICAgIGxldCB0aW1lb3V0O1xuICAgICAgbGV0IGxhc3RTY3JvbGxUaW1lID0gbm93KCk7XG4gICAgICBsZXQgbGFzdEV2ZW50QmVmb3JlU25hcDtcbiAgICAgIGNvbnN0IHJlY2VudFdoZWVsRXZlbnRzID0gW107XG5cbiAgICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZShlKSB7XG4gICAgICAgIC8vIFJlYXNvbmFibGUgZGVmYXVsdHNcbiAgICAgICAgY29uc3QgUElYRUxfU1RFUCA9IDEwO1xuICAgICAgICBjb25zdCBMSU5FX0hFSUdIVCA9IDQwO1xuICAgICAgICBjb25zdCBQQUdFX0hFSUdIVCA9IDgwMDtcbiAgICAgICAgbGV0IHNYID0gMDtcbiAgICAgICAgbGV0IHNZID0gMDsgLy8gc3BpblgsIHNwaW5ZXG5cbiAgICAgICAgbGV0IHBYID0gMDtcbiAgICAgICAgbGV0IHBZID0gMDsgLy8gcGl4ZWxYLCBwaXhlbFlcbiAgICAgICAgLy8gTGVnYWN5XG5cbiAgICAgICAgaWYgKCdkZXRhaWwnIGluIGUpIHtcbiAgICAgICAgICBzWSA9IGUuZGV0YWlsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCd3aGVlbERlbHRhJyBpbiBlKSB7XG4gICAgICAgICAgc1kgPSAtZS53aGVlbERlbHRhIC8gMTIwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCd3aGVlbERlbHRhWScgaW4gZSkge1xuICAgICAgICAgIHNZID0gLWUud2hlZWxEZWx0YVkgLyAxMjA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJ3doZWVsRGVsdGFYJyBpbiBlKSB7XG4gICAgICAgICAgc1ggPSAtZS53aGVlbERlbHRhWCAvIDEyMDtcbiAgICAgICAgfSAvLyBzaWRlIHNjcm9sbGluZyBvbiBGRiB3aXRoIERPTU1vdXNlU2Nyb2xsXG5cblxuICAgICAgICBpZiAoJ2F4aXMnIGluIGUgJiYgZS5heGlzID09PSBlLkhPUklaT05UQUxfQVhJUykge1xuICAgICAgICAgIHNYID0gc1k7XG4gICAgICAgICAgc1kgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcFggPSBzWCAqIFBJWEVMX1NURVA7XG4gICAgICAgIHBZID0gc1kgKiBQSVhFTF9TVEVQO1xuXG4gICAgICAgIGlmICgnZGVsdGFZJyBpbiBlKSB7XG4gICAgICAgICAgcFkgPSBlLmRlbHRhWTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgnZGVsdGFYJyBpbiBlKSB7XG4gICAgICAgICAgcFggPSBlLmRlbHRhWDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLnNoaWZ0S2V5ICYmICFwWCkge1xuICAgICAgICAgIC8vIGlmIHVzZXIgc2Nyb2xscyB3aXRoIHNoaWZ0IGhlIHdhbnRzIGhvcml6b250YWwgc2Nyb2xsXG4gICAgICAgICAgcFggPSBwWTtcbiAgICAgICAgICBwWSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKHBYIHx8IHBZKSAmJiBlLmRlbHRhTW9kZSkge1xuICAgICAgICAgIGlmIChlLmRlbHRhTW9kZSA9PT0gMSkge1xuICAgICAgICAgICAgLy8gZGVsdGEgaW4gTElORSB1bml0c1xuICAgICAgICAgICAgcFggKj0gTElORV9IRUlHSFQ7XG4gICAgICAgICAgICBwWSAqPSBMSU5FX0hFSUdIVDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZGVsdGEgaW4gUEFHRSB1bml0c1xuICAgICAgICAgICAgcFggKj0gUEFHRV9IRUlHSFQ7XG4gICAgICAgICAgICBwWSAqPSBQQUdFX0hFSUdIVDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gLy8gRmFsbC1iYWNrIGlmIHNwaW4gY2Fubm90IGJlIGRldGVybWluZWRcblxuXG4gICAgICAgIGlmIChwWCAmJiAhc1gpIHtcbiAgICAgICAgICBzWCA9IHBYIDwgMSA/IC0xIDogMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwWSAmJiAhc1kpIHtcbiAgICAgICAgICBzWSA9IHBZIDwgMSA/IC0xIDogMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3Bpblg6IHNYLFxuICAgICAgICAgIHNwaW5ZOiBzWSxcbiAgICAgICAgICBwaXhlbFg6IHBYLFxuICAgICAgICAgIHBpeGVsWTogcFlcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gaGFuZGxlTW91c2VFbnRlcigpIHtcbiAgICAgICAgaWYgKCFzd2lwZXIuZW5hYmxlZCkgcmV0dXJuO1xuICAgICAgICBzd2lwZXIubW91c2VFbnRlcmVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gaGFuZGxlTW91c2VMZWF2ZSgpIHtcbiAgICAgICAgaWYgKCFzd2lwZXIuZW5hYmxlZCkgcmV0dXJuO1xuICAgICAgICBzd2lwZXIubW91c2VFbnRlcmVkID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGFuaW1hdGVTbGlkZXIobmV3RXZlbnQpIHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubW91c2V3aGVlbC50aHJlc2hvbGREZWx0YSAmJiBuZXdFdmVudC5kZWx0YSA8IHN3aXBlci5wYXJhbXMubW91c2V3aGVlbC50aHJlc2hvbGREZWx0YSkge1xuICAgICAgICAgIC8vIFByZXZlbnQgaWYgZGVsdGEgb2Ygd2hlZWwgc2Nyb2xsIGRlbHRhIGlzIGJlbG93IGNvbmZpZ3VyZWQgdGhyZXNob2xkXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubW91c2V3aGVlbC50aHJlc2hvbGRUaW1lICYmIG5vdygpIC0gbGFzdFNjcm9sbFRpbWUgPCBzd2lwZXIucGFyYW1zLm1vdXNld2hlZWwudGhyZXNob2xkVGltZSkge1xuICAgICAgICAgIC8vIFByZXZlbnQgaWYgdGltZSBiZXR3ZWVuIHNjcm9sbHMgaXMgYmVsb3cgY29uZmlndXJlZCB0aHJlc2hvbGRcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gLy8gSWYgdGhlIG1vdmVtZW50IGlzIE5PVCBiaWcgZW5vdWdoIGFuZFxuICAgICAgICAvLyBpZiB0aGUgbGFzdCB0aW1lIHRoZSB1c2VyIHNjcm9sbGVkIHdhcyB0b28gY2xvc2UgdG8gdGhlIGN1cnJlbnQgb25lIChhdm9pZCBjb250aW51b3VzbHkgdHJpZ2dlcmluZyB0aGUgc2xpZGVyKTpcbiAgICAgICAgLy8gICBEb24ndCBnbyBhbnkgZnVydGhlciAoYXZvaWQgaW5zaWduaWZpY2FudCBzY3JvbGwgbW92ZW1lbnQpLlxuXG5cbiAgICAgICAgaWYgKG5ld0V2ZW50LmRlbHRhID49IDYgJiYgbm93KCkgLSBsYXN0U2Nyb2xsVGltZSA8IDYwKSB7XG4gICAgICAgICAgLy8gUmV0dXJuIGZhbHNlIGFzIGEgZGVmYXVsdFxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IC8vIElmIHVzZXIgaXMgc2Nyb2xsaW5nIHRvd2FyZHMgdGhlIGVuZDpcbiAgICAgICAgLy8gICBJZiB0aGUgc2xpZGVyIGhhc24ndCBoaXQgdGhlIGxhdGVzdCBzbGlkZSBvclxuICAgICAgICAvLyAgIGlmIHRoZSBzbGlkZXIgaXMgYSBsb29wIGFuZFxuICAgICAgICAvLyAgIGlmIHRoZSBzbGlkZXIgaXNuJ3QgbW92aW5nIHJpZ2h0IG5vdzpcbiAgICAgICAgLy8gICAgIEdvIHRvIG5leHQgc2xpZGUgYW5kXG4gICAgICAgIC8vICAgICBlbWl0IGEgc2Nyb2xsIGV2ZW50LlxuICAgICAgICAvLyBFbHNlICh0aGUgdXNlciBpcyBzY3JvbGxpbmcgdG93YXJkcyB0aGUgYmVnaW5uaW5nKSBhbmRcbiAgICAgICAgLy8gaWYgdGhlIHNsaWRlciBoYXNuJ3QgaGl0IHRoZSBmaXJzdCBzbGlkZSBvclxuICAgICAgICAvLyBpZiB0aGUgc2xpZGVyIGlzIGEgbG9vcCBhbmRcbiAgICAgICAgLy8gaWYgdGhlIHNsaWRlciBpc24ndCBtb3ZpbmcgcmlnaHQgbm93OlxuICAgICAgICAvLyAgIEdvIHRvIHByZXYgc2xpZGUgYW5kXG4gICAgICAgIC8vICAgZW1pdCBhIHNjcm9sbCBldmVudC5cblxuXG4gICAgICAgIGlmIChuZXdFdmVudC5kaXJlY3Rpb24gPCAwKSB7XG4gICAgICAgICAgaWYgKCghc3dpcGVyLmlzRW5kIHx8IHN3aXBlci5wYXJhbXMubG9vcCkgJiYgIXN3aXBlci5hbmltYXRpbmcpIHtcbiAgICAgICAgICAgIHN3aXBlci5zbGlkZU5leHQoKTtcbiAgICAgICAgICAgIGVtaXQoJ3Njcm9sbCcsIG5ld0V2ZW50LnJhdyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCghc3dpcGVyLmlzQmVnaW5uaW5nIHx8IHN3aXBlci5wYXJhbXMubG9vcCkgJiYgIXN3aXBlci5hbmltYXRpbmcpIHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVQcmV2KCk7XG4gICAgICAgICAgZW1pdCgnc2Nyb2xsJywgbmV3RXZlbnQucmF3KTtcbiAgICAgICAgfSAvLyBJZiB5b3UgZ290IGhlcmUgaXMgYmVjYXVzZSBhbiBhbmltYXRpb24gaGFzIGJlZW4gdHJpZ2dlcmVkIHNvIHN0b3JlIHRoZSBjdXJyZW50IHRpbWVcblxuXG4gICAgICAgIGxhc3RTY3JvbGxUaW1lID0gbmV3IHdpbmRvdy5EYXRlKCkuZ2V0VGltZSgpOyAvLyBSZXR1cm4gZmFsc2UgYXMgYSBkZWZhdWx0XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiByZWxlYXNlU2Nyb2xsKG5ld0V2ZW50KSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMubW91c2V3aGVlbDtcblxuICAgICAgICBpZiAobmV3RXZlbnQuZGlyZWN0aW9uIDwgMCkge1xuICAgICAgICAgIGlmIChzd2lwZXIuaXNFbmQgJiYgIXN3aXBlci5wYXJhbXMubG9vcCAmJiBwYXJhbXMucmVsZWFzZU9uRWRnZXMpIHtcbiAgICAgICAgICAgIC8vIFJldHVybiB0cnVlIHRvIGFuaW1hdGUgc2Nyb2xsIG9uIGVkZ2VzXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc3dpcGVyLmlzQmVnaW5uaW5nICYmICFzd2lwZXIucGFyYW1zLmxvb3AgJiYgcGFyYW1zLnJlbGVhc2VPbkVkZ2VzKSB7XG4gICAgICAgICAgLy8gUmV0dXJuIHRydWUgdG8gYW5pbWF0ZSBzY3JvbGwgb24gZWRnZXNcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gaGFuZGxlKGV2ZW50KSB7XG4gICAgICAgIGxldCBlID0gZXZlbnQ7XG4gICAgICAgIGxldCBkaXNhYmxlUGFyZW50U3dpcGVyID0gdHJ1ZTtcbiAgICAgICAgaWYgKCFzd2lwZXIuZW5hYmxlZCkgcmV0dXJuO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLm1vdXNld2hlZWw7XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB0YXJnZXQgPSBzd2lwZXIuJGVsO1xuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLm1vdXNld2hlZWwuZXZlbnRzVGFyZ2V0ICE9PSAnY29udGFpbmVyJykge1xuICAgICAgICAgIHRhcmdldCA9ICQoc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsLmV2ZW50c1RhcmdldCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXN3aXBlci5tb3VzZUVudGVyZWQgJiYgIXRhcmdldFswXS5jb250YWlucyhlLnRhcmdldCkgJiYgIXBhcmFtcy5yZWxlYXNlT25FZGdlcykgcmV0dXJuIHRydWU7XG4gICAgICAgIGlmIChlLm9yaWdpbmFsRXZlbnQpIGUgPSBlLm9yaWdpbmFsRXZlbnQ7IC8vIGpxdWVyeSBmaXhcblxuICAgICAgICBsZXQgZGVsdGEgPSAwO1xuICAgICAgICBjb25zdCBydGxGYWN0b3IgPSBzd2lwZXIucnRsVHJhbnNsYXRlID8gLTEgOiAxO1xuICAgICAgICBjb25zdCBkYXRhID0gbm9ybWFsaXplKGUpO1xuXG4gICAgICAgIGlmIChwYXJhbXMuZm9yY2VUb0F4aXMpIHtcbiAgICAgICAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGF0YS5waXhlbFgpID4gTWF0aC5hYnMoZGF0YS5waXhlbFkpKSBkZWx0YSA9IC1kYXRhLnBpeGVsWCAqIHJ0bEZhY3RvcjtlbHNlIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMoZGF0YS5waXhlbFkpID4gTWF0aC5hYnMoZGF0YS5waXhlbFgpKSBkZWx0YSA9IC1kYXRhLnBpeGVsWTtlbHNlIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbHRhID0gTWF0aC5hYnMoZGF0YS5waXhlbFgpID4gTWF0aC5hYnMoZGF0YS5waXhlbFkpID8gLWRhdGEucGl4ZWxYICogcnRsRmFjdG9yIDogLWRhdGEucGl4ZWxZO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlbHRhID09PSAwKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgaWYgKHBhcmFtcy5pbnZlcnQpIGRlbHRhID0gLWRlbHRhOyAvLyBHZXQgdGhlIHNjcm9sbCBwb3NpdGlvbnNcblxuICAgICAgICBsZXQgcG9zaXRpb25zID0gc3dpcGVyLmdldFRyYW5zbGF0ZSgpICsgZGVsdGEgKiBwYXJhbXMuc2Vuc2l0aXZpdHk7XG4gICAgICAgIGlmIChwb3NpdGlvbnMgPj0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSBwb3NpdGlvbnMgPSBzd2lwZXIubWluVHJhbnNsYXRlKCk7XG4gICAgICAgIGlmIChwb3NpdGlvbnMgPD0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSBwb3NpdGlvbnMgPSBzd2lwZXIubWF4VHJhbnNsYXRlKCk7IC8vIFdoZW4gbG9vcCBpcyB0cnVlOlxuICAgICAgICAvLyAgICAgdGhlIGRpc2FibGVQYXJlbnRTd2lwZXIgd2lsbCBiZSB0cnVlLlxuICAgICAgICAvLyBXaGVuIGxvb3AgaXMgZmFsc2U6XG4gICAgICAgIC8vICAgICBpZiB0aGUgc2Nyb2xsIHBvc2l0aW9ucyBpcyBub3Qgb24gZWRnZSxcbiAgICAgICAgLy8gICAgIHRoZW4gdGhlIGRpc2FibGVQYXJlbnRTd2lwZXIgd2lsbCBiZSB0cnVlLlxuICAgICAgICAvLyAgICAgaWYgdGhlIHNjcm9sbCBvbiBlZGdlIHBvc2l0aW9ucyxcbiAgICAgICAgLy8gICAgIHRoZW4gdGhlIGRpc2FibGVQYXJlbnRTd2lwZXIgd2lsbCBiZSBmYWxzZS5cblxuICAgICAgICBkaXNhYmxlUGFyZW50U3dpcGVyID0gc3dpcGVyLnBhcmFtcy5sb29wID8gdHJ1ZSA6ICEocG9zaXRpb25zID09PSBzd2lwZXIubWluVHJhbnNsYXRlKCkgfHwgcG9zaXRpb25zID09PSBzd2lwZXIubWF4VHJhbnNsYXRlKCkpO1xuICAgICAgICBpZiAoZGlzYWJsZVBhcmVudFN3aXBlciAmJiBzd2lwZXIucGFyYW1zLm5lc3RlZCkgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMuZnJlZU1vZGUgfHwgIXN3aXBlci5wYXJhbXMuZnJlZU1vZGUuZW5hYmxlZCkge1xuICAgICAgICAgIC8vIFJlZ2lzdGVyIHRoZSBuZXcgZXZlbnQgaW4gYSB2YXJpYWJsZSB3aGljaCBzdG9yZXMgdGhlIHJlbGV2YW50IGRhdGFcbiAgICAgICAgICBjb25zdCBuZXdFdmVudCA9IHtcbiAgICAgICAgICAgIHRpbWU6IG5vdygpLFxuICAgICAgICAgICAgZGVsdGE6IE1hdGguYWJzKGRlbHRhKSxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogTWF0aC5zaWduKGRlbHRhKSxcbiAgICAgICAgICAgIHJhdzogZXZlbnRcbiAgICAgICAgICB9OyAvLyBLZWVwIHRoZSBtb3N0IHJlY2VudCBldmVudHNcblxuICAgICAgICAgIGlmIChyZWNlbnRXaGVlbEV2ZW50cy5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgcmVjZW50V2hlZWxFdmVudHMuc2hpZnQoKTsgLy8gb25seSBzdG9yZSB0aGUgbGFzdCBOIGV2ZW50c1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHByZXZFdmVudCA9IHJlY2VudFdoZWVsRXZlbnRzLmxlbmd0aCA/IHJlY2VudFdoZWVsRXZlbnRzW3JlY2VudFdoZWVsRXZlbnRzLmxlbmd0aCAtIDFdIDogdW5kZWZpbmVkO1xuICAgICAgICAgIHJlY2VudFdoZWVsRXZlbnRzLnB1c2gobmV3RXZlbnQpOyAvLyBJZiB0aGVyZSBpcyBhdCBsZWFzdCBvbmUgcHJldmlvdXMgcmVjb3JkZWQgZXZlbnQ6XG4gICAgICAgICAgLy8gICBJZiBkaXJlY3Rpb24gaGFzIGNoYW5nZWQgb3JcbiAgICAgICAgICAvLyAgIGlmIHRoZSBzY3JvbGwgaXMgcXVpY2tlciB0aGFuIHRoZSBwcmV2aW91cyBvbmU6XG4gICAgICAgICAgLy8gICAgIEFuaW1hdGUgdGhlIHNsaWRlci5cbiAgICAgICAgICAvLyBFbHNlICh0aGlzIGlzIHRoZSBmaXJzdCB0aW1lIHRoZSB3aGVlbCBpcyBtb3ZlZCk6XG4gICAgICAgICAgLy8gICAgIEFuaW1hdGUgdGhlIHNsaWRlci5cblxuICAgICAgICAgIGlmIChwcmV2RXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChuZXdFdmVudC5kaXJlY3Rpb24gIT09IHByZXZFdmVudC5kaXJlY3Rpb24gfHwgbmV3RXZlbnQuZGVsdGEgPiBwcmV2RXZlbnQuZGVsdGEgfHwgbmV3RXZlbnQudGltZSA+IHByZXZFdmVudC50aW1lICsgMTUwKSB7XG4gICAgICAgICAgICAgIGFuaW1hdGVTbGlkZXIobmV3RXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbmltYXRlU2xpZGVyKG5ld0V2ZW50KTtcbiAgICAgICAgICB9IC8vIElmIGl0J3MgdGltZSB0byByZWxlYXNlIHRoZSBzY3JvbGw6XG4gICAgICAgICAgLy8gICBSZXR1cm4gbm93IHNvIHlvdSBkb24ndCBoaXQgdGhlIHByZXZlbnREZWZhdWx0LlxuXG5cbiAgICAgICAgICBpZiAocmVsZWFzZVNjcm9sbChuZXdFdmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBGcmVlbW9kZSBvciBzY3JvbGxDb250YWluZXI6XG4gICAgICAgICAgLy8gSWYgd2UgcmVjZW50bHkgc25hcHBlZCBhZnRlciBhIG1vbWVudHVtIHNjcm9sbCwgdGhlbiBpZ25vcmUgd2hlZWwgZXZlbnRzXG4gICAgICAgICAgLy8gdG8gZ2l2ZSB0aW1lIGZvciB0aGUgZGVjZWxlcmF0aW9uIHRvIGZpbmlzaC4gU3RvcCBpZ25vcmluZyBhZnRlciA1MDAgbXNlY3NcbiAgICAgICAgICAvLyBvciBpZiBpdCdzIGEgbmV3IHNjcm9sbCAobGFyZ2VyIGRlbHRhIG9yIGludmVyc2Ugc2lnbiBhcyBsYXN0IGV2ZW50IGJlZm9yZVxuICAgICAgICAgIC8vIGFuIGVuZC1vZi1tb21lbnR1bSBzbmFwKS5cbiAgICAgICAgICBjb25zdCBuZXdFdmVudCA9IHtcbiAgICAgICAgICAgIHRpbWU6IG5vdygpLFxuICAgICAgICAgICAgZGVsdGE6IE1hdGguYWJzKGRlbHRhKSxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogTWF0aC5zaWduKGRlbHRhKVxuICAgICAgICAgIH07XG4gICAgICAgICAgY29uc3QgaWdub3JlV2hlZWxFdmVudHMgPSBsYXN0RXZlbnRCZWZvcmVTbmFwICYmIG5ld0V2ZW50LnRpbWUgPCBsYXN0RXZlbnRCZWZvcmVTbmFwLnRpbWUgKyA1MDAgJiYgbmV3RXZlbnQuZGVsdGEgPD0gbGFzdEV2ZW50QmVmb3JlU25hcC5kZWx0YSAmJiBuZXdFdmVudC5kaXJlY3Rpb24gPT09IGxhc3RFdmVudEJlZm9yZVNuYXAuZGlyZWN0aW9uO1xuXG4gICAgICAgICAgaWYgKCFpZ25vcmVXaGVlbEV2ZW50cykge1xuICAgICAgICAgICAgbGFzdEV2ZW50QmVmb3JlU25hcCA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgICAgICAgICAgICBzd2lwZXIubG9vcEZpeCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcG9zaXRpb24gPSBzd2lwZXIuZ2V0VHJhbnNsYXRlKCkgKyBkZWx0YSAqIHBhcmFtcy5zZW5zaXRpdml0eTtcbiAgICAgICAgICAgIGNvbnN0IHdhc0JlZ2lubmluZyA9IHN3aXBlci5pc0JlZ2lubmluZztcbiAgICAgICAgICAgIGNvbnN0IHdhc0VuZCA9IHN3aXBlci5pc0VuZDtcbiAgICAgICAgICAgIGlmIChwb3NpdGlvbiA+PSBzd2lwZXIubWluVHJhbnNsYXRlKCkpIHBvc2l0aW9uID0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgaWYgKHBvc2l0aW9uIDw9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSkgcG9zaXRpb24gPSBzd2lwZXIubWF4VHJhbnNsYXRlKCk7XG4gICAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbigwKTtcbiAgICAgICAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUocG9zaXRpb24pO1xuICAgICAgICAgICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKCk7XG4gICAgICAgICAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG5cbiAgICAgICAgICAgIGlmICghd2FzQmVnaW5uaW5nICYmIHN3aXBlci5pc0JlZ2lubmluZyB8fCAhd2FzRW5kICYmIHN3aXBlci5pc0VuZCkge1xuICAgICAgICAgICAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5mcmVlTW9kZS5zdGlja3kpIHtcbiAgICAgICAgICAgICAgLy8gV2hlbiB3aGVlbCBzY3JvbGxpbmcgc3RhcnRzIHdpdGggc3RpY2t5IChha2Egc25hcCkgZW5hYmxlZCwgdGhlbiBkZXRlY3RcbiAgICAgICAgICAgICAgLy8gdGhlIGVuZCBvZiBhIG1vbWVudHVtIHNjcm9sbCBieSBzdG9yaW5nIHJlY2VudCAoTj0xNT8pIHdoZWVsIGV2ZW50cy5cbiAgICAgICAgICAgICAgLy8gMS4gZG8gYWxsIE4gZXZlbnRzIGhhdmUgZGVjcmVhc2luZyBvciBzYW1lIChhYnNvbHV0ZSB2YWx1ZSkgZGVsdGE/XG4gICAgICAgICAgICAgIC8vIDIuIGRpZCBhbGwgTiBldmVudHMgYXJyaXZlIGluIHRoZSBsYXN0IE0gKE09NTAwPykgbXNlY3M/XG4gICAgICAgICAgICAgIC8vIDMuIGRvZXMgdGhlIGVhcmxpZXN0IGV2ZW50IGhhdmUgYW4gKGFic29sdXRlIHZhbHVlKSBkZWx0YSB0aGF0J3NcbiAgICAgICAgICAgICAgLy8gICAgYXQgbGVhc3QgUCAoUD0xPykgbGFyZ2VyIHRoYW4gdGhlIG1vc3QgcmVjZW50IGV2ZW50J3MgZGVsdGE/XG4gICAgICAgICAgICAgIC8vIDQuIGRvZXMgdGhlIGxhdGVzdCBldmVudCBoYXZlIGEgZGVsdGEgdGhhdCdzIHNtYWxsZXIgdGhhbiBRIChRPTY/KSBwaXhlbHM/XG4gICAgICAgICAgICAgIC8vIElmIDEtNCBhcmUgXCJ5ZXNcIiB0aGVuIHdlJ3JlIG5lYXIgdGhlIGVuZCBvZiBhIG1vbWVudHVtIHNjcm9sbCBkZWNlbGVyYXRpb24uXG4gICAgICAgICAgICAgIC8vIFNuYXAgaW1tZWRpYXRlbHkgYW5kIGlnbm9yZSByZW1haW5pbmcgd2hlZWwgZXZlbnRzIGluIHRoaXMgc2Nyb2xsLlxuICAgICAgICAgICAgICAvLyBTZWUgY29tbWVudCBhYm92ZSBmb3IgXCJyZW1haW5pbmcgd2hlZWwgZXZlbnRzIGluIHRoaXMgc2Nyb2xsXCIgZGV0ZXJtaW5hdGlvbi5cbiAgICAgICAgICAgICAgLy8gSWYgMS00IGFyZW4ndCBzYXRpc2ZpZWQsIHRoZW4gd2FpdCB0byBzbmFwIHVudGlsIDUwMG1zIGFmdGVyIHRoZSBsYXN0IGV2ZW50LlxuICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICAgIHRpbWVvdXQgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgaWYgKHJlY2VudFdoZWVsRXZlbnRzLmxlbmd0aCA+PSAxNSkge1xuICAgICAgICAgICAgICAgIHJlY2VudFdoZWVsRXZlbnRzLnNoaWZ0KCk7IC8vIG9ubHkgc3RvcmUgdGhlIGxhc3QgTiBldmVudHNcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnN0IHByZXZFdmVudCA9IHJlY2VudFdoZWVsRXZlbnRzLmxlbmd0aCA/IHJlY2VudFdoZWVsRXZlbnRzW3JlY2VudFdoZWVsRXZlbnRzLmxlbmd0aCAtIDFdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICBjb25zdCBmaXJzdEV2ZW50ID0gcmVjZW50V2hlZWxFdmVudHNbMF07XG4gICAgICAgICAgICAgIHJlY2VudFdoZWVsRXZlbnRzLnB1c2gobmV3RXZlbnQpO1xuXG4gICAgICAgICAgICAgIGlmIChwcmV2RXZlbnQgJiYgKG5ld0V2ZW50LmRlbHRhID4gcHJldkV2ZW50LmRlbHRhIHx8IG5ld0V2ZW50LmRpcmVjdGlvbiAhPT0gcHJldkV2ZW50LmRpcmVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAvLyBJbmNyZWFzaW5nIG9yIHJldmVyc2Utc2lnbiBkZWx0YSBtZWFucyB0aGUgdXNlciBzdGFydGVkIHNjcm9sbGluZyBhZ2Fpbi4gQ2xlYXIgdGhlIHdoZWVsIGV2ZW50IGxvZy5cbiAgICAgICAgICAgICAgICByZWNlbnRXaGVlbEV2ZW50cy5zcGxpY2UoMCk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVjZW50V2hlZWxFdmVudHMubGVuZ3RoID49IDE1ICYmIG5ld0V2ZW50LnRpbWUgLSBmaXJzdEV2ZW50LnRpbWUgPCA1MDAgJiYgZmlyc3RFdmVudC5kZWx0YSAtIG5ld0V2ZW50LmRlbHRhID49IDEgJiYgbmV3RXZlbnQuZGVsdGEgPD0gNikge1xuICAgICAgICAgICAgICAgIC8vIFdlJ3JlIGF0IHRoZSBlbmQgb2YgdGhlIGRlY2VsZXJhdGlvbiBvZiBhIG1vbWVudHVtIHNjcm9sbCwgc28gdGhlcmUncyBubyBuZWVkXG4gICAgICAgICAgICAgICAgLy8gdG8gd2FpdCBmb3IgbW9yZSBldmVudHMuIFNuYXAgQVNBUCBvbiB0aGUgbmV4dCB0aWNrLlxuICAgICAgICAgICAgICAgIC8vIEFsc28sIGJlY2F1c2UgdGhlcmUncyBzb21lIHJlbWFpbmluZyBtb21lbnR1bSB3ZSdsbCBiaWFzIHRoZSBzbmFwIGluIHRoZVxuICAgICAgICAgICAgICAgIC8vIGRpcmVjdGlvbiBvZiB0aGUgb25nb2luZyBzY3JvbGwgYmVjYXVzZSBpdCdzIGJldHRlciBVWCBmb3IgdGhlIHNjcm9sbCB0byBzbmFwXG4gICAgICAgICAgICAgICAgLy8gaW4gdGhlIHNhbWUgZGlyZWN0aW9uIGFzIHRoZSBzY3JvbGwgaW5zdGVhZCBvZiByZXZlcnNpbmcgdG8gc25hcC4gIFRoZXJlZm9yZSxcbiAgICAgICAgICAgICAgICAvLyBpZiBpdCdzIGFscmVhZHkgc2Nyb2xsZWQgbW9yZSB0aGFuIDIwJSBpbiB0aGUgY3VycmVudCBkaXJlY3Rpb24sIGtlZXAgZ29pbmcuXG4gICAgICAgICAgICAgICAgY29uc3Qgc25hcFRvVGhyZXNob2xkID0gZGVsdGEgPiAwID8gMC44IDogMC4yO1xuICAgICAgICAgICAgICAgIGxhc3RFdmVudEJlZm9yZVNuYXAgPSBuZXdFdmVudDtcbiAgICAgICAgICAgICAgICByZWNlbnRXaGVlbEV2ZW50cy5zcGxpY2UoMCk7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHN3aXBlci5zbGlkZVRvQ2xvc2VzdChzd2lwZXIucGFyYW1zLnNwZWVkLCB0cnVlLCB1bmRlZmluZWQsIHNuYXBUb1RocmVzaG9sZCk7XG4gICAgICAgICAgICAgICAgfSwgMCk7IC8vIG5vIGRlbGF5OyBtb3ZlIG9uIG5leHQgdGlja1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKCF0aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgd2UgZ2V0IGhlcmUsIHRoZW4gd2UgaGF2ZW4ndCBkZXRlY3RlZCB0aGUgZW5kIG9mIGEgbW9tZW50dW0gc2Nyb2xsLCBzb1xuICAgICAgICAgICAgICAgIC8vIHdlJ2xsIGNvbnNpZGVyIGEgc2Nyb2xsIFwiY29tcGxldGVcIiB3aGVuIHRoZXJlIGhhdmVuJ3QgYmVlbiBhbnkgd2hlZWwgZXZlbnRzXG4gICAgICAgICAgICAgICAgLy8gZm9yIDUwMG1zLlxuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBzbmFwVG9UaHJlc2hvbGQgPSAwLjU7XG4gICAgICAgICAgICAgICAgICBsYXN0RXZlbnRCZWZvcmVTbmFwID0gbmV3RXZlbnQ7XG4gICAgICAgICAgICAgICAgICByZWNlbnRXaGVlbEV2ZW50cy5zcGxpY2UoMCk7XG4gICAgICAgICAgICAgICAgICBzd2lwZXIuc2xpZGVUb0Nsb3Nlc3Qoc3dpcGVyLnBhcmFtcy5zcGVlZCwgdHJ1ZSwgdW5kZWZpbmVkLCBzbmFwVG9UaHJlc2hvbGQpO1xuICAgICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gLy8gRW1pdCBldmVudFxuXG5cbiAgICAgICAgICAgIGlmICghaWdub3JlV2hlZWxFdmVudHMpIGVtaXQoJ3Njcm9sbCcsIGUpOyAvLyBTdG9wIGF1dG9wbGF5XG5cbiAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmF1dG9wbGF5ICYmIHN3aXBlci5wYXJhbXMuYXV0b3BsYXlEaXNhYmxlT25JbnRlcmFjdGlvbikgc3dpcGVyLmF1dG9wbGF5LnN0b3AoKTsgLy8gUmV0dXJuIHBhZ2Ugc2Nyb2xsIG9uIGVkZ2UgcG9zaXRpb25zXG5cbiAgICAgICAgICAgIGlmIChwb3NpdGlvbiA9PT0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpIHx8IHBvc2l0aW9uID09PSBzd2lwZXIubWF4VHJhbnNsYXRlKCkpIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7ZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZXZlbnRzKG1ldGhvZCkge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gc3dpcGVyLiRlbDtcblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsLmV2ZW50c1RhcmdldCAhPT0gJ2NvbnRhaW5lcicpIHtcbiAgICAgICAgICB0YXJnZXQgPSAkKHN3aXBlci5wYXJhbXMubW91c2V3aGVlbC5ldmVudHNUYXJnZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFyZ2V0W21ldGhvZF0oJ21vdXNlZW50ZXInLCBoYW5kbGVNb3VzZUVudGVyKTtcbiAgICAgICAgdGFyZ2V0W21ldGhvZF0oJ21vdXNlbGVhdmUnLCBoYW5kbGVNb3VzZUxlYXZlKTtcbiAgICAgICAgdGFyZ2V0W21ldGhvZF0oJ3doZWVsJywgaGFuZGxlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZW5hYmxlKCkge1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICAgICAgc3dpcGVyLndyYXBwZXJFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIGhhbmRsZSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3dpcGVyLm1vdXNld2hlZWwuZW5hYmxlZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBldmVudHMoJ29uJyk7XG4gICAgICAgIHN3aXBlci5tb3VzZXdoZWVsLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgICAgICAgIHN3aXBlci53cmFwcGVyRWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3dpcGVyLm1vdXNld2hlZWwuZW5hYmxlZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBldmVudHMoJ29mZicpO1xuICAgICAgICBzd2lwZXIubW91c2V3aGVlbC5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBvbignaW5pdCcsICgpID0+IHtcbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLm1vdXNld2hlZWwuZW5hYmxlZCAmJiBzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgICBkaXNhYmxlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsLmVuYWJsZWQpIGVuYWJsZSgpO1xuICAgICAgfSk7XG4gICAgICBvbignZGVzdHJveScsICgpID0+IHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgICAgICAgIGVuYWJsZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN3aXBlci5tb3VzZXdoZWVsLmVuYWJsZWQpIGRpc2FibGUoKTtcbiAgICAgIH0pO1xuICAgICAgT2JqZWN0LmFzc2lnbihzd2lwZXIubW91c2V3aGVlbCwge1xuICAgICAgICBlbmFibGUsXG4gICAgICAgIGRpc2FibGVcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRJZk5vdERlZmluZWQoc3dpcGVyLCBvcmlnaW5hbFBhcmFtcywgcGFyYW1zLCBjaGVja1Byb3BzKSB7XG4gICAgICBjb25zdCBkb2N1bWVudCA9IGdldERvY3VtZW50KCk7XG5cbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmNyZWF0ZUVsZW1lbnRzKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGNoZWNrUHJvcHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBpZiAoIXBhcmFtc1trZXldICYmIHBhcmFtcy5hdXRvID09PSB0cnVlKSB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IHN3aXBlci4kZWwuY2hpbGRyZW4oYC4ke2NoZWNrUHJvcHNba2V5XX1gKVswXTtcblxuICAgICAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBjaGVja1Byb3BzW2tleV07XG4gICAgICAgICAgICAgIHN3aXBlci4kZWwuYXBwZW5kKGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwYXJhbXNba2V5XSA9IGVsZW1lbnQ7XG4gICAgICAgICAgICBvcmlnaW5hbFBhcmFtc1trZXldID0gZWxlbWVudDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIE5hdmlnYXRpb24oX3JlZikge1xuICAgICAgbGV0IHtcbiAgICAgICAgc3dpcGVyLFxuICAgICAgICBleHRlbmRQYXJhbXMsXG4gICAgICAgIG9uLFxuICAgICAgICBlbWl0XG4gICAgICB9ID0gX3JlZjtcbiAgICAgIGV4dGVuZFBhcmFtcyh7XG4gICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICBuZXh0RWw6IG51bGwsXG4gICAgICAgICAgcHJldkVsOiBudWxsLFxuICAgICAgICAgIGhpZGVPbkNsaWNrOiBmYWxzZSxcbiAgICAgICAgICBkaXNhYmxlZENsYXNzOiAnc3dpcGVyLWJ1dHRvbi1kaXNhYmxlZCcsXG4gICAgICAgICAgaGlkZGVuQ2xhc3M6ICdzd2lwZXItYnV0dG9uLWhpZGRlbicsXG4gICAgICAgICAgbG9ja0NsYXNzOiAnc3dpcGVyLWJ1dHRvbi1sb2NrJyxcbiAgICAgICAgICBuYXZpZ2F0aW9uRGlzYWJsZWRDbGFzczogJ3N3aXBlci1uYXZpZ2F0aW9uLWRpc2FibGVkJ1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHN3aXBlci5uYXZpZ2F0aW9uID0ge1xuICAgICAgICBuZXh0RWw6IG51bGwsXG4gICAgICAgICRuZXh0RWw6IG51bGwsXG4gICAgICAgIHByZXZFbDogbnVsbCxcbiAgICAgICAgJHByZXZFbDogbnVsbFxuICAgICAgfTtcblxuICAgICAgZnVuY3Rpb24gZ2V0RWwoZWwpIHtcbiAgICAgICAgbGV0ICRlbDtcblxuICAgICAgICBpZiAoZWwpIHtcbiAgICAgICAgICAkZWwgPSAkKGVsKTtcblxuICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLnVuaXF1ZU5hdkVsZW1lbnRzICYmIHR5cGVvZiBlbCA9PT0gJ3N0cmluZycgJiYgJGVsLmxlbmd0aCA+IDEgJiYgc3dpcGVyLiRlbC5maW5kKGVsKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICRlbCA9IHN3aXBlci4kZWwuZmluZChlbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICRlbDtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdG9nZ2xlRWwoJGVsLCBkaXNhYmxlZCkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLm5hdmlnYXRpb247XG5cbiAgICAgICAgaWYgKCRlbCAmJiAkZWwubGVuZ3RoID4gMCkge1xuICAgICAgICAgICRlbFtkaXNhYmxlZCA/ICdhZGRDbGFzcycgOiAncmVtb3ZlQ2xhc3MnXShwYXJhbXMuZGlzYWJsZWRDbGFzcyk7XG4gICAgICAgICAgaWYgKCRlbFswXSAmJiAkZWxbMF0udGFnTmFtZSA9PT0gJ0JVVFRPTicpICRlbFswXS5kaXNhYmxlZCA9IGRpc2FibGVkO1xuXG4gICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdyAmJiBzd2lwZXIuZW5hYmxlZCkge1xuICAgICAgICAgICAgJGVsW3N3aXBlci5pc0xvY2tlZCA/ICdhZGRDbGFzcycgOiAncmVtb3ZlQ2xhc3MnXShwYXJhbXMubG9ja0NsYXNzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICAvLyBVcGRhdGUgTmF2aWdhdGlvbiBCdXR0b25zXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHJldHVybjtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICRuZXh0RWwsXG4gICAgICAgICAgJHByZXZFbFxuICAgICAgICB9ID0gc3dpcGVyLm5hdmlnYXRpb247XG4gICAgICAgIHRvZ2dsZUVsKCRwcmV2RWwsIHN3aXBlci5pc0JlZ2lubmluZyAmJiAhc3dpcGVyLnBhcmFtcy5yZXdpbmQpO1xuICAgICAgICB0b2dnbGVFbCgkbmV4dEVsLCBzd2lwZXIuaXNFbmQgJiYgIXN3aXBlci5wYXJhbXMucmV3aW5kKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25QcmV2Q2xpY2soZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmIChzd2lwZXIuaXNCZWdpbm5pbmcgJiYgIXN3aXBlci5wYXJhbXMubG9vcCAmJiAhc3dpcGVyLnBhcmFtcy5yZXdpbmQpIHJldHVybjtcbiAgICAgICAgc3dpcGVyLnNsaWRlUHJldigpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvbk5leHRDbGljayhlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKHN3aXBlci5pc0VuZCAmJiAhc3dpcGVyLnBhcmFtcy5sb29wICYmICFzd2lwZXIucGFyYW1zLnJld2luZCkgcmV0dXJuO1xuICAgICAgICBzd2lwZXIuc2xpZGVOZXh0KCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbjtcbiAgICAgICAgc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uID0gY3JlYXRlRWxlbWVudElmTm90RGVmaW5lZChzd2lwZXIsIHN3aXBlci5vcmlnaW5hbFBhcmFtcy5uYXZpZ2F0aW9uLCBzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24sIHtcbiAgICAgICAgICBuZXh0RWw6ICdzd2lwZXItYnV0dG9uLW5leHQnLFxuICAgICAgICAgIHByZXZFbDogJ3N3aXBlci1idXR0b24tcHJldidcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghKHBhcmFtcy5uZXh0RWwgfHwgcGFyYW1zLnByZXZFbCkpIHJldHVybjtcbiAgICAgICAgY29uc3QgJG5leHRFbCA9IGdldEVsKHBhcmFtcy5uZXh0RWwpO1xuICAgICAgICBjb25zdCAkcHJldkVsID0gZ2V0RWwocGFyYW1zLnByZXZFbCk7XG5cbiAgICAgICAgaWYgKCRuZXh0RWwgJiYgJG5leHRFbC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJG5leHRFbC5vbignY2xpY2snLCBvbk5leHRDbGljayk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJHByZXZFbCAmJiAkcHJldkVsLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkcHJldkVsLm9uKCdjbGljaycsIG9uUHJldkNsaWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLm5hdmlnYXRpb24sIHtcbiAgICAgICAgICAkbmV4dEVsLFxuICAgICAgICAgIG5leHRFbDogJG5leHRFbCAmJiAkbmV4dEVsWzBdLFxuICAgICAgICAgICRwcmV2RWwsXG4gICAgICAgICAgcHJldkVsOiAkcHJldkVsICYmICRwcmV2RWxbMF1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFzd2lwZXIuZW5hYmxlZCkge1xuICAgICAgICAgIGlmICgkbmV4dEVsKSAkbmV4dEVsLmFkZENsYXNzKHBhcmFtcy5sb2NrQ2xhc3MpO1xuICAgICAgICAgIGlmICgkcHJldkVsKSAkcHJldkVsLmFkZENsYXNzKHBhcmFtcy5sb2NrQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAkbmV4dEVsLFxuICAgICAgICAgICRwcmV2RWxcbiAgICAgICAgfSA9IHN3aXBlci5uYXZpZ2F0aW9uO1xuXG4gICAgICAgIGlmICgkbmV4dEVsICYmICRuZXh0RWwubGVuZ3RoKSB7XG4gICAgICAgICAgJG5leHRFbC5vZmYoJ2NsaWNrJywgb25OZXh0Q2xpY2spO1xuICAgICAgICAgICRuZXh0RWwucmVtb3ZlQ2xhc3Moc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmRpc2FibGVkQ2xhc3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRwcmV2RWwgJiYgJHByZXZFbC5sZW5ndGgpIHtcbiAgICAgICAgICAkcHJldkVsLm9mZignY2xpY2snLCBvblByZXZDbGljayk7XG4gICAgICAgICAgJHByZXZFbC5yZW1vdmVDbGFzcyhzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24uZGlzYWJsZWRDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgb24oJ2luaXQnLCAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24uZW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICBkaXNhYmxlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5pdCgpO1xuICAgICAgICAgIHVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9uKCd0b0VkZ2UgZnJvbUVkZ2UgbG9jayB1bmxvY2snLCAoKSA9PiB7XG4gICAgICAgIHVwZGF0ZSgpO1xuICAgICAgfSk7XG4gICAgICBvbignZGVzdHJveScsICgpID0+IHtcbiAgICAgICAgZGVzdHJveSgpO1xuICAgICAgfSk7XG4gICAgICBvbignZW5hYmxlIGRpc2FibGUnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAkbmV4dEVsLFxuICAgICAgICAgICRwcmV2RWxcbiAgICAgICAgfSA9IHN3aXBlci5uYXZpZ2F0aW9uO1xuXG4gICAgICAgIGlmICgkbmV4dEVsKSB7XG4gICAgICAgICAgJG5leHRFbFtzd2lwZXIuZW5hYmxlZCA/ICdyZW1vdmVDbGFzcycgOiAnYWRkQ2xhc3MnXShzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24ubG9ja0NsYXNzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkcHJldkVsKSB7XG4gICAgICAgICAgJHByZXZFbFtzd2lwZXIuZW5hYmxlZCA/ICdyZW1vdmVDbGFzcycgOiAnYWRkQ2xhc3MnXShzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24ubG9ja0NsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvbignY2xpY2snLCAoX3MsIGUpID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICRuZXh0RWwsXG4gICAgICAgICAgJHByZXZFbFxuICAgICAgICB9ID0gc3dpcGVyLm5hdmlnYXRpb247XG4gICAgICAgIGNvbnN0IHRhcmdldEVsID0gZS50YXJnZXQ7XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5oaWRlT25DbGljayAmJiAhJCh0YXJnZXRFbCkuaXMoJHByZXZFbCkgJiYgISQodGFyZ2V0RWwpLmlzKCRuZXh0RWwpKSB7XG4gICAgICAgICAgaWYgKHN3aXBlci5wYWdpbmF0aW9uICYmIHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbiAmJiBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uY2xpY2thYmxlICYmIChzd2lwZXIucGFnaW5hdGlvbi5lbCA9PT0gdGFyZ2V0RWwgfHwgc3dpcGVyLnBhZ2luYXRpb24uZWwuY29udGFpbnModGFyZ2V0RWwpKSkgcmV0dXJuO1xuICAgICAgICAgIGxldCBpc0hpZGRlbjtcblxuICAgICAgICAgIGlmICgkbmV4dEVsKSB7XG4gICAgICAgICAgICBpc0hpZGRlbiA9ICRuZXh0RWwuaGFzQ2xhc3Moc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmhpZGRlbkNsYXNzKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCRwcmV2RWwpIHtcbiAgICAgICAgICAgIGlzSGlkZGVuID0gJHByZXZFbC5oYXNDbGFzcyhzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24uaGlkZGVuQ2xhc3MpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChpc0hpZGRlbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgZW1pdCgnbmF2aWdhdGlvblNob3cnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW1pdCgnbmF2aWdhdGlvbkhpZGUnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoJG5leHRFbCkge1xuICAgICAgICAgICAgJG5leHRFbC50b2dnbGVDbGFzcyhzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24uaGlkZGVuQ2xhc3MpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICgkcHJldkVsKSB7XG4gICAgICAgICAgICAkcHJldkVsLnRvZ2dsZUNsYXNzKHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5oaWRkZW5DbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZW5hYmxlID0gKCkgPT4ge1xuICAgICAgICBzd2lwZXIuJGVsLnJlbW92ZUNsYXNzKHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5uYXZpZ2F0aW9uRGlzYWJsZWRDbGFzcyk7XG4gICAgICAgIGluaXQoKTtcbiAgICAgICAgdXBkYXRlKCk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBkaXNhYmxlID0gKCkgPT4ge1xuICAgICAgICBzd2lwZXIuJGVsLmFkZENsYXNzKHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5uYXZpZ2F0aW9uRGlzYWJsZWRDbGFzcyk7XG4gICAgICAgIGRlc3Ryb3koKTtcbiAgICAgIH07XG5cbiAgICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLm5hdmlnYXRpb24sIHtcbiAgICAgICAgZW5hYmxlLFxuICAgICAgICBkaXNhYmxlLFxuICAgICAgICB1cGRhdGUsXG4gICAgICAgIGluaXQsXG4gICAgICAgIGRlc3Ryb3lcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsYXNzZXNUb1NlbGVjdG9yKGNsYXNzZXMpIHtcbiAgICAgIGlmIChjbGFzc2VzID09PSB2b2lkIDApIHtcbiAgICAgICAgY2xhc3NlcyA9ICcnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYC4ke2NsYXNzZXMudHJpbSgpLnJlcGxhY2UoLyhbXFwuOiFcXC9dKS9nLCAnXFxcXCQxJykgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAucmVwbGFjZSgvIC9nLCAnLicpfWA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gUGFnaW5hdGlvbihfcmVmKSB7XG4gICAgICBsZXQge1xuICAgICAgICBzd2lwZXIsXG4gICAgICAgIGV4dGVuZFBhcmFtcyxcbiAgICAgICAgb24sXG4gICAgICAgIGVtaXRcbiAgICAgIH0gPSBfcmVmO1xuICAgICAgY29uc3QgcGZ4ID0gJ3N3aXBlci1wYWdpbmF0aW9uJztcbiAgICAgIGV4dGVuZFBhcmFtcyh7XG4gICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICBlbDogbnVsbCxcbiAgICAgICAgICBidWxsZXRFbGVtZW50OiAnc3BhbicsXG4gICAgICAgICAgY2xpY2thYmxlOiBmYWxzZSxcbiAgICAgICAgICBoaWRlT25DbGljazogZmFsc2UsXG4gICAgICAgICAgcmVuZGVyQnVsbGV0OiBudWxsLFxuICAgICAgICAgIHJlbmRlclByb2dyZXNzYmFyOiBudWxsLFxuICAgICAgICAgIHJlbmRlckZyYWN0aW9uOiBudWxsLFxuICAgICAgICAgIHJlbmRlckN1c3RvbTogbnVsbCxcbiAgICAgICAgICBwcm9ncmVzc2Jhck9wcG9zaXRlOiBmYWxzZSxcbiAgICAgICAgICB0eXBlOiAnYnVsbGV0cycsXG4gICAgICAgICAgLy8gJ2J1bGxldHMnIG9yICdwcm9ncmVzc2Jhcicgb3IgJ2ZyYWN0aW9uJyBvciAnY3VzdG9tJ1xuICAgICAgICAgIGR5bmFtaWNCdWxsZXRzOiBmYWxzZSxcbiAgICAgICAgICBkeW5hbWljTWFpbkJ1bGxldHM6IDEsXG4gICAgICAgICAgZm9ybWF0RnJhY3Rpb25DdXJyZW50OiBudW1iZXIgPT4gbnVtYmVyLFxuICAgICAgICAgIGZvcm1hdEZyYWN0aW9uVG90YWw6IG51bWJlciA9PiBudW1iZXIsXG4gICAgICAgICAgYnVsbGV0Q2xhc3M6IGAke3BmeH0tYnVsbGV0YCxcbiAgICAgICAgICBidWxsZXRBY3RpdmVDbGFzczogYCR7cGZ4fS1idWxsZXQtYWN0aXZlYCxcbiAgICAgICAgICBtb2RpZmllckNsYXNzOiBgJHtwZnh9LWAsXG4gICAgICAgICAgY3VycmVudENsYXNzOiBgJHtwZnh9LWN1cnJlbnRgLFxuICAgICAgICAgIHRvdGFsQ2xhc3M6IGAke3BmeH0tdG90YWxgLFxuICAgICAgICAgIGhpZGRlbkNsYXNzOiBgJHtwZnh9LWhpZGRlbmAsXG4gICAgICAgICAgcHJvZ3Jlc3NiYXJGaWxsQ2xhc3M6IGAke3BmeH0tcHJvZ3Jlc3NiYXItZmlsbGAsXG4gICAgICAgICAgcHJvZ3Jlc3NiYXJPcHBvc2l0ZUNsYXNzOiBgJHtwZnh9LXByb2dyZXNzYmFyLW9wcG9zaXRlYCxcbiAgICAgICAgICBjbGlja2FibGVDbGFzczogYCR7cGZ4fS1jbGlja2FibGVgLFxuICAgICAgICAgIGxvY2tDbGFzczogYCR7cGZ4fS1sb2NrYCxcbiAgICAgICAgICBob3Jpem9udGFsQ2xhc3M6IGAke3BmeH0taG9yaXpvbnRhbGAsXG4gICAgICAgICAgdmVydGljYWxDbGFzczogYCR7cGZ4fS12ZXJ0aWNhbGAsXG4gICAgICAgICAgcGFnaW5hdGlvbkRpc2FibGVkQ2xhc3M6IGAke3BmeH0tZGlzYWJsZWRgXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgc3dpcGVyLnBhZ2luYXRpb24gPSB7XG4gICAgICAgIGVsOiBudWxsLFxuICAgICAgICAkZWw6IG51bGwsXG4gICAgICAgIGJ1bGxldHM6IFtdXG4gICAgICB9O1xuICAgICAgbGV0IGJ1bGxldFNpemU7XG4gICAgICBsZXQgZHluYW1pY0J1bGxldEluZGV4ID0gMDtcblxuICAgICAgZnVuY3Rpb24gaXNQYWdpbmF0aW9uRGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiAhc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmVsIHx8ICFzd2lwZXIucGFnaW5hdGlvbi5lbCB8fCAhc3dpcGVyLnBhZ2luYXRpb24uJGVsIHx8IHN3aXBlci5wYWdpbmF0aW9uLiRlbC5sZW5ndGggPT09IDA7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHNldFNpZGVCdWxsZXRzKCRidWxsZXRFbCwgcG9zaXRpb24pIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIGJ1bGxldEFjdGl2ZUNsYXNzXG4gICAgICAgIH0gPSBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb247XG4gICAgICAgICRidWxsZXRFbFtwb3NpdGlvbl0oKS5hZGRDbGFzcyhgJHtidWxsZXRBY3RpdmVDbGFzc30tJHtwb3NpdGlvbn1gKVtwb3NpdGlvbl0oKS5hZGRDbGFzcyhgJHtidWxsZXRBY3RpdmVDbGFzc30tJHtwb3NpdGlvbn0tJHtwb3NpdGlvbn1gKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICAvLyBSZW5kZXIgfHwgVXBkYXRlIFBhZ2luYXRpb24gYnVsbGV0cy9pdGVtc1xuICAgICAgICBjb25zdCBydGwgPSBzd2lwZXIucnRsO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb247XG4gICAgICAgIGlmIChpc1BhZ2luYXRpb25EaXNhYmxlZCgpKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHNsaWRlc0xlbmd0aCA9IHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkID8gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCA6IHN3aXBlci5zbGlkZXMubGVuZ3RoO1xuICAgICAgICBjb25zdCAkZWwgPSBzd2lwZXIucGFnaW5hdGlvbi4kZWw7IC8vIEN1cnJlbnQvVG90YWxcblxuICAgICAgICBsZXQgY3VycmVudDtcbiAgICAgICAgY29uc3QgdG90YWwgPSBzd2lwZXIucGFyYW1zLmxvb3AgPyBNYXRoLmNlaWwoKHNsaWRlc0xlbmd0aCAtIHN3aXBlci5sb29wZWRTbGlkZXMgKiAyKSAvIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXApIDogc3dpcGVyLnNuYXBHcmlkLmxlbmd0aDtcblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgY3VycmVudCA9IE1hdGguY2VpbCgoc3dpcGVyLmFjdGl2ZUluZGV4IC0gc3dpcGVyLmxvb3BlZFNsaWRlcykgLyBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcblxuICAgICAgICAgIGlmIChjdXJyZW50ID4gc2xpZGVzTGVuZ3RoIC0gMSAtIHN3aXBlci5sb29wZWRTbGlkZXMgKiAyKSB7XG4gICAgICAgICAgICBjdXJyZW50IC09IHNsaWRlc0xlbmd0aCAtIHN3aXBlci5sb29wZWRTbGlkZXMgKiAyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjdXJyZW50ID4gdG90YWwgLSAxKSBjdXJyZW50IC09IHRvdGFsO1xuICAgICAgICAgIGlmIChjdXJyZW50IDwgMCAmJiBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb25UeXBlICE9PSAnYnVsbGV0cycpIGN1cnJlbnQgPSB0b3RhbCArIGN1cnJlbnQ7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHN3aXBlci5zbmFwSW5kZXggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgY3VycmVudCA9IHN3aXBlci5zbmFwSW5kZXg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3VycmVudCA9IHN3aXBlci5hY3RpdmVJbmRleCB8fCAwO1xuICAgICAgICB9IC8vIFR5cGVzXG5cblxuICAgICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdidWxsZXRzJyAmJiBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzICYmIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IGJ1bGxldHMgPSBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzO1xuICAgICAgICAgIGxldCBmaXJzdEluZGV4O1xuICAgICAgICAgIGxldCBsYXN0SW5kZXg7XG4gICAgICAgICAgbGV0IG1pZEluZGV4O1xuXG4gICAgICAgICAgaWYgKHBhcmFtcy5keW5hbWljQnVsbGV0cykge1xuICAgICAgICAgICAgYnVsbGV0U2l6ZSA9IGJ1bGxldHMuZXEoMClbc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ291dGVyV2lkdGgnIDogJ291dGVySGVpZ2h0J10odHJ1ZSk7XG4gICAgICAgICAgICAkZWwuY3NzKHN3aXBlci5pc0hvcml6b250YWwoKSA/ICd3aWR0aCcgOiAnaGVpZ2h0JywgYCR7YnVsbGV0U2l6ZSAqIChwYXJhbXMuZHluYW1pY01haW5CdWxsZXRzICsgNCl9cHhgKTtcblxuICAgICAgICAgICAgaWYgKHBhcmFtcy5keW5hbWljTWFpbkJ1bGxldHMgPiAxICYmIHN3aXBlci5wcmV2aW91c0luZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgZHluYW1pY0J1bGxldEluZGV4ICs9IGN1cnJlbnQgLSAoc3dpcGVyLnByZXZpb3VzSW5kZXggLSBzd2lwZXIubG9vcGVkU2xpZGVzIHx8IDApO1xuXG4gICAgICAgICAgICAgIGlmIChkeW5hbWljQnVsbGV0SW5kZXggPiBwYXJhbXMuZHluYW1pY01haW5CdWxsZXRzIC0gMSkge1xuICAgICAgICAgICAgICAgIGR5bmFtaWNCdWxsZXRJbmRleCA9IHBhcmFtcy5keW5hbWljTWFpbkJ1bGxldHMgLSAxO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGR5bmFtaWNCdWxsZXRJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBkeW5hbWljQnVsbGV0SW5kZXggPSAwO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZpcnN0SW5kZXggPSBNYXRoLm1heChjdXJyZW50IC0gZHluYW1pY0J1bGxldEluZGV4LCAwKTtcbiAgICAgICAgICAgIGxhc3RJbmRleCA9IGZpcnN0SW5kZXggKyAoTWF0aC5taW4oYnVsbGV0cy5sZW5ndGgsIHBhcmFtcy5keW5hbWljTWFpbkJ1bGxldHMpIC0gMSk7XG4gICAgICAgICAgICBtaWRJbmRleCA9IChsYXN0SW5kZXggKyBmaXJzdEluZGV4KSAvIDI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnVsbGV0cy5yZW1vdmVDbGFzcyhbJycsICctbmV4dCcsICctbmV4dC1uZXh0JywgJy1wcmV2JywgJy1wcmV2LXByZXYnLCAnLW1haW4nXS5tYXAoc3VmZml4ID0+IGAke3BhcmFtcy5idWxsZXRBY3RpdmVDbGFzc30ke3N1ZmZpeH1gKS5qb2luKCcgJykpO1xuXG4gICAgICAgICAgaWYgKCRlbC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBidWxsZXRzLmVhY2goYnVsbGV0ID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgJGJ1bGxldCA9ICQoYnVsbGV0KTtcbiAgICAgICAgICAgICAgY29uc3QgYnVsbGV0SW5kZXggPSAkYnVsbGV0LmluZGV4KCk7XG5cbiAgICAgICAgICAgICAgaWYgKGJ1bGxldEluZGV4ID09PSBjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgJGJ1bGxldC5hZGRDbGFzcyhwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKHBhcmFtcy5keW5hbWljQnVsbGV0cykge1xuICAgICAgICAgICAgICAgIGlmIChidWxsZXRJbmRleCA+PSBmaXJzdEluZGV4ICYmIGJ1bGxldEluZGV4IDw9IGxhc3RJbmRleCkge1xuICAgICAgICAgICAgICAgICAgJGJ1bGxldC5hZGRDbGFzcyhgJHtwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3N9LW1haW5gKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoYnVsbGV0SW5kZXggPT09IGZpcnN0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgIHNldFNpZGVCdWxsZXRzKCRidWxsZXQsICdwcmV2Jyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGJ1bGxldEluZGV4ID09PSBsYXN0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgIHNldFNpZGVCdWxsZXRzKCRidWxsZXQsICduZXh0Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgJGJ1bGxldCA9IGJ1bGxldHMuZXEoY3VycmVudCk7XG4gICAgICAgICAgICBjb25zdCBidWxsZXRJbmRleCA9ICRidWxsZXQuaW5kZXgoKTtcbiAgICAgICAgICAgICRidWxsZXQuYWRkQ2xhc3MocGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKTtcblxuICAgICAgICAgICAgaWYgKHBhcmFtcy5keW5hbWljQnVsbGV0cykge1xuICAgICAgICAgICAgICBjb25zdCAkZmlyc3REaXNwbGF5ZWRCdWxsZXQgPSBidWxsZXRzLmVxKGZpcnN0SW5kZXgpO1xuICAgICAgICAgICAgICBjb25zdCAkbGFzdERpc3BsYXllZEJ1bGxldCA9IGJ1bGxldHMuZXEobGFzdEluZGV4KTtcblxuICAgICAgICAgICAgICBmb3IgKGxldCBpID0gZmlyc3RJbmRleDsgaSA8PSBsYXN0SW5kZXg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGJ1bGxldHMuZXEoaSkuYWRkQ2xhc3MoYCR7cGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzfS1tYWluYCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJ1bGxldEluZGV4ID49IGJ1bGxldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gcGFyYW1zLmR5bmFtaWNNYWluQnVsbGV0czsgaSA+PSAwOyBpIC09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0cy5lcShidWxsZXRzLmxlbmd0aCAtIGkpLmFkZENsYXNzKGAke3BhcmFtcy5idWxsZXRBY3RpdmVDbGFzc30tbWFpbmApO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBidWxsZXRzLmVxKGJ1bGxldHMubGVuZ3RoIC0gcGFyYW1zLmR5bmFtaWNNYWluQnVsbGV0cyAtIDEpLmFkZENsYXNzKGAke3BhcmFtcy5idWxsZXRBY3RpdmVDbGFzc30tcHJldmApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBzZXRTaWRlQnVsbGV0cygkZmlyc3REaXNwbGF5ZWRCdWxsZXQsICdwcmV2Jyk7XG4gICAgICAgICAgICAgICAgICBzZXRTaWRlQnVsbGV0cygkbGFzdERpc3BsYXllZEJ1bGxldCwgJ25leHQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2V0U2lkZUJ1bGxldHMoJGZpcnN0RGlzcGxheWVkQnVsbGV0LCAncHJldicpO1xuICAgICAgICAgICAgICAgIHNldFNpZGVCdWxsZXRzKCRsYXN0RGlzcGxheWVkQnVsbGV0LCAnbmV4dCcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhcmFtcy5keW5hbWljQnVsbGV0cykge1xuICAgICAgICAgICAgY29uc3QgZHluYW1pY0J1bGxldHNMZW5ndGggPSBNYXRoLm1pbihidWxsZXRzLmxlbmd0aCwgcGFyYW1zLmR5bmFtaWNNYWluQnVsbGV0cyArIDQpO1xuICAgICAgICAgICAgY29uc3QgYnVsbGV0c09mZnNldCA9IChidWxsZXRTaXplICogZHluYW1pY0J1bGxldHNMZW5ndGggLSBidWxsZXRTaXplKSAvIDIgLSBtaWRJbmRleCAqIGJ1bGxldFNpemU7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRQcm9wID0gcnRsID8gJ3JpZ2h0JyA6ICdsZWZ0JztcbiAgICAgICAgICAgIGJ1bGxldHMuY3NzKHN3aXBlci5pc0hvcml6b250YWwoKSA/IG9mZnNldFByb3AgOiAndG9wJywgYCR7YnVsbGV0c09mZnNldH1weGApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ2ZyYWN0aW9uJykge1xuICAgICAgICAgICRlbC5maW5kKGNsYXNzZXNUb1NlbGVjdG9yKHBhcmFtcy5jdXJyZW50Q2xhc3MpKS50ZXh0KHBhcmFtcy5mb3JtYXRGcmFjdGlvbkN1cnJlbnQoY3VycmVudCArIDEpKTtcbiAgICAgICAgICAkZWwuZmluZChjbGFzc2VzVG9TZWxlY3RvcihwYXJhbXMudG90YWxDbGFzcykpLnRleHQocGFyYW1zLmZvcm1hdEZyYWN0aW9uVG90YWwodG90YWwpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ3Byb2dyZXNzYmFyJykge1xuICAgICAgICAgIGxldCBwcm9ncmVzc2JhckRpcmVjdGlvbjtcblxuICAgICAgICAgIGlmIChwYXJhbXMucHJvZ3Jlc3NiYXJPcHBvc2l0ZSkge1xuICAgICAgICAgICAgcHJvZ3Jlc3NiYXJEaXJlY3Rpb24gPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAndmVydGljYWwnIDogJ2hvcml6b250YWwnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9ncmVzc2JhckRpcmVjdGlvbiA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/ICdob3Jpem9udGFsJyA6ICd2ZXJ0aWNhbCc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgc2NhbGUgPSAoY3VycmVudCArIDEpIC8gdG90YWw7XG4gICAgICAgICAgbGV0IHNjYWxlWCA9IDE7XG4gICAgICAgICAgbGV0IHNjYWxlWSA9IDE7XG5cbiAgICAgICAgICBpZiAocHJvZ3Jlc3NiYXJEaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgc2NhbGVYID0gc2NhbGU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNjYWxlWSA9IHNjYWxlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICRlbC5maW5kKGNsYXNzZXNUb1NlbGVjdG9yKHBhcmFtcy5wcm9ncmVzc2JhckZpbGxDbGFzcykpLnRyYW5zZm9ybShgdHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlWCgke3NjYWxlWH0pIHNjYWxlWSgke3NjYWxlWX0pYCkudHJhbnNpdGlvbihzd2lwZXIucGFyYW1zLnNwZWVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ2N1c3RvbScgJiYgcGFyYW1zLnJlbmRlckN1c3RvbSkge1xuICAgICAgICAgICRlbC5odG1sKHBhcmFtcy5yZW5kZXJDdXN0b20oc3dpcGVyLCBjdXJyZW50ICsgMSwgdG90YWwpKTtcbiAgICAgICAgICBlbWl0KCdwYWdpbmF0aW9uUmVuZGVyJywgJGVsWzBdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbWl0KCdwYWdpbmF0aW9uVXBkYXRlJywgJGVsWzBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cgJiYgc3dpcGVyLmVuYWJsZWQpIHtcbiAgICAgICAgICAkZWxbc3dpcGVyLmlzTG9ja2VkID8gJ2FkZENsYXNzJyA6ICdyZW1vdmVDbGFzcyddKHBhcmFtcy5sb2NrQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgLy8gUmVuZGVyIENvbnRhaW5lclxuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb247XG4gICAgICAgIGlmIChpc1BhZ2luYXRpb25EaXNhYmxlZCgpKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHNsaWRlc0xlbmd0aCA9IHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkID8gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCA6IHN3aXBlci5zbGlkZXMubGVuZ3RoO1xuICAgICAgICBjb25zdCAkZWwgPSBzd2lwZXIucGFnaW5hdGlvbi4kZWw7XG4gICAgICAgIGxldCBwYWdpbmF0aW9uSFRNTCA9ICcnO1xuXG4gICAgICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ2J1bGxldHMnKSB7XG4gICAgICAgICAgbGV0IG51bWJlck9mQnVsbGV0cyA9IHN3aXBlci5wYXJhbXMubG9vcCA/IE1hdGguY2VpbCgoc2xpZGVzTGVuZ3RoIC0gc3dpcGVyLmxvb3BlZFNsaWRlcyAqIDIpIC8gc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cCkgOiBzd2lwZXIuc25hcEdyaWQubGVuZ3RoO1xuXG4gICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZnJlZU1vZGUgJiYgc3dpcGVyLnBhcmFtcy5mcmVlTW9kZS5lbmFibGVkICYmICFzd2lwZXIucGFyYW1zLmxvb3AgJiYgbnVtYmVyT2ZCdWxsZXRzID4gc2xpZGVzTGVuZ3RoKSB7XG4gICAgICAgICAgICBudW1iZXJPZkJ1bGxldHMgPSBzbGlkZXNMZW5ndGg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZkJ1bGxldHM7IGkgKz0gMSkge1xuICAgICAgICAgICAgaWYgKHBhcmFtcy5yZW5kZXJCdWxsZXQpIHtcbiAgICAgICAgICAgICAgcGFnaW5hdGlvbkhUTUwgKz0gcGFyYW1zLnJlbmRlckJ1bGxldC5jYWxsKHN3aXBlciwgaSwgcGFyYW1zLmJ1bGxldENsYXNzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBhZ2luYXRpb25IVE1MICs9IGA8JHtwYXJhbXMuYnVsbGV0RWxlbWVudH0gY2xhc3M9XCIke3BhcmFtcy5idWxsZXRDbGFzc31cIj48LyR7cGFyYW1zLmJ1bGxldEVsZW1lbnR9PmA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJGVsLmh0bWwocGFnaW5hdGlvbkhUTUwpO1xuICAgICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMgPSAkZWwuZmluZChjbGFzc2VzVG9TZWxlY3RvcihwYXJhbXMuYnVsbGV0Q2xhc3MpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ2ZyYWN0aW9uJykge1xuICAgICAgICAgIGlmIChwYXJhbXMucmVuZGVyRnJhY3Rpb24pIHtcbiAgICAgICAgICAgIHBhZ2luYXRpb25IVE1MID0gcGFyYW1zLnJlbmRlckZyYWN0aW9uLmNhbGwoc3dpcGVyLCBwYXJhbXMuY3VycmVudENsYXNzLCBwYXJhbXMudG90YWxDbGFzcyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhZ2luYXRpb25IVE1MID0gYDxzcGFuIGNsYXNzPVwiJHtwYXJhbXMuY3VycmVudENsYXNzfVwiPjwvc3Bhbj5gICsgJyAvICcgKyBgPHNwYW4gY2xhc3M9XCIke3BhcmFtcy50b3RhbENsYXNzfVwiPjwvc3Bhbj5gO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICRlbC5odG1sKHBhZ2luYXRpb25IVE1MKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ3Byb2dyZXNzYmFyJykge1xuICAgICAgICAgIGlmIChwYXJhbXMucmVuZGVyUHJvZ3Jlc3NiYXIpIHtcbiAgICAgICAgICAgIHBhZ2luYXRpb25IVE1MID0gcGFyYW1zLnJlbmRlclByb2dyZXNzYmFyLmNhbGwoc3dpcGVyLCBwYXJhbXMucHJvZ3Jlc3NiYXJGaWxsQ2xhc3MpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYWdpbmF0aW9uSFRNTCA9IGA8c3BhbiBjbGFzcz1cIiR7cGFyYW1zLnByb2dyZXNzYmFyRmlsbENsYXNzfVwiPjwvc3Bhbj5gO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICRlbC5odG1sKHBhZ2luYXRpb25IVE1MKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJhbXMudHlwZSAhPT0gJ2N1c3RvbScpIHtcbiAgICAgICAgICBlbWl0KCdwYWdpbmF0aW9uUmVuZGVyJywgc3dpcGVyLnBhZ2luYXRpb24uJGVsWzBdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24gPSBjcmVhdGVFbGVtZW50SWZOb3REZWZpbmVkKHN3aXBlciwgc3dpcGVyLm9yaWdpbmFsUGFyYW1zLnBhZ2luYXRpb24sIHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbiwge1xuICAgICAgICAgIGVsOiAnc3dpcGVyLXBhZ2luYXRpb24nXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb247XG4gICAgICAgIGlmICghcGFyYW1zLmVsKSByZXR1cm47XG4gICAgICAgIGxldCAkZWwgPSAkKHBhcmFtcy5lbCk7XG4gICAgICAgIGlmICgkZWwubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMudW5pcXVlTmF2RWxlbWVudHMgJiYgdHlwZW9mIHBhcmFtcy5lbCA9PT0gJ3N0cmluZycgJiYgJGVsLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAkZWwgPSBzd2lwZXIuJGVsLmZpbmQocGFyYW1zLmVsKTsgLy8gY2hlY2sgaWYgaXQgYmVsb25ncyB0byBhbm90aGVyIG5lc3RlZCBTd2lwZXJcblxuICAgICAgICAgIGlmICgkZWwubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgJGVsID0gJGVsLmZpbHRlcihlbCA9PiB7XG4gICAgICAgICAgICAgIGlmICgkKGVsKS5wYXJlbnRzKCcuc3dpcGVyJylbMF0gIT09IHN3aXBlci5lbCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ2J1bGxldHMnICYmIHBhcmFtcy5jbGlja2FibGUpIHtcbiAgICAgICAgICAkZWwuYWRkQ2xhc3MocGFyYW1zLmNsaWNrYWJsZUNsYXNzKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRlbC5hZGRDbGFzcyhwYXJhbXMubW9kaWZpZXJDbGFzcyArIHBhcmFtcy50eXBlKTtcbiAgICAgICAgJGVsLmFkZENsYXNzKHN3aXBlci5pc0hvcml6b250YWwoKSA/IHBhcmFtcy5ob3Jpem9udGFsQ2xhc3MgOiBwYXJhbXMudmVydGljYWxDbGFzcyk7XG5cbiAgICAgICAgaWYgKHBhcmFtcy50eXBlID09PSAnYnVsbGV0cycgJiYgcGFyYW1zLmR5bmFtaWNCdWxsZXRzKSB7XG4gICAgICAgICAgJGVsLmFkZENsYXNzKGAke3BhcmFtcy5tb2RpZmllckNsYXNzfSR7cGFyYW1zLnR5cGV9LWR5bmFtaWNgKTtcbiAgICAgICAgICBkeW5hbWljQnVsbGV0SW5kZXggPSAwO1xuXG4gICAgICAgICAgaWYgKHBhcmFtcy5keW5hbWljTWFpbkJ1bGxldHMgPCAxKSB7XG4gICAgICAgICAgICBwYXJhbXMuZHluYW1pY01haW5CdWxsZXRzID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdwcm9ncmVzc2JhcicgJiYgcGFyYW1zLnByb2dyZXNzYmFyT3Bwb3NpdGUpIHtcbiAgICAgICAgICAkZWwuYWRkQ2xhc3MocGFyYW1zLnByb2dyZXNzYmFyT3Bwb3NpdGVDbGFzcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW1zLmNsaWNrYWJsZSkge1xuICAgICAgICAgICRlbC5vbignY2xpY2snLCBjbGFzc2VzVG9TZWxlY3RvcihwYXJhbXMuYnVsbGV0Q2xhc3MpLCBmdW5jdGlvbiBvbkNsaWNrKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxldCBpbmRleCA9ICQodGhpcykuaW5kZXgoKSAqIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXA7XG4gICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSBpbmRleCArPSBzd2lwZXIubG9vcGVkU2xpZGVzO1xuICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG8oaW5kZXgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbihzd2lwZXIucGFnaW5hdGlvbiwge1xuICAgICAgICAgICRlbCxcbiAgICAgICAgICBlbDogJGVsWzBdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghc3dpcGVyLmVuYWJsZWQpIHtcbiAgICAgICAgICAkZWwuYWRkQ2xhc3MocGFyYW1zLmxvY2tDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uO1xuICAgICAgICBpZiAoaXNQYWdpbmF0aW9uRGlzYWJsZWQoKSkgcmV0dXJuO1xuICAgICAgICBjb25zdCAkZWwgPSBzd2lwZXIucGFnaW5hdGlvbi4kZWw7XG4gICAgICAgICRlbC5yZW1vdmVDbGFzcyhwYXJhbXMuaGlkZGVuQ2xhc3MpO1xuICAgICAgICAkZWwucmVtb3ZlQ2xhc3MocGFyYW1zLm1vZGlmaWVyQ2xhc3MgKyBwYXJhbXMudHlwZSk7XG4gICAgICAgICRlbC5yZW1vdmVDbGFzcyhzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBwYXJhbXMuaG9yaXpvbnRhbENsYXNzIDogcGFyYW1zLnZlcnRpY2FsQ2xhc3MpO1xuICAgICAgICBpZiAoc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cyAmJiBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzLnJlbW92ZUNsYXNzKSBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzLnJlbW92ZUNsYXNzKHBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcyk7XG5cbiAgICAgICAgaWYgKHBhcmFtcy5jbGlja2FibGUpIHtcbiAgICAgICAgICAkZWwub2ZmKCdjbGljaycsIGNsYXNzZXNUb1NlbGVjdG9yKHBhcmFtcy5idWxsZXRDbGFzcykpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG9uKCdpbml0JywgKCkgPT4ge1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICAgZGlzYWJsZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGluaXQoKTtcbiAgICAgICAgICByZW5kZXIoKTtcbiAgICAgICAgICB1cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvbignYWN0aXZlSW5kZXhDaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICB1cGRhdGUoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc3dpcGVyLnNuYXBJbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB1cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvbignc25hcEluZGV4Q2hhbmdlJywgKCkgPT4ge1xuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgICAgICAgIHVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9uKCdzbGlkZXNMZW5ndGhDaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICByZW5kZXIoKTtcbiAgICAgICAgICB1cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvbignc25hcEdyaWRMZW5ndGhDaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgcmVuZGVyKCk7XG4gICAgICAgICAgdXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgIGRlc3Ryb3koKTtcbiAgICAgIH0pO1xuICAgICAgb24oJ2VuYWJsZSBkaXNhYmxlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgJGVsXG4gICAgICAgIH0gPSBzd2lwZXIucGFnaW5hdGlvbjtcblxuICAgICAgICBpZiAoJGVsKSB7XG4gICAgICAgICAgJGVsW3N3aXBlci5lbmFibGVkID8gJ3JlbW92ZUNsYXNzJyA6ICdhZGRDbGFzcyddKHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5sb2NrQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9uKCdsb2NrIHVubG9jaycsICgpID0+IHtcbiAgICAgICAgdXBkYXRlKCk7XG4gICAgICB9KTtcbiAgICAgIG9uKCdjbGljaycsIChfcywgZSkgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXRFbCA9IGUudGFyZ2V0O1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgJGVsXG4gICAgICAgIH0gPSBzd2lwZXIucGFnaW5hdGlvbjtcblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmVsICYmIHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5oaWRlT25DbGljayAmJiAkZWwubGVuZ3RoID4gMCAmJiAhJCh0YXJnZXRFbCkuaGFzQ2xhc3Moc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmJ1bGxldENsYXNzKSkge1xuICAgICAgICAgIGlmIChzd2lwZXIubmF2aWdhdGlvbiAmJiAoc3dpcGVyLm5hdmlnYXRpb24ubmV4dEVsICYmIHRhcmdldEVsID09PSBzd2lwZXIubmF2aWdhdGlvbi5uZXh0RWwgfHwgc3dpcGVyLm5hdmlnYXRpb24ucHJldkVsICYmIHRhcmdldEVsID09PSBzd2lwZXIubmF2aWdhdGlvbi5wcmV2RWwpKSByZXR1cm47XG4gICAgICAgICAgY29uc3QgaXNIaWRkZW4gPSAkZWwuaGFzQ2xhc3Moc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmhpZGRlbkNsYXNzKTtcblxuICAgICAgICAgIGlmIChpc0hpZGRlbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgZW1pdCgncGFnaW5hdGlvblNob3cnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW1pdCgncGFnaW5hdGlvbkhpZGUnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkZWwudG9nZ2xlQ2xhc3Moc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmhpZGRlbkNsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGVuYWJsZSA9ICgpID0+IHtcbiAgICAgICAgc3dpcGVyLiRlbC5yZW1vdmVDbGFzcyhzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24ucGFnaW5hdGlvbkRpc2FibGVkQ2xhc3MpO1xuXG4gICAgICAgIGlmIChzd2lwZXIucGFnaW5hdGlvbi4kZWwpIHtcbiAgICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi4kZWwucmVtb3ZlQ2xhc3Moc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLnBhZ2luYXRpb25EaXNhYmxlZENsYXNzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluaXQoKTtcbiAgICAgICAgcmVuZGVyKCk7XG4gICAgICAgIHVwZGF0ZSgpO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgZGlzYWJsZSA9ICgpID0+IHtcbiAgICAgICAgc3dpcGVyLiRlbC5hZGRDbGFzcyhzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24ucGFnaW5hdGlvbkRpc2FibGVkQ2xhc3MpO1xuXG4gICAgICAgIGlmIChzd2lwZXIucGFnaW5hdGlvbi4kZWwpIHtcbiAgICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi4kZWwuYWRkQ2xhc3Moc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLnBhZ2luYXRpb25EaXNhYmxlZENsYXNzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlc3Ryb3koKTtcbiAgICAgIH07XG5cbiAgICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLnBhZ2luYXRpb24sIHtcbiAgICAgICAgZW5hYmxlLFxuICAgICAgICBkaXNhYmxlLFxuICAgICAgICByZW5kZXIsXG4gICAgICAgIHVwZGF0ZSxcbiAgICAgICAgaW5pdCxcbiAgICAgICAgZGVzdHJveVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gU2Nyb2xsYmFyKF9yZWYpIHtcbiAgICAgIGxldCB7XG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgZXh0ZW5kUGFyYW1zLFxuICAgICAgICBvbixcbiAgICAgICAgZW1pdFxuICAgICAgfSA9IF9yZWY7XG4gICAgICBjb25zdCBkb2N1bWVudCA9IGdldERvY3VtZW50KCk7XG4gICAgICBsZXQgaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgICBsZXQgdGltZW91dCA9IG51bGw7XG4gICAgICBsZXQgZHJhZ1RpbWVvdXQgPSBudWxsO1xuICAgICAgbGV0IGRyYWdTdGFydFBvcztcbiAgICAgIGxldCBkcmFnU2l6ZTtcbiAgICAgIGxldCB0cmFja1NpemU7XG4gICAgICBsZXQgZGl2aWRlcjtcbiAgICAgIGV4dGVuZFBhcmFtcyh7XG4gICAgICAgIHNjcm9sbGJhcjoge1xuICAgICAgICAgIGVsOiBudWxsLFxuICAgICAgICAgIGRyYWdTaXplOiAnYXV0bycsXG4gICAgICAgICAgaGlkZTogZmFsc2UsXG4gICAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICAgICAgICBzbmFwT25SZWxlYXNlOiB0cnVlLFxuICAgICAgICAgIGxvY2tDbGFzczogJ3N3aXBlci1zY3JvbGxiYXItbG9jaycsXG4gICAgICAgICAgZHJhZ0NsYXNzOiAnc3dpcGVyLXNjcm9sbGJhci1kcmFnJyxcbiAgICAgICAgICBzY3JvbGxiYXJEaXNhYmxlZENsYXNzOiAnc3dpcGVyLXNjcm9sbGJhci1kaXNhYmxlZCcsXG4gICAgICAgICAgaG9yaXpvbnRhbENsYXNzOiBgc3dpcGVyLXNjcm9sbGJhci1ob3Jpem9udGFsYCxcbiAgICAgICAgICB2ZXJ0aWNhbENsYXNzOiBgc3dpcGVyLXNjcm9sbGJhci12ZXJ0aWNhbGBcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzd2lwZXIuc2Nyb2xsYmFyID0ge1xuICAgICAgICBlbDogbnVsbCxcbiAgICAgICAgZHJhZ0VsOiBudWxsLFxuICAgICAgICAkZWw6IG51bGwsXG4gICAgICAgICRkcmFnRWw6IG51bGxcbiAgICAgIH07XG5cbiAgICAgIGZ1bmN0aW9uIHNldFRyYW5zbGF0ZSgpIHtcbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5lbCB8fCAhc3dpcGVyLnNjcm9sbGJhci5lbCkgcmV0dXJuO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgc2Nyb2xsYmFyLFxuICAgICAgICAgIHJ0bFRyYW5zbGF0ZTogcnRsLFxuICAgICAgICAgIHByb2dyZXNzXG4gICAgICAgIH0gPSBzd2lwZXI7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAkZHJhZ0VsLFxuICAgICAgICAgICRlbFxuICAgICAgICB9ID0gc2Nyb2xsYmFyO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnNjcm9sbGJhcjtcbiAgICAgICAgbGV0IG5ld1NpemUgPSBkcmFnU2l6ZTtcbiAgICAgICAgbGV0IG5ld1BvcyA9ICh0cmFja1NpemUgLSBkcmFnU2l6ZSkgKiBwcm9ncmVzcztcblxuICAgICAgICBpZiAocnRsKSB7XG4gICAgICAgICAgbmV3UG9zID0gLW5ld1BvcztcblxuICAgICAgICAgIGlmIChuZXdQb3MgPiAwKSB7XG4gICAgICAgICAgICBuZXdTaXplID0gZHJhZ1NpemUgLSBuZXdQb3M7XG4gICAgICAgICAgICBuZXdQb3MgPSAwO1xuICAgICAgICAgIH0gZWxzZSBpZiAoLW5ld1BvcyArIGRyYWdTaXplID4gdHJhY2tTaXplKSB7XG4gICAgICAgICAgICBuZXdTaXplID0gdHJhY2tTaXplICsgbmV3UG9zO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChuZXdQb3MgPCAwKSB7XG4gICAgICAgICAgbmV3U2l6ZSA9IGRyYWdTaXplICsgbmV3UG9zO1xuICAgICAgICAgIG5ld1BvcyA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3UG9zICsgZHJhZ1NpemUgPiB0cmFja1NpemUpIHtcbiAgICAgICAgICBuZXdTaXplID0gdHJhY2tTaXplIC0gbmV3UG9zO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICRkcmFnRWwudHJhbnNmb3JtKGB0cmFuc2xhdGUzZCgke25ld1Bvc31weCwgMCwgMClgKTtcbiAgICAgICAgICAkZHJhZ0VsWzBdLnN0eWxlLndpZHRoID0gYCR7bmV3U2l6ZX1weGA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJGRyYWdFbC50cmFuc2Zvcm0oYHRyYW5zbGF0ZTNkKDBweCwgJHtuZXdQb3N9cHgsIDApYCk7XG4gICAgICAgICAgJGRyYWdFbFswXS5zdHlsZS5oZWlnaHQgPSBgJHtuZXdTaXplfXB4YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJhbXMuaGlkZSkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAkZWxbMF0uc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgJGVsWzBdLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgICAgICAgICAgJGVsLnRyYW5zaXRpb24oNDAwKTtcbiAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzZXRUcmFuc2l0aW9uKGR1cmF0aW9uKSB7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZWwgfHwgIXN3aXBlci5zY3JvbGxiYXIuZWwpIHJldHVybjtcbiAgICAgICAgc3dpcGVyLnNjcm9sbGJhci4kZHJhZ0VsLnRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB1cGRhdGVTaXplKCkge1xuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmVsIHx8ICFzd2lwZXIuc2Nyb2xsYmFyLmVsKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBzY3JvbGxiYXJcbiAgICAgICAgfSA9IHN3aXBlcjtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICRkcmFnRWwsXG4gICAgICAgICAgJGVsXG4gICAgICAgIH0gPSBzY3JvbGxiYXI7XG4gICAgICAgICRkcmFnRWxbMF0uc3R5bGUud2lkdGggPSAnJztcbiAgICAgICAgJGRyYWdFbFswXS5zdHlsZS5oZWlnaHQgPSAnJztcbiAgICAgICAgdHJhY2tTaXplID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJGVsWzBdLm9mZnNldFdpZHRoIDogJGVsWzBdLm9mZnNldEhlaWdodDtcbiAgICAgICAgZGl2aWRlciA9IHN3aXBlci5zaXplIC8gKHN3aXBlci52aXJ0dWFsU2l6ZSArIHN3aXBlci5wYXJhbXMuc2xpZGVzT2Zmc2V0QmVmb3JlIC0gKHN3aXBlci5wYXJhbXMuY2VudGVyZWRTbGlkZXMgPyBzd2lwZXIuc25hcEdyaWRbMF0gOiAwKSk7XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmRyYWdTaXplID09PSAnYXV0bycpIHtcbiAgICAgICAgICBkcmFnU2l6ZSA9IHRyYWNrU2l6ZSAqIGRpdmlkZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZHJhZ1NpemUgPSBwYXJzZUludChzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5kcmFnU2l6ZSwgMTApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICRkcmFnRWxbMF0uc3R5bGUud2lkdGggPSBgJHtkcmFnU2l6ZX1weGA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJGRyYWdFbFswXS5zdHlsZS5oZWlnaHQgPSBgJHtkcmFnU2l6ZX1weGA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGl2aWRlciA+PSAxKSB7XG4gICAgICAgICAgJGVsWzBdLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJGVsWzBdLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5oaWRlKSB7XG4gICAgICAgICAgJGVsWzBdLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdyAmJiBzd2lwZXIuZW5hYmxlZCkge1xuICAgICAgICAgIHNjcm9sbGJhci4kZWxbc3dpcGVyLmlzTG9ja2VkID8gJ2FkZENsYXNzJyA6ICdyZW1vdmVDbGFzcyddKHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmxvY2tDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ2V0UG9pbnRlclBvc2l0aW9uKGUpIHtcbiAgICAgICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgIHJldHVybiBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICd0b3VjaG1vdmUnID8gZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFggOiBlLmNsaWVudFg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZS50eXBlID09PSAndG91Y2hzdGFydCcgfHwgZS50eXBlID09PSAndG91Y2htb3ZlJyA/IGUudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRZIDogZS5jbGllbnRZO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzZXREcmFnUG9zaXRpb24oZSkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgc2Nyb2xsYmFyLFxuICAgICAgICAgIHJ0bFRyYW5zbGF0ZTogcnRsXG4gICAgICAgIH0gPSBzd2lwZXI7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAkZWxcbiAgICAgICAgfSA9IHNjcm9sbGJhcjtcbiAgICAgICAgbGV0IHBvc2l0aW9uUmF0aW87XG4gICAgICAgIHBvc2l0aW9uUmF0aW8gPSAoZ2V0UG9pbnRlclBvc2l0aW9uKGUpIC0gJGVsLm9mZnNldCgpW3N3aXBlci5pc0hvcml6b250YWwoKSA/ICdsZWZ0JyA6ICd0b3AnXSAtIChkcmFnU3RhcnRQb3MgIT09IG51bGwgPyBkcmFnU3RhcnRQb3MgOiBkcmFnU2l6ZSAvIDIpKSAvICh0cmFja1NpemUgLSBkcmFnU2l6ZSk7XG4gICAgICAgIHBvc2l0aW9uUmF0aW8gPSBNYXRoLm1heChNYXRoLm1pbihwb3NpdGlvblJhdGlvLCAxKSwgMCk7XG5cbiAgICAgICAgaWYgKHJ0bCkge1xuICAgICAgICAgIHBvc2l0aW9uUmF0aW8gPSAxIC0gcG9zaXRpb25SYXRpbztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpICsgKHN3aXBlci5tYXhUcmFuc2xhdGUoKSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKSkgKiBwb3NpdGlvblJhdGlvO1xuICAgICAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MocG9zaXRpb24pO1xuICAgICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKHBvc2l0aW9uKTtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uRHJhZ1N0YXJ0KGUpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXI7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBzY3JvbGxiYXIsXG4gICAgICAgICAgJHdyYXBwZXJFbFxuICAgICAgICB9ID0gc3dpcGVyO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgJGVsLFxuICAgICAgICAgICRkcmFnRWxcbiAgICAgICAgfSA9IHNjcm9sbGJhcjtcbiAgICAgICAgaXNUb3VjaGVkID0gdHJ1ZTtcbiAgICAgICAgZHJhZ1N0YXJ0UG9zID0gZS50YXJnZXQgPT09ICRkcmFnRWxbMF0gfHwgZS50YXJnZXQgPT09ICRkcmFnRWwgPyBnZXRQb2ludGVyUG9zaXRpb24oZSkgLSBlLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVtzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAnbGVmdCcgOiAndG9wJ10gOiBudWxsO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICR3cmFwcGVyRWwudHJhbnNpdGlvbigxMDApO1xuICAgICAgICAkZHJhZ0VsLnRyYW5zaXRpb24oMTAwKTtcbiAgICAgICAgc2V0RHJhZ1Bvc2l0aW9uKGUpO1xuICAgICAgICBjbGVhclRpbWVvdXQoZHJhZ1RpbWVvdXQpO1xuICAgICAgICAkZWwudHJhbnNpdGlvbigwKTtcblxuICAgICAgICBpZiAocGFyYW1zLmhpZGUpIHtcbiAgICAgICAgICAkZWwuY3NzKCdvcGFjaXR5JywgMSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwuY3NzKCdzY3JvbGwtc25hcC10eXBlJywgJ25vbmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVtaXQoJ3Njcm9sbGJhckRyYWdTdGFydCcsIGUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvbkRyYWdNb3ZlKGUpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHNjcm9sbGJhcixcbiAgICAgICAgICAkd3JhcHBlckVsXG4gICAgICAgIH0gPSBzd2lwZXI7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAkZWwsXG4gICAgICAgICAgJGRyYWdFbFxuICAgICAgICB9ID0gc2Nyb2xsYmFyO1xuICAgICAgICBpZiAoIWlzVG91Y2hlZCkgcmV0dXJuO1xuICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpO2Vsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICBzZXREcmFnUG9zaXRpb24oZSk7XG4gICAgICAgICR3cmFwcGVyRWwudHJhbnNpdGlvbigwKTtcbiAgICAgICAgJGVsLnRyYW5zaXRpb24oMCk7XG4gICAgICAgICRkcmFnRWwudHJhbnNpdGlvbigwKTtcbiAgICAgICAgZW1pdCgnc2Nyb2xsYmFyRHJhZ01vdmUnLCBlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25EcmFnRW5kKGUpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXI7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBzY3JvbGxiYXIsXG4gICAgICAgICAgJHdyYXBwZXJFbFxuICAgICAgICB9ID0gc3dpcGVyO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgJGVsXG4gICAgICAgIH0gPSBzY3JvbGxiYXI7XG4gICAgICAgIGlmICghaXNUb3VjaGVkKSByZXR1cm47XG4gICAgICAgIGlzVG91Y2hlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5jc3MoJ3Njcm9sbC1zbmFwLXR5cGUnLCAnJyk7XG4gICAgICAgICAgJHdyYXBwZXJFbC50cmFuc2l0aW9uKCcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJhbXMuaGlkZSkge1xuICAgICAgICAgIGNsZWFyVGltZW91dChkcmFnVGltZW91dCk7XG4gICAgICAgICAgZHJhZ1RpbWVvdXQgPSBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICAkZWwuY3NzKCdvcGFjaXR5JywgMCk7XG4gICAgICAgICAgICAkZWwudHJhbnNpdGlvbig0MDApO1xuICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgZW1pdCgnc2Nyb2xsYmFyRHJhZ0VuZCcsIGUpO1xuXG4gICAgICAgIGlmIChwYXJhbXMuc25hcE9uUmVsZWFzZSkge1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvQ2xvc2VzdCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGV2ZW50cyhtZXRob2QpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHNjcm9sbGJhcixcbiAgICAgICAgICB0b3VjaEV2ZW50c1RvdWNoLFxuICAgICAgICAgIHRvdWNoRXZlbnRzRGVza3RvcCxcbiAgICAgICAgICBwYXJhbXMsXG4gICAgICAgICAgc3VwcG9ydFxuICAgICAgICB9ID0gc3dpcGVyO1xuICAgICAgICBjb25zdCAkZWwgPSBzY3JvbGxiYXIuJGVsO1xuICAgICAgICBpZiAoISRlbCkgcmV0dXJuO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSAkZWxbMF07XG4gICAgICAgIGNvbnN0IGFjdGl2ZUxpc3RlbmVyID0gc3VwcG9ydC5wYXNzaXZlTGlzdGVuZXIgJiYgcGFyYW1zLnBhc3NpdmVMaXN0ZW5lcnMgPyB7XG4gICAgICAgICAgcGFzc2l2ZTogZmFsc2UsXG4gICAgICAgICAgY2FwdHVyZTogZmFsc2VcbiAgICAgICAgfSA6IGZhbHNlO1xuICAgICAgICBjb25zdCBwYXNzaXZlTGlzdGVuZXIgPSBzdXBwb3J0LnBhc3NpdmVMaXN0ZW5lciAmJiBwYXJhbXMucGFzc2l2ZUxpc3RlbmVycyA/IHtcbiAgICAgICAgICBwYXNzaXZlOiB0cnVlLFxuICAgICAgICAgIGNhcHR1cmU6IGZhbHNlXG4gICAgICAgIH0gOiBmYWxzZTtcbiAgICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcbiAgICAgICAgY29uc3QgZXZlbnRNZXRob2QgPSBtZXRob2QgPT09ICdvbicgPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAncmVtb3ZlRXZlbnRMaXN0ZW5lcic7XG5cbiAgICAgICAgaWYgKCFzdXBwb3J0LnRvdWNoKSB7XG4gICAgICAgICAgdGFyZ2V0W2V2ZW50TWV0aG9kXSh0b3VjaEV2ZW50c0Rlc2t0b3Auc3RhcnQsIG9uRHJhZ1N0YXJ0LCBhY3RpdmVMaXN0ZW5lcik7XG4gICAgICAgICAgZG9jdW1lbnRbZXZlbnRNZXRob2RdKHRvdWNoRXZlbnRzRGVza3RvcC5tb3ZlLCBvbkRyYWdNb3ZlLCBhY3RpdmVMaXN0ZW5lcik7XG4gICAgICAgICAgZG9jdW1lbnRbZXZlbnRNZXRob2RdKHRvdWNoRXZlbnRzRGVza3RvcC5lbmQsIG9uRHJhZ0VuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXJnZXRbZXZlbnRNZXRob2RdKHRvdWNoRXZlbnRzVG91Y2guc3RhcnQsIG9uRHJhZ1N0YXJ0LCBhY3RpdmVMaXN0ZW5lcik7XG4gICAgICAgICAgdGFyZ2V0W2V2ZW50TWV0aG9kXSh0b3VjaEV2ZW50c1RvdWNoLm1vdmUsIG9uRHJhZ01vdmUsIGFjdGl2ZUxpc3RlbmVyKTtcbiAgICAgICAgICB0YXJnZXRbZXZlbnRNZXRob2RdKHRvdWNoRXZlbnRzVG91Y2guZW5kLCBvbkRyYWdFbmQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZW5hYmxlRHJhZ2dhYmxlKCkge1xuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmVsIHx8ICFzd2lwZXIuc2Nyb2xsYmFyLmVsKSByZXR1cm47XG4gICAgICAgIGV2ZW50cygnb24nKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZGlzYWJsZURyYWdnYWJsZSgpIHtcbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5lbCB8fCAhc3dpcGVyLnNjcm9sbGJhci5lbCkgcmV0dXJuO1xuICAgICAgICBldmVudHMoJ29mZicpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgc2Nyb2xsYmFyLFxuICAgICAgICAgICRlbDogJHN3aXBlckVsXG4gICAgICAgIH0gPSBzd2lwZXI7XG4gICAgICAgIHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyID0gY3JlYXRlRWxlbWVudElmTm90RGVmaW5lZChzd2lwZXIsIHN3aXBlci5vcmlnaW5hbFBhcmFtcy5zY3JvbGxiYXIsIHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLCB7XG4gICAgICAgICAgZWw6ICdzd2lwZXItc2Nyb2xsYmFyJ1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXI7XG4gICAgICAgIGlmICghcGFyYW1zLmVsKSByZXR1cm47XG4gICAgICAgIGxldCAkZWwgPSAkKHBhcmFtcy5lbCk7XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMudW5pcXVlTmF2RWxlbWVudHMgJiYgdHlwZW9mIHBhcmFtcy5lbCA9PT0gJ3N0cmluZycgJiYgJGVsLmxlbmd0aCA+IDEgJiYgJHN3aXBlckVsLmZpbmQocGFyYW1zLmVsKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAkZWwgPSAkc3dpcGVyRWwuZmluZChwYXJhbXMuZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgJGVsLmFkZENsYXNzKHN3aXBlci5pc0hvcml6b250YWwoKSA/IHBhcmFtcy5ob3Jpem9udGFsQ2xhc3MgOiBwYXJhbXMudmVydGljYWxDbGFzcyk7XG4gICAgICAgIGxldCAkZHJhZ0VsID0gJGVsLmZpbmQoYC4ke3N3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmRyYWdDbGFzc31gKTtcblxuICAgICAgICBpZiAoJGRyYWdFbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAkZHJhZ0VsID0gJChgPGRpdiBjbGFzcz1cIiR7c3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZHJhZ0NsYXNzfVwiPjwvZGl2PmApO1xuICAgICAgICAgICRlbC5hcHBlbmQoJGRyYWdFbCk7XG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3QuYXNzaWduKHNjcm9sbGJhciwge1xuICAgICAgICAgICRlbCxcbiAgICAgICAgICBlbDogJGVsWzBdLFxuICAgICAgICAgICRkcmFnRWwsXG4gICAgICAgICAgZHJhZ0VsOiAkZHJhZ0VsWzBdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChwYXJhbXMuZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgZW5hYmxlRHJhZ2dhYmxlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJGVsKSB7XG4gICAgICAgICAgJGVsW3N3aXBlci5lbmFibGVkID8gJ3JlbW92ZUNsYXNzJyA6ICdhZGRDbGFzcyddKHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmxvY2tDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXI7XG4gICAgICAgIGNvbnN0ICRlbCA9IHN3aXBlci5zY3JvbGxiYXIuJGVsO1xuXG4gICAgICAgIGlmICgkZWwpIHtcbiAgICAgICAgICAkZWwucmVtb3ZlQ2xhc3Moc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gcGFyYW1zLmhvcml6b250YWxDbGFzcyA6IHBhcmFtcy52ZXJ0aWNhbENsYXNzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRpc2FibGVEcmFnZ2FibGUoKTtcbiAgICAgIH1cblxuICAgICAgb24oJ2luaXQnLCAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5lbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgIGRpc2FibGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbml0KCk7XG4gICAgICAgICAgdXBkYXRlU2l6ZSgpO1xuICAgICAgICAgIHNldFRyYW5zbGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9uKCd1cGRhdGUgcmVzaXplIG9ic2VydmVyVXBkYXRlIGxvY2sgdW5sb2NrJywgKCkgPT4ge1xuICAgICAgICB1cGRhdGVTaXplKCk7XG4gICAgICB9KTtcbiAgICAgIG9uKCdzZXRUcmFuc2xhdGUnLCAoKSA9PiB7XG4gICAgICAgIHNldFRyYW5zbGF0ZSgpO1xuICAgICAgfSk7XG4gICAgICBvbignc2V0VHJhbnNpdGlvbicsIChfcywgZHVyYXRpb24pID0+IHtcbiAgICAgICAgc2V0VHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgICB9KTtcbiAgICAgIG9uKCdlbmFibGUgZGlzYWJsZScsICgpID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICRlbFxuICAgICAgICB9ID0gc3dpcGVyLnNjcm9sbGJhcjtcblxuICAgICAgICBpZiAoJGVsKSB7XG4gICAgICAgICAgJGVsW3N3aXBlci5lbmFibGVkID8gJ3JlbW92ZUNsYXNzJyA6ICdhZGRDbGFzcyddKHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmxvY2tDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgIGRlc3Ryb3koKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBlbmFibGUgPSAoKSA9PiB7XG4gICAgICAgIHN3aXBlci4kZWwucmVtb3ZlQ2xhc3Moc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuc2Nyb2xsYmFyRGlzYWJsZWRDbGFzcyk7XG5cbiAgICAgICAgaWYgKHN3aXBlci5zY3JvbGxiYXIuJGVsKSB7XG4gICAgICAgICAgc3dpcGVyLnNjcm9sbGJhci4kZWwucmVtb3ZlQ2xhc3Moc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuc2Nyb2xsYmFyRGlzYWJsZWRDbGFzcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpbml0KCk7XG4gICAgICAgIHVwZGF0ZVNpemUoKTtcbiAgICAgICAgc2V0VHJhbnNsYXRlKCk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBkaXNhYmxlID0gKCkgPT4ge1xuICAgICAgICBzd2lwZXIuJGVsLmFkZENsYXNzKHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLnNjcm9sbGJhckRpc2FibGVkQ2xhc3MpO1xuXG4gICAgICAgIGlmIChzd2lwZXIuc2Nyb2xsYmFyLiRlbCkge1xuICAgICAgICAgIHN3aXBlci5zY3JvbGxiYXIuJGVsLmFkZENsYXNzKHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLnNjcm9sbGJhckRpc2FibGVkQ2xhc3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVzdHJveSgpO1xuICAgICAgfTtcblxuICAgICAgT2JqZWN0LmFzc2lnbihzd2lwZXIuc2Nyb2xsYmFyLCB7XG4gICAgICAgIGVuYWJsZSxcbiAgICAgICAgZGlzYWJsZSxcbiAgICAgICAgdXBkYXRlU2l6ZSxcbiAgICAgICAgc2V0VHJhbnNsYXRlLFxuICAgICAgICBpbml0LFxuICAgICAgICBkZXN0cm95XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBQYXJhbGxheChfcmVmKSB7XG4gICAgICBsZXQge1xuICAgICAgICBzd2lwZXIsXG4gICAgICAgIGV4dGVuZFBhcmFtcyxcbiAgICAgICAgb25cbiAgICAgIH0gPSBfcmVmO1xuICAgICAgZXh0ZW5kUGFyYW1zKHtcbiAgICAgICAgcGFyYWxsYXg6IHtcbiAgICAgICAgICBlbmFibGVkOiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgc2V0VHJhbnNmb3JtID0gKGVsLCBwcm9ncmVzcykgPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgcnRsXG4gICAgICAgIH0gPSBzd2lwZXI7XG4gICAgICAgIGNvbnN0ICRlbCA9ICQoZWwpO1xuICAgICAgICBjb25zdCBydGxGYWN0b3IgPSBydGwgPyAtMSA6IDE7XG4gICAgICAgIGNvbnN0IHAgPSAkZWwuYXR0cignZGF0YS1zd2lwZXItcGFyYWxsYXgnKSB8fCAnMCc7XG4gICAgICAgIGxldCB4ID0gJGVsLmF0dHIoJ2RhdGEtc3dpcGVyLXBhcmFsbGF4LXgnKTtcbiAgICAgICAgbGV0IHkgPSAkZWwuYXR0cignZGF0YS1zd2lwZXItcGFyYWxsYXgteScpO1xuICAgICAgICBjb25zdCBzY2FsZSA9ICRlbC5hdHRyKCdkYXRhLXN3aXBlci1wYXJhbGxheC1zY2FsZScpO1xuICAgICAgICBjb25zdCBvcGFjaXR5ID0gJGVsLmF0dHIoJ2RhdGEtc3dpcGVyLXBhcmFsbGF4LW9wYWNpdHknKTtcblxuICAgICAgICBpZiAoeCB8fCB5KSB7XG4gICAgICAgICAgeCA9IHggfHwgJzAnO1xuICAgICAgICAgIHkgPSB5IHx8ICcwJztcbiAgICAgICAgfSBlbHNlIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICB4ID0gcDtcbiAgICAgICAgICB5ID0gJzAnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHkgPSBwO1xuICAgICAgICAgIHggPSAnMCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoeC5pbmRleE9mKCclJykgPj0gMCkge1xuICAgICAgICAgIHggPSBgJHtwYXJzZUludCh4LCAxMCkgKiBwcm9ncmVzcyAqIHJ0bEZhY3Rvcn0lYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB4ID0gYCR7eCAqIHByb2dyZXNzICogcnRsRmFjdG9yfXB4YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh5LmluZGV4T2YoJyUnKSA+PSAwKSB7XG4gICAgICAgICAgeSA9IGAke3BhcnNlSW50KHksIDEwKSAqIHByb2dyZXNzfSVgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHkgPSBgJHt5ICogcHJvZ3Jlc3N9cHhgO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcGFjaXR5ICE9PSAndW5kZWZpbmVkJyAmJiBvcGFjaXR5ICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgY3VycmVudE9wYWNpdHkgPSBvcGFjaXR5IC0gKG9wYWNpdHkgLSAxKSAqICgxIC0gTWF0aC5hYnMocHJvZ3Jlc3MpKTtcbiAgICAgICAgICAkZWxbMF0uc3R5bGUub3BhY2l0eSA9IGN1cnJlbnRPcGFjaXR5O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBzY2FsZSA9PT0gJ3VuZGVmaW5lZCcgfHwgc2NhbGUgPT09IG51bGwpIHtcbiAgICAgICAgICAkZWwudHJhbnNmb3JtKGB0cmFuc2xhdGUzZCgke3h9LCAke3l9LCAwcHgpYCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgY3VycmVudFNjYWxlID0gc2NhbGUgLSAoc2NhbGUgLSAxKSAqICgxIC0gTWF0aC5hYnMocHJvZ3Jlc3MpKTtcbiAgICAgICAgICAkZWwudHJhbnNmb3JtKGB0cmFuc2xhdGUzZCgke3h9LCAke3l9LCAwcHgpIHNjYWxlKCR7Y3VycmVudFNjYWxlfSlgKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3Qgc2V0VHJhbnNsYXRlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgJGVsLFxuICAgICAgICAgIHNsaWRlcyxcbiAgICAgICAgICBwcm9ncmVzcyxcbiAgICAgICAgICBzbmFwR3JpZFxuICAgICAgICB9ID0gc3dpcGVyO1xuICAgICAgICAkZWwuY2hpbGRyZW4oJ1tkYXRhLXN3aXBlci1wYXJhbGxheF0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC14XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXldLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgtb3BhY2l0eV0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC1zY2FsZV0nKS5lYWNoKGVsID0+IHtcbiAgICAgICAgICBzZXRUcmFuc2Zvcm0oZWwsIHByb2dyZXNzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNsaWRlcy5lYWNoKChzbGlkZUVsLCBzbGlkZUluZGV4KSA9PiB7XG4gICAgICAgICAgbGV0IHNsaWRlUHJvZ3Jlc3MgPSBzbGlkZUVsLnByb2dyZXNzO1xuXG4gICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXAgPiAxICYmIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyAhPT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICBzbGlkZVByb2dyZXNzICs9IE1hdGguY2VpbChzbGlkZUluZGV4IC8gMikgLSBwcm9ncmVzcyAqIChzbmFwR3JpZC5sZW5ndGggLSAxKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzbGlkZVByb2dyZXNzID0gTWF0aC5taW4oTWF0aC5tYXgoc2xpZGVQcm9ncmVzcywgLTEpLCAxKTtcbiAgICAgICAgICAkKHNsaWRlRWwpLmZpbmQoJ1tkYXRhLXN3aXBlci1wYXJhbGxheF0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC14XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXldLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgtb3BhY2l0eV0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC1zY2FsZV0nKS5lYWNoKGVsID0+IHtcbiAgICAgICAgICAgIHNldFRyYW5zZm9ybShlbCwgc2xpZGVQcm9ncmVzcyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgY29uc3Qgc2V0VHJhbnNpdGlvbiA9IGZ1bmN0aW9uIChkdXJhdGlvbikge1xuICAgICAgICBpZiAoZHVyYXRpb24gPT09IHZvaWQgMCkge1xuICAgICAgICAgIGR1cmF0aW9uID0gc3dpcGVyLnBhcmFtcy5zcGVlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAkZWxcbiAgICAgICAgfSA9IHN3aXBlcjtcbiAgICAgICAgJGVsLmZpbmQoJ1tkYXRhLXN3aXBlci1wYXJhbGxheF0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC14XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXldLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgtb3BhY2l0eV0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC1zY2FsZV0nKS5lYWNoKHBhcmFsbGF4RWwgPT4ge1xuICAgICAgICAgIGNvbnN0ICRwYXJhbGxheEVsID0gJChwYXJhbGxheEVsKTtcbiAgICAgICAgICBsZXQgcGFyYWxsYXhEdXJhdGlvbiA9IHBhcnNlSW50KCRwYXJhbGxheEVsLmF0dHIoJ2RhdGEtc3dpcGVyLXBhcmFsbGF4LWR1cmF0aW9uJyksIDEwKSB8fCBkdXJhdGlvbjtcbiAgICAgICAgICBpZiAoZHVyYXRpb24gPT09IDApIHBhcmFsbGF4RHVyYXRpb24gPSAwO1xuICAgICAgICAgICRwYXJhbGxheEVsLnRyYW5zaXRpb24ocGFyYWxsYXhEdXJhdGlvbik7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgb24oJ2JlZm9yZUluaXQnLCAoKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5wYXJhbGxheC5lbmFibGVkKSByZXR1cm47XG4gICAgICAgIHN3aXBlci5wYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcyA9IHRydWU7XG4gICAgICAgIHN3aXBlci5vcmlnaW5hbFBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgICAgb24oJ2luaXQnLCAoKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5wYXJhbGxheC5lbmFibGVkKSByZXR1cm47XG4gICAgICAgIHNldFRyYW5zbGF0ZSgpO1xuICAgICAgfSk7XG4gICAgICBvbignc2V0VHJhbnNsYXRlJywgKCkgPT4ge1xuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMucGFyYWxsYXguZW5hYmxlZCkgcmV0dXJuO1xuICAgICAgICBzZXRUcmFuc2xhdGUoKTtcbiAgICAgIH0pO1xuICAgICAgb24oJ3NldFRyYW5zaXRpb24nLCAoX3N3aXBlciwgZHVyYXRpb24pID0+IHtcbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLnBhcmFsbGF4LmVuYWJsZWQpIHJldHVybjtcbiAgICAgICAgc2V0VHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBab29tKF9yZWYpIHtcbiAgICAgIGxldCB7XG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgZXh0ZW5kUGFyYW1zLFxuICAgICAgICBvbixcbiAgICAgICAgZW1pdFxuICAgICAgfSA9IF9yZWY7XG4gICAgICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgICAgIGV4dGVuZFBhcmFtcyh7XG4gICAgICAgIHpvb206IHtcbiAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICBtYXhSYXRpbzogMyxcbiAgICAgICAgICBtaW5SYXRpbzogMSxcbiAgICAgICAgICB0b2dnbGU6IHRydWUsXG4gICAgICAgICAgY29udGFpbmVyQ2xhc3M6ICdzd2lwZXItem9vbS1jb250YWluZXInLFxuICAgICAgICAgIHpvb21lZFNsaWRlQ2xhc3M6ICdzd2lwZXItc2xpZGUtem9vbWVkJ1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHN3aXBlci56b29tID0ge1xuICAgICAgICBlbmFibGVkOiBmYWxzZVxuICAgICAgfTtcbiAgICAgIGxldCBjdXJyZW50U2NhbGUgPSAxO1xuICAgICAgbGV0IGlzU2NhbGluZyA9IGZhbHNlO1xuICAgICAgbGV0IGdlc3R1cmVzRW5hYmxlZDtcbiAgICAgIGxldCBmYWtlR2VzdHVyZVRvdWNoZWQ7XG4gICAgICBsZXQgZmFrZUdlc3R1cmVNb3ZlZDtcbiAgICAgIGNvbnN0IGdlc3R1cmUgPSB7XG4gICAgICAgICRzbGlkZUVsOiB1bmRlZmluZWQsXG4gICAgICAgIHNsaWRlV2lkdGg6IHVuZGVmaW5lZCxcbiAgICAgICAgc2xpZGVIZWlnaHQ6IHVuZGVmaW5lZCxcbiAgICAgICAgJGltYWdlRWw6IHVuZGVmaW5lZCxcbiAgICAgICAgJGltYWdlV3JhcEVsOiB1bmRlZmluZWQsXG4gICAgICAgIG1heFJhdGlvOiAzXG4gICAgICB9O1xuICAgICAgY29uc3QgaW1hZ2UgPSB7XG4gICAgICAgIGlzVG91Y2hlZDogdW5kZWZpbmVkLFxuICAgICAgICBpc01vdmVkOiB1bmRlZmluZWQsXG4gICAgICAgIGN1cnJlbnRYOiB1bmRlZmluZWQsXG4gICAgICAgIGN1cnJlbnRZOiB1bmRlZmluZWQsXG4gICAgICAgIG1pblg6IHVuZGVmaW5lZCxcbiAgICAgICAgbWluWTogdW5kZWZpbmVkLFxuICAgICAgICBtYXhYOiB1bmRlZmluZWQsXG4gICAgICAgIG1heFk6IHVuZGVmaW5lZCxcbiAgICAgICAgd2lkdGg6IHVuZGVmaW5lZCxcbiAgICAgICAgaGVpZ2h0OiB1bmRlZmluZWQsXG4gICAgICAgIHN0YXJ0WDogdW5kZWZpbmVkLFxuICAgICAgICBzdGFydFk6IHVuZGVmaW5lZCxcbiAgICAgICAgdG91Y2hlc1N0YXJ0OiB7fSxcbiAgICAgICAgdG91Y2hlc0N1cnJlbnQ6IHt9XG4gICAgICB9O1xuICAgICAgY29uc3QgdmVsb2NpdHkgPSB7XG4gICAgICAgIHg6IHVuZGVmaW5lZCxcbiAgICAgICAgeTogdW5kZWZpbmVkLFxuICAgICAgICBwcmV2UG9zaXRpb25YOiB1bmRlZmluZWQsXG4gICAgICAgIHByZXZQb3NpdGlvblk6IHVuZGVmaW5lZCxcbiAgICAgICAgcHJldlRpbWU6IHVuZGVmaW5lZFxuICAgICAgfTtcbiAgICAgIGxldCBzY2FsZSA9IDE7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc3dpcGVyLnpvb20sICdzY2FsZScsIHtcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBzY2FsZTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICBpZiAoc2NhbGUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBpbWFnZUVsID0gZ2VzdHVyZS4kaW1hZ2VFbCA/IGdlc3R1cmUuJGltYWdlRWxbMF0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb25zdCBzbGlkZUVsID0gZ2VzdHVyZS4kc2xpZGVFbCA/IGdlc3R1cmUuJHNsaWRlRWxbMF0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbWl0KCd6b29tQ2hhbmdlJywgdmFsdWUsIGltYWdlRWwsIHNsaWRlRWwpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNjYWxlID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG5cbiAgICAgIGZ1bmN0aW9uIGdldERpc3RhbmNlQmV0d2VlblRvdWNoZXMoZSkge1xuICAgICAgICBpZiAoZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA8IDIpIHJldHVybiAxO1xuICAgICAgICBjb25zdCB4MSA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWDtcbiAgICAgICAgY29uc3QgeTEgPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVk7XG4gICAgICAgIGNvbnN0IHgyID0gZS50YXJnZXRUb3VjaGVzWzFdLnBhZ2VYO1xuICAgICAgICBjb25zdCB5MiA9IGUudGFyZ2V0VG91Y2hlc1sxXS5wYWdlWTtcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoKHgyIC0geDEpICoqIDIgKyAoeTIgLSB5MSkgKiogMik7XG4gICAgICAgIHJldHVybiBkaXN0YW5jZTtcbiAgICAgIH0gLy8gRXZlbnRzXG5cblxuICAgICAgZnVuY3Rpb24gb25HZXN0dXJlU3RhcnQoZSkge1xuICAgICAgICBjb25zdCBzdXBwb3J0ID0gc3dpcGVyLnN1cHBvcnQ7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuem9vbTtcbiAgICAgICAgZmFrZUdlc3R1cmVUb3VjaGVkID0gZmFsc2U7XG4gICAgICAgIGZha2VHZXN0dXJlTW92ZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoIXN1cHBvcnQuZ2VzdHVyZXMpIHtcbiAgICAgICAgICBpZiAoZS50eXBlICE9PSAndG91Y2hzdGFydCcgfHwgZS50eXBlID09PSAndG91Y2hzdGFydCcgJiYgZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmYWtlR2VzdHVyZVRvdWNoZWQgPSB0cnVlO1xuICAgICAgICAgIGdlc3R1cmUuc2NhbGVTdGFydCA9IGdldERpc3RhbmNlQmV0d2VlblRvdWNoZXMoZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWdlc3R1cmUuJHNsaWRlRWwgfHwgIWdlc3R1cmUuJHNsaWRlRWwubGVuZ3RoKSB7XG4gICAgICAgICAgZ2VzdHVyZS4kc2xpZGVFbCA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoYC4ke3N3aXBlci5wYXJhbXMuc2xpZGVDbGFzc31gKTtcbiAgICAgICAgICBpZiAoZ2VzdHVyZS4kc2xpZGVFbC5sZW5ndGggPT09IDApIGdlc3R1cmUuJHNsaWRlRWwgPSBzd2lwZXIuc2xpZGVzLmVxKHN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgICAgZ2VzdHVyZS4kaW1hZ2VFbCA9IGdlc3R1cmUuJHNsaWRlRWwuZmluZChgLiR7cGFyYW1zLmNvbnRhaW5lckNsYXNzfWApLmVxKDApLmZpbmQoJ3BpY3R1cmUsIGltZywgc3ZnLCBjYW52YXMsIC5zd2lwZXItem9vbS10YXJnZXQnKS5lcSgwKTtcbiAgICAgICAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbCA9IGdlc3R1cmUuJGltYWdlRWwucGFyZW50KGAuJHtwYXJhbXMuY29udGFpbmVyQ2xhc3N9YCk7XG4gICAgICAgICAgZ2VzdHVyZS5tYXhSYXRpbyA9IGdlc3R1cmUuJGltYWdlV3JhcEVsLmF0dHIoJ2RhdGEtc3dpcGVyLXpvb20nKSB8fCBwYXJhbXMubWF4UmF0aW87XG5cbiAgICAgICAgICBpZiAoZ2VzdHVyZS4kaW1hZ2VXcmFwRWwubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBnZXN0dXJlLiRpbWFnZUVsID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChnZXN0dXJlLiRpbWFnZUVsKSB7XG4gICAgICAgICAgZ2VzdHVyZS4kaW1hZ2VFbC50cmFuc2l0aW9uKDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaXNTY2FsaW5nID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25HZXN0dXJlQ2hhbmdlKGUpIHtcbiAgICAgICAgY29uc3Qgc3VwcG9ydCA9IHN3aXBlci5zdXBwb3J0O1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnpvb207XG4gICAgICAgIGNvbnN0IHpvb20gPSBzd2lwZXIuem9vbTtcblxuICAgICAgICBpZiAoIXN1cHBvcnQuZ2VzdHVyZXMpIHtcbiAgICAgICAgICBpZiAoZS50eXBlICE9PSAndG91Y2htb3ZlJyB8fCBlLnR5cGUgPT09ICd0b3VjaG1vdmUnICYmIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmFrZUdlc3R1cmVNb3ZlZCA9IHRydWU7XG4gICAgICAgICAgZ2VzdHVyZS5zY2FsZU1vdmUgPSBnZXREaXN0YW5jZUJldHdlZW5Ub3VjaGVzKGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFnZXN0dXJlLiRpbWFnZUVsIHx8IGdlc3R1cmUuJGltYWdlRWwubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgaWYgKGUudHlwZSA9PT0gJ2dlc3R1cmVjaGFuZ2UnKSBvbkdlc3R1cmVTdGFydChlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3VwcG9ydC5nZXN0dXJlcykge1xuICAgICAgICAgIHpvb20uc2NhbGUgPSBlLnNjYWxlICogY3VycmVudFNjYWxlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHpvb20uc2NhbGUgPSBnZXN0dXJlLnNjYWxlTW92ZSAvIGdlc3R1cmUuc2NhbGVTdGFydCAqIGN1cnJlbnRTY2FsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh6b29tLnNjYWxlID4gZ2VzdHVyZS5tYXhSYXRpbykge1xuICAgICAgICAgIHpvb20uc2NhbGUgPSBnZXN0dXJlLm1heFJhdGlvIC0gMSArICh6b29tLnNjYWxlIC0gZ2VzdHVyZS5tYXhSYXRpbyArIDEpICoqIDAuNTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh6b29tLnNjYWxlIDwgcGFyYW1zLm1pblJhdGlvKSB7XG4gICAgICAgICAgem9vbS5zY2FsZSA9IHBhcmFtcy5taW5SYXRpbyArIDEgLSAocGFyYW1zLm1pblJhdGlvIC0gem9vbS5zY2FsZSArIDEpICoqIDAuNTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdlc3R1cmUuJGltYWdlRWwudHJhbnNmb3JtKGB0cmFuc2xhdGUzZCgwLDAsMCkgc2NhbGUoJHt6b29tLnNjYWxlfSlgKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25HZXN0dXJlRW5kKGUpIHtcbiAgICAgICAgY29uc3QgZGV2aWNlID0gc3dpcGVyLmRldmljZTtcbiAgICAgICAgY29uc3Qgc3VwcG9ydCA9IHN3aXBlci5zdXBwb3J0O1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnpvb207XG4gICAgICAgIGNvbnN0IHpvb20gPSBzd2lwZXIuem9vbTtcblxuICAgICAgICBpZiAoIXN1cHBvcnQuZ2VzdHVyZXMpIHtcbiAgICAgICAgICBpZiAoIWZha2VHZXN0dXJlVG91Y2hlZCB8fCAhZmFrZUdlc3R1cmVNb3ZlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChlLnR5cGUgIT09ICd0b3VjaGVuZCcgfHwgZS50eXBlID09PSAndG91Y2hlbmQnICYmIGUuY2hhbmdlZFRvdWNoZXMubGVuZ3RoIDwgMiAmJiAhZGV2aWNlLmFuZHJvaWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmYWtlR2VzdHVyZVRvdWNoZWQgPSBmYWxzZTtcbiAgICAgICAgICBmYWtlR2VzdHVyZU1vdmVkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWdlc3R1cmUuJGltYWdlRWwgfHwgZ2VzdHVyZS4kaW1hZ2VFbC5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgem9vbS5zY2FsZSA9IE1hdGgubWF4KE1hdGgubWluKHpvb20uc2NhbGUsIGdlc3R1cmUubWF4UmF0aW8pLCBwYXJhbXMubWluUmF0aW8pO1xuICAgICAgICBnZXN0dXJlLiRpbWFnZUVsLnRyYW5zaXRpb24oc3dpcGVyLnBhcmFtcy5zcGVlZCkudHJhbnNmb3JtKGB0cmFuc2xhdGUzZCgwLDAsMCkgc2NhbGUoJHt6b29tLnNjYWxlfSlgKTtcbiAgICAgICAgY3VycmVudFNjYWxlID0gem9vbS5zY2FsZTtcbiAgICAgICAgaXNTY2FsaW5nID0gZmFsc2U7XG4gICAgICAgIGlmICh6b29tLnNjYWxlID09PSAxKSBnZXN0dXJlLiRzbGlkZUVsID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvblRvdWNoU3RhcnQoZSkge1xuICAgICAgICBjb25zdCBkZXZpY2UgPSBzd2lwZXIuZGV2aWNlO1xuICAgICAgICBpZiAoIWdlc3R1cmUuJGltYWdlRWwgfHwgZ2VzdHVyZS4kaW1hZ2VFbC5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgaWYgKGltYWdlLmlzVG91Y2hlZCkgcmV0dXJuO1xuICAgICAgICBpZiAoZGV2aWNlLmFuZHJvaWQgJiYgZS5jYW5jZWxhYmxlKSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGltYWdlLmlzVG91Y2hlZCA9IHRydWU7XG4gICAgICAgIGltYWdlLnRvdWNoZXNTdGFydC54ID0gZS50eXBlID09PSAndG91Y2hzdGFydCcgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggOiBlLnBhZ2VYO1xuICAgICAgICBpbWFnZS50b3VjaGVzU3RhcnQueSA9IGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIDogZS5wYWdlWTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25Ub3VjaE1vdmUoZSkge1xuICAgICAgICBjb25zdCB6b29tID0gc3dpcGVyLnpvb207XG4gICAgICAgIGlmICghZ2VzdHVyZS4kaW1hZ2VFbCB8fCBnZXN0dXJlLiRpbWFnZUVsLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICBzd2lwZXIuYWxsb3dDbGljayA9IGZhbHNlO1xuICAgICAgICBpZiAoIWltYWdlLmlzVG91Y2hlZCB8fCAhZ2VzdHVyZS4kc2xpZGVFbCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICghaW1hZ2UuaXNNb3ZlZCkge1xuICAgICAgICAgIGltYWdlLndpZHRoID0gZ2VzdHVyZS4kaW1hZ2VFbFswXS5vZmZzZXRXaWR0aDtcbiAgICAgICAgICBpbWFnZS5oZWlnaHQgPSBnZXN0dXJlLiRpbWFnZUVsWzBdLm9mZnNldEhlaWdodDtcbiAgICAgICAgICBpbWFnZS5zdGFydFggPSBnZXRUcmFuc2xhdGUoZ2VzdHVyZS4kaW1hZ2VXcmFwRWxbMF0sICd4JykgfHwgMDtcbiAgICAgICAgICBpbWFnZS5zdGFydFkgPSBnZXRUcmFuc2xhdGUoZ2VzdHVyZS4kaW1hZ2VXcmFwRWxbMF0sICd5JykgfHwgMDtcbiAgICAgICAgICBnZXN0dXJlLnNsaWRlV2lkdGggPSBnZXN0dXJlLiRzbGlkZUVsWzBdLm9mZnNldFdpZHRoO1xuICAgICAgICAgIGdlc3R1cmUuc2xpZGVIZWlnaHQgPSBnZXN0dXJlLiRzbGlkZUVsWzBdLm9mZnNldEhlaWdodDtcbiAgICAgICAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbC50cmFuc2l0aW9uKDApO1xuICAgICAgICB9IC8vIERlZmluZSBpZiB3ZSBuZWVkIGltYWdlIGRyYWdcblxuXG4gICAgICAgIGNvbnN0IHNjYWxlZFdpZHRoID0gaW1hZ2Uud2lkdGggKiB6b29tLnNjYWxlO1xuICAgICAgICBjb25zdCBzY2FsZWRIZWlnaHQgPSBpbWFnZS5oZWlnaHQgKiB6b29tLnNjYWxlO1xuICAgICAgICBpZiAoc2NhbGVkV2lkdGggPCBnZXN0dXJlLnNsaWRlV2lkdGggJiYgc2NhbGVkSGVpZ2h0IDwgZ2VzdHVyZS5zbGlkZUhlaWdodCkgcmV0dXJuO1xuICAgICAgICBpbWFnZS5taW5YID0gTWF0aC5taW4oZ2VzdHVyZS5zbGlkZVdpZHRoIC8gMiAtIHNjYWxlZFdpZHRoIC8gMiwgMCk7XG4gICAgICAgIGltYWdlLm1heFggPSAtaW1hZ2UubWluWDtcbiAgICAgICAgaW1hZ2UubWluWSA9IE1hdGgubWluKGdlc3R1cmUuc2xpZGVIZWlnaHQgLyAyIC0gc2NhbGVkSGVpZ2h0IC8gMiwgMCk7XG4gICAgICAgIGltYWdlLm1heFkgPSAtaW1hZ2UubWluWTtcbiAgICAgICAgaW1hZ2UudG91Y2hlc0N1cnJlbnQueCA9IGUudHlwZSA9PT0gJ3RvdWNobW92ZScgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggOiBlLnBhZ2VYO1xuICAgICAgICBpbWFnZS50b3VjaGVzQ3VycmVudC55ID0gZS50eXBlID09PSAndG91Y2htb3ZlJyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSA6IGUucGFnZVk7XG5cbiAgICAgICAgaWYgKCFpbWFnZS5pc01vdmVkICYmICFpc1NjYWxpbmcpIHtcbiAgICAgICAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpICYmIChNYXRoLmZsb29yKGltYWdlLm1pblgpID09PSBNYXRoLmZsb29yKGltYWdlLnN0YXJ0WCkgJiYgaW1hZ2UudG91Y2hlc0N1cnJlbnQueCA8IGltYWdlLnRvdWNoZXNTdGFydC54IHx8IE1hdGguZmxvb3IoaW1hZ2UubWF4WCkgPT09IE1hdGguZmxvb3IoaW1hZ2Uuc3RhcnRYKSAmJiBpbWFnZS50b3VjaGVzQ3VycmVudC54ID4gaW1hZ2UudG91Y2hlc1N0YXJ0LngpKSB7XG4gICAgICAgICAgICBpbWFnZS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXN3aXBlci5pc0hvcml6b250YWwoKSAmJiAoTWF0aC5mbG9vcihpbWFnZS5taW5ZKSA9PT0gTWF0aC5mbG9vcihpbWFnZS5zdGFydFkpICYmIGltYWdlLnRvdWNoZXNDdXJyZW50LnkgPCBpbWFnZS50b3VjaGVzU3RhcnQueSB8fCBNYXRoLmZsb29yKGltYWdlLm1heFkpID09PSBNYXRoLmZsb29yKGltYWdlLnN0YXJ0WSkgJiYgaW1hZ2UudG91Y2hlc0N1cnJlbnQueSA+IGltYWdlLnRvdWNoZXNTdGFydC55KSkge1xuICAgICAgICAgICAgaW1hZ2UuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUuY2FuY2VsYWJsZSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGltYWdlLmlzTW92ZWQgPSB0cnVlO1xuICAgICAgICBpbWFnZS5jdXJyZW50WCA9IGltYWdlLnRvdWNoZXNDdXJyZW50LnggLSBpbWFnZS50b3VjaGVzU3RhcnQueCArIGltYWdlLnN0YXJ0WDtcbiAgICAgICAgaW1hZ2UuY3VycmVudFkgPSBpbWFnZS50b3VjaGVzQ3VycmVudC55IC0gaW1hZ2UudG91Y2hlc1N0YXJ0LnkgKyBpbWFnZS5zdGFydFk7XG5cbiAgICAgICAgaWYgKGltYWdlLmN1cnJlbnRYIDwgaW1hZ2UubWluWCkge1xuICAgICAgICAgIGltYWdlLmN1cnJlbnRYID0gaW1hZ2UubWluWCArIDEgLSAoaW1hZ2UubWluWCAtIGltYWdlLmN1cnJlbnRYICsgMSkgKiogMC44O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGltYWdlLmN1cnJlbnRYID4gaW1hZ2UubWF4WCkge1xuICAgICAgICAgIGltYWdlLmN1cnJlbnRYID0gaW1hZ2UubWF4WCAtIDEgKyAoaW1hZ2UuY3VycmVudFggLSBpbWFnZS5tYXhYICsgMSkgKiogMC44O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGltYWdlLmN1cnJlbnRZIDwgaW1hZ2UubWluWSkge1xuICAgICAgICAgIGltYWdlLmN1cnJlbnRZID0gaW1hZ2UubWluWSArIDEgLSAoaW1hZ2UubWluWSAtIGltYWdlLmN1cnJlbnRZICsgMSkgKiogMC44O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGltYWdlLmN1cnJlbnRZID4gaW1hZ2UubWF4WSkge1xuICAgICAgICAgIGltYWdlLmN1cnJlbnRZID0gaW1hZ2UubWF4WSAtIDEgKyAoaW1hZ2UuY3VycmVudFkgLSBpbWFnZS5tYXhZICsgMSkgKiogMC44O1xuICAgICAgICB9IC8vIFZlbG9jaXR5XG5cblxuICAgICAgICBpZiAoIXZlbG9jaXR5LnByZXZQb3NpdGlvblgpIHZlbG9jaXR5LnByZXZQb3NpdGlvblggPSBpbWFnZS50b3VjaGVzQ3VycmVudC54O1xuICAgICAgICBpZiAoIXZlbG9jaXR5LnByZXZQb3NpdGlvblkpIHZlbG9jaXR5LnByZXZQb3NpdGlvblkgPSBpbWFnZS50b3VjaGVzQ3VycmVudC55O1xuICAgICAgICBpZiAoIXZlbG9jaXR5LnByZXZUaW1lKSB2ZWxvY2l0eS5wcmV2VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIHZlbG9jaXR5LnggPSAoaW1hZ2UudG91Y2hlc0N1cnJlbnQueCAtIHZlbG9jaXR5LnByZXZQb3NpdGlvblgpIC8gKERhdGUubm93KCkgLSB2ZWxvY2l0eS5wcmV2VGltZSkgLyAyO1xuICAgICAgICB2ZWxvY2l0eS55ID0gKGltYWdlLnRvdWNoZXNDdXJyZW50LnkgLSB2ZWxvY2l0eS5wcmV2UG9zaXRpb25ZKSAvIChEYXRlLm5vdygpIC0gdmVsb2NpdHkucHJldlRpbWUpIC8gMjtcbiAgICAgICAgaWYgKE1hdGguYWJzKGltYWdlLnRvdWNoZXNDdXJyZW50LnggLSB2ZWxvY2l0eS5wcmV2UG9zaXRpb25YKSA8IDIpIHZlbG9jaXR5LnggPSAwO1xuICAgICAgICBpZiAoTWF0aC5hYnMoaW1hZ2UudG91Y2hlc0N1cnJlbnQueSAtIHZlbG9jaXR5LnByZXZQb3NpdGlvblkpIDwgMikgdmVsb2NpdHkueSA9IDA7XG4gICAgICAgIHZlbG9jaXR5LnByZXZQb3NpdGlvblggPSBpbWFnZS50b3VjaGVzQ3VycmVudC54O1xuICAgICAgICB2ZWxvY2l0eS5wcmV2UG9zaXRpb25ZID0gaW1hZ2UudG91Y2hlc0N1cnJlbnQueTtcbiAgICAgICAgdmVsb2NpdHkucHJldlRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbC50cmFuc2Zvcm0oYHRyYW5zbGF0ZTNkKCR7aW1hZ2UuY3VycmVudFh9cHgsICR7aW1hZ2UuY3VycmVudFl9cHgsMClgKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25Ub3VjaEVuZCgpIHtcbiAgICAgICAgY29uc3Qgem9vbSA9IHN3aXBlci56b29tO1xuICAgICAgICBpZiAoIWdlc3R1cmUuJGltYWdlRWwgfHwgZ2VzdHVyZS4kaW1hZ2VFbC5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgICAgICBpZiAoIWltYWdlLmlzVG91Y2hlZCB8fCAhaW1hZ2UuaXNNb3ZlZCkge1xuICAgICAgICAgIGltYWdlLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgICAgICAgIGltYWdlLmlzTW92ZWQgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpbWFnZS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICAgICAgaW1hZ2UuaXNNb3ZlZCA9IGZhbHNlO1xuICAgICAgICBsZXQgbW9tZW50dW1EdXJhdGlvblggPSAzMDA7XG4gICAgICAgIGxldCBtb21lbnR1bUR1cmF0aW9uWSA9IDMwMDtcbiAgICAgICAgY29uc3QgbW9tZW50dW1EaXN0YW5jZVggPSB2ZWxvY2l0eS54ICogbW9tZW50dW1EdXJhdGlvblg7XG4gICAgICAgIGNvbnN0IG5ld1Bvc2l0aW9uWCA9IGltYWdlLmN1cnJlbnRYICsgbW9tZW50dW1EaXN0YW5jZVg7XG4gICAgICAgIGNvbnN0IG1vbWVudHVtRGlzdGFuY2VZID0gdmVsb2NpdHkueSAqIG1vbWVudHVtRHVyYXRpb25ZO1xuICAgICAgICBjb25zdCBuZXdQb3NpdGlvblkgPSBpbWFnZS5jdXJyZW50WSArIG1vbWVudHVtRGlzdGFuY2VZOyAvLyBGaXggZHVyYXRpb25cblxuICAgICAgICBpZiAodmVsb2NpdHkueCAhPT0gMCkgbW9tZW50dW1EdXJhdGlvblggPSBNYXRoLmFicygobmV3UG9zaXRpb25YIC0gaW1hZ2UuY3VycmVudFgpIC8gdmVsb2NpdHkueCk7XG4gICAgICAgIGlmICh2ZWxvY2l0eS55ICE9PSAwKSBtb21lbnR1bUR1cmF0aW9uWSA9IE1hdGguYWJzKChuZXdQb3NpdGlvblkgLSBpbWFnZS5jdXJyZW50WSkgLyB2ZWxvY2l0eS55KTtcbiAgICAgICAgY29uc3QgbW9tZW50dW1EdXJhdGlvbiA9IE1hdGgubWF4KG1vbWVudHVtRHVyYXRpb25YLCBtb21lbnR1bUR1cmF0aW9uWSk7XG4gICAgICAgIGltYWdlLmN1cnJlbnRYID0gbmV3UG9zaXRpb25YO1xuICAgICAgICBpbWFnZS5jdXJyZW50WSA9IG5ld1Bvc2l0aW9uWTsgLy8gRGVmaW5lIGlmIHdlIG5lZWQgaW1hZ2UgZHJhZ1xuXG4gICAgICAgIGNvbnN0IHNjYWxlZFdpZHRoID0gaW1hZ2Uud2lkdGggKiB6b29tLnNjYWxlO1xuICAgICAgICBjb25zdCBzY2FsZWRIZWlnaHQgPSBpbWFnZS5oZWlnaHQgKiB6b29tLnNjYWxlO1xuICAgICAgICBpbWFnZS5taW5YID0gTWF0aC5taW4oZ2VzdHVyZS5zbGlkZVdpZHRoIC8gMiAtIHNjYWxlZFdpZHRoIC8gMiwgMCk7XG4gICAgICAgIGltYWdlLm1heFggPSAtaW1hZ2UubWluWDtcbiAgICAgICAgaW1hZ2UubWluWSA9IE1hdGgubWluKGdlc3R1cmUuc2xpZGVIZWlnaHQgLyAyIC0gc2NhbGVkSGVpZ2h0IC8gMiwgMCk7XG4gICAgICAgIGltYWdlLm1heFkgPSAtaW1hZ2UubWluWTtcbiAgICAgICAgaW1hZ2UuY3VycmVudFggPSBNYXRoLm1heChNYXRoLm1pbihpbWFnZS5jdXJyZW50WCwgaW1hZ2UubWF4WCksIGltYWdlLm1pblgpO1xuICAgICAgICBpbWFnZS5jdXJyZW50WSA9IE1hdGgubWF4KE1hdGgubWluKGltYWdlLmN1cnJlbnRZLCBpbWFnZS5tYXhZKSwgaW1hZ2UubWluWSk7XG4gICAgICAgIGdlc3R1cmUuJGltYWdlV3JhcEVsLnRyYW5zaXRpb24obW9tZW50dW1EdXJhdGlvbikudHJhbnNmb3JtKGB0cmFuc2xhdGUzZCgke2ltYWdlLmN1cnJlbnRYfXB4LCAke2ltYWdlLmN1cnJlbnRZfXB4LDApYCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uVHJhbnNpdGlvbkVuZCgpIHtcbiAgICAgICAgY29uc3Qgem9vbSA9IHN3aXBlci56b29tO1xuXG4gICAgICAgIGlmIChnZXN0dXJlLiRzbGlkZUVsICYmIHN3aXBlci5wcmV2aW91c0luZGV4ICE9PSBzd2lwZXIuYWN0aXZlSW5kZXgpIHtcbiAgICAgICAgICBpZiAoZ2VzdHVyZS4kaW1hZ2VFbCkge1xuICAgICAgICAgICAgZ2VzdHVyZS4kaW1hZ2VFbC50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKDAsMCwwKSBzY2FsZSgxKScpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChnZXN0dXJlLiRpbWFnZVdyYXBFbCkge1xuICAgICAgICAgICAgZ2VzdHVyZS4kaW1hZ2VXcmFwRWwudHJhbnNmb3JtKCd0cmFuc2xhdGUzZCgwLDAsMCknKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB6b29tLnNjYWxlID0gMTtcbiAgICAgICAgICBjdXJyZW50U2NhbGUgPSAxO1xuICAgICAgICAgIGdlc3R1cmUuJHNsaWRlRWwgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgZ2VzdHVyZS4kaW1hZ2VFbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB6b29tSW4oZSkge1xuICAgICAgICBjb25zdCB6b29tID0gc3dpcGVyLnpvb207XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuem9vbTtcblxuICAgICAgICBpZiAoIWdlc3R1cmUuJHNsaWRlRWwpIHtcbiAgICAgICAgICBpZiAoZSAmJiBlLnRhcmdldCkge1xuICAgICAgICAgICAgZ2VzdHVyZS4kc2xpZGVFbCA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoYC4ke3N3aXBlci5wYXJhbXMuc2xpZGVDbGFzc31gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWdlc3R1cmUuJHNsaWRlRWwpIHtcbiAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQgJiYgc3dpcGVyLnZpcnR1YWwpIHtcbiAgICAgICAgICAgICAgZ2VzdHVyZS4kc2xpZGVFbCA9IHN3aXBlci4kd3JhcHBlckVsLmNoaWxkcmVuKGAuJHtzd2lwZXIucGFyYW1zLnNsaWRlQWN0aXZlQ2xhc3N9YCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBnZXN0dXJlLiRzbGlkZUVsID0gc3dpcGVyLnNsaWRlcy5lcShzd2lwZXIuYWN0aXZlSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGdlc3R1cmUuJGltYWdlRWwgPSBnZXN0dXJlLiRzbGlkZUVsLmZpbmQoYC4ke3BhcmFtcy5jb250YWluZXJDbGFzc31gKS5lcSgwKS5maW5kKCdwaWN0dXJlLCBpbWcsIHN2ZywgY2FudmFzLCAuc3dpcGVyLXpvb20tdGFyZ2V0JykuZXEoMCk7XG4gICAgICAgICAgZ2VzdHVyZS4kaW1hZ2VXcmFwRWwgPSBnZXN0dXJlLiRpbWFnZUVsLnBhcmVudChgLiR7cGFyYW1zLmNvbnRhaW5lckNsYXNzfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFnZXN0dXJlLiRpbWFnZUVsIHx8IGdlc3R1cmUuJGltYWdlRWwubGVuZ3RoID09PSAwIHx8ICFnZXN0dXJlLiRpbWFnZVdyYXBFbCB8fCBnZXN0dXJlLiRpbWFnZVdyYXBFbC5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICAgICAgc3dpcGVyLndyYXBwZXJFbC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgICAgIHN3aXBlci53cmFwcGVyRWwuc3R5bGUudG91Y2hBY3Rpb24gPSAnbm9uZSc7XG4gICAgICAgIH1cblxuICAgICAgICBnZXN0dXJlLiRzbGlkZUVsLmFkZENsYXNzKGAke3BhcmFtcy56b29tZWRTbGlkZUNsYXNzfWApO1xuICAgICAgICBsZXQgdG91Y2hYO1xuICAgICAgICBsZXQgdG91Y2hZO1xuICAgICAgICBsZXQgb2Zmc2V0WDtcbiAgICAgICAgbGV0IG9mZnNldFk7XG4gICAgICAgIGxldCBkaWZmWDtcbiAgICAgICAgbGV0IGRpZmZZO1xuICAgICAgICBsZXQgdHJhbnNsYXRlWDtcbiAgICAgICAgbGV0IHRyYW5zbGF0ZVk7XG4gICAgICAgIGxldCBpbWFnZVdpZHRoO1xuICAgICAgICBsZXQgaW1hZ2VIZWlnaHQ7XG4gICAgICAgIGxldCBzY2FsZWRXaWR0aDtcbiAgICAgICAgbGV0IHNjYWxlZEhlaWdodDtcbiAgICAgICAgbGV0IHRyYW5zbGF0ZU1pblg7XG4gICAgICAgIGxldCB0cmFuc2xhdGVNaW5ZO1xuICAgICAgICBsZXQgdHJhbnNsYXRlTWF4WDtcbiAgICAgICAgbGV0IHRyYW5zbGF0ZU1heFk7XG4gICAgICAgIGxldCBzbGlkZVdpZHRoO1xuICAgICAgICBsZXQgc2xpZGVIZWlnaHQ7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBpbWFnZS50b3VjaGVzU3RhcnQueCA9PT0gJ3VuZGVmaW5lZCcgJiYgZSkge1xuICAgICAgICAgIHRvdWNoWCA9IGUudHlwZSA9PT0gJ3RvdWNoZW5kJyA/IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggOiBlLnBhZ2VYO1xuICAgICAgICAgIHRvdWNoWSA9IGUudHlwZSA9PT0gJ3RvdWNoZW5kJyA/IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVkgOiBlLnBhZ2VZO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvdWNoWCA9IGltYWdlLnRvdWNoZXNTdGFydC54O1xuICAgICAgICAgIHRvdWNoWSA9IGltYWdlLnRvdWNoZXNTdGFydC55O1xuICAgICAgICB9XG5cbiAgICAgICAgem9vbS5zY2FsZSA9IGdlc3R1cmUuJGltYWdlV3JhcEVsLmF0dHIoJ2RhdGEtc3dpcGVyLXpvb20nKSB8fCBwYXJhbXMubWF4UmF0aW87XG4gICAgICAgIGN1cnJlbnRTY2FsZSA9IGdlc3R1cmUuJGltYWdlV3JhcEVsLmF0dHIoJ2RhdGEtc3dpcGVyLXpvb20nKSB8fCBwYXJhbXMubWF4UmF0aW87XG5cbiAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICBzbGlkZVdpZHRoID0gZ2VzdHVyZS4kc2xpZGVFbFswXS5vZmZzZXRXaWR0aDtcbiAgICAgICAgICBzbGlkZUhlaWdodCA9IGdlc3R1cmUuJHNsaWRlRWxbMF0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgIG9mZnNldFggPSBnZXN0dXJlLiRzbGlkZUVsLm9mZnNldCgpLmxlZnQgKyB3aW5kb3cuc2Nyb2xsWDtcbiAgICAgICAgICBvZmZzZXRZID0gZ2VzdHVyZS4kc2xpZGVFbC5vZmZzZXQoKS50b3AgKyB3aW5kb3cuc2Nyb2xsWTtcbiAgICAgICAgICBkaWZmWCA9IG9mZnNldFggKyBzbGlkZVdpZHRoIC8gMiAtIHRvdWNoWDtcbiAgICAgICAgICBkaWZmWSA9IG9mZnNldFkgKyBzbGlkZUhlaWdodCAvIDIgLSB0b3VjaFk7XG4gICAgICAgICAgaW1hZ2VXaWR0aCA9IGdlc3R1cmUuJGltYWdlRWxbMF0ub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgaW1hZ2VIZWlnaHQgPSBnZXN0dXJlLiRpbWFnZUVsWzBdLm9mZnNldEhlaWdodDtcbiAgICAgICAgICBzY2FsZWRXaWR0aCA9IGltYWdlV2lkdGggKiB6b29tLnNjYWxlO1xuICAgICAgICAgIHNjYWxlZEhlaWdodCA9IGltYWdlSGVpZ2h0ICogem9vbS5zY2FsZTtcbiAgICAgICAgICB0cmFuc2xhdGVNaW5YID0gTWF0aC5taW4oc2xpZGVXaWR0aCAvIDIgLSBzY2FsZWRXaWR0aCAvIDIsIDApO1xuICAgICAgICAgIHRyYW5zbGF0ZU1pblkgPSBNYXRoLm1pbihzbGlkZUhlaWdodCAvIDIgLSBzY2FsZWRIZWlnaHQgLyAyLCAwKTtcbiAgICAgICAgICB0cmFuc2xhdGVNYXhYID0gLXRyYW5zbGF0ZU1pblg7XG4gICAgICAgICAgdHJhbnNsYXRlTWF4WSA9IC10cmFuc2xhdGVNaW5ZO1xuICAgICAgICAgIHRyYW5zbGF0ZVggPSBkaWZmWCAqIHpvb20uc2NhbGU7XG4gICAgICAgICAgdHJhbnNsYXRlWSA9IGRpZmZZICogem9vbS5zY2FsZTtcblxuICAgICAgICAgIGlmICh0cmFuc2xhdGVYIDwgdHJhbnNsYXRlTWluWCkge1xuICAgICAgICAgICAgdHJhbnNsYXRlWCA9IHRyYW5zbGF0ZU1pblg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRyYW5zbGF0ZVggPiB0cmFuc2xhdGVNYXhYKSB7XG4gICAgICAgICAgICB0cmFuc2xhdGVYID0gdHJhbnNsYXRlTWF4WDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHJhbnNsYXRlWSA8IHRyYW5zbGF0ZU1pblkpIHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZVkgPSB0cmFuc2xhdGVNaW5ZO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0cmFuc2xhdGVZID4gdHJhbnNsYXRlTWF4WSkge1xuICAgICAgICAgICAgdHJhbnNsYXRlWSA9IHRyYW5zbGF0ZU1heFk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRyYW5zbGF0ZVggPSAwO1xuICAgICAgICAgIHRyYW5zbGF0ZVkgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2VzdHVyZS4kaW1hZ2VXcmFwRWwudHJhbnNpdGlvbigzMDApLnRyYW5zZm9ybShgdHJhbnNsYXRlM2QoJHt0cmFuc2xhdGVYfXB4LCAke3RyYW5zbGF0ZVl9cHgsMClgKTtcbiAgICAgICAgZ2VzdHVyZS4kaW1hZ2VFbC50cmFuc2l0aW9uKDMwMCkudHJhbnNmb3JtKGB0cmFuc2xhdGUzZCgwLDAsMCkgc2NhbGUoJHt6b29tLnNjYWxlfSlgKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gem9vbU91dCgpIHtcbiAgICAgICAgY29uc3Qgem9vbSA9IHN3aXBlci56b29tO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnpvb207XG5cbiAgICAgICAgaWYgKCFnZXN0dXJlLiRzbGlkZUVsKSB7XG4gICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCAmJiBzd2lwZXIudmlydHVhbCkge1xuICAgICAgICAgICAgZ2VzdHVyZS4kc2xpZGVFbCA9IHN3aXBlci4kd3JhcHBlckVsLmNoaWxkcmVuKGAuJHtzd2lwZXIucGFyYW1zLnNsaWRlQWN0aXZlQ2xhc3N9YCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdlc3R1cmUuJHNsaWRlRWwgPSBzd2lwZXIuc2xpZGVzLmVxKHN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZ2VzdHVyZS4kaW1hZ2VFbCA9IGdlc3R1cmUuJHNsaWRlRWwuZmluZChgLiR7cGFyYW1zLmNvbnRhaW5lckNsYXNzfWApLmVxKDApLmZpbmQoJ3BpY3R1cmUsIGltZywgc3ZnLCBjYW52YXMsIC5zd2lwZXItem9vbS10YXJnZXQnKS5lcSgwKTtcbiAgICAgICAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbCA9IGdlc3R1cmUuJGltYWdlRWwucGFyZW50KGAuJHtwYXJhbXMuY29udGFpbmVyQ2xhc3N9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWdlc3R1cmUuJGltYWdlRWwgfHwgZ2VzdHVyZS4kaW1hZ2VFbC5sZW5ndGggPT09IDAgfHwgIWdlc3R1cmUuJGltYWdlV3JhcEVsIHx8IGdlc3R1cmUuJGltYWdlV3JhcEVsLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgICBzd2lwZXIud3JhcHBlckVsLnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgICAgc3dpcGVyLndyYXBwZXJFbC5zdHlsZS50b3VjaEFjdGlvbiA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgem9vbS5zY2FsZSA9IDE7XG4gICAgICAgIGN1cnJlbnRTY2FsZSA9IDE7XG4gICAgICAgIGdlc3R1cmUuJGltYWdlV3JhcEVsLnRyYW5zaXRpb24oMzAwKS50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKDAsMCwwKScpO1xuICAgICAgICBnZXN0dXJlLiRpbWFnZUVsLnRyYW5zaXRpb24oMzAwKS50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKDAsMCwwKSBzY2FsZSgxKScpO1xuICAgICAgICBnZXN0dXJlLiRzbGlkZUVsLnJlbW92ZUNsYXNzKGAke3BhcmFtcy56b29tZWRTbGlkZUNsYXNzfWApO1xuICAgICAgICBnZXN0dXJlLiRzbGlkZUVsID0gdW5kZWZpbmVkO1xuICAgICAgfSAvLyBUb2dnbGUgWm9vbVxuXG5cbiAgICAgIGZ1bmN0aW9uIHpvb21Ub2dnbGUoZSkge1xuICAgICAgICBjb25zdCB6b29tID0gc3dpcGVyLnpvb207XG5cbiAgICAgICAgaWYgKHpvb20uc2NhbGUgJiYgem9vbS5zY2FsZSAhPT0gMSkge1xuICAgICAgICAgIC8vIFpvb20gT3V0XG4gICAgICAgICAgem9vbU91dCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFpvb20gSW5cbiAgICAgICAgICB6b29tSW4oZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ2V0TGlzdGVuZXJzKCkge1xuICAgICAgICBjb25zdCBzdXBwb3J0ID0gc3dpcGVyLnN1cHBvcnQ7XG4gICAgICAgIGNvbnN0IHBhc3NpdmVMaXN0ZW5lciA9IHN3aXBlci50b3VjaEV2ZW50cy5zdGFydCA9PT0gJ3RvdWNoc3RhcnQnICYmIHN1cHBvcnQucGFzc2l2ZUxpc3RlbmVyICYmIHN3aXBlci5wYXJhbXMucGFzc2l2ZUxpc3RlbmVycyA/IHtcbiAgICAgICAgICBwYXNzaXZlOiB0cnVlLFxuICAgICAgICAgIGNhcHR1cmU6IGZhbHNlXG4gICAgICAgIH0gOiBmYWxzZTtcbiAgICAgICAgY29uc3QgYWN0aXZlTGlzdGVuZXJXaXRoQ2FwdHVyZSA9IHN1cHBvcnQucGFzc2l2ZUxpc3RlbmVyID8ge1xuICAgICAgICAgIHBhc3NpdmU6IGZhbHNlLFxuICAgICAgICAgIGNhcHR1cmU6IHRydWVcbiAgICAgICAgfSA6IHRydWU7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcGFzc2l2ZUxpc3RlbmVyLFxuICAgICAgICAgIGFjdGl2ZUxpc3RlbmVyV2l0aENhcHR1cmVcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ2V0U2xpZGVTZWxlY3RvcigpIHtcbiAgICAgICAgcmV0dXJuIGAuJHtzd2lwZXIucGFyYW1zLnNsaWRlQ2xhc3N9YDtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdG9nZ2xlR2VzdHVyZXMobWV0aG9kKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBwYXNzaXZlTGlzdGVuZXJcbiAgICAgICAgfSA9IGdldExpc3RlbmVycygpO1xuICAgICAgICBjb25zdCBzbGlkZVNlbGVjdG9yID0gZ2V0U2xpZGVTZWxlY3RvcigpO1xuICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbFttZXRob2RdKCdnZXN0dXJlc3RhcnQnLCBzbGlkZVNlbGVjdG9yLCBvbkdlc3R1cmVTdGFydCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWxbbWV0aG9kXSgnZ2VzdHVyZWNoYW5nZScsIHNsaWRlU2VsZWN0b3IsIG9uR2VzdHVyZUNoYW5nZSwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWxbbWV0aG9kXSgnZ2VzdHVyZWVuZCcsIHNsaWRlU2VsZWN0b3IsIG9uR2VzdHVyZUVuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZW5hYmxlR2VzdHVyZXMoKSB7XG4gICAgICAgIGlmIChnZXN0dXJlc0VuYWJsZWQpIHJldHVybjtcbiAgICAgICAgZ2VzdHVyZXNFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgdG9nZ2xlR2VzdHVyZXMoJ29uJyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGRpc2FibGVHZXN0dXJlcygpIHtcbiAgICAgICAgaWYgKCFnZXN0dXJlc0VuYWJsZWQpIHJldHVybjtcbiAgICAgICAgZ2VzdHVyZXNFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRvZ2dsZUdlc3R1cmVzKCdvZmYnKTtcbiAgICAgIH0gLy8gQXR0YWNoL0RldGFjaCBFdmVudHNcblxuXG4gICAgICBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgICAgIGNvbnN0IHpvb20gPSBzd2lwZXIuem9vbTtcbiAgICAgICAgaWYgKHpvb20uZW5hYmxlZCkgcmV0dXJuO1xuICAgICAgICB6b29tLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICBjb25zdCBzdXBwb3J0ID0gc3dpcGVyLnN1cHBvcnQ7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBwYXNzaXZlTGlzdGVuZXIsXG4gICAgICAgICAgYWN0aXZlTGlzdGVuZXJXaXRoQ2FwdHVyZVxuICAgICAgICB9ID0gZ2V0TGlzdGVuZXJzKCk7XG4gICAgICAgIGNvbnN0IHNsaWRlU2VsZWN0b3IgPSBnZXRTbGlkZVNlbGVjdG9yKCk7IC8vIFNjYWxlIGltYWdlXG5cbiAgICAgICAgaWYgKHN1cHBvcnQuZ2VzdHVyZXMpIHtcbiAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vbihzd2lwZXIudG91Y2hFdmVudHMuc3RhcnQsIGVuYWJsZUdlc3R1cmVzLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsLm9uKHN3aXBlci50b3VjaEV2ZW50cy5lbmQsIGRpc2FibGVHZXN0dXJlcywgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgfSBlbHNlIGlmIChzd2lwZXIudG91Y2hFdmVudHMuc3RhcnQgPT09ICd0b3VjaHN0YXJ0Jykge1xuICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsLm9uKHN3aXBlci50b3VjaEV2ZW50cy5zdGFydCwgc2xpZGVTZWxlY3Rvciwgb25HZXN0dXJlU3RhcnQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwub24oc3dpcGVyLnRvdWNoRXZlbnRzLm1vdmUsIHNsaWRlU2VsZWN0b3IsIG9uR2VzdHVyZUNoYW5nZSwgYWN0aXZlTGlzdGVuZXJXaXRoQ2FwdHVyZSk7XG4gICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwub24oc3dpcGVyLnRvdWNoRXZlbnRzLmVuZCwgc2xpZGVTZWxlY3Rvciwgb25HZXN0dXJlRW5kLCBwYXNzaXZlTGlzdGVuZXIpO1xuXG4gICAgICAgICAgaWYgKHN3aXBlci50b3VjaEV2ZW50cy5jYW5jZWwpIHtcbiAgICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsLm9uKHN3aXBlci50b3VjaEV2ZW50cy5jYW5jZWwsIHNsaWRlU2VsZWN0b3IsIG9uR2VzdHVyZUVuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gLy8gTW92ZSBpbWFnZVxuXG5cbiAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwub24oc3dpcGVyLnRvdWNoRXZlbnRzLm1vdmUsIGAuJHtzd2lwZXIucGFyYW1zLnpvb20uY29udGFpbmVyQ2xhc3N9YCwgb25Ub3VjaE1vdmUsIGFjdGl2ZUxpc3RlbmVyV2l0aENhcHR1cmUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgICAgICBjb25zdCB6b29tID0gc3dpcGVyLnpvb207XG4gICAgICAgIGlmICghem9vbS5lbmFibGVkKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHN1cHBvcnQgPSBzd2lwZXIuc3VwcG9ydDtcbiAgICAgICAgem9vbS5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBwYXNzaXZlTGlzdGVuZXIsXG4gICAgICAgICAgYWN0aXZlTGlzdGVuZXJXaXRoQ2FwdHVyZVxuICAgICAgICB9ID0gZ2V0TGlzdGVuZXJzKCk7XG4gICAgICAgIGNvbnN0IHNsaWRlU2VsZWN0b3IgPSBnZXRTbGlkZVNlbGVjdG9yKCk7IC8vIFNjYWxlIGltYWdlXG5cbiAgICAgICAgaWYgKHN1cHBvcnQuZ2VzdHVyZXMpIHtcbiAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vZmYoc3dpcGVyLnRvdWNoRXZlbnRzLnN0YXJ0LCBlbmFibGVHZXN0dXJlcywgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vZmYoc3dpcGVyLnRvdWNoRXZlbnRzLmVuZCwgZGlzYWJsZUdlc3R1cmVzLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICB9IGVsc2UgaWYgKHN3aXBlci50b3VjaEV2ZW50cy5zdGFydCA9PT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwub2ZmKHN3aXBlci50b3VjaEV2ZW50cy5zdGFydCwgc2xpZGVTZWxlY3Rvciwgb25HZXN0dXJlU3RhcnQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwub2ZmKHN3aXBlci50b3VjaEV2ZW50cy5tb3ZlLCBzbGlkZVNlbGVjdG9yLCBvbkdlc3R1cmVDaGFuZ2UsIGFjdGl2ZUxpc3RlbmVyV2l0aENhcHR1cmUpO1xuICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsLm9mZihzd2lwZXIudG91Y2hFdmVudHMuZW5kLCBzbGlkZVNlbGVjdG9yLCBvbkdlc3R1cmVFbmQsIHBhc3NpdmVMaXN0ZW5lcik7XG5cbiAgICAgICAgICBpZiAoc3dpcGVyLnRvdWNoRXZlbnRzLmNhbmNlbCkge1xuICAgICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwub2ZmKHN3aXBlci50b3VjaEV2ZW50cy5jYW5jZWwsIHNsaWRlU2VsZWN0b3IsIG9uR2VzdHVyZUVuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gLy8gTW92ZSBpbWFnZVxuXG5cbiAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwub2ZmKHN3aXBlci50b3VjaEV2ZW50cy5tb3ZlLCBgLiR7c3dpcGVyLnBhcmFtcy56b29tLmNvbnRhaW5lckNsYXNzfWAsIG9uVG91Y2hNb3ZlLCBhY3RpdmVMaXN0ZW5lcldpdGhDYXB0dXJlKTtcbiAgICAgIH1cblxuICAgICAgb24oJ2luaXQnLCAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLnpvb20uZW5hYmxlZCkge1xuICAgICAgICAgIGVuYWJsZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgICAgICBkaXNhYmxlKCk7XG4gICAgICB9KTtcbiAgICAgIG9uKCd0b3VjaFN0YXJ0JywgKF9zLCBlKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyLnpvb20uZW5hYmxlZCkgcmV0dXJuO1xuICAgICAgICBvblRvdWNoU3RhcnQoZSk7XG4gICAgICB9KTtcbiAgICAgIG9uKCd0b3VjaEVuZCcsIChfcywgZSkgPT4ge1xuICAgICAgICBpZiAoIXN3aXBlci56b29tLmVuYWJsZWQpIHJldHVybjtcbiAgICAgICAgb25Ub3VjaEVuZCgpO1xuICAgICAgfSk7XG4gICAgICBvbignZG91YmxlVGFwJywgKF9zLCBlKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyLmFuaW1hdGluZyAmJiBzd2lwZXIucGFyYW1zLnpvb20uZW5hYmxlZCAmJiBzd2lwZXIuem9vbS5lbmFibGVkICYmIHN3aXBlci5wYXJhbXMuem9vbS50b2dnbGUpIHtcbiAgICAgICAgICB6b29tVG9nZ2xlKGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9uKCd0cmFuc2l0aW9uRW5kJywgKCkgPT4ge1xuICAgICAgICBpZiAoc3dpcGVyLnpvb20uZW5hYmxlZCAmJiBzd2lwZXIucGFyYW1zLnpvb20uZW5hYmxlZCkge1xuICAgICAgICAgIG9uVHJhbnNpdGlvbkVuZCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9uKCdzbGlkZUNoYW5nZScsICgpID0+IHtcbiAgICAgICAgaWYgKHN3aXBlci56b29tLmVuYWJsZWQgJiYgc3dpcGVyLnBhcmFtcy56b29tLmVuYWJsZWQgJiYgc3dpcGVyLnBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICAgICAgb25UcmFuc2l0aW9uRW5kKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgT2JqZWN0LmFzc2lnbihzd2lwZXIuem9vbSwge1xuICAgICAgICBlbmFibGUsXG4gICAgICAgIGRpc2FibGUsXG4gICAgICAgIGluOiB6b29tSW4sXG4gICAgICAgIG91dDogem9vbU91dCxcbiAgICAgICAgdG9nZ2xlOiB6b29tVG9nZ2xlXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBMYXp5KF9yZWYpIHtcbiAgICAgIGxldCB7XG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgZXh0ZW5kUGFyYW1zLFxuICAgICAgICBvbixcbiAgICAgICAgZW1pdFxuICAgICAgfSA9IF9yZWY7XG4gICAgICBleHRlbmRQYXJhbXMoe1xuICAgICAgICBsYXp5OiB7XG4gICAgICAgICAgY2hlY2tJblZpZXc6IGZhbHNlLFxuICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgIGxvYWRQcmV2TmV4dDogZmFsc2UsXG4gICAgICAgICAgbG9hZFByZXZOZXh0QW1vdW50OiAxLFxuICAgICAgICAgIGxvYWRPblRyYW5zaXRpb25TdGFydDogZmFsc2UsXG4gICAgICAgICAgc2Nyb2xsaW5nRWxlbWVudDogJycsXG4gICAgICAgICAgZWxlbWVudENsYXNzOiAnc3dpcGVyLWxhenknLFxuICAgICAgICAgIGxvYWRpbmdDbGFzczogJ3N3aXBlci1sYXp5LWxvYWRpbmcnLFxuICAgICAgICAgIGxvYWRlZENsYXNzOiAnc3dpcGVyLWxhenktbG9hZGVkJyxcbiAgICAgICAgICBwcmVsb2FkZXJDbGFzczogJ3N3aXBlci1sYXp5LXByZWxvYWRlcidcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzd2lwZXIubGF6eSA9IHt9O1xuICAgICAgbGV0IHNjcm9sbEhhbmRsZXJBdHRhY2hlZCA9IGZhbHNlO1xuICAgICAgbGV0IGluaXRpYWxJbWFnZUxvYWRlZCA9IGZhbHNlO1xuXG4gICAgICBmdW5jdGlvbiBsb2FkSW5TbGlkZShpbmRleCwgbG9hZEluRHVwbGljYXRlKSB7XG4gICAgICAgIGlmIChsb2FkSW5EdXBsaWNhdGUgPT09IHZvaWQgMCkge1xuICAgICAgICAgIGxvYWRJbkR1cGxpY2F0ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLmxhenk7XG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gICAgICAgIGlmIChzd2lwZXIuc2xpZGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICBjb25zdCBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZDtcbiAgICAgICAgY29uc3QgJHNsaWRlRWwgPSBpc1ZpcnR1YWwgPyBzd2lwZXIuJHdyYXBwZXJFbC5jaGlsZHJlbihgLiR7c3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzfVtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIiR7aW5kZXh9XCJdYCkgOiBzd2lwZXIuc2xpZGVzLmVxKGluZGV4KTtcbiAgICAgICAgY29uc3QgJGltYWdlcyA9ICRzbGlkZUVsLmZpbmQoYC4ke3BhcmFtcy5lbGVtZW50Q2xhc3N9Om5vdCguJHtwYXJhbXMubG9hZGVkQ2xhc3N9KTpub3QoLiR7cGFyYW1zLmxvYWRpbmdDbGFzc30pYCk7XG5cbiAgICAgICAgaWYgKCRzbGlkZUVsLmhhc0NsYXNzKHBhcmFtcy5lbGVtZW50Q2xhc3MpICYmICEkc2xpZGVFbC5oYXNDbGFzcyhwYXJhbXMubG9hZGVkQ2xhc3MpICYmICEkc2xpZGVFbC5oYXNDbGFzcyhwYXJhbXMubG9hZGluZ0NsYXNzKSkge1xuICAgICAgICAgICRpbWFnZXMucHVzaCgkc2xpZGVFbFswXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJGltYWdlcy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgJGltYWdlcy5lYWNoKGltYWdlRWwgPT4ge1xuICAgICAgICAgIGNvbnN0ICRpbWFnZUVsID0gJChpbWFnZUVsKTtcbiAgICAgICAgICAkaW1hZ2VFbC5hZGRDbGFzcyhwYXJhbXMubG9hZGluZ0NsYXNzKTtcbiAgICAgICAgICBjb25zdCBiYWNrZ3JvdW5kID0gJGltYWdlRWwuYXR0cignZGF0YS1iYWNrZ3JvdW5kJyk7XG4gICAgICAgICAgY29uc3Qgc3JjID0gJGltYWdlRWwuYXR0cignZGF0YS1zcmMnKTtcbiAgICAgICAgICBjb25zdCBzcmNzZXQgPSAkaW1hZ2VFbC5hdHRyKCdkYXRhLXNyY3NldCcpO1xuICAgICAgICAgIGNvbnN0IHNpemVzID0gJGltYWdlRWwuYXR0cignZGF0YS1zaXplcycpO1xuICAgICAgICAgIGNvbnN0ICRwaWN0dXJlRWwgPSAkaW1hZ2VFbC5wYXJlbnQoJ3BpY3R1cmUnKTtcbiAgICAgICAgICBzd2lwZXIubG9hZEltYWdlKCRpbWFnZUVsWzBdLCBzcmMgfHwgYmFja2dyb3VuZCwgc3Jjc2V0LCBzaXplcywgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3dpcGVyID09PSAndW5kZWZpbmVkJyB8fCBzd2lwZXIgPT09IG51bGwgfHwgIXN3aXBlciB8fCBzd2lwZXIgJiYgIXN3aXBlci5wYXJhbXMgfHwgc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAoYmFja2dyb3VuZCkge1xuICAgICAgICAgICAgICAkaW1hZ2VFbC5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCBgdXJsKFwiJHtiYWNrZ3JvdW5kfVwiKWApO1xuICAgICAgICAgICAgICAkaW1hZ2VFbC5yZW1vdmVBdHRyKCdkYXRhLWJhY2tncm91bmQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChzcmNzZXQpIHtcbiAgICAgICAgICAgICAgICAkaW1hZ2VFbC5hdHRyKCdzcmNzZXQnLCBzcmNzZXQpO1xuICAgICAgICAgICAgICAgICRpbWFnZUVsLnJlbW92ZUF0dHIoJ2RhdGEtc3Jjc2V0Jyk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoc2l6ZXMpIHtcbiAgICAgICAgICAgICAgICAkaW1hZ2VFbC5hdHRyKCdzaXplcycsIHNpemVzKTtcbiAgICAgICAgICAgICAgICAkaW1hZ2VFbC5yZW1vdmVBdHRyKCdkYXRhLXNpemVzJyk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoJHBpY3R1cmVFbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkcGljdHVyZUVsLmNoaWxkcmVuKCdzb3VyY2UnKS5lYWNoKHNvdXJjZUVsID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0ICRzb3VyY2UgPSAkKHNvdXJjZUVsKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKCRzb3VyY2UuYXR0cignZGF0YS1zcmNzZXQnKSkge1xuICAgICAgICAgICAgICAgICAgICAkc291cmNlLmF0dHIoJ3NyY3NldCcsICRzb3VyY2UuYXR0cignZGF0YS1zcmNzZXQnKSk7XG4gICAgICAgICAgICAgICAgICAgICRzb3VyY2UucmVtb3ZlQXR0cignZGF0YS1zcmNzZXQnKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgICAgICAgICAkaW1hZ2VFbC5hdHRyKCdzcmMnLCBzcmMpO1xuICAgICAgICAgICAgICAgICRpbWFnZUVsLnJlbW92ZUF0dHIoJ2RhdGEtc3JjJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJGltYWdlRWwuYWRkQ2xhc3MocGFyYW1zLmxvYWRlZENsYXNzKS5yZW1vdmVDbGFzcyhwYXJhbXMubG9hZGluZ0NsYXNzKTtcbiAgICAgICAgICAgICRzbGlkZUVsLmZpbmQoYC4ke3BhcmFtcy5wcmVsb2FkZXJDbGFzc31gKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCAmJiBsb2FkSW5EdXBsaWNhdGUpIHtcbiAgICAgICAgICAgICAgY29uc3Qgc2xpZGVPcmlnaW5hbEluZGV4ID0gJHNsaWRlRWwuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKTtcblxuICAgICAgICAgICAgICBpZiAoJHNsaWRlRWwuaGFzQ2xhc3Moc3dpcGVyLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsU2xpZGUgPSBzd2lwZXIuJHdyYXBwZXJFbC5jaGlsZHJlbihgW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJHtzbGlkZU9yaWdpbmFsSW5kZXh9XCJdOm5vdCguJHtzd2lwZXIucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3N9KWApO1xuICAgICAgICAgICAgICAgIGxvYWRJblNsaWRlKG9yaWdpbmFsU2xpZGUuaW5kZXgoKSwgZmFsc2UpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGR1cGxpY2F0ZWRTbGlkZSA9IHN3aXBlci4kd3JhcHBlckVsLmNoaWxkcmVuKGAuJHtzd2lwZXIucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3N9W2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJHtzbGlkZU9yaWdpbmFsSW5kZXh9XCJdYCk7XG4gICAgICAgICAgICAgICAgbG9hZEluU2xpZGUoZHVwbGljYXRlZFNsaWRlLmluZGV4KCksIGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbWl0KCdsYXp5SW1hZ2VSZWFkeScsICRzbGlkZUVsWzBdLCAkaW1hZ2VFbFswXSk7XG5cbiAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmF1dG9IZWlnaHQpIHtcbiAgICAgICAgICAgICAgc3dpcGVyLnVwZGF0ZUF1dG9IZWlnaHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBlbWl0KCdsYXp5SW1hZ2VMb2FkJywgJHNsaWRlRWxbMF0sICRpbWFnZUVsWzBdKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGxvYWQoKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAkd3JhcHBlckVsLFxuICAgICAgICAgIHBhcmFtczogc3dpcGVyUGFyYW1zLFxuICAgICAgICAgIHNsaWRlcyxcbiAgICAgICAgICBhY3RpdmVJbmRleFxuICAgICAgICB9ID0gc3dpcGVyO1xuICAgICAgICBjb25zdCBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXJQYXJhbXMudmlydHVhbC5lbmFibGVkO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXJQYXJhbXMubGF6eTtcbiAgICAgICAgbGV0IHNsaWRlc1BlclZpZXcgPSBzd2lwZXJQYXJhbXMuc2xpZGVzUGVyVmlldztcblxuICAgICAgICBpZiAoc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldyA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzbGlkZUV4aXN0KGluZGV4KSB7XG4gICAgICAgICAgaWYgKGlzVmlydHVhbCkge1xuICAgICAgICAgICAgaWYgKCR3cmFwcGVyRWwuY2hpbGRyZW4oYC4ke3N3aXBlclBhcmFtcy5zbGlkZUNsYXNzfVtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIiR7aW5kZXh9XCJdYCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoc2xpZGVzW2luZGV4XSkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzbGlkZUluZGV4KHNsaWRlRWwpIHtcbiAgICAgICAgICBpZiAoaXNWaXJ0dWFsKSB7XG4gICAgICAgICAgICByZXR1cm4gJChzbGlkZUVsKS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiAkKHNsaWRlRWwpLmluZGV4KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWluaXRpYWxJbWFnZUxvYWRlZCkgaW5pdGlhbEltYWdlTG9hZGVkID0gdHJ1ZTtcblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzKSB7XG4gICAgICAgICAgJHdyYXBwZXJFbC5jaGlsZHJlbihgLiR7c3dpcGVyUGFyYW1zLnNsaWRlVmlzaWJsZUNsYXNzfWApLmVhY2goc2xpZGVFbCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGlzVmlydHVhbCA/ICQoc2xpZGVFbCkuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSA6ICQoc2xpZGVFbCkuaW5kZXgoKTtcbiAgICAgICAgICAgIGxvYWRJblNsaWRlKGluZGV4KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChzbGlkZXNQZXJWaWV3ID4gMSkge1xuICAgICAgICAgIGZvciAobGV0IGkgPSBhY3RpdmVJbmRleDsgaSA8IGFjdGl2ZUluZGV4ICsgc2xpZGVzUGVyVmlldzsgaSArPSAxKSB7XG4gICAgICAgICAgICBpZiAoc2xpZGVFeGlzdChpKSkgbG9hZEluU2xpZGUoaSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvYWRJblNsaWRlKGFjdGl2ZUluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJhbXMubG9hZFByZXZOZXh0KSB7XG4gICAgICAgICAgaWYgKHNsaWRlc1BlclZpZXcgPiAxIHx8IHBhcmFtcy5sb2FkUHJldk5leHRBbW91bnQgJiYgcGFyYW1zLmxvYWRQcmV2TmV4dEFtb3VudCA+IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGFtb3VudCA9IHBhcmFtcy5sb2FkUHJldk5leHRBbW91bnQ7XG4gICAgICAgICAgICBjb25zdCBzcHYgPSBNYXRoLmNlaWwoc2xpZGVzUGVyVmlldyk7XG4gICAgICAgICAgICBjb25zdCBtYXhJbmRleCA9IE1hdGgubWluKGFjdGl2ZUluZGV4ICsgc3B2ICsgTWF0aC5tYXgoYW1vdW50LCBzcHYpLCBzbGlkZXMubGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbnN0IG1pbkluZGV4ID0gTWF0aC5tYXgoYWN0aXZlSW5kZXggLSBNYXRoLm1heChzcHYsIGFtb3VudCksIDApOyAvLyBOZXh0IFNsaWRlc1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gYWN0aXZlSW5kZXggKyBzcHY7IGkgPCBtYXhJbmRleDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgIGlmIChzbGlkZUV4aXN0KGkpKSBsb2FkSW5TbGlkZShpKTtcbiAgICAgICAgICAgIH0gLy8gUHJldiBTbGlkZXNcblxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gbWluSW5kZXg7IGkgPCBhY3RpdmVJbmRleDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgIGlmIChzbGlkZUV4aXN0KGkpKSBsb2FkSW5TbGlkZShpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbmV4dFNsaWRlID0gJHdyYXBwZXJFbC5jaGlsZHJlbihgLiR7c3dpcGVyUGFyYW1zLnNsaWRlTmV4dENsYXNzfWApO1xuICAgICAgICAgICAgaWYgKG5leHRTbGlkZS5sZW5ndGggPiAwKSBsb2FkSW5TbGlkZShzbGlkZUluZGV4KG5leHRTbGlkZSkpO1xuICAgICAgICAgICAgY29uc3QgcHJldlNsaWRlID0gJHdyYXBwZXJFbC5jaGlsZHJlbihgLiR7c3dpcGVyUGFyYW1zLnNsaWRlUHJldkNsYXNzfWApO1xuICAgICAgICAgICAgaWYgKHByZXZTbGlkZS5sZW5ndGggPiAwKSBsb2FkSW5TbGlkZShzbGlkZUluZGV4KHByZXZTbGlkZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBjaGVja0luVmlld09uTG9hZCgpIHtcbiAgICAgICAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG4gICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgY29uc3QgJHNjcm9sbEVsZW1lbnQgPSBzd2lwZXIucGFyYW1zLmxhenkuc2Nyb2xsaW5nRWxlbWVudCA/ICQoc3dpcGVyLnBhcmFtcy5sYXp5LnNjcm9sbGluZ0VsZW1lbnQpIDogJCh3aW5kb3cpO1xuICAgICAgICBjb25zdCBpc1dpbmRvdyA9ICRzY3JvbGxFbGVtZW50WzBdID09PSB3aW5kb3c7XG4gICAgICAgIGNvbnN0IHNjcm9sbEVsZW1lbnRXaWR0aCA9IGlzV2luZG93ID8gd2luZG93LmlubmVyV2lkdGggOiAkc2Nyb2xsRWxlbWVudFswXS5vZmZzZXRXaWR0aDtcbiAgICAgICAgY29uc3Qgc2Nyb2xsRWxlbWVudEhlaWdodCA9IGlzV2luZG93ID8gd2luZG93LmlubmVySGVpZ2h0IDogJHNjcm9sbEVsZW1lbnRbMF0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBjb25zdCBzd2lwZXJPZmZzZXQgPSBzd2lwZXIuJGVsLm9mZnNldCgpO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgcnRsVHJhbnNsYXRlOiBydGxcbiAgICAgICAgfSA9IHN3aXBlcjtcbiAgICAgICAgbGV0IGluVmlldyA9IGZhbHNlO1xuICAgICAgICBpZiAocnRsKSBzd2lwZXJPZmZzZXQubGVmdCAtPSBzd2lwZXIuJGVsWzBdLnNjcm9sbExlZnQ7XG4gICAgICAgIGNvbnN0IHN3aXBlckNvb3JkID0gW1tzd2lwZXJPZmZzZXQubGVmdCwgc3dpcGVyT2Zmc2V0LnRvcF0sIFtzd2lwZXJPZmZzZXQubGVmdCArIHN3aXBlci53aWR0aCwgc3dpcGVyT2Zmc2V0LnRvcF0sIFtzd2lwZXJPZmZzZXQubGVmdCwgc3dpcGVyT2Zmc2V0LnRvcCArIHN3aXBlci5oZWlnaHRdLCBbc3dpcGVyT2Zmc2V0LmxlZnQgKyBzd2lwZXIud2lkdGgsIHN3aXBlck9mZnNldC50b3AgKyBzd2lwZXIuaGVpZ2h0XV07XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2lwZXJDb29yZC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGNvbnN0IHBvaW50ID0gc3dpcGVyQ29vcmRbaV07XG5cbiAgICAgICAgICBpZiAocG9pbnRbMF0gPj0gMCAmJiBwb2ludFswXSA8PSBzY3JvbGxFbGVtZW50V2lkdGggJiYgcG9pbnRbMV0gPj0gMCAmJiBwb2ludFsxXSA8PSBzY3JvbGxFbGVtZW50SGVpZ2h0KSB7XG4gICAgICAgICAgICBpZiAocG9pbnRbMF0gPT09IDAgJiYgcG9pbnRbMV0gPT09IDApIGNvbnRpbnVlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICAgICAgICAgIGluVmlldyA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFzc2l2ZUxpc3RlbmVyID0gc3dpcGVyLnRvdWNoRXZlbnRzLnN0YXJ0ID09PSAndG91Y2hzdGFydCcgJiYgc3dpcGVyLnN1cHBvcnQucGFzc2l2ZUxpc3RlbmVyICYmIHN3aXBlci5wYXJhbXMucGFzc2l2ZUxpc3RlbmVycyA/IHtcbiAgICAgICAgICBwYXNzaXZlOiB0cnVlLFxuICAgICAgICAgIGNhcHR1cmU6IGZhbHNlXG4gICAgICAgIH0gOiBmYWxzZTtcblxuICAgICAgICBpZiAoaW5WaWV3KSB7XG4gICAgICAgICAgbG9hZCgpO1xuICAgICAgICAgICRzY3JvbGxFbGVtZW50Lm9mZignc2Nyb2xsJywgY2hlY2tJblZpZXdPbkxvYWQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICAgIH0gZWxzZSBpZiAoIXNjcm9sbEhhbmRsZXJBdHRhY2hlZCkge1xuICAgICAgICAgIHNjcm9sbEhhbmRsZXJBdHRhY2hlZCA9IHRydWU7XG4gICAgICAgICAgJHNjcm9sbEVsZW1lbnQub24oJ3Njcm9sbCcsIGNoZWNrSW5WaWV3T25Mb2FkLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG9uKCdiZWZvcmVJbml0JywgKCkgPT4ge1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sYXp5LmVuYWJsZWQgJiYgc3dpcGVyLnBhcmFtcy5wcmVsb2FkSW1hZ2VzKSB7XG4gICAgICAgICAgc3dpcGVyLnBhcmFtcy5wcmVsb2FkSW1hZ2VzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ2luaXQnLCAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxhenkuZW5hYmxlZCkge1xuICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxhenkuY2hlY2tJblZpZXcpIHtcbiAgICAgICAgICAgIGNoZWNrSW5WaWV3T25Mb2FkKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvYWQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZnJlZU1vZGUgJiYgc3dpcGVyLnBhcmFtcy5mcmVlTW9kZS5lbmFibGVkICYmICFzd2lwZXIucGFyYW1zLmZyZWVNb2RlLnN0aWNreSkge1xuICAgICAgICAgIGxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvbignc2Nyb2xsYmFyRHJhZ01vdmUgcmVzaXplIF9mcmVlTW9kZU5vTW9tZW50dW1SZWxlYXNlJywgKCkgPT4ge1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sYXp5LmVuYWJsZWQpIHtcbiAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sYXp5LmNoZWNrSW5WaWV3KSB7XG4gICAgICAgICAgICBjaGVja0luVmlld09uTG9hZCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2FkKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9uKCd0cmFuc2l0aW9uU3RhcnQnLCAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxhenkuZW5hYmxlZCkge1xuICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxhenkubG9hZE9uVHJhbnNpdGlvblN0YXJ0IHx8ICFzd2lwZXIucGFyYW1zLmxhenkubG9hZE9uVHJhbnNpdGlvblN0YXJ0ICYmICFpbml0aWFsSW1hZ2VMb2FkZWQpIHtcbiAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxhenkuY2hlY2tJblZpZXcpIHtcbiAgICAgICAgICAgICAgY2hlY2tJblZpZXdPbkxvYWQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGxvYWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ3RyYW5zaXRpb25FbmQnLCAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxhenkuZW5hYmxlZCAmJiAhc3dpcGVyLnBhcmFtcy5sYXp5LmxvYWRPblRyYW5zaXRpb25TdGFydCkge1xuICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxhenkuY2hlY2tJblZpZXcpIHtcbiAgICAgICAgICAgIGNoZWNrSW5WaWV3T25Mb2FkKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvYWQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ3NsaWRlQ2hhbmdlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgbGF6eSxcbiAgICAgICAgICBjc3NNb2RlLFxuICAgICAgICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3MsXG4gICAgICAgICAgdG91Y2hSZWxlYXNlT25FZGdlcyxcbiAgICAgICAgICByZXNpc3RhbmNlUmF0aW9cbiAgICAgICAgfSA9IHN3aXBlci5wYXJhbXM7XG5cbiAgICAgICAgaWYgKGxhenkuZW5hYmxlZCAmJiAoY3NzTW9kZSB8fCB3YXRjaFNsaWRlc1Byb2dyZXNzICYmICh0b3VjaFJlbGVhc2VPbkVkZ2VzIHx8IHJlc2lzdGFuY2VSYXRpbyA9PT0gMCkpKSB7XG4gICAgICAgICAgbG9hZCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgICAgICBpZiAoIXN3aXBlci4kZWwpIHJldHVybjtcbiAgICAgICAgc3dpcGVyLiRlbC5maW5kKGAuJHtzd2lwZXIucGFyYW1zLmxhenkubG9hZGluZ0NsYXNzfWApLnJlbW92ZUNsYXNzKHN3aXBlci5wYXJhbXMubGF6eS5sb2FkaW5nQ2xhc3MpO1xuICAgICAgfSk7XG4gICAgICBPYmplY3QuYXNzaWduKHN3aXBlci5sYXp5LCB7XG4gICAgICAgIGxvYWQsXG4gICAgICAgIGxvYWRJblNsaWRlXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiBlc2xpbnQgbm8tYml0d2lzZTogW1wiZXJyb3JcIiwgeyBcImFsbG93XCI6IFtcIj4+XCJdIH1dICovXG4gICAgZnVuY3Rpb24gQ29udHJvbGxlcihfcmVmKSB7XG4gICAgICBsZXQge1xuICAgICAgICBzd2lwZXIsXG4gICAgICAgIGV4dGVuZFBhcmFtcyxcbiAgICAgICAgb25cbiAgICAgIH0gPSBfcmVmO1xuICAgICAgZXh0ZW5kUGFyYW1zKHtcbiAgICAgICAgY29udHJvbGxlcjoge1xuICAgICAgICAgIGNvbnRyb2w6IHVuZGVmaW5lZCxcbiAgICAgICAgICBpbnZlcnNlOiBmYWxzZSxcbiAgICAgICAgICBieTogJ3NsaWRlJyAvLyBvciAnY29udGFpbmVyJ1xuXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgc3dpcGVyLmNvbnRyb2xsZXIgPSB7XG4gICAgICAgIGNvbnRyb2w6IHVuZGVmaW5lZFxuICAgICAgfTtcblxuICAgICAgZnVuY3Rpb24gTGluZWFyU3BsaW5lKHgsIHkpIHtcbiAgICAgICAgY29uc3QgYmluYXJ5U2VhcmNoID0gZnVuY3Rpb24gc2VhcmNoKCkge1xuICAgICAgICAgIGxldCBtYXhJbmRleDtcbiAgICAgICAgICBsZXQgbWluSW5kZXg7XG4gICAgICAgICAgbGV0IGd1ZXNzO1xuICAgICAgICAgIHJldHVybiAoYXJyYXksIHZhbCkgPT4ge1xuICAgICAgICAgICAgbWluSW5kZXggPSAtMTtcbiAgICAgICAgICAgIG1heEluZGV4ID0gYXJyYXkubGVuZ3RoO1xuXG4gICAgICAgICAgICB3aGlsZSAobWF4SW5kZXggLSBtaW5JbmRleCA+IDEpIHtcbiAgICAgICAgICAgICAgZ3Vlc3MgPSBtYXhJbmRleCArIG1pbkluZGV4ID4+IDE7XG5cbiAgICAgICAgICAgICAgaWYgKGFycmF5W2d1ZXNzXSA8PSB2YWwpIHtcbiAgICAgICAgICAgICAgICBtaW5JbmRleCA9IGd1ZXNzO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1heEluZGV4ID0gZ3Vlc3M7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG1heEluZGV4O1xuICAgICAgICAgIH07XG4gICAgICAgIH0oKTtcblxuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLmxhc3RJbmRleCA9IHgubGVuZ3RoIC0gMTsgLy8gR2l2ZW4gYW4geCB2YWx1ZSAoeDIpLCByZXR1cm4gdGhlIGV4cGVjdGVkIHkyIHZhbHVlOlxuICAgICAgICAvLyAoeDEseTEpIGlzIHRoZSBrbm93biBwb2ludCBiZWZvcmUgZ2l2ZW4gdmFsdWUsXG4gICAgICAgIC8vICh4Myx5MykgaXMgdGhlIGtub3duIHBvaW50IGFmdGVyIGdpdmVuIHZhbHVlLlxuXG4gICAgICAgIGxldCBpMTtcbiAgICAgICAgbGV0IGkzO1xuXG4gICAgICAgIHRoaXMuaW50ZXJwb2xhdGUgPSBmdW5jdGlvbiBpbnRlcnBvbGF0ZSh4Mikge1xuICAgICAgICAgIGlmICgheDIpIHJldHVybiAwOyAvLyBHZXQgdGhlIGluZGV4ZXMgb2YgeDEgYW5kIHgzICh0aGUgYXJyYXkgaW5kZXhlcyBiZWZvcmUgYW5kIGFmdGVyIGdpdmVuIHgyKTpcblxuICAgICAgICAgIGkzID0gYmluYXJ5U2VhcmNoKHRoaXMueCwgeDIpO1xuICAgICAgICAgIGkxID0gaTMgLSAxOyAvLyBXZSBoYXZlIG91ciBpbmRleGVzIGkxICYgaTMsIHNvIHdlIGNhbiBjYWxjdWxhdGUgYWxyZWFkeTpcbiAgICAgICAgICAvLyB5MiA6PSAoKHgy4oiSeDEpIMOXICh5M+KIknkxKSkgw7cgKHgz4oiSeDEpICsgeTFcblxuICAgICAgICAgIHJldHVybiAoeDIgLSB0aGlzLnhbaTFdKSAqICh0aGlzLnlbaTNdIC0gdGhpcy55W2kxXSkgLyAodGhpcy54W2kzXSAtIHRoaXMueFtpMV0pICsgdGhpcy55W2kxXTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0gLy8geHh4OiBmb3Igbm93IGkgd2lsbCBqdXN0IHNhdmUgb25lIHNwbGluZSBmdW5jdGlvbiB0byB0b1xuXG5cbiAgICAgIGZ1bmN0aW9uIGdldEludGVycG9sYXRlRnVuY3Rpb24oYykge1xuICAgICAgICBpZiAoIXN3aXBlci5jb250cm9sbGVyLnNwbGluZSkge1xuICAgICAgICAgIHN3aXBlci5jb250cm9sbGVyLnNwbGluZSA9IHN3aXBlci5wYXJhbXMubG9vcCA/IG5ldyBMaW5lYXJTcGxpbmUoc3dpcGVyLnNsaWRlc0dyaWQsIGMuc2xpZGVzR3JpZCkgOiBuZXcgTGluZWFyU3BsaW5lKHN3aXBlci5zbmFwR3JpZCwgYy5zbmFwR3JpZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2V0VHJhbnNsYXRlKF90LCBieUNvbnRyb2xsZXIpIHtcbiAgICAgICAgY29uc3QgY29udHJvbGxlZCA9IHN3aXBlci5jb250cm9sbGVyLmNvbnRyb2w7XG4gICAgICAgIGxldCBtdWx0aXBsaWVyO1xuICAgICAgICBsZXQgY29udHJvbGxlZFRyYW5zbGF0ZTtcbiAgICAgICAgY29uc3QgU3dpcGVyID0gc3dpcGVyLmNvbnN0cnVjdG9yO1xuXG4gICAgICAgIGZ1bmN0aW9uIHNldENvbnRyb2xsZWRUcmFuc2xhdGUoYykge1xuICAgICAgICAgIC8vIHRoaXMgd2lsbCBjcmVhdGUgYW4gSW50ZXJwb2xhdGUgZnVuY3Rpb24gYmFzZWQgb24gdGhlIHNuYXBHcmlkc1xuICAgICAgICAgIC8vIHggaXMgdGhlIEdyaWQgb2YgdGhlIHNjcm9sbGVkIHNjcm9sbGVyIGFuZCB5IHdpbGwgYmUgdGhlIGNvbnRyb2xsZWQgc2Nyb2xsZXJcbiAgICAgICAgICAvLyBpdCBtYWtlcyBzZW5zZSB0byBjcmVhdGUgdGhpcyBvbmx5IG9uY2UgYW5kIHJlY2FsbCBpdCBmb3IgdGhlIGludGVycG9sYXRpb25cbiAgICAgICAgICAvLyB0aGUgZnVuY3Rpb24gZG9lcyBhIGxvdCBvZiB2YWx1ZSBjYWNoaW5nIGZvciBwZXJmb3JtYW5jZVxuICAgICAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHN3aXBlci5ydGxUcmFuc2xhdGUgPyAtc3dpcGVyLnRyYW5zbGF0ZSA6IHN3aXBlci50cmFuc2xhdGU7XG5cbiAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5jb250cm9sbGVyLmJ5ID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICBnZXRJbnRlcnBvbGF0ZUZ1bmN0aW9uKGMpOyAvLyBpIGFtIG5vdCBzdXJlIHdoeSB0aGUgdmFsdWVzIGhhdmUgdG8gYmUgbXVsdGlwbGljYXRlZCB0aGlzIHdheSwgdHJpZWQgdG8gaW52ZXJ0IHRoZSBzbmFwR3JpZFxuICAgICAgICAgICAgLy8gYnV0IGl0IGRpZCBub3Qgd29yayBvdXRcblxuICAgICAgICAgICAgY29udHJvbGxlZFRyYW5zbGF0ZSA9IC1zd2lwZXIuY29udHJvbGxlci5zcGxpbmUuaW50ZXJwb2xhdGUoLXRyYW5zbGF0ZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFjb250cm9sbGVkVHJhbnNsYXRlIHx8IHN3aXBlci5wYXJhbXMuY29udHJvbGxlci5ieSA9PT0gJ2NvbnRhaW5lcicpIHtcbiAgICAgICAgICAgIG11bHRpcGxpZXIgPSAoYy5tYXhUcmFuc2xhdGUoKSAtIGMubWluVHJhbnNsYXRlKCkpIC8gKHN3aXBlci5tYXhUcmFuc2xhdGUoKSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKSk7XG4gICAgICAgICAgICBjb250cm9sbGVkVHJhbnNsYXRlID0gKHRyYW5zbGF0ZSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKSkgKiBtdWx0aXBsaWVyICsgYy5taW5UcmFuc2xhdGUoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5jb250cm9sbGVyLmludmVyc2UpIHtcbiAgICAgICAgICAgIGNvbnRyb2xsZWRUcmFuc2xhdGUgPSBjLm1heFRyYW5zbGF0ZSgpIC0gY29udHJvbGxlZFRyYW5zbGF0ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjLnVwZGF0ZVByb2dyZXNzKGNvbnRyb2xsZWRUcmFuc2xhdGUpO1xuICAgICAgICAgIGMuc2V0VHJhbnNsYXRlKGNvbnRyb2xsZWRUcmFuc2xhdGUsIHN3aXBlcik7XG4gICAgICAgICAgYy51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgICAgICAgIGMudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29udHJvbGxlZCkpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRyb2xsZWQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChjb250cm9sbGVkW2ldICE9PSBieUNvbnRyb2xsZXIgJiYgY29udHJvbGxlZFtpXSBpbnN0YW5jZW9mIFN3aXBlcikge1xuICAgICAgICAgICAgICBzZXRDb250cm9sbGVkVHJhbnNsYXRlKGNvbnRyb2xsZWRbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjb250cm9sbGVkIGluc3RhbmNlb2YgU3dpcGVyICYmIGJ5Q29udHJvbGxlciAhPT0gY29udHJvbGxlZCkge1xuICAgICAgICAgIHNldENvbnRyb2xsZWRUcmFuc2xhdGUoY29udHJvbGxlZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2V0VHJhbnNpdGlvbihkdXJhdGlvbiwgYnlDb250cm9sbGVyKSB7XG4gICAgICAgIGNvbnN0IFN3aXBlciA9IHN3aXBlci5jb25zdHJ1Y3RvcjtcbiAgICAgICAgY29uc3QgY29udHJvbGxlZCA9IHN3aXBlci5jb250cm9sbGVyLmNvbnRyb2w7XG4gICAgICAgIGxldCBpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHNldENvbnRyb2xsZWRUcmFuc2l0aW9uKGMpIHtcbiAgICAgICAgICBjLnNldFRyYW5zaXRpb24oZHVyYXRpb24sIHN3aXBlcik7XG5cbiAgICAgICAgICBpZiAoZHVyYXRpb24gIT09IDApIHtcbiAgICAgICAgICAgIGMudHJhbnNpdGlvblN0YXJ0KCk7XG5cbiAgICAgICAgICAgIGlmIChjLnBhcmFtcy5hdXRvSGVpZ2h0KSB7XG4gICAgICAgICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjLnVwZGF0ZUF1dG9IZWlnaHQoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGMuJHdyYXBwZXJFbC50cmFuc2l0aW9uRW5kKCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFjb250cm9sbGVkKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgaWYgKGMucGFyYW1zLmxvb3AgJiYgc3dpcGVyLnBhcmFtcy5jb250cm9sbGVyLmJ5ID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICAgICAgYy5sb29wRml4KCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjLnRyYW5zaXRpb25FbmQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbnRyb2xsZWQpKSB7XG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvbnRyb2xsZWQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChjb250cm9sbGVkW2ldICE9PSBieUNvbnRyb2xsZXIgJiYgY29udHJvbGxlZFtpXSBpbnN0YW5jZW9mIFN3aXBlcikge1xuICAgICAgICAgICAgICBzZXRDb250cm9sbGVkVHJhbnNpdGlvbihjb250cm9sbGVkW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoY29udHJvbGxlZCBpbnN0YW5jZW9mIFN3aXBlciAmJiBieUNvbnRyb2xsZXIgIT09IGNvbnRyb2xsZWQpIHtcbiAgICAgICAgICBzZXRDb250cm9sbGVkVHJhbnNpdGlvbihjb250cm9sbGVkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiByZW1vdmVTcGxpbmUoKSB7XG4gICAgICAgIGlmICghc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbCkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChzd2lwZXIuY29udHJvbGxlci5zcGxpbmUpIHtcbiAgICAgICAgICBzd2lwZXIuY29udHJvbGxlci5zcGxpbmUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgZGVsZXRlIHN3aXBlci5jb250cm9sbGVyLnNwbGluZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBvbignYmVmb3JlSW5pdCcsICgpID0+IHtcbiAgICAgICAgc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbCA9IHN3aXBlci5wYXJhbXMuY29udHJvbGxlci5jb250cm9sO1xuICAgICAgfSk7XG4gICAgICBvbigndXBkYXRlJywgKCkgPT4ge1xuICAgICAgICByZW1vdmVTcGxpbmUoKTtcbiAgICAgIH0pO1xuICAgICAgb24oJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgICAgcmVtb3ZlU3BsaW5lKCk7XG4gICAgICB9KTtcbiAgICAgIG9uKCdvYnNlcnZlclVwZGF0ZScsICgpID0+IHtcbiAgICAgICAgcmVtb3ZlU3BsaW5lKCk7XG4gICAgICB9KTtcbiAgICAgIG9uKCdzZXRUcmFuc2xhdGUnLCAoX3MsIHRyYW5zbGF0ZSwgYnlDb250cm9sbGVyKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbCkgcmV0dXJuO1xuICAgICAgICBzd2lwZXIuY29udHJvbGxlci5zZXRUcmFuc2xhdGUodHJhbnNsYXRlLCBieUNvbnRyb2xsZXIpO1xuICAgICAgfSk7XG4gICAgICBvbignc2V0VHJhbnNpdGlvbicsIChfcywgZHVyYXRpb24sIGJ5Q29udHJvbGxlcikgPT4ge1xuICAgICAgICBpZiAoIXN3aXBlci5jb250cm9sbGVyLmNvbnRyb2wpIHJldHVybjtcbiAgICAgICAgc3dpcGVyLmNvbnRyb2xsZXIuc2V0VHJhbnNpdGlvbihkdXJhdGlvbiwgYnlDb250cm9sbGVyKTtcbiAgICAgIH0pO1xuICAgICAgT2JqZWN0LmFzc2lnbihzd2lwZXIuY29udHJvbGxlciwge1xuICAgICAgICBzZXRUcmFuc2xhdGUsXG4gICAgICAgIHNldFRyYW5zaXRpb25cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIEExMXkoX3JlZikge1xuICAgICAgbGV0IHtcbiAgICAgICAgc3dpcGVyLFxuICAgICAgICBleHRlbmRQYXJhbXMsXG4gICAgICAgIG9uXG4gICAgICB9ID0gX3JlZjtcbiAgICAgIGV4dGVuZFBhcmFtcyh7XG4gICAgICAgIGExMXk6IHtcbiAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgIG5vdGlmaWNhdGlvbkNsYXNzOiAnc3dpcGVyLW5vdGlmaWNhdGlvbicsXG4gICAgICAgICAgcHJldlNsaWRlTWVzc2FnZTogJ1ByZXZpb3VzIHNsaWRlJyxcbiAgICAgICAgICBuZXh0U2xpZGVNZXNzYWdlOiAnTmV4dCBzbGlkZScsXG4gICAgICAgICAgZmlyc3RTbGlkZU1lc3NhZ2U6ICdUaGlzIGlzIHRoZSBmaXJzdCBzbGlkZScsXG4gICAgICAgICAgbGFzdFNsaWRlTWVzc2FnZTogJ1RoaXMgaXMgdGhlIGxhc3Qgc2xpZGUnLFxuICAgICAgICAgIHBhZ2luYXRpb25CdWxsZXRNZXNzYWdlOiAnR28gdG8gc2xpZGUge3tpbmRleH19JyxcbiAgICAgICAgICBzbGlkZUxhYmVsTWVzc2FnZTogJ3t7aW5kZXh9fSAvIHt7c2xpZGVzTGVuZ3RofX0nLFxuICAgICAgICAgIGNvbnRhaW5lck1lc3NhZ2U6IG51bGwsXG4gICAgICAgICAgY29udGFpbmVyUm9sZURlc2NyaXB0aW9uTWVzc2FnZTogbnVsbCxcbiAgICAgICAgICBpdGVtUm9sZURlc2NyaXB0aW9uTWVzc2FnZTogbnVsbCxcbiAgICAgICAgICBzbGlkZVJvbGU6ICdncm91cCcsXG4gICAgICAgICAgaWQ6IG51bGxcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBsZXQgbGl2ZVJlZ2lvbiA9IG51bGw7XG5cbiAgICAgIGZ1bmN0aW9uIG5vdGlmeShtZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbiA9IGxpdmVSZWdpb247XG4gICAgICAgIGlmIChub3RpZmljYXRpb24ubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgIG5vdGlmaWNhdGlvbi5odG1sKCcnKTtcbiAgICAgICAgbm90aWZpY2F0aW9uLmh0bWwobWVzc2FnZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGdldFJhbmRvbU51bWJlcihzaXplKSB7XG4gICAgICAgIGlmIChzaXplID09PSB2b2lkIDApIHtcbiAgICAgICAgICBzaXplID0gMTY7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByYW5kb21DaGFyID0gKCkgPT4gTWF0aC5yb3VuZCgxNiAqIE1hdGgucmFuZG9tKCkpLnRvU3RyaW5nKDE2KTtcblxuICAgICAgICByZXR1cm4gJ3gnLnJlcGVhdChzaXplKS5yZXBsYWNlKC94L2csIHJhbmRvbUNoYXIpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBtYWtlRWxGb2N1c2FibGUoJGVsKSB7XG4gICAgICAgICRlbC5hdHRyKCd0YWJJbmRleCcsICcwJyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG1ha2VFbE5vdEZvY3VzYWJsZSgkZWwpIHtcbiAgICAgICAgJGVsLmF0dHIoJ3RhYkluZGV4JywgJy0xJyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGFkZEVsUm9sZSgkZWwsIHJvbGUpIHtcbiAgICAgICAgJGVsLmF0dHIoJ3JvbGUnLCByb2xlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYWRkRWxSb2xlRGVzY3JpcHRpb24oJGVsLCBkZXNjcmlwdGlvbikge1xuICAgICAgICAkZWwuYXR0cignYXJpYS1yb2xlZGVzY3JpcHRpb24nLCBkZXNjcmlwdGlvbik7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGFkZEVsQ29udHJvbHMoJGVsLCBjb250cm9scykge1xuICAgICAgICAkZWwuYXR0cignYXJpYS1jb250cm9scycsIGNvbnRyb2xzKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYWRkRWxMYWJlbCgkZWwsIGxhYmVsKSB7XG4gICAgICAgICRlbC5hdHRyKCdhcmlhLWxhYmVsJywgbGFiZWwpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhZGRFbElkKCRlbCwgaWQpIHtcbiAgICAgICAgJGVsLmF0dHIoJ2lkJywgaWQpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhZGRFbExpdmUoJGVsLCBsaXZlKSB7XG4gICAgICAgICRlbC5hdHRyKCdhcmlhLWxpdmUnLCBsaXZlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZGlzYWJsZUVsKCRlbCkge1xuICAgICAgICAkZWwuYXR0cignYXJpYS1kaXNhYmxlZCcsIHRydWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBlbmFibGVFbCgkZWwpIHtcbiAgICAgICAgJGVsLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uRW50ZXJPclNwYWNlS2V5KGUpIHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSAhPT0gMTMgJiYgZS5rZXlDb2RlICE9PSAzMikgcmV0dXJuO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLmExMXk7XG4gICAgICAgIGNvbnN0ICR0YXJnZXRFbCA9ICQoZS50YXJnZXQpO1xuXG4gICAgICAgIGlmIChzd2lwZXIubmF2aWdhdGlvbiAmJiBzd2lwZXIubmF2aWdhdGlvbi4kbmV4dEVsICYmICR0YXJnZXRFbC5pcyhzd2lwZXIubmF2aWdhdGlvbi4kbmV4dEVsKSkge1xuICAgICAgICAgIGlmICghKHN3aXBlci5pc0VuZCAmJiAhc3dpcGVyLnBhcmFtcy5sb29wKSkge1xuICAgICAgICAgICAgc3dpcGVyLnNsaWRlTmV4dCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzd2lwZXIuaXNFbmQpIHtcbiAgICAgICAgICAgIG5vdGlmeShwYXJhbXMubGFzdFNsaWRlTWVzc2FnZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vdGlmeShwYXJhbXMubmV4dFNsaWRlTWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN3aXBlci5uYXZpZ2F0aW9uICYmIHN3aXBlci5uYXZpZ2F0aW9uLiRwcmV2RWwgJiYgJHRhcmdldEVsLmlzKHN3aXBlci5uYXZpZ2F0aW9uLiRwcmV2RWwpKSB7XG4gICAgICAgICAgaWYgKCEoc3dpcGVyLmlzQmVnaW5uaW5nICYmICFzd2lwZXIucGFyYW1zLmxvb3ApKSB7XG4gICAgICAgICAgICBzd2lwZXIuc2xpZGVQcmV2KCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHN3aXBlci5pc0JlZ2lubmluZykge1xuICAgICAgICAgICAgbm90aWZ5KHBhcmFtcy5maXJzdFNsaWRlTWVzc2FnZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vdGlmeShwYXJhbXMucHJldlNsaWRlTWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYWdpbmF0aW9uICYmICR0YXJnZXRFbC5pcyhjbGFzc2VzVG9TZWxlY3Rvcihzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uYnVsbGV0Q2xhc3MpKSkge1xuICAgICAgICAgICR0YXJnZXRFbFswXS5jbGljaygpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHVwZGF0ZU5hdmlnYXRpb24oKSB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3AgfHwgc3dpcGVyLnBhcmFtcy5yZXdpbmQgfHwgIXN3aXBlci5uYXZpZ2F0aW9uKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAkbmV4dEVsLFxuICAgICAgICAgICRwcmV2RWxcbiAgICAgICAgfSA9IHN3aXBlci5uYXZpZ2F0aW9uO1xuXG4gICAgICAgIGlmICgkcHJldkVsICYmICRwcmV2RWwubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGlmIChzd2lwZXIuaXNCZWdpbm5pbmcpIHtcbiAgICAgICAgICAgIGRpc2FibGVFbCgkcHJldkVsKTtcbiAgICAgICAgICAgIG1ha2VFbE5vdEZvY3VzYWJsZSgkcHJldkVsKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW5hYmxlRWwoJHByZXZFbCk7XG4gICAgICAgICAgICBtYWtlRWxGb2N1c2FibGUoJHByZXZFbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRuZXh0RWwgJiYgJG5leHRFbC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgaWYgKHN3aXBlci5pc0VuZCkge1xuICAgICAgICAgICAgZGlzYWJsZUVsKCRuZXh0RWwpO1xuICAgICAgICAgICAgbWFrZUVsTm90Rm9jdXNhYmxlKCRuZXh0RWwpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbmFibGVFbCgkbmV4dEVsKTtcbiAgICAgICAgICAgIG1ha2VFbEZvY3VzYWJsZSgkbmV4dEVsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gaGFzUGFnaW5hdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHN3aXBlci5wYWdpbmF0aW9uICYmIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMgJiYgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cy5sZW5ndGg7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGhhc0NsaWNrYWJsZVBhZ2luYXRpb24oKSB7XG4gICAgICAgIHJldHVybiBoYXNQYWdpbmF0aW9uKCkgJiYgc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmNsaWNrYWJsZTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdXBkYXRlUGFnaW5hdGlvbigpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5hMTF5O1xuICAgICAgICBpZiAoIWhhc1BhZ2luYXRpb24oKSkgcmV0dXJuO1xuICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzLmVhY2goYnVsbGV0RWwgPT4ge1xuICAgICAgICAgIGNvbnN0ICRidWxsZXRFbCA9ICQoYnVsbGV0RWwpO1xuXG4gICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5jbGlja2FibGUpIHtcbiAgICAgICAgICAgIG1ha2VFbEZvY3VzYWJsZSgkYnVsbGV0RWwpO1xuXG4gICAgICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5yZW5kZXJCdWxsZXQpIHtcbiAgICAgICAgICAgICAgYWRkRWxSb2xlKCRidWxsZXRFbCwgJ2J1dHRvbicpO1xuICAgICAgICAgICAgICBhZGRFbExhYmVsKCRidWxsZXRFbCwgcGFyYW1zLnBhZ2luYXRpb25CdWxsZXRNZXNzYWdlLnJlcGxhY2UoL1xce1xce2luZGV4XFx9XFx9LywgJGJ1bGxldEVsLmluZGV4KCkgKyAxKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCRidWxsZXRFbC5pcyhgLiR7c3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmJ1bGxldEFjdGl2ZUNsYXNzfWApKSB7XG4gICAgICAgICAgICAkYnVsbGV0RWwuYXR0cignYXJpYS1jdXJyZW50JywgJ3RydWUnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGJ1bGxldEVsLnJlbW92ZUF0dHIoJ2FyaWEtY3VycmVudCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGluaXROYXZFbCA9ICgkZWwsIHdyYXBwZXJJZCwgbWVzc2FnZSkgPT4ge1xuICAgICAgICBtYWtlRWxGb2N1c2FibGUoJGVsKTtcblxuICAgICAgICBpZiAoJGVsWzBdLnRhZ05hbWUgIT09ICdCVVRUT04nKSB7XG4gICAgICAgICAgYWRkRWxSb2xlKCRlbCwgJ2J1dHRvbicpO1xuICAgICAgICAgICRlbC5vbigna2V5ZG93bicsIG9uRW50ZXJPclNwYWNlS2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZEVsTGFiZWwoJGVsLCBtZXNzYWdlKTtcbiAgICAgICAgYWRkRWxDb250cm9scygkZWwsIHdyYXBwZXJJZCk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBoYW5kbGVGb2N1cyA9IGUgPT4ge1xuICAgICAgICBjb25zdCBzbGlkZUVsID0gZS50YXJnZXQuY2xvc2VzdChgLiR7c3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzfWApO1xuICAgICAgICBpZiAoIXNsaWRlRWwgfHwgIXN3aXBlci5zbGlkZXMuaW5jbHVkZXMoc2xpZGVFbCkpIHJldHVybjtcbiAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBzd2lwZXIuc2xpZGVzLmluZGV4T2Yoc2xpZGVFbCkgPT09IHN3aXBlci5hY3RpdmVJbmRleDtcbiAgICAgICAgY29uc3QgaXNWaXNpYmxlID0gc3dpcGVyLnBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzICYmIHN3aXBlci52aXNpYmxlU2xpZGVzICYmIHN3aXBlci52aXNpYmxlU2xpZGVzLmluY2x1ZGVzKHNsaWRlRWwpO1xuICAgICAgICBpZiAoaXNBY3RpdmUgfHwgaXNWaXNpYmxlKSByZXR1cm47XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5zbGlkZXMuaW5kZXhPZihzbGlkZUVsKSwgMCk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBpbml0U2xpZGVzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLmExMXk7XG5cbiAgICAgICAgaWYgKHBhcmFtcy5pdGVtUm9sZURlc2NyaXB0aW9uTWVzc2FnZSkge1xuICAgICAgICAgIGFkZEVsUm9sZURlc2NyaXB0aW9uKCQoc3dpcGVyLnNsaWRlcyksIHBhcmFtcy5pdGVtUm9sZURlc2NyaXB0aW9uTWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRFbFJvbGUoJChzd2lwZXIuc2xpZGVzKSwgcGFyYW1zLnNsaWRlUm9sZSk7XG4gICAgICAgIGNvbnN0IHNsaWRlc0xlbmd0aCA9IHN3aXBlci5wYXJhbXMubG9vcCA/IHN3aXBlci5zbGlkZXMuZmlsdGVyKGVsID0+ICFlbC5jbGFzc0xpc3QuY29udGFpbnMoc3dpcGVyLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSkubGVuZ3RoIDogc3dpcGVyLnNsaWRlcy5sZW5ndGg7XG5cbiAgICAgICAgaWYgKHBhcmFtcy5zbGlkZUxhYmVsTWVzc2FnZSkge1xuICAgICAgICAgIHN3aXBlci5zbGlkZXMuZWFjaCgoc2xpZGVFbCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRzbGlkZUVsID0gJChzbGlkZUVsKTtcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlSW5kZXggPSBzd2lwZXIucGFyYW1zLmxvb3AgPyBwYXJzZUludCgkc2xpZGVFbC5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpLCAxMCkgOiBpbmRleDtcbiAgICAgICAgICAgIGNvbnN0IGFyaWFMYWJlbE1lc3NhZ2UgPSBwYXJhbXMuc2xpZGVMYWJlbE1lc3NhZ2UucmVwbGFjZSgvXFx7XFx7aW5kZXhcXH1cXH0vLCBzbGlkZUluZGV4ICsgMSkucmVwbGFjZSgvXFx7XFx7c2xpZGVzTGVuZ3RoXFx9XFx9Lywgc2xpZGVzTGVuZ3RoKTtcbiAgICAgICAgICAgIGFkZEVsTGFiZWwoJHNsaWRlRWwsIGFyaWFMYWJlbE1lc3NhZ2UpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLmExMXk7XG4gICAgICAgIHN3aXBlci4kZWwuYXBwZW5kKGxpdmVSZWdpb24pOyAvLyBDb250YWluZXJcblxuICAgICAgICBjb25zdCAkY29udGFpbmVyRWwgPSBzd2lwZXIuJGVsO1xuXG4gICAgICAgIGlmIChwYXJhbXMuY29udGFpbmVyUm9sZURlc2NyaXB0aW9uTWVzc2FnZSkge1xuICAgICAgICAgIGFkZEVsUm9sZURlc2NyaXB0aW9uKCRjb250YWluZXJFbCwgcGFyYW1zLmNvbnRhaW5lclJvbGVEZXNjcmlwdGlvbk1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmFtcy5jb250YWluZXJNZXNzYWdlKSB7XG4gICAgICAgICAgYWRkRWxMYWJlbCgkY29udGFpbmVyRWwsIHBhcmFtcy5jb250YWluZXJNZXNzYWdlKTtcbiAgICAgICAgfSAvLyBXcmFwcGVyXG5cblxuICAgICAgICBjb25zdCAkd3JhcHBlckVsID0gc3dpcGVyLiR3cmFwcGVyRWw7XG4gICAgICAgIGNvbnN0IHdyYXBwZXJJZCA9IHBhcmFtcy5pZCB8fCAkd3JhcHBlckVsLmF0dHIoJ2lkJykgfHwgYHN3aXBlci13cmFwcGVyLSR7Z2V0UmFuZG9tTnVtYmVyKDE2KX1gO1xuICAgICAgICBjb25zdCBsaXZlID0gc3dpcGVyLnBhcmFtcy5hdXRvcGxheSAmJiBzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmVuYWJsZWQgPyAnb2ZmJyA6ICdwb2xpdGUnO1xuICAgICAgICBhZGRFbElkKCR3cmFwcGVyRWwsIHdyYXBwZXJJZCk7XG4gICAgICAgIGFkZEVsTGl2ZSgkd3JhcHBlckVsLCBsaXZlKTsgLy8gU2xpZGVcblxuICAgICAgICBpbml0U2xpZGVzKCk7IC8vIE5hdmlnYXRpb25cblxuICAgICAgICBsZXQgJG5leHRFbDtcbiAgICAgICAgbGV0ICRwcmV2RWw7XG5cbiAgICAgICAgaWYgKHN3aXBlci5uYXZpZ2F0aW9uICYmIHN3aXBlci5uYXZpZ2F0aW9uLiRuZXh0RWwpIHtcbiAgICAgICAgICAkbmV4dEVsID0gc3dpcGVyLm5hdmlnYXRpb24uJG5leHRFbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzd2lwZXIubmF2aWdhdGlvbiAmJiBzd2lwZXIubmF2aWdhdGlvbi4kcHJldkVsKSB7XG4gICAgICAgICAgJHByZXZFbCA9IHN3aXBlci5uYXZpZ2F0aW9uLiRwcmV2RWw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJG5leHRFbCAmJiAkbmV4dEVsLmxlbmd0aCkge1xuICAgICAgICAgIGluaXROYXZFbCgkbmV4dEVsLCB3cmFwcGVySWQsIHBhcmFtcy5uZXh0U2xpZGVNZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkcHJldkVsICYmICRwcmV2RWwubGVuZ3RoKSB7XG4gICAgICAgICAgaW5pdE5hdkVsKCRwcmV2RWwsIHdyYXBwZXJJZCwgcGFyYW1zLnByZXZTbGlkZU1lc3NhZ2UpO1xuICAgICAgICB9IC8vIFBhZ2luYXRpb25cblxuXG4gICAgICAgIGlmIChoYXNDbGlja2FibGVQYWdpbmF0aW9uKCkpIHtcbiAgICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi4kZWwub24oJ2tleWRvd24nLCBjbGFzc2VzVG9TZWxlY3Rvcihzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uYnVsbGV0Q2xhc3MpLCBvbkVudGVyT3JTcGFjZUtleSk7XG4gICAgICAgIH0gLy8gVGFiIGZvY3VzXG5cblxuICAgICAgICBzd2lwZXIuJGVsLm9uKCdmb2N1cycsIGhhbmRsZUZvY3VzLCB0cnVlKTtcbiAgICAgIH07XG5cbiAgICAgIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIGlmIChsaXZlUmVnaW9uICYmIGxpdmVSZWdpb24ubGVuZ3RoID4gMCkgbGl2ZVJlZ2lvbi5yZW1vdmUoKTtcbiAgICAgICAgbGV0ICRuZXh0RWw7XG4gICAgICAgIGxldCAkcHJldkVsO1xuXG4gICAgICAgIGlmIChzd2lwZXIubmF2aWdhdGlvbiAmJiBzd2lwZXIubmF2aWdhdGlvbi4kbmV4dEVsKSB7XG4gICAgICAgICAgJG5leHRFbCA9IHN3aXBlci5uYXZpZ2F0aW9uLiRuZXh0RWw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3dpcGVyLm5hdmlnYXRpb24gJiYgc3dpcGVyLm5hdmlnYXRpb24uJHByZXZFbCkge1xuICAgICAgICAgICRwcmV2RWwgPSBzd2lwZXIubmF2aWdhdGlvbi4kcHJldkVsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRuZXh0RWwpIHtcbiAgICAgICAgICAkbmV4dEVsLm9mZigna2V5ZG93bicsIG9uRW50ZXJPclNwYWNlS2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkcHJldkVsKSB7XG4gICAgICAgICAgJHByZXZFbC5vZmYoJ2tleWRvd24nLCBvbkVudGVyT3JTcGFjZUtleSk7XG4gICAgICAgIH0gLy8gUGFnaW5hdGlvblxuXG5cbiAgICAgICAgaWYgKGhhc0NsaWNrYWJsZVBhZ2luYXRpb24oKSkge1xuICAgICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLiRlbC5vZmYoJ2tleWRvd24nLCBjbGFzc2VzVG9TZWxlY3Rvcihzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uYnVsbGV0Q2xhc3MpLCBvbkVudGVyT3JTcGFjZUtleSk7XG4gICAgICAgIH0gLy8gVGFiIGZvY3VzXG5cblxuICAgICAgICBzd2lwZXIuJGVsLm9mZignZm9jdXMnLCBoYW5kbGVGb2N1cywgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIG9uKCdiZWZvcmVJbml0JywgKCkgPT4ge1xuICAgICAgICBsaXZlUmVnaW9uID0gJChgPHNwYW4gY2xhc3M9XCIke3N3aXBlci5wYXJhbXMuYTExeS5ub3RpZmljYXRpb25DbGFzc31cIiBhcmlhLWxpdmU9XCJhc3NlcnRpdmVcIiBhcmlhLWF0b21pYz1cInRydWVcIj48L3NwYW4+YCk7XG4gICAgICB9KTtcbiAgICAgIG9uKCdhZnRlckluaXQnLCAoKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5hMTF5LmVuYWJsZWQpIHJldHVybjtcbiAgICAgICAgaW5pdCgpO1xuICAgICAgfSk7XG4gICAgICBvbignc2xpZGVzTGVuZ3RoQ2hhbmdlIHNuYXBHcmlkTGVuZ3RoQ2hhbmdlIHNsaWRlc0dyaWRMZW5ndGhDaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5hMTF5LmVuYWJsZWQpIHJldHVybjtcbiAgICAgICAgaW5pdFNsaWRlcygpO1xuICAgICAgfSk7XG4gICAgICBvbignZnJvbUVkZ2UgdG9FZGdlIGFmdGVySW5pdCBsb2NrIHVubG9jaycsICgpID0+IHtcbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLmExMXkuZW5hYmxlZCkgcmV0dXJuO1xuICAgICAgICB1cGRhdGVOYXZpZ2F0aW9uKCk7XG4gICAgICB9KTtcbiAgICAgIG9uKCdwYWdpbmF0aW9uVXBkYXRlJywgKCkgPT4ge1xuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMuYTExeS5lbmFibGVkKSByZXR1cm47XG4gICAgICAgIHVwZGF0ZVBhZ2luYXRpb24oKTtcbiAgICAgIH0pO1xuICAgICAgb24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5hMTF5LmVuYWJsZWQpIHJldHVybjtcbiAgICAgICAgZGVzdHJveSgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gSGlzdG9yeShfcmVmKSB7XG4gICAgICBsZXQge1xuICAgICAgICBzd2lwZXIsXG4gICAgICAgIGV4dGVuZFBhcmFtcyxcbiAgICAgICAgb25cbiAgICAgIH0gPSBfcmVmO1xuICAgICAgZXh0ZW5kUGFyYW1zKHtcbiAgICAgICAgaGlzdG9yeToge1xuICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgIHJvb3Q6ICcnLFxuICAgICAgICAgIHJlcGxhY2VTdGF0ZTogZmFsc2UsXG4gICAgICAgICAga2V5OiAnc2xpZGVzJyxcbiAgICAgICAgICBrZWVwUXVlcnk6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgbGV0IGluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgICBsZXQgcGF0aHMgPSB7fTtcblxuICAgICAgY29uc3Qgc2x1Z2lmeSA9IHRleHQgPT4ge1xuICAgICAgICByZXR1cm4gdGV4dC50b1N0cmluZygpLnJlcGxhY2UoL1xccysvZywgJy0nKS5yZXBsYWNlKC9bXlxcdy1dKy9nLCAnJykucmVwbGFjZSgvLS0rL2csICctJykucmVwbGFjZSgvXi0rLywgJycpLnJlcGxhY2UoLy0rJC8sICcnKTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGdldFBhdGhWYWx1ZXMgPSB1cmxPdmVycmlkZSA9PiB7XG4gICAgICAgIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICAgICAgICBsZXQgbG9jYXRpb247XG5cbiAgICAgICAgaWYgKHVybE92ZXJyaWRlKSB7XG4gICAgICAgICAgbG9jYXRpb24gPSBuZXcgVVJMKHVybE92ZXJyaWRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhdGhBcnJheSA9IGxvY2F0aW9uLnBhdGhuYW1lLnNsaWNlKDEpLnNwbGl0KCcvJykuZmlsdGVyKHBhcnQgPT4gcGFydCAhPT0gJycpO1xuICAgICAgICBjb25zdCB0b3RhbCA9IHBhdGhBcnJheS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGtleSA9IHBhdGhBcnJheVt0b3RhbCAtIDJdO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHBhdGhBcnJheVt0b3RhbCAtIDFdO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGtleSxcbiAgICAgICAgICB2YWx1ZVxuICAgICAgICB9O1xuICAgICAgfTtcblxuICAgICAgY29uc3Qgc2V0SGlzdG9yeSA9IChrZXksIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICAgICAgICBpZiAoIWluaXRpYWxpemVkIHx8ICFzd2lwZXIucGFyYW1zLmhpc3RvcnkuZW5hYmxlZCkgcmV0dXJuO1xuICAgICAgICBsZXQgbG9jYXRpb247XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMudXJsKSB7XG4gICAgICAgICAgbG9jYXRpb24gPSBuZXcgVVJMKHN3aXBlci5wYXJhbXMudXJsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNsaWRlID0gc3dpcGVyLnNsaWRlcy5lcShpbmRleCk7XG4gICAgICAgIGxldCB2YWx1ZSA9IHNsdWdpZnkoc2xpZGUuYXR0cignZGF0YS1oaXN0b3J5JykpO1xuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmhpc3Rvcnkucm9vdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGV0IHJvb3QgPSBzd2lwZXIucGFyYW1zLmhpc3Rvcnkucm9vdDtcbiAgICAgICAgICBpZiAocm9vdFtyb290Lmxlbmd0aCAtIDFdID09PSAnLycpIHJvb3QgPSByb290LnNsaWNlKDAsIHJvb3QubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgdmFsdWUgPSBgJHtyb290fS8ke2tleX0vJHt2YWx1ZX1gO1xuICAgICAgICB9IGVsc2UgaWYgKCFsb2NhdGlvbi5wYXRobmFtZS5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgICAgdmFsdWUgPSBgJHtrZXl9LyR7dmFsdWV9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmhpc3Rvcnkua2VlcFF1ZXJ5KSB7XG4gICAgICAgICAgdmFsdWUgKz0gbG9jYXRpb24uc2VhcmNoO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3VycmVudFN0YXRlID0gd2luZG93Lmhpc3Rvcnkuc3RhdGU7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRTdGF0ZSAmJiBjdXJyZW50U3RhdGUudmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuaGlzdG9yeS5yZXBsYWNlU3RhdGUpIHtcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe1xuICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICB9LCBudWxsLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHtcbiAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgfSwgbnVsbCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzY3JvbGxUb1NsaWRlID0gKHNwZWVkLCB2YWx1ZSwgcnVuQ2FsbGJhY2tzKSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBzd2lwZXIuc2xpZGVzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBzbGlkZSA9IHN3aXBlci5zbGlkZXMuZXEoaSk7XG4gICAgICAgICAgICBjb25zdCBzbGlkZUhpc3RvcnkgPSBzbHVnaWZ5KHNsaWRlLmF0dHIoJ2RhdGEtaGlzdG9yeScpKTtcblxuICAgICAgICAgICAgaWYgKHNsaWRlSGlzdG9yeSA9PT0gdmFsdWUgJiYgIXNsaWRlLmhhc0NsYXNzKHN3aXBlci5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpIHtcbiAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBzbGlkZS5pbmRleCgpO1xuICAgICAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhpbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvKDAsIHNwZWVkLCBydW5DYWxsYmFja3MpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzZXRIaXN0b3J5UG9wU3RhdGUgPSAoKSA9PiB7XG4gICAgICAgIHBhdGhzID0gZ2V0UGF0aFZhbHVlcyhzd2lwZXIucGFyYW1zLnVybCk7XG4gICAgICAgIHNjcm9sbFRvU2xpZGUoc3dpcGVyLnBhcmFtcy5zcGVlZCwgcGF0aHMudmFsdWUsIGZhbHNlKTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMuaGlzdG9yeSkgcmV0dXJuO1xuXG4gICAgICAgIGlmICghd2luZG93Lmhpc3RvcnkgfHwgIXdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSkge1xuICAgICAgICAgIHN3aXBlci5wYXJhbXMuaGlzdG9yeS5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgc3dpcGVyLnBhcmFtcy5oYXNoTmF2aWdhdGlvbi5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIHBhdGhzID0gZ2V0UGF0aFZhbHVlcyhzd2lwZXIucGFyYW1zLnVybCk7XG4gICAgICAgIGlmICghcGF0aHMua2V5ICYmICFwYXRocy52YWx1ZSkgcmV0dXJuO1xuICAgICAgICBzY3JvbGxUb1NsaWRlKDAsIHBhdGhzLnZhbHVlLCBzd2lwZXIucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCk7XG5cbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLmhpc3RvcnkucmVwbGFjZVN0YXRlKSB7XG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgc2V0SGlzdG9yeVBvcFN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3QgZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG5cbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLmhpc3RvcnkucmVwbGFjZVN0YXRlKSB7XG4gICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgc2V0SGlzdG9yeVBvcFN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgb24oJ2luaXQnLCAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmhpc3RvcnkuZW5hYmxlZCkge1xuICAgICAgICAgIGluaXQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvbignZGVzdHJveScsICgpID0+IHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuaGlzdG9yeS5lbmFibGVkKSB7XG4gICAgICAgICAgZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9uKCd0cmFuc2l0aW9uRW5kIF9mcmVlTW9kZU5vTW9tZW50dW1SZWxlYXNlJywgKCkgPT4ge1xuICAgICAgICBpZiAoaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICBzZXRIaXN0b3J5KHN3aXBlci5wYXJhbXMuaGlzdG9yeS5rZXksIHN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ3NsaWRlQ2hhbmdlJywgKCkgPT4ge1xuICAgICAgICBpZiAoaW5pdGlhbGl6ZWQgJiYgc3dpcGVyLnBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICAgICAgc2V0SGlzdG9yeShzd2lwZXIucGFyYW1zLmhpc3Rvcnkua2V5LCBzd2lwZXIuYWN0aXZlSW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBIYXNoTmF2aWdhdGlvbihfcmVmKSB7XG4gICAgICBsZXQge1xuICAgICAgICBzd2lwZXIsXG4gICAgICAgIGV4dGVuZFBhcmFtcyxcbiAgICAgICAgZW1pdCxcbiAgICAgICAgb25cbiAgICAgIH0gPSBfcmVmO1xuICAgICAgbGV0IGluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgICBjb25zdCBkb2N1bWVudCA9IGdldERvY3VtZW50KCk7XG4gICAgICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgICAgIGV4dGVuZFBhcmFtcyh7XG4gICAgICAgIGhhc2hOYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgcmVwbGFjZVN0YXRlOiBmYWxzZSxcbiAgICAgICAgICB3YXRjaFN0YXRlOiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgb25IYXNoQ2hhbmdlID0gKCkgPT4ge1xuICAgICAgICBlbWl0KCdoYXNoQ2hhbmdlJyk7XG4gICAgICAgIGNvbnN0IG5ld0hhc2ggPSBkb2N1bWVudC5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJyk7XG4gICAgICAgIGNvbnN0IGFjdGl2ZVNsaWRlSGFzaCA9IHN3aXBlci5zbGlkZXMuZXEoc3dpcGVyLmFjdGl2ZUluZGV4KS5hdHRyKCdkYXRhLWhhc2gnKTtcblxuICAgICAgICBpZiAobmV3SGFzaCAhPT0gYWN0aXZlU2xpZGVIYXNoKSB7XG4gICAgICAgICAgY29uc3QgbmV3SW5kZXggPSBzd2lwZXIuJHdyYXBwZXJFbC5jaGlsZHJlbihgLiR7c3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzfVtkYXRhLWhhc2g9XCIke25ld0hhc2h9XCJdYCkuaW5kZXgoKTtcbiAgICAgICAgICBpZiAodHlwZW9mIG5ld0luZGV4ID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvKG5ld0luZGV4KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3Qgc2V0SGFzaCA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFpbml0aWFsaXplZCB8fCAhc3dpcGVyLnBhcmFtcy5oYXNoTmF2aWdhdGlvbi5lbmFibGVkKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuaGFzaE5hdmlnYXRpb24ucmVwbGFjZVN0YXRlICYmIHdpbmRvdy5oaXN0b3J5ICYmIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSkge1xuICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBudWxsLCBgIyR7c3dpcGVyLnNsaWRlcy5lcShzd2lwZXIuYWN0aXZlSW5kZXgpLmF0dHIoJ2RhdGEtaGFzaCcpfWAgfHwgJycpO1xuICAgICAgICAgIGVtaXQoJ2hhc2hTZXQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBzbGlkZSA9IHN3aXBlci5zbGlkZXMuZXEoc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgICBjb25zdCBoYXNoID0gc2xpZGUuYXR0cignZGF0YS1oYXNoJykgfHwgc2xpZGUuYXR0cignZGF0YS1oaXN0b3J5Jyk7XG4gICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaGFzaCA9IGhhc2ggfHwgJyc7XG4gICAgICAgICAgZW1pdCgnaGFzaFNldCcpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMuaGFzaE5hdmlnYXRpb24uZW5hYmxlZCB8fCBzd2lwZXIucGFyYW1zLmhpc3RvcnkgJiYgc3dpcGVyLnBhcmFtcy5oaXN0b3J5LmVuYWJsZWQpIHJldHVybjtcbiAgICAgICAgaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICBjb25zdCBoYXNoID0gZG9jdW1lbnQubG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywgJycpO1xuXG4gICAgICAgIGlmIChoYXNoKSB7XG4gICAgICAgICAgY29uc3Qgc3BlZWQgPSAwO1xuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbmd0aCA9IHN3aXBlci5zbGlkZXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlID0gc3dpcGVyLnNsaWRlcy5lcShpKTtcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlSGFzaCA9IHNsaWRlLmF0dHIoJ2RhdGEtaGFzaCcpIHx8IHNsaWRlLmF0dHIoJ2RhdGEtaGlzdG9yeScpO1xuXG4gICAgICAgICAgICBpZiAoc2xpZGVIYXNoID09PSBoYXNoICYmICFzbGlkZS5oYXNDbGFzcyhzd2lwZXIucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gc2xpZGUuaW5kZXgoKTtcbiAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG8oaW5kZXgsIHNwZWVkLCBzd2lwZXIucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuaGFzaE5hdmlnYXRpb24ud2F0Y2hTdGF0ZSkge1xuICAgICAgICAgICQod2luZG93KS5vbignaGFzaGNoYW5nZScsIG9uSGFzaENoYW5nZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmhhc2hOYXZpZ2F0aW9uLndhdGNoU3RhdGUpIHtcbiAgICAgICAgICAkKHdpbmRvdykub2ZmKCdoYXNoY2hhbmdlJywgb25IYXNoQ2hhbmdlKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgb24oJ2luaXQnLCAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmhhc2hOYXZpZ2F0aW9uLmVuYWJsZWQpIHtcbiAgICAgICAgICBpbml0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmhhc2hOYXZpZ2F0aW9uLmVuYWJsZWQpIHtcbiAgICAgICAgICBkZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ3RyYW5zaXRpb25FbmQgX2ZyZWVNb2RlTm9Nb21lbnR1bVJlbGVhc2UnLCAoKSA9PiB7XG4gICAgICAgIGlmIChpbml0aWFsaXplZCkge1xuICAgICAgICAgIHNldEhhc2goKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvbignc2xpZGVDaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIGlmIChpbml0aWFsaXplZCAmJiBzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgICBzZXRIYXNoKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qIGVzbGludCBuby11bmRlcnNjb3JlLWRhbmdsZTogXCJvZmZcIiAqL1xuICAgIGZ1bmN0aW9uIEF1dG9wbGF5KF9yZWYpIHtcbiAgICAgIGxldCB7XG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgZXh0ZW5kUGFyYW1zLFxuICAgICAgICBvbixcbiAgICAgICAgZW1pdFxuICAgICAgfSA9IF9yZWY7XG4gICAgICBsZXQgdGltZW91dDtcbiAgICAgIHN3aXBlci5hdXRvcGxheSA9IHtcbiAgICAgICAgcnVubmluZzogZmFsc2UsXG4gICAgICAgIHBhdXNlZDogZmFsc2VcbiAgICAgIH07XG4gICAgICBleHRlbmRQYXJhbXMoe1xuICAgICAgICBhdXRvcGxheToge1xuICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgIGRlbGF5OiAzMDAwLFxuICAgICAgICAgIHdhaXRGb3JUcmFuc2l0aW9uOiB0cnVlLFxuICAgICAgICAgIGRpc2FibGVPbkludGVyYWN0aW9uOiB0cnVlLFxuICAgICAgICAgIHN0b3BPbkxhc3RTbGlkZTogZmFsc2UsXG4gICAgICAgICAgcmV2ZXJzZURpcmVjdGlvbjogZmFsc2UsXG4gICAgICAgICAgcGF1c2VPbk1vdXNlRW50ZXI6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBmdW5jdGlvbiBydW4oKSB7XG4gICAgICAgIGNvbnN0ICRhY3RpdmVTbGlkZUVsID0gc3dpcGVyLnNsaWRlcy5lcShzd2lwZXIuYWN0aXZlSW5kZXgpO1xuICAgICAgICBsZXQgZGVsYXkgPSBzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmRlbGF5O1xuXG4gICAgICAgIGlmICgkYWN0aXZlU2xpZGVFbC5hdHRyKCdkYXRhLXN3aXBlci1hdXRvcGxheScpKSB7XG4gICAgICAgICAgZGVsYXkgPSAkYWN0aXZlU2xpZGVFbC5hdHRyKCdkYXRhLXN3aXBlci1hdXRvcGxheScpIHx8IHN3aXBlci5wYXJhbXMuYXV0b3BsYXkuZGVsYXk7XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHRpbWVvdXQgPSBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgbGV0IGF1dG9wbGF5UmVzdWx0O1xuXG4gICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuYXV0b3BsYXkucmV2ZXJzZURpcmVjdGlvbikge1xuICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgICAgICAgICAgICBzd2lwZXIubG9vcEZpeCgpO1xuICAgICAgICAgICAgICBhdXRvcGxheVJlc3VsdCA9IHN3aXBlci5zbGlkZVByZXYoc3dpcGVyLnBhcmFtcy5zcGVlZCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgIGVtaXQoJ2F1dG9wbGF5Jyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFzd2lwZXIuaXNCZWdpbm5pbmcpIHtcbiAgICAgICAgICAgICAgYXV0b3BsYXlSZXN1bHQgPSBzd2lwZXIuc2xpZGVQcmV2KHN3aXBlci5wYXJhbXMuc3BlZWQsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgICBlbWl0KCdhdXRvcGxheScpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5zdG9wT25MYXN0U2xpZGUpIHtcbiAgICAgICAgICAgICAgYXV0b3BsYXlSZXN1bHQgPSBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDEsIHN3aXBlci5wYXJhbXMuc3BlZWQsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgICBlbWl0KCdhdXRvcGxheScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgICBzd2lwZXIubG9vcEZpeCgpO1xuICAgICAgICAgICAgYXV0b3BsYXlSZXN1bHQgPSBzd2lwZXIuc2xpZGVOZXh0KHN3aXBlci5wYXJhbXMuc3BlZWQsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgZW1pdCgnYXV0b3BsYXknKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCFzd2lwZXIuaXNFbmQpIHtcbiAgICAgICAgICAgIGF1dG9wbGF5UmVzdWx0ID0gc3dpcGVyLnNsaWRlTmV4dChzd2lwZXIucGFyYW1zLnNwZWVkLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgIGVtaXQoJ2F1dG9wbGF5Jyk7XG4gICAgICAgICAgfSBlbHNlIGlmICghc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5zdG9wT25MYXN0U2xpZGUpIHtcbiAgICAgICAgICAgIGF1dG9wbGF5UmVzdWx0ID0gc3dpcGVyLnNsaWRlVG8oMCwgc3dpcGVyLnBhcmFtcy5zcGVlZCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICBlbWl0KCdhdXRvcGxheScpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdG9wKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuY3NzTW9kZSAmJiBzd2lwZXIuYXV0b3BsYXkucnVubmluZykgcnVuKCk7ZWxzZSBpZiAoYXV0b3BsYXlSZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBydW4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGltZW91dCAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKHN3aXBlci5hdXRvcGxheS5ydW5uaW5nKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHN3aXBlci5hdXRvcGxheS5ydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgZW1pdCgnYXV0b3BsYXlTdGFydCcpO1xuICAgICAgICBydW4oKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgIGlmICghc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKHR5cGVvZiB0aW1lb3V0ID09PSAndW5kZWZpbmVkJykgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGlmICh0aW1lb3V0KSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgIHRpbWVvdXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBzd2lwZXIuYXV0b3BsYXkucnVubmluZyA9IGZhbHNlO1xuICAgICAgICBlbWl0KCdhdXRvcGxheVN0b3AnKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHBhdXNlKHNwZWVkKSB7XG4gICAgICAgIGlmICghc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcpIHJldHVybjtcbiAgICAgICAgaWYgKHN3aXBlci5hdXRvcGxheS5wYXVzZWQpIHJldHVybjtcbiAgICAgICAgaWYgKHRpbWVvdXQpIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnBhdXNlZCA9IHRydWU7XG5cbiAgICAgICAgaWYgKHNwZWVkID09PSAwIHx8ICFzd2lwZXIucGFyYW1zLmF1dG9wbGF5LndhaXRGb3JUcmFuc2l0aW9uKSB7XG4gICAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgIHJ1bigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIFsndHJhbnNpdGlvbmVuZCcsICd3ZWJraXRUcmFuc2l0aW9uRW5kJ10uZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbFswXS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBvblRyYW5zaXRpb25FbmQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uVmlzaWJpbGl0eUNoYW5nZSgpIHtcbiAgICAgICAgY29uc3QgZG9jdW1lbnQgPSBnZXREb2N1bWVudCgpO1xuXG4gICAgICAgIGlmIChkb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgPT09ICdoaWRkZW4nICYmIHN3aXBlci5hdXRvcGxheS5ydW5uaW5nKSB7XG4gICAgICAgICAgcGF1c2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgPT09ICd2aXNpYmxlJyAmJiBzd2lwZXIuYXV0b3BsYXkucGF1c2VkKSB7XG4gICAgICAgICAgcnVuKCk7XG4gICAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uVHJhbnNpdGlvbkVuZChlKSB7XG4gICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci4kd3JhcHBlckVsKSByZXR1cm47XG4gICAgICAgIGlmIChlLnRhcmdldCAhPT0gc3dpcGVyLiR3cmFwcGVyRWxbMF0pIHJldHVybjtcbiAgICAgICAgWyd0cmFuc2l0aW9uZW5kJywgJ3dlYmtpdFRyYW5zaXRpb25FbmQnXS5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbFswXS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBvblRyYW5zaXRpb25FbmQpO1xuICAgICAgICB9KTtcbiAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnBhdXNlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICghc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcpIHtcbiAgICAgICAgICBzdG9wKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcnVuKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25Nb3VzZUVudGVyKCkge1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5kaXNhYmxlT25JbnRlcmFjdGlvbikge1xuICAgICAgICAgIHN0b3AoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbWl0KCdhdXRvcGxheVBhdXNlJyk7XG4gICAgICAgICAgcGF1c2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFsndHJhbnNpdGlvbmVuZCcsICd3ZWJraXRUcmFuc2l0aW9uRW5kJ10uZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWxbMF0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgb25UcmFuc2l0aW9uRW5kKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uTW91c2VMZWF2ZSgpIHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuYXV0b3BsYXkuZGlzYWJsZU9uSW50ZXJhY3Rpb24pIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzd2lwZXIuYXV0b3BsYXkucGF1c2VkID0gZmFsc2U7XG4gICAgICAgIGVtaXQoJ2F1dG9wbGF5UmVzdW1lJyk7XG4gICAgICAgIHJ1bigpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhdHRhY2hNb3VzZUV2ZW50cygpIHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuYXV0b3BsYXkucGF1c2VPbk1vdXNlRW50ZXIpIHtcbiAgICAgICAgICBzd2lwZXIuJGVsLm9uKCdtb3VzZWVudGVyJywgb25Nb3VzZUVudGVyKTtcbiAgICAgICAgICBzd2lwZXIuJGVsLm9uKCdtb3VzZWxlYXZlJywgb25Nb3VzZUxlYXZlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBkZXRhY2hNb3VzZUV2ZW50cygpIHtcbiAgICAgICAgc3dpcGVyLiRlbC5vZmYoJ21vdXNlZW50ZXInLCBvbk1vdXNlRW50ZXIpO1xuICAgICAgICBzd2lwZXIuJGVsLm9mZignbW91c2VsZWF2ZScsIG9uTW91c2VMZWF2ZSk7XG4gICAgICB9XG5cbiAgICAgIG9uKCdpbml0JywgKCkgPT4ge1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5lbmFibGVkKSB7XG4gICAgICAgICAgc3RhcnQoKTtcbiAgICAgICAgICBjb25zdCBkb2N1bWVudCA9IGdldERvY3VtZW50KCk7XG4gICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsIG9uVmlzaWJpbGl0eUNoYW5nZSk7XG4gICAgICAgICAgYXR0YWNoTW91c2VFdmVudHMoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvbignYmVmb3JlVHJhbnNpdGlvblN0YXJ0JywgKF9zLCBzcGVlZCwgaW50ZXJuYWwpID0+IHtcbiAgICAgICAgaWYgKHN3aXBlci5hdXRvcGxheS5ydW5uaW5nKSB7XG4gICAgICAgICAgaWYgKGludGVybmFsIHx8ICFzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmRpc2FibGVPbkludGVyYWN0aW9uKSB7XG4gICAgICAgICAgICBzd2lwZXIuYXV0b3BsYXkucGF1c2Uoc3BlZWQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdG9wKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9uKCdzbGlkZXJGaXJzdE1vdmUnLCAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIuYXV0b3BsYXkucnVubmluZykge1xuICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmRpc2FibGVPbkludGVyYWN0aW9uKSB7XG4gICAgICAgICAgICBzdG9wKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhdXNlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9uKCd0b3VjaEVuZCcsICgpID0+IHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuY3NzTW9kZSAmJiBzd2lwZXIuYXV0b3BsYXkucGF1c2VkICYmICFzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmRpc2FibGVPbkludGVyYWN0aW9uKSB7XG4gICAgICAgICAgcnVuKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgICAgIGRldGFjaE1vdXNlRXZlbnRzKCk7XG5cbiAgICAgICAgaWYgKHN3aXBlci5hdXRvcGxheS5ydW5uaW5nKSB7XG4gICAgICAgICAgc3RvcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZG9jdW1lbnQgPSBnZXREb2N1bWVudCgpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgb25WaXNpYmlsaXR5Q2hhbmdlKTtcbiAgICAgIH0pO1xuICAgICAgT2JqZWN0LmFzc2lnbihzd2lwZXIuYXV0b3BsYXksIHtcbiAgICAgICAgcGF1c2UsXG4gICAgICAgIHJ1bixcbiAgICAgICAgc3RhcnQsXG4gICAgICAgIHN0b3BcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIFRodW1iKF9yZWYpIHtcbiAgICAgIGxldCB7XG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgZXh0ZW5kUGFyYW1zLFxuICAgICAgICBvblxuICAgICAgfSA9IF9yZWY7XG4gICAgICBleHRlbmRQYXJhbXMoe1xuICAgICAgICB0aHVtYnM6IHtcbiAgICAgICAgICBzd2lwZXI6IG51bGwsXG4gICAgICAgICAgbXVsdGlwbGVBY3RpdmVUaHVtYnM6IHRydWUsXG4gICAgICAgICAgYXV0b1Njcm9sbE9mZnNldDogMCxcbiAgICAgICAgICBzbGlkZVRodW1iQWN0aXZlQ2xhc3M6ICdzd2lwZXItc2xpZGUtdGh1bWItYWN0aXZlJyxcbiAgICAgICAgICB0aHVtYnNDb250YWluZXJDbGFzczogJ3N3aXBlci10aHVtYnMnXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgbGV0IGluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgICBsZXQgc3dpcGVyQ3JlYXRlZCA9IGZhbHNlO1xuICAgICAgc3dpcGVyLnRodW1icyA9IHtcbiAgICAgICAgc3dpcGVyOiBudWxsXG4gICAgICB9O1xuXG4gICAgICBmdW5jdGlvbiBvblRodW1iQ2xpY2soKSB7XG4gICAgICAgIGNvbnN0IHRodW1ic1N3aXBlciA9IHN3aXBlci50aHVtYnMuc3dpcGVyO1xuICAgICAgICBpZiAoIXRodW1ic1N3aXBlciB8fCB0aHVtYnNTd2lwZXIuZGVzdHJveWVkKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGNsaWNrZWRJbmRleCA9IHRodW1ic1N3aXBlci5jbGlja2VkSW5kZXg7XG4gICAgICAgIGNvbnN0IGNsaWNrZWRTbGlkZSA9IHRodW1ic1N3aXBlci5jbGlja2VkU2xpZGU7XG4gICAgICAgIGlmIChjbGlja2VkU2xpZGUgJiYgJChjbGlja2VkU2xpZGUpLmhhc0NsYXNzKHN3aXBlci5wYXJhbXMudGh1bWJzLnNsaWRlVGh1bWJBY3RpdmVDbGFzcykpIHJldHVybjtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGlja2VkSW5kZXggPT09ICd1bmRlZmluZWQnIHx8IGNsaWNrZWRJbmRleCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICBsZXQgc2xpZGVUb0luZGV4O1xuXG4gICAgICAgIGlmICh0aHVtYnNTd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICBzbGlkZVRvSW5kZXggPSBwYXJzZUludCgkKHRodW1ic1N3aXBlci5jbGlja2VkU2xpZGUpLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JyksIDEwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzbGlkZVRvSW5kZXggPSBjbGlja2VkSW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgbGV0IGN1cnJlbnRJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcblxuICAgICAgICAgIGlmIChzd2lwZXIuc2xpZGVzLmVxKGN1cnJlbnRJbmRleCkuaGFzQ2xhc3Moc3dpcGVyLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSkge1xuICAgICAgICAgICAgc3dpcGVyLmxvb3BGaXgoKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG5cbiAgICAgICAgICAgIHN3aXBlci5fY2xpZW50TGVmdCA9IHN3aXBlci4kd3JhcHBlckVsWzBdLmNsaWVudExlZnQ7XG4gICAgICAgICAgICBjdXJyZW50SW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgcHJldkluZGV4ID0gc3dpcGVyLnNsaWRlcy5lcShjdXJyZW50SW5kZXgpLnByZXZBbGwoYFtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIiR7c2xpZGVUb0luZGV4fVwiXWApLmVxKDApLmluZGV4KCk7XG4gICAgICAgICAgY29uc3QgbmV4dEluZGV4ID0gc3dpcGVyLnNsaWRlcy5lcShjdXJyZW50SW5kZXgpLm5leHRBbGwoYFtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIiR7c2xpZGVUb0luZGV4fVwiXWApLmVxKDApLmluZGV4KCk7XG4gICAgICAgICAgaWYgKHR5cGVvZiBwcmV2SW5kZXggPT09ICd1bmRlZmluZWQnKSBzbGlkZVRvSW5kZXggPSBuZXh0SW5kZXg7ZWxzZSBpZiAodHlwZW9mIG5leHRJbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHNsaWRlVG9JbmRleCA9IHByZXZJbmRleDtlbHNlIGlmIChuZXh0SW5kZXggLSBjdXJyZW50SW5kZXggPCBjdXJyZW50SW5kZXggLSBwcmV2SW5kZXgpIHNsaWRlVG9JbmRleCA9IG5leHRJbmRleDtlbHNlIHNsaWRlVG9JbmRleCA9IHByZXZJbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHNsaWRlVG9JbmRleCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICB0aHVtYnM6IHRodW1ic1BhcmFtc1xuICAgICAgICB9ID0gc3dpcGVyLnBhcmFtcztcbiAgICAgICAgaWYgKGluaXRpYWxpemVkKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgU3dpcGVyQ2xhc3MgPSBzd2lwZXIuY29uc3RydWN0b3I7XG5cbiAgICAgICAgaWYgKHRodW1ic1BhcmFtcy5zd2lwZXIgaW5zdGFuY2VvZiBTd2lwZXJDbGFzcykge1xuICAgICAgICAgIHN3aXBlci50aHVtYnMuc3dpcGVyID0gdGh1bWJzUGFyYW1zLnN3aXBlcjtcbiAgICAgICAgICBPYmplY3QuYXNzaWduKHN3aXBlci50aHVtYnMuc3dpcGVyLm9yaWdpbmFsUGFyYW1zLCB7XG4gICAgICAgICAgICB3YXRjaFNsaWRlc1Byb2dyZXNzOiB0cnVlLFxuICAgICAgICAgICAgc2xpZGVUb0NsaWNrZWRTbGlkZTogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBPYmplY3QuYXNzaWduKHN3aXBlci50aHVtYnMuc3dpcGVyLnBhcmFtcywge1xuICAgICAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZSxcbiAgICAgICAgICAgIHNsaWRlVG9DbGlja2VkU2xpZGU6IGZhbHNlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodGh1bWJzUGFyYW1zLnN3aXBlcikpIHtcbiAgICAgICAgICBjb25zdCB0aHVtYnNTd2lwZXJQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aHVtYnNQYXJhbXMuc3dpcGVyKTtcbiAgICAgICAgICBPYmplY3QuYXNzaWduKHRodW1ic1N3aXBlclBhcmFtcywge1xuICAgICAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZSxcbiAgICAgICAgICAgIHNsaWRlVG9DbGlja2VkU2xpZGU6IGZhbHNlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc3dpcGVyLnRodW1icy5zd2lwZXIgPSBuZXcgU3dpcGVyQ2xhc3ModGh1bWJzU3dpcGVyUGFyYW1zKTtcbiAgICAgICAgICBzd2lwZXJDcmVhdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXBlci50aHVtYnMuc3dpcGVyLiRlbC5hZGRDbGFzcyhzd2lwZXIucGFyYW1zLnRodW1icy50aHVtYnNDb250YWluZXJDbGFzcyk7XG4gICAgICAgIHN3aXBlci50aHVtYnMuc3dpcGVyLm9uKCd0YXAnLCBvblRodW1iQ2xpY2spO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdXBkYXRlKGluaXRpYWwpIHtcbiAgICAgICAgY29uc3QgdGh1bWJzU3dpcGVyID0gc3dpcGVyLnRodW1icy5zd2lwZXI7XG4gICAgICAgIGlmICghdGh1bWJzU3dpcGVyIHx8IHRodW1ic1N3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgY29uc3Qgc2xpZGVzUGVyVmlldyA9IHRodW1ic1N3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nID8gdGh1bWJzU3dpcGVyLnNsaWRlc1BlclZpZXdEeW5hbWljKCkgOiB0aHVtYnNTd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXc7XG4gICAgICAgIGNvbnN0IGF1dG9TY3JvbGxPZmZzZXQgPSBzd2lwZXIucGFyYW1zLnRodW1icy5hdXRvU2Nyb2xsT2Zmc2V0O1xuICAgICAgICBjb25zdCB1c2VPZmZzZXQgPSBhdXRvU2Nyb2xsT2Zmc2V0ICYmICF0aHVtYnNTd2lwZXIucGFyYW1zLmxvb3A7XG5cbiAgICAgICAgaWYgKHN3aXBlci5yZWFsSW5kZXggIT09IHRodW1ic1N3aXBlci5yZWFsSW5kZXggfHwgdXNlT2Zmc2V0KSB7XG4gICAgICAgICAgbGV0IGN1cnJlbnRUaHVtYnNJbmRleCA9IHRodW1ic1N3aXBlci5hY3RpdmVJbmRleDtcbiAgICAgICAgICBsZXQgbmV3VGh1bWJzSW5kZXg7XG4gICAgICAgICAgbGV0IGRpcmVjdGlvbjtcblxuICAgICAgICAgIGlmICh0aHVtYnNTd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICAgIGlmICh0aHVtYnNTd2lwZXIuc2xpZGVzLmVxKGN1cnJlbnRUaHVtYnNJbmRleCkuaGFzQ2xhc3ModGh1bWJzU3dpcGVyLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSkge1xuICAgICAgICAgICAgICB0aHVtYnNTd2lwZXIubG9vcEZpeCgpOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcblxuICAgICAgICAgICAgICB0aHVtYnNTd2lwZXIuX2NsaWVudExlZnQgPSB0aHVtYnNTd2lwZXIuJHdyYXBwZXJFbFswXS5jbGllbnRMZWZ0O1xuICAgICAgICAgICAgICBjdXJyZW50VGh1bWJzSW5kZXggPSB0aHVtYnNTd2lwZXIuYWN0aXZlSW5kZXg7XG4gICAgICAgICAgICB9IC8vIEZpbmQgYWN0dWFsIHRodW1icyBpbmRleCB0byBzbGlkZSB0b1xuXG5cbiAgICAgICAgICAgIGNvbnN0IHByZXZUaHVtYnNJbmRleCA9IHRodW1ic1N3aXBlci5zbGlkZXMuZXEoY3VycmVudFRodW1ic0luZGV4KS5wcmV2QWxsKGBbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke3N3aXBlci5yZWFsSW5kZXh9XCJdYCkuZXEoMCkuaW5kZXgoKTtcbiAgICAgICAgICAgIGNvbnN0IG5leHRUaHVtYnNJbmRleCA9IHRodW1ic1N3aXBlci5zbGlkZXMuZXEoY3VycmVudFRodW1ic0luZGV4KS5uZXh0QWxsKGBbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke3N3aXBlci5yZWFsSW5kZXh9XCJdYCkuZXEoMCkuaW5kZXgoKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcmV2VGh1bWJzSW5kZXggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIG5ld1RodW1ic0luZGV4ID0gbmV4dFRodW1ic0luZGV4O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbmV4dFRodW1ic0luZGV4ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICBuZXdUaHVtYnNJbmRleCA9IHByZXZUaHVtYnNJbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dFRodW1ic0luZGV4IC0gY3VycmVudFRodW1ic0luZGV4ID09PSBjdXJyZW50VGh1bWJzSW5kZXggLSBwcmV2VGh1bWJzSW5kZXgpIHtcbiAgICAgICAgICAgICAgbmV3VGh1bWJzSW5kZXggPSB0aHVtYnNTd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwID4gMSA/IG5leHRUaHVtYnNJbmRleCA6IGN1cnJlbnRUaHVtYnNJbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dFRodW1ic0luZGV4IC0gY3VycmVudFRodW1ic0luZGV4IDwgY3VycmVudFRodW1ic0luZGV4IC0gcHJldlRodW1ic0luZGV4KSB7XG4gICAgICAgICAgICAgIG5ld1RodW1ic0luZGV4ID0gbmV4dFRodW1ic0luZGV4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbmV3VGh1bWJzSW5kZXggPSBwcmV2VGh1bWJzSW5kZXg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRpcmVjdGlvbiA9IHN3aXBlci5hY3RpdmVJbmRleCA+IHN3aXBlci5wcmV2aW91c0luZGV4ID8gJ25leHQnIDogJ3ByZXYnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdUaHVtYnNJbmRleCA9IHN3aXBlci5yZWFsSW5kZXg7XG4gICAgICAgICAgICBkaXJlY3Rpb24gPSBuZXdUaHVtYnNJbmRleCA+IHN3aXBlci5wcmV2aW91c0luZGV4ID8gJ25leHQnIDogJ3ByZXYnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1c2VPZmZzZXQpIHtcbiAgICAgICAgICAgIG5ld1RodW1ic0luZGV4ICs9IGRpcmVjdGlvbiA9PT0gJ25leHQnID8gYXV0b1Njcm9sbE9mZnNldCA6IC0xICogYXV0b1Njcm9sbE9mZnNldDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGh1bWJzU3dpcGVyLnZpc2libGVTbGlkZXNJbmRleGVzICYmIHRodW1ic1N3aXBlci52aXNpYmxlU2xpZGVzSW5kZXhlcy5pbmRleE9mKG5ld1RodW1ic0luZGV4KSA8IDApIHtcbiAgICAgICAgICAgIGlmICh0aHVtYnNTd2lwZXIucGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAgICAgICAgIGlmIChuZXdUaHVtYnNJbmRleCA+IGN1cnJlbnRUaHVtYnNJbmRleCkge1xuICAgICAgICAgICAgICAgIG5ld1RodW1ic0luZGV4ID0gbmV3VGh1bWJzSW5kZXggLSBNYXRoLmZsb29yKHNsaWRlc1BlclZpZXcgLyAyKSArIDE7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3VGh1bWJzSW5kZXggPSBuZXdUaHVtYnNJbmRleCArIE1hdGguZmxvb3Ioc2xpZGVzUGVyVmlldyAvIDIpIC0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdUaHVtYnNJbmRleCA+IGN1cnJlbnRUaHVtYnNJbmRleCAmJiB0aHVtYnNTd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwID09PSAxKSA7XG5cbiAgICAgICAgICAgIHRodW1ic1N3aXBlci5zbGlkZVRvKG5ld1RodW1ic0luZGV4LCBpbml0aWFsID8gMCA6IHVuZGVmaW5lZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IC8vIEFjdGl2YXRlIHRodW1ic1xuXG5cbiAgICAgICAgbGV0IHRodW1ic1RvQWN0aXZhdGUgPSAxO1xuICAgICAgICBjb25zdCB0aHVtYkFjdGl2ZUNsYXNzID0gc3dpcGVyLnBhcmFtcy50aHVtYnMuc2xpZGVUaHVtYkFjdGl2ZUNsYXNzO1xuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgPiAxICYmICFzd2lwZXIucGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAgICAgdGh1bWJzVG9BY3RpdmF0ZSA9IHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy50aHVtYnMubXVsdGlwbGVBY3RpdmVUaHVtYnMpIHtcbiAgICAgICAgICB0aHVtYnNUb0FjdGl2YXRlID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRodW1ic1RvQWN0aXZhdGUgPSBNYXRoLmZsb29yKHRodW1ic1RvQWN0aXZhdGUpO1xuICAgICAgICB0aHVtYnNTd2lwZXIuc2xpZGVzLnJlbW92ZUNsYXNzKHRodW1iQWN0aXZlQ2xhc3MpO1xuXG4gICAgICAgIGlmICh0aHVtYnNTd2lwZXIucGFyYW1zLmxvb3AgfHwgdGh1bWJzU3dpcGVyLnBhcmFtcy52aXJ0dWFsICYmIHRodW1ic1N3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aHVtYnNUb0FjdGl2YXRlOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRodW1ic1N3aXBlci4kd3JhcHBlckVsLmNoaWxkcmVuKGBbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke3N3aXBlci5yZWFsSW5kZXggKyBpfVwiXWApLmFkZENsYXNzKHRodW1iQWN0aXZlQ2xhc3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRodW1ic1RvQWN0aXZhdGU7IGkgKz0gMSkge1xuICAgICAgICAgICAgdGh1bWJzU3dpcGVyLnNsaWRlcy5lcShzd2lwZXIucmVhbEluZGV4ICsgaSkuYWRkQ2xhc3ModGh1bWJBY3RpdmVDbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG9uKCdiZWZvcmVJbml0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgdGh1bWJzXG4gICAgICAgIH0gPSBzd2lwZXIucGFyYW1zO1xuICAgICAgICBpZiAoIXRodW1icyB8fCAhdGh1bWJzLnN3aXBlcikgcmV0dXJuO1xuICAgICAgICBpbml0KCk7XG4gICAgICAgIHVwZGF0ZSh0cnVlKTtcbiAgICAgIH0pO1xuICAgICAgb24oJ3NsaWRlQ2hhbmdlIHVwZGF0ZSByZXNpemUgb2JzZXJ2ZXJVcGRhdGUnLCAoKSA9PiB7XG4gICAgICAgIHVwZGF0ZSgpO1xuICAgICAgfSk7XG4gICAgICBvbignc2V0VHJhbnNpdGlvbicsIChfcywgZHVyYXRpb24pID0+IHtcbiAgICAgICAgY29uc3QgdGh1bWJzU3dpcGVyID0gc3dpcGVyLnRodW1icy5zd2lwZXI7XG4gICAgICAgIGlmICghdGh1bWJzU3dpcGVyIHx8IHRodW1ic1N3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgdGh1bWJzU3dpcGVyLnNldFRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgICAgfSk7XG4gICAgICBvbignYmVmb3JlRGVzdHJveScsICgpID0+IHtcbiAgICAgICAgY29uc3QgdGh1bWJzU3dpcGVyID0gc3dpcGVyLnRodW1icy5zd2lwZXI7XG4gICAgICAgIGlmICghdGh1bWJzU3dpcGVyIHx8IHRodW1ic1N3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcblxuICAgICAgICBpZiAoc3dpcGVyQ3JlYXRlZCkge1xuICAgICAgICAgIHRodW1ic1N3aXBlci5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgT2JqZWN0LmFzc2lnbihzd2lwZXIudGh1bWJzLCB7XG4gICAgICAgIGluaXQsXG4gICAgICAgIHVwZGF0ZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZnJlZU1vZGUoX3JlZikge1xuICAgICAgbGV0IHtcbiAgICAgICAgc3dpcGVyLFxuICAgICAgICBleHRlbmRQYXJhbXMsXG4gICAgICAgIGVtaXQsXG4gICAgICAgIG9uY2VcbiAgICAgIH0gPSBfcmVmO1xuICAgICAgZXh0ZW5kUGFyYW1zKHtcbiAgICAgICAgZnJlZU1vZGU6IHtcbiAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICBtb21lbnR1bTogdHJ1ZSxcbiAgICAgICAgICBtb21lbnR1bVJhdGlvOiAxLFxuICAgICAgICAgIG1vbWVudHVtQm91bmNlOiB0cnVlLFxuICAgICAgICAgIG1vbWVudHVtQm91bmNlUmF0aW86IDEsXG4gICAgICAgICAgbW9tZW50dW1WZWxvY2l0eVJhdGlvOiAxLFxuICAgICAgICAgIHN0aWNreTogZmFsc2UsXG4gICAgICAgICAgbWluaW11bVZlbG9jaXR5OiAwLjAyXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBmdW5jdGlvbiBvblRvdWNoU3RhcnQoKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHN3aXBlci5nZXRUcmFuc2xhdGUoKTtcbiAgICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZSh0cmFuc2xhdGUpO1xuICAgICAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbigwKTtcbiAgICAgICAgc3dpcGVyLnRvdWNoRXZlbnRzRGF0YS52ZWxvY2l0aWVzLmxlbmd0aCA9IDA7XG4gICAgICAgIHN3aXBlci5mcmVlTW9kZS5vblRvdWNoRW5kKHtcbiAgICAgICAgICBjdXJyZW50UG9zOiBzd2lwZXIucnRsID8gc3dpcGVyLnRyYW5zbGF0ZSA6IC1zd2lwZXIudHJhbnNsYXRlXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvblRvdWNoTW92ZSgpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHRvdWNoRXZlbnRzRGF0YTogZGF0YSxcbiAgICAgICAgICB0b3VjaGVzXG4gICAgICAgIH0gPSBzd2lwZXI7IC8vIFZlbG9jaXR5XG5cbiAgICAgICAgaWYgKGRhdGEudmVsb2NpdGllcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBkYXRhLnZlbG9jaXRpZXMucHVzaCh7XG4gICAgICAgICAgICBwb3NpdGlvbjogdG91Y2hlc1tzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAnc3RhcnRYJyA6ICdzdGFydFknXSxcbiAgICAgICAgICAgIHRpbWU6IGRhdGEudG91Y2hTdGFydFRpbWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGEudmVsb2NpdGllcy5wdXNoKHtcbiAgICAgICAgICBwb3NpdGlvbjogdG91Y2hlc1tzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAnY3VycmVudFgnIDogJ2N1cnJlbnRZJ10sXG4gICAgICAgICAgdGltZTogbm93KClcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uVG91Y2hFbmQoX3JlZjIpIHtcbiAgICAgICAgbGV0IHtcbiAgICAgICAgICBjdXJyZW50UG9zXG4gICAgICAgIH0gPSBfcmVmMjtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHBhcmFtcyxcbiAgICAgICAgICAkd3JhcHBlckVsLFxuICAgICAgICAgIHJ0bFRyYW5zbGF0ZTogcnRsLFxuICAgICAgICAgIHNuYXBHcmlkLFxuICAgICAgICAgIHRvdWNoRXZlbnRzRGF0YTogZGF0YVxuICAgICAgICB9ID0gc3dpcGVyOyAvLyBUaW1lIGRpZmZcblxuICAgICAgICBjb25zdCB0b3VjaEVuZFRpbWUgPSBub3coKTtcbiAgICAgICAgY29uc3QgdGltZURpZmYgPSB0b3VjaEVuZFRpbWUgLSBkYXRhLnRvdWNoU3RhcnRUaW1lO1xuXG4gICAgICAgIGlmIChjdXJyZW50UG9zIDwgLXN3aXBlci5taW5UcmFuc2xhdGUoKSkge1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnJlbnRQb3MgPiAtc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSB7XG4gICAgICAgICAgaWYgKHN3aXBlci5zbGlkZXMubGVuZ3RoIDwgc25hcEdyaWQubGVuZ3RoKSB7XG4gICAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzbmFwR3JpZC5sZW5ndGggLSAxKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnNsaWRlcy5sZW5ndGggLSAxKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW1zLmZyZWVNb2RlLm1vbWVudHVtKSB7XG4gICAgICAgICAgaWYgKGRhdGEudmVsb2NpdGllcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBjb25zdCBsYXN0TW92ZUV2ZW50ID0gZGF0YS52ZWxvY2l0aWVzLnBvcCgpO1xuICAgICAgICAgICAgY29uc3QgdmVsb2NpdHlFdmVudCA9IGRhdGEudmVsb2NpdGllcy5wb3AoKTtcbiAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gbGFzdE1vdmVFdmVudC5wb3NpdGlvbiAtIHZlbG9jaXR5RXZlbnQucG9zaXRpb247XG4gICAgICAgICAgICBjb25zdCB0aW1lID0gbGFzdE1vdmVFdmVudC50aW1lIC0gdmVsb2NpdHlFdmVudC50aW1lO1xuICAgICAgICAgICAgc3dpcGVyLnZlbG9jaXR5ID0gZGlzdGFuY2UgLyB0aW1lO1xuICAgICAgICAgICAgc3dpcGVyLnZlbG9jaXR5IC89IDI7XG5cbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhzd2lwZXIudmVsb2NpdHkpIDwgcGFyYW1zLmZyZWVNb2RlLm1pbmltdW1WZWxvY2l0eSkge1xuICAgICAgICAgICAgICBzd2lwZXIudmVsb2NpdHkgPSAwO1xuICAgICAgICAgICAgfSAvLyB0aGlzIGltcGxpZXMgdGhhdCB0aGUgdXNlciBzdG9wcGVkIG1vdmluZyBhIGZpbmdlciB0aGVuIHJlbGVhc2VkLlxuICAgICAgICAgICAgLy8gVGhlcmUgd291bGQgYmUgbm8gZXZlbnRzIHdpdGggZGlzdGFuY2UgemVybywgc28gdGhlIGxhc3QgZXZlbnQgaXMgc3RhbGUuXG5cblxuICAgICAgICAgICAgaWYgKHRpbWUgPiAxNTAgfHwgbm93KCkgLSBsYXN0TW92ZUV2ZW50LnRpbWUgPiAzMDApIHtcbiAgICAgICAgICAgICAgc3dpcGVyLnZlbG9jaXR5ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3dpcGVyLnZlbG9jaXR5ID0gMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzd2lwZXIudmVsb2NpdHkgKj0gcGFyYW1zLmZyZWVNb2RlLm1vbWVudHVtVmVsb2NpdHlSYXRpbztcbiAgICAgICAgICBkYXRhLnZlbG9jaXRpZXMubGVuZ3RoID0gMDtcbiAgICAgICAgICBsZXQgbW9tZW50dW1EdXJhdGlvbiA9IDEwMDAgKiBwYXJhbXMuZnJlZU1vZGUubW9tZW50dW1SYXRpbztcbiAgICAgICAgICBjb25zdCBtb21lbnR1bURpc3RhbmNlID0gc3dpcGVyLnZlbG9jaXR5ICogbW9tZW50dW1EdXJhdGlvbjtcbiAgICAgICAgICBsZXQgbmV3UG9zaXRpb24gPSBzd2lwZXIudHJhbnNsYXRlICsgbW9tZW50dW1EaXN0YW5jZTtcbiAgICAgICAgICBpZiAocnRsKSBuZXdQb3NpdGlvbiA9IC1uZXdQb3NpdGlvbjtcbiAgICAgICAgICBsZXQgZG9Cb3VuY2UgPSBmYWxzZTtcbiAgICAgICAgICBsZXQgYWZ0ZXJCb3VuY2VQb3NpdGlvbjtcbiAgICAgICAgICBjb25zdCBib3VuY2VBbW91bnQgPSBNYXRoLmFicyhzd2lwZXIudmVsb2NpdHkpICogMjAgKiBwYXJhbXMuZnJlZU1vZGUubW9tZW50dW1Cb3VuY2VSYXRpbztcbiAgICAgICAgICBsZXQgbmVlZHNMb29wRml4O1xuXG4gICAgICAgICAgaWYgKG5ld1Bvc2l0aW9uIDwgc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSB7XG4gICAgICAgICAgICBpZiAocGFyYW1zLmZyZWVNb2RlLm1vbWVudHVtQm91bmNlKSB7XG4gICAgICAgICAgICAgIGlmIChuZXdQb3NpdGlvbiArIHN3aXBlci5tYXhUcmFuc2xhdGUoKSA8IC1ib3VuY2VBbW91bnQpIHtcbiAgICAgICAgICAgICAgICBuZXdQb3NpdGlvbiA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSAtIGJvdW5jZUFtb3VudDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGFmdGVyQm91bmNlUG9zaXRpb24gPSBzd2lwZXIubWF4VHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgIGRvQm91bmNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgZGF0YS5hbGxvd01vbWVudHVtQm91bmNlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGFyYW1zLmxvb3AgJiYgcGFyYW1zLmNlbnRlcmVkU2xpZGVzKSBuZWVkc0xvb3BGaXggPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAobmV3UG9zaXRpb24gPiBzd2lwZXIubWluVHJhbnNsYXRlKCkpIHtcbiAgICAgICAgICAgIGlmIChwYXJhbXMuZnJlZU1vZGUubW9tZW50dW1Cb3VuY2UpIHtcbiAgICAgICAgICAgICAgaWYgKG5ld1Bvc2l0aW9uIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpID4gYm91bmNlQW1vdW50KSB7XG4gICAgICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBzd2lwZXIubWluVHJhbnNsYXRlKCkgKyBib3VuY2VBbW91bnQ7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBhZnRlckJvdW5jZVBvc2l0aW9uID0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICBkb0JvdW5jZSA9IHRydWU7XG4gICAgICAgICAgICAgIGRhdGEuYWxsb3dNb21lbnR1bUJvdW5jZSA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXdQb3NpdGlvbiA9IHN3aXBlci5taW5UcmFuc2xhdGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBhcmFtcy5sb29wICYmIHBhcmFtcy5jZW50ZXJlZFNsaWRlcykgbmVlZHNMb29wRml4ID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5mcmVlTW9kZS5zdGlja3kpIHtcbiAgICAgICAgICAgIGxldCBuZXh0U2xpZGU7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc25hcEdyaWQubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICAgICAgaWYgKHNuYXBHcmlkW2pdID4gLW5ld1Bvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgbmV4dFNsaWRlID0gajtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoc25hcEdyaWRbbmV4dFNsaWRlXSAtIG5ld1Bvc2l0aW9uKSA8IE1hdGguYWJzKHNuYXBHcmlkW25leHRTbGlkZSAtIDFdIC0gbmV3UG9zaXRpb24pIHx8IHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gJ25leHQnKSB7XG4gICAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gc25hcEdyaWRbbmV4dFNsaWRlXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gc25hcEdyaWRbbmV4dFNsaWRlIC0gMV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gLW5ld1Bvc2l0aW9uO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChuZWVkc0xvb3BGaXgpIHtcbiAgICAgICAgICAgIG9uY2UoJ3RyYW5zaXRpb25FbmQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHN3aXBlci5sb29wRml4KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IC8vIEZpeCBkdXJhdGlvblxuXG5cbiAgICAgICAgICBpZiAoc3dpcGVyLnZlbG9jaXR5ICE9PSAwKSB7XG4gICAgICAgICAgICBpZiAocnRsKSB7XG4gICAgICAgICAgICAgIG1vbWVudHVtRHVyYXRpb24gPSBNYXRoLmFicygoLW5ld1Bvc2l0aW9uIC0gc3dpcGVyLnRyYW5zbGF0ZSkgLyBzd2lwZXIudmVsb2NpdHkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbW9tZW50dW1EdXJhdGlvbiA9IE1hdGguYWJzKChuZXdQb3NpdGlvbiAtIHN3aXBlci50cmFuc2xhdGUpIC8gc3dpcGVyLnZlbG9jaXR5KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBhcmFtcy5mcmVlTW9kZS5zdGlja3kpIHtcbiAgICAgICAgICAgICAgLy8gSWYgZnJlZU1vZGUuc3RpY2t5IGlzIGFjdGl2ZSBhbmQgdGhlIHVzZXIgZW5kcyBhIHN3aXBlIHdpdGggYSBzbG93LXZlbG9jaXR5XG4gICAgICAgICAgICAgIC8vIGV2ZW50LCB0aGVuIGR1cmF0aW9ucyBjYW4gYmUgMjArIHNlY29uZHMgdG8gc2xpZGUgb25lIChvciB6ZXJvISkgc2xpZGVzLlxuICAgICAgICAgICAgICAvLyBJdCdzIGVhc3kgdG8gc2VlIHRoaXMgd2hlbiBzaW11bGF0aW5nIHRvdWNoIHdpdGggbW91c2UgZXZlbnRzLiBUbyBmaXggdGhpcyxcbiAgICAgICAgICAgICAgLy8gbGltaXQgc2luZ2xlLXNsaWRlIHN3aXBlcyB0byB0aGUgZGVmYXVsdCBzbGlkZSBkdXJhdGlvbi4gVGhpcyBhbHNvIGhhcyB0aGVcbiAgICAgICAgICAgICAgLy8gbmljZSBzaWRlIGVmZmVjdCBvZiBtYXRjaGluZyBzbGlkZSBzcGVlZCBpZiB0aGUgdXNlciBzdG9wcGVkIG1vdmluZyBiZWZvcmVcbiAgICAgICAgICAgICAgLy8gbGlmdGluZyBmaW5nZXIgb3IgbW91c2UgdnMuIG1vdmluZyBzbG93bHkgYmVmb3JlIGxpZnRpbmcgdGhlIGZpbmdlci9tb3VzZS5cbiAgICAgICAgICAgICAgLy8gRm9yIGZhc3RlciBzd2lwZXMsIGFsc28gYXBwbHkgbGltaXRzIChhbGJlaXQgaGlnaGVyIG9uZXMpLlxuICAgICAgICAgICAgICBjb25zdCBtb3ZlRGlzdGFuY2UgPSBNYXRoLmFicygocnRsID8gLW5ld1Bvc2l0aW9uIDogbmV3UG9zaXRpb24pIC0gc3dpcGVyLnRyYW5zbGF0ZSk7XG4gICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTbGlkZVNpemUgPSBzd2lwZXIuc2xpZGVzU2l6ZXNHcmlkW3N3aXBlci5hY3RpdmVJbmRleF07XG5cbiAgICAgICAgICAgICAgaWYgKG1vdmVEaXN0YW5jZSA8IGN1cnJlbnRTbGlkZVNpemUpIHtcbiAgICAgICAgICAgICAgICBtb21lbnR1bUR1cmF0aW9uID0gcGFyYW1zLnNwZWVkO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1vdmVEaXN0YW5jZSA8IDIgKiBjdXJyZW50U2xpZGVTaXplKSB7XG4gICAgICAgICAgICAgICAgbW9tZW50dW1EdXJhdGlvbiA9IHBhcmFtcy5zcGVlZCAqIDEuNTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtb21lbnR1bUR1cmF0aW9uID0gcGFyYW1zLnNwZWVkICogMi41O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMuZnJlZU1vZGUuc3RpY2t5KSB7XG4gICAgICAgICAgICBzd2lwZXIuc2xpZGVUb0Nsb3Nlc3QoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGFyYW1zLmZyZWVNb2RlLm1vbWVudHVtQm91bmNlICYmIGRvQm91bmNlKSB7XG4gICAgICAgICAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MoYWZ0ZXJCb3VuY2VQb3NpdGlvbik7XG4gICAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbihtb21lbnR1bUR1cmF0aW9uKTtcbiAgICAgICAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUobmV3UG9zaXRpb24pO1xuICAgICAgICAgICAgc3dpcGVyLnRyYW5zaXRpb25TdGFydCh0cnVlLCBzd2lwZXIuc3dpcGVEaXJlY3Rpb24pO1xuICAgICAgICAgICAgc3dpcGVyLmFuaW1hdGluZyA9IHRydWU7XG4gICAgICAgICAgICAkd3JhcHBlckVsLnRyYW5zaXRpb25FbmQoKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkIHx8ICFkYXRhLmFsbG93TW9tZW50dW1Cb3VuY2UpIHJldHVybjtcbiAgICAgICAgICAgICAgZW1pdCgnbW9tZW50dW1Cb3VuY2UnKTtcbiAgICAgICAgICAgICAgc3dpcGVyLnNldFRyYW5zaXRpb24ocGFyYW1zLnNwZWVkKTtcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZShhZnRlckJvdW5jZVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAkd3JhcHBlckVsLnRyYW5zaXRpb25FbmQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgc3dpcGVyLnRyYW5zaXRpb25FbmQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHN3aXBlci52ZWxvY2l0eSkge1xuICAgICAgICAgICAgZW1pdCgnX2ZyZWVNb2RlTm9Nb21lbnR1bVJlbGVhc2UnKTtcbiAgICAgICAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcyhuZXdQb3NpdGlvbik7XG4gICAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbihtb21lbnR1bUR1cmF0aW9uKTtcbiAgICAgICAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUobmV3UG9zaXRpb24pO1xuICAgICAgICAgICAgc3dpcGVyLnRyYW5zaXRpb25TdGFydCh0cnVlLCBzd2lwZXIuc3dpcGVEaXJlY3Rpb24pO1xuXG4gICAgICAgICAgICBpZiAoIXN3aXBlci5hbmltYXRpbmcpIHtcbiAgICAgICAgICAgICAgc3dpcGVyLmFuaW1hdGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICR3cmFwcGVyRWwudHJhbnNpdGlvbkVuZCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHN3aXBlci50cmFuc2l0aW9uRW5kKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MobmV3UG9zaXRpb24pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgICAgIH0gZWxzZSBpZiAocGFyYW1zLmZyZWVNb2RlLnN0aWNreSkge1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvQ2xvc2VzdCgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMuZnJlZU1vZGUpIHtcbiAgICAgICAgICBlbWl0KCdfZnJlZU1vZGVOb01vbWVudHVtUmVsZWFzZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFwYXJhbXMuZnJlZU1vZGUubW9tZW50dW0gfHwgdGltZURpZmYgPj0gcGFyYW1zLmxvbmdTd2lwZXNNcykge1xuICAgICAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcygpO1xuICAgICAgICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgT2JqZWN0LmFzc2lnbihzd2lwZXIsIHtcbiAgICAgICAgZnJlZU1vZGU6IHtcbiAgICAgICAgICBvblRvdWNoU3RhcnQsXG4gICAgICAgICAgb25Ub3VjaE1vdmUsXG4gICAgICAgICAgb25Ub3VjaEVuZFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBHcmlkKF9yZWYpIHtcbiAgICAgIGxldCB7XG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgZXh0ZW5kUGFyYW1zXG4gICAgICB9ID0gX3JlZjtcbiAgICAgIGV4dGVuZFBhcmFtcyh7XG4gICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICByb3dzOiAxLFxuICAgICAgICAgIGZpbGw6ICdjb2x1bW4nXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgbGV0IHNsaWRlc051bWJlckV2ZW5Ub1Jvd3M7XG4gICAgICBsZXQgc2xpZGVzUGVyUm93O1xuICAgICAgbGV0IG51bUZ1bGxDb2x1bW5zO1xuXG4gICAgICBjb25zdCBpbml0U2xpZGVzID0gc2xpZGVzTGVuZ3RoID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXdcbiAgICAgICAgfSA9IHN3aXBlci5wYXJhbXM7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICByb3dzLFxuICAgICAgICAgIGZpbGxcbiAgICAgICAgfSA9IHN3aXBlci5wYXJhbXMuZ3JpZDtcbiAgICAgICAgc2xpZGVzUGVyUm93ID0gc2xpZGVzTnVtYmVyRXZlblRvUm93cyAvIHJvd3M7XG4gICAgICAgIG51bUZ1bGxDb2x1bW5zID0gTWF0aC5mbG9vcihzbGlkZXNMZW5ndGggLyByb3dzKTtcblxuICAgICAgICBpZiAoTWF0aC5mbG9vcihzbGlkZXNMZW5ndGggLyByb3dzKSA9PT0gc2xpZGVzTGVuZ3RoIC8gcm93cykge1xuICAgICAgICAgIHNsaWRlc051bWJlckV2ZW5Ub1Jvd3MgPSBzbGlkZXNMZW5ndGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2xpZGVzTnVtYmVyRXZlblRvUm93cyA9IE1hdGguY2VpbChzbGlkZXNMZW5ndGggLyByb3dzKSAqIHJvd3M7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2xpZGVzUGVyVmlldyAhPT0gJ2F1dG8nICYmIGZpbGwgPT09ICdyb3cnKSB7XG4gICAgICAgICAgc2xpZGVzTnVtYmVyRXZlblRvUm93cyA9IE1hdGgubWF4KHNsaWRlc051bWJlckV2ZW5Ub1Jvd3MsIHNsaWRlc1BlclZpZXcgKiByb3dzKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3QgdXBkYXRlU2xpZGUgPSAoaSwgc2xpZGUsIHNsaWRlc0xlbmd0aCwgZ2V0RGlyZWN0aW9uTGFiZWwpID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHNsaWRlc1Blckdyb3VwLFxuICAgICAgICAgIHNwYWNlQmV0d2VlblxuICAgICAgICB9ID0gc3dpcGVyLnBhcmFtcztcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHJvd3MsXG4gICAgICAgICAgZmlsbFxuICAgICAgICB9ID0gc3dpcGVyLnBhcmFtcy5ncmlkOyAvLyBTZXQgc2xpZGVzIG9yZGVyXG5cbiAgICAgICAgbGV0IG5ld1NsaWRlT3JkZXJJbmRleDtcbiAgICAgICAgbGV0IGNvbHVtbjtcbiAgICAgICAgbGV0IHJvdztcblxuICAgICAgICBpZiAoZmlsbCA9PT0gJ3JvdycgJiYgc2xpZGVzUGVyR3JvdXAgPiAxKSB7XG4gICAgICAgICAgY29uc3QgZ3JvdXBJbmRleCA9IE1hdGguZmxvb3IoaSAvIChzbGlkZXNQZXJHcm91cCAqIHJvd3MpKTtcbiAgICAgICAgICBjb25zdCBzbGlkZUluZGV4SW5Hcm91cCA9IGkgLSByb3dzICogc2xpZGVzUGVyR3JvdXAgKiBncm91cEluZGV4O1xuICAgICAgICAgIGNvbnN0IGNvbHVtbnNJbkdyb3VwID0gZ3JvdXBJbmRleCA9PT0gMCA/IHNsaWRlc1Blckdyb3VwIDogTWF0aC5taW4oTWF0aC5jZWlsKChzbGlkZXNMZW5ndGggLSBncm91cEluZGV4ICogcm93cyAqIHNsaWRlc1Blckdyb3VwKSAvIHJvd3MpLCBzbGlkZXNQZXJHcm91cCk7XG4gICAgICAgICAgcm93ID0gTWF0aC5mbG9vcihzbGlkZUluZGV4SW5Hcm91cCAvIGNvbHVtbnNJbkdyb3VwKTtcbiAgICAgICAgICBjb2x1bW4gPSBzbGlkZUluZGV4SW5Hcm91cCAtIHJvdyAqIGNvbHVtbnNJbkdyb3VwICsgZ3JvdXBJbmRleCAqIHNsaWRlc1Blckdyb3VwO1xuICAgICAgICAgIG5ld1NsaWRlT3JkZXJJbmRleCA9IGNvbHVtbiArIHJvdyAqIHNsaWRlc051bWJlckV2ZW5Ub1Jvd3MgLyByb3dzO1xuICAgICAgICAgIHNsaWRlLmNzcyh7XG4gICAgICAgICAgICAnLXdlYmtpdC1vcmRlcic6IG5ld1NsaWRlT3JkZXJJbmRleCxcbiAgICAgICAgICAgIG9yZGVyOiBuZXdTbGlkZU9yZGVySW5kZXhcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChmaWxsID09PSAnY29sdW1uJykge1xuICAgICAgICAgIGNvbHVtbiA9IE1hdGguZmxvb3IoaSAvIHJvd3MpO1xuICAgICAgICAgIHJvdyA9IGkgLSBjb2x1bW4gKiByb3dzO1xuXG4gICAgICAgICAgaWYgKGNvbHVtbiA+IG51bUZ1bGxDb2x1bW5zIHx8IGNvbHVtbiA9PT0gbnVtRnVsbENvbHVtbnMgJiYgcm93ID09PSByb3dzIC0gMSkge1xuICAgICAgICAgICAgcm93ICs9IDE7XG5cbiAgICAgICAgICAgIGlmIChyb3cgPj0gcm93cykge1xuICAgICAgICAgICAgICByb3cgPSAwO1xuICAgICAgICAgICAgICBjb2x1bW4gKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcm93ID0gTWF0aC5mbG9vcihpIC8gc2xpZGVzUGVyUm93KTtcbiAgICAgICAgICBjb2x1bW4gPSBpIC0gcm93ICogc2xpZGVzUGVyUm93O1xuICAgICAgICB9XG5cbiAgICAgICAgc2xpZGUuY3NzKGdldERpcmVjdGlvbkxhYmVsKCdtYXJnaW4tdG9wJyksIHJvdyAhPT0gMCA/IHNwYWNlQmV0d2VlbiAmJiBgJHtzcGFjZUJldHdlZW59cHhgIDogJycpO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgdXBkYXRlV3JhcHBlclNpemUgPSAoc2xpZGVTaXplLCBzbmFwR3JpZCwgZ2V0RGlyZWN0aW9uTGFiZWwpID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHNwYWNlQmV0d2VlbixcbiAgICAgICAgICBjZW50ZXJlZFNsaWRlcyxcbiAgICAgICAgICByb3VuZExlbmd0aHNcbiAgICAgICAgfSA9IHN3aXBlci5wYXJhbXM7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICByb3dzXG4gICAgICAgIH0gPSBzd2lwZXIucGFyYW1zLmdyaWQ7XG4gICAgICAgIHN3aXBlci52aXJ0dWFsU2l6ZSA9IChzbGlkZVNpemUgKyBzcGFjZUJldHdlZW4pICogc2xpZGVzTnVtYmVyRXZlblRvUm93cztcbiAgICAgICAgc3dpcGVyLnZpcnR1YWxTaXplID0gTWF0aC5jZWlsKHN3aXBlci52aXJ0dWFsU2l6ZSAvIHJvd3MpIC0gc3BhY2VCZXR3ZWVuO1xuICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5jc3Moe1xuICAgICAgICAgIFtnZXREaXJlY3Rpb25MYWJlbCgnd2lkdGgnKV06IGAke3N3aXBlci52aXJ0dWFsU2l6ZSArIHNwYWNlQmV0d2Vlbn1weGBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAgICAgc25hcEdyaWQuc3BsaWNlKDAsIHNuYXBHcmlkLmxlbmd0aCk7XG4gICAgICAgICAgY29uc3QgbmV3U2xpZGVzR3JpZCA9IFtdO1xuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbmFwR3JpZC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgbGV0IHNsaWRlc0dyaWRJdGVtID0gc25hcEdyaWRbaV07XG4gICAgICAgICAgICBpZiAocm91bmRMZW5ndGhzKSBzbGlkZXNHcmlkSXRlbSA9IE1hdGguZmxvb3Ioc2xpZGVzR3JpZEl0ZW0pO1xuICAgICAgICAgICAgaWYgKHNuYXBHcmlkW2ldIDwgc3dpcGVyLnZpcnR1YWxTaXplICsgc25hcEdyaWRbMF0pIG5ld1NsaWRlc0dyaWQucHVzaChzbGlkZXNHcmlkSXRlbSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc25hcEdyaWQucHVzaCguLi5uZXdTbGlkZXNHcmlkKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgc3dpcGVyLmdyaWQgPSB7XG4gICAgICAgIGluaXRTbGlkZXMsXG4gICAgICAgIHVwZGF0ZVNsaWRlLFxuICAgICAgICB1cGRhdGVXcmFwcGVyU2l6ZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRTbGlkZShzbGlkZXMpIHtcbiAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICBjb25zdCB7XG4gICAgICAgICR3cmFwcGVyRWwsXG4gICAgICAgIHBhcmFtc1xuICAgICAgfSA9IHN3aXBlcjtcblxuICAgICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICAgIHN3aXBlci5sb29wRGVzdHJveSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHNsaWRlcyA9PT0gJ29iamVjdCcgJiYgJ2xlbmd0aCcgaW4gc2xpZGVzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgaWYgKHNsaWRlc1tpXSkgJHdyYXBwZXJFbC5hcHBlbmQoc2xpZGVzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHdyYXBwZXJFbC5hcHBlbmQoc2xpZGVzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICAgIHN3aXBlci5sb29wQ3JlYXRlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICghcGFyYW1zLm9ic2VydmVyKSB7XG4gICAgICAgIHN3aXBlci51cGRhdGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmVwZW5kU2xpZGUoc2xpZGVzKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgY29uc3Qge1xuICAgICAgICBwYXJhbXMsXG4gICAgICAgICR3cmFwcGVyRWwsXG4gICAgICAgIGFjdGl2ZUluZGV4XG4gICAgICB9ID0gc3dpcGVyO1xuXG4gICAgICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICAgICAgc3dpcGVyLmxvb3BEZXN0cm95KCk7XG4gICAgICB9XG5cbiAgICAgIGxldCBuZXdBY3RpdmVJbmRleCA9IGFjdGl2ZUluZGV4ICsgMTtcblxuICAgICAgaWYgKHR5cGVvZiBzbGlkZXMgPT09ICdvYmplY3QnICYmICdsZW5ndGgnIGluIHNsaWRlcykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGlmIChzbGlkZXNbaV0pICR3cmFwcGVyRWwucHJlcGVuZChzbGlkZXNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbmV3QWN0aXZlSW5kZXggPSBhY3RpdmVJbmRleCArIHNsaWRlcy5sZW5ndGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkd3JhcHBlckVsLnByZXBlbmQoc2xpZGVzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICAgIHN3aXBlci5sb29wQ3JlYXRlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICghcGFyYW1zLm9ic2VydmVyKSB7XG4gICAgICAgIHN3aXBlci51cGRhdGUoKTtcbiAgICAgIH1cblxuICAgICAgc3dpcGVyLnNsaWRlVG8obmV3QWN0aXZlSW5kZXgsIDAsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRTbGlkZShpbmRleCwgc2xpZGVzKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgY29uc3Qge1xuICAgICAgICAkd3JhcHBlckVsLFxuICAgICAgICBwYXJhbXMsXG4gICAgICAgIGFjdGl2ZUluZGV4XG4gICAgICB9ID0gc3dpcGVyO1xuICAgICAgbGV0IGFjdGl2ZUluZGV4QnVmZmVyID0gYWN0aXZlSW5kZXg7XG5cbiAgICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgICBhY3RpdmVJbmRleEJ1ZmZlciAtPSBzd2lwZXIubG9vcGVkU2xpZGVzO1xuICAgICAgICBzd2lwZXIubG9vcERlc3Ryb3koKTtcbiAgICAgICAgc3dpcGVyLnNsaWRlcyA9ICR3cmFwcGVyRWwuY2hpbGRyZW4oYC4ke3BhcmFtcy5zbGlkZUNsYXNzfWApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBiYXNlTGVuZ3RoID0gc3dpcGVyLnNsaWRlcy5sZW5ndGg7XG5cbiAgICAgIGlmIChpbmRleCA8PSAwKSB7XG4gICAgICAgIHN3aXBlci5wcmVwZW5kU2xpZGUoc2xpZGVzKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaW5kZXggPj0gYmFzZUxlbmd0aCkge1xuICAgICAgICBzd2lwZXIuYXBwZW5kU2xpZGUoc2xpZGVzKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsZXQgbmV3QWN0aXZlSW5kZXggPSBhY3RpdmVJbmRleEJ1ZmZlciA+IGluZGV4ID8gYWN0aXZlSW5kZXhCdWZmZXIgKyAxIDogYWN0aXZlSW5kZXhCdWZmZXI7XG4gICAgICBjb25zdCBzbGlkZXNCdWZmZXIgPSBbXTtcblxuICAgICAgZm9yIChsZXQgaSA9IGJhc2VMZW5ndGggLSAxOyBpID49IGluZGV4OyBpIC09IDEpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFNsaWRlID0gc3dpcGVyLnNsaWRlcy5lcShpKTtcbiAgICAgICAgY3VycmVudFNsaWRlLnJlbW92ZSgpO1xuICAgICAgICBzbGlkZXNCdWZmZXIudW5zaGlmdChjdXJyZW50U2xpZGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHNsaWRlcyA9PT0gJ29iamVjdCcgJiYgJ2xlbmd0aCcgaW4gc2xpZGVzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgaWYgKHNsaWRlc1tpXSkgJHdyYXBwZXJFbC5hcHBlbmQoc2xpZGVzW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5ld0FjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXhCdWZmZXIgPiBpbmRleCA/IGFjdGl2ZUluZGV4QnVmZmVyICsgc2xpZGVzLmxlbmd0aCA6IGFjdGl2ZUluZGV4QnVmZmVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHdyYXBwZXJFbC5hcHBlbmQoc2xpZGVzKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXNCdWZmZXIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgJHdyYXBwZXJFbC5hcHBlbmQoc2xpZGVzQnVmZmVyW2ldKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICAgIHN3aXBlci5sb29wQ3JlYXRlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICghcGFyYW1zLm9ic2VydmVyKSB7XG4gICAgICAgIHN3aXBlci51cGRhdGUoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKG5ld0FjdGl2ZUluZGV4ICsgc3dpcGVyLmxvb3BlZFNsaWRlcywgMCwgZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8obmV3QWN0aXZlSW5kZXgsIDAsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVTbGlkZShzbGlkZXNJbmRleGVzKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgY29uc3Qge1xuICAgICAgICBwYXJhbXMsXG4gICAgICAgICR3cmFwcGVyRWwsXG4gICAgICAgIGFjdGl2ZUluZGV4XG4gICAgICB9ID0gc3dpcGVyO1xuICAgICAgbGV0IGFjdGl2ZUluZGV4QnVmZmVyID0gYWN0aXZlSW5kZXg7XG5cbiAgICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgICBhY3RpdmVJbmRleEJ1ZmZlciAtPSBzd2lwZXIubG9vcGVkU2xpZGVzO1xuICAgICAgICBzd2lwZXIubG9vcERlc3Ryb3koKTtcbiAgICAgICAgc3dpcGVyLnNsaWRlcyA9ICR3cmFwcGVyRWwuY2hpbGRyZW4oYC4ke3BhcmFtcy5zbGlkZUNsYXNzfWApO1xuICAgICAgfVxuXG4gICAgICBsZXQgbmV3QWN0aXZlSW5kZXggPSBhY3RpdmVJbmRleEJ1ZmZlcjtcbiAgICAgIGxldCBpbmRleFRvUmVtb3ZlO1xuXG4gICAgICBpZiAodHlwZW9mIHNsaWRlc0luZGV4ZXMgPT09ICdvYmplY3QnICYmICdsZW5ndGgnIGluIHNsaWRlc0luZGV4ZXMpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXNJbmRleGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgaW5kZXhUb1JlbW92ZSA9IHNsaWRlc0luZGV4ZXNbaV07XG4gICAgICAgICAgaWYgKHN3aXBlci5zbGlkZXNbaW5kZXhUb1JlbW92ZV0pIHN3aXBlci5zbGlkZXMuZXEoaW5kZXhUb1JlbW92ZSkucmVtb3ZlKCk7XG4gICAgICAgICAgaWYgKGluZGV4VG9SZW1vdmUgPCBuZXdBY3RpdmVJbmRleCkgbmV3QWN0aXZlSW5kZXggLT0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5ld0FjdGl2ZUluZGV4ID0gTWF0aC5tYXgobmV3QWN0aXZlSW5kZXgsIDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXhUb1JlbW92ZSA9IHNsaWRlc0luZGV4ZXM7XG4gICAgICAgIGlmIChzd2lwZXIuc2xpZGVzW2luZGV4VG9SZW1vdmVdKSBzd2lwZXIuc2xpZGVzLmVxKGluZGV4VG9SZW1vdmUpLnJlbW92ZSgpO1xuICAgICAgICBpZiAoaW5kZXhUb1JlbW92ZSA8IG5ld0FjdGl2ZUluZGV4KSBuZXdBY3RpdmVJbmRleCAtPSAxO1xuICAgICAgICBuZXdBY3RpdmVJbmRleCA9IE1hdGgubWF4KG5ld0FjdGl2ZUluZGV4LCAwKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICAgIHN3aXBlci5sb29wQ3JlYXRlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICghcGFyYW1zLm9ic2VydmVyKSB7XG4gICAgICAgIHN3aXBlci51cGRhdGUoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKG5ld0FjdGl2ZUluZGV4ICsgc3dpcGVyLmxvb3BlZFNsaWRlcywgMCwgZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8obmV3QWN0aXZlSW5kZXgsIDAsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxTbGlkZXMoKSB7XG4gICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgY29uc3Qgc2xpZGVzSW5kZXhlcyA9IFtdO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3aXBlci5zbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgc2xpZGVzSW5kZXhlcy5wdXNoKGkpO1xuICAgICAgfVxuXG4gICAgICBzd2lwZXIucmVtb3ZlU2xpZGUoc2xpZGVzSW5kZXhlcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gTWFuaXB1bGF0aW9uKF9yZWYpIHtcbiAgICAgIGxldCB7XG4gICAgICAgIHN3aXBlclxuICAgICAgfSA9IF9yZWY7XG4gICAgICBPYmplY3QuYXNzaWduKHN3aXBlciwge1xuICAgICAgICBhcHBlbmRTbGlkZTogYXBwZW5kU2xpZGUuYmluZChzd2lwZXIpLFxuICAgICAgICBwcmVwZW5kU2xpZGU6IHByZXBlbmRTbGlkZS5iaW5kKHN3aXBlciksXG4gICAgICAgIGFkZFNsaWRlOiBhZGRTbGlkZS5iaW5kKHN3aXBlciksXG4gICAgICAgIHJlbW92ZVNsaWRlOiByZW1vdmVTbGlkZS5iaW5kKHN3aXBlciksXG4gICAgICAgIHJlbW92ZUFsbFNsaWRlczogcmVtb3ZlQWxsU2xpZGVzLmJpbmQoc3dpcGVyKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZWZmZWN0SW5pdChwYXJhbXMpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZWZmZWN0LFxuICAgICAgICBzd2lwZXIsXG4gICAgICAgIG9uLFxuICAgICAgICBzZXRUcmFuc2xhdGUsXG4gICAgICAgIHNldFRyYW5zaXRpb24sXG4gICAgICAgIG92ZXJ3cml0ZVBhcmFtcyxcbiAgICAgICAgcGVyc3BlY3RpdmUsXG4gICAgICAgIHJlY3JlYXRlU2hhZG93cyxcbiAgICAgICAgZ2V0RWZmZWN0UGFyYW1zXG4gICAgICB9ID0gcGFyYW1zO1xuICAgICAgb24oJ2JlZm9yZUluaXQnLCAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmVmZmVjdCAhPT0gZWZmZWN0KSByZXR1cm47XG4gICAgICAgIHN3aXBlci5jbGFzc05hbWVzLnB1c2goYCR7c3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfSR7ZWZmZWN0fWApO1xuXG4gICAgICAgIGlmIChwZXJzcGVjdGl2ZSAmJiBwZXJzcGVjdGl2ZSgpKSB7XG4gICAgICAgICAgc3dpcGVyLmNsYXNzTmFtZXMucHVzaChgJHtzd2lwZXIucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9M2RgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG92ZXJ3cml0ZVBhcmFtc1Jlc3VsdCA9IG92ZXJ3cml0ZVBhcmFtcyA/IG92ZXJ3cml0ZVBhcmFtcygpIDoge307XG4gICAgICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLnBhcmFtcywgb3ZlcndyaXRlUGFyYW1zUmVzdWx0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihzd2lwZXIub3JpZ2luYWxQYXJhbXMsIG92ZXJ3cml0ZVBhcmFtc1Jlc3VsdCk7XG4gICAgICB9KTtcbiAgICAgIG9uKCdzZXRUcmFuc2xhdGUnLCAoKSA9PiB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmVmZmVjdCAhPT0gZWZmZWN0KSByZXR1cm47XG4gICAgICAgIHNldFRyYW5zbGF0ZSgpO1xuICAgICAgfSk7XG4gICAgICBvbignc2V0VHJhbnNpdGlvbicsIChfcywgZHVyYXRpb24pID0+IHtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSBlZmZlY3QpIHJldHVybjtcbiAgICAgICAgc2V0VHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgICB9KTtcbiAgICAgIG9uKCd0cmFuc2l0aW9uRW5kJywgKCkgPT4ge1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5lZmZlY3QgIT09IGVmZmVjdCkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChyZWNyZWF0ZVNoYWRvd3MpIHtcbiAgICAgICAgICBpZiAoIWdldEVmZmVjdFBhcmFtcyB8fCAhZ2V0RWZmZWN0UGFyYW1zKCkuc2xpZGVTaGFkb3dzKSByZXR1cm47IC8vIHJlbW92ZSBzaGFkb3dzXG5cbiAgICAgICAgICBzd2lwZXIuc2xpZGVzLmVhY2goc2xpZGVFbCA9PiB7XG4gICAgICAgICAgICBjb25zdCAkc2xpZGVFbCA9IHN3aXBlci4kKHNsaWRlRWwpO1xuICAgICAgICAgICAgJHNsaWRlRWwuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0JykucmVtb3ZlKCk7XG4gICAgICAgICAgfSk7IC8vIGNyZWF0ZSBuZXcgb25lXG5cbiAgICAgICAgICByZWNyZWF0ZVNoYWRvd3MoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBsZXQgcmVxdWlyZVVwZGF0ZU9uVmlydHVhbDtcbiAgICAgIG9uKCd2aXJ0dWFsVXBkYXRlJywgKCkgPT4ge1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5lZmZlY3QgIT09IGVmZmVjdCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICghc3dpcGVyLnNsaWRlcy5sZW5ndGgpIHtcbiAgICAgICAgICByZXF1aXJlVXBkYXRlT25WaXJ0dWFsID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgaWYgKHJlcXVpcmVVcGRhdGVPblZpcnR1YWwgJiYgc3dpcGVyLnNsaWRlcyAmJiBzd2lwZXIuc2xpZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgc2V0VHJhbnNsYXRlKCk7XG4gICAgICAgICAgICByZXF1aXJlVXBkYXRlT25WaXJ0dWFsID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVmZmVjdFRhcmdldChlZmZlY3RQYXJhbXMsICRzbGlkZUVsKSB7XG4gICAgICBpZiAoZWZmZWN0UGFyYW1zLnRyYW5zZm9ybUVsKSB7XG4gICAgICAgIHJldHVybiAkc2xpZGVFbC5maW5kKGVmZmVjdFBhcmFtcy50cmFuc2Zvcm1FbCkuY3NzKHtcbiAgICAgICAgICAnYmFja2ZhY2UtdmlzaWJpbGl0eSc6ICdoaWRkZW4nLFxuICAgICAgICAgICctd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHknOiAnaGlkZGVuJ1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICRzbGlkZUVsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVmZmVjdFZpcnR1YWxUcmFuc2l0aW9uRW5kKF9yZWYpIHtcbiAgICAgIGxldCB7XG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgZHVyYXRpb24sXG4gICAgICAgIHRyYW5zZm9ybUVsLFxuICAgICAgICBhbGxTbGlkZXNcbiAgICAgIH0gPSBfcmVmO1xuICAgICAgY29uc3Qge1xuICAgICAgICBzbGlkZXMsXG4gICAgICAgIGFjdGl2ZUluZGV4LFxuICAgICAgICAkd3JhcHBlckVsXG4gICAgICB9ID0gc3dpcGVyO1xuXG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlICYmIGR1cmF0aW9uICE9PSAwKSB7XG4gICAgICAgIGxldCBldmVudFRyaWdnZXJlZCA9IGZhbHNlO1xuICAgICAgICBsZXQgJHRyYW5zaXRpb25FbmRUYXJnZXQ7XG5cbiAgICAgICAgaWYgKGFsbFNsaWRlcykge1xuICAgICAgICAgICR0cmFuc2l0aW9uRW5kVGFyZ2V0ID0gdHJhbnNmb3JtRWwgPyBzbGlkZXMuZmluZCh0cmFuc2Zvcm1FbCkgOiBzbGlkZXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHRyYW5zaXRpb25FbmRUYXJnZXQgPSB0cmFuc2Zvcm1FbCA/IHNsaWRlcy5lcShhY3RpdmVJbmRleCkuZmluZCh0cmFuc2Zvcm1FbCkgOiBzbGlkZXMuZXEoYWN0aXZlSW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHRyYW5zaXRpb25FbmRUYXJnZXQudHJhbnNpdGlvbkVuZCgoKSA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50VHJpZ2dlcmVkKSByZXR1cm47XG4gICAgICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuO1xuICAgICAgICAgIGV2ZW50VHJpZ2dlcmVkID0gdHJ1ZTtcbiAgICAgICAgICBzd2lwZXIuYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgY29uc3QgdHJpZ2dlckV2ZW50cyA9IFsnd2Via2l0VHJhbnNpdGlvbkVuZCcsICd0cmFuc2l0aW9uZW5kJ107XG5cbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyaWdnZXJFdmVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICR3cmFwcGVyRWwudHJpZ2dlcih0cmlnZ2VyRXZlbnRzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIEVmZmVjdEZhZGUoX3JlZikge1xuICAgICAgbGV0IHtcbiAgICAgICAgc3dpcGVyLFxuICAgICAgICBleHRlbmRQYXJhbXMsXG4gICAgICAgIG9uXG4gICAgICB9ID0gX3JlZjtcbiAgICAgIGV4dGVuZFBhcmFtcyh7XG4gICAgICAgIGZhZGVFZmZlY3Q6IHtcbiAgICAgICAgICBjcm9zc0ZhZGU6IGZhbHNlLFxuICAgICAgICAgIHRyYW5zZm9ybUVsOiBudWxsXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBzZXRUcmFuc2xhdGUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBzbGlkZXNcbiAgICAgICAgfSA9IHN3aXBlcjtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5mYWRlRWZmZWN0O1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgY29uc3QgJHNsaWRlRWwgPSBzd2lwZXIuc2xpZGVzLmVxKGkpO1xuICAgICAgICAgIGNvbnN0IG9mZnNldCA9ICRzbGlkZUVsWzBdLnN3aXBlclNsaWRlT2Zmc2V0O1xuICAgICAgICAgIGxldCB0eCA9IC1vZmZzZXQ7XG4gICAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLnZpcnR1YWxUcmFuc2xhdGUpIHR4IC09IHN3aXBlci50cmFuc2xhdGU7XG4gICAgICAgICAgbGV0IHR5ID0gMDtcblxuICAgICAgICAgIGlmICghc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgICB0eSA9IHR4O1xuICAgICAgICAgICAgdHggPSAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHNsaWRlT3BhY2l0eSA9IHN3aXBlci5wYXJhbXMuZmFkZUVmZmVjdC5jcm9zc0ZhZGUgPyBNYXRoLm1heCgxIC0gTWF0aC5hYnMoJHNsaWRlRWxbMF0ucHJvZ3Jlc3MpLCAwKSA6IDEgKyBNYXRoLm1pbihNYXRoLm1heCgkc2xpZGVFbFswXS5wcm9ncmVzcywgLTEpLCAwKTtcbiAgICAgICAgICBjb25zdCAkdGFyZ2V0RWwgPSBlZmZlY3RUYXJnZXQocGFyYW1zLCAkc2xpZGVFbCk7XG4gICAgICAgICAgJHRhcmdldEVsLmNzcyh7XG4gICAgICAgICAgICBvcGFjaXR5OiBzbGlkZU9wYWNpdHlcbiAgICAgICAgICB9KS50cmFuc2Zvcm0oYHRyYW5zbGF0ZTNkKCR7dHh9cHgsICR7dHl9cHgsIDBweClgKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3Qgc2V0VHJhbnNpdGlvbiA9IGR1cmF0aW9uID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHRyYW5zZm9ybUVsXG4gICAgICAgIH0gPSBzd2lwZXIucGFyYW1zLmZhZGVFZmZlY3Q7XG4gICAgICAgIGNvbnN0ICR0cmFuc2l0aW9uRWxlbWVudHMgPSB0cmFuc2Zvcm1FbCA/IHN3aXBlci5zbGlkZXMuZmluZCh0cmFuc2Zvcm1FbCkgOiBzd2lwZXIuc2xpZGVzO1xuICAgICAgICAkdHJhbnNpdGlvbkVsZW1lbnRzLnRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgICAgICBlZmZlY3RWaXJ0dWFsVHJhbnNpdGlvbkVuZCh7XG4gICAgICAgICAgc3dpcGVyLFxuICAgICAgICAgIGR1cmF0aW9uLFxuICAgICAgICAgIHRyYW5zZm9ybUVsLFxuICAgICAgICAgIGFsbFNsaWRlczogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGVmZmVjdEluaXQoe1xuICAgICAgICBlZmZlY3Q6ICdmYWRlJyxcbiAgICAgICAgc3dpcGVyLFxuICAgICAgICBvbixcbiAgICAgICAgc2V0VHJhbnNsYXRlLFxuICAgICAgICBzZXRUcmFuc2l0aW9uLFxuICAgICAgICBvdmVyd3JpdGVQYXJhbXM6ICgpID0+ICh7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgICAgICBzbGlkZXNQZXJHcm91cDogMSxcbiAgICAgICAgICB3YXRjaFNsaWRlc1Byb2dyZXNzOiB0cnVlLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMCxcbiAgICAgICAgICB2aXJ0dWFsVHJhbnNsYXRlOiAhc3dpcGVyLnBhcmFtcy5jc3NNb2RlXG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBFZmZlY3RDdWJlKF9yZWYpIHtcbiAgICAgIGxldCB7XG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgZXh0ZW5kUGFyYW1zLFxuICAgICAgICBvblxuICAgICAgfSA9IF9yZWY7XG4gICAgICBleHRlbmRQYXJhbXMoe1xuICAgICAgICBjdWJlRWZmZWN0OiB7XG4gICAgICAgICAgc2xpZGVTaGFkb3dzOiB0cnVlLFxuICAgICAgICAgIHNoYWRvdzogdHJ1ZSxcbiAgICAgICAgICBzaGFkb3dPZmZzZXQ6IDIwLFxuICAgICAgICAgIHNoYWRvd1NjYWxlOiAwLjk0XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBjcmVhdGVTbGlkZVNoYWRvd3MgPSAoJHNsaWRlRWwsIHByb2dyZXNzLCBpc0hvcml6b250YWwpID0+IHtcbiAgICAgICAgbGV0IHNoYWRvd0JlZm9yZSA9IGlzSG9yaXpvbnRhbCA/ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LWxlZnQnKSA6ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCcpO1xuICAgICAgICBsZXQgc2hhZG93QWZ0ZXIgPSBpc0hvcml6b250YWwgPyAkc2xpZGVFbC5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCcpIDogJHNsaWRlRWwuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tJyk7XG5cbiAgICAgICAgaWYgKHNoYWRvd0JlZm9yZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBzaGFkb3dCZWZvcmUgPSAkKGA8ZGl2IGNsYXNzPVwic3dpcGVyLXNsaWRlLXNoYWRvdy0ke2lzSG9yaXpvbnRhbCA/ICdsZWZ0JyA6ICd0b3AnfVwiPjwvZGl2PmApO1xuICAgICAgICAgICRzbGlkZUVsLmFwcGVuZChzaGFkb3dCZWZvcmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNoYWRvd0FmdGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHNoYWRvd0FmdGVyID0gJChgPGRpdiBjbGFzcz1cInN3aXBlci1zbGlkZS1zaGFkb3ctJHtpc0hvcml6b250YWwgPyAncmlnaHQnIDogJ2JvdHRvbSd9XCI+PC9kaXY+YCk7XG4gICAgICAgICAgJHNsaWRlRWwuYXBwZW5kKHNoYWRvd0FmdGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaGFkb3dCZWZvcmUubGVuZ3RoKSBzaGFkb3dCZWZvcmVbMF0uc3R5bGUub3BhY2l0eSA9IE1hdGgubWF4KC1wcm9ncmVzcywgMCk7XG4gICAgICAgIGlmIChzaGFkb3dBZnRlci5sZW5ndGgpIHNoYWRvd0FmdGVyWzBdLnN0eWxlLm9wYWNpdHkgPSBNYXRoLm1heChwcm9ncmVzcywgMCk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCByZWNyZWF0ZVNoYWRvd3MgPSAoKSA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSBuZXcgb25lc1xuICAgICAgICBjb25zdCBpc0hvcml6b250YWwgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCk7XG4gICAgICAgIHN3aXBlci5zbGlkZXMuZWFjaChzbGlkZUVsID0+IHtcbiAgICAgICAgICBjb25zdCBwcm9ncmVzcyA9IE1hdGgubWF4KE1hdGgubWluKHNsaWRlRWwucHJvZ3Jlc3MsIDEpLCAtMSk7XG4gICAgICAgICAgY3JlYXRlU2xpZGVTaGFkb3dzKCQoc2xpZGVFbCksIHByb2dyZXNzLCBpc0hvcml6b250YWwpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHNldFRyYW5zbGF0ZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICRlbCxcbiAgICAgICAgICAkd3JhcHBlckVsLFxuICAgICAgICAgIHNsaWRlcyxcbiAgICAgICAgICB3aWR0aDogc3dpcGVyV2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiBzd2lwZXJIZWlnaHQsXG4gICAgICAgICAgcnRsVHJhbnNsYXRlOiBydGwsXG4gICAgICAgICAgc2l6ZTogc3dpcGVyU2l6ZSxcbiAgICAgICAgICBicm93c2VyXG4gICAgICAgIH0gPSBzd2lwZXI7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuY3ViZUVmZmVjdDtcbiAgICAgICAgY29uc3QgaXNIb3Jpem9udGFsID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpO1xuICAgICAgICBjb25zdCBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZDtcbiAgICAgICAgbGV0IHdyYXBwZXJSb3RhdGUgPSAwO1xuICAgICAgICBsZXQgJGN1YmVTaGFkb3dFbDtcblxuICAgICAgICBpZiAocGFyYW1zLnNoYWRvdykge1xuICAgICAgICAgIGlmIChpc0hvcml6b250YWwpIHtcbiAgICAgICAgICAgICRjdWJlU2hhZG93RWwgPSAkd3JhcHBlckVsLmZpbmQoJy5zd2lwZXItY3ViZS1zaGFkb3cnKTtcblxuICAgICAgICAgICAgaWYgKCRjdWJlU2hhZG93RWwubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICRjdWJlU2hhZG93RWwgPSAkKCc8ZGl2IGNsYXNzPVwic3dpcGVyLWN1YmUtc2hhZG93XCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICR3cmFwcGVyRWwuYXBwZW5kKCRjdWJlU2hhZG93RWwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkY3ViZVNoYWRvd0VsLmNzcyh7XG4gICAgICAgICAgICAgIGhlaWdodDogYCR7c3dpcGVyV2lkdGh9cHhgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGN1YmVTaGFkb3dFbCA9ICRlbC5maW5kKCcuc3dpcGVyLWN1YmUtc2hhZG93Jyk7XG5cbiAgICAgICAgICAgIGlmICgkY3ViZVNoYWRvd0VsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAkY3ViZVNoYWRvd0VsID0gJCgnPGRpdiBjbGFzcz1cInN3aXBlci1jdWJlLXNoYWRvd1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAkZWwuYXBwZW5kKCRjdWJlU2hhZG93RWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgY29uc3QgJHNsaWRlRWwgPSBzbGlkZXMuZXEoaSk7XG4gICAgICAgICAgbGV0IHNsaWRlSW5kZXggPSBpO1xuXG4gICAgICAgICAgaWYgKGlzVmlydHVhbCkge1xuICAgICAgICAgICAgc2xpZGVJbmRleCA9IHBhcnNlSW50KCRzbGlkZUVsLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JyksIDEwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgc2xpZGVBbmdsZSA9IHNsaWRlSW5kZXggKiA5MDtcbiAgICAgICAgICBsZXQgcm91bmQgPSBNYXRoLmZsb29yKHNsaWRlQW5nbGUgLyAzNjApO1xuXG4gICAgICAgICAgaWYgKHJ0bCkge1xuICAgICAgICAgICAgc2xpZGVBbmdsZSA9IC1zbGlkZUFuZ2xlO1xuICAgICAgICAgICAgcm91bmQgPSBNYXRoLmZsb29yKC1zbGlkZUFuZ2xlIC8gMzYwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBwcm9ncmVzcyA9IE1hdGgubWF4KE1hdGgubWluKCRzbGlkZUVsWzBdLnByb2dyZXNzLCAxKSwgLTEpO1xuICAgICAgICAgIGxldCB0eCA9IDA7XG4gICAgICAgICAgbGV0IHR5ID0gMDtcbiAgICAgICAgICBsZXQgdHogPSAwO1xuXG4gICAgICAgICAgaWYgKHNsaWRlSW5kZXggJSA0ID09PSAwKSB7XG4gICAgICAgICAgICB0eCA9IC1yb3VuZCAqIDQgKiBzd2lwZXJTaXplO1xuICAgICAgICAgICAgdHogPSAwO1xuICAgICAgICAgIH0gZWxzZSBpZiAoKHNsaWRlSW5kZXggLSAxKSAlIDQgPT09IDApIHtcbiAgICAgICAgICAgIHR4ID0gMDtcbiAgICAgICAgICAgIHR6ID0gLXJvdW5kICogNCAqIHN3aXBlclNpemU7XG4gICAgICAgICAgfSBlbHNlIGlmICgoc2xpZGVJbmRleCAtIDIpICUgNCA9PT0gMCkge1xuICAgICAgICAgICAgdHggPSBzd2lwZXJTaXplICsgcm91bmQgKiA0ICogc3dpcGVyU2l6ZTtcbiAgICAgICAgICAgIHR6ID0gc3dpcGVyU2l6ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKChzbGlkZUluZGV4IC0gMykgJSA0ID09PSAwKSB7XG4gICAgICAgICAgICB0eCA9IC1zd2lwZXJTaXplO1xuICAgICAgICAgICAgdHogPSAzICogc3dpcGVyU2l6ZSArIHN3aXBlclNpemUgKiA0ICogcm91bmQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJ0bCkge1xuICAgICAgICAgICAgdHggPSAtdHg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFpc0hvcml6b250YWwpIHtcbiAgICAgICAgICAgIHR5ID0gdHg7XG4gICAgICAgICAgICB0eCA9IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgdHJhbnNmb3JtID0gYHJvdGF0ZVgoJHtpc0hvcml6b250YWwgPyAwIDogLXNsaWRlQW5nbGV9ZGVnKSByb3RhdGVZKCR7aXNIb3Jpem9udGFsID8gc2xpZGVBbmdsZSA6IDB9ZGVnKSB0cmFuc2xhdGUzZCgke3R4fXB4LCAke3R5fXB4LCAke3R6fXB4KWA7XG5cbiAgICAgICAgICBpZiAocHJvZ3Jlc3MgPD0gMSAmJiBwcm9ncmVzcyA+IC0xKSB7XG4gICAgICAgICAgICB3cmFwcGVyUm90YXRlID0gc2xpZGVJbmRleCAqIDkwICsgcHJvZ3Jlc3MgKiA5MDtcbiAgICAgICAgICAgIGlmIChydGwpIHdyYXBwZXJSb3RhdGUgPSAtc2xpZGVJbmRleCAqIDkwIC0gcHJvZ3Jlc3MgKiA5MDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkc2xpZGVFbC50cmFuc2Zvcm0odHJhbnNmb3JtKTtcblxuICAgICAgICAgIGlmIChwYXJhbXMuc2xpZGVTaGFkb3dzKSB7XG4gICAgICAgICAgICBjcmVhdGVTbGlkZVNoYWRvd3MoJHNsaWRlRWwsIHByb2dyZXNzLCBpc0hvcml6b250YWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICR3cmFwcGVyRWwuY3NzKHtcbiAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luJzogYDUwJSA1MCUgLSR7c3dpcGVyU2l6ZSAvIDJ9cHhgLFxuICAgICAgICAgICd0cmFuc2Zvcm0tb3JpZ2luJzogYDUwJSA1MCUgLSR7c3dpcGVyU2l6ZSAvIDJ9cHhgXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChwYXJhbXMuc2hhZG93KSB7XG4gICAgICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgJGN1YmVTaGFkb3dFbC50cmFuc2Zvcm0oYHRyYW5zbGF0ZTNkKDBweCwgJHtzd2lwZXJXaWR0aCAvIDIgKyBwYXJhbXMuc2hhZG93T2Zmc2V0fXB4LCAkey1zd2lwZXJXaWR0aCAvIDJ9cHgpIHJvdGF0ZVgoOTBkZWcpIHJvdGF0ZVooMGRlZykgc2NhbGUoJHtwYXJhbXMuc2hhZG93U2NhbGV9KWApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBzaGFkb3dBbmdsZSA9IE1hdGguYWJzKHdyYXBwZXJSb3RhdGUpIC0gTWF0aC5mbG9vcihNYXRoLmFicyh3cmFwcGVyUm90YXRlKSAvIDkwKSAqIDkwO1xuICAgICAgICAgICAgY29uc3QgbXVsdGlwbGllciA9IDEuNSAtIChNYXRoLnNpbihzaGFkb3dBbmdsZSAqIDIgKiBNYXRoLlBJIC8gMzYwKSAvIDIgKyBNYXRoLmNvcyhzaGFkb3dBbmdsZSAqIDIgKiBNYXRoLlBJIC8gMzYwKSAvIDIpO1xuICAgICAgICAgICAgY29uc3Qgc2NhbGUxID0gcGFyYW1zLnNoYWRvd1NjYWxlO1xuICAgICAgICAgICAgY29uc3Qgc2NhbGUyID0gcGFyYW1zLnNoYWRvd1NjYWxlIC8gbXVsdGlwbGllcjtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IHBhcmFtcy5zaGFkb3dPZmZzZXQ7XG4gICAgICAgICAgICAkY3ViZVNoYWRvd0VsLnRyYW5zZm9ybShgc2NhbGUzZCgke3NjYWxlMX0sIDEsICR7c2NhbGUyfSkgdHJhbnNsYXRlM2QoMHB4LCAke3N3aXBlckhlaWdodCAvIDIgKyBvZmZzZXR9cHgsICR7LXN3aXBlckhlaWdodCAvIDIgLyBzY2FsZTJ9cHgpIHJvdGF0ZVgoLTkwZGVnKWApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHpGYWN0b3IgPSBicm93c2VyLmlzU2FmYXJpIHx8IGJyb3dzZXIuaXNXZWJWaWV3ID8gLXN3aXBlclNpemUgLyAyIDogMDtcbiAgICAgICAgJHdyYXBwZXJFbC50cmFuc2Zvcm0oYHRyYW5zbGF0ZTNkKDBweCwwLCR7ekZhY3Rvcn1weCkgcm90YXRlWCgke3N3aXBlci5pc0hvcml6b250YWwoKSA/IDAgOiB3cmFwcGVyUm90YXRlfWRlZykgcm90YXRlWSgke3N3aXBlci5pc0hvcml6b250YWwoKSA/IC13cmFwcGVyUm90YXRlIDogMH1kZWcpYCk7XG4gICAgICAgICR3cmFwcGVyRWxbMF0uc3R5bGUuc2V0UHJvcGVydHkoJy0tc3dpcGVyLWN1YmUtdHJhbnNsYXRlLXonLCBgJHt6RmFjdG9yfXB4YCk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzZXRUcmFuc2l0aW9uID0gZHVyYXRpb24gPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgJGVsLFxuICAgICAgICAgIHNsaWRlc1xuICAgICAgICB9ID0gc3dpcGVyO1xuICAgICAgICBzbGlkZXMudHJhbnNpdGlvbihkdXJhdGlvbikuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0JykudHJhbnNpdGlvbihkdXJhdGlvbik7XG5cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuY3ViZUVmZmVjdC5zaGFkb3cgJiYgIXN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICRlbC5maW5kKCcuc3dpcGVyLWN1YmUtc2hhZG93JykudHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGVmZmVjdEluaXQoe1xuICAgICAgICBlZmZlY3Q6ICdjdWJlJyxcbiAgICAgICAgc3dpcGVyLFxuICAgICAgICBvbixcbiAgICAgICAgc2V0VHJhbnNsYXRlLFxuICAgICAgICBzZXRUcmFuc2l0aW9uLFxuICAgICAgICByZWNyZWF0ZVNoYWRvd3MsXG4gICAgICAgIGdldEVmZmVjdFBhcmFtczogKCkgPT4gc3dpcGVyLnBhcmFtcy5jdWJlRWZmZWN0LFxuICAgICAgICBwZXJzcGVjdGl2ZTogKCkgPT4gdHJ1ZSxcbiAgICAgICAgb3ZlcndyaXRlUGFyYW1zOiAoKSA9PiAoe1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICAgICAgc2xpZGVzUGVyR3JvdXA6IDEsXG4gICAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZSxcbiAgICAgICAgICByZXNpc3RhbmNlUmF0aW86IDAsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgICAgIGNlbnRlcmVkU2xpZGVzOiBmYWxzZSxcbiAgICAgICAgICB2aXJ0dWFsVHJhbnNsYXRlOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVTaGFkb3cocGFyYW1zLCAkc2xpZGVFbCwgc2lkZSkge1xuICAgICAgY29uc3Qgc2hhZG93Q2xhc3MgPSBgc3dpcGVyLXNsaWRlLXNoYWRvdyR7c2lkZSA/IGAtJHtzaWRlfWAgOiAnJ31gO1xuICAgICAgY29uc3QgJHNoYWRvd0NvbnRhaW5lciA9IHBhcmFtcy50cmFuc2Zvcm1FbCA/ICRzbGlkZUVsLmZpbmQocGFyYW1zLnRyYW5zZm9ybUVsKSA6ICRzbGlkZUVsO1xuICAgICAgbGV0ICRzaGFkb3dFbCA9ICRzaGFkb3dDb250YWluZXIuY2hpbGRyZW4oYC4ke3NoYWRvd0NsYXNzfWApO1xuXG4gICAgICBpZiAoISRzaGFkb3dFbC5sZW5ndGgpIHtcbiAgICAgICAgJHNoYWRvd0VsID0gJChgPGRpdiBjbGFzcz1cInN3aXBlci1zbGlkZS1zaGFkb3cke3NpZGUgPyBgLSR7c2lkZX1gIDogJyd9XCI+PC9kaXY+YCk7XG4gICAgICAgICRzaGFkb3dDb250YWluZXIuYXBwZW5kKCRzaGFkb3dFbCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAkc2hhZG93RWw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gRWZmZWN0RmxpcChfcmVmKSB7XG4gICAgICBsZXQge1xuICAgICAgICBzd2lwZXIsXG4gICAgICAgIGV4dGVuZFBhcmFtcyxcbiAgICAgICAgb25cbiAgICAgIH0gPSBfcmVmO1xuICAgICAgZXh0ZW5kUGFyYW1zKHtcbiAgICAgICAgZmxpcEVmZmVjdDoge1xuICAgICAgICAgIHNsaWRlU2hhZG93czogdHJ1ZSxcbiAgICAgICAgICBsaW1pdFJvdGF0aW9uOiB0cnVlLFxuICAgICAgICAgIHRyYW5zZm9ybUVsOiBudWxsXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBjcmVhdGVTbGlkZVNoYWRvd3MgPSAoJHNsaWRlRWwsIHByb2dyZXNzLCBwYXJhbXMpID0+IHtcbiAgICAgICAgbGV0IHNoYWRvd0JlZm9yZSA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LWxlZnQnKSA6ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCcpO1xuICAgICAgICBsZXQgc2hhZG93QWZ0ZXIgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAkc2xpZGVFbC5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCcpIDogJHNsaWRlRWwuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tJyk7XG5cbiAgICAgICAgaWYgKHNoYWRvd0JlZm9yZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBzaGFkb3dCZWZvcmUgPSBjcmVhdGVTaGFkb3cocGFyYW1zLCAkc2xpZGVFbCwgc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ2xlZnQnIDogJ3RvcCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNoYWRvd0FmdGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHNoYWRvd0FmdGVyID0gY3JlYXRlU2hhZG93KHBhcmFtcywgJHNsaWRlRWwsIHN3aXBlci5pc0hvcml6b250YWwoKSA/ICdyaWdodCcgOiAnYm90dG9tJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2hhZG93QmVmb3JlLmxlbmd0aCkgc2hhZG93QmVmb3JlWzBdLnN0eWxlLm9wYWNpdHkgPSBNYXRoLm1heCgtcHJvZ3Jlc3MsIDApO1xuICAgICAgICBpZiAoc2hhZG93QWZ0ZXIubGVuZ3RoKSBzaGFkb3dBZnRlclswXS5zdHlsZS5vcGFjaXR5ID0gTWF0aC5tYXgocHJvZ3Jlc3MsIDApO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgcmVjcmVhdGVTaGFkb3dzID0gKCkgPT4ge1xuICAgICAgICAvLyBTZXQgc2hhZG93c1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLmZsaXBFZmZlY3Q7XG4gICAgICAgIHN3aXBlci5zbGlkZXMuZWFjaChzbGlkZUVsID0+IHtcbiAgICAgICAgICBjb25zdCAkc2xpZGVFbCA9ICQoc2xpZGVFbCk7XG4gICAgICAgICAgbGV0IHByb2dyZXNzID0gJHNsaWRlRWxbMF0ucHJvZ3Jlc3M7XG5cbiAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5mbGlwRWZmZWN0LmxpbWl0Um90YXRpb24pIHtcbiAgICAgICAgICAgIHByb2dyZXNzID0gTWF0aC5tYXgoTWF0aC5taW4oc2xpZGVFbC5wcm9ncmVzcywgMSksIC0xKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjcmVhdGVTbGlkZVNoYWRvd3MoJHNsaWRlRWwsIHByb2dyZXNzLCBwYXJhbXMpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHNldFRyYW5zbGF0ZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHNsaWRlcyxcbiAgICAgICAgICBydGxUcmFuc2xhdGU6IHJ0bFxuICAgICAgICB9ID0gc3dpcGVyO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLmZsaXBFZmZlY3Q7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCAkc2xpZGVFbCA9IHNsaWRlcy5lcShpKTtcbiAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSAkc2xpZGVFbFswXS5wcm9ncmVzcztcblxuICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmZsaXBFZmZlY3QubGltaXRSb3RhdGlvbikge1xuICAgICAgICAgICAgcHJvZ3Jlc3MgPSBNYXRoLm1heChNYXRoLm1pbigkc2xpZGVFbFswXS5wcm9ncmVzcywgMSksIC0xKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBvZmZzZXQgPSAkc2xpZGVFbFswXS5zd2lwZXJTbGlkZU9mZnNldDtcbiAgICAgICAgICBjb25zdCByb3RhdGUgPSAtMTgwICogcHJvZ3Jlc3M7XG4gICAgICAgICAgbGV0IHJvdGF0ZVkgPSByb3RhdGU7XG4gICAgICAgICAgbGV0IHJvdGF0ZVggPSAwO1xuICAgICAgICAgIGxldCB0eCA9IHN3aXBlci5wYXJhbXMuY3NzTW9kZSA/IC1vZmZzZXQgLSBzd2lwZXIudHJhbnNsYXRlIDogLW9mZnNldDtcbiAgICAgICAgICBsZXQgdHkgPSAwO1xuXG4gICAgICAgICAgaWYgKCFzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgIHR5ID0gdHg7XG4gICAgICAgICAgICB0eCA9IDA7XG4gICAgICAgICAgICByb3RhdGVYID0gLXJvdGF0ZVk7XG4gICAgICAgICAgICByb3RhdGVZID0gMDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJ0bCkge1xuICAgICAgICAgICAgcm90YXRlWSA9IC1yb3RhdGVZO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICRzbGlkZUVsWzBdLnN0eWxlLnpJbmRleCA9IC1NYXRoLmFicyhNYXRoLnJvdW5kKHByb2dyZXNzKSkgKyBzbGlkZXMubGVuZ3RoO1xuXG4gICAgICAgICAgaWYgKHBhcmFtcy5zbGlkZVNoYWRvd3MpIHtcbiAgICAgICAgICAgIGNyZWF0ZVNsaWRlU2hhZG93cygkc2xpZGVFbCwgcHJvZ3Jlc3MsIHBhcmFtcyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgdHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7dHh9cHgsICR7dHl9cHgsIDBweCkgcm90YXRlWCgke3JvdGF0ZVh9ZGVnKSByb3RhdGVZKCR7cm90YXRlWX1kZWcpYDtcbiAgICAgICAgICBjb25zdCAkdGFyZ2V0RWwgPSBlZmZlY3RUYXJnZXQocGFyYW1zLCAkc2xpZGVFbCk7XG4gICAgICAgICAgJHRhcmdldEVsLnRyYW5zZm9ybSh0cmFuc2Zvcm0pO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzZXRUcmFuc2l0aW9uID0gZHVyYXRpb24gPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgdHJhbnNmb3JtRWxcbiAgICAgICAgfSA9IHN3aXBlci5wYXJhbXMuZmxpcEVmZmVjdDtcbiAgICAgICAgY29uc3QgJHRyYW5zaXRpb25FbGVtZW50cyA9IHRyYW5zZm9ybUVsID8gc3dpcGVyLnNsaWRlcy5maW5kKHRyYW5zZm9ybUVsKSA6IHN3aXBlci5zbGlkZXM7XG4gICAgICAgICR0cmFuc2l0aW9uRWxlbWVudHMudHJhbnNpdGlvbihkdXJhdGlvbikuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0JykudHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgICAgIGVmZmVjdFZpcnR1YWxUcmFuc2l0aW9uRW5kKHtcbiAgICAgICAgICBzd2lwZXIsXG4gICAgICAgICAgZHVyYXRpb24sXG4gICAgICAgICAgdHJhbnNmb3JtRWxcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBlZmZlY3RJbml0KHtcbiAgICAgICAgZWZmZWN0OiAnZmxpcCcsXG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgb24sXG4gICAgICAgIHNldFRyYW5zbGF0ZSxcbiAgICAgICAgc2V0VHJhbnNpdGlvbixcbiAgICAgICAgcmVjcmVhdGVTaGFkb3dzLFxuICAgICAgICBnZXRFZmZlY3RQYXJhbXM6ICgpID0+IHN3aXBlci5wYXJhbXMuZmxpcEVmZmVjdCxcbiAgICAgICAgcGVyc3BlY3RpdmU6ICgpID0+IHRydWUsXG4gICAgICAgIG92ZXJ3cml0ZVBhcmFtczogKCkgPT4gKHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgICAgIHNsaWRlc1Blckdyb3VwOiAxLFxuICAgICAgICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IHRydWUsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgICAgIHZpcnR1YWxUcmFuc2xhdGU6ICFzd2lwZXIucGFyYW1zLmNzc01vZGVcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIEVmZmVjdENvdmVyZmxvdyhfcmVmKSB7XG4gICAgICBsZXQge1xuICAgICAgICBzd2lwZXIsXG4gICAgICAgIGV4dGVuZFBhcmFtcyxcbiAgICAgICAgb25cbiAgICAgIH0gPSBfcmVmO1xuICAgICAgZXh0ZW5kUGFyYW1zKHtcbiAgICAgICAgY292ZXJmbG93RWZmZWN0OiB7XG4gICAgICAgICAgcm90YXRlOiA1MCxcbiAgICAgICAgICBzdHJldGNoOiAwLFxuICAgICAgICAgIGRlcHRoOiAxMDAsXG4gICAgICAgICAgc2NhbGU6IDEsXG4gICAgICAgICAgbW9kaWZpZXI6IDEsXG4gICAgICAgICAgc2xpZGVTaGFkb3dzOiB0cnVlLFxuICAgICAgICAgIHRyYW5zZm9ybUVsOiBudWxsXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBzZXRUcmFuc2xhdGUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICB3aWR0aDogc3dpcGVyV2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiBzd2lwZXJIZWlnaHQsXG4gICAgICAgICAgc2xpZGVzLFxuICAgICAgICAgIHNsaWRlc1NpemVzR3JpZFxuICAgICAgICB9ID0gc3dpcGVyO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLmNvdmVyZmxvd0VmZmVjdDtcbiAgICAgICAgY29uc3QgaXNIb3Jpem9udGFsID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpO1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSBzd2lwZXIudHJhbnNsYXRlO1xuICAgICAgICBjb25zdCBjZW50ZXIgPSBpc0hvcml6b250YWwgPyAtdHJhbnNmb3JtICsgc3dpcGVyV2lkdGggLyAyIDogLXRyYW5zZm9ybSArIHN3aXBlckhlaWdodCAvIDI7XG4gICAgICAgIGNvbnN0IHJvdGF0ZSA9IGlzSG9yaXpvbnRhbCA/IHBhcmFtcy5yb3RhdGUgOiAtcGFyYW1zLnJvdGF0ZTtcbiAgICAgICAgY29uc3QgdHJhbnNsYXRlID0gcGFyYW1zLmRlcHRoOyAvLyBFYWNoIHNsaWRlIG9mZnNldCBmcm9tIGNlbnRlclxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBzbGlkZXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCAkc2xpZGVFbCA9IHNsaWRlcy5lcShpKTtcbiAgICAgICAgICBjb25zdCBzbGlkZVNpemUgPSBzbGlkZXNTaXplc0dyaWRbaV07XG4gICAgICAgICAgY29uc3Qgc2xpZGVPZmZzZXQgPSAkc2xpZGVFbFswXS5zd2lwZXJTbGlkZU9mZnNldDtcbiAgICAgICAgICBjb25zdCBjZW50ZXJPZmZzZXQgPSAoY2VudGVyIC0gc2xpZGVPZmZzZXQgLSBzbGlkZVNpemUgLyAyKSAvIHNsaWRlU2l6ZTtcbiAgICAgICAgICBjb25zdCBvZmZzZXRNdWx0aXBsaWVyID0gdHlwZW9mIHBhcmFtcy5tb2RpZmllciA9PT0gJ2Z1bmN0aW9uJyA/IHBhcmFtcy5tb2RpZmllcihjZW50ZXJPZmZzZXQpIDogY2VudGVyT2Zmc2V0ICogcGFyYW1zLm1vZGlmaWVyO1xuICAgICAgICAgIGxldCByb3RhdGVZID0gaXNIb3Jpem9udGFsID8gcm90YXRlICogb2Zmc2V0TXVsdGlwbGllciA6IDA7XG4gICAgICAgICAgbGV0IHJvdGF0ZVggPSBpc0hvcml6b250YWwgPyAwIDogcm90YXRlICogb2Zmc2V0TXVsdGlwbGllcjsgLy8gdmFyIHJvdGF0ZVogPSAwXG5cbiAgICAgICAgICBsZXQgdHJhbnNsYXRlWiA9IC10cmFuc2xhdGUgKiBNYXRoLmFicyhvZmZzZXRNdWx0aXBsaWVyKTtcbiAgICAgICAgICBsZXQgc3RyZXRjaCA9IHBhcmFtcy5zdHJldGNoOyAvLyBBbGxvdyBwZXJjZW50YWdlIHRvIG1ha2UgYSByZWxhdGl2ZSBzdHJldGNoIGZvciByZXNwb25zaXZlIHNsaWRlcnNcblxuICAgICAgICAgIGlmICh0eXBlb2Ygc3RyZXRjaCA9PT0gJ3N0cmluZycgJiYgc3RyZXRjaC5pbmRleE9mKCclJykgIT09IC0xKSB7XG4gICAgICAgICAgICBzdHJldGNoID0gcGFyc2VGbG9hdChwYXJhbXMuc3RyZXRjaCkgLyAxMDAgKiBzbGlkZVNpemU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IHRyYW5zbGF0ZVkgPSBpc0hvcml6b250YWwgPyAwIDogc3RyZXRjaCAqIG9mZnNldE11bHRpcGxpZXI7XG4gICAgICAgICAgbGV0IHRyYW5zbGF0ZVggPSBpc0hvcml6b250YWwgPyBzdHJldGNoICogb2Zmc2V0TXVsdGlwbGllciA6IDA7XG4gICAgICAgICAgbGV0IHNjYWxlID0gMSAtICgxIC0gcGFyYW1zLnNjYWxlKSAqIE1hdGguYWJzKG9mZnNldE11bHRpcGxpZXIpOyAvLyBGaXggZm9yIHVsdHJhIHNtYWxsIHZhbHVlc1xuXG4gICAgICAgICAgaWYgKE1hdGguYWJzKHRyYW5zbGF0ZVgpIDwgMC4wMDEpIHRyYW5zbGF0ZVggPSAwO1xuICAgICAgICAgIGlmIChNYXRoLmFicyh0cmFuc2xhdGVZKSA8IDAuMDAxKSB0cmFuc2xhdGVZID0gMDtcbiAgICAgICAgICBpZiAoTWF0aC5hYnModHJhbnNsYXRlWikgPCAwLjAwMSkgdHJhbnNsYXRlWiA9IDA7XG4gICAgICAgICAgaWYgKE1hdGguYWJzKHJvdGF0ZVkpIDwgMC4wMDEpIHJvdGF0ZVkgPSAwO1xuICAgICAgICAgIGlmIChNYXRoLmFicyhyb3RhdGVYKSA8IDAuMDAxKSByb3RhdGVYID0gMDtcbiAgICAgICAgICBpZiAoTWF0aC5hYnMoc2NhbGUpIDwgMC4wMDEpIHNjYWxlID0gMDtcbiAgICAgICAgICBjb25zdCBzbGlkZVRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3RyYW5zbGF0ZVh9cHgsJHt0cmFuc2xhdGVZfXB4LCR7dHJhbnNsYXRlWn1weCkgIHJvdGF0ZVgoJHtyb3RhdGVYfWRlZykgcm90YXRlWSgke3JvdGF0ZVl9ZGVnKSBzY2FsZSgke3NjYWxlfSlgO1xuICAgICAgICAgIGNvbnN0ICR0YXJnZXRFbCA9IGVmZmVjdFRhcmdldChwYXJhbXMsICRzbGlkZUVsKTtcbiAgICAgICAgICAkdGFyZ2V0RWwudHJhbnNmb3JtKHNsaWRlVHJhbnNmb3JtKTtcbiAgICAgICAgICAkc2xpZGVFbFswXS5zdHlsZS56SW5kZXggPSAtTWF0aC5hYnMoTWF0aC5yb3VuZChvZmZzZXRNdWx0aXBsaWVyKSkgKyAxO1xuXG4gICAgICAgICAgaWYgKHBhcmFtcy5zbGlkZVNoYWRvd3MpIHtcbiAgICAgICAgICAgIC8vIFNldCBzaGFkb3dzXG4gICAgICAgICAgICBsZXQgJHNoYWRvd0JlZm9yZUVsID0gaXNIb3Jpem9udGFsID8gJHNsaWRlRWwuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCcpIDogJHNsaWRlRWwuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wJyk7XG4gICAgICAgICAgICBsZXQgJHNoYWRvd0FmdGVyRWwgPSBpc0hvcml6b250YWwgPyAkc2xpZGVFbC5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCcpIDogJHNsaWRlRWwuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tJyk7XG5cbiAgICAgICAgICAgIGlmICgkc2hhZG93QmVmb3JlRWwubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICRzaGFkb3dCZWZvcmVFbCA9IGNyZWF0ZVNoYWRvdyhwYXJhbXMsICRzbGlkZUVsLCBpc0hvcml6b250YWwgPyAnbGVmdCcgOiAndG9wJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkc2hhZG93QWZ0ZXJFbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgJHNoYWRvd0FmdGVyRWwgPSBjcmVhdGVTaGFkb3cocGFyYW1zLCAkc2xpZGVFbCwgaXNIb3Jpem9udGFsID8gJ3JpZ2h0JyA6ICdib3R0b20nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCRzaGFkb3dCZWZvcmVFbC5sZW5ndGgpICRzaGFkb3dCZWZvcmVFbFswXS5zdHlsZS5vcGFjaXR5ID0gb2Zmc2V0TXVsdGlwbGllciA+IDAgPyBvZmZzZXRNdWx0aXBsaWVyIDogMDtcbiAgICAgICAgICAgIGlmICgkc2hhZG93QWZ0ZXJFbC5sZW5ndGgpICRzaGFkb3dBZnRlckVsWzBdLnN0eWxlLm9wYWNpdHkgPSAtb2Zmc2V0TXVsdGlwbGllciA+IDAgPyAtb2Zmc2V0TXVsdGlwbGllciA6IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzZXRUcmFuc2l0aW9uID0gZHVyYXRpb24gPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgdHJhbnNmb3JtRWxcbiAgICAgICAgfSA9IHN3aXBlci5wYXJhbXMuY292ZXJmbG93RWZmZWN0O1xuICAgICAgICBjb25zdCAkdHJhbnNpdGlvbkVsZW1lbnRzID0gdHJhbnNmb3JtRWwgPyBzd2lwZXIuc2xpZGVzLmZpbmQodHJhbnNmb3JtRWwpIDogc3dpcGVyLnNsaWRlcztcbiAgICAgICAgJHRyYW5zaXRpb25FbGVtZW50cy50cmFuc2l0aW9uKGR1cmF0aW9uKS5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy10b3AsIC5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0LCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1ib3R0b20sIC5zd2lwZXItc2xpZGUtc2hhZG93LWxlZnQnKS50cmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICAgIH07XG5cbiAgICAgIGVmZmVjdEluaXQoe1xuICAgICAgICBlZmZlY3Q6ICdjb3ZlcmZsb3cnLFxuICAgICAgICBzd2lwZXIsXG4gICAgICAgIG9uLFxuICAgICAgICBzZXRUcmFuc2xhdGUsXG4gICAgICAgIHNldFRyYW5zaXRpb24sXG4gICAgICAgIHBlcnNwZWN0aXZlOiAoKSA9PiB0cnVlLFxuICAgICAgICBvdmVyd3JpdGVQYXJhbXM6ICgpID0+ICh7XG4gICAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gRWZmZWN0Q3JlYXRpdmUoX3JlZikge1xuICAgICAgbGV0IHtcbiAgICAgICAgc3dpcGVyLFxuICAgICAgICBleHRlbmRQYXJhbXMsXG4gICAgICAgIG9uXG4gICAgICB9ID0gX3JlZjtcbiAgICAgIGV4dGVuZFBhcmFtcyh7XG4gICAgICAgIGNyZWF0aXZlRWZmZWN0OiB7XG4gICAgICAgICAgdHJhbnNmb3JtRWw6IG51bGwsXG4gICAgICAgICAgbGltaXRQcm9ncmVzczogMSxcbiAgICAgICAgICBzaGFkb3dQZXJQcm9ncmVzczogZmFsc2UsXG4gICAgICAgICAgcHJvZ3Jlc3NNdWx0aXBsaWVyOiAxLFxuICAgICAgICAgIHBlcnNwZWN0aXZlOiB0cnVlLFxuICAgICAgICAgIHByZXY6IHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogWzAsIDAsIDBdLFxuICAgICAgICAgICAgcm90YXRlOiBbMCwgMCwgMF0sXG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgc2NhbGU6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIG5leHQ6IHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogWzAsIDAsIDBdLFxuICAgICAgICAgICAgcm90YXRlOiBbMCwgMCwgMF0sXG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgc2NhbGU6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBnZXRUcmFuc2xhdGVWYWx1ZSA9IHZhbHVlID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHJldHVybiB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGAke3ZhbHVlfXB4YDtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHNldFRyYW5zbGF0ZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHNsaWRlcyxcbiAgICAgICAgICAkd3JhcHBlckVsLFxuICAgICAgICAgIHNsaWRlc1NpemVzR3JpZFxuICAgICAgICB9ID0gc3dpcGVyO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLmNyZWF0aXZlRWZmZWN0O1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgcHJvZ3Jlc3NNdWx0aXBsaWVyOiBtdWx0aXBsaWVyXG4gICAgICAgIH0gPSBwYXJhbXM7XG4gICAgICAgIGNvbnN0IGlzQ2VudGVyZWRTbGlkZXMgPSBzd2lwZXIucGFyYW1zLmNlbnRlcmVkU2xpZGVzO1xuXG4gICAgICAgIGlmIChpc0NlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAgICAgY29uc3QgbWFyZ2luID0gc2xpZGVzU2l6ZXNHcmlkWzBdIC8gMiAtIHN3aXBlci5wYXJhbXMuc2xpZGVzT2Zmc2V0QmVmb3JlIHx8IDA7XG4gICAgICAgICAgJHdyYXBwZXJFbC50cmFuc2Zvcm0oYHRyYW5zbGF0ZVgoY2FsYyg1MCUgLSAke21hcmdpbn1weCkpYCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGNvbnN0ICRzbGlkZUVsID0gc2xpZGVzLmVxKGkpO1xuICAgICAgICAgIGNvbnN0IHNsaWRlUHJvZ3Jlc3MgPSAkc2xpZGVFbFswXS5wcm9ncmVzcztcbiAgICAgICAgICBjb25zdCBwcm9ncmVzcyA9IE1hdGgubWluKE1hdGgubWF4KCRzbGlkZUVsWzBdLnByb2dyZXNzLCAtcGFyYW1zLmxpbWl0UHJvZ3Jlc3MpLCBwYXJhbXMubGltaXRQcm9ncmVzcyk7XG4gICAgICAgICAgbGV0IG9yaWdpbmFsUHJvZ3Jlc3MgPSBwcm9ncmVzcztcblxuICAgICAgICAgIGlmICghaXNDZW50ZXJlZFNsaWRlcykge1xuICAgICAgICAgICAgb3JpZ2luYWxQcm9ncmVzcyA9IE1hdGgubWluKE1hdGgubWF4KCRzbGlkZUVsWzBdLm9yaWdpbmFsUHJvZ3Jlc3MsIC1wYXJhbXMubGltaXRQcm9ncmVzcyksIHBhcmFtcy5saW1pdFByb2dyZXNzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBvZmZzZXQgPSAkc2xpZGVFbFswXS5zd2lwZXJTbGlkZU9mZnNldDtcbiAgICAgICAgICBjb25zdCB0ID0gW3N3aXBlci5wYXJhbXMuY3NzTW9kZSA/IC1vZmZzZXQgLSBzd2lwZXIudHJhbnNsYXRlIDogLW9mZnNldCwgMCwgMF07XG4gICAgICAgICAgY29uc3QgciA9IFswLCAwLCAwXTtcbiAgICAgICAgICBsZXQgY3VzdG9tID0gZmFsc2U7XG5cbiAgICAgICAgICBpZiAoIXN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICAgdFsxXSA9IHRbMF07XG4gICAgICAgICAgICB0WzBdID0gMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogWzAsIDAsIDBdLFxuICAgICAgICAgICAgcm90YXRlOiBbMCwgMCwgMF0sXG4gICAgICAgICAgICBzY2FsZTogMSxcbiAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKHByb2dyZXNzIDwgMCkge1xuICAgICAgICAgICAgZGF0YSA9IHBhcmFtcy5uZXh0O1xuICAgICAgICAgICAgY3VzdG9tID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHByb2dyZXNzID4gMCkge1xuICAgICAgICAgICAgZGF0YSA9IHBhcmFtcy5wcmV2O1xuICAgICAgICAgICAgY3VzdG9tID0gdHJ1ZTtcbiAgICAgICAgICB9IC8vIHNldCB0cmFuc2xhdGVcblxuXG4gICAgICAgICAgdC5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHRbaW5kZXhdID0gYGNhbGMoJHt2YWx1ZX1weCArICgke2dldFRyYW5zbGF0ZVZhbHVlKGRhdGEudHJhbnNsYXRlW2luZGV4XSl9ICogJHtNYXRoLmFicyhwcm9ncmVzcyAqIG11bHRpcGxpZXIpfSkpYDtcbiAgICAgICAgICB9KTsgLy8gc2V0IHJvdGF0ZXNcblxuICAgICAgICAgIHIuZm9yRWFjaCgodmFsdWUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByW2luZGV4XSA9IGRhdGEucm90YXRlW2luZGV4XSAqIE1hdGguYWJzKHByb2dyZXNzICogbXVsdGlwbGllcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgJHNsaWRlRWxbMF0uc3R5bGUuekluZGV4ID0gLU1hdGguYWJzKE1hdGgucm91bmQoc2xpZGVQcm9ncmVzcykpICsgc2xpZGVzLmxlbmd0aDtcbiAgICAgICAgICBjb25zdCB0cmFuc2xhdGVTdHJpbmcgPSB0LmpvaW4oJywgJyk7XG4gICAgICAgICAgY29uc3Qgcm90YXRlU3RyaW5nID0gYHJvdGF0ZVgoJHtyWzBdfWRlZykgcm90YXRlWSgke3JbMV19ZGVnKSByb3RhdGVaKCR7clsyXX1kZWcpYDtcbiAgICAgICAgICBjb25zdCBzY2FsZVN0cmluZyA9IG9yaWdpbmFsUHJvZ3Jlc3MgPCAwID8gYHNjYWxlKCR7MSArICgxIC0gZGF0YS5zY2FsZSkgKiBvcmlnaW5hbFByb2dyZXNzICogbXVsdGlwbGllcn0pYCA6IGBzY2FsZSgkezEgLSAoMSAtIGRhdGEuc2NhbGUpICogb3JpZ2luYWxQcm9ncmVzcyAqIG11bHRpcGxpZXJ9KWA7XG4gICAgICAgICAgY29uc3Qgb3BhY2l0eVN0cmluZyA9IG9yaWdpbmFsUHJvZ3Jlc3MgPCAwID8gMSArICgxIC0gZGF0YS5vcGFjaXR5KSAqIG9yaWdpbmFsUHJvZ3Jlc3MgKiBtdWx0aXBsaWVyIDogMSAtICgxIC0gZGF0YS5vcGFjaXR5KSAqIG9yaWdpbmFsUHJvZ3Jlc3MgKiBtdWx0aXBsaWVyO1xuICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3RyYW5zbGF0ZVN0cmluZ30pICR7cm90YXRlU3RyaW5nfSAke3NjYWxlU3RyaW5nfWA7IC8vIFNldCBzaGFkb3dzXG5cbiAgICAgICAgICBpZiAoY3VzdG9tICYmIGRhdGEuc2hhZG93IHx8ICFjdXN0b20pIHtcbiAgICAgICAgICAgIGxldCAkc2hhZG93RWwgPSAkc2xpZGVFbC5jaGlsZHJlbignLnN3aXBlci1zbGlkZS1zaGFkb3cnKTtcblxuICAgICAgICAgICAgaWYgKCRzaGFkb3dFbC5sZW5ndGggPT09IDAgJiYgZGF0YS5zaGFkb3cpIHtcbiAgICAgICAgICAgICAgJHNoYWRvd0VsID0gY3JlYXRlU2hhZG93KHBhcmFtcywgJHNsaWRlRWwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJHNoYWRvd0VsLmxlbmd0aCkge1xuICAgICAgICAgICAgICBjb25zdCBzaGFkb3dPcGFjaXR5ID0gcGFyYW1zLnNoYWRvd1BlclByb2dyZXNzID8gcHJvZ3Jlc3MgKiAoMSAvIHBhcmFtcy5saW1pdFByb2dyZXNzKSA6IHByb2dyZXNzO1xuICAgICAgICAgICAgICAkc2hhZG93RWxbMF0uc3R5bGUub3BhY2l0eSA9IE1hdGgubWluKE1hdGgubWF4KE1hdGguYWJzKHNoYWRvd09wYWNpdHkpLCAwKSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgJHRhcmdldEVsID0gZWZmZWN0VGFyZ2V0KHBhcmFtcywgJHNsaWRlRWwpO1xuICAgICAgICAgICR0YXJnZXRFbC50cmFuc2Zvcm0odHJhbnNmb3JtKS5jc3Moe1xuICAgICAgICAgICAgb3BhY2l0eTogb3BhY2l0eVN0cmluZ1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKGRhdGEub3JpZ2luKSB7XG4gICAgICAgICAgICAkdGFyZ2V0RWwuY3NzKCd0cmFuc2Zvcm0tb3JpZ2luJywgZGF0YS5vcmlnaW4pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3Qgc2V0VHJhbnNpdGlvbiA9IGR1cmF0aW9uID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHRyYW5zZm9ybUVsXG4gICAgICAgIH0gPSBzd2lwZXIucGFyYW1zLmNyZWF0aXZlRWZmZWN0O1xuICAgICAgICBjb25zdCAkdHJhbnNpdGlvbkVsZW1lbnRzID0gdHJhbnNmb3JtRWwgPyBzd2lwZXIuc2xpZGVzLmZpbmQodHJhbnNmb3JtRWwpIDogc3dpcGVyLnNsaWRlcztcbiAgICAgICAgJHRyYW5zaXRpb25FbGVtZW50cy50cmFuc2l0aW9uKGR1cmF0aW9uKS5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdycpLnRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgICAgICBlZmZlY3RWaXJ0dWFsVHJhbnNpdGlvbkVuZCh7XG4gICAgICAgICAgc3dpcGVyLFxuICAgICAgICAgIGR1cmF0aW9uLFxuICAgICAgICAgIHRyYW5zZm9ybUVsLFxuICAgICAgICAgIGFsbFNsaWRlczogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGVmZmVjdEluaXQoe1xuICAgICAgICBlZmZlY3Q6ICdjcmVhdGl2ZScsXG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgb24sXG4gICAgICAgIHNldFRyYW5zbGF0ZSxcbiAgICAgICAgc2V0VHJhbnNpdGlvbixcbiAgICAgICAgcGVyc3BlY3RpdmU6ICgpID0+IHN3aXBlci5wYXJhbXMuY3JlYXRpdmVFZmZlY3QucGVyc3BlY3RpdmUsXG4gICAgICAgIG92ZXJ3cml0ZVBhcmFtczogKCkgPT4gKHtcbiAgICAgICAgICB3YXRjaFNsaWRlc1Byb2dyZXNzOiB0cnVlLFxuICAgICAgICAgIHZpcnR1YWxUcmFuc2xhdGU6ICFzd2lwZXIucGFyYW1zLmNzc01vZGVcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIEVmZmVjdENhcmRzKF9yZWYpIHtcbiAgICAgIGxldCB7XG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgZXh0ZW5kUGFyYW1zLFxuICAgICAgICBvblxuICAgICAgfSA9IF9yZWY7XG4gICAgICBleHRlbmRQYXJhbXMoe1xuICAgICAgICBjYXJkc0VmZmVjdDoge1xuICAgICAgICAgIHNsaWRlU2hhZG93czogdHJ1ZSxcbiAgICAgICAgICB0cmFuc2Zvcm1FbDogbnVsbCxcbiAgICAgICAgICByb3RhdGU6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHNldFRyYW5zbGF0ZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHNsaWRlcyxcbiAgICAgICAgICBhY3RpdmVJbmRleFxuICAgICAgICB9ID0gc3dpcGVyO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLmNhcmRzRWZmZWN0O1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgc3RhcnRUcmFuc2xhdGUsXG4gICAgICAgICAgaXNUb3VjaGVkXG4gICAgICAgIH0gPSBzd2lwZXIudG91Y2hFdmVudHNEYXRhO1xuICAgICAgICBjb25zdCBjdXJyZW50VHJhbnNsYXRlID0gc3dpcGVyLnRyYW5zbGF0ZTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGNvbnN0ICRzbGlkZUVsID0gc2xpZGVzLmVxKGkpO1xuICAgICAgICAgIGNvbnN0IHNsaWRlUHJvZ3Jlc3MgPSAkc2xpZGVFbFswXS5wcm9ncmVzcztcbiAgICAgICAgICBjb25zdCBwcm9ncmVzcyA9IE1hdGgubWluKE1hdGgubWF4KHNsaWRlUHJvZ3Jlc3MsIC00KSwgNCk7XG4gICAgICAgICAgbGV0IG9mZnNldCA9ICRzbGlkZUVsWzBdLnN3aXBlclNsaWRlT2Zmc2V0O1xuXG4gICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuY2VudGVyZWRTbGlkZXMgJiYgIXN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwudHJhbnNmb3JtKGB0cmFuc2xhdGVYKCR7c3dpcGVyLm1pblRyYW5zbGF0ZSgpfXB4KWApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmNlbnRlcmVkU2xpZGVzICYmIHN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgICAgICAgICAgb2Zmc2V0IC09IHNsaWRlc1swXS5zd2lwZXJTbGlkZU9mZnNldDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgdFggPSBzd2lwZXIucGFyYW1zLmNzc01vZGUgPyAtb2Zmc2V0IC0gc3dpcGVyLnRyYW5zbGF0ZSA6IC1vZmZzZXQ7XG4gICAgICAgICAgbGV0IHRZID0gMDtcbiAgICAgICAgICBjb25zdCB0WiA9IC0xMDAgKiBNYXRoLmFicyhwcm9ncmVzcyk7XG4gICAgICAgICAgbGV0IHNjYWxlID0gMTtcbiAgICAgICAgICBsZXQgcm90YXRlID0gLTIgKiBwcm9ncmVzcztcbiAgICAgICAgICBsZXQgdFhBZGQgPSA4IC0gTWF0aC5hYnMocHJvZ3Jlc3MpICogMC43NTtcbiAgICAgICAgICBjb25zdCBzbGlkZUluZGV4ID0gc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQgPyBzd2lwZXIudmlydHVhbC5mcm9tICsgaSA6IGk7XG4gICAgICAgICAgY29uc3QgaXNTd2lwZVRvTmV4dCA9IChzbGlkZUluZGV4ID09PSBhY3RpdmVJbmRleCB8fCBzbGlkZUluZGV4ID09PSBhY3RpdmVJbmRleCAtIDEpICYmIHByb2dyZXNzID4gMCAmJiBwcm9ncmVzcyA8IDEgJiYgKGlzVG91Y2hlZCB8fCBzd2lwZXIucGFyYW1zLmNzc01vZGUpICYmIGN1cnJlbnRUcmFuc2xhdGUgPCBzdGFydFRyYW5zbGF0ZTtcbiAgICAgICAgICBjb25zdCBpc1N3aXBlVG9QcmV2ID0gKHNsaWRlSW5kZXggPT09IGFjdGl2ZUluZGV4IHx8IHNsaWRlSW5kZXggPT09IGFjdGl2ZUluZGV4ICsgMSkgJiYgcHJvZ3Jlc3MgPCAwICYmIHByb2dyZXNzID4gLTEgJiYgKGlzVG91Y2hlZCB8fCBzd2lwZXIucGFyYW1zLmNzc01vZGUpICYmIGN1cnJlbnRUcmFuc2xhdGUgPiBzdGFydFRyYW5zbGF0ZTtcblxuICAgICAgICAgIGlmIChpc1N3aXBlVG9OZXh0IHx8IGlzU3dpcGVUb1ByZXYpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YlByb2dyZXNzID0gKDEgLSBNYXRoLmFicygoTWF0aC5hYnMocHJvZ3Jlc3MpIC0gMC41KSAvIDAuNSkpICoqIDAuNTtcbiAgICAgICAgICAgIHJvdGF0ZSArPSAtMjggKiBwcm9ncmVzcyAqIHN1YlByb2dyZXNzO1xuICAgICAgICAgICAgc2NhbGUgKz0gLTAuNSAqIHN1YlByb2dyZXNzO1xuICAgICAgICAgICAgdFhBZGQgKz0gOTYgKiBzdWJQcm9ncmVzcztcbiAgICAgICAgICAgIHRZID0gYCR7LTI1ICogc3ViUHJvZ3Jlc3MgKiBNYXRoLmFicyhwcm9ncmVzcyl9JWA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHByb2dyZXNzIDwgMCkge1xuICAgICAgICAgICAgLy8gbmV4dFxuICAgICAgICAgICAgdFggPSBgY2FsYygke3RYfXB4ICsgKCR7dFhBZGQgKiBNYXRoLmFicyhwcm9ncmVzcyl9JSkpYDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHByb2dyZXNzID4gMCkge1xuICAgICAgICAgICAgLy8gcHJldlxuICAgICAgICAgICAgdFggPSBgY2FsYygke3RYfXB4ICsgKC0ke3RYQWRkICogTWF0aC5hYnMocHJvZ3Jlc3MpfSUpKWA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRYID0gYCR7dFh9cHhgO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgICBjb25zdCBwcmV2WSA9IHRZO1xuICAgICAgICAgICAgdFkgPSB0WDtcbiAgICAgICAgICAgIHRYID0gcHJldlk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgc2NhbGVTdHJpbmcgPSBwcm9ncmVzcyA8IDAgPyBgJHsxICsgKDEgLSBzY2FsZSkgKiBwcm9ncmVzc31gIDogYCR7MSAtICgxIC0gc2NhbGUpICogcHJvZ3Jlc3N9YDtcbiAgICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSBgXG4gICAgICAgIHRyYW5zbGF0ZTNkKCR7dFh9LCAke3RZfSwgJHt0Wn1weClcbiAgICAgICAgcm90YXRlWigke3BhcmFtcy5yb3RhdGUgPyByb3RhdGUgOiAwfWRlZylcbiAgICAgICAgc2NhbGUoJHtzY2FsZVN0cmluZ30pXG4gICAgICBgO1xuXG4gICAgICAgICAgaWYgKHBhcmFtcy5zbGlkZVNoYWRvd3MpIHtcbiAgICAgICAgICAgIC8vIFNldCBzaGFkb3dzXG4gICAgICAgICAgICBsZXQgJHNoYWRvd0VsID0gJHNsaWRlRWwuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3cnKTtcblxuICAgICAgICAgICAgaWYgKCRzaGFkb3dFbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgJHNoYWRvd0VsID0gY3JlYXRlU2hhZG93KHBhcmFtcywgJHNsaWRlRWwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJHNoYWRvd0VsLmxlbmd0aCkgJHNoYWRvd0VsWzBdLnN0eWxlLm9wYWNpdHkgPSBNYXRoLm1pbihNYXRoLm1heCgoTWF0aC5hYnMocHJvZ3Jlc3MpIC0gMC41KSAvIDAuNSwgMCksIDEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICRzbGlkZUVsWzBdLnN0eWxlLnpJbmRleCA9IC1NYXRoLmFicyhNYXRoLnJvdW5kKHNsaWRlUHJvZ3Jlc3MpKSArIHNsaWRlcy5sZW5ndGg7XG4gICAgICAgICAgY29uc3QgJHRhcmdldEVsID0gZWZmZWN0VGFyZ2V0KHBhcmFtcywgJHNsaWRlRWwpO1xuICAgICAgICAgICR0YXJnZXRFbC50cmFuc2Zvcm0odHJhbnNmb3JtKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3Qgc2V0VHJhbnNpdGlvbiA9IGR1cmF0aW9uID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHRyYW5zZm9ybUVsXG4gICAgICAgIH0gPSBzd2lwZXIucGFyYW1zLmNhcmRzRWZmZWN0O1xuICAgICAgICBjb25zdCAkdHJhbnNpdGlvbkVsZW1lbnRzID0gdHJhbnNmb3JtRWwgPyBzd2lwZXIuc2xpZGVzLmZpbmQodHJhbnNmb3JtRWwpIDogc3dpcGVyLnNsaWRlcztcbiAgICAgICAgJHRyYW5zaXRpb25FbGVtZW50cy50cmFuc2l0aW9uKGR1cmF0aW9uKS5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdycpLnRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgICAgICBlZmZlY3RWaXJ0dWFsVHJhbnNpdGlvbkVuZCh7XG4gICAgICAgICAgc3dpcGVyLFxuICAgICAgICAgIGR1cmF0aW9uLFxuICAgICAgICAgIHRyYW5zZm9ybUVsXG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgZWZmZWN0SW5pdCh7XG4gICAgICAgIGVmZmVjdDogJ2NhcmRzJyxcbiAgICAgICAgc3dpcGVyLFxuICAgICAgICBvbixcbiAgICAgICAgc2V0VHJhbnNsYXRlLFxuICAgICAgICBzZXRUcmFuc2l0aW9uLFxuICAgICAgICBwZXJzcGVjdGl2ZTogKCkgPT4gdHJ1ZSxcbiAgICAgICAgb3ZlcndyaXRlUGFyYW1zOiAoKSA9PiAoe1xuICAgICAgICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IHRydWUsXG4gICAgICAgICAgdmlydHVhbFRyYW5zbGF0ZTogIXN3aXBlci5wYXJhbXMuY3NzTW9kZVxuICAgICAgICB9KVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gU3dpcGVyIENsYXNzXG4gICAgY29uc3QgbW9kdWxlcyA9IFtWaXJ0dWFsLCBLZXlib2FyZCwgTW91c2V3aGVlbCwgTmF2aWdhdGlvbiwgUGFnaW5hdGlvbiwgU2Nyb2xsYmFyLCBQYXJhbGxheCwgWm9vbSwgTGF6eSwgQ29udHJvbGxlciwgQTExeSwgSGlzdG9yeSwgSGFzaE5hdmlnYXRpb24sIEF1dG9wbGF5LCBUaHVtYiwgZnJlZU1vZGUsIEdyaWQsIE1hbmlwdWxhdGlvbiwgRWZmZWN0RmFkZSwgRWZmZWN0Q3ViZSwgRWZmZWN0RmxpcCwgRWZmZWN0Q292ZXJmbG93LCBFZmZlY3RDcmVhdGl2ZSwgRWZmZWN0Q2FyZHNdO1xuICAgIFN3aXBlci51c2UobW9kdWxlcyk7XG5cbiAgICByZXR1cm4gU3dpcGVyO1xuXG59KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zd2lwZXItYnVuZGxlLmpzLm1hcCJdLCJmaWxlIjoic3dpcGVyLmpzIn0=
