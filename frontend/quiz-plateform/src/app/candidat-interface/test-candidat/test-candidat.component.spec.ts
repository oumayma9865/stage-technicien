import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCandidatComponent } from './test-candidat.component';

describe('TestCandidatComponent', () => {
  let component: TestCandidatComponent;
  let fixture: ComponentFixture<TestCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCandidatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
