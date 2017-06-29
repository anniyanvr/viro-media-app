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
  ViroImage,
  ViroMaterials,
  ViroAmbientLight,
  Viro3DObject,
} from 'react-viro';

import renderIf from './custom_controls/renderIf';
let polarToCartesian = ViroUtils.polarToCartesian;
var Label = require('./custom_controls/LabelElement');
var HotSpotElement = require('./custom_controls/HotSpotElement');
var HotSpotButton = require('./custom_controls/HotSpotButton');
var scene360Video = {uri:"https://dtvtrcn42ef1b.cloudfront.net/4_Janes_Apartment/3840x1920/4_Janes_Apartment_Scene_360-Audio_1920.mp4'};
var scene360Video_looping = require('./res/video/4_Janes_Apartment_Intro_360-Loop_1440.mp4');
var newsClipVideo = require('./res/video/APN_LINE2B.mp4');
var joeAudio = require('./res/audio/Temp_Joe_01.mp3');
var Janes_Apartment = React.createClass({
  getInitialState() {
  	return {
  		muteVideo:false,
      showTV:false,
      playAudio:false,
      clickedHotSpots:0,
      pauseVideo:false,
      showLoopingVideo:true,
      pauseTV:true,
      showPhotos:false,
      tvVisited:false,
      photosVisited:false,
      voicemailVisited:false,
      doorVisited:false,
  	}
  },
  render: function() {
    var tvHotSpotBkgSource = this.state.tvVisited ? require('./res/hotspot_visited.png') : require('./res/hotspot.png');
    var photosHotSpotBkgSource = this.state.photosVisited ? require('./res/hotspot_visited.png') : require('./res/hotspot.png');
    var voicemailHotSpotBkgSource = this.state.voicemailVisited ? require('./res/hotspot_visited.png') : require('./res/hotspot.png');
    var doorHotSpotBkgSource = this.state.doorVisited ? require('./res/hotspot_visited.png') : require('./res/hotspot.png');
  	return(
  	<ViroNode>
    <ViroAmbientLight color="#aaaaaa" />
    {renderIf(this.state.showLoopingVideo, 
      <Viro360Video source={scene360Video_looping} volume={1.0} rotation={[0,102,0]} loop={true} muted={this.state.muteVideo} 
          onUpdateTime={this._onUpdateTime} paused={this.state.pauseVideo}/>)}
    {/*TV*/}
    {renderIf(this.state.showLoopingVideo,
      <HotSpotButton source={tvHotSpotBkgSource}
           hoverSource={require("./res/hotspot_hover.png")}
           clickSource={require("./res/hotspot_visited.png")}
                    position={polarToCartesian([24, -77, -5])}
                    heartBeatInterval={5000}
                    transformBehaviors={["billboard"]}
                    onClick={this._onTVHotSpotClicked}/>)}
    {renderIf(this.state.showTV,
      <ViroVideo source={require("./res/video/APN_LINE2B.mp4")} position={polarToCartesian([20, -77, 3])}
              transformBehaviors={["billboard"]}
              loop={true} paused={this.state.pauseTV} height={15} width={26.67} onClick={this._onTVClicked}/>)}
    {/*Photos*/}
    {renderIf(this.state.showLoopingVideo,
        <HotSpotButton source={photosHotSpotBkgSource}
           hoverSource={require("./res/hotspot_hover.png")}
           clickSource={require("./res/hotspot_visited.png")}
                    position={polarToCartesian([24, -60, 20])}
                    heartBeatInterval={5000}
                    transformBehaviors={["billboard"]}
                    onClick={this._onPhotosClicked}/>)}
    {renderIf(this.state.showPhotos,
      <ViroNode position={polarToCartesian([14, -60, 20])} transformBehaviors={["billboardY"]}>
          <ViroImage position={[-12, 0, 0]} source={require("./res/janes_apt_photo_1.jpg")} scale={[10, 10, 10]}
              onClick={this._onPhotosClicked} transformBehaviors={["billboardY"]}/>
          <ViroImage position={[0, 0, -5]} source={require("./res/janes_apt_photo_2.jpg")} scale={[10, 10, 10]}
              onClick={this._onPhotosClicked} transformBehaviors={["billboardY"]} />
          <ViroImage position={[12.0, 0, 0]} source={require("./res/janes_apt_photo_3.jpg")} scale={[10, 10, 10]}
              onClick={this._onPhotosClicked} transformBehaviors={["billboardY"]} />
          <ViroImage position={[-12, -12, 0]} source={require("./res/janes_apt_photo_4.jpg")} scale={[10, 10, 10]}
              onClick={this._onPhotosClicked} transformBehaviors={["billboardY"]}/>
          <ViroImage position={[0, -12, -5]} source={require("./res/janes_apt_photo_5.jpg")} scale={[10, 10, 10]}
              onClick={this._onPhotosClicked} transformBehaviors={["billboardY"]} />
          <ViroImage position={[12.0, -12, 0]} source={require("./res/janes_apt_photo_6.jpg")} scale={[10, 10, 10]}
              onClick={this._onPhotosClicked} transformBehaviors={["billboardY"]} />

      </ViroNode>)}
    {/*Voicemail*/}
    {renderIf(this.state.showLoopingVideo,
      <HotSpotButton source={voicemailHotSpotBkgSource}
           hoverSource={require("./res/hotspot_hover.png")}
           clickSource={require("./res/hotspot_visited.png")}
                    position={polarToCartesian([24, -98, -9])}
                    heartBeatInterval={5000}
                    transformBehaviors={["billboard"]}
                    onClick={this._onVoiceMailClicked}/>)}
    {renderIf(this.state.playAudio,
          <ViroSound source={joeAudio} loop={false} onFinish={this._onAudioFinished} /> )}
    {renderIf(this.state.playAudio,
          <Viro3DObject source={require("./res/phone_vm.obj")} highAccuracyGaze={true}
                    position={polarToCartesian([20, -98, 0])} scale={[1, 1, 1]} materials={["phone"]}
                    transformBehaviors={["billboard"]} onClick={this.onPhoneClicked} />)}
    {/*Door*/}
    {renderIf(this.state.tvVisited && this.state.photosVisited 
      && this.state.voicemailVisited && 
      this.state.showLoopingVideo && !this.state.doorVisited,
      <HotSpotButton source={doorHotSpotBkgSource}
           hoverSource={require("./res/hotspot_hover.png")}
           clickSource={require("./res/hotspot_visited.png")}
                    position={polarToCartesian([24, 7, 8])}
                    heartBeatInterval={5000}
                    transformBehaviors={["billboard"]}
                    onClick={this._onDoorClicked}/>)}
    {renderIf(!this.state.showLoopingVideo,
      <Viro360Video source={scene360Video} volume={1.0} rotation={[0,102,0]} loop={false} 
          onUpdateTime={this._onUpdateTime} onFinish={this._onVideoFinished} paused={this.state.pauseVideo}/>)}
  	</ViroNode>
  	);
  },
  _onHotSpotClicked: function() {
    

  },
  _onTVHotSpotClicked: function() {
    this.setState({
          showTV:true,
          pauseVideo:true,
          pauseTV:false,
          tvVisited:true,
        });
  },
  _onTVClicked: function() {
    this.setState({
          showTV:false,
          pauseVideo:false,
          pauseTV:true,
    });
  },
  _onTVFinished: function() {
    this.setState({
      showTV:false,
      pauseVideo:false,
      pauseTV:true,
    })
  },
  _onVoiceMailClicked: function() {
this.setState({
      playAudio:true,
      pauseVideo:true,
      voicemailVisited:true,
    });
  },
  _onAudioFinished:function() {
  this.setState({
      playAudio:false,
      pauseVideo:false,
    });
  },
  _onPhotosClicked: function() {
    var showingPhotos = this.state.showPhotos;
    this.setState({
      showPhotos: showingPhotos ? false : true,
      pauseVideo: showingPhotos ? false : true,
      photosVisited:true,
    })

  },
  _onDoorClicked: function() {
    this.setState({
      showLoopingVideo:false,
    })
  },
  _onUpdateTime: function(current, total) {


  		
  },
  _onPhoneClicked: function() {
    this.setState({
      playAudio:false,
      pauseVideo:false,
    });
  },
  _onVideoFinished: function() {
 
    if (this.props.playNextScene) {
      this.props.playNextScene("I-5 Freeway");
    }
  },
});

var materials = ViroMaterials.createMaterials({
  phone: {
    lightingModel: "Blinn",
    diffuseTexture: require('./res/phone_diffuse.png'),
    specularTexture: require('./res/phone_specular.png')
  }
});
module.exports = Janes_Apartment;
