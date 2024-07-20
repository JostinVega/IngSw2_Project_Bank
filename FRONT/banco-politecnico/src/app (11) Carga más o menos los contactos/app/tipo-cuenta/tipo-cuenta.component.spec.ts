import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCuentaComponent } from './tipo-cuenta.component';

describe('TipoCuentaComponent', () => {
  let component: TipoCuentaComponent;
  let fixture: ComponentFixture<TipoCuentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoCuentaComponent]
    });
    fixture = TestBed.createComponent(TipoCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
