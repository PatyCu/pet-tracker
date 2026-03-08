import { useCallback, useEffect, useState } from "react";
import { Image, Platform, Pressable, ScrollView, Text, View } from "react-native";
import kiwiLogo from "../assets/kiwi-logo.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import type { Pet } from "@pet-tracker/types";
import { API_URL } from "@/lib/api";
import { PetCard } from "@/components/PetCard";
import { PetCardSkeleton } from "@/components/PetCardSkeleton";
import { AddPetForm } from "@/components/AddPetForm";
import { AddPetCard } from "@/components/AddPetCard";
import { Sidebar } from "@/components/Sidebar";
import { HealthEventsPlaceholder } from "@/components/HealthEventsPlaceholder";

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

export default function HomeScreen() {
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const handleSelectPet = useCallback(
    (pet: Pet) => setSelectedPet((prev) => (prev?.id === pet.id ? null : pet)),
    [],
  );

  const fetchPets = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/pets`);
      if (response.ok) {
        const data = await response.json();
        setPets(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePet = useCallback(
    async (id: string) => {
      await fetch(`${API_URL}/api/v1/pets/${id}`, { method: "DELETE" });
      fetchPets();
    },
    [fetchPets],
  );

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  if (loading) {
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

  if (pets.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-6">
        <View className="flex-row items-center gap-2">
          <Image source={kiwiLogo} style={{ width: 32, height: 32 }} />
          <Text className="text-3xl font-bold text-lime-600">Pet Tracker</Text>
        </View>
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
