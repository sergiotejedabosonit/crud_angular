import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from '../../../interfaces/person.interface';
import { TableService } from '../../../service/table.service';
import { FormServiceService } from '../../../service/form-service.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
    `
      .button_pointier{
        cursor: pointer;
      }
    `
  ]
})
export class TableComponent implements OnInit {
  
  @Input() persons!: Person[]
  @Output() onEditUser = new EventEmitter<any>()

  constructor(
    private ts: TableService,
    private fs: FormServiceService
  ) { }

  ngOnInit(): void {
  }
  
  buscarUser(id: number){
    this.ts.getPersonById(id).subscribe(
      (person) => this.onEditUser.emit(person)
    )
  }
  
  eliminarUser(id: number){
    

    this.fs.deletePerson(id)
    .pipe(
      finalize(()=> this.ts.getAllPersons().subscribe(
        resp => { 
          this.persons = [...resp];
       }
      ))
    )
    .subscribe(
      resp => console.log(resp)
    )
  }
}
