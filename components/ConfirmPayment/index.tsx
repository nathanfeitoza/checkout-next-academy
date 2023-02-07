import { useState } from "react";
import { PaymentData, PixPayment } from "../../models/paymentData";
import { Card } from "./Card";
import { Pix } from "./Pix";

export interface ConfirmPaymentProps {
  paymentData: PaymentData;
}

export const ConfirmPayment = ({ paymentData }: ConfirmPaymentProps) => {
  const [pixPaid, setPixPaid] = useState(false);

  const handlePixPaid = () => {
    setPixPaid(true);
  }

  return paymentData.type === "credit_card" || pixPaid ? (
    <Card />
  ) : (
    <Pix onPixPaid={handlePixPaid} pixData={paymentData.pix_payment as PixPayment} />
  );
};
