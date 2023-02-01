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
    console.log(personalData);
    setActualForm("payment");
    setActualStep(actualStep + 1);
    setPersonalData(personalData);
  };

  const onPayment = async (paymentData: PaymentData) => {
    setLoading(true);

    try {
      const keysOnlyNumbers = ["phone", "cpf", "card_number", "card_cvv", "zipcode"]
      const paymentDataSend: any = {
        ...ExtractFields(personalData, [
          "name",
          "phone",
          "email",
          "cpf",
          "neighborhood",
          "address",
          "number",
          "complement",
          "zipcode",
        ]),
        ...(paymentData.type === "card" ? paymentData : {}),
      };
      paymentDataSend.value = PRODUCT_VALUE;
      paymentDataSend.method = paymentDataSend.type || "pix";

      keysOnlyNumbers.map((item) => paymentDataSend[item] = OnlyNumber(paymentDataSend[item]));

      paymentDataSend.phone_area_code = paymentDataSend.phone.slice(0, 2);
      paymentDataSend.phone = paymentDataSend.phone.slice(2,paymentDataSend.phone.length);

      delete paymentDataSend.type;

      const { data } = await pay(paymentDataSend);

      if (data?.message === "payment_error") {
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
      setPaymentSuccefullData(paymentData as any);
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