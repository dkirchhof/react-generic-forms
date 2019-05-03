import * as React from "react";

import { ValidationFunction } from "./validation";

export type FieldOption<T> = { validators?: ValidationFunction[]; };
export type FieldOptions<T> = { [k in keyof T]: FieldOption<T[k]>; };

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
        const errors = validators && validators.map(validator => validator(value)).filter(Boolean) || [];

        const newField: Field<any> = {
            name: key,
            value,
            errors
        }

        return {
            ...result,
            [key]: newField,
        };

    }, { }) as Fields<any>;
};

const submit = (fieldOptions: FieldOptions<any>, updateFields: React.Dispatch<React.SetStateAction<{}>>) => (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = validate(fieldOptions, formData);

    updateFields(result);
    console.log(result);
};

interface GenericFormProps<T> extends React.FormHTMLAttributes<HTMLFormElement> {
    fieldOptions: FieldOptions<T>;

    children: (props: GenericFormDataProps<T>) => React.ReactElement;
}

interface GenericFormDataProps<T> {
    fieldOptions: FieldOptions<T>;
    fields: Fields<T>;
}

export const GenericForm = <T extends any>({ children, fieldOptions, ...formProps }: GenericFormProps<T>) => {
    const [result, updateResult] = React.useState<Fields<T>>(createEmptyResult(fieldOptions));

    return (
        <form {...formProps} onSubmit={submit(fieldOptions, updateResult)}>
            {children({ fieldOptions, fields: result })}
        </form>
    );
}
