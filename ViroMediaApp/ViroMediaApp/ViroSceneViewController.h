//
//  ViroSceneViewController.h
//  ViroMediaApp
//
//  Created by Andy Chu on 9/25/16.
//  Copyright © 2016 Viro Media. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ViroSceneViewController : UIViewController

//- (id)initWithSceneName:(NSString *)sceneName vrMode:(BOOL)vrMode;
- (id)initWithSceneName:(NSString *)sceneName vrMode:(BOOL)vrMode previousVC:(UIViewController *)vc;

@end
