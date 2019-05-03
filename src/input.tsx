import * as React from "react";

interface IInputProps {
    name: string;
    children: any;
    validationResult: any;
};

export const InputWithValidator = (props: IInputProps) => (
    <div>
        {React.Children.map(props.children, c => React.cloneElement(c, { name: props.name }))}
        <div>{props.validationResult[props.name] && props.validationResult[props.name].map(e => <div>{e}</div>)}</div>
    </div>  
);