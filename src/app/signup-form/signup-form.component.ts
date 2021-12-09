import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Users } from '../train';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  UserForm: any;
  register: any;
  
  constructor(private authService: AuthService,private formbulider: FormBuilder) { }


  
  ngOnInit(): void {
  this.UserForm = this.formbulider.group({
    username: [''],
    email: [''],
    password: [''],

    firstName:[''],
    lastName:[''],
    phonenumber:[''],
    aadhaar:[''],
    dob:[''],
    addressLine:[''],
    city:[''],
    state:[''],
    country:[''],
    pin:[''],
    pan:[''],
  });
  }

  onSubmit() {
    const Users = this.UserForm.value;
    this.CreateUser(Users);
    // console.log(Users);
  }

  CreateUser(Users:Users) {
          this.authService.register(Users).subscribe(
      data => {
        console.log("SUCESS");
        
      },
      err => {
       console.log(err+"error");
       
      }
    );
  }
}


