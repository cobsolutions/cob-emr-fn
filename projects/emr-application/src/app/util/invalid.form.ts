import { FormGroup, FormArray, FormControl } from "@angular/forms";

export class InvalidFormControls {
    public static findInvalidControlsRecursive(formToInvestigate: FormGroup | FormArray): string[] {
        const invalidControls: string[] = [];
        const recursiveFunc = (form: FormGroup | FormArray) => {
            Object.keys(form.controls).forEach(field => {
                const control = form.get(field);
                if (control instanceof FormGroup || control instanceof FormArray) {
                    recursiveFunc(control); // Recursively check nested forms/arrays
                } else if (control instanceof FormControl && control.invalid) {
                    invalidControls.push(field);
                }
            });
        };
        recursiveFunc(formToInvestigate);
        return invalidControls;
    }
}