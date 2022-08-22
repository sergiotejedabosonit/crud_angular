import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormServiceService } from 'src/app/service/form-service.service';
import { PaisesService } from '../../../service/paises.service';
import { ValidationService } from '../../../service/validation.service';
import { emailPattern } from '../../../service/validators'; 
import { TableService } from '../../../service/table.service';
import { Person } from '../../../interfaces/person.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [
    `
      .button_pointier{
        cursor: pointer;
      }
    `
  ]
})
export class FormComponent implements OnInit {

  public paises: any[] = []
  public persons: Person[] = []

  constructor(
    private servPaises: PaisesService,
    private fb: FormBuilder,
    private vs: ValidationService,
    private fs: FormServiceService,
    private ts: TableService
  ) { }

  miFormulario: FormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
    password2: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(emailPattern)]],
    notifications: [false],
    country: ['', [Validators.required]],
    city: ['', [Validators.required]]
  },{
    validators: [this.vs.samePassword('password','password2')]
  })

  ngOnInit(): void {
    this.servPaises.getAllCountries().subscribe(
      (paises) => this.paises = paises
    )

    this.ts.getAllPersons().subscribe(
      (persons) => this.persons = persons
    )
    
  }
  
  campoEsValido( campo: string){
    console.log(this.miFormulario.controls[campo].errors)
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }

  guardar(){
    // POST al db.json

    if(this.miFormulario.value.id === ''){

      console.log('id === nada')
      this.fs.savePerson(this.miFormulario.value)

    
    const newPerson = this.miFormulario.value
    newPerson.id = this.persons.length+1
    console.log(this.persons.length+1)

    console.log(newPerson)
  
    //para que se vea en directo, voy a hacer push a persons
    this.persons.push(
      newPerson
      )

     
    } else {

      console.log('id', this.miFormulario.value)
      const index = this.miFormulario.value.id -1

      this.fs.updatePerson(this.miFormulario.value.id, this.miFormulario.value)

      console.log(this.persons[0])
      this.persons[index] = this.miFormulario.value
      
    }

    console.log('pasamos por guardar')
  
    // Reset de los valores del formulario
    this.miFormulario.reset({
      name: '',
      password: '',
      password2:  '',
      email:  '',
      notifications: false,
      country: '',
      city: ''
    })  
   
  }

  editUser( event: any){
    console.log(event)
    this.miFormulario.reset(
      event 
    )
  }

}
