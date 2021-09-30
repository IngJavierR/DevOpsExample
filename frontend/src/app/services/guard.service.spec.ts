import { TestBed, inject } from '@angular/core/testing';

import { GuardService } from './guard.service';
import { DataService } from './data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('GuardService', () => {
  let service: GuardService;
  let dataServiceSpy: any;

  beforeEach(() => {
    dataServiceSpy = jasmine.createSpyObj('DataService', ['userIsAuthenticated']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', redirectTo: '' }
        ])
      ],
      providers: [
        { provide: DataService, useValue: dataServiceSpy }
      ]
    });
    service = TestBed.inject(GuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should can activate true', () => {
    dataServiceSpy.userIsAuthenticated.and.callFake(() => {
      return true;
    });
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    expect(service.canActivate(route, state)).toBeTruthy();
  });

  it('should can activate false', () => {
    dataServiceSpy.userIsAuthenticated.and.callFake(() => {
      return false;
    });
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    expect(service.canActivate(route, state)).toBeFalsy();
  });
});
