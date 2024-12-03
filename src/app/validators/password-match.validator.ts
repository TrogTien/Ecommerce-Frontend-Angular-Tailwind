import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatchValidator(firstControlName: string, secondControlName: string) {
    return (absControl: AbstractControl): ValidationErrors | null => {
        const { value: firstControlValue } = absControl.get(firstControlName) as AbstractControl;
        const { value: secondControlValue } = absControl.get(secondControlName) as AbstractControl;

        return firstControlValue === secondControlValue ? null : { passwordNotMatch: true };
    }
}