import axios from "axios";
import { IbgeCitiesRespose } from "../types/ibgeCitiesType";

export const fetchCitiesByState = (
  state: string
): Promise<IbgeCitiesRespose> => {
  return axios.get(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.toLowerCase()}/distritos`
  );
};
