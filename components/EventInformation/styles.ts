import { Row } from "antd";
import styled from "styled-components";
import { PRODUCT_COLOR } from "../../constants";

export const Container = styled(Row)`
  padding-left: 40px;
  padding-top: 3rem;
`;

export const Title = styled.h2`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 119.2%;
  color: #FFFFFF;
`
export const ContainerReserveData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: .1rem;
  margin-bottom: 1.5rem;

  @media only screen and (max-width: 768px) {
    & {
      width: 90%;
    }
  }
`;

export const MarkTitle = styled.strong`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 119.2%;
  color: ${PRODUCT_COLOR};
`;

export const SectionTitle = styled.h2`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 119.2%;
  text-transform: uppercase;
  color: #777777;
`;

export const AnswerText = styled.p`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #B5B5B5;
  width: 75%;
`;

export const WhatsappButton = styled.a`
  text-decoration: none;
  width: 100%;
  border: 1px solid ${PRODUCT_COLOR};
  padding: 15px;
  background: transparent;
  text-align: center;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 119.2%;
  text-transform: uppercase;
  color: ${PRODUCT_COLOR};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  svg {
    transform: translateY(-10%);
  }

  &:hover {
    color: ${PRODUCT_COLOR};
    opacity: .8;
  }
`;

export const DateText = styled.text`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 54px;
  color: #FFFFFF;
  fill: #FFFFFF;
`;

export const MonthName = styled.text`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 27px;
  color: #FFFFFF;
  fill: #FFFFFF;
`;

export const AddressText = styled.h2`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #FFFFFF;
`;

export const RunText = styled.h1`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 130%;
  color: #FFFFFF;
  margin: 0;
`;

export const RunInformation = styled.p`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 130%;
  color: #FFFFFF;
  margin: 0;

  span {
    color: ${PRODUCT_COLOR};
  }
`;
