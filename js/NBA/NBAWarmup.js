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
  ViroUtils,
  ViroController,
  ViroMaterials,
  ViroNode,
  ViroSphere,
  ViroButton,
  ViroVideo,
} from 'react-viro';

let polarToCartesian = ViroUtils.polarToCartesian;

var NBADemo = require('./NBADemo');
var HomeButton = require('../HomeScreen/custom_component/HomeButton');

var NBAWarmup = React.createClass({
  getInitialState() {
    return {
      runFadeAnimation: true,
      pause360Video: false,
      pauseCurryDribble: true,
      runAnimation1: false,
      animationName1: "",
      runAnimation2: false,
      animationName2: "",
      reticleVisible: true,
      textAnimation1: "",
      runTextAnimation1: false,
      textAnimation2: "",
      runTextAnimation2: false,
    };
  },
  render: function() {
    return (
      <ViroScene onHover={this._toggleReticle} onClick={this._closeAllCards} >
        <Viro360Video rotation={[0,90,0]} loop={true} source={require("./res/Warmup360.mp4")}
            paused={this.state.pause360Video}/>

        {/* Fading Banner */}
        <ViroAnimatedComponent animation='warmUpFadeOut' run={this.state.runFadeAnimation} >
          <ViroImage height={2.5} width={6} source={require('./res/card_stephencurry.png')}
              position={[-.5, 3.8, -8]} transformBehaviors="billboard" />
        </ViroAnimatedComponent>

        {/* Interaction Dot #1 */}
        <ViroNode position={[1.5,0,-8]} transformBehaviors={"billboard"} onHover={this._showText1} onClick={this._openCard1} >
          <ViroImage source={require("./res/poi_dot.png")} scale={[1.5, 1.5, 1.5]}
              onClick={this._openCard1} />
          <ViroSphere position={[0, 0, -.1]} radius={1.5} materials="clear" scale={[1, 1, .01]} />

          <ViroAnimatedComponent animation={this.state.textAnimation1} run={this.state.runTextAnimation1} >
            <ViroText text="Watch Curry in Action" position={[0, -.8, 0]} style={styles.categoryTextStyle}
                width={4} opacity={0} transformBehaviors={["billboard"]} />
          </ViroAnimatedComponent>
        </ViroNode>


        {/* Interaction Video #1 */}
        <ViroAnimatedComponent animation={this.state.animationName1} run={this.state.runAnimation1}>
          <ViroVideo source={require("./res/curry_dribble.mp4")} position={[1.5,0,-7]}
              scale={[0, 0, 0]} onClick={this._closeCard1} transformBehaviors={["billboard"]} onHover={()=>{}}
              loop={true} paused={this.state.pauseCurryDribble} />
        </ViroAnimatedComponent>


        {/* Interaction Dot #2 */}
        <ViroNode position={polarToCartesian([-8, -90, 0])} transformBehaviors={"billboard"}
            onHover={this._showText2} >
          <ViroImage source={require("./res/poi_dot.png")} scale={[1.5, 1.5, 1.5]}
              onClick={this._openCard2} transformBehaviors={["billboard"]}/>
          <ViroSphere position={[0, 0, -.1]} radius={1.5} materials="clear" scale={[1, 1, .019]} />

          <ViroAnimatedComponent animation={this.state.textAnimation2} run={this.state.runTextAnimation2} >
            <ViroText text="Zaza's Stats" position={[0, -.8, 0]} style={styles.categoryTextStyle}
                width={4} opacity={0} transformBehaviors={["billboard"]} />
          </ViroAnimatedComponent>
        </ViroNode>


        {/* Interaction Card #2 */}
        <ViroAnimatedComponent animation={this.state.animationName2} run={this.state.runAnimation2}>
          <ViroImage source={require("./res/zazacard.jpg")} position={polarToCartesian([-7.5, -90, 0])}
              scale={[0, 0, 0]} onClick={this._closeCard2} transformBehaviors={["billboard"]} onHover={()=>{}} />
        </ViroAnimatedComponent>


        {/* Hide the reticle except for a touchable area around the home button*/}
        <ViroController reticleVisibility={this.state.reticleVisible} />

        <ViroNode position={[0, -3, -4]} transformBehaviors={"billboard"} onHover={()=>{/*empty function*/}} >
          <ViroButton source={require("./res/btn_home.png")} hoverSource={require("./res/btn_home_hover.png")}
              onClick={this._showNBADemo} />
          {/* Squish this sphere so that it's more of a circle :p */}
          
        </ViroNode>
      </ViroScene>
    );
  },

  _closeAllCards() {
    this._closeCard1();
    this._closeCard2();
  },
  _showNBADemo() {
    this.setState({
      reticleVisible: true
    })
    this.props.sceneNavigator.pop();
  },

  _showText1(isHovering) {
    this.setState({
      runTextAnimation1 : true,
      textAnimation1 : isHovering ? "fadeInText" : "fadeOutText",
    })
  },

  _showText2(isHovering) {
    this.setState({
      runTextAnimation2 : true,
      textAnimation2 : isHovering ? "fadeInText" : "fadeOutText",
    })
  },

  _openCard1() {
    this.setState({
        runAnimation1: true,
        animationName1: "cardScaleUp1",
        pause360Video: true,
        pauseCurryDribble: false,
        runFadeAnimation: false,
    });
  },

  _closeCard1() {
    this.setState({
        runAnimation1: true,
        animationName1: "cardScaleDown1",
        pause360Video: false,
        pauseCurryDribble: true,
        runFadeAnimation: true,
    });
  },

  _openCard2() {
    this.setState({
        runAnimation2: true,
        animationName2: "cardScaleUp2",
    });
  },

  _closeCard2() {
    this.setState({
        runAnimation2: true,
        animationName2: "cardScaleDown2",
    });
  },

  // This function is set on the scene, if the scene gets the hover,
  // then hide the reticle, otherwise show it.
  _toggleReticle(isHovering) {
    this.setState({
      reticleVisible: true
    })
  },
});

ViroAnimations.registerAnimations({
  warmUpFadeOut:{properties:{opacity: 0}, delay:5000, duration:1000},
  
  cardScaleUp1:{properties:{scaleX:8, scaleY:5, scaleZ:1}, easing:"Bounce", duration:800},
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

var styles = StyleSheet.create({
  titleTextStyle: {
    fontFamily: 'Arial',
    fontSize: 40,
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

ViroMaterials.createMaterials({
  "clear" : {
    diffuseColor : "#00000000"
  }
});

module.exports = NBAWarmup;
