package com.viromedia.viromedia;

import android.os.Bundle;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.ListView;

import com.viromedia.viromedia.adapter.NavigationDrawerAdapter;
import com.viromedia.viromedia.adapter.ViroSceneListAdapter;


public class MainActivity extends AppCompatActivity {
    private String[] mDrawerTitles;
    private int[] mDrawerImages;
    private DrawerLayout mDrawerLayout;
    private ListView mDrawerList;
    private ActionBarDrawerToggle mDrawerToggle;
    private Toolbar mToolbar;
    private String[] mSceneListTitles;
    private String[] mSceneListSubTitles;
    private int[] mSceneListBackgroundImages;
    private String[] mSceneNames;
    private ListView mSceneListView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);

        mToolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(mToolbar);
        getSupportActionBar().setDisplayShowTitleEnabled(false);
        setupDrawer();
        setupSceneListView();
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

    private void setupSceneListView() {
        // TODO send a list of object instead of 3 different lists
        mSceneListTitles = new String[]{getString(R.string.photo_tour_title),
                getString(R.string.media_player_title),
                getString(R.string.human_heart_title)};
        mSceneListSubTitles = new String[]{getString(R.string.photo_tour_subtitle),
                getString(R.string.media_player_subtitle),
                getString(R.string.human_heart_subtitle)};
        mSceneListBackgroundImages = new int[]{R.drawable.card_360phototour,
                R.drawable.card_mediaplayer,
                R.drawable.card_humanheart};
        mSceneNames = new String[]{"360 Photo Tour", "Viro Media Player", "Inside the Human Body"};
        mSceneListView = (ListView) findViewById(R.id.viro_scene_list);
        mSceneListView.setAdapter(new ViroSceneListAdapter(this, mSceneListTitles,
                mSceneListSubTitles,
                mSceneListBackgroundImages, mSceneNames));
        mSceneListView.setOverScrollMode(View.OVER_SCROLL_ALWAYS);
    }

    private void setupDrawer() {
        mDrawerTitles = new String[]{getString(R.string.support),
                getString(R.string.enter_testbed)};
        mDrawerImages = new int[]{R.drawable.icon_support, R.drawable.icon_testbed};
        mDrawerLayout = (DrawerLayout) findViewById(R.id.drawer_layout);
        mDrawerList = (ListView) findViewById(R.id.left_drawer);

        // Set the adapter for the list view
        mDrawerList.setAdapter(new NavigationDrawerAdapter(this, getString(R.string.viro_media),
                mDrawerTitles, mDrawerImages));

        mDrawerToggle = new ActionBarDrawerToggle(this,
                mDrawerLayout, mToolbar, R.string.viro_media, R.string.viro_media);

        mDrawerToggle.setDrawerIndicatorEnabled(false);
        if (getSupportActionBar() != null) {
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
            getSupportActionBar().setDefaultDisplayHomeAsUpEnabled(false);
        }
        mDrawerToggle.setHomeAsUpIndicator(R.drawable.btn_sidepanel);
        mDrawerToggle.setToolbarNavigationClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (mDrawerLayout.isDrawerOpen(GravityCompat.START)) {
                    mDrawerLayout.closeDrawer(GravityCompat.START);
                } else {
                    mDrawerLayout.openDrawer(GravityCompat.START);
                }
            }
        });
    }
}
