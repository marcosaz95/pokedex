import { Router } from '@angular/router';
import { IPokemon, ISimplePokemonInfo, ISimplePokemonInfoList } from './../../../../models/interfaces/pokemon.interface';
import { Pokemon } from './../../../../models/classes/pokemon';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit, OnDestroy {
  @Output() viewDetailEvent = new EventEmitter<IPokemon>();

  pokemons: IPokemon[] = [];
  currentOffset = '0';
  searchValueSubscription: Subscription;
  displayError = false;

  constructor(private _pokemon: Pokemon, private _router: Router) {}

  ngOnInit() {
    if (this._pokemon.currentPokemons) {
      this.pokemons = this._pokemon.currentPokemons;
      this.currentOffset = this._pokemon.currentOffset;
    }
    this.getPokemons();
    this.handleSearch();
  }

  ngOnDestroy() {
    if (this.searchValueSubscription) {
      this.searchValueSubscription.unsubscribe();
    }
  }

  /**
   *
   * Gets the pokemons by default, including infinite scroll
   * @param {*} [event]
   * @memberof PokemonListComponent
   */
  getPokemons(event?: any) {
    this._pokemon.getPokemons('50', this.currentOffset).subscribe((simplePokemonList: ISimplePokemonInfoList) => {
      if (simplePokemonList && simplePokemonList.results.length) {
        const promises = [];
        simplePokemonList.results.forEach((simplePokemonInfo: ISimplePokemonInfo) => {
          promises.push(this._pokemon.get(simplePokemonInfo.url));
        });
        this.getPokemonsFromPromises(promises, event, simplePokemonList);
      }
    });
  }

  /**
   *
   * handler of the infinite scroll
   * @param {*} event
   * @memberof PokemonListComponent
   */
  loadMore(event: any) {
    this.currentOffset = (Number(this.currentOffset) + 50).toString();
    this.getPokemons(event);
  }

  /**
   *
   * Redirects to detail
   * @param {number} id
   * @memberof PokemonListComponent
   */
  viewDetail(id: number) {
    this._router.navigate(['pokedex', 'detail', id]);
  }

  /**
   *
   * Listener of the search input
   * @memberof PokemonListComponent
   */
  handleSearch() {
    this.searchValueSubscription = this._pokemon
      .getSearchValue()
      .pipe(debounceTime(500))
      .subscribe((searchValue: string) => {
        this._pokemon.setIsLoading(true);
        this.pokemons = [];
        if (!searchValue) {
          this.getPokemons();
          return;
        }
        const promises = [this._pokemon.getPokemonByType(searchValue), this._pokemon.getPokemonByName(searchValue)];
        forkJoin(promises).subscribe((data: any) => {
          if (data[0]) {
            const pokemonPromises = data[0].pokemon.map((pok) => this._pokemon.get(pok.pokemon.url));
            this.getPokemonsFromPromises(pokemonPromises);
          } else if (data[1]) {
            this.pokemons = [this._pokemon.getPokemonInformationFromResponse(data[1])];
            this._pokemon.currentPokemons = this.pokemons;
            this._pokemon.setIsLoading(false);
          } else {
            this.displayError = true;
            this._pokemon.setIsLoading(false);
          }
        });
      });
  }

  /**
   *
   * Gets all pokemons information using an array of promises
   * @param {any[]} promises
   * @param {*} [event]
   * @param {*} [simplePokemonList]
   * @memberof PokemonListComponent
   */
  getPokemonsFromPromises(promises: any[], event?: any, simplePokemonList?: any) {
    forkJoin(promises).subscribe((pokemonList: any) => {
      this.pokemons = this.pokemons.concat(pokemonList.map((res) => this._pokemon.getPokemonInformationFromResponse(res)));
      this._pokemon.currentPokemons = this.pokemons;
      this._pokemon.currentOffset = this.currentOffset;
      if (event) {
        event.target.complete();
        if (this.pokemons.length === simplePokemonList.count) {
          event.target.disabled = true;
        }
      }
      this._pokemon.setIsLoading(false);
    });
  }
}
