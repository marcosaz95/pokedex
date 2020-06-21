import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Injectable()
export class PokedexValidators {
  passwordDontMatch(group: FormGroup): ValidationErrors | null {
    const { password, confirmPassword } = group.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { dontMatch: true };
    }
    return null;
  }
}
