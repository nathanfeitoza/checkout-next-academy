import { InfoContainer, InfoDescription, InfoTitle, BankSlipInfoContainer } from "./style"

const INFORMATIONS = [
  {
    icon: '',
    title: '',
    description: (<>
      <p>O boleto será gerado na tela a seguir</p>
    </>)
  },
]

export const BankSlipInformation = () => {
  return (
    <BankSlipInfoContainer>
      {INFORMATIONS.map((information, index) => (
        <InfoContainer key={index}>
          {information.icon}
          <InfoTitle>{information.title}</InfoTitle>
          <InfoDescription>{information.description}</InfoDescription>
        </InfoContainer>
      ))}
    </BankSlipInfoContainer>
  )
}
