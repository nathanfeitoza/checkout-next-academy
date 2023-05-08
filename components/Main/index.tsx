import React, { useCallback, useEffect, useState } from "react";
import { Layout, Row, Col, notification } from "antd";
import { ColPersonal, ColPersonal2, ContainerInitial, Header } from "./styles";
import { NextHeader } from "../NextHeader";
import { FormPersonalData } from "../FormPersonalData";
import { PersonalData } from "../../models/personalData";
import { PaymentData } from "../../models/paymentData";
import { PaymentSelection } from "../PaymentSelection";
import { ConfirmPayment } from "../ConfirmPayment";
import { PRODUCT_VALUE } from "../../constants";
import { pay } from "../../services/payment";
import { ExtractFields } from "../../utils/extractFields";
import { OnlyNumber } from "../../utils/onlyNumber";
import { DefaultButton } from "../../styles/Global";
import { CenterLayout } from "../CenterLayout";
import { gTavEvent } from "../../utils/gTagEvent";
import { triggerConfirmPayment, triggerPendingPayment } from "../../services/contact";
import { LeadPaymentType, LeadPendingPayment } from "../../types/contactType";
import { RowInitial } from "../NextHeader/styles";
import Image from "next/image";
import { EventInformation } from "../EventInformation";

/*
Payment sucessulldata test

{
    "installments": 1,
    "card_holder_name": "APRO",
    "card_number": "4000000000000010",
    "card_expiration_date": "01/25",
    "card_cvv": "123",
    "type": "credit_card",
    "handoutId": "46254",
    "pix_payment": {
        "handoutId": 46254
    }
}
*/

const DEFAULT_TITLE_HEADER = {
  title: "Seletiva Next Academy",
  subtitle: "Falta pouco pra você dar um show em campo.",
  description: "Preencha os dados abaixo para confirmar sua reserva. "
};

const SHOW_PAYMENT_FORM_WITH_PERSONAL_DATA = true;

