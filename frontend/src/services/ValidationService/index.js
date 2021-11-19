function validateEmpty(value, name) {
    let validation = {
        valid: true,
        message: ""
    }

    if (!value || value.trim().length === 0) {
        validation.message = name + " is required"
        validation.valid = false;
    }

    return validation
}

function validateOnlyLettersAndNumbers(field, fieldName) {

    let validation = {
        valid: true,
        message: ""
    }

    let reg = /^[A-Za-z0-9\s\-]*$/g
    if (!reg.test(field)) {
        validation.message = fieldName + " cannot contain special characters"
        validation.valid = false;
    }

    return validation
}

function validateFirstName(firstName) {

    let validation = validateEmpty(firstName, "First Name")
    if (!validation.valid) {
        return validation
    }

    validation = validateOnlyLettersAndNumbers(firstName, "First Name")

    return validation
}

export {validateFirstName}

