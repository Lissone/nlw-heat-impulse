import prismaClient from '../prisma'

import { io } from '../app'

class CreateMessageService {
  async execute(userId: string, text: string) {
    const message = await prismaClient.message.create({
      data: {
        text,
        userId
      },
      include: {
        user: true
      }
    })

    const infoWS = {
      text: message.text,
      userId: message.userId,
      createdAt: message.createdAt,
      user : {
        name: message.user.name,
        avatarUrl: message.user.avatarUrl
      }
    }

    io.emit('new_message', infoWS)

    return message
  }
}

export { CreateMessageService }