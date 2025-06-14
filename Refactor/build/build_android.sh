#!/bin/bash

# Navigate to the Android project directory (adjust if necessary)
# cd android

# Clean the project
./gradlew clean

# Build the release APK
./gradlew assembleRelease

# Optional: Print the path to the generated APK
# APK_PATH=$(find . -name "*.apk" -print -quit)
# echo "Release APK built successfully at: $APK_PATH"