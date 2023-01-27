import axios from "axios";
import { PaymentData } from "../models/paymentData";

export const pay = (data: PaymentData) => {
  return axios.post("https://nextacademy.com.br/api/checkout_unbk", data);
};
