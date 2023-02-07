export interface CheckPaymentResponse {
  data: CheckPayment
}

export interface CheckPayment {
  handout: Handout
  transactions: Transaction[]
  message: string
}

export interface Handout {
  id: number
  athlete_id: number
  value: number
  status: string
  type: string
  creditcard_transaction: any
  billet_transaction: any
  created_at: string
  updated_at: string
  address: Address
  force: boolean
  user_id: any
  installments: string
  manual_type: any
  description: any
  installment_type: any
  deleted_at: any
  original_account_id: any
  legacy_transaction: any
  erp_integrated: any
  user_path_model: string
  company: string
  seller_id: any
  product: string
  pix_transaction: PixTransaction
  link_checkout_creditcard: any
  credit_card_value: any
}

export interface Address {
  zip_code: string
  state: string
  city: string
  neighborhood: string
  number: string
  street: string
}

export interface PixTransaction {
  qr_code: string
  qr_code_url: string
  expires_at: string
  id: string
  transaction_type: string
  gateway_id: string
  amount: number
  status: string
  success: boolean
  created_at: string
  updated_at: string
  gateway_response: any[]
  antifraud_response: any[]
  metadata: any[]
}

export interface Transaction {
  id: number
  value: string
  status: string
  payment_type: string
  data: Data
  installments: number
  handout_purchase_id: number
  created_at: string
  updated_at: string
  events: any
  billet_compensation: any
}

export interface Data {
  qr_code: string
  qr_code_url: string
  expires_at: string
  id: string
  transaction_type: string
  gateway_id: string
  amount: number
  status: string
  success: boolean
  created_at: string
  updated_at: string
  gateway_response: any[]
  antifraud_response: any[]
  metadata: any[]
}
