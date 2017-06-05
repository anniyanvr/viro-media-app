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
  ViroController,
  ViroMaterials,
  ViroNode,
  ViroSphere,
  ViroUtils,
  ViroButton,
} from 'react-viro';

let polarToCartesian = ViroUtils.polarToCartesian;

var NBADemo = require('./NBADemo');
var HomeButton = require('../HomeScreen/custom_component/HomeButton');

var NBARaptors = React.createClass({
  getInitialState() {
    return {
      reticleVisible: false
    };
  },
  render: function() {
    return (
      <ViroScene onHover={this._toggleReticle}>
        <Viro360Video rotation={[0,90,0]} source={require("./res/Raptors360.mp4")} />

        {/* Hide the reticle except for a touchable area around the home button*/}
        <ViroController reticleVisibility={this.state.reticleVisible} />

        <ViroNode position={[0, -3, -4]} transformBehaviors={"billboard"} onHover={()=>{/*empty function*/}} onClick={this._showNBADemo}  >
          <ViroButton source={require("./res/btn_home.png")} hoverSource={require("./res/btn_home_hover.png")}
              onClick={this._showNBADemo} />
          {/* Squish this sphere so that it's more of a circle :p */}
          
        </ViroNode>
        

      </ViroScene>
     );
  },

  _showNBADemo() {
    this.setState({
      reticleVisible: true
    })
    this.props.sceneNavigator.pop();
  },

  // This function is set on the scene, if the scene gets the hover,
  // then hide the reticle, otherwise show it.
  _toggleReticle(isHovering) {
    this.setState({
      reticleVisible: !isHovering
    })
  }
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

module.exports = NBARaptors;
