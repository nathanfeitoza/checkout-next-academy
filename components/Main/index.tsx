import React, { useState } from "react";
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

const { Content, Footer } = Layout;

const DEFAULT_TITLE_HEADER = {
  title: "Falta pouco pra você dar um show em campo.",
  subtitle: "Preencha seus dados pessoais para continuar",
};

const STEPS_COUNT = 2;

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

  const onContinuePersonalData = (personalData: PersonalData) => {
    setActualForm("payment");
    setActualStep(actualStep + 1);
    setPersonalData(personalData);
  };

  const onPayment = async (paymentData: PaymentData) => {
    setLoading(true);

    try {
      const keysOnlyNumbers = ["phone_number", "cpf", "card_number", "card_cvv", "zipcode"]
      const paymentDataSend: any = {
        ...ExtractFields(personalData, [
          "name",
          "phone_number",
          "email",
          "cpf",
          "neighborhood",
          "address",
          "number",
          "complement",
          "zipcode",
          "state",
          "city"
        ]),
        ...(paymentData.type === "credit_card" ? paymentData : {}),
      };
      paymentDataSend.value = PRODUCT_VALUE;
      paymentDataSend.method = paymentDataSend.type || "pix";

      keysOnlyNumbers.map((item) => paymentDataSend[item] = OnlyNumber(paymentDataSend[item]));

      paymentDataSend.phone_area_code = paymentDataSend.phone_number.slice(0, 2);
      paymentDataSend.phone_number = paymentDataSend.phone_number.slice(2,paymentDataSend.phone_number.length);
      paymentDataSend.card_holder_cpf = paymentDataSend.cpf;

      if (paymentDataSend.card_expiration_date) {
        const [card_expiration_month, card_expiration_year] = paymentDataSend.card_expiration_date.split('/')
        
        paymentDataSend.card_expiration_year = card_expiration_year
        paymentDataSend.card_expiration_month = card_expiration_month
        
        delete paymentDataSend.card_expiration_date;
      }

      delete paymentDataSend.type;

      const { data } = await pay(paymentDataSend);

      if (data?.message === "payment_error" || (data?.data || {})?.status === "not_authorized") {
        console.log(data);
        notification.error({
          message: "Erro ao processar pagamento",
          duration: 3.5,
          description:
            "Ocorreu um erro ao realizar o pagamento. Tente novamente mais tarde.",
        });
        return;
      }

      setHeaderTitle(null as any);
      setHeaderSubtitle(null as any);
      setActualForm(null as any);
      setPaymentSuccefullData({...paymentData, pix_payment: {
        img_url: data?.data?.qr_code_url,
        copy_and_paste_code: data?.data?.qr_code,
      }} as any);
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

  return (
    <Layout style={{ background: "#171717" }}>
      <Header>
        <NextHeader
          title={headerTitle}
          subtitle={headerSubtitle}
          actualStep={actualStep}
          stepsCount={STEPS_COUNT}
        />
      </Header>
      <Container>
        {actualForm === "personal" && (
          <FormPersonalData
            initialData={{ genre: "M" } as any}
            onContinue={onContinuePersonalData}
          />
        )}
        {actualForm === "payment" && (
          <PaymentSelection loading={loading} onPay={onPayment} />
        )}
        {paymentSuccefullData && (
          <ConfirmPayment paymentData={paymentSuccefullData} />
        )}
      </Container>
    </Layout>
  );
};
