# Configuration. JSON schema

- [Back to Configuration](./index.md)

```
JSON Schema is a vocabulary that allows you to annotate and validate JSON documents.
```

Schema docs provided with the latest JSON schema. You can use it to simplify edit configs.

## How to add JSON schema in VSCode

1. Open `settings.json`: `F1` -> `Preferences: Open Settings (JSON)`
2. Insert the `json.schemas` key or edit if exists
```js
    "json.schemas": [
        {
            "fileMatch": ["schema-docs.config.json"],
            "url": "https://raw.githubusercontent.com/schema-docs/master/src/schema-docs.config.json"
        }
    ],
```

`fileMatch` can be any string or glob values.

Locally file can be founded as `node_modules/schema-docs/schema-docs.config.json`

### Links

- [Schema Docs JSON schema](https://raw.githubusercontent.com/schema-docs/master/src/schema-docs.config.json)
- [JSON schema](https://json-schema.org/)