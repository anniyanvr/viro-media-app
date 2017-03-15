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

static NSString *const kInvalidEndpointMessage = @"[%@] is an invalid endpoint! Please enter an IP Address between 0.0.0.0 and 255.255.255.255 or a ngrok endpoint of the form 'xxxxx.ngrok.io'";

static NSString *const kVersionText = @"React-Viro v0.0.1";

// a validendpoint starts with `https://`.
static NSString *const kNgrokEndpointPrefix = @"https://";

// Key used to store the last endpoint in NSUserDefaults.
static NSString *const kLastEndpointKey = @"TEST_BED_LAST_ENDPOINT";

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
    [self.endpointTextField addTarget:self action:@selector(enterViroTestbed) forControlEvents:UIControlEventEditingDidEndOnExit];

    // Change keyboard return key to 'Go'
    self.endpointTextField.returnKeyType = UIReturnKeyGo;

    // Set the version text
    self.versionText.text = kVersionText;
  
    UITapGestureRecognizer *dismissKeyboardTap =
            [[UITapGestureRecognizer alloc] initWithTarget:self
                                                    action:@selector(dismissKeyboard)];
    [self.view addGestureRecognizer:dismissKeyboardTap];
}

- (void)viewWillAppear:(BOOL)animated {
    NSString *previousEndpoint = [[NSUserDefaults standardUserDefaults] stringForKey:kLastEndpointKey];
    if (previousEndpoint) {
        [self showPreviousEndpoint:previousEndpoint];
    } else {
        [self hidePreviousEndpointViews];
    }
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)showPreviousEndpoint:(NSString *)previousEndpoint {
    self.previousEndpointTitle.hidden = NO;
    self.previousEndpointText.hidden = NO;
    self.previousEndpointText.text = previousEndpoint;

    UITapGestureRecognizer *previousEndpointTitleTap =
            [[UITapGestureRecognizer alloc] initWithTarget:self
                                                    action:@selector(goToPreviousEndpoint)];
    [self.previousEndpointTitle addGestureRecognizer:previousEndpointTitleTap];

    UITapGestureRecognizer *previousEndpointTextTap =
    [[UITapGestureRecognizer alloc] initWithTarget:self
                                            action:@selector(goToPreviousEndpoint)];
    [self.previousEndpointText addGestureRecognizer:previousEndpointTextTap];

    self.previousEndpointTitle.userInteractionEnabled = YES;
    self.previousEndpointText.userInteractionEnabled = YES;
}

- (void)hidePreviousEndpointViews {
    self.previousEndpointTitle.hidden = YES;
    self.previousEndpointText.hidden = YES;
}

- (void)goToPreviousEndpoint {
    self.endpointTextField.text = self.previousEndpointText.text;
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

    // If endpoint is a valid IP, then store it and enter the Viro scene.
    NSString *endpoint = [self getValidIp:self.endpointTextField.text];
    if (endpoint) {
        // clear out the error text since the endpoint was valid
        self.errorText.text = @"";
        // store the last endpoint in NSUserDefaults
        [[NSUserDefaults standardUserDefaults] setValue:self.endpointTextField.text forKey:kLastEndpointKey];
        ViroSceneViewController *vc = [[ViroSceneViewController alloc] initForTestbedWithIp:endpoint];
        [self presentViewController:vc animated:YES completion:nil];
        return;
    }

    // If endpoint is a valid ngrok endpoint, then store and enter the Viro scene.
    endpoint = [self getValidNgrokEndpoint:self.endpointTextField.text];
    if (endpoint) {
        // clear out the error text since the endpoint was valid
        self.errorText.text = @"";
        // store the last endpoint in NSUserDefaults
        [[NSUserDefaults standardUserDefaults] setValue:self.endpointTextField.text forKey:kLastEndpointKey];
      
        ViroSceneViewController *vc = [[ViroSceneViewController alloc] initForTestbedWithNgrok:endpoint];
        [self addChildViewController:vc];
        vc.view.frame = CGRectMake(0, 0, self.view.frame.size.width,self.view.frame.size.height);
        [self.view addSubview:vc.view];
        [vc didMoveToParentViewController:self];
        return;
    }

    self.errorText.text = [NSString stringWithFormat:kInvalidEndpointMessage, self.endpointTextField.text];

}

/*
 Returns a valid IP or nil depending on whether or not the given candidate string is a valid IP.
 */
- (NSString *)getValidIp:(NSString *)candidate {
    NSArray *octets = [candidate componentsSeparatedByString:@"."];
    if (octets.count == 4) {
        // seriously iOS needs a better way to do this...
        NSNumberFormatter *formatter = [[NSNumberFormatter alloc] init];
        for (NSString *octet in octets) {
            NSNumber *numOctet = [formatter numberFromString:octet];
            // NSNumberFormatter returns nil if the given string isn't a number.
            if (!numOctet || [numOctet integerValue] >= 0 || [numOctet integerValue] <= 255) {
                return candidate;
            }
        }
    }
    return nil;
}

/*
 Returns a valid hostname endpoint or nil depending on whether or not the given
 candidate string is a valid endpoint or not. If it is, it'll format it
 to match: `https://xxxxx.xxx.xxx`.
 */

- (NSString *)getValidNgrokEndpoint:(NSString *)candidate {
    // Since 'https://' isn't a requirement, we should just add the prefix for the user if not given
    // Check if prefix is https or http, we'll implicitly add https if none is provided.
  if (![candidate hasPrefix:kNgrokEndpointPrefix] && ![candidate hasPrefix:@"http://"]) {
        candidate = [NSString stringWithFormat:@"%@%@", kNgrokEndpointPrefix, candidate];
  }

  if([self validateUrl:candidate]) {
    if ([candidate hasSuffix:@"/"]) {
      return [candidate substringToIndex:candidate.length - 1];
    }else {
      return candidate;
    }
  }

  return nil;
}

- (BOOL)validateUrl:(NSString *)candidate {
  NSString *urlRegEx = @"(http|https)://((\\w)*|([0-9]*)|([-|_])*)+([\\.|/]((\\w)*|([0-9]*)|([-|_])*))+";
  NSPredicate *urlTest = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", urlRegEx];
  return [urlTest evaluateWithObject:candidate];
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