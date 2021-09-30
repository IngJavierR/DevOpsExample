import { TestBed, inject } from '@angular/core/testing';

import { ColorsService } from './colors.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Endpoints } from 'src/environments/endpoints';

declare var require: any;

describe('ColorsService', () => {
  let service: ColorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ColorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get colors',
    inject([HttpTestingController], (httpMock: HttpTestingController) => {
      service.getColors().subscribe(response => {
        expect(response).toBeDefined();
        expect(response.page).toBe(1);
        expect(response.per_page).toBe(6);
        expect(response.total).toBe(12);
        expect(response.total_pages).toBe(2);
        expect(response.data).toBeTruthy(typeof Array);
      });

      const req = httpMock.expectOne(Endpoints.demo.colors);
      expect(req.request.method).toEqual('GET');

      const res: any = require('../../mocks/colors.json');
      req.flush(res);
    })
  );

  it('should get colors with error',
    inject([HttpTestingController], (httpMock: HttpTestingController) => {
      service.getColors().subscribe(() => {
      }, err => {
        expect(err).toBeDefined();
      });

      const req = httpMock.expectOne(Endpoints.demo.colors);
      expect(req.request.method).toEqual('GET');

      req.error(new ErrorEvent('err'));
    })
  );

  it('should get single color',
    inject([HttpTestingController], (httpMock: HttpTestingController) => {
      service.getColor(1).subscribe(response => {
        expect(response).toBeDefined();
        expect(response.data).toBeTruthy(typeof Object);
        expect(response.data.id).toBe(1);
        expect(response.data.name).toBe('cerulean');
        expect(response.data.year).toBe(2000);
        expect(response.data.color).toBe('#98B2D1');
        expect(response.data.pantone_value).toBe('15-4020');
      });

      const req = httpMock.expectOne(`${Endpoints.demo.colors}/1`);
      expect(req.request.method).toEqual('GET');

      const res: any = require('../../mocks/color.json');
      req.flush(res);
    })
  );

  it('should get single color with error',
    inject([HttpTestingController], (httpMock: HttpTestingController) => {
      service.getColor(1).subscribe(() => {
      }, err => {
        expect(err).toBeDefined();
      });

      const req = httpMock.expectOne(`${Endpoints.demo.colors}/1`);
      expect(req.request.method).toEqual('GET');

      req.error(new ErrorEvent('err'));
    })
  );
});
