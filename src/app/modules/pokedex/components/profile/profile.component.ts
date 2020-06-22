import { PasswordFormComponent } from './password-form/password-form.component';
import { IUser } from 'src/app/models/interfaces/user.interface';
import { Router } from '@angular/router';
import { EMAIL_REGEX } from './../../../../shared/constants';
import { User } from './../../../../models/classes/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  mode: string;

  constructor(
    private _user: User,
    private _fb: FormBuilder,
    private _alertController: AlertController,
    private _router: Router,
    private _modalController: ModalController,
  ) {
    this.mode = 'view';
  }

  ngOnInit() {
    this.buildForm();
  }

  /**
   *
   * builds the form
   * @memberof ProfileComponent
   */
  buildForm() {
    const currentUser = this._user.profile;
    const { name, email } = this._user.profile;
    this.userForm = this._fb.group({
      name: [name, Validators.required],
      email: [email, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: [{ value: '*****', disabled: true }],
    });
  }

  /**
   *
   * updates the user information
   * @memberof ProfileComponent
   */
  update() {
    const { userId, password } = this._user.profile;
    const userToUpdate: IUser = { ...this.userForm.value, userId, password };
    this._user.updateUserByNumber(userToUpdate);
    this.presentSuccessAlert();
  }

  /**
   *
   * opnes password form in a modal
   * @memberof ProfileComponent
   */
  openPasswordForm() {
    this.openModal();
  }

  async openModal() {
    const modal = await this._modalController.create({
      component: PasswordFormComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        user: this._user.profile,
      },
    });
    return await modal.present();
  }

  /**
   *
   * displayes a success alert after user is updated
   * @memberof ProfileComponent
   */
  async presentSuccessAlert() {
    const alert = await this._alertController.create({
      header: 'Success',
      message: 'Successfully updated.',
      buttons: [
        {
          text: 'Continue',
          handler: (blah) => {
            this._router.navigate(['pokedex']);
          },
        },
      ],
    });

    await alert.present();
  }
}
