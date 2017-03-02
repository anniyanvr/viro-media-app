package com.viromedia.viromedia;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;


public class MainActivity extends AppCompatActivity {
    private String[] mDrawerTitles;
    private DrawerLayout mDrawerLayout;
    private ListView mDrawerList;
    private ActionBarDrawerToggle mDrawerToggle;
    private Toolbar mToolbar;
    private String[] mSceneListTitles;
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

    private void setupSceneListView() {
        // TODO Move to strings
        mSceneListTitles = new String[]{"360 Photo Tour", "Viro Media Player", "The Human Heart"};
        mSceneListView = (ListView) findViewById(R.id.viro_scene_list);
        mSceneListView.setAdapter(new ArrayAdapter<>(this, R.layout.scene_list_item, mSceneListTitles));
        mSceneListView.setOnItemClickListener(new SceneListItemClickListener());
    }

    private void setupDrawer() {
        // TODO Move to strings
        mDrawerTitles = new String[]{"Support", "Enter Testbed"};
        mDrawerLayout = (DrawerLayout) findViewById(R.id.drawer_layout);
        mDrawerList = (ListView) findViewById(R.id.left_drawer);

        // Set the adapter for the list view
        mDrawerList.setAdapter(new ArrayAdapter<>(this, R.layout.drawer_list_item, mDrawerTitles));
        // Set the list's click listener
        mDrawerList.setOnItemClickListener(new DrawerItemClickListener());
        mDrawerToggle = new ActionBarDrawerToggle(this,
                mDrawerLayout, mToolbar, R.string.app_name, R.string.app_name);

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

    private class SceneListItemClickListener implements ListView.OnItemClickListener {
        @Override
        public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
            selectSceneItem(position);
        }
    }
    /**
     * The click listener for ListView in the navigation drawer
     */
    private class DrawerItemClickListener implements ListView.OnItemClickListener {
        @Override
        public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
            selectDrawerItem(position);
        }
    }

    /**
     * Select drawer item, take action depending on what was clicked
     * @param position
     */
    private void selectDrawerItem(int position) {

        Toast.makeText(this, "Position selected - " + position, Toast.LENGTH_LONG).show();
    }

    private void selectSceneItem(int position) {
        Toast.makeText(this, "Position selected - " + position, Toast.LENGTH_LONG).show();
        Intent intent = new Intent(this, ViroSceneActivity.class);
        startActivity(intent);

    }
}
