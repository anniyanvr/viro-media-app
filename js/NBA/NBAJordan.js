'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroScene,
  ViroText,
  Viro360Image,
  Viro360Video,
  ViroFlexView,
  ViroImage,
  ViroAnimations,
  ViroAnimatedComponent,
  ViroVideo,
  ViroUtils,
  ViroController,
  ViroMaterials,
  ViroNode,
  ViroSphere,
  ViroButton
} from 'react-viro';

let polarToCartesian = ViroUtils.polarToCartesian;

var NBADemo = require('./NBADemo');
var HomeButton = require('../HomeScreen/custom_component/HomeButton');

var finished = false;

var VIDEO1_REF = "video1"
var VIDEO2_REF = "video2"
var VIDEO3_REF = "video3"
var VIDEO4_REF = "video4"

var positions = {
  videoPosition1 : [-1.5,.75,-4.95],
  videoPosition2 : [1.5,.75,-4.95],
  videoPosition3 : [-1.5,-.75,-4.95],
  videoPosition4 : [1.5,-.75,-4.95],
  videoPosition12 : [-1.5,.75,-4.65],
  videoPosition22 : [1.5,.75,-4.65],
  videoPosition32 : [-1.5,-.75,-4.65],
  videoPosition42 : [1.5,-.75,-4.65],
}


var NBAJordan = React.createClass({
  getInitialState() {
    return {
      visibility1: true,
      visibility2: false,
      paused1: false,
      pausedVid1: true,
      pausedVid2: true,
      pausedVid3: true,
      pausedVid4: true,
      videoAnimation1: "",
      runAnimation1: false,
      videoAnimation2: "",
      runAnimation2: false,
      videoAnimation3: "",
      runAnimation3: false,
      videoAnimation4: "",
      runAnimation4: false,
    };
  },
  /*
  TODO:
  - Having a video component would be nice (and avoids copying code around)
  */
  render: function() {
    return (
      <ViroScene>
        <Viro360Image rotation={[0,90,0]} source={require("./res/NBAArena360_dark.jpg")} />

        <ViroImage source={require("./res/card_jordan_stats.png")} position={[0, 2.15, -4.9]}
            scale={[6, 6, 6]} transformBehaviors={["billboard"]} resizeMode="scaleToFill"/>

        {/* Main Video */}
        <ViroAnimatedComponent animation={"fadeOutJordan"} run={!this.state.visibility1} onFinish={this._showOther} >
          <ViroVideo paused={this.state.paused1} opacity={1} onFinish={this._hideMain}
              source={require("./res/JordanMain.mp4")}
              width={6} height={3} position={[0, 0, -5]} scale={[1, 1, 1]} rotation={[0, 0, 0]} transformBehaviors={["billboard"]}/>
        </ViroAnimatedComponent>

        {/* Other Videos */}
        <ViroAnimatedComponent animation={"fadeInJordan"} run={this.state.visibility2} >
          <ViroNode opacity={0}>
            {/* it's ZtransformBehaviors because i dont want it to apply, wish JSX had better commenting*/}
            <ViroAnimatedComponent animation={this.state.videoAnimation1} run={this.state.runAnimation1} >
              <ViroNode position={positions.videoPosition1} ZtransformBehaviors="billboardY" onHover={this._vid1Hover} >
                <ViroVideo paused={this.state.pausedVid1} visible={this.state.visibility2} loop={true}
                    source={require("./res/Jordan1.mp4")} ref={VIDEO1_REF}
                    width={3} height={1.5}/>
                <ViroImage visible={this.state.visibility2 && this.state.pausedVid1} position={[0,0,.1]}
                    source={require("./res/play_button.png")} />
              </ViroNode>
            </ViroAnimatedComponent>

            <ViroAnimatedComponent animation={this.state.videoAnimation2} run={this.state.runAnimation2} >
              <ViroNode position={positions.videoPosition2} ZtransformBehaviors="billboardY" onHover={this._vid2Hover} >
                <ViroVideo paused={this.state.pausedVid2} visible={this.state.visibility2} loop={true}
                    source={require("./res/Jordan2.mp4")} ref={VIDEO2_REF}
                    width={3} height={1.5} />
                <ViroImage visible={this.state.visibility2 && this.state.pausedVid2} position={[0,0,.1]}
                    source={require("./res/play_button.png")} />
              </ViroNode>
            </ViroAnimatedComponent>

            <ViroAnimatedComponent animation={this.state.videoAnimation3} run={this.state.runAnimation3} >
              <ViroNode position={positions.videoPosition3} ZtransformBehaviors="billboardY" onHover={this._vid3Hover} >
                <ViroVideo paused={this.state.pausedVid3} visible={this.state.visibility2} loop={true}
                    source={require("./res/Jordan3.mp4")} ref={VIDEO3_REF}
                    width={3} height={1.5} />
                <ViroImage visible={this.state.visibility2 && this.state.pausedVid3} position={[0,0,.1]}
                    source={require("./res/play_button.png")} />
              </ViroNode>
            </ViroAnimatedComponent>

            <ViroAnimatedComponent animation={this.state.videoAnimation4} run={this.state.runAnimation4} >
              <ViroNode position={positions.videoPosition4} ZtransformBehaviors="billboardY" onHover={this._vid4Hover} >
                <ViroVideo paused={this.state.pausedVid4} visible={this.state.visibility2} loop={true}
                    source={require("./res/Jordan4.mp4")} ref={VIDEO4_REF}
                    width={3} height={1.5} />
                <ViroImage visible={this.state.visibility2 && this.state.pausedVid4} position={[0,0,.1]}
                    source={require("./res/play_button.png")} />
              </ViroNode>
            </ViroAnimatedComponent>
          </ViroNode>

        </ViroAnimatedComponent>

        <ViroButton source={require("./res/btn_home.png")} hoverSource={require("./res/btn_home_hover.png")}
            onClick={this._showNBADemo} position={[0, -3, -4]} transformBehaviors={"billboard"} />

        {/* Image at the bottom of the scene to cover the warping */}
        <ViroImage source={require("./res/hornet_2.png")} position={[0,-4,0]} rotation={[0,0,0]}
            scale={[3,3,3]} transformBehaviors={["billboardX"]}/>
        

      </ViroScene>
    );
  },
  /*
        <ViroImage source={require("./res/back_btn_nba.png")} scale={[1, 1, 1]}
            onClick={this._showNBADemo} position={[0, -3, -4]} transformBehaviors={"billboard"} />

  */
  _showNBADemo() {
    this.props.sceneNavigator.pop();
  },
  _hideMain() {
    this.setState({
      visibility1: false
    })
  },
  _showOther() {
    this.setState({
          visibility2: true,
    });
  },
  _vid1Hover(isHovering) {
    if (!isHovering) {
      this.refs[VIDEO1_REF].seekToTime(0);
    }
    this.setState({
      pausedVid1 : !isHovering,
      runAnimation1 : true, // we always want runAnimation to true, so it finishes its scaleUp/Down animations
      videoAnimation1 : isHovering ? "scaleUp1" : "scaleDown1"
      //videoAnimation1 : isHovering ? "scaleUp" : "scaleDown"
    })
  },
  _vid2Hover(isHovering) {
    if (!isHovering) {
      this.refs[VIDEO2_REF].seekToTime(0);
    }
    this.setState({
      pausedVid2 : !isHovering,
      runAnimation2 : true, // we always want runAnimation to true, so it finishes its scaleUp/Down animations
      videoAnimation2 : isHovering ? "scaleUp2" : "scaleDown2"
      //videoAnimation2 : isHovering ? "scaleUp" : "scaleDown"
    })
  },
  _vid3Hover(isHovering) {
    if (!isHovering) {
      this.refs[VIDEO3_REF].seekToTime(0);
    }
    this.setState({
      pausedVid3 : !isHovering,
      runAnimation3 : true, // we always want runAnimation to true, so it finishes its scaleUp/Down animations
      videoAnimation3 : isHovering ? "scaleUp3" : "scaleDown3"
      //videoAnimation3 : isHovering ? "scaleUp" : "scaleDown"
    })
  },
  _vid4Hover(isHovering) {
    if (!isHovering) {
      this.refs[VIDEO4_REF].seekToTime(0);
    }
    this.setState({
      pausedVid4 : !isHovering,
      runAnimation4 : true, // we always want runAnimation to true, so it finishes its scaleUp/Down animations
      videoAnimation4 : isHovering ? "scaleUp4" : "scaleDown4"
      //videoAnimation4 : isHovering ? "scaleUp" : "scaleDown"
    })
  },
});

