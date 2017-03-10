'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroOmniLight,
  ViroScene,
  ViroText,
  Viro360Image,
} from 'react-viro';

var HelloWorldScene = React.createClass({
  getInitialState() {
    return {

    };
  },
  render: function() {
    return (
     <ViroScene>

      <ViroOmniLight position={[0, 0, 0]} color="#ffffff"
        direction={[0,0, -1.0]} attenuationStartDistance={40} attenuationEndDistance={50} />

      <Viro360Image source={require('./res/guadalupe_360.jpg')} />

      <ViroText text="Hello World!" position={[0, 0, -2]} style={styles.helloWorldTextStyle} />

     </ViroScene>
    );
  },
});

var styles = StyleSheet.create({
 helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 60,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = HelloWorldScene;
