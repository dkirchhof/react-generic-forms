import * as React from "react";
import { render } from "react-dom";

import { GenericForm, FieldOptions, IGenericFormResult, IGenericFormActions } from "../lib/generic-form";
import { InputWithValidator } from "./input";
import { minLength, maxLength, simpleMail, isBefore, maxFileSize, isSame } from "../lib/validators";

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

const submit = () => (result: IGenericFormResult<IPerson>, actions: IGenericFormActions) => {
    if(!result.isValid) {
        console.log("invalid");
        return;
    }
    
    return new Promise(res => {
        console.log("valid");

        actions.setSubmitting(true);
        
        setTimeout(() => {
            console.log("submitted");

            actions.setSubmitting(false);

            res();
        }, 2000);
    });
};

const App = () => {
    return (
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

            <GenericForm fieldOptions={fieldOptions} onSubmit={submit}>
                {({ fields, isSubmitting }) => (
                    <>
                        <InputWithValidator field={fields.firstname} placeholder="First name"/>
                        <InputWithValidator field={fields.lastname} placeholder="Last name"/>
                        <InputWithValidator field={fields.email} placeholder="Eg. example@email.com"/>
                        <InputWithValidator field={fields.birthdate} type="date"/>
                        
                        <div>
                            <select name={fields.gender.name} defaultValue="null">
                                <option disabled value={"null"}>gender</option>
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select>
                            <ul>
                                {fields.gender.errors.map(error => <li>{error}</li>)}
                            </ul>
                        </div>

                        <InputWithValidator field={fields.image} type="file"/>
                        <InputWithValidator field={fields.password} type="password"/>
                        <InputWithValidator field={fields.passwordConfirm} type="password"/>

                        <input type="submit" value="Submit" disabled={isSubmitting}/>
                        <input type="reset" value="Reset"/>
                    </>
                )}
            </GenericForm>
        </>
    );
};


render(<App/>, document.getElementById("app"));
