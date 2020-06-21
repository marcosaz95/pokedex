import { MovementsListComponent } from './movements-list/movements-list.component';
import { Pokemon } from './../../../../models/classes/pokemon';
import { IPokemon } from './../../../../models/interfaces/pokemon.interface';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {
  pokemon: IPokemon;
  displayedMoves: string[];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _pokemon: Pokemon,
    private _router: Router,
    private _modalController: ModalController,
  ) {}

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id')) {
        this.pokemon = this._pokemon.getPokemonFromCurrentData(Number(params.get('id')));
        if (!this.pokemon) {
          this._router.navigate(['pokedex']);
        } else {
          this.buildInformation();
        }
      }
    });
  }

  buildInformation() {
    this.displayedMoves = this.pokemon.moves.filter((move: string, index: number) => index < 10);
  }

  seeMoreMovements() {
    this.displayMoreMovements();
  }

  async displayMoreMovements() {
    const modal = await this._modalController.create({
      component: MovementsListComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        moves: this.pokemon.moves,
      },
    });
    return await modal.present();
  }

  // getEvolution() {
  //   this._pokemon.get
  // }
}
