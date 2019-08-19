import * as React from "react";

import { ValidationFunction } from "./validators";

// region types and interfaces

export type FieldOptions<T> = { [k in keyof T]: IFieldOption<T, T[k]>; };
export type Fields<T> = { [k in keyof T]: IField<T[k]>; };

export interface IFieldOption<T, F> { 
    validators?: Array<ValidationFunction<T, F>>; 
}

export interface IField<T> { 
    name: string; 
    errors: string[]; 
    value: T; 
}

export interface IGenericFormProps<T> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {  
    fieldOptions: FieldOptions<T>;
    initialValues: T;
    children: (props: IGenericFormChildProps<T>) => React.ReactElement | React.ReactElement[];
    onSubmit: (event: React.FormEvent<HTMLFormElement>, values: T) => Promise<any>;
}

export interface IGenericFormChildProps<T> {
    fields: Fields<T>;
    isSubmitting: boolean;
}

// endregion

// region helper functions

const createFields = <T extends any>(fieldOptions: FieldOptions<T>, initialValues: T) => {
    return Object.keys(fieldOptions).reduce((result, key) => {
        
        const newField: IField<any> = {
            name: key,
            value: initialValues[key],
            errors: [],
        };

        return { 
            ...result,
            [key]: newField,
        };

    }, { }) as Fields<any>;
}

const createValidatedFields = <T extends any>(fields: Fields<T>, fieldOptions: FieldOptions<T>) => {
    return Object.values(fields).reduce((result, field) => {      
        const validators = fieldOptions[field.name].validators;
        const errors = validators && validators.map(validator => validator(field.value, fields)).filter(Boolean) as string[] || [];

        const newField: IField<any> = {
            ...field,
            errors
        };

        return {
            ...result,
            [field.name]: newField,
        };

    }, { }) as Fields<T>;
};

const getValues = <T extends any>(fields: Fields<T>) => {
    return Object.values(fields).reduce((values, field) => ({
        ...values,
        [field.name]: field.value,
    }), { }) as T;
};

// endregion

// region component

export const GenericForm = <T extends any>(props: IGenericFormProps<T>) => {
    const [fields, updateFields] = React.useState<Fields<T>>(createFields(props.fieldOptions, props.initialValues));
    const [isSubmitting, setSubmitting] = React.useState(false);

    const onGenericSubmit = async (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault();
    
        const validatedFields = createValidatedFields(fields, props.fieldOptions);
        const isValid = Object.values(validatedFields).every(field => !field.errors.length);
        
        updateFields(validatedFields);

        if(props.onSubmit && isValid) {
            setSubmitting(true);

            const values = getValues(validatedFields);

            return props.onSubmit(event, values)
                .finally(() => setSubmitting(false));
        }
    };

    const childProps: IGenericFormChildProps<T> = {
        fields,
        isSubmitting
    };

    const { fieldOptions, onSubmit, children, initialValues, ...formProps } = props;

    return (
        <form onSubmit={onGenericSubmit} {...formProps}>
            {props.children(childProps)}
        </form>
    );
};

// endregion
