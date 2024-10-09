import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideTestComponent } from './guide-test.component';

describe('GuideTestComponent', () => {
  let component: GuideTestComponent;
  let fixture: ComponentFixture<GuideTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuideTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuideTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
