import { getWeatherInfo } from "../api/getWeatherInfo";
import { getWeatherInfoHourly } from "../api/getWeatherInfoHourly";
import { getWeatherInfoWeekly } from "../api/getWeatherInfoWeekly";
import { makePostCurrent } from "./makePostCurrent";
import { makePostHourly } from "./makePostHourly";
import { makePostWeekly } from "./makePostWeekly";

export const makePost = async (districts: any, ctx: any, type: string) => {
  var data: any = [];
  var dataArr: any = [];
  switch (type) {
    case "current":
      data = await getWeatherInfo(
        [districts?.latitude, districts?.langitude] || []
      );
      return makePostCurrent(data.data[0], ctx);

    case "hourly":
      data = await getWeatherInfoHourly(
        [districts?.latitude, districts?.langitude] || []
      );
      return makePostHourly(data.data[0], ctx);
    case "weekly":
      // for (let index = 0; index < 7; index++) {
      data = await getWeatherInfoWeekly(
        [districts?.latitude, districts?.langitude] || []
      );
      dataArr.push(data.data[0]);
      // }
      return makePostWeekly(dataArr, ctx);
    default:
      data = await getWeatherInfo(
        [districts?.latitude, districts?.langitude] || []
      );
      return makePostCurrent(data.data[0], ctx);
  }
};
// <img src="https://www.weatherbit.io/static/img/icons/${
//     weather.icon
//   }.png"/>
