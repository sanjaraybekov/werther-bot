import axios from "axios";
import { API_KEY } from "../constants/api_keys";
// &include=minutely

export const getWeatherInfoHourly = async (location: any[]) => {
  return axios
    .get(
      `https://api.weatherbit.io/v2.0/forecast/hourly?lat=${location[1]}&lon=${location[0]}&key=${API_KEY}&hours=24`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return console.log(err);
    });
};
