import { Col, notification, Radio, Row } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PaymentData } from "../../models/paymentData";
import { DefaultButton, SectionTitle } from "../../styles/Global";
import { CenterLayout } from "../CenterLayout";
import { PixInformation } from "../PixInformation";
import { CardForm } from "./CardForm";
import {
  ItemContainer,
  PaymentPriceContainer,
  PaymentPriceText,
  PaymentTypeContainer,
  PaymentTypeItem,
  PaymentTypeRadioContainer,
} from "./styles";
import { PRODUCT_NAME, PRODUCT_VALUE } from "../../constants";

export interface PaymentSelectionProps {
  onPay: (paymentData: PaymentData) => any;
  leadSent: boolean;
  loading: boolean;
  useContinue?: boolean;
  onSelectPayment?: (paymentType: string) => void;
}

const PAYMENTS_TYPES = {
  credit_card: {
    label: "Cartão de crédito",
    children: (control: any, errors: any, watch: any) => (
      <CardForm watch={watch} control={control} errors={errors} />
    ),
  },
  pix: {
    label: "Pix",
    children: () => (
      <>
        <div style={{ marginTop: "-.2rem" }}>
          <PixInformation />
        </div>
      </>
    ),
  },
};

export const PaymentSelection = ({
  onPay,
  loading,
  useContinue = true,
  onSelectPayment,
  leadSent,
}: PaymentSelectionProps) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { installments: 1 } });
  const onSubmit = (data: any) => {
    if (!selectedPayment) {
      notification.error({
        message: "Selecione uma forma de pagamento",
        duration: 3.5,
        description: "É necessário escolher uma forma de pagamento",
      });
      return;
    }

    if (selectedPayment === "pix") {
      data = {
        pix_payment: {
          img_url: "/checkout-unbk/assets/qrcode.png",
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
    onSelectPayment && onSelectPayment(value);

    if (value == "pix") {
      setTimeout(() => {
        window.scrollTo({
          top: 10000,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  return (
    <CenterLayout>
      <Row style={{ paddingTop: "0rem", marginBottom: "0rem" }}>
        <SectionTitle>Detalhes do pedido</SectionTitle>
      </Row>
      <Row style={{ marginBottom: "1rem" }}>
        <PaymentPriceContainer>
          <PaymentPriceText>{PRODUCT_NAME}</PaymentPriceText>
          <PaymentPriceText>R$ {PRODUCT_VALUE}</PaymentPriceText>
        </PaymentPriceContainer>
      </Row>
      {leadSent && (
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
                        {data.children(control, errors, watch)}
                      </ItemContainer>
                    )}
                  </PaymentTypeItem>
                ))}
              </PaymentTypeContainer>
            </Radio.Group>
          </Row>
          <Row style={{ marginTop: "-1rem" }} className="input-row">
            <Col span={24}>
              <DefaultButton
                id="button-confirm-payment"
                loading={loading}
                htmlType="submit"
                hidden={!useContinue}
              >
                Confirmar Pagamento →
              </DefaultButton>
            </Col>
          </Row>
        </form>
      )}
    </CenterLayout>
  );
};
