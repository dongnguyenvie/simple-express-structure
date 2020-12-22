// src/validation.ts

import { deserialize, JsonProperty } from "json-typescript-mapper";
import { Validator } from "class-validator";
import { ValidationError } from "class-validator";
import { NextFunction, Request, RequestHandler, Response } from "express";

// Because all type information is erased in the compiled
// JavaScript, we can use this clever structural-typing
// work-around enabled by TypeScript to pass in a class
// to our middleware.
type Constructor<T> = { new (): T };

// This function returns a middleware which validates that the
// request's JSON body conforms to the passed-in type.
export function validate<T>(type: Constructor<T>): RequestHandler {
  let validator = new Validator();

  return (req, res, next) => {
    let input = deserialize(type, req.body);

    let errors = validator.validateSync(input);
    if (errors.length > 0) {
      next(errors);
    } else {
      req.body = input;
      next();
    }
  };
}

// This middleware handles the case where our validation
// middleware says the request failed validation. We return
// those errors to the client here.
export function validationError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof Array && err[0] instanceof ValidationError) {
    res.status(400).json({ errors: err }).end();
  } else {
    next(err);
  }
}
