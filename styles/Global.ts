import styled, { css } from "styled-components";

const inputStyle = css`
  padding: 18px 15px 18px 15px;
  background: #FFFFFF;
  color: #171717;
  width: 70%;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  outline: 0;

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
export const DefaultButton = styled.button`
  padding: 17px 0px 19px 0px; 
  text-align: center;
  background: #F35B04;
  width: 70%;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  color: #FFFFFF;
  cursor: pointer;
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
