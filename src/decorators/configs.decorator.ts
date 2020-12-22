import { DECORATOR_CONTROLLER, ParameterType } from "@src/shared/constants";
import { IParameterDeclaration, IRouteDefinition } from "@src/types/utils.type";
import { NextFunction, Request, Response } from "express";

export const getParameters = (
  req: Request,
  res: Response,
  next: NextFunction,
  params: IParameterDeclaration[]
): any[] => {
  if (params == null || params.length <= 0) {
    return [req, res, next];
  }

  const args = [];

  for (const pd of params) {
    switch (pd.type) {
      case ParameterType.RESPONSE:
        args[pd.index] = res;
        break;
      case ParameterType.REQUEST:
        args[pd.index] = req;
        break;
      case ParameterType.NEXT:
        args[pd.index] = next;
        break;
      case ParameterType.PARAMS:
        args[pd.index] =
          pd.name != null
            ? req.params[pd.name] != null
              ? req.params[pd.name]
              : null
            : req.params;
        break;
      //   case ParameterType.NUM_PARAM:
      //     try {
      //       let value = pd.isFloat
      //         ? parseFloat(req.params[pd.name])
      //         : parseInt(req.params[pd.name], 10);
      //       args[pd.index] = isNaN(value) === true ? null : value;
      //     } catch {
      //       args[pd.index] = null;
      //     }
      //     break;
      case ParameterType.QUERY:
        args[pd.index] =
          pd.name != null
            ? req.query[pd.name] != null
              ? req.query[pd.name]
              : null
            : req.query;
        break;
      //   case ParameterType.NUM_QUERY:
      //     try {
      //       let value = pd.isFloat
      //         ? parseFloat(req.query[pd.name])
      //         : parseInt(req.query[pd.name], 10);
      //       args[pd.index] = isNaN(value) === true ? null : value;
      //     } catch {
      //       args[pd.index] = null;
      //     }
      //     break;
      case ParameterType.BODY:
        args[pd.index] =
          pd.name != null
            ? req.body[pd.name] != null
              ? req.body[pd.name]
              : null
            : req.body;
        break;
      case ParameterType.HEADERS:
        args[pd.index] =
          pd.name != null
            ? req.headers[pd.name] != null
              ? req.headers[pd.name]
              : null
            : req.headers;
        break;
      default:
        args[pd.index] = null;
    }
  }

  return args;
};

export const getMeta = (
  target: any,
  propertyKey?: string | symbol
): Record<string, IRouteDefinition> => {
  if (!Reflect.hasMetadata(DECORATOR_CONTROLLER.routes, target.constructor)) {
    const defaultValue = propertyKey
      ? {
          [propertyKey]: {
            params: [],
          },
        }
      : {};
    Reflect.defineMetadata(
      DECORATOR_CONTROLLER.routes,
      defaultValue,
      target.constructor
    );
  }
  return Reflect.getMetadata(DECORATOR_CONTROLLER.routes, target.constructor);
};
