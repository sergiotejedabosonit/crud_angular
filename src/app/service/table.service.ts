import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private _baseUrl = 'http://localhost:3000/persons'

  constructor(
    private http: HttpClient
  ) { }

  getAllPersons(): Observable<any | null>{
    
    return this.http.get(this._baseUrl)

  }

  getPersonById(id: number){

    const url = `${this._baseUrl}/${id}`

    return this.http.get(url)
  }

}
