import * as React from "react";
import { render } from "react-dom";

import { GenericForm, FieldOptions } from "./generic-form";
import { InputWithValidator } from "./input";
import { minLength, maxLength, simpleMail, isBefore, maxFileSize, required, isSame } from "./validators";

interface IPerson {
    firstname: string;
    lastname: string;
    email: string;
    birthdate: Date;
    gender: "male" | "female";
    image: File;
    password: string;
    passwordConfirm: string;
}

const fieldOptions: FieldOptions<IPerson> = { 
    email: { validators: [(simpleMail())] }, 
    lastname: { validators: [minLength(2), maxLength(20)] }, 
    birthdate: { validators: [isBefore(new Date())] }, 
    firstname: { validators: [minLength(2), maxLength(20)] }, 
    gender: { },
    image: { validators: [maxFileSize(200)] },
    password: { validators: [minLength(6)] },
    passwordConfirm: { validators: [isSame<IPerson>("password")] },
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

        <GenericForm fieldOptions={fieldOptions} onFormSubmit={console.log}>
            {props => (
                <>
                    <InputWithValidator field={props.fields.firstname} placeholder="First name"/>
                    <InputWithValidator field={props.fields.lastname} placeholder="Last name"/>
                    <InputWithValidator field={props.fields.email} placeholder="Eg. example@email.com"/>
                    <InputWithValidator field={props.fields.birthdate} type="date"/>
                    
                    <div>
                        <select name={props.fields.gender.name} defaultValue="null">
                            <option disabled value={"null"}>gender</option>
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </select>
                        <ul>
                            {props.fields.gender.errors.map(error => <li>{error}</li>)}
                        </ul>
                    </div>

                    <InputWithValidator field={props.fields.image} type="file"/>
                    <InputWithValidator field={props.fields.password} type="password"/>
                    <InputWithValidator field={props.fields.passwordConfirm} type="password"/>

                    <input type="submit" value="Submit"/>
                    <input type="reset" value="Reset"/>
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
