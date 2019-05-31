import * as React from "react";
import { ValidationFunction } from "./validators";
export declare type FieldOptions<T> = {
    [k in keyof T]: IFieldOption;
};
export declare type Fields<T> = {
    [k in keyof T]: IField<T[k]>;
};
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
export declare const GenericForm: <T extends any>({ children, fieldOptions, onFormSubmit, ...formProps }: IGenericFormProps<T>) => JSX.Element;
