//
//  TestbedEntryViewController.h
//  ViroMediaApp
//
//  Created by Andy Chu on 10/3/16.
//  Copyright © 2016 Viro Media. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface TestbedEntryViewController : UIViewController

@property (weak, nonatomic) IBOutlet UITextField *ipTextField;
@property (weak, nonatomic) IBOutlet UIButton *enterButton;
@property (weak, nonatomic) IBOutlet UILabel *errorText;
@property (weak, nonatomic) IBOutlet UIButton *backButton;

@property (weak, nonatomic) IBOutlet UILabel *previousIpTitle;
@property (weak, nonatomic) IBOutlet UILabel *previousIpText;

@end
