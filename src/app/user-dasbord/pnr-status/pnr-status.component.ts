import { SelectionModel } from '@angular/cdk/collections';
import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/ticket';
import { Train } from 'src/app/train';
import { TrainService } from '../../train.service';



@Component({
  selector: 'app-pnr-status',
  templateUrl: './pnr-status.component.html',
  styleUrls: ['./pnr-status.component.css']
})
export class PnrStatusComponent implements OnInit {
  closeResult!: string; 

  dataSaved = false;
  allTrain!: Observable<Train[]>;
  dataSource!: MatTableDataSource<Train>;
  dataSource1!:MatTableDataSource<Ticket>;
  selection = new SelectionModel<Train>(true, []);
  trainIdUpdate: String | undefined;
  massage = null;
  SelectedDate = null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['id','pnr','trainName','name','travelDate','ticketprice','Print'];
    ticketForm: any;
    ticketIdUpdate!: String;
    id: any;
  username!: string | null;
  
  
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
    this.username = localStorage.getItem('username');
    this.loadAllTicket();
  }
  
  
    constructor(private scroller: ViewportScroller,private formbulider: FormBuilder, private TrainService: TrainService,public dialog: MatDialog,private modalService: NgbModal) {}
    
    goDown1() {
      this.scroller.scrollToAnchor("targetRed");
    }
    loadAllTicket(){
      this.TrainService.getTicketByusername(this.username).subscribe((data:any) => {
        
        this.dataSource1 = new MatTableDataSource(data);
        console.log(data);
        
      });
    }
  
    openWindowCustomClass(content: any,id:String) {
      this.id=id;
     this. loadPassengerToPrint(this.id);
      this.modalService.open(content, { windowClass: 'dark-modal' });
    }
  
    loadPassengerToPrint(id: string) {
      this.view_print1(this.id)
      localStorage.setItem('id', id);
      this.goDown1();
      this.id=id;
      this.TrainService.getTicketById(id).subscribe(Ticket => {
        // console.log(Ticket);
        
        this.massage = null;
        this.dataSaved = false;
        this.ticketForm.controls['trainNo'].setValue(Ticket.trainNo);
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
    localStorage.setItem('id', this.id);
    window.open('http://localhost:4200/viewTicket', '_blank');
  }
 
  view_print1(id:string){
    // console.log(this.id);   
  }
    
  }
    
  
  