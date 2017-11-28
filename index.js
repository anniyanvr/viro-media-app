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
  StyleSheet
} from 'react-native';

import {
  ViroSceneNavigator,
  ViroARSceneNavigator,
  ViroScene,
  ViroBox,
} from 'react-viro';

export default class ViroSample extends Component {
  render() {
    let scene = this._getScene(this.props.initialScene);

    if (this.props.initialScene == 'AR Sample') {      
      return (
      <ViroARSceneNavigator apiKey="06232B7B-00EF-49D5-89F2-A254942824C6"
        initialScene={{scene: scene}} />
      );
    } else {

      return (
        <ViroSceneNavigator apiKey="06232B7B-00EF-49D5-89F2-A254942824C6"
         initialScene={{scene: scene}}
         vrModeEnabled={this.props.vrMode}
          />
      );
    }
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
    } else if (sceneName == 'AR Sample') {
      return require('./js/ARSample/HelloWorldSceneAR.js');
    } else {
      return require('./js/MainMenu/MainMenu');
    }
  }
}

AppRegistry.registerComponent('ViroSample', () => ViroSample);
