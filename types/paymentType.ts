export interface PaymentData {
  method: 'pix' | 'credit_card';
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
