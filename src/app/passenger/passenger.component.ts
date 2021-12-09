import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { identity, Observable } from 'rxjs';
import { PassengerService } from '../passenger.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Passenger } from '../passenger';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit {
  ngOnInit(){
    this.passengerForm = this.formbulider.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
    this.loadAllPassenger();
  }
  dataSaved = false;
  passengerForm: any;
  allPassenger!: Observable<Passenger[]>;
  dataSource!: MatTableDataSource<Passenger>;
  selection = new SelectionModel<Passenger>(true, []);
  passengerIdUpdate: string | undefined;
  massage = null;
  SelectedDate = null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['id','name', 'age', 'gender', 'Edit', 'Delete'];



  constructor(private formbulider: FormBuilder, private PassengerService: PassengerService, private _snackBar: MatSnackBar, public dialog: MatDialog) {
    this.PassengerService.getAllPassenger().subscribe(data => {
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

  checkboxLabel(row: Passenger): string {
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

 

  loadAllPassenger() {
    this.PassengerService.getAllPassenger().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  onFormSubmit() {   
    this.dataSaved = false;
    const Passenger = this.passengerForm.value;
    this.CreatePassenger(Passenger);
    this.passengerForm.reset();

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
 
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadPassengerToEdit(id: string) {
    console.log(id);
    
    this.PassengerService.getPassengerById(id).subscribe(Passenger => {
      this.massage = null;
      this.dataSaved = false;
      this.passengerIdUpdate = Passenger.id;
      this.passengerForm.controls['id'].setValue(Passenger.id);
      this.passengerForm.controls['name'].setValue(Passenger.name);
      this.passengerForm.controls['age'].setValue(Passenger.age);
      this.passengerForm.controls['gender'].setValue(Passenger.gender);
      
    });
    
  }
  
  CreatePassenger(Passenger: Passenger) {
    if (this.passengerIdUpdate == null) {
      this.PassengerService.createPassenger(Passenger).subscribe(
        () => {
          this.dataSaved = true;
          this.SavedSuccessful(1);
          this.loadAllPassenger();
          
          this.passengerForm.reset();
        }
      );
    } else {
      this.PassengerService.updatePassenger(Passenger).subscribe(() => {
        console.log(Passenger);        
        this.dataSaved = true;
        this.SavedSuccessful(0);
        this.loadAllPassenger();
        this.passengerForm.reset();
      });
    }
  }
  deletePassenger(id: string) {
    console.log(id);    
    if (confirm("Are you sure you want to delete this ?")) {
      this.PassengerService.deletePassengerById(id).subscribe(() => {
        this.dataSaved = true;
        this.SavedSuccessful(2);
        this.loadAllPassenger();
        // this.employeeIdUpdate = null;
        this.passengerForm.reset();

      });
    }

  }

  

  resetForm() {
    this.passengerForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllPassenger();
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
