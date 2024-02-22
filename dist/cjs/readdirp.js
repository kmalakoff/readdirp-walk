"use strict";
function _assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
    } else {
        _get = function get(target, property, receiver) {
            var base = _super_prop_base(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver || target);
            }
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
}
function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _set_prototype_of(subClass, superClass);
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized(self);
}
function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of(o, p);
}
function _super_prop_base(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = _get_prototype_of(object);
        if (object === null) break;
    }
    return object;
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _is_native_reflect_construct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _create_super(Derived) {
    var hasNativeReflectConstruct = _is_native_reflect_construct();
    return function _createSuperInternal() {
        var Super = _get_prototype_of(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _get_prototype_of(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possible_constructor_return(this, result);
    };
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var fs = require("fs");
var Readable = require("stream").Readable;
var path = require("path");
var promisify = require("util").promisify;
var picomatch = require("picomatch");
var Iterator = require("fs-iterator");
var lstat = promisify(fs.lstat);
var realpath = promisify(fs.realpath);
/**
 * @typedef {Object} EntryInfo
 * @property {String} path
 * @property {String} fullPath
 * @property {fs.Stats=} stats
 * @property {fs.Dirent=} dirent
 * @property {String} basename
 */ var BANG = "!";
var FILE_TYPE = "files";
var TEST_DIR_TYPE = "directories";
var FILE_TEST_DIR_TYPE = "files_directories";
var EVERYTHING_TYPE = "all";
var ALL_TYPES = [
    FILE_TYPE,
    TEST_DIR_TYPE,
    FILE_TEST_DIR_TYPE,
    EVERYTHING_TYPE
];
var normalizeFilter = function(filter) {
    if (filter === undefined) return;
    if (typeof filter === "function") return filter;
    if (typeof filter === "string") {
        var glob = picomatch(filter.trim());
        return function(entry) {
            return glob(entry.basename);
        };
    }
    if (Array.isArray(filter)) {
        var positive = [];
        var negative = [];
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = filter[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var item = _step.value;
                var trimmed = item.trim();
                if (trimmed.charAt(0) === BANG) {
                    negative.push(picomatch(trimmed.slice(1)));
                } else {
                    positive.push(picomatch(trimmed));
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        if (negative.length > 0) {
            if (positive.length > 0) {
                return function(entry) {
                    return positive.some(function(f) {
                        return f(entry.basename);
                    }) && !negative.some(function(f) {
                        return f(entry.basename);
                    });
                };
            }
            return function(entry) {
                return !negative.some(function(f) {
                    return f(entry.basename);
                });
            };
        }
        return function(entry) {
            return positive.some(function(f) {
                return f(entry.basename);
            });
        };
    }
};
var ReaddirpStream = /*#__PURE__*/ function(Readable) {
    "use strict";
    _inherits(ReaddirpStream, Readable);
    var _super = _create_super(ReaddirpStream);
    function ReaddirpStream() {
        var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        _class_call_check(this, ReaddirpStream);
        var _this;
        _this = _super.call(this, {
            objectMode: true,
            autoDestroy: true,
            highWaterMark: options.highWaterMark || 4096
        });
        var opts = _object_spread({}, ReaddirpStream.defaultOptions, options);
        var root = opts.root, type = opts.type;
        _this._fileFilter = normalizeFilter(opts.fileFilter);
        _this._directoryFilter = normalizeFilter(opts.directoryFilter);
        _this._wantsDir = [
            TEST_DIR_TYPE,
            FILE_TEST_DIR_TYPE,
            EVERYTHING_TYPE
        ].includes(type);
        _this._wantsFile = [
            FILE_TYPE,
            FILE_TEST_DIR_TYPE,
            EVERYTHING_TYPE
        ].includes(type);
        _this._wantsEverything = type === EVERYTHING_TYPE;
        _this._root = path.resolve(root);
        _this._isDirent = "Dirent" in fs && !opts.alwaysStat;
        _this._statsProp = _this._isDirent ? "dirent" : "stats";
        var _this1 = _assert_this_initialized(_this);
        _this.filter = function() {
            var _ref = _async_to_generator(function(entry) {
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            entry[_this1._statsProp] = entry.stats;
                            return [
                                4,
                                _this1._getEntryType(entry)
                            ];
                        case 1:
                            entry.entryType = _state.sent();
                            if (entry.entryType === "directory") return [
                                2,
                                _this1._directoryFilter(entry)
                            ];
                            if (entry.entryType === "file" || _this1._includeAsFile(entry)) return [
                                2,
                                _this1._fileFilter(entry)
                            ];
                            return [
                                2,
                                true
                            ];
                    }
                });
            });
            return function(entry) {
                return _ref.apply(this, arguments);
            };
        }();
        _this.iterator = new Iterator(root, {
            lstat: opts.lstat,
            depth: opts.depth,
            alwaysStat: opts.alwaysStat,
            filter: _this.filter.bind(_assert_this_initialized(_this)),
            error: _this._onError.bind(_assert_this_initialized(_this))
        });
        return _this;
    }
    _create_class(ReaddirpStream, [
        {
            key: "destroy",
            value: function destroy(err) {
                _get(_get_prototype_of(ReaddirpStream.prototype), "destroy", this).call(this, err);
                if (this.iterator) {
                    this.iterator.destroy();
                    this.iterator = null;
                }
            }
        },
        {
            key: "_read",
            value: function _read(batch) {
                var _this = this;
                return _async_to_generator(function() {
                    var done, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                if (_this.reading) return [
                                    2
                                ];
                                _this.reading = true;
                                _state.label = 1;
                            case 1:
                                _state.trys.push([
                                    1,
                                    5,
                                    6,
                                    7
                                ]);
                                _state.label = 2;
                            case 2:
                                if (!(!_this.destroyed && batch > 0)) return [
                                    3,
                                    4
                                ];
                                return [
                                    4,
                                    _this.iterator.forEach(function() {
                                        var _ref = _async_to_generator(function(entry) {
                                            return _ts_generator(this, function(_state) {
                                                if (!_this.destroyed && (entry.entryType === "directory" && _this._wantsDir || entry.entryType === "file" && _this._wantsFile)) {
                                                    batch--;
                                                    _this.push(entry);
                                                }
                                                return [
                                                    2
                                                ];
                                            });
                                        });
                                        return function(entry) {
                                            return _ref.apply(this, arguments);
                                        };
                                    }(), {
                                        limit: batch
                                    })
                                ];
                            case 3:
                                done = _state.sent();
                                if (done) {
                                    _this.push(null);
                                    return [
                                        3,
                                        4
                                    ];
                                }
                                return [
                                    3,
                                    2
                                ];
                            case 4:
                                return [
                                    3,
                                    7
                                ];
                            case 5:
                                error = _state.sent();
                                _this.destroy(error);
                                return [
                                    3,
                                    7
                                ];
                            case 6:
                                _this.reading = false;
                                return [
                                    7
                                ];
                            case 7:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "_onError",
            value: function _onError(err) {
                if (this.destroyed) return false;
                if (~Iterator.EXPECTED_ERRORS.indexOf(err.code)) {
                    this.emit("warn", err);
                    return true;
                }
                if (!this.destroyed) this.destroy(err);
                return false;
            }
        },
        {
            key: "_getEntryType",
            value: function _getEntryType(entry) {
                var _this = this;
                return _async_to_generator(function() {
                    var stats, entryRealPathStats, entryRealPath, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                // entry may be undefined, because a warning or an error were emitted
                                // and the statsProp is undefined
                                stats = entry && entry[_this._statsProp];
                                if (!stats) {
                                    return [
                                        2
                                    ];
                                }
                                if (stats.isFile()) {
                                    return [
                                        2,
                                        "file"
                                    ];
                                }
                                if (stats.isDirectory()) {
                                    return [
                                        2,
                                        "directory"
                                    ];
                                }
                                if (!(stats && stats.isSymbolicLink())) return [
                                    3,
                                    6
                                ];
                                _state.label = 1;
                            case 1:
                                _state.trys.push([
                                    1,
                                    5,
                                    ,
                                    6
                                ]);
                                entryRealPathStats = entry.realStats;
                                if (!!entryRealPathStats) return [
                                    3,
                                    4
                                ];
                                return [
                                    4,
                                    realpath(entry.fullPath)
                                ];
                            case 2:
                                entryRealPath = _state.sent();
                                return [
                                    4,
                                    lstat(entryRealPath)
                                ];
                            case 3:
                                entryRealPathStats = _state.sent();
                                _state.label = 4;
                            case 4:
                                if (entryRealPathStats.isFile()) {
                                    return [
                                        2,
                                        "file"
                                    ];
                                }
                                if (entryRealPathStats.isDirectory()) {
                                    return [
                                        2,
                                        "directory"
                                    ];
                                }
                                return [
                                    3,
                                    6
                                ];
                            case 5:
                                error = _state.sent();
                                _this._onError(error);
                                return [
                                    3,
                                    6
                                ];
                            case 6:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "_includeAsFile",
            value: function _includeAsFile(entry) {
                var stats = entry && entry[this._statsProp];
                return stats && this._wantsEverything && !stats.isDirectory();
            }
        }
    ], [
        {
            key: "defaultOptions",
            get: function get() {
                return {
                    root: ".",
                    /* eslint-disable no-unused-vars */ fileFilter: function(_path) {
                        return true;
                    },
                    directoryFilter: function(_path) {
                        return true;
                    },
                    /* eslint-enable no-unused-vars */ type: FILE_TYPE,
                    lstat: false,
                    depth: 2147483648,
                    alwaysStat: false
                };
            }
        }
    ]);
    return ReaddirpStream;
}(Readable);
/**
 * @typedef {Object} ReaddirpArguments
 * @property {Function=} fileFilter
 * @property {Function=} directoryFilter
 * @property {String=} type
 * @property {Number=} depth
 * @property {String=} root
 * @property {Boolean=} lstat
 * @property {Boolean=} bigint
 */ /**
 * Main function which ends up calling readdirRec and reads all files and directories in given root recursively.
 * @param {String} root Root directory
 * @param {ReaddirpArguments=} options Options to specify root (start directory), filters and recursion depth
 */ var readdirp = function(root) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var type = options.entryType || options.type;
    if (type === "both") type = FILE_TEST_DIR_TYPE; // backwards-compatibility
    if (type) options.type = type;
    if (!root) {
        throw new Error("readdirp: root argument is required. Usage: readdirp(root, options)");
    }
    if (typeof root !== "string") {
        throw new TypeError("readdirp: root argument must be a string. Usage: readdirp(root, options)");
    }
    if (type && !ALL_TYPES.includes(type)) {
        throw new Error("readdirp: Invalid type passed. Use one of ".concat(ALL_TYPES.join(", ")));
    }
    options.root = root;
    return new ReaddirpStream(options);
};
var readdirpPromise = function(root) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return new Promise(function(resolve, reject) {
        var files = [];
        readdirp(root, options).on("data", function(entry) {
            return files.push(entry);
        }).on("end", function() {
            return resolve(files);
        }).on("error", function(error) {
            return reject(error);
        });
    });
};
module.exports = {
    readdirp: readdirp,
    promise: readdirpPromise,
    ReaddirpStream: ReaddirpStream
};
/* CJS INTEROP */ if (exports.__esModule && exports.default) { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) exports.default[key] = exports[key]; module.exports = exports.default; }