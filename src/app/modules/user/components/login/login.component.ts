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

  buildForm() {
    this.loginForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  redirectRegisterForm() {
    console.log(this.loginForm);
    this._router.navigate(['/register']);
  }

  signIn() {
    const { email, password } = this.loginForm.value;
    const validUser = this._user.validateSignInForm(email, password);
    if (!validUser) {
      this.presentSuccessAlert();
      return;
    }
    this._router.navigate(['/pokedex']);
  }

  async presentSuccessAlert() {
    const alert = await this._alertController.create({
      header: 'Oops!!!',
      message: 'Did you mistype? please try again!',
      buttons: ['Ok'],
    });

    await alert.present();
  }
}
