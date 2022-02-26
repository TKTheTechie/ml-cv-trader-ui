import {default as pino} from "../../_snowpack/pkg/pino.js";
export const log = pino({
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: true
    }
  },
  name: "app-name",
  level: "info"
});
