type FriendType = {
  friend: string;
};

export enum LeadPaymentType {
  PIX = "pix",
  CREDIT_CARD = "credit_card",
  BANKSLIP = "boleto",
}

export type FriendsType = {
  friends: FriendType[];
};

export type LeadTag = {
  name: string;
  email: string;
  phone: string;
  tag:
    | string[]
    | "Lead_name"
    | "Lead_ic_geroupix"
    | "Lead_ic_cc"
    | "Lead_ic_all"
    | "Lead_buyers";
};

export type LeadPendingPayment = {
  name: string;
  email: string;
  phone: string;
  event_type: string;
  value: number;
  order_id: number;
  payment_type: LeadPaymentType;
  pix_bacen_code?: string;
  pix_due_date?: string;
  pix_qr_code?: string;
  pix_url?: string;
  billet_barcode?: string;
  billet_url?: string;
};

export interface LeadDataStorage extends LeadPendingPayment {
  lead_id?: string;
}
