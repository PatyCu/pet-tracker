import React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";
import HomeScreen from "../index";

jest.mock("expo-router", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("@/lib/api", () => ({ API_URL: "http://localhost:3000" }));

jest.mock("react-native-safe-area-context", () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
}));

const mockPet = {
  id: "1",
  userId: "default-user",
  name: "Luna",
  species: "Dog",
  breed: "Golden Retriever",
  dateOfBirth: "2021-06-15",
  createdAt: "2026-01-01T00:00:00.000Z",
};

describe("HomeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows skeletons while loading", () => {
    global.fetch = jest.fn().mockReturnValue(new Promise(() => {})) as jest.Mock;
    render(<HomeScreen />);
    expect(screen.getAllByLabelText("Loading pet").length).toBeGreaterThan(0);
  });

  it("shows Get Started when there are no pets", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    }) as jest.Mock;

    render(<HomeScreen />);
    await waitFor(() => {
      expect(screen.getByText("Get Started")).toBeOnTheScreen();
    });
  });

  it("shows pet cards when pets exist", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [mockPet],
    }) as jest.Mock;

    render(<HomeScreen />);
    await waitFor(() => {
      expect(screen.getByText("Luna")).toBeOnTheScreen();
    });
  });

  it("shows AddPetForm when pets exist", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [mockPet],
    }) as jest.Mock;

    render(<HomeScreen />);
    await waitFor(() => {
      expect(screen.getByPlaceholderText("e.g. Kiwi")).toBeOnTheScreen();
    });
  });

  it("does not show AddPetForm on empty state", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    }) as jest.Mock;

    render(<HomeScreen />);
    await waitFor(() => {
      expect(screen.getByText("Get Started")).toBeOnTheScreen();
    });
    expect(screen.queryByPlaceholderText("e.g. Kiwi")).toBeNull();
  });
});
