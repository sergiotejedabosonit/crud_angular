import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../interfaces/person.interface';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  private _baseUrl = 'http://localhost:3000/persons'

  constructor(
    private http: HttpClient
  ) { }

  savePerson( person: Person){

    console.log('savePerson')
   return  this.http.post<Person>(this._baseUrl , person ).subscribe(
    data => {
      console.log('POST Request is successful ', data);
    } 
   )
      
  }

  updatePerson( id: number, person: Person) {
    const url = `${this._baseUrl}/${id}`
    console.log('updatePerson')
    return this.http.put<Person>(url, person).subscribe(
      resp => console.log(resp)
    )
  }


  deletePerson(id: number){
    const url = `${this._baseUrl}/${id}`
    console.log('deletePerson')
    return this.http.delete<Person>(url).subscribe(
      resp => console.log(resp)
    )
  }

}
