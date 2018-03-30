//
//  AppDelegate.h
//  ViroMediaApp
//
//  Copyright © 2017 Viro Media. All rights reserved.
//

#import "AppDelegate.h"
#import "ViroSceneViewController.h"
#import <ViroReact/VRTBundleURLProvider.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <Fabric/Fabric.h>
#import <Crashlytics/Crashlytics.h>
#import <Google/Analytics.h>


@implementation AppDelegate



- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.isViroSceneDisplaying = NO;
//  BOOL enterVrImmediately = YES;
//  BOOL usingNgrok = YES;
//  
//  if(enterVrImmediately) {
//    NSURL *jsCodeLocation = nil;
//    
//#ifdef DEBUG
//    if(usingNgrok) {
//      VRTBundleURLProvider *bundleProvider = [[VRTBundleURLProvider alloc] init];
//      jsCodeLocation = [bundleProvider jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
//    }
//#endif
//    
//    if(jsCodeLocation == nil) {
//      jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
//    }
//    
//    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
//                                                        moduleName:@"ViroMediaAppBeta"
//                                                 initialProperties:nil
//                                                     launchOptions:launchOptions];
//    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
//    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
//    UIViewController *rootViewController = [UIViewController new];
//    rootViewController.view = rootView;
//    self.window.rootViewController = rootViewController;
//    [self.window makeKeyAndVisible];
//  }
  [Fabric with:@[[Crashlytics class]]];

  GAI *gai = [GAI sharedInstance];
  [gai trackerWithTrackingId:@"UA-96545983-1"];
  return YES;
}

// This function determines what orientation our app supports whereas the orientation in the plist determines which orientation we are allowed
// to launch into. If this function isn't specified then the plist is the default. Also UIViewControllers can override this too.
//- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
//  // Force the oprientation into landscape mode if we are displaying a ViroSceneViewController.
//  if(self.isViroSceneDisplaying) {
//    return (UIInterfaceOrientationMaskLandscapeLeft | UIInterfaceOrientationLandscapeRight);
//  }
//    return UIInterfaceOrientationMaskAllButUpsideDown;
//}

@end
