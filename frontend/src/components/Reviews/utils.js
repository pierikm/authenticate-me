export const reviewValidator = (content, setErrors) => {
    const errors = [];
    if (content.length > 1000) errors.push("Cannot be more than 1000 characters.")
    setErrors(errors);
}
