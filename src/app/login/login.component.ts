import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  Admin = false;
  roles: string[] = [];
  username!: string;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private route:Router,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        window.localStorage.setItem('username', data.username);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);       
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles; 
        if(this.roles.includes('ROLE_ADMIN')){
          this.route.navigate(['/admin']);
        } else{
        this.route.navigate(['/user']);
        }     
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void { 
    this.route.navigate(['/user'])
  }
}
