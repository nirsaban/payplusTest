import app from "./app";
import { ENV } from "./config/env";
import { sequelize } from "./config/db";
import logger from "./config/logger";

const start = async () => {
    try {
        await sequelize.authenticate();
        logger.info("✅ Database connected");

        app.listen(ENV.PORT, () => {
            logger.info(`🚀 Server running on http://localhost:${ENV.PORT}`);
        });
    } catch (err) {
        logger.error("❌ Unable to connect to the database");
        logger.error(err);
        process.exit(1);
    }
};

start();
