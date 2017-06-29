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
import {StyleSheet, Platform} from 'react-native';

import {
  ViroNode,
  Viro360Video,
  ViroSound,
  ViroSpatialSound,
} from 'react-viro';

import renderIf from './custom_controls/renderIf';

var Label = require('./custom_controls/LabelElement');
var HotSpotElement = require('./custom_controls/HotSpotElement');
var extSanctuary360VideoStart = require('./res/video/10_Ext_Sanctuary_360_start.mp4');
var extSanctuary360VideoLoop = require('./res/video/10_Ext_Sanctuary_360_loop.mp4');
var jacobmp3 = require('./res/audio/10_Ext_Sanctuary_loop_Jacob.mp3');
var freewayCorridorMusic = require('./res/audio/205_full_edgy-pasture_0157_loop.mp3');
var ExtSanctuary = React.createClass({
  propTypes: {
    playNextScene: React.PropTypes.func,
  },
  getInitialState() {
    return {
      muteVideo:false,
      showLosAngelesTitle: false,
      show7DaysEarlierTitle: false,
      showDay1Title: false,
      showHotSpot: false,
      startVideoPlaying:true,
      playAudio:false,
    }
  },
  render: function() {
    return(
    <ViroNode>
        {renderIf(this.state.startVideoPlaying,
          <Viro360Video source={extSanctuary360VideoStart} rotation={[0,90,0]} volume={1.0} loop={false} 
          onUpdateTime={this._onUpdateTime} onFinish={this._onVideoFinished}/>)}
        {renderIf(!this.state.startVideoPlaying,
          <Viro360Video source={extSanctuary360VideoLoop} rotation={[0,90,0]} volume={1.0} loop={true} 
          onUpdateTime={this._onUpdateTime} onFinish={this._onVideoFinished}/>)}
        {renderIf(this.state.playAudio,
          <ViroSound source={jacobmp3} loop={false} onFinish={this._onAudioFinished}/>)}
    <ViroSound source={freewayCorridorMusic} loop={true}/>

    {renderIf(!this.state.startVideoPlaying && !this.state.playAudio, 
              <HotSpotElement backgroundHeight={1} 
                   backgroundWidth={4.5}
                   titleHeight={1.07}
                   titleWidth={3.9}
                   titleOffSetX={-0.4}
                   titleOffSetY={0.07}
                   position={[-0.7,-1,-12]}
                   disappearAtEnd={false}
                   titleVisibleDuration={2000}
                   labelOffSet={3.5}
                   source={require("./res/hotspot.png")}
                   hoverSource={require("./res/hotspot_hover.png")}
                   clickSource={require("./res/hotspot_visited.png")}
                   onClick={this._onHotSpotClicked}
                   labelBackgroundSource={require("./res/label_black.png")}
                   labelTextSource={require("./res/title_enter_sanctuary.png")} />
        )}
    </ViroNode>
    );
  },
  _onHotSpotClicked: function(source) {
    this.setState({
      playAudio:true,
    });
  },
  _onAudioFinished: function(source) {
    if (this.props.playNextScene) {
      this.props.playNextScene("Sanctuary");
    }
  },
  _onUpdateTime: function(current, total) {
    if (this.state.startVideoPlaying && current == 15) {
        this.setState({
          startVideoPlaying:false,
        });
      }      
  },
  _onVideoFinished: function() {
    var isMuted = this.state.muteVideo;
    if (!isMuted) {
      this.setState({
        muteVideo:true
      });
    }
  },
});

module.exports = ExtSanctuary;
