import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <Text className="text-3xl font-bold text-lime-600">🥝 Pet Tracker</Text>
      <Text className="text-base text-gray-500 text-center leading-6">
        Track symptoms and changes in your pet&apos;s health
      </Text>
      <Pressable
        className="mt-6 rounded-lg bg-lime-600 px-4 py-2"
        onPress={() => router.push("/add-pet")}
      >
        <Text className="text-white font-semibold">Get Started</Text>
      </Pressable>
    </View>
  );
}
