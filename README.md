# Checking i18n files in UI5

i18n files are used in [SAPUI5](https://sapui5.hana.ondemand.com) for translating applications. Per language one file is created, containing key-value-pairs ([see documentation](https://sapui5.hana.ondemand.com/#/topic/df86bfbeab0645e5b764ffa488ed57dc)), see example:

```
showHelloButtonText=Say Hello
helloMsg=Hello {0}
```

**This tool helps to validate those files.**

# CLI Usage

To check the i18n files of an application, just call the validator in your applications directory:

```
Usage: ui5-i18n-validator [options]

Options:
   --bail-on-error, -b     Cancel npm task, if any errors were found [boolean]
   --rules, -r             List of rules, seperated by space [string]
```

As best practice is, that the i18n-files are located in a dedicated i18n directory, the directories must be organized like this:

```
App directory
 ├─ dist
 └─ webapp
   ├─ controller
   ├─ i18n
   │   ├─ i18n.properties
   │   ├─ i18n_de.properties
   │   ├─ i18n_en.properties
   │   ├─ ...
   ├─ view
```

Maybe in further versions, and if requested, the path to i18n directory can be configured.

## Options

### bail-on-error

`ui5-i18n-validator --bail-on-error` will exit the process with error code `1`. 

> *Hint:* This can be helpful, for example in CI/CD scenarios, when you want the build process to fail, if there are errors.

If the parameter is not provided, the process will end with no error code (`0`). 

### rules

`ui5-i18n-validator --rules missing-keys empty-keys` will only check the two rules, which are provided as parameter.

Following rules exist:

- `missing-keys`
- `empty-keys`
- `hardcoded-texts`

> For a detailed description of the rules see chapter [Validation rules](#validation-rules).

If the parameter is not provided, all rules will be used for validation.

# Validation rules

Currently following rules are supported for validating translations:

## Missing keys

This rule checks, if there are keys defined for one language, which are missing for another. For example:

`i18n_en.properties`:
```
formTitle = Form
sendBtn = Send
```

`i18n_de.properties`:
```
formTitle = Formular
```

In this case the validator will print the following content on CLI:

```
Checking missing keys:
‼ Following keys exist in *en* but are missing in *de*
   ×  sendBtn
```

If there's no key missing, the output will look like this:

```
Checking missing keys:
√ No missing keys found.
```

## Empty keys

This rule will check if there are keys defined, missing a value. For example:

`i18n_en.properties`:
```
formTitle = Form
sendBtn = 
```

In this case, the validator will print a message like this:

```
Checking empty keys:
‼ Following keys are empty in en
   × sendBtn
```

In case there's no value missing, the output will look like this:

```
Checking empty keys:
√ No empty keys found.
```

## Hardcoded texts

This rule will check if there are any texts, which do not refer to an i18n model. For example:

```xml
<Page title="View 1" id="page">
```

If there are hardcoded texts, the output will look like this:

```
Checking hardcoded texts:
‼ Following propably hardcoded texts were found in View1.xml
   ×  line: 9    attribute: title        value: View 1
```

In case there are no hardcoded texts found, the output will look like this:

```
Checking hardcoded texts:
√ No hardcoded texts found.
```

### Limitations

Ensuring that there are definitely no hardcoded texts, can be very complex. So there are some limitations:

- Only `xml` files are checked. So hardcoded texts from JavaScript files won't be found (e.g. `MessageBox.show("hello world")`)
- Only some xml attributes are currently checked, wheter they are hardcoded or not. As of now, the following attributes are checked:
  - `title`,
  - `subtitle`,
  - `text`,
  - `placeholder`,
  - `headerText`,
  - `objectTitle`,
  - `objectSubtitle`,
  - `secondTitle`,
  - `label`

# Contribute

Would be great if you contribute. There's lots of room for improvement. See [CONTRIBUTING.md](CONTRIBUTING.md).

# License

MIT © [Lukas Böhm](https://github.com/lboehm)