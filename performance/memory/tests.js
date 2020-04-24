'use strict';

const BenchmarkSuite = require('benchmark-suite');

module.exports = async function run({ readdirp, version, testOptions }, dir) {
  const suite = new BenchmarkSuite(`ReaddirpStream ${version}`, 'Memory');

  for (const test of testOptions) {
    suite.add(`${test.name}`, (fn) => {
      return new Promise((resolve, reject) => {
        let stream = new readdirp.ReaddirpStream(
          Object.assign({ root: dir }, test.options)
        );
        stream.on('data', async () => {
          await fn();
        });
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
        `${results[key].name.padStart(10, ' ')}| ${suite.formatStats(
          results[key].stats
        )} - ${key}`
      );
  });
  suite.on('complete', (results) => {
    console.log('-----Largest-----');
    for (const key in results)
      console.log(
        `${results[key].name.padStart(10, ' ')}| ${suite.formatStats(
          results[key].stats
        )} - ${key}`
      );
  });

  console.log(`----------${suite.name}----------`);
  await suite.run({ time: 1000 }); //, heapdumpTrigger: 1024 * 10 });
  console.log('');
};
