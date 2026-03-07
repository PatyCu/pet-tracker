import { render, screen } from "@testing-library/react-native";
import { Sidebar } from "../Sidebar";

jest.mock("@expo/vector-icons", () => ({
  Ionicons: () => null,
}));

describe("Sidebar", () => {
  it("renders all nav items", () => {
    render(<Sidebar />);
    expect(screen.getByText("Pets")).toBeOnTheScreen();
    expect(screen.getByText("Logs")).toBeOnTheScreen();
    expect(screen.getByText("Calendar")).toBeOnTheScreen();
    expect(screen.getByText("Health Records")).toBeOnTheScreen();
    expect(screen.getByText("Settings")).toBeOnTheScreen();
  });

  it("renders the user profile section", () => {
    render(<Sidebar />);
    expect(screen.getByText("Pet Owner")).toBeOnTheScreen();
  });
});
