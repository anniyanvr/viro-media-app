/**
 * Copyright (c) 2015-present, Viro Media, Inc.
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
  ViroScene,
  ViroLight,
  Viro360Photo,
  ViroImage,
  ViroMaterials,
  ViroAnimations,
  ViroAnimatedComponent
} from 'react-viro';

var BackElement = React.createClass({
    getInitialState() {
        return {
        };
    },
    render:function(){
        return(
            <ViroImage
                {...this.props}
                scale={[1, 1, 1]}
                position={[0, -3.5, 0]}
                rotation={[-90, 0, 0]}
                materials={["icon_back"]}
                onClick={this._onCardTap}
                source={require('../img/icon_back.png')}
            />
        );
    },

    _onCardTap(){
        this.props.sceneNavigator.pop();
    },
});

ViroMaterials.createMaterials({
    icon_back: {
        shininess : 1.0,
        lightingModel: "Lambert",
    },
});


module.exports = BackElement;
