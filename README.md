# SchemaDocs - database documentation generator

## Features

- Generates docs from many databases at once
- Configuration
    - [+] Connection string
    - [+] Connection string builded with external JSON config (external variables)
    - [+] Connection string builded with external Environment file (external variables)
    - [+] Connection string over SSH (SSH tunnel)
    - [+] Connection string builded with [environment vatiables](https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_process_env)
- Supported adapters and specified things
    - [+] MySQL (using [mysql2](https://www.npmjs.com/package/mysql2))
        - [+] Tables
        - [+] Columns
        - [+] Triggers
        - [+] Events
        - [+] Foreign keys
        - [+] Indexes
        - [+] Stored functions and stored procedures
    - [+] SQLite (using `sqlite3`)
        - [+] Tables
- Templaters (using [mustache](https://github.com/janl/mustache.js)) - full schema objects info allowed at any template
    - [+] DDL display
    - [+] HTML
        - Table of contents in sidebar with anchor links
        - Anchor links from foreign keys info 
    - [+] Markdown
        - Simple full-featured table style
    - [+] Confluence Wiki Format 
        - Simple full-featured table style
    - [+] JSON
        - Include full Schema object structure
    - [+] YAML
- ERD (Entity relationships diagram)
    - [+] Formats
        - [+] Native SVG
        - [+] Canvas to PNG
    - [+] ERD raw data export in JSON (nodes, edges and contents)

## Guide

Install:  
```schell
npm -g install schema-docs

yarn add global schema-docs
```

MySQL
```schell
npm install mysql2

yarn add -E mysql2
```

SQLite
```schell
npm install sqlite3

yarn add -E sqlite3
```

SQL DDL (parsing sql-file)
```schell
npm install node-sql-parser

yarn add -E node-sql-parser
```

Usage:

```schell
schema-docs \ 
    --database mysql://user:password/localhost:3306/database \ 
    --templaters json,md,html \
    --ignore-tables _migrations,_hashes
    --output ./docs/db
    --erd  

schema-docs -c ./configs/schema-docs.json
```

⚠️ If you are not Node.js user, then install first Node.js and npm. [Link to Node.js site with guide](https://nodejs.org/ru/download/package-manager/#windows).

## Configuration

You can pass configuration by two ways:
1. As CLI arguments (only one database at once)
2. As json file (any much databases at once)

### CLI arguments

| Option                | Description                                   | Default           | Example                           |
| --------------------- | --------------------------------------------- | ----------------- | --------------------------------- |
| --database, -d        | database connection string                    | -                 | `mysql://user@localhost/database` |
| --config, -c          | jSON-configuration file path                  | -                 | `./config/schema-docs.json`       |
| --templaters, -t      | comma-separated list of names used templaters | `json,html`       | `html,md`                         |
| --output, -o          | output documentation root directory           | `./schema-docs`   | `./documentation/db`              |
| --ignore-tables, -i   | comma-separated list with names to be ignored | ""                | `users_creditnals,admin_users`    |
| --erd, -e             | generate ER-diagram flag                      | `none`            | -                                 |

⚠️ **Required one of --database or --config option.**  

### JSON configuration file

Sample configuration file you can find at [config.example.json](./config.example.json)

Structure:

```js
{	
	//databases configuration
	"databases": [
        //simple connection with connection string
		{
			//connection name
            "name": "databaseOne",
			//connection string
            "connection": "mysql://connection",
			//generate ER-diagram
            "erd": true,
			//ignored tables list
            "ignoreTables": [
                "_migrations"
            ]
        },
		//build connection string from env-configuration
        {
            "name": "databaseTwo",
            //env file info
			"envConfig": {
				//path to env file
                "path": "/path/to/.env",
				//connection string template with vars from env config
                "connection": "mysq://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
            },
        }, 
		//build connection string from json-configuration
        {
            "name": "databaseThree",
			//json file info
            "jsonConfig": {
				//path to json config
                "path": "path/to/config.json",
				//connection string template with vars from json (allowed nesting)
                "connection": "mysql://{database.user}:{database.password}"
            },
        },
        // use tunnel over ssh
        {
            "name": "databaseFour",
            // may be combined with connection builders above
            "connection": "mysql://user:password@host:port/database",
            "ssh": {
                "host": "127.0.0.1",
                "port": 22,
                "username": "root",
                "password": "toor",
                "privateKeyPath": "path/to/privateKey",
                "privateKeyContent": "RSA BEGIN...",

                "sourceHost": "localhost",
                "sourcePort": 3306,
                "destinationHost": "",
                "destinationPort": ""
            }
        },
        // build connection string from yaml configuration
        {
            "name": "databaseFive",
            "yamlConfig": {
                "path": "path/to/config.yml",
                // connection string template (allowed nesting)
                "connection": "mysql://{database.user}:{database.password}"
            }
        },
        {
            "name": "DatabaseConfigFromProcessEnv",
            // set environment variables (process.env)
            "connection": "mysql://[[DB_USER]]:[[DB_PASSWORD]]@[[DB_HOST]]:[[DB_PORT]]/[[DB_NAME]]"
        },
    ],
	//templaters configuration
	"templaters": [
		//simple templater name
		"json",
		//with overrided template
        {
            "html": {
                "template": "path/to/template",
                "name": "index",
            }
        },
        "yaml",
        // raw .sql file with schema ddl
        "ddl",
		"md",
		"confluence-wiki",
		"confluence-store"
    ],
    // enabled plugins and features
    "plugins": [],
	//output documentation directory 
    "output": "/path/to/save"
}
```

## Roadmap

- Configuration
    - [-] Connection string builded with external YAML file (external variables)
- API
    - [-] Using adapters and structure as third-party package
    - [-] Adapters guide and adapters extending
    - [-] Plugins
- Supported adapters and specified things
    - [-] MySQL (using `mysql2`)
        - [-] Partitions
        - [-] Checks (MySQL >=8.0.16)
        - [-] Additional schema and tables info  
    - [-] PostgreSQL
    - [-] Microsoft SQL Server
    - [-] SQLite (using `sqlite3`)
        - [-] Indexes
        - [-] Foreign keys
        - [-] Additional schema and tables info
    - [-] MongoDB
    - [-] SQL DDL file (using `node-sql-parser`)
- Templaters (using `mustache`) - full schema objects info allowed at any template
    - [-] ERD display
    - [-] Confluence Storage Format
        - Rich macros using: code-blocks and spoilers for DDL
        - Table of contents with anchor links
    - [-] Helper with useful things to build own template
    - [-] JSON schema for schema-docs format
- ERD (Entity relationships diagram)
    - [-] Formats
        - [-] DrawIO
    - [-] ERD Styling
    - [-] Extending relationships API 
## Related projects

- [MySQL Workbench Model Document Generation](https://github.com/letrunghieu/mysql-workbench-plugin-doc-generating)
    - Plugin for MySQL Workbench
    - Single output format (md)

- [MySQL Workbench HTML Document Generation](https://github.com/d1soft/mysql-workbench-html-doc-generator)
    - Plugin for MySQL Workbench
    - Single output format (html)
