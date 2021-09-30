import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class LogService {

  constructor() { }

  public static log(data?: any) {
    if (!environment.production) {
      console.log(data);
    }
  }

  public static warning(data?: any) {
    if (!environment.production) {
      console.warn(data);
    }
  }

  public static error(data?: any) {
    if (!environment.production) {
      console.error(data);
    }
  }

  public static trace(data?: any) {
    if (!environment.production) {
      console.trace(data);
    }
  }
}
