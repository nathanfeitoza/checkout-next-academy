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
              label="Nome"
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
              label="CPF"
              name="cpf"
              rules={{ required: true, maxLength: 255 }}
              errors={errors}
              control={control}
              masker={cpfMask}
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
        <Row className="input-row">
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
        </Row>
        <Row className="input-row">
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
        </Row>
        {enableAddress && (
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
        )}

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
