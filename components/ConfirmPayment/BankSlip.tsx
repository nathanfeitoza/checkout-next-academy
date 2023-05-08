import { Col, Row, notification } from "antd";
import { CenterLayout } from "../CenterLayout";
import { ConfirmSubtitle, ConfirmTitle, Container } from "./styles";
import { BankSlipPayment } from "../../models/paymentData";
import { DefaultButton } from "../../styles/Global";
import copy from "copy-to-clipboard";

export interface BankSlipProps {
  bankSlipPayment: BankSlipPayment;
}

export const BankSlip = ({ bankSlipPayment }: BankSlipProps) => {
  const handlePressCopyLine = () => {
    copy(bankSlipPayment.line, {
      message: "Pressione #{key} para copiar",
    });

    notification.success({
      message: "Código de barras copiado",
      duration: 3.5,
      description:
        "Código de Barras copiado com sucesso. Agora, só ir no app do seu banco e colar.",
    });
  };

  return (
    <CenterLayout span={18} offset={3}>
      <Container style={{ marginBottom: "2rem" }}>
        <Row style={{ marginTop: "2rem", marginBottom: "1rem" }}>
          <ConfirmTitle>CÓDIO DE BARRAS</ConfirmTitle>
        </Row>
        <Row style={{ marginBottom: "2rem" }}>
          <Col span={24}>
            <ConfirmSubtitle style={{ cursor: "pointer" }} onClick={handlePressCopyLine}>{bankSlipPayment.line}</ConfirmSubtitle>
          </Col>
        </Row>

        <Row style={{ width: "100%" }}>
          <Col span={24}>
            <DefaultButton
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "calc(15px) !important",
              }}
              type="link"
              target="_blank"
              href={bankSlipPayment.pdf}
            >
              Baixar boleto
            </DefaultButton>
          </Col>
        </Row>
      </Container>
    </CenterLayout>
  );
};
