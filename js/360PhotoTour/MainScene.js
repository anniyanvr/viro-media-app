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
var OfficeTourMainScene = require('./scenes/OfficeTourMcGrawScene');

import {
  StyleSheet,
  ViroScene,
  ViroLight,
  Viro360Photo,
  ViroImage,
  Materials,
  ViroAnimations,
  ViroAnimatedComponent,

  ViroView,
  ViroSpinner,
  ViroText
} from 'react-viro';
var MAINCARD_REF = 'maincard';

var OfficeTourSplashScene = React.createClass({
  getInitialState() {
      return {
          showSceneItems:false,
      };
  },
  render: function() {
      return (
          <ViroScene style={styles.container} >
              <ViroLight type="omni" position={[0, 0, 0]} color="#ffffff"
                         direction={[0,0, -1.0]} attenuationStartDistance={40} attenuationEndDistance={50}
                         spotInnerAngle={0} spotOuterAngle={20} />
              <ViroView visible={!this.state.showSceneItems} position={this.props.position} rotation={this.props.rotation} scale={this.props.scale}>
                  <ViroSpinner position={[0, 0, -5]}
                               spinnerType='dark'
                               showLoadingText={true}/>
                  <ViroText position={[-0.25, -1, -5]}
                            fontFamily='HelveticaNeue-Medium'
                            transformConstraint="billboard"
                            fontSize={70}
                            color="#000000"
                            text="Loading ...."/>
              </ViroView>

              <ViroView visible={this.state.showSceneItems} position={this.props.position} rotation={this.props.rotation} scale={this.props.scale}>
                  <Viro360Photo source={require('./img/westlake_towers.jpg')} onLoadEnd={this._onLoadEnd}/>
                  <ViroAnimatedComponent animation="showTitle" runOnMount={false} loop={false} ref={MAINCARD_REF}>
                        <ViroImage material="wework_title"  position={[0, 0, -5]} scale={[.1, .1, .1]} opacity={0.0} onTap={this._onTapTourSplashScreen}/>
                  </ViroAnimatedComponent>
                  <ViroText position={[-0.75, -1.60, -5]}
                            fontFamily='HelveticaNeue-Medium'
                            transformConstraint="billboard"
                            spatialWidth={2}
                            fontSize={60}
                            color="#000000"
                            text="Click To Start"/>
              </ViroView>
          </ViroScene>
      );
  },
    _onLoadEnd(event:Event){
        console.log("DanT onLoad END for splash loading screen!"+  event.nativeEvent.success);
        if (this.state.showSceneItems != true) {
            this.setState({
                showSceneItems: true,
            });
        }
        this.refs[MAINCARD_REF].startAnimation();
    },
  _onTapTourSplashScreen(){
     this.props.sceneNavigator.push({scene:OfficeTourMainScene});
  },
});
Materials.createMaterials({
    wework_title: {
        shininess: 1.0,
        lightingModel: "Lambert",
        diffuseTexture: require('./img/wework_title.png'),
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
    showTitle: {properties:{scaleX:2, scaleY:2, scaleZ:2, opacity:1.0}, easing:"PowerDecel", duration:1000},
});
module.exports = OfficeTourSplashScene;
