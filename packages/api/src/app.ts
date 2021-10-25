import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

import { apiRoutes } from './routes'

const app = express()

const serverHttp = http.createServer(app)

app.use(cors())
app.use(express.json())

app.use(apiRoutes)

const io = new Server(serverHttp, {
  cors: {
    origin: '*'
  }
})

io.on('connect', socket => {
  console.log(`User connected with socket: ${socket.id}`)
})

export { serverHttp, io }