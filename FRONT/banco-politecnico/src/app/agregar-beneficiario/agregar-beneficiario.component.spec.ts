import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarBeneficiarioComponent } from './agregar-beneficiario.component';

describe('AgregarBeneficiarioComponent', () => {
  let component: AgregarBeneficiarioComponent;
  let fixture: ComponentFixture<AgregarBeneficiarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarBeneficiarioComponent]
    });
    fixture = TestBed.createComponent(AgregarBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

