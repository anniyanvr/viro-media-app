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
var sceneVideo = require('./res/video/7_AGS_Checkpoint_360_TessaJane_DIA_0626.mp4');
var music = require('./res/audio/7_AGS_Checkpoint_music_0626.mp3');
var agent_background = require('./res/audio/7_AGS_Checkpoint_Agent_DIA.mp3');
var AGS_Checkpoint = React.createClass({
  getInitialState() {
    return {
      muteVideo:false,
      showLosAngelesTitle: false,
      show7DaysEarlierTitle: false,
      showDay1Title: false,
      showHotSpot: false,
      playMusic: false,
      audioLoaded:false,
      videoLoaded:false,
    }
  },
  render: function() {
    return(
    <ViroNode>
        <Viro360Video source={sceneVideo} volume={1.0} rotation={[0,102,0]} loop={false} muted={this.state.muteVideo} 
          onUpdateTime={this._onUpdateTime} onFinish={this._onVideoFinished} onLoadEnd={this._onVideoLoaded} paused={this.state.audioLoaded && this.state.videoLoaded}/>
        <ViroSound source={music} paused={!this.state.playMusic}/>
        <ViroSound source={agent_background} paused={this.state.audioLoaded && this.state.videoLoaded} onLoadEnd={this._onAudioLoaded} />
    </ViroNode>
    );
  },
  _onAudioLoaded: function() {
    this.setState({
      audioLoaded:true,
    });
  },
  _onVideoLoaded: function() {
    this.setState({
      videoLoaded:true,
    });
  },
  _onHotSpotClicked: function(source) {
    if (this.props.onClick) {
      this.props.onClick(source);
    }
    if (this.props.playNextScene) {
      this.props.playNextScene(source);
    }

  },
  _onUpdateTime: function(current, total) {
      if (current == 1) {
        this.setState({
          showLosAngelesTitle:true,
          playMusic:true,
        });
      }
      if (current == 10) {
        this.setState({
          showLosAngelesTitle:false,
          show7DaysEarlierTitle:true,
        });
      }
      if (current == 17) {
        this.setState({
          showLosAngelesTitle:false,
          show7DaysEarlierTitle:false,
          showDay1Title:true,
        });
      }
    if (current == 24) {
        this.setState({
          showLosAngelesTitle:false,
          show7DaysEarlierTitle:false,
          showDay1Title:false,
          showHotSpot:true,
        });
      }


      
  },
  _onVideoFinished: function() {
    if (this.props.playNextScene) {
      this.props.playNextScene("I-5 Freeway Corridor");
    }
  },
});

module.exports = AGS_Checkpoint;
