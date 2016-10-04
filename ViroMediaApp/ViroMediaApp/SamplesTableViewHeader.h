//
//  SamplesTableViewHeader.h
//  ViroMediaApp
//
//  Created by Andy Chu on 9/26/16.
//  Copyright © 2016 Viro Media. All rights reserved.
//

#import <UIKit/UIKit.h>

static float kHeaderRecommendedHeight = 60.0f;
static NSString *const kHeaderViewXibName = @"SamplesTableViewHeader";

@interface SamplesTableViewHeader : UIView

@property (weak, nonatomic) IBOutlet UIButton *infoButton;
@property (weak, nonatomic) IBOutlet UIImageView *logoImage;
@property (weak, nonatomic) IBOutlet UIButton *backButton;

@end
