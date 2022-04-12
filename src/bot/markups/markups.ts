import { texts } from "../constants/texts";
import { t } from "../i18";
import { MyContext } from "../types/MyContext";

export const main_menu = (ctx: MyContext) => {
  return ctx.reply(
    `Assalomu Aleykum ${ctx.from?.first_name}! ` + t(ctx, texts.main_text),
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: t(ctx, texts.region),
              callback_data: texts.region,
            },
          ],
        ],
      },
      parse_mode: "HTML",
    }
  );
};
