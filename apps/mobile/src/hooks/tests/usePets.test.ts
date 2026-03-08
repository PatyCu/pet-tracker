import { renderHook, waitFor, act } from "@testing-library/react-native";
import { usePets } from "../usePets";

jest.mock("@/lib/api", () => ({ API_URL: "http://localhost:3000" }));

const mockPet = {
  id: "1",
  userId: "default-user",
  name: "Luna",
  species: "Dog",
  breed: "Golden Retriever",
  dateOfBirth: "2021-06-15",
  createdAt: "2026-01-01T00:00:00.000Z",
};

describe("usePets", () => {
  beforeEach(() => jest.clearAllMocks());

  it("starts in loading state with empty pets", () => {
    global.fetch = jest.fn().mockReturnValue(new Promise(() => {})) as jest.Mock;
    const { result } = renderHook(() => usePets());
    expect(result.current.loading).toBe(true);
    expect(result.current.pets).toEqual([]);
  });

  it("populates pets and clears loading after successful fetch", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [mockPet],
    }) as jest.Mock;

    const { result } = renderHook(() => usePets());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.pets).toEqual([mockPet]);
    });
  });

  it("clears loading even when fetch returns non-ok response", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false }) as jest.Mock;

    const { result } = renderHook(() => usePets());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.pets).toEqual([]);
    });
  });

  it("deletePet sends DELETE request then re-fetches", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    }) as jest.Mock;

    const { result } = renderHook(() => usePets());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.deletePet("1");
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(3));
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:3000/api/v1/pets/1", {
      method: "DELETE",
    });
  });
});
