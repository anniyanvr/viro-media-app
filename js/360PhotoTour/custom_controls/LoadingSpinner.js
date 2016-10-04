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
    ViroView,
    ViroSpinner,
    ViroText
} from 'react-viro';
import { polarToCartesian } from 'polarToCartesian';

var PropTypes = require('react/lib/ReactPropTypes');

var LoadingSpinner = React.createClass({
    propTypes: {
        spinnerOffsetX:PropTypes.number,
        spinnerOffsetY:PropTypes.number,
        spinnerOffsetZ:PropTypes.number,
        showLoadingText:PropTypes.BOOL,
    },
    getInitialState() {
        return {
        };
    },
    render: function() {
        var spinnerPosition =polarToCartesian([0, 0, 0]);
            spinnerPosition[2]=0;
        return (
            <ViroView {...this.props} >
                <ViroView position={polarToCartesian([0, 0, 0])}
                          transformConstraint="billboard">
                    <ViroSpinner position={spinnerPosition}
                                 spinnerType='dark' />
                    {this._getViews()}
                </ViroView>
            </ViroView>

            );
    },
     _getViews() {
            var views = [];
            var position = polarToCartesian([1, -30, -50]);
            position[2]=0.5;
            views.push((
                <ViroText
                    position={position}
                    fontFamily='HelveticaNeue-Medium'
                fontSize={70}
                color={"#000000"}
                text="Loading ...."
                />
                ));
                return views;
     }

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


module.exports = LoadingSpinner;
