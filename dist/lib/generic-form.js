"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
// endregion
// region helper functions
const createFields = (fieldOptions, initialValues) => {
    return Object.keys(fieldOptions).reduce((result, key) => {
        const newField = {
            name: key,
            value: initialValues[key],
            errors: [],
        };
        return {
            ...result,
            [key]: newField,
        };
    }, {});
};
const createValidatedFields = (fields, fieldOptions) => {
    return Object.values(fields).reduce((result, field) => {
        const validators = fieldOptions[field.name].validators;
        const errors = validators && validators.map(validator => validator(field.value, fields)).filter(Boolean) || [];
        const newField = {
            ...field,
            errors
        };
        return {
            ...result,
            [field.name]: newField,
        };
    }, {});
};
// endregion
// region component
exports.GenericForm = (props) => {
    const [fields, updateFields] = React.useState(createFields(props.fieldOptions, props.initialValues));
    const [isSubmitting, setSubmitting] = React.useState(false);
    const onGenericSubmit = (event) => {
        event.preventDefault();
        const validatedFields = createValidatedFields(fields, props.fieldOptions);
        updateFields(validatedFields);
        if (props.onSubmit) {
            const result = {
                fields,
                isValid: Object.values(fields).every(field => !field.errors.length),
                values: Object.values(fields).map(field => field.value),
            };
            const actions = {
                setSubmitting,
            };
            props.onSubmit(event, result, actions);
        }
    };
    const childProps = {
        fields,
        isSubmitting
    };
    const { fieldOptions, onSubmit, children, initialValues, ...formProps } = props;
    return (React.createElement("form", Object.assign({ onSubmit: onGenericSubmit }, formProps), props.children(childProps)));
};
// endregion
