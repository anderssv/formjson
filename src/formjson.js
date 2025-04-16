async function formListener(event) {
    const form = event.target;
    // Use the shared function to update the __formjson field
    const formAsObject = form_to_object(form);

    // Check if __formjson input already exists
    let hiddenInput = form.querySelector('input[name="__formjson"]');

    if (!hiddenInput) {
        // Create new hidden input if it doesn't exist
        hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = '__formjson';
        form.appendChild(hiddenInput);
    }

    // Update the value
    hiddenInput.value = JSON.stringify(formAsObject);
}

function convertToObjectHierarchy(data) {
    const result = {};

    for (const key in data) {
        const keys = key.split(/\.|\[|\]/).filter(k => k);
        let current = result;

        for (let i = 0; i < keys.length; i++) {
            const k = keys[i];
            if (i === keys.length - 1) {
                current[k] = data[key];
            } else {
                if (!current[k]) {
                    current[k] = isNaN(keys[i + 1]) ? {} : [];
                }
                current = current[k];
            }
        }
    }

    return result;
}

function formDataToList(form) {
    const formData = new FormData(form);
    const formDataObj = {};

    formData.forEach((value, key) => {
        // Handling __existing suffix
        const realKey = key.endsWith('__existing') ? key.replace('__existing', '') : key;
        // If real key is not in formDataObj without __existing suffix, assign value
        if (!formDataObj.hasOwnProperty(realKey) || !key.endsWith('__existing')) {
            formDataObj[realKey] = value;
        }
    });

    return formDataObj;
}

function form_to_object(form) {
    return convertToObjectHierarchy(formDataToList(form));
}


// Function to update the __formjson field for a form
document.addEventListener('DOMContentLoaded', () => {
    // Select all forms with the 'formjson' attribute
    const forms = document.querySelectorAll('form[formjson]');

    // Add an event listener for 'submit' to each form
    forms.forEach(form => {
        // Add submit event listener
        form.addEventListener('submit', formListener);
    });
});


// Export modules if in Node.js
// Thanks to https://stackoverflow.com/questions/4224606/how-to-check-whether-a-script-is-running-under-node-js
(function () {

    // Establish the root object, `window` in the browser, or `global` on the server.
    var root = this;

    // Create a reference to this
    var _ = new Object();

    var isNode = false;

    // Export the Underscore object for **CommonJS**, with backwards-compatibility
    // for the old `require()` API. If we're not in CommonJS, add `_` to the
    // global object.
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            formDataToList: formDataToList,
            convertToObjectHierarchy: convertToObjectHierarchy,
            form_to_object: form_to_object,
        };
        root._ = _;
        isNode = true;
    } else {
        root._ = _;
    }
})();