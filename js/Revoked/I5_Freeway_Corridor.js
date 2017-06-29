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
var freewayCorridor360Video = require('./res/video/8_I-5_Corridor_Nature_SFX_1920.mp4');
var freewayCorridorBkgAudio = require('./res/audio/8_I-5_Corridor_APN_Radio.mp3');
var freewayCorridorSFX = require('./res/audio/8_I-5_Corridor_Freeway_SFX.mp3');
var freewayCorridorMusic = require('./res/audio/205_full_edgy-pasture_0157_loop.mp3');
var I5_Freeway_Corridor = React.createClass({
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
    }
  },
  render: function() {
    return(
    <ViroNode>
        <Viro360Video source={freewayCorridor360Video} volume={1.0} rotation={[0,50,0]} loop={true} muted={this.state.muteVideo} 
          onUpdateTime={this._onUpdateTime} onFinish={this._onVideoFinished}/>
        {renderIf(Platform.OS == 'android', 
          <ViroSpatialSound source={freewayCorridorSFX} position={[0,0,-1]} muted={false} loop={true}/>
        )}
    {renderIf(Platform.OS == 'android',
      <ViroSpatialSound source={freewayCorridorSFX} position={[0,0,2]} muted={false} loop={true}/>
    )}
    <ViroSound source={freewayCorridorBkgAudio} loop={false}/>
    <ViroSound source={freewayCorridorMusic} loop={true}/>

    {renderIf(this.state.showHotSpot, 
              <HotSpotElement backgroundHeight={1} 
                   backgroundWidth={4.5}
                   titleHeight={1.07}
                   titleWidth={3.9}
                   titleOffSetX={-0.4}
                   titleOffSetY={0.07}
                   position={[-1.5,-2,-12]}
                   disappearAtEnd={false}
                   titleVisibleDuration={2000}
                   labelOffSet={3.5}
                   source={require("./res/hotspot.png")}
                   hoverSource={require("./res/hotspot_hover.png")}
                   clickSource={require("./res/hotspot_visited.png")}
                   onClick={this._onHotSpotClicked}
                   labelBackgroundSource={require("./res/label_black.png")}
                   labelTextSource={require("./res/title_jane_and_tessa.png")} />
                
        )}
    </ViroNode>
    );
  },
  _onHotSpotClicked: function(source) {
    
    if (this.props.playNextScene) {
      this.props.playNextScene("Exterior Sanctuary");
    }

  },
  _onUpdateTime: function(current, total) {
    if (current == 1) {
        this.setState({
          showHotSpot:true,
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

module.exports = I5_Freeway_Corridor;
