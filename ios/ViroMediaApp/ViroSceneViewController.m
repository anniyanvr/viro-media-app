//
//  ViroSceneViewController.m
//  ViroMediaApp
//
//  Created by Andy Chu on 9/25/16.
//  Copyright © 2016 Viro Media. All rights reserved.
//
#import <ViroReact/VRTBundleURLProvider.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <ViroReact/VRTNotifications.h>
#import "ViroSceneViewController.h"
#import "AppDelegate.h"

static NSString *const kPackagerUrlPrefixForIp = @"http://%@:8081";
static NSString *const kPackagerUrlSuffix = @"/index.ios.bundle?platform=ios&dev=true";
static NSInteger const kBackButtonSize = 38;
static NSInteger const kBackButtonInsetTop = 8;
static NSInteger const kBackButtonInsetLeft = 12;

@interface ViroSceneViewController ()

@property (nonatomic, assign) BOOL useTestbed;
@property (nonatomic, assign) BOOL isEndpointIpAddress;
@property (nonatomic, copy, nonnull) NSString *packagerServerEndpoint;
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

- (id)initForTestbedWithIp:(NSString *)ipAddress {
    self = [super init];
    if (self) {
        _useTestbed = YES;
        _packagerServerEndpoint = ipAddress;
        _isEndpointIpAddress = YES;
    }
    return self;
}

- (id)initForTestbedWithNgrok:(NSString *)endpoint {
    self = [super init];
    if (self) {
        _useTestbed = YES;
        // we're assuming this endpoint is of the form `https://xxxxx.ngrok.io`
        _packagerServerEndpoint = endpoint;
        _isEndpointIpAddress = NO;
    }
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    BOOL usingNgrok = YES;
    NSDictionary *initialProperties = nil;
    NSURL *jsCodeLocation = nil;
  
    if (!self.useTestbed) {
        initialProperties =
            @{
                @"initialScene" : self.sceneName,
                @"vrMode" : [NSNumber numberWithBool:self.vrMode],
            };
#ifdef DEBUG
      if(usingNgrok) {
        VRTBundleURLProvider *bundleProvider = [[VRTBundleURLProvider alloc] init];
        jsCodeLocation = [bundleProvider jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
      }
#endif
      
      if(jsCodeLocation == nil) {
        jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
      }
    } else {
        NSString *prefix = self.isEndpointIpAddress ? [NSString stringWithFormat:kPackagerUrlPrefixForIp, self.packagerServerEndpoint] : self.packagerServerEndpoint;
        NSString *urlString = [NSString stringWithFormat:@"%@%@", prefix, kPackagerUrlSuffix];
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
      [self willMoveToParentViewController:nil];
      [self.view removeFromSuperview];
      [self removeFromParentViewController];
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
