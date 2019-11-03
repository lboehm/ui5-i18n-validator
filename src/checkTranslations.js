const path = require('path');
const { getTranslations, getViews } = require('./fileAccess');
const { analyzeMissingKeys, printMissingKeys } = require('./rules/missing-keys');
const { analyzeEmptyKeys, printEmptyKeys } = require('./rules/empty-keys');
const { analyzeHardcodedTexts, printHardCodedTexts } = require('./rules/hardcoded-texts');


function checkTranslations(bailOnError, rules) {
  const webappPath = path.join(process.cwd(), './webapp/');
  const i18nPath = path.join(webappPath, 'i18n');
  // const webappPath = './test/testdata/webapp/';
  // const i18nPath = './test/testdata/webapp/i18n';

  const filesContent = getTranslations(i18nPath);

  if (!filesContent || filesContent.length === 0) {
    return;
  }

  let missingKeysByLanguage = []; let emptyKeysByLanguage = []; let hardcodedTexts = [];

  // Check missing keys
  if (rules.length === 0
    || (rules.length > 0 && rules.includes('missing-keys'))) {
    missingKeysByLanguage = analyzeMissingKeys(filesContent);
    printMissingKeys(missingKeysByLanguage);
  }

  // Check empty keys
  if (rules.length === 0
    || (rules.length > 0 && rules.includes('empty-keys'))) {
    emptyKeysByLanguage = analyzeEmptyKeys(filesContent);
    printEmptyKeys(emptyKeysByLanguage);
  }

  // Check hardcoded texts
  if (rules.length === 0
    || (rules.length > 0 && rules.includes('hardcoded-texts'))) {
    const xmlViews = getViews(webappPath);
    hardcodedTexts = analyzeHardcodedTexts(xmlViews);
    printHardCodedTexts(hardcodedTexts);
  }


  const anyErrorPresent = missingKeysByLanguage.length === 0
    || emptyKeysByLanguage.length === 0
    || hardcodedTexts.length === 0;
  if (anyErrorPresent && bailOnError) {
    process.exit(1);
  }
}

module.exports = checkTranslations;
