import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizhomeComponent } from './quiz-home.component';

describe('QuizhomeComponent', () => {
  let component: QuizhomeComponent;
  let fixture: ComponentFixture<QuizhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizhomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
