import { Col, Row } from "antd";
import { useState } from "react";
import { cardCvvMask, cardDueMask, cardNumberMask } from "../../utils/mask";
import { InputRegistered } from "../InputRegistered";
import { ItemContainer } from "./styles";

export interface CardFormProps {
  control: any;
  errors: any;
  watch: any;
}

const DEFAULT_INSTALLMENTS = [
  {
    label: "R$297 - A vista (sem juros)",
    value: "1",
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "3",
    value: "3",
  },
  {
    label: "4",
    value: "4",
  },
  {
    label: "5",
    value: "5",
  },
  {
    label: "6",
    value: "6",
  },
  {
    label: "7",
    value: "7",
  },
  {
    label: "8",
    value: "8",
  },
  {
    label: "9",
    value: "9",
  },
  {
    label: "10",
    value: "10",
  },
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
