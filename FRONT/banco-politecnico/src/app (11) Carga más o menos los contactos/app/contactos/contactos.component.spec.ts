import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactosComponent } from './contactos.component';

describe('ContactosComponent', () => {
  let component: ContactosComponent;
  let fixture: ComponentFixture<ContactosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactosComponent]
    });
    fixture = TestBed.createComponent(ContactosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
