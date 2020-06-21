export interface IPokemon {
  name: string;
  image: string;
  types: string[];
  id?: number;
  height?: number;
  weight?: number;
  moves?: string[];
  specieUrl?: string;
}

export interface ISimplePokemonInfo {
  name: string;
  url: string;
}

export interface ISimplePokemonInfoList {
  count: number;
  next: string;
  previous: string;
  results: ISimplePokemonInfo[];
}
