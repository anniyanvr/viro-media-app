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
var ActionElement = require('../custom_controls/ActionElement');
/**
 * Set all the image and asset references required in this scene.
 */

var dayImage = require('../img/MasterBedroom_Day.jpg');
var dayVideo = require('../img/AFWX1575.m4v');

var MasterBathroom = React.createClass({
  propTypes: {
    showNextRoom: React.PropTypes.func,
    showDayImage: React.PropTypes.bool,
  },
  getInitialState() {
    return {
      videoPaused: true,
    }
  },

  /**
   * Renders a scene that contains a 360 video and Video Controls.
   */
  render: function() {
    return (
      <ViroNode >
          <ViroAnimatedComponent animation="fadeIn" run={true} loop={false}>
              <ViroNode opacity={0.0}>
                  <Viro360Video source={dayVideo} paused={this.state.videoPaused} loop={false} volume={0.0} rotation={[0,-70,0]}/>
                  <PortalElement  backPortal={true}  iconOffset={1.75} roomTitleLength={1} scale={[.8,.8,1]} roomTitleText="Master Bedroom"
                                  position={polarToCartesian([-10, 58, 0])} jumpToRoom="master_bed_room" showDayImage={this.props.showDayImage} onClick={this.props.showNextRoom}/>
                  {renderIf(this.state.videoPaused == true,
                  <ActionElement  backPortal={true}  iconOffset={2.25} titleLength={1.25} scale={[.8,.8,1]} titleText="Close Window Shades"
                                  position={polarToCartesian([-10, 170, 0])} onClick={this._closeWindows}/>)}
              </ViroNode>
          </ViroAnimatedComponent>
      </ViroNode>
  );
  },
  _closeWindows() {
    this.setState({
        videoPaused:false,
    });

  }
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

module.exports = MasterBathroom;
