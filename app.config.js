export default {
  expo: {
    name: "Digimazdoor",
    slug: "Digimazdoor-App",
    plugins: ["@react-native-google-signin/google-signin"],
    version: "1.1.2",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#2f1c6a",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.mazdoor.digimazdoor",
      buildNumber: "1.1.1",
    },
    android: {
      googleServicesFile: "./google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.mazdoor.digimazdoor",
      versionCode: 2,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "4bcb0cdf-acf8-4008-9ca4-6d0f5fdd51b1",
      },
    },
  },
};
