#!/usr/bin/env bash

patch -i changes/3940c3940.diff node_modules/react-native/React/Base/RCTDefines.h
patch -i changes/129c129.diff node_modules/react-native/React/Base/RCTAssert.m

