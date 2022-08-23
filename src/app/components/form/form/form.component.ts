import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormServiceService } from 'src/app/service/form-service.service';
import { PaisesService } from '../../../service/paises.service';
import { ValidationService } from '../../../service/validation.service';
import { emailPattern } from '../../../service/validators'; 
import { TableService } from '../../../service/table.service';
import { Person } from '../../../interfaces/person.interface';
import { finalize } from 'rxjs';

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
    
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }

  actualizarTable(){
    this.ts.getAllPersons().subscribe(
      resp => { 
        this.persons = [...resp];
      console.log(this.persons)}
    )
  }

  guardar(){
    // POST al db.json
     
    if(this.miFormulario.value.id === ''){

      
      this.fs.savePerson(this.miFormulario.value).pipe(
        finalize(()=> this.ts.getAllPersons().subscribe(
          resp => { 
            this.persons = [...resp];
          console.log(this.persons)}
        ))
      )
      .subscribe(
        data => {
          console.log('POST Request is successful ', data);
        }
      )
    

    } else {

      
      const index = this.miFormulario.value.id -1

      this.fs.updatePerson(this.miFormulario.value.id, this.miFormulario.value).pipe(
        finalize(()=> this.ts.getAllPersons().subscribe(
          resp => { 
            this.persons = [...resp];
          console.log(this.persons)}
        ))
      ).subscribe(
        resp => console.log(resp)
      )

       
      this.persons[index] = this.miFormulario.value
      
    }

    
  
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
    
    this.miFormulario.reset(
      event 
    )
  }

}
