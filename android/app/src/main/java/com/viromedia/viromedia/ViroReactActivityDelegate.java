package com.viromedia.viromedia;


import android.app.Activity;
import android.util.Log;

import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactNativeHost;

import javax.annotation.Nullable;

public class ViroReactActivityDelegate extends ReactActivityDelegate {
    private final boolean mDebug;
    private final Activity mActivity;

    public ViroReactActivityDelegate(Activity activity, @Nullable String mainComponentName, boolean debug) {
        super(activity, mainComponentName);
        mDebug = debug;
        mActivity = activity;
    }

    @Override
    public ReactNativeHost getReactNativeHost() {
        MainApplication application = (MainApplication) mActivity.getApplication();
        if (mDebug) {
            return application.getDebugReactNativeHost();
        } else {
            return application.getReactNativeHost();
        }
    }

}