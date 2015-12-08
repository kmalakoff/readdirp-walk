readdirp-walk
------------

This is mostly a standin replacement for readdirp and pass most of its tests (except streaming and relative directories). See [readdirp documentation](https://github.com/thlorenz/readdirp) for API details.

This was written to allow control over the concurrency of scanning since in some cases, you want to play nice with other things going on instead of making a huge number of parallel requests. Also, this is a much simpler and more performant. 

If you are looking for even more performance and to roll your own scanning algorithm, try [walk-filtered](https://github.com/kmalakoff/walk-filtered) which this library uses for scanning.

**Differences**

- uses micromatch instead of minimatch (you can bypass globs by passing fileFilter / directoryFilter functions instead of pattern strings)
- does not accumulate results of what was scanned unless you pass it a callback as the final argument. Use `on('end', fn)` to avoid the memory accumulation of processed results of reddirp.
- simplified the [entry information emitted](https://github.com/kmalakoff/readdirp-walk/blob/master/index.js#L41) to avoid unnecessary processing
- no streaming API - is this is desired, please extract the code from readdrip and create a companion module
- relative directories - I wasn't using this and relative directories seem unnecessary, but if you need it, please submit a pull request with working tests...

**Added Options**

- number: concurrency - option to set the maximum number of concurrency of fs operations to limit parallelism
- function: isMatch - option to set matching function (default is `{isMatch: micromatch.isMatch}`, but `{isMatch: minimatch}` or `{isMatch: function(value, pattern) { return value === pattern; }}` would work too)
