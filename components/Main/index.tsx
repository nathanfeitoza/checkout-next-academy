import React, { useEffect, useState } from "react";
import { Layout, Row, Col, notification } from "antd";
import { Container, Header } from "./styles";
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
  title:
    "Apenas 60 atletas participam na seletiva de futebol. Você é um deles?",
  subtitle: "Finalize a inscrição e garanta sua vaga!",
};

const STEPS_COUNT = 2;
const SHOW_PAYMENT_FORM_WITH_PERSONAL_DATA = true;

export const Main: React.FC = () => {
  const [headerTitle, setHeaderTitle] = useState(DEFAULT_TITLE_HEADER.title);
  const [headerSubtitle, setHeaderSubtitle] = useState(
    DEFAULT_TITLE_HEADER.subtitle
  );
  const [actualStep, setActualStep] = useState(1);
  const [actualForm, setActualForm] = useState("personal");
  const [personalData, setPersonalData] = useState<any>({});
  const [paymentSuccefullData, setPaymentSuccefullData] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("credit_card");
  const [leadSent, setLeadSent] = useState(false);

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
        ...(paymentData.type === "credit_card" ? paymentData : {}),
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
      paymentDataSend.method = paymentDataSend.type || "pix";

      keysOnlyNumbers.map(
        (item) => (paymentDataSend[item] = OnlyNumber(paymentDataSend[item]))
      );

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

      const { data } = await pay(paymentDataSend);

      if (
        data?.message === "payment_error" ||
        (data?.data || {})?.status === "not_authorized"
      ) {
        notification.error({
          message: "Erro ao processar pagamento",
          duration: 3.5,
          description:
            "Ocorreu um erro ao realizar o pagamento. Tente novamente mais tarde.",
        });
        return;
      }

      if (!SHOW_PAYMENT_FORM_WITH_PERSONAL_DATA) {
        setHeaderTitle(null as any);
        setHeaderSubtitle(null as any);
        setActualForm(null as any);
      }

      setPaymentSuccefullData({
        ...paymentData,
        handoutId: data.handout?.id || "123",
        pix_payment: {
          img_url: data?.data?.qr_code_url,
          copy_and_paste_code: data?.data?.qr_code,
          handoutId: data.handout?.id || "123",
        },
      } as any);

      if (selectedPayment != "credit_card") {
        setTimeout(() => {
          window.scrollTo({ top: window.pageYOffset * 1.45 });
        }, 250);
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

  const handlePixPaid = () => {
    setHeaderTitle(null as any);
    setHeaderSubtitle(null as any);
    setActualForm(null as any);
  };

  useEffect(() => {
    gTavEvent("event", "conversion", {
      send_to: "AW-319350377/bn4GCPLKrIwYEOnMo5gB",
    });
  }, []);

  return (
    <Layout style={{ background: "#171717" }}>
      <Header>
        <NextHeader
          title={headerTitle}
          subtitle={headerSubtitle}
          actualStep={actualStep}
          stepsCount={STEPS_COUNT}
          onBack={handleOnBack}
        />
      </Header>
      <Container>
        {actualForm === "personal" && (
          <FormPersonalData
            initialData={{ genre: "M" } as any}
            onContinue={onContinuePersonalData}
            useContinue={!SHOW_PAYMENT_FORM_WITH_PERSONAL_DATA}
            onLeadSent={() => setLeadSent(true)}
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
          <CenterLayout>
            <Row style={{ marginTop: "1rem" }} className="input-row">
              <Col span={24}>
                {leadSent && (
                  <DefaultButton
                    loading={loading}
                    onClick={handlePayWithAllForms}
                    id="button-confirm-payment"
                  >
                    {selectedPayment === "credit_card"
                      ? "Confirmar Pagamento →"
                      : "Gerar Código Pix →"}
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
      </Container>
    </Layout>
  );
};
