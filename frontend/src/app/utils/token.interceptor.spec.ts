import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { ConsumeService } from '../services/consume.service';
import { throwError, TimeoutError } from 'rxjs';
import { AppConfig } from '../constants/app-config';
import { APP_PROVIDERS } from '../app.providers';

describe('TokenInterceptor', () => {
  let interceptor: TokenInterceptor;
  let service: ConsumeService;
  let httpMock: HttpTestingController;
  let dataServiceSpy;

  beforeEach(() => {
    dataServiceSpy = jasmine.createSpyObj('DataService', ['getToken', 'setIsLoading']);
    dataServiceSpy.getToken.and.callFake(() => {
      return 'xyz';
    });

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        TokenInterceptor,
        APP_PROVIDERS,
        { provide: DataService, useValue: dataServiceSpy }
      ]
    });
    interceptor = TestBed.inject(TokenInterceptor);
    service = TestBed.inject(ConsumeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add authorization header', () => {
    service.httpGet('http://localhost').subscribe();
    const httpRequest = httpMock.expectOne('http://localhost');
    expect(httpRequest.request.headers.has('token')).toEqual(true);
  });

  it('should not add authorization header', () => {
    service.httpGet('http://localhost/login').subscribe();
    const httpRequest = httpMock.expectOne('http://localhost/login');
    expect(httpRequest.request.headers.has('token')).toEqual(false);
  });

  it('should throw timeout error', () => {
    const httpRequest = new HttpRequest('GET', 'http://localhost');
    const httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    const timeoutErr = new TimeoutError();
    httpHandlerSpy.handle.and.returnValue(
      throwError(timeoutErr)
    );
    interceptor.intercept(httpRequest, httpHandlerSpy).subscribe(() => {
    }, err => {
      expect(err).toBeDefined();
    });
  });

  it('should throw timeout default error', () => {
    const httpRequest = new HttpRequest('GET', 'http://localhost');
    const httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    const timeoutErr = new TimeoutError();

    AppConfig.httpTimeout = undefined;

    httpHandlerSpy.handle.and.returnValue(
      throwError(timeoutErr)
    );
    interceptor.intercept(httpRequest, httpHandlerSpy).subscribe(() => {
    }, err => {
      expect(err).toBeDefined();
    });
  });

  it('should throw http error', () => {
    const httpRequest = new HttpRequest('GET', 'http://localhost');
    const httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    const httpErr = new HttpErrorResponse({
      error: {
        message: 'HTTP 500'
      }
    });
    httpHandlerSpy.handle.and.returnValue(
      throwError(httpErr)
    );
    interceptor.intercept(httpRequest, httpHandlerSpy).subscribe(() => {
    }, err => {
      expect(err).toBeDefined();
    });
  });

  it('should throw http error no message', () => {
    const httpRequest = new HttpRequest('GET', 'http://localhost');
    const httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    const httpErr = new HttpErrorResponse({
      error: {
      }
    });
    httpHandlerSpy.handle.and.returnValue(
      throwError(httpErr)
    );
    interceptor.intercept(httpRequest, httpHandlerSpy).subscribe(() => {
    }, err => {
      expect(err).toBeDefined();
    });
  });

  it('should throw generic error', () => {
    const httpRequest = new HttpRequest('GET', 'http://localhost');
    const httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    httpHandlerSpy.handle.and.returnValue(
      throwError(new Error())
    );
    interceptor.intercept(httpRequest, httpHandlerSpy).subscribe(() => {
    }, err => {
      expect(err).toBeDefined();
    });
  });
});
