These instructions were taken/modified from https://facebook.github.io/react-native/docs/android-building-from-source.html

0) Make sure you've run `npm install` to get the node_modules first
1) Download the right NDK for your platform: https://facebook.github.io/react-native/docs/android-building-from-source.html#download-links-for-android-ndk
2) Unzip/unpack the downloaded NDK wherever (I did it in downloads) and point the `ndk.dir` property in `android/local.properties` to it.
3) In the Project's build.gradle file (android/build.gradle) add this dependency:
```
        classpath 'de.undercouch:gradle-download-task:3.1.2'
```
4) In the app's build.gradle file (android/app/build.gradle) replace the current `compile 'com.facebook.react:react-native:+'` dependency with `compile project(':ReactAndroid')` and at the bottom of the file add this:
```
configurations.all {
    exclude group: 'com.facebook.react', module: 'react-native'
}
```
5) In the project's settings.gradle file (android/settings.gradle) add the following:
```
include ':ReactAndroid'
project(':ReactAndroid').projectDir = new File(
        rootProject.projectDir, '../node_modules/react-native/ReactAndroid')
```
6) from this directory, run the `./applyPatch.sh` script which will effectively apply this patch: https://github.com/facebook/react-native/commit/36ab9f6a602060327c8f9af666b9174c2fba0a87 (Since I manually created that patch, it'll look *slightly* different in terms of spacing etc).
