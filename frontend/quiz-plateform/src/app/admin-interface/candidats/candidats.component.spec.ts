import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatsComponent } from './candidats.component';

describe('CandidathomeComponent', () => {
  let component: CandidatsComponent;
  let fixture: ComponentFixture<CandidatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandidatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
