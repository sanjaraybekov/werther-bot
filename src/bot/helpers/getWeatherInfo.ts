import axios from "axios";
import { API_KEY } from "../constants/api_keys";

export const getWeatherInfo = async (location: any[]) => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location[1]}&lon=${location[0]}&units=metric&lang=ru&appid=${API_KEY}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return console.log(err);
    });
};
