import axios from "axios";
import { IbgeCitiesRespose } from "../types/ibgeCitiesType";
import { ZipCodeDataRespose } from "../types/zipcodeDataType";

export const fetchCitiesByState = (
  state: string
): Promise<IbgeCitiesRespose> => {
  return axios.get(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.toLowerCase()}/distritos`
  );
};

export const fetchLocationByZipCode = (
  zipcode: string
): Promise<ZipCodeDataRespose> => {
  return axios.get(`https://viacep.com.br/ws/${zipcode}/json/`);
};
