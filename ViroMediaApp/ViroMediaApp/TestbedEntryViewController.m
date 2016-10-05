//
//  TestbedEntryViewController.m
//  ViroMediaApp
//
//  Created by Andy Chu on 10/3/16.
//  Copyright © 2016 Viro Media. All rights reserved.
//

#import "TestbedEntryViewController.h"
#import "SamplesTableViewHeader.h"
#import "ViroSceneViewController.h"

static NSString *const kInvalidIpMessage = @"[%@] is an invalid IP Address! Please enter an IP Address between 0.0.0.0 and 255.255.255.255.";

// Key used to store the last IP in NSUserDefaults.
static NSString *const kLastIpAddressKey = @"TEST_BED_LAST_IP";

@interface TestbedEntryViewController ()

@end

@implementation TestbedEntryViewController

// Override the following 3 methods to fix this view controller to portrait
- (BOOL)shouldAutorotate {
    return NO;
}

- (UIInterfaceOrientationMask)supportedInterfaceOrientations {
    return UIInterfaceOrientationMaskPortrait;
}

- (UIInterfaceOrientation)preferredInterfaceOrientationForPresentation {
    return UIInterfaceOrientationPortrait;
}

- (void)viewDidLoad {
    [super viewDidLoad];

    // onTap for back button
    UITapGestureRecognizer *backButtonTap =
            [[UITapGestureRecognizer alloc] initWithTarget:self
                                                    action:@selector(dismissSelf)];
    [self.backButton addGestureRecognizer:backButtonTap];

    // Add button callback
    [self.enterButton addTarget:self action:@selector(enterViroTestbed) forControlEvents:UIControlEventTouchUpInside];

    // Add text field 'enter' callback
    [self.ipTextField addTarget:self action:@selector(enterViroTestbed) forControlEvents:UIControlEventEditingDidEndOnExit];

    // Change keyboard return key to 'Go'
    self.ipTextField.returnKeyType = UIReturnKeyGo;

    UITapGestureRecognizer *dismissKeyboardTap =
            [[UITapGestureRecognizer alloc] initWithTarget:self
                                                    action:@selector(dismissKeyboard)];
    [self.view addGestureRecognizer:dismissKeyboardTap];
}

- (void)viewWillAppear:(BOOL)animated {
    NSString *lastIpAddress = [[NSUserDefaults standardUserDefaults] stringForKey:kLastIpAddressKey];
    if (lastIpAddress) {
        [self showPreviousIp:lastIpAddress];
    } else {
        [self hidePreviousIpViews];
    }
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)showPreviousIp:(NSString *)ipAddress {
    self.previousIpTitle.hidden = NO;
    self.previousIpText.hidden = NO;
    self.previousIpText.text = ipAddress;

    UITapGestureRecognizer *previousIpTitleTap =
            [[UITapGestureRecognizer alloc] initWithTarget:self
                                                    action:@selector(goToPreviousIp)];
    [self.previousIpTitle addGestureRecognizer:previousIpTitleTap];

    UITapGestureRecognizer *previousIpTextTap =
    [[UITapGestureRecognizer alloc] initWithTarget:self
                                            action:@selector(goToPreviousIp)];
    [self.previousIpText addGestureRecognizer:previousIpTextTap];

    self.previousIpTitle.userInteractionEnabled = YES;
    self.previousIpText.userInteractionEnabled = YES;
}

- (void)hidePreviousIpViews {
    self.previousIpTitle.hidden = YES;
    self.previousIpText.hidden = YES;
}

- (void)goToPreviousIp {
    self.ipTextField.text = self.previousIpText.text;
    [self enterViroTestbed];
}

- (void)dismissSelf {
    [self dismissViewControllerAnimated:YES completion:nil];
}

- (void)dismissKeyboard {
    [self.view endEditing:YES];
}

- (void)enterViroTestbed {
    // dismiss keyboard
    [self.view endEditing:YES];
    if ([self isValidIp:self.ipTextField.text]) {
        // clear out the error text since the ip address was valid
        self.errorText.text = @"";
        // store the last ip address in NSUserDefaults
        [[NSUserDefaults standardUserDefaults] setValue:self.ipTextField.text forKey:kLastIpAddressKey];

        ViroSceneViewController *vc = [[ViroSceneViewController alloc] initForTestbed:self.ipTextField.text];
        [self presentViewController:vc animated:YES completion:nil];
    } else {
        self.errorText.text = [NSString stringWithFormat:kInvalidIpMessage, self.ipTextField.text];
    }
}

- (BOOL)isValidIp:(NSString *)candidate {
    NSArray *octets = [candidate componentsSeparatedByString:@"."];
    if (octets.count != 4) {
        return NO;
    }
    // seriously iOS needs a better way to do this...
    NSNumberFormatter *formatter = [[NSNumberFormatter alloc] init];
    for (NSString *octet in octets) {
        NSNumber *numOctet = [formatter numberFromString:octet];
        // NSNumberFormatter returns nil if the given string isn't a number.
        if (!numOctet || [numOctet integerValue] < 0 || [numOctet integerValue] > 255) {
            return NO;
        }
    }
    return YES;
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
