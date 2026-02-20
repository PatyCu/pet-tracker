import { render, screen } from "@testing-library/react-native";
import HomeScreen from "../index";

describe("HomeScreen", () => {
  it("renders the app title", () => {
    render(<HomeScreen />);
    expect(screen.getByText("Pet Tracker")).toBeOnTheScreen();
  });

  it("renders the subtitle", () => {
    render(<HomeScreen />);
    expect(screen.getByText(/track symptoms and changes/i)).toBeOnTheScreen();
  });

  it("matches snapshot", () => {
    const { toJSON } = render(<HomeScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
