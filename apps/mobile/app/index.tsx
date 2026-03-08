import { useCallback, useState } from "react";
import { Image, Platform, ScrollView, Text, View } from "react-native";
import kiwiLogo from "../assets/kiwi-logo.png";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Pet } from "@pet-tracker/types";
import { PetCard } from "@/components/PetCard";
import { AddPetForm } from "@/components/AddPetForm";
import { AddPetCard } from "@/components/AddPetCard";
import { Sidebar } from "@/components/Sidebar";
import { HealthEventsPlaceholder } from "@/components/HealthEventsPlaceholder";
import { usePets } from "@/hooks/usePets";
import { HomeLoadingView } from "@/components/HomeLoadingView";
import { EmptyStateView } from "@/components/EmptyStateView";

export default function HomeScreen() {
  const { pets, loading, fetchPets, deletePet } = usePets();
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const handleSelectPet = useCallback(
    (pet: Pet) => setSelectedPet((prev) => (prev?.id === pet.id ? null : pet)),
    [],
  );

  if (loading) return <HomeLoadingView />;
  if (pets.length === 0) return <EmptyStateView />;

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
          <View className="flex-row flex-wrap gap-4 mb-8">
            {pets.map((pet) => (
              <View key={pet.id} className="w-64">
                <PetCard
                  pet={pet}
                  onDelete={() => deletePet(pet.id)}
                  onSelect={() => handleSelectPet(pet)}
                  isSelected={selectedPet?.id === pet.id}
                />
              </View>
            ))}
            <View className="w-64">
              <AddPetCard />
            </View>
          </View>
          <View className="max-w-3xl">
            <HealthEventsPlaceholder pet={selectedPet ?? undefined} />
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerClassName="p-4">
        <View className="flex-row items-center gap-2 mb-6">
          <Image source={kiwiLogo} style={{ width: 28, height: 28 }} />
          <Text className="text-2xl font-bold text-lime-700">Pet Tracker</Text>
        </View>
        <View className="flex-row flex-wrap gap-3">
          {pets.map((pet) => (
            <View key={pet.id} className="w-[48%]">
              <PetCard pet={pet} onDelete={() => deletePet(pet.id)} />
            </View>
          ))}
        </View>
        <View className="mt-3">
          <AddPetForm onSuccess={fetchPets} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
