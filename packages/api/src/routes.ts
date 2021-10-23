import { Router } from 'express'

import { AuthenticateUserController } from './controllers/AuthenticateUserController'

const apiRoutes = Router()

apiRoutes.post('/authenticate', new AuthenticateUserController().handle)

export { apiRoutes }