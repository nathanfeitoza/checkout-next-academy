import { useEffect, useState } from "react";
import { PaymentData, PixPayment } from "../../models/paymentData";
import { Card } from "./Card";
import { Pix } from "./Pix";
import { triggerConfirmPayment } from "../../services/contact";

export interface ConfirmPaymentProps {
  paymentData: PaymentData;
  onPaid: () => void;
}

export const ConfirmPayment = ({ paymentData, onPaid }: ConfirmPaymentProps) => {
  const [pixPaid, setPixPaid] = useState(false);

  const handlePixPaid = async () => {
    setPixPaid(true);
    triggerConfirmPayment().catch((error) => console.log("Error to send confirm payment", error))
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
