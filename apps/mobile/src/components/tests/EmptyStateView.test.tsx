import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { EmptyStateView } from "../EmptyStateView";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("EmptyStateView", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders the Get Started button", () => {
    render(<EmptyStateView />);
    expect(screen.getByText("Get Started")).toBeOnTheScreen();
  });

  it("navigates to /add-pet when Get Started is pressed", () => {
    render(<EmptyStateView />);
    fireEvent.press(screen.getByText("Get Started"));
    expect(mockPush).toHaveBeenCalledWith("/add-pet");
  });
});
