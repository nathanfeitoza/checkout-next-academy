import styled, { css } from "styled-components";

const ContainerCss = css`
  padding-inline: 50px;
  flex: 0 0 auto;
  box-sizing: border-box;
`;

export const Header = styled.div`
  width: 100%;
  background-image: url("/assets/bg-header.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  min-height: 64px;
  color: #fff;
  line-height: 64px;
  border-bottom: 2px solid #F35B04;

  ${ContainerCss}
`;

export const Container = styled.div`${ContainerCss}`
