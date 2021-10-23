import { Router } from 'express'

import { ensureAuthenticated } from './middleware/ensureAuthenticated'

import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateMessageController } from './controllers/CreateMessageController'

const apiRoutes = Router()

apiRoutes.post('/authenticate', new AuthenticateUserController().handle)

apiRoutes.post('/messages', ensureAuthenticated, new CreateMessageController().handle)

// apenas para representar fluxo que o front terá que fazer
apiRoutes.get('/github', (request, response) => {
  response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

apiRoutes.get('/signin/callback', (request, response) => {
  const { code } = request.query

  return response.json({ code })
})

export { apiRoutes }