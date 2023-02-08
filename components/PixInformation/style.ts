import styled from "styled-components";

export const PixInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  width: 100%;
  align-items: center;

  @media only screen and (max-width: 768px) {
    & {
      grid-template-columns: 100%;
    }
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: .8rem;
  align-items: center;
  padding: 10px;
  min-height: 176px;
`;

export const InfoTitle = styled.h1`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 14px !important;
  line-height: 119.2%;
  text-align: center;
  color: #ffffff;
`;

export const InfoDescription = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 119.2%;
  text-align: center;
  color: #ffffff;
`;
