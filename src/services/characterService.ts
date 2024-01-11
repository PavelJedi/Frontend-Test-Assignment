import axios, { AxiosResponse } from "axios";
import { Character, ExtendedCharacter } from "../interfaces/interfaces";

const API_URL = "https://swapi.dev/api/people";

export const getCharacters = async (): Promise<Character[]> => {
  try {
    const response: AxiosResponse<{ results: Character[] }> = await axios.get(
      API_URL
    );

    return response.data.results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Failed to fetch characters: " + error.message);
    } else {
      throw new Error(
        "Failed to fetch characters: An unexpected error occurred."
      );
    }
  }
};

const fetchDetailsFromUrls = async (urls: string[]): Promise<any[]> => {
  const requests = urls.map((url) => axios.get(url));
  const responses = await Promise.all(requests);
  return responses.map((response) => response.data);
};

export const getCharacterById = async (
  id: string
): Promise<ExtendedCharacter> => {
  try {
    const url = `${API_URL}/${id}/`;
    const response: AxiosResponse<Character> = await axios.get(url);
    const characterData = response.data;
    const [speciesDetails, filmsDetails, starshipsDetails] = await Promise.all([
      characterData.species ? fetchDetailsFromUrls(characterData.species) : [],
      characterData.films ? fetchDetailsFromUrls(characterData.films) : [],
      characterData.starships
        ? fetchDetailsFromUrls(characterData.starships)
        : [],
    ]);

    return {
      ...characterData,
      speciesDetails,
      filmsDetails,
      starshipsDetails,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Failed to fetch character: " + error.message);
    } else {
      throw new Error(
        "Failed to fetch character: An unexpected error occurred."
      );
    }
  }
};
