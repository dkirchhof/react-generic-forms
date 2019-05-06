export type ValidationFunction = (formData: FormData, key: string) => string | null
// export type ValidationFunctionWithParams = (...params: any[]) => ValidationFunction;

// global
export const required = () => (formData: FormData, key: string) => 
    formData.get(key) !== null ? null : `value shouldn't be null`;

export const isSame = <T>(otherKey: keyof T) => (formData: FormData, key: string) => 
    formData.get(key) === formData.get(otherKey.toString()) ? null : `the value should be the same as the value of ${otherKey}`;

// string
export const minLength = (minLength: number) => (formData: FormData, key: string) =>
    (formData.get(key) as string).length >= minLength ? null : `value should be greater than or equal to ${minLength} characters.`; 
    
export const maxLength = (maxLength: number) => (formData: FormData, key: string) =>
    (formData.get(key) as string).length <= maxLength ? null : `value should be less than or equal to ${maxLength} characters.`; 
    
export const simpleMail = () => (formData: FormData, key: string) =>
    (formData.get(key) as string).match(/\S+@\S+\.\S+/) ? null : `please enter a valid email address`;
    
// number
export const minValue = (minValue: number) => (formData: FormData, key: string) =>
    Number(formData.get(key)) >= minValue ? null : `value should be greater than or equal to ${minValue}.`; 
    
export const maxValue = (maxValue: number) => (formData: FormData, key: string) =>
    Number(formData.get(key)) <= maxValue ? null : `value should be less than or equal to ${maxValue}.`; 
    
export const isEven = (formData: FormData, key: string) =>
    Number(formData.get(key)) % 2 === 0 ? null : `value should be even.`;
    
export const isOdd = (formData: FormData, key: string) =>
    Number(formData.get(key)) % 2 !== 0 ? null : `value should be odd.`;
    
// date
export const isBefore = (date: Date) => (formData: FormData, key: string) =>
    new Date(formData.get(key) as string) < date ? null : `the date should be before ${date.toString()}`;
    
// file
export const maxFileSize = (maxSize: number) => (formData: FormData, key: string) =>
    (formData.get(key) as File).size <= maxSize ? null : `the file size exceeded the maximum size of ${maxSize} bytes`;
    
