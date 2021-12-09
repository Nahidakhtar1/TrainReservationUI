import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PnrStatusComponent } from './pnr-status.component';

describe('PnrStatusComponent', () => {
  let component: PnrStatusComponent;
  let fixture: ComponentFixture<PnrStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PnrStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PnrStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
