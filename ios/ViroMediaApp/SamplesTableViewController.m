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
static NSString *const kSamplesTableViewCellXib = @"SamplesTableViewCell";

// card content keys
static NSString *const kTitleKey = @"title";
static NSString *const kImageKey = @"image";
static NSString *const kDescriptionKey = @"description";
static NSString *const kViroSceneName = @"viroSceneName";

@interface SamplesTableViewController ()

@property (nonatomic, assign) NSInteger selectedRow;
@property (nonatomic, assign) NSInteger numberLogoTaps;
@property (nonatomic, weak, nullable) SamplesTableViewHeader *headerView;

@end

@implementation SamplesTableViewController

- (void)viewDidLoad {
    [super viewDidLoad];
#warning refactor this method to use some helper methods. Ideally splitting up setup into 3 helper funcs for: header, tableview and overlay.

    // Tell the revealViewController to add a panGestureRecognizer to this view
    [[self revealViewController] panGestureRecognizer];
    [[self revealViewController] tapGestureRecognizer];

    // Set self as the delegate and datasource for the tableview
    [self.samplesTableView setDelegate:self];
    [self.samplesTableView setDataSource:self];

    // Also remove the separators
    self.samplesTableView.separatorStyle = UITableViewCellSeparatorStyleNone;

    // Load in the header xib and grab the first (and only) view and add it as the header.
    NSArray *viewsInHeaderXib = [[NSBundle mainBundle] loadNibNamed:kHeaderViewXibName owner:self options:nil];
    self.headerView = [viewsInHeaderXib objectAtIndex:0];
    [self.headerView setFrame:CGRectMake(0, 0, self.view.frame.size.width, kHeaderRecommendedHeight)];
    [self.headerView layoutIfNeeded];
    // We don't want the header view to ever resize (because it should only ever be in portrait mode)
    self.headerView.autoresizingMask = UIViewAutoresizingNone;

    // show only the menu button
    [self.headerView showMenuButton];

    UITapGestureRecognizer *openLeftPanelTap =
            [[UITapGestureRecognizer alloc] initWithTarget:self
                                                    action:@selector(openLeftPanel)];
    [self.headerView.menuButton addGestureRecognizer:openLeftPanelTap];
    
    // "start" the tableview below the header view.
    [self.samplesTableView setContentInset:UIEdgeInsetsMake(kHeaderRecommendedHeight, 0, 0, 0)];
    self.automaticallyAdjustsScrollViewInsets = NO;
    
    [self.view addSubview:self.headerView];
    [self.view bringSubviewToFront:self.headerView];

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

    // reset the number of logo taps
    self.numberLogoTaps = 0;
}

- (void)openLeftPanel {
    if (self.revealViewController.frontViewPosition == FrontViewPositionLeft) {
        [self.revealViewController setFrontViewPosition:FrontViewPositionRight
                                               animated:YES];
    } else {
        [self.revealViewController setFrontViewPosition:FrontViewPositionLeft
                                               animated:YES];
    }
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (NSArray *)getCardContents {
#warning do this better!
    return
        @[
            @{
                kTitleKey: @"360 Photo Tour",
                kImageKey: @"nativeapp_card_wework.png",
                kDescriptionKey: @"Taking 360 photos further with interactivity.",
                kViroSceneName: @"360 Photo Tour"
            },
            @{
                kTitleKey: @"Viro Media Player",
                kImageKey: @"nativeapp_card_video.png",
                kDescriptionKey: @"Two unique immersive viewing experiences in VR.",
                kViroSceneName: @"Viro Media Player"
            },
            @{
                kTitleKey: @"The Human Heart",
                kImageKey: @"nativeapp_card_heart.png",
                kDescriptionKey: @"View the heart up close in this powerful 3D experience.",
                kViroSceneName: @"Inside the Human Body"
            },
            @{
              kTitleKey: @"Flickr Photo Explorer",
              kImageKey: @"nativeapp_card_flickr.png",
              kDescriptionKey: @"Immerse yourself in both 360 and regular photos in this simple but powerful experience.",
              kViroSceneName: @"HelloWorldScene"
            },
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
  NSString *sceneName = [[[self getCardContents] objectAtIndex:self.selectedRow] objectForKey:kViroSceneName];
  ViroSceneViewController *vc = [[ViroSceneViewController alloc] initWithSceneName:sceneName vrMode:vrMode];
  
  if(vrMode) {
      [self addChildViewController:vc];
      vc.view.frame = CGRectMake(0, 0, self.view.frame.size.width,self.view.frame.size.height);
      [self.view addSubview:vc.view];
      [vc didMoveToParentViewController:self];
      [self hideOverlay];
    }else{
      vc.modalPresentationStyle = UIModalPresentationFullScreen;
      [self presentViewController:vc animated:YES completion:nil];
    }
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
#warning we're using a fixed number because the "Coming Soon" overlay doesn't look as good, so just hide the ones that aren't active
    return 3;//[[self getCardContents] count];
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
    UIView *overlay = [[UIView alloc] initWithFrame:CGRectMake(0, 0, cell.frame.size.width, self.view.frame.size.height)];
    [overlay setBackgroundColor:[UIColor colorWithRed:0 green:0 blue:0 alpha:0.5]];
    [cell.selectedBackgroundView addSubview:overlay];
    
    cell.titleLabel.text = [cardContent valueForKey:kTitleKey];
    cell.descriptionLabel.text = [cardContent valueForKey:kDescriptionKey];
    cell.descriptionLabel.numberOfLines = 0;
    cell.descriptionLabel.lineBreakMode = NSLineBreakByWordWrapping;

#warning the "Coming Soon" overlay doesn't look as good, so we've decided to just hide them by simply fixing tableView:numberOfRowsInSection:, so we may want to just remove the "Coming Soon" overlay and this logic altogether.
    // if the sample isn't ready, make it not interactable and add a Coming Soon overlay
    if (indexPath.row > 2) {
        cell.selectionStyle = UITableViewCellSelectionStyleNone;
        cell.comingSoonView.hidden = NO;
    } else {
        cell.selectionStyle = UITableViewCellSelectionStyleDefault;
        cell.comingSoonView.hidden = YES;
    }

    return cell;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    return self.view.frame.size.width / 2; // 360 photos have a 2:1 aspect ratio (width:height)
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
