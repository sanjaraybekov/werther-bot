import { Router } from "@grammyjs/router";
import { MyContext } from "../types/MyContext";
import { texts } from "../constants/texts";
import { t } from "../i18";
import getButtons from "../helpers/getButtons";
import { regions } from "../constants/regions";
import { makePost } from "../helpers/makePost";
import { Keyboard } from "grammy";

const router = new Router<MyContext>((ctx) => ctx.session.route);

router.route(texts.choose_region, (ctx) => {
  ctx.session.route = texts.choose_district;
  const regionID = ctx.callbackQuery?.data?.split("_")[1];
  const districts = regions.find((region) => region.id === Number(regionID));
  return ctx.editMessageText(
    `${districts?.name} 🤩!  ${texts.choose_district}`,
    {
      reply_markup: {
        inline_keyboard: [
          ...getButtons(districts?.regions || [], 3, `${regionID}_tuman`),
          [
            {
              text: `${districts?.name} ${t(ctx, texts.around)}`,
              callback_data: `location_lat=${districts?.latitude}_lon=${districts?.langitude}`,
            },
          ],
          [
            { text: t(ctx, texts.go_back), callback_data: texts.region },
            { text: t(ctx, texts.main_menu), callback_data: texts.main_menu },
          ],
        ],
      },
    }
  );
});
router.route(texts.choose_district, async (ctx) => {
  const regionID = ctx.callbackQuery?.data?.split("_")[0];
  const districtID = ctx.callbackQuery?.data?.split("_")[2];
  const districts = regions
    .find((region) => region.id === Number(regionID))
    ?.regions.find((district) => district.id === Number(districtID));
  return ctx.editMessageText(
    `Sizga xizmat ko'rsatishdan mamnunmiz!😊 \n\n${await makePost(
      districts,
      ctx
    )}`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: t(ctx, texts.weekly),
              callback_data: texts.weekly,
            },
            {
              text: t(ctx, texts.half_mounth),
              callback_data: texts.half_mounth,
            },
            {
              text: t(ctx, texts.mounth),
              callback_data: texts.mounth,
            },
          ],
          [
            {
              text: t(ctx, texts.location),
              callback_data: `send_lat=${districts?.latitude}_lon=${districts?.langitude}`,
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
