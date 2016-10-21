'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  ViroSceneNavigator,
} from 'react-viro';

var apiKey = "5E2B76C0-E75B-44BB-93FE-AD7AE0A918A6";

var scenes = {
  'HelloWorldScene' : require('./js/HelloWorld/HelloWorldScene'),
//  'Flickr Photo Explorer': require('./js/FlickrPhotoExplorer/MainScene'),
  '360 Photo Tour': require('./js/360PhotoTour/MainScene'),
//  'Viro Media Player': require('./js/ViroMediaPlayer/MainScene'),
//  'Inside the Human Body': require('./js/HumanBody/MainScene'),
}

var ViroSampleApp = React.createClass({
  render: function() {
    let scene = scenes[this.props.initialScene];
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
  }
});

AppRegistry.registerComponent('ViroSample', () => ViroSampleApp);
