---
date_created: 2023-11-01 16:48:32
date_modified: 2023-11-01 19:40:00
---
# Names and Patterns

w# Names and Patterns

Common patterns and ways of naming things.

## Utility Classes

- Cannot be instantiated (usually have a private constructor)
- Only have static methods and variables
- Often have a global scope within the application

A utility class that provides static methods for common string operations:

```javascript
class StringUtils {
  // Private constructor to prevent instantiation
  constructor() {
    throw new Error("Cannot instantiate a utility class.");
  }

  static toUpperCase(str) {
    return str.toUpperCase();
  }

  static toLowerCase(str) {
    return str.toLowerCase();
  }
}

// Usage
console.log(StringUtils.toUpperCase("hello")); // "HELLO"
console.log(StringUtils.toLowerCase("WORLD")); // "world"
```

In this example, `StringUtils` is a utility class that provides static methods and cannot be instantiated.

### CommonJS Utility Class Example

```javascript
// utility.js
const UtilityClass = {
  staticMethod1() {
    return 'Static Method 1';
  },
  staticMethod2() {
    return 'Static Method 2';
  }
};

module.exports = UtilityClass;
```

Usage:

```javascript
const UtilityClass = require('./utility');

console.log(UtilityClass.staticMethod1()); // Output: "Static Method 1"
console.log(UtilityClass.staticMethod2()); // Output: "Static Method 2"
```

## Helper Classes

- Can be instantiated
- Can have instance variables
- Can have both instance and static methods
- Usually have a package scope

A helper class that can be instantiated and has both instance and static methods:

```javascript
class ArrayHelper {
  constructor(arr) {
    this.arr = arr;
  }

  getFirstElement() {
    return this.arr[0];
  }

  getLastElement() {
    return this.arr[this.arr.length - 1];
  }

  static isArrayEmpty(arr) {
    return arr.length === 0;
  }
}

// Usage
const helper = new ArrayHelper([1, 2, 3]);
console.log(helper.getFirstElement()); // 1
console.log(helper.getLastElement());  // 3

console.log(ArrayHelper.isArrayEmpty([])); // true
console.log(ArrayHelper.isArrayEmpty([1, 2, 3])); // false
```

`ArrayHelper` is a helper class that can be instantiated, has instance methods, and also includes a static method.

### CommonJS Helper Class Example

```javascript
// helper.js
class HelperClass {
  constructor(someValue) {
    this.someValue = someValue;
  }

  instanceMethod() {
    return `Instance method with value: ${this.someValue}`;
  }

  static staticMethod() {
    return 'Static Method';
  }
}

module.exports = HelperClass;
```

Usage:

```javascript
const HelperClass = require('./helper');

const helperInstance = new HelperClass('Hello');
console.log(helperInstance.instanceMethod()); // Output: "Instance method with value: Hello"
console.log(HelperClass.staticMethod()); // Output: "Static Method"
```

## Mixin

It's a function that takes a target object (in this case, the `target` parameter) and "mixes in" additional properties and methods. This is a way to share behavior across multiple classes or objects without using inheritance.

In JavaScript, this pattern is sometimes referred to as a "mixin." The function modifies the object it receives by attaching various properties and methods. The idea is to reuse a set of functionalities across different parts of an application without having to subclass or inherit from a base class.

```javascript
function Mixin(target) {
  target.sayHello = function() {
    console.log("Hello!");
  };
  target.sayGoodbye = function() {
    console.log("Goodbye!");
  };
}

class MyClass {
  constructor() {
    Mixin(this);
  }
}

const myInstance = new MyClass();
myInstance.sayHello();  // Output: "Hello!"
myInstance.sayGoodbye(); // Output: "Goodbye!"
```

In this example, the `Mixin` function takes an object `target` and attaches two methods to it: `sayHello` and `sayGoodbye`. When we create an instance of `MyClass`, we call the `Mixin` function in its constructor, passing `this` as the target. As a result, the instance inherits the methods from the mixin.

### CommonJS Mixin Example

```javascript
// mixin.js
function Mixin(target) {
  target.sayHello = function() {
    console.log("Hello!");
  };
  target.sayGoodbye = function() {
    console.log("Goodbye!");
  };
}

module.exports = Mixin;
```

Usage:

```javascript
const Mixin = require('./mixin');

class MyClass {
  constructor() {
    Mixin(this);
  }
}

const myInstance = new MyClass();
myInstance.sayHello();  // Output: "Hello!"
myInstance.sayGoodbye(); // Output: "Goodbye!"
```

## Singleton Pattern

Ensures that a class has only one instance and provides a way to access it.

