'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  ViroLight,
  ViroScene,
  ViroText,
  ViroCard,
  NativeModules,
  Materials,
} from 'react-viro';

var HelloWorldScene = React.createClass({
  getInitialState() {
    return {

    };
  },
  render: function() {
    return (
     <ViroScene backgroundSphere={require('./res/guadalupe_360.jpg')}>

      <ViroLight type="omni" position={[0, 0, 0]} color="#ffffff"
        direction={[0,0, -1.0]} attenuationStartDistance={40} attenuationEndDistance={50} />

      <ViroText text="Hello World!" position={[0, 0, -2]} style={styles.helloWorldTextStyle} />

     </ViroScene>
    );
  },
});

Materials.createMaterials({
  redColor: {
    shininess: 2.0,
    lightingModel: "Lambert",
    diffuseColor: "#ff0000",
  }
})

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 70,
    color: '#ffffff',
  },
});

module.exports = HelloWorldScene;
