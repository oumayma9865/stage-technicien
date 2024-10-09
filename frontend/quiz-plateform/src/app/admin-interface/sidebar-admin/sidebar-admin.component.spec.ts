import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebaradminComponent } from './sidebar-admin.component';

describe('SidebaradminComponent', () => {
  let component: SidebaradminComponent;
  let fixture: ComponentFixture<SidebaradminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebaradminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebaradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
