---
date_created: 2023-10-11 15:38:19
date_modified: 2023-10-11 15:39:05
---
# Array Methods

A summary of commonly used array methods in JavaScript:

| Method    | Description                                                                                                 | Returns                            | Modifies Original Array | Use Case                                                   |
|-----------|-------------------------------------------------------------------------------------------------------------|------------------------------------|-------------------------|------------------------------------------------------------|
| `filter`  | Creates a new array with elements that pass the test implemented by the provided function.                    | New array                          | No                      | When you want to remove elements that don't meet criteria. |
| `map`     | Creates a new array by applying a function to all elements of the original array.                             | New array                          | No                      | When you want to transform each element in an array.       |
| `forEach` | Executes a provided function once for each array element.                                                     | `undefined`                        | Yes                     | When you want to apply side effects to each element.       |
| `reduce`  | Applies a function against an accumulator and each element to reduce it to a single value.                    | Accumulated result                 | No                      | When you want to reduce array to a single value.           |
| `some`    | Checks if at least one element in the array passes a test implemented by the provided function.               | Boolean                            | No                      | When you want to know if at least one element satisfies conditions. |
| `every`   | Checks if all elements in the array pass a test implemented by the provided function.                          | Boolean                            | No                      | When you want to know if all elements satisfy conditions.  |
| `find`    | Returns the first element that satisfies the provided testing function; otherwise `undefined`.                 | Single element or `undefined`      | No                      | When you want to find a single element based on conditions.|
| `indexOf` | Returns the first index at which a given element can be found in the array, or `-1` if it is not present.      | Index or `-1`                      | No                      | When you want to find the index of a specific value.       |
| `slice`   | Returns a shallow copy of a portion of an array into a new array.                                             | New array                          | No                      | When you want to extract a portion of an array.            |
| `splice`  | Changes the contents of an array by removing or replacing existing elements and/or adding new elements.       | Array of removed elements          | Yes                     | When you want to modify an array by adding/removing elements. |
| `push`    | Adds one or more elements to the end of an array, and returns the new length of the array.                    | New length                         | Yes                     | When you want to add elements to the end of an array.      |
| `pop`     | Removes the last element from an array and returns that element.                                              | Removed element                    | Yes                     | When you want to remove the last element of an array.      |

Each method has its own use-cases, and which one to use often depends on what you are trying to accomplish.
