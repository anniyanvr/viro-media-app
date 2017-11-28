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

var ElevenFloorCommonEastScene = require('../scenes/ElevenFloorCommonEastScene');
var ElevenFloorCommonSouthScene = require('../scenes/ElevenFloorCommonSouthScene');
var BackElement = require('../custom_controls/BackElement');
var InfoElement = require('../custom_controls/InfoElement');
var PortalElement = require('../custom_controls/PortalElement');
var LoadingSpinner = require('../custom_controls/LoadingSpinner');
var createReactClass = require('create-react-class');
import {
    ViroScene,
    ViroOmniLight,
    Viro360Image,
    ViroImage,
    ViroMaterials,
    ViroText,
    ViroNode,
    ViroAnimations,
    ViroAnimatedComponent,
    ViroUtils,
} from 'react-viro';
let polarToCartesian = ViroUtils.polarToCartesian;

var MAINCARD_REF = 'maincard';

var ElevenFloorCommonScene = createReactClass({
  getInitialState() {
    return {
        showSceneItems:false,
        runAnimation:false,
    };
  },
  render: function() {
    var ElevenFloorWaitingScene = require('../scenes/ElevenFloorWaitingScene');
    return (
        <ViroScene style={styles.container} >
          <ViroOmniLight position={[0, 0, 0]} color="#ffffff"
                      attenuationStartDistance={40} attenuationEndDistance={50}
                     spotInnerAngle={0} spotOuterAngle={20} />

            <LoadingSpinner visible={!this.state.showSceneItems} position={[0, 0, 5]}/>


            <ViroNode visible={this.state.showSceneItems} position={this.props.position} rotation={this.props.rotation} scale={this.props.scale}>
                <ViroAnimatedComponent animation="fadeIn" run={this.state.runAnimation} loop={false}>
                    <ViroNode opacity={0.0} position={this.props.position} rotation={this.props.rotation} scale={this.props.scale}>


                        <Viro360Image source={require('../img/wework_11th_commons.jpg')} onLoadEnd={this._onLoadEnd}  />
                        <InfoElement imgSource={require('../img/infocard_receptionist.png')} windowContent="infocard_receptionist" cardScale={[3.65,4,1]} position={polarToCartesian([-10, 10, 10])} />
                        <InfoElement imgSource={require('../img/infocard_kitchen.png')} windowContent="infocard_kitchen" cardScale={[3.65,4,1]} position={polarToCartesian([-10, -100, 0])}/>

                        <PortalElement iconOffset={1.65} sceneLength={0.95} scale={[.8, .8, 1]} sceneText="Waiting Area" transformBehaviors={["billboard"]} backPortal={true}
                                       position={polarToCartesian([-10, -40, 0])} jumpToScene={{scene:ElevenFloorWaitingScene}} sceneNavigator={this.props.sceneNavigator}/>

                        <PortalElement  iconOffset={1.45} sceneLength={0.78} scale={[.8, .8, 1]} sceneText="South Side" transformBehaviors={["billboard"]} 
                                       position={polarToCartesian([-10, 190, 0])} jumpToScene={{scene:ElevenFloorCommonSouthScene}} sceneNavigator={this.props.sceneNavigator}/>

                        <PortalElement iconOffset={1.41} sceneLength={0.7} scale={[.8, .8, 1]} sceneText="East Side" transformBehaviors={["billboard"]}
                                       position={polarToCartesian([-10, 50, 0])} jumpToScene={{scene:ElevenFloorCommonEastScene}} sceneNavigator={this.props.sceneNavigator}/>

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
                runAnimation: true,
            });
        }
    },
});

ViroMaterials.createMaterials({

    infocard_receptionist:{
        shininess : 1.0,
        lightingModel: "Lambert",
    },
    infocard_kitchen:{
        shininess : 1.0,
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

module.exports = ElevenFloorCommonScene;
