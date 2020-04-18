'use strict';

const BenchmarkSuite = require('benchmark-suite');

module.exports = async function run({ readdirp, version, testOptions }, dir) {
  console.log('****************\n');
  console.log(`Running: ${version}`);
  console.log('----------------');

  const suite = new BenchmarkSuite(`ReaddirpStream ${dir}`, 'Operations');

  for (const test of testOptions) {
    suite.add(`${version}-${test.name}`, () => {
      return new Promise((resolve, reject) => {
        let stream = new readdirp.ReaddirpStream(dir, test.options);
        stream.on('data', () => {});
        stream.on('error', (err) => {
          if (!stream) return;
          stream.destroy();
          stream = null;
          reject(err);
        });
        stream.on('end', () => {
          if (!stream) return;
          stream.destroy();
          stream = null;
          resolve();
        });
      });
    });
  }

  suite.on('cycle', (results) => {
    for (const key in results)
      console.log(
        `${results[key].name} (${key}) x ${suite.formatStats(
          results[key].stats
        )}`
      );
  });
  suite.on('complete', (results) => {
    console.log('----------------');
    console.log('Fastest');
    console.log('----------------');
    for (const key in results)
      console.log(
        `${results[key].name} (${key}) x ${suite.formatStats(
          results[key].stats
        )}`
      );
    console.log('****************\n');
  });

  console.log(`Comparing ${suite.name}`);
  await suite.run({ time: 1000 });
  console.log('****************\n');
};
