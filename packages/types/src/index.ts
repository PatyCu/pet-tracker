export interface CreatePetInput {
  name: string;
  species: string;
  breed?: string;
  dateOfBirth?: string; // ISO 8601 date string, e.g. "2022-03-15"
}
