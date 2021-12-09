import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Passenger } from './passenger';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  updatePassengerById(id: string) {
    throw new Error('Method not implemented.');
  }
  url = 'http://localhost:8080/api/passenger/';

  constructor(private http: HttpClient) { }

  getAllPassenger(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(this.url);
  }

  getPassengerById(id: string): Observable<Passenger> {
    return this.http.get<Passenger>(this.url+ id);
  }

  createPassenger(Passenger: Passenger): Observable<Passenger> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'}) };
    return this.http.post<Passenger>(this.url,
      Passenger, httpOptions);
  }

  updatePassenger(Passenger: Passenger): Observable<Passenger> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    let body={"name":Passenger.name,"age":Passenger.age,"gender":Passenger.gender}
    return this.http.put<Passenger>('http://localhost:8080/api/Updatepassenger/'+
      Passenger.id,body, httpOptions);
  }

  deletePassengerById(id: string): Observable<number> {
    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.url + id);
  
}


}
