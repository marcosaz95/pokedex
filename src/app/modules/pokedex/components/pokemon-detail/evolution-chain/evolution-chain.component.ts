import { IPokemon } from './../../../../../models/interfaces/pokemon.interface';
import { Pokemon } from './../../../../../models/classes/pokemon';
import { Component, OnInit, Input } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-evolution-chain',
  templateUrl: './evolution-chain.component.html',
  styleUrls: ['./evolution-chain.component.scss'],
})
export class EvolutionChainComponent implements OnInit {
  @Input() pokemon: IPokemon;
  evolutionChain: IPokemon[];
  promises = [];

  constructor(private _pokemon: Pokemon) {}

  ngOnInit() {
    this._pokemon.get(this.pokemon.specieUrl).subscribe((data: any) => {
      this._pokemon.get(data.evolution_chain.url).subscribe((evolutionChain: any) => {
        this.promises.push(this._pokemon.getPokemonByName(evolutionChain.chain.species.name));
        this.getEvolutionChain(evolutionChain.chain);
      });
    });
    // this._pokemon.getPokemonEvolution(this.pokemonId).subscribe((data: any) => {
    //   console.log(data);
    // });
  }

  getEvolutionChain(evolutionChain: any) {
    if (evolutionChain.evolves_to && evolutionChain.evolves_to.length) {
      this.promises.push(this._pokemon.getPokemonByName(evolutionChain.evolves_to[0].species.name));
      this.getEvolutionChain(evolutionChain.evolves_to[0]);
    } else {
      this.getPokemons();
    }
  }

  getPokemons() {
    if (this.promises && this.promises.length) {
      forkJoin(this.promises).subscribe((pokemons: any) => {
        this.evolutionChain = pokemons.map((pok: any) => this._pokemon.getPokemonInformationFromResponse(pok));
        console.log(this.evolutionChain);
      });
    }
  }
}
