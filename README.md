# react-generic-forms
Use typesafe forms for your react apps.  
This library is heavily inspired by [Formik](https://jaredpalmer.com/formik), but from the beginning with typescript in mind.

## How it works
1. You have to define all the fields for your form (optional with validators) and its initial values
1. The form accepts a function as child, which will pass all `fields` and an `isSubmitting` property
1. All input components have to be connected to a specific field. They have to change the `field.value` property in its `onChange` event.
1. A submit button (`<input type="submit" />`) will trigger the validation and will call the `onSubmit` handler only **if all fields are valid**.
1. Within the `onSubmit` handler you have access to the original react `event`, all `values` and to form `actions`.

## Example

```ts
// common.ts

// probably there are some interfaces shared between client and server
interface ISignUpData {
    email: string;
    password: string;
    password2: string;
}
```

```ts
// signup.ts

import * as React from "react";
import { FieldOptions, GenericForm, IGenericFormResult, isSameAs, required, simpleMail } from "react-generic-forms";

import { ISignUpData } from "./common";
import { InputWithValidator } from "./input";

// create the fields
// hint: required() is needless while using any other validator
const fieldOptions: FieldOptions<ISignUpData> = {
    email: { validators: [simpleMail()] }, 
    password: { validators: [required()] },
    password2: { validators: [isSameAs("password")] },
};

// define initial values
const initialValues: ISignUpData = {
    email: "",
    password: "",
    password2: "",
};

// implement submit handler
const handleSubmit = async (result: IGenericFormResult<ISignUpData>) => {
    console.log(result.values);

    result.actions.setSubmitting(false);
};

// implement form component
export const SignUp = () => (
    <GenericForm fieldOptions={fieldOptions} initialValues={initialValues} onSubmit={handleSubmit}>
        {formProps => (
            <>
                <InputWithValidator type="text" field={formProps.fields.email} placeholder="E-Mail" />
                <InputWithValidator type="password" field={formProps.fields.password} placeholder="Password" />
                <InputWithValidator type="password" field={formProps.fields.password2} placeholder="Confirm Password" />

                <input type="submit" value="Register" disabled={formProps.isSubmitting} />
            </>
        )}
    </GenericForm>
);
```

```ts
// input.ts

import * as React from "react";
import { IField } from "react-generic-forms";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    field: IField<any>;
}

// a custom input component which renders validation errors
export const InputWithValidator = ({ field, ...inputProps }: IInputProps) => {
    const style = { borderColor: field.errors.length ? "red" : "gray" };
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => field.value = event.currentTarget.value;

    return (
        <div>
            <input {...inputProps} defaultValue={field.value} style={style} onChange={onChange} />
            <ul>
                {field.errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
        </div>  
    );
};
```

## Custom inputs
As the inputs only have to implement the `onChange` handler you can use the native html input elements or custom ones like [React Select](https://react-select.com/home). For this reason, there is no default input component included.

## Custom validators
The following types are used to define a custom validator:
- `type ValidationFunction<FieldValueType = any, T = any> = (value: FieldValueType | null | undefined, fields: Fields<T>) => string | null`
- `type CustomValidator = (...params: any[]) => ValidationFunction<T, F>`  

remark:
- `FieldValueType` is the type of the field to validate
- `T` is the generic type of the form

So to implement your custom validator
1. create a function with own validator settings 
1. return a function with the current value and optional all fields as parameters
1. return null, if the field is valid or an error message, if it's not.

example:
```ts
// simple validator
const arrayHasLength = (length: number): ValidationFunction<any[]> => {
    return value => {
        if (value && value.length === length) {
            return null;
        }
    
        return `The array should have ${length} items.`;
    };
}

// more complex validator
const numberIsGreaterThanOtherFieldValue = <T>(otherFieldName: keyof T): ValidationFunction<number, T> => {
    return (value, fields) => {
        if(value && value > fields[otherFieldName].value) {
            return null;
        }
        
        return `${value} <= ${fields[otherFieldName].value}`;
    }
}
```