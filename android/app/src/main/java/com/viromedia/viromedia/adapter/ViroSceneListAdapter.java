/*
 * Copyright © 2017 Viro Media. All rights reserved.
 */
package com.viromedia.viromedia.adapter;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.viromedia.viromedia.EnterViroSceneActivity;
import com.viromedia.viromedia.R;
import com.viromedia.viromedia.ViroSceneActivity;

public class ViroSceneListAdapter extends BaseAdapter {

    private Context mContext;
    private String[] mTitles;
    private String[] mSubTitles;
    private int[] mBackgroundImages;
    private String[] mSceneNames;
    private LayoutInflater mLayoutInflater;

    public ViroSceneListAdapter(Context context, String[] titles, String[] subTitles,
                                int[] backgroundImages, String[] sceneNames) {
        mContext = context;
        mTitles = titles;
        mSubTitles = subTitles;
        mBackgroundImages = backgroundImages;
        mLayoutInflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        mSceneNames = sceneNames;
    }

    @Override
    public int getCount() {
        return mTitles.length;
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
        View rowView = mLayoutInflater.inflate(R.layout.scene_list_item, null);
        rowView.setBackgroundResource(mBackgroundImages[position]);

        TextView titleView = (TextView) rowView.findViewById(R.id.title);
        titleView.setText(mTitles[position]);

        TextView subTitleView = (TextView) rowView.findViewById(R.id.subtitle);
        subTitleView.setText(mSubTitles[position]);

        rowView.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(mContext, EnterViroSceneActivity.class);
                intent.putExtra(ViroSceneActivity.EXTRA_SCENE_NAME, mSceneNames[position]);
                mContext.startActivity(intent);
            }
        });
        return rowView;
    }
}
