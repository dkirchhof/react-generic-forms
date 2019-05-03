import * as React from "react";

interface IFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    children: (props: { fields: any; }) => React.ReactElement;
}

// const createEmptyValidationResult = <T extends object>(form: any) => {
//     return Object.keys(form).reduce((result, key) => ({ ...result, [key]: [] }), { }) as FormValidationResult<T>;
// }

// const validate = <T extends object>(form: Form<T>, data: FormData) => {
//     return Object.entries(form).reduce((result, [key, fieldOptions]) => {
        
//         const value = data.get(key) as string;
//         const validators = (fieldOptions as IFieldOptions).validators;

//         const errors = validators.map(v => v(value)).filter(Boolean);

//         return { 
//             ...result, 
//             [key]: errors, 
//         };

//     }, { }) as FormValidationResult<T>;
// }

// const submit = (form: Form<any>, setResult: React.Dispatch<React.SetStateAction<{}>>) => (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const formData = new FormData(event.currentTarget);
//     const validationResult = validate(form, formData);

//     setResult(validationResult);
// }

export const Form = (props: IFormProps) => {
    // const [validationResult, setValidationResult] = React.useState(createEmptyValidationResult(myForm));
    // const [validationResult, setValidationResult] = React.useState({ });
  
    // return (
    //     <form onSubmit={submit(myForm, setValidationResult)}>
    //         {props.children}
    //     </form>
    // );

    return (
        <form {...props}>
            {props.children(props as any)})}
        </form>
    )
};