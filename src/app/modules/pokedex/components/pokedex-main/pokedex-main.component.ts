import { Pokemon } from './../../../../models/classes/pokemon';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-pokedex-main',
  templateUrl: './pokedex-main.component.html',
  styleUrls: ['./pokedex-main.component.scss'],
})
export class PokedexMainComponent implements OnInit {
  isHomePage = true;

  constructor(private _router: Router, private _alertController: AlertController, private _pokemon: Pokemon) {}

  ngOnInit() {
    this._router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.isHomePage = event['url'] === '/pokedex';
    });
  }

  goHome() {
    this._router.navigate(['pokedex']);
  }

  viewProfile() {
    this._router.navigate(['pokedex/profile']);
  }

  signOut() {
    this.presentSignOutAlert();
  }

  search(searchValue: string) {
    this.goHome();
    setTimeout(() => {
      this._pokemon.setSearchValue(searchValue);
    });
  }

  async presentSignOutAlert() {
    const alert = await this._alertController.create({
      header: 'Sign out',
      message: 'Do you want to sign out?',
      buttons: [
        'No',
        {
          text: 'Yes',
          handler: (blah) => {
            this._router.navigate(['']);
          },
        },
      ],
    });

    await alert.present();
  }
}
