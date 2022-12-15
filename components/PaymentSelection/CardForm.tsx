import { Col, Row } from "antd";
import { useState } from "react";
import { InputRegistered } from "../InputRegistered";
import { ItemContainer } from "./styles";

export interface CardFormProps {
  register: any;
  errors: any;
  watch: any;
}

const DEFAULT_INSTALLMENTS = [
  {
    label: "R$297 - A vista (sem juros)",
    value: "vista",
  },
  {
    label: "2x R$xx (com juros)",
    value: "2",
  },
  {
    label: "3x R$xx (com juros)",
    value: "3",
  },
  {
    label: "4x R$xx (com juros)",
    value: "4",
  },
  {
    label: "5x R$xx (com juros)",
    value: "5",
  },
  {
    label: "6x R$xx (com juros)",
    value: "6",
  },
  {
    label: "7x R$xx (com juros)",
    value: "7",
  },
  {
    label: "8x R$xx (com juros)",
    value: "8",
  },
  {
    label: "9x R$xx (com juros)",
    value: "9",
  },
  {
    label: "10x R$xx (com juros)",
    value: "10",
  },
];

export const CardForm = ({ register, errors, watch }: CardFormProps) => {
  const [installments, setInstallments] = useState(DEFAULT_INSTALLMENTS);

  return (
    <ItemContainer>
      <Row className="input-row">
        <Col span={24}>
          <InputRegistered
            label="Nome que consta no cartão"
            placeholder="Nome no cartão"
            style={{ width: "100%" }}
            name="card_name"
            register={register}
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
            register={register}
            rules={{ required: true, maxLength: 255 }}
            errors={errors}
          />
        </Col>
      </Row>
      <Row className="input-row">
        <Col span={18}>
          <InputRegistered
            style={{ width: "93%" }}
            label="Data de Validade"
            placeholder="MM/AAAA"
            name="card_due_date"
            register={register as any}
            rules={{ required: true, maxLength: 255 }}
            errors={errors}
          />
        </Col>
        <Col span={6}>
          <InputRegistered
            label="CVV"
            style={{ width: "100%" }}
            name="card_cvv"
            placeholder="999"
            register={register as any}
            rules={{ required: true, maxLength: 255 }}
            errors={errors}
          />
        </Col>
      </Row>
      <Row className="input-row">
        <Col span={24}>
          <InputRegistered
            label="Parcelamento"
            name="card_installments"
            style={{ width: "100%" }}
            options={installments}
            input_type="select"
            register={register}
            rules={{ required: true, maxLength: 255 }}
            errors={errors}
          />
        </Col>
      </Row>
    </ItemContainer>
  );
};
