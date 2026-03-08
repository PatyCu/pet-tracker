import { Image, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import kiwiLogo from "../../assets/kiwi-logo.png";
import { PetCardSkeleton } from "./PetCardSkeleton";
import { Sidebar } from "./Sidebar";

function PetSkeletons() {
  return (
    <View className="flex-row flex-wrap gap-4">
      <View className={Platform.OS === "web" ? "w-64" : "w-[48%]"}>
        <PetCardSkeleton />
      </View>
      <View className={Platform.OS === "web" ? "w-64" : "w-[48%]"}>
        <PetCardSkeleton />
      </View>
    </View>
  );
}

export function HomeLoadingView() {
  if (Platform.OS === "web") {
    return (
      <View className="flex-1 flex-row">
        <Sidebar />
        <ScrollView className="flex-1 bg-stone-100" contentContainerClassName="p-8">
          <View className="flex-row items-center gap-3 mb-6">
            <Image source={kiwiLogo} style={{ width: 48, height: 48 }} />
            <Text className="text-3xl font-bold">
              <Text className="text-lime-600">Kiwi</Text>
              <Text className="text-gray-900">Tracker</Text>
            </Text>
          </View>
          <Text className="text-3xl font-bold text-gray-900 mb-1">Select your Pet</Text>
          <Text className="text-base text-gray-500 mb-6">
            Track activity, health, and location in real-time.
          </Text>
          <PetSkeletons />
        </ScrollView>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        <View className="flex-row items-center gap-2 mb-6">
          <Image source={kiwiLogo} style={{ width: 28, height: 28 }} />
          <Text className="text-2xl font-bold text-lime-700">Pet Tracker</Text>
        </View>
        <PetSkeletons />
      </View>
    </SafeAreaView>
  );
}
