import { Layout, Row, Col, notification } from "antd";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { PersonalData } from "../../models/personalData";
import { LeadTag, saveLead, triggerlead } from "../../services/contact";
import {
  fetchCitiesByState,
  fetchLocationByZipCode,
} from "../../services/location";
import { Pixel } from "../../services/pixel";
import { DefaultButton, SectionTitle } from "../../styles/Global";
import { gTavEvent } from "../../utils/gTagEvent";
import { cpfMask, dateMask, phoneMask, zipCodeMask } from "../../utils/mask";
import { OnlyNumber } from "../../utils/onlyNumber";
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

const BRASIL_STATES = [
  { value: "", label: "" },
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

const SELECTIVE_STATES = [
  { value: "", label: "" },
  { label: "MONTES CLAROS/MG - 30/04/2023", value: "MONTES CLAROS/MG" },
  { label: "DIVINÓPOLIS/MG - 30/04/2023", value: "DIVINÓPOLIS/MG" },
  { label: "MACEIÓ/AL - 30/04/2023", value: "MACEIÓ/AL" },
  { label: "PORTO VELHO/RO - 30/04/2023", value: "PORTO VELHO/RO" },
  { label: "ARACAJU/SE - 30/04/2023", value: "ARACAJU/SE" },
  { label: "RIO BRANCO/AC - 30/04/2023", value: "RIO BRANCO/AC" },
  { label: "MARINGÁ/PR - 30/04/2023", value: "MARINGÁ/PR" },
  { label: "JOINVILLE/SC - 30/04/2023", value: "JOINVILLE/SC" },
  { label: "OSASCO/SP - 30/04/2023", value: "OSASCO/SP" },
  {
    label: "SÃO PAULO (VILA PRUDENTE) - 30/04/2023",
    value: "SÃO PAULO (VILA PRUDENTE)",
  },
  { label: "COTIA/SP - 30/04/2023", value: "COTIA/SP" },
  { label: "GUARULHOS/SP - 30/04/2023", value: "GUARULHOS/SP" },
  { label: "IPATINGA/MG - 30/04/2023", value: "IPATINGA/MG" },
  { label: "IPATINGA/MG - 30/04/2023", value: "IPATINGA/MG" },
  { label: "MOGI DAS CRUZES/SP - 30/04/2023", value: "MOGI DAS CRUZES/SP" },
  { label: "MACAPÁ/AP - 30/04/2023", value: "MACAPÁ/AP" },
  { label: "MANAUS/AM - 30/04/2023", value: "MANAUS/AM" },
  { label: "BARRA FUNDA/SP - 30/04/2023", value: "BARRA FUNDA/SP" },
  { label: "VITÓRIA/ES - 30/04/2023", value: "VITÓRIA/ES" },
  { label: "FOZ DO IGUAÇU/PR - 30/04/2023", value: "FOZ DO IGUAÇU/PR" },
  { label: "JUIZ DE FORA/MG - 30/04/2023", value: "JUIZ DE FORA/MG" },
  { label: "LONDRINA/PR - 30/04/2023", value: "LONDRINA/PR" },
  { label: "VOLTA REDONDA/RJ - 30/04/2023", value: "VOLTA REDONDA/RJ" },
  { label: "GOIÂNIA/GO - 30/04/2023", value: "GOIÂNIA/GO" },
  { label: "TERESINA/PI - 30/04/2023", value: "TERESINA/PI" },
  { label: "BOA VISTA/RR - 30/04/2023", value: "BOA VISTA/RR" },
  { label: "PONTA GROSSA/PR - 30/04/2023", value: "PONTA GROSSA/PR" },
  { label: "AMERICANA/SP - 30/04/2023", value: "AMERICANA/SP" },
  {
    label: "PRESIDENTE PRUDENTE/SP - 30/04/2023",
    value: "PRESIDENTE PRUDENTE/SP",
  },
  {
    label: "SÃO JOSÉ DO RIO PRETO/SP - 30/04/2023",
    value: "SÃO JOSÉ DO RIO PRETO/SP",
  },
  { label: "CAMPO GRANDE/RJ - 30/04/2023", value: "CAMPO GRANDE/RJ" },
  { label: "MACEIÓ/AL - 30/04/2023", value: "MACEIÓ/AL" },
  { label: "JOÃO PESSOA/PB - 30/04/2023", value: "JOÃO PESSOA/PB" },
  { label: "SANTO ANDRÉ/SP - 30/04/2023", value: "SANTO ANDRÉ/SP" },
  { label: "SINOP/MT - 30/04/2023", value: "SINOP/MT" },
  { label: "PORTO VELHO/RO - 30/04/2023", value: "PORTO VELHO/RO" },
  { label: "NITERÓI/RJ - 30/04/2023", value: "NITERÓI/RJ" },
  { label: "BARUERI/SP - 30/04/2023", value: "BARUERI/SP" },
  { label: "MORUMBI/SP - 30/04/2023", value: "MORUMBI/SP" },
  { label: "SÃO PAULO (BERRINI) - 30/04/2023", value: "SÃO PAULO (BERRINI)" },
  { label: "PALMAS/TO - 30/04/2023", value: "PALMAS/TO" },
  { label: "FORTALEZA/CE - 30/04/2023", value: "FORTALEZA/CE" },
  { label: "BAURU/SP - 30/04/2023", value: "BAURU/SP" },
  { label: "CUIABÁ/MT - 02/04/2023", value: "CUIABÁ/MT" },
  { label: "FRANCA/SP - 01/04/2023", value: "FRANCA/SP" },
  { label: "SÃO LUIS/MA - 02/04/2023", value: "SÃO LUIS/MA" },
  { label: "CAMPO GRANDE/MS - 08/04/2023", value: "CAMPO GRANDE/MS" },
  { label: "MARINGÁ/PR - 08/04/2023", value: "MARINGÁ/PR" },
  { label: "MACAÉ/RJ - 08/04/2023", value: "MACAÉ/RJ" },
  { label: "MARABÁ/PA - 09/04/2023", value: "MARABÁ/PA" },
  {
    label: "VITÓRIA DA CONQUISTA/BA - 15/04/2023",
    value: "VITÓRIA DA CONQUISTA/BA",
  },
  { label: "VARGINHA/MG - 15/04/2023", value: "VARGINHA/MG" },
  { label: "BELÉM/PA - 15/04/2023", value: "BELÉM/PA" },
  { label: "SINOP/MT - 15/04/2023", value: "SINOP/MT" },
  { label: "VITÓRIA/ES - 16/04/2023", value: "VITÓRIA/ES" },
  { label: "IPATINGA/MG - 15/04/2023", value: "IPATINGA/MG" },
  { label: "OSASCO/SP - 15/04/2023", value: "OSASCO/SP" },
  { label: "GUARULHOS/SP - 15/04/2023", value: "GUARULHOS/SP" },
  { label: "PORTO VELHO/RO - 16/04/2023", value: "PORTO VELHO/RO" },
  { label: "GOIÂNIA/GO - 16/04/2023", value: "GOIÂNIA/GO" },
  { label: "BARRA FUNDA/SP - 22/04/2023", value: "BARRA FUNDA/SP" },
  { label: "ARACAJU/SE - 22/04/2023", value: "ARACAJU/SE" },
  { label: "MACAPÁ/AP - 22/04/2023", value: "MACAPÁ/AP" },
  { label: "BARUERI/SP - 29/04/2023", value: "BARUERI/SP" },
  { label: "FOZ DO IGUAÇU/PR - 29/04/2023", value: "FOZ DO IGUAÇU/PR" },
  { label: "GOIÂNIA/GO - 30/04/2023", value: "GOIÂNIA/GO" },
  { label: "DIVINÓPOLIS/MG - 06/05/2023", value: "DIVINÓPOLIS/MG" },
  { label: "MONTES CLAROS/MG - 06/05/2023", value: "MONTES CLAROS/MG" },
  {
    label: "APARECIDA DE GOIÂNIA/GO - 07/05/2023",
    value: "APARECIDA DE GOIÂNIA/GO",
  },
  { label: "DOURADOS/MS - 28/05/2023", value: "DOURADOS/MS" },
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
  onRefSubmit,
  onLeadSent,
}: FormPersonalDataProps) => {
  const ref = useRef();
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: initialData });

  const [cities, setCities] = useState<{ label: string; value: string }[]>([]);
  const [defaultCity, setDefaultCity] = useState("");
  const [enableAddress, setEnableAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [leadSent, setLeadSent] = useState(false);

  const fetchCities = async (state: string) => {
    try {
      const stateCities = await fetchCitiesByState(state);
      setCities(
        stateCities.data.map((city) => ({ label: city.nome, value: city.nome }))
      );

      if (defaultCity) {
        setTimeout(() => {
          setValue("city", defaultCity);

          setDefaultCity("");
        }, 50);
      }
    } catch (err) {
      console.log(err);
      notification.error({
        message: "Erro ao buscar cidades",
        duration: 3.5,
        description: "Não foi possível buscar as cidades.",
      });
    }
  };

  const handleBlurZipCode = async (event: any) => {
    const cepValue = event.target.value;

    if (!cepValue) {
      return;
    }

    setDefaultCity("");

    try {
      const { data } = await fetchLocationByZipCode(
        OnlyNumber(event.target.value)
      );

      setDefaultCity(data.localidade);

      setValue("state", data.uf);
      setValue("neighborhood", data.bairro);
      setValue("address", data.logradouro);
    } catch (err) {
      console.log(err);
      notification.error({
        message: "Erro ao buscar localização pelo cep",
        duration: 3.5,
        description:
          "Ocorreu um erro ao buscar localização pelo cep. Mas, você pode digitar os dados manualmente",
      });
    } finally {
      setEnableAddress(true);
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      await saveLead({
        ...data,
        phone: data.phone_number,
      });

      await triggerlead({
        name: data.name,
        email: data.email,
        phone: data.phone_number,
        tag: "Lead_name",
      } as LeadTag);

      await triggerlead({
        name: data.name,
        email: data.email,
        phone: data.phone_number,
        tag: "Lead_ic_all",
      } as LeadTag);
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

  const handleChangeState = (state: string) => {
    fetchCities(state);
  };

  const watchState = useWatch({
    control,
    name: "state",
  });

  const watchAll = useWatch({ control });

  useEffect(() => {
    if (watchState) {
      handleChangeState(watchState);
    }
  }, [watchState]);

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
        {/* <Row className="input-row">
          <Col span={24}>
            <InputRegistered
              label="CPF"
              name="cpf"
              rules={{ required: true, maxLength: 255 }}
              errors={errors}
              control={control}
              masker={cpfMask}
            />
          </Col>
        </Row> */}
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

        {/* <Row className="input-row">
          <Col span={11}>
            <InputRegistered
              style={{ width: "93%" }}
              label="Data de Nascimento"
              name="birth_date"
              type="tel"
              rules={{ required: true, maxLength: 255 }}
              errors={errors}
              control={control}
              masker={dateMask}
            />
          </Col>
          <Col span={8}>
            <InputRegistered
              label="Sexo"
              name="genre"
              input_type="select"
              options={[
                { label: "Masculino", value: "M" },
                { label: "Feminino", value: "F" },
              ]}
              rules={{ required: true }}
              errors={errors}
              control={control}
            />
          </Col>
        </Row> */}
        {/* <Row className="input-row">
          <Col span={24}>
            <InputRegistered
              label="CEP"
              name="zipcode"
              rules={{ required: true }}
              errors={errors}
              control={control}
              masker={zipCodeMask}
              onBlur={handleBlurZipCode}
            />
          </Col>
        </Row> */}
        {/* {enableAddress && (
          <>
            <Row className="input-row">
              <Col span={24}>
                <InputRegistered
                  label="Estado"
                  name="state"
                  input_type="select"
                  options={BRASIL_STATES}
                  rules={{ required: true }}
                  errors={errors}
                  control={control}
                />
              </Col>
            </Row>
            <Row className="input-row">
              <Col span={24}>
                <InputRegistered
                  label="Cidade"
                  name="city"
                  input_type="select"
                  options={cities}
                  rules={{ required: true }}
                  errors={errors}
                  control={control}
                />
              </Col>
            </Row>
            <Row className="input-row">
              <Col span={24}>
                <InputRegistered
                  label="Bairro"
                  name="neighborhood"
                  type="text"
                  rules={{ required: true, maxLength: 255 }}
                  errors={errors}
                  control={control}
                />
              </Col>
            </Row>
            <Row className="input-row">
              <Col span={24}>
                <InputRegistered
                  label="Logradouro"
                  name="address"
                  type="text"
                  rules={{ required: true, maxLength: 255 }}
                  errors={errors}
                  control={control}
                />
              </Col>
            </Row>
            <Row className="input-row">
              <Col span={24}>
                <InputRegistered
                  label="Número"
                  name="number"
                  type="tel"
                  rules={{ required: true, maxLength: 6 }}
                  errors={errors}
                  control={control}
                />
              </Col>
            </Row>
            <Row className="input-row">
              <Col span={24}>
                <InputRegistered
                  label="Complemento"
                  name="complement"
                  type="text"
                  rules={{ maxLength: 255 }}
                  errors={errors}
                  control={control}
                />
              </Col>
            </Row>
          </>
        )} */}

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
