import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Train } from 'src/app/train';
import { TrainService } from './../../train.service'



@Component({
  selector: 'app-train-schedule',
  templateUrl: './train-schedule.component.html',
  styleUrls: ['./train-schedule.component.css']
})
export class TrainScheduleComponent implements OnInit {
  id: any;
  ngOnInit(){
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  this.trainForm = this.formbulider.group({
    trainNo: ['', [Validators.required]],
    trainName: ['', [Validators.required]],
    source: ['', [Validators.required]],
    destination: ['', [Validators.required]],
    ticketprice: ['', [Validators.required]],
  });
  
  this.loadAllTrain();
}
dataSaved = false;
trainForm: any;
allTrain!: Observable<Train[]>;
dataSource!: MatTableDataSource<Train>;
selection = new SelectionModel<Train>(true, []);
trainIdUpdate:any;
massage = null;
SelectedDate = null;
horizontalPosition: MatSnackBarHorizontalPosition = 'center';
verticalPosition: MatSnackBarVerticalPosition = 'bottom';
displayedColumns: string[] = ['trainNo','trainName','source','destination','ticketprice'];



constructor(private formbulider: FormBuilder, private TrainService: TrainService, private _snackBar: MatSnackBar, public dialog: MatDialog,private spinner: NgxSpinnerService) {
  this.TrainService.getAllTrain().subscribe((data: Train[] | undefined) => {
    this.dataSource = new MatTableDataSource(data);
  });
}




loadAllTrain() {
  this.TrainService.getAllTrain().subscribe((data: Train[] | undefined) => {
    this.dataSource = new MatTableDataSource(data);
    console.log(data);
    
    
    
  });
}
onFormSubmit() {
  this.spinner.show();
  setTimeout(() => {
    this.spinner.hide();
  }, 1000);
  this.dataSaved = false;
  const Train = this.trainForm.value;
  this.CreateTrain(Train,this.id);
  console.log('this is on form submit'+this.id);
  
  this.trainForm.reset();
  console.log('this is trainIdUpdate'+this.trainIdUpdate)
}

CreateTrain(Train: Train,id:any) {
  if (this.trainIdUpdate == null) {
    this.TrainService.createTrain(Train).subscribe(
      () => {
        this.dataSaved = true;
        this.SavedSuccessful(1);
        this.loadAllTrain();
        
        this.trainForm.reset();
      }
    );
  } 
}




resetForm() {
  this.trainForm.reset();
  this.massage = null;
  this.dataSaved = false;
  this.loadAllTrain();
}


SavedSuccessful(isUpdate: number) {
  if (isUpdate == 0) {
    this._snackBar.open('Record Updated Successfully!', 'Close', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  else if (isUpdate == 1) {
    this._snackBar.open('Record Saved Successfully!', 'Close', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}

  
  
}
