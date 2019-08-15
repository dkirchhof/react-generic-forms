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
    const onGenericSubmit = async (event) => {
        event.preventDefault();
        const validatedFields = createValidatedFields(fields, props.fieldOptions);
        const isValid = Object.values(validatedFields).every(field => !field.errors.length);
        updateFields(validatedFields);
        if (props.onSubmit && isValid) {
            setSubmitting(true);
            const values = Object.values(validatedFields).map(field => field.value);
            try {
                return await props.onSubmit(event, values);
            }
            catch (error) {
                throw error;
            }
            finally {
                setSubmitting(false);
            }
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
