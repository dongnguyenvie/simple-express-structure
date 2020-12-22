/* eslint-disable @typescript-eslint/no-unsafe-return */

import { ParameterType } from "@src/shared/constants";
import { IBaseParamDecorator } from "@src/types/utils.type";
import { getMeta } from "./configs.decorator";

class BaseParamDecorator implements IBaseParamDecorator {
  constructor(public type: ParameterType) {}

  decorator(name?: string): ParameterDecorator {
    return (target, propertyKey, index) => {
      const meta = getMeta(target, propertyKey);
      const route = meta[propertyKey as string] || {};
      route.params.push({
        index: index,
        name: name,
        type: this.type,
      });
    };
  }
}

const BodyDecorator = new BaseParamDecorator(ParameterType.BODY);
export const Body = BodyDecorator.decorator.bind(BodyDecorator);

const HeadersDecorator = new BaseParamDecorator(ParameterType.HEADERS);
export const Headers = BodyDecorator.decorator.bind(HeadersDecorator);

const QueryDecorator = new BaseParamDecorator(ParameterType.QUERY);
export const Query = BodyDecorator.decorator.bind(QueryDecorator);

const ParamsDecorator = new BaseParamDecorator(ParameterType.PARAMS);
export const Params = BodyDecorator.decorator.bind(ParamsDecorator);

const ResponseDecorator = new BaseParamDecorator(ParameterType.RESPONSE);
export const Res = BodyDecorator.decorator.bind(ResponseDecorator);

const RequestDecorator = new BaseParamDecorator(ParameterType.REQUEST);
export const Req = BodyDecorator.decorator.bind(RequestDecorator);
