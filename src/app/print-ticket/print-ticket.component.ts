import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TrainService } from '../train.service';




@Component({
  selector: 'app-print-ticket',
  templateUrl: './print-ticket.component.html',
  styleUrls: ['./print-ticket.component.css'],
  styles: []
})



export class PrintTicketComponent implements OnInit{

  id: any;
  ticketForm: any;

ngOnInit(){
  this.ticketForm=this.formbulider.group({
    pnr: [''],
    trainName: [''],
    source: [''],
    destination: [''], 
    name: [''],
    age: [''],
    gender: [''],
    travelDate: [''],
    ticketprice:[''],
    trainNo:['']
    
  })
  if (window.localStorage.getItem('id') != null) {
    this.id = window.localStorage.getItem('id');
  this.TrainService.getTicketById(this.id).subscribe(Ticket => {
    console.log(Ticket);
    this.ticketForm.controls['pnr'].setValue(Ticket.pnr);
    this.ticketForm.controls['trainNo'].setValue(Ticket.trainNo);
    this.ticketForm.controls['trainName'].setValue(Ticket.trainName);
    this.ticketForm.controls['source'].setValue(Ticket.source);
    this.ticketForm.controls['destination'].setValue(Ticket.destination);
    this.ticketForm.controls['name'].setValue(Ticket.name);
    this.ticketForm.controls['age'].setValue(Ticket.age);
    this.ticketForm.controls['gender'].setValue(Ticket.gender);
    this.ticketForm.controls['travelDate'].setValue(Ticket.travelDate);
    this.ticketForm.controls['ticketprice'].setValue(Ticket.ticketprice);
    // localStorage.clear();
  });
  
}

}


  constructor(private TrainService: TrainService,private formbulider: FormBuilder) {}
  
   
}

