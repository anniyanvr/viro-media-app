/**
 * Copyright (c) 2017-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Pull in all imports required for the controls within this scene.
 */
import React, { Component } from 'react';
import {StyleSheet, Platform} from 'react-native';

import {
  ViroNode,
  Viro360Video,
  ViroSound,
  ViroSpatialSound,
} from 'react-viro';

import renderIf from './custom_controls/renderIf';

var Label = require('./custom_controls/LabelElement');
var HotSpotElement = require('./custom_controls/HotSpotElement');
var I5_FreewayVideo = require('./res/video/5_I-5_Freeway_bkgsfx_nature.mp4');
var I5_FreewayCarBkgAudio = require('./res/audio/5_I-5_Freeway_carbkg_sfx.mp3');
var I5_FreewayBkgAudio = require('./res/audio/5_I-5_Freeway_APN_radio_JaneVO.mp3');
var I5_Freeway = React.createClass({
  propTypes: {
    playNextScene: React.PropTypes.func,
  },
  getInitialState() {
  	return {
  		muteVideo:false,
  		showHotSpot: false,
      showDay2Title: false,
      titleShown:false,
  	}
  },
  render: function() {
  	return(
  	<ViroNode>
  	    <Viro360Video source={I5_FreewayVideo} volume={0.5} rotation={[0,80,0]} loop={true} muted={this.state.muteVideo} 
  	    	onUpdateTime={this._onUpdateTime} onFinish={this._onVideoFinished}/>
        <ViroSound source={I5_FreewayBkgAudio} loop={true}/>
  	    {renderIf(Platform.OS == 'android', 
  	    	<ViroSpatialSound source={I5_FreewayCarBkgAudio} position={[0,0,-3]} muted={false} loop={true} minDistance={1} maxDistance={10} volume={1}/>
  	    )}
		
		{renderIf(Platform.OS == 'ios',
			<ViroSound source={I5_FreewayCarBkgAudio} loop={true}/>
		)}
		
  		{renderIf(this.state.showDay2Title && !this.state.titleShown, 
          	<Label backgroundHeight={1} 
                 backgroundWidth={1.5}
                 titleHeight={1.07}
                 titleWidth={1.3}
                 titleOffSetX={-0.1}
                 titleOffSetY={0.05}
                 position={[-1.5,1.8,-12]}
                 disappearAtEnd={true}
                 titleVisibleDuration={2000}
                 labelBackgroundSource={require("./res/label_black.png")}
                 labelTextSource={require("./res/title_day_1.png")} />
  		)}
		{renderIf(this.state.showHotSpot, 
	          	<HotSpotElement backgroundHeight={1} 
	                 backgroundWidth={4.5}
	                 titleHeight={1.07}
	                 titleWidth={3.9}
	                 titleOffSetX={-0.4}
	                 titleOffSetY={0.07}
	                 position={[-2.5,-3.5,-12]}
	                 disappearAtEnd={false}
	                 titleVisibleDuration={2000}
	                 labelOffSet={3.5}
	                 source={require("./res/hotspot.png")}
	                 hoverSource={require("./res/hotspot_hover.png")}
	                 clickSource={require("./res/hotspot_visited.png")}
	                 onClick={this._onHotSpotClicked}
	                 labelBackgroundSource={require("./res/label_black.png")}
	                 labelTextSource={require("./res/title_jane_and_tessa.png")} />
	              
      	)}
  	</ViroNode>
  	);
  },
  _onHotSpotClicked: function(source) {
    
    if (this.props.playNextScene) {
      this.props.playNextScene("AGS Checkpoint");
    }

  },
  _onUpdateTime: function(current, total) {
  		if (current == 1) {
  			this.setState({
  				showDay2Title:true,
  			});
  		}
  		if (current == 6) {
  			this.setState({
  				showDay2Title:false,
  				showHotSpot:true,
  			});
  		}  		
  },
  _onVideoFinished: function() {
    this.setState({
      titleShown:true,
    })
  },
});

module.exports = I5_Freeway;
