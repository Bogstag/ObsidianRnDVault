---
date_created: 2023-11-01 16:48:32
date_modified: 2023-11-04 23:27:38
---
# Names and Patterns

Common patterns and ways of naming things. Nothing of this is set in stone. But i think is a good way to think about structure and how you can solve a problem in different ways.

```dataviewjs
dv.view("toc", {"level": 1, "heading": true})
```

# Patterns I Dont Have a Fancy Word for

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

# Creational Design Patterns

Creational patterns consist of different mechanisms used to create objects.

## Singleton Pattern

Singleton is a design pattern that ensures that a class has only one immutable instance. Said simply, the singleton pattern consists of an object that can't be copied or modified. It's often useful when we want to have some immutable single _point of truth_ for our application.

```javascript
//object literal
const Config = {
  start: () => console.log('App has started'),
  update: () => console.log('App has updated'),
}

// We freeze the object to prevent new properties being added and existing properties being modified or removed
Object.freeze(Config)

Config.start() // "App has started"
Config.update() // "App has updated"

Config.name = "Robert" // We try to add a new key
console.log(Config) // And verify it doesn't work: { start: [Function: start], update: [Function: update] }
```

```javascript
//Using classes
class Config {
    constructor() {}
    start(){ console.log('App has started') }  
    update(){ console.log('App has updated') }
}
  
const instance = new Config()
Object.freeze(instance)
```

### CommonJS

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

The Factory method pattern provides an interface for creating objects that can be modified after creation. The logic for creating our objects is centralized in a single place, simplifying and better organizing our code.

```javascript
//Using classes
class Alien {
    constructor (name, phrase) {
        this.name = name
        this.phrase = phrase
        this.species = "alien"
    }
    fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!")
    sayPhrase = () => console.log(this.phrase)
}

const alien1 = new Alien("Ali", "I'm Ali the alien!")
console.log(alien1.name) // output: "Ali"
```

```javascript
//Using a factory function
function Alien(name, phrase) {
    this.name = name
    this.phrase = phrase
    this.species = "alien"
}

Alien.prototype.fly = () => console.log("Zzzzzziiiiiinnnnnggggg!!")
Alien.prototype.sayPhrase = () => console.log(this.phrase)

const alien1 = new Alien("Ali", "I'm Ali the alien!")

console.log(alien1.name) // output "Ali"
console.log(alien1.phrase) // output "I'm Ali the alien!"
alien1.fly() // output "Zzzzzziiiiiinnnnnggggg"
```

### CommonJS

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

## Abstract Factory Pattern

The Abstract Factory pattern allows us to produce families of related objects without specifying concrete classes. It's useful in situations where we need to create objects that share only some properties and methods.

```javascript
// We have a class or "concrete factory" for each vehicle type
class Car {
    constructor () {
        this.name = "Car"
        this.wheels = 4
    }
    turnOn = () => console.log("Chacabúm!!")
}

class Truck {
    constructor () {
        this.name = "Truck"
        this.wheels = 8
    }
    turnOn = () => console.log("RRRRRRRRUUUUUUUUUMMMMMMMMMM!!")
}

class Motorcycle {
    constructor () {
        this.name = "Motorcycle"
        this.wheels = 2
    }
    turnOn = () => console.log("sssssssssssssssssssssssssssssshhhhhhhhhhham!!")
}

// And and abstract factory that works as a single point of interaction for our clients
// Given the type parameter it receives, it will call the corresponding concrete factory
const vehicleFactory = {
    createVehicle: function (type) {
        switch (type) {
            case "car":
                return new Car()
            case "truck":
                return new Truck()
            case "motorcycle":
                return new Motorcycle()
            default:
                return null
        }
    }
}

const car = vehicleFactory.createVehicle("car") // Car { turnOn: [Function: turnOn], name: 'Car', wheels: 4 }
const truck = vehicleFactory.createVehicle("truck") // Truck { turnOn: [Function: turnOn], name: 'Truck', wheels: 8 }
const motorcycle = vehicleFactory.createVehicle("motorcycle") // Motorcycle { turnOn: [Function: turnOn], name: 'Motorcycle', wheels: 2 }
```

