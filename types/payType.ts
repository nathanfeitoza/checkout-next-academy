export interface PayResponse {
  data: Pay;
}

export interface Pay {
  data: Data;
  handout: Handout;
  message: string;
}

export interface Data {
  id: string;
  transaction_type: string;
  gateway_id: string;
  amount: number;
  status: string;
  success: boolean;
  installments: number;
  statement_descriptor: string;
  acquirer_name: string;
  acquirer_tid: string;
  acquirer_nsu: string;
  acquirer_message: string;
  acquirer_return_code: string;
  operation_type: string;
  card: Card;
  created_at: string;
  updated_at: string;
  gateway_response: GatewayResponse;
  antifraud_response: AntifraudResponse;
  metadata: Metadata;
  qr_code: string;
  qr_code_url: string;
  expires_at: string;
  pdf: string;
  line: string;
}

export interface Card {
  id: string;
  first_six_digits: string;
  last_four_digits: string;
  brand: string;
  holder_name: string;
  holder_document: string;
  exp_month: number;
  exp_year: number;
  status: string;
  type: string;
  created_at: string;
  updated_at: string;
  billing_address: BillingAddress;
}

export interface BillingAddress {
  zip_code: string;
  city: string;
  state: string;
  country: string;
  line_1: string;
  line_2: string;
}

export interface GatewayResponse {
  code: string;
  errors: any[];
}

export interface AntifraudResponse {}

export interface Metadata {}

export interface Handout {
  value: number;
  athlete_id: number;
  status: string;
  type: string;
  address: Address;
  user_path_model: string;
  product: string;
  company: string;
  updated_at: string;
  created_at: string;
  id: number;
  pix_transaction: PixTransaction;
  athlete: Athlete;
  user: any;
}

export interface Address {
  zip_code: string;
  state: string;
  city: string;
  neighborhood: string;
  number: string;
  street: string;
}

export interface PixTransaction {
  id: string;
  transaction_type: string;
  gateway_id: string;
  amount: number;
  status: string;
  success: boolean;
  installments: number;
  statement_descriptor: string;
  acquirer_name: string;
  acquirer_tid: string;
  acquirer_nsu: string;
  acquirer_message: string;
  acquirer_return_code: string;
  operation_type: string;
  card: Card2;
  created_at: string;
  updated_at: string;
  gateway_response: GatewayResponse2;
  antifraud_response: any[];
  metadata: any[];
}

export interface Card2 {
  id: string;
  first_six_digits: string;
  last_four_digits: string;
  brand: string;
  holder_name: string;
  holder_document: string;
  exp_month: number;
  exp_year: number;
  status: string;
  type: string;
  created_at: string;
  updated_at: string;
  billing_address: BillingAddress2;
}

export interface BillingAddress2 {
  zip_code: string;
  city: string;
  state: string;
  country: string;
  line_1: string;
  line_2: string;
}

export interface GatewayResponse2 {
  code: string;
  errors: any[];
}

export interface Athlete {
  id: number;
  name: string;
  email: string;
  image: any;
  created_at: string;
  updated_at: string;
  status: number;
  avatar: any;
  show_on_listing: boolean;
  university_id: any;
  ready: boolean;
  account_id: any;
  can_see_checklist: number;
  welcome: boolean;
  intercom_contact: boolean;
  next_academy_start_date: any;
  next_academy_seller_id: any;
  next_academy_confirmed: boolean;
  step: number;
  next_academy_end_date: any;
  program_type: any;
  academic_level: any;
  sport_level: any;
  evasion_date: any;
  evasion_reason: any;
  evasion_other: any;
  gamification_ignored: any;
  boarding_date: any;
  checklist_percentage: string;
  new_nextbox: boolean;
  image_card: any;
  next_score: string;
  image_shared_profile: any;
  schooling: string;
  premium: boolean;
  visible: boolean;
  english_code_flag: boolean;
  english_code: any;
  first_login: boolean;
  token: any;
  avatar_url: string;
  next_score_tests: any[];
}
