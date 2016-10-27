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
import { polarToCartesian } from 'polarToCartesian';


var ElevenFloorWaitingScene = require('../scenes/ElevenFloorWaitingScene');
var ElevenFloorCommonEastScene = require('../scenes/ElevenFloorCommonEastScene');
var ElevenFloorCommonSouthScene = require('../scenes/ElevenFloorCommonSouthScene');
var BackElement = require('../custom_controls/BackElement');
var InfoElement = require('../custom_controls/InfoElement');
var PortalElement = require('../custom_controls/PortalElement');
var LoadingSpinner = require('../custom_controls/LoadingSpinner');

import {
    StyleSheet,
    ViroScene,
    ViroOmniLight,
    Viro360Photo,
    ViroImage,
    Materials,
    ViroText,
    ViroNode,
    ViroAnimations,
    ViroAnimatedComponent,
} from 'react-viro';
var MAINCARD_REF = 'maincard';

var ElevenFloorCommonScene = React.createClass({
  getInitialState() {
    return {
        showSceneItems:false,
    };
  },
  render: function() {
    return (
        <ViroScene style={styles.container} >
          <ViroOmniLight position={[0, 0, 0]} color="#ffffff"
                      attenuationStartDistance={40} attenuationEndDistance={50}
                     spotInnerAngle={0} spotOuterAngle={20} />

            <LoadingSpinner visible={!this.state.showSceneItems} position={[0, 0, 5]}/>


            <ViroNode visible={this.state.showSceneItems} position={this.props.position} rotation={this.props.rotation} scale={this.props.scale}>
                <ViroAnimatedComponent animation="fadeIn" runOnMount={false} loop={false} ref={MAINCARD_REF}>
                    <ViroNode opacity={0.0} position={this.props.position} rotation={this.props.rotation} scale={this.props.scale}>


                        <Viro360Photo source={require('../img/wework_11th_commons.jpg')} onLoadEnd={this._onLoadEnd}  />
                        <InfoElement windowContent="infocard_receptionist" cardScale={[3.65,4,1]} position={polarToCartesian([-5, 10, 10])} />
                        <InfoElement windowContent="infocard_kitchen" cardScale={[3.65,4,1]} position={polarToCartesian([-5, -100, 0])}/>

                        <PortalElement transformBehaviors={["billboard"]} backPortal={true} iconOffset={0.67} sceneLength={0.95} sceneText="Waiting Area"
                                       position={polarToCartesian([-5, -40, 0])} jumpToScene={ElevenFloorWaitingScene} sceneNavigator={this.props.sceneNavigator}/>

                        <PortalElement transformBehaviors={["billboard"]} iconOffset={0.57} sceneLength={0.78} sceneText="South Side"
                                       position={polarToCartesian([-5, 190, 0])} jumpToScene={ElevenFloorCommonSouthScene} sceneNavigator={this.props.sceneNavigator}/>

                        <PortalElement transformBehaviors={["billboard"]}  sceneLength={0.7} sceneText="East Side"
                                       position={polarToCartesian([-5, 50, 0])} jumpToScene={ElevenFloorCommonEastScene} sceneNavigator={this.props.sceneNavigator}/>
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
            });
            this.refs[MAINCARD_REF].startAnimation();
        }
    },
});

Materials.createMaterials({

    infocard_receptionist:{
        shininess : 1.0,
        lightingModel: "Lambert",
        diffuseTexture: require('../img/infocard_receptionist.png'),
    },
    infocard_kitchen:{
        shininess : 1.0,
        lightingModel: "Lambert",
        diffuseTexture: require('../img/infocard_kitchen.png'),
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
