import { Input, Label, Select } from "../../styles/Global";
import { Container, ErrorText } from "./styles";

export interface InputOptions {
  label: string;
  value: string;
}

export interface InputRegisteredProps {
  name: string;
  register: (name: string, rules?: Record<string, any>) => any;
  label?: string;
  rules?: Record<string, any>;
  errors?: Record<string, any>;
  input_type?: "input" | "select";
  options?: InputOptions[];
  style?: Record<string, any>;
  type?: string;
  placeholder?: string;
}

const parseMessageError = (
  errorObject: { type: string; message: string },
  name: string,
  label: string
) => {
  console.log(errorObject)
  const error: any = errorObject || {}
  const errorNamedObject = error[name] || {};
  const errorByType: any = {
    required: `${label || name} é obrigatório`,
    default: `${label|| name} não é válido`
  }
  const type = errorNamedObject.type;

  if (errorNamedObject.message) {
    return errorNamedObject.message;
  }

  return errorByType[type || "default"];
};

export const InputRegistered = ({
  name,
  register,
  label,
  rules,
  errors,
  input_type,
  options,
  type,
  ...args
}: InputRegisteredProps) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}

      {input_type !== "select" && (
        <Input {...args} {...register(name, rules)} type={type || "text"} />
      )}
      {input_type === "select" && (
        <Select {...args} {...register(name, rules)}>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      )}
      {(errors || {})[name] && (<ErrorText>{parseMessageError(errors as any, name, label as string)}</ErrorText>)}
    </Container>
  );
};
