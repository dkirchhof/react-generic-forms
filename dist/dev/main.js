(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/builder.tsx":
/*!*************************!*\
  !*** ./src/builder.tsx ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
// type Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => React.ReactElement;
// type Inputs<T> = { [k in keyof T]: Input };
// type FieldNames<T> = { [k in keyof T]: k };
// interface IFormProps<T> extends React.FormHTMLAttributes<HTMLFormElement> {
//     children: (props: { fields: Fields<T>; }) => React.ReactElement;
// }
// export class FormBuilder<T> {
//     // public fieldNames: FieldNames<T>;
//     public readonly form: (props: IFormProps<T>) => React.ReactElement;
//     // public readonly inputs: Inputs<T>;
//     public readonly submit: (props: React.InputHTMLAttributes<HTMLInputElement>) => React.ReactElement;
//     public readonly reset: (props: React.InputHTMLAttributes<HTMLInputElement>) => React.ReactElement;
//     constructor(fieldOptions: Fields<T>) {
//         this.form = props => <Form {...props} onSubmit={(e) => { e.preventDefault(); console.log("submit"); }}/>;
//         this.submit = props => <input type="submit" {...props}/>;
//         this.reset = props => <input type="reset" {...props}/>;
//         // this.fieldNames = Object.keys(fieldOptions).reduce((fieldNames, fieldName) => ({ ...fieldNames, [fieldName]: fieldName }), { } as FieldNames<T>);
//         // const initialValue: Inputs<any> = { };
//         // const reducer = (inputs: Inputs<T>, key: string) => {
//         //     const newInput: Input = props => <InputWithValidator name={key} validationResult={{}}>{props.children}</InputWithValidator>;
//         //     return {
//         //         ...inputs, 
//         //         [key]: newInput
//         //     };
//         // };
//         // this.inputs = Object.keys(fieldOptions).reduce(reducer, initialValue);
//     }
// }
// const formDataToJson = (formData: FormData) => 
//     [...formData.entries()].reduce((json, [key, value]) => ({ ...json, [key]: value }), { });
const validate = (fields, data) => {
    return Object.entries(fields).reduce((result, [key, field]) => {
        const value = data.get(key);
        const validators = field.validators;
        const errors = validators && validators.map(validator => validator(value)).filter(Boolean) || [];
        const newField = {
            ...field,
            value,
            errors
        };
        return {
            ...result,
            [key]: newField,
        };
    }, {});
};
const submit = (fields, updateFields) => (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = validate(fields, formData);
    updateFields(result);
    console.log(result);
};
exports.FFForm = (props) => {
    const [fields, updateFields] = React.useState(props.fields);
    return (React.createElement("form", { onSubmit: submit(fields, updateFields) }, props.children({ fieldOptions: fields })));
};


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const react_dom_1 = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
const builder_1 = __webpack_require__(/*! ./builder */ "./src/builder.tsx");
// const formBuilder = new FormBuilder<IPerson>({ 
//     firstname: { },
//     lastname: { },
//     email: { },
//     birthdate: { },
//     gender: { }
// });
const App = () => (React.createElement(React.Fragment, null,
    React.createElement("style", { dangerouslySetInnerHTML: { __html: `
            form {
                width: 200px;
            }

            input, select, textarea {
                display: block;
                box-sizing: border-box;
                width: 100%;
                margin-bottom: 1em;
            }
        ` } }),
    React.createElement(builder_1.FFForm, { fields: {
            email: {},
            lastname: {},
            birthdate: {},
            firstname: { value: "hallowelt" },
            gender: {}
        } }, props => (React.createElement(React.Fragment, null,
        React.createElement("input", { name: "firstname" }),
        React.createElement("input", { type: "submit", value: "Submit" }))))));
react_dom_1.render(React.createElement(App, null), document.getElementById("app"));


/***/ })

},[["./src/index.tsx","runtime","vendor"]]]);
//# sourceMappingURL=main.js.map