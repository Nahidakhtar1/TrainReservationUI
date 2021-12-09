import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ticket } from 'src/app/ticket';
import { TrainService } from '../../train.service';


@Component({
  selector: 'app-booking-verfication',
  templateUrl: './booking-verfication.component.html',
  styleUrls: ['./booking-verfication.component.css']
})
export class BookingVerficationComponent implements OnInit {
  closeResult!: string; 

  dataSaved = false;
  dataSource1!:MatTableDataSource<Ticket>;
  trainIdUpdate: String | undefined;
  massage = null;
  SelectedDate = null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['id','pnr','trainName','name','travelDate','ticketprice','Print'];
    ticketForm: any;
    ticketIdUpdate!: String;
    id: any;
  
  
  ngOnInit(){
    this.loadAllTicket();
  }
  
  
    constructor(private scroller: ViewportScroller, private TrainService: TrainService,public dialog: MatDialog,private modalService: NgbModal) {}
    
    goDown1() {
      this.scroller.scrollToAnchor("targetRed");
    }
    loadAllTicket(){
      this.TrainService.getAllTicket().subscribe(data => {
        this.dataSource1 = new MatTableDataSource(data);
        console.log(this.dataSource1);
        
      });
    }
  
    openWindowCustomClass(content: any,id:String) {
      console.log(id);
      this.id=id;
     this. loadPassengerToPrint(this.id);
      this.modalService.open(content, { windowClass: 'dark-modal' });
    }
  
    loadPassengerToPrint(id: string) {
      this.view_print1(this.id)
      window.localStorage.setItem('id', id);
      this.goDown1();
      console.log();
      this.id=id;
      this.TrainService.getTicketById(id).subscribe(Ticket => {
        console.log(Ticket);
        
        this.massage = null;
        this.dataSaved = false;
        // this.passengerIdUpdate = Passenger.id;
        this.ticketForm.controls['pnr'].setValue(Ticket.pnr);
        this.ticketForm.controls['trainName'].setValue(Ticket.trainName);
        this.ticketForm.controls['source'].setValue(Ticket.source);
        this.ticketForm.controls['destination'].setValue(Ticket.destination);
        this.ticketForm.controls['name'].setValue(Ticket.name);
        this.ticketForm.controls['age'].setValue(Ticket.age);
        this.ticketForm.controls['gender'].setValue(Ticket.gender);
        this.ticketForm.controls['travelDate'].setValue(Ticket.travelDate);
        this.ticketForm.controls['ticketprice'].setValue(Ticket.ticketprice);
        
      });
      
    }
 view_print() {
      this.view_print1(this.id);
    window.localStorage.setItem('id', this.id);
    window.open('http://localhost:4200/viewTicket', '_blank');
  }
 
  view_print1(id:string){
    console.log(this.id);   
  }
    
  }
    
  