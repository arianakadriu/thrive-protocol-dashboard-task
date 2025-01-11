import { API_URL } from "../utils/api";

interface CharacterFilters {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
  type?: string;
  page?: number;
}

export const getAllCharacters = async (filters: CharacterFilters = {}) => {
  try {
    const queryParams = new URLSearchParams();

    if (filters.page) queryParams.append("page", filters.page.toString());
    if (filters.name) queryParams.append("name", filters.name);
    if (filters.status) queryParams.append("status", filters.status);
    if (filters.species) queryParams.append("species", filters.species);
    if (filters.gender) queryParams.append("gender", filters.gender);
    if (filters.type) queryParams.append("type", filters.type);

    const url = `${API_URL}?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch characters");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
