import { TestBed } from '@angular/core/testing';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { environment } from '@env/environment';
import { extract, I18nService } from './i18n.service';

const defaultLanguage = 'pt-BR';
const supportedLanguages = ['pt-BR', 'en-US'];

class MockTranslateService {
  currentLang = '';
  onLangChange = new Subject();

  use(language: string) {
    this.currentLang = language;
    this.onLangChange.next({
      lang: this.currentLang,
      translations: {}
    });
  }

  getBrowserCultureLang() {
    return 'pt-BR';
  }

  setTranslation(lang: string, translations: Object, shouldMerge?: boolean) {}
}

describe('I18nService', () => {
  let i18nService: I18nService;
  let translateService: TranslateService;
  let onLangChangeSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [I18nService, { provide: TranslateService, useClass: MockTranslateService }]
    });

    i18nService = TestBed.get(I18nService);
    translateService = TestBed.get(TranslateService);

    // Create spies
    onLangChangeSpy = jasmine.createSpy('onLangChangeSpy');
    translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      onLangChangeSpy(event.lang);
    });
    spyOn(translateService, 'use').and.callThrough();
  });

  afterEach(() => {
    // Cleanup
    localStorage.removeItem('language');
  });

  describe('init', () => {
    it('should init with default language', () => {
      // Act
      i18nService.init(defaultLanguage, supportedLanguages);

      // Assert
      expect(translateService.use).toHaveBeenCalledWith(defaultLanguage);
      expect(onLangChangeSpy).toHaveBeenCalledWith(defaultLanguage);
    });

    it('should init with save language', () => {
      // Arrange
      const savedLanguage = 'pt-BR';
      localStorage.setItem('language', savedLanguage);

      // Act
      i18nService.init(defaultLanguage, supportedLanguages);

      // Assert
      expect(translateService.use).toHaveBeenCalledWith(savedLanguage);
      expect(onLangChangeSpy).toHaveBeenCalledWith(savedLanguage);
    });
  });

  describe('set language', () => {
    it('should change current language', () => {
      // Arrange
      const newLanguage = 'en-US';
      i18nService.init(defaultLanguage, supportedLanguages);

      // Act
      i18nService.language = newLanguage;

      // Assert
      expect(translateService.use).toHaveBeenCalledWith(newLanguage);
      expect(onLangChangeSpy).toHaveBeenCalledWith(newLanguage);
    });

    it('should change current language without a region match', () => {
      // Arrange
      const newLanguage = 'pt-PT';
      i18nService.init(defaultLanguage, supportedLanguages);

      // Act
      i18nService.language = newLanguage;

      // Assert
      expect(translateService.use).toHaveBeenCalledWith('pt-BR');
      expect(onLangChangeSpy).toHaveBeenCalledWith('pt-BR');
    });

    it('should change current language to default if unsupported', () => {
      // Arrange
      const newLanguage = 'es';
      i18nService.init(defaultLanguage, supportedLanguages);

      // Act
      i18nService.language = newLanguage;

      // Assert
      expect(translateService.use).toHaveBeenCalledWith(defaultLanguage);
      expect(onLangChangeSpy).toHaveBeenCalledWith(defaultLanguage);
    });
  });

  describe('get language', () => {
    it('should return current language', () => {
      // Arrange
      // Assert
      expect(i18nService.language).toBeDefined();
    });
  });
});
