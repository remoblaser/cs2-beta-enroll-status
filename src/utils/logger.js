import winston from "winston";

const logFormat = (label) =>
  winston.format.combine(
    winston.format.prettyPrint(),
    winston.format.colorize(),
    winston.format.align(),
    winston.format.printf((info) => {
      return `[${info.level}]: ${info.message}`;
    })
  );

export const createLogger = (label) =>
  winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [new winston.transports.Console({ format: logFormat(label) })],
  });
