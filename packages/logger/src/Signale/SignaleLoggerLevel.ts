import { DefaultMethods } from "signale";
import { LogLevel } from "../LogLevel";

export type SignaleLoggerLevel = {
  [key in LogLevel]: DefaultMethods;
};
