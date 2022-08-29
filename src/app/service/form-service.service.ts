import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../interfaces/person.interface';
import { TableService } from './table.service'; 

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  private _baseUrl = 'http://localhost:3000/persons'

  constructor(
    private http: HttpClient,
    private ts: TableService
  ) { }

  savePerson(person: Person) {

   return this.http.post<Person>(this._baseUrl, person)

  }

  updatePerson(id: number, person: Person) {
    const url = `${this._baseUrl}/${id}`
    
    return this.http.put<Person>(url, person)
  }


  deletePerson(id: number) {
    const url = `${this._baseUrl}/${id}`
     
    return this.http.delete<Person>(url)
  }

}
