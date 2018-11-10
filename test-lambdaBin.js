/* eslint-env node */
'use strict';

const debug = require('debug')('lambda-bin-perf:lambdaBin');
const APP_ID = 'lambda-bin';

exports.handler = function (event, context, callback) {
  require('./index').installGit()
    .then(result => {
      debug('%O', {status: `${APP_ID}: loaded`, result});
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ message: `${APP_ID}: loaded` })
      });
    })
    .catch(error => {
      debug('%O', {status: `${APP_ID}: loading failed`, error});
      callback({
        statusCode: 201,
        body: JSON.stringify({ message: `${APP_ID}: loading failed with error: ${error}` })
      });
    });
};
