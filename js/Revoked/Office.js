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
var laOverlook360Video = require('./res/video/2_Office_Scene_360-TVAudio_1920.mp4');
var Office = React.createClass({
  getInitialState() {
    return {
      muteVideo:false,
      showLosAngelesTitle: false,
      show7DaysEarlierTitle: false,
      showDay1Title: false,
      showHotSpot: false,
    }
  },
  render: function() {
    return(
    <ViroNode>
        <Viro360Video source={laOverlook360Video} volume={1.0} rotation={[0,102,0]} loop={false} muted={this.state.muteVideo} 
          onUpdateTime={this._onUpdateTime} onFinish={this._onVideoFinished}/>
        
    </ViroNode>
    );
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
      if (current == 3) {
        this.setState({
          showLosAngelesTitle:true,
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
      this.props.playNextScene("Los Angeles Overlook");
    }
  },
});

module.exports = Office;
