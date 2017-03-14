//
//  SamplesTableViewController.h
//  ViroMediaApp
//
//  Created by Andy Chu on 9/25/16.
//  Copyright © 2016 Viro Media. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface SamplesTableViewController : UIViewController <UITableViewDelegate, UITableViewDataSource>

@property (weak, nonatomic) IBOutlet UITableView *samplesTableView;
@property (weak, nonatomic) IBOutlet UIView *overlayView;
@property (weak, nonatomic) IBOutlet UIButton *overlayYesButton;
@property (weak, nonatomic) IBOutlet UIButton *overlayNoButton;
@property (weak, nonatomic) IBOutlet UIImageView *cardboardImage;
@property (weak, nonatomic) IBOutlet UIButton *overlayBackButton;
@property (weak, nonatomic) IBOutlet UILabel *moreAppsComingLabel;

@end
