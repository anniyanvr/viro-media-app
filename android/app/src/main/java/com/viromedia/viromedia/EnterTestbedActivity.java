/*
 * Copyright © 2017 Viro Media. All rights reserved.
 */
package com.viromedia.viromedia;

import android.app.Activity;
import android.app.ActivityManager;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.AssetManager;
import android.graphics.Typeface;
import android.preference.PreferenceManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.method.LinkMovementMethod;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;

import com.google.android.gms.analytics.Tracker;
import com.google.android.gms.analytics.HitBuilders;
import com.google.android.gms.analytics.HitBuilders.EventBuilder;

public class EnterTestbedActivity extends AppCompatActivity {
    public final static String EXTRA_IP_ADDRESS = "com.viromedia.IP_ADDRESS";
    public static final String HOST_PORT = ":8081";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_enter_testbed);
        setupTypeFaces();
        SharedPreferences preferences =
                PreferenceManager.getDefaultSharedPreferences(getApplicationContext());
        String debugHttpHost = preferences.getString("debug_http_host", "");

        EditText endpointText = (EditText) findViewById(R.id.edit_message);
        if (!debugHttpHost.isEmpty()) {
            endpointText.setText(debugHttpHost.split(EnterTestbedActivity.HOST_PORT)[0]);
        }

        ImageButton back_btn = (ImageButton) findViewById(R.id.back_btn);
        back_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

        EditText editText = (EditText) findViewById(R.id.edit_message);
        editText.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            @Override
            public void onFocusChange(View v, boolean hasFocus) {
                if (!hasFocus) {
                    hideKeyboard(v);
                }
            }
        });

        editText.setOnEditorActionListener(new EditText.OnEditorActionListener() {

            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                if (actionId == EditorInfo.IME_ACTION_DONE) {
                    hideKeyboard(v);
                    startTestBed(v);
                    return true;
                }
                return false;
            }
        });

        TextView releaseNotes = (TextView) findViewById(R.id.release_notes);
        releaseNotes.setMovementMethod(LinkMovementMethod.getInstance());
    }

    private void setupTypeFaces() {
        AssetManager assetManager = getAssets();
        Typeface semiBold = Typeface.createFromAsset(assetManager, "fonts/Raleway-SemiBold.ttf");
        Typeface regular = Typeface.createFromAsset(assetManager, "fonts/Raleway-Regular.ttf");

        TextView titleView = (TextView) findViewById(R.id.testbed_title);
        titleView.setTypeface(semiBold);

        TextView testBedStep = (TextView) findViewById(R.id.testbed_steps);
        testBedStep.setTypeface(regular);

        TextView viroVersion = (TextView) findViewById(R.id.viro_version);
        viroVersion.setTypeface(regular);
    }

    @Override
    public void onResume() {
        super.onResume();

        getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_FULLSCREEN);

    }

    public void hideKeyboard(View view) {
        InputMethodManager inputMethodManager =(InputMethodManager)getSystemService(Activity.INPUT_METHOD_SERVICE);
        inputMethodManager.hideSoftInputFromWindow(view.getWindowToken(), 0);
    }

    public void startTestBed(View view) {
        MainApplication application = (MainApplication) getApplication();
        Tracker tracker = application.getDefaultTracker();
        tracker.setScreenName("TEST_BED_ANDROID");
        tracker.send(new HitBuilders.EventBuilder()
                .setCategory("ui_action")
                .setAction("button_press")
                .setLabel("go")
                .build());

        Intent intent = new Intent(this, ViroTestBedViroActivity.class);
        EditText editText = (EditText) findViewById(R.id.edit_message);
        String ipAddr = editText.getText().toString();
        if (ipAddr != null && !ipAddr.trim().isEmpty()) {
            // We store the shared preferences value 'debug_http_host' here before the ReactActivity launches.
            // The ViroTestBedViroActivity which inherits from ReactActivity will use this value in it's onCreate.
            SharedPreferences preferences =
                    PreferenceManager.getDefaultSharedPreferences(getApplicationContext());
            String ipHost = getHttpHost(ipAddr);
            // commit the value to ensure the ReactActivity gets the proper server setting.
            preferences.edit().putString("debug_http_host", getHttpHost(ipAddr)).commit();
            intent.putExtra(EXTRA_IP_ADDRESS, ipAddr.trim());
            startActivity(intent, new Bundle());
        }
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

    /**
     * This method clears the app data, but that also causes the app to close, so keep that in mind.
     */
    public void clearAppData(View view) {
        ((ActivityManager)getApplicationContext().getSystemService(ACTIVITY_SERVICE)).clearApplicationUserData();
    }
}
