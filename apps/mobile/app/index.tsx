import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <Text className="text-3xl font-bold text-cyan-500">Pet Tracker 🥝</Text>
      <Text className="text-base text-gray-500 text-center leading-6">
        Track symptoms and changes in your pet&apos;s health 😻
      </Text>
    </View>
  );
}
