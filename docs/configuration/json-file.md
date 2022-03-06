# Configuration. External JSON file

- [Back to Configuration](./index.md)

In configuration can be used external JSON files for build a connection string.  
Use the pattern `{<variable name>}`, where `<variable name>` it's name in the environment file.  
Nested objects are acceptable. Nested keys must be divided with `.`: `nestedObject.childProperty`. **Arrays not supported now.**  

If the specified variable name not found in environment file, configrator throws exception with name of variable, that can't be founded.  
⚠️ **This feature available only for `databases.jsonConfig.connection` key. Another config keys will be ignored.**  

## Example

There is two files: example.json and my.schema-docs.config.json
```js
{
    "database": {
        "host": "localhost",
        "password": "",
        "user": "username",
        "port": 3306,
        "name": "database"
    }
}
```

```js
{	
	"databases": [
		//build connection string from json config
        {
            "name": "JsonConnectionConfiguration",
            //json file path
			"jsonConfig": {
				//path to env file
                "path": "./example.json",
				//connection string template with vars from json config
                "connection": "mysql://{database.user}:{database.port}@{database.host}:{database.port}/{database.name}"
            }
        }
    ],
    "templaters": ["html"]
}
```

At configuration build stage `envConfig.connection` value will transform to `mysql://username:@locahost:3306/database`.  
Except environment files in additional you can also use [Environment file](./env-file.md) and [YAML](./yaml-file.md).