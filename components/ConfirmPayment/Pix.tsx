import { Col, Row } from "antd";
import { PixPayment } from "../../models/paymentData";
import { CenterLayout } from "../CenterLayout";
import { Footer } from "./Footer";
import { ConfirmSubtitle, ConfirmTitle, Container } from "./styles";

export interface PixProps {
  pixData: PixPayment;
}

export const Pix = ({ pixData }: PixProps) => {
  console.log(pixData)
  return (
    <CenterLayout>
      <Container>
        <Row style={{ marginTop: "2rem", marginBottom: "3rem" }}>
          <ConfirmTitle>Escanei o QR code para pagar</ConfirmTitle>
        </Row>
        <Row style={{ marginBottom: "2rem" }}>
          <img width={256} height={256} style={{ maxWidth: "100%", maxHeight: "100%" }} src={pixData.img_url} alt="QRCode Pix" />
        </Row>
        <Row style={{ marginBottom: "6rem" }}>
          <Col span={24}>
            <ConfirmSubtitle>Pagamento via pix copia e cola</ConfirmSubtitle>
          </Col>
          <Col span={24}>
            <ConfirmSubtitle>{pixData.copy_and_paste_code}</ConfirmSubtitle>
          </Col>
        </Row>
        <Footer />
      </Container>
    </CenterLayout>
  );
};
