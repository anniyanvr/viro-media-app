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
import {StyleSheet} from 'react-native';

import {
  AppRegistry,
  ViroScene,
  ViroVideo,
  ViroOmniLight,
  ViroSceneNavigator,
  ViroMaterials,
  ViroText,
  Viro360Image,
  Viro360Video,
  ViroButton,
  ViroImage,
  ViroNode,
  ViroAnimations,
  ViroAnimatedComponent,
  ViroUtils,
  ViroSound
} from 'react-viro';

let polarToCartesian = ViroUtils.polarToCartesian;
import renderIf from './custom_controls/renderIf';
var HomeButton = require('../HomeScreen/custom_component/HomeButton');
var HotSpotButton = require('./custom_controls/HotSpotButton');
var Label = require('./custom_controls/LabelElement')
/**
 * Set all the image and asset references required in this scene.
 */
var buttonSize = 0.25;
var VideoControlRef = "VideoControlRef";
var interrogationRoom360Video = {uri:"https://dtvtrcn42ef1b.cloudfront.net/1_Interrogation_Room/1_Interrogation_Room_360Clip_JaneVO_v3.mp4"};
var interrogationRoomCriesAudio = {uri:"https://dtvtrcn42ef1b.cloudfront.net/1_Interrogation_Room/1_Interrogation_Room_cries_BKG_Music.mp3"};
var InterrogationRoom = require('./InterrogationRoom');
var LA_Overlook = require('./LA_Overlook');
var Janes_Apartment = require('./Janes_Apartment');
var Viro360Theatre = React.createClass({
  getInitialState() {
    return {
      videoControlsAnimation:"fadeOut",
      videoPaused: false,
      loopVideo: true,
      videoIndex: 0,
      runAnimation: false,
      muteVideo: false,
      showTitle: false,
      showSubtitle: false,
      showStartButton: false,
    }
  },

  /**
   * Renders a scene that contains a 360 video and Video Controls.
   */
  render: function() {
    return (
        <ViroScene onClick={this._onVideoTapped} reticleEnabled={this.state.videoControlsAnimation=="fadeIn"}>
          {renderIf(this.state.videoIndex == 0, 
            <InterrogationRoom playNextScene={this._nextFilmScene}/>)}
          {renderIf(this.state.videoIndex == 1,
            <LA_Overlook playNextScene={this._nextFilmScene}/>)}
          {renderIf(this.state.videoIndex == 2,
            <Janes_Apartment playNextScene={this._nextFilmScene}/>)}
          <HomeButton sceneNavigator={this.props.sceneNavigator} shouldRender={this.props.displayHomeButton} />

        </ViroScene>
    );
  },
  _nextFilmScene() {
    var currentVideo = this.state.videoIndex;
    this.setState({
      videoIndex: (currentVideo + 1)
    });
  },
  _onUpdateTime(current, total) {
  	if (current == 1) {
  		this.setState({
  			showTitle: true,
  		});
  	}
  	if (current == 4) {
  		this.setState({
  			showSubtitle: true,
  		});
  	}
  	if (current == 21) {
  		this.setState({
  			showStartButton: true,
  		})
  	}
  },
  _onVideoTapped(){
    var videoControlsAnimationState = this.state.videoControlsAnimation;
    if (videoControlsAnimationState=="fadeIn"){
      videoControlsAnimationState="fadeOut";
    } else {
      videoControlsAnimationState="fadeIn";
    }

    this.setState({
      videoControlsAnimation:videoControlsAnimationState,
      runAnimation: true,
    });
  },
  /**
   * Render a set of Video UI Controls. This includes (in the order displayed from left to right):
   * Restart, Previous Video, Play/Pause, Next Video, Volume.
   */
  _renderVideoControl(){
    return(
        <ViroNode position={[0,-0.8,0]} opacity={1.0}>
            <ViroImage
                scale={[1.4, 1.2, 1]}
                position={[0, -0.27,-2.1]}
                source={require("./res/player_controls_container.png")}/>

            <ViroButton
                position={[-buttonSize-0.1,0,-2]}
                scale={[1, 1, 1]}
                width={buttonSize}
                height={buttonSize}
                source={require("./res/previous.png")}
                hoverSource={require("./res/previous_hover.png")}
                clickSource={require("./res/previous_hover.png")}
                onClick={this._playPreviousVideo}/>

            {this._renderPlayControl()}

            <ViroButton
                position={[buttonSize+0.1, 0,-2]}
                scale={[1, 1, 1]}
                width={buttonSize}
                height={buttonSize}
                source={require("./res/skip.png")}
                hoverSource={require("./res/skip_hover.png")}
                clickSource={require("./res/skip_hover.png")}
                onClick={this._playNextVideo}/>

          <ViroButton
              position={[-0.3, -0.4 ,-2]}
              scale={[1, 1, 1]}
              width={0.5}
              height={0.5}
              source={require("./res/icon_2D.png")}
              hoverSource={require("./res/icon_2D_hover.png")}
              clickSource={require("./res/icon_2D_hover.png")}
              />

          <ViroButton
              position={[0.3, -0.4 ,-2]}
              scale={[1, 1, 1]}
              width={0.5}
              height={0.5}
              source={require("./res/icon_360_hover.png")}
              hoverSource={require("./res/icon_360_hover.png")}
              clickSource={require("./res/icon_360_hover.png")}
              />
        </ViroNode>
    );
  },

  /**
   * Renders either the play or pause icon depending on video state.
   */
  _renderPlayControl(){
    if (this.state.videoPaused){
      return (
          <ViroButton
              position={[0,0,-2]}
              scale={[1, 1, 1]}
              width={buttonSize}
              height={buttonSize}
              source={require("./res/play.png")}
              hoverSource={require("./res/play_hover.png")}
              clickSource={require("./res/play_hover.png")}
              transformBehaviors={["billboard"]}
              onClick={this._togglePauseVideo}/>
      );
    } else {
      return (
          <ViroButton
              position={[0,0,-2]}
              scale={[1, 1, 1]}
              width={buttonSize}
              height={buttonSize}
              source={require("./res/pause.png")}
              hoverSource={require("./res/pause_hover.png")}
              clickSource={require("./res/pause_hover.png")}
              transformBehaviors={["billboard"]}
              onClick={this._togglePauseVideo}/>
      );
    }
  },

  _togglePauseVideo() {
    this.setState({
      videoPaused: !this.state.videoPaused,
    })
  },

  /**
   * Play the previous video by setting the videoIndex.
   */
  _playPreviousVideo(){
    var currentVideo = this.state.videoIndex;
    if (currentVideo - 1 > -1){
      this.setState({
        videoIndex: (currentVideo - 1),
        videoPaused: false
      });
    } else {
      this.setState({
        videoPaused: false
      });
    }
  },

  /**
   * Play the next video by setting the videoIndex.
   */
  _playNextVideo(){
    var currentVideo = this.state.videoIndex;
  },

  _onFinish() {
    console.log("The video is finished!");
    var isMuted = this.state.muteVideo;
    if (!isMuted) {
    	this.setState({
    		muteVideo:true
    	});
    }
  },


});

ViroAnimations.registerAnimations({
  fadeOut:{properties:{opacity: 0.0}, duration: 500},
  fadeIn:{properties:{opacity: 1.0}, duration: 500},
});

ViroMaterials.createMaterials({
  opaqueWhite: {
    shininess: 2.0,
    lightingModel: "Lambert",
    diffuseColor: "#FFFFFF"
  },
});

/**
 * Declare all custom font styles here to be reference by the
 * controls above.
 */
var styles = StyleSheet.create({
  baseTextTwo: {
    fontFamily: 'Arial',
    fontSize: 44,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

module.exports = Viro360Theatre;
