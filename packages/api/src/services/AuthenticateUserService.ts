import axios from 'axios'
import { sign } from 'jsonwebtoken'

import prismaClient from '../prisma'

interface IAccessTokenResponse {
  access_token: string
}

interface IUserResponse {
  id: number
  name: string
  login: string
  avatar_url: string
}

class AuthenticateUserService {
  async execute(code: string) {
    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>('https://github.com/login/oauth/access_token', null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      headers: {
        'Accept': 'application/json'
      }
    })

    const response = await axios.get<IUserResponse>('https://api.github.com/user', {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    })

    const { id, name, login, avatar_url } = response.data

    let user = await prismaClient.user.findFirst({
      where: { githubId: id }
    })

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          name,
          login,
          githubId: id,
          avatarUrl: avatar_url
        }
      })
    }

    const token = sign(
      {
        user: {
          id: user.id,
          name: user.name,
          avatarUrl: user.avatarUrl
        }
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '1d'
      }
    )

    return { token, user }
  }
}

export { AuthenticateUserService }