#!/usr/bin/env bash

patch -i changes/411c411c.diff node_modules/react-native/ReactAndroid/src/main/java/com/facebook/react/ReactInstanceManager.java
patch -i changes/3940c3940.diff node_modules/react-native/React/Base/RCTDefines.h
patch -i changes/129c129.diff node_modules/react-native/React/Base/RCTAssert.m
patch -i changes/32f1851.diff node_modules/react-native/ReactAndroid/release.gradle
