import { Col, Row } from "antd";
import Image from "next/image";
import { CenterLayout } from "../CenterLayout";
import { DescriptionText, RowInitial, StepText, SubtitleText, TitleText } from "./styles";

export interface NextHeaderProps {
  title?: string;
  subtitle?: string;
  description?: string;
  actualStep?: number;
  onBack?: (actualStep: number) => void;
}

export const NextHeader = ({
  title,
  subtitle,
  actualStep,
  description,
  onBack,
}: NextHeaderProps) => {
  const isPaymentStep = actualStep === 3;

  const handleClickBack = () => {
    onBack && onBack(actualStep as number);
  }

  return (
    <CenterLayout span={24} offset={1} className="justify-to-50">
      {title && (
        <>
          <Row>
            <Col span={12}>
              <TitleText>{title}</TitleText>
            </Col>
          </Row>
          <Row style={{ paddingBottom: "0.5rem" }}>
            <Col span={7}>
              <SubtitleText>{subtitle}</SubtitleText>
            </Col>
          </Row>
          <Row style={{ paddingBottom: "0.5rem" }}>
            <Col span={12}>
              <DescriptionText>{description}</DescriptionText>
            </Col>
          </Row>
          {isPaymentStep && (
            <Row style={{ paddingBottom: "2rem" }}>
              <Col span={12}>
                <SubtitleText onClick={handleClickBack} style={{ cursor: "pointer", color: "#b1b1b1" }}>
                  ← Voltar
                </SubtitleText>
              </Col>
            </Row>
          )}
        </>
      )}

      {!title && (
        <Row style={{ paddingTop: "6rem", paddingBottom: "9rem" }}>
          <Col
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
            span={24}
          >
            <Image
              alt="Logo Next Academy"
              width={119}
              height={43}
              src="/checkout-unbk/assets/logo-next.png"
            />
          </Col>
        </Row>
      )}
    </CenterLayout>
  );
};
