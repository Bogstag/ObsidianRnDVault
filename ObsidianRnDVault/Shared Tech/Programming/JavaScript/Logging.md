---
date_created: 2023-11-01 21:55:21
date_modified: 2023-11-01 22:09:37
---
# Logging

## Simple Custom Logger

logger.js

```javascript
const logLevels = {
  NONE: 0,
  ERROR: 1,
  WARN: 2,
  INFO: 3,
  DEBUG: 4,
};

let currentLogLevel = logLevels.INFO;

const logger = {
  group: function (name) {
    console.group(name);
  },
  groupEnd: function () {
    console.groupEnd();
  },
  error: function (message) {
    if (currentLogLevel >= logLevels.ERROR) {
      console.error(`[ERROR]: ${message}`);
    }
  },
  warn: function (message) {
    if (currentLogLevel >= logLevels.WARN) {
      console.warn(`[WARN]: ${message}`);
    }
  },
  info: function (message) {
    if (currentLogLevel >= logLevels.INFO) {
      console.log(`[INFO]: ${message}`);
    }
  },
  debug: function (message) {
    if (currentLogLevel >= logLevels.DEBUG) {
      console.log(`[DEBUG]: ${message}`);
    }
  },
  setLogLevel: function (level) {
    currentLogLevel = level;
  },
};

module.exports = logger;

```

Usage of logger.js:

```js
const logger = require('./logger');

logger.group('Initialization');
logger.info('Starting the app...');
// some code
logger.info('Doing some setup...');
// more code
logger.groupEnd();

logger.group('Processing');
logger.info('Processing data...');
// some code
logger.warn('This is a warning');
// more code
logger.groupEnd();

```

Usage of logger.js in MyClass.js

```javascript
// Somehow get the logger into this scope
const logger = require('./logger'); 

class MyClass {
  constructor() {
    logger.info('MyClass instance created');
  }

  someMethod() {
    logger.debug('someMethod was called');
    // Do something
  }
}

module.exports = MyClass;
```

When you create an instance of `MyClass`, it will log "MyClass instance created" at the INFO level. When you call `someMethod`, it will log "someMethod was called" at the DEBUG level.

You can set the log level by calling `logger.setLogLevel(logLevels.WARN)` or whatever level you want. Then only logs of that level or higher will be outputted.
