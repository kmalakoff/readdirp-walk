var fs = require('fs');
var sysPath = require('path');
var EventEmitter = require('events').EventEmitter;
var walk = require('walk-filtered');
var micromatch = require('micromatch');

var normalizeFilter = require('./glob').normalizeFilter;

module.exports = function(options, fileCallback, callback) {
  if (arguments.length === 2) { callback = fileCallback; fileCallback = null; }
  var emitter = new EventEmitter();

  /////////////////////////////////////
  // emulating readdirp API variations
  var results = callback ? {directories: [], files: []} : null;
  var entryType = options.entryType || 'files';
  function addResult(data) {
    if (data.stat.isDirectory()) return results.directories.push(data);
    else if ((entryType !== 'both') || data.stat.isFile()) return results.files.push(data);
  }

  var _callback = callback;
  callback = function(err) {
    emitter.emit('end', err);
    if (_callback) { err ? _callback(err) : _callback(null, results); }
  }

  var isMatch = options.isMatch || micromatch.isMatch;
  var directoryFilter, fileFilter;
  try { directoryFilter = normalizeFilter(options.directoryFilter, isMatch); } catch (err) { return callback([err]); }
  try { fileFilter = normalizeFilter(options.fileFilter, isMatch); } catch (err) { return callback([err]); }
  /////////////////////////////////////

  var root = options.root;
  var realRoot;
  var depth = (typeof options.depth === 'undefined') || isNaN(options.depth) ? Infinity : options.depth;

  function toData(path, stat) {
    var parts = path ? path.split(sysPath.sep) : [];

    var data = {path: path, stat: stat};
    data.fullPath = sysPath.join(realRoot, path);
    data.fullParentDir = parts.length ? sysPath.dirname(data.fullPath) : realRoot;
    data.depth = parts.length;
    data.name = parts.length ? parts.pop() : '';
    return data;
  }

  function filter(path, stat) {
    var data = toData(path, stat);
    if (data.depth > depth + 1) return false;
    var keep = !path.length || (stat.isDirectory() ? directoryFilter(data, stat) : fileFilter(data, stat));
    if (keep && path) {
      emitter.emit('data', data);
      !fileCallback || stat.isDirectory() || fileCallback(data);
      !results || addResult(data);
    }
    return keep;
  }

  // lookup the real root before starting
  fs.realpath(root, function(err, _realRoot) {
    if (err) return callback(err);
    realRoot = _realRoot;

    var walkOptions = {preStat: true, stat: options.lstat ? 'lstat' : 'stat', filter: filter};
    walk(realRoot, walkOptions, callback);
  });

  return emitter;
}
