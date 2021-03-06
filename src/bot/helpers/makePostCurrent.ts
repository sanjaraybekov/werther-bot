import { getDate } from "./garDate";

export const makePostCurrent = (data: any, ctx: any) => {
  return `โ Tanlangan manzil: <b>${
    data.city_name
  }</b>\n๐ Hozirgi vaqt: <b>${getDate()}</b>\n๐ค Havo harorati: <b>${Math.round(
    data.temp
  )}ยฐC</b>\n๐ Havo: <b>${
    data.weather.description
  }</b>\n๐จ Shamol tezligi: <b>${data.wind_spd}m/s</b>\n๐ง Namlik: <b>${
    data.rh
  }%</b>\nโ๏ธ Bulut qoplamasi kengligi: <b>${
    data.clouds
  }%</b>\n๐ Quyosh chiqishi: <b>${data.sunrise}</b>\n๐ Quyosh botishi: <b>${
    data.sunset
  }</b>\n\n\n@${ctx.me.username} yaqinlaringizni ham taklif qiling ๐จโ๐ฉโ๐งโ๐ฆ`;
};
