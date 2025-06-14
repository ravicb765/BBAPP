#!/bin/bash
# Build script for React Native app (no Expo/EAS)

set -e

echo "Installing dependencies..."
npm install

echo "Building Android app (APK and AAB)..."
cd android
./gradlew assembleRelease
./gradlew bundleRelease
cd ..

echo "Android build complete! APK: android/app/build/outputs/apk/release/app-release.apk, AAB: android/app/build/outputs/bundle/release/app-release.aab"

if [[ "$OSTYPE" == "darwin"* ]]; then
  echo "Building iOS app (requires Xcode)..."
  cd ios
  xcodebuild -workspace YourApp.xcworkspace -scheme YourApp -configuration Release -derivedDataPath build
  cd ..
  echo "iOS build complete! App at ios/build/Build/Products/Release-iphoneos/"
else
  echo "iOS build skipped (not on macOS)"
fi
