import winston from "winston";

const logFormat = (label) =>
  winston.format.combine(
    winston.format.prettyPrint(),
    winston.format.colorize(),
    winston.format.align(),
    winston.format.printf((info) => {
      if (info.user) {
        return `[${info.user} - ${info.level}]: ${info.message}`;
      }

      return `[${info.level}]: ${info.message}`;
    })
  );

export const createLogger = (label, user) =>
  winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [new winston.transports.Console({ format: logFormat(label) })],
    defaultMeta: { user },
  });
