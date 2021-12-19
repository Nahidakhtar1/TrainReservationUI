import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SxplMaharajaComponent } from './sxpl-maharaja.component';

describe('SxplMaharajaComponent', () => {
  let component: SxplMaharajaComponent;
  let fixture: ComponentFixture<SxplMaharajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SxplMaharajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SxplMaharajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
