const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');
const promisify = require('util.promisify');
const chai = require('chai');
const chaiSubset = require('chai-subset');
const rimraf = require('rimraf');
const readdirp = require('readdirp-walk');

chai.use(chaiSubset);
chai.should();

const pRimraf = promisify(rimraf);
const mkdir = promisify(fs.mkdir);
const symlink = promisify(fs.symlink);
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const supportsDirent = 'Dirent' in fs;
const isWindows = process.platform === 'win32';
const root = path.join(__dirname, 'test-fixtures');

let testCount = 0;
let currPath;

const sort = (res, items) => items.map((x) => res.find((y) => x === y.basename));

const read = async (options) => readdirp.promise(currPath, options);

const touch = async (files = [], dirs = []) => {
  for (const name of files) {
    await writeFile(path.join(currPath, name), `${Date.now()}`);
  }
  for (const dir of dirs) {
    await mkdir(path.join(currPath, dir));
  }
};

const formatEntry = (file, dir = root) => {
  return {
    basename: path.basename(file),
    path: path.normalize(file),
    fullPath: path.join(dir, file),
  };
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const waitForEnd = (stream) => new Promise((resolve) => stream.on('end', resolve));

beforeEach(async () => {
  testCount++;
  currPath = path.join(root, testCount.toString());
  await pRimraf(currPath);
  await mkdir(currPath);
});

afterEach(async () => {
  await pRimraf(currPath);
});

before(async () => {
  await pRimraf(root);
  await mkdir(root);
});
after(async () => {
  await pRimraf(root);
});

describe('basic', () => {
  it('reads directory', async () => {
    const files = ['a.txt', 'b.txt', 'c.txt'];
    await touch(files);
    const res = await read();
    res.should.have.lengthOf(files.length);
    sort(res, files).forEach((entry, index) => entry.should.containSubset(formatEntry(files[index], currPath)));
  });
});

describe('symlinks', () => {
  // not using arrow function, because this.skip
  before(function () {
    // GitHub Actions / default Windows installation disable symlink support unless admin
    if (isWindows) this.skip();
  });

  it('handles symlinks', async () => {
    const newPath = path.join(currPath, 'test-symlinked.js');
    await symlink(path.join(__dirname, 'test.js'), newPath);
    const res = await read();
    const first = res[0];
    first.should.containSubset(formatEntry('test-symlinked.js', currPath));
    const contents = await readFile(first.fullPath);
    contents.should.match(/handles symlinks/); // name of this test
  });

  it('handles symlinked directories', async () => {
    const originalPath = path.join(__dirname, '..', 'examples');
    const originalFiles = await readdir(originalPath);
    const newPath = path.join(currPath, 'examples');
    await symlink(originalPath, newPath);
    const res = await read();
    const symlinkedFiles = sort(res, originalFiles).map((entry) => entry.basename);
    symlinkedFiles.should.eql(originalFiles);
  });

  it('should use lstat instead of stat', async () => {
    const files = ['a.txt', 'b.txt', 'c.txt'];
    const symlinkName = 'test-symlinked.js';
    const newPath = path.join(currPath, symlinkName);
    await symlink(path.join(__dirname, 'test.js'), newPath);
    await touch(files);
    const expect = [...files, symlinkName];
    const res = await read({ lstat: true, alwaysStat: true });
    res.should.have.lengthOf(expect.length);
    sort(res, expect).forEach((entry, index) => {
      entry.should.containSubset(formatEntry(expect[index], currPath, false));
      entry.should.have.property('stats');
      if (entry.basename === symlinkName) {
        entry.stats.isSymbolicLink().should.equals(true);
      }
    });
  });
});

describe('type', () => {
  const files = ['a.txt', 'b.txt', 'c.txt'];
  const dirs = ['d', 'e', 'f', 'g'];

  it('files', async () => {
    await touch(files, dirs);
    const res = await read({ type: 'files' });
    res.should.have.lengthOf(files.length);
    sort(res, files).forEach((entry, index) => entry.should.containSubset(formatEntry(files[index], currPath)));
  });

  it('directories', async () => {
    await touch(files, dirs);
    const res = await read({ type: 'directories' });
    res.should.have.lengthOf(dirs.length);
    sort(res, dirs).forEach((entry, index) => entry.should.containSubset(formatEntry(dirs[index], currPath)));
  });

  it('both', async () => {
    await touch(files, dirs);
    const res = await read({ type: 'both' });
    const both = files.concat(dirs);
    res.should.have.lengthOf(both.length);
    sort(res, both).forEach((entry, index) => entry.should.containSubset(formatEntry(both[index], currPath)));
  });

  it('all', async () => {
    await touch(files, dirs);
    const res = await read({ type: 'all' });
    const all = files.concat(dirs);
    res.should.have.lengthOf(all.length);
    sort(res, all).forEach((entry, index) => entry.should.containSubset(formatEntry(all[index], currPath)));
  });

  it('invalid', async () => {
    try {
      await read({ type: 'bogus' });
    } catch (error) {
      error.message.should.match(/Invalid type/);
    }
  });
});

describe('depth', () => {
  const depth0 = ['a.js', 'b.js', 'c.js'];
  const subdirs = ['subdir', 'deep'];
  const depth1 = ['subdir/d.js', 'deep/e.js'];
  const deepSubdirs = ['subdir/s1', 'subdir/s2', 'deep/d1', 'deep/d2'];
  const depth2 = ['subdir/s1/f.js', 'deep/d1/h.js'];

  beforeEach(async () => {
    await touch(depth0, subdirs);
    await touch(depth1, deepSubdirs);
    await touch(depth2);
  });

  it('0', async () => {
    const res = await read({ depth: 0 });
    res.should.have.lengthOf(depth0.length);
    sort(res, depth0).forEach((entry, index) => entry.should.containSubset(formatEntry(depth0[index], currPath)));
  });

  it('1', async () => {
    const res = await read({ depth: 1 });
    const expect = [...depth0, ...depth1];
    res.should.have.lengthOf(expect.length);
    res.sort((a, b) => (a.basename > b.basename ? 1 : -1)).forEach((entry, index) => entry.should.containSubset(formatEntry(expect[index], currPath)));
  });

  it('2', async () => {
    const res = await read({ depth: 2 });
    const expect = [...depth0, ...depth1, ...depth2];
    res.should.have.lengthOf(expect.length);
    res.sort((a, b) => (a.basename > b.basename ? 1 : -1)).forEach((entry, index) => entry.should.containSubset(formatEntry(expect[index], currPath)));
  });

  it('default', async () => {
    const res = await read();
    const expect = [...depth0, ...depth1, ...depth2];
    res.should.have.lengthOf(expect.length);
    res.sort((a, b) => (a.basename > b.basename ? 1 : -1)).forEach((entry, index) => entry.should.containSubset(formatEntry(expect[index], currPath)));
  });
});

describe('filtering', () => {
  beforeEach(async () => {
    await touch(['a.js', 'b.txt', 'c.js', 'd.js', 'e.rb']);
  });
  it('glob', async () => {
    const expect1 = ['a.js', 'c.js', 'd.js'];
    const res = await read({ fileFilter: '*.js' });
    res.should.have.lengthOf(expect1.length);
    sort(res, expect1).forEach((entry, index) => entry.should.containSubset(formatEntry(expect1[index], currPath)));

    const res2 = await read({ fileFilter: ['*.js'] });
    res2.should.have.lengthOf(expect1.length);
    sort(res2, expect1).forEach((entry, index) => entry.should.containSubset(formatEntry(expect1[index], currPath)));

    const expect2 = ['b.txt'];
    const res3 = await read({ fileFilter: ['*.txt'] });
    res3.should.have.lengthOf(expect2.length);
    sort(res3, expect2).forEach((entry, index) => entry.should.containSubset(formatEntry(expect2[index], currPath)));
  });
  it('leading and trailing spaces', async () => {
    const expect = ['a.js', 'c.js', 'd.js', 'e.rb'];
    const res = await read({ fileFilter: [' *.js', '*.rb '] });
    res.should.have.lengthOf(expect.length);
    sort(res, expect).forEach((entry, index) => entry.should.containSubset(formatEntry(expect[index], currPath)));
  });
  it('multiple glob', async () => {
    const expect = ['a.js', 'b.txt', 'c.js', 'd.js'];
    const res = await read({ fileFilter: ['*.js', '*.txt'] });
    res.should.have.lengthOf(expect.length);
    sort(res, expect).forEach((entry, index) => entry.should.containSubset(formatEntry(expect[index], currPath)));
  });
  it('negated glob', async () => {
    const expect = ['a.js', 'b.txt', 'c.js', 'e.rb'];
    const res = await read({ fileFilter: ['!d.js'] });
    res.should.have.lengthOf(expect.length);
    sort(res, expect).forEach((entry, index) => entry.should.containSubset(formatEntry(expect[index], currPath)));
  });
  it('glob & negated glob', async () => {
    const expect = ['a.js', 'c.js'];
    const res = await read({ fileFilter: ['*.js', '!d.js'] });
    res.should.have.lengthOf(expect.length);
    sort(res, expect).forEach((entry, index) => entry.should.containSubset(formatEntry(expect[index], currPath)));
  });
  it('two negated glob', async () => {
    const expect = ['b.txt'];
    const res = await read({ fileFilter: ['!*.js', '!*.rb'] });
    res.should.have.lengthOf(expect.length);
    sort(res, expect).forEach((entry, index) => entry.should.containSubset(formatEntry(expect[index], currPath)));
  });
  it('function', async () => {
    const expect = ['a.js', 'c.js', 'd.js'];
    const res = await read({
      fileFilter: (entry) => path.extname(entry.fullPath) === '.js',
    });
    res.should.have.lengthOf(expect.length);
    sort(res, expect).forEach((entry, index) => entry.should.containSubset(formatEntry(expect[index], currPath)));

    if (supportsDirent) {
      const expect2 = ['a.js', 'b.txt', 'c.js', 'd.js', 'e.rb'];
      const res2 = await read({ fileFilter: (entry) => entry.dirent.isFile() });
      res2.should.have.lengthOf(expect2.length);
      sort(res2, expect2).forEach((entry, index) => entry.should.containSubset(formatEntry(expect2[index], currPath)));
    }
  });
  it('function with stats', async () => {
    const expect = ['a.js', 'c.js', 'd.js'];
    const res = await read({
      alwaysStat: true,
      fileFilter: (entry) => path.extname(entry.fullPath) === '.js',
    });
    res.should.have.lengthOf(expect.length);
    sort(res, expect).forEach((entry, index) => {
      entry.should.containSubset(formatEntry(expect[index], currPath));
      entry.should.have.property('stats');
    });

    const expect2 = ['a.js', 'b.txt', 'c.js', 'd.js', 'e.rb'];
    const res2 = await read({
      alwaysStat: true,
      fileFilter: (entry) => entry.stats.size > 0,
    });
    res2.should.have.lengthOf(expect2.length);
    sort(res2, expect2).forEach((entry, index) => {
      entry.should.containSubset(formatEntry(expect2[index], currPath));
      entry.should.have.property('stats');
    });
  });
});

describe('various', () => {
  it('emits readable stream', () => {
    const stream = readdirp(currPath);
    stream.should.be.an.instanceof(Readable);
    stream.should.be.an.instanceof(readdirp.ReaddirpStream);
  });

  it('fails without root option passed', async () => {
    try {
      readdirp();
    } catch (error) {
      error.should.be.an.instanceof(Error);
    }
  });

  it('disallows old API', () => {
    try {
      readdirp({ root: '.' });
    } catch (error) {
      error.should.be.an.instanceof(Error);
    }
  });

  it('exposes promise API', async () => {
    const created = ['a.txt', 'c.txt'];
    await touch(created);
    const result = await readdirp.promise(currPath);
    result.should.have.lengthOf(created.length);
    sort(result, created).forEach((entry, index) => entry.should.containSubset(formatEntry(created[index], currPath)));
  });
  it('should emit warning for missing file', async () => {
    // readdirp() is initialized on some big root directory
    // readdirp() receives path a/b/c to its queue
    // readdirp is reading something else
    // a/b gets deleted, so stat()-ting a/b/c would now emit enoent
    // We should emit warnings for this case.
    // this.timeout(4000);
    fs.mkdirSync(path.join(currPath, 'a'));
    fs.mkdirSync(path.join(currPath, 'b'));
    fs.mkdirSync(path.join(currPath, 'c'));
    let isWarningCalled = false;
    const stream = readdirp(currPath, { type: 'all', highWaterMark: 1 });
    stream.on('warn', (warning) => {
      warning.should.be.an.instanceof(Error);
      warning.code.should.equals('ENOENT');
      isWarningCalled = true;
    });
    await delay(500);
    await pRimraf(path.join(currPath, 'a'));
    stream.resume();
    await Promise.race([waitForEnd(stream), delay(2000)]);
    isWarningCalled.should.equals(true);
  }).timeout(4000);
  it('should emit warning for file with strict permission', async () => {
    // Windows doesn't throw permission error if you access permitted directory
    if (isWindows) {
      return true;
    }
    const permitedDir = path.join(currPath, 'permited');
    fs.mkdirSync(permitedDir, 0o0);
    let isWarningCalled = false;
    const stream = readdirp(currPath, { type: 'all' })
      .on('data', () => {})
      .on('warn', (warning) => {
        warning.should.be.an.instanceof(Error);
        warning.code.should.equals('EACCES');
        isWarningCalled = true;
      });
    await Promise.race([waitForEnd(stream), delay(2000)]);
    isWarningCalled.should.equals(true);
    fs.chmodSync(permitedDir, 0o777);
  });
  it('should not emit warning after "end" event', async () => {
    // Windows doesn't throw permission error if you access permitted directory
    if (isWindows) {
      return true;
    }
    const subdir = path.join(currPath, 'subdir');
    const permitedDir = path.join(subdir, 'permited');
    fs.mkdirSync(subdir);
    fs.mkdirSync(permitedDir, 0o0);
    let isWarningCalled = false;
    let isEnded = false;
    let timer;
    const stream = readdirp(currPath, { type: 'all' })
      .on('data', () => {})
      .on('warn', (warning) => {
        warning.should.be.an.instanceof(Error);
        warning.code.should.equals('EACCES');
        isEnded.should.equals(false);
        isWarningCalled = true;
        clearTimeout(timer);
      })
      .on('end', () => {
        isWarningCalled.should.equals(true);
        isEnded = true;
      });
    await Promise.race([waitForEnd(stream), delay(2000)]);
    isWarningCalled.should.equals(true);
    isEnded.should.equals(true);
    fs.chmodSync(permitedDir, 0o777);
  });
});
