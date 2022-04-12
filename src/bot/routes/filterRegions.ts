import { Router } from "@grammyjs/router";
import { MyContext } from "../types/MyContext";
import { texts } from "../constants/texts";
import { t } from "../i18";
import getButtons from "../helpers/getButtons";
import { regions } from "../constants/regions";
import { makePost } from "../helpers/makePost";

const router = new Router<MyContext>((ctx) => ctx.session.route);

router.route(texts.choose_region, (ctx) => {
  ctx.session.route = texts.choose_district;
  const regionID = ctx.callbackQuery?.data?.split("_")[1];
  const districts = regions.find((region) => region.id === Number(regionID));
  return ctx.editMessageText(
    `${districts?.name} 🤩!  ${t(ctx, texts.choose_district)}`,
    {
      reply_markup: {
        inline_keyboard: [
          ...getButtons(districts?.regions || [], 3, `${regionID}_tuman`),
          [
            {
              text: t(ctx, texts.current_time),
              callback_data: `location_lat=${districts?.latitude}_lon=${districts?.langitude}_${texts.current_time}`,
            },
            {
              text: t(ctx, texts.hourly),
              callback_data: `location_lat=${districts?.latitude}_lon=${districts?.langitude}_${texts.hourly}`,
            },
            {
              text: t(ctx, texts.weekly),
              callback_data: `location_lat=${districts?.latitude}_lon=${districts?.langitude}_${texts.weekly}`,
            },
          ],

          [
            {
              text: t(ctx, texts.change_location),
              callback_data: texts.region,
            },
            {
              text: t(ctx, texts.main_menu),
              callback_data: texts.main_menu,
            },
          ],
        ],
      },
    }
  );
});
router.route(texts.choose_district, async (ctx) => {
  const regionID = ctx.callbackQuery?.data?.split("_")[0];
  const districtID = ctx.callbackQuery?.data?.split("_")[2];
  const type = ctx.callbackQuery?.data?.split("_")[3];
  const districts = regions
    .find((region) => region.id === Number(regionID))
    ?.regions.find((district) => district.id === Number(districtID));
  return ctx.editMessageText(
    `Sizga xizmat ko'rsatishdan mamnunmiz!😊 \n\n${await makePost(
      districts,
      ctx,
      String(type)
    )}`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: t(ctx, texts.hourly),
              callback_data: `location_lat=${districts?.latitude}_lon=${districts?.langitude}_${texts.hourly}`,
            },
            {
              text: t(ctx, texts.weekly),
              callback_data: `location_lat=${districts?.latitude}_lon=${districts?.langitude}_${texts.weekly}`,
            },
          ],
          [
            {
              text: t(ctx, texts.change_location),
              callback_data: texts.region,
            },
          ],
          [
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

export { router };
