import { AbstractControl } from '@angular/forms';

export function AgeValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  let today = new Date();
  today.setTime(today.setFullYear(today.getFullYear() - 18));

  if (control.value !== '') {
    const checkDate = new Date(Date.parse(control.value));
    if (today <= checkDate) {
      return { age: true };
    }
  }
  return null;
}
