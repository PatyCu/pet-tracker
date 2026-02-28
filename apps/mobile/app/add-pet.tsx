import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddPetScreen() {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");

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
              <Text className="text-sm font-semibold text-lime-700 mb-1">Age</Text>
              <TextInput
                className="border border-lime-300 rounded-xl px-4 py-3 bg-lime-50 text-gray-800"
                placeholder="e.g. 3"
                placeholderTextColor="#86a875"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
              />
            </View>
          </View>

          <Pressable className="mt-8 rounded-xl bg-lime-600 px-6 py-4 items-center">
            <Text className="text-white font-bold text-base">Add Pet</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
