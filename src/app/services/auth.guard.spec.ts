import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';

describe('authGuard', () => {
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, Router]
    });
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  const executeGuard: CanActivateFn = (...guardParameters) => 
    TestBed.runInInjectionContext(() => new AuthGuard(authService, router)).canActivate();

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});