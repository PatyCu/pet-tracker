import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { CreatePetInput } from "@pet-tracker/types";
import { API_URL } from "@/lib/api";

export default function AddPetScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setError(null);
    setLoading(true);

    const body: CreatePetInput = {
      name: name.trim(),
      species: species.trim(),
      ...(breed.trim() && { breed: breed.trim() }),
      ...(dateOfBirth.trim() && { dateOfBirth: dateOfBirth.trim() }),
    };

    try {
      const response = await fetch(`${API_URL}/api/v1/pets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.status === 409) {
        const data = await response.json();
        setError(data.error ?? "A pet with that name already exists");
        return;
      }

      if (!response.ok) {
        setError(`Server error: ${response.status}`);
        return;
      }

      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        contentContainerClassName="items-center justify-center"
      >
        <View className="px-6 py-10">
          <Text className="text-3xl font-bold text-lime-700 mb-2">🥝 Add a Pet</Text>
          <Text className="text-base text-lime-950 mb-8">Tell us about your furry friend</Text>

          <View className="gap-5">
            <View>
              <Text className="text-sm font-semibold text-lime-700 mb-1">Name</Text>
              <TextInput
                className="border border-lime-300 rounded-xl px-4 py-3 bg-lime-50 text-gray-800"
                placeholder="e.g. Kiwi"
                placeholderTextColor="#86a875"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View>
              <Text className="text-sm font-semibold text-lime-700 mb-1">Species</Text>
              <TextInput
                className="border border-lime-300 rounded-xl px-4 py-3 bg-lime-50 text-gray-800"
                placeholder="e.g. Cat"
                placeholderTextColor="#86a875"
                value={species}
                onChangeText={setSpecies}
              />
            </View>

            <View>
              <Text className="text-sm font-semibold text-lime-700 mb-1">Breed</Text>
              <TextInput
                className="border border-lime-300 rounded-xl px-4 py-3 bg-lime-50 text-gray-800"
                placeholder="e.g. Domestic Shorthair"
                placeholderTextColor="#86a875"
                value={breed}
                onChangeText={setBreed}
              />
            </View>

            <View>
              <Text className="text-sm font-semibold text-lime-700 mb-1">Date of Birth</Text>
              <TextInput
                className="border border-lime-300 rounded-xl px-4 py-3 bg-lime-50 text-gray-800"
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#86a875"
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
              />
            </View>
          </View>

          {error && <Text className="mt-4 text-sm text-red-600">{error}</Text>}

          <Pressable
            className="mt-8 rounded-xl bg-lime-600 px-6 py-4 items-center"
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-base">Add Pet</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
