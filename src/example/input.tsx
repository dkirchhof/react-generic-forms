import * as React from "react";

import { IField } from "../lib/GenericForm";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    field: IField<any>;
};

export const InputWithValidator = ({ field, ...inputProps }: IInputProps) => (
    <div>
        <input {...inputProps} defaultValue={field.value} name={field.name} style={{ borderColor: field.errors.length ? "red" : "gray" }} onChange={e => field.value = e.currentTarget.value}/>
        <ul>
            {field.errors.map((error, i) => <li key={i}>{error}</li>)}
        </ul>
    </div>  
);
