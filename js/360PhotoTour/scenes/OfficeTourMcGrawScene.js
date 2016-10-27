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

var ElevenFloorScene = require('../scenes/ElevenFloorWaitingScene');
var InfoElement = require('../custom_controls/InfoElement')
var PortalElement = require('../custom_controls/PortalElement');
var LoadingSpinner = require('../custom_controls/LoadingSpinner');

import {
  StyleSheet,
  ViroScene,
  ViroOmniLight,
  Viro360Photo,
  ViroImage,
  Materials,
  ViroAnimations,
  ViroAnimatedComponent,
  ViroNode,
  ViroSpinner,
  ViroText
} from 'react-viro';
var MAINCARD_REF = 'maincard';
var TUT_REF ='tutorialAnimation';
var OfficeTourMcGrawScene = React.createClass({
  getInitialState() {
    return {
        showSceneItems:false,
        showSplashScreen:true,
        sceneOne: ElevenFloorScene,
        iconsTut:0,
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
                  <ViroAnimatedComponent animation="fadeIn" runOnMount={false} loop={false} ref={MAINCARD_REF} onFinish={this._onIconsAppear}>
                      <ViroNode opacity={0.0} position={this.props.position} rotation={this.props.rotation} scale={this.props.scale}>
                          <ViroAnimatedComponent animation="fadeArrowChain" runOnMount={false} loop={false} ref={TUT_REF} onFinish={this._onIconsAppear}>
                          <ViroNode opacity={0.0} position={this.props.position} rotation={this.props.rotation} scale={this.props.scale}>
                             <ViroImage
                                  transformBehaviors={["billboard"]}
                                  position={polarToCartesian([-5, 35, 0])}
                                  rotation={[0,0,180]}
                                  scale={[0.5, 0.5, 0.5]}
                                  materials={["intro_arrow"]} />
                              <ViroImage
                                  transformBehaviors={["billboard"]}
                                  position={polarToCartesian([-5, -35, 0])}
                                  rotation={[0,0,0]}
                                  scale={[0.5, 0.5, 0.5]}
                                  materials={["intro_arrow"]} />
                              <ViroImage
                                  transformBehaviors={["billboard"]}
                                  position={polarToCartesian([-5, 0, 40])}
                                  rotation={[0,0,90]}
                                  scale={[0.5, 0.5, 0.5]}
                                  materials={["intro_arrow"]} />
                              <ViroImage
                                  transformBehaviors={["billboard"]}
                                  position={polarToCartesian([-5, 0, -40])}
                                  rotation={[0,0,-90]}
                                  scale={[0.5, 0.5, 0.5]}
                                  materials={["intro_arrow"]} />
                            </ViroNode>
                            </ViroAnimatedComponent>
                        <Viro360Photo source={require('../img/westlake_towers.jpg')} onLoadEnd={this._onLoadEnd}/>
                        <InfoElement windowContent="infocard_slut" position={polarToCartesian([-5, 0, 0])} cardScale={[3.67,4,1]}/>
                        <InfoElement windowContent="infocard_monorail" position={polarToCartesian([-5, 77, -10])} cardScale={[3.67,4,1]}/>
                        <InfoElement windowContent="infocard_statue" position={polarToCartesian([-5, 277, 0])} cardScale={[4,3.95,2]}/>
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
            });
            this.refs[MAINCARD_REF].startAnimation();
        }
    },
    _onIconsAppear(){
        var iconAppearedNum = this.state.iconsTut;
        if (iconAppearedNum < 3) {
            iconAppearedNum = iconAppearedNum + 1;

            this.refs[TUT_REF].startAnimation();
            this.setState({
                iconsTut: iconAppearedNum,
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

Materials.createMaterials({
    infocard_monorail:{
        shininess : 1.0,
        lightingModel: "Lambert",
        diffuseTexture: require('../img/infocard_monorail.png'),
    },
    infocard_statue:{
        shininess : 1.0,
        lightingModel: "Lambert",
        diffuseTexture: require('../img/infocard_statue.png'),
    },
    infocard_slut:{
        shininess : 1.0,
        lightingModel: "Lambert",
        diffuseTexture: require('../img/infocard_slut.png'),
    },
    intro_arrow:{
        shininess : 1.0,
        lightingModel: "Lambert",
        diffuseTexture: require('../img/intro_arrow.png'),
    },
});

ViroAnimations.registerAnimations({
    testLoopRotate:{properties:{rotateY:"+45"}, duration:500},
    fadeIn:{properties:{opacity: 1.0}, duration: 1000},
    fadeArrowAppear:{properties:{opacity: 1.0}, duration: 400},
    fadeArrowGone:{properties:{opacity: 0.0}, duration: 400},
    fadeArrowChain:[["fadeArrowAppear","fadeArrowGone"]],


});
module.exports = OfficeTourMcGrawScene;
