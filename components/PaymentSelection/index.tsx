import { Col, Radio, Row } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PaymentData } from "../../models/paymentData";
import { DefaultButton, SectionTitle } from "../../styles/Global";
import { CenterLayout } from "../CenterLayout";
import { CardForm } from "./CardForm";
import {
  ItemContainer,
  PaymentPriceContainer,
  PaymentPriceText,
  PaymentTypeContainer,
  PaymentTypeItem,
  PaymentTypeRadioContainer,
  PixTitle,
} from "./styles";

export interface PaymentSelectionProps {
  onPay: (paymentData: PaymentData) => any;
}

const PAYMENTS_TYPES = {
  card: {
    label: "Cartão de crédito",
    children: (register: any, errors: any, watch: any) => (
      <CardForm watch={watch} register={register} errors={errors} />
    ),
  },
  pix: {
    label: "Pix",
    children: () => (
      <>
        <PixTitle style={{ marginTop: "-.2rem" }}>
          Ao finalizar a compra, iremos gerar o código Pix para pagamento.
        </PixTitle>
        <PixTitle style={{ paddingBottom: "2rem" }}>
          Nosso sistema detecta automaticamente o pagamento sem precisar enviar
          comprovantes.
        </PixTitle>
      </>
    ),
  },
};

export const PaymentSelection = ({ onPay }: PaymentSelectionProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    if (!Object.entries(data).length) {
      data = {
        pix_payment: {
          img_url: "/assets/qrcode.png",
          copy_and_paste_code: "ajdshjkdhaskjdhjskahdjka123213213",
        },
      };
    }
    onPay({ ...data, type: selectedPayment });
  };
  const [selectedPayment, setSelectedPayment] = useState();
  const handleRadio = (event: any) => {
    const { value } = event.target;

    setSelectedPayment(value);
  };

  return (
    <CenterLayout>
      <Row style={{ paddingTop: "1rem", marginBottom: "-1.5rem" }}>
        <SectionTitle>Detalhes do pedido</SectionTitle>
      </Row>
      <Row style={{ marginBottom: "1rem" }}>
        <PaymentPriceContainer>
          <PaymentPriceText>Seletiva Next Academy</PaymentPriceText>
          <PaymentPriceText>R$ 297</PaymentPriceText>
        </PaymentPriceContainer>
      </Row>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row style={{ marginBottom: ".5rem" }}>
          <SectionTitle>Selecione a Forma de pagamento</SectionTitle>
        </Row>
        <Row>
          <Radio.Group style={{ width: "100%" }} onChange={handleRadio}>
            <PaymentTypeContainer>
              {Object.entries(PAYMENTS_TYPES).map(([name, data]) => (
                <PaymentTypeItem key={name}>
                  <PaymentTypeRadioContainer>
                    <Radio value={name}>
                      <h1>{data.label}</h1>
                    </Radio>
                  </PaymentTypeRadioContainer>
                  {selectedPayment === name && (
                    <ItemContainer>
                      {data.children(register, errors, watch)}
                    </ItemContainer>
                  )}
                </PaymentTypeItem>
              ))}
            </PaymentTypeContainer>
          </Radio.Group>
        </Row>
        <Row style={{ marginTop: "2rem" }} className="input-row">
          <Col span={24}>
            <DefaultButton type="submit">Confirmar Pagamento →</DefaultButton>
          </Col>
        </Row>
      </form>
    </CenterLayout>
  );
};
