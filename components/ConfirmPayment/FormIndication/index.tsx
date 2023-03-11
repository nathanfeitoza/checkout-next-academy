import { Col, notification, Row } from "antd";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { IndicateFriend } from "../../../services/contact";
import { DefaultButton } from "../../../styles/Global";
import { InputRegistered } from "../../InputRegistered";
import { ButtonMoreInputs } from "../styles";

let gerado = false;

export const FormIndication = () => {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "friends", // unique name for your Field Array
  });

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      await IndicateFriend(data)
      notification.success({
        message: "Amigos indicados com sucesso",
        duration: 3.5,
        description:
          "Recebemos as indicações dos seus amigos. Obrigado!",
      });
      reset();
    } catch (err) {
      console.log(err)
      notification.error({
        message: "Erro ao enviar recomendação",
        duration: 3.5,
        description:
          "Ocorreu um erro ao enviar recomendação. Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false)
    }
  };
  useEffect(() => {
      if (!gerado) {
        for (let i = 0; i < 5; i++) {
          append({ friend: '' });
        }
        gerado = true;
      }
  }, [])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
              <Row key={field.id} className="input-row">
              <Col span={12} offset={6}>
                <InputRegistered
                  label="Amigo"
                  hiddenLabel={true}
                  name={`friends.${index}.friend`}
                  rules={{ required: true }}
                  errors={errors}
                  control={control}
                  placeholder="E-mail do amigo"
                  isArray={true}
                  arrayKey={'friends'}
                />
              </Col>
            </Row>
      ))}
      <Row>
        <Col span={12} offset={12}>
          <ButtonMoreInputs onClick={() => append({ friend: '' })} type="button">+</ButtonMoreInputs>
        </Col>
      </Row>
      <Row className="input-row">
        <Col span={12} offset={6}>
          <DefaultButton htmlType="submit" loading={loading}>
            Enviar
          </DefaultButton>
        </Col>
      </Row>
    </form>
  );
};
