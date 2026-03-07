import { View } from "react-native";

export function PetCardSkeleton() {
  return (
    <View accessibilityLabel="Loading pet" className="bg-white rounded-2xl overflow-hidden flex-1">
      <View className="h-40 bg-gray-200" />
      <View className="p-4 gap-2">
        <View className="h-4 w-24 bg-gray-200 rounded" />
        <View className="h-3 w-32 bg-gray-200 rounded" />
        <View className="h-3 w-20 bg-gray-200 rounded" />
      </View>
    </View>
  );
}
