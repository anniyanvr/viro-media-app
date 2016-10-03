//
//  ViroSceneViewController.m
//  ViroMediaApp
//
//  Created by Andy Chu on 9/25/16.
//  Copyright © 2016 Viro Media. All rights reserved.
//

#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"
#import "ViroSceneViewController.h"
#import "AppDelegate.h"

#warning once we use the latest react-viro build, import VRTNotifications.h.
static NSString *const kVRTUserRequestedExit = @"ViroUserRequestedExit";

@interface ViroSceneViewController ()

@property (nonatomic, copy, nonnull) NSString *sceneName;
@property (nonatomic, assign) BOOL vrMode;
@property (nonatomic, copy, nonnull) UIViewController *previousVC;

@end

@implementation ViroSceneViewController

- (id)initWithSceneName:(NSString *)sceneName vrMode:(BOOL)vrMode previousVC:(UIViewController *)vc {
    self = [super init];
    if (self) {
        _sceneName = sceneName;
        _vrMode = vrMode;
        _previousVC = vc;
    }
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    NSDictionary *initialProperties = @{
        @"initialScene" : self.sceneName,
        @"vrMode" : [NSNumber numberWithBool:self.vrMode],
    };
    
    NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                        moduleName:@"ViroSample"
                                                 initialProperties:initialProperties
                                                     launchOptions:nil];

    // register for the exit notification
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(exitReact)
                                                 name:kVRTUserRequestedExit
                                               object:nil];


    [self.view addSubview:rootView];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)exitReact {
    dispatch_async(dispatch_get_main_queue(), ^{
        [self dismissViewControllerAnimated:YES completion:nil];
    });
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
