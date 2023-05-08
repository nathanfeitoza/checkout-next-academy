import { useEffect, useState } from "react";
import { BankSlipPayment, PaymentData, PixPayment } from "../../models/paymentData";
import { Card } from "./Card";
import { Pix } from "./Pix";
import { triggerConfirmPayment } from "../../services/contact";
import { LeadPaymentType } from "../../types/contactType";
import { BankSlip } from "./BankSlip";

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
    if (paymentData.type === LeadPaymentType.CREDIT_CARD) {
      onPaid();
    }
  }, [paymentData])

  if (paymentData.type === LeadPaymentType.CREDIT_CARD || pixPaid) {
    return <Card handoutId={paymentData.handoutId} />;
  }

  if (paymentData.type === LeadPaymentType.PIX) {
    <Pix onPixPaid={handlePixPaid} pixData={paymentData.pix_payment as PixPayment} />
  }

  return <BankSlip bankSlipPayment={paymentData.bankslip_payment as BankSlipPayment} />
};
