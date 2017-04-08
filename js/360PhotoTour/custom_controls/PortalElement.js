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
  Viro360Image,
  ViroImage,
  ViroMaterials,
  ViroAnimations,
  ViroAnimatedComponent,
  ViroFlexView,
  ViroText,
  ViroNode
} from 'react-viro';

var PropTypes = require('react/lib/ReactPropTypes');

var PortalElement = React.createClass({
    propTypes: {
        jumpToScene: PropTypes.object,
        sceneText:PropTypes.string,
        sceneLength:PropTypes.number,
        iconOffset:PropTypes.number,
        backPortal:PropTypes.bool
    },
    render:function(){
        var photoSceneText = this.props.scenText;
        var textOffset = 0.55;
        if (this.props.iconOffset){
            textOffset=this.props.iconOffset;
        }
        return(
            <ViroNode {...this.props} transformBehaviors={["billboard"]} onClick={this._onCardTap} >
                <ViroImage
                    position={[0,0,0]}
                    scale={[1.2, 1.2, 1]}
                    materials={["icon_scene"]}
                    source={require('../img/icon_scene.png')}/>
                <ViroImage
                          position={[textOffset,0,0]}
                          scale={[this.props.sceneLength*3, 3, 1]}
                          materials={["icon_label_background"]}
                          source={require('../img/icon_label_background.png')}/>
                <ViroText position={[textOffset+.15, -0.2, 0.1]}
                          style={styles.markerText}
                          text={this.props.sceneText} width={3}/>
            </ViroNode>
        );
    },

    _onCardTap(){
        console.log("PortalElement onCardTap!");
        if (this.props.jumpToScene == null){
            console.log("PortalElement is null!!");
            return;
        }
        if (this.props.backPortal){
            this.props.sceneNavigator.pop();
        } else {
            console.log("PortalElement pushing new scene!!");
            this.props.sceneNavigator.push(this.props.jumpToScene);
        }
    },
});

ViroMaterials.createMaterials({
    icon_scene: {
        shininess : 1.0,
        lightingModel: "Lambert",
    },
    icon_label_background:{
        shininess : 1.0,
        lightingModel: "Lambert",
    }
});


var styles = StyleSheet.create({
    textWidth: {
        flexDirection: 'column',
        flex: 0.66,
    },
    markerText: {
        marginLeft:.50,
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 30,
        color: '#FFFFFF',
    },
    textBackground: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center'
    },
});


module.exports = PortalElement;
