import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Train } from '../train';
import { TrainService } from '../train.service';


@Component({
  selector: 'app-trainlist',
  templateUrl: './trainlist.component.html',
  styleUrls: ['./trainlist.component.css']
})
export class TrainlistComponent implements OnInit  {
  id: any;
  ngOnInit(){
  this.trainForm = this.formbulider.group({
    trainNo: ['', [Validators.required]],
    trainName: ['', [Validators.required]],
    source: ['', [Validators.required]],
    destination: ['', [Validators.required]],
    ticketprice: ['', [Validators.required]],
  });
  this.spinner.show();
  setTimeout(() => {
    this.spinner.hide();
  }, 1000);
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
  this.TrainService.getAllTrain().subscribe(data => {
    this.dataSource = new MatTableDataSource(data);
  });
}

isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = !!this.dataSource && this.dataSource.data.length;
  return numSelected === numRows;
}

masterToggle() {
  this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(r => this.selection.select(r));
}

checkboxLabel(row: Train): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return "hello";
}
DeleteData() {
  debugger;
  const numSelected = this.selection.selected;
  if (numSelected.length > 0) {
    if (confirm("Are you sure to delete items ")) {
      
    }
  } else {
    alert("Select at least one row");
  }
}

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

loadAllTrain() {
  this.TrainService.getAllTrain().subscribe(data => {
    this.dataSource = new MatTableDataSource(data);
    console.log(data);  
  });
}
onFormSubmit() {
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
  } else if(this.trainIdUpdate != null){
    this.TrainService.updateTrain(Train,this.id).subscribe(() => {
      console.log(Train+"hello");   
      this.dataSaved = true;
      this.SavedSuccessful(3);
      this.loadAllTrain();
      this.trainForm.reset();
    });
  }
}


deletePassenger(id: string) {
  // console.log(id);    
  if (confirm("Are you sure you want to delete this ?")) {
    this.TrainService.deleteTrainById(id).subscribe(() => {
      this.dataSaved = true;
      this.SavedSuccessful(2);
      this.loadAllTrain();
      // this.employeeIdUpdate = null;
      this.trainForm.reset();

    });
  }

}


resetForm() {
  this.trainForm.reset();
  this.massage = null;
  this.dataSaved = false;
  this.loadAllTrain();
}
loadTrainToEdit(id: any) {
  this.TrainService.getTrainById(id).subscribe(Train => {
    this.id=id;
    console.log(this.id);
    
    this.massage = null;
    this.dataSaved = false;
    this.trainIdUpdate = id;
    this.trainForm.controls['trainNo'].setValue(Train.trainNo);
    this.trainForm.controls['trainName'].setValue(Train.trainName);
    this.trainForm.controls['source'].setValue(Train.source);
    this.trainForm.controls['destination'].setValue(Train.destination);
    this.trainForm.controls['ticketprice'].setValue(Train.ticketprice);
    
  });  

  
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
  else if (isUpdate == 2) {
    this._snackBar.open('Record Deleted Successfully!', 'Close', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}

  
  
}
