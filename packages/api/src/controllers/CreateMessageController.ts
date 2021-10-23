import { Request, Response } from 'express'

import { CreateMessageService } from '../services/CreateMessageService'

class CreateMessageController {
  async handle(request: Request, response: Response) {
    try {      
      const { message } = request.body
      const { userId } = request
  
      const service = new CreateMessageService()

      const result = await service.execute(userId, message)
  
      return response.json(result)
    } catch (err) {
      return response.status(500).json({ error: err.message })
    }
  }
}

export { CreateMessageController }