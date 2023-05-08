import { Col } from "antd";
import styled, { css } from "styled-components";

const ContainerCss = css`
  padding-inline: 50px;
  flex: 0 0 auto;
  box-sizing: border-box;
`;

export const Header = styled.div`
  width: 100%;
  background-image: url("/checkout-unbk/assets/bg-header.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  min-height: 64px;
  color: #fff;
  line-height: 64px;
  padding-top: 64px;
  padding-bottom: 64px;

  ${ContainerCss}
`;

export const Container = styled.div`${ContainerCss}`

export const ContainerInitial = styled.div`
  padding-top: 41px;
  padding-left: 135px;
  padding-right: 135px;

  @media only screen and (max-width: 768px) {
    & {
      padding: 0;
    }
  }
`;

export const ColPersonal = styled(Col)`
  padding-top: 15px;
  padding-left: 100px;
  padding-right: 65px;
  background: #fff;
  border-radius: 0px 0px 0px 20px;

  @media only screen and (max-width: 768px) {
    & {
      padding-top: 15px;
      padding-left: 58px;
      padding-right: 56px;
      flex: 0 0 100%;
      max-width: 100%;
      border-radius: 0px 0px 0px 0px;
    }
  }
`;

export const ColPersonal2 = styled(Col)`
  background: #000;
  border-radius: 0px 0px 20px 0px;

  @media only screen and (max-width: 768px) {
    & {
      border-radius: 0px 0px 0px 0px;
      flex: 0 0 100%;
      max-width: 100%;
    }
  }
`;

