export const formDataToJson = <T>(formData: FormData) => {
    const reducer = (json, [key, value]) => ({
        ...json,
        [key]: value,
    });
 
    return [...formData.entries()].reduce(reducer, {} as T);
};
