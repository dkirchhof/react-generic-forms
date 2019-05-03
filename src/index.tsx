import * as React from "react";
import { render } from "react-dom";

import { GenericForm, FieldOptions } from "./builder";
import { InputWithValidator } from "./input";
import { minLength, maxLength, simpleMail, isBefore } from "./validation";

interface IPerson {
    firstname: string;
    lastname: string;
    email: string;
    birthdate: Date;

    gender: "male" | "female";
}

const fieldOptions: FieldOptions<IPerson> = { 
    email: { validators: [simpleMail] }, 
    lastname: { validators: [minLength(2), maxLength(20)] }, 
    birthdate: { validators: [isBefore(new Date())] }, 
    firstname: { validators: [minLength(2), maxLength(20)] }, 
    gender: { }
};

const App = () => (
    <>
        <style dangerouslySetInnerHTML={{__html: `
            form {
                width: 200px;
            }

            input, select, textarea {
                display: block;
                box-sizing: border-box;
                width: 100%;
                margin-bottom: 1em;
            }
        `}}/>

        <GenericForm<IPerson> fieldOptions={fieldOptions}>
            {props => (
                <>
                    <InputWithValidator field={props.fields.firstname} placeholder="First name"/>
                    <InputWithValidator field={props.fields.lastname} placeholder="Last name"/>
                    <InputWithValidator field={props.fields.email} placeholder="Eg. example@email.com"/>
                    <InputWithValidator field={props.fields.birthdate} type="date"/>
                    
                    <select name={props.fields.gender.name}>
                        <option disabled selected>gender</option>
                        <option value="male">male</option>
                        <option value="female">female</option>
                    </select>

                    <input type="submit" value="Submit"/>
                </>
            )}
        </GenericForm>

        {/* <formBuilder.inputs.firstname placeholder="First name"/>
        <formBuilder.inputs.lastname placeholder="Last name"/>
        <formBuilder.inputs.email placeholder="Eg. example@example.com" type="email"/>
        <formBuilder.inputs.birthdate type="date"/>

        <formBuilder.inputs.gender>
            <option value="male">male</option>
            <option value="female">female</option>
    </formBuilder.inputs.gender> */}
    </>
)


render(<App/>, document.getElementById("app"));
