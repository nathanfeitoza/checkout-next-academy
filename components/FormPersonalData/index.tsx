import { useEffect, useState } from "react";
import { Row, Col, notification } from "antd";
import { useForm, useWatch } from "react-hook-form";
import { PersonalData } from "../../models/personalData";
import { saveLead } from "../../services/contact";
import { Pixel } from "../../services/pixel";
import { DefaultButton, SectionTitle } from "../../styles/Global";
import { gTavEvent } from "../../utils/gTagEvent";
import { phoneMask } from "../../utils/mask";
import { CenterLayout } from "../CenterLayout";
import { InputRegistered } from "../InputRegistered";

export interface FormPersonalDataProps {
  onContinue: (personalData: PersonalData) => void;
  onLeadSent: () => void;
  initialData?: PersonalData;
  onDataChange?: (data: PersonalData) => void;
  useContinue?: boolean;
  onRefSubmit?: any;
}

const SELECTIVE_STATES = [
  { value: "", label: "" },
  { label: "VOLTA REDONDA/RJ - 30/04/2023", value: "VOLTA REDONDA/RJ" },
  { label: "VITÓRIA/ES - 30/04/2023", value: "VITÓRIA/ES" },
  {
    label: "VITÓRIA DA CONQUISTA/BA - 15/04/2023",
    value: "VITÓRIA DA CONQUISTA/BA",
  },
  { label: "VARGINHA/MG - 15/04/2023", value: "VARGINHA/MG" },
  { label: "TERESINA/PI - 30/04/2023", value: "TERESINA/PI" },
  { label: "SINOP/MT - 30/04/2023", value: "SINOP/MT" },
  { label: "SÃO PAULO/SP - 30/04/2023", value: "SÃO PAULO/SP" },
  { label: "SÃO LUIS/MA - 02/04/2023", value: "SÃO LUIS/MA" },
  {
    label: "SÃO JOSÉ DO RIO PRETO/SP - 07/05/2023",
    value: "SÃO JOSÉ DO RIO PRETO/SP",
  },
  { label: "SANTO ANDRÉ/SP - 28/05/2023", value: "SANTO ANDRÉ/SP" },
  { label: "RIO BRANCO/AC - 30/04/2023", value: "RIO BRANCO/AC" },
  { label: "RIBEIRÃO PRETO/SP - 28/05/2023", value: "RIBEIRÃO PRETO/SP" },
  { label: "RECIFE/PE - 28/05/2023", value: "RECIFE/PE" },
  {
    label: "PRESIDENTE PRUDENTE/SP - 30/04/2023",
    value: "PRESIDENTE PRUDENTE/SP",
  },
  { label: "PORTO VELHO/RO - 30/04/2023", value: "PORTO VELHO/RO" },
  { label: "PORTO ALEGRE/RS - 13/05/2023", value: "PORTO ALEGRE/RS" },
  { label: "PONTA GROSSA/PR - 30/04/2023", value: "PONTA GROSSA/PR" },
  { label: "PALMAS/TO - 30/04/2023", value: "PALMAS/TO" },
  { label: "OSASCO/SP - 30/04/2023", value: "OSASCO/SP" },
  { label: "NITERÓI/RJ - 30/04/2023", value: "NITERÓI/RJ" },
  { label: "NATAL/RN - 16/04/2023", value: "NATAL/RN" },
  { label: "MONTES CLAROS/MG - 06/05/2023", value: "MONTES CLAROS/MG" },
  { label: "MOGI DAS CRUZES/SP - 30/04/2023", value: "MOGI DAS CRUZES/SP" },
  { label: "MARINGÁ/PR - 08/04/2023", value: "MARINGÁ/PR" },
  { label: "MARABÁ/PA - 09/04/2023", value: "MARABÁ/PA" },
  { label: "MANAUS/AM - 16/04/2023", value: "MANAUS/AM" },
  { label: "MACEIÓ/AL - 30/04/2023", value: "MACEIÓ/AL" },
  { label: "MACAPÁ/AP - 30/04/2023", value: "MACAPÁ/AP" },
  { label: "MACAÉ/RJ - 08/04/2023", value: "MACAÉ/RJ" },
  { label: "LONDRINA/PR - 30/04/2023", value: "LONDRINA/PR" },
  { label: "JUIZ DE FORA/MG - 30/04/2023", value: "JUIZ DE FORA/MG" },
  { label: "JOINVILLE/SC - 30/04/2023", value: "JOINVILLE/SC" },
  { label: "JOÃO PESSOA/PB - 30/04/2023", value: "JOÃO PESSOA/PB" },
  { label: "IPATINGA/MG - 30/04/2023", value: "IPATINGA/MG" },
  { label: "GUARULHOS/SP - 30/04/2023", value: "GUARULHOS/SP" },
  { label: "GOIÂNIA/GO - 30/04/2023", value: "GOIÂNIA/GO" },
  { label: "FRANCA/SP - 01/04/2023", value: "FRANCA/SP" },
  { label: "FOZ DO IGUAÇU/PR - 30/04/2023", value: "FOZ DO IGUAÇU/PR" },
  { label: "FORTALEZA/CE - 30/04/2023", value: "FORTALEZA/CE" },
  { label: "FLORIANÓPOLIS/SC - 25/06/2023", value: "FLORIANÓPOLIS/SC" },
  { label: "DOURADOS/MS - 28/05/2023", value: "DOURADOS/MS" },
  { label: "DIVINÓPOLIS/MG - 06/05/2023", value: "DIVINÓPOLIS/MG" },
  { label: "CURITIBA/PR - 28/05/2023", value: "CURITIBA/PR" },
  { label: "CUIABÁ/MT - 02/04/2023", value: "CUIABÁ/MT" },
  { label: "COTIA/SP - 30/04/2023", value: "COTIA/SP" },
  { label: "CAMPO GRANDE/RJ - 30/04/2023", value: "CAMPO GRANDE/RJ" },
  { label: "CAMPO GRANDE/MS - 08/04/2023", value: "CAMPO GRANDE/MS" },
  { label: "BRASÍLIA/DF - 08/04/2023", value: "BRASÍLIA/DF" },
  { label: "BOA VISTA/RR - 30/04/2023", value: "BOA VISTA/RR" },
  { label: "BELÉM/PA - 15/04/2023", value: "BELÉM/PA" },
  { label: "BAURU/SP - 30/04/2023", value: "BAURU/SP" },
  { label: "BARUERI/SP - 30/04/2023", value: "BARUERI/SP" },
  { label: "BARRA FUNDA/SP - 30/04/2023", value: "BARRA FUNDA/SP" },
  { label: "ARACAJU/SE - 30/04/2023", value: "ARACAJU/SE" },
  {
    label: "APARECIDA DE GOIÂNIA/GO - 07/05/2023",
    value: "APARECIDA DE GOIÂNIA/GO",
  },
  { label: "AMERICANA/SP - 30/04/2023", value: "AMERICANA/SP" },
].sort(function (a, b) {
  if (a.label < b.label) {
    return -1;
  }
  if (a.label > b.label) {
    return 1;
  }
  return 0;
});

