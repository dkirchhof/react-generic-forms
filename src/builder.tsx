import * as React from "react";

import { Form } from "./form";
import { InputWithValidator } from "./input";

type Field<T> = { validators?: any; errors?: any; value?: T; };
type Fields<T> = { [k in keyof T]: Field<T[k]>; };

// type Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => React.ReactElement;
// type Inputs<T> = { [k in keyof T]: Input };

// type FieldNames<T> = { [k in keyof T]: k };

// interface IFormProps<T> extends React.FormHTMLAttributes<HTMLFormElement> {
//     children: (props: { fields: Fields<T>; }) => React.ReactElement;
// }

// export class FormBuilder<T> {
//     // public fieldNames: FieldNames<T>;

//     public readonly form: (props: IFormProps<T>) => React.ReactElement;
//     // public readonly inputs: Inputs<T>;
    
//     public readonly submit: (props: React.InputHTMLAttributes<HTMLInputElement>) => React.ReactElement;
//     public readonly reset: (props: React.InputHTMLAttributes<HTMLInputElement>) => React.ReactElement;

//     constructor(fieldOptions: Fields<T>) {
//         this.form = props => <Form {...props} onSubmit={(e) => { e.preventDefault(); console.log("submit"); }}/>;

//         this.submit = props => <input type="submit" {...props}/>;
//         this.reset = props => <input type="reset" {...props}/>;

//         // this.fieldNames = Object.keys(fieldOptions).reduce((fieldNames, fieldName) => ({ ...fieldNames, [fieldName]: fieldName }), { } as FieldNames<T>);


//         // const initialValue: Inputs<any> = { };
        
//         // const reducer = (inputs: Inputs<T>, key: string) => {
//         //     const newInput: Input = props => <InputWithValidator name={key} validationResult={{}}>{props.children}</InputWithValidator>;

//         //     return {
//         //         ...inputs, 
//         //         [key]: newInput
//         //     };
//         // };

//         // this.inputs = Object.keys(fieldOptions).reduce(reducer, initialValue);
//     }
// }

// const formDataToJson = (formData: FormData) => 
//     [...formData.entries()].reduce((json, [key, value]) => ({ ...json, [key]: value }), { });

const validate = (fields: Fields<any>, data: FormData) => {
    return Object.entries(fields).reduce((result, [key, field]) => {      

        const value = data.get(key);
        const validators = field.validators;
        const errors = validators && validators.map(validator => validator(value)).filter(Boolean) || [];

        const newField: Field<any> = {
            ...field,
            value,
            errors
        }

        return {
            ...result,
            [key]: newField,
        };

    }, { });
};

const submit = (fields: Fields<any>, updateFields: React.Dispatch<React.SetStateAction<{}>>) => (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = validate(fields, formData);

    updateFields(result);
    console.log(result);
};

interface IFFFormProps<T> extends React.FormHTMLAttributes<HTMLFormElement> {
    fields: Fields<T>;

    children: (props: { fieldOptions: Fields<T>; }) => React.ReactElement;
}

export const FFForm = <T extends object>(props: IFFFormProps<T>) => {
    const [fields, updateFields] = React.useState(props.fields);

    return (
        <form onSubmit={submit(fields, updateFields)}>
            {props.children({ fieldOptions: fields })}
        </form>
    );
}
