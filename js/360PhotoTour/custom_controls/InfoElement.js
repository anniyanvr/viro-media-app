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
  ViroImage,
  Materials,
    ViroFlexView,
    ViroText,
    ViroView,

    ViroAnimations,
    ViroAnimatedComponent,
} from 'react-viro';
var PropTypes = require('react/lib/ReactPropTypes');
var INFOCARD_REF = 'infoCard';
var ICONCARD_REF = 'iconCard';
/**
 * Info icon control that displays a ViroImage after being clicked on.
 * If a ViroImage is already displayed, it hides it.
 */
var InfoElement = React.createClass({
    propTypes: {
        cardScale: PropTypes.arrayOf(PropTypes.number),
        windowContent: PropTypes.string,
    },
    getInitialState(){
        return {
            currentInfoCardAnimation:"hide",
            currentIconCardAnimation:"showIcon",
            onCardShow:false,
            isInfoCardShowing:false,
            isIconCardShowing:true
        }
    },
    render:function(){
            return (
                <ViroView onTap={this._onCardTap} {...this.props}>
                    <ViroView scale={[this.props.cardScale[0],this.props.cardScale[1],this.props.cardScale[2]]} transformConstraint="billboard">
                        <ViroAnimatedComponent animation={this.state.currentInfoCardAnimation} runOnMount={false} loop={false} ref={INFOCARD_REF} onFinish={this._animateInfoCardFinished}>
                            <ViroImage
                                opacity={0.0}
                                scale={[.1,.1,.1]}
                                material={this.props.windowContent}
                                onTap={this._onCardTap}
                                onGaze={this._onFocused} />

                        </ViroAnimatedComponent>
                    </ViroView>
                    <ViroAnimatedComponent animation={this.state.currentIconCardAnimation} runOnMount={false} loop={false} ref={ICONCARD_REF}  onFinish={this._animateIconCardFinished}>
                        <ViroImage
                            transformConstraint="billboard"
                            opacity={1.0}
                            scale={[0.5, 0.5, 0.5]}
                            material="icon_info" />
                    </ViroAnimatedComponent>
                </ViroView>
        );
    },
    _onCardTap(){
        var showCard = !this.state.onCardShow

        if (showCard == true){
            this._animateIconCard(!showCard);
        } else {
            this._animateInfoCard(showCard);
        }
        this.setState({
            onCardShow: showCard,
        });
    },

    _animateIconCard(isVisible){
        this.setState({
            isIconCardShowing:isVisible,
            currentIconCardAnimation: isVisible? "showIcon": "hide",
        });
        this.refs[ICONCARD_REF].startAnimation();
    },

    _animateInfoCard(isVisible){
        this.setState({
            isInfoCardShowing:isVisible,
            currentInfoCardAnimation: isVisible? "showInfo": "hide",
        });
        this.refs[INFOCARD_REF].startAnimation();
    },

    _animateIconCardFinished(){
        // if we hid the icon card, we need to show the info card
        if (!this.state.isIconCardShowing){
            this._animateInfoCard(true);
        }
    },

    _animateInfoCardFinished(){
        // If we hid the infocard, we need to show the icon card
        if (!this.state.isInfoCardShowing){
            this._animateIconCard(true);
        }
    }
});

Materials.createMaterials({
    icon_info: {
        shininess : 1.0,
        lightingModel: "Lambert",
        diffuseTexture: require('../img/icon_info.png'),
    },
    icon_label_background:{
        shininess : 1.0,
        lightingModel: "Lambert",
        diffuseTexture: require('../img/icon_label_background.png'),
    }
});

ViroAnimations.registerAnimations({
    hide: {properties:{scaleX:.1, scaleY:.1, scaleZ:.1, opacity:0.0}, easing:"Bounce", duration:160},
    showInfo: {properties:{scaleX:1, scaleY:1, scaleZ:1, opacity:1.0}, easing:"PowerDecel", duration:200},
    showIcon: {properties:{scaleX:.5, scaleY:.5, scaleZ:.5, opacity:1.0}, easing:"PowerDecel", duration:200},
});

var styles = StyleSheet.create({
    textWidth: {
        flexDirection: 'column',
        flex: 0.66,
    },
    markerText: {
        marginLeft:50,
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 60,
        color: '#FFFFFF',
    },
    textBackground: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center'
    },
});



module.exports = InfoElement;
