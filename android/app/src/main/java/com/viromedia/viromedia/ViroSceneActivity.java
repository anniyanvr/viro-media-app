/*
 * Copyright © 2017 Viro Media. All rights reserved.
 */
package com.viromedia.viromedia;

import android.app.Activity;
import android.app.Dialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.content.LocalBroadcastManager;
import android.view.View;
import android.graphics.Color;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactContext;

public class ViroSceneActivity extends ReactActivity {
    public final static String EXTRA_ENABLE_VR_MODE = "com.viromedia.ENABLE_VR_MODE";
    public final static String EXTRA_SCENE_NAME = "com.viromedia.EXTRA_SCENE_NAME";
    public final static String EXTRA_DEBUG_FLAG = "com.viromedia.EXTRA_DEBUG_FLAG";
    public final static String LAUNCHED_FROM_MAIN_OR_TESTBED = "com.viromedia.LAUNCHED_FROM_MAIN";
    private String mSceneName;
    private boolean mVrMode;
    private boolean mLaunchedFromMainOrTestbed;

    private BroadcastReceiver handler = new BroadcastReceiver() {

        @Override
        public void onReceive(Context context, Intent intent) {
            if(mLaunchedFromMainOrTestbed) {
                  ViroSceneActivity.this.finish();
            } else {
                //if we launched from daydream home, exit to home screen.
                Intent startMain = new Intent(Intent.ACTION_MAIN);
                startMain.addCategory(Intent.CATEGORY_HOME);
                startMain.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(startMain);
            }
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        setContentView(R.layout.activity_viro_scene);
        Boolean launchedFromMain = this.getIntent().getBooleanExtra(ViroSceneActivity.LAUNCHED_FROM_MAIN_OR_TESTBED, false);
        mLaunchedFromMainOrTestbed = launchedFromMain.booleanValue();

        getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);


        Intent intent = getIntent();

        getReactNativeHost().getReactInstanceManager().addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
            @Override
            public void onReactContextInitialized(ReactContext context) {
                getWindow().setBackgroundDrawable(new ColorDrawable(Color.BLACK));
            }
        });

        super.onCreate(savedInstanceState);

        IntentFilter intentFilter = new IntentFilter("com.viromedia.bridge.broadcast.OnExitViro");
        LocalBroadcastManager.getInstance(this).registerReceiver(handler,intentFilter);
    }


    @Override
    public void onBackPressed() {
        if(mLaunchedFromMainOrTestbed) {
            super.onBackPressed();
        }else {
            //if we launched from daydream home, exit to home screen.
            Intent startMain = new Intent(Intent.ACTION_MAIN);
            startMain.addCategory(Intent.CATEGORY_HOME);
            startMain.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(startMain);
        }
    }

    @Override
    public void onResume() {
        super.onResume();

        getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);

    }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ViroSample";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ViroReactActivityDelegate(this, getMainComponentName(), BuildConfig.DEBUG);
    }
}
