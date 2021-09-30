import { TestBed, inject } from '@angular/core/testing';

import { SecurityService } from './security.service';
import { ILoginReq } from '../model/http/security.model';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Endpoints } from 'src/environments/endpoints';

declare var require: any;

describe('SecurityService', () => {
  let service: SecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(SecurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login',
    inject([HttpTestingController], (httpMock: HttpTestingController) => {
      const data = {
        email: 'admin@example.com',
        password: '12345'
      } as ILoginReq;
      service.login(data).subscribe(response => {
        expect(response).toBeDefined();
        expect(response.token).toBe('QpwL5tke4Pnpja7X4');
      });

      const req = httpMock.expectOne(Endpoints.security.login);
      expect(req.request.method).toEqual('POST');

      const res: any = require('../../mocks/login.json');
      req.flush(res);
    })
  );

  it('should login with error',
    inject([HttpTestingController], (httpMock: HttpTestingController) => {
      const data = {
        email: 'admin@example.com',
        password: '12345'
      } as ILoginReq;
      service.login(data).subscribe(() => {
      }, err => {
        expect(err).toBeDefined();
      });

      const req = httpMock.expectOne(Endpoints.security.login);
      expect(req.request.method).toEqual('POST');
      req.error(new ErrorEvent('err'));
    })
  );
});
