## readdirp-walk

This is a standin replacement for readdirp. See [readdirp documentation](https://github.com/paulmillr/readdirp) for API details.

This was written to allow control over the concurrency of scanning to strike a balance between speed and memory.

If you are looking for even more performance and to roll your own scanning algorithm, try [fs-iterator](https://github.com/kmalakoff/fs-iterator) which this library uses for scanning.

**Aditional Options**

- number: concurrency - option to set the maximum number of concurrent fs operations to strike a balance between speed and memory. (default: 36 - based on performance benchmarking with readdirp to beat performance and have a similar upper limit on memory).
