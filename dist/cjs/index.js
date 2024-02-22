"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ReaddirpStream: function() {
        return _readdirpcjs.ReaddirpStream;
    },
    default: function() {
        return _default;
    },
    promise: function() {
        return _readdirpcjs.promise;
    }
});
var _readdirpcjs = require("./readdirp.js");
var _default = _readdirpcjs.readdirp;
/* CJS INTEROP */ if (exports.__esModule && exports.default) { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) exports.default[key] = exports[key]; module.exports = exports.default; }