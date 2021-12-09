import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  username!: string;
  email!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  dob!: string;
  phonenumber!: string;
  addressLine!: string;
  city!: string;
  state!: string;
  country!: string;
  pin!: string;
  aadhaar!: string;   
  pan!: string;

  constructor(private tokenStorageService: TokenStorageService, private route:Router) { }


  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.username = user.username;
      this.email= user.email ;
      this.password= user.password ;
      this.firstName= user.firstName ;
      this.lastName=user.lastName ;
      this.dob= user.dob ;
      this.phonenumber=user.phonenumber ;
      this.addressLine=user.addressLine ;
      this.city=user.city;
      this.state=user.state ;
      this.country=user.country ;
      this.pin=user.pin ;
      this.aadhaar=user.aadhaar ;   
      this.pan=user.pan ;
      console.log(user);
    }
    

}
}