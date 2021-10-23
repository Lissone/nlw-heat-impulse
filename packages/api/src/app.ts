import 'dotenv/config'
import express from 'express'

const app = express()

// apenas para representar fluxo que o front terá que fazer
app.get('/github', (request, response) => {
  response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

app.get('/signin/callback', (request, response) => {
  const { code } = request.query

  return response.json({ code })
})

app.listen(5000, () => console.log(`Server is running on port 5000`))