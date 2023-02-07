import axios from "axios";
import { PaymentData } from "../models/paymentData";
import { CheckPaymentResponse } from "../types/checkPaymentType";
import { PayResponse } from "../types/payType";

const axiosInstance = axios.create({
  baseURL: "https://nextacademy.com.br/api"
})

export const pay = async (data: PaymentData): Promise<PayResponse> => {
  return axiosInstance.post("/checkout_unbk", data);
};

export const checkPayment = async (handoutId: string): Promise<CheckPaymentResponse> => {
  return axiosInstance.get(`/unbk_handout?handoutId=${handoutId}`);
}
