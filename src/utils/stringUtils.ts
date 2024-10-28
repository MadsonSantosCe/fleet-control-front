import { format } from 'date-fns';

export function formatDate(dateInput: string | Date): string {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    return format(date, 'dd/MM/yyyy HH:mm');
}

export function removeCpfSpecialChars(cpf: string): string {
    return cpf.replace(/[^\d]/g, '');
}

export function formatCpf(cpf: string | number): string {
    const cpfString = cpf.toString().padStart(11, '0');
    return cpfString.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
