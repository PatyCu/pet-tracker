import React from "react";
import { render, screen } from "@testing-library/react-native";
import { HomeLoadingView } from "../HomeLoadingView";

jest.mock("react-native-safe-area-context", () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock("@expo/vector-icons", () => ({ Ionicons: () => null }));

describe("HomeLoadingView", () => {
  it("renders loading pet skeletons", () => {
    render(<HomeLoadingView />);
    expect(screen.getAllByLabelText("Loading pet").length).toBeGreaterThan(0);
  });
});
