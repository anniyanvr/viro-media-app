/**
 * Copyright (c) 2016-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict';

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import {
    ViroImage,
    ViroText,
    ViroAnimations,
    ViroAnimatedComponent,
    ViroFlexView,
    ViroUtils,
} from 'react-viro';

let polarToCartesian = ViroUtils.polarToCartesian;

var PropTypes = React.PropTypes;

var RollOverMenuItem = React.createClass({
    propTypes: {
        text:   PropTypes.string,
        onHover: React.PropTypes.func,
        onClick: React.PropTypes.func,
        /**
         * The image file, which is required
         */
        image: PropTypes.oneOfType([
          PropTypes.shape({
            uri: PropTypes.string,
          }),
          // Opaque type returned by require('./image.jpg')
          PropTypes.number,
        ]),
        /**
         * The position of the card
         */
        position: PropTypes.arrayOf(PropTypes.number),
        rotation: PropTypes.arrayOf(PropTypes.number),
        scale: PropTypes.arrayOf(PropTypes.number),
    },

    getInitialState() {
      return {
          currentAnimation:"animateRollOverIn",
          runAnimation:false,
      };
    },

    render: function() {
      return (
        <ViroAnimatedComponent animation={this.state.currentAnimation} run={this.state.runAnimation} loop={false} >
          <ViroFlexView onHover={this._onGaze} onClick={this._onClick} backgroundColor="#00000000" position={this.props.position} rotation={this.props.rotation} width={2} height={2} style={{flexDirection: 'column'}}>
            <ViroImage height={1.5} source={this.props.image} resizeMode="scaleToFill" imageClipMode="clipToBounds" />
            <ViroText height={.5} text={this.props.text} style={styles.titleText} />
          </ViroFlexView>
        </ViroAnimatedComponent>
      );
    },

    _onClick() {
      console.log("On tap invoked before checking if prop set");
      if(this.props.onClick) {
        console.log("On tap invoked after checking if prop set");
        this.props.onClick(this.props.text);
      }
    },

    _onGaze(isGazing) {
      if(isGazing) {
        this.setState({
          currentAnimation: "animateRollOverIn",
          runAnimation: true,
        });
      } else {
        this.setState({
          currentAnimation: "animateRollOverOut",
          runAnimation: true,
        });
      }
    },
});


var styles = StyleSheet.create({
    titleText: {
      fontSize: 20,
      color: '#ffffff',
      textAlignVertical: 'center',
      textAlign: 'center',
      flex: 1,
    },
});


ViroAnimations.registerAnimations({
  animateRollOverIn:{properties:{scaleX:1.2, scaleY:1.2, scaleZ:1, opacity: 1},
        easing:"Bounce", duration: 200},
  animateRollOverOut:{properties:{scaleX:1.0, scaleY:1.0, scaleZ:1, opacity: 1},
              easing:"Bounce", duration: 200},
});

module.exports = RollOverMenuItem;
