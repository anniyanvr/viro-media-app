//
//  ViroSceneViewController.m
//  ViroMediaApp
//
//  Created by Andy Chu on 9/25/16.
//  Copyright © 2016 Viro Media. All rights reserved.
//

#import <ReactViro/RCTBundleURLProvider.h>
#import <ReactViro/RCTRootView.h>
#import "ViroSceneViewController.h"
#import "AppDelegate.h"

#warning once we use the latest react-viro build, import VRTNotifications.h.
static NSString *const kVRTUserRequestedExit = @"ViroUserRequestedExit";
static NSString *const kReactNativeManualURL = @"http://%@:8081/index.ios.bundle?platform=ios&dev=true";
static NSInteger const kBackButtonSize = 38;
static NSInteger const kBackButtonInsetTop = 8;
static NSInteger const kBackButtonInsetLeft = 12;

@interface ViroSceneViewController ()

@property (nonatomic, assign) BOOL useTestbed;
@property (nonatomic, copy, nonnull) NSString *userIpAddress;
@property (nonatomic, copy, nonnull) NSString *sceneName;
@property (nonatomic, assign) BOOL vrMode;
@property (nonatomic, strong) UIButton *exit360Button;

@end

@implementation ViroSceneViewController

- (id)initWithSceneName:(NSString *)sceneName vrMode:(BOOL)vrMode {
    self = [super init];
    if (self) {
        _sceneName = sceneName;
        _vrMode = vrMode;
    }
    return self;
}

- (id)initForTestbed:(NSString *)ipAddress {
    self = [super init];
    if (self) {
        _useTestbed = YES;
        _userIpAddress = ipAddress;
    }
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    NSDictionary *initialProperties = nil;
    NSURL *jsCodeLocation = nil;
  
    if (!self.useTestbed) {
        initialProperties =
            @{
                @"initialScene" : self.sceneName,
                @"vrMode" : [NSNumber numberWithBool:self.vrMode],
            };
        jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
    } else {
        NSString *urlString = [NSString stringWithFormat:kReactNativeManualURL, self.userIpAddress];
        jsCodeLocation = [NSURL URLWithString:urlString];
    }

    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                        moduleName:@"ViroSample"
                                                 initialProperties:initialProperties
                                                     launchOptions:nil];


    // Add an exit button only if we're in 360 Mode, cardboard comes with its own exit button.
    if (!self.vrMode) {
        UIImage *defaultImage = [UIImage imageNamed:@"nativeapp_360_btn_back.png"];
        UIImage *highlightedImage = [UIImage imageNamed:@"nativeapp_360_btn_back_press.png"];
        self.exit360Button = [[UIButton alloc] initWithFrame:CGRectMake(0, 0, kBackButtonSize, kBackButtonSize)];
        self.exit360Button.imageEdgeInsets = UIEdgeInsetsMake(kBackButtonInsetTop, kBackButtonInsetLeft, 0, 0);
        [self.exit360Button addTarget:self
                       action:@selector(exitReactViro)
             forControlEvents:UIControlEventTouchUpInside];
        [self.exit360Button setImage:defaultImage forState:UIControlStateNormal];
        [self.exit360Button setImage:highlightedImage forState:UIControlStateHighlighted];
        self.exit360Button.userInteractionEnabled = YES;
        [rootView addSubview:self.exit360Button];
        [rootView bringSubviewToFront:self.exit360Button];
    }

    // register for the exit notification
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(exitReactViro)
                                                 name:kVRTUserRequestedExit
                                               object:nil];


    self.view = rootView;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)exitReactViro {
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
