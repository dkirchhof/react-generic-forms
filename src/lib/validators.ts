import { Fields } from "./generic-form";

export type ValidationFunction<T, F> = (value: F | null | undefined, fields: Fields<T>) => string | null
// export type ValidationFunctionWithParams = (...params: any[]) => ValidationFunction;

// region global
export const required = (): ValidationFunction<any, any> => 
    value => value && value.toString().length ? null : `required`;

export const isSameAs = <T>(otherKey: keyof T): ValidationFunction<T, any> => 
    (value, fields) => value === fields[otherKey].value ? null : `the value should be the same as the value of ${otherKey}`;

export const hasExactValue = <F>(otherValue: F): ValidationFunction<any, F> =>
    value => value === otherValue ? null : `the value should be ${otherValue}`;

// endregion

// region string

export const minLength = (minLength: number): ValidationFunction<any, string> => 
    value => value && value.length >= minLength ? null : `value should be greater than or equal to ${minLength} characters.`; 
    
export const maxLength = (maxLength: number): ValidationFunction<any, string> => 
    value => value && value.length <= maxLength ? null : `value should be less than or equal to ${maxLength} characters.`; 
    
export const simpleMail = (): ValidationFunction<any, string> => 
    value => value && value.match(/\S+@\S+\.\S+/) ? null : `value should be a valid email address`;

// endregion

// region number

export const minValue = (minValue: number): ValidationFunction<any, number> => 
    value => value && value >= minValue ? null : `value should be greater than or equal to ${minValue}.`; 
    
export const maxValue = (maxValue: number): ValidationFunction<any, number> => 
    value => value && value <= maxValue ? null : `value should be less than or equal to ${maxValue}.`; 
    
export const isEven = (): ValidationFunction<any, number> => 
    value => value && value % 2 === 0 ? null : `value should be even.`;
    
export const isOdd = (): ValidationFunction<any, number> => 
    value => value && value % 2 !== 0 ? null : `value should be odd.`;
    
// endregion

// region date

export const isAfter = (date: Date): ValidationFunction<any, Date> => 
    value => value && value > date ? null : `the date should be after ${date.toString()}`;

export const isBefore = (date: Date): ValidationFunction<any, Date> => 
    value => value && value < date ? null : `the date should be before ${date.toString()}`;

// endregion

// region file

export const maxFileSize = (maxSize: number): ValidationFunction<any, File> => 
    value => value ? value.size <= maxSize ? null : `the file size exceededs the maximum size of ${maxSize} bytes` : "required";
    
export const minFileSize = (minSize: number): ValidationFunction<any, File> =>
    value => value ? value.size >= minSize ? null : `the file size deceeds the minimum size of ${minSize} bytes` : "required";

export const fileExtension = (extension: string): ValidationFunction<any, File> =>
    value => value && value.name.endsWith(extension) ? null : `the file should end with ${extension}`;

export const fileExtensions = (extensions: string[]): ValidationFunction<any, File> =>
    value => value && extensions.some(extension => value.name.endsWith(extension)) ? null : `the file should end with one of the following extension ${extensions}`;

// endregion
