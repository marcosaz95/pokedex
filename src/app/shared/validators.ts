import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Injectable()
export class PokedexValidators {
  /**
   *
   * Custom validator to verify if password matches or not
   * @param {FormGroup} group
   * @returns {(ValidationErrors | null)}
   * @memberof PokedexValidators
   */
  passwordDontMatch(group: FormGroup): ValidationErrors | null {
    const { password, confirmPassword } = group.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { dontMatch: true };
    }
    return null;
  }
}
