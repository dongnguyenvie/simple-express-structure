import { User } from "@application/entity/user.entity";
import { getRepository } from "typeorm";

export class UserService {
  constructor(private userRepository = getRepository(User)) {}

  signup() {
    // this.userRepository.
  }
}
