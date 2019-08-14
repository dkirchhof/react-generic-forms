// export const formDataToJson = <T>(formData: FormData) => {
//     const reducer = (json, [key, value]) => ({
//         ...json,
//         [key]: value,
//     });
 
//     return [...formData.entries()].reduce(reducer, {} as T);
// };

// export const mergeFormData = (a: FormData, b: FormData) => {
//     const merged = new FormData();

//     const loop = (value, key) => merged.set(key, value);

//     a.forEach(loop);
//     b.forEach(loop);

//     return merged;
// };
