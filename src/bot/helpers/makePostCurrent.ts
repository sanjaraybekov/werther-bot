import { getDate } from "./garDate";

export const makePostCurrent = (data: any, ctx: any) => {
  return `✅ Tanlangan manzil: <b>${
    data.city_name
  }</b>\n🕔 Hozirgi vaqt: <b>${getDate()}</b>\n🌤 Havo harorati: <b>${Math.round(
    data.temp
  )}°C</b>\n🌈 Havo: <b>${
    data.weather.description
  }</b>\n💨 Shamol tezligi: <b>${data.wind_spd}m/s</b>\n💧 Namlik: <b>${
    data.rh
  }%</b>\n☁️ Bulut qoplamasi kengligi: <b>${
    data.clouds
  }%</b>\n🌅 Quyosh chiqishi: <b>${data.sunrise}</b>\n🌄 Quyosh botishi: <b>${
    data.sunset
  }</b>\n\n\n@${ctx.me.username} yaqinlaringizni ham taklif qiling 👨‍👩‍👧‍👦`;
};
