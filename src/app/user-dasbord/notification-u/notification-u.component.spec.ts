import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationUComponent } from './notification-u.component';

describe('NotificationUComponent', () => {
  let component: NotificationUComponent;
  let fixture: ComponentFixture<NotificationUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationUComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
