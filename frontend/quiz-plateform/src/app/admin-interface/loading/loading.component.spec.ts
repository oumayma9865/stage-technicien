import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingtestComponent } from './loading.component';

describe('LoadingtestComponent', () => {
  let component: LoadingtestComponent;
  let fixture: ComponentFixture<LoadingtestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingtestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
