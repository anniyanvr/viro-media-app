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
    ViroButton,
    ViroUtils,
} from 'react-viro';

let polarToCartesian = ViroUtils.polarToCartesian;
var createReactClass = require('create-react-class');
import PropTypes from 'prop-types';

var HomeButton = createReactClass({
    propTypes: {
        sceneNavigator: PropTypes.object,
        shouldRender: PropTypes.string,

    },
    render: function() {
      var visible = false;
      if(this.props.shouldRender !== undefined){
        visible = true;
      }
      return (
        <ViroButton visible={visible} source={require("../res/btn_home.png")}
                    hoverSource={require("../res/btn_home_hover.png")}
                    onClick={()=>{this.props.sceneNavigator.jump("homescreen")}}
                    position={[0, -2.5, .1]}
                    rotation={[-90, 0, 0]}
                    scale={[1, 1, 1]}
                     />
      );
    },
});

module.exports = HomeButton;
