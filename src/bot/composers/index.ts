import { Composer } from "grammy";
import { regions } from "../constants/regions";
import { texts } from "../constants/texts";
import getButtons from "../helpers/getButtons";
import { makePost } from "../helpers/makePost";
import { t } from "../i18";
import { main_menu } from "../markups/markups";
import { MyContext } from "../types/MyContext";

const composer = new Composer<MyContext>();

composer.callbackQuery(texts.region, (ctx) => {
  ctx.session.route = texts.choose_region;
  return ctx.editMessageText(t(ctx, texts.choose_region), {
    reply_markup: {
      inline_keyboard: [
        ...getButtons(regions, 3, "region"),
        [{ text: t(ctx, texts.main_menu), callback_data: "main_menu" }],
      ],
    },
    parse_mode: "HTML",
  });
});
// composer.callbackQuery(/^send_lat=(\w+)/, (ctx) => {
//   var regex = /[\d|,|.|e|E|\+]+/g;
//   const location = ctx.callbackQuery.data.match(regex);
//   const arr: any = [];
//   location?.map((element) => {
//     arr.push(element);
//   });
//   return ctx.replyWithLocation(Number(arr[2]), Number(arr[1]));
// });

composer.callbackQuery(/^location_lat=(\w+)/, async (ctx) => {
  var regex = /[\d|,|.|e|E|\+]+/g;
  const location = ctx.callbackQuery.data.match(regex);
  const arr: any = [];
  location?.map((element) => {
    arr.push(element);
  });
  const type = ctx.callbackQuery?.data?.split("_")[3];

  ctx.deleteMessage();
  return ctx.reply(
    `Sizga xizmat ko'rsatishdan mamnunmiz!\n\n${await makePost(
      { latitude: arr[0], langitude: arr[1] },
      ctx,
      String(type)
    )}`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: t(ctx, texts.hourly),
              callback_data: `location_lat=${arr[0]}_lon=${arr[1]}_${texts.hourly}`,
            },
            {
              text: t(ctx, texts.weekly),
              callback_data: `location_lat=${arr[0]}_lon=${arr[1]}_${texts.weekly}`,
            },
          ],
          [
            {
              text: t(ctx, texts.change_location),
              callback_data: texts.region,
            },
          ],
          [
            // {
            //   text: t(ctx, texts.go_back),
            //   callback_data: texts.choose_region,
            // },
            {
              text: t(ctx, texts.main_menu),
              callback_data: texts.main_menu,
            },
          ],
        ],
      },
      parse_mode: "HTML",
    }
  );
});
composer.callbackQuery(texts.main_menu, (ctx) => {
  ctx.session.route = "";
  ctx.deleteMessage();
  return main_menu(ctx);
});

export { composer };
