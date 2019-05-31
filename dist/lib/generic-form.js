"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const utils_1 = require("./utils");
// endregion
// region helper functions
const createEmptyResult = (fieldOptions) => {
    return Object.keys(fieldOptions).reduce((result, key) => {
        const newField = {
            name: key,
            value: null,
            errors: [],
        };
        return {
            ...result,
            [key]: newField,
        };
    }, {});
};
const validate = (fieldOptions, data) => {
    return Object.entries(fieldOptions).reduce((result, [key, field]) => {
        const value = data.get(key);
        const validators = field.validators;
        const errors = validators && validators.map(validator => validator(data, key)).filter(Boolean) || [];
        const newField = {
            name: key,
            value,
            errors
        };
        return {
            ...result,
            [key]: newField,
        };
    }, {});
};
const submit = (fieldOptions, updateFields, setIsSubmitting, callback) => async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fields = validate(fieldOptions, formData);
    updateFields(fields);
    if (callback) {
        setIsSubmitting(true);
        await callback({
            fields,
            formData,
            isValid: Object.values(fields).every(field => !field.errors.length),
            json: () => utils_1.formDataToJson(formData),
        });
        setIsSubmitting(false);
    }
};
// endregion
// region component
exports.GenericForm = ({ children, fieldOptions, onFormSubmit, ...formProps }) => {
    const [result, updateResult] = React.useState(createEmptyResult(fieldOptions));
    const [isSubmitting, setSubmitting] = React.useState(false);
    return (React.createElement("form", Object.assign({}, formProps, { onSubmit: submit(fieldOptions, updateResult, setSubmitting, onFormSubmit) }), children({
        fieldOptions,
        isSubmitting,
        fields: result,
    })));
};
// endregion
