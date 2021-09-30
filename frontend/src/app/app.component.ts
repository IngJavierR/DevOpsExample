import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfig } from './constants/app-config';
import { TranslateService } from '@ngx-translate/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemeSwitcherService } from './services/theme-switcher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  now = new Date();
  isLoading: Observable<boolean>;

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private matIcon: MatIconRegistry,
    private dom: DomSanitizer,
    private themeSwitcher: ThemeSwitcherService
  ) {
    this.isLoading = this.dataService.getIsLoading();

    this.setupCustomIcons();
    this.translate.setDefaultLang('es');

    this.dataService
      .getGeneralNotificationMessage()
      .subscribe(msg => {
        this.snackBar.open(msg, 'OK', {
          duration: AppConfig.generalMessageTimeout
        });
      });
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
  }

  changeTheme(theme: string): void {
    this.themeSwitcher.loadTheme(theme);
  }

  private setupCustomIcons(): void {
    this.matIcon.addSvgIcon('mex', this.dom.bypassSecurityTrustResourceUrl('./assets/img/lang/mex.svg'));
    this.matIcon.addSvgIcon('usa', this.dom.bypassSecurityTrustResourceUrl('./assets/img/lang/usa.svg'));
  }
}
