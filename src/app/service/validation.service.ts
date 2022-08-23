import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  public emailPattern  : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }

  samePassword(password1: string, password2: string) {
    // a la hora de ejecutar esta funcion, vamos a regresar otra funcion

    // este control es un FormGroup con controls, errors, pristine, status, value, touched... se ejecuta cada vez que haces keyUp
    return (control: AbstractControl): ValidationErrors | null => {
 
      const pass1 = control.get(password1)?.value;
      const pass2 = control.get(password2)?.value;

      // Si las claves son diferentes, vamos a marcarle al password2 que tiene un error, haciendo el metodo setErrors para añadir dicho error.
      // en este caso añadiré el error { notSamePassword: true} para luego marcar el error en el html con ts
      if(pass1 !== pass2) {
        control.get(password2)?.setErrors({ notSamePassword: true});
        return { notSamePassword: true}
      }

      // en caso de que sean iguales, pasara el anterior if, y llegara a la siguiente declaracion
      // en este caso, los errores seran null para que no salte el error en el html
      control.get(password2)?.setErrors(null)



      return null
    }
  }


}
