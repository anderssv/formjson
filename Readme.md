Simple client side script to handle form submissions with JSON. It adds a hidden input to the form with the name
'_formjson' and a value of the JSON representation of the form.

# Usage

Import the script into your page:
```html
<head>
    <script src="formjson.js"></script>
</head>
```

Mark your form with the formjson attribute:
```html
<form id="myForm" action="/response" method="post" formjson>
    <input type="text" name="user.name" required>
    <input type="hidden" name="user.address.street" value="123 Main St">
    <input type="hidden" name="user.address.city" value="Anytown">
    <input type="hidden" name="user.address.zip" value="12345">
    <button type="submit">Submit</button>
</form>
```

The formjson attribute will add a hidden input to the form with the name '_formjson' and a value of the JSON representation of the form.

Example JSON:
```json
{
    "user": {
        "name": "John Doe",
        "address": {
            "street": "123 Main St",
            "city": "Anytown",
            "zip": "12345"
        }
    }
}
```

Example conversion:
&lt;input type="text" name="administrators[1].name" value="name2" /&gt; should result in an object with a list
of administrators where the second element (0 indexed) has a name of 'name2'. This will then be JSON.stringified and
sent to the server.

Important elements:

- Maps to a object structure that should be easy for most back ends to pars
- Handles existing values (can be hidden inputs) by using a __existing suffix. Value will be resolved before sending to
  back end.

# Props
- Thanks to [Cies Breijs](https://github.com/cies) for initial discussions that lead to this idea.
- Thanks to Sindre Andre Jacobsen for ideas on how to handle form submission with a hidden field.

# Testing
There is a simple test suite. Run it with ```npm test```.

A simple test page is included in the repo. Yoy can run a test server with ```node server-test.js```.