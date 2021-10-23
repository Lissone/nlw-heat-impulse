import axios from 'axios'

interface IAccessTokenResponse {
  access_token: string
}

interface IUserResponse {
  id: string
  name: string
  login: string
  avatarUrl: string
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

    return response.data
  }
}

export { AuthenticateUserService }