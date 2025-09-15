import {AppConfigInterface} from "../../core/types/interface/config/appConfig.interface";

const devConfig: AppConfigInterface = {
    PORT: parseInt(process.env.PORT || "4000", 10),
    NODE_ENV: "development",
    JWT_SECRET: process.env.JWT_SECRET || "dev_secret",
    DATABASE_URL: process.env.DATABASE_URL || "",
    LOG_LEVEL: "debug",
};

export default devConfig;