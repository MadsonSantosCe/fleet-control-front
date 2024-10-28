import { format } from 'date-fns';

export function formatDate(dateInput: string | Date): string {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    return format(date, 'dd/MM/yyyy HH:mm');
}

export function removeCpfSpecialChars(cpf: string): string {
    return cpf.replace(/[^\d]/g, '');
}