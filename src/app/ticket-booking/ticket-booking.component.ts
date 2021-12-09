import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Train } from '../train';
import { TrainService } from '../train.service';
import { Ticket } from '../ticket';
import { NgxSpinnerService } from 'ngx-spinner';
import { ViewportScroller } from '@angular/common';
// import { TicketService } from '../ticket.service';


@Component({
  selector: 'app-ticket-booking',
  templateUrl: './ticket-booking.component.html',
  styleUrls: ['./ticket-booking.component.css']
})
export class TicketBookingComponent implements OnInit {
  
  dataSaved = false;
allTrain!: Observable<Train[]>;
dataSource!: MatTableDataSource<Train>;
selection = new SelectionModel<Train>(true, []);
trainIdUpdate: String | undefined;
massage = null;
SelectedDate = null;
horizontalPosition: MatSnackBarHorizontalPosition = 'center';
verticalPosition: MatSnackBarVerticalPosition = 'bottom';
displayedColumns: string[] = ['trainNo','trainName','source','destination','ticketprice','Select'];
  ticketForm: any;
  ticketIdUpdate!: String;
  counter: any;
  paymentHandler:any = null;
  username!: string | null;

ngOnInit(){
  this.invokeStripe();

  this.ticketForm=this.formbulider.group({
    pnr: [''],
    trainName: ['', [Validators.required]],
    source: ['', [Validators.required]],
    destination: ['', [Validators.required]], 
    name: ['', [Validators.required]],
    age: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    travelDate: ['', [Validators.required]],
    ticketprice: ['', [Validators.required]],
    username:['']
  })
  this.loadAllTrain();
}
  constructor(private scroller: ViewportScroller,private formbulider: FormBuilder, private TrainService: TrainService,  private _snackBar: MatSnackBar, public dialog: MatDialog,private http: HttpClient,private spinner: NgxSpinnerService) {
    this.TrainService.getAllTrain().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  
 
 
 
  loadAllTrain() {
    this.TrainService.getAllTrain().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      
    });
  }
  onFormSubmit() {
    this.dataSaved = false;
    const Ticket = this.ticketForm.value;
    this. makePayment(Ticket.ticketprice);
  }
  
 
  
 
  resetForm() {
    this.ticketForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllTrain();
  }
  
  loadTrainToSelect(id: string){
    this.goDown1();
    this.username = window.localStorage.getItem('username');
    this.TrainService.getTrainById(id).subscribe(Train =>{
     
      this.trainIdUpdate = Train.id;
      this.massage =null;
      this.dataSaved=false;
      this.ticketForm.controls['username'].setValue(this.username);
      this.ticketForm.controls['trainName'].setValue(Train.trainName);
      this.ticketForm.controls['source'].setValue(Train.source);
      this.ticketForm.controls['destination'].setValue(Train.destination);
      this.ticketForm.controls['ticketprice'].setValue(Train.ticketprice);

    });
  }

  createTicket(Ticket: Ticket) {
    // console.log("in ts file"+Ticket);        
        this.createTicket1(Ticket).subscribe(
          () => {
            this.dataSaved = true;
            this.SavedSuccessful(1);
            this.loadAllTrain();            
            this.ticketForm.reset();
          }
        );
    }
    
    createTicket1(Ticket: Ticket): Observable<Ticket> {
      // console.log("in service");
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'}) };
      return this.http.post<Ticket>('http://localhost:8080/api/tickets',
      Ticket, httpOptions);
    }
  SavedSuccessful(isUpdate: number) {
    if (isUpdate == 1) {
      this._snackBar.open('Ticket Booked Successfully!', 'Close', {
        duration: 0,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  makePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JyXGlSDtDXhriKSA0zwWOQr1Hc1ZX7vDSTo6skYXdq9Ye6IF9jorof5cPs1wISw5Gbn4SDgwPeGscosY73QfzTs00QqxmIoqv',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        alert('Stripe token generated!');
      }
    });
  
    paymentHandler.open({
      name: 'Sarthi',
      description: 'Easy Payment',
      amount: amount * 100
    });
    this.dataSaved = false;
    const Ticket = this.ticketForm.value;
    this.createTicket(Ticket);
    this.SavedSuccessful(1);
  }
  
  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51JyXGlSDtDXhriKSA0zwWOQr1Hc1ZX7vDSTo6skYXdq9Ye6IF9jorof5cPs1wISw5Gbn4SDgwPeGscosY73QfzTs00QqxmIoqv',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }
        
      window.document.body.appendChild(script);
    }
  
  
  }
  goDown1() {
    this.scroller.scrollToAnchor("targetRed");
  }
}



