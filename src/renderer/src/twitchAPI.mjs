import * as R from 'ramda'
import Bearer from './twitchBearer.mjs'
let BearerObj

const getBearerObj = async () => {
  BearerObj = await Bearer.initAuth()
  console.log(BearerObj + "pops")
}

console.log(getBearerObj() + "mops")
