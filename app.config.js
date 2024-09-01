export default {
  expo: {
    name: "Digimazdoor",
    slug: "Digimazdoor",
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
      bundleIdentifier: "com.fahad999.mazdoorapp",
      buildNumber: "3.0.0",
    },
    android: {
      googleServicesFile: process.env.GOOGLE_SERVICES,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.fahad999.mazdoorapp",
      versionCode: 3,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "482e2f36-fc4e-4ca9-8561-8d15aa69eb55",
      },
    },
  },
};
