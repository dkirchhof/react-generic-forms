"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formDataToJson = (formData) => {
    const reducer = (json, [key, value]) => ({
        ...json,
        [key]: value,
    });
    return [...formData.entries()].reduce(reducer, {});
};
