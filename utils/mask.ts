import IMask from "imask";
import * as dateFns from "date-fns";
import masker from "./masker";

const dateFormatClient = "dd/MM/yyyy";
const dateFormatApi = "yyyy-MM-dd";

export const dateMask = masker({
  masked: {
    mask: Date,
    pattern: dateFormatClient,
    blocks: {
      dd: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 31,
        maxLength: 2
      },
      MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
        maxLength: 2
      },
      yyyy: {
        mask: IMask.MaskedRange,
        from: 1900,
        to: 9999
      }
    },
    format: (date: Date) => {
      return dateFns.format(date, dateFormatClient);
    },
    parse: (dateStr: string) => {
      return dateFns.parse(dateStr, dateFormatClient, new Date());
    }
  },
  transform: (value: string) => {
    if (!value) {
      return value;
    }
    const date = dateFns.parse(value, dateFormatClient, new Date());
    return dateFns.format(date, dateFormatApi);
  },
  maskDefault: (value: string) => {
    return dateFns.format(
      dateFns.parse(value, dateFormatApi, new Date()),
      dateFormatClient
    );
  }
});

export const cpfOrCnpjMask = masker({
  masked: {
    mask: [
      {
        mask: "000.000.000-00",
        type: "CPF"
      },
      {
        mask: "00.000.000/0000-00",
        type: "CNPJ"
      }
    ],
    dispatch: (appended: any, dynamicMasked: any) => {
      const cpfMask = dynamicMasked.compiledMasks.find(
        ({ type }: { type: string }) => type === "CPF"
      );

      const cnpjMask = dynamicMasked.compiledMasks.find(
        ({ type }: { type: string }) => type === "CNPJ"
      );

      if (`${dynamicMasked.value}${appended}`.length > cpfMask.mask.length) {
        return cnpjMask;
      }

      return cpfMask;
    }
  }
});

export const cpfMask = masker({
  masked: {
    mask: "000.000.000-00",
    transform: (value: string) => {
      return cpfMask.unmask(value);
    },
    maskDefault: (value: number) => {
      return cpfMask.mask(value);
    }
  }
});

export const cepMask = masker({
  masked: {
    mask: "00000-000",
    transform: (value: string) => {
      return cepMask.unmask(value);
    },
    maskDefault: (value: number) => {
      return cepMask.mask(value);
    }
  }
});

export const cardDueMask = masker({
  masked: {
    mask: "00/00",
    transform: (value: string) => {
      return cardDueMask.unmask(value);
    },
    maskDefault: (value: number) => {
      return cardDueMask.mask(value);
    }
  }
});

export const cardNumberMask = masker({
  masked: {
    mask: "0000 0000 0000 0000",
    transform: (value: string) => {
      return cardNumberMask.unmask(value);
    },
    maskDefault: (value: number) => {
      return cardNumberMask.mask(value);
    }
  }
});

export const cardCvvMask = masker({
  masked: {
    mask: "000",
    transform: (value: string) => {
      return cardCvvMask.unmask(value);
    },
    maskDefault: (value: number) => {
      return cardCvvMask.mask(value);
    }
  }
});

export const phoneMask = masker({
  masked: {
    mask: [
      {
        mask: "(00) 0000-0000",
        phone: "landline"
      },
      {
        mask: "(00) 00000-0000",
        phone: "mobile"
      }
    ],
    dispatch: (appended: any, dynamicMasked: any) => {
      const landlineMask = dynamicMasked.compiledMasks.find(
        ({ phone }: any) => phone === "landline"
      );

      const mobileMask = dynamicMasked.compiledMasks.find(
        ({ phone }: any) => phone === "mobile"
      );

      if (
        `${dynamicMasked.value}${appended}`.length > landlineMask.mask.length
      ) {
        return mobileMask;
      }

      return landlineMask;
    }
  }
});

export const currencyMask = masker({
  masked: {
    mask: "R$ num{,}cents",
    blocks: {
      num: {
        mask: Number,
        signed: true,
        thousandsSeparator: ".",
        mapToRadix: [""],
        scale: 0
      },
      cents: {
        mask: "00",
        normalizeZeros: true,
        padFractionalZeros: true
      }
    }
  },
  transform: (value: string) => {
    return Number(currencyMask.unmask(value).replace(",", "."));
  },
  maskDefault: (value: number) => {
    return currencyMask.mask(value.toFixed(2).replace(".", ","));
  }
});
