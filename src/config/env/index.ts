import dotenv from "dotenv";
import devConfig from "./dev";
import {AppConfigInterface} from "../../core/types/interface/config/appConfig.interface";

const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });

const CONFIG_MAP: Record<string, AppConfigInterface> = {
    development: devConfig,
};

// fallback to devConfig if invalid
export const ENV: AppConfigInterface =
    CONFIG_MAP[process.env.NODE_ENV || "development"] || devConfig;