// This has been extracted from readdirp: https://github.com/thlorenz/readdirp/blob/master/LICENSE

// Standard helpers
function isFunction (obj) {
  return toString.call(obj) === '[object Function]';
}

function isString (obj) {
  return toString.call(obj) === '[object String]';
}

function isRegExp (obj) {
  return toString.call(obj) === '[object RegExp]';
}

function isUndefined (obj) {
  return obj === void 0;
}

module.exports.normalizeFilter = function(filter, isMatch) {

  if (isUndefined(filter)) return function() { return true; };

  function isNegated (filters) {

    function negated(f) {
      return f.indexOf('!') === 0;
    }

    var some = filters.some(negated);
    if (!some) {
      return false;
    } else {
      if (filters.every(negated)) {
        return true;
      } else {
        // if we detect illegal filters, bail out immediately
        throw new Error(
          'Cannot mix negated with non negated glob filters: ' + filters + '\n' +
          'https://github.com/thlorenz/readdirp#filters'
        );
      }
    }
  }

  // Turn all filters into a function
  if (isFunction(filter)) {

    return filter;

  } else if (isString(filter)) {

    return function (entryInfo) {
      return isMatch(entryInfo.name, filter.trim());
    };

  } else if (filter && Array.isArray(filter)) {

    if (filter) filter = filter.map(function (f) {
      return f.trim();
    });

    return isNegated(filter) ?
      // use AND to concat multiple negated filters
      function (entryInfo) {
        return filter.every(function (f) {
          return isMatch(entryInfo.name, f);
        });
      }
      :
      // use OR to concat multiple inclusive filters
      function (entryInfo) {
        return filter.some(function (f) {
          return isMatch(entryInfo.name, f);
        });
      };
  }
}
