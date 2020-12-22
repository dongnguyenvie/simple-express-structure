import { CreateUserDTO } from "@application/dto/create-user.dto";
import { UserService } from "@application/service/user.service";
import { Controller, Get, Post } from "@decorators/controller.decorators";
import { Body, Headers, Req, Res } from "@decorators/request.decorator";
import { Request, Response } from "express";

@Controller("/user")
export class UserController {
  private userService = UserService;

  @Post("/signup")
  public signup(@Body("user") user: CreateUserDTO, @Res() res: Response) {
    // userDTO.
    // const userDTO = new CreateUserDTO(user);
    // console.log(userDTO);
    // validator.validate(typeof userDTO, userDTO).then((e) => {
    //   console.log({ e });
    // });
    // // console.log({ userDTO });
    return user;
  }

  @Get("/signout")
  public signout(req: Request, res: any) {
    return res.json({ a: 1 });
  }
}
