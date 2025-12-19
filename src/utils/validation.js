// experimental for now
export function emptyValidationCheck(fields) {
    if (!Array.isArray(fields) || !fields.length) return {
        isEmpty: true,
        errorMessage: 'Invalid type!'
    };
    let isEmpty = false;
    let errorMessage = [];
    console.log(fields)
    for (const key of fields) {
        if (key?.trim() === "") {
            isEmpty = true;
            errorMessage.push(`${key} is required!`);
            break;
        } else {
            isEmpty = false;
        }
    }
    return {
        isEmpty,
        errorMessage
    };
}