export interface Character {
  url: string;
  id: string;
  films: any;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  species?: string[];
  movies?: string[];
  starships?: string[];
}

export interface CharacterState {
  characters: Character[];
  selectedCharacter: Character | null;
  filters: {
    movie: string;
    name: string;
    gender: string;
    massRange: { min: number | null; max: number | null };
  };
}

export interface ExtendedCharacter extends Character {
  speciesDetails: any[];
  filmsDetails: any[];
  starshipsDetails: any[];
}
