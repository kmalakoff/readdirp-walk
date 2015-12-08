readdirp-walk

This is mostly a standin replacement for readdirp. See readdirp for documentation: https://github.com/thlorenz/readdirp

Differences:

- uses micromatch instead of minimatch
- no streaming API: is this is desired, please extract the code and create a separate module
- relative directories: the tests need to be fixed. Submit a pull request

Additions:

- number: concurrency - option to set the maximum number of concurrency of fs operations to limit parallelism
