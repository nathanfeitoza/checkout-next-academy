import { PaymentData, PixPayment } from "../../models/paymentData";
import { Card } from "./Card";
import { Pix } from "./Pix";

export interface ConfirmPaymentProps {
  paymentData: PaymentData;
}

export const ConfirmPayment = ({ paymentData }: ConfirmPaymentProps) => {
  return paymentData.type === "credit_card" ? (
    <Card />
  ) : (
    <Pix pixData={paymentData.pix_payment as PixPayment} />
  );
};
