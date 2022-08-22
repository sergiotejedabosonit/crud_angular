import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  private _baseUrl = 'https://restcountries.com/v2/'
  
  constructor(
    private http: HttpClient
  ) { }

  getAllCountries(): Observable<any | null> {
    const url = `${this._baseUrl}all?fields=name`
    return this.http.get(url)
  }
  
}
