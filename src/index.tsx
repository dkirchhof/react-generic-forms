import * as React from "react";
import { render } from "react-dom";

import { FFForm } from "./builder";

interface IPerson {
    firstname: string;
    lastname: string;
    email: string;
    birthdate: Date;

    gender: "male" | "female";
}

// const formBuilder = new FormBuilder<IPerson>({ 
//     firstname: { },
//     lastname: { },
//     email: { },
//     birthdate: { },

//     gender: { }
// });

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

        <FFForm<IPerson> 
            fields={{ 
                email: { }, 
                lastname: { }, 
                birthdate: { }, 
                firstname: { value: "hallowelt" }, 
                gender: { }
                }}>
            {props => (
                <>
                    <input name={"firstname"}/>
                    <input type="submit" value="Submit"/>
                </>
            )}
        </FFForm>

         {/* <formBuilder.inputs.firstname>
            <input placeholder="First name"/>
        </formBuilder.inputs.firstname> */}

        {/* <input name={formBuilder.fieldNames.lastname} placeholder="Last name"/>
        <input name={formBuilder.fieldNames.email} placeholder="Eg. example@example.com" type="email"/>
        <input name={formBuilder.fieldNames.birthdate} type="date"/>

        <select name={formBuilder.fieldNames.gender}>
            <option value="male">male</option>
            <option value="female">female</option>
        </select> */}

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
