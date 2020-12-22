import { NextFunction, Request, Response } from "express";

export type RequestMethod = "get" | "post" | "delete" | "options" | "put";
export interface IRouteDefinition {
  // Path cho route
  path: string;
  // Phương thức http
  requestMethod: RequestMethod;
  // Tên phương thức của class controller để xử lý request
  methodName: string | symbol;

  params: IParameterDeclaration[];
}

enum ParameterType {
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

export interface IParameterDeclaration {
  index: number;
  type: ParameterType;
  name?: string;
  isFloat?: boolean;
}

export interface IRouteDeclaration {
  url: string;
  method: string;
  params: IParameterDeclaration[];
  mw: Middleware[];
}

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export interface IBaseParamDecorator {
  decorator: (name: string) => ParameterDecorator;
}
