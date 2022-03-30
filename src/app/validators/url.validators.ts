import { AbstractControl } from '@angular/forms';

export function urlValidator(control: AbstractControl) {

    if (control && control.value !== null && control.value !== undefined) {
        const regex = /^https?:\/\/[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

        const url = control.value as string;

        if (!url.match(regex) && url.length > 0) {
            return { invalidUrl: true };
        }
    }
    return null;
}
