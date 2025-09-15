export interface AppConfigInterface {
    PORT: number;
    NODE_ENV: string;
    JWT_SECRET: string;
    DATABASE_URL: string;
    LOG_LEVEL: string;
}