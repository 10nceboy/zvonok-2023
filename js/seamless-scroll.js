!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).seamless = {})
}(this, (function (e) {
    "use strict";
    /*! *****************************************************************************
        Copyright (c) Microsoft Corporation.

        Permission to use, copy, modify, and/or distribute this software for any
        purpose with or without fee is hereby granted.

        THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
        REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
        AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
        INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
        LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
        OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
        PERFORMANCE OF THIS SOFTWARE.
        ***************************************************************************** */
    var t = function () {
        return t = Object.assign || function (e) {
            for (var t, n = 1, o = arguments.length; n < o; n++) for (var r in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e
        }, t.apply(this, arguments)
    };

    function n(e, t) {
        var n = "function" == typeof Symbol && e[Symbol.iterator];
        if (!n) return e;
        var o, r, l = n.call(e), i = [];
        try {
            for (; (void 0 === t || t-- > 0) && !(o = l.next()).done;) i.push(o.value)
        } catch (e) {
            r = {error: e}
        } finally {
            try {
                o && !o.done && (n = l.return) && n.call(l)
            } finally {
                if (r) throw r.error
            }
        }
        return i
    }

    var o = function (e) {
        return void 0 === e || "auto" === e || "instant" === e || "smooth" === e
    };

    function r(e, t) {
        this.scrollLeft = e, this.scrollTop = t
    }

    var l = function (e, t, n) {
            return void 0 === n && (n = "cannot convert to dictionary."), "Failed to execute '" + e + "' on '" + t + "': " + n
        }, i = function (e, t, n) {
            return l(e, t, "The provided value '" + n + "' is not a valid enum value of type ScrollBehavior.")
        }, c = function (e, t, n) {
            var o, r = "__SEAMLESS.BACKUP$" + t;
            return e[r] || !e[t] || (null === (o = e[t]) || void 0 === o ? void 0 : o.__isPolyfill) || (e[r] = e[t]), e[r] || n
        }, u = function (e) {
            var t = typeof e;
            return null !== e && ("object" === t || "function" === t)
        }, a = function () {
            return "scrollBehavior" in window.document.documentElement.style
        }, f = function (e) {
            Object.defineProperty(e, "__isPolyfill", {value: !0})
        }, s = function (e, t) {
            f(t), [HTMLElement.prototype, SVGElement.prototype, Element.prototype].forEach((function (n) {
                c(n, e), n[e] = t
            }))
        }, d = function (e) {
            return e.ownerDocument.scrollingElement || e.ownerDocument.documentElement
        }, v = function (e) {
            return .5 * (1 - Math.cos(Math.PI * e))
        }, w = function () {
            var e, t, n;
            return null !== (n = null === (t = null === (e = window.performance) || void 0 === e ? void 0 : e.now) || void 0 === t ? void 0 : t.call(e)) && void 0 !== n ? n : window.Date.now()
        }, m = function (e) {
            var t = (w() - e.timeStamp) / (e.duration || 500);
            if (t > 1) return e.method(e.targetX, e.targetY), void e.callback();
            var n = (e.timingFunc || v)(t), o = e.startX + (e.targetX - e.startX) * n,
                r = e.startY + (e.targetY - e.startY) * n;
            e.method(o, r), e.rafId = window.requestAnimationFrame((function () {
                m(e)
            }))
        }, h = function (e) {
            return isFinite(e) ? Number(e) : 0
        }, p = function (e) {
            return function (a, f, s) {
                var v, p = n((v = a).window === v ? [d(a.document.documentElement), "Window"] : [a, "Element"], 2),
                    y = p[0], g = p[1], b = null != f ? f : {};
                if (!u(b)) throw new TypeError(l(e, g));
                if (!o(b.behavior)) throw new TypeError(i(e, g, b.behavior));
                "scrollBy" === e && (b.left = h(b.left) + y.scrollLeft, b.top = h(b.top) + y.scrollTop), function (e, n, o) {
                    var l, i;
                    if (function (e) {
                        var t;
                        return null !== (t = e.isConnected) && void 0 !== t ? t : !(e.ownerDocument && 1 & e.ownerDocument.compareDocumentPosition(e))
                    }(e)) {
                        var u = e.scrollLeft, a = e.scrollTop, f = h(null !== (l = n.left) && void 0 !== l ? l : u),
                            s = h(null !== (i = n.top) && void 0 !== i ? i : a);
                        if (f !== u || s !== a) {
                            var d = c(HTMLElement.prototype, "scroll", r),
                                v = c(Object.getPrototypeOf(e), "scroll", d).bind(e);
                            if ("smooth" === n.behavior) {
                                var p = function () {
                                    window.removeEventListener("wheel", g), window.removeEventListener("touchmove", g)
                                }, y = t(t({}, o), {
                                    timeStamp: w(),
                                    startX: u,
                                    startY: a,
                                    targetX: f,
                                    targetY: s,
                                    rafId: 0,
                                    method: v,
                                    callback: p
                                }), g = function () {
                                    window.cancelAnimationFrame(y.rafId), p()
                                };
                                window.addEventListener("wheel", g, {
                                    passive: !0,
                                    once: !0
                                }), window.addEventListener("touchmove", g, {passive: !0, once: !0}), m(y)
                            } else v(f, s)
                        }
                    }
                }(y, b, s)
            }
        }, y = p("scroll"), g = p("scrollTo"), b = p("scrollBy"), T = y, E = g, S = b, P = y, L = g, B = b,
        V = function (e) {
            switch (e) {
                case"horizontal-tb":
                case"lr":
                case"lr-tb":
                case"rl":
                case"rl-tb":
                    return 0;
                case"vertical-rl":
                case"tb":
                case"tb-rl":
                    return 1;
                case"vertical-lr":
                case"tb-lr":
                    return 2;
                case"sideways-rl":
                    return 3;
                case"sideways-lr":
                    return 4
            }
            return 0
        }, M = function (e, t, o, r) {
            var l, i = 0;
            switch (t || (i ^= 2), e) {
                case 0:
                    i = i >> 1 | (1 & i) << 1, o = (l = n([r, o], 2))[0], r = l[1];
                    break;
                case 1:
                case 3:
                    i ^= 1;
                    break;
                case 4:
                    i ^= 2
            }
            return [i, o, r]
        }, D = function (e) {
            return 1 == (1 & M(V(e.writingMode), "rtl" !== e.direction, void 0, void 0)[0])
        }, I = function (e, t, n, o, r, l, i) {
            return 0 !== e ? e : r < t && l > n || r > t && l < n ? null : r <= t && i <= o || l >= n && i >= o ? 2 : l > n && i < o || r < t && i > o ? 3 : null
        }, W = function (e) {
            return "visible" !== e && "clip" !== e
        }, H = function (e, t) {
            return (e.clientHeight < e.scrollHeight || e.clientWidth < e.scrollWidth) && (W(t.overflowY) || W(t.overflowX) || e === d(e))
        }, k = function (e) {
            var t = e.parentNode, n = e.parentElement;
            if (null === n && null !== t) {
                if (11 === t.nodeType) return t.host;
                if (9 === t.nodeType) return function (e) {
                    var t;
                    try {
                        return (null === (t = e.ownerDocument.defaultView) || void 0 === t ? void 0 : t.frameElement) || null
                    } catch (e) {
                        return null
                    }
                }(e)
            }
            return n
        }, x = function (e, t, n) {
            return e < t ? t : e > n ? n : e
        }, _ = function (e, t, n) {
            switch (e) {
                case 1:
                    return (t + n) / 2;
                case 3:
                    return n;
                case 2:
                case 0:
                    return t
            }
        }, j = function (e, t) {
            var o, r, l, i = null === (o = e.ownerDocument.defaultView) || void 0 === o ? void 0 : o.visualViewport,
                c = n(e === d(e) ? [0, 0, null !== (r = null == i ? void 0 : i.width) && void 0 !== r ? r : e.clientWidth, null !== (l = null == i ? void 0 : i.height) && void 0 !== l ? l : e.clientHeight] : [t.left, t.top, e.clientWidth, e.clientHeight], 4),
                u = c[0], a = c[1], f = c[2], s = c[3], v = u + e.clientLeft, w = a + e.clientTop;
            return [w, v + f, w + s, v]
        }, C = function (e, t) {
            var o = [], r = e.ownerDocument, l = r.defaultView;
            if (!l) return o;
            for (var i = window.getComputedStyle(e), c = "rtl" !== i.direction, u = n(function (e, t, o) {
                var r = n(M(t, o, e.block || "start", e.inline || "nearest"), 3), l = r[0];
                return [r[1], r[2]].map((function (e, t) {
                    switch (e) {
                        case"center":
                            return 1;
                        case"nearest":
                            return 0;
                        default:
                            return "start" === e == !(l >> t & 1) ? 2 : 3
                    }
                }))
            }(t, V(i.writingMode || i.getPropertyValue("-webkit-writing-mode") || i.getPropertyValue("-ms-writing-mode")), c), 2), a = u[0], f = u[1], s = n(function (e, t, n) {
                var o, r = t.top, l = t.right, i = t.bottom, c = t.left,
                    u = (o = e.ownerDocument, ["scroll-margin", "scroll-snap-margin"].filter((function (e) {
                        return e in o.documentElement.style
                    }))[0]);
                if (!u) return [r, l, i, c];
                var a = function (e) {
                    var t = n.getPropertyValue(u + "-" + e);
                    return parseInt(t, 10) || 0
                };
                return [r - a("top"), l + a("right"), i + a("bottom"), c - a("left")]
            }(e, e.getBoundingClientRect(), i), 4), d = s[0], v = s[1], w = s[2], m = s[3], h = k(e); null !== h; h = k(h)) {
                if (r !== h.ownerDocument) {
                    if (!(l = (r = h.ownerDocument).defaultView)) break;
                    var p = h.getBoundingClientRect(), y = p.left, g = p.top;
                    d += g, v += y, w += g, m += y
                }
                var b = l.getComputedStyle(h);
                if ("fixed" === b.position) break;
                if (H(h, b)) {
                    var T = h.getBoundingClientRect(), E = n(j(h, T), 4), S = E[0], P = E[1], L = E[2], B = E[3],
                        W = I(a, B, P, h.clientWidth, m, v, v - m), C = I(f, S, L, h.clientHeight, d, w, w - d),
                        O = null === W ? 0 : _(W, m, v) - _(W, B, P), X = null === C ? 0 : _(C, d, w) - _(C, S, L),
                        Y = D(b) ? x(O, -h.scrollWidth + h.clientWidth - h.scrollLeft, -h.scrollLeft) : x(O, -h.scrollLeft, h.scrollWidth - h.clientWidth - h.scrollLeft),
                        F = x(X, -h.scrollTop, h.scrollHeight - h.clientHeight - h.scrollTop);
                    o.push([h, {
                        left: h.scrollLeft + Y,
                        top: h.scrollTop + F,
                        behavior: t.behavior
                    }]), d = Math.max(d - F, S), v = Math.min(v - Y, P), w = Math.min(w - F, L), m = Math.max(m - Y, B)
                }
            }
            return o
        }, O = function (e, t, r) {
            var l = t || {};
            if (!o(l.behavior)) throw new TypeError(i("scrollIntoView", "Element", l.behavior));
            C(e, l).forEach((function (e) {
                var t = n(e, 2), o = t[0], l = t[1];
                T(o, l, r)
            }))
        }, X = O, Y = function (e, t) {
            return function (n) {
                if (!a()) {
                    var o = {scroll: y, scrollTo: g, scrollBy: b}[e];
                    t(e, (function () {
                        var e = arguments;
                        if (1 !== arguments.length) {
                            var t = e[0], r = e[1];
                            o(this, {left: t, top: r})
                        } else o(this, e[0], n)
                    }))
                }
            }
        }, F = Y("scroll", s), A = Y("scrollTo", s), R = Y("scrollBy", s), N = function (e, t) {
            f(t), c(window, e), window[e] = t
        }, q = Y("scroll", N), z = Y("scrollTo", N), G = Y("scrollBy", N);

    function K(e) {
        X(this, {block: null == e || e ? "start" : "end", inline: "nearest"})
    }

    var U = function (e) {
        if (!a()) {
            var t = c(window.HTMLElement.prototype, "scrollIntoView", K);
            s("scrollIntoView", (function () {
                var n = arguments, o = n[0];
                1 === n.length && u(o) ? X(this, o, e) : t.apply(this, n)
            }))
        }
    };
    e.elementScroll = T, e.elementScrollBy = S, e.elementScrollByPolyfill = R, e.elementScrollIntoView = X, e.elementScrollIntoViewPolyfill = U, e.elementScrollPolyfill = F, e.elementScrollTo = E, e.elementScrollToPolyfill = A, e.modifyWindow = N, e.polyfill = function (e) {
        a() || (F(e), A(e), R(e), U(e), q(e), z(e), G(e))
    }, e.scroll = y, e.scrollBy = b, e.scrollIntoView = O, e.scrollTo = g, e.windowScroll = P, e.windowScrollBy = B, e.windowScrollByPolyfill = G, e.windowScrollPolyfill = q, e.windowScrollTo = L, e.windowScrollToPolyfill = z, Object.defineProperty(e, "__esModule", {value: !0})
}));
//# sourceMappingURL=bundle.min.js.map
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzZWFtbGVzcy1zY3JvbGwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIWZ1bmN0aW9uIChlLCB0KSB7XG4gICAgXCJvYmplY3RcIiA9PSB0eXBlb2YgZXhwb3J0cyAmJiBcInVuZGVmaW5lZFwiICE9IHR5cGVvZiBtb2R1bGUgPyB0KGV4cG9ydHMpIDogXCJmdW5jdGlvblwiID09IHR5cGVvZiBkZWZpbmUgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbXCJleHBvcnRzXCJdLCB0KSA6IHQoKGUgPSBcInVuZGVmaW5lZFwiICE9IHR5cGVvZiBnbG9iYWxUaGlzID8gZ2xvYmFsVGhpcyA6IGUgfHwgc2VsZikuc2VhbWxlc3MgPSB7fSlcbn0odGhpcywgKGZ1bmN0aW9uIChlKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxuXG4gICAgICAgIFBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxuICAgICAgICBwdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXG5cbiAgICAgICAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxuICAgICAgICBSRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcbiAgICAgICAgQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxuICAgICAgICBJTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cbiAgICAgICAgTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcbiAgICAgICAgT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxuICAgICAgICBQRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuICAgIHZhciB0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdCA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGZvciAodmFyIHQsIG4gPSAxLCBvID0gYXJndW1lbnRzLmxlbmd0aDsgbiA8IG87IG4rKykgZm9yICh2YXIgciBpbiB0ID0gYXJndW1lbnRzW25dKSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCwgcikgJiYgKGVbcl0gPSB0W3JdKTtcbiAgICAgICAgICAgIHJldHVybiBlXG4gICAgICAgIH0sIHQuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBuKGUsIHQpIHtcbiAgICAgICAgdmFyIG4gPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBlW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgICAgIGlmICghbikgcmV0dXJuIGU7XG4gICAgICAgIHZhciBvLCByLCBsID0gbi5jYWxsKGUpLCBpID0gW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKDsgKHZvaWQgMCA9PT0gdCB8fCB0LS0gPiAwKSAmJiAhKG8gPSBsLm5leHQoKSkuZG9uZTspIGkucHVzaChvLnZhbHVlKVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByID0ge2Vycm9yOiBlfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBvICYmICFvLmRvbmUgJiYgKG4gPSBsLnJldHVybikgJiYgbi5jYWxsKGwpXG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIGlmIChyKSB0aHJvdyByLmVycm9yXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlcbiAgICB9XG5cbiAgICB2YXIgbyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJldHVybiB2b2lkIDAgPT09IGUgfHwgXCJhdXRvXCIgPT09IGUgfHwgXCJpbnN0YW50XCIgPT09IGUgfHwgXCJzbW9vdGhcIiA9PT0gZVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiByKGUsIHQpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxMZWZ0ID0gZSwgdGhpcy5zY3JvbGxUb3AgPSB0XG4gICAgfVxuXG4gICAgdmFyIGwgPSBmdW5jdGlvbiAoZSwgdCwgbikge1xuICAgICAgICAgICAgcmV0dXJuIHZvaWQgMCA9PT0gbiAmJiAobiA9IFwiY2Fubm90IGNvbnZlcnQgdG8gZGljdGlvbmFyeS5cIiksIFwiRmFpbGVkIHRvIGV4ZWN1dGUgJ1wiICsgZSArIFwiJyBvbiAnXCIgKyB0ICsgXCInOiBcIiArIG5cbiAgICAgICAgfSwgaSA9IGZ1bmN0aW9uIChlLCB0LCBuKSB7XG4gICAgICAgICAgICByZXR1cm4gbChlLCB0LCBcIlRoZSBwcm92aWRlZCB2YWx1ZSAnXCIgKyBuICsgXCInIGlzIG5vdCBhIHZhbGlkIGVudW0gdmFsdWUgb2YgdHlwZSBTY3JvbGxCZWhhdmlvci5cIilcbiAgICAgICAgfSwgYyA9IGZ1bmN0aW9uIChlLCB0LCBuKSB7XG4gICAgICAgICAgICB2YXIgbywgciA9IFwiX19TRUFNTEVTUy5CQUNLVVAkXCIgKyB0O1xuICAgICAgICAgICAgcmV0dXJuIGVbcl0gfHwgIWVbdF0gfHwgKG51bGwgPT09IChvID0gZVt0XSkgfHwgdm9pZCAwID09PSBvID8gdm9pZCAwIDogby5fX2lzUG9seWZpbGwpIHx8IChlW3JdID0gZVt0XSksIGVbcl0gfHwgblxuICAgICAgICB9LCB1ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciB0ID0gdHlwZW9mIGU7XG4gICAgICAgICAgICByZXR1cm4gbnVsbCAhPT0gZSAmJiAoXCJvYmplY3RcIiA9PT0gdCB8fCBcImZ1bmN0aW9uXCIgPT09IHQpXG4gICAgICAgIH0sIGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJzY3JvbGxCZWhhdmlvclwiIGluIHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGVcbiAgICAgICAgfSwgZiA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgXCJfX2lzUG9seWZpbGxcIiwge3ZhbHVlOiAhMH0pXG4gICAgICAgIH0sIHMgPSBmdW5jdGlvbiAoZSwgdCkge1xuICAgICAgICAgICAgZih0KSwgW0hUTUxFbGVtZW50LnByb3RvdHlwZSwgU1ZHRWxlbWVudC5wcm90b3R5cGUsIEVsZW1lbnQucHJvdG90eXBlXS5mb3JFYWNoKChmdW5jdGlvbiAobikge1xuICAgICAgICAgICAgICAgIGMobiwgZSksIG5bZV0gPSB0XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgfSwgZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZS5vd25lckRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQgfHwgZS5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuICAgICAgICB9LCB2ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHJldHVybiAuNSAqICgxIC0gTWF0aC5jb3MoTWF0aC5QSSAqIGUpKVxuICAgICAgICB9LCB3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGUsIHQsIG47XG4gICAgICAgICAgICByZXR1cm4gbnVsbCAhPT0gKG4gPSBudWxsID09PSAodCA9IG51bGwgPT09IChlID0gd2luZG93LnBlcmZvcm1hbmNlKSB8fCB2b2lkIDAgPT09IGUgPyB2b2lkIDAgOiBlLm5vdykgfHwgdm9pZCAwID09PSB0ID8gdm9pZCAwIDogdC5jYWxsKGUpKSAmJiB2b2lkIDAgIT09IG4gPyBuIDogd2luZG93LkRhdGUubm93KClcbiAgICAgICAgfSwgbSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgdCA9ICh3KCkgLSBlLnRpbWVTdGFtcCkgLyAoZS5kdXJhdGlvbiB8fCA1MDApO1xuICAgICAgICAgICAgaWYgKHQgPiAxKSByZXR1cm4gZS5tZXRob2QoZS50YXJnZXRYLCBlLnRhcmdldFkpLCB2b2lkIGUuY2FsbGJhY2soKTtcbiAgICAgICAgICAgIHZhciBuID0gKGUudGltaW5nRnVuYyB8fCB2KSh0KSwgbyA9IGUuc3RhcnRYICsgKGUudGFyZ2V0WCAtIGUuc3RhcnRYKSAqIG4sXG4gICAgICAgICAgICAgICAgciA9IGUuc3RhcnRZICsgKGUudGFyZ2V0WSAtIGUuc3RhcnRZKSAqIG47XG4gICAgICAgICAgICBlLm1ldGhvZChvLCByKSwgZS5yYWZJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBtKGUpXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgfSwgaCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNGaW5pdGUoZSkgPyBOdW1iZXIoZSkgOiAwXG4gICAgICAgIH0sIHAgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBmLCBzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHYsIHAgPSBuKCh2ID0gYSkud2luZG93ID09PSB2ID8gW2QoYS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLCBcIldpbmRvd1wiXSA6IFthLCBcIkVsZW1lbnRcIl0sIDIpLFxuICAgICAgICAgICAgICAgICAgICB5ID0gcFswXSwgZyA9IHBbMV0sIGIgPSBudWxsICE9IGYgPyBmIDoge307XG4gICAgICAgICAgICAgICAgaWYgKCF1KGIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKGwoZSwgZykpO1xuICAgICAgICAgICAgICAgIGlmICghbyhiLmJlaGF2aW9yKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihpKGUsIGcsIGIuYmVoYXZpb3IpKTtcbiAgICAgICAgICAgICAgICBcInNjcm9sbEJ5XCIgPT09IGUgJiYgKGIubGVmdCA9IGgoYi5sZWZ0KSArIHkuc2Nyb2xsTGVmdCwgYi50b3AgPSBoKGIudG9wKSArIHkuc2Nyb2xsVG9wKSwgZnVuY3Rpb24gKGUsIG4sIG8pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGwsIGk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbCAhPT0gKHQgPSBlLmlzQ29ubmVjdGVkKSAmJiB2b2lkIDAgIT09IHQgPyB0IDogIShlLm93bmVyRG9jdW1lbnQgJiYgMSAmIGUub3duZXJEb2N1bWVudC5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihlKSlcbiAgICAgICAgICAgICAgICAgICAgfShlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHUgPSBlLnNjcm9sbExlZnQsIGEgPSBlLnNjcm9sbFRvcCwgZiA9IGgobnVsbCAhPT0gKGwgPSBuLmxlZnQpICYmIHZvaWQgMCAhPT0gbCA/IGwgOiB1KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzID0gaChudWxsICE9PSAoaSA9IG4udG9wKSAmJiB2b2lkIDAgIT09IGkgPyBpIDogYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZiAhPT0gdSB8fCBzICE9PSBhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGQgPSBjKEhUTUxFbGVtZW50LnByb3RvdHlwZSwgXCJzY3JvbGxcIiwgciksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYgPSBjKE9iamVjdC5nZXRQcm90b3R5cGVPZihlKSwgXCJzY3JvbGxcIiwgZCkuYmluZChlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJzbW9vdGhcIiA9PT0gbi5iZWhhdmlvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgZyksIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHkgPSB0KHQoe30sIG8pLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lU3RhbXA6IHcoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WDogdSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WTogYSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFg6IGYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRZOiBzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFmSWQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IHYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSwgZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh5LnJhZklkKSwgcCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgZywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFzc2l2ZTogITAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmNlOiAhMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSwgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgZywge3Bhc3NpdmU6ICEwLCBvbmNlOiAhMH0pLCBtKHkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHYoZiwgcylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0oeSwgYiwgcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgeSA9IHAoXCJzY3JvbGxcIiksIGcgPSBwKFwic2Nyb2xsVG9cIiksIGIgPSBwKFwic2Nyb2xsQnlcIiksIFQgPSB5LCBFID0gZywgUyA9IGIsIFAgPSB5LCBMID0gZywgQiA9IGIsXG4gICAgICAgIFYgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgc3dpdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY2FzZVwiaG9yaXpvbnRhbC10YlwiOlxuICAgICAgICAgICAgICAgIGNhc2VcImxyXCI6XG4gICAgICAgICAgICAgICAgY2FzZVwibHItdGJcIjpcbiAgICAgICAgICAgICAgICBjYXNlXCJybFwiOlxuICAgICAgICAgICAgICAgIGNhc2VcInJsLXRiXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIGNhc2VcInZlcnRpY2FsLXJsXCI6XG4gICAgICAgICAgICAgICAgY2FzZVwidGJcIjpcbiAgICAgICAgICAgICAgICBjYXNlXCJ0Yi1ybFwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICBjYXNlXCJ2ZXJ0aWNhbC1sclwiOlxuICAgICAgICAgICAgICAgIGNhc2VcInRiLWxyXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICAgICAgICAgIGNhc2VcInNpZGV3YXlzLXJsXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAzO1xuICAgICAgICAgICAgICAgIGNhc2VcInNpZGV3YXlzLWxyXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gMFxuICAgICAgICB9LCBNID0gZnVuY3Rpb24gKGUsIHQsIG8sIHIpIHtcbiAgICAgICAgICAgIHZhciBsLCBpID0gMDtcbiAgICAgICAgICAgIHN3aXRjaCAodCB8fCAoaSBePSAyKSwgZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgaSA9IGkgPj4gMSB8ICgxICYgaSkgPDwgMSwgbyA9IChsID0gbihbciwgb10sIDIpKVswXSwgciA9IGxbMV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIGkgXj0gMTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICBpIF49IDJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbaSwgbywgcl1cbiAgICAgICAgfSwgRCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gMSA9PSAoMSAmIE0oVihlLndyaXRpbmdNb2RlKSwgXCJydGxcIiAhPT0gZS5kaXJlY3Rpb24sIHZvaWQgMCwgdm9pZCAwKVswXSlcbiAgICAgICAgfSwgSSA9IGZ1bmN0aW9uIChlLCB0LCBuLCBvLCByLCBsLCBpKSB7XG4gICAgICAgICAgICByZXR1cm4gMCAhPT0gZSA/IGUgOiByIDwgdCAmJiBsID4gbiB8fCByID4gdCAmJiBsIDwgbiA/IG51bGwgOiByIDw9IHQgJiYgaSA8PSBvIHx8IGwgPj0gbiAmJiBpID49IG8gPyAyIDogbCA+IG4gJiYgaSA8IG8gfHwgciA8IHQgJiYgaSA+IG8gPyAzIDogbnVsbFxuICAgICAgICB9LCBXID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBcInZpc2libGVcIiAhPT0gZSAmJiBcImNsaXBcIiAhPT0gZVxuICAgICAgICB9LCBIID0gZnVuY3Rpb24gKGUsIHQpIHtcbiAgICAgICAgICAgIHJldHVybiAoZS5jbGllbnRIZWlnaHQgPCBlLnNjcm9sbEhlaWdodCB8fCBlLmNsaWVudFdpZHRoIDwgZS5zY3JvbGxXaWR0aCkgJiYgKFcodC5vdmVyZmxvd1kpIHx8IFcodC5vdmVyZmxvd1gpIHx8IGUgPT09IGQoZSkpXG4gICAgICAgIH0sIGsgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIHQgPSBlLnBhcmVudE5vZGUsIG4gPSBlLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAobnVsbCA9PT0gbiAmJiBudWxsICE9PSB0KSB7XG4gICAgICAgICAgICAgICAgaWYgKDExID09PSB0Lm5vZGVUeXBlKSByZXR1cm4gdC5ob3N0O1xuICAgICAgICAgICAgICAgIGlmICg5ID09PSB0Lm5vZGVUeXBlKSByZXR1cm4gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHQ7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKG51bGwgPT09ICh0ID0gZS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3KSB8fCB2b2lkIDAgPT09IHQgPyB2b2lkIDAgOiB0LmZyYW1lRWxlbWVudCkgfHwgbnVsbFxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfShlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5cbiAgICAgICAgfSwgeCA9IGZ1bmN0aW9uIChlLCB0LCBuKSB7XG4gICAgICAgICAgICByZXR1cm4gZSA8IHQgPyB0IDogZSA+IG4gPyBuIDogZVxuICAgICAgICB9LCBfID0gZnVuY3Rpb24gKGUsIHQsIG4pIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0ICsgbikgLyAyO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG47XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgaiA9IGZ1bmN0aW9uIChlLCB0KSB7XG4gICAgICAgICAgICB2YXIgbywgciwgbCwgaSA9IG51bGwgPT09IChvID0gZS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3KSB8fCB2b2lkIDAgPT09IG8gPyB2b2lkIDAgOiBvLnZpc3VhbFZpZXdwb3J0LFxuICAgICAgICAgICAgICAgIGMgPSBuKGUgPT09IGQoZSkgPyBbMCwgMCwgbnVsbCAhPT0gKHIgPSBudWxsID09IGkgPyB2b2lkIDAgOiBpLndpZHRoKSAmJiB2b2lkIDAgIT09IHIgPyByIDogZS5jbGllbnRXaWR0aCwgbnVsbCAhPT0gKGwgPSBudWxsID09IGkgPyB2b2lkIDAgOiBpLmhlaWdodCkgJiYgdm9pZCAwICE9PSBsID8gbCA6IGUuY2xpZW50SGVpZ2h0XSA6IFt0LmxlZnQsIHQudG9wLCBlLmNsaWVudFdpZHRoLCBlLmNsaWVudEhlaWdodF0sIDQpLFxuICAgICAgICAgICAgICAgIHUgPSBjWzBdLCBhID0gY1sxXSwgZiA9IGNbMl0sIHMgPSBjWzNdLCB2ID0gdSArIGUuY2xpZW50TGVmdCwgdyA9IGEgKyBlLmNsaWVudFRvcDtcbiAgICAgICAgICAgIHJldHVybiBbdywgdiArIGYsIHcgKyBzLCB2XVxuICAgICAgICB9LCBDID0gZnVuY3Rpb24gKGUsIHQpIHtcbiAgICAgICAgICAgIHZhciBvID0gW10sIHIgPSBlLm93bmVyRG9jdW1lbnQsIGwgPSByLmRlZmF1bHRWaWV3O1xuICAgICAgICAgICAgaWYgKCFsKSByZXR1cm4gbztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlKSwgYyA9IFwicnRsXCIgIT09IGkuZGlyZWN0aW9uLCB1ID0gbihmdW5jdGlvbiAoZSwgdCwgbykge1xuICAgICAgICAgICAgICAgIHZhciByID0gbihNKHQsIG8sIGUuYmxvY2sgfHwgXCJzdGFydFwiLCBlLmlubGluZSB8fCBcIm5lYXJlc3RcIiksIDMpLCBsID0gclswXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gW3JbMV0sIHJbMl1dLm1hcCgoZnVuY3Rpb24gKGUsIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlXCJjZW50ZXJcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2VcIm5lYXJlc3RcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIiA9PT0gZSA9PSAhKGwgPj4gdCAmIDEpID8gMiA6IDNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgfSh0LCBWKGkud3JpdGluZ01vZGUgfHwgaS5nZXRQcm9wZXJ0eVZhbHVlKFwiLXdlYmtpdC13cml0aW5nLW1vZGVcIikgfHwgaS5nZXRQcm9wZXJ0eVZhbHVlKFwiLW1zLXdyaXRpbmctbW9kZVwiKSksIGMpLCAyKSwgYSA9IHVbMF0sIGYgPSB1WzFdLCBzID0gbihmdW5jdGlvbiAoZSwgdCwgbikge1xuICAgICAgICAgICAgICAgIHZhciBvLCByID0gdC50b3AsIGwgPSB0LnJpZ2h0LCBpID0gdC5ib3R0b20sIGMgPSB0LmxlZnQsXG4gICAgICAgICAgICAgICAgICAgIHUgPSAobyA9IGUub3duZXJEb2N1bWVudCwgW1wic2Nyb2xsLW1hcmdpblwiLCBcInNjcm9sbC1zbmFwLW1hcmdpblwiXS5maWx0ZXIoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZSBpbiBvLmRvY3VtZW50RWxlbWVudC5zdHlsZVxuICAgICAgICAgICAgICAgICAgICB9KSlbMF0pO1xuICAgICAgICAgICAgICAgIGlmICghdSkgcmV0dXJuIFtyLCBsLCBpLCBjXTtcbiAgICAgICAgICAgICAgICB2YXIgYSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0gbi5nZXRQcm9wZXJ0eVZhbHVlKHUgKyBcIi1cIiArIGUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQodCwgMTApIHx8IDBcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBbciAtIGEoXCJ0b3BcIiksIGwgKyBhKFwicmlnaHRcIiksIGkgKyBhKFwiYm90dG9tXCIpLCBjIC0gYShcImxlZnRcIildXG4gICAgICAgICAgICB9KGUsIGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIGkpLCA0KSwgZCA9IHNbMF0sIHYgPSBzWzFdLCB3ID0gc1syXSwgbSA9IHNbM10sIGggPSBrKGUpOyBudWxsICE9PSBoOyBoID0gayhoKSkge1xuICAgICAgICAgICAgICAgIGlmIChyICE9PSBoLm93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEobCA9IChyID0gaC5vd25lckRvY3VtZW50KS5kZWZhdWx0VmlldykpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IGguZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIHkgPSBwLmxlZnQsIGcgPSBwLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgZCArPSBnLCB2ICs9IHksIHcgKz0gZywgbSArPSB5XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBiID0gbC5nZXRDb21wdXRlZFN0eWxlKGgpO1xuICAgICAgICAgICAgICAgIGlmIChcImZpeGVkXCIgPT09IGIucG9zaXRpb24pIGJyZWFrO1xuICAgICAgICAgICAgICAgIGlmIChIKGgsIGIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBUID0gaC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgRSA9IG4oaihoLCBUKSwgNCksIFMgPSBFWzBdLCBQID0gRVsxXSwgTCA9IEVbMl0sIEIgPSBFWzNdLFxuICAgICAgICAgICAgICAgICAgICAgICAgVyA9IEkoYSwgQiwgUCwgaC5jbGllbnRXaWR0aCwgbSwgdiwgdiAtIG0pLCBDID0gSShmLCBTLCBMLCBoLmNsaWVudEhlaWdodCwgZCwgdywgdyAtIGQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgTyA9IG51bGwgPT09IFcgPyAwIDogXyhXLCBtLCB2KSAtIF8oVywgQiwgUCksIFggPSBudWxsID09PSBDID8gMCA6IF8oQywgZCwgdykgLSBfKEMsIFMsIEwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgWSA9IEQoYikgPyB4KE8sIC1oLnNjcm9sbFdpZHRoICsgaC5jbGllbnRXaWR0aCAtIGguc2Nyb2xsTGVmdCwgLWguc2Nyb2xsTGVmdCkgOiB4KE8sIC1oLnNjcm9sbExlZnQsIGguc2Nyb2xsV2lkdGggLSBoLmNsaWVudFdpZHRoIC0gaC5zY3JvbGxMZWZ0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIEYgPSB4KFgsIC1oLnNjcm9sbFRvcCwgaC5zY3JvbGxIZWlnaHQgLSBoLmNsaWVudEhlaWdodCAtIGguc2Nyb2xsVG9wKTtcbiAgICAgICAgICAgICAgICAgICAgby5wdXNoKFtoLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBoLnNjcm9sbExlZnQgKyBZLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBoLnNjcm9sbFRvcCArIEYsXG4gICAgICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogdC5iZWhhdmlvclxuICAgICAgICAgICAgICAgICAgICB9XSksIGQgPSBNYXRoLm1heChkIC0gRiwgUyksIHYgPSBNYXRoLm1pbih2IC0gWSwgUCksIHcgPSBNYXRoLm1pbih3IC0gRiwgTCksIG0gPSBNYXRoLm1heChtIC0gWSwgQilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb1xuICAgICAgICB9LCBPID0gZnVuY3Rpb24gKGUsIHQsIHIpIHtcbiAgICAgICAgICAgIHZhciBsID0gdCB8fCB7fTtcbiAgICAgICAgICAgIGlmICghbyhsLmJlaGF2aW9yKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihpKFwic2Nyb2xsSW50b1ZpZXdcIiwgXCJFbGVtZW50XCIsIGwuYmVoYXZpb3IpKTtcbiAgICAgICAgICAgIEMoZSwgbCkuZm9yRWFjaCgoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdCA9IG4oZSwgMiksIG8gPSB0WzBdLCBsID0gdFsxXTtcbiAgICAgICAgICAgICAgICBUKG8sIGwsIHIpXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgfSwgWCA9IE8sIFkgPSBmdW5jdGlvbiAoZSwgdCkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFhKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG8gPSB7c2Nyb2xsOiB5LCBzY3JvbGxUbzogZywgc2Nyb2xsQnk6IGJ9W2VdO1xuICAgICAgICAgICAgICAgICAgICB0KGUsIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgxICE9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSBlWzBdLCByID0gZVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvKHRoaXMsIHtsZWZ0OiB0LCB0b3A6IHJ9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIG8odGhpcywgZVswXSwgbilcbiAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBGID0gWShcInNjcm9sbFwiLCBzKSwgQSA9IFkoXCJzY3JvbGxUb1wiLCBzKSwgUiA9IFkoXCJzY3JvbGxCeVwiLCBzKSwgTiA9IGZ1bmN0aW9uIChlLCB0KSB7XG4gICAgICAgICAgICBmKHQpLCBjKHdpbmRvdywgZSksIHdpbmRvd1tlXSA9IHRcbiAgICAgICAgfSwgcSA9IFkoXCJzY3JvbGxcIiwgTiksIHogPSBZKFwic2Nyb2xsVG9cIiwgTiksIEcgPSBZKFwic2Nyb2xsQnlcIiwgTik7XG5cbiAgICBmdW5jdGlvbiBLKGUpIHtcbiAgICAgICAgWCh0aGlzLCB7YmxvY2s6IG51bGwgPT0gZSB8fCBlID8gXCJzdGFydFwiIDogXCJlbmRcIiwgaW5saW5lOiBcIm5lYXJlc3RcIn0pXG4gICAgfVxuXG4gICAgdmFyIFUgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoIWEoKSkge1xuICAgICAgICAgICAgdmFyIHQgPSBjKHdpbmRvdy5IVE1MRWxlbWVudC5wcm90b3R5cGUsIFwic2Nyb2xsSW50b1ZpZXdcIiwgSyk7XG4gICAgICAgICAgICBzKFwic2Nyb2xsSW50b1ZpZXdcIiwgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbiA9IGFyZ3VtZW50cywgbyA9IG5bMF07XG4gICAgICAgICAgICAgICAgMSA9PT0gbi5sZW5ndGggJiYgdShvKSA/IFgodGhpcywgbywgZSkgOiB0LmFwcGx5KHRoaXMsIG4pXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgfVxuICAgIH07XG4gICAgZS5lbGVtZW50U2Nyb2xsID0gVCwgZS5lbGVtZW50U2Nyb2xsQnkgPSBTLCBlLmVsZW1lbnRTY3JvbGxCeVBvbHlmaWxsID0gUiwgZS5lbGVtZW50U2Nyb2xsSW50b1ZpZXcgPSBYLCBlLmVsZW1lbnRTY3JvbGxJbnRvVmlld1BvbHlmaWxsID0gVSwgZS5lbGVtZW50U2Nyb2xsUG9seWZpbGwgPSBGLCBlLmVsZW1lbnRTY3JvbGxUbyA9IEUsIGUuZWxlbWVudFNjcm9sbFRvUG9seWZpbGwgPSBBLCBlLm1vZGlmeVdpbmRvdyA9IE4sIGUucG9seWZpbGwgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBhKCkgfHwgKEYoZSksIEEoZSksIFIoZSksIFUoZSksIHEoZSksIHooZSksIEcoZSkpXG4gICAgfSwgZS5zY3JvbGwgPSB5LCBlLnNjcm9sbEJ5ID0gYiwgZS5zY3JvbGxJbnRvVmlldyA9IE8sIGUuc2Nyb2xsVG8gPSBnLCBlLndpbmRvd1Njcm9sbCA9IFAsIGUud2luZG93U2Nyb2xsQnkgPSBCLCBlLndpbmRvd1Njcm9sbEJ5UG9seWZpbGwgPSBHLCBlLndpbmRvd1Njcm9sbFBvbHlmaWxsID0gcSwgZS53aW5kb3dTY3JvbGxUbyA9IEwsIGUud2luZG93U2Nyb2xsVG9Qb2x5ZmlsbCA9IHosIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCBcIl9fZXNNb2R1bGVcIiwge3ZhbHVlOiAhMH0pXG59KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1idW5kbGUubWluLmpzLm1hcCJdLCJmaWxlIjoic2VhbWxlc3Mtc2Nyb2xsLmpzIn0=
