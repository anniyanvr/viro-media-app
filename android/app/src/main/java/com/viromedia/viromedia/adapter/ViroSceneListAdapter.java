package com.viromedia.viromedia.adapter;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.viromedia.viromedia.EnterViroSceneActivity;
import com.viromedia.viromedia.R;
import com.viromedia.viromedia.ViroSceneActivity;

/**
 * Created by manish on 3/2/17.
 */

public class ViroSceneListAdapter extends BaseAdapter {
    public final static String EXTRA_SCENE_NAME = "com.viromedia.EXTRA_SCENE_NAME";
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

        ImageView imgView = (ImageView) rowView.findViewById(R.id.backgroundImage);
        imgView.setImageResource(mBackgroundImages[position]);

        TextView titleView = (TextView) rowView.findViewById(R.id.title);
        titleView.setText(mTitles[position]);

        TextView subTitleView = (TextView) rowView.findViewById(R.id.subtitle);
        subTitleView.setText(mSubTitles[position]);

        rowView.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(mContext, EnterViroSceneActivity.class);
                intent.putExtra(EXTRA_SCENE_NAME, mSceneNames[position]);
                mContext.startActivity(intent);
            }
        });
        return rowView;
    }
}
