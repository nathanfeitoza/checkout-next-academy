import { Col, Row } from "antd";

import { CenterLayout } from "../CenterLayout";
import {
  ConfirmSubTitle,
  ConfirmSubtitle,
  ConfirmTitle,
  Container,
  TitleGoToTrain,
} from "./styles";
import { Footer } from "./Footer";
import Image from "next/image";
import { useEffect } from "react";
import { Pixel } from "../../services/pixel";
import { gTavEvent } from "../../utils/gTagEvent";
import { FormIndication } from "./FormIndication";

export const Card = () => {
  const tiggerEvent = async () => {
      const fbPixel = await Pixel();
      console.log("Compra")

      fbPixel.trackCustom('Compra');
      fbPixel.track('Compra');
      gTavEvent('event', 'conversion', {
        'send_to': 'AW-319350377/oISzCLXYqowYEOnMo5gB',
        'value': 297.0,
        'currency': 'BRL',
        'transaction_id': '',
        'event_callback': () => {}
      });
  
  }

  useEffect(() => {
    tiggerEvent();
  }, []);

  return (
    <CenterLayout>
      <Container>
        <Row style={{ marginBottom: "2rem", marginTop: "4rem" }}>
          <Image
            width={76}
            height={76}
            src="/checkout/assets/check-icon.svg"
            alt="Check icon"
          />
        </Row>
        <Row style={{ marginBottom: "1rem" }}>
          <Col span={24}>
            <ConfirmTitle>Parabéns.</ConfirmTitle>
          </Col>
          <Col span={24}>
            <ConfirmTitle>Sua compra foi</ConfirmTitle>
          </Col>
          <Col span={24}>
            <ConfirmTitle>confirmada.</ConfirmTitle>
          </Col>
        </Row>
        <Row>
          <Col span={20} offset={3}>
            <ConfirmTitle>Queremos levar essa mesma oportunidade para mais <span style={{ color: "#ee5904" }}>atletas da sua cidade</span></ConfirmTitle>
          </Col>
          <Col span={19} offset={3} style={{ marginTop: "2rem", marginBottom: "2rem" }}>
            <ConfirmSubTitle>Indique <span style={{ color: "#ee5904" }}>05 amigos</span> que poderiam jogar com você no dia da seletiva e receba um curso gratuito de Intercâmbio esportivo no seu e-mail.</ConfirmSubTitle>
          </Col>
          <Col span={24}>
            <FormIndication />
          </Col>
        </Row>
        <Row style={{ marginBottom: "1rem" }}>
          <Col span={12} offset={6}>
            <ConfirmSubtitle>
              Nosso time de recrutadores entrará em contato para confirmar a sua
              presença na seletiva de futebol da Next Academy.
            </ConfirmSubtitle>
          </Col>
        </Row>
        <Row style={{ marginBottom: "1rem" }}>
          <TitleGoToTrain>Agora é treinar pra dar um show.</TitleGoToTrain>
        </Row>
        <Footer />
      </Container>
    </CenterLayout>
  );
};
