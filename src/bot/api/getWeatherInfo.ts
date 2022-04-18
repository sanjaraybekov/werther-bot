import axios from "axios";
import { API_KEY } from "../constants/api_keys";
export const getWeatherInfo = async (location: any[]) => {
  return axios
    .get(
      `https://api.weatherbit.io/v2.0/current?lat=${location[1]}&lon=${location[0]}&key=${API_KEY}&lang=ru`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return console.log(err);
    });
};
