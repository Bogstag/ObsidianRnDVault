---
date_created: 2023-10-31 20:01:51
date_modified: 2023-10-31 20:16:44
---
# JSDoc

## Essential Elements of a JSDoc Comment

Common elements to consider including in JSDoc comments:

1. Description: A brief description of what the function does.
2. Parameters: Use `@param` to describe function parameters, their types, and their purpose.
3. Return Value: Use `@return` or `@returns` to describe what the function returns.
4. Examples: Use `@example` to provide code examples.
5. Throws: Use `@throws` or `@exception` to document exceptions that the function might throw.
6. Deprecated: Use `@deprecated` to indicate that a function should no longer be used.
7. See: Use `@see` to refer to related code.

### Example

Here's an example JSDoc comment:

```javascript
/
 * Adds two numbers together.
 *
 * @param {number} a The first number.
 * @param {number} b The second number.
 * @return {number} The sum of a and b.
 *
 * @example
 * const sum = add(1, 2);  // sum will be 3
 *
 * @throws {TypeError} If any argument is not a number.
 *
 * @see {@link subtract}
 */
function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Both a and b must be numbers');
  }
  return a + b;
}
```

### Additional Tags

You can also use many other tags to provide more context or detail. Some commonly used ones include:

- `@author`: to indicate the author of the code
- `@since`: to indicate when the function was first added
- `@todo`: to indicate planned enhancements
- `@private` or `@public`: to indicate visibility
- `@class`, `@constructor`: for documenting classes and constructors
- `@module`, `@namespace`: for indicating modules or namespaces
- `@typedef`: for documenting custom types
- `@property` or `@prop`: for documenting object shape

## JSDoc for Class

Below is an example of a JSDoc comment for a JavaScript class that includes various tags to describe the class, its constructor, properties, methods, and exceptions:

```javascript
/**
 * Represents a book.
 * @class
 * @example
 * const myBook = new Book('1984', 'George Orwell');
 *
 * @throws {TypeError} Throws an error if either argument is not a string.
 * @see {@link Author}
 */
class Book {
  /**
   * @constructor
   * @param {string} title - The title of the book.
   * @param {string} author - The author of the book.
   */
  constructor(title, author) {
    if (typeof title !== 'string' || typeof author !== 'string') {
      throw new TypeError('Both title and author must be strings');
    }
    
    /**
     * @property {string} title - The title of the book.
     */
    this.title = title;

    /**
     * @property {string} author - The author of the book.
     */
    this.author = author;
  }

  /**
   * Gets the book description.
   * @method
   * @return {string} The description of the book.
   * @example
   * const description = myBook.getDescription(); // "1984 by George Orwell"
   */
  getDescription() {
    return `${this.title} by ${this.author}`;
  }

  /**
   * Sets a new author for the book.
   * @method
   * @param {string} newAuthor - The new author name.
   * @throws {TypeError} If newAuthor is not a string.
   * @example
   * myBook.setAuthor('Orwell');
   */
  setAuthor(newAuthor) {
    if (typeof newAuthor !== 'string') {
      throw new TypeError('newAuthor must be a string');
    }
    this.author = newAuthor;
  }

  /**
   * @typedef {Object} BookOptions
   * @property {boolean} includeAuthor - Whether to include the author in the output.
   */

  /**
   * Converts the book to a string.
   * @param {BookOptions} options - Options for formatting.
   * @return {string} The string representation of the book.
   * @example
   * myBook.toString({ includeAuthor: true }); // "1984 by George Orwell"
   */
  toString(options = { includeAuthor: false }) {
    return options.includeAuthor ? this.getDescription() : this.title;
  }
}
```

In this example:

- `@class` and `@constructor` to indicate that we're documenting a class and its constructor.
- `@param` to describe the parameters for the constructor and methods.
- `@property` to describe the properties of the class instances.
- `@return` to describe the return value of methods.
- `@throws` to describe the exceptions that methods might throw.
- `@example` to provide usage examples.
- `@method` to explicitly indicate that a function is a method.
- `@see` to link to related code.
- `@typedef` to document a custom type used in the code (`BookOptions`).
