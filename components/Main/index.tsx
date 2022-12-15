import React, { useState } from "react";
import { Layout, Row, Col } from "antd";
import { Container, Header } from "./styles";
import { NextHeader } from "../NextHeader";
import { FormPersonalData } from "../FormPersonalData";
import { PersonalData } from "../../models/personalData";
import { PaymentData } from "../../models/paymentData";
import { PaymentSelection } from "../PaymentSelection";
import { ConfirmPayment } from "../ConfirmPayment";

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
  const [paymentSuccefullData, setPaymentSuccefullData] = useState();
  const onContinuePersonalData = (personalData: PersonalData) => {
    console.log(personalData);
    setActualForm("payment");
    setActualStep(actualStep + 1);
  };
  const onPayment = (paymentData: PaymentData) => {
    console.log(paymentData);
    setHeaderTitle(null as any);
    setHeaderSubtitle(null as any);
    setActualForm(null as any);
    setPaymentSuccefullData(paymentData as any);
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
          <FormPersonalData onContinue={onContinuePersonalData} />
        )}
        {actualForm === "payment" && <PaymentSelection onPay={onPayment} />}
        {paymentSuccefullData && (
          <ConfirmPayment paymentData={paymentSuccefullData} />
        )}
      </Container>
    </Layout>
  );
};
