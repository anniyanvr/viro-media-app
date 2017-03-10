'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
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
  Materials,
  ViroAnimations,
  ViroAnimatedComponent,
  Viro360Photo,
} from 'react-viro';

var left = "left";
var right = "right";

var HeartScene = React.createClass({
  getInitialState() {
    return {

    };
  },

  render: function() {
    return (
     <ViroScene style={styles.container}>

        <Viro360Photo source={require("./res/heart_bg.jpg")} />

        <ViroOrbitCamera position={[0, 0, 0]} focalPoint={[0, 0, -.85]} />

        <ViroOmniLight position={[0, 0, 5]} color="#ffffff"
          attenuationStartDistance={40} attenuationEndDistance={50} />

        <ViroAmbientLight color="#aaaaaa" />


        <Viro3DObject source={require('./res/heart.obj')}
                      position={[-0.0, -5.5, -1.15]}
                      materials={["heart"]} />


      {this._getLabel([-0.039, 0.115, -0.779], "superior_vena_cava", left, 1.55, 1)}
      {this._getLabel([ 0.085, 0.155, -0.738], "left_common_carotid", left, 1.9, 1)}
      {this._getLabel([ 0.143, 0.070, -0.741], "aorta", right, 1.7, 1)}
      {this._getLabel([ 0.195, -0.010, -0.676], "left_pulmonary", right, 1.5, 1)}
      {this._getLabel([ 0.113, -0.130, -0.590], "left_atrium", right, 1.25, 1)}
      {this._getLabel([-0.060, -0.220, -0.612], "right_atrium", left, 1.3, 1)}
      {this._getLabel([ 0.018, -0.291, -0.554], "right_ventricle", left, 1.5, 1)}

     </ViroScene>
    );
  },

  _getLabel(position, material, side, widthScale, heightScale) {
    let views = [];

    var labelPosition = position.slice(0);
    var xShiftAmount = (0.06 + (widthScale - 1) * .1 / 2);
    var yShiftamount = (.05 + (heightScale - 1) * .1 / 2);
    if (side == left) {
      labelPosition[0] -= xShiftAmount;
    } else {
      labelPosition[0] += xShiftAmount;
    }
    labelPosition[1] += 0.05;

    views.push(
      <ViroImage materials={["crosshair"]}
                 position={position}
                 scale={[0.10, 0.10, 0.10]}/>
    );

    views.push(
      <ViroImage materials={[material]}
                 position={labelPosition}
                 scale={[0.10 * widthScale, 0.10 * heightScale, 0.10]}/>
    );
    return views;
  },
});

var materials = Materials.createMaterials({
   heart: {
     lightingModel: "Lambert",
     diffuseTexture: require('./res/Heart_D3.jpg'),
     specularTexture: require('./res/Heart_S2.jpg'),
     writesToDepthBuffer: true,
     readsFromDepthBuffer: true,
   },
   skeleton: {
     lightingModel: "Blinn",
     diffuseTexture: require('./res/skeleton_D.jpg'),
     writesToDepthBuffer: true,
     readsFromDepthBuffer: true,
   },
   body: {
     lightingModel: "Blinn",
     diffuseTexture: require('./res/outer_skin_D.jpg'),
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
     diffuseTexture: require('./res/label_left_atrium.png'),
     writesToDepthBuffer: false,
     readsFromDepthBuffer: false,
   },
   left_common_carotid: {
     shininess: 2.0,
     lightingModel: "Constant",
     diffuseTexture: require('./res/label_left_common_carotid.png'),
     writesToDepthBuffer: false,
     readsFromDepthBuffer: false,
   },
   left_pulmonary: {
     shininess: 2.0,
     lightingModel: "Constant",
     diffuseTexture: require('./res/label_left_pulmonary.png'),
     writesToDepthBuffer: false,
     readsFromDepthBuffer: false,
   },
   right_atrium: {
     shininess: 2.0,
     lightingModel: "Constant",
     diffuseTexture: require('./res/label_right_atrium.png'),
     writesToDepthBuffer: false,
     readsFromDepthBuffer: false,
   },
   right_ventricle: {
     shininess: 2.0,
     lightingModel: "Constant",
     diffuseTexture: require('./res/label_right_ventricle.png'),
     writesToDepthBuffer: false,
     readsFromDepthBuffer: false,
   },
   superior_aorta: {
     shininess: 2.0,
     lightingModel: "Constant",
     diffuseTexture: require('./res/label_superior_aorta.png'),
     writesToDepthBuffer: false,
     readsFromDepthBuffer: false,
   },
   superior_vena_cava: {
     shininess: 2.0,
     lightingModel: "Constant",
     diffuseTexture: require('./res/label_superior_vena_cava.png'),
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
