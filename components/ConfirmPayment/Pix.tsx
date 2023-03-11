import { Col, notification, Row } from "antd";
import { useEffect, useState } from "react";
import copy from "copy-to-clipboard";

import { PixPayment } from "../../models/paymentData";
import { Pixel } from "../../services/pixel";
import { DefaultButton } from "../../styles/Global";
import { CenterLayout } from "../CenterLayout";
import { Footer } from "./Footer";
import { ConfirmSubtitle, ConfirmTitle, Container } from "./styles";
import { checkPayment } from "../../services/payment";
import { gTavEvent } from "../../utils/gTagEvent";

export interface PixProps {
  pixData: PixPayment;
  onPixPaid: () => void;
}

const TRANSACTION_STATUS = {
  PENDING: "pending",
  PAID: "paid",
};

let firstRun = true;

export const Pix = ({ pixData, onPixPaid }: PixProps) => {
  const [checking, setChecking] = useState(false);

  const tiggerEvent = async () => {
    const fbPixel = await Pixel();
    console.log("QRCodePix");

    fbPixel.trackCustom("QRCodePix");
    fbPixel.track("QRCodePix");
    gTavEvent('event', 'conversion', {
      'send_to': 'AW-319350377/p2p_CPXKrIwYEOnMo5gB',
      'event_callback': () => {},
    })
  };

  const checkPixPayment = async () => {
    if (checking) {
      return;
    }

    setChecking(true);

    
    try {
      const fbPixel = await Pixel();
      const { data } = await checkPayment(pixData.handoutId);
      const handoutStatus = data.handout.status;
      const actions: any = {
        pending: async () => {
          checkPixPayment();
        },
        paid: async () => {
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
          onPixPaid();

          return notification.success({
            message: "Pagamento realizado com sucesso",
            duration: 3.5,
          });
        },
        default: async () => {
          return notification.error({
            message: "Erro ao consultar pagamento do pix",
            duration: 3.5,
            description:
              "Ocorreu um erro ao consultar o pagamento do pix. Não é necessário fazer um novo pagamento. Caso o erro persista, entre em contato com o administrador e verifique o seu extrato bancário.",
          });
        },
      };

      setTimeout(async () => {
        actions[handoutStatus]
          ? await actions[handoutStatus]()
          : actions.default();
      }, 3000);
    } catch (err) {
      console.log(err);
      notification.error({
        message: "Erro ao consultar pagamento do pix",
        duration: 3.5,
        description:
          "Ocorreu um erro ao consultar o pagamento do pix. Não é necessário fazer um novo pagamento. Caso o erro persista, entre em contato com o administrador e verifique o seu extrato bancário.",
      });
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    tiggerEvent();

    if (firstRun) {
      firstRun = false;
      checkPixPayment();
    }
  }, []);

  const handlePressCopyPix = () => {
    copy(pixData.copy_and_paste_code, {
      message: "Pressione #{key} para copiar",
    });

    notification.success({
      message: "Pix copiado",
      duration: 3.5,
      description:
        "Código Pix copia e cola copiado com sucesso. Agora, só ir no app do seu banco e colar.",
    });
  };

  return (
    <CenterLayout span={10} offset={6}>
      <Container>
        <Row style={{ marginTop: "2rem", marginBottom: "1rem" }}>
          <ConfirmTitle style={{ color: "#F35B04" }}>ATENÇÃO!</ConfirmTitle>
        </Row>
        <Row style={{ marginTop: "0rem", marginBottom: "3rem" }}>
          <ConfirmTitle>A SUA VAGA AINDA <strong style={{ color: "#F35B04" }}>NÃO</strong> FOI GARANTIDA!</ConfirmTitle>
        </Row>
        <Row style={{ marginTop: "0rem", marginBottom: "1rem" }}>
          <ConfirmTitle style={{ fontSize: "14px", fontWeight: 400 }}>
            <p style={{ marginBottom: "2rem" }}>APÓS REALIZAR O PAGAMENTO, AGUARDE, VOCÊ SERÁ DIRECIONADO PARA A PÁGINA DE CONFIRMAÇÃO.</p>
          </ConfirmTitle>
        </Row>
        <Row style={{ marginTop: "0rem", marginBottom: "1rem" }}>
          <ConfirmTitle style={{ fontSize: "14px", fontWeight: 400 }}>
            <p style={{ margin: 0 }}>Escaneie o QR CODE e realize o</p>{" "}
            <p>pagamento para finalizar sua inscrição!</p>
          </ConfirmTitle>
        </Row>
        <Row style={{ marginBottom: "2rem" }}>
          <img
            width={256}
            height={256}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
            src={pixData.img_url}
            alt="QRCode Pix"
          />
        </Row>
        <Row style={{ marginBottom: "6rem" }}>
          <Col
            span={24}
          >
            <ConfirmSubtitle>Pagamento via pix copia e cola</ConfirmSubtitle>
          </Col>
          <Col span={24}>
            <ConfirmSubtitle>{pixData.copy_and_paste_code}</ConfirmSubtitle>
          </Col>
          <Col span={24}>
            <DefaultButton
              onClick={handlePressCopyPix}
              style={{ width: "100%" }}
            >
              Copiar pix
            </DefaultButton>
          </Col>
        </Row>
        <Footer />
      </Container>
    </CenterLayout>
  );
};
