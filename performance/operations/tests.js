'use strict';

const BenchmarkSuite = require('benchmark-suite');

module.exports = async function run({ readdirp, version, testOptions }, dir) {
  const suite = new BenchmarkSuite(`ReaddirpStream ${  version}`, 'Operations');

  for (const test of testOptions) {
    suite.add(`${test.name}`, () => {
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
        `${results[key].name.padStart(8, ' ')}| ${suite.formatStats(
          results[key].stats
        )}`
      );
  });
  suite.on('complete', (results) => {
    console.log('-----Fastest-----');
    for (const key in results)
      console.log(
        `${results[key].name.padStart(8, ' ')}| ${suite.formatStats(
          results[key].stats
        )}`
      );
  });

  console.log(`----------${  suite.name  }----------`);
  await suite.run({ time: 1000 });
  console.log('');
};
