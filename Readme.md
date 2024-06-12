Simple client side script to handle hierarchies in forms.

Important elements:
- Maps to a object structure that should be easy for most back ends to pars
- Handles existing values (can be hidden inputs) by using a __existing suffix. Value will be resolved before sending to back end.

Example: &lt;input type="text" name="administrators[1].name" value="name2" /&gt; should result in an object with a list of administrators where the second element (0 indexed) has a name of 'name2'.

 