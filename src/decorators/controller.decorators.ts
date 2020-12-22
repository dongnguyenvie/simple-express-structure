/* eslint-disable max-len */

import { DECORATOR_CONTROLLER } from "@src/shared/constants";
import { IRouteDefinition } from "@src/types/utils.type";

// decorators/Controller.decorators.ts
export const Controller = (prefix: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(DECORATOR_CONTROLLER.prefix, prefix, target);

    // Nếu bạn có một controller mà không có router nào(hầu như không thể), chúng ta sẽ tự gán giá trị routers là một mảng rỗng
    if (!Reflect.hasMetadata(DECORATOR_CONTROLLER.routes, target)) {
      Reflect.defineMetadata(DECORATOR_CONTROLLER.routes, {}, target);
    }
  };
};

export const Get = (path: string): MethodDecorator => {
  // `target` là class của chúng ta - Controller, `propertyKey` tương ứng với tên phương thức - để xử lý request
  return (target, propertyKey) => {
    // Trong trường hợp đây là lần đầu `routes` được đăng ký, thông tin `routes` sẽ là undefined.
    // Để các bước sau có thể hoạt động, đơn giản set giá trị cho `routes` là một mảng rỗng.
    if (!Reflect.hasMetadata(DECORATOR_CONTROLLER.routes, target.constructor)) {
      Reflect.defineMetadata(
        DECORATOR_CONTROLLER.routes,
        {},
        target.constructor
      );
    }
    // Lấy giá trị routes đã được lưu trước đó, thêm vào một route mới và set lại vào metadata.
    const routes: Record<string, IRouteDefinition> = Reflect.getMetadata(
      DECORATOR_CONTROLLER.routes,
      target.constructor
    );
    routes[propertyKey as string] = {
      ...routes[propertyKey as string],
      requestMethod: "get",
      path,
      methodName: propertyKey,
    };
    Reflect.defineMetadata(
      DECORATOR_CONTROLLER.routes,
      routes,
      target.constructor
    );
  };
};

export const Post = (path: string): MethodDecorator => {
  // `target` là class của chúng ta - Controller, `propertyKey` tương ứng với tên phương thức - để xử lý request
  return (target, propertyKey) => {
    // Trong trường hợp đây là lần đầu `routes` được đăng ký, thông tin `routes` sẽ là undefined.
    // Để các bước sau có thể hoạt động, đơn giản set giá trị cho `routes` là một mảng rỗng.
    if (!Reflect.hasMetadata(DECORATOR_CONTROLLER.routes, target.constructor)) {
      Reflect.defineMetadata(
        DECORATOR_CONTROLLER.routes,
        {},
        target.constructor
      );
    }
    // Lấy giá trị routes đã được lưu trước đó, thêm vào một route mới và set lại vào metadata.
    const routes: Record<string, IRouteDefinition> = Reflect.getMetadata(
      DECORATOR_CONTROLLER.routes,
      target.constructor
    );
    routes[propertyKey as string] = {
      ...routes[propertyKey as string],
      requestMethod: "post",
      path,
      methodName: propertyKey,
    };
    Reflect.defineMetadata(
      DECORATOR_CONTROLLER.routes,
      routes,
      target.constructor
    );
  };
};
