import * as React from "react";

import { formDataToJson } from "./utils";
import { ValidationFunction } from "./validators";

// region types and interfaces

export type FieldOptions<T> = { [k in keyof T]: IFieldOption; };
export type Fields<T> = { [k in keyof T]: IField<T[k]>; };

export interface IFieldOption { 
    validators?: ValidationFunction[]; 
}

export interface IField<T> { 
    name: string; 
    errors: string[]; 
    value: T; 
}

export interface IGenericFormProps<T> extends React.FormHTMLAttributes<HTMLFormElement> {  
    fieldOptions: FieldOptions<T>;
    children: (props: IGenericFormChildProps<T>) => React.ReactElement | React.ReactElement[];
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => (result: IGenericFormResult<T>, actions: IGenericFormActions) => any;
}

export interface IGenericFormChildProps<T> {
    fields: Fields<T>;
    isSubmitting: boolean;
}

export interface IGenericFormResult<T> {
    fields: Fields<T>;
    formData: FormData;
    isValid: boolean;

    json: () => T;
}

export interface IGenericFormActions {
    setSubmitting: React.Dispatch<React.SetStateAction<{}>>;
}

// endregion

// region helper functions

const createEmptyResult = (fieldOptions: FieldOptions<any>) => {
    return Object.keys(fieldOptions).reduce((result, key) => {
        
        const newField: IField<any> = {
            name: key,
            value: null,
            errors: [],
        };

        return { 
            ...result,
            [key]: newField,
        };

    }, { }) as Fields<any>;
}

const validate = (fieldOptions: FieldOptions<any>, data: FormData) => {
    return Object.entries(fieldOptions).reduce((result, [key, field]) => {      

        const value = data.get(key);
        const validators = field.validators;
        const errors = validators && validators.map(validator => validator(data, key)).filter(Boolean) || [];

        const newField: IField<any> = {
            name: key,
            value,
            errors
        };

        return {
            ...result,
            [key]: newField,
        };

    }, { }) as Fields<any>;
};

// endregion

// region component

export const GenericForm = <T extends any>(props: IGenericFormProps<T>) => {
    const [fields, updateFields] = React.useState<Fields<T>>(createEmptyResult(props.fieldOptions));
    const [isSubmitting, setSubmitting] = React.useState(false);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault();
    
        const formData = new FormData(event.currentTarget);
        const fields = validate(props.fieldOptions, formData);

        updateFields(fields);
    
        if(props.onSubmit) {
            const result: IGenericFormResult<T> = {
                fields,
                formData,
                isValid: Object.values(fields).every(field => !field.errors.length),
                
                json: () => formDataToJson(formData),
            };
            
            const actions: IGenericFormActions = {
                setSubmitting,
            };

            props.onSubmit(event)(result, actions);
        }
    };

    const childProps: IGenericFormChildProps<T> = {
        fields,
        isSubmitting
    };

    return (
        <form onSubmit={onSubmit}>
            {props.children(childProps)}
        </form>
    );
};

// endregion
