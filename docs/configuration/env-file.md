# Configuration. External environment file

- [Back to Configuration](./index.md)

In configuration can be used external environment files (ex. .env) for build a connection string.  
Use the pattern `{<variable name>}`, where `<variable name>` it's name in the environment file.  

If the specified variable name not found in environment file, configrator throws exception with name of variable, that can't be founded.  
⚠️ **This feature available only for `databases.envConfig.connection` key. Another config keys will be ignored.**  

## Example

There is two files: example.env and my.db-docs.config.json
```
DB_USER=username
DB_PASSWORD=
DB_HOST=locahost
DB_PORT=3306
DB_NAME=database
```

```js
{	
	//databases configuration
	"databases": [
		//build connection string from env-configuration
        {
            "name": "databaseTwo",
            //env file info
			"envConfig": {
				//path to env file
                "path": "./example.env",
				//connection string template with vars from env config
                "connection": "mysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
            }
        }
    ],
    "templaters": ["html"]
}
```

At configuration build stage `envConfig.connection` value will transform to `mysql://username:@locahost:3306/database`.  
Except environment files in additional you can also use [JSON](./json-file.md) and [YAML](./yaml-file.md).