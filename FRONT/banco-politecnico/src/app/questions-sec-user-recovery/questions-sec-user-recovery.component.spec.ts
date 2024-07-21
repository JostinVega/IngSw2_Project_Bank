import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsSecUserRecoveryComponent } from './questions-sec-user-recovery.component';

describe('QuestionsSecUserRecoveryComponent', () => {
  let component: QuestionsSecUserRecoveryComponent;
  let fixture: ComponentFixture<QuestionsSecUserRecoveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionsSecUserRecoveryComponent]
    });
    fixture = TestBed.createComponent(QuestionsSecUserRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
