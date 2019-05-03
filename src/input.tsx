import * as React from "react";

import { Field } from "./builder";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    field: Field<any>;
};

export const InputWithValidator = ({ field, ...inputProps }: IInputProps) => (
    <div>
        <input {...inputProps} name={field.name} style={{ borderColor: field.errors.length ? "red" : "gray" }}/>
        <ul>
            {field.errors.map(error => <li>{error}</li>)}
        </ul>
    </div>  
);
