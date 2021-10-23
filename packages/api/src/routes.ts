import { Router } from 'express'

import { ensureAuthenticated } from './middleware/ensureAuthenticated'

import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateMessageController } from './controllers/CreateMessageController'

const apiRoutes = Router()

apiRoutes.post('/authenticate', new AuthenticateUserController().handle)

apiRoutes.post('/messages', ensureAuthenticated, new CreateMessageController().handle)

export { apiRoutes }