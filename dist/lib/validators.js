"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export type ValidationFunctionWithParams = (...params: any[]) => ValidationFunction;
// global
exports.required = () => (formData, key) => formData.get(key).toString().length ? null : `required`;
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
exports.maxFileSize = (maxSize) => (formData, key) => formData.get(key).size <= maxSize ? null : `the file size exceeded the maximum size of ${maxSize} bytes`;
