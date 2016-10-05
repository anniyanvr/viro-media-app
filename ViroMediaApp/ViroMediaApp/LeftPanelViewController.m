//
//  LeftPanelViewController.m
//  ViroMediaApp
//
//  Created by Andy Chu on 10/4/16.
//  Copyright © 2016 Viro Media. All rights reserved.
//

#import "LeftPanelViewController.h"
#import "PortraitRevealViewController.h"
#import "SamplesTableViewHeader.h"
#import "LeftPanelTableViewCell.h"

static NSString *const kSignUpCellIdentifier = @"signUpCellIdentifier";
static NSString *const kTestbedCellIdentifier = @"testbedCellIdentifier";
static NSString *const kViroSignUpURL = @"http://www.viromedia.com/";
static NSString *const kLeftPanelHeaderXibName = @"LeftPanelHeader";
static NSString *const kLeftPanelCellXibName = @"LeftPanelCell";

@interface LeftPanelViewController ()

@property (nonatomic, copy, nullable) UIColor *defaultTableCellColor;

@end

@implementation LeftPanelViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    // The default color is #292930
    self.defaultTableCellColor = [UIColor colorWithRed:(41.0 / 255)
                                                 green:(41.0 / 255)
                                                  blue:(48.0 / 255)
                                                 alpha:1.0];

    
    // Set self as the delegate and datasource for the tableview
    [self.tableView setDelegate:self];
    [self.tableView setDataSource:self];
    
    // The below code is very similar to the code in SamplesTableViewController because we're trying to solve the same issues.
    NSArray *viewsInHeaderXib = [[NSBundle mainBundle] loadNibNamed:kLeftPanelHeaderXibName owner:self options:nil];
    UIView *headerView = [viewsInHeaderXib objectAtIndex:0];
    // We want the header to be the same width as the parent view, but only kHeaderViewHeight tall.
    [headerView setFrame:CGRectMake(0, 0, self.view.frame.size.width, kHeaderRecommendedHeight)];
    [headerView layoutIfNeeded];

    // "start" the tableview below the header view.
    [self.tableView setContentInset:UIEdgeInsetsMake(kHeaderRecommendedHeight, 0, 0, 0)];
    self.automaticallyAdjustsScrollViewInsets = NO;
    
    [self.view addSubview:headerView];
    [self.view bringSubviewToFront:headerView];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(void)goToSignUpURL {
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:kViroSignUpURL]];
}

#pragma mark - Table view delegate

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    [self.tableView deselectRowAtIndexPath:indexPath animated:NO];
    if (indexPath.row == 0) {
        [self goToSignUpURL];
    } if (indexPath.row == 1) {
        PortraitRevealViewController *revealController = (PortraitRevealViewController *)[self revealViewController];
        [revealController presentTestbed];
    }
}


#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return 2;
}


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    if (indexPath.row == 0) {
        return [self cellForSignUp:tableView indexPath:indexPath];
    } else if (indexPath.row == 1) {
        return [self cellForTestbed:tableView indexPath:indexPath];
    } else {
        // we shouldn't have more than 2 rows here.
        return nil;
    }
}

- (UITableViewCell *)cellForSignUp:(UITableView *)tableView indexPath:(NSIndexPath *)indexPath {
    LeftPanelTableViewCell *cell = (LeftPanelTableViewCell *)[tableView dequeueReusableCellWithIdentifier:kSignUpCellIdentifier];
    
    if (!cell) {
        NSArray *nib = [[NSBundle mainBundle] loadNibNamed:kLeftPanelCellXibName owner:self options:nil];
        cell = [nib objectAtIndex:0];
    }

    cell.iconImage.image = [UIImage imageNamed:@"nativeapp_btn_sign_up.png"];
    cell.iconImage.highlightedImage = [UIImage imageNamed:@"nativeapp_btn_sign_up_press.png"];
    cell.textView.text = @"Sign up for Alpha";

    [self addBackgroundToCell:cell];
    
    return cell;
}

- (UITableViewCell *)cellForTestbed:(UITableView *)tableView indexPath:(NSIndexPath *)indexPath {
    LeftPanelTableViewCell *cell = (LeftPanelTableViewCell *)[tableView dequeueReusableCellWithIdentifier:kTestbedCellIdentifier];
    
    if (!cell) {
        NSArray *nib = [[NSBundle mainBundle] loadNibNamed:kLeftPanelCellXibName owner:self options:nil];
        cell = [nib objectAtIndex:0];
    }
    
    cell.iconImage.image = [UIImage imageNamed:@"nativeapp_btn_testbed.png"];
    cell.iconImage.highlightedImage = [UIImage imageNamed:@"nativeapp_btn_testbed_press.png"];
    cell.textView.text = @"Enter Testbed";

    [self addBackgroundToCell:cell];

    return cell;
}

- (void)addBackgroundToCell:(UITableViewCell *)cell {
    // The regular background is simply a view with the default color
    UIView *backgroundView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, cell.frame.size.width, cell.frame.size.width)];
    backgroundView.backgroundColor = self.defaultTableCellColor;

    // The selected background view is a view w/ a 50% black overlay
    UIView *selectedBackgroundView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, cell.frame.size.width, cell.frame.size.width)];
    selectedBackgroundView.backgroundColor = self.defaultTableCellColor;
    UIView *darkOverlay = [[UIView alloc] initWithFrame:CGRectMake(0, 0, cell.frame.size.width, cell.frame.size.width)];
    [darkOverlay setBackgroundColor:[UIColor colorWithRed:0 green:0 blue:0 alpha:0.2]];
    [selectedBackgroundView addSubview:darkOverlay];
    
    cell.backgroundView = backgroundView;
    cell.selectedBackgroundView = selectedBackgroundView;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    return kLeftPanelCellHeight; // comes from LeftPanelTableViewCell.h
}

@end
