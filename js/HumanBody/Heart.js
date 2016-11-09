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
} from 'react-viro';

var HeartScene = React.createClass({
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
        <ViroOrbitCamera position={[0, 0, -0]} focalPoint={[0, 0, -1.15]} />
        <ViroSpotLight
                   position={[0, -0.25, 0]}
                   color="#777777"
                   direction={[0, 0, -1]}
                   attenuationStartDistance={5}
                   attenuationEndDistance={10}
                   innerAngle={5}
                   outerAngle={20}/>

                   <ViroAmbientLight
                              color="#555555"
                              />

        <Viro3DObject source={require('./res/heart.obj')}
                      position={[-0.0, -5.5, -1.15]}
                      materials={["heart"]}
                      transformBehaviors={["billboardY"]} />

        <ViroAnimatedComponent animation="fadeSkeleton" runOnMount={true}>
            <Viro3DObject source={require('./res/skeleton.obj')}
                          position={[-0.0, -5.5, -1.15]}
                          materials={["skeleton"]} />
        </ViroAnimatedComponent>

        <ViroAnimatedComponent animation="fadeBody" runOnMount={true}>
            <Viro3DObject source={require('./res/outer_skin.obj')}
                          position={[-0.0, -5.5, -1.15]}
                          materials={["body"]} />
        </ViroAnimatedComponent>

        <ViroNode position={[-0.0, -5.5, -1.15]}>
          {this._getLabel([-0.039, 5.615, 0.371], "superior_vena_cava")}
          {this._getLabel([ 0.098, 5.615, 0.412], "left_common_carotid")}
          {this._getLabel([ 0.143, 5.570, 0.409], "aorta")}
          {this._getLabel([ 0.195, 5.490, 0.474], "left_pulmonary")}
          {this._getLabel([ 0.113, 5.370, 0.560], "left_atrium")}
          {this._getLabel([-0.060, 5.280, 0.538], "right_atrium")}
          {this._getLabel([ 0.018, 5.209, 0.596], "right_ventricle")}
         </ViroNode>

     </ViroScene>
    );
  },

  _getLabel(position, material) {
    let views = [];
    var crossWidth = 128;
    var crossHeight = 128;

    var labelPosition = position.slice(0);
    labelPosition[0] -= 0.1;
    labelPosition[1] += 0.1;

    views.push(
      <ViroImage materials={["crosshair"]}
                 position={position}
                 scale={[0.10, 0.10, 0.10]}
                 transformBehaviors={["billboard"]}/>
    );



    views.push(
      <ViroImage materials={[material]}
                 position={labelPosition}
                 scale={[0.10, 0.10, 0.10]}
                 transformBehaviors={["billboard"]}/>
    );
    return views;
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
      properties:{opacity:0.0},
      easing:"Linear"
    },
    fadeBody: {
      duration: 10000,
      properties:{opacity:0.0},
      easing:"Linear"
    },
});

module.exports = HeartScene;