export const Main: React.FC = () => {
  const [actualStep, setActualStep] = useState(1);
  const [actualForm, setActualForm] = useState("personal");
  const [personalData, setPersonalData] = useState<any>({});
  const [paymentSuccefullData, setPaymentSuccefullData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("credit_card");
  const [leadSent, setLeadSent] = useState(false);
  const [leadData, setLeadData] = useState<PersonalData>({} as PersonalData);

  const onContinuePersonalData = (personalData: PersonalData) => {
    if (!SHOW_PAYMENT_FORM_WITH_PERSONAL_DATA) {
      setActualForm("payment");
    }

    setActualStep(actualStep + 1);
    setPersonalData(personalData);

    if (SHOW_PAYMENT_FORM_WITH_PERSONAL_DATA) {
      setTimeout(() => {
        (document as any).querySelector("#button-confirm-payment").click();
      }, 100);
    }
  };

  const onPayment = async (paymentData: PaymentData) => {
    setLoading(true);

    try {
      const keysOnlyNumbers = [
        "phone_number",
        "cpf",
        "card_number",
        "card_cvv",
        "zipcode",
      ];
      const paymentDataSend: any = {
        ...ExtractFields(personalData, [
          "name",
          "seletiva",
          "phone_number",
          "email",
          "cpf",
          "neighborhood",
          "address",
          "number",
          "complement",
          "zipcode",
          "state",
          "city",
        ]),
        ...(paymentData.type === LeadPaymentType.CREDIT_CARD || paymentData.type === LeadPaymentType.BANKSLIP ? paymentData : {}),
        cpf: "75765773044",
        neighborhood: "Jardim São Paulo",
        address: "Rua Barra de São João",
        number: "01",
        complement: "Sem",
        zipcode: "02040070",
        state: "SP",
        city: "São Paulo",
      };
      paymentDataSend.value = PRODUCT_VALUE;
      console.log('paymentDataSend', JSON.parse(JSON.stringify(paymentDataSend)), JSON.parse(JSON.stringify(paymentData)))
      paymentDataSend.method = paymentDataSend.type || LeadPaymentType.PIX;

      keysOnlyNumbers.map(
        (item) => (paymentDataSend[item] = OnlyNumber(paymentDataSend[item]))
      );
      const realPhoneNumber = paymentDataSend.phone_number;
      paymentDataSend.phone_area_code = paymentDataSend.phone_number?.slice(
        0,
        2
      );
      paymentDataSend.phone_number = paymentDataSend.phone_number?.slice(
        2,
        paymentDataSend.phone_number.length
      );
      paymentDataSend.card_holder_cpf = paymentDataSend.cpf;

      if (paymentDataSend.card_expiration_date) {
        const [card_expiration_month, card_expiration_year] =
          paymentDataSend.card_expiration_date.split("/");

        paymentDataSend.card_expiration_year = card_expiration_year;
        paymentDataSend.card_expiration_month = card_expiration_month;

        delete paymentDataSend.card_expiration_date;
      }

      delete paymentDataSend.type;

      const paymentType: any = {
        [LeadPaymentType.CREDIT_CARD]: LeadPaymentType.CREDIT_CARD,
        [LeadPaymentType.PIX]: LeadPaymentType.PIX,
        [LeadPaymentType.BANKSLIP]: LeadPaymentType.BANKSLIP,
      }

      const leadData: LeadPendingPayment = {
        name: paymentDataSend.name,
        phone: realPhoneNumber,
        email: paymentDataSend.email,
        payment_type: paymentType[paymentDataSend.method],
        event_type: "pagamento_pendente",
        value: PRODUCT_VALUE,
        order_id: (new Date()).getTime()
      }
      
      if (leadData.payment_type === LeadPaymentType.CREDIT_CARD) {
        triggerPendingPayment(leadData).catch((error) => console.log('Erro ao criar pagamento pendente', error));
      }

      const { data } = await pay(paymentDataSend);

      if (leadData.payment_type === LeadPaymentType.PIX) {
        triggerPendingPayment({
          ...leadData,
          pix_bacen_code: data?.data?.qr_code,
          pix_qr_code: data?.data?.qr_code,
          pix_url: data?.data?.qr_code_url,
          pix_due_date: data?.data?.expires_at,
        }).catch((error) => console.log('Erro ao criar pagamento pendente', error));
      }

      if (leadData.payment_type === LeadPaymentType.BANKSLIP) {
        triggerPendingPayment({
          ...leadData,
          billet_url: data?.data?.pdf,
          billet_barcode: data?.data?.line,
        }).catch((error) => console.log('Erro ao criar pagamento pendente', error));
      }

      const CARD_ERRORS_STATUS = ["not_authorized","failed"]

      if (
        data?.message === "payment_error" ||
        CARD_ERRORS_STATUS.includes((data?.data || {})?.status)
      ) {
        notification.error({
          message: "Erro ao processar pagamento",
          duration: 3.5,
          description:
            "Ocorreu um erro ao realizar o pagamento. Tente novamente mais tarde.",
        });
        return;
      }


      setPaymentSuccefullData({
        ...paymentData,
        handoutId: data.handout?.id || "123",
        pix_payment: {
          img_url: data?.data?.qr_code_url,
          copy_and_paste_code: data?.data?.qr_code,
          handoutId: data.handout?.id || "123",
        },
        bankslip_payment: {
          line: data?.data?.line,
          pdf: data?.data?.pdf,
        }
      } as any);

      if (selectedPayment === LeadPaymentType.PIX) {
        setTimeout(() => {
          window.scrollTo({ top: window.pageYOffset * 1.45 });
        }, 250);

        return;
      }

      if (selectedPayment === LeadPaymentType.CREDIT_CARD) {
        triggerConfirmPayment(leadData).catch((error) => console.log("Error to send confirmation payment", error));
      }

    } catch (err) {
      console.log(err);
      notification.error({
        message: "Erro ao processar pagamento",
        duration: 3.5,
        description:
          "Ocorreu um erro ao realizar o pagamento. Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOnBack = (step: number) => {
    setActualForm("personal");
    setActualStep(step - 1);
  };

  const handlePayWithAllForms = () => {
    (document as any).querySelector("#button-continue-form-data").click();
  };

  const handlePixPaid = async () => {
  };

  const getButtonName = useCallback(() => {
    const buttonName: any = {
      credit_card: "Confirmar Pagamento →",
      pix: "Gerar Código Pix →",
      boleto: "Confirmar Pagamento com boleto →"
    }

    return buttonName[selectedPayment];
  }, [selectedPayment])

  const onLeadSent = (data: PersonalData) => {
    setLeadSent(true);
    setLeadData(data);
  }

  useEffect(() => {
    gTavEvent("event", "conversion", {
      send_to: "AW-319350377/bn4GCPLKrIwYEOnMo5gB",
    });
  }, []);

  return (
    <Layout style={{ background: "#171717" }}>
      <ContainerInitial>
        <div>
          <RowInitial>
            <Col span={12} style={{ paddingLeft: "15px", paddingBottom: "25px" }} >
              <Image
                alt="Logo Next Academy"
                width={119}
                height={43}
                src="/checkout-unbk/assets/logo-next.png"
              />
            </Col>
          </RowInitial>
          <Header>
            <NextHeader
              title={DEFAULT_TITLE_HEADER.title}
              subtitle={DEFAULT_TITLE_HEADER.subtitle}
              description={DEFAULT_TITLE_HEADER.description}
              actualStep={actualStep}
              onBack={handleOnBack}
            />
          </Header>
        </div>

        <Row style={{ marginBottom: "4rem" }}>
          <ColPersonal span={12}>
            {actualForm === "personal" && (
              <FormPersonalData
                initialData={{ genre: "M" } as any}
                onContinue={onContinuePersonalData}
                useContinue={!SHOW_PAYMENT_FORM_WITH_PERSONAL_DATA}
                onLeadSent={onLeadSent}
              />
            )}

            {(actualForm === "payment" || SHOW_PAYMENT_FORM_WITH_PERSONAL_DATA) &&
              actualForm !== null && (
                <PaymentSelection
                  useContinue={!SHOW_PAYMENT_FORM_WITH_PERSONAL_DATA}
                  loading={loading}
                  onPay={onPayment}
                  onSelectPayment={(payment: string) => setSelectedPayment(payment)}
                  leadSent={leadSent}
                />
              )}

            {SHOW_PAYMENT_FORM_WITH_PERSONAL_DATA && !paymentSuccefullData && (
              <CenterLayout span={24} offset={0}>
                <Row style={{ marginTop: "1rem" }} className="input-row">
                  <Col span={24}>
                    {leadSent && (
                      <DefaultButton
                        loading={loading}
                        onClick={handlePayWithAllForms}
                        id="button-confirm-payment"
                      >
                        {getButtonName()}
                      </DefaultButton>
                    )}
                  </Col>
                </Row>
              </CenterLayout>
            )}

            {paymentSuccefullData && (
              <ConfirmPayment
                onPaid={handlePixPaid}
                paymentData={paymentSuccefullData}
              />
            )}
          </ColPersonal>

          <ColPersonal2 span={12}>
            <EventInformation position={leadData?.position} eventSelected={leadData?.seletiva} />
          </ColPersonal2>
        </Row>

      </ContainerInitial>
    </Layout>
  );
};
