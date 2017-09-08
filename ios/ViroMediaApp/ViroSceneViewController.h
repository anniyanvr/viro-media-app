//
//  ViroSceneViewController.h
//  ViroMediaApp
//
//  Created by Andy Chu on 9/25/16.
//  Copyright © 2016 Viro Media. All rights reserved.
//

#import <UIKit/UIKit.h>



@interface ViroSceneViewController : UIViewController

/**
 * Use this constructor to enter one of our sample apps.
 */
- (id)initWithSceneName:(NSString *)sceneName vrMode:(BOOL)vrMode;

/**
 * Use this constructor to enter a user-created scene as part of the testbed
 * if given an IP address.
 */
- (id)initForTestbedWithIp:(NSString *)ipAddress;

/**
 * Use this constructor to enter a user-created scene as part of the testbed
 * if given a ngrok endpoint
 */
- (id)initForTestbedWithNgrok:(NSString *)endpoint;


@end
