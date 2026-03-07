import { Modal, Pressable, Text, View } from "react-native";

interface Props {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  visible,
  title,
  message,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onCancel}>
      <Pressable className="flex-1 bg-black/40 items-center justify-center px-6" onPress={onCancel}>
        <Pressable
          className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-lg"
          onPress={() => {}}
        >
          <Text className="text-lg font-bold text-gray-900 mb-2">{title}</Text>
          <Text className="text-sm text-gray-500 mb-6">{message}</Text>
          <View className="flex-row gap-3 justify-end">
            <Pressable onPress={onCancel} className="px-4 py-2 rounded-lg border border-gray-200">
              <Text className="text-sm font-medium text-gray-700">Cancel</Text>
            </Pressable>
            <Pressable onPress={onConfirm} className="px-4 py-2 rounded-lg bg-red-500">
              <Text className="text-sm font-medium text-white">{confirmLabel}</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
