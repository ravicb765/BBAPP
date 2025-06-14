# PowerShell build script for React Native app (no Expo/EAS)

Write-Host "Installing dependencies..."
npm install

Write-Host "Building Android app (APK and AAB)..."
Set-Location android
./gradlew assembleRelease
./gradlew bundleRelease
Set-Location ..

Write-Host "Android build complete! APK: android/app/build/outputs/apk/release/app-release.apk, AAB: android/app/build/outputs/bundle/release/app-release.aab"

if ($IsMacOS) {
    Write-Host "Building iOS app (requires Xcode)..."
    Set-Location ios
    xcodebuild -workspace YourApp.xcworkspace -scheme YourApp -configuration Release -derivedDataPath build
    Set-Location ..
    Write-Host "iOS build complete! App at ios/build/Build/Products/Release-iphoneos/"
} else {
    Write-Host "iOS build skipped (not on macOS)"
}
