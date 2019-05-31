import * as React from "react";

import { useIsMounted } from "./useIsMounted";
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
    children: (props: IGenericFormChildProps<T>) => React.ReactElement;
    
    onFormSubmit?: (result: IGenericFormResult<T>) => any;
}

export interface IGenericFormChildProps<T> {
    fieldOptions: FieldOptions<T>;
    fields: Fields<T>;
    isSubmitting: boolean;
}

export interface IGenericFormResult<T> {
    fields: Fields<T>;
    formData: FormData;
    isValid: boolean;

    json: () => T;
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

const submit = (
    fieldOptions: FieldOptions<any>, 
    updateFields: React.Dispatch<React.SetStateAction<{}>>, 
    setIsSubmitting: React.Dispatch<React.SetStateAction<{}>>, 
    isMounted: React.MutableRefObject<boolean>,
    callback?: (formResult: IGenericFormResult<any>) => any,
) => async (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const fields = validate(fieldOptions, formData);

    updateFields(fields);

    if(callback) {
        setIsSubmitting(true); 

        await callback({
            fields,
            formData,
            isValid: Object.values(fields).every(field => !field.errors.length),
            
            json: () => formDataToJson(formData),
        });
        
        if(isMounted.current) {
            setIsSubmitting(false);
        }
    }
};

// endregion

// region component

export const GenericForm = <T extends any>({ children, fieldOptions, onFormSubmit, ...formProps }: IGenericFormProps<T>) => {
    const isMounted = useIsMounted();

    const [result, updateResult] = React.useState<Fields<T>>(createEmptyResult(fieldOptions));
    const [isSubmitting, setSubmitting] = React.useState(false);

    React.useEffect(() => {
        isMounted.current = true;

        return () => isMounted.current = false;
    }, []);

    return (
        <form {...formProps} onSubmit={submit(fieldOptions, updateResult, setSubmitting, isMounted, onFormSubmit)}>
            {children({ 
                fieldOptions, 
                isSubmitting,
                fields: result, 
            })}
        </form>
    );
};

// endregion