```javascript
// singleton.js
let instance = null;

class Singleton {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }
}

module.exports = Singleton;
```

Usage:

```javascript
const Singleton = require('./singleton');

const instance1 = new Singleton();
const instance2 = new Singleton();
console.log(instance1 === instance2); // Output: true
```

## Factory Pattern

Provides an interface for creating instances of a class, with its subclass determining which class to instantiate.

```javascript
// factory.js
class AnimalFactory {
  static createAnimal(type) {
    if (type === 'Dog') return new Dog();
    if (type === 'Cat') return new Cat();
  }
}

class Dog {
  bark() {
    return 'Woof!';
  }
}

class Cat {
  meow() {
    return 'Meow!';
  }
}

module.exports = AnimalFactory;
```

Usage:

```javascript
const AnimalFactory = require('./factory');

const dog = AnimalFactory.createAnimal('Dog');
console.log(dog.bark()); // Output: "Woof!"

const cat = AnimalFactory.createAnimal('Cat');
console.log(cat.meow()); // Output: "Meow!"
```

## Observer Pattern

Allows an object to publish changes to its state so that other objects can react accordingly.

```javascript
// observer.js
class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyAll(message) {
    for (const observer of this.observers) {
      observer.notify(message);
    }
  }
}

class Observer {
  notify(message) {
    console.log(`Observer received message: ${message}`);
  }
}

module.exports = { Subject, Observer };
```

Usage:

```javascript
const { Subject, Observer } = require('./observer');

const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();

subject.addObserver(observer1);
subject.addObserver(observer2);

subject.notifyAll('Hello'); // Output: "Observer received message: Hello" for both observers
```

## Module Pattern

A way to create private and public encapsulation for classes or objects.

```javascript
// modulePattern.js
let privateVariable = "I am private";

function privateFunction() {
  return "This function is private";
}

module.exports.publicFunction = function() {
  return `Public can see me! ${privateFunction()}`;
};
```

Usage:

```javascript
const modulePattern = require('./modulePattern');
console.log(modulePattern.publicFunction());
```

## Revealing Module Pattern

An extension of the module pattern where only the required properties and methods are returned, hiding everything else.

```javascript
// revealingModulePattern.js
const name = "Revealing Module";
const age = 25;

function getName() {
  return name;
}

module.exports = {
  getName
};
```

Usage:

```javascript
const revealingModulePattern = require('./revealingModulePattern');
console.log(revealingModulePattern.getName());
```

## Command Pattern

Encapsulates a request as an object, thereby allowing us to parameterize clients with different requests.

```javascript
// commandPattern.js
class Command {
  execute() {
    throw new Error('This method must be overwritten!');
  }
}

class ConcreteCommand extends Command {
  constructor(subject) {
    super();
    this.subject = subject;
  }

  execute() {
    this.subject.action();
  }
}

class Subject {
  action() {
    console.log('Executing action');
  }
}

module.exports = { ConcreteCommand, Subject };
```

Usage:

```javascript
const { ConcreteCommand, Subject } = require('./commandPattern');
const subject = new Subject();
const command = new ConcreteCommand(subject);

command.execute();  // Output: 'Executing action'
```

## Strategy Pattern

Defines a family of algorithms, encapsulates each one, and makes them interchangeable.

```javascript
// strategyPattern.js
class Strategy {
  execute() {
    throw new Error('This method must be overwritten!');
  }
}

class ConcreteStrategyA extends Strategy {
  execute() {
    console.log('Executing strategy A');
  }
}

class ConcreteStrategyB extends Strategy {
  execute() {
    console.log('Executing strategy B');
  }
}

module.exports = { ConcreteStrategyA, ConcreteStrategyB };
```

Usage:

```javascript
const { ConcreteStrategyA, ConcreteStrategyB } = require('./strategyPattern');

const strategy1 = new ConcreteStrategyA();
const strategy2 = new ConcreteStrategyB();

strategy1.execute();  // Output: 'Executing strategy A'
strategy2.execute();  // Output: 'Executing strategy B'
```

## Decorator Pattern

Allows behavior to be added to individual objects, either statically or dynamically, without affecting the behavior of other objects from the same class.

```javascript
// decoratorPattern.js
class Coffee {
  cost() {
    return 5;
  }
}

function milkDecorator(coffee) {
  const cost = coffee.cost();
  coffee.cost = function() {
    return cost + 2;
  };
}

module.exports = { Coffee, milkDecorator };
```

Usage:

```javascript
const { Coffee, milkDecorator } = require('./decoratorPattern');

const coffee = new Coffee();
milkDecorator(coffee);

console.log(`Cost of coffee: ${coffee.cost()}`);  // Output: Cost of coffee: 7
```
