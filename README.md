# Testbed Apps (iOS and Android)

This repository contains the entire source code, built using ViroReact and React Native, for Viro Media App. Available on [Google Play](https://play.google.com/store/apps/details?id=com.viromedia.viromedia) and [App Store](https://apps.apple.com/us/app/viro-media/id1163100576).

# Usage
Follow steps outlined on our official docs [here](https://docs.viromedia.com/docs/develop-with-viro) to learn how to use these apps.

# Instructions for building:

## Building iOS app:
1. First head to https://github.com/viromedia/viro and follow instructions to build our Viro React node module.
2. Install our react-viro node_module → `npm install <path to react-viro-*.tgz from step 1>`.
3. Install rest of the node modules → `npm install`
4. Apply patches → ./applyPatch.sh (not doing this would result in hot reloading not working in the iOS app) 
5. Install pods →
   ```
   cd ios
   pod install
   ```
4. Open iOS workspace located at ios/ViroMediaApp.xcworkspace
5. (Optional)Update version string in the app located in TestBedEntryViewController.m
6. Select ViroMediaApp target in XCode located at top left.
7. Change the build configuration for the scheme from 'Debug' to 'Release'
8 Select the plugged in device and hit play. The app should build and install on device.

## Building Android app:
1. Steps #1 through #4 above are common for both iOS and Android. So you don't have to go through them if you built iOS first. If not, go through #1 - #4 above
2. Open Android studio project for the testbed app located in `android/app`. And build module `app`.
3. Open README in changes directory in the repo and verifiy all the changes mentioned there are present in your app
4. You can build the app from command line too using `./gradlew assembleGvrRelease` from within `android` folder.
Install the generated apk (from app/build/outputs/apk/gvr/release/ folder).
