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
  ViroSound
} from 'react-viro';

let polarToCartesian = ViroUtils.polarToCartesian;
import renderIf from '../custom_controls/renderIf';
var PortalElement = require('../custom_controls/PortalElement');
var InfoElement = require('../custom_controls/InfoElement');

/**
 * Set all the image and asset references required in this scene.
 */

var dayImage = require('../img/LivingRoom_Day.jpg')
var nightImage = require('../img/LivingRoom_Night.jpg')

var LivingRoom = React.createClass({
  propTypes: {
    showNextRoom: React.PropTypes.func,
    showDayImage: React.PropTypes.bool,
  },
  getInitialState() {
    return {
      
    }
  },

  /**
   * Renders a scene that contains a 360 video and Video Controls.
   */
  render: function() {
    var imageSrc = this.props.showDayImage == true ? dayImage : nightImage;
    return (
      <ViroNode >
          <ViroAnimatedComponent animation="fadeIn" run={true} loop={false}>
              <ViroNode opacity={0.0}>
                  <Viro360Image source={dayImage} rotation={[0,-60,0]}/>
                  <PortalElement  backPortal={true}  iconOffset={1.75} roomTitleLength={1} scale={[.8,.8,1]} roomTitleText="Dining Room"
                                  position={polarToCartesian([-10, 28, 0])} jumpToRoom="dining_room" showDayImage={this.props.showDayImage} onClick={this.props.showNextRoom}/>
                  <PortalElement  backPortal={true}  iconOffset={1.75} roomTitleLength={1} scale={[.8,.8,1]} roomTitleText="Step outside"
                                  position={polarToCartesian([-10, -158, 0])} jumpToRoom="exterior_day_shot" showDayImage={this.props.showDayImage} onClick={this.props.showNextRoom}/>
                  <InfoElement backgroundSource={require('../img/realestate_card_carport.png')} imgSource={require('../img/carport_stereoscopic.jpg')} windowContent="realestate_card" cardScale={[3.65,4,1]} windowText="Car Port Parking" position={polarToCartesian([-10, -125, 0])}/>
              </ViroNode>
          </ViroAnimatedComponent>
      </ViroNode>
  );
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

module.exports = LivingRoom;
