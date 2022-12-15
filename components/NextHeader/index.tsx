import { Col, Row } from "antd";
import Image from "next/image";
import { CenterLayout } from "../CenterLayout";
import { StepText, SubtitleText, TitleText } from "./styles";

export interface NextHeaderProps {
  title?: string;
  subtitle?: string;
  stepsCount?: number;
  actualStep?: number;
}

export const NextHeader = ({
  title,
  subtitle,
  stepsCount,
  actualStep,
}: NextHeaderProps) => {
  return (
    <CenterLayout>
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
          <Row style={{ paddingBottom: "2rem" }}>
            <Col span={12}>
              <SubtitleText>{subtitle}</SubtitleText>
            </Col>
          </Row>
        </>
      )}

      {!title && (
        <Row style={{ paddingTop: "6rem", paddingBottom: "9rem" }}>
          <Col style={{ alignItems: "center", justifyContent: "center", display: "flex" }} span={24}>
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
