import { useEffect, useState } from "react";
import { Control, Controller, UseControllerProps } from "react-hook-form";

import { Input, Label, Select } from "../../styles/Global";
import { MaskerObject } from "../../types/maskerType";
import { EventType } from "../../utils/masker";
import { Container, ErrorText } from "./styles";

export interface InputOptions {
  label: string;
  value: string;
}

export interface InputRegisteredProps {
  name: string;
  control: Control<any>;
  label?: string;
  rules?: Record<string, any>;
  errors?: Record<string, any>;
  input_type?: "input" | "select";
  options?: InputOptions[];
  style?: Record<string, any>;
  type?: string;
  placeholder?: string;
  onChange?: (event: EventType) => void;
  onBlur?: (event: EventType) => void;
  masker?: MaskerObject;
  value?: any;
  isArray?: boolean;
  arrayKey?: string;
  hiddenLabel?: boolean;
}

const transformValue = (value: any, masker?: MaskerObject): string => {
  return masker ? masker.maskInput(value || "") : value;
};

const parseMessageError = (
  errorObject: { type: string; message: string },
  name: string,
  label: string
) => {
  console.log(errorObject);
  const error: any = errorObject || {};
  const errorNamedObject = error[name] || {};
  const errorByType: any = {
    required: `${label || name} é obrigatório`,
    default: `${label || name} não é válido`,
  };
  const type = errorNamedObject.type;

  if (errorNamedObject.message) {
    return errorNamedObject.message;
  }

  return errorByType[type || "default"];
};

export const InputRegistered = ({
  name,
  label,
  rules,
  errors,
  input_type,
  options,
  type,
  value,
  masker,
  onChange,
  onBlur,
  control,
  isArray,
  arrayKey,
  hiddenLabel,
  ...args
}: InputRegisteredProps) => {
  const handleOnChange = (
    event: EventType,
    onChangeEvent: (value: any) => void
  ) => {
    onChangeEvent(event);
    onChange && onChange(event);
  };

  const handleOnBlur = (event: any, onBlurEvent: (event: any) => void) => {
    onBlurEvent(event);
    onBlur && onBlur(event);
  };

  return (
    <Container>
      {(label && !hiddenLabel) && <Label>{label}</Label>}

      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => {
          if (input_type === "select") {
            return (
              <Select
                {...args}
                value={value}
                onChange={(event: any) => handleOnChange(event, onChange)}
                onBlur={(event: any) => handleOnBlur(event, onBlur)}
              >
                {options?.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            );
          }

          return (
            <Input
              {...args}
              value={transformValue(value, masker)}
              onChange={(event: any) => handleOnChange(event, onChange)}
              onBlur={(event: any) => handleOnBlur(event, onBlur)}
              type={type || "text"}
            />
          );
        }}
        name={name}
      />

      {(errors || {})[name] && (
        <ErrorText>
          {parseMessageError(errors as any, name, label as string)}
        </ErrorText>
      )}

      {(errors || {})[arrayKey || ''] && (
        <ErrorText>
          {parseMessageError(errors as any, (arrayKey || ''), label as string)}
        </ErrorText>
      )}
    </Container>
  );
};
