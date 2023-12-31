import type { I18nTranslation } from 'nestjs-i18n';
import type { I18nAbstractLoaderOptions } from 'nestjs-i18n/dist/loaders/i18n.abstract.loader';
import { I18nAbstractLoader } from 'nestjs-i18n/dist/loaders/i18n.abstract.loader';
import type { Observable } from 'rxjs';

import { LanguageCodeEnum } from '../../../constants/language-code.enum';
import enTranslations from '../../../i18n/en';
import ruTranslations from '../../../i18n/ru';

export class I18nTypescriptLoader extends I18nAbstractLoader {
  getDefaultOptions(): Partial<I18nAbstractLoaderOptions> {
    return {
      filePattern: '*.ts',
      watch: false,
    };
  }

  async load(): Promise<I18nTranslation | Observable<I18nTranslation>> {
    return this.parseTranslations();
  }

  protected async parseTranslations(): Promise<I18nTranslation> {
    return Promise.resolve({
      [LanguageCodeEnum.EN]: enTranslations,
      [LanguageCodeEnum.RU]: ruTranslations,
    });
  }

  formatData(data: never) {
    try {
      return data;
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new TypeError('Invalid file. Please check your syntax.');
      }

      throw error;
    }
  }
}
