import { Request, Response } from 'express'

import { ProfileUserService } from '../services/ProfileUserService'

class ProfileUserController {
  async handle(request: Request, response: Response) {
    try {      
      const { userId } = request

      const service = new ProfileUserService()

      const result = await service.execute(userId)
  
      return response.json(result)
    } catch (err) {
      return response.status(500).json({ error: err.message })
    }
  }
}

export { ProfileUserController }