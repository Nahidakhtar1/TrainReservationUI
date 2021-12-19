import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrainComponent } from './train/train.component';
import { TicketBookingComponent } from './ticket-booking/ticket-booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PassengerComponent } from './passenger/passenger.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlModule } from 'ngx-owl-carousel';


import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PrintTicketComponent } from './print-ticket/print-ticket.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TrainlistComponent } from './trainlist/trainlist.component';


import { NgxSpinnerModule } from "ngx-spinner";
import { SignupComponent } from './signup/signup.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { NavpanelComponent } from './navpanel/navpanel.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserComponent } from './user/user.component';
import { ProfileViewComponent } from './user-dasbord/profile-view/profile-view.component';
import { PnrStatusComponent } from './user-dasbord/pnr-status/pnr-status.component';
import { ReservationComponent } from './user-dasbord/reservation/reservation.component';
import { Part1Component } from './user-dasbord/reservation/reservationcomponents/part1/part1.component';
import { AdminComponent } from './admin/admin.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminNotificationComponent } from './admin-dashboard/admin-notification/admin-notification.component';
import { BookingVerficationComponent } from './admin-dashboard/booking-verfication/booking-verfication.component';
import { ProfuleAdminComponent } from './admin-dashboard/profule-admin/profule-admin.component';
import { TrainScheduleComponent } from './admin-dashboard/train-schedule/train-schedule.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NotificationUComponent } from './user-dasbord/notification-u/notification-u.component';
import { ExplIndiaComponent } from './user-dasbord/expl-india/expl-india.component';
import { SxplMaharajaComponent } from './user-dasbord/sxpl-maharaja/sxpl-maharaja.component';
import { ExplSeasonsComponent } from './user-dasbord/expl-seasons/expl-seasons.component';

@NgModule({
  declarations: [
    AppComponent,
    TrainComponent,
    TicketBookingComponent,
    PassengerComponent,
    LoginComponent,
    HomeComponent,
    PrintTicketComponent,
    TrainlistComponent,
    SignupComponent,
    SignupFormComponent,
    HomeViewComponent,
    NavpanelComponent,
    WelcomeComponent,
    UserComponent,
    ProfileViewComponent,
    PnrStatusComponent,
    ReservationComponent,
    Part1Component,
    AdminComponent,
    AdminNavComponent,
    AdminNotificationComponent,
    BookingVerficationComponent,
    ProfuleAdminComponent,
    TrainScheduleComponent,
    NotificationUComponent,
    ExplIndiaComponent,
    SxplMaharajaComponent,
    ExplSeasonsComponent
  ],
  imports: [
    BrowserModule,  
    AppRoutingModule,  
    FormsModule,  
    ReactiveFormsModule,  
    HttpClientModule,
    OwlModule,
    NgbModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatRadioModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatToolbarModule,
    AppRoutingModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    CdkTableModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    AutocompleteLibModule
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
