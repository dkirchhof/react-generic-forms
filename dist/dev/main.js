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
const createEmptyResult = (fieldOptions) => {
    return Object.keys(fieldOptions).reduce((result, key) => {
        const newField = {
            name: key,
            value: null,
            errors: [],
        };
        return {
            ...result,
            [key]: newField,
        };
    }, {});
};
const validate = (fieldOptions, data) => {
    return Object.entries(fieldOptions).reduce((result, [key, field]) => {
        const value = data.get(key);
        const validators = field.validators;
        const errors = validators && validators.map(validator => validator(value)).filter(Boolean) || [];
        const newField = {
            name: key,
            value,
            errors
        };
        return {
            ...result,
            [key]: newField,
        };
    }, {});
};
const submit = (fieldOptions, updateFields, callback) => (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fields = validate(fieldOptions, formData);
    updateFields(fields);
    if (callback) {
        callback({
            fields,
            formData,
            isValid: Object.values(fields).every(field => !field.errors.length),
        });
    }
};
exports.GenericForm = ({ children, fieldOptions, onFormSubmit, ...formProps }) => {
    const [result, updateResult] = React.useState(createEmptyResult(fieldOptions));
    return (React.createElement("form", Object.assign({}, formProps, { onSubmit: submit(fieldOptions, updateResult, onFormSubmit) }), children({ fieldOptions, fields: result })));
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
const input_1 = __webpack_require__(/*! ./input */ "./src/input.tsx");
const validation_1 = __webpack_require__(/*! ./validation */ "./src/validation.ts");
const fieldOptions = {
    email: { validators: [validation_1.simpleMail] },
    lastname: { validators: [validation_1.minLength(2), validation_1.maxLength(20)] },
    birthdate: { validators: [validation_1.isBefore(new Date())] },
    firstname: { validators: [validation_1.minLength(2), validation_1.maxLength(20)] },
    gender: {},
    image: { validators: [validation_1.maxFileSize(200)] },
};
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
    React.createElement(builder_1.GenericForm, { fieldOptions: fieldOptions, onFormSubmit: console.log }, props => (React.createElement(React.Fragment, null,
        React.createElement(input_1.InputWithValidator, { field: props.fields.firstname, placeholder: "First name" }),
        React.createElement(input_1.InputWithValidator, { field: props.fields.lastname, placeholder: "Last name" }),
        React.createElement(input_1.InputWithValidator, { field: props.fields.email, placeholder: "Eg. example@email.com" }),
        React.createElement(input_1.InputWithValidator, { field: props.fields.birthdate, type: "date" }),
        React.createElement("select", { name: props.fields.gender.name, defaultValue: "null" },
            React.createElement("option", { disabled: true, value: "null" }, "gender"),
            React.createElement("option", { value: "male" }, "male"),
            React.createElement("option", { value: "female" }, "female")),
        React.createElement(input_1.InputWithValidator, { field: props.fields.image, type: "file" }),
        React.createElement("input", { type: "submit", value: "Submit" }),
        React.createElement("input", { type: "reset", value: "Reset" }))))));
react_dom_1.render(React.createElement(App, null), document.getElementById("app"));


/***/ }),

/***/ "./src/input.tsx":
/*!***********************!*\
  !*** ./src/input.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
;
exports.InputWithValidator = ({ field, ...inputProps }) => (React.createElement("div", null,
    React.createElement("input", Object.assign({}, inputProps, { name: field.name, style: { borderColor: field.errors.length ? "red" : "gray" } })),
    React.createElement("ul", null, field.errors.map(error => React.createElement("li", null, error)))));


/***/ }),

/***/ "./src/validation.ts":
/*!***************************!*\
  !*** ./src/validation.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// export type ValidationFunctionWithParams = (...params: any[]) => ValidationFunction;
// string
exports.minLength = (minLength) => (value) => value.length >= minLength ? null : `value should be greater than or equal to ${minLength} characters.`;
exports.maxLength = (maxLength) => (value) => value.length <= maxLength ? null : `value should be less than or equal to ${maxLength} characters.`;
exports.simpleMail = (value) => value.match(/\S+@\S+\.\S+/) ? null : `please enter a valid email address`;
// number
exports.minValue = (minValue) => (value) => Number(value) >= minValue ? null : `value should be greater than or equal to ${minValue}.`;
exports.maxValue = (maxValue) => (value) => Number(value) <= maxValue ? null : `value should be less than or equal to ${maxValue}.`;
exports.isEven = (value) => Number(value) % 2 === 0 ? null : `value should be even.`;
exports.isOdd = (value) => Number(value) % 2 !== 0 ? null : `value should be odd.`;
// date
exports.isBefore = (date) => (value) => new Date(value) < date ? null : `the date should be before ${date.toString()}`;
// file
exports.maxFileSize = (maxSize) => (value) => value.size <= maxSize ? null : `the file size exceeded the maximum size of ${maxSize} bytes`;


/***/ })

},[["./src/index.tsx","runtime","vendor"]]]);
//# sourceMappingURL=main.js.map