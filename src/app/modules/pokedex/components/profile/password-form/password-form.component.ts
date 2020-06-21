import { PokedexValidators } from './../../../../../shared/validators';
import { PASSWORD_REGEX } from './../../../../../shared/constants';
import { User } from './../../../../../models/classes/user';
import { IUser } from 'src/app/models/interfaces/user.interface';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
})
export class PasswordFormComponent implements OnInit {
  @Input() user: IUser;
  passwordForm: FormGroup;

  constructor(
    private _user: User,
    private _fb: FormBuilder,
    private _pokedexValidator: PokedexValidators,
    private _modalController: ModalController,
    private _alertController: AlertController,
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.passwordForm = this._fb.group(
      {
        password: ['', [Validators.required, Validators.pattern(PASSWORD_REGEX)]],
        confirmPassword: ['', [Validators.required, Validators.pattern(PASSWORD_REGEX)]],
      },
      { validator: this._pokedexValidator.passwordDontMatch.bind(this) },
    );
  }

  closeModal() {
    this._modalController.dismiss({
      dismissed: true,
    });
  }

  update() {
    const { name, email, userId } = this.user;
    const user = { ...this.passwordForm.value, name, email, userId };
    this._user.updateUserByNumber(user);
    this.presentSuccessAlert();
  }

  async presentSuccessAlert() {
    const alert = await this._alertController.create({
      header: 'Success',
      message: 'Successfully updated.',
      buttons: [
        {
          text: 'Continue',
          handler: (blah) => {
            this.closeModal();
          },
        },
      ],
    });

    await alert.present();
  }
}
