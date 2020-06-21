import { PokedexValidators } from './../shared/validators';
import { AuthGuard } from './../shared/auth.guard';
import { PokemonService } from './services/pokemon.service';
import { Pokemon } from './classes/pokemon';
import { User } from './classes/user';
import { NgModule } from '@angular/core';

@NgModule({
  providers: [User, Pokemon, PokemonService, AuthGuard, PokedexValidators],
})
export class CoreModule {}
