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

import {
    ViroScene,
    ViroOmniLight,
    Viro360Image,
    ViroMaterials,
    ViroNode,
    ViroAnimations,
    ViroAnimatedComponent,
} from 'react-viro';

var PortalElement = require('../custom_controls/PortalElement');
var LoadingSpinner = require('../custom_controls/LoadingSpinner');

var ElevenFloorMeetingScene = React.createClass({
  getInitialState() {
    return {
      runAnimation:false,
    };
  },
  render: function() {
    var ElevenFloorWaitingScene = require('../scenes/ElevenFloorWaitingScene');
    return (
        <ViroScene style={styles.container} onTap={this._onTapBack}>
          <ViroOmniLight position={[0, 0, 0]} color="#ffffff"
                     attenuationStartDistance={40} attenuationEndDistance={50}
                     spotInnerAngle={0} spotOuterAngle={20} />
          <LoadingSpinner visible={!this.state.showSceneItems} position={[0, 0, -5]}/>
           <ViroNode visible={this.state.showSceneItems} position={this.props.position} rotation={this.props.rotation} scale={this.props.scale}>
            <ViroAnimatedComponent animation="fadeIn" run={this.state.runAnimation} loop={false}>
                <ViroNode opacity={0.0} position={this.props.position} rotation={this.props.rotation} scale={this.props.scale}>
                <Viro360Image source={require('../img/wework_11th_meeting.jpg')} onLoadEnd={this._onLoadEnd} />
                <PortalElement  backPortal={true} iconOffset={1.98} sceneLength={0.95}
                                sceneText="   Waiting Area" position={[0,0,10]} jumpToScene={{scene:ElevenFloorWaitingScene}} sceneNavigator={this.props.sceneNavigator}/>

                </ViroNode>
            </ViroAnimatedComponent>
           </ViroNode>
        </ViroScene>
    );
  }, _onLoadEnd(){
        if (this.state.showSceneItems != true) {
            this.setState({
                showSceneItems: true,
                runAnimation:true,
            });
        }
    },
  _onTapBack() {
    this.props.sceneNavigator.pop();
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = ElevenFloorMeetingScene;