var scaleUp = {
  properties: {
    scaleX : 1.15,
    scaleY : 1.15,
    scaleZ : 1.15,
  },
  duration : 200
};

var scaleDown = {
  properties: {
    scaleX : 1,
    scaleY : 1,
    scaleZ : 1,
  },
  duration : 100
}

for (var i = 1; i < 5; i++) {
  var downPosition = positions["videoPosition" + i];
  var upPosition = positions["videoPosition" + i + "2"];
  var newScaleUp = {}
  var newScaleDown = {}

  newScaleUp.properties = {}
  newScaleUp.properties.scaleX = scaleUp.properties.scaleX
  newScaleUp.properties.scaleY = scaleUp.properties.scaleY
  newScaleUp.properties.scaleZ = scaleUp.properties.scaleZ
  newScaleUp.duration = scaleUp.duration

  newScaleDown.properties = {}
  newScaleDown.properties.scaleX = scaleDown.properties.scaleX
  newScaleDown.properties.scaleY = scaleDown.properties.scaleY
  newScaleDown.properties.scaleZ = scaleDown.properties.scaleZ
  newScaleDown.duration = scaleDown.duration

  newScaleUp.properties.positionX = upPosition[0];
  newScaleUp.properties.positionY = upPosition[1];
  newScaleUp.properties.positionZ = upPosition[2];
  newScaleDown.properties.positionX = downPosition[0];
  newScaleDown.properties.positionY = downPosition[1];
  newScaleDown.properties.positionZ = downPosition[2];

  console.log(newScaleUp)
  console.log(newScaleDown)

  let toRegister = {}
  toRegister["scaleUp" + i] = newScaleUp;
  toRegister["scaleDown" + i] = newScaleDown;
  ViroAnimations.registerAnimations(toRegister);
}

ViroAnimations.registerAnimations({
  fadeInJordan: {
    properties: {
      opacity : 1
    },
    duration : 500
  },
  fadeOutJordan: {
    properties: {
      opacity : 0
    },
    duration : 500
  },
  // scaleUp : {
  //   properties: {
  //     scaleX : 1.15,
  //     scaleY : 1.15,
  //     scaleZ : 1.15,
  //     positionZ : "+=1"
  //   },
  //   duration : 200
  // },
  // scaleDown : {
  //   properties: {
  //     scaleX : 1,
  //     scaleY : 1,
  //     scaleZ : 1,
  //     positionZ : "-=1"
  //   },
  //   duration : 100
  // }
})

var styles = StyleSheet.create({
  titleTextStyle: {
    fontFamily: 'Arial',
    fontSize: 60,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  categoryTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = NBAJordan;
