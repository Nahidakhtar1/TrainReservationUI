import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
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
  displayedColumns: string[] = ['trainNo','trainName','source','destination','ticketprice','select'];




  constructor(
    private http: HttpClient, private TrainService: TrainService,private formbulider: FormBuilder,
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
      this.dataSource = new MatTableDataSource(data);
      console.log(data);  
     this.datalist=data
    });
  }
  // websiteList: any = ['ItSolutionStuff.com', 'HDTuto.com', 'Nicesnippets.com']
  
  form = new FormGroup({
    website: new FormControl('', Validators.required)
  });
  
  get f(){
    return this.form.controls;
  }
  
  submit(){
    console.log(this.form.value);
  }
  changeWebsite(e:any) {
    console.log(e.target.value);
  }

  onsubmit(){
  const Train = this.form.value;
  this.searchTrain(Train)
  }

  searchTrain(Train: Train){
    this.TrainService.getTrainBysource(this.source,this.destination).subscribe((data:any) => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
    });
}
}
