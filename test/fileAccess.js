import { assert } from 'chai';
import { getTranslations } from '../src/fileAccess';
import { rawData } from './testdata/mockData';

describe('File access', () => {
  it('should read translation files', () => {
    const translations = getTranslations('./test/testdata/webapp/i18n');

    assert.deepEqual(translations, rawData, 'Reading translations failed.');
  });
});
