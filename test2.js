// --------------------------------------
// 
//    _  _ _/ .  _  _/ /_ _  _  _        
//   /_|/_ / /|//_  / / //_ /_// /_/     
//   https://activetheory.com    _/      
// 
// --------------------------------------
//   1/28/20 11:56p
// --------------------------------------
"undefined" == typeof console && (window.console = {}, console.log = console.error = console.info = console.debug = console.warn = console.trace = function() {}), window.performance = window.performance && window.performance.now ? window.performance : Date, Date.now = Date.now || function() {
        return +new Date
    }, window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function() {
        const start = Date.now();
        return function(callback) {
            window.setTimeout(() => callback(Date.now() - start), 1e3 / 60)
        }
    }()), window.defer = window.requestAnimationFrame, window.clearTimeout = function() {
        const _clearTimeout = window.clearTimeout;
        return function(ref) {
            return window.Timer && Timer.__clearTimeout(ref) || _clearTimeout(ref)
        }
    }(), window.requestIdleCallback = function() {
        const _requestIdleCallback = window.requestIdleCallback;
        return function(callback, max) {
            return _requestIdleCallback ? _requestIdleCallback(callback, max ? {
                timeout: max
            } : null) : defer(() => {
                callback({
                    didTimeout: !1
                })
            }, 0)
        }
    }(), window.onIdle = window.requestIdleCallback, "undefined" == typeof Float32Array && (Float32Array = Array), Math.sign = function(x) {
        return 0 === (x = +x) || isNaN(x) ? Number(x) : x > 0 ? 1 : -1
    }, Math._round = Math.round, Math.round = function(value, precision = 0) {
        let p = Math.pow(10, precision);
        return Math._round(value * p) / p
    }, Math._random = Math.random, Math.rand = Math.random = function(min, max, precision = 0) {
        return void 0 === min ? Math._random() : min === max ? min : (min = min || 0, max = max || 1, 0 == precision ? Math.floor(Math._random() * (max + 1 - min) + min) : Math.round(min + Math._random() * (max - min), precision))
    }, Math.degrees = function(radians) {
        return radians * (180 / Math.PI)
    }, Math.radians = function(degrees) {
        return degrees * (Math.PI / 180)
    }, Math.clamp = function(value, min = 0, max = 1) {
        return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max))
    }, Math.map = Math.range = function(value, oldMin = -1, oldMax = 1, newMin = 0, newMax = 1, isClamp) {
        const newValue = (value - oldMin) * (newMax - newMin) / (oldMax - oldMin) + newMin;
        return isClamp ? Math.clamp(newValue, Math.min(newMin, newMax), Math.max(newMin, newMax)) : newValue
    }, Math.mix = function(a, b, alpha) {
        return a * (1 - alpha) + b * alpha
    }, Math.step = function(edge, value) {
        return value < edge ? 0 : 1
    }, Math.smoothStep = function(min, max, value) {
        const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
        return x * x * (3 - 2 * x)
    }, Math.fract = function(value) {
        return value - Math.floor(value)
    }, Math.lerp = function(target, value, alpha) {
        return Math.mix(value, target, alpha * Render.HZ_MULTIPLIER)
    }, Math.mod = function(value, n) {
        return (value % n + n) % n
    }, Array.prototype.shuffle = function() {
        let temp, r, i = this.length - 1;
        for(; i > 0;) r = Math.random(0, i, 0), i -= 1, temp = this[i], this[i] = this[r], this[r] = temp;
        return this
    }, Array.storeRandom = function(arr) {
        arr.randomStore = []
    }, Array.prototype.random = function(range) {
        let value = Math.random(0, this.length - 1);
        if(arguments.length && !this.randomStore && Array.storeRandom(this), !this.randomStore) return this[value];
        if(range > this.length - 1 && (range = this.length), range > 1) {
            for(; ~this.randomStore.indexOf(value);)(value += 1) > this.length - 1 && (value = 0);
            this.randomStore.push(value), this.randomStore.length >= range && this.randomStore.shift()
        }
        return this[value]
    }, Array.prototype.remove = function(element) {
        if(!this.indexOf) return;
        const index = this.indexOf(element);
        return ~index ? this.splice(index, 1) : void 0
    }, Array.prototype.last = function() {
        return this[this.length - 1]
    }, window.Promise = window.Promise || {}, Array.prototype.flat || Object.defineProperty(Array.prototype, "flat", {
        configurable: !0,
        value: function flat() {
            var depth = isNaN(arguments[0]) ? 1 : Number(arguments[0]);
            return depth ? Array.prototype.reduce.call(this, (function(acc, cur) {
                return Array.isArray(cur) ? acc.push.apply(acc, flat.call(cur, depth - 1)) : acc.push(cur), acc
            }), []) : Array.prototype.slice.call(this)
        },
        writable: !0
    }), Promise.create = function() {
        const promise = new Promise((resolve, reject) => {
            this.temp_resolve = resolve, this.temp_reject = reject
        });
        return promise.resolve = this.temp_resolve, promise.reject = this.temp_reject, delete this.temp_resolve, delete this.temp_reject, promise
    }, Promise.catchAll = function(array) {
        let promises = [];
        return array.forEach(promise => {
            let p = Promise.create();
            promises.push(p), promise.then(d => p.resolve(d)).catch(e => p.reject(e))
        }), Promise.all(promises)
    }, String.prototype.includes = function(str) {
        if(!Array.isArray(str)) return !!~this.indexOf(str);
        for(let i = str.length - 1; i >= 0; i--)
            if(~this.indexOf(str[i])) return !0;
        return !1
    }, String.prototype.equals = function(str) {
        let compare = String(this);
        if(!Array.isArray(str)) return str === compare;
        for(let i = str.length - 1; i >= 0; i--)
            if(str[i] === compare) return !0;
        return !1
    }, String.prototype.strpos = function(str) {
        return console.warn("strpos deprecated: use .includes()"), this.includes(str)
    }, String.prototype.clip = function(num, end = "") {
        return this.length > num ? this.slice(0, Math.max(0, num - end.length)).trim() + end : this.slice()
    }, String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1)
    }, String.prototype.replaceAll = function(find, replace) {
        return this.split(find).join(replace)
    }, String.prototype.replaceAt = function(index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length)
    }, window.fetch || (window.fetch = function(url, options) {
        options = options || {};
        const promise = Promise.create(),
            request = new XMLHttpRequest;
        request.open(options.method || "get", url);
        for(let i in options.headers) request.setRequestHeader(i, options.headers[i]);

        function response() {
            let header, keys = [],
                all = [],
                headers = {};
            return request.getAllResponseHeaders().replace(/^(.*?):\s*([\s\S]*?)$/gm, (m, key, value) => {
                keys.push(key = key.toLowerCase()), all.push([key, value]), header = headers[key], headers[key] = header ? `${header},${value}` : value
            }), {
                ok: 1 == (request.status / 200 | 0),
                status: request.status,
                statusText: request.statusText,
                url: request.responseURL,
                clone: response,
                text: () => Promise.resolve(request.responseText),
                json: () => Promise.resolve(request.responseText).then(JSON.parse),
                xml: () => Promise.resolve(request.responseXML),
                blob: () => Promise.resolve(new Blob([request.response])),
                headers: {
                    keys: () => keys,
                    entries: () => all,
                    get: n => headers[n.toLowerCase()],
                    has: n => n.toLowerCase() in headers
                }
            }
        }
        return request.onload = () => {
            promise.resolve(response())
        }, request.onerror = promise.reject, request.send(options.body), promise
    }), window.get = function(url, options = {
        credentials: "same-origin"
    }) {
        let promise = Promise.create();
        return options.method = "GET", fetch(url, options).then((function handleResponse(e) {
            if(!e.ok) return promise.reject(e);
            e.text().then(text => {
                if(text.charAt(0).includes(["[", "{"])) try {
                    promise.resolve(JSON.parse(text))
                } catch (err) {
                    promise.resolve(text)
                } else promise.resolve(text)
            })
        })).catch(promise.reject), promise
    }, window.post = function(url, body, options = {}) {
        let promise = Promise.create();
        return options.method = "POST", body && (options.body = "object" == typeof body || Array.isArray(body) ? JSON.stringify(body) : body), fetch(url, options).then((function handleResponse(e) {
            if(!e.ok) return promise.reject(e);
            e.text().then(text => {
                if(text.charAt(0).includes(["[", "{"])) try {
                    promise.resolve(JSON.parse(text))
                } catch (err) {
                    promise.resolve(text)
                } else promise.resolve(text)
            })
        })).catch(promise.reject), promise
    }, window.put = function(url, body, options = {}) {
        let promise = Promise.create();
        return options.method = "PUT", body && (options.body = "object" == typeof body || Array.isArray(body) ? JSON.stringify(body) : body), fetch(url, options).then((function handleResponse(e) {
            if(!e.ok) return promise.reject(e);
            e.text().then(text => {
                if(text.charAt(0).includes(["[", "{"])) try {
                    promise.resolve(JSON.parse(text))
                } catch (err) {
                    promise.resolve(text)
                } else promise.resolve(text)
            })
        })).catch(promise.reject), promise
    }, window.Class = function(_class, _type, _static) {
        const _this = this || window,
            _name = _class.name || _class.toString().match(/function ?([^\(]+)/)[1];
        "function" == typeof _type && (_static = _type, _type = null), (_type = (_type || "").toLowerCase()) ? "static" == _type ? _this[_name] = new _class : "singleton" == _type && (_this[_name] = _class, function() {
            let _instance;
            _this[_name].instance = function(a, b, c) {
                return _instance || (_instance = new _class(a, b, c)), _instance
            }
        }(), _static && _static()) : (_this[_name] = _class, _static && _static()), this && this !== window && (this[_name]._namespace = this.__namespace)
    }, window.Inherit = function(child, parent) {
        const args = [].slice.call(arguments, 2);
        parent.apply(child, args);
        const save = {};
        for(let method in child) save[method] = child[method];
        defer(() => {
            for(let method in child)
                if(save[method] && child[method] !== save[method]) {
                    if("destroy" == method && child.destroy && !child.__element) throw "Do not override destroy directly, use onDestroy :: " + child.constructor.toString();
                    child["_" + method] = save[method]
                }
        })
    }, window.Namespace = function(obj) {
        "string" == typeof obj ? window[obj] || (window[obj] = {
            Class: Class,
            __namespace: obj
        }) : (obj.Class = Class, obj.__namespace = obj.constructor.name || obj.constructor.toString().match(/function ([^\(]+)/)[1])
    }, window.Global = {}, window.THREAD = !1, Class((function Hydra() {
        const _this = this,
            _readyPromise = Promise.create();
        var _base, _callbacks = [];

        function initLoad() {
            return document && window ? window._NODE_ ? setTimeout(loaded, 1) : window._AURA_ ? window.Main ? setTimeout(loaded, 1) : setTimeout(initLoad, 1) : void window.addEventListener("load", loaded, !1) : setTimeout(initLoad, 1)
        }

        function loaded() {
            window.removeEventListener("load", loaded, !1), _this.LOCAL = !window._BUILT_ && (location.hostname.indexOf("local") > -1 || "10" == location.hostname.split(".")[0] || "192" == location.hostname.split(".")[0]) && "" == location.port, _callbacks.forEach(cb => cb()), _callbacks = null, _readyPromise.resolve(), window.Main && _readyPromise.then(() => Hydra.Main = new window.Main)
        }
        this.HASH = window.location.hash.slice(1), this.LOCAL = !window._BUILT_ && (location.hostname.indexOf("local") > -1 || "10" == location.hostname.split(".")[0] || "192" == location.hostname.split(".")[0]) && "" == location.port, initLoad(), this.__triggerReady = function() {
            loaded()
        }, this.ready = function(callback) {
            if(!callback) return _readyPromise;
            _callbacks ? _callbacks.push(callback) : callback()
        }, this.absolutePath = function(path) {
            if(window.AURA) return path;
            let base = _base;
            if(void 0 === base) try {
                if(document.getElementsByTagName("base").length > 0) {
                    var a = document.createElement("a");
                    a.href = document.getElementsByTagName("base")[0].href, base = a.pathname, _base = base
                }
            } catch (e) {
                _base = null
            }
            let pathname = base || location.pathname;
            pathname.includes("/index.html") && (pathname = pathname.replace("/index.html", ""));
            let port = Number(location.port) > 1e3 ? `:${location.port}` : "";
            return path.includes("http") ? path : (location.protocol.length ? location.protocol + "//" : "") + (location.hostname + port + pathname + "/" + path).replace("//", "/")
        }
    }), "Static"), Class((function Utils() {
        var _queries = {};
        this.query = function(key) {
            if(void 0 !== _queries[key]) return _queries[key];
            const str = decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
            return "0" == str ? (_queries[key] = 0, 0) : str.length && "false" != str ? (_queries[key] = str, str) : (_queries[key] = location.search.includes(key), _queries[key])
        }, this.getConstructorName = function(obj) {
            return obj ? obj.constructor.name || obj.constructor.toString().match(/function ([^\(]+)/)[1] : obj
        }, this.nullObject = function(object) {
            if(object.destroy || object.div)
                for(var key in object) void 0 !== object[key] && (object[key] = null);
            return null
        }, this.cloneObject = function(obj) {
            return JSON.parse(JSON.stringify(obj))
        }, this.headsTails = function(n0, n1) {
            return Math.random(0, 1) ? n1 : n0
        }, this.mergeObject = function() {
            for(var obj = {}, i = 0; i < arguments.length; i++) {
                var o = arguments[i];
                for(var key in o) obj[key] = o[key]
            }
            return obj
        }, this.timestamp = function() {
            return (Date.now() + Math.random(0, 99999, 0)).toString()
        }, this.randomColor = function() {
            var color = "#" + Math.floor(16777215 * Math.random()).toString(16);
            return color.length < 7 && (color = this.randomColor()), color
        }, this.numberWithCommas = function(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }, this.padInt = function(num, digits, isLimit) {
            isLimit && (num = Math.min(num, Math.pow(10, digits) - 1));
            let str = Math.floor(num).toString();
            return Math.pow(10, Math.max(0, digits - str.length)).toString().slice(1) + str
        }, this.copyToClipboard = function(string) {
            try {
                var el = document.createElement("textarea"),
                    range = document.createRange();
                el.contentEditable = !0, el.readOnly = !0, el.value = string, document.body.appendChild(el), el.select(), range.selectNodeContents(el);
                var s = window.getSelection();
                return s.removeAllRanges(), s.addRange(range), el.setSelectionRange(0, string.length), document.execCommand("copy"), document.body.removeChild(el), !0
            } catch (e) {
                return !1
            }
        }, this.stringList = function(items = [], limit = 0, options = {}) {
            if(0 === items.length) return "";
            let output = "",
                printed = 0;
            "object" == typeof limit && (options = limit, limit = 0), options.oxford = !0 === options.oxford, options.more = !1 !== options.more && (options.more ? options.more : "more"), options.and = options.and ? options.and : "&", options.comma = options.comma ? options.comma : ",", isNaN(options.limit) || (limit = options.limit), 0 === limit && (limit = items.length);
            do {
                output = `${output}${items.shift()}${options.comma} `, printed++
            } while(items.length > 1 && printed + 1 < limit);
            if(output = output.trim(), output = output.slice(0, output.length - 1), 1 === items.length) output = `${output}${options.oxford&&printed>1?options.comma:""} ${options.and} ${items.shift()}`;
            else if(items.length > 1 && options.more) {
                let more = `${items.length} ${options.more}`;
                output = `${output}${options.oxford&&printed>1?options.comma:""} ${options.and} ${more}`
            }
            return output
        }
    }), "Static"), Class((function Render() {
        const _this = this,
            _render = [],
            _drawFrame = [],
            _multipliers = [];
        var _last = performance.now(),
            _skipLimit = 200,
            _localTSL = 0,
            _sampleRefreshRate = [],
            rAF = requestAnimationFrame;

        function render(tsl) {
            if(_this.timeScaleUniform.value = 1, _multipliers.length)
                for(let i = 0; i < _multipliers.length; i++) {
                    let obj = _multipliers[i];
                    _this.timeScaleUniform.value *= obj.value
                }
            _this.DT = tsl - _last;
            let delta = _this.DT * _this.timeScaleUniform.value;
            if(delta = Math.min(_skipLimit, delta), _last = tsl, _this.startFrame && _this.startFrame(tsl, delta), _sampleRefreshRate) {
                let fps = 1e3 / _this.DT;
                if(_sampleRefreshRate.push(fps), _sampleRefreshRate.length > 30) {
                    _sampleRefreshRate.sort((a, b) => a - b);
                    let rate = _sampleRefreshRate[Math.round(_sampleRefreshRate.length / 2)];
                    rate = _this.REFRESH_TABLE.reduce((prev, curr) => Math.abs(curr - rate) < Math.abs(prev - rate) ? curr : prev), _this.REFRESH_RATE = rate, _this.HZ_MULTIPLIER = 60 / _this.REFRESH_RATE, _sampleRefreshRate = null
                }
            }
            _this.TIME = tsl, _this.DELTA = delta, _localTSL += delta;
            for(let i = _render.length - 1; i >= 0; i--) {
                var callback = _render[i];
                if(callback)
                    if(callback.fps) {
                        if(tsl - callback.last < 1e3 / callback.fps) continue;
                        callback(++callback.frame), callback.last = tsl
                    } else callback(tsl, delta);
                else _render.remove(callback)
            }
            for(let i = _drawFrame.length - 1; i > -1; i--) _drawFrame[i](tsl, delta);
            _this.drawFrame && _this.drawFrame(tsl, delta), _this.endFrame && _this.endFrame(tsl, delta), THREAD || _this.isPaused || rAF(render)
        }
        this.timeScaleUniform = {
            value: 1,
            type: "f",
            ignoreUIL: !0
        }, this.REFRESH_TABLE = [30, 60, 72, 90, 120, 144, 240], this.REFRESH_RATE = 60, this.HZ_MULTIPLIER = 1, THREAD || (rAF(render), setInterval(_ => _sampleRefreshRate = [], 3e3)), this.now = function() {
            return _localTSL
        }, this.start = function(callback, fps) {
            fps && (callback.fps = fps, callback.last = -1 / 0, callback.frame = -1), ~_render.indexOf(callback) || _render.unshift(callback)
        }, this.stop = function(callback) {
            _render.remove(callback)
        }, this.tick = function() {
            THREAD && (this.TIME = performance.now(), render(this.TIME))
        }, this.Worker = function(_callback, _budget = 4) {
            Inherit(this, Component);
            let _scope = this,
                _elapsed = 0;

            function loop() {
                for(; _elapsed < _budget;) {
                    if(_scope.dead) return;
                    const start = performance.now();
                    _callback && _callback(), _elapsed += performance.now() - start
                }
                _elapsed = 0
            }
            this.startRender(loop), this.stop = function() {
                this.dead = !0, this.stopRender(loop)
            }, this.pause = function() {
                this.stopRender(loop)
            }, this.resume = function() {
                this.startRender(loop)
            }
        }, this.pause = function() {
            _this.isPaused = !0
        }, this.resume = function() {
            _this.isPaused && (_this.isPaused = !1, rAF(render))
        }, this.useRAF = function(raf) {
            _last = performance.now(), (rAF = raf)(render)
        }, this.onDrawFrame = function(cb) {
            _drawFrame.push(cb)
        }, this.setTimeScale = function(v) {
            _this.timeScaleUniform.value = v
        }, this.getTimeScale = function() {
            return _this.timeScaleUniform.value
        }, this.createTimeMultiplier = function() {
            let obj = {
                value: 1
            };
            return _multipliers.push(obj), obj
        }, this.destroyTimeMultiplier = function(obj) {
            _multipliers.remove(obj)
        }, this.tweenTimeScale = function(value, time, ease, delay) {
            return tween(_this.timeScaleUniform, {
                value: value
            }, time, ease, delay, null, null, !0)
        }
    }), "Static"), Class((function Timer() {
        const _callbacks = [],
            _discard = [],
            _deferA = [],
            _deferB = [];
        var _defer = _deferA;

        function loop(t, delta) {
            for(let i = _discard.length - 1; i >= 0; i--) {
                let obj = _discard[i];
                obj.callback = null, _callbacks.remove(obj)
            }
            _discard.length && (_discard.length = 0);
            for(let i = _callbacks.length - 1; i >= 0; i--) {
                let obj = _callbacks[i];
                obj ? (obj.scaledTime ? obj.current += delta : obj.current += Render.DT, obj.current >= obj.time && (obj.callback && obj.callback(), _discard.push(obj))) : _callbacks.remove(obj)
            }
            for(let i = _defer.length - 1; i > -1; i--) _defer[i]();
            _defer.length = 0, _defer = _defer == _deferA ? _deferB : _deferA
        }
        Render.start(loop), this.__clearTimeout = function(ref) {
            const obj = function find(ref) {
                for(let i = _callbacks.length - 1; i > -1; i--)
                    if(_callbacks[i].ref == ref) return _callbacks[i]
            }(ref);
            return !!obj && (obj.callback = null, _callbacks.remove(obj), !0)
        }, this.create = function(callback, time, scaledTime) {
            if(window._NODE_) return setTimeout(callback, time);
            const obj = {
                time: Math.max(1, time || 1),
                current: 0,
                ref: Utils.timestamp(),
                callback: callback,
                scaledTime: scaledTime
            };
            return _callbacks.unshift(obj), obj.ref
        }, window.defer = this.defer = function(callback) {
            if(!callback) {
                callback = Promise.create().resolve
            }(_defer == _deferA ? _deferB : _deferA).unshift(callback)
        }
    }), "static"), Class((function Events() {
        this.events = {};
        const _e = {},
            _linked = [];
        let _emitter;
        this.events.sub = function(obj, evt, callback) {
            if("object" != typeof obj && (callback = evt, evt = obj, obj = null), !obj) return Events.emitter._addEvent(evt, callback.resolve ? callback.resolve : callback, this), callback;
            let emitter = obj.events.emitter();
            return emitter._addEvent(evt, callback.resolve ? callback.resolve : callback, this), emitter._saveLink(this), _linked.push(emitter), callback
        }, this.events.unsub = function(obj, evt, callback) {
            if("object" != typeof obj && (callback = evt, evt = obj, obj = null), !obj) return Events.emitter._removeEvent(evt, callback.resolve ? callback.resolve : callback);
            obj.events.emitter()._removeEvent(evt, callback.resolve ? callback.resolve : callback)
        }, this.events.fire = function(evt, obj, isLocalOnly) {
            (obj = obj || _e).target = this, Events.emitter._check(evt), _emitter && _emitter._fireEvent(evt, obj) || isLocalOnly || Events.emitter._fireEvent(evt, obj)
        }, this.events.bubble = function(obj, evt) {
            let _this = this;
            _this.sub(obj, evt, e => _this.fire(evt, e))
        }, this.events.destroy = function() {
            return Events.emitter._destroyEvents(this), _linked && _linked.forEach(emitter => emitter._destroyEvents(this)), _emitter && _emitter.links && _emitter.links.forEach(obj => obj.events && obj.events._unlink(_emitter)), null
        }, this.events.emitter = function() {
            return _emitter || (_emitter = Events.emitter.createLocalEmitter()), _emitter
        }, this.events._unlink = function(emitter) {
            _linked.remove(emitter)
        }
    }), () => {
        Events.emitter = new function Emitter() {
            const prototype = Emitter.prototype;
            if(this.events = [], void 0 !== prototype._check) return;
            prototype._check = function(evt) {
                if(void 0 === evt) throw "Undefined event"
            }, prototype._addEvent = function(evt, callback, object) {
                this._check(evt), this.events.push({
                    evt: evt,
                    object: object,
                    callback: callback
                })
            }, prototype._removeEvent = function(eventString, callback) {
                this._check(eventString);
                let _this = this,
                    marked = !1;
                for(let i = this.events.length - 1; i >= 0; i--) this.events[i].evt == eventString && this.events[i].callback == callback && (this.events[i].markedForDeletion = !0, marked = !0);
                marked && defer(() => _this._sweepEvents())
            }, prototype._sweepEvents = function() {
                for(let i = 0; i < this.events.length; i++) this.events[i].markedForDeletion && this.events.remove(this.events[i])
            }, prototype._fireEvent = function(eventString, obj) {
                this._check && this._check(eventString), obj = obj || _e;
                let called = !1;
                for(let i = 0; i < this.events.length; i++) {
                    let evt = this.events[i];
                    evt.evt != eventString || evt.markedForDeletion || (evt.callback(obj), called = !0)
                }
                return called
            }, prototype._destroyEvents = function(object) {
                for(var i = this.events.length - 1; i >= 0; i--) this.events[i].object == object && (this.events.splice(i, 1)[0] = null)
            }, prototype._saveLink = function(obj) {
                this.links || (this.links = []), ~this.links.indexOf(obj) || this.links.push(obj)
            }, prototype.createLocalEmitter = function() {
                return new Emitter
            }
        }, Events.broadcast = Events.emitter._fireEvent, Events.VISIBILITY = "hydra_visibility", Events.HASH_UPDATE = "hydra_hash_update", Events.COMPLETE = "hydra_complete", Events.PROGRESS = "hydra_progress", Events.UPDATE = "hydra_update", Events.LOADED = "hydra_loaded", Events.END = "hydra_end", Events.FAIL = "hydra_fail", Events.SELECT = "hydra_select", Events.ERROR = "hydra_error", Events.READY = "hydra_ready", Events.RESIZE = "hydra_resize", Events.CLICK = "hydra_click", Events.HOVER = "hydra_hover", Events.MESSAGE = "hydra_message", Events.ORIENTATION = "orientation", Events.BACKGROUND = "background", Events.BACK = "hydra_back", Events.PREVIOUS = "hydra_previous", Events.NEXT = "hydra_next", Events.RELOAD = "hydra_reload", Events.UNLOAD = "hydra_unload", Events.FULLSCREEN = "hydra_fullscreen";
        const _e = {};
        Hydra.ready(() => {
            let timer;

            function updateStage() {
                Stage.width = window.innerWidth || document.body.clientWidth || document.documentElement.offsetWidth, Stage.height = window.innerHeight || document.body.clientHeight || document.documentElement.offsetHeight
            }! function() {
                let _last, _lastTime = performance.now();

                function onfocus() {
                    "focus" != _last && Events.emitter._fireEvent(Events.VISIBILITY, {
                        type: "focus"
                    }), _last = "focus"
                }

                function onblur() {
                    "blur" != _last && Events.emitter._fireEvent(Events.VISIBILITY, {
                        type: "blur"
                    }), _last = "blur"
                }
                Timer.create((function addVisibilityHandler() {
                    let hidden, eventName;
                    if([
                            ["msHidden", "msvisibilitychange"],
                            ["webkitHidden", "webkitvisibilitychange"],
                            ["hidden", "visibilitychange"]
                        ].forEach(d => {
                            void 0 !== document[d[0]] && (hidden = d[0], eventName = d[1])
                        }), !eventName) {
                        const root = "ie" == Device.browser ? document : window;
                        return root.onfocus = onfocus, void(root.onblur = onblur)
                    }
                    document.addEventListener(eventName, () => {
                        const time = performance.now();
                        time - _lastTime > 10 && (!1 === document[hidden] ? onfocus() : onblur()), _lastTime = time
                    })
                }), 250), window.onbeforeunload = _ => (Events.emitter._fireEvent(Events.UNLOAD), null)
            }(), window.Stage = window.Stage || {}, updateStage(), window.addEventListener("resize", (function() {
                clearTimeout(timer), timer = setTimeout(_ => {
                    updateStage(), Events.emitter._fireEvent(Events.RESIZE)
                }, 16)
            })), window.onorientationchange = window.onresize, defer(window.onresize)
        })
    }), Class((function Device() {
        var vid, _this = this;
        this.agent = navigator.userAgent.toLowerCase(), this.detect = function(match) {
            return this.agent.includes(match)
        }, this.touchCapable = !!navigator.maxTouchPoints, this.pixelRatio = window.devicePixelRatio, this.system = {}, this.system.retina = window.devicePixelRatio > 1, this.system.webworker = void 0 !== window.Worker, window._NODE_ || (this.system.geolocation = void 0 !== navigator.geolocation), window._NODE_ || (this.system.pushstate = void 0 !== window.history.pushState), this.system.webcam = !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia), this.system.language = window.navigator.userLanguage || window.navigator.language, this.system.webaudio = void 0 !== window.AudioContext, this.system.xr = navigator.getVRDisplays || navigator.xr, this.system.exokit = _this.detect("exokit");
        try {
            this.system.localStorage = void 0 !== window.localStorage
        } catch (e) {
            this.system.localStorage = !1
        }
        this.system.fullscreen = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled, this.system.os = _this.detect(["exokit"]) && "linux" == navigator.platform ? "magicleap" : _this.detect(["ipad", "iphone", "ios"]) || _this.detect("mac") && _this.touchCapable && Math.max(screen.width, screen.height) < 1370 ? "ios" : _this.detect(["android", "kindle"]) ? "android" : _this.detect(["blackberry"]) ? "blackberry" : _this.detect(["mac os"]) ? "mac" : _this.detect(["windows", "iemobile"]) ? "windows" : _this.detect(["linux"]) ? "linux" : "unknown", this.system.version = function() {
            try {
                if("ios" == _this.system.os) {
                    if(_this.agent.includes("intel mac")) {
                        let split = _this.agent.split("version/")[1].split(" ")[0].split(".");
                        return Number(split[0] + "." + split[1])
                    }
                    var num = _this.agent.split("os ")[1].split("_"),
                        main = num[0],
                        sub = num[1].split(" ")[0];
                    return Number(main + "." + sub)
                }
                if("android" == _this.system.os) {
                    var version = _this.agent.split("android ")[1].split(";")[0];
                    return version.length > 3 && (version = version.slice(0, -2)), "." == version.charAt(version.length - 1) && (version = version.slice(0, -1)), Number(version)
                }
                if("windows" == _this.system.os) return _this.agent.includes("rv:11") ? 11 : Number(_this.agent.split("windows phone ")[1].split(";")[0])
            } catch (e) {}
            return -1
        }(), this.system.browser = "ios" == _this.system.os ? _this.detect(["twitter", "fbios"]) ? "social" : _this.detect(["crios"]) ? "chrome" : _this.detect(["safari"]) ? "safari" : "unknown" : "android" == _this.system.os ? _this.detect(["twitter", "fb", "facebook"]) ? "social" : _this.detect(["chrome"]) ? "chrome" : _this.detect(["firefox"]) ? "firefox" : "browser" : _this.detect(["msie"]) ? "ie" : _this.detect(["trident"]) && _this.detect(["rv:"]) ? "ie" : _this.detect(["windows"]) && _this.detect(["edge"]) ? "ie" : _this.detect(["chrome"]) ? "chrome" : _this.detect(["safari"]) ? "safari" : _this.detect(["firefox"]) ? "firefox" : "unknown", this.system.browserVersion = function() {
            try {
                if("chrome" == _this.system.browser) return Number(_this.agent.split("chrome/")[1].split(".")[0]);
                if("firefox" == _this.system.browser) return Number(_this.agent.split("firefox/")[1].split(".")[0]);
                if("safari" == _this.system.browser) return Number(_this.agent.split("version/")[1].split(".")[0].split(".")[0]);
                if("ie" == _this.system.browser) return _this.detect(["msie"]) ? Number(_this.agent.split("msie ")[1].split(".")[0]) : _this.detect(["rv:"]) ? Number(_this.agent.split("rv:")[1].split(".")[0]) : Number(_this.agent.split("edge/")[1].split(".")[0])
            } catch (e) {
                return -1
            }
        }(), this.mobile = !(window._NODE_ || !("ontouchstart" in window || "onpointerdown" in window) || !_this.system.os.includes(["ios", "android", "magicleap"])) && {}, this.mobile && this.detect(["windows"]) && !this.detect(["touch"]) && (this.mobile = !1), this.mobile && (this.mobile.tablet = Math.max(window.screen ? screen.width : window.innerWidth, window.screen ? screen.height : window.innerHeight) > 1e3, this.mobile.phone = !this.mobile.tablet, this.mobile.pwa = !(!window.matchMedia || !window.matchMedia("(display-mode: standalone)").matches) || !!window.navigator.standalone, Hydra.ready(() => {
            _this.mobile.native = !(!Mobile.NativeCore || !Mobile.NativeCore.active) || !!window._AURA_
        })), this.media = {}, this.media.audio = !!document.createElement("audio").canPlayType && (_this.detect(["firefox", "opera"]) ? "ogg" : "mp3"), this.media.video = !!(vid = document.createElement("video")).canPlayType && (vid.canPlayType("video/webm;") ? "webm" : "mp4"), this.media.webrtc = !!(window.webkitRTCPeerConnection || window.mozRTCPeerConnection || window.msRTCPeerConnection || window.oRTCPeerConnection || window.RTCPeerConnection), this.graphics = {}, this.graphics.webgl = function() {
            let DISABLED = !1;
            Object.defineProperty(_this.graphics, "webgl", {
                get: () => {
                    if(DISABLED) return !1;
                    if(_this.graphics._webglContext) return _this.graphics._webglContext;
                    try {
                        const names = ["webgl2", "webgl", "experimental-webgl"],
                            canvas = document.createElement("canvas");
                        let gl;
                        for(let i = 0; i < names.length && (gl = canvas.getContext(names[i]), !gl); i++);
                        let info = gl.getExtension("WEBGL_debug_renderer_info"),
                            output = {};
                        if(info) {
                            let gpu = info.UNMASKED_RENDERER_WEBGL;
                            output.gpu = gl.getParameter(gpu).toLowerCase()
                        }
                        return output.renderer = gl.getParameter(gl.RENDERER).toLowerCase(), output.version = gl.getParameter(gl.VERSION).toLowerCase(), output.glsl = gl.getParameter(gl.SHADING_LANGUAGE_VERSION).toLowerCase(), output.extensions = gl.getSupportedExtensions(), output.webgl2 = output.version.includes(["webgl 2", "webgl2"]), output.canvas = canvas, output.context = gl, output.detect = function(matches) {
                            if(output.gpu && output.gpu.toLowerCase().includes(matches)) return !0;
                            if(output.version && output.version.toLowerCase().includes(matches)) return !0;
                            for(let i = 0; i < output.extensions.length; i++)
                                if(output.extensions[i].toLowerCase().includes(matches)) return !0;
                            return !1
                        }, _this.graphics._webglContext = output, output
                    } catch (e) {
                        return !1
                    }
                },
                set: v => {
                    !1 === v && (DISABLED = !0)
                }
            })
        }(), this.graphics.metal = function() {
            if(!window.Metal) return !1;
            let output = {};
            return output.gpu = Metal.device.getName().toLowerCase(), output.detect = function(matches) {
                return output.gpu.includes(matches)
            }, output
        }(), this.graphics.gpu = function() {
            if(!_this.graphics.webgl && !_this.graphics.metal) return !1;
            let output = {};
            return ["metal", "webgl"].forEach(name => {
                _this.graphics[name] && !output.identifier && (output.detect = _this.graphics[name].detect, output.identifier = _this.graphics[name].gpu)
            }), output
        }(), this.graphics.canvas = !!document.createElement("canvas").getContext;
        const checkForStyle = function() {
            let _tagDiv;
            return function(prop) {
                _tagDiv = _tagDiv || document.createElement("div");
                const vendors = ["Khtml", "ms", "O", "Moz", "Webkit"];
                if(prop in _tagDiv.style) return !0;
                prop = prop.replace(/^[a-z]/, val => val.toUpperCase());
                for(let i = vendors.length - 1; i >= 0; i--)
                    if(vendors[i] + prop in _tagDiv.style) return !0;
                return !1
            }
        }();
        this.styles = {}, this.styles.filter = checkForStyle("filter"), this.styles.blendMode = checkForStyle("mix-blend-mode"), this.tween = {}, this.tween.transition = checkForStyle("transition"), this.tween.css2d = checkForStyle("transform"), this.tween.css3d = checkForStyle("perspective")
    }), "Static"), Class((function Component() {
        Inherit(this, Events);
        const _this = this,
            _setters = {},
            _flags = {},
            _timers = [],
            _loops = [];

        function defineSetter(_this, prop) {
            _setters[prop] = {}, Object.defineProperty(_this, prop, {
                set: function(v) {
                    _setters[prop] && _setters[prop].s && _setters[prop].s.call(_this, v), v = null
                },
                get: function() {
                    if(_setters[prop] && _setters[prop].g) return _setters[prop].g.apply(_this)
                }
            })
        }
        this.classes = {}, this.isPlayground = function() {
            return Global.PLAYGROUND && Global.PLAYGROUND == Utils.getConstructorName(_this)
        }, this.findParent = function(type) {
            let p = _this.parent;
            for(; p;) {
                if(p._cachedName || (p._cachedName = Utils.getConstructorName(p)), p._cachedName == type) return p;
                p = p.parent
            }
        }, this.set = function(prop, callback) {
            _setters[prop] || defineSetter(this, prop), _setters[prop].s = callback
        }, this.get = function(prop, callback) {
            _setters[prop] || defineSetter(this, prop), _setters[prop].g = callback
        }, this.initClass = function(clss) {
            if(!clss) throw "unable to locate class";
            const args = [].slice.call(arguments, 1),
                child = Object.create(clss.prototype);
            if(child.parent = this, clss.apply(child, args), child.destroy) {
                const id = Utils.timestamp();
                this.classes[id] = child, this.classes[id].__id = id
            }
            if(child.element) {
                const last = arguments[arguments.length - 1];
                Array.isArray(last) && 1 == last.length && last[0] instanceof HydraObject ? last[0].add(child.element) : this.element && null !== last && this.element.add(child.element)
            }
            if(child.group) {
                const last = arguments[arguments.length - 1];
                this.group && null !== last && this.group.add(child.group)
            }
            return child
        }, this.delayedCall = function(callback, time, scaledTime) {
            const timer = Timer.create(() => {
                _this && _this.destroy && callback && callback()
            }, time, scaledTime);
            return _timers.push(timer), _timers.length > 50 && _timers.shift(), timer
        }, this.clearTimers = function() {
            for(let i = _timers.length - 1; i >= 0; i--) clearTimeout(_timers[i]);
            _timers.length = 0
        }, this.startRender = function(callback, fps) {
            for(let i = 0; i < _loops.length; i++)
                if(_loops[i].callback == callback) return;
            let flagInvisible = _ => {
                    _this._invisible || (_this._invisible = !0, _this.onInvisible && _this.onInvisible())
                },
                loop = (a, b, c, d) => {
                    let p = _this;
                    for(; p;) {
                        if(!1 === p.visible) return flagInvisible();
                        if(p.group && !1 === p.group.visible) return flagInvisible();
                        p = p.parent
                    }!1 !== _this._invisible && (_this._invisible = !1, _this.onVisible && _this.onVisible()), callback(a, b, c, d)
                };
            _loops.push({
                callback: callback,
                loop: loop
            }), Render.start(loop, fps)
        }, this.onResize = function(callback) {
            callback(), this.events.sub(Events.RESIZE, callback)
        }, this.stopRender = function(callback) {
            for(let i = 0; i < _loops.length; i++) _loops[i].callback == callback && (Render.stop(_loops[i].loop), _loops.splice(i, 1))
        }, this.clearRenders = function() {
            for(let i = 0; i < _loops.length; i++) Render.stop(_loops[i].loop);
            _loops.length = 0
        }, this.wait = function(object, key, callback) {
            const promise = Promise.create();
            if("string" == typeof object && (callback = key, key = object, object = _this), "number" == typeof object && !key) return _this.delayedCall(promise.resolve, object), promise;
            if("function" == typeof object && "function" != typeof callback) {
                let _object = object;
                object = key, key = callback, callback = _object
            }
            if(callback = callback || promise.resolve, object[key] || _this.flag(key)) callback();
            else {
                Render.start((function test() {
                    if(!object || !_this.flag) return Render.stop(test);
                    (object[key] || _this.flag(key)) && (callback(), Render.stop(test))
                }))
            }
            return promise
        }, this.flag = function(name, value, time) {
            if(void 0 === value) return _flags[name];
            _flags[name] = value, time && (clearTimeout(_flags[name + "_timer"]), _flags[name + "_timer"] = this.delayedCall(() => {
                _flags[name] = !_flags[name]
            }, time))
        }, this.destroy = function() {
            this.removeDispatch && this.removeDispatch(), this.onDestroy && this.onDestroy();
            for(let id in this.classes) {
                var clss = this.classes[id];
                clss && clss.destroy && clss.destroy()
            }
            return this.classes = null, this.clearRenders && this.clearRenders(), this.clearTimers && this.clearTimers(), this.element && window.GLUI && this.element instanceof GLUIObject && this.element.remove(), this.events && (this.events = this.events.destroy()), this.parent && this.parent.__destroyChild && this.parent.__destroyChild(this.__id), this.group && this.group._parent && this.group._parent.remove(this.group), Utils.nullObject(this)
        }, this.__destroyChild = function(name) {
            delete this.classes[name]
        }
    })), Class((function Model() {
        Inherit(this, Component), Namespace(this);
        const _this = this,
            _storage = {};
        let _data = 0,
            _triggered = 0;
        this.push = function(name, val) {
            _storage[name] = val
        }, this.pull = function(name) {
            return _storage[name]
        }, this.waitForData = this.promiseData = function(num = 1) {
            _data += num
        }, this.fulfillData = this.resolveData = function() {
            _triggered++, _triggered == _data && (_this.dataReady = !0)
        }, this.ready = function(callback) {
            let promise = Promise.create();
            return callback && promise.then(callback), _this.wait(_this, "dataReady").then(promise.resolve), promise
        }, this.initWithData = function(data) {
            for(var key in _this.STATIC_DATA = data, _this) {
                var model = _this[key],
                    init = !1;
                for(var i in data) i.toLowerCase().replace(/-/g, "") == key.toLowerCase() && (init = !0, model.init && model.init(data[i]));
                !init && model.init && model.init()
            }
            _this.init && _this.init(data)
        }, this.loadData = function(url, callback) {
            let promise = Promise.create();
            callback || (callback = promise.resolve);
            var _this = this;
            return get(url + "?" + Utils.timestamp()).then(d => {
                defer(() => {
                    _this.initWithData(d), callback(d)
                })
            }), promise
        }
    })), Class((function Modules() {
        const _modules = {},
            _constructors = {};

        function exec() {
            for(let m in _modules)
                for(let key in _modules[m]) {
                    let module = _modules[m][key];
                    module._ready || (module._ready = !0, module.exec && module.exec())
                }
        }
        defer(exec), this.Module = function(module) {
            let m = new module,
                name = module.toString().slice(0, 100).match(/function ([^\(]+)/);
            name ? (m._ready = !0, name = name[1], _modules[name] = {
                index: m
            }, _constructors[name] = module) : (_modules[m.module] || (_modules[m.module] = {}), _modules[m.module][m.path] = m)
        }, this.require = function(path) {
            let root;
            return path.includes("/") ? (root = path.split("/")[0], path = path.replace(root + "/", "")) : (root = path, path = "index"),
                function requireModule(root, path) {
                    let module = _modules[root];
                    if(!module) throw `Module ${root} not found`;
                    return module = module[path], module._ready || (module._ready = !0, module.exec && module.exec()), module
                }(root, path).exports
        }, this.getConstructor = function(name) {
            return _constructors[name]
        }, window.Module = this.Module, window._NODE_ || (window.requireNative = window.require, window.require = this.require)
    }), "Static"), Class((function LinkedList() {
        var prototype = LinkedList.prototype;
        this.length = 0, this.first = null, this.last = null, this.current = null, this.prev = null, void 0 === prototype.push && (prototype.push = function(obj) {
            this.first ? (obj.__next = this.first, obj.__prev = this.last, this.last.__next = obj, this.last = obj) : (this.first = obj, this.last = obj, obj.__prev = obj, obj.__next = obj), this.length++
        }, prototype.remove = function(obj) {
            obj && obj.__next && (this.length <= 1 ? this.empty() : (obj == this.first ? (this.first = obj.__next, this.last.__next = this.first, this.first.__prev = this.last) : obj == this.last ? (this.last = obj.__prev, this.last.__next = this.first, this.first.__prev = this.last) : (obj.__prev.__next = obj.__next, obj.__next.__prev = obj.__prev), this.length--), obj.__prev = null, obj.__next = null)
        }, prototype.empty = function() {
            this.first = null, this.last = null, this.current = null, this.prev = null, this.length = 0
        }, prototype.start = function() {
            return this.current = this.first, this.prev = this.current, this.current
        }, prototype.next = function() {
            if(this.current && (this.current = this.current.__next, 1 != this.length && this.prev.__next != this.first)) return this.prev = this.current, this.current
        }, prototype.destroy = function() {
            return Utils.nullObject(this), null
        })
    })), Class((function ObjectPool(_type, _number = 10) {
        var _pool = [];
        this.array = _pool,
            function() {
                if(_type)
                    for(var i = 0; i < _number; i++) _pool.push(new _type)
            }(), this.get = function() {
                return _pool.shift() || (_type ? new _type : null)
            }, this.empty = function() {
                _pool.length = 0
            }, this.put = function(obj) {
                obj && _pool.push(obj)
            }, this.insert = function(array) {
                void 0 === array.push && (array = [array]);
                for(var i = 0; i < array.length; i++) _pool.push(array[i])
            }, this.length = function() {
                return _pool.length
            }, this.randomize = function() {
                let array = _pool;
                for(let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]]
                }
            }, this.destroy = function() {
                for(let i = _pool.length - 1; i >= 0; i--) _pool[i].destroy && _pool[i].destroy();
                return _pool = null
            }
    })), Class((function Gate() {
        var _list = [],
            _map = {};
        this.create = function(name) {
            let promise = Promise.create();
            name ? _map[name] = promise : _list.push(promise)
        }, this.open = function(name) {
            name && (_map[name] || (_map[name] = Promise.create()), _map[name].resolve());
            let promise = _list.shift();
            promise && promise.resolve()
        }, this.wait = function(name) {
            return _list.length || name ? name ? (_map[name] || (_map[name] = Promise.create()), _map[name]) : _list[_list.length - 1] || Promise.resolve() : Promise.resolve()
        }
    }), "static"), Class((function Assets() {
        const _this = this;

        function AssetList(arr) {
            return arr.__proto__ = AssetList.prototype, arr
        }
        this.__loaded = [], this.FLIPY = !0, this.CDN = "", this.CORS = null, this.IMAGES = {}, this.SDF = {}, this.JSON = {
            push: function(prop, value) {
                this[prop] = value, Object.defineProperty(this, prop, {
                    get: () => JSON.parse(JSON.stringify(value))
                })
            }
        }, Object.defineProperty(this.JSON, "push", {
            enumerable: !1,
            writable: !0
        }), this.SVG = {}, AssetList.prototype = new Array, AssetList.prototype.filter = function(items) {
            for(let i = this.length - 1; i >= 0; i--) this[i].includes(items) || this.splice(i, 1);
            return this
        }, AssetList.prototype.exclude = function(items) {
            for(let i = this.length - 1; i >= 0; i--) this[i].includes(items) && this.splice(i, 1);
            return this
        }, AssetList.prototype.prepend = function(prefix) {
            for(let i = this.length - 1; i >= 0; i--) this[i] = prefix + this[i];
            return this
        }, AssetList.prototype.append = function(suffix) {
            for(let i = this.length - 1; i >= 0; i--) this[i] = this[i] + suffix;
            return this
        }, this.list = function() {
            return window.ASSETS || console.warn("ASSETS list not available"), new AssetList(window.ASSETS.slice(0) || [])
        }, this.getPath = function(path) {
            return ~path.indexOf("//") ? path : (path = function parseResolution(path) {
                if(!window.ASSETS || !ASSETS.RES) return path;
                var res = ASSETS.RES[path],
                    ratio = Math.min(Device.pixelRatio, 3);
                if(!res) return path;
                if(!res["x" + ratio]) return path;
                var split = path.split("/"),
                    file = split[split.length - 1];
                return split = file.split("."), path.replace(file, split[0] + "-" + ratio + "x." + split[1])
            }(path), this.CDN && !~path.indexOf(this.CDN) && (path = this.CDN + path), path)
        }, this.loadImage = function(path, isStore) {
            var img = new Image;
            return img.crossOrigin = this.CORS, img.src = _this.getPath(path), img.loadPromise = function() {
                let promise = Promise.create();
                return img.onload = promise.resolve, promise
            }, isStore && (this.IMAGES[path] = img), img
        }, this.decodeImage = function(path, params) {
            let promise = Promise.create(),
                img = _this.loadImage(path);
            return img.onload = () => promise.resolve(img), img.onerror = () => promise.reject(), promise
        }
    }), "static"), Class((function AssetLoader(_assets, _callback, ASSETS = Assets) {
        Inherit(this, Events);
        const _this = this;
        let _total = _assets.length,
            _loaded = 0,
            _lastFiredPercent = 0;

        function loadAsset() {
            let path = _assets.splice(_assets.length - 1, 1)[0];
            const name = path.split("assets/").last().split(".")[0],
                ext = path.split(".").last().split("?")[0].toLowerCase();
            let timeout = Timer.create(timedOut, AssetLoader.TIMEOUT, path);
            if(!Assets.preventCache && ~Assets.__loaded.indexOf(path)) return loaded();
            if(ext.includes(["jpg", "jpeg", "png", "gif"])) {
                let image = ASSETS.loadImage(path);
                return image.complete ? loaded() : (image.onload = loaded, void(image.onerror = loaded))
            }
            if(window.AURA && window.AURA.import && "js" == ext) return AURA.import(path), void loaded();

            function loaded() {
                timeout && clearTimeout(timeout), increment(), _assets.length && loadAsset()
            }
            get(Assets.getPath(path), Assets.HEADERS).then(data => {
                Assets.__loaded.push(path), "json" == ext && ASSETS.JSON.push(name, data), "svg" == ext && (ASSETS.SVG[name] = data), "fnt" == ext && (ASSETS.SDF[name.split("/")[1]] = data), "js" == ext && window.eval(data), ext.includes(["fs", "vs", "glsl"]) && window.Shaders && Shaders.parse(data, path), loaded()
            }).catch(e => {
                console.warn(e), loaded()
            })
        }

        function increment() {
            let percent = Math.max(_lastFiredPercent, Math.min(1, ++_loaded / _total));
            _this.events.fire(Events.PROGRESS, {
                percent: percent
            }), _lastFiredPercent = percent, _loaded >= _total && defer(complete)
        }

        function complete() {
            _this.completed || (_this.completed = !0, defer(() => {
                _callback && _callback(), _this.events.fire(Events.COMPLETE)
            }))
        }

        function timedOut(path) {
            console.warn("Asset timed out", path)
        }! function() {
            if(!Array.isArray(_assets)) throw "AssetLoader requires array of assets to load";
            _assets = _assets.slice(0).reverse(),
                function init() {
                    if(!_assets.length) return complete();
                    for(let i = 0; i < AssetLoader.SPLIT; i++) _assets.length && loadAsset()
                }()
        }(), this.loadModules = function() {
            if(!window._BUILT_ || window.AURA) return;
            this.add(1);
            let module = window._ES5_ ? "es5-modules" : "modules",
                s = document.createElement("script");
            return s.src = "assets/js/" + module + ".js?" + window._CACHE_, s.async = !0, document.head.appendChild(s), AssetLoader.waitForLib("_MODULES_").then(_ => _this.trigger(1))
        }, this.add = function(num) {
            _total += num || 1
        }, this.trigger = function(num) {
            for(let i = 0; i < (num || 1); i++) increment()
        }
    }), () => {
        AssetLoader.SPLIT = 2, AssetLoader.TIMEOUT = 5e3, AssetLoader.loadAllAssets = function(callback) {
            let promise = Promise.create();
            return callback || (callback = promise.resolve), promise.loader = new AssetLoader(Assets.list(), () => {
                callback && callback(), promise.loader && promise.loader.destroy && (promise.loader = promise.loader.destroy())
            }), promise
        }, AssetLoader.loadAssets = function(list, callback) {
            let promise = Promise.create();
            return callback || (callback = promise.resolve), promise.loader = new AssetLoader(list, () => {
                callback && callback(), promise.loader && promise.loader.destroy && (promise.loader = promise.loader.destroy())
            }), promise
        }, AssetLoader.waitForLib = function(name, callback) {
            let promise = Promise.create();
            return callback || (callback = promise.resolve), Render.start((function check() {
                window[name] && (Render.stop(check), callback && callback())
            })), promise
        }, AssetLoader.waitForModules = function() {
            return AssetLoader.waitForLib(window._BUILT_ ? "_MODULES_" : "zUtils3D")
        }
    }), Hydra.ready((function() {
        window.__window = $(window), window.__document = $(document), window.__body = $(document.getElementsByTagName("body")[0]), window.Stage = window.Stage && window.Stage.style ? $(window.Stage) : __body.create("#Stage"), Stage.size("100%"), Stage.__useFragment = !0, Stage.width = window.innerWidth || document.body.clientWidth || document.documentElement.offsetWidth, Stage.height = window.innerHeight || document.body.clientHeight || document.documentElement.offsetHeight
    })), Class((function CSS() {
        var _obj, _style, _needsUpdate, _this = this;

        function objToCSS(key) {
            var match = key.match(/[A-Z]/),
                camelIndex = match ? match.index : null;
            if(camelIndex) {
                var start = key.slice(0, camelIndex),
                    end = key.slice(camelIndex);
                key = start + "-" + end.toLowerCase()
            }
            return key
        }

        function cssToObj(key) {
            var match = key.match(/\-/),
                camelIndex = match ? match.index : null;
            if(camelIndex) {
                var start = key.slice(0, camelIndex),
                    end = key.slice(camelIndex).slice(1),
                    letter = end.charAt(0);
                end = end.slice(1), key = start + (end = letter.toUpperCase() + end)
            }
            return key
        }

        function setHTML() {
            _obj.innerHTML = _style, _needsUpdate = !1
        }
        Hydra.ready((function() {
            _style = "", (_obj = document.createElement("style")).type = "text/css", document.getElementsByTagName("head")[0].appendChild(_obj)
        })), this._read = function() {
            return _style
        }, this._write = function(css) {
            _style = css, _needsUpdate || (_needsUpdate = !0, defer(setHTML))
        }, this.style = function(selector, obj) {
            var s = selector + " {";
            for(var key in obj) {
                var prop = objToCSS(key),
                    val = obj[key];
                "string" != typeof val && "opacity" != key && (val += "px"), s += prop + ":" + val + "!important;"
            }
            s += "}", _this._write(_style + s)
        }, this.get = function(selector, prop) {
            for(var values = new Object, string = _obj.innerHTML.split(selector + " {"), i = 0; i < string.length; i++) {
                var str = string[i];
                if(str.length) {
                    var split = str.split("!important;");
                    for(var j in split)
                        if(split[j].includes(":")) {
                            var fsplit = split[j].split(":");
                            "px" == fsplit[1].slice(-2) && (fsplit[1] = Number(fsplit[1].slice(0, -2))), values[cssToObj(fsplit[0])] = fsplit[1]
                        }
                }
            }
            return prop ? values[prop] : values
        }, this.textSize = function($obj) {
            var $clone = $obj.clone();
            $clone.css({
                position: "relative",
                cssFloat: "left",
                styleFloat: "left",
                marginTop: -99999,
                width: "",
                height: ""
            }), __body.addChild($clone);
            var width = $clone.div.offsetWidth,
                height = $clone.div.offsetHeight;
            return $clone.remove(), {
                width: width,
                height: height
            }
        }, this.prefix = function(style) {
            return "" == _this.styles.vendor ? style.charAt(0).toLowerCase() + style.slice(1) : _this.styles.vendor + style
        }, this._toCSS = objToCSS
    }), "Static"), Class((function HydraObject(_selector, _type, _exists, _useFragment) {
        this._children = new LinkedList, this.__useFragment = _useFragment, this._initSelector(_selector, _type, _exists)
    }), () => {
        var prototype = HydraObject.prototype;
        prototype._initSelector = function(_selector, _type, _exists) {
            if(_selector && "string" != typeof _selector) this.div = _selector;
            else {
                var first = _selector ? _selector.charAt(0) : null,
                    name = _selector ? _selector.slice(1) : null;
                if("." != first && "#" != first && (name = _selector, first = "."), _exists) {
                    if("#" != first) throw "Hydra Selectors Require #ID";
                    this.div = document.getElementById(name)
                } else this._type = _type || "div", "svg" == this._type ? (this.div = document.createElementNS("http://www.w3.org/2000/svg", this._type), this.div.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink")) : (this.div = document.createElement(this._type), first && ("#" == first ? this.div.id = name : this.div.className = name))
            }
            this.div.hydraObject = this
        }, prototype.add = function(child) {
            var div = this.div,
                _this = this,
                createFrag = function() {
                    _this.__useFragment && (_this._fragment || (_this._fragment = document.createDocumentFragment(), defer((function() {
                        if(!_this._fragment || !_this.div) return _this._fragment = null;
                        _this.div.appendChild(_this._fragment), _this._fragment = null
                    }))), div = _this._fragment)
                };
            return child.element && child.element instanceof HydraObject ? (createFrag(), div.appendChild(child.element.div), this._children.push(child.element), child.element._parent = this, child.element.div.parentNode = this.div) : child.div ? (createFrag(), div.appendChild(child.div), this._children.push(child), child._parent = this, child.div.parentNode = this.div) : child.nodeName && (createFrag(), div.appendChild(child), child.parentNode = this.div), this
        }, prototype.clone = function() {
            return $(this.div.cloneNode(!0))
        }, prototype.create = function(name, type) {
            var $obj = $(name, type);
            return this.add($obj), $obj
        }, prototype.empty = function() {
            for(var child = this._children.start(); child;) child && child.remove && child.remove(), child = this._children.next();
            return this.div.innerHTML = "", this
        }, prototype.parent = function() {
            return this._parent
        }, prototype.children = function() {
            return this.div.children ? this.div.children : this.div.childNodes
        }, prototype.removeChild = function(object, keep) {
            try {
                object.div.parentNode.removeChild(object.div)
            } catch (e) {}
            keep || this._children.remove(object)
        }, prototype.remove = prototype.destroy = function() {
            this.removed = !0;
            var parent = this._parent;
            parent && !parent.removed && parent.removeChild && parent.removeChild(this, !0);
            for(var child = this._children.start(); child;) child && child.remove && child.remove(), child = this._children.next();
            this._children.destroy(), this.div.hydraObject = null, Utils.nullObject(this)
        }, window.$ = function(selector, type, exists) {
            return new HydraObject(selector, type, exists)
        }, $.fn = HydraObject.prototype
    }), $.fn.text = function(text) {
        return void 0 !== text ? (this.__cacheText != text && (this.div.textContent = text), this.__cacheText = text, this) : this.div.textContent
    }, $.fn.html = function(text, force) {
        return !text || text.includes("<") || force ? void 0 !== text ? (this.div.innerHTML = text, this) : this.div.innerHTML : this.text(text)
    }, $.fn.hide = function() {
        return this.div.style.display = "none", this
    }, $.fn.show = function() {
        return this.div.style.display = "", this
    }, $.fn.visible = function() {
        return this.div.style.visibility = "visible", this
    }, $.fn.invisible = function() {
        return this.div.style.visibility = "hidden", this
    }, $.fn.setZ = function(z) {
        return this.div.style.zIndex = z, this
    }, $.fn.clearAlpha = function() {
        return this.div.style.opacity = "", this
    }, $.fn.size = function(w, h, noScale) {
        return "string" == typeof w ? (void 0 === h ? h = "100%" : "string" != typeof h && (h += "px"), this.div.style.width = w, this.div.style.height = h) : (this.div.style.width = w + "px", this.div.style.height = h + "px", noScale || (this.div.style.backgroundSize = w + "px " + h + "px")), this.width = w, this.height = h, this
    }, $.fn.mouseEnabled = function(bool) {
        return this.div.style.pointerEvents = bool ? "auto" : "none", this
    }, $.fn.fontStyle = function(family, size, color, style) {
        var font = {};
        return family && (font.fontFamily = family), size && (font.fontSize = size), color && (font.color = color), style && (font.fontStyle = style), this.css(font), this
    }, $.fn.font = function(font) {
        return this.css("font", font), this
    }, $.fn.bg = function(src, x, y, repeat) {
        return src ? (src.includes(".") && (src = Assets.getPath(src)), src.includes(".") ? this.div.style.backgroundImage = "url(" + src + ")" : this.div.style.backgroundColor = src, void 0 !== x && (x = "number" == typeof x ? x + "px" : x, y = "number" == typeof y ? y + "px" : y, this.div.style.backgroundPosition = x + " " + y), repeat && (this.div.style.backgroundSize = "", this.div.style.backgroundRepeat = repeat), "cover" != x && "contain" != x || (this.div.style.backgroundSize = x, this.div.style.backgroundPosition = void 0 !== y ? y + " " + repeat : "center"), this) : this
    }, $.fn.center = function(x, y, noPos) {
        var css = {};
        return void 0 === x ? (css.left = "50%", css.top = "50%", css.marginLeft = -this.width / 2, css.marginTop = -this.height / 2) : (x && (css.left = "50%", css.marginLeft = -this.width / 2), y && (css.top = "50%", css.marginTop = -this.height / 2)), noPos && (delete css.left, delete css.top), this.css(css), this
    }, $.fn.max = function(width, height) {
        let w, h;
        return void 0 !== width && (w = "number" == typeof width ? width + "px" : width, this.div.style.maxWidth = w), void 0 !== height ? (h = "number" == typeof height ? height + "px" : height, this.div.style.maxHeight = h) : (h = w, this.div.style.maxHeight = h), this
    }, $.fn.min = function(width, height) {
        let w, h;
        return void 0 !== width && (w = "number" == typeof width ? width + "px" : width, this.div.style.minWidth = w), void 0 !== height ? (h = "number" == typeof height ? height + "px" : height, this.div.style.minHeight = h) : (h = w, this.div.style.minHeight = h), this
    }, $.fn.flex = function(inline) {
        return this.div.style.display = inline ? "inline-flex" : "flex", this.div.style.justifyContent = "center", this.div.style.alignItems = "center", this.div.classList.add("relative-children"), this
    }, $.fn.order = function(opts = {}) {
        let s = this.div.style;
        return "none" === opts.flexWrap && (opts.flexWrap = "nowrap"), opts.direction && (s.flexDirection = opts.direction), opts.wrap && (s.flexWrap = opts.wrap), opts.order && (s.order = opts.order), this
    }, $.fn.align = function(opts = {}) {
        let s = this.div.style;

        function flex(str, contentMode = !1) {
            return "start" === str ? "flex-start" : "end" === str ? "flex-end" : "between" === str ? contentMode ? "space-between" : "flex-between" : "around" === str ? contentMode ? "space-around" : "flex-around" : "none" === str ? "nowrap" : str
        }
        return opts.justify && (s.justifyContent = flex(opts.justify)), opts.items && (s.alignItems = flex(opts.items)), opts.self && (s.alignSelf = flex(opts.self)), opts.content && (s.alignContent = flex(opts.content, !0)), this
    }, $.fn.flexibility = function(opts = {}) {
        let s = this.div.style;
        return "undefined" !== opts.grow && (s.flexGrow = opts.grow), "undefined" !== opts.shrink && (s.flexGrow = opts.shrink), void 0 !== opts.basis && (s.flexBasis = "number" == typeof opts.basis ? opts.basis + "px" : opts.basis), this
    }, $.fn.mask = function(arg) {
        let maskPrefix = "Moz" === CSS.styles.vendor ? "mask" : CSS.prefix("Mask");
        return this.div.style[maskPrefix] = (arg.includes(".") ? "url(" + arg + ")" : arg) + " no-repeat", this.div.style[maskPrefix + "Size"] = "contain", this
    }, $.fn.blendMode = function(mode, bg) {
        return bg ? this.div.style["background-blend-mode"] = mode : this.div.style["mix-blend-mode"] = mode, this
    }, $.fn.css = function(obj, value) {
        if("boolean" == typeof value && (value = null), "object" != typeof obj) {
            if(value) return this.div.style[obj] = value, this;
            var style = this.div.style[obj];
            if("number" != typeof style) {
                if(!style) return !1;
                style.includes("px") && (style = Number(style.slice(0, -2))), "opacity" == obj && (style = isNaN(Number(this.div.style.opacity)) ? 1 : Number(this.div.style.opacity))
            }
            return style || (style = 0), style
        }
        for(var type in TweenManager._clearCSSTween(this), obj) {
            var val = obj[type];
            "string" != typeof val && "number" != typeof val || ("string" != typeof val && "opacity" != type && "zIndex" != type && (val += "px"), this.div.style[type] = val)
        }
        return this
    }, $.fn.transform = function(props) {
        if(!(this.multiTween && this.cssTweens && this._cssTweens.length > 1 && this.__transformTime && Render.TIME - this.__transformTime < 15)) {
            if(this.__transformTime = Render.TIME, TweenManager._clearCSSTween(this), Device.tween.css2d) {
                if(props)
                    for(var key in props) "number" == typeof props[key] && (this[key] = props[key]);
                else props = this;
                var transformString = TweenManager._parseTransform(props);
                this.__transformCache != transformString && (this.div.style[CSS.styles.vendorTransform] = transformString, this.__transformCache = transformString)
            }
            return this
        }
    }, $.fn.willChange = function(props) {
        if("boolean" == typeof props) this._willChangeLock = !0 === props;
        else if(this._willChangeLock) return;
        var string = "string" == typeof props;
        this._willChange && !string || "null" == typeof props ? (this._willChange = !1, this.div.style["will-change"] = "") : (this._willChange = !0, this.div.style["will-change"] = string ? props : CSS.transformProperty + ", opacity")
    }, $.fn.backfaceVisibility = function(visible) {
        this.div.style[CSS.prefix("BackfaceVisibility")] = visible ? "visible" : "hidden"
    }, $.fn.enable3D = function(perspective, x, y) {
        return Device.tween.css3d ? (this.div.style[CSS.prefix("TransformStyle")] = "preserve-3d", perspective && (this.div.style[CSS.prefix("Perspective")] = perspective + "px"), void 0 !== x && (x = "number" == typeof x ? x + "px" : x, y = "number" == typeof y ? y + "px" : y, this.div.style[CSS.prefix("PerspectiveOrigin")] = x + " " + y), this) : this
    }, $.fn.disable3D = function() {
        return this.div.style[CSS.prefix("TransformStyle")] = "", this.div.style[CSS.prefix("Perspective")] = "", this
    }, $.fn.transformPoint = function(x, y, z) {
        var origin = "";
        return void 0 !== x && (origin += "number" == typeof x ? x + "px " : x + " "), void 0 !== y && (origin += "number" == typeof y ? y + "px " : y + " "), void 0 !== z && (origin += "number" == typeof z ? z + "px" : z), this.div.style[CSS.prefix("TransformOrigin")] = origin, this
    }, $.fn.tween = function(props, time, ease, delay, callback, manual) {
        "boolean" == typeof delay ? (manual = delay, delay = 0, callback = null) : "function" == typeof delay && (callback = delay, delay = 0), "boolean" == typeof callback && (manual = callback, callback = null), delay || (delay = 0);
        var usePromise = null;
        callback && callback instanceof Promise && (usePromise = callback, callback = callback.resolve);
        var tween = TweenManager._detectTween(this, props, time, ease, delay, callback, manual);
        return usePromise || tween
    }, $.fn.clearTransform = function() {
        return "number" == typeof this.x && (this.x = 0), "number" == typeof this.y && (this.y = 0), "number" == typeof this.z && (this.z = 0), "number" == typeof this.scale && (this.scale = 1), "number" == typeof this.scaleX && (this.scaleX = 1), "number" == typeof this.scaleY && (this.scaleY = 1), "number" == typeof this.rotation && (this.rotation = 0), "number" == typeof this.rotationX && (this.rotationX = 0), "number" == typeof this.rotationY && (this.rotationY = 0), "number" == typeof this.rotationZ && (this.rotationZ = 0), "number" == typeof this.skewX && (this.skewX = 0), "number" == typeof this.skewY && (this.skewY = 0), this.div.style[CSS.styles.vendorTransform] = "", this
    }, $.fn.clearTween = function() {
        return this._cssTween && this._cssTween.stop(), this._mathTween && this._mathTween.stop(), this
    }, $.fn.stopTween = function() {
        return console.warn(".stopTween deprecated. use .clearTween instead"), this.clearTween()
    }, $.fn.keypress = function(callback) {
        this.div.onkeypress = function(e) {
            (e = e || window.event).code = e.keyCode ? e.keyCode : e.charCode, callback && callback(e)
        }
    }, $.fn.keydown = function(callback) {
        this.div.onkeydown = function(e) {
            (e = e || window.event).code = e.keyCode, callback && callback(e)
        }
    }, $.fn.keyup = function(callback) {
        this.div.onkeyup = function(e) {
            (e = e || window.event).code = e.keyCode, callback && callback(e)
        }
    }, $.fn.attr = function(attr, value) {
        if(attr && value) "" == value ? this.div.removeAttribute(attr) : this.div.setAttribute(attr, value);
        else if(attr) return this.div.getAttribute(attr);
        return this
    }, $.fn.val = function(value) {
        return void 0 === value ? this.div.value : (this.div.value = value, this)
    }, $.fn.change = function(callback) {
        var _this = this;
        "select" == this._type && (this.div.onchange = function() {
            callback({
                object: _this,
                value: _this.div.value || ""
            })
        })
    }, $.fn.svgSymbol = function(id, width, height) {
        var config = SVG.getSymbolConfig(id),
            svgHTML = '<svg viewBox="0 0 ' + config.width + " " + config.height + '" width="' + width + '" height="' + height + '"><use xlink:href="#' + config.id + '" x="0" y="0" /></svg>';
        this.html(svgHTML, !0)
    }, $.fn.overflowScroll = function(dir) {
        var x = !!dir.x,
            y = !!dir.y,
            overflow = {};
        (!x && !y || x && y) && (overflow.overflow = "auto"), !x && y && (overflow.overflowY = "auto", overflow.overflowX = "hidden"), x && !y && (overflow.overflowX = "auto", overflow.overflowY = "hidden"), Device.mobile && (overflow["-webkit-overflow-scrolling"] = "touch", Mobile._addOverflowScroll(this)), this.css(overflow)
    }, $.fn.removeOverflowScroll = function() {
        this.css({
            overflow: "hidden",
            overflowX: "",
            overflowY: "",
            "-webkit-overflow-scrolling": ""
        }), Device.mobile && Mobile._removeOverflowScroll(this)
    }, $.fn.accessible = function(type = "label", tabIndex = -1) {
        switch (tabIndex > -1 && this.attr("tabindex", tabIndex), type) {
            case "label":
                this.attr("aria-label", this.div.textContent);
                break;
            case "hidden":
                this.attr("aria-hidden", !0)
        }
    }, $.fn.tabIndex = function(tabIndex) {
        this.attr("tabindex", tabIndex)
    },
    function() {
        var windowsPointer = !!window.MSGesture,
            translateEvent = function(evt) {
                if(windowsPointer) switch (evt) {
                    case "touchstart":
                        return "pointerdown";
                    case "touchmove":
                        return "MSGestureChange";
                    case "touchend":
                        return "pointerup"
                }
                return evt
            },
            convertTouchEvent = function(e) {
                var touchEvent = {
                    x: 0,
                    y: 0
                };
                if(e.windowsPointer) return e;
                if(!e) return touchEvent;
                if(e.touches || e.changedTouches ? e.touches.length ? (touchEvent.x = e.touches[0].pageX, touchEvent.y = e.touches[0].pageY) : (touchEvent.x = e.changedTouches[0].pageX, touchEvent.y = e.changedTouches[0].pageY) : (touchEvent.x = e.pageX, touchEvent.y = e.pageY), Mobile.ScreenLock && Mobile.ScreenLock.isActive && Mobile.orientationSet && Mobile.orientation !== Mobile.orientationSet) {
                    if(90 == window.orientation || 0 === window.orientation) {
                        var x = touchEvent.y;
                        touchEvent.y = touchEvent.x, touchEvent.x = Stage.width - x
                    }
                    if(-90 == window.orientation || 180 === window.orientation) {
                        var y = touchEvent.x;
                        touchEvent.x = touchEvent.y, touchEvent.y = Stage.height - y
                    }
                }
                return touchEvent
            };
        $.fn.click = function(callback) {
            var _this = this;
            return this.div.addEventListener(translateEvent("click"), (function click(e) {
                return !!_this.div && (!Mouse._preventClicks && (e.object = "hit" == _this.div.className ? _this.parent() : _this, e.action = "click", e.pageX || (e.pageX = e.clientX, e.pageY = e.clientY), callback && callback(e), void(Mouse.autoPreventClicks && Mouse.preventClicks())))
            }), !0), this.div.style.cursor = "pointer", this
        }, $.fn.hover = function(callback) {
            var _time, _this = this,
                _over = !1;

            function hover(e) {
                if(!_this.div) return !1;
                var time = performance.now(),
                    original = e.toElement || e.relatedTarget;
                if(_time && time - _time < 5) return _time = time, !1;
                switch (_time = time, e.object = "hit" == _this.div.className ? _this.parent() : _this, e.type) {
                    case "mouseout":
                    case "mouseleave":
                        e.action = "out";
                        break;
                    default:
                        e.action = "over"
                }
                if(_over) {
                    if(Mouse._preventClicks) return !1;
                    if("over" == e.action) return !1;
                    if("out" == e.action && function isAChild(div, object) {
                            for(var len = div.children.length - 1, i = len; i > -1; i--)
                                if(object == div.children[i]) return !0;
                            for(i = len; i > -1; i--)
                                if(isAChild(div.children[i], object)) return !0
                        }(_this.div, original)) return !1;
                    _over = !1
                } else {
                    if("out" == e.action) return !1;
                    _over = !0
                }
                e.pageX || (e.pageX = e.clientX, e.pageY = e.clientY), callback && callback(e)
            }
            return this.div.addEventListener(translateEvent("mouseover"), hover, !0), this.div.addEventListener(translateEvent("mouseout"), hover, !0), this
        }, $.fn.press = function(callback) {
            var _this = this;

            function press(e) {
                if(!_this.div) return !1;
                switch (e.object = "hit" == _this.div.className ? _this.parent() : _this, e.type) {
                    case "mousedown":
                        e.action = "down";
                        break;
                    default:
                        e.action = "up"
                }
                e.pageX || (e.pageX = e.clientX, e.pageY = e.clientY), callback && callback(e)
            }
            return this.div.addEventListener(translateEvent("mousedown"), press, !0), this.div.addEventListener(translateEvent("mouseup"), press, !0), this
        }, $.fn.bind = function(evt, callback) {
            if(this._events = this._events || {}, windowsPointer && this == __window) return Stage.bind(evt, callback);
            "touchstart" == evt ? Device.mobile || (Device.touchCapable ? this.bind("mousedown", callback) : evt = "mousedown") : "touchmove" == evt ? (Device.mobile || (Device.touchCapable ? this.bind("mousemove", callback) : evt = "mousemove"), windowsPointer && !this.div.msGesture && (this.div.msGesture = new MSGesture, this.div.msGesture.target = this.div)) : "touchend" == evt && (Device.mobile || (Device.touchCapable ? this.bind("mouseup", callback) : evt = "mouseup")), this._events["bind_" + evt] = this._events["bind_" + evt] || [];
            var _events = this._events["bind_" + evt],
                e = {},
                target = this.div;

            function touchEvent(e) {
                windowsPointer && target.msGesture && "touchstart" == evt && target.msGesture.addPointer(e.pointerId), Device.mobile || "touchstart" != evt || e.preventDefault();
                var touch = convertTouchEvent(e);
                if(windowsPointer) {
                    var windowsEvt = e;
                    (e = {}).x = Number(windowsEvt.pageX || windowsEvt.clientX), e.y = Number(windowsEvt.pageY || windowsEvt.clientY), e.target = windowsEvt.target, e.currentTarget = windowsEvt.currentTarget, e.path = [];
                    for(var node = e.target; node;) e.path.push(node), node = node.parentElement || null;
                    e.windowsPointer = !0
                } else e.x = touch.x, e.y = touch.y;
                for(var i = 0; i < _events.length; i++) {
                    var ev = _events[i];
                    ev.target == e.currentTarget && ev.callback(e)
                }
            }
            return e.callback = callback, e.target = this.div, _events.push(e), this._events["fn_" + evt] || (this._events["fn_" + evt] = touchEvent, this.div.addEventListener(translateEvent(evt), touchEvent, {
                capture: !0,
                passive: !1
            })), this
        }, $.fn.unbind = function(evt, callback) {
            if(this._events = this._events || {}, windowsPointer && this == __window) return Stage.unbind(evt, callback);
            "touchstart" == evt ? Device.mobile || (Device.touchCapable ? this.unbind("mousedown", callback) : evt = "mousedown") : "touchmove" == evt ? Device.mobile || (Device.touchCapable ? this.unbind("mousemove", callback) : evt = "mousemove") : "touchend" == evt && (Device.mobile || (Device.touchCapable ? this.unbind("mouseup", callback) : evt = "mouseup"));
            var _events = this._events["bind_" + evt];
            if(!_events) return this;
            for(var i = 0; i < _events.length; i++) {
                _events[i].callback == callback && _events.splice(i, 1)
            }
            return this._events["fn_" + evt] && !_events.length && (this.div.removeEventListener(translateEvent(evt), this._events["fn_" + evt], !Device.mobile || {
                passive: !0
            }), this._events["fn_" + evt] = null), this
        }, $.fn.interact = function(overCallback, clickCallback, seoLink, seoText) {
            this.hit || (this.hit = $(".hit", seoLink ? "a" : void 0), this.hit.css({
                width: "100%",
                height: "100%",
                zIndex: 99999,
                top: 0,
                left: 0,
                position: "absolute"
            }), this.add(this.hit), seoLink && (this.hit.attr("href", Hydra.absolutePath(seoLink)), this.hit.text(seoText || this.div.textContent), this.hit.css({
                fontSize: 0
            }), this.hit.accessible(), this.hit.div.onfocus = _ => overCallback({
                action: "over"
            }), this.hit.div.onblur = _ => overCallback({
                action: "out"
            }), this.hit.div.onclick = e => {
                e.preventDefault(), clicked(e)
            }));
            let time = Render.TIME;

            function clicked(e) {
                clickCallback && Render.TIME - time > 100 && clickCallback(e), time = Render.TIME
            }
            Device.mobile ? this.hit.touchClick(overCallback, clicked).click(clicked) : this.hit.hover(overCallback).click(clicked)
        }, $.fn.touchSwipe = function(callback, distance) {
            if(!window.addEventListener) return this;
            var _startX, _startY, _this = this,
                _distance = distance || 75,
                _moving = !1,
                _move = {};

            function touchMove(e) {
                if(!_this.div) return !1;
                if(_moving) {
                    var touch = convertTouchEvent(e),
                        dx = _startX - touch.x,
                        dy = _startY - touch.y;
                    _move.direction = null, _move.moving = null, _move.x = null, _move.y = null, _move.evt = e, Math.abs(dx) >= _distance ? (touchEnd(), _move.direction = dx > 0 ? "left" : "right") : Math.abs(dy) >= _distance ? (touchEnd(), _move.direction = dy > 0 ? "up" : "down") : (_move.moving = !0, _move.x = dx, _move.y = dy), callback && callback(_move, e)
                }
            }

            function touchEnd(e) {
                if(!_this.div) return !1;
                _startX = _startY = _moving = !1, _this.div.removeEventListener(translateEvent("touchmove"), touchMove)
            }
            return Device.mobile && (this.div.addEventListener(translateEvent("touchstart"), (function touchStart(e) {
                var touch = convertTouchEvent(e);
                if(!_this.div) return !1;
                1 == e.touches.length && (_startX = touch.x, _startY = touch.y, _moving = !0, _this.div.addEventListener(translateEvent("touchmove"), touchMove, {
                    passive: !0
                }))
            }), {
                passive: !0
            }), this.div.addEventListener(translateEvent("touchend"), touchEnd, {
                passive: !0
            }), this.div.addEventListener(translateEvent("touchcancel"), touchEnd, {
                passive: !0
            })), this
        }, $.fn.touchClick = function(hover, click) {
            if(!window.addEventListener) return this;
            var _time, _move, _this = this,
                _start = {},
                _touch = {};

            function setTouch(e) {
                var touch = convertTouchEvent(e);
                e.touchX = touch.x, e.touchY = touch.y, _start.x = e.touchX, _start.y = e.touchY
            }
            return Device.mobile && (this.div.addEventListener(translateEvent("touchstart"), (function touchStart(e) {
                if(!_this.div) return !1;
                _time = performance.now(), e.action = "over", e.object = "hit" == _this.div.className ? _this.parent() : _this, setTouch(e), hover && !_move && hover(e)
            }), {
                passive: !0
            }), this.div.addEventListener(translateEvent("touchend"), (function touchEnd(e) {
                if(!_this.div) return !1;
                var time = performance.now();
                if(_touch = convertTouchEvent(e), _move = function findDistance(p1, p2) {
                        var dx = p2.x - p1.x,
                            dy = p2.y - p1.y;
                        return Math.sqrt(dx * dx + dy * dy)
                    }(_start, _touch) > 5, e.object = "hit" == _this.div.className ? _this.parent() : _this, setTouch(e), _time && time - _time < 750) {
                    if(Mouse._preventClicks) return !1;
                    click && !_move && (!0, e.action = "click", click && !_move && click(e), Mouse.autoPreventClicks && Mouse.preventClicks())
                }
                hover && (e.action = "out", Mouse._preventFire || hover(e));
                _move = !1
            }), {
                passive: !0
            })), this
        }
    }(), Class((function Element(type = "div") {
        Inherit(this, Component);
        var name = Utils.getConstructorName(this);
        this.__element = !0, this.element = $("." + name, type), this.element.__useFragment = !0, this.destroy = function() {
            this.element && this.element.remove && (this.element = this.element.remove()), this._destroy && this._destroy()
        }
    })), Hydra.ready(() => {
        TweenManager.Transforms = ["scale", "scaleX", "scaleY", "x", "y", "z", "rotation", "rotationX", "rotationY", "rotationZ", "skewX", "skewY", "perspective"], TweenManager.CubicEases = [{
            name: "easeOutCubic",
            curve: "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
        }, {
            name: "easeOutQuad",
            curve: "cubic-bezier(0.250, 0.460, 0.450, 0.940)"
        }, {
            name: "easeOutQuart",
            curve: "cubic-bezier(0.165, 0.840, 0.440, 1.000)"
        }, {
            name: "easeOutQuint",
            curve: "cubic-bezier(0.230, 1.000, 0.320, 1.000)"
        }, {
            name: "easeOutSine",
            curve: "cubic-bezier(0.390, 0.575, 0.565, 1.000)"
        }, {
            name: "easeOutExpo",
            curve: "cubic-bezier(0.190, 1.000, 0.220, 1.000)"
        }, {
            name: "easeOutCirc",
            curve: "cubic-bezier(0.075, 0.820, 0.165, 1.000)"
        }, {
            name: "easeOutBack",
            curve: "cubic-bezier(0.175, 0.885, 0.320, 1.275)"
        }, {
            name: "easeInCubic",
            curve: "cubic-bezier(0.550, 0.055, 0.675, 0.190)"
        }, {
            name: "easeInQuad",
            curve: "cubic-bezier(0.550, 0.085, 0.680, 0.530)"
        }, {
            name: "easeInQuart",
            curve: "cubic-bezier(0.895, 0.030, 0.685, 0.220)"
        }, {
            name: "easeInQuint",
            curve: "cubic-bezier(0.755, 0.050, 0.855, 0.060)"
        }, {
            name: "easeInSine",
            curve: "cubic-bezier(0.470, 0.000, 0.745, 0.715)"
        }, {
            name: "easeInCirc",
            curve: "cubic-bezier(0.600, 0.040, 0.980, 0.335)"
        }, {
            name: "easeInBack",
            curve: "cubic-bezier(0.600, -0.280, 0.735, 0.045)"
        }, {
            name: "easeInOutCubic",
            curve: "cubic-bezier(0.645, 0.045, 0.355, 1.000)"
        }, {
            name: "easeInOutQuad",
            curve: "cubic-bezier(0.455, 0.030, 0.515, 0.955)"
        }, {
            name: "easeInOutQuart",
            curve: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
        }, {
            name: "easeInOutQuint",
            curve: "cubic-bezier(0.860, 0.000, 0.070, 1.000)"
        }, {
            name: "easeInOutSine",
            curve: "cubic-bezier(0.445, 0.050, 0.550, 0.950)"
        }, {
            name: "easeInOutExpo",
            curve: "cubic-bezier(1.000, 0.000, 0.000, 1.000)"
        }, {
            name: "easeInOutCirc",
            curve: "cubic-bezier(0.785, 0.135, 0.150, 0.860)"
        }, {
            name: "easeInOutBack",
            curve: "cubic-bezier(0.680, -0.550, 0.265, 1.550)"
        }, {
            name: "easeInOut",
            curve: "cubic-bezier(.42,0,.58,1)"
        }, {
            name: "linear",
            curve: "linear"
        }], TweenManager.useCSSTrans = function(props, ease, object) {
            return !(props.math || "string" == typeof ease && ease.includes(["Elastic", "Bounce"]) || object.multiTween || TweenManager._inspectEase(ease).path || !Device.tween.transition)
        }, TweenManager._detectTween = function(object, props, time, ease, delay, callback) {
            return TweenManager.useCSSTrans(props, ease, object) ? new CSSTransition(object, props, time, ease, delay, callback) : new FrameTween(object, props, time, ease, delay, callback)
        }, TweenManager._parseTransform = function(props) {
            var transforms = "",
                translate = "";
            if(props.perspective > 0 && (transforms += "perspective(" + props.perspective + "px)"), void 0 !== props.x || void 0 !== props.y || void 0 !== props.z) {
                var x = props.x || 0,
                    y = props.y || 0,
                    z = props.z || 0;
                translate += x + ("string" == typeof props.x && (props.x.includes("%") || props.x.includes("vw") || props.x.includes("vh")) ? "" : "px") + ", ", translate += y + ("string" == typeof props.y && (props.y.includes("%") || props.y.includes("vw") || props.y.includes("vh")) ? "" : "px"), Device.tween.css3d ? transforms += "translate3d(" + (translate += ", " + z + "px") + ")" : transforms += "translate(" + translate + ")"
            }
            return void 0 !== props.scale ? transforms += "scale(" + props.scale + ")" : (void 0 !== props.scaleX && (transforms += "scaleX(" + props.scaleX + ")"), void 0 !== props.scaleY && (transforms += "scaleY(" + props.scaleY + ")")), void 0 !== props.rotation && (transforms += "rotate(" + props.rotation + "deg)"), void 0 !== props.rotationX && (transforms += "rotateX(" + props.rotationX + "deg)"), void 0 !== props.rotationY && (transforms += "rotateY(" + props.rotationY + "deg)"), void 0 !== props.rotationZ && (transforms += "rotateZ(" + props.rotationZ + "deg)"), void 0 !== props.skewX && (transforms += "skewX(" + props.skewX + "deg)"), void 0 !== props.skewY && (transforms += "skewY(" + props.skewY + "deg)"), transforms
        }, TweenManager._clearCSSTween = function(obj) {
            obj && !obj._cssTween && obj.div._transition && !obj.persistTween && (obj.div.style[CSS.styles.vendorTransition] = "", obj.div._transition = !1, obj._cssTween = null)
        }, TweenManager._isTransform = function(key) {
            return TweenManager.Transforms.indexOf(key) > -1
        }, TweenManager._getAllTransforms = function(object) {
            for(var obj = {}, i = TweenManager.Transforms.length - 1; i > -1; i--) {
                var tf = TweenManager.Transforms[i],
                    val = object[tf];
                0 !== val && "number" == typeof val && (obj[tf] = val)
            }
            return obj
        };
        const prefix = function() {
            let pre = "",
                dom = "";
            try {
                var styles = window.getComputedStyle(document.documentElement, "");
                return pre = (Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/) || "" === styles.OLink && ["", "o"])[1], dom = "WebKit|Moz|MS|O".match(new RegExp("(" + pre + ")", "i"))[1], {
                    unprefixed: "ie" == Device.system.browser && !Device.detect("msie 9"),
                    dom: dom,
                    lowercase: pre,
                    css: "-" + pre + "-",
                    js: ("ie" == Device.system.browser ? pre[0] : pre[0].toUpperCase()) + pre.substr(1)
                }
            } catch (e) {
                return {
                    unprefixed: !0,
                    dom: "",
                    lowercase: "",
                    css: "",
                    js: ""
                }
            }
        }();
        CSS.styles = {}, CSS.styles.vendor = prefix.unprefixed ? "" : prefix.js, CSS.styles.vendorTransition = CSS.styles.vendor.length ? CSS.styles.vendor + "Transition" : "transition", CSS.styles.vendorTransform = CSS.styles.vendor.length ? CSS.styles.vendor + "Transform" : "transform", CSS.vendor = prefix.css, CSS.transformProperty = function() {
            switch (prefix.lowercase) {
                case "moz":
                    return "-moz-transform";
                case "webkit":
                    return "-webkit-transform";
                case "o":
                    return "-o-transform";
                case "ms":
                    return "-ms-transform";
                default:
                    return "transform"
            }
        }(), CSS.tween = {}, CSS.tween.complete = prefix.unprefixed ? "transitionend" : prefix.lowercase + "TransitionEnd"
    }), Class((function CSSTransition(_object, _props, _time, _ease, _delay, _callback) {
        const _this = this;
        let _transformProps, _transitionProps;

        function killed() {
            return !_this || _this.kill || !_object || !_object.div
        }

        function clearCSSTween() {
            killed() || (_this.playing = !1, _object._cssTween = null, _object.willChange(null), _object = _props = null, Utils.nullObject(this))
        }
        this.playing = !0,
            function() {
                if("number" != typeof _time) throw "CSSTween Requires object, props, time, ease";
                ! function initProperties() {
                    var transform = TweenManager._getAllTransforms(_object),
                        properties = [];
                    for(var key in _props) TweenManager._isTransform(key) ? (transform.use = !0, transform[key] = _props[key], delete _props[key]) : ("number" == typeof _props[key] || key.includes(["-", "color"])) && properties.push(key);
                    transform.use && (properties.push(CSS.transformProperty), delete transform.use);
                    _transformProps = transform, _transitionProps = properties
                }(), async function initCSSTween(values) {
                    if(killed()) return;
                    _object._cssTween && (_object._cssTween.kill = !0);
                    _object._cssTween = _this, _object.div._transition = !0;
                    var strings = function buildStrings(time, ease, delay) {
                        for(var props = "", str = "", len = _transitionProps.length, i = 0; i < len; i++) {
                            var transitionProp = _transitionProps[i];
                            props += (props.length ? ", " : "") + transitionProp, str += (str.length ? ", " : "") + transitionProp + " " + time + "ms " + TweenManager._getEase(ease) + " " + delay + "ms"
                        }
                        return {
                            props: props,
                            transition: str
                        }
                    }(_time, _ease, _delay);
                    _object.willChange(strings.props);
                    var time = values ? values.time : _time,
                        delay = values ? values.delay : _delay,
                        props = values ? values.props : _props,
                        transformProps = values ? values.transform : _transformProps;
                    if(_this.time = _time, _this.delay = _delay, await defer(), await defer(), killed()) return;
                    if(_object.div.style[CSS.styles.vendorTransition] = strings.transition, _this.playing = !0, "safari" == Device.system.browser) {
                        if(Device.system.browserVersion < 11 && await defer(), killed()) return;
                        _object.css(props), _object.transform(transformProps)
                    } else _object.css(props), _object.transform(transformProps);
                    Timer.create((function() {
                        killed() || (clearCSSTween(), _callback && _callback(), _this.completePromise && _this.completePromise.resolve())
                    }), time + delay)
                }()
            }(), this.stop = function() {
                this.playing && (this.kill = !0, this.playing = !1, _object.div.style[CSS.styles.vendorTransition] = "", _object.div._transition = !1, _object.willChange(null), _object._cssTween = null, Utils.nullObject(this))
            }, this.onComplete = function(callback) {
                return _callback = callback, this
            }, this.promise = function() {
                return _this.completePromise = Promise.create(), _this.completePromise
            }
    })), Class((function FrameTween(_object, _props, _time, _ease, _delay, _callback, _manual) {
        var _endValues, _transformEnd, _transformStart, _startValues, _isTransform, _isCSS, _transformProps, _cssTween, _transformTween, _update, _this = this;

        function copy(obj) {
            let newObj = {};
            for(let key in obj) "number" == typeof obj[key] && (newObj[key] = obj[key]);
            return newObj
        }

        function clear() {
            _object._cssTweens && _object._cssTweens.remove(_this), _this.playing = !1, _object._cssTween = null, _object = _props = null
        }

        function update() {
            if(! function killed() {
                    return _this.kill || !_object || !_object.div
                }()) {
                if(_isCSS && _object.css(_props), _isTransform)
                    if(_object.multiTween) {
                        for(var key in _transformProps) "number" == typeof _transformProps[key] && (_object[key] = _transformProps[key]);
                        _object.transform()
                    } else _object.transform(_transformProps);
                _update && _update()
            }
        }

        function tweenComplete() {
            _this.playing && (clear(), _callback && _callback(), _this.completePromise && _this.completePromise.resolve())
        }
        this.playing = !0, _this.object = _object, _this.props = _props, _this.time = _time, _this.ease = _ease, _this.delay = _delay, defer((function() {
            if(_this.overrideValues) {
                let values = _this.overrideValues(_this, _object, _props, _time, _ease, _delay);
                values && (_this.props = _props = values.props || _props, _this.time = _time = values.time || _time, _this.ease = _ease = values.ease || _ease, _this.delay = _delay = values.delay || _delay)
            }
            if("object" == typeof _ease && (_ease = "easeOutCubic"), _object && _props) {
                if(_this.object = _object, "number" != typeof _time) throw "FrameTween Requires object, props, time, ease";
                ! function initValues() {
                    _props.math && delete _props.math;
                    Device.tween.transition && _object.div._transition && (_object.div.style[CSS.styles.vendorTransition] = "", _object.div._transition = !1);
                    _this.time = _time, _this.delay = _delay, _endValues = {}, _transformEnd = {}, _transformStart = {}, _startValues = {}, _object.multiTween || (void 0 === _props.x && (_props.x = _object.x), void 0 === _props.y && (_props.y = _object.y), void 0 === _props.z && (_props.z = _object.z));
                    for(var key in _props)
                        if(key.includes(["damping", "spring"])) _endValues[key] = _props[key], _transformEnd[key] = _props[key];
                        else if(TweenManager._isTransform(key)) _isTransform = !0, _transformStart[key] = _object[key] || ("scale" == key ? 1 : 0), _transformEnd[key] = _props[key];
                    else {
                        _isCSS = !0;
                        var v = _props[key];
                        "string" == typeof v ? _object.div.style[key] = v : "number" == typeof v && (_startValues[key] = Number(_object.css(key)), _endValues[key] = v)
                    }
                }(),
                function startTween() {
                    !_object._cssTween || _manual || _object.multiTween || (_object._cssTween.kill = !0);
                    _this.time = _time, _this.delay = _delay, _object.multiTween && (_object._cssTweens || (_object._cssTweens = []), _object._cssTweens.push(_this));
                    _object._cssTween = _this, _this.playing = !0, _props = copy(_startValues), _transformProps = copy(_transformStart), _isCSS && (_cssTween = tween(_props, _endValues, _time, _ease, _delay, null, _manual).onUpdate(update).onComplete(tweenComplete));
                    _isTransform && (_transformTween = tween(_transformProps, _transformEnd, _time, _ease, _delay, null, _manual).onComplete(_isCSS ? null : tweenComplete).onUpdate(_isCSS ? null : update))
                }()
            }
        })), this.stop = function() {
            this.playing && (_cssTween && _cssTween.stop && _cssTween.stop(), _transformTween && _transformTween.stop && _transformTween.stop(), clear())
        }, this.interpolate = function(elapsed) {
            _cssTween && _cssTween.interpolate(elapsed), _transformTween && _transformTween.interpolate(elapsed), update()
        }, this.getValues = function() {
            return {
                start: _startValues,
                transformStart: _transformStart,
                end: _endValues,
                transformEnd: _transformEnd
            }
        }, this.setEase = function(ease) {
            _cssTween && _cssTween.setEase(ease), _transformTween && _transformTween.setEase(ease)
        }, this.onUpdate = function() {
            return this
        }, this.onComplete = function(callback) {
            return _callback = callback, this
        }, this.promise = function() {
            return _this.completePromise || (_this.completePromise = Promise.create()), _this.completePromise
        }
    })), Class((function Interaction(_object) {
        Inherit(this, Events);
        const _this = this;
        var _velocity = [],
            _moved = 0,
            _time = performance.now();

        function Vec2() {
            this.x = 0, this.y = 0, this.length = function() {
                return Math.sqrt(this.x * this.x + this.y * this.y)
            }
        }
        var _vec2Pool = new ObjectPool(Vec2, 10);
        let _distance, _timeDown, _timeMove;

        function loop() {
            _moved++ > 10 && (_this.velocity.x = _this.velocity.y = 0, _this.delta.x = _this.delta.y = 0)
        }

        function down(e) {
            _this.isTouching = !0, e.touches && "number" == typeof e.touches[0].force && (e.force = e.touches[0].force), _this.x = e.x, _this.y = e.y, _this.hold.x = _this.last.x = e.x, _this.hold.y = _this.last.y = e.y, _this.delta.x = _this.move.x = _this.velocity.x = 0, _this.delta.y = _this.move.y = _this.velocity.y = 0, _distance = 0, _this.events.fire(Interaction.START, e, !0), _timeDown = _timeMove = Render.TIME
        }

        function move(e) {
            let now = performance.now();
            if(now - _time < 16) return;
            _time = now, _this.isTouching && (_this.move.x = e.x - _this.hold.x, _this.move.y = e.y - _this.hold.y), e.touches && "number" == typeof e.touches[0].force && (e.force = e.touches[0].force), _this.x = e.x, _this.y = e.y, _this.delta.x = e.x - _this.last.x, _this.delta.y = e.y - _this.last.y, _this.last.x = e.x, _this.last.y = e.y, _moved = 0, _distance += _this.delta.length();
            let delta = Render.TIME - (_timeMove || Render.TIME);
            if(_timeMove = Render.TIME, delta > .01) {
                let velocity = _vec2Pool.get();
                velocity.x = Math.abs(_this.delta.x) / delta, velocity.y = Math.abs(_this.delta.y) / delta, _velocity.push(velocity), _velocity.length > 5 && _vec2Pool.put(_velocity.shift())
            }
            _this.velocity.x = _this.velocity.y = 0;
            for(let i = 0; i < _velocity.length; i++) _this.velocity.x += _velocity[i].x, _this.velocity.y += _velocity[i].y;
            _this.velocity.x /= _velocity.length, _this.velocity.y /= _velocity.length, _this.velocity.x = _this.velocity.x || 0, _this.velocity.y = _this.velocity.y || 0, _this.events.fire(Interaction.MOVE, e, !0), _this.isTouching && _this.events.fire(Interaction.DRAG, e, !0)
        }

        function up(e) {
            if(!_this.isTouching) return;
            _this.isTouching = !1, _this.move.x = 0, _this.move.y = 0, Math.max(.001, Render.TIME - (_timeMove || Render.TIME)) > 100 && (_this.delta.x = 0, _this.delta.y = 0), _distance < 20 && Render.TIME - _timeDown < 2e3 && _this.events.fire(Interaction.CLICK, e, !0), _this.events.fire(Interaction.END, e, !0), Device.mobile && (_this.velocity.x = _this.velocity.y = 0)
        }

        function leave() {
            _this.delta.x = 0, _this.delta.y = 0, up()
        }
        this.x = 0, this.y = 0, this.hold = new Vec2, this.last = new Vec2, this.delta = new Vec2, this.move = new Vec2, this.velocity = new Vec2,
            function() {
                if(!_object instanceof HydraObject) throw "Interaction.Input requires a HydraObject";
                ! function addHandlers() {
                    _object == Stage || _object == __window ? Interaction.bind("touchstart", down) : _object.bind("touchstart", down);
                    Interaction.bind("touchmove", move), Interaction.bind("touchend", up), Interaction.bind("leave", leave)
                }(), Render.start(loop)
            }(), this.onDestroy = function() {
                Interaction.unbind("touchstart", down), Interaction.unbind("touchmove", move), Interaction.unbind("touchend", up), Render.stop(loop), _object && _object.unbind && _object.unbind("touchstart", down)
            }
    }), () => {
        Namespace(Interaction), Interaction.CLICK = "interaction_click", Interaction.START = "interaction_start", Interaction.MOVE = "interaction_move", Interaction.DRAG = "interaction_drag", Interaction.END = "interaction_end";
        const _events = {
            touchstart: [],
            touchmove: [],
            touchend: [],
            leave: []
        };

        function touchMove(e) {
            _events.touchmove.forEach(c => c(e))
        }

        function touchStart(e) {
            _events.touchstart.forEach(c => c(e))
        }

        function touchEnd(e) {
            _events.touchend.forEach(c => c(e))
        }

        function leave(e) {
            _events.leave.forEach(c => c(e))
        }
        Hydra.ready(async () => {
            await defer(), __window.bind("touchstart", touchStart), __window.bind("touchmove", touchMove), __window.bind("touchend", touchEnd), __window.bind("touchcancel", touchEnd), __window.bind("contextmenu", touchEnd), __window.bind("mouseleave", leave), __window.bind("mouseout", leave)
        }), Interaction.bind = function(evt, callback) {
            _events[evt].push(callback)
        }, Interaction.unbind = function(evt, callback) {
            _events[evt].remove(callback)
        }
    }), Class((function Mouse() {
        Inherit(this, Events);
        const _this = this;
        this.x = 0, this.y = 0, this.normal = {
            x: 0,
            y: 0
        }, this.tilt = {
            x: 0,
            y: 0
        }, this.inverseNormal = {
            x: 0,
            y: 0
        }, this.resetOnRelease = !1;
        const _offset = {
            x: 0,
            y: 0
        };

        function init() {
            defer(_ => {
                _this.resetOnRelease && Device.mobile && (_this.x = Stage.width / 2, _this.y = Stage.height / 2)
            }), _this.input = new Interaction(__window), _this.events.sub(_this.input, Interaction.START, update), _this.events.sub(_this.input, Interaction.MOVE, update), _this.events.sub(_this.input, Interaction.END, end), _this.hold = _this.input.hold, _this.last = _this.input.last, _this.delta = _this.input.delta, _this.move = _this.input.move, _this.velocity = _this.input.velocity, defer(() => {
                _this.events.sub(Events.RESIZE, resize), resize()
            })
        }

        function update(e) {
            _this.x = e.x, _this.y = e.y, Stage.width && Stage.height && (_this.normal.x = e.x / Stage.width - _offset.x, _this.normal.y = e.y / Stage.height - _offset.y, _this.tilt.x = 2 * _this.normal.x - 1, _this.tilt.y = 1 - 2 * _this.normal.y, _this.inverseNormal.x = _this.normal.x, _this.inverseNormal.y = 1 - _this.normal.y)
        }

        function end(e) {
            Device.mobile && _this.resetOnRelease && update({
                x: Stage.width / 2,
                y: Stage.height / 2
            })
        }

        function resize() {
            Stage.css("top") && (_offset.y = Stage.css("top") / Stage.height), Stage.css("left") && (_offset.x = Stage.css("left") / Stage.width)
        }
        Hydra.ready(init)
    }), "Static"), Class((function Mobile() {
        Inherit(this, Component), Namespace(this);
        const _this = this;

        function preventNativeScroll(e) {
            if(_this.isAllowNativeScroll) return;
            let target = e.target;
            if("INPUT" == target.nodeName || "TEXTAREA" == target.nodeName || "SELECT" == target.nodeName || "A" == target.nodeName) return;
            let prevent = target.hydraObject;
            for(; target.parentNode && prevent;) target._scrollParent && (prevent = !1), target = target.parentNode;
            prevent && e.preventDefault()
        }

        function resize() {
            updateOrientation(), checkResizeRefresh(), _this.isAllowNativeScroll || (document.body.scrollTop = 0)
        }

        function updateOrientation() {
            _this.orientation = Stage.width > Stage.height ? "landscape" : "portrait", _this.orientationSet && (window.Fullscreen.isOpen || Device.mobile.pwa) && window.screen && window.screen.orientation && window.screen.orientation.lock(_this.orientationSet)
        }
        Hydra.ready(() => {
            Device.mobile && (! function addHandlers() {
                _this.events.sub(Events.RESIZE, resize), Device.mobile.native || window.addEventListener("touchstart", preventNativeScroll, {
                    passive: !1
                })
            }(), "safari" != Device.system.browser || Device.mobile.native || (__body.css({
                height: "100%"
            }).div.scrollTop = 0), Device.mobile.native && Stage.css({
                width: "100vw",
                height: "100vh"
            }))
        });
        const checkResizeRefresh = function() {
            let _lastWidth;
            return function() {
                _this.isPreventResizeReload || _lastWidth != Stage.width && (_lastWidth = Stage.width, ("ios" === Device.system.os || "android" == Device.system.os && Device.system.version >= 7) && (!Device.mobile.tablet || Math.max(Stage.width, Stage.height) > 800 || window.location.reload()))
            }
        }();
        this.vibrate = function(duration) {
            navigator.vibrate && navigator.vibrate(duration)
        }, this.fullscreen = function() {
            if(Device.mobile && !Device.mobile.native && !Device.mobile.pwa && !Dev.emulator) {
                if(!window.Fullscreen) throw "Mobile.fullscreen requires Fullscreen module";
                "android" === Device.system.os && (__window.bind("touchend", () => {
                    Fullscreen.open()
                }), _this.ScreenLock && _this.ScreenLock.isActive && window.onresize())
            }
        }, this.setOrientation = function(orientation, isForce) {
            if(_this.System && _this.NativeCore.active) return _this.System.orientation = _this.System[orientation.toUpperCase()];
            if(_this.orientationSet = orientation, updateOrientation(), isForce) {
                if(!_this.ScreenLock) throw "Mobile.setOrientation isForce argument requires ScreenLock module";
                "any" === orientation ? _this.ScreenLock.unlock() : _this.ScreenLock.lock()
            }
        }, this.allowNativeScroll = function() {
            _this.isAllowNativeScroll = !0
        }, this.preventResizeReload = function() {
            _this.isPreventResizeReload = !0
        }, this._addOverflowScroll = function($obj) {
            $obj.div._scrollParent = !0, Device.mobile.native || ($obj.div._preventEvent = function(e) {
                e.stopPropagation()
            }, $obj.bind("touchmove", $obj.div._preventEvent))
        }, this._removeOverflowScroll = function($obj) {
            $obj.unbind("touchmove", $obj.div._preventEvent)
        }, this.get("phone", () => {
            throw "Mobile.phone is removed. Use Device.mobile.phone"
        }), this.get("tablet", () => {
            throw "Mobile.tablet is removed. Use Device.mobile.tablet"
        }), this.get("os", () => {
            throw "Mobile.os is removed. Use Device.system.os"
        })
    }), "Static"), Class((function PushState(_isHash) {
        const _this = this;
        let _store, _root = "";

        function getState() {
            return _isHash ? String(window.location.hash.slice(3)) : ("/" !== _root ? location.pathname.split(_root)[1] : location.pathname.slice(1)) || ""
        }

        function handleStateChange(state, forced) {
            if(state !== _store || forced)
                if(!_this.isLocked || forced) _store = state, _this.events.fire(Events.UPDATE, {
                    value: state,
                    split: state.split("/")
                });
                else {
                    if(!_store) return;
                    _isHash ? window.location.hash = "!/" + _store : window.history.pushState(null, null, _root + _store)
                }
        }
        "boolean" != typeof _isHash && (_isHash = Hydra.LOCAL || !Device.system.pushstate), this.isLocked = !1,
            function addHandlers() {
                if(_isHash) return window.addEventListener("hashchange", () => handleStateChange(getState()), !1);
                window.onpopstate = history.onpushstate = () => handleStateChange(getState())
            }(), _store = getState(), this.getState = function() {
                return Device.mobile.native ? Storage.get("app_state") || "" : getState()
            }, this.setRoot = function(root) {
                _root = "/" === root.charAt(0) ? root : "/" + root
            }, this.setState = function(state, forced) {
                if(Device.mobile.native && Storage.set("app_state", state), state !== _store) return _store = state, _isHash ? window.location.hash = "!/" + state : window.history.pushState(null, null, _root + state), PushState.fireChangeWhenSet && handleStateChange(getState(), forced), !0
            }, this.replaceState = function(state) {
                state !== _store && (_store = state, _isHash ? window.location.hash = "!/" + state : window.history.replaceState(null, null, _root + state))
            }, this.setTitle = function(title) {
                document.title = title
            }, this.lock = function() {
                this.isLocked = !0
            }, this.unlock = function() {
                this.isLocked = !1
            }, this.useHash = function() {
                _isHash = !0
            }
    })), Class((function Dev() {
        var _post, _alert, _inter, _timerName, _this = this,
            _id = Utils.timestamp();

        function catchErrors() {
            window.onerror = function(message, file, line) {
                var string = message + " ::: " + file + " : " + line;
                _alert && alert(string), _post && post(_post + "/api/data/debug", getDebugInfo(string)), _this.onError && _this.onError(message, file, line)
            }
        }

        function getDebugInfo(string) {
            var obj = {};
            return obj.time = (new Date).toString(), obj.deviceId = _id, obj.err = string, obj.ua = Device.agent, obj.width = Stage.width, obj.height = Stage.height, obj.screenWidth = screen.width, obj.screenHeight = screen.height, obj
        }
        this.emulator = Device.mobile && navigator.platform && navigator.platform.toLowerCase().includes(["mac", "windows"]), this.alertErrors = function(url) {
            _alert = !0, "string" == typeof url && (url = [url]);
            for(var i = 0; i < url.length; i++)
                if(location.href.includes(url[i]) || location.hash.includes(url[i])) return catchErrors()
        }, this.postErrors = function(url, post) {
            _post = post, "string" == typeof url && (url = [url]);
            for(var i = 0; i < url.length; i++)
                if(location.href.includes(url[i])) return catchErrors()
        }, this.expose = function(name, val, force) {
            (Hydra.LOCAL || force) && (window[name] = val)
        }, this.logServer = function(msg) {
            _post && post(_post + "/api/data/debug", getDebugInfo(msg))
        }, this.unsupported = function(needsAlert) {
            needsAlert && alert("Hi! This build is not yet ready for this device, things may not work as expected. Refer to build schedule for when this device will be supported.")
        }, this.checkForLeaks = function(flag, array) {
            if(!window.AURA) {
                var matchArray = function(prop) {
                    if(!array) return !1;
                    for(var i = 0; i < array.length; i++)
                        if(prop.includes(array[i])) return !0;
                    return !1
                };
                clearInterval(_inter), flag && (_inter = setInterval((function() {
                    for(var prop in window) {
                        if(!prop.includes("webkit"))
                            if("function" != typeof window[prop] && prop.length > 2) {
                                if(prop.includes("_ga") || prop.includes("_typeface_js") || matchArray(prop)) continue;
                                var char1 = prop.charAt(0),
                                    char2 = prop.charAt(1);
                                if(("_" == char1 || "$" == char1) && char2 !== char2.toUpperCase()) throw console.log(window[prop]), "Hydra Warning:: " + prop + " leaking into global scope"
                            }
                    }
                }), 1e3))
            }
        }, this.startTimer = function(name) {
            _timerName = name || "Timer", console.time && !window._NODE_ ? console.time(_timerName) : _timer = performance.now()
        }, this.stopTimer = function() {
            console.time && !window._NODE_ ? console.timeEnd(_timerName) : console.log("Render " + _timerName + ": " + (performance.now() - _timer))
        }, this.writeFile = function(file, data) {
            if(!Hydra.LOCAL) return;
            let url = location.protocol + "//" + location.hostname + ":8017" + location.pathname + file;
            post(url, data).then(e => {
                "OK" != e && console.warn(`Unable to write to ${file}`)
            })
        }, this.execUILScript = async function(name, data) {
            if(!Hydra.LOCAL) return;
            let url = location.protocol + "//" + location.hostname + ":8017" + location.pathname + "/uil/" + name,
                response = await post(url, data);
            if("ERROR" == response) throw response;
            return response
        }, Hydra.LOCAL && _this.checkForLeaks(!0)
    }), "Static"), Class((function Service() {
        Inherit(this, Component);
        var _sw, _this = this;

        function getSWAssets() {
            if(!window.ASSETS.SW || _this.cached) return [];
            var assets = window.ASSETS.SW;
            return assets.forEach((asset, i) => {
                asset.includes(".js") && (asset = assets[i].replace(".js", ".js?" + window._CACHE_))
            }), assets
        }

        function handleRegistration(e) {}

        function handleReady(e) {
            _this.isReady = !0, _this.events.fire(Events.READY, e, !0), _sw = navigator.serviceWorker.controller,
                function checkCache() {
                    Storage.get("service_cache") != window._CACHE_ && _this.post("clearCache")
                }()
        }

        function handleError(e) {
            e && (_this.events.fire(Events.ERROR, e, !0), _this.active = !1)
        }

        function handleMessage(e) {
            var data = e.data;
            data.evt && _this.events.fire(data.evt, data)
        }
        this.active = !1, this.ready = !1, this.cached = !1, this.offline = !1, this.disabled = !1, this.ready = function() {
            return this.wait(this, "isReady")
        }, this.init = function() {
            Hydra.ready(() => {
                !("serviceWorker" in navigator) || Hydra.LOCAL && "" == location.port || window.process || _this.disabled || function initWorker() {
                    _this.active = !0, navigator.serviceWorker.register("sw.js").then(handleRegistration).then(handleReady).then(handleError)
                }()
            })
        }, this.cache = function(assets = []) {
            assets = Array.from(assets);
            _this.active && _this.wait(_this, "ready", (function() {
                _this.post("upload", {
                    assets: assets,
                    cdn: Assets.CDN,
                    hostname: location.hostname,
                    sw: getSWAssets(),
                    offline: _this.offline
                }), Storage.set("service_cache", window._CACHE_), _this.cached = !0
            }))
        }, this.post = function(fn, data = {}) {
            if(!_this.active) return;
            _this.wait(_this, "ready", (function() {
                let mc = new MessageChannel;
                mc.port1.onmessage = handleMessage, data.fn = fn, _sw && _sw.postMessage(data, [mc.port2])
            }))
        }
    }), "static"), Class((function Storage() {
        var _storage;

        function cookie(key, value, expires) {
            var options;
            if(arguments.length > 1 && (null === value || "object" != typeof value)) {
                if((options = {}).path = "/", options.expires = expires || 1, null === value && (options.expires = -1), "number" == typeof options.expires) {
                    var days = options.expires,
                        t = options.expires = new Date;
                    t.setDate(t.getDate() + days)
                }
                return document.cookie = [encodeURIComponent(key), "=", options.raw ? String(value) : encodeURIComponent(String(value)), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : ""].join("")
            }
            var result, decode = (options = value || {}).raw ? function(s) {
                return s
            } : decodeURIComponent;
            return (result = new RegExp("(?:^|; )" + encodeURIComponent(key) + "=([^;]*)").exec(document.cookie)) ? decode(result[1]) : null
        }! function testStorage() {
            try {
                if(window.localStorage) try {
                    window.localStorage.test = 1, window.localStorage.removeItem("test"), _storage = !0
                } catch (e) {
                    _storage = !1
                } else _storage = !1
            } catch (e) {
                _storage = !1
            }
        }(), this.setCookie = function(key, value, expires) {
            cookie(key, value, expires)
        }, this.getCookie = function(key) {
            return cookie(key)
        }, this.set = function(key, value) {
            null != value && "object" == typeof value && (value = JSON.stringify(value)), _storage ? null === value ? window.localStorage.removeItem(key) : window.localStorage[key] = value : cookie(key, value, 365)
        }, this.get = function(key) {
            var val, char0;
            (val = _storage ? window.localStorage[key] : cookie(key)) && (val.charAt && (char0 = val.charAt(0)), "{" != char0 && "[" != char0 || (val = JSON.parse(val)), "true" != val && "false" != val || (val = "true" == val));
            return val
        }
    }), "Static"), Class((function Thread(_class) {
        Inherit(this, Component);
        var _this = this,
            _worker, _callbacks, _path, _mvc, _msg = {};

        function init() {
            let file = window._ES5_ ? "assets/js/hydra/hydra-thread-es5.js" : "assets/js/hydra/hydra-thread.js";
            _callbacks = {}, _worker = new Worker(Thread.PATH + file)
        }

        function importClasses() {
            importClass(Utils), importClass(Component), importClass(Events), importClass(_class, !0)
        }

        function importClass(_class, scoped) {
            if(_class) {
                var code;
                if(scoped) {
                    code = (code = _class.toString().replace("{", "!!!")).split("!!!")[1];
                    for(var splitChar = window._MINIFIED_ ? "=" : " "; code.includes("this");) {
                        var name = code.slice(code.indexOf("this.")).split("this.")[1].split(splitChar)[0];
                        code = code.replace("this", "self"), createMethod(name)
                    }
                    code = (code = code.slice(0, -1)).replace(/_self/g, "_this")
                } else if("function" != typeof _class) {
                    if((code = _class.constructor.toString()).includes("[native")) return;
                    code = (_class.constructor._namespace ? _class.constructor._namespace + "." : "") + "Class(" + code + ', "static");'
                } else code = (_class._namespace ? _class._namespace + "." : "") + "Class(" + _class.toString() + ");";
                _worker.postMessage({
                    code: code
                })
            }
        }

        function createMethod(name) {
            _this[name] = function(message = {}, callback, buffer) {
                let promise;
                return Array.isArray(callback) && (buffer = callback, callback = void 0), Array.isArray(buffer) && ((message = {
                    msg: message,
                    transfer: !0
                }).buffer = buffer), void 0 === callback && (promise = Promise.create(), callback = promise.resolve), _this.send(name, message, callback), promise
            }
        }

        function addListeners() {
            _worker.addEventListener("message", workerMessage)
        }

        function workerMessage(e) {
            if(e.data.console) console.log(e.data.message);
            else if(e.data.id) {
                (callback = _callbacks[e.data.id]) && callback(e.data.message), delete _callbacks[e.data.id]
            } else if(e.data.emit) {
                (callback = _callbacks[e.data.evt]) && callback(e.data.msg)
            } else {
                var callback;
                (callback = _callbacks.transfer) && callback(e.data)
            }
        }
        init(), importClasses(), addListeners(), this.on = function(evt, callback) {
            _callbacks[evt] = callback
        }, this.off = function(evt) {
            delete _callbacks[evt]
        }, this.loadFunction = function() {
            let names = [],
                load = code => {
                    var split = (code = (code = code.toString()).replace("(", "!!!")).split("!!!"),
                        name = split[0].split(" ")[1];
                    code = "self." + name + " = function(" + split[1], _worker.postMessage({
                        code: code
                    }), createMethod(name), names.push(name)
                };
            for(var i = 0; i < arguments.length; i++) load(arguments[i]);
            return names
        }, this.importScript = function(path) {
            _worker.postMessage({
                path: Thread.absolutePath(path),
                importScript: !0
            })
        }, this.importCode = function(code) {
            _worker.postMessage({
                code: code
            })
        }, this.importClass = function() {
            for(var i = 0; i < arguments.length; i++) {
                var code = arguments[i];
                importClass(code)
            }
        }, this.importModules = this.importModule = function() {
            for(var i = 0; i < arguments.length; i++) {
                let code = Modules.getConstructor(arguments[i]).toString();
                _worker.postMessage({
                    code: `Module(${code})`
                })
            }
        }, this.importES6Class = function(name) {
            if(window._ES5_) {
                let Class = window[name],
                    base = Class.toString(),
                    proto = [];
                Object.getOwnPropertyNames(Class.prototype).forEach(fn => {
                    "constructor" != fn && Class.prototype[fn] && proto.push({
                        key: fn,
                        string: Class.prototype[fn].toString()
                    })
                }), _worker.postMessage({
                    es5: base,
                    name: name,
                    proto: proto
                })
            } else _worker.postMessage({
                es6: `(${eval(name)})`,
                name: name
            })
        }, this.send = function(name, message, callback) {
            if("string" == typeof name) {
                (message = message || {}).fn = name
            } else callback = message, message = name;
            Thread.UNIQUE_ID > 999999 && (Thread.UNIQUE_ID = 1);
            var id = Thread.UNIQUE_ID++;
            callback && (_callbacks[id] = callback), message.transfer ? (message.msg.id = id, message.msg.fn = message.fn, message.msg.transfer = !0, _worker.postMessage(message.msg, message.buffer)) : (_msg.message = message, _msg.id = id, _worker.postMessage(_msg))
        }, this.onDestroy = function() {
            _worker.terminate && _worker.terminate()
        }
    }), () => {
        var _shared;
        Thread.PATH = "", Thread.UNIQUE_ID = 1, Thread.absolutePath = Hydra.absolutePath, Thread.cluster = function() {
            return new function() {
                let index = 0,
                    array = [];
                this.push = function(thread) {
                    array.push(thread)
                }, this.get = function() {
                    let thread = array[index];
                    return index++, index >= array.length && (index = 0), thread
                }, this.array = array
            }
        }, Thread.upload = function(...args) {
            let name;
            Thread.shared();
            for(let i = 0; i < _shared.array.length; i++) name = _shared.array[i].loadFunction(...args);
            return name
        }, Thread.shared = function(list) {
            if(!_shared) {
                _shared = Thread.cluster();
                let count = navigator.hardwareConcurrency || 4;
                for(let i = 0; i < count; i++) _shared.push(new Thread)
            }
            return list ? _shared : _shared.get()
        }
    }), Class((function TweenManager() {
        Namespace(this);
        var _this = this,
            _tweens = [];

        function updateTweens(time, dt) {
            for(let i = _tweens.length - 1; i >= 0; i--) {
                let tween = _tweens[i];
                tween.update ? tween.update(dt) : _this._removeMathTween(tween)
            }
        }

        function findEase(name) {
            for(var eases = _this.CubicEases, i = eases.length - 1; i > -1; i--)
                if(eases[i].name == name) return eases[i];
            return !1
        }
        this.CubicEases = [], Render.start(updateTweens), this._addMathTween = function(tween) {
            _tweens.push(tween)
        }, this._removeMathTween = function(tween) {
            _tweens.remove(tween)
        }, this._getEase = function(name, values) {
            var ease = findEase(name);
            return !!ease && (values ? ease.path ? ease.path.solve : ease.values : ease.curve)
        }, this._inspectEase = function(name) {
            return findEase(name)
        }, this.tween = function(object, props, time, ease, delay, complete, isManual, scaledTime) {
            "number" != typeof delay && (update = complete, complete = delay, delay = 0);
            const tween = new MathTween(object, props, time, ease, delay, complete, isManual, scaledTime);
            let usePromise = null;
            return complete && complete instanceof Promise && (usePromise = complete, complete = complete.resolve), usePromise || tween
        }, this.clearTween = function(object) {
            if(object._mathTween && object._mathTween.stop && object._mathTween.stop(), object._mathTweens) {
                for(var tweens = object._mathTweens, i = 0; i < tweens.length; i++) {
                    var tw = tweens[i];
                    tw && tw.stop && tw.stop()
                }
                object._mathTweens = null
            }
        }, this.addCustomEase = function(ease) {
            var add = !0;
            if("object" != typeof ease || !ease.name || !ease.curve) throw "TweenManager :: addCustomEase requires {name, curve}";
            for(var i = _this.CubicEases.length - 1; i > -1; i--) ease.name == _this.CubicEases[i].name && (add = !1);
            if(add) {
                if("m" == ease.curve.charAt(0).toLowerCase()) {
                    if(!window.EasingPath) throw "Using custom eases requires easingpath module";
                    ease.path = new EasingPath(ease.curve)
                } else ease.values = function stringToValues(str) {
                    for(var values = str.split("(")[1].slice(0, -1).split(","), i = 0; i < values.length; i++) values[i] = parseFloat(values[i]);
                    return values
                }(ease.curve);
                _this.CubicEases.push(ease)
            }
            return ease
        }, Math.interpolate = function(start, end, alpha, ease) {
            const fn = _this.Interpolation.convertEase(ease);
            return Math.mix(start, end, "function" == typeof fn ? fn(alpha) : _this.Interpolation.solve(fn, alpha))
        }, window.tween = this.tween, window.clearTween = this.clearTween
    }), "Static"), TweenManager.Class((function Interpolation() {
        function calculateBezier(aT, aA1, aA2) {
            return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT
        }

        function A(aA1, aA2) {
            return 1 - 3 * aA2 + 3 * aA1
        }

        function B(aA1, aA2) {
            return 3 * aA2 - 6 * aA1
        }

        function C(aA1) {
            return 3 * aA1
        }
        this.convertEase = function(ease) {
            var fn = function() {
                switch (ease) {
                    case "easeInQuad":
                        return TweenManager.Interpolation.Quad.In;
                    case "easeInCubic":
                        return TweenManager.Interpolation.Cubic.In;
                    case "easeInQuart":
                        return TweenManager.Interpolation.Quart.In;
                    case "easeInQuint":
                        return TweenManager.Interpolation.Quint.In;
                    case "easeInSine":
                        return TweenManager.Interpolation.Sine.In;
                    case "easeInExpo":
                        return TweenManager.Interpolation.Expo.In;
                    case "easeInCirc":
                        return TweenManager.Interpolation.Circ.In;
                    case "easeInElastic":
                        return TweenManager.Interpolation.Elastic.In;
                    case "easeInBack":
                        return TweenManager.Interpolation.Back.In;
                    case "easeInBounce":
                        return TweenManager.Interpolation.Bounce.In;
                    case "easeOutQuad":
                        return TweenManager.Interpolation.Quad.Out;
                    case "easeOutCubic":
                        return TweenManager.Interpolation.Cubic.Out;
                    case "easeOutQuart":
                        return TweenManager.Interpolation.Quart.Out;
                    case "easeOutQuint":
                        return TweenManager.Interpolation.Quint.Out;
                    case "easeOutSine":
                        return TweenManager.Interpolation.Sine.Out;
                    case "easeOutExpo":
                        return TweenManager.Interpolation.Expo.Out;
                    case "easeOutCirc":
                        return TweenManager.Interpolation.Circ.Out;
                    case "easeOutElastic":
                        return TweenManager.Interpolation.Elastic.Out;
                    case "easeOutBack":
                        return TweenManager.Interpolation.Back.Out;
                    case "easeOutBounce":
                        return TweenManager.Interpolation.Bounce.Out;
                    case "easeInOutQuad":
                        return TweenManager.Interpolation.Quad.InOut;
                    case "easeInOutCubic":
                        return TweenManager.Interpolation.Cubic.InOut;
                    case "easeInOutQuart":
                        return TweenManager.Interpolation.Quart.InOut;
                    case "easeInOutQuint":
                        return TweenManager.Interpolation.Quint.InOut;
                    case "easeInOutSine":
                        return TweenManager.Interpolation.Sine.InOut;
                    case "easeInOutExpo":
                        return TweenManager.Interpolation.Expo.InOut;
                    case "easeInOutCirc":
                        return TweenManager.Interpolation.Circ.InOut;
                    case "easeInOutElastic":
                        return TweenManager.Interpolation.Elastic.InOut;
                    case "easeInOutBack":
                        return TweenManager.Interpolation.Back.InOut;
                    case "easeInOutBounce":
                        return TweenManager.Interpolation.Bounce.InOut;
                    case "linear":
                        return TweenManager.Interpolation.Linear.None
                }
            }();
            if(!fn) {
                var curve = TweenManager._getEase(ease, !0);
                fn = curve || TweenManager.Interpolation.Cubic.Out
            }
            return fn
        }, this.solve = function(values, elapsed) {
            return values[0] == values[1] && values[2] == values[3] ? elapsed : calculateBezier(function getTForX(aX, mX1, mX2) {
                for(var aT, aA1, aA2, aGuessT = aX, i = 0; i < 4; i++) {
                    var currentSlope = (aT = aGuessT, 3 * A(aA1 = mX1, aA2 = mX2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1));
                    if(0 == currentSlope) return aGuessT;
                    aGuessT -= (calculateBezier(aGuessT, mX1, mX2) - aX) / currentSlope
                }
                return aGuessT
            }(elapsed, values[0], values[2]), values[1], values[3])
        }, this.Linear = {
            None: function(k) {
                return k
            }
        }, this.Quad = {
            In: function(k) {
                return k * k
            },
            Out: function(k) {
                return k * (2 - k)
            },
            InOut: function(k) {
                return (k *= 2) < 1 ? .5 * k * k : -.5 * (--k * (k - 2) - 1)
            }
        }, this.Cubic = {
            In: function(k) {
                return k * k * k
            },
            Out: function(k) {
                return --k * k * k + 1
            },
            InOut: function(k) {
                return (k *= 2) < 1 ? .5 * k * k * k : .5 * ((k -= 2) * k * k + 2)
            }
        }, this.Quart = {
            In: function(k) {
                return k * k * k * k
            },
            Out: function(k) {
                return 1 - --k * k * k * k
            },
            InOut: function(k) {
                return (k *= 2) < 1 ? .5 * k * k * k * k : -.5 * ((k -= 2) * k * k * k - 2)
            }
        }, this.Quint = {
            In: function(k) {
                return k * k * k * k * k
            },
            Out: function(k) {
                return --k * k * k * k * k + 1
            },
            InOut: function(k) {
                return (k *= 2) < 1 ? .5 * k * k * k * k * k : .5 * ((k -= 2) * k * k * k * k + 2)
            }
        }, this.Sine = {
            In: function(k) {
                return 1 - Math.cos(k * Math.PI / 2)
            },
            Out: function(k) {
                return Math.sin(k * Math.PI / 2)
            },
            InOut: function(k) {
                return .5 * (1 - Math.cos(Math.PI * k))
            }
        }, this.Expo = {
            In: function(k) {
                return 0 === k ? 0 : Math.pow(1024, k - 1)
            },
            Out: function(k) {
                return 1 === k ? 1 : 1 - Math.pow(2, -10 * k)
            },
            InOut: function(k) {
                return 0 === k ? 0 : 1 === k ? 1 : (k *= 2) < 1 ? .5 * Math.pow(1024, k - 1) : .5 * (2 - Math.pow(2, -10 * (k - 1)))
            }
        }, this.Circ = {
            In: function(k) {
                return 1 - Math.sqrt(1 - k * k)
            },
            Out: function(k) {
                return Math.sqrt(1 - --k * k)
            },
            InOut: function(k) {
                return (k *= 2) < 1 ? -.5 * (Math.sqrt(1 - k * k) - 1) : .5 * (Math.sqrt(1 - (k -= 2) * k) + 1)
            }
        }, this.Elastic = {
            In: function(k, a = 1, p = .4) {
                var s;
                return 0 === k ? 0 : 1 === k ? 1 : (!a || a < 1 ? (a = 1, s = p / 4) : s = p * Math.asin(1 / a) / (2 * Math.PI), -a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p))
            },
            Out: function(k, a = 1, p = .4) {
                var s;
                return 0 === k ? 0 : 1 === k ? 1 : (!a || a < 1 ? (a = 1, s = p / 4) : s = p * Math.asin(1 / a) / (2 * Math.PI), a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1)
            },
            InOut: function(k, a = 1, p = .4) {
                var s;
                return 0 === k ? 0 : 1 === k ? 1 : (!a || a < 1 ? (a = 1, s = p / 4) : s = p * Math.asin(1 / a) / (2 * Math.PI), (k *= 2) < 1 ? a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * -.5 : a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * .5 + 1)
            }
        }, this.Back = {
            In: function(k) {
                var s = 1.70158;
                return k * k * ((s + 1) * k - s)
            },
            Out: function(k) {
                var s = 1.70158;
                return --k * k * ((s + 1) * k + s) + 1
            },
            InOut: function(k) {
                var s = 2.5949095;
                return (k *= 2) < 1 ? k * k * ((s + 1) * k - s) * .5 : .5 * ((k -= 2) * k * ((s + 1) * k + s) + 2)
            }
        }, this.Bounce = {
            In: function(k) {
                return 1 - this.Bounce.Out(1 - k)
            },
            Out: function(k) {
                return k < 1 / 2.75 ? 7.5625 * k * k : k < 2 / 2.75 ? 7.5625 * (k -= 1.5 / 2.75) * k + .75 : k < 2.5 / 2.75 ? 7.5625 * (k -= 2.25 / 2.75) * k + .9375 : 7.5625 * (k -= 2.625 / 2.75) * k + .984375
            },
            InOut: function(k) {
                return k < .5 ? .5 * this.Bounce.In(2 * k) : .5 * this.Bounce.Out(2 * k - 1) + .5
            }
        }
    }), "Static"), Class((function MathTween(_object, _props, _time, _ease, _delay, _callback, _manual, _scaledTime) {
        var _startTime, _startValues, _endValues, _easeFunction, _paused, _newEase, _spring, _damping, _update, _currentTime, _this = this,
            _elapsed = 0;

        function clear() {
            if(!_object && !_props) return !1;
            _object._mathTween = null, TweenManager._removeMathTween(_this), Utils.nullObject(_this), _object._mathTweens && _object._mathTweens.remove(_this._tweenWrapper)
        }
        _this.object = _object, _this.props = _props, _this.time = _time, _this.ease = _ease, _this.delay = _delay, defer((function() {
            if(_this.overrideValues) {
                let values = _this.overrideValues(_this, _object, _props, _time, _ease, _delay);
                values && (_this.props = _props = values.props || _props, _this.time = _time = values.time || _time, _this.ease = _ease = values.ease || _ease, _this.delay = _delay = values.delay || _delay)
            }
            if(_object && _props) {
                if(_this.object = _object, "number" != typeof _time) throw "MathTween Requires object, props, time, ease";
                ! function start() {
                    _object.multiTween || !_object._mathTween || _manual || TweenManager.clearTween(_object);
                    _manual || TweenManager._addMathTween(_this);
                    _this.time = _time, _this.delay = _delay;
                    let propString = function getPropString() {
                        let string = "";
                        for(let key in _props) "number" == typeof _props[key] && (string += key + " ");
                        return string
                    }();
                    _object._mathTween = _this, _object.multiTween && (_object._mathTweens || (_object._mathTweens = []), _object._mathTweens.forEach(t => {
                        t.props == propString && t.tween.stop()
                    }), _this._tweenWrapper = {
                        props: propString,
                        tween: _this
                    }, _object._mathTweens.push(_this._tweenWrapper));
                    _ease || (_ease = "linear");
                    "string" == typeof _ease && (_ease = TweenManager.Interpolation.convertEase(_ease), _easeFunction = "function" == typeof _ease);
                    _startTime = _scaledTime ? Render.now() : performance.now(), _currentTime = _startTime, _startTime += _delay, _endValues = _props, _startValues = {}, _props.spring && (_spring = _props.spring);
                    _props.damping && (_damping = _props.damping);
                    for(var prop in _this.startValues = _startValues, _endValues) "number" == typeof _object[prop] && (_startValues[prop] = _object[prop])
                }()
            }
        })), this.update = function(dt) {
            if(_paused) return;
            if((_currentTime += _scaledTime ? dt : Render.DT) < _startTime) return;
            _elapsed = (_elapsed = (_currentTime - _startTime) / _time) > 1 ? 1 : _elapsed;
            let delta = this.interpolate(_elapsed);
            _update && _update(delta), 1 == _elapsed && (_callback && _callback(), _this.completePromise && _this.completePromise.resolve(), clear())
        }, this.pause = function() {
            _paused = !0
        }, this.resume = function() {
            _paused = !1
        }, this.stop = function() {
            return _this.stopped = !0, clear(), null
        }, this.setEase = function(ease) {
            _newEase != ease && (_newEase = ease, _ease = TweenManager.Interpolation.convertEase(ease), _easeFunction = "function" == typeof _ease)
        }, this.getValues = function() {
            return {
                start: _startValues,
                end: _endValues
            }
        }, this.interpolate = function(elapsed) {
            var delta = _easeFunction ? _ease(elapsed, _spring, _damping) : TweenManager.Interpolation.solve(_ease, elapsed);
            for(var prop in _startValues)
                if("number" == typeof _startValues[prop] && "number" == typeof _endValues[prop]) {
                    var start = _startValues[prop],
                        end = _endValues[prop];
                    _object[prop] = start + (end - start) * delta
                } return delta
        }, this.onUpdate = function(callback) {
            return _update = callback, this
        }, this.onComplete = function(callback) {
            return _callback = callback, this
        }, this.promise = function() {
            return _this.completePromise = Promise.create(), _this.completePromise
        }, this.setElapsed = function(elapsed) {
            _startTime = performance.now(), _currentTime = _startTime + _time * elapsed
        }
    })), Class((function TweenTimeline() {
        Inherit(this, Component);
        const _this = this;
        let _tween, _total = 0;
        const _tweens = [];

        function calculate() {
            _tweens.sort((function(a, b) {
                const ta = a.time + a.delay;
                return b.time + b.delay - ta
            }));
            const first = _tweens[0];
            _total = first.time + first.delay
        }

        function loop() {
            let time = _this.elapsed * _total;
            for(let i = _tweens.length - 1; i > -1; i--) {
                let t = _tweens[i],
                    relativeTime = time - t.delay,
                    elapsed = Math.clamp(relativeTime / t.time, 0, 1);
                t.interpolate(elapsed)
            }
            _this.events.fire(Events.UPDATE, _this, !0)
        }
        this.elapsed = 0, this.get("timeRemaining", () => _total - _this.elapsed * _total), this.add = function(object, props, time, ease, delay = 0) {
            let tween;
            return (object instanceof MathTween || object instanceof FrameTween) && (props = object.props, time = object.time, ease = object.ease, delay = object.delay, object = object.object), tween = object instanceof HydraObject ? new FrameTween(object, props, time, ease, delay, null, !0) : new MathTween(object, props, time, ease, delay, null, !0), _tweens.push(tween), defer(calculate), tween
        }, this.tween = function(to, time, ease, delay, callback) {
            return _this.clearTween(), _tween = tween(_this, {
                elapsed: to
            }, time, ease, delay).onUpdate(loop).onComplete(callback), _tween
        }, this.clearTween = function() {
            _tween && _tween.stop && _tween.stop()
        }, this.startRender = function() {
            Render.start(loop)
        }, this.stopRender = function() {
            Render.stop(loop)
        }, this.update = function() {
            loop()
        }, this.onDestroy = function() {
            _this.clearTween(), Render.stop(loop);
            for(var i = 0; i < _tweens.length; i++) _tweens[i].stop()
        }
    })), window.ASSETS = ["assets/shaders/compiled.vs"], ASSETS.SW = ["assets/css/style.css", "assets/js/app.js"], Class((function GameCenter() {
        Inherit(this, Component);
        var _socket, _coords, _this = this,
            _id = Utils.timestamp();

        function getCoords() {
            if(!_this.useCoordinates) return _coords = [0, 0], Promise.resolve();
            let promise = Promise.create();
            return navigator.geolocation.getCurrentPosition(data => {
                _coords = [data.coords.latitude, data.coords.longitude], _this.events.fire(_this.LOCATED), promise.resolve()
            }, error => {
                _this.events.fire(_this.LOCATION_ERROR)
            }), promise
        }

        function connected() {
            _this.events.fire(_this.CONNECTED), _this.events.sub(_socket, "server_data", handleServerData), _this.flag("connected", !0)
        }

        function handleServerData(e) {
            _this.events.fire(_this.SERVER_DATA, e), _this.events.fire(_this.SERVER_DATA, e)
        }
        this.userData = {}, this.useCoordinates = !1, this.overrideProtocol = null, this.ports = 1, this.CONNECTED = "gamecenter_connect", this.DISCONNECTED = "gamecenter_disconnected", this.LOCATION_ERROR = "gamecenter_location_error", this.LOCATED = "gamecenter_located", this.DATA = "gamecenter_data", this.START_GAME = "gamecenter_start_game", this.END_GAME = "gamecenter_end_game", this.LOST_CONNECTION = "gamecenter_lost_connection", this.SERVER_DATA = "gamecenter_server_data", this.BROADCAST = "gamecenter_server_data", this.connect = function(server) {
            this.CONNECTION_TYPE = this.overrideProtocol || (Device.media.webrtc ? "rtc" : "ws");
            let port = 7e3 + Math.random(0, this.ports - 1);
            _socket = new SocketConnection(server + ":" + port), _this.socket = _socket, _this.events.sub(_socket, SocketConnection.OPEN, connected), _this.events.sub(_socket, SocketConnection.CLOSE, _ => {
                _this.flag("connected", !1), _this.events.fire(_this.LOST_CONNECTION, {
                    reconnected: _ => _this.wait("connected")
                })
            }), _this.events.sub(_socket, SocketConnection.ERROR, _ => {
                _this.flag("connected", !1), _this.events.fire(_this.LOST_CONNECTION, {
                    reconnected: _ => _this.wait("connected")
                })
            }), _this.events.sub(_socket, "broadcast", e => {
                _this.events.fire(_this.BROADCAST, e)
            })
        }, this.locateUser = function() {
            getCoords()
        }, this.createRoom = function(id) {
            let promise = Promise.create(),
                create = function() {
                    let room = new GameCenterRoom(id || Utils.timestamp(), _socket);
                    room.create(), promise.resolve(room)
                };
            return _coords ? create() : getCoords().then(create), promise
        }, this.findRoom = function() {
            let promise = Promise.create(),
                find = function() {
                    _this.roundTrip("findAny", {
                        coords: _coords,
                        type: _this.CONNECTION_TYPE
                    }, async data => {
                        let room = new GameCenterRoom(data.id, _socket);
                        await room.join(), promise.resolve(room)
                    })
                };
            return _coords ? find() : getCoords().then(find), promise
        }, this.watchAnyRoom = function() {
            let promise = Promise.create();
            return _this.roundTrip("findAny", {
                coords: _coords,
                type: _this.CONNECTION_TYPE,
                forceWatcher: !0
            }, data => {
                try {
                    let room = new GameCenterRoom(data.id, _socket);
                    room.join(!0), promise.resolve(room)
                } catch (e) {
                    promise.reject()
                }
            }), promise
        }, this.joinRoom = async function(id) {
            let room = new GameCenterRoom(id, _socket);
            return room.join(), room
        }, this.findNearby = function() {
            let promise = Promise.create();
            if(!this.useCoordinates) throw "findNearby requires user coords";
            let find = function() {
                _this.roundTrip("findNearby", {
                    coords: _coords,
                    type: _this.CONNECTION_TYPE
                }, data => {
                    promise.resolve(data)
                })
            };
            return _coords ? find() : getCoords().then(find), promise
        }, this.roundTrip = function(evt, data, callback) {
            let receive = e => {
                _this.events.unsub(_socket, `${evt}_response`, receive), callback && callback(e)
            };
            _this.events.sub(_socket, `${evt}_response`, receive), _socket.send(evt, data)
        }, this.sendData = function(data = {}) {
            _socket && (data.id = _id, _socket.send("server_data", data))
        }, this.broadcast = function(data = {}) {
            _socket.send("broadcast", data)
        }, this.set("coords", v => {
            _coords = v
        }), this.get("coords", _ => _coords)
    }), "static"), Class((function GameCenterPlayer(_id, _socket, _data, _initiator) {
        Inherit(this, Component);
        var _this = this,
            _evt = {
                target: _this,
                id: _id
            },
            _results = [],
            _messages = {};
        this.connection = new GameCenterRTC(_id, _socket, _initiator, _data), this.id = _id, this.data = _data, this.offset = 0;
        const DEBUG = Utils.query("addDebug");

        function sendPing() {
            if(_results.length >= 3) return;
            let message = {
                _ping: !0
            };
            message.id = Utils.timestamp(), message.outTime = Date.now(), _messages[message.id] = message, _this.connection.emit(message), DEBUG && console.log("GCPlayer::SendPing")
        }

        function handlePing(data) {
            if(_messages[data.id]) {
                let difference = Date.now() - data.inTime;
                _results.unshift(difference), _this.offset = difference, _results.length < 3 ? _this.delayedCall(sendPing, 50) : function calculate() {
                    _results.length > 3 && (_results = _results.slice(0, 3)), _results.sort((a, b) => a - b), _this.offset = _results[1]
                }()
            } else data.inTime = Date.now(), _this.connection.emit(data), DEBUG && console.log("GCPlayer::connection emit", data)
        }

        function onMessage(data) {
            if(data._ping) return handlePing(data);
            _evt.player = _this, _evt.data = data, _this.events.fire(GameCenter.DATA, _evt)
        }

        function ready() {
            _this.delayedCall(() => {
                sendPing(), _this.events.fire(Events.READY)
            }, 100)
        }! function addListeners() {
            _this.events.sub(_this.connection, Events.READY, ready), _this.events.bubble(_this.connection, Events.ERROR), _this.connection.onMessage = onMessage
        }(), this.emit = function(data) {
            _this.connection.emit(data)
        }, this.disconnect = function() {
            _this.connection.close(), _this.events.fire(GameCenter.DISCONNECTED)
        }
    })), Class((function GameCenterRTC(_id, _socket, _initiator) {
        Inherit(this, Component);
        var _peer, _data, _this = this,
            _fallbackSocket = !1;
        const DEBUG = !0;

        function sendNegotiation(type, sdp) {
            let data = {
                to: _id,
                type: type,
                sdp: sdp
            };
            DEBUG && console.log("GC::send negotiation", data), _socket.send("establish_rtc", data)
        }

        function dataMessage(e) {
            _this.onMessage && _this.onMessage(JSON.parse(e.data))
        }

        function dataOpen(e) {
            _this.events.fire(Events.READY), DEBUG && console.log("GC::data open", e)
        }

        function dataClose(e) {
            _socket.send("report_disconnect", _id), _this.events.fire(Events.ERROR, {
                gcID: _id
            }), DEBUG && console.log("GC::data close", e)
        }

        function dataError(e) {
            _this.events.fire(Events.ERROR, {
                gcID: _id
            }), DEBUG && console.log("GC::data error", e)
        }! function initPeerConnection() {
            (_peer = new RTCPeerConnection({
                iceServers: [{
                    urls: "stun:stun.l.google.com:19302"
                }]
            })).onicecandidate = e => {
                DEBUG && console.log("GC::onicecandidate try", e), _peer && e && e.candidate && e.candidate.candidate && (sendNegotiation("candidate", e.candidate), DEBUG && console.log("GC::onicecandidate", e))
            }, _peer.onicecandidateerror = e => {
                DEBUG && console.log("GC::onicecandidateerror", e)
            }, _peer.onconnectionstatechange = e => {
                DEBUG && console.log("GC::onconnectionstatechange", e), console.log(_peer.iceConnectionState)
            }, _peer.onicegatheringstatechange = e => {
                DEBUG && console.log("GC::onicegatheringstatechange", e)
            }, _peer.oniceconnectionstatechange = e => {
                DEBUG && console.log("GC::oniceconnectionstatechange", e), "failed" == _peer.iceConnectionState && function fallbackToSocket() {
                    _socket.send("ws_data", {
                        from: GameCenter.GCID,
                        fallbackToSocket: !0
                    }), _fallbackSocket = !0
                }()
            }, _peer.onsignalingstatechange = e => {
                DEBUG && console.log("GC::onsignalingstatechange", e)
            }, _peer.onnegotiationneeded = e => {
                DEBUG && console.log("GC::onnegotiationneeded", e)
            }, (_data = _peer.createDataChannel("gamecenter", {
                ordered: !1,
                negotiated: !0,
                id: 7
            })).onmessage = dataMessage, _data.onopen = dataOpen, _data.onclose = dataClose, _data.onerror = dataError, DEBUG && console.log("GC::init peer connection", _peer), _peer.ondatachannel = e => {
                DEBUG && console.log("GC::on data channel"), e.channel.onmessage = dataMessage, e.channel.onclose = dataClose, e.channel.onerror = dataError
            }
        }(), _initiator && async function initConnection() {
            let sdp;
            DEBUG && console.log("GC::init connection");
            try {
                sdp = await _peer.createOffer()
            } catch (e) {
                console.error(e)
            }
            DEBUG && console.log("GC::after create offer"), _peer.setLocalDescription(sdp), sendNegotiation("offer", sdp)
        }(), this.establish = function(data) {
            if(_peer) switch (DEBUG && console.log("GC::establish", data), data.type) {
                case "candidate":
                    ! function processIce(iceCandidate) {
                        try {
                            _peer.addIceCandidate(new RTCIceCandidate(iceCandidate)), DEBUG && console.log("GC::processIce addIceCandidate", iceCandidate)
                        } catch (e) {
                            _this.events.fire(Events.ERROR, {
                                gcID: _id
                            })
                        }
                    }(data.sdp);
                    break;
                case "offer":
                    !async function processOffer(offer) {
                        try {
                            DEBUG && console.log("GC::process offser", offer), await _peer.setRemoteDescription(new RTCSessionDescription(offer));
                            let sdp = await _peer.createAnswer();
                            DEBUG && console.log("GC::create answer"), _peer.setLocalDescription(sdp).catch(e => _this.events.fire(Events.ERROR, {
                                gcID: _id
                            })), sendNegotiation("answer", sdp)
                        } catch (e) {
                            console.log("offer", offer), console.error("process offer", e)
                        }
                    }(data.sdp);
                    break;
                case "answer":
                    !async function processAnswer(answer) {
                        try {
                            await _peer.setRemoteDescription(new RTCSessionDescription(answer)), DEBUG && console.log("GC::processAnswer", answer)
                        } catch (e) {
                            _this.events.fire(Events.ERROR, {
                                gcID: _id
                            })
                        }
                        return !0
                    }(data.sdp)
            }
        }, this.emit = function(data = {}) {
            if(_fallbackSocket) data.from = GameCenter.GCID, _socket.send("ws_data", data);
            else {
                if("open" != _data.readyState) return;
                data.from = GameCenter.GCID, _data.send(JSON.stringify(data))
            }
        }, this.wsData = function(data) {
            if(data.fallbackToSocket) return _fallbackSocket = !0, void _this.events.fire(Events.READY);
            _this.onMessage && _this.onMessage(data)
        }, this.close = function() {
            _peer && _peer.close(), _peer = null, DEBUG && console.log("GC::close")
        }
    })), Class((function GameCenterUser() {
        Inherit(this, Component);
        this.connection = new GameCenterConnection, this.me = !0, this.data = GameCenter.userData, this.id = GameCenter.GCID, this.emit = function() {}, this.disconnect = function() {}
    })), Class((function GameCenterConnection() {
        Inherit(this, Component);
        this.establish = function() {}, this.emit = function() {}, this.wsData = function() {}
    })), Class((function GameCenterRoom(_id, _socket) {
        Inherit(this, Component);
        var _this = this;
        this.id = _id, this.host = !1, this.players = [];
        var _playerMap = new Map,
            _players = _this.players;

        function createPlayer(id, data, init) {
            let player = new GameCenterPlayer(id, _socket, data, init);
            return _this.events.sub(player, GameCenter.DATA, playerData), _this.events.sub(player, Events.ERROR, playerDisconnect), _this.events.sub(player, Events.READY, async () => {
                await defer(), _this.events.fire(GameCenterRoom.PLAYER_READY, {
                    player: player
                })
            }), player
        }

        function closeRoom() {
            _this.destroy()
        }

        function startGame(e) {
            _this.events.fire(GameCenter.START_GAME, e)
        }

        function endGame(e) {
            _this.events.fire(GameCenter.END_GAME, e)
        }

        function establishRTC(e) {
            let found = !1;
            if(_players.forEach(player => {
                    player.id == e.from && (found = !0, player.connection.establish(e))
                }), !found) {
                let player = createPlayer(e.from, e.data);
                _players.push(player), _playerMap.set(e.gcID, player), player.connection.establish(e)
            }
        }

        function playerDisconnect(e) {
            _playerMap.delete(e.gcID), _players.forEach(player => {
                player.id == e.gcID && (player.disconnect(), _players.remove(player), _this.events.fire(GameCenterRoom.PLAYER_DISCONNECT, {
                    player: player
                }))
            })
        }

        function becomeHost(e) {
            _this.host = !0, _this.events.fire(GameCenterRoom.BECOME_HOST)
        }

        function openConnection(e) {
            let player = createPlayer(e.gcID, e.data, !0);
            _playerMap.set(e.gcID, player), _players.push(player), _this.events.fire(GameCenterRoom.PLAYER_JOIN, {
                player: player
            })
        }

        function playerData(e) {
            _this.events.fire(GameCenter.DATA, e)
        }

        function websocketData(e) {
            let player = _playerMap.get(e.from);
            player && player.connection.wsData(e)
        }
        this.onDestroy = function() {
            this.leave()
        }, this.create = function() {
            _this.host = !0, GameCenter.roundTrip("create", {
                id: _id,
                coords: GameCenter.coords,
                type: GameCenter.CONNECTION_TYPE
            }, _this.join)
        }, this.join = function(force) {
            if(_this.flag("joined")) return Promise.resolve();
            _this.flag("joined", !0);
            let promise = Promise.create();
            return GameCenter.roundTrip("join", {
                id: _id,
                user: GameCenter.userData,
                force: force
            }, e => {
                if(!e.success) return promise.reject();
                e.host && (_this.host = !0), GameCenter.GCID = e.myID,
                    function handlePlayers(players) {
                        var player;
                        players.forEach((obj, i) => {
                            obj.id == GameCenter.GCID ? player = new GameCenterUser : (player = _playerMap.get(obj.id)) || (player = createPlayer(obj.id, obj.data), _playerMap.set(obj.id, player)), _players[i] = player
                        })
                    }(e.players),
                    function addListeners() {
                        _this.events.sub(_socket, "player_disconnect", playerDisconnect), _this.events.sub(_socket, "become_host", becomeHost), _this.events.sub(_socket, "open_connection", openConnection), _this.events.sub(_socket, "establish_rtc", establishRTC), _this.events.sub(_socket, "ws_data", websocketData), _this.events.sub(_socket, "start_game", startGame), _this.events.sub(_socket, "end_game", endGame), _this.events.sub(GameCenter.LOST_CONNECTION, closeRoom)
                    }(), promise.resolve()
            }), promise
        }, this.leave = function() {
            _this.flag("joined", !1), _players.forEach(player => player.disconnect()), GameCenter.roundTrip("leave", {
                id: _id,
                user: GameCenter.userData
            })
        }, this.broadcast = function(data) {
            for(var i = 0; i < _players.length; i++) _players[i].connection.emit(data)
        }, this.start = function(data) {
            _this.host && _socket.send("start_game", data)
        }, this.end = function(data) {
            _this.host && _socket.send("end_game", data)
        }
    }), () => {
        GameCenterRoom.PLAYER_DISCONNECT = "gc_room_player_dc", GameCenterRoom.BECOME_HOST = "gc_become_host", GameCenterRoom.PLAYER_JOIN = "gc_player_join", GameCenterRoom.PLAYER_READY = "gc_player_ready"
    }), Class((function SocketConnection(_server, _channel) {
        Inherit(this, Component);
        var _socket, _pingPong, _this = this,
            _fail = 0;
        const PING = "ping",
            PONG = "pong";

        function connect() {
            _this.pending = !1, (_socket = new WebSocket(_server)).onopen = open, _socket.onmessage = message, _socket.onclose = close, _socket.onerror = close, _pingPong = setInterval(sendPing, 5e3)
        }

        function sendPing() {
            _socket.send(PING)
        }

        function open(e) {
            _fail = 0, _this.connected = !0, _this.events.fire(SocketConnection.OPEN, {
                socket: _this
            }, !0), _channel && _this.send("register", {
                channel: _channel
            })
        }

        function message(e) {
            if(e.data == PONG || e.data == PING) return;
            let data = JSON.parse(e.data),
                evt = data._evt;
            delete data._evt, _this.events.fire(evt, data, !0)
        }

        function close(e) {
            _this.pending || _fail++ > 25 || (_this.connected = !1, _this.pending = !0, _this.events.fire(SocketConnection.CLOSE, {
                socket: _this
            }, !0), _this.delayedCall(connect, 250), clearTimeout(_pingPong))
        }
        this.connected = !1, async function() {
            try {
                connect()
            } catch (e) {
                await defer(), _this.events.fire(SocketConnection.ERROR, {
                    socket: _this
                }), _this.delayedCall(connect, 250)
            }
        }(), this.send = function(evt, data = {}) {
            if(!_this.connected) return _this.delayedCall(_ => _this.send(evt, data), 100);
            data._evt = evt, _socket && _socket.send(JSON.stringify(data))
        }
    }), _ => {
        SocketConnection.OPEN = "socket_connection_open", SocketConnection.CLOSE = "socket_connection_close", SocketConnection.ERROR = "socket_connection_error"
    }), Class((function Main() {
        GameCenter.connect("wss://socket.network/ws"), GameCenter.joinRoom("debug_jsfiddle")
    }));
window._MINIFIED_ = true;
window._BUILT_ = true;
