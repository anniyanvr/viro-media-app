/**
 * Copyright (c) 2016-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';

import {
  ViroSceneNavigator,
  ViroScene,
  ViroBox,
} from 'react-viro';

var InitialScene = require('./js/HelloWorld/HelloWorldScene');

export default class ViroSample extends Component {
  render() {
  	console.log("index.android.js" + this.props.debug);
    let scene = this._getScene(this.props.initialScene);
    return (
      <ViroSceneNavigator apiKey="25E18786-5C8C-4084-9DFA-00BDA03BE625"
       initialScene={{scene: scene}}
       vrModeEnabled={this.props.vrMode}
       debug={this.props.debug}
        />
    );
  }
  _getScene(sceneName) {
    // We're doing it this way so that we only load in the scenes that we need.
    if (sceneName == '360 Photo Tour') {
      return require('./js/360PhotoTour/MainScene');
    } else if (sceneName == 'Inside the Human Body') {
      return require('./js/HumanBody/Heart');
    } else if (sceneName == 'Viro Media Player') {
      return require('./js/ViroMediaPlayer/ViroTheatre');
    } else if (sceneName == 'Flickr Photo Explorer') {
      return require('./js/HelloWorld/HelloWorldScene'); // TODO: replace this scene with the right one
    } else {
      return require('./js/HelloWorld/HelloWorldScene');
    }
  }
}

AppRegistry.registerComponent('ViroSample', () => ViroSample);
