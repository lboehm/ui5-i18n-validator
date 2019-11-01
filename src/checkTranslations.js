const path = require('path');
const { getTranslations, getViews } = require('./fileAccess');
const { analyzeMissingKeys, printMissingKeys } = require('./rules/missing-keys');
const { analyzeEmptyKeys, printEmptyKeys } = require('./rules/empty-keys');
const { analyzeHardcodedTexts, printHardCodedTexts } = require('./rules/hardcoded-texts');


function checkTranslations() {
  const webappPath = path.join(process.cwd(), './webapp/');
  const i18nPath = path.join(webappPath, 'i18n');
  // const fullPath = './test/testdata/webapp/i18n';

  const filesContent = getTranslations(i18nPath);

  if (!filesContent || filesContent.length === 0) {
    return;
  }

  // Check missing keys
  const missingKeysByLanguage = analyzeMissingKeys(filesContent);
  printMissingKeys(missingKeysByLanguage);

  // Check empty keys
  const emptyKeysByLanguage = analyzeEmptyKeys(filesContent);
  printEmptyKeys(emptyKeysByLanguage);


  const xmlViews = getViews(webappPath);
  const hardcodedTexts = analyzeHardcodedTexts(xmlViews);
  printHardCodedTexts(hardcodedTexts);
}

module.exports = checkTranslations;
