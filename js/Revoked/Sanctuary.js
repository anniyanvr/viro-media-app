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
  ViroUtils,
  ViroImage,
  ViroAnimations,
  ViroAnimatedComponent,
} from 'react-viro';

import renderIf from './custom_controls/renderIf';
let polarToCartesian = ViroUtils.polarToCartesian;

var Label = require('./custom_controls/LabelElement');
var HotSpotElement = require('./custom_controls/HotSpotElement');
var HotSpotButton = require('./custom_controls/HotSpotButton');

var sanctuaryOpening = require('./res/video/11_Sanctuary_1_Opening_JT_DIA.mp4');
var sanctuaryLoop = require('./res/video/11_Sanctuary_Loop.mp4');
var sanctuaryBedfort = require('./res/video/11_Sanctuary_2_Bedfort.mp4');
var sanctuarySanctuary = require('./res/video/11_Sanctuary_3_Sanctuary.mp4');

var bkgMusic = require('./res/audio/282_full_blossoming_0181_loop.mp3');
var Sanctuary = React.createClass({
  propTypes: {
    playNextScene: React.PropTypes.func,
  },
  getInitialState() {
    return {
      openingVideoPlaying:false,
      loopVideoPlaying:true,
      bedfortVideoPlaying:false,
      sanctuaryVideoPlaying:false,
      teddyBearFront:false,
      teddyBearVisited:false,
      bibleVisited:false,
      bedfortVisited:false,
      sanctuaryVisited:false,
      runAnimation1:false,
      runAnimation2:false,
      teddyBearFrontAnimation: "",
      teddyBearBackAnimation: "",
      teddyBearAnimationDelay: 800,
      bibleAnimation: "",
      runBibleAnimation: false,
      hotspotsClicked:0,

    }
  },
  render: function() {
    var teddyBearHotSpotBkgSource = this.state.teddyBearVisited ? require('./res/hotspot_visited.png') : require('./res/hotspot.png');
    var bibleHotSpotBkgSource = this.state.bibleVisited ? require('./res/hotspot_visited.png') : require('./res/hotspot.png');
    var bedfortHotSpotBkgSource = this.state.bedfortVisited ? require('./res/hotspot_visited.png') : require('./res/hotspot.png');
    var sanctuaryHotSpotBkgSource = this.state.sanctuaryVisited ? require('./res/hotspot_visited.png') : require('./res/hotspot.png');
    var lightsHotSpotBkgSource = this.state.sanctuaryVisited ? require('./res/hotspot_visited.png') : require('./res/hotspot.png');
    return(
    <ViroNode>
        {renderIf(this.state.openingVideoPlaying,
          <Viro360Video source={sanctuaryOpening} rotation={[0,90,0]} volume={1.0} loop={false} 
          onUpdateTime={this._onUpdateTime} onFinish={this._onVideoFinished}/>)}
        {renderIf(this.state.loopVideoPlaying,
          <Viro360Video source={sanctuaryLoop} rotation={[0,90,0]} volume={1.0} loop={true} 
          onUpdateTime={this._onUpdateTime} onFinish={this._onVideoFinished}/>)}
        {renderIf(this.state.bedfortVideoPlaying,
          <Viro360Video source={sanctuaryBedfort} rotation={[0,90,0]} volume={1.0} loop={false} 
          onUpdateTime={this._onUpdateTime} onFinish={this._onVideoFinished}/>)}
        {renderIf(this.state.sanctuaryVideoPlaying,
          <Viro360Video source={sanctuarySanctuary} rotation={[0,90,0]} volume={1.0} loop={false} 
          onUpdateTime={this._onUpdateTime} onFinish={this._onVideoFinished}/>)}

    <ViroSound source={bkgMusic} loop={true}/>
    
    {renderIf(this.state.loopVideoPlaying, 
              <HotSpotButton source={teddyBearHotSpotBkgSource}
           hoverSource={require("./res/hotspot_hover.png")}
           clickSource={require("./res/hotspot_visited.png")}
                    position={polarToCartesian([24, 4, 3])}
                    heartBeatInterval={5000}
                    transformBehaviors={["billboard"]}
                   onClick={this._onTeddyBearClicked}/>
    )}
    {renderIf(this.state.loopVideoPlaying, 
          <HotSpotButton source={bibleHotSpotBkgSource}
           hoverSource={require("./res/hotspot_hover.png")}
           clickSource={require("./res/hotspot_visited.png")}
                    position={polarToCartesian([24, 12, 3])}
                    heartBeatInterval={5000}
                    transformBehaviors={["billboard"]}
                   onClick={this._onBibleClicked}/>
    )}
    {renderIf(this.state.loopVideoPlaying, 
          <HotSpotButton source={bedfortHotSpotBkgSource}
           hoverSource={require("./res/hotspot_hover.png")}
           clickSource={require("./res/hotspot_visited.png")}
                    position={polarToCartesian([24, -40, 8])}
                    heartBeatInterval={5000}
                    transformBehaviors={["billboard"]}
                   onClick={this._onBedfortClicked}/>
  )}
  {renderIf(this.state.loopVideoPlaying, 
          <HotSpotButton source={sanctuaryHotSpotBkgSource}
           hoverSource={require("./res/hotspot_hover.png")}
           clickSource={require("./res/hotspot_visited.png")}
                    position={polarToCartesian([24, 50, 8])}
                    heartBeatInterval={5000}
                    transformBehaviors={["billboard"]}
                   onClick={this._onSanctuaryClicked}/>
  )}
  {renderIf(this.state.hotspotsClicked == 3,
          <HotSpotButton source={require('./res/hotspot.png')}
           hoverSource={require("./res/hotspot_hover.png")}
           clickSource={require("./res/hotspot_visited.png")}
                    position={polarToCartesian([24, 50, 8])}
                    heartBeatInterval={5000}
                    transformBehaviors={["billboard"]}
                   onClick={this._onLightsClicked}/>
   )}
        <ViroAnimatedComponent animation={this.state.teddyBearFrontAnimation} run={this.state.runAnimation1} onFinish={this._onTeddyBearFrontLoaded}>
          <ViroImage source={require('./res/Teddy_front.png')} position={[1.5,0,-7]}
              opacity={1} scale={[0, 0, 0]} onClick={this._closeCard1} transformBehaviors={["billboard"]} onHover={()=>{}}
              width = {1} height={1.5} />
        </ViroAnimatedComponent>
        <ViroAnimatedComponent animation={this.state.teddyBearBackAnimation} run={this.state.runAnimation2} delay={this.state.teddyBearAnimationDelay} onFinish={this._onTeddyBearBackLoaded}>
          <ViroImage source={require('./res/Teddy_back.png')} position={[1.5,0,-7]}
              opacity={0} scale={[8,8,0]} onClick={this._onTeddyBearBackClicked} transformBehaviors={["billboard"]} onHover={()=>{}}
              width = {1} height={1.5} loop={true}/>
        </ViroAnimatedComponent>
        <ViroAnimatedComponent animation={this.state.bibleAnimation} run={this.state.runBibleAnimation} onFinish={this._onBibleLoaded}>
          <ViroImage source={require('./res/Bible_1_cover.png')} position={[1.5,0,-7]}
              opacity={1} scale={[0, 0, 0]} onClick={this._onBibleLoadedClick} transformBehaviors={["billboard"]} onHover={()=>{}}
               />
        </ViroAnimatedComponent>
    </ViroNode>
    );
  },
  _onTeddyBearClicked:function(source) {
    var hotspotNumber = this.state.hotspotsClicked + 1;
    this.setState({
      teddyBearFront:true,
      teddyBearVisited:true,
      runAnimation1:true,
      teddyBearFrontAnimation: "cardScaleUp1",
      hotspotsClicked: hotspotNumber,
    });
  },
  _onTeddyBearFrontLoaded:function(source) {
    this.setState({
      teddyBearFront:false,
      runAnimation2:true,
      teddyBearFrontAnimation: "fadeOutText",
      teddyBearBackAnimation: "fadeInText",
    });
  },
  _onTeddyBearBackLoaded:function(source) {
    if (this.state.teddyBearFrontAnimation == "fadeOutText" && this.state.runAnimation1) {
      this.setState({
        runAnimation1:false,
        runAnimation2:false,
      });      
    }
    if (this.state.teddyBearBackAnimation == "fadeOutText") {
      this.setState({
        runAnimation2:false,
      });      
    }
  },
  _onTeddyBearBackClicked:function(source) {
    var hotspotNumber = this.state.hotspotsClicked + 1;

    this.setState({
      teddyBearFront:false,
      runAnimation2:true,
      teddyBearBackAnimation: "fadeOutText",
      teddyBearAnimationDelay: 0,
      hotspotsClicked: hotspotNumber,
    });
  },
  _onBibleClicked: function(source) {
    this.setState({
      bibleVisited:true,
      bibleAnimation: "cardScaleUp1",
      runBibleAnimation: true,
      hotspotsClicked:hotspotNumber,
    });
  },
  _onBibleLoadedClick: function(source) {
    this.setState({
      bibleAnimation: "fadeOutText",
    });
  },
  _onBibleLoaded: function(source) {
    if (this.state.runBibleAnimation == "fadeOutText") {
      this.setState({
        runBibleAnimation: false,
      });
    }
  },
  _onBedfortClicked: function(source) {
    var hotspotNumber = this.state.hotspotsClicked + 1;

    this.setState({
      bedfortVisited:true,
      openingVideoPlaying:false,
      loopVideoPlaying:false,
      bedfortVideoPlaying:true,
      sanctuaryVideoPlaying:false,
      hotspotsClicked:hotspotNumber,
    });
  },
  _onSanctuaryClicked: function(source) {
        var hotspotNumber = this.state.hotspotsClicked + 1;

  this.setState({
      sanctuaryVisited:true,
      openingVideoPlaying:false,
      loopVideoPlaying:false,
      bedfortVideoPlaying:false,
      sanctuaryVideoPlaying:true,
      hotspotsClicked:hotspotNumber
         });
  },
  _onLightsClicked:function(source) {
        if (this.props.playNextScene) {
      this.props.playNextScene("I-5 Freeway Corridor");
    }
  },
  _onUpdateTime: function(current, total) {
    if (this.state.openingVideoPlaying && current == 20) {
        this.setState({
          openingVideoPlaying:false,
          loopVideoPlaying:true,
        });
    }
    if (this.state.bedfortVideoPlaying && current == 77) {
    this.setState({
      bedfortVideoPlaying:false,
      loopVideoPlaying:true,
      });
    }
    if (this.state.sanctuaryVideoPlaying && current == 55) {
    this.setState({
      sanctuaryVideoPlaying:false,
      loopVideoPlaying:true,
      });
    }

  },

  _onVideoFinished: function() {
    if (this.state.bedfortVideoPlaying) {
      this.setState({
      loopVideoPlaying:true,
      bedfortVideoPlaying:false,
    });
    }
    if (this.state.sanctuaryVideoPlaying) {
      this.setState({
      loopVideoPlaying:true,
      sanctuaryVideoPlaying:false,
    });
    }

  },
});

ViroAnimations.registerAnimations({
  warmUpFadeOut:{properties:{opacity: 0}, delay:5000, duration:1000},
  
  cardScaleUp1:{properties:{scaleX:8, scaleY:8, scaleZ:0}, easing:"Bounce", duration:800},
  cardScaleDown1:{properties:{scaleX:0, scaleY:0, scaleZ:0}, duration:500},

  cardScaleUp2:{properties:{scaleX:3, scaleY:3, scaleZ:1}, easing:"Bounce", duration:800},
  cardScaleDown2:{properties:{scaleX:0, scaleY:0, scaleZ:0}, duration:500},

  fadeInText: {
    properties: {
      opacity : 1
    },
    duration : 500
  },
  fadeOutText: {
    properties: {
      opacity : 0
    },
    duration : 200
  },
});
module.exports = Sanctuary;
