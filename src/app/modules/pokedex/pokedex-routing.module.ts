import { ProfileComponent } from './components/profile/profile.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokedexMainComponent } from './components/pokedex-main/pokedex-main.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: PokedexMainComponent,
    children: [
      { path: '', component: PokemonListComponent },
      { path: 'detail/:id', component: PokemonDetailComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokedexRoutingModule {}
