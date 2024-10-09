import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizdetailsComponent } from './quiz-details.component';

describe('QuizdetailsComponent', () => {
  let component: QuizdetailsComponent;
  let fixture: ComponentFixture<QuizdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
