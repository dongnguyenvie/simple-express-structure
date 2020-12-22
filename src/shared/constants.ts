import { Request } from "express";

export const paramMissingError =
  "One or more of the required parameters was missing.";

// export interface IRequest extends Request {
//   body: {
//     user: IUser;
//   };
// }

export const DECORATOR_PREFIX = "__express_meta__";

export const DECORATOR_CONTROLLER = {
  prefix: DECORATOR_PREFIX + "prefix",
  routes: DECORATOR_PREFIX + "routes",
  params: DECORATOR_PREFIX + "params",
};

export const DECORATOR_REST_FULL = {
  get: DECORATOR_PREFIX + "get",
  post: DECORATOR_PREFIX + "post",
  put: DECORATOR_PREFIX + "put",
  delete: DECORATOR_PREFIX + "delete",
};

export enum ParameterType {
  REQUEST,
  RESPONSE,
  PARAMS,
  NUM_PARAM,
  QUERY,
  NUM_QUERY,
  BODY,
  HEADERS,
  NEXT,
}
