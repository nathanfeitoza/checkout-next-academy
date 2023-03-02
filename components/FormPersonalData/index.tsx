import { Layout, Row, Col, notification } from "antd";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { PersonalData } from "../../models/personalData";
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
  { value: "VOLTA REDONDA/RJ", label: "VOLTA REDONDA/RJ - 26/03/2023" },
  { value: "FOZ DO IGUAÇU/PR", label: "FOZ DO IGUAÇU/PR - 26/03/2023" },
  { value: "BARUERI/SP", label: "BARUERI/SP - 26/03/2023" },
  { value: "CUIABÁ/MT", label: "CUIABÁ/MT - 26/03/2023" },
  { value: "SALVADOR/BA-", label: "SALVADOR/BA - 26/03/2023" },
  { value: "SANTO ANDRÉ/SP", label: "SANTO ANDRÉ/SP - 26/03/2023" },
  { value: "CAMPO GRANDE/RJ", label: "CAMPO GRANDE/RJ - 26/03/2023" },
  { value: "BELÉM/PA", label: "BELÉM/PA - 26/03/2023" },
  { value: "NITERÓI/RJ", label: "NITERÓI/RJ - 26/03/2023" },
  { value: "FORTALEZA/CE", label: "FORTALEZA/CE - 26/03/2023" },
  { value: "BAURU/SP", label: "BAURU/SP - 26/02/2023" },
  { value: "MORUMBI/SP", label: "MORUMBI/SP - 19/03/2023" },
  { value: "BOA VISTA/RR", label: "BOA VISTA/RR - 26/02/2023" },
  { value: "ARACAJU/SE", label: "ARACAJU/SE - 04/03/2023" },
  { value: "MONTES CLAROS/MG", label: "MONTES CLAROS/MG - 04/03/2023" },
  { value: "DIVINÓPOLIS/MG", label: "DIVINÓPOLIS/MG - 04/03/2023" },
  { value: "MACEIÓ/AL", label: "MACEIÓ/AL - 05/03/2023" },
  { value: "PORTO VELHO/RO", label: "PORTO VELHO/RO - 04/03/2023" },
  { value: "VITÓRIA/ES", label: "VITÓRIA/ES - 04/03/2023" },
  {
    value: "SÃO JOSÉ DO RIO PRETO/SP",
    label: "SÃO JOSÉ DO RIO PRETO/SP - 05/03/2023",
  },
  { value: "PALMAS/TO", label: "PALMAS/TO - 05/03/2023" },
  { value: "SÃO LUIS/MA", label: "SÃO LUIS/MA - 05/03/2023" },
  { value: "AMERICANA/SP", label: "AMERICANA/SP - 05/03/2023" },
  { value: "RIO BRANCO/AC", label: "RIO BRANCO/AC - 11/03/2023" },
  { value: "MARINGÁ/PR", label: "MARINGÁ/PR - 11/03/2023" },
  { value: "JOINVILLE/SC", label: "JOINVILLE/SC - 11/03/2023" },
  { value: "PONTA GROSSA/PR", label: "PONTA GROSSA/PR - 11/03/2023" },
  { value: "VARGINHA/MG", label: "VARGINHA/MG - 11/03/2023" },
  { value: "OSASCO/SP", label: "OSASCO/SP - 11/03/2023" },
  {
    value: "SÃO PAULO (VILA PRUDENTE)",
    label: "SÃO PAULO (VILA PRUDENTE) - 11/03/2023",
  },
  { value: "COTIA/SP", label: "COTIA/SP - 11/03/2023" },
  { value: "GUARULHOS/SP", label: "GUARULHOS/SP - 11/03/2023" },
  { value: "IPATINGA/MG", label: "IPATINGA/MG - 11/03/2023" },
  { value: "IPATINGA/MG", label: "IPATINGA/MG - 11/03/2023" },
  { value: "MOGI DAS CRUZES/SP", label: "MOGI DAS CRUZES/SP - 11/03/2023" },
  { value: "MACAPÁ/AP", label: "MACAPÁ/AP - 11/03/2023" },
  { value: "MANAUS/AM", label: "MANAUS/AM - 11/03/2023" },
  {
    value: "PRESIDENTE PRUDENTE/SP",
    label: "PRESIDENTE PRUDENTE/SP - 12/03/2023",
  },
  { value: "JUIZ DE FORA/MG", label: "JUIZ DE FORA/MG - 18/03/2023" },
  { value: "LONDRINA/PR", label: "LONDRINA/PR - 18/03/2023" },
  { value: "GOIÂNIA/GO", label: "GOIÂNIA/GO - 19/03/2023" },
  { value: "TERESINA/PI", label: "TERESINA/PI - 19/03/2023" },
  { value: "SANTO ANDRÉ/SP", label: "SANTO ANDRÉ/SP - 25/03/2023" },
  { value: "SINOP/MT", label: "SINOP/MT - 25/03/2023" },
  { value: "PORTO VELHO/RO", label: "PORTO VELHO/RO - 25/03/2023" },
  { value: "VITÓRIA/ES", label: "VITÓRIA/ES - 26/03/2023" },
  { value: "SÃO PAULO (BERRINI)", label: "SÃO PAULO (BERRINI) - 26/03/2023" },
  { value: "MARABÁ/PA", label: "MARABÁ/PA - 09/04/2023" },
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

  const onSubmit = (data: any) => {
    onContinue(data);
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
              onClick={handlePressContinue}
              htmlType="submit"
            >
              Continuar →
            </DefaultButton>
          </Col>
        </Row>
      </form>
    </CenterLayout>
  );
};
