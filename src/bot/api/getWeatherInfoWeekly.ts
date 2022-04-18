import axios from "axios";
import { API_KEY } from "../constants/api_keys";

export const getWeatherInfoWeekly = async (location: any[]) => {
  return axios
    .get(
      `https://api.weatherbit.io/v2.0/history/daily?lat=${location[1]}&lon=${location[0]}&start_date=2022-04-14&end_date=2022-04-15&lang=ru&key=${API_KEY}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return console.log(err);
    });
};
