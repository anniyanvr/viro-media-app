/*
 * Copyright © 2017 Viro Media. All rights reserved.
 */
package com.viromedia.viromedia;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import com.google.android.gms.analytics.GoogleAnalytics;
import com.google.android.gms.analytics.Tracker;

import com.viromedia.bridge.ReactViroPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static GoogleAnalytics sAnalytics;
  private static Tracker sTracker;
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return false;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new ReactViroPackage(ReactViroPackage.ViroPlatform.valueOf(BuildConfig.VR_PLATFORM))
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    @Override
    protected String getBundleAssetName() {
      return "index.bundle";
    }

  };

  private final ReactNativeHost mDebugReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return true;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
              new ReactViroPackage(ReactViroPackage.ViroPlatform.valueOf(BuildConfig.VR_PLATFORM))
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    @Override
    protected String getBundleAssetName() {
      return "index.bundle";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    sAnalytics = GoogleAnalytics.getInstance(this);
  }

  /**
   * Gets the default {@link Tracker} for this {@link Application}.
   * @return tracker
   */
  synchronized public Tracker getDefaultTracker() {
    // To enable debug logging use: adb shell setprop log.tag.GAv4 DEBUG
    if (sTracker == null) {
      sTracker = sAnalytics.newTracker(R.xml.global_tracker);
    }

    return sTracker;
  }

  public ReactNativeHost getDebugReactNativeHost() {
    return mDebugReactNativeHost;
  }
}
