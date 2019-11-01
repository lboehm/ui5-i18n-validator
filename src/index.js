#!/usr/bin/env node

const chalk = require('chalk');
const checkTranslations = require('./checkTranslations');

const { log } = console;

function runValidations() {
  try {
    log(chalk.yellow('>>> validating i18n files >>>'));
    log();

    checkTranslations();
    // eslint-disable-next-line no-empty
  } catch (e) {
    console.log(e);
  } finally {
    log(chalk.yellow('<<< validating i18n files <<<'));
  }
}


runValidations();
// module.exports = semVerManifest;
