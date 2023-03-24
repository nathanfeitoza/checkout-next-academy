import styled, { css } from "styled-components";
import { Button } from 'antd';

const inputStyle = css`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  border-radius: 8px;
  height: 48px;
  padding: calc(11px);
  color: rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0);

  &:focus {
    border: 2px solid #F35B04;
  }

  &::placeholder {
    color: #B5B5B5;
  }

  @media only screen and (max-width: 768px) {
    & {
      width: 100%;
    }
  }
`;

export const Input = styled.input`${inputStyle}`;
export const Select = styled.select`${inputStyle}`;
export const Label = styled.label`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #B5B5B5;
  margin-bottom: .6rem;
`;
export const DefaultButton = styled(Button)`
  padding: calc(11px);
  border-radius: 8px;
  text-align: center;
  background: #7BB318;
  width: 100%;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 16.5px;
  line-height: 27px;
  text-align: center;
  color: #FFFFFF;
  cursor: pointer;
  border: none;
  height: inherit;

  @media only screen and (max-width: 768px) {
    & {
      width: 100%;
    }
  }
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
