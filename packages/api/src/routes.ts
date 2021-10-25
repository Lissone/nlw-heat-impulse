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

export { apiRoutes }