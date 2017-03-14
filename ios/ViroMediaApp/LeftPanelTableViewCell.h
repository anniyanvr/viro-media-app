//
//  LeftPanelTableViewCell.h
//  ViroMediaApp
//
//  Created by Andy Chu on 10/4/16.
//  Copyright © 2016 Viro Media. All rights reserved.
//

#import <UIKit/UIKit.h>

static float kLeftPanelCellHeight = 60.0f;

@interface LeftPanelTableViewCell : UITableViewCell

@property (weak, nonatomic) IBOutlet UIImageView *iconImage;
@property (weak, nonatomic) IBOutlet UILabel *textView;

@end
