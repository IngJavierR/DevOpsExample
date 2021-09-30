import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export const CHILD_IMPORTS = [
  TranslateModule.forChild({
    loader: {
      provide: TranslateLoader,
      useFactory: (http: HttpClient) => {
        return new TranslateHttpLoader(http);
      },
      deps: [ HttpClient ]
    }
  })
];
