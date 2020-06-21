import { Router } from '@angular/router';
import { IPokemon, ISimplePokemonInfo, ISimplePokemonInfoList } from './../../../../models/interfaces/pokemon.interface';
import { Pokemon } from './../../../../models/classes/pokemon';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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

  getPokemons(event?: any) {
    this._pokemon.getPokemons('50', this.currentOffset).subscribe((simplePokemonList: ISimplePokemonInfoList) => {
      if (simplePokemonList && simplePokemonList.results.length) {
        const promises = [];
        simplePokemonList.results.forEach((simplePokemonInfo: ISimplePokemonInfo) => {
          promises.push(this._pokemon.get(simplePokemonInfo.url));
        });
        console.log(promises);
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
        });
      }
    });
  }

  loadMore(event: any) {
    this.currentOffset = (Number(this.currentOffset) + 50).toString();
    this.getPokemons(event);
  }

  viewDetail(id: number) {
    this._router.navigate(['pokedex', 'detail', id]);
  }

  handleSearch() {
    this.searchValueSubscription = this._pokemon
      .getSearchValue()
      .pipe(debounceTime(500))
      .subscribe((searchValue: string) => {
        const promises = [this._pokemon.getPokemonByType(searchValue)];
        forkJoin(promises).subscribe((data: any) => {
          console.log(data);
        });
        console.log(searchValue);
      });
  }
}
