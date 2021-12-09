import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private url = 'http://localhost:8081/api/';
  constructor(private http: HttpClient) {

  }

  addPassenger(passenger: Object): Observable<Object> {
    return this.http.post(`${this.url}passenger`, passenger);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, {responseType: 'text'});
  }
}
