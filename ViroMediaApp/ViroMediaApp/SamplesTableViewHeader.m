//
//  SamplesTableViewHeader.m
//  ViroMediaApp
//
//  Created by Andy Chu on 9/26/16.
//  Copyright © 2016 Viro Media. All rights reserved.
//

#import "SamplesTableViewHeader.h"

static NSString *const kViroSignUpURL = @"http://www.viromedia.com/";

@implementation SamplesTableViewHeader

-(void)awakeFromNib {
    [super awakeFromNib];

    [self signupGestureRecognizers];
}

-(void)signupGestureRecognizers {
    // add onTap to the button
    UITapGestureRecognizer *singleFingerTap =
    [[UITapGestureRecognizer alloc] initWithTarget:self
                                            action:@selector(goToSignUpURL)];
    [self.infoButton addGestureRecognizer:singleFingerTap];
}

-(void)goToSignUpURL {
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:kViroSignUpURL]];
}

@end
