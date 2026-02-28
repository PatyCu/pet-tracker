import Constants from "expo-constants";
import { Platform } from "react-native";

function getApiUrl(): string {
  if (process.env.EXPO_PUBLIC_API_URL) return process.env.EXPO_PUBLIC_API_URL;
  if (Platform.OS !== "web") {
    const host = Constants.expoConfig?.hostUri?.split(":")[0];
    if (host) return `http://${host}:3000`;
  }
  return "http://localhost:3000";
}

export const API_URL = getApiUrl();
