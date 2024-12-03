import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ageValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const dateOfBirth = control.value;
        if (dateOfBirth == null) return null;

        const today = new Date();
        const birthday = new Date(dateOfBirth);

        let age = today.getFullYear() - birthday.getFullYear();

        const monthDifference = today.getMonth() - birthday.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthday.getDate())) {
            age--;
        }

        console.log(age);

        return age >= 18 ? null : { ageInvalid: true };
    }
}