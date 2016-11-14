'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  ViroSceneNavigator,
} from 'react-viro';

var apiKey = "5E2B76C0-E75B-44BB-93FE-AD7AE0A918A6";

var ViroSampleApp = React.createClass({
  render: function() {
    let scene = this._getScene(this.props.initialScene);

    console.log(this.props.vrMode);
    return (
      <ViroSceneNavigator
        initialScene={{
          scene,
        }}
        vrModeEnabled={this.props.vrMode}
        apiKey={apiKey}
      />
    );
  },

  _getScene(sceneName) {
    // We're doing it this way so that we only load in the scenes that we need.
    if (sceneName == '360 Photo Tour') {
      return require('./js/360PhotoTour/MainScene');
    } else if (sceneName == 'Inside the Human Body') {
      return require('./js/HumanBody/Heart');
    } else if (sceneName == 'Viro Media Player') {
      return require('./js/HelloWorld/HelloWorldScene'); // TODO: replace this scene with the right one
    } else if (sceneName == 'Flickr Photo Explorer') {
      return require('./js/HelloWorld/HelloWorldScene'); // TODO: replace this scene with the right one
    } else {
      return require('./js/HelloWorld/HelloWorldScene');
    }
  },
});

AppRegistry.registerComponent('ViroSample', () => ViroSampleApp);
