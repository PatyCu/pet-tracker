import { render, screen } from "@testing-library/react-native";
import { PetCardSkeleton } from "../PetCardSkeleton";

describe("PetCardSkeleton", () => {
  it("renders without crashing", () => {
    render(<PetCardSkeleton />);
  });

  it("renders with accessible loading label", () => {
    render(<PetCardSkeleton />);
    expect(screen.getByLabelText("Loading pet")).toBeOnTheScreen();
  });
});
