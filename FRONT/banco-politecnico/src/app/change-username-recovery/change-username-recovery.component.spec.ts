import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUsernameRecoveryComponent } from './change-username-recovery.component';

describe('ChangeUsernameRecoveryComponent', () => {
  let component: ChangeUsernameRecoveryComponent;
  let fixture: ComponentFixture<ChangeUsernameRecoveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeUsernameRecoveryComponent]
    });
    fixture = TestBed.createComponent(ChangeUsernameRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
