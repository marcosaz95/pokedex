import { IPokemon } from './../interfaces/pokemon.interface';
import { Injectable } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class Pokemon {
  currentPokemons: IPokemon[];
  currentOffset: string;
  private _searchValue: Subject<string> = new Subject<string>();

  constructor(private _pokemonService: PokemonService) {}

  getPokemons(limit: string = '50', offset: string = '0'): Observable<any> {
    return this._pokemonService.getPokemons(limit, offset);
  }

  get(endpoint: string): Observable<any> {
    return this._pokemonService.get(endpoint);
  }

  getPokemonInformationFromResponse(pokemon: any): IPokemon {
    const { name, sprites, types, id, height, weight, moves, species } = pokemon;
    return {
      name,
      image: sprites.front_default,
      types: types.map((type) => type.type.name),
      id,
      height,
      weight,
      moves: moves.map((move: any) => move.move.name),
      specieUrl: species.url,
    };
  }

  getPokemonFromCurrentData(id: number): IPokemon {
    return this.currentPokemons.find((pok: IPokemon) => pok.id === id);
  }

  setSearchValue(searchValue: string) {
    this._searchValue.next(searchValue);
  }

  getSearchValue(): Observable<string> {
    return this._searchValue.asObservable();
  }

  getPokemonByType(type: string): Observable<string> {
    return this._pokemonService.getPokemonByType(type);
  }

  getPokemonEvolution(id: number): Observable<any> {
    return this._pokemonService.getPokemonEvolution(id);
  }

  getPokemonByName(name: string): Observable<any> {
    return this._pokemonService.getPokemonByName(name);
  }
}
