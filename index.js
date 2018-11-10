/* eslint-env node */
'use strict';

const path = require('path');
const RuntimeBin = require('lambda-bin');

const {
  GIT_BIN_PATH,
  MIN_PACK_PATH,
  MIN_PACK_FILENAME,
} = require('./config');
const MIN_PACK = require(path.resolve(MIN_PACK_PATH, MIN_PACK_FILENAME));

exports.installGit = function (options) {
  return new Promise((resolve, reject) => {
    options = options || {};

    var targetDirectory = options.targetDirectory || '/tmp/git';
    var updateEnv = (options.updateEnv !== undefined) ? options.updateEnv : true;

    var GIT_TEMPLATE_DIR = path.join(targetDirectory, 'usr/share/git-core/templates');
    var GIT_EXEC_PATH = path.join(targetDirectory, 'usr/libexec/git-core');
    var LD_LIBRARY_PATH = path.join(targetDirectory, 'usr/lib64');
    var binPath = path.join(targetDirectory, 'usr/bin');

    var lambdaBinRuntime = new RuntimeBin({
      useSymlinks: true,
      targetPath: GIT_BIN_PATH,
      minPack: MIN_PACK,
    });
    lambdaBinRuntime.applyMinPack(targetDirectory).then(() => {
      if (updateEnv) {
        process.env.PATH = process.env.PATH + ':' + binPath;
        process.env.GIT_TEMPLATE_DIR = GIT_TEMPLATE_DIR;
        process.env.GIT_EXEC_PATH = GIT_EXEC_PATH;
        process.env.LD_LIBRARY_PATH = process.env.LD_LIBRARY_PATH
          ? process.env.LD_LIBRARY_PATH + ':' + LD_LIBRARY_PATH
          : LD_LIBRARY_PATH;
        resolve();
      } else {
        resolve({
          binPath: binPath,
          env: {
            GIT_TEMPLATE_DIR: GIT_TEMPLATE_DIR,
            GIT_EXEC_PATH: GIT_EXEC_PATH,
            LD_LIBRARY_PATH: LD_LIBRARY_PATH
          }
        });
      }
    }, error => {
      reject(new Error(`lambda-git failed to load: ${error}`));
    });

  });
};
