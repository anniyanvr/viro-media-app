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
var laOverlook360Video = {uri:"https://dtvtrcn42ef1b.cloudfront.net/3_LA_Overlook/3_LA_Overlook_360clip_music_v2.mp4"};
var laOverlookCityBkgAudio = {uri:"https://dtvtrcn42ef1b.cloudfront.net/3_LA_Overlook/3_LA_Overlook_bkgsfx_city.mp3"};
var laOverlookNatureBkgAudio = {uri:"https://dtvtrcn42ef1b.cloudfront.net/3_LA_Overlook/3_LA_Overlook_bkgsfx_nature.mp3"};
var LA_Overlook = React.createClass({
  getInitialState() {
  	return {
  		muteVideo:false,
  		showLosAngelesTitle: false,
  		show7DaysEarlierTitle: false,
  		showDay1Title: false,
  		showHotSpot: false,
  	}
  },
  render: function() {
  	return(
  	<ViroNode>
  	    <Viro360Video source={laOverlook360Video} volume={1.0} rotation={[0,102,0]} loop={false} muted={this.state.muteVideo} 
  	    	onUpdateTime={this._onUpdateTime} onFinish={this._onVideoFinished}/>
  	    {renderIf(Platform.OS == 'android', 
  	    	<ViroSpatialSound source={laOverlookCityBkgAudio} position={[0,0,-1]} muted={false} loop={true}/>
  	    )}
		{renderIf(Platform.OS == 'android',
			<ViroSpatialSound source={laOverlookNatureBkgAudio} position={[0,0,2]} muted={false} loop={true}/>
		)}
		{renderIf(Platform.OS == 'ios', 
  	    	<ViroSound source={laOverlookCityBkgAudio} loop={true}/>
  	    )}
		{renderIf(Platform.OS == 'ios',
			<ViroSound source={laOverlookNatureBkgAudio} loop={true}/>
		)}
		{renderIf(this.state.showLosAngelesTitle, 
  	          	<Label backgroundHeight={1} 
		                 backgroundWidth={4.5}
		                 titleHeight={1.07}
		                 titleWidth={3.9}
		                 titleOffSetX={-0.30}
		                 titleOffSetY={0.05}
		                 position={[0,1.8,-12]}
		                 disappearAtEnd={true}
		                 titleVisibleDuration={2000}
		                 labelBackgroundSource={require("./res/label_black.png")}
		                 labelTextSource={require("./res/title_los_angeles.png")} />
      	)}
		{renderIf(this.state.show7DaysEarlierTitle, 
          	<Label backgroundHeight={1} 
                 backgroundWidth={5.5}
                 titleHeight={1.07}
                 titleWidth={4.7}
                 titleOffSetX={-0.30}
                 titleOffSetY={0.05}
                 position={[0.5,1.8,-12]}
                 disappearAtEnd={true}
                 titleVisibleDuration={2000}
                 labelBackgroundSource={require("./res/label_black.png")}
                 labelTextSource={require("./res/title_7_days_earlier.png")} />
  		)}
  		{renderIf(this.state.showDay1Title, 
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
	                 position={[-1.5,-2,-12]}
	                 disappearAtEnd={false}
	                 titleVisibleDuration={2000}
	                 labelOffSet={3.5}
	                 source={require("./res/hotspot.png")}
	                 hoverSource={require("./res/hotspot_hover.png")}
	                 clickSource={require("./res/hotspot_visited.png")}
	                 onClick={this._onHotSpotClicked}
	                 labelBackgroundSource={require("./res/label_black.png")}
	                 labelTextSource={require("./res/title_janes_apartment.png")} />
	              
      	)}
  	</ViroNode>
  	);
  },
  _onHotSpotClicked: function(source) {
    if (this.props.onClick) {
      this.props.onClick(source);
    }
    if (this.props.playNextScene) {
      this.props.playNextScene(source);
    }

  },
  _onUpdateTime: function(current, total) {
  		if (current == 3) {
  			this.setState({
  				showLosAngelesTitle:true,
  			});
  		}
  		if (current == 10) {
  			this.setState({
  				showLosAngelesTitle:false,
  				show7DaysEarlierTitle:true,
  			});
  		}
  		if (current == 17) {
  			this.setState({
  				showLosAngelesTitle:false,
  				show7DaysEarlierTitle:false,
  				showDay1Title:true,
  			});
  		}
		if (current == 24) {
  			this.setState({
  				showLosAngelesTitle:false,
  				show7DaysEarlierTitle:false,
  				showDay1Title:false,
  				showHotSpot:true,
  			});
  		}


  		
  },
  _onVideoFinished: function() {
  	var isMuted = this.state.muteVideo;
    if (!isMuted) {
    	this.setState({
    		muteVideo:true
    	});
    }
  },
});

module.exports = LA_Overlook;
