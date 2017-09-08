package com.viromedia.viromedia;


import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.graphics.Color;

import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactRootView;

import javax.annotation.Nullable;

public class ViroReactActivityDelegate extends ReactActivityDelegate {
    private static final String mMainMenuScene = "MainMenu";
    private final boolean mDebug;
    private final Activity mActivity;

    public ViroReactActivityDelegate(Activity activity, @Nullable String mainComponentName,
                                     boolean debug) {
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

    @Nullable
    @Override
    protected ReactRootView createRootView() {
       ReactRootView rootView = super.createRootView();
        rootView.setBackgroundColor(Color.BLACK);
       return rootView;
    }

    @Nullable
    @Override
    protected Bundle getLaunchOptions() {
        Intent intent = mActivity.getIntent();
        String sceneName = intent.getStringExtra(ViroSceneActivity.EXTRA_SCENE_NAME);
        Boolean vrMode = intent.getBooleanExtra(ViroSceneActivity.EXTRA_ENABLE_VR_MODE, true);
        Bundle initialProps = new Bundle();

        initialProps.putString("initialScene", sceneName != null ? sceneName : mMainMenuScene);
        initialProps.putBoolean("vrMode", vrMode);
        initialProps.putBoolean("debug", mDebug);
        return initialProps;
    }
}