/* eslint-env node */
'use strict';

const fs = require('fs');
const fse = require('fs-extra');
const gulp = require('gulp');
const file = require('gulp-file');
const path = require('path');
const tar = require('tar-fs');
const stagingWorkflow = require('bin-minify').StagingWorkflow;

const {
  GIT_BIN_PATH,
  MIN_PACK_PATH,
  MIN_PACK_FILENAME,
} = require('./config');

const GIT_FILENAME = path.join('node_modules', 'lambda-git', 'git-2.4.3.tar');

gulp.task('default', async (done) => {
  fse.ensureDirSync(GIT_BIN_PATH);

  await fs.createReadStream(path.resolve(__dirname, GIT_FILENAME))
    .pipe(tar.extract(GIT_BIN_PATH))
    .on('finish', () => {
      const options = {
        sendToTrash: false,
        dryRun: false,
        strict: false,
      };
      stagingWorkflow(GIT_BIN_PATH, options).then(minPack => {
        file(MIN_PACK_FILENAME, JSON.stringify(minPack, null, ' '), {src: true})
          .pipe(gulp.dest(MIN_PACK_PATH));
        done();
      }, error => {
        console.error(`Could not create minPack: ${error}`); // eslint-disable-line no-console
        done();
      });
    });
});
