import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarDepositoComponent } from './realizar-deposito.component';

describe('RealizarDepositoComponent', () => {
  let component: RealizarDepositoComponent;
  let fixture: ComponentFixture<RealizarDepositoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RealizarDepositoComponent]
    });
    fixture = TestBed.createComponent(RealizarDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
