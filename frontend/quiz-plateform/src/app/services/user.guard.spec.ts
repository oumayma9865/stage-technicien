import { TestBed } from '@angular/core/testing';

import { UserGuard } from './user.guard';

describe('UserGuardService', () => {
  let service: UserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
