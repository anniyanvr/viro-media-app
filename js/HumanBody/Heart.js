'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  AppRegistry,
  ViroOmniLight,
  ViroDirectionalLight,
  ViroSpotLight,
  ViroOrbitCamera,
  ViroAmbientLight,
  ViroScene,
  Viro3DObject,
  ViroText,
  ViroSkybox,
  ViroNode,
  ViroImage,
  ViroSceneNavigator,
  ViroMaterials,
  ViroAnimations,
  ViroAnimatedComponent,
  Viro360Image,
} from 'react-viro';

var createReactClass = require('create-react-class');

var left = "left";
var right = "right";

var HeartScene = createReactClass({
  getInitialState() {
    return {

    };
  },

  render: function() {
    var scaleBy = 7;
    return (
     <ViroScene style={styles.container}>
        <Viro360Image source={require("./res/heart_bg.jpg")} />
        <ViroDirectionalLight direction={[0, 0, -1]} color="#ffffff" />
        <ViroOrbitCamera position={[0, 0, 0]} focalPoint={[0, 0, -5.15]} active={true}/>
        <ViroAmbientLight color="#aaaaaa" />

          <Viro3DObject source={require('./res/heart.obj')}
                        position={[0.5, -1.0, -5.25]}
                       materials={["heart"]}  scale={[7,7,7]}
                       type="OBJ"/>
      {this._getLabel([-0.039*scaleBy, 0.115*scaleBy, -0.779*scaleBy], "superior_vena_cava", require('./res/label_superior_vena_cava.png'), left, 1.9*scaleBy, 1.5*scaleBy)}
      {this._getLabel([ 0.085*scaleBy, 0.155*scaleBy, -0.738*scaleBy], "left_common_carotid", require('./res/label_left_common_carotid.png'), left, 2.5*scaleBy, 1.5*scaleBy)}
      {this._getLabel([ 0.143*scaleBy, 0.070*scaleBy, -0.741*scaleBy], "aorta", require('./res/label_aorta.png'), right, 1.7*scaleBy, 1*scaleBy)}
      {this._getLabel([ 0.195*scaleBy, -0.010*scaleBy, -0.676*scaleBy], "left_pulmonary", require('./res/label_left_pulmonary.png'), right, 1.5*scaleBy, 1*scaleBy)}
      {this._getLabel([ 0.113*scaleBy, -0.130*scaleBy, -0.590*scaleBy], "left_atrium", require('./res/label_right_atrium.png'),right, 1.25*scaleBy, 1*scaleBy)}
      {this._getLabel([-0.060*scaleBy, -0.220*scaleBy, -0.612*scaleBy], "right_atrium", require('./res/label_right_atrium.png'), left, 1.3*scaleBy, 1*scaleBy)}
      {this._getLabel([ 0.018*scaleBy, -0.291*scaleBy, -0.554*scaleBy], "right_ventricle", require('./res/label_right_ventricle.png'), left, 1.5*scaleBy, 1*scaleBy)}
      
     </ViroScene>
    );
  },

  _getLabel(position, material, img, side, widthScale, heightScale) {
    let views = [];

    var labelPosition = position.slice(0);
    var xShiftAmount = (0.06 + (widthScale - 1) * .1  / 2);
    var yShiftamount = (.05 + (heightScale - 1) * .1 / 2);
    if (side == left) {
      labelPosition[0] -= xShiftAmount;
    } else {
      labelPosition[0] += xShiftAmount;
    }
    labelPosition[1] += (0.05*7);

    views.push(
      <ViroImage materials={["crosshair"]}
                position={position}
                 scale={[1.00, 1.00, 1.00]}
                 source={require('./res/label_crosshair.png')}
               key={'crosshair' + material}/>
    );
    views.push(
      <ViroImage materials={[material]}
                 position={labelPosition}
                 scale={[0.10 * widthScale, 0.10 * heightScale, 0.10]}
                 source={img}
                 key={material}/>
    );
    return views;
  },
});

var materials = ViroMaterials.createMaterials({
   heart: {
     lightingModel: "Blinn",
     diffuseTexture: require('./res/heart_d.jpg'),
     writesToDepthBuffer: true,
     readsFromDepthBuffer: true,
   },
   skeleton: {
     lightingModel: "Blinn",
     diffuseTexture: require('./res/skeleton_d.jpg'),
     writesToDepthBuffer: true,
     readsFromDepthBuffer: true,
   },
   body: {
     lightingModel: "Blinn",
     diffuseTexture: require('./res/outer_skin_d.jpg'),
     writesToDepthBuffer: true,
     readsFromDepthBuffer: true,
   },
   aorta: {
     shininess: 2.0,
     lightingModel: "Constant",
     diffuseTexture: require('./res/label_aorta.png'),
     writesToDepthBuffer: false,
     readsFromDepthBuffer: false,
   },
   crosshair: {
     shininess: 2.0,
     lightingModel: "Constant",
     diffuseTexture: require('./res/label_crosshair.png'),
     writesToDepthBuffer: false,
     readsFromDepthBuffer: false,
   },
   left_atrium: {
     shininess: 2.0,
     lightingModel: "Constant",
     writesToDepthBuffer: false,
     readsFromDepthBuffer: false,
   },
   left_common_carotid: {
     shininess: 2.0,
     lightingModel: "Constant",
     writesToDepthBuffer: false,
     readsFromDepthBuffer: false,
   },
   left_pulmonary: {
     shininess: 2.0,
     lightingModel: "Constant",
     writesToDepthBuffer: false,
     readsFromDepthBuffer: false,
   },
   right_atrium: {
     shininess: 2.0,
     lightingModel: "Constant",
     writesToDepthBuffer: false,
     readsFromDepthBuffer: false,
   },
   right_ventricle: {
     shininess: 2.0,
     lightingModel: "Constant",
     writesToDepthBuffer: false,
     readsFromDepthBuffer: false,
   },
   superior_aorta: {
     shininess: 2.0,
     lightingModel: "Constant",
     writesToDepthBuffer: false,
     readsFromDepthBuffer: false,
   },
   superior_vena_cava: {
     shininess: 2.0,
     lightingModel: "Constant",
     writesToDepthBuffer: false,
     readsFromDepthBuffer: false,
   },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insideText: {
    flex: 1,
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 35,
    color: '#FFFFFF',
  },
});

var animations = ViroAnimations.registerAnimations({
    fadeSkeleton: {
      duration: 10000,
      properties:{opacity:0.1},
      easing:"Linear"
    },
    fadeBody: {
      duration: 10000,
      properties:{opacity:0.1},
      easing:"Linear"
    },
});

module.exports = HeartScene;
