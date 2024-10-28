export function getAllErrorMessages(error: any): string[] {
    const messages: string[] = [];
    
    const errorResponse = (error as any).response?.data;
    if (errorResponse.error && typeof errorResponse.error === 'object' && !errorResponse.error.message) {
        for (const key in errorResponse.error) {
            if (Array.isArray(errorResponse.error[key])) {
                messages.push(...errorResponse.error[key]);
            } else if (typeof errorResponse.error[key] === 'string') {
                messages.push(errorResponse.error[key]);
            }
        }
    }

    if (errorResponse.error && errorResponse.error.details) {
        for (const key in errorResponse.error.details) {
            if (Array.isArray(errorResponse.error.details[key])) {
                messages.push(...errorResponse.error.details[key]);
            } else if (typeof errorResponse.error.details[key] === 'string') {
                messages.push(errorResponse.error.details[key]);
            }
        }
    } else if (errorResponse.error && errorResponse.error.message) {
        messages.push(errorResponse.error.message);
    }

    if (messages.length === 0) {
        messages.push("Erro desconhecido");
    }

    return messages;
}
