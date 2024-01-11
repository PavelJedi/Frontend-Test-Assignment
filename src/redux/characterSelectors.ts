import { createSelector } from "reselect";
import { RootState } from "./store";
import { Character } from "../interfaces/interfaces";
import { selectFilters } from "./slices/filterSlice";

const getCharacters = (state: RootState) => state.characters.characters;

export const selectFilteredCharacters = createSelector(
  [getCharacters, selectFilters],
  (characters, filters) => {
    return characters.filter((character: Character) => {
      const matchesName = filters.name
        ? character.name.toLowerCase().includes(filters.name.toLowerCase())
        : true;
      const matchesGender = filters.gender
        ? character.gender === filters.gender
        : true;
      const matchesMassMin =
        filters.massRange.min !== null
          ? parseInt(character.mass) >= filters.massRange.min
          : true;
      const matchesMassMax =
        filters.massRange.max !== null
          ? parseInt(character.mass) <= filters.massRange.max
          : true;

      return matchesName && matchesGender && matchesMassMin && matchesMassMax;
    });
  }
);
