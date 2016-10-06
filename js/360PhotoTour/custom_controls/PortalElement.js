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
  ViroAnimations,
  ViroAnimatedComponent,
  ViroFlexView,
  ViroText,
  ViroView
} from 'react-viro';

var PropTypes = require('react/lib/ReactPropTypes');

var PortalElement = React.createClass({
    propTypes: {
        jumpToScene: PropTypes.object,
        sceneText:PropTypes.string,
        sceneLength:PropTypes.number,
        iconOffset:PropTypes.number,
        backPortal:PropTypes.BOOL
    },
    render:function(){
        var photoSceneText = this.props.scenText;
        var textOffset = 0.55;
        if (this.props.iconOffset){
            textOffset=this.props.iconOffset;
        }
        return(
            <ViroView {...this.props} transformConstraint="billboard" onTap={this._onCardTap} >
                <ViroImage
                    position={[0,0,0]}
                    scale={[.33, .33, .33]}
                    materials={["icon_scene"]} />
                <ViroImage
                          position={[textOffset,0,0]}
                          scale={[this.props.sceneLength, 0.26, 0.1]}
                          materials={["icon_label_background"]} />
                <ViroText position={[0.275,-0.06, 0.15]}
                          style={styles.markerText}
                          text={this.props.sceneText}/>
            </ViroView>
        );
    },

    _onCardTap(){
        if (this.props.jumpToScene == null){
            return;
        }
        if (this.props.backPortal){
            this.props.sceneNavigator.pop();
        } else {
            this.props.sceneNavigator.push({scene:this.props.jumpToScene});
        }
    },
});

Materials.createMaterials({
    icon_scene: {
        shininess : 1.0,
        lightingModel: "Lambert",
        diffuseTexture: require('../img/icon_scene.png'),
    },
    icon_label_background:{
        shininess : 1.0,
        lightingModel: "Lambert",
        diffuseTexture: require('../img/icon_label_background.png'),
    }
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


module.exports = PortalElement;
