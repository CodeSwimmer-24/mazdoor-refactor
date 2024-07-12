export default {
  "expo": {
    "name": "mazdoor-app",
    "slug": "mazdoor-app",
    "plugins": ["@react-native-google-signin/google-signin"],
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "googleServicesFile": process.env.GOOGLE_SERVICES,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.shahilcoder.mazdoorapp"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "92907b10-5293-4d52-aa35-69f892dad590"
      }
    }
  }
};
