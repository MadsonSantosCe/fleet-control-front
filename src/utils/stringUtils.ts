import { format } from "date-fns";

export function formatDate(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  return format(date, "dd/MM/yyyy 'às' HH:mm");
}

export function inputDate(dateInput: string | Date): string {
  if (!dateInput) return "";
  const date = new Date(dateInput);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function removeCpfSpecialChars(cpf: string): string {
  return cpf.replace(/[^\d]/g, "");
}

export function formatCpf(cpf: string | number): string {
  const cpfString = cpf.toString().padStart(11, "0");
  return cpfString.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}
