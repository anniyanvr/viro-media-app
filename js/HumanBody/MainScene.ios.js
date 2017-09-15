'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  ViroOmniLight,
  ViroOrbitCamera,
  ViroScene,
  Viro3DObject,
  ViroText,
  ViroSkybox,
  ViroNode,
  Materials,
} from 'react-viro';

var HomeButton = require('../HomeScreen/custom_component/HomeButton');
var MainScene = React.createClass({
  getInitialState() {
    return {

    };
  },

  render: function() {
    return (
     <ViroScene style={styles.container}>
        <ViroSkybox source={{nx:require('./res/grid_bg.jpg'),
                             px:require('./res/grid_bg.jpg'),
                             ny:require('./res/grid_bg.jpg'),
                             py:require('./res/grid_bg.jpg'),
                             nz:require('./res/grid_bg.jpg'),
                             pz:require('./res/grid_bg.jpg')}} />
        <ViroOrbitCamera position={[0, 0, -0]} focalPoint={[0, 0, -0.5]} />
        <ViroOmniLight position={[0, 0, 0]} color="#ffffff"
          attenuationStartDistance={40} attenuationEndDistance={50} />

       <ViroNode position={[0, 0, -0.5]} >
         <Viro3DObject source={require('./res/heart.obj')}
                       materials={["heart"]} 
                       type="OBJ"/>
       </ViroNode>
       <ViroText text="Heart" position={[0.0, 0.21, -0.3]} style={styles.textStyle}
                 transformBehaviors={["billboardY"]}/>
      <HomeButton sceneNavigator={this.props.sceneNavigator} shouldRender={this.props.displayHomeButton} />
     </ViroScene>
    );
  },
});

var materials = Materials.createMaterials({
   heart: {
     lightingModel: "Blinn",
     diffuseTexture: require('./res/Heart_D3.jpg'),
     specularTexture: require('./res/Heart_S2.jpg'),
     writesToDepthBuffer: true,
     readsFromDepthBuffer: true,
   },
});

var styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 15,
    color: '#FFFFFF',
  },
});

module.exports = MainScene;
