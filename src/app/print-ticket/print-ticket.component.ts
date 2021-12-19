import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TrainService } from '../train.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



@Component({
  selector: 'app-print-ticket',
  templateUrl: './print-ticket.component.html',
  styleUrls: ['./print-ticket.component.css'],
  styles: []
})



export class PrintTicketComponent implements OnInit{

  id: any;
  ticketForm: any;
  constructor(private TrainService: TrainService,private formbulider: FormBuilder) {}

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
@ViewChild("screen")
screen!: ElementRef;
@ViewChild("canvas")
canvas!: ElementRef;
@ViewChild("downloadLink")
downloadLink!: ElementRef;
canavas!:any;
downloadImage() {
  html2canvas(this.screen.nativeElement).then(canvas => {
    this.canvas.nativeElement.src = canvas.toDataURL();
    this.downloadLink.nativeElement.href = canvas.toDataURL("image/png");
    // this.downloadLink.nativeElement.download = "Ticket.png";
    // this.downloadLink.nativeElement.click();
    var imgWidth = 208;   
    var pageHeight = 295;    
    var imgHeight = canvas.height * imgWidth / canvas.width;  
    var heightLeft = imgHeight;  

    const contentDataURL = canvas.toDataURL('image/png')  
    let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
    var position = 0;  
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
    pdf.save('MYPdf.pdf'); // Generated PDF 
  });
}

  
   
}

