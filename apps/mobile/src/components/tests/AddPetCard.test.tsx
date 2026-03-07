import { render, screen, fireEvent } from "@testing-library/react-native";
import { AddPetCard } from "../AddPetCard";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("AddPetCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Add New Pet text", () => {
    render(<AddPetCard />);
    expect(screen.getByText("Add New Pet")).toBeOnTheScreen();
  });

  it("navigates to /add-pet on press", () => {
    render(<AddPetCard />);
    fireEvent.press(screen.getByText("Add New Pet"));
    expect(mockPush).toHaveBeenCalledWith("/add-pet");
  });
});