## Builder Pattern

The Builder pattern is used to create objects in "steps". Normally we will have functions or methods that add certain properties or methods to our object.

```javascript
// We declare our objects
const bug1 = {
    name: "Buggy McFly",
    phrase: "Your debugger doesn't work with me!"
}

const bug2 = {
    name: "Martiniano Buggland",
    phrase: "Can't touch this! Na na na na..."
}

// These functions take an object as parameter and add a method to them
const addFlyingAbility = obj => {
    obj.fly = () => console.log(`Now ${obj.name} can fly!`)
}

const addSpeechAbility = obj => {
    obj.saySmthg = () => console.log(`${obj.name} walks the walk and talks the talk!`)
}

// Finally we call the builder functions passing the objects as parameters
addFlyingAbility(bug1)
bug1.fly() // output: "Now Buggy McFly can fly!"

addSpeechAbility(bug2)
bug2.saySmthg() // output: "Martiniano Buggland walks the walk and talks the talk!"
```

## Prototype Pattern

The Prototype pattern allows you to create an object using another object as a blueprint, inheriting its properties and methods.

```javascript
// We declare our prototype object with two methods
const enemy = {
    attack: () => console.log("Pim Pam Pum!"),
    flyAway: () => console.log("Flyyyy like an eagle!")
}

// We declare another object that will inherit from our prototype
const bug1 = {
    name: "Buggy McFly",
    phrase: "Your debugger doesn't work with me!"
}

// With setPrototypeOf we set the prototype of our object
Object.setPrototypeOf(bug1, enemy)

// With getPrototypeOf we read the prototype and confirm the previous has worked
console.log(Object.getPrototypeOf(bug1)) // { attack: [Function: attack], flyAway: [Function: flyAway] }

console.log(bug1.phrase) // Your debugger doesn't work with me!
console.log(bug1.attack()) // Pim Pam Pum!
console.log(bug1.flyAway()) // Flyyyy like an eagle!
```

# Structural Design Patterns

Structural patterns refer to how to assemble objects and classes into larger structures.

## Adapter Pattern

The Adapter allows two objects with incompatible interfaces to interact with each other.

```javascript
// Our array of cities
const citiesHabitantsInMillions = [
    { city: "London", habitants: 8.9 },
    { city: "Rome", habitants: 2.8 },
    { city: "New york", habitants: 8.8 },
    { city: "Paris", habitants: 2.1 },
] 

// The new city we want to add
const BuenosAires = {
    city: "Buenos Aires",
    habitants: 3100000
}

// Our adapter function takes our city and converts the habitants property to the same format all the other cities have
const toMillionsAdapter = city => { city.habitants = parseFloat((city.habitants/1000000).toFixed(1)) }

toMillionsAdapter(BuenosAires)

// We add the new city to the array
citiesHabitantsInMillions.push(BuenosAires)

// And this function returns the largest habitants number
const MostHabitantsInMillions = () => {
    return Math.max(...citiesHabitantsInMillions.map(city => city.habitants))
}

console.log(MostHabitantsInMillions()) // 8.9
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

The Decorator pattern lets you attach new behaviors to objects by placing them inside wrapper objects that contain the behaviors. If you're somewhat familiar with React and higher order components (HOC) this kind of approach probably rings a bell for you.

```javascript
import { useState } from 'react'
import Context from './Context'

const ContextProvider: React.FC = ({children}) => {

    const [darkModeOn, setDarkModeOn] = useState(true)
    const [englishLanguage, setEnglishLanguage] = useState(true)

    return (
        <Context.Provider value={{
            darkModeOn,
            setDarkModeOn,
            englishLanguage,
            setEnglishLanguage
        }} >
            {children}
        </Context.Provider>
    )
}

