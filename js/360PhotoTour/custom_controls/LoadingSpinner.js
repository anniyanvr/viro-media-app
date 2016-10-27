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

import {
    StyleSheet,
    ViroScene,
    ViroLight,
    Viro360Photo,
    ViroImageCard,
    Materials,
    ViroAnimations,
    ViroAnimatedComponent,
    ViroNode,
    ViroSpinner,
    ViroText,
    ViroSphere
} from 'react-viro';
import { polarToCartesian } from 'polarToCartesian';

var PropTypes = require('react/lib/ReactPropTypes');

var LoadingSpinner = React.createClass({
    propTypes: {
        showLoadingText:PropTypes.bool,
    },
    render: function() {
        var spinnerPosition = polarToCartesian([0, 0, 0]);
        spinnerPosition[2]=0;
        var textPosition = polarToCartesian([1, -25, -40]);
        textPosition[2]=0.35;
        return (
                <ViroNode {...this.props} >
                    <ViroNode position={polarToCartesian([0, 0, 0])}
                          transformBehaviors={["billboard"]}>
                        <ViroSpinner position={spinnerPosition}
                                     scale={[.7,.7,.1]}
                                     spinnerType='dark' />
                        <ViroText
                            position={textPosition}
                            fontFamily='HelveticaNeue-Medium'
                            fontSize={70}
                            color={"#000000"}
                            text="Loading ...."
                        />
                    </ViroNode>
                </ViroNode>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


module.exports = LoadingSpinner;
