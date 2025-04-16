# FormJSON Project Guidelines

This document provides guidelines for development on the FormJSON project.

## Build/Configuration Instructions

FormJSON is a simple JavaScript library with no build process required. The main file is `src/formjson.js`.

### Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

### Dependencies

The project uses:
- Jest and jest-environment-jsdom for testing
- Express for the test server

## Testing Information

### Running Tests

Tests are written using Jest and can be run with:

```
npm test
```

This will run all tests in the `__tests__` directory.

### Test Structure

Tests use the jsdom environment to simulate a browser environment. A typical test:

1. Creates a mock HTML form
2. Uses the formjson library to convert the form to an object
3. Verifies the conversion works correctly

### Example Test

Here's a simple test example:

```javascript
/**
 * @jest-environment jsdom
 */

'use strict';

const formjson = require('../src/formjson.js');

test('Simple form to JSON conversion test', () => {
    // Create a simple form with basic fields
    document.body.innerHTML = `
    <form id="simpleForm">
        <input type="text" name="firstName" value="John">
        <input type="text" name="lastName" value="Doe">
        <input type="email" name="contact.email" value="john.doe@example.com">
    </form>
    `;

    // Get the form element
    const form = document.getElementById('simpleForm');
    
    // Convert form to object using the library
    const result = formjson.form_to_object(form);
    
    // Verify the conversion worked correctly
    expect(result.firstName).toEqual('John');
    expect(result.lastName).toEqual('Doe');
    expect(result.contact.email).toEqual('john.doe@example.com');
});
```

### Adding New Tests

To add a new test:

1. Create a new file in the `__tests__` directory with a descriptive name ending in `Test.js`
2. Add the jsdom environment comment at the top: `/** @jest-environment jsdom */`
3. Import the formjson library: `const formjson = require('../src/formjson.js');`
4. Write your test cases using Jest's `test()` function and assertions

### Manual Testing

The project includes a test server and demo page for manual testing:

1. Start the test server:
   ```
   node server-test.js
   ```
2. Open a browser and navigate to `http://localhost:3000`
3. Use the demo forms to test the library

## Additional Development Information

### Code Structure

- `src/formjson.js`: The main library file containing all functionality
- Key functions:
  - `formListener`: Event listener for form submissions
  - `convertToObjectHierarchy`: Converts flat form data to nested objects
  - `formDataToList`: Extracts data from a form
  - `form_to_object`: Main function that combines the above

### Naming Conventions

- Form field names use dot notation for object properties: `user.name`
- Array indices use bracket notation: `tags[0]`
- Combined notation for nested arrays: `administrators[0].name`

### Special Features

- The `__existing` suffix on field names is used to handle existing values
- The library adds a hidden input named `__formjson` to the form with the JSON representation

### Browser Compatibility

The library uses standard DOM APIs and should work in all modern browsers. It uses:
- FormData API
- JSON.stringify
- DOM manipulation methods