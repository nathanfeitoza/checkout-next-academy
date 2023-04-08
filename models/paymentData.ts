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
  type: "credit_card" | "pix";
}

export interface PixPayment {
  img_url: string;
  copy_and_paste_code: string;
  handoutId: string;
}
