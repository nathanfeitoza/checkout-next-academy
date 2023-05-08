import { LeadPaymentType } from "./contactType";

export interface PaymentData {
  method: LeadPaymentType;
  value: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  address: string;
  card_number?: string;
  card_cvv?: string;
  card_expiration_date?: string;
  card_holder_name?: string;
  installments?: string;
}
