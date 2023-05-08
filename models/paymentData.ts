import { LeadPaymentType } from "../types/contactType";

export interface CardPayment {
  card_number: string;
  card_name: string;
  card_due_date: string;
  card_cvv: string;
  card_installments: string;
}

export interface PaymentData {
  name: string;
  email: string;
  phone_number: string;
  handoutId: string;
  card_payment?: CardPayment,
  pix_payment?: PixPayment,
  bankslip_payment?: BankSlipPayment,
  type: LeadPaymentType;
}

export interface PixPayment {
  img_url: string;
  copy_and_paste_code: string;
  handoutId: string;
}

export interface BankSlipPayment {
  line: string;
  pdf: string;
}
