/* eslint-disable */
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const log = console.log;


function analyzeEmptyKeys(filesContent) {
  let emptyKeysByLanguage = [];

  for (let file of filesContent) {
    var emptyKeys = file.values.filter((f) => !f.value);

    if (emptyKeys.length > 0) {
      emptyKeysByLanguage.push({
        language: file.language,
        emptyKeys: emptyKeys
      });
    }
  }

  return emptyKeysByLanguage;
}

function printEmptyKeys(emptyKeysByLanguage) {
  log(chalk.underline.white('Checking empty keys:'));

  if (emptyKeysByLanguage.length === 0) {
    log(logSymbols.success, 'No empty keys found.');
    log();
    return;
  }

  for (let e of emptyKeysByLanguage) {
    log(logSymbols.warning, `Following keys are empty in ${chalk.red(e.language)}`);
    e.emptyKeys.forEach((key) => {
      log(`   ` + logSymbols.error, `${key.key}`);
    });
  }

  log();
}

module.exports = {
  analyzeEmptyKeys,
  printEmptyKeys
};
