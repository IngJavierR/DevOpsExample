import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { SecurityService } from 'src/app/services/security.service';
import { DataService } from 'src/app/services/data.service';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let dataServiceSpy: any;
  let securityServiceSpy: any;

  const login = require('../../../mocks/login.json');

  beforeEach(waitForAsync(() => {
    dataServiceSpy = jasmine.createSpyObj('DataService', ['setGeneralNotificationMessage', 'setToken']);
    securityServiceSpy = jasmine.createSpyObj('SecurityService', ['login']);
    securityServiceSpy.login.and.callFake(() => {
      return of(login);
    });

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'home', redirectTo: '' }
        ]),
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
        MatInputModule,
        MatCardModule,
        MatButtonModule
      ],
      providers: [
        { provide: SecurityService, useValue: securityServiceSpy },
        { provide: DataService, useValue: dataServiceSpy }
      ]
    })
      .compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should login', () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    component.login();
    expect(securityServiceSpy.login).toHaveBeenCalled();
    expect(dataServiceSpy.setToken).toHaveBeenCalled();
  });

  it('should login with error', () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    securityServiceSpy.login.and.callFake(() => {
      return throwError('error!');
    });
    expect(component).toBeTruthy();
    component.login();
    expect(securityServiceSpy.login).toHaveBeenCalled();
    expect(dataServiceSpy.setGeneralNotificationMessage).toHaveBeenCalled();
  });
});
