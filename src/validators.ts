import { Fields } from "./GenericForm";

export type ValidationFunction<FieldValueType = any, T = any> = (value: FieldValueType | null | undefined, fields: Fields<T>) => string | null
// export type ValidationFunctionWithParams = (...params: any[]) => ValidationFunction;

// region global
export const required = (): ValidationFunction<any, any> => 
    value => value && value.toString().length ? null : `required`;

export const isSameAs = <T>(otherKey: keyof T): ValidationFunction<any, T> => 
    (value, fields) => value === fields[otherKey].value ? null : `the value should be the same as the value of ${otherKey}`;

export const hasExactValue = <FieldValueType>(otherValue: FieldValueType): ValidationFunction<FieldValueType> =>
    value => value === otherValue ? null : `the value should be ${otherValue}`;

// endregion

// region string

export const minLength = (minLength: number): ValidationFunction<string> => 
    value => value && value.length >= minLength ? null : `value should be greater than or equal to ${minLength} characters.`; 
    
export const maxLength = (maxLength: number): ValidationFunction<string> => 
    value => value && value.length <= maxLength ? null : `value should be less than or equal to ${maxLength} characters.`; 
    
export const simpleMail = (): ValidationFunction<string> => 
    value => value && value.match(/\S+@\S+\.\S+/) ? null : `value should be a valid email address`;

// endregion

// region number

export const minValue = (minValue: number): ValidationFunction<number> => 
    value => value && value >= minValue ? null : `value should be greater than or equal to ${minValue}.`; 
    
export const maxValue = (maxValue: number): ValidationFunction<number> => 
    value => value && value <= maxValue ? null : `value should be less than or equal to ${maxValue}.`; 
    
export const isEven = (): ValidationFunction<number> => 
    value => value && value % 2 === 0 ? null : `value should be even.`;
    
export const isOdd = (): ValidationFunction<number> => 
    value => value && value % 2 !== 0 ? null : `value should be odd.`;
    
// endregion

// region date

export const isAfter = (date: Date): ValidationFunction<Date> => 
    value => value && value > date ? null : `the date should be after ${date.toString()}`;

export const isBefore = (date: Date): ValidationFunction<Date> => 
    value => value && value < date ? null : `the date should be before ${date.toString()}`;

// endregion

// region file

export const maxFileSize = (maxSize: number): ValidationFunction<File> => 
    value => value ? value.size <= maxSize ? null : `the file size exceededs the maximum size of ${maxSize} bytes` : "required";
    
export const minFileSize = (minSize: number): ValidationFunction<File> =>
    value => value ? value.size >= minSize ? null : `the file size deceeds the minimum size of ${minSize} bytes` : "required";

export const fileExtension = (extension: string): ValidationFunction<File> =>
    value => value && value.name.endsWith(extension) ? null : `the file should end with ${extension}`;

export const fileExtensions = (extensions: string[]): ValidationFunction<File> =>
    value => value && extensions.some(extension => value.name.endsWith(extension)) ? null : `the file should end with one of the following extension ${extensions}`;

// endregion
