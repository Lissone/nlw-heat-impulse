import { Router } from 'express'

import { ensureAuthenticated } from './middleware/ensureAuthenticated'

import { AuthenticateUserController } from './controllers/AuthenticateUserController'

import { ProfileUserController } from './controllers/ProfileUserController'

import { CreateMessageController } from './controllers/CreateMessageController'
import { GetLast3MessagesController } from './controllers/GetLast3MessagesController'

const apiRoutes = Router()

apiRoutes.post('/authenticate', new AuthenticateUserController().handle)

apiRoutes.get('/profile', ensureAuthenticated, new ProfileUserController().handle)

apiRoutes.post('/messages', ensureAuthenticated, new CreateMessageController().handle)
apiRoutes.get('/messages/last3', new GetLast3MessagesController().handle)

// apenas para representar fluxo que o front terá que fazer
apiRoutes.get('/github', (request, response) => {
  response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

apiRoutes.get('/signin/callback', (request, response) => {
  const { code } = request.query

  return response.json({ code })
})

export { apiRoutes }