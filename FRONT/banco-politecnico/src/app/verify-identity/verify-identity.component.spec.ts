import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyIdentityComponent } from './verify-identity.component';

describe('VerifyIdentityComponent', () => {
  let component: VerifyIdentityComponent;
  let fixture: ComponentFixture<VerifyIdentityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyIdentityComponent]
    });
    fixture = TestBed.createComponent(VerifyIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
