import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarUserRecoveryComponent } from './verificar-user-recovery.component';

describe('VerificarUserRecoveryComponent', () => {
  let component: VerificarUserRecoveryComponent;
  let fixture: ComponentFixture<VerificarUserRecoveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificarUserRecoveryComponent]
    });
    fixture = TestBed.createComponent(VerificarUserRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
