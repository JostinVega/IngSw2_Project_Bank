import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePersonalComponent } from './update-personal.component';

describe('UpdatePersonalComponent', () => {
  let component: UpdatePersonalComponent;
  let fixture: ComponentFixture<UpdatePersonalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePersonalComponent]
    });
    fixture = TestBed.createComponent(UpdatePersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
