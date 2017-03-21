/**
 * Copyright (c) 2015-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict';

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

var ElevenFloorScene = require('../scenes/ElevenFloorWaitingScene');
var InfoElement = require('../custom_controls/InfoElement')
var PortalElement = require('../custom_controls/PortalElement');
var LoadingSpinner = require('../custom_controls/LoadingSpinner');

import {
  ViroScene,
  ViroOmniLight,
  Viro360Image,
  ViroImage,
  ViroMaterials,
  ViroAnimations,
  ViroAnimatedComponent,
  ViroNode,
  ViroSpinner,
  ViroText,
  ViroUtils
} from 'react-viro';

let polarToCartesian = ViroUtils.polarToCartesian;

var OfficeTourMcGrawScene = React.createClass({
  getInitialState() {
    return {
        showSceneItems:false,
        showSplashScreen:true,
        sceneOne: ElevenFloorScene,
        iconsTut:0,
        runMainCardAnimation: false,
        runTutorialAnimation: false,
    };
  },
  render: function() {
      console.log("rendering _renderMainScreen screen");
      return (
          <ViroScene style={styles.container} >
              <ViroOmniLight position={[0, 0, 0]} color="#ffffff"
                         direction={[0,0, -1.0]} attenuationStartDistance={40} attenuationEndDistance={50}
                         spotInnerAngle={0} spotOuterAngle={20} />

              <LoadingSpinner visible={!this.state.showSceneItems} position={[0, 0, -5]}/>
              <ViroNode visible={this.state.showSceneItems} position={this.props.position} rotation={this.props.rotation} scale={this.props.scale}>
                  <ViroAnimatedComponent animation="fadeIn" run={this.state.runMainCardAnimation} loop={false} onFinish={this._onIconsAppear}>
                      <ViroNode opacity={0.0} position={this.props.position} rotation={this.props.rotation} scale={this.props.scale}>
                        <Viro360Image source={require('../img/westlake_towers.jpg')} onLoadEnd={this._onLoadEnd}/>
                        <InfoElement imgSource={require('../img/infocard_slut.png')} windowContent="infocard_slut" position={polarToCartesian([-5, 0, 0])} cardScale={[3.67,4,1]}/>
                        <InfoElement imgSource={require('../img/infocard_monorail.png')} windowContent="infocard_monorail" position={polarToCartesian([-5, 77, -10])} cardScale={[3.67,4,1]}/>
                        <InfoElement imgSource={require('../img/infocard_statue.png')} windowContent="infocard_statue" position={polarToCartesian([-5, 277, 0])} cardScale={[4,3.95,2]}/>
                        <PortalElement
                            sceneLength={1.08}
                            iconOffset ={0.72}
                            sceneText="WeWork Office"
                            position={polarToCartesian([-5.5, 93, -3])}
                            jumpToScene={ElevenFloorScene}
                            sceneNavigator={this.props.sceneNavigator}/>
                      </ViroNode>
                  </ViroAnimatedComponent>
              </ViroNode>
          </ViroScene>
      );
  },
    _onLoadEnd(){
        if (this.state.showSceneItems != true) {
            this.setState({
                showSceneItems: true,
                runMainCardAnimation: true,
            });
        }
    },
    _onIconsAppear(){
        var iconAppearedNum = this.state.iconsTut;
        if (iconAppearedNum < 3) {
            iconAppearedNum = iconAppearedNum + 1;

            this.setState({
                iconsTut: iconAppearedNum,
                runTutorialAnimation: true,
            });
        }
    },
    _onVisibilityToggle(){
        this.setState({
            showSceneItems: !this.state.showSceneItems,
        });
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

ViroMaterials.createMaterials({
    infocard_monorail:{
        shininess : 1.0,
        lightingModel: "Lambert",
    },
    infocard_statue:{
        shininess : 1.0,
        lightingModel: "Lambert",
    },
    infocard_slut:{
        shininess : 1.0,
        lightingModel: "Lambert",
    },
    intro_arrow:{
        shininess : 1.0,
        lightingModel: "Lambert",
    },
});

ViroAnimations.registerAnimations({
    testLoopRotate:{properties:{rotateY:"+45"}, duration:500},
    fadeIn:{properties:{opacity: 1.0}, duration: 1000},


});
module.exports = OfficeTourMcGrawScene;
