import * as React from "react";
import { render } from "react-dom";

import { GenericForm, FieldOptions } from "../lib/GenericForm";
import { InputWithValidator } from "./input";
import { minLength, maxLength, simpleMail, isBefore, maxFileSize, isSameAs } from "../lib/validators";

interface IPerson {
    firstname: string;
    // lastname: string;
    // email: string;
    // birthdate: Date;
    // gender: "male" | "female";
    // image: File;
    // password: string;
    // passwordConfirm: string;
}

const fieldOptions: FieldOptions<IPerson> = { 
    // email: { validators: [(simpleMail())] }, 
    // lastname: { validators: [minLength(2), maxLength(20)] }, 
    // birthdate: { validators: [isBefore(new Date())] }, 
    firstname: { validators: [minLength(2), maxLength(20)] }, 
    // gender: { },
    // image: { validators: [maxFileSize(200)] },
    // password: { validators: [minLength(6)] },
    // passwordConfirm: { validators: [isSameAs("password")] },
};

const initialValues: IPerson = {
    // birthdate: new Date(),
    // email: "",
    firstname: "Daniel",
    // gender: "male",
    // image: null as any,
    // lastname: "",
    // password: "",
    // passwordConfirm: "",
}

const apiTest = (values: IPerson) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res("foo bar");
            // rej("500");
        }, 2000);
    });
}

const submit = async (event: any, values: IPerson) => {
    // console.log(values);

    try {
        const result = await apiTest(values);
        console.log("result", result);
    } catch (e) {
        console.log("error", e);
    }
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

            <GenericForm fieldOptions={fieldOptions} initialValues={initialValues} onSubmit={submit}>
                {({ fields, isSubmitting }) => (
                    <>
                        <InputWithValidator field={fields.firstname} placeholder="First name"/>
                        {/* <InputWithValidator field={fields.lastname} placeholder="Last name"/>
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
                        <InputWithValidator field={fields.passwordConfirm} type="password"/> */}

                        <input type="submit" value="Submit" disabled={isSubmitting}/>
                        <input type="reset" value="Reset"/>
                    </>
                )}
            </GenericForm>
        </>
    );
};


render(<App/>, document.getElementById("app"));
