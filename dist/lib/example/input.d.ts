import * as React from "react";
import { IField } from "../lib/GenericForm";
interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    field: IField<any>;
}
export declare const InputWithValidator: ({ field, ...inputProps }: IInputProps) => JSX.Element;
export {};
