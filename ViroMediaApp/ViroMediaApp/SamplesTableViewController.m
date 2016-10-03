//
//  SamplesTableViewController.m
//  ViroMediaApp
//
//  Created by Andy Chu on 9/25/16.
//  Copyright © 2016 Viro Media. All rights reserved.
//

#import "SamplesTableViewController.h"
#import "SWRevealViewController.h"
#import "SamplesTableViewCell.h"
#import "SamplesTableViewHeader.h"
#import "ViroSceneViewController.h"

static NSString *const kSampleCellReuseIdentifier = @"sampleCell";
static NSString *const kHeaderViewXibName = @"SamplesTableViewHeader";
static float kHeaderViewHeight = 60.0f;
static NSString *const kSamplesTableViewCellXib = @"SamplesTableViewCell";

// card content keys
static NSString *const kTitleKey = @"title";
static NSString *const kImageKey = @"image";
static NSString *const kDescriptionKey = @"description";
static NSString *const kViroSceneName = @"viroSceneName";

@interface SamplesTableViewController ()

@property (nonatomic, assign) NSInteger selectedRow;

@end

@implementation SamplesTableViewController

- (void)viewDidLoad {
    [super viewDidLoad];
#warning refactor this method to use some helper methods. Ideally splitting up setup into 3 helper funcs for: header, tableview and overlay.

    // TODO: VIRO-448, we removed left panel from V1
    // Tell the revealViewController to add a panGestureRecognizer to this view
//    [[self revealViewController] panGestureRecognizer];

    // Set self as the delegate and datasource for the tableview
    [self.samplesTableView setDelegate:self];
    [self.samplesTableView setDataSource:self];

    // Also remove the separators
    self.samplesTableView.separatorStyle = UITableViewCellSeparatorStyleNone;

    // Load in the header xib and grab the first (and only) view and add it as the header.
    NSArray *viewsInHeaderXib = [[NSBundle mainBundle] loadNibNamed:kHeaderViewXibName owner:self options:nil];
    SamplesTableViewHeader *headerView = [viewsInHeaderXib objectAtIndex:0];
    // We want the header to be the same width as the parent view, but only kHeaderViewHeight tall.
    [headerView setFrame:CGRectMake(0, 0, self.view.frame.size.width, kHeaderViewHeight)];
    [headerView layoutIfNeeded];

    // TODO: VIRO-448, we removed left panel from V1
//    UITapGestureRecognizer *singleFingerTap =
//            [[UITapGestureRecognizer alloc] initWithTarget:self
//                                                    action:@selector(openLeftPanel)];
//    [headerView.infoImageView addGestureRecognizer:singleFingerTap];
    
    // "start" the tableview below the header view.
    [self.samplesTableView setContentInset:UIEdgeInsetsMake(kHeaderViewHeight, 0, 0, 0)];
    self.automaticallyAdjustsScrollViewInsets = NO;
    
    [self.view addSubview:headerView];
    [self.view bringSubviewToFront:headerView];

    // set background color to #292930, and really Apple? only accepting color values from 0 -> 1?
    self.samplesTableView.backgroundColor = [UIColor colorWithRed:(41.0 / 255)
                                                            green:(41.0 / 255)
                                                             blue:(48.0 / 255)
                                                            alpha:1.0];

    // we want the overlay view to be at the very front
    [self.view bringSubviewToFront:self.overlayView];

    // Overlay Back Button
    UITapGestureRecognizer *overlayBackButtonTap =
            [[UITapGestureRecognizer alloc] initWithTarget:self
                                                    action:@selector(hideOverlay)];
    [self.overlayBackButton addGestureRecognizer:overlayBackButtonTap];

    // Overlay Yes Button
    UITapGestureRecognizer *overlayYesButtonTap =
            [[UITapGestureRecognizer alloc] initWithTarget:self
                                                    action:@selector(enterViroSceneInVRMode)];
    [self.overlayYesButton addGestureRecognizer:overlayYesButtonTap];

    // Overlay No Button
    UITapGestureRecognizer *overlayNoButtonTap =
    [[UITapGestureRecognizer alloc] initWithTarget:self
                                            action:@selector(enterViroSceneIn360Mode)];
    [self.overlayNoButton addGestureRecognizer:overlayNoButtonTap];
    
}

- (void)viewWillAppear:(BOOL)animated {
    // if we ever go back to this view controller, we should make sure the overlay is hidden
    self.overlayView.alpha = 0;
}

