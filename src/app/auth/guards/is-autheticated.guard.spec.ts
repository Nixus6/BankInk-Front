import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isAutheticatedGuard } from './is-autheticated.guard';

describe('isAutheticatedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isAutheticatedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
