import { getDate } from "./garDate";
import { getWeatherInfo } from "./getWeatherInfo";

export const makePost = async (districts: any, ctx: any) => {
  const data = await getWeatherInfo(
    [districts?.latitude, districts?.langitude] || []
  );
  return `Tanlangan manzil: ${
    data.name
  }\nHozirgi vaqt: ${getDate()}\nHavo harorati: ${Math.round(
    data.main.temp
  )}°C\nHavo: ${data.weather[0].main} ${
    data.weather[0].description
  }\nShamol tezligi: ${data.wind.speed} km/soat\nNamlik: ${
    data.main.humidity
  }%\n\n@${ctx.me.username}`;
};
