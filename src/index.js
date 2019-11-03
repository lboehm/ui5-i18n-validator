#!/usr/bin/env node

const chalk = require('chalk');
const { argv } = require('yargs')
  .alias('b', 'bail-on-error')
  .describe('b', 'if set, the task will cancel if any errors are present')
  .option('r', {
    alias: 'rules',
    demandOption: true,
    default: ['missing-keys empty-keys hardcoded-texts'],
    describe: 'defines which rules will be applied',
    type: 'string'
  })
  .help('help');

const checkTranslations = require('./checkTranslations');

const { log } = console;

function runValidations() {
  try {
    log(chalk.yellow('>>> validating i18n files >>>'));
    log();

    const { bailOnError } = argv;

    let rules = [];
    if (!argv.rules) {
      rules = argv.rules.trim().split(' ').filter(f => f.trim() !== '');
    }

    checkTranslations(bailOnError, rules);
    // eslint-disable-next-line no-empty
  } catch (e) {
    console.log(e);
  } finally {
    log(chalk.yellow('<<< validating i18n files <<<'));
  }
}


runValidations();
// module.exports = semVerManifest;
