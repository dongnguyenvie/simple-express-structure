import { User } from "@application/entity/user.entity";
import { Conversation } from "@entity/conversation.entity";
import { getRepository } from "typeorm";

export class ChatService {
  constructor(private conversationRepository = getRepository(Conversation)) {}

  signup() {
    // this.userRepository.
  }
}
