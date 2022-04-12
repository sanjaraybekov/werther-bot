import { session } from "grammy";
import { DEVELOPER_ID } from "../config";
import bot from "./core/bot";
import { main_menu } from "./markups/markups";
import i18n from "./i18";
import { router as filterRegions } from "./routes/filterRegions";
import { composer } from "./composers";

export const loadBot = () => {
  bot.use(
    session({
      initial: () => ({
        user: {},
        route: "",
        msg_id_to_delete: 0,
      }),
    })
  );
  bot.use(i18n.middleware());
  bot.command("start", (ctx) => main_menu(ctx));
  bot.use(composer);
  bot.use(filterRegions);
  bot.start();

  bot.api.sendMessage(DEVELOPER_ID, "bot started /start");
};
