import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TrainService } from 'src/app/train.service';
import { Train } from 'c:/Users/HP/Desktop/AngularDemo/src/app/train';

@Component({
  selector: 'app-part1',
  templateUrl: './part1.component.html',
  styleUrls: ['./part1.component.css']
})
export class Part1Component implements OnInit {
 
  dataSource: any;
  datalist!: import("c:/Users/HP/Desktop/AngularDemo/src/app/train").Train[];
  trainForm: any;
  private _snackBar: any;
  horizontalPosition: any;
  verticalPosition: any;
  source:any;
  destination:any;
  displayedColumns: string[] = ['trainNo','trainName','source','destination','ticketprice','Select'];
  username!: string | null;
  trainIdUpdate!: String;
  ticketForm: any;




  constructor(
    private http: HttpClient, private TrainService: TrainService,private formbulider: FormBuilder,private route:Router
  ) { }

  ngOnInit() {
    this.form = this.formbulider.group({
      source: ['', [Validators.required]],
      destination: ['', [Validators.required]],
    });
  this.loadAllTrain();
  }

  loadAllTrain() {
    this.TrainService.getAllTrain().subscribe(data => {
     this.datalist=data
    });
  }
  form = new FormGroup({
    source: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required)
  });
  
  get f(){
    return this.form.controls;
  }
  
  submit(){
    console.log(this.form.value);
  }
  changeWebsite(e:any) {
    const Train = this.form.value;    
  }

  onsubmit(){
  const Train = this.form.value;
  this.searchTrain(Train);  
  }

  searchTrain(Train: Train){    
    this.source=Train.source;
    this.destination=Train.destination;
    this.TrainService.getTrainBysource(this.source,this.destination).subscribe((data:any) => {
      if(data==''){
        alert('no data found')
      }else{
      this.dataSource = new MatTableDataSource(data);
      }
    });
}

loadTrainToSelect(id: string){
  this.username = window.localStorage.getItem('username');
  this.TrainService.getTrainById(id).subscribe(Train =>{
    window.localStorage.setItem('id', id);
    this.route.navigate(['user/booking/seating/details'])   
  });
}
}
