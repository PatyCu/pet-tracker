import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { CreatePetInput } from "@pet-tracker/types";
import { API_URL } from "@/lib/api";

interface Props {
  onSuccess: () => void;
}

export function AddPetForm({ onSuccess }: Props) {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!name.trim() || !species.trim()) {
      setError("Name and species are required");
      return;
    }
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

      setName("");
      setSpecies("");
      setBreed("");
      setDateOfBirth("");
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="bg-lime-50 border border-lime-200 rounded-2xl p-4">
      <Text className="text-base font-bold text-lime-800 mb-4">Add a Pet</Text>

      <View className="gap-3">
        <View>
          <Text className="text-xs font-semibold text-lime-700 mb-1">Name</Text>
          <TextInput
            className="border border-lime-300 rounded-xl px-3 py-2 bg-white text-gray-800"
            placeholder="e.g. Kiwi"
            placeholderTextColor="#86a875"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View>
          <Text className="text-xs font-semibold text-lime-700 mb-1">Species</Text>
          <TextInput
            className="border border-lime-300 rounded-xl px-3 py-2 bg-white text-gray-800"
            placeholder="e.g. Cat"
            placeholderTextColor="#86a875"
            value={species}
            onChangeText={setSpecies}
          />
        </View>

        <View>
          <Text className="text-xs font-semibold text-lime-700 mb-1">Breed</Text>
          <TextInput
            className="border border-lime-300 rounded-xl px-3 py-2 bg-white text-gray-800"
            placeholder="e.g. Domestic Shorthair"
            placeholderTextColor="#86a875"
            value={breed}
            onChangeText={setBreed}
          />
        </View>

        <View>
          <Text className="text-xs font-semibold text-lime-700 mb-1">Date of Birth</Text>
          <TextInput
            className="border border-lime-300 rounded-xl px-3 py-2 bg-white text-gray-800"
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#86a875"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
          />
        </View>
      </View>

      {error && <Text className="mt-3 text-sm text-red-600">{error}</Text>}

      <Pressable
        className="mt-4 rounded-xl bg-lime-600 px-4 py-3 items-center"
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-sm">Add Pet</Text>
        )}
      </Pressable>
    </View>
  );
}
