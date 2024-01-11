import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Character, CharacterState } from "../../interfaces/interfaces";
import {
  getCharacterById,
  getCharacters as getCharactersApi,
} from "../../services/characterService";

const initialState: CharacterState = {
  characters: [],
  selectedCharacter: null,
  filters: {
    movie: "",
    name: "",
    gender: "",
    massRange: {
      min: null,
      max: null
    }
  }
};

export const fetchCharacters = createAsyncThunk(
  "characters/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const characters = await getCharactersApi();
      return characters;
    } catch (error) {
      return rejectWithValue("Failed to fetch characters");
    }
  }
);

export const fetchCharacterDetails = createAsyncThunk(
  "characters/fetchDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      const character = await getCharacterById(id);
      return character;
    } catch (error) {
      return rejectWithValue("Failed to fetch character details");
    }
  }
);

const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {})
      .addCase(
        fetchCharacters.fulfilled,
        (state, action: PayloadAction<Character[]>) => {
          state.characters = action.payload;
        }
      )
      .addCase(fetchCharacterDetails.fulfilled, (state, action) => {
        state.selectedCharacter = action.payload;
      })
      .addCase(fetchCharacterDetails.rejected, (state, action) => {
        console.error("Fetch character details failed:", action.error.message);
      });
  },
});

export default characterSlice.reducer;
