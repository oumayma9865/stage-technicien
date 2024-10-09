import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestdetailsComponent } from './test-details.component';

describe('TestdetailsComponent', () => {
  let component: TestdetailsComponent;
  let fixture: ComponentFixture<TestdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
