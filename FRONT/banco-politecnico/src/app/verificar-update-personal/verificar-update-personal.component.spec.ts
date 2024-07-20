import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarUpdatePersonalComponent } from './verificar-update-personal.component';

describe('VerificarUpdatePersonalComponent', () => {
  let component: VerificarUpdatePersonalComponent;
  let fixture: ComponentFixture<VerificarUpdatePersonalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificarUpdatePersonalComponent]
    });
    fixture = TestBed.createComponent(VerificarUpdatePersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
