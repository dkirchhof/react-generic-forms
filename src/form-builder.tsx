import * as React from "react";

type ValidationFunction = (value: string) => string | null
type ValidationFunctionWithParams = (...params: any[]) => ValidationFunction;

type FormValidationResult<T> = {
    [k in keyof T]: string[];
}

const minLength: ValidationFunctionWithParams = (minLength: number) => (value: string) => value.length >= minLength ? null : `value should greater than or equal to ${minLength} characters.`; 
const maxLength: ValidationFunctionWithParams = (maxLength: number) => (value: string) => value.length <= maxLength ? null : `value should be less than or equal to ${maxLength} characters.`; 

const minValue: ValidationFunctionWithParams = (minValue: number) => (value: string) => Number(value) >= minValue ? null : `value should be greater than or equal to ${minValue}.`; 
const maxValue: ValidationFunctionWithParams = (maxValue: number) => (value: string) => Number(value) <= maxValue ? null : `value should be less than or equal to ${maxValue}.`; 
const isEven: ValidationFunctionWithParams = () => (value: string) => Number(value) % 2 === 0 ? null : `value should be even.`;
const isOdd: ValidationFunctionWithParams = () => (value: string) => Number(value) % 2 !== 0 ? null : `value should be odd.`;

interface IFieldOptions {
    component: React.ReactElement<HTMLInputElement>;
    validators: ValidationFunction[];
}

type Form<T> = {
    [k in keyof T]: IFieldOptions;
}

const myForm: Form<IPerson> = {
    age: { component: <input type="number"/>, validators: [minValue(10), isEven()] },
    name: { component: <input type="text"/>, validators: [minLength(4), maxLength(10)] },
}

const createEmptyValidationResult = <T extends object>(form: Form<T>) => {
    return Object.keys(form).reduce((result, key) => ({ ...result, [key]: [] }), { }) as FormValidationResult<T>;
}

const validate = <T extends object>(form: Form<T>, data: FormData) => {
    return Object.entries(form).reduce((result, [key, fieldOptions]) => {
        
        const value = data.get(key) as string;
        const validators = (fieldOptions as IFieldOptions).validators;

        const errors = validators.map(v => v(value)).filter(Boolean);

        return { 
            ...result, 
            [key]: errors, 
        };

    }, { }) as FormValidationResult<T>;
}

const submit = (form: Form<any>, setResult: React.Dispatch<React.SetStateAction<{}>>) => (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const validationResult = validate(form, formData);

    setResult(validationResult);
}


interface IPerson {
    age: number;
    name: string;
}

interface IFormProps {

}

export const Form = (props: IFormProps) => {
    const [validationResult, setValidationResult] = React.useState(createEmptyValidationResult(myForm));
  
    return (
        <form onSubmit={submit(myForm, setValidationResult)}>
            {/* <myForm.age.component/> */}
            {Object.entries(myForm).map(([key, { component }]) =>
                <Input key={key} name={key} component={component} errors={validationResult[key]}/>
            )}
            <input type="submit" value="submit"/>
        </form>
    );
};

interface IInputProps {
    name: string;
    component: React.ReactElement<HTMLInputElement>;
    errors: string[];
};

const Input = (props: IInputProps) => (
    <div>
        {React.cloneElement(props.component, { 
            name: props.name,
            className: props.errors.length ? "invalid" : null,
        })}
        <div>{props.errors.map(e => <div>{e}</div>)}</div>
    </div>  
);
