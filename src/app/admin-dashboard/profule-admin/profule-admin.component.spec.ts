import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfuleAdminComponent } from './profule-admin.component';

describe('ProfuleAdminComponent', () => {
  let component: ProfuleAdminComponent;
  let fixture: ComponentFixture<ProfuleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfuleAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfuleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
