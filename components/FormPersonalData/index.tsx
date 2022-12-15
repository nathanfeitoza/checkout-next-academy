import { Layout, Row, Col } from "antd";
import { useForm } from "react-hook-form";
import { PersonalData } from "../../models/personalData";
import { DefaultButton, SectionTitle } from "../../styles/Global";
import { CenterLayout } from "../CenterLayout";
import { InputRegistered } from "../InputRegistered";

export interface FormPersonalDataProps {
  onContinue: (personalData: PersonalData) => void;
  initialData?: PersonalData;
}

const STATES = ["SP"]
const CITYS: any = {
  SP: ["Americana / SP", "São Paulo"]
}

export const FormPersonalData = ({
  onContinue,
  initialData,
}: FormPersonalDataProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: initialData });
  const onSubmit = (data: any) => {
    console.log(data)
    onContinue(data);
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
              register={register as any}
              rules={{ required: true, maxLength: 255 }}
              errors={errors}
            />
          </Col>
        </Row>
        <Row className="input-row">
          <Col span={24}>
            <InputRegistered
              label="CPF"
              name="document"
              register={register as any}
              rules={{ required: true, maxLength: 14 }}
              errors={errors}
            />
          </Col>
        </Row>
        <Row className="input-row">
          <Col span={24}>
            <InputRegistered
              label="Celular / Whatsapp"
              name="phone"
              register={register as any}
              rules={{ required: true, maxLength: 14 }}
              errors={errors}
            />
          </Col>
        </Row>
        <Row className="input-row">
          <Col span={24}>
            <InputRegistered
              label="Email"
              name="email"
              register={register as any}
              rules={{ required: true, maxLength: 14 }}
              errors={errors}
            />
          </Col>
        </Row>
        <Row className="input-row">
          <Col span={11}>
            <InputRegistered
              style={{ width: "93%" }}
              label="Data de Nascimento"
              name="birth_date"
              register={register as any}
              rules={{ required: true, maxLength: 14 }}
              errors={errors}
            />
          </Col>
          <Col span={8}>
            <InputRegistered
              label="Sexo"
              name="genre"
              input_type="select"
              options={[{ label: "Masculino", value: "M" }, {label: "Feminino", value: "F"}]}
              register={register as any}
              rules={{ required: true, maxLength: 14 }}
              errors={errors}
            />
          </Col>
        </Row>
        <Row className="input-row">
          <Col span={24}>
            <InputRegistered
              label="Estado"
              name="state"
              input_type="select"
              options={STATES.map(state => ({ label: state, value: state }))}
              register={register as any}
              rules={{ required: true, maxLength: 14 }}
              errors={errors}
            />
          </Col>
        </Row>
        <Row className="input-row">
          <Col span={24}>
            <InputRegistered
              label="Cidade"
              name="city"
              input_type="select"
              options={CITYS[watch("state") || "SP"].map((city: any) => ({ label: city, value: city }))}
              register={register as any}
              rules={{ required: true, maxLength: 14 }}
              errors={errors}
            />
          </Col>
        </Row>

        <Row className="input-row">
          <Col span={24}>
            <DefaultButton type="submit">Continuar →</DefaultButton>
          </Col>
        </Row>

      </form>
    </CenterLayout>
  );
};
