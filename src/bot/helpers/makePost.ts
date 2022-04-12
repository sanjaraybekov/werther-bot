import { getDate } from "./garDate";
import { getWeatherInfo } from "./getWeatherInfo";

export const makePost = async (districts: any, ctx: any, type: string) => {
  const data = await getWeatherInfo(
    [districts?.latitude, districts?.langitude] || []
  );
  return `✅ Tanlangan manzil: <b>${
    data.name
  }</b>\n🕔 Hozirgi vaqt: <b>${getDate()}</b>\n🌤 Havo harorati: <b>${Math.round(
    data.main.temp
  )}°C</b>\n🌈 Havo: <b>${data.weather[0].main} ${
    data.weather[0].description
  }</b>\n💨 Shamol tezligi: <b>${data.wind.speed} km/soat</b>\n💧 Namlik: <b>${
    data.main.humidity
  }%</b>\n\n@${ctx.me.username} yaqinlaringizni ham taklif qiling 👨‍👩‍👧‍👦`;
};
