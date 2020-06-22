import { User } from './../../../../models/classes/user';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private _fb: FormBuilder, private _router: Router, private _user: User, private _alertController: AlertController) {}

  ngOnInit() {
    this.buildForm();
  }

  /**
   *
   * builds the form
   * @memberof LoginComponent
   */
  buildForm() {
    this.loginForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   *
   * redirects to register form
   * @memberof LoginComponent
   */
  redirectRegisterForm() {
    this._router.navigate(['/register']);
  }

  /**
   *
   * calls a function to validate credentials and then redirects the user to home screen
   * @returns
   * @memberof LoginComponent
   */
  signIn() {
    const { email, password } = this.loginForm.value;
    const validUser = this._user.validateSignInForm(email, password);
    if (!validUser) {
      this.presentSuccessAlert();
      return;
    }
    this._router.navigate(['/pokedex']);
  }

  /**
   *
   * In case something went wrong, a message will appear
   * @memberof LoginComponent
   */
  async presentSuccessAlert() {
    const alert = await this._alertController.create({
      header: 'Oops!!!',
      message: 'Did you mistype? please try again!',
      buttons: ['Ok'],
    });

    await alert.present();
  }
}
