import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).json({
      error: 'Token not found'
    })
  }

  const [, token] = authToken.split(' ')

  try {    
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload

    request.userId = sub

    return next()
  } catch (err) {
    return response.status(401).json({ error: 'Token expired' })
  }
}

export { ensureAuthenticated }