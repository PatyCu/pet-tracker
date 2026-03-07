import { Text, View } from "react-native";

export function HealthEventsPlaceholder() {
  return (
    <View className="bg-white rounded-2xl p-6 shadow-sm">
      <View className="mb-4">
        <Text className="text-xl font-bold text-gray-900">Upcoming Health Events</Text>
        <Text className="text-sm text-gray-400 mt-1">Schedule for the next 7 days</Text>
      </View>
      <View className="gap-4">
        {["Vet Checkup", "Monthly Deworming", "Grooming Appointment"].map((label) => (
          <View key={label} className="flex-row items-center gap-4 py-3 border-b border-gray-100">
            <View className="w-10 items-center">
              <Text className="text-xs font-bold text-gray-400 uppercase">TBD</Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-semibold text-gray-700">{label}</Text>
              <Text className="text-xs text-gray-400 mt-0.5">No date scheduled</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
