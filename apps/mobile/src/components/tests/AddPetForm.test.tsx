import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react-native";
import { AddPetForm } from "../AddPetForm";

jest.mock("@/lib/api", () => ({ API_URL: "http://localhost:3000" }));

describe("AddPetForm", () => {
  const onSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all fields and the submit button", () => {
    render(<AddPetForm onSuccess={onSuccess} />);
    expect(screen.getByPlaceholderText("e.g. Kiwi")).toBeOnTheScreen();
    expect(screen.getByPlaceholderText("e.g. Cat")).toBeOnTheScreen();
    expect(screen.getByPlaceholderText("e.g. Domestic Shorthair")).toBeOnTheScreen();
    expect(screen.getByPlaceholderText("YYYY-MM-DD")).toBeOnTheScreen();
    expect(screen.getByText("Add Pet")).toBeOnTheScreen();
  });

  it("shows a validation error when name or species is empty", async () => {
    render(<AddPetForm onSuccess={onSuccess} />);
    fireEvent.press(screen.getByText("Add Pet"));
    expect(screen.getByText("Name and species are required")).toBeOnTheScreen();
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it("shows an error message on 409", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 409,
      json: async () => ({ error: "A pet with that name already exists" }),
    }) as jest.Mock;

    render(<AddPetForm onSuccess={onSuccess} />);
    fireEvent.changeText(screen.getByPlaceholderText("e.g. Kiwi"), "Luna");
    fireEvent.changeText(screen.getByPlaceholderText("e.g. Cat"), "Dog");
    fireEvent.press(screen.getByText("Add Pet"));

    await waitFor(() => {
      expect(screen.getByText("A pet with that name already exists")).toBeOnTheScreen();
    });
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it("calls onSuccess and clears fields after successful submit", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, status: 201 }) as jest.Mock;

    render(<AddPetForm onSuccess={onSuccess} />);
    fireEvent.changeText(screen.getByPlaceholderText("e.g. Kiwi"), "Luna");
    fireEvent.changeText(screen.getByPlaceholderText("e.g. Cat"), "Dog");
    fireEvent.press(screen.getByText("Add Pet"));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
    });
    expect(screen.getByPlaceholderText("e.g. Kiwi").props.value).toBe("");
    expect(screen.getByPlaceholderText("e.g. Cat").props.value).toBe("");
  });
});
