import styled from "styled-components";

export const PaymentPriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media only screen and (max-width: 768px) {
    & {
      width: 100%;
      flex-direction: column;
      justify-content: center;
    }

    h1 {
      width: 100%;
    }
  }
`;

export const PaymentPriceText = styled.h1`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 119.2%;
  color: #FFFFFF;

  @media only screen and (max-width: 768px) {
    font-size: 23px;
  }
`;

export const PaymentTypeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  @media only screen and (max-width: 768px) {
    & {
      width: 100%;
    }
  }
`;

export const PaymentTypeItem = styled.div`
  background-color: #030303;
  padding: 8px 20px 8px 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  
  h1 {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 119.2%;
    color: #FFFFFF;
  }

  .ant-radio-inner::after {
    width: 35px;
    height: 35px;
    margin-block-start: -18px;
    margin-inline-start: -18px;
    border-radius: 45px;
    background-color: #F35B04;
  }

  .ant-radio-checked .ant-radio-inner {
    border-color: #F35B04;
    background-color: transparent;
  }

  .ant-radio-inner {
    width: 25px;
    height: 25px;
    background-color: transparent;
    border-color: #F35B04;
  }
`;


export const PaymentTypeRadioContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: .5rem;
  align-items: center;
`;

export const ItemContainer = styled.div`
  width: 100%;
`;


export const PixTitle = styled.p`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 119.2%;
  color: #FFFFFF;
`;
