const chalk = require('chalk');
const logSymbols = require('log-symbols');

const { log } = console;

const attributes = ['title', 'subtitle', 'text', 'placeholder', 'headerText', 'objectTitle', 'objectSubtitle', 'secondTitle', 'label'];

function textIsBoundToModel(attrValue) {
  return attrValue.trim().startsWith('{');
}

function analyzeHardcodedTexts(xmlFiles) {
  const allFindings = [];

  xmlFiles.forEach((file) => {
    // https://stackoverflow.com/questions/317053/regular-expression-for-extracting-tag-attributes
    const attrRegex = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g;

    const fileFindings = [];
    let lineCounter = 0;

    file.content.forEach((line) => {
      lineCounter += 1;

      let match;
      // eslint-disable-next-line no-cond-assign
      while ((match = attrRegex.exec(line)) !== null) {
        const attr = match[1];
        const value = match[2];

        if (attributes.includes(attr) && !textIsBoundToModel(value)) {
          fileFindings.push({
            line: lineCounter,
            attr,
            value,
          });
        }
      }
    });

    if (fileFindings.length > 0) {
      allFindings.push({
        fileName: file.fileName,
        findings: fileFindings,
      });
    }
  });

  return allFindings;
}

function printHardCodedTexts(hardcodedTexts) {
  log(chalk.underline.white('Checking hardcoded texts:'));

  if (hardcodedTexts.length === 0) {
    log(logSymbols.success, 'No hardcoded texts found.');
    log();
    return;
  }

  for (const h of hardcodedTexts) {
    log(logSymbols.warning, `Following propably hardcoeded texts were found in ${chalk.red(h.fileName)}`);

    h.findings.forEach((f) => {
      log(`   ${logSymbols.error}`, ` line: ${f.line} \t attribute: ${f.attr} \t value: ${f.value}`);
    });
  }

  log();
}

module.exports = {
  analyzeHardcodedTexts,
  printHardCodedTexts,
};
