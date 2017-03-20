/*
 * Copyright © 2017 Viro Media. All rights reserved.
 */
package com.viromedia.viromedia.adapter;

import android.content.Context;
import android.content.Intent;
import android.content.res.AssetManager;
import android.graphics.Typeface;
import android.net.Uri;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.viromedia.viromedia.EnterTestbedActivity;
import com.viromedia.viromedia.R;
import com.viromedia.viromedia.ViroSceneActivity;

public class NavigationDrawerAdapter extends BaseAdapter {
    private Context mContext;
    private int[] mDrawerImages;
    private String[] mDrawerListText;
    private String mHeaderText;
    private LayoutInflater mLayoutInflater;

    public NavigationDrawerAdapter(Context context, String headerText, String[] drawerText,
                                   int[] drawerImages) {
        mContext = context;
        mHeaderText = headerText;
        mDrawerListText = drawerText;
        mDrawerImages = drawerImages;
        mLayoutInflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);

    }
    @Override
    public int getCount() {
        // +1 for the header
        return mDrawerListText.length + 1;
    }

    @Override
    public Object getItem(int position) {
        return position;
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(final int position, View convertView, ViewGroup parent) {
        // For fonts
        AssetManager assetManager = mContext.getAssets();

        View rowView;
        Typeface regular = Typeface.createFromAsset(assetManager, "fonts/Raleway-Regular.ttf");

        if (position == 0) {
            rowView = mLayoutInflater.inflate(R.layout.drawer_list_header, null);
            TextView headerTextView = (TextView) rowView.findViewById(R.id.header_text);
            headerTextView.setText(mHeaderText);
            headerTextView.setTypeface(regular);
        } else {
            rowView = mLayoutInflater.inflate(R.layout.drawer_list_item, null);
            ImageView imgView = (ImageView) rowView.findViewById(R.id.drawer_item_image);
            imgView.setImageResource(mDrawerImages[position - 1]);

            TextView titleView = (TextView) rowView.findViewById(R.id.drawer_item_text);
            titleView.setText(mDrawerListText[position - 1]);
            titleView.setTypeface(regular);
        }
        rowView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if (position == 1) {
                    Intent browserIntent = new Intent(Intent.ACTION_VIEW,
                            Uri.parse("http://www.viromedia.com/support"));
                    mContext.startActivity(browserIntent);
                }
                if (position == 2) {
                    Intent intent = new Intent(mContext, EnterTestbedActivity.class);
                    mContext.startActivity(intent);
                }
            }
        });
        return rowView;
    }
}
