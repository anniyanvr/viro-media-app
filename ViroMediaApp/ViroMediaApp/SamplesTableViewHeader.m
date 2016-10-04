//
//  SamplesTableViewHeader.m
//  ViroMediaApp
//
//  Created by Andy Chu on 9/26/16.
//  Copyright © 2016 Viro Media. All rights reserved.
//

#import "SamplesTableViewHeader.h"

@implementation SamplesTableViewHeader

- (void)showMenuButton {
    self.menuButton.hidden = NO;
    self.infoButton.hidden = YES;
    self.backButton.hidden = YES;
}
- (void)showInfoButton {
    self.menuButton.hidden = YES;
    self.infoButton.hidden = NO;
    self.backButton.hidden = YES;
}

- (void)showBackButton {
    self.menuButton.hidden = YES;
    self.infoButton.hidden = YES;
    self.backButton.hidden = NO;
}

@end
