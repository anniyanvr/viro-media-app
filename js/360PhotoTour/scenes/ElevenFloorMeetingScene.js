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

import {
    StyleSheet,
    ViroScene,
    ViroLight,
    Viro360Photo,
    ViroImageCard,
    Materials,
    ViroView,
    ViroAnimations,
    ViroAnimatedComponent,
} from 'react-viro';
var PortalElement = require('../custom_controls/PortalElement');
var ElevenFloorWaitingScene = require('../scenes/ElevenFloorWaitingScene');
var LoadingSpinner = require('../custom_controls/LoadingSpinner');
var MAINCARD_REF = 'maincard';

var ElevenFloorMeetingScene = React.createClass({
  getInitialState() {
    return {
    };
  },
  render: function() {
    return (
        <ViroScene style={styles.container} >
          <ViroLight type="omni" position={[0, 0, 0]} color="#ffffff"
                     attenuationStartDistance={40} attenuationEndDistance={50}
                     spotInnerAngle={0} spotOuterAngle={20} />
          <LoadingSpinner visible={!this.state.showSceneItems} position={[0, 0, -5]}/>
           <ViroView visible={this.state.showSceneItems} position={this.props.position} rotation={this.props.rotation} scale={this.props.scale}>
            <ViroAnimatedComponent animation="fadeIn" runOnMount={false} loop={false} ref={MAINCARD_REF}>
                <ViroView opacity={0.0} position={this.props.position} rotation={this.props.rotation} scale={this.props.scale}>
                <Viro360Photo source={require('../img/wework_11th_meeting.jpg')} onTap={this._onTapBack}  onLoadEnd={this._onLoadEnd} />
                <PortalElement  backPortal={true} iconOffset={0.67} sceneLength={0.95}
                                sceneText="Waiting Area" position={[0,0,5]} jumpToScene={ElevenFloorWaitingScene} sceneNavigator={this.props.sceneNavigator}/>
                </ViroView>
            </ViroAnimatedComponent>
           </ViroView>
        </ViroScene>
    );
  }, _onLoadEnd(){
        if (this.state.showSceneItems != true) {
            console.log("DanT setting show scene items to true");
            this.setState({
                showSceneItems: true,
            });
            this.refs[MAINCARD_REF].startAnimation();
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
