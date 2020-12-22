/* eslint-disable max-len */
import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "@application/controller/user.controller";
import { DECORATOR_CONTROLLER } from "@src/shared/constants";
import { IRouteDefinition } from "@src/types/utils.type";
import { getParameters } from "@decorators/configs.decorator";
import { isResponse } from "@src/shared/functions";

// Init router and path
export const BaseRouter = Router();

// Duyệt qua tất cả các controller để đăng ký các routes
[UserController].forEach((controller) => {
  // Khởi tạo đối tượng controller
  const instance = new controller();
  // Lấy thông tin của prefix, chúng ta đã lưu chúng trong metadata của class controller
  const prefix = Reflect.getMetadata(DECORATOR_CONTROLLER.prefix, controller);
  // Tương tự, lất ra tất cả các `routes`
  const routes: Record<string, IRouteDefinition> = Reflect.getMetadata(
    DECORATOR_CONTROLLER.routes,
    controller
  );

  // Duyệt qua tất cả các routes và đăng ký chúng với express
  Object.values(routes).forEach((route) => {
    // Ở đây, tốt nhất là dùng `switch/case` để đảm bảo chúng ta sử dụng đúng phương thức của express(.get, .post(), ...)
    // Nhưng để đơn giản thì như thế này là đủ
    BaseRouter[route.requestMethod](
      prefix + route.path,
      (req: Request, res: Response, next: NextFunction) => {
        const args = getParameters(req, res, next, route.params);
        // Thực thi phương thức xử lý request, truyền vào là request và response
        const result = (instance as any)[route.methodName](...args);
        // Check is response manually
        if (!isResponse(result)) {
          return res.json(result);
        }
      }
    );
  });
});
