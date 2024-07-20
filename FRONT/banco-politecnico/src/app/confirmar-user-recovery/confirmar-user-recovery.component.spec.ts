import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarUserRecoveryComponent } from './confirmar-user-recovery.component';

describe('ConfirmarUserRecoveryComponent', () => {
  let component: ConfirmarUserRecoveryComponent;
  let fixture: ComponentFixture<ConfirmarUserRecoveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmarUserRecoveryComponent]
    });
    fixture = TestBed.createComponent(ConfirmarUserRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
