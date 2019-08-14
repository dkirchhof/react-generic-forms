import * as React from "react";

import { IField } from "../lib/generic-form";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    field: IField<any>;
};

const changeValue = (field: IField<any>, value: any) => {
    field.value = value;
}

export const InputWithValidator = ({ field, ...inputProps }: IInputProps) => (
    <div>
        <input {...inputProps} name={field.name} style={{ borderColor: field.errors.length ? "red" : "gray" }} onChange={e => changeValue(field, e.currentTarget.value)}/>
        <ul>
            {field.errors.map((error, i) => <li key={i}>{error}</li>)}
        </ul>
    </div>  
);
