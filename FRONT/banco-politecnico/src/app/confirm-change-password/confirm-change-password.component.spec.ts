import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmChangePasswordComponent } from './confirm-change-password.component';

describe('ConfirmChangePasswordComponent', () => {
  let component: ConfirmChangePasswordComponent;
  let fixture: ComponentFixture<ConfirmChangePasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmChangePasswordComponent]
    });
    fixture = TestBed.createComponent(ConfirmChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
