var fs = require("fs");
var sysPath = require("path");
var EventEmitter = require("eventemitter3");
var walk = require("walk-filtered");
var micromatch = require("micromatch");

var normalizeFilter = require("./glob").normalizeFilter;

module.exports = function(options, fileCallback, callback) {
  if (arguments.length === 2) {
    callback = fileCallback;
    fileCallback = null;
  }
  var emitter = new EventEmitter();

  /////////////////////////////////////
  // emulating readdirp API variations
  var results = callback ? { directories: [], files: [] } : null;
  var entryType = options.entryType || "files";
  function addResult(data) {
    if (data.stat.isDirectory()) return results.directories.push(data);
    else if (entryType !== "both" || data.stat.isFile())
      return results.files.push(data);
  }

  var _callback = callback;
  callback = function(err) {
    emitter.emit("end", err);
    if (_callback) {
      err ? _callback(err) : _callback(null, results);
    }
  };

  var isMatch = options.isMatch || micromatch.isMatch;
  var directoryFilter, fileFilter;
  try {
    directoryFilter = normalizeFilter(options.directoryFilter, isMatch);
    fileFilter = normalizeFilter(options.fileFilter, isMatch);
  } catch (err) {
    return callback([err]);
  }

  /////////////////////////////////////
  var root = options.root;
  var realRoot;
  var depth = options.depth;
  if (typeof depth === "undefined" || isNaN(depth)) depth = Infinity;

  function toData(path, stat) {
    var parts = path ? path.split(sysPath.sep) : [];
    var fullPath = sysPath.join(realRoot, path);

    return {
      path: path,
      stat: stat,
      fullPath: fullPath,
      fullParentDir: parts.length ? sysPath.dirname(fullPath) : realRoot,
      depth: parts.length,
      name: parts.length ? parts.pop() : ""
    };
  }

  function filter(path, stats) {
    var data = toData(path, stats);
    if (data.depth > depth + 1) return false;
    var keep =
      !path.length ||
      (stats.isDirectory()
        ? directoryFilter(data, stats)
        : fileFilter(data, stats));
    if (keep && path) {
      emitter.emit("data", data);
      !fileCallback || stats.isDirectory() || fileCallback(data);
      !results || addResult(data);
    }
    return keep;
  }

  // lookup the real root before starting
  fs.realpath(root, function(err, _realRoot) {
    if (err) return callback(err);
    realRoot = _realRoot;

    var walkOptions = {
      stat: options.lstat ? "lstat" : "stat",
      concurrency: options.concurrency
    };
    walk(realRoot, filter, walkOptions, callback);
  });

  return emitter;
};
