import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NAV_ITEMS: {
  label: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  active?: boolean;
}[] = [
  { label: "Pets", icon: "paw", active: true },
  { label: "Logs", icon: "list-outline" },
  { label: "Calendar", icon: "calendar-outline" },
  { label: "Health Records", icon: "medkit-outline" },
  { label: "Settings", icon: "settings-outline" },
];

export function Sidebar() {
  return (
    <View className="w-48 bg-white flex-col border-r border-gray-100" style={{ minHeight: "100%" }}>
      {/* Nav items */}
      <View className="flex-1 px-2 gap-1" style={{ paddingTop: 104 }}>
        {NAV_ITEMS.map((item) => (
          <View
            key={item.label}
            className={`flex-row items-center gap-3 px-3 py-2 rounded-xl ${item.active ? "bg-lime-100" : ""}`}
          >
            <Ionicons name={item.icon} size={18} color={item.active ? "#65a30d" : "#374151"} />
            <Text
              className={`text-sm font-medium ${item.active ? "text-lime-700" : "text-gray-700"}`}
            >
              {item.label}
            </Text>
          </View>
        ))}
      </View>

      {/* User profile */}
      <View className="p-4 border-t border-gray-100 flex-row items-center gap-3">
        <View className="w-9 h-9 rounded-full bg-orange-400 items-center justify-center">
          <Text className="text-white font-bold text-sm">P</Text>
        </View>
        <View className="flex-1">
          <Text className="text-sm font-semibold text-gray-800">Pet Owner</Text>
          <Text className="text-xs text-gray-400">Free Account</Text>
        </View>
      </View>
    </View>
  );
}
