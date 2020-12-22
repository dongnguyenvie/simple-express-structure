import { equal } from "assert";
import logger from "./Logger";

export const pErr = (err: Error) => {
  if (err) {
    logger.err(err);
  }
};

export const getRandomInt = () => {
  return Math.floor(Math.random() * 1_000_000_000_000);
};

export const isPromise = (value: any) => {
  return value && value.then && typeof value.then === "function";
};

export const isResponse = (req: any) => {
  return req && req.finished;
};
