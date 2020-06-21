import { PokedexValidators } from './../../../../shared/validators';
import { PASSWORD_REGEX, EMAIL_REGEX } from './../../../../shared/constants';
import { User } from './../../../../models/classes/user';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/interfaces/user.interface';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _user: User,
    private _alertController: AlertController,
    private _pokedexValidator: PokedexValidators,
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this._fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
        password: ['', [Validators.required, Validators.pattern(PASSWORD_REGEX)]],
        confirmPassword: ['', [Validators.required, Validators.pattern(PASSWORD_REGEX)]],
      },
      { validator: this._pokedexValidator.passwordDontMatch.bind(this) },
    );
  }

  cancel() {
    this._router.navigate(['']);
  }

  register() {
    const { name, email, password } = this.registerForm.value;
    const newUser: IUser = { name, email, password };
    this._user.saveUser(newUser);
    this.presentSuccessAlert();
  }

  async presentSuccessAlert() {
    const alert = await this._alertController.create({
      header: 'Success',
      message: 'Successfully created.',
      buttons: [
        {
          text: 'Continue',
          handler: (blah) => {
            this.cancel();
          },
        },
      ],
    });

    await alert.present();
  }
}
