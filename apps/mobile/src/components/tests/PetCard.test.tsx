import { render, screen, waitFor, fireEvent } from "@testing-library/react-native";
import { PetCard } from "../PetCard";
import type { Pet } from "@pet-tracker/types";

jest.mock("@expo/vector-icons", () => ({ Ionicons: () => null }));

const basePet: Pet = {
  id: "1",
  userId: "default-user",
  name: "Luna",
  species: "Dog",
  breed: "Golden Retriever",
  dateOfBirth: "2021-06-15",
  createdAt: "2026-01-01T00:00:00.000Z",
};

const mockImageUrl = "https://cdn2.thecatapi.com/images/test.jpg";

// Default: fetch never resolves so no async state update occurs mid-test
beforeEach(() => {
  global.fetch = jest.fn().mockReturnValue(new Promise(() => {})) as jest.Mock;
});

describe("PetCard", () => {
  it("renders the pet name", () => {
    render(<PetCard pet={basePet} />);
    expect(screen.getByText("Luna")).toBeOnTheScreen();
  });

  it("renders species and breed", () => {
    render(<PetCard pet={basePet} />);
    expect(screen.getByText("Dog · Golden Retriever")).toBeOnTheScreen();
  });

  it("renders date of birth when present", () => {
    render(<PetCard pet={basePet} />);
    expect(screen.getByText("Born 2021-06-15")).toBeOnTheScreen();
  });

  it("renders only species when breed is null", () => {
    render(<PetCard pet={{ ...basePet, breed: null }} />);
    expect(screen.getByText("Dog")).toBeOnTheScreen();
  });

  it("does not render date of birth when null", () => {
    render(<PetCard pet={{ ...basePet, dateOfBirth: null }} />);
    expect(screen.queryByText(/Born/)).toBeNull();
  });

  it("shows pet initial as placeholder before image loads", () => {
    render(<PetCard pet={basePet} />);
    expect(screen.getByText("L")).toBeOnTheScreen();
  });

  it("renders the pet image after fetch succeeds", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: "test", url: mockImageUrl, width: 400, height: 400 }],
    }) as jest.Mock;
    render(<PetCard pet={basePet} />);
    await waitFor(() => {
      expect(screen.getByLabelText("Photo of Luna")).toBeOnTheScreen();
    });
  });

  it("renders a delete button when onDelete is provided", () => {
    render(<PetCard pet={basePet} onDelete={jest.fn()} />);
    expect(screen.getByLabelText("Delete Luna")).toBeOnTheScreen();
  });

  it("does not render a delete button when onDelete is not provided", () => {
    render(<PetCard pet={basePet} />);
    expect(screen.queryByLabelText("Delete Luna")).toBeNull();
  });

  it("shows a confirmation modal when the delete button is pressed", () => {
    render(<PetCard pet={basePet} onDelete={jest.fn()} />);
    fireEvent.press(screen.getByLabelText("Delete Luna"));
    expect(screen.getByText("Delete pet")).toBeOnTheScreen();
    expect(screen.getByText(/Are you sure you want to delete Luna/)).toBeOnTheScreen();
  });

  it("calls onDelete when the Delete button in the modal is confirmed", () => {
    const onDelete = jest.fn();
    render(<PetCard pet={basePet} onDelete={onDelete} />);
    fireEvent.press(screen.getByLabelText("Delete Luna"));
    fireEvent.press(screen.getByText("Delete"));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("does not call onDelete when Cancel is pressed", () => {
    const onDelete = jest.fn();
    render(<PetCard pet={basePet} onDelete={onDelete} />);
    fireEvent.press(screen.getByLabelText("Delete Luna"));
    fireEvent.press(screen.getByText("Cancel"));
    expect(onDelete).not.toHaveBeenCalled();
  });

  it("calls onSelect when the card is pressed", () => {
    const onSelect = jest.fn();
    render(<PetCard pet={basePet} onSelect={onSelect} />);
    fireEvent.press(screen.getByRole("button", { name: /Luna/i }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("does not call onSelect when the delete button is pressed", () => {
    const onSelect = jest.fn();
    render(<PetCard pet={basePet} onDelete={jest.fn()} onSelect={onSelect} />);
    fireEvent.press(screen.getByLabelText("Delete Luna"));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("reflects selected state via accessibilityState", () => {
    render(<PetCard pet={basePet} isSelected={true} />);
    expect(screen.getByRole("button", { name: /Luna/i })).toHaveProp("accessibilityState", {
      selected: true,
    });
  });

  it("reflects unselected state via accessibilityState", () => {
    render(<PetCard pet={basePet} isSelected={false} />);
    expect(screen.getByRole("button", { name: /Luna/i })).toHaveProp("accessibilityState", {
      selected: false,
    });
  });
});
