import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminNotificationComponent } from './admin-dashboard/admin-notification/admin-notification.component';
import { BookingVerficationComponent } from './admin-dashboard/booking-verfication/booking-verfication.component';
import { ProfuleAdminComponent } from './admin-dashboard/profule-admin/profule-admin.component';
import { TrainScheduleComponent } from './admin-dashboard/train-schedule/train-schedule.component';
import { AdminComponent } from './admin/admin.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PassengerComponent } from './passenger/passenger.component';
import { PrintTicketComponent } from './print-ticket/print-ticket.component';
import { SignupComponent } from './signup/signup.component';
import { TicketBookingComponent } from './ticket-booking/ticket-booking.component';
import { TrainComponent } from './train/train.component';
import { TrainlistComponent } from './trainlist/trainlist.component';
import { PnrStatusComponent } from './user-dasbord/pnr-status/pnr-status.component';
import { ProfileViewComponent } from './user-dasbord/profile-view/profile-view.component';
import { ReservationComponent } from './user-dasbord/reservation/reservation.component';
import { Part1Component } from './user-dasbord/reservation/reservationcomponents/part1/part1.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'view-train', component: TrainComponent },  
  { path: 'add-passenger', component: PassengerComponent },
  { path: 'book-ticket', component:TicketBookingComponent},
  { path: 'viewTicket', component:PrintTicketComponent},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'trainlist', component: TrainlistComponent },

  { path: 'signup', component: SignupComponent },

  { path: 'admin', component: AdminComponent, children: [
    { path: '', component: HomeViewComponent },
    { path: 'profile', component: ProfuleAdminComponent },
    { path: 'bookingVerification', component: BookingVerficationComponent },
    { path: 'passengerList', component: PassengerComponent },
    { path: 'train', component: TrainComponent },
    { path: 'addTrain', component: TrainScheduleComponent },
    { path: 'notifications', component: AdminNotificationComponent },
  ]},
  

  { path: 'user', component: UserComponent,  children: [
    { path: '', component: HomeViewComponent },
    { path:'pnrStatus', component:PnrStatusComponent },
    { path: 'profile', component: ProfileViewComponent },
    { path: 'booking', component: ReservationComponent, children: [
      { path: '', component: Part1Component },
      { path: 'seating/details', component: TicketBookingComponent },
    ] },
 ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
