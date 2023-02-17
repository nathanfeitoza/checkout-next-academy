import { Col, Row } from "antd";
import Image from "next/image";
import { CenterLayout } from "../CenterLayout";
import { StepText, SubtitleText, TitleText } from "./styles";

export interface NextHeaderProps {
  title?: string;
  subtitle?: string;
  stepsCount?: number;
  actualStep?: number;
  onBack?: (actualStep: number) => void;
}

export const NextHeader = ({
  title,
  subtitle,
  stepsCount,
  actualStep,
  onBack,
}: NextHeaderProps) => {
  const isPaymentStep = actualStep === 3;

  const handleClickBack = () => {
    onBack && onBack(actualStep as number);
  }

  return (
    <CenterLayout className="justify-to-50">
      {title && (
        <>
          <Row style={{ paddingTop: "5rem", alignItems: "center" }}>
            <Col span={12}>
              <Image
                alt="Logo Next Academy"
                width={119}
                height={43}
                src="/assets/logo-next.png"
              />
            </Col>
            <Col span={11} offset={1}>
              <StepText>
                PASSO {actualStep} de {stepsCount}
              </StepText>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <TitleText>{title}</TitleText>
            </Col>
          </Row>
          <Row style={{ paddingBottom: isPaymentStep ? "0.5rem" : "2rem" }}>
            <Col span={12}>
              <SubtitleText>{subtitle}</SubtitleText>
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
              src="/assets/logo-next.png"
            />
          </Col>
        </Row>
      )}
    </CenterLayout>
  );
};
