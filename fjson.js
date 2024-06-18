async function performSubmissionWithFetch(event) {
    event.preventDefault(); // Prevent the default form submission
    const form = event.target;
    const formAsObject = form_to_object(form);

    const response = await fetch(form.action, {
        method: form.method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formAsObject), // Send the JSON data
    });

    if (response.ok) {
        const html = await response.text(); // Get the HTML response as text
        const newUrl = response.url; // Get the new URL from the response

        // Parse the response HTML using a DOMParser
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Replace the entire body content with the new content
        document.body.innerHTML = doc.body.innerHTML;

        // Update the URL in the browser without breaking the back functionality
        history.pushState({html: html, url: newUrl}, '', newUrl);
    } else {
        console.error('Form submission failed');
        // Handle the error response as needed
    }
}

async function formListener(event) {
    const form = event.target;
    const formAsObject = form_to_object(form);

    if (form.querySelector(`input[name='_fjson']`)) {
        throw new Error('Form already has a hidden input with the name _fjson');
    }

    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = '_fjson';
    hiddenInput.value = JSON.stringify(formAsObject);
    form.appendChild(hiddenInput);
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


document.addEventListener('DOMContentLoaded', () => {
    // Select all forms with the 'fjson' attribute
    const forms = document.querySelectorAll('form[fjson]');

    // Add an event listener for 'submit' to each form
    forms.forEach(form => {
        form.addEventListener('submit', formListener);
    });
});

module.exports = {
    formDataToList: formDataToList,
    convertToObjectHierarchy: convertToObjectHierarchy,
    form_to_object: form_to_object,
};