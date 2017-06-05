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
  ViroCamera,
  Viro360Video,
  ViroSound,
  ViroSpatialSound,
  ViroUtils,
  ViroVideo,
} from 'react-viro';

import renderIf from './custom_controls/renderIf';
let polarToCartesian = ViroUtils.polarToCartesian;
var Label = require('./custom_controls/LabelElement');
var HotSpotElement = require('./custom_controls/HotSpotElement');
var HotSpotButton = require('./custom_controls/HotSpotButton');
var janesApartment360Video = {uri:"https://dtvtrcn42ef1b.cloudfront.net/4_Janes_Apartment/3840x1920/4_Janes_Apartment_Scene_360-Audio_1920.mp4"};
var newsClipVideo = {uri:"https://dtvtrcn42ef1b.cloudfront.net/4_Janes_Apartment/3840x1920/APN_LINE2B.mp4"};
var joeAudio = {uri:"https://dtvtrcn42ef1b.cloudfront.net/4_Janes_Apartment/3840x1920/Temp_Joe_01.mp3"};
var Janes_Apartment = React.createClass({
  getInitialState() {
  	return {
  		muteVideo:false,
      showTV:false,
      playAudio:false,
      clickedHotSpots:0,
      pauseVideo:false

  	}
  },
  render: function() {
  	return(
  	<ViroNode>
  	    <Viro360Video source={janesApartment360Video} volume={1.0} rotation={[0,102,0]} loop={false} muted={this.state.muteVideo} 
  	    	onUpdateTime={this._onUpdateTime} onFinish={this._onVideoFinished} paused={this.state.pauseVideo}/>
        {/*TV*/}
        <HotSpotButton source={require("./res/hotspot.png")}
           hoverSource={require("./res/hotspot_hover.png")}
           clickSource={require("./res/hotspot_visited.png")}
                    position={polarToCartesian([24, -77, 3])}
                    heartBeatInterval={5000}
                    transformBehaviors={["billboard"]}
                    onClick={this._onTVClicked}/>
        {/*Voicemail*/}
        <HotSpotButton source={require("./res/hotspot.png")}
           hoverSource={require("./res/hotspot_hover.png")}
           clickSource={require("./res/hotspot_visited.png")}
                    position={polarToCartesian([24, -98, -9])}
                    heartBeatInterval={5000}
                    transformBehaviors={["billboard"]}
                    onClick={this._onVoiceMailClicked}/>
        {/*Photos*/}
        <HotSpotButton source={require("./res/hotspot.png")}
           hoverSource={require("./res/hotspot_hover.png")}
           clickSource={require("./res/hotspot_visited.png")}
                    position={polarToCartesian([24, -60, 20])}
                    heartBeatInterval={5000}
                    transformBehaviors={["billboard"]}
                    onClick={this._onPhotosClicked}/>
        {/*Door*/}
        <HotSpotButton source={require("./res/hotspot.png")}
           hoverSource={require("./res/hotspot_hover.png")}
           clickSource={require("./res/hotspot_visited.png")}
                    position={polarToCartesian([24, 7, 8])}
                    heartBeatInterval={5000}
                    transformBehaviors={["billboard"]}
                    onClick={this._onDoorClicked}/>
        
        {renderIf(this.state.playAudio,
          <ViroSound
            source={joeAudio}
            loop={false}
            
            onFinish={this._onAudioFinished}
         />
        )}
  	</ViroNode>
  	);
  },
  _onHotSpotClicked: function() {
    

  },
  _onTVClicked: function() {
this.setState({
      showTV:true,
      pauseVideo:true,
    });
  },
  _onTVFinished: function() {
    this.setState({
      showTV:false,
      pauseVideo:false,
    })
  },
  _onVoiceMailClicked: function() {
this.setState({
      playAudio:true,
      pauseVideo:true,
    });
  },
  _onAudioFinished:function() {
  this.setState({
      playAudio:false,
      pauseVideo:false,
    });
  },
  _onPhotosClicked: function() {

  },
  _onDoorClicked: function() {

  },
  _onUpdateTime: function(current, total) {


  		
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

module.exports = Janes_Apartment;
