import { assert } from 'chai';
import { analyzeMissingKeys } from '../../src/rules/missing-keys';
import { rawData, missingKeysData } from '../testdata/mockData';

describe('Missing keys rule', () => {
  it('should find missing keys', () => {
    const emptyKeys = analyzeMissingKeys(rawData);

    assert.deepEqual(emptyKeys, missingKeysData, 'Finding missing keys failed');
  });
});
