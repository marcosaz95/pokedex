import { Pokemon } from './../../../../models/classes/pokemon';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokedex-main',
  templateUrl: './pokedex-main.component.html',
  styleUrls: ['./pokedex-main.component.scss'],
})
export class PokedexMainComponent implements OnInit, OnDestroy {
  isHomePage = true;
  isLoading = true;
  isLoadingSubscription: Subscription;
  routerSubscription: Subscription;

  constructor(private _router: Router, private _alertController: AlertController, private _pokemon: Pokemon) {}

  ngOnInit() {
    this.routerSubscription = this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isHomePage = event['url'] === '/pokedex';
      });

    this.isLoadingSubscription = this._pokemon.getIsLoading().subscribe((isLoading: boolean) => (this.isLoading = isLoading));
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.isLoadingSubscription) {
      this.isLoadingSubscription.unsubscribe();
    }
  }

  /**
   *
   * Redirects to home page
   * @memberof PokedexMainComponent
   */
  goHome() {
    this._router.navigate(['pokedex']);
  }

  /**
   *
   * Redirects to profile page
   * @memberof PokedexMainComponent
   */
  viewProfile() {
    this._router.navigate(['pokedex/profile']);
  }

  /**
   *
   * Before to sign out, displayes an alert
   * @memberof PokedexMainComponent
   */
  signOut() {
    this.presentSignOutAlert();
  }

  /**
   *
   * sends an event to let the list know that there is a new search
   * @param {string} searchValue
   * @memberof PokedexMainComponent
   */
  search(searchValue: string) {
    this.goHome();
    setTimeout(() => {
      this._pokemon.setSearchValue(searchValue);
    });
  }

  /**
   *
   * displayes the alert
   * @memberof PokedexMainComponent
   */
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
