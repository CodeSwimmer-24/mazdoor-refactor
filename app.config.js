export default {
  expo: {
    name: "Digimazdoor",
    slug: "Digimazdoor",
    plugins: ["@react-native-google-signin/google-signin"],
    version: "1.1.1",
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
      bundleIdentifier: "com.fahad999.mazdoorapp",
      buildNumber: "2.0.0",
    },
    android: {
      googleServicesFile: process.env.GOOGLE_SERVICES,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.fahad999.mazdoorapp",
      versionCode: 2,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "22b84d92-fefb-4f2c-a4c6-37ac30e85a5a",
      },
    },
  },
};
