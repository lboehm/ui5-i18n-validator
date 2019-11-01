import { assert } from 'chai';
import { analyzeEmptyKeys } from '../../src/rules/empty-keys';
import { rawData, emptyKeysData } from '../testdata/mockData';

describe('Empty keys rule', () => {
  it('should find empty keys', () => {
    const emptyKeys = analyzeEmptyKeys(rawData);

    assert.deepEqual(emptyKeys, emptyKeysData, 'Finding empty keys failed');
  });
});
