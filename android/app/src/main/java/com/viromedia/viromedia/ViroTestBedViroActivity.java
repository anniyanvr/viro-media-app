/*
 * Copyright © 2017 Viro Media. All rights reserved.
 */
package com.viromedia.viromedia;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.view.View;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;

public class ViroTestBedViroActivity extends ReactActivity {

    public static final String HOST_PORT = ":8081";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Intent intent = getIntent();
        String ipAddr = intent.getStringExtra(EnterTestbedActivity.EXTRA_IP_ADDRESS);
        SharedPreferences preferences =
                PreferenceManager.getDefaultSharedPreferences(getApplicationContext());
        preferences.edit().putString("debug_http_host", getHttpHost(ipAddr)).apply();
    }

    private String getHttpHost(String ipOrHost) {
        if (isIp(ipOrHost)) {
            return ipOrHost + HOST_PORT;
        } else {
            // at this point this is a fully qualified name (ie. ngrok endpoint)
            return ipOrHost;
        }
    }

    private boolean isIp(String ipOrHost) {
        // split takes a regex, so we need to escape any periods as they stand for all characters
        String[] octets = ipOrHost.split("\\.");
        if (octets.length != 4) {
            return false;
        }
        for (String octet: octets) {
            int intOctet = 0;
            try {
                intOctet = Integer.valueOf(octet);
            } catch(Exception e) {
                return false;
            }
            if (intOctet < 0 || intOctet > 255) {
                return false;
            }
        }
        return true;
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
        return new ViroReactActivityDelegate(this, getMainComponentName(), true);
    }
}
