/**
 * Copyright (c) 2015-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

import React, { Platform } from 'react';

import {StyleSheet} from 'react-native';
import {
  ViroScene,
  ViroAmbientLight,
  ViroOmniLight,
  Viro360Image,
  ViroMaterials,
  ViroAnimations,
  ViroAnimatedComponent,
  ViroSkyBox,
  ViroSurface,
  Viro3DObject,
  ViroUtils,
  ViroDirectionalLight,
  ViroButton,
  ViroImage,
  ViroNode,
  ViroText,
  ViroFlexView,
} from 'react-viro';

let polarToCartesian = ViroUtils.polarToCartesian;
var RollOverMenuItem = require('./custom_component/RollOverMenuItem');
var createReactClass = require('create-react-class');

var HomeMenuScene = createReactClass({
  getInitialState() {
    return {
      runMenuAnimation: false,
    };
  },
  render: function() {
    return (
      <ViroScene >
        <ViroAmbientLight color="#ffffff"/>

        <Viro360Image source={require("./res/viro_menu_bg.jpg")} />

        <Viro3DObject source={require("./res/home_logo_viro_top.obj")} position={polarToCartesian([6.5, 0, 30])}
        materials={["home_logo_viro"]} transformBehaviors={"billboardY"} type="OBJ"/>

        <RollOverMenuItem  text="360 Photo Tour" onClick={this._onClick} position={polarToCartesian([5.0, -25, 5])} rotation={[0, 45, 0]} image={require("./res/btn_phototour.jpg")} />
        <RollOverMenuItem  text="Viro Media Player" onClick={this._onClick}  position={polarToCartesian([5.0, 0, 5])} image={require("./res/btn_mediaplayer.jpg")} />
        <RollOverMenuItem  text="The Human Heart" onClick={this._onClick} position={polarToCartesian([5.0, 25, 5])} rotation={[0, -45, 0]} image={require("./res/btn_heart.jpg")} />
      </ViroScene>
    );
  },

  _onClick: function(text) {
      let nextScene = this._getScene(text);
      this.props.sceneNavigator.push({scene:nextScene, passProps:{displayHomeButton:"true"}});
  },

  _getScene: function(sceneName) {
      // We're doing it this way so that we only load in the scenes that we need.
      if (sceneName == '360 Photo Tour') {
        console.log("Going to push 360 photo tour");
        return require('../360PhotoTour/MainScene');
      } else if (sceneName == 'The Human Heart') {
        console.log("Going to human body heart");
        return require('../HumanBody/Heart');
      } else if (sceneName == 'Viro Media Player') {
        console.log("Going to push viro theatre");
        return require('../ViroMediaPlayer/ViroTheatre');
      } else  {
        return require('../HelloWorld/HelloWorldScene');
      }
  },
});

ViroMaterials.createMaterials({
  home_logo_viro: {
    shininess:1.0,
    lightingModel: "Lambert",
    diffuseTexture: require("./res/home_logo_viro.png"),
  },
});

var styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
    flex: 1,
  },
});

module.exports = HomeMenuScene;
