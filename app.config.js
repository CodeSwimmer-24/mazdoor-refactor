export default {
  expo: {
    name: "mazdoor-app",
    slug: "mazdoor-app",
    plugins: ["@react-native-google-signin/google-signin"],
    version: "1.0.0",
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
    },
    android: {
      googleServicesFile: process.env.GOOGLE_SERVICES,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.fahad999.mazdoorapp",
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
