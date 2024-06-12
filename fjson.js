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

module.exports = {
    formDataToList: formDataToList,
    convertToObjectHierarchy: convertToObjectHierarchy,
    form_to_object: form_to_object,
};