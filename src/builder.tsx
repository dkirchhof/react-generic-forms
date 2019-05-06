import * as React from "react";

import { ValidationFunction } from "./validation";

export type FieldOption = { validators?: ValidationFunction[]; };
export type FieldOptions<T> = { [k in keyof T]: FieldOption; };

export type Field<T> = { name: string; errors: string[]; value: T; };
export type Fields<T> = { [k in keyof T]: Field<T[k]>; };

const createEmptyResult = (fieldOptions: FieldOptions<any>) => {
    return Object.keys(fieldOptions).reduce((result, key) => {
        
        const newField: Field<any> = {
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

        const newField: Field<any> = {
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

const submit = (fieldOptions: FieldOptions<any>, updateFields: React.Dispatch<React.SetStateAction<{}>>, callback?: (formResult: FormResult<any>) => any) => (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const fields = validate(fieldOptions, formData);

    updateFields(fields);
    
    if(callback) {
        callback({
            fields,
            formData,
            isValid: Object.values(fields).every(field => !field.errors.length),
        });
    }
};

interface GenericFormProps<T> extends React.FormHTMLAttributes<HTMLFormElement> {
    fieldOptions: FieldOptions<T>;
    children: (props: GenericFormDataProps<T>) => React.ReactElement;
    
    onFormSubmit?: (result: FormResult<T>) => any;
}

interface GenericFormDataProps<T> {
    fieldOptions: FieldOptions<T>;
    fields: Fields<T>;
}

interface FormResult<T> {
    fields: Fields<T>;
    formData: FormData;
    isValid: boolean;
}

export const GenericForm = <T extends any>({ children, fieldOptions, onFormSubmit, ...formProps }: GenericFormProps<T>) => {
    const [result, updateResult] = React.useState<Fields<T>>(createEmptyResult(fieldOptions));

    return (
        <form {...formProps} onSubmit={submit(fieldOptions, updateResult, onFormSubmit)}>
            {children({ fieldOptions, fields: result })}
        </form>
    );
}
