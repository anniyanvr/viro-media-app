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
  ViroCamera,
  ViroOrbitCamera
} from 'react-viro';

let polarToCartesian = ViroUtils.polarToCartesian;
var RollOverMenuItem = require('./custom_controls/RollOverMenuItem');
var HomeButton = require('../HomeScreen/custom_component/HomeButton');

var RevokedHomeMenu = React.createClass({
  getInitialState() {
    return {
      runMenuAnimation: false,
    };
  },
  render: function() {
    return (
      <ViroScene >
        <ViroCamera active={true} />
        <ViroOrbitCamera active={false} />
        <ViroAmbientLight color="#ffffff"/>

        <Viro360Image source={require("./res/viro_menu_bg.jpg")} />

        <Viro3DObject source={require("./res/home_logo_viro_top.obj")} position={polarToCartesian([6.5, 0, 30])}
        materials={["home_logo_viro"]} transformBehaviors={"billboardY"}/>

        <RollOverMenuItem  text="Interrogation Room" onClick={this._onClick}  position={polarToCartesian([5.0, -30, 5])} rotation={[0, 30, 0]} image={require("./res/scene_1.png")} />
        <RollOverMenuItem  text="Office" onClick={this._onClick} position={polarToCartesian([5.0, 0, 5])} image={require("./res/scene_2.png")} />
        <RollOverMenuItem  text="Los Angeles Overlook" onClick={this._onClick} position={polarToCartesian([5.0, 30, 5])} rotation={[0, -30, 0]} image={require("./res/scene_3.png")} />
       
        <RollOverMenuItem  text="Jane's Apartment" onClick={this._onClick} position={polarToCartesian([5.0, -30, -20])} rotation={[0, 30, 0]} image={require("./res/scene_4.png")} />

        <RollOverMenuItem  text="I-5 Freeway" onClick={this._onClick}  position={polarToCartesian([5.0, 0, -20])} image={require("./res/scene_5.png")} />
        <RollOverMenuItem  text="AGS Checkpoint" onClick={this._onClick} position={polarToCartesian([5.0, 30, -20])} rotation={[0, -30, 0]} image={require("./res/scene_7.png")} />

        <RollOverMenuItem  text="I-5 Freeway Corridor" onClick={this._onClick} position={polarToCartesian([5.0, -30, -45])} rotation={[0, 30, 0]} image={require("./res/scene_4.png")} />

        <RollOverMenuItem  text="Exterior Sanctuary" onClick={this._onClick}  position={polarToCartesian([5.0, 0, -45])} image={require("./res/scene_5.png")} />
        <RollOverMenuItem  text="Sanctuary" onClick={this._onClick} position={polarToCartesian([5.0, 30, -45])} rotation={[0, -30, 0]} image={require("./res/scene_7.png")} />

        <HomeButton sceneNavigator={this.props.sceneNavigator} shouldRender={this.props.displayHomeButton} />
      </ViroScene>
    );
  },

  _onClick: function(text) {
      let mainScene = require('./MainScene');
      this.props.sceneNavigator.push({scene:mainScene, passProps:{displayHomeButton:"true", sceneName:text}});
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

module.exports = RevokedHomeMenu;
