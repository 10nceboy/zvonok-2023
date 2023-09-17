/*!
 * dist/jquery.inputmask
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2021 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.0.7
 */
!function(e, t) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = t(require("jquery")); else if ("function" == typeof define && define.amd) define([ "jquery" ], t); else {
        var i = "object" == typeof exports ? t(require("jquery")) : t(e.jQuery);
        for (var a in i) ("object" == typeof exports ? exports : e)[a] = i[a];
    }
}(self, (function(e) {
    return function() {
        "use strict";
        var t = {
            3046: function(e, t, i) {
                var a;
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.default = void 0, i(3851), i(219), i(207), i(5296);
                var n = ((a = i(2394)) && a.__esModule ? a : {
                    default: a
                }).default;
                t.default = n;
            },
            8741: function(e, t) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.default = void 0;
                var i = !("undefined" == typeof window || !window.document || !window.document.createElement);
                t.default = i;
            },
            3976: function(e, t, i) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.default = void 0;
                var a, n = (a = i(5581)) && a.__esModule ? a : {
                    default: a
                };
                var r = {
                    _maxTestPos: 500,
                    placeholder: "_",
                    optionalmarker: [ "[", "]" ],
                    quantifiermarker: [ "{", "}" ],
                    groupmarker: [ "(", ")" ],
                    alternatormarker: "|",
                    escapeChar: "\\",
                    mask: null,
                    regex: null,
                    oncomplete: function() {},
                    onincomplete: function() {},
                    oncleared: function() {},
                    repeat: 0,
                    greedy: !1,
                    autoUnmask: !1,
                    removeMaskOnSubmit: !1,
                    clearMaskOnLostFocus: !0,
                    insertMode: !0,
                    insertModeVisual: !0,
                    clearIncomplete: !1,
                    alias: null,
                    onKeyDown: function() {},
                    onBeforeMask: null,
                    onBeforePaste: function(e, t) {
                        return "function" == typeof t.onBeforeMask ? t.onBeforeMask.call(this, e, t) : e;
                    },
                    onBeforeWrite: null,
                    onUnMask: null,
                    showMaskOnFocus: !0,
                    showMaskOnHover: !0,
                    onKeyValidation: function() {},
                    skipOptionalPartCharacter: " ",
                    numericInput: !1,
                    rightAlign: !1,
                    undoOnEscape: !0,
                    radixPoint: "",
                    _radixDance: !1,
                    groupSeparator: "",
                    keepStatic: null,
                    positionCaretOnTab: !0,
                    tabThrough: !1,
                    supportsInputType: [ "text", "tel", "url", "password", "search" ],
                    ignorables: [ n.default.BACKSPACE, n.default.TAB, n.default["PAUSE/BREAK"], n.default.ESCAPE, n.default.PAGE_UP, n.default.PAGE_DOWN, n.default.END, n.default.HOME, n.default.LEFT, n.default.UP, n.default.RIGHT, n.default.DOWN, n.default.INSERT, n.default.DELETE, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229 ],
                    isComplete: null,
                    preValidation: null,
                    postValidation: null,
                    staticDefinitionSymbol: void 0,
                    jitMasking: !1,
                    nullable: !0,
                    inputEventOnly: !1,
                    noValuePatching: !1,
                    positionCaretOnClick: "lvp",
                    casing: null,
                    inputmode: "text",
                    importDataAttributes: !0,
                    shiftPositions: !0,
                    usePrototypeDefinitions: !0,
                    validationEventTimeOut: 3e3,
                    substitutes: {}
                };
                t.default = r;
            },
            7392: function(e, t) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.default = void 0;
                t.default = {
                    9: {
                        validator: "[0-9\uff10-\uff19]",
                        definitionSymbol: "*"
                    },
                    a: {
                        validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                        definitionSymbol: "*"
                    },
                    "*": {
                        validator: "[0-9\uff10-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]"
                    }
                };
            },
            3287: function(e, t, i) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.default = void 0;
                var a, n = (a = i(2047)) && a.__esModule ? a : {
                    default: a
                };
                if (void 0 === n.default) throw "jQuery not loaded!";
                var r = n.default;
                t.default = r;
            },
            9845: function(e, t, i) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.ua = t.mobile = t.iphone = t.iemobile = t.ie = void 0;
                var a, n = (a = i(9380)) && a.__esModule ? a : {
                    default: a
                };
                var r = n.default.navigator && n.default.navigator.userAgent || "", o = r.indexOf("MSIE ") > 0 || r.indexOf("Trident/") > 0, s = "ontouchstart" in n.default, l = /iemobile/i.test(r), u = /iphone/i.test(r) && !l;
                t.iphone = u, t.iemobile = l, t.mobile = s, t.ie = o, t.ua = r;
            },
            7184: function(e, t) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.default = function(e) {
                    return e.replace(i, "\\$1");
                };
                var i = new RegExp("(\\" + [ "/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^" ].join("|\\") + ")", "gim");
            },
            6030: function(e, t, i) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.EventHandlers = void 0;
                var a, n = i(8711), r = (a = i(5581)) && a.__esModule ? a : {
                    default: a
                }, o = i(9845), s = i(7215), l = i(7760), u = i(4713);
                function c(e, t) {
                    var i = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (!i) {
                        if (Array.isArray(e) || (i = function(e, t) {
                            if (!e) return;
                            if ("string" == typeof e) return f(e, t);
                            var i = Object.prototype.toString.call(e).slice(8, -1);
                            "Object" === i && e.constructor && (i = e.constructor.name);
                            if ("Map" === i || "Set" === i) return Array.from(e);
                            if ("Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)) return f(e, t);
                        }(e)) || t && e && "number" == typeof e.length) {
                            i && (e = i);
                            var a = 0, n = function() {};
                            return {
                                s: n,
                                n: function() {
                                    return a >= e.length ? {
                                        done: !0
                                    } : {
                                        done: !1,
                                        value: e[a++]
                                    };
                                },
                                e: function(e) {
                                    throw e;
                                },
                                f: n
                            };
                        }
                        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                    }
                    var r, o = !0, s = !1;
                    return {
                        s: function() {
                            i = i.call(e);
                        },
                        n: function() {
                            var e = i.next();
                            return o = e.done, e;
                        },
                        e: function(e) {
                            s = !0, r = e;
                        },
                        f: function() {
                            try {
                                o || null == i.return || i.return();
                            } finally {
                                if (s) throw r;
                            }
                        }
                    };
                }
                function f(e, t) {
                    (null == t || t > e.length) && (t = e.length);
                    for (var i = 0, a = new Array(t); i < t; i++) a[i] = e[i];
                    return a;
                }
                var d = {
                    keydownEvent: function(e) {
                        var t = this.inputmask, i = t.opts, a = t.dependencyLib, c = t.maskset, f = this, d = a(f), p = e.keyCode, h = n.caret.call(t, f), m = i.onKeyDown.call(this, e, n.getBuffer.call(t), h, i);
                        if (void 0 !== m) return m;
                        if (p === r.default.BACKSPACE || p === r.default.DELETE || o.iphone && p === r.default.BACKSPACE_SAFARI || e.ctrlKey && p === r.default.X && !("oncut" in f)) e.preventDefault(), 
                        s.handleRemove.call(t, f, p, h), (0, l.writeBuffer)(f, n.getBuffer.call(t, !0), c.p, e, f.inputmask._valueGet() !== n.getBuffer.call(t).join("")); else if (p === r.default.END || p === r.default.PAGE_DOWN) {
                            e.preventDefault();
                            var v = n.seekNext.call(t, n.getLastValidPosition.call(t));
                            n.caret.call(t, f, e.shiftKey ? h.begin : v, v, !0);
                        } else p === r.default.HOME && !e.shiftKey || p === r.default.PAGE_UP ? (e.preventDefault(), 
                        n.caret.call(t, f, 0, e.shiftKey ? h.begin : 0, !0)) : i.undoOnEscape && p === r.default.ESCAPE && !0 !== e.altKey ? ((0, 
                        l.checkVal)(f, !0, !1, t.undoValue.split("")), d.trigger("click")) : p !== r.default.INSERT || e.shiftKey || e.ctrlKey || void 0 !== t.userOptions.insertMode ? !0 === i.tabThrough && p === r.default.TAB ? !0 === e.shiftKey ? (h.end = n.seekPrevious.call(t, h.end, !0), 
                        !0 === u.getTest.call(t, h.end - 1).match.static && h.end--, h.begin = n.seekPrevious.call(t, h.end, !0), 
                        h.begin >= 0 && h.end > 0 && (e.preventDefault(), n.caret.call(t, f, h.begin, h.end))) : (h.begin = n.seekNext.call(t, h.begin, !0), 
                        h.end = n.seekNext.call(t, h.begin, !0), h.end < c.maskLength && h.end--, h.begin <= c.maskLength && (e.preventDefault(), 
                        n.caret.call(t, f, h.begin, h.end))) : e.shiftKey || i.insertModeVisual && !1 === i.insertMode && (p === r.default.RIGHT ? setTimeout((function() {
                            var e = n.caret.call(t, f);
                            n.caret.call(t, f, e.begin);
                        }), 0) : p === r.default.LEFT && setTimeout((function() {
                            var e = n.translatePosition.call(t, f.inputmask.caretPos.begin);
                            n.translatePosition.call(t, f.inputmask.caretPos.end);
                            t.isRTL ? n.caret.call(t, f, e + (e === c.maskLength ? 0 : 1)) : n.caret.call(t, f, e - (0 === e ? 0 : 1));
                        }), 0)) : s.isSelection.call(t, h) ? i.insertMode = !i.insertMode : (i.insertMode = !i.insertMode, 
                        n.caret.call(t, f, h.begin, h.begin));
                        t.ignorable = i.ignorables.includes(p);
                    },
                    keypressEvent: function(e, t, i, a, o) {
                        var u = this.inputmask || this, c = u.opts, f = u.dependencyLib, d = u.maskset, p = u.el, h = f(p), m = e.keyCode;
                        if (!(!0 === t || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || u.ignorable)) return m === r.default.ENTER && u.undoValue !== u._valueGet(!0) && (u.undoValue = u._valueGet(!0), 
                        setTimeout((function() {
                            h.trigger("change");
                        }), 0)), u.skipInputEvent = !0, !0;
                        if (m) {
                            44 !== m && 46 !== m || 3 !== e.location || "" === c.radixPoint || (m = c.radixPoint.charCodeAt(0));
                            var v, g = t ? {
                                begin: o,
                                end: o
                            } : n.caret.call(u, p), k = String.fromCharCode(m);
                            k = c.substitutes[k] || k, d.writeOutBuffer = !0;
                            var y = s.isValid.call(u, g, k, a, void 0, void 0, void 0, t);
                            if (!1 !== y && (n.resetMaskSet.call(u, !0), v = void 0 !== y.caret ? y.caret : n.seekNext.call(u, y.pos.begin ? y.pos.begin : y.pos), 
                            d.p = v), v = c.numericInput && void 0 === y.caret ? n.seekPrevious.call(u, v) : v, 
                            !1 !== i && (setTimeout((function() {
                                c.onKeyValidation.call(p, m, y);
                            }), 0), d.writeOutBuffer && !1 !== y)) {
                                var b = n.getBuffer.call(u);
                                (0, l.writeBuffer)(p, b, v, e, !0 !== t);
                            }
                            if (e.preventDefault(), t) return !1 !== y && (y.forwardPosition = v), y;
                        }
                    },
                    keyupEvent: function(e) {
                        var t = this.inputmask;
                        !t.isComposing || e.keyCode !== r.default.KEY_229 && e.keyCode !== r.default.ENTER || t.$el.trigger("input");
                    },
                    pasteEvent: function(e) {
                        var t, i = this.inputmask, a = i.opts, r = i._valueGet(!0), o = n.caret.call(i, this);
                        i.isRTL && (t = o.end, o.end = n.translatePosition.call(i, o.begin), o.begin = n.translatePosition.call(i, t));
                        var s = r.substr(0, o.begin), u = r.substr(o.end, r.length);
                        if (s == (i.isRTL ? n.getBufferTemplate.call(i).slice().reverse() : n.getBufferTemplate.call(i)).slice(0, o.begin).join("") && (s = ""), 
                        u == (i.isRTL ? n.getBufferTemplate.call(i).slice().reverse() : n.getBufferTemplate.call(i)).slice(o.end).join("") && (u = ""), 
                        window.clipboardData && window.clipboardData.getData) r = s + window.clipboardData.getData("Text") + u; else {
                            if (!e.clipboardData || !e.clipboardData.getData) return !0;
                            r = s + e.clipboardData.getData("text/plain") + u;
                        }
                        var f = r;
                        if (i.isRTL) {
                            f = f.split("");
                            var d, p = c(n.getBufferTemplate.call(i));
                            try {
                                for (p.s(); !(d = p.n()).done; ) {
                                    var h = d.value;
                                    f[0] === h && f.shift();
                                }
                            } catch (e) {
                                p.e(e);
                            } finally {
                                p.f();
                            }
                            f = f.join("");
                        }
                        if ("function" == typeof a.onBeforePaste) {
                            if (!1 === (f = a.onBeforePaste.call(i, f, a))) return !1;
                            f || (f = r);
                        }
                        (0, l.checkVal)(this, !0, !1, f.toString().split(""), e), e.preventDefault();
                    },
                    inputFallBackEvent: function(e) {
                        var t = this.inputmask, i = t.opts, a = t.dependencyLib;
                        var s = this, c = s.inputmask._valueGet(!0), f = (t.isRTL ? n.getBuffer.call(t).slice().reverse() : n.getBuffer.call(t)).join(""), p = n.caret.call(t, s, void 0, void 0, !0);
                        if (f !== c) {
                            c = function(e, i, a) {
                                if (o.iemobile) {
                                    var r = i.replace(n.getBuffer.call(t).join(""), "");
                                    if (1 === r.length) {
                                        var s = i.split("");
                                        s.splice(a.begin, 0, r), i = s.join("");
                                    }
                                }
                                return i;
                            }(0, c, p);
                            var h = function(e, a, r) {
                                for (var o, s, l, c = e.substr(0, r.begin).split(""), f = e.substr(r.begin).split(""), d = a.substr(0, r.begin).split(""), p = a.substr(r.begin).split(""), h = c.length >= d.length ? c.length : d.length, m = f.length >= p.length ? f.length : p.length, v = "", g = [], k = "~"; c.length < h; ) c.push(k);
                                for (;d.length < h; ) d.push(k);
                                for (;f.length < m; ) f.unshift(k);
                                for (;p.length < m; ) p.unshift(k);
                                var y = c.concat(f), b = d.concat(p);
                                for (s = 0, o = y.length; s < o; s++) switch (l = u.getPlaceholder.call(t, n.translatePosition.call(t, s)), 
                                v) {
                                  case "insertText":
                                    b[s - 1] === y[s] && r.begin == y.length - 1 && g.push(y[s]), s = o;
                                    break;

                                  case "insertReplacementText":
                                  case "deleteContentBackward":
                                    y[s] === k ? r.end++ : s = o;
                                    break;

                                  default:
                                    y[s] !== b[s] && (y[s + 1] !== k && y[s + 1] !== l && void 0 !== y[s + 1] || (b[s] !== l || b[s + 1] !== k) && b[s] !== k ? b[s + 1] === k && b[s] === y[s + 1] ? (v = "insertText", 
                                    g.push(y[s]), r.begin--, r.end--) : y[s] !== l && y[s] !== k && (y[s + 1] === k || b[s] !== y[s] && b[s + 1] === y[s + 1]) ? (v = "insertReplacementText", 
                                    g.push(y[s]), r.begin--) : y[s] === k ? (v = "deleteContentBackward", (n.isMask.call(t, n.translatePosition.call(t, s), !0) || b[s] === i.radixPoint) && r.end++) : s = o : (v = "insertText", 
                                    g.push(y[s]), r.begin--, r.end--));
                                }
                                return {
                                    action: v,
                                    data: g,
                                    caret: r
                                };
                            }(c, f, p);
                            switch ((s.inputmask.shadowRoot || s.ownerDocument).activeElement !== s && s.focus(), 
                            (0, l.writeBuffer)(s, n.getBuffer.call(t)), n.caret.call(t, s, p.begin, p.end, !0), 
                            h.action) {
                              case "insertText":
                              case "insertReplacementText":
                                h.data.forEach((function(e, i) {
                                    var n = new a.Event("keypress");
                                    n.keyCode = e.charCodeAt(0), t.ignorable = !1, d.keypressEvent.call(s, n);
                                })), setTimeout((function() {
                                    t.$el.trigger("keyup");
                                }), 0);
                                break;

                              case "deleteContentBackward":
                                var m = new a.Event("keydown");
                                m.keyCode = r.default.BACKSPACE, d.keydownEvent.call(s, m);
                                break;

                              default:
                                (0, l.applyInputValue)(s, c);
                            }
                            e.preventDefault();
                        }
                    },
                    compositionendEvent: function(e) {
                        var t = this.inputmask;
                        t.isComposing = !1, t.$el.trigger("input");
                    },
                    setValueEvent: function(e) {
                        var t = this.inputmask, i = this, a = e && e.detail ? e.detail[0] : arguments[1];
                        void 0 === a && (a = i.inputmask._valueGet(!0)), (0, l.applyInputValue)(i, a), (e.detail && void 0 !== e.detail[1] || void 0 !== arguments[2]) && n.caret.call(t, i, e.detail ? e.detail[1] : arguments[2]);
                    },
                    focusEvent: function(e) {
                        var t = this.inputmask, i = t.opts, a = this, r = a.inputmask._valueGet();
                        i.showMaskOnFocus && r !== n.getBuffer.call(t).join("") && (0, l.writeBuffer)(a, n.getBuffer.call(t), n.seekNext.call(t, n.getLastValidPosition.call(t))), 
                        !0 !== i.positionCaretOnTab || !1 !== t.mouseEnter || s.isComplete.call(t, n.getBuffer.call(t)) && -1 !== n.getLastValidPosition.call(t) || d.clickEvent.apply(a, [ e, !0 ]), 
                        t.undoValue = t._valueGet(!0);
                    },
                    invalidEvent: function(e) {
                        this.inputmask.validationEvent = !0;
                    },
                    mouseleaveEvent: function() {
                        var e = this.inputmask, t = e.opts, i = this;
                        e.mouseEnter = !1, t.clearMaskOnLostFocus && (i.inputmask.shadowRoot || i.ownerDocument).activeElement !== i && (0, 
                        l.HandleNativePlaceholder)(i, e.originalPlaceholder);
                    },
                    clickEvent: function(e, t) {
                        var i = this.inputmask, a = this;
                        if ((a.inputmask.shadowRoot || a.ownerDocument).activeElement === a) {
                            var r = n.determineNewCaretPosition.call(i, n.caret.call(i, a), t);
                            void 0 !== r && n.caret.call(i, a, r);
                        }
                    },
                    cutEvent: function(e) {
                        var t = this.inputmask, i = t.maskset, a = this, o = n.caret.call(t, a), u = t.isRTL ? n.getBuffer.call(t).slice(o.end, o.begin) : n.getBuffer.call(t).slice(o.begin, o.end), c = t.isRTL ? u.reverse().join("") : u.join("");
                        window.navigator.clipboard ? window.navigator.clipboard.writeText(c) : window.clipboardData && window.clipboardData.getData && window.clipboardData.setData("Text", c), 
                        s.handleRemove.call(t, a, r.default.DELETE, o), (0, l.writeBuffer)(a, n.getBuffer.call(t), i.p, e, t.undoValue !== t._valueGet(!0));
                    },
                    blurEvent: function(e) {
                        var t = this.inputmask, i = t.opts, a = (0, t.dependencyLib)(this), r = this;
                        if (r.inputmask) {
                            (0, l.HandleNativePlaceholder)(r, t.originalPlaceholder);
                            var o = r.inputmask._valueGet(), u = n.getBuffer.call(t).slice();
                            "" !== o && (i.clearMaskOnLostFocus && (-1 === n.getLastValidPosition.call(t) && o === n.getBufferTemplate.call(t).join("") ? u = [] : l.clearOptionalTail.call(t, u)), 
                            !1 === s.isComplete.call(t, u) && (setTimeout((function() {
                                a.trigger("incomplete");
                            }), 0), i.clearIncomplete && (n.resetMaskSet.call(t), u = i.clearMaskOnLostFocus ? [] : n.getBufferTemplate.call(t).slice())), 
                            (0, l.writeBuffer)(r, u, void 0, e)), t.undoValue !== t._valueGet(!0) && (t.undoValue = t._valueGet(!0), 
                            a.trigger("change"));
                        }
                    },
                    mouseenterEvent: function() {
                        var e = this.inputmask, t = e.opts, i = this;
                        if (e.mouseEnter = !0, (i.inputmask.shadowRoot || i.ownerDocument).activeElement !== i) {
                            var a = (e.isRTL ? n.getBufferTemplate.call(e).slice().reverse() : n.getBufferTemplate.call(e)).join("");
                            e.placeholder !== a && i.placeholder !== e.originalPlaceholder && (e.originalPlaceholder = i.placeholder), 
                            t.showMaskOnHover && (0, l.HandleNativePlaceholder)(i, a);
                        }
                    },
                    submitEvent: function() {
                        var e = this.inputmask, t = e.opts;
                        e.undoValue !== e._valueGet(!0) && e.$el.trigger("change"), -1 === n.getLastValidPosition.call(e) && e._valueGet && e._valueGet() === n.getBufferTemplate.call(e).join("") && e._valueSet(""), 
                        t.clearIncomplete && !1 === s.isComplete.call(e, n.getBuffer.call(e)) && e._valueSet(""), 
                        t.removeMaskOnSubmit && (e._valueSet(e.unmaskedvalue(), !0), setTimeout((function() {
                            (0, l.writeBuffer)(e.el, n.getBuffer.call(e));
                        }), 0));
                    },
                    resetEvent: function() {
                        var e = this.inputmask;
                        e.refreshValue = !0, setTimeout((function() {
                            (0, l.applyInputValue)(e.el, e._valueGet(!0));
                        }), 0);
                    }
                };
                t.EventHandlers = d;
            },
            9716: function(e, t, i) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.EventRuler = void 0;
                var a = s(i(2394)), n = s(i(5581)), r = i(8711), o = i(7760);
                function s(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
                var l = {
                    on: function(e, t, i) {
                        var s = e.inputmask.dependencyLib, l = function(t) {
                            t.originalEvent && (t = t.originalEvent || t, arguments[0] = t);
                            var l, u = this, c = u.inputmask, f = c ? c.opts : void 0;
                            if (void 0 === c && "FORM" !== this.nodeName) {
                                var d = s.data(u, "_inputmask_opts");
                                s(u).off(), d && new a.default(d).mask(u);
                            } else {
                                if ([ "submit", "reset", "setvalue" ].includes(t.type) || "FORM" === this.nodeName || !(u.disabled || u.readOnly && !("keydown" === t.type && t.ctrlKey && 67 === t.keyCode || !1 === f.tabThrough && t.keyCode === n.default.TAB))) {
                                    switch (t.type) {
                                      case "input":
                                        if (!0 === c.skipInputEvent || t.inputType && "insertCompositionText" === t.inputType) return c.skipInputEvent = !1, 
                                        t.preventDefault();
                                        break;

                                      case "keydown":
                                        c.skipKeyPressEvent = !1, c.skipInputEvent = c.isComposing = t.keyCode === n.default.KEY_229;
                                        break;

                                      case "keyup":
                                      case "compositionend":
                                        c.isComposing && (c.skipInputEvent = !1);
                                        break;

                                      case "keypress":
                                        if (!0 === c.skipKeyPressEvent) return t.preventDefault();
                                        c.skipKeyPressEvent = !0;
                                        break;

                                      case "click":
                                      case "focus":
                                        return c.validationEvent ? (c.validationEvent = !1, e.blur(), (0, o.HandleNativePlaceholder)(e, (c.isRTL ? r.getBufferTemplate.call(c).slice().reverse() : r.getBufferTemplate.call(c)).join("")), 
                                        setTimeout((function() {
                                            e.focus();
                                        }), f.validationEventTimeOut), !1) : (l = arguments, setTimeout((function() {
                                            e.inputmask && i.apply(u, l);
                                        }), 0), !1);
                                    }
                                    var p = i.apply(u, arguments);
                                    return !1 === p && (t.preventDefault(), t.stopPropagation()), p;
                                }
                                t.preventDefault();
                            }
                        };
                        [ "submit", "reset" ].includes(t) ? (l = l.bind(e), null !== e.form && s(e.form).on(t, l)) : s(e).on(t, l), 
                        e.inputmask.events[t] = e.inputmask.events[t] || [], e.inputmask.events[t].push(l);
                    },
                    off: function(e, t) {
                        if (e.inputmask && e.inputmask.events) {
                            var i = e.inputmask.dependencyLib, a = e.inputmask.events;
                            for (var n in t && ((a = [])[t] = e.inputmask.events[t]), a) {
                                for (var r = a[n]; r.length > 0; ) {
                                    var o = r.pop();
                                    [ "submit", "reset" ].includes(n) ? null !== e.form && i(e.form).off(n, o) : i(e).off(n, o);
                                }
                                delete e.inputmask.events[n];
                            }
                        }
                    }
                };
                t.EventRuler = l;
            },
            219: function(e, t, i) {
                var a = d(i(2394)), n = d(i(5581)), r = d(i(7184)), o = i(8711), s = i(4713);
                function l(e) {
                    return l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e;
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                    }, l(e);
                }
                function u(e, t) {
                    return function(e) {
                        if (Array.isArray(e)) return e;
                    }(e) || function(e, t) {
                        var i = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                        if (null == i) return;
                        var a, n, r = [], o = !0, s = !1;
                        try {
                            for (i = i.call(e); !(o = (a = i.next()).done) && (r.push(a.value), !t || r.length !== t); o = !0) ;
                        } catch (e) {
                            s = !0, n = e;
                        } finally {
                            try {
                                o || null == i.return || i.return();
                            } finally {
                                if (s) throw n;
                            }
                        }
                        return r;
                    }(e, t) || function(e, t) {
                        if (!e) return;
                        if ("string" == typeof e) return c(e, t);
                        var i = Object.prototype.toString.call(e).slice(8, -1);
                        "Object" === i && e.constructor && (i = e.constructor.name);
                        if ("Map" === i || "Set" === i) return Array.from(e);
                        if ("Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)) return c(e, t);
                    }(e, t) || function() {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                    }();
                }
                function c(e, t) {
                    (null == t || t > e.length) && (t = e.length);
                    for (var i = 0, a = new Array(t); i < t; i++) a[i] = e[i];
                    return a;
                }
                function f(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var a = t[i];
                        a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
                        Object.defineProperty(e, a.key, a);
                    }
                }
                function d(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
                var p = a.default.dependencyLib, h = function() {
                    function e(t, i, a) {
                        !function(e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                        }(this, e), this.mask = t, this.format = i, this.opts = a, this._date = new Date(1, 0, 1), 
                        this.initDateObject(t, this.opts);
                    }
                    var t, i, a;
                    return t = e, (i = [ {
                        key: "date",
                        get: function() {
                            return void 0 === this._date && (this._date = new Date(1, 0, 1), this.initDateObject(void 0, this.opts)), 
                            this._date;
                        }
                    }, {
                        key: "initDateObject",
                        value: function(e, t) {
                            var i;
                            for (P(t).lastIndex = 0; i = P(t).exec(this.format); ) {
                                var a = new RegExp("\\d+$").exec(i[0]), n = a ? i[0][0] + "x" : i[0], r = void 0;
                                if (void 0 !== e) {
                                    if (a) {
                                        var o = P(t).lastIndex, s = O(i.index, t);
                                        P(t).lastIndex = o, r = e.slice(0, e.indexOf(s.nextMatch[0]));
                                    } else r = e.slice(0, n.length);
                                    e = e.slice(r.length);
                                }
                                Object.prototype.hasOwnProperty.call(g, n) && this.setValue(this, r, n, g[n][2], g[n][1]);
                            }
                        }
                    }, {
                        key: "setValue",
                        value: function(e, t, i, a, n) {
                            if (void 0 !== t && (e[a] = "ampm" === a ? t : t.replace(/[^0-9]/g, "0"), e["raw" + a] = t.replace(/\s/g, "_")), 
                            void 0 !== n) {
                                var r = e[a];
                                ("day" === a && 29 === parseInt(r) || "month" === a && 2 === parseInt(r)) && (29 !== parseInt(e.day) || 2 !== parseInt(e.month) || "" !== e.year && void 0 !== e.year || e._date.setFullYear(2012, 1, 29)), 
                                "day" === a && (v = !0, 0 === parseInt(r) && (r = 1)), "month" === a && (v = !0), 
                                "year" === a && (v = !0, r.length < 4 && (r = w(r, 4, !0))), "" === r || isNaN(r) || n.call(e._date, r), 
                                "ampm" === a && n.call(e._date, r);
                            }
                        }
                    }, {
                        key: "reset",
                        value: function() {
                            this._date = new Date(1, 0, 1);
                        }
                    }, {
                        key: "reInit",
                        value: function() {
                            this._date = void 0, this.date;
                        }
                    } ]) && f(t.prototype, i), a && f(t, a), Object.defineProperty(t, "prototype", {
                        writable: !1
                    }), e;
                }(), m = (new Date).getFullYear(), v = !1, g = {
                    d: [ "[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate ],
                    dd: [ "0[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", function() {
                        return w(Date.prototype.getDate.call(this), 2);
                    } ],
                    ddd: [ "" ],
                    dddd: [ "" ],
                    m: [ "[1-9]|1[012]", function(e) {
                        var t = e ? parseInt(e) : 0;
                        return t > 0 && t--, Date.prototype.setMonth.call(this, t);
                    }, "month", function() {
                        return Date.prototype.getMonth.call(this) + 1;
                    } ],
                    mm: [ "0[1-9]|1[012]", function(e) {
                        var t = e ? parseInt(e) : 0;
                        return t > 0 && t--, Date.prototype.setMonth.call(this, t);
                    }, "month", function() {
                        return w(Date.prototype.getMonth.call(this) + 1, 2);
                    } ],
                    mmm: [ "" ],
                    mmmm: [ "" ],
                    yy: [ "[0-9]{2}", Date.prototype.setFullYear, "year", function() {
                        return w(Date.prototype.getFullYear.call(this), 2);
                    } ],
                    yyyy: [ "[0-9]{4}", Date.prototype.setFullYear, "year", function() {
                        return w(Date.prototype.getFullYear.call(this), 4);
                    } ],
                    h: [ "[1-9]|1[0-2]", Date.prototype.setHours, "hours", Date.prototype.getHours ],
                    hh: [ "0[1-9]|1[0-2]", Date.prototype.setHours, "hours", function() {
                        return w(Date.prototype.getHours.call(this), 2);
                    } ],
                    hx: [ function(e) {
                        return "[0-9]{".concat(e, "}");
                    }, Date.prototype.setHours, "hours", function(e) {
                        return Date.prototype.getHours;
                    } ],
                    H: [ "1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours ],
                    HH: [ "0[0-9]|1[0-9]|2[0-3]", Date.prototype.setHours, "hours", function() {
                        return w(Date.prototype.getHours.call(this), 2);
                    } ],
                    Hx: [ function(e) {
                        return "[0-9]{".concat(e, "}");
                    }, Date.prototype.setHours, "hours", function(e) {
                        return function() {
                            return w(Date.prototype.getHours.call(this), e);
                        };
                    } ],
                    M: [ "[1-5]?[0-9]", Date.prototype.setMinutes, "minutes", Date.prototype.getMinutes ],
                    MM: [ "0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setMinutes, "minutes", function() {
                        return w(Date.prototype.getMinutes.call(this), 2);
                    } ],
                    s: [ "[1-5]?[0-9]", Date.prototype.setSeconds, "seconds", Date.prototype.getSeconds ],
                    ss: [ "0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setSeconds, "seconds", function() {
                        return w(Date.prototype.getSeconds.call(this), 2);
                    } ],
                    l: [ "[0-9]{3}", Date.prototype.setMilliseconds, "milliseconds", function() {
                        return w(Date.prototype.getMilliseconds.call(this), 3);
                    } ],
                    L: [ "[0-9]{2}", Date.prototype.setMilliseconds, "milliseconds", function() {
                        return w(Date.prototype.getMilliseconds.call(this), 2);
                    } ],
                    t: [ "[ap]", y, "ampm", b, 1 ],
                    tt: [ "[ap]m", y, "ampm", b, 2 ],
                    T: [ "[AP]", y, "ampm", b, 1 ],
                    TT: [ "[AP]M", y, "ampm", b, 2 ],
                    Z: [ ".*", void 0, "Z", function() {
                        var e = this.toString().match(/\((.+)\)/)[1];
                        e.includes(" ") && (e = (e = e.replace("-", " ").toUpperCase()).split(" ").map((function(e) {
                            return u(e, 1)[0];
                        })).join(""));
                        return e;
                    } ],
                    o: [ "" ],
                    S: [ "" ]
                }, k = {
                    isoDate: "yyyy-mm-dd",
                    isoTime: "HH:MM:ss",
                    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
                    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
                };
                function y(e) {
                    var t = this.getHours();
                    e.toLowerCase().includes("p") ? this.setHours(t + 12) : e.toLowerCase().includes("a") && t >= 12 && this.setHours(t - 12);
                }
                function b() {
                    var e = this.getHours();
                    return (e = e || 12) >= 12 ? "PM" : "AM";
                }
                function x(e) {
                    var t = new RegExp("\\d+$").exec(e[0]);
                    if (t && void 0 !== t[0]) {
                        var i = g[e[0][0] + "x"].slice("");
                        return i[0] = i[0](t[0]), i[3] = i[3](t[0]), i;
                    }
                    if (g[e[0]]) return g[e[0]];
                }
                function P(e) {
                    if (!e.tokenizer) {
                        var t = [], i = [];
                        for (var a in g) if (/\.*x$/.test(a)) {
                            var n = a[0] + "\\d+";
                            -1 === i.indexOf(n) && i.push(n);
                        } else -1 === t.indexOf(a[0]) && t.push(a[0]);
                        e.tokenizer = "(" + (i.length > 0 ? i.join("|") + "|" : "") + t.join("+|") + ")+?|.", 
                        e.tokenizer = new RegExp(e.tokenizer, "g");
                    }
                    return e.tokenizer;
                }
                function E(e, t, i) {
                    if (!v) return !0;
                    if (void 0 === e.rawday || !isFinite(e.rawday) && new Date(e.date.getFullYear(), isFinite(e.rawmonth) ? e.month : e.date.getMonth() + 1, 0).getDate() >= e.day || "29" == e.day && (!isFinite(e.rawyear) || void 0 === e.rawyear || "" === e.rawyear) || new Date(e.date.getFullYear(), isFinite(e.rawmonth) ? e.month : e.date.getMonth() + 1, 0).getDate() >= e.day) return t;
                    if ("29" == e.day) {
                        var a = O(t.pos, i);
                        if ("yyyy" === a.targetMatch[0] && t.pos - a.targetMatchIndex == 2) return t.remove = t.pos + 1, 
                        t;
                    } else if ("02" == e.month && "30" == e.day && void 0 !== t.c) return e.day = "03", 
                    e.date.setDate(3), e.date.setMonth(1), t.insert = [ {
                        pos: t.pos,
                        c: "0"
                    }, {
                        pos: t.pos + 1,
                        c: t.c
                    } ], t.caret = o.seekNext.call(this, t.pos + 1), t;
                    return !1;
                }
                function S(e, t, i, a) {
                    var n, o, s = "";
                    for (P(i).lastIndex = 0; n = P(i).exec(e); ) {
                        if (void 0 === t) if (o = x(n)) s += "(" + o[0] + ")"; else switch (n[0]) {
                          case "[":
                            s += "(";
                            break;

                          case "]":
                            s += ")?";
                            break;

                          default:
                            s += (0, r.default)(n[0]);
                        } else if (o = x(n)) if (!0 !== a && o[3]) s += o[3].call(t.date); else o[2] ? s += t["raw" + o[2]] : s += n[0]; else s += n[0];
                    }
                    return s;
                }
                function w(e, t, i) {
                    for (e = String(e), t = t || 2; e.length < t; ) e = i ? e + "0" : "0" + e;
                    return e;
                }
                function _(e, t, i) {
                    return "string" == typeof e ? new h(e, t, i) : e && "object" === l(e) && Object.prototype.hasOwnProperty.call(e, "date") ? e : void 0;
                }
                function M(e, t) {
                    return S(t.inputFormat, {
                        date: e
                    }, t);
                }
                function O(e, t) {
                    var i, a, n = 0, r = 0;
                    for (P(t).lastIndex = 0; a = P(t).exec(t.inputFormat); ) {
                        var o = new RegExp("\\d+$").exec(a[0]);
                        if ((n += r = o ? parseInt(o[0]) : a[0].length) >= e + 1) {
                            i = a, a = P(t).exec(t.inputFormat);
                            break;
                        }
                    }
                    return {
                        targetMatchIndex: n - r,
                        nextMatch: a,
                        targetMatch: i
                    };
                }
                a.default.extendAliases({
                    datetime: {
                        mask: function(e) {
                            return e.numericInput = !1, g.S = e.i18n.ordinalSuffix.join("|"), e.inputFormat = k[e.inputFormat] || e.inputFormat, 
                            e.displayFormat = k[e.displayFormat] || e.displayFormat || e.inputFormat, e.outputFormat = k[e.outputFormat] || e.outputFormat || e.inputFormat, 
                            e.placeholder = "" !== e.placeholder ? e.placeholder : e.inputFormat.replace(/[[\]]/, ""), 
                            e.regex = S(e.inputFormat, void 0, e), e.min = _(e.min, e.inputFormat, e), e.max = _(e.max, e.inputFormat, e), 
                            null;
                        },
                        placeholder: "",
                        inputFormat: "isoDateTime",
                        displayFormat: null,
                        outputFormat: null,
                        min: null,
                        max: null,
                        skipOptionalPartCharacter: "",
                        i18n: {
                            dayNames: [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
                            monthNames: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                            ordinalSuffix: [ "st", "nd", "rd", "th" ]
                        },
                        preValidation: function(e, t, i, a, n, r, o, s) {
                            if (s) return !0;
                            if (isNaN(i) && e[t] !== i) {
                                var l = O(t, n);
                                if (l.nextMatch && l.nextMatch[0] === i && l.targetMatch[0].length > 1) {
                                    var u = g[l.targetMatch[0]][0];
                                    if (new RegExp(u).test("0" + e[t - 1])) return e[t] = e[t - 1], e[t - 1] = "0", 
                                    {
                                        fuzzy: !0,
                                        buffer: e,
                                        refreshFromBuffer: {
                                            start: t - 1,
                                            end: t + 1
                                        },
                                        pos: t + 1
                                    };
                                }
                            }
                            return !0;
                        },
                        postValidation: function(e, t, i, a, n, r, o, l) {
                            var u, c;
                            if (o) return !0;
                            if (!1 === a && (((u = O(t + 1, n)).targetMatch && u.targetMatchIndex === t && u.targetMatch[0].length > 1 && void 0 !== g[u.targetMatch[0]] || (u = O(t + 2, n)).targetMatch && u.targetMatchIndex === t + 1 && u.targetMatch[0].length > 1 && void 0 !== g[u.targetMatch[0]]) && (c = g[u.targetMatch[0]][0]), 
                            void 0 !== c && (void 0 !== r.validPositions[t + 1] && new RegExp(c).test(i + "0") ? (e[t] = i, 
                            e[t + 1] = "0", a = {
                                pos: t + 2,
                                caret: t
                            }) : new RegExp(c).test("0" + i) && (e[t] = "0", e[t + 1] = i, a = {
                                pos: t + 2
                            })), !1 === a)) return a;
                            if (a.fuzzy && (e = a.buffer, t = a.pos), (u = O(t, n)).targetMatch && u.targetMatch[0] && void 0 !== g[u.targetMatch[0]]) {
                                var f = g[u.targetMatch[0]];
                                c = f[0];
                                var d = e.slice(u.targetMatchIndex, u.targetMatchIndex + u.targetMatch[0].length);
                                if (!1 === new RegExp(c).test(d.join("")) && 2 === u.targetMatch[0].length && r.validPositions[u.targetMatchIndex] && r.validPositions[u.targetMatchIndex + 1] && (r.validPositions[u.targetMatchIndex + 1].input = "0"), 
                                "year" == f[2]) for (var p = s.getMaskTemplate.call(this, !1, 1, void 0, !0), h = t + 1; h < e.length; h++) e[h] = p[h], 
                                delete r.validPositions[h];
                            }
                            var v = a, k = _(e.join(""), n.inputFormat, n);
                            return v && k.date.getTime() == k.date.getTime() && (n.prefillYear && (v = function(e, t, i) {
                                if (e.year !== e.rawyear) {
                                    var a = m.toString(), n = e.rawyear.replace(/[^0-9]/g, ""), r = a.slice(0, n.length), o = a.slice(n.length);
                                    if (2 === n.length && n === r) {
                                        var s = new Date(m, e.month - 1, e.day);
                                        e.day == s.getDate() && (!i.max || i.max.date.getTime() >= s.getTime()) && (e.date.setFullYear(m), 
                                        e.year = a, t.insert = [ {
                                            pos: t.pos + 1,
                                            c: o[0]
                                        }, {
                                            pos: t.pos + 2,
                                            c: o[1]
                                        } ]);
                                    }
                                }
                                return t;
                            }(k, v, n)), v = function(e, t, i, a, n) {
                                if (!t) return t;
                                if (t && i.min && i.min.date.getTime() == i.min.date.getTime()) {
                                    var r;
                                    for (e.reset(), P(i).lastIndex = 0; r = P(i).exec(i.inputFormat); ) {
                                        var o;
                                        if ((o = x(r)) && o[3]) {
                                            for (var s = o[1], l = e[o[2]], u = i.min[o[2]], c = i.max ? i.max[o[2]] : u, f = [], d = !1, p = 0; p < u.length; p++) void 0 !== a.validPositions[p + r.index] || d ? (f[p] = l[p], 
                                            d = d || l[p] > u[p]) : (f[p] = u[p], "year" === o[2] && l.length - 1 == p && u != c && (f = (parseInt(f.join("")) + 1).toString().split("")), 
                                            "ampm" === o[2] && u != c && i.min.date.getTime() > e.date.getTime() && (f[p] = c[p]));
                                            s.call(e._date, f.join(""));
                                        }
                                    }
                                    t = i.min.date.getTime() <= e.date.getTime(), e.reInit();
                                }
                                return t && i.max && i.max.date.getTime() == i.max.date.getTime() && (t = i.max.date.getTime() >= e.date.getTime()), 
                                t;
                            }(k, v = E.call(this, k, v, n), n, r)), void 0 !== t && v && a.pos !== t ? {
                                buffer: S(n.inputFormat, k, n).split(""),
                                refreshFromBuffer: {
                                    start: t,
                                    end: a.pos
                                },
                                pos: a.caret || a.pos
                            } : v;
                        },
                        onKeyDown: function(e, t, i, a) {
                            e.ctrlKey && e.keyCode === n.default.RIGHT && (this.inputmask._valueSet(M(new Date, a)), 
                            p(this).trigger("setvalue"));
                        },
                        onUnMask: function(e, t, i) {
                            return t ? S(i.outputFormat, _(e, i.inputFormat, i), i, !0) : t;
                        },
                        casing: function(e, t, i, a) {
                            return 0 == t.nativeDef.indexOf("[ap]") ? e.toLowerCase() : 0 == t.nativeDef.indexOf("[AP]") ? e.toUpperCase() : e;
                        },
                        onBeforeMask: function(e, t) {
                            return "[object Date]" === Object.prototype.toString.call(e) && (e = M(e, t)), e;
                        },
                        insertMode: !1,
                        shiftPositions: !1,
                        keepStatic: !1,
                        inputmode: "numeric",
                        prefillYear: !0
                    }
                });
            },
            3851: function(e, t, i) {
                var a, n = (a = i(2394)) && a.__esModule ? a : {
                    default: a
                }, r = i(8711), o = i(4713);
                n.default.extendDefinitions({
                    A: {
                        validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                        casing: "upper"
                    },
                    "&": {
                        validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                        casing: "upper"
                    },
                    "#": {
                        validator: "[0-9A-Fa-f]",
                        casing: "upper"
                    }
                });
                var s = new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]");
                function l(e, t, i, a, n) {
                    return i - 1 > -1 && "." !== t.buffer[i - 1] ? (e = t.buffer[i - 1] + e, e = i - 2 > -1 && "." !== t.buffer[i - 2] ? t.buffer[i - 2] + e : "0" + e) : e = "00" + e, 
                    s.test(e);
                }
                n.default.extendAliases({
                    cssunit: {
                        regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"
                    },
                    url: {
                        regex: "(https?|ftp)://.*",
                        autoUnmask: !1,
                        keepStatic: !1,
                        tabThrough: !0
                    },
                    ip: {
                        mask: "i{1,3}.j{1,3}.k{1,3}.l{1,3}",
                        definitions: {
                            i: {
                                validator: l
                            },
                            j: {
                                validator: l
                            },
                            k: {
                                validator: l
                            },
                            l: {
                                validator: l
                            }
                        },
                        onUnMask: function(e, t, i) {
                            return e;
                        },
                        inputmode: "decimal",
                        substitutes: {
                            ",": "."
                        }
                    },
                    email: {
                        mask: function(e) {
                            var t = "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]", i = t;
                            if (e.separator) for (var a = 0; a < e.quantifier; a++) i += "[".concat(e.separator).concat(t, "]");
                            return i;
                        },
                        greedy: !1,
                        casing: "lower",
                        separator: null,
                        quantifier: 5,
                        skipOptionalPartCharacter: "",
                        onBeforePaste: function(e, t) {
                            return (e = e.toLowerCase()).replace("mailto:", "");
                        },
                        definitions: {
                            "*": {
                                validator: "[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5!#$%&'*+/=?^_`{|}~-]"
                            },
                            "-": {
                                validator: "[0-9A-Za-z-]"
                            }
                        },
                        onUnMask: function(e, t, i) {
                            return e;
                        },
                        inputmode: "email"
                    },
                    mac: {
                        mask: "##:##:##:##:##:##"
                    },
                    vin: {
                        mask: "V{13}9{4}",
                        definitions: {
                            V: {
                                validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
                                casing: "upper"
                            }
                        },
                        clearIncomplete: !0,
                        autoUnmask: !0
                    },
                    ssn: {
                        mask: "999-99-9999",
                        postValidation: function(e, t, i, a, n, s, l) {
                            var u = o.getMaskTemplate.call(this, !0, r.getLastValidPosition.call(this), !0, !0);
                            return /^(?!219-09-9999|078-05-1120)(?!666|000|9.{2}).{3}-(?!00).{2}-(?!0{4}).{4}$/.test(u.join(""));
                        }
                    }
                });
            },
            207: function(e, t, i) {
                var a = s(i(2394)), n = s(i(5581)), r = s(i(7184)), o = i(8711);
                function s(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
                var l = a.default.dependencyLib;
                function u(e, t) {
                    for (var i = "", n = 0; n < e.length; n++) a.default.prototype.definitions[e.charAt(n)] || t.definitions[e.charAt(n)] || t.optionalmarker[0] === e.charAt(n) || t.optionalmarker[1] === e.charAt(n) || t.quantifiermarker[0] === e.charAt(n) || t.quantifiermarker[1] === e.charAt(n) || t.groupmarker[0] === e.charAt(n) || t.groupmarker[1] === e.charAt(n) || t.alternatormarker === e.charAt(n) ? i += "\\" + e.charAt(n) : i += e.charAt(n);
                    return i;
                }
                function c(e, t, i, a) {
                    if (e.length > 0 && t > 0 && (!i.digitsOptional || a)) {
                        var n = e.indexOf(i.radixPoint), r = !1;
                        i.negationSymbol.back === e[e.length - 1] && (r = !0, e.length--), -1 === n && (e.push(i.radixPoint), 
                        n = e.length - 1);
                        for (var o = 1; o <= t; o++) isFinite(e[n + o]) || (e[n + o] = "0");
                    }
                    return r && e.push(i.negationSymbol.back), e;
                }
                function f(e, t) {
                    var i = 0;
                    if ("+" === e) {
                        for (i in t.validPositions) ;
                        i = o.seekNext.call(this, parseInt(i));
                    }
                    for (var a in t.tests) if ((a = parseInt(a)) >= i) for (var n = 0, r = t.tests[a].length; n < r; n++) if ((void 0 === t.validPositions[a] || "-" === e) && t.tests[a][n].match.def === e) return a + (void 0 !== t.validPositions[a] && "-" !== e ? 1 : 0);
                    return i;
                }
                function d(e, t) {
                    var i = -1;
                    for (var a in t.validPositions) {
                        var n = t.validPositions[a];
                        if (n && n.match.def === e) {
                            i = parseInt(a);
                            break;
                        }
                    }
                    return i;
                }
                function p(e, t, i, a, n) {
                    var r = t.buffer ? t.buffer.indexOf(n.radixPoint) : -1, o = (-1 !== r || a && n.jitMasking) && new RegExp(n.definitions[9].validator).test(e);
                    return n._radixDance && -1 !== r && o && null == t.validPositions[r] ? {
                        insert: {
                            pos: r === i ? r + 1 : r,
                            c: n.radixPoint
                        },
                        pos: i
                    } : o;
                }
                a.default.extendAliases({
                    numeric: {
                        mask: function(e) {
                            e.repeat = 0, e.groupSeparator === e.radixPoint && e.digits && "0" !== e.digits && ("." === e.radixPoint ? e.groupSeparator = "," : "," === e.radixPoint ? e.groupSeparator = "." : e.groupSeparator = ""), 
                            " " === e.groupSeparator && (e.skipOptionalPartCharacter = void 0), e.placeholder.length > 1 && (e.placeholder = e.placeholder.charAt(0)), 
                            "radixFocus" === e.positionCaretOnClick && "" === e.placeholder && (e.positionCaretOnClick = "lvp");
                            var t = "0", i = e.radixPoint;
                            !0 === e.numericInput && void 0 === e.__financeInput ? (t = "1", e.positionCaretOnClick = "radixFocus" === e.positionCaretOnClick ? "lvp" : e.positionCaretOnClick, 
                            e.digitsOptional = !1, isNaN(e.digits) && (e.digits = 2), e._radixDance = !1, i = "," === e.radixPoint ? "?" : "!", 
                            "" !== e.radixPoint && void 0 === e.definitions[i] && (e.definitions[i] = {}, e.definitions[i].validator = "[" + e.radixPoint + "]", 
                            e.definitions[i].placeholder = e.radixPoint, e.definitions[i].static = !0, e.definitions[i].generated = !0)) : (e.__financeInput = !1, 
                            e.numericInput = !0);
                            var a, n = "[+]";
                            if (n += u(e.prefix, e), "" !== e.groupSeparator ? (void 0 === e.definitions[e.groupSeparator] && (e.definitions[e.groupSeparator] = {}, 
                            e.definitions[e.groupSeparator].validator = "[" + e.groupSeparator + "]", e.definitions[e.groupSeparator].placeholder = e.groupSeparator, 
                            e.definitions[e.groupSeparator].static = !0, e.definitions[e.groupSeparator].generated = !0), 
                            n += e._mask(e)) : n += "9{+}", void 0 !== e.digits && 0 !== e.digits) {
                                var o = e.digits.toString().split(",");
                                isFinite(o[0]) && o[1] && isFinite(o[1]) ? n += i + t + "{" + e.digits + "}" : (isNaN(e.digits) || parseInt(e.digits) > 0) && (e.digitsOptional || e.jitMasking ? (a = n + i + t + "{0," + e.digits + "}", 
                                e.keepStatic = !0) : n += i + t + "{" + e.digits + "}");
                            } else e.inputmode = "numeric";
                            return n += u(e.suffix, e), n += "[-]", a && (n = [ a + u(e.suffix, e) + "[-]", n ]), 
                            e.greedy = !1, function(e) {
                                void 0 === e.parseMinMaxOptions && (null !== e.min && (e.min = e.min.toString().replace(new RegExp((0, 
                                r.default)(e.groupSeparator), "g"), ""), "," === e.radixPoint && (e.min = e.min.replace(e.radixPoint, ".")), 
                                e.min = isFinite(e.min) ? parseFloat(e.min) : NaN, isNaN(e.min) && (e.min = Number.MIN_VALUE)), 
                                null !== e.max && (e.max = e.max.toString().replace(new RegExp((0, r.default)(e.groupSeparator), "g"), ""), 
                                "," === e.radixPoint && (e.max = e.max.replace(e.radixPoint, ".")), e.max = isFinite(e.max) ? parseFloat(e.max) : NaN, 
                                isNaN(e.max) && (e.max = Number.MAX_VALUE)), e.parseMinMaxOptions = "done");
                            }(e), "" !== e.radixPoint && (e.substitutes["." == e.radixPoint ? "," : "."] = e.radixPoint), 
                            n;
                        },
                        _mask: function(e) {
                            return "(" + e.groupSeparator + "999){+|1}";
                        },
                        digits: "*",
                        digitsOptional: !0,
                        enforceDigitsOnBlur: !1,
                        radixPoint: ".",
                        positionCaretOnClick: "radixFocus",
                        _radixDance: !0,
                        groupSeparator: "",
                        allowMinus: !0,
                        negationSymbol: {
                            front: "-",
                            back: ""
                        },
                        prefix: "",
                        suffix: "",
                        min: null,
                        max: null,
                        SetMaxOnOverflow: !1,
                        step: 1,
                        inputType: "text",
                        unmaskAsNumber: !1,
                        roundingFN: Math.round,
                        inputmode: "decimal",
                        shortcuts: {
                            k: "1000",
                            m: "1000000"
                        },
                        placeholder: "0",
                        greedy: !1,
                        rightAlign: !0,
                        insertMode: !0,
                        autoUnmask: !1,
                        skipOptionalPartCharacter: "",
                        usePrototypeDefinitions: !1,
                        stripLeadingZeroes: !0,
                        definitions: {
                            0: {
                                validator: p
                            },
                            1: {
                                validator: p,
                                definitionSymbol: "9"
                            },
                            9: {
                                validator: "[0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]",
                                definitionSymbol: "*"
                            },
                            "+": {
                                validator: function(e, t, i, a, n) {
                                    return n.allowMinus && ("-" === e || e === n.negationSymbol.front);
                                }
                            },
                            "-": {
                                validator: function(e, t, i, a, n) {
                                    return n.allowMinus && e === n.negationSymbol.back;
                                }
                            }
                        },
                        preValidation: function(e, t, i, a, n, r, o, s) {
                            if (!1 !== n.__financeInput && i === n.radixPoint) return !1;
                            var l = e.indexOf(n.radixPoint), u = t;
                            if (t = function(e, t, i, a, n) {
                                return n._radixDance && n.numericInput && t !== n.negationSymbol.back && e <= i && (i > 0 || t == n.radixPoint) && (void 0 === a.validPositions[e - 1] || a.validPositions[e - 1].input !== n.negationSymbol.back) && (e -= 1), 
                                e;
                            }(t, i, l, r, n), "-" === i || i === n.negationSymbol.front) {
                                if (!0 !== n.allowMinus) return !1;
                                var c = !1, p = d("+", r), h = d("-", r);
                                return -1 !== p && (c = [ p, h ]), !1 !== c ? {
                                    remove: c,
                                    caret: u - n.negationSymbol.back.length
                                } : {
                                    insert: [ {
                                        pos: f.call(this, "+", r),
                                        c: n.negationSymbol.front,
                                        fromIsValid: !0
                                    }, {
                                        pos: f.call(this, "-", r),
                                        c: n.negationSymbol.back,
                                        fromIsValid: void 0
                                    } ],
                                    caret: u + n.negationSymbol.back.length
                                };
                            }
                            if (i === n.groupSeparator) return {
                                caret: u
                            };
                            if (s) return !0;
                            if (-1 !== l && !0 === n._radixDance && !1 === a && i === n.radixPoint && void 0 !== n.digits && (isNaN(n.digits) || parseInt(n.digits) > 0) && l !== t) return {
                                caret: n._radixDance && t === l - 1 ? l + 1 : l
                            };
                            if (!1 === n.__financeInput) if (a) {
                                if (n.digitsOptional) return {
                                    rewritePosition: o.end
                                };
                                if (!n.digitsOptional) {
                                    if (o.begin > l && o.end <= l) return i === n.radixPoint ? {
                                        insert: {
                                            pos: l + 1,
                                            c: "0",
                                            fromIsValid: !0
                                        },
                                        rewritePosition: l
                                    } : {
                                        rewritePosition: l + 1
                                    };
                                    if (o.begin < l) return {
                                        rewritePosition: o.begin - 1
                                    };
                                }
                            } else if (!n.showMaskOnHover && !n.showMaskOnFocus && !n.digitsOptional && n.digits > 0 && "" === this.__valueGet.call(this.el)) return {
                                rewritePosition: l
                            };
                            return {
                                rewritePosition: t
                            };
                        },
                        postValidation: function(e, t, i, a, n, r, o) {
                            if (!1 === a) return a;
                            if (o) return !0;
                            if (null !== n.min || null !== n.max) {
                                var s = n.onUnMask(e.slice().reverse().join(""), void 0, l.extend({}, n, {
                                    unmaskAsNumber: !0
                                }));
                                if (null !== n.min && s < n.min && (s.toString().length > n.min.toString().length || s < 0)) return !1;
                                if (null !== n.max && s > n.max) return !!n.SetMaxOnOverflow && {
                                    refreshFromBuffer: !0,
                                    buffer: c(n.max.toString().replace(".", n.radixPoint).split(""), n.digits, n).reverse()
                                };
                            }
                            return a;
                        },
                        onUnMask: function(e, t, i) {
                            if ("" === t && !0 === i.nullable) return t;
                            var a = e.replace(i.prefix, "");
                            return a = (a = a.replace(i.suffix, "")).replace(new RegExp((0, r.default)(i.groupSeparator), "g"), ""), 
                            "" !== i.placeholder.charAt(0) && (a = a.replace(new RegExp(i.placeholder.charAt(0), "g"), "0")), 
                            i.unmaskAsNumber ? ("" !== i.radixPoint && -1 !== a.indexOf(i.radixPoint) && (a = a.replace(r.default.call(this, i.radixPoint), ".")), 
                            a = (a = a.replace(new RegExp("^" + (0, r.default)(i.negationSymbol.front)), "-")).replace(new RegExp((0, 
                            r.default)(i.negationSymbol.back) + "$"), ""), Number(a)) : a;
                        },
                        isComplete: function(e, t) {
                            var i = (t.numericInput ? e.slice().reverse() : e).join("");
                            return i = (i = (i = (i = (i = i.replace(new RegExp("^" + (0, r.default)(t.negationSymbol.front)), "-")).replace(new RegExp((0, 
                            r.default)(t.negationSymbol.back) + "$"), "")).replace(t.prefix, "")).replace(t.suffix, "")).replace(new RegExp((0, 
                            r.default)(t.groupSeparator) + "([0-9]{3})", "g"), "$1"), "," === t.radixPoint && (i = i.replace((0, 
                            r.default)(t.radixPoint), ".")), isFinite(i);
                        },
                        onBeforeMask: function(e, t) {
                            var i = t.radixPoint || ",";
                            isFinite(t.digits) && (t.digits = parseInt(t.digits)), "number" != typeof e && "number" !== t.inputType || "" === i || (e = e.toString().replace(".", i));
                            var a = "-" === e.charAt(0) || e.charAt(0) === t.negationSymbol.front, n = e.split(i), o = n[0].replace(/[^\-0-9]/g, ""), s = n.length > 1 ? n[1].replace(/[^0-9]/g, "") : "", l = n.length > 1;
                            e = o + ("" !== s ? i + s : s);
                            var u = 0;
                            if ("" !== i && (u = t.digitsOptional ? t.digits < s.length ? t.digits : s.length : t.digits, 
                            "" !== s || !t.digitsOptional)) {
                                var f = Math.pow(10, u || 1);
                                e = e.replace((0, r.default)(i), "."), isNaN(parseFloat(e)) || (e = (t.roundingFN(parseFloat(e) * f) / f).toFixed(u)), 
                                e = e.toString().replace(".", i);
                            }
                            if (0 === t.digits && -1 !== e.indexOf(i) && (e = e.substring(0, e.indexOf(i))), 
                            null !== t.min || null !== t.max) {
                                var d = e.toString().replace(i, ".");
                                null !== t.min && d < t.min ? e = t.min.toString().replace(".", i) : null !== t.max && d > t.max && (e = t.max.toString().replace(".", i));
                            }
                            return a && "-" !== e.charAt(0) && (e = "-" + e), c(e.toString().split(""), u, t, l).join("");
                        },
                        onBeforeWrite: function(e, t, i, a) {
                            function n(e, t) {
                                if (!1 !== a.__financeInput || t) {
                                    var i = e.indexOf(a.radixPoint);
                                    -1 !== i && e.splice(i, 1);
                                }
                                if ("" !== a.groupSeparator) for (;-1 !== (i = e.indexOf(a.groupSeparator)); ) e.splice(i, 1);
                                return e;
                            }
                            var o, s;
                            if (a.stripLeadingZeroes && (s = function(e, t) {
                                var i = new RegExp("(^" + ("" !== t.negationSymbol.front ? (0, r.default)(t.negationSymbol.front) + "?" : "") + (0, 
                                r.default)(t.prefix) + ")(.*)(" + (0, r.default)(t.suffix) + ("" != t.negationSymbol.back ? (0, 
                                r.default)(t.negationSymbol.back) + "?" : "") + "$)").exec(e.slice().reverse().join("")), a = i ? i[2] : "", n = !1;
                                return a && (a = a.split(t.radixPoint.charAt(0))[0], n = new RegExp("^[0" + t.groupSeparator + "]*").exec(a)), 
                                !(!n || !(n[0].length > 1 || n[0].length > 0 && n[0].length < a.length)) && n;
                            }(t, a))) for (var u = t.join("").lastIndexOf(s[0].split("").reverse().join("")) - (s[0] == s.input ? 0 : 1), f = s[0] == s.input ? 1 : 0, d = s[0].length - f; d > 0; d--) delete this.maskset.validPositions[u + d], 
                            delete t[u + d];
                            if (e) switch (e.type) {
                              case "blur":
                              case "checkval":
                                if (null !== a.min) {
                                    var p = a.onUnMask(t.slice().reverse().join(""), void 0, l.extend({}, a, {
                                        unmaskAsNumber: !0
                                    }));
                                    if (null !== a.min && p < a.min) return {
                                        refreshFromBuffer: !0,
                                        buffer: c(a.min.toString().replace(".", a.radixPoint).split(""), a.digits, a).reverse()
                                    };
                                }
                                if (t[t.length - 1] === a.negationSymbol.front) {
                                    var h = new RegExp("(^" + ("" != a.negationSymbol.front ? (0, r.default)(a.negationSymbol.front) + "?" : "") + (0, 
                                    r.default)(a.prefix) + ")(.*)(" + (0, r.default)(a.suffix) + ("" != a.negationSymbol.back ? (0, 
                                    r.default)(a.negationSymbol.back) + "?" : "") + "$)").exec(n(t.slice(), !0).reverse().join(""));
                                    0 == (h ? h[2] : "") && (o = {
                                        refreshFromBuffer: !0,
                                        buffer: [ 0 ]
                                    });
                                } else if ("" !== a.radixPoint) {
                                    t.indexOf(a.radixPoint) === a.suffix.length && (o && o.buffer ? o.buffer.splice(0, 1 + a.suffix.length) : (t.splice(0, 1 + a.suffix.length), 
                                    o = {
                                        refreshFromBuffer: !0,
                                        buffer: n(t)
                                    }));
                                }
                                if (a.enforceDigitsOnBlur) {
                                    var m = (o = o || {}) && o.buffer || t.slice().reverse();
                                    o.refreshFromBuffer = !0, o.buffer = c(m, a.digits, a, !0).reverse();
                                }
                            }
                            return o;
                        },
                        onKeyDown: function(e, t, i, a) {
                            var r, o, s = l(this), u = String.fromCharCode(e.keyCode).toLowerCase();
                            if ((o = a.shortcuts && a.shortcuts[u]) && o.length > 1) return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) * parseInt(o)), 
                            s.trigger("setvalue"), !1;
                            if (e.ctrlKey) switch (e.keyCode) {
                              case n.default.UP:
                                return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) + parseInt(a.step)), 
                                s.trigger("setvalue"), !1;

                              case n.default.DOWN:
                                return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) - parseInt(a.step)), 
                                s.trigger("setvalue"), !1;
                            }
                            if (!e.shiftKey && (e.keyCode === n.default.DELETE || e.keyCode === n.default.BACKSPACE || e.keyCode === n.default.BACKSPACE_SAFARI) && i.begin !== t.length) {
                                if (t[e.keyCode === n.default.DELETE ? i.begin - 1 : i.end] === a.negationSymbol.front) return r = t.slice().reverse(), 
                                "" !== a.negationSymbol.front && r.shift(), "" !== a.negationSymbol.back && r.pop(), 
                                s.trigger("setvalue", [ r.join(""), i.begin ]), !1;
                                if (!0 === a._radixDance) {
                                    var f = t.indexOf(a.radixPoint);
                                    if (a.digitsOptional) {
                                        if (0 === f) return (r = t.slice().reverse()).pop(), s.trigger("setvalue", [ r.join(""), i.begin >= r.length ? r.length : i.begin ]), 
                                        !1;
                                    } else if (-1 !== f && (i.begin < f || i.end < f || e.keyCode === n.default.DELETE && i.begin === f)) return i.begin !== i.end || e.keyCode !== n.default.BACKSPACE && e.keyCode !== n.default.BACKSPACE_SAFARI || i.begin++, 
                                    (r = t.slice().reverse()).splice(r.length - i.begin, i.begin - i.end + 1), r = c(r, a.digits, a).join(""), 
                                    s.trigger("setvalue", [ r, i.begin >= r.length ? f + 1 : i.begin ]), !1;
                                }
                            }
                        }
                    },
                    currency: {
                        prefix: "",
                        groupSeparator: ",",
                        alias: "numeric",
                        digits: 2,
                        digitsOptional: !1
                    },
                    decimal: {
                        alias: "numeric"
                    },
                    integer: {
                        alias: "numeric",
                        inputmode: "numeric",
                        digits: 0
                    },
                    percentage: {
                        alias: "numeric",
                        min: 0,
                        max: 100,
                        suffix: " %",
                        digits: 0,
                        allowMinus: !1
                    },
                    indianns: {
                        alias: "numeric",
                        _mask: function(e) {
                            return "(" + e.groupSeparator + "99){*|1}(" + e.groupSeparator + "999){1|1}";
                        },
                        groupSeparator: ",",
                        radixPoint: ".",
                        placeholder: "0",
                        digits: 2,
                        digitsOptional: !1
                    }
                });
            },
            9380: function(e, t, i) {
                var a;
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.default = void 0;
                var n = ((a = i(8741)) && a.__esModule ? a : {
                    default: a
                }).default ? window : {};
                t.default = n;
            },
            7760: function(e, t, i) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.HandleNativePlaceholder = function(e, t) {
                    var i = e ? e.inputmask : this;
                    if (l.ie) {
                        if (e.inputmask._valueGet() !== t && (e.placeholder !== t || "" === e.placeholder)) {
                            var a = o.getBuffer.call(i).slice(), n = e.inputmask._valueGet();
                            if (n !== t) {
                                var r = o.getLastValidPosition.call(i);
                                -1 === r && n === o.getBufferTemplate.call(i).join("") ? a = [] : -1 !== r && f.call(i, a), 
                                p(e, a);
                            }
                        }
                    } else e.placeholder !== t && (e.placeholder = t, "" === e.placeholder && e.removeAttribute("placeholder"));
                }, t.applyInputValue = c, t.checkVal = d, t.clearOptionalTail = f, t.unmaskedvalue = function(e) {
                    var t = e ? e.inputmask : this, i = t.opts, a = t.maskset;
                    if (e) {
                        if (void 0 === e.inputmask) return e.value;
                        e.inputmask && e.inputmask.refreshValue && c(e, e.inputmask._valueGet(!0));
                    }
                    var n = [], r = a.validPositions;
                    for (var s in r) r[s] && r[s].match && (1 != r[s].match.static || Array.isArray(a.metadata) && !0 !== r[s].generatedInput) && n.push(r[s].input);
                    var l = 0 === n.length ? "" : (t.isRTL ? n.reverse() : n).join("");
                    if ("function" == typeof i.onUnMask) {
                        var u = (t.isRTL ? o.getBuffer.call(t).slice().reverse() : o.getBuffer.call(t)).join("");
                        l = i.onUnMask.call(t, u, l, i);
                    }
                    return l;
                }, t.writeBuffer = p;
                var a, n = (a = i(5581)) && a.__esModule ? a : {
                    default: a
                }, r = i(4713), o = i(8711), s = i(7215), l = i(9845), u = i(6030);
                function c(e, t) {
                    var i = e ? e.inputmask : this, a = i.opts;
                    e.inputmask.refreshValue = !1, "function" == typeof a.onBeforeMask && (t = a.onBeforeMask.call(i, t, a) || t), 
                    d(e, !0, !1, t = t.toString().split("")), i.undoValue = i._valueGet(!0), (a.clearMaskOnLostFocus || a.clearIncomplete) && e.inputmask._valueGet() === o.getBufferTemplate.call(i).join("") && -1 === o.getLastValidPosition.call(i) && e.inputmask._valueSet("");
                }
                function f(e) {
                    e.length = 0;
                    for (var t, i = r.getMaskTemplate.call(this, !0, 0, !0, void 0, !0); void 0 !== (t = i.shift()); ) e.push(t);
                    return e;
                }
                function d(e, t, i, a, n) {
                    var l = e ? e.inputmask : this, c = l.maskset, f = l.opts, d = l.dependencyLib, h = a.slice(), m = "", v = -1, g = void 0, k = f.skipOptionalPartCharacter;
                    f.skipOptionalPartCharacter = "", o.resetMaskSet.call(l), c.tests = {}, v = f.radixPoint ? o.determineNewCaretPosition.call(l, {
                        begin: 0,
                        end: 0
                    }, !1, !1 === f.__financeInput ? "radixFocus" : void 0).begin : 0, c.p = v, l.caretPos = {
                        begin: v
                    };
                    var y = [], b = l.caretPos;
                    if (h.forEach((function(e, t) {
                        if (void 0 !== e) {
                            var a = new d.Event("_checkval");
                            a.keyCode = e.toString().charCodeAt(0), m += e;
                            var n = o.getLastValidPosition.call(l, void 0, !0);
                            !function(e, t) {
                                for (var i = r.getMaskTemplate.call(l, !0, 0).slice(e, o.seekNext.call(l, e, !1, !1)).join("").replace(/'/g, ""), a = i.indexOf(t); a > 0 && " " === i[a - 1]; ) a--;
                                var n = 0 === a && !o.isMask.call(l, e) && (r.getTest.call(l, e).match.nativeDef === t.charAt(0) || !0 === r.getTest.call(l, e).match.static && r.getTest.call(l, e).match.nativeDef === "'" + t.charAt(0) || " " === r.getTest.call(l, e).match.nativeDef && (r.getTest.call(l, e + 1).match.nativeDef === t.charAt(0) || !0 === r.getTest.call(l, e + 1).match.static && r.getTest.call(l, e + 1).match.nativeDef === "'" + t.charAt(0)));
                                if (!n && a > 0 && !o.isMask.call(l, e, !1, !0)) {
                                    var s = o.seekNext.call(l, e);
                                    l.caretPos.begin < s && (l.caretPos = {
                                        begin: s
                                    });
                                }
                                return n;
                            }(v, m) ? (g = u.EventHandlers.keypressEvent.call(l, a, !0, !1, i, l.caretPos.begin)) && (v = l.caretPos.begin + 1, 
                            m = "") : g = u.EventHandlers.keypressEvent.call(l, a, !0, !1, i, n + 1), g ? (void 0 !== g.pos && c.validPositions[g.pos] && !0 === c.validPositions[g.pos].match.static && void 0 === c.validPositions[g.pos].alternation && (y.push(g.pos), 
                            l.isRTL || (g.forwardPosition = g.pos + 1)), p.call(l, void 0, o.getBuffer.call(l), g.forwardPosition, a, !1), 
                            l.caretPos = {
                                begin: g.forwardPosition,
                                end: g.forwardPosition
                            }, b = l.caretPos) : void 0 === c.validPositions[t] && h[t] === r.getPlaceholder.call(l, t) && o.isMask.call(l, t, !0) ? l.caretPos.begin++ : l.caretPos = b;
                        }
                    })), y.length > 0) {
                        var x, P, E = o.seekNext.call(l, -1, void 0, !1);
                        if (!s.isComplete.call(l, o.getBuffer.call(l)) && y.length <= E || s.isComplete.call(l, o.getBuffer.call(l)) && y.length > 0 && y.length !== E && 0 === y[0]) for (var S = E; void 0 !== (x = y.shift()); ) {
                            var w = new d.Event("_checkval");
                            if ((P = c.validPositions[x]).generatedInput = !0, w.keyCode = P.input.charCodeAt(0), 
                            (g = u.EventHandlers.keypressEvent.call(l, w, !0, !1, i, S)) && void 0 !== g.pos && g.pos !== x && c.validPositions[g.pos] && !0 === c.validPositions[g.pos].match.static) y.push(g.pos); else if (!g) break;
                            S++;
                        }
                    }
                    t && p.call(l, e, o.getBuffer.call(l), g ? g.forwardPosition : l.caretPos.begin, n || new d.Event("checkval"), n && ("input" === n.type && l.undoValue !== o.getBuffer.call(l).join("") || "paste" === n.type)), 
                    f.skipOptionalPartCharacter = k;
                }
                function p(e, t, i, a, r) {
                    var l = e ? e.inputmask : this, u = l.opts, c = l.dependencyLib;
                    if (a && "function" == typeof u.onBeforeWrite) {
                        var f = u.onBeforeWrite.call(l, a, t, i, u);
                        if (f) {
                            if (f.refreshFromBuffer) {
                                var d = f.refreshFromBuffer;
                                s.refreshFromBuffer.call(l, !0 === d ? d : d.start, d.end, f.buffer || t), t = o.getBuffer.call(l, !0);
                            }
                            void 0 !== i && (i = void 0 !== f.caret ? f.caret : i);
                        }
                    }
                    if (void 0 !== e && (e.inputmask._valueSet(t.join("")), void 0 === i || void 0 !== a && "blur" === a.type || o.caret.call(l, e, i, void 0, void 0, void 0 !== a && "keydown" === a.type && (a.keyCode === n.default.DELETE || a.keyCode === n.default.BACKSPACE)), 
                    !0 === r)) {
                        var p = c(e), h = e.inputmask._valueGet();
                        e.inputmask.skipInputEvent = !0, p.trigger("input"), setTimeout((function() {
                            h === o.getBufferTemplate.call(l).join("") ? p.trigger("cleared") : !0 === s.isComplete.call(l, t) && p.trigger("complete");
                        }), 0);
                    }
                }
            },
            2394: function(e, t, i) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.default = void 0, i(7149), i(3194);
                var a = i(157), n = v(i(3287)), r = v(i(9380)), o = i(2391), s = i(4713), l = i(8711), u = i(7215), c = i(7760), f = i(9716), d = v(i(7392)), p = v(i(3976)), h = v(i(8741));
                function m(e) {
                    return m = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e;
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                    }, m(e);
                }
                function v(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
                var g = r.default.document, k = "_inputmask_opts";
                function y(e, t, i) {
                    if (h.default) {
                        if (!(this instanceof y)) return new y(e, t, i);
                        this.dependencyLib = n.default, this.el = void 0, this.events = {}, this.maskset = void 0, 
                        !0 !== i && ("[object Object]" === Object.prototype.toString.call(e) ? t = e : (t = t || {}, 
                        e && (t.alias = e)), this.opts = n.default.extend(!0, {}, this.defaults, t), this.noMasksCache = t && void 0 !== t.definitions, 
                        this.userOptions = t || {}, b(this.opts.alias, t, this.opts)), this.refreshValue = !1, 
                        this.undoValue = void 0, this.$el = void 0, this.skipKeyPressEvent = !1, this.skipInputEvent = !1, 
                        this.validationEvent = !1, this.ignorable = !1, this.maxLength, this.mouseEnter = !1, 
                        this.originalPlaceholder = void 0, this.isComposing = !1;
                    }
                }
                function b(e, t, i) {
                    var a = y.prototype.aliases[e];
                    return a ? (a.alias && b(a.alias, void 0, i), n.default.extend(!0, i, a), n.default.extend(!0, i, t), 
                    !0) : (null === i.mask && (i.mask = e), !1);
                }
                y.prototype = {
                    dataAttribute: "data-inputmask",
                    defaults: p.default,
                    definitions: d.default,
                    aliases: {},
                    masksCache: {},
                    get isRTL() {
                        return this.opts.isRTL || this.opts.numericInput;
                    },
                    mask: function(e) {
                        var t = this;
                        return "string" == typeof e && (e = g.getElementById(e) || g.querySelectorAll(e)), 
                        (e = e.nodeName ? [ e ] : Array.isArray(e) ? e : Array.from(e)).forEach((function(e, i) {
                            var s = n.default.extend(!0, {}, t.opts);
                            if (function(e, t, i, a) {
                                function o(t, n) {
                                    var o = "" === a ? t : a + "-" + t;
                                    null !== (n = void 0 !== n ? n : e.getAttribute(o)) && ("string" == typeof n && (0 === t.indexOf("on") ? n = r.default[n] : "false" === n ? n = !1 : "true" === n && (n = !0)), 
                                    i[t] = n);
                                }
                                if (!0 === t.importDataAttributes) {
                                    var s, l, u, c, f = e.getAttribute(a);
                                    if (f && "" !== f && (f = f.replace(/'/g, '"'), l = JSON.parse("{" + f + "}")), 
                                    l) for (c in u = void 0, l) if ("alias" === c.toLowerCase()) {
                                        u = l[c];
                                        break;
                                    }
                                    for (s in o("alias", u), i.alias && b(i.alias, i, t), t) {
                                        if (l) for (c in u = void 0, l) if (c.toLowerCase() === s.toLowerCase()) {
                                            u = l[c];
                                            break;
                                        }
                                        o(s, u);
                                    }
                                }
                                n.default.extend(!0, t, i), ("rtl" === e.dir || t.rightAlign) && (e.style.textAlign = "right");
                                ("rtl" === e.dir || t.numericInput) && (e.dir = "ltr", e.removeAttribute("dir"), 
                                t.isRTL = !0);
                                return Object.keys(i).length;
                            }(e, s, n.default.extend(!0, {}, t.userOptions), t.dataAttribute)) {
                                var l = (0, o.generateMaskSet)(s, t.noMasksCache);
                                void 0 !== l && (void 0 !== e.inputmask && (e.inputmask.opts.autoUnmask = !0, e.inputmask.remove()), 
                                e.inputmask = new y(void 0, void 0, !0), e.inputmask.opts = s, e.inputmask.noMasksCache = t.noMasksCache, 
                                e.inputmask.userOptions = n.default.extend(!0, {}, t.userOptions), e.inputmask.el = e, 
                                e.inputmask.$el = (0, n.default)(e), e.inputmask.maskset = l, n.default.data(e, k, t.userOptions), 
                                a.mask.call(e.inputmask));
                            }
                        })), e && e[0] && e[0].inputmask || this;
                    },
                    option: function(e, t) {
                        return "string" == typeof e ? this.opts[e] : "object" === m(e) ? (n.default.extend(this.userOptions, e), 
                        this.el && !0 !== t && this.mask(this.el), this) : void 0;
                    },
                    unmaskedvalue: function(e) {
                        if (this.maskset = this.maskset || (0, o.generateMaskSet)(this.opts, this.noMasksCache), 
                        void 0 === this.el || void 0 !== e) {
                            var t = ("function" == typeof this.opts.onBeforeMask && this.opts.onBeforeMask.call(this, e, this.opts) || e).split("");
                            c.checkVal.call(this, void 0, !1, !1, t), "function" == typeof this.opts.onBeforeWrite && this.opts.onBeforeWrite.call(this, void 0, l.getBuffer.call(this), 0, this.opts);
                        }
                        return c.unmaskedvalue.call(this, this.el);
                    },
                    remove: function() {
                        if (this.el) {
                            n.default.data(this.el, k, null);
                            var e = this.opts.autoUnmask ? (0, c.unmaskedvalue)(this.el) : this._valueGet(this.opts.autoUnmask);
                            e !== l.getBufferTemplate.call(this).join("") ? this._valueSet(e, this.opts.autoUnmask) : this._valueSet(""), 
                            f.EventRuler.off(this.el), Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.el), "value") && this.__valueGet && Object.defineProperty(this.el, "value", {
                                get: this.__valueGet,
                                set: this.__valueSet,
                                configurable: !0
                            }) : g.__lookupGetter__ && this.el.__lookupGetter__("value") && this.__valueGet && (this.el.__defineGetter__("value", this.__valueGet), 
                            this.el.__defineSetter__("value", this.__valueSet)), this.el.inputmask = void 0;
                        }
                        return this.el;
                    },
                    getemptymask: function() {
                        return this.maskset = this.maskset || (0, o.generateMaskSet)(this.opts, this.noMasksCache), 
                        l.getBufferTemplate.call(this).join("");
                    },
                    hasMaskedValue: function() {
                        return !this.opts.autoUnmask;
                    },
                    isComplete: function() {
                        return this.maskset = this.maskset || (0, o.generateMaskSet)(this.opts, this.noMasksCache), 
                        u.isComplete.call(this, l.getBuffer.call(this));
                    },
                    getmetadata: function() {
                        if (this.maskset = this.maskset || (0, o.generateMaskSet)(this.opts, this.noMasksCache), 
                        Array.isArray(this.maskset.metadata)) {
                            var e = s.getMaskTemplate.call(this, !0, 0, !1).join("");
                            return this.maskset.metadata.forEach((function(t) {
                                return t.mask !== e || (e = t, !1);
                            })), e;
                        }
                        return this.maskset.metadata;
                    },
                    isValid: function(e) {
                        if (this.maskset = this.maskset || (0, o.generateMaskSet)(this.opts, this.noMasksCache), 
                        e) {
                            var t = ("function" == typeof this.opts.onBeforeMask && this.opts.onBeforeMask.call(this, e, this.opts) || e).split("");
                            c.checkVal.call(this, void 0, !0, !1, t);
                        } else e = this.isRTL ? l.getBuffer.call(this).slice().reverse().join("") : l.getBuffer.call(this).join("");
                        for (var i = l.getBuffer.call(this), a = l.determineLastRequiredPosition.call(this), n = i.length - 1; n > a && !l.isMask.call(this, n); n--) ;
                        return i.splice(a, n + 1 - a), u.isComplete.call(this, i) && e === (this.isRTL ? l.getBuffer.call(this).slice().reverse().join("") : l.getBuffer.call(this).join(""));
                    },
                    format: function(e, t) {
                        this.maskset = this.maskset || (0, o.generateMaskSet)(this.opts, this.noMasksCache);
                        var i = ("function" == typeof this.opts.onBeforeMask && this.opts.onBeforeMask.call(this, e, this.opts) || e).split("");
                        c.checkVal.call(this, void 0, !0, !1, i);
                        var a = this.isRTL ? l.getBuffer.call(this).slice().reverse().join("") : l.getBuffer.call(this).join("");
                        return t ? {
                            value: a,
                            metadata: this.getmetadata()
                        } : a;
                    },
                    setValue: function(e) {
                        this.el && (0, n.default)(this.el).trigger("setvalue", [ e ]);
                    },
                    analyseMask: o.analyseMask
                }, y.extendDefaults = function(e) {
                    n.default.extend(!0, y.prototype.defaults, e);
                }, y.extendDefinitions = function(e) {
                    n.default.extend(!0, y.prototype.definitions, e);
                }, y.extendAliases = function(e) {
                    n.default.extend(!0, y.prototype.aliases, e);
                }, y.format = function(e, t, i) {
                    return y(t).format(e, i);
                }, y.unmask = function(e, t) {
                    return y(t).unmaskedvalue(e);
                }, y.isValid = function(e, t) {
                    return y(t).isValid(e);
                }, y.remove = function(e) {
                    "string" == typeof e && (e = g.getElementById(e) || g.querySelectorAll(e)), (e = e.nodeName ? [ e ] : e).forEach((function(e) {
                        e.inputmask && e.inputmask.remove();
                    }));
                }, y.setValue = function(e, t) {
                    "string" == typeof e && (e = g.getElementById(e) || g.querySelectorAll(e)), (e = e.nodeName ? [ e ] : e).forEach((function(e) {
                        e.inputmask ? e.inputmask.setValue(t) : (0, n.default)(e).trigger("setvalue", [ t ]);
                    }));
                }, y.dependencyLib = n.default, r.default.Inputmask = y;
                var x = y;
                t.default = x;
            },
            5296: function(e, t, i) {
                function a(e) {
                    return a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e;
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                    }, a(e);
                }
                var n = h(i(9380)), r = h(i(2394)), o = h(i(8741));
                function s(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var a = t[i];
                        a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
                        Object.defineProperty(e, a.key, a);
                    }
                }
                function l(e, t) {
                    if (t && ("object" === a(t) || "function" == typeof t)) return t;
                    if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                    return function(e) {
                        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return e;
                    }(e);
                }
                function u(e) {
                    var t = "function" == typeof Map ? new Map : void 0;
                    return u = function(e) {
                        if (null === e || (i = e, -1 === Function.toString.call(i).indexOf("[native code]"))) return e;
                        var i;
                        if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
                        if (void 0 !== t) {
                            if (t.has(e)) return t.get(e);
                            t.set(e, a);
                        }
                        function a() {
                            return c(e, arguments, p(this).constructor);
                        }
                        return a.prototype = Object.create(e.prototype, {
                            constructor: {
                                value: a,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), d(a, e);
                    }, u(e);
                }
                function c(e, t, i) {
                    return c = f() ? Reflect.construct : function(e, t, i) {
                        var a = [ null ];
                        a.push.apply(a, t);
                        var n = new (Function.bind.apply(e, a));
                        return i && d(n, i.prototype), n;
                    }, c.apply(null, arguments);
                }
                function f() {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), 
                        !0;
                    } catch (e) {
                        return !1;
                    }
                }
                function d(e, t) {
                    return d = Object.setPrototypeOf || function(e, t) {
                        return e.__proto__ = t, e;
                    }, d(e, t);
                }
                function p(e) {
                    return p = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                        return e.__proto__ || Object.getPrototypeOf(e);
                    }, p(e);
                }
                function h(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
                var m = n.default.document;
                if (o.default && m && m.head && m.head.attachShadow && n.default.customElements && void 0 === n.default.customElements.get("input-mask")) {
                    var v = function(e) {
                        !function(e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                            Object.defineProperty(e, "prototype", {
                                value: Object.create(t && t.prototype, {
                                    constructor: {
                                        value: e,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                writable: !1
                            }), t && d(e, t);
                        }(c, e);
                        var t, i, a, n, o, u = (t = c, i = f(), function() {
                            var e, a = p(t);
                            if (i) {
                                var n = p(this).constructor;
                                e = Reflect.construct(a, arguments, n);
                            } else e = a.apply(this, arguments);
                            return l(this, e);
                        });
                        function c() {
                            var e;
                            !function(e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                            }(this, c);
                            var t = (e = u.call(this)).getAttributeNames(), i = e.attachShadow({
                                mode: "closed"
                            }), a = m.createElement("input");
                            for (var n in a.type = "text", i.appendChild(a), t) Object.prototype.hasOwnProperty.call(t, n) && a.setAttribute(t[n], e.getAttribute(t[n]));
                            var o = new r.default;
                            return o.dataAttribute = "", o.mask(a), a.inputmask.shadowRoot = i, e;
                        }
                        return a = c, n && s(a.prototype, n), o && s(a, o), Object.defineProperty(a, "prototype", {
                            writable: !1
                        }), a;
                    }(u(HTMLElement));
                    n.default.customElements.define("input-mask", v);
                }
            },
            443: function(e, t, i) {
                var a = o(i(2047)), n = o(i(2394));
                function r(e) {
                    return r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e;
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                    }, r(e);
                }
                function o(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
                void 0 === a.default.fn.inputmask && (a.default.fn.inputmask = function(e, t) {
                    var i, o = this[0];
                    if (void 0 === t && (t = {}), "string" == typeof e) switch (e) {
                      case "unmaskedvalue":
                        return o && o.inputmask ? o.inputmask.unmaskedvalue() : (0, a.default)(o).val();

                      case "remove":
                        return this.each((function() {
                            this.inputmask && this.inputmask.remove();
                        }));

                      case "getemptymask":
                        return o && o.inputmask ? o.inputmask.getemptymask() : "";

                      case "hasMaskedValue":
                        return !(!o || !o.inputmask) && o.inputmask.hasMaskedValue();

                      case "isComplete":
                        return !o || !o.inputmask || o.inputmask.isComplete();

                      case "getmetadata":
                        return o && o.inputmask ? o.inputmask.getmetadata() : void 0;

                      case "setvalue":
                        n.default.setValue(o, t);
                        break;

                      case "option":
                        if ("string" != typeof t) return this.each((function() {
                            if (void 0 !== this.inputmask) return this.inputmask.option(t);
                        }));
                        if (o && void 0 !== o.inputmask) return o.inputmask.option(t);
                        break;

                      default:
                        return t.alias = e, i = new n.default(t), this.each((function() {
                            i.mask(this);
                        }));
                    } else {
                        if (Array.isArray(e)) return t.alias = e, i = new n.default(t), this.each((function() {
                            i.mask(this);
                        }));
                        if ("object" == r(e)) return i = new n.default(e), void 0 === e.mask && void 0 === e.alias ? this.each((function() {
                            if (void 0 !== this.inputmask) return this.inputmask.option(e);
                            i.mask(this);
                        })) : this.each((function() {
                            i.mask(this);
                        }));
                        if (void 0 === e) return this.each((function() {
                            (i = new n.default(t)).mask(this);
                        }));
                    }
                });
            },
            2391: function(e, t, i) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.analyseMask = function(e, t, i) {
                    var a, o, s, l, u, c, f = /(?:[?*+]|\{[0-9+*]+(?:,[0-9+*]*)?(?:\|[0-9+*]*)?\})|[^.?*+^${[]()|\\]+|./g, d = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g, p = !1, h = new n.default, m = [], v = [], g = !1;
                    function k(e, a, n) {
                        n = void 0 !== n ? n : e.matches.length;
                        var o = e.matches[n - 1];
                        if (t) 0 === a.indexOf("[") || p && /\\d|\\s|\\w/i.test(a) || "." === a ? e.matches.splice(n++, 0, {
                            fn: new RegExp(a, i.casing ? "i" : ""),
                            static: !1,
                            optionality: !1,
                            newBlockMarker: void 0 === o ? "master" : o.def !== a,
                            casing: null,
                            def: a,
                            placeholder: void 0,
                            nativeDef: a
                        }) : (p && (a = a[a.length - 1]), a.split("").forEach((function(t, a) {
                            o = e.matches[n - 1], e.matches.splice(n++, 0, {
                                fn: /[a-z]/i.test(i.staticDefinitionSymbol || t) ? new RegExp("[" + (i.staticDefinitionSymbol || t) + "]", i.casing ? "i" : "") : null,
                                static: !0,
                                optionality: !1,
                                newBlockMarker: void 0 === o ? "master" : o.def !== t && !0 !== o.static,
                                casing: null,
                                def: i.staticDefinitionSymbol || t,
                                placeholder: void 0 !== i.staticDefinitionSymbol ? t : void 0,
                                nativeDef: (p ? "'" : "") + t
                            });
                        }))), p = !1; else {
                            var s = i.definitions && i.definitions[a] || i.usePrototypeDefinitions && r.default.prototype.definitions[a];
                            s && !p ? e.matches.splice(n++, 0, {
                                fn: s.validator ? "string" == typeof s.validator ? new RegExp(s.validator, i.casing ? "i" : "") : new function() {
                                    this.test = s.validator;
                                } : new RegExp("."),
                                static: s.static || !1,
                                optionality: s.optional || !1,
                                newBlockMarker: void 0 === o || s.optional ? "master" : o.def !== (s.definitionSymbol || a),
                                casing: s.casing,
                                def: s.definitionSymbol || a,
                                placeholder: s.placeholder,
                                nativeDef: a,
                                generated: s.generated
                            }) : (e.matches.splice(n++, 0, {
                                fn: /[a-z]/i.test(i.staticDefinitionSymbol || a) ? new RegExp("[" + (i.staticDefinitionSymbol || a) + "]", i.casing ? "i" : "") : null,
                                static: !0,
                                optionality: !1,
                                newBlockMarker: void 0 === o ? "master" : o.def !== a && !0 !== o.static,
                                casing: null,
                                def: i.staticDefinitionSymbol || a,
                                placeholder: void 0 !== i.staticDefinitionSymbol ? a : void 0,
                                nativeDef: (p ? "'" : "") + a
                            }), p = !1);
                        }
                    }
                    function y() {
                        if (m.length > 0) {
                            if (k(l = m[m.length - 1], o), l.isAlternator) {
                                u = m.pop();
                                for (var e = 0; e < u.matches.length; e++) u.matches[e].isGroup && (u.matches[e].isGroup = !1);
                                m.length > 0 ? (l = m[m.length - 1]).matches.push(u) : h.matches.push(u);
                            }
                        } else k(h, o);
                    }
                    function b(e) {
                        var t = new n.default(!0);
                        return t.openGroup = !1, t.matches = e, t;
                    }
                    function x() {
                        if ((s = m.pop()).openGroup = !1, void 0 !== s) if (m.length > 0) {
                            if ((l = m[m.length - 1]).matches.push(s), l.isAlternator) {
                                for (var e = (u = m.pop()).matches[0].matches ? u.matches[0].matches.length : 1, t = 0; t < u.matches.length; t++) u.matches[t].isGroup = !1, 
                                u.matches[t].alternatorGroup = !1, null === i.keepStatic && e < (u.matches[t].matches ? u.matches[t].matches.length : 1) && (i.keepStatic = !0), 
                                e = u.matches[t].matches ? u.matches[t].matches.length : 1;
                                m.length > 0 ? (l = m[m.length - 1]).matches.push(u) : h.matches.push(u);
                            }
                        } else h.matches.push(s); else y();
                    }
                    function P(e) {
                        var t = e.pop();
                        return t.isQuantifier && (t = b([ e.pop(), t ])), t;
                    }
                    t && (i.optionalmarker[0] = void 0, i.optionalmarker[1] = void 0);
                    for (;a = t ? d.exec(e) : f.exec(e); ) {
                        if (o = a[0], t) {
                            switch (o.charAt(0)) {
                              case "?":
                                o = "{0,1}";
                                break;

                              case "+":
                              case "*":
                                o = "{" + o + "}";
                                break;

                              case "|":
                                if (0 === m.length) {
                                    var E = b(h.matches);
                                    E.openGroup = !0, m.push(E), h.matches = [], g = !0;
                                }
                            }
                            if ("\\d" === o) o = "[0-9]";
                        }
                        if (p) y(); else switch (o.charAt(0)) {
                          case "$":
                          case "^":
                            t || y();
                            break;

                          case i.escapeChar:
                            p = !0, t && y();
                            break;

                          case i.optionalmarker[1]:
                          case i.groupmarker[1]:
                            x();
                            break;

                          case i.optionalmarker[0]:
                            m.push(new n.default(!1, !0));
                            break;

                          case i.groupmarker[0]:
                            m.push(new n.default(!0));
                            break;

                          case i.quantifiermarker[0]:
                            var S = new n.default(!1, !1, !0), w = (o = o.replace(/[{}?]/g, "")).split("|"), _ = w[0].split(","), M = isNaN(_[0]) ? _[0] : parseInt(_[0]), O = 1 === _.length ? M : isNaN(_[1]) ? _[1] : parseInt(_[1]), T = isNaN(w[1]) ? w[1] : parseInt(w[1]);
                            "*" !== M && "+" !== M || (M = "*" === O ? 0 : 1), S.quantifier = {
                                min: M,
                                max: O,
                                jit: T
                            };
                            var A = m.length > 0 ? m[m.length - 1].matches : h.matches;
                            if ((a = A.pop()).isAlternator) {
                                A.push(a), A = a.matches;
                                var C = new n.default(!0), D = A.pop();
                                A.push(C), A = C.matches, a = D;
                            }
                            a.isGroup || (a = b([ a ])), A.push(a), A.push(S);
                            break;

                          case i.alternatormarker:
                            if (m.length > 0) {
                                var j = (l = m[m.length - 1]).matches[l.matches.length - 1];
                                c = l.openGroup && (void 0 === j.matches || !1 === j.isGroup && !1 === j.isAlternator) ? m.pop() : P(l.matches);
                            } else c = P(h.matches);
                            if (c.isAlternator) m.push(c); else if (c.alternatorGroup ? (u = m.pop(), c.alternatorGroup = !1) : u = new n.default(!1, !1, !1, !0), 
                            u.matches.push(c), m.push(u), c.openGroup) {
                                c.openGroup = !1;
                                var B = new n.default(!0);
                                B.alternatorGroup = !0, m.push(B);
                            }
                            break;

                          default:
                            y();
                        }
                    }
                    g && x();
                    for (;m.length > 0; ) s = m.pop(), h.matches.push(s);
                    h.matches.length > 0 && (!function e(a) {
                        a && a.matches && a.matches.forEach((function(n, r) {
                            var o = a.matches[r + 1];
                            (void 0 === o || void 0 === o.matches || !1 === o.isQuantifier) && n && n.isGroup && (n.isGroup = !1, 
                            t || (k(n, i.groupmarker[0], 0), !0 !== n.openGroup && k(n, i.groupmarker[1]))), 
                            e(n);
                        }));
                    }(h), v.push(h));
                    (i.numericInput || i.isRTL) && function e(t) {
                        for (var a in t.matches = t.matches.reverse(), t.matches) if (Object.prototype.hasOwnProperty.call(t.matches, a)) {
                            var n = parseInt(a);
                            if (t.matches[a].isQuantifier && t.matches[n + 1] && t.matches[n + 1].isGroup) {
                                var r = t.matches[a];
                                t.matches.splice(a, 1), t.matches.splice(n + 1, 0, r);
                            }
                            void 0 !== t.matches[a].matches ? t.matches[a] = e(t.matches[a]) : t.matches[a] = ((o = t.matches[a]) === i.optionalmarker[0] ? o = i.optionalmarker[1] : o === i.optionalmarker[1] ? o = i.optionalmarker[0] : o === i.groupmarker[0] ? o = i.groupmarker[1] : o === i.groupmarker[1] && (o = i.groupmarker[0]), 
                            o);
                        }
                        var o;
                        return t;
                    }(v[0]);
                    return v;
                }, t.generateMaskSet = function(e, t) {
                    var i;
                    function n(e, i, n) {
                        var o, s, l = !1;
                        if (null !== e && "" !== e || ((l = null !== n.regex) ? e = (e = n.regex).replace(/^(\^)(.*)(\$)$/, "$2") : (l = !0, 
                        e = ".*")), 1 === e.length && !1 === n.greedy && 0 !== n.repeat && (n.placeholder = ""), 
                        n.repeat > 0 || "*" === n.repeat || "+" === n.repeat) {
                            var u = "*" === n.repeat ? 0 : "+" === n.repeat ? 1 : n.repeat;
                            e = n.groupmarker[0] + e + n.groupmarker[1] + n.quantifiermarker[0] + u + "," + n.repeat + n.quantifiermarker[1];
                        }
                        return s = l ? "regex_" + n.regex : n.numericInput ? e.split("").reverse().join("") : e, 
                        null !== n.keepStatic && (s = "ks_" + n.keepStatic + s), void 0 === r.default.prototype.masksCache[s] || !0 === t ? (o = {
                            mask: e,
                            maskToken: r.default.prototype.analyseMask(e, l, n),
                            validPositions: {},
                            _buffer: void 0,
                            buffer: void 0,
                            tests: {},
                            excludes: {},
                            metadata: i,
                            maskLength: void 0,
                            jitOffset: {}
                        }, !0 !== t && (r.default.prototype.masksCache[s] = o, o = a.default.extend(!0, {}, r.default.prototype.masksCache[s]))) : o = a.default.extend(!0, {}, r.default.prototype.masksCache[s]), 
                        o;
                    }
                    "function" == typeof e.mask && (e.mask = e.mask(e));
                    if (Array.isArray(e.mask)) {
                        if (e.mask.length > 1) {
                            null === e.keepStatic && (e.keepStatic = !0);
                            var o = e.groupmarker[0];
                            return (e.isRTL ? e.mask.reverse() : e.mask).forEach((function(t) {
                                o.length > 1 && (o += e.alternatormarker), void 0 !== t.mask && "function" != typeof t.mask ? o += t.mask : o += t;
                            })), n(o += e.groupmarker[1], e.mask, e);
                        }
                        e.mask = e.mask.pop();
                    }
                    i = e.mask && void 0 !== e.mask.mask && "function" != typeof e.mask.mask ? n(e.mask.mask, e.mask, e) : n(e.mask, e.mask, e);
                    null === e.keepStatic && (e.keepStatic = !1);
                    return i;
                };
                var a = o(i(3287)), n = o(i(9695)), r = o(i(2394));
                function o(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    };
                }
            },
            157: function(e, t, i) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.mask = function() {
                    var e = this, t = this.opts, i = this.el, a = this.dependencyLib;
                    s.EventRuler.off(i);
                    var f = function(t, i) {
                        "textarea" !== t.tagName.toLowerCase() && i.ignorables.push(n.default.ENTER);
                        var l = t.getAttribute("type"), u = "input" === t.tagName.toLowerCase() && i.supportsInputType.includes(l) || t.isContentEditable || "textarea" === t.tagName.toLowerCase();
                        if (!u) if ("input" === t.tagName.toLowerCase()) {
                            var c = document.createElement("input");
                            c.setAttribute("type", l), u = "text" === c.type, c = null;
                        } else u = "partial";
                        return !1 !== u ? function(t) {
                            var n, l;
                            function u() {
                                return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== r.getLastValidPosition.call(e) || !0 !== i.nullable ? (this.inputmask.shadowRoot || this.ownerDocument).activeElement === this && i.clearMaskOnLostFocus ? (e.isRTL ? o.clearOptionalTail.call(e, r.getBuffer.call(e).slice()).reverse() : o.clearOptionalTail.call(e, r.getBuffer.call(e).slice())).join("") : n.call(this) : "" : n.call(this);
                            }
                            function c(e) {
                                l.call(this, e), this.inputmask && (0, o.applyInputValue)(this, e);
                            }
                            if (!t.inputmask.__valueGet) {
                                if (!0 !== i.noValuePatching) {
                                    if (Object.getOwnPropertyDescriptor) {
                                        var f = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(t), "value") : void 0;
                                        f && f.get && f.set ? (n = f.get, l = f.set, Object.defineProperty(t, "value", {
                                            get: u,
                                            set: c,
                                            configurable: !0
                                        })) : "input" !== t.tagName.toLowerCase() && (n = function() {
                                            return this.textContent;
                                        }, l = function(e) {
                                            this.textContent = e;
                                        }, Object.defineProperty(t, "value", {
                                            get: u,
                                            set: c,
                                            configurable: !0
                                        }));
                                    } else document.__lookupGetter__ && t.__lookupGetter__("value") && (n = t.__lookupGetter__("value"), 
                                    l = t.__lookupSetter__("value"), t.__defineGetter__("value", u), t.__defineSetter__("value", c));
                                    t.inputmask.__valueGet = n, t.inputmask.__valueSet = l;
                                }
                                t.inputmask._valueGet = function(t) {
                                    return e.isRTL && !0 !== t ? n.call(this.el).split("").reverse().join("") : n.call(this.el);
                                }, t.inputmask._valueSet = function(t, i) {
                                    l.call(this.el, null == t ? "" : !0 !== i && e.isRTL ? t.split("").reverse().join("") : t);
                                }, void 0 === n && (n = function() {
                                    return this.value;
                                }, l = function(e) {
                                    this.value = e;
                                }, function(t) {
                                    if (a.valHooks && (void 0 === a.valHooks[t] || !0 !== a.valHooks[t].inputmaskpatch)) {
                                        var n = a.valHooks[t] && a.valHooks[t].get ? a.valHooks[t].get : function(e) {
                                            return e.value;
                                        }, s = a.valHooks[t] && a.valHooks[t].set ? a.valHooks[t].set : function(e, t) {
                                            return e.value = t, e;
                                        };
                                        a.valHooks[t] = {
                                            get: function(t) {
                                                if (t.inputmask) {
                                                    if (t.inputmask.opts.autoUnmask) return t.inputmask.unmaskedvalue();
                                                    var a = n(t);
                                                    return -1 !== r.getLastValidPosition.call(e, void 0, void 0, t.inputmask.maskset.validPositions) || !0 !== i.nullable ? a : "";
                                                }
                                                return n(t);
                                            },
                                            set: function(e, t) {
                                                var i = s(e, t);
                                                return e.inputmask && (0, o.applyInputValue)(e, t), i;
                                            },
                                            inputmaskpatch: !0
                                        };
                                    }
                                }(t.type), function(t) {
                                    s.EventRuler.on(t, "mouseenter", (function() {
                                        var t = this.inputmask._valueGet(!0);
                                        t !== (e.isRTL ? r.getBuffer.call(e).reverse() : r.getBuffer.call(e)).join("") && (0, 
                                        o.applyInputValue)(this, t);
                                    }));
                                }(t));
                            }
                        }(t) : t.inputmask = void 0, u;
                    }(i, t);
                    if (!1 !== f) {
                        e.originalPlaceholder = i.placeholder, e.maxLength = void 0 !== i ? i.maxLength : void 0, 
                        -1 === e.maxLength && (e.maxLength = void 0), "inputMode" in i && null === i.getAttribute("inputmode") && (i.inputMode = t.inputmode, 
                        i.setAttribute("inputmode", t.inputmode)), !0 === f && (t.showMaskOnFocus = t.showMaskOnFocus && -1 === [ "cc-number", "cc-exp" ].indexOf(i.autocomplete), 
                        l.iphone && (t.insertModeVisual = !1), s.EventRuler.on(i, "submit", c.EventHandlers.submitEvent), 
                        s.EventRuler.on(i, "reset", c.EventHandlers.resetEvent), s.EventRuler.on(i, "blur", c.EventHandlers.blurEvent), 
                        s.EventRuler.on(i, "focus", c.EventHandlers.focusEvent), s.EventRuler.on(i, "invalid", c.EventHandlers.invalidEvent), 
                        s.EventRuler.on(i, "click", c.EventHandlers.clickEvent), s.EventRuler.on(i, "mouseleave", c.EventHandlers.mouseleaveEvent), 
                        s.EventRuler.on(i, "mouseenter", c.EventHandlers.mouseenterEvent), s.EventRuler.on(i, "paste", c.EventHandlers.pasteEvent), 
                        s.EventRuler.on(i, "cut", c.EventHandlers.cutEvent), s.EventRuler.on(i, "complete", t.oncomplete), 
                        s.EventRuler.on(i, "incomplete", t.onincomplete), s.EventRuler.on(i, "cleared", t.oncleared), 
                        !0 !== t.inputEventOnly && (s.EventRuler.on(i, "keydown", c.EventHandlers.keydownEvent), 
                        s.EventRuler.on(i, "keypress", c.EventHandlers.keypressEvent), s.EventRuler.on(i, "keyup", c.EventHandlers.keyupEvent)), 
                        (l.mobile || t.inputEventOnly) && i.removeAttribute("maxLength"), s.EventRuler.on(i, "input", c.EventHandlers.inputFallBackEvent), 
                        s.EventRuler.on(i, "compositionend", c.EventHandlers.compositionendEvent)), s.EventRuler.on(i, "setvalue", c.EventHandlers.setValueEvent), 
                        r.getBufferTemplate.call(e).join(""), e.undoValue = e._valueGet(!0);
                        var d = (i.inputmask.shadowRoot || i.ownerDocument).activeElement;
                        if ("" !== i.inputmask._valueGet(!0) || !1 === t.clearMaskOnLostFocus || d === i) {
                            (0, o.applyInputValue)(i, i.inputmask._valueGet(!0), t);
                            var p = r.getBuffer.call(e).slice();
                            !1 === u.isComplete.call(e, p) && t.clearIncomplete && r.resetMaskSet.call(e), t.clearMaskOnLostFocus && d !== i && (-1 === r.getLastValidPosition.call(e) ? p = [] : o.clearOptionalTail.call(e, p)), 
                            (!1 === t.clearMaskOnLostFocus || t.showMaskOnFocus && d === i || "" !== i.inputmask._valueGet(!0)) && (0, 
                            o.writeBuffer)(i, p), d === i && r.caret.call(e, i, r.seekNext.call(e, r.getLastValidPosition.call(e)));
                        }
                    }
                };
                var a, n = (a = i(5581)) && a.__esModule ? a : {
                    default: a
                }, r = i(8711), o = i(7760), s = i(9716), l = i(9845), u = i(7215), c = i(6030);
            },
            9695: function(e, t) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.default = function(e, t, i, a) {
                    this.matches = [], this.openGroup = e || !1, this.alternatorGroup = !1, this.isGroup = e || !1, 
                    this.isOptional = t || !1, this.isQuantifier = i || !1, this.isAlternator = a || !1, 
                    this.quantifier = {
                        min: 1,
                        max: 1
                    };
                };
            },
            3194: function() {
                Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
                    value: function(e, t) {
                        if (null == this) throw new TypeError('"this" is null or not defined');
                        var i = Object(this), a = i.length >>> 0;
                        if (0 === a) return !1;
                        for (var n = 0 | t, r = Math.max(n >= 0 ? n : a - Math.abs(n), 0); r < a; ) {
                            if (i[r] === e) return !0;
                            r++;
                        }
                        return !1;
                    }
                });
            },
            7149: function() {
                function e(t) {
                    return e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e;
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                    }, e(t);
                }
                "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" === e("test".__proto__) ? function(e) {
                    return e.__proto__;
                } : function(e) {
                    return e.constructor.prototype;
                });
            },
            8711: function(e, t, i) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.caret = function(e, t, i, a, n) {
                    var r, o = this, s = this.opts;
                    if (void 0 === t) return "selectionStart" in e && "selectionEnd" in e ? (t = e.selectionStart, 
                    i = e.selectionEnd) : window.getSelection ? (r = window.getSelection().getRangeAt(0)).commonAncestorContainer.parentNode !== e && r.commonAncestorContainer !== e || (t = r.startOffset, 
                    i = r.endOffset) : document.selection && document.selection.createRange && (r = document.selection.createRange(), 
                    t = 0 - r.duplicate().moveStart("character", -e.inputmask._valueGet().length), i = t + r.text.length), 
                    {
                        begin: a ? t : u.call(o, t),
                        end: a ? i : u.call(o, i)
                    };
                    if (Array.isArray(t) && (i = o.isRTL ? t[0] : t[1], t = o.isRTL ? t[1] : t[0]), 
                    void 0 !== t.begin && (i = o.isRTL ? t.begin : t.end, t = o.isRTL ? t.end : t.begin), 
                    "number" == typeof t) {
                        t = a ? t : u.call(o, t), i = "number" == typeof (i = a ? i : u.call(o, i)) ? i : t;
                        var l = parseInt(((e.ownerDocument.defaultView || window).getComputedStyle ? (e.ownerDocument.defaultView || window).getComputedStyle(e, null) : e.currentStyle).fontSize) * i;
                        if (e.scrollLeft = l > e.scrollWidth ? l : 0, e.inputmask.caretPos = {
                            begin: t,
                            end: i
                        }, s.insertModeVisual && !1 === s.insertMode && t === i && (n || i++), e === (e.inputmask.shadowRoot || e.ownerDocument).activeElement) if ("setSelectionRange" in e) e.setSelectionRange(t, i); else if (window.getSelection) {
                            if (r = document.createRange(), void 0 === e.firstChild || null === e.firstChild) {
                                var c = document.createTextNode("");
                                e.appendChild(c);
                            }
                            r.setStart(e.firstChild, t < e.inputmask._valueGet().length ? t : e.inputmask._valueGet().length), 
                            r.setEnd(e.firstChild, i < e.inputmask._valueGet().length ? i : e.inputmask._valueGet().length), 
                            r.collapse(!0);
                            var f = window.getSelection();
                            f.removeAllRanges(), f.addRange(r);
                        } else e.createTextRange && ((r = e.createTextRange()).collapse(!0), r.moveEnd("character", i), 
                        r.moveStart("character", t), r.select());
                    }
                }, t.determineLastRequiredPosition = function(e) {
                    var t, i, r = this, s = this.maskset, l = this.dependencyLib, u = a.getMaskTemplate.call(r, !0, o.call(r), !0, !0), c = u.length, f = o.call(r), d = {}, p = s.validPositions[f], h = void 0 !== p ? p.locator.slice() : void 0;
                    for (t = f + 1; t < u.length; t++) i = a.getTestTemplate.call(r, t, h, t - 1), h = i.locator.slice(), 
                    d[t] = l.extend(!0, {}, i);
                    var m = p && void 0 !== p.alternation ? p.locator[p.alternation] : void 0;
                    for (t = c - 1; t > f && (((i = d[t]).match.optionality || i.match.optionalQuantifier && i.match.newBlockMarker || m && (m !== d[t].locator[p.alternation] && 1 != i.match.static || !0 === i.match.static && i.locator[p.alternation] && n.checkAlternationMatch.call(r, i.locator[p.alternation].toString().split(","), m.toString().split(",")) && "" !== a.getTests.call(r, t)[0].def)) && u[t] === a.getPlaceholder.call(r, t, i.match)); t--) c--;
                    return e ? {
                        l: c,
                        def: d[c] ? d[c].match : void 0
                    } : c;
                }, t.determineNewCaretPosition = function(e, t, i) {
                    var n = this, u = this.maskset, c = this.opts;
                    t && (n.isRTL ? e.end = e.begin : e.begin = e.end);
                    if (e.begin === e.end) {
                        switch (i = i || c.positionCaretOnClick) {
                          case "none":
                            break;

                          case "select":
                            e = {
                                begin: 0,
                                end: r.call(n).length
                            };
                            break;

                          case "ignore":
                            e.end = e.begin = l.call(n, o.call(n));
                            break;

                          case "radixFocus":
                            if (function(e) {
                                if ("" !== c.radixPoint && 0 !== c.digits) {
                                    var t = u.validPositions;
                                    if (void 0 === t[e] || t[e].input === a.getPlaceholder.call(n, e)) {
                                        if (e < l.call(n, -1)) return !0;
                                        var i = r.call(n).indexOf(c.radixPoint);
                                        if (-1 !== i) {
                                            for (var o in t) if (t[o] && i < o && t[o].input !== a.getPlaceholder.call(n, o)) return !1;
                                            return !0;
                                        }
                                    }
                                }
                                return !1;
                            }(e.begin)) {
                                var f = r.call(n).join("").indexOf(c.radixPoint);
                                e.end = e.begin = c.numericInput ? l.call(n, f) : f;
                                break;
                            }

                          default:
                            var d = e.begin, p = o.call(n, d, !0), h = l.call(n, -1 !== p || s.call(n, 0) ? p : -1);
                            if (d <= h) e.end = e.begin = s.call(n, d, !1, !0) ? d : l.call(n, d); else {
                                var m = u.validPositions[p], v = a.getTestTemplate.call(n, h, m ? m.match.locator : void 0, m), g = a.getPlaceholder.call(n, h, v.match);
                                if ("" !== g && r.call(n)[h] !== g && !0 !== v.match.optionalQuantifier && !0 !== v.match.newBlockMarker || !s.call(n, h, c.keepStatic, !0) && v.match.def === g) {
                                    var k = l.call(n, h);
                                    (d >= k || d === h) && (h = k);
                                }
                                e.end = e.begin = h;
                            }
                        }
                        return e;
                    }
                }, t.getBuffer = r, t.getBufferTemplate = function() {
                    var e = this.maskset;
                    void 0 === e._buffer && (e._buffer = a.getMaskTemplate.call(this, !1, 1), void 0 === e.buffer && (e.buffer = e._buffer.slice()));
                    return e._buffer;
                }, t.getLastValidPosition = o, t.isMask = s, t.resetMaskSet = function(e) {
                    var t = this.maskset;
                    t.buffer = void 0, !0 !== e && (t.validPositions = {}, t.p = 0);
                }, t.seekNext = l, t.seekPrevious = function(e, t) {
                    var i = this, n = e - 1;
                    if (e <= 0) return 0;
                    for (;n > 0 && (!0 === t && (!0 !== a.getTest.call(i, n).match.newBlockMarker || !s.call(i, n, void 0, !0)) || !0 !== t && !s.call(i, n, void 0, !0)); ) n--;
                    return n;
                }, t.translatePosition = u;
                var a = i(4713), n = i(7215);
                function r(e) {
                    var t = this.maskset;
                    return void 0 !== t.buffer && !0 !== e || (t.buffer = a.getMaskTemplate.call(this, !0, o.call(this), !0), 
                    void 0 === t._buffer && (t._buffer = t.buffer.slice())), t.buffer;
                }
                function o(e, t, i) {
                    var a = this.maskset, n = -1, r = -1, o = i || a.validPositions;
                    for (var s in void 0 === e && (e = -1), o) {
                        var l = parseInt(s);
                        o[l] && (t || !0 !== o[l].generatedInput) && (l <= e && (n = l), l >= e && (r = l));
                    }
                    return -1 === n || n == e ? r : -1 == r || e - n < r - e ? n : r;
                }
                function s(e, t, i) {
                    var n = this, r = this.maskset, o = a.getTestTemplate.call(n, e).match;
                    if ("" === o.def && (o = a.getTest.call(n, e).match), !0 !== o.static) return o.fn;
                    if (!0 === i && void 0 !== r.validPositions[e] && !0 !== r.validPositions[e].generatedInput) return !0;
                    if (!0 !== t && e > -1) {
                        if (i) {
                            var s = a.getTests.call(n, e);
                            return s.length > 1 + ("" === s[s.length - 1].match.def ? 1 : 0);
                        }
                        var l = a.determineTestTemplate.call(n, e, a.getTests.call(n, e)), u = a.getPlaceholder.call(n, e, l.match);
                        return l.match.def !== u;
                    }
                    return !1;
                }
                function l(e, t, i) {
                    var n = this;
                    void 0 === i && (i = !0);
                    for (var r = e + 1; "" !== a.getTest.call(n, r).match.def && (!0 === t && (!0 !== a.getTest.call(n, r).match.newBlockMarker || !s.call(n, r, void 0, !0)) || !0 !== t && !s.call(n, r, void 0, i)); ) r++;
                    return r;
                }
                function u(e) {
                    var t = this.opts, i = this.el;
                    return !this.isRTL || "number" != typeof e || t.greedy && "" === t.placeholder || !i || (e = Math.abs(this._valueGet().length - e)), 
                    e;
                }
            },
            4713: function(e, t, i) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.determineTestTemplate = u, t.getDecisionTaker = o, t.getMaskTemplate = function(e, t, i, a, n) {
                    var r = this, o = this.opts, c = this.maskset, f = o.greedy;
                    n && o.greedy && (o.greedy = !1, r.maskset.tests = {});
                    t = t || 0;
                    var p, h, m, v, g = [], k = 0;
                    do {
                        if (!0 === e && c.validPositions[k]) m = n && c.validPositions[k].match.optionality && void 0 === c.validPositions[k + 1] && (!0 === c.validPositions[k].generatedInput || c.validPositions[k].input == o.skipOptionalPartCharacter && k > 0) ? u.call(r, k, d.call(r, k, p, k - 1)) : c.validPositions[k], 
                        h = m.match, p = m.locator.slice(), g.push(!0 === i ? m.input : !1 === i ? h.nativeDef : s.call(r, k, h)); else {
                            m = l.call(r, k, p, k - 1), h = m.match, p = m.locator.slice();
                            var y = !0 !== a && (!1 !== o.jitMasking ? o.jitMasking : h.jit);
                            (v = (v && h.static && h.def !== o.groupSeparator && null === h.fn || c.validPositions[k - 1] && h.static && h.def !== o.groupSeparator && null === h.fn) && c.tests[k] && 1 === c.tests[k].length) || !1 === y || void 0 === y || "number" == typeof y && isFinite(y) && y > k ? g.push(!1 === i ? h.nativeDef : s.call(r, k, h)) : v = !1;
                        }
                        k++;
                    } while (!0 !== h.static || "" !== h.def || t > k);
                    "" === g[g.length - 1] && g.pop();
                    !1 === i && void 0 !== c.maskLength || (c.maskLength = k - 1);
                    return o.greedy = f, g;
                }, t.getPlaceholder = s, t.getTest = c, t.getTestTemplate = l, t.getTests = d, t.isSubsetOf = f;
                var a, n = (a = i(2394)) && a.__esModule ? a : {
                    default: a
                };
                function r(e, t) {
                    var i = (null != e.alternation ? e.mloc[o(e)] : e.locator).join("");
                    if ("" !== i) for (;i.length < t; ) i += "0";
                    return i;
                }
                function o(e) {
                    var t = e.locator[e.alternation];
                    return "string" == typeof t && t.length > 0 && (t = t.split(",")[0]), void 0 !== t ? t.toString() : "";
                }
                function s(e, t, i) {
                    var a = this.opts, n = this.maskset;
                    if (void 0 !== (t = t || c.call(this, e).match).placeholder || !0 === i) return "function" == typeof t.placeholder ? t.placeholder(a) : t.placeholder;
                    if (!0 === t.static) {
                        if (e > -1 && void 0 === n.validPositions[e]) {
                            var r, o = d.call(this, e), s = [];
                            if (o.length > 1 + ("" === o[o.length - 1].match.def ? 1 : 0)) for (var l = 0; l < o.length; l++) if ("" !== o[l].match.def && !0 !== o[l].match.optionality && !0 !== o[l].match.optionalQuantifier && (!0 === o[l].match.static || void 0 === r || !1 !== o[l].match.fn.test(r.match.def, n, e, !0, a)) && (s.push(o[l]), 
                            !0 === o[l].match.static && (r = o[l]), s.length > 1 && /[0-9a-bA-Z]/.test(s[0].match.def))) return a.placeholder.charAt(e % a.placeholder.length);
                        }
                        return t.def;
                    }
                    return a.placeholder.charAt(e % a.placeholder.length);
                }
                function l(e, t, i) {
                    return this.maskset.validPositions[e] || u.call(this, e, d.call(this, e, t ? t.slice() : t, i));
                }
                function u(e, t) {
                    var i = this.opts, a = function(e, t) {
                        var i = 0, a = !1;
                        t.forEach((function(e) {
                            e.match.optionality && (0 !== i && i !== e.match.optionality && (a = !0), (0 === i || i > e.match.optionality) && (i = e.match.optionality));
                        })), i && (0 == e || 1 == t.length ? i = 0 : a || (i = 0));
                        return i;
                    }(e, t);
                    e = e > 0 ? e - 1 : 0;
                    var n, o, s, l = r(c.call(this, e));
                    i.greedy && t.length > 1 && "" === t[t.length - 1].match.def && t.pop();
                    for (var u = 0; u < t.length; u++) {
                        var f = t[u];
                        n = r(f, l.length);
                        var d = Math.abs(n - l);
                        (void 0 === o || "" !== n && d < o || s && !i.greedy && s.match.optionality && s.match.optionality - a > 0 && "master" === s.match.newBlockMarker && (!f.match.optionality || f.match.optionality - a < 1 || !f.match.newBlockMarker) || s && !i.greedy && s.match.optionalQuantifier && !f.match.optionalQuantifier) && (o = d, 
                        s = f);
                    }
                    return s;
                }
                function c(e, t) {
                    var i = this.maskset;
                    return i.validPositions[e] ? i.validPositions[e] : (t || d.call(this, e))[0];
                }
                function f(e, t, i) {
                    function a(e) {
                        for (var t, i = [], a = -1, n = 0, r = e.length; n < r; n++) if ("-" === e.charAt(n)) for (t = e.charCodeAt(n + 1); ++a < t; ) i.push(String.fromCharCode(a)); else a = e.charCodeAt(n), 
                        i.push(e.charAt(n));
                        return i.join("");
                    }
                    return e.match.def === t.match.nativeDef || !(!(i.regex || e.match.fn instanceof RegExp && t.match.fn instanceof RegExp) || !0 === e.match.static || !0 === t.match.static) && -1 !== a(t.match.fn.toString().replace(/[[\]/]/g, "")).indexOf(a(e.match.fn.toString().replace(/[[\]/]/g, "")));
                }
                function d(e, t, i) {
                    var a, r, o = this, s = this.dependencyLib, l = this.maskset, c = this.opts, d = this.el, p = l.maskToken, h = t ? i : 0, m = t ? t.slice() : [ 0 ], v = [], g = !1, k = t ? t.join("") : "";
                    function y(t, i, r, o) {
                        function s(r, o, u) {
                            function p(e, t) {
                                var i = 0 === t.matches.indexOf(e);
                                return i || t.matches.every((function(a, n) {
                                    return !0 === a.isQuantifier ? i = p(e, t.matches[n - 1]) : Object.prototype.hasOwnProperty.call(a, "matches") && (i = p(e, a)), 
                                    !i;
                                })), i;
                            }
                            function m(e, t, i) {
                                var a, n;
                                if ((l.tests[e] || l.validPositions[e]) && (l.tests[e] || [ l.validPositions[e] ]).every((function(e, r) {
                                    if (e.mloc[t]) return a = e, !1;
                                    var o = void 0 !== i ? i : e.alternation, s = void 0 !== e.locator[o] ? e.locator[o].toString().indexOf(t) : -1;
                                    return (void 0 === n || s < n) && -1 !== s && (a = e, n = s), !0;
                                })), a) {
                                    var r = a.locator[a.alternation];
                                    return (a.mloc[t] || a.mloc[r] || a.locator).slice((void 0 !== i ? i : a.alternation) + 1);
                                }
                                return void 0 !== i ? m(e, t) : void 0;
                            }
                            function b(e, t) {
                                var i = e.alternation, a = void 0 === t || i === t.alternation && -1 === e.locator[i].toString().indexOf(t.locator[i]);
                                if (!a && i > t.alternation) for (var n = t.alternation; n < i; n++) if (e.locator[n] !== t.locator[n]) {
                                    i = n, a = !0;
                                    break;
                                }
                                if (a) {
                                    e.mloc = e.mloc || {};
                                    var r = e.locator[i];
                                    if (void 0 !== r) {
                                        if ("string" == typeof r && (r = r.split(",")[0]), void 0 === e.mloc[r] && (e.mloc[r] = e.locator.slice()), 
                                        void 0 !== t) {
                                            for (var o in t.mloc) "string" == typeof o && (o = o.split(",")[0]), void 0 === e.mloc[o] && (e.mloc[o] = t.mloc[o]);
                                            e.locator[i] = Object.keys(e.mloc).join(",");
                                        }
                                        return !0;
                                    }
                                    e.alternation = void 0;
                                }
                                return !1;
                            }
                            function x(e, t) {
                                if (e.locator.length !== t.locator.length) return !1;
                                for (var i = e.alternation + 1; i < e.locator.length; i++) if (e.locator[i] !== t.locator[i]) return !1;
                                return !0;
                            }
                            if (h > e + c._maxTestPos) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + l.mask;
                            if (h === e && void 0 === r.matches) {
                                if (v.push({
                                    match: r,
                                    locator: o.reverse(),
                                    cd: k,
                                    mloc: {}
                                }), !r.optionality || void 0 !== u || !(c.definitions && c.definitions[r.nativeDef] && c.definitions[r.nativeDef].optional || n.default.prototype.definitions[r.nativeDef] && n.default.prototype.definitions[r.nativeDef].optional)) return !0;
                                g = !0, h = e;
                            } else if (void 0 !== r.matches) {
                                if (r.isGroup && u !== r) {
                                    if (r = s(t.matches[t.matches.indexOf(r) + 1], o, u)) return !0;
                                } else if (r.isOptional) {
                                    var P = r, E = v.length;
                                    if (r = y(r, i, o, u)) {
                                        if (v.forEach((function(e, t) {
                                            t >= E && (e.match.optionality = e.match.optionality ? e.match.optionality + 1 : 1);
                                        })), a = v[v.length - 1].match, void 0 !== u || !p(a, P)) return !0;
                                        g = !0, h = e;
                                    }
                                } else if (r.isAlternator) {
                                    var S, w = r, _ = [], M = v.slice(), O = o.length, T = !1, A = i.length > 0 ? i.shift() : -1;
                                    if (-1 === A || "string" == typeof A) {
                                        var C, D = h, j = i.slice(), B = [];
                                        if ("string" == typeof A) B = A.split(","); else for (C = 0; C < w.matches.length; C++) B.push(C.toString());
                                        if (void 0 !== l.excludes[e]) {
                                            for (var R = B.slice(), L = 0, I = l.excludes[e].length; L < I; L++) {
                                                var F = l.excludes[e][L].toString().split(":");
                                                o.length == F[1] && B.splice(B.indexOf(F[0]), 1);
                                            }
                                            0 === B.length && (delete l.excludes[e], B = R);
                                        }
                                        (!0 === c.keepStatic || isFinite(parseInt(c.keepStatic)) && D >= c.keepStatic) && (B = B.slice(0, 1));
                                        for (var N = 0; N < B.length; N++) {
                                            C = parseInt(B[N]), v = [], i = "string" == typeof A && m(h, C, O) || j.slice();
                                            var V = w.matches[C];
                                            if (V && s(V, [ C ].concat(o), u)) r = !0; else if (0 === N && (T = !0), V && V.matches && V.matches.length > w.matches[0].matches.length) break;
                                            S = v.slice(), h = D, v = [];
                                            for (var G = 0; G < S.length; G++) {
                                                var H = S[G], K = !1;
                                                H.match.jit = H.match.jit || T, H.alternation = H.alternation || O, b(H);
                                                for (var U = 0; U < _.length; U++) {
                                                    var $ = _[U];
                                                    if ("string" != typeof A || void 0 !== H.alternation && B.includes(H.locator[H.alternation].toString())) {
                                                        if (H.match.nativeDef === $.match.nativeDef) {
                                                            K = !0, b($, H);
                                                            break;
                                                        }
                                                        if (f(H, $, c)) {
                                                            b(H, $) && (K = !0, _.splice(_.indexOf($), 0, H));
                                                            break;
                                                        }
                                                        if (f($, H, c)) {
                                                            b($, H);
                                                            break;
                                                        }
                                                        if (Z = $, !0 === (W = H).match.static && !0 !== Z.match.static && Z.match.fn.test(W.match.def, l, e, !1, c, !1)) {
                                                            x(H, $) || void 0 !== d.inputmask.userOptions.keepStatic ? b(H, $) && (K = !0, _.splice(_.indexOf($), 0, H)) : c.keepStatic = !0;
                                                            break;
                                                        }
                                                    }
                                                }
                                                K || _.push(H);
                                            }
                                        }
                                        v = M.concat(_), h = e, g = v.length > 0, r = _.length > 0, i = j.slice();
                                    } else r = s(w.matches[A] || t.matches[A], [ A ].concat(o), u);
                                    if (r) return !0;
                                } else if (r.isQuantifier && u !== t.matches[t.matches.indexOf(r) - 1]) for (var q = r, z = i.length > 0 ? i.shift() : 0; z < (isNaN(q.quantifier.max) ? z + 1 : q.quantifier.max) && h <= e; z++) {
                                    var Q = t.matches[t.matches.indexOf(q) - 1];
                                    if (r = s(Q, [ z ].concat(o), Q)) {
                                        if ((a = v[v.length - 1].match).optionalQuantifier = z >= q.quantifier.min, a.jit = (z + 1) * (Q.matches.indexOf(a) + 1) > q.quantifier.jit, 
                                        a.optionalQuantifier && p(a, Q)) {
                                            g = !0, h = e;
                                            break;
                                        }
                                        return a.jit && (l.jitOffset[e] = Q.matches.length - Q.matches.indexOf(a)), !0;
                                    }
                                } else if (r = y(r, i, o, u)) return !0;
                            } else h++;
                            var W, Z;
                        }
                        for (var u = i.length > 0 ? i.shift() : 0; u < t.matches.length; u++) if (!0 !== t.matches[u].isQuantifier) {
                            var p = s(t.matches[u], [ u ].concat(r), o);
                            if (p && h === e) return p;
                            if (h > e) break;
                        }
                    }
                    if (e > -1) {
                        if (void 0 === t) {
                            for (var b, x = e - 1; void 0 === (b = l.validPositions[x] || l.tests[x]) && x > -1; ) x--;
                            void 0 !== b && x > -1 && (m = function(e, t) {
                                var i, a = [];
                                return Array.isArray(t) || (t = [ t ]), t.length > 0 && (void 0 === t[0].alternation || !0 === c.keepStatic ? 0 === (a = u.call(o, e, t.slice()).locator.slice()).length && (a = t[0].locator.slice()) : t.forEach((function(e) {
                                    "" !== e.def && (0 === a.length ? (i = e.alternation, a = e.locator.slice()) : e.locator[i] && -1 === a[i].toString().indexOf(e.locator[i]) && (a[i] += "," + e.locator[i]));
                                }))), a;
                            }(x, b), k = m.join(""), h = x);
                        }
                        if (l.tests[e] && l.tests[e][0].cd === k) return l.tests[e];
                        for (var P = m.shift(); P < p.length; P++) {
                            if (y(p[P], m, [ P ]) && h === e || h > e) break;
                        }
                    }
                    return (0 === v.length || g) && v.push({
                        match: {
                            fn: null,
                            static: !0,
                            optionality: !1,
                            casing: null,
                            def: "",
                            placeholder: ""
                        },
                        locator: [],
                        mloc: {},
                        cd: k
                    }), void 0 !== t && l.tests[e] ? r = s.extend(!0, [], v) : (l.tests[e] = s.extend(!0, [], v), 
                    r = l.tests[e]), v.forEach((function(e) {
                        e.match.optionality = !1;
                    })), r;
                }
            },
            7215: function(e, t, i) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.alternate = l, t.checkAlternationMatch = function(e, t, i) {
                    for (var a, n = this.opts.greedy ? t : t.slice(0, 1), r = !1, o = void 0 !== i ? i.split(",") : [], s = 0; s < o.length; s++) -1 !== (a = e.indexOf(o[s])) && e.splice(a, 1);
                    for (var l = 0; l < e.length; l++) if (n.includes(e[l])) {
                        r = !0;
                        break;
                    }
                    return r;
                }, t.handleRemove = function(e, t, i, a, s) {
                    var u = this, c = this.maskset, f = this.opts;
                    if ((f.numericInput || u.isRTL) && (t === r.default.BACKSPACE ? t = r.default.DELETE : t === r.default.DELETE && (t = r.default.BACKSPACE), 
                    u.isRTL)) {
                        var d = i.end;
                        i.end = i.begin, i.begin = d;
                    }
                    var p, h = o.getLastValidPosition.call(u, void 0, !0);
                    i.end >= o.getBuffer.call(u).length && h >= i.end && (i.end = h + 1);
                    t === r.default.BACKSPACE ? i.end - i.begin < 1 && (i.begin = o.seekPrevious.call(u, i.begin)) : t === r.default.DELETE && i.begin === i.end && (i.end = o.isMask.call(u, i.end, !0, !0) ? i.end + 1 : o.seekNext.call(u, i.end) + 1);
                    if (!1 !== (p = v.call(u, i))) {
                        if (!0 !== a && !1 !== f.keepStatic || null !== f.regex && -1 !== n.getTest.call(u, i.begin).match.def.indexOf("|")) {
                            var m = l.call(u, !0);
                            if (m) {
                                var g = void 0 !== m.caret ? m.caret : m.pos ? o.seekNext.call(u, m.pos.begin ? m.pos.begin : m.pos) : o.getLastValidPosition.call(u, -1, !0);
                                (t !== r.default.DELETE || i.begin > g) && i.begin;
                            }
                        }
                        !0 !== a && (c.p = t === r.default.DELETE ? i.begin + p : i.begin, c.p = o.determineNewCaretPosition.call(u, {
                            begin: c.p,
                            end: c.p
                        }, !1, !1 === f.insertMode && t === r.default.BACKSPACE ? "none" : void 0).begin);
                    }
                }, t.isComplete = c, t.isSelection = f, t.isValid = d, t.refreshFromBuffer = h, 
                t.revalidateMask = v;
                var a, n = i(4713), r = (a = i(5581)) && a.__esModule ? a : {
                    default: a
                }, o = i(8711), s = i(6030);
                function l(e, t, i, a, r, s) {
                    var u, c, f, p, h, m, v, g, k, y, b, x = this, P = this.dependencyLib, E = this.opts, S = x.maskset, w = P.extend(!0, {}, S.validPositions), _ = P.extend(!0, {}, S.tests), M = !1, O = !1, T = void 0 !== r ? r : o.getLastValidPosition.call(x);
                    if (s && (y = s.begin, b = s.end, s.begin > s.end && (y = s.end, b = s.begin)), 
                    -1 === T && void 0 === r) u = 0, c = (p = n.getTest.call(x, u)).alternation; else for (;T >= 0; T--) if ((f = S.validPositions[T]) && void 0 !== f.alternation) {
                        if (p && p.locator[f.alternation] !== f.locator[f.alternation]) break;
                        u = T, c = S.validPositions[u].alternation, p = f;
                    }
                    if (void 0 !== c) {
                        v = parseInt(u), S.excludes[v] = S.excludes[v] || [], !0 !== e && S.excludes[v].push((0, 
                        n.getDecisionTaker)(p) + ":" + p.alternation);
                        var A = [], C = -1;
                        for (h = v; h < o.getLastValidPosition.call(x, void 0, !0) + 1; h++) -1 === C && e <= h && void 0 !== t && (A.push(t), 
                        C = A.length - 1), (m = S.validPositions[h]) && !0 !== m.generatedInput && (void 0 === s || h < y || h >= b) && A.push(m.input), 
                        delete S.validPositions[h];
                        for (-1 === C && void 0 !== t && (A.push(t), C = A.length - 1); void 0 !== S.excludes[v] && S.excludes[v].length < 10; ) {
                            for (S.tests = {}, o.resetMaskSet.call(x, !0), M = !0, h = 0; h < A.length && (g = M.caret || o.getLastValidPosition.call(x, void 0, !0) + 1, 
                            k = A[h], M = d.call(x, g, k, !1, a, !0)); h++) h === C && (O = M), 1 == e && M && (O = {
                                caretPos: h
                            });
                            if (M) break;
                            if (o.resetMaskSet.call(x), p = n.getTest.call(x, v), S.validPositions = P.extend(!0, {}, w), 
                            S.tests = P.extend(!0, {}, _), !S.excludes[v]) {
                                O = l.call(x, e, t, i, a, v - 1, s);
                                break;
                            }
                            var D = (0, n.getDecisionTaker)(p);
                            if (-1 !== S.excludes[v].indexOf(D + ":" + p.alternation)) {
                                O = l.call(x, e, t, i, a, v - 1, s);
                                break;
                            }
                            for (S.excludes[v].push(D + ":" + p.alternation), h = v; h < o.getLastValidPosition.call(x, void 0, !0) + 1; h++) delete S.validPositions[h];
                        }
                    }
                    return O && !1 === E.keepStatic || delete S.excludes[v], O;
                }
                function u(e, t, i) {
                    var a = this.opts, n = this.maskset;
                    switch (a.casing || t.casing) {
                      case "upper":
                        e = e.toUpperCase();
                        break;

                      case "lower":
                        e = e.toLowerCase();
                        break;

                      case "title":
                        var o = n.validPositions[i - 1];
                        e = 0 === i || o && o.input === String.fromCharCode(r.default.SPACE) ? e.toUpperCase() : e.toLowerCase();
                        break;

                      default:
                        if ("function" == typeof a.casing) {
                            var s = Array.prototype.slice.call(arguments);
                            s.push(n.validPositions), e = a.casing.apply(this, s);
                        }
                    }
                    return e;
                }
                function c(e) {
                    var t = this, i = this.opts, a = this.maskset;
                    if ("function" == typeof i.isComplete) return i.isComplete(e, i);
                    if ("*" !== i.repeat) {
                        var r = !1, s = o.determineLastRequiredPosition.call(t, !0), l = o.seekPrevious.call(t, s.l);
                        if (void 0 === s.def || s.def.newBlockMarker || s.def.optionality || s.def.optionalQuantifier) {
                            r = !0;
                            for (var u = 0; u <= l; u++) {
                                var c = n.getTestTemplate.call(t, u).match;
                                if (!0 !== c.static && void 0 === a.validPositions[u] && !0 !== c.optionality && !0 !== c.optionalQuantifier || !0 === c.static && e[u] !== n.getPlaceholder.call(t, u, c)) {
                                    r = !1;
                                    break;
                                }
                            }
                        }
                        return r;
                    }
                }
                function f(e) {
                    var t = this.opts.insertMode ? 0 : 1;
                    return this.isRTL ? e.begin - e.end > t : e.end - e.begin > t;
                }
                function d(e, t, i, a, r, s, p) {
                    var g = this, k = this.dependencyLib, y = this.opts, b = g.maskset;
                    i = !0 === i;
                    var x = e;
                    function P(e) {
                        if (void 0 !== e) {
                            if (void 0 !== e.remove && (Array.isArray(e.remove) || (e.remove = [ e.remove ]), 
                            e.remove.sort((function(e, t) {
                                return t.pos - e.pos;
                            })).forEach((function(e) {
                                v.call(g, {
                                    begin: e,
                                    end: e + 1
                                });
                            })), e.remove = void 0), void 0 !== e.insert && (Array.isArray(e.insert) || (e.insert = [ e.insert ]), 
                            e.insert.sort((function(e, t) {
                                return e.pos - t.pos;
                            })).forEach((function(e) {
                                "" !== e.c && d.call(g, e.pos, e.c, void 0 === e.strict || e.strict, void 0 !== e.fromIsValid ? e.fromIsValid : a);
                            })), e.insert = void 0), e.refreshFromBuffer && e.buffer) {
                                var t = e.refreshFromBuffer;
                                h.call(g, !0 === t ? t : t.start, t.end, e.buffer), e.refreshFromBuffer = void 0;
                            }
                            void 0 !== e.rewritePosition && (x = e.rewritePosition, e = !0);
                        }
                        return e;
                    }
                    function E(t, i, r) {
                        var s = !1;
                        return n.getTests.call(g, t).every((function(l, c) {
                            var d = l.match;
                            if (o.getBuffer.call(g, !0), !1 !== (s = (!d.jit || void 0 !== b.validPositions[o.seekPrevious.call(g, t)]) && (null != d.fn ? d.fn.test(i, b, t, r, y, f.call(g, e)) : (i === d.def || i === y.skipOptionalPartCharacter) && "" !== d.def && {
                                c: n.getPlaceholder.call(g, t, d, !0) || d.def,
                                pos: t
                            }))) {
                                var p = void 0 !== s.c ? s.c : i, h = t;
                                return p = p === y.skipOptionalPartCharacter && !0 === d.static ? n.getPlaceholder.call(g, t, d, !0) || d.def : p, 
                                !0 !== (s = P(s)) && void 0 !== s.pos && s.pos !== t && (h = s.pos), !0 !== s && void 0 === s.pos && void 0 === s.c ? !1 : (!1 === v.call(g, e, k.extend({}, l, {
                                    input: u.call(g, p, d, h)
                                }), a, h) && (s = !1), !1);
                            }
                            return !0;
                        })), s;
                    }
                    void 0 !== e.begin && (x = g.isRTL ? e.end : e.begin);
                    var S = !0, w = k.extend(!0, {}, b.validPositions);
                    if (!1 === y.keepStatic && void 0 !== b.excludes[x] && !0 !== r && !0 !== a) for (var _ = x; _ < (g.isRTL ? e.begin : e.end); _++) void 0 !== b.excludes[_] && (b.excludes[_] = void 0, 
                    delete b.tests[_]);
                    if ("function" == typeof y.preValidation && !0 !== a && !0 !== s && (S = P(S = y.preValidation.call(g, o.getBuffer.call(g), x, t, f.call(g, e), y, b, e, i || r))), 
                    !0 === S) {
                        if (S = E(x, t, i), (!i || !0 === a) && !1 === S && !0 !== s) {
                            var M = b.validPositions[x];
                            if (!M || !0 !== M.match.static || M.match.def !== t && t !== y.skipOptionalPartCharacter) {
                                if (y.insertMode || void 0 === b.validPositions[o.seekNext.call(g, x)] || e.end > x) {
                                    var O = !1;
                                    if (b.jitOffset[x] && void 0 === b.validPositions[o.seekNext.call(g, x)] && !1 !== (S = d.call(g, x + b.jitOffset[x], t, !0, !0)) && (!0 !== r && (S.caret = x), 
                                    O = !0), e.end > x && (b.validPositions[x] = void 0), !O && !o.isMask.call(g, x, y.keepStatic && 0 === x)) for (var T = x + 1, A = o.seekNext.call(g, x, !1, 0 !== x); T <= A; T++) if (!1 !== (S = E(T, t, i))) {
                                        S = m.call(g, x, void 0 !== S.pos ? S.pos : T) || S, x = T;
                                        break;
                                    }
                                }
                            } else S = {
                                caret: o.seekNext.call(g, x)
                            };
                        }
                        !1 !== S || !y.keepStatic || !c.call(g, o.getBuffer.call(g)) && 0 !== x || i || !0 === r ? f.call(g, e) && b.tests[x] && b.tests[x].length > 1 && y.keepStatic && !i && !0 !== r && (S = l.call(g, !0)) : S = l.call(g, x, t, i, a, void 0, e), 
                        !0 === S && (S = {
                            pos: x
                        });
                    }
                    if ("function" == typeof y.postValidation && !0 !== a && !0 !== s) {
                        var C = y.postValidation.call(g, o.getBuffer.call(g, !0), void 0 !== e.begin ? g.isRTL ? e.end : e.begin : e, t, S, y, b, i, p);
                        void 0 !== C && (S = !0 === C ? S : C);
                    }
                    S && void 0 === S.pos && (S.pos = x), !1 === S || !0 === s ? (o.resetMaskSet.call(g, !0), 
                    b.validPositions = k.extend(!0, {}, w)) : m.call(g, void 0, x, !0);
                    var D = P(S);
                    void 0 !== g.maxLength && (o.getBuffer.call(g).length > g.maxLength && !a && (o.resetMaskSet.call(g, !0), 
                    b.validPositions = k.extend(!0, {}, w), D = !1));
                    return D;
                }
                function p(e, t, i) {
                    for (var a = this.maskset, r = !1, o = n.getTests.call(this, e), s = 0; s < o.length; s++) {
                        if (o[s].match && (o[s].match.nativeDef === t.match[i.shiftPositions ? "def" : "nativeDef"] && (!i.shiftPositions || !t.match.static) || o[s].match.nativeDef === t.match.nativeDef || i.regex && !o[s].match.static && o[s].match.fn.test(t.input))) {
                            r = !0;
                            break;
                        }
                        if (o[s].match && o[s].match.def === t.match.nativeDef) {
                            r = void 0;
                            break;
                        }
                    }
                    return !1 === r && void 0 !== a.jitOffset[e] && (r = p.call(this, e + a.jitOffset[e], t, i)), 
                    r;
                }
                function h(e, t, i) {
                    var a, n, r = this, l = this.maskset, u = this.opts, c = this.dependencyLib, f = u.skipOptionalPartCharacter, d = r.isRTL ? i.slice().reverse() : i;
                    if (u.skipOptionalPartCharacter = "", !0 === e) o.resetMaskSet.call(r), l.tests = {}, 
                    e = 0, t = i.length, n = o.determineNewCaretPosition.call(r, {
                        begin: 0,
                        end: 0
                    }, !1).begin; else {
                        for (a = e; a < t; a++) delete l.validPositions[a];
                        n = e;
                    }
                    var p = new c.Event("keypress");
                    for (a = e; a < t; a++) {
                        p.keyCode = d[a].toString().charCodeAt(0), r.ignorable = !1;
                        var h = s.EventHandlers.keypressEvent.call(r, p, !0, !1, !1, n);
                        !1 !== h && void 0 !== h && (n = h.forwardPosition);
                    }
                    u.skipOptionalPartCharacter = f;
                }
                function m(e, t, i) {
                    var a = this, r = this.maskset, s = this.dependencyLib;
                    if (void 0 === e) for (e = t - 1; e > 0 && !r.validPositions[e]; e--) ;
                    for (var l = e; l < t; l++) {
                        if (void 0 === r.validPositions[l] && !o.isMask.call(a, l, !1)) if (0 == l ? n.getTest.call(a, l) : r.validPositions[l - 1]) {
                            var u = n.getTests.call(a, l).slice();
                            "" === u[u.length - 1].match.def && u.pop();
                            var c, f = n.determineTestTemplate.call(a, l, u);
                            if (f && (!0 !== f.match.jit || "master" === f.match.newBlockMarker && (c = r.validPositions[l + 1]) && !0 === c.match.optionalQuantifier) && ((f = s.extend({}, f, {
                                input: n.getPlaceholder.call(a, l, f.match, !0) || f.match.def
                            })).generatedInput = !0, v.call(a, l, f, !0), !0 !== i)) {
                                var p = r.validPositions[t].input;
                                return r.validPositions[t] = void 0, d.call(a, t, p, !0, !0);
                            }
                        }
                    }
                }
                function v(e, t, i, a) {
                    var r = this, s = this.maskset, l = this.opts, u = this.dependencyLib;
                    function c(e, t, i) {
                        var a = t[e];
                        if (void 0 !== a && !0 === a.match.static && !0 !== a.match.optionality && (void 0 === t[0] || void 0 === t[0].alternation)) {
                            var n = i.begin <= e - 1 ? t[e - 1] && !0 === t[e - 1].match.static && t[e - 1] : t[e - 1], r = i.end > e + 1 ? t[e + 1] && !0 === t[e + 1].match.static && t[e + 1] : t[e + 1];
                            return n && r;
                        }
                        return !1;
                    }
                    var f = 0, h = void 0 !== e.begin ? e.begin : e, m = void 0 !== e.end ? e.end : e, v = !0;
                    if (e.begin > e.end && (h = e.end, m = e.begin), a = void 0 !== a ? a : h, h !== m || l.insertMode && void 0 !== s.validPositions[a] && void 0 === i || void 0 === t || t.match.optionalQuantifier || t.match.optionality) {
                        var g, k = u.extend(!0, {}, s.validPositions), y = o.getLastValidPosition.call(r, void 0, !0);
                        for (s.p = h, g = y; g >= h; g--) delete s.validPositions[g], void 0 === t && delete s.tests[g + 1];
                        var b, x, P = a, E = P;
                        for (t && (s.validPositions[a] = u.extend(!0, {}, t), E++, P++), g = t ? m : m - 1; g <= y; g++) {
                            if (void 0 !== (b = k[g]) && !0 !== b.generatedInput && (g >= m || g >= h && c(g, k, {
                                begin: h,
                                end: m
                            }))) {
                                for (;"" !== n.getTest.call(r, E).match.def; ) {
                                    if (!1 !== (x = p.call(r, E, b, l)) || "+" === b.match.def) {
                                        "+" === b.match.def && o.getBuffer.call(r, !0);
                                        var S = d.call(r, E, b.input, "+" !== b.match.def, !0);
                                        if (v = !1 !== S, P = (S.pos || E) + 1, !v && x) break;
                                    } else v = !1;
                                    if (v) {
                                        void 0 === t && b.match.static && g === e.begin && f++;
                                        break;
                                    }
                                    if (!v && o.getBuffer.call(r), E > s.maskLength) break;
                                    E++;
                                }
                                "" == n.getTest.call(r, E).match.def && (v = !1), E = P;
                            }
                            if (!v) break;
                        }
                        if (!v) return s.validPositions = u.extend(!0, {}, k), o.resetMaskSet.call(r, !0), 
                        !1;
                    } else t && n.getTest.call(r, a).match.cd === t.match.cd && (s.validPositions[a] = u.extend(!0, {}, t));
                    return o.resetMaskSet.call(r, !0), f;
                }
            },
            2047: function(t) {
                t.exports = e;
            },
            5581: function(e) {
                e.exports = JSON.parse('{"BACKSPACE":8,"BACKSPACE_SAFARI":127,"DELETE":46,"DOWN":40,"END":35,"ENTER":13,"ESCAPE":27,"HOME":36,"INSERT":45,"LEFT":37,"PAGE_DOWN":34,"PAGE_UP":33,"RIGHT":39,"SPACE":32,"TAB":9,"UP":38,"X":88,"Z":90,"CONTROL":17,"PAUSE/BREAK":19,"WINDOWS_LEFT":91,"WINDOWS_RIGHT":92,"KEY_229":229}');
            }
        }, i = {};
        function a(e) {
            var n = i[e];
            if (void 0 !== n) return n.exports;
            var r = i[e] = {
                exports: {}
            };
            return t[e](r, r.exports, a), r.exports;
        }
        var n = {};
        return function() {
            var e = n;
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var t, i = (t = a(3046)) && t.__esModule ? t : {
                default: t
            };
            a(443);
            var r = i.default;
            e.default = r;
        }(), n;
    }();
}));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbnB1dG1hc2suanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBkaXN0L2pxdWVyeS5pbnB1dG1hc2tcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvSW5wdXRtYXNrXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTAgLSAyMDIxIFJvYmluIEhlcmJvdHNcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogVmVyc2lvbjogNS4wLjdcbiAqL1xuIWZ1bmN0aW9uKGUsIHQpIHtcbiAgICBpZiAoXCJvYmplY3RcIiA9PSB0eXBlb2YgZXhwb3J0cyAmJiBcIm9iamVjdFwiID09IHR5cGVvZiBtb2R1bGUpIG1vZHVsZS5leHBvcnRzID0gdChyZXF1aXJlKFwianF1ZXJ5XCIpKTsgZWxzZSBpZiAoXCJmdW5jdGlvblwiID09IHR5cGVvZiBkZWZpbmUgJiYgZGVmaW5lLmFtZCkgZGVmaW5lKFsgXCJqcXVlcnlcIiBdLCB0KTsgZWxzZSB7XG4gICAgICAgIHZhciBpID0gXCJvYmplY3RcIiA9PSB0eXBlb2YgZXhwb3J0cyA/IHQocmVxdWlyZShcImpxdWVyeVwiKSkgOiB0KGUualF1ZXJ5KTtcbiAgICAgICAgZm9yICh2YXIgYSBpbiBpKSAoXCJvYmplY3RcIiA9PSB0eXBlb2YgZXhwb3J0cyA/IGV4cG9ydHMgOiBlKVthXSA9IGlbYV07XG4gICAgfVxufShzZWxmLCAoZnVuY3Rpb24oZSkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciB0ID0ge1xuICAgICAgICAgICAgMzA0NjogZnVuY3Rpb24oZSwgdCwgaSkge1xuICAgICAgICAgICAgICAgIHZhciBhO1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LCBcIl9fZXNNb2R1bGVcIiwge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogITBcbiAgICAgICAgICAgICAgICB9KSwgdC5kZWZhdWx0ID0gdm9pZCAwLCBpKDM4NTEpLCBpKDIxOSksIGkoMjA3KSwgaSg1Mjk2KTtcbiAgICAgICAgICAgICAgICB2YXIgbiA9ICgoYSA9IGkoMjM5NCkpICYmIGEuX19lc01vZHVsZSA/IGEgOiB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IGFcbiAgICAgICAgICAgICAgICB9KS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgIHQuZGVmYXVsdCA9IG47XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgODc0MTogZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LCBcIl9fZXNNb2R1bGVcIiwge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogITBcbiAgICAgICAgICAgICAgICB9KSwgdC5kZWZhdWx0ID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIHZhciBpID0gIShcInVuZGVmaW5lZFwiID09IHR5cGVvZiB3aW5kb3cgfHwgIXdpbmRvdy5kb2N1bWVudCB8fCAhd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHQuZGVmYXVsdCA9IGk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgMzk3NjogZnVuY3Rpb24oZSwgdCwgaSkge1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LCBcIl9fZXNNb2R1bGVcIiwge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogITBcbiAgICAgICAgICAgICAgICB9KSwgdC5kZWZhdWx0ID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIHZhciBhLCBuID0gKGEgPSBpKDU1ODEpKSAmJiBhLl9fZXNNb2R1bGUgPyBhIDoge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiBhXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB2YXIgciA9IHtcbiAgICAgICAgICAgICAgICAgICAgX21heFRlc3RQb3M6IDUwMCxcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiX1wiLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25hbG1hcmtlcjogWyBcIltcIiwgXCJdXCIgXSxcbiAgICAgICAgICAgICAgICAgICAgcXVhbnRpZmllcm1hcmtlcjogWyBcIntcIiwgXCJ9XCIgXSxcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBtYXJrZXI6IFsgXCIoXCIsIFwiKVwiIF0sXG4gICAgICAgICAgICAgICAgICAgIGFsdGVybmF0b3JtYXJrZXI6IFwifFwiLFxuICAgICAgICAgICAgICAgICAgICBlc2NhcGVDaGFyOiBcIlxcXFxcIixcbiAgICAgICAgICAgICAgICAgICAgbWFzazogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG9uY29tcGxldGU6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgICAgICAgICAgICAgIG9uaW5jb21wbGV0ZTogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgICAgICAgICAgICAgb25jbGVhcmVkOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICAgICAgICAgICAgICByZXBlYXQ6IDAsXG4gICAgICAgICAgICAgICAgICAgIGdyZWVkeTogITEsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Vbm1hc2s6ICExLFxuICAgICAgICAgICAgICAgICAgICByZW1vdmVNYXNrT25TdWJtaXQ6ICExLFxuICAgICAgICAgICAgICAgICAgICBjbGVhck1hc2tPbkxvc3RGb2N1czogITAsXG4gICAgICAgICAgICAgICAgICAgIGluc2VydE1vZGU6ICEwLFxuICAgICAgICAgICAgICAgICAgICBpbnNlcnRNb2RlVmlzdWFsOiAhMCxcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiAhMSxcbiAgICAgICAgICAgICAgICAgICAgYWxpYXM6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bjogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgICAgICAgICAgICAgb25CZWZvcmVNYXNrOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvbkJlZm9yZVBhc3RlOiBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJmdW5jdGlvblwiID09IHR5cGVvZiB0Lm9uQmVmb3JlTWFzayA/IHQub25CZWZvcmVNYXNrLmNhbGwodGhpcywgZSwgdCkgOiBlO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBvbkJlZm9yZVdyaXRlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBvblVuTWFzazogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgc2hvd01hc2tPbkZvY3VzOiAhMCxcbiAgICAgICAgICAgICAgICAgICAgc2hvd01hc2tPbkhvdmVyOiAhMCxcbiAgICAgICAgICAgICAgICAgICAgb25LZXlWYWxpZGF0aW9uOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICAgICAgICAgICAgICBza2lwT3B0aW9uYWxQYXJ0Q2hhcmFjdGVyOiBcIiBcIixcbiAgICAgICAgICAgICAgICAgICAgbnVtZXJpY0lucHV0OiAhMSxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHRBbGlnbjogITEsXG4gICAgICAgICAgICAgICAgICAgIHVuZG9PbkVzY2FwZTogITAsXG4gICAgICAgICAgICAgICAgICAgIHJhZGl4UG9pbnQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIF9yYWRpeERhbmNlOiAhMSxcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBTZXBhcmF0b3I6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGtlZXBTdGF0aWM6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uQ2FyZXRPblRhYjogITAsXG4gICAgICAgICAgICAgICAgICAgIHRhYlRocm91Z2g6ICExLFxuICAgICAgICAgICAgICAgICAgICBzdXBwb3J0c0lucHV0VHlwZTogWyBcInRleHRcIiwgXCJ0ZWxcIiwgXCJ1cmxcIiwgXCJwYXNzd29yZFwiLCBcInNlYXJjaFwiIF0sXG4gICAgICAgICAgICAgICAgICAgIGlnbm9yYWJsZXM6IFsgbi5kZWZhdWx0LkJBQ0tTUEFDRSwgbi5kZWZhdWx0LlRBQiwgbi5kZWZhdWx0W1wiUEFVU0UvQlJFQUtcIl0sIG4uZGVmYXVsdC5FU0NBUEUsIG4uZGVmYXVsdC5QQUdFX1VQLCBuLmRlZmF1bHQuUEFHRV9ET1dOLCBuLmRlZmF1bHQuRU5ELCBuLmRlZmF1bHQuSE9NRSwgbi5kZWZhdWx0LkxFRlQsIG4uZGVmYXVsdC5VUCwgbi5kZWZhdWx0LlJJR0hULCBuLmRlZmF1bHQuRE9XTiwgbi5kZWZhdWx0LklOU0VSVCwgbi5kZWZhdWx0LkRFTEVURSwgOTMsIDExMiwgMTEzLCAxMTQsIDExNSwgMTE2LCAxMTcsIDExOCwgMTE5LCAxMjAsIDEyMSwgMTIyLCAxMjMsIDAsIDIyOSBdLFxuICAgICAgICAgICAgICAgICAgICBpc0NvbXBsZXRlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBwcmVWYWxpZGF0aW9uOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBwb3N0VmFsaWRhdGlvbjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljRGVmaW5pdGlvblN5bWJvbDogdm9pZCAwLFxuICAgICAgICAgICAgICAgICAgICBqaXRNYXNraW5nOiAhMSxcbiAgICAgICAgICAgICAgICAgICAgbnVsbGFibGU6ICEwLFxuICAgICAgICAgICAgICAgICAgICBpbnB1dEV2ZW50T25seTogITEsXG4gICAgICAgICAgICAgICAgICAgIG5vVmFsdWVQYXRjaGluZzogITEsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uQ2FyZXRPbkNsaWNrOiBcImx2cFwiLFxuICAgICAgICAgICAgICAgICAgICBjYXNpbmc6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGlucHV0bW9kZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydERhdGFBdHRyaWJ1dGVzOiAhMCxcbiAgICAgICAgICAgICAgICAgICAgc2hpZnRQb3NpdGlvbnM6ICEwLFxuICAgICAgICAgICAgICAgICAgICB1c2VQcm90b3R5cGVEZWZpbml0aW9uczogITAsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25FdmVudFRpbWVPdXQ6IDNlMyxcbiAgICAgICAgICAgICAgICAgICAgc3Vic3RpdHV0ZXM6IHt9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0LmRlZmF1bHQgPSByO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDczOTI6IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodCwgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICEwXG4gICAgICAgICAgICAgICAgfSksIHQuZGVmYXVsdCA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICB0LmRlZmF1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgIDk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbMC05XFx1ZmYxMC1cXHVmZjE5XVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvblN5bWJvbDogXCIqXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBcIltBLVphLXpcXHUwNDEwLVxcdTA0NGZcXHUwNDAxXFx1MDQ1MVxceGMwLVxceGZmXFx4YjVdXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uU3ltYm9sOiBcIipcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBcIipcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBcIlswLTlcXHVmZjEwLVxcdWZmMTlBLVphLXpcXHUwNDEwLVxcdTA0NGZcXHUwNDAxXFx1MDQ1MVxceGMwLVxceGZmXFx4YjVdXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgMzI4NzogZnVuY3Rpb24oZSwgdCwgaSkge1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LCBcIl9fZXNNb2R1bGVcIiwge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogITBcbiAgICAgICAgICAgICAgICB9KSwgdC5kZWZhdWx0ID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIHZhciBhLCBuID0gKGEgPSBpKDIwNDcpKSAmJiBhLl9fZXNNb2R1bGUgPyBhIDoge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiBhXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAodm9pZCAwID09PSBuLmRlZmF1bHQpIHRocm93IFwialF1ZXJ5IG5vdCBsb2FkZWQhXCI7XG4gICAgICAgICAgICAgICAgdmFyIHIgPSBuLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgdC5kZWZhdWx0ID0gcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICA5ODQ1OiBmdW5jdGlvbihlLCB0LCBpKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAhMFxuICAgICAgICAgICAgICAgIH0pLCB0LnVhID0gdC5tb2JpbGUgPSB0LmlwaG9uZSA9IHQuaWVtb2JpbGUgPSB0LmllID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIHZhciBhLCBuID0gKGEgPSBpKDkzODApKSAmJiBhLl9fZXNNb2R1bGUgPyBhIDoge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiBhXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB2YXIgciA9IG4uZGVmYXVsdC5uYXZpZ2F0b3IgJiYgbi5kZWZhdWx0Lm5hdmlnYXRvci51c2VyQWdlbnQgfHwgXCJcIiwgbyA9IHIuaW5kZXhPZihcIk1TSUUgXCIpID4gMCB8fCByLmluZGV4T2YoXCJUcmlkZW50L1wiKSA+IDAsIHMgPSBcIm9udG91Y2hzdGFydFwiIGluIG4uZGVmYXVsdCwgbCA9IC9pZW1vYmlsZS9pLnRlc3QociksIHUgPSAvaXBob25lL2kudGVzdChyKSAmJiAhbDtcbiAgICAgICAgICAgICAgICB0LmlwaG9uZSA9IHUsIHQuaWVtb2JpbGUgPSBsLCB0Lm1vYmlsZSA9IHMsIHQuaWUgPSBvLCB0LnVhID0gcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICA3MTg0OiBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAhMFxuICAgICAgICAgICAgICAgIH0pLCB0LmRlZmF1bHQgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlLnJlcGxhY2UoaSwgXCJcXFxcJDFcIik7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IG5ldyBSZWdFeHAoXCIoXFxcXFwiICsgWyBcIi9cIiwgXCIuXCIsIFwiKlwiLCBcIitcIiwgXCI/XCIsIFwifFwiLCBcIihcIiwgXCIpXCIsIFwiW1wiLCBcIl1cIiwgXCJ7XCIsIFwifVwiLCBcIlxcXFxcIiwgXCIkXCIsIFwiXlwiIF0uam9pbihcInxcXFxcXCIpICsgXCIpXCIsIFwiZ2ltXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDYwMzA6IGZ1bmN0aW9uKGUsIHQsIGkpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodCwgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICEwXG4gICAgICAgICAgICAgICAgfSksIHQuRXZlbnRIYW5kbGVycyA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICB2YXIgYSwgbiA9IGkoODcxMSksIHIgPSAoYSA9IGkoNTU4MSkpICYmIGEuX19lc01vZHVsZSA/IGEgOiB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IGFcbiAgICAgICAgICAgICAgICB9LCBvID0gaSg5ODQ1KSwgcyA9IGkoNzIxNSksIGwgPSBpKDc3NjApLCB1ID0gaSg0NzEzKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjKGUsIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBcInVuZGVmaW5lZFwiICE9IHR5cGVvZiBTeW1ib2wgJiYgZVtTeW1ib2wuaXRlcmF0b3JdIHx8IGVbXCJAQGl0ZXJhdG9yXCJdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGUpIHx8IChpID0gZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcInN0cmluZ1wiID09IHR5cGVvZiBlKSByZXR1cm4gZihlLCB0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKS5zbGljZSg4LCAtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJPYmplY3RcIiA9PT0gaSAmJiBlLmNvbnN0cnVjdG9yICYmIChpID0gZS5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJNYXBcIiA9PT0gaSB8fCBcIlNldFwiID09PSBpKSByZXR1cm4gQXJyYXkuZnJvbShlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJBcmd1bWVudHNcIiA9PT0gaSB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChpKSkgcmV0dXJuIGYoZSwgdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KGUpKSB8fCB0ICYmIGUgJiYgXCJudW1iZXJcIiA9PSB0eXBlb2YgZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpICYmIChlID0gaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGEgPSAwLCBuID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzOiBuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhID49IGUubGVuZ3RoID8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbmU6ICEwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbmU6ICExLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBlW2ErK11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGU6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGY6IG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBpdGVyYXRlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciByLCBvID0gITAsIHMgPSAhMTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBpLmNhbGwoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSBpLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbyA9IGUuZG9uZSwgZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBlOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcyA9ICEwLCByID0gZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBmOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvIHx8IG51bGwgPT0gaS5yZXR1cm4gfHwgaS5yZXR1cm4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocykgdGhyb3cgcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGYoZSwgdCkge1xuICAgICAgICAgICAgICAgICAgICAobnVsbCA9PSB0IHx8IHQgPiBlLmxlbmd0aCkgJiYgKHQgPSBlLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBhID0gbmV3IEFycmF5KHQpOyBpIDwgdDsgaSsrKSBhW2ldID0gZVtpXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBkID0ge1xuICAgICAgICAgICAgICAgICAgICBrZXlkb3duRXZlbnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcy5pbnB1dG1hc2ssIGkgPSB0Lm9wdHMsIGEgPSB0LmRlcGVuZGVuY3lMaWIsIGMgPSB0Lm1hc2tzZXQsIGYgPSB0aGlzLCBkID0gYShmKSwgcCA9IGUua2V5Q29kZSwgaCA9IG4uY2FyZXQuY2FsbCh0LCBmKSwgbSA9IGkub25LZXlEb3duLmNhbGwodGhpcywgZSwgbi5nZXRCdWZmZXIuY2FsbCh0KSwgaCwgaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodm9pZCAwICE9PSBtKSByZXR1cm4gbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwID09PSByLmRlZmF1bHQuQkFDS1NQQUNFIHx8IHAgPT09IHIuZGVmYXVsdC5ERUxFVEUgfHwgby5pcGhvbmUgJiYgcCA9PT0gci5kZWZhdWx0LkJBQ0tTUEFDRV9TQUZBUkkgfHwgZS5jdHJsS2V5ICYmIHAgPT09IHIuZGVmYXVsdC5YICYmICEoXCJvbmN1dFwiIGluIGYpKSBlLnByZXZlbnREZWZhdWx0KCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgcy5oYW5kbGVSZW1vdmUuY2FsbCh0LCBmLCBwLCBoKSwgKDAsIGwud3JpdGVCdWZmZXIpKGYsIG4uZ2V0QnVmZmVyLmNhbGwodCwgITApLCBjLnAsIGUsIGYuaW5wdXRtYXNrLl92YWx1ZUdldCgpICE9PSBuLmdldEJ1ZmZlci5jYWxsKHQpLmpvaW4oXCJcIikpOyBlbHNlIGlmIChwID09PSByLmRlZmF1bHQuRU5EIHx8IHAgPT09IHIuZGVmYXVsdC5QQUdFX0RPV04pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHYgPSBuLnNlZWtOZXh0LmNhbGwodCwgbi5nZXRMYXN0VmFsaWRQb3NpdGlvbi5jYWxsKHQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuLmNhcmV0LmNhbGwodCwgZiwgZS5zaGlmdEtleSA/IGguYmVnaW4gOiB2LCB2LCAhMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgcCA9PT0gci5kZWZhdWx0LkhPTUUgJiYgIWUuc2hpZnRLZXkgfHwgcCA9PT0gci5kZWZhdWx0LlBBR0VfVVAgPyAoZS5wcmV2ZW50RGVmYXVsdCgpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIG4uY2FyZXQuY2FsbCh0LCBmLCAwLCBlLnNoaWZ0S2V5ID8gaC5iZWdpbiA6IDAsICEwKSkgOiBpLnVuZG9PbkVzY2FwZSAmJiBwID09PSByLmRlZmF1bHQuRVNDQVBFICYmICEwICE9PSBlLmFsdEtleSA/ICgoMCwgXG4gICAgICAgICAgICAgICAgICAgICAgICBsLmNoZWNrVmFsKShmLCAhMCwgITEsIHQudW5kb1ZhbHVlLnNwbGl0KFwiXCIpKSwgZC50cmlnZ2VyKFwiY2xpY2tcIikpIDogcCAhPT0gci5kZWZhdWx0LklOU0VSVCB8fCBlLnNoaWZ0S2V5IHx8IGUuY3RybEtleSB8fCB2b2lkIDAgIT09IHQudXNlck9wdGlvbnMuaW5zZXJ0TW9kZSA/ICEwID09PSBpLnRhYlRocm91Z2ggJiYgcCA9PT0gci5kZWZhdWx0LlRBQiA/ICEwID09PSBlLnNoaWZ0S2V5ID8gKGguZW5kID0gbi5zZWVrUHJldmlvdXMuY2FsbCh0LCBoLmVuZCwgITApLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICEwID09PSB1LmdldFRlc3QuY2FsbCh0LCBoLmVuZCAtIDEpLm1hdGNoLnN0YXRpYyAmJiBoLmVuZC0tLCBoLmJlZ2luID0gbi5zZWVrUHJldmlvdXMuY2FsbCh0LCBoLmVuZCwgITApLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGguYmVnaW4gPj0gMCAmJiBoLmVuZCA+IDAgJiYgKGUucHJldmVudERlZmF1bHQoKSwgbi5jYXJldC5jYWxsKHQsIGYsIGguYmVnaW4sIGguZW5kKSkpIDogKGguYmVnaW4gPSBuLnNlZWtOZXh0LmNhbGwodCwgaC5iZWdpbiwgITApLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGguZW5kID0gbi5zZWVrTmV4dC5jYWxsKHQsIGguYmVnaW4sICEwKSwgaC5lbmQgPCBjLm1hc2tMZW5ndGggJiYgaC5lbmQtLSwgaC5iZWdpbiA8PSBjLm1hc2tMZW5ndGggJiYgKGUucHJldmVudERlZmF1bHQoKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBuLmNhcmV0LmNhbGwodCwgZiwgaC5iZWdpbiwgaC5lbmQpKSkgOiBlLnNoaWZ0S2V5IHx8IGkuaW5zZXJ0TW9kZVZpc3VhbCAmJiAhMSA9PT0gaS5pbnNlcnRNb2RlICYmIChwID09PSByLmRlZmF1bHQuUklHSFQgPyBzZXRUaW1lb3V0KChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IG4uY2FyZXQuY2FsbCh0LCBmKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuLmNhcmV0LmNhbGwodCwgZiwgZS5iZWdpbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSwgMCkgOiBwID09PSByLmRlZmF1bHQuTEVGVCAmJiBzZXRUaW1lb3V0KChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IG4udHJhbnNsYXRlUG9zaXRpb24uY2FsbCh0LCBmLmlucHV0bWFzay5jYXJldFBvcy5iZWdpbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbi50cmFuc2xhdGVQb3NpdGlvbi5jYWxsKHQsIGYuaW5wdXRtYXNrLmNhcmV0UG9zLmVuZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdC5pc1JUTCA/IG4uY2FyZXQuY2FsbCh0LCBmLCBlICsgKGUgPT09IGMubWFza0xlbmd0aCA/IDAgOiAxKSkgOiBuLmNhcmV0LmNhbGwodCwgZiwgZSAtICgwID09PSBlID8gMCA6IDEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLCAwKSkgOiBzLmlzU2VsZWN0aW9uLmNhbGwodCwgaCkgPyBpLmluc2VydE1vZGUgPSAhaS5pbnNlcnRNb2RlIDogKGkuaW5zZXJ0TW9kZSA9ICFpLmluc2VydE1vZGUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgbi5jYXJldC5jYWxsKHQsIGYsIGguYmVnaW4sIGguYmVnaW4pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHQuaWdub3JhYmxlID0gaS5pZ25vcmFibGVzLmluY2x1ZGVzKHApO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBrZXlwcmVzc0V2ZW50OiBmdW5jdGlvbihlLCB0LCBpLCBhLCBvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdSA9IHRoaXMuaW5wdXRtYXNrIHx8IHRoaXMsIGMgPSB1Lm9wdHMsIGYgPSB1LmRlcGVuZGVuY3lMaWIsIGQgPSB1Lm1hc2tzZXQsIHAgPSB1LmVsLCBoID0gZihwKSwgbSA9IGUua2V5Q29kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKCEwID09PSB0IHx8IGUuY3RybEtleSAmJiBlLmFsdEtleSkgJiYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkgfHwgdS5pZ25vcmFibGUpKSByZXR1cm4gbSA9PT0gci5kZWZhdWx0LkVOVEVSICYmIHUudW5kb1ZhbHVlICE9PSB1Ll92YWx1ZUdldCghMCkgJiYgKHUudW5kb1ZhbHVlID0gdS5fdmFsdWVHZXQoITApLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGgudHJpZ2dlcihcImNoYW5nZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLCAwKSksIHUuc2tpcElucHV0RXZlbnQgPSAhMCwgITA7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDQ0ICE9PSBtICYmIDQ2ICE9PSBtIHx8IDMgIT09IGUubG9jYXRpb24gfHwgXCJcIiA9PT0gYy5yYWRpeFBvaW50IHx8IChtID0gYy5yYWRpeFBvaW50LmNoYXJDb2RlQXQoMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2LCBnID0gdCA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVnaW46IG8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gOiBuLmNhcmV0LmNhbGwodSwgcCksIGsgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKG0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSBjLnN1YnN0aXR1dGVzW2tdIHx8IGssIGQud3JpdGVPdXRCdWZmZXIgPSAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeSA9IHMuaXNWYWxpZC5jYWxsKHUsIGcsIGssIGEsIHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghMSAhPT0geSAmJiAobi5yZXNldE1hc2tTZXQuY2FsbCh1LCAhMCksIHYgPSB2b2lkIDAgIT09IHkuY2FyZXQgPyB5LmNhcmV0IDogbi5zZWVrTmV4dC5jYWxsKHUsIHkucG9zLmJlZ2luID8geS5wb3MuYmVnaW4gOiB5LnBvcyksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQucCA9IHYpLCB2ID0gYy5udW1lcmljSW5wdXQgJiYgdm9pZCAwID09PSB5LmNhcmV0ID8gbi5zZWVrUHJldmlvdXMuY2FsbCh1LCB2KSA6IHYsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICExICE9PSBpICYmIChzZXRUaW1lb3V0KChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYy5vbktleVZhbGlkYXRpb24uY2FsbChwLCBtLCB5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSwgMCksIGQud3JpdGVPdXRCdWZmZXIgJiYgITEgIT09IHkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiID0gbi5nZXRCdWZmZXIuY2FsbCh1KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKDAsIGwud3JpdGVCdWZmZXIpKHAsIGIsIHYsIGUsICEwICE9PSB0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQoKSwgdCkgcmV0dXJuICExICE9PSB5ICYmICh5LmZvcndhcmRQb3NpdGlvbiA9IHYpLCB5O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBrZXl1cEV2ZW50OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IHRoaXMuaW5wdXRtYXNrO1xuICAgICAgICAgICAgICAgICAgICAgICAgIXQuaXNDb21wb3NpbmcgfHwgZS5rZXlDb2RlICE9PSByLmRlZmF1bHQuS0VZXzIyOSAmJiBlLmtleUNvZGUgIT09IHIuZGVmYXVsdC5FTlRFUiB8fCB0LiRlbC50cmlnZ2VyKFwiaW5wdXRcIik7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHBhc3RlRXZlbnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0LCBpID0gdGhpcy5pbnB1dG1hc2ssIGEgPSBpLm9wdHMsIHIgPSBpLl92YWx1ZUdldCghMCksIG8gPSBuLmNhcmV0LmNhbGwoaSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpLmlzUlRMICYmICh0ID0gby5lbmQsIG8uZW5kID0gbi50cmFuc2xhdGVQb3NpdGlvbi5jYWxsKGksIG8uYmVnaW4pLCBvLmJlZ2luID0gbi50cmFuc2xhdGVQb3NpdGlvbi5jYWxsKGksIHQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzID0gci5zdWJzdHIoMCwgby5iZWdpbiksIHUgPSByLnN1YnN0cihvLmVuZCwgci5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMgPT0gKGkuaXNSVEwgPyBuLmdldEJ1ZmZlclRlbXBsYXRlLmNhbGwoaSkuc2xpY2UoKS5yZXZlcnNlKCkgOiBuLmdldEJ1ZmZlclRlbXBsYXRlLmNhbGwoaSkpLnNsaWNlKDAsIG8uYmVnaW4pLmpvaW4oXCJcIikgJiYgKHMgPSBcIlwiKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICB1ID09IChpLmlzUlRMID8gbi5nZXRCdWZmZXJUZW1wbGF0ZS5jYWxsKGkpLnNsaWNlKCkucmV2ZXJzZSgpIDogbi5nZXRCdWZmZXJUZW1wbGF0ZS5jYWxsKGkpKS5zbGljZShvLmVuZCkuam9pbihcIlwiKSAmJiAodSA9IFwiXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5jbGlwYm9hcmREYXRhICYmIHdpbmRvdy5jbGlwYm9hcmREYXRhLmdldERhdGEpIHIgPSBzICsgd2luZG93LmNsaXBib2FyZERhdGEuZ2V0RGF0YShcIlRleHRcIikgKyB1OyBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWUuY2xpcGJvYXJkRGF0YSB8fCAhZS5jbGlwYm9hcmREYXRhLmdldERhdGEpIHJldHVybiAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByID0gcyArIGUuY2xpcGJvYXJkRGF0YS5nZXREYXRhKFwidGV4dC9wbGFpblwiKSArIHU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZiA9IHI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaS5pc1JUTCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGYgPSBmLnNwbGl0KFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkLCBwID0gYyhuLmdldEJ1ZmZlclRlbXBsYXRlLmNhbGwoaSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAocC5zKCk7ICEoZCA9IHAubigpKS5kb25lOyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoID0gZC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZbMF0gPT09IGggJiYgZi5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmUoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5mKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGYgPSBmLmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09IHR5cGVvZiBhLm9uQmVmb3JlUGFzdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoITEgPT09IChmID0gYS5vbkJlZm9yZVBhc3RlLmNhbGwoaSwgZiwgYSkpKSByZXR1cm4gITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZiB8fCAoZiA9IHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKDAsIGwuY2hlY2tWYWwpKHRoaXMsICEwLCAhMSwgZi50b1N0cmluZygpLnNwbGl0KFwiXCIpLCBlKSwgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBpbnB1dEZhbGxCYWNrRXZlbnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcy5pbnB1dG1hc2ssIGkgPSB0Lm9wdHMsIGEgPSB0LmRlcGVuZGVuY3lMaWI7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcyA9IHRoaXMsIGMgPSBzLmlucHV0bWFzay5fdmFsdWVHZXQoITApLCBmID0gKHQuaXNSVEwgPyBuLmdldEJ1ZmZlci5jYWxsKHQpLnNsaWNlKCkucmV2ZXJzZSgpIDogbi5nZXRCdWZmZXIuY2FsbCh0KSkuam9pbihcIlwiKSwgcCA9IG4uY2FyZXQuY2FsbCh0LCBzLCB2b2lkIDAsIHZvaWQgMCwgITApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGYgIT09IGMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjID0gZnVuY3Rpb24oZSwgaSwgYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5pZW1vYmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSBpLnJlcGxhY2Uobi5nZXRCdWZmZXIuY2FsbCh0KS5qb2luKFwiXCIpLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgxID09PSByLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzID0gaS5zcGxpdChcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnNwbGljZShhLmJlZ2luLCAwLCByKSwgaSA9IHMuam9pbihcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KDAsIGMsIHApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoID0gZnVuY3Rpb24oZSwgYSwgcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBvLCBzLCBsLCBjID0gZS5zdWJzdHIoMCwgci5iZWdpbikuc3BsaXQoXCJcIiksIGYgPSBlLnN1YnN0cihyLmJlZ2luKS5zcGxpdChcIlwiKSwgZCA9IGEuc3Vic3RyKDAsIHIuYmVnaW4pLnNwbGl0KFwiXCIpLCBwID0gYS5zdWJzdHIoci5iZWdpbikuc3BsaXQoXCJcIiksIGggPSBjLmxlbmd0aCA+PSBkLmxlbmd0aCA/IGMubGVuZ3RoIDogZC5sZW5ndGgsIG0gPSBmLmxlbmd0aCA+PSBwLmxlbmd0aCA/IGYubGVuZ3RoIDogcC5sZW5ndGgsIHYgPSBcIlwiLCBnID0gW10sIGsgPSBcIn5cIjsgYy5sZW5ndGggPCBoOyApIGMucHVzaChrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICg7ZC5sZW5ndGggPCBoOyApIGQucHVzaChrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICg7Zi5sZW5ndGggPCBtOyApIGYudW5zaGlmdChrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICg7cC5sZW5ndGggPCBtOyApIHAudW5zaGlmdChrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHkgPSBjLmNvbmNhdChmKSwgYiA9IGQuY29uY2F0KHApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHMgPSAwLCBvID0geS5sZW5ndGg7IHMgPCBvOyBzKyspIHN3aXRjaCAobCA9IHUuZ2V0UGxhY2Vob2xkZXIuY2FsbCh0LCBuLnRyYW5zbGF0ZVBvc2l0aW9uLmNhbGwodCwgcykpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpbnNlcnRUZXh0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiW3MgLSAxXSA9PT0geVtzXSAmJiByLmJlZ2luID09IHkubGVuZ3RoIC0gMSAmJiBnLnB1c2goeVtzXSksIHMgPSBvO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaW5zZXJ0UmVwbGFjZW1lbnRUZXh0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRlbGV0ZUNvbnRlbnRCYWNrd2FyZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeVtzXSA9PT0gayA/IHIuZW5kKysgOiBzID0gbztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlbc10gIT09IGJbc10gJiYgKHlbcyArIDFdICE9PSBrICYmIHlbcyArIDFdICE9PSBsICYmIHZvaWQgMCAhPT0geVtzICsgMV0gfHwgKGJbc10gIT09IGwgfHwgYltzICsgMV0gIT09IGspICYmIGJbc10gIT09IGsgPyBiW3MgKyAxXSA9PT0gayAmJiBiW3NdID09PSB5W3MgKyAxXSA/ICh2ID0gXCJpbnNlcnRUZXh0XCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZy5wdXNoKHlbc10pLCByLmJlZ2luLS0sIHIuZW5kLS0pIDogeVtzXSAhPT0gbCAmJiB5W3NdICE9PSBrICYmICh5W3MgKyAxXSA9PT0gayB8fCBiW3NdICE9PSB5W3NdICYmIGJbcyArIDFdID09PSB5W3MgKyAxXSkgPyAodiA9IFwiaW5zZXJ0UmVwbGFjZW1lbnRUZXh0XCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZy5wdXNoKHlbc10pLCByLmJlZ2luLS0pIDogeVtzXSA9PT0gayA/ICh2ID0gXCJkZWxldGVDb250ZW50QmFja3dhcmRcIiwgKG4uaXNNYXNrLmNhbGwodCwgbi50cmFuc2xhdGVQb3NpdGlvbi5jYWxsKHQsIHMpLCAhMCkgfHwgYltzXSA9PT0gaS5yYWRpeFBvaW50KSAmJiByLmVuZCsrKSA6IHMgPSBvIDogKHYgPSBcImluc2VydFRleHRcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnLnB1c2goeVtzXSksIHIuYmVnaW4tLSwgci5lbmQtLSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQ6IHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KGMsIGYsIHApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoKHMuaW5wdXRtYXNrLnNoYWRvd1Jvb3QgfHwgcy5vd25lckRvY3VtZW50KS5hY3RpdmVFbGVtZW50ICE9PSBzICYmIHMuZm9jdXMoKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKDAsIGwud3JpdGVCdWZmZXIpKHMsIG4uZ2V0QnVmZmVyLmNhbGwodCkpLCBuLmNhcmV0LmNhbGwodCwgcywgcC5iZWdpbiwgcC5lbmQsICEwKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaC5hY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpbnNlcnRUZXh0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaW5zZXJ0UmVwbGFjZW1lbnRUZXh0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGguZGF0YS5mb3JFYWNoKChmdW5jdGlvbihlLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbiA9IG5ldyBhLkV2ZW50KFwia2V5cHJlc3NcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuLmtleUNvZGUgPSBlLmNoYXJDb2RlQXQoMCksIHQuaWdub3JhYmxlID0gITEsIGQua2V5cHJlc3NFdmVudC5jYWxsKHMsIG4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSksIHNldFRpbWVvdXQoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdC4kZWwudHJpZ2dlcihcImtleXVwXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZGVsZXRlQ29udGVudEJhY2t3YXJkXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtID0gbmV3IGEuRXZlbnQoXCJrZXlkb3duXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtLmtleUNvZGUgPSByLmRlZmF1bHQuQkFDS1NQQUNFLCBkLmtleWRvd25FdmVudC5jYWxsKHMsIG0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKDAsIGwuYXBwbHlJbnB1dFZhbHVlKShzLCBjKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjb21wb3NpdGlvbmVuZEV2ZW50OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IHRoaXMuaW5wdXRtYXNrO1xuICAgICAgICAgICAgICAgICAgICAgICAgdC5pc0NvbXBvc2luZyA9ICExLCB0LiRlbC50cmlnZ2VyKFwiaW5wdXRcIik7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHNldFZhbHVlRXZlbnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcy5pbnB1dG1hc2ssIGkgPSB0aGlzLCBhID0gZSAmJiBlLmRldGFpbCA/IGUuZGV0YWlsWzBdIDogYXJndW1lbnRzWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdm9pZCAwID09PSBhICYmIChhID0gaS5pbnB1dG1hc2suX3ZhbHVlR2V0KCEwKSksICgwLCBsLmFwcGx5SW5wdXRWYWx1ZSkoaSwgYSksIChlLmRldGFpbCAmJiB2b2lkIDAgIT09IGUuZGV0YWlsWzFdIHx8IHZvaWQgMCAhPT0gYXJndW1lbnRzWzJdKSAmJiBuLmNhcmV0LmNhbGwodCwgaSwgZS5kZXRhaWwgPyBlLmRldGFpbFsxXSA6IGFyZ3VtZW50c1syXSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZvY3VzRXZlbnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcy5pbnB1dG1hc2ssIGkgPSB0Lm9wdHMsIGEgPSB0aGlzLCByID0gYS5pbnB1dG1hc2suX3ZhbHVlR2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpLnNob3dNYXNrT25Gb2N1cyAmJiByICE9PSBuLmdldEJ1ZmZlci5jYWxsKHQpLmpvaW4oXCJcIikgJiYgKDAsIGwud3JpdGVCdWZmZXIpKGEsIG4uZ2V0QnVmZmVyLmNhbGwodCksIG4uc2Vla05leHQuY2FsbCh0LCBuLmdldExhc3RWYWxpZFBvc2l0aW9uLmNhbGwodCkpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAhMCAhPT0gaS5wb3NpdGlvbkNhcmV0T25UYWIgfHwgITEgIT09IHQubW91c2VFbnRlciB8fCBzLmlzQ29tcGxldGUuY2FsbCh0LCBuLmdldEJ1ZmZlci5jYWxsKHQpKSAmJiAtMSAhPT0gbi5nZXRMYXN0VmFsaWRQb3NpdGlvbi5jYWxsKHQpIHx8IGQuY2xpY2tFdmVudC5hcHBseShhLCBbIGUsICEwIF0pLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHQudW5kb1ZhbHVlID0gdC5fdmFsdWVHZXQoITApO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBpbnZhbGlkRXZlbnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRtYXNrLnZhbGlkYXRpb25FdmVudCA9ICEwO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtb3VzZWxlYXZlRXZlbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSB0aGlzLmlucHV0bWFzaywgdCA9IGUub3B0cywgaSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLm1vdXNlRW50ZXIgPSAhMSwgdC5jbGVhck1hc2tPbkxvc3RGb2N1cyAmJiAoaS5pbnB1dG1hc2suc2hhZG93Um9vdCB8fCBpLm93bmVyRG9jdW1lbnQpLmFjdGl2ZUVsZW1lbnQgIT09IGkgJiYgKDAsIFxuICAgICAgICAgICAgICAgICAgICAgICAgbC5IYW5kbGVOYXRpdmVQbGFjZWhvbGRlcikoaSwgZS5vcmlnaW5hbFBsYWNlaG9sZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tFdmVudDogZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSB0aGlzLmlucHV0bWFzaywgYSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGEuaW5wdXRtYXNrLnNoYWRvd1Jvb3QgfHwgYS5vd25lckRvY3VtZW50KS5hY3RpdmVFbGVtZW50ID09PSBhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSBuLmRldGVybWluZU5ld0NhcmV0UG9zaXRpb24uY2FsbChpLCBuLmNhcmV0LmNhbGwoaSwgYSksIHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvaWQgMCAhPT0gciAmJiBuLmNhcmV0LmNhbGwoaSwgYSwgcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGN1dEV2ZW50OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IHRoaXMuaW5wdXRtYXNrLCBpID0gdC5tYXNrc2V0LCBhID0gdGhpcywgbyA9IG4uY2FyZXQuY2FsbCh0LCBhKSwgdSA9IHQuaXNSVEwgPyBuLmdldEJ1ZmZlci5jYWxsKHQpLnNsaWNlKG8uZW5kLCBvLmJlZ2luKSA6IG4uZ2V0QnVmZmVyLmNhbGwodCkuc2xpY2Uoby5iZWdpbiwgby5lbmQpLCBjID0gdC5pc1JUTCA/IHUucmV2ZXJzZSgpLmpvaW4oXCJcIikgOiB1LmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubmF2aWdhdG9yLmNsaXBib2FyZCA/IHdpbmRvdy5uYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChjKSA6IHdpbmRvdy5jbGlwYm9hcmREYXRhICYmIHdpbmRvdy5jbGlwYm9hcmREYXRhLmdldERhdGEgJiYgd2luZG93LmNsaXBib2FyZERhdGEuc2V0RGF0YShcIlRleHRcIiwgYyksIFxuICAgICAgICAgICAgICAgICAgICAgICAgcy5oYW5kbGVSZW1vdmUuY2FsbCh0LCBhLCByLmRlZmF1bHQuREVMRVRFLCBvKSwgKDAsIGwud3JpdGVCdWZmZXIpKGEsIG4uZ2V0QnVmZmVyLmNhbGwodCksIGkucCwgZSwgdC51bmRvVmFsdWUgIT09IHQuX3ZhbHVlR2V0KCEwKSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGJsdXJFdmVudDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSB0aGlzLmlucHV0bWFzaywgaSA9IHQub3B0cywgYSA9ICgwLCB0LmRlcGVuZGVuY3lMaWIpKHRoaXMpLCByID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyLmlucHV0bWFzaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgwLCBsLkhhbmRsZU5hdGl2ZVBsYWNlaG9sZGVyKShyLCB0Lm9yaWdpbmFsUGxhY2Vob2xkZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvID0gci5pbnB1dG1hc2suX3ZhbHVlR2V0KCksIHUgPSBuLmdldEJ1ZmZlci5jYWxsKHQpLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIiAhPT0gbyAmJiAoaS5jbGVhck1hc2tPbkxvc3RGb2N1cyAmJiAoLTEgPT09IG4uZ2V0TGFzdFZhbGlkUG9zaXRpb24uY2FsbCh0KSAmJiBvID09PSBuLmdldEJ1ZmZlclRlbXBsYXRlLmNhbGwodCkuam9pbihcIlwiKSA/IHUgPSBbXSA6IGwuY2xlYXJPcHRpb25hbFRhaWwuY2FsbCh0LCB1KSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICExID09PSBzLmlzQ29tcGxldGUuY2FsbCh0LCB1KSAmJiAoc2V0VGltZW91dCgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEudHJpZ2dlcihcImluY29tcGxldGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksIDApLCBpLmNsZWFySW5jb21wbGV0ZSAmJiAobi5yZXNldE1hc2tTZXQuY2FsbCh0KSwgdSA9IGkuY2xlYXJNYXNrT25Mb3N0Rm9jdXMgPyBbXSA6IG4uZ2V0QnVmZmVyVGVtcGxhdGUuY2FsbCh0KS5zbGljZSgpKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgwLCBsLndyaXRlQnVmZmVyKShyLCB1LCB2b2lkIDAsIGUpKSwgdC51bmRvVmFsdWUgIT09IHQuX3ZhbHVlR2V0KCEwKSAmJiAodC51bmRvVmFsdWUgPSB0Ll92YWx1ZUdldCghMCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEudHJpZ2dlcihcImNoYW5nZVwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1vdXNlZW50ZXJFdmVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IHRoaXMuaW5wdXRtYXNrLCB0ID0gZS5vcHRzLCBpID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLm1vdXNlRW50ZXIgPSAhMCwgKGkuaW5wdXRtYXNrLnNoYWRvd1Jvb3QgfHwgaS5vd25lckRvY3VtZW50KS5hY3RpdmVFbGVtZW50ICE9PSBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGEgPSAoZS5pc1JUTCA/IG4uZ2V0QnVmZmVyVGVtcGxhdGUuY2FsbChlKS5zbGljZSgpLnJldmVyc2UoKSA6IG4uZ2V0QnVmZmVyVGVtcGxhdGUuY2FsbChlKSkuam9pbihcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnBsYWNlaG9sZGVyICE9PSBhICYmIGkucGxhY2Vob2xkZXIgIT09IGUub3JpZ2luYWxQbGFjZWhvbGRlciAmJiAoZS5vcmlnaW5hbFBsYWNlaG9sZGVyID0gaS5wbGFjZWhvbGRlciksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQuc2hvd01hc2tPbkhvdmVyICYmICgwLCBsLkhhbmRsZU5hdGl2ZVBsYWNlaG9sZGVyKShpLCBhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3VibWl0RXZlbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSB0aGlzLmlucHV0bWFzaywgdCA9IGUub3B0cztcbiAgICAgICAgICAgICAgICAgICAgICAgIGUudW5kb1ZhbHVlICE9PSBlLl92YWx1ZUdldCghMCkgJiYgZS4kZWwudHJpZ2dlcihcImNoYW5nZVwiKSwgLTEgPT09IG4uZ2V0TGFzdFZhbGlkUG9zaXRpb24uY2FsbChlKSAmJiBlLl92YWx1ZUdldCAmJiBlLl92YWx1ZUdldCgpID09PSBuLmdldEJ1ZmZlclRlbXBsYXRlLmNhbGwoZSkuam9pbihcIlwiKSAmJiBlLl92YWx1ZVNldChcIlwiKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICB0LmNsZWFySW5jb21wbGV0ZSAmJiAhMSA9PT0gcy5pc0NvbXBsZXRlLmNhbGwoZSwgbi5nZXRCdWZmZXIuY2FsbChlKSkgJiYgZS5fdmFsdWVTZXQoXCJcIiksIFxuICAgICAgICAgICAgICAgICAgICAgICAgdC5yZW1vdmVNYXNrT25TdWJtaXQgJiYgKGUuX3ZhbHVlU2V0KGUudW5tYXNrZWR2YWx1ZSgpLCAhMCksIHNldFRpbWVvdXQoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgwLCBsLndyaXRlQnVmZmVyKShlLmVsLCBuLmdldEJ1ZmZlci5jYWxsKGUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLCAwKSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlc2V0RXZlbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSB0aGlzLmlucHV0bWFzaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucmVmcmVzaFZhbHVlID0gITAsIHNldFRpbWVvdXQoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgwLCBsLmFwcGx5SW5wdXRWYWx1ZSkoZS5lbCwgZS5fdmFsdWVHZXQoITApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdC5FdmVudEhhbmRsZXJzID0gZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICA5NzE2OiBmdW5jdGlvbihlLCB0LCBpKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAhMFxuICAgICAgICAgICAgICAgIH0pLCB0LkV2ZW50UnVsZXIgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgdmFyIGEgPSBzKGkoMjM5NCkpLCBuID0gcyhpKDU1ODEpKSwgciA9IGkoODcxMSksIG8gPSBpKDc3NjApO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHMoZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZSAmJiBlLl9fZXNNb2R1bGUgPyBlIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgb246IGZ1bmN0aW9uKGUsIHQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzID0gZS5pbnB1dG1hc2suZGVwZW5kZW5jeUxpYiwgbCA9IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0Lm9yaWdpbmFsRXZlbnQgJiYgKHQgPSB0Lm9yaWdpbmFsRXZlbnQgfHwgdCwgYXJndW1lbnRzWzBdID0gdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGwsIHUgPSB0aGlzLCBjID0gdS5pbnB1dG1hc2ssIGYgPSBjID8gYy5vcHRzIDogdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2b2lkIDAgPT09IGMgJiYgXCJGT1JNXCIgIT09IHRoaXMubm9kZU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGQgPSBzLmRhdGEodSwgXCJfaW5wdXRtYXNrX29wdHNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHModSkub2ZmKCksIGQgJiYgbmV3IGEuZGVmYXVsdChkKS5tYXNrKHUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChbIFwic3VibWl0XCIsIFwicmVzZXRcIiwgXCJzZXR2YWx1ZVwiIF0uaW5jbHVkZXModC50eXBlKSB8fCBcIkZPUk1cIiA9PT0gdGhpcy5ub2RlTmFtZSB8fCAhKHUuZGlzYWJsZWQgfHwgdS5yZWFkT25seSAmJiAhKFwia2V5ZG93blwiID09PSB0LnR5cGUgJiYgdC5jdHJsS2V5ICYmIDY3ID09PSB0LmtleUNvZGUgfHwgITEgPT09IGYudGFiVGhyb3VnaCAmJiB0LmtleUNvZGUgPT09IG4uZGVmYXVsdC5UQUIpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0LnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImlucHV0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEwID09PSBjLnNraXBJbnB1dEV2ZW50IHx8IHQuaW5wdXRUeXBlICYmIFwiaW5zZXJ0Q29tcG9zaXRpb25UZXh0XCIgPT09IHQuaW5wdXRUeXBlKSByZXR1cm4gYy5za2lwSW5wdXRFdmVudCA9ICExLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImtleWRvd25cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLnNraXBLZXlQcmVzc0V2ZW50ID0gITEsIGMuc2tpcElucHV0RXZlbnQgPSBjLmlzQ29tcG9zaW5nID0gdC5rZXlDb2RlID09PSBuLmRlZmF1bHQuS0VZXzIyOTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwia2V5dXBcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvbXBvc2l0aW9uZW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYy5pc0NvbXBvc2luZyAmJiAoYy5za2lwSW5wdXRFdmVudCA9ICExKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwia2V5cHJlc3NcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoITAgPT09IGMuc2tpcEtleVByZXNzRXZlbnQpIHJldHVybiB0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYy5za2lwS2V5UHJlc3NFdmVudCA9ICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjbGlja1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZm9jdXNcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYy52YWxpZGF0aW9uRXZlbnQgPyAoYy52YWxpZGF0aW9uRXZlbnQgPSAhMSwgZS5ibHVyKCksICgwLCBvLkhhbmRsZU5hdGl2ZVBsYWNlaG9sZGVyKShlLCAoYy5pc1JUTCA/IHIuZ2V0QnVmZmVyVGVtcGxhdGUuY2FsbChjKS5zbGljZSgpLnJldmVyc2UoKSA6IHIuZ2V0QnVmZmVyVGVtcGxhdGUuY2FsbChjKSkuam9pbihcIlwiKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksIGYudmFsaWRhdGlvbkV2ZW50VGltZU91dCksICExKSA6IChsID0gYXJndW1lbnRzLCBzZXRUaW1lb3V0KChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5pbnB1dG1hc2sgJiYgaS5hcHBseSh1LCBsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSwgMCksICExKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwID0gaS5hcHBseSh1LCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICExID09PSBwICYmICh0LnByZXZlbnREZWZhdWx0KCksIHQuc3RvcFByb3BhZ2F0aW9uKCkpLCBwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgWyBcInN1Ym1pdFwiLCBcInJlc2V0XCIgXS5pbmNsdWRlcyh0KSA/IChsID0gbC5iaW5kKGUpLCBudWxsICE9PSBlLmZvcm0gJiYgcyhlLmZvcm0pLm9uKHQsIGwpKSA6IHMoZSkub24odCwgbCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgZS5pbnB1dG1hc2suZXZlbnRzW3RdID0gZS5pbnB1dG1hc2suZXZlbnRzW3RdIHx8IFtdLCBlLmlucHV0bWFzay5ldmVudHNbdF0ucHVzaChsKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgb2ZmOiBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5pbnB1dG1hc2sgJiYgZS5pbnB1dG1hc2suZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBlLmlucHV0bWFzay5kZXBlbmRlbmN5TGliLCBhID0gZS5pbnB1dG1hc2suZXZlbnRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG4gaW4gdCAmJiAoKGEgPSBbXSlbdF0gPSBlLmlucHV0bWFzay5ldmVudHNbdF0pLCBhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSBhW25dOyByLmxlbmd0aCA+IDA7ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG8gPSByLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWyBcInN1Ym1pdFwiLCBcInJlc2V0XCIgXS5pbmNsdWRlcyhuKSA/IG51bGwgIT09IGUuZm9ybSAmJiBpKGUuZm9ybSkub2ZmKG4sIG8pIDogaShlKS5vZmYobiwgbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGUuaW5wdXRtYXNrLmV2ZW50c1tuXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHQuRXZlbnRSdWxlciA9IGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgMjE5OiBmdW5jdGlvbihlLCB0LCBpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGEgPSBkKGkoMjM5NCkpLCBuID0gZChpKDU1ODEpKSwgciA9IGQoaSg3MTg0KSksIG8gPSBpKDg3MTEpLCBzID0gaSg0NzEzKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBsKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGwgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIGU7XG4gICAgICAgICAgICAgICAgICAgIH0gOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZSAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBlLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgZSAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2YgZTtcbiAgICAgICAgICAgICAgICAgICAgfSwgbChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdShlLCB0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShlKSkgcmV0dXJuIGU7XG4gICAgICAgICAgICAgICAgICAgIH0oZSkgfHwgZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBudWxsID09IGUgPyBudWxsIDogXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgU3ltYm9sICYmIGVbU3ltYm9sLml0ZXJhdG9yXSB8fCBlW1wiQEBpdGVyYXRvclwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChudWxsID09IGkpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhLCBuLCByID0gW10sIG8gPSAhMCwgcyA9ICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSBpLmNhbGwoZSk7ICEobyA9IChhID0gaS5uZXh0KCkpLmRvbmUpICYmIChyLnB1c2goYS52YWx1ZSksICF0IHx8IHIubGVuZ3RoICE9PSB0KTsgbyA9ICEwKSA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcyA9ICEwLCBuID0gZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbyB8fCBudWxsID09IGkucmV0dXJuIHx8IGkucmV0dXJuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMpIHRocm93IG47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICAgICAgICAgIH0oZSwgdCkgfHwgZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJzdHJpbmdcIiA9PSB0eXBlb2YgZSkgcmV0dXJuIGMoZSwgdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKS5zbGljZSg4LCAtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIk9iamVjdFwiID09PSBpICYmIGUuY29uc3RydWN0b3IgJiYgKGkgPSBlLmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFwiTWFwXCIgPT09IGkgfHwgXCJTZXRcIiA9PT0gaSkgcmV0dXJuIEFycmF5LmZyb20oZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJBcmd1bWVudHNcIiA9PT0gaSB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChpKSkgcmV0dXJuIGMoZSwgdCk7XG4gICAgICAgICAgICAgICAgICAgIH0oZSwgdCkgfHwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGMoZSwgdCkge1xuICAgICAgICAgICAgICAgICAgICAobnVsbCA9PSB0IHx8IHQgPiBlLmxlbmd0aCkgJiYgKHQgPSBlLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBhID0gbmV3IEFycmF5KHQpOyBpIDwgdDsgaSsrKSBhW2ldID0gZVtpXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGYoZSwgdCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhID0gdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGEuZW51bWVyYWJsZSA9IGEuZW51bWVyYWJsZSB8fCAhMSwgYS5jb25maWd1cmFibGUgPSAhMCwgXCJ2YWx1ZVwiIGluIGEgJiYgKGEud3JpdGFibGUgPSAhMCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIGEua2V5LCBhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBkKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUgJiYgZS5fX2VzTW9kdWxlID8gZSA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IGVcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHAgPSBhLmRlZmF1bHQuZGVwZW5kZW5jeUxpYiwgaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBlKHQsIGksIGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICFmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIHQpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSh0aGlzLCBlKSwgdGhpcy5tYXNrID0gdCwgdGhpcy5mb3JtYXQgPSBpLCB0aGlzLm9wdHMgPSBhLCB0aGlzLl9kYXRlID0gbmV3IERhdGUoMSwgMCwgMSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0RGF0ZU9iamVjdCh0LCB0aGlzLm9wdHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciB0LCBpLCBhO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdCA9IGUsIChpID0gWyB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdm9pZCAwID09PSB0aGlzLl9kYXRlICYmICh0aGlzLl9kYXRlID0gbmV3IERhdGUoMSwgMCwgMSksIHRoaXMuaW5pdERhdGVPYmplY3Qodm9pZCAwLCB0aGlzLm9wdHMpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcImluaXREYXRlT2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoUCh0KS5sYXN0SW5kZXggPSAwOyBpID0gUCh0KS5leGVjKHRoaXMuZm9ybWF0KTsgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhID0gbmV3IFJlZ0V4cChcIlxcXFxkKyRcIikuZXhlYyhpWzBdKSwgbiA9IGEgPyBpWzBdWzBdICsgXCJ4XCIgOiBpWzBdLCByID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodm9pZCAwICE9PSBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvID0gUCh0KS5sYXN0SW5kZXgsIHMgPSBPKGkuaW5kZXgsIHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFAodCkubGFzdEluZGV4ID0gbywgciA9IGUuc2xpY2UoMCwgZS5pbmRleE9mKHMubmV4dE1hdGNoWzBdKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgciA9IGUuc2xpY2UoMCwgbi5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZSA9IGUuc2xpY2Uoci5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChnLCBuKSAmJiB0aGlzLnNldFZhbHVlKHRoaXMsIHIsIG4sIGdbbl1bMl0sIGdbbl1bMV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcInNldFZhbHVlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oZSwgdCwgaSwgYSwgbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2b2lkIDAgIT09IHQgJiYgKGVbYV0gPSBcImFtcG1cIiA9PT0gYSA/IHQgOiB0LnJlcGxhY2UoL1teMC05XS9nLCBcIjBcIiksIGVbXCJyYXdcIiArIGFdID0gdC5yZXBsYWNlKC9cXHMvZywgXCJfXCIpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9pZCAwICE9PSBuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByID0gZVthXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKFwiZGF5XCIgPT09IGEgJiYgMjkgPT09IHBhcnNlSW50KHIpIHx8IFwibW9udGhcIiA9PT0gYSAmJiAyID09PSBwYXJzZUludChyKSkgJiYgKDI5ICE9PSBwYXJzZUludChlLmRheSkgfHwgMiAhPT0gcGFyc2VJbnQoZS5tb250aCkgfHwgXCJcIiAhPT0gZS55ZWFyICYmIHZvaWQgMCAhPT0gZS55ZWFyIHx8IGUuX2RhdGUuc2V0RnVsbFllYXIoMjAxMiwgMSwgMjkpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF5XCIgPT09IGEgJiYgKHYgPSAhMCwgMCA9PT0gcGFyc2VJbnQocikgJiYgKHIgPSAxKSksIFwibW9udGhcIiA9PT0gYSAmJiAodiA9ICEwKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwieWVhclwiID09PSBhICYmICh2ID0gITAsIHIubGVuZ3RoIDwgNCAmJiAociA9IHcociwgNCwgITApKSksIFwiXCIgPT09IHIgfHwgaXNOYU4ocikgfHwgbi5jYWxsKGUuX2RhdGUsIHIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhbXBtXCIgPT09IGEgJiYgbi5jYWxsKGUuX2RhdGUsIHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcInJlc2V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGF0ZSA9IG5ldyBEYXRlKDEsIDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwicmVJbml0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGF0ZSA9IHZvaWQgMCwgdGhpcy5kYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IF0pICYmIGYodC5wcm90b3R5cGUsIGkpLCBhICYmIGYodCwgYSksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LCBcInByb3RvdHlwZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0YWJsZTogITFcbiAgICAgICAgICAgICAgICAgICAgfSksIGU7XG4gICAgICAgICAgICAgICAgfSgpLCBtID0gKG5ldyBEYXRlKS5nZXRGdWxsWWVhcigpLCB2ID0gITEsIGcgPSB7XG4gICAgICAgICAgICAgICAgICAgIGQ6IFsgXCJbMS05XXxbMTJdWzAtOV18M1swMV1cIiwgRGF0ZS5wcm90b3R5cGUuc2V0RGF0ZSwgXCJkYXlcIiwgRGF0ZS5wcm90b3R5cGUuZ2V0RGF0ZSBdLFxuICAgICAgICAgICAgICAgICAgICBkZDogWyBcIjBbMS05XXxbMTJdWzAtOV18M1swMV1cIiwgRGF0ZS5wcm90b3R5cGUuc2V0RGF0ZSwgXCJkYXlcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdyhEYXRlLnByb3RvdHlwZS5nZXREYXRlLmNhbGwodGhpcyksIDIpO1xuICAgICAgICAgICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICAgICAgICAgIGRkZDogWyBcIlwiIF0sXG4gICAgICAgICAgICAgICAgICAgIGRkZGQ6IFsgXCJcIiBdLFxuICAgICAgICAgICAgICAgICAgICBtOiBbIFwiWzEtOV18MVswMTJdXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ID0gZSA/IHBhcnNlSW50KGUpIDogMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0ID4gMCAmJiB0LS0sIERhdGUucHJvdG90eXBlLnNldE1vbnRoLmNhbGwodGhpcywgdCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIFwibW9udGhcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gRGF0ZS5wcm90b3R5cGUuZ2V0TW9udGguY2FsbCh0aGlzKSArIDE7XG4gICAgICAgICAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgICAgICAgICAgbW06IFsgXCIwWzEtOV18MVswMTJdXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ID0gZSA/IHBhcnNlSW50KGUpIDogMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0ID4gMCAmJiB0LS0sIERhdGUucHJvdG90eXBlLnNldE1vbnRoLmNhbGwodGhpcywgdCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIFwibW9udGhcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdyhEYXRlLnByb3RvdHlwZS5nZXRNb250aC5jYWxsKHRoaXMpICsgMSwgMik7XG4gICAgICAgICAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgICAgICAgICAgbW1tOiBbIFwiXCIgXSxcbiAgICAgICAgICAgICAgICAgICAgbW1tbTogWyBcIlwiIF0sXG4gICAgICAgICAgICAgICAgICAgIHl5OiBbIFwiWzAtOV17Mn1cIiwgRGF0ZS5wcm90b3R5cGUuc2V0RnVsbFllYXIsIFwieWVhclwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3KERhdGUucHJvdG90eXBlLmdldEZ1bGxZZWFyLmNhbGwodGhpcyksIDIpO1xuICAgICAgICAgICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICAgICAgICAgIHl5eXk6IFsgXCJbMC05XXs0fVwiLCBEYXRlLnByb3RvdHlwZS5zZXRGdWxsWWVhciwgXCJ5ZWFyXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHcoRGF0ZS5wcm90b3R5cGUuZ2V0RnVsbFllYXIuY2FsbCh0aGlzKSwgNCk7XG4gICAgICAgICAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgICAgICAgICAgaDogWyBcIlsxLTldfDFbMC0yXVwiLCBEYXRlLnByb3RvdHlwZS5zZXRIb3VycywgXCJob3Vyc1wiLCBEYXRlLnByb3RvdHlwZS5nZXRIb3VycyBdLFxuICAgICAgICAgICAgICAgICAgICBoaDogWyBcIjBbMS05XXwxWzAtMl1cIiwgRGF0ZS5wcm90b3R5cGUuc2V0SG91cnMsIFwiaG91cnNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdyhEYXRlLnByb3RvdHlwZS5nZXRIb3Vycy5jYWxsKHRoaXMpLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgfSBdLFxuICAgICAgICAgICAgICAgICAgICBoeDogWyBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJbMC05XXtcIi5jb25jYXQoZSwgXCJ9XCIpO1xuICAgICAgICAgICAgICAgICAgICB9LCBEYXRlLnByb3RvdHlwZS5zZXRIb3VycywgXCJob3Vyc1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gRGF0ZS5wcm90b3R5cGUuZ2V0SG91cnM7XG4gICAgICAgICAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgICAgICAgICAgSDogWyBcIjE/WzAtOV18MlswLTNdXCIsIERhdGUucHJvdG90eXBlLnNldEhvdXJzLCBcImhvdXJzXCIsIERhdGUucHJvdG90eXBlLmdldEhvdXJzIF0sXG4gICAgICAgICAgICAgICAgICAgIEhIOiBbIFwiMFswLTldfDFbMC05XXwyWzAtM11cIiwgRGF0ZS5wcm90b3R5cGUuc2V0SG91cnMsIFwiaG91cnNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdyhEYXRlLnByb3RvdHlwZS5nZXRIb3Vycy5jYWxsKHRoaXMpLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgfSBdLFxuICAgICAgICAgICAgICAgICAgICBIeDogWyBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJbMC05XXtcIi5jb25jYXQoZSwgXCJ9XCIpO1xuICAgICAgICAgICAgICAgICAgICB9LCBEYXRlLnByb3RvdHlwZS5zZXRIb3VycywgXCJob3Vyc1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHcoRGF0ZS5wcm90b3R5cGUuZ2V0SG91cnMuY2FsbCh0aGlzKSwgZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICAgICAgICAgIE06IFsgXCJbMS01XT9bMC05XVwiLCBEYXRlLnByb3RvdHlwZS5zZXRNaW51dGVzLCBcIm1pbnV0ZXNcIiwgRGF0ZS5wcm90b3R5cGUuZ2V0TWludXRlcyBdLFxuICAgICAgICAgICAgICAgICAgICBNTTogWyBcIjBbMC05XXwxWzAtOV18MlswLTldfDNbMC05XXw0WzAtOV18NVswLTldXCIsIERhdGUucHJvdG90eXBlLnNldE1pbnV0ZXMsIFwibWludXRlc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3KERhdGUucHJvdG90eXBlLmdldE1pbnV0ZXMuY2FsbCh0aGlzKSwgMik7XG4gICAgICAgICAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgICAgICAgICAgczogWyBcIlsxLTVdP1swLTldXCIsIERhdGUucHJvdG90eXBlLnNldFNlY29uZHMsIFwic2Vjb25kc1wiLCBEYXRlLnByb3RvdHlwZS5nZXRTZWNvbmRzIF0sXG4gICAgICAgICAgICAgICAgICAgIHNzOiBbIFwiMFswLTldfDFbMC05XXwyWzAtOV18M1swLTldfDRbMC05XXw1WzAtOV1cIiwgRGF0ZS5wcm90b3R5cGUuc2V0U2Vjb25kcywgXCJzZWNvbmRzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHcoRGF0ZS5wcm90b3R5cGUuZ2V0U2Vjb25kcy5jYWxsKHRoaXMpLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgfSBdLFxuICAgICAgICAgICAgICAgICAgICBsOiBbIFwiWzAtOV17M31cIiwgRGF0ZS5wcm90b3R5cGUuc2V0TWlsbGlzZWNvbmRzLCBcIm1pbGxpc2Vjb25kc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3KERhdGUucHJvdG90eXBlLmdldE1pbGxpc2Vjb25kcy5jYWxsKHRoaXMpLCAzKTtcbiAgICAgICAgICAgICAgICAgICAgfSBdLFxuICAgICAgICAgICAgICAgICAgICBMOiBbIFwiWzAtOV17Mn1cIiwgRGF0ZS5wcm90b3R5cGUuc2V0TWlsbGlzZWNvbmRzLCBcIm1pbGxpc2Vjb25kc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3KERhdGUucHJvdG90eXBlLmdldE1pbGxpc2Vjb25kcy5jYWxsKHRoaXMpLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgfSBdLFxuICAgICAgICAgICAgICAgICAgICB0OiBbIFwiW2FwXVwiLCB5LCBcImFtcG1cIiwgYiwgMSBdLFxuICAgICAgICAgICAgICAgICAgICB0dDogWyBcIlthcF1tXCIsIHksIFwiYW1wbVwiLCBiLCAyIF0sXG4gICAgICAgICAgICAgICAgICAgIFQ6IFsgXCJbQVBdXCIsIHksIFwiYW1wbVwiLCBiLCAxIF0sXG4gICAgICAgICAgICAgICAgICAgIFRUOiBbIFwiW0FQXU1cIiwgeSwgXCJhbXBtXCIsIGIsIDIgXSxcbiAgICAgICAgICAgICAgICAgICAgWjogWyBcIi4qXCIsIHZvaWQgMCwgXCJaXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSB0aGlzLnRvU3RyaW5nKCkubWF0Y2goL1xcKCguKylcXCkvKVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuaW5jbHVkZXMoXCIgXCIpICYmIChlID0gKGUgPSBlLnJlcGxhY2UoXCItXCIsIFwiIFwiKS50b1VwcGVyQ2FzZSgpKS5zcGxpdChcIiBcIikubWFwKChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHUoZSwgMSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSkuam9pbihcIlwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgICAgICAgICAgICAgfSBdLFxuICAgICAgICAgICAgICAgICAgICBvOiBbIFwiXCIgXSxcbiAgICAgICAgICAgICAgICAgICAgUzogWyBcIlwiIF1cbiAgICAgICAgICAgICAgICB9LCBrID0ge1xuICAgICAgICAgICAgICAgICAgICBpc29EYXRlOiBcInl5eXktbW0tZGRcIixcbiAgICAgICAgICAgICAgICAgICAgaXNvVGltZTogXCJISDpNTTpzc1wiLFxuICAgICAgICAgICAgICAgICAgICBpc29EYXRlVGltZTogXCJ5eXl5LW1tLWRkJ1QnSEg6TU06c3NcIixcbiAgICAgICAgICAgICAgICAgICAgaXNvVXRjRGF0ZVRpbWU6IFwiVVRDOnl5eXktbW0tZGQnVCdISDpNTTpzcydaJ1wiXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB5KGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSB0aGlzLmdldEhvdXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcInBcIikgPyB0aGlzLnNldEhvdXJzKHQgKyAxMikgOiBlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoXCJhXCIpICYmIHQgPj0gMTIgJiYgdGhpcy5zZXRIb3Vycyh0IC0gMTIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBiKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IHRoaXMuZ2V0SG91cnMoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChlID0gZSB8fCAxMikgPj0gMTIgPyBcIlBNXCIgOiBcIkFNXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHgoZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IG5ldyBSZWdFeHAoXCJcXFxcZCskXCIpLmV4ZWMoZVswXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIHZvaWQgMCAhPT0gdFswXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBnW2VbMF1bMF0gKyBcInhcIl0uc2xpY2UoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaVswXSA9IGlbMF0odFswXSksIGlbM10gPSBpWzNdKHRbMF0pLCBpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChnW2VbMF1dKSByZXR1cm4gZ1tlWzBdXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gUChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZS50b2tlbml6ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ID0gW10sIGkgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGEgaW4gZykgaWYgKC9cXC4qeCQvLnRlc3QoYSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbiA9IGFbMF0gKyBcIlxcXFxkK1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0xID09PSBpLmluZGV4T2YobikgJiYgaS5wdXNoKG4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIC0xID09PSB0LmluZGV4T2YoYVswXSkgJiYgdC5wdXNoKGFbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZS50b2tlbml6ZXIgPSBcIihcIiArIChpLmxlbmd0aCA+IDAgPyBpLmpvaW4oXCJ8XCIpICsgXCJ8XCIgOiBcIlwiKSArIHQuam9pbihcIit8XCIpICsgXCIpKz98LlwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGUudG9rZW5pemVyID0gbmV3IFJlZ0V4cChlLnRva2VuaXplciwgXCJnXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlLnRva2VuaXplcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gRShlLCB0LCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdikgcmV0dXJuICEwO1xuICAgICAgICAgICAgICAgICAgICBpZiAodm9pZCAwID09PSBlLnJhd2RheSB8fCAhaXNGaW5pdGUoZS5yYXdkYXkpICYmIG5ldyBEYXRlKGUuZGF0ZS5nZXRGdWxsWWVhcigpLCBpc0Zpbml0ZShlLnJhd21vbnRoKSA/IGUubW9udGggOiBlLmRhdGUuZ2V0TW9udGgoKSArIDEsIDApLmdldERhdGUoKSA+PSBlLmRheSB8fCBcIjI5XCIgPT0gZS5kYXkgJiYgKCFpc0Zpbml0ZShlLnJhd3llYXIpIHx8IHZvaWQgMCA9PT0gZS5yYXd5ZWFyIHx8IFwiXCIgPT09IGUucmF3eWVhcikgfHwgbmV3IERhdGUoZS5kYXRlLmdldEZ1bGxZZWFyKCksIGlzRmluaXRlKGUucmF3bW9udGgpID8gZS5tb250aCA6IGUuZGF0ZS5nZXRNb250aCgpICsgMSwgMCkuZ2V0RGF0ZSgpID49IGUuZGF5KSByZXR1cm4gdDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFwiMjlcIiA9PSBlLmRheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGEgPSBPKHQucG9zLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcInl5eXlcIiA9PT0gYS50YXJnZXRNYXRjaFswXSAmJiB0LnBvcyAtIGEudGFyZ2V0TWF0Y2hJbmRleCA9PSAyKSByZXR1cm4gdC5yZW1vdmUgPSB0LnBvcyArIDEsIFxuICAgICAgICAgICAgICAgICAgICAgICAgdDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcIjAyXCIgPT0gZS5tb250aCAmJiBcIjMwXCIgPT0gZS5kYXkgJiYgdm9pZCAwICE9PSB0LmMpIHJldHVybiBlLmRheSA9IFwiMDNcIiwgXG4gICAgICAgICAgICAgICAgICAgIGUuZGF0ZS5zZXREYXRlKDMpLCBlLmRhdGUuc2V0TW9udGgoMSksIHQuaW5zZXJ0ID0gWyB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3M6IHQucG9zLFxuICAgICAgICAgICAgICAgICAgICAgICAgYzogXCIwXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zOiB0LnBvcyArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBjOiB0LmNcbiAgICAgICAgICAgICAgICAgICAgfSBdLCB0LmNhcmV0ID0gby5zZWVrTmV4dC5jYWxsKHRoaXMsIHQucG9zICsgMSksIHQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gUyhlLCB0LCBpLCBhKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuLCBvLCBzID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChQKGkpLmxhc3RJbmRleCA9IDA7IG4gPSBQKGkpLmV4ZWMoZSk7ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZvaWQgMCA9PT0gdCkgaWYgKG8gPSB4KG4pKSBzICs9IFwiKFwiICsgb1swXSArIFwiKVwiOyBlbHNlIHN3aXRjaCAoblswXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiW1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gXCIoXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIl1cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzICs9IFwiKT9cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gKDAsIHIuZGVmYXVsdCkoblswXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG8gPSB4KG4pKSBpZiAoITAgIT09IGEgJiYgb1szXSkgcyArPSBvWzNdLmNhbGwodC5kYXRlKTsgZWxzZSBvWzJdID8gcyArPSB0W1wicmF3XCIgKyBvWzJdXSA6IHMgKz0gblswXTsgZWxzZSBzICs9IG5bMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHcoZSwgdCwgaSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGUgPSBTdHJpbmcoZSksIHQgPSB0IHx8IDI7IGUubGVuZ3RoIDwgdDsgKSBlID0gaSA/IGUgKyBcIjBcIiA6IFwiMFwiICsgZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIF8oZSwgdCwgaSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzdHJpbmdcIiA9PSB0eXBlb2YgZSA/IG5ldyBoKGUsIHQsIGkpIDogZSAmJiBcIm9iamVjdFwiID09PSBsKGUpICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLCBcImRhdGVcIikgPyBlIDogdm9pZCAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBNKGUsIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFModC5pbnB1dEZvcm1hdCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZTogZVxuICAgICAgICAgICAgICAgICAgICB9LCB0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gTyhlLCB0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpLCBhLCBuID0gMCwgciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoUCh0KS5sYXN0SW5kZXggPSAwOyBhID0gUCh0KS5leGVjKHQuaW5wdXRGb3JtYXQpOyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvID0gbmV3IFJlZ0V4cChcIlxcXFxkKyRcIikuZXhlYyhhWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobiArPSByID0gbyA/IHBhcnNlSW50KG9bMF0pIDogYVswXS5sZW5ndGgpID49IGUgKyAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGEsIGEgPSBQKHQpLmV4ZWModC5pbnB1dEZvcm1hdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE1hdGNoSW5kZXg6IG4gLSByLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dE1hdGNoOiBhLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TWF0Y2g6IGlcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYS5kZWZhdWx0LmV4dGVuZEFsaWFzZXMoe1xuICAgICAgICAgICAgICAgICAgICBkYXRldGltZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlLm51bWVyaWNJbnB1dCA9ICExLCBnLlMgPSBlLmkxOG4ub3JkaW5hbFN1ZmZpeC5qb2luKFwifFwiKSwgZS5pbnB1dEZvcm1hdCA9IGtbZS5pbnB1dEZvcm1hdF0gfHwgZS5pbnB1dEZvcm1hdCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5kaXNwbGF5Rm9ybWF0ID0ga1tlLmRpc3BsYXlGb3JtYXRdIHx8IGUuZGlzcGxheUZvcm1hdCB8fCBlLmlucHV0Rm9ybWF0LCBlLm91dHB1dEZvcm1hdCA9IGtbZS5vdXRwdXRGb3JtYXRdIHx8IGUub3V0cHV0Rm9ybWF0IHx8IGUuaW5wdXRGb3JtYXQsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucGxhY2Vob2xkZXIgPSBcIlwiICE9PSBlLnBsYWNlaG9sZGVyID8gZS5wbGFjZWhvbGRlciA6IGUuaW5wdXRGb3JtYXQucmVwbGFjZSgvW1tcXF1dLywgXCJcIiksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucmVnZXggPSBTKGUuaW5wdXRGb3JtYXQsIHZvaWQgMCwgZSksIGUubWluID0gXyhlLm1pbiwgZS5pbnB1dEZvcm1hdCwgZSksIGUubWF4ID0gXyhlLm1heCwgZS5pbnB1dEZvcm1hdCwgZSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dEZvcm1hdDogXCJpc29EYXRlVGltZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheUZvcm1hdDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dEZvcm1hdDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpMThuOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF5TmFtZXM6IFsgXCJNb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIiwgXCJTdW5cIiwgXCJNb25kYXlcIiwgXCJUdWVzZGF5XCIsIFwiV2VkbmVzZGF5XCIsIFwiVGh1cnNkYXlcIiwgXCJGcmlkYXlcIiwgXCJTYXR1cmRheVwiLCBcIlN1bmRheVwiIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9udGhOYW1lczogWyBcIkphblwiLCBcIkZlYlwiLCBcIk1hclwiLCBcIkFwclwiLCBcIk1heVwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiLCBcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCIgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmRpbmFsU3VmZml4OiBbIFwic3RcIiwgXCJuZFwiLCBcInJkXCIsIFwidGhcIiBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlVmFsaWRhdGlvbjogZnVuY3Rpb24oZSwgdCwgaSwgYSwgbiwgciwgbywgcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzKSByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTmFOKGkpICYmIGVbdF0gIT09IGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGwgPSBPKHQsIG4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobC5uZXh0TWF0Y2ggJiYgbC5uZXh0TWF0Y2hbMF0gPT09IGkgJiYgbC50YXJnZXRNYXRjaFswXS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdSA9IGdbbC50YXJnZXRNYXRjaFswXV1bMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3IFJlZ0V4cCh1KS50ZXN0KFwiMFwiICsgZVt0IC0gMV0pKSByZXR1cm4gZVt0XSA9IGVbdCAtIDFdLCBlW3QgLSAxXSA9IFwiMFwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdXp6eTogITAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyOiBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hGcm9tQnVmZmVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiB0IC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiB0ICsgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zOiB0ICsgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zdFZhbGlkYXRpb246IGZ1bmN0aW9uKGUsIHQsIGksIGEsIG4sIHIsIG8sIGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdSwgYztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobykgcmV0dXJuICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghMSA9PT0gYSAmJiAoKCh1ID0gTyh0ICsgMSwgbikpLnRhcmdldE1hdGNoICYmIHUudGFyZ2V0TWF0Y2hJbmRleCA9PT0gdCAmJiB1LnRhcmdldE1hdGNoWzBdLmxlbmd0aCA+IDEgJiYgdm9pZCAwICE9PSBnW3UudGFyZ2V0TWF0Y2hbMF1dIHx8ICh1ID0gTyh0ICsgMiwgbikpLnRhcmdldE1hdGNoICYmIHUudGFyZ2V0TWF0Y2hJbmRleCA9PT0gdCArIDEgJiYgdS50YXJnZXRNYXRjaFswXS5sZW5ndGggPiAxICYmIHZvaWQgMCAhPT0gZ1t1LnRhcmdldE1hdGNoWzBdXSkgJiYgKGMgPSBnW3UudGFyZ2V0TWF0Y2hbMF1dWzBdKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9pZCAwICE9PSBjICYmICh2b2lkIDAgIT09IHIudmFsaWRQb3NpdGlvbnNbdCArIDFdICYmIG5ldyBSZWdFeHAoYykudGVzdChpICsgXCIwXCIpID8gKGVbdF0gPSBpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlW3QgKyAxXSA9IFwiMFwiLCBhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3M6IHQgKyAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldDogdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pIDogbmV3IFJlZ0V4cChjKS50ZXN0KFwiMFwiICsgaSkgJiYgKGVbdF0gPSBcIjBcIiwgZVt0ICsgMV0gPSBpLCBhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3M6IHQgKyAyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpLCAhMSA9PT0gYSkpIHJldHVybiBhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhLmZ1enp5ICYmIChlID0gYS5idWZmZXIsIHQgPSBhLnBvcyksICh1ID0gTyh0LCBuKSkudGFyZ2V0TWF0Y2ggJiYgdS50YXJnZXRNYXRjaFswXSAmJiB2b2lkIDAgIT09IGdbdS50YXJnZXRNYXRjaFswXV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGYgPSBnW3UudGFyZ2V0TWF0Y2hbMF1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjID0gZlswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGQgPSBlLnNsaWNlKHUudGFyZ2V0TWF0Y2hJbmRleCwgdS50YXJnZXRNYXRjaEluZGV4ICsgdS50YXJnZXRNYXRjaFswXS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoITEgPT09IG5ldyBSZWdFeHAoYykudGVzdChkLmpvaW4oXCJcIikpICYmIDIgPT09IHUudGFyZ2V0TWF0Y2hbMF0ubGVuZ3RoICYmIHIudmFsaWRQb3NpdGlvbnNbdS50YXJnZXRNYXRjaEluZGV4XSAmJiByLnZhbGlkUG9zaXRpb25zW3UudGFyZ2V0TWF0Y2hJbmRleCArIDFdICYmIChyLnZhbGlkUG9zaXRpb25zW3UudGFyZ2V0TWF0Y2hJbmRleCArIDFdLmlucHV0ID0gXCIwXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ5ZWFyXCIgPT0gZlsyXSkgZm9yICh2YXIgcCA9IHMuZ2V0TWFza1RlbXBsYXRlLmNhbGwodGhpcywgITEsIDEsIHZvaWQgMCwgITApLCBoID0gdCArIDE7IGggPCBlLmxlbmd0aDsgaCsrKSBlW2hdID0gcFtoXSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSByLnZhbGlkUG9zaXRpb25zW2hdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdiA9IGEsIGsgPSBfKGUuam9pbihcIlwiKSwgbi5pbnB1dEZvcm1hdCwgbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHYgJiYgay5kYXRlLmdldFRpbWUoKSA9PSBrLmRhdGUuZ2V0VGltZSgpICYmIChuLnByZWZpbGxZZWFyICYmICh2ID0gZnVuY3Rpb24oZSwgdCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS55ZWFyICE9PSBlLnJhd3llYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhID0gbS50b1N0cmluZygpLCBuID0gZS5yYXd5ZWFyLnJlcGxhY2UoL1teMC05XS9nLCBcIlwiKSwgciA9IGEuc2xpY2UoMCwgbi5sZW5ndGgpLCBvID0gYS5zbGljZShuLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMiA9PT0gbi5sZW5ndGggJiYgbiA9PT0gcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzID0gbmV3IERhdGUobSwgZS5tb250aCAtIDEsIGUuZGF5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLmRheSA9PSBzLmdldERhdGUoKSAmJiAoIWkubWF4IHx8IGkubWF4LmRhdGUuZ2V0VGltZSgpID49IHMuZ2V0VGltZSgpKSAmJiAoZS5kYXRlLnNldEZ1bGxZZWFyKG0pLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnllYXIgPSBhLCB0Lmluc2VydCA9IFsge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3M6IHQucG9zICsgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYzogb1swXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zOiB0LnBvcyArIDIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGM6IG9bMV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0oaywgdiwgbikpLCB2ID0gZnVuY3Rpb24oZSwgdCwgaSwgYSwgbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXQpIHJldHVybiB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBpLm1pbiAmJiBpLm1pbi5kYXRlLmdldFRpbWUoKSA9PSBpLm1pbi5kYXRlLmdldFRpbWUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGUucmVzZXQoKSwgUChpKS5sYXN0SW5kZXggPSAwOyByID0gUChpKS5leGVjKGkuaW5wdXRGb3JtYXQpOyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKG8gPSB4KHIpKSAmJiBvWzNdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSBvWzFdLCBsID0gZVtvWzJdXSwgdSA9IGkubWluW29bMl1dLCBjID0gaS5tYXggPyBpLm1heFtvWzJdXSA6IHUsIGYgPSBbXSwgZCA9ICExLCBwID0gMDsgcCA8IHUubGVuZ3RoOyBwKyspIHZvaWQgMCAhPT0gYS52YWxpZFBvc2l0aW9uc1twICsgci5pbmRleF0gfHwgZCA/IChmW3BdID0gbFtwXSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQgPSBkIHx8IGxbcF0gPiB1W3BdKSA6IChmW3BdID0gdVtwXSwgXCJ5ZWFyXCIgPT09IG9bMl0gJiYgbC5sZW5ndGggLSAxID09IHAgJiYgdSAhPSBjICYmIChmID0gKHBhcnNlSW50KGYuam9pbihcIlwiKSkgKyAxKS50b1N0cmluZygpLnNwbGl0KFwiXCIpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYW1wbVwiID09PSBvWzJdICYmIHUgIT0gYyAmJiBpLm1pbi5kYXRlLmdldFRpbWUoKSA+IGUuZGF0ZS5nZXRUaW1lKCkgJiYgKGZbcF0gPSBjW3BdKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuY2FsbChlLl9kYXRlLCBmLmpvaW4oXCJcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQgPSBpLm1pbi5kYXRlLmdldFRpbWUoKSA8PSBlLmRhdGUuZ2V0VGltZSgpLCBlLnJlSW5pdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0ICYmIGkubWF4ICYmIGkubWF4LmRhdGUuZ2V0VGltZSgpID09IGkubWF4LmRhdGUuZ2V0VGltZSgpICYmICh0ID0gaS5tYXguZGF0ZS5nZXRUaW1lKCkgPj0gZS5kYXRlLmdldFRpbWUoKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0oaywgdiA9IEUuY2FsbCh0aGlzLCBrLCB2LCBuKSwgbiwgcikpLCB2b2lkIDAgIT09IHQgJiYgdiAmJiBhLnBvcyAhPT0gdCA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyOiBTKG4uaW5wdXRGb3JtYXQsIGssIG4pLnNwbGl0KFwiXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoRnJvbUJ1ZmZlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IGEucG9zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvczogYS5jYXJldCB8fCBhLnBvc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gOiB2O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bjogZnVuY3Rpb24oZSwgdCwgaSwgYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuY3RybEtleSAmJiBlLmtleUNvZGUgPT09IG4uZGVmYXVsdC5SSUdIVCAmJiAodGhpcy5pbnB1dG1hc2suX3ZhbHVlU2V0KE0obmV3IERhdGUsIGEpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcCh0aGlzKS50cmlnZ2VyKFwic2V0dmFsdWVcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVW5NYXNrOiBmdW5jdGlvbihlLCB0LCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHQgPyBTKGkub3V0cHV0Rm9ybWF0LCBfKGUsIGkuaW5wdXRGb3JtYXQsIGkpLCBpLCAhMCkgOiB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2luZzogZnVuY3Rpb24oZSwgdCwgaSwgYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwID09IHQubmF0aXZlRGVmLmluZGV4T2YoXCJbYXBdXCIpID8gZS50b0xvd2VyQ2FzZSgpIDogMCA9PSB0Lm5hdGl2ZURlZi5pbmRleE9mKFwiW0FQXVwiKSA/IGUudG9VcHBlckNhc2UoKSA6IGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb25CZWZvcmVNYXNrOiBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiW29iamVjdCBEYXRlXVwiID09PSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSkgJiYgKGUgPSBNKGUsIHQpKSwgZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRNb2RlOiAhMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0UG9zaXRpb25zOiAhMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGtlZXBTdGF0aWM6ICExLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRtb2RlOiBcIm51bWVyaWNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWZpbGxZZWFyOiAhMFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgMzg1MTogZnVuY3Rpb24oZSwgdCwgaSkge1xuICAgICAgICAgICAgICAgIHZhciBhLCBuID0gKGEgPSBpKDIzOTQpKSAmJiBhLl9fZXNNb2R1bGUgPyBhIDoge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiBhXG4gICAgICAgICAgICAgICAgfSwgciA9IGkoODcxMSksIG8gPSBpKDQ3MTMpO1xuICAgICAgICAgICAgICAgIG4uZGVmYXVsdC5leHRlbmREZWZpbml0aW9ucyh7XG4gICAgICAgICAgICAgICAgICAgIEE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbQS1aYS16XFx1MDQxMC1cXHUwNDRmXFx1MDQwMVxcdTA0NTFcXHhjMC1cXHhmZlxceGI1XVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzaW5nOiBcInVwcGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCImXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbMC05QS1aYS16XFx1MDQxMC1cXHUwNDRmXFx1MDQwMVxcdTA0NTFcXHhjMC1cXHhmZlxceGI1XVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzaW5nOiBcInVwcGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCIjXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbMC05QS1GYS1mXVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzaW5nOiBcInVwcGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhciBzID0gbmV3IFJlZ0V4cChcIjI1WzAtNV18MlswLTRdWzAtOV18WzAxXVswLTldWzAtOV1cIik7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gbChlLCB0LCBpLCBhLCBuKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpIC0gMSA+IC0xICYmIFwiLlwiICE9PSB0LmJ1ZmZlcltpIC0gMV0gPyAoZSA9IHQuYnVmZmVyW2kgLSAxXSArIGUsIGUgPSBpIC0gMiA+IC0xICYmIFwiLlwiICE9PSB0LmJ1ZmZlcltpIC0gMl0gPyB0LmJ1ZmZlcltpIC0gMl0gKyBlIDogXCIwXCIgKyBlKSA6IGUgPSBcIjAwXCIgKyBlLCBcbiAgICAgICAgICAgICAgICAgICAgcy50ZXN0KGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuLmRlZmF1bHQuZXh0ZW5kQWxpYXNlcyh7XG4gICAgICAgICAgICAgICAgICAgIGNzc3VuaXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlsrLV0/WzAtOV0rXFxcXC4/KFswLTldKyk/KHB4fGVtfHJlbXxleHwlfGlufGNtfG1tfHB0fHBjKVwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHVybDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiKGh0dHBzP3xmdHApOi8vLipcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9Vbm1hc2s6ICExLFxuICAgICAgICAgICAgICAgICAgICAgICAga2VlcFN0YXRpYzogITEsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJUaHJvdWdoOiAhMFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBpcDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogXCJpezEsM30uansxLDN9Lmt7MSwzfS5sezEsM31cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGo6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb25Vbk1hc2s6IGZ1bmN0aW9uKGUsIHQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dG1vZGU6IFwiZGVjaW1hbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic3RpdHV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIixcIjogXCIuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IFwiKnsxLDY0fVsuKnsxLDY0fV1bLip7MSw2NH1dWy4qezEsNjN9XUAtezEsNjN9Li17MSw2M31bLi17MSw2M31dWy4tezEsNjN9XVwiLCBpID0gdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5zZXBhcmF0b3IpIGZvciAodmFyIGEgPSAwOyBhIDwgZS5xdWFudGlmaWVyOyBhKyspIGkgKz0gXCJbXCIuY29uY2F0KGUuc2VwYXJhdG9yKS5jb25jYXQodCwgXCJdXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyZWVkeTogITEsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNpbmc6IFwibG93ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcGFyYXRvcjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1YW50aWZpZXI6IDUsXG4gICAgICAgICAgICAgICAgICAgICAgICBza2lwT3B0aW9uYWxQYXJ0Q2hhcmFjdGVyOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25CZWZvcmVQYXN0ZTogZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZSA9IGUudG9Mb3dlckNhc2UoKSkucmVwbGFjZShcIm1haWx0bzpcIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIipcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IFwiWzAtOVxcdWZmMTEtXFx1ZmYxOUEtWmEtelxcdTA0MTAtXFx1MDQ0ZlxcdTA0MDFcXHUwNDUxXFx4YzAtXFx4ZmZcXHhiNSEjJCUmJyorLz0/Xl9ge3x9fi1dXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiLVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbMC05QS1aYS16LV1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvblVuTWFzazogZnVuY3Rpb24oZSwgdCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0bW9kZTogXCJlbWFpbFwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1hYzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogXCIjIzojIzojIzojIzojIzojI1wiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHZpbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogXCJWezEzfTl7NH1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IFwiW0EtSEotTlBSLVphLWhqLW5wci16XFxcXGRdXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2luZzogXCJ1cHBlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW5jb21wbGV0ZTogITAsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvVW5tYXNrOiAhMFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzc246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IFwiOTk5LTk5LTk5OTlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RWYWxpZGF0aW9uOiBmdW5jdGlvbihlLCB0LCBpLCBhLCBuLCBzLCBsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHUgPSBvLmdldE1hc2tUZW1wbGF0ZS5jYWxsKHRoaXMsICEwLCByLmdldExhc3RWYWxpZFBvc2l0aW9uLmNhbGwodGhpcyksICEwLCAhMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC9eKD8hMjE5LTA5LTk5OTl8MDc4LTA1LTExMjApKD8hNjY2fDAwMHw5LnsyfSkuezN9LSg/ITAwKS57Mn0tKD8hMHs0fSkuezR9JC8udGVzdCh1LmpvaW4oXCJcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgMjA3OiBmdW5jdGlvbihlLCB0LCBpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGEgPSBzKGkoMjM5NCkpLCBuID0gcyhpKDU1ODEpKSwgciA9IHMoaSg3MTg0KSksIG8gPSBpKDg3MTEpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHMoZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZSAmJiBlLl9fZXNNb2R1bGUgPyBlIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgbCA9IGEuZGVmYXVsdC5kZXBlbmRlbmN5TGliO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHUoZSwgdCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gXCJcIiwgbiA9IDA7IG4gPCBlLmxlbmd0aDsgbisrKSBhLmRlZmF1bHQucHJvdG90eXBlLmRlZmluaXRpb25zW2UuY2hhckF0KG4pXSB8fCB0LmRlZmluaXRpb25zW2UuY2hhckF0KG4pXSB8fCB0Lm9wdGlvbmFsbWFya2VyWzBdID09PSBlLmNoYXJBdChuKSB8fCB0Lm9wdGlvbmFsbWFya2VyWzFdID09PSBlLmNoYXJBdChuKSB8fCB0LnF1YW50aWZpZXJtYXJrZXJbMF0gPT09IGUuY2hhckF0KG4pIHx8IHQucXVhbnRpZmllcm1hcmtlclsxXSA9PT0gZS5jaGFyQXQobikgfHwgdC5ncm91cG1hcmtlclswXSA9PT0gZS5jaGFyQXQobikgfHwgdC5ncm91cG1hcmtlclsxXSA9PT0gZS5jaGFyQXQobikgfHwgdC5hbHRlcm5hdG9ybWFya2VyID09PSBlLmNoYXJBdChuKSA/IGkgKz0gXCJcXFxcXCIgKyBlLmNoYXJBdChuKSA6IGkgKz0gZS5jaGFyQXQobik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjKGUsIHQsIGksIGEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUubGVuZ3RoID4gMCAmJiB0ID4gMCAmJiAoIWkuZGlnaXRzT3B0aW9uYWwgfHwgYSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuID0gZS5pbmRleE9mKGkucmFkaXhQb2ludCksIHIgPSAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkubmVnYXRpb25TeW1ib2wuYmFjayA9PT0gZVtlLmxlbmd0aCAtIDFdICYmIChyID0gITAsIGUubGVuZ3RoLS0pLCAtMSA9PT0gbiAmJiAoZS5wdXNoKGkucmFkaXhQb2ludCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgbiA9IGUubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBvID0gMTsgbyA8PSB0OyBvKyspIGlzRmluaXRlKGVbbiArIG9dKSB8fCAoZVtuICsgb10gPSBcIjBcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHIgJiYgZS5wdXNoKGkubmVnYXRpb25TeW1ib2wuYmFjayksIGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGYoZSwgdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcIitcIiA9PT0gZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpIGluIHQudmFsaWRQb3NpdGlvbnMpIDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBvLnNlZWtOZXh0LmNhbGwodGhpcywgcGFyc2VJbnQoaSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGEgaW4gdC50ZXN0cykgaWYgKChhID0gcGFyc2VJbnQoYSkpID49IGkpIGZvciAodmFyIG4gPSAwLCByID0gdC50ZXN0c1thXS5sZW5ndGg7IG4gPCByOyBuKyspIGlmICgodm9pZCAwID09PSB0LnZhbGlkUG9zaXRpb25zW2FdIHx8IFwiLVwiID09PSBlKSAmJiB0LnRlc3RzW2FdW25dLm1hdGNoLmRlZiA9PT0gZSkgcmV0dXJuIGEgKyAodm9pZCAwICE9PSB0LnZhbGlkUG9zaXRpb25zW2FdICYmIFwiLVwiICE9PSBlID8gMSA6IDApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZChlLCB0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpID0gLTE7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGEgaW4gdC52YWxpZFBvc2l0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG4gPSB0LnZhbGlkUG9zaXRpb25zW2FdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG4gJiYgbi5tYXRjaC5kZWYgPT09IGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gcGFyc2VJbnQoYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHAoZSwgdCwgaSwgYSwgbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgciA9IHQuYnVmZmVyID8gdC5idWZmZXIuaW5kZXhPZihuLnJhZGl4UG9pbnQpIDogLTEsIG8gPSAoLTEgIT09IHIgfHwgYSAmJiBuLmppdE1hc2tpbmcpICYmIG5ldyBSZWdFeHAobi5kZWZpbml0aW9uc1s5XS52YWxpZGF0b3IpLnRlc3QoZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuLl9yYWRpeERhbmNlICYmIC0xICE9PSByICYmIG8gJiYgbnVsbCA9PSB0LnZhbGlkUG9zaXRpb25zW3JdID8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5zZXJ0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zOiByID09PSBpID8gciArIDEgOiByLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGM6IG4ucmFkaXhQb2ludFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvczogaVxuICAgICAgICAgICAgICAgICAgICB9IDogbztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYS5kZWZhdWx0LmV4dGVuZEFsaWFzZXMoe1xuICAgICAgICAgICAgICAgICAgICBudW1lcmljOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5yZXBlYXQgPSAwLCBlLmdyb3VwU2VwYXJhdG9yID09PSBlLnJhZGl4UG9pbnQgJiYgZS5kaWdpdHMgJiYgXCIwXCIgIT09IGUuZGlnaXRzICYmIChcIi5cIiA9PT0gZS5yYWRpeFBvaW50ID8gZS5ncm91cFNlcGFyYXRvciA9IFwiLFwiIDogXCIsXCIgPT09IGUucmFkaXhQb2ludCA/IGUuZ3JvdXBTZXBhcmF0b3IgPSBcIi5cIiA6IGUuZ3JvdXBTZXBhcmF0b3IgPSBcIlwiKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgXCIgPT09IGUuZ3JvdXBTZXBhcmF0b3IgJiYgKGUuc2tpcE9wdGlvbmFsUGFydENoYXJhY3RlciA9IHZvaWQgMCksIGUucGxhY2Vob2xkZXIubGVuZ3RoID4gMSAmJiAoZS5wbGFjZWhvbGRlciA9IGUucGxhY2Vob2xkZXIuY2hhckF0KDApKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyYWRpeEZvY3VzXCIgPT09IGUucG9zaXRpb25DYXJldE9uQ2xpY2sgJiYgXCJcIiA9PT0gZS5wbGFjZWhvbGRlciAmJiAoZS5wb3NpdGlvbkNhcmV0T25DbGljayA9IFwibHZwXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ID0gXCIwXCIsIGkgPSBlLnJhZGl4UG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgITAgPT09IGUubnVtZXJpY0lucHV0ICYmIHZvaWQgMCA9PT0gZS5fX2ZpbmFuY2VJbnB1dCA/ICh0ID0gXCIxXCIsIGUucG9zaXRpb25DYXJldE9uQ2xpY2sgPSBcInJhZGl4Rm9jdXNcIiA9PT0gZS5wb3NpdGlvbkNhcmV0T25DbGljayA/IFwibHZwXCIgOiBlLnBvc2l0aW9uQ2FyZXRPbkNsaWNrLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLmRpZ2l0c09wdGlvbmFsID0gITEsIGlzTmFOKGUuZGlnaXRzKSAmJiAoZS5kaWdpdHMgPSAyKSwgZS5fcmFkaXhEYW5jZSA9ICExLCBpID0gXCIsXCIgPT09IGUucmFkaXhQb2ludCA/IFwiP1wiIDogXCIhXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXCIgIT09IGUucmFkaXhQb2ludCAmJiB2b2lkIDAgPT09IGUuZGVmaW5pdGlvbnNbaV0gJiYgKGUuZGVmaW5pdGlvbnNbaV0gPSB7fSwgZS5kZWZpbml0aW9uc1tpXS52YWxpZGF0b3IgPSBcIltcIiArIGUucmFkaXhQb2ludCArIFwiXVwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLmRlZmluaXRpb25zW2ldLnBsYWNlaG9sZGVyID0gZS5yYWRpeFBvaW50LCBlLmRlZmluaXRpb25zW2ldLnN0YXRpYyA9ICEwLCBlLmRlZmluaXRpb25zW2ldLmdlbmVyYXRlZCA9ICEwKSkgOiAoZS5fX2ZpbmFuY2VJbnB1dCA9ICExLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLm51bWVyaWNJbnB1dCA9ICEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYSwgbiA9IFwiWytdXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG4gKz0gdShlLnByZWZpeCwgZSksIFwiXCIgIT09IGUuZ3JvdXBTZXBhcmF0b3IgPyAodm9pZCAwID09PSBlLmRlZmluaXRpb25zW2UuZ3JvdXBTZXBhcmF0b3JdICYmIChlLmRlZmluaXRpb25zW2UuZ3JvdXBTZXBhcmF0b3JdID0ge30sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuZGVmaW5pdGlvbnNbZS5ncm91cFNlcGFyYXRvcl0udmFsaWRhdG9yID0gXCJbXCIgKyBlLmdyb3VwU2VwYXJhdG9yICsgXCJdXCIsIGUuZGVmaW5pdGlvbnNbZS5ncm91cFNlcGFyYXRvcl0ucGxhY2Vob2xkZXIgPSBlLmdyb3VwU2VwYXJhdG9yLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLmRlZmluaXRpb25zW2UuZ3JvdXBTZXBhcmF0b3JdLnN0YXRpYyA9ICEwLCBlLmRlZmluaXRpb25zW2UuZ3JvdXBTZXBhcmF0b3JdLmdlbmVyYXRlZCA9ICEwKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbiArPSBlLl9tYXNrKGUpKSA6IG4gKz0gXCI5eyt9XCIsIHZvaWQgMCAhPT0gZS5kaWdpdHMgJiYgMCAhPT0gZS5kaWdpdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG8gPSBlLmRpZ2l0cy50b1N0cmluZygpLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNGaW5pdGUob1swXSkgJiYgb1sxXSAmJiBpc0Zpbml0ZShvWzFdKSA/IG4gKz0gaSArIHQgKyBcIntcIiArIGUuZGlnaXRzICsgXCJ9XCIgOiAoaXNOYU4oZS5kaWdpdHMpIHx8IHBhcnNlSW50KGUuZGlnaXRzKSA+IDApICYmIChlLmRpZ2l0c09wdGlvbmFsIHx8IGUuaml0TWFza2luZyA/IChhID0gbiArIGkgKyB0ICsgXCJ7MCxcIiArIGUuZGlnaXRzICsgXCJ9XCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLmtlZXBTdGF0aWMgPSAhMCkgOiBuICs9IGkgKyB0ICsgXCJ7XCIgKyBlLmRpZ2l0cyArIFwifVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgZS5pbnB1dG1vZGUgPSBcIm51bWVyaWNcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbiArPSB1KGUuc3VmZml4LCBlKSwgbiArPSBcIlstXVwiLCBhICYmIChuID0gWyBhICsgdShlLnN1ZmZpeCwgZSkgKyBcIlstXVwiLCBuIF0pLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLmdyZWVkeSA9ICExLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvaWQgMCA9PT0gZS5wYXJzZU1pbk1heE9wdGlvbnMgJiYgKG51bGwgIT09IGUubWluICYmIChlLm1pbiA9IGUubWluLnRvU3RyaW5nKCkucmVwbGFjZShuZXcgUmVnRXhwKCgwLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgci5kZWZhdWx0KShlLmdyb3VwU2VwYXJhdG9yKSwgXCJnXCIpLCBcIlwiKSwgXCIsXCIgPT09IGUucmFkaXhQb2ludCAmJiAoZS5taW4gPSBlLm1pbi5yZXBsYWNlKGUucmFkaXhQb2ludCwgXCIuXCIpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubWluID0gaXNGaW5pdGUoZS5taW4pID8gcGFyc2VGbG9hdChlLm1pbikgOiBOYU4sIGlzTmFOKGUubWluKSAmJiAoZS5taW4gPSBOdW1iZXIuTUlOX1ZBTFVFKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsICE9PSBlLm1heCAmJiAoZS5tYXggPSBlLm1heC50b1N0cmluZygpLnJlcGxhY2UobmV3IFJlZ0V4cCgoMCwgci5kZWZhdWx0KShlLmdyb3VwU2VwYXJhdG9yKSwgXCJnXCIpLCBcIlwiKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiLFwiID09PSBlLnJhZGl4UG9pbnQgJiYgKGUubWF4ID0gZS5tYXgucmVwbGFjZShlLnJhZGl4UG9pbnQsIFwiLlwiKSksIGUubWF4ID0gaXNGaW5pdGUoZS5tYXgpID8gcGFyc2VGbG9hdChlLm1heCkgOiBOYU4sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc05hTihlLm1heCkgJiYgKGUubWF4ID0gTnVtYmVyLk1BWF9WQUxVRSkpLCBlLnBhcnNlTWluTWF4T3B0aW9ucyA9IFwiZG9uZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KGUpLCBcIlwiICE9PSBlLnJhZGl4UG9pbnQgJiYgKGUuc3Vic3RpdHV0ZXNbXCIuXCIgPT0gZS5yYWRpeFBvaW50ID8gXCIsXCIgOiBcIi5cIl0gPSBlLnJhZGl4UG9pbnQpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9tYXNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiKFwiICsgZS5ncm91cFNlcGFyYXRvciArIFwiOTk5KXsrfDF9XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlnaXRzOiBcIipcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZ2l0c09wdGlvbmFsOiAhMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZm9yY2VEaWdpdHNPbkJsdXI6ICExLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkaXhQb2ludDogXCIuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbkNhcmV0T25DbGljazogXCJyYWRpeEZvY3VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmFkaXhEYW5jZTogITAsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cFNlcGFyYXRvcjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbG93TWludXM6ICEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmVnYXRpb25TeW1ib2w6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9udDogXCItXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFjazogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWZpeDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1ZmZpeDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFNldE1heE9uT3ZlcmZsb3c6ICExLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0VHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB1bm1hc2tBc051bWJlcjogITEsXG4gICAgICAgICAgICAgICAgICAgICAgICByb3VuZGluZ0ZOOiBNYXRoLnJvdW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRtb2RlOiBcImRlY2ltYWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3J0Y3V0czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGs6IFwiMTAwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG06IFwiMTAwMDAwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JlZWR5OiAhMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0QWxpZ246ICEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zZXJ0TW9kZTogITAsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvVW5tYXNrOiAhMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VQcm90b3R5cGVEZWZpbml0aW9uczogITEsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpcExlYWRpbmdaZXJvZXM6ICEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAwOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IHAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb25TeW1ib2w6IFwiOVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbMC05XFx1ZmYxMC1cXHVmZjE5XFx1MDY2MC1cXHUwNjY5XFx1MDZmMC1cXHUwNmY5XVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uU3ltYm9sOiBcIipcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIrXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBmdW5jdGlvbihlLCB0LCBpLCBhLCBuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbi5hbGxvd01pbnVzICYmIChcIi1cIiA9PT0gZSB8fCBlID09PSBuLm5lZ2F0aW9uU3ltYm9sLmZyb250KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCItXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBmdW5jdGlvbihlLCB0LCBpLCBhLCBuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbi5hbGxvd01pbnVzICYmIGUgPT09IG4ubmVnYXRpb25TeW1ib2wuYmFjaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVWYWxpZGF0aW9uOiBmdW5jdGlvbihlLCB0LCBpLCBhLCBuLCByLCBvLCBzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCExICE9PSBuLl9fZmluYW5jZUlucHV0ICYmIGkgPT09IG4ucmFkaXhQb2ludCkgcmV0dXJuICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsID0gZS5pbmRleE9mKG4ucmFkaXhQb2ludCksIHUgPSB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ID0gZnVuY3Rpb24oZSwgdCwgaSwgYSwgbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbi5fcmFkaXhEYW5jZSAmJiBuLm51bWVyaWNJbnB1dCAmJiB0ICE9PSBuLm5lZ2F0aW9uU3ltYm9sLmJhY2sgJiYgZSA8PSBpICYmIChpID4gMCB8fCB0ID09IG4ucmFkaXhQb2ludCkgJiYgKHZvaWQgMCA9PT0gYS52YWxpZFBvc2l0aW9uc1tlIC0gMV0gfHwgYS52YWxpZFBvc2l0aW9uc1tlIC0gMV0uaW5wdXQgIT09IG4ubmVnYXRpb25TeW1ib2wuYmFjaykgJiYgKGUgLT0gMSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0odCwgaSwgbCwgciwgbiksIFwiLVwiID09PSBpIHx8IGkgPT09IG4ubmVnYXRpb25TeW1ib2wuZnJvbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEwICE9PSBuLmFsbG93TWludXMpIHJldHVybiAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGMgPSAhMSwgcCA9IGQoXCIrXCIsIHIpLCBoID0gZChcIi1cIiwgcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtMSAhPT0gcCAmJiAoYyA9IFsgcCwgaCBdKSwgITEgIT09IGMgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmU6IGMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldDogdSAtIG4ubmVnYXRpb25TeW1ib2wuYmFjay5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc2VydDogWyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zOiBmLmNhbGwodGhpcywgXCIrXCIsIHIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGM6IG4ubmVnYXRpb25TeW1ib2wuZnJvbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbUlzVmFsaWQ6ICEwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zOiBmLmNhbGwodGhpcywgXCItXCIsIHIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGM6IG4ubmVnYXRpb25TeW1ib2wuYmFjayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tSXNWYWxpZDogdm9pZCAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldDogdSArIG4ubmVnYXRpb25TeW1ib2wuYmFjay5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IG4uZ3JvdXBTZXBhcmF0b3IpIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0OiB1XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocykgcmV0dXJuICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgtMSAhPT0gbCAmJiAhMCA9PT0gbi5fcmFkaXhEYW5jZSAmJiAhMSA9PT0gYSAmJiBpID09PSBuLnJhZGl4UG9pbnQgJiYgdm9pZCAwICE9PSBuLmRpZ2l0cyAmJiAoaXNOYU4obi5kaWdpdHMpIHx8IHBhcnNlSW50KG4uZGlnaXRzKSA+IDApICYmIGwgIT09IHQpIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0OiBuLl9yYWRpeERhbmNlICYmIHQgPT09IGwgLSAxID8gbCArIDEgOiBsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoITEgPT09IG4uX19maW5hbmNlSW5wdXQpIGlmIChhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuLmRpZ2l0c09wdGlvbmFsKSByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV3cml0ZVBvc2l0aW9uOiBvLmVuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW4uZGlnaXRzT3B0aW9uYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLmJlZ2luID4gbCAmJiBvLmVuZCA8PSBsKSByZXR1cm4gaSA9PT0gbi5yYWRpeFBvaW50ID8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc2VydDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3M6IGwgKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbUlzVmFsaWQ6ICEwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXdyaXRlUG9zaXRpb246IGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV3cml0ZVBvc2l0aW9uOiBsICsgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLmJlZ2luIDwgbCkgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXdyaXRlUG9zaXRpb246IG8uYmVnaW4gLSAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghbi5zaG93TWFza09uSG92ZXIgJiYgIW4uc2hvd01hc2tPbkZvY3VzICYmICFuLmRpZ2l0c09wdGlvbmFsICYmIG4uZGlnaXRzID4gMCAmJiBcIlwiID09PSB0aGlzLl9fdmFsdWVHZXQuY2FsbCh0aGlzLmVsKSkgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV3cml0ZVBvc2l0aW9uOiBsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXdyaXRlUG9zaXRpb246IHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RWYWxpZGF0aW9uOiBmdW5jdGlvbihlLCB0LCBpLCBhLCBuLCByLCBvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCExID09PSBhKSByZXR1cm4gYTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobykgcmV0dXJuICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChudWxsICE9PSBuLm1pbiB8fCBudWxsICE9PSBuLm1heCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcyA9IG4ub25Vbk1hc2soZS5zbGljZSgpLnJldmVyc2UoKS5qb2luKFwiXCIpLCB2b2lkIDAsIGwuZXh0ZW5kKHt9LCBuLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bm1hc2tBc051bWJlcjogITBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobnVsbCAhPT0gbi5taW4gJiYgcyA8IG4ubWluICYmIChzLnRvU3RyaW5nKCkubGVuZ3RoID4gbi5taW4udG9TdHJpbmcoKS5sZW5ndGggfHwgcyA8IDApKSByZXR1cm4gITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChudWxsICE9PSBuLm1heCAmJiBzID4gbi5tYXgpIHJldHVybiAhIW4uU2V0TWF4T25PdmVyZmxvdyAmJiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoRnJvbUJ1ZmZlcjogITAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmZXI6IGMobi5tYXgudG9TdHJpbmcoKS5yZXBsYWNlKFwiLlwiLCBuLnJhZGl4UG9pbnQpLnNwbGl0KFwiXCIpLCBuLmRpZ2l0cywgbikucmV2ZXJzZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVW5NYXNrOiBmdW5jdGlvbihlLCB0LCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFwiXCIgPT09IHQgJiYgITAgPT09IGkubnVsbGFibGUpIHJldHVybiB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhID0gZS5yZXBsYWNlKGkucHJlZml4LCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYSA9IChhID0gYS5yZXBsYWNlKGkuc3VmZml4LCBcIlwiKSkucmVwbGFjZShuZXcgUmVnRXhwKCgwLCByLmRlZmF1bHQpKGkuZ3JvdXBTZXBhcmF0b3IpLCBcImdcIiksIFwiXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwiICE9PSBpLnBsYWNlaG9sZGVyLmNoYXJBdCgwKSAmJiAoYSA9IGEucmVwbGFjZShuZXcgUmVnRXhwKGkucGxhY2Vob2xkZXIuY2hhckF0KDApLCBcImdcIiksIFwiMFwiKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkudW5tYXNrQXNOdW1iZXIgPyAoXCJcIiAhPT0gaS5yYWRpeFBvaW50ICYmIC0xICE9PSBhLmluZGV4T2YoaS5yYWRpeFBvaW50KSAmJiAoYSA9IGEucmVwbGFjZShyLmRlZmF1bHQuY2FsbCh0aGlzLCBpLnJhZGl4UG9pbnQpLCBcIi5cIikpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhID0gKGEgPSBhLnJlcGxhY2UobmV3IFJlZ0V4cChcIl5cIiArICgwLCByLmRlZmF1bHQpKGkubmVnYXRpb25TeW1ib2wuZnJvbnQpKSwgXCItXCIpKS5yZXBsYWNlKG5ldyBSZWdFeHAoKDAsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuZGVmYXVsdCkoaS5uZWdhdGlvblN5bWJvbC5iYWNrKSArIFwiJFwiKSwgXCJcIiksIE51bWJlcihhKSkgOiBhO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGxldGU6IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9ICh0Lm51bWVyaWNJbnB1dCA/IGUuc2xpY2UoKS5yZXZlcnNlKCkgOiBlKS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpID0gKGkgPSAoaSA9IChpID0gKGkgPSBpLnJlcGxhY2UobmV3IFJlZ0V4cChcIl5cIiArICgwLCByLmRlZmF1bHQpKHQubmVnYXRpb25TeW1ib2wuZnJvbnQpKSwgXCItXCIpKS5yZXBsYWNlKG5ldyBSZWdFeHAoKDAsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuZGVmYXVsdCkodC5uZWdhdGlvblN5bWJvbC5iYWNrKSArIFwiJFwiKSwgXCJcIikpLnJlcGxhY2UodC5wcmVmaXgsIFwiXCIpKS5yZXBsYWNlKHQuc3VmZml4LCBcIlwiKSkucmVwbGFjZShuZXcgUmVnRXhwKCgwLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByLmRlZmF1bHQpKHQuZ3JvdXBTZXBhcmF0b3IpICsgXCIoWzAtOV17M30pXCIsIFwiZ1wiKSwgXCIkMVwiKSwgXCIsXCIgPT09IHQucmFkaXhQb2ludCAmJiAoaSA9IGkucmVwbGFjZSgoMCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgci5kZWZhdWx0KSh0LnJhZGl4UG9pbnQpLCBcIi5cIikpLCBpc0Zpbml0ZShpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkJlZm9yZU1hc2s6IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IHQucmFkaXhQb2ludCB8fCBcIixcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0Zpbml0ZSh0LmRpZ2l0cykgJiYgKHQuZGlnaXRzID0gcGFyc2VJbnQodC5kaWdpdHMpKSwgXCJudW1iZXJcIiAhPSB0eXBlb2YgZSAmJiBcIm51bWJlclwiICE9PSB0LmlucHV0VHlwZSB8fCBcIlwiID09PSBpIHx8IChlID0gZS50b1N0cmluZygpLnJlcGxhY2UoXCIuXCIsIGkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYSA9IFwiLVwiID09PSBlLmNoYXJBdCgwKSB8fCBlLmNoYXJBdCgwKSA9PT0gdC5uZWdhdGlvblN5bWJvbC5mcm9udCwgbiA9IGUuc3BsaXQoaSksIG8gPSBuWzBdLnJlcGxhY2UoL1teXFwtMC05XS9nLCBcIlwiKSwgcyA9IG4ubGVuZ3RoID4gMSA/IG5bMV0ucmVwbGFjZSgvW14wLTldL2csIFwiXCIpIDogXCJcIiwgbCA9IG4ubGVuZ3RoID4gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlID0gbyArIChcIlwiICE9PSBzID8gaSArIHMgOiBzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFwiXCIgIT09IGkgJiYgKHUgPSB0LmRpZ2l0c09wdGlvbmFsID8gdC5kaWdpdHMgPCBzLmxlbmd0aCA/IHQuZGlnaXRzIDogcy5sZW5ndGggOiB0LmRpZ2l0cywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIiAhPT0gcyB8fCAhdC5kaWdpdHNPcHRpb25hbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGYgPSBNYXRoLnBvdygxMCwgdSB8fCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZSA9IGUucmVwbGFjZSgoMCwgci5kZWZhdWx0KShpKSwgXCIuXCIpLCBpc05hTihwYXJzZUZsb2F0KGUpKSB8fCAoZSA9ICh0LnJvdW5kaW5nRk4ocGFyc2VGbG9hdChlKSAqIGYpIC8gZikudG9GaXhlZCh1KSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlID0gZS50b1N0cmluZygpLnJlcGxhY2UoXCIuXCIsIGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PT0gdC5kaWdpdHMgJiYgLTEgIT09IGUuaW5kZXhPZihpKSAmJiAoZSA9IGUuc3Vic3RyaW5nKDAsIGUuaW5kZXhPZihpKSkpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsICE9PSB0Lm1pbiB8fCBudWxsICE9PSB0Lm1heCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZCA9IGUudG9TdHJpbmcoKS5yZXBsYWNlKGksIFwiLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCAhPT0gdC5taW4gJiYgZCA8IHQubWluID8gZSA9IHQubWluLnRvU3RyaW5nKCkucmVwbGFjZShcIi5cIiwgaSkgOiBudWxsICE9PSB0Lm1heCAmJiBkID4gdC5tYXggJiYgKGUgPSB0Lm1heC50b1N0cmluZygpLnJlcGxhY2UoXCIuXCIsIGkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGEgJiYgXCItXCIgIT09IGUuY2hhckF0KDApICYmIChlID0gXCItXCIgKyBlKSwgYyhlLnRvU3RyaW5nKCkuc3BsaXQoXCJcIiksIHUsIHQsIGwpLmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb25CZWZvcmVXcml0ZTogZnVuY3Rpb24oZSwgdCwgaSwgYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG4oZSwgdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoITEgIT09IGEuX19maW5hbmNlSW5wdXQgfHwgdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBlLmluZGV4T2YoYS5yYWRpeFBvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0xICE9PSBpICYmIGUuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcIlwiICE9PSBhLmdyb3VwU2VwYXJhdG9yKSBmb3IgKDstMSAhPT0gKGkgPSBlLmluZGV4T2YoYS5ncm91cFNlcGFyYXRvcikpOyApIGUuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG8sIHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGEuc3RyaXBMZWFkaW5nWmVyb2VzICYmIChzID0gZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IG5ldyBSZWdFeHAoXCIoXlwiICsgKFwiXCIgIT09IHQubmVnYXRpb25TeW1ib2wuZnJvbnQgPyAoMCwgci5kZWZhdWx0KSh0Lm5lZ2F0aW9uU3ltYm9sLmZyb250KSArIFwiP1wiIDogXCJcIikgKyAoMCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuZGVmYXVsdCkodC5wcmVmaXgpICsgXCIpKC4qKShcIiArICgwLCByLmRlZmF1bHQpKHQuc3VmZml4KSArIChcIlwiICE9IHQubmVnYXRpb25TeW1ib2wuYmFjayA/ICgwLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgci5kZWZhdWx0KSh0Lm5lZ2F0aW9uU3ltYm9sLmJhY2spICsgXCI/XCIgOiBcIlwiKSArIFwiJClcIikuZXhlYyhlLnNsaWNlKCkucmV2ZXJzZSgpLmpvaW4oXCJcIikpLCBhID0gaSA/IGlbMl0gOiBcIlwiLCBuID0gITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhICYmIChhID0gYS5zcGxpdCh0LnJhZGl4UG9pbnQuY2hhckF0KDApKVswXSwgbiA9IG5ldyBSZWdFeHAoXCJeWzBcIiArIHQuZ3JvdXBTZXBhcmF0b3IgKyBcIl0qXCIpLmV4ZWMoYSkpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgISghbiB8fCAhKG5bMF0ubGVuZ3RoID4gMSB8fCBuWzBdLmxlbmd0aCA+IDAgJiYgblswXS5sZW5ndGggPCBhLmxlbmd0aCkpICYmIG47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSh0LCBhKSkpIGZvciAodmFyIHUgPSB0LmpvaW4oXCJcIikubGFzdEluZGV4T2Yoc1swXS5zcGxpdChcIlwiKS5yZXZlcnNlKCkuam9pbihcIlwiKSkgLSAoc1swXSA9PSBzLmlucHV0ID8gMCA6IDEpLCBmID0gc1swXSA9PSBzLmlucHV0ID8gMSA6IDAsIGQgPSBzWzBdLmxlbmd0aCAtIGY7IGQgPiAwOyBkLS0pIGRlbGV0ZSB0aGlzLm1hc2tzZXQudmFsaWRQb3NpdGlvbnNbdSArIGRdLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdFt1ICsgZF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUpIHN3aXRjaCAoZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYmx1clwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNoZWNrdmFsXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChudWxsICE9PSBhLm1pbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSBhLm9uVW5NYXNrKHQuc2xpY2UoKS5yZXZlcnNlKCkuam9pbihcIlwiKSwgdm9pZCAwLCBsLmV4dGVuZCh7fSwgYSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVubWFza0FzTnVtYmVyOiAhMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG51bGwgIT09IGEubWluICYmIHAgPCBhLm1pbikgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoRnJvbUJ1ZmZlcjogITAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyOiBjKGEubWluLnRvU3RyaW5nKCkucmVwbGFjZShcIi5cIiwgYS5yYWRpeFBvaW50KS5zcGxpdChcIlwiKSwgYS5kaWdpdHMsIGEpLnJldmVyc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodFt0Lmxlbmd0aCAtIDFdID09PSBhLm5lZ2F0aW9uU3ltYm9sLmZyb250KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaCA9IG5ldyBSZWdFeHAoXCIoXlwiICsgKFwiXCIgIT0gYS5uZWdhdGlvblN5bWJvbC5mcm9udCA/ICgwLCByLmRlZmF1bHQpKGEubmVnYXRpb25TeW1ib2wuZnJvbnQpICsgXCI/XCIgOiBcIlwiKSArICgwLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuZGVmYXVsdCkoYS5wcmVmaXgpICsgXCIpKC4qKShcIiArICgwLCByLmRlZmF1bHQpKGEuc3VmZml4KSArIChcIlwiICE9IGEubmVnYXRpb25TeW1ib2wuYmFjayA/ICgwLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuZGVmYXVsdCkoYS5uZWdhdGlvblN5bWJvbC5iYWNrKSArIFwiP1wiIDogXCJcIikgKyBcIiQpXCIpLmV4ZWMobih0LnNsaWNlKCksICEwKS5yZXZlcnNlKCkuam9pbihcIlwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwID09IChoID8gaFsyXSA6IFwiXCIpICYmIChvID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hGcm9tQnVmZmVyOiAhMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmZXI6IFsgMCBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcIlwiICE9PSBhLnJhZGl4UG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQuaW5kZXhPZihhLnJhZGl4UG9pbnQpID09PSBhLnN1ZmZpeC5sZW5ndGggJiYgKG8gJiYgby5idWZmZXIgPyBvLmJ1ZmZlci5zcGxpY2UoMCwgMSArIGEuc3VmZml4Lmxlbmd0aCkgOiAodC5zcGxpY2UoMCwgMSArIGEuc3VmZml4Lmxlbmd0aCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoRnJvbUJ1ZmZlcjogITAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyOiBuKHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGEuZW5mb3JjZURpZ2l0c09uQmx1cikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG0gPSAobyA9IG8gfHwge30pICYmIG8uYnVmZmVyIHx8IHQuc2xpY2UoKS5yZXZlcnNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLnJlZnJlc2hGcm9tQnVmZmVyID0gITAsIG8uYnVmZmVyID0gYyhtLCBhLmRpZ2l0cywgYSwgITApLnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvbktleURvd246IGZ1bmN0aW9uKGUsIHQsIGksIGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgciwgbywgcyA9IGwodGhpcyksIHUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUua2V5Q29kZSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKG8gPSBhLnNob3J0Y3V0cyAmJiBhLnNob3J0Y3V0c1t1XSkgJiYgby5sZW5ndGggPiAxKSByZXR1cm4gdGhpcy5pbnB1dG1hc2suX192YWx1ZVNldC5jYWxsKHRoaXMsIHBhcnNlRmxvYXQodGhpcy5pbnB1dG1hc2sudW5tYXNrZWR2YWx1ZSgpKSAqIHBhcnNlSW50KG8pKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy50cmlnZ2VyKFwic2V0dmFsdWVcIiksICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLmN0cmxLZXkpIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIG4uZGVmYXVsdC5VUDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXRtYXNrLl9fdmFsdWVTZXQuY2FsbCh0aGlzLCBwYXJzZUZsb2F0KHRoaXMuaW5wdXRtYXNrLnVubWFza2VkdmFsdWUoKSkgKyBwYXJzZUludChhLnN0ZXApKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMudHJpZ2dlcihcInNldHZhbHVlXCIpLCAhMTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBuLmRlZmF1bHQuRE9XTjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXRtYXNrLl9fdmFsdWVTZXQuY2FsbCh0aGlzLCBwYXJzZUZsb2F0KHRoaXMuaW5wdXRtYXNrLnVubWFza2VkdmFsdWUoKSkgLSBwYXJzZUludChhLnN0ZXApKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMudHJpZ2dlcihcInNldHZhbHVlXCIpLCAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlLnNoaWZ0S2V5ICYmIChlLmtleUNvZGUgPT09IG4uZGVmYXVsdC5ERUxFVEUgfHwgZS5rZXlDb2RlID09PSBuLmRlZmF1bHQuQkFDS1NQQUNFIHx8IGUua2V5Q29kZSA9PT0gbi5kZWZhdWx0LkJBQ0tTUEFDRV9TQUZBUkkpICYmIGkuYmVnaW4gIT09IHQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0W2Uua2V5Q29kZSA9PT0gbi5kZWZhdWx0LkRFTEVURSA/IGkuYmVnaW4gLSAxIDogaS5lbmRdID09PSBhLm5lZ2F0aW9uU3ltYm9sLmZyb250KSByZXR1cm4gciA9IHQuc2xpY2UoKS5yZXZlcnNlKCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwiICE9PSBhLm5lZ2F0aW9uU3ltYm9sLmZyb250ICYmIHIuc2hpZnQoKSwgXCJcIiAhPT0gYS5uZWdhdGlvblN5bWJvbC5iYWNrICYmIHIucG9wKCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnRyaWdnZXIoXCJzZXR2YWx1ZVwiLCBbIHIuam9pbihcIlwiKSwgaS5iZWdpbiBdKSwgITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghMCA9PT0gYS5fcmFkaXhEYW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGYgPSB0LmluZGV4T2YoYS5yYWRpeFBvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhLmRpZ2l0c09wdGlvbmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT09IGYpIHJldHVybiAociA9IHQuc2xpY2UoKS5yZXZlcnNlKCkpLnBvcCgpLCBzLnRyaWdnZXIoXCJzZXR2YWx1ZVwiLCBbIHIuam9pbihcIlwiKSwgaS5iZWdpbiA+PSByLmxlbmd0aCA/IHIubGVuZ3RoIDogaS5iZWdpbiBdKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKC0xICE9PSBmICYmIChpLmJlZ2luIDwgZiB8fCBpLmVuZCA8IGYgfHwgZS5rZXlDb2RlID09PSBuLmRlZmF1bHQuREVMRVRFICYmIGkuYmVnaW4gPT09IGYpKSByZXR1cm4gaS5iZWdpbiAhPT0gaS5lbmQgfHwgZS5rZXlDb2RlICE9PSBuLmRlZmF1bHQuQkFDS1NQQUNFICYmIGUua2V5Q29kZSAhPT0gbi5kZWZhdWx0LkJBQ0tTUEFDRV9TQUZBUkkgfHwgaS5iZWdpbisrLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChyID0gdC5zbGljZSgpLnJldmVyc2UoKSkuc3BsaWNlKHIubGVuZ3RoIC0gaS5iZWdpbiwgaS5iZWdpbiAtIGkuZW5kICsgMSksIHIgPSBjKHIsIGEuZGlnaXRzLCBhKS5qb2luKFwiXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMudHJpZ2dlcihcInNldHZhbHVlXCIsIFsgciwgaS5iZWdpbiA+PSByLmxlbmd0aCA/IGYgKyAxIDogaS5iZWdpbiBdKSwgITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVmaXg6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cFNlcGFyYXRvcjogXCIsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlhczogXCJudW1lcmljXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWdpdHM6IDIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWdpdHNPcHRpb25hbDogITFcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZGVjaW1hbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxpYXM6IFwibnVtZXJpY1wiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGludGVnZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWFzOiBcIm51bWVyaWNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0bW9kZTogXCJudW1lcmljXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWdpdHM6IDBcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudGFnZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxpYXM6IFwibnVtZXJpY1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4OiAxMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWZmaXg6IFwiICVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZ2l0czogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbG93TWludXM6ICExXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGluZGlhbm5zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlhczogXCJudW1lcmljXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBfbWFzazogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIihcIiArIGUuZ3JvdXBTZXBhcmF0b3IgKyBcIjk5KXsqfDF9KFwiICsgZS5ncm91cFNlcGFyYXRvciArIFwiOTk5KXsxfDF9XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBTZXBhcmF0b3I6IFwiLFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkaXhQb2ludDogXCIuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWdpdHM6IDIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWdpdHNPcHRpb25hbDogITFcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDkzODA6IGZ1bmN0aW9uKGUsIHQsIGkpIHtcbiAgICAgICAgICAgICAgICB2YXIgYTtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodCwgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICEwXG4gICAgICAgICAgICAgICAgfSksIHQuZGVmYXVsdCA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICB2YXIgbiA9ICgoYSA9IGkoODc0MSkpICYmIGEuX19lc01vZHVsZSA/IGEgOiB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IGFcbiAgICAgICAgICAgICAgICB9KS5kZWZhdWx0ID8gd2luZG93IDoge307XG4gICAgICAgICAgICAgICAgdC5kZWZhdWx0ID0gbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICA3NzYwOiBmdW5jdGlvbihlLCB0LCBpKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAhMFxuICAgICAgICAgICAgICAgIH0pLCB0LkhhbmRsZU5hdGl2ZVBsYWNlaG9sZGVyID0gZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IGUgPyBlLmlucHV0bWFzayA6IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsLmllKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5pbnB1dG1hc2suX3ZhbHVlR2V0KCkgIT09IHQgJiYgKGUucGxhY2Vob2xkZXIgIT09IHQgfHwgXCJcIiA9PT0gZS5wbGFjZWhvbGRlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYSA9IG8uZ2V0QnVmZmVyLmNhbGwoaSkuc2xpY2UoKSwgbiA9IGUuaW5wdXRtYXNrLl92YWx1ZUdldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuICE9PSB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByID0gby5nZXRMYXN0VmFsaWRQb3NpdGlvbi5jYWxsKGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtMSA9PT0gciAmJiBuID09PSBvLmdldEJ1ZmZlclRlbXBsYXRlLmNhbGwoaSkuam9pbihcIlwiKSA/IGEgPSBbXSA6IC0xICE9PSByICYmIGYuY2FsbChpLCBhKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAoZSwgYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgZS5wbGFjZWhvbGRlciAhPT0gdCAmJiAoZS5wbGFjZWhvbGRlciA9IHQsIFwiXCIgPT09IGUucGxhY2Vob2xkZXIgJiYgZS5yZW1vdmVBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiKSk7XG4gICAgICAgICAgICAgICAgfSwgdC5hcHBseUlucHV0VmFsdWUgPSBjLCB0LmNoZWNrVmFsID0gZCwgdC5jbGVhck9wdGlvbmFsVGFpbCA9IGYsIHQudW5tYXNrZWR2YWx1ZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSBlID8gZS5pbnB1dG1hc2sgOiB0aGlzLCBpID0gdC5vcHRzLCBhID0gdC5tYXNrc2V0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZvaWQgMCA9PT0gZS5pbnB1dG1hc2spIHJldHVybiBlLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5pbnB1dG1hc2sgJiYgZS5pbnB1dG1hc2sucmVmcmVzaFZhbHVlICYmIGMoZSwgZS5pbnB1dG1hc2suX3ZhbHVlR2V0KCEwKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIG4gPSBbXSwgciA9IGEudmFsaWRQb3NpdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHMgaW4gcikgcltzXSAmJiByW3NdLm1hdGNoICYmICgxICE9IHJbc10ubWF0Y2guc3RhdGljIHx8IEFycmF5LmlzQXJyYXkoYS5tZXRhZGF0YSkgJiYgITAgIT09IHJbc10uZ2VuZXJhdGVkSW5wdXQpICYmIG4ucHVzaChyW3NdLmlucHV0KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGwgPSAwID09PSBuLmxlbmd0aCA/IFwiXCIgOiAodC5pc1JUTCA/IG4ucmV2ZXJzZSgpIDogbikuam9pbihcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgaS5vblVuTWFzaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHUgPSAodC5pc1JUTCA/IG8uZ2V0QnVmZmVyLmNhbGwodCkuc2xpY2UoKS5yZXZlcnNlKCkgOiBvLmdldEJ1ZmZlci5jYWxsKHQpKS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbCA9IGkub25Vbk1hc2suY2FsbCh0LCB1LCBsLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbDtcbiAgICAgICAgICAgICAgICB9LCB0LndyaXRlQnVmZmVyID0gcDtcbiAgICAgICAgICAgICAgICB2YXIgYSwgbiA9IChhID0gaSg1NTgxKSkgJiYgYS5fX2VzTW9kdWxlID8gYSA6IHtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogYVxuICAgICAgICAgICAgICAgIH0sIHIgPSBpKDQ3MTMpLCBvID0gaSg4NzExKSwgcyA9IGkoNzIxNSksIGwgPSBpKDk4NDUpLCB1ID0gaSg2MDMwKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjKGUsIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBlID8gZS5pbnB1dG1hc2sgOiB0aGlzLCBhID0gaS5vcHRzO1xuICAgICAgICAgICAgICAgICAgICBlLmlucHV0bWFzay5yZWZyZXNoVmFsdWUgPSAhMSwgXCJmdW5jdGlvblwiID09IHR5cGVvZiBhLm9uQmVmb3JlTWFzayAmJiAodCA9IGEub25CZWZvcmVNYXNrLmNhbGwoaSwgdCwgYSkgfHwgdCksIFxuICAgICAgICAgICAgICAgICAgICBkKGUsICEwLCAhMSwgdCA9IHQudG9TdHJpbmcoKS5zcGxpdChcIlwiKSksIGkudW5kb1ZhbHVlID0gaS5fdmFsdWVHZXQoITApLCAoYS5jbGVhck1hc2tPbkxvc3RGb2N1cyB8fCBhLmNsZWFySW5jb21wbGV0ZSkgJiYgZS5pbnB1dG1hc2suX3ZhbHVlR2V0KCkgPT09IG8uZ2V0QnVmZmVyVGVtcGxhdGUuY2FsbChpKS5qb2luKFwiXCIpICYmIC0xID09PSBvLmdldExhc3RWYWxpZFBvc2l0aW9uLmNhbGwoaSkgJiYgZS5pbnB1dG1hc2suX3ZhbHVlU2V0KFwiXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBmKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB0LCBpID0gci5nZXRNYXNrVGVtcGxhdGUuY2FsbCh0aGlzLCAhMCwgMCwgITAsIHZvaWQgMCwgITApOyB2b2lkIDAgIT09ICh0ID0gaS5zaGlmdCgpKTsgKSBlLnB1c2godCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBkKGUsIHQsIGksIGEsIG4pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGwgPSBlID8gZS5pbnB1dG1hc2sgOiB0aGlzLCBjID0gbC5tYXNrc2V0LCBmID0gbC5vcHRzLCBkID0gbC5kZXBlbmRlbmN5TGliLCBoID0gYS5zbGljZSgpLCBtID0gXCJcIiwgdiA9IC0xLCBnID0gdm9pZCAwLCBrID0gZi5za2lwT3B0aW9uYWxQYXJ0Q2hhcmFjdGVyO1xuICAgICAgICAgICAgICAgICAgICBmLnNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXIgPSBcIlwiLCBvLnJlc2V0TWFza1NldC5jYWxsKGwpLCBjLnRlc3RzID0ge30sIHYgPSBmLnJhZGl4UG9pbnQgPyBvLmRldGVybWluZU5ld0NhcmV0UG9zaXRpb24uY2FsbChsLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZWdpbjogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogMFxuICAgICAgICAgICAgICAgICAgICB9LCAhMSwgITEgPT09IGYuX19maW5hbmNlSW5wdXQgPyBcInJhZGl4Rm9jdXNcIiA6IHZvaWQgMCkuYmVnaW4gOiAwLCBjLnAgPSB2LCBsLmNhcmV0UG9zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVnaW46IHZcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHkgPSBbXSwgYiA9IGwuY2FyZXRQb3M7XG4gICAgICAgICAgICAgICAgICAgIGlmIChoLmZvckVhY2goKGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2b2lkIDAgIT09IGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYSA9IG5ldyBkLkV2ZW50KFwiX2NoZWNrdmFsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEua2V5Q29kZSA9IGUudG9TdHJpbmcoKS5jaGFyQ29kZUF0KDApLCBtICs9IGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG4gPSBvLmdldExhc3RWYWxpZFBvc2l0aW9uLmNhbGwobCwgdm9pZCAwLCAhMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIWZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHIuZ2V0TWFza1RlbXBsYXRlLmNhbGwobCwgITAsIDApLnNsaWNlKGUsIG8uc2Vla05leHQuY2FsbChsLCBlLCAhMSwgITEpKS5qb2luKFwiXCIpLnJlcGxhY2UoLycvZywgXCJcIiksIGEgPSBpLmluZGV4T2YodCk7IGEgPiAwICYmIFwiIFwiID09PSBpW2EgLSAxXTsgKSBhLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuID0gMCA9PT0gYSAmJiAhby5pc01hc2suY2FsbChsLCBlKSAmJiAoci5nZXRUZXN0LmNhbGwobCwgZSkubWF0Y2gubmF0aXZlRGVmID09PSB0LmNoYXJBdCgwKSB8fCAhMCA9PT0gci5nZXRUZXN0LmNhbGwobCwgZSkubWF0Y2guc3RhdGljICYmIHIuZ2V0VGVzdC5jYWxsKGwsIGUpLm1hdGNoLm5hdGl2ZURlZiA9PT0gXCInXCIgKyB0LmNoYXJBdCgwKSB8fCBcIiBcIiA9PT0gci5nZXRUZXN0LmNhbGwobCwgZSkubWF0Y2gubmF0aXZlRGVmICYmIChyLmdldFRlc3QuY2FsbChsLCBlICsgMSkubWF0Y2gubmF0aXZlRGVmID09PSB0LmNoYXJBdCgwKSB8fCAhMCA9PT0gci5nZXRUZXN0LmNhbGwobCwgZSArIDEpLm1hdGNoLnN0YXRpYyAmJiByLmdldFRlc3QuY2FsbChsLCBlICsgMSkubWF0Y2gubmF0aXZlRGVmID09PSBcIidcIiArIHQuY2hhckF0KDApKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbiAmJiBhID4gMCAmJiAhby5pc01hc2suY2FsbChsLCBlLCAhMSwgITApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcyA9IG8uc2Vla05leHQuY2FsbChsLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGwuY2FyZXRQb3MuYmVnaW4gPCBzICYmIChsLmNhcmV0UG9zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luOiBzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KHYsIG0pID8gKGcgPSB1LkV2ZW50SGFuZGxlcnMua2V5cHJlc3NFdmVudC5jYWxsKGwsIGEsICEwLCAhMSwgaSwgbC5jYXJldFBvcy5iZWdpbikpICYmICh2ID0gbC5jYXJldFBvcy5iZWdpbiArIDEsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0gPSBcIlwiKSA6IGcgPSB1LkV2ZW50SGFuZGxlcnMua2V5cHJlc3NFdmVudC5jYWxsKGwsIGEsICEwLCAhMSwgaSwgbiArIDEpLCBnID8gKHZvaWQgMCAhPT0gZy5wb3MgJiYgYy52YWxpZFBvc2l0aW9uc1tnLnBvc10gJiYgITAgPT09IGMudmFsaWRQb3NpdGlvbnNbZy5wb3NdLm1hdGNoLnN0YXRpYyAmJiB2b2lkIDAgPT09IGMudmFsaWRQb3NpdGlvbnNbZy5wb3NdLmFsdGVybmF0aW9uICYmICh5LnB1c2goZy5wb3MpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsLmlzUlRMIHx8IChnLmZvcndhcmRQb3NpdGlvbiA9IGcucG9zICsgMSkpLCBwLmNhbGwobCwgdm9pZCAwLCBvLmdldEJ1ZmZlci5jYWxsKGwpLCBnLmZvcndhcmRQb3NpdGlvbiwgYSwgITEpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsLmNhcmV0UG9zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWdpbjogZy5mb3J3YXJkUG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogZy5mb3J3YXJkUG9zaXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBiID0gbC5jYXJldFBvcykgOiB2b2lkIDAgPT09IGMudmFsaWRQb3NpdGlvbnNbdF0gJiYgaFt0XSA9PT0gci5nZXRQbGFjZWhvbGRlci5jYWxsKGwsIHQpICYmIG8uaXNNYXNrLmNhbGwobCwgdCwgITApID8gbC5jYXJldFBvcy5iZWdpbisrIDogbC5jYXJldFBvcyA9IGI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pKSwgeS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgeCwgUCwgRSA9IG8uc2Vla05leHQuY2FsbChsLCAtMSwgdm9pZCAwLCAhMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXMuaXNDb21wbGV0ZS5jYWxsKGwsIG8uZ2V0QnVmZmVyLmNhbGwobCkpICYmIHkubGVuZ3RoIDw9IEUgfHwgcy5pc0NvbXBsZXRlLmNhbGwobCwgby5nZXRCdWZmZXIuY2FsbChsKSkgJiYgeS5sZW5ndGggPiAwICYmIHkubGVuZ3RoICE9PSBFICYmIDAgPT09IHlbMF0pIGZvciAodmFyIFMgPSBFOyB2b2lkIDAgIT09ICh4ID0geS5zaGlmdCgpKTsgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHcgPSBuZXcgZC5FdmVudChcIl9jaGVja3ZhbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKFAgPSBjLnZhbGlkUG9zaXRpb25zW3hdKS5nZW5lcmF0ZWRJbnB1dCA9ICEwLCB3LmtleUNvZGUgPSBQLmlucHV0LmNoYXJDb2RlQXQoMCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChnID0gdS5FdmVudEhhbmRsZXJzLmtleXByZXNzRXZlbnQuY2FsbChsLCB3LCAhMCwgITEsIGksIFMpKSAmJiB2b2lkIDAgIT09IGcucG9zICYmIGcucG9zICE9PSB4ICYmIGMudmFsaWRQb3NpdGlvbnNbZy5wb3NdICYmICEwID09PSBjLnZhbGlkUG9zaXRpb25zW2cucG9zXS5tYXRjaC5zdGF0aWMpIHkucHVzaChnLnBvcyk7IGVsc2UgaWYgKCFnKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdCAmJiBwLmNhbGwobCwgZSwgby5nZXRCdWZmZXIuY2FsbChsKSwgZyA/IGcuZm9yd2FyZFBvc2l0aW9uIDogbC5jYXJldFBvcy5iZWdpbiwgbiB8fCBuZXcgZC5FdmVudChcImNoZWNrdmFsXCIpLCBuICYmIChcImlucHV0XCIgPT09IG4udHlwZSAmJiBsLnVuZG9WYWx1ZSAhPT0gby5nZXRCdWZmZXIuY2FsbChsKS5qb2luKFwiXCIpIHx8IFwicGFzdGVcIiA9PT0gbi50eXBlKSksIFxuICAgICAgICAgICAgICAgICAgICBmLnNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXIgPSBrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBwKGUsIHQsIGksIGEsIHIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGwgPSBlID8gZS5pbnB1dG1hc2sgOiB0aGlzLCB1ID0gbC5vcHRzLCBjID0gbC5kZXBlbmRlbmN5TGliO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYSAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIHUub25CZWZvcmVXcml0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGYgPSB1Lm9uQmVmb3JlV3JpdGUuY2FsbChsLCBhLCB0LCBpLCB1KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGYucmVmcmVzaEZyb21CdWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGQgPSBmLnJlZnJlc2hGcm9tQnVmZmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnJlZnJlc2hGcm9tQnVmZmVyLmNhbGwobCwgITAgPT09IGQgPyBkIDogZC5zdGFydCwgZC5lbmQsIGYuYnVmZmVyIHx8IHQpLCB0ID0gby5nZXRCdWZmZXIuY2FsbChsLCAhMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvaWQgMCAhPT0gaSAmJiAoaSA9IHZvaWQgMCAhPT0gZi5jYXJldCA/IGYuY2FyZXQgOiBpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodm9pZCAwICE9PSBlICYmIChlLmlucHV0bWFzay5fdmFsdWVTZXQodC5qb2luKFwiXCIpKSwgdm9pZCAwID09PSBpIHx8IHZvaWQgMCAhPT0gYSAmJiBcImJsdXJcIiA9PT0gYS50eXBlIHx8IG8uY2FyZXQuY2FsbChsLCBlLCBpLCB2b2lkIDAsIHZvaWQgMCwgdm9pZCAwICE9PSBhICYmIFwia2V5ZG93blwiID09PSBhLnR5cGUgJiYgKGEua2V5Q29kZSA9PT0gbi5kZWZhdWx0LkRFTEVURSB8fCBhLmtleUNvZGUgPT09IG4uZGVmYXVsdC5CQUNLU1BBQ0UpKSwgXG4gICAgICAgICAgICAgICAgICAgICEwID09PSByKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSBjKGUpLCBoID0gZS5pbnB1dG1hc2suX3ZhbHVlR2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLmlucHV0bWFzay5za2lwSW5wdXRFdmVudCA9ICEwLCBwLnRyaWdnZXIoXCJpbnB1dFwiKSwgc2V0VGltZW91dCgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaCA9PT0gby5nZXRCdWZmZXJUZW1wbGF0ZS5jYWxsKGwpLmpvaW4oXCJcIikgPyBwLnRyaWdnZXIoXCJjbGVhcmVkXCIpIDogITAgPT09IHMuaXNDb21wbGV0ZS5jYWxsKGwsIHQpICYmIHAudHJpZ2dlcihcImNvbXBsZXRlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSksIDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDIzOTQ6IGZ1bmN0aW9uKGUsIHQsIGkpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodCwgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICEwXG4gICAgICAgICAgICAgICAgfSksIHQuZGVmYXVsdCA9IHZvaWQgMCwgaSg3MTQ5KSwgaSgzMTk0KTtcbiAgICAgICAgICAgICAgICB2YXIgYSA9IGkoMTU3KSwgbiA9IHYoaSgzMjg3KSksIHIgPSB2KGkoOTM4MCkpLCBvID0gaSgyMzkxKSwgcyA9IGkoNDcxMyksIGwgPSBpKDg3MTEpLCB1ID0gaSg3MjE1KSwgYyA9IGkoNzc2MCksIGYgPSBpKDk3MTYpLCBkID0gdihpKDczOTIpKSwgcCA9IHYoaSgzOTc2KSksIGggPSB2KGkoODc0MSkpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG0oZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbSA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgZTtcbiAgICAgICAgICAgICAgICAgICAgfSA6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIGUuY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBlICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBlO1xuICAgICAgICAgICAgICAgICAgICB9LCBtKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB2KGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUgJiYgZS5fX2VzTW9kdWxlID8gZSA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IGVcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGcgPSByLmRlZmF1bHQuZG9jdW1lbnQsIGsgPSBcIl9pbnB1dG1hc2tfb3B0c1wiO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHkoZSwgdCwgaSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaC5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgeSkpIHJldHVybiBuZXcgeShlLCB0LCBpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVwZW5kZW5jeUxpYiA9IG4uZGVmYXVsdCwgdGhpcy5lbCA9IHZvaWQgMCwgdGhpcy5ldmVudHMgPSB7fSwgdGhpcy5tYXNrc2V0ID0gdm9pZCAwLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICEwICE9PSBpICYmIChcIltvYmplY3QgT2JqZWN0XVwiID09PSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSkgPyB0ID0gZSA6ICh0ID0gdCB8fCB7fSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBlICYmICh0LmFsaWFzID0gZSkpLCB0aGlzLm9wdHMgPSBuLmRlZmF1bHQuZXh0ZW5kKCEwLCB7fSwgdGhpcy5kZWZhdWx0cywgdCksIHRoaXMubm9NYXNrc0NhY2hlID0gdCAmJiB2b2lkIDAgIT09IHQuZGVmaW5pdGlvbnMsIFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyT3B0aW9ucyA9IHQgfHwge30sIGIodGhpcy5vcHRzLmFsaWFzLCB0LCB0aGlzLm9wdHMpKSwgdGhpcy5yZWZyZXNoVmFsdWUgPSAhMSwgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVuZG9WYWx1ZSA9IHZvaWQgMCwgdGhpcy4kZWwgPSB2b2lkIDAsIHRoaXMuc2tpcEtleVByZXNzRXZlbnQgPSAhMSwgdGhpcy5za2lwSW5wdXRFdmVudCA9ICExLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGlvbkV2ZW50ID0gITEsIHRoaXMuaWdub3JhYmxlID0gITEsIHRoaXMubWF4TGVuZ3RoLCB0aGlzLm1vdXNlRW50ZXIgPSAhMSwgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9yaWdpbmFsUGxhY2Vob2xkZXIgPSB2b2lkIDAsIHRoaXMuaXNDb21wb3NpbmcgPSAhMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBiKGUsIHQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGEgPSB5LnByb3RvdHlwZS5hbGlhc2VzW2VdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYSA/IChhLmFsaWFzICYmIGIoYS5hbGlhcywgdm9pZCAwLCBpKSwgbi5kZWZhdWx0LmV4dGVuZCghMCwgaSwgYSksIG4uZGVmYXVsdC5leHRlbmQoITAsIGksIHQpLCBcbiAgICAgICAgICAgICAgICAgICAgITApIDogKG51bGwgPT09IGkubWFzayAmJiAoaS5tYXNrID0gZSksICExKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgeS5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFBdHRyaWJ1dGU6IFwiZGF0YS1pbnB1dG1hc2tcIixcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdHM6IHAuZGVmYXVsdCxcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvbnM6IGQuZGVmYXVsdCxcbiAgICAgICAgICAgICAgICAgICAgYWxpYXNlczoge30sXG4gICAgICAgICAgICAgICAgICAgIG1hc2tzQ2FjaGU6IHt9LFxuICAgICAgICAgICAgICAgICAgICBnZXQgaXNSVEwoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRzLmlzUlRMIHx8IHRoaXMub3B0cy5udW1lcmljSW5wdXQ7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN0cmluZ1wiID09IHR5cGVvZiBlICYmIChlID0gZy5nZXRFbGVtZW50QnlJZChlKSB8fCBnLnF1ZXJ5U2VsZWN0b3JBbGwoZSkpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIChlID0gZS5ub2RlTmFtZSA/IFsgZSBdIDogQXJyYXkuaXNBcnJheShlKSA/IGUgOiBBcnJheS5mcm9tKGUpKS5mb3JFYWNoKChmdW5jdGlvbihlLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHMgPSBuLmRlZmF1bHQuZXh0ZW5kKCEwLCB7fSwgdC5vcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZnVuY3Rpb24oZSwgdCwgaSwgYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBvKHQsIG4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvID0gXCJcIiA9PT0gYSA/IHQgOiBhICsgXCItXCIgKyB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCAhPT0gKG4gPSB2b2lkIDAgIT09IG4gPyBuIDogZS5nZXRBdHRyaWJ1dGUobykpICYmIChcInN0cmluZ1wiID09IHR5cGVvZiBuICYmICgwID09PSB0LmluZGV4T2YoXCJvblwiKSA/IG4gPSByLmRlZmF1bHRbbl0gOiBcImZhbHNlXCIgPT09IG4gPyBuID0gITEgOiBcInRydWVcIiA9PT0gbiAmJiAobiA9ICEwKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaVt0XSA9IG4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghMCA9PT0gdC5pbXBvcnREYXRhQXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHMsIGwsIHUsIGMsIGYgPSBlLmdldEF0dHJpYnV0ZShhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmICYmIFwiXCIgIT09IGYgJiYgKGYgPSBmLnJlcGxhY2UoLycvZywgJ1wiJyksIGwgPSBKU09OLnBhcnNlKFwie1wiICsgZiArIFwifVwiKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbCkgZm9yIChjIGluIHUgPSB2b2lkIDAsIGwpIGlmIChcImFsaWFzXCIgPT09IGMudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHUgPSBsW2NdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChzIGluIG8oXCJhbGlhc1wiLCB1KSwgaS5hbGlhcyAmJiBiKGkuYWxpYXMsIGksIHQpLCB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGwpIGZvciAoYyBpbiB1ID0gdm9pZCAwLCBsKSBpZiAoYy50b0xvd2VyQ2FzZSgpID09PSBzLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdSA9IGxbY107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvKHMsIHUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4uZGVmYXVsdC5leHRlbmQoITAsIHQsIGkpLCAoXCJydGxcIiA9PT0gZS5kaXIgfHwgdC5yaWdodEFsaWduKSAmJiAoZS5zdHlsZS50ZXh0QWxpZ24gPSBcInJpZ2h0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoXCJydGxcIiA9PT0gZS5kaXIgfHwgdC5udW1lcmljSW5wdXQpICYmIChlLmRpciA9IFwibHRyXCIsIGUucmVtb3ZlQXR0cmlidXRlKFwiZGlyXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdC5pc1JUTCA9ICEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGkpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KGUsIHMsIG4uZGVmYXVsdC5leHRlbmQoITAsIHt9LCB0LnVzZXJPcHRpb25zKSwgdC5kYXRhQXR0cmlidXRlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbCA9ICgwLCBvLmdlbmVyYXRlTWFza1NldCkocywgdC5ub01hc2tzQ2FjaGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2lkIDAgIT09IGwgJiYgKHZvaWQgMCAhPT0gZS5pbnB1dG1hc2sgJiYgKGUuaW5wdXRtYXNrLm9wdHMuYXV0b1VubWFzayA9ICEwLCBlLmlucHV0bWFzay5yZW1vdmUoKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLmlucHV0bWFzayA9IG5ldyB5KHZvaWQgMCwgdm9pZCAwLCAhMCksIGUuaW5wdXRtYXNrLm9wdHMgPSBzLCBlLmlucHV0bWFzay5ub01hc2tzQ2FjaGUgPSB0Lm5vTWFza3NDYWNoZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuaW5wdXRtYXNrLnVzZXJPcHRpb25zID0gbi5kZWZhdWx0LmV4dGVuZCghMCwge30sIHQudXNlck9wdGlvbnMpLCBlLmlucHV0bWFzay5lbCA9IGUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLmlucHV0bWFzay4kZWwgPSAoMCwgbi5kZWZhdWx0KShlKSwgZS5pbnB1dG1hc2subWFza3NldCA9IGwsIG4uZGVmYXVsdC5kYXRhKGUsIGssIHQudXNlck9wdGlvbnMpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYS5tYXNrLmNhbGwoZS5pbnB1dG1hc2spKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSksIGUgJiYgZVswXSAmJiBlWzBdLmlucHV0bWFzayB8fCB0aGlzO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBvcHRpb246IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN0cmluZ1wiID09IHR5cGVvZiBlID8gdGhpcy5vcHRzW2VdIDogXCJvYmplY3RcIiA9PT0gbShlKSA/IChuLmRlZmF1bHQuZXh0ZW5kKHRoaXMudXNlck9wdGlvbnMsIGUpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWwgJiYgITAgIT09IHQgJiYgdGhpcy5tYXNrKHRoaXMuZWwpLCB0aGlzKSA6IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdW5tYXNrZWR2YWx1ZTogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWFza3NldCA9IHRoaXMubWFza3NldCB8fCAoMCwgby5nZW5lcmF0ZU1hc2tTZXQpKHRoaXMub3B0cywgdGhpcy5ub01hc2tzQ2FjaGUpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZvaWQgMCA9PT0gdGhpcy5lbCB8fCB2b2lkIDAgIT09IGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IChcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIHRoaXMub3B0cy5vbkJlZm9yZU1hc2sgJiYgdGhpcy5vcHRzLm9uQmVmb3JlTWFzay5jYWxsKHRoaXMsIGUsIHRoaXMub3B0cykgfHwgZSkuc3BsaXQoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYy5jaGVja1ZhbC5jYWxsKHRoaXMsIHZvaWQgMCwgITEsICExLCB0KSwgXCJmdW5jdGlvblwiID09IHR5cGVvZiB0aGlzLm9wdHMub25CZWZvcmVXcml0ZSAmJiB0aGlzLm9wdHMub25CZWZvcmVXcml0ZS5jYWxsKHRoaXMsIHZvaWQgMCwgbC5nZXRCdWZmZXIuY2FsbCh0aGlzKSwgMCwgdGhpcy5vcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjLnVubWFza2VkdmFsdWUuY2FsbCh0aGlzLCB0aGlzLmVsKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbi5kZWZhdWx0LmRhdGEodGhpcy5lbCwgaywgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSB0aGlzLm9wdHMuYXV0b1VubWFzayA/ICgwLCBjLnVubWFza2VkdmFsdWUpKHRoaXMuZWwpIDogdGhpcy5fdmFsdWVHZXQodGhpcy5vcHRzLmF1dG9Vbm1hc2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUgIT09IGwuZ2V0QnVmZmVyVGVtcGxhdGUuY2FsbCh0aGlzKS5qb2luKFwiXCIpID8gdGhpcy5fdmFsdWVTZXQoZSwgdGhpcy5vcHRzLmF1dG9Vbm1hc2spIDogdGhpcy5fdmFsdWVTZXQoXCJcIiksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGYuRXZlbnRSdWxlci5vZmYodGhpcy5lbCksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcy5lbCksIFwidmFsdWVcIikgJiYgdGhpcy5fX3ZhbHVlR2V0ICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmVsLCBcInZhbHVlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0OiB0aGlzLl9fdmFsdWVHZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldDogdGhpcy5fX3ZhbHVlU2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6ICEwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkgOiBnLl9fbG9va3VwR2V0dGVyX18gJiYgdGhpcy5lbC5fX2xvb2t1cEdldHRlcl9fKFwidmFsdWVcIikgJiYgdGhpcy5fX3ZhbHVlR2V0ICYmICh0aGlzLmVsLl9fZGVmaW5lR2V0dGVyX18oXCJ2YWx1ZVwiLCB0aGlzLl9fdmFsdWVHZXQpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsLl9fZGVmaW5lU2V0dGVyX18oXCJ2YWx1ZVwiLCB0aGlzLl9fdmFsdWVTZXQpKSwgdGhpcy5lbC5pbnB1dG1hc2sgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbDtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZ2V0ZW1wdHltYXNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hc2tzZXQgPSB0aGlzLm1hc2tzZXQgfHwgKDAsIG8uZ2VuZXJhdGVNYXNrU2V0KSh0aGlzLm9wdHMsIHRoaXMubm9NYXNrc0NhY2hlKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBsLmdldEJ1ZmZlclRlbXBsYXRlLmNhbGwodGhpcykuam9pbihcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgaGFzTWFza2VkVmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLm9wdHMuYXV0b1VubWFzaztcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgaXNDb21wbGV0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXNrc2V0ID0gdGhpcy5tYXNrc2V0IHx8ICgwLCBvLmdlbmVyYXRlTWFza1NldCkodGhpcy5vcHRzLCB0aGlzLm5vTWFza3NDYWNoZSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgdS5pc0NvbXBsZXRlLmNhbGwodGhpcywgbC5nZXRCdWZmZXIuY2FsbCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGdldG1ldGFkYXRhOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hc2tzZXQgPSB0aGlzLm1hc2tzZXQgfHwgKDAsIG8uZ2VuZXJhdGVNYXNrU2V0KSh0aGlzLm9wdHMsIHRoaXMubm9NYXNrc0NhY2hlKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KHRoaXMubWFza3NldC5tZXRhZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IHMuZ2V0TWFza1RlbXBsYXRlLmNhbGwodGhpcywgITAsIDAsICExKS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hc2tzZXQubWV0YWRhdGEuZm9yRWFjaCgoZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdC5tYXNrICE9PSBlIHx8IChlID0gdCwgITEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSwgZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hc2tzZXQubWV0YWRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hc2tzZXQgPSB0aGlzLm1hc2tzZXQgfHwgKDAsIG8uZ2VuZXJhdGVNYXNrU2V0KSh0aGlzLm9wdHMsIHRoaXMubm9NYXNrc0NhY2hlKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSAoXCJmdW5jdGlvblwiID09IHR5cGVvZiB0aGlzLm9wdHMub25CZWZvcmVNYXNrICYmIHRoaXMub3B0cy5vbkJlZm9yZU1hc2suY2FsbCh0aGlzLCBlLCB0aGlzLm9wdHMpIHx8IGUpLnNwbGl0KFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMuY2hlY2tWYWwuY2FsbCh0aGlzLCB2b2lkIDAsICEwLCAhMSwgdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgZSA9IHRoaXMuaXNSVEwgPyBsLmdldEJ1ZmZlci5jYWxsKHRoaXMpLnNsaWNlKCkucmV2ZXJzZSgpLmpvaW4oXCJcIikgOiBsLmdldEJ1ZmZlci5jYWxsKHRoaXMpLmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gbC5nZXRCdWZmZXIuY2FsbCh0aGlzKSwgYSA9IGwuZGV0ZXJtaW5lTGFzdFJlcXVpcmVkUG9zaXRpb24uY2FsbCh0aGlzKSwgbiA9IGkubGVuZ3RoIC0gMTsgbiA+IGEgJiYgIWwuaXNNYXNrLmNhbGwodGhpcywgbik7IG4tLSkgO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGkuc3BsaWNlKGEsIG4gKyAxIC0gYSksIHUuaXNDb21wbGV0ZS5jYWxsKHRoaXMsIGkpICYmIGUgPT09ICh0aGlzLmlzUlRMID8gbC5nZXRCdWZmZXIuY2FsbCh0aGlzKS5zbGljZSgpLnJldmVyc2UoKS5qb2luKFwiXCIpIDogbC5nZXRCdWZmZXIuY2FsbCh0aGlzKS5qb2luKFwiXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hc2tzZXQgPSB0aGlzLm1hc2tzZXQgfHwgKDAsIG8uZ2VuZXJhdGVNYXNrU2V0KSh0aGlzLm9wdHMsIHRoaXMubm9NYXNrc0NhY2hlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gKFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgdGhpcy5vcHRzLm9uQmVmb3JlTWFzayAmJiB0aGlzLm9wdHMub25CZWZvcmVNYXNrLmNhbGwodGhpcywgZSwgdGhpcy5vcHRzKSB8fCBlKS5zcGxpdChcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMuY2hlY2tWYWwuY2FsbCh0aGlzLCB2b2lkIDAsICEwLCAhMSwgaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYSA9IHRoaXMuaXNSVEwgPyBsLmdldEJ1ZmZlci5jYWxsKHRoaXMpLnNsaWNlKCkucmV2ZXJzZSgpLmpvaW4oXCJcIikgOiBsLmdldEJ1ZmZlci5jYWxsKHRoaXMpLmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdCA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YTogdGhpcy5nZXRtZXRhZGF0YSgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9IDogYTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWwgJiYgKDAsIG4uZGVmYXVsdCkodGhpcy5lbCkudHJpZ2dlcihcInNldHZhbHVlXCIsIFsgZSBdKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYW5hbHlzZU1hc2s6IG8uYW5hbHlzZU1hc2tcbiAgICAgICAgICAgICAgICB9LCB5LmV4dGVuZERlZmF1bHRzID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBuLmRlZmF1bHQuZXh0ZW5kKCEwLCB5LnByb3RvdHlwZS5kZWZhdWx0cywgZSk7XG4gICAgICAgICAgICAgICAgfSwgeS5leHRlbmREZWZpbml0aW9ucyA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbi5kZWZhdWx0LmV4dGVuZCghMCwgeS5wcm90b3R5cGUuZGVmaW5pdGlvbnMsIGUpO1xuICAgICAgICAgICAgICAgIH0sIHkuZXh0ZW5kQWxpYXNlcyA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbi5kZWZhdWx0LmV4dGVuZCghMCwgeS5wcm90b3R5cGUuYWxpYXNlcywgZSk7XG4gICAgICAgICAgICAgICAgfSwgeS5mb3JtYXQgPSBmdW5jdGlvbihlLCB0LCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5KHQpLmZvcm1hdChlLCBpKTtcbiAgICAgICAgICAgICAgICB9LCB5LnVubWFzayA9IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHkodCkudW5tYXNrZWR2YWx1ZShlKTtcbiAgICAgICAgICAgICAgICB9LCB5LmlzVmFsaWQgPSBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5KHQpLmlzVmFsaWQoZSk7XG4gICAgICAgICAgICAgICAgfSwgeS5yZW1vdmUgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIFwic3RyaW5nXCIgPT0gdHlwZW9mIGUgJiYgKGUgPSBnLmdldEVsZW1lbnRCeUlkKGUpIHx8IGcucXVlcnlTZWxlY3RvckFsbChlKSksIChlID0gZS5ub2RlTmFtZSA/IFsgZSBdIDogZSkuZm9yRWFjaCgoZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5pbnB1dG1hc2sgJiYgZS5pbnB1dG1hc2sucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9LCB5LnNldFZhbHVlID0gZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgICAgICAgICBcInN0cmluZ1wiID09IHR5cGVvZiBlICYmIChlID0gZy5nZXRFbGVtZW50QnlJZChlKSB8fCBnLnF1ZXJ5U2VsZWN0b3JBbGwoZSkpLCAoZSA9IGUubm9kZU5hbWUgPyBbIGUgXSA6IGUpLmZvckVhY2goKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuaW5wdXRtYXNrID8gZS5pbnB1dG1hc2suc2V0VmFsdWUodCkgOiAoMCwgbi5kZWZhdWx0KShlKS50cmlnZ2VyKFwic2V0dmFsdWVcIiwgWyB0IF0pO1xuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfSwgeS5kZXBlbmRlbmN5TGliID0gbi5kZWZhdWx0LCByLmRlZmF1bHQuSW5wdXRtYXNrID0geTtcbiAgICAgICAgICAgICAgICB2YXIgeCA9IHk7XG4gICAgICAgICAgICAgICAgdC5kZWZhdWx0ID0geDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICA1Mjk2OiBmdW5jdGlvbihlLCB0LCBpKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gYShlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBlO1xuICAgICAgICAgICAgICAgICAgICB9IDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUgJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgZS5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIGUgIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIGU7XG4gICAgICAgICAgICAgICAgICAgIH0sIGEoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBuID0gaChpKDkzODApKSwgciA9IGgoaSgyMzk0KSksIG8gPSBoKGkoODc0MSkpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHMoZSwgdCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhID0gdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGEuZW51bWVyYWJsZSA9IGEuZW51bWVyYWJsZSB8fCAhMSwgYS5jb25maWd1cmFibGUgPSAhMCwgXCJ2YWx1ZVwiIGluIGEgJiYgKGEud3JpdGFibGUgPSAhMCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIGEua2V5LCBhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBsKGUsIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgKFwib2JqZWN0XCIgPT09IGEodCkgfHwgXCJmdW5jdGlvblwiID09IHR5cGVvZiB0KSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2b2lkIDAgIT09IHQpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJEZXJpdmVkIGNvbnN0cnVjdG9ycyBtYXkgb25seSByZXR1cm4gb2JqZWN0IG9yIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2b2lkIDAgPT09IGUpIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlO1xuICAgICAgICAgICAgICAgICAgICB9KGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB1KGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIE1hcCA/IG5ldyBNYXAgOiB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG51bGwgPT09IGUgfHwgKGkgPSBlLCAtMSA9PT0gRnVuY3Rpb24udG9TdHJpbmcuY2FsbChpKS5pbmRleE9mKFwiW25hdGl2ZSBjb2RlXVwiKSkpIHJldHVybiBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJmdW5jdGlvblwiICE9IHR5cGVvZiBlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodm9pZCAwICE9PSB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHQuaGFzKGUpKSByZXR1cm4gdC5nZXQoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdC5zZXQoZSwgYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBhKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjKGUsIGFyZ3VtZW50cywgcCh0aGlzKS5jb25zdHJ1Y3Rvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGUucHJvdG90eXBlLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6ICExLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0YWJsZTogITAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogITBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSwgZChhLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdShlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gYyhlLCB0LCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjID0gZigpID8gUmVmbGVjdC5jb25zdHJ1Y3QgOiBmdW5jdGlvbihlLCB0LCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYSA9IFsgbnVsbCBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYS5wdXNoLmFwcGx5KGEsIHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG4gPSBuZXcgKEZ1bmN0aW9uLmJpbmQuYXBwbHkoZSwgYSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGkgJiYgZChuLCBpLnByb3RvdHlwZSksIG47XG4gICAgICAgICAgICAgICAgICAgIH0sIGMuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFwidW5kZWZpbmVkXCIgPT0gdHlwZW9mIFJlZmxlY3QgfHwgIVJlZmxlY3QuY29uc3RydWN0KSByZXR1cm4gITE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChSZWZsZWN0LmNvbnN0cnVjdC5zaGFtKSByZXR1cm4gITE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFByb3h5KSByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZi5jYWxsKFJlZmxlY3QuY29uc3RydWN0KEJvb2xlYW4sIFtdLCAoZnVuY3Rpb24oKSB7fSkpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAhMDtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICExO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGQoZSwgdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZCA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS5fX3Byb3RvX18gPSB0LCBlO1xuICAgICAgICAgICAgICAgICAgICB9LCBkKGUsIHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBwKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHAgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKGUpO1xuICAgICAgICAgICAgICAgICAgICB9LCBwKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBoKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUgJiYgZS5fX2VzTW9kdWxlID8gZSA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IGVcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIG0gPSBuLmRlZmF1bHQuZG9jdW1lbnQ7XG4gICAgICAgICAgICAgICAgaWYgKG8uZGVmYXVsdCAmJiBtICYmIG0uaGVhZCAmJiBtLmhlYWQuYXR0YWNoU2hhZG93ICYmIG4uZGVmYXVsdC5jdXN0b21FbGVtZW50cyAmJiB2b2lkIDAgPT09IG4uZGVmYXVsdC5jdXN0b21FbGVtZW50cy5nZXQoXCJpbnB1dC1tYXNrXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgIWZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJmdW5jdGlvblwiICE9IHR5cGVvZiB0ICYmIG51bGwgIT09IHQpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgXCJwcm90b3R5cGVcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogT2JqZWN0LmNyZWF0ZSh0ICYmIHQucHJvdG90eXBlLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRhYmxlOiAhMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6ICEwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0YWJsZTogITFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSwgdCAmJiBkKGUsIHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfShjLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0LCBpLCBhLCBuLCBvLCB1ID0gKHQgPSBjLCBpID0gZigpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZSwgYSA9IHAodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG4gPSBwKHRoaXMpLmNvbnN0cnVjdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlID0gUmVmbGVjdC5jb25zdHJ1Y3QoYSwgYXJndW1lbnRzLCBuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgZSA9IGEuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbCh0aGlzLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gYygpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShlIGluc3RhbmNlb2YgdCkpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSh0aGlzLCBjKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IChlID0gdS5jYWxsKHRoaXMpKS5nZXRBdHRyaWJ1dGVOYW1lcygpLCBpID0gZS5hdHRhY2hTaGFkb3coe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlOiBcImNsb3NlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksIGEgPSBtLmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBuIGluIGEudHlwZSA9IFwidGV4dFwiLCBpLmFwcGVuZENoaWxkKGEpLCB0KSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCwgbikgJiYgYS5zZXRBdHRyaWJ1dGUodFtuXSwgZS5nZXRBdHRyaWJ1dGUodFtuXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvID0gbmV3IHIuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gby5kYXRhQXR0cmlidXRlID0gXCJcIiwgby5tYXNrKGEpLCBhLmlucHV0bWFzay5zaGFkb3dSb290ID0gaSwgZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhID0gYywgbiAmJiBzKGEucHJvdG90eXBlLCBuKSwgbyAmJiBzKGEsIG8pLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoYSwgXCJwcm90b3R5cGVcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRhYmxlOiAhMVxuICAgICAgICAgICAgICAgICAgICAgICAgfSksIGE7XG4gICAgICAgICAgICAgICAgICAgIH0odShIVE1MRWxlbWVudCkpO1xuICAgICAgICAgICAgICAgICAgICBuLmRlZmF1bHQuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiaW5wdXQtbWFza1wiLCB2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgNDQzOiBmdW5jdGlvbihlLCB0LCBpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGEgPSBvKGkoMjA0NykpLCBuID0gbyhpKDIzOTQpKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiByKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHIgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIGU7XG4gICAgICAgICAgICAgICAgICAgIH0gOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZSAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBlLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgZSAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2YgZTtcbiAgICAgICAgICAgICAgICAgICAgfSwgcihlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gbyhlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiBlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZvaWQgMCA9PT0gYS5kZWZhdWx0LmZuLmlucHV0bWFzayAmJiAoYS5kZWZhdWx0LmZuLmlucHV0bWFzayA9IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGksIG8gPSB0aGlzWzBdO1xuICAgICAgICAgICAgICAgICAgICBpZiAodm9pZCAwID09PSB0ICYmICh0ID0ge30pLCBcInN0cmluZ1wiID09IHR5cGVvZiBlKSBzd2l0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwidW5tYXNrZWR2YWx1ZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG8gJiYgby5pbnB1dG1hc2sgPyBvLmlucHV0bWFzay51bm1hc2tlZHZhbHVlKCkgOiAoMCwgYS5kZWZhdWx0KShvKS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJyZW1vdmVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRtYXNrICYmIHRoaXMuaW5wdXRtYXNrLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImdldGVtcHR5bWFza1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG8gJiYgby5pbnB1dG1hc2sgPyBvLmlucHV0bWFzay5nZXRlbXB0eW1hc2soKSA6IFwiXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaGFzTWFza2VkVmFsdWVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhKCFvIHx8ICFvLmlucHV0bWFzaykgJiYgby5pbnB1dG1hc2suaGFzTWFza2VkVmFsdWUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpc0NvbXBsZXRlXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIW8gfHwgIW8uaW5wdXRtYXNrIHx8IG8uaW5wdXRtYXNrLmlzQ29tcGxldGUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJnZXRtZXRhZGF0YVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG8gJiYgby5pbnB1dG1hc2sgPyBvLmlucHV0bWFzay5nZXRtZXRhZGF0YSgpIDogdm9pZCAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInNldHZhbHVlXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBuLmRlZmF1bHQuc2V0VmFsdWUobywgdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJvcHRpb25cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcInN0cmluZ1wiICE9IHR5cGVvZiB0KSByZXR1cm4gdGhpcy5lYWNoKChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodm9pZCAwICE9PSB0aGlzLmlucHV0bWFzaykgcmV0dXJuIHRoaXMuaW5wdXRtYXNrLm9wdGlvbih0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvICYmIHZvaWQgMCAhPT0gby5pbnB1dG1hc2spIHJldHVybiBvLmlucHV0bWFzay5vcHRpb24odCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdC5hbGlhcyA9IGUsIGkgPSBuZXcgbi5kZWZhdWx0KHQpLCB0aGlzLmVhY2goKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkubWFzayh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGUpKSByZXR1cm4gdC5hbGlhcyA9IGUsIGkgPSBuZXcgbi5kZWZhdWx0KHQpLCB0aGlzLmVhY2goKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkubWFzayh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcIm9iamVjdFwiID09IHIoZSkpIHJldHVybiBpID0gbmV3IG4uZGVmYXVsdChlKSwgdm9pZCAwID09PSBlLm1hc2sgJiYgdm9pZCAwID09PSBlLmFsaWFzID8gdGhpcy5lYWNoKChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodm9pZCAwICE9PSB0aGlzLmlucHV0bWFzaykgcmV0dXJuIHRoaXMuaW5wdXRtYXNrLm9wdGlvbihlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpLm1hc2sodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSkgOiB0aGlzLmVhY2goKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkubWFzayh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2b2lkIDAgPT09IGUpIHJldHVybiB0aGlzLmVhY2goKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpID0gbmV3IG4uZGVmYXVsdCh0KSkubWFzayh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDIzOTE6IGZ1bmN0aW9uKGUsIHQsIGkpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodCwgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICEwXG4gICAgICAgICAgICAgICAgfSksIHQuYW5hbHlzZU1hc2sgPSBmdW5jdGlvbihlLCB0LCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhLCBvLCBzLCBsLCB1LCBjLCBmID0gLyg/Ols/KitdfFxce1swLTkrKl0rKD86LFswLTkrKl0qKT8oPzpcXHxbMC05KypdKik/XFx9KXxbXi4/KiteJHtbXSgpfFxcXFxdK3wuL2csIGQgPSAvXFxbXFxeP10/KD86W15cXFxcXFxdXSt8XFxcXFtcXFNcXHNdPykqXT98XFxcXCg/OjAoPzpbMC0zXVswLTddezAsMn18WzQtN11bMC03XT8pP3xbMS05XVswLTldKnx4WzAtOUEtRmEtZl17Mn18dVswLTlBLUZhLWZdezR9fGNbQS1aYS16XXxbXFxTXFxzXT8pfFxcKCg/OlxcP1s6PSFdPyk/fCg/Ols/KitdfFxce1swLTldKyg/OixbMC05XSopP1xcfSlcXD8/fFteLj8qK14ke1soKXxcXFxcXSt8Li9nLCBwID0gITEsIGggPSBuZXcgbi5kZWZhdWx0LCBtID0gW10sIHYgPSBbXSwgZyA9ICExO1xuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBrKGUsIGEsIG4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG4gPSB2b2lkIDAgIT09IG4gPyBuIDogZS5tYXRjaGVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvID0gZS5tYXRjaGVzW24gLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0KSAwID09PSBhLmluZGV4T2YoXCJbXCIpIHx8IHAgJiYgL1xcXFxkfFxcXFxzfFxcXFx3L2kudGVzdChhKSB8fCBcIi5cIiA9PT0gYSA/IGUubWF0Y2hlcy5zcGxpY2UobisrLCAwLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm46IG5ldyBSZWdFeHAoYSwgaS5jYXNpbmcgPyBcImlcIiA6IFwiXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpYzogITEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWxpdHk6ICExLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0Jsb2NrTWFya2VyOiB2b2lkIDAgPT09IG8gPyBcIm1hc3RlclwiIDogby5kZWYgIT09IGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzaW5nOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZjogYSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogdm9pZCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZURlZjogYVxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgOiAocCAmJiAoYSA9IGFbYS5sZW5ndGggLSAxXSksIGEuc3BsaXQoXCJcIikuZm9yRWFjaCgoZnVuY3Rpb24odCwgYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8gPSBlLm1hdGNoZXNbbiAtIDFdLCBlLm1hdGNoZXMuc3BsaWNlKG4rKywgMCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbjogL1thLXpdL2kudGVzdChpLnN0YXRpY0RlZmluaXRpb25TeW1ib2wgfHwgdCkgPyBuZXcgUmVnRXhwKFwiW1wiICsgKGkuc3RhdGljRGVmaW5pdGlvblN5bWJvbCB8fCB0KSArIFwiXVwiLCBpLmNhc2luZyA/IFwiaVwiIDogXCJcIikgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWM6ICEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25hbGl0eTogITEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0Jsb2NrTWFya2VyOiB2b2lkIDAgPT09IG8gPyBcIm1hc3RlclwiIDogby5kZWYgIT09IHQgJiYgITAgIT09IG8uc3RhdGljLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNpbmc6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZjogaS5zdGF0aWNEZWZpbml0aW9uU3ltYm9sIHx8IHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiB2b2lkIDAgIT09IGkuc3RhdGljRGVmaW5pdGlvblN5bWJvbCA/IHQgOiB2b2lkIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZURlZjogKHAgPyBcIidcIiA6IFwiXCIpICsgdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkpKSwgcCA9ICExOyBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcyA9IGkuZGVmaW5pdGlvbnMgJiYgaS5kZWZpbml0aW9uc1thXSB8fCBpLnVzZVByb3RvdHlwZURlZmluaXRpb25zICYmIHIuZGVmYXVsdC5wcm90b3R5cGUuZGVmaW5pdGlvbnNbYV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcyAmJiAhcCA/IGUubWF0Y2hlcy5zcGxpY2UobisrLCAwLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuOiBzLnZhbGlkYXRvciA/IFwic3RyaW5nXCIgPT0gdHlwZW9mIHMudmFsaWRhdG9yID8gbmV3IFJlZ0V4cChzLnZhbGlkYXRvciwgaS5jYXNpbmcgPyBcImlcIiA6IFwiXCIpIDogbmV3IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXN0ID0gcy52YWxpZGF0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gOiBuZXcgUmVnRXhwKFwiLlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljOiBzLnN0YXRpYyB8fCAhMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWxpdHk6IHMub3B0aW9uYWwgfHwgITEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0Jsb2NrTWFya2VyOiB2b2lkIDAgPT09IG8gfHwgcy5vcHRpb25hbCA/IFwibWFzdGVyXCIgOiBvLmRlZiAhPT0gKHMuZGVmaW5pdGlvblN5bWJvbCB8fCBhKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzaW5nOiBzLmNhc2luZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmOiBzLmRlZmluaXRpb25TeW1ib2wgfHwgYSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHMucGxhY2Vob2xkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZURlZjogYSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVkOiBzLmdlbmVyYXRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pIDogKGUubWF0Y2hlcy5zcGxpY2UobisrLCAwLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuOiAvW2Etel0vaS50ZXN0KGkuc3RhdGljRGVmaW5pdGlvblN5bWJvbCB8fCBhKSA/IG5ldyBSZWdFeHAoXCJbXCIgKyAoaS5zdGF0aWNEZWZpbml0aW9uU3ltYm9sIHx8IGEpICsgXCJdXCIsIGkuY2FzaW5nID8gXCJpXCIgOiBcIlwiKSA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpYzogITAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsaXR5OiAhMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3QmxvY2tNYXJrZXI6IHZvaWQgMCA9PT0gbyA/IFwibWFzdGVyXCIgOiBvLmRlZiAhPT0gYSAmJiAhMCAhPT0gby5zdGF0aWMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2luZzogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmOiBpLnN0YXRpY0RlZmluaXRpb25TeW1ib2wgfHwgYSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHZvaWQgMCAhPT0gaS5zdGF0aWNEZWZpbml0aW9uU3ltYm9sID8gYSA6IHZvaWQgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlRGVmOiAocCA/IFwiJ1wiIDogXCJcIikgKyBhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksIHAgPSAhMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24geSgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoayhsID0gbVttLmxlbmd0aCAtIDFdLCBvKSwgbC5pc0FsdGVybmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdSA9IG0ucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGUgPSAwOyBlIDwgdS5tYXRjaGVzLmxlbmd0aDsgZSsrKSB1Lm1hdGNoZXNbZV0uaXNHcm91cCAmJiAodS5tYXRjaGVzW2VdLmlzR3JvdXAgPSAhMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0ubGVuZ3RoID4gMCA/IChsID0gbVttLmxlbmd0aCAtIDFdKS5tYXRjaGVzLnB1c2godSkgOiBoLm1hdGNoZXMucHVzaCh1KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgayhoLCBvKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBiKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ID0gbmV3IG4uZGVmYXVsdCghMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdC5vcGVuR3JvdXAgPSAhMSwgdC5tYXRjaGVzID0gZSwgdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiB4KCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChzID0gbS5wb3AoKSkub3Blbkdyb3VwID0gITEsIHZvaWQgMCAhPT0gcykgaWYgKG0ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobCA9IG1bbS5sZW5ndGggLSAxXSkubWF0Y2hlcy5wdXNoKHMpLCBsLmlzQWx0ZXJuYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBlID0gKHUgPSBtLnBvcCgpKS5tYXRjaGVzWzBdLm1hdGNoZXMgPyB1Lm1hdGNoZXNbMF0ubWF0Y2hlcy5sZW5ndGggOiAxLCB0ID0gMDsgdCA8IHUubWF0Y2hlcy5sZW5ndGg7IHQrKykgdS5tYXRjaGVzW3RdLmlzR3JvdXAgPSAhMSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHUubWF0Y2hlc1t0XS5hbHRlcm5hdG9yR3JvdXAgPSAhMSwgbnVsbCA9PT0gaS5rZWVwU3RhdGljICYmIGUgPCAodS5tYXRjaGVzW3RdLm1hdGNoZXMgPyB1Lm1hdGNoZXNbdF0ubWF0Y2hlcy5sZW5ndGggOiAxKSAmJiAoaS5rZWVwU3RhdGljID0gITApLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZSA9IHUubWF0Y2hlc1t0XS5tYXRjaGVzID8gdS5tYXRjaGVzW3RdLm1hdGNoZXMubGVuZ3RoIDogMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbS5sZW5ndGggPiAwID8gKGwgPSBtW20ubGVuZ3RoIC0gMV0pLm1hdGNoZXMucHVzaCh1KSA6IGgubWF0Y2hlcy5wdXNoKHUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBoLm1hdGNoZXMucHVzaChzKTsgZWxzZSB5KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gUChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IGUucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdC5pc1F1YW50aWZpZXIgJiYgKHQgPSBiKFsgZS5wb3AoKSwgdCBdKSksIHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdCAmJiAoaS5vcHRpb25hbG1hcmtlclswXSA9IHZvaWQgMCwgaS5vcHRpb25hbG1hcmtlclsxXSA9IHZvaWQgMCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoO2EgPSB0ID8gZC5leGVjKGUpIDogZi5leGVjKGUpOyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvID0gYVswXSwgdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoby5jaGFyQXQoMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCI/XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8gPSBcInswLDF9XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiK1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIipcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbyA9IFwie1wiICsgbyArIFwifVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInxcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT09IG0ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgRSA9IGIoaC5tYXRjaGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEUub3Blbkdyb3VwID0gITAsIG0ucHVzaChFKSwgaC5tYXRjaGVzID0gW10sIGcgPSAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJcXFxcZFwiID09PSBvKSBvID0gXCJbMC05XVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHApIHkoKTsgZWxzZSBzd2l0Y2ggKG8uY2hhckF0KDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCIkXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJeXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdCB8fCB5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBpLmVzY2FwZUNoYXI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcCA9ICEwLCB0ICYmIHkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGkub3B0aW9uYWxtYXJrZXJbMV06XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgaS5ncm91cG1hcmtlclsxXTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBpLm9wdGlvbmFsbWFya2VyWzBdOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0ucHVzaChuZXcgbi5kZWZhdWx0KCExLCAhMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgaS5ncm91cG1hcmtlclswXTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtLnB1c2gobmV3IG4uZGVmYXVsdCghMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgaS5xdWFudGlmaWVybWFya2VyWzBdOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBTID0gbmV3IG4uZGVmYXVsdCghMSwgITEsICEwKSwgdyA9IChvID0gby5yZXBsYWNlKC9be30/XS9nLCBcIlwiKSkuc3BsaXQoXCJ8XCIpLCBfID0gd1swXS5zcGxpdChcIixcIiksIE0gPSBpc05hTihfWzBdKSA/IF9bMF0gOiBwYXJzZUludChfWzBdKSwgTyA9IDEgPT09IF8ubGVuZ3RoID8gTSA6IGlzTmFOKF9bMV0pID8gX1sxXSA6IHBhcnNlSW50KF9bMV0pLCBUID0gaXNOYU4od1sxXSkgPyB3WzFdIDogcGFyc2VJbnQod1sxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIqXCIgIT09IE0gJiYgXCIrXCIgIT09IE0gfHwgKE0gPSBcIipcIiA9PT0gTyA/IDAgOiAxKSwgUy5xdWFudGlmaWVyID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW46IE0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heDogTyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaml0OiBUXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgQSA9IG0ubGVuZ3RoID4gMCA/IG1bbS5sZW5ndGggLSAxXS5tYXRjaGVzIDogaC5tYXRjaGVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoYSA9IEEucG9wKCkpLmlzQWx0ZXJuYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBLnB1c2goYSksIEEgPSBhLm1hdGNoZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBDID0gbmV3IG4uZGVmYXVsdCghMCksIEQgPSBBLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBLnB1c2goQyksIEEgPSBDLm1hdGNoZXMsIGEgPSBEO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhLmlzR3JvdXAgfHwgKGEgPSBiKFsgYSBdKSksIEEucHVzaChhKSwgQS5wdXNoKFMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgaS5hbHRlcm5hdG9ybWFya2VyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGogPSAobCA9IG1bbS5sZW5ndGggLSAxXSkubWF0Y2hlc1tsLm1hdGNoZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBsLm9wZW5Hcm91cCAmJiAodm9pZCAwID09PSBqLm1hdGNoZXMgfHwgITEgPT09IGouaXNHcm91cCAmJiAhMSA9PT0gai5pc0FsdGVybmF0b3IpID8gbS5wb3AoKSA6IFAobC5tYXRjaGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgYyA9IFAoaC5tYXRjaGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYy5pc0FsdGVybmF0b3IpIG0ucHVzaChjKTsgZWxzZSBpZiAoYy5hbHRlcm5hdG9yR3JvdXAgPyAodSA9IG0ucG9wKCksIGMuYWx0ZXJuYXRvckdyb3VwID0gITEpIDogdSA9IG5ldyBuLmRlZmF1bHQoITEsICExLCAhMSwgITApLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1Lm1hdGNoZXMucHVzaChjKSwgbS5wdXNoKHUpLCBjLm9wZW5Hcm91cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLm9wZW5Hcm91cCA9ICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgQiA9IG5ldyBuLmRlZmF1bHQoITApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCLmFsdGVybmF0b3JHcm91cCA9ICEwLCBtLnB1c2goQik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGcgJiYgeCgpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKDttLmxlbmd0aCA+IDA7ICkgcyA9IG0ucG9wKCksIGgubWF0Y2hlcy5wdXNoKHMpO1xuICAgICAgICAgICAgICAgICAgICBoLm1hdGNoZXMubGVuZ3RoID4gMCAmJiAoIWZ1bmN0aW9uIGUoYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYSAmJiBhLm1hdGNoZXMgJiYgYS5tYXRjaGVzLmZvckVhY2goKGZ1bmN0aW9uKG4sIHIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbyA9IGEubWF0Y2hlc1tyICsgMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZvaWQgMCA9PT0gbyB8fCB2b2lkIDAgPT09IG8ubWF0Y2hlcyB8fCAhMSA9PT0gby5pc1F1YW50aWZpZXIpICYmIG4gJiYgbi5pc0dyb3VwICYmIChuLmlzR3JvdXAgPSAhMSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdCB8fCAoayhuLCBpLmdyb3VwbWFya2VyWzBdLCAwKSwgITAgIT09IG4ub3Blbkdyb3VwICYmIGsobiwgaS5ncm91cG1hcmtlclsxXSkpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZShuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgfShoKSwgdi5wdXNoKGgpKTtcbiAgICAgICAgICAgICAgICAgICAgKGkubnVtZXJpY0lucHV0IHx8IGkuaXNSVEwpICYmIGZ1bmN0aW9uIGUodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYSBpbiB0Lm1hdGNoZXMgPSB0Lm1hdGNoZXMucmV2ZXJzZSgpLCB0Lm1hdGNoZXMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodC5tYXRjaGVzLCBhKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuID0gcGFyc2VJbnQoYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHQubWF0Y2hlc1thXS5pc1F1YW50aWZpZXIgJiYgdC5tYXRjaGVzW24gKyAxXSAmJiB0Lm1hdGNoZXNbbiArIDFdLmlzR3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSB0Lm1hdGNoZXNbYV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQubWF0Y2hlcy5zcGxpY2UoYSwgMSksIHQubWF0Y2hlcy5zcGxpY2UobiArIDEsIDAsIHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2lkIDAgIT09IHQubWF0Y2hlc1thXS5tYXRjaGVzID8gdC5tYXRjaGVzW2FdID0gZSh0Lm1hdGNoZXNbYV0pIDogdC5tYXRjaGVzW2FdID0gKChvID0gdC5tYXRjaGVzW2FdKSA9PT0gaS5vcHRpb25hbG1hcmtlclswXSA/IG8gPSBpLm9wdGlvbmFsbWFya2VyWzFdIDogbyA9PT0gaS5vcHRpb25hbG1hcmtlclsxXSA/IG8gPSBpLm9wdGlvbmFsbWFya2VyWzBdIDogbyA9PT0gaS5ncm91cG1hcmtlclswXSA/IG8gPSBpLmdyb3VwbWFya2VyWzFdIDogbyA9PT0gaS5ncm91cG1hcmtlclsxXSAmJiAobyA9IGkuZ3JvdXBtYXJrZXJbMF0pLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHQ7XG4gICAgICAgICAgICAgICAgICAgIH0odlswXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICAgICAgICAgIH0sIHQuZ2VuZXJhdGVNYXNrU2V0ID0gZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gbihlLCBpLCBuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbywgcywgbCA9ICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG51bGwgIT09IGUgJiYgXCJcIiAhPT0gZSB8fCAoKGwgPSBudWxsICE9PSBuLnJlZ2V4KSA/IGUgPSAoZSA9IG4ucmVnZXgpLnJlcGxhY2UoL14oXFxeKSguKikoXFwkKSQvLCBcIiQyXCIpIDogKGwgPSAhMCwgXG4gICAgICAgICAgICAgICAgICAgICAgICBlID0gXCIuKlwiKSksIDEgPT09IGUubGVuZ3RoICYmICExID09PSBuLmdyZWVkeSAmJiAwICE9PSBuLnJlcGVhdCAmJiAobi5wbGFjZWhvbGRlciA9IFwiXCIpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIG4ucmVwZWF0ID4gMCB8fCBcIipcIiA9PT0gbi5yZXBlYXQgfHwgXCIrXCIgPT09IG4ucmVwZWF0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHUgPSBcIipcIiA9PT0gbi5yZXBlYXQgPyAwIDogXCIrXCIgPT09IG4ucmVwZWF0ID8gMSA6IG4ucmVwZWF0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUgPSBuLmdyb3VwbWFya2VyWzBdICsgZSArIG4uZ3JvdXBtYXJrZXJbMV0gKyBuLnF1YW50aWZpZXJtYXJrZXJbMF0gKyB1ICsgXCIsXCIgKyBuLnJlcGVhdCArIG4ucXVhbnRpZmllcm1hcmtlclsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzID0gbCA/IFwicmVnZXhfXCIgKyBuLnJlZ2V4IDogbi5udW1lcmljSW5wdXQgPyBlLnNwbGl0KFwiXCIpLnJldmVyc2UoKS5qb2luKFwiXCIpIDogZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBudWxsICE9PSBuLmtlZXBTdGF0aWMgJiYgKHMgPSBcImtzX1wiICsgbi5rZWVwU3RhdGljICsgcyksIHZvaWQgMCA9PT0gci5kZWZhdWx0LnByb3RvdHlwZS5tYXNrc0NhY2hlW3NdIHx8ICEwID09PSB0ID8gKG8gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrVG9rZW46IHIuZGVmYXVsdC5wcm90b3R5cGUuYW5hbHlzZU1hc2soZSwgbCwgbiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRQb3NpdGlvbnM6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9idWZmZXI6IHZvaWQgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmZXI6IHZvaWQgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXN0czoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhjbHVkZXM6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhOiBpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tMZW5ndGg6IHZvaWQgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqaXRPZmZzZXQ6IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAhMCAhPT0gdCAmJiAoci5kZWZhdWx0LnByb3RvdHlwZS5tYXNrc0NhY2hlW3NdID0gbywgbyA9IGEuZGVmYXVsdC5leHRlbmQoITAsIHt9LCByLmRlZmF1bHQucHJvdG90eXBlLm1hc2tzQ2FjaGVbc10pKSkgOiBvID0gYS5kZWZhdWx0LmV4dGVuZCghMCwge30sIHIuZGVmYXVsdC5wcm90b3R5cGUubWFza3NDYWNoZVtzXSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgbztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGUubWFzayAmJiAoZS5tYXNrID0gZS5tYXNrKGUpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZS5tYXNrKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUubWFzay5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCA9PT0gZS5rZWVwU3RhdGljICYmIChlLmtlZXBTdGF0aWMgPSAhMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG8gPSBlLmdyb3VwbWFya2VyWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZS5pc1JUTCA/IGUubWFzay5yZXZlcnNlKCkgOiBlLm1hc2spLmZvckVhY2goKGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgby5sZW5ndGggPiAxICYmIChvICs9IGUuYWx0ZXJuYXRvcm1hcmtlciksIHZvaWQgMCAhPT0gdC5tYXNrICYmIFwiZnVuY3Rpb25cIiAhPSB0eXBlb2YgdC5tYXNrID8gbyArPSB0Lm1hc2sgOiBvICs9IHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpLCBuKG8gKz0gZS5ncm91cG1hcmtlclsxXSwgZS5tYXNrLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGUubWFzayA9IGUubWFzay5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpID0gZS5tYXNrICYmIHZvaWQgMCAhPT0gZS5tYXNrLm1hc2sgJiYgXCJmdW5jdGlvblwiICE9IHR5cGVvZiBlLm1hc2subWFzayA/IG4oZS5tYXNrLm1hc2ssIGUubWFzaywgZSkgOiBuKGUubWFzaywgZS5tYXNrLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgbnVsbCA9PT0gZS5rZWVwU3RhdGljICYmIChlLmtlZXBTdGF0aWMgPSAhMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdmFyIGEgPSBvKGkoMzI4NykpLCBuID0gbyhpKDk2OTUpKSwgciA9IG8oaSgyMzk0KSk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gbyhlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlICYmIGUuX19lc01vZHVsZSA/IGUgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiBlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDE1NzogZnVuY3Rpb24oZSwgdCwgaSkge1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LCBcIl9fZXNNb2R1bGVcIiwge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogITBcbiAgICAgICAgICAgICAgICB9KSwgdC5tYXNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlID0gdGhpcywgdCA9IHRoaXMub3B0cywgaSA9IHRoaXMuZWwsIGEgPSB0aGlzLmRlcGVuZGVuY3lMaWI7XG4gICAgICAgICAgICAgICAgICAgIHMuRXZlbnRSdWxlci5vZmYoaSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmID0gZnVuY3Rpb24odCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0YXJlYVwiICE9PSB0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSAmJiBpLmlnbm9yYWJsZXMucHVzaChuLmRlZmF1bHQuRU5URVIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGwgPSB0LmdldEF0dHJpYnV0ZShcInR5cGVcIiksIHUgPSBcImlucHV0XCIgPT09IHQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICYmIGkuc3VwcG9ydHNJbnB1dFR5cGUuaW5jbHVkZXMobCkgfHwgdC5pc0NvbnRlbnRFZGl0YWJsZSB8fCBcInRleHRhcmVhXCIgPT09IHQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1KSBpZiAoXCJpbnB1dFwiID09PSB0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBsKSwgdSA9IFwidGV4dFwiID09PSBjLnR5cGUsIGMgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHUgPSBcInBhcnRpYWxcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhMSAhPT0gdSA/IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbiwgbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiB1KCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnB1dG1hc2sgPyB0aGlzLmlucHV0bWFzay5vcHRzLmF1dG9Vbm1hc2sgPyB0aGlzLmlucHV0bWFzay51bm1hc2tlZHZhbHVlKCkgOiAtMSAhPT0gci5nZXRMYXN0VmFsaWRQb3NpdGlvbi5jYWxsKGUpIHx8ICEwICE9PSBpLm51bGxhYmxlID8gKHRoaXMuaW5wdXRtYXNrLnNoYWRvd1Jvb3QgfHwgdGhpcy5vd25lckRvY3VtZW50KS5hY3RpdmVFbGVtZW50ID09PSB0aGlzICYmIGkuY2xlYXJNYXNrT25Mb3N0Rm9jdXMgPyAoZS5pc1JUTCA/IG8uY2xlYXJPcHRpb25hbFRhaWwuY2FsbChlLCByLmdldEJ1ZmZlci5jYWxsKGUpLnNsaWNlKCkpLnJldmVyc2UoKSA6IG8uY2xlYXJPcHRpb25hbFRhaWwuY2FsbChlLCByLmdldEJ1ZmZlci5jYWxsKGUpLnNsaWNlKCkpKS5qb2luKFwiXCIpIDogbi5jYWxsKHRoaXMpIDogXCJcIiA6IG4uY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gYyhlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGwuY2FsbCh0aGlzLCBlKSwgdGhpcy5pbnB1dG1hc2sgJiYgKDAsIG8uYXBwbHlJbnB1dFZhbHVlKSh0aGlzLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0LmlucHV0bWFzay5fX3ZhbHVlR2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghMCAhPT0gaS5ub1ZhbHVlUGF0Y2hpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGYgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE9iamVjdC5nZXRQcm90b3R5cGVPZih0KSwgXCJ2YWx1ZVwiKSA6IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmICYmIGYuZ2V0ICYmIGYuc2V0ID8gKG4gPSBmLmdldCwgbCA9IGYuc2V0LCBPYmplY3QuZGVmaW5lUHJvcGVydHkodCwgXCJ2YWx1ZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldDogdSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0OiBjLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6ICEwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpIDogXCJpbnB1dFwiICE9PSB0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSAmJiAobiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBsID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBPYmplY3QuZGVmaW5lUHJvcGVydHkodCwgXCJ2YWx1ZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldDogdSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0OiBjLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6ICEwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGRvY3VtZW50Ll9fbG9va3VwR2V0dGVyX18gJiYgdC5fX2xvb2t1cEdldHRlcl9fKFwidmFsdWVcIikgJiYgKG4gPSB0Ll9fbG9va3VwR2V0dGVyX18oXCJ2YWx1ZVwiKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsID0gdC5fX2xvb2t1cFNldHRlcl9fKFwidmFsdWVcIiksIHQuX19kZWZpbmVHZXR0ZXJfXyhcInZhbHVlXCIsIHUpLCB0Ll9fZGVmaW5lU2V0dGVyX18oXCJ2YWx1ZVwiLCBjKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0LmlucHV0bWFzay5fX3ZhbHVlR2V0ID0gbiwgdC5pbnB1dG1hc2suX192YWx1ZVNldCA9IGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdC5pbnB1dG1hc2suX3ZhbHVlR2V0ID0gZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUuaXNSVEwgJiYgITAgIT09IHQgPyBuLmNhbGwodGhpcy5lbCkuc3BsaXQoXCJcIikucmV2ZXJzZSgpLmpvaW4oXCJcIikgOiBuLmNhbGwodGhpcy5lbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHQuaW5wdXRtYXNrLl92YWx1ZVNldCA9IGZ1bmN0aW9uKHQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGwuY2FsbCh0aGlzLmVsLCBudWxsID09IHQgPyBcIlwiIDogITAgIT09IGkgJiYgZS5pc1JUTCA/IHQuc3BsaXQoXCJcIikucmV2ZXJzZSgpLmpvaW4oXCJcIikgOiB0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgdm9pZCAwID09PSBuICYmIChuID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgbCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYS52YWxIb29rcyAmJiAodm9pZCAwID09PSBhLnZhbEhvb2tzW3RdIHx8ICEwICE9PSBhLnZhbEhvb2tzW3RdLmlucHV0bWFza3BhdGNoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuID0gYS52YWxIb29rc1t0XSAmJiBhLnZhbEhvb2tzW3RdLmdldCA/IGEudmFsSG9va3NbdF0uZ2V0IDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBzID0gYS52YWxIb29rc1t0XSAmJiBhLnZhbEhvb2tzW3RdLnNldCA/IGEudmFsSG9va3NbdF0uc2V0IDogZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS52YWx1ZSA9IHQsIGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhLnZhbEhvb2tzW3RdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0LmlucHV0bWFzaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0LmlucHV0bWFzay5vcHRzLmF1dG9Vbm1hc2spIHJldHVybiB0LmlucHV0bWFzay51bm1hc2tlZHZhbHVlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGEgPSBuKHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtMSAhPT0gci5nZXRMYXN0VmFsaWRQb3NpdGlvbi5jYWxsKGUsIHZvaWQgMCwgdm9pZCAwLCB0LmlucHV0bWFzay5tYXNrc2V0LnZhbGlkUG9zaXRpb25zKSB8fCAhMCAhPT0gaS5udWxsYWJsZSA/IGEgOiBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG4odCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBzKGUsIHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUuaW5wdXRtYXNrICYmICgwLCBvLmFwcGx5SW5wdXRWYWx1ZSkoZSwgdCksIGk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0bWFza3BhdGNoOiAhMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0odC50eXBlKSwgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5FdmVudFJ1bGVyLm9uKHQsIFwibW91c2VlbnRlclwiLCAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSB0aGlzLmlucHV0bWFzay5fdmFsdWVHZXQoITApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQgIT09IChlLmlzUlRMID8gci5nZXRCdWZmZXIuY2FsbChlKS5yZXZlcnNlKCkgOiByLmdldEJ1ZmZlci5jYWxsKGUpKS5qb2luKFwiXCIpICYmICgwLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLmFwcGx5SW5wdXRWYWx1ZSkodGhpcywgdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0odCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0odCkgOiB0LmlucHV0bWFzayA9IHZvaWQgMCwgdTtcbiAgICAgICAgICAgICAgICAgICAgfShpLCB0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCExICE9PSBmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLm9yaWdpbmFsUGxhY2Vob2xkZXIgPSBpLnBsYWNlaG9sZGVyLCBlLm1heExlbmd0aCA9IHZvaWQgMCAhPT0gaSA/IGkubWF4TGVuZ3RoIDogdm9pZCAwLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIC0xID09PSBlLm1heExlbmd0aCAmJiAoZS5tYXhMZW5ndGggPSB2b2lkIDApLCBcImlucHV0TW9kZVwiIGluIGkgJiYgbnVsbCA9PT0gaS5nZXRBdHRyaWJ1dGUoXCJpbnB1dG1vZGVcIikgJiYgKGkuaW5wdXRNb2RlID0gdC5pbnB1dG1vZGUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgaS5zZXRBdHRyaWJ1dGUoXCJpbnB1dG1vZGVcIiwgdC5pbnB1dG1vZGUpKSwgITAgPT09IGYgJiYgKHQuc2hvd01hc2tPbkZvY3VzID0gdC5zaG93TWFza09uRm9jdXMgJiYgLTEgPT09IFsgXCJjYy1udW1iZXJcIiwgXCJjYy1leHBcIiBdLmluZGV4T2YoaS5hdXRvY29tcGxldGUpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGwuaXBob25lICYmICh0Lmluc2VydE1vZGVWaXN1YWwgPSAhMSksIHMuRXZlbnRSdWxlci5vbihpLCBcInN1Ym1pdFwiLCBjLkV2ZW50SGFuZGxlcnMuc3VibWl0RXZlbnQpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuRXZlbnRSdWxlci5vbihpLCBcInJlc2V0XCIsIGMuRXZlbnRIYW5kbGVycy5yZXNldEV2ZW50KSwgcy5FdmVudFJ1bGVyLm9uKGksIFwiYmx1clwiLCBjLkV2ZW50SGFuZGxlcnMuYmx1ckV2ZW50KSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBzLkV2ZW50UnVsZXIub24oaSwgXCJmb2N1c1wiLCBjLkV2ZW50SGFuZGxlcnMuZm9jdXNFdmVudCksIHMuRXZlbnRSdWxlci5vbihpLCBcImludmFsaWRcIiwgYy5FdmVudEhhbmRsZXJzLmludmFsaWRFdmVudCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgcy5FdmVudFJ1bGVyLm9uKGksIFwiY2xpY2tcIiwgYy5FdmVudEhhbmRsZXJzLmNsaWNrRXZlbnQpLCBzLkV2ZW50UnVsZXIub24oaSwgXCJtb3VzZWxlYXZlXCIsIGMuRXZlbnRIYW5kbGVycy5tb3VzZWxlYXZlRXZlbnQpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuRXZlbnRSdWxlci5vbihpLCBcIm1vdXNlZW50ZXJcIiwgYy5FdmVudEhhbmRsZXJzLm1vdXNlZW50ZXJFdmVudCksIHMuRXZlbnRSdWxlci5vbihpLCBcInBhc3RlXCIsIGMuRXZlbnRIYW5kbGVycy5wYXN0ZUV2ZW50KSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBzLkV2ZW50UnVsZXIub24oaSwgXCJjdXRcIiwgYy5FdmVudEhhbmRsZXJzLmN1dEV2ZW50KSwgcy5FdmVudFJ1bGVyLm9uKGksIFwiY29tcGxldGVcIiwgdC5vbmNvbXBsZXRlKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBzLkV2ZW50UnVsZXIub24oaSwgXCJpbmNvbXBsZXRlXCIsIHQub25pbmNvbXBsZXRlKSwgcy5FdmVudFJ1bGVyLm9uKGksIFwiY2xlYXJlZFwiLCB0Lm9uY2xlYXJlZCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgITAgIT09IHQuaW5wdXRFdmVudE9ubHkgJiYgKHMuRXZlbnRSdWxlci5vbihpLCBcImtleWRvd25cIiwgYy5FdmVudEhhbmRsZXJzLmtleWRvd25FdmVudCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgcy5FdmVudFJ1bGVyLm9uKGksIFwia2V5cHJlc3NcIiwgYy5FdmVudEhhbmRsZXJzLmtleXByZXNzRXZlbnQpLCBzLkV2ZW50UnVsZXIub24oaSwgXCJrZXl1cFwiLCBjLkV2ZW50SGFuZGxlcnMua2V5dXBFdmVudCkpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIChsLm1vYmlsZSB8fCB0LmlucHV0RXZlbnRPbmx5KSAmJiBpLnJlbW92ZUF0dHJpYnV0ZShcIm1heExlbmd0aFwiKSwgcy5FdmVudFJ1bGVyLm9uKGksIFwiaW5wdXRcIiwgYy5FdmVudEhhbmRsZXJzLmlucHV0RmFsbEJhY2tFdmVudCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgcy5FdmVudFJ1bGVyLm9uKGksIFwiY29tcG9zaXRpb25lbmRcIiwgYy5FdmVudEhhbmRsZXJzLmNvbXBvc2l0aW9uZW5kRXZlbnQpKSwgcy5FdmVudFJ1bGVyLm9uKGksIFwic2V0dmFsdWVcIiwgYy5FdmVudEhhbmRsZXJzLnNldFZhbHVlRXZlbnQpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHIuZ2V0QnVmZmVyVGVtcGxhdGUuY2FsbChlKS5qb2luKFwiXCIpLCBlLnVuZG9WYWx1ZSA9IGUuX3ZhbHVlR2V0KCEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkID0gKGkuaW5wdXRtYXNrLnNoYWRvd1Jvb3QgfHwgaS5vd25lckRvY3VtZW50KS5hY3RpdmVFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFwiXCIgIT09IGkuaW5wdXRtYXNrLl92YWx1ZUdldCghMCkgfHwgITEgPT09IHQuY2xlYXJNYXNrT25Mb3N0Rm9jdXMgfHwgZCA9PT0gaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgwLCBvLmFwcGx5SW5wdXRWYWx1ZSkoaSwgaS5pbnB1dG1hc2suX3ZhbHVlR2V0KCEwKSwgdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSByLmdldEJ1ZmZlci5jYWxsKGUpLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgITEgPT09IHUuaXNDb21wbGV0ZS5jYWxsKGUsIHApICYmIHQuY2xlYXJJbmNvbXBsZXRlICYmIHIucmVzZXRNYXNrU2V0LmNhbGwoZSksIHQuY2xlYXJNYXNrT25Mb3N0Rm9jdXMgJiYgZCAhPT0gaSAmJiAoLTEgPT09IHIuZ2V0TGFzdFZhbGlkUG9zaXRpb24uY2FsbChlKSA/IHAgPSBbXSA6IG8uY2xlYXJPcHRpb25hbFRhaWwuY2FsbChlLCBwKSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICghMSA9PT0gdC5jbGVhck1hc2tPbkxvc3RGb2N1cyB8fCB0LnNob3dNYXNrT25Gb2N1cyAmJiBkID09PSBpIHx8IFwiXCIgIT09IGkuaW5wdXRtYXNrLl92YWx1ZUdldCghMCkpICYmICgwLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLndyaXRlQnVmZmVyKShpLCBwKSwgZCA9PT0gaSAmJiByLmNhcmV0LmNhbGwoZSwgaSwgci5zZWVrTmV4dC5jYWxsKGUsIHIuZ2V0TGFzdFZhbGlkUG9zaXRpb24uY2FsbChlKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB2YXIgYSwgbiA9IChhID0gaSg1NTgxKSkgJiYgYS5fX2VzTW9kdWxlID8gYSA6IHtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogYVxuICAgICAgICAgICAgICAgIH0sIHIgPSBpKDg3MTEpLCBvID0gaSg3NzYwKSwgcyA9IGkoOTcxNiksIGwgPSBpKDk4NDUpLCB1ID0gaSg3MjE1KSwgYyA9IGkoNjAzMCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgOTY5NTogZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LCBcIl9fZXNNb2R1bGVcIiwge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogITBcbiAgICAgICAgICAgICAgICB9KSwgdC5kZWZhdWx0ID0gZnVuY3Rpb24oZSwgdCwgaSwgYSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoZXMgPSBbXSwgdGhpcy5vcGVuR3JvdXAgPSBlIHx8ICExLCB0aGlzLmFsdGVybmF0b3JHcm91cCA9ICExLCB0aGlzLmlzR3JvdXAgPSBlIHx8ICExLCBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc09wdGlvbmFsID0gdCB8fCAhMSwgdGhpcy5pc1F1YW50aWZpZXIgPSBpIHx8ICExLCB0aGlzLmlzQWx0ZXJuYXRvciA9IGEgfHwgITEsIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnF1YW50aWZpZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaW46IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXg6IDFcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDMxOTQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5pbmNsdWRlcyB8fCBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJyYXkucHJvdG90eXBlLCBcImluY2x1ZGVzXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChudWxsID09IHRoaXMpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1widGhpc1wiIGlzIG51bGwgb3Igbm90IGRlZmluZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gT2JqZWN0KHRoaXMpLCBhID0gaS5sZW5ndGggPj4+IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PT0gYSkgcmV0dXJuICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbiA9IDAgfCB0LCByID0gTWF0aC5tYXgobiA+PSAwID8gbiA6IGEgLSBNYXRoLmFicyhuKSwgMCk7IHIgPCBhOyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaVtyXSA9PT0gZSkgcmV0dXJuICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDcxNDk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGUodCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZSA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgZTtcbiAgICAgICAgICAgICAgICAgICAgfSA6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIGUuY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBlICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBlO1xuICAgICAgICAgICAgICAgICAgICB9LCBlKHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcImZ1bmN0aW9uXCIgIT0gdHlwZW9mIE9iamVjdC5nZXRQcm90b3R5cGVPZiAmJiAoT2JqZWN0LmdldFByb3RvdHlwZU9mID0gXCJvYmplY3RcIiA9PT0gZShcInRlc3RcIi5fX3Byb3RvX18pID8gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS5fX3Byb3RvX187XG4gICAgICAgICAgICAgICAgfSA6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUuY29uc3RydWN0b3IucHJvdG90eXBlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDg3MTE6IGZ1bmN0aW9uKGUsIHQsIGkpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodCwgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICEwXG4gICAgICAgICAgICAgICAgfSksIHQuY2FyZXQgPSBmdW5jdGlvbihlLCB0LCBpLCBhLCBuKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByLCBvID0gdGhpcywgcyA9IHRoaXMub3B0cztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZvaWQgMCA9PT0gdCkgcmV0dXJuIFwic2VsZWN0aW9uU3RhcnRcIiBpbiBlICYmIFwic2VsZWN0aW9uRW5kXCIgaW4gZSA/ICh0ID0gZS5zZWxlY3Rpb25TdGFydCwgXG4gICAgICAgICAgICAgICAgICAgIGkgPSBlLnNlbGVjdGlvbkVuZCkgOiB3aW5kb3cuZ2V0U2VsZWN0aW9uID8gKHIgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZ2V0UmFuZ2VBdCgwKSkuY29tbW9uQW5jZXN0b3JDb250YWluZXIucGFyZW50Tm9kZSAhPT0gZSAmJiByLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyICE9PSBlIHx8ICh0ID0gci5zdGFydE9mZnNldCwgXG4gICAgICAgICAgICAgICAgICAgIGkgPSByLmVuZE9mZnNldCkgOiBkb2N1bWVudC5zZWxlY3Rpb24gJiYgZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlICYmIChyID0gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCksIFxuICAgICAgICAgICAgICAgICAgICB0ID0gMCAtIHIuZHVwbGljYXRlKCkubW92ZVN0YXJ0KFwiY2hhcmFjdGVyXCIsIC1lLmlucHV0bWFzay5fdmFsdWVHZXQoKS5sZW5ndGgpLCBpID0gdCArIHIudGV4dC5sZW5ndGgpLCBcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVnaW46IGEgPyB0IDogdS5jYWxsKG8sIHQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBhID8gaSA6IHUuY2FsbChvLCBpKVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0KSAmJiAoaSA9IG8uaXNSVEwgPyB0WzBdIDogdFsxXSwgdCA9IG8uaXNSVEwgPyB0WzFdIDogdFswXSksIFxuICAgICAgICAgICAgICAgICAgICB2b2lkIDAgIT09IHQuYmVnaW4gJiYgKGkgPSBvLmlzUlRMID8gdC5iZWdpbiA6IHQuZW5kLCB0ID0gby5pc1JUTCA/IHQuZW5kIDogdC5iZWdpbiksIFxuICAgICAgICAgICAgICAgICAgICBcIm51bWJlclwiID09IHR5cGVvZiB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ID0gYSA/IHQgOiB1LmNhbGwobywgdCksIGkgPSBcIm51bWJlclwiID09IHR5cGVvZiAoaSA9IGEgPyBpIDogdS5jYWxsKG8sIGkpKSA/IGkgOiB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGwgPSBwYXJzZUludCgoKGUub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldyB8fCB3aW5kb3cpLmdldENvbXB1dGVkU3R5bGUgPyAoZS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3IHx8IHdpbmRvdykuZ2V0Q29tcHV0ZWRTdHlsZShlLCBudWxsKSA6IGUuY3VycmVudFN0eWxlKS5mb250U2l6ZSkgKiBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUuc2Nyb2xsTGVmdCA9IGwgPiBlLnNjcm9sbFdpZHRoID8gbCA6IDAsIGUuaW5wdXRtYXNrLmNhcmV0UG9zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luOiB0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogaVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgcy5pbnNlcnRNb2RlVmlzdWFsICYmICExID09PSBzLmluc2VydE1vZGUgJiYgdCA9PT0gaSAmJiAobiB8fCBpKyspLCBlID09PSAoZS5pbnB1dG1hc2suc2hhZG93Um9vdCB8fCBlLm93bmVyRG9jdW1lbnQpLmFjdGl2ZUVsZW1lbnQpIGlmIChcInNldFNlbGVjdGlvblJhbmdlXCIgaW4gZSkgZS5zZXRTZWxlY3Rpb25SYW5nZSh0LCBpKTsgZWxzZSBpZiAod2luZG93LmdldFNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKSwgdm9pZCAwID09PSBlLmZpcnN0Q2hpbGQgfHwgbnVsbCA9PT0gZS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuYXBwZW5kQ2hpbGQoYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuc2V0U3RhcnQoZS5maXJzdENoaWxkLCB0IDwgZS5pbnB1dG1hc2suX3ZhbHVlR2V0KCkubGVuZ3RoID8gdCA6IGUuaW5wdXRtYXNrLl92YWx1ZUdldCgpLmxlbmd0aCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuc2V0RW5kKGUuZmlyc3RDaGlsZCwgaSA8IGUuaW5wdXRtYXNrLl92YWx1ZUdldCgpLmxlbmd0aCA/IGkgOiBlLmlucHV0bWFzay5fdmFsdWVHZXQoKS5sZW5ndGgpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByLmNvbGxhcHNlKCEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmLnJlbW92ZUFsbFJhbmdlcygpLCBmLmFkZFJhbmdlKHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGUuY3JlYXRlVGV4dFJhbmdlICYmICgociA9IGUuY3JlYXRlVGV4dFJhbmdlKCkpLmNvbGxhcHNlKCEwKSwgci5tb3ZlRW5kKFwiY2hhcmFjdGVyXCIsIGkpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHIubW92ZVN0YXJ0KFwiY2hhcmFjdGVyXCIsIHQpLCByLnNlbGVjdCgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIHQuZGV0ZXJtaW5lTGFzdFJlcXVpcmVkUG9zaXRpb24gPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0LCBpLCByID0gdGhpcywgcyA9IHRoaXMubWFza3NldCwgbCA9IHRoaXMuZGVwZW5kZW5jeUxpYiwgdSA9IGEuZ2V0TWFza1RlbXBsYXRlLmNhbGwociwgITAsIG8uY2FsbChyKSwgITAsICEwKSwgYyA9IHUubGVuZ3RoLCBmID0gby5jYWxsKHIpLCBkID0ge30sIHAgPSBzLnZhbGlkUG9zaXRpb25zW2ZdLCBoID0gdm9pZCAwICE9PSBwID8gcC5sb2NhdG9yLnNsaWNlKCkgOiB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodCA9IGYgKyAxOyB0IDwgdS5sZW5ndGg7IHQrKykgaSA9IGEuZ2V0VGVzdFRlbXBsYXRlLmNhbGwociwgdCwgaCwgdCAtIDEpLCBoID0gaS5sb2NhdG9yLnNsaWNlKCksIFxuICAgICAgICAgICAgICAgICAgICBkW3RdID0gbC5leHRlbmQoITAsIHt9LCBpKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG0gPSBwICYmIHZvaWQgMCAhPT0gcC5hbHRlcm5hdGlvbiA/IHAubG9jYXRvcltwLmFsdGVybmF0aW9uXSA6IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh0ID0gYyAtIDE7IHQgPiBmICYmICgoKGkgPSBkW3RdKS5tYXRjaC5vcHRpb25hbGl0eSB8fCBpLm1hdGNoLm9wdGlvbmFsUXVhbnRpZmllciAmJiBpLm1hdGNoLm5ld0Jsb2NrTWFya2VyIHx8IG0gJiYgKG0gIT09IGRbdF0ubG9jYXRvcltwLmFsdGVybmF0aW9uXSAmJiAxICE9IGkubWF0Y2guc3RhdGljIHx8ICEwID09PSBpLm1hdGNoLnN0YXRpYyAmJiBpLmxvY2F0b3JbcC5hbHRlcm5hdGlvbl0gJiYgbi5jaGVja0FsdGVybmF0aW9uTWF0Y2guY2FsbChyLCBpLmxvY2F0b3JbcC5hbHRlcm5hdGlvbl0udG9TdHJpbmcoKS5zcGxpdChcIixcIiksIG0udG9TdHJpbmcoKS5zcGxpdChcIixcIikpICYmIFwiXCIgIT09IGEuZ2V0VGVzdHMuY2FsbChyLCB0KVswXS5kZWYpKSAmJiB1W3RdID09PSBhLmdldFBsYWNlaG9sZGVyLmNhbGwociwgdCwgaS5tYXRjaCkpOyB0LS0pIGMtLTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsOiBjLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmOiBkW2NdID8gZFtjXS5tYXRjaCA6IHZvaWQgMFxuICAgICAgICAgICAgICAgICAgICB9IDogYztcbiAgICAgICAgICAgICAgICB9LCB0LmRldGVybWluZU5ld0NhcmV0UG9zaXRpb24gPSBmdW5jdGlvbihlLCB0LCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuID0gdGhpcywgdSA9IHRoaXMubWFza3NldCwgYyA9IHRoaXMub3B0cztcbiAgICAgICAgICAgICAgICAgICAgdCAmJiAobi5pc1JUTCA/IGUuZW5kID0gZS5iZWdpbiA6IGUuYmVnaW4gPSBlLmVuZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmJlZ2luID09PSBlLmVuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChpID0gaSB8fCBjLnBvc2l0aW9uQ2FyZXRPbkNsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJub25lXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInNlbGVjdFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IHIuY2FsbChuKS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpZ25vcmVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLmVuZCA9IGUuYmVnaW4gPSBsLmNhbGwobiwgby5jYWxsKG4pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwicmFkaXhGb2N1c1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcIlwiICE9PSBjLnJhZGl4UG9pbnQgJiYgMCAhPT0gYy5kaWdpdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ID0gdS52YWxpZFBvc2l0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2b2lkIDAgPT09IHRbZV0gfHwgdFtlXS5pbnB1dCA9PT0gYS5nZXRQbGFjZWhvbGRlci5jYWxsKG4sIGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUgPCBsLmNhbGwobiwgLTEpKSByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSByLmNhbGwobikuaW5kZXhPZihjLnJhZGl4UG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgtMSAhPT0gaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBvIGluIHQpIGlmICh0W29dICYmIGkgPCBvICYmIHRbb10uaW5wdXQgIT09IGEuZ2V0UGxhY2Vob2xkZXIuY2FsbChuLCBvKSkgcmV0dXJuICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KGUuYmVnaW4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmID0gci5jYWxsKG4pLmpvaW4oXCJcIikuaW5kZXhPZihjLnJhZGl4UG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLmVuZCA9IGUuYmVnaW4gPSBjLm51bWVyaWNJbnB1dCA/IGwuY2FsbChuLCBmKSA6IGY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkID0gZS5iZWdpbiwgcCA9IG8uY2FsbChuLCBkLCAhMCksIGggPSBsLmNhbGwobiwgLTEgIT09IHAgfHwgcy5jYWxsKG4sIDApID8gcCA6IC0xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZCA8PSBoKSBlLmVuZCA9IGUuYmVnaW4gPSBzLmNhbGwobiwgZCwgITEsICEwKSA/IGQgOiBsLmNhbGwobiwgZCk7IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbSA9IHUudmFsaWRQb3NpdGlvbnNbcF0sIHYgPSBhLmdldFRlc3RUZW1wbGF0ZS5jYWxsKG4sIGgsIG0gPyBtLm1hdGNoLmxvY2F0b3IgOiB2b2lkIDAsIG0pLCBnID0gYS5nZXRQbGFjZWhvbGRlci5jYWxsKG4sIGgsIHYubWF0Y2gpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJcIiAhPT0gZyAmJiByLmNhbGwobilbaF0gIT09IGcgJiYgITAgIT09IHYubWF0Y2gub3B0aW9uYWxRdWFudGlmaWVyICYmICEwICE9PSB2Lm1hdGNoLm5ld0Jsb2NrTWFya2VyIHx8ICFzLmNhbGwobiwgaCwgYy5rZWVwU3RhdGljLCAhMCkgJiYgdi5tYXRjaC5kZWYgPT09IGcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrID0gbC5jYWxsKG4sIGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGQgPj0gayB8fCBkID09PSBoKSAmJiAoaCA9IGspO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuZW5kID0gZS5iZWdpbiA9IGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCB0LmdldEJ1ZmZlciA9IHIsIHQuZ2V0QnVmZmVyVGVtcGxhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSB0aGlzLm1hc2tzZXQ7XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgMCA9PT0gZS5fYnVmZmVyICYmIChlLl9idWZmZXIgPSBhLmdldE1hc2tUZW1wbGF0ZS5jYWxsKHRoaXMsICExLCAxKSwgdm9pZCAwID09PSBlLmJ1ZmZlciAmJiAoZS5idWZmZXIgPSBlLl9idWZmZXIuc2xpY2UoKSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS5fYnVmZmVyO1xuICAgICAgICAgICAgICAgIH0sIHQuZ2V0TGFzdFZhbGlkUG9zaXRpb24gPSBvLCB0LmlzTWFzayA9IHMsIHQucmVzZXRNYXNrU2V0ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IHRoaXMubWFza3NldDtcbiAgICAgICAgICAgICAgICAgICAgdC5idWZmZXIgPSB2b2lkIDAsICEwICE9PSBlICYmICh0LnZhbGlkUG9zaXRpb25zID0ge30sIHQucCA9IDApO1xuICAgICAgICAgICAgICAgIH0sIHQuc2Vla05leHQgPSBsLCB0LnNlZWtQcmV2aW91cyA9IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSB0aGlzLCBuID0gZSAtIDE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlIDw9IDApIHJldHVybiAwO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKDtuID4gMCAmJiAoITAgPT09IHQgJiYgKCEwICE9PSBhLmdldFRlc3QuY2FsbChpLCBuKS5tYXRjaC5uZXdCbG9ja01hcmtlciB8fCAhcy5jYWxsKGksIG4sIHZvaWQgMCwgITApKSB8fCAhMCAhPT0gdCAmJiAhcy5jYWxsKGksIG4sIHZvaWQgMCwgITApKTsgKSBuLS07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuO1xuICAgICAgICAgICAgICAgIH0sIHQudHJhbnNsYXRlUG9zaXRpb24gPSB1O1xuICAgICAgICAgICAgICAgIHZhciBhID0gaSg0NzEzKSwgbiA9IGkoNzIxNSk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gcihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcy5tYXNrc2V0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdm9pZCAwICE9PSB0LmJ1ZmZlciAmJiAhMCAhPT0gZSB8fCAodC5idWZmZXIgPSBhLmdldE1hc2tUZW1wbGF0ZS5jYWxsKHRoaXMsICEwLCBvLmNhbGwodGhpcyksICEwKSwgXG4gICAgICAgICAgICAgICAgICAgIHZvaWQgMCA9PT0gdC5fYnVmZmVyICYmICh0Ll9idWZmZXIgPSB0LmJ1ZmZlci5zbGljZSgpKSksIHQuYnVmZmVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBvKGUsIHQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGEgPSB0aGlzLm1hc2tzZXQsIG4gPSAtMSwgciA9IC0xLCBvID0gaSB8fCBhLnZhbGlkUG9zaXRpb25zO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBzIGluIHZvaWQgMCA9PT0gZSAmJiAoZSA9IC0xKSwgbykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGwgPSBwYXJzZUludChzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9bbF0gJiYgKHQgfHwgITAgIT09IG9bbF0uZ2VuZXJhdGVkSW5wdXQpICYmIChsIDw9IGUgJiYgKG4gPSBsKSwgbCA+PSBlICYmIChyID0gbCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtMSA9PT0gbiB8fCBuID09IGUgPyByIDogLTEgPT0gciB8fCBlIC0gbiA8IHIgLSBlID8gbiA6IHI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHMoZSwgdCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbiA9IHRoaXMsIHIgPSB0aGlzLm1hc2tzZXQsIG8gPSBhLmdldFRlc3RUZW1wbGF0ZS5jYWxsKG4sIGUpLm1hdGNoO1xuICAgICAgICAgICAgICAgICAgICBpZiAoXCJcIiA9PT0gby5kZWYgJiYgKG8gPSBhLmdldFRlc3QuY2FsbChuLCBlKS5tYXRjaCksICEwICE9PSBvLnN0YXRpYykgcmV0dXJuIG8uZm47XG4gICAgICAgICAgICAgICAgICAgIGlmICghMCA9PT0gaSAmJiB2b2lkIDAgIT09IHIudmFsaWRQb3NpdGlvbnNbZV0gJiYgITAgIT09IHIudmFsaWRQb3NpdGlvbnNbZV0uZ2VuZXJhdGVkSW5wdXQpIHJldHVybiAhMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEwICE9PSB0ICYmIGUgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcyA9IGEuZ2V0VGVzdHMuY2FsbChuLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcy5sZW5ndGggPiAxICsgKFwiXCIgPT09IHNbcy5sZW5ndGggLSAxXS5tYXRjaC5kZWYgPyAxIDogMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbCA9IGEuZGV0ZXJtaW5lVGVzdFRlbXBsYXRlLmNhbGwobiwgZSwgYS5nZXRUZXN0cy5jYWxsKG4sIGUpKSwgdSA9IGEuZ2V0UGxhY2Vob2xkZXIuY2FsbChuLCBlLCBsLm1hdGNoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBsLm1hdGNoLmRlZiAhPT0gdTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gITE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGwoZSwgdCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgMCA9PT0gaSAmJiAoaSA9ICEwKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IGUgKyAxOyBcIlwiICE9PSBhLmdldFRlc3QuY2FsbChuLCByKS5tYXRjaC5kZWYgJiYgKCEwID09PSB0ICYmICghMCAhPT0gYS5nZXRUZXN0LmNhbGwobiwgcikubWF0Y2gubmV3QmxvY2tNYXJrZXIgfHwgIXMuY2FsbChuLCByLCB2b2lkIDAsICEwKSkgfHwgITAgIT09IHQgJiYgIXMuY2FsbChuLCByLCB2b2lkIDAsIGkpKTsgKSByKys7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB1KGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSB0aGlzLm9wdHMsIGkgPSB0aGlzLmVsO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIXRoaXMuaXNSVEwgfHwgXCJudW1iZXJcIiAhPSB0eXBlb2YgZSB8fCB0LmdyZWVkeSAmJiBcIlwiID09PSB0LnBsYWNlaG9sZGVyIHx8ICFpIHx8IChlID0gTWF0aC5hYnModGhpcy5fdmFsdWVHZXQoKS5sZW5ndGggLSBlKSksIFxuICAgICAgICAgICAgICAgICAgICBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICA0NzEzOiBmdW5jdGlvbihlLCB0LCBpKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAhMFxuICAgICAgICAgICAgICAgIH0pLCB0LmRldGVybWluZVRlc3RUZW1wbGF0ZSA9IHUsIHQuZ2V0RGVjaXNpb25UYWtlciA9IG8sIHQuZ2V0TWFza1RlbXBsYXRlID0gZnVuY3Rpb24oZSwgdCwgaSwgYSwgbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgciA9IHRoaXMsIG8gPSB0aGlzLm9wdHMsIGMgPSB0aGlzLm1hc2tzZXQsIGYgPSBvLmdyZWVkeTtcbiAgICAgICAgICAgICAgICAgICAgbiAmJiBvLmdyZWVkeSAmJiAoby5ncmVlZHkgPSAhMSwgci5tYXNrc2V0LnRlc3RzID0ge30pO1xuICAgICAgICAgICAgICAgICAgICB0ID0gdCB8fCAwO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcCwgaCwgbSwgdiwgZyA9IFtdLCBrID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEwID09PSBlICYmIGMudmFsaWRQb3NpdGlvbnNba10pIG0gPSBuICYmIGMudmFsaWRQb3NpdGlvbnNba10ubWF0Y2gub3B0aW9uYWxpdHkgJiYgdm9pZCAwID09PSBjLnZhbGlkUG9zaXRpb25zW2sgKyAxXSAmJiAoITAgPT09IGMudmFsaWRQb3NpdGlvbnNba10uZ2VuZXJhdGVkSW5wdXQgfHwgYy52YWxpZFBvc2l0aW9uc1trXS5pbnB1dCA9PSBvLnNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXIgJiYgayA+IDApID8gdS5jYWxsKHIsIGssIGQuY2FsbChyLCBrLCBwLCBrIC0gMSkpIDogYy52YWxpZFBvc2l0aW9uc1trXSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBoID0gbS5tYXRjaCwgcCA9IG0ubG9jYXRvci5zbGljZSgpLCBnLnB1c2goITAgPT09IGkgPyBtLmlucHV0IDogITEgPT09IGkgPyBoLm5hdGl2ZURlZiA6IHMuY2FsbChyLCBrLCBoKSk7IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0gPSBsLmNhbGwociwgaywgcCwgayAtIDEpLCBoID0gbS5tYXRjaCwgcCA9IG0ubG9jYXRvci5zbGljZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB5ID0gITAgIT09IGEgJiYgKCExICE9PSBvLmppdE1hc2tpbmcgPyBvLmppdE1hc2tpbmcgOiBoLmppdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHYgPSAodiAmJiBoLnN0YXRpYyAmJiBoLmRlZiAhPT0gby5ncm91cFNlcGFyYXRvciAmJiBudWxsID09PSBoLmZuIHx8IGMudmFsaWRQb3NpdGlvbnNbayAtIDFdICYmIGguc3RhdGljICYmIGguZGVmICE9PSBvLmdyb3VwU2VwYXJhdG9yICYmIG51bGwgPT09IGguZm4pICYmIGMudGVzdHNba10gJiYgMSA9PT0gYy50ZXN0c1trXS5sZW5ndGgpIHx8ICExID09PSB5IHx8IHZvaWQgMCA9PT0geSB8fCBcIm51bWJlclwiID09IHR5cGVvZiB5ICYmIGlzRmluaXRlKHkpICYmIHkgPiBrID8gZy5wdXNoKCExID09PSBpID8gaC5uYXRpdmVEZWYgOiBzLmNhbGwociwgaywgaCkpIDogdiA9ICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaysrO1xuICAgICAgICAgICAgICAgICAgICB9IHdoaWxlICghMCAhPT0gaC5zdGF0aWMgfHwgXCJcIiAhPT0gaC5kZWYgfHwgdCA+IGspO1xuICAgICAgICAgICAgICAgICAgICBcIlwiID09PSBnW2cubGVuZ3RoIC0gMV0gJiYgZy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgITEgPT09IGkgJiYgdm9pZCAwICE9PSBjLm1hc2tMZW5ndGggfHwgKGMubWFza0xlbmd0aCA9IGsgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG8uZ3JlZWR5ID0gZiwgZztcbiAgICAgICAgICAgICAgICB9LCB0LmdldFBsYWNlaG9sZGVyID0gcywgdC5nZXRUZXN0ID0gYywgdC5nZXRUZXN0VGVtcGxhdGUgPSBsLCB0LmdldFRlc3RzID0gZCwgdC5pc1N1YnNldE9mID0gZjtcbiAgICAgICAgICAgICAgICB2YXIgYSwgbiA9IChhID0gaSgyMzk0KSkgJiYgYS5fX2VzTW9kdWxlID8gYSA6IHtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogYVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gcihlLCB0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpID0gKG51bGwgIT0gZS5hbHRlcm5hdGlvbiA/IGUubWxvY1tvKGUpXSA6IGUubG9jYXRvcikuam9pbihcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFwiXCIgIT09IGkpIGZvciAoO2kubGVuZ3RoIDwgdDsgKSBpICs9IFwiMFwiO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gbyhlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0gZS5sb2NhdG9yW2UuYWx0ZXJuYXRpb25dO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzdHJpbmdcIiA9PSB0eXBlb2YgdCAmJiB0Lmxlbmd0aCA+IDAgJiYgKHQgPSB0LnNwbGl0KFwiLFwiKVswXSksIHZvaWQgMCAhPT0gdCA/IHQudG9TdHJpbmcoKSA6IFwiXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHMoZSwgdCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYSA9IHRoaXMub3B0cywgbiA9IHRoaXMubWFza3NldDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZvaWQgMCAhPT0gKHQgPSB0IHx8IGMuY2FsbCh0aGlzLCBlKS5tYXRjaCkucGxhY2Vob2xkZXIgfHwgITAgPT09IGkpIHJldHVybiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIHQucGxhY2Vob2xkZXIgPyB0LnBsYWNlaG9sZGVyKGEpIDogdC5wbGFjZWhvbGRlcjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEwID09PSB0LnN0YXRpYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUgPiAtMSAmJiB2b2lkIDAgPT09IG4udmFsaWRQb3NpdGlvbnNbZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgciwgbyA9IGQuY2FsbCh0aGlzLCBlKSwgcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLmxlbmd0aCA+IDEgKyAoXCJcIiA9PT0gb1tvLmxlbmd0aCAtIDFdLm1hdGNoLmRlZiA/IDEgOiAwKSkgZm9yICh2YXIgbCA9IDA7IGwgPCBvLmxlbmd0aDsgbCsrKSBpZiAoXCJcIiAhPT0gb1tsXS5tYXRjaC5kZWYgJiYgITAgIT09IG9bbF0ubWF0Y2gub3B0aW9uYWxpdHkgJiYgITAgIT09IG9bbF0ubWF0Y2gub3B0aW9uYWxRdWFudGlmaWVyICYmICghMCA9PT0gb1tsXS5tYXRjaC5zdGF0aWMgfHwgdm9pZCAwID09PSByIHx8ICExICE9PSBvW2xdLm1hdGNoLmZuLnRlc3Qoci5tYXRjaC5kZWYsIG4sIGUsICEwLCBhKSkgJiYgKHMucHVzaChvW2xdKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgITAgPT09IG9bbF0ubWF0Y2guc3RhdGljICYmIChyID0gb1tsXSksIHMubGVuZ3RoID4gMSAmJiAvWzAtOWEtYkEtWl0vLnRlc3Qoc1swXS5tYXRjaC5kZWYpKSkgcmV0dXJuIGEucGxhY2Vob2xkZXIuY2hhckF0KGUgJSBhLnBsYWNlaG9sZGVyLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdC5kZWY7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGEucGxhY2Vob2xkZXIuY2hhckF0KGUgJSBhLnBsYWNlaG9sZGVyLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGwoZSwgdCwgaSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXNrc2V0LnZhbGlkUG9zaXRpb25zW2VdIHx8IHUuY2FsbCh0aGlzLCBlLCBkLmNhbGwodGhpcywgZSwgdCA/IHQuc2xpY2UoKSA6IHQsIGkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdShlLCB0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpID0gdGhpcy5vcHRzLCBhID0gZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAwLCBhID0gITE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0LmZvckVhY2goKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLm1hdGNoLm9wdGlvbmFsaXR5ICYmICgwICE9PSBpICYmIGkgIT09IGUubWF0Y2gub3B0aW9uYWxpdHkgJiYgKGEgPSAhMCksICgwID09PSBpIHx8IGkgPiBlLm1hdGNoLm9wdGlvbmFsaXR5KSAmJiAoaSA9IGUubWF0Y2gub3B0aW9uYWxpdHkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKSwgaSAmJiAoMCA9PSBlIHx8IDEgPT0gdC5sZW5ndGggPyBpID0gMCA6IGEgfHwgKGkgPSAwKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgICAgICAgICAgfShlLCB0KTtcbiAgICAgICAgICAgICAgICAgICAgZSA9IGUgPiAwID8gZSAtIDEgOiAwO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbiwgbywgcywgbCA9IHIoYy5jYWxsKHRoaXMsIGUpKTtcbiAgICAgICAgICAgICAgICAgICAgaS5ncmVlZHkgJiYgdC5sZW5ndGggPiAxICYmIFwiXCIgPT09IHRbdC5sZW5ndGggLSAxXS5tYXRjaC5kZWYgJiYgdC5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgdSA9IDA7IHUgPCB0Lmxlbmd0aDsgdSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZiA9IHRbdV07XG4gICAgICAgICAgICAgICAgICAgICAgICBuID0gcihmLCBsLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZCA9IE1hdGguYWJzKG4gLSBsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICh2b2lkIDAgPT09IG8gfHwgXCJcIiAhPT0gbiAmJiBkIDwgbyB8fCBzICYmICFpLmdyZWVkeSAmJiBzLm1hdGNoLm9wdGlvbmFsaXR5ICYmIHMubWF0Y2gub3B0aW9uYWxpdHkgLSBhID4gMCAmJiBcIm1hc3RlclwiID09PSBzLm1hdGNoLm5ld0Jsb2NrTWFya2VyICYmICghZi5tYXRjaC5vcHRpb25hbGl0eSB8fCBmLm1hdGNoLm9wdGlvbmFsaXR5IC0gYSA8IDEgfHwgIWYubWF0Y2gubmV3QmxvY2tNYXJrZXIpIHx8IHMgJiYgIWkuZ3JlZWR5ICYmIHMubWF0Y2gub3B0aW9uYWxRdWFudGlmaWVyICYmICFmLm1hdGNoLm9wdGlvbmFsUXVhbnRpZmllcikgJiYgKG8gPSBkLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgPSBmKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gYyhlLCB0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpID0gdGhpcy5tYXNrc2V0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaS52YWxpZFBvc2l0aW9uc1tlXSA/IGkudmFsaWRQb3NpdGlvbnNbZV0gOiAodCB8fCBkLmNhbGwodGhpcywgZSkpWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBmKGUsIHQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gYShlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB0LCBpID0gW10sIGEgPSAtMSwgbiA9IDAsIHIgPSBlLmxlbmd0aDsgbiA8IHI7IG4rKykgaWYgKFwiLVwiID09PSBlLmNoYXJBdChuKSkgZm9yICh0ID0gZS5jaGFyQ29kZUF0KG4gKyAxKTsgKythIDwgdDsgKSBpLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShhKSk7IGVsc2UgYSA9IGUuY2hhckNvZGVBdChuKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBpLnB1c2goZS5jaGFyQXQobikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGkuam9pbihcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS5tYXRjaC5kZWYgPT09IHQubWF0Y2gubmF0aXZlRGVmIHx8ICEoIShpLnJlZ2V4IHx8IGUubWF0Y2guZm4gaW5zdGFuY2VvZiBSZWdFeHAgJiYgdC5tYXRjaC5mbiBpbnN0YW5jZW9mIFJlZ0V4cCkgfHwgITAgPT09IGUubWF0Y2guc3RhdGljIHx8ICEwID09PSB0Lm1hdGNoLnN0YXRpYykgJiYgLTEgIT09IGEodC5tYXRjaC5mbi50b1N0cmluZygpLnJlcGxhY2UoL1tbXFxdL10vZywgXCJcIikpLmluZGV4T2YoYShlLm1hdGNoLmZuLnRvU3RyaW5nKCkucmVwbGFjZSgvW1tcXF0vXS9nLCBcIlwiKSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBkKGUsIHQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGEsIHIsIG8gPSB0aGlzLCBzID0gdGhpcy5kZXBlbmRlbmN5TGliLCBsID0gdGhpcy5tYXNrc2V0LCBjID0gdGhpcy5vcHRzLCBkID0gdGhpcy5lbCwgcCA9IGwubWFza1Rva2VuLCBoID0gdCA/IGkgOiAwLCBtID0gdCA/IHQuc2xpY2UoKSA6IFsgMCBdLCB2ID0gW10sIGcgPSAhMSwgayA9IHQgPyB0LmpvaW4oXCJcIikgOiBcIlwiO1xuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiB5KHQsIGksIHIsIG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHMociwgbywgdSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHAoZSwgdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IDAgPT09IHQubWF0Y2hlcy5pbmRleE9mKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaSB8fCB0Lm1hdGNoZXMuZXZlcnkoKGZ1bmN0aW9uKGEsIG4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhMCA9PT0gYS5pc1F1YW50aWZpZXIgPyBpID0gcChlLCB0Lm1hdGNoZXNbbiAtIDFdKSA6IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhLCBcIm1hdGNoZXNcIikgJiYgKGkgPSBwKGUsIGEpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhaTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpLCBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBtKGUsIHQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGEsIG47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobC50ZXN0c1tlXSB8fCBsLnZhbGlkUG9zaXRpb25zW2VdKSAmJiAobC50ZXN0c1tlXSB8fCBbIGwudmFsaWRQb3NpdGlvbnNbZV0gXSkuZXZlcnkoKGZ1bmN0aW9uKGUsIHIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLm1sb2NbdF0pIHJldHVybiBhID0gZSwgITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbyA9IHZvaWQgMCAhPT0gaSA/IGkgOiBlLmFsdGVybmF0aW9uLCBzID0gdm9pZCAwICE9PSBlLmxvY2F0b3Jbb10gPyBlLmxvY2F0b3Jbb10udG9TdHJpbmcoKS5pbmRleE9mKHQpIDogLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHZvaWQgMCA9PT0gbiB8fCBzIDwgbikgJiYgLTEgIT09IHMgJiYgKGEgPSBlLCBuID0gcyksICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSksIGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByID0gYS5sb2NhdG9yW2EuYWx0ZXJuYXRpb25dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChhLm1sb2NbdF0gfHwgYS5tbG9jW3JdIHx8IGEubG9jYXRvcikuc2xpY2UoKHZvaWQgMCAhPT0gaSA/IGkgOiBhLmFsdGVybmF0aW9uKSArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2b2lkIDAgIT09IGkgPyBtKGUsIHQpIDogdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBiKGUsIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBlLmFsdGVybmF0aW9uLCBhID0gdm9pZCAwID09PSB0IHx8IGkgPT09IHQuYWx0ZXJuYXRpb24gJiYgLTEgPT09IGUubG9jYXRvcltpXS50b1N0cmluZygpLmluZGV4T2YodC5sb2NhdG9yW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhICYmIGkgPiB0LmFsdGVybmF0aW9uKSBmb3IgKHZhciBuID0gdC5hbHRlcm5hdGlvbjsgbiA8IGk7IG4rKykgaWYgKGUubG9jYXRvcltuXSAhPT0gdC5sb2NhdG9yW25dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gbiwgYSA9ICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUubWxvYyA9IGUubWxvYyB8fCB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByID0gZS5sb2NhdG9yW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZvaWQgMCAhPT0gcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcInN0cmluZ1wiID09IHR5cGVvZiByICYmIChyID0gci5zcGxpdChcIixcIilbMF0pLCB2b2lkIDAgPT09IGUubWxvY1tyXSAmJiAoZS5tbG9jW3JdID0gZS5sb2NhdG9yLnNsaWNlKCkpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2lkIDAgIT09IHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbyBpbiB0Lm1sb2MpIFwic3RyaW5nXCIgPT0gdHlwZW9mIG8gJiYgKG8gPSBvLnNwbGl0KFwiLFwiKVswXSksIHZvaWQgMCA9PT0gZS5tbG9jW29dICYmIChlLm1sb2Nbb10gPSB0Lm1sb2Nbb10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLmxvY2F0b3JbaV0gPSBPYmplY3Qua2V5cyhlLm1sb2MpLmpvaW4oXCIsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLmFsdGVybmF0aW9uID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24geChlLCB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLmxvY2F0b3IubGVuZ3RoICE9PSB0LmxvY2F0b3IubGVuZ3RoKSByZXR1cm4gITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBlLmFsdGVybmF0aW9uICsgMTsgaSA8IGUubG9jYXRvci5sZW5ndGg7IGkrKykgaWYgKGUubG9jYXRvcltpXSAhPT0gdC5sb2NhdG9yW2ldKSByZXR1cm4gITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGggPiBlICsgYy5fbWF4VGVzdFBvcykgdGhyb3cgXCJJbnB1dG1hc2s6IFRoZXJlIGlzIHByb2JhYmx5IGFuIGVycm9yIGluIHlvdXIgbWFzayBkZWZpbml0aW9uIG9yIGluIHRoZSBjb2RlLiBDcmVhdGUgYW4gaXNzdWUgb24gZ2l0aHViIHdpdGggYW4gZXhhbXBsZSBvZiB0aGUgbWFzayB5b3UgYXJlIHVzaW5nLiBcIiArIGwubWFzaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaCA9PT0gZSAmJiB2b2lkIDAgPT09IHIubWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodi5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoOiByLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRvcjogby5yZXZlcnNlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZDogayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1sb2M6IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLCAhci5vcHRpb25hbGl0eSB8fCB2b2lkIDAgIT09IHUgfHwgIShjLmRlZmluaXRpb25zICYmIGMuZGVmaW5pdGlvbnNbci5uYXRpdmVEZWZdICYmIGMuZGVmaW5pdGlvbnNbci5uYXRpdmVEZWZdLm9wdGlvbmFsIHx8IG4uZGVmYXVsdC5wcm90b3R5cGUuZGVmaW5pdGlvbnNbci5uYXRpdmVEZWZdICYmIG4uZGVmYXVsdC5wcm90b3R5cGUuZGVmaW5pdGlvbnNbci5uYXRpdmVEZWZdLm9wdGlvbmFsKSkgcmV0dXJuICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnID0gITAsIGggPSBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodm9pZCAwICE9PSByLm1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHIuaXNHcm91cCAmJiB1ICE9PSByKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAociA9IHModC5tYXRjaGVzW3QubWF0Y2hlcy5pbmRleE9mKHIpICsgMV0sIG8sIHUpKSByZXR1cm4gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoci5pc09wdGlvbmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgUCA9IHIsIEUgPSB2Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyID0geShyLCBpLCBvLCB1KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2LmZvckVhY2goKGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdCA+PSBFICYmIChlLm1hdGNoLm9wdGlvbmFsaXR5ID0gZS5tYXRjaC5vcHRpb25hbGl0eSA/IGUubWF0Y2gub3B0aW9uYWxpdHkgKyAxIDogMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpLCBhID0gdlt2Lmxlbmd0aCAtIDFdLm1hdGNoLCB2b2lkIDAgIT09IHUgfHwgIXAoYSwgUCkpIHJldHVybiAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnID0gITAsIGggPSBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHIuaXNBbHRlcm5hdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgUywgdyA9IHIsIF8gPSBbXSwgTSA9IHYuc2xpY2UoKSwgTyA9IG8ubGVuZ3RoLCBUID0gITEsIEEgPSBpLmxlbmd0aCA+IDAgPyBpLnNoaWZ0KCkgOiAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgtMSA9PT0gQSB8fCBcInN0cmluZ1wiID09IHR5cGVvZiBBKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIEMsIEQgPSBoLCBqID0gaS5zbGljZSgpLCBCID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFwic3RyaW5nXCIgPT0gdHlwZW9mIEEpIEIgPSBBLnNwbGl0KFwiLFwiKTsgZWxzZSBmb3IgKEMgPSAwOyBDIDwgdy5tYXRjaGVzLmxlbmd0aDsgQysrKSBCLnB1c2goQy50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodm9pZCAwICE9PSBsLmV4Y2x1ZGVzW2VdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIFIgPSBCLnNsaWNlKCksIEwgPSAwLCBJID0gbC5leGNsdWRlc1tlXS5sZW5ndGg7IEwgPCBJOyBMKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBGID0gbC5leGNsdWRlc1tlXVtMXS50b1N0cmluZygpLnNwbGl0KFwiOlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8ubGVuZ3RoID09IEZbMV0gJiYgQi5zcGxpY2UoQi5pbmRleE9mKEZbMF0pLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwID09PSBCLmxlbmd0aCAmJiAoZGVsZXRlIGwuZXhjbHVkZXNbZV0sIEIgPSBSKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCEwID09PSBjLmtlZXBTdGF0aWMgfHwgaXNGaW5pdGUocGFyc2VJbnQoYy5rZWVwU3RhdGljKSkgJiYgRCA+PSBjLmtlZXBTdGF0aWMpICYmIChCID0gQi5zbGljZSgwLCAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgTiA9IDA7IE4gPCBCLmxlbmd0aDsgTisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEMgPSBwYXJzZUludChCW05dKSwgdiA9IFtdLCBpID0gXCJzdHJpbmdcIiA9PSB0eXBlb2YgQSAmJiBtKGgsIEMsIE8pIHx8IGouc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIFYgPSB3Lm1hdGNoZXNbQ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChWICYmIHMoViwgWyBDIF0uY29uY2F0KG8pLCB1KSkgciA9ICEwOyBlbHNlIGlmICgwID09PSBOICYmIChUID0gITApLCBWICYmIFYubWF0Y2hlcyAmJiBWLm1hdGNoZXMubGVuZ3RoID4gdy5tYXRjaGVzWzBdLm1hdGNoZXMubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUyA9IHYuc2xpY2UoKSwgaCA9IEQsIHYgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgRyA9IDA7IEcgPCBTLmxlbmd0aDsgRysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgSCA9IFNbR10sIEsgPSAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEgubWF0Y2guaml0ID0gSC5tYXRjaC5qaXQgfHwgVCwgSC5hbHRlcm5hdGlvbiA9IEguYWx0ZXJuYXRpb24gfHwgTywgYihIKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIFUgPSAwOyBVIDwgXy5sZW5ndGg7IFUrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkID0gX1tVXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJzdHJpbmdcIiAhPSB0eXBlb2YgQSB8fCB2b2lkIDAgIT09IEguYWx0ZXJuYXRpb24gJiYgQi5pbmNsdWRlcyhILmxvY2F0b3JbSC5hbHRlcm5hdGlvbl0udG9TdHJpbmcoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEgubWF0Y2gubmF0aXZlRGVmID09PSAkLm1hdGNoLm5hdGl2ZURlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSyA9ICEwLCBiKCQsIEgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGYoSCwgJCwgYykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGIoSCwgJCkgJiYgKEsgPSAhMCwgXy5zcGxpY2UoXy5pbmRleE9mKCQpLCAwLCBIKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZigkLCBILCBjKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYigkLCBIKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChaID0gJCwgITAgPT09IChXID0gSCkubWF0Y2guc3RhdGljICYmICEwICE9PSBaLm1hdGNoLnN0YXRpYyAmJiBaLm1hdGNoLmZuLnRlc3QoVy5tYXRjaC5kZWYsIGwsIGUsICExLCBjLCAhMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHgoSCwgJCkgfHwgdm9pZCAwICE9PSBkLmlucHV0bWFzay51c2VyT3B0aW9ucy5rZWVwU3RhdGljID8gYihILCAkKSAmJiAoSyA9ICEwLCBfLnNwbGljZShfLmluZGV4T2YoJCksIDAsIEgpKSA6IGMua2VlcFN0YXRpYyA9ICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBLIHx8IF8ucHVzaChIKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ID0gTS5jb25jYXQoXyksIGggPSBlLCBnID0gdi5sZW5ndGggPiAwLCByID0gXy5sZW5ndGggPiAwLCBpID0gai5zbGljZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHIgPSBzKHcubWF0Y2hlc1tBXSB8fCB0Lm1hdGNoZXNbQV0sIFsgQSBdLmNvbmNhdChvKSwgdSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocikgcmV0dXJuICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHIuaXNRdWFudGlmaWVyICYmIHUgIT09IHQubWF0Y2hlc1t0Lm1hdGNoZXMuaW5kZXhPZihyKSAtIDFdKSBmb3IgKHZhciBxID0gciwgeiA9IGkubGVuZ3RoID4gMCA/IGkuc2hpZnQoKSA6IDA7IHogPCAoaXNOYU4ocS5xdWFudGlmaWVyLm1heCkgPyB6ICsgMSA6IHEucXVhbnRpZmllci5tYXgpICYmIGggPD0gZTsgeisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgUSA9IHQubWF0Y2hlc1t0Lm1hdGNoZXMuaW5kZXhPZihxKSAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHIgPSBzKFEsIFsgeiBdLmNvbmNhdChvKSwgUSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGEgPSB2W3YubGVuZ3RoIC0gMV0ubWF0Y2gpLm9wdGlvbmFsUXVhbnRpZmllciA9IHogPj0gcS5xdWFudGlmaWVyLm1pbiwgYS5qaXQgPSAoeiArIDEpICogKFEubWF0Y2hlcy5pbmRleE9mKGEpICsgMSkgPiBxLnF1YW50aWZpZXIuaml0LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhLm9wdGlvbmFsUXVhbnRpZmllciAmJiBwKGEsIFEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGcgPSAhMCwgaCA9IGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYS5qaXQgJiYgKGwuaml0T2Zmc2V0W2VdID0gUS5tYXRjaGVzLmxlbmd0aCAtIFEubWF0Y2hlcy5pbmRleE9mKGEpKSwgITA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAociA9IHkociwgaSwgbywgdSkpIHJldHVybiAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBXLCBaO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgdSA9IGkubGVuZ3RoID4gMCA/IGkuc2hpZnQoKSA6IDA7IHUgPCB0Lm1hdGNoZXMubGVuZ3RoOyB1KyspIGlmICghMCAhPT0gdC5tYXRjaGVzW3VdLmlzUXVhbnRpZmllcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwID0gcyh0Lm1hdGNoZXNbdV0sIFsgdSBdLmNvbmNhdChyKSwgbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHAgJiYgaCA9PT0gZSkgcmV0dXJuIHA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGggPiBlKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodm9pZCAwID09PSB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYiwgeCA9IGUgLSAxOyB2b2lkIDAgPT09IChiID0gbC52YWxpZFBvc2l0aW9uc1t4XSB8fCBsLnRlc3RzW3hdKSAmJiB4ID4gLTE7ICkgeC0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvaWQgMCAhPT0gYiAmJiB4ID4gLTEgJiYgKG0gPSBmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpLCBhID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHQpIHx8ICh0ID0gWyB0IF0pLCB0Lmxlbmd0aCA+IDAgJiYgKHZvaWQgMCA9PT0gdFswXS5hbHRlcm5hdGlvbiB8fCAhMCA9PT0gYy5rZWVwU3RhdGljID8gMCA9PT0gKGEgPSB1LmNhbGwobywgZSwgdC5zbGljZSgpKS5sb2NhdG9yLnNsaWNlKCkpLmxlbmd0aCAmJiAoYSA9IHRbMF0ubG9jYXRvci5zbGljZSgpKSA6IHQuZm9yRWFjaCgoZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIiAhPT0gZS5kZWYgJiYgKDAgPT09IGEubGVuZ3RoID8gKGkgPSBlLmFsdGVybmF0aW9uLCBhID0gZS5sb2NhdG9yLnNsaWNlKCkpIDogZS5sb2NhdG9yW2ldICYmIC0xID09PSBhW2ldLnRvU3RyaW5nKCkuaW5kZXhPZihlLmxvY2F0b3JbaV0pICYmIChhW2ldICs9IFwiLFwiICsgZS5sb2NhdG9yW2ldKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSksIGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSh4LCBiKSwgayA9IG0uam9pbihcIlwiKSwgaCA9IHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGwudGVzdHNbZV0gJiYgbC50ZXN0c1tlXVswXS5jZCA9PT0gaykgcmV0dXJuIGwudGVzdHNbZV07XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBQID0gbS5zaGlmdCgpOyBQIDwgcC5sZW5ndGg7IFArKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh5KHBbUF0sIG0sIFsgUCBdKSAmJiBoID09PSBlIHx8IGggPiBlKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKDAgPT09IHYubGVuZ3RoIHx8IGcpICYmIHYucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpYzogITAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWxpdHk6ICExLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2luZzogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWY6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdG9yOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1sb2M6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2Q6IGtcbiAgICAgICAgICAgICAgICAgICAgfSksIHZvaWQgMCAhPT0gdCAmJiBsLnRlc3RzW2VdID8gciA9IHMuZXh0ZW5kKCEwLCBbXSwgdikgOiAobC50ZXN0c1tlXSA9IHMuZXh0ZW5kKCEwLCBbXSwgdiksIFxuICAgICAgICAgICAgICAgICAgICByID0gbC50ZXN0c1tlXSksIHYuZm9yRWFjaCgoZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5tYXRjaC5vcHRpb25hbGl0eSA9ICExO1xuICAgICAgICAgICAgICAgICAgICB9KSksIHI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDcyMTU6IGZ1bmN0aW9uKGUsIHQsIGkpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodCwgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICEwXG4gICAgICAgICAgICAgICAgfSksIHQuYWx0ZXJuYXRlID0gbCwgdC5jaGVja0FsdGVybmF0aW9uTWF0Y2ggPSBmdW5jdGlvbihlLCB0LCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGEsIG4gPSB0aGlzLm9wdHMuZ3JlZWR5ID8gdCA6IHQuc2xpY2UoMCwgMSksIHIgPSAhMSwgbyA9IHZvaWQgMCAhPT0gaSA/IGkuc3BsaXQoXCIsXCIpIDogW10sIHMgPSAwOyBzIDwgby5sZW5ndGg7IHMrKykgLTEgIT09IChhID0gZS5pbmRleE9mKG9bc10pKSAmJiBlLnNwbGljZShhLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbCA9IDA7IGwgPCBlLmxlbmd0aDsgbCsrKSBpZiAobi5pbmNsdWRlcyhlW2xdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgciA9ICEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICAgICAgfSwgdC5oYW5kbGVSZW1vdmUgPSBmdW5jdGlvbihlLCB0LCBpLCBhLCBzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB1ID0gdGhpcywgYyA9IHRoaXMubWFza3NldCwgZiA9IHRoaXMub3B0cztcbiAgICAgICAgICAgICAgICAgICAgaWYgKChmLm51bWVyaWNJbnB1dCB8fCB1LmlzUlRMKSAmJiAodCA9PT0gci5kZWZhdWx0LkJBQ0tTUEFDRSA/IHQgPSByLmRlZmF1bHQuREVMRVRFIDogdCA9PT0gci5kZWZhdWx0LkRFTEVURSAmJiAodCA9IHIuZGVmYXVsdC5CQUNLU1BBQ0UpLCBcbiAgICAgICAgICAgICAgICAgICAgdS5pc1JUTCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkID0gaS5lbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpLmVuZCA9IGkuYmVnaW4sIGkuYmVnaW4gPSBkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBwLCBoID0gby5nZXRMYXN0VmFsaWRQb3NpdGlvbi5jYWxsKHUsIHZvaWQgMCwgITApO1xuICAgICAgICAgICAgICAgICAgICBpLmVuZCA+PSBvLmdldEJ1ZmZlci5jYWxsKHUpLmxlbmd0aCAmJiBoID49IGkuZW5kICYmIChpLmVuZCA9IGggKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgdCA9PT0gci5kZWZhdWx0LkJBQ0tTUEFDRSA/IGkuZW5kIC0gaS5iZWdpbiA8IDEgJiYgKGkuYmVnaW4gPSBvLnNlZWtQcmV2aW91cy5jYWxsKHUsIGkuYmVnaW4pKSA6IHQgPT09IHIuZGVmYXVsdC5ERUxFVEUgJiYgaS5iZWdpbiA9PT0gaS5lbmQgJiYgKGkuZW5kID0gby5pc01hc2suY2FsbCh1LCBpLmVuZCwgITAsICEwKSA/IGkuZW5kICsgMSA6IG8uc2Vla05leHQuY2FsbCh1LCBpLmVuZCkgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCExICE9PSAocCA9IHYuY2FsbCh1LCBpKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghMCAhPT0gYSAmJiAhMSAhPT0gZi5rZWVwU3RhdGljIHx8IG51bGwgIT09IGYucmVnZXggJiYgLTEgIT09IG4uZ2V0VGVzdC5jYWxsKHUsIGkuYmVnaW4pLm1hdGNoLmRlZi5pbmRleE9mKFwifFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtID0gbC5jYWxsKHUsICEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZyA9IHZvaWQgMCAhPT0gbS5jYXJldCA/IG0uY2FyZXQgOiBtLnBvcyA/IG8uc2Vla05leHQuY2FsbCh1LCBtLnBvcy5iZWdpbiA/IG0ucG9zLmJlZ2luIDogbS5wb3MpIDogby5nZXRMYXN0VmFsaWRQb3NpdGlvbi5jYWxsKHUsIC0xLCAhMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0ICE9PSByLmRlZmF1bHQuREVMRVRFIHx8IGkuYmVnaW4gPiBnKSAmJiBpLmJlZ2luO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICEwICE9PSBhICYmIChjLnAgPSB0ID09PSByLmRlZmF1bHQuREVMRVRFID8gaS5iZWdpbiArIHAgOiBpLmJlZ2luLCBjLnAgPSBvLmRldGVybWluZU5ld0NhcmV0UG9zaXRpb24uY2FsbCh1LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVnaW46IGMucCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IGMucFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgITEsICExID09PSBmLmluc2VydE1vZGUgJiYgdCA9PT0gci5kZWZhdWx0LkJBQ0tTUEFDRSA/IFwibm9uZVwiIDogdm9pZCAwKS5iZWdpbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCB0LmlzQ29tcGxldGUgPSBjLCB0LmlzU2VsZWN0aW9uID0gZiwgdC5pc1ZhbGlkID0gZCwgdC5yZWZyZXNoRnJvbUJ1ZmZlciA9IGgsIFxuICAgICAgICAgICAgICAgIHQucmV2YWxpZGF0ZU1hc2sgPSB2O1xuICAgICAgICAgICAgICAgIHZhciBhLCBuID0gaSg0NzEzKSwgciA9IChhID0gaSg1NTgxKSkgJiYgYS5fX2VzTW9kdWxlID8gYSA6IHtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogYVxuICAgICAgICAgICAgICAgIH0sIG8gPSBpKDg3MTEpLCBzID0gaSg2MDMwKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBsKGUsIHQsIGksIGEsIHIsIHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHUsIGMsIGYsIHAsIGgsIG0sIHYsIGcsIGssIHksIGIsIHggPSB0aGlzLCBQID0gdGhpcy5kZXBlbmRlbmN5TGliLCBFID0gdGhpcy5vcHRzLCBTID0geC5tYXNrc2V0LCB3ID0gUC5leHRlbmQoITAsIHt9LCBTLnZhbGlkUG9zaXRpb25zKSwgXyA9IFAuZXh0ZW5kKCEwLCB7fSwgUy50ZXN0cyksIE0gPSAhMSwgTyA9ICExLCBUID0gdm9pZCAwICE9PSByID8gciA6IG8uZ2V0TGFzdFZhbGlkUG9zaXRpb24uY2FsbCh4KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMgJiYgKHkgPSBzLmJlZ2luLCBiID0gcy5lbmQsIHMuYmVnaW4gPiBzLmVuZCAmJiAoeSA9IHMuZW5kLCBiID0gcy5iZWdpbikpLCBcbiAgICAgICAgICAgICAgICAgICAgLTEgPT09IFQgJiYgdm9pZCAwID09PSByKSB1ID0gMCwgYyA9IChwID0gbi5nZXRUZXN0LmNhbGwoeCwgdSkpLmFsdGVybmF0aW9uOyBlbHNlIGZvciAoO1QgPj0gMDsgVC0tKSBpZiAoKGYgPSBTLnZhbGlkUG9zaXRpb25zW1RdKSAmJiB2b2lkIDAgIT09IGYuYWx0ZXJuYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwICYmIHAubG9jYXRvcltmLmFsdGVybmF0aW9uXSAhPT0gZi5sb2NhdG9yW2YuYWx0ZXJuYXRpb25dKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIHUgPSBULCBjID0gUy52YWxpZFBvc2l0aW9uc1t1XS5hbHRlcm5hdGlvbiwgcCA9IGY7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHZvaWQgMCAhPT0gYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdiA9IHBhcnNlSW50KHUpLCBTLmV4Y2x1ZGVzW3ZdID0gUy5leGNsdWRlc1t2XSB8fCBbXSwgITAgIT09IGUgJiYgUy5leGNsdWRlc1t2XS5wdXNoKCgwLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIG4uZ2V0RGVjaXNpb25UYWtlcikocCkgKyBcIjpcIiArIHAuYWx0ZXJuYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIEEgPSBbXSwgQyA9IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChoID0gdjsgaCA8IG8uZ2V0TGFzdFZhbGlkUG9zaXRpb24uY2FsbCh4LCB2b2lkIDAsICEwKSArIDE7IGgrKykgLTEgPT09IEMgJiYgZSA8PSBoICYmIHZvaWQgMCAhPT0gdCAmJiAoQS5wdXNoKHQpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIEMgPSBBLmxlbmd0aCAtIDEpLCAobSA9IFMudmFsaWRQb3NpdGlvbnNbaF0pICYmICEwICE9PSBtLmdlbmVyYXRlZElucHV0ICYmICh2b2lkIDAgPT09IHMgfHwgaCA8IHkgfHwgaCA+PSBiKSAmJiBBLnB1c2gobS5pbnB1dCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIFMudmFsaWRQb3NpdGlvbnNbaF07XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKC0xID09PSBDICYmIHZvaWQgMCAhPT0gdCAmJiAoQS5wdXNoKHQpLCBDID0gQS5sZW5ndGggLSAxKTsgdm9pZCAwICE9PSBTLmV4Y2x1ZGVzW3ZdICYmIFMuZXhjbHVkZXNbdl0ubGVuZ3RoIDwgMTA7ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoUy50ZXN0cyA9IHt9LCBvLnJlc2V0TWFza1NldC5jYWxsKHgsICEwKSwgTSA9ICEwLCBoID0gMDsgaCA8IEEubGVuZ3RoICYmIChnID0gTS5jYXJldCB8fCBvLmdldExhc3RWYWxpZFBvc2l0aW9uLmNhbGwoeCwgdm9pZCAwLCAhMCkgKyAxLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gQVtoXSwgTSA9IGQuY2FsbCh4LCBnLCBrLCAhMSwgYSwgITApKTsgaCsrKSBoID09PSBDICYmIChPID0gTSksIDEgPT0gZSAmJiBNICYmIChPID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldFBvczogaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5yZXNldE1hc2tTZXQuY2FsbCh4KSwgcCA9IG4uZ2V0VGVzdC5jYWxsKHgsIHYpLCBTLnZhbGlkUG9zaXRpb25zID0gUC5leHRlbmQoITAsIHt9LCB3KSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUy50ZXN0cyA9IFAuZXh0ZW5kKCEwLCB7fSwgXyksICFTLmV4Y2x1ZGVzW3ZdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE8gPSBsLmNhbGwoeCwgZSwgdCwgaSwgYSwgdiAtIDEsIHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIEQgPSAoMCwgbi5nZXREZWNpc2lvblRha2VyKShwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoLTEgIT09IFMuZXhjbHVkZXNbdl0uaW5kZXhPZihEICsgXCI6XCIgKyBwLmFsdGVybmF0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPID0gbC5jYWxsKHgsIGUsIHQsIGksIGEsIHYgLSAxLCBzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoUy5leGNsdWRlc1t2XS5wdXNoKEQgKyBcIjpcIiArIHAuYWx0ZXJuYXRpb24pLCBoID0gdjsgaCA8IG8uZ2V0TGFzdFZhbGlkUG9zaXRpb24uY2FsbCh4LCB2b2lkIDAsICEwKSArIDE7IGgrKykgZGVsZXRlIFMudmFsaWRQb3NpdGlvbnNbaF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE8gJiYgITEgPT09IEUua2VlcFN0YXRpYyB8fCBkZWxldGUgUy5leGNsdWRlc1t2XSwgTztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdShlLCB0LCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhID0gdGhpcy5vcHRzLCBuID0gdGhpcy5tYXNrc2V0O1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGEuY2FzaW5nIHx8IHQuY2FzaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInVwcGVyXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBlID0gZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwibG93ZXJcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGUgPSBlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0aXRsZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG8gPSBuLnZhbGlkUG9zaXRpb25zW2kgLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUgPSAwID09PSBpIHx8IG8gJiYgby5pbnB1dCA9PT0gU3RyaW5nLmZyb21DaGFyQ29kZShyLmRlZmF1bHQuU1BBQ0UpID8gZS50b1VwcGVyQ2FzZSgpIDogZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgYS5jYXNpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5wdXNoKG4udmFsaWRQb3NpdGlvbnMpLCBlID0gYS5jYXNpbmcuYXBwbHkodGhpcywgcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGMoZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IHRoaXMsIGkgPSB0aGlzLm9wdHMsIGEgPSB0aGlzLm1hc2tzZXQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGkuaXNDb21wbGV0ZSkgcmV0dXJuIGkuaXNDb21wbGV0ZShlLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFwiKlwiICE9PSBpLnJlcGVhdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSAhMSwgcyA9IG8uZGV0ZXJtaW5lTGFzdFJlcXVpcmVkUG9zaXRpb24uY2FsbCh0LCAhMCksIGwgPSBvLnNlZWtQcmV2aW91cy5jYWxsKHQsIHMubCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodm9pZCAwID09PSBzLmRlZiB8fCBzLmRlZi5uZXdCbG9ja01hcmtlciB8fCBzLmRlZi5vcHRpb25hbGl0eSB8fCBzLmRlZi5vcHRpb25hbFF1YW50aWZpZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByID0gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgdSA9IDA7IHUgPD0gbDsgdSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjID0gbi5nZXRUZXN0VGVtcGxhdGUuY2FsbCh0LCB1KS5tYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEwICE9PSBjLnN0YXRpYyAmJiB2b2lkIDAgPT09IGEudmFsaWRQb3NpdGlvbnNbdV0gJiYgITAgIT09IGMub3B0aW9uYWxpdHkgJiYgITAgIT09IGMub3B0aW9uYWxRdWFudGlmaWVyIHx8ICEwID09PSBjLnN0YXRpYyAmJiBlW3VdICE9PSBuLmdldFBsYWNlaG9sZGVyLmNhbGwodCwgdSwgYykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIgPSAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcy5vcHRzLmluc2VydE1vZGUgPyAwIDogMTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNSVEwgPyBlLmJlZ2luIC0gZS5lbmQgPiB0IDogZS5lbmQgLSBlLmJlZ2luID4gdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZChlLCB0LCBpLCBhLCByLCBzLCBwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBnID0gdGhpcywgayA9IHRoaXMuZGVwZW5kZW5jeUxpYiwgeSA9IHRoaXMub3B0cywgYiA9IGcubWFza3NldDtcbiAgICAgICAgICAgICAgICAgICAgaSA9ICEwID09PSBpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeCA9IGU7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIFAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZvaWQgMCAhPT0gZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2b2lkIDAgIT09IGUucmVtb3ZlICYmIChBcnJheS5pc0FycmF5KGUucmVtb3ZlKSB8fCAoZS5yZW1vdmUgPSBbIGUucmVtb3ZlIF0pLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnJlbW92ZS5zb3J0KChmdW5jdGlvbihlLCB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0LnBvcyAtIGUucG9zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKS5mb3JFYWNoKChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYuY2FsbChnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWdpbjogZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogZSArIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpLCBlLnJlbW92ZSA9IHZvaWQgMCksIHZvaWQgMCAhPT0gZS5pbnNlcnQgJiYgKEFycmF5LmlzQXJyYXkoZS5pbnNlcnQpIHx8IChlLmluc2VydCA9IFsgZS5pbnNlcnQgXSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuaW5zZXJ0LnNvcnQoKGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUucG9zIC0gdC5wb3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpLmZvckVhY2goKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIiAhPT0gZS5jICYmIGQuY2FsbChnLCBlLnBvcywgZS5jLCB2b2lkIDAgPT09IGUuc3RyaWN0IHx8IGUuc3RyaWN0LCB2b2lkIDAgIT09IGUuZnJvbUlzVmFsaWQgPyBlLmZyb21Jc1ZhbGlkIDogYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpLCBlLmluc2VydCA9IHZvaWQgMCksIGUucmVmcmVzaEZyb21CdWZmZXIgJiYgZS5idWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSBlLnJlZnJlc2hGcm9tQnVmZmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoLmNhbGwoZywgITAgPT09IHQgPyB0IDogdC5zdGFydCwgdC5lbmQsIGUuYnVmZmVyKSwgZS5yZWZyZXNoRnJvbUJ1ZmZlciA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9pZCAwICE9PSBlLnJld3JpdGVQb3NpdGlvbiAmJiAoeCA9IGUucmV3cml0ZVBvc2l0aW9uLCBlID0gITApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gRSh0LCBpLCByKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcyA9ICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG4uZ2V0VGVzdHMuY2FsbChnLCB0KS5ldmVyeSgoZnVuY3Rpb24obCwgYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkID0gbC5tYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5nZXRCdWZmZXIuY2FsbChnLCAhMCksICExICE9PSAocyA9ICghZC5qaXQgfHwgdm9pZCAwICE9PSBiLnZhbGlkUG9zaXRpb25zW28uc2Vla1ByZXZpb3VzLmNhbGwoZywgdCldKSAmJiAobnVsbCAhPSBkLmZuID8gZC5mbi50ZXN0KGksIGIsIHQsIHIsIHksIGYuY2FsbChnLCBlKSkgOiAoaSA9PT0gZC5kZWYgfHwgaSA9PT0geS5za2lwT3B0aW9uYWxQYXJ0Q2hhcmFjdGVyKSAmJiBcIlwiICE9PSBkLmRlZiAmJiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGM6IG4uZ2V0UGxhY2Vob2xkZXIuY2FsbChnLCB0LCBkLCAhMCkgfHwgZC5kZWYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvczogdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IHZvaWQgMCAhPT0gcy5jID8gcy5jIDogaSwgaCA9IHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwID0gcCA9PT0geS5za2lwT3B0aW9uYWxQYXJ0Q2hhcmFjdGVyICYmICEwID09PSBkLnN0YXRpYyA/IG4uZ2V0UGxhY2Vob2xkZXIuY2FsbChnLCB0LCBkLCAhMCkgfHwgZC5kZWYgOiBwLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgITAgIT09IChzID0gUChzKSkgJiYgdm9pZCAwICE9PSBzLnBvcyAmJiBzLnBvcyAhPT0gdCAmJiAoaCA9IHMucG9zKSwgITAgIT09IHMgJiYgdm9pZCAwID09PSBzLnBvcyAmJiB2b2lkIDAgPT09IHMuYyA/ICExIDogKCExID09PSB2LmNhbGwoZywgZSwgay5leHRlbmQoe30sIGwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiB1LmNhbGwoZywgcCwgZCwgaClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksIGEsIGgpICYmIChzID0gITEpLCAhMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKSwgcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2b2lkIDAgIT09IGUuYmVnaW4gJiYgKHggPSBnLmlzUlRMID8gZS5lbmQgOiBlLmJlZ2luKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIFMgPSAhMCwgdyA9IGsuZXh0ZW5kKCEwLCB7fSwgYi52YWxpZFBvc2l0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghMSA9PT0geS5rZWVwU3RhdGljICYmIHZvaWQgMCAhPT0gYi5leGNsdWRlc1t4XSAmJiAhMCAhPT0gciAmJiAhMCAhPT0gYSkgZm9yICh2YXIgXyA9IHg7IF8gPCAoZy5pc1JUTCA/IGUuYmVnaW4gOiBlLmVuZCk7IF8rKykgdm9pZCAwICE9PSBiLmV4Y2x1ZGVzW19dICYmIChiLmV4Y2x1ZGVzW19dID0gdm9pZCAwLCBcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGIudGVzdHNbX10pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09IHR5cGVvZiB5LnByZVZhbGlkYXRpb24gJiYgITAgIT09IGEgJiYgITAgIT09IHMgJiYgKFMgPSBQKFMgPSB5LnByZVZhbGlkYXRpb24uY2FsbChnLCBvLmdldEJ1ZmZlci5jYWxsKGcpLCB4LCB0LCBmLmNhbGwoZywgZSksIHksIGIsIGUsIGkgfHwgcikpKSwgXG4gICAgICAgICAgICAgICAgICAgICEwID09PSBTKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoUyA9IEUoeCwgdCwgaSksICghaSB8fCAhMCA9PT0gYSkgJiYgITEgPT09IFMgJiYgITAgIT09IHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgTSA9IGIudmFsaWRQb3NpdGlvbnNbeF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFNIHx8ICEwICE9PSBNLm1hdGNoLnN0YXRpYyB8fCBNLm1hdGNoLmRlZiAhPT0gdCAmJiB0ICE9PSB5LnNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHkuaW5zZXJ0TW9kZSB8fCB2b2lkIDAgPT09IGIudmFsaWRQb3NpdGlvbnNbby5zZWVrTmV4dC5jYWxsKGcsIHgpXSB8fCBlLmVuZCA+IHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBPID0gITE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYi5qaXRPZmZzZXRbeF0gJiYgdm9pZCAwID09PSBiLnZhbGlkUG9zaXRpb25zW28uc2Vla05leHQuY2FsbChnLCB4KV0gJiYgITEgIT09IChTID0gZC5jYWxsKGcsIHggKyBiLmppdE9mZnNldFt4XSwgdCwgITAsICEwKSkgJiYgKCEwICE9PSByICYmIChTLmNhcmV0ID0geCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTyA9ICEwKSwgZS5lbmQgPiB4ICYmIChiLnZhbGlkUG9zaXRpb25zW3hdID0gdm9pZCAwKSwgIU8gJiYgIW8uaXNNYXNrLmNhbGwoZywgeCwgeS5rZWVwU3RhdGljICYmIDAgPT09IHgpKSBmb3IgKHZhciBUID0geCArIDEsIEEgPSBvLnNlZWtOZXh0LmNhbGwoZywgeCwgITEsIDAgIT09IHgpOyBUIDw9IEE7IFQrKykgaWYgKCExICE9PSAoUyA9IEUoVCwgdCwgaSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUyA9IG0uY2FsbChnLCB4LCB2b2lkIDAgIT09IFMucG9zID8gUy5wb3MgOiBUKSB8fCBTLCB4ID0gVDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBTID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldDogby5zZWVrTmV4dC5jYWxsKGcsIHgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICExICE9PSBTIHx8ICF5LmtlZXBTdGF0aWMgfHwgIWMuY2FsbChnLCBvLmdldEJ1ZmZlci5jYWxsKGcpKSAmJiAwICE9PSB4IHx8IGkgfHwgITAgPT09IHIgPyBmLmNhbGwoZywgZSkgJiYgYi50ZXN0c1t4XSAmJiBiLnRlc3RzW3hdLmxlbmd0aCA+IDEgJiYgeS5rZWVwU3RhdGljICYmICFpICYmICEwICE9PSByICYmIChTID0gbC5jYWxsKGcsICEwKSkgOiBTID0gbC5jYWxsKGcsIHgsIHQsIGksIGEsIHZvaWQgMCwgZSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgITAgPT09IFMgJiYgKFMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zOiB4XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09IHR5cGVvZiB5LnBvc3RWYWxpZGF0aW9uICYmICEwICE9PSBhICYmICEwICE9PSBzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgQyA9IHkucG9zdFZhbGlkYXRpb24uY2FsbChnLCBvLmdldEJ1ZmZlci5jYWxsKGcsICEwKSwgdm9pZCAwICE9PSBlLmJlZ2luID8gZy5pc1JUTCA/IGUuZW5kIDogZS5iZWdpbiA6IGUsIHQsIFMsIHksIGIsIGksIHApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdm9pZCAwICE9PSBDICYmIChTID0gITAgPT09IEMgPyBTIDogQyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgUyAmJiB2b2lkIDAgPT09IFMucG9zICYmIChTLnBvcyA9IHgpLCAhMSA9PT0gUyB8fCAhMCA9PT0gcyA/IChvLnJlc2V0TWFza1NldC5jYWxsKGcsICEwKSwgXG4gICAgICAgICAgICAgICAgICAgIGIudmFsaWRQb3NpdGlvbnMgPSBrLmV4dGVuZCghMCwge30sIHcpKSA6IG0uY2FsbChnLCB2b2lkIDAsIHgsICEwKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIEQgPSBQKFMpO1xuICAgICAgICAgICAgICAgICAgICB2b2lkIDAgIT09IGcubWF4TGVuZ3RoICYmIChvLmdldEJ1ZmZlci5jYWxsKGcpLmxlbmd0aCA+IGcubWF4TGVuZ3RoICYmICFhICYmIChvLnJlc2V0TWFza1NldC5jYWxsKGcsICEwKSwgXG4gICAgICAgICAgICAgICAgICAgIGIudmFsaWRQb3NpdGlvbnMgPSBrLmV4dGVuZCghMCwge30sIHcpLCBEID0gITEpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHAoZSwgdCwgaSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBhID0gdGhpcy5tYXNrc2V0LCByID0gITEsIG8gPSBuLmdldFRlc3RzLmNhbGwodGhpcywgZSksIHMgPSAwOyBzIDwgby5sZW5ndGg7IHMrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9bc10ubWF0Y2ggJiYgKG9bc10ubWF0Y2gubmF0aXZlRGVmID09PSB0Lm1hdGNoW2kuc2hpZnRQb3NpdGlvbnMgPyBcImRlZlwiIDogXCJuYXRpdmVEZWZcIl0gJiYgKCFpLnNoaWZ0UG9zaXRpb25zIHx8ICF0Lm1hdGNoLnN0YXRpYykgfHwgb1tzXS5tYXRjaC5uYXRpdmVEZWYgPT09IHQubWF0Y2gubmF0aXZlRGVmIHx8IGkucmVnZXggJiYgIW9bc10ubWF0Y2guc3RhdGljICYmIG9bc10ubWF0Y2guZm4udGVzdCh0LmlucHV0KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByID0gITA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob1tzXS5tYXRjaCAmJiBvW3NdLm1hdGNoLmRlZiA9PT0gdC5tYXRjaC5uYXRpdmVEZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhMSA9PT0gciAmJiB2b2lkIDAgIT09IGEuaml0T2Zmc2V0W2VdICYmIChyID0gcC5jYWxsKHRoaXMsIGUgKyBhLmppdE9mZnNldFtlXSwgdCwgaSkpLCBcbiAgICAgICAgICAgICAgICAgICAgcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaChlLCB0LCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhLCBuLCByID0gdGhpcywgbCA9IHRoaXMubWFza3NldCwgdSA9IHRoaXMub3B0cywgYyA9IHRoaXMuZGVwZW5kZW5jeUxpYiwgZiA9IHUuc2tpcE9wdGlvbmFsUGFydENoYXJhY3RlciwgZCA9IHIuaXNSVEwgPyBpLnNsaWNlKCkucmV2ZXJzZSgpIDogaTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHUuc2tpcE9wdGlvbmFsUGFydENoYXJhY3RlciA9IFwiXCIsICEwID09PSBlKSBvLnJlc2V0TWFza1NldC5jYWxsKHIpLCBsLnRlc3RzID0ge30sIFxuICAgICAgICAgICAgICAgICAgICBlID0gMCwgdCA9IGkubGVuZ3RoLCBuID0gby5kZXRlcm1pbmVOZXdDYXJldFBvc2l0aW9uLmNhbGwociwge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVnaW46IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IDBcbiAgICAgICAgICAgICAgICAgICAgfSwgITEpLmJlZ2luOyBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoYSA9IGU7IGEgPCB0OyBhKyspIGRlbGV0ZSBsLnZhbGlkUG9zaXRpb25zW2FdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbiA9IGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSBuZXcgYy5FdmVudChcImtleXByZXNzXCIpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGEgPSBlOyBhIDwgdDsgYSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwLmtleUNvZGUgPSBkW2FdLnRvU3RyaW5nKCkuY2hhckNvZGVBdCgwKSwgci5pZ25vcmFibGUgPSAhMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoID0gcy5FdmVudEhhbmRsZXJzLmtleXByZXNzRXZlbnQuY2FsbChyLCBwLCAhMCwgITEsICExLCBuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICExICE9PSBoICYmIHZvaWQgMCAhPT0gaCAmJiAobiA9IGguZm9yd2FyZFBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB1LnNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXIgPSBmO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBtKGUsIHQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGEgPSB0aGlzLCByID0gdGhpcy5tYXNrc2V0LCBzID0gdGhpcy5kZXBlbmRlbmN5TGliO1xuICAgICAgICAgICAgICAgICAgICBpZiAodm9pZCAwID09PSBlKSBmb3IgKGUgPSB0IC0gMTsgZSA+IDAgJiYgIXIudmFsaWRQb3NpdGlvbnNbZV07IGUtLSkgO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBsID0gZTsgbCA8IHQ7IGwrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZvaWQgMCA9PT0gci52YWxpZFBvc2l0aW9uc1tsXSAmJiAhby5pc01hc2suY2FsbChhLCBsLCAhMSkpIGlmICgwID09IGwgPyBuLmdldFRlc3QuY2FsbChhLCBsKSA6IHIudmFsaWRQb3NpdGlvbnNbbCAtIDFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHUgPSBuLmdldFRlc3RzLmNhbGwoYSwgbCkuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwiID09PSB1W3UubGVuZ3RoIC0gMV0ubWF0Y2guZGVmICYmIHUucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGMsIGYgPSBuLmRldGVybWluZVRlc3RUZW1wbGF0ZS5jYWxsKGEsIGwsIHUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmICYmICghMCAhPT0gZi5tYXRjaC5qaXQgfHwgXCJtYXN0ZXJcIiA9PT0gZi5tYXRjaC5uZXdCbG9ja01hcmtlciAmJiAoYyA9IHIudmFsaWRQb3NpdGlvbnNbbCArIDFdKSAmJiAhMCA9PT0gYy5tYXRjaC5vcHRpb25hbFF1YW50aWZpZXIpICYmICgoZiA9IHMuZXh0ZW5kKHt9LCBmLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiBuLmdldFBsYWNlaG9sZGVyLmNhbGwoYSwgbCwgZi5tYXRjaCwgITApIHx8IGYubWF0Y2guZGVmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpLmdlbmVyYXRlZElucHV0ID0gITAsIHYuY2FsbChhLCBsLCBmLCAhMCksICEwICE9PSBpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IHIudmFsaWRQb3NpdGlvbnNbdF0uaW5wdXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByLnZhbGlkUG9zaXRpb25zW3RdID0gdm9pZCAwLCBkLmNhbGwoYSwgdCwgcCwgITAsICEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdihlLCB0LCBpLCBhKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByID0gdGhpcywgcyA9IHRoaXMubWFza3NldCwgbCA9IHRoaXMub3B0cywgdSA9IHRoaXMuZGVwZW5kZW5jeUxpYjtcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gYyhlLCB0LCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYSA9IHRbZV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodm9pZCAwICE9PSBhICYmICEwID09PSBhLm1hdGNoLnN0YXRpYyAmJiAhMCAhPT0gYS5tYXRjaC5vcHRpb25hbGl0eSAmJiAodm9pZCAwID09PSB0WzBdIHx8IHZvaWQgMCA9PT0gdFswXS5hbHRlcm5hdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbiA9IGkuYmVnaW4gPD0gZSAtIDEgPyB0W2UgLSAxXSAmJiAhMCA9PT0gdFtlIC0gMV0ubWF0Y2guc3RhdGljICYmIHRbZSAtIDFdIDogdFtlIC0gMV0sIHIgPSBpLmVuZCA+IGUgKyAxID8gdFtlICsgMV0gJiYgITAgPT09IHRbZSArIDFdLm1hdGNoLnN0YXRpYyAmJiB0W2UgKyAxXSA6IHRbZSArIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuICYmIHI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gITE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIGYgPSAwLCBoID0gdm9pZCAwICE9PSBlLmJlZ2luID8gZS5iZWdpbiA6IGUsIG0gPSB2b2lkIDAgIT09IGUuZW5kID8gZS5lbmQgOiBlLCB2ID0gITA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmJlZ2luID4gZS5lbmQgJiYgKGggPSBlLmVuZCwgbSA9IGUuYmVnaW4pLCBhID0gdm9pZCAwICE9PSBhID8gYSA6IGgsIGggIT09IG0gfHwgbC5pbnNlcnRNb2RlICYmIHZvaWQgMCAhPT0gcy52YWxpZFBvc2l0aW9uc1thXSAmJiB2b2lkIDAgPT09IGkgfHwgdm9pZCAwID09PSB0IHx8IHQubWF0Y2gub3B0aW9uYWxRdWFudGlmaWVyIHx8IHQubWF0Y2gub3B0aW9uYWxpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnLCBrID0gdS5leHRlbmQoITAsIHt9LCBzLnZhbGlkUG9zaXRpb25zKSwgeSA9IG8uZ2V0TGFzdFZhbGlkUG9zaXRpb24uY2FsbChyLCB2b2lkIDAsICEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAocy5wID0gaCwgZyA9IHk7IGcgPj0gaDsgZy0tKSBkZWxldGUgcy52YWxpZFBvc2l0aW9uc1tnXSwgdm9pZCAwID09PSB0ICYmIGRlbGV0ZSBzLnRlc3RzW2cgKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiLCB4LCBQID0gYSwgRSA9IFA7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHQgJiYgKHMudmFsaWRQb3NpdGlvbnNbYV0gPSB1LmV4dGVuZCghMCwge30sIHQpLCBFKyssIFArKyksIGcgPSB0ID8gbSA6IG0gLSAxOyBnIDw9IHk7IGcrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2b2lkIDAgIT09IChiID0ga1tnXSkgJiYgITAgIT09IGIuZ2VuZXJhdGVkSW5wdXQgJiYgKGcgPj0gbSB8fCBnID49IGggJiYgYyhnLCBrLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luOiBoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IG1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICg7XCJcIiAhPT0gbi5nZXRUZXN0LmNhbGwociwgRSkubWF0Y2guZGVmOyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghMSAhPT0gKHggPSBwLmNhbGwociwgRSwgYiwgbCkpIHx8IFwiK1wiID09PSBiLm1hdGNoLmRlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiK1wiID09PSBiLm1hdGNoLmRlZiAmJiBvLmdldEJ1ZmZlci5jYWxsKHIsICEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgUyA9IGQuY2FsbChyLCBFLCBiLmlucHV0LCBcIitcIiAhPT0gYi5tYXRjaC5kZWYsICEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodiA9ICExICE9PSBTLCBQID0gKFMucG9zIHx8IEUpICsgMSwgIXYgJiYgeCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgdiA9ICExO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2lkIDAgPT09IHQgJiYgYi5tYXRjaC5zdGF0aWMgJiYgZyA9PT0gZS5iZWdpbiAmJiBmKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXYgJiYgby5nZXRCdWZmZXIuY2FsbChyKSwgRSA+IHMubWFza0xlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIiA9PSBuLmdldFRlc3QuY2FsbChyLCBFKS5tYXRjaC5kZWYgJiYgKHYgPSAhMSksIEUgPSBQO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXYpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2KSByZXR1cm4gcy52YWxpZFBvc2l0aW9ucyA9IHUuZXh0ZW5kKCEwLCB7fSwgayksIG8ucmVzZXRNYXNrU2V0LmNhbGwociwgITApLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICExO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgdCAmJiBuLmdldFRlc3QuY2FsbChyLCBhKS5tYXRjaC5jZCA9PT0gdC5tYXRjaC5jZCAmJiAocy52YWxpZFBvc2l0aW9uc1thXSA9IHUuZXh0ZW5kKCEwLCB7fSwgdCkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gby5yZXNldE1hc2tTZXQuY2FsbChyLCAhMCksIGY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDIwNDc6IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICB0LmV4cG9ydHMgPSBlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDU1ODE6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLmV4cG9ydHMgPSBKU09OLnBhcnNlKCd7XCJCQUNLU1BBQ0VcIjo4LFwiQkFDS1NQQUNFX1NBRkFSSVwiOjEyNyxcIkRFTEVURVwiOjQ2LFwiRE9XTlwiOjQwLFwiRU5EXCI6MzUsXCJFTlRFUlwiOjEzLFwiRVNDQVBFXCI6MjcsXCJIT01FXCI6MzYsXCJJTlNFUlRcIjo0NSxcIkxFRlRcIjozNyxcIlBBR0VfRE9XTlwiOjM0LFwiUEFHRV9VUFwiOjMzLFwiUklHSFRcIjozOSxcIlNQQUNFXCI6MzIsXCJUQUJcIjo5LFwiVVBcIjozOCxcIlhcIjo4OCxcIlpcIjo5MCxcIkNPTlRST0xcIjoxNyxcIlBBVVNFL0JSRUFLXCI6MTksXCJXSU5ET1dTX0xFRlRcIjo5MSxcIldJTkRPV1NfUklHSFRcIjo5MixcIktFWV8yMjlcIjoyMjl9Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGkgPSB7fTtcbiAgICAgICAgZnVuY3Rpb24gYShlKSB7XG4gICAgICAgICAgICB2YXIgbiA9IGlbZV07XG4gICAgICAgICAgICBpZiAodm9pZCAwICE9PSBuKSByZXR1cm4gbi5leHBvcnRzO1xuICAgICAgICAgICAgdmFyIHIgPSBpW2VdID0ge1xuICAgICAgICAgICAgICAgIGV4cG9ydHM6IHt9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIHRbZV0ociwgci5leHBvcnRzLCBhKSwgci5leHBvcnRzO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuID0ge307XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBlID0gbjtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgICAgICAgICAgICAgIHZhbHVlOiAhMFxuICAgICAgICAgICAgfSksIGUuZGVmYXVsdCA9IHZvaWQgMDtcbiAgICAgICAgICAgIHZhciB0LCBpID0gKHQgPSBhKDMwNDYpKSAmJiB0Ll9fZXNNb2R1bGUgPyB0IDoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBhKDQ0Myk7XG4gICAgICAgICAgICB2YXIgciA9IGkuZGVmYXVsdDtcbiAgICAgICAgICAgIGUuZGVmYXVsdCA9IHI7XG4gICAgICAgIH0oKSwgbjtcbiAgICB9KCk7XG59KSk7Il0sImZpbGUiOiJpbnB1dG1hc2suanMifQ==