export default ContextProvider
```

Then we wrap the whole application around it:

```javascript
export default function App() {
  return (
    <ContextProvider>
      <Router>

        <ErrorBoundary>
          <Suspense fallback={<></>}>
            <Header />
          </Suspense>

          <Routes>
              <Route path='/' element={<Suspense fallback={<></>}><AboutPage /></Suspense>}/>

              <Route path='/projects' element={<Suspense fallback={<></>}><ProjectsPage /></Suspense>}/>

              <Route path='/projects/helpr' element={<Suspense fallback={<></>}><HelprProject /></Suspense>}/>

              <Route path='/projects/myWebsite' element={<Suspense fallback={<></>}><MyWebsiteProject /></Suspense>}/>

              <Route path='/projects/mixr' element={<Suspense fallback={<></>}><MixrProject /></Suspense>}/>

              <Route path='/projects/shortr' element={<Suspense fallback={<></>}><ShortrProject /></Suspense>}/>

              <Route path='/curriculum' element={<Suspense fallback={<></>}><CurriculumPage /></Suspense>}/>

              <Route path='/blog' element={<Suspense fallback={<></>}><BlogPage /></Suspense>}/>

              <Route path='/contact' element={<Suspense fallback={<></>}><ContactPage /></Suspense>}/>
          </Routes>
        </ErrorBoundary>

      </Router>
    </ContextProvider>
  )
}
```

And later on, using the `useContext` hook I can access the state defined in the Context from any of the components in my app.

```javascript

const AboutPage: React.FC = () => {

    const { darkModeOn, englishLanguage } = useContext(Context)
    
    return (...)
}

export default AboutPage
```

## Facade Pattern

The Facade pattern provides a simplified interface to a library, a framework, or any other complex set of classes.

```javascript
mport * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
```

## Proxy Pattern

The Proxy pattern provides a substitute or placeholder for another object. The idea is to control access to the original object, performing some kind of action before or after the request gets to the actual original object.

```javascript
const jwt = require('jsonwebtoken')

module.exports = function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token === null) return res.status(401).send(JSON.stringify('No access token provided'))
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).send(JSON.stringify('Wrong token provided'))
      req.user = user
      next()
    })
}
```

This function is a middleware, and we can use it in any endpoint of our API in the following way. We just place the middleware after the endpoint address and before declaration of the endpoint function:

```javascript
router.get('/:jobRecordId', authenticateToken, async (req, res) => {
  try {
    const job = await JobRecord.findOne({_id: req.params.jobRecordId})
    res.status(200).send(job)

  } catch (err) {
    res.status(500).json(err)
  }
})
```

# Behavioural Design Patterns

Behavioural patterns control communication and the assignment of responsibilities between different objects.

## Chain of Responsibility Pattern

The Chain of Responsibility passes requests along a chain of handlers. Each handler decides either to process the request or to pass it to the next handler in the chain.

A typical front-end app that consumes an API could work as an example:

- We have a function responsible for rendering a UI component.
- Once rendered, a another function makes a request to an API endpoint.
- If the endpoint response is as expected, the information is passed to another function that sorts the data in a given way and stores it in a variable.
- Once that variable stores the needed information, another function is responsible of rendering it in the UI.

## Iterator Pattern

The iterator is used to traverse elements of a collection. This might sound trivial in programming languages used nowadays, but this wasn't always the case.

Anyway, any of the JavaScript built in functions we have at our disposal to iterate over data structures (`for`, `forEach`, `for...of`, `for...in`, `map`, `reduce`, `filter`, and so on) are examples of the iterator pattern.

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

The observer pattern lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they’re observing. Basically, it's like having an event listener on a given object, and when that object performs the action we're listening for, we do something.

The hook is divided in two main parts, the executable function and an array of dependencies. If the array is empty, like in the following example, the function gets executed each time the component is rendered.

```javascript
  useEffect(() => { console.log('The component has rendered') }, [])
```

If we declare any variables within the dependency array, the function will execute only when those variables change.

```javascript
  useEffect(() => { console.log('var1 has changed') }, [var1]
```
