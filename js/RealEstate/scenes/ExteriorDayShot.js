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

var dayImage = require('../img/ExteriorRoadDayShot.jpg')

var ExteriorDayShot = React.createClass({
  propTypes: {
    showNextRoom: React.PropTypes.func,
    showDayImage: React.PropTypes.bool,
  },
  getInitialState() {
    return {
      runAnimation: false,
      hideStereoImage:true,
    }
  },

  /**
   * Renders a scene that contains a 360 video and Video Controls.
   */
  render: function() {
    return (
      <ViroNode >
          <Viro360Image source={dayImage} rotation={[0,-90,0]} onLoadEnd={this._onLoadEnd}/>
          <PortalElement  backPortal={true}  iconOffset={1.75} roomTitleLength={1.15} scale={[.8,.8,1]} roomTitleText="1200 Morrow St #A"
                          position={polarToCartesian([-10, -5, 0])} jumpToRoom="living_room" showDayImage={this.props.showDayImage} onClick={this.props.showNextRoom}/>
      </ViroNode>
  );
  },
  _onLoadEnd(event:Event){
        this.setState({
                runAnimation: true,
        });
  },
  _onClickTourSplashScreen(){
     this.setState({
                hideStereoImage: false,
        });
  },
});

ViroAnimations.registerAnimations({
  fadeOut:{properties:{opacity: 0.0}, duration: 500},
  fadeIn:{properties:{opacity: 1.0}, duration: 500},
  showTitle: {properties:{scaleX:1.5, scaleY:1.5, scaleZ:.1, opacity:1.0}, easing:"PowerDecel", duration:1000}
});

ViroMaterials.createMaterials({
  opaqueWhite: {
    shininess: 2.0,
    lightingModel: "Lambert",
    diffuseColor: "#FFFFFF"
  },
  icon_scene: {
        shininess : 1.0,
        lightingModel: "Lambert",
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

module.exports = ExteriorDayShot;
