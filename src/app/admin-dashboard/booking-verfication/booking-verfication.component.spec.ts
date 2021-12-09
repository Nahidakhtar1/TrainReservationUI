import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingVerficationComponent } from './booking-verfication.component';

describe('BookingVerficationComponent', () => {
  let component: BookingVerficationComponent;
  let fixture: ComponentFixture<BookingVerficationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingVerficationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingVerficationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
