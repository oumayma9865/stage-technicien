import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsCandidatComponent } from './results-candidat.component';

describe('ResultsCandidatComponent', () => {
  let component: ResultsCandidatComponent;
  let fixture: ComponentFixture<ResultsCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsCandidatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultsCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
