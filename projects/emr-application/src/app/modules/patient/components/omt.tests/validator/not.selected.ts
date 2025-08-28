import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function dashValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value === 'NT' ? { notTestedSelected: true } : null;
  };
}