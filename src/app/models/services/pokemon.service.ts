import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class PokemonService {
  constructor(private _http: HttpClient) {}

  /**
   *
   * Calls the API to get the pokemon using limit and offset
   * @param {string} limit
   * @param {string} offset
   * @returns {Observable<any>}
   * @memberof PokemonService
   */
  getPokemons(limit: string, offset: string): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.set('limit', limit).set('offset', offset);
    return this._http.get('https://pokeapi.co/api/v2/pokemon', { params });
  }

  /**
   *
   * Calls any API that is needed
   * @param {string} endpoint
   * @returns {Observable<any>}
   * @memberof PokemonService
   */
  get(endpoint: string): Observable<any> {
    return this._http.get(endpoint);
  }

  /**
   *
   * Calls the API to get a pokemon by type
   * @param {string} type
   * @returns {Observable<any>}
   * @memberof PokemonService
   */
  getPokemonByType(type: string): Observable<any> {
    return this._http.get(`https://pokeapi.co/api/v2/type/${type}`);
  }

  /**
   *
   * Calls the API to get the chain evolution
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof PokemonService
   */
  getPokemonEvolution(id: number): Observable<any> {
    return this._http.get(`https://pokeapi.co/api/v2/evolution-chain/${id}`);
  }

  /**
   *
   * Calls the API to get Pokemon by name
   * @param {string} name
   * @returns {Observable<any>}
   * @memberof PokemonService
   */
  getPokemonByName(name: string): Observable<any> {
    return this._http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }
}
