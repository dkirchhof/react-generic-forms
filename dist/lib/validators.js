"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export type ValidationFunctionWithParams = (...params: any[]) => ValidationFunction;
// global
exports.required = () => (formData, key) => {
    const value = formData.get(key);
    if (value instanceof File) {
        if (value.size === 0) {
            return "required";
        }
    }
    if (typeof value === "string") {
        if (value.length === 0) {
            return "required";
        }
    }
    return null;
};
exports.isSame = (otherKey) => (formData, key) => formData.get(key) === formData.get(otherKey.toString()) ? null : `the value should be the same as the value of ${otherKey}`;
// string
exports.minLength = (minLength) => (formData, key) => formData.get(key).length >= minLength ? null : `value should be greater than or equal to ${minLength} characters.`;
exports.maxLength = (maxLength) => (formData, key) => formData.get(key).length <= maxLength ? null : `value should be less than or equal to ${maxLength} characters.`;
exports.simpleMail = () => (formData, key) => formData.get(key).match(/\S+@\S+\.\S+/) ? null : `please enter a valid email address`;
// number
exports.minValue = (minValue) => (formData, key) => Number(formData.get(key)) >= minValue ? null : `value should be greater than or equal to ${minValue}.`;
exports.maxValue = (maxValue) => (formData, key) => Number(formData.get(key)) <= maxValue ? null : `value should be less than or equal to ${maxValue}.`;
exports.isEven = () => (formData, key) => Number(formData.get(key)) % 2 === 0 ? null : `value should be even.`;
exports.isOdd = () => (formData, key) => Number(formData.get(key)) % 2 !== 0 ? null : `value should be odd.`;
// date
exports.isBefore = (date) => (formData, key) => new Date(formData.get(key)) < date ? null : `the date should be before ${date.toString()}`;
// file
exports.maxFileSize = (maxSize) => (formData, key) => formData.get(key).size <= maxSize ? null : `the file size exceededs the maximum size of ${maxSize} bytes`;
exports.minFileSize = (minSize) => (formData, key) => formData.get(key).size >= minSize ? null : `the file size deceeds the minimum size of ${minSize} bytes`;
exports.fileExtension = (extension) => (formData, key) => formData.get(key).name.endsWith(extension) ? null : `the file should end with ${extension}`;
exports.fileExtensions = (extensions) => (formData, key) => {
    const fileName = formData.get(key).name;
    return extensions.some(extension => fileName.endsWith(extension)) ? null : `the file should end with one of the following extension ${extensions}`;
};
