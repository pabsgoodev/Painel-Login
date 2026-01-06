import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const rateLimit = require("express-rate-limit");

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false
});
