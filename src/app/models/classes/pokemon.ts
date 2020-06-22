import { IPokemon } from './../interfaces/pokemon.interface';
import { Injectable } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Observable, Subject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class Pokemon {
  currentPokemons: IPokemon[];
  currentOffset: string;
  private _searchValue: Subject<string> = new Subject<string>();
  private _isLoading: Subject<boolean> = new Subject<boolean>();

  constructor(private _pokemonService: PokemonService) {}

  /**
   *
   * Gets all pokemons using a limit and offset
   * @param {string} [limit='50']
   * @param {string} [offset='0']
   * @returns {Observable<any>}
   * @memberof Pokemon
   */
  getPokemons(limit: string = '50', offset: string = '0'): Observable<any> {
    return this._pokemonService.getPokemons(limit, offset);
  }

  /**
   *
   * gets information from any url (important since the pokeapi has a lot of urls in the objects)
   * @param {string} endpoint
   * @returns {Observable<any>}
   * @memberof Pokemon
   */
  get(endpoint: string): Observable<any> {
    return this._pokemonService.get(endpoint);
  }

  /**
   * Parses the information from the response (A lot of useless information) to use just the needed info
   *
   * @param {*} pokemon
   * @returns {IPokemon}
   * @memberof Pokemon
   */
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

  /**
   *
   * Gets the pokemon list from memory, to avoid new APIs call
   * @param {number} id
   * @returns {IPokemon}
   * @memberof Pokemon
   */
  getPokemonFromCurrentData(id: number): IPokemon {
    return this.currentPokemons.find((pok: IPokemon) => pok.id === id);
  }

  /**
   *
   * creates communication between pokedex-main (search component) and pokemon-list (search handler)
   * @param {string} searchValue
   * @memberof Pokemon
   */
  setSearchValue(searchValue: string) {
    this._searchValue.next(searchValue);
  }

  /**
   *
   * completes the communication
   * @returns {Observable<string>}
   * @memberof Pokemon
   */
  getSearchValue(): Observable<string> {
    return this._searchValue.asObservable();
  }

  /**
   *
   * important to display the loading bar, communication between many components
   * @param {boolean} isLoading
   * @memberof Pokemon
   */
  setIsLoading(isLoading: boolean) {
    this._isLoading.next(isLoading);
  }

  /**
   *
   * completes the communication
   * @returns {Observable<boolean>}
   * @memberof Pokemon
   */
  getIsLoading(): Observable<boolean> {
    return this._isLoading.asObservable();
  }

  /**
   *
   * gets pokemons by type (important for the search component)
   * @param {string} type
   * @returns {Observable<string>}
   * @memberof Pokemon
   */
  getPokemonByType(type: string): Observable<string> {
    return this._pokemonService.getPokemonByType(type).pipe(catchError((val) => of(null)));
  }

  /**
   *
   * Gets the evolution chain through Pokemon's id
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof Pokemon
   */
  getPokemonEvolution(id: number): Observable<any> {
    return this._pokemonService.getPokemonEvolution(id);
  }

  /**
   *
   * Gets the pokemon by name, important for the search component and some functionalities
   * @param {string} name
   * @returns {Observable<any>}
   * @memberof Pokemon
   */
  getPokemonByName(name: string): Observable<any> {
    return this._pokemonService.getPokemonByName(name).pipe(catchError((val) => of(null)));
  }
}
