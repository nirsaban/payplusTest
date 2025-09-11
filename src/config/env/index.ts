import dotenv from "dotenv";
import devConfig from "./dev";
import prodConfig from "./prod";
import testConfig from "./test";
import {AppConfig} from "../core/types/interface/appConfig";

const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });

// environment map
const CONFIG_MAP: Record<string, AppConfig> = {
    development: devConfig,
    production: prodConfig,
    test: testConfig,
};

// fallback to development if unknown NODE_ENV
export const ENV: AppConfig =
    CONFIG_MAP[process.env.NODE_ENV || "development"] || devConfig;
