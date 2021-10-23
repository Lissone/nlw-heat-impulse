import { Request, Response } from 'express'

import { GetLast3MessagesService } from '../services/GetLast3MessagesService'

class GetLast3MessagesController {
  async handle(request: Request, response: Response) {
    try {      

      const service = new GetLast3MessagesService()

      const result = await service.execute()
  
      return response.json(result)
    } catch (err) {
      return response.status(500).json({ error: err.message })
    }
  }
}

export { GetLast3MessagesController }