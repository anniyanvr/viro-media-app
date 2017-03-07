/*
 * Copyright © 2017 Viro Media. All rights reserved.
 */
package com.viromedia.viromedia;

import android.content.Intent;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;

public class EnterTestbedActivity extends AppCompatActivity {
    public final static String EXTRA_IP_ADDRESS = "com.viromedia.IP_ADDRESS";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_enter_testbed);
        SharedPreferences preferences =
                PreferenceManager.getDefaultSharedPreferences(getApplicationContext());
        String debug_http_host = preferences.getString("debug_http_host", "");
        TextView previousEndpointView = (TextView) findViewById(R.id.endpoint_string);
        if (debug_http_host.isEmpty()) {
            previousEndpointView.setVisibility(View.INVISIBLE);
        } else {
            previousEndpointView.setVisibility(View.VISIBLE);
            previousEndpointView.setText(debug_http_host);
        }

        ImageButton back_btn = (ImageButton) findViewById(R.id.back_btn);
        back_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
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

    public void startTestBed(View view) {
        Intent intent = new Intent(this, ViroTestBedViroActivity.class);
        EditText editText = (EditText) findViewById(R.id.edit_message);
        String ipAddr = editText.getText().toString();
        if (ipAddr != null || ipAddr.trim().isEmpty()) {

            intent.putExtra(EXTRA_IP_ADDRESS, ipAddr.trim());
            startActivity(intent);
        }
    }
}
