import { useCallback, useEffect, useState } from "react";
import type { Pet } from "@pet-tracker/types";
import { API_URL } from "@/lib/api";

export function usePets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPets = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/pets`);
      if (response.ok) {
        const data = await response.json();
        setPets(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePet = useCallback(
    async (id: string) => {
      await fetch(`${API_URL}/api/v1/pets/${id}`, { method: "DELETE" });
      fetchPets();
    },
    [fetchPets],
  );

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  return { pets, loading, fetchPets, deletePet };
}
