import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorCheatingComponent } from './error-cheating.component';

describe('ErrorCheatingComponent', () => {
  let component: ErrorCheatingComponent;
  let fixture: ComponentFixture<ErrorCheatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorCheatingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErrorCheatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
