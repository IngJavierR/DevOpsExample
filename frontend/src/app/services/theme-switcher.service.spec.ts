import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ThemeSwitcherService } from './theme-switcher.service';

describe('ThemeSwitcherService', () => {
  let service: ThemeSwitcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeSwitcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load dark theme', (done) => {
    const spy = spyOn(service, 'insertToDom').and.callThrough();
    expect(service).toBeTruthy();
    service.loadTheme('dark-theme').then(() => {
      expect(spy).toHaveBeenCalled();
      expect(service.insertedElement).toBeDefined();
      expect(service.insertedElement).not.toBeNull();
      expect(document.querySelector('[theme="dark-theme"]')).toBeDefined();
      expect(document.querySelector('[theme="dark-theme"]')).not.toBeNull();
      expect(document.body.getAttribute('class')?.includes('dark-theme')).toBeTrue();
      done();
    });
  });

  it('should load axity theme', (done) => {
    const spy = spyOn(service, 'insertToDom').and.callThrough();
    expect(service).toBeTruthy();
    service.loadTheme('axity-theme').then(() => {
      expect(spy).toHaveBeenCalled();
      expect(service.insertedElement).toBeDefined();
      expect(service.insertedElement).not.toBeNull();
      expect(document.querySelector('[theme="axity-theme"]')).toBeDefined();
      expect(document.querySelector('[theme="axity-theme"]')).not.toBeNull();
      expect(document.body.getAttribute('class')?.includes('axity-theme')).toBeTrue();
      done();
    });
  });
});
