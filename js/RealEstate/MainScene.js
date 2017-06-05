/**
 * Copyright (c) 2017-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Pull in all imports required for the controls within this scene.
 */
import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

import {
  AppRegistry,
  ViroScene,
  ViroVideo,
  ViroOmniLight,
  ViroSceneNavigator,
  ViroMaterials,
  ViroText,
  Viro360Image,
  Viro360Video,
  ViroButton,
  ViroImage,
  ViroNode,
  ViroAnimations,
  ViroAnimatedComponent,
  ViroUtils,
  ViroSound,
  ViroSphere,
} from 'react-viro';

let polarToCartesian = ViroUtils.polarToCartesian;
import renderIf from './custom_controls/renderIf';

var ActionElement = require('./custom_controls/ActionElement');
var HomeButton = require('../HomeScreen/custom_component/HomeButton');

var ExteriorDayShot = require('./scenes/ExteriorDayShot');
var LivingRoom = require('./scenes/LivingRoom');
var DiningRoom = require('./scenes/DiningRoom');
var Office = require('./scenes/Office');
var Patio = require('./scenes/Patio');
var MasterBedroom = require('./scenes/MasterBedroom');
var MasterBathroom = require('./scenes/MasterBathroom');
/**
 * Set all the image and asset references required in this scene.
 */

var RealEstate = React.createClass({
  getInitialState() {
    return {
      currentRoom: "exterior_day_shot",
      showDayImage: true,
      currentOpacity: 0.0,
      currentAnimation: "fadeOut",
      runAnimation: false,
      nextRoom: ""
    };
  },

  /**
   * Renders a scene that contains a 360 video and Video Controls.
   */
  render: function() {
    return (
        <ViroScene reticleEnabled={true}>
          <ViroOmniLight position={[0, 0, 0]} color="#ffffff"
                     attenuationStartDistance={40} attenuationEndDistance={50}
                     spotInnerAngle={0} spotOuterAngle={20} />
          {renderIf(this.state.currentRoom == "exterior_day_shot", 
            <ExteriorDayShot showDayImage={this.props.showDayImage} showNextRoom={this._showNextRoom}/>)}
          {renderIf(this.state.currentRoom == "living_room",
            <LivingRoom showDayImage={this.state.showDayImage} showNextRoom={this._showNextRoom}/>)}
          {renderIf(this.state.currentRoom == "dining_room",
            <DiningRoom showDayImage={this.state.showDayImage} showNextRoom={this._showNextRoom}/>)}
          {renderIf(this.state.currentRoom == "office", 
            <Office showDayImage={this.showDayImage} showNextRoom={this._showNextRoom}/>)}
          {renderIf(this.state.currentRoom == "patio",
            <Patio showDayImage={this.state.showDayImage} showNextRoom={this._showNextRoom}/>)}
          {renderIf(this.state.currentRoom == "master_bed_room",
            <MasterBedroom showDayImage={this.state.showDayImage} showNextRoom={this._showNextRoom}/>)}
          {renderIf(this.state.currentRoom == "master_bath_room",
            <MasterBathroom showDayImage={this.state.showDayImage} showNextRoom={this._showNextRoom}/>)}
            
          <HomeButton sceneNavigator={this.props.sceneNavigator} shouldRender={this.props.displayHomeButton} />
        </ViroScene>
    );
  },
  _showNextRoom(roomName, dayImage) {
    console.log("Main scene showNextRoom"); 
    this.setState({
      currentRoom: roomName,
      showDayImage: dayImage,
    });
  },
  _onAnimationFinish(roomName, showDayImage) {
    var runAnimation = this.state.currentAnimation == "fadeIn" ? true : false;
    this.setState({
      currentRoom: roomName,
      showDayImage: showDayImage,
      currentOpacity: 1.0,
      currentAnimation: "fadeOut",
      runAnimation: runAnimation,
    });
  },

});

ViroAnimations.registerAnimations({
  fadeOut:{properties:{opacity: 0.0}, duration: 500},
  fadeIn:{properties:{opacity: 1.0}, duration: 500},
});

ViroMaterials.createMaterials({
  opaqueWhite: {
    shininess: 2.0,
    lightingModel: "Lambert",
    diffuseColor: "#FFFFFF"
  },
  opaqueBlack: {
    shininess: 2.0,
    lightingModel: "Lambert",
    diffuseColor: "#000000"
  }
});

/**
 * Declare all custom font styles here to be reference by the
 * controls above.
 */
var styles = StyleSheet.create({
  baseTextTwo: {
    fontFamily: 'Arial',
    fontSize: 44,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

module.exports = RealEstate;
