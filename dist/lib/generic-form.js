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
// endregion
// region component
exports.GenericForm = (props) => {
    const [fields, updateFields] = React.useState(createEmptyResult(props.fieldOptions));
    const [isSubmitting, setSubmitting] = React.useState(false);
    const onSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const fields = validate(props.fieldOptions, formData);
        updateFields(fields);
        if (props.onSubmit) {
            const result = {
                fields,
                formData,
                isValid: Object.values(fields).every(field => !field.errors.length),
                json: () => utils_1.formDataToJson(formData),
            };
            const actions = {
                setSubmitting,
            };
            props.onSubmit(event)(result, actions);
        }
    };
    const childProps = {
        fields,
        isSubmitting
    };
    return (React.createElement("form", { onSubmit: onSubmit }, props.children(childProps)));
};
// endregion
