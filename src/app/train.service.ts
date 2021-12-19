import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Train } from './train';
import { Ticket } from './ticket';
import { tick } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  createTicket1(Ticket: Ticket) {
    throw new Error('Method not implemented.');
  }
  updatePassenger(Ticket: Ticket) {
    throw new Error('Method not implemented.');
  }
  updateTrainById(id: string) {
    throw new Error('Method not implemented.');
  }
  url = 'http://localhost:8080/api/Trains/';

  constructor(private http: HttpClient) { }

  getAllTrain(): Observable<Train[]> {
    return this.http.get<Train[]>(this.url);
  }

  getAllTicket(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>('http://localhost:8080/api/alltickets');
  }

  getTrainById(id: string): Observable<Train> {
    return this.http.get<Train>(this.url+ id);
  }

  createTrain(Train: Train): Observable<Train> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'}) };
    return this.http.post<Train>(this.url,
      Train, httpOptions);
  }

  updateTrain(Train: Train,id:any): Observable<Train> {
    console.log('this is from service update train'+id);
    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    let body={"trainNo":Train.trainNo,"trainName":Train.trainName,"source":Train.source,"destination":Train.destination,"ticketprice":Train.ticketprice}
    // console.log(Train.id);    
    return this.http.put<Train>('http://localhost:8080/api/updateTrains/'+
      id,body, httpOptions);
  }

  deleteTrainById(id: string): Observable<number> {
    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.url + id);
  
}


createTicket(Ticket: Ticket): Observable<Ticket> { 
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'}) };
  return this.http.post<Ticket>('http://localhost:8080/tickets',
  Ticket, httpOptions);
}

getTicketById(pnr: string): Observable<Ticket> {
  return this.http.get<Ticket>('http://localhost:8080/api/tickets/'+ pnr);
}


getTicketByusername(username: any): Observable<Ticket> {
  return this.http.get<Ticket>('http://localhost:8080/api/ticketsByUser/'+ username);
}

getTrainBysource(source: any,destination:any): Observable<Train>{
  return this.http.get<Train>('http://localhost:8080/api//trainBySource/'+source+destination)
}
}
