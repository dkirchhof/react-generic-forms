import * as React from "react";

import { IField } from "../lib/GenericForm";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    field: IField<any>;
};

const onChange = (field: IField<any>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { type } = event.currentTarget;

    switch(type) {
        case "file":
            field.value = event.currentTarget.files;
            break;
        case "number":
            field.value = event.currentTarget.valueAsNumber;
            break;
        case "date":
            field.value = event.currentTarget.valueAsDate;
            break;
        default:
            field.value = event.currentTarget.value;
            break;
    }
};

export const InputWithValidator = ({ field, ...inputProps }: IInputProps) => (
    <div>
        <input {...inputProps} defaultValue={field.value} name={field.name} style={{ borderColor: field.errors.length ? "red" : "gray" }} onChange={onChange(field)}/>
        <ul>
            {field.errors.map((error, i) => <li key={i}>{error}</li>)}
        </ul>
    </div>  
);
