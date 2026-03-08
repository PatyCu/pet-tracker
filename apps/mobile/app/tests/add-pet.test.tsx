import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react-native";
import AddPetScreen from "../add-pet";

const mockReplace = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({ back: jest.fn(), replace: mockReplace }),
}));

jest.mock("react-native-safe-area-context", () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock("@/lib/api", () => ({ API_URL: "http://localhost:3000" }));

describe("AddPetScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("navigates to home with replace after successful pet creation", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 201,
    }) as jest.Mock;

    render(<AddPetScreen />);

    fireEvent.changeText(screen.getByPlaceholderText("e.g. Kiwi"), "Kiwi");
    fireEvent.changeText(screen.getByPlaceholderText("e.g. Cat"), "Cat");
    fireEvent.press(screen.getByText("Add Pet"));

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/");
    });
  });

  it("shows an error message when the pet already exists (409)", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 409,
      json: async () => ({ error: "A pet with that name already exists" }),
    }) as jest.Mock;

    render(<AddPetScreen />);

    fireEvent.changeText(screen.getByPlaceholderText("e.g. Kiwi"), "Kiwi");
    fireEvent.changeText(screen.getByPlaceholderText("e.g. Cat"), "Cat");
    fireEvent.press(screen.getByText("Add Pet"));

    await waitFor(() => {
      expect(screen.getByText("A pet with that name already exists")).toBeOnTheScreen();
    });
  });
});
