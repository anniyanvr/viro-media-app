/*
 * Copyright © 2017 Viro Media. All rights reserved.
 */
package com.viromedia.viromedia;

import android.os.Bundle;
import android.view.View;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;

public class ViroTestBedViroActivity extends ReactActivity {

    private boolean mRefreshWhenResumed;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        MainApplication application = (MainApplication)getApplication();
        // Check if a ReactInstanceManager has been created or not. If it hasn't then reload
        // the JS files in onResume.
        if(application.getDebugReactNativeHost().hasInstance()) {
            mRefreshWhenResumed = true;
        } else {
            mRefreshWhenResumed = false;
        }
        super.onCreate(savedInstanceState);
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

        if(mRefreshWhenResumed) {
            this.getReactInstanceManager().recreateReactContextInBackground();
            mRefreshWhenResumed = false;
       }

    }

    @Override
    public void onPause() {
        super.onPause();
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
        return new ViroReactActivityDelegate(this, getMainComponentName(), true);
    }
}
