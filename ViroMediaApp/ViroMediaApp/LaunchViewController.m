//
//  LaunchViewController.m
//  ViroMediaApp
//
//  Copyright © 2016 Viro Media. All rights reserved.
//

#import "LaunchViewController.h"

static NSString *const kGoToExperiencesSegue = @"goToExperiences";
static NSString *const kGoToExperiencesTwoSegue = @"goToExperiencesTwo";

@interface LaunchViewController ()

@end

@implementation LaunchViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    // load the next screen after 1 second.
    [self performSelector:@selector(goNextScene) withObject:nil afterDelay:1.5];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (UIInterfaceOrientationMask)supportedInterfaceOrientations {
    return UIInterfaceOrientationMaskPortrait;
}

- (void)goNextScene {
    [self performSegueWithIdentifier:kGoToExperiencesTwoSegue sender:self];
}

@end
