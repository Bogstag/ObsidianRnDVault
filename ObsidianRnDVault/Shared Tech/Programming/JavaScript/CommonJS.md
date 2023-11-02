---
date_created: 2023-11-01 17:57:04
date_modified: 2023-11-01 18:10:11
---
# CommonJS

The decision to use Module or Class or the other often boils down to the design patterns you're employing and the specific needs of your project.

## When to Use Classes in CommonJS

1. Encapsulation
	 When you need to bundle both behavior (methods) and state (properties) together. This is the classic OOP use-case.
2. Inheritance
	 When you have a hierarchy of objects that share common behavior but also have specialized behavior.
3. Instance-specific State
	 When you need multiple instances of an object, each with its own state.
4. Polymorphism
	 When you want to make use of dynamic dispatch, allowing objects of different types to be treated as objects of a common super-type.

### Example with Constructor

```javascript
class Database {
  constructor(config) {
    this.config = config;
  }

  connect() {
    console.log(`Connected to ${this.config.database}`);
  }
}

module.exports = Database;
```

## When to Use Modules in CommonJS

1. Utility Functions: For methods that don't depend on any state and are universally applicable.
2. Singletons: When you have an object that doesn't need multiple instances.
3. Namespacing: To bundle a collection of functions under a single umbrella.
4. No Inheritance: When you have a set of functions that don't need to be subclassed.

### Example without Constructor

```javascript
exports.sum = (a, b) => a + b;
exports.multiply = (a, b) => a * b;
```

## Constructor or Not?

1. Use a constructor
	 When your class needs to manage some kind of state that varies between instances.
2. Skip the constructor
	 If your class/module doesn't need to manage state or if you are creating a utility module with static methods only.

## Mix of Class and Module

You can also have a module that exports both classes and utility functions, providing both instance-based and static functionality.

```javascript
class UtilityClass {
  constructor() {
    // constructor logic
  }

  instanceMethod() {
    return "Instance method";
  }

  static staticMethod() {
    return "Static method";
  }
}

const utilityFunction = () => {
  return "Utility Function";
};

module.exports = { UtilityClass, utilityFunction };
```

## Namespacing in CommonJS

Namespacing is often used to group a set of related functionalities under a single name so that they can be more easily organized and managed. This also helps to avoid naming conflicts.

In CommonJS, you can create a namespace by exporting an object containing multiple methods or properties. Here's how you can create a simple math utilities namespace.

```javascript
// mathUtils.js
const sum = (a, b) => a + b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const MathUtils = {
  sum,
  multiply,
  divide,
};

module.exports = MathUtils;
```

### Using the Namespace in Another File

To use this namespace in another file, you can require it and then call the methods like this:

```javascript
// app.js
const MathUtils = require('./mathUtils');

console.log(MathUtils.sum(1, 2));  // Output: 3
console.log(MathUtils.multiply(2, 3));  // Output: 6
console.log(MathUtils.divide(6, 2));  // Output: 3
```

### Advantages of Using Namespacing

1. Code Organization: It helps to keep your code organized by grouping related functionalities together.
2. Avoiding Global Scope: It avoids polluting the global scope by encapsulating related functionalities within a single object.
3. Easier to Maintain: A namespace makes the code easier to read and maintain because you know that all related functions are grouped together.

By using namespaces, you're essentially creating a single point of entry for a logically related group of functions or properties.

### Combining Two Different Files into One Namespace

You can combine multiple files into a single namespace by importing their exports into a new object, and then exporting that object as a single module.

#### File 1: `mathUtils.js`

```javascript
// mathUtils.js
const sum = (a, b) => a + b;
const multiply = (a, b) => a * b;

module.exports = {
  sum,
  multiply
};
```

#### File 2: `extraMathUtils.js`

```javascript
// extraMathUtils.js
const divide = (a, b) => a / b;

module.exports = {
  divide
};
```

#### Combined Namespace: `allMathUtils.js`

```javascript
// allMathUtils.js
const MathUtils = require('./mathUtils');
const ExtraMathUtils = require('./extraMathUtils');

const AllMathUtils = {
  ...MathUtils,
  ...ExtraMathUtils
};

module.exports = AllMathUtils;
```

#### Usage

```javascript
// app.js
const AllMathUtils = require('./allMathUtils');

console.log(AllMathUtils.sum(1, 2));  // Output: 3
console.log(AllMathUtils.multiply(2, 3));  // Output: 6
console.log(AllMathUtils.divide(6, 2));  // Output: 3
```

### Module Name Based on File Name

In CommonJS, the name of the module is generally determined by the file name if you're not specifying a class or object name. If your file is named `utilityFunctions.js`, the module would usually be referred to by that name when imported.

#### File: `utilityFunctions.js`

```javascript
const helloWorld = () => 'Hello, world!';

module.exports = {
  helloWorld
};
```

#### Usage

```javascript
// app.js
const utilityFunctions = require('./utilityFunctions');

console.log(utilityFunctions.helloWorld());  // Output: 'Hello, world!'
```

In the above example, there's no class or object defined in `utilityFunctions.js`. We're just exporting an object with the functions. The name `utilityFunctions` comes from the file name when you require it in another file.
