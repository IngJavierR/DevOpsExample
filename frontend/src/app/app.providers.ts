import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './utils/token.interceptor';
import { LogService } from './services/log.service';

export const APP_PROVIDERS = [
  LogService,
  { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }
];
