/*
 * Ext JS Library 2.2.1 Copyright(c) 2006-2009, Ext JS, LLC. licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext = {
	version : "2.2.1"
};
window["undefined"] = window["undefined"];
Ext.apply = function(d, e, b) {
	if (b) {
		Ext.apply(d, b)
	}
	if (d && e && typeof e == "object") {
		for (var a in e) {
			d[a] = e[a]
		}
	}
	return d
};
(function() {
	var idSeed = 0;
	var ua = navigator.userAgent.toLowerCase();
	var isStrict = document.compatMode == "CSS1Compat", isOpera = ua
			.indexOf("opera") > -1, isChrome = ua.indexOf("chrome") > -1, isSafari = !isChrome
			&& (/webkit|khtml/).test(ua), isSafari3 = isSafari
			&& ua.indexOf("webkit/5") != -1, isIE = !isOpera
			&& ua.indexOf("msie") > -1, isIE7 = !isOpera
			&& ua.indexOf("msie 7") > -1, isIE8 = !isOpera
			&& ua.indexOf("msie 8") > -1, isGecko = !isSafari && !isChrome
			&& ua.indexOf("gecko") > -1, isGecko3 = isGecko
			&& ua.indexOf("rv:1.9") > -1, isBorderBox = isIE && !isStrict, isWindows = (ua
			.indexOf("windows") != -1 || ua.indexOf("win32") != -1), isMac = (ua
			.indexOf("macintosh") != -1 || ua.indexOf("mac os x") != -1), isAir = (ua
			.indexOf("adobeair") != -1), isLinux = (ua.indexOf("linux") != -1), isSecure = window.location.href
			.toLowerCase().indexOf("https") === 0;
	if (isIE && !isIE7) {
		try {
			document.execCommand("BackgroundImageCache", false, true)
		} catch (e) {
		}
	}
	Ext
			.apply(
					Ext,
					{
						isStrict : isStrict,
						isSecure : isSecure,
						isReady : false,
						enableGarbageCollector : true,
						enableListenerCollection : false,
						SSL_SECURE_URL : "javascript:false",
						BLANK_IMAGE_URL : "http://extjs.com/s.gif",
						emptyFn : function() {
						},
						applyIf : function(o, c) {
							if (o && c) {
								for (var p in c) {
									if (typeof o[p] == "undefined") {
										o[p] = c[p]
									}
								}
							}
							return o
						},
						addBehaviors : function(o) {
							if (!Ext.isReady) {
								Ext.onReady(function() {
									Ext.addBehaviors(o)
								});
								return
							}
							var cache = {};
							for (var b in o) {
								var parts = b.split("@");
								if (parts[1]) {
									var s = parts[0];
									if (!cache[s]) {
										cache[s] = Ext.select(s)
									}
									cache[s].on(parts[1], o[b])
								}
							}
							cache = null
						},
						id : function(el, prefix) {
							prefix = prefix || "ext-gen";
							el = Ext.getDom(el);
							var id = prefix + (++idSeed);
							return el ? (el.id ? el.id : (el.id = id)) : id
						},
						extend : function() {
							var io = function(o) {
								for (var m in o) {
									this[m] = o[m]
								}
							};
							var oc = Object.prototype.constructor;
							return function(sb, sp, overrides) {
								if (typeof sp == "object") {
									overrides = sp;
									sp = sb;
									sb = overrides.constructor != oc
											? overrides.constructor
											: function() {
												sp.apply(this, arguments)
											}
								}
								var F = function() {
								}, sbp, spp = sp.prototype;
								F.prototype = spp;
								sbp = sb.prototype = new F();
								sbp.constructor = sb;
								sb.superclass = spp;
								if (spp.constructor == oc) {
									spp.constructor = sp
								}
								sb.override = function(o) {
									Ext.override(sb, o)
								};
								sbp.override = io;
								Ext.override(sb, overrides);
								sb.extend = function(o) {
									Ext.extend(sb, o)
								};
								return sb
							}
						}(),
						override : function(origclass, overrides) {
							if (overrides) {
								var p = origclass.prototype;
								for (var method in overrides) {
									p[method] = overrides[method]
								}
								if (Ext.isIE
										&& overrides.toString != origclass.toString) {
									p.toString = overrides.toString
								}
							}
						},
						namespace : function() {
							var a = arguments, o = null, i, j, d, rt;
							for (i = 0;i < a.length; ++i) {
								d = a[i].split(".");
								rt = d[0];
								eval("if (typeof " + rt + ' == "undefined"){'
										+ rt + " = {};} o = " + rt + ";");
								for (j = 1;j < d.length; ++j) {
									o[d[j]] = o[d[j]] || {};
									o = o[d[j]]
								}
							}
						},
						urlEncode : function(o) {
							if (!o) {
								return ""
							}
							var buf = [];
							for (var key in o) {
								var ov = o[key], k = encodeURIComponent(key);
								var type = typeof ov;
								if (type == "undefined") {
									buf.push(k, "=&")
								} else {
									if (type != "function" && type != "object") {
										buf.push(k, "=",
												encodeURIComponent(ov), "&")
									} else {
										if (Ext.isDate(ov)) {
											var s = Ext.encode(ov).replace(
													/"/g, "");
											buf.push(k, "=", s, "&")
										} else {
											if (Ext.isArray(ov)) {
												if (ov.length) {
													for (var i = 0, len = ov.length;i < len; i++) {
														buf
																.push(
																		k,
																		"=",
																		encodeURIComponent(ov[i] === undefined
																				? ""
																				: ov[i]),
																		"&")
													}
												} else {
													buf.push(k, "=&")
												}
											}
										}
									}
								}
							}
							buf.pop();
							return buf.join("")
						},
						urlDecode : function(string, overwrite) {
							if (!string || !string.length) {
								return {}
							}
							var obj = {};
							var pairs = string.split("&");
							var pair, name, value;
							for (var i = 0, len = pairs.length;i < len; i++) {
								pair = pairs[i].split("=");
								name = decodeURIComponent(pair[0]);
								value = decodeURIComponent(pair[1]);
								if (overwrite !== true) {
									if (typeof obj[name] == "undefined") {
										obj[name] = value
									} else {
										if (typeof obj[name] == "string") {
											obj[name] = [obj[name]];
											obj[name].push(value)
										} else {
											obj[name].push(value)
										}
									}
								} else {
									obj[name] = value
								}
							}
							return obj
						},
						each : function(array, fn, scope) {
							if (typeof array.length == "undefined"
									|| typeof array == "string") {
								array = [array]
							}
							for (var i = 0, len = array.length;i < len; i++) {
								if (fn.call(scope || array[i], array[i], i,
										array) === false) {
									return i
								}
							}
						},
						combine : function() {
							var as = arguments, l = as.length, r = [];
							for (var i = 0;i < l; i++) {
								var a = as[i];
								if (Ext.isArray(a)) {
									r = r.concat(a)
								} else {
									if (a.length !== undefined && !a.substr) {
										r = r.concat(Array.prototype.slice
												.call(a, 0))
									} else {
										r.push(a)
									}
								}
							}
							return r
						},
						escapeRe : function(s) {
							return s.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1")
						},
						callback : function(cb, scope, args, delay) {
							if (typeof cb == "function") {
								if (delay) {
									cb.defer(delay, scope, args || [])
								} else {
									cb.apply(scope, args || [])
								}
							}
						},
						getDom : function(el) {
							if (!el || !document) {
								return null
							}
							return el.dom ? el.dom : (typeof el == "string"
									? document.getElementById(el)
									: el)
						},
						getDoc : function() {
							return Ext.get(document)
						},
						getBody : function() {
							return Ext.get(document.body
									|| document.documentElement)
						},
						getCmp : function(id) {
							return Ext.ComponentMgr.get(id)
						},
						num : function(v, defaultValue) {
							if (typeof v != "number" || isNaN(v)) {
								return defaultValue
							}
							return v
						},
						destroy : function() {
							for (var i = 0, a = arguments, len = a.length;i < len; i++) {
								var as = a[i];
								if (as) {
									if (typeof as.destroy == "function") {
										as.destroy()
									} else {
										if (as.dom) {
											as.removeAllListeners();
											as.remove()
										}
									}
								}
							}
						},
						removeNode : isIE ? function() {
							var d;
							return function(n) {
								if (n && n.tagName != "BODY") {
									d = d || document.createElement("div");
									d.appendChild(n);
									d.innerHTML = ""
								}
							}
						}() : function(n) {
							if (n && n.parentNode && n.tagName != "BODY") {
								n.parentNode.removeChild(n)
							}
						},
						type : function(o) {
							if (o === undefined || o === null) {
								return false
							}
							if (o.htmlElement) {
								return "element"
							}
							var t = typeof o;
							if (t == "object" && o.nodeName) {
								switch (o.nodeType) {
									case 1 :
										return "element";
									case 3 :
										return (/\S/).test(o.nodeValue)
												? "textnode"
												: "whitespace"
								}
							}
							if (t == "object" || t == "function") {
								switch (o.constructor) {
									case Array :
										return "array";
									case RegExp :
										return "regexp";
									case Date :
										return "date"
								}
								if (typeof o.length == "number"
										&& typeof o.item == "function") {
									return "nodelist"
								}
							}
							return t
						},
						isEmpty : function(v, allowBlank) {
							return v === null || v === undefined
									|| (!allowBlank ? v === "" : false)
						},
						value : function(v, defaultValue, allowBlank) {
							return Ext.isEmpty(v, allowBlank)
									? defaultValue
									: v
						},
						isArray : function(v) {
							return v && typeof v.length == "number"
									&& typeof v.splice == "function"
						},
						isDate : function(v) {
							return v && typeof v.getFullYear == "function"
						},
						isOpera : isOpera,
						isChrome : isChrome,
						isSafari : isSafari,
						isSafari3 : isSafari3,
						isSafari2 : isSafari && !isSafari3,
						isIE : isIE,
						isIE6 : isIE && !isIE7 && !isIE8,
						isIE7 : isIE7,
						isIE8 : isIE8,
						isGecko : isGecko,
						isGecko2 : isGecko && !isGecko3,
						isGecko3 : isGecko3,
						isBorderBox : isBorderBox,
						isLinux : isLinux,
						isWindows : isWindows,
						isMac : isMac,
						isAir : isAir,
						useShims : ((isIE && !isIE7) || (isMac && isGecko && !isGecko3))
					});
	Ext.ns = Ext.namespace
})();
Ext.ns("Ext", "Ext.util", "Ext.grid", "Ext.dd", "Ext.tree", "Ext.data",
		"Ext.form", "Ext.menu", "Ext.state", "Ext.lib", "Ext.layout",
		"Ext.app", "Ext.ux");
Ext.apply(Function.prototype, {
	createCallback : function() {
		var a = arguments;
		var b = this;
		return function() {
			return b.apply(window, a)
		}
	},
	createDelegate : function(c, b, a) {
		var d = this;
		return function() {
			var f = b || arguments;
			if (a === true) {
				f = Array.prototype.slice.call(arguments, 0);
				f = f.concat(b)
			} else {
				if (typeof a == "number") {
					f = Array.prototype.slice.call(arguments, 0);
					var e = [a, 0].concat(b);
					Array.prototype.splice.apply(f, e)
				}
			}
			return d.apply(c || window, f)
		}
	},
	defer : function(c, e, b, a) {
		var d = this.createDelegate(e, b, a);
		if (c) {
			return setTimeout(d, c)
		}
		d();
		return 0
	},
	createSequence : function(b, a) {
		if (typeof b != "function") {
			return this
		}
		var c = this;
		return function() {
			var d = c.apply(this || window, arguments);
			b.apply(a || this || window, arguments);
			return d
		}
	},
	createInterceptor : function(b, a) {
		if (typeof b != "function") {
			return this
		}
		var c = this;
		return function() {
			b.target = this;
			b.method = c;
			if (b.apply(a || this || window, arguments) === false) {
				return
			}
			return c.apply(this || window, arguments)
		}
	}
});
Ext.applyIf(String, {
	escape : function(a) {
		return a.replace(/('|\\)/g, "\\$1")
	},
	leftPad : function(d, b, c) {
		var a = new String(d);
		if (!c) {
			c = " "
		}
		while (a.length < b) {
			a = c + a
		}
		return a.toString()
	},
	format : function(b) {
		var a = Array.prototype.slice.call(arguments, 1);
		return b.replace(/\{(\d+)\}/g, function(c, d) {
			return a[d]
		})
	}
});
String.prototype.toggle = function(b, a) {
	return this == b ? a : b
};
String.prototype.trim = function() {
	var a = /^\s+|\s+$/g;
	return function() {
		return this.replace(a, "")
	}
}();
Ext.applyIf(Number.prototype, {
	constrain : function(b, a) {
		return Math.min(Math.max(this, b), a)
	}
});
Ext.applyIf(Array.prototype, {
	indexOf : function(c) {
		for (var b = 0, a = this.length;b < a; b++) {
			if (this[b] == c) {
				return b
			}
		}
		return -1
	},
	remove : function(b) {
		var a = this.indexOf(b);
		if (a != -1) {
			this.splice(a, 1)
		}
		return this
	}
});
Date.prototype.getElapsed = function(a) {
	return Math.abs((a || new Date()).getTime() - this.getTime())
};
(function() {
	var b;
	Ext.lib.Dom = {
		getViewWidth : function(e) {
			return e ? this.getDocumentWidth() : this.getViewportWidth()
		},
		getViewHeight : function(e) {
			return e ? this.getDocumentHeight() : this.getViewportHeight()
		},
		getDocumentHeight : function() {
			var e = (document.compatMode != "CSS1Compat")
					? document.body.scrollHeight
					: document.documentElement.scrollHeight;
			return Math.max(e, this.getViewportHeight())
		},
		getDocumentWidth : function() {
			var e = (document.compatMode != "CSS1Compat")
					? document.body.scrollWidth
					: document.documentElement.scrollWidth;
			return Math.max(e, this.getViewportWidth())
		},
		getViewportHeight : function() {
			if (Ext.isIE) {
				return Ext.isStrict
						? document.documentElement.clientHeight
						: document.body.clientHeight
			} else {
				return self.innerHeight
			}
		},
		getViewportWidth : function() {
			if (Ext.isIE) {
				return Ext.isStrict
						? document.documentElement.clientWidth
						: document.body.clientWidth
			} else {
				return self.innerWidth
			}
		},
		isAncestor : function(f, g) {
			f = Ext.getDom(f);
			g = Ext.getDom(g);
			if (!f || !g) {
				return false
			}
			if (f.contains && !Ext.isSafari) {
				return f.contains(g)
			} else {
				if (f.compareDocumentPosition) {
					return !!(f.compareDocumentPosition(g) & 16)
				} else {
					var e = g.parentNode;
					while (e) {
						if (e == f) {
							return true
						} else {
							if (!e.tagName || e.tagName.toUpperCase() == "HTML") {
								return false
							}
						}
						e = e.parentNode
					}
					return false
				}
			}
		},
		getRegion : function(e) {
			return Ext.lib.Region.getRegion(e)
		},
		getY : function(e) {
			return this.getXY(e)[1]
		},
		getX : function(e) {
			return this.getXY(e)[0]
		},
		getXY : function(g) {
			var f, k, m, n, j = (document.body || document.documentElement);
			g = Ext.getDom(g);
			if (g == j) {
				return [0, 0]
			}
			if (g.getBoundingClientRect) {
				m = g.getBoundingClientRect();
				n = c(document).getScroll();
				return [m.left + n.left, m.top + n.top]
			}
			var o = 0, l = 0;
			f = g;
			var e = c(g).getStyle("position") == "absolute";
			while (f) {
				o += f.offsetLeft;
				l += f.offsetTop;
				if (!e && c(f).getStyle("position") == "absolute") {
					e = true
				}
				if (Ext.isGecko) {
					k = c(f);
					var q = parseInt(k.getStyle("borderTopWidth"), 10) || 0;
					var h = parseInt(k.getStyle("borderLeftWidth"), 10) || 0;
					o += h;
					l += q;
					if (f != g && k.getStyle("overflow") != "visible") {
						o += h;
						l += q
					}
				}
				f = f.offsetParent
			}
			if (Ext.isSafari && e) {
				o -= j.offsetLeft;
				l -= j.offsetTop
			}
			if (Ext.isGecko && !e) {
				var i = c(j);
				o += parseInt(i.getStyle("borderLeftWidth"), 10) || 0;
				l += parseInt(i.getStyle("borderTopWidth"), 10) || 0
			}
			f = g.parentNode;
			while (f && f != j) {
				if (!Ext.isOpera
						|| (f.tagName != "TR" && c(f).getStyle("display") != "inline")) {
					o -= f.scrollLeft;
					l -= f.scrollTop
				}
				f = f.parentNode
			}
			return [o, l]
		},
		setXY : function(e, f) {
			e = Ext.fly(e, "_setXY");
			e.position();
			var g = e.translatePoints(f);
			if (f[0] !== false) {
				e.dom.style.left = g.left + "px"
			}
			if (f[1] !== false) {
				e.dom.style.top = g.top + "px"
			}
		},
		setX : function(f, e) {
			this.setXY(f, [e, false])
		},
		setY : function(e, f) {
			this.setXY(e, [false, f])
		}
	};
	Ext.lib.Event = function() {
		var f = false;
		var g = [];
		var k = [];
		var i = 0;
		var h = [];
		var e = 0;
		var j = null;
		return {
			POLL_RETRYS : 200,
			POLL_INTERVAL : 20,
			EL : 0,
			TYPE : 1,
			FN : 2,
			WFN : 3,
			OBJ : 3,
			ADJ_SCOPE : 4,
			_interval : null,
			startInterval : function() {
				if (!this._interval) {
					var l = this;
					var m = function() {
						l._tryPreloadAttach()
					};
					this._interval = setInterval(m, this.POLL_INTERVAL)
				}
			},
			onAvailable : function(n, l, o, m) {
				h.push( {
					id : n,
					fn : l,
					obj : o,
					override : m,
					checkReady : false
				});
				i = this.POLL_RETRYS;
				this.startInterval()
			},
			addListener : function(q, m, p) {
				q = Ext.getDom(q);
				if (!q || !p) {
					return false
				}
				if ("unload" == m) {
					k[k.length] = [q, m, p];
					return true
				}
				var o = function(r) {
					return typeof Ext != "undefined" ? p(Ext.lib.Event
							.getEvent(r)) : false
				};
				var l = [q, m, p, o];
				var n = g.length;
				g[n] = l;
				this.doAdd(q, m, o, false);
				return true
			},
			removeListener : function(s, o, r) {
				var q, n;
				s = Ext.getDom(s);
				if (!r) {
					return this.purgeElement(s, false, o)
				}
				if ("unload" == o) {
					for (q = 0, n = k.length;q < n; q++) {
						var m = k[q];
						if (m && m[0] == s && m[1] == o && m[2] == r) {
							k.splice(q, 1);
							return true
						}
					}
					return false
				}
				var l = null;
				var p = arguments[3];
				if ("undefined" == typeof p) {
					p = this._getCacheIndex(s, o, r)
				}
				if (p >= 0) {
					l = g[p]
				}
				if (!s || !l) {
					return false
				}
				this.doRemove(s, o, l[this.WFN], false);
				delete g[p][this.WFN];
				delete g[p][this.FN];
				g.splice(p, 1);
				return true
			},
			getTarget : function(n, m) {
				n = n.browserEvent || n;
				var l = n.target || n.srcElement;
				return this.resolveTextNode(l)
			},
			resolveTextNode : function(l) {
				if (Ext.isSafari && l && 3 == l.nodeType) {
					return l.parentNode
				} else {
					return l
				}
			},
			getPageX : function(m) {
				m = m.browserEvent || m;
				var l = m.pageX;
				if (!l && 0 !== l) {
					l = m.clientX || 0;
					if (Ext.isIE) {
						l += this.getScroll()[1]
					}
				}
				return l
			},
			getPageY : function(l) {
				l = l.browserEvent || l;
				var m = l.pageY;
				if (!m && 0 !== m) {
					m = l.clientY || 0;
					if (Ext.isIE) {
						m += this.getScroll()[0]
					}
				}
				return m
			},
			getXY : function(l) {
				l = l.browserEvent || l;
				return [this.getPageX(l), this.getPageY(l)]
			},
			getRelatedTarget : function(m) {
				m = m.browserEvent || m;
				var l = m.relatedTarget;
				if (!l) {
					if (m.type == "mouseout") {
						l = m.toElement
					} else {
						if (m.type == "mouseover") {
							l = m.fromElement
						}
					}
				}
				return this.resolveTextNode(l)
			},
			getTime : function(n) {
				n = n.browserEvent || n;
				if (!n.time) {
					var m = new Date().getTime();
					try {
						n.time = m
					} catch (l) {
						this.lastError = l;
						return m
					}
				}
				return n.time
			},
			stopEvent : function(l) {
				this.stopPropagation(l);
				this.preventDefault(l)
			},
			stopPropagation : function(l) {
				l = l.browserEvent || l;
				if (l.stopPropagation) {
					l.stopPropagation()
				} else {
					l.cancelBubble = true
				}
			},
			preventDefault : function(l) {
				l = l.browserEvent || l;
				if (l.preventDefault) {
					l.preventDefault()
				} else {
					l.returnValue = false
				}
			},
			getEvent : function(m) {
				var l = m || window.event;
				if (!l) {
					var n = this.getEvent.caller;
					while (n) {
						l = n.arguments[0];
						if (l && Event == l.constructor) {
							break
						}
						n = n.caller
					}
				}
				return l
			},
			getCharCode : function(l) {
				l = l.browserEvent || l;
				return l.charCode || l.keyCode || 0
			},
			_getCacheIndex : function(q, n, p) {
				for (var o = 0, m = g.length;o < m; ++o) {
					var l = g[o];
					if (l && l[this.FN] == p && l[this.EL] == q
							&& l[this.TYPE] == n) {
						return o
					}
				}
				return -1
			},
			elCache : {},
			getEl : function(l) {
				return document.getElementById(l)
			},
			clearCache : function() {
			},
			_load : function(m) {
				f = true;
				var l = Ext.lib.Event;
				if (Ext.isIE) {
					l.doRemove(window, "load", l._load)
				}
			},
			_tryPreloadAttach : function() {
				if (this.locked) {
					return false
				}
				this.locked = true;
				var r = !f;
				if (!r) {
					r = (i > 0)
				}
				var q = [];
				for (var m = 0, l = h.length;m < l; ++m) {
					var p = h[m];
					if (p) {
						var o = this.getEl(p.id);
						if (o) {
							if (!p.checkReady || f || o.nextSibling
									|| (document && document.body)) {
								var n = o;
								if (p.override) {
									if (p.override === true) {
										n = p.obj
									} else {
										n = p.override
									}
								}
								p.fn.call(n, p.obj);
								h[m] = null
							}
						} else {
							q.push(p)
						}
					}
				}
				i = (q.length === 0) ? 0 : i - 1;
				if (r) {
					this.startInterval()
				} else {
					clearInterval(this._interval);
					this._interval = null
				}
				this.locked = false;
				return true
			},
			purgeElement : function(q, r, o) {
				var s = this.getListeners(q, o);
				if (s) {
					for (var p = 0, m = s.length;p < m; ++p) {
						var n = s[p];
						this.removeListener(q, n.type, n.fn)
					}
				}
				if (r && q && q.childNodes) {
					for (p = 0, m = q.childNodes.length;p < m; ++p) {
						this.purgeElement(q.childNodes[p], r, o)
					}
				}
			},
			getListeners : function(n, s) {
				var q = [], m;
				if (!s) {
					m = [g, k]
				} else {
					if (s == "unload") {
						m = [k]
					} else {
						m = [g]
					}
				}
				for (var p = 0;p < m.length; ++p) {
					var u = m[p];
					if (u && u.length > 0) {
						for (var r = 0, t = u.length;r < t; ++r) {
							var o = u[r];
							if (o && o[this.EL] === n
									&& (!s || s === o[this.TYPE])) {
								q.push( {
									type : o[this.TYPE],
									fn : o[this.FN],
									obj : o[this.OBJ],
									adjust : o[this.ADJ_SCOPE],
									index : r
								})
							}
						}
					}
				}
				return (q.length) ? q : null
			},
			_unload : function(t) {
				var s = Ext.lib.Event, q, p, n, m, o;
				for (q = 0, m = k.length;q < m; ++q) {
					n = k[q];
					if (n) {
						var r = window;
						if (n[s.ADJ_SCOPE]) {
							if (n[s.ADJ_SCOPE] === true) {
								r = n[s.OBJ]
							} else {
								r = n[s.ADJ_SCOPE]
							}
						}
						n[s.FN].call(r, s.getEvent(t), n[s.OBJ]);
						k[q] = null;
						n = null;
						r = null
					}
				}
				k = null;
				if (g && g.length > 0) {
					p = g.length;
					while (p) {
						o = p - 1;
						n = g[o];
						if (n) {
							s.removeListener(n[s.EL], n[s.TYPE], n[s.FN], o)
						}
						p = p - 1
					}
					n = null;
					s.clearCache()
				}
				s.doRemove(window, "unload", s._unload)
			},
			getScroll : function() {
				var l = document.documentElement, m = document.body;
				if (l && (l.scrollTop || l.scrollLeft)) {
					return [l.scrollTop, l.scrollLeft]
				} else {
					if (m) {
						return [m.scrollTop, m.scrollLeft]
					} else {
						return [0, 0]
					}
				}
			},
			doAdd : function() {
				if (window.addEventListener) {
					return function(o, m, n, l) {
						o.addEventListener(m, n, (l))
					}
				} else {
					if (window.attachEvent) {
						return function(o, m, n, l) {
							o.attachEvent("on" + m, n)
						}
					} else {
						return function() {
						}
					}
				}
			}(),
			doRemove : function() {
				if (window.removeEventListener) {
					return function(o, m, n, l) {
						o.removeEventListener(m, n, (l))
					}
				} else {
					if (window.detachEvent) {
						return function(n, l, m) {
							n.detachEvent("on" + l, m)
						}
					} else {
						return function() {
						}
					}
				}
			}()
		}
	}();
	var d = Ext.lib.Event;
	d.on = d.addListener;
	d.un = d.removeListener;
	if (document && document.body) {
		d._load()
	} else {
		d.doAdd(window, "load", d._load)
	}
	d.doAdd(window, "unload", d._unload);
	d._tryPreloadAttach();
	Ext.lib.Ajax = {
		request : function(l, j, e, k, f) {
			if (f) {
				var g = f.headers;
				if (g) {
					for (var i in g) {
						if (g.hasOwnProperty(i)) {
							this.initHeader(i, g[i], false)
						}
					}
				}
				if (f.xmlData) {
					if (!g || !g["Content-Type"]) {
						this.initHeader("Content-Type", "text/xml", false)
					}
					l = (l ? l : (f.method ? f.method : "POST"));
					k = f.xmlData
				} else {
					if (f.jsonData) {
						if (!g || !g["Content-Type"]) {
							this.initHeader("Content-Type", "application/json",
									false)
						}
						l = (l ? l : (f.method ? f.method : "POST"));
						k = typeof f.jsonData == "object" ? Ext
								.encode(f.jsonData) : f.jsonData
					}
				}
			}
			return this.asyncRequest(l, j, e, k)
		},
		serializeForm : function(f) {
			if (typeof f == "string") {
				f = (document.getElementById(f) || document.forms[f])
			}
			var g, e, h, l, m = "", o = false;
			for (var n = 0;n < f.elements.length; n++) {
				g = f.elements[n];
				l = f.elements[n].disabled;
				e = f.elements[n].name;
				h = f.elements[n].value;
				if (!l && e) {
					switch (g.type) {
						case "select-one" :
						case "select-multiple" :
							for (var k = 0;k < g.options.length; k++) {
								if (g.options[k].selected) {
									if (Ext.isIE) {
										m += encodeURIComponent(e)
												+ "="
												+ encodeURIComponent(g.options[k].attributes.value.specified
														? g.options[k].value
														: g.options[k].text)
												+ "&"
									} else {
										m += encodeURIComponent(e)
												+ "="
												+ encodeURIComponent(g.options[k]
														.hasAttribute("value")
														? g.options[k].value
														: g.options[k].text)
												+ "&"
									}
								}
							}
							break;
						case "radio" :
						case "checkbox" :
							if (g.checked) {
								m += encodeURIComponent(e) + "="
										+ encodeURIComponent(h) + "&"
							}
							break;
						case "file" :
						case undefined :
						case "reset" :
						case "button" :
							break;
						case "submit" :
							if (o == false) {
								m += encodeURIComponent(e) + "="
										+ encodeURIComponent(h) + "&";
								o = true
							}
							break;
						default :
							m += encodeURIComponent(e) + "="
									+ encodeURIComponent(h) + "&";
							break
					}
				}
			}
			m = m.substr(0, m.length - 1);
			return m
		},
		headers : {},
		hasHeaders : false,
		useDefaultHeader : true,
		defaultPostHeader : "application/x-www-form-urlencoded; charset=UTF-8",
		useDefaultXhrHeader : true,
		defaultXhrHeader : "XMLHttpRequest",
		hasDefaultHeaders : true,
		defaultHeaders : {},
		poll : {},
		timeout : {},
		pollInterval : 50,
		transactionId : 0,
		setProgId : function(e) {
			this.activeX.unshift(e)
		},
		setDefaultPostHeader : function(e) {
			this.useDefaultHeader = e
		},
		setDefaultXhrHeader : function(e) {
			this.useDefaultXhrHeader = e
		},
		setPollingInterval : function(e) {
			if (typeof e == "number" && isFinite(e)) {
				this.pollInterval = e
			}
		},
		createXhrObject : function(k) {
			var j, f;
			try {
				f = new XMLHttpRequest();
				j = {
					conn : f,
					tId : k
				}
			} catch (h) {
				for (var g = 0;g < this.activeX.length; ++g) {
					try {
						f = new ActiveXObject(this.activeX[g]);
						j = {
							conn : f,
							tId : k
						};
						break
					} catch (h) {
					}
				}
			} finally {
				return j
			}
		},
		getConnectionObject : function() {
			var g;
			var h = this.transactionId;
			try {
				g = this.createXhrObject(h);
				if (g) {
					this.transactionId++
				}
			} catch (f) {
			} finally {
				return g
			}
		},
		asyncRequest : function(i, f, h, e) {
			var g = this.getConnectionObject();
			if (!g) {
				return null
			} else {
				g.conn.open(i, f, true);
				if (this.useDefaultXhrHeader) {
					if (!this.defaultHeaders["X-Requested-With"]) {
						this.initHeader("X-Requested-With",
								this.defaultXhrHeader, true)
					}
				}
				if (e && this.useDefaultHeader
						&& (!this.hasHeaders || !this.headers["Content-Type"])) {
					this.initHeader("Content-Type", this.defaultPostHeader)
				}
				if (this.hasDefaultHeaders || this.hasHeaders) {
					this.setHeader(g)
				}
				this.handleReadyState(g, h);
				g.conn.send(e || null);
				return g
			}
		},
		handleReadyState : function(f, g) {
			var e = this;
			if (g && g.timeout) {
				this.timeout[f.tId] = window.setTimeout(function() {
					e.abort(f, g, true)
				}, g.timeout)
			}
			this.poll[f.tId] = window.setInterval(function() {
				if (f.conn && f.conn.readyState == 4) {
					window.clearInterval(e.poll[f.tId]);
					delete e.poll[f.tId];
					if (g && g.timeout) {
						window.clearTimeout(e.timeout[f.tId]);
						delete e.timeout[f.tId]
					}
					e.handleTransactionResponse(f, g)
				}
			}, this.pollInterval)
		},
		handleTransactionResponse : function(j, k, f) {
			if (!k) {
				this.releaseObject(j);
				return
			}
			var h, g;
			try {
				if (j.conn.status !== undefined && j.conn.status != 0) {
					h = j.conn.status
				} else {
					h = 13030
				}
			} catch (i) {
				h = 13030
			}
			if ((h >= 200 && h < 300) || (Ext.isIE && h == 1223)) {
				g = this.createResponseObject(j, k.argument);
				if (k.success) {
					if (!k.scope) {
						k.success(g)
					} else {
						k.success.apply(k.scope, [g])
					}
				}
			} else {
				switch (h) {
					case 12002 :
					case 12029 :
					case 12030 :
					case 12031 :
					case 12152 :
					case 13030 :
						g = this.createExceptionObject(j.tId, k.argument, (f
								? f
								: false));
						if (k.failure) {
							if (!k.scope) {
								k.failure(g)
							} else {
								k.failure.apply(k.scope, [g])
							}
						}
						break;
					default :
						g = this.createResponseObject(j, k.argument);
						if (k.failure) {
							if (!k.scope) {
								k.failure(g)
							} else {
								k.failure.apply(k.scope, [g])
							}
						}
				}
			}
			this.releaseObject(j);
			g = null
		},
		createResponseObject : function(f, m) {
			var j = {};
			var p = {};
			try {
				var h = f.conn.getAllResponseHeaders();
				var l = h.split("\n");
				for (var k = 0;k < l.length; k++) {
					var g = l[k].indexOf(":");
					if (g != -1) {
						p[l[k].substring(0, g)] = l[k].substring(g + 2)
					}
				}
			} catch (n) {
			}
			j.tId = f.tId;
			j.status = f.conn.status;
			j.statusText = f.conn.statusText;
			j.getResponseHeader = p;
			j.getAllResponseHeaders = h;
			j.responseText = f.conn.responseText;
			j.responseXML = f.conn.responseXML;
			if (typeof m !== undefined) {
				j.argument = m
			}
			return j
		},
		createExceptionObject : function(l, h, e) {
			var j = 0;
			var k = "communication failure";
			var g = -1;
			var f = "transaction aborted";
			var i = {};
			i.tId = l;
			if (e) {
				i.status = g;
				i.statusText = f
			} else {
				i.status = j;
				i.statusText = k
			}
			if (h) {
				i.argument = h
			}
			return i
		},
		initHeader : function(e, h, g) {
			var f = (g) ? this.defaultHeaders : this.headers;
			if (f[e] === undefined) {
				f[e] = h
			} else {
				f[e] = h + "," + f[e]
			}
			if (g) {
				this.hasDefaultHeaders = true
			} else {
				this.hasHeaders = true
			}
		},
		setHeader : function(e) {
			if (this.hasDefaultHeaders) {
				for (var f in this.defaultHeaders) {
					if (this.defaultHeaders.hasOwnProperty(f)) {
						e.conn.setRequestHeader(f, this.defaultHeaders[f])
					}
				}
			}
			if (this.hasHeaders) {
				for (var f in this.headers) {
					if (this.headers.hasOwnProperty(f)) {
						e.conn.setRequestHeader(f, this.headers[f])
					}
				}
				this.headers = {};
				this.hasHeaders = false
			}
		},
		resetDefaultHeaders : function() {
			delete this.defaultHeaders;
			this.defaultHeaders = {};
			this.hasDefaultHeaders = false
		},
		abort : function(f, g, e) {
			if (this.isCallInProgress(f)) {
				f.conn.abort();
				window.clearInterval(this.poll[f.tId]);
				delete this.poll[f.tId];
				if (e) {
					delete this.timeout[f.tId]
				}
				this.handleTransactionResponse(f, g, true);
				return true
			} else {
				return false
			}
		},
		isCallInProgress : function(e) {
			if (e.conn) {
				return e.conn.readyState != 4 && e.conn.readyState != 0
			} else {
				return false
			}
		},
		releaseObject : function(e) {
			e.conn = null;
			e = null
		},
		activeX : ["MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"]
	};
	Ext.lib.Region = function(g, h, e, f) {
		this.top = g;
		this[1] = g;
		this.right = h;
		this.bottom = e;
		this.left = f;
		this[0] = f
	};
	Ext.lib.Region.prototype = {
		contains : function(e) {
			return (e.left >= this.left && e.right <= this.right
					&& e.top >= this.top && e.bottom <= this.bottom)
		},
		getArea : function() {
			return ((this.bottom - this.top) * (this.right - this.left))
		},
		intersect : function(i) {
			var g = Math.max(this.top, i.top);
			var h = Math.min(this.right, i.right);
			var e = Math.min(this.bottom, i.bottom);
			var f = Math.max(this.left, i.left);
			if (e >= g && h >= f) {
				return new Ext.lib.Region(g, h, e, f)
			} else {
				return null
			}
		},
		union : function(i) {
			var g = Math.min(this.top, i.top);
			var h = Math.max(this.right, i.right);
			var e = Math.max(this.bottom, i.bottom);
			var f = Math.min(this.left, i.left);
			return new Ext.lib.Region(g, h, e, f)
		},
		constrainTo : function(e) {
			this.top = this.top.constrain(e.top, e.bottom);
			this.bottom = this.bottom.constrain(e.top, e.bottom);
			this.left = this.left.constrain(e.left, e.right);
			this.right = this.right.constrain(e.left, e.right);
			return this
		},
		adjust : function(g, f, e, h) {
			this.top += g;
			this.left += f;
			this.right += h;
			this.bottom += e;
			return this
		}
	};
	Ext.lib.Region.getRegion = function(h) {
		var j = Ext.lib.Dom.getXY(h);
		var g = j[1];
		var i = j[0] + h.offsetWidth;
		var e = j[1] + h.offsetHeight;
		var f = j[0];
		return new Ext.lib.Region(g, i, e, f)
	};
	Ext.lib.Point = function(e, f) {
		if (Ext.isArray(e)) {
			f = e[1];
			e = e[0]
		}
		this.x = this.right = this.left = this[0] = e;
		this.y = this.top = this.bottom = this[1] = f
	};
	Ext.lib.Point.prototype = new Ext.lib.Region();
	Ext.lib.Anim = {
		scroll : function(h, f, i, j, e, g) {
			return this.run(h, f, i, j, e, g, Ext.lib.Scroll)
		},
		motion : function(h, f, i, j, e, g) {
			return this.run(h, f, i, j, e, g, Ext.lib.Motion)
		},
		color : function(h, f, i, j, e, g) {
			return this.run(h, f, i, j, e, g, Ext.lib.ColorAnim)
		},
		run : function(i, f, k, l, e, h, g) {
			g = g || Ext.lib.AnimBase;
			if (typeof l == "string") {
				l = Ext.lib.Easing[l]
			}
			var j = new g(i, f, k, l);
			j.animateX(function() {
				Ext.callback(e, h)
			});
			return j
		}
	};
	function c(e) {
		if (!b) {
			b = new Ext.Element.Flyweight()
		}
		b.dom = e;
		return b
	}
	if (Ext.isIE) {
		function a() {
			var e = Function.prototype;
			delete e.createSequence;
			delete e.defer;
			delete e.createDelegate;
			delete e.createCallback;
			delete e.createInterceptor;
			window.detachEvent("onunload", a)
		}
		window.attachEvent("onunload", a)
	}
	Ext.lib.AnimBase = function(f, e, g, h) {
		if (f) {
			this.init(f, e, g, h)
		}
	};
	Ext.lib.AnimBase.prototype = {
		toString : function() {
			var e = this.getEl();
			var f = e.id || e.tagName;
			return ("Anim " + f)
		},
		patterns : {
			noNegatives : /width|height|opacity|padding/i,
			offsetAttribute : /^((width|height)|(top|left))$/,
			defaultUnit : /width|height|top$|bottom$|left$|right$/i,
			offsetUnit : /\d+(em|%|en|ex|pt|in|cm|mm|pc)$/i
		},
		doMethod : function(e, g, f) {
			return this.method(this.currentFrame, g, f - g, this.totalFrames)
		},
		setAttribute : function(e, g, f) {
			if (this.patterns.noNegatives.test(e)) {
				g = (g > 0) ? g : 0
			}
			Ext.fly(this.getEl(), "_anim").setStyle(e, g + f)
		},
		getAttribute : function(e) {
			var g = this.getEl();
			var i = c(g).getStyle(e);
			if (i !== "auto" && !this.patterns.offsetUnit.test(i)) {
				return parseFloat(i)
			}
			var f = this.patterns.offsetAttribute.exec(e) || [];
			var j = !!(f[3]);
			var h = !!(f[2]);
			if (h || (c(g).getStyle("position") == "absolute" && j)) {
				i = g["offset" + f[0].charAt(0).toUpperCase() + f[0].substr(1)]
			} else {
				i = 0
			}
			return i
		},
		getDefaultUnit : function(e) {
			if (this.patterns.defaultUnit.test(e)) {
				return "px"
			}
			return ""
		},
		animateX : function(h, e) {
			var g = function() {
				this.onComplete.removeListener(g);
				if (typeof h == "function") {
					h.call(e || this, this)
				}
			};
			this.onComplete.addListener(g, this);
			this.animate()
		},
		setRuntimeAttribute : function(f) {
			var l;
			var g;
			var h = this.attributes;
			this.runtimeAttributes[f] = {};
			var k = function(i) {
				return (typeof i !== "undefined")
			};
			if (!k(h[f]["to"]) && !k(h[f]["by"])) {
				return false
			}
			l = (k(h[f]["from"])) ? h[f]["from"] : this.getAttribute(f);
			if (k(h[f]["to"])) {
				g = h[f]["to"]
			} else {
				if (k(h[f]["by"])) {
					if (l.constructor == Array) {
						g = [];
						for (var j = 0, e = l.length;j < e; ++j) {
							g[j] = l[j] + h[f]["by"][j]
						}
					} else {
						g = l + h[f]["by"]
					}
				}
			}
			this.runtimeAttributes[f].start = l;
			this.runtimeAttributes[f].end = g;
			this.runtimeAttributes[f].unit = (k(h[f].unit))
					? h[f]["unit"]
					: this.getDefaultUnit(f)
		},
		init : function(g, l, k, e) {
			var f = false;
			var h = null;
			var j = 0;
			g = Ext.getDom(g);
			this.attributes = l || {};
			this.duration = k || 1;
			this.method = e || Ext.lib.Easing.easeNone;
			this.useSeconds = true;
			this.currentFrame = 0;
			this.totalFrames = Ext.lib.AnimMgr.fps;
			this.getEl = function() {
				return g
			};
			this.isAnimated = function() {
				return f
			};
			this.getStartTime = function() {
				return h
			};
			this.runtimeAttributes = {};
			this.animate = function() {
				if (this.isAnimated()) {
					return false
				}
				this.currentFrame = 0;
				this.totalFrames = (this.useSeconds)
						? Math.ceil(Ext.lib.AnimMgr.fps * this.duration)
						: this.duration;
				Ext.lib.AnimMgr.registerElement(this)
			};
			this.stop = function(o) {
				if (o) {
					this.currentFrame = this.totalFrames;
					this._onTween.fire()
				}
				Ext.lib.AnimMgr.stop(this)
			};
			var n = function() {
				this.onStart.fire();
				this.runtimeAttributes = {};
				for (var o in this.attributes) {
					this.setRuntimeAttribute(o)
				}
				f = true;
				j = 0;
				h = new Date()
			};
			var m = function() {
				var q = {
					duration : new Date() - this.getStartTime(),
					currentFrame : this.currentFrame
				};
				q.toString = function() {
					return ("duration: " + q.duration + ", currentFrame: " + q.currentFrame)
				};
				this.onTween.fire(q);
				var p = this.runtimeAttributes;
				for (var o in p) {
					this.setAttribute(o,
							this.doMethod(o, p[o].start, p[o].end), p[o].unit)
				}
				j += 1
			};
			var i = function() {
				var o = (new Date() - h) / 1000;
				var p = {
					duration : o,
					frames : j,
					fps : j / o
				};
				p.toString = function() {
					return ("duration: " + p.duration + ", frames: " + p.frames
							+ ", fps: " + p.fps)
				};
				f = false;
				j = 0;
				this.onComplete.fire(p)
			};
			this._onStart = new Ext.util.Event(this);
			this.onStart = new Ext.util.Event(this);
			this.onTween = new Ext.util.Event(this);
			this._onTween = new Ext.util.Event(this);
			this.onComplete = new Ext.util.Event(this);
			this._onComplete = new Ext.util.Event(this);
			this._onStart.addListener(n);
			this._onTween.addListener(m);
			this._onComplete.addListener(i)
		}
	};
	Ext.lib.AnimMgr = new function() {
		var g = null;
		var f = [];
		var e = 0;
		this.fps = 1000;
		this.delay = 1;
		this.registerElement = function(j) {
			f[f.length] = j;
			e += 1;
			j._onStart.fire();
			this.start()
		};
		this.unRegister = function(k, j) {
			k._onComplete.fire();
			j = j || i(k);
			if (j != -1) {
				f.splice(j, 1)
			}
			e -= 1;
			if (e <= 0) {
				this.stop()
			}
		};
		this.start = function() {
			if (g === null) {
				g = setInterval(this.run, this.delay)
			}
		};
		this.stop = function(l) {
			if (!l) {
				clearInterval(g);
				for (var k = 0, j = f.length;k < j; ++k) {
					if (f[0].isAnimated()) {
						this.unRegister(f[0], 0)
					}
				}
				f = [];
				g = null;
				e = 0
			} else {
				this.unRegister(l)
			}
		};
		this.run = function() {
			for (var l = 0, j = f.length;l < j; ++l) {
				var k = f[l];
				if (!k || !k.isAnimated()) {
					continue
				}
				if (k.currentFrame < k.totalFrames || k.totalFrames === null) {
					k.currentFrame += 1;
					if (k.useSeconds) {
						h(k)
					}
					k._onTween.fire()
				} else {
					Ext.lib.AnimMgr.stop(k, l)
				}
			}
		};
		var i = function(l) {
			for (var k = 0, j = f.length;k < j; ++k) {
				if (f[k] == l) {
					return k
				}
			}
			return -1
		};
		var h = function(k) {
			var n = k.totalFrames;
			var m = k.currentFrame;
			var l = (k.currentFrame * k.duration * 1000 / k.totalFrames);
			var j = (new Date() - k.getStartTime());
			var o = 0;
			if (j < k.duration * 1000) {
				o = Math.round((j / l - 1) * k.currentFrame)
			} else {
				o = n - (m + 1)
			}
			if (o > 0 && isFinite(o)) {
				if (k.currentFrame + o >= n) {
					o = n - (m + 1)
				}
				k.currentFrame += o
			}
		}
	};
	Ext.lib.Bezier = new function() {
		this.getPosition = function(k, h) {
			var l = k.length;
			var g = [];
			for (var f = 0;f < l; ++f) {
				g[f] = [k[f][0], k[f][1]]
			}
			for (var e = 1;e < l; ++e) {
				for (f = 0;f < l - e; ++f) {
					g[f][0] = (1 - h) * g[f][0] + h * g[parseInt(f + 1, 10)][0];
					g[f][1] = (1 - h) * g[f][1] + h * g[parseInt(f + 1, 10)][1]
				}
			}
			return [g[0][0], g[0][1]]
		}
	};
	(function() {
		Ext.lib.ColorAnim = function(i, h, j, k) {
			Ext.lib.ColorAnim.superclass.constructor.call(this, i, h, j, k)
		};
		Ext.extend(Ext.lib.ColorAnim, Ext.lib.AnimBase);
		var f = Ext.lib;
		var g = f.ColorAnim.superclass;
		var e = f.ColorAnim.prototype;
		e.toString = function() {
			var h = this.getEl();
			var i = h.id || h.tagName;
			return ("ColorAnim " + i)
		};
		e.patterns.color = /color$/i;
		e.patterns.rgb = /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i;
		e.patterns.hex = /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;
		e.patterns.hex3 = /^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i;
		e.patterns.transparent = /^transparent|rgba\(0, 0, 0, 0\)$/;
		e.parseColor = function(h) {
			if (h.length == 3) {
				return h
			}
			var i = this.patterns.hex.exec(h);
			if (i && i.length == 4) {
				return [parseInt(i[1], 16), parseInt(i[2], 16),
						parseInt(i[3], 16)]
			}
			i = this.patterns.rgb.exec(h);
			if (i && i.length == 4) {
				return [parseInt(i[1], 10), parseInt(i[2], 10),
						parseInt(i[3], 10)]
			}
			i = this.patterns.hex3.exec(h);
			if (i && i.length == 4) {
				return [parseInt(i[1] + i[1], 16), parseInt(i[2] + i[2], 16),
						parseInt(i[3] + i[3], 16)]
			}
			return null
		};
		e.getAttribute = function(h) {
			var j = this.getEl();
			if (this.patterns.color.test(h)) {
				var k = c(j).getStyle(h);
				if (this.patterns.transparent.test(k)) {
					var i = j.parentNode;
					k = c(i).getStyle(h);
					while (i && this.patterns.transparent.test(k)) {
						i = i.parentNode;
						k = c(i).getStyle(h);
						if (i.tagName.toUpperCase() == "HTML") {
							k = "#fff"
						}
					}
				}
			} else {
				k = g.getAttribute.call(this, h)
			}
			return k
		};
		e.doMethod = function(j, n, k) {
			var m;
			if (this.patterns.color.test(j)) {
				m = [];
				for (var l = 0, h = n.length;l < h; ++l) {
					m[l] = g.doMethod.call(this, j, n[l], k[l])
				}
				m = "rgb(" + Math.floor(m[0]) + "," + Math.floor(m[1]) + ","
						+ Math.floor(m[2]) + ")"
			} else {
				m = g.doMethod.call(this, j, n, k)
			}
			return m
		};
		e.setRuntimeAttribute = function(j) {
			g.setRuntimeAttribute.call(this, j);
			if (this.patterns.color.test(j)) {
				var l = this.attributes;
				var n = this.parseColor(this.runtimeAttributes[j].start);
				var k = this.parseColor(this.runtimeAttributes[j].end);
				if (typeof l[j]["to"] === "undefined"
						&& typeof l[j]["by"] !== "undefined") {
					k = this.parseColor(l[j].by);
					for (var m = 0, h = n.length;m < h; ++m) {
						k[m] = n[m] + k[m]
					}
				}
				this.runtimeAttributes[j].start = n;
				this.runtimeAttributes[j].end = k
			}
		}
	})();
	Ext.lib.Easing = {
		easeNone : function(f, e, h, g) {
			return h * f / g + e
		},
		easeIn : function(f, e, h, g) {
			return h * (f /= g) * f + e
		},
		easeOut : function(f, e, h, g) {
			return -h * (f /= g) * (f - 2) + e
		},
		easeBoth : function(f, e, h, g) {
			if ((f /= g / 2) < 1) {
				return h / 2 * f * f + e
			}
			return -h / 2 * ((--f) * (f - 2) - 1) + e
		},
		easeInStrong : function(f, e, h, g) {
			return h * (f /= g) * f * f * f + e
		},
		easeOutStrong : function(f, e, h, g) {
			return -h * ((f = f / g - 1) * f * f * f - 1) + e
		},
		easeBothStrong : function(f, e, h, g) {
			if ((f /= g / 2) < 1) {
				return h / 2 * f * f * f * f + e
			}
			return -h / 2 * ((f -= 2) * f * f * f - 2) + e
		},
		elasticIn : function(g, e, k, j, f, i) {
			if (g == 0) {
				return e
			}
			if ((g /= j) == 1) {
				return e + k
			}
			if (!i) {
				i = j * 0.3
			}
			if (!f || f < Math.abs(k)) {
				f = k;
				var h = i / 4
			} else {
				var h = i / (2 * Math.PI) * Math.asin(k / f)
			}
			return -(f * Math.pow(2, 10 * (g -= 1)) * Math.sin((g * j - h)
					* (2 * Math.PI) / i))
					+ e
		},
		elasticOut : function(g, e, k, j, f, i) {
			if (g == 0) {
				return e
			}
			if ((g /= j) == 1) {
				return e + k
			}
			if (!i) {
				i = j * 0.3
			}
			if (!f || f < Math.abs(k)) {
				f = k;
				var h = i / 4
			} else {
				var h = i / (2 * Math.PI) * Math.asin(k / f)
			}
			return f * Math.pow(2, -10 * g)
					* Math.sin((g * j - h) * (2 * Math.PI) / i) + k + e
		},
		elasticBoth : function(g, e, k, j, f, i) {
			if (g == 0) {
				return e
			}
			if ((g /= j / 2) == 2) {
				return e + k
			}
			if (!i) {
				i = j * (0.3 * 1.5)
			}
			if (!f || f < Math.abs(k)) {
				f = k;
				var h = i / 4
			} else {
				var h = i / (2 * Math.PI) * Math.asin(k / f)
			}
			if (g < 1) {
				return -0.5
						* (f * Math.pow(2, 10 * (g -= 1)) * Math
								.sin((g * j - h) * (2 * Math.PI) / i)) + e
			}
			return f * Math.pow(2, -10 * (g -= 1))
					* Math.sin((g * j - h) * (2 * Math.PI) / i) * 0.5 + k + e
		},
		backIn : function(f, e, i, h, g) {
			if (typeof g == "undefined") {
				g = 1.70158
			}
			return i * (f /= h) * f * ((g + 1) * f - g) + e
		},
		backOut : function(f, e, i, h, g) {
			if (typeof g == "undefined") {
				g = 1.70158
			}
			return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + e
		},
		backBoth : function(f, e, i, h, g) {
			if (typeof g == "undefined") {
				g = 1.70158
			}
			if ((f /= h / 2) < 1) {
				return i / 2 * (f * f * (((g *= (1.525)) + 1) * f - g)) + e
			}
			return i / 2 * ((f -= 2) * f * (((g *= (1.525)) + 1) * f + g) + 2)
					+ e
		},
		bounceIn : function(f, e, h, g) {
			return h - Ext.lib.Easing.bounceOut(g - f, 0, h, g) + e
		},
		bounceOut : function(f, e, h, g) {
			if ((f /= g) < (1 / 2.75)) {
				return h * (7.5625 * f * f) + e
			} else {
				if (f < (2 / 2.75)) {
					return h * (7.5625 * (f -= (1.5 / 2.75)) * f + 0.75) + e
				} else {
					if (f < (2.5 / 2.75)) {
						return h * (7.5625 * (f -= (2.25 / 2.75)) * f + 0.9375)
								+ e
					}
				}
			}
			return h * (7.5625 * (f -= (2.625 / 2.75)) * f + 0.984375) + e
		},
		bounceBoth : function(f, e, h, g) {
			if (f < g / 2) {
				return Ext.lib.Easing.bounceIn(f * 2, 0, h, g) * 0.5 + e
			}
			return Ext.lib.Easing.bounceOut(f * 2 - g, 0, h, g) * 0.5 + h * 0.5
					+ e
		}
	};
	(function() {
		Ext.lib.Motion = function(k, j, l, m) {
			if (k) {
				Ext.lib.Motion.superclass.constructor.call(this, k, j, l, m)
			}
		};
		Ext.extend(Ext.lib.Motion, Ext.lib.ColorAnim);
		var h = Ext.lib;
		var i = h.Motion.superclass;
		var f = h.Motion.prototype;
		f.toString = function() {
			var j = this.getEl();
			var k = j.id || j.tagName;
			return ("Motion " + k)
		};
		f.patterns.points = /^points$/i;
		f.setAttribute = function(j, l, k) {
			if (this.patterns.points.test(j)) {
				k = k || "px";
				i.setAttribute.call(this, "left", l[0], k);
				i.setAttribute.call(this, "top", l[1], k)
			} else {
				i.setAttribute.call(this, j, l, k)
			}
		};
		f.getAttribute = function(j) {
			if (this.patterns.points.test(j)) {
				var k = [i.getAttribute.call(this, "left"),
						i.getAttribute.call(this, "top")]
			} else {
				k = i.getAttribute.call(this, j)
			}
			return k
		};
		f.doMethod = function(j, n, k) {
			var m = null;
			if (this.patterns.points.test(j)) {
				var l = this
						.method(this.currentFrame, 0, 100, this.totalFrames)
						/ 100;
				m = h.Bezier.getPosition(this.runtimeAttributes[j], l)
			} else {
				m = i.doMethod.call(this, j, n, k)
			}
			return m
		};
		f.setRuntimeAttribute = function(s) {
			if (this.patterns.points.test(s)) {
				var k = this.getEl();
				var m = this.attributes;
				var j;
				var o = m.points["control"] || [];
				var l;
				var p, r;
				if (o.length > 0 && !Ext.isArray(o[0])) {
					o = [o]
				} else {
					var n = [];
					for (p = 0, r = o.length;p < r; ++p) {
						n[p] = o[p]
					}
					o = n
				}
				Ext.fly(k, "_anim").position();
				if (g(m.points["from"])) {
					Ext.lib.Dom.setXY(k, m.points["from"])
				} else {
					Ext.lib.Dom.setXY(k, Ext.lib.Dom.getXY(k))
				}
				j = this.getAttribute("points");
				if (g(m.points["to"])) {
					l = e.call(this, m.points["to"], j);
					var q = Ext.lib.Dom.getXY(this.getEl());
					for (p = 0, r = o.length;p < r; ++p) {
						o[p] = e.call(this, o[p], j)
					}
				} else {
					if (g(m.points["by"])) {
						l = [j[0] + m.points["by"][0], j[1] + m.points["by"][1]];
						for (p = 0, r = o.length;p < r; ++p) {
							o[p] = [j[0] + o[p][0], j[1] + o[p][1]]
						}
					}
				}
				this.runtimeAttributes[s] = [j];
				if (o.length > 0) {
					this.runtimeAttributes[s] = this.runtimeAttributes[s]
							.concat(o)
				}
				this.runtimeAttributes[s][this.runtimeAttributes[s].length] = l
			} else {
				i.setRuntimeAttribute.call(this, s)
			}
		};
		var e = function(j, l) {
			var k = Ext.lib.Dom.getXY(this.getEl());
			j = [j[0] - k[0] + l[0], j[1] - k[1] + l[1]];
			return j
		};
		var g = function(j) {
			return (typeof j !== "undefined")
		}
	})();
	(function() {
		Ext.lib.Scroll = function(i, h, j, k) {
			if (i) {
				Ext.lib.Scroll.superclass.constructor.call(this, i, h, j, k)
			}
		};
		Ext.extend(Ext.lib.Scroll, Ext.lib.ColorAnim);
		var f = Ext.lib;
		var g = f.Scroll.superclass;
		var e = f.Scroll.prototype;
		e.toString = function() {
			var h = this.getEl();
			var i = h.id || h.tagName;
			return ("Scroll " + i)
		};
		e.doMethod = function(h, k, i) {
			var j = null;
			if (h == "scroll") {
				j = [
						this.method(this.currentFrame, k[0], i[0] - k[0],
								this.totalFrames),
						this.method(this.currentFrame, k[1], i[1] - k[1],
								this.totalFrames)]
			} else {
				j = g.doMethod.call(this, h, k, i)
			}
			return j
		};
		e.getAttribute = function(h) {
			var j = null;
			var i = this.getEl();
			if (h == "scroll") {
				j = [i.scrollLeft, i.scrollTop]
			} else {
				j = g.getAttribute.call(this, h)
			}
			return j
		};
		e.setAttribute = function(h, k, j) {
			var i = this.getEl();
			if (h == "scroll") {
				i.scrollLeft = k[0];
				i.scrollTop = k[1]
			} else {
				g.setAttribute.call(this, h, k, j)
			}
		}
	})()
})();
