import { Col, Row } from "antd";
import Image from "next/image";

import { Container, FooterTitle } from "./styles";

export const Footer = () => {
  return (
    <Container style={{ marginTop: "2rem", marginBottom: "2rem" }}>
      <Row>
        <FooterTitle>
        Se liga nas nossas redes sociais
        </FooterTitle>
      </Row>
      <Row style={{ width: "16%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#">
            <Image width={24} height={24} src="/checkout/assets/instagram.png" alt="Instagram profile" />
          </a>
        <a href="#">
            <Image width={24} height={24} src="/checkout/assets/facebook.png" alt="Facebook profile" />
          </a>
      </Row>
    </Container>
  );
}
