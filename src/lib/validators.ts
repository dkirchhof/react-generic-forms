export type ValidationFunction = (formData: FormData, key: string) => string | null
// export type ValidationFunctionWithParams = (...params: any[]) => ValidationFunction;

// global
export const required = (): ValidationFunction => 
    (formData: FormData, key: string) => {
        const value = formData.get(key);
        
        if(value instanceof File) {
            if(value.size === 0) {
                return "required";
            }
        }

        if(typeof value === "string") {
            if(value.length === 0) {
                return "required";
            }
        }

        return null;
    };

export const isSame = <T>(otherKey: keyof T): ValidationFunction => 
    (formData: FormData, key: string) => 
        formData.get(key) === formData.get(otherKey.toString()) ? null : `the value should be the same as the value of ${otherKey}`;

// string
export const minLength = (minLength: number): ValidationFunction => 
    (formData: FormData, key: string) =>
        (formData.get(key) as string).length >= minLength ? null : `value should be greater than or equal to ${minLength} characters.`; 
    
export const maxLength = (maxLength: number): ValidationFunction => 
    (formData: FormData, key: string) =>
        (formData.get(key) as string).length <= maxLength ? null : `value should be less than or equal to ${maxLength} characters.`; 
    
export const simpleMail = (): ValidationFunction => 
    (formData: FormData, key: string) =>
        (formData.get(key) as string).match(/\S+@\S+\.\S+/) ? null : `please enter a valid email address`;
    
// number
export const minValue = (minValue: number): ValidationFunction => 
    (formData: FormData, key: string) =>
        Number(formData.get(key)) >= minValue ? null : `value should be greater than or equal to ${minValue}.`; 
    
export const maxValue = (maxValue: number): ValidationFunction => 
    (formData: FormData, key: string) =>
        Number(formData.get(key)) <= maxValue ? null : `value should be less than or equal to ${maxValue}.`; 
    
export const isEven = (): ValidationFunction => 
    (formData: FormData, key: string) =>
        Number(formData.get(key)) % 2 === 0 ? null : `value should be even.`;
    
export const isOdd = (): ValidationFunction => 
    (formData: FormData, key: string) =>
        Number(formData.get(key)) % 2 !== 0 ? null : `value should be odd.`;
    
// date
export const isBefore = (date: Date): ValidationFunction => 
    (formData: FormData, key: string) =>
        new Date(formData.get(key) as string) < date ? null : `the date should be before ${date.toString()}`;
    
// file
export const maxFileSize = (maxSize: number): ValidationFunction => 
    (formData: FormData, key: string) =>
        (formData.get(key) as File).size <= maxSize ? null : `the file size exceededs the maximum size of ${maxSize} bytes`;
    
export const minFileSize = (minSize: number): ValidationFunction =>
    (formData: FormData, key: string) =>
        (formData.get(key) as File).size >= minSize ? null : `the file size deceeds the minimum size of ${minSize} bytes`;

export const fileExtension = (extension: string): ValidationFunction =>
    (formData: FormData, key: string) => 
        (formData.get(key) as File).name.endsWith(extension) ? null : `the file should end with ${extension}`;

export const fileExtensions = (extensions: string[]): ValidationFunction =>
    (formData: FormData, key: string) => {
        const fileName = (formData.get(key) as File).name;

        return extensions.some(extension => fileName.endsWith(extension)) ? null : `the file should end with one of the following extension ${extensions}`;
    };
