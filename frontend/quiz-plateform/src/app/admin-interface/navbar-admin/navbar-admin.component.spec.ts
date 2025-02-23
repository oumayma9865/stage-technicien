import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbaradminComponent } from './navbar-admin.component';

describe('NavbaradminComponent', () => {
  let component: NavbaradminComponent;
  let fixture: ComponentFixture<NavbaradminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbaradminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbaradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
