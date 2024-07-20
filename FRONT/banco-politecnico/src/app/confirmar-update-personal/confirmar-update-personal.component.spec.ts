import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarUpdatePersonalComponent } from './confirmar-update-personal.component';

describe('ConfirmarUpdatePersonalComponent', () => {
  let component: ConfirmarUpdatePersonalComponent;
  let fixture: ComponentFixture<ConfirmarUpdatePersonalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmarUpdatePersonalComponent]
    });
    fixture = TestBed.createComponent(ConfirmarUpdatePersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
