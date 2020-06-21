import { PasswordFormComponent } from './components/profile/password-form/password-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EvolutionChainComponent } from './components/pokemon-detail/evolution-chain/evolution-chain.component';
import { MovementsListComponent } from './components/pokemon-detail/movements-list/movements-list.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokedexMainComponent } from './components/pokedex-main/pokedex-main.component';
import { PokemonCardComponent } from './components/pokemon-list/pokemon-card/pokemon-card.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokedexRoutingModule } from './pokedex-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PokedexMainComponent,
    PokemonListComponent,
    PokemonCardComponent,
    PokemonDetailComponent,
    MovementsListComponent,
    EvolutionChainComponent,
    ProfileComponent,
    PasswordFormComponent,
  ],
  imports: [CommonModule, PokedexRoutingModule, FormsModule, ReactiveFormsModule],
})
export class PokedexModule {}
