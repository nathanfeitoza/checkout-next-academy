export interface CardPayment {
  card_number: string;
  card_name: string;
  card_due_date: string;
  card_cvv: string;
  card_installments: string;
}

export interface PixPayment {
  img_url: string;
  copy_and_paste_code: string;
}

export interface PaymentData {
  card_payment?: CardPayment,
  pix_payment?: PixPayment,
  type: "credit_card" | "pix";
}