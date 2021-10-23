import prismaClient from '../prisma'

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

    return message
  }
}

export { CreateMessageService }