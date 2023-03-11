import { PaymentData } from "../models/paymentData";
import { CheckPaymentResponse } from "../types/checkPaymentType";
import { PayResponse } from "../types/payType";
import api from "./api";

export const pay = async (data: PaymentData): Promise<PayResponse> => {
  return api.post("/checkout_unbk", data);
};

export const checkPayment = async (handoutId: string): Promise<CheckPaymentResponse> => {
  return api.get(`/unbk_handout?handoutId=${handoutId}`);
}
