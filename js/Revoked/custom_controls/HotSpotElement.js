/**
 * Copyright (c) 2017-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule HotSpotElement
 */
 'user strict';

import { requireNativeComponent, View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import TimerMixin from 'react-timer-mixin';
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";

import {
  ViroNode,
  ViroImage,
  ViroAnimatedComponent,
  ViroAnimations,
  ViroPropTypes
} from 'react-viro';

var HotSpotButton = require('./HotSpotButton');
var Label = require('./LabelElement');
import renderIf from './renderIf';

var PropTypes = require('react/lib/ReactPropTypes');

var HotSpotElement = React.createClass({
	propTypes: {
		...View.propTypes,
		labelOffSet: PropTypes.number,
	},
	getInitialState: function() {
		return {
			hovering:false,
		}
	},
	render: function() {
		return (
			<ViroNode {...this.props} >
			<HotSpotButton source={this.props.source} 
	          			  hoverSource={this.props.hoverSource} 
	          			  clickSource={this.props.clickSource}
	          			  position={[0,0,0]}
	          			  scale={[1,1,1]}
	          			  heartBeatInterval={10000}
	          			  transformBehaviors={["billboard"]}
	          			  onClick={this._onButtonClicked}
	          			  onHover={this._onHover}/>
	         {renderIf(this.state.hovering, 
		        <Label backgroundHeight={1} 
			                 backgroundWidth={5.5}
			                 titleHeight={1.07}
			                 titleWidth={4.7}
			                 titleOffSetX={this.props.titleOffSetX}
			                 titleOffSetY={this.props.titleOffSetY}
			                 position={[this.props.labelOffSet, 0, 0]}
			                 labelBackgroundSource={this.props.labelBackgroundSource}
			                 labelTextSource={this.props.labelTextSource} />
	             )}
			</ViroNode>
		);
	},
	_onButtonClicked: function(source) {
    	if (this.props.onClick) {
      		this.props.onClick(source);
    	}
  	},
  	_onHover: function(isHovering, source) {
  		if (isHovering) {
	  		this.setState({
	  			hovering:true
	  		});
	  	if (this.props.onHover) {
          this.props.onHover(isHovering, source);
        }

  		} else {
	  		this.setState({
	  			hovering:false
	  		});
  	}
  },

});

module.exports = HotSpotElement;