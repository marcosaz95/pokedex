import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class PokemonService {
  constructor(private _http: HttpClient) {}

  getPokemons(limit: string, offset: string): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.set('limit', limit).set('offset', offset);
    return this._http.get('https://pokeapi.co/api/v2/pokemon', { params });
  }

  get(endpoint: string): Observable<any> {
    return this._http.get(endpoint);
  }

  getPokemonByType(type: string): Observable<any> {
    return this._http.get(`https://pokeapi.co/api/v2/type//${type}/`);
  }

  getPokemonEvolution(id: number): Observable<any> {
    return this._http.get(`https://pokeapi.co/api/v2/evolution-chain/${id}`);
  }

  getPokemonByName(name: string): Observable<any> {
    return this._http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }
}
