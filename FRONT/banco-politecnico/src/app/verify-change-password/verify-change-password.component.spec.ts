import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyChangePasswordComponent } from './verify-change-password.component';

describe('VerifyChangePasswordComponent', () => {
  let component: VerifyChangePasswordComponent;
  let fixture: ComponentFixture<VerifyChangePasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyChangePasswordComponent]
    });
    fixture = TestBed.createComponent(VerifyChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
