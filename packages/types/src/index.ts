export interface CreatePetInput {
  name: string;
  species: string;
  breed?: string;
  dateOfBirth?: string; // ISO 8601 date string, e.g. "2022-03-15"
}

export interface Pet {
  id: string;
  userId: string;
  name: string;
  species: string;
  breed: string | null;
  dateOfBirth: string | null;
  createdAt: string;
}
