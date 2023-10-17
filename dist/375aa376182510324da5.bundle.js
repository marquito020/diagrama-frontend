/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Emitter;
/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

// alias used for reserved events (protected method)
Emitter.prototype.emitReserved = Emitter.prototype.emit;

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = pick;
/* harmony export (immutable) */ __webpack_exports__["b"] = installTimerFunctions;
/* harmony export (immutable) */ __webpack_exports__["a"] = byteLength;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__globalThis_js__ = __webpack_require__(3);

function pick(obj, ...attr) {
    return attr.reduce((acc, k) => {
        if (obj.hasOwnProperty(k)) {
            acc[k] = obj[k];
        }
        return acc;
    }, {});
}
// Keep a reference to the real timeout functions so they can be used when overridden
const NATIVE_SET_TIMEOUT = setTimeout;
const NATIVE_CLEAR_TIMEOUT = clearTimeout;
function installTimerFunctions(obj, opts) {
    if (opts.useNativeTimers) {
        obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(__WEBPACK_IMPORTED_MODULE_0__globalThis_js__["a" /* default */]);
        obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(__WEBPACK_IMPORTED_MODULE_0__globalThis_js__["a" /* default */]);
    }
    else {
        obj.setTimeoutFn = setTimeout.bind(__WEBPACK_IMPORTED_MODULE_0__globalThis_js__["a" /* default */]);
        obj.clearTimeoutFn = clearTimeout.bind(__WEBPACK_IMPORTED_MODULE_0__globalThis_js__["a" /* default */]);
    }
}
// base64 encoded buffers are about 33% bigger (https://en.wikipedia.org/wiki/Base64)
const BASE64_OVERHEAD = 1.33;
// we could also have used `new Blob([obj]).size`, but it isn't supported in IE9
function byteLength(obj) {
    if (typeof obj === "string") {
        return utf8Length(obj);
    }
    // arraybuffer or blob
    return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
}
function utf8Length(str) {
    let c = 0, length = 0;
    for (let i = 0, l = str.length; i < l; i++) {
        c = str.charCodeAt(i);
        if (c < 0x80) {
            length += 1;
        }
        else if (c < 0x800) {
            length += 2;
        }
        else if (c < 0xd800 || c >= 0xe000) {
            length += 3;
        }
        else {
            i++;
            length += 4;
        }
    }
    return length;
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return encodePayload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return decodePayload; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__encodePacket_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__decodePacket_js__ = __webpack_require__(25);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__encodePacket_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__decodePacket_js__["a"]; });


const SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text
const encodePayload = (packets, callback) => {
    // some packets may be added to the array while encoding, so the initial length must be saved
    const length = packets.length;
    const encodedPackets = new Array(length);
    let count = 0;
    packets.forEach((packet, i) => {
        // force base64 encoding for binary packets
        Object(__WEBPACK_IMPORTED_MODULE_0__encodePacket_js__["a" /* default */])(packet, false, encodedPacket => {
            encodedPackets[i] = encodedPacket;
            if (++count === length) {
                callback(encodedPackets.join(SEPARATOR));
            }
        });
    });
};
const decodePayload = (encodedPayload, binaryType) => {
    const encodedPackets = encodedPayload.split(SEPARATOR);
    const packets = [];
    for (let i = 0; i < encodedPackets.length; i++) {
        const decodedPacket = Object(__WEBPACK_IMPORTED_MODULE_1__decodePacket_js__["a" /* default */])(encodedPackets[i], binaryType);
        packets.push(decodedPacket);
        if (decodedPacket.type === "error") {
            break;
        }
    }
    return packets;
};
const protocol = 4;
/* harmony export (immutable) */ __webpack_exports__["e"] = protocol;




/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ((() => {
    if (typeof self !== "undefined") {
        return self;
    }
    else if (typeof window !== "undefined") {
        return window;
    }
    else {
        return Function("return this")();
    }
})());


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Abstract class for handler */

var Handler = function () {
  function Handler() {
    _classCallCheck(this, Handler);

    this.next = {
      handleRequest: function handleRequest() {
        console.log('All strategies exhausted');
      }
    };
  }

  _createClass(Handler, [{
    key: 'setNext',
    value: function setNext(next) {
      this.next = next;
      return next;
    }
  }, {
    key: 'handleRequest',
    value: function handleRequest() {
      throw new Error('Method not implemented', this);
    }
  }]);

  return Handler;
}();

exports.default = Handler;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_engine_io_parser__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__socket_io_component_emitter__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_js__ = __webpack_require__(1);



class TransportError extends Error {
    constructor(reason, description, context) {
        super(reason);
        this.description = description;
        this.context = context;
        this.type = "TransportError";
    }
}
class Transport extends __WEBPACK_IMPORTED_MODULE_1__socket_io_component_emitter__["a" /* Emitter */] {
    /**
     * Transport abstract constructor.
     *
     * @param {Object} options.
     * @api private
     */
    constructor(opts) {
        super();
        this.writable = false;
        Object(__WEBPACK_IMPORTED_MODULE_2__util_js__["b" /* installTimerFunctions */])(this, opts);
        this.opts = opts;
        this.query = opts.query;
        this.readyState = "";
        this.socket = opts.socket;
    }
    /**
     * Emits an error.
     *
     * @param {String} reason
     * @param description
     * @param context - the error context
     * @return {Transport} for chaining
     * @api protected
     */
    onError(reason, description, context) {
        super.emitReserved("error", new TransportError(reason, description, context));
        return this;
    }
    /**
     * Opens the transport.
     *
     * @api public
     */
    open() {
        if ("closed" === this.readyState || "" === this.readyState) {
            this.readyState = "opening";
            this.doOpen();
        }
        return this;
    }
    /**
     * Closes the transport.
     *
     * @api public
     */
    close() {
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.doClose();
            this.onClose();
        }
        return this;
    }
    /**
     * Sends multiple packets.
     *
     * @param {Array} packets
     * @api public
     */
    send(packets) {
        if ("open" === this.readyState) {
            this.write(packets);
        }
        else {
            // this might happen if the transport was silently closed in the beforeunload event handler
        }
    }
    /**
     * Called upon open
     *
     * @api protected
     */
    onOpen() {
        this.readyState = "open";
        this.writable = true;
        super.emitReserved("open");
    }
    /**
     * Called with data.
     *
     * @param {String} data
     * @api protected
     */
    onData(data) {
        const packet = Object(__WEBPACK_IMPORTED_MODULE_0_engine_io_parser__["a" /* decodePacket */])(data, this.socket.binaryType);
        this.onPacket(packet);
    }
    /**
     * Called with a decoded packet.
     *
     * @api protected
     */
    onPacket(packet) {
        super.emitReserved("packet", packet);
    }
    /**
     * Called upon close.
     *
     * @api protected
     */
    onClose(details) {
        this.readyState = "closed";
        super.emitReserved("close", details);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Transport;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = encode;
/* harmony export (immutable) */ __webpack_exports__["a"] = decode;
// imported from https://github.com/galkn/querystring
/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */
function encode(obj) {
    let str = '';
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (str.length)
                str += '&';
            str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
        }
    }
    return str;
}
/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */
function decode(qs) {
    let qry = {};
    let pairs = qs.split('&');
    for (let i = 0, l = pairs.length; i < l; i++) {
        let pair = pairs[i].split('=');
        qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return qry;
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PacketType", function() { return PacketType; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__socket_io_component_emitter__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__binary_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__is_binary_js__ = __webpack_require__(14);



/**
 * Protocol version.
 *
 * @public
 */
const protocol = 5;
/* harmony export (immutable) */ __webpack_exports__["protocol"] = protocol;

var PacketType;
(function (PacketType) {
    PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
    PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType[PacketType["EVENT"] = 2] = "EVENT";
    PacketType[PacketType["ACK"] = 3] = "ACK";
    PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType || (PacketType = {}));
/**
 * A socket.io Encoder instance
 */
class Encoder {
    /**
     * Encoder constructor
     *
     * @param {function} replacer - custom replacer to pass down to JSON.parse
     */
    constructor(replacer) {
        this.replacer = replacer;
    }
    /**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     */
    encode(obj) {
        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
            if (Object(__WEBPACK_IMPORTED_MODULE_2__is_binary_js__["a" /* hasBinary */])(obj)) {
                obj.type =
                    obj.type === PacketType.EVENT
                        ? PacketType.BINARY_EVENT
                        : PacketType.BINARY_ACK;
                return this.encodeAsBinary(obj);
            }
        }
        return [this.encodeAsString(obj)];
    }
    /**
     * Encode packet as string.
     */
    encodeAsString(obj) {
        // first is type
        let str = "" + obj.type;
        // attachments if we have them
        if (obj.type === PacketType.BINARY_EVENT ||
            obj.type === PacketType.BINARY_ACK) {
            str += obj.attachments + "-";
        }
        // if we have a namespace other than `/`
        // we append it followed by a comma `,`
        if (obj.nsp && "/" !== obj.nsp) {
            str += obj.nsp + ",";
        }
        // immediately followed by the id
        if (null != obj.id) {
            str += obj.id;
        }
        // json data
        if (null != obj.data) {
            str += JSON.stringify(obj.data, this.replacer);
        }
        return str;
    }
    /**
     * Encode packet as 'buffer sequence' by removing blobs, and
     * deconstructing packet into object with placeholders and
     * a list of buffers.
     */
    encodeAsBinary(obj) {
        const deconstruction = Object(__WEBPACK_IMPORTED_MODULE_1__binary_js__["a" /* deconstructPacket */])(obj);
        const pack = this.encodeAsString(deconstruction.packet);
        const buffers = deconstruction.buffers;
        buffers.unshift(pack); // add packet info to beginning of data list
        return buffers; // write all the buffers
    }
}
/* harmony export (immutable) */ __webpack_exports__["Encoder"] = Encoder;

/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 */
class Decoder extends __WEBPACK_IMPORTED_MODULE_0__socket_io_component_emitter__["a" /* Emitter */] {
    /**
     * Decoder constructor
     *
     * @param {function} reviver - custom reviver to pass down to JSON.stringify
     */
    constructor(reviver) {
        super();
        this.reviver = reviver;
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */
    add(obj) {
        let packet;
        if (typeof obj === "string") {
            packet = this.decodeString(obj);
            if (packet.type === PacketType.BINARY_EVENT ||
                packet.type === PacketType.BINARY_ACK) {
                // binary packet's json
                this.reconstructor = new BinaryReconstructor(packet);
                // no attachments, labeled binary but no binary data to follow
                if (packet.attachments === 0) {
                    super.emitReserved("decoded", packet);
                }
            }
            else {
                // non-binary full packet
                super.emitReserved("decoded", packet);
            }
        }
        else if (Object(__WEBPACK_IMPORTED_MODULE_2__is_binary_js__["b" /* isBinary */])(obj) || obj.base64) {
            // raw binary data
            if (!this.reconstructor) {
                throw new Error("got binary data when not reconstructing a packet");
            }
            else {
                packet = this.reconstructor.takeBinaryData(obj);
                if (packet) {
                    // received final buffer
                    this.reconstructor = null;
                    super.emitReserved("decoded", packet);
                }
            }
        }
        else {
            throw new Error("Unknown type: " + obj);
        }
    }
    /**
     * Decode a packet String (JSON data)
     *
     * @param {String} str
     * @return {Object} packet
     */
    decodeString(str) {
        let i = 0;
        // look up type
        const p = {
            type: Number(str.charAt(0)),
        };
        if (PacketType[p.type] === undefined) {
            throw new Error("unknown packet type " + p.type);
        }
        // look up attachments if type binary
        if (p.type === PacketType.BINARY_EVENT ||
            p.type === PacketType.BINARY_ACK) {
            const start = i + 1;
            while (str.charAt(++i) !== "-" && i != str.length) { }
            const buf = str.substring(start, i);
            if (buf != Number(buf) || str.charAt(i) !== "-") {
                throw new Error("Illegal attachments");
            }
            p.attachments = Number(buf);
        }
        // look up namespace (if any)
        if ("/" === str.charAt(i + 1)) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if ("," === c)
                    break;
                if (i === str.length)
                    break;
            }
            p.nsp = str.substring(start, i);
        }
        else {
            p.nsp = "/";
        }
        // look up id
        const next = str.charAt(i + 1);
        if ("" !== next && Number(next) == next) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if (null == c || Number(c) != c) {
                    --i;
                    break;
                }
                if (i === str.length)
                    break;
            }
            p.id = Number(str.substring(start, i + 1));
        }
        // look up json data
        if (str.charAt(++i)) {
            const payload = this.tryParse(str.substr(i));
            if (Decoder.isPayloadValid(p.type, payload)) {
                p.data = payload;
            }
            else {
                throw new Error("invalid payload");
            }
        }
        return p;
    }
    tryParse(str) {
        try {
            return JSON.parse(str, this.reviver);
        }
        catch (e) {
            return false;
        }
    }
    static isPayloadValid(type, payload) {
        switch (type) {
            case PacketType.CONNECT:
                return typeof payload === "object";
            case PacketType.DISCONNECT:
                return payload === undefined;
            case PacketType.CONNECT_ERROR:
                return typeof payload === "string" || typeof payload === "object";
            case PacketType.EVENT:
            case PacketType.BINARY_EVENT:
                return Array.isArray(payload) && payload.length > 0;
            case PacketType.ACK:
            case PacketType.BINARY_ACK:
                return Array.isArray(payload);
        }
    }
    /**
     * Deallocates a parser's resources
     */
    destroy() {
        if (this.reconstructor) {
            this.reconstructor.finishedReconstruction();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["Decoder"] = Decoder;

/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 */
class BinaryReconstructor {
    constructor(packet) {
        this.packet = packet;
        this.buffers = [];
        this.reconPack = packet;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */
    takeBinaryData(binData) {
        this.buffers.push(binData);
        if (this.buffers.length === this.reconPack.attachments) {
            // done with buffer list
            const packet = Object(__WEBPACK_IMPORTED_MODULE_1__binary_js__["b" /* reconstructPacket */])(this.reconPack, this.buffers);
            this.finishedReconstruction();
            return packet;
        }
        return null;
    }
    /**
     * Cleans up binary packet reconstruction variables.
     */
    finishedReconstruction() {
        this.reconPack = null;
        this.buffers = [];
    }
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__socket_js__ = __webpack_require__(22);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__socket_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__transport_js__ = __webpack_require__(5);
/* unused harmony reexport Transport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transports_index_js__ = __webpack_require__(9);
/* unused harmony reexport transports */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_js__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__util_js__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__contrib_parseuri_js__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__contrib_parseuri_js__["a"]; });


const protocol = __WEBPACK_IMPORTED_MODULE_0__socket_js__["a" /* Socket */].protocol;
/* unused harmony export protocol */







/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polling_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__websocket_js__ = __webpack_require__(29);


const transports = {
    websocket: __WEBPACK_IMPORTED_MODULE_1__websocket_js__["a" /* WS */],
    polling: __WEBPACK_IMPORTED_MODULE_0__polling_js__["a" /* Polling */]
};
/* harmony export (immutable) */ __webpack_exports__["a"] = transports;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PACKET_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PACKET_TYPES_REVERSE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ERROR_PACKET; });
const PACKET_TYPES = Object.create(null); // no Map = no polyfill
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
const PACKET_TYPES_REVERSE = Object.create(null);
Object.keys(PACKET_TYPES).forEach(key => {
    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
const ERROR_PACKET = { type: "error", data: "parser error" };



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export encode */
/* unused harmony export decode */
/* harmony export (immutable) */ __webpack_exports__["a"] = yeast;
// imported from https://github.com/unshiftio/yeast

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''), length = 64, map = {};
let seed = 0, i = 0, prev;
/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
    let encoded = '';
    do {
        encoded = alphabet[num % length] + encoded;
        num = Math.floor(num / length);
    } while (num > 0);
    return encoded;
}
/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
    let decoded = 0;
    for (i = 0; i < str.length; i++) {
        decoded = decoded * length + map[str.charAt(i)];
    }
    return decoded;
}
/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
    const now = encode(+new Date());
    if (now !== prev)
        return seed = 0, prev = now;
    return now + '.' + encode(seed++);
}
//
// Map each character to its index.
//
for (; i < length; i++)
    map[alphabet[i]] = i;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = parse;
// imported from https://github.com/galkn/parseuri
/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */
const re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
const parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];
function parse(str) {
    const src = str, b = str.indexOf('['), e = str.indexOf(']');
    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }
    let m = re.exec(str || ''), uri = {}, i = 14;
    while (i--) {
        uri[parts[i]] = m[i] || '';
    }
    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }
    uri.pathNames = pathNames(uri, uri['path']);
    uri.queryKey = queryKey(uri, uri['query']);
    return uri;
}
function pathNames(obj, path) {
    const regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
    if (path.substr(0, 1) == '/' || path.length === 0) {
        names.splice(0, 1);
    }
    if (path.substr(path.length - 1, 1) == '/') {
        names.splice(names.length - 1, 1);
    }
    return names;
}
function queryKey(uri, query) {
    const data = {};
    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
        if ($1) {
            data[$1] = $2;
        }
    });
    return data;
}


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_socket_io_parser__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__on_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__socket_io_component_emitter__ = __webpack_require__(0);



/**
 * Internal events.
 * These events can't be emitted by the user.
 */
const RESERVED_EVENTS = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1,
});
class Socket extends __WEBPACK_IMPORTED_MODULE_2__socket_io_component_emitter__["a" /* Emitter */] {
    /**
     * `Socket` constructor.
     *
     * @public
     */
    constructor(io, nsp, opts) {
        super();
        this.connected = false;
        this.receiveBuffer = [];
        this.sendBuffer = [];
        this.ids = 0;
        this.acks = {};
        this.flags = {};
        this.io = io;
        this.nsp = nsp;
        if (opts && opts.auth) {
            this.auth = opts.auth;
        }
        if (this.io._autoConnect)
            this.open();
    }
    /**
     * Whether the socket is currently disconnected
     */
    get disconnected() {
        return !this.connected;
    }
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */
    subEvents() {
        if (this.subs)
            return;
        const io = this.io;
        this.subs = [
            Object(__WEBPACK_IMPORTED_MODULE_1__on_js__["a" /* on */])(io, "open", this.onopen.bind(this)),
            Object(__WEBPACK_IMPORTED_MODULE_1__on_js__["a" /* on */])(io, "packet", this.onpacket.bind(this)),
            Object(__WEBPACK_IMPORTED_MODULE_1__on_js__["a" /* on */])(io, "error", this.onerror.bind(this)),
            Object(__WEBPACK_IMPORTED_MODULE_1__on_js__["a" /* on */])(io, "close", this.onclose.bind(this)),
        ];
    }
    /**
     * Whether the Socket will try to reconnect when its Manager connects or reconnects
     */
    get active() {
        return !!this.subs;
    }
    /**
     * "Opens" the socket.
     *
     * @public
     */
    connect() {
        if (this.connected)
            return this;
        this.subEvents();
        if (!this.io["_reconnecting"])
            this.io.open(); // ensure open
        if ("open" === this.io._readyState)
            this.onopen();
        return this;
    }
    /**
     * Alias for connect()
     */
    open() {
        return this.connect();
    }
    /**
     * Sends a `message` event.
     *
     * @return self
     * @public
     */
    send(...args) {
        args.unshift("message");
        this.emit.apply(this, args);
        return this;
    }
    /**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @return self
     * @public
     */
    emit(ev, ...args) {
        if (RESERVED_EVENTS.hasOwnProperty(ev)) {
            throw new Error('"' + ev + '" is a reserved event name');
        }
        args.unshift(ev);
        const packet = {
            type: __WEBPACK_IMPORTED_MODULE_0_socket_io_parser__["PacketType"].EVENT,
            data: args,
        };
        packet.options = {};
        packet.options.compress = this.flags.compress !== false;
        // event ack callback
        if ("function" === typeof args[args.length - 1]) {
            const id = this.ids++;
            const ack = args.pop();
            this._registerAckCallback(id, ack);
            packet.id = id;
        }
        const isTransportWritable = this.io.engine &&
            this.io.engine.transport &&
            this.io.engine.transport.writable;
        const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
        if (discardPacket) {
        }
        else if (this.connected) {
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
        }
        else {
            this.sendBuffer.push(packet);
        }
        this.flags = {};
        return this;
    }
    /**
     * @private
     */
    _registerAckCallback(id, ack) {
        const timeout = this.flags.timeout;
        if (timeout === undefined) {
            this.acks[id] = ack;
            return;
        }
        // @ts-ignore
        const timer = this.io.setTimeoutFn(() => {
            delete this.acks[id];
            for (let i = 0; i < this.sendBuffer.length; i++) {
                if (this.sendBuffer[i].id === id) {
                    this.sendBuffer.splice(i, 1);
                }
            }
            ack.call(this, new Error("operation has timed out"));
        }, timeout);
        this.acks[id] = (...args) => {
            // @ts-ignore
            this.io.clearTimeoutFn(timer);
            ack.apply(this, [null, ...args]);
        };
    }
    /**
     * Sends a packet.
     *
     * @param packet
     * @private
     */
    packet(packet) {
        packet.nsp = this.nsp;
        this.io._packet(packet);
    }
    /**
     * Called upon engine `open`.
     *
     * @private
     */
    onopen() {
        if (typeof this.auth == "function") {
            this.auth((data) => {
                this.packet({ type: __WEBPACK_IMPORTED_MODULE_0_socket_io_parser__["PacketType"].CONNECT, data });
            });
        }
        else {
            this.packet({ type: __WEBPACK_IMPORTED_MODULE_0_socket_io_parser__["PacketType"].CONNECT, data: this.auth });
        }
    }
    /**
     * Called upon engine or manager `error`.
     *
     * @param err
     * @private
     */
    onerror(err) {
        if (!this.connected) {
            this.emitReserved("connect_error", err);
        }
    }
    /**
     * Called upon engine `close`.
     *
     * @param reason
     * @param description
     * @private
     */
    onclose(reason, description) {
        this.connected = false;
        delete this.id;
        this.emitReserved("disconnect", reason, description);
    }
    /**
     * Called with socket packet.
     *
     * @param packet
     * @private
     */
    onpacket(packet) {
        const sameNamespace = packet.nsp === this.nsp;
        if (!sameNamespace)
            return;
        switch (packet.type) {
            case __WEBPACK_IMPORTED_MODULE_0_socket_io_parser__["PacketType"].CONNECT:
                if (packet.data && packet.data.sid) {
                    const id = packet.data.sid;
                    this.onconnect(id);
                }
                else {
                    this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                }
                break;
            case __WEBPACK_IMPORTED_MODULE_0_socket_io_parser__["PacketType"].EVENT:
            case __WEBPACK_IMPORTED_MODULE_0_socket_io_parser__["PacketType"].BINARY_EVENT:
                this.onevent(packet);
                break;
            case __WEBPACK_IMPORTED_MODULE_0_socket_io_parser__["PacketType"].ACK:
            case __WEBPACK_IMPORTED_MODULE_0_socket_io_parser__["PacketType"].BINARY_ACK:
                this.onack(packet);
                break;
            case __WEBPACK_IMPORTED_MODULE_0_socket_io_parser__["PacketType"].DISCONNECT:
                this.ondisconnect();
                break;
            case __WEBPACK_IMPORTED_MODULE_0_socket_io_parser__["PacketType"].CONNECT_ERROR:
                this.destroy();
                const err = new Error(packet.data.message);
                // @ts-ignore
                err.data = packet.data.data;
                this.emitReserved("connect_error", err);
                break;
        }
    }
    /**
     * Called upon a server event.
     *
     * @param packet
     * @private
     */
    onevent(packet) {
        const args = packet.data || [];
        if (null != packet.id) {
            args.push(this.ack(packet.id));
        }
        if (this.connected) {
            this.emitEvent(args);
        }
        else {
            this.receiveBuffer.push(Object.freeze(args));
        }
    }
    emitEvent(args) {
        if (this._anyListeners && this._anyListeners.length) {
            const listeners = this._anyListeners.slice();
            for (const listener of listeners) {
                listener.apply(this, args);
            }
        }
        super.emit.apply(this, args);
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @private
     */
    ack(id) {
        const self = this;
        let sent = false;
        return function (...args) {
            // prevent double callbacks
            if (sent)
                return;
            sent = true;
            self.packet({
                type: __WEBPACK_IMPORTED_MODULE_0_socket_io_parser__["PacketType"].ACK,
                id: id,
                data: args,
            });
        };
    }
    /**
     * Called upon a server acknowlegement.
     *
     * @param packet
     * @private
     */
    onack(packet) {
        const ack = this.acks[packet.id];
        if ("function" === typeof ack) {
            ack.apply(this, packet.data);
            delete this.acks[packet.id];
        }
        else {
        }
    }
    /**
     * Called upon server connect.
     *
     * @private
     */
    onconnect(id) {
        this.id = id;
        this.connected = true;
        this.emitBuffered();
        this.emitReserved("connect");
    }
    /**
     * Emit buffered events (received and emitted).
     *
     * @private
     */
    emitBuffered() {
        this.receiveBuffer.forEach((args) => this.emitEvent(args));
        this.receiveBuffer = [];
        this.sendBuffer.forEach((packet) => {
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
        });
        this.sendBuffer = [];
    }
    /**
     * Called upon server disconnect.
     *
     * @private
     */
    ondisconnect() {
        this.destroy();
        this.onclose("io server disconnect");
    }
    /**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @private
     */
    destroy() {
        if (this.subs) {
            // clean subscriptions to avoid reconnections
            this.subs.forEach((subDestroy) => subDestroy());
            this.subs = undefined;
        }
        this.io["_destroy"](this);
    }
    /**
     * Disconnects the socket manually.
     *
     * @return self
     * @public
     */
    disconnect() {
        if (this.connected) {
            this.packet({ type: __WEBPACK_IMPORTED_MODULE_0_socket_io_parser__["PacketType"].DISCONNECT });
        }
        // remove socket from pool
        this.destroy();
        if (this.connected) {
            // fire events
            this.onclose("io client disconnect");
        }
        return this;
    }
    /**
     * Alias for disconnect()
     *
     * @return self
     * @public
     */
    close() {
        return this.disconnect();
    }
    /**
     * Sets the compress flag.
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     * @public
     */
    compress(compress) {
        this.flags.compress = compress;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
     * ready to send messages.
     *
     * @returns self
     * @public
     */
    get volatile() {
        this.flags.volatile = true;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
     * given number of milliseconds have elapsed without an acknowledgement from the server:
     *
     * ```
     * socket.timeout(5000).emit("my-event", (err) => {
     *   if (err) {
     *     // the server did not acknowledge the event in the given delay
     *   }
     * });
     * ```
     *
     * @returns self
     * @public
     */
    timeout(timeout) {
        this.flags.timeout = timeout;
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @param listener
     * @public
     */
    onAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @param listener
     * @public
     */
    prependAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @param listener
     * @public
     */
    offAny(listener) {
        if (!this._anyListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyListeners;
            for (let i = 0; i < listeners.length; i++) {
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        }
        else {
            this._anyListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     *
     * @public
     */
    listenersAny() {
        return this._anyListeners || [];
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @param listener
     *
     * <pre><code>
     *
     * socket.onAnyOutgoing((event, ...args) => {
     *   console.log(event);
     * });
     *
     * </pre></code>
     *
     * @public
     */
    onAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @param listener
     *
     * <pre><code>
     *
     * socket.prependAnyOutgoing((event, ...args) => {
     *   console.log(event);
     * });
     *
     * </pre></code>
     *
     * @public
     */
    prependAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @param listener
     *
     * <pre><code>
     *
     * const handler = (event, ...args) => {
     *   console.log(event);
     * }
     *
     * socket.onAnyOutgoing(handler);
     *
     * // then later
     * socket.offAnyOutgoing(handler);
     *
     * </pre></code>
     *
     * @public
     */
    offAnyOutgoing(listener) {
        if (!this._anyOutgoingListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyOutgoingListeners;
            for (let i = 0; i < listeners.length; i++) {
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        }
        else {
            this._anyOutgoingListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     *
     * @public
     */
    listenersAnyOutgoing() {
        return this._anyOutgoingListeners || [];
    }
    /**
     * Notify the listeners for each packet sent
     *
     * @param packet
     *
     * @private
     */
    notifyOutgoingListeners(packet) {
        if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
            const listeners = this._anyOutgoingListeners.slice();
            for (const listener of listeners) {
                listener.apply(this, packet.data);
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Socket;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = isBinary;
/* harmony export (immutable) */ __webpack_exports__["a"] = hasBinary;
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const isView = (obj) => {
    return typeof ArrayBuffer.isView === "function"
        ? ArrayBuffer.isView(obj)
        : obj.buffer instanceof ArrayBuffer;
};
const toString = Object.prototype.toString;
const withNativeBlob = typeof Blob === "function" ||
    (typeof Blob !== "undefined" &&
        toString.call(Blob) === "[object BlobConstructor]");
const withNativeFile = typeof File === "function" ||
    (typeof File !== "undefined" &&
        toString.call(File) === "[object FileConstructor]");
/**
 * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
 *
 * @private
 */
function isBinary(obj) {
    return ((withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj))) ||
        (withNativeBlob && obj instanceof Blob) ||
        (withNativeFile && obj instanceof File));
}
function hasBinary(obj, toJSON) {
    if (!obj || typeof obj !== "object") {
        return false;
    }
    if (Array.isArray(obj)) {
        for (let i = 0, l = obj.length; i < l; i++) {
            if (hasBinary(obj[i])) {
                return true;
            }
        }
        return false;
    }
    if (isBinary(obj)) {
        return true;
    }
    if (obj.toJSON &&
        typeof obj.toJSON === "function" &&
        arguments.length === 1) {
        return hasBinary(obj.toJSON(), true);
    }
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
            return true;
        }
    }
    return false;
}


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = on;
function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
        obj.off(ev, fn);
    };
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sidebar = __webpack_require__(39);
var Menus = __webpack_require__(17);
var Actions = __webpack_require__(41);
var Toolbar = __webpack_require__(54);
var Format = __webpack_require__(55);

/**
 * Copyright (c) 2006-2012, JGraph Ltd
 */
/**
 * Constructs a new graph editor
 */
var EditorUi = function EditorUi(editor, container, lightbox) {
  //console.log('editorUI...');
  mxEventSource.call(this);
  this.destroyFunctions = [];

  this.editor = editor || new Editor();
  EditorUi.prototype.editor = this.editor;

  this.container = container || document.body;
  var graph = this.editor.graph;
  graph.lightbox = lightbox;

  // Pre-fetches submenu image or replaces with embedded image if supported
  if (mxClient.IS_SVG) {
    mxPopupMenu.prototype.submenuImage = 'data:image/gif;base64,R0lGODlhCQAJAIAAAP///zMzMyH5BAEAAAAALAAAAAAJAAkAAAIPhI8WebHsHopSOVgb26AAADs=';
  } else {
    new Image().src = mxPopupMenu.prototype.submenuImage;
  }

  // Pre-fetches connect image
  if (!mxClient.IS_SVG && mxConnectionHandler.prototype.connectImage != null) {
    new Image().src = mxConnectionHandler.prototype.connectImage.src;
  }

  // Disables graph and forced panning in chromeless mode
  if (this.editor.chromeless) {
    this.footerHeight = 0;
    graph.isEnabled = function () {
      return false;
    };
    graph.panningHandler.isForcePanningEvent = function (me) {
      return !mxEvent.isPopupTrigger(me.getEvent());
    };
  }

  // Creates the user interface
  this.actions = new Actions(this);
  EditorUi.prototype.actions = this.actions;
  this.menus = this.createMenus();
  this.createDivs();
  this.createUi();
  this.refresh();

  // Disables HTML and text selection
  var textEditing = mxUtils.bind(this, function (evt) {
    if (evt == null) {
      evt = window.event;
    }

    return this.isSelectionAllowed(evt) || graph.isEditing();
  });

  // Disables text selection while not editing and no dialog visible
  if (this.container == document.body) {
    this.menubarContainer.onselectstart = textEditing;
    this.menubarContainer.onmousedown = textEditing;
    this.toolbarContainer.onselectstart = textEditing;
    this.toolbarContainer.onmousedown = textEditing;
    this.diagramContainer.onselectstart = textEditing;
    this.diagramContainer.onmousedown = textEditing;
    this.sidebarContainer.onselectstart = textEditing;
    this.sidebarContainer.onmousedown = textEditing;
    this.formatContainer.onselectstart = textEditing;
    this.formatContainer.onmousedown = textEditing;
    this.footerContainer.onselectstart = textEditing;
    this.footerContainer.onmousedown = textEditing;

    if (this.tabContainer != null) {
      // Mouse down is needed for drag and drop
      this.tabContainer.onselectstart = textEditing;
    }
  }

  // And uses built-in context menu while editing
  if (!this.editor.chromeless) {
    if (mxClient.IS_IE && (typeof document.documentMode === 'undefined' || document.documentMode < 9)) {
      mxEvent.addListener(this.diagramContainer, 'contextmenu', textEditing);
    } else {
      // Allows browser context menu outside of diagram and sidebar
      this.diagramContainer.oncontextmenu = textEditing;
    }
  } else {
    graph.panningHandler.usePopupTrigger = false;
  }

  // Contains the main graph instance inside the given panel
  graph.init(this.diagramContainer);

  // Creates hover icons
  this.hoverIcons = this.createHoverIcons();

  // Adds tooltip when mouse is over scrollbars to show space-drag panning option
  mxEvent.addListener(this.diagramContainer, 'mousemove', mxUtils.bind(this, function (evt) {
    var off = mxUtils.getOffset(this.diagramContainer);

    if (mxEvent.getClientX(evt) - off.x - this.diagramContainer.clientWidth > 0 || mxEvent.getClientY(evt) - off.y - this.diagramContainer.clientHeight > 0) {
      this.diagramContainer.setAttribute('title', mxResources.get('panTooltip'));
    } else {
      this.diagramContainer.removeAttribute('title');
    }
  }));

  // Escape key hides dialogs, adds space+drag panning
  var spaceKeyPressed = false;

  // Overrides hovericons to disable while space key is pressed
  var hoverIconsIsResetEvent = this.hoverIcons.isResetEvent;

  this.hoverIcons.isResetEvent = function (evt, allowShift) {
    return spaceKeyPressed || hoverIconsIsResetEvent.apply(this, arguments);
  };

  this.keydownHandler = mxUtils.bind(this, function (evt) {
    if (evt.which == 32 /* Space */) {
        spaceKeyPressed = true;
        this.hoverIcons.reset();
        graph.container.style.cursor = 'move';

        // Disables scroll after space keystroke with scrollbars
        if (!graph.isEditing() && mxEvent.getSource(evt) == graph.container) {
          mxEvent.consume(evt);
        }
      } else if (!mxEvent.isConsumed(evt) && evt.keyCode == 27 /* Escape */) {
        this.hideDialog();
      }
  });

  mxEvent.addListener(document, 'keydown', this.keydownHandler);

  this.keyupHandler = mxUtils.bind(this, function (evt) {
    graph.container.style.cursor = '';
    spaceKeyPressed = false;
  });

  mxEvent.addListener(document, 'keyup', this.keyupHandler);

  // Forces panning for middle and right mouse buttons
  var panningHandlerIsForcePanningEvent = graph.panningHandler.isForcePanningEvent;
  graph.panningHandler.isForcePanningEvent = function (me) {
    // Ctrl+left button is reported as right button in FF on Mac
    return panningHandlerIsForcePanningEvent.apply(this, arguments) || spaceKeyPressed || mxEvent.isMouseEvent(me.getEvent()) && (this.usePopupTrigger || !mxEvent.isPopupTrigger(me.getEvent())) && (!mxEvent.isControlDown(me.getEvent()) && mxEvent.isRightMouseButton(me.getEvent()) || mxEvent.isMiddleMouseButton(me.getEvent()));
  };

  // Ctrl/Cmd+Enter applies editing value except in Safari where Ctrl+Enter creates
  // a new line (while Enter creates a new paragraph and Shift+Enter stops)
  var cellEditorIsStopEditingEvent = graph.cellEditor.isStopEditingEvent;
  graph.cellEditor.isStopEditingEvent = function (evt) {
    return cellEditorIsStopEditingEvent.apply(this, arguments) || evt.keyCode == 13 && (!mxClient.IS_SF && mxEvent.isControlDown(evt) || mxClient.IS_MAC && mxEvent.isMetaDown(evt) || mxClient.IS_SF && mxEvent.isShiftDown(evt));
  };

  // Switches toolbar for text editing
  var textMode = false;
  var fontMenu = null;
  var sizeMenu = null;
  var nodes = null;

  var updateToolbar = mxUtils.bind(this, function () {
    if (textMode != graph.cellEditor.isContentEditing()) {
      var node = this.toolbar.container.firstChild;
      var newNodes = [];

      while (node != null) {
        var tmp = node.nextSibling;

        if (mxUtils.indexOf(this.toolbar.staticElements, node) < 0) {
          node.parentNode.removeChild(node);
          newNodes.push(node);
        }

        node = tmp;
      }

      // Saves references to special items
      var tmp1 = this.toolbar.fontMenu;
      var tmp2 = this.toolbar.sizeMenu;

      if (nodes == null) {
        this.toolbar.createTextToolbar();
      } else {
        for (var i = 0; i < nodes.length; i++) {
          this.toolbar.container.appendChild(nodes[i]);
        }

        // Restores references to special items
        this.toolbar.fontMenu = fontMenu;
        this.toolbar.sizeMenu = sizeMenu;
      }

      textMode = graph.cellEditor.isContentEditing();
      fontMenu = tmp1;
      sizeMenu = tmp2;
      nodes = newNodes;
    }
  });

  var ui = this;

  // Overrides cell editor to update toolbar
  var cellEditorStartEditing = graph.cellEditor.startEditing;
  graph.cellEditor.startEditing = function () {
    cellEditorStartEditing.apply(this, arguments);
    updateToolbar();

    if (graph.cellEditor.isContentEditing()) {
      var updating = false;

      var updateCssHandler = function updateCssHandler() {
        if (!updating) {
          updating = true;

          window.setTimeout(function () {
            var selectedElement = graph.getSelectedElement();
            var node = selectedElement;

            while (node != null && node.nodeType != mxConstants.NODETYPE_ELEMENT) {
              node = node.parentNode;
            }

            if (node != null) {
              var css = mxUtils.getCurrentStyle(node);

              if (css != null && ui.toolbar != null) {
                // Strips leading and trailing quotes
                var ff = css.fontFamily;

                if (ff.charAt(0) == '\'') {
                  ff = ff.substring(1);
                }

                if (ff.charAt(ff.length - 1) == '\'') {
                  ff = ff.substring(0, ff.length - 1);
                }

                ui.toolbar.setFontName(ff);
                ui.toolbar.setFontSize(parseInt(css.fontSize));
              }
            }

            updating = false;
          }, 0);
        }
      };

      mxEvent.addListener(graph.cellEditor.textarea, 'input', updateCssHandler);
      mxEvent.addListener(graph.cellEditor.textarea, 'touchend', updateCssHandler);
      mxEvent.addListener(graph.cellEditor.textarea, 'mouseup', updateCssHandler);
      mxEvent.addListener(graph.cellEditor.textarea, 'keyup', updateCssHandler);
      updateCssHandler();
    }
  };

  var cellEditorStopEditing = graph.cellEditor.stopEditing;
  graph.cellEditor.stopEditing = function (cell, trigger) {
    cellEditorStopEditing.apply(this, arguments);
    updateToolbar();
  };

  // Enables scrollbars and sets cursor style for the container
  graph.container.setAttribute('tabindex', '0');
  graph.container.style.cursor = 'default';

  // Workaround for page scroll if embedded via iframe
  if (window.self === window.top && graph.container.parentNode != null) {
    graph.container.focus();
  }

  // Keeps graph container focused on mouse down
  var graphFireMouseEvent = graph.fireMouseEvent;
  graph.fireMouseEvent = function (evtName, me, sender) {
    if (evtName == mxEvent.MOUSE_DOWN) {
      this.container.focus();
    }

    graphFireMouseEvent.apply(this, arguments);
  };

  // Configures automatic expand on mouseover
  graph.popupMenuHandler.autoExpand = true;

  // Installs context menu
  if (this.menus != null) {
    graph.popupMenuHandler.factoryMethod = mxUtils.bind(this, function (menu, cell, evt) {
      this.menus.createPopupMenu(menu, cell, evt);
    });
  }

  // Hides context menu
  mxEvent.addGestureListeners(document, mxUtils.bind(this, function (evt) {
    graph.popupMenuHandler.hideMenu();
  }));

  // Create handler for key events
  this.keyHandler = this.createKeyHandler(editor);

  // Getter for key handler
  this.getKeyHandler = function () {
    return keyHandler;
  };

  // Stores the current style and assigns it to new cells
  var styles = ['rounded', 'shadow', 'glass', 'dashed', 'dashPattern', 'comic', 'labelBackgroundColor'];
  var connectStyles = ['shape', 'edgeStyle', 'curved', 'rounded', 'elbow', 'comic'];

  // Note: Everything that is not in styles is ignored (styles is augmented below)
  this.setDefaultStyle = function (cell) {
    var state = graph.view.getState(cell);

    if (state != null) {
      // Ignores default styles
      var clone = cell.clone();
      clone.style = '';
      var defaultStyle = graph.getCellStyle(clone);
      var values = [];
      var keys = [];

      for (var key in state.style) {
        if (defaultStyle[key] != state.style[key]) {
          values.push(state.style[key]);
          keys.push(key);
        }
      }

      // Handles special case for value "none"
      var cellStyle = graph.getModel().getStyle(state.cell);
      var tokens = cellStyle != null ? cellStyle.split(';') : [];

      for (var i = 0; i < tokens.length; i++) {
        var tmp = tokens[i];
        var pos = tmp.indexOf('=');

        if (pos >= 0) {
          var key = tmp.substring(0, pos);
          var value = tmp.substring(pos + 1);

          if (defaultStyle[key] != null && value == 'none') {
            values.push(value);
            keys.push(key);
          }
        }
      }

      // Resets current style
      if (graph.getModel().isEdge(state.cell)) {
        graph.currentEdgeStyle = {};
      } else {
        graph.currentVertexStyle = {};
      }

      this.fireEvent(new mxEventObject('styleChanged', 'keys', keys, 'values', values, 'cells', [state.cell]));
    }
  };

  this.clearDefaultStyle = function () {
    graph.currentEdgeStyle = graph.defaultEdgeStyle;
    graph.currentVertexStyle = {};

    // Updates UI
    this.fireEvent(new mxEventObject('styleChanged', 'keys', [], 'values', [], 'cells', []));
  };

  // Keys that should be ignored if the cell has a value (known: new default for all cells is html=1 so
  // for the html key this effecticely only works for edges inserted via the connection handler)
  var valueStyles = ['fontFamily', 'fontSize', 'fontColor'];

  // Keys that always update the current edge style regardless of selection
  var alwaysEdgeStyles = ['edgeStyle', 'startArrow', 'startFill', 'startSize', 'endArrow', 'endFill', 'endSize', 'jettySize', 'orthogonalLoop'];

  // Keys that are ignored together (if one appears all are ignored)
  var keyGroups = [['startArrow', 'startFill', 'startSize', 'endArrow', 'endFill', 'endSize', 'jettySize', 'orthogonalLoop'], ['strokeColor', 'strokeWidth'], ['fillColor', 'gradientColor'], valueStyles, ['align'], ['html']];

  // Adds all keys used above to the styles array
  for (var i = 0; i < keyGroups.length; i++) {
    for (var j = 0; j < keyGroups[i].length; j++) {
      styles.push(keyGroups[i][j]);
    }
  }

  for (var i = 0; i < connectStyles.length; i++) {
    styles.push(connectStyles[i]);
  }

  // Implements a global current style for edges and vertices that is applied to new cells
  var insertHandler = function insertHandler(cells, asText) {
    graph.getModel().beginUpdate();
    try {
      // Applies only basic text styles
      if (asText) {
        var edge = graph.getModel().isEdge(cell);
        var current = edge ? graph.currentEdgeStyle : graph.currentVertexStyle;
        var textStyles = ['fontSize', 'fontFamily', 'fontColor'];

        for (var j = 0; j < textStyles.length; j++) {
          var value = current[textStyles[j]];

          if (value != null) {
            graph.setCellStyles(textStyles[j], value, cells);
          }
        }
      } else {
        for (var i = 0; i < cells.length; i++) {
          var cell = cells[i];

          // Removes styles defined in the cell style from the styles to be applied
          var cellStyle = graph.getModel().getStyle(cell);
          var tokens = cellStyle != null ? cellStyle.split(';') : [];
          var appliedStyles = styles.slice();

          for (var j = 0; j < tokens.length; j++) {
            var tmp = tokens[j];
            var pos = tmp.indexOf('=');

            if (pos >= 0) {
              var key = tmp.substring(0, pos);
              var index = mxUtils.indexOf(appliedStyles, key);

              if (index >= 0) {
                appliedStyles.splice(index, 1);
              }

              // Handles special cases where one defined style ignores other styles
              for (var k = 0; k < keyGroups.length; k++) {
                var group = keyGroups[k];

                if (mxUtils.indexOf(group, key) >= 0) {
                  for (var l = 0; l < group.length; l++) {
                    var index2 = mxUtils.indexOf(appliedStyles, group[l]);

                    if (index2 >= 0) {
                      appliedStyles.splice(index2, 1);
                    }
                  }
                }
              }
            }
          }

          // Applies the current style to the cell
          var edge = graph.getModel().isEdge(cell);
          var current = edge ? graph.currentEdgeStyle : graph.currentVertexStyle;

          for (var j = 0; j < appliedStyles.length; j++) {
            var key = appliedStyles[j];
            var styleValue = current[key];

            if (styleValue != null && (key != 'shape' || edge)) {
              // Special case: Connect styles are not applied here but in the connection handler
              if (!edge || mxUtils.indexOf(connectStyles, key) < 0) {
                graph.setCellStyles(key, styleValue, [cell]);
              }
            }
          }
        }
      }
    } finally {
      graph.getModel().endUpdate();
    }
  };

  graph.addListener('cellsInserted', function (sender, evt) {
    insertHandler(evt.getProperty('cells'));
  });

  graph.addListener('textInserted', function (sender, evt) {
    insertHandler(evt.getProperty('cells'), true);
  });

  graph.connectionHandler.addListener(mxEvent.CONNECT, function (sender, evt) {
    var cells = [evt.getProperty('cell')];

    if (evt.getProperty('terminalInserted')) {
      cells.push(evt.getProperty('terminal'));
    }

    insertHandler(cells);
  });

  this.addListener('styleChanged', mxUtils.bind(this, function (sender, evt) {
    // Checks if edges and/or vertices were modified
    var cells = evt.getProperty('cells');
    var vertex = false;
    var edge = false;

    if (cells.length > 0) {
      for (var i = 0; i < cells.length; i++) {
        vertex = graph.getModel().isVertex(cells[i]) || vertex;
        edge = graph.getModel().isEdge(cells[i]) || edge;

        if (edge && vertex) {
          break;
        }
      }
    } else {
      vertex = true;
      edge = true;
    }

    var keys = evt.getProperty('keys');
    var values = evt.getProperty('values');

    for (var i = 0; i < keys.length; i++) {
      var common = mxUtils.indexOf(valueStyles, keys[i]) >= 0;

      // Ignores transparent stroke colors
      if (keys[i] != 'strokeColor' || values[i] != null && values[i] != 'none') {
        // Special case: Edge style and shape
        if (mxUtils.indexOf(connectStyles, keys[i]) >= 0) {
          if (edge || mxUtils.indexOf(alwaysEdgeStyles, keys[i]) >= 0) {
            if (values[i] == null) {
              delete graph.currentEdgeStyle[keys[i]];
            } else {
              graph.currentEdgeStyle[keys[i]] = values[i];
            }
          }
          // Uses style for vertex if defined in styles
          else if (vertex && mxUtils.indexOf(styles, keys[i]) >= 0) {
              if (values[i] == null) {
                delete graph.currentVertexStyle[keys[i]];
              } else {
                graph.currentVertexStyle[keys[i]] = values[i];
              }
            }
        } else if (mxUtils.indexOf(styles, keys[i]) >= 0) {
          if (vertex || common) {
            if (values[i] == null) {
              delete graph.currentVertexStyle[keys[i]];
            } else {
              graph.currentVertexStyle[keys[i]] = values[i];
            }
          }

          if (edge || common || mxUtils.indexOf(alwaysEdgeStyles, keys[i]) >= 0) {
            if (values[i] == null) {
              delete graph.currentEdgeStyle[keys[i]];
            } else {
              graph.currentEdgeStyle[keys[i]] = values[i];
            }
          }
        }
      }
    }

    if (this.toolbar != null) {
      this.toolbar.setFontName(graph.currentVertexStyle.fontFamily || Menus.prototype.defaultFont);
      this.toolbar.setFontSize(graph.currentVertexStyle.fontSize || Menus.prototype.defaultFontSize);

      if (this.toolbar.edgeStyleMenu != null) {
        // Updates toolbar icon for edge style
        var edgeStyleDiv = this.toolbar.edgeStyleMenu.getElementsByTagName('div')[0];

        if (graph.currentEdgeStyle.edgeStyle == 'orthogonalEdgeStyle' && graph.currentEdgeStyle.curved == '1') {
          edgeStyleDiv.className = 'geSprite geSprite-curved';
        } else if (graph.currentEdgeStyle.edgeStyle == 'straight' || graph.currentEdgeStyle.edgeStyle == 'none' || graph.currentEdgeStyle.edgeStyle == null) {
          edgeStyleDiv.className = 'geSprite geSprite-straight';
        } else if (graph.currentEdgeStyle.edgeStyle == 'entityRelationEdgeStyle') {
          edgeStyleDiv.className = 'geSprite geSprite-entity';
        } else if (graph.currentEdgeStyle.edgeStyle == 'elbowEdgeStyle') {
          edgeStyleDiv.className = 'geSprite geSprite-' + (graph.currentEdgeStyle.elbow == 'vertical' ? 'verticalelbow' : 'horizontalelbow');
        } else if (graph.currentEdgeStyle.edgeStyle == 'isometricEdgeStyle') {
          edgeStyleDiv.className = 'geSprite geSprite-' + (graph.currentEdgeStyle.elbow == 'vertical' ? 'verticalisometric' : 'horizontalisometric');
        } else {
          edgeStyleDiv.className = 'geSprite geSprite-orthogonal';
        }
      }

      if (this.toolbar.edgeShapeMenu != null) {
        // Updates icon for edge shape
        var edgeShapeDiv = this.toolbar.edgeShapeMenu.getElementsByTagName('div')[0];

        if (graph.currentEdgeStyle.shape == 'link') {
          edgeShapeDiv.className = 'geSprite geSprite-linkedge';
        } else if (graph.currentEdgeStyle.shape == 'flexArrow') {
          edgeShapeDiv.className = 'geSprite geSprite-arrow';
        } else if (graph.currentEdgeStyle.shape == 'arrow') {
          edgeShapeDiv.className = 'geSprite geSprite-simplearrow';
        } else {
          edgeShapeDiv.className = 'geSprite geSprite-connection';
        }
      }

      // Updates icon for optinal line start shape
      if (this.toolbar.lineStartMenu != null) {
        var lineStartDiv = this.toolbar.lineStartMenu.getElementsByTagName('div')[0];

        lineStartDiv.className = this.getCssClassForMarker('start', graph.currentEdgeStyle.shape, graph.currentEdgeStyle[mxConstants.STYLE_STARTARROW], mxUtils.getValue(graph.currentEdgeStyle, 'startFill', '1'));
      }

      // Updates icon for optinal line end shape
      if (this.toolbar.lineEndMenu != null) {
        var lineEndDiv = this.toolbar.lineEndMenu.getElementsByTagName('div')[0];

        lineEndDiv.className = this.getCssClassForMarker('end', graph.currentEdgeStyle.shape, graph.currentEdgeStyle[mxConstants.STYLE_ENDARROW], mxUtils.getValue(graph.currentEdgeStyle, 'endFill', '1'));
      }
    }
  }));

  // Update font size and font family labels
  if (this.toolbar != null) {
    var update = mxUtils.bind(this, function () {
      var ff = graph.currentVertexStyle.fontFamily || 'Helvetica';
      var fs = String(graph.currentVertexStyle.fontSize || '12');
      var state = graph.getView().getState(graph.getSelectionCell());

      if (state != null) {
        ff = state.style[mxConstants.STYLE_FONTFAMILY] || ff;
        fs = state.style[mxConstants.STYLE_FONTSIZE] || fs;

        if (ff.length > 10) {
          ff = ff.substring(0, 8) + '...';
        }
      }

      this.toolbar.setFontName(ff);
      this.toolbar.setFontSize(fs);
    });

    graph.getSelectionModel().addListener(mxEvent.CHANGE, update);
    graph.getModel().addListener(mxEvent.CHANGE, update);
  }

  // Makes sure the current layer is visible when cells are added
  graph.addListener(mxEvent.CELLS_ADDED, function (sender, evt) {
    var cells = evt.getProperty('cells');
    var parent = evt.getProperty('parent');

    if (graph.getModel().isLayer(parent) && !graph.isCellVisible(parent) && cells != null && cells.length > 0) {
      graph.getModel().setVisible(parent, true);
    }
  });

  // Global handler to hide the current menu
  this.gestureHandler = mxUtils.bind(this, function (evt) {
    if (this.currentMenu != null && mxEvent.getSource(evt) != this.currentMenu.div) {
      this.hideCurrentMenu();
    }
  });

  mxEvent.addGestureListeners(document, this.gestureHandler);

  // Updates the editor UI after the window has been resized or the orientation changes
  // Timeout is workaround for old IE versions which have a delay for DOM client sizes.
  // Should not use delay > 0 to avoid handle multiple repaints during window resize
  this.resizeHandler = mxUtils.bind(this, function () {
    window.setTimeout(mxUtils.bind(this, function () {
      this.refresh();
    }), 0);
  });

  mxEvent.addListener(window, 'resize', this.resizeHandler);

  this.orientationChangeHandler = mxUtils.bind(this, function () {
    this.refresh();
  });

  mxEvent.addListener(window, 'orientationchange', this.orientationChangeHandler);

  // Workaround for bug on iOS see
  // http://stackoverflow.com/questions/19012135/ios-7-ipad-safari-landscape-innerheight-outerheight-layout-issue
  if (mxClient.IS_IOS && !window.navigator.standalone) {
    this.scrollHandler = mxUtils.bind(this, function () {
      window.scrollTo(0, 0);
    });

    mxEvent.addListener(window, 'scroll', this.scrollHandler);
  }

  /**
  * Sets the initial scrollbar locations after a file was loaded.
  */
  this.editor.addListener('resetGraphView', mxUtils.bind(this, function () {
    this.resetScrollbars();
  }));

  /**
  * Repaints the grid.
  */
  this.addListener('gridEnabledChanged', mxUtils.bind(this, function () {
    graph.view.validateBackground();
  }));

  this.addListener('backgroundColorChanged', mxUtils.bind(this, function () {
    graph.view.validateBackground();
  }));

  /**
  * Repaints the grid.
  */
  graph.addListener('gridSizeChanged', mxUtils.bind(this, function () {
    if (graph.isGridEnabled()) {
      graph.view.validateBackground();
    }
  }));

  // Resets UI, updates action and menu states
  this.editor.resetGraph();
  this.init();
  this.open();
};

// Extends mxEventSource
mxUtils.extend(EditorUi, mxEventSource);

EditorUi.prototype.sidebar = Sidebar;

/**
 * Global config that specifies if the compact UI elements should be used.
 */
EditorUi.compactUi = true;

/**
 * Specifies the size of the split bar.
 */
EditorUi.prototype.splitSize = mxClient.IS_TOUCH || mxClient.IS_POINTER ? 12 : 8;

/**
 * Specifies the height of the menubar. Default is 34.
 */
EditorUi.prototype.menubarHeight = 55;

/**
 * Specifies the width of the format panel should be enabled. Default is true.
 */
EditorUi.prototype.formatEnabled = true;

/**
 * Specifies the width of the format panel. Default is 240.
 */
EditorUi.prototype.formatWidth = 240;

/**
 * Specifies the height of the toolbar. Default is 36.
 */
EditorUi.prototype.toolbarHeight = 34;

/**
 * Specifies the height of the footer. Default is 28.
 */
EditorUi.prototype.footerHeight = 28;

/**
 * Specifies the height of the optional sidebarFooterContainer. Default is 34.
 */
EditorUi.prototype.sidebarFooterHeight = 34;

/**
 * Specifies the link for the edit button in chromeless mode.
 */
EditorUi.prototype.editButtonLink = null;

/**
 * Specifies the position of the horizontal split bar. Default is 204 or 120 for
 * screen widths <= 500px.
 */
EditorUi.prototype.hsplitPosition = screen.width <= 500 ? 116 : 208;

/**
 * Specifies if animations are allowed in <executeLayout>. Default is true.
 */
EditorUi.prototype.allowAnimation = true;

/**
 * Installs the listeners to update the action states.
 */
EditorUi.prototype.init = function () {
  //console.log('editorUI prototype init...');
  /**
  * Keypress starts immediate editing on selection cell
  */
  var graph = this.editor.graph;

  mxEvent.addListener(graph.container, 'keydown', mxUtils.bind(this, function (evt) {
    console.log('keydown editorui listener...');
    // Tab selects next cell
    if (evt.which == 9 && graph.isEnabled() && !mxEvent.isAltDown(evt)) {
      if (graph.isEditing()) {
        graph.stopEditing(false);
      } else {
        graph.selectCell(!mxEvent.isShiftDown(evt));
      }

      mxEvent.consume(evt);
    }
  }));

  mxEvent.addListener(graph.container, 'keypress', mxUtils.bind(this, function (evt) {
    // KNOWN: Focus does not work if label is empty in quirks mode
    if (this.isImmediateEditingEvent(evt) && !graph.isEditing() && !graph.isSelectionEmpty() && evt.which !== 0 && !mxEvent.isAltDown(evt) && !mxEvent.isControlDown(evt) && !mxEvent.isMetaDown(evt)) {
      graph.escape();
      graph.startEditing();

      // Workaround for FF where char is lost if cursor is placed before char
      if (mxClient.IS_FF) {
        var ce = graph.cellEditor;
        ce.textarea.innerHTML = String.fromCharCode(evt.which);

        // Moves cursor to end of textarea
        var range = document.createRange();
        range.selectNodeContents(ce.textarea);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }));

  // Updates action states
  this.addUndoListener();
  this.addBeforeUnloadListener();

  graph.getSelectionModel().addListener(mxEvent.CHANGE, mxUtils.bind(this, function () {
    this.updateActionStates();
  }));

  graph.getModel().addListener(mxEvent.CHANGE, mxUtils.bind(this, function () {
    this.updateActionStates();
  }));

  // Changes action states after change of default parent
  var graphSetDefaultParent = graph.setDefaultParent;
  var ui = this;

  this.editor.graph.setDefaultParent = function () {
    graphSetDefaultParent.apply(this, arguments);
    ui.updateActionStates();
  };

  // Hack to make editLink available in vertex handler
  graph.editLink = ui.actions.get('editLink').funct;

  this.updateActionStates();
  this.initClipboard();
  this.initCanvas();

  if (this.format != null) {
    this.format.init();
  }
};

/**
 * Returns true if the given event should start editing. This implementation returns true.
 */
EditorUi.prototype.isImmediateEditingEvent = function (evt) {
  return true;
};

/**
 * Private helper method.
 */
EditorUi.prototype.getCssClassForMarker = function (prefix, shape, marker, fill) {
  var result = '';

  if (shape == 'flexArrow') {
    result = marker != null && marker != mxConstants.NONE ? 'geSprite geSprite-' + prefix + 'blocktrans' : 'geSprite geSprite-noarrow';
  } else if (marker == mxConstants.ARROW_CLASSIC) {
    result = fill == '1' ? 'geSprite geSprite-' + prefix + 'classic' : 'geSprite geSprite-' + prefix + 'classictrans';
  } else if (marker == mxConstants.ARROW_CLASSIC_THIN) {
    result = fill == '1' ? 'geSprite geSprite-' + prefix + 'classicthin' : 'geSprite geSprite-' + prefix + 'classicthintrans';
  } else if (marker == mxConstants.ARROW_OPEN) {
    result = 'geSprite geSprite-' + prefix + 'open';
  } else if (marker == mxConstants.ARROW_OPEN_THIN) {
    result = 'geSprite geSprite-' + prefix + 'openthin';
  } else if (marker == mxConstants.ARROW_BLOCK) {
    result = fill == '1' ? 'geSprite geSprite-' + prefix + 'block' : 'geSprite geSprite-' + prefix + 'blocktrans';
  } else if (marker == mxConstants.ARROW_BLOCK_THIN) {
    result = fill == '1' ? 'geSprite geSprite-' + prefix + 'blockthin' : 'geSprite geSprite-' + prefix + 'blockthintrans';
  } else if (marker == mxConstants.ARROW_OVAL) {
    result = fill == '1' ? 'geSprite geSprite-' + prefix + 'oval' : 'geSprite geSprite-' + prefix + 'ovaltrans';
  } else if (marker == mxConstants.ARROW_DIAMOND) {
    result = fill == '1' ? 'geSprite geSprite-' + prefix + 'diamond' : 'geSprite geSprite-' + prefix + 'diamondtrans';
  } else if (marker == mxConstants.ARROW_DIAMOND_THIN) {
    result = fill == '1' ? 'geSprite geSprite-' + prefix + 'thindiamond' : 'geSprite geSprite-' + prefix + 'thindiamondtrans';
  } else if (marker == 'openAsync') {
    result = 'geSprite geSprite-' + prefix + 'openasync';
  } else if (marker == 'dash') {
    result = 'geSprite geSprite-' + prefix + 'dash';
  } else if (marker == 'cross') {
    result = 'geSprite geSprite-' + prefix + 'cross';
  } else if (marker == 'async') {
    result = fill == '1' ? 'geSprite geSprite-' + prefix + 'async' : 'geSprite geSprite-' + prefix + 'asynctrans';
  } else if (marker == 'circle' || marker == 'circlePlus') {
    result = fill == '1' || marker == 'circle' ? 'geSprite geSprite-' + prefix + 'circle' : 'geSprite geSprite-' + prefix + 'circleplus';
  } else if (marker == 'ERone') {
    result = 'geSprite geSprite-' + prefix + 'erone';
  } else if (marker == 'ERmandOne') {
    result = 'geSprite geSprite-' + prefix + 'eronetoone';
  } else if (marker == 'ERmany') {
    result = 'geSprite geSprite-' + prefix + 'ermany';
  } else if (marker == 'ERoneToMany') {
    result = 'geSprite geSprite-' + prefix + 'eronetomany';
  } else if (marker == 'ERzeroToOne') {
    result = 'geSprite geSprite-' + prefix + 'eroneopt';
  } else if (marker == 'ERzeroToMany') {
    result = 'geSprite geSprite-' + prefix + 'ermanyopt';
  } else {
    result = 'geSprite geSprite-noarrow';
  }

  return result;
};

/**
 * Overridden in Menus.js
 */
EditorUi.prototype.createMenus = function () {
  return new Menus(this);
};

/**
 * Hook for allowing selection and context menu for certain events.
 */
EditorUi.prototype.updatePasteActionStates = function () {
  var graph = this.editor.graph;
  var paste = this.actions.get('paste');
  var pasteHere = this.actions.get('pasteHere');

  paste.setEnabled(this.editor.graph.cellEditor.isContentEditing() || !mxClipboard.isEmpty() && graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()));
  pasteHere.setEnabled(paste.isEnabled());
};

/**
 * Hook for allowing selection and context menu for certain events.
 */
EditorUi.prototype.initClipboard = function () {
  var ui = this;

  var mxClipboardCut = mxClipboard.cut;
  mxClipboard.cut = function (graph) {
    if (graph.cellEditor.isContentEditing()) {
      document.execCommand('cut', false, null);
    } else {
      mxClipboardCut.apply(this, arguments);
    }

    ui.updatePasteActionStates();
  };

  var mxClipboardCopy = mxClipboard.copy;
  mxClipboard.copy = function (graph) {
    if (graph.cellEditor.isContentEditing()) {
      document.execCommand('copy', false, null);
    } else {
      mxClipboardCopy.apply(this, arguments);
    }

    ui.updatePasteActionStates();
  };

  var mxClipboardPaste = mxClipboard.paste;
  mxClipboard.paste = function (graph) {
    var result = null;

    if (graph.cellEditor.isContentEditing()) {
      document.execCommand('paste', false, null);
    } else {
      result = mxClipboardPaste.apply(this, arguments);
    }

    ui.updatePasteActionStates();

    return result;
  };

  // Overrides cell editor to update paste action state
  var cellEditorStartEditing = this.editor.graph.cellEditor.startEditing;

  this.editor.graph.cellEditor.startEditing = function () {
    cellEditorStartEditing.apply(this, arguments);
    ui.updatePasteActionStates();
  };

  var cellEditorStopEditing = this.editor.graph.cellEditor.stopEditing;

  this.editor.graph.cellEditor.stopEditing = function (cell, trigger) {
    cellEditorStopEditing.apply(this, arguments);
    ui.updatePasteActionStates();
  };

  this.updatePasteActionStates();
};

/**
 * Initializes the infinite canvas.
 */
EditorUi.prototype.initCanvas = function () {
  var graph = this.editor.graph;

  // Initial page layout view, scrollBuffer and timer-based scrolling
  var graph = this.editor.graph;
  graph.timerAutoScroll = true;

  /**
  * Returns the padding for pages in page view with scrollbars.
  */
  graph.getPagePadding = function () {
    return new mxPoint(Math.max(0, Math.round((graph.container.offsetWidth - 34) / graph.view.scale)), Math.max(0, Math.round((graph.container.offsetHeight - 34) / graph.view.scale)));
  };

  // Fits the number of background pages to the graph
  graph.view.getBackgroundPageBounds = function () {
    var layout = this.graph.getPageLayout();
    var page = this.graph.getPageSize();

    return new mxRectangle(this.scale * (this.translate.x + layout.x * page.width), this.scale * (this.translate.y + layout.y * page.height), this.scale * layout.width * page.width, this.scale * layout.height * page.height);
  };

  graph.getPreferredPageSize = function (bounds, width, height) {
    var pages = this.getPageLayout();
    var size = this.getPageSize();

    return new mxRectangle(0, 0, pages.width * size.width, pages.height * size.height);
  };

  // Scales pages/graph to fit available size
  var resize = null;

  if (this.editor.chromeless) {
    resize = mxUtils.bind(this, function (autoscale) {
      if (graph.container != null) {
        var b = graph.pageVisible ? graph.view.getBackgroundPageBounds() : graph.getGraphBounds();
        var tr = graph.view.translate;
        var s = graph.view.scale;

        // Normalizes the bounds
        b = mxRectangle.fromRectangle(b);
        b.x = b.x / s - tr.x;
        b.y = b.y / s - tr.y;
        b.width /= s;
        b.height /= s;

        var st = graph.container.scrollTop;
        var sl = graph.container.scrollLeft;
        var sb = mxClient.IS_QUIRKS || document.documentMode >= 8 ? 20 : 14;

        if (document.documentMode == 8 || document.documentMode == 9) {
          sb += 3;
        }

        var cw = graph.container.offsetWidth - sb;
        var ch = graph.container.offsetHeight - sb;

        var ns = autoscale ? Math.max(0.3, Math.min(1, cw / b.width)) : s;
        var dx = Math.max((cw - ns * b.width) / 2, 0) / ns;
        var dy = Math.max((ch - ns * b.height) / 4, 0) / ns;

        graph.view.scaleAndTranslate(ns, dx - b.x, dy - b.y);

        graph.container.scrollTop = st * ns / s;
        graph.container.scrollLeft = sl * ns / s;
      }
    });

    // Hack to make function available to subclassers
    this.chromelessResize = resize;

    // Removable resize listener
    var autoscaleResize = mxUtils.bind(this, function () {
      resize(false);
    });

    mxEvent.addListener(window, 'resize', autoscaleResize);

    this.destroyFunctions.push(function () {
      mxEvent.removeListener(window, 'resize', autoscaleResize);
    });

    this.editor.addListener('resetGraphView', mxUtils.bind(this, function () {
      resize(true);
    }));

    this.actions.get('zoomIn').funct = function (evt) {
      graph.zoomIn();resize(false);
    };
    this.actions.get('zoomOut').funct = function (evt) {
      graph.zoomOut();resize(false);
    };

    // Creates toolbar for viewer - do not use CSS here
    // as this may be used in a viewer that has no CSS
    this.chromelessToolbar = document.createElement('div');
    this.chromelessToolbar.style.position = 'fixed';
    this.chromelessToolbar.style.overflow = 'hidden';
    this.chromelessToolbar.style.boxSizing = 'border-box';
    this.chromelessToolbar.style.whiteSpace = 'nowrap';
    this.chromelessToolbar.style.backgroundColor = '#000000';
    this.chromelessToolbar.style.padding = '10px 10px 8px 10px';
    this.chromelessToolbar.style.left = '50%';
    mxUtils.setPrefixedStyle(this.chromelessToolbar.style, 'borderRadius', '20px');
    mxUtils.setPrefixedStyle(this.chromelessToolbar.style, 'transition', 'opacity 600ms ease-in-out');

    var updateChromelessToolbarPosition = mxUtils.bind(this, function () {
      var css = mxUtils.getCurrentStyle(graph.container);
      this.chromelessToolbar.style.bottom = (css != null ? parseInt(css['margin-bottom'] || 0) : 0) + (this.tabContainer != null ? 20 + parseInt(this.tabContainer.style.height) : 20) + 'px';
    });

    this.editor.addListener('resetGraphView', updateChromelessToolbarPosition);
    updateChromelessToolbarPosition();

    var btnCount = 0;

    var addButton = mxUtils.bind(this, function (fn, imgSrc, tip) {
      btnCount++;

      var a = document.createElement('span');
      a.style.paddingLeft = '8px';
      a.style.paddingRight = '8px';
      a.style.cursor = 'pointer';
      mxEvent.addListener(a, 'click', fn);

      if (tip != null) {
        a.setAttribute('title', tip);
      }

      var img = document.createElement('img');
      img.setAttribute('border', '0');
      img.setAttribute('src', imgSrc);

      a.appendChild(img);
      this.chromelessToolbar.appendChild(a);

      return a;
    });

    var prevButton = addButton(mxUtils.bind(this, function (evt) {
      this.actions.get('previousPage').funct();
      mxEvent.consume(evt);
    }), Editor.previousLargeImage, mxResources.get('previousPage') || 'Previous Page');

    var pageInfo = document.createElement('div');
    pageInfo.style.display = 'inline-block';
    pageInfo.style.verticalAlign = 'top';
    pageInfo.style.fontFamily = 'Helvetica,Arial';
    pageInfo.style.marginTop = '8px';
    pageInfo.style.color = '#ffffff';
    this.chromelessToolbar.appendChild(pageInfo);

    var nextButton = addButton(mxUtils.bind(this, function (evt) {
      this.actions.get('nextPage').funct();
      mxEvent.consume(evt);
    }), Editor.nextLargeImage, mxResources.get('nextPage') || 'Next Page');

    var updatePageInfo = mxUtils.bind(this, function () {
      if (this.pages != null && this.pages.length > 1 && this.currentPage != null) {
        pageInfo.innerHTML = '';
        mxUtils.write(pageInfo, mxUtils.indexOf(this.pages, this.currentPage) + 1 + ' / ' + this.pages.length);
      }
    });

    prevButton.style.paddingLeft = '0px';
    prevButton.style.paddingRight = '4px';
    nextButton.style.paddingLeft = '4px';
    nextButton.style.paddingRight = '0px';

    var updatePageButtons = mxUtils.bind(this, function () {
      if (this.pages != null && this.pages.length > 1 && this.currentPage != null) {
        nextButton.style.display = '';
        prevButton.style.display = '';
        pageInfo.style.display = 'inline-block';
      } else {
        nextButton.style.display = 'none';
        prevButton.style.display = 'none';
        pageInfo.style.display = 'none';
      }

      updatePageInfo();
    });

    this.editor.addListener('resetGraphView', updatePageButtons);
    this.editor.addListener('pageSelected', updatePageInfo);

    addButton(mxUtils.bind(this, function (evt) {
      this.actions.get('zoomOut').funct();
      mxEvent.consume(evt);
    }), Editor.zoomOutLargeImage, (mxResources.get('zoomOut') || 'Zoom Out') + ' (Alt+Mousewheel)');

    addButton(mxUtils.bind(this, function (evt) {
      this.actions.get('zoomIn').funct();
      mxEvent.consume(evt);
    }), Editor.zoomInLargeImage, (mxResources.get('zoomIn') || 'Zoom In') + ' (Alt+Mousewheel)');

    addButton(mxUtils.bind(this, function (evt) {
      if (graph.lightbox) {
        if (graph.view.scale == 1) {
          this.lightboxFit();
        } else {
          graph.zoomTo(1);
        }

        resize(false);
      } else {
        resize(true);
      }

      mxEvent.consume(evt);
    }), Editor.actualSizeLargeImage, mxResources.get('fit') || 'Fit');

    // Changes toolbar opacity on hover
    var fadeThread = null;
    var fadeThread2 = null;

    var fadeOut = mxUtils.bind(this, function (delay) {
      if (fadeThread != null) {
        window.clearTimeout(fadeThread);
        fadeThead = null;
      }

      if (fadeThread2 != null) {
        window.clearTimeout(fadeThread2);
        fadeThead2 = null;
      }

      fadeThread = window.setTimeout(mxUtils.bind(this, function () {
        mxUtils.setOpacity(this.chromelessToolbar, 0);
        fadeThread = null;

        fadeThread2 = window.setTimeout(mxUtils.bind(this, function () {
          this.chromelessToolbar.style.display = 'none';
          fadeThread2 = null;
        }), 600);
      }), delay || 200);
    });

    var fadeIn = mxUtils.bind(this, function (opacity) {
      if (fadeThread != null) {
        window.clearTimeout(fadeThread);
        fadeThead = null;
      }

      if (fadeThread2 != null) {
        window.clearTimeout(fadeThread2);
        fadeThead2 = null;
      }

      this.chromelessToolbar.style.display = '';
      mxUtils.setOpacity(this.chromelessToolbar, opacity || 30);
    });

    if (urlParams.layers == '1') {
      this.layersDialog = null;

      var layersButton = addButton(mxUtils.bind(this, function (evt) {
        if (this.layersDialog != null) {
          this.layersDialog.parentNode.removeChild(this.layersDialog);
          this.layersDialog = null;
        } else {
          this.layersDialog = graph.createLayersDialog();

          mxEvent.addListener(this.layersDialog, 'mouseleave', mxUtils.bind(this, function () {
            this.layersDialog.parentNode.removeChild(this.layersDialog);
            this.layersDialog = null;
          }));

          var r = layersButton.getBoundingClientRect();

          mxUtils.setPrefixedStyle(this.layersDialog.style, 'borderRadius', '5px');
          this.layersDialog.style.position = 'fixed';
          this.layersDialog.style.fontFamily = 'Helvetica,Arial';
          this.layersDialog.style.backgroundColor = '#000000';
          this.layersDialog.style.width = '160px';
          this.layersDialog.style.padding = '4px 2px 4px 2px';
          this.layersDialog.style.color = '#ffffff';
          mxUtils.setOpacity(this.layersDialog, 70);
          this.layersDialog.style.left = r.left + 'px';
          this.layersDialog.style.bottom = parseInt(this.chromelessToolbar.style.bottom) + this.chromelessToolbar.offsetHeight + 4 + 'px';

          // Puts the dialog on top of the container z-index
          var style = mxUtils.getCurrentStyle(this.editor.graph.container);
          this.layersDialog.style.zIndex = style.zIndex;

          document.body.appendChild(this.layersDialog);
        }

        mxEvent.consume(evt);
      }), Editor.layersLargeImage, mxResources.get('layers') || 'Layers');

      // Shows/hides layers button depending on content
      var model = graph.getModel();

      model.addListener(mxEvent.CHANGE, function () {
        layersButton.style.display = model.getChildCount(model.root) > 1 ? '' : 'none';
      });
    }

    if (this.editor.editButtonLink != null) {
      addButton(mxUtils.bind(this, function (evt) {
        if (this.editor.editButtonLink == '_blank') {
          this.editor.editAsNew(this.getEditBlankXml(), null, true);
        } else {
          window.open(this.editor.editButtonLink, 'editWindow');
        }

        mxEvent.consume(evt);
      }), Editor.editLargeImage, mxResources.get('openInNewWindow') || 'Open in New Window');
    }

    if (graph.lightbox && this.container != document.body) {
      addButton(mxUtils.bind(this, function (evt) {
        if (urlParams.close == '1') {
          window.close();
        } else {
          this.destroy();
          mxEvent.consume(evt);
        }
      }), Editor.closeLargeImage, (mxResources.get('close') || 'Close') + ' (Escape)');
    }

    // Initial state invisible
    this.chromelessToolbar.style.display = 'none';
    graph.container.appendChild(this.chromelessToolbar);
    this.chromelessToolbar.style.marginLeft = -(btnCount * 24 + 10) + 'px';

    // Installs handling of hightligh and handling links to relative links and anchors
    this.addChromelessClickHandler();

    mxEvent.addListener(graph.container, mxClient.IS_POINTER ? 'pointermove' : 'mousemove', mxUtils.bind(this, function (evt) {
      if (!mxEvent.isTouchEvent(evt)) {
        if (!mxEvent.isShiftDown(evt)) {
          fadeIn(30);
        }

        fadeOut();
      }
    }));

    mxEvent.addListener(this.chromelessToolbar, mxClient.IS_POINTER ? 'pointermove' : 'mousemove', function (evt) {
      mxEvent.consume(evt);
    });

    mxEvent.addListener(this.chromelessToolbar, 'mouseenter', mxUtils.bind(this, function (evt) {
      if (!mxEvent.isShiftDown(evt)) {
        fadeIn(100);
      } else {
        fadeOut();
      }
    }));

    mxEvent.addListener(this.chromelessToolbar, 'mousemove', mxUtils.bind(this, function (evt) {
      if (!mxEvent.isShiftDown(evt)) {
        fadeIn(100);
      } else {
        fadeOut();
      }

      mxEvent.consume(evt);
    }));

    mxEvent.addListener(this.chromelessToolbar, 'mouseleave', mxUtils.bind(this, function (evt) {
      if (!mxEvent.isTouchEvent(evt)) {
        fadeIn(30);
      }
    }));

    // Shows/hides toolbar for touch devices
    var tol = graph.getTolerance();
    var ui = this;

    graph.addMouseListener({
      startX: 0,
      startY: 0,
      scrollLeft: 0,
      scrollTop: 0,
      mouseDown: function mouseDown(sender, me) {
        this.startX = me.getGraphX();
        this.startY = me.getGraphY();
        this.scrollLeft = graph.container.scrollLeft;
        this.scrollTop = graph.container.scrollTop;
      },
      mouseMove: function mouseMove(sender, me) {},
      mouseUp: function mouseUp(sender, me) {
        if (mxEvent.isTouchEvent(me.getEvent())) {
          if (Math.abs(this.scrollLeft - graph.container.scrollLeft) < tol && Math.abs(this.scrollTop - graph.container.scrollTop) < tol && Math.abs(this.startX - me.getGraphX()) < tol && Math.abs(this.startY - me.getGraphY()) < tol) {
            if (parseFloat(ui.chromelessToolbar.style.opacity || 0) > 0) {
              fadeOut();
            } else {
              fadeIn(30);
            }
          }
        }
      }
    });
  } else if (this.editor.extendCanvas) {
    /**
    * Guesses autoTranslate to avoid another repaint (see below).
    * Works if only the scale of the graph changes or if pages
    * are visible and the visible pages do not change.
    */
    var graphViewValidate = graph.view.validate;
    graph.view.validate = function () {
      if (this.graph.container != null && mxUtils.hasScrollbars(this.graph.container)) {
        var pad = this.graph.getPagePadding();
        var size = this.graph.getPageSize();

        // Updating scrollbars here causes flickering in quirks and is not needed
        // if zoom method is always used to set the current scale on the graph.
        var tx = this.translate.x;
        var ty = this.translate.y;
        this.translate.x = pad.x - (this.x0 || 0) * size.width;
        this.translate.y = pad.y - (this.y0 || 0) * size.height;
      }

      graphViewValidate.apply(this, arguments);
    };

    var graphSizeDidChange = graph.sizeDidChange;
    graph.sizeDidChange = function () {
      if (this.container != null && mxUtils.hasScrollbars(this.container)) {
        var pages = this.getPageLayout();
        var pad = this.getPagePadding();
        var size = this.getPageSize();

        // Updates the minimum graph size
        var minw = Math.ceil(2 * pad.x + pages.width * size.width);
        var minh = Math.ceil(2 * pad.y + pages.height * size.height);

        var min = graph.minimumGraphSize;

        // LATER: Fix flicker of scrollbar size in IE quirks mode
        // after delayed call in window.resize event handler
        if (min == null || min.width != minw || min.height != minh) {
          graph.minimumGraphSize = new mxRectangle(0, 0, minw, minh);
        }

        // Updates auto-translate to include padding and graph size
        var dx = pad.x - pages.x * size.width;
        var dy = pad.y - pages.y * size.height;

        if (!this.autoTranslate && (this.view.translate.x != dx || this.view.translate.y != dy)) {
          this.autoTranslate = true;
          this.view.x0 = pages.x;
          this.view.y0 = pages.y;

          // NOTE: THIS INVOKES THIS METHOD AGAIN. UNFORTUNATELY THERE IS NO WAY AROUND THIS SINCE THE
          // BOUNDS ARE KNOWN AFTER THE VALIDATION AND SETTING THE TRANSLATE TRIGGERS A REVALIDATION.
          // SHOULD MOVE TRANSLATE/SCALE TO VIEW.
          var tx = graph.view.translate.x;
          var ty = graph.view.translate.y;
          graph.view.setTranslate(dx, dy);

          // LATER: Fix rounding errors for small zoom
          graph.container.scrollLeft += Math.round((dx - tx) * graph.view.scale);
          graph.container.scrollTop += Math.round((dy - ty) * graph.view.scale);

          this.autoTranslate = false;

          return;
        }

        // TODO: todo-1 posible interaccion para emitir cambios en el mapa.
        graphSizeDidChange.apply(this, arguments);
      }
    };
  }

  // Accumulates the zoom factor while the rendering is taking place
  // so that not the complete sequence of zoom steps must be painted
  graph.updateZoomTimeout = null;
  graph.cumulativeZoomFactor = 1;

  var cursorPosition = null;

  graph.lazyZoom = function (zoomIn) {
    if (this.updateZoomTimeout != null) {
      window.clearTimeout(this.updateZoomTimeout);
    }

    // Switches to 1% zoom steps below 15%
    // Lower bound depdends on rounding below
    if (zoomIn) {
      if (this.view.scale * this.cumulativeZoomFactor < 0.15) {
        this.cumulativeZoomFactor = (this.view.scale + 0.01) / this.view.scale;
      } else {
        // Uses to 5% zoom steps for better grid rendering in webkit
        // and to avoid rounding errors for zoom steps
        this.cumulativeZoomFactor *= this.zoomFactor;
        this.cumulativeZoomFactor = Math.round(this.view.scale * this.cumulativeZoomFactor * 20) / 20 / this.view.scale;
      }
    } else if (this.view.scale * this.cumulativeZoomFactor <= 0.15) {
      this.cumulativeZoomFactor = (this.view.scale - 0.01) / this.view.scale;
    } else {
      // Uses to 5% zoom steps for better grid rendering in webkit
      // and to avoid rounding errors for zoom steps
      this.cumulativeZoomFactor /= this.zoomFactor;
      this.cumulativeZoomFactor = Math.round(this.view.scale * this.cumulativeZoomFactor * 20) / 20 / this.view.scale;
    }

    this.cumulativeZoomFactor = Math.max(0.01, Math.min(this.view.scale * this.cumulativeZoomFactor, 160) / this.view.scale);

    this.updateZoomTimeout = window.setTimeout(mxUtils.bind(this, function () {
      this.zoom(this.cumulativeZoomFactor);

      if (resize != null) {
        resize(false);
      }

      // Zooms to mouse position if scrollbars enabled
      if (cursorPosition != null && mxUtils.hasScrollbars(graph.container)) {
        var offset = mxUtils.getOffset(graph.container);
        var dx = graph.container.offsetWidth / 2 - cursorPosition.x + offset.x;
        var dy = graph.container.offsetHeight / 2 - cursorPosition.y + offset.y;

        graph.container.scrollLeft -= dx * (this.cumulativeZoomFactor - 1);
        graph.container.scrollTop -= dy * (this.cumulativeZoomFactor - 1);
      }

      this.cumulativeZoomFactor = 1;
      this.updateZoomTimeout = null;
    }), 20);
  };

  mxEvent.addMouseWheelListener(mxUtils.bind(this, function (evt, up) {
    // Ctrl+wheel (or pinch on touchpad) is a native browser zoom event is OS X
    // LATER: Add support for zoom via pinch on trackpad for Chrome in OS X
    if ((mxEvent.isAltDown(evt) || mxEvent.isControlDown(evt) && !mxClient.IS_MAC || graph.panningHandler.isActive()) && (this.dialogs == null || this.dialogs.length == 0)) {
      var source = mxEvent.getSource(evt);

      while (source != null) {
        if (source == graph.container) {
          cursorPosition = new mxPoint(mxEvent.getClientX(evt), mxEvent.getClientY(evt));
          graph.lazyZoom(up);
          mxEvent.consume(evt);

          return;
        }

        source = source.parentNode;
      }
    }
  }));
};

/**
 * Creates a temporary graph instance for rendering off-screen content.
 */
EditorUi.prototype.createTemporaryGraph = function (stylesheet) {
  var graph = new Graph(document.createElement('div'), null, null, stylesheet);
  graph.resetViewOnRootChange = false;
  graph.setConnectable(false);
  graph.gridEnabled = false;
  graph.autoScroll = false;
  graph.setTooltips(false);
  graph.setEnabled(false);

  // Container must be in the DOM for correct HTML rendering
  graph.container.style.visibility = 'hidden';
  graph.container.style.position = 'absolute';
  graph.container.style.overflow = 'hidden';
  graph.container.style.height = '1px';
  graph.container.style.width = '1px';

  return graph;
};

/**
 *
 */
EditorUi.prototype.addChromelessClickHandler = function () {
  var hl = urlParams.highlight;

  // Adds leading # for highlight color code
  if (hl != null && hl.length > 0) {
    hl = '#' + hl;
  }

  this.editor.graph.addClickHandler(hl);
};

/**
 *
 */
EditorUi.prototype.toggleFormatPanel = function (forceHide) {
  this.formatWidth = forceHide || this.formatWidth > 0 ? 0 : 240;
  this.formatContainer.style.display = forceHide || this.formatWidth > 0 ? '' : 'none';
  this.refresh();
  this.format.refresh();
  this.fireEvent(new mxEventObject('formatWidthChanged'));
};

/**
 * Adds support for placeholders in labels.
 */
EditorUi.prototype.lightboxFit = function () {
  // LATER: Use initial graph bounds to avoid rounding errors
  this.editor.graph.maxFitScale = 2;
  this.editor.graph.fit(60);
  this.editor.graph.maxFitScale = null;
};

/**
 * Hook for allowing selection and context menu for certain events.
 */
EditorUi.prototype.isSelectionAllowed = function (evt) {
  return mxEvent.getSource(evt).nodeName == 'SELECT' || mxEvent.getSource(evt).nodeName == 'INPUT' && mxUtils.isAncestorNode(this.formatContainer, mxEvent.getSource(evt));
};

/**
 * Installs dialog if browser window is closed without saving
 * This must be disabled during save and image export.
 */
EditorUi.prototype.addBeforeUnloadListener = function () {
  // Installs dialog if browser window is closed without saving
  // This must be disabled during save and image export
  window.onbeforeunload = mxUtils.bind(this, function () {
    if (!this.editor.chromeless) {
      return this.onBeforeUnload();
    }
  });
};

/**
 * Sets the onbeforeunload for the application
 */
EditorUi.prototype.onBeforeUnload = function () {
  if (this.editor.modified) {
    return mxResources.get('allChangesLost');
  }
};

/**
 * Opens the current diagram via the window.opener if one exists.
 */
EditorUi.prototype.open = function () {
  // Cross-domain window access is not allowed in FF, so if we
  // were opened from another domain then this will fail.
  try {
    if (window.opener != null && window.opener.openFile != null) {
      window.opener.openFile.setConsumer(mxUtils.bind(this, function (xml, filename) {
        try {
          var doc = mxUtils.parseXml(xml);
          this.editor.setGraphXml(doc.documentElement);
          this.editor.setModified(false);
          this.editor.undoManager.clear();

          if (filename != null) {
            this.editor.setFilename(filename);
            this.updateDocumentTitle();
          }

          return;
        } catch (e) {
          mxUtils.alert(mxResources.get('invalidOrMissingFile') + ': ' + e.message);
        }
      }));
    }
  } catch (e) {}
  // ignore


  // Fires as the last step if no file was loaded
  this.editor.graph.view.validate();

  // Required only in special cases where an initial file is opened
  // and the minimumGraphSize changes and CSS must be updated.
  this.editor.graph.sizeDidChange();
  this.editor.fireEvent(new mxEventObject('resetGraphView'));
};

/**
 * Sets the current menu and element.
 */
EditorUi.prototype.setCurrentMenu = function (menu, elt) {
  this.currentMenuElt = elt;
  this.currentMenu = menu;
};

/**
 * Resets the current menu and element.
 */
EditorUi.prototype.resetCurrentMenu = function () {
  this.currentMenuElt = null;
  this.currentMenu = null;
};

/**
 * Hides and destroys the current menu.
 */
EditorUi.prototype.hideCurrentMenu = function (menu, elt) {
  if (this.currentMenu != null) {
    this.currentMenu.hideMenu();
    this.resetCurrentMenu();
  }
};

/**
 * Updates the document title.
 */
EditorUi.prototype.updateDocumentTitle = function () {
  var title = this.editor.getOrCreateFilename();

  if (this.editor.appName != null) {
    title += ' - ' + this.editor.appName;
  }

  document.title = title;
};

/**
 * Updates the document title.
 */
EditorUi.prototype.createHoverIcons = function () {
  return new HoverIcons(this.editor.graph);
};

/**
 * Returns the URL for a copy of this editor with no state.
 */
EditorUi.prototype.redo = function () {
  try {
    var graph = this.editor.graph;

    if (graph.isEditing()) {
      document.execCommand('redo', false, null);
    } else {
      this.editor.undoManager.redo();
    }
  } catch (e) {
    // ignore all errors
  }
};

/**
 * Returns the URL for a copy of this editor with no state.
 */
EditorUi.prototype.undo = function () {
  try {
    var graph = this.editor.graph;

    if (graph.isEditing()) {
      // Stops editing and executes undo on graph if native undo
      // does not affect current editing value
      var value = graph.cellEditor.textarea.innerHTML;
      document.execCommand('undo', false, null);

      if (value == graph.cellEditor.textarea.innerHTML) {
        graph.stopEditing(true);
        this.editor.undoManager.undo();
      }
    } else {
      this.editor.undoManager.undo();
    }
  } catch (e) {
    // ignore all errors
  }
};

/**
 * Returns the URL for a copy of this editor with no state.
 */
EditorUi.prototype.canRedo = function () {
  return this.editor.graph.isEditing() || this.editor.undoManager.canRedo();
};

/**
 * Returns the URL for a copy of this editor with no state.
 */
EditorUi.prototype.canUndo = function () {
  return this.editor.graph.isEditing() || this.editor.undoManager.canUndo();
};

/**
 *
 */
EditorUi.prototype.getEditBlankXml = function () {
  return mxUtils.getXml(this.getGraphXml());
};

/**
 * Returns the URL for a copy of this editor with no state.
 */
EditorUi.prototype.getUrl = function (pathname) {
  var href = pathname != null ? pathname : window.location.pathname;
  var parms = href.indexOf('?') > 0 ? 1 : 0;

  // Removes template URL parameter for new blank diagram
  for (var key in urlParams) {
    if (parms == 0) {
      href += '?';
    } else {
      href += '&';
    }

    href += key + '=' + urlParams[key];
    parms++;
  }

  return href;
};

/**
 * Specifies if the graph has scrollbars.
 */
EditorUi.prototype.setScrollbars = function (value) {
  var graph = this.editor.graph;
  var prev = graph.container.style.overflow;
  graph.scrollbars = value;
  this.editor.updateGraphComponents();

  if (prev != graph.container.style.overflow) {
    if (graph.container.style.overflow == 'hidden') {
      var t = graph.view.translate;
      graph.view.setTranslate(t.x - graph.container.scrollLeft / graph.view.scale, t.y - graph.container.scrollTop / graph.view.scale);
      graph.container.scrollLeft = 0;
      graph.container.scrollTop = 0;
      graph.minimumGraphSize = null;
      graph.sizeDidChange();
    } else {
      var dx = graph.view.translate.x;
      var dy = graph.view.translate.y;

      graph.view.translate.x = 0;
      graph.view.translate.y = 0;
      graph.sizeDidChange();
      graph.container.scrollLeft -= Math.round(dx * graph.view.scale);
      graph.container.scrollTop -= Math.round(dy * graph.view.scale);
    }
  }

  this.fireEvent(new mxEventObject('scrollbarsChanged'));
};

/**
 * Returns true if the graph has scrollbars.
 */
EditorUi.prototype.hasScrollbars = function () {
  return this.editor.graph.scrollbars;
};

/**
 * Resets the state of the scrollbars.
 */
EditorUi.prototype.resetScrollbars = function () {
  var graph = this.editor.graph;

  if (!this.editor.extendCanvas) {
    graph.container.scrollTop = 0;
    graph.container.scrollLeft = 0;

    if (!mxUtils.hasScrollbars(graph.container)) {
      graph.view.setTranslate(0, 0);
    }
  } else if (!this.editor.chromeless) {
    if (mxUtils.hasScrollbars(graph.container)) {
      if (graph.pageVisible) {
        var pad = graph.getPagePadding();
        graph.container.scrollTop = Math.floor(pad.y - this.editor.initialTopSpacing);
        graph.container.scrollLeft = Math.floor(Math.min(pad.x, (graph.container.scrollWidth - graph.container.clientWidth) / 2));

        // Scrolls graph to visible area
        var bounds = graph.getGraphBounds();

        if (bounds.width > 0 && bounds.height > 0) {
          if (bounds.x > graph.container.scrollLeft + graph.container.clientWidth * 0.9) {
            graph.container.scrollLeft = Math.min(bounds.x + bounds.width - graph.container.clientWidth, bounds.x - 10);
          }

          if (bounds.y > graph.container.scrollTop + graph.container.clientHeight * 0.9) {
            graph.container.scrollTop = Math.min(bounds.y + bounds.height - graph.container.clientHeight, bounds.y - 10);
          }
        }
      } else {
        var bounds = graph.getGraphBounds();
        var width = Math.max(bounds.width, graph.scrollTileSize.width * graph.view.scale);
        var height = Math.max(bounds.height, graph.scrollTileSize.height * graph.view.scale);
        graph.container.scrollTop = Math.floor(Math.max(0, bounds.y - Math.max(20, (graph.container.clientHeight - height) / 4)));
        graph.container.scrollLeft = Math.floor(Math.max(0, bounds.x - Math.max(0, (graph.container.clientWidth - width) / 2)));
      }
    } else {
      // This code is not actively used since the default for scrollbars is always true
      if (graph.pageVisible) {
        var b = graph.view.getBackgroundPageBounds();
        graph.view.setTranslate(Math.floor(Math.max(0, (graph.container.clientWidth - b.width) / 2) - b.x), Math.floor(Math.max(0, (graph.container.clientHeight - b.height) / 2) - b.y));
      } else {
        var bounds = graph.getGraphBounds();
        graph.view.setTranslate(Math.floor(Math.max(0, Math.max(0, (graph.container.clientWidth - bounds.width) / 2) - bounds.x)), Math.floor(Math.max(0, Math.max(20, (graph.container.clientHeight - bounds.height) / 4)) - bounds.y));
      }
    }
  }
};

/**
 * Loads the stylesheet for this graph.
 */
EditorUi.prototype.setPageVisible = function (value) {
  var graph = this.editor.graph;
  var hasScrollbars = mxUtils.hasScrollbars(graph.container);
  var tx = 0;
  var ty = 0;

  if (hasScrollbars) {
    tx = graph.view.translate.x * graph.view.scale - graph.container.scrollLeft;
    ty = graph.view.translate.y * graph.view.scale - graph.container.scrollTop;
  }

  graph.pageVisible = value;
  graph.pageBreaksVisible = value;
  graph.preferPageSize = value;
  graph.view.validateBackground();

  // Workaround for possible handle offset
  if (hasScrollbars) {
    var cells = graph.getSelectionCells();
    graph.clearSelection();
    graph.setSelectionCells(cells);
  }

  // Calls updatePageBreaks
  graph.sizeDidChange();

  if (hasScrollbars) {
    graph.container.scrollLeft = graph.view.translate.x * graph.view.scale - tx;
    graph.container.scrollTop = graph.view.translate.y * graph.view.scale - ty;
  }

  this.fireEvent(new mxEventObject('pageViewChanged'));
};

/**
 * Loads the stylesheet for this graph.
 */
EditorUi.prototype.setBackgroundColor = function (value) {
  this.editor.graph.background = value;
  this.editor.graph.view.validateBackground();

  this.fireEvent(new mxEventObject('backgroundColorChanged'));
};

/**
 * Loads the stylesheet for this graph.
 */
EditorUi.prototype.setFoldingEnabled = function (value) {
  this.editor.graph.foldingEnabled = value;
  this.editor.graph.view.revalidate();

  this.fireEvent(new mxEventObject('foldingEnabledChanged'));
};

/**
 * Loads the stylesheet for this graph.
 */
EditorUi.prototype.setPageFormat = function (value) {
  this.editor.graph.pageFormat = value;

  if (!this.editor.graph.pageVisible) {
    this.actions.get('pageView').funct();
  } else {
    this.editor.graph.view.validateBackground();
    this.editor.graph.sizeDidChange();
  }

  this.fireEvent(new mxEventObject('pageFormatChanged'));
};

/**
 * Loads the stylesheet for this graph.
 */
EditorUi.prototype.setPageScale = function (value) {
  this.editor.graph.pageScale = value;

  if (!this.editor.graph.pageVisible) {
    this.actions.get('pageView').funct();
  } else {
    this.editor.graph.view.validateBackground();
    this.editor.graph.sizeDidChange();
  }

  this.fireEvent(new mxEventObject('pageScaleChanged'));
};

/**
 * Loads the stylesheet for this graph.
 */
EditorUi.prototype.setGridColor = function (value) {
  this.editor.graph.view.gridColor = value;
  this.editor.graph.view.validateBackground();
  this.fireEvent(new mxEventObject('gridColorChanged'));
};

/**
 * Updates the states of the given undo/redo items.
 */
EditorUi.prototype.addUndoListener = function () {
  var undo = this.actions.get('undo');
  var redo = this.actions.get('redo');

  var undoMgr = this.editor.undoManager;

  var undoListener = mxUtils.bind(this, function () {
    undo.setEnabled(this.canUndo());
    redo.setEnabled(this.canRedo());
  });

  undoMgr.addListener(mxEvent.ADD, undoListener);
  undoMgr.addListener(mxEvent.UNDO, undoListener);
  undoMgr.addListener(mxEvent.REDO, undoListener);
  undoMgr.addListener(mxEvent.CLEAR, undoListener);

  // Overrides cell editor to update action states
  var cellEditorStartEditing = this.editor.graph.cellEditor.startEditing;

  this.editor.graph.cellEditor.startEditing = function () {
    cellEditorStartEditing.apply(this, arguments);
    undoListener();
  };

  var cellEditorStopEditing = this.editor.graph.cellEditor.stopEditing;

  this.editor.graph.cellEditor.stopEditing = function (cell, trigger) {
    cellEditorStopEditing.apply(this, arguments);
    undoListener();
  };

  // Updates the button states once
  undoListener();
};

/**
* Updates the states of the given toolbar items based on the selection.
*/
EditorUi.prototype.updateActionStates = function () {
  var graph = this.editor.graph;
  var selected = !graph.isSelectionEmpty();
  var vertexSelected = false;
  var edgeSelected = false;

  var cells = graph.getSelectionCells();

  if (cells != null) {
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];

      if (graph.getModel().isEdge(cell)) {
        edgeSelected = true;
      }

      if (graph.getModel().isVertex(cell)) {
        vertexSelected = true;
      }

      if (edgeSelected && vertexSelected) {
        break;
      }
    }
  }

  // Updates action states
  var actions = ['cut', 'copy', 'bold', 'italic', 'underline', 'delete', 'duplicate', 'editStyle', 'editTooltip', 'editLink', 'backgroundColor', 'borderColor', 'edit', 'toFront', 'toBack', 'lockUnlock', 'solid', 'dashed', 'dotted', 'fillColor', 'gradientColor', 'shadow', 'fontColor', 'formattedText', 'rounded', 'toggleRounded', 'sharp', 'strokeColor'];

  for (var i = 0; i < actions.length; i++) {
    this.actions.get(actions[i]).setEnabled(selected);
  }

  this.actions.get('setAsDefaultStyle').setEnabled(graph.getSelectionCount() == 1);
  this.actions.get('turn').setEnabled(!graph.isSelectionEmpty());
  this.actions.get('curved').setEnabled(edgeSelected);
  this.actions.get('clearWaypoints').setEnabled(edgeSelected);
  this.actions.get('rotation').setEnabled(vertexSelected);
  this.actions.get('wordWrap').setEnabled(vertexSelected);
  this.actions.get('autosize').setEnabled(vertexSelected);
  this.actions.get('collapsible').setEnabled(vertexSelected);
  var oneVertexSelected = vertexSelected && graph.getSelectionCount() == 1;
  this.actions.get('group').setEnabled(graph.getSelectionCount() > 1 || oneVertexSelected && !graph.isContainer(graph.getSelectionCell()));
  this.actions.get('ungroup').setEnabled(graph.getSelectionCount() == 1 && (graph.getModel().getChildCount(graph.getSelectionCell()) > 0 || oneVertexSelected && graph.isContainer(graph.getSelectionCell())));
  this.actions.get('removeFromGroup').setEnabled(oneVertexSelected && graph.getModel().isVertex(graph.getModel().getParent(graph.getSelectionCell())));

  // Updates menu states
  var state = graph.view.getState(graph.getSelectionCell());
  this.menus.get('navigation').setEnabled(selected || graph.view.currentRoot != null);
  this.actions.get('collapsible').setEnabled(vertexSelected && graph.getSelectionCount() == 1 && (graph.isContainer(graph.getSelectionCell()) || graph.model.getChildCount(graph.getSelectionCell()) > 0));
  this.actions.get('home').setEnabled(graph.view.currentRoot != null);
  this.actions.get('exitGroup').setEnabled(graph.view.currentRoot != null);
  this.actions.get('enterGroup').setEnabled(graph.getSelectionCount() == 1 && graph.isValidRoot(graph.getSelectionCell()));
  var foldable = graph.getSelectionCount() == 1 && graph.isCellFoldable(graph.getSelectionCell());
  this.actions.get('expand').setEnabled(foldable);
  this.actions.get('collapse').setEnabled(foldable);
  this.actions.get('editLink').setEnabled(graph.getSelectionCount() == 1);
  this.actions.get('openLink').setEnabled(graph.getSelectionCount() == 1 && graph.getLinkForCell(graph.getSelectionCell()) != null);
  this.actions.get('guides').setEnabled(graph.isEnabled());
  this.actions.get('grid').setEnabled(!this.editor.chromeless);

  var unlocked = graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent());
  this.menus.get('layout').setEnabled(unlocked);
  this.menus.get('insert').setEnabled(unlocked);
  this.menus.get('direction').setEnabled(unlocked && vertexSelected);
  this.menus.get('align').setEnabled(unlocked && vertexSelected && graph.getSelectionCount() > 1);
  this.menus.get('distribute').setEnabled(unlocked && vertexSelected && graph.getSelectionCount() > 1);
  this.actions.get('selectVertices').setEnabled(unlocked);
  this.actions.get('selectEdges').setEnabled(unlocked);
  this.actions.get('selectAll').setEnabled(unlocked);
  this.actions.get('selectNone').setEnabled(unlocked);

  this.updatePasteActionStates();
};

/**
 * Refreshes the viewport.
 */
EditorUi.prototype.refresh = function (sizeDidChange) {
  sizeDidChange = sizeDidChange != null ? sizeDidChange : true;

  var quirks = mxClient.IS_IE && (document.documentMode == null || document.documentMode == 5);
  var w = this.container.clientWidth;
  var h = this.container.clientHeight;

  if (this.container == document.body) {
    w = document.body.clientWidth || document.documentElement.clientWidth;
    h = quirks ? document.body.clientHeight || document.documentElement.clientHeight : document.documentElement.clientHeight;
  }

  // Workaround for bug on iOS see
  // http://stackoverflow.com/questions/19012135/ios-7-ipad-safari-landscape-innerheight-outerheight-layout-issue
  // FIXME: Fix if footer visible
  var off = 0;

  if (mxClient.IS_IOS && !window.navigator.standalone) {
    if (window.innerHeight != document.documentElement.clientHeight) {
      off = document.documentElement.clientHeight - window.innerHeight;
      window.scrollTo(0, 0);
    }
  }

  var effHsplitPosition = Math.max(0, Math.min(this.hsplitPosition, w - this.splitSize - 20));

  var tmp = 0;

  if (this.menubar != null) {
    this.menubarContainer.style.height = this.menubarHeight + 'px';
    tmp += this.menubarHeight;
  }

  if (this.toolbar != null) {
    this.toolbarContainer.style.top = this.menubarHeight + 'px';
    this.toolbarContainer.style.height = this.toolbarHeight + 'px';
    tmp += this.toolbarHeight;
  }

  if (tmp > 0 && !mxClient.IS_QUIRKS) {
    tmp += 1;
  }

  var sidebarFooterHeight = 0;

  if (this.sidebarFooterContainer != null) {
    var bottom = this.footerHeight + off;
    sidebarFooterHeight = Math.max(0, Math.min(h - tmp - bottom, this.sidebarFooterHeight));
    this.sidebarFooterContainer.style.width = effHsplitPosition + 'px';
    this.sidebarFooterContainer.style.height = sidebarFooterHeight + 'px';
    this.sidebarFooterContainer.style.bottom = bottom + 'px';
  }

  var fw = this.format != null ? this.formatWidth : 0;
  this.sidebarContainer.style.top = tmp + 'px';
  this.sidebarContainer.style.width = effHsplitPosition + 'px';
  this.formatContainer.style.top = tmp + 'px';
  this.formatContainer.style.width = fw + 'px';
  this.formatContainer.style.display = this.format != null ? '' : 'none';

  this.diagramContainer.style.left = this.hsplit.parentNode != null ? effHsplitPosition + this.splitSize + 'px' : '0px';
  this.diagramContainer.style.top = this.sidebarContainer.style.top;
  this.footerContainer.style.height = this.footerHeight + 'px';
  this.hsplit.style.top = this.sidebarContainer.style.top;
  this.hsplit.style.bottom = this.footerHeight + off + 'px';
  this.hsplit.style.left = effHsplitPosition + 'px';

  if (this.tabContainer != null) {
    this.tabContainer.style.left = this.diagramContainer.style.left;
  }

  if (quirks) {
    this.menubarContainer.style.width = w + 'px';
    this.toolbarContainer.style.width = this.menubarContainer.style.width;
    var sidebarHeight = Math.max(0, h - this.footerHeight - this.menubarHeight - this.toolbarHeight);
    this.sidebarContainer.style.height = sidebarHeight - sidebarFooterHeight + 'px';
    this.formatContainer.style.height = sidebarHeight + 'px';
    this.diagramContainer.style.width = this.hsplit.parentNode != null ? Math.max(0, w - effHsplitPosition - this.splitSize - fw) + 'px' : w + 'px';
    this.footerContainer.style.width = this.menubarContainer.style.width;
    var diagramHeight = Math.max(0, h - this.footerHeight - this.menubarHeight - this.toolbarHeight);

    if (this.tabContainer != null) {
      this.tabContainer.style.width = this.diagramContainer.style.width;
      this.tabContainer.style.bottom = this.footerHeight + off + 'px';
      diagramHeight -= this.tabContainer.clientHeight;
    }

    this.diagramContainer.style.height = diagramHeight + 'px';
    this.hsplit.style.height = diagramHeight + 'px';
  } else {
    if (this.footerHeight > 0) {
      this.footerContainer.style.bottom = off + 'px';
    }

    this.diagramContainer.style.right = fw + 'px';
    var th = 0;

    if (this.tabContainer != null) {
      this.tabContainer.style.bottom = this.footerHeight + off + 'px';
      this.tabContainer.style.right = this.diagramContainer.style.right;
      th = this.tabContainer.clientHeight;
    }

    this.sidebarContainer.style.bottom = this.footerHeight + sidebarFooterHeight + off + 'px';
    this.formatContainer.style.bottom = this.footerHeight + off + 'px';
    this.diagramContainer.style.bottom = this.footerHeight + off + th + 'px';
  }

  if (sizeDidChange) {
    this.editor.graph.sizeDidChange();
  }
};

/**
 * Creates the required containers.
 */
EditorUi.prototype.createTabContainer = function () {
  return null;
};

/**
 * Creates the required containers.
 */
EditorUi.prototype.createDivs = function () {
  //
  this.menubarContainer = this.createDiv('geMenubarContainer');
  this.toolbarContainer = this.createDiv('geToolbarContainer');
  this.sidebarContainer = this.createDiv('geSidebarContainer');
  this.formatContainer = this.createDiv('geSidebarContainer');
  this.diagramContainer = this.createDiv('geDiagramContainer');
  this.footerContainer = this.createDiv('geFooterContainer');
  EditorUi.prototype.menubarContainer = this.menubarContainer;
  EditorUi.prototype.footerContainer = this.footerContainer;
  EditorUi.prototype.sidebarContainer = this.sidebarContainer;
  this.hsplit = this.createDiv('geHsplit');
  this.hsplit.setAttribute('title', mxResources.get('collapseExpand'));

  // Sets static style for containers
  this.menubarContainer.style.top = '0px';
  this.menubarContainer.style.left = '0px';
  this.menubarContainer.style.right = '0px';
  this.toolbarContainer.style.left = '0px';
  this.toolbarContainer.style.right = '0px';
  this.sidebarContainer.style.left = '0px';
  this.formatContainer.style.right = '0px';
  this.formatContainer.style.zIndex = '1';
  this.diagramContainer.style.right = (this.format != null ? this.formatWidth : 0) + 'px';
  this.footerContainer.style.left = '0px';
  this.footerContainer.style.right = '0px';
  this.footerContainer.style.bottom = '0px';
  this.footerContainer.style.zIndex = mxPopupMenu.prototype.zIndex - 2;
  this.hsplit.style.width = this.splitSize + 'px';

  // Only vertical scrollbars, no background in format sidebar
  this.formatContainer.style.backgroundColor = '#f7a103';
  this.formatContainer.style.overflowX = 'hidden';
  this.formatContainer.style.overflowY = 'auto';
  this.formatContainer.style.fontSize = '12px';

  this.sidebarFooterContainer = this.createSidebarFooterContainer();

  if (this.sidebarFooterContainer) {
    this.sidebarFooterContainer.style.left = '0px';
  }

  if (!this.editor.chromeless) {
    this.tabContainer = this.createTabContainer();
  }
};

/**
 * Hook for sidebar footer container. This implementation returns null.
 */
EditorUi.prototype.createSidebarFooterContainer = function () {
  return null;
};

/**
 * Creates the required containers.
 */
EditorUi.prototype.createUi = function () {
  // Creates menubar
  //
  this.menubar = this.editor.chromeless ? null : this.menus.createMenubar(this.createDiv('geMenubar'));

  if (this.menubar != null) {
    this.menubarContainer.appendChild(this.menubar.container);
  }

  // Adds status bar in menubar
  if (this.menubar != null) {
    this.statusContainer = this.createStatusContainer();

    // Connects the status bar to the editor status
    this.editor.addListener('statusChanged', mxUtils.bind(this, function () {
      this.setStatusText(this.editor.getStatus());
    }));

    this.setStatusText(this.editor.getStatus());
    this.menubar.container.appendChild(this.statusContainer);

    // Inserts into DOM
    this.container.appendChild(this.menubarContainer);
  }

  // Creates the sidebar
  this.sidebar = this.editor.chromeless ? null : this.createSidebar(this.sidebarContainer);

  if (this.sidebar != null) {
    this.container.appendChild(this.sidebarContainer);
  }

  // Creates the format sidebar
  //
  this.format = this.editor.chromeless || !this.formatEnabled ? null : this.createFormat(this.formatContainer);

  if (this.format != null) {
    this.container.appendChild(this.formatContainer);
  }

  // Creates the footer
  var footer = this.editor.chromeless ? null : this.createFooter();

  if (footer != null) {
    this.footerContainer.appendChild(footer);
    this.container.appendChild(this.footerContainer);
  }

  if (this.sidebar != null && this.sidebarFooterContainer) {
    this.container.appendChild(this.sidebarFooterContainer);
  }

  this.container.appendChild(this.diagramContainer);

  if (this.container != null && this.tabContainer != null) {
    this.container.appendChild(this.tabContainer);
  }

  // Creates toolbar
  //
  this.toolbar = this.editor.chromeless ? null : this.createToolbar(this.createDiv('geToolbar'));

  if (this.toolbar != null) {
    this.toolbarContainer.appendChild(this.toolbar.container);
    this.container.appendChild(this.toolbarContainer);
  }

  // HSplit
  if (this.sidebar != null) {
    this.container.appendChild(this.hsplit);

    this.addSplitHandler(this.hsplit, true, 0, mxUtils.bind(this, function (value) {
      this.hsplitPosition = value;
      this.refresh();
    }));
  }
};

/**
 * Creates a new toolbar for the given container.
 */
EditorUi.prototype.createStatusContainer = function () {
  var container = document.createElement('a');
  container.className = 'geItem geStatus';

  return container;
};

/**
 * Creates a new toolbar for the given container.
 */
EditorUi.prototype.setStatusText = function (value) {
  this.statusContainer.innerHTML = value;
};

/**
 * Creates a new toolbar for the given container.
 */
EditorUi.prototype.createToolbar = function (container) {
  return new Toolbar(this, container);
};

/**
 * Creates a new sidebar for the given container.
 */
EditorUi.prototype.createSidebar = function (container) {
  return new Sidebar(this, container);
};

/**
 * Creates a new sidebar for the given container.
 */
EditorUi.prototype.createFormat = function (container) {
  return new Format(this, container);
};

/**
 * Creates and returns a new footer.
 */
EditorUi.prototype.createFooter = function () {
  return this.createDiv('geFooter');
};

/**
 * Creates the actual toolbar for the toolbar container.
 */
EditorUi.prototype.createDiv = function (classname) {
  var elt = document.createElement('div');
  elt.className = classname;

  return elt;
};

/**
 * Updates the states of the given undo/redo items.
 */
EditorUi.prototype.addSplitHandler = function (elt, horizontal, dx, onChange) {
  var start = null;
  var initial = null;
  var ignoreClick = true;
  var last = null;

  // Disables built-in pan and zoom in IE10 and later
  if (mxClient.IS_POINTER) {
    elt.style.touchAction = 'none';
  }

  var getValue = mxUtils.bind(this, function () {
    var result = parseInt(horizontal ? elt.style.left : elt.style.bottom);

    // Takes into account hidden footer
    if (!horizontal) {
      result = result + dx - this.footerHeight;
    }

    return result;
  });

  function moveHandler(evt) {
    if (start != null) {
      var pt = new mxPoint(mxEvent.getClientX(evt), mxEvent.getClientY(evt));
      onChange(Math.max(0, initial + (horizontal ? pt.x - start.x : start.y - pt.y) - dx));
      mxEvent.consume(evt);

      if (initial != getValue()) {
        ignoreClick = true;
        last = null;
      }
    }
  }

  function dropHandler(evt) {
    moveHandler(evt);
    initial = null;
    start = null;
  }

  mxEvent.addGestureListeners(elt, function (evt) {
    start = new mxPoint(mxEvent.getClientX(evt), mxEvent.getClientY(evt));
    initial = getValue();
    ignoreClick = false;
    mxEvent.consume(evt);
  });

  mxEvent.addListener(elt, 'click', function (evt) {
    if (!ignoreClick) {
      var next = last != null ? last - dx : 0;
      last = getValue();
      onChange(next);
      mxEvent.consume(evt);
    }
  });

  mxEvent.addGestureListeners(document, null, moveHandler, dropHandler);

  this.destroyFunctions.push(function () {
    mxEvent.removeGestureListeners(document, null, moveHandler, dropHandler);
  });
};

/**
 * Displays a print dialog.
 */
EditorUi.prototype.showDialog = function (elt, w, h, modal, closable, onClose) {
  this.editor.graph.tooltipHandler.hideTooltip();

  if (this.dialogs == null) {
    this.dialogs = [];
  }

  this.dialog = new Dialog(this, elt, w, h, modal, closable, onClose);
  this.dialogs.push(this.dialog);
};

/**
 * Displays a print dialog.
 */
EditorUi.prototype.hideDialog = function (cancel) {
  if (this.dialogs != null && this.dialogs.length > 0) {
    var dlg = this.dialogs.pop();
    dlg.close(cancel);

    this.dialog = this.dialogs.length > 0 ? this.dialogs[this.dialogs.length - 1] : null;

    if (this.dialog == null && this.editor.graph.container.style.visibility != 'hidden') {
      this.editor.graph.container.focus();
    }

    this.editor.fireEvent(new mxEventObject('hideDialog'));
  }
};

/**
 * Display a color dialog.
 */
EditorUi.prototype.pickColor = function (color, apply) {
  var graph = this.editor.graph;
  var selState = graph.cellEditor.saveSelection();

  var dlg = new ColorDialog(this, color || 'none', function (color) {
    graph.cellEditor.restoreSelection(selState);
    apply(color);
  }, function () {
    graph.cellEditor.restoreSelection(selState);
  });
  this.showDialog(dlg.container, 220, 430, true, false);
  dlg.init();
};

/**
 * Adds the label menu items to the given menu and parent.
 */
EditorUi.prototype.openFile = function () {
  // Closes dialog after open
  window.openFile = new OpenFile(mxUtils.bind(this, function (cancel) {
    this.hideDialog(cancel);
  }));

  // Removes openFile if dialog is closed
  this.showDialog(new OpenDialog(this).container, Editor.useLocalStorage ? 640 : 320, Editor.useLocalStorage ? 480 : 220, true, true, function () {
    window.openFile = null;
  });
};

/**
 * Extracs the graph model from the given HTML data from a data transfer event.
 */
EditorUi.prototype.extractGraphModelFromHtml = function (data) {
  var result = null;

  try {
    var idx = data.indexOf('&lt;mxGraphModel ');

    if (idx >= 0) {
      var idx2 = data.lastIndexOf('&lt;/mxGraphModel&gt;');

      if (idx2 > idx) {
        result = data.substring(idx, idx2 + 21).replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/\\&quot;/g, '"').replace(/\n/g, '');
      }
    }
  } catch (e) {
    // ignore
  }

  return result;
};

/**
 * Opens the given files in the editor.
 */
EditorUi.prototype.extractGraphModelFromEvent = function (evt) {
  var result = null;
  var data = null;

  if (evt != null) {
    var provider = evt.dataTransfer != null ? evt.dataTransfer : evt.clipboardData;

    if (provider != null) {
      if (document.documentMode == 10 || document.documentMode == 11) {
        data = provider.getData('Text');
      } else {
        data = mxUtils.indexOf(provider.types, 'text/html') >= 0 ? provider.getData('text/html') : null;

        if (mxUtils.indexOf(provider.types, 'text/plain' && (data == null || data.length == 0))) {
          data = provider.getData('text/plain');
        }
      }

      if (data != null) {
        data = this.editor.graph.zapGremlins(mxUtils.trim(data));

        // Tries parsing as HTML document with embedded XML
        var xml = this.extractGraphModelFromHtml(data);

        if (xml != null) {
          data = xml;
        }
      }
    }
  }

  if (data != null && this.isCompatibleString(data)) {
    result = data;
  }

  return result;
};

/**
 * Hook for subclassers to return true if event data is a supported format.
 * This implementation always returns false.
 */
EditorUi.prototype.isCompatibleString = function (data) {
  return false;
};

/**
 * Executes the given layout.
 */
EditorUi.prototype.executeLayout = function (exec, animate, post) {
  var graph = this.editor.graph;

  if (graph.isEnabled()) {
    graph.getModel().beginUpdate();
    try {
      exec();
    } catch (e) {
      throw e;
    } finally {
      // Animates the changes in the graph model except
      // for Camino, where animation is too slow
      if (this.allowAnimation && animate && navigator.userAgent.indexOf('Camino') < 0) {
        // New API for animating graph layout results asynchronously
        var morph = new mxMorphing(graph);
        morph.addListener(mxEvent.DONE, mxUtils.bind(this, function () {
          graph.getModel().endUpdate();

          if (post != null) {
            post();
          }
        }));

        morph.startAnimation();
      } else {
        graph.getModel().endUpdate();

        if (post != null) {
          post();
        }
      }
    }
  }
};

/**
 * Hides the current menu.
 */
EditorUi.prototype.showImageDialog = function (title, value, fn, ignoreExisting) {
  var cellEditor = this.editor.graph.cellEditor;
  var selState = cellEditor.saveSelection();
  var newValue = mxUtils.prompt(title, value);
  cellEditor.restoreSelection(selState);

  if (newValue != null && newValue.length > 0) {
    var img = new Image();

    img.onload = function () {
      fn(newValue, img.width, img.height);
    };
    img.onerror = function () {
      fn(null);
      mxUtils.alert(mxResources.get('fileNotFound'));
    };

    img.src = newValue;
  } else {
    fn(null);
  }
};

/**
 * Hides the current menu.
 */
EditorUi.prototype.showLinkDialog = function (value, btnLabel, fn) {
  var dlg = new LinkDialog(this, value, btnLabel, fn);
  this.showDialog(dlg.container, 420, 90, true, true);
  dlg.init();
};

/**
 * Hides the current menu.
 */
EditorUi.prototype.showBackgroundImageDialog = function (apply) {
  apply = apply != null ? apply : mxUtils.bind(this, function (image) {
    this.setBackgroundImage(image);
  });
  var newValue = mxUtils.prompt(mxResources.get('backgroundImage'), '');

  if (newValue != null && newValue.length > 0) {
    var img = new Image();

    img.onload = function () {
      apply(new mxImage(newValue, img.width, img.height));
    };
    img.onerror = function () {
      apply(null);
      mxUtils.alert(mxResources.get('fileNotFound'));
    };

    img.src = newValue;
  } else {
    apply(null);
  }
};

/**
 * Loads the stylesheet for this graph.
 */
EditorUi.prototype.setBackgroundImage = function (image) {
  this.editor.graph.setBackgroundImage(image);
  this.editor.graph.view.validateBackgroundImage();

  this.fireEvent(new mxEventObject('backgroundImageChanged'));
};

/**
 * Creates the keyboard event handler for the current graph and history.
 */
EditorUi.prototype.confirm = function (msg, okFn, cancelFn) {
  if (mxUtils.confirm(msg)) {
    if (okFn != null) {
      okFn();
    }
  } else if (cancelFn != null) {
    cancelFn();
  }
};

/**
 * Creates the keyboard event handler for the current graph and history.
 */
EditorUi.prototype.createOutline = function (wnd) {
  var outline = new mxOutline(this.editor.graph);
  outline.border = 20;

  mxEvent.addListener(window, 'resize', function () {
    outline.update();
  });

  this.addListener('pageFormatChanged', function () {
    outline.update();
  });

  return outline;
};

/**
 * Creates the keyboard event handler for the current graph and history.
 */
EditorUi.prototype.createKeyHandler = function (editor) {
  var editorUi = this;
  var graph = this.editor.graph;
  var keyHandler = new mxKeyHandler(graph);

  var isEventIgnored = keyHandler.isEventIgnored;
  keyHandler.isEventIgnored = function (evt) {
    // Handles undo/redo/ctrl+./,/u via action and allows ctrl+b/i only if editing value is HTML (except for FF and Safari)
    return (!this.isControlDown(evt) || mxEvent.isShiftDown(evt) || evt.keyCode != 90 && evt.keyCode != 89 && evt.keyCode != 188 && evt.keyCode != 190 && evt.keyCode != 85) && (evt.keyCode != 66 && evt.keyCode != 73 || !this.isControlDown(evt) || this.graph.cellEditor.isContentEditing() && !mxClient.IS_FF && !mxClient.IS_SF) && isEventIgnored.apply(this, arguments);
  };

  // Ignores graph enabled state but not chromeless state
  keyHandler.isEnabledForEvent = function (evt) {
    return !mxEvent.isConsumed(evt) && this.isGraphEvent(evt) && this.isEnabled();
  };

  // Routes command-key to control-key on Mac
  keyHandler.isControlDown = function (evt) {
    return mxEvent.isControlDown(evt) || mxClient.IS_MAC && evt.metaKey;
  };

  var queue = [];
  var thread = null;

  // Helper function to move cells with the cursor keys
  function nudge(keyCode, stepSize, resize) {
    queue.push(function () {
      if (!graph.isSelectionEmpty() && graph.isEnabled()) {
        stepSize = stepSize != null ? stepSize : 1;

        if (resize) {
          // Resizes all selected vertices
          graph.getModel().beginUpdate();
          try {
            var cells = graph.getSelectionCells();

            for (var i = 0; i < cells.length; i++) {
              if (graph.getModel().isVertex(cells[i]) && graph.isCellResizable(cells[i])) {
                var geo = graph.getCellGeometry(cells[i]);

                if (geo != null) {
                  geo = geo.clone();

                  if (keyCode == 37) {
                    geo.width = Math.max(0, geo.width - stepSize);
                  } else if (keyCode == 38) {
                    geo.height = Math.max(0, geo.height - stepSize);
                  } else if (keyCode == 39) {
                    geo.width += stepSize;
                  } else if (keyCode == 40) {
                    geo.height += stepSize;
                  }

                  graph.getModel().setGeometry(cells[i], geo);
                }
              }
            }
          } finally {
            graph.getModel().endUpdate();
          }
        } else {
          // Moves vertices up/down in a stack layout
          var cell = graph.getSelectionCell();
          var parent = graph.model.getParent(cell);
          var layout = null;

          if (graph.getSelectionCount() == 1 && graph.model.isVertex(cell) && graph.layoutManager != null && !graph.isCellLocked(cell)) {
            layout = graph.layoutManager.getLayout(parent);
          }

          if (layout != null && layout.constructor == mxStackLayout) {
            var index = parent.getIndex(cell);

            if (keyCode == 37 || keyCode == 38) {
              graph.model.add(parent, cell, Math.max(0, index - 1));
            } else if (keyCode == 39 || keyCode == 40) {
              graph.model.add(parent, cell, Math.min(graph.model.getChildCount(parent), index + 1));
            }
          } else {
            var dx = 0;
            var dy = 0;

            if (keyCode == 37) {
              dx = -stepSize;
            } else if (keyCode == 38) {
              dy = -stepSize;
            } else if (keyCode == 39) {
              dx = stepSize;
            } else if (keyCode == 40) {
              dy = stepSize;
            }

            graph.moveCells(graph.getMovableCells(graph.getSelectionCells()), dx, dy);
          }
        }
      }
    });

    if (thread != null) {
      window.clearTimeout(thread);
    }

    thread = window.setTimeout(function () {
      if (queue.length > 0) {
        graph.getModel().beginUpdate();
        try {
          for (var i = 0; i < queue.length; i++) {
            queue[i]();
          }

          queue = [];
        } finally {
          graph.getModel().endUpdate();
        }
        graph.scrollCellToVisible(graph.getSelectionCell());
      }
    }, 200);
  }

  // Overridden to handle special alt+shift+cursor keyboard shortcuts
  var directions = {
    37: mxConstants.DIRECTION_WEST,
    38: mxConstants.DIRECTION_NORTH,
    39: mxConstants.DIRECTION_EAST,
    40: mxConstants.DIRECTION_SOUTH
  };

  var keyHandlerGetFunction = keyHandler.getFunction;

  mxKeyHandler.prototype.getFunction = function (evt) {
    if (graph.isEnabled()) {
      if (evt.keyCode == 9 && mxEvent.isAltDown(evt)) {
        if (mxEvent.isShiftDown(evt)) {
          // Alt+Shift+Tab
          return function () {
            graph.selectParentCell();
          };
        }

        // Alt+Tab
        return function () {
          graph.selectChildCell();
        };
      } else if (directions[evt.keyCode] != null && !graph.isSelectionEmpty()) {
        if (mxEvent.isShiftDown(evt) && mxEvent.isAltDown(evt)) {
          if (graph.model.isVertex(graph.getSelectionCell())) {
            return function () {
              var cells = graph.connectVertex(graph.getSelectionCell(), directions[evt.keyCode], graph.defaultEdgeLength, evt, true);

              if (cells != null && cells.length > 0) {
                if (cells.length == 1 && graph.model.isEdge(cells[0])) {
                  graph.setSelectionCell(graph.model.getTerminal(cells[0], false));
                } else {
                  graph.setSelectionCell(cells[cells.length - 1]);
                }

                if (editorUi.hoverIcons != null) {
                  editorUi.hoverIcons.update(graph.view.getState(graph.getSelectionCell()));
                }
              }
            };
          }
        } else {
          // Avoids consuming event if no vertex is selected by returning null below
          // Cursor keys move and resize (ctrl) cells
          if (this.isControlDown(evt)) {
            return function () {
              nudge(evt.keyCode, mxEvent.isShiftDown(evt) ? graph.gridSize : null, true);
            };
          }

          return function () {
            nudge(evt.keyCode, mxEvent.isShiftDown(evt) ? graph.gridSize : null);
          };
        }
      }
    }

    return keyHandlerGetFunction.apply(this, arguments);
  };

  // Binds keystrokes to actions
  keyHandler.bindAction = mxUtils.bind(this, function (code, control, key, shift) {
    var action = this.actions.get(key);

    if (action != null) {
      var f = function f() {
        if (action.isEnabled()) {
          action.funct();
        }
      };

      if (control) {
        if (shift) {
          keyHandler.bindControlShiftKey(code, f);
        } else {
          keyHandler.bindControlKey(code, f);
        }
      } else if (shift) {
        keyHandler.bindShiftKey(code, f);
      } else {
        keyHandler.bindKey(code, f);
      }
    }
  });

  var ui = this;
  var keyHandlerEscape = keyHandler.escape;
  keyHandler.escape = function (evt) {
    keyHandlerEscape.apply(this, arguments);
  };

  // Ignores enter keystroke. Remove this line if you want the
  // enter keystroke to stop editing. N, W, T are reserved.
  keyHandler.enter = function () {};

  keyHandler.bindControlShiftKey(36, function () {
    graph.exitGroup();
  }); // Ctrl+Shift+Home
  keyHandler.bindControlShiftKey(35, function () {
    graph.enterGroup();
  }); // Ctrl+Shift+End
  keyHandler.bindKey(36, function () {
    graph.home();
  }); // Home
  keyHandler.bindKey(35, function () {
    graph.refresh();
  }); // End
  keyHandler.bindAction(107, true, 'zoomIn'); // Ctrl+Plus
  keyHandler.bindAction(109, true, 'zoomOut'); // Ctrl+Minus
  keyHandler.bindAction(80, true, 'print'); // Ctrl+P
  keyHandler.bindAction(79, true, 'outline', true); // Ctrl+Shift+O
  keyHandler.bindAction(112, false, 'about'); // F1

  if (!this.editor.chromeless) {
    keyHandler.bindControlKey(36, function () {
      if (graph.isEnabled()) {
        graph.foldCells(true);
      }
    }); // Ctrl+Home
    keyHandler.bindControlKey(35, function () {
      if (graph.isEnabled()) {
        graph.foldCells(false);
      }
    }); // Ctrl+End
    keyHandler.bindControlKey(13, function () {
      if (graph.isEnabled()) {
        graph.setSelectionCells(graph.duplicateCells(graph.getSelectionCells(), false));
      }
    }); // Ctrl+Enter
    keyHandler.bindAction(8, false, 'delete'); // Backspace
    keyHandler.bindAction(8, true, 'deleteAll'); // Backspace
    keyHandler.bindAction(46, false, 'delete'); // Delete
    keyHandler.bindAction(46, true, 'deleteAll'); // Ctrl+Delete
    keyHandler.bindAction(72, true, 'resetView'); // Ctrl+H
    keyHandler.bindAction(72, true, 'fitWindow', true); // Ctrl+Shift+H
    keyHandler.bindAction(74, true, 'fitPage'); // Ctrl+J
    keyHandler.bindAction(74, true, 'fitTwoPages', true); // Ctrl+Shift+J
    keyHandler.bindAction(48, true, 'customZoom'); // Ctrl+0
    keyHandler.bindAction(82, true, 'turn'); // Ctrl+R
    keyHandler.bindAction(82, true, 'clearDefaultStyle', true); // Ctrl+Shift+R
    keyHandler.bindAction(83, true, 'save'); // Ctrl+S
    keyHandler.bindAction(83, true, 'saveAs', true); // Ctrl+Shift+S
    keyHandler.bindAction(65, true, 'selectAll'); // Ctrl+A
    keyHandler.bindAction(65, true, 'selectNone', true); // Ctrl+A
    keyHandler.bindAction(73, true, 'selectVertices', true); // Ctrl+Shift+I
    keyHandler.bindAction(69, true, 'selectEdges', true); // Ctrl+Shift+E
    keyHandler.bindAction(69, true, 'editStyle'); // Ctrl+E
    keyHandler.bindAction(66, true, 'bold'); // Ctrl+B
    keyHandler.bindAction(66, true, 'toBack', true); // Ctrl+Shift+B
    keyHandler.bindAction(70, true, 'toFront', true); // Ctrl+Shift+F
    keyHandler.bindAction(68, true, 'duplicate'); // Ctrl+D
    keyHandler.bindAction(68, true, 'setAsDefaultStyle', true); // Ctrl+Shift+D
    keyHandler.bindAction(90, true, 'undo'); // Ctrl+Z
    keyHandler.bindAction(89, true, 'autosize', true); // Ctrl+Shift+Y
    keyHandler.bindAction(88, true, 'cut'); // Ctrl+X
    keyHandler.bindAction(67, true, 'copy'); // Ctrl+C
    keyHandler.bindAction(81, true, 'connectionArrows'); // Ctrl+Q
    keyHandler.bindAction(81, true, 'connectionPoints', true); // Ctrl+Shift+Q
    keyHandler.bindAction(86, true, 'paste'); // Ctrl+V
    keyHandler.bindAction(71, true, 'group'); // Ctrl+G
    keyHandler.bindAction(77, true, 'editData'); // Ctrl+M
    keyHandler.bindAction(71, true, 'grid', true); // Ctrl+Shift+G
    keyHandler.bindAction(73, true, 'italic'); // Ctrl+I
    keyHandler.bindAction(76, true, 'lockUnlock'); // Ctrl+L
    keyHandler.bindAction(76, true, 'layers', true); // Ctrl+Shift+L
    keyHandler.bindAction(80, true, 'formatPanel', true); // Ctrl+Shift+P
    keyHandler.bindAction(85, true, 'underline'); // Ctrl+U
    keyHandler.bindAction(85, true, 'ungroup', true); // Ctrl+Shift+U
    keyHandler.bindAction(190, true, 'superscript'); // Ctrl+.
    keyHandler.bindAction(188, true, 'subscript'); // Ctrl+,
    keyHandler.bindKey(13, function () {
      if (graph.isEnabled()) {
        graph.startEditingAtCell();
      }
    }); // Enter
    keyHandler.bindKey(113, function () {
      if (graph.isEnabled()) {
        graph.startEditingAtCell();
      }
    }); // F2
  }

  if (!mxClient.IS_WIN) {
    keyHandler.bindAction(90, true, 'redo', true); // Ctrl+Shift+Z
  } else {
    keyHandler.bindAction(89, true, 'redo'); // Ctrl+Y
  }

  return keyHandler;
};

/**
 * Creates the keyboard event handler for the current graph and history.
 */
EditorUi.prototype.destroy = function () {
  if (this.editor != null) {
    this.editor.destroy();
    this.editor = null;
  }

  if (this.menubar != null) {
    this.menubar.destroy();
    this.menubar = null;
  }

  if (this.toolbar != null) {
    this.toolbar.destroy();
    this.toolbar = null;
  }

  if (this.sidebar != null) {
    this.sidebar.destroy();
    this.sidebar = null;
  }

  if (this.keyHandler != null) {
    this.keyHandler.destroy();
    this.keyHandler = null;
  }

  if (this.keydownHandler != null) {
    mxEvent.removeListener(document, 'keydown', this.keydownHandler);
    this.keydownHandler = null;
  }

  if (this.keyupHandler != null) {
    mxEvent.removeListener(document, 'keyup', this.keyupHandler);
    this.keyupHandler = null;
  }

  if (this.resizeHandler != null) {
    mxEvent.removeListener(window, 'resize', this.resizeHandler);
    this.resizeHandler = null;
  }

  if (this.gestureHandler != null) {
    mxEvent.removeGestureListeners(document, this.gestureHandler);
    this.gestureHandler = null;
  }

  if (this.orientationChangeHandler != null) {
    mxEvent.removeListener(window, 'orientationchange', this.orientationChangeHandler);
    this.orientationChangeHandler = null;
  }

  if (this.scrollHandler != null) {
    mxEvent.removeListener(window, 'scroll', this.scrollHandler);
    this.scrollHandler = null;
  }

  if (this.destroyFunctions != null) {
    for (var i = 0; i < this.destroyFunctions.length; i++) {
      this.destroyFunctions[i]();
    }

    this.destroyFunctions = null;
  }

  var c = [this.menubarContainer, this.toolbarContainer, this.sidebarContainer, this.formatContainer, this.diagramContainer, this.footerContainer, this.chromelessToolbar, this.hsplit, this.sidebarFooterContainer, this.layersDialog];

  for (var i = 0; i < c.length; i++) {
    if (c[i] != null && c[i].parentNode != null) {
      c[i].parentNode.removeChild(c[i]);
    }
  }
};

module.exports = EditorUi;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2006-2012, JGraph Ltd
 */
/**
 * Constructs a new graph editor
 */
var Menus = function Menus(editorUi) {
  this.editorUi = editorUi;
  this.menus = {};
  this.init();

  // Pre-fetches checkmark image
  if (!mxClient.IS_SVG) {
    new Image().src = this.checkmarkImage;
  }
};

/**
 * Sets the default font family.
 */
Menus.prototype.defaultFont = 'Helvetica';

/**
 * Sets the default font size.
 */
Menus.prototype.defaultFontSize = '12';

/**
 * Sets the default font size.
 */
Menus.prototype.defaultMenuItems = ['file', 'edit', 'view', 'arrange', 'help']; //['file', 'edit', 'view', 'arrange', 'extras', 'help'];

/**
 * Adds the label menu items to the given menu and parent.
 */
Menus.prototype.defaultFonts = ['Helvetica', 'Verdana', 'Times New Roman', 'Garamond', 'Comic Sans MS', 'Courier New', 'Georgia', 'Lucida Console', 'Tahoma'];

/**
 * Adds the label menu items to the given menu and parent.
 */
Menus.prototype.init = function () {
  var graph = this.editorUi.editor.graph;
  var isGraphEnabled = mxUtils.bind(graph, graph.isEnabled);

  this.customFonts = [];
  this.customFontSizes = [];

  this.put('fontFamily', new Menu(mxUtils.bind(this, function (menu, parent) {
    var addItem = mxUtils.bind(this, function (fontname) {
      var tr = this.styleChange(menu, fontname, [mxConstants.STYLE_FONTFAMILY], [fontname], null, parent, function () {
        document.execCommand('fontname', false, fontname);
      });
      tr.firstChild.nextSibling.style.fontFamily = fontname;
    });

    for (var i = 0; i < this.defaultFonts.length; i++) {
      addItem(this.defaultFonts[i]);
    }

    menu.addSeparator(parent);

    if (this.customFonts.length > 0) {
      for (var i = 0; i < this.customFonts.length; i++) {
        addItem(this.customFonts[i]);
      }

      menu.addSeparator(parent);

      menu.addItem(mxResources.get('reset'), null, mxUtils.bind(this, function () {
        this.customFonts = [];
      }), parent);

      menu.addSeparator(parent);
    }

    this.promptChange(menu, mxResources.get('custom') + '...', '', mxConstants.DEFAULT_FONTFAMILY, mxConstants.STYLE_FONTFAMILY, parent, true, mxUtils.bind(this, function (newValue) {
      this.customFonts.push(newValue);
    }));
  })));
  this.put('formatBlock', new Menu(mxUtils.bind(this, function (menu, parent) {
    function addItem(label, tag) {
      return menu.addItem(label, null, mxUtils.bind(this, function () {
        // TODO: Check if visible
        graph.cellEditor.textarea.focus();
        document.execCommand('formatBlock', false, '<' + tag + '>');
      }), parent);
    }

    addItem(mxResources.get('normal'), 'p');

    addItem('', 'h1').firstChild.nextSibling.innerHTML = '<h1 style="margin:0px;">' + mxResources.get('heading') + ' 1</h1>';
    addItem('', 'h2').firstChild.nextSibling.innerHTML = '<h2 style="margin:0px;">' + mxResources.get('heading') + ' 2</h2>';
    addItem('', 'h3').firstChild.nextSibling.innerHTML = '<h3 style="margin:0px;">' + mxResources.get('heading') + ' 3</h3>';
    addItem('', 'h4').firstChild.nextSibling.innerHTML = '<h4 style="margin:0px;">' + mxResources.get('heading') + ' 4</h4>';
    addItem('', 'h5').firstChild.nextSibling.innerHTML = '<h5 style="margin:0px;">' + mxResources.get('heading') + ' 5</h5>';
    addItem('', 'h6').firstChild.nextSibling.innerHTML = '<h6 style="margin:0px;">' + mxResources.get('heading') + ' 6</h6>';

    addItem('', 'pre').firstChild.nextSibling.innerHTML = '<pre style="margin:0px;">' + mxResources.get('formatted') + '</pre>';
    addItem('', 'blockquote').firstChild.nextSibling.innerHTML = '<blockquote style="margin-top:0px;margin-bottom:0px;">' + mxResources.get('blockquote') + '</blockquote>';
  })));
  this.put('fontSize', new Menu(mxUtils.bind(this, function (menu, parent) {
    var sizes = [6, 8, 9, 10, 11, 12, 14, 18, 24, 36, 48, 72];

    var addItem = mxUtils.bind(this, function (fontsize) {
      this.styleChange(menu, fontsize, [mxConstants.STYLE_FONTSIZE], [fontsize], null, parent, function () {
        // Creates an element with arbitrary size 3
        document.execCommand('fontSize', false, '3');

        // Changes the css font size of the first font element inside the in-place editor with size 3
        // hopefully the above element that we've just created. LATER: Check for new element using
        // previous result of getElementsByTagName (see other actions)
        var elts = graph.cellEditor.textarea.getElementsByTagName('font');

        for (var i = 0; i < elts.length; i++) {
          if (elts[i].getAttribute('size') == '3') {
            elts[i].removeAttribute('size');
            elts[i].style.fontSize = fontsize + 'px';

            break;
          }
        }
      });
    });

    for (var i = 0; i < sizes.length; i++) {
      addItem(sizes[i]);
    }

    menu.addSeparator(parent);

    if (this.customFontSizes.length > 0) {
      for (var i = 0; i < this.customFontSizes.length; i++) {
        addItem(this.customFontSizes[i]);
      }

      menu.addSeparator(parent);

      menu.addItem(mxResources.get('reset'), null, mxUtils.bind(this, function () {
        this.customFontSizes = [];
      }), parent);

      menu.addSeparator(parent);
    }

    this.promptChange(menu, mxResources.get('custom') + '...', '(pt)', '12', mxConstants.STYLE_FONTSIZE, parent, true, mxUtils.bind(this, function (newValue) {
      this.customFontSizes.push(newValue);
    }));
  })));
  this.put('direction', new Menu(mxUtils.bind(this, function (menu, parent) {
    menu.addItem(mxResources.get('flipH'), null, function () {
      graph.toggleCellStyles(mxConstants.STYLE_FLIPH, false);
    }, parent);
    menu.addItem(mxResources.get('flipV'), null, function () {
      graph.toggleCellStyles(mxConstants.STYLE_FLIPV, false);
    }, parent);
    this.addMenuItems(menu, ['-', 'rotation'], parent);
  })));
  this.put('align', new Menu(mxUtils.bind(this, function (menu, parent) {
    menu.addItem(mxResources.get('leftAlign'), null, function () {
      graph.alignCells(mxConstants.ALIGN_LEFT);
    }, parent);
    menu.addItem(mxResources.get('center'), null, function () {
      graph.alignCells(mxConstants.ALIGN_CENTER);
    }, parent);
    menu.addItem(mxResources.get('rightAlign'), null, function () {
      graph.alignCells(mxConstants.ALIGN_RIGHT);
    }, parent);
    menu.addSeparator(parent);
    menu.addItem(mxResources.get('topAlign'), null, function () {
      graph.alignCells(mxConstants.ALIGN_TOP);
    }, parent);
    menu.addItem(mxResources.get('middle'), null, function () {
      graph.alignCells(mxConstants.ALIGN_MIDDLE);
    }, parent);
    menu.addItem(mxResources.get('bottomAlign'), null, function () {
      graph.alignCells(mxConstants.ALIGN_BOTTOM);
    }, parent);
  })));
  this.put('distribute', new Menu(mxUtils.bind(this, function (menu, parent) {
    menu.addItem(mxResources.get('horizontal'), null, function () {
      graph.distributeCells(true);
    }, parent);
    menu.addItem(mxResources.get('vertical'), null, function () {
      graph.distributeCells(false);
    }, parent);
  })));
  this.put('layout', new Menu(mxUtils.bind(this, function (menu, parent) {
    var promptSpacing = mxUtils.bind(this, function (defaultValue, fn) {
      var dlg = new FilenameDialog(this.editorUi, defaultValue, mxResources.get('apply'), function (newValue) {
        fn(parseFloat(newValue));
      }, mxResources.get('spacing'));
      this.editorUi.showDialog(dlg.container, 300, 80, true, true);
      dlg.init();
    });

    menu.addItem(mxResources.get('horizontalFlow'), null, mxUtils.bind(this, function () {
      var layout = new mxHierarchicalLayout(graph, mxConstants.DIRECTION_WEST);

      this.editorUi.executeLayout(function () {
        var selectionCells = graph.getSelectionCells();
        layout.execute(graph.getDefaultParent(), selectionCells.length == 0 ? null : selectionCells);
      }, true);
    }), parent);
    menu.addItem(mxResources.get('verticalFlow'), null, mxUtils.bind(this, function () {
      var layout = new mxHierarchicalLayout(graph, mxConstants.DIRECTION_NORTH);

      this.editorUi.executeLayout(function () {
        var selectionCells = graph.getSelectionCells();
        layout.execute(graph.getDefaultParent(), selectionCells.length == 0 ? null : selectionCells);
      }, true);
    }), parent);
    menu.addSeparator(parent);
    menu.addItem(mxResources.get('horizontalTree'), null, mxUtils.bind(this, function () {
      var tmp = graph.getSelectionCell();
      var roots = null;

      if (tmp == null || graph.getModel().getChildCount(tmp) == 0) {
        if (graph.getModel().getEdgeCount(tmp) == 0) {
          roots = graph.findTreeRoots(graph.getDefaultParent());
        }
      } else {
        roots = graph.findTreeRoots(tmp);
      }

      if (roots != null && roots.length > 0) {
        tmp = roots[0];
      }

      if (tmp != null) {
        var layout = new mxCompactTreeLayout(graph, true);
        layout.edgeRouting = false;
        layout.levelDistance = 30;

        promptSpacing(layout.levelDistance, mxUtils.bind(this, function (newValue) {
          layout.levelDistance = newValue;

          this.editorUi.executeLayout(function () {
            layout.execute(graph.getDefaultParent(), tmp);
          }, true);
        }));
      }
    }), parent);
    menu.addItem(mxResources.get('verticalTree'), null, mxUtils.bind(this, function () {
      var tmp = graph.getSelectionCell();
      var roots = null;

      if (tmp == null || graph.getModel().getChildCount(tmp) == 0) {
        if (graph.getModel().getEdgeCount(tmp) == 0) {
          roots = graph.findTreeRoots(graph.getDefaultParent());
        }
      } else {
        roots = graph.findTreeRoots(tmp);
      }

      if (roots != null && roots.length > 0) {
        tmp = roots[0];
      }

      if (tmp != null) {
        var layout = new mxCompactTreeLayout(graph, false);
        layout.edgeRouting = false;
        layout.levelDistance = 30;

        promptSpacing(layout.levelDistance, mxUtils.bind(this, function (newValue) {
          layout.levelDistance = newValue;

          this.editorUi.executeLayout(function () {
            layout.execute(graph.getDefaultParent(), tmp);
          }, true);
        }));
      }
    }), parent);
    menu.addItem(mxResources.get('radialTree'), null, mxUtils.bind(this, function () {
      var tmp = graph.getSelectionCell();
      var roots = null;

      if (tmp == null || graph.getModel().getChildCount(tmp) == 0) {
        if (graph.getModel().getEdgeCount(tmp) == 0) {
          roots = graph.findTreeRoots(graph.getDefaultParent());
        }
      } else {
        roots = graph.findTreeRoots(tmp);
      }

      if (roots != null && roots.length > 0) {
        tmp = roots[0];
      }

      if (tmp != null) {
        var layout = new mxRadialTreeLayout(graph, false);
        layout.levelDistance = 80;
        layout.autoRadius = true;

        promptSpacing(layout.levelDistance, mxUtils.bind(this, function (newValue) {
          layout.levelDistance = newValue;

          this.editorUi.executeLayout(function () {
            layout.execute(graph.getDefaultParent(), tmp);

            if (!graph.isSelectionEmpty()) {
              tmp = graph.getModel().getParent(tmp);

              if (graph.getModel().isVertex(tmp)) {
                graph.updateGroupBounds([tmp], graph.gridSize * 2, true);
              }
            }
          }, true);
        }));
      }
    }), parent);
    menu.addSeparator(parent);
    menu.addItem(mxResources.get('organic'), null, mxUtils.bind(this, function () {
      var layout = new mxFastOrganicLayout(graph);

      promptSpacing(layout.forceConstant, mxUtils.bind(this, function (newValue) {
        layout.forceConstant = newValue;

        this.editorUi.executeLayout(function () {
          var tmp = graph.getSelectionCell();

          if (tmp == null || graph.getModel().getChildCount(tmp) == 0) {
            tmp = graph.getDefaultParent();
          }

          layout.execute(tmp);

          if (graph.getModel().isVertex(tmp)) {
            graph.updateGroupBounds([tmp], graph.gridSize * 2, true);
          }
        }, true);
      }));
    }), parent);
    menu.addItem(mxResources.get('circle'), null, mxUtils.bind(this, function () {
      var layout = new mxCircleLayout(graph);

      this.editorUi.executeLayout(function () {
        var tmp = graph.getSelectionCell();

        if (tmp == null || graph.getModel().getChildCount(tmp) == 0) {
          tmp = graph.getDefaultParent();
        }

        layout.execute(tmp);

        if (graph.getModel().isVertex(tmp)) {
          graph.updateGroupBounds([tmp], graph.gridSize * 2, true);
        }
      }, true);
    }), parent);
  })));
  this.put('navigation', new Menu(mxUtils.bind(this, function (menu, parent) {
    this.addMenuItems(menu, ['home', '-', 'exitGroup', 'enterGroup', '-', 'expand', 'collapse', '-', 'collapsible'], parent);
  })));
  this.put('arrange', new Menu(mxUtils.bind(this, function (menu, parent) {
    this.addMenuItems(menu, ['toFront', 'toBack', '-'], parent);
    this.addSubmenu('direction', menu, parent);
    this.addMenuItems(menu, ['turn', '-'], parent);
    this.addSubmenu('align', menu, parent);
    this.addSubmenu('distribute', menu, parent);
    menu.addSeparator(parent);
    this.addSubmenu('navigation', menu, parent);
    this.addSubmenu('insert', menu, parent);
    this.addSubmenu('layout', menu, parent);
    this.addMenuItems(menu, ['-', 'group', 'ungroup', 'removeFromGroup', '-', 'clearWaypoints', 'autosize'], parent);
  }))).isEnabled = isGraphEnabled;
  this.put('insert', new Menu(mxUtils.bind(this, function (menu, parent) {
    this.addMenuItems(menu, ['insertLink', 'insertImage'], parent);
  })));
  this.put('view', new Menu(mxUtils.bind(this, function (menu, parent) {
    this.addMenuItems(menu, (this.editorUi.format != null ? ['formatPanel'] : []).concat(['outline', 'layers', '-', 'pageView', 'pageScale', '-', 'scrollbars', 'tooltips', '-', 'grid', 'guides', '-', 'connectionArrows', 'connectionPoints', '-', 'resetView', 'zoomIn', 'zoomOut'], parent));
  })));
  // Two special dropdowns that are only used in the toolbar
  this.put('viewPanels', new Menu(mxUtils.bind(this, function (menu, parent) {
    if (this.editorUi.format != null) {
      this.addMenuItems(menu, ['formatPanel'], parent);
    }

    this.addMenuItems(menu, ['outline', 'layers'], parent);
  })));
  this.put('viewZoom', new Menu(mxUtils.bind(this, function (menu, parent) {
    this.addMenuItems(menu, ['resetView', '-'], parent);
    var scales = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];

    for (var i = 0; i < scales.length; i++) {
      (function (scale) {
        menu.addItem(scale * 100 + '%', null, function () {
          graph.zoomTo(scale);
        }, parent);
      })(scales[i]);
    }

    this.addMenuItems(menu, ['-', 'fitWindow', 'fitPageWidth', 'fitPage', 'fitTwoPages', '-', 'customZoom'], parent);
  })));
  this.put('file', new Menu(mxUtils.bind(this, function (menu, parent) {
    this.addMenuItems(menu, ['new', 'open', '-', 'save', 'saveAs', '-', 'import', 'export', '-', 'editDiagram', '-', 'pageSetup', 'print'], parent);
  })));
  this.put('edit', new Menu(mxUtils.bind(this, function (menu, parent) {
    this.addMenuItems(menu, ['undo', 'redo', '-', 'cut', 'copy', 'paste', 'delete', '-', 'duplicate', '-', 'editData', 'editTooltip', 'editStyle', '-', 'edit', '-', 'editLink', 'openLink', '-', 'selectVertices', 'selectEdges', 'selectAll', 'selectNone', '-', 'lockUnlock']);
  })));
  this.put('extras', new Menu(mxUtils.bind(this, function (menu, parent) {
    this.addMenuItems(menu, ['editDiagram', 'Ver codigo xml']);
    //this.addMenuItems(menu, ['copyConnect', 'collapseExpand', '-', 'editDiagram']);
  })));
  this.put('help', new Menu(mxUtils.bind(this, function (menu, parent) {
    this.addMenuItems(menu, ['help', '-', 'about']);
  })));
};

/**
 * Adds the label menu items to the given menu and parent.
 */
Menus.prototype.put = function (name, menu) {
  this.menus[name] = menu;

  return menu;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
Menus.prototype.get = function (name) {
  return this.menus[name];
};

/**
 * Adds the given submenu.
 */
Menus.prototype.addSubmenu = function (name, menu, parent) {
  var enabled = this.get(name).isEnabled();

  if (menu.showDisabled || enabled) {
    var submenu = menu.addItem(mxResources.get(name), null, null, parent, null, enabled);
    this.addMenu(name, menu, submenu);
  }
};

/**
 * Adds the label menu items to the given menu and parent.
 */
Menus.prototype.addMenu = function (name, popupMenu, parent) {
  var menu = this.get(name);

  if (menu != null && (popupMenu.showDisabled || menu.isEnabled())) {
    this.get(name).execute(popupMenu, parent);
  }
};

/**
 * Adds a menu item to insert a table.
 */
Menus.prototype.addInsertTableItem = function (menu) {
  // KNOWN: Does not work in IE8 standards and quirks
  var graph = this.editorUi.editor.graph;

  function createTable(rows, cols) {
    var html = ['<table>'];

    for (var i = 0; i < rows; i++) {
      html.push('<tr>');

      for (var j = 0; j < cols; j++) {
        html.push('<td><br></td>');
      }

      html.push('</tr>');
    }

    html.push('</table>');

    return html.join('');
  }

  // Show table size dialog
  var elt2 = menu.addItem('', null, mxUtils.bind(this, function (evt) {
    var td = graph.getParentByName(mxEvent.getSource(evt), 'TD');

    if (td != null) {
      var row2 = graph.getParentByName(td, 'TR');

      // To find the new link, we create a list of all existing links first
      // LATER: Refactor for reuse with code for finding inserted image below
      var tmp = graph.cellEditor.textarea.getElementsByTagName('table');
      var oldTables = [];

      for (var i = 0; i < tmp.length; i++) {
        oldTables.push(tmp[i]);
      }

      // Finding the new table will work with insertHTML, but IE does not support that
      graph.container.focus();
      graph.pasteHtmlAtCaret(createTable(row2.sectionRowIndex + 1, td.cellIndex + 1));

      // Moves cursor to first table cell
      var newTables = graph.cellEditor.textarea.getElementsByTagName('table');

      if (newTables.length == oldTables.length + 1) {
        // Inverse order in favor of appended tables
        for (var i = newTables.length - 1; i >= 0; i--) {
          if (i == 0 || newTables[i] != oldTables[i - 1]) {
            graph.selectNode(newTables[i].rows[0].cells[0]);
            break;
          }
        }
      }
    }
  }));

  // Quirks mode does not add cell padding if cell is empty, needs good old spacer solution
  var quirksCellHtml = '<img src="' + mxClient.imageBasePath + '/transparent.gif' + '" width="16" height="16"/>';

  function createPicker(rows, cols) {
    var table2 = document.createElement('table');
    table2.setAttribute('border', '1');
    table2.style.borderCollapse = 'collapse';

    if (!mxClient.IS_QUIRKS) {
      table2.setAttribute('cellPadding', '8');
    }

    for (var i = 0; i < rows; i++) {
      var row = table2.insertRow(i);

      for (var j = 0; j < cols; j++) {
        var cell = row.insertCell(-1);

        if (mxClient.IS_QUIRKS) {
          cell.innerHTML = quirksCellHtml;
        }
      }
    }

    return table2;
  }

  function extendPicker(picker, rows, cols) {
    for (var i = picker.rows.length; i < rows; i++) {
      var row = picker.insertRow(i);

      for (var j = 0; j < picker.rows[0].cells.length; j++) {
        var cell = row.insertCell(-1);

        if (mxClient.IS_QUIRKS) {
          cell.innerHTML = quirksCellHtml;
        }
      }
    }

    for (var i = 0; i < picker.rows.length; i++) {
      var row = picker.rows[i];

      for (var j = row.cells.length; j < cols; j++) {
        var cell = row.insertCell(-1);

        if (mxClient.IS_QUIRKS) {
          cell.innerHTML = quirksCellHtml;
        }
      }
    }
  }

  elt2.firstChild.innerHTML = '';
  var picker = createPicker(5, 5);
  elt2.firstChild.appendChild(picker);

  var label = document.createElement('div');
  label.style.padding = '4px';
  label.style.fontSize = Menus.prototype.defaultFontSize + 'px';
  label.innerHTML = '1x1';
  elt2.firstChild.appendChild(label);

  mxEvent.addListener(picker, 'mouseover', function (e) {
    var td = graph.getParentByName(mxEvent.getSource(e), 'TD');

    if (td != null) {
      var row2 = graph.getParentByName(td, 'TR');
      extendPicker(picker, Math.min(20, row2.sectionRowIndex + 2), Math.min(20, td.cellIndex + 2));
      label.innerHTML = td.cellIndex + 1 + 'x' + (row2.sectionRowIndex + 1);

      for (var i = 0; i < picker.rows.length; i++) {
        var r = picker.rows[i];

        for (var j = 0; j < r.cells.length; j++) {
          var cell = r.cells[j];

          if (i <= row2.sectionRowIndex && j <= td.cellIndex) {
            cell.style.backgroundColor = 'blue';
          } else {
            cell.style.backgroundColor = 'white';
          }
        }
      }

      mxEvent.consume(e);
    }
  });
};

/**
 * Adds a style change item to the given menu.
 */
Menus.prototype.edgeStyleChange = function (menu, label, keys, values, sprite, parent, reset) {
  return menu.addItem(label, null, mxUtils.bind(this, function () {
    var graph = this.editorUi.editor.graph;
    graph.stopEditing(false);

    graph.getModel().beginUpdate();
    try {
      var cells = graph.getSelectionCells();
      var edges = [];

      for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];

        if (graph.getModel().isEdge(cell)) {
          if (reset) {
            var geo = graph.getCellGeometry(cell);

            // Resets all edge points
            if (geo != null) {
              geo = geo.clone();
              geo.points = null;
              graph.getModel().setGeometry(cell, geo);
            }
          }

          for (var j = 0; j < keys.length; j++) {
            graph.setCellStyles(keys[j], values[j], [cell]);
          }

          edges.push(cell);
        }
      }

      this.editorUi.fireEvent(new mxEventObject('styleChanged', 'keys', keys, 'values', values, 'cells', edges));
    } finally {
      graph.getModel().endUpdate();
    }
  }), parent, sprite);
};

/**
 * Adds a style change item to the given menu.
 */
Menus.prototype.styleChange = function (menu, label, keys, values, sprite, parent, fn) {
  var apply = this.createStyleChangeFunction(keys, values);

  return menu.addItem(label, null, mxUtils.bind(this, function () {
    var graph = this.editorUi.editor.graph;

    if (fn != null && graph.cellEditor.isContentEditing()) {
      fn();
    } else {
      apply();
    }
  }), parent, sprite);
};

/**
 *
 */
Menus.prototype.createStyleChangeFunction = function (keys, values) {
  return mxUtils.bind(this, function () {
    var graph = this.editorUi.editor.graph;
    graph.stopEditing(false);

    graph.getModel().beginUpdate();
    try {
      for (var i = 0; i < keys.length; i++) {
        graph.setCellStyles(keys[i], values[i]);
      }

      this.editorUi.fireEvent(new mxEventObject('styleChanged', 'keys', keys, 'values', values, 'cells', graph.getSelectionCells()));
    } finally {
      graph.getModel().endUpdate();
    }
  });
};

/**
 * Adds a style change item with a prompt to the given menu.
 */
Menus.prototype.promptChange = function (menu, label, hint, defaultValue, key, parent, enabled, fn, sprite) {
  return menu.addItem(label, null, mxUtils.bind(this, function () {
    var graph = this.editorUi.editor.graph;
    var value = defaultValue;
    var state = graph.getView().getState(graph.getSelectionCell());

    if (state != null) {
      value = state.style[key] || value;
    }

    var dlg = new FilenameDialog(this.editorUi, value, mxResources.get('apply'), mxUtils.bind(this, function (newValue) {
      if (newValue != null && newValue.length > 0) {
        graph.getModel().beginUpdate();
        try {
          graph.stopEditing(false);
          graph.setCellStyles(key, newValue);
        } finally {
          graph.getModel().endUpdate();
        }

        if (fn != null) {
          fn(newValue);
        }
      }
    }), mxResources.get('enterValue') + (hint.length > 0 ? ' ' + hint : ''));
    this.editorUi.showDialog(dlg.container, 300, 80, true, true);
    dlg.init();
  }), parent, sprite, enabled);
};

/**
 * Adds a handler for showing a menu in the given element.
 */
Menus.prototype.pickColor = function (key, cmd, defaultValue) {
  var graph = this.editorUi.editor.graph;

  if (cmd != null && graph.cellEditor.isContentEditing()) {
    // Saves and restores text selection for in-place editor
    var selState = graph.cellEditor.saveSelection();

    var dlg = new ColorDialog(this.editorUi, defaultValue || '000000', mxUtils.bind(this, function (color) {
      graph.cellEditor.restoreSelection(selState);
      document.execCommand(cmd, false, color != mxConstants.NONE ? color : 'transparent');
    }), function () {
      graph.cellEditor.restoreSelection(selState);
    });
    this.editorUi.showDialog(dlg.container, 220, 430, true, true);
    dlg.init();
  } else {
    if (this.colorDialog == null) {
      this.colorDialog = new ColorDialog(this.editorUi);
    }

    this.colorDialog.currentColorKey = key;
    var state = graph.getView().getState(graph.getSelectionCell());
    var color = 'none';

    if (state != null) {
      color = state.style[key] || color;
    }

    if (color == 'none') {
      color = 'ffffff';
      this.colorDialog.picker.fromString('ffffff');
      this.colorDialog.colorInput.value = 'none';
    } else {
      this.colorDialog.picker.fromString(color);
    }

    this.editorUi.showDialog(this.colorDialog.container, 220, 430, true, true);
    this.colorDialog.init();
  }
};

/**
 * Adds a handler for showing a menu in the given element.
 */
Menus.prototype.toggleStyle = function (key, defaultValue) {
  var graph = this.editorUi.editor.graph;
  var value = graph.toggleCellStyles(key, defaultValue);
  this.editorUi.fireEvent(new mxEventObject('styleChanged', 'keys', [key], 'values', [value], 'cells', graph.getSelectionCells()));
};

/**
 * Creates the keyboard event handler for the current graph and history.
 */
Menus.prototype.addMenuItem = function (menu, key, parent, trigger, sprite) {
  var action = this.editorUi.actions.get(key);

  if (action != null && (menu.showDisabled || action.isEnabled()) && action.visible) {
    var item = menu.addItem(action.label, null, function () {
      action.funct(trigger);
    }, parent, sprite, action.isEnabled());

    // Adds checkmark image
    if (action.toggleAction && action.isSelected()) {
      menu.addCheckmark(item, Editor.checkmarkImage);
    }

    this.addShortcut(item, action);

    return item;
  }

  return null;
};

/**
 * Adds a checkmark to the given menuitem.
 */
Menus.prototype.addShortcut = function (item, action) {
  if (action.shortcut != null) {
    var td = item.firstChild.nextSibling.nextSibling;
    var span = document.createElement('span');
    span.style.color = 'gray';
    mxUtils.write(span, action.shortcut);
    td.appendChild(span);
  }
};

/**
 * Creates the keyboard event handler for the current graph and history.
 */
Menus.prototype.addMenuItems = function (menu, keys, parent, trigger, sprites) {
  for (var i = 0; i < keys.length; i++) {
    if (keys[i] == '-') {
      menu.addSeparator(parent);
    } else {
      this.addMenuItem(menu, keys[i], parent, trigger, sprites != null ? sprites[i] : null);
    }
  }
};

/**
 * Creates the keyboard event handler for the current graph and history.
 */
Menus.prototype.createPopupMenu = function (menu, cell, evt) {
  var graph = this.editorUi.editor.graph;
  menu.smartSeparators = true;

  if (graph.isSelectionEmpty()) {
    this.addMenuItems(menu, ['undo', 'redo', '-', 'pasteHere'], null, evt);
  } else {
    this.addMenuItems(menu, ['delete', '-', 'cut', 'copy', '-', 'duplicate'], null, evt);
  }

  if (graph.getSelectionCount() > 0) {
    if (graph.getSelectionCount() == 1) {
      this.addMenuItems(menu, ['setAsDefaultStyle'], null, evt);
    }

    menu.addSeparator();

    cell = graph.getSelectionCell();
    var state = graph.view.getState(cell);

    if (state != null) {
      if (graph.getSelectionCount() == 1) {
        this.addMenuItems(menu, ['toFront', 'toBack', '-'], null, evt);
      }

      if (graph.getModel().isEdge(cell) && mxUtils.getValue(state.style, mxConstants.STYLE_EDGE, null) != 'entityRelationEdgeStyle' && mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null) != 'arrow') {
        var handler = graph.selectionCellsHandler.getHandler(cell);
        var isWaypoint = false;

        if (handler instanceof mxEdgeHandler && handler.bends != null && handler.bends.length > 2) {
          var index = handler.getHandleForEvent(graph.updateMouseEvent(new mxMouseEvent(evt)));

          // Configures removeWaypoint action before execution
          // Using trigger parameter is cleaner but have to find waypoint here anyway.
          var rmWaypointAction = this.editorUi.actions.get('removeWaypoint');
          rmWaypointAction.handler = handler;
          rmWaypointAction.index = index;

          isWaypoint = index > 0 && index < handler.bends.length - 1;
        }

        this.addMenuItems(menu, ['-', isWaypoint ? 'removeWaypoint' : 'addWaypoint'], null, evt);

        // Adds reset waypoints option if waypoints exist
        var geo = graph.getModel().getGeometry(cell);

        if (geo != null && geo.points != null && geo.points.length > 0) {
          this.addMenuItems(menu, ['clearWaypoints'], null, evt);
        }
      }

      if (graph.getSelectionCount() > 1) {
        menu.addSeparator();
        this.addMenuItems(menu, ['group'], null, evt);
      } else if (graph.getSelectionCount() == 1 && !graph.getModel().isEdge(cell) && !graph.isSwimlane(cell) && graph.getModel().getChildCount(cell) > 0) {
        menu.addSeparator();
        this.addMenuItems(menu, ['ungroup'], null, evt);
      }

      if (graph.getSelectionCount() == 1) {
        menu.addSeparator();
        this.addMenuItems(menu, ['edit', '-', 'editData', 'editLink'], null, evt);

        // Shows edit image action if there is an image in the style
        if (graph.getModel().isVertex(cell) && mxUtils.getValue(state.style, mxConstants.STYLE_IMAGE, null) != null) {
          menu.addSeparator();
          this.addMenuItem(menu, 'image', null, evt).firstChild.nextSibling.innerHTML = mxResources.get('editImage') + '...';
        }
      }
    }
  } else {
    this.addMenuItems(menu, ['-', 'selectVertices', 'selectEdges', '-', 'selectAll'], null, evt);
  }
};

/**
 * Creates the keyboard event handler for the current graph and history.
 */
Menus.prototype.createMenubar = function (container) {
  var menubar = new Menubar(this.editorUi, container);
  var menus = this.defaultMenuItems;

  for (var i = 0; i < menus.length; i++) {
    mxUtils.bind(this, function (menu) {
      var elt = menubar.addMenu(mxResources.get(menus[i]), mxUtils.bind(this, function () {
        // Allows extensions of menu.funct
        menu.funct.apply(this, arguments);
      }));

      if (elt != null) {
        menu.addListener('stateChanged', function () {
          elt.enabled = menu.enabled;

          if (!menu.enabled) {
            elt.className = 'geItem mxDisabled';

            if (document.documentMode == 8) {
              elt.style.color = '#c3c3c3';
            }
          } else {
            elt.className = 'geItem';

            if (document.documentMode == 8) {
              elt.style.color = '';
            }
          }
        });
      }
    })(this.get(menus[i]));
  }

  return menubar;
};

/**
 * Construcs a new menubar for the given editor.
 */
function Menubar(editorUi, container) {
  this.editorUi = editorUi;
  this.container = container;
}

/**
 * Adds the menubar elements.
 */
Menubar.prototype.hideMenu = function () {
  this.editorUi.hideCurrentMenu();
};

/**
 * Adds a submenu to this menubar.
 */
Menubar.prototype.addMenu = function (label, funct) {
  var elt = document.createElement('a');
  elt.setAttribute('href', 'javascript:void(0);');
  elt.className = 'geItem';
  mxUtils.write(elt, label);

  this.addMenuHandler(elt, funct);
  this.container.appendChild(elt);

  return elt;
};

/**
 * Adds a handler for showing a menu in the given element.
 */
Menubar.prototype.addMenuHandler = function (elt, funct) {
  if (funct != null) {
    var show = true;

    var clickHandler = mxUtils.bind(this, function (evt) {
      if (show && elt.enabled == null || elt.enabled) {
        this.editorUi.editor.graph.popupMenuHandler.hideMenu();
        var menu = new mxPopupMenu(funct);
        menu.div.className += ' geMenubarMenu';
        menu.smartSeparators = true;
        menu.showDisabled = true;
        menu.autoExpand = true;

        // Disables autoexpand and destroys menu when hidden
        menu.hideMenu = mxUtils.bind(this, function () {
          mxPopupMenu.prototype.hideMenu.apply(menu, arguments);
          this.editorUi.resetCurrentMenu();
          menu.destroy();
        });

        var offset = mxUtils.getOffset(elt);
        menu.popup(offset.x, offset.y + elt.offsetHeight, null, evt);
        this.editorUi.setCurrentMenu(menu, elt);
      }

      mxEvent.consume(evt);
    });

    // Shows menu automatically while in expanded state
    mxEvent.addListener(elt, 'mousemove', mxUtils.bind(this, function (evt) {
      if (this.editorUi.currentMenu != null && this.editorUi.currentMenuElt != elt) {
        this.editorUi.hideCurrentMenu();
        clickHandler(evt);
      }
    }));

    // Hides menu if already showing
    mxEvent.addListener(elt, 'mousedown', mxUtils.bind(this, function () {
      show = this.currentElt != elt;
    }));

    mxEvent.addListener(elt, 'click', mxUtils.bind(this, function (evt) {
      clickHandler(evt);
      show = true;
    }));
  }
};

/**
 * Creates the keyboard event handler for the current graph and history.
 */
Menubar.prototype.destroy = function () {
  // do nothing
};

/**
 * Constructs a new action for the given parameters.
 */
function Menu(funct, enabled) {
  mxEventSource.call(this);
  this.funct = funct;
  this.enabled = enabled != null ? enabled : true;
}

// Menu inherits from mxEventSource
mxUtils.extend(Menu, mxEventSource);

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Menu.prototype.isEnabled = function () {
  return this.enabled;
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Menu.prototype.setEnabled = function (value) {
  if (this.enabled != value) {
    this.enabled = value;
    this.fireEvent(new mxEventObject('stateChanged'));
  }
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Menu.prototype.execute = function (menu, parent) {
  this.funct(menu, parent);
};

module.exports = Menus;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.addEventListener('load', function () {
  var _require = __webpack_require__(19),
      io = _require.io,
      socket = _require.socket;

  var EditorUi = __webpack_require__(16);
  var params = new URL(window.location).searchParams;
  var room = params.get('room');
  var username = params.get('username');
  var RoomNotFound = 'Clave de la Sala';
  var UserNotFound = 'Codigo Unico del usuario';

  // Extends EditorUi to update I/O action states based on availability of backend

  var editorUiInit = EditorUi.prototype.init;

  EditorUi.prototype.init = function () {

    editorUiInit.apply(this, arguments);
    this.actions.get('export').setEnabled(true);

    // Updates action states which require a backend
    Editor.useLocalStorage = true;
    Editor.useFileSystemSave = true;
    if (!Editor.useLocalStorage) {
      mxUtils.post(OPEN_URL, '', mxUtils.bind(this, function (req) {
        var enabled = req.getStatus() != 404;
        this.actions.get('open').setEnabled(enabled || Graph.fileSupport);
        this.actions.get('import').setEnabled(enabled || Graph.fileSupport);
        this.actions.get('save').setEnabled(enabled);
        this.actions.get('saveAs').setEnabled(enabled);
        this.actions.get('export').setEnabled(enabled);
      }));
    }

    this.actions.addAction('new...', function () {
      var answer = window.confirm("Estas seguro en crear un nuevo diagrama?");
      if (answer) {
        EditorUi.prototype.editor.setGraphXml(window.parent.mxUtils.parseXml('<mxGraphModel dx="667" dy="662" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="826" pageHeight="1169" background="#ffffff"><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel>').documentElement);
      }
    });

    this.actions.addAction('save', function () {
      //console.log('save action desde indexJS');
      var answer = window.confirm('Estas seguro en guardar el diagrama?');
      if (answer) {
        //console.log('emitir el evento guardar');
        socket.emit('save_component', { room: room });
      }
    }, null, null, '');

    // Extends graphChangeListener to emit socket server

    var graphChangeListener = EditorUi.prototype.editor.graphChangeListener;
    EditorUi.prototype.editor.graphChangeListener = function (sender, eventObject) {
      graphChangeListener.apply(this, arguments);
      //console.log(event);
      if (event && event.pointerType || event && event.key == 'Delete' || event && event.key == 'Backspace') {
        //console.log('is a pointer type...');
        var snapshotDiagramXml = EditorUi.prototype.editor.getGraphXml();
        var xmlString = new XMLSerializer().serializeToString(snapshotDiagramXml);
        socket.emit('draw_component', { room: room, xml: xmlString });
      }
    };
    this.footerContainer.style.textAlign = 'center';

    if (room && username) {
      socket.emit('login', { name: username, room: room });
    } else {
      if (room && !username) {
        this.footerContainer.innerHTML = '<strong>AVISO: ' + UserNotFound + ' no encontrado. MODO SOLITARIO</strong>';
      } else if (username && !room) {
        this.footerContainer.innerHTML = '<strong>AVISO: ' + RoomNotFound + ' no encontrado. MODO SOLITARIO</strong>';
      } else {
        this.footerContainer.innerHTML = '<strong>AVISO: ' + UserNotFound + ' y ' + RoomNotFound + ' no encontrados. MODO SOLITARIO</strong>';
      }
    }
  };

  // Extends itemClicked to emit socket server

  var itemClicked = EditorUi.prototype.sidebar.prototype.itemClicked;
  EditorUi.prototype.sidebar.prototype.itemClicked = function (cells, ds, evt, elt) {
    itemClicked.apply(this, arguments);
    //console.log('extends from itemClicked...');
    var snapshotDiagramXml = this.editorUi.editor.getGraphXml();
    var xmlString = new XMLSerializer().serializeToString(snapshotDiagramXml);
    socket.emit('draw_component', { room: room, xml: xmlString });
  };

  // Adds required resources (disables loading of fallback properties, this can only
  // be used if we know that all keys are defined in the language specific file)
  mxResources.loadDefaultBundle = false;
  var bundle = mxResources.getDefaultBundle(RESOURCE_BASE, mxLanguage) || mxResources.getSpecialBundle(RESOURCE_BASE, mxLanguage);

  // Fixes possible asynchronous requests
  mxUtils.getAll([bundle, STYLE_PATH + '/default.xml'], function (xhr) {
    // Adds bundle text to resources
    mxResources.parse(xhr[0].getText());

    // Configures the default graph theme
    var themes = new Object();
    themes[Graph.prototype.defaultThemeName] = xhr[1].getDocumentElement();

    // Main
    new EditorUi(new Editor(urlParams.chrome == '0', themes));
    //console.log(EditorUi.prototype.sidebarContainer);
    var users = document.createElement('a');
    users.className = 'geTitle';
    users.style = 'padding-left:7%';
    users.innerText = 'Usuarios en la Sala';
    EditorUi.prototype.sidebarContainer.appendChild(users);
  }, function () {
    document.body.innerHTML = '<center style="margin-top:10%;">Error loading resource files. Please check browser console.</center>';
  });

  // socket client
  socket.on('connect', function () {

    socket.on('draw_component', function (data) {
      //console.log('Listen to socketClient.drawComponent');
      var xmlString = data.xml;
      //console.log('xmlstring es ',xmlString);

      if (xmlString !== '') {
        EditorUi.prototype.editor.setGraphXml(window.parent.mxUtils.parseXml(xmlString).documentElement);
      }
    });

    socket.on('load_room_title', function (data) {
      var title = document.createElement('a');
      title.className = 'geTitle';
      title.innerHTML = '<center style="margin-right:10%;"><strong>' + data.title.trim().toUpperCase() + '</strong> </center>';
      EditorUi.prototype.sidebarContainer.insertBefore(title, EditorUi.prototype.sidebarContainer.firstChild);
    });

    socket.on('reload_users_room', function (data) {
      console.log('reload_users_room desde el socket cliente.');
      data.users.forEach(function (user) {
        var isDraw = true;
        // redraw users connects
        var children = EditorUi.prototype.sidebarContainer.children;
        for (var i = 0; i < children.length; i++) {
          if (user.id == children[i].id) {
            isDraw = false;
          }
        };

        if (isDraw) {
          var client = document.createElement('div');
          client.className = 'geTitle';
          client.id = user.id;
          client.style = 'padding-left:13%';
          client.innerHTML = ' <i class="fa fa-user" style="margin-right:5%;" > </i>' + user.name;
          EditorUi.prototype.sidebarContainer.appendChild(client);
        }
      });
    });

    socket.on('error_server', function () {

      EditorUi.prototype.footerContainer.innerHTML = '<strong>AVISO: Error al traer datos del Servidor. MODO SOLITARIO</strong>';
    });

    socket.on('remove_user_room', function (data) {
      // redraw users connects
      //console.log('remove_user_room...');
      var children = EditorUi.prototype.sidebarContainer.children;
      for (var i = 0; i < children.length; i++) {
        var id = children[i].id;
        if (data.userToRemove.id == id) {
          children[i].remove();
        }
      };
    });

    socket.on('save_response', function (data) {

      alert(data.message);
    });
  });
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var io = __webpack_require__(20);
var socket = io.connect('http://localhost:9090');
console.log('socket cargado...');

module.exports = {
    io: io,
    socket: socket
};

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "io", function() { return lookup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connect", function() { return lookup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return lookup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__url_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__manager_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__socket_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_socket_io_parser__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "protocol", function() { return __WEBPACK_IMPORTED_MODULE_3_socket_io_parser__["protocol"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Manager", function() { return __WEBPACK_IMPORTED_MODULE_1__manager_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Socket", function() { return __WEBPACK_IMPORTED_MODULE_2__socket_js__["a"]; });



/**
 * Managers cache.
 */
const cache = {};
function lookup(uri, opts) {
    if (typeof uri === "object") {
        opts = uri;
        uri = undefined;
    }
    opts = opts || {};
    const parsed = Object(__WEBPACK_IMPORTED_MODULE_0__url_js__["a" /* url */])(uri, opts.path || "/socket.io");
    const source = parsed.source;
    const id = parsed.id;
    const path = parsed.path;
    const sameNamespace = cache[id] && path in cache[id]["nsps"];
    const newConnection = opts.forceNew ||
        opts["force new connection"] ||
        false === opts.multiplex ||
        sameNamespace;
    let io;
    if (newConnection) {
        io = new __WEBPACK_IMPORTED_MODULE_1__manager_js__["a" /* Manager */](source, opts);
    }
    else {
        if (!cache[id]) {
            cache[id] = new __WEBPACK_IMPORTED_MODULE_1__manager_js__["a" /* Manager */](source, opts);
        }
        io = cache[id];
    }
    if (parsed.query && !opts.query) {
        opts.query = parsed.queryKey;
    }
    return io.socket(parsed.path, opts);
}
// so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
// namespace (e.g. `io.connect(...)`), for backward compatibility
Object.assign(lookup, {
    Manager: __WEBPACK_IMPORTED_MODULE_1__manager_js__["a" /* Manager */],
    Socket: __WEBPACK_IMPORTED_MODULE_2__socket_js__["a" /* Socket */],
    io: lookup,
    connect: lookup,
});
/**
 * Protocol version.
 *
 * @public
 */

/**
 * Expose constructors for standalone build.
 *
 * @public
 */



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = url;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_engine_io_client__ = __webpack_require__(8);

/**
 * URL parser.
 *
 * @param uri - url
 * @param path - the request path of the connection
 * @param loc - An object meant to mimic window.location.
 *        Defaults to window.location.
 * @public
 */
function url(uri, path = "", loc) {
    let obj = uri;
    // default to window.location
    loc = loc || (typeof location !== "undefined" && location);
    if (null == uri)
        uri = loc.protocol + "//" + loc.host;
    // relative path support
    if (typeof uri === "string") {
        if ("/" === uri.charAt(0)) {
            if ("/" === uri.charAt(1)) {
                uri = loc.protocol + uri;
            }
            else {
                uri = loc.host + uri;
            }
        }
        if (!/^(https?|wss?):\/\//.test(uri)) {
            if ("undefined" !== typeof loc) {
                uri = loc.protocol + "//" + uri;
            }
            else {
                uri = "https://" + uri;
            }
        }
        // parse
        obj = Object(__WEBPACK_IMPORTED_MODULE_0_engine_io_client__["c" /* parse */])(uri);
    }
    // make sure we treat `localhost:80` and `localhost` equally
    if (!obj.port) {
        if (/^(http|ws)$/.test(obj.protocol)) {
            obj.port = "80";
        }
        else if (/^(http|ws)s$/.test(obj.protocol)) {
            obj.port = "443";
        }
    }
    obj.path = obj.path || "/";
    const ipv6 = obj.host.indexOf(":") !== -1;
    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
    // define unique id
    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
    // define href
    obj.href =
        obj.protocol +
            "://" +
            host +
            (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
}


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transports_index_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contrib_parseqs_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__contrib_parseuri_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__socket_io_component_emitter__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_engine_io_parser__ = __webpack_require__(2);






class Socket extends __WEBPACK_IMPORTED_MODULE_4__socket_io_component_emitter__["a" /* Emitter */] {
    /**
     * Socket constructor.
     *
     * @param {String|Object} uri or options
     * @param {Object} opts - options
     * @api public
     */
    constructor(uri, opts = {}) {
        super();
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = null;
        }
        if (uri) {
            uri = Object(__WEBPACK_IMPORTED_MODULE_3__contrib_parseuri_js__["a" /* parse */])(uri);
            opts.hostname = uri.host;
            opts.secure = uri.protocol === "https" || uri.protocol === "wss";
            opts.port = uri.port;
            if (uri.query)
                opts.query = uri.query;
        }
        else if (opts.host) {
            opts.hostname = Object(__WEBPACK_IMPORTED_MODULE_3__contrib_parseuri_js__["a" /* parse */])(opts.host).host;
        }
        Object(__WEBPACK_IMPORTED_MODULE_1__util_js__["b" /* installTimerFunctions */])(this, opts);
        this.secure =
            null != opts.secure
                ? opts.secure
                : typeof location !== "undefined" && "https:" === location.protocol;
        if (opts.hostname && !opts.port) {
            // if no port is specified manually, use the protocol default
            opts.port = this.secure ? "443" : "80";
        }
        this.hostname =
            opts.hostname ||
                (typeof location !== "undefined" ? location.hostname : "localhost");
        this.port =
            opts.port ||
                (typeof location !== "undefined" && location.port
                    ? location.port
                    : this.secure
                        ? "443"
                        : "80");
        this.transports = opts.transports || ["polling", "websocket"];
        this.readyState = "";
        this.writeBuffer = [];
        this.prevBufferLen = 0;
        this.opts = Object.assign({
            path: "/engine.io",
            agent: false,
            withCredentials: false,
            upgrade: true,
            timestampParam: "t",
            rememberUpgrade: false,
            rejectUnauthorized: true,
            perMessageDeflate: {
                threshold: 1024
            },
            transportOptions: {},
            closeOnBeforeunload: true
        }, opts);
        this.opts.path = this.opts.path.replace(/\/$/, "") + "/";
        if (typeof this.opts.query === "string") {
            this.opts.query = Object(__WEBPACK_IMPORTED_MODULE_2__contrib_parseqs_js__["a" /* decode */])(this.opts.query);
        }
        // set on handshake
        this.id = null;
        this.upgrades = null;
        this.pingInterval = null;
        this.pingTimeout = null;
        // set on heartbeat
        this.pingTimeoutTimer = null;
        if (typeof addEventListener === "function") {
            if (this.opts.closeOnBeforeunload) {
                // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
                // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
                // closed/reloaded)
                addEventListener("beforeunload", () => {
                    if (this.transport) {
                        // silently close the transport
                        this.transport.removeAllListeners();
                        this.transport.close();
                    }
                }, false);
            }
            if (this.hostname !== "localhost") {
                this.offlineEventListener = () => {
                    this.onClose("transport close", {
                        description: "network connection lost"
                    });
                };
                addEventListener("offline", this.offlineEventListener, false);
            }
        }
        this.open();
    }
    /**
     * Creates transport of the given type.
     *
     * @param {String} transport name
     * @return {Transport}
     * @api private
     */
    createTransport(name) {
        const query = Object.assign({}, this.opts.query);
        // append engine.io protocol identifier
        query.EIO = __WEBPACK_IMPORTED_MODULE_5_engine_io_parser__["e" /* protocol */];
        // transport name
        query.transport = name;
        // session id if we already have one
        if (this.id)
            query.sid = this.id;
        const opts = Object.assign({}, this.opts.transportOptions[name], this.opts, {
            query,
            socket: this,
            hostname: this.hostname,
            secure: this.secure,
            port: this.port
        });
        return new __WEBPACK_IMPORTED_MODULE_0__transports_index_js__["a" /* transports */][name](opts);
    }
    /**
     * Initializes transport to use and starts probe.
     *
     * @api private
     */
    open() {
        let transport;
        if (this.opts.rememberUpgrade &&
            Socket.priorWebsocketSuccess &&
            this.transports.indexOf("websocket") !== -1) {
            transport = "websocket";
        }
        else if (0 === this.transports.length) {
            // Emit error on next tick so it can be listened to
            this.setTimeoutFn(() => {
                this.emitReserved("error", "No transports available");
            }, 0);
            return;
        }
        else {
            transport = this.transports[0];
        }
        this.readyState = "opening";
        // Retry with the next transport if the transport is disabled (jsonp: false)
        try {
            transport = this.createTransport(transport);
        }
        catch (e) {
            this.transports.shift();
            this.open();
            return;
        }
        transport.open();
        this.setTransport(transport);
    }
    /**
     * Sets the current transport. Disables the existing one (if any).
     *
     * @api private
     */
    setTransport(transport) {
        if (this.transport) {
            this.transport.removeAllListeners();
        }
        // set up transport
        this.transport = transport;
        // set up transport listeners
        transport
            .on("drain", this.onDrain.bind(this))
            .on("packet", this.onPacket.bind(this))
            .on("error", this.onError.bind(this))
            .on("close", reason => this.onClose("transport close", reason));
    }
    /**
     * Probes a transport.
     *
     * @param {String} transport name
     * @api private
     */
    probe(name) {
        let transport = this.createTransport(name);
        let failed = false;
        Socket.priorWebsocketSuccess = false;
        const onTransportOpen = () => {
            if (failed)
                return;
            transport.send([{ type: "ping", data: "probe" }]);
            transport.once("packet", msg => {
                if (failed)
                    return;
                if ("pong" === msg.type && "probe" === msg.data) {
                    this.upgrading = true;
                    this.emitReserved("upgrading", transport);
                    if (!transport)
                        return;
                    Socket.priorWebsocketSuccess = "websocket" === transport.name;
                    this.transport.pause(() => {
                        if (failed)
                            return;
                        if ("closed" === this.readyState)
                            return;
                        cleanup();
                        this.setTransport(transport);
                        transport.send([{ type: "upgrade" }]);
                        this.emitReserved("upgrade", transport);
                        transport = null;
                        this.upgrading = false;
                        this.flush();
                    });
                }
                else {
                    const err = new Error("probe error");
                    // @ts-ignore
                    err.transport = transport.name;
                    this.emitReserved("upgradeError", err);
                }
            });
        };
        function freezeTransport() {
            if (failed)
                return;
            // Any callback called by transport should be ignored since now
            failed = true;
            cleanup();
            transport.close();
            transport = null;
        }
        // Handle any error that happens while probing
        const onerror = err => {
            const error = new Error("probe error: " + err);
            // @ts-ignore
            error.transport = transport.name;
            freezeTransport();
            this.emitReserved("upgradeError", error);
        };
        function onTransportClose() {
            onerror("transport closed");
        }
        // When the socket is closed while we're probing
        function onclose() {
            onerror("socket closed");
        }
        // When the socket is upgraded while we're probing
        function onupgrade(to) {
            if (transport && to.name !== transport.name) {
                freezeTransport();
            }
        }
        // Remove all listeners on the transport and on self
        const cleanup = () => {
            transport.removeListener("open", onTransportOpen);
            transport.removeListener("error", onerror);
            transport.removeListener("close", onTransportClose);
            this.off("close", onclose);
            this.off("upgrading", onupgrade);
        };
        transport.once("open", onTransportOpen);
        transport.once("error", onerror);
        transport.once("close", onTransportClose);
        this.once("close", onclose);
        this.once("upgrading", onupgrade);
        transport.open();
    }
    /**
     * Called when connection is deemed open.
     *
     * @api private
     */
    onOpen() {
        this.readyState = "open";
        Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
        this.emitReserved("open");
        this.flush();
        // we check for `readyState` in case an `open`
        // listener already closed the socket
        if ("open" === this.readyState &&
            this.opts.upgrade &&
            this.transport.pause) {
            let i = 0;
            const l = this.upgrades.length;
            for (; i < l; i++) {
                this.probe(this.upgrades[i]);
            }
        }
    }
    /**
     * Handles a packet.
     *
     * @api private
     */
    onPacket(packet) {
        if ("opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState) {
            this.emitReserved("packet", packet);
            // Socket is live - any packet counts
            this.emitReserved("heartbeat");
            switch (packet.type) {
                case "open":
                    this.onHandshake(JSON.parse(packet.data));
                    break;
                case "ping":
                    this.resetPingTimeout();
                    this.sendPacket("pong");
                    this.emitReserved("ping");
                    this.emitReserved("pong");
                    break;
                case "error":
                    const err = new Error("server error");
                    // @ts-ignore
                    err.code = packet.data;
                    this.onError(err);
                    break;
                case "message":
                    this.emitReserved("data", packet.data);
                    this.emitReserved("message", packet.data);
                    break;
            }
        }
        else {
        }
    }
    /**
     * Called upon handshake completion.
     *
     * @param {Object} data - handshake obj
     * @api private
     */
    onHandshake(data) {
        this.emitReserved("handshake", data);
        this.id = data.sid;
        this.transport.query.sid = data.sid;
        this.upgrades = this.filterUpgrades(data.upgrades);
        this.pingInterval = data.pingInterval;
        this.pingTimeout = data.pingTimeout;
        this.maxPayload = data.maxPayload;
        this.onOpen();
        // In case open handler closes socket
        if ("closed" === this.readyState)
            return;
        this.resetPingTimeout();
    }
    /**
     * Sets and resets ping timeout timer based on server pings.
     *
     * @api private
     */
    resetPingTimeout() {
        this.clearTimeoutFn(this.pingTimeoutTimer);
        this.pingTimeoutTimer = this.setTimeoutFn(() => {
            this.onClose("ping timeout");
        }, this.pingInterval + this.pingTimeout);
        if (this.opts.autoUnref) {
            this.pingTimeoutTimer.unref();
        }
    }
    /**
     * Called on `drain` event
     *
     * @api private
     */
    onDrain() {
        this.writeBuffer.splice(0, this.prevBufferLen);
        // setting prevBufferLen = 0 is very important
        // for example, when upgrading, upgrade packet is sent over,
        // and a nonzero prevBufferLen could cause problems on `drain`
        this.prevBufferLen = 0;
        if (0 === this.writeBuffer.length) {
            this.emitReserved("drain");
        }
        else {
            this.flush();
        }
    }
    /**
     * Flush write buffers.
     *
     * @api private
     */
    flush() {
        if ("closed" !== this.readyState &&
            this.transport.writable &&
            !this.upgrading &&
            this.writeBuffer.length) {
            const packets = this.getWritablePackets();
            this.transport.send(packets);
            // keep track of current length of writeBuffer
            // splice writeBuffer and callbackBuffer on `drain`
            this.prevBufferLen = packets.length;
            this.emitReserved("flush");
        }
    }
    /**
     * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
     * long-polling)
     *
     * @private
     */
    getWritablePackets() {
        const shouldCheckPayloadSize = this.maxPayload &&
            this.transport.name === "polling" &&
            this.writeBuffer.length > 1;
        if (!shouldCheckPayloadSize) {
            return this.writeBuffer;
        }
        let payloadSize = 1; // first packet type
        for (let i = 0; i < this.writeBuffer.length; i++) {
            const data = this.writeBuffer[i].data;
            if (data) {
                payloadSize += Object(__WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* byteLength */])(data);
            }
            if (i > 0 && payloadSize > this.maxPayload) {
                return this.writeBuffer.slice(0, i);
            }
            payloadSize += 2; // separator + packet type
        }
        return this.writeBuffer;
    }
    /**
     * Sends a message.
     *
     * @param {String} message.
     * @param {Function} callback function.
     * @param {Object} options.
     * @return {Socket} for chaining.
     * @api public
     */
    write(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
    }
    send(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
    }
    /**
     * Sends a packet.
     *
     * @param {String} packet type.
     * @param {String} data.
     * @param {Object} options.
     * @param {Function} callback function.
     * @api private
     */
    sendPacket(type, data, options, fn) {
        if ("function" === typeof data) {
            fn = data;
            data = undefined;
        }
        if ("function" === typeof options) {
            fn = options;
            options = null;
        }
        if ("closing" === this.readyState || "closed" === this.readyState) {
            return;
        }
        options = options || {};
        options.compress = false !== options.compress;
        const packet = {
            type: type,
            data: data,
            options: options
        };
        this.emitReserved("packetCreate", packet);
        this.writeBuffer.push(packet);
        if (fn)
            this.once("flush", fn);
        this.flush();
    }
    /**
     * Closes the connection.
     *
     * @api public
     */
    close() {
        const close = () => {
            this.onClose("forced close");
            this.transport.close();
        };
        const cleanupAndClose = () => {
            this.off("upgrade", cleanupAndClose);
            this.off("upgradeError", cleanupAndClose);
            close();
        };
        const waitForUpgrade = () => {
            // wait for upgrade to finish since we can't send packets while pausing a transport
            this.once("upgrade", cleanupAndClose);
            this.once("upgradeError", cleanupAndClose);
        };
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            if (this.writeBuffer.length) {
                this.once("drain", () => {
                    if (this.upgrading) {
                        waitForUpgrade();
                    }
                    else {
                        close();
                    }
                });
            }
            else if (this.upgrading) {
                waitForUpgrade();
            }
            else {
                close();
            }
        }
        return this;
    }
    /**
     * Called upon transport error
     *
     * @api private
     */
    onError(err) {
        Socket.priorWebsocketSuccess = false;
        this.emitReserved("error", err);
        this.onClose("transport error", err);
    }
    /**
     * Called upon transport close.
     *
     * @api private
     */
    onClose(reason, description) {
        if ("opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState) {
            // clear timers
            this.clearTimeoutFn(this.pingTimeoutTimer);
            // stop event from firing again for transport
            this.transport.removeAllListeners("close");
            // ensure transport won't stay open
            this.transport.close();
            // ignore further transport communication
            this.transport.removeAllListeners();
            if (typeof removeEventListener === "function") {
                removeEventListener("offline", this.offlineEventListener, false);
            }
            // set ready state
            this.readyState = "closed";
            // clear session id
            this.id = null;
            // emit close event
            this.emitReserved("close", reason, description);
            // clean buffers after, so users can still
            // grab the buffers on `close` event
            this.writeBuffer = [];
            this.prevBufferLen = 0;
        }
    }
    /**
     * Filters upgrades, returning only those matching client transports.
     *
     * @param {Array} server upgrades
     * @api private
     *
     */
    filterUpgrades(upgrades) {
        const filteredUpgrades = [];
        let i = 0;
        const j = upgrades.length;
        for (; i < j; i++) {
            if (~this.transports.indexOf(upgrades[i]))
                filteredUpgrades.push(upgrades[i]);
        }
        return filteredUpgrades;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Socket;

Socket.protocol = __WEBPACK_IMPORTED_MODULE_5_engine_io_parser__["e" /* protocol */];


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transport_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contrib_yeast_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contrib_parseqs_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_engine_io_parser__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__xmlhttprequest_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__socket_io_component_emitter__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__globalThis_js__ = __webpack_require__(3);








function empty() { }
const hasXHR2 = (function () {
    const xhr = new __WEBPACK_IMPORTED_MODULE_4__xmlhttprequest_js__["a" /* default */]({
        xdomain: false
    });
    return null != xhr.responseType;
})();
class Polling extends __WEBPACK_IMPORTED_MODULE_0__transport_js__["a" /* Transport */] {
    /**
     * XHR Polling constructor.
     *
     * @param {Object} opts
     * @api public
     */
    constructor(opts) {
        super(opts);
        this.polling = false;
        if (typeof location !== "undefined") {
            const isSSL = "https:" === location.protocol;
            let port = location.port;
            // some user agents have empty `location.port`
            if (!port) {
                port = isSSL ? "443" : "80";
            }
            this.xd =
                (typeof location !== "undefined" &&
                    opts.hostname !== location.hostname) ||
                    port !== opts.port;
            this.xs = opts.secure !== isSSL;
        }
        /**
         * XHR supports binary
         */
        const forceBase64 = opts && opts.forceBase64;
        this.supportsBinary = hasXHR2 && !forceBase64;
    }
    /**
     * Transport name.
     */
    get name() {
        return "polling";
    }
    /**
     * Opens the socket (triggers polling). We write a PING message to determine
     * when the transport is open.
     *
     * @api private
     */
    doOpen() {
        this.poll();
    }
    /**
     * Pauses polling.
     *
     * @param {Function} callback upon buffers are flushed and transport is paused
     * @api private
     */
    pause(onPause) {
        this.readyState = "pausing";
        const pause = () => {
            this.readyState = "paused";
            onPause();
        };
        if (this.polling || !this.writable) {
            let total = 0;
            if (this.polling) {
                total++;
                this.once("pollComplete", function () {
                    --total || pause();
                });
            }
            if (!this.writable) {
                total++;
                this.once("drain", function () {
                    --total || pause();
                });
            }
        }
        else {
            pause();
        }
    }
    /**
     * Starts polling cycle.
     *
     * @api public
     */
    poll() {
        this.polling = true;
        this.doPoll();
        this.emitReserved("poll");
    }
    /**
     * Overloads onData to detect payloads.
     *
     * @api private
     */
    onData(data) {
        const callback = packet => {
            // if its the first message we consider the transport open
            if ("opening" === this.readyState && packet.type === "open") {
                this.onOpen();
            }
            // if its a close packet, we close the ongoing requests
            if ("close" === packet.type) {
                this.onClose({ description: "transport closed by the server" });
                return false;
            }
            // otherwise bypass onData and handle the message
            this.onPacket(packet);
        };
        // decode payload
        Object(__WEBPACK_IMPORTED_MODULE_3_engine_io_parser__["b" /* decodePayload */])(data, this.socket.binaryType).forEach(callback);
        // if an event did not trigger closing
        if ("closed" !== this.readyState) {
            // if we got data we're not polling
            this.polling = false;
            this.emitReserved("pollComplete");
            if ("open" === this.readyState) {
                this.poll();
            }
            else {
            }
        }
    }
    /**
     * For polling, send a close packet.
     *
     * @api private
     */
    doClose() {
        const close = () => {
            this.write([{ type: "close" }]);
        };
        if ("open" === this.readyState) {
            close();
        }
        else {
            // in case we're trying to close while
            // handshaking is in progress (GH-164)
            this.once("open", close);
        }
    }
    /**
     * Writes a packets payload.
     *
     * @param {Array} data packets
     * @param {Function} drain callback
     * @api private
     */
    write(packets) {
        this.writable = false;
        Object(__WEBPACK_IMPORTED_MODULE_3_engine_io_parser__["d" /* encodePayload */])(packets, data => {
            this.doWrite(data, () => {
                this.writable = true;
                this.emitReserved("drain");
            });
        });
    }
    /**
     * Generates uri for connection.
     *
     * @api private
     */
    uri() {
        let query = this.query || {};
        const schema = this.opts.secure ? "https" : "http";
        let port = "";
        // cache busting is forced
        if (false !== this.opts.timestampRequests) {
            query[this.opts.timestampParam] = Object(__WEBPACK_IMPORTED_MODULE_1__contrib_yeast_js__["a" /* yeast */])();
        }
        if (!this.supportsBinary && !query.sid) {
            query.b64 = 1;
        }
        // avoid port if default for schema
        if (this.opts.port &&
            (("https" === schema && Number(this.opts.port) !== 443) ||
                ("http" === schema && Number(this.opts.port) !== 80))) {
            port = ":" + this.opts.port;
        }
        const encodedQuery = Object(__WEBPACK_IMPORTED_MODULE_2__contrib_parseqs_js__["b" /* encode */])(query);
        const ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return (schema +
            "://" +
            (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
            port +
            this.opts.path +
            (encodedQuery.length ? "?" + encodedQuery : ""));
    }
    /**
     * Creates a request.
     *
     * @param {String} method
     * @api private
     */
    request(opts = {}) {
        Object.assign(opts, { xd: this.xd, xs: this.xs }, this.opts);
        return new Request(this.uri(), opts);
    }
    /**
     * Sends data.
     *
     * @param {String} data to send.
     * @param {Function} called upon flush.
     * @api private
     */
    doWrite(data, fn) {
        const req = this.request({
            method: "POST",
            data: data
        });
        req.on("success", fn);
        req.on("error", (xhrStatus, context) => {
            this.onError("xhr post error", xhrStatus, context);
        });
    }
    /**
     * Starts a poll cycle.
     *
     * @api private
     */
    doPoll() {
        const req = this.request();
        req.on("data", this.onData.bind(this));
        req.on("error", (xhrStatus, context) => {
            this.onError("xhr poll error", xhrStatus, context);
        });
        this.pollXhr = req;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Polling;

class Request extends __WEBPACK_IMPORTED_MODULE_5__socket_io_component_emitter__["a" /* Emitter */] {
    /**
     * Request constructor
     *
     * @param {Object} options
     * @api public
     */
    constructor(uri, opts) {
        super();
        Object(__WEBPACK_IMPORTED_MODULE_6__util_js__["b" /* installTimerFunctions */])(this, opts);
        this.opts = opts;
        this.method = opts.method || "GET";
        this.uri = uri;
        this.async = false !== opts.async;
        this.data = undefined !== opts.data ? opts.data : null;
        this.create();
    }
    /**
     * Creates the XHR object and sends the request.
     *
     * @api private
     */
    create() {
        const opts = Object(__WEBPACK_IMPORTED_MODULE_6__util_js__["c" /* pick */])(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
        opts.xdomain = !!this.opts.xd;
        opts.xscheme = !!this.opts.xs;
        const xhr = (this.xhr = new __WEBPACK_IMPORTED_MODULE_4__xmlhttprequest_js__["a" /* default */](opts));
        try {
            xhr.open(this.method, this.uri, this.async);
            try {
                if (this.opts.extraHeaders) {
                    xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
                    for (let i in this.opts.extraHeaders) {
                        if (this.opts.extraHeaders.hasOwnProperty(i)) {
                            xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
                        }
                    }
                }
            }
            catch (e) { }
            if ("POST" === this.method) {
                try {
                    xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
                }
                catch (e) { }
            }
            try {
                xhr.setRequestHeader("Accept", "*/*");
            }
            catch (e) { }
            // ie6 check
            if ("withCredentials" in xhr) {
                xhr.withCredentials = this.opts.withCredentials;
            }
            if (this.opts.requestTimeout) {
                xhr.timeout = this.opts.requestTimeout;
            }
            xhr.onreadystatechange = () => {
                if (4 !== xhr.readyState)
                    return;
                if (200 === xhr.status || 1223 === xhr.status) {
                    this.onLoad();
                }
                else {
                    // make sure the `error` event handler that's user-set
                    // does not throw in the same tick and gets caught here
                    this.setTimeoutFn(() => {
                        this.onError(typeof xhr.status === "number" ? xhr.status : 0);
                    }, 0);
                }
            };
            xhr.send(this.data);
        }
        catch (e) {
            // Need to defer since .create() is called directly from the constructor
            // and thus the 'error' event can only be only bound *after* this exception
            // occurs.  Therefore, also, we cannot throw here at all.
            this.setTimeoutFn(() => {
                this.onError(e);
            }, 0);
            return;
        }
        if (typeof document !== "undefined") {
            this.index = Request.requestsCount++;
            Request.requests[this.index] = this;
        }
    }
    /**
     * Called upon error.
     *
     * @api private
     */
    onError(err) {
        this.emitReserved("error", err, this.xhr);
        this.cleanup(true);
    }
    /**
     * Cleans up house.
     *
     * @api private
     */
    cleanup(fromError) {
        if ("undefined" === typeof this.xhr || null === this.xhr) {
            return;
        }
        this.xhr.onreadystatechange = empty;
        if (fromError) {
            try {
                this.xhr.abort();
            }
            catch (e) { }
        }
        if (typeof document !== "undefined") {
            delete Request.requests[this.index];
        }
        this.xhr = null;
    }
    /**
     * Called upon load.
     *
     * @api private
     */
    onLoad() {
        const data = this.xhr.responseText;
        if (data !== null) {
            this.emitReserved("data", data);
            this.emitReserved("success");
            this.cleanup();
        }
    }
    /**
     * Aborts the request.
     *
     * @api public
     */
    abort() {
        this.cleanup();
    }
}
/* unused harmony export Request */

Request.requestsCount = 0;
Request.requests = {};
/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */
if (typeof document !== "undefined") {
    // @ts-ignore
    if (typeof attachEvent === "function") {
        // @ts-ignore
        attachEvent("onunload", unloadHandler);
    }
    else if (typeof addEventListener === "function") {
        const terminationEvent = "onpagehide" in __WEBPACK_IMPORTED_MODULE_7__globalThis_js__["a" /* default */] ? "pagehide" : "unload";
        addEventListener(terminationEvent, unloadHandler, false);
    }
}
function unloadHandler() {
    for (let i in Request.requests) {
        if (Request.requests.hasOwnProperty(i)) {
            Request.requests[i].abort();
        }
    }
}


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commons_js__ = __webpack_require__(10);

const withNativeBlob = typeof Blob === "function" ||
    (typeof Blob !== "undefined" &&
        Object.prototype.toString.call(Blob) === "[object BlobConstructor]");
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
// ArrayBuffer.isView method is not defined in IE10
const isView = obj => {
    return typeof ArrayBuffer.isView === "function"
        ? ArrayBuffer.isView(obj)
        : obj && obj.buffer instanceof ArrayBuffer;
};
const encodePacket = ({ type, data }, supportsBinary, callback) => {
    if (withNativeBlob && data instanceof Blob) {
        if (supportsBinary) {
            return callback(data);
        }
        else {
            return encodeBlobAsBase64(data, callback);
        }
    }
    else if (withNativeArrayBuffer &&
        (data instanceof ArrayBuffer || isView(data))) {
        if (supportsBinary) {
            return callback(data);
        }
        else {
            return encodeBlobAsBase64(new Blob([data]), callback);
        }
    }
    // plain string
    return callback(__WEBPACK_IMPORTED_MODULE_0__commons_js__["b" /* PACKET_TYPES */][type] + (data || ""));
};
const encodeBlobAsBase64 = (data, callback) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
        const content = fileReader.result.split(",")[1];
        callback("b" + content);
    };
    return fileReader.readAsDataURL(data);
};
/* harmony default export */ __webpack_exports__["a"] = (encodePacket);


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commons_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contrib_base64_arraybuffer_js__ = __webpack_require__(26);


const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const decodePacket = (encodedPacket, binaryType) => {
    if (typeof encodedPacket !== "string") {
        return {
            type: "message",
            data: mapBinary(encodedPacket, binaryType)
        };
    }
    const type = encodedPacket.charAt(0);
    if (type === "b") {
        return {
            type: "message",
            data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
        };
    }
    const packetType = __WEBPACK_IMPORTED_MODULE_0__commons_js__["c" /* PACKET_TYPES_REVERSE */][type];
    if (!packetType) {
        return __WEBPACK_IMPORTED_MODULE_0__commons_js__["a" /* ERROR_PACKET */];
    }
    return encodedPacket.length > 1
        ? {
            type: __WEBPACK_IMPORTED_MODULE_0__commons_js__["c" /* PACKET_TYPES_REVERSE */][type],
            data: encodedPacket.substring(1)
        }
        : {
            type: __WEBPACK_IMPORTED_MODULE_0__commons_js__["c" /* PACKET_TYPES_REVERSE */][type]
        };
};
const decodeBase64Packet = (data, binaryType) => {
    if (withNativeArrayBuffer) {
        const decoded = Object(__WEBPACK_IMPORTED_MODULE_1__contrib_base64_arraybuffer_js__["a" /* decode */])(data);
        return mapBinary(decoded, binaryType);
    }
    else {
        return { base64: true, data }; // fallback for old browsers
    }
};
const mapBinary = (data, binaryType) => {
    switch (binaryType) {
        case "blob":
            return data instanceof ArrayBuffer ? new Blob([data]) : data;
        case "arraybuffer":
        default:
            return data; // assuming the data is already an ArrayBuffer
    }
};
/* harmony default export */ __webpack_exports__["a"] = (decodePacket);


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// Use a lookup table to find the index.
const lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (let i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
}
const encode = (arraybuffer) => {
    let bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = '';
    for (i = 0; i < len; i += 3) {
        base64 += chars[bytes[i] >> 2];
        base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
        base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
        base64 += chars[bytes[i + 2] & 63];
    }
    if (len % 3 === 2) {
        base64 = base64.substring(0, base64.length - 1) + '=';
    }
    else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + '==';
    }
    return base64;
};
/* unused harmony export encode */

const decode = (base64) => {
    let bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') {
            bufferLength--;
        }
    }
    const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
    for (i = 0; i < len; i += 4) {
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];
        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }
    return arraybuffer;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = decode;



/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__contrib_has_cors_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__globalThis_js__ = __webpack_require__(3);
// browser shim for xmlhttprequest module


/* harmony default export */ __webpack_exports__["a"] = (function (opts) {
    const xdomain = opts.xdomain;
    // XMLHttpRequest can be disabled on IE
    try {
        if ("undefined" !== typeof XMLHttpRequest && (!xdomain || __WEBPACK_IMPORTED_MODULE_0__contrib_has_cors_js__["a" /* hasCORS */])) {
            return new XMLHttpRequest();
        }
    }
    catch (e) { }
    if (!xdomain) {
        try {
            return new __WEBPACK_IMPORTED_MODULE_1__globalThis_js__["a" /* default */][["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
        }
        catch (e) { }
    }
});


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// imported from https://github.com/component/has-cors
let value = false;
try {
    value = typeof XMLHttpRequest !== 'undefined' &&
        'withCredentials' in new XMLHttpRequest();
}
catch (err) {
    // if XMLHttp support is disabled in IE then it will throw
    // when trying to create
}
const hasCORS = value;
/* harmony export (immutable) */ __webpack_exports__["a"] = hasCORS;



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transport_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contrib_parseqs_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contrib_yeast_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__websocket_constructor_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_engine_io_parser__ = __webpack_require__(2);






// detect ReactNative environment
const isReactNative = typeof navigator !== "undefined" &&
    typeof navigator.product === "string" &&
    navigator.product.toLowerCase() === "reactnative";
class WS extends __WEBPACK_IMPORTED_MODULE_0__transport_js__["a" /* Transport */] {
    /**
     * WebSocket transport constructor.
     *
     * @api {Object} connection options
     * @api public
     */
    constructor(opts) {
        super(opts);
        this.supportsBinary = !opts.forceBase64;
    }
    /**
     * Transport name.
     *
     * @api public
     */
    get name() {
        return "websocket";
    }
    /**
     * Opens socket.
     *
     * @api private
     */
    doOpen() {
        if (!this.check()) {
            // let probe timeout
            return;
        }
        const uri = this.uri();
        const protocols = this.opts.protocols;
        // React Native only supports the 'headers' option, and will print a warning if anything else is passed
        const opts = isReactNative
            ? {}
            : Object(__WEBPACK_IMPORTED_MODULE_3__util_js__["c" /* pick */])(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
        if (this.opts.extraHeaders) {
            opts.headers = this.opts.extraHeaders;
        }
        try {
            this.ws =
                __WEBPACK_IMPORTED_MODULE_4__websocket_constructor_js__["d" /* usingBrowserWebSocket */] && !isReactNative
                    ? protocols
                        ? new __WEBPACK_IMPORTED_MODULE_4__websocket_constructor_js__["a" /* WebSocket */](uri, protocols)
                        : new __WEBPACK_IMPORTED_MODULE_4__websocket_constructor_js__["a" /* WebSocket */](uri)
                    : new __WEBPACK_IMPORTED_MODULE_4__websocket_constructor_js__["a" /* WebSocket */](uri, protocols, opts);
        }
        catch (err) {
            return this.emitReserved("error", err);
        }
        this.ws.binaryType = this.socket.binaryType || __WEBPACK_IMPORTED_MODULE_4__websocket_constructor_js__["b" /* defaultBinaryType */];
        this.addEventListeners();
    }
    /**
     * Adds event listeners to the socket
     *
     * @api private
     */
    addEventListeners() {
        this.ws.onopen = () => {
            if (this.opts.autoUnref) {
                this.ws._socket.unref();
            }
            this.onOpen();
        };
        this.ws.onclose = closeEvent => this.onClose({
            description: "websocket connection closed",
            context: closeEvent
        });
        this.ws.onmessage = ev => this.onData(ev.data);
        this.ws.onerror = e => this.onError("websocket error", e);
    }
    /**
     * Writes data to socket.
     *
     * @param {Array} array of packets.
     * @api private
     */
    write(packets) {
        this.writable = false;
        // encodePacket efficient as it uses WS framing
        // no need for encodePayload
        for (let i = 0; i < packets.length; i++) {
            const packet = packets[i];
            const lastPacket = i === packets.length - 1;
            Object(__WEBPACK_IMPORTED_MODULE_5_engine_io_parser__["c" /* encodePacket */])(packet, this.supportsBinary, data => {
                // always create a new object (GH-437)
                const opts = {};
                if (!__WEBPACK_IMPORTED_MODULE_4__websocket_constructor_js__["d" /* usingBrowserWebSocket */]) {
                    if (packet.options) {
                        opts.compress = packet.options.compress;
                    }
                    if (this.opts.perMessageDeflate) {
                        const len = 
                        // @ts-ignore
                        "string" === typeof data ? Buffer.byteLength(data) : data.length;
                        if (len < this.opts.perMessageDeflate.threshold) {
                            opts.compress = false;
                        }
                    }
                }
                // Sometimes the websocket has already been closed but the browser didn't
                // have a chance of informing us about it yet, in that case send will
                // throw an error
                try {
                    if (__WEBPACK_IMPORTED_MODULE_4__websocket_constructor_js__["d" /* usingBrowserWebSocket */]) {
                        // TypeError is thrown when passing the second argument on Safari
                        this.ws.send(data);
                    }
                    else {
                        this.ws.send(data, opts);
                    }
                }
                catch (e) {
                }
                if (lastPacket) {
                    // fake drain
                    // defer to next tick to allow Socket to clear writeBuffer
                    Object(__WEBPACK_IMPORTED_MODULE_4__websocket_constructor_js__["c" /* nextTick */])(() => {
                        this.writable = true;
                        this.emitReserved("drain");
                    }, this.setTimeoutFn);
                }
            });
        }
    }
    /**
     * Closes socket.
     *
     * @api private
     */
    doClose() {
        if (typeof this.ws !== "undefined") {
            this.ws.close();
            this.ws = null;
        }
    }
    /**
     * Generates uri for connection.
     *
     * @api private
     */
    uri() {
        let query = this.query || {};
        const schema = this.opts.secure ? "wss" : "ws";
        let port = "";
        // avoid port if default for schema
        if (this.opts.port &&
            (("wss" === schema && Number(this.opts.port) !== 443) ||
                ("ws" === schema && Number(this.opts.port) !== 80))) {
            port = ":" + this.opts.port;
        }
        // append timestamp to URI
        if (this.opts.timestampRequests) {
            query[this.opts.timestampParam] = Object(__WEBPACK_IMPORTED_MODULE_2__contrib_yeast_js__["a" /* yeast */])();
        }
        // communicate binary support capabilities
        if (!this.supportsBinary) {
            query.b64 = 1;
        }
        const encodedQuery = Object(__WEBPACK_IMPORTED_MODULE_1__contrib_parseqs_js__["b" /* encode */])(query);
        const ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return (schema +
            "://" +
            (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
            port +
            this.opts.path +
            (encodedQuery.length ? "?" + encodedQuery : ""));
    }
    /**
     * Feature detection for WebSocket.
     *
     * @return {Boolean} whether this transport is available.
     * @api public
     */
    check() {
        return (!!__WEBPACK_IMPORTED_MODULE_4__websocket_constructor_js__["a" /* WebSocket */] &&
            !("__initialize" in __WEBPACK_IMPORTED_MODULE_4__websocket_constructor_js__["a" /* WebSocket */] && this.name === WS.prototype.name));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WS;


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(30).Buffer))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(32)
var ieee754 = __webpack_require__(33)
var isArray = __webpack_require__(34)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ }),
/* 31 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),
/* 33 */
/***/ (function(module, exports) {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 34 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__globalThis_js__ = __webpack_require__(3);

const nextTick = (() => {
    const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
    if (isPromiseAvailable) {
        return cb => Promise.resolve().then(cb);
    }
    else {
        return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
    }
})();
/* harmony export (immutable) */ __webpack_exports__["c"] = nextTick;

const WebSocket = __WEBPACK_IMPORTED_MODULE_0__globalThis_js__["a" /* default */].WebSocket || __WEBPACK_IMPORTED_MODULE_0__globalThis_js__["a" /* default */].MozWebSocket;
/* harmony export (immutable) */ __webpack_exports__["a"] = WebSocket;

const usingBrowserWebSocket = true;
/* harmony export (immutable) */ __webpack_exports__["d"] = usingBrowserWebSocket;

const defaultBinaryType = "arraybuffer";
/* harmony export (immutable) */ __webpack_exports__["b"] = defaultBinaryType;



/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_engine_io_client__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__socket_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_parser__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__on_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__contrib_backo2_js__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__socket_io_component_emitter__ = __webpack_require__(0);






class Manager extends __WEBPACK_IMPORTED_MODULE_5__socket_io_component_emitter__["a" /* Emitter */] {
    constructor(uri, opts) {
        var _a;
        super();
        this.nsps = {};
        this.subs = [];
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = undefined;
        }
        opts = opts || {};
        opts.path = opts.path || "/socket.io";
        this.opts = opts;
        Object(__WEBPACK_IMPORTED_MODULE_0_engine_io_client__["b" /* installTimerFunctions */])(this, opts);
        this.reconnection(opts.reconnection !== false);
        this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
        this.reconnectionDelay(opts.reconnectionDelay || 1000);
        this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
        this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
        this.backoff = new __WEBPACK_IMPORTED_MODULE_4__contrib_backo2_js__["a" /* Backoff */]({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor(),
        });
        this.timeout(null == opts.timeout ? 20000 : opts.timeout);
        this._readyState = "closed";
        this.uri = uri;
        const _parser = opts.parser || __WEBPACK_IMPORTED_MODULE_2_socket_io_parser__;
        this.encoder = new _parser.Encoder();
        this.decoder = new _parser.Decoder();
        this._autoConnect = opts.autoConnect !== false;
        if (this._autoConnect)
            this.open();
    }
    reconnection(v) {
        if (!arguments.length)
            return this._reconnection;
        this._reconnection = !!v;
        return this;
    }
    reconnectionAttempts(v) {
        if (v === undefined)
            return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
    }
    reconnectionDelay(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelay;
        this._reconnectionDelay = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
        return this;
    }
    randomizationFactor(v) {
        var _a;
        if (v === undefined)
            return this._randomizationFactor;
        this._randomizationFactor = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
        return this;
    }
    reconnectionDelayMax(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
        return this;
    }
    timeout(v) {
        if (!arguments.length)
            return this._timeout;
        this._timeout = v;
        return this;
    }
    /**
     * Starts trying to reconnect if reconnection is enabled and we have not
     * started reconnecting yet
     *
     * @private
     */
    maybeReconnectOnOpen() {
        // Only try to reconnect if it's the first time we're connecting
        if (!this._reconnecting &&
            this._reconnection &&
            this.backoff.attempts === 0) {
            // keeps reconnection from firing twice for the same reconnection loop
            this.reconnect();
        }
    }
    /**
     * Sets the current transport `socket`.
     *
     * @param {Function} fn - optional, callback
     * @return self
     * @public
     */
    open(fn) {
        if (~this._readyState.indexOf("open"))
            return this;
        this.engine = new __WEBPACK_IMPORTED_MODULE_0_engine_io_client__["a" /* Socket */](this.uri, this.opts);
        const socket = this.engine;
        const self = this;
        this._readyState = "opening";
        this.skipReconnect = false;
        // emit `open`
        const openSubDestroy = Object(__WEBPACK_IMPORTED_MODULE_3__on_js__["a" /* on */])(socket, "open", function () {
            self.onopen();
            fn && fn();
        });
        // emit `error`
        const errorSub = Object(__WEBPACK_IMPORTED_MODULE_3__on_js__["a" /* on */])(socket, "error", (err) => {
            self.cleanup();
            self._readyState = "closed";
            this.emitReserved("error", err);
            if (fn) {
                fn(err);
            }
            else {
                // Only do this if there is no fn to handle the error
                self.maybeReconnectOnOpen();
            }
        });
        if (false !== this._timeout) {
            const timeout = this._timeout;
            if (timeout === 0) {
                openSubDestroy(); // prevents a race condition with the 'open' event
            }
            // set timer
            const timer = this.setTimeoutFn(() => {
                openSubDestroy();
                socket.close();
                // @ts-ignore
                socket.emit("error", new Error("timeout"));
            }, timeout);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(function subDestroy() {
                clearTimeout(timer);
            });
        }
        this.subs.push(openSubDestroy);
        this.subs.push(errorSub);
        return this;
    }
    /**
     * Alias for open()
     *
     * @return self
     * @public
     */
    connect(fn) {
        return this.open(fn);
    }
    /**
     * Called upon transport open.
     *
     * @private
     */
    onopen() {
        // clear old subs
        this.cleanup();
        // mark as open
        this._readyState = "open";
        this.emitReserved("open");
        // add new subs
        const socket = this.engine;
        this.subs.push(Object(__WEBPACK_IMPORTED_MODULE_3__on_js__["a" /* on */])(socket, "ping", this.onping.bind(this)), Object(__WEBPACK_IMPORTED_MODULE_3__on_js__["a" /* on */])(socket, "data", this.ondata.bind(this)), Object(__WEBPACK_IMPORTED_MODULE_3__on_js__["a" /* on */])(socket, "error", this.onerror.bind(this)), Object(__WEBPACK_IMPORTED_MODULE_3__on_js__["a" /* on */])(socket, "close", this.onclose.bind(this)), Object(__WEBPACK_IMPORTED_MODULE_3__on_js__["a" /* on */])(this.decoder, "decoded", this.ondecoded.bind(this)));
    }
    /**
     * Called upon a ping.
     *
     * @private
     */
    onping() {
        this.emitReserved("ping");
    }
    /**
     * Called with data.
     *
     * @private
     */
    ondata(data) {
        this.decoder.add(data);
    }
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */
    ondecoded(packet) {
        this.emitReserved("packet", packet);
    }
    /**
     * Called upon socket error.
     *
     * @private
     */
    onerror(err) {
        this.emitReserved("error", err);
    }
    /**
     * Creates a new socket for the given `nsp`.
     *
     * @return {Socket}
     * @public
     */
    socket(nsp, opts) {
        let socket = this.nsps[nsp];
        if (!socket) {
            socket = new __WEBPACK_IMPORTED_MODULE_1__socket_js__["a" /* Socket */](this, nsp, opts);
            this.nsps[nsp] = socket;
        }
        return socket;
    }
    /**
     * Called upon a socket close.
     *
     * @param socket
     * @private
     */
    _destroy(socket) {
        const nsps = Object.keys(this.nsps);
        for (const nsp of nsps) {
            const socket = this.nsps[nsp];
            if (socket.active) {
                return;
            }
        }
        this._close();
    }
    /**
     * Writes a packet.
     *
     * @param packet
     * @private
     */
    _packet(packet) {
        const encodedPackets = this.encoder.encode(packet);
        for (let i = 0; i < encodedPackets.length; i++) {
            this.engine.write(encodedPackets[i], packet.options);
        }
    }
    /**
     * Clean up transport subscriptions and packet buffer.
     *
     * @private
     */
    cleanup() {
        this.subs.forEach((subDestroy) => subDestroy());
        this.subs.length = 0;
        this.decoder.destroy();
    }
    /**
     * Close the current socket.
     *
     * @private
     */
    _close() {
        this.skipReconnect = true;
        this._reconnecting = false;
        this.onclose("forced close");
        if (this.engine)
            this.engine.close();
    }
    /**
     * Alias for close()
     *
     * @private
     */
    disconnect() {
        return this._close();
    }
    /**
     * Called upon engine close.
     *
     * @private
     */
    onclose(reason, description) {
        this.cleanup();
        this.backoff.reset();
        this._readyState = "closed";
        this.emitReserved("close", reason, description);
        if (this._reconnection && !this.skipReconnect) {
            this.reconnect();
        }
    }
    /**
     * Attempt a reconnection.
     *
     * @private
     */
    reconnect() {
        if (this._reconnecting || this.skipReconnect)
            return this;
        const self = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) {
            this.backoff.reset();
            this.emitReserved("reconnect_failed");
            this._reconnecting = false;
        }
        else {
            const delay = this.backoff.duration();
            this._reconnecting = true;
            const timer = this.setTimeoutFn(() => {
                if (self.skipReconnect)
                    return;
                this.emitReserved("reconnect_attempt", self.backoff.attempts);
                // check again for the case socket closed in above events
                if (self.skipReconnect)
                    return;
                self.open((err) => {
                    if (err) {
                        self._reconnecting = false;
                        self.reconnect();
                        this.emitReserved("reconnect_error", err);
                    }
                    else {
                        self.onreconnect();
                    }
                });
            }, delay);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(function subDestroy() {
                clearTimeout(timer);
            });
        }
    }
    /**
     * Called upon successful reconnect.
     *
     * @private
     */
    onreconnect() {
        const attempt = this.backoff.attempts;
        this._reconnecting = false;
        this.backoff.reset();
        this.emitReserved("reconnect", attempt);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Manager;



/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = deconstructPacket;
/* harmony export (immutable) */ __webpack_exports__["b"] = reconstructPacket;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__is_binary_js__ = __webpack_require__(14);

/**
 * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @public
 */
function deconstructPacket(packet) {
    const buffers = [];
    const packetData = packet.data;
    const pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length; // number of binary 'attachments'
    return { packet: pack, buffers: buffers };
}
function _deconstructPacket(data, buffers) {
    if (!data)
        return data;
    if (Object(__WEBPACK_IMPORTED_MODULE_0__is_binary_js__["b" /* isBinary */])(data)) {
        const placeholder = { _placeholder: true, num: buffers.length };
        buffers.push(data);
        return placeholder;
    }
    else if (Array.isArray(data)) {
        const newData = new Array(data.length);
        for (let i = 0; i < data.length; i++) {
            newData[i] = _deconstructPacket(data[i], buffers);
        }
        return newData;
    }
    else if (typeof data === "object" && !(data instanceof Date)) {
        const newData = {};
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                newData[key] = _deconstructPacket(data[key], buffers);
            }
        }
        return newData;
    }
    return data;
}
/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @public
 */
function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    packet.attachments = undefined; // no longer useful
    return packet;
}
function _reconstructPacket(data, buffers) {
    if (!data)
        return data;
    if (data && data._placeholder) {
        return buffers[data.num]; // appropriate buffer (should be natural order anyway)
    }
    else if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            data[i] = _reconstructPacket(data[i], buffers);
        }
    }
    else if (typeof data === "object") {
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                data[key] = _reconstructPacket(data[key], buffers);
            }
        }
    }
    return data;
}


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Backoff;
/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */
function Backoff(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 10000;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
}
/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */
Backoff.prototype.duration = function () {
    var ms = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
        var rand = Math.random();
        var deviation = Math.floor(rand * this.jitter * ms);
        ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
    }
    return Math.min(ms, this.max) | 0;
};
/**
 * Reset the number of attempts.
 *
 * @api public
 */
Backoff.prototype.reset = function () {
    this.attempts = 0;
};
/**
 * Set the minimum duration
 *
 * @api public
 */
Backoff.prototype.setMin = function (min) {
    this.ms = min;
};
/**
 * Set the maximum duration
 *
 * @api public
 */
Backoff.prototype.setMax = function (max) {
    this.max = max;
};
/**
 * Set the jitter
 *
 * @api public
 */
Backoff.prototype.setJitter = function (jitter) {
    this.jitter = jitter;
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addClassDiagramPalette = __webpack_require__(40);

/**
 * Copyright (c) 2006-2012, JGraph Ltd
 */
/**
 * Construcs a new sidebar for the given editor.
 */
function Sidebar(editorUi, container) {
  this.editorUi = editorUi;
  this.container = container;
  this.palettes = new Object();
  this.taglist = new Object();
  this.showTooltips = true;
  this.graph = editorUi.createTemporaryGraph(this.editorUi.editor.graph.getStylesheet());
  this.graph.cellRenderer.antiAlias = false;
  this.graph.foldingEnabled = false;

  // Workaround for blank output in IE11-
  if (!mxClient.IS_IE && !mxClient.IS_IE11) {
    this.graph.container.style.display = 'none';
  }

  document.body.appendChild(this.graph.container);

  this.pointerUpHandler = mxUtils.bind(this, function () {
    this.showTooltips = true;
  });

  mxEvent.addListener(document, mxClient.IS_POINTER ? 'pointerup' : 'mouseup', this.pointerUpHandler);

  this.pointerDownHandler = mxUtils.bind(this, function () {
    this.showTooltips = false;
    this.hideTooltip();
  });

  mxEvent.addListener(document, mxClient.IS_POINTER ? 'pointerdown' : 'mousedown', this.pointerDownHandler);

  this.pointerMoveHandler = mxUtils.bind(this, function (evt) {
    var src = mxEvent.getSource(evt);

    while (src != null) {
      if (src == this.currentElt) {
        return;
      }

      src = src.parentNode;
    }

    this.hideTooltip();
  });

  mxEvent.addListener(document, mxClient.IS_POINTER ? 'pointermove' : 'mousemove', this.pointerMoveHandler);

  // Handles mouse leaving the window
  this.pointerOutHandler = mxUtils.bind(this, function (evt) {
    if (evt.toElement == null && evt.relatedTarget == null) {
      this.hideTooltip();
    }
  });

  mxEvent.addListener(document, mxClient.IS_POINTER ? 'pointerout' : 'mouseout', this.pointerOutHandler);

  // Enables tooltips after scroll
  mxEvent.addListener(container, 'scroll', mxUtils.bind(this, function () {
    this.showTooltips = true;
  }));

  this.init();

  // Pre-fetches tooltip image
  if (!mxClient.IS_SVG) {
    new Image().src = IMAGE_PATH + '/tooltip.png';
  }
}

/**
 * Adds all palettes to the sidebar.
 */
Sidebar.prototype.init = function () {

  var dir = STENCIL_PATH;
  addClassDiagramPalette(this, true);
};

/**
 * Sets the default font size.
 */
Sidebar.prototype.collapsedImage = !mxClient.IS_SVG ? IMAGE_PATH + '/collapsed.gif' : 'data:image/gif;base64,R0lGODlhDQANAIABAJmZmf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozNUQyRTJFNjZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozNUQyRTJFNzZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFERjc3MEUxNkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFERjc3MEUyNkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAQAsAAAAAA0ADQAAAhSMj6lrwAjcC1GyahV+dcZJgeIIFgA7';

/**
 * Sets the default font size.
 */
Sidebar.prototype.expandedImage = !mxClient.IS_SVG ? IMAGE_PATH + '/expanded.gif' : 'data:image/gif;base64,R0lGODlhDQANAIABAJmZmf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxREY3NzBERjZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxREY3NzBFMDZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFERjc3MERENkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFERjc3MERFNkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAQAsAAAAAA0ADQAAAhGMj6nL3QAjVHIu6azbvPtWAAA7';

/**
 * Sets the default font size.
 */
Sidebar.prototype.tooltipImage = !mxClient.IS_SVG ? IMAGE_PATH + '/tooltip.png' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAbCAMAAAB7jU7LAAAACVBMVEX///+ZmZn///9Y2COLAAAAA3RSTlP//wDXyg1BAAAAOElEQVR42mXQMQ4AMAgDsWv//+iutcJmIQSk+9dJpVKpVCqVSqVSqZTdncWzF8/NeP7FkxWenPEDOnUBiL3jWx0AAAAASUVORK5CYII=';

/**
 *
 */
Sidebar.prototype.searchImage = !mxClient.IS_SVG ? IMAGE_PATH + '/search.png' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAEaSURBVHjabNGxS5VxFIfxz71XaWuQUJCG/gCHhgTD9VpEETg4aMOlQRp0EoezObgcd220KQiXmpretTAHQRBdojlQEJyukPdt+b1ywfvAGc7wnHP4nlZd1yKijQW8xzNc4Su+ZOYfQ3T6/f4YNvEJYzjELXp4VVXVz263+7cR2niBxAFeZ2YPi3iHR/gYERPDwhpOsd6sz8x/mfkNG3iOlWFhFj8y89J9KvzGXER0GuEaD42mgwHqUtoljbcRsTBCeINpfM/MgZLKPpaxFxGbOCqDXmILN7hoJrTKH+axhxmcYRxP0MIDnOBDZv5q1XUNIuJxifJp+UNV7t7BFM6xeic0RMQ4Bpl5W/ol7GISx/eEUUTECrbx+f8A8xhiZht9zsgAAAAASUVORK5CYII=';

/**
 * Specifies if tooltips should be visible. Default is true.
 */
Sidebar.prototype.enableTooltips = true;

/**
 * Specifies the delay for the tooltip. Default is 16 px.
 */
Sidebar.prototype.tooltipBorder = 16;

/**
 * Specifies the delay for the tooltip. Default is 300 ms.
 */
Sidebar.prototype.tooltipDelay = 300;

/**
 * Specifies the delay for the drop target icons. Default is 200 ms.
 */
Sidebar.prototype.dropTargetDelay = 200;

/**
 * Specifies the URL of the gear image.
 */
Sidebar.prototype.gearImage = STENCIL_PATH + '/clipart/Gear_128x128.png';

/**
 * Specifies the width of the thumbnails.
 */
Sidebar.prototype.thumbWidth = 36;

/**
 * Specifies the height of the thumbnails.
 */
Sidebar.prototype.thumbHeight = 36;

/**
 * Specifies the padding for the thumbnails. Default is 3.
 */
Sidebar.prototype.thumbPadding = document.documentMode >= 5 ? 0 : 1;

/**
 * Specifies the delay for the tooltip. Default is 2 px.
 */
Sidebar.prototype.thumbBorder = 2;

/**
 * Specifies the size of the sidebar titles.
 */
Sidebar.prototype.sidebarTitleSize = 9;

/**
 * Specifies if titles in the sidebar should be enabled.
 */
Sidebar.prototype.sidebarTitles = false;

/**
 * Specifies if titles in the tooltips should be enabled.
 */
Sidebar.prototype.tooltipTitles = true;

/**
 * Specifies if titles in the tooltips should be enabled.
 */
Sidebar.prototype.maxTooltipWidth = 400;

/**
 * Specifies if titles in the tooltips should be enabled.
 */
Sidebar.prototype.maxTooltipHeight = 400;

/**
 * Specifies if stencil files should be loaded and added to the search index
 * when stencil palettes are added. If this is false then the stencil files
 * are lazy-loaded when the palette is shown.
 */
Sidebar.prototype.addStencilsToIndex = true;

/**
 * Specifies the width for clipart images. Default is 80.
 */
Sidebar.prototype.defaultImageWidth = 80;

/**
 * Specifies the height for clipart images. Default is 80.
 */
Sidebar.prototype.defaultImageHeight = 80;

/**
 * Adds all palettes to the sidebar.
 */
Sidebar.prototype.showTooltip = function (elt, cells, w, h, title, showLabel) {
  if (this.enableTooltips && this.showTooltips) {
    if (this.currentElt != elt) {
      if (this.thread != null) {
        window.clearTimeout(this.thread);
        this.thread = null;
      }

      var show = mxUtils.bind(this, function () {
        // Lazy creation of the DOM nodes and graph instance
        if (this.tooltip == null) {
          this.tooltip = document.createElement('div');
          this.tooltip.className = 'geSidebarTooltip';
          this.tooltip.style.zIndex = mxPopupMenu.prototype.zIndex - 1;
          document.body.appendChild(this.tooltip);

          this.graph2 = new Graph(this.tooltip, null, null, this.editorUi.editor.graph.getStylesheet());
          this.graph2.resetViewOnRootChange = false;
          this.graph2.foldingEnabled = false;
          this.graph2.gridEnabled = false;
          this.graph2.autoScroll = false;
          this.graph2.setTooltips(false);
          this.graph2.setConnectable(false);
          this.graph2.setEnabled(false);

          if (!mxClient.IS_SVG) {
            this.graph2.view.canvas.style.position = 'relative';
          }

          this.tooltipImage = mxUtils.createImage(this.tooltipImage);
          this.tooltipImage.className = 'geSidebarTooltipImage';
          this.tooltipImage.style.zIndex = mxPopupMenu.prototype.zIndex - 1;
          this.tooltipImage.style.position = 'absolute';
          this.tooltipImage.style.width = '14px';
          this.tooltipImage.style.height = '27px';

          document.body.appendChild(this.tooltipImage);
        }

        this.graph2.model.clear();
        this.graph2.view.setTranslate(this.tooltipBorder, this.tooltipBorder);

        if (w > this.maxTooltipWidth || h > this.maxTooltipHeight) {
          this.graph2.view.scale = Math.round(Math.min(this.maxTooltipWidth / w, this.maxTooltipHeight / h) * 100) / 100;
        } else {
          this.graph2.view.scale = 1;
        }

        this.tooltip.style.display = 'block';
        this.graph2.labelsVisible = showLabel == null || showLabel;
        this.graph2.addCells(cells);

        var bounds = this.graph2.getGraphBounds();
        var width = bounds.width + 2 * this.tooltipBorder + 4;
        var height = bounds.height + 2 * this.tooltipBorder;

        if (mxClient.IS_QUIRKS) {
          height += 4;
          this.tooltip.style.overflow = 'hidden';
        } else {
          this.tooltip.style.overflow = 'visible';
        }

        this.tooltipImage.style.visibility = 'visible';
        this.tooltip.style.width = width + 'px';

        // Adds title for entry
        if (this.tooltipTitles && title != null && title.length > 0) {
          if (this.tooltipTitle == null) {
            this.tooltipTitle = document.createElement('div');
            this.tooltipTitle.style.borderTop = '1px solid gray';
            this.tooltipTitle.style.textAlign = 'center';
            this.tooltipTitle.style.width = '100%';

            // Oversize titles are cut-off currently. Should make tooltip wider later.
            this.tooltipTitle.style.overflow = 'hidden';

            if (mxClient.IS_SVG) {
              this.tooltipTitle.style.paddingTop = '6px';
            } else {
              this.tooltipTitle.style.position = 'absolute';
              this.tooltipTitle.style.paddingTop = '6px';
            }

            this.tooltip.appendChild(this.tooltipTitle);
          } else {
            this.tooltipTitle.innerHTML = '';
          }

          this.tooltipTitle.style.display = '';
          mxUtils.write(this.tooltipTitle, title);

          var ddy = this.tooltipTitle.offsetHeight + 10;
          height += ddy;

          if (mxClient.IS_SVG) {
            this.tooltipTitle.style.marginTop = 2 - ddy + 'px';
          } else {
            height -= 6;
            this.tooltipTitle.style.top = height - ddy + 'px';
          }
        } else if (this.tooltipTitle != null && this.tooltipTitle.parentNode != null) {
          this.tooltipTitle.style.display = 'none';
        }

        this.tooltip.style.height = height + 'px';
        var x0 = -Math.round(bounds.x - this.tooltipBorder);
        var y0 = -Math.round(bounds.y - this.tooltipBorder);

        var b = document.body;
        var d = document.documentElement;
        var bottom = Math.max(b.clientHeight || 0, d.clientHeight);

        var left = this.container.clientWidth + this.editorUi.splitSize + 3 + this.editorUi.container.offsetLeft;
        var top = Math.min(bottom - height - 20 /* status bar */, Math.max(0, this.editorUi.container.offsetTop + this.container.offsetTop + elt.offsetTop - this.container.scrollTop - height / 2 + 16));

        if (mxClient.IS_SVG) {
          if (x0 != 0 || y0 != 0) {
            this.graph2.view.canvas.setAttribute('transform', 'translate(' + x0 + ',' + y0 + ')');
          } else {
            this.graph2.view.canvas.removeAttribute('transform');
          }
        } else {
          this.graph2.view.drawPane.style.left = x0 + 'px';
          this.graph2.view.drawPane.style.top = y0 + 'px';
        }

        // Workaround for ignored position CSS style in IE9
        // (changes to relative without the following line)
        this.tooltip.style.position = 'absolute';
        this.tooltip.style.left = left + 'px';
        this.tooltip.style.top = top + 'px';
        this.tooltipImage.style.left = left - 13 + 'px';
        this.tooltipImage.style.top = top + height / 2 - 13 + 'px';
      });

      if (this.tooltip != null && this.tooltip.style.display != 'none') {
        show();
      } else {
        this.thread = window.setTimeout(show, this.tooltipDelay);
      }

      this.currentElt = elt;
    }
  }
};

/**
 * Hides the current tooltip.
 */
Sidebar.prototype.hideTooltip = function () {
  if (this.thread != null) {
    window.clearTimeout(this.thread);
    this.thread = null;
  }

  if (this.tooltip != null) {
    this.tooltip.style.display = 'none';
    this.tooltipImage.style.visibility = 'hidden';
    this.currentElt = null;
  }
};

/**
 * Hides the current tooltip.
 */
Sidebar.prototype.addEntry = function (tags, fn) {
  if (this.taglist != null && tags != null && tags.length > 0) {
    // Replaces special characters
    var tmp = tags.toLowerCase().replace(/[\/\,\(\)]/g, ' ').split(' ');

    var doAddEntry = mxUtils.bind(this, function (tag) {
      if (tag.length > 1) {
        var entry = this.taglist[tag];

        if (entry == null) {
          entry = { entries: [], dict: new mxDictionary() };
          this.taglist[tag] = entry;
        }

        // Ignores duplicates
        if (entry.dict.get(fn) == null) {
          entry.dict.put(fn, fn);
          entry.entries.push(fn);
        }
      }
    });

    for (var i = 0; i < tmp.length; i++) {
      doAddEntry(tmp[i]);

      // Adds additional entry with removed trailing numbers
      var normalized = tmp[i].replace(/\.*\d*$/, '');

      if (normalized != tmp[i]) {
        doAddEntry(normalized);
      }
    }
  }

  return fn;
};

/**
 * Adds shape search UI.
 */
Sidebar.prototype.searchEntries = function (searchTerms, count, page, success, error) {
  if (this.taglist != null && searchTerms != null) {
    var tmp = searchTerms.toLowerCase().split(' ');
    var dict = new mxDictionary();
    var max = (page + 1) * count;
    var results = [];
    var index = 0;

    for (var i = 0; i < tmp.length; i++) {
      if (tmp[i].length > 0) {
        var entry = this.taglist[tmp[i]];
        var tmpDict = new mxDictionary();

        if (entry != null) {
          var arr = entry.entries;
          results = [];

          for (var j = 0; j < arr.length; j++) {
            var entry = arr[j];

            // NOTE Array does not contain duplicates
            if (index == 0 == (dict.get(entry) == null)) {
              tmpDict.put(entry, entry);
              results.push(entry);

              if (i == tmp.length - 1 && results.length == max) {
                success(results.slice(page * count, max), max, true, tmp);

                return;
              }
            }
          }
        } else {
          results = [];
        }

        dict = tmpDict;
        index++;
      }
    }

    var len = results.length;
    success(results.slice(page * count, (page + 1) * count), len, false, tmp);
  } else {
    success([], null, null, tmp);
  }
};

/**
 * Adds shape search UI.
 */
Sidebar.prototype.filterTags = function (tags) {
  if (tags != null) {
    var arr = tags.split(' ');
    var result = [];
    var hash = {};

    // Ignores tags with leading numbers, strips trailing numbers
    for (var i = 0; i < arr.length; i++) {
      // Removes duplicates
      if (hash[arr[i]] == null) {
        hash[arr[i]] = '1';
        result.push(arr[i]);
      }
    }

    return result.join(' ');
  }

  return null;
};

/**
 * Adds the general palette to the sidebar.
 */
Sidebar.prototype.cloneCell = function (cell, value) {
  var clone = cell.clone();

  if (value != null) {
    clone.value = value;
  }

  return clone;
};

/**
 * Adds shape search UI.
 */
Sidebar.prototype.addSearchPalette = function (expand) {
  var elt = document.createElement('div');
  elt.style.visibility = 'hidden';
  this.container.appendChild(elt);

  var div = document.createElement('div');
  div.className = 'geSidebar';
  div.style.boxSizing = 'border-box';
  div.style.overflow = 'hidden';
  div.style.width = '100%';
  div.style.padding = '8px';
  div.style.paddingTop = '14px';
  div.style.paddingBottom = '0px';

  if (!expand) {
    div.style.display = 'none';
  }

  var inner = document.createElement('div');
  inner.style.whiteSpace = 'nowrap';
  inner.style.textOverflow = 'clip';
  inner.style.paddingBottom = '8px';
  inner.style.cursor = 'default';

  var input = document.createElement('input');
  input.setAttribute('placeholder', mxResources.get('searchShapes'));
  input.setAttribute('type', 'text');
  input.style.fontSize = '12px';
  input.style.overflow = 'hidden';
  input.style.boxSizing = 'border-box';
  input.style.border = 'solid 1px #d5d5d5';
  input.style.borderRadius = '4px';
  input.style.width = '100%';
  input.style.outline = 'none';
  input.style.padding = '6px';
  inner.appendChild(input);

  var cross = document.createElement('img');
  cross.setAttribute('src', Sidebar.prototype.searchImage);
  cross.setAttribute('title', mxResources.get('search'));
  cross.style.position = 'relative';
  cross.style.left = '-18px';

  if (mxClient.IS_QUIRKS) {
    input.style.height = '28px';
    cross.style.top = '-4px';
  } else {
    cross.style.top = '1px';
  }

  // Needed to block event transparency in IE
  cross.style.background = 'url(\'' + this.editorUi.editor.transparentImage + '\')';

  var find;

  inner.appendChild(cross);
  div.appendChild(inner);

  var center = document.createElement('center');
  var button = mxUtils.button(mxResources.get('moreResults'), function () {
    find();
  });
  button.style.display = 'none';

  // Workaround for inherited line-height in quirks mode
  button.style.lineHeight = 'normal';
  button.style.marginTop = '4px';
  button.style.marginBottom = '8px';
  center.style.paddingTop = '4px';
  center.style.paddingBottom = '8px';

  center.appendChild(button);
  div.appendChild(center);

  var searchTerm = '';
  var active = false;
  var complete = false;
  var page = 0;
  var hash = new Object();

  // Count is dynamically updated below
  var count = 12;

  var clearDiv = mxUtils.bind(this, function () {
    active = false;
    this.currentSearch = null;
    var child = div.firstChild;

    while (child != null) {
      var next = child.nextSibling;

      if (child != inner && child != center) {
        child.parentNode.removeChild(child);
      }

      child = next;
    }
  });

  mxEvent.addListener(cross, 'click', function () {
    if (cross.getAttribute('src') == Dialog.prototype.closeImage) {
      cross.setAttribute('src', Sidebar.prototype.searchImage);
      cross.setAttribute('title', mxResources.get('search'));
      button.style.display = 'none';
      input.value = '';
      searchTerm = '';
      clearDiv();
    }

    input.focus();
  });

  find = mxUtils.bind(this, function () {
    // Shows 4 rows (minimum 4 results)
    count = 4 * Math.max(1, Math.floor(this.container.clientWidth / (this.thumbWidth + 10)));
    this.hideTooltip();

    if (input.value != '') {
      if (center.parentNode != null) {
        if (searchTerm != input.value) {
          clearDiv();
          searchTerm = input.value;
          hash = new Object();
          complete = false;
          page = 0;
        }

        if (!active && !complete) {
          button.setAttribute('disabled', 'true');
          button.style.display = '';
          button.style.cursor = 'wait';
          button.innerHTML = mxResources.get('loading') + '...';
          active = true;

          // Ignores old results
          var current = new Object();
          this.currentSearch = current;

          this.searchEntries(searchTerm, count, page, mxUtils.bind(this, function (results, len, more, terms) {
            if (this.currentSearch == current) {
              results = results != null ? results : [];
              active = false;
              page++;
              center.parentNode.removeChild(center);
              this.insertSearchHint(div, searchTerm, count, page, results, len, more, terms);

              for (var i = 0; i < results.length; i++) {
                var elt = results[i]();

                // Avoids duplicates in results
                if (hash[elt.innerHTML] == null) {
                  hash[elt.innerHTML] = '1';
                  div.appendChild(results[i]());
                }
              }

              if (more) {
                button.removeAttribute('disabled');
                button.innerHTML = mxResources.get('moreResults');
              } else {
                button.innerHTML = mxResources.get('reset');
                button.style.display = 'none';
                complete = true;
              }

              button.style.cursor = '';
              div.appendChild(center);
            }
          }), mxUtils.bind(this, function () {
            // TODO: Error handling
            button.style.cursor = '';
          }));
        }
      }
    } else {
      clearDiv();
      input.value = '';
      searchTerm = '';
      hash = new Object();
      button.style.display = 'none';
      complete = false;
      input.focus();
    }
  });

  mxEvent.addListener(input, 'keydown', mxUtils.bind(this, function (evt) {
    if (evt.keyCode == 13 /* Enter */) {
        find();
      }
  }));

  mxEvent.addListener(input, 'focus', function () {
    input.style.paddingRight = '';
  });

  mxEvent.addListener(input, 'blur', function () {
    input.style.paddingRight = '20px';
  });

  input.style.paddingRight = '20px';

  mxEvent.addListener(input, 'keyup', mxUtils.bind(this, function (evt) {
    if (input.value == '') {
      cross.setAttribute('src', Sidebar.prototype.searchImage);
      cross.setAttribute('title', mxResources.get('search'));
    } else {
      cross.setAttribute('src', Dialog.prototype.closeImage);
      cross.setAttribute('title', mxResources.get('reset'));
    }

    if (input.value == '') {
      complete = true;
      button.style.display = 'none';
    } else if (input.value != searchTerm) {
      button.style.display = 'none';
      complete = false;
    } else if (!active) {
      if (complete) {
        button.style.display = 'none';
      } else {
        button.style.display = '';
      }
    }
  }));

  // Workaround for blocked text selection in Editor
  mxEvent.addListener(input, 'mousedown', function (evt) {
    if (evt.stopPropagation) {
      evt.stopPropagation();
    }

    evt.cancelBubble = true;
  });

  // Workaround for blocked text selection in Editor
  mxEvent.addListener(input, 'selectstart', function (evt) {
    if (evt.stopPropagation) {
      evt.stopPropagation();
    }

    evt.cancelBubble = true;
  });

  var outer = document.createElement('div');
  outer.appendChild(div);
  this.container.appendChild(outer);

  // Keeps references to the DOM nodes
  this.palettes.search = [elt, outer];
};

/**
 * Adds the general palette to the sidebar.
 */
Sidebar.prototype.insertSearchHint = function (div, searchTerm, count, page, results, len, more, terms) {
  if (results.length == 0 && page == 1) {
    var err = document.createElement('div');
    err.className = 'geTitle';
    err.style.cssText = 'background-color:transparent;border-color:transparent;' + 'color:gray;padding:6px 0px 0px 0px !important;margin:4px 8px 4px 8px;' + 'text-align:center;cursor:default !important';

    mxUtils.write(err, mxResources.get('noResultsFor', [searchTerm]));
    div.appendChild(err);
  }
};

/**
 * Creates and returns the given title element.
 */
Sidebar.prototype.createTitle = function (label) {
  var elt = document.createElement('a');
  elt.setAttribute('href', 'javascript:void(0);');
  elt.setAttribute('title', mxResources.get('sidebarTooltip'));
  elt.className = 'geTitle';
  mxUtils.write(elt, label);

  return elt;
};

/**
 * Creates a thumbnail for the given cells.
 */
Sidebar.prototype.createThumb = function (cells, width, height, parent, title, showLabel, showTitle, realWidth, realHeight) {
  this.graph.labelsVisible = showLabel == null || showLabel;
  var fo = mxClient.NO_FO;
  mxClient.NO_FO = Editor.prototype.originalNoForeignObject;
  this.graph.view.scaleAndTranslate(1, 0, 0);
  this.graph.addCells(cells);
  var bounds = this.graph.getGraphBounds();
  var s = Math.floor(Math.min((width - 2 * this.thumbBorder) / bounds.width, (height - 2 * this.thumbBorder) / bounds.height) * 100) / 100;
  this.graph.view.scaleAndTranslate(s, Math.floor((width - bounds.width * s) / 2 / s - bounds.x), Math.floor((height - bounds.height * s) / 2 / s - bounds.y));

  var node = null;

  // For supporting HTML labels in IE9 standards mode the container is cloned instead
  if (this.graph.dialect == mxConstants.DIALECT_SVG && !mxClient.NO_FO) {
    node = this.graph.view.getCanvas().ownerSVGElement.cloneNode(true);
  }
  // LATER: Check if deep clone can be used for quirks if container in DOM
  else {
      node = this.graph.container.cloneNode(false);
      node.innerHTML = this.graph.container.innerHTML;
    }

  this.graph.getModel().clear();
  mxClient.NO_FO = fo;

  // Catch-all event handling
  if (mxClient.IS_IE6) {
    parent.style.backgroundImage = 'url(' + this.editorUi.editor.transparentImage + ')';
  }

  node.style.position = 'relative';
  node.style.overflow = 'hidden';
  node.style.cursor = 'move';
  node.style.left = this.thumbBorder + 'px';
  node.style.top = this.thumbBorder + 'px';
  node.style.width = width + 'px';
  node.style.height = height + 'px';
  node.style.visibility = '';
  node.style.minWidth = '';
  node.style.minHeight = '';

  parent.appendChild(node);

  // Adds title for sidebar entries
  if (this.sidebarTitles && title != null && showTitle != false) {
    var border = mxClient.IS_QUIRKS ? 2 * this.thumbPadding + 2 : 0;
    parent.style.height = this.thumbHeight + border + this.sidebarTitleSize + 8 + 'px';

    var div = document.createElement('div');
    div.style.fontSize = this.sidebarTitleSize + 'px';
    div.style.color = '#303030';
    div.style.textAlign = 'center';
    div.style.whiteSpace = 'nowrap';

    if (mxClient.IS_IE) {
      div.style.height = this.sidebarTitleSize + 12 + 'px';
    }

    div.style.paddingTop = '4px';
    mxUtils.write(div, title);
    parent.appendChild(div);
  }

  return bounds;
};

/**
 * Creates and returns a new palette item for the given image.
 */
Sidebar.prototype.createItem = function (cells, title, showLabel, showTitle, width, height, allowCellsInserted) {
  var elt = document.createElement('a');
  elt.setAttribute('href', 'javascript:void(0);');
  elt.className = 'geItem';
  elt.style.overflow = 'hidden';
  var border = mxClient.IS_QUIRKS ? 8 + 2 * this.thumbPadding : 2 * this.thumbBorder;
  elt.style.width = this.thumbWidth + border + 'px';
  elt.style.height = this.thumbHeight + border + 'px';
  elt.style.padding = this.thumbPadding + 'px';

  if (mxClient.IS_IE6) {
    elt.style.border = 'none';
  }

  // Blocks default click action
  mxEvent.addListener(elt, 'click', function (evt) {

    mxEvent.consume(evt);
  });

  this.createThumb(cells, this.thumbWidth, this.thumbHeight, elt, title, showLabel, showTitle, width, height);
  var bounds = new mxRectangle(0, 0, width, height);

  if (cells.length > 1 || cells[0].vertex) {
    var ds = this.createDragSource(elt, this.createDropHandler(cells, true, allowCellsInserted, bounds), this.createDragPreview(width, height), cells, bounds);
    this.addClickHandler(elt, ds, cells);

    // Uses guides for vertices only if enabled in graph
    ds.isGuidesEnabled = mxUtils.bind(this, function () {
      return this.editorUi.editor.graph.graphHandler.guidesEnabled;
    });
  } else if (cells[0] != null && cells[0].edge) {
    var ds = this.createDragSource(elt, this.createDropHandler(cells, false, allowCellsInserted, bounds), this.createDragPreview(width, height), cells, bounds);
    this.addClickHandler(elt, ds, cells);
  }

  // Shows a tooltip with the rendered cell
  if (!mxClient.IS_IOS) {
    mxEvent.addGestureListeners(elt, null, mxUtils.bind(this, function (evt) {
      if (mxEvent.isMouseEvent(evt)) {
        this.showTooltip(elt, cells, bounds.width, bounds.height, title, showLabel);
      }
    }));
  }

  return elt;
};

/**
 * Creates a drop handler for inserting the given cells.
 */
Sidebar.prototype.updateShapes = function (source, targets) {
  var graph = this.editorUi.editor.graph;
  var sourceCellStyle = graph.getCellStyle(source);
  var result = [];

  graph.model.beginUpdate();
  try {
    var cellStyle = graph.getModel().getStyle(source);

    // Lists the styles to carry over from the existing shape
    var styles = ['shadow', 'dashed', 'dashPattern', 'fontFamily', 'fontSize', 'fontColor', 'align', 'startFill', 'startSize', 'endFill', 'endSize', 'strokeColor', 'strokeWidth', 'fillColor', 'gradientColor', 'html', 'part', 'noEdgeStyle', 'edgeStyle', 'elbow', 'childLayout'];

    for (var i = 0; i < targets.length; i++) {
      var targetCell = targets[i];

      if (graph.getModel().isVertex(targetCell) == graph.getModel().isVertex(source) || graph.getModel().isEdge(targetCell) == graph.getModel().isEdge(source)) {
        var state = graph.view.getState(targetCell);
        var style = state != null ? state.style : graph.getCellStyle(targets[i]);
        graph.getModel().setStyle(targetCell, cellStyle);

        // Removes all children of composite cells
        if (state != null && mxUtils.getValue(state.style, 'composite', '0') == '1') {
          var childCount = graph.model.getChildCount(targetCell);

          for (var j = childCount; j >= 0; j--) {
            graph.model.remove(graph.model.getChildAt(targetCell, j));
          }
        }

        if (style != null) {
          // Replaces the participant style in the lifeline shape with the target shape
          if (style[mxConstants.STYLE_SHAPE] == 'umlLifeline' && sourceCellStyle[mxConstants.STYLE_SHAPE] != 'umlLifeline') {
            graph.setCellStyles(mxConstants.STYLE_SHAPE, 'umlLifeline', [targetCell]);
            graph.setCellStyles('participant', sourceCellStyle[mxConstants.STYLE_SHAPE], [targetCell]);
          }

          for (var j = 0; j < styles.length; j++) {
            var value = style[styles[j]];

            if (value != null) {
              graph.setCellStyles(styles[j], value, [targetCell]);
            }
          }
        }

        result.push(targetCell);
      }
    }
  } finally {
    graph.model.endUpdate();
  }

  return result;
};

/**
 * Creates a drop handler for inserting the given cells.
 */
Sidebar.prototype.createDropHandler = function (cells, allowSplit, allowCellsInserted, bounds) {
  allowCellsInserted = allowCellsInserted != null ? allowCellsInserted : true;

  return mxUtils.bind(this, function (graph, evt, target, x, y) {
    if (graph.isEnabled()) {
      cells = graph.getImportableCells(cells);

      if (cells.length > 0) {
        graph.stopEditing();

        // Holding alt while mouse is released ignores drop target
        var validDropTarget = target != null && !mxEvent.isAltDown(evt) ? graph.isValidDropTarget(target, cells, evt) : false;
        var select = null;

        if (target != null && !validDropTarget) {
          target = null;
        }

        if (!graph.isCellLocked(target || graph.getDefaultParent())) {
          graph.model.beginUpdate();
          try {
            x = Math.round(x);
            y = Math.round(y);

            // Splits the target edge or inserts into target group
            if (allowSplit && graph.isSplitTarget(target, cells, evt)) {
              var clones = graph.cloneCells(cells);
              graph.splitEdge(target, clones, null, x - bounds.width / 2, y - bounds.height / 2);
              select = clones;
            } else if (cells.length > 0) {
              select = graph.importCells(cells, x, y, target);
            }

            // Executes parent layout hooks for position/order
            if (graph.layoutManager != null) {
              var layout = graph.layoutManager.getLayout(target);

              if (layout != null) {
                var s = graph.view.scale;
                var tr = graph.view.translate;
                var tx = (x + tr.x) * s;
                var ty = (y + tr.y) * s;

                for (var i = 0; i < select.length; i++) {
                  layout.moveCell(select[i], tx, ty);
                }
              }
            }

            if (allowCellsInserted) {
              graph.fireEvent(new mxEventObject('cellsInserted', 'cells', select));
            }
          } finally {
            graph.model.endUpdate();
          }

          if (select != null && select.length > 0) {
            graph.scrollCellToVisible(select[0]);
            graph.setSelectionCells(select);
          }
        }
      }

      mxEvent.consume(evt);
    }
  });
};

/**
 * Creates and returns a preview element for the given width and height.
 */
Sidebar.prototype.createDragPreview = function (width, height) {
  var elt = document.createElement('div');
  elt.style.border = '1px dashed black';
  elt.style.width = width + 'px';
  elt.style.height = height + 'px';

  return elt;
};

/**
 * Creates a drag source for the given element.
 */
Sidebar.prototype.dropAndConnect = function (source, targets, direction, dropCellIndex) {
  // TODO: DROP AND CONNECT.
  console.log('dropAndConnect...');
  var geo = this.getDropAndConnectGeometry(source, targets[dropCellIndex], direction, targets);

  if (geo != null) {
    var graph = this.editorUi.editor.graph;

    // Targets without the new edge for selection
    var tmp = [];

    graph.model.beginUpdate();
    try {
      var sourceGeo = graph.getCellGeometry(source);
      var geo2 = graph.getCellGeometry(targets[dropCellIndex]);

      // Handles special case where target should be ignored for stack layouts
      var targetParent = graph.model.getParent(source);
      var validLayout = true;

      // Ignores parent if it has a stack layout
      if (graph.layoutManager != null) {
        var layout = graph.layoutManager.getLayout(targetParent);

        // LATER: Use parent of parent if valid layout
        if (layout != null && layout.constructor == mxStackLayout) {
          validLayout = false;

          var tmp = graph.view.getState(targetParent);

          // Offsets by parent position
          if (tmp != null) {
            var offset = new mxPoint(tmp.x / graph.view.scale - graph.view.translate.x, tmp.y / graph.view.scale - graph.view.translate.y);
            geo.x += offset.x;
            geo.y += offset.y;
            var pt = geo.getTerminalPoint(false);

            if (pt != null) {
              pt.x += offset.x;
              pt.y += offset.y;
            }
          }
        }
      }

      var dx = geo2.x;
      var dy = geo2.y;

      // Ignores geometry of edges
      if (graph.model.isEdge(targets[dropCellIndex])) {
        dx = 0;
        dy = 0;
      }

      var useParent = graph.model.isEdge(source) || sourceGeo != null && !sourceGeo.relative && validLayout;
      targets = graph.importCells(targets, geo.x - (useParent ? dx : 0), geo.y - (useParent ? dy : 0), useParent ? targetParent : null);
      tmp = targets;

      if (graph.model.isEdge(source)) {
        // Adds new terminal to edge
        // LATER: Push new terminal out radially from edge start point
        graph.model.setTerminal(source, targets[dropCellIndex], direction == mxConstants.DIRECTION_NORTH);
      } else if (graph.model.isEdge(targets[dropCellIndex])) {
        // Adds new outgoing connection to vertex and clears points
        graph.model.setTerminal(targets[dropCellIndex], source, true);
        var geo3 = graph.getCellGeometry(targets[dropCellIndex]);
        geo3.points = null;

        if (geo3.getTerminalPoint(false) != null) {
          geo3.setTerminalPoint(geo.getTerminalPoint(false), false);
        } else if (useParent && graph.model.isVertex(targetParent)) {
          // Adds parent offset to other nodes
          var tmpState = graph.view.getState(targetParent);
          var offset = new mxPoint(tmpState.x / graph.view.scale - graph.view.translate.x, tmpState.y / graph.view.scale - graph.view.translate.y);
          graph.cellsMoved(targets, offset.x, offset.y, null, null, true);
        }
      } else {
        geo2 = graph.getCellGeometry(targets[dropCellIndex]);
        dx = geo.x - Math.round(geo2.x);
        dy = geo.y - Math.round(geo2.y);
        geo.x = Math.round(geo2.x);
        geo.y = Math.round(geo2.y);
        graph.model.setGeometry(targets[dropCellIndex], geo);
        graph.cellsMoved(targets, dx, dy, null, null, true);
        tmp = targets.slice();
        targets.push(graph.insertEdge(null, null, '', source, targets[dropCellIndex], graph.createCurrentEdgeStyle()));
      }

      graph.fireEvent(new mxEventObject('cellsInserted', 'cells', targets));
    } finally {
      graph.model.endUpdate();
    }

    graph.setSelectionCells(tmp);
  }
};

/**
 * Creates a drag source for the given element.
 */
Sidebar.prototype.getDropAndConnectGeometry = function (source, target, direction, targets) {
  var graph = this.editorUi.editor.graph;
  var view = graph.view;
  var keepSize = targets.length > 1;
  var geo = graph.getCellGeometry(source);
  var geo2 = graph.getCellGeometry(target);

  if (geo != null && geo2 != null) {
    geo2 = geo2.clone();

    if (graph.model.isEdge(source)) {
      var state = graph.view.getState(source);
      var pts = state.absolutePoints;
      var p0 = pts[0];
      var pe = pts[pts.length - 1];

      if (direction == mxConstants.DIRECTION_NORTH) {
        geo2.x = p0.x / view.scale - view.translate.x - geo2.width / 2;
        geo2.y = p0.y / view.scale - view.translate.y - geo2.height / 2;
      } else {
        geo2.x = pe.x / view.scale - view.translate.x - geo2.width / 2;
        geo2.y = pe.y / view.scale - view.translate.y - geo2.height / 2;
      }
    } else {
      if (geo.relative) {
        var state = graph.view.getState(source);
        geo = geo.clone();
        geo.x = (state.x - view.translate.x) / view.scale;
        geo.y = (state.y - view.translate.y) / view.scale;
      }

      var length = graph.defaultEdgeLength;

      // Maintains edge length
      if (graph.model.isEdge(target) && geo2.getTerminalPoint(true) != null && geo2.getTerminalPoint(false) != null) {
        var p0 = geo2.getTerminalPoint(true);
        var pe = geo2.getTerminalPoint(false);
        var dx = pe.x - p0.x;
        var dy = pe.y - p0.y;

        length = Math.sqrt(dx * dx + dy * dy);

        geo2.x = geo.getCenterX();
        geo2.y = geo.getCenterY();
        geo2.width = 1;
        geo2.height = 1;

        if (direction == mxConstants.DIRECTION_NORTH) {
          geo2.height = length;
          geo2.y = geo.y - length;
          geo2.setTerminalPoint(new mxPoint(geo2.x, geo2.y), false);
        } else if (direction == mxConstants.DIRECTION_EAST) {
          geo2.width = length;
          geo2.x = geo.x + geo.width;
          geo2.setTerminalPoint(new mxPoint(geo2.x + geo2.width, geo2.y), false);
        } else if (direction == mxConstants.DIRECTION_SOUTH) {
          geo2.height = length;
          geo2.y = geo.y + geo.height;
          geo2.setTerminalPoint(new mxPoint(geo2.x, geo2.y + geo2.height), false);
        } else if (direction == mxConstants.DIRECTION_WEST) {
          geo2.width = length;
          geo2.x = geo.x - length;
          geo2.setTerminalPoint(new mxPoint(geo2.x, geo2.y), false);
        }
      } else {
        // Try match size or ignore if width or height < 45 which
        // is considered special enough to be ignored here
        if (!keepSize && geo2.width > 45 && geo2.height > 45 && geo.width > 45 && geo.height > 45) {
          geo2.width *= geo.height / geo2.height;
          geo2.height = geo.height;
        }

        geo2.x = geo.x + geo.width / 2 - geo2.width / 2;
        geo2.y = geo.y + geo.height / 2 - geo2.height / 2;

        if (direction == mxConstants.DIRECTION_NORTH) {
          geo2.y = geo2.y - geo.height / 2 - geo2.height / 2 - length;
        } else if (direction == mxConstants.DIRECTION_EAST) {
          geo2.x = geo2.x + geo.width / 2 + geo2.width / 2 + length;
        } else if (direction == mxConstants.DIRECTION_SOUTH) {
          geo2.y = geo2.y + geo.height / 2 + geo2.height / 2 + length;
        } else if (direction == mxConstants.DIRECTION_WEST) {
          geo2.x = geo2.x - geo.width / 2 - geo2.width / 2 - length;
        }

        // Adds offset to match cells without connecting edge
        if (graph.model.isEdge(target) && geo2.getTerminalPoint(true) != null && target.getTerminal(false) != null) {
          var targetGeo = graph.getCellGeometry(target.getTerminal(false));

          if (targetGeo != null) {
            if (direction == mxConstants.DIRECTION_NORTH) {
              geo2.x -= targetGeo.getCenterX();
              geo2.y -= targetGeo.getCenterY() + targetGeo.height / 2;
            } else if (direction == mxConstants.DIRECTION_EAST) {
              geo2.x -= targetGeo.getCenterX() - targetGeo.width / 2;
              geo2.y -= targetGeo.getCenterY();
            } else if (direction == mxConstants.DIRECTION_SOUTH) {
              geo2.x -= targetGeo.getCenterX();
              geo2.y -= targetGeo.getCenterY() - targetGeo.height / 2;
            } else if (direction == mxConstants.DIRECTION_WEST) {
              geo2.x -= targetGeo.getCenterX() + targetGeo.width / 2;
              geo2.y -= targetGeo.getCenterY();
            }
          }
        }
      }
    }
  }

  return geo2;
};

/**
 * Creates a drag source for the given element.
 */
Sidebar.prototype.createDragSource = function (elt, dropHandler, preview, cells, bounds) {
  var _this = this;

  // Checks if the cells contain any vertices
  var ui = this.editorUi;
  var graph = ui.editor.graph;
  var freeSourceEdge = null;
  var firstVertex = null;
  var sidebar = this;

  for (var i = 0; i < cells.length; i++) {
    if (firstVertex == null && this.editorUi.editor.graph.model.isVertex(cells[i])) {
      firstVertex = i;
    } else if (freeSourceEdge == null && this.editorUi.editor.graph.model.isEdge(cells[i]) && this.editorUi.editor.graph.model.getTerminal(cells[i], true) == null) {
      freeSourceEdge = i;
    }

    if (firstVertex != null && freeSourceEdge != null) {
      break;
    }
  }

  var dragSource = mxUtils.makeDraggable(elt, this.editorUi.editor.graph, mxUtils.bind(this, function (graph, evt, target, x, y) {

    if (this.updateThread != null) {
      window.clearTimeout(this.updateThread);
    }

    if (cells != null && currentStyleTarget != null && activeArrow == styleTarget) {
      var tmp = graph.isCellSelected(currentStyleTarget.cell) ? graph.getSelectionCells() : [currentStyleTarget.cell];
      var updatedCells = this.updateShapes(graph.model.isEdge(currentStyleTarget.cell) ? cells[0] : cells[firstVertex], tmp);
      graph.setSelectionCells(updatedCells);
    } else if (cells != null && activeArrow != null && currentTargetState != null && activeArrow != styleTarget) {
      var index = graph.model.isEdge(currentTargetState.cell) || freeSourceEdge == null ? firstVertex : freeSourceEdge;
      this.dropAndConnect(currentTargetState.cell, cells, direction, index);
    } else {
      dropHandler.apply(this, arguments);
    }

    if (this.editorUi.hoverIcons != null) {
      this.editorUi.hoverIcons.update(graph.view.getState(graph.getSelectionCell()));
    }
  }), preview, 0, 0, this.editorUi.editor.graph.autoscroll, true, true);

  // Stops dragging if cancel is pressed
  this.editorUi.editor.graph.addListener(mxEvent.ESCAPE, function (sender, evt) {
    if (dragSource.isActive()) {
      dragSource.reset();
    }
  });

  // Overrides mouseDown to ignore popup triggers
  var mouseDown = dragSource.mouseDown;

  dragSource.mouseDown = function (evt) {
    if (!mxEvent.isPopupTrigger(evt) && !mxEvent.isMultiTouchEvent(evt)) {
      graph.stopEditing();
      mouseDown.apply(this, arguments);
    }
  };

  // Workaround for event redirection via image tag in quirks and IE8
  var createArrow = function createArrow(img, tooltip) {
    var arrow = null;

    if (mxClient.IS_IE && !mxClient.IS_SVG) {
      // Workaround for PNG images in IE6
      if (mxClient.IS_IE6 && document.compatMode != 'CSS1Compat') {
        arrow = document.createElement(mxClient.VML_PREFIX + ':image');
        arrow.setAttribute('src', img.src);
        arrow.style.borderStyle = 'none';
      } else {
        arrow = document.createElement('div');
        arrow.style.backgroundImage = 'url(' + img.src + ')';
        arrow.style.backgroundPosition = 'center';
        arrow.style.backgroundRepeat = 'no-repeat';
      }

      arrow.style.width = img.width + 4 + 'px';
      arrow.style.height = img.height + 4 + 'px';
      arrow.style.display = mxClient.IS_QUIRKS ? 'inline' : 'inline-block';
    } else {
      arrow = mxUtils.createImage(img.src);
      arrow.style.width = img.width + 'px';
      arrow.style.height = img.height + 'px';
    }

    if (tooltip != null) {
      arrow.setAttribute('title', tooltip);
    }

    mxUtils.setOpacity(arrow, img == _this.refreshTarget ? 30 : 20);
    arrow.style.position = 'absolute';
    arrow.style.cursor = 'crosshair';

    return arrow;
  };

  var currentTargetState = null;
  var currentStateHandle = null;
  var currentStyleTarget = null;
  var activeTarget = false;

  var arrowUp = createArrow(this.triangleUp, mxResources.get('connect'));
  var arrowRight = createArrow(this.triangleRight, mxResources.get('connect'));
  var arrowDown = createArrow(this.triangleDown, mxResources.get('connect'));
  var arrowLeft = createArrow(this.triangleLeft, mxResources.get('connect'));
  var styleTarget = createArrow(this.refreshTarget, mxResources.get('replace'));
  // Workaround for actual parentNode not being updated in old IE
  var styleTargetParent = null;
  var roundSource = createArrow(this.roundDrop);
  var roundTarget = createArrow(this.roundDrop);
  var direction = mxConstants.DIRECTION_NORTH;
  var activeArrow = null;

  function checkArrow(x, y, bounds, arrow) {
    if (arrow.parentNode != null) {
      if (mxUtils.contains(bounds, x, y)) {
        mxUtils.setOpacity(arrow, 100);
        activeArrow = arrow;
      } else {
        mxUtils.setOpacity(arrow, arrow == styleTarget ? 30 : 20);
      }
    }

    return bounds;
  }

  // Hides guides and preview if target is active
  var dsCreatePreviewElement = dragSource.createPreviewElement;

  // Stores initial size of preview element
  dragSource.createPreviewElement = function (graph) {
    var elt = dsCreatePreviewElement.apply(this, arguments);

    // Pass-through events required to tooltip on replace shape
    if (mxClient.IS_SVG) {
      elt.style.pointerEvents = 'none';
    }

    this.previewElementWidth = elt.style.width;
    this.previewElementHeight = elt.style.height;

    return elt;
  };

  // Shows/hides hover icons
  var dragEnter = dragSource.dragEnter;
  dragSource.dragEnter = function (graph, evt) {
    if (ui.hoverIcons != null) {
      ui.hoverIcons.setDisplay('none');
    }

    dragEnter.apply(this, arguments);
  };

  var dragExit = dragSource.dragExit;
  dragSource.dragExit = function (graph, evt) {
    if (ui.hoverIcons != null) {
      ui.hoverIcons.setDisplay('');
    }

    dragExit.apply(this, arguments);
  };

  dragSource.dragOver = function (graph, evt) {
    mxDragSource.prototype.dragOver.apply(this, arguments);

    if (this.currentGuide != null && activeArrow != null) {
      this.currentGuide.hide();
    }

    if (this.previewElement != null) {
      var view = graph.view;

      if (currentStyleTarget != null && activeArrow == styleTarget) {
        this.previewElement.style.display = graph.model.isEdge(currentStyleTarget.cell) ? 'none' : '';

        this.previewElement.style.left = currentStyleTarget.x + 'px';
        this.previewElement.style.top = currentStyleTarget.y + 'px';
        this.previewElement.style.width = currentStyleTarget.width + 'px';
        this.previewElement.style.height = currentStyleTarget.height + 'px';
      } else if (currentTargetState != null && activeArrow != null) {
        var index = graph.model.isEdge(currentTargetState.cell) || freeSourceEdge == null ? firstVertex : freeSourceEdge;
        var geo = sidebar.getDropAndConnectGeometry(currentTargetState.cell, cells[index], direction, cells);
        var geo2 = !graph.model.isEdge(currentTargetState.cell) ? graph.getCellGeometry(currentTargetState.cell) : null;
        var geo3 = graph.getCellGeometry(cells[index]);
        var parent = graph.model.getParent(currentTargetState.cell);
        var dx = view.translate.x * view.scale;
        var dy = view.translate.y * view.scale;

        if (geo2 != null && !geo2.relative && graph.model.isVertex(parent)) {
          var pState = view.getState(parent);
          dx = pState.x;
          dy = pState.y;
        }

        var dx2 = geo3.x;
        var dy2 = geo3.y;

        // Ignores geometry of edges
        if (graph.model.isEdge(cells[index])) {
          dx2 = 0;
          dy2 = 0;
        }

        // Shows preview at drop location
        this.previewElement.style.left = (geo.x - dx2) * view.scale + dx + 'px';
        this.previewElement.style.top = (geo.y - dy2) * view.scale + dy + 'px';

        if (cells.length == 1) {
          this.previewElement.style.width = geo.width * view.scale + 'px';
          this.previewElement.style.height = geo.height * view.scale + 'px';
        }

        this.previewElement.style.display = '';
      } else if (dragSource.currentHighlight.state != null && graph.model.isEdge(dragSource.currentHighlight.state.cell)) {
        // Centers drop cells when splitting edges
        this.previewElement.style.left = Math.round(parseInt(this.previewElement.style.left) - bounds.width * view.scale / 2) + 'px';
        this.previewElement.style.top = Math.round(parseInt(this.previewElement.style.top) - bounds.height * view.scale / 2) + 'px';
      } else {
        this.previewElement.style.width = this.previewElementWidth;
        this.previewElement.style.height = this.previewElementHeight;
        this.previewElement.style.display = '';
      }
    }
  };

  var startTime = new Date().getTime();
  var timeOnTarget = 0;
  var prev = null;

  // Gets source cell style to compare shape below
  var sourceCellStyle = this.editorUi.editor.graph.getCellStyle(cells[0]);

  // Allows drop into cell only if target is a valid root
  dragSource.getDropTarget = mxUtils.bind(this, function (graph, x, y, evt) {

    // Alt means no targets at all
    // LATER: Show preview where result will go
    var cell = !mxEvent.isAltDown(evt) && cells != null ? graph.getCellAt(x, y) : null;

    // Uses connectable parent vertex if one exists
    if (cell != null && !this.graph.isCellConnectable(cell)) {
      var parent = this.graph.getModel().getParent(cell);

      if (this.graph.getModel().isVertex(parent) && this.graph.isCellConnectable(parent)) {
        cell = parent;
      }
    }

    // Ignores locked cells
    if (graph.isCellLocked(cell)) {
      cell = null;
    }

    var state = graph.view.getState(cell);
    activeArrow = null;
    var bbox = null;

    // Time on target
    if (prev != state) {
      prev = state;
      startTime = new Date().getTime();
      timeOnTarget = 0;

      if (this.updateThread != null) {
        window.clearTimeout(this.updateThread);
      }

      if (state != null) {
        this.updateThread = window.setTimeout(function () {
          if (activeArrow == null) {
            prev = state;
            dragSource.getDropTarget(graph, x, y, evt);
          }
        }, this.dropTargetDelay + 10);
      }
    } else {
      timeOnTarget = new Date().getTime() - startTime;
    }

    // Shift means disabled, delayed on cells with children, shows after this.dropTargetDelay, hides after 2500ms
    if (timeOnTarget < 2500 && state != null && !mxEvent.isShiftDown(evt) && (
    // If shape is equal or target has no stroke then add long delay except for images
    mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE) != mxUtils.getValue(sourceCellStyle, mxConstants.STYLE_SHAPE) && mxUtils.getValue(state.style, mxConstants.STYLE_STROKECOLOR, mxConstants.NONE) != mxConstants.NONE || mxUtils.getValue(sourceCellStyle, mxConstants.STYLE_SHAPE) == 'image' || timeOnTarget > 1500 || graph.model.isEdge(state.cell)) && timeOnTarget > this.dropTargetDelay && (graph.model.isVertex(state.cell) && firstVertex != null || graph.model.isEdge(state.cell) && graph.model.isEdge(cells[0]))) {
      currentStyleTarget = state;
      var tmp = graph.model.isEdge(state.cell) ? graph.view.getPoint(state) : new mxPoint(state.getCenterX(), state.getCenterY());
      tmp = new mxRectangle(tmp.x - this.refreshTarget.width / 2, tmp.y - this.refreshTarget.height / 2, this.refreshTarget.width, this.refreshTarget.height);

      styleTarget.style.left = Math.floor(tmp.x) + 'px';
      styleTarget.style.top = Math.floor(tmp.y) + 'px';

      if (styleTargetParent == null) {
        graph.container.appendChild(styleTarget);
        styleTargetParent = styleTarget.parentNode;
      }

      checkArrow(x, y, tmp, styleTarget);
    }
    // Does not reset on ignored edges
    else if (currentStyleTarget == null || !mxUtils.contains(currentStyleTarget, x, y) || timeOnTarget > 1500 && !mxEvent.isShiftDown(evt)) {
        currentStyleTarget = null;

        if (styleTargetParent != null) {
          styleTarget.parentNode.removeChild(styleTarget);
          styleTargetParent = null;
        }
      } else if (currentStyleTarget != null && styleTargetParent != null) {
        // Sets active Arrow as side effect
        var tmp = graph.model.isEdge(currentStyleTarget.cell) ? graph.view.getPoint(currentStyleTarget) : new mxPoint(currentStyleTarget.getCenterX(), currentStyleTarget.getCenterY());
        tmp = new mxRectangle(tmp.x - this.refreshTarget.width / 2, tmp.y - this.refreshTarget.height / 2, this.refreshTarget.width, this.refreshTarget.height);
        checkArrow(x, y, tmp, styleTarget);
      }

    // Checks if inside bounds
    if (activeTarget && currentTargetState != null && !mxEvent.isAltDown(evt) && activeArrow == null) {
      // LATER: Use hit-detection for edges
      bbox = mxRectangle.fromRectangle(currentTargetState);

      if (graph.model.isEdge(currentTargetState.cell)) {
        var pts = currentTargetState.absolutePoints;

        if (roundSource.parentNode != null) {
          var p0 = pts[0];
          bbox.add(checkArrow(x, y, new mxRectangle(p0.x - this.roundDrop.width / 2, p0.y - this.roundDrop.height / 2, this.roundDrop.width, this.roundDrop.height), roundSource));
        }

        if (roundTarget.parentNode != null) {
          var pe = pts[pts.length - 1];
          bbox.add(checkArrow(x, y, new mxRectangle(pe.x - this.roundDrop.width / 2, pe.y - this.roundDrop.height / 2, this.roundDrop.width, this.roundDrop.height), roundTarget));
        }
      } else {
        var bds = mxRectangle.fromRectangle(currentTargetState);

        // Uses outer bounding box to take rotation into account
        if (currentTargetState.shape != null && currentTargetState.shape.boundingBox != null) {
          bds = mxRectangle.fromRectangle(currentTargetState.shape.boundingBox);
        }

        bds.grow(this.graph.tolerance);
        bds.grow(HoverIcons.prototype.arrowSpacing);

        var handler = this.graph.selectionCellsHandler.getHandler(currentTargetState.cell);

        if (handler != null) {
          bds.x -= handler.horizontalOffset / 2;
          bds.y -= handler.verticalOffset / 2;
          bds.width += handler.horizontalOffset;
          bds.height += handler.verticalOffset;

          // Adds bounding box of rotation handle to avoid overlap
          if (handler.rotationShape != null && handler.rotationShape.node != null && handler.rotationShape.node.style.visibility != 'hidden' && handler.rotationShape.node.style.display != 'none' && handler.rotationShape.boundingBox != null) {
            bds.add(handler.rotationShape.boundingBox);
          }
        }

        bbox.add(checkArrow(x, y, new mxRectangle(currentTargetState.getCenterX() - this.triangleUp.width / 2, bds.y - this.triangleUp.height, this.triangleUp.width, this.triangleUp.height), arrowUp));
        bbox.add(checkArrow(x, y, new mxRectangle(bds.x + bds.width, currentTargetState.getCenterY() - this.triangleRight.height / 2, this.triangleRight.width, this.triangleRight.height), arrowRight));
        bbox.add(checkArrow(x, y, new mxRectangle(currentTargetState.getCenterX() - this.triangleDown.width / 2, bds.y + bds.height, this.triangleDown.width, this.triangleDown.height), arrowDown));
        bbox.add(checkArrow(x, y, new mxRectangle(bds.x - this.triangleLeft.width, currentTargetState.getCenterY() - this.triangleLeft.height / 2, this.triangleLeft.width, this.triangleLeft.height), arrowLeft));
      }

      // Adds tolerance
      if (bbox != null) {
        bbox.grow(10);
      }
    }

    direction = mxConstants.DIRECTION_NORTH;

    if (activeArrow == arrowRight) {
      direction = mxConstants.DIRECTION_EAST;
    } else if (activeArrow == arrowDown || activeArrow == roundTarget) {
      direction = mxConstants.DIRECTION_SOUTH;
    } else if (activeArrow == arrowLeft) {
      direction = mxConstants.DIRECTION_WEST;
    }

    if (currentStyleTarget != null && activeArrow == styleTarget) {
      state = currentStyleTarget;
    }

    var validTarget = (firstVertex == null || graph.isCellConnectable(cells[firstVertex])) && (graph.model.isEdge(cell) && firstVertex != null || graph.model.isVertex(cell) && graph.isCellConnectable(cell));

    // Drop arrows shown after this.dropTargetDelay, hidden after 5 secs, switches arrows after 500ms
    if (currentTargetState != null && timeOnTarget >= 5000 || currentTargetState != state && (bbox == null || !mxUtils.contains(bbox, x, y) || timeOnTarget > 500 && activeArrow == null && validTarget)) {
      activeTarget = false;
      currentTargetState = timeOnTarget < 5000 && timeOnTarget > this.dropTargetDelay || graph.model.isEdge(cell) ? state : null;

      if (currentTargetState != null && validTarget) {
        var elts = [roundSource, roundTarget, arrowUp, arrowRight, arrowDown, arrowLeft];

        for (var i = 0; i < elts.length; i++) {
          if (elts[i].parentNode != null) {
            elts[i].parentNode.removeChild(elts[i]);
          }
        }

        if (graph.model.isEdge(cell)) {
          var pts = state.absolutePoints;

          if (pts != null) {
            var p0 = pts[0];
            var pe = pts[pts.length - 1];
            var tol = graph.tolerance;
            var box = new mxRectangle(x - tol, y - tol, 2 * tol, 2 * tol);

            roundSource.style.left = Math.floor(p0.x - this.roundDrop.width / 2) + 'px';
            roundSource.style.top = Math.floor(p0.y - this.roundDrop.height / 2) + 'px';

            roundTarget.style.left = Math.floor(pe.x - this.roundDrop.width / 2) + 'px';
            roundTarget.style.top = Math.floor(pe.y - this.roundDrop.height / 2) + 'px';

            if (graph.model.getTerminal(cell, true) == null) {
              graph.container.appendChild(roundSource);
            }

            if (graph.model.getTerminal(cell, false) == null) {
              graph.container.appendChild(roundTarget);
            }
          }
        } else {
          var bds = mxRectangle.fromRectangle(state);

          // Uses outer bounding box to take rotation into account
          if (state.shape != null && state.shape.boundingBox != null) {
            bds = mxRectangle.fromRectangle(state.shape.boundingBox);
          }

          bds.grow(this.graph.tolerance);
          bds.grow(HoverIcons.prototype.arrowSpacing);

          var handler = this.graph.selectionCellsHandler.getHandler(state.cell);

          if (handler != null) {
            bds.x -= handler.horizontalOffset / 2;
            bds.y -= handler.verticalOffset / 2;
            bds.width += handler.horizontalOffset;
            bds.height += handler.verticalOffset;

            // Adds bounding box of rotation handle to avoid overlap
            if (handler.rotationShape != null && handler.rotationShape.node != null && handler.rotationShape.node.style.visibility != 'hidden' && handler.rotationShape.node.style.display != 'none' && handler.rotationShape.boundingBox != null) {
              bds.add(handler.rotationShape.boundingBox);
            }
          }

          arrowUp.style.left = Math.floor(state.getCenterX() - this.triangleUp.width / 2) + 'px';
          arrowUp.style.top = Math.floor(bds.y - this.triangleUp.height) + 'px';

          arrowRight.style.left = Math.floor(bds.x + bds.width) + 'px';
          arrowRight.style.top = Math.floor(state.getCenterY() - this.triangleRight.height / 2) + 'px';

          arrowDown.style.left = arrowUp.style.left;
          arrowDown.style.top = Math.floor(bds.y + bds.height) + 'px';

          arrowLeft.style.left = Math.floor(bds.x - this.triangleLeft.width) + 'px';
          arrowLeft.style.top = arrowRight.style.top;

          if (state.style.portConstraint != 'eastwest') {
            graph.container.appendChild(arrowUp);
            graph.container.appendChild(arrowDown);
          }

          graph.container.appendChild(arrowRight);
          graph.container.appendChild(arrowLeft);
        }

        // Hides handle for cell under mouse
        if (state != null) {
          currentStateHandle = graph.selectionCellsHandler.getHandler(state.cell);

          if (currentStateHandle != null && currentStateHandle.setHandlesVisible != null) {
            currentStateHandle.setHandlesVisible(false);
          }
        }

        activeTarget = true;
      } else {
        var elts = [roundSource, roundTarget, arrowUp, arrowRight, arrowDown, arrowLeft];

        for (var i = 0; i < elts.length; i++) {
          if (elts[i].parentNode != null) {
            elts[i].parentNode.removeChild(elts[i]);
          }
        }
      }
    }

    if (!activeTarget && currentStateHandle != null) {
      currentStateHandle.setHandlesVisible(true);
    }

    // Handles drop target
    var target = (!mxEvent.isAltDown(evt) || mxEvent.isShiftDown(evt)) && !(currentStyleTarget != null && activeArrow == styleTarget) ? mxDragSource.prototype.getDropTarget.apply(this, arguments) : null;
    var model = graph.getModel();

    if (target != null) {
      if (activeArrow != null || !graph.isSplitTarget(target, cells, evt)) {
        // Selects parent group as drop target
        while (target != null && !graph.isValidDropTarget(target, cells, evt) && model.isVertex(model.getParent(target))) {
          target = model.getParent(target);
        }

        if (graph.view.currentRoot == target || !graph.isValidRoot(target) && graph.getModel().getChildCount(target) == 0 || graph.isCellLocked(target) || model.isEdge(target)) {
          target = null;
        }
      }
    }

    return target;
  });

  dragSource.stopDrag = function () {
    mxDragSource.prototype.stopDrag.apply(this, arguments);

    var elts = [roundSource, roundTarget, styleTarget, arrowUp, arrowRight, arrowDown, arrowLeft];

    for (var i = 0; i < elts.length; i++) {
      if (elts[i].parentNode != null) {
        elts[i].parentNode.removeChild(elts[i]);
      }
    }

    if (currentTargetState != null && currentStateHandle != null) {
      currentStateHandle.reset();
    }

    currentStateHandle = null;
    currentTargetState = null;
    currentStyleTarget = null;
    styleTargetParent = null;
    activeArrow = null;
  };

  return dragSource;
};

/**
 * Adds a handler for inserting the cell with a single click.
 */
Sidebar.prototype.itemClicked = function (cells, ds, evt, elt) {
  //console.log('itemClicked...');
  var graph = this.editorUi.editor.graph;

  // Alt+Click inserts and connects
  if (mxEvent.isAltDown(evt)) {
    //console.log('isAltDown...');
    if (graph.getSelectionCount() == 1 && graph.model.isVertex(graph.getSelectionCell())) {
      var firstVertex = null;

      for (var i = 0; i < cells.length && firstVertex == null; i++) {
        if (graph.model.isVertex(cells[i])) {
          firstVertex = i;
        }
      }

      if (firstVertex != null) {
        this.dropAndConnect(graph.getSelectionCell(), cells, mxEvent.isMetaDown(evt) || mxEvent.isControlDown(evt) ? mxEvent.isShiftDown(evt) ? mxConstants.DIRECTION_WEST : mxConstants.DIRECTION_NORTH : mxEvent.isShiftDown(evt) ? mxConstants.DIRECTION_EAST : mxConstants.DIRECTION_SOUTH, firstVertex);
        graph.scrollCellToVisible(graph.getSelectionCell());
      }
    }
  }
  // Shift+Click updates shape
  else if (mxEvent.isShiftDown(evt)) {
      if (!graph.isSelectionEmpty()) {
        this.updateShapes(cells[0], graph.getSelectionCells());
        graph.scrollCellToVisible(graph.getSelectionCell());
      }
    } else {
      var pt = graph.getFreeInsertPoint();
      ds.drop(graph, evt, null, pt.x, pt.y);

      if (this.editorUi.hoverIcons != null && mxEvent.isTouchEvent(evt)) {
        this.editorUi.hoverIcons.update(graph.view.getState(graph.getSelectionCell()));
      }
    }
};

/**
 * Adds a handler for inserting the cell with a single click.
 */
Sidebar.prototype.addClickHandler = function (elt, ds, cells) {

  var graph = this.editorUi.editor.graph;
  var oldMouseUp = ds.mouseUp;
  var first = null;

  mxEvent.addGestureListeners(elt, function (evt) {

    first = new mxPoint(mxEvent.getClientX(evt), mxEvent.getClientY(evt));
  });

  ds.mouseUp = mxUtils.bind(this, function (evt) {
    // TODO: cuando mantiene click el componente de la paleta de componentes
    //console.log('mouseUp...');
    if (!mxEvent.isPopupTrigger(evt) && this.currentGraph == null && first != null) {

      var tol = graph.tolerance;

      if (Math.abs(first.x - mxEvent.getClientX(evt)) <= tol && Math.abs(first.y - mxEvent.getClientY(evt)) <= tol) {
        this.itemClicked(cells, ds, evt, elt);
      }
    }

    oldMouseUp.apply(ds, arguments);
    first = null;

    // Blocks tooltips on this element after single click
    this.currentElt = elt;
  });
};

/**
 * Creates a drop handler for inserting the given cells.
 */
Sidebar.prototype.createVertexTemplateEntry = function (style, width, height, value, title, showLabel, showTitle, tags) {
  tags = tags != null && tags.length > 0 ? tags : title.toLowerCase();

  return this.addEntry(tags, mxUtils.bind(this, function () {
    return this.createVertexTemplate(style, width, height, value, title, showLabel, showTitle);
  }));
};

/**
 * Creates a drop handler for inserting the given cells.
 */
Sidebar.prototype.createVertexTemplate = function (style, width, height, value, title, showLabel, showTitle, allowCellsInserted) {
  var cells = [new mxCell(value != null ? value : '', new mxGeometry(0, 0, width, height), style)];
  cells[0].vertex = true;

  return this.createVertexTemplateFromCells(cells, width, height, title, showLabel, showTitle, allowCellsInserted);
};

/**
 * Creates a drop handler for inserting the given cells.
 */
Sidebar.prototype.createVertexTemplateFromCells = function (cells, width, height, title, showLabel, showTitle, allowCellsInserted) {
  return this.createItem(cells, title, showLabel, showTitle, width, height, allowCellsInserted);
};

/**
 *
 */
Sidebar.prototype.createEdgeTemplateEntry = function (style, width, height, value, title, showLabel, tags, allowCellsInserted) {
  tags = tags != null && tags.length > 0 ? tags : title.toLowerCase();

  return this.addEntry(tags, mxUtils.bind(this, function () {
    return this.createEdgeTemplate(style, width, height, value, title, showLabel, allowCellsInserted);
  }));
};

/**
 * Creates a drop handler for inserting the given cells.
 */
Sidebar.prototype.createEdgeTemplate = function (style, width, height, value, title, showLabel, allowCellsInserted) {
  var cell = new mxCell(value != null ? value : '', new mxGeometry(0, 0, width, height), style);
  cell.geometry.setTerminalPoint(new mxPoint(0, height), true);
  cell.geometry.setTerminalPoint(new mxPoint(width, 0), false);
  cell.geometry.relative = true;
  cell.edge = true;

  return this.createEdgeTemplateFromCells([cell], width, height, title, showLabel, allowCellsInserted);
};

/**
 * Creates a drop handler for inserting the given cells.
 */
Sidebar.prototype.createEdgeTemplateFromCells = function (cells, width, height, title, showLabel, allowCellsInserted) {
  return this.createItem(cells, title, showLabel, true, width, height, allowCellsInserted);
};

/**
 * Adds the given palette.
 */
Sidebar.prototype.addPaletteFunctions = function (id, title, expanded, fns) {
  this.addPalette(id, title, expanded, mxUtils.bind(this, function (content) {
    for (var i = 0; i < fns.length; i++) {
      content.appendChild(fns[i](content));
    }
  }));
};

/**
 * Adds the given palette.
 */
Sidebar.prototype.addPalette = function (id, title, expanded, onInit) {
  var elt = this.createTitle(title);
  this.container.appendChild(elt);

  var div = document.createElement('div');
  div.className = 'geSidebar';

  // Disables built-in pan and zoom in IE10 and later
  if (mxClient.IS_POINTER) {
    div.style.touchAction = 'none';
  }

  // Shows tooltip if mouse over background
  mxEvent.addListener(div, 'mousemove', mxUtils.bind(this, function (evt) {
    if (mxEvent.getSource(evt) == div) {
      div.setAttribute('title', mxResources.get('sidebarTooltip'));
    } else {
      div.removeAttribute('title');
    }
  }));

  if (expanded) {
    onInit(div);
    onInit = null;
  } else {
    div.style.display = 'none';
  }

  this.addFoldingHandler(elt, div, onInit);

  var outer = document.createElement('div');
  outer.appendChild(div);
  this.container.appendChild(outer);

  // Keeps references to the DOM nodes
  if (id != null) {
    this.palettes[id] = [elt, outer];
  }

  return div;
};

/**
 * Create the given title element.
 */
Sidebar.prototype.addFoldingHandler = function (title, content, funct) {
  var initialized = false;

  // Avoids mixed content warning in IE6-8
  if (!mxClient.IS_IE || document.documentMode >= 8) {
    title.style.backgroundImage = content.style.display == 'none' ? 'url(\'' + this.collapsedImage + '\')' : 'url(\'' + this.expandedImage + '\')';
  }

  title.style.backgroundRepeat = 'no-repeat';
  title.style.backgroundPosition = '0% 50%';

  mxEvent.addListener(title, 'click', mxUtils.bind(this, function (evt) {

    if (content.style.display == 'none') {
      if (!initialized) {
        initialized = true;

        if (funct != null) {
          // Wait cursor does not show up on Mac
          title.style.cursor = 'wait';
          var prev = title.innerHTML;
          title.innerHTML = mxResources.get('loading') + '...';

          window.setTimeout(function () {
            var fo = mxClient.NO_FO;
            mxClient.NO_FO = Editor.prototype.originalNoForeignObject;
            funct(content);
            mxClient.NO_FO = fo;
            content.style.display = 'block';
            title.style.cursor = '';
            title.innerHTML = prev;
          }, 0);
        } else {
          content.style.display = 'block';
        }
      } else {
        content.style.display = 'block';
      }

      title.style.backgroundImage = 'url(\'' + this.expandedImage + '\')';
    } else {
      title.style.backgroundImage = 'url(\'' + this.collapsedImage + '\')';
      content.style.display = 'none';
    }

    mxEvent.consume(evt);
  }));
};

/**
 * Removes the palette for the given ID.
 */
Sidebar.prototype.removePalette = function (id) {
  var elts = this.palettes[id];

  if (elts != null) {
    this.palettes[id] = null;

    for (var i = 0; i < elts.length; i++) {
      this.container.removeChild(elts[i]);
    }

    return true;
  }

  return false;
};

/**
 * Adds the given image palette.
 */
Sidebar.prototype.addImagePalette = function (id, title, prefix, postfix, items, titles, tags) {
  var showTitles = titles != null;
  var fns = [];

  for (var i = 0; i < items.length; i++) {
    mxUtils.bind(this, function (item, title, tmpTags) {
      if (tmpTags == null) {
        var slash = item.lastIndexOf('/');
        var dot = item.lastIndexOf('.');
        tmpTags = item.substring(slash >= 0 ? slash + 1 : 0, dot >= 0 ? dot : item.length).replace(/[-_]/g, ' ');
      }

      fns.push(this.createVertexTemplateEntry('image;html=1;labelBackgroundColor=#ffffff;image=' + prefix + item + postfix, this.defaultImageWidth, this.defaultImageHeight, '', title, title != null, null, this.filterTags(tmpTags)));
    })(items[i], titles != null ? titles[i] : null, tags != null ? tags[items[i]] : null);
  }

  this.addPaletteFunctions(id, title, false, fns);
};

/**
 * Creates the array of tags for the given stencil. Duplicates are allowed and will be filtered out later.
 */
Sidebar.prototype.getTagsForStencil = function (packageName, stencilName, moreTags) {
  var tags = packageName.split('.');

  for (var i = 1; i < tags.length; i++) {
    tags[i] = tags[i].replace(/_/g, ' ');
  }

  tags.push(stencilName.replace(/_/g, ' '));

  if (moreTags != null) {
    tags.push(moreTags);
  }

  return tags.slice(1, tags.length);
};

/**
 * Adds the given stencil palette.
 */
Sidebar.prototype.addStencilPalette = function (id, title, stencilFile, style, ignore, onInit, scale, tags, customFns) {
  scale = scale != null ? scale : 1;

  if (this.addStencilsToIndex) {
    // LATER: Handle asynchronous loading dependency
    var fns = [];

    if (customFns != null) {
      for (var i = 0; i < customFns.length; i++) {
        fns.push(customFns[i]);
      }
    }

    mxStencilRegistry.loadStencilSet(stencilFile, mxUtils.bind(this, function (packageName, stencilName, displayName, w, h) {
      if (ignore == null || mxUtils.indexOf(ignore, stencilName) < 0) {
        var tmp = this.getTagsForStencil(packageName, stencilName);
        var tmpTags = tags != null ? tags[stencilName] : null;

        if (tmpTags != null) {
          tmp.push(tmpTags);
        }

        fns.push(this.createVertexTemplateEntry('shape=' + packageName + stencilName.toLowerCase() + style, Math.round(w * scale), Math.round(h * scale), '', stencilName.replace(/_/g, ' '), null, null, this.filterTags(tmp.join(' '))));
      }
    }), true, true);

    this.addPaletteFunctions(id, title, false, fns);
  } else {
    this.addPalette(id, title, false, mxUtils.bind(this, function (content) {
      if (style == null) {
        style = '';
      }

      if (onInit != null) {
        onInit.call(this, content);
      }

      if (customFns != null) {
        for (var i = 0; i < customFns.length; i++) {
          customFns[i](content);
        }
      }

      mxStencilRegistry.loadStencilSet(stencilFile, mxUtils.bind(this, function (packageName, stencilName, displayName, w, h) {
        if (ignore == null || mxUtils.indexOf(ignore, stencilName) < 0) {
          content.appendChild(this.createVertexTemplate('shape=' + packageName + stencilName.toLowerCase() + style, Math.round(w * scale), Math.round(h * scale), '', stencilName.replace(/_/g, ' '), true));
        }
      }), true);
    }));
  }
};

/**
 * Adds the given stencil palette.
 */
Sidebar.prototype.destroy = function () {
  if (this.graph != null) {
    if (this.graph.container != null && this.graph.container.parentNode != null) {
      this.graph.container.parentNode.removeChild(this.graph.container);
    }

    this.graph.destroy();
    this.graph = null;
  }

  if (this.pointerUpHandler != null) {
    mxEvent.removeListener(document, mxClient.IS_POINTER ? 'pointerup' : 'mouseup', this.pointerUpHandler);
    this.pointerUpHandler = null;
  }

  if (this.pointerDownHandler != null) {
    mxEvent.removeListener(document, mxClient.IS_POINTER ? 'pointerdown' : 'mousedown', this.pointerDownHandler);
    this.pointerDownHandler = null;
  }

  if (this.pointerMoveHandler != null) {
    mxEvent.removeListener(document, mxClient.IS_POINTER ? 'pointermove' : 'mousemove', this.pointerMoveHandler);
    this.pointerMoveHandler = null;
  }

  if (this.pointerOutHandler != null) {
    mxEvent.removeListener(document, mxClient.IS_POINTER ? 'pointerout' : 'mouseout', this.pointerOutHandler);
    this.pointerOutHandler = null;
  }
};

Sidebar.prototype.triangleUp = HoverIcons.prototype.triangleUp;
Sidebar.prototype.triangleRight = HoverIcons.prototype.triangleRight;
Sidebar.prototype.triangleDown = HoverIcons.prototype.triangleDown;
Sidebar.prototype.triangleLeft = HoverIcons.prototype.triangleLeft;
Sidebar.prototype.refreshTarget = HoverIcons.prototype.refreshTarget;
Sidebar.prototype.roundDrop = HoverIcons.prototype.roundDrop;

module.exports = Sidebar;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Adds the general palette to the sidebar.
 */
var addClassDiagramPalette = function addClassDiagramPalette(sb, expand) {
  // Reusable cells
  var field = new mxCell("+ field: type", new mxGeometry(0, 0, 100, 26), "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;whiteSpace=wrap;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;");
  var attributeField = new mxCell("+ field: type", new mxGeometry(0, 0, 100, 26), "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;whiteSpace=wrap;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;componentName=attribute");
  var methodField = new mxCell("+ method(type): type", new mxGeometry(0, 0, 100, 26), "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;whiteSpace=wrap;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;componentName=method");
  var _controller = new mxCell("Controller", new mxGeometry(0, 0, 100, 26), "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;whiteSpace=wrap;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;componentName=method");

  field.vertex = true;
  attributeField.vertex = true;
  methodField.vertex = true;
  _controller.vertex = true;

  var divider = new mxCell("", new mxGeometry(0, 0, 40, 8), "line;html=1;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;");
  divider.vertex = true;

  // Default tags
  var dt = "uml static class ";

  var fns = [
  /* Object */
  sb.addEntry(dt + "object instance", function () {
    var cell = new mxCell("Object", new mxGeometry(0, 0, 90, 40), "html=1;whiteSpace=wrap;");
    cell.vertex = true;
    return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, "Object");
  }),

  /* Item Atribute */
  sb.addEntry(dt + "object instance", function () {
    var cell = new mxCell("+ item atribute", new mxGeometry(0, 0, 100, 30), "text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;");
    cell.vertex = true;
    return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, "Item 1");
  }),
  /* sb.addEntry(dt + 'item member method function variable field attribute label', function () {
    return sb.createVertexTemplateFromCells([sb.cloneCell(field, '+ item: attribute')], field.geometry.width, field.geometry.height, 'Item 1');
  }), */

  /* Divider */
  sb.addEntry(dt + "object instance", function () {
    var cell = new mxCell("", new mxGeometry(0, 0, 90, 10), "line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;strokeColor=inherit;");
    cell.vertex = true;
    return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, "Divider");
  }),

  /* Title */
  sb.createVertexTemplateEntry("text;html=1;align=center;fontStyle=1;verticalAlign=middle;spacingLeft=3;spacingRight=3;strokeColor=none;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;", 80, 26, "Title", "Title", null, null, dt + "title label"),

  /* Boundary Object */
  sb.addEntry(dt + "object instance", function () {
    var cell = new mxCell("Boundary Object", new mxGeometry(0, 0, 100, 80), "shape=umlBoundary;whiteSpace=wrap;html=1;");
    cell.vertex = true;
    return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, "Boundary Object");
  }),

  /* Entity Object */
  sb.addEntry(dt + "object instance", function () {
    var cell = new mxCell("Entity Object", new mxGeometry(0, 0, 90, 90), "ellipse;shape=umlEntity;whiteSpace=wrap;html=1;");
    cell.vertex = true;
    return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, "Entity Object");
  }),

  /* Control Object */
  sb.addEntry(dt + "object instance", function () {
    var cell = new mxCell("Control Object", new mxGeometry(0, 0, 90, 90), "ellipse;shape=umlControl;whiteSpace=wrap;html=1;");
    cell.vertex = true;
    return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, "Control Object");
  }),

  /* Actor */
  sb.addEntry(dt + "object instance", function () {
    var cell = new mxCell("Actor", new mxGeometry(0, 0, 45, 80), "shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;strokeColor=#001933;fillColor=#ffffff;gradientColor=#FFB366;");
    cell.vertex = true;
    return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, "Actor");
  }),

  /* Object */
  sb.addEntry(dt + "object instance", function () {
    var cell = new mxCell(":Object", new mxGeometry(0, 0, 100, 300), 'shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;dropTarget=0;collapsible=0;recursiveResize=0;outlineConnect=0;portConstraint=eastwest;newEdgeStyle={"curved":0,"rounded":0};');
    cell.vertex = true;
    return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, "Object");
  }),

  /* Actor Lifeline */
  sb.addEntry(dt + "object instance", function () {
    var cell = new mxCell("", new mxGeometry(0, 0, 30, 300), 'shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;dropTarget=0;collapsible=0;recursiveResize=0;outlineConnect=0;portConstraint=eastwest;newEdgeStyle={"curved":0,"rounded":0};participant=umlActor;');
    cell.vertex = true;
    return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, "Actor Lifeline");
  }),

  /* Boundary Lifeline */
  sb.addEntry(dt + "object instance", function () {
    var cell = new mxCell("", new mxGeometry(0, 0, 50, 300), 'shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;dropTarget=0;collapsible=0;recursiveResize=0;outlineConnect=0;portConstraint=eastwest;newEdgeStyle={"curved":0,"rounded":0};participant=umlBoundary;');
    cell.vertex = true;
    return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, "Boundary Lifeline");
  }),

  /* Entity */
  sb.addEntry(dt + "object instance", function () {
    var cell = new mxCell("", new mxGeometry(0, 0, 50, 300), 'shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;dropTarget=0;collapsible=0;recursiveResize=0;outlineConnect=0;portConstraint=eastwest;newEdgeStyle={"curved":0,"rounded":0};participant=umlEntity;');
    cell.vertex = true;
    return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, "Entity Lifeline");
  }),

  /* Control Lifeline */
  sb.addEntry(dt + "object instance", function () {
    var cell = new mxCell("", new mxGeometry(0, 0, 50, 300), 'shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;dropTarget=0;collapsible=0;recursiveResize=0;outlineConnect=0;portConstraint=eastwest;newEdgeStyle={"curved":0,"rounded":0};participant=umlControl;');
    cell.vertex = true;
    return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, "Control Lifeline");
  }),

  /* Frame */
  sb.addEntry(dt + "object instance", function () {
    var cell = new mxCell("frame", new mxGeometry(0, 0, 500, 300), 'shape=umlFrame;whiteSpace=wrap;html=1;pointerEvents=0;');
    cell.vertex = true;
    return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, "Frame");
  }),

  /* Destructio */
  sb.addEntry(dt + "object instance", function () {
    var cell = new mxCell("", new mxGeometry(0, 0, 30, 30), 'shape=umlDestroy;whiteSpace=wrap;html=1;strokeWidth=3;targetShapes=umlLifeline;');
    cell.vertex = true;
    return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, "Frame");
  }),

  /* sb.addEntry('UML Actor', function() {
    var cell = new mxCell('Actor', new mxGeometry(0, 0, 30, 60),
      'shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;');
    cell.vertex = true;
    var style = new Object();
    style[mxConstants.STYLE_FILLCOLOR] = '#ffffff';
    style[mxConstants.STYLE_STROKECOLOR] = '#000000';
    style[mxConstants.STYLE_FONTCOLOR] = '#000000';
    var styleString = mxUtils.setStyle(null, style);
    cell.setStyle(styleString);
    return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'Actor');
  }), */

  /* sb.addEntry('UML Use Case', function() {
    var cell = new mxCell('Use Case', new mxGeometry(0, 0, 120, 80),
      'ellipse;whiteSpace=wrap;html=1;');
    cell.vertex = true;
    var style = new Object();
    style[mxConstants.STYLE_VERTICAL_ALIGN] = 'middle';
    style[mxConstants.STYLE_ALIGN] = 'center';
    style[mxConstants.STYLE_FILLCOLOR] = '#ffffff';
    style[mxConstants.STYLE_STROKECOLOR] = '#000000';
    style[mxConstants.STYLE_FONTCOLOR] = '#000000';
    var styleString = mxUtils.setStyle(null, style);
    cell.setStyle(styleString);
    return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'Use Case');
  }), */

  /* sb.addEntry('UML Sequence Participant', function() {
    var cell = new mxCell('Participant', new mxGeometry(0, 0, 120, 40),
      'rounded=0;whiteSpace=wrap;html=1;');
    cell.vertex = true;
    var style = new Object();
    style[mxConstants.STYLE_SHAPE] = 'umlActor';
    style[mxConstants.STYLE_VERTICAL_ALIGN] = 'middle';
    style[mxConstants.STYLE_ALIGN] = 'center';
    style[mxConstants.STYLE_FILLCOLOR] = '#ffffff';
    style[mxConstants.STYLE_STROKECOLOR] = '#000000';
    style[mxConstants.STYLE_FONTCOLOR] = '#000000';
    var styleString = mxUtils.setStyle(null, style);
    cell.setStyle(styleString);
    return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'Participant');
  }), */

  /* sb.addEntry('UML Sequence Message', function() {
    var cell = new mxCell('Message', new mxGeometry(0, 0, 100, 40),
      'rounded=0;whiteSpace=wrap;html=1;');
    cell.vertex = true;
    var style = new Object();
    style[mxConstants.STYLE_SHAPE] = 'umlMessage';
    style[mxConstants.STYLE_VERTICAL_ALIGN] = 'middle';
    style[mxConstants.STYLE_ALIGN] = 'center';
    style[mxConstants.STYLE_FILLCOLOR] = '#ffffff';
    style[mxConstants.STYLE_STROKECOLOR] = '#000000';
    style[mxConstants.STYLE_FONTCOLOR] = '#000000';
    var styleString = mxUtils.setStyle(null, style);
    cell.setStyle(styleString);
    return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'Message');
  }), */

  sb.addEntry("UML Sequence Activation", function () {
    var cell = new mxCell("", new mxGeometry(0, 0, 10, 50), "shape=umlActivation;whiteSpace=wrap;html=1;");
    cell.vertex = true;
    var style = new Object();
    style[mxConstants.STYLE_VERTICAL_ALIGN] = "middle";
    style[mxConstants.STYLE_ALIGN] = "center";
    style[mxConstants.STYLE_FILLCOLOR] = "#ffffff";
    style[mxConstants.STYLE_STROKECOLOR] = "#000000";
    style[mxConstants.STYLE_FONTCOLOR] = "#000000";
    var styleString = mxUtils.setStyle(null, style);
    cell.setStyle(styleString);
    return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, "Activation Bar");
  }),
  /* Fount Message 1 */
  sb.createEdgeTemplateEntry("html=1;verticalAlign=bottom;startArrow=oval;startFill=1;endArrow=block;startSize=8;curved=0;rounded=0;", 160, 0, "dispatch", "Fount Message 1", null, "uml generalization extend"),

  /* Fount Message 2 */
  sb.createEdgeTemplateEntry("html=1;verticalAlign=bottom;startArrow=circle;startFill=1;endArrow=open;startSize=6;endSize=8;curved=0;rounded=0;", 160, 0, "dispatch", "Fount Message 2", null, "uml generalization extend"),

  /* Return */
  sb.createEdgeTemplateEntry("html=1;verticalAlign=bottom;endArrow=open;dashed=1;endSize=8;curved=0;rounded=0;", 160, 0, "return", "Return", null, "uml generalization extend"), sb.createEdgeTemplateEntry("html=1;verticalAlign=bottom;endArrow=block;curved=0;rounded=0;", 160, 0, "dispatch", "Message", null, "uml generalization extend")];

  sb.addPaletteFunctions("classDiagram", mxResources.get("classDiagram"), expand || false, fns);
};

module.exports = addClassDiagramPalette;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var saveFile = __webpack_require__(42);
var ExportDialog = __webpack_require__(43);
var GenerateCodeDialog = __webpack_require__(44);

/**
 * Copyright (c) 2006-2012, JGraph Ltd
 */
/**
 * Constructs the actions object for the given UI.
 */
function Actions(editorUi) {
  this.editorUi = editorUi;
  this.actions = new Object();
  this.init();
}

/**
 * Adds the default actions.
 */
Actions.prototype.init = function () {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;
  var isGraphEnabled = function isGraphEnabled() {
    return Action.prototype.isEnabled.apply(this, arguments) && graph.isEnabled();
  };

  // File actions
  this.addAction('new...', function () {
    window.open(ui.getUrl());
  });
  this.addAction('open...', function () {
    window.openNew = true;

    window.openKey = 'open';

    window.editorUi = ui;

    ui.openFile();
  });
  this.addAction('import', function () {
    window.openNew = true;
    window.openKey = 'import';

    // Closes dialog after open
    window.openFile = new OpenFile(mxUtils.bind(this, function () {
      ui.hideDialog();
    }));

    window.openFile.setConsumer(mxUtils.bind(this, function (xml, filename) {
      try {
        var doc = mxUtils.parseXml(xml);
        var model = new mxGraphModel();
        var codec = new mxCodec(doc);
        codec.decode(doc.documentElement, model);

        var children = model.getChildren(model.getChildAt(model.getRoot(), 0));
        editor.graph.setSelectionCells(editor.graph.importCells(children));
      } catch (e) {
        mxUtils.alert(mxResources.get('invalidOrMissingFile') + ': ' + e.message);
      }
    }));

    // Removes openFile if dialog is closed
    ui.showDialog(new OpenDialog(this).container, 320, 220, true, true, function () {
      window.openFile = null;
    });
  }).isEnabled = isGraphEnabled;
  this.addAction('save', function () {
    saveFile(ui, false);
  }, null, null, 'Ctrl+S').isEnabled = isGraphEnabled;
  this.addAction('saveAs', function () {
    saveFile(ui, true);
  }, null, null, 'Ctrl+Shift+S').isEnabled = isGraphEnabled;
  this.addAction('export', function () {
    ui.showDialog(new ExportDialog(ui).container, 300, 230, true, true);
  });
  this.addAction('editDiagram...', function () {
    var dlg = new EditDiagramDialog(ui);
    ui.showDialog(dlg.container, 620, 420, true, true);
    dlg.init();
  });
  this.addAction('generateCode...', function () {
    ui.showDialog(new GenerateCodeDialog(ui).container, 300, 230, true, true);
  });
  this.addAction('pageSetup...', function () {
    ui.showDialog(new PageSetupDialog(ui).container, 320, 220, true, true);
  }).isEnabled = isGraphEnabled;
  this.addAction('print...', function () {
    ui.showDialog(new PrintDialog(ui).container, 300, 180, true, true);
  }, null, 'sprite-print', 'Ctrl+P');
  this.addAction('preview', function () {
    mxUtils.show(graph, null, 10, 10);
  });

  // Edit actions
  this.addAction('undo', function () {
    ui.undo();
  }, null, 'sprite-undo', 'Ctrl+Z');
  this.addAction('redo', function () {
    ui.redo();
  }, null, 'sprite-redo', !mxClient.IS_WIN ? 'Ctrl+Shift+Z' : 'Ctrl+Y');
  this.addAction('cut', function () {
    mxClipboard.cut(graph);
  }, null, 'sprite-cut', 'Ctrl+X');
  this.addAction('copy', function () {
    mxClipboard.copy(graph);
  }, null, 'sprite-copy', 'Ctrl+C');
  this.addAction('paste', function () {
    if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent())) {
      mxClipboard.paste(graph);
    }
  }, false, 'sprite-paste', 'Ctrl+V');
  this.addAction('pasteHere', function (evt) {
    if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent())) {
      graph.getModel().beginUpdate();
      try {
        var cells = mxClipboard.paste(graph);

        if (cells != null) {
          var bb = graph.getBoundingBoxFromGeometry(cells);

          if (bb != null) {
            var t = graph.view.translate;
            var s = graph.view.scale;
            var dx = t.x;
            var dy = t.y;

            var x = Math.round(graph.snap(graph.popupMenuHandler.triggerX / s - dx));
            var y = Math.round(graph.snap(graph.popupMenuHandler.triggerY / s - dy));

            graph.cellsMoved(cells, x - bb.x, y - bb.y);
          }
        }
      } finally {
        graph.getModel().endUpdate();
      }
    }
  });

  function deleteCells(includeEdges) {
    // Cancels interactive operations
    graph.escape();
    var cells = graph.getDeletableCells(graph.getSelectionCells());

    if (cells != null && cells.length > 0) {
      var parents = graph.model.getParents(cells);
      graph.removeCells(cells, includeEdges);

      // Selects parents for easier editing of groups
      if (parents != null) {
        var select = [];

        for (var i = 0; i < parents.length; i++) {
          if (graph.model.isVertex(parents[i]) || graph.model.isEdge(parents[i])) {
            select.push(parents[i]);
          }
        }

        graph.setSelectionCells(select);
      }
    }
  }

  this.addAction('delete', function (evt) {
    deleteCells(evt != null && mxEvent.isShiftDown(evt));
  }, null, null, 'Delete');
  this.addAction('deleteAll', function () {
    deleteCells(true);
  }, null, null, 'Ctrl+Delete');
  this.addAction('duplicate', function () {
    graph.setSelectionCells(graph.duplicateCells());
  }, null, null, 'Ctrl+D');
  this.put('turn', new Action(mxResources.get('turn') + ' / ' + mxResources.get('reverse'), function () {
    graph.turnShapes(graph.getSelectionCells());
  }, null, null, 'Ctrl+R'));
  this.addAction('selectVertices', function () {
    graph.selectVertices();
  }, null, null, 'Ctrl+Shift+I');
  this.addAction('selectEdges', function () {
    graph.selectEdges();
  }, null, null, 'Ctrl+Shift+E');
  this.addAction('selectAll', function () {
    graph.selectAll(null, true);
  }, null, null, 'Ctrl+A');
  this.addAction('selectNone', function () {
    graph.clearSelection();
  }, null, null, 'Ctrl+Shift+A');
  this.addAction('lockUnlock', function () {
    if (!graph.isSelectionEmpty()) {
      graph.getModel().beginUpdate();
      try {
        var defaultValue = graph.isCellMovable(graph.getSelectionCell()) ? 1 : 0;
        graph.toggleCellStyles(mxConstants.STYLE_MOVABLE, defaultValue);
        graph.toggleCellStyles(mxConstants.STYLE_RESIZABLE, defaultValue);
        graph.toggleCellStyles(mxConstants.STYLE_ROTATABLE, defaultValue);
        graph.toggleCellStyles(mxConstants.STYLE_DELETABLE, defaultValue);
        graph.toggleCellStyles(mxConstants.STYLE_EDITABLE, defaultValue);
        graph.toggleCellStyles('connectable', defaultValue);
      } finally {
        graph.getModel().endUpdate();
      }
    }
  }, null, null, 'Ctrl+L');

  // Navigation actions
  this.addAction('home', function () {
    graph.home();
  }, null, null, 'Home');
  this.addAction('exitGroup', function () {
    graph.exitGroup();
  }, null, null, 'Ctrl+Shift+Page Up');
  this.addAction('enterGroup', function () {
    graph.enterGroup();
  }, null, null, 'Ctrl+Shift+Page Down');
  this.addAction('expand', function () {
    graph.foldCells(false);
  }, null, null, 'Ctrl+Page Down');
  this.addAction('collapse', function () {
    graph.foldCells(true);
  }, null, null, 'Ctrl+Page Up');

  // Arrange actions
  this.addAction('toFront', function () {
    graph.orderCells(false);
  }, null, null, 'Ctrl+Shift+F');
  this.addAction('toBack', function () {
    graph.orderCells(true);
  }, null, null, 'Ctrl+Shift+B');
  this.addAction('group', function () {
    if (graph.getSelectionCount() == 1) {
      graph.setCellStyles('container', '1');
    } else {
      graph.setSelectionCell(graph.groupCells(null, 0));
    }
  }, null, null, 'Ctrl+G');
  this.addAction('ungroup', function () {
    if (graph.getSelectionCount() == 1 && graph.getModel().getChildCount(graph.getSelectionCell()) == 0) {
      graph.setCellStyles('container', '0');
    } else {
      graph.setSelectionCells(graph.ungroupCells());
    }
  }, null, null, 'Ctrl+Shift+U');
  this.addAction('removeFromGroup', function () {
    graph.removeCellsFromParent();
  });
  // Adds action
  this.addAction('edit', function () {
    if (graph.isEnabled()) {
      graph.startEditingAtCell();
    }
  }, null, null, 'F2/Enter');
  this.addAction('editData...', function () {
    var cell = graph.getSelectionCell() || graph.getModel().getRoot();

    if (cell != null) {
      var dlg = new EditDataDialog(ui, cell);
      ui.showDialog(dlg.container, 320, 320, true, false);
      dlg.init();
    }
  }, null, null, 'Ctrl+M');
  this.addAction('editTooltip...', function () {
    var graph = ui.editor.graph;

    if (graph.isEnabled() && !graph.isSelectionEmpty()) {
      var cell = graph.getSelectionCell();
      var tooltip = '';

      if (mxUtils.isNode(cell.value)) {
        var tmp = cell.value.getAttribute('tooltip');

        if (tmp != null) {
          tooltip = tmp;
        }
      }

      var dlg = new TextareaDialog(ui, mxResources.get('editTooltip') + ':', tooltip, function (newValue) {
        graph.setTooltipForCell(cell, newValue);
      });
      ui.showDialog(dlg.container, 320, 200, true, true);
      dlg.init();
    }
  });
  this.addAction('openLink', function () {
    var link = graph.getLinkForCell(graph.getSelectionCell());

    if (link != null) {
      window.open(link);
    }
  });
  this.addAction('editLink...', function () {
    var graph = ui.editor.graph;

    if (graph.isEnabled() && !graph.isSelectionEmpty()) {
      var cell = graph.getSelectionCell();
      var value = graph.getLinkForCell(cell) || '';

      ui.showLinkDialog(value, mxResources.get('apply'), function (link) {
        link = mxUtils.trim(link);
        graph.setLinkForCell(cell, link.length > 0 ? link : null);
      });
    }
  });
  this.addAction('insertLink...', function () {
    if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent())) {
      var dlg = new LinkDialog(ui, '', mxResources.get('insert'), function (link, docs) {
        link = mxUtils.trim(link);

        if (link.length > 0) {
          var title = link.substring(link.lastIndexOf('/') + 1);
          var icon = null;

          if (docs != null && docs.length > 0) {
            icon = docs[0].iconUrl;
            title = docs[0].name || docs[0].type;
            title = title.charAt(0).toUpperCase() + title.substring(1);

            if (title.length > 30) {
              title = title.substring(0, 30) + '...';
            }
          }

          var pt = graph.getFreeInsertPoint();
          var linkCell = new mxCell(title, new mxGeometry(pt.x, pt.y, 100, 40), 'fontColor=#0000EE;fontStyle=4;rounded=1;overflow=hidden;' + (icon != null ? 'shape=label;imageWidth=16;imageHeight=16;spacingLeft=26;align=left;image=' + icon : 'spacing=10;'));
          linkCell.vertex = true;

          graph.setLinkForCell(linkCell, link);
          graph.cellSizeUpdated(linkCell, true);
          graph.setSelectionCell(graph.addCell(linkCell));
          graph.scrollCellToVisible(graph.getSelectionCell());
        }
      });

      ui.showDialog(dlg.container, 420, 90, true, true);
      dlg.init();
    }
  }).isEnabled = isGraphEnabled;
  this.addAction('link...', mxUtils.bind(this, function () {
    var graph = ui.editor.graph;

    if (graph.isEnabled()) {
      if (graph.cellEditor.isContentEditing()) {
        var link = graph.getParentByName(graph.getSelectedElement(), 'A', graph.cellEditor.textarea);
        var oldValue = '';

        if (link != null) {
          oldValue = link.getAttribute('href') || '';
        }

        var selState = graph.cellEditor.saveSelection();

        ui.showLinkDialog(oldValue, mxResources.get('apply'), mxUtils.bind(this, function (value) {
          graph.cellEditor.restoreSelection(selState);

          if (value != null) {
            graph.insertLink(value);
          }
        }));
      } else if (graph.isSelectionEmpty()) {
        this.get('insertLink').funct();
      } else {
        this.get('editLink').funct();
      }
    }
  })).isEnabled = isGraphEnabled;
  this.addAction('autosize', function () {
    var cells = graph.getSelectionCells();

    if (cells != null) {
      graph.getModel().beginUpdate();
      try {
        for (var i = 0; i < cells.length; i++) {
          var cell = cells[i];

          if (graph.getModel().getChildCount(cell)) {
            graph.updateGroupBounds([cell], 20);
          } else {
            var state = graph.view.getState(cell);
            var geo = graph.getCellGeometry(cell);

            if (graph.getModel().isVertex(cell) && state != null && state.text != null && geo != null && graph.isWrapping(cell)) {
              geo = geo.clone();
              geo.height = state.text.boundingBox.height / graph.view.scale;
              graph.getModel().setGeometry(cell, geo);
            } else {
              graph.updateCellSize(cell);
            }
          }
        }
      } finally {
        graph.getModel().endUpdate();
      }
    }
  }, null, null, 'Ctrl+Shift+Y');
  this.addAction('formattedText', function () {
    var state = graph.getView().getState(graph.getSelectionCell());

    if (state != null) {
      var value = '1';
      graph.stopEditing();

      graph.getModel().beginUpdate();
      try {
        if (state.style.html == '1') {
          value = null;
          var label = graph.convertValueToString(state.cell);

          if (mxUtils.getValue(state.style, 'nl2Br', '1') != '0') {
            // Removes newlines from HTML and converts breaks to newlines
            // to match the HTML output in plain text
            label = label.replace(/\n/g, '').replace(/<br\s*.?>/g, '\n');
          }

          // Removes HTML tags
          var temp = document.createElement('div');
          temp.innerHTML = label;
          label = mxUtils.extractTextWithWhitespace(temp.childNodes);

          graph.cellLabelChanged(state.cell, label);
        } else {
          // Converts HTML tags to text
          var label = mxUtils.htmlEntities(graph.convertValueToString(state.cell), false);

          if (mxUtils.getValue(state.style, 'nl2Br', '1') != '0') {
            // Converts newlines in plain text to breaks in HTML
            // to match the plain text output
            label = label.replace(/\n/g, '<br/>');
          }

          graph.cellLabelChanged(state.cell, graph.sanitizeHtml(label));
        }

        graph.setCellStyles('html', value);
        ui.fireEvent(new mxEventObject('styleChanged', 'keys', ['html'], 'values', [value != null ? value : '0'], 'cells', graph.getSelectionCells()));
      } finally {
        graph.getModel().endUpdate();
      }
    }
  });
  this.addAction('wordWrap', function () {
    var state = graph.getView().getState(graph.getSelectionCell());
    var value = 'wrap';

    graph.stopEditing();

    if (state != null && state.style[mxConstants.STYLE_WHITE_SPACE] == 'wrap') {
      value = null;
    }

    graph.setCellStyles(mxConstants.STYLE_WHITE_SPACE, value);
  });
  this.addAction('rotation', function () {
    var value = '0';
    var state = graph.getView().getState(graph.getSelectionCell());

    if (state != null) {
      value = state.style[mxConstants.STYLE_ROTATION] || value;
    }

    var dlg = new FilenameDialog(ui, value, mxResources.get('apply'), function (newValue) {
      if (newValue != null && newValue.length > 0) {
        graph.setCellStyles(mxConstants.STYLE_ROTATION, newValue);
      }
    }, mxResources.get('enterValue') + ' (' + mxResources.get('rotation') + ' 0-360)');

    ui.showDialog(dlg.container, 300, 80, true, true);
    dlg.init();
  });
  // View actions
  this.addAction('resetView', function () {
    graph.zoomTo(1);
    ui.resetScrollbars();
  }, null, null, 'Ctrl+H');
  this.addAction('zoomIn', function (evt) {
    graph.zoomIn();
  }, null, null, 'Ctrl + / Alt+Mousewheel');
  this.addAction('zoomOut', function (evt) {
    graph.zoomOut();
  }, null, null, 'Ctrl - / Alt+Mousewheel');
  this.addAction('fitWindow', function () {
    graph.fit();
  }, null, null, 'Ctrl+Shift+H');
  this.addAction('fitPage', mxUtils.bind(this, function () {
    if (!graph.pageVisible) {
      this.get('pageView').funct();
    }

    var fmt = graph.pageFormat;
    var ps = graph.pageScale;
    var cw = graph.container.clientWidth - 10;
    var ch = graph.container.clientHeight - 10;
    var scale = Math.floor(20 * Math.min(cw / fmt.width / ps, ch / fmt.height / ps)) / 20;
    graph.zoomTo(scale);

    if (mxUtils.hasScrollbars(graph.container)) {
      var pad = graph.getPagePadding();
      graph.container.scrollTop = pad.y * graph.view.scale;
      graph.container.scrollLeft = Math.min(pad.x * graph.view.scale, (graph.container.scrollWidth - graph.container.clientWidth) / 2);
    }
  }), null, null, 'Ctrl+J');
  this.addAction('fitTwoPages', mxUtils.bind(this, function () {
    if (!graph.pageVisible) {
      this.get('pageView').funct();
    }

    var fmt = graph.pageFormat;
    var ps = graph.pageScale;
    var cw = graph.container.clientWidth - 10;
    var ch = graph.container.clientHeight - 10;

    var scale = Math.floor(20 * Math.min(cw / (2 * fmt.width) / ps, ch / fmt.height / ps)) / 20;
    graph.zoomTo(scale);

    if (mxUtils.hasScrollbars(graph.container)) {
      var pad = graph.getPagePadding();
      graph.container.scrollTop = Math.min(pad.y, (graph.container.scrollHeight - graph.container.clientHeight) / 2);
      graph.container.scrollLeft = Math.min(pad.x, (graph.container.scrollWidth - graph.container.clientWidth) / 2);
    }
  }), null, null, 'Ctrl+Shift+J');
  this.addAction('fitPageWidth', mxUtils.bind(this, function () {
    if (!graph.pageVisible) {
      this.get('pageView').funct();
    }

    var fmt = graph.pageFormat;
    var ps = graph.pageScale;
    var cw = graph.container.clientWidth - 10;

    var scale = Math.floor(20 * cw / fmt.width / ps) / 20;
    graph.zoomTo(scale);

    if (mxUtils.hasScrollbars(graph.container)) {
      var pad = graph.getPagePadding();
      graph.container.scrollLeft = Math.min(pad.x * graph.view.scale, (graph.container.scrollWidth - graph.container.clientWidth) / 2);
    }
  }));
  this.put('customZoom', new Action(mxResources.get('custom') + '...', mxUtils.bind(this, function () {
    var dlg = new FilenameDialog(this.editorUi, parseInt(graph.getView().getScale() * 100), mxResources.get('apply'), mxUtils.bind(this, function (newValue) {
      var val = parseInt(newValue);

      if (!isNaN(val) && val > 0) {
        graph.zoomTo(val / 100);
      }
    }), mxResources.get('zoom') + ' (%)');
    this.editorUi.showDialog(dlg.container, 300, 80, true, true);
    dlg.init();
  }), null, null, 'Ctrl+0'));
  this.addAction('pageScale...', mxUtils.bind(this, function () {
    var dlg = new FilenameDialog(this.editorUi, parseInt(graph.pageScale * 100), mxResources.get('apply'), mxUtils.bind(this, function (newValue) {
      var val = parseInt(newValue);

      if (!isNaN(val) && val > 0) {
        ui.setPageScale(val / 100);
      }
    }), mxResources.get('pageScale') + ' (%)');
    this.editorUi.showDialog(dlg.container, 300, 80, true, true);
    dlg.init();
  }));

  // Option actions
  var action = null;
  action = this.addAction('grid', function () {
    graph.setGridEnabled(!graph.isGridEnabled());
    ui.fireEvent(new mxEventObject('gridEnabledChanged'));
  }, null, null, 'Ctrl+Shift+G');
  action.setToggleAction(true);
  action.setSelectedCallback(function () {
    return graph.isGridEnabled();
  });
  action.setEnabled(false);

  action = this.addAction('guides', function () {
    graph.graphHandler.guidesEnabled = !graph.graphHandler.guidesEnabled;
    ui.fireEvent(new mxEventObject('guidesEnabledChanged'));
  });
  action.setToggleAction(true);
  action.setSelectedCallback(function () {
    return graph.graphHandler.guidesEnabled;
  });
  action.setEnabled(false);

  action = this.addAction('tooltips', function () {
    graph.tooltipHandler.setEnabled(!graph.tooltipHandler.isEnabled());
  });
  action.setToggleAction(true);
  action.setSelectedCallback(function () {
    return graph.tooltipHandler.isEnabled();
  });

  action = this.addAction('collapseExpand', function () {
    ui.setFoldingEnabled(!graph.foldingEnabled);
  });
  action.setToggleAction(true);
  action.setSelectedCallback(function () {
    return graph.foldingEnabled;
  });
  action.isEnabled = isGraphEnabled;
  action = this.addAction('scrollbars', function () {
    ui.setScrollbars(!ui.hasScrollbars());
  });
  action.setToggleAction(true);
  action.setSelectedCallback(function () {
    return graph.scrollbars;
  });
  action = this.addAction('pageView', mxUtils.bind(this, function () {
    ui.setPageVisible(!graph.pageVisible);
  }));
  action.setToggleAction(true);
  action.setSelectedCallback(function () {
    return graph.pageVisible;
  });
  this.put('pageBackgroundColor', new Action(mxResources.get('backgroundColor') + '...', function () {
    ui.pickColor(graph.background || 'none', function (color) {
      ui.setBackgroundColor(color);
    });
  }));
  action = this.addAction('connectionArrows', function () {
    graph.connectionArrowsEnabled = !graph.connectionArrowsEnabled;
    ui.fireEvent(new mxEventObject('connectionArrowsChanged'));
  }, null, null, 'Ctrl+Q');
  action.setToggleAction(true);
  action.setSelectedCallback(function () {
    return graph.connectionArrowsEnabled;
  });
  action = this.addAction('connectionPoints', function () {
    graph.setConnectable(!graph.connectionHandler.isEnabled());
    ui.fireEvent(new mxEventObject('connectionPointsChanged'));
  }, null, null, 'Ctrl+Shift+Q');
  action.setToggleAction(true);
  action.setSelectedCallback(function () {
    return graph.connectionHandler.isEnabled();
  });
  action = this.addAction('copyConnect', function () {
    graph.connectionHandler.setCreateTarget(!graph.connectionHandler.isCreateTarget());
    ui.fireEvent(new mxEventObject('copyConnectChanged'));
  });
  action.setToggleAction(true);
  action.setSelectedCallback(function () {
    return graph.connectionHandler.isCreateTarget();
  });
  action.isEnabled = isGraphEnabled;
  action = this.addAction('autosave', function () {
    ui.editor.setAutosave(!ui.editor.autosave);
  });
  action.setToggleAction(true);
  action.setSelectedCallback(function () {
    return ui.editor.autosave;
  });
  action.isEnabled = isGraphEnabled;
  action.visible = false;

  // Help actions
  this.addAction('help', function () {
    var ext = '';

    if (mxResources.isLanguageSupported(mxClient.language)) {
      ext = '_' + mxClient.language;
    }
    var ourl = RESOURCES_PATH + '/help' + ext + '.html';
    console.log(ourl);
    window.open(ourl);
  });
  this.put('about', new Action(mxResources.get('about') + ' Graph Editor...', function () {
    ui.showDialog(new AboutDialog(ui).container, 320, 280, true, true);
  }, null, null, 'F1'));

  // Font style actions
  var toggleFontStyle = mxUtils.bind(this, function (key, style, fn, shortcut) {
    return this.addAction(key, function () {
      if (fn != null && graph.cellEditor.isContentEditing()) {
        fn();
      } else {
        graph.stopEditing(false);
        graph.toggleCellStyleFlags(mxConstants.STYLE_FONTSTYLE, style);
      }
    }, null, null, shortcut);
  });

  toggleFontStyle('bold', mxConstants.FONT_BOLD, function () {
    document.execCommand('bold', false, null);
  }, 'Ctrl+B');
  toggleFontStyle('italic', mxConstants.FONT_ITALIC, function () {
    document.execCommand('italic', false, null);
  }, 'Ctrl+I');
  toggleFontStyle('underline', mxConstants.FONT_UNDERLINE, function () {
    document.execCommand('underline', false, null);
  }, 'Ctrl+U');

  // Color actions
  this.addAction('fontColor...', function () {
    ui.menus.pickColor(mxConstants.STYLE_FONTCOLOR, 'forecolor', '000000');
  });
  this.addAction('strokeColor...', function () {
    ui.menus.pickColor(mxConstants.STYLE_STROKECOLOR);
  });
  this.addAction('fillColor...', function () {
    ui.menus.pickColor(mxConstants.STYLE_FILLCOLOR);
  });
  this.addAction('gradientColor...', function () {
    ui.menus.pickColor(mxConstants.STYLE_GRADIENTCOLOR);
  });
  this.addAction('backgroundColor...', function () {
    ui.menus.pickColor(mxConstants.STYLE_LABEL_BACKGROUNDCOLOR, 'backcolor');
  });
  this.addAction('borderColor...', function () {
    ui.menus.pickColor(mxConstants.STYLE_LABEL_BORDERCOLOR);
  });

  // Format actions
  this.addAction('vertical', function () {
    ui.menus.toggleStyle(mxConstants.STYLE_HORIZONTAL, true);
  });
  this.addAction('shadow', function () {
    ui.menus.toggleStyle(mxConstants.STYLE_SHADOW);
  });
  this.addAction('solid', function () {
    graph.getModel().beginUpdate();
    try {
      graph.setCellStyles(mxConstants.STYLE_DASHED, null);
      graph.setCellStyles(mxConstants.STYLE_DASH_PATTERN, null);
      ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], 'values', [null, null], 'cells', graph.getSelectionCells()));
    } finally {
      graph.getModel().endUpdate();
    }
  });
  this.addAction('dashed', function () {
    graph.getModel().beginUpdate();
    try {
      graph.setCellStyles(mxConstants.STYLE_DASHED, '1');
      graph.setCellStyles(mxConstants.STYLE_DASH_PATTERN, null);
      ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], 'values', ['1', null], 'cells', graph.getSelectionCells()));
    } finally {
      graph.getModel().endUpdate();
    }
  });
  this.addAction('dotted', function () {
    graph.getModel().beginUpdate();
    try {
      graph.setCellStyles(mxConstants.STYLE_DASHED, '1');
      graph.setCellStyles(mxConstants.STYLE_DASH_PATTERN, '1 4');
      ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], 'values', ['1', '1 4'], 'cells', graph.getSelectionCells()));
    } finally {
      graph.getModel().endUpdate();
    }
  });
  this.addAction('sharp', function () {
    graph.getModel().beginUpdate();
    try {
      graph.setCellStyles(mxConstants.STYLE_ROUNDED, '0');
      graph.setCellStyles(mxConstants.STYLE_CURVED, '0');
      ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED], 'values', ['0', '0'], 'cells', graph.getSelectionCells()));
    } finally {
      graph.getModel().endUpdate();
    }
  });
  this.addAction('rounded', function () {
    graph.getModel().beginUpdate();
    try {
      graph.setCellStyles(mxConstants.STYLE_ROUNDED, '1');
      graph.setCellStyles(mxConstants.STYLE_CURVED, '0');
      ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED], 'values', ['1', '0'], 'cells', graph.getSelectionCells()));
    } finally {
      graph.getModel().endUpdate();
    }
  });
  this.addAction('toggleRounded', function () {
    if (!graph.isSelectionEmpty() && graph.isEnabled()) {
      graph.getModel().beginUpdate();
      try {
        var cells = graph.getSelectionCells();
        var state = graph.view.getState(cells[0]);
        var style = state != null ? state.style : graph.getCellStyle(cells[0]);
        var value = mxUtils.getValue(style, mxConstants.STYLE_ROUNDED, '0') == '1' ? '0' : '1';

        graph.setCellStyles(mxConstants.STYLE_ROUNDED, value);
        graph.setCellStyles(mxConstants.STYLE_CURVED, null);
        ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED], 'values', [value, '0'], 'cells', graph.getSelectionCells()));
      } finally {
        graph.getModel().endUpdate();
      }
    }
  });
  this.addAction('curved', function () {
    graph.getModel().beginUpdate();
    try {
      graph.setCellStyles(mxConstants.STYLE_ROUNDED, '0');
      graph.setCellStyles(mxConstants.STYLE_CURVED, '1');
      ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED], 'values', ['0', '1'], 'cells', graph.getSelectionCells()));
    } finally {
      graph.getModel().endUpdate();
    }
  });
  this.addAction('collapsible', function () {
    var state = graph.view.getState(graph.getSelectionCell());
    var value = '1';

    if (state != null && graph.getFoldingImage(state) != null) {
      value = '0';
    }

    graph.setCellStyles('collapsible', value);
    ui.fireEvent(new mxEventObject('styleChanged', 'keys', ['collapsible'], 'values', [value], 'cells', graph.getSelectionCells()));
  });
  this.addAction('editStyle...', mxUtils.bind(this, function () {
    var cells = graph.getSelectionCells();

    if (cells != null && cells.length > 0) {
      var model = graph.getModel();

      var dlg = new TextareaDialog(this.editorUi, mxResources.get('editStyle') + ':', model.getStyle(cells[0]) || '', function (newValue) {
        if (newValue != null) {
          graph.setCellStyle(mxUtils.trim(newValue), cells);
        }
      }, null, null, 400, 220);
      this.editorUi.showDialog(dlg.container, 420, 300, true, true);
      dlg.init();
    }
  }), null, null, 'Ctrl+E');
  this.addAction('setAsDefaultStyle', function () {
    if (graph.isEnabled() && !graph.isSelectionEmpty()) {
      ui.setDefaultStyle(graph.getSelectionCell());
    }
  }, null, null, 'Ctrl+Shift+D');
  this.addAction('clearDefaultStyle', function () {
    if (graph.isEnabled()) {
      ui.clearDefaultStyle();
    }
  }, null, null, 'Ctrl+Shift+R');
  this.addAction('addWaypoint', function () {
    var cell = graph.getSelectionCell();

    if (cell != null && graph.getModel().isEdge(cell)) {
      var handler = editor.graph.selectionCellsHandler.getHandler(cell);

      if (handler instanceof mxEdgeHandler) {
        var t = graph.view.translate;
        var s = graph.view.scale;
        var dx = t.x;
        var dy = t.y;

        var parent = graph.getModel().getParent(cell);
        var pgeo = graph.getCellGeometry(parent);

        while (graph.getModel().isVertex(parent) && pgeo != null) {
          dx += pgeo.x;
          dy += pgeo.y;

          parent = graph.getModel().getParent(parent);
          pgeo = graph.getCellGeometry(parent);
        }

        var x = Math.round(graph.snap(graph.popupMenuHandler.triggerX / s - dx));
        var y = Math.round(graph.snap(graph.popupMenuHandler.triggerY / s - dy));

        handler.addPointAt(handler.state, x, y);
      }
    }
  });
  this.addAction('removeWaypoint', function () {
    // TODO: Action should run with "this" set to action
    var rmWaypointAction = ui.actions.get('removeWaypoint');

    if (rmWaypointAction.handler != null) {
      // NOTE: Popupevent handled and action updated in Menus.createPopupMenu
      rmWaypointAction.handler.removePoint(rmWaypointAction.handler.state, rmWaypointAction.index);
    }
  });
  this.addAction('clearWaypoints', function () {
    var cells = graph.getSelectionCells();

    if (cells != null) {
      graph.getModel().beginUpdate();
      try {
        for (var i = 0; i < cells.length; i++) {
          var cell = cells[i];

          if (graph.getModel().isEdge(cell)) {
            var geo = graph.getCellGeometry(cell);

            if (geo != null) {
              geo = geo.clone();
              geo.points = null;
              graph.getModel().setGeometry(cell, geo);
            }
          }
        }
      } finally {
        graph.getModel().endUpdate();
      }
    }
  });
  action = this.addAction('subscript', mxUtils.bind(this, function () {
    if (graph.cellEditor.isContentEditing()) {
      document.execCommand('subscript', false, null);
    }
  }), null, null, 'Ctrl+,');
  action = this.addAction('superscript', mxUtils.bind(this, function () {
    if (graph.cellEditor.isContentEditing()) {
      document.execCommand('superscript', false, null);
    }
  }), null, null, 'Ctrl+.');
  this.addAction('image...', function () {
    if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent())) {
      var title = mxResources.get('image') + ' (' + mxResources.get('url') + '):';
      var state = graph.getView().getState(graph.getSelectionCell());
      var value = '';

      if (state != null) {
        value = state.style[mxConstants.STYLE_IMAGE] || value;
      }

      var selectionState = graph.cellEditor.saveSelection();

      ui.showImageDialog(title, value, function (newValue, w, h) {
        // Inserts image into HTML text
        if (graph.cellEditor.isContentEditing()) {
          graph.cellEditor.restoreSelection(selectionState);
          graph.insertImage(newValue, w, h);
        } else {
          var cells = graph.getSelectionCells();

          if (newValue != null) {
            var select = null;

            graph.getModel().beginUpdate();
            try {
              // Inserts new cell if no cell is selected
              if (cells.length == 0) {
                var pt = graph.getFreeInsertPoint();
                cells = [graph.insertVertex(graph.getDefaultParent(), null, '', pt.x, pt.y, w, h, 'shape=image;imageAspect=0;aspect=fixed;verticalLabelPosition=bottom;verticalAlign=top;')];
                select = cells;
              }

              graph.setCellStyles(mxConstants.STYLE_IMAGE, newValue, cells);

              // Sets shape only if not already shape with image (label or image)
              var state = graph.view.getState(cells[0]);
              var style = state != null ? state.style : graph.getCellStyle(cells[0]);

              if (style[mxConstants.STYLE_SHAPE] != 'image' && style[mxConstants.STYLE_SHAPE] != 'label') {
                graph.setCellStyles(mxConstants.STYLE_SHAPE, 'image', cells);
              }

              if (graph.getSelectionCount() == 1) {
                if (w != null && h != null) {
                  var cell = cells[0];
                  var geo = graph.getModel().getGeometry(cell);

                  if (geo != null) {
                    geo = geo.clone();
                    geo.width = w;
                    geo.height = h;
                    graph.getModel().setGeometry(cell, geo);
                  }
                }
              }
            } finally {
              graph.getModel().endUpdate();
            }

            if (select != null) {
              graph.setSelectionCells(select);
              graph.scrollCellToVisible(select[0]);
            }
          }
        }
      }, graph.cellEditor.isContentEditing(), !graph.cellEditor.isContentEditing());
    }
  }).isEnabled = isGraphEnabled;
  this.addAction('insertImage...', function () {
    if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent())) {
      graph.clearSelection();
      ui.actions.get('image').funct();
    }
  }).isEnabled = isGraphEnabled;
  action = this.addAction('layers', mxUtils.bind(this, function () {
    if (this.layersWindow == null) {
      // LATER: Check outline window for initial placement
      this.layersWindow = new LayersWindow(ui, document.body.offsetWidth - 280, 120, 220, 180);
      this.layersWindow.window.addListener('show', function () {
        ui.fireEvent(new mxEventObject('layers'));
      });
      this.layersWindow.window.addListener('hide', function () {
        ui.fireEvent(new mxEventObject('layers'));
      });
      this.layersWindow.window.setVisible(true);
      ui.fireEvent(new mxEventObject('layers'));
    } else {
      this.layersWindow.window.setVisible(!this.layersWindow.window.isVisible());
    }

    // ui.fireEvent(new mxEventObject('layers'));
  }), null, null, 'Ctrl+Shift+L');
  action.setToggleAction(true);
  action.setSelectedCallback(mxUtils.bind(this, function () {
    return this.layersWindow != null && this.layersWindow.window.isVisible();
  }));
  action = this.addAction('formatPanel', mxUtils.bind(this, function () {
    ui.toggleFormatPanel();
  }), null, null, 'Ctrl+Shift+P');
  action.setToggleAction(true);
  action.setSelectedCallback(mxUtils.bind(this, function () {
    return ui.formatWidth > 0;
  }));
  action = this.addAction('outline', mxUtils.bind(this, function () {
    if (this.outlineWindow == null) {
      // LATER: Check layers window for initial placement
      this.outlineWindow = new OutlineWindow(ui, document.body.offsetWidth - 260, 100, 180, 180);
      this.outlineWindow.window.addListener('show', function () {
        ui.fireEvent(new mxEventObject('outline'));
      });
      this.outlineWindow.window.addListener('hide', function () {
        ui.fireEvent(new mxEventObject('outline'));
      });
      this.outlineWindow.window.setVisible(true);
      ui.fireEvent(new mxEventObject('outline'));
    } else {
      this.outlineWindow.window.setVisible(!this.outlineWindow.window.isVisible());
    }

    ui.fireEvent(new mxEventObject('outline'));
  }), null, null, 'Ctrl+Shift+O');

  action.setToggleAction(true);
  action.setSelectedCallback(mxUtils.bind(this, function () {
    return this.outlineWindow != null && this.outlineWindow.window.isVisible();
  }));
};

/**
 * Registers the given action under the given name.
 */
Actions.prototype.addAction = function (key, funct, enabled, iconCls, shortcut) {
  var title;

  if (key.substring(key.length - 3) == '...') {
    key = key.substring(0, key.length - 3);
    title = mxResources.get(key) + '...';
  } else {
    title = mxResources.get(key);
  }

  return this.put(key, new Action(title, funct, enabled, iconCls, shortcut));
};

/**
 * Registers the given action under the given name.
 */
Actions.prototype.put = function (name, action) {
  this.actions[name] = action;

  return action;
};

/**
 * Returns the action for the given name or null if no such action exists.
 */
Actions.prototype.get = function (name) {
  return this.actions[name];
};

/**
 * Constructs a new action for the given parameters.
 */
function Action(label, funct, enabled, iconCls, shortcut) {
  mxEventSource.call(this);
  this.label = label;
  this.funct = funct;
  this.enabled = enabled != null ? enabled : true;
  this.iconCls = iconCls;
  this.shortcut = shortcut;
  this.visible = true;
}

// Action inherits from mxEventSource
mxUtils.extend(Action, mxEventSource);

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.setEnabled = function (value) {
  if (this.enabled != value) {
    this.enabled = value;
    this.fireEvent(new mxEventObject('stateChanged'));
  }
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.isEnabled = function () {
  return this.enabled;
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.setToggleAction = function (value) {
  this.toggleAction = value;
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.setSelectedCallback = function (funct) {
  this.selectedCallback = funct;
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.isSelected = function () {
  return this.selectedCallback();
};

module.exports = Actions;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Adds the label menu items to the given menu and parent.
 */
var saveFile = function saveFile(ui, forceDialog) {
  if (!forceDialog && ui.editor.filename != null) {
    ui.save(ui.editor.getOrCreateFilename());
  } else {
    var dlg = new FilenameDialog(ui, ui.editor.getOrCreateFilename(), mxResources.get('save'), mxUtils.bind(ui, function (name) {
      save(ui, name);
    }), null, mxUtils.bind(ui, function (name) {
      if (name != null && name.length > 0) {
        return true;
      }

      mxUtils.confirm(mxResources.get('invalidName'));

      return false;
    }));
    ui.showDialog(dlg.container, 300, 100, true, true);
    dlg.init();
  }
};

/**
 * Saves the current graph under the given filename.
 */
var save = function save(ui, name) {
  if (name != null) {
    if (ui.editor.graph.isEditing()) {
      ui.editor.graph.stopEditing();
    }

    var xml = mxUtils.getXml(ui.editor.getGraphXml());
    var textFile = null;
    try {
      if (Editor.useFileSystemSave) {
        var data = new Blob([xml], { type: 'text/plain' });

        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (textFile !== null) {
          window.URL.revokeObjectURL(textFile);
        }

        textFile = window.URL.createObjectURL(data);

        var link = document.createElement('a');
        if (typeof link.download === 'string') {
          document.body.appendChild(link); // Firefox requires the link to be in the body
          link.download = name;
          link.href = textFile;
          link.click();
          document.body.removeChild(link); // remove the link when done
        } else {
          location.replace(uri);
        }

        return;
      } else if (Editor.useLocalStorage) {
        if (localStorage.getItem(name) != null && !mxUtils.confirm(mxResources.get('replaceIt', [name]))) {
          return;
        }

        localStorage.setItem(name, xml);
        ui.editor.setStatus(mxResources.get('saved') + ' ' + new Date());
      } else if (xml.length < MAX_REQUEST_SIZE) {
        new mxXmlRequest(SAVE_URL, 'filename=' + encodeURIComponent(name) + '&xml=' + encodeURIComponent(xml)).simulate(document, '_blank');
      } else {
        mxUtils.alert(mxResources.get('drawingTooLarge'));
        mxUtils.popup(xml);

        return;
      }

      ui.editor.setModified(false);
      ui.editor.setFilename(name);
      ui.updateDocumentTitle();
    } catch (e) {
      ui.editor.setStatus('Error saving file');
    }
  }
};

module.exports = saveFile;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Constructs a new export dialog.
 */
var ExportDialog = function ExportDialog(editorUi) {
  var graph = editorUi.editor.graph;
  var bounds = graph.getGraphBounds();
  var scale = graph.view.scale;

  var width = Math.ceil(bounds.width / scale);
  var height = Math.ceil(bounds.height / scale);

  var row, td;

  var table = document.createElement('table');
  var tbody = document.createElement('tbody');
  table.setAttribute('cellpadding', mxClient.IS_SF ? '0' : '2');

  row = document.createElement('tr');

  td = document.createElement('td');
  td.style.fontSize = '10pt';
  td.style.width = '100px';
  mxUtils.write(td, mxResources.get('filename') + ':');

  row.appendChild(td);

  var nameInput = document.createElement('input');
  nameInput.setAttribute('value', editorUi.editor.getOrCreateFilename());
  nameInput.style.width = '180px';

  td = document.createElement('td');
  td.appendChild(nameInput);
  row.appendChild(td);

  tbody.appendChild(row);

  row = document.createElement('tr');

  td = document.createElement('td');
  td.style.fontSize = '10pt';
  mxUtils.write(td, mxResources.get('format') + ':');

  row.appendChild(td);

  var imageFormatSelect = document.createElement('select');
  imageFormatSelect.style.width = '180px';

  var pngOption = document.createElement('option');
  pngOption.setAttribute('value', 'png');
  mxUtils.write(pngOption, mxResources.get('formatPng'));
  imageFormatSelect.appendChild(pngOption);

  var gifOption = document.createElement('option');

  if (ExportDialog.showGifOption) {
    gifOption.setAttribute('value', 'gif');
    mxUtils.write(gifOption, mxResources.get('formatGif'));
    imageFormatSelect.appendChild(gifOption);
  }

  var jpgOption = document.createElement('option');
  jpgOption.setAttribute('value', 'jpg');
  mxUtils.write(jpgOption, mxResources.get('formatJpg'));
  imageFormatSelect.appendChild(jpgOption);

  var pdfOption = document.createElement('option');
  pdfOption.setAttribute('value', 'pdf');
  mxUtils.write(pdfOption, mxResources.get('formatPdf'));
  imageFormatSelect.appendChild(pdfOption);

  var svgOption = document.createElement('option');
  svgOption.setAttribute('value', 'svg');
  mxUtils.write(svgOption, mxResources.get('formatSvg'));
  imageFormatSelect.appendChild(svgOption);

  if (ExportDialog.showXmlOption) {
    var xmlOption = document.createElement('option');
    xmlOption.setAttribute('value', 'xml');
    mxUtils.write(xmlOption, mxResources.get('formatXml'));
    imageFormatSelect.appendChild(xmlOption);
  }

  td = document.createElement('td');
  td.appendChild(imageFormatSelect);
  row.appendChild(td);

  tbody.appendChild(row);

  row = document.createElement('tr');

  td = document.createElement('td');
  td.style.fontSize = '10pt';
  mxUtils.write(td, mxResources.get('zoom') + ' (%):');

  row.appendChild(td);

  var zoomInput = document.createElement('input');
  zoomInput.setAttribute('type', 'number');
  zoomInput.setAttribute('value', '100');
  zoomInput.style.width = '180px';

  td = document.createElement('td');
  td.appendChild(zoomInput);
  row.appendChild(td);

  tbody.appendChild(row);

  row = document.createElement('tr');

  td = document.createElement('td');
  td.style.fontSize = '10pt';
  mxUtils.write(td, mxResources.get('width') + ':');

  row.appendChild(td);

  var widthInput = document.createElement('input');
  widthInput.setAttribute('value', width);
  widthInput.style.width = '180px';

  td = document.createElement('td');
  td.appendChild(widthInput);
  row.appendChild(td);

  tbody.appendChild(row);

  row = document.createElement('tr');

  td = document.createElement('td');
  td.style.fontSize = '10pt';
  mxUtils.write(td, mxResources.get('height') + ':');

  row.appendChild(td);

  var heightInput = document.createElement('input');
  heightInput.setAttribute('value', height);
  heightInput.style.width = '180px';

  td = document.createElement('td');
  td.appendChild(heightInput);
  row.appendChild(td);

  tbody.appendChild(row);

  row = document.createElement('tr');

  td = document.createElement('td');
  td.style.fontSize = '10pt';
  mxUtils.write(td, mxResources.get('background') + ':');

  row.appendChild(td);

  var transparentCheckbox = document.createElement('input');
  transparentCheckbox.setAttribute('type', 'checkbox');
  transparentCheckbox.checked = graph.background == null || graph.background == mxConstants.NONE;

  td = document.createElement('td');
  td.appendChild(transparentCheckbox);
  mxUtils.write(td, mxResources.get('transparent'));

  row.appendChild(td);

  tbody.appendChild(row);

  row = document.createElement('tr');

  td = document.createElement('td');
  td.style.fontSize = '10pt';
  mxUtils.write(td, mxResources.get('borderWidth') + ':');

  row.appendChild(td);

  var borderInput = document.createElement('input');
  borderInput.setAttribute('type', 'number');
  borderInput.setAttribute('value', ExportDialog.lastBorderValue);
  borderInput.style.width = '180px';

  td = document.createElement('td');
  td.appendChild(borderInput);
  row.appendChild(td);

  tbody.appendChild(row);
  table.appendChild(tbody);

  // Handles changes in the export format
  function formatChanged() {
    var name = nameInput.value;
    var dot = name.lastIndexOf('.');

    if (dot > 0) {
      nameInput.value = name.substring(0, dot + 1) + imageFormatSelect.value;
    } else {
      nameInput.value = name + '.' + imageFormatSelect.value;
    }

    if (imageFormatSelect.value === 'xml') {
      zoomInput.setAttribute('disabled', 'true');
      widthInput.setAttribute('disabled', 'true');
      heightInput.setAttribute('disabled', 'true');
      borderInput.setAttribute('disabled', 'true');
    } else {
      zoomInput.removeAttribute('disabled');
      widthInput.removeAttribute('disabled');
      heightInput.removeAttribute('disabled');
      borderInput.removeAttribute('disabled');
    }

    if (imageFormatSelect.value === 'png' || imageFormatSelect.value === 'svg') {
      transparentCheckbox.removeAttribute('disabled');
    } else {
      transparentCheckbox.setAttribute('disabled', 'disabled');
    }
  }

  mxEvent.addListener(imageFormatSelect, 'change', formatChanged);
  formatChanged();

  function checkValues() {
    if (widthInput.value * heightInput.value > MAX_AREA || widthInput.value <= 0) {
      widthInput.style.backgroundColor = 'red';
    } else {
      widthInput.style.backgroundColor = '';
    }

    if (widthInput.value * heightInput.value > MAX_AREA || heightInput.value <= 0) {
      heightInput.style.backgroundColor = 'red';
    } else {
      heightInput.style.backgroundColor = '';
    }
  }

  mxEvent.addListener(zoomInput, 'change', function () {
    var s = Math.max(0, parseFloat(zoomInput.value) || 100) / 100;
    zoomInput.value = parseFloat((s * 100).toFixed(2));

    if (width > 0) {
      widthInput.value = Math.floor(width * s);
      heightInput.value = Math.floor(height * s);
    } else {
      zoomInput.value = '100';
      widthInput.value = width;
      heightInput.value = height;
    }

    checkValues();
  });

  mxEvent.addListener(widthInput, 'change', function () {
    var s = parseInt(widthInput.value) / width;

    if (s > 0) {
      zoomInput.value = parseFloat((s * 100).toFixed(2));
      heightInput.value = Math.floor(height * s);
    } else {
      zoomInput.value = '100';
      widthInput.value = width;
      heightInput.value = height;
    }

    checkValues();
  });

  mxEvent.addListener(heightInput, 'change', function () {
    var s = parseInt(heightInput.value) / height;

    if (s > 0) {
      zoomInput.value = parseFloat((s * 100).toFixed(2));
      widthInput.value = Math.floor(width * s);
    } else {
      zoomInput.value = '100';
      widthInput.value = width;
      heightInput.value = height;
    }

    checkValues();
  });

  row = document.createElement('tr');
  td = document.createElement('td');
  td.setAttribute('align', 'right');
  td.style.paddingTop = '22px';
  td.colSpan = 2;

  var saveBtn = mxUtils.button(mxResources.get('export'), mxUtils.bind(this, function () {
    if (parseInt(zoomInput.value) <= 0) {
      mxUtils.alert(mxResources.get('drawingEmpty'));
    } else {
      var name = nameInput.value;
      var format = imageFormatSelect.value;
      var s = Math.max(0, parseFloat(zoomInput.value) || 100) / 100;
      var b = Math.max(0, parseInt(borderInput.value));
      var bg = graph.background;

      if ((format == 'svg' || format == 'png') && transparentCheckbox.checked) {
        bg = null;
      } else if (bg == null || bg == mxConstants.NONE) {
        bg = '#ffffff';
      }

      ExportDialog.lastBorderValue = b;
      ExportDialog.exportFile(editorUi, name, format, bg, s, b);
    }
  }));
  saveBtn.className = 'geBtn gePrimaryBtn';

  var cancelBtn = mxUtils.button(mxResources.get('cancel'), function () {
    editorUi.hideDialog();
  });
  cancelBtn.className = 'geBtn';

  if (editorUi.editor.cancelFirst) {
    td.appendChild(cancelBtn);
    td.appendChild(saveBtn);
  } else {
    td.appendChild(saveBtn);
    td.appendChild(cancelBtn);
  }

  row.appendChild(td);
  tbody.appendChild(row);
  table.appendChild(tbody);
  this.container = table;
};

/**
 * Remembers last value for border.
 */
ExportDialog.lastBorderValue = 0;

/**
 * Global switches for the export dialog.
 */
ExportDialog.showGifOption = true;

/**
 * Global switches for the export dialog.
 */
ExportDialog.showXmlOption = true;

/**
 * Hook for getting the export format. Returns null for the default
 * intermediate XML export format or a function that returns the
 * parameter and value to be used in the request in the form
 * key=value, where value should be URL encoded.
 */
ExportDialog.exportFile = function (editorUi, name, format, bg, s, b) {
  var graph = editorUi.editor.graph;

  if (format == 'xml') {
    ExportDialog.saveLocalFile(editorUi, mxUtils.getXml(editorUi.editor.getGraphXml()), name, format);
  } else if (format == 'svg') {
    ExportDialog.saveLocalFile(editorUi, mxUtils.getXml(graph.getSvg(bg, s, b)), name, format);
  } else if (format == 'png') {
    var triggerDownload = function triggerDownload(imgURI) {
      var evt = new MouseEvent('click', {
        view: window,
        bubbles: false,
        cancelable: true
      });

      var a = document.createElement('a');
      a.setAttribute('download', name);
      a.setAttribute('href', imgURI);
      a.setAttribute('target', '_blank');

      a.dispatchEvent(evt);
    };

    var svgString = mxUtils.getXml(graph.getSvg(bg, s, b));
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var DOMURL = window.URL || window.webkitURL || window;

    var img = new Image();
    var url = 'data:image/svg+xml;charset=utf-8,' + svgString;
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      var png = canvas.toDataURL('image/png');
      DOMURL.revokeObjectURL(png);
      triggerDownload(png);
    };
    img.src = url;
  } else {
    var bounds = graph.getGraphBounds();

    // New image export
    var xmlDoc = mxUtils.createXmlDocument();
    var root = xmlDoc.createElement('output');
    xmlDoc.appendChild(root);

    // Renders graph. Offset will be multiplied with state's scale when painting state.
    var xmlCanvas = new mxXmlCanvas2D(root);
    xmlCanvas.translate(Math.floor((b / s - bounds.x) / graph.view.scale), Math.floor((b / s - bounds.y) / graph.view.scale));
    xmlCanvas.scale(s / graph.view.scale);

    var imgExport = new mxImageExport();
    imgExport.drawState(graph.getView().getState(graph.model.root), xmlCanvas);

    // Puts request data together
    var param = 'xml=' + encodeURIComponent(mxUtils.getXml(root));
    var w = Math.ceil(bounds.width * s / graph.view.scale + 2 * b);
    var h = Math.ceil(bounds.height * s / graph.view.scale + 2 * b);
  }
};

module.exports = ExportDialog;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GeneratorFactory = __webpack_require__(45);

/**
 * Constructs a new Generate Code dialog.
   For examples to add languages, check ExportDialog class
 */
var GenerateCodeDialog = function GenerateCodeDialog(editorUi) {
  var graph = editorUi.editor.graph;
  var bounds = graph.getGraphBounds();
  var scale = graph.view.scale;

  var width = Math.ceil(bounds.width / scale);
  var height = Math.ceil(bounds.height / scale);

  var row, td;

  var table = document.createElement('table');
  var tbody = document.createElement('tbody');
  table.setAttribute('cellpadding', mxClient.IS_SF ? '0' : '2');

  row = document.createElement('tr');

  td = document.createElement('td');
  td.style.fontSize = '10pt';
  td.style.width = '100px';
  mxUtils.write(td, mxResources.get('filename') + ':');

  row.appendChild(td);

  var nameInput = document.createElement('input');
  nameInput.setAttribute('value', editorUi.editor.getOrCreateFilename());
  nameInput.style.width = '180px';

  td = document.createElement('td');
  td.appendChild(nameInput);
  row.appendChild(td);

  tbody.appendChild(row);

  row = document.createElement('tr');

  td = document.createElement('td');
  td.style.fontSize = '10pt';
  mxUtils.write(td, mxResources.get('language') + ':');

  row.appendChild(td);

  var languageSelect = document.createElement('select');
  languageSelect.style.width = '180px';

  var javaOption = document.createElement('option');
  javaOption.setAttribute('value', 'java');
  mxUtils.write(javaOption, mxResources.get('languageJava'));
  languageSelect.appendChild(javaOption);

  td = document.createElement('td');
  td.appendChild(languageSelect);
  row.appendChild(td);

  tbody.appendChild(row);

  table.appendChild(tbody);

  row = document.createElement('tr');
  td = document.createElement('td');
  td.setAttribute('align', 'right');
  td.style.paddingTop = '22px';
  td.colSpan = 2;

  var saveBtn = mxUtils.button(mxResources.get('generate'), mxUtils.bind(this, function () {
    var name = nameInput.value;
    var language = languageSelect.value;
    var generator = new GeneratorFactory(editorUi, name, language).createGenerator();
    generator.generateAndSave();
  }));
  saveBtn.className = 'geBtn gePrimaryBtn';

  var cancelBtn = mxUtils.button(mxResources.get('cancel'), function () {
    editorUi.hideDialog();
  });
  cancelBtn.className = 'geBtn';

  if (editorUi.editor.cancelFirst) {
    td.appendChild(cancelBtn);
    td.appendChild(saveBtn);
  } else {
    td.appendChild(saveBtn);
    td.appendChild(cancelBtn);
  }

  row.appendChild(td);
  tbody.appendChild(row);
  table.appendChild(tbody);
  this.container = table;

  // Handles changes in the export format
  function formatChanged() {
    var name = nameInput.value;
    var dot = name.lastIndexOf('.');

    if (dot > 0) {
      nameInput.value = name.substring(0, dot + 1) + languageSelect.value;
    } else {
      nameInput.value = name + '.' + languageSelect.value;
    }
  }

  mxEvent.addListener(languageSelect, 'change', formatChanged);
  formatChanged();
};

/**
 * Remembers last value for border.
 */
GenerateCodeDialog.lastBorderValue = 0;

module.exports = GenerateCodeDialog;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var JavaGenerator = __webpack_require__(46);

var GeneratorFactory = function GeneratorFactory(editorUi, fileName, language) {
  this.editorUi = editorUi;
  this.fileName = fileName;
  this.language = language;
};

GeneratorFactory.prototype.createGenerator = function () {
  if (this.language === 'java') {
    return new JavaGenerator(this.editorUi, this.fileName);
  }
};

module.exports = GeneratorFactory;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var AbstractGenerator = __webpack_require__(47);

var JavaGenerator = function JavaGenerator(editorUi, fileName) {
  AbstractGenerator.call(this, editorUi, fileName);
};
JavaGenerator.prototype = new AbstractGenerator();

JavaGenerator.prototype.generateCode = function (classAndInterfaceLists) {
  var list = classAndInterfaceLists;

  var str = '';
  for (var key in list) {
    if (list.hasOwnProperty(key)) {
      str += this.generateStringFromClassElement(list[key]);
    }
  }
  return str;
};

/** ============== Generate Class Element String ================================ */
var ClassTemplateGenerator = function ClassTemplateGenerator(className, attributesStr, methodsStr, extendsStr, implementsStr) {
  this.className = className;
  this.attributesStr = attributesStr;
  this.methodsStr = methodsStr;
  this.extendsStr = extendsStr;
  this.implementsStr = implementsStr;
  this.generate = function () {
    return 'class ' + this.className + this.extendsStr + this.implementsStr + ' {\n' + this.attributesStr + '\n' + this.methodsStr + '\n}\n\n';
  };
};

var InterfaceTemplateGenerator = function InterfaceTemplateGenerator(interfaceName, attributesStr, methodsStr) {
  this.interfaceName = interfaceName;
  this.attributesStr = attributesStr;
  this.methodsStr = methodsStr;
  this.generate = function () {
    return 'interface ' + this.interfaceName + ' {\n' + this.attributesStr + '\n' + this.methodsStr + '\n}\n\n';
  };
};

var ClassElementGeneratorFactory = function ClassElementGeneratorFactory(element) {
  var attributesStr = JavaGenerator.prototype.generateStringAttribute(element);
  var methodsStr = JavaGenerator.prototype.generateStringMethod(element);
  var extendsStr = JavaGenerator.prototype.generateStringExtends(element);
  var implementsStr = JavaGenerator.prototype.generateStringImplements(element);

  if (element.type === 'class') {
    var className = element.className;
    return new ClassTemplateGenerator(className, attributesStr, methodsStr, extendsStr, implementsStr);
  }
  if (element.type === 'interface') {
    var interfaceName = element.interfaceName;
    return new InterfaceTemplateGenerator(interfaceName, attributesStr, methodsStr);
  }
};

JavaGenerator.prototype.generateStringFromClassElement = function (element) {
  var attributesStr = this.generateStringAttribute(element);
  var methodsStr = this.generateStringMethod(element);

  var str = ClassElementGeneratorFactory(element).generate();
  return str;
};
/** ============== END Generate Class Element String ================================ */

/** ============== Generate Class Attributes String ================================ */
JavaGenerator.prototype.generateStringAttributeTemplate = function (scopeName, attribute) {
  return '    ' + scopeName + ' ' + attribute.type + ' ' + attribute.attributeName + ';\n';
};

JavaGenerator.prototype.generateStringAttribute = function (element) {
  var attributesStr = '';

  for (var i = 0; i < element.privateAttributes.length; i++) {
    var attribute = element.privateAttributes[i];
    attributesStr += this.generateStringAttributeTemplate('private', attribute);
  }
  for (var i = 0; i < element.publicAttributes.length; i++) {
    var attribute = element.publicAttributes[i];
    attributesStr += this.generateStringAttributeTemplate('public', attribute);
  }
  for (var i = 0; i < element.protectedAttributes.length; i++) {
    var attribute = element.protectedAttributes[i];
    attributesStr += this.generateStringAttributeTemplate('protected', attribute);
  }

  return attributesStr;
};
/** ============== END Generate Class Attributes String ================================ */

/** ============== Generate Class Method String ================================ */
JavaGenerator.prototype.generateMethodTemplate = function (methodScopeName, method) {
  return '    ' + methodScopeName + ' ' + method.returnType + ' ' + method.methodName + ' {\n      /* insert code here */\n    }\n\n';
};

JavaGenerator.prototype.generateStringMethod = function (element) {
  var methodsStr = '';

  for (var i = 0; i < element.privateMethods.length; i++) {
    var method = element.privateMethods[i];
    methodsStr += this.generateMethodTemplate('private', method);
  }

  for (var i = 0; i < element.publicMethods.length; i++) {
    var method = element.publicMethods[i];
    methodsStr += this.generateMethodTemplate('public', method);
  }

  for (var i = 0; i < element.protectedMethods.length; i++) {
    var method = element.protectedMethods[i];
    methodsStr += this.generateMethodTemplate('protected', method);
  }

  return methodsStr;
};
/** ============== END Generate Class Method String ================================ */

/** ============== Generate Implements List ======================================== */
JavaGenerator.prototype.generateStringImplements = function (element) {
  var separator = ',';
  var implementsList = element.implements;
  if (implementsList.length) {
    var implementString = implementsList.join(', ').trim();
    return ' implements ' + implementString;
  }
  return '';
};
/** ============== END Generate Implements List ===================================== */

/** ============== Generate Extends List ======================================== */

// Java can only extend one class.
// TODO: Throw error if extending more than one class
JavaGenerator.prototype.generateStringExtends = function (element) {
  var separator = ',';
  var extendsList = element.extends;
  if (extendsList.length) {
    var extendsString = extendsList[0];
    return ' extends ' + extendsString;
  }
  return '';
};
/** ============== END Generate Extends List ===================================== */

module.exports = JavaGenerator;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Parser = __webpack_require__(48);

var AbstractGenerator = function AbstractGenerator(editorUi, fileName) {
  this.editorUi = editorUi;
  this.fileName = fileName;
  this.classAndInterfaceLists = {}; // key = mxCells id
};

AbstractGenerator.prototype.generateAndSave = function () {
  var ui = this.editorUi;
  var editor = ui.editor;
  var fileName = this.fileName;

  var xmlString = mxUtils.getXml(editor.getGraphXml());
  var xml = this.xmlStringToXml(xmlString);

  var parser = new Parser();
  this.classAndInterfaceLists = parser.parseXmlToclassAndInterfaceList(xml);
  var code = this.generateCode(this.classAndInterfaceLists);

  if (code) {
    this.saveCode(fileName, code);
    ui.hideDialog();
  }
};

AbstractGenerator.prototype.generateCode = function () {
  throw 'Not implemented yet!';
};

AbstractGenerator.prototype.saveCode = function (fileName, code) {
  var data = new Blob([code], { type: 'text/plain' });

  // If we are replacing a previously generated file we need to
  // manually revoke the object URL to avoid memory leaks.
  if (code !== null) {
    window.URL.revokeObjectURL(code);
  }

  code = window.URL.createObjectURL(data);

  var link = document.createElement('a');
  if (typeof link.download === 'string') {
    document.body.appendChild(link); // Firefox requires the link to be in the body
    link.download = fileName;
    link.href = code;
    link.click();
    document.body.removeChild(link); // remove the link when done
  } else {
    location.replace(uri);
  }
};

AbstractGenerator.prototype.xmlStringToXml = function (xmlString) {
  // get the function to parse xmlStr to xml
  var parseXml;

  if (window.DOMParser) {
    parseXml = function parseXml(xmlStr) {
      return new window.DOMParser().parseFromString(xmlStr, 'text/xml');
    };
  } else if (typeof window.ActiveXObject !== 'undefined' && new window.ActiveXObject('Microsoft.XMLDOM')) {
    parseXml = function parseXml(xmlStr) {
      var xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
      xmlDoc.async = 'false';
      xmlDoc.loadXML(xmlStr);
      return xmlDoc;
    };
  } else {
    parseXml = function parseXml() {
      return null;
    };
  }

  return parseXml(xmlString);
};

module.exports = AbstractGenerator;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var strategies = __webpack_require__(49);

var ClassOrInterfaceStrategy = strategies.ClassOrInterfaceStrategy;
var AttributeStrategy = strategies.AttributeStrategy;
var MethodStrategy = strategies.MethodStrategy;
var GeneralizationStrategy = strategies.GeneralizationStrategy;

var Parser = function Parser() {
  this.elements = {};
  this.classAndInterfaceLists = {};
  this.generalizationList = [];
};

Parser.prototype.parseXmlToclassAndInterfaceList = function (xml) {
  var parser = this;

  var mxCells = xml.getElementsByTagName('mxCell');

  // Remove the first 2 because they are the canvas elements
  for (var id = 2; id < mxCells.length; id++) {
    var mxCell = mxCells[id];
    var componentName = parser.getComponentNameFromCell(mxCell);
    if (componentName) {
      this.doAction(mxCell, componentName);
      this.elements[id] = mxCell;
    }
  }

  // normalize the generalizationLists
  this.generalizationList = this.generalizationList.map(function (el) {
    var newSource = parser.getAttributeOrMethodParent(el.source);
    var newTarget = parser.getAttributeOrMethodParent(el.target);

    return { source: newSource, target: newTarget };
  });

  // merge the generalizationLists to classAndInterfaceLists
  for (id in this.generalizationList) {
    var element = this.generalizationList[id];
    var targetCell = this.elements[element.target];
    var targetCellId = targetCell.getAttribute('id');
    var targetComponentName = this.getComponentNameFromCell(targetCell);

    if (targetComponentName === 'class') {
      var targetClassName = this.classAndInterfaceLists[targetCellId].className;
      this.classAndInterfaceLists[element.source].extends.push(targetClassName);
    } else if (targetComponentName === 'interface') {
      var targetInterfaceName = this.classAndInterfaceLists[targetCellId].interfaceName;
      this.classAndInterfaceLists[element.source].implements.push(targetInterfaceName);
    }
  }

  return this.classAndInterfaceLists;
};

/** CHAIN OF RESPONSIBILITY PATTERN */
Parser.prototype.doAction = function (mxCell, componentName) {
  var parser = this;

  var parseStrategyPipeline = {
    handleRequest: function handleRequest(parser, mxCell, componentName) {
      var classOrInterfaceStrategy = new ClassOrInterfaceStrategy();
      var attributeStrategy = new AttributeStrategy();
      var methodStrategy = new MethodStrategy();
      var generalizationStrategy = new GeneralizationStrategy();

      classOrInterfaceStrategy.setNext(attributeStrategy).setNext(methodStrategy).setNext(generalizationStrategy);

      classOrInterfaceStrategy.handleRequest(parser, mxCell, componentName);
    }
  };

  parseStrategyPipeline.handleRequest(parser, mxCell, componentName);
};

Parser.prototype.generateAndPushClassOrInterfaceElement = function (mxCell, componentName) {
  var initialState = {
    privateAttributes: [],
    publicAttributes: [],
    protectedAttributes: [],
    privateMethods: [],
    publicMethods: [],
    protectedMethods: [],
    implements: [],
    extends: []
  };

  var generateElement = function generateElement(mxCell, componentName) {
    if (componentName === 'class') {
      return Object.assign({
        type: 'class',
        className: mxCell.getAttribute('value')
      }, initialState);
    } else if (componentName === 'interface') {
      return Object.assign({
        type: 'interface',
        interfaceName: mxCell.getAttribute('value').split(' ')[1]
      }, initialState);
    }
  };

  var id = mxCell.getAttribute('id');
  this.classAndInterfaceLists[id] = generateElement(mxCell, componentName);
};

Parser.prototype.pushAttribute = function (mxCell) {
  var value = mxCell.getAttribute('value');
  var parent = mxCell.getAttribute('parent');
  var parts = value.split(' ');
  var accessibility = parts[0];
  var attribute = {
    attributeName: parts[1].slice(0, -1),
    type: parts[2]
  };
  if (accessibility === '+') {
    this.classAndInterfaceLists[parent].publicAttributes.push(attribute);
  } else if (accessibility === '-') {
    this.classAndInterfaceLists[parent].privateAttributes.push(attribute);
  } else if (accessibility === '#') {
    this.classAndInterfaceLists[parent].protectedAttributes.push(attribute);
  }
};

Parser.prototype.pushMethod = function (mxCell) {
  var value = mxCell.getAttribute('value');
  var parent = mxCell.getAttribute('parent');
  var parts = value.split(' ');
  var accessibility = parts[0];
  var method = {
    methodName: parts[1].slice(0, -1),
    returnType: parts[2]
  };
  if (accessibility === '+') {
    this.classAndInterfaceLists[parent].publicMethods.push(method);
  } else if (accessibility === '-') {
    this.classAndInterfaceLists[parent].privateMethods.push(method);
  } else if (accessibility === '#') {
    this.classAndInterfaceLists[parent].protectedMethods.push(method);
  }
};

Parser.prototype.pushGeneralization = function (mxCell) {
  var source = mxCell.getAttribute('source');
  var target = mxCell.getAttribute('target');
  this.generalizationList.push({ source: source, target: target });
};

/** Most of the time, the generalization arrow is gonna connect to an attribute
 * or method. If it happens, we are gonna change it to the parent
 */
Parser.prototype.getAttributeOrMethodParent = function (elementId) {
  var mxCell = this.elements[elementId];
  var parentId = mxCell.getAttribute('parent');

  // parentId == 1 is the root. if it is 1, it means it is not class/interface
  // else, we return the parentId;
  if (parentId === '1') {
    return elementId;
  }
  return parentId;
};

Parser.prototype.getComponentNameFromStyle = function (style) {
  var elements = style.split(';');
  var index = -1;
  for (var i = 0; i < elements.length && index === -1; i++) {
    if (elements[i].indexOf('componentName') >= 0) {
      index = i;
    }
  }
  var componentName = null;
  if (index >= 0) {
    componentName = elements[index].split('=')[1];
  }
  return componentName;
};

Parser.prototype.getComponentNameFromCell = function (mxCell) {
  var style = mxCell.getAttribute('style');
  return this.getComponentNameFromStyle(style);
};

module.exports = Parser;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeneralizationStrategy = exports.MethodStrategy = exports.AttributeStrategy = exports.ClassOrInterfaceStrategy = undefined;

var _ClassOrInterfaceStrategy = __webpack_require__(50);

var _ClassOrInterfaceStrategy2 = _interopRequireDefault(_ClassOrInterfaceStrategy);

var _AttributeStrategy = __webpack_require__(51);

var _AttributeStrategy2 = _interopRequireDefault(_AttributeStrategy);

var _MethodStrategy = __webpack_require__(52);

var _MethodStrategy2 = _interopRequireDefault(_MethodStrategy);

var _GeneralizationStrategy = __webpack_require__(53);

var _GeneralizationStrategy2 = _interopRequireDefault(_GeneralizationStrategy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ClassOrInterfaceStrategy = _ClassOrInterfaceStrategy2.default;
exports.AttributeStrategy = _AttributeStrategy2.default;
exports.MethodStrategy = _MethodStrategy2.default;
exports.GeneralizationStrategy = _GeneralizationStrategy2.default;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Handler2 = __webpack_require__(4);

var _Handler3 = _interopRequireDefault(_Handler2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClassOrInterfaceStrategy = function (_Handler) {
  _inherits(ClassOrInterfaceStrategy, _Handler);

  function ClassOrInterfaceStrategy() {
    _classCallCheck(this, ClassOrInterfaceStrategy);

    return _possibleConstructorReturn(this, (ClassOrInterfaceStrategy.__proto__ || Object.getPrototypeOf(ClassOrInterfaceStrategy)).apply(this, arguments));
  }

  _createClass(ClassOrInterfaceStrategy, [{
    key: 'handleRequest',
    value: function handleRequest(parser, mxCell, componentName) {
      if (componentName === 'class' || componentName === 'interface') {
        return parser.generateAndPushClassOrInterfaceElement(mxCell, componentName);
      }
      return this.next.handleRequest(parser, mxCell, componentName);
    }
  }]);

  return ClassOrInterfaceStrategy;
}(_Handler3.default);

exports.default = ClassOrInterfaceStrategy;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Handler2 = __webpack_require__(4);

var _Handler3 = _interopRequireDefault(_Handler2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AttributeStrategy = function (_Handler) {
  _inherits(AttributeStrategy, _Handler);

  function AttributeStrategy() {
    _classCallCheck(this, AttributeStrategy);

    return _possibleConstructorReturn(this, (AttributeStrategy.__proto__ || Object.getPrototypeOf(AttributeStrategy)).apply(this, arguments));
  }

  _createClass(AttributeStrategy, [{
    key: 'handleRequest',
    value: function handleRequest(parser, mxCell, componentName) {
      if (componentName === 'attribute') {
        return parser.pushAttribute(mxCell);
      }
      return this.next.handleRequest(parser, mxCell, componentName);
    }
  }]);

  return AttributeStrategy;
}(_Handler3.default);

exports.default = AttributeStrategy;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Handler2 = __webpack_require__(4);

var _Handler3 = _interopRequireDefault(_Handler2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MethodStrategy = function (_Handler) {
  _inherits(MethodStrategy, _Handler);

  function MethodStrategy() {
    _classCallCheck(this, MethodStrategy);

    return _possibleConstructorReturn(this, (MethodStrategy.__proto__ || Object.getPrototypeOf(MethodStrategy)).apply(this, arguments));
  }

  _createClass(MethodStrategy, [{
    key: 'handleRequest',
    value: function handleRequest(parser, mxCell, componentName) {
      if (componentName === 'method') {
        return parser.pushMethod(mxCell);
      }
      return this.next.handleRequest(parser, mxCell, componentName);
    }
  }]);

  return MethodStrategy;
}(_Handler3.default);

exports.default = MethodStrategy;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Handler2 = __webpack_require__(4);

var _Handler3 = _interopRequireDefault(_Handler2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GeneralizationStrategy = function (_Handler) {
  _inherits(GeneralizationStrategy, _Handler);

  function GeneralizationStrategy() {
    _classCallCheck(this, GeneralizationStrategy);

    return _possibleConstructorReturn(this, (GeneralizationStrategy.__proto__ || Object.getPrototypeOf(GeneralizationStrategy)).apply(this, arguments));
  }

  _createClass(GeneralizationStrategy, [{
    key: 'handleRequest',
    value: function handleRequest(parser, mxCell, componentName) {
      if (componentName === 'generalization') {
        return parser.pushGeneralization(mxCell);
      }
      return this.next.handleRequest(parser, mxCell, componentName);
    }
  }]);

  return GeneralizationStrategy;
}(_Handler3.default);

exports.default = GeneralizationStrategy;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EditorUi = __webpack_require__(16);

/**
 * Copyright (c) 2006-2012, JGraph Ltd
 */
/**
 * Construcs a new toolbar for the given editor.
 */
function Toolbar(editorUi, container) {
  this.editorUi = editorUi;
  this.container = container;
  this.staticElements = [];
  this.init();

  // Global handler to hide the current menu
  this.gestureHandler = mxUtils.bind(this, function (evt) {
    if (this.editorUi.currentMenu != null && mxEvent.getSource(evt) != this.editorUi.currentMenu.div) {
      this.hideMenu();
    }
  });

  mxEvent.addGestureListeners(document, this.gestureHandler);
}

/**
 * Image for the dropdown arrow.
 */
Toolbar.prototype.dropdownImage = !mxClient.IS_SVG ? IMAGE_PATH + '/dropdown.gif' : 'data:image/gif;base64,R0lGODlhDQANAIABAHt7e////yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCREM1NkJFMjE0NEMxMUU1ODk1Q0M5MjQ0MTA4QjNDMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCREM1NkJFMzE0NEMxMUU1ODk1Q0M5MjQ0MTA4QjNDMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQzOUMzMjZCMTQ0QjExRTU4OTVDQzkyNDQxMDhCM0MxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQzOUMzMjZDMTQ0QjExRTU4OTVDQzkyNDQxMDhCM0MxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAQAsAAAAAA0ADQAAAhGMj6nL3QAjVHIu6azbvPtWAAA7';

/**
 * Image element for the dropdown arrow.
 */
Toolbar.prototype.dropdownImageHtml = '<img border="0" style="position:absolute;right:4px;top:' + (!EditorUi.compactUi ? 8 : 6) + 'px;" src="' + Toolbar.prototype.dropdownImage + '" valign="middle"/>';

/**
 * Defines the background for selected buttons.
 */
Toolbar.prototype.selectedBackground = '#d0d0d0';

/**
 * Defines the background for selected buttons.
 */
Toolbar.prototype.unselectedBackground = 'none';

/**
 * Array that contains the DOM nodes that should never be removed.
 */
Toolbar.prototype.staticElements = null;

/**
 * Adds the toolbar elements.
 */
Toolbar.prototype.init = function () {
  var sw = screen.width;

  // Takes into account initial compact mode
  sw -= screen.height > 740 ? 56 : 0;

  if (sw >= 700) {
    var formatMenu = this.addMenu('', mxResources.get('view') + ' (' + mxResources.get('panTooltip') + ')', true, 'viewPanels', null, true);
    this.addDropDownArrow(formatMenu, 'geSprite-formatpanel', 38, 50, -4, -3, 36, -8);
    this.addSeparator();
  }

  var viewMenu = this.addMenu('', mxResources.get('zoom') + ' (Alt+Mousewheel)', true, 'viewZoom', null, true);
  viewMenu.showDisabled = true;
  viewMenu.style.whiteSpace = 'nowrap';
  viewMenu.style.position = 'relative';
  viewMenu.style.overflow = 'hidden';

  if (EditorUi.compactUi) {
    viewMenu.style.width = mxClient.IS_QUIRKS ? '58px' : '50px';
  } else {
    viewMenu.style.width = mxClient.IS_QUIRKS ? '62px' : '36px';
  }

  if (sw >= 420) {
    this.addSeparator();
    var elts = this.addItems(['zoomIn', 'zoomOut']);
    elts[0].setAttribute('title', mxResources.get('zoomIn') + ' (' + this.editorUi.actions.get('zoomIn').shortcut + ')');
    elts[1].setAttribute('title', mxResources.get('zoomOut') + ' (' + this.editorUi.actions.get('zoomOut').shortcut + ')');
  }

  // Updates the label if the scale changes
  this.updateZoom = mxUtils.bind(this, function () {
    viewMenu.innerHTML = Math.round(this.editorUi.editor.graph.view.scale * 100) + '%' + this.dropdownImageHtml;

    if (EditorUi.compactUi) {
      viewMenu.getElementsByTagName('img')[0].style.right = '1px';
      viewMenu.getElementsByTagName('img')[0].style.top = '5px';
    }
  });

  this.editorUi.editor.graph.view.addListener(mxEvent.EVENT_SCALE, this.updateZoom);
  this.editorUi.editor.addListener('resetGraphView', this.updateZoom);

  var elts = this.addItems(['-', 'undo', 'redo']);
  elts[1].setAttribute('title', mxResources.get('undo') + ' (' + this.editorUi.actions.get('undo').shortcut + ')');
  elts[2].setAttribute('title', mxResources.get('redo') + ' (' + this.editorUi.actions.get('redo').shortcut + ')');

  if (sw >= 470) {
    var elts = this.addItems(['-', 'delete']);
    elts[1].setAttribute('title', mxResources.get('delete') + ' (' + this.editorUi.actions.get('delete').shortcut + ')');
  }

  if (sw >= 550) {
    this.addItems(['-', 'toFront', 'toBack']);
  }

  if (sw >= 640) {
    this.addItems(['-', 'fillColor', 'strokeColor', 'shadow']);
  }

  if (sw >= 320) {
    this.addSeparator();

    this.edgeShapeMenu = this.addMenuFunction('', mxResources.get('connection'), false, mxUtils.bind(this, function (menu) {
      this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_SHAPE, 'width'], [null, null], 'geIcon geSprite geSprite-connection', null, true).setAttribute('title', mxResources.get('line'));
      this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_SHAPE, 'width'], ['link', null], 'geIcon geSprite geSprite-linkedge', null, true).setAttribute('title', mxResources.get('link'));
      this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_SHAPE, 'width'], ['flexArrow', null], 'geIcon geSprite geSprite-arrow', null, true).setAttribute('title', mxResources.get('arrow'));
      this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_SHAPE, 'width'], ['arrow', null], 'geIcon geSprite geSprite-simplearrow', null, true).setAttribute('title', mxResources.get('simpleArrow'));
    }));

    this.addDropDownArrow(this.edgeShapeMenu, 'geSprite-connection', 44, 50, 0, 0, 22, -4);

    this.edgeStyleMenu = this.addMenuFunction('geSprite-orthogonal', mxResources.get('waypoints'), false, mxUtils.bind(this, function (menu) {
      this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], [null, null, null], 'geIcon geSprite geSprite-straight', null, true).setAttribute('title', mxResources.get('straight'));
      this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ['orthogonalEdgeStyle', null, null], 'geIcon geSprite geSprite-orthogonal', null, true).setAttribute('title', mxResources.get('orthogonal'));
      this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ['elbowEdgeStyle', null, null, null], 'geIcon geSprite geSprite-horizontalelbow', null, true).setAttribute('title', mxResources.get('simple'));
      this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ['elbowEdgeStyle', 'vertical', null, null], 'geIcon geSprite geSprite-verticalelbow', null, true).setAttribute('title', mxResources.get('simple'));
      this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ['isometricEdgeStyle', null, null, null], 'geIcon geSprite geSprite-horizontalisometric', null, true).setAttribute('title', mxResources.get('isometric'));
      this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ['isometricEdgeStyle', 'vertical', null, null], 'geIcon geSprite geSprite-verticalisometric', null, true).setAttribute('title', mxResources.get('isometric'));
      this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ['orthogonalEdgeStyle', '1', null], 'geIcon geSprite geSprite-curved', null, true).setAttribute('title', mxResources.get('curved'));
      this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ['entityRelationEdgeStyle', null, null], 'geIcon geSprite geSprite-entity', null, true).setAttribute('title', mxResources.get('entityRelation'));
    }));

    this.addDropDownArrow(this.edgeStyleMenu, 'geSprite-orthogonal', 44, 50, 0, 0, 22, -4);
  }

  this.addSeparator();

  var insertMenu = this.addMenu('', mxResources.get('insert') + ' (' + mxResources.get('doubleClickTooltip') + ')', true, 'insert', null, true);
  this.addDropDownArrow(insertMenu, 'geSprite-plus', 38, 48, -4, -3, 36, -8);
};

/**
 * Adds the toolbar elements.
 */
Toolbar.prototype.addDropDownArrow = function (menu, sprite, width, atlasWidth, left, top, atlasDelta, atlasLeft) {
  atlasDelta = atlasDelta != null ? atlasDelta : 32;
  left = EditorUi.compactUi ? left : atlasLeft;

  menu.style.whiteSpace = 'nowrap';
  menu.style.overflow = 'hidden';
  menu.style.position = 'relative';
  menu.innerHTML = '<div class="geSprite ' + sprite + '" style="margin-left:' + left + 'px;margin-top:' + top + 'px;"></div>' + this.dropdownImageHtml;
  menu.style.width = mxClient.IS_QUIRKS ? atlasWidth + 'px' : atlasWidth - atlasDelta + 'px';

  if (mxClient.IS_QUIRKS) {
    menu.style.height = EditorUi.compactUi ? '24px' : '26px';
  }

  // Fix for item size in kennedy theme
  if (EditorUi.compactUi) {
    menu.getElementsByTagName('img')[0].style.left = '24px';
    menu.getElementsByTagName('img')[0].style.top = '5px';
    menu.style.width = mxClient.IS_QUIRKS ? width + 'px' : width - 10 + 'px';
  }
};

/**
 * Sets the current font name.
 */
Toolbar.prototype.setFontName = function (value) {
  if (this.fontMenu != null) {
    this.fontMenu.innerHTML = '<div style="width:60px;overflow:hidden;display:inline-block;">' + mxUtils.htmlEntities(value) + '</div>' + this.dropdownImageHtml;
  }
};

/**
 * Sets the current font name.
 */
Toolbar.prototype.setFontSize = function (value) {
  if (this.sizeMenu != null) {
    this.sizeMenu.innerHTML = '<div style="width:24px;overflow:hidden;display:inline-block;">' + value + '</div>' + this.dropdownImageHtml;
  }
};

/**
 * Hides the current menu.
 */
Toolbar.prototype.createTextToolbar = function () {
  var graph = this.editorUi.editor.graph;

  var styleElt = this.addMenu('', mxResources.get('style'), true, 'formatBlock');
  styleElt.style.position = 'relative';
  styleElt.style.whiteSpace = 'nowrap';
  styleElt.style.overflow = 'hidden';
  styleElt.innerHTML = mxResources.get('style') + this.dropdownImageHtml;

  if (EditorUi.compactUi) {
    styleElt.style.paddingRight = '18px';
    styleElt.getElementsByTagName('img')[0].style.right = '1px';
    styleElt.getElementsByTagName('img')[0].style.top = '5px';
  }

  this.addSeparator();

  this.fontMenu = this.addMenu('', mxResources.get('fontFamily'), true, 'fontFamily');
  this.fontMenu.style.position = 'relative';
  this.fontMenu.style.whiteSpace = 'nowrap';
  this.fontMenu.style.overflow = 'hidden';
  this.fontMenu.style.width = mxClient.IS_QUIRKS ? '80px' : '60px';

  this.setFontName(Menus.prototype.defaultFont);

  if (EditorUi.compactUi) {
    this.fontMenu.style.paddingRight = '18px';
    this.fontMenu.getElementsByTagName('img')[0].style.right = '1px';
    this.fontMenu.getElementsByTagName('img')[0].style.top = '5px';
  }

  this.addSeparator();

  this.sizeMenu = this.addMenu(Menus.prototype.defaultFontSize, mxResources.get('fontSize'), true, 'fontSize');
  this.sizeMenu.style.position = 'relative';
  this.sizeMenu.style.whiteSpace = 'nowrap';
  this.sizeMenu.style.overflow = 'hidden';
  this.sizeMenu.style.width = mxClient.IS_QUIRKS ? '44px' : '24px';

  this.setFontSize(Menus.prototype.defaultFontSize);

  if (EditorUi.compactUi) {
    this.sizeMenu.style.paddingRight = '18px';
    this.sizeMenu.getElementsByTagName('img')[0].style.right = '1px';
    this.sizeMenu.getElementsByTagName('img')[0].style.top = '5px';
  }

  var elts = this.addItems(['-', 'undo', 'redo', '-', 'bold', 'italic', 'underline']);
  elts[1].setAttribute('title', mxResources.get('undo') + ' (' + this.editorUi.actions.get('undo').shortcut + ')');
  elts[2].setAttribute('title', mxResources.get('redo') + ' (' + this.editorUi.actions.get('redo').shortcut + ')');
  elts[4].setAttribute('title', mxResources.get('bold') + ' (' + this.editorUi.actions.get('bold').shortcut + ')');
  elts[5].setAttribute('title', mxResources.get('italic') + ' (' + this.editorUi.actions.get('italic').shortcut + ')');
  elts[6].setAttribute('title', mxResources.get('underline') + ' (' + this.editorUi.actions.get('underline').shortcut + ')');

  // KNOWN: Lost focus after click on submenu with text (not icon) in quirks and IE8. This is because the TD seems
  // to catch the focus on click in these browsers. NOTE: Workaround in mxPopupMenu for icon items (without text).
  var alignMenu = this.addMenuFunction('', mxResources.get('align'), false, mxUtils.bind(this, function (menu) {
    elt = menu.addItem('', null, mxUtils.bind(this, function () {
      document.execCommand('justifyleft', false, null);
    }), null, 'geIcon geSprite geSprite-left');
    elt.setAttribute('title', mxResources.get('left'));

    elt = menu.addItem('', null, mxUtils.bind(this, function () {
      document.execCommand('justifycenter', false, null);
    }), null, 'geIcon geSprite geSprite-center');
    elt.setAttribute('title', mxResources.get('center'));

    elt = menu.addItem('', null, mxUtils.bind(this, function () {
      document.execCommand('justifyright', false, null);
    }), null, 'geIcon geSprite geSprite-right');
    elt.setAttribute('title', mxResources.get('right'));

    elt = menu.addItem('', null, mxUtils.bind(this, function () {
      document.execCommand('justifyfull', false, null);
    }), null, 'geIcon geSprite geSprite-justifyfull');
    elt.setAttribute('title', mxResources.get('justifyfull'));

    elt = menu.addItem('', null, mxUtils.bind(this, function () {
      document.execCommand('insertorderedlist', false, null);
    }), null, 'geIcon geSprite geSprite-orderedlist');
    elt.setAttribute('title', mxResources.get('numberedList'));

    elt = menu.addItem('', null, mxUtils.bind(this, function () {
      document.execCommand('insertunorderedlist', false, null);
    }), null, 'geIcon geSprite geSprite-unorderedlist');
    elt.setAttribute('title', mxResources.get('bulletedList'));

    elt = menu.addItem('', null, mxUtils.bind(this, function () {
      document.execCommand('outdent', false, null);
    }), null, 'geIcon geSprite geSprite-outdent');
    elt.setAttribute('title', mxResources.get('decreaseIndent'));

    elt = menu.addItem('', null, mxUtils.bind(this, function () {
      document.execCommand('indent', false, null);
    }), null, 'geIcon geSprite geSprite-indent');
    elt.setAttribute('title', mxResources.get('increaseIndent'));
  }));

  alignMenu.style.position = 'relative';
  alignMenu.style.whiteSpace = 'nowrap';
  alignMenu.style.overflow = 'hidden';
  alignMenu.innerHTML = '<div class="geSprite geSprite-left" style="margin-left:-2px;"></div>' + this.dropdownImageHtml;
  alignMenu.style.width = mxClient.IS_QUIRKS ? '50px' : '30px';

  if (EditorUi.compactUi) {
    alignMenu.getElementsByTagName('img')[0].style.left = '22px';
    alignMenu.getElementsByTagName('img')[0].style.top = '5px';
  }

  var formatMenu = this.addMenuFunction('', mxResources.get('format'), false, mxUtils.bind(this, function (menu) {
    elt = menu.addItem('', null, this.editorUi.actions.get('subscript').funct, null, 'geIcon geSprite geSprite-subscript');
    elt.setAttribute('title', mxResources.get('subscript') + ' (Ctrl+,)');

    elt = menu.addItem('', null, this.editorUi.actions.get('superscript').funct, null, 'geIcon geSprite geSprite-superscript');
    elt.setAttribute('title', mxResources.get('superscript') + ' (Ctrl+.)');

    // KNOWN: IE+FF don't return keyboard focus after color dialog (calling focus doesn't help)
    elt = menu.addItem('', null, this.editorUi.actions.get('fontColor').funct, null, 'geIcon geSprite geSprite-fontcolor');
    elt.setAttribute('title', mxResources.get('fontColor'));

    elt = menu.addItem('', null, this.editorUi.actions.get('backgroundColor').funct, null, 'geIcon geSprite geSprite-fontbackground');
    elt.setAttribute('title', mxResources.get('backgroundColor'));

    elt = menu.addItem('', null, mxUtils.bind(this, function () {
      document.execCommand('removeformat', false, null);
    }), null, 'geIcon geSprite geSprite-removeformat');
    elt.setAttribute('title', mxResources.get('removeFormat'));
  }));

  formatMenu.style.position = 'relative';
  formatMenu.style.whiteSpace = 'nowrap';
  formatMenu.style.overflow = 'hidden';
  formatMenu.innerHTML = '<div class="geSprite geSprite-dots" style="margin-left:-2px;"></div>' + this.dropdownImageHtml;
  formatMenu.style.width = mxClient.IS_QUIRKS ? '50px' : '30px';

  if (EditorUi.compactUi) {
    formatMenu.getElementsByTagName('img')[0].style.left = '22px';
    formatMenu.getElementsByTagName('img')[0].style.top = '5px';
  }

  this.addSeparator();

  this.addButton('geIcon geSprite geSprite-code', mxResources.get('html'), function () {
    graph.cellEditor.toggleViewMode();

    if (graph.cellEditor.textarea.innerHTML.length > 0 && (graph.cellEditor.textarea.innerHTML != '&nbsp;' || !graph.cellEditor.clearOnChange)) {
      window.setTimeout(function () {
        document.execCommand('selectAll', false, null);
      });
    }
  });

  this.addSeparator();

  // FIXME: Uses geButton here and geLabel in main menu
  var insertMenu = this.addMenuFunction('', mxResources.get('insert'), true, mxUtils.bind(this, function (menu) {
    menu.addItem(mxResources.get('insertLink'), null, mxUtils.bind(this, function () {
      this.editorUi.actions.get('link').funct();
    }));

    menu.addItem(mxResources.get('insertImage'), null, mxUtils.bind(this, function () {
      this.editorUi.actions.get('image').funct();
    }));

    menu.addItem(mxResources.get('insertHorizontalRule'), null, mxUtils.bind(this, function () {
      document.execCommand('inserthorizontalrule', false, null);
    }));
  }));

  insertMenu.style.whiteSpace = 'nowrap';
  insertMenu.style.overflow = 'hidden';
  insertMenu.style.position = 'relative';
  insertMenu.innerHTML = '<div class="geSprite geSprite-plus" style="margin-left:-4px;margin-top:-3px;"></div>' + this.dropdownImageHtml;
  insertMenu.style.width = mxClient.IS_QUIRKS ? '36px' : '16px';

  // Fix for item size in kennedy theme
  if (EditorUi.compactUi) {
    insertMenu.getElementsByTagName('img')[0].style.left = '24px';
    insertMenu.getElementsByTagName('img')[0].style.top = '5px';
    insertMenu.style.width = mxClient.IS_QUIRKS ? '50px' : '30px';
  }

  this.addSeparator();

  // KNOWN: All table stuff does not work with undo/redo
  // KNOWN: Lost focus after click on submenu with text (not icon) in quirks and IE8. This is because the TD seems
  // to catch the focus on click in these browsers. NOTE: Workaround in mxPopupMenu for icon items (without text).
  var elt = this.addMenuFunction('geIcon geSprite geSprite-table', mxResources.get('table'), false, mxUtils.bind(this, function (menu) {
    var elt = graph.getSelectedElement();
    var cell = graph.getParentByName(elt, 'TD', graph.cellEditor.text2);
    var row = graph.getParentByName(elt, 'TR', graph.cellEditor.text2);

    if (row == null) {
      this.editorUi.menus.addInsertTableItem(menu);
    } else {
      var table = graph.getParentByName(row, 'TABLE', graph.cellEditor.text2);

      elt = menu.addItem('', null, mxUtils.bind(this, function () {
        try {
          graph.selectNode(graph.insertColumn(table, cell != null ? cell.cellIndex : 0));
        } catch (e) {
          mxUtils.alert(mxResources.get('error') + ': ' + e.message);
        }
      }), null, 'geIcon geSprite geSprite-insertcolumnbefore');
      elt.setAttribute('title', mxResources.get('insertColumnBefore'));

      elt = menu.addItem('', null, mxUtils.bind(this, function () {
        try {
          graph.selectNode(graph.insertColumn(table, cell != null ? cell.cellIndex + 1 : -1));
        } catch (e) {
          mxUtils.alert(mxResources.get('error') + ': ' + e.message);
        }
      }), null, 'geIcon geSprite geSprite-insertcolumnafter');
      elt.setAttribute('title', mxResources.get('insertColumnAfter'));

      elt = menu.addItem('Delete column', null, mxUtils.bind(this, function () {
        if (cell != null) {
          try {
            graph.deleteColumn(table, cell.cellIndex);
          } catch (e) {
            mxUtils.alert(mxResources.get('error') + ': ' + e.message);
          }
        }
      }), null, 'geIcon geSprite geSprite-deletecolumn');
      elt.setAttribute('title', mxResources.get('deleteColumn'));

      elt = menu.addItem('', null, mxUtils.bind(this, function () {
        try {
          graph.selectNode(graph.insertRow(table, row.sectionRowIndex));
        } catch (e) {
          mxUtils.alert(mxResources.get('error') + ': ' + e.message);
        }
      }), null, 'geIcon geSprite geSprite-insertrowbefore');
      elt.setAttribute('title', mxResources.get('insertRowBefore'));

      elt = menu.addItem('', null, mxUtils.bind(this, function () {
        try {
          graph.selectNode(graph.insertRow(table, row.sectionRowIndex + 1));
        } catch (e) {
          mxUtils.alert(mxResources.get('error') + ': ' + e.message);
        }
      }), null, 'geIcon geSprite geSprite-insertrowafter');
      elt.setAttribute('title', mxResources.get('insertRowAfter'));

      elt = menu.addItem('', null, mxUtils.bind(this, function () {
        try {
          graph.deleteRow(table, row.sectionRowIndex);
        } catch (e) {
          mxUtils.alert(mxResources.get('error') + ': ' + e.message);
        }
      }), null, 'geIcon geSprite geSprite-deleterow');
      elt.setAttribute('title', mxResources.get('deleteRow'));

      elt = menu.addItem('', null, mxUtils.bind(this, function () {
        // Converts rgb(r,g,b) values
        var color = table.style.borderColor.replace(/\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g, function ($0, $1, $2, $3) {
          return '#' + ('0' + Number($1).toString(16)).substr(-2) + ('0' + Number($2).toString(16)).substr(-2) + ('0' + Number($3).toString(16)).substr(-2);
        });
        this.editorUi.pickColor(color, function (newColor) {
          if (newColor == null || newColor == mxConstants.NONE) {
            table.removeAttribute('border');
            table.style.border = '';
            table.style.borderCollapse = '';
          } else {
            table.setAttribute('border', '1');
            table.style.border = '1px solid ' + newColor;
            table.style.borderCollapse = 'collapse';
          }
        });
      }), null, 'geIcon geSprite geSprite-strokecolor');
      elt.setAttribute('title', mxResources.get('borderColor'));

      elt = menu.addItem('', null, mxUtils.bind(this, function () {
        // Converts rgb(r,g,b) values
        var color = table.style.backgroundColor.replace(/\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g, function ($0, $1, $2, $3) {
          return '#' + ('0' + Number($1).toString(16)).substr(-2) + ('0' + Number($2).toString(16)).substr(-2) + ('0' + Number($3).toString(16)).substr(-2);
        });
        this.editorUi.pickColor(color, function (newColor) {
          if (newColor == null || newColor == mxConstants.NONE) {
            table.style.backgroundColor = '';
          } else {
            table.style.backgroundColor = newColor;
          }
        });
      }), null, 'geIcon geSprite geSprite-fillcolor');
      elt.setAttribute('title', mxResources.get('backgroundColor'));

      elt = menu.addItem('', null, mxUtils.bind(this, function () {
        var value = table.getAttribute('cellPadding') || 0;

        var dlg = new FilenameDialog(this.editorUi, value, mxResources.get('apply'), mxUtils.bind(this, function (newValue) {
          if (newValue != null && newValue.length > 0) {
            table.setAttribute('cellPadding', newValue);
          } else {
            table.removeAttribute('cellPadding');
          }
        }), mxResources.get('spacing'));
        this.editorUi.showDialog(dlg.container, 300, 80, true, true);
        dlg.init();
      }), null, 'geIcon geSprite geSprite-fit');
      elt.setAttribute('title', mxResources.get('spacing'));

      elt = menu.addItem('', null, mxUtils.bind(this, function () {
        table.setAttribute('align', 'left');
      }), null, 'geIcon geSprite geSprite-left');
      elt.setAttribute('title', mxResources.get('left'));

      elt = menu.addItem('', null, mxUtils.bind(this, function () {
        table.setAttribute('align', 'center');
      }), null, 'geIcon geSprite geSprite-center');
      elt.setAttribute('title', mxResources.get('center'));

      elt = menu.addItem('', null, mxUtils.bind(this, function () {
        table.setAttribute('align', 'right');
      }), null, 'geIcon geSprite geSprite-right');
      elt.setAttribute('title', mxResources.get('right'));
    }
  }));

  elt.style.position = 'relative';
  elt.style.whiteSpace = 'nowrap';
  elt.style.overflow = 'hidden';
  elt.innerHTML = '<div class="geSprite geSprite-table" style="margin-left:-2px;"></div>' + this.dropdownImageHtml;
  elt.style.width = mxClient.IS_QUIRKS ? '50px' : '30px';

  // Fix for item size in kennedy theme
  if (EditorUi.compactUi) {
    elt.getElementsByTagName('img')[0].style.left = '22px';
    elt.getElementsByTagName('img')[0].style.top = '5px';
  }
};

/**
 * Hides the current menu.
 */
Toolbar.prototype.hideMenu = function () {
  this.editorUi.hideCurrentMenu();
};

/**
 * Adds a label to the toolbar.
 */
Toolbar.prototype.addMenu = function (label, tooltip, showLabels, name, c, showAll) {
  var menu = this.editorUi.menus.get(name);
  var elt = this.addMenuFunction(label, tooltip, showLabels, function () {
    menu.funct.apply(menu, arguments);
  }, c, showAll);

  menu.addListener('stateChanged', function () {
    elt.setEnabled(menu.enabled);
  });

  return elt;
};

/**
 * Adds a label to the toolbar.
 */
Toolbar.prototype.addMenuFunction = function (label, tooltip, showLabels, funct, c, showAll) {
  return this.addMenuFunctionInContainer(c != null ? c : this.container, label, tooltip, showLabels, funct, showAll);
};

/**
 * Adds a label to the toolbar.
 */
Toolbar.prototype.addMenuFunctionInContainer = function (container, label, tooltip, showLabels, funct, showAll) {
  var elt = showLabels ? this.createLabel(label) : this.createButton(label);
  this.initElement(elt, tooltip);
  this.addMenuHandler(elt, showLabels, funct, showAll);
  container.appendChild(elt);

  return elt;
};

/**
 * Adds a separator to the separator.
 */
Toolbar.prototype.addSeparator = function (c) {
  c = c != null ? c : this.container;
  var elt = document.createElement('div');
  elt.className = 'geSeparator';
  c.appendChild(elt);

  return elt;
};

/**
 * Adds given action item
 */
Toolbar.prototype.addItems = function (keys, c, ignoreDisabled) {
  var items = [];

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    if (key == '-') {
      items.push(this.addSeparator(c));
    } else {
      items.push(this.addItem('geSprite-' + key.toLowerCase(), key, c, ignoreDisabled));
    }
  }

  return items;
};

/**
 * Adds given action item
 */
Toolbar.prototype.addItem = function (sprite, key, c, ignoreDisabled) {
  var action = this.editorUi.actions.get(key);
  var elt = null;

  if (action != null) {
    var tooltip = action.label;

    if (action.shortcut != null) {
      tooltip += ' (' + action.shortcut + ')';
    }

    elt = this.addButton(sprite, tooltip, action.funct, c);

    if (!ignoreDisabled) {
      elt.setEnabled(action.enabled);

      action.addListener('stateChanged', function () {
        elt.setEnabled(action.enabled);
      });
    }
  }

  return elt;
};

/**
 * Adds a button to the toolbar.
 */
Toolbar.prototype.addButton = function (classname, tooltip, funct, c) {
  var elt = this.createButton(classname);
  c = c != null ? c : this.container;

  this.initElement(elt, tooltip);
  this.addClickHandler(elt, funct);
  c.appendChild(elt);

  return elt;
};

/**
 * Initializes the given toolbar element.
 */
Toolbar.prototype.initElement = function (elt, tooltip) {
  // Adds tooltip
  if (tooltip != null) {
    elt.setAttribute('title', tooltip);
  }

  this.addEnabledState(elt);
};

/**
 * Adds enabled state with setter to DOM node (avoids JS wrapper).
 */
Toolbar.prototype.addEnabledState = function (elt) {
  var classname = elt.className;

  elt.setEnabled = function (value) {
    elt.enabled = value;

    if (value) {
      elt.className = classname;
    } else {
      elt.className = classname + ' mxDisabled';
    }
  };

  elt.setEnabled(true);
};

/**
 * Adds enabled state with setter to DOM node (avoids JS wrapper).
 */
Toolbar.prototype.addClickHandler = function (elt, funct) {
  if (funct != null) {
    mxEvent.addListener(elt, 'click', function (evt) {
      if (elt.enabled) {
        funct(evt);
      }

      mxEvent.consume(evt);
    });

    if (document.documentMode != null && document.documentMode >= 9) {
      // Prevents focus
      mxEvent.addListener(elt, 'mousedown', function (evt) {
        evt.preventDefault();
      });
    }
  }
};

/**
 * Creates and returns a new button.
 */
Toolbar.prototype.createButton = function (classname) {
  var elt = document.createElement('a');
  elt.setAttribute('href', 'javascript:void(0);');
  elt.className = 'geButton';

  var inner = document.createElement('div');

  if (classname != null) {
    inner.className = 'geSprite ' + classname;
  }

  elt.appendChild(inner);

  return elt;
};

/**
 * Creates and returns a new button.
 */
Toolbar.prototype.createLabel = function (label, tooltip) {
  var elt = document.createElement('a');
  elt.setAttribute('href', 'javascript:void(0);');
  elt.className = 'geLabel';
  mxUtils.write(elt, label);

  return elt;
};

/**
 * Adds a handler for showing a menu in the given element.
 */
Toolbar.prototype.addMenuHandler = function (elt, showLabels, funct, showAll) {
  if (funct != null) {
    var graph = this.editorUi.editor.graph;
    var menu = null;
    var show = true;

    mxEvent.addListener(elt, 'click', mxUtils.bind(this, function (evt) {
      if (show && (elt.enabled == null || elt.enabled)) {
        graph.popupMenuHandler.hideMenu();
        menu = new mxPopupMenu(funct);
        menu.div.className += ' geToolbarMenu';
        menu.showDisabled = showAll;
        menu.labels = showLabels;
        menu.autoExpand = true;

        var offset = mxUtils.getOffset(elt);
        menu.popup(offset.x, offset.y + elt.offsetHeight, null, evt);
        this.editorUi.setCurrentMenu(menu, elt);

        // Workaround for scrollbar hiding menu items
        if (!showLabels && menu.div.scrollHeight > menu.div.clientHeight) {
          menu.div.style.width = '40px';
        }

        // Extends destroy to reset global state
        menu.addListener(mxEvent.EVENT_HIDE, mxUtils.bind(this, function () {
          this.currentElt = null;
        }));
      }

      show = true;
      mxEvent.consume(evt);
    }));

    // Hides menu if already showing
    mxEvent.addListener(elt, 'mousedown', mxUtils.bind(this, function (evt) {
      show = this.currentElt != elt;

      // Prevents focus
      if (document.documentMode != null && document.documentMode >= 9) {
        evt.preventDefault();
      }
    }));
  }
};

/**
 * Adds a handler for showing a menu in the given element.
 */
Toolbar.prototype.destroy = function () {
  if (this.gestureHandler != null) {
    mxEvent.removeGestureListeners(document, this.gestureHandler);
    this.gestureHandler = null;
  }
};

module.exports = Toolbar;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Menus = __webpack_require__(17);

/**
 * Copyright (c) 2006-2012, JGraph Ltd
 */
var Format = function Format(editorUi, container) {
  this.editorUi = editorUi;
  this.container = container;
};

/**
 * Returns information about the current selection.
 */
Format.prototype.labelIndex = 0;

/**
 * Returns information about the current selection.
 */
Format.prototype.currentIndex = 0;

/**
 * Adds the label menu items to the given menu and parent.
 */
Format.prototype.init = function () {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;

  this.update = mxUtils.bind(this, function (sender, evt) {
    this.clearSelectionState();
    this.refresh();
  });

  graph.getSelectionModel().addListener(mxEvent.CHANGE, this.update);
  graph.addListener(mxEvent.EDITING_STARTED, this.update);
  graph.addListener(mxEvent.EDITING_STOPPED, this.update);
  graph.getModel().addListener(mxEvent.CHANGE, this.update);
  graph.addListener(mxEvent.ROOT, mxUtils.bind(this, function () {
    this.refresh();
  }));

  this.refresh();
};

/**
 * Returns information about the current selection.
 */
Format.prototype.clearSelectionState = function () {
  this.selectionState = null;
};

/**
 * Returns information about the current selection.
 */
Format.prototype.getSelectionState = function () {
  if (this.selectionState == null) {
    this.selectionState = this.createSelectionState();
  }

  return this.selectionState;
};

/**
 * Returns information about the current selection.
 */
Format.prototype.createSelectionState = function () {
  var cells = this.editorUi.editor.graph.getSelectionCells();
  var result = this.initSelectionState();

  for (var i = 0; i < cells.length; i++) {
    this.updateSelectionStateForCell(result, cells[i], cells);
  }

  return result;
};

/**
 * Returns information about the current selection.
 */
Format.prototype.initSelectionState = function () {
  return {
    vertices: [],
    edges: [],
    x: null,
    y: null,
    width: null,
    height: null,
    style: {},
    containsImage: false,
    containsLabel: false,
    fill: true,
    glass: true,
    rounded: true,
    comic: true,
    autoSize: false,
    image: true,
    shadow: true
  };
};

/**
 * Returns information about the current selection.
 */
Format.prototype.updateSelectionStateForCell = function (result, cell, cells) {
  var graph = this.editorUi.editor.graph;

  if (graph.getModel().isVertex(cell)) {
    result.vertices.push(cell);
    var geo = graph.getCellGeometry(cell);

    if (geo != null) {
      if (geo.width > 0) {
        if (result.width == null) {
          result.width = geo.width;
        } else if (result.width != geo.width) {
          result.width = '';
        }
      } else {
        result.containsLabel = true;
      }

      if (geo.height > 0) {
        if (result.height == null) {
          result.height = geo.height;
        } else if (result.height != geo.height) {
          result.height = '';
        }
      } else {
        result.containsLabel = true;
      }

      if (!geo.relative || geo.offset != null) {
        var x = geo.relative ? geo.offset.x : geo.x;
        var y = geo.relative ? geo.offset.y : geo.y;

        if (result.x == null) {
          result.x = x;
        } else if (result.x != x) {
          result.x = '';
        }

        if (result.y == null) {
          result.y = y;
        } else if (result.y != y) {
          result.y = '';
        }
      }
    }
  } else if (graph.getModel().isEdge(cell)) {
    result.edges.push(cell);
  }

  var state = graph.view.getState(cell);

  if (state != null) {
    result.autoSize = result.autoSize || this.isAutoSizeState(state);
    result.glass = result.glass && this.isGlassState(state);
    result.rounded = result.rounded && this.isRoundedState(state);
    result.comic = result.comic && this.isComicState(state);
    result.image = result.image && this.isImageState(state);
    result.shadow = result.shadow && this.isShadowState(state);
    result.fill = result.fill && this.isFillState(state);

    var shape = mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null);
    result.containsImage = result.containsImage || shape == 'image';

    for (var key in state.style) {
      var value = state.style[key];

      if (value != null) {
        if (result.style[key] == null) {
          result.style[key] = value;
        } else if (result.style[key] != value) {
          result.style[key] = '';
        }
      }
    }
  }
};

/**
 * Returns information about the current selection.
 */
Format.prototype.isFillState = function (state) {
  return state.view.graph.model.isVertex(state.cell) || mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null) == 'arrow' || mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null) == 'flexArrow';
};

/**
 * Returns information about the current selection.
 */
Format.prototype.isGlassState = function (state) {
  var shape = mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null);

  return shape == 'label' || shape == 'rectangle' || shape == 'internalStorage' || shape == 'ext' || shape == 'umlLifeline' || shape == 'swimlane' || shape == 'process';
};

/**
 * Returns information about the current selection.
 */
Format.prototype.isRoundedState = function (state) {
  var shape = mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null);

  return shape == 'label' || shape == 'rectangle' || shape == 'internalStorage' || shape == 'corner' || shape == 'parallelogram' || shape == 'swimlane' || shape == 'triangle' || shape == 'trapezoid' || shape == 'ext' || shape == 'step' || shape == 'tee' || shape == 'process' || shape == 'link' || shape == 'rhombus' || shape == 'offPageConnector' || shape == 'loopLimit' || shape == 'hexagon' || shape == 'manualInput' || shape == 'curlyBracket' || shape == 'singleArrow' || shape == 'doubleArrow' || shape == 'flexArrow' || shape == 'card' || shape == 'umlLifeline';
};

/**
 * Returns information about the current selection.
 */
Format.prototype.isComicState = function (state) {
  var shape = mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null);

  return mxUtils.indexOf(['label', 'rectangle', 'internalStorage', 'corner', 'parallelogram', 'note', 'collate', 'swimlane', 'triangle', 'trapezoid', 'ext', 'step', 'tee', 'process', 'link', 'rhombus', 'offPageConnector', 'loopLimit', 'hexagon', 'manualInput', 'singleArrow', 'doubleArrow', 'flexArrow', 'card', 'umlLifeline', 'connector', 'folder', 'component', 'sortShape', 'cross', 'umlFrame', 'cube', 'isoCube', 'isoRectangle'], shape) >= 0;
};

/**
 * Returns information about the current selection.
 */
Format.prototype.isAutoSizeState = function (state) {
  return mxUtils.getValue(state.style, mxConstants.STYLE_AUTOSIZE, null) == '1';
};

/**
 * Returns information about the current selection.
 */
Format.prototype.isImageState = function (state) {
  var shape = mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null);

  return shape == 'label' || shape == 'image';
};

/**
 * Returns information about the current selection.
 */
Format.prototype.isShadowState = function (state) {
  var shape = mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null);

  return shape != 'image';
};

/**
 * Adds the label menu items to the given menu and parent.
 */
Format.prototype.clear = function () {
  this.container.innerHTML = '';

  // Destroy existing panels
  if (this.panels != null) {
    for (var i = 0; i < this.panels.length; i++) {
      this.panels[i].destroy();
    }
  }

  this.panels = [];
};

/**
 * Adds the label menu items to the given menu and parent.
 */
Format.prototype.refresh = function () {
  // Performance tweak: No refresh needed if not visible
  if (this.container.style.width == '0px') {
    return;
  }

  this.clear();
  var ui = this.editorUi;
  var graph = ui.editor.graph;

  var div = document.createElement('div');
  div.style.whiteSpace = 'nowrap';
  div.style.color = 'rgb(112, 112, 112)';
  div.style.textAlign = 'left';
  div.style.cursor = 'default';

  var label = document.createElement('div');
  label.style.border = '1px solid #c0c0c0';
  label.style.borderWidth = '0px 0px 1px 0px';
  label.style.textAlign = 'center';
  label.style.fontWeight = 'bold';
  label.style.overflow = 'hidden';
  label.style.display = mxClient.IS_QUIRKS ? 'inline' : 'inline-block';
  label.style.paddingTop = '8px';
  label.style.height = mxClient.IS_QUIRKS ? '34px' : '25px';
  label.style.width = '100%';
  this.container.appendChild(div);

  if (graph.isSelectionEmpty()) {
    mxUtils.write(label, mxResources.get('diagram'));

    // Adds button to hide the format panel since
    // people don't seem to find the toolbar button
    // and the menu item in the format menu
    var img = document.createElement('img');
    img.setAttribute('border', '0');
    img.setAttribute('src', Dialog.prototype.closeImage);
    img.setAttribute('title', mxResources.get('hide'));
    img.style.position = 'absolute';
    img.style.display = 'block';
    img.style.right = '0px';
    img.style.top = '8px';
    img.style.cursor = 'pointer';
    img.style.marginTop = '1px';
    img.style.marginRight = '17px';
    img.style.border = '1px solid transparent';
    img.style.padding = '1px';
    img.style.opacity = 0.5;
    label.appendChild(img);

    mxEvent.addListener(img, 'click', function () {
      ui.actions.get('formatPanel').funct();
    });

    div.appendChild(label);
    this.panels.push(new DiagramFormatPanel(this, ui, div));
  } else if (graph.isEditing()) {
    mxUtils.write(label, mxResources.get('text'));
    div.appendChild(label);
    this.panels.push(new TextFormatPanel(this, ui, div));
  } else {
    var containsLabel = this.getSelectionState().containsLabel;
    var currentLabel = null;
    var currentPanel = null;

    var addClickHandler = mxUtils.bind(this, function (elt, panel, index) {
      var clickHandler = mxUtils.bind(this, function (evt) {
        if (currentLabel != elt) {
          if (containsLabel) {
            this.labelIndex = index;
          } else {
            this.currentIndex = index;
          }

          if (currentLabel != null) {
            currentLabel.style.backgroundColor = '#d7d7d7';
            currentLabel.style.borderBottomWidth = '1px';
          }

          currentLabel = elt;
          currentLabel.style.backgroundColor = '';
          currentLabel.style.borderBottomWidth = '0px';

          if (currentPanel != panel) {
            if (currentPanel != null) {
              currentPanel.style.display = 'none';
            }

            currentPanel = panel;
            currentPanel.style.display = '';
          }
        }
      });

      mxEvent.addListener(elt, 'click', clickHandler);

      if (index == (containsLabel ? this.labelIndex : this.currentIndex)) {
        // Invokes handler directly as a workaround for no click on DIV in KHTML.
        clickHandler();
      }
    });

    var idx = 0;

    label.style.backgroundColor = '#d7d7d7';
    label.style.borderLeftWidth = '1px';
    label.style.width = containsLabel ? '50%' : '33.3%';
    label.style.width = containsLabel ? '50%' : '33.3%';
    var label2 = label.cloneNode(false);
    var label3 = label2.cloneNode(false);

    // Workaround for ignored background in IE
    label2.style.backgroundColor = '#d7d7d7';
    label3.style.backgroundColor = '#d7d7d7';

    // Style
    if (containsLabel) {
      label2.style.borderLeftWidth = '0px';
    } else {
      label.style.borderLeftWidth = '0px';
      mxUtils.write(label, mxResources.get('style'));
      div.appendChild(label);

      var stylePanel = div.cloneNode(false);
      stylePanel.style.display = 'none';
      this.panels.push(new StyleFormatPanel(this, ui, stylePanel));
      this.container.appendChild(stylePanel);

      addClickHandler(label, stylePanel, idx++);
    }

    // Text
    mxUtils.write(label2, mxResources.get('text'));
    div.appendChild(label2);

    var textPanel = div.cloneNode(false);
    textPanel.style.display = 'none';
    this.panels.push(new TextFormatPanel(this, ui, textPanel));
    this.container.appendChild(textPanel);

    // Arrange
    mxUtils.write(label3, mxResources.get('arrange'));
    div.appendChild(label3);

    var arrangePanel = div.cloneNode(false);
    arrangePanel.style.display = 'none';
    this.panels.push(new ArrangePanel(this, ui, arrangePanel));
    this.container.appendChild(arrangePanel);

    addClickHandler(label2, textPanel, idx++);
    addClickHandler(label3, arrangePanel, idx++);
  }
};

/**
 * Base class for format panels.
 */
var BaseFormatPanel = function BaseFormatPanel(format, editorUi, container) {
  this.format = format;
  this.editorUi = editorUi;
  this.container = container;
  this.listeners = [];
};

/**
 * Adds the given color option.
 */
BaseFormatPanel.prototype.getSelectionState = function () {
  var graph = this.editorUi.editor.graph;
  var cells = graph.getSelectionCells();
  var shape = null;

  for (var i = 0; i < cells.length; i++) {
    var state = graph.view.getState(cells[i]);

    if (state != null) {
      var tmp = mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null);

      if (tmp != null) {
        if (shape == null) {
          shape = tmp;
        } else if (shape != tmp) {
          return null;
        }
      }
    }
  }

  return shape;
};

/**
 * Install input handler.
 */
BaseFormatPanel.prototype.installInputHandler = function (input, key, defaultValue, min, max, unit, textEditFallback, isFloat) {
  unit = unit != null ? unit : '';
  isFloat = isFloat != null ? isFloat : false;

  var ui = this.editorUi;
  var graph = ui.editor.graph;

  min = min != null ? min : 1;
  max = max != null ? max : 999;

  var selState = null;
  var updating = false;

  var update = mxUtils.bind(this, function (evt) {
    var value = isFloat ? parseFloat(input.value) : parseInt(input.value);

    // Special case: angle mod 360
    if (!isNaN(value) && key == mxConstants.STYLE_ROTATION) {
      // Workaround for decimal rounding errors in floats is to
      // use integer and round all numbers to two decimal point
      value = mxUtils.mod(Math.round(value * 100), 36000) / 100;
    }

    value = Math.min(max, Math.max(min, isNaN(value) ? defaultValue : value));

    if (graph.cellEditor.isContentEditing() && textEditFallback) {
      if (!updating) {
        updating = true;

        if (selState != null) {
          graph.cellEditor.restoreSelection(selState);
          selState = null;
        }

        textEditFallback(value);
        input.value = value + unit;

        // Restore focus and selection in input
        updating = false;
      }
    } else if (value != mxUtils.getValue(this.format.getSelectionState().style, key, defaultValue)) {
      if (graph.isEditing()) {
        graph.stopEditing(true);
      }

      graph.getModel().beginUpdate();
      try {
        graph.setCellStyles(key, value, graph.getSelectionCells());

        // Handles special case for fontSize where HTML labels are parsed and updated
        if (key == mxConstants.STYLE_FONTSIZE) {
          var cells = graph.getSelectionCells();

          for (var i = 0; i < cells.length; i++) {
            var cell = cells[i];

            // Changes font tags inside HTML labels
            if (graph.isHtmlLabel(cell)) {
              var div = document.createElement('div');
              div.innerHTML = graph.convertValueToString(cell);
              var elts = div.getElementsByTagName('font');

              for (var j = 0; j < elts.length; j++) {
                elts[j].removeAttribute('size');
                elts[j].style.fontSize = value + 'px';
              }

              graph.cellLabelChanged(cell, div.innerHTML);
            }
          }
        }
      } finally {
        graph.getModel().endUpdate();
      }

      ui.fireEvent(new mxEventObject('styleChanged', 'keys', [key], 'values', [value], 'cells', graph.getSelectionCells()));
    }

    input.value = value + unit;
    mxEvent.consume(evt);
  });

  if (textEditFallback && graph.cellEditor.isContentEditing()) {
    // KNOWN: Arrow up/down clear selection text in quirks/IE 8
    // Text size via arrow button limits to 16 in IE11. Why?
    mxEvent.addListener(input, 'mousedown', function () {
      selState = graph.cellEditor.saveSelection();
    });

    mxEvent.addListener(input, 'touchstart', function () {
      selState = graph.cellEditor.saveSelection();
    });
  }

  mxEvent.addListener(input, 'change', update);
  mxEvent.addListener(input, 'blur', update);

  return update;
};

/**
 * Adds the given option.
 */
BaseFormatPanel.prototype.createPanel = function () {
  var div = document.createElement('div');
  div.style.padding = '12px 0px 12px 18px';
  div.style.borderBottom = '1px solid #c0c0c0';

  return div;
};

/**
 * Adds the given option.
 */
BaseFormatPanel.prototype.createTitle = function (title) {
  var div = document.createElement('div');
  div.style.padding = '0px 0px 6px 0px';
  div.style.whiteSpace = 'nowrap';
  div.style.overflow = 'hidden';
  div.style.width = '200px';
  div.style.fontWeight = 'bold';
  mxUtils.write(div, title);

  return div;
};

/**
 *
 */
BaseFormatPanel.prototype.createStepper = function (input, update, step, height, disableFocus, defaultValue) {
  step = step != null ? step : 1;
  height = height != null ? height : 8;

  if (mxClient.IS_QUIRKS) {
    height -= 2;
  } else if (mxClient.IS_MT || document.documentMode >= 8) {
    height += 1;
  }

  var stepper = document.createElement('div');
  mxUtils.setPrefixedStyle(stepper.style, 'borderRadius', '3px');
  stepper.style.border = '1px solid rgb(192, 192, 192)';
  stepper.style.position = 'absolute';

  var up = document.createElement('div');
  up.style.borderBottom = '1px solid rgb(192, 192, 192)';
  up.style.position = 'relative';
  up.style.height = height + 'px';
  up.style.width = '10px';
  up.className = 'geBtnUp';
  stepper.appendChild(up);

  var down = up.cloneNode(false);
  down.style.border = 'none';
  down.style.height = height + 'px';
  down.className = 'geBtnDown';
  stepper.appendChild(down);

  mxEvent.addListener(down, 'click', function (evt) {
    if (input.value == '') {
      input.value = defaultValue || '2';
    }

    var val = parseInt(input.value);

    if (!isNaN(val)) {
      input.value = val - step;

      if (update != null) {
        update(evt);
      }
    }

    mxEvent.consume(evt);
  });

  mxEvent.addListener(up, 'click', function (evt) {
    if (input.value == '') {
      input.value = defaultValue || '0';
    }

    var val = parseInt(input.value);

    if (!isNaN(val)) {
      input.value = val + step;

      if (update != null) {
        update(evt);
      }
    }

    mxEvent.consume(evt);
  });

  // Disables transfer of focus to DIV but also :active CSS
  // so it's only used for fontSize where the focus should
  // stay on the selected text, but not for any other input.
  if (disableFocus) {
    var currentSelection = null;

    mxEvent.addGestureListeners(stepper, function (evt) {
      // Workaround for lost current selection in page because of focus in IE
      if (mxClient.IS_QUIRKS || document.documentMode == 8) {
        currentSelection = document.selection.createRange();
      }

      mxEvent.consume(evt);
    }, null, function (evt) {
      // Workaround for lost current selection in page because of focus in IE
      if (currentSelection != null) {
        try {
          currentSelection.select();
        } catch (e) {
          // ignore
        }

        currentSelection = null;
        mxEvent.consume(evt);
      }
    });
  }

  return stepper;
};

/**
 * Adds the given option.
 */
BaseFormatPanel.prototype.createOption = function (label, isCheckedFn, setCheckedFn, listener) {
  var div = document.createElement('div');
  div.style.padding = '6px 0px 1px 0px';
  div.style.whiteSpace = 'nowrap';
  div.style.overflow = 'hidden';
  div.style.width = '200px';
  div.style.height = mxClient.IS_QUIRKS ? '27px' : '18px';

  var cb = document.createElement('input');
  cb.setAttribute('type', 'checkbox');
  cb.style.margin = '0px 6px 0px 0px';
  div.appendChild(cb);

  var span = document.createElement('span');
  mxUtils.write(span, label);
  div.appendChild(span);

  var applying = false;
  var value = isCheckedFn();

  var apply = function apply(newValue) {
    if (!applying) {
      applying = true;

      if (newValue) {
        cb.setAttribute('checked', 'checked');
        cb.defaultChecked = true;
        cb.checked = true;
      } else {
        cb.removeAttribute('checked');
        cb.defaultChecked = false;
        cb.checked = false;
      }

      if (value != newValue) {
        value = newValue;

        // Checks if the color value needs to be updated in the model
        if (isCheckedFn() != value) {
          setCheckedFn(value);
        }
      }

      applying = false;
    }
  };

  mxEvent.addListener(div, 'click', function (evt) {
    // Toggles checkbox state for click on label
    var source = mxEvent.getSource(evt);

    if (source == div || source == span) {
      cb.checked = !cb.checked;
    }

    apply(cb.checked);
  });

  apply(value);

  if (listener != null) {
    listener.install(apply);
    this.listeners.push(listener);
  }

  return div;
};

/**
 * The string 'null' means use null in values.
 */
BaseFormatPanel.prototype.createCellOption = function (label, key, defaultValue, enabledValue, disabledValue, fn, action, stopEditing) {
  enabledValue = enabledValue != null ? enabledValue == 'null' ? null : enabledValue : '1';
  disabledValue = disabledValue != null ? disabledValue == 'null' ? null : disabledValue : '0';

  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;

  return this.createOption(label, function () {
    // Seems to be null sometimes, not sure why...
    var state = graph.view.getState(graph.getSelectionCell());

    if (state != null) {
      return mxUtils.getValue(state.style, key, defaultValue) != disabledValue;
    }

    return null;
  }, function (checked) {
    if (stopEditing) {
      graph.stopEditing();
    }

    if (action != null) {
      action.funct();
    } else {
      graph.getModel().beginUpdate();
      try {
        var value = checked ? enabledValue : disabledValue;
        graph.setCellStyles(key, value, graph.getSelectionCells());

        if (fn != null) {
          fn(graph.getSelectionCells(), value);
        }

        ui.fireEvent(new mxEventObject('styleChanged', 'keys', [key], 'values', [value], 'cells', graph.getSelectionCells()));
      } finally {
        graph.getModel().endUpdate();
      }
    }
  }, {
    install: function install(apply) {
      this.listener = function () {
        // Seems to be null sometimes, not sure why...
        var state = graph.view.getState(graph.getSelectionCell());

        if (state != null) {
          apply(mxUtils.getValue(state.style, key, defaultValue) != disabledValue);
        }
      };

      graph.getModel().addListener(mxEvent.CHANGE, this.listener);
    },
    destroy: function destroy() {
      graph.getModel().removeListener(this.listener);
    }
  });
};

/**
 * Adds the given color option.
 */
BaseFormatPanel.prototype.createColorOption = function (label, getColorFn, setColorFn, defaultColor, listener, callbackFn, hideCheckbox) {
  var div = document.createElement('div');
  div.style.padding = '6px 0px 1px 0px';
  div.style.whiteSpace = 'nowrap';
  div.style.overflow = 'hidden';
  div.style.width = '200px';
  div.style.height = mxClient.IS_QUIRKS ? '27px' : '18px';

  var cb = document.createElement('input');
  cb.setAttribute('type', 'checkbox');
  cb.style.margin = '0px 6px 0px 0px';

  if (!hideCheckbox) {
    div.appendChild(cb);
  }

  var span = document.createElement('span');
  mxUtils.write(span, label);
  div.appendChild(span);

  var applying = false;
  var value = getColorFn();

  var btn = null;

  var apply = function apply(color, disableUpdate) {
    if (!applying) {
      applying = true;
      btn.innerHTML = '<div style="width:' + (mxClient.IS_QUIRKS ? '30' : '36') + 'px;height:12px;margin:3px;border:1px solid black;background-color:' + (color != null && color != mxConstants.NONE ? color : defaultColor) + ';"></div>';

      // Fine-tuning in Firefox, quirks mode and IE8 standards
      if (mxClient.IS_MT || mxClient.IS_QUIRKS || document.documentMode == 8) {
        btn.firstChild.style.margin = '0px';
      }

      if (color != null && color != mxConstants.NONE) {
        cb.setAttribute('checked', 'checked');
        cb.defaultChecked = true;
        cb.checked = true;
      } else {
        cb.removeAttribute('checked');
        cb.defaultChecked = false;
        cb.checked = false;
      }

      btn.style.display = cb.checked || hideCheckbox ? '' : 'none';

      if (callbackFn != null) {
        callbackFn(color);
      }

      if (!disableUpdate && (hideCheckbox || value != color)) {
        value = color;

        // Checks if the color value needs to be updated in the model
        if (hideCheckbox || getColorFn() != value) {
          setColorFn(value);
        }
      }

      applying = false;
    }
  };

  btn = mxUtils.button('', mxUtils.bind(this, function (evt) {
    this.editorUi.pickColor(value, apply);
    mxEvent.consume(evt);
  }));

  btn.style.position = 'absolute';
  btn.style.marginTop = '-4px';
  btn.style.right = mxClient.IS_QUIRKS ? '0px' : '20px';
  btn.style.height = '22px';
  btn.className = 'geColorBtn';
  btn.style.display = cb.checked || hideCheckbox ? '' : 'none';
  div.appendChild(btn);

  mxEvent.addListener(div, 'click', function (evt) {
    var source = mxEvent.getSource(evt);

    if (source == cb || source.nodeName != 'INPUT') {
      // Toggles checkbox state for click on label
      if (source != cb) {
        cb.checked = !cb.checked;
      }

      // Overrides default value with current value to make it easier
      // to restore previous value if the checkbox is clicked twice
      if (!cb.checked && value != null && value != mxConstants.NONE && defaultColor != mxConstants.NONE) {
        defaultColor = value;
      }

      apply(cb.checked ? defaultColor : mxConstants.NONE);
    }
  });

  apply(value, true);

  if (listener != null) {
    listener.install(apply);
    this.listeners.push(listener);
  }

  return div;
};

/**
 *
 */
BaseFormatPanel.prototype.createCellColorOption = function (label, colorKey, defaultColor, callbackFn, setStyleFn) {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;

  return this.createColorOption(label, function () {
    // Seems to be null sometimes, not sure why...
    var state = graph.view.getState(graph.getSelectionCell());

    if (state != null) {
      return mxUtils.getValue(state.style, colorKey, null);
    }

    return null;
  }, function (color) {
    graph.getModel().beginUpdate();
    try {
      if (setStyleFn != null) {
        setStyleFn(color);
      }

      graph.setCellStyles(colorKey, color, graph.getSelectionCells());
      ui.fireEvent(new mxEventObject('styleChanged', 'keys', [colorKey], 'values', [color], 'cells', graph.getSelectionCells()));
    } finally {
      graph.getModel().endUpdate();
    }
  }, defaultColor || mxConstants.NONE, {
    install: function install(apply) {
      this.listener = function () {
        // Seems to be null sometimes, not sure why...
        var state = graph.view.getState(graph.getSelectionCell());

        if (state != null) {
          apply(mxUtils.getValue(state.style, colorKey, null));
        }
      };

      graph.getModel().addListener(mxEvent.CHANGE, this.listener);
    },
    destroy: function destroy() {
      graph.getModel().removeListener(this.listener);
    }
  }, callbackFn);
};

/**
 *
 */
BaseFormatPanel.prototype.addArrow = function (elt, height) {
  height = height != null ? height : 10;

  var arrow = document.createElement('div');
  arrow.style.display = mxClient.IS_QUIRKS ? 'inline' : 'inline-block';
  arrow.style.padding = '6px';
  arrow.style.paddingRight = '4px';

  var m = 10 - height;

  if (m == 2) {
    arrow.style.paddingTop = 6 + 'px';
  } else if (m > 0) {
    arrow.style.paddingTop = 6 - m + 'px';
  } else {
    arrow.style.marginTop = '-2px';
  }

  arrow.style.height = height + 'px';
  arrow.style.borderLeft = '1px solid #a0a0a0';
  arrow.innerHTML = '<img border="0" src="' + (mxClient.IS_SVG ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHBJREFUeNpidHB2ZyAGsACxDRBPIKCuA6TwCBB/h2rABu4A8SYmKCcXiP/iUFgAxL9gCi8A8SwsirZCMQMTkmANEH9E4v+CmsaArvAdyNFI/FlQ92EoBIE+qCRIUz168DBgsU4OqhinQpgHMABAgAEALY4XLIsJ20oAAAAASUVORK5CYII=' : IMAGE_PATH + '/dropdown.png') + '" style="margin-bottom:4px;">';
  mxUtils.setOpacity(arrow, 70);

  var symbol = elt.getElementsByTagName('div')[0];

  if (symbol != null) {
    symbol.style.paddingRight = '6px';
    symbol.style.marginLeft = '4px';
    symbol.style.marginTop = '-1px';
    symbol.style.display = mxClient.IS_QUIRKS ? 'inline' : 'inline-block';
    mxUtils.setOpacity(symbol, 60);
  }

  mxUtils.setOpacity(elt, 100);
  elt.style.border = '1px solid #a0a0a0';
  elt.style.backgroundColor = 'white';
  elt.style.backgroundImage = 'none';
  elt.style.width = 'auto';
  elt.className += ' geColorBtn';
  mxUtils.setPrefixedStyle(elt.style, 'borderRadius', '3px');

  elt.appendChild(arrow);

  return symbol;
};

/**
 *
 */
BaseFormatPanel.prototype.addUnitInput = function (container, unit, right, width, update, step, marginTop, disableFocus) {
  marginTop = marginTop != null ? marginTop : 0;

  var input = document.createElement('input');
  input.style.position = 'absolute';
  input.style.textAlign = 'right';
  input.style.marginTop = '-2px';
  input.style.right = right + 12 + 'px';
  input.style.width = width + 'px';
  container.appendChild(input);

  var stepper = this.createStepper(input, update, step, null, disableFocus);
  stepper.style.marginTop = marginTop - 2 + 'px';
  stepper.style.right = right + 'px';
  container.appendChild(stepper);

  return input;
};

/**
 *
 */
BaseFormatPanel.prototype.createRelativeOption = function (label, key, width, handler, init) {
  width = width != null ? width : 44;

  var graph = this.editorUi.editor.graph;
  var div = this.createPanel();
  div.style.paddingTop = '10px';
  div.style.paddingBottom = '10px';
  mxUtils.write(div, label);
  div.style.fontWeight = 'bold';

  function update(evt) {
    if (handler != null) {
      handler(input);
    } else {
      var value = parseInt(input.value);
      value = Math.min(100, Math.max(0, isNaN(value) ? 100 : value));
      var state = graph.view.getState(graph.getSelectionCell());

      if (state != null && value != mxUtils.getValue(state.style, key, 100)) {
        // Removes entry in style (assumes 100 is default for relative values)
        if (value == 100) {
          value = null;
        }

        graph.setCellStyles(key, value, graph.getSelectionCells());
      }

      input.value = (value != null ? value : '100') + ' %';
    }

    mxEvent.consume(evt);
  }

  var input = this.addUnitInput(div, '%', 20, width, update, 10, -15, handler != null);

  if (key != null) {
    var listener = mxUtils.bind(this, function (sender, evt, force) {
      if (force || input != document.activeElement) {
        var ss = this.format.getSelectionState();
        var tmp = parseInt(mxUtils.getValue(ss.style, key, 100));
        input.value = isNaN(tmp) ? '' : tmp + ' %';
      }
    });

    mxEvent.addListener(input, 'keydown', function (e) {
      if (e.keyCode == 13) {
        graph.container.focus();
        mxEvent.consume(e);
      } else if (e.keyCode == 27) {
        listener(null, null, true);
        graph.container.focus();
        mxEvent.consume(e);
      }
    });

    graph.getModel().addListener(mxEvent.CHANGE, listener);
    this.listeners.push({
      destroy: function destroy() {
        graph.getModel().removeListener(listener);
      }
    });
    listener();
  }

  mxEvent.addListener(input, 'blur', update);
  mxEvent.addListener(input, 'change', update);

  if (init != null) {
    init(input);
  }

  return div;
};

/**
 *
 */
BaseFormatPanel.prototype.addLabel = function (div, title, right, width) {
  width = width != null ? width : 61;

  var label = document.createElement('div');
  mxUtils.write(label, title);
  label.style.position = 'absolute';
  label.style.right = right + 'px';
  label.style.width = width + 'px';
  label.style.marginTop = '6px';
  label.style.textAlign = 'center';
  div.appendChild(label);
};

/**
 *
 */
BaseFormatPanel.prototype.addKeyHandler = function (input, listener) {
  mxEvent.addListener(input, 'keydown', mxUtils.bind(this, function (e) {
    if (e.keyCode == 13) {
      this.editorUi.editor.graph.container.focus();
      mxEvent.consume(e);
    } else if (e.keyCode == 27) {
      if (listener != null) {
        listener(null, null, true);
      }

      this.editorUi.editor.graph.container.focus();
      mxEvent.consume(e);
    }
  }));
};

/**
 *
 */
BaseFormatPanel.prototype.styleButtons = function (elts) {
  for (var i = 0; i < elts.length; i++) {
    mxUtils.setPrefixedStyle(elts[i].style, 'borderRadius', '3px');
    mxUtils.setOpacity(elts[i], 100);
    elts[i].style.border = '1px solid #a0a0a0';
    elts[i].style.padding = '4px';
    elts[i].style.paddingTop = '3px';
    elts[i].style.paddingRight = '1px';
    elts[i].style.margin = '1px';
    elts[i].style.width = '24px';
    elts[i].style.height = '20px';
    elts[i].className += ' geColorBtn';
  }
};

/**
 * Adds the label menu items to the given menu and parent.
 */
BaseFormatPanel.prototype.destroy = function () {
  if (this.listeners != null) {
    for (var i = 0; i < this.listeners.length; i++) {
      this.listeners[i].destroy();
    }

    this.listeners = null;
  }
};

/**
 * Adds the label menu items to the given menu and parent.
 */
var ArrangePanel = function ArrangePanel(format, editorUi, container) {
  BaseFormatPanel.call(this, format, editorUi, container);
  this.init();
};

mxUtils.extend(ArrangePanel, BaseFormatPanel);

/**
 * Adds the label menu items to the given menu and parent.
 */
ArrangePanel.prototype.init = function () {
  var graph = this.editorUi.editor.graph;
  var ss = this.format.getSelectionState();

  this.container.appendChild(this.addLayerOps(this.createPanel()));
  // Special case that adds two panels
  this.addGeometry(this.container);
  this.addEdgeGeometry(this.container);

  if (!ss.containsLabel || ss.edges.length == 0) {
    this.container.appendChild(this.addAngle(this.createPanel()));
  }

  if (!ss.containsLabel && ss.edges.length == 0) {
    this.container.appendChild(this.addFlip(this.createPanel()));
  }

  if (ss.vertices.length > 1) {
    this.container.appendChild(this.addAlign(this.createPanel()));
    this.container.appendChild(this.addDistribute(this.createPanel()));
  }

  this.container.appendChild(this.addGroupOps(this.createPanel()));
};

/**
 *
 */
ArrangePanel.prototype.addLayerOps = function (div) {
  var ui = this.editorUi;

  var btn = mxUtils.button(mxResources.get('toFront'), function (evt) {
    ui.actions.get('toFront').funct();
  });

  btn.setAttribute('title', mxResources.get('toFront') + ' (' + this.editorUi.actions.get('toFront').shortcut + ')');
  btn.style.width = '100px';
  btn.style.marginRight = '2px';
  div.appendChild(btn);

  var btn = mxUtils.button(mxResources.get('toBack'), function (evt) {
    ui.actions.get('toBack').funct();
  });

  btn.setAttribute('title', mxResources.get('toBack') + ' (' + this.editorUi.actions.get('toBack').shortcut + ')');
  btn.style.width = '100px';
  div.appendChild(btn);

  return div;
};

/**
 *
 */
ArrangePanel.prototype.addGroupOps = function (div) {
  var ui = this.editorUi;
  var graph = ui.editor.graph;
  var cell = graph.getSelectionCell();
  var ss = this.format.getSelectionState();
  var count = 0;

  div.style.paddingTop = '8px';
  div.style.paddingBottom = '6px';

  if (graph.getSelectionCount() > 1) {
    var btn = mxUtils.button(mxResources.get('group'), function (evt) {
      ui.actions.get('group').funct();
    });

    btn.setAttribute('title', mxResources.get('group') + ' (' + this.editorUi.actions.get('group').shortcut + ')');
    btn.style.width = '202px';
    btn.style.marginBottom = '2px';
    div.appendChild(btn);
    count++;
  } else if (graph.getSelectionCount() == 1 && !graph.getModel().isEdge(cell) && !graph.isSwimlane(cell) && graph.getModel().getChildCount(cell) > 0) {
    var _btn = mxUtils.button(mxResources.get('ungroup'), function (evt) {
      ui.actions.get('ungroup').funct();
    });

    _btn.setAttribute('title', mxResources.get('ungroup') + ' (' + this.editorUi.actions.get('ungroup').shortcut + ')');
    _btn.style.width = '202px';
    _btn.style.marginBottom = '2px';
    div.appendChild(_btn);
    count++;
  }

  if (graph.getSelectionCount() == 1 && graph.getModel().isVertex(cell) && graph.getModel().isVertex(graph.getModel().getParent(cell))) {
    if (count > 0) {
      mxUtils.br(div);
    }

    var _btn2 = mxUtils.button(mxResources.get('removeFromGroup'), function (evt) {
      ui.actions.get('removeFromGroup').funct();
    });

    _btn2.setAttribute('title', mxResources.get('removeFromGroup'));
    _btn2.style.width = '202px';
    _btn2.style.marginBottom = '2px';
    div.appendChild(_btn2);
    count++;
  } else if (ss.edges.length > 0) {
    if (count > 0) {
      mxUtils.br(div);
    }

    var _btn3 = mxUtils.button(mxResources.get('clearWaypoints'), mxUtils.bind(this, function (evt) {
      this.editorUi.actions.get('clearWaypoints').funct();
    }));

    _btn3.setAttribute('title', mxResources.get('clearWaypoints'));
    _btn3.style.width = '202px';
    _btn3.style.marginBottom = '2px';
    div.appendChild(_btn3);

    count++;
  }

  if (graph.getSelectionCount() == 1) {
    if (count > 0) {
      mxUtils.br(div);
    }

    var _btn4 = mxUtils.button(mxResources.get('editData'), mxUtils.bind(this, function (evt) {
      this.editorUi.actions.get('editData').funct();
    }));

    _btn4.setAttribute('title', mxResources.get('editData') + ' (' + this.editorUi.actions.get('editData').shortcut + ')');
    _btn4.style.width = '100px';
    _btn4.style.marginBottom = '2px';
    div.appendChild(_btn4);
    count++;

    _btn4 = mxUtils.button(mxResources.get('editLink'), mxUtils.bind(this, function (evt) {
      this.editorUi.actions.get('editLink').funct();
    }));

    _btn4.setAttribute('title', mxResources.get('editLink'));
    _btn4.style.width = '100px';
    _btn4.style.marginLeft = '2px';
    _btn4.style.marginBottom = '2px';
    div.appendChild(_btn4);
    count++;
  }

  if (count == 0) {
    div.style.display = 'none';
  }

  return div;
};

/**
 *
 */
ArrangePanel.prototype.addAlign = function (div) {
  var graph = this.editorUi.editor.graph;
  div.style.paddingTop = '6px';
  div.style.paddingBottom = '12px';
  div.appendChild(this.createTitle(mxResources.get('align')));

  var stylePanel = document.createElement('div');
  stylePanel.style.position = 'relative';
  stylePanel.style.paddingLeft = '0px';
  stylePanel.style.borderWidth = '0px';
  stylePanel.className = 'geToolbarContainer';

  if (mxClient.IS_QUIRKS) {
    div.style.height = '60px';
  }

  var left = this.editorUi.toolbar.addButton('geSprite-alignleft', mxResources.get('left'), function () {
    graph.alignCells(mxConstants.ALIGN_LEFT);
  }, stylePanel);
  var center = this.editorUi.toolbar.addButton('geSprite-aligncenter', mxResources.get('center'), function () {
    graph.alignCells(mxConstants.ALIGN_CENTER);
  }, stylePanel);
  var right = this.editorUi.toolbar.addButton('geSprite-alignright', mxResources.get('right'), function () {
    graph.alignCells(mxConstants.ALIGN_RIGHT);
  }, stylePanel);

  var top = this.editorUi.toolbar.addButton('geSprite-aligntop', mxResources.get('top'), function () {
    graph.alignCells(mxConstants.ALIGN_TOP);
  }, stylePanel);
  var middle = this.editorUi.toolbar.addButton('geSprite-alignmiddle', mxResources.get('middle'), function () {
    graph.alignCells(mxConstants.ALIGN_MIDDLE);
  }, stylePanel);
  var bottom = this.editorUi.toolbar.addButton('geSprite-alignbottom', mxResources.get('bottom'), function () {
    graph.alignCells(mxConstants.ALIGN_BOTTOM);
  }, stylePanel);

  this.styleButtons([left, center, right, top, middle, bottom]);
  right.style.marginRight = '6px';
  div.appendChild(stylePanel);

  return div;
};

/**
 *
 */
ArrangePanel.prototype.addFlip = function (div) {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;
  div.style.paddingTop = '6px';
  div.style.paddingBottom = '10px';

  var span = document.createElement('div');
  span.style.marginTop = '2px';
  span.style.marginBottom = '8px';
  span.style.fontWeight = 'bold';
  mxUtils.write(span, mxResources.get('flip'));
  div.appendChild(span);

  var btn = mxUtils.button(mxResources.get('horizontal'), function (evt) {
    graph.toggleCellStyles(mxConstants.STYLE_FLIPH, false);
  });

  btn.setAttribute('title', mxResources.get('horizontal'));
  btn.style.width = '100px';
  btn.style.marginRight = '2px';
  div.appendChild(btn);

  var btn = mxUtils.button(mxResources.get('vertical'), function (evt) {
    graph.toggleCellStyles(mxConstants.STYLE_FLIPV, false);
  });

  btn.setAttribute('title', mxResources.get('vertical'));
  btn.style.width = '100px';
  div.appendChild(btn);

  return div;
};

/**
 *
 */
ArrangePanel.prototype.addDistribute = function (div) {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;
  div.style.paddingTop = '6px';
  div.style.paddingBottom = '12px';

  div.appendChild(this.createTitle(mxResources.get('distribute')));

  var btn = mxUtils.button(mxResources.get('horizontal'), function (evt) {
    graph.distributeCells(true);
  });

  btn.setAttribute('title', mxResources.get('horizontal'));
  btn.style.width = '100px';
  btn.style.marginRight = '2px';
  div.appendChild(btn);

  var btn = mxUtils.button(mxResources.get('vertical'), function (evt) {
    graph.distributeCells(false);
  });

  btn.setAttribute('title', mxResources.get('vertical'));
  btn.style.width = '100px';
  div.appendChild(btn);

  return div;
};

/**
 *
 */
ArrangePanel.prototype.addAngle = function (div) {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;
  var ss = this.format.getSelectionState();

  div.style.paddingBottom = '8px';

  var span = document.createElement('div');
  span.style.position = 'absolute';
  span.style.width = '70px';
  span.style.marginTop = '0px';
  span.style.fontWeight = 'bold';

  var input = null;
  var update = null;
  var btn = null;

  if (ss.edges.length == 0) {
    mxUtils.write(span, mxResources.get('angle'));
    div.appendChild(span);

    input = this.addUnitInput(div, '°', 20, 44, function () {
      update.apply(this, arguments);
    });

    mxUtils.br(div);
    div.style.paddingTop = '10px';
  } else {
    div.style.paddingTop = '8px';
  }

  if (!ss.containsLabel) {
    var label = mxResources.get('reverse');

    if (ss.vertices.length > 0 && ss.edges.length > 0) {
      label = mxResources.get('turn') + ' / ' + label;
    } else if (ss.vertices.length > 0) {
      label = mxResources.get('turn');
    }

    btn = mxUtils.button(label, function (evt) {
      ui.actions.get('turn').funct();
    });

    btn.setAttribute('title', label + ' (' + this.editorUi.actions.get('turn').shortcut + ')');
    btn.style.width = '202px';
    div.appendChild(btn);

    if (input != null) {
      btn.style.marginTop = '8px';
    }
  }

  if (input != null) {
    var listener = mxUtils.bind(this, function (sender, evt, force) {
      if (force || document.activeElement != input) {
        ss = this.format.getSelectionState();
        var tmp = parseFloat(mxUtils.getValue(ss.style, mxConstants.STYLE_ROTATION, 0));
        input.value = isNaN(tmp) ? '' : tmp + '°';
      }
    });

    update = this.installInputHandler(input, mxConstants.STYLE_ROTATION, 0, 0, 360, '°', null, true);
    this.addKeyHandler(input, listener);

    graph.getModel().addListener(mxEvent.CHANGE, listener);
    this.listeners.push({
      destroy: function destroy() {
        graph.getModel().removeListener(listener);
      }
    });
    listener();
  }

  return div;
};

/**
 *
 */
ArrangePanel.prototype.addGeometry = function (container) {
  var ui = this.editorUi;
  var graph = ui.editor.graph;
  var rect = this.format.getSelectionState();

  var div = this.createPanel();
  div.style.paddingBottom = '8px';

  var span = document.createElement('div');
  span.style.position = 'absolute';
  span.style.width = '50px';
  span.style.marginTop = '0px';
  span.style.fontWeight = 'bold';
  mxUtils.write(span, mxResources.get('size'));
  div.appendChild(span);

  var widthUpdate, heightUpdate, leftUpdate, topUpdate;
  var width = this.addUnitInput(div, 'pt', 84, 44, function () {
    widthUpdate.apply(this, arguments);
  });
  var height = this.addUnitInput(div, 'pt', 20, 44, function () {
    heightUpdate.apply(this, arguments);
  });

  var autosizeBtn = document.createElement('div');
  autosizeBtn.className = 'geSprite geSprite-fit';
  autosizeBtn.setAttribute('title', mxResources.get('autosize') + ' (' + this.editorUi.actions.get('autosize').shortcut + ')');
  autosizeBtn.style.position = 'relative';
  autosizeBtn.style.cursor = 'pointer';
  autosizeBtn.style.marginTop = '-3px';
  autosizeBtn.style.border = '0px';
  autosizeBtn.style.left = '52px';
  mxUtils.setOpacity(autosizeBtn, 50);

  mxEvent.addListener(autosizeBtn, 'mouseenter', function () {
    mxUtils.setOpacity(autosizeBtn, 100);
  });

  mxEvent.addListener(autosizeBtn, 'mouseleave', function () {
    mxUtils.setOpacity(autosizeBtn, 50);
  });

  mxEvent.addListener(autosizeBtn, 'click', function () {
    ui.actions.get('autosize').funct();
  });

  div.appendChild(autosizeBtn);
  this.addLabel(div, mxResources.get('width'), 84);
  this.addLabel(div, mxResources.get('height'), 20);
  mxUtils.br(div);

  var wrapper = document.createElement('div');
  wrapper.style.paddingTop = '8px';
  wrapper.style.paddingRight = '20px';
  wrapper.style.whiteSpace = 'nowrap';
  wrapper.style.textAlign = 'right';
  var opt = this.createCellOption(mxResources.get('constrainProportions'), mxConstants.STYLE_ASPECT, null, 'fixed', 'null');
  opt.style.width = '100%';
  wrapper.appendChild(opt);
  div.appendChild(wrapper);

  this.addKeyHandler(width, listener);
  this.addKeyHandler(height, listener);

  widthUpdate = this.addGeometryHandler(width, function (geo, value) {
    if (geo.width > 0) {
      geo.width = Math.max(1, value);
    }
  });
  heightUpdate = this.addGeometryHandler(height, function (geo, value) {
    if (geo.height > 0) {
      geo.height = Math.max(1, value);
    }
  });

  container.appendChild(div);

  var div2 = this.createPanel();
  div2.style.paddingBottom = '30px';

  var span = document.createElement('div');
  span.style.position = 'absolute';
  span.style.width = '70px';
  span.style.marginTop = '0px';
  span.style.fontWeight = 'bold';
  mxUtils.write(span, mxResources.get('position'));
  div2.appendChild(span);

  var left = this.addUnitInput(div2, 'pt', 84, 44, function () {
    leftUpdate.apply(this, arguments);
  });
  var top = this.addUnitInput(div2, 'pt', 20, 44, function () {
    topUpdate.apply(this, arguments);
  });

  mxUtils.br(div2);
  this.addLabel(div2, mxResources.get('left'), 84);
  this.addLabel(div2, mxResources.get('top'), 20);

  var listener = mxUtils.bind(this, function (sender, evt, force) {
    rect = this.format.getSelectionState();

    if (!rect.containsLabel && rect.vertices.length == graph.getSelectionCount() && rect.width != null && rect.height != null) {
      div.style.display = '';

      if (force || document.activeElement != width) {
        width.value = rect.width + (rect.width == '' ? '' : ' pt');
      }

      if (force || document.activeElement != height) {
        height.value = rect.height + (rect.height == '' ? '' : ' pt');
      }
    } else {
      div.style.display = 'none';
    }

    if (rect.vertices.length == graph.getSelectionCount() && rect.x != null && rect.y != null) {
      div2.style.display = '';

      if (force || document.activeElement != left) {
        left.value = rect.x + (rect.x == '' ? '' : ' pt');
      }

      if (force || document.activeElement != top) {
        top.value = rect.y + (rect.y == '' ? '' : ' pt');
      }
    } else {
      div2.style.display = 'none';
    }
  });

  this.addKeyHandler(left, listener);
  this.addKeyHandler(top, listener);

  graph.getModel().addListener(mxEvent.CHANGE, listener);
  this.listeners.push({
    destroy: function destroy() {
      graph.getModel().removeListener(listener);
    }
  });
  listener();

  leftUpdate = this.addGeometryHandler(left, function (geo, value) {
    if (geo.relative) {
      geo.offset.x = value;
    } else {
      geo.x = value;
    }
  });
  topUpdate = this.addGeometryHandler(top, function (geo, value) {
    if (geo.relative) {
      geo.offset.y = value;
    } else {
      geo.y = value;
    }
  });

  container.appendChild(div2);
};

/**
 *
 */
ArrangePanel.prototype.addGeometryHandler = function (input, fn) {
  var ui = this.editorUi;
  var graph = ui.editor.graph;
  var initialValue = null;

  function update(evt) {
    if (input.value != '') {
      var value = parseFloat(input.value);

      if (value != initialValue) {
        graph.getModel().beginUpdate();
        try {
          var cells = graph.getSelectionCells();

          for (var i = 0; i < cells.length; i++) {
            if (graph.getModel().isVertex(cells[i])) {
              var geo = graph.getCellGeometry(cells[i]);

              if (geo != null) {
                geo = geo.clone();
                fn(geo, value);

                graph.getModel().setGeometry(cells[i], geo);
              }
            }
          }
        } finally {
          graph.getModel().endUpdate();
        }

        initialValue = value;
        input.value = value + ' pt';
      } else if (isNaN(value)) {
        input.value = initialValue + ' pt';
      }
    }

    mxEvent.consume(evt);
  }

  mxEvent.addListener(input, 'blur', update);
  mxEvent.addListener(input, 'change', update);
  mxEvent.addListener(input, 'focus', function () {
    initialValue = input.value;
  });

  return update;
};

/**
 *
 */
ArrangePanel.prototype.addEdgeGeometry = function (container) {
  var ui = this.editorUi;
  var graph = ui.editor.graph;
  var rect = this.format.getSelectionState();

  var div = this.createPanel();

  var span = document.createElement('div');
  span.style.position = 'absolute';
  span.style.width = '70px';
  span.style.marginTop = '0px';
  span.style.fontWeight = 'bold';
  mxUtils.write(span, mxResources.get('width'));
  div.appendChild(span);

  var widthUpdate, leftUpdate, topUpdate;
  var width = this.addUnitInput(div, 'pt', 20, 44, function () {
    widthUpdate.apply(this, arguments);
  });

  mxUtils.br(div);
  this.addKeyHandler(width, listener);

  function widthUpdate(evt) {
    // Maximum stroke width is 999
    var value = parseInt(width.value);
    value = Math.min(999, Math.max(1, isNaN(value) ? 1 : value));

    if (value != mxUtils.getValue(rect.style, 'width', mxCellRenderer.prototype.defaultShapes.flexArrow.prototype.defaultWidth)) {
      graph.setCellStyles('width', value, graph.getSelectionCells());
      ui.fireEvent(new mxEventObject('styleChanged', 'keys', ['width'], 'values', [value], 'cells', graph.getSelectionCells()));
    }

    width.value = value + ' pt';
    mxEvent.consume(evt);
  }

  mxEvent.addListener(width, 'blur', widthUpdate);
  mxEvent.addListener(width, 'change', widthUpdate);

  container.appendChild(div);

  var listener = mxUtils.bind(this, function (sender, evt, force) {
    rect = this.format.getSelectionState();

    if (rect.style.shape == 'link' || rect.style.shape == 'flexArrow') {
      div.style.display = '';

      if (force || document.activeElement != width) {
        var value = mxUtils.getValue(rect.style, 'width', mxCellRenderer.prototype.defaultShapes.flexArrow.prototype.defaultWidth);
        width.value = value + ' pt';
      }
    } else {
      div.style.display = 'none';
    }
  });

  graph.getModel().addListener(mxEvent.CHANGE, listener);
  this.listeners.push({
    destroy: function destroy() {
      graph.getModel().removeListener(listener);
    }
  });
  listener();
};

/**
 * Adds the label menu items to the given menu and parent.
 */
var TextFormatPanel = function TextFormatPanel(format, editorUi, container) {
  BaseFormatPanel.call(this, format, editorUi, container);
  this.init();
};

mxUtils.extend(TextFormatPanel, BaseFormatPanel);

/**
 * Adds the label menu items to the given menu and parent.
 */
TextFormatPanel.prototype.init = function () {
  this.container.style.borderBottom = 'none';
  this.addFont(this.container);
};

/**
 * Adds the label menu items to the given menu and parent.
 */
TextFormatPanel.prototype.addFont = function (container) {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;
  var ss = this.format.getSelectionState();

  var title = this.createTitle(mxResources.get('font'));
  title.style.paddingLeft = '18px';
  title.style.paddingTop = '10px';
  title.style.paddingBottom = '6px';
  container.appendChild(title);

  var stylePanel = this.createPanel();
  stylePanel.style.paddingTop = '2px';
  stylePanel.style.paddingBottom = '2px';
  stylePanel.style.position = 'relative';
  stylePanel.style.marginLeft = '-2px';
  stylePanel.style.borderWidth = '0px';
  stylePanel.className = 'geToolbarContainer';

  if (mxClient.IS_QUIRKS) {
    stylePanel.style.display = 'block';
  }

  if (graph.cellEditor.isContentEditing()) {
    var cssPanel = stylePanel.cloneNode();

    var cssMenu = this.editorUi.toolbar.addMenu(mxResources.get('style'), mxResources.get('style'), true, 'formatBlock', cssPanel);
    cssMenu.style.color = 'rgb(112, 112, 112)';
    cssMenu.style.whiteSpace = 'nowrap';
    cssMenu.style.overflow = 'hidden';
    cssMenu.style.margin = '0px';
    this.addArrow(cssMenu);
    cssMenu.style.width = '192px';
    cssMenu.style.height = '15px';

    var arrow = cssMenu.getElementsByTagName('div')[0];
    arrow.style.cssFloat = 'right';
    container.appendChild(cssPanel);
  }

  container.appendChild(stylePanel);

  var colorPanel = this.createPanel();
  colorPanel.style.marginTop = '8px';
  colorPanel.style.borderTop = '1px solid #c0c0c0';
  colorPanel.style.paddingTop = '6px';
  colorPanel.style.paddingBottom = '6px';

  var fontMenu = this.editorUi.toolbar.addMenu('Helvetica', mxResources.get('fontFamily'), true, 'fontFamily', stylePanel);
  fontMenu.style.color = 'rgb(112, 112, 112)';
  fontMenu.style.whiteSpace = 'nowrap';
  fontMenu.style.overflow = 'hidden';
  fontMenu.style.margin = '0px';

  this.addArrow(fontMenu);
  fontMenu.style.width = '192px';
  fontMenu.style.height = '15px';

  // Workaround for offset in FF
  if (mxClient.IS_FF) {
    fontMenu.getElementsByTagName('div')[0].style.marginTop = '-18px';
  }

  var stylePanel2 = stylePanel.cloneNode(false);
  stylePanel2.style.marginLeft = '-3px';
  var fontStyleItems = this.editorUi.toolbar.addItems(['bold', 'italic', 'underline'], stylePanel2, true);
  fontStyleItems[0].setAttribute('title', mxResources.get('bold') + ' (' + this.editorUi.actions.get('bold').shortcut + ')');
  fontStyleItems[1].setAttribute('title', mxResources.get('italic') + ' (' + this.editorUi.actions.get('italic').shortcut + ')');
  fontStyleItems[2].setAttribute('title', mxResources.get('underline') + ' (' + this.editorUi.actions.get('underline').shortcut + ')');

  var verticalItem = this.editorUi.toolbar.addItems(['vertical'], stylePanel2, true)[0];

  if (mxClient.IS_QUIRKS) {
    mxUtils.br(container);
  }

  container.appendChild(stylePanel2);

  this.styleButtons(fontStyleItems);
  this.styleButtons([verticalItem]);

  var stylePanel3 = stylePanel.cloneNode(false);
  stylePanel3.style.marginLeft = '-3px';
  stylePanel3.style.paddingBottom = '0px';

  var left = this.editorUi.toolbar.addButton('geSprite-left', mxResources.get('left'), graph.cellEditor.isContentEditing() ? function () {
    document.execCommand('justifyleft', false, null);
  } : this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_ALIGN], [mxConstants.ALIGN_LEFT]), stylePanel3);
  var center = this.editorUi.toolbar.addButton('geSprite-center', mxResources.get('center'), graph.cellEditor.isContentEditing() ? function () {
    document.execCommand('justifycenter', false, null);
  } : this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_ALIGN], [mxConstants.ALIGN_CENTER]), stylePanel3);
  var right = this.editorUi.toolbar.addButton('geSprite-right', mxResources.get('right'), graph.cellEditor.isContentEditing() ? function () {
    document.execCommand('justifyright', false, null);
  } : this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_ALIGN], [mxConstants.ALIGN_RIGHT]), stylePanel3);

  this.styleButtons([left, center, right]);

  if (graph.cellEditor.isContentEditing()) {
    var clear = this.editorUi.toolbar.addButton('geSprite-removeformat', mxResources.get('removeFormat'), function () {
      document.execCommand('removeformat', false, null);
    }, stylePanel2);
    this.styleButtons([clear]);
  }

  var top = this.editorUi.toolbar.addButton('geSprite-top', mxResources.get('top'), this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_VERTICAL_ALIGN], [mxConstants.ALIGN_TOP]), stylePanel3);
  var middle = this.editorUi.toolbar.addButton('geSprite-middle', mxResources.get('middle'), this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_VERTICAL_ALIGN], [mxConstants.ALIGN_MIDDLE]), stylePanel3);
  var bottom = this.editorUi.toolbar.addButton('geSprite-bottom', mxResources.get('bottom'), this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_VERTICAL_ALIGN], [mxConstants.ALIGN_BOTTOM]), stylePanel3);

  this.styleButtons([top, middle, bottom]);

  if (mxClient.IS_QUIRKS) {
    mxUtils.br(container);
  }

  container.appendChild(stylePanel3);

  // Hack for updating UI state below based on current text selection
  // currentTable is the current selected DOM table updated below
  var sub, sup, full, tableWrapper, currentTable, tableCell, tableRow;

  if (graph.cellEditor.isContentEditing()) {
    top.style.display = 'none';
    middle.style.display = 'none';
    bottom.style.display = 'none';
    verticalItem.style.display = 'none';

    full = this.editorUi.toolbar.addButton('geSprite-justifyfull', null, function () {
      document.execCommand('justifyfull', false, null);
    }, stylePanel3);
    this.styleButtons([full, sub = this.editorUi.toolbar.addButton('geSprite-subscript', mxResources.get('subscript') + ' (Ctrl+,)', function () {
      document.execCommand('subscript', false, null);
    }, stylePanel3), sup = this.editorUi.toolbar.addButton('geSprite-superscript', mxResources.get('superscript') + ' (Ctrl+.)', function () {
      document.execCommand('superscript', false, null);
    }, stylePanel3)]);
    full.style.marginRight = '9px';

    var tmp = stylePanel3.cloneNode(false);
    tmp.style.paddingTop = '4px';
    var btns = [this.editorUi.toolbar.addButton('geSprite-orderedlist', mxResources.get('numberedList'), function () {
      document.execCommand('insertorderedlist', false, null);
    }, tmp), this.editorUi.toolbar.addButton('geSprite-unorderedlist', mxResources.get('bulletedList'), function () {
      document.execCommand('insertunorderedlist', false, null);
    }, tmp), this.editorUi.toolbar.addButton('geSprite-outdent', mxResources.get('decreaseIndent'), function () {
      document.execCommand('outdent', false, null);
    }, tmp), this.editorUi.toolbar.addButton('geSprite-indent', mxResources.get('increaseIndent'), function () {
      document.execCommand('indent', false, null);
    }, tmp), this.editorUi.toolbar.addButton('geSprite-code', mxResources.get('html'), function () {
      graph.cellEditor.toggleViewMode();
    }, tmp)];
    this.styleButtons(btns);
    btns[btns.length - 1].style.marginLeft = '9px';

    if (mxClient.IS_QUIRKS) {
      mxUtils.br(container);
      tmp.style.height = '40';
    }

    container.appendChild(tmp);
  } else {
    fontStyleItems[2].style.marginRight = '9px';
    right.style.marginRight = '9px';
  }

  // Label position
  var stylePanel4 = stylePanel.cloneNode(false);
  stylePanel4.style.marginLeft = '0px';
  stylePanel4.style.paddingTop = '8px';
  stylePanel4.style.paddingBottom = '4px';
  stylePanel4.style.fontWeight = 'normal';

  mxUtils.write(stylePanel4, mxResources.get('position'));

  // Adds label position options
  var positionSelect = document.createElement('select');
  positionSelect.style.position = 'absolute';
  positionSelect.style.right = '20px';
  positionSelect.style.width = '97px';
  positionSelect.style.marginTop = '-2px';

  var directions = ['topLeft', 'top', 'topRight', 'left', 'center', 'right', 'bottomLeft', 'bottom', 'bottomRight'];
  var lset = {
    topLeft: [mxConstants.ALIGN_LEFT, mxConstants.ALIGN_TOP, mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_BOTTOM],
    top: [mxConstants.ALIGN_CENTER, mxConstants.ALIGN_TOP, mxConstants.ALIGN_CENTER, mxConstants.ALIGN_BOTTOM],
    topRight: [mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_TOP, mxConstants.ALIGN_LEFT, mxConstants.ALIGN_BOTTOM],
    left: [mxConstants.ALIGN_LEFT, mxConstants.ALIGN_MIDDLE, mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_MIDDLE],
    center: [mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE],
    right: [mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_MIDDLE, mxConstants.ALIGN_LEFT, mxConstants.ALIGN_MIDDLE],
    bottomLeft: [mxConstants.ALIGN_LEFT, mxConstants.ALIGN_BOTTOM, mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_TOP],
    bottom: [mxConstants.ALIGN_CENTER, mxConstants.ALIGN_BOTTOM, mxConstants.ALIGN_CENTER, mxConstants.ALIGN_TOP],
    bottomRight: [mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_BOTTOM, mxConstants.ALIGN_LEFT, mxConstants.ALIGN_TOP]
  };

  for (var i = 0; i < directions.length; i++) {
    var positionOption = document.createElement('option');
    positionOption.setAttribute('value', directions[i]);
    mxUtils.write(positionOption, mxResources.get(directions[i]));
    positionSelect.appendChild(positionOption);
  }

  stylePanel4.appendChild(positionSelect);

  // Writing direction
  var stylePanel5 = stylePanel.cloneNode(false);
  stylePanel5.style.marginLeft = '0px';
  stylePanel5.style.paddingTop = '4px';
  stylePanel5.style.paddingBottom = '4px';
  stylePanel5.style.fontWeight = 'normal';

  mxUtils.write(stylePanel5, mxResources.get('writingDirection'));

  // Adds writing direction options
  // LATER: Handle reselect of same option in all selects (change event
  // is not fired for same option so have opened state on click) and
  // handle multiple different styles for current selection
  var dirSelect = document.createElement('select');
  dirSelect.style.position = 'absolute';
  dirSelect.style.right = '20px';
  dirSelect.style.width = '97px';
  dirSelect.style.marginTop = '-2px';

  // NOTE: For automatic we use the value null since automatic
  // requires the text to be non formatted and non-wrapped
  var dirs = ['automatic', 'leftToRight', 'rightToLeft'];
  var dirSet = {
    automatic: null,
    leftToRight: mxConstants.TEXT_DIRECTION_LTR,
    rightToLeft: mxConstants.TEXT_DIRECTION_RTL
  };

  for (var i = 0; i < dirs.length; i++) {
    var dirOption = document.createElement('option');
    dirOption.setAttribute('value', dirs[i]);
    mxUtils.write(dirOption, mxResources.get(dirs[i]));
    dirSelect.appendChild(dirOption);
  }

  stylePanel5.appendChild(dirSelect);

  if (!graph.isEditing()) {
    container.appendChild(stylePanel4);

    mxEvent.addListener(positionSelect, 'change', function (evt) {
      graph.getModel().beginUpdate();
      try {
        var vals = lset[positionSelect.value];

        if (vals != null) {
          graph.setCellStyles(mxConstants.STYLE_LABEL_POSITION, vals[0], graph.getSelectionCells());
          graph.setCellStyles(mxConstants.STYLE_VERTICAL_LABEL_POSITION, vals[1], graph.getSelectionCells());
          graph.setCellStyles(mxConstants.STYLE_ALIGN, vals[2], graph.getSelectionCells());
          graph.setCellStyles(mxConstants.STYLE_VERTICAL_ALIGN, vals[3], graph.getSelectionCells());
        }
      } finally {
        graph.getModel().endUpdate();
      }

      mxEvent.consume(evt);
    });

    // LATER: Update dir in text editor while editing and update style with label
    // NOTE: The tricky part is handling and passing on the auto value
    container.appendChild(stylePanel5);

    mxEvent.addListener(dirSelect, 'change', function (evt) {
      graph.setCellStyles(mxConstants.STYLE_TEXT_DIRECTION, dirSet[dirSelect.value], graph.getSelectionCells());
      mxEvent.consume(evt);
    });
  }

  // Font size
  var input = document.createElement('input');
  input.style.textAlign = 'right';
  input.style.marginTop = '4px';

  if (!mxClient.IS_QUIRKS) {
    input.style.position = 'absolute';
    input.style.right = '32px';
  }

  input.style.width = '46px';
  input.style.height = mxClient.IS_QUIRKS ? '21px' : '17px';
  stylePanel2.appendChild(input);

  // Workaround for font size 4 if no text is selected is update font size below
  // after first character was entered (as the font element is lazy created)
  var pendingFontSize = null;

  var inputUpdate = this.installInputHandler(input, mxConstants.STYLE_FONTSIZE, Menus.prototype.defaultFontSize, 1, 999, ' pt', function (fontsize) {
    pendingFontSize = fontsize;

    // Workaround for can't set font size in px is to change font size afterwards
    document.execCommand('fontSize', false, '4');
    var elts = graph.cellEditor.textarea.getElementsByTagName('font');

    for (var i = 0; i < elts.length; i++) {
      if (elts[i].getAttribute('size') == '4') {
        elts[i].removeAttribute('size');
        elts[i].style.fontSize = pendingFontSize + 'px';

        // Overrides fontSize in input with the one just assigned as a workaround
        // for potential fontSize values of parent elements that don't match
        window.setTimeout(function () {
          input.value = pendingFontSize + ' pt';
          pendingFontSize = null;
        }, 0);

        break;
      }
    }
  }, true);

  var stepper = this.createStepper(input, inputUpdate, 1, 10, true, Menus.prototype.defaultFontSize);
  stepper.style.display = input.style.display;
  stepper.style.marginTop = '4px';

  if (!mxClient.IS_QUIRKS) {
    stepper.style.right = '20px';
  }

  stylePanel2.appendChild(stepper);

  var arrow = fontMenu.getElementsByTagName('div')[0];
  arrow.style.cssFloat = 'right';

  var bgColorApply = null;
  var currentBgColor = '#ffffff';

  var fontColorApply = null;
  var currentFontColor = '#000000';

  var bgPanel = graph.cellEditor.isContentEditing() ? this.createColorOption(mxResources.get('backgroundColor'), function () {
    return currentBgColor;
  }, function (color) {
    document.execCommand('backcolor', false, color != mxConstants.NONE ? color : 'transparent');
  }, '#ffffff', {
    install: function install(apply) {
      bgColorApply = apply;
    },
    destroy: function destroy() {
      bgColorApply = null;
    }
  }, null, true) : this.createCellColorOption(mxResources.get('backgroundColor'), mxConstants.STYLE_LABEL_BACKGROUNDCOLOR, '#ffffff');
  bgPanel.style.fontWeight = 'bold';

  var borderPanel = this.createCellColorOption(mxResources.get('borderColor'), mxConstants.STYLE_LABEL_BORDERCOLOR, '#000000');
  borderPanel.style.fontWeight = 'bold';

  var panel = graph.cellEditor.isContentEditing() ? this.createColorOption(mxResources.get('fontColor'), function () {
    return currentFontColor;
  }, function (color) {
    document.execCommand('forecolor', false, color != mxConstants.NONE ? color : 'transparent');
  }, '#000000', {
    install: function install(apply) {
      fontColorApply = apply;
    },
    destroy: function destroy() {
      fontColorApply = null;
    }
  }, null, true) : this.createCellColorOption(mxResources.get('fontColor'), mxConstants.STYLE_FONTCOLOR, '#000000', function (color) {
    if (color == null || color == mxConstants.NONE) {
      bgPanel.style.display = 'none';
    } else {
      bgPanel.style.display = '';
    }

    borderPanel.style.display = bgPanel.style.display;
  }, function (color) {
    if (color == null || color == mxConstants.NONE) {
      graph.setCellStyles(mxConstants.STYLE_NOLABEL, '1', graph.getSelectionCells());
    } else {
      graph.setCellStyles(mxConstants.STYLE_NOLABEL, null, graph.getSelectionCells());
    }
  });
  panel.style.fontWeight = 'bold';

  colorPanel.appendChild(panel);
  colorPanel.appendChild(bgPanel);

  if (!graph.cellEditor.isContentEditing()) {
    colorPanel.appendChild(borderPanel);
  }

  container.appendChild(colorPanel);

  var extraPanel = this.createPanel();
  extraPanel.style.paddingTop = '2px';
  extraPanel.style.paddingBottom = '4px';

  // LATER: Fix toggle using '' instead of 'null'
  var wwOpt = this.createCellOption(mxResources.get('wordWrap'), mxConstants.STYLE_WHITE_SPACE, null, 'wrap', 'null', null, null, true);
  wwOpt.style.fontWeight = 'bold';

  // Word wrap in edge labels only supported via labelWidth style
  if (!ss.containsLabel && !ss.autoSize && ss.edges.length == 0) {
    extraPanel.appendChild(wwOpt);
  }

  // Delegates switch of style to formattedText action as it also convertes newlines
  var htmlOpt = this.createCellOption(mxResources.get('formattedText'), 'html', '0', null, null, null, ui.actions.get('formattedText'));
  htmlOpt.style.fontWeight = 'bold';
  extraPanel.appendChild(htmlOpt);

  var spacingPanel = this.createPanel();
  spacingPanel.style.paddingTop = '10px';
  spacingPanel.style.paddingBottom = '28px';
  spacingPanel.style.fontWeight = 'normal';

  var span = document.createElement('div');
  span.style.position = 'absolute';
  span.style.width = '70px';
  span.style.marginTop = '0px';
  span.style.fontWeight = 'bold';
  mxUtils.write(span, mxResources.get('spacing'));
  spacingPanel.appendChild(span);

  var topUpdate, globalUpdate, leftUpdate, bottomUpdate, rightUpdate;
  var topSpacing = this.addUnitInput(spacingPanel, 'pt', 91, 44, function () {
    topUpdate.apply(this, arguments);
  });
  var globalSpacing = this.addUnitInput(spacingPanel, 'pt', 20, 44, function () {
    globalUpdate.apply(this, arguments);
  });

  mxUtils.br(spacingPanel);
  this.addLabel(spacingPanel, mxResources.get('top'), 91);
  this.addLabel(spacingPanel, mxResources.get('global'), 20);
  mxUtils.br(spacingPanel);
  mxUtils.br(spacingPanel);

  var leftSpacing = this.addUnitInput(spacingPanel, 'pt', 162, 44, function () {
    leftUpdate.apply(this, arguments);
  });
  var bottomSpacing = this.addUnitInput(spacingPanel, 'pt', 91, 44, function () {
    bottomUpdate.apply(this, arguments);
  });
  var rightSpacing = this.addUnitInput(spacingPanel, 'pt', 20, 44, function () {
    rightUpdate.apply(this, arguments);
  });

  mxUtils.br(spacingPanel);
  this.addLabel(spacingPanel, mxResources.get('left'), 162);
  this.addLabel(spacingPanel, mxResources.get('bottom'), 91);
  this.addLabel(spacingPanel, mxResources.get('right'), 20);

  if (!graph.cellEditor.isContentEditing()) {
    container.appendChild(extraPanel);
    container.appendChild(this.createRelativeOption(mxResources.get('opacity'), mxConstants.STYLE_TEXT_OPACITY));
    container.appendChild(spacingPanel);
  } else {
    var selState = null;
    var lineHeightInput = null;

    container.appendChild(this.createRelativeOption(mxResources.get('lineheight'), null, null, function (input) {
      var value = input.value == '' ? 120 : parseInt(input.value);
      value = Math.max(120, isNaN(value) ? 120 : value);

      if (selState != null) {
        graph.cellEditor.restoreSelection(selState);
        selState = null;
      }

      var selectedElement = graph.getSelectedElement();
      var node = selectedElement;

      while (node != null && node.nodeType != mxConstants.NODETYPE_ELEMENT) {
        node = node.parentNode;
      }

      if (node != null && node == graph.cellEditor.textarea && graph.cellEditor.textarea.firstChild != null) {
        if (graph.cellEditor.textarea.firstChild.nodeName != 'FONT') {
          graph.cellEditor.textarea.innerHTML = '<font>' + graph.cellEditor.textarea.innerHTML + '</font>';
        }

        node = graph.cellEditor.textarea.firstChild;
      }

      if (node != null && node != graph.cellEditor.textarea) {
        node.style.lineHeight = value + '%';
      }

      input.value = value + ' %';
    }, function (input) {
      // Used in CSS handler to update current value
      lineHeightInput = input;

      // KNOWN: Arrow up/down clear selection text in quirks/IE 8
      // Text size via arrow button limits to 16 in IE11. Why?
      mxEvent.addListener(input, 'mousedown', function () {
        selState = graph.cellEditor.saveSelection();
      });

      mxEvent.addListener(input, 'touchstart', function () {
        selState = graph.cellEditor.saveSelection();
      });

      input.value = '120 %';
    }));

    var insertPanel = stylePanel.cloneNode(false);
    insertPanel.style.paddingLeft = '0px';
    var insertBtns = this.editorUi.toolbar.addItems(['link', 'image'], insertPanel, true);

    var btns = [this.editorUi.toolbar.addButton('geSprite-horizontalrule', mxResources.get('insertHorizontalRule'), function () {
      document.execCommand('inserthorizontalrule', false, null);
    }, insertPanel), this.editorUi.toolbar.addMenuFunctionInContainer(insertPanel, 'geSprite-table', mxResources.get('table'), false, mxUtils.bind(this, function (menu) {
      this.editorUi.menus.addInsertTableItem(menu);
    }))];
    this.styleButtons(insertBtns);
    this.styleButtons(btns);

    var wrapper2 = this.createPanel();
    wrapper2.style.paddingTop = '10px';
    wrapper2.style.paddingBottom = '10px';
    wrapper2.appendChild(this.createTitle(mxResources.get('insert')));
    wrapper2.appendChild(insertPanel);
    container.appendChild(wrapper2);

    if (mxClient.IS_QUIRKS) {
      wrapper2.style.height = '70';
    }

    var tablePanel = stylePanel.cloneNode(false);
    tablePanel.style.paddingLeft = '0px';

    var btns = [this.editorUi.toolbar.addButton('geSprite-insertcolumnbefore', mxResources.get('insertColumnBefore'), function () {
      try {
        if (currentTable != null) {
          graph.selectNode(graph.insertColumn(currentTable, tableCell != null ? tableCell.cellIndex : 0));
        }
      } catch (e) {
        alert(e);
      }
    }, tablePanel), this.editorUi.toolbar.addButton('geSprite-insertcolumnafter', mxResources.get('insertColumnAfter'), function () {
      try {
        if (currentTable != null) {
          graph.selectNode(graph.insertColumn(currentTable, tableCell != null ? tableCell.cellIndex + 1 : -1));
        }
      } catch (e) {
        alert(e);
      }
    }, tablePanel), this.editorUi.toolbar.addButton('geSprite-deletecolumn', mxResources.get('deleteColumn'), function () {
      try {
        if (currentTable != null && tableCell != null) {
          graph.deleteColumn(currentTable, tableCell.cellIndex);
        }
      } catch (e) {
        alert(e);
      }
    }, tablePanel), this.editorUi.toolbar.addButton('geSprite-insertrowbefore', mxResources.get('insertRowBefore'), function () {
      try {
        if (currentTable != null && tableRow != null) {
          graph.selectNode(graph.insertRow(currentTable, tableRow.sectionRowIndex));
        }
      } catch (e) {
        alert(e);
      }
    }, tablePanel), this.editorUi.toolbar.addButton('geSprite-insertrowafter', mxResources.get('insertRowAfter'), function () {
      try {
        if (currentTable != null && tableRow != null) {
          graph.selectNode(graph.insertRow(currentTable, tableRow.sectionRowIndex + 1));
        }
      } catch (e) {
        alert(e);
      }
    }, tablePanel), this.editorUi.toolbar.addButton('geSprite-deleterow', mxResources.get('deleteRow'), function () {
      try {
        if (currentTable != null && tableRow != null) {
          graph.deleteRow(currentTable, tableRow.sectionRowIndex);
        }
      } catch (e) {
        alert(e);
      }
    }, tablePanel)];
    this.styleButtons(btns);
    btns[2].style.marginRight = '9px';

    var wrapper3 = this.createPanel();
    wrapper3.style.paddingTop = '10px';
    wrapper3.style.paddingBottom = '10px';
    wrapper3.appendChild(this.createTitle(mxResources.get('table')));
    wrapper3.appendChild(tablePanel);

    if (mxClient.IS_QUIRKS) {
      mxUtils.br(container);
      wrapper3.style.height = '70';
    }

    var tablePanel2 = stylePanel.cloneNode(false);
    tablePanel2.style.paddingLeft = '0px';

    var btns = [this.editorUi.toolbar.addButton('geSprite-strokecolor', mxResources.get('borderColor'), mxUtils.bind(this, function () {
      if (currentTable != null) {
        // Converts rgb(r,g,b) values
        var color = currentTable.style.borderColor.replace(/\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g, function ($0, $1, $2, $3) {
          return '#' + ('0' + Number($1).toString(16)).substr(-2) + ('0' + Number($2).toString(16)).substr(-2) + ('0' + Number($3).toString(16)).substr(-2);
        });
        this.editorUi.pickColor(color, function (newColor) {
          if (newColor == null || newColor == mxConstants.NONE) {
            currentTable.removeAttribute('border');
            currentTable.style.border = '';
            currentTable.style.borderCollapse = '';
          } else {
            currentTable.setAttribute('border', '1');
            currentTable.style.border = '1px solid ' + newColor;
            currentTable.style.borderCollapse = 'collapse';
          }
        });
      }
    }), tablePanel2), this.editorUi.toolbar.addButton('geSprite-fillcolor', mxResources.get('backgroundColor'), mxUtils.bind(this, function () {
      // Converts rgb(r,g,b) values
      if (currentTable != null) {
        var color = currentTable.style.backgroundColor.replace(/\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g, function ($0, $1, $2, $3) {
          return '#' + ('0' + Number($1).toString(16)).substr(-2) + ('0' + Number($2).toString(16)).substr(-2) + ('0' + Number($3).toString(16)).substr(-2);
        });
        this.editorUi.pickColor(color, function (newColor) {
          if (newColor == null || newColor == mxConstants.NONE) {
            currentTable.style.backgroundColor = '';
          } else {
            currentTable.style.backgroundColor = newColor;
          }
        });
      }
    }), tablePanel2), this.editorUi.toolbar.addButton('geSprite-fit', mxResources.get('spacing'), function () {
      if (currentTable != null) {
        var value = currentTable.getAttribute('cellPadding') || 0;

        var dlg = new FilenameDialog(ui, value, mxResources.get('apply'), mxUtils.bind(this, function (newValue) {
          if (newValue != null && newValue.length > 0) {
            currentTable.setAttribute('cellPadding', newValue);
          } else {
            currentTable.removeAttribute('cellPadding');
          }
        }), mxResources.get('spacing'));
        ui.showDialog(dlg.container, 300, 80, true, true);
        dlg.init();
      }
    }, tablePanel2), this.editorUi.toolbar.addButton('geSprite-left', mxResources.get('left'), function () {
      if (currentTable != null) {
        currentTable.setAttribute('align', 'left');
      }
    }, tablePanel2), this.editorUi.toolbar.addButton('geSprite-center', mxResources.get('center'), function () {
      if (currentTable != null) {
        currentTable.setAttribute('align', 'center');
      }
    }, tablePanel2), this.editorUi.toolbar.addButton('geSprite-right', mxResources.get('right'), function () {
      if (currentTable != null) {
        currentTable.setAttribute('align', 'right');
      }
    }, tablePanel2)];
    this.styleButtons(btns);
    btns[2].style.marginRight = '9px';

    if (mxClient.IS_QUIRKS) {
      mxUtils.br(wrapper3);
      mxUtils.br(wrapper3);
    }

    wrapper3.appendChild(tablePanel2);
    container.appendChild(wrapper3);

    tableWrapper = wrapper3;
  }

  function setSelected(elt, selected) {
    if (mxClient.IS_IE && (mxClient.IS_QUIRKS || document.documentMode < 10)) {
      elt.style.filter = selected ? 'progid:DXImageTransform.Microsoft.Gradient(' + 'StartColorStr=\'#c5ecff\', EndColorStr=\'#87d4fb\', GradientType=0)' : '';
    } else {
      elt.style.backgroundImage = selected ? 'linear-gradient(#c5ecff 0px,#87d4fb 100%)' : '';
    }
  }

  var listener = mxUtils.bind(this, function (sender, evt, force) {
    ss = this.format.getSelectionState();
    var fontStyle = mxUtils.getValue(ss.style, mxConstants.STYLE_FONTSTYLE, 0);
    setSelected(fontStyleItems[0], (fontStyle & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD);
    setSelected(fontStyleItems[1], (fontStyle & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC);
    setSelected(fontStyleItems[2], (fontStyle & mxConstants.FONT_UNDERLINE) == mxConstants.FONT_UNDERLINE);
    fontMenu.firstChild.nodeValue = mxUtils.htmlEntities(mxUtils.getValue(ss.style, mxConstants.STYLE_FONTFAMILY, Menus.prototype.defaultFont));

    setSelected(verticalItem, mxUtils.getValue(ss.style, mxConstants.STYLE_HORIZONTAL, '1') == '0');

    if (force || document.activeElement != input) {
      var tmp = parseFloat(mxUtils.getValue(ss.style, mxConstants.STYLE_FONTSIZE, Menus.prototype.defaultFontSize));
      input.value = isNaN(tmp) ? '' : tmp + ' pt';
    }

    var align = mxUtils.getValue(ss.style, mxConstants.STYLE_ALIGN, mxConstants.ALIGN_CENTER);
    setSelected(left, align == mxConstants.ALIGN_LEFT);
    setSelected(center, align == mxConstants.ALIGN_CENTER);
    setSelected(right, align == mxConstants.ALIGN_RIGHT);

    var valign = mxUtils.getValue(ss.style, mxConstants.STYLE_VERTICAL_ALIGN, mxConstants.ALIGN_MIDDLE);
    setSelected(top, valign == mxConstants.ALIGN_TOP);
    setSelected(middle, valign == mxConstants.ALIGN_MIDDLE);
    setSelected(bottom, valign == mxConstants.ALIGN_BOTTOM);

    var pos = mxUtils.getValue(ss.style, mxConstants.STYLE_LABEL_POSITION, mxConstants.ALIGN_CENTER);
    var vpos = mxUtils.getValue(ss.style, mxConstants.STYLE_VERTICAL_LABEL_POSITION, mxConstants.ALIGN_MIDDLE);

    if (pos == mxConstants.ALIGN_LEFT && vpos == mxConstants.ALIGN_TOP) {
      positionSelect.value = 'topLeft';
    } else if (pos == mxConstants.ALIGN_CENTER && vpos == mxConstants.ALIGN_TOP) {
      positionSelect.value = 'top';
    } else if (pos == mxConstants.ALIGN_RIGHT && vpos == mxConstants.ALIGN_TOP) {
      positionSelect.value = 'topRight';
    } else if (pos == mxConstants.ALIGN_LEFT && vpos == mxConstants.ALIGN_BOTTOM) {
      positionSelect.value = 'bottomLeft';
    } else if (pos == mxConstants.ALIGN_CENTER && vpos == mxConstants.ALIGN_BOTTOM) {
      positionSelect.value = 'bottom';
    } else if (pos == mxConstants.ALIGN_RIGHT && vpos == mxConstants.ALIGN_BOTTOM) {
      positionSelect.value = 'bottomRight';
    } else if (pos == mxConstants.ALIGN_LEFT) {
      positionSelect.value = 'left';
    } else if (pos == mxConstants.ALIGN_RIGHT) {
      positionSelect.value = 'right';
    } else {
      positionSelect.value = 'center';
    }

    var dir = mxUtils.getValue(ss.style, mxConstants.STYLE_TEXT_DIRECTION, mxConstants.DEFAULT_TEXT_DIRECTION);

    if (dir == mxConstants.TEXT_DIRECTION_RTL) {
      dirSelect.value = 'rightToLeft';
    } else if (dir == mxConstants.TEXT_DIRECTION_LTR) {
      dirSelect.value = 'leftToRight';
    } else if (dir == mxConstants.TEXT_DIRECTION_AUTO) {
      dirSelect.value = 'automatic';
    }

    if (force || document.activeElement != globalSpacing) {
      var tmp = parseFloat(mxUtils.getValue(ss.style, mxConstants.STYLE_SPACING, 2));
      globalSpacing.value = isNaN(tmp) ? '' : tmp + ' pt';
    }

    if (force || document.activeElement != topSpacing) {
      var tmp = parseFloat(mxUtils.getValue(ss.style, mxConstants.STYLE_SPACING_TOP, 0));
      topSpacing.value = isNaN(tmp) ? '' : tmp + ' pt';
    }

    if (force || document.activeElement != rightSpacing) {
      var tmp = parseFloat(mxUtils.getValue(ss.style, mxConstants.STYLE_SPACING_RIGHT, 0));
      rightSpacing.value = isNaN(tmp) ? '' : tmp + ' pt';
    }

    if (force || document.activeElement != bottomSpacing) {
      var tmp = parseFloat(mxUtils.getValue(ss.style, mxConstants.STYLE_SPACING_BOTTOM, 0));
      bottomSpacing.value = isNaN(tmp) ? '' : tmp + ' pt';
    }

    if (force || document.activeElement != leftSpacing) {
      var tmp = parseFloat(mxUtils.getValue(ss.style, mxConstants.STYLE_SPACING_LEFT, 0));
      leftSpacing.value = isNaN(tmp) ? '' : tmp + ' pt';
    }
  });

  globalUpdate = this.installInputHandler(globalSpacing, mxConstants.STYLE_SPACING, 2, -999, 999, ' pt');
  topUpdate = this.installInputHandler(topSpacing, mxConstants.STYLE_SPACING_TOP, 0, -999, 999, ' pt');
  rightUpdate = this.installInputHandler(rightSpacing, mxConstants.STYLE_SPACING_RIGHT, 0, -999, 999, ' pt');
  bottomUpdate = this.installInputHandler(bottomSpacing, mxConstants.STYLE_SPACING_BOTTOM, 0, -999, 999, ' pt');
  leftUpdate = this.installInputHandler(leftSpacing, mxConstants.STYLE_SPACING_LEFT, 0, -999, 999, ' pt');

  this.addKeyHandler(input, listener);
  this.addKeyHandler(globalSpacing, listener);
  this.addKeyHandler(topSpacing, listener);
  this.addKeyHandler(rightSpacing, listener);
  this.addKeyHandler(bottomSpacing, listener);
  this.addKeyHandler(leftSpacing, listener);

  graph.getModel().addListener(mxEvent.CHANGE, listener);
  this.listeners.push({
    destroy: function destroy() {
      graph.getModel().removeListener(listener);
    }
  });
  listener();

  if (graph.cellEditor.isContentEditing()) {
    var updating = false;

    var updateCssHandler = function updateCssHandler() {
      if (!updating) {
        updating = true;

        window.setTimeout(function () {
          var selectedElement = graph.getSelectedElement();
          var node = selectedElement;

          while (node != null && node.nodeType != mxConstants.NODETYPE_ELEMENT) {
            node = node.parentNode;
          }

          if (node != null) {
            var css = mxUtils.getCurrentStyle(node);

            if (css != null) {
              setSelected(fontStyleItems[0], css.fontWeight == 'bold' || graph.getParentByName(node, 'B', graph.cellEditor.textarea) != null);
              setSelected(fontStyleItems[1], css.fontStyle == 'italic' || graph.getParentByName(node, 'I', graph.cellEditor.textarea) != null);
              setSelected(fontStyleItems[2], graph.getParentByName(node, 'U', graph.cellEditor.textarea) != null);
              setSelected(left, css.textAlign == 'left');
              setSelected(center, css.textAlign == 'center');
              setSelected(right, css.textAlign == 'right');
              setSelected(full, css.textAlign == 'justify');
              setSelected(sup, graph.getParentByName(node, 'SUP', graph.cellEditor.textarea) != null);
              setSelected(sub, graph.getParentByName(node, 'SUB', graph.cellEditor.textarea) != null);

              currentTable = graph.getParentByName(node, 'TABLE', graph.cellEditor.textarea);
              tableRow = currentTable == null ? null : graph.getParentByName(node, 'TR', currentTable);
              tableCell = currentTable == null ? null : graph.getParentByName(node, 'TD', currentTable);
              tableWrapper.style.display = currentTable != null ? '' : 'none';

              if (document.activeElement != input) {
                if (node.nodeName == 'FONT' && node.getAttribute('size') == '4' && pendingFontSize != null) {
                  node.removeAttribute('size');
                  node.style.fontSize = pendingFontSize + 'px';
                  pendingFontSize = null;
                } else {
                  input.value = parseFloat(css.fontSize) + ' pt';
                }

                var tmp = node.style.lineHeight || css.lineHeight;
                var lh = parseFloat(tmp);

                if (tmp.substring(tmp.length - 2) == 'px') {
                  lh /= parseFloat(css.fontSize);
                }

                if (tmp.substring(tmp.length - 1) != '%') {
                  lh *= 100;
                }

                lineHeightInput.value = lh + ' %';
              }

              // Converts rgb(r,g,b) values
              var color = css.color.replace(/\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g, function ($0, $1, $2, $3) {
                return '#' + ('0' + Number($1).toString(16)).substr(-2) + ('0' + Number($2).toString(16)).substr(-2) + ('0' + Number($3).toString(16)).substr(-2);
              });
              var color2 = css.backgroundColor.replace(/\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g, function ($0, $1, $2, $3) {
                return '#' + ('0' + Number($1).toString(16)).substr(-2) + ('0' + Number($2).toString(16)).substr(-2) + ('0' + Number($3).toString(16)).substr(-2);
              });

              // Updates the color picker for the current font
              if (fontColorApply != null) {
                if (color.charAt(0) == '#') {
                  currentFontColor = color;
                } else {
                  currentFontColor = '#000000';
                }

                fontColorApply(currentFontColor, true);
              }

              if (bgColorApply != null) {
                if (color2.charAt(0) == '#') {
                  currentBgColor = color2;
                } else {
                  currentBgColor = null;
                }

                bgColorApply(currentBgColor, true);
              }

              // Workaround for firstChild is null or not an object
              // in the log which seems to be IE8- only / 29.01.15
              if (fontMenu.firstChild != null) {
                // Strips leading and trailing quotes
                var ff = css.fontFamily;

                if (ff.charAt(0) == '\'') {
                  ff = ff.substring(1);
                }

                if (ff.charAt(ff.length - 1) == '\'') {
                  ff = ff.substring(0, ff.length - 1);
                }

                fontMenu.firstChild.nodeValue = ff;
              }
            }
          }

          updating = false;
        }, 0);
      }
    };

    mxEvent.addListener(graph.cellEditor.textarea, 'input', updateCssHandler);
    mxEvent.addListener(graph.cellEditor.textarea, 'touchend', updateCssHandler);
    mxEvent.addListener(graph.cellEditor.textarea, 'mouseup', updateCssHandler);
    mxEvent.addListener(graph.cellEditor.textarea, 'keyup', updateCssHandler);
    this.listeners.push({
      destroy: function destroy() {
        // No need to remove listener since textarea is destroyed after edit
      }
    });
    updateCssHandler();
  }

  return container;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
var StyleFormatPanel = function StyleFormatPanel(format, editorUi, container) {
  BaseFormatPanel.call(this, format, editorUi, container);
  this.init();
};

mxUtils.extend(StyleFormatPanel, BaseFormatPanel);

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel.prototype.init = function () {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;
  var ss = this.format.getSelectionState();

  if (!ss.containsImage || ss.style.shape == 'image') {
    this.container.appendChild(this.addFill(this.createPanel()));
  }

  this.container.appendChild(this.addStroke(this.createPanel()));
  var opacityPanel = this.createRelativeOption(mxResources.get('opacity'), mxConstants.STYLE_OPACITY, 41);
  opacityPanel.style.paddingTop = '8px';
  opacityPanel.style.paddingBottom = '8px';
  this.container.appendChild(opacityPanel);
  this.container.appendChild(this.addEffects(this.createPanel()));
  var opsPanel = this.addEditOps(this.createPanel());

  if (opsPanel.firstChild != null) {
    mxUtils.br(opsPanel);
  }

  this.container.appendChild(this.addStyleOps(opsPanel));
};

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel.prototype.addEditOps = function (div) {
  var ss = this.format.getSelectionState();
  var btn = null;

  if (this.editorUi.editor.graph.getSelectionCount() == 1) {
    btn = mxUtils.button(mxResources.get('editStyle'), mxUtils.bind(this, function (evt) {
      this.editorUi.actions.get('editStyle').funct();
    }));

    btn.setAttribute('title', mxResources.get('editStyle') + ' (' + this.editorUi.actions.get('editStyle').shortcut + ')');
    btn.style.width = '202px';
    btn.style.marginBottom = '2px';

    div.appendChild(btn);
  }

  if (ss.image) {
    var btn2 = mxUtils.button(mxResources.get('editImage'), mxUtils.bind(this, function (evt) {
      this.editorUi.actions.get('image').funct();
    }));

    btn2.setAttribute('title', mxResources.get('editImage'));
    btn2.style.marginBottom = '2px';

    if (btn == null) {
      btn2.style.width = '202px';
    } else {
      btn.style.width = '100px';
      btn2.style.width = '100px';
      btn2.style.marginLeft = '2px';
    }

    div.appendChild(btn2);
  }

  return div;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel.prototype.addFill = function (container) {
  var ui = this.editorUi;
  var graph = ui.editor.graph;
  var ss = this.format.getSelectionState();
  container.style.paddingTop = '6px';
  container.style.paddingBottom = '6px';

  // Adds gradient direction option
  var gradientSelect = document.createElement('select');
  gradientSelect.style.position = 'absolute';
  gradientSelect.style.marginTop = '-2px';
  gradientSelect.style.right = mxClient.IS_QUIRKS ? '52px' : '72px';
  gradientSelect.style.width = '70px';

  // Stops events from bubbling to color option event handler
  mxEvent.addListener(gradientSelect, 'click', function (evt) {
    mxEvent.consume(evt);
  });

  var gradientPanel = this.createCellColorOption(mxResources.get('gradient'), mxConstants.STYLE_GRADIENTCOLOR, '#ffffff', function (color) {
    if (color == null || color == mxConstants.NONE) {
      gradientSelect.style.display = 'none';
    } else {
      gradientSelect.style.display = '';
    }
  });

  var fillKey = ss.style.shape == 'image' ? mxConstants.STYLE_IMAGE_BACKGROUND : mxConstants.STYLE_FILLCOLOR;

  var fillPanel = this.createCellColorOption(mxResources.get('fill'), fillKey, '#ffffff');
  fillPanel.style.fontWeight = 'bold';

  var tmpColor = mxUtils.getValue(ss.style, fillKey, null);
  gradientPanel.style.display = tmpColor != null && tmpColor != mxConstants.NONE && ss.fill && ss.style.shape != 'image' ? '' : 'none';

  var directions = [mxConstants.DIRECTION_NORTH, mxConstants.DIRECTION_EAST, mxConstants.DIRECTION_SOUTH, mxConstants.DIRECTION_WEST];

  for (var i = 0; i < directions.length; i++) {
    var gradientOption = document.createElement('option');
    gradientOption.setAttribute('value', directions[i]);
    mxUtils.write(gradientOption, mxResources.get(directions[i]));
    gradientSelect.appendChild(gradientOption);
  }

  gradientPanel.appendChild(gradientSelect);

  var listener = mxUtils.bind(this, function () {
    ss = this.format.getSelectionState();
    var value = mxUtils.getValue(ss.style, mxConstants.STYLE_GRADIENT_DIRECTION, mxConstants.DIRECTION_SOUTH);

    // Handles empty string which is not allowed as a value
    if (value == '') {
      value = mxConstants.DIRECTION_SOUTH;
    }

    gradientSelect.value = value;
    container.style.display = ss.fill ? '' : 'none';

    var fillColor = mxUtils.getValue(ss.style, mxConstants.STYLE_FILLCOLOR, null);

    if (!ss.fill || ss.containsImage || fillColor == null || fillColor == mxConstants.NONE) {
      gradientPanel.style.display = 'none';
    } else {
      gradientPanel.style.display = '';
    }
  });

  graph.getModel().addListener(mxEvent.CHANGE, listener);
  this.listeners.push({
    destroy: function destroy() {
      graph.getModel().removeListener(listener);
    }
  });
  listener();

  mxEvent.addListener(gradientSelect, 'change', function (evt) {
    graph.setCellStyles(mxConstants.STYLE_GRADIENT_DIRECTION, gradientSelect.value, graph.getSelectionCells());
    mxEvent.consume(evt);
  });

  container.appendChild(fillPanel);
  container.appendChild(gradientPanel);

  if (ss.style.shape == 'swimlane') {
    container.appendChild(this.createCellColorOption(mxResources.get('laneColor'), 'swimlaneFillColor', '#ffffff'));
  }

  return container;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel.prototype.addStroke = function (container) {
  var ui = this.editorUi;
  var graph = ui.editor.graph;
  var ss = this.format.getSelectionState();

  container.style.paddingTop = '4px';
  container.style.paddingBottom = '4px';
  container.style.whiteSpace = 'normal';

  var colorPanel = document.createElement('div');
  colorPanel.style.fontWeight = 'bold';

  // Adds gradient direction option
  var styleSelect = document.createElement('select');
  styleSelect.style.position = 'absolute';
  styleSelect.style.marginTop = '-2px';
  styleSelect.style.right = '72px';
  styleSelect.style.width = '80px';

  var styles = ['sharp', 'rounded', 'curved'];

  for (var i = 0; i < styles.length; i++) {
    var styleOption = document.createElement('option');
    styleOption.setAttribute('value', styles[i]);
    mxUtils.write(styleOption, mxResources.get(styles[i]));
    styleSelect.appendChild(styleOption);
  }

  mxEvent.addListener(styleSelect, 'change', function (evt) {
    graph.getModel().beginUpdate();
    try {
      var keys = [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED];
      // Default for rounded is 1
      var values = ['0', null];

      if (styleSelect.value == 'rounded') {
        values = ['1', null];
      } else if (styleSelect.value == 'curved') {
        values = [null, '1'];
      }

      for (var i = 0; i < keys.length; i++) {
        graph.setCellStyles(keys[i], values[i], graph.getSelectionCells());
      }

      ui.fireEvent(new mxEventObject('styleChanged', 'keys', keys, 'values', values, 'cells', graph.getSelectionCells()));
    } finally {
      graph.getModel().endUpdate();
    }

    mxEvent.consume(evt);
  });

  // Stops events from bubbling to color option event handler
  mxEvent.addListener(styleSelect, 'click', function (evt) {
    mxEvent.consume(evt);
  });

  var strokeKey = ss.style.shape == 'image' ? mxConstants.STYLE_IMAGE_BORDER : mxConstants.STYLE_STROKECOLOR;

  var lineColor = this.createCellColorOption(mxResources.get('line'), strokeKey, '#000000');
  lineColor.appendChild(styleSelect);
  colorPanel.appendChild(lineColor);

  // Used if only edges selected
  var stylePanel = colorPanel.cloneNode(false);
  stylePanel.style.fontWeight = 'normal';
  stylePanel.style.whiteSpace = 'nowrap';
  stylePanel.style.position = 'relative';
  stylePanel.style.paddingLeft = '16px';
  stylePanel.style.marginBottom = '2px';
  stylePanel.style.marginTop = '2px';
  stylePanel.className = 'geToolbarContainer';

  var addItem = mxUtils.bind(this, function (menu, width, cssName, keys, values) {
    var item = this.editorUi.menus.styleChange(menu, '', keys, values, 'geIcon', null);

    var pat = document.createElement('div');
    pat.style.width = width + 'px';
    pat.style.height = '1px';
    pat.style.borderBottom = '1px ' + cssName + ' black';
    pat.style.paddingTop = '6px';

    item.firstChild.firstChild.style.padding = '0px 4px 0px 4px';
    item.firstChild.firstChild.style.width = width + 'px';
    item.firstChild.firstChild.appendChild(pat);

    return item;
  });

  var pattern = this.editorUi.toolbar.addMenuFunctionInContainer(stylePanel, 'geSprite-orthogonal', mxResources.get('pattern'), false, mxUtils.bind(this, function (menu) {
    addItem(menu, 75, 'solid', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], [null, null]).setAttribute('title', mxResources.get('solid'));
    addItem(menu, 75, 'dashed', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ['1', null]).setAttribute('title', mxResources.get('dashed'));
    addItem(menu, 75, 'dotted', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ['1', '1 1']).setAttribute('title', mxResources.get('dotted') + ' (1)');
    addItem(menu, 75, 'dotted', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ['1', '1 2']).setAttribute('title', mxResources.get('dotted') + ' (2)');
    addItem(menu, 75, 'dotted', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ['1', '1 4']).setAttribute('title', mxResources.get('dotted') + ' (3)');
  }));

  // Used for mixed selection (vertices and edges)
  var altStylePanel = stylePanel.cloneNode(false);

  var edgeShape = this.editorUi.toolbar.addMenuFunctionInContainer(altStylePanel, 'geSprite-connection', mxResources.get('connection'), false, mxUtils.bind(this, function (menu) {
    this.editorUi.menus.styleChange(menu, '', [mxConstants.STYLE_SHAPE, mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, 'width'], [null, null, null, null], 'geIcon geSprite geSprite-connection', null, true).setAttribute('title', mxResources.get('line'));
    this.editorUi.menus.styleChange(menu, '', [mxConstants.STYLE_SHAPE, mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, 'width'], ['link', null, null, null], 'geIcon geSprite geSprite-linkedge', null, true).setAttribute('title', mxResources.get('link'));
    this.editorUi.menus.styleChange(menu, '', [mxConstants.STYLE_SHAPE, mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, 'width'], ['flexArrow', null, null, null], 'geIcon geSprite geSprite-arrow', null, true).setAttribute('title', mxResources.get('arrow'));
    this.editorUi.menus.styleChange(menu, '', [mxConstants.STYLE_SHAPE, mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, 'width'], ['arrow', null, null, null], 'geIcon geSprite geSprite-simplearrow', null, true).setAttribute('title', mxResources.get('simpleArrow'));
  }));

  var altPattern = this.editorUi.toolbar.addMenuFunctionInContainer(altStylePanel, 'geSprite-orthogonal', mxResources.get('pattern'), false, mxUtils.bind(this, function (menu) {
    addItem(menu, 33, 'solid', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], [null, null]).setAttribute('title', mxResources.get('solid'));
    addItem(menu, 33, 'dashed', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ['1', null]).setAttribute('title', mxResources.get('dashed'));
    addItem(menu, 33, 'dotted', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ['1', '1 1']).setAttribute('title', mxResources.get('dotted') + ' (1)');
    addItem(menu, 33, 'dotted', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ['1', '1 2']).setAttribute('title', mxResources.get('dotted') + ' (2)');
    addItem(menu, 33, 'dotted', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ['1', '1 4']).setAttribute('title', mxResources.get('dotted') + ' (3)');
  }));

  var stylePanel2 = stylePanel.cloneNode(false);

  // Stroke width
  var input = document.createElement('input');
  input.style.textAlign = 'right';
  input.style.marginTop = '2px';
  input.style.width = '41px';
  input.setAttribute('title', mxResources.get('linewidth'));

  stylePanel.appendChild(input);

  var altInput = input.cloneNode(true);
  altStylePanel.appendChild(altInput);

  function update(evt) {
    // Maximum stroke width is 999
    var value = parseInt(input.value);
    value = Math.min(999, Math.max(1, isNaN(value) ? 1 : value));

    if (value != mxUtils.getValue(ss.style, mxConstants.STYLE_STROKEWIDTH, 1)) {
      graph.setCellStyles(mxConstants.STYLE_STROKEWIDTH, value, graph.getSelectionCells());
      ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_STROKEWIDTH], 'values', [value], 'cells', graph.getSelectionCells()));
    }

    input.value = value + ' pt';
    mxEvent.consume(evt);
  }

  function altUpdate(evt) {
    // Maximum stroke width is 999
    var value = parseInt(altInput.value);
    value = Math.min(999, Math.max(1, isNaN(value) ? 1 : value));

    if (value != mxUtils.getValue(ss.style, mxConstants.STYLE_STROKEWIDTH, 1)) {
      graph.setCellStyles(mxConstants.STYLE_STROKEWIDTH, value, graph.getSelectionCells());
      ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_STROKEWIDTH], 'values', [value], 'cells', graph.getSelectionCells()));
    }

    altInput.value = value + ' pt';
    mxEvent.consume(evt);
  }

  var stepper = this.createStepper(input, update, 1, 9);
  stepper.style.display = input.style.display;
  stepper.style.marginTop = '2px';
  stylePanel.appendChild(stepper);

  var altStepper = this.createStepper(altInput, altUpdate, 1, 9);
  altStepper.style.display = altInput.style.display;
  altStepper.style.marginTop = '2px';
  altStylePanel.appendChild(altStepper);

  if (!mxClient.IS_QUIRKS) {
    input.style.position = 'absolute';
    input.style.right = '32px';
    input.style.height = '15px';
    stepper.style.right = '20px';

    altInput.style.position = 'absolute';
    altInput.style.right = '32px';
    altInput.style.height = '15px';
    altStepper.style.right = '20px';
  } else {
    input.style.height = '17px';
    altInput.style.height = '17px';
  }

  mxEvent.addListener(input, 'blur', update);
  mxEvent.addListener(input, 'change', update);

  mxEvent.addListener(altInput, 'blur', altUpdate);
  mxEvent.addListener(altInput, 'change', altUpdate);

  if (mxClient.IS_QUIRKS) {
    mxUtils.br(stylePanel2);
    mxUtils.br(stylePanel2);
  }

  var edgeStyle = this.editorUi.toolbar.addMenuFunctionInContainer(stylePanel2, 'geSprite-orthogonal', mxResources.get('waypoints'), false, mxUtils.bind(this, function (menu) {
    if (ss.style.shape != 'arrow') {
      this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], [null, null, null], 'geIcon geSprite geSprite-straight', null, true).setAttribute('title', mxResources.get('straight'));
      this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ['orthogonalEdgeStyle', null, null], 'geIcon geSprite geSprite-orthogonal', null, true).setAttribute('title', mxResources.get('orthogonal'));
      this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ['elbowEdgeStyle', null, null, null], 'geIcon geSprite geSprite-horizontalelbow', null, true).setAttribute('title', mxResources.get('simple'));
      this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ['elbowEdgeStyle', 'vertical', null, null], 'geIcon geSprite geSprite-verticalelbow', null, true).setAttribute('title', mxResources.get('simple'));
      this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ['isometricEdgeStyle', null, null, null], 'geIcon geSprite geSprite-horizontalisometric', null, true).setAttribute('title', mxResources.get('isometric'));
      this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ['isometricEdgeStyle', 'vertical', null, null], 'geIcon geSprite geSprite-verticalisometric', null, true).setAttribute('title', mxResources.get('isometric'));

      if (ss.style.shape == 'connector') {
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ['orthogonalEdgeStyle', '1', null], 'geIcon geSprite geSprite-curved', null, true).setAttribute('title', mxResources.get('curved'));
      }

      this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ['entityRelationEdgeStyle', null, null], 'geIcon geSprite geSprite-entity', null, true).setAttribute('title', mxResources.get('entityRelation'));
    }
  }));

  var lineStart = this.editorUi.toolbar.addMenuFunctionInContainer(stylePanel2, 'geSprite-startclassic', mxResources.get('linestart'), false, mxUtils.bind(this, function (menu) {
    if (ss.style.shape == 'connector' || ss.style.shape == 'flexArrow') {
      this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.NONE, 0], 'geIcon geSprite geSprite-noarrow', null, false).setAttribute('title', mxResources.get('none'));

      if (ss.style.shape == 'connector') {
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_CLASSIC, 1], 'geIcon geSprite geSprite-startclassic', null, false).setAttribute('title', mxResources.get('classic'));
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_CLASSIC_THIN, 1], 'geIcon geSprite geSprite-startclassicthin', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_OPEN, 0], 'geIcon geSprite geSprite-startopen', null, false).setAttribute('title', mxResources.get('openArrow'));
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_OPEN_THIN, 0], 'geIcon geSprite geSprite-startopenthin', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['openAsync', 0], 'geIcon geSprite geSprite-startopenasync', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_BLOCK, 1], 'geIcon geSprite geSprite-startblock', null, false).setAttribute('title', mxResources.get('block'));
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_BLOCK_THIN, 1], 'geIcon geSprite geSprite-startblockthin', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['async', 1], 'geIcon geSprite geSprite-startasync', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_OVAL, 1], 'geIcon geSprite geSprite-startoval', null, false).setAttribute('title', mxResources.get('oval'));
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_DIAMOND, 1], 'geIcon geSprite geSprite-startdiamond', null, false).setAttribute('title', mxResources.get('diamond'));
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_DIAMOND_THIN, 1], 'geIcon geSprite geSprite-startthindiamond', null, false).setAttribute('title', mxResources.get('diamondThin'));
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_CLASSIC, 0], 'geIcon geSprite geSprite-startclassictrans', null, false).setAttribute('title', mxResources.get('classic'));
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_CLASSIC_THIN, 0], 'geIcon geSprite geSprite-startclassicthintrans', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_BLOCK, 0], 'geIcon geSprite geSprite-startblocktrans', null, false).setAttribute('title', mxResources.get('block'));
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_BLOCK_THIN, 0], 'geIcon geSprite geSprite-startblockthintrans', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['async', 0], 'geIcon geSprite geSprite-startasynctrans', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_OVAL, 0], 'geIcon geSprite geSprite-startovaltrans', null, false).setAttribute('title', mxResources.get('oval'));
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_DIAMOND, 0], 'geIcon geSprite geSprite-startdiamondtrans', null, false).setAttribute('title', mxResources.get('diamond'));
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_DIAMOND_THIN, 0], 'geIcon geSprite geSprite-startthindiamondtrans', null, false).setAttribute('title', mxResources.get('diamondThin'));

        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['dash', 0], 'geIcon geSprite geSprite-startdash', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['cross', 0], 'geIcon geSprite geSprite-startcross', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['circlePlus', 0], 'geIcon geSprite geSprite-startcircleplus', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['circle', 1], 'geIcon geSprite geSprite-startcircle', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['ERone', 0], 'geIcon geSprite geSprite-starterone', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['ERmandOne', 0], 'geIcon geSprite geSprite-starteronetoone', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['ERmany', 0], 'geIcon geSprite geSprite-startermany', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['ERoneToMany', 0], 'geIcon geSprite geSprite-starteronetomany', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['ERzeroToOne', 1], 'geIcon geSprite geSprite-starteroneopt', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['ERzeroToMany', 1], 'geIcon geSprite geSprite-startermanyopt', null, false);
      } else {
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW], [mxConstants.ARROW_BLOCK], 'geIcon geSprite geSprite-startblocktrans', null, false).setAttribute('title', mxResources.get('block'));
      }
    }
  }));

  var lineEnd = this.editorUi.toolbar.addMenuFunctionInContainer(stylePanel2, 'geSprite-endclassic', mxResources.get('lineend'), false, mxUtils.bind(this, function (menu) {
    if (ss.style.shape == 'connector' || ss.style.shape == 'flexArrow') {
      this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.NONE, 0], 'geIcon geSprite geSprite-noarrow', null, false).setAttribute('title', mxResources.get('none'));

      if (ss.style.shape == 'connector') {
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_CLASSIC, 1], 'geIcon geSprite geSprite-endclassic', null, false).setAttribute('title', mxResources.get('classic'));
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_CLASSIC_THIN, 1], 'geIcon geSprite geSprite-endclassicthin', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_OPEN, 0], 'geIcon geSprite geSprite-endopen', null, false).setAttribute('title', mxResources.get('openArrow'));
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_OPEN_THIN, 0], 'geIcon geSprite geSprite-endopenthin', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['openAsync', 0], 'geIcon geSprite geSprite-endopenasync', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_BLOCK, 1], 'geIcon geSprite geSprite-endblock', null, false).setAttribute('title', mxResources.get('block'));
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_BLOCK_THIN, 1], 'geIcon geSprite geSprite-endblockthin', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['async', 1], 'geIcon geSprite geSprite-endasync', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_OVAL, 1], 'geIcon geSprite geSprite-endoval', null, false).setAttribute('title', mxResources.get('oval'));
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_DIAMOND, 1], 'geIcon geSprite geSprite-enddiamond', null, false).setAttribute('title', mxResources.get('diamond'));
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_DIAMOND_THIN, 1], 'geIcon geSprite geSprite-endthindiamond', null, false).setAttribute('title', mxResources.get('diamondThin'));
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_CLASSIC, 0], 'geIcon geSprite geSprite-endclassictrans', null, false).setAttribute('title', mxResources.get('classic'));
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_CLASSIC_THIN, 0], 'geIcon geSprite geSprite-endclassicthintrans', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_BLOCK, 0], 'geIcon geSprite geSprite-endblocktrans', null, false).setAttribute('title', mxResources.get('block'));
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_BLOCK_THIN, 0], 'geIcon geSprite geSprite-endblockthintrans', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['async', 0], 'geIcon geSprite geSprite-endasynctrans', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_OVAL, 0], 'geIcon geSprite geSprite-endovaltrans', null, false).setAttribute('title', mxResources.get('oval'));
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_DIAMOND, 0], 'geIcon geSprite geSprite-enddiamondtrans', null, false).setAttribute('title', mxResources.get('diamond'));
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_DIAMOND_THIN, 0], 'geIcon geSprite geSprite-endthindiamondtrans', null, false).setAttribute('title', mxResources.get('diamondThin'));

        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['dash', 0], 'geIcon geSprite geSprite-enddash', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['cross', 0], 'geIcon geSprite geSprite-endcross', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['circlePlus', 0], 'geIcon geSprite geSprite-endcircleplus', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['circle', 1], 'geIcon geSprite geSprite-endcircle', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['ERone', 0], 'geIcon geSprite geSprite-enderone', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['ERmandOne', 0], 'geIcon geSprite geSprite-enderonetoone', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['ERmany', 0], 'geIcon geSprite geSprite-endermany', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['ERoneToMany', 0], 'geIcon geSprite geSprite-enderonetomany', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['ERzeroToOne', 1], 'geIcon geSprite geSprite-enderoneopt', null, false);
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['ERzeroToMany', 1], 'geIcon geSprite geSprite-endermanyopt', null, false);
      } else {
        this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW], [mxConstants.ARROW_BLOCK], 'geIcon geSprite geSprite-endblocktrans', null, false).setAttribute('title', mxResources.get('block'));
      }
    }
  }));

  this.addArrow(edgeShape, 8);
  this.addArrow(edgeStyle);
  this.addArrow(lineStart);
  this.addArrow(lineEnd);

  var symbol = this.addArrow(pattern, 9);
  symbol.className = 'geIcon';
  symbol.style.width = '84px';

  var altSymbol = this.addArrow(altPattern, 9);
  altSymbol.className = 'geIcon';
  altSymbol.style.width = '22px';

  var solid = document.createElement('div');
  solid.style.width = '85px';
  solid.style.height = '1px';
  solid.style.borderBottom = '1px solid black';
  solid.style.marginBottom = '9px';
  symbol.appendChild(solid);

  var altSolid = document.createElement('div');
  altSolid.style.width = '23px';
  altSolid.style.height = '1px';
  altSolid.style.borderBottom = '1px solid black';
  altSolid.style.marginBottom = '9px';
  altSymbol.appendChild(altSolid);

  pattern.style.height = '15px';
  altPattern.style.height = '15px';
  edgeShape.style.height = '15px';
  edgeStyle.style.height = '17px';
  lineStart.style.marginLeft = '3px';
  lineStart.style.height = '17px';
  lineEnd.style.marginLeft = '3px';
  lineEnd.style.height = '17px';

  container.appendChild(colorPanel);
  container.appendChild(altStylePanel);
  container.appendChild(stylePanel);

  var arrowPanel = stylePanel.cloneNode(false);
  arrowPanel.style.paddingBottom = '6px';
  arrowPanel.style.paddingTop = '4px';
  arrowPanel.style.fontWeight = 'normal';

  var span = document.createElement('div');
  span.style.position = 'absolute';
  span.style.marginLeft = '3px';
  span.style.marginBottom = '12px';
  span.style.marginTop = '2px';
  span.style.fontWeight = 'normal';
  span.style.width = '76px';

  mxUtils.write(span, mxResources.get('lineend'));
  arrowPanel.appendChild(span);

  var endSpacingUpdate, endSizeUpdate;
  var endSpacing = this.addUnitInput(arrowPanel, 'pt', 74, 33, function () {
    endSpacingUpdate.apply(this, arguments);
  });
  var endSize = this.addUnitInput(arrowPanel, 'pt', 20, 33, function () {
    endSizeUpdate.apply(this, arguments);
  });

  mxUtils.br(arrowPanel);

  var spacer = document.createElement('div');
  spacer.style.height = '8px';
  arrowPanel.appendChild(spacer);

  span = span.cloneNode(false);
  mxUtils.write(span, mxResources.get('linestart'));
  arrowPanel.appendChild(span);

  var startSpacingUpdate, startSizeUpdate;
  var startSpacing = this.addUnitInput(arrowPanel, 'pt', 74, 33, function () {
    startSpacingUpdate.apply(this, arguments);
  });
  var startSize = this.addUnitInput(arrowPanel, 'pt', 20, 33, function () {
    startSizeUpdate.apply(this, arguments);
  });

  mxUtils.br(arrowPanel);
  this.addLabel(arrowPanel, mxResources.get('spacing'), 74, 50);
  this.addLabel(arrowPanel, mxResources.get('size'), 20, 50);
  mxUtils.br(arrowPanel);

  var perimeterPanel = colorPanel.cloneNode(false);
  perimeterPanel.style.fontWeight = 'normal';
  perimeterPanel.style.position = 'relative';
  perimeterPanel.style.paddingLeft = '16px';
  perimeterPanel.style.marginBottom = '2px';
  perimeterPanel.style.marginTop = '6px';
  perimeterPanel.style.borderWidth = '0px';
  perimeterPanel.style.paddingBottom = '18px';

  var span = document.createElement('div');
  span.style.position = 'absolute';
  span.style.marginLeft = '3px';
  span.style.marginBottom = '12px';
  span.style.marginTop = '1px';
  span.style.fontWeight = 'normal';
  span.style.width = '120px';
  mxUtils.write(span, mxResources.get('perimeter'));
  perimeterPanel.appendChild(span);

  var perimeterUpdate;
  var perimeterSpacing = this.addUnitInput(perimeterPanel, 'pt', 20, 41, function () {
    perimeterUpdate.apply(this, arguments);
  });

  if (ss.edges.length == graph.getSelectionCount()) {
    container.appendChild(stylePanel2);

    if (mxClient.IS_QUIRKS) {
      mxUtils.br(container);
      mxUtils.br(container);
    }

    container.appendChild(arrowPanel);
  } else if (ss.vertices.length == graph.getSelectionCount()) {
    if (mxClient.IS_QUIRKS) {
      mxUtils.br(container);
    }

    container.appendChild(perimeterPanel);
  }

  var listener = mxUtils.bind(this, function (sender, evt, force) {
    ss = this.format.getSelectionState();
    var color = mxUtils.getValue(ss.style, strokeKey, null);

    if (force || document.activeElement != input) {
      var tmp = parseInt(mxUtils.getValue(ss.style, mxConstants.STYLE_STROKEWIDTH, 1));
      input.value = isNaN(tmp) ? '' : tmp + ' pt';
    }

    if (force || document.activeElement != altInput) {
      var tmp = parseInt(mxUtils.getValue(ss.style, mxConstants.STYLE_STROKEWIDTH, 1));
      altInput.value = isNaN(tmp) ? '' : tmp + ' pt';
    }

    styleSelect.style.visibility = ss.style.shape == 'connector' ? '' : 'hidden';

    if (mxUtils.getValue(ss.style, mxConstants.STYLE_CURVED, null) == '1') {
      styleSelect.value = 'curved';
    } else if (mxUtils.getValue(ss.style, mxConstants.STYLE_ROUNDED, null) == '1') {
      styleSelect.value = 'rounded';
    }

    if (mxUtils.getValue(ss.style, mxConstants.STYLE_DASHED, null) == '1') {
      if (mxUtils.getValue(ss.style, mxConstants.STYLE_DASH_PATTERN, null) == null) {
        solid.style.borderBottom = '1px dashed black';
      } else {
        solid.style.borderBottom = '1px dotted black';
      }
    } else {
      solid.style.borderBottom = '1px solid black';
    }

    altSolid.style.borderBottom = solid.style.borderBottom;

    // Updates toolbar icon for edge style
    var edgeStyleDiv = edgeStyle.getElementsByTagName('div')[0];
    var es = mxUtils.getValue(ss.style, mxConstants.STYLE_EDGE, null);

    if (mxUtils.getValue(ss.style, mxConstants.STYLE_NOEDGESTYLE, null) == '1') {
      es = null;
    }

    if (es == 'orthogonalEdgeStyle' && mxUtils.getValue(ss.style, mxConstants.STYLE_CURVED, null) == '1') {
      edgeStyleDiv.className = 'geSprite geSprite-curved';
    } else if (es == 'straight' || es == 'none' || es == null) {
      edgeStyleDiv.className = 'geSprite geSprite-straight';
    } else if (es == 'entityRelationEdgeStyle') {
      edgeStyleDiv.className = 'geSprite geSprite-entity';
    } else if (es == 'elbowEdgeStyle') {
      edgeStyleDiv.className = 'geSprite ' + (mxUtils.getValue(ss.style, mxConstants.STYLE_ELBOW, null) == 'vertical' ? 'geSprite-verticalelbow' : 'geSprite-horizontalelbow');
    } else if (es == 'isometricEdgeStyle') {
      edgeStyleDiv.className = 'geSprite ' + (mxUtils.getValue(ss.style, mxConstants.STYLE_ELBOW, null) == 'vertical' ? 'geSprite-verticalisometric' : 'geSprite-horizontalisometric');
    } else {
      edgeStyleDiv.className = 'geSprite geSprite-orthogonal';
    }

    // Updates icon for edge shape
    var edgeShapeDiv = edgeShape.getElementsByTagName('div')[0];

    if (ss.style.shape == 'link') {
      edgeShapeDiv.className = 'geSprite geSprite-linkedge';
    } else if (ss.style.shape == 'flexArrow') {
      edgeShapeDiv.className = 'geSprite geSprite-arrow';
    } else if (ss.style.shape == 'arrow') {
      edgeShapeDiv.className = 'geSprite geSprite-simplearrow';
    } else {
      edgeShapeDiv.className = 'geSprite geSprite-connection';
    }

    if (ss.edges.length == graph.getSelectionCount()) {
      altStylePanel.style.display = '';
      stylePanel.style.display = 'none';
    } else {
      altStylePanel.style.display = 'none';
      stylePanel.style.display = '';
    }

    function updateArrow(marker, fill, elt, prefix) {
      var markerDiv = elt.getElementsByTagName('div')[0];

      markerDiv.className = ui.getCssClassForMarker(prefix, ss.style.shape, marker, fill);

      return markerDiv;
    }

    var sourceDiv = updateArrow(mxUtils.getValue(ss.style, mxConstants.STYLE_STARTARROW, null), mxUtils.getValue(ss.style, 'startFill', '1'), lineStart, 'start');
    var targetDiv = updateArrow(mxUtils.getValue(ss.style, mxConstants.STYLE_ENDARROW, null), mxUtils.getValue(ss.style, 'endFill', '1'), lineEnd, 'end');

    // Special cases for markers
    if (ss.style.shape == 'arrow') {
      sourceDiv.className = 'geSprite geSprite-noarrow';
      targetDiv.className = 'geSprite geSprite-endblocktrans';
    } else if (ss.style.shape == 'link') {
      sourceDiv.className = 'geSprite geSprite-noarrow';
      targetDiv.className = 'geSprite geSprite-noarrow';
    }

    mxUtils.setOpacity(edgeStyle, ss.style.shape == 'arrow' ? 30 : 100);

    if (ss.style.shape != 'connector' && ss.style.shape != 'flexArrow') {
      mxUtils.setOpacity(lineStart, 30);
      mxUtils.setOpacity(lineEnd, 30);
    } else {
      mxUtils.setOpacity(lineStart, 100);
      mxUtils.setOpacity(lineEnd, 100);
    }

    if (force || document.activeElement != startSize) {
      var tmp = parseInt(mxUtils.getValue(ss.style, mxConstants.STYLE_STARTSIZE, mxConstants.DEFAULT_MARKERSIZE));
      startSize.value = isNaN(tmp) ? '' : tmp + ' pt';
    }

    if (force || document.activeElement != startSpacing) {
      var tmp = parseInt(mxUtils.getValue(ss.style, mxConstants.STYLE_SOURCE_PERIMETER_SPACING, 0));
      startSpacing.value = isNaN(tmp) ? '' : tmp + ' pt';
    }

    if (force || document.activeElement != endSize) {
      var tmp = parseInt(mxUtils.getValue(ss.style, mxConstants.STYLE_ENDSIZE, mxConstants.DEFAULT_MARKERSIZE));
      endSize.value = isNaN(tmp) ? '' : tmp + ' pt';
    }

    if (force || document.activeElement != startSpacing) {
      var tmp = parseInt(mxUtils.getValue(ss.style, mxConstants.STYLE_TARGET_PERIMETER_SPACING, 0));
      endSpacing.value = isNaN(tmp) ? '' : tmp + ' pt';
    }

    if (force || document.activeElement != perimeterSpacing) {
      var tmp = parseInt(mxUtils.getValue(ss.style, mxConstants.STYLE_PERIMETER_SPACING, 0));
      perimeterSpacing.value = isNaN(tmp) ? '' : tmp + ' pt';
    }
  });

  startSizeUpdate = this.installInputHandler(startSize, mxConstants.STYLE_STARTSIZE, mxConstants.DEFAULT_MARKERSIZE, 0, 999, ' pt');
  startSpacingUpdate = this.installInputHandler(startSpacing, mxConstants.STYLE_SOURCE_PERIMETER_SPACING, 0, -999, 999, ' pt');
  endSizeUpdate = this.installInputHandler(endSize, mxConstants.STYLE_ENDSIZE, mxConstants.DEFAULT_MARKERSIZE, 0, 999, ' pt');
  endSpacingUpdate = this.installInputHandler(endSpacing, mxConstants.STYLE_TARGET_PERIMETER_SPACING, 0, -999, 999, ' pt');
  perimeterUpdate = this.installInputHandler(perimeterSpacing, mxConstants.STYLE_PERIMETER_SPACING, 0, 0, 999, ' pt');

  this.addKeyHandler(input, listener);
  this.addKeyHandler(startSize, listener);
  this.addKeyHandler(startSpacing, listener);
  this.addKeyHandler(endSize, listener);
  this.addKeyHandler(endSpacing, listener);
  this.addKeyHandler(perimeterSpacing, listener);

  graph.getModel().addListener(mxEvent.CHANGE, listener);
  this.listeners.push({
    destroy: function destroy() {
      graph.getModel().removeListener(listener);
    }
  });
  listener();

  return container;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel.prototype.addEffects = function (div) {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;
  var ss = this.format.getSelectionState();

  div.style.paddingTop = '0px';
  div.style.paddingBottom = '2px';

  var table = document.createElement('table');

  if (mxClient.IS_QUIRKS) {
    table.style.fontSize = '1em';
  }

  table.style.width = '100%';
  table.style.fontWeight = 'bold';
  table.style.paddingRight = '20px';
  var tbody = document.createElement('tbody');
  var row = document.createElement('tr');
  row.style.padding = '0px';
  var left = document.createElement('td');
  left.style.padding = '0px';
  left.style.width = '50%';
  left.setAttribute('valign', 'top');

  var right = left.cloneNode(true);
  right.style.paddingLeft = '8px';
  row.appendChild(left);
  row.appendChild(right);
  tbody.appendChild(row);
  table.appendChild(tbody);
  div.appendChild(table);

  var current = left;
  var count = 0;

  var addOption = mxUtils.bind(this, function (label, key, defaultValue) {
    var opt = this.createCellOption(label, key, defaultValue);
    opt.style.width = '100%';
    current.appendChild(opt);
    current = current == left ? right : left;
    count++;
  });

  var listener = mxUtils.bind(this, function (sender, evt, force) {
    ss = this.format.getSelectionState();

    left.innerHTML = '';
    right.innerHTML = '';
    current = left;

    if (ss.rounded) {
      addOption(mxResources.get('rounded'), mxConstants.STYLE_ROUNDED, 0);
    }

    if (ss.style.shape == 'swimlane') {
      addOption(mxResources.get('divider'), 'swimlaneLine', 1);
    }

    if (!ss.containsImage) {
      addOption(mxResources.get('shadow'), mxConstants.STYLE_SHADOW, 0);
    }

    if (ss.glass) {
      addOption(mxResources.get('glass'), mxConstants.STYLE_GLASS, 0);
    }

    if (ss.comic) {
      addOption(mxResources.get('comic'), 'comic', 0);
    }

    if (count == 0) {
      div.style.display = 'none';
    }
  });

  graph.getModel().addListener(mxEvent.CHANGE, listener);
  this.listeners.push({
    destroy: function destroy() {
      graph.getModel().removeListener(listener);
    }
  });
  listener();

  return div;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel.prototype.addStyleOps = function (div) {
  div.style.paddingTop = '10px';
  div.style.paddingBottom = '10px';

  var btn = mxUtils.button(mxResources.get('setAsDefaultStyle'), mxUtils.bind(this, function (evt) {
    this.editorUi.actions.get('setAsDefaultStyle').funct();
  }));

  btn.setAttribute('title', mxResources.get('setAsDefaultStyle') + ' (' + this.editorUi.actions.get('setAsDefaultStyle').shortcut + ')');
  btn.style.width = '202px';
  div.appendChild(btn);

  return div;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
var DiagramFormatPanel = function DiagramFormatPanel(format, editorUi, container) {
  BaseFormatPanel.call(this, format, editorUi, container);
  this.init();
};

mxUtils.extend(DiagramFormatPanel, BaseFormatPanel);

/**
 * Specifies if the background image option should be shown. Default is true.
 */
DiagramFormatPanel.prototype.showBackgroundImageOption = true;

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramFormatPanel.prototype.init = function () {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;

  this.container.appendChild(this.addView(this.createPanel()));

  if (graph.isEnabled()) {
    this.container.appendChild(this.addOptions(this.createPanel()));
    this.container.appendChild(this.addPaperSize(this.createPanel()));
    this.container.appendChild(this.addStyleOps(this.createPanel()));
  }
};

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramFormatPanel.prototype.addView = function (div) {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;

  div.appendChild(this.createTitle(mxResources.get('view')));

  // Grid
  this.addGridOption(div);

  if (graph.isEnabled()) {
    // Guides
    div.appendChild(this.createOption(mxResources.get('guides'), function () {
      return graph.graphHandler.guidesEnabled;
    }, function (checked) {
      ui.actions.get('guides').funct();
    }, {
      install: function install(apply) {
        this.listener = function () {
          apply(graph.graphHandler.guidesEnabled);
        };

        ui.addListener('guidesEnabledChanged', this.listener);
      },
      destroy: function destroy() {
        ui.removeListener(this.listener);
      }
    }));

    // Page View
    div.appendChild(this.createOption(mxResources.get('pageView'), function () {
      return graph.pageVisible;
    }, function (checked) {
      ui.actions.get('pageView').funct();
    }, {
      install: function install(apply) {
        this.listener = function () {
          apply(graph.pageVisible);
        };

        ui.addListener('pageViewChanged', this.listener);
      },
      destroy: function destroy() {
        ui.removeListener(this.listener);
      }
    }));

    // Background
    var bg = this.createColorOption(mxResources.get('background'), function () {
      return graph.background;
    }, function (color) {
      ui.setBackgroundColor(color);
    }, '#ffffff', {
      install: function install(apply) {
        this.listener = function () {
          apply(graph.background);
        };

        ui.addListener('backgroundColorChanged', this.listener);
      },
      destroy: function destroy() {
        ui.removeListener(this.listener);
      }
    });

    if (this.showBackgroundImageOption) {
      var btn = mxUtils.button(mxResources.get('image'), function (evt) {
        ui.showBackgroundImageDialog();
        mxEvent.consume(evt);
      });

      btn.style.position = 'absolute';
      btn.className = 'geColorBtn';
      btn.style.marginTop = '-4px';
      btn.style.paddingBottom = document.documentMode == 11 || mxClient.IS_MT ? '0px' : '2px';
      btn.style.height = '22px';
      btn.style.right = mxClient.IS_QUIRKS ? '52px' : '72px';
      btn.style.width = '56px';

      bg.appendChild(btn);
    }

    div.appendChild(bg);
  }

  return div;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramFormatPanel.prototype.addOptions = function (div) {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;

  div.appendChild(this.createTitle(mxResources.get('options')));

  if (graph.isEnabled()) {
    // Connection arrows
    div.appendChild(this.createOption(mxResources.get('connectionArrows'), function () {
      return graph.connectionArrowsEnabled;
    }, function (checked) {
      ui.actions.get('connectionArrows').funct();
    }, {
      install: function install(apply) {
        this.listener = function () {
          apply(graph.connectionArrowsEnabled);
        };

        ui.addListener('connectionArrowsChanged', this.listener);
      },
      destroy: function destroy() {
        ui.removeListener(this.listener);
      }
    }));

    // Connection points
    div.appendChild(this.createOption(mxResources.get('connectionPoints'), function () {
      return graph.connectionHandler.isEnabled();
    }, function (checked) {
      ui.actions.get('connectionPoints').funct();
    }, {
      install: function install(apply) {
        this.listener = function () {
          apply(graph.connectionHandler.isEnabled());
        };

        ui.addListener('connectionPointsChanged', this.listener);
      },
      destroy: function destroy() {
        ui.removeListener(this.listener);
      }
    }));
  }

  return div;
};

/**
 *
 */
DiagramFormatPanel.prototype.addGridOption = function (container) {
  var ui = this.editorUi;
  var graph = ui.editor.graph;

  var input = document.createElement('input');
  input.style.position = 'absolute';
  input.style.textAlign = 'right';
  input.style.width = '38px';
  input.value = graph.getGridSize() + ' pt';

  var stepper = this.createStepper(input, update);
  input.style.display = graph.isGridEnabled() ? '' : 'none';
  stepper.style.display = input.style.display;

  mxEvent.addListener(input, 'keydown', function (e) {
    if (e.keyCode == 13) {
      graph.container.focus();
      mxEvent.consume(e);
    } else if (e.keyCode == 27) {
      input.value = graph.getGridSize();
      graph.container.focus();
      mxEvent.consume(e);
    }
  });

  function update(evt) {
    var value = parseInt(input.value);
    value = Math.max(1, isNaN(value) ? 10 : value);

    if (value != graph.getGridSize()) {
      graph.setGridSize(value);
    }

    input.value = value + ' pt';
    mxEvent.consume(evt);
  }

  mxEvent.addListener(input, 'blur', update);
  mxEvent.addListener(input, 'change', update);

  if (mxClient.IS_SVG) {
    input.style.marginTop = '-2px';
    input.style.right = '84px';
    stepper.style.marginTop = '-16px';
    stepper.style.right = '72px';

    var panel = this.createColorOption(mxResources.get('grid'), function () {
      var color = graph.view.gridColor;

      return graph.isGridEnabled() ? color : null;
    }, function (color) {
      if (color == mxConstants.NONE) {
        graph.setGridEnabled(false);
        ui.fireEvent(new mxEventObject('gridEnabledChanged'));
      } else {
        graph.setGridEnabled(true);
        ui.setGridColor(color);
      }

      input.style.display = graph.isGridEnabled() ? '' : 'none';
      stepper.style.display = input.style.display;
    }, '#e0e0e0', {
      install: function install(apply) {
        this.listener = function () {
          apply(graph.isGridEnabled() ? graph.view.gridColor : null);
        };

        ui.addListener('gridColorChanged', this.listener);
        ui.addListener('gridEnabledChanged', this.listener);
      },
      destroy: function destroy() {
        ui.removeListener(this.listener);
      }
    });

    panel.appendChild(input);
    panel.appendChild(stepper);
    container.appendChild(panel);
  } else {
    input.style.marginTop = '2px';
    input.style.right = '32px';
    stepper.style.marginTop = '2px';
    stepper.style.right = '20px';

    container.appendChild(input);
    container.appendChild(stepper);

    container.appendChild(this.createOption(mxResources.get('grid'), function () {
      return graph.isGridEnabled();
    }, function (checked) {
      graph.setGridEnabled(checked);

      if (graph.isGridEnabled()) {
        graph.view.gridColor = '#e0e0e0';
      }

      ui.fireEvent(new mxEventObject('gridEnabledChanged'));
    }, {
      install: function install(apply) {
        this.listener = function () {
          input.style.display = graph.isGridEnabled() ? '' : 'none';
          stepper.style.display = input.style.display;

          apply(graph.isGridEnabled());
        };

        ui.addListener('gridEnabledChanged', this.listener);
      },
      destroy: function destroy() {
        ui.removeListener(this.listener);
      }
    }));
  }
};

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramFormatPanel.prototype.addDocumentProperties = function (div) {
  // Hook for subclassers
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;

  div.appendChild(this.createTitle(mxResources.get('options')));

  return div;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramFormatPanel.prototype.addPaperSize = function (div) {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;

  div.appendChild(this.createTitle(mxResources.get('paperSize')));

  var accessor = PageSetupDialog.addPageFormatPanel(div, 'formatpanel', graph.pageFormat, function (pageFormat) {
    if (graph.pageFormat == null || graph.pageFormat.width != pageFormat.width || graph.pageFormat.height != pageFormat.height) {
      ui.setPageFormat(pageFormat);
    }
  });

  this.addKeyHandler(accessor.widthInput, function () {
    console.log('here', graph.pageFormat);
    accessor.set(graph.pageFormat);
  });
  -this.addKeyHandler(accessor.heightInput, function () {
    accessor.set(graph.pageFormat);
  });

  var listener = function listener() {
    accessor.set(graph.pageFormat);
  };

  ui.addListener('pageFormatChanged', listener);
  this.listeners.push({
    destroy: function destroy() {
      ui.removeListener(listener);
    }
  });

  graph.getModel().addListener(mxEvent.CHANGE, listener);
  this.listeners.push({
    destroy: function destroy() {
      graph.getModel().removeListener(listener);
    }
  });

  return div;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramFormatPanel.prototype.addStyleOps = function (div) {
  var btn = mxUtils.button(mxResources.get('editData'), mxUtils.bind(this, function (evt) {
    this.editorUi.actions.get('editData').funct();
  }));

  btn.setAttribute('title', mxResources.get('editData') + ' (' + this.editorUi.actions.get('editData').shortcut + ')');
  btn.style.width = '202px';
  btn.style.marginBottom = '2px';
  div.appendChild(btn);

  mxUtils.br(div);

  btn = mxUtils.button(mxResources.get('clearDefaultStyle'), mxUtils.bind(this, function (evt) {
    this.editorUi.actions.get('clearDefaultStyle').funct();
  }));

  btn.setAttribute('title', mxResources.get('clearDefaultStyle') + ' (' + this.editorUi.actions.get('clearDefaultStyle').shortcut + ')');
  btn.style.width = '202px';
  div.appendChild(btn);

  return div;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramFormatPanel.prototype.destroy = function () {
  BaseFormatPanel.prototype.destroy.apply(this, arguments);

  if (this.gridEnabledListener) {
    this.editorUi.removeListener(this.gridEnabledListener);
    this.gridEnabledListener = null;
  }
};

module.exports = Format;

/***/ })
/******/ ]);