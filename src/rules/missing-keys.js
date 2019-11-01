const chalk = require('chalk');
const logSymbols = require('log-symbols');

const { log } = console;


function analyzeMissingKeys(filesContent) {
  const missingKeysByLanguage = [];

  for (const file of filesContent) {
    for (const f of filesContent) {
      // eslint-disable-next-line no-continue
      if (f.language === file.language) continue;

      const fileContent = filesContent.find(i => (i.language === file.language));
      const otherLanguageArray = filesContent.find(i => (i.language === f.language));

      const diff = fileContent.values.filter((i) => {
        const isPresent = otherLanguageArray.values.find(line => (line.key === i.key));

        return !isPresent;
      });

      if (diff.length > 0) {
        missingKeysByLanguage.push({
          language: file.language,
          otherLanguage: f.language,
          missingKeys: diff
        });
      }
    }
  }

  return missingKeysByLanguage;
}

function printMissingKeys(missingKeysByLanguage) {
  log(chalk.underline.white('Checking missing keys:'));

  if (missingKeysByLanguage.length === 0) {
    log(logSymbols.success, 'No missing keys found.');
    log();
    return;
  }

  for (const m of missingKeysByLanguage) {
    log(logSymbols.warning, `Following keys exist in ${chalk.green(`${m.language}`)} but are missing in ${chalk.red(m.otherLanguage)}`);

    m.missingKeys.forEach((key) => {
      log(`   ${logSymbols.error}`, ` ${key.key}`);
    });
  }

  log();
}

module.exports = {
  analyzeMissingKeys,
  printMissingKeys
};
