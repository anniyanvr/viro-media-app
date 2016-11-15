/**
 * Copyright (c) 2015-present, Viro Media, Inc.
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
import { polarToCartesian } from 'polarToCartesian';
import {
  AppRegistry,
  ViroScene,
  ViroVideo,
  ViroOmniLight,
  ViroSceneNavigator,
  Materials,
  StyleSheet,
  ViroText,
  Viro360Photo,
  Viro360Video,
  ViroButton,
  ViroImage,
  ViroNode,
  ViroAnimations,
  ViroAnimatedComponent,
} from 'react-viro';

/**
 * Set all the image and asset references required in this scene.
 */
var buttonSize = 0.25;
var VIDEO_REF = "videoref";
var VideoControlRef = "VideoControlRef";

/**
 * Several references to video sources (wether it be local or on AWS) stored in an array.
 */
var videos = [
  {uri:'https://s3-us-west-2.amazonaws.com/viro/MediaDemo360_1.mp4'},
  {uri:'https://s3-us-west-2.amazonaws.com/viro/MediaDemo360_1.mp4'}
];

var Viro360Theatre = React.createClass({
  getInitialState() {
    return {
      videoControlsAnimation:"fadeIn",
      videoPaused: true,
      loopVideo: true,
      videoIndex: 0,
    }
  },

  /**
   * Renders a scene that contains a 360 video and Video Controls.
   */
  render: function() {
    return (
        <ViroScene onTap={this._onVideoTapped} reticleEnabled={this.state.videoControlsAnimation=="fadeIn"}>
          <Viro360Video ref={VIDEO_REF} source={videos[this.state.videoIndex]} volume={1.0}
            loop={this.state.loopVideo} paused={this.state.videoPaused} onFinish={this._onFinish} />
          <ViroAnimatedComponent animation={this.state.videoControlsAnimation} run={false} loop={false} ref={VideoControlRef}>
              {this._renderVideoControl()}
          </ViroAnimatedComponent>
        </ViroScene>
    );
  },

  _onVideoTapped(){
    var videoControlsAnimationState = this.state.videoControlsAnimation;
    if (videoControlsAnimationState=="fadeIn"){
      videoControlsAnimationState="fadeOut";
    } else {
      videoControlsAnimationState="fadeIn";
    }

    this.setState({
      videoControlsAnimation:videoControlsAnimationState
    });
    this.refs[VideoControlRef].startAnimation();
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
                source={require("./immg/player_controls_container.png")}/>

            <ViroButton
                position={[-buttonSize-0.1,0,-2]}
                width={buttonSize}
                height={buttonSize}
                source={require("./immg/previous.png")}
                gazeSource={require("./immg/previous_hover.png")}
                tapSource={require("./immg/previous_hover.png")}
                onTap={this._playPreviousVideo}/>

            {this._renderPlayControl()}

            <ViroButton
                position={[buttonSize+0.1, 0,-2]}
                width={buttonSize}
                height={buttonSize}
                source={require("./immg/skip.png")}
                gazeSource={require("./immg/skip_hover.png")}
                tapSource={require("./immg/skip_hover.png")}
                onTap={this._playNextVideo}/>

          <ViroButton
              position={[-0.3, -0.4 ,-2]}
              width={0.5}
              height={0.5}
              source={require("./immg/icon_2D.png")}
              gazeSource={require("./immg/icon_2D_hover.png")}
              tapSource={require("./immg/icon_2D_hover.png")}
              onTap={this._launchTheatreScene}
              />

          <ViroButton
              position={[0.3, -0.4 ,-2]}
              width={0.5}
              height={0.5}
              source={require("./immg/icon_360_hover.png")}
              gazeSource={require("./immg/icon_360_hover.png")}
              tapSource={require("./immg/icon_360_hover.png")}
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
              width={buttonSize}
              height={buttonSize}
              source={require("./immg/play.png")}
              gazeSource={require("./immg/play_hover.png")}
              tapSource={require("./immg/play_hover.png")}
              transformBehaviors={["billboard"]}
              onTap={this._togglePauseVideo}/>
      );
    } else {
      return (
          <ViroButton
              position={[0,0,-2]}
              width={buttonSize}
              height={buttonSize}
              source={require("./immg/pause.png")}
              gazeSource={require("./immg/pause_hover.png")}
              tapSource={require("./immg/pause_hover.png")}
              transformBehaviors={["billboard"]}
              onTap={this._togglePauseVideo}/>
      );
    }
  },

  _launchTheatreScene(){
    this.props.sceneNavigator.jump("ViroTheatre", {scene:require('./ViroTheatre')});
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
    }
  },

  /**
   * Play the next video by setting the videoIndex.
   */
  _playNextVideo(){
    var currentVideo = this.state.videoIndex;
    if (currentVideo + 1 < videos.length){
      this.setState({
        videoIndex: (currentVideo + 1),
        videoPaused: false
      });
    }
  },

  _onFinish() {
    console.log("The video is finished!");
  },


});

ViroAnimations.registerAnimations({
  fadeOut:{properties:{opacity: 0.0}, duration: 500},
  fadeIn:{properties:{opacity: 1.0}, duration: 500},
});

Materials.createMaterials({
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
