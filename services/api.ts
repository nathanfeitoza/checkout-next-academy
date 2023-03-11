import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://nextacademy.com.br/api"
})

export default axiosInstance;
