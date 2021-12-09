import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const API_URL = 'http://localhost:8081/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private route:Router) { }

  getPublicContent(){
    this.route.navigate(['/home'])
  }

  getUserBoard() {
    this.route.navigate(['/'])
  }

  getModeratorBoard() {
    this.route.navigate(['/'])
  }

  getAdminBoard() {
    this.route.navigate(['/admin'])
  }
}