export const FormPersonalData = ({
  onContinue,
  initialData,
  onDataChange,
  useContinue = true,
  onLeadSent,
}: FormPersonalDataProps) => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: initialData });

  const [loading, setLoading] = useState(false);
  const [leadSent, setLeadSent] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      await saveLead({
        ...data,
        phone: data.phone_number,
      });

      setLeadSent(true);
      onLeadSent();
      setTimeout(() => {
        window.scrollTo({ top: 10000 });
      }, 100);
    } catch (err) {
      console.log(err);
      notification.error({
        message: "Erro ao prosseguir para o pagamento",
        duration: 3.5,
        description:
          "Ocorreu um erro ao prosseguir com o pagamento. Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  const watchAll = useWatch({ control });

  useEffect(() => {
    onDataChange && onDataChange(watchAll as PersonalData);
  }, [watchAll]);

  const handlePressContinue = async () => {
    const fbPixel = await Pixel();
    const formData = getValues();
    console.log("Initiate checkout");
    fbPixel.trackCustom("Initiate Checkout", formData);
    fbPixel.trackCustom("InitiateCheckout", formData);

    fbPixel.track("Initiate Checkout", formData);
    fbPixel.track("InitiateCheckout", formData);
    gTavEvent("event", "conversion", {
      send_to: "AW-319350377/e6ZICLjYqowYEOnMo5gB",
      event_callback: () => {},
    });
  };

  return (
    <CenterLayout>
      <Row style={{ paddingTop: "1rem" }}>
        <SectionTitle>Seus Dados</SectionTitle>
      </Row>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="input-row">
          <Col span={24}>
            <InputRegistered
              label="Escolha a seletiva mais perto de você"
              name="seletiva"
              input_type="select"
              options={SELECTIVE_STATES}
              rules={{ required: true }}
              errors={errors}
              control={control}
              placeholder="Escolha o local"
            />
          </Col>
        </Row>
        <Row className="input-row">
          <Col span={24}>
            <InputRegistered
              label="Nome Completo"
              name="name"
              rules={{ required: true, maxLength: 255 }}
              errors={errors}
              control={control}
            />
          </Col>
        </Row>
        <Row className="input-row">
          <Col span={24}>
            <InputRegistered
              label="Celular / Whatsapp"
              name="phone_number"
              rules={{ required: true, maxLength: 255 }}
              errors={errors}
              control={control}
              masker={phoneMask}
            />
          </Col>
        </Row>
        <Row className="input-row">
          <Col span={24}>
            <InputRegistered
              label="Email"
              name="email"
              type="email"
              rules={{ required: true, maxLength: 255 }}
              errors={errors}
              control={control}
            />
          </Col>
        </Row>
        {!leadSent && (
          <Row className="input-row">
            <Col span={24} style={{ marginTop: ".7rem" }}>
              <DefaultButton
                onClick={handlePressContinue}
                htmlType="submit"
                loading={loading}
              >
                Clique aqui para continuar
              </DefaultButton>
            </Col>
          </Row>
        )}

        <Row className="input-row">
          <Col span={24}>
            <DefaultButton
              hidden={!useContinue}
              id="button-continue-form-data"
              onClick={() => onContinue(getValues())}
              htmlType="button"
            >
              Continuar →
            </DefaultButton>
          </Col>
        </Row>
      </form>
    </CenterLayout>
  );
};
