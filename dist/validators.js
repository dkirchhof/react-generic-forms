"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export type ValidationFunctionWithParams = (...params: any[]) => ValidationFunction;
// region global
exports.required = () => value => value && value.toString().length ? null : `required`;
exports.isSameAs = (otherKey) => (value, fields) => value === fields[otherKey].value ? null : `the value should be the same as the value of ${otherKey}`;
exports.hasExactValue = (otherValue) => value => value === otherValue ? null : `the value should be ${otherValue}`;
// endregion
// region string
exports.minLength = (minLength) => value => value && value.length >= minLength ? null : `value should be greater than or equal to ${minLength} characters.`;
exports.maxLength = (maxLength) => value => value && value.length <= maxLength ? null : `value should be less than or equal to ${maxLength} characters.`;
exports.simpleMail = () => value => value && value.match(/\S+@\S+\.\S+/) ? null : `value should be a valid email address`;
// endregion
// region number
exports.minValue = (minValue) => value => value && value >= minValue ? null : `value should be greater than or equal to ${minValue}.`;
exports.maxValue = (maxValue) => value => value && value <= maxValue ? null : `value should be less than or equal to ${maxValue}.`;
exports.isEven = () => value => value && value % 2 === 0 ? null : `value should be even.`;
exports.isOdd = () => value => value && value % 2 !== 0 ? null : `value should be odd.`;
// endregion
// region date
exports.isAfter = (date) => value => value && value > date ? null : `the date should be after ${date.toString()}`;
exports.isBefore = (date) => value => value && value < date ? null : `the date should be before ${date.toString()}`;
// endregion
// region file
exports.maxFileSize = (maxSize) => value => value ? value.size <= maxSize ? null : `the file size exceededs the maximum size of ${maxSize} bytes` : "required";
exports.minFileSize = (minSize) => value => value ? value.size >= minSize ? null : `the file size deceeds the minimum size of ${minSize} bytes` : "required";
exports.fileExtension = (extension) => value => value && value.name.endsWith(extension) ? null : `the file should end with ${extension}`;
exports.fileExtensions = (extensions) => value => value && extensions.some(extension => value.name.endsWith(extension)) ? null : `the file should end with one of the following extension ${extensions}`;
// endregion
