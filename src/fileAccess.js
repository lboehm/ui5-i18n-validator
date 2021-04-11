/* eslint-disable no-param-reassign */

const { readdirSync, readFileSync, statSync } = require('fs');
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const path = require('path');

const { log } = console;

function getTranslationFiles(dirPath) {
  const getFiles = (source) =>
    readdirSync(source, { withFileTypes: true })
      .filter((dirent) => dirent.isFile() && (/i18n.properties/.test(dirent.name) || /i18n_(.*?)\.properties/.test(dirent.name)))
      .map((dirent) => {
        let language;
        if (/i18n.properties/.test(dirent.name)) {
          language = 'default';
        } else if (/i18n_(.*?)\.properties/.test(dirent.name)) {
          // eslint-disable-next-line prefer-destructuring
          language = /i18n_(.*?)\.properties/.exec(dirent.name)[1];
        }

        return {
          fileName: dirent.name,
          language,
        };
      });

  let files;
  try {
    files = getFiles(dirPath);
    // eslint-disable-next-line no-empty
  } finally {
    if (!files || files.length === 0) {
      log(logSymbols.error, chalk.red('No i18n files found. Cancelling...'));
      log();
    }
  }

  return files;
}

function getTranslations(dirPath) {
  const filesContent = [];

  const files = getTranslationFiles(dirPath);

  for (const file of files) {
    const f = readFileSync(`${dirPath}/${file.fileName}`).toString();
    const linesArray = f.split('\n');

    const values = linesArray
      .map((line) => {
        // remove linebreaks
        let cleansed = line.replace(/\r?\n|\r/, '');
        // trim
        cleansed = cleansed.trim();
        return cleansed;
      })
      .filter((line) => {
        const lineEmpty = !line;
        const lineIsComment = line.startsWith('#');

        return !(lineEmpty || lineIsComment);
      })
      .map((line) => ({
        key: /.+?(?==)/.exec(line)[0].trim(),
        value: /=(.*)/.exec(line)[1].trim(),
      }));

    filesContent.push({
      fileName: file.fileName,
      language: file.language,
      values,
    });
  }

  return filesContent;
}

function getXmlFilesRecursively(dir, filelist) {
  const files = readdirSync(dir);
  // eslint-disable-next-line no-param-reassign
  filelist = filelist || [];
  files.forEach((file) => {
    if (statSync(dir + file).isDirectory()) {
      filelist = getXmlFilesRecursively(`${dir + file}/`, filelist);
    } else if (path.extname(file) === '.xml') {
      filelist.push(`${dir + file}`);
    }
  });
  return filelist;
}

function getViews(dirPath) {
  const xmlFiles = getXmlFilesRecursively(dirPath);

  const xmlFilesWithContent = xmlFiles.map((filePath) => {
    const f = readFileSync(filePath).toString();
    const linesArray = f.split('\n');

    return {
      filePath,
      fileName: path.basename(filePath),
      content: linesArray,
    };
  });

  return xmlFilesWithContent;
}

module.exports = {
  getTranslations,
  getViews,
};
