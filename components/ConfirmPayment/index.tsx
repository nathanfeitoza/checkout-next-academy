import { useEffect, useState } from "react";
import { PaymentData, PixPayment } from "../../models/paymentData";
import { Card } from "./Card";
import { Pix } from "./Pix";

export interface ConfirmPaymentProps {
  paymentData: PaymentData;
  onPaid: () => void;
}

export const ConfirmPayment = ({ paymentData, onPaid }: ConfirmPaymentProps) => {
  const [pixPaid, setPixPaid] = useState(false);

  const handlePixPaid = () => {
    setPixPaid(true);
    onPaid();
  }

  useEffect(() => {
    if (paymentData.type === "credit_card") {
      onPaid();
    }
  }, [paymentData])

  return paymentData.type === "credit_card" || pixPaid ? (
    <Card handoutId={paymentData.handoutId} />
  ) : (
    <Pix onPixPaid={handlePixPaid} pixData={paymentData.pix_payment as PixPayment} />
  );
};
