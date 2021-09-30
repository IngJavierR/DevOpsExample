import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ColorDetailComponent } from './color-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ColorsService } from 'src/app/services/colors.service';
import { MatListModule } from '@angular/material/list';

describe('ColorDetailComponent', () => {
  let component: ColorDetailComponent;
  let fixture: ComponentFixture<ColorDetailComponent>;
  let dataServiceSpy: any;
  let colorsServiceSpy: any;

  const color = require('../../../../mocks/color.json');

  beforeEach(waitForAsync(() => {
    dataServiceSpy = jasmine.createSpyObj('DataService', ['setGeneralNotificationMessage', 'setIsLoading']);
    colorsServiceSpy = jasmine.createSpyObj('ColorsService', ['getColor']);
    colorsServiceSpy.getColor.and.callFake(() => {
      return of(color);
    });

    TestBed.configureTestingModule({
      declarations: [ColorDetailComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
        MatListModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: 1 }) } },
        { provide: DataService, useValue: dataServiceSpy },
        { provide: ColorsService, useValue: colorsServiceSpy }
      ],
    })
      .compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(ColorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(colorsServiceSpy.getColor).toHaveBeenCalled();
    expect(component.color).toEqual(color.data);
  });

  it('should create with no route', () => {
    TestBed.overrideProvider(ActivatedRoute, { useValue: { params: of({}) } });
    fixture = TestBed.createComponent(ColorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(colorsServiceSpy.getColor).not.toHaveBeenCalled();
  });

  it('should create with error', () => {
    colorsServiceSpy.getColor.and.callFake(() => {
      return throwError('error!');
    });

    fixture = TestBed.createComponent(ColorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(colorsServiceSpy.getColor).toHaveBeenCalled();
    expect(dataServiceSpy.setGeneralNotificationMessage).toHaveBeenCalled();
  });
});