// TODO: VIRO-448, we removed left panel from V1
//- (void)openLeftPanel {
//    if (self.revealViewController.frontViewPosition == FrontViewPositionLeft) {
//        [self.revealViewController setFrontViewPosition:FrontViewPositionRight
//                                               animated:YES];
//    } else {
//        [self.revealViewController setFrontViewPosition:FrontViewPositionLeft
//                                               animated:YES];
//    }
//}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (NSArray *)getCardContents {
#warning do this better!
    return
        @[
            @{
                kTitleKey: @"Flickr Photo Explorer",
                kImageKey: @"nativeapp_card_flickr.png",
                kDescriptionKey: @"Immerse yourself in both 360 and regular photos in this simple but powerful experience.",
                kViroSceneName: @"HelloWorldScene"
            },
            @{
                kTitleKey: @"360 Photo Tour",
                kImageKey: @"nativeapp_card_phototour.png",
                kDescriptionKey: @"Taking 360 photos further with interactivity.",
                kViroSceneName: @"HelloWorldScene"
            },
            @{
                kTitleKey: @"Viro Media Player",
                kImageKey: @"nativeapp_card_video.png",
                kDescriptionKey: @"Viro Media Player is a sample app that represents 4 unique immersive viewing experiences in VR.",
                kViroSceneName: @"HelloWorldScene"
            },
            @{
                kTitleKey: @"Inside the Human Body",
                kImageKey: @"nativeapp_card_human_body.png",
                kDescriptionKey: @"Go inside the human body and up close to the heart and brain in this power 3D experience.",
                kViroSceneName: @"HelloWorldScene"
            }
        ];
}

- (void)hideOverlay {
    [UIView animateWithDuration:0.2 animations:^{
        self.overlayView.alpha = 0;
    }];
}

- (void)showOverlay {
    [UIView animateWithDuration:0.2 animations:^{
        self.overlayView.alpha = 1;
    }];
}

- (void)deselectAndShowOverlay {
    // Deselect the row to make it look like the row was clicked
    [self.samplesTableView deselectRowAtIndexPath:[self.samplesTableView indexPathForSelectedRow] animated:NO];

    // show the overlay.
    [self showOverlay];
}

- (void)enterViroSceneInVRMode {
    [self enterViroSceneInVRMode:YES];
}

- (void)enterViroSceneIn360Mode {
    [self enterViroSceneInVRMode:NO];
}

- (void)enterViroSceneInVRMode:(BOOL)vrMode {
#warning this seems to take a while, so we should add a loading screen & deselect yes?
    NSString *sceneName = [[[self getCardContents] objectAtIndex:self.selectedRow] objectForKey:kViroSceneName];
    ViroSceneViewController *vc = [[ViroSceneViewController alloc] initWithSceneName:sceneName vrMode:vrMode previousVC:self];
    [self presentViewController:vc animated:YES completion:nil];
}

#pragma mark - UITableViewDelegate

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    self.selectedRow = indexPath.row;

    // iOS's tableview selection logic leaves the row selected, so we want to deselect and then show
    // the overlay to make it look like the row was tapped.
    [self performSelector:@selector(deselectAndShowOverlay) withObject:nil afterDelay:.15];
}

#pragma mark - UITableViewDataSource

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [[self getCardContents] count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    SamplesTableViewCell *cell = (SamplesTableViewCell *)[tableView dequeueReusableCellWithIdentifier:kSampleCellReuseIdentifier];
    
    if (!cell) {
        NSArray *nib = [[NSBundle mainBundle] loadNibNamed:kSamplesTableViewCellXib owner:self options:nil];
        cell = [nib objectAtIndex:0];
    }

    NSDictionary *cardContent = [[self getCardContents] objectAtIndex:indexPath.row];

    UIImage *image = [UIImage imageNamed:[cardContent valueForKey:kImageKey]];

    // Create 2 background images 1 normal and 1 "selected" with a black image w/ 50% alpha
    cell.backgroundView = [[UIImageView alloc] initWithImage:image];
    cell.selectedBackgroundView = [[UIImageView alloc] initWithImage:image];
    UIView *overlay = [[UIView alloc] initWithFrame:CGRectMake(0, 0, cell.selectedBackgroundView.frame.size.width, cell.selectedBackgroundView.frame.size.height / 2)];
    [overlay setBackgroundColor:[UIColor colorWithRed:0 green:0 blue:0 alpha:0.5]];
    [cell.selectedBackgroundView addSubview:overlay];
    
    cell.titleLabel.text = [cardContent valueForKey:kTitleKey];
    cell.descriptionLabel.text = [cardContent valueForKey:kDescriptionKey];
    cell.descriptionLabel.numberOfLines = 0;
    cell.descriptionLabel.lineBreakMode = NSLineBreakByWordWrapping;

    return cell;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    return self.view.frame.size.width / 2; // 360 photos usually have a 2:1 aspect ratio (width:height)
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
