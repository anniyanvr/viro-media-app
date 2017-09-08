/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * React Native CLI configuration file
 */
'use strict';

<<<<<<< HEAD
const blacklist = require('react-native/packager/blacklist');
=======
>>>>>>> a3de7a631f3627894b2e5d8f06177c22f85a617c
const path = require('path');

module.exports = {
  getProjectRoots() {
    return this._getRoots();
  },

  getAssetRoots() {
    return this._getRoots();
  },

  getAssetExts() {
<<<<<<< HEAD
    return ["obj", "mtl"];
  },

  getBlacklistRE() {
    return blacklist();
=======
    return ["obj", "mtl", "JPG", "vrx"];
>>>>>>> a3de7a631f3627894b2e5d8f06177c22f85a617c
  },

  _getRoots() {
    // match on either path separator
    if (__dirname.match(/node_modules[\/\\]react-native[\/\\]packager$/)) {
      // packager is running from node_modules of another project
      return [path.resolve(__dirname, '../../..')];
    } else if (__dirname.match(/Pods\/React\/packager$/)) {
      // packager is running from node_modules of another project
      return [path.resolve(__dirname, '../../..')];
    } else {
      return [path.resolve(__dirname, '.')];
    }
  },

<<<<<<< HEAD
  getTransformModulePath() {
    return require.resolve('react-native/packager/transformer');
  },

=======
>>>>>>> a3de7a631f3627894b2e5d8f06177c22f85a617c
};
