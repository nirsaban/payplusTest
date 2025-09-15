import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { scopePerRequest, loadControllers } from "awilix-express";
import container from "./container";
import { errorHandler } from "./core/middleware/errorHandler";
import { requestLogger } from "./core/middleware/requestLogger";

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(requestLogger);

// Awilix per-request scope
app.use(scopePerRequest(container));

// Load all controllers automatically
app.use(loadControllers("modules/**/*.controller.ts", { cwd: __dirname }));

// Error handler (must be last)
app.use(errorHandler);

export default app;
