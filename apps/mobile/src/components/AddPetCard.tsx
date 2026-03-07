import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";

export function AddPetCard() {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push("/add-pet")}
      className="flex-1 bg-lime-50 border-2 border-dashed border-lime-300 rounded-2xl items-center justify-center py-10 px-4"
    >
      <View className="w-12 h-12 rounded-full border-2 border-lime-400 items-center justify-center mb-3">
        <Text className="text-2xl text-lime-500 leading-none">+</Text>
      </View>
      <Text className="text-base font-bold text-gray-800">Add New Pet</Text>
      <Text className="text-xs text-gray-400 text-center mt-1">Add your pet to start tracking</Text>
    </Pressable>
  );
}
