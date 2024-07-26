import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarReseteoUsernameComponent } from './confirmar-reseteo-username.component';

describe('ConfirmarReseteoUsernameComponent', () => {
  let component: ConfirmarReseteoUsernameComponent;
  let fixture: ComponentFixture<ConfirmarReseteoUsernameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmarReseteoUsernameComponent]
    });
    fixture = TestBed.createComponent(ConfirmarReseteoUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
