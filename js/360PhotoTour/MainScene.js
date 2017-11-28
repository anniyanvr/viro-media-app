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

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

var OfficeTourMainScene = require('./scenes/OfficeTourMcGrawScene');
var LoadingSpinner = require('./custom_controls/LoadingSpinner');

import {
  ViroScene,
  ViroOmniLight,
  Viro360Image,
  ViroImage,
  ViroMaterials,
  ViroAnimations,
  ViroAnimatedComponent,
  ViroNode,
  ViroSpinner
} from 'react-viro';

var MAINCARD_REF = 'maincard';
var createReactClass = require('create-react-class');

var OfficeTourSplashScene = createReactClass({
  getInitialState() {
      return {
          showSceneItems:false,
          runAnimation:false,
      };
  },
  render: function() {
      return (
          <ViroScene style={styles.container} >
              <ViroOmniLight position={[0, 0, 0]} color="#ffffff"
                         direction={[0,0, -1.0]} attenuationStartDistance={40} attenuationEndDistance={50}/>
              <LoadingSpinner visible={!this.state.showSceneItems} position={[0, 0, -5]}/>

              <ViroNode visible={this.state.showSceneItems} position={this.props.position} rotation={this.props.rotation} >
                  <Viro360Image source={require('./img/westlake_towers.jpg')} onLoadEnd={this._onLoadEnd}/>
                  <ViroAnimatedComponent animation="showTitle" run={this.state.runAnimation} loop={false}>
                        <ViroImage source={require('./img/wework_title.png')} materials={["wework_title"]}
                        position={[0, 0, -5]} scale={[0.6, 1, .1]} opacity={0.0} onClick={this._onClickTourSplashScreen}/>
                  </ViroAnimatedComponent>
              </ViroNode>
          </ViroScene>
      );
  },
    _onLoadEnd(event:Event){
        if (this.state.showSceneItems != true) {
            this.setState({
                showSceneItems: true,
            });
        }
        this.setState({
                runAnimation: true,
        });
  },
  _onClickTourSplashScreen(){
     this.props.sceneNavigator.push({scene:OfficeTourMainScene, passProps:{displayHomeButton:this.props.displayHomeButton}});
  },
});
ViroMaterials.createMaterials({
    wework_title: {
        shininess: 1.0,
        lightingModel: "Lambert",
    },
});
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
ViroAnimations.registerAnimations({
    showTitle: {properties:{scaleX:2.714, scaleY:4, scaleZ:.1, opacity:1.0}, easing:"PowerDecel", duration:1000},
});
module.exports = OfficeTourSplashScene;
