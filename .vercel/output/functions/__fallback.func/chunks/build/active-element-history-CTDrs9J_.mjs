import { computed, defineComponent, ref, watchEffect } from 'vue';
import { u as u$2, A, o as o$1 } from './keyboard-v1ubhqOk.mjs';

function t$2(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((o2) => setTimeout(() => {
    throw o2;
  }));
}
function o() {
  let a = [], s2 = { addEventListener(e, t2, r, i2) {
    return e.addEventListener(t2, r, i2), s2.add(() => e.removeEventListener(t2, r, i2));
  }, requestAnimationFrame(...e) {
    let t2 = requestAnimationFrame(...e);
    s2.add(() => cancelAnimationFrame(t2));
  }, nextFrame(...e) {
    s2.requestAnimationFrame(() => {
      s2.requestAnimationFrame(...e);
    });
  }, setTimeout(...e) {
    let t2 = setTimeout(...e);
    s2.add(() => clearTimeout(t2));
  }, microTask(...e) {
    let t2 = { current: true };
    return t$2(() => {
      t2.current && e[0]();
    }), s2.add(() => {
      t2.current = false;
    });
  }, style(e, t2, r) {
    let i2 = e.style.getPropertyValue(t2);
    return Object.assign(e.style, { [t2]: r }), this.add(() => {
      Object.assign(e.style, { [t2]: i2 });
    });
  }, group(e) {
    let t2 = o();
    return e(t2), this.add(() => t2.dispose());
  }, add(e) {
    return a.push(e), () => {
      let t2 = a.indexOf(e);
      if (t2 >= 0) for (let r of a.splice(t2, 1)) r();
    };
  }, dispose() {
    for (let e of a.splice(0)) e();
  } };
  return s2;
}
var i$2 = Object.defineProperty;
var d = (t2, e, r) => e in t2 ? i$2(t2, e, { enumerable: true, configurable: true, writable: true, value: r }) : t2[e] = r;
var n$1 = (t2, e, r) => (d(t2, typeof e != "symbol" ? e + "" : e, r), r);
class s {
  constructor() {
    n$1(this, "current", this.detect());
    n$1(this, "currentId", 0);
  }
  set(e) {
    this.current !== e && (this.currentId = 0, this.current = e);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return "server";
  }
}
let c$1 = new s();
function i$1(r) {
  if (c$1.isServer) return null;
  if (r instanceof Node) return r.ownerDocument;
  if (r != null && r.hasOwnProperty("value")) {
    let n2 = o$1(r);
    if (n2) return n2.ownerDocument;
  }
  return void 0;
}
let c = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var N = ((n2) => (n2[n2.First = 1] = "First", n2[n2.Previous = 2] = "Previous", n2[n2.Next = 4] = "Next", n2[n2.Last = 8] = "Last", n2[n2.WrapAround = 16] = "WrapAround", n2[n2.NoScroll = 32] = "NoScroll", n2))(N || {}), T = ((o2) => (o2[o2.Error = 0] = "Error", o2[o2.Overflow = 1] = "Overflow", o2[o2.Success = 2] = "Success", o2[o2.Underflow = 3] = "Underflow", o2))(T || {}), F = ((t2) => (t2[t2.Previous = -1] = "Previous", t2[t2.Next = 1] = "Next", t2))(F || {});
function E(e = (void 0).body) {
  return e == null ? [] : Array.from(e.querySelectorAll(c)).sort((r, t2) => Math.sign((r.tabIndex || Number.MAX_SAFE_INTEGER) - (t2.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var h = ((t2) => (t2[t2.Strict = 0] = "Strict", t2[t2.Loose = 1] = "Loose", t2))(h || {});
function w$2(e, r = 0) {
  var t2;
  return e === ((t2 = i$1(e)) == null ? void 0 : t2.body) ? false : u$2(r, { [0]() {
    return e.matches(c);
  }, [1]() {
    let l = e;
    for (; l !== null; ) {
      if (l.matches(c)) return true;
      l = l.parentElement;
    }
    return false;
  } });
}
var y = ((t2) => (t2[t2.Keyboard = 0] = "Keyboard", t2[t2.Mouse = 1] = "Mouse", t2))(y || {});
function S(e) {
  e == null || e.focus({ preventScroll: true });
}
let H = ["textarea", "input"].join(",");
function I(e) {
  var r, t2;
  return (t2 = (r = e == null ? void 0 : e.matches) == null ? void 0 : r.call(e, H)) != null ? t2 : false;
}
function O(e, r = (t2) => t2) {
  return e.slice().sort((t2, l) => {
    let o2 = r(t2), i2 = r(l);
    if (o2 === null || i2 === null) return 0;
    let n2 = o2.compareDocumentPosition(i2);
    return n2 & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : n2 & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function P(e, r, { sorted: t2 = true, relativeTo: l = null, skipElements: o2 = [] } = {}) {
  var m;
  let i2 = (m = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : void 0 : e == null ? void 0 : e.ownerDocument) != null ? m : void 0, n2 = Array.isArray(e) ? t2 ? O(e) : e : E(e);
  o2.length > 0 && n2.length > 1 && (n2 = n2.filter((s2) => !o2.includes(s2))), l = l != null ? l : i2.activeElement;
  let x = (() => {
    if (r & 5) return 1;
    if (r & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), p = (() => {
    if (r & 1) return 0;
    if (r & 2) return Math.max(0, n2.indexOf(l)) - 1;
    if (r & 4) return Math.max(0, n2.indexOf(l)) + 1;
    if (r & 8) return n2.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), L = r & 32 ? { preventScroll: true } : {}, a = 0, d2 = n2.length, u2;
  do {
    if (a >= d2 || a + d2 <= 0) return 0;
    let s2 = p + a;
    if (r & 16) s2 = (s2 + d2) % d2;
    else {
      if (s2 < 0) return 3;
      if (s2 >= d2) return 1;
    }
    u2 = n2[s2], u2 == null || u2.focus(L), a += x;
  } while (u2 !== i2.activeElement);
  return r & 6 && I(u2) && u2.select(), 2;
}
function t$1() {
  return /iPhone/gi.test((void 0).navigator.platform) || /Mac/gi.test((void 0).navigator.platform) && (void 0).navigator.maxTouchPoints > 0;
}
function i() {
  return /Android/gi.test((void 0).navigator.userAgent);
}
function n() {
  return t$1() || i();
}
function u$1(e, t2, n2) {
  c$1.isServer || watchEffect((o2) => {
    (void 0).addEventListener(e, t2, n2), o2(() => (void 0).removeEventListener(e, t2, n2));
  });
}
function w$1(e, n2, t2) {
  c$1.isServer || watchEffect((o2) => {
    (void 0).addEventListener(e, n2, t2), o2(() => (void 0).removeEventListener(e, n2, t2));
  });
}
function w(f2, m, l = computed(() => true)) {
  function a(e, r) {
    if (!l.value || e.defaultPrevented) return;
    let t2 = r(e);
    if (t2 === null || !t2.getRootNode().contains(t2)) return;
    let c2 = (function o2(n2) {
      return typeof n2 == "function" ? o2(n2()) : Array.isArray(n2) || n2 instanceof Set ? n2 : [n2];
    })(f2);
    for (let o2 of c2) {
      if (o2 === null) continue;
      let n2 = o2 instanceof HTMLElement ? o2 : o$1(o2);
      if (n2 != null && n2.contains(t2) || e.composed && e.composedPath().includes(n2)) return;
    }
    return !w$2(t2, h.Loose) && t2.tabIndex !== -1 && e.preventDefault(), m(e, t2);
  }
  let u2 = ref(null);
  u$1("pointerdown", (e) => {
    var r, t2;
    l.value && (u2.value = ((t2 = (r = e.composedPath) == null ? void 0 : r.call(e)) == null ? void 0 : t2[0]) || e.target);
  }, true), u$1("mousedown", (e) => {
    var r, t2;
    l.value && (u2.value = ((t2 = (r = e.composedPath) == null ? void 0 : r.call(e)) == null ? void 0 : t2[0]) || e.target);
  }, true), u$1("click", (e) => {
    n() || u2.value && (a(e, () => u2.value), u2.value = null);
  }, true), u$1("touchend", (e) => a(e, () => e.target instanceof HTMLElement ? e.target : null), true), w$1("blur", (e) => a(e, () => (void 0).document.activeElement instanceof HTMLIFrameElement ? (void 0).document.activeElement : null), true);
}
var u = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(u || {});
let f = defineComponent({ name: "Hidden", props: { as: { type: [Object, String], default: "div" }, features: { type: Number, default: 1 } }, setup(t2, { slots: n2, attrs: i2 }) {
  return () => {
    var r;
    let { features: e, ...d2 } = t2, o2 = { "aria-hidden": (e & 2) === 2 ? true : (r = d2["aria-hidden"]) != null ? r : void 0, hidden: (e & 4) === 4 ? true : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(e & 4) === 4 && (e & 2) !== 2 && { display: "none" } } };
    return A({ ourProps: o2, theirProps: d2, slot: {}, attrs: i2, slots: n2, name: "Hidden" });
  };
} });
let t = [];

export { N, O, P, S, w$2 as a, w$1 as b, c$1 as c, t$2 as d, t$1 as e, f, h, i$1 as i, n, o, t, u, w };
//# sourceMappingURL=active-element-history-CTDrs9J_.mjs.map
