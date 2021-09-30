import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ColorsComponent } from './colors.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ColorsService } from 'src/app/services/colors.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

describe('ColorsComponent', () => {
  let component: ColorsComponent;
  let fixture: ComponentFixture<ColorsComponent>;
  let dataServiceSpy: any;
  let colorsServiceSpy: any;

  const colors = require('../../../mocks/colors.json');


  beforeEach(waitForAsync(() => {
    dataServiceSpy = jasmine.createSpyObj('DataService', ['setGeneralNotificationMessage', 'setIsLoading']);
    colorsServiceSpy = jasmine.createSpyObj('ColorsService', ['getColors']);
    colorsServiceSpy.getColors.and.callFake(() => {
      return of(colors);
    });

    TestBed.configureTestingModule({
      declarations: [ColorsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
        MatTableModule,
        MatIconModule,
        MatButtonModule
      ],
      providers: [
        { provide: DataService, useValue: dataServiceSpy },
        { provide: ColorsService, useValue: colorsServiceSpy }
      ]
    })
      .compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(ColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(colorsServiceSpy.getColors).toHaveBeenCalled();
    expect(component.data).toEqual(colors.data);
  });

  it('should create with error', () => {
    colorsServiceSpy.getColors.and.callFake(() => {
      return throwError('error!');
    });

    fixture = TestBed.createComponent(ColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(colorsServiceSpy.getColors).toHaveBeenCalled();
    expect(dataServiceSpy.setGeneralNotificationMessage).toHaveBeenCalled();
  });
});
