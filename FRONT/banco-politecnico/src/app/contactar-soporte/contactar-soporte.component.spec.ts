import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactarSoporteComponent } from './contactar-soporte.component';

describe('ContactarSoporteComponent', () => {
  let component: ContactarSoporteComponent;
  let fixture: ComponentFixture<ContactarSoporteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactarSoporteComponent]
    });
    fixture = TestBed.createComponent(ContactarSoporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
