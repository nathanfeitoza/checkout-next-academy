import { Layout, Row, Col, notification } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PersonalData } from "../../models/personalData";
import { fetchCitiesByState } from "../../services/location";
import { DefaultButton, SectionTitle } from "../../styles/Global";
import { cpfMask, dateMask, phoneMask } from "../../utils/mask";
import { CenterLayout } from "../CenterLayout";
import { InputRegistered } from "../InputRegistered";

export interface FormPersonalDataProps {
  onContinue: (personalData: PersonalData) => void;
  initialData?: PersonalData;
}

const BRASIL_STATES = [
  {value: "", label: ""},
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
}: FormPersonalDataProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: initialData });

  const [cities, setCities] = useState<{label: string; value: string}[]>([]);

  const fetchCities = async (state: string) => {
    try {
      const stateCities = await fetchCitiesByState(state);
      setCities(
        stateCities.data.map((city) => ({ label: city.nome, value: city.nome }))
      );
    } catch (err) {
      console.log(err);
      notification.error({
        message: 'Erro ao buscar cidades',
        duration: 3.5,
        description:
          'Não foi possível buscar as cidades.',
      });
    }
  };

  const onSubmit = (data: any) => {
    onContinue(data);
  };

  const handleChangeState = (event: any) => {
    const state = event.target.value;
    fetchCities(state);
  }

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
              name="phone"
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
              label="Estado"
              name="state"
              input_type="select"
              options={BRASIL_STATES}
              onChange={handleChangeState}
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
            <DefaultButton htmlType="submit">Continuar →</DefaultButton>
          </Col>
        </Row>
      </form>
    </CenterLayout>
  );
};
