
#!/bin/bash

echo "🚀 Starting build process for OT Skills Mobile App"

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo "📦 Installing EAS CLI..."
    npm install -g @expo/eas-cli
fi

# Login to Expo (if not already logged in)
echo "🔐 Please make sure you're logged into Expo..."
eas whoami || eas login

echo "📱 Choose build type:"
echo "1. Android APK (for testing)"
echo "2. Android AAB (for Play Store)"
echo "3. iOS (for App Store)"
echo "4. Both Android and iOS"

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo "🤖 Building Android APK..."
        eas build --platform android --profile preview
        ;;
    2)
        echo "🤖 Building Android AAB..."
        eas build --platform android --profile production
        ;;
    3)
        echo "🍎 Building iOS..."
        eas build --platform ios --profile production
        ;;
    4)
        echo "📱 Building for both platforms..."
        eas build --platform all --profile production
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo "✅ Build process initiated! Check your Expo dashboard for progress."
