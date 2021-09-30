import { TestBed, ComponentFixture, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { APP_PROVIDERS } from './app.providers';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DataService } from './services/data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ThemeSwitcherService } from './services/theme-switcher.service';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let matIcon: MatIconRegistry;
  let translate: TranslateService;
  let dataServiceSpy: any;
  let matSnackbarSpy: any;
  let themeSwitcherSpy: any;

  const messageSubject = new Subject<string>();

  beforeEach(waitForAsync(() => {
    dataServiceSpy = jasmine.createSpyObj('DataService', ['getIsLoading', 'getToken', 'getGeneralNotificationMessage']);
    dataServiceSpy.getGeneralNotificationMessage.and.callFake(() => {
      return messageSubject;
    });
    matSnackbarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    themeSwitcherSpy = jasmine.createSpyObj('ThemeSwitcherService', ['loadTheme']);

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => {
              return new TranslateHttpLoader(http);
            },
            deps: [HttpClient]
          }
        }),
        MatToolbarModule,
        MatButtonModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatIconModule,
        MatMenuModule,
      ],
      providers: [
        APP_PROVIDERS,
        { provide: DataService, useValue: dataServiceSpy },
        { provide: MatSnackBar, useValue: matSnackbarSpy },
        { provide: ThemeSwitcherService, useValue: themeSwitcherSpy }
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    matIcon = TestBed.inject(MatIconRegistry);
    translate = TestBed.inject(TranslateService);
  }));

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'frontend'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('frontend');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('frontend');
  });

  it('should setup custom icons', (done) => {
    const app = fixture.debugElement.componentInstance;
    app.setupCustomIcons();
    fixture.whenStable().then(() => {
      matIcon.getNamedSvgIcon('mex').subscribe(res => {
        expect(res).toBeDefined();
        done();
      });
    });
  });

  it('should change language', (done) => {
    const app = fixture.debugElement.componentInstance;
    app.changeLanguage('en');
    translate.get('language.en').subscribe(res => {
      expect(res).toBe('English');
      done();
    });
  });

  it('should show general message', fakeAsync(() => {
    messageSubject.next('msg');
    tick(100);
    expect(matSnackbarSpy.open).toHaveBeenCalled();
  }));

  it('should change theme', () => {
    const app = fixture.debugElement.componentInstance;
    app.changeTheme('axity-theme');
    expect(themeSwitcherSpy.loadTheme).toHaveBeenCalled();
  });
});
