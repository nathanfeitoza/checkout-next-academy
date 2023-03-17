import { useEffect, useState } from "react";
import { PaymentData, PixPayment } from "../../models/paymentData";
import { triggerlead } from "../../services/contact";
import { Card } from "./Card";
import { Pix } from "./Pix";

export interface ConfirmPaymentProps {
  paymentData: PaymentData;
  onPaid: () => void;
}

export const ConfirmPayment = ({ paymentData, onPaid }: ConfirmPaymentProps) => {
  const [pixPaid, setPixPaid] = useState(false);

  const handlePixPaid = async () => {
    setPixPaid(true);
    onPaid();
    await triggerlead({
      name: paymentData.name,
      phone: paymentData.phone_number,
      email: paymentData.email,
      tag: 'Lead_buyers'
    });
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
