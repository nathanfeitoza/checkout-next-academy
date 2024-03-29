import { InfoContainer, InfoDescription, InfoTitle, PixInfoContainer } from "./style"

const INFORMATIONS = [
  {
    icon: '',
    title: '',
    description: (<>
      <p>Ao finalizar a compra, iremos gerar o código Pix para pagamento.</p>
      <p>Nosso sistema detecta automaticamente o pagamento sem precisar enviar comprovantes.</p>
    </>)
  },
]

export const PixInformation = () => {
  return (
    <PixInfoContainer>
      {INFORMATIONS.map((information, index) => (
        <InfoContainer key={index}>
          {information.icon}
          <InfoTitle>{information.title}</InfoTitle>
          <InfoDescription>{information.description}</InfoDescription>
        </InfoContainer>
      ))}
    </PixInfoContainer>
  )
}
