import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Pet } from "@pet-tracker/types";
import { ConfirmModal } from "./ConfirmModal";

interface Props {
  pet: Pet;
  onDelete?: () => void;
  onSelect?: () => void;
  isSelected?: boolean;
}

export function PetCard({ pet, onDelete, onSelect, isSelected }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/images/search")
      .then((res) => res.json())
      .then((data) => setImageUrl(data[0]?.url ?? null))
      .catch(() => {});
  }, []);

  const speciesBreed = pet.breed ? `${pet.species} · ${pet.breed}` : pet.species;

  return (
    <Pressable
      onPress={onSelect}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      className={`bg-white rounded-2xl overflow-hidden shadow-sm flex-1 active:opacity-90 active:scale-[0.97] hover:shadow-md hover:scale-[1.02] ${isSelected ? "border-2 border-lime-500" : "border-2 border-transparent"}`}
    >
      <View className="h-40 bg-lime-100 items-center justify-center">
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            accessibilityLabel={`Photo of ${pet.name}`}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <Text className="text-4xl font-bold text-lime-300">{pet.name[0]}</Text>
        )}
        {onDelete && (
          <Pressable
            accessibilityLabel={`Delete ${pet.name}`}
            onPress={() => setConfirmVisible(true)}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 items-center justify-center"
          >
            <Ionicons name="trash-outline" size={16} color="#ef4444" />
          </Pressable>
        )}
      </View>
      <View className="p-4">
        <Text className="text-base font-bold text-gray-900">{pet.name}</Text>
        <Text className="text-sm text-gray-500 mt-1">{speciesBreed}</Text>
        {pet.dateOfBirth && (
          <Text className="text-xs text-gray-400 mt-2">Born {pet.dateOfBirth.slice(0, 10)}</Text>
        )}
      </View>
      <ConfirmModal
        visible={confirmVisible}
        title="Delete pet"
        message={`Are you sure you want to delete ${pet.name}? This action cannot be undone.`}
        onCancel={() => setConfirmVisible(false)}
        onConfirm={() => {
          setConfirmVisible(false);
          onDelete?.();
        }}
      />
    </Pressable>
  );
}
