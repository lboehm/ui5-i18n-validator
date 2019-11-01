# Checking i18n files in UI5

i18n files are used in [SAPUI5](https://sapui5.hana.ondemand.com) for translating applications. Per language one file is created, containing key-value-pairs ([see documentation](https://sapui5.hana.ondemand.com/#/topic/df86bfbeab0645e5b764ffa488ed57dc)). 

This tool helps to validate those files.

```
showHelloButtonText=Say Hello
helloMsg=Hello {0}
```

# CLI Usage

To check the i18n files of an application, just call the validator in your applications directory:

```
Usage: ui5-i18n-validator
```

As best practice is, that the i18n-files are located in a dedicated i18n directory, the directories must be organized like this:

```
App directory
 └─ webapp
   ├─ controller
   ├─ i18n
   │   ├─ i18n_de.properties
   │   ├─ i18n_en.properties
   ├─ view
```

Maybe in further versions, and if requested, the path to i18n directory can be configured.

# Validation rules

Currently following rules are supported for validating the i18n-files:

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

This rule will check if there are any texts, which do not refer to a model. For example:

```xml
<Page title="View 1" id="page">
```

If there are hardcoded texts, the output will look like this:

```
Checking hardcoded texts:
‼ Following propably hardcoeded texts were found in View1.xml
   ×  attribute: title           value: View 1
   ×  attribute: text            value: Call mock service
```

In case there are no hardcoded texts found, the output will look like this:

```
Checking hardcoded texts:
√ No hardcoded texts found.
```

### Limitations

To ensure that there is definitely no hardcoded texts, can be very complex. So there are some limitations

- Only `xml` files are checked. So hardcoded texts from JavaScript files won't be found
- Only some xml attributes are currently checked. As of now, the following attributes are checked:
   - `title`
   - `text`

# Contribute

Would be great if you contribute. There's lots of room for improvement. See [CONTRIBUTING.md](CONTRIBUTING.md).

# License

MIT © [Lukas Böhm](https://github.com/lboehm)