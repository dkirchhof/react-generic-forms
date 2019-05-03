export type ValidationFunction = (value: string) => string | null
// export type ValidationFunctionWithParams = (...params: any[]) => ValidationFunction;

// string
export const minLength = (minLength: number) => (value: string) => value.length >= minLength ? null : `value should be greater than or equal to ${minLength} characters.`; 
export const maxLength = (maxLength: number) => (value: string) => value.length <= maxLength ? null : `value should be less than or equal to ${maxLength} characters.`; 
export const simpleMail = (value: string) => value.match(/\S+@\S+\.\S+/) ? null : `please enter a valid email address`;

// number
export const minValue = (minValue: number) => (value: string) => Number(value) >= minValue ? null : `value should be greater than or equal to ${minValue}.`; 
export const maxValue = (maxValue: number) => (value: string) => Number(value) <= maxValue ? null : `value should be less than or equal to ${maxValue}.`; 
export const isEven = (value: string) => Number(value) % 2 === 0 ? null : `value should be even.`;
export const isOdd = (value: string) => Number(value) % 2 !== 0 ? null : `value should be odd.`;

// date
export const isBefore = (date: Date) => (value: string) => new Date(value) < date ? null : `the date should be before ${date.toString()}`;