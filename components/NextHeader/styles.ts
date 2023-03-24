import { Row } from "antd";
import styled from "styled-components";

export const StepText = styled.span`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 119.2%;
  text-transform: uppercase;
  color: #777777;
`;

export const TitleText = styled.h1`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 119.2%;
  color: #FFFFFF;

  @media only screen and (max-width: 768px) {
    & {
      font-size: 16px;
    }
  }
`;

export const SubtitleText = styled.h1`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 119.2%;
  color: #FFFFFF;
`;

export const RowInitial = styled(Row)`
  padding-top: .5rem;
  align-items: center;

  @media only screen and (max-width: 768px) {
    padding-top: .1rem;
  }
`;
