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
  ViroUtils,
  ViroBox,
  ViroAnimations,
  ViroAnimatedComponent,
  ViroMaterials,
  ViroNode,
  Viro3DObject,
  ViroController,
} from 'react-viro';

let polarToCartesian = ViroUtils.polarToCartesian;

var NBAWarmup = require('./NBAWarmup');
var NBARaptors = require('./NBARaptors');
var NBAJordan = require('./NBAJordan');

var leftCardPosition = polarToCartesian([4, -30, 0]);
var centerCardPosition = polarToCartesian([4, 0, 0]);
var rightCardPosition = polarToCartesian([4, 30, 0]);
var leftCardPopped = polarToCartesian([3.25, -30, 0]);
var centerCardPopped = polarToCartesian([3.25, 0, 0]);
var rightCardPopped = polarToCartesian([3.25, 30, 0]);
var HomeButton = require('../HomeScreen/custom_component/HomeButton');

var NBADemo = React.createClass({
  getInitialState() {
    return {
      leftAnimationRun: false,
      leftAnimation: "",
      centerAnimationRun: false,
      centerAnimation: "",
      rightAnimationRun: false,
      rightAnimation: "",
    };
  },
  render: function() {
    return (
      <ViroScene>
        <Viro360Image rotation={[0,90,0]} source={require("./res/NBAArena360_dark.jpg")} />

        {/* Logo/Title Image */}
        <ViroImage source={require("./res/nba_topvideos_logo.png")} position={[0, 1.2, -4]}
            transformBehaviors="billboard" scale={[2,2,1]} resizeMode="scaleToFill"/>

        {/* Left Card Group */}
        <ViroAnimatedComponent animation={this.state.leftAnimation} run={this.state.leftAnimationRun} >
          <Viro3DObject source={require('./res/viro_tile_btn.obj')} onHover={this._hoverLeft}
              position={polarToCartesian([4, -30, 0])} scale={[.3,.2,1]}
              materials="boxLeft" onClick={this._showWarmup} transformBehaviors={["billboard"]}/>
        </ViroAnimatedComponent>
        <ViroText width={3} text="Pre Game" position={polarToCartesian([4, -30, -12])}
            style={styles.categoryTextStyle} transformBehaviors={["billboard"]}/>


        {/* Middle Card Group */}
        <ViroAnimatedComponent animation={this.state.centerAnimation} run={this.state.centerAnimationRun} >
          <Viro3DObject source={require('./res/viro_tile_btn.obj')} onHover={this._hoverCenter}
              position={polarToCartesian([4, 0, 0])} scale={[.3,.2,1]}
              materials="boxCenter" onClick={this._showRaptors} transformBehaviors={["billboard"]}/>
        </ViroAnimatedComponent>
        <ViroText width={3} text="All Access" position={polarToCartesian([4, 0, -12])}
            style={styles.categoryTextStyle} transformBehaviors={["billboard"]}/>


        {/* Right Card Group */}
        <ViroAnimatedComponent animation={this.state.rightAnimation} run={this.state.rightAnimationRun}>
          <Viro3DObject source={require('./res/viro_tile_btn.obj')} onHover={this._hoverRight}
              position={polarToCartesian([4, 30, 0])} scale={[.3,.2,1]}
              materials="boxRight" onClick={this._showJordan} transformBehaviors={["billboard"]}/>
        </ViroAnimatedComponent>
        <ViroText width={3} text="Top Dunk" position={polarToCartesian([4, 30, -12])}
            style={styles.categoryTextStyle} transformBehaviors={["billboard"]}/>

        {/* Image at the bottom of the scene to cover the warping */}
        <ViroImage source={require("./res/hornet_2.png")} position={[0,-4,0]} rotation={[0,0,0]}
            scale={[3,3,3]} transformBehaviors={["billboardX"]}/>

        {/* Some scenes hide the reticle so make it visible again when coming back*/}
        <ViroController reticleVisibility={true} />
        <HomeButton sceneNavigator={this.props.sceneNavigator} shouldRender={this.props.displayHomeButton} />

      </ViroScene>
    );
  },

  /**
<ViroImage height={1} width={2} position={polarToCartesian([4, -30, 0])}
              source={require('./res/warmupcard.jpg')} onClick={this._showWarmup} transformBehaviors={["billboard"]} />


    <ViroText width={5} text="Top Videos" position={[0, 1, -4]} style={styles.titleTextStyle} transformBehaviors={["billboard"]} />

  */
  _showWarmup() {
    this.props.sceneNavigator.push({scene:NBAWarmup});
  },
  _showRaptors() {
    this.props.sceneNavigator.push({scene:NBARaptors});
  },
  _showJordan() {
    this.props.sceneNavigator.push({scene:NBAJordan});
  },
  _hoverLeft(isHovering) {
    this.setState({
        leftAnimationRun: true,
        leftAnimation: isHovering ? "leftPopUp" : "leftPopDown",
    });
  },
  _hoverCenter(isHovering) {
    this.setState({
        centerAnimationRun: true,
        centerAnimation: isHovering ? "centerPopUp" : "centerPopDown",
    });
  },
  _hoverRight(isHovering) {
    this.setState({
        rightAnimationRun: true,
        rightAnimation: isHovering ? "rightPopUp" : "rightPopDown",
    });
  },
});

ViroAnimations.registerAnimations({
  leftPopUp:{
    properties:{
        positionX:leftCardPopped[0],
        positionY:leftCardPopped[1],
        positionZ:leftCardPopped[2],
    },
    duration:200
  },
  centerPopUp:{
    properties:{
        positionX:centerCardPopped[0],
        positionY:centerCardPopped[1],
        positionZ:centerCardPopped[2],
    },
    duration:200
  },
  rightPopUp:{
    properties:{
        positionX:rightCardPopped[0],
        positionY:rightCardPopped[1],
        positionZ:rightCardPopped[2],
    },
    duration:200
  },
  leftPopDown:{
    properties:{
        positionX:leftCardPosition[0],
        positionY:leftCardPosition[1],
        positionZ:leftCardPosition[2],
    },
    duration:100
  },
  centerPopDown:{
    properties:{
        positionX:centerCardPosition[0],
        positionY:centerCardPosition[1],
        positionZ:centerCardPosition[2],
    },
    duration:100
  },
  rightPopDown:{
    properties:{
        positionX:rightCardPosition[0],
        positionY:rightCardPosition[1],
        positionZ:rightCardPosition[2],
    },
    duration:100
  },
});

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
    fontSize: 20,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
   boxLeft: {
     diffuseTexture: require('./res/warmupcard.jpg'),
   },
   boxCenter: {
     diffuseTexture: require('./res/raptorscard.jpg'),
   },
   boxRight: {
     diffuseTexture: require('./res/jordancard.jpg'),
   },
});

module.exports = NBADemo;
