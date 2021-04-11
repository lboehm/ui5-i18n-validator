const rawData = [
  {
    fileName: 'i18n.properties',
    language: 'default',
    values: [
      {
        key: 'helloBtn',
        value: 'Hello',
      },
      {
        key: 'worldLabel',
        value: '',
      },
    ],
  },
  {
    fileName: 'i18n_de.properties',
    language: 'de',
    values: [
      {
        key: 'helloBtn',
        value: 'Hallo',
      },
      {
        key: 'worldLabel',
        value: 'Welt',
      },
      {
        key: 'testBtn',
        value: 'Test',
      },
    ],
  },
  {
    fileName: 'i18n_en.properties',
    language: 'en',
    values: [
      {
        key: 'helloBtn',
        value: 'Hello',
      },
      {
        key: 'worldLabel',
        value: '',
      },
    ],
  },
];

const missingKeysData = [
  {
    language: 'de',
    otherLanguage: 'default',
    missingKeys: [
      {
        key: 'testBtn',
        value: 'Test',
      },
    ],
  },
  {
    language: 'de',
    otherLanguage: 'en',
    missingKeys: [
      {
        key: 'testBtn',
        value: 'Test',
      },
    ],
  },
];

const emptyKeysData = [
  {
    language: 'default',
    emptyKeys: [
      {
        key: 'worldLabel',
        value: '',
      },
    ],
  },
  {
    language: 'en',
    emptyKeys: [
      {
        key: 'worldLabel',
        value: '',
      },
    ],
  },
];

module.exports = {
  rawData,
  emptyKeysData,
  missingKeysData,
};
