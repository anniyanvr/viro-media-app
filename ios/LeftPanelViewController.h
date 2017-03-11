//
//  LeftPanelViewController.h
//  ViroMediaApp
//
//  Created by Andy Chu on 10/4/16.
//  Copyright © 2016 Viro Media. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface LeftPanelViewController : UIViewController<UITableViewDelegate, UITableViewDataSource>

@property (weak, nonatomic) IBOutlet UITableView *tableView;

@end
