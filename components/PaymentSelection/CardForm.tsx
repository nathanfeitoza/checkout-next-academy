import { Col, Row } from "antd";
import { useState } from "react";
import { INTEREST, MAX_INSTALLMENTS, PRODUCT_VALUE } from "../../constants";
import { cardCvvMask, cardDueMask, cardNumberMask } from "../../utils/mask";
import { InputRegistered } from "../InputRegistered";
import { ItemContainer } from "./styles";

export interface CardFormProps {
  control: any;
  errors: any;
  watch: any;
}
const INSTALLMENTS_CALC = Array(MAX_INSTALLMENTS).fill(0).map((_, index) => {
  if (index === 0) {
    return null;
  }

  const installment = index + 1;
  const installmentValue = String( (PRODUCT_VALUE * ((1 + (INTEREST * installment))))/installment );

  return {
    label: `${installment}x de R$${parseFloat(installmentValue).toFixed(2).replace('.', ',')} - com juros (${INTEREST * 100}% a.m.)`,
    value: installment,
  };
}).filter((value: any) => value !== null);

const DEFAULT_INSTALLMENTS = [
  {
    label: `1x de R$${PRODUCT_VALUE} - sem juros`,
    value: "1",
  },
  ...INSTALLMENTS_CALC,
];

export const CardForm = ({ control, errors }: CardFormProps) => {
  const [installments, setInstallments] = useState(DEFAULT_INSTALLMENTS);

  return (
    <ItemContainer>
      <Row className="input-row">
        <Col span={24}>
          <InputRegistered
            label="Nome que consta no cartão"
            placeholder="Nome no cartão"
            style={{ width: "100%" }}
            name="card_holder_name"
            control={control}
            rules={{ required: true, maxLength: 255 }}
            errors={errors}
          />
        </Col>
      </Row>
      <Row className="input-row">
        <Col span={24}>
          <InputRegistered
            label="Nº do cartão"
            placeholder="5555 5555 5555 5555"
            style={{ width: "100%" }}
            name="card_number"
            control={control}
            rules={{ required: true, maxLength: 255 }}
            errors={errors}
            masker={cardNumberMask}
          />
        </Col>
      </Row>
      <Row className="input-row">
        <Col span={18}>
          <InputRegistered
            style={{ width: "93%" }}
            label="Data de Validade"
            placeholder="MM/AAAA"
            name="card_expiration_date"
            control={control}
            rules={{ required: true, maxLength: 255 }}
            errors={errors}
            masker={cardDueMask}
          />
        </Col>
        <Col span={6}>
          <InputRegistered
            label="CVV"
            style={{ width: "100%" }}
            name="card_cvv"
            placeholder="999"
            control={control}
            rules={{ required: true, maxLength: 4 }}
            errors={errors}
            masker={cardCvvMask}
          />
        </Col>
      </Row>
      <Row className="input-row">
        <Col span={24}>
          <InputRegistered
            label="Parcelamento"
            name="installments"
            style={{ width: "100%" }}
            options={installments}
            input_type="select"
            control={control}
            rules={{ required: true, maxLength: 255 }}
            errors={errors}
          />
        </Col>
      </Row>
    </ItemContainer>
  );
};
