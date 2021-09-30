import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitcherService {
  insertedElement?: HTMLElement;

  constructor() {
    this.loadTheme();
  }

  loadTheme(theme: string = environment.theme): Promise<void> {
    return new Promise<void>((res) => {
      import(
        `../../assets/themes/${theme}.js`
      )
        .then((s) => s.default)
        .then((content) => {
          this.insertToDom(content, theme);
          res();
        });
    });
  }

  insertToDom = (content: string, theme: string) => {
    const element = document.createElement('style');
    element.setAttribute('theme', theme);
    element.textContent = content;
    document.head.appendChild(element);
    document.body.setAttribute('class', `mat-typography ${theme}`);

    if (this.insertedElement) {
      this.insertedElement.remove();
    }
    this.insertedElement = element;
  }
}
