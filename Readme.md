Simple client side script to handle hierarchies in forms.

Example: &lt;input type="text" name="administrators[1].name" value="name2" /&gt; should result in an object with a list
of administrators where the second element (0 indexed) has a name of 'name2'. This will then be JSON.stringified and
sent to the server.

Important elements:

- Maps to a object structure that should be easy for most back ends to pars
- Handles existing values (can be hidden inputs) by using a __existing suffix. Value will be resolved before sending to
  back end.

# Props
- Thanks to [Cies Breijs](https://github.com/cies) for initial discussions that lead to this idea.
- Thanks to Sindre Andre Jacobsen for ideas on how to handle form submission with a hidden field.
