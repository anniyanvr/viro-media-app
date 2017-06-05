/**
 * Copyright (c) 2017-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
 'use strict'

import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import TimerMixin from 'react-timer-mixin';

import {
	ViroNode,
	ViroImage,
	ViroAnimatedComponent,
	ViroAnimations,
} from 'react-viro';

var PropTypes = require('react/lib/ReactPropTypes');
var backgroundInitialPosition;
var LabelElement = React.createClass({
proptypes: {
	...View.propTypes,
	backgroundHeight: PropTypes.number,
	backgroundWidth: PropTypes.number,
	titleHeight: PropTypes.number,
	titleWidth: PropTypes.number,
	titleOffSetX: PropTypes.number,
	titleOffSetY: PropTypes.number,
	disappearAtEnd: PropTypes.bool,
	fadeIn: PropTypes.bool,
	titleVisibleDuration: PropTypes.number,
	labelBackgroundSource: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
      }),
      // Opaque type returned by require('./image.jpg')
      PropTypes.number,
    ]),
    labelTextSource: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
      }),
      // Opaque type returned by require('./image.jpg')
      PropTypes.number,
    ]),
},
mixins: [TimerMixin],
getInitialState() {
	return {
		backgroundAnimation: "titleBackgroundGrow",
		runBackgroundAnimation:true,
		textAnimation: "titleTextFadeIn",
		runTextFadinAnimation:false,
	}
},
render: function() {

	let initialbackgroundWith = 1;
	backgroundInitialPosition = this.props.backgroundWidth / 2 * (-1);
	let initialTextOpacity = 0;
	if (this.props.disappearAtEnd) {
		ViroAnimations.registerAnimations({
			titleBackgroundShrink: {
				properties: {
					scaleX:"0.001",
					positionX:backgroundInitialPosition
				},
				easing: "EaseIn",
				duration: 1000,
			},
		});
	}
	return (
		<ViroNode {...this.props}>
			<ViroAnimatedComponent
				animation={this.state.backgroundAnimation}
				run={this.state.runBackgroundAnimation}
				onFinish={this._backgroundAnimationFinished}>
				<ViroImage height={this.props.backgroundHeight}
		      			 width={this.props.backgroundWidth}
		                 source={this.props.labelBackgroundSource} 
		                 position={[backgroundInitialPosition,0,-0.2]}
		                 scale={[0.001,1,1]}
		                 resizeMode={"stretchToFill"} />
	        </ViroAnimatedComponent>
	        <ViroAnimatedComponent
	        	animation={this.state.textAnimation}
	        	run={this.state.runTextFadinAnimation}
	        	onFinish={this._onTextAnimationFinished}>
				<ViroImage height={this.props.titleHeight}
		      			 width={this.props.titleWidth}
		      			 source={this.props.labelTextSource}
		      			 opacity={initialTextOpacity}
		      			 position={[this.props.titleOffSetX, this.props.titleOffSetY, 0]}
	 	                 resizeMode={"stretchToFill"} />
	 	    </ViroAnimatedComponent>
      	</ViroNode>
	);
},
_backgroundAnimationFinished: function() {
	if (this.state.backgroundAnimation == "titleBackgroundGrow") {
		this.setState({
			textAnimation:"titleTextFadeIn",
			runTextFadinAnimation:true,
			runBackgroundAnimation:false,
		});		
	}
},
_onTextAnimationFinished: function() {
	if (this.props.disappearAtEnd) {
		if (this.state.textAnimation == "titleTextFadeIn") {
			this.setTimeout( () => {
				this._disappearLabel();
			}, this.props.titleVisibleDuration);
		} else {
			this.setState({
				backgroundAnimation: "titleBackgroundShrink",
				runBackgroundAnimation: true,
				runTextFadinAnimation:false,
			})
		}
	}
	if (this.state.textAnimation == "titleTextFadeIn" && this.props.disappearAtEnd) {
		this.setTimeout( () => {
			this._disappearLabel();
		}, this.props.titleVisibleDuration);
	} else if (this.props.disappearAtEnd) {
		this.setState({
			backgroundAnimation: "titleBackgroundShrink",
			runBackgroundAnimation: true,
			runTextFadinAnimation:false,
		})
	}
},
_disappearLabel: function() {
	this.setState({
		runBackgroundAnimation: false,
		runTextFadinAnimation: true,
		textAnimation: "titleTextFadeOut"
	});
}

});

ViroAnimations.registerAnimations({
	titleBackgroundGrow: {
		properties: {
			scaleX:"1",
			positionX:"0"
		},
		easing: "EaseIn",
		duration: 1000,
	},
	titleTextFadeIn: {
		properties: {
			opacity:"1",
		},
		easing: "EaseIn",
		duration: 1000,
	},
	titleTextFadeOut: {
		properties: {
			opacity:"0",
		},
		easing: "EaseIn",
		duration: 1000,
	}
});
module.exports = LabelElement;