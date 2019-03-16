import { NgxLoggerLevel } from "ngx-logger";

export const environment = {
  production: true,
  logging: {
    //serverLoggingUrl: "https://devdactic.free.beeceptor.com/logs",
    level: NgxLoggerLevel.INFO,
    serverLogLevel: NgxLoggerLevel.ERROR
  }
};
