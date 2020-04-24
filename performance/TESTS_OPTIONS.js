"use strict";

// const CONCURRENCIES = [10000];
// const CONCURRENCIES = [100];
// const CONCURRENCIES = [1];
const CONCURRENCIES = [1, 100, 1000, 10000];
// const ALWAYS_STATS = [false, true];
const ALWAYS_STATS = [false];
const TESTS_OPTIONS = [];

for (const alwaysStat of ALWAYS_STATS) {
  for (const concurrency of CONCURRENCIES) {
    TESTS_OPTIONS.push({
      name: `${concurrency}-${alwaysStat ? "t" : "f"}`,
      options: { highWaterMark: concurrency, alwaysStat },
    });
  }
}
TESTS_OPTIONS.push({ name: "default" });

module.exports = TESTS_OPTIONS;
