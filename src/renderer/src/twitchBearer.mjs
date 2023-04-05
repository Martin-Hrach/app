import * as R from 'ramda'
import dotenv from 'dotenv'
dotenv.config()
;('use strict')
//Asynchroní kompozice funkcí
const asyncPipe = (...fns) =>
  fns.reduce(
    (f, g) =>
      async (...args) =>
        g(await f(...args))
  )

const cli_id = process.env.TWITCH_CLIENT_ID
const cli_secret = process.env.TWITCH_CLIENT_SECRET

class Bearer {
  static async initAuth() {
    //Funkce využívající asynchroní pipe pro získání tokenu a vytvoření token objektu Bearer, na konec zavolá init funkci
    const initAuth = asyncPipe(getAuthUrl, getToken, makeBearerObj)
    let tokenObj = await initAuth(cli_id, cli_secret)
    return tokenObj
  }

  constructor(access_token, expires_in, token_type) {
    this.access_token = null || access_token
    this.expires_in = null || expires_in
    this.token_type = null || token_type
  }

  get getAuthorization() {
    const tokenTemplate = `${R.capitalize(this.token_type)} ${this.access_token}`
    return { Authorization: tokenTemplate, 'Client-Id': cli_id }
  }
}

const getAuthUrl = (id, secret) => `https://id.twitch.tv/oauth2/token?client_id=${id}
																		&client_secret=${secret}&grant_type=client_credentials`

const getToken = (url) =>
  fetch(url, {
    method: 'POST'
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))

function makeBearerObj(token) {
  if (token.message) {
    console.log('nebyl obrdžen token ' + token.status)
    return
  }
  const { access_token, expires_in, token_type } = token

  let tokenObj = new Bearer(access_token, expires_in, token_type) //vytvoří objekt, kde uložím token a čas platnosti
  return tokenObj
}

let obj //objekt s tokenem, který se dodělá později
// eslint-disable-next-line no-unused-vars
async function callEndpoint(endpoint) {
  const headers = obj.getAuthorization
  let data

  const getData = fetch(endpoint, {
    headers
  })
    .then((res) => res.json())
    .catch((erro) => console.log(erro))

  data = await getData
  return data
}

export default Bearer
